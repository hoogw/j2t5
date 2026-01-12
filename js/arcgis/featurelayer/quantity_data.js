
/*

       3D          featurelayer use following name, but mean the same thing:  v4.x  ,  3Dscene, 
       2D          featurelayer_popup use following name, but mean the same thing:  v4.x_popup  ,  2D, 
       2D variant  featurelayer_v3 use following name, but mean the same thing:  v3  ,  just a different version, no longer use v3.x, 

*/




/*
 http://localhost:10/json2tree/arcgis/js4/featurelayer.html?
 layer=Adjacent_Cities
 &url=https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer/1
 &_center_zoom=16.7
 &_center_lat=34.0653347
 &_center_long=-118.24389

http://localhost:10/json2tree/arcgis/js4/featurelayer.html?layer=Adjacent_Cities&url=https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer/1&_center_zoom=16.7&_center_lat=34.0653347&_center_long=-118.24389

 *
 **/




require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",

  "esri/widgets/Legend",
  "esri/widgets/Search",
  
 
  
  "esri/core/Handles", 
  "esri/layers/support/LabelClass",

  "esri/renderers/ClassBreaksRenderer",   //   --- --- --- --- quantity color --- --- --- ---

   "esri/rest/locator",
  "esri/rest/places",
  "esri/rest/support/FetchPlaceParameters",
  "esri/rest/support/PlacesQueryParameters",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",

  "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",
  
  "esri/widgets/Print",

  "esri/core/promiseUtils",
  "esri/core/reactiveUtils",

  
], function(
            esriConfig,
            Map, 
            MapView,

            Basemap,
            Attribution,
            
            WebTileLayer,
            BasemapToggle,
            Expand, 
            BasemapGallery, 
            
            Legend, 
            Search, 
           
          
            
            Handles,
            LabelClass,

            ClassBreaksRenderer,  //   --- --- --- --- quantity color --- --- --- ---

            locator,
            places, 
            FetchPlaceParameters, 
            PlacesQueryParameters,
            
            TextSymbol,
            Font, 

             Track,
             Locate,
             Graphic,
            
             Print,
            
             promiseUtils,
             reactiveUtils,
 
 
            ) {
    
    

              
               
              
              
              
               
              
         
         // keep here, do not place in a r c g i s _ c o m m o n, because only geocoding, search POI etc need key, without these, no need key
         esriConfig.apiKey = current_in_use_esriConfigaApiKey;
              const geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
         const apiKey = esriConfig.apiKey;

              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer  
                         
           
              /**/
              //   --- --- --- --- back to previous extent --- ------ ---
              /**/
              var extentStack = new Stack(); 
              /**/
              //   --- --- end --- --- back to previous extent --- --- --- ---  
              /**/




            /**/
            //   --- --- --- --- quantity color --- --- --- ---
            /**/

                   var current_colorScale = 'colorScale_red'  // default
                   var current_quantityFieldName = ''

                   var quantity_class_range_array = []  // 5 class, should be 6 number,  1 is min, 6 is max
                   var max_value
                   var min_value

                   var maxmin_differences // only for equal interval
                   var maxmin_interval    // only for equal interval


            /**/
            //   --- --- end --- --- quantity color --- --- --- ---  
            /**/


              


            /**/          
            // -- -- -- featurelayer clientside label  -- -- -- 

              var current_dynamicLabel = 'nolabel'
              var bglayer_labelClass
              var bglayer_labelExpression = "$feature.OBJECTID" // default for labelExpressionInfo( must support Arcade)
              var bglayer_labelExpression_MapImage = "[OBJECTID] CONCAT" // default for mapimagelayer (without Arcade)
              var bglayer_labelColor = css_rgba_color_array[1]  // blue
              var bglayer_labelColorName = color_name_array[1]  // blue
              var bglayer_labelFontSize = 12

            //  -- -- --  end  -- -- -- featurelayer clientside label  -- -- -- 
            /**/


                              /**/
                              // ----- color style setting ----- 
                              /**/ 
                              var native_renderer
                              var symbolType_radioValue = 'native'
 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  


                              
            /**/
            // ===== ==== === == field mask ===== ==== === ==
                var _fieldmask_showing_field_array = ["*"] // default
                var _fieldmask_all_field_array = []
                var _fieldmask_field_need_remove_array = []
            //  ===== ==== === == end  ===== ==== === == field mask ===== ==== === == 
            /**/
 



              // must at top to get above url ready
              dom_ready_dojo();

              

              var map = new Map({
                basemap: google_hybrid,
              });
            
              
              var view = new MapView({

              // Exclude the zoom widget from the default UI
              ui: {
                components: ["attribution"]
              },
                container: "viewDiv",
                center: [_center_long, _center_lat],
                zoom: _center_zoom,
                map: map,
              });
            

              
      
              createFeatureLayer()
              init_feature_layer_view()




              // must place after  createa feature layer, other wise view is not ready, will cause error
              init_view_ui()

               function init_view_ui(){
              
                // remove following widget
                view.ui.remove(["zoom", "attribution"]);


                  /**/ 
                  // = = = = = . . . attribution . . .  = = = = =

                  const attribution_widget = new Attribution({
                                                              view: view,
                                                              id: "attribution-id",
                                                              },
                                                           "attribution-outside-of-map-div" 
                                              );

                  
                  // = = = = =  end . . . attribution . . .  = = = = =
                  /**/ 


                          //=================== user input title for browser print ============================
                          var title_div_element = document.getElementById('title_div')
                          view.ui.add(title_div_element, "top-left"); //Add to the map
                          //======== end =========== user input title for browser print ============================

                          
                          
                   /**/ 
                         //=================== add legend ============================
                         var legend = new Legend( 
                          // new Legend({view}, legend-container-dom-id)
                          {
                                view: view,
                                //container: "legend-div",  // not working
                                id: "legend-id",
                                /*  if not set layerInfos,  by default, all visible layer legend will show here.
                                layerInfos: [
                                  {
                                    layer: featureLayer
                                    //title: _layer
                                  }
                                ]
                                */
                          },
                          
                        );



                        var legend_outside_mapview = new Legend(
                                                                  // new Legend({view}, legend-container-dom-id)
                                                                  {
                                                                        view: view,
                                                                        id: "legend-id-outside_mapview",
                                                                  }, 
                                                                  
                                                                  // Render Legend Widget outside MapView https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/render-legend-widget-outside-mapview/td-p/215473
                                                                  "legend-outside-mapview-div"
                                                                );

                        // comment this line, if you want legend outside of mapView. This line will enforce add legend on mapView
                        //view.ui.add(legend, "top-left");  // for print move from left to right

                    //======= end ============ add legend ============================
                    /**/ 



                  /**/ 
                  //=================== add search widget ============================

                  const searchAddressWidget = new Search({
                             allPlaceholder: "Search", // only works if you have multiple source l o c a  t o r, ignore if only 1 source, like here.
                      // work around is wait until all image loaded,  windows.load { document.querySelector('.esri-search .esri-search__input').setAttribute('placeholder', 'Google search this area   ')}
                      
                            // adjust width at css ".esri-search{width: 593px !important;}" ,  "!important" will overwrite the default "width:240px" in original esri-search class 
                              
                  view: view
                  });
                  view.ui.add(searchAddressWidget, "top-leading"); //Add to the map

                  /*
                  // only if you want Add the search widget on the map
                  view.ui.add(searchWidget, {
                  position: "top-right"
                  });
                  */
                  //========= end ========== add search widget ============================
                  /**/ 



                 coordinate_widget()




                 
                 
                 // ===== ========= ======== ====== track current location ===== ========= ======== ====== 
                 // https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
                  
          // not use track, because it keep zoom in to user's location
          //const track = new Track({
          const locate = new Locate({
               icon: "pin-tear-f",   //  "compass-north-circle", (default)
              
              // Zoom level to scale converter https://developers.arcgis.com/documentation/mapping-and-location-services/reference/zoom-levels-and-scale/
              scale: 564,  // zoom level 20 = 564,  By default, the view will navigate to a scale of 2500 for 3D and 4514 for 2D
               


              // Overwrite the default symbol used for the graphic placed at the location of the user
              graphic: new Graphic ({
                symbol: {
                  // autocasts as new SimpleMarkerSymbol()
                  type: "simple-marker",
                  size:  locator_size,  // all works "31pt", "31px",
                  style: locator_style,  // diamond, triangle, cross, x, circle, path, square
                  color: locator_color,   //"blue",
                  // autocasts as new SimpleLineSymbol()
                  outline: {
                    // simple marker builder, https://sagewall.github.io/symbol-builder/simple-marker-symbol/
                    color: locator_outlineColor,  //"#efefef",
                    width: locator_outlineWidth,
                  }
                }
              }),


                    view: view
                  });
                  view.ui.add(locate,  "bottom-right");
                // ===== =========   end  ======== ====== track current location ===== ========= ======== ====== 


                //=================== toggle basemap ============= only for on map ===============

                        
                        // ESRI Well Known Basemap Ids https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                        // https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/what-are-esri-well-known-basemap-ids/td-p/759266
                        const base_map_source_array = [
                          google_hybrid, 
                          microsoft_hybrid,
                          here3_hybrid,
                          mapbox_hybrid,
                          Basemap.fromId("hybrid"),  // esri base map id 
                          //nearmap_tile,
                          open_street_map,
                        ];

                        console.log('base_map_source_array', base_map_source_array)

                        const basemapGallery = new BasemapGallery({
                            source: base_map_source_array,
                          view: view,
                          container: document.createElement("div")
                        });

                        // Create an Expand instance and set the content
                        // property to the DOM node of the basemap gallery widget

                        const bgExpand = new Expand({
                          collapseIcon: "arrow-bold-right",
                          expandIcon: "arrow-bold-left",
                          collapseTooltip: "Close Options",
                          expandTooltip: "Open Back Ground Map Options",
                          

                          view: view,
                          content: basemapGallery
                        });

                        // Add the expand instance to the ui
                        view.ui.add(bgExpand, "bottom-right");

                  //========  end =========== toggle basemap ============ only for on map ================
              


                   



             
                            // zoom 2 layer
                            var zoom2layer_element = document.createElement("button");
                            zoom2layer_element.id = "zoom2layer_button"
                            zoom2layer_element.type = "button"
                            zoom2layer_element.style.fontSize = '18px'
                            zoom2layer_element.style.fontWeight = 900
                            
                            zoom2layer_element.style.color = 'white'
                            zoom2layer_element.style.backgroundColor = 'black'
                            //zoom2layer_element.style.textShadow = '1px 1px 1px #FFFFFF'
                            var zoom2layer_text = document.createTextNode('zoom to layer');
                            zoom2layer_element.appendChild(zoom2layer_text);
                            view.ui.add(zoom2layer_element, "bottom-left");
                            // event handle
                            zoom2layer_element.addEventListener("click", (event) => {
                              console.log('zoom 2 layer button clicked')
                              pan_to_real_location()
                            });


                          





                            // opacity
                            var opacity_title = document.createElement("span");
                            opacity_title.id = "opacitytitle_span"
                            opacity_title.style.fontSize = '18px'
                            opacity_title.style.fontWeight = 900
                            opacity_title.style.color = 'blue'
                            opacity_title.style.textShadow = '2px 2px 2px #FFFFFF'

                            var opacity_title_text = document.createTextNode('opacity');
                            opacity_title.appendChild(opacity_title_text);
                            view.ui.add(opacity_title, "bottom-left");

                            var opacity_slider = document.createElement("input");
                            opacity_slider.type = 'range'
                            opacity_slider.id  = 'overlay_opacity_range'
                            opacity_slider.min = 0
                            opacity_slider.max = 10
                            opacity_slider.value = groundoverlay_opacity * 10
                            // https://stackoverflow.com/questions/62943565/change-colour-of-input-type-range-bar-in-css/76503278#76503278
                            // both works,  $('#overlay_opacity_range').css({'accent-color':'blue'}),  $('#overlay_opacity_range').css('accent-color', 'blue')
                            opacity_slider.style.accentColor = 'blue'
                            view.ui.add(opacity_slider, "bottom-left");
                          

                            var opacity_value = document.createElement("span");
                            opacity_value.id = 'overlay_opacity_label'
                            opacity_value.style.fontSize = '18px'
                            opacity_value.style.fontWeight = 900
                            opacity_value.style.color = 'blue'
                            opacity_value.style.textShadow = '2px 2px 2px #FFFFFF'

                            var opacity_value_text = document.createTextNode(groundoverlay_opacity * 10);
                            opacity_value.appendChild(opacity_value_text);
                            view.ui.add(opacity_value, "bottom-left");


                            // event handle
                            opacity_slider.addEventListener("change", (event) => {

                                            var _overlay_opacity = $('#overlay_opacity_range').val();
                                            $('#overlay_opacity_label').text(_overlay_opacity);
                                            update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  groundoverlay_opacity = _overlay_opacity / 10;
                    
                                                  // update overlay opacity
                                                  backgroundFeatureLayer.opacity = groundoverlay_opacity


                            });
                            // ... end ... opacity







                    /**/
                          // --- hide legend  --- 
                          var hideLegend_element = document.createElement("button");
                          hideLegend_element.id = "hideLegend_button"
                          hideLegend_element.type = "button"
                          hideLegend_element.style.fontSize = '18px'
                          //hideLegend_element.style.fontWeight = 900
                          
                          hideLegend_element.style.color = 'black'
                          hideLegend_element.style.backgroundColor = 'white'
                          //hideLegend_element.style.textShadow = '10px 10px 10px #FFFFFF'
                          var hideLegend_text = document.createTextNode('Show Legend');
                          hideLegend_element.appendChild(hideLegend_text);
                          view.ui.add(hideLegend_element, "bottom-left");
                          // event handle
                          hideLegend_element.addEventListener("click", (event) => {


                            console.log('toggle or hide legend button clicked, before toggle, old legend position',  legend_position)

                            switch (legend_position) {
                              case 'outside_mapview':
                                                      // next position is on map view
                                                      /**/

                                                      // hide outside mapview legend
                                                      $('#legend-outside-mapview-div').hide()         

                                                      // show legend on mapview
                                                      if (view.ui.find("legend-id")){
                                                        console.log('legend already on map view, nothing to do')
                                                      } else {
                                                        view.ui.add(legend, "top-left");  // for print move from left to right
                                                      }
                                                      legend_position = 'on_mapview'
                                                      break;
                              case 'on_mapview':
                                                      // next position is off 
                                                      if (view.ui.find("legend-id")){
                                                            view.ui.remove(legend)
                                                      } else {
                                                        console.log('legend is not on map view, nothing to do')
                                                      }
                                                      legend_position = 'outside_mapview'  //  without option 'off', otherwise use 'off'
                                                      $('#legend-outside-mapview-div').show()
                                                      break;
                              case 'off':
                                          // next position is outside_mapview
                                          $('#legend-outside-mapview-div').show()   
                                          legend_position = 'outside_mapview'
                                          break;


                              default:
                                console.log('legend position is not found, do not know what to do');
                            }


                          
                            
                          });
                      // --- end  --- hide legend
                      /**/


/**/
          //  - - -   - - -  esri print widget   - - -   - - - 
          /**/

          var hidePrinter_element = document.createElement("button");
          hidePrinter_element.id = "hidePrinter_button"
          hidePrinter_element.type = "button"
          hidePrinter_element.style.fontSize = '18px'
          //hidePrinter_element.style.fontWeight = 900
          
          hidePrinter_element.style.color = 'black'
          hidePrinter_element.style.backgroundColor = 'white'
          //hidePrinter_element.style.textShadow = '10px 10px 10px #FFFFFF'
          var hidePrinter_text = document.createTextNode('Show Printer');
          hidePrinter_element.appendChild(hidePrinter_text);
          view.ui.add(hidePrinter_element, "bottom-left");
          // event handle
          hidePrinter_element.addEventListener("click", (event) => {


            console.log('toggle or hide Printer button clicked, before toggle, old Printer position',  printer_position)

            switch (printer_position) {
              case 'outside_mapview':
                                      // next position is on map view
                                      /**/

                                      // hide outside mapview Printer
                                      $('#esri-print-wiget-outside-mapview-div').hide()         

                                      // show Printer on mapview
                                      if (view.ui.find("esri-print-widget-id")){
                                        console.log('Printer already on map view, nothing to do')
                                      } else {
                                        view.ui.add(print_on_mapview, "top-right");  // for print move from left to right
                                      }
                                      printer_position = 'on_mapview'
                                      break;
              case 'on_mapview':
                                      // next position is off 
                                      if (view.ui.find("esri-print-widget-id")){
                                            view.ui.remove(print_on_mapview)
                                      } else {
                                        console.log('Printer is not on map view, nothing to do')
                                      }
                                      printer_position = 'outside_mapview'  //  without option 'off', otherwise use 'off'
                                      $('#esri-print-wiget-outside-mapview-div').show()
                                      break;
              case 'off':
                          // next position is outside_mapview
                          $('#esri-print-wiget-outside-mapview-div').show()   
                          printer_position = 'outside_mapview'
                          break;


              default:
                console.log('Printer position is not found, do not know what to do');
            }


          
            
          });



          /**/
          //  --- end  ---  - - -   - - -  esri print widget  - - -   - - -  
          /**/




                      /**/
                      // ======== esri widget my widget opacity control together  ========
                            var widget_opacity_title = document.createElement("span");
                            widget_opacity_title.id = "widget_opacity_title_span"
                            widget_opacity_title.style.fontSize = '18px'
                            widget_opacity_title.style.fontWeight = 900
                            widget_opacity_title.style.opacity = 0.8  //fixed , do not use widget_opacity
                            widget_opacity_title.style.color = 'yellow'
                            widget_opacity_title.style.textShadow = '2px 2px 2px #000000'
                            var widget_opacity_title_text = document.createTextNode('widget');
                            widget_opacity_title.appendChild(widget_opacity_title_text);
                            view.ui.add(widget_opacity_title, "bottom-left");

                            var widget_opacity_slider = document.createElement("input");
                            widget_opacity_slider.id = "widget_opacity_slider_input"
                            widget_opacity_slider.type = 'range'
                            widget_opacity_slider.style.opacity = 0.8  //fixed , do not use widget_opacity
                            widget_opacity_slider.id  = 'widget_opacity_slider_id'
                            widget_opacity_slider.min = 0
                            widget_opacity_slider.max = 10
                            widget_opacity_slider.value = widget_opacity * 10
                            widget_opacity_slider.style.accentColor = 'yellow'
                            view.ui.add(widget_opacity_slider, "bottom-left");

                            var widget_opacity_value = document.createElement("span");
                            widget_opacity_value.id = 'widget_opacity_label'
                            widget_opacity_value.style.fontSize = '18px'
                            widget_opacity_value.style.fontWeight = 900
                            widget_opacity_value.style.opacity = 0.8  //fixed , do not use widget_opacity
                            widget_opacity_value.style.color = 'yellow'
                            widget_opacity_value.style.textShadow = '2px 2px 2px #000000'
                            var widget_opacity_value_text = document.createTextNode(widget_opacity * 10);
                            widget_opacity_value.appendChild(widget_opacity_value_text);
                            view.ui.add(widget_opacity_value, "bottom-left");

                            // event handle
                            widget_opacity_slider.addEventListener("change", (event) => {

                              widget_opacity = event.target.value / 10
                              console.log(' widget_opacity slider change to ', widget_opacity )
                              // must use set 'text', because I previously create 'text' node
                              document.getElementById('widget_opacity_label').textContent = widget_opacity * 10
                              // both works
                              //$('#widget_opacity_label').text(widget_opacity * 10)
                              update_url_parameter('widgetopacity', widget_opacity)


                              set_my_widget_opacity()
                              set_esri_widget_opacity()

                              

                            });
                      // ======== end  ======== esri widget my widget opacity control together  ========
                      /**/


                   


                      // statistic info
                      var statisticInfo_element = document.getElementById("statistic_info");
                      view.ui.add(statisticInfo_element, "top-right");

                      // ... end  ... statistic info






              // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui





                       
  


          // warning:  special (have field mask, no background typ)
          var highlightHandles = new Handles();
          var layerView  
          async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

            if (backgroundFeatureLayer){
            } else {
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url,
                      /**/
                      // ===== ==== === == field mask ===== ==== === == 
                      /**/
                          outFields: _fieldmask_showing_field_array,  // will have you defined fields
                      /**/
                      // ===== ==== end === == field mask ===== ==== === == 
                      /**/
                      opacity: groundoverlay_opacity,
                    });
            }
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info(current_feature_rendered , total_feature_count)

            });

              map.add(backgroundFeatureLayer)

              layerView = await view.whenLayerView(backgroundFeatureLayer);
              

            // - - - when map stop moving, update total count of feature show on map  - - -

              /* not use layer view watch update event, 
                because even mouse move on a feature, also fire this event, should only fire when map stop moving, 
                view.drag view.mouse-wheel(zoom) also don't work, because they fire too many event at each move, should just fire 1 time.

                layerView.watch("updating", function(value){

                  console.log(" watch layer view updating event ", value);
                  if (!value) {

                    layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,


                      //outFields: layerView.availableFields,
                      //where: "DEW_POINT > 10"

                                            })
                      
                                            .then(function(results) {

                                                                      current_feature_rendered = results.features.length
                                                                      console.log("current features returned and rendered : ",  current_feature_rendered);
                                                                      update_statistic_info(current_feature_rendered , total_feature_count)
                                                              })
                                                              
                                                              .catch(function(error) {
                                                                          console.log("query failed: ", error);
                                                              });
                  }//if


                });// layer view watch

              */

              // not use, because every map move, tigger 2 time, 1st is begining position, 2nd is ending position
              //view.watch("stationary", function (isStationary) {

              // in use, sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils
              // Use reactiveUtils to check when the extent changes. We include view.stationary so we only show a message, when the view is not moving.
              reactiveUtils.watch(
                () => [view.stationary, view.extent, view.scale],
                ([stationary, extent, scale], [wasStationary]) => {
                 if (stationary) {      
                         console.log('stationary happened, current extent ', extent)

                         

                         // - -  only for coordinate widget  - - 
                         showCoordinates(view.center, "Map-Center");
                         // not use, extent don't have zoom, zoom only from view
                         // showCoordinates(extent.center, "Map-Center");
                         // - -  end   - -  only for coordinate widget  - - 

                                                             
                         layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,

                                  //outFields: layerView.availableFields,
                                  //where: "DEW_POINT > 10"
                                })
                                  .then(function(results) {
                                                               current_feature_rendered = results.features.length
                                                               console.log("current features returned and rendered : ",  current_feature_rendered);
                                                               update_statistic_info(current_feature_rendered , total_feature_count)                                          
                                      })
                                         .catch(function(error) {
                                                               console.log("query failed: ", error);
                                            });
          
                 } else if (wasStationary) {
                                              // nothing to do
                                              console.log(' was stationary , nothing to do, ')
                                            }
                 return "";
               }
             );//  reactiveUtils.watch


    //  - - - end - - - when map stop moving, update total count of feature show on map  - - -





                //  configuring the layer view 's highlight color (when mouse point feaeture) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                layerView.highlightOptions = {

                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#HighlightOptions
                  color: featureLayerView_higlightOption_fillColor,  // [255, 255, 255, 0.92],
                  haloColor: featureLayerView_higlightOption_haloColor,  // [223, 255, 0, 0.95],
                  haloOpacity: featureLayerView_higlightOption_haloOpacity,  // 0.9,  // default is 1
                  fillOpacity: featureLayerView_higlightOption_fillOpacity, // 0.6
                };


             

  

          } 





                          function pan_to_real_location(){

                                                                  /*
                                                                  Do not Zoom to extent of all features, bad idea, slow, bulky,  https://developers.arcgis.com/javascript/latest/sample-code/featurelayer-queryextent/
                                                                  only zoom to first feature, good idea, fast, neat
                                                                  does not matter you add feature layer to map or not, it can alway zoom to 1st feature
                                                                  */
                                                                  const  query1stFeature = {
                                                                    
                                                                           // query object https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html
                                                                           where: '1=1',  // return max count of return feature
                                      
                                                                           /*  
                                                                                Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                                                                                https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                                                                                without use them, must use "where 1=1" will return max number of return count
                                                                                if use "num" and "start", then do not use "where 1=1"
                                      
                                                                                num:1,
                                                                                start:0,
                                                                           */
                                      
                                                                           returnGeometry:true,
                                                                         }
                                                  
                                                                         backgroundFeatureLayer
                                                                         .queryFeatures(query1stFeature)
                                                                         .then((results) => {
                                                                                               console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                                                                                               // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                                                                                               var found_1_valid_geometry = false
                                                                                               for (let i = 0; i < results.features.length; i++) {
                                                                                                 if (results.features[i].geometry){
                                                                                                  console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                                                                                                  found_1_valid_geometry = true
                                                                                                  
                                                    view.goTo(results.features[i].geometry)
                                                                                                  break; // break for loop
                                                                                                 }
                                                                                               }//for 
                                                                                               if (! found_1_valid_geometry){
                                                                                                  console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                                                                                                  // goto full extent, always works
                                                                                                  view.goTo(results.features); 
                                                                                               }
                                                                         })
                                                                         .catch(function(error) {
                                                                                               console.log('failed to zoom to any feature ', error); 
                                                                         }); 
                                                                                                                         
                                                  
                          }  
                            




  
  
  


                               






      
      // only for : single feature layer, click event ( without hover version)    
      var graphic_object_indexAsKey = {} 
      function init_feature_layer_view(){

        // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
        view.on("click", function(event){

              view.hitTest(event).then(function(response){

                if (response.results.length) {

                  let hitResult = response.results.filter(function (result) {
                          return result.graphic.layer === backgroundFeatureLayer;
                  })

                  console.log(' ! * ! hit test ! * ! click ! * ! hitResult hitResult hitResult ', hitResult )

                  graphic_object_indexAsKey = {} 
                  let graphic                                                        
                  if (hitResult[0]){
                                                  var multiple_layer_properties_html = ''
                                                  var __layer_name
                                                  var ___properties

                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                      graphic = hitResult[_index].graphic;
                                                      graphic_object_indexAsKey[_index] = graphic
                                                      console.log(' ! * ! hit test ! * ! result ! * ! add graphic by index ! * ! ', _index, graphic )

                                                    

                                                      
                                                      
                                                      __layer_name = ''
                                                      __layer_name += 'UniqueID(' + graphic.uid + ')' + layerID_NAME_separator + 'OBJECTID ( ' + graphic.attributes.OBJECTID + ' )'
                                                      __layer_name += layerID_NAME_separator + graphic.layer.title + '(layerID:' + graphic.layer.layerId + ')'
                                                      
                                                      ___properties = graphic.attributes

                                                       // ===== ==== === == field mask ===== ==== === == 
                                                       var fieldMasked_properties = removeFieldsByFieldMask(___properties)
                                                       //  ===== ==== === == end  ===== ==== === == field mask ===== ==== === ==
                                                       

                                                      multiple_layer_properties_html += '</br>'

                                                // build html only
                                                      if (_index == 0){
                                                                        multiple_layer_properties_html += '<fieldset>' 
                                                                        multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' + __layer_name +'</legend>'
                                                                        multiple_layer_properties_html +=     '<div class="flex-row selected_highlighted_style attribute_field_set_style"   id="attribute_field_set_0"   >'  // if 0, means need start a new info window
                                                                        multiple_layer_properties_html +=           json_flex_tip_viewer(___properties)
                                                                        multiple_layer_properties_html +=     '<div>'
                                                                        multiple_layer_properties_html += '</fieldset>'
                                                      } else {

                                                                multiple_layer_properties_html += '<fieldset>'
                                                                multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' + __layer_name +'</legend>'
                                                                multiple_layer_properties_html +=     '<div class="flex-row attribute_field_set_style"   id="attribute_field_set_' + _index +  '"   >' // not 0, means need append to existing info window
                                                                multiple_layer_properties_html +=         json_flex_tip_viewer(___properties)
                                                                multiple_layer_properties_html +=     '<div>'
                                                                multiple_layer_properties_html += '</fieldset>'

                                                      }//if
                                                      //  . .  end    . .  build html only



                                                  }//for


                                                  $("#info_outline").show()
                                                  $('#info-window-div').html(multiple_layer_properties_html)


                                                  // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                    console.log('add event to element id :  attribute_field_set_', _index)
                                                    $("#attribute_field_set_" + _index ).on('click', function(){
                                                                var element_id = $(this).attr('id');
                                                                var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                                                console.log("you click  index  :   ",  _select_highlight_index)
                          
                                                                $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                                                $(this).addClass('selected_highlighted_style')



                                                              
                                                      
                                                                                          if (mouse_pointed_feature_highlight_handle){
                                                                                            mouse_pointed_feature_highlight_handle.remove()
                                                                                          }
                                                                                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic_object_indexAsKey[_select_highlight_index]);
                                                              
                                                    });

                                                  }//for







                    } 

                    // by default, always highlight (first index 0) graphic,   only, not others
                    if (graphic_object_indexAsKey[0] && graphic_object_indexAsKey[0].layer){
                          if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
                          }
                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic_object_indexAsKey[0]);
                    }// if




                } else {

                     // hit test do not find anything.
                     /**/

                     // remove highlight graphic on layer view
                     if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
                     }

                     // hide info outline 
                     empty_info_outline_Tab()


                  
                }// if response results length





                    

              }); // view . hit test

           

        }); // view . on . click

                              
      }// function




  
                    


                            
      /**/
      //==========================  renderer =================================================
              
                      /**/
                      //   --- --- --- --- quantity color --- --- --- ---
                      /**/

                      // only for featureLayer
                      function re_render_layer(symbolType){
                                                    
                                                    
                          
                          switch (symbolType) {  

                            case 'native':

                                  console.log('re render layer as native ', native_renderer)

                                  backgroundFeatureLayer.renderer = native_renderer;

                                  disable_quantity_color()
                                  disable_customized_color()
                                  break;
                              
                            case 'quantity':

                                    disable_customized_color()
                                    enable_quantity_color()

                                    build_quantity_renderer();
                                    break;      
                              
                            case  'customized':

                                   enable_customized_color()
                                   disable_quantity_color()

                                            _default_strokeColor = $('#symbol_color').val();
                                            _default_strokeWeight = $('#line_width_range').val();
                                            _default_fillColor = $('#fill_color').val();
                                            _default_pointRadius = $('#point_radius_range').val();
                                            console.log('line stroke symbol color change to  .... ... .. .',  _default_strokeColor)
                                            console.log('line stroke symbol width change to  .... ... .. .',  _default_strokeWeight)
                                            console.log('polygon fill color change to  .... ... .. .',  _default_fillColor)
                                            console.log('point size change to  .... ... .. .',  _default_pointRadius)
              

                                            // for geojsonlayer, featurelayer, 
                                            //================================== renderer =================================================
                                            // polygon

                                            var polygon_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                type: "simple-fill",  // autocasts as new SimpleFillSymbol()

                                                //  . . .simple fill symbol style . . .
                                                style: pattern_simpleFillSymbol_esriSFS_js_api_array[current_simplefillPattern],
                                                // . . . end . . . simple fill symbol style
                                                
                                                color:   _default_fillColor,  
                                                outline: {  // autocasts as new SimpleLineSymbol()
                                                  width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                                                  color: _default_strokeColor,

                                                  //  . . .simple fill symbol style . . .
                                                  type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                                  style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                                  // . . . end . . . simple fill symbol style
                                                
                                                }
                                              }
                                            };




                                            // line
                                            var polyline_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                        //  . . .simple fill symbol style . . .
                                                        type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                                        style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                                        // . . . end . . . simple fill symbol style


                                                        color: _default_strokeColor,
                                                        width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  

                                              

                                              }
                                            };



                                            // point
                                            var point_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()

                                                //  . . .simple fill symbol style . . .
                                                style: simpleMarkerSymbol_esriSMS_array[current_simpleMarker],
                                                // . . . end . . . simple fill symbol style


                                                color: _default_fillColor,
                                                size: _default_pointRadius, // 10,
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                    width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                                                    color: _default_strokeColor,

                                                    //  . . .simple fill symbol style . . .
                                                    type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                                    style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                                    // . . . end . . . simple fill symbol style
                                                }

                                              }
                                            };

                          
                          
                          
                                            // ----------- re-render as our customized style, without this section, by default, it use esri native, original symbol  -----------
                                                              //view.goTo(featureLayer.fullExtent);
                                                              console.log( ' backgroundFeatureLayer.geometryType ......>'  , backgroundFeatureLayer.geometryType)
                                                              
  
                                                              var _geometry_type_ = backgroundFeatureLayer.geometryType.toLowerCase()
  
                                                          if (_geometry_type_ == 'polygon') {
  
                                                            console.log( ' backgroundFeatureLayer.renderer ......>'  , polygon_renderer)
                                                            backgroundFeatureLayer.renderer = polygon_renderer;
                                                            //  . . .simple fill symbol style . . .
                                                            dynamicLayers_array = polygon_renderer
                                                          } 
  
  
                                                        if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
  
                                                          backgroundFeatureLayer.renderer = point_renderer;
                                                          //  . . .simple fill symbol style . . .
                                                          dynamicLayers_array = point_renderer
                                                          }   
  
  
                                                          if (_geometry_type_ == 'polyline') {
  
                                                            backgroundFeatureLayer.renderer = polyline_renderer;
                                                            //  . . .simple fill symbol style . . .
                                                            dynamicLayers_array = polyline_renderer
                                                          }  
  
                                          // ----------- End ------------  re-render as our customized style, without this section, by default, it use esri native, original symbol  -----------
                                

                              
                              
                                        break;

                              default:
                            console.log(`Sorry, we are out of ${symbolType}.`);
                        }// switch





                        console.log('after change renderer,  now backgroundFeatureLayer.renderer is ',  backgroundFeatureLayer.renderer)
                              
                        //  . . .simple fill symbol style . . .
                        console.log('after change renderer,  now in-use renderer object json : ',  dynamicLayers_array)
                        editor_dynamicLayers_array.set({json:dynamicLayers_array});

                        // . . . end . . . simple fill symbol style

                          
                      } 
    

                      function symbol_changed(){

                                    symbolType_radioValue = $("input[name='symbolType_radio']:checked").val();

                                   

                                    if(symbolType_radioValue) {
                                        console.log(" symbol choose is : --  ", symbolType_radioValue);
                                        update_url_parameter('symbolType', symbolType_radioValue);

                                        re_render_layer(symbolType_radioValue);
                                    } // if


                      }


                      function init_settingTab(){


                                          if (param_overlayOpacity){
                                            groundoverlay_opacity = param_overlayOpacity / 10
                                          }

                                          if (param_symbolType) {
                                            console.log('use new symbolType from urlparam ',  param_symbolType)
                                            symbolType_radioValue = param_symbolType
                                          }

                                          if (param_strokeColor) {
                                            console.log('use new strokeColor from urlparam ',  param_strokeColor)
                                            _default_strokeColor = param_strokeColor
                                          }

                                          if (param_strokeWeight) {
                                            console.log('use new strokeWeight from urlparam  ',  param_strokeWeight)
                                            _default_strokeWeight = param_strokeWeight
                                          }


                                          if (param_fillColor) {
                                            console.log('use new fillColor from urlparam',  param_fillColor)
                                            _default_fillColor = param_fillColor
                                          }


                                          if (param_pointRadius){
                                            console.log('use new pointRadius  from urlparam',  param_pointRadius)
                                            _default_pointRadius = param_pointRadius
                                          }

                                        
                                          //  . . .simple fill symbol style . . .
                                          
                                          if (param_outlinePattern){
                                            console.log('use new outlinePattern  from urlparam',  param_outlinePattern)
                                            current_outlinePattern = param_outlinePattern
                                          }

                                          if (param_simplefillPattern){
                                            console.log('use new simplefillPattern  from urlparam',  param_simplefillPattern)
                                            current_simplefillPattern = param_simplefillPattern
                                          }


                                          if (param_simpleMarker){
                                            console.log('use new  simpleMarker from urlparam',  param_simpleMarker)
                                            current_simpleMarker = param_simpleMarker
                                          }
                                         
                                          // . . . end . . . simple fill symbol style
                                         


                                          $('#line_width_label').text(_default_strokeWeight);
                                          $('#line_width_range').val(_default_strokeWeight);
                    
                                          $('#point_radius_label').text(_default_pointRadius);
                                          $('#point_radius_range').val(_default_pointRadius);




                                          // first time set symbol type 'native' or 'customized'
                                          $("input[type=radio][name=symbolType_radio][value=" + symbolType_radioValue + "]").prop('checked', true);
                                          //symbol type radio, native or customized 
                                          $("input[type='radio'][name='symbolType_radio']").change(function(){
                                            symbol_changed()
                                          });





                                         



                                          $('#line_width_range').on('change', function() {

                                            var _line_width = $('#line_width_range').val();
                                            $('#line_width_label').text(_line_width);
                                            update_url_parameter('strokeWeight', _line_width);
                    
                                            symbol_changed()
                                          });
                    
                    
                                          $('#point_radius_range').on('change', function() {
                    
                                            var _point_radius = $('#point_radius_range').val();
                                            $('#point_radius_label').text(_point_radius);
                                            update_url_parameter('pointRadius', _point_radius);
                    
                                            symbol_changed()
                                          });



                                                     



                                                  //  =============== color picker =======================

                                                  /**/
                                                  // . . . . line or polygon border line or point circle line stroke color  . . . .
                                                  console.log('init set _default_strokeColor ', _default_strokeColor)

                                                  $('#symbol_color').val(_default_strokeColor);

                                                  var symbol_color = new iro.ColorPicker("#row_symbol_color", {
                                                                                                                width: 150,   // Set the size of the color picker
                                                                                                                color: _default_strokeColor, // Set the initial color to '#ffffff' //  init color set black does not work,  because it is a black circle, black ball.    Default googleLabelTextColor is black.
                                                                                                              
                                                                                                                //  setting   https://iro.js.org/advanced.html
                                                                                                                layoutDirection: 'horizontal',  //  Default value: "vertical"  https://iro.js.org/colorPicker_api.html#options
                                                                                                                layout: [
                                                                                                                              { 
                                                                                                                                component: iro.ui.Slider,
                                                                                                                                options: {
                                                                                                                                  // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                                                  sliderType: 'hue'
                                                                                                                                }
                                                                                                                              },
                                                                                                                              { 
                                                                                                                                component: iro.ui.Slider,
                                                                                                                                options: {
                                                                                                                                  // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                                                  sliderType: 'saturation'
                                                                                                                                }
                                                                                                                              },
                                                                                                                              { 
                                                                                                                                component: iro.ui.Wheel,
                                                                                                                                options: {
                                                                                                                                  wheelLightness: false,  // must set false, default is true, black color will cause wheel dark to black. False, will make sure, wheel isn't dark when set color as black.
                                                                                                                                  wheelDirection: 'clockwise', 
                                                                                                                                  wheelAngle: 0
                                                                                                                                }
                                                                                                                              },
                                                                                                                              { 
                                                                                                                                component: iro.ui.Slider,
                                                                                                                                options: {
                                                                                                                                  // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                                                  sliderType: 'value'
                                                                                                                                }
                                                                                                                              },
                                                                                                                              { 
                                                                                                                                component: iro.ui.Slider,
                                                                                                                                options: {
                                                                                                                                  // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                                                  sliderType: 'alpha'
                                                                                                                                }
                                                                                                                              },
                                                                                                                ]// layout
                                                                                                            });


                                                  symbol_color.on('color:change', function(color) {
                                                                                                              // log the current color as a HEX alpha string  https://iro.js.org/color_api.html#constructor
                                                                                                              var _symbol_color = color.rgbaString
                                                                                                              $('#symbol_color').val(_symbol_color);
                                                                                                              console.log(' stroke color changed new color is ',  _symbol_color)
                                                                                                              update_url_parameter('strokeColor', _symbol_color);
                                                                                                              symbol_changed()
                                                                                  });

                                                  // . . . . line or polygon border line or point circle line stroke color  . . . .
                                                  /**/

                                                  /**/
                                                  // . . . . polygon fill color  . . . .
                                                        console.log('init set _default_fillColor ', _default_fillColor)
                                                        
                                                        $('#fill_color').val(_default_fillColor);


                                                        var fill_color = new iro.ColorPicker("#row_fill_color", {
                                                            width: 200,   // Set the size of the color picker
                                                            color: _default_fillColor, // Set the initial color to '#ffffff' //  init color set black does not work,  because it is a black circle, black ball.    Default googleLabelTextColor is black.
                                                          
                                                            //  setting   https://iro.js.org/advanced.html
                                                            layoutDirection: 'horizontal',  //  Default value: "vertical"  https://iro.js.org/colorPicker_api.html#options
                                                            layout: [
                                                                          { 
                                                                            component: iro.ui.Slider,
                                                                            options: {
                                                                              // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                              sliderType: 'hue'
                                                                            }
                                                                          },
                                                                          { 
                                                                            component: iro.ui.Slider,
                                                                            options: {
                                                                              // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                              sliderType: 'saturation'
                                                                            }
                                                                          },
                                                                          { 
                                                                            component: iro.ui.Wheel,
                                                                            options: {
                                                                              wheelLightness: false,  // must set false, default is true, black color will cause wheel dark to black. False, will make sure, wheel isn't dark when set color as black.
                                                                              wheelDirection: 'clockwise', 
                                                                              wheelAngle: 0
                                                                            }
                                                                          },
                                                                          { 
                                                                            component: iro.ui.Slider,
                                                                            options: {
                                                                              // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                              sliderType: 'value'
                                                                            }
                                                                          },
                                                                          { 
                                                                            component: iro.ui.Slider,
                                                                            options: {
                                                                              // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                              sliderType: 'alpha'
                                                                            }
                                                                          },
                                                            ]// layout
                                                        });

                                                        fill_color.on('color:change', function(color) {
                                                                                    // log the current color as a HEX alpha string  https://iro.js.org/color_api.html#constructor
                                                                                    var _fill_color = color.rgbaString
                                                                                    $('#fill_color').val(_fill_color);
                                                                                    console.log(' fill color changed new color is ',  _fill_color)
                                                                                    update_url_parameter('fillColor', _fill_color);
                                                                                    symbol_changed()
                                                        });
                                                  // . . . . end  . . . . polygon fill color  . . . .
                                                  /**/

                                                  //  ======= end ======== color picker =======================

                                                  /**/
                                // -- -- -- build mono color radio html and event -- -- -- 

                                
                                      var outlinePattern_html = ''
                                      outlinePattern_html += '<legend> outline pattern </legend>'
                                      for (let i = 0; i < pattern_simpleLineSymbol_esriSLS_js_api_array.length; i++) {
                                        outlinePattern_html += '<label>'
                                        
                                        if (current_outlinePattern == i){
                                          outlinePattern_html +=   '<input type="radio" value="' + i + '" name="outlinePattern_radio" id="outlinePattern_' + i + '" checked/>'
                                        } else {
                                          outlinePattern_html +=   '<input type="radio" value="' + i + '" name="outlinePattern_radio" id="outlinePattern_' + i + '"/>'
                                        }
                                                                      
                                        outlinePattern_html +=   '<span>' +  pattern_simpleLineSymbol_esriSLS_js_api_array[i] + '</span>&nbsp;&nbsp;'
                                        outlinePattern_html += '</label>'
                                        //outlinePattern_html += '<br>'
                                      } 
                                      $("#outline_pattern_div").html(outlinePattern_html)
                                      // only for existing static html tag, if html tag is dynamic added, do not use this method
                                      $('input[type=radio][name=outlinePattern_radio]').on('change', function() {
                                        current_outlinePattern = $(this).val()
                                        update_url_parameter('outlinePattern', current_outlinePattern);
                                        symbol_changed()
                                      });

                                     



                                      //  . . .simple fill symbol style . . .


                                      var simplefillPattern_html = ''
                                      simplefillPattern_html += '<legend> fill pattern ( hash line )</legend>'
                                      for (let i = 0; i < pattern_simpleFillSymbol_esriSFS_js_api_array.length; i++) {
                                        simplefillPattern_html += '<label>'
                                        
                                        if (current_simplefillPattern == i){
                                          simplefillPattern_html +=   '<input type="radio" value="' + i + '" name="simplefillPattern_radio" id="simplefillPattern_' + i + '" checked/>'
                                        } else {
                                          simplefillPattern_html +=   '<input type="radio" value="' + i + '" name="simplefillPattern_radio" id="simplefillPattern_' + i + '"/>'
                                        }
                                                                      
                                        simplefillPattern_html +=   '<span>' +  pattern_simpleFillSymbol_esriSFS_js_api_array[i] + '</span>&nbsp;&nbsp;'
                                        simplefillPattern_html += '</label>'
                                        //simplefillPattern_html += '<br>'
                                      } 
                                      $("#simplefill_pattern_div").html(simplefillPattern_html)
                                      // only for existing static html tag, if html tag is dynamic added, do not use this method
                                      $('input[type=radio][name=simplefillPattern_radio]').on('change', function() {
                                        current_simplefillPattern = $(this).val()
                                        update_url_parameter('simplefillPattern', current_simplefillPattern);
                                        symbol_changed()
                                      });




                                      var simpleMarker_html = ''
                                      simpleMarker_html += '<legend>marker shape</legend>'
                                      for (let i = 0; i < simpleMarkerSymbol_esriSMS_array.length; i++) {
                                        simpleMarker_html += '<label>'
                                        
                                        if (current_simpleMarker == i){
                                          simpleMarker_html +=   '<input type="radio" value="' + i + '" name="simpleMarker_radio" id="simpleMarker_' + i + '" checked/>'
                                        } else {
                                          simpleMarker_html +=   '<input type="radio" value="' + i + '" name="simpleMarker_radio" id="simpleMarker_' + i + '"/>'
                                        }
                                                                      
                                        simpleMarker_html +=   '<span>' +  simpleMarkerSymbol_esriSMS_array[i] + '</span>&nbsp;&nbsp;'
                                        simpleMarker_html += '</label>'
                                        //simpleMarker_html += '<br>'
                                      } 
                                      $("#simpleMarker_div").html(simpleMarker_html)
                                      // only for existing static html tag, if html tag is dynamic added, do not use this method
                                      $('input[type=radio][name=simpleMarker_radio]').on('change', function() {
                                        current_simpleMarker = $(this).val()
                                        update_url_parameter('simpleMarker', current_simpleMarker);
                                        symbol_changed()
                                      });






                                      // . . . end . . . simple fill symbol style

                 }    
                 
                 

      /**/
      //========================== end ======== renderer =================================================
      /**/



      
               
/**/
//  --- google as basemap   --- 
/**/

    var google_hybrid
    var microsoft_hybrid
    var here3_hybrid
    var mapbox_hybrid
    var nearmap_tile
    var open_street_map
    
   
    function init_base_map(){

          // Google Hybrid
          google_hybrid = new Basemap({
            baseLayers: [new WebTileLayer({
              // also work   https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}
              urlTemplate : "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}", 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Google Hybrid with Label ",
              id: "layerID_google_hybrid",
              title: "Google",
            })],
            id: "basemapID_google_hybrid",
            title: "Google",
            thumbnailUrl: "../../public/images/google1000.png",
          });




          
          // microsoft hybrid
          var microsoft_tile_url = 'https://atlas.microsoft.com/map/tile?'
          microsoft_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          microsoft_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          microsoft_tile_url +=  '&tilesetId=' + 'microsoft.imagery'  // no label
          microsoft_tile_url +=  '&x={x}' + '&y={y}' + '&zoom={z}'
          microsoft_tile_url +=  '&tileSize=256'

          var microsoft_label_tile_url = 'https://atlas.microsoft.com/map/tile?'
          microsoft_label_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          microsoft_label_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          microsoft_label_tile_url +=  '&tilesetId=' + 'microsoft.base.labels.road'  // no label
          microsoft_label_tile_url +=  '&x={x}' + '&y={y}' + '&zoom={z}'
          microsoft_label_tile_url +=  '&tileSize=256'

          microsoft_hybrid = new Basemap({


             baseLayers: [
              

              // saterlite only, no label
              new WebTileLayer({
                urlTemplate : microsoft_tile_url, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                
                id: "layerID_microsoft_hybrid",
                title: "Microsoft",
              }), 
          
              // label only 
              new WebTileLayer({
                urlTemplate : microsoft_label_tile_url, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                
                id: "layerID_microsoft_label",
                title: "Microsoft label",
              }), 
          
          
          
          ],
            
            id: "basemapID_microsoft_hybrid",
            title: "Microsoft",
            thumbnailUrl: "../../public/images/microsoft300.png",
          });
          //  . .  end . . . . microsoft hybrid



          
          

        // . . . . here hybrid . . . .
        here3_hybrid = new Basemap({
          baseLayers: [new WebTileLayer({
            urlTemplate : here_v3_hybrid_raster, 
            copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Here WeGo Hybrid with Label ",
            id: "layerID_here3_hybrid",
            title: "Here raster v3 hybrid with label Layer",
          })],
          id: "basemapID_here3_hybrid",
          title: "HereMap",
          thumbnailUrl: "../../public/images/here256.png",
        });




          // . . . . . . mapbox . . .. . .
          mapbox_hybrid = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : mapbox_satellite_raster, 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Mapbox Hybrid ",
              id: "layerID_mapbox_hybrid",
              title: "Mapbox",
            })],
  
            id: "basemapID_mapbox_hybrid",
            title: "Mapbox",
            thumbnailUrl: "../../public/images/mapbox001.png",
          });
          // . .  end . . . . mapbox . . .. . .



          // . . . nearmap only . . .
          nearmap_tile = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : nearmap_xyz, 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Nearmap no Label ",
              id: "layerID_nearmap",
              title: "Nearmap no Label Layer",
            })],

            id: "basemapID_nearmap_no_label",
            title: "NearMap",
            thumbnailUrl: "../../public/images/nearmap000.png",
          });
           //  . . . end . . . nearmap only . . .
      
          


        // . . . . open street map  . . . .
          open_street_map = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : "http://tile.openstreetmap.org/{z}/{x}/{y}.png", 
              copyright: "Open Street Map " + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1),
              id: "layerID_open_street_map",
              title: "Open Street Map Layer",
            })],

            id: "basemapID_open_street_map",
            title: "OpenStreetMap",
            thumbnailUrl: "../../public/images/openstreetmap002.png",
          });



        }// function

/**/
//   --- end  ---   --- google as basemap   --- 
/**/                      
                 
                 
             


      async function dom_ready_dojo(){

        init_base_map()

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)



                /**/
                // -- -- -- featurelayer clientside label  -- -- -- 
                /**/

                init_label()

                /**/
                //  -- -- --  end  -- -- -- featurelayer clientside label  -- -- -- 
                /**/


              /**/
              // ===== ==== === == field mask ===== ==== === == 
              /**/
              init_field_mask()  
              /**/
              // ===== ==== end === == field mask ===== ==== === == 
              /**/


                          init_settingTab()

                          init_print() //  ---  print   --- 
                           

                          




                                                       
                          init_user_interface_event()
                          
                         
                         
                          
                         

              } // dom ready



              




      function init_background_layer(){

        // .... ... ...  background layer url .... ... ... 

                  init_global_var() 
                  // must carry these value from arcgis_common.js
                  background_mapserver_url = param_background_mapserver_url
                  layer_id  = param_layer_id
                  background_layer_url = param_background_layer_url
                  console.log(' background_mapserver_url ', background_mapserver_url)  
                  console.log(' layer_id ', layer_id)  
                  console.log(' background_layer_url ', background_layer_url) 
                  
                  

     /**/
                          // token
                          /**/
                          // add token https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-do-i-add-a-secured-feature-service-using-a/td-p/1040881
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#RequestInterceptor
                          if (arcgis_online_token){
                            esriConfig.request.interceptors.push({
                              // set the `urls` property to the URL of the FeatureLayer so that this
                              // interceptor only applies to requests made to the FeatureLayer URL
                              urls: background_layer_url,  // only this layer
                              // use the BeforeInterceptorCallback to add token to query
                              before: function (params) {
                                  params.requestOptions.query = params.requestOptions.query || {};
                                  params.requestOptions.query.token = arcgis_online_token
                              },
                            });
                          }
                          /**/
                          // . . end .  .  . token
                          /**/

            }




             /**/
    //   --- --- --- --- back to previous extent --- --- esri only --- ---
    /**/
        function use_extent(){
                        console.log('go to map image layer full extent')

          backgroundFeatureLayer.queryExtent().then(function(results){
            // go to the extent of the results satisfying the query
            view.goTo(results.extent);
          });
          
    }
/**/
//   --- --- end --- --- back to previous extent --- --- esri only --- ---  
/**/




          function init_user_interface_event(){

            $('#info_outline').hide()
            $('#close_info_outline_panel').on('click', function(event) {
              // remove highlight graphic on layer view
              if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
              }
                empty_info_outline_Tab()
            });



            /**/
                //   --- --- --- --- back to previous extent --- --- esri only --- ---
                /**/

                $('#full_extent_btn').on('click', function(event) {
                  use_extent()
                });

                $('#back_to_previous_extent_btn').on('click', function(event) {
                  console.log('extent stack before pop', extentStack.count, extentStack)

                  var skipCurrentExtent = extentStack.pop()
                  console.log('back to previous extent - 1st pop - : ', skipCurrentExtent)
                  var back2thisExtent = extentStack.pop()
                  console.log('back to previous extent - 2st pop - : ', back2thisExtent)


                  
                  // esri only 
                  if (back2thisExtent){

                    console.log('back to previous extent - lat - long - : ', back2thisExtent.center_zoom, back2thisExtent.center_lat, back2thisExtent.center_long)
                    
                    //not use, because it will not trigger view 'stationary' event, will not add new extent, then I can't skip first stack pop above.
                    //view.center = [back2thisExtent.center_long, back2thisExtent.center_lat]
                    //view.zoom = back2thisExtent.center_zoom
                   
                    // in use, because it trigger view stationary event, will add a new extent. 
                    view.goTo({
                      center: [back2thisExtent.center_long, back2thisExtent.center_lat],
                      zoom: back2thisExtent.center_zoom
                    });
                    

                  } // if
                  
              });

          /**/
          //   --- --- end --- --- back to previous extent --- --- esri only --- ---  
          /**/


              

 /**/
          //  --- POI point of interest search esri     --- 
          /**/

          init_search_poi_event_handler()

          /**/
          //  --- end  ---  POI point of interest search esri    --- 
          /**/



                
              }






        /**/
        //   --- --- --- --- quantity color --- --- --- ---warning:build_quantity_renderer is only for featureLayer
        /**/

        async function  init_quantity_color(){

          // special for parent function init_xxx() can not put inside dom ready, this init_xxx() have to be in view.when()
          if (_featurelayerJSON.hasOwnProperty('fields')){
            // normally feature layer json is done at dom ready function at very early begining.
          } else {
            // due to init_xxx in view.when, (not in dom ready), feature layer json is not ready at this point, so have to double get it 
            await get_feature_attributes(background_mapserver_url, layer_id)
          }

          init_quantity_field_name(_featurelayerJSON)
          
          init_color_scale_option()
        }



              function init_color_scale_option(){

                if (param_colorScale) {current_colorScale = param_colorScale}


                var _colorScale_html = ''
                var _radioColor_index = -1

                for (const [key, value] of Object.entries(color_scale)) {
                  //console.log(`${key}: ${value}`);

                  _colorScale_html +=     '<label>'

                  _radioColor_index += 1

                  if (current_colorScale == key) {
                          // checked
                          _colorScale_html +=       '<input type="radio" data-index="' + _radioColor_index + '" value="' + key + '" name="colorScale_radio" id="' + key + '"  checked />'
                  } else {
                          // un-checked
                          _colorScale_html +=       '<input type="radio" data-index="' + _radioColor_index + '" value="' + key + '" name="colorScale_radio" id="' + key + '" />'
                  }
                  _colorScale_html += _radioColor_index + '.'
                  _colorScale_html +=       '<span style="background-color:'  + color_scale[key][4] +'" class="fieldName">'  + '&nbsp;' + key.substring(11)  + '</span>'
                  
                  _colorScale_html +=     '</label>'  
                  _colorScale_html +=     '&nbsp;&nbsp;&nbsp;'

                }//for

                $('#color_scale_radio_list').html(_colorScale_html)
                
                
                $('input[type=radio][name=colorScale_radio]').on('change', function() {
                  current_colorScale = $(this).val()

                  change_color_scale_handler(current_colorScale)
                });


                $("#apply_value_change_btn" ).on( "click", function(){

                  quantity_class_range_array[1] = $("#to_1").val()
                  quantity_class_range_array[2] = $("#to_2").val()
                  quantity_class_range_array[3] = $("#to_3").val()
                  quantity_class_range_array[4] = $("#to_4").val()

                  build_quantity_renderer()
                });


                // no ajax, local calculation
                $("#equal_interval_local_btn" ).on( "click", function(){

                  for (let i = 1; i < 5; i++) {
                    quantity_class_range_array[i] = Number((min_value + (maxmin_interval * i)).toFixed(2))
                  }

                  populate_from_to_form(quantity_class_range_array)
                  build_quantity_renderer()
                });




                // "classificationMethod": "<esriClassifyNaturalBreaks | esriClassifyEqualInterval | esriClassifyQuantile | esriClassifyStandardDeviation | esriClassifyGeometricalInterval>", https://developers.arcgis.com/documentation/common-data-types/classification-objects.htm
                
                
                
                $("#equal_interval_btn" ).on( "click",  async function(){

                  var classification_definition_equal_interval = {
                    "type": "classBreaksDef",
                    "classificationField": current_quantityFieldName,
                    "classificationMethod": "esriClassifyEqualInterval",
                    "breakCount": 5,
                    }

                  var get_equal_interval_renderer_url = background_layer_url + '/generateRenderer?&where=&f=json&classificationDef=' + encodeURIComponent(JSON.stringify(classification_definition_equal_interval))
                  var equal_interval_renderer = await ajax_datatype_json(get_equal_interval_renderer_url)
                  console.log(' equal interval render result is  ', equal_interval_renderer)

                  // error Accessor#set Invalid property value, 
                  // value needs to be one of 'esri.renderers.HeatmapRenderer', 'esri.renderers.SimpleRenderer', 'esri.renderers.UniqueValueRenderer', 
                  // 'esri.renderers.ClassBreaksRenderer', 'esri.renderers.DotDensityRenderer', 'esri.renderers.DictionaryRenderer', 'esri.renderers.PieChartRenderer', 
                  // or a plain object that can autocast (having .type = 'heatmap', 'simple', 'unique-value', 'class-breaks', 'dot-density', 'dictionary', 'pie-chart')
                  //backgroundFeatureLayer.renderer = equal_interval_renderer;

                  for (let i = 1; i < 5; i++) {
                  //quantity_class_range_array[i] = equal_interval_renderer.classBreakInfos[i - 1].classMaxValue
                  quantity_class_range_array[i] = Number((equal_interval_renderer.classBreakInfos[i - 1].classMaxValue).toFixed(2))
                  }

                  populate_from_to_form(quantity_class_range_array)
                  build_quantity_renderer()
                });







                $("#natural_breaks_btn" ).on( "click", async function(){

                  var classification_definition_natural_breaks = {
                                                    "type": "classBreaksDef",
                                                    "classificationField": current_quantityFieldName,
                                                    "classificationMethod": "esriClassifyNaturalBreaks",
                                                    "breakCount": 5,
                                                    }

                  var get_natural_breaks_renderer_url = background_layer_url + '/generateRenderer?&where=&f=json&classificationDef=' + encodeURIComponent(JSON.stringify(classification_definition_natural_breaks))
                  var natural_breaks_renderer = await ajax_datatype_json(get_natural_breaks_renderer_url)
                  console.log(' natural breaks render result is  ', natural_breaks_renderer)

                  // error Accessor#set Invalid property value, 
                  // value needs to be one of 'esri.renderers.HeatmapRenderer', 'esri.renderers.SimpleRenderer', 'esri.renderers.UniqueValueRenderer', 
                  // 'esri.renderers.ClassBreaksRenderer', 'esri.renderers.DotDensityRenderer', 'esri.renderers.DictionaryRenderer', 'esri.renderers.PieChartRenderer', 
                  // or a plain object that can autocast (having .type = 'heatmap', 'simple', 'unique-value', 'class-breaks', 'dot-density', 'dictionary', 'pie-chart')
                  //backgroundFeatureLayer.renderer = natural_breaks_renderer;

                  for (let i = 1; i < 5; i++) {
                    quantity_class_range_array[i] = natural_breaks_renderer.classBreakInfos[i - 1].classMaxValue
                    //quantity_class_range_array[i] = (natural_breaks_renderer.classBreakInfos[i - 1].classMaxValue).toFixed(2)
                  }

                  populate_from_to_form(quantity_class_range_array)
                  build_quantity_renderer()
                });





                $("#quantile_btn" ).on( "click", async function(){

                    var classification_definition_quantile = {
                      "type": "classBreaksDef",
                      "classificationField": current_quantityFieldName,
                      "classificationMethod": "esriClassifyQuantile",
                      "breakCount": 5,
                      }

                    var get_quantile_renderer_url = background_layer_url + '/generateRenderer?&where=&f=json&classificationDef=' + encodeURIComponent(JSON.stringify(classification_definition_quantile))
                    var quantile_renderer = await ajax_datatype_json(get_quantile_renderer_url)
                    console.log(' quantile render result is  ', quantile_renderer)

                    // error Accessor#set Invalid property value, 
                    // value needs to be one of 'esri.renderers.HeatmapRenderer', 'esri.renderers.SimpleRenderer', 'esri.renderers.UniqueValueRenderer', 
                    // 'esri.renderers.ClassBreaksRenderer', 'esri.renderers.DotDensityRenderer', 'esri.renderers.DictionaryRenderer', 'esri.renderers.PieChartRenderer', 
                    // or a plain object that can autocast (having .type = 'heatmap', 'simple', 'unique-value', 'class-breaks', 'dot-density', 'dictionary', 'pie-chart')
                    //backgroundFeatureLayer.renderer = quantile_renderer;

                    for (let i = 1; i < 5; i++) {
                    quantity_class_range_array[i] = quantile_renderer.classBreakInfos[i - 1].classMaxValue
                    //quantity_class_range_array[i] = (quantile_renderer.classBreakInfos[i - 1].classMaxValue).toFixed(2)
                    }

                    populate_from_to_form(quantity_class_range_array)
                    build_quantity_renderer()

                });



                // first time run, run only 1 time
                change_color_scale_handler(current_colorScale)

              }


              function change_color_scale_handler(___colorScale){

                console.log( 'change color scale handler ',  ___colorScale)
                update_url_parameter('colorScale', ___colorScale)

                for (let i = 1; i <= 5; i++) {
                  var _class_x_color_span_id = "#class_" + i + "_color_span"
                  $(_class_x_color_span_id).css("background-color", color_scale[___colorScale][i]);
                }


                // re-fresh render with new color
                if (symbolType_radioValue == 'quantity'){
                        build_quantity_renderer()
                }
                

              }


              function init_quantity_field_name(___feature_layer_full_JSON){


                              if (param_quantityFieldName) {
                  current_quantityFieldName = param_quantityFieldName
                  current_classifyFieldName = current_quantityFieldName
                }


                              // warning:  .fields can be null, if layer is only raster image  
                              if (___feature_layer_full_JSON.fields) {

                                            var _fields_array = ___feature_layer_full_JSON.fields

                                            var _quantityField_html = ''
                                            var _radio_index = -1

                                            // other field radio 
                                            for (var i = 0; i < _fields_array.length; i++) {
                                                                        
                                               var ____fieldDisplayName = _fields_array[i].alias             
                                                  var ____fieldType = _fields_array[i].type
                                               var ____fieldName = _fields_array[i].name
                                                        
                                               
                                               if (esri_possible_numeric_field_type_array.includes(____fieldType)){

                                                          _quantityField_html +=    '<label>'

                                                          _radio_index += 1

                                                          if (current_quantityFieldName == ____fieldName) {
                                                                  // checked
                                                                  _quantityField_html +=       '<input type="radio" data-index="' + _radio_index  + '" value="' + ____fieldName + '" name="quantityField_eachField_radio" id="' + ____fieldName + '"  checked />'
                                                          } else {
                                                                  // un-checked
                                                                  _quantityField_html +=       '<input type="radio" data-index="' + _radio_index  + '" value="' + ____fieldName + '" name="quantityField_eachField_radio" id="' + ____fieldName + '"/>'
                                                          }
                                                          //   ---  context class for mark.js highlight  ---
                                                          _quantityField_html +=       '<span class="fieldName context">'  + '&nbsp;' + _radio_index + '.' + '&nbsp;'  + ____fieldName  + '</span>'

                                                          _quantityField_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
                                                          _quantityField_html +=     '</label>'
                                                        //  _quantityField_html +=   '</p>'
                                                        _quantityField_html +=   '<br>'
                                                }//if
                                                          


                                            }//for   
                                            
                                            $('#quantity_field_radio_list').html(_quantityField_html)
                                           
                                            

                                            
                                            $('input[type=radio][name=quantityField_eachField_radio]').on('change', function() {
                                                    current_quantityFieldName = $(this).val()
                                      current_classifyFieldName = current_quantityFieldName
                                                    current_colorScale = color_scale_name_index[$(this).data('index') % color_scale_name_index.length]
                                                    console.log('data-index, color', $(this).data('index'), current_colorScale )
                                                    change_color_scale_handler(current_colorScale)


                                                    $('input[type=radio][name=colorScale_radio]').removeAttr('checked')
                                                    var _colorRadioId = '#'+ current_colorScale
                                                    $(_colorRadioId).attr('checked', true)


                                                    change_quantityField_handler(current_quantityFieldName)
                                            });



                                           
                                      
                                }//if  





                     /**/


                     // first time load, run one time, quantityField as url parameter, current_quantityField indicated. 
                     change_quantityField_handler(current_quantityFieldName)



              }//function



              async function change_quantityField_handler(__quantity_field_name){

                console.log('change quantity Field handler', __quantity_field_name)

                if (__quantity_field_name){

                  update_url_parameter('quantityFieldName', __quantity_field_name)
                  $('#field_name_span').html(current_quantityFieldName)

                  // clear previous mark highlight
                  $("span.context").unmark();
                  $("span.context").mark(__quantity_field_name);
                  

                /**/ 
                  //   ---   get max min value method 1  ---  javascript api: 
                  //    https://gis.stackexchange.com/questions/417563/get-basic-statistics-from-a-feature-server-and-display-it-in-an-own-element-in-a
                
                      var statisticsQuery = backgroundFeatureLayer.createQuery();

                      
                      statisticsQuery.outStatistics = [
                            {
                              onStatisticField: __quantity_field_name,
                              outStatisticFieldName: "max_value",
                              statisticType: "MAX"
                            },

                            {
                              onStatisticField: __quantity_field_name,
                              outStatisticFieldName: "min_value",
                              statisticType: "MIN"
                            },
                      ];


                     

                      backgroundFeatureLayer.queryFeatures(statisticsQuery).then(async function(results){


                       
                        // .. .. .. after get max min - build form color - rerender .. .. ..
                            max_value = results.features[0].attributes.max_value
                            min_value = results.features[0].attributes.min_value
                            console.log('max min ', max_value, min_value,  results)
                          
                            maxmin_differences = (max_value - min_value).toFixed(2)
                            maxmin_interval = (maxmin_differences / 5).toFixed(2)
                            quantity_class_range_array[0] = min_value
                            quantity_class_range_array[5] = max_value
                            
                            $('#min_value_span').html(min_value)
                            $('#max_value_span').html(max_value)


                            // local equal interval
                            //for (let i = 1; i < 5; i++) {
                              //quantity_class_range_array[i] = (min_value + (maxmin_interval * i)).toFixed(2)
                            //}
                           

                            var classification_definition_quantile = {
                              "type": "classBreaksDef",
                              "classificationField": current_quantityFieldName,
                              "classificationMethod": "esriClassifyQuantile",
                              "breakCount": 5,
                              }
        
                            var get_quantile_renderer_url = background_layer_url + '/generateRenderer?&where=&f=json&classificationDef=' + encodeURIComponent(JSON.stringify(classification_definition_quantile))
        
                            var quantile_renderer = await ajax_datatype_json(get_quantile_renderer_url)
                                            
                            console.log(' quantile render result is  ', quantile_renderer)
        
                            // error Accessor#set Invalid property value, 
                            // value needs to be one of 'esri.renderers.HeatmapRenderer', 'esri.renderers.SimpleRenderer', 'esri.renderers.UniqueValueRenderer', 
                            // 'esri.renderers.ClassBreaksRenderer', 'esri.renderers.DotDensityRenderer', 'esri.renderers.DictionaryRenderer', 'esri.renderers.PieChartRenderer', 
                            // or a plain object that can autocast (having .type = 'heatmap', 'simple', 'unique-value', 'class-breaks', 'dot-density', 'dictionary', 'pie-chart')
                            //backgroundFeatureLayer.renderer = quantile_renderer;
        
                            for (let i = 1; i < 5; i++) {
                            quantity_class_range_array[i] = quantile_renderer.classBreakInfos[i - 1].classMaxValue
                            //quantity_class_range_array[i] = (quantile_renderer.classBreakInfos[i - 1].classMaxValue).toFixed(2)
                            }

                            populate_from_to_form(quantity_class_range_array)


                            
                            if (symbolType_radioValue == 'quantity'){
                              re_render_layer('quantity')
                            }

                        // .. .. .. end .. .. .. after get max min - build form color - rerender .. .. ..
                        

                      });
                  
                    
                  // ---  end  ---  get max min value method 1
                  /**/ 
                  
                  


                /*   works, keep, for none-esri map
                //   ---   get max min value method 2 ---   rest api : 
                     // Using output statistics in ArcGIS REST API query  https://gis.stackexchange.com/questions/297327/using-output-statistics-in-arcgis-rest-api-query
                     // groupByFieldsForStatistics,  outStatistics,  https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm

                     var outStatistics_param = [
                                                 {
                                                    "statisticType": "MAX",
                                                    "onStatisticField": __quantity_field_name,
                                                    "outStatisticFieldName": "max_value"
                                                  },

                                                  {
                                                    "statisticType": "MIN",
                                                    "onStatisticField": __quantity_field_name,
                                                    "outStatisticFieldName": "min_value"
                                                  },

                                                ]

                    var get_max_min_value_url = background_layer_url + '/query?f=json&where=1=1&outStatistics=' + encodeURIComponent(JSON.stringify(outStatistics_param))

                    var results = await ajax_datatype_json(get_max_min_value_url)
                                                
                    console.log(' rest api, get max, min ', results)


                    
                    // .. .. .. after get max min - build form color - rerender .. .. ..
                            max_value = results.features[0].attributes.max_value
                            min_value = results.features[0].attributes.min_value
                            console.log('max min ', max_value, min_value,  results)
                          
                            maxmin_differences = (max_value - min_value).toFixed(2)
                            maxmin_interval = (maxmin_differences / 5).toFixed(2)
                            quantity_class_range_array[0] = min_value
                            quantity_class_range_array[5] = max_value
                            $('#field_name_span').html(current_quantityFieldName)
                            $('#min_value_span').html(min_value)
                            $('#max_value_span').html(max_value)

                             // local equal interval
                            //for (let i = 1; i < 5; i++) {
                              //quantity_class_range_array[i] = (min_value + (maxmin_interval * i)).toFixed(2)
                            //}
                           

                            var classification_definition_quantile = {
                              "type": "classBreaksDef",
                              "classificationField": current_quantityFieldName,
                              "classificationMethod": "esriClassifyQuantile",
                              "breakCount": 5,
                              }
        
                            var get_quantile_renderer_url = background_layer_url + '/generateRenderer?&where=&f=json&classificationDef=' + encodeURIComponent(JSON.stringify(classification_definition_quantile))
        
                            var quantile_renderer = await ajax_datatype_json(get_quantile_renderer_url)
                                            
                            console.log(' quantile render result is  ', quantile_renderer)
        
                            // error Accessor#set Invalid property value, 
                            // value needs to be one of 'esri.renderers.HeatmapRenderer', 'esri.renderers.SimpleRenderer', 'esri.renderers.UniqueValueRenderer', 
                            // 'esri.renderers.ClassBreaksRenderer', 'esri.renderers.DotDensityRenderer', 'esri.renderers.DictionaryRenderer', 'esri.renderers.PieChartRenderer', 
                            // or a plain object that can autocast (having .type = 'heatmap', 'simple', 'unique-value', 'class-breaks', 'dot-density', 'dictionary', 'pie-chart')
                            //backgroundFeatureLayer.renderer = quantile_renderer;
        
                            for (let i = 1; i < 5; i++) {
                            quantity_class_range_array[i] = quantile_renderer.classBreakInfos[i - 1].classMaxValue
                            //quantity_class_range_array[i] = (quantile_renderer.classBreakInfos[i - 1].classMaxValue).toFixed(2)
                            }
                            

                            populate_from_to_form(quantity_class_range_array)


                            
                            if (symbolType_radioValue == 'quantity'){
                              re_render_layer('quantity')
                            }

                        // .. .. .. end .. .. .. after get max min - build form color - rerender .. .. ..
                    

                 // ---  end  ---  get max min value method 2
                 */





                }//if
               
              }




              function populate_from_to_form(__array_){

                $("#from_1").val(__array_[0])
                $("#to_1").val(__array_[1])

                $("#from_2").val(__array_[1])
                $("#to_2").val(__array_[2])

                $("#from_3").val(__array_[2])
                $("#to_3").val(__array_[3])

                $("#from_4").val(__array_[3])
                $("#to_4").val(__array_[4])

                $("#from_5").val(__array_[4])
                $("#to_5").val(__array_[5])

              }


              function disable_quantity_color(){

                console.log('disable quantity color related all radio input button')
                $('input[type=radio][name=colorScale_radio]').attr("disabled", true);
                $('input[type=text][name=class_range_from_to_input_text]').attr("disabled", true);
                $('input[type=radio][name=quantityField_eachField_radio]').attr("disabled", true);
                $('#apply_value_change_btn').attr("disabled", true);
                $('#equal_interval_btn').attr("disabled", true);
                $('#equal_interval_local_btn').attr("disabled", true);
                $('#natural_breaks_btn').attr("disabled", true);
                $('#quantile_btn').attr("disabled", true);

              }

             

              function enable_quantity_color(){

                console.log('enable quantity color related all radio input button')
                $('input[type=radio][name=colorScale_radio]').removeAttr("disabled");
                $('input[type=text][name=class_range_from_to_input_text]').removeAttr("disabled");
                $('input[type=radio][name=quantityField_eachField_radio]').removeAttr("disabled");
                $('#apply_value_change_btn').removeAttr("disabled");
                $('#equal_interval_btn').removeAttr("disabled");
                $('#equal_interval_local_btn').removeAttr("disabled");
                $('#natural_breaks_btn').removeAttr("disabled");
                $('#quantile_btn').removeAttr("disabled");
              }
              
              function disable_customized_color(){
                      
                $('#fill_color_div').attr("disabled", true);    // not work, disable color picker
               
                $('#symbol_color_div').attr("disabled", true);    // not work, disable color picker

                $('#line_width_range').attr("disabled", true);

                $('#point_radius_range').attr("disabled", true);
              }

              function enable_customized_color(){
                
                $('#fill_color_div').removeAttr("disabled"); // not work, disable color picker
                
                $('#symbol_color_div').removeAttr("disabled");  // not work, disable color picker

                $('#line_width_range').removeAttr("disabled");

                $('#point_radius_range').removeAttr("disabled");
                }


              // only for featureLayer
              function build_quantity_renderer(){

                    console.log("build quantity renderer", current_colorScale, current_quantityFieldName, quantity_class_range_array )
                    console.log("color scale", current_colorScale, color_scale_outline_width, color_scale_outline_color,  color_scale)

                    // ----------- get geometry type  -----------
                      console.log( ' backgroundFeatureLayer.geometryType ......>'  , backgroundFeatureLayer.geometryType)
                      
  
                      var _geometry_type_ = backgroundFeatureLayer.geometryType.toLowerCase()
                      var _symbol_type_ = "simple-fill" // default polygon
  
                      if (_geometry_type_ == 'polygon'){
                        _symbol_type_ = "simple-fill"
                      } 
                      if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                        _symbol_type_ = "simple-marker"
                      }   

                      if (_geometry_type_ == 'polyline') {
                        _symbol_type_ = "simple-line"
                       }   
  
                    // ----- --- --- End --- --- --- ---   get geometry type  -----------

                    if ((current_colorScale) && (current_quantityFieldName)  && (quantity_class_range_array)){

                                let quantity_class_breaks_renderer = new ClassBreaksRenderer({
                                  // attribute of interest 
                                  field: current_quantityFieldName
                                });
                                

                              
                                // .. . . warning: for MapImageLayer.renderer,   class break order matters, must from min to max, from 1 to 5 .. . . 
                                // otherwise, if revers from 5 to 1, will cause  dynamicLayer, renderer object, "minValue": set to wrong value. 
                                // however, FeatureLayer.renderer does not affect by this bug. 

                                quantity_class_breaks_renderer.addClassBreakInfo({
                                  minValue: quantity_class_range_array[0],
                                  maxValue: quantity_class_range_array[1],
                                  //  "label": "1",
                                  // "description": "",
                                  symbol: {
                                    type: _symbol_type_, //"simple-fill",  // autocasts as new SimpleFillSymbol()
                                    color:   color_scale[current_colorScale][1],  
                                    outline: {  // autocasts as new SimpleLineSymbol()
                                      width: color_scale_outline_width,
                                      color: color_scale_outline_color,
                                    }, 

                                    // only for line
                                    width: line_stroke_weight[1],
                                    // style: "short-dot",

                                    // only for point
                                    size: point_marker_size_radius[1], // 10,

                                  }
                                });




                                quantity_class_breaks_renderer.addClassBreakInfo({
                                  minValue: quantity_class_range_array[1],
                                  maxValue: quantity_class_range_array[2],
                                   //  "label": "1",
                                  // "description": "",
                                  symbol: {
                                    type: _symbol_type_, //"simple-fill",  // autocasts as new SimpleFillSymbol()
                                    color:   color_scale[current_colorScale][2],  
                                    outline: {  // autocasts as new SimpleLineSymbol()
                                      width: color_scale_outline_width,
                                      color: color_scale_outline_color,
                                    }, 

                                    // only for line
                                    width: line_stroke_weight[2],
                                    // style: "short-dot",

                                    // only for point
                                    size: point_marker_size_radius[2], // 10,
                                  }
                                });


                              


                                quantity_class_breaks_renderer.addClassBreakInfo({
                                  minValue: quantity_class_range_array[2],
                                  maxValue: quantity_class_range_array[3],
                                   //  "label": "1",
                                  // "description": "",
                                  symbol: {
                                    type: _symbol_type_, //"simple-fill",  // autocasts as new SimpleFillSymbol()
                                    color:   color_scale[current_colorScale][3],  
                                    outline: {  // autocasts as new SimpleLineSymbol()
                                      width: color_scale_outline_width,
                                      color: color_scale_outline_color,
                                    }, 

                                    // only for line
                                    width: line_stroke_weight[3],
                                    // style: "short-dot",

                                    // only for point
                                    size: point_marker_size_radius[3], // 10,
                                  }
                                });



                                quantity_class_breaks_renderer.addClassBreakInfo({
                                  minValue: quantity_class_range_array[3],
                                  maxValue: quantity_class_range_array[4],
                                   //  "label": "1",
                                  // "description": "",
                                  symbol: {
                                    type: _symbol_type_, //"simple-fill",  // autocasts as new SimpleFillSymbol()
                                    color:   color_scale[current_colorScale][4],  
                                    outline: {  // autocasts as new SimpleLineSymbol()
                                      width: color_scale_outline_width,
                                      color: color_scale_outline_color,
                                    }, 

                                    // only for line
                                    width: line_stroke_weight[4],
                                    // style: "short-dot",

                                    // only for point
                                    size: point_marker_size_radius[4], // 10,
                                  }
                                });




                                quantity_class_breaks_renderer.addClassBreakInfo({
                                  minValue: quantity_class_range_array[4],
                                  maxValue: quantity_class_range_array[5],
                                   //  "label": "1",
                                  // "description": "",
                                  symbol: {
                                    type: _symbol_type_, //"simple-fill",  // autocasts as new SimpleFillSymbol()
                                    color:   color_scale[current_colorScale][5],  
                                    outline: {  // autocasts as new SimpleLineSymbol()
                                      width: color_scale_outline_width,
                                      color: color_scale_outline_color,
                                    }, 

                                    // only for line
                                    width: line_stroke_weight[5],
                                    // style: "short-dot",

                                    // only for point
                                    size: point_marker_size_radius[5], // 10,
                                  }
                                });
                              
                              
                                console.log('featurelayer class breaks renderer  ', quantity_class_breaks_renderer)

                                backgroundFeatureLayer.renderer = quantity_class_breaks_renderer;
                   

                  } else {

                     console.log(' can not create quantity renderer, due to some value are not ready')
                     // quantity renderer failed, just use native renderer
                   

                  }
              }

        /**/
        //   --- --- end --- --- quantity color --- --- --- ---  
        /**/


               
                           



/**/


                        // %%%%%%%%%%% coordinate widget %%%%%%%%%%%%%%




                        function coordinate_widget() {

                          var coordsWidget = document.createElement("div");
                          coordsWidget.id = "coordsWidget";
                          //coordsWidget.className = "esri-widget esri-component";
                          //coordsWidget.style.padding = "7px 15px 5px";
                          coordsWidget.style.backgroundColor = "rgba(0,0,0, .40)";                                              
                          view.ui.add(coordsWidget, "bottom-left");

                         
                          
                          view.on("pointer-move", function (evt) {
                            showCoordinates(view.toMap({ x: evt.x, y: evt.y }),    "Mouse-Pointer");
                          });
                        }



                        // 2D map view only
                        function showCoordinates(pt, _type) {

                                  var coords =
                                                "Lat: " +
                                                pt.latitude.toFixed(3) + "<span>&#176;</span>" + 
                                                " | Long: " +
                                                pt.longitude.toFixed(3) + "<span>&#176;</span>" +
                                                //    " | Scale 1:" +
                                                //    Math.round(view.scale * 1) / 1 +
                                                " | Zoom: " +
                                              view.zoom +
                                                " | " + _type
                                                ;

                                  var _coordsWidget = document.getElementById("coordsWidget")
                                  _coordsWidget.innerHTML = coords;

                                  if (_type == "Map-Center"){
                                          _center_lat = pt.latitude
                                          _center_long = pt.longitude
                                          _center_zoom = view.zoom;  // extent don't have zoom, zoom only from view
                                            update_url_parameter("_center_lat", _center_lat)
                                            update_url_parameter("_center_long", _center_long)
                                            update_url_parameter("_center_zoom", _center_zoom)
                                            // do not pan to real location, since user already zoom pan to user's location, add panto=0 to turn off pan to real location function.
                                            update_url_parameter("panto", 0)

                                                      /**/
                                                      //   --- --- --- --- back to previous extent --- --- --- ---
                                                      /**/
                                                          var new_extent = {
                                                                          "center_lat": _center_lat,
                                                                          "center_long": _center_long,
                                                                          "center_zoom": _center_zoom
                                                                        }
                                                          extentStack.push(new_extent)
                                                          console.log('extent stack just add new extent', extentStack.count, new_extent)

                                                      /**/
                                                      //   --- --- end --- --- back to previous extent --- --- --- ---  
                                                      /**/ 


                                            }// if
                        }




                                    




            // %%%%%%%%%%% end %%%%%%%%%%%  coordinate widget %%%%%%%%%%%%%%
/**/




function show_info_outline_Tab(___properties){

  $("#info_outline").show()
  // ===== ==== === == field mask ===== ==== === == 
  var fieldMasked_properties = removeFieldsByFieldMask(___properties)
  //  ===== ==== === == end  ===== ==== === == field mask ===== ==== === ==
  
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
}

function empty_info_outline_Tab(){
$('#info_outline').hide();
$('#info-window-div').html("")
}
              










                /**/
                // -- -- -- featurelayer clientside label  -- -- -- 
                /**/



                        function init_label(){

                          if (param_dynamicLabel){
                            current_dynamicLabel = param_dynamicLabel
                            current_classifyFieldName = current_dynamicLabel
                          }
                        
                          // -- -- -- featurelayer clientside label  -- -- --
                          init_dynamic_label(_featurelayerJSON)
                          //  -- -- --  end  -- -- -- featurelayer clientside label  -- -- -- 


                        } 


                        // only for single layer 
                        function change_label_handler(_labelAs_fieldName){


                           
                         
                          console.log(' dynamicLabel_eachField_radio ,  change to ', _labelAs_fieldName)
                          
                         
                          // bug fix, for all movable box, must explicitly add 'checked=checked' attribute to the labelAsRadioTag, also remove 'checked' from all other  labelAsRadioTag
                          // only for single layer 
                          $('input[type=radio][name=dynamicLabel_eachField_radio]').removeAttr('checked')
                          $('#'+_labelAs_fieldName).attr('checked', true)




                          if (_labelAs_fieldName == 'nolabel'){

                            backgroundFeatureLayer.labelsVisible = false 

                          } else {

                            bglayer_labelExpression = "$feature." + _labelAs_fieldName
                            bglayer_labelExpression_MapImage = '[' + _labelAs_fieldName + ']'

                            bglayer_labelClass = new LabelClass({
                            //  MapImageLayer can use both labelExpression and labelExpressionInfo(support Arcade)
                            //  FeatureLayer can only use labelExpressionInfo(must support Arcade)  https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#labelExpression

                                    labelExpressionInfo: { expression: bglayer_labelExpression }, // featuerlayer must use this, must support Arcade
                                    //labelExpression: bglayer_labelExpression_MapImage,              // featuerlayer can not use this

                                    symbol: {
                                      type: "text",  // autocasts as new TextSymbol()
                                      color: bglayer_labelColor,
                                      haloSize: 1.5,
                                      haloColor: "white",
                                      font: { family: "Arial Unicode MS", size: bglayer_labelFontSize, weight: "bold" },
                                    }
                            });

                            backgroundFeatureLayer.labelingInfo = bglayer_labelClass
                            backgroundFeatureLayer.labelsVisible = true        
                                        

                          }//if


                          update_url_parameter('dynamicLabelField', _labelAs_fieldName)

                         
                         
                        
                        }

                                              
                      

                      // single layer only
                      function init_dynamic_label(___feature_layer_full_JSON){

                       

                        if (___feature_layer_full_JSON.geometryType){
                             current_geometryType = ___feature_layer_full_JSON.geometryType
                        } else {
                             current_geometryType = ''
                        }
                        



                       // ---------- build label as field ---- radio ---- event -----------

                       /**/
                                      // warning:  .fields can be null, if layer is only raster image  
                                      if (___feature_layer_full_JSON.fields) {

                                                    var _fields_array = ___feature_layer_full_JSON.fields

                                                    var _dynamicLabel_html = '<fieldset class="eachLabelAsClass">'
                                                    _dynamicLabel_html += '<legend>'
                                                    _dynamicLabel_html += '<b>Label as &nbsp;&nbsp;</b>'
                                                    _dynamicLabel_html += '<span style="color: white; background-color:' + bglayer_labelColor  + ';">&nbsp;&nbsp;&nbsp;' + bglayer_labelColorName + '&nbsp;&nbsp;&nbsp;</span>'
                                                    _dynamicLabel_html += '<sup><span style="font-size: 8px;"> rendering locally in your browser</span></sup>'
                                                    _dynamicLabel_html += '</legend>'

                                                   



                                                    /**/
                                                    // ##  'no label' radio ## 
                                                    _dynamicLabel_html +=    '<label>'
                                                    if (current_dynamicLabel == 'nolabel') {
                                                              // checked
                                                              _dynamicLabel_html +=       '<input type="radio" value="' + 'nolabel' + '" name="dynamicLabel_eachField_radio" id="' + 'nolabel' + '" checked/>'
                                                    } else {
                                                              // un-checked
                                                              _dynamicLabel_html +=       '<input type="radio" value="' + 'nolabel' + '" name="dynamicLabel_eachField_radio" id="' + 'nolabel' + '"/>'
                                                    }
                                                    _dynamicLabel_html +=       '<span class="fieldName white-font-black-background">' + '&nbsp;' + 'No Label' + '&nbsp;'  + '</span>'                                                      
                                                    _dynamicLabel_html +=     '</label>'
                                                    _dynamicLabel_html +=   '<br>'
                                                    // ## end ##  'no label' radio ## 
                                                    /**/
                                                     



                                                    // other field radio 
                                                    for (var i = 0; i < _fields_array.length; i++) {
                                                                                
                                                                  var ____fieldDisplayName = _fields_array[i].alias             
                                                  var ____fieldType = _fields_array[i].type
                                                                  var ____fieldName = _fields_array[i].name
                                                                
                                                                // _dynamicLabel_html +=  '<p>'
                                                                  _dynamicLabel_html +=    '<label>'

                                                                  if (current_dynamicLabel == ____fieldName) {
                                                                          // checked
                                                                          _dynamicLabel_html +=       '<input type="radio" value="' + ____fieldName + '" name="dynamicLabel_eachField_radio" id="' + ____fieldName + '"  checked />'
                                                                  } else {
                                                                          // un-checked
                                                                          _dynamicLabel_html +=       '<input type="radio" value="' + ____fieldName + '" name="dynamicLabel_eachField_radio" id="' + ____fieldName + '"/>'
                                                                  }
                                                                  
                                                                  //   --- --- --- --- quantity color --- --- --- --- context class for mark.js highlight
                                                                  _dynamicLabel_html +=       '<span class="fieldName context">'  + '&nbsp;' + ____fieldName  + '</span>'

                                                                  _dynamicLabel_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
                                                                  _dynamicLabel_html +=     '</label>'
                                                                //  _dynamicLabel_html +=   '</p>'
                                                                _dynamicLabel_html +=   '<br>'
                                                                  


                                                    }//for   
                                                    
                                                    
                                                    _dynamicLabel_html +=   '</fieldset>'
                                                    var _dynamiclabel_div_tag = document.getElementById("dynamic-label")
                                                    _dynamiclabel_div_tag.innerHTML = _dynamicLabel_html


                                                    
                                                    $('input[type=radio][name=dynamicLabel_eachField_radio]').on('change', function() {
                                                            current_dynamicLabel = $(this).val()
                                                            current_classifyFieldName = current_dynamicLabel

                                                            change_label_handler(current_dynamicLabel)
                                                    });

                                              
                                        }//if  



                             //  ----------- end  ---------- build label as field ---- radio ---- event -----------




                             /**/


                             // first time load, run one time, label as url parameter, current_dynamicLabel indicated. 
                             change_label_handler(current_dynamicLabel)



                            }//function


                /**/
                //  -- -- --  end  -- -- -- featurelayer clientside label  -- -- -- 
                /**/



                  
            
            /**/
            // ===== ==== === == field mask ===== ==== === == 
            /**/


                function removeFieldsByFieldMask(_allFieldsProperties){
                  if (_allFieldsProperties) {
                    if (_fieldmask_field_need_remove_array) {
                      if (_fieldmask_field_need_remove_array.length > 0) {
                        for (var m = 0; m < _fieldmask_field_need_remove_array.length; m++) {
                          delete _allFieldsProperties[_fieldmask_field_need_remove_array[m]];
                        }//for 
                      }//if
                    }//if
                  }//if
                  
                  return _allFieldsProperties
                }



                // not use, but keep, remove item from array  https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
                function removeItemFromArray(array, item){
                  for(var i in array){
                      if(array[i]==item){
                          array.splice(i,1);
                          break;
                      }
                  }
                }


                async function init_field_mask(){


                    /**/
                    // ===== ==== === == field mask ===== ==== === == 
                    /**/
                    var ___feature_layer_full_JSON =  _featurelayerJSON
                    /**/
                    // ===== ==== end === == field mask ===== ==== === == 
                    /**/




                        // warning:  .fields can be null, if layer is only raster image  
                        if (___feature_layer_full_JSON.fields) {

                                              var _fields_array = ___feature_layer_full_JSON.fields

                                              var _fieldmask_html = '<br>'

                                                            _fieldmask_html += '&nbsp;&nbsp;&nbsp;&nbsp;'
                                                              
                                                                _fieldmask_html +=    '<label>'
                                                                _fieldmask_html +=       '<input type="checkbox" id="check_all_field" checked/>'
                                                                _fieldmask_html +=       '<span>Show All Fields</span>'
                                                                _fieldmask_html +=     '</label>'
                                                            
                                                            _fieldmask_html += '<fieldset>'
                                                          
                                                  // ....  end   ....  check all  .... uncheck all  ....



                          
                                                    for (var i = 0; i < _fields_array.length; i++) {
                                                                          
                                                            var ____fieldDisplayName = _fields_array[i].alias             
                                                  var ____fieldType = _fields_array[i].type
                                                            var ____fieldName = _fields_array[i].name
                                                            _fieldmask_all_field_array.push(____fieldName)

                                                          // _fieldmask_html +=  '<p>'
                                                            _fieldmask_html +=    '<label>'
                                                            _fieldmask_html +=       '<input type="checkbox" value="' + ____fieldName + '" name="each_field" id="each_field_' + i + '"  checked/>'
                                                            
                                                            //   ---  context class for mark.js highlight  ---
                                                            _fieldmask_html +=       '<span class="fieldName context">' + '&nbsp;' + ____fieldName  + '</span>'

                                                            _fieldmask_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
                                                            _fieldmask_html +=     '</label>'
                                                          //  _fieldmask_html +=   '</p>'
                                                          _fieldmask_html +=   '<br>'
                                                            


                                                    }//for   

                                                    _fieldmask_showing_field_array = structuredClone(_fieldmask_all_field_array)
                                                    
                                                    
                                                    _fieldmask_html +=   '</fieldset>'
                                                    var _fieldmask_div_tag = document.getElementById("fields-mask-div")
                                                    _fieldmask_div_tag.innerHTML = _fieldmask_html


                                                    // event
                                                    $('#check_all_field').on('change', function(){ // on change of state

                                                            $("input[name='each_field']").prop('checked', $(this).prop("checked"));
                                                            console.log(' check all current status ', $(this).prop("checked") )

                                                            if (this.checked){ 
                                                              
                                                              _fieldmask_showing_field_array = structuredClone(_fieldmask_all_field_array)
                                                              console.log(' show all field now', _fieldmask_showing_field_array)
                                                              _fieldmask_field_need_remove_array = [] 

                                                            } else {
                                                            
                                                              _fieldmask_showing_field_array = []
                                                              _fieldmask_field_need_remove_array = structuredClone(_fieldmask_all_field_array)
                                                              console.log(' empty all field', _fieldmask_showing_field_array)
                                                            }

                                                          
                                                  })


                                                  var eachFieldId
                                                  for (var i = 0; i < _fields_array.length; i++) {

                                                            eachFieldId = '#each_field_' + i

                                                            $(eachFieldId).on('change', function(){ 

                                                                        if (this.checked){  
                                                                          console.log(' show this field ', this.value)

                                                                        } else {
                                                                          console.log(' remove this field ', this.value)
                                                                        }

                                                                        // uncheck 'show all field'
                                                                        $('#check_all_field').prop('checked', false);

                                                                        var $boxes = $('input[name=each_field]:not(:checked)');

                                                                        _fieldmask_field_need_remove_array = []

                                                                        // not use, but keep
                                                                        _fieldmask_showing_field_array = structuredClone(_fieldmask_all_field_array)

                                                                        console.log(' current showing field before remove anything, all field array ', _fieldmask_showing_field_array)

                                                                        // loop through see what field is unchecked, will be remove later
                                                                        $boxes.each(function(){

                                                                                  console.log('unchecked ', this.value, this.id)
                                                                                  _fieldmask_field_need_remove_array.push(this.value)
                                                                                  
                                                                                  // not use, but keep
                                                                                  removeItemFromArray(_fieldmask_showing_field_array, this.value);
                                                                        });
                                                                        
                                                                        console.log(' current showing field after remove something ', _fieldmask_showing_field_array)

                                                                      
                                                            })

                                                  }//for  





                                                    
                        }//if  
                }//function

            /**/
            //  ===== ==== === == end  ===== ==== === == field mask ===== ==== === == 
            /**/





     

 /**/
            //  - - -   - - -  esri print widget   - - -   - - - 
            /**/

            var print_on_mapview
            var print_outside_mapview

                  // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-print
                  function init_esri_print_widget(){

                    print_on_mapview = new Print({
                      id: "esri-print-widget-id",
                      view: view,
                      // specify your own print service
                      printServiceUrl:
                        "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                      }
                    );
                    // Add widget to the top right corner of the view
                    //view.ui.add(print, "top-left");

                    print_outside_mapview = new Print({
                      id: "outside-esri-print-widget-id",
                      view: view,
                      // specify your own print service
                      printServiceUrl:
                        "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                      },
                      'esri-print-wiget-outside-mapview-div'
                    );

                    

                  }


            /**/
            //  --- end  ---  - - -   - - -  esri print widget  - - -   - - -  
            /**/


                     


      /**/
      //  --- POI point of interest search esri     --- 
      /**/

                


            // has view, inside of require scope
            

            function get_center_radius_in_map_bound(){

              var _map_extent_height_InMapUnit = view.extent.height
              var _map_extent_width_InMapUnit = view.extent.width

              // both works
              //const spatialRef = map.spatialReference;
              const spatialRef = view.extent.spatialReference;

              var _map_extent_height_InMeters = _map_extent_height_InMapUnit * spatialRef.metersPerUnit; 
              var _map_extent_width_InMeters = _map_extent_width_InMapUnit * spatialRef.metersPerUnit;
              var min_radius
              if (_map_extent_height_InMeters <= _map_extent_width_InMeters){
                min_radius = Math.floor(_map_extent_height_InMeters / 2.7) // 2 is too large, over bottom line
              } else {
                min_radius = Math.floor(_map_extent_width_InMeters / 2.7) // 2 is too large, over bottom line
              }
         
              // esri limit radius max radius 10,000 meters https://developers.arcgis.com/documentation/mapping-and-location-services/place-finding/nearby-search/
              // If the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 10,000 meters (about 5 miles).
              if (min_radius > max_esri_poi_radius_meter){
                min_radius = max_esri_poi_radius_meter
              }

              console.log("min_radius in meter", min_radius)
              return min_radius
            }



            function resetPagination(){

              $('#pagination-container').show();

              // esri max poi return limit is 200, page size 20, will be 10 page
              page_sources=[];
              for (var i = 1; i <= 200; i++) {
              page_sources.push(i);
              }//for 


              $('#pagination-container').pagination({
                dataSource: page_sources,
                pageSize: page_size,
                showGoInput: true,
                showGoButton: true,
                className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                callback: function(data, pagination) {


                    console.log('pagination call back data, returned data -> ', data) 
                    // .... fix bug if data is [] ....
                    var _off_set;
                    if (data.length == 0) {
                        _off_set = 0;
                    }else {
                    _off_set = data[0]-1;
                    }
                    // .... fix bug if data is [] ....


                    
                    console.log('pagination --- ', pagination)

                    nearby_poi(page_size,_off_set);
            
                }
            })   //$('#pagination-container) 

            }


            async function nearby_poi(__page_size__, __off_sets___){

            

              search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
              console.log('nearby poi keyword --->  ', search_poi_keyword)

              var _map_center_point = view.center             
              _center_radius_in_meter = get_center_radius_in_map_bound() 
              console.log(' near by poi _map_center_point', _map_center_point)
              console.log(' near by poi _center_radius_in_meter', _center_radius_in_meter)



               // Pass search area, categories, and API Key to places service
               // Parameters for queryPlacesNearPoint()
                const placesQueryParameters = new PlacesQueryParameters({

                  // api https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-PlacesQueryParameters.html#properties-summary
                  // normal esri developer api key not working, must be esri location api key
                  apiKey: esri_location_api_key,

                  
                  // esri place api, max give you 200 poi on each search.
                  pageSize: __page_size__, // page size must between 1 and 20
                  offset: __off_sets___,  // max offset 199
                  searchText: search_poi_keyword,
                 
                  // without category will cross all category
                  //categoryIds: [10000], // [activeCategory], 
                  

                  // not working, must use point and radius, turns out as x,y,radius in url
                  //extent: view.extent
                  radius: _center_radius_in_meter,
                  point: _map_center_point,

                });


                // The results variable represents the PlacesQueryResult
                const results = await places.queryPlacesNearPoint(
                  placesQueryParameters
                );


                console.log(' near by poi results', results)


                
                showResults_placeAPI(results);

            }


            
            function showResults_placeAPI(results) {

              view.closePopup();
              view.graphics.removeAll();

              // place api, results is different, {pagination:{},  results:{}}
              results.results.forEach((result)=>{

                console.log('show result', result)


                // --- label POI  --- 
                /* both works
                var text_symbol = new TextSymbol(result.name);
                text_symbol.color = poi_color
                text_symbol.haloColor = poi_outlineColor
                text_symbol.haloSize = poi_outlineWidth
                */
                var text_symbol = new TextSymbol({ 

                                                  text: result.name,
                                                  color: poi_TextColor,
                                                  font:  poi_font,
                                                  haloColor: poi_haloColor,
                                                  haloSize: poi_haloSize,
                                                  horizontalAlignment: "center",
                                                  lineHeight: poi_lineHeight,
                                                  lineWidth: poi_lineWidth,

                });



                var _categories_string=''
                var _categories_array=[]
                for (let i = 0; i < result.categories.length; i++) {
                  _categories_array.push(result.categories[i].label)
                }//for
                _categories_string = _categories_array.toString()


                var _attribute_for_popup = {
                  name: result.name,
                  category: _categories_string,
                }



                var graphic_symbol =  new Graphic({
                  attributes: _attribute_for_popup,
                  geometry: result.location,

                  //  -- simple marker symbol  -- 
                      symbol: {
                          // autocasts as new SimpleMarkerSymbol()
                          type: "simple-marker",
                          color: poi_color,   //"yellow",
                          size:  poi_size,  // all works "31pt", "31px",
                          style: poi_style, // diamond, triangle, cross, x, circle, path, square
                          // autocasts as new SimpleLineSymbol()
                          outline: {
                            // simple marker builder, https://sagewall.github.io/symbol-builder/simple-marker-symbol/
                            color: poi_outlineColor,  //"#efefef",
                            width: poi_outlineWidth
                          }
                      },
                  // -- end  -- simple marker symbol  -- 
              
                  popupTemplate: {
                    title: "Name: {name}",
                    content:"Category: {category}" 
                  }
                 
                })// graphic symbol

              

                var graphic_text =  new Graphic({
                  attributes: _attribute_for_popup,
                  geometry: result.location,

                  // --- label POI  --- 
                  // in use, text symbol as graphic label
                  symbol: text_symbol,
                  // --- end  --- label POI  --- 

                  popupTemplate: {
                      title: "Name: {name}",
                      content:"Category: {category}" 
                  }
                     
                })// graphic text

                // defaultPopupTemplateEnabled ( default is false ) https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html#getEffectivePopupTemplate
                graphic_symbol.getEffectivePopupTemplate(true)
                graphic_text.getEffectivePopupTemplate(true)
                
                // add symbol first, then add text on top of symbol
                view.graphics.add(graphic_symbol);
                view.graphics.add(graphic_text);
                
              }); // r e s u l t s


              /* not use
              // auto popup first record 
              if (results.length) {
                const g = view.graphics.getItemAt(0);
                view.openPopup({
                  features: [g],
                  location: g.geometry
                });
              }//if
              */


            }//function 







            function search_poi(event){

              
              search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
              
              console.log('search_poi_keyword --->  ', search_poi_keyword)


              // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
              if (search_poi_keyword){

                
                const params = {

                    // params api https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-locator.html#methods-summary
                    address: {
                      address: search_poi_keyword
                    },

                    //outFields: ["PlaceName","Place_addr"],
                    outFields: ["*"],


                    // Used to weight returned results for a specified area
                    //location: view.center,  // pt, San Francisco (-122.4194, 37.7749)
                    // Defines the extent within which the geocode server will search. Requires ArcGIS Server version 10.1 or greater.
                    searchExtent: view.extent,
                    

                    locationType: "rooftop",  //either "street" or "rooftop"
                    //categories: [],
                    countryCode: 'US',  // limit to  United States only
                    //maxLocations: ,

                }//p a r a m s



                locator.addressToLocations(geocodingServiceUrl, params).then((results)=> {

                  console.log('search poi results --->  ', results)
                  showResults(results);
                  
                });



              }//if
                    
                                

            }//function 


           // has view, inside of require scope
           // autocasts as new Font()
            var poi_font = new Font({ family: "Merriweather", size: "14px", style: "italic", weight: "bold" });
            
            function showResults(results) {

              $('#pagination-container').hide();


              view.closePopup();
              view.graphics.removeAll();


              results.forEach((result)=>{

                console.log('show result', result)


                // --- label POI  --- 
                /* both works
                var text_symbol = new TextSymbol(result.address);
                text_symbol.color = poi_color
                text_symbol.haloColor = poi_outlineColor
                text_symbol.haloSize = poi_outlineWidth
                */
                var text_symbol = new TextSymbol({ 

                                                  text: result.address,
                                                  color: poi_TextColor,
                                                  font:  poi_font,
                                                  haloColor: poi_haloColor,
                                                  haloSize: poi_haloSize,
                                                  horizontalAlignment: "center",
                                                  lineHeight: poi_lineHeight,
                                                  lineWidth: poi_lineWidth,

                });



                var graphic_symbol =  new Graphic({
                  attributes: result.attributes,
                  geometry: result.location,

                  //  -- simple marker symbol  -- 
                      symbol: {
                          // autocasts as new SimpleMarkerSymbol()
                          type: "simple-marker",
                          color: poi_color,   //"yellow",
                          size:  poi_size,  // all works "31pt", "31px",
                          style: poi_style, // diamond, triangle, cross, x, circle, path, square
                          // autocasts as new SimpleLineSymbol()
                          outline: {
                            // simple marker builder, https://sagewall.github.io/symbol-builder/simple-marker-symbol/
                            color: poi_outlineColor,  //"#efefef",
                            width: poi_outlineWidth
                          }
                      },
                  // -- end  -- simple marker symbol  -- 
              
                  popupTemplate: {
                    title: "Name: {PlaceName}",
                    //not use lat, lng ... + result.location.x.toFixed(5) + "," + result.location.y.toFixed(5)
                    content:"Address: {Place_addr}" + "<br>Phone: {Phone}" + "<br>Type:  {Type}"  + "<br>URL:  {URL}" 
                  }
                 
                })// graphic symbol

                var graphic_text =  new Graphic({
                  attributes: result.attributes,
                  geometry: result.location,

                  // --- label POI  --- 
                  // in use, text symbol as graphic label
                  symbol: text_symbol,
                  // --- end  --- label POI  --- 

                  popupTemplate: {
                      title: "Name: {PlaceName}",
                      //not use lat, lng ... + result.location.x.toFixed(5) + "," + result.location.y.toFixed(5)
                      content:"Address: {Place_addr}" + "<br>Phone: {Phone}" + "<br>Type:  {Type}"  + "<br>URL:  {URL}" 
                  }
                     
                })// graphic text

                // defaultPopupTemplateEnabled ( default is false ) https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html#getEffectivePopupTemplate
                graphic_symbol.getEffectivePopupTemplate(true)
                graphic_text.getEffectivePopupTemplate(true)
                
                // add symbol first, then add text on top of symbol
                view.graphics.add(graphic_symbol);
                view.graphics.add(graphic_text);
                
              }); // r e s u l t s


              /* not use
              // auto popup first record 
              if (results.length) {
                const g = view.graphics.getItemAt(0);
                view.openPopup({
                  features: [g],
                  location: g.geometry
                });
              }//if
              */


            }//function 




            // without view, can be out side of require scope

            function clear_search_poi_result(){

              // Do not clear key word in search bar
              //$('#search_poi_input').val('')
              //search_poi_keyword = ''
              //update_url_parameter('poi', '');

              // view.popup.close(); // only works with v4.30 and before
              view.closePopup(); // works with v4.31 and after
              view.graphics.removeAll();
            }


            function update_search_poi_content(){
              search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
              console.log('search_poi_keyword --->  ', search_poi_keyword)
              update_url_parameter('poi', search_poi_keyword);
            }


            function init_search_poi_event_handler(){


                    
                                                
                    console.log('url param search poi',  search_poi_keyword)

                    // first time, 1 time
                    // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
              if (search_poi_keyword){
                                search_poi_keyword = search_poi_keyword.toLowerCase().trim();
                                $('#search_poi_input').val(search_poi_keyword);
                    }// if


                                                
                    // only update URL search_data=xxx, not perform real search.
                    $("#search_poi_input").on('keyup', update_search_poi_content);

                    // search bar close icon clicked. clear everything.
                    $('#clear_poi_button').on('click', clear_search_poi_result);

                    $('#search_poi_button').on('click', search_poi);
                    $('#nearby_poi_button').on('click', resetPagination);
                    $('#pagination-container').hide(); // first time always hide paging bar
                    page_size = 20; // esir limit max 200 poi, custom page size 20 will get 10 page

                    // default search
                    $('#search_poi_input').on('search', search_poi);
            }


      /**/
      //  --- end  ---  POI point of interest search esri    --- 
      /**/




 

  // ************* view hover hittest  ************************
  
  view.when(function(){

    init_esri_print_widget() // - - -  esri print widget   - - -
                    
                        // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                        console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                        if (zoom_to_1st_feature){
                                                    // only zoom 1 time, first time, never zoom again
                                                    zoom_to_1st_feature = false; 
                                                    //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                                    pan_to_real_location()
                        }//if   
          
              })
              .then(function() {
                return backgroundFeatureLayer.when();
              })
              .then(function(layer) {

                console.log('background feature layer should be ready now, layer             ',  layer)
                console.log('background feature layer should be ready now, layer.renderer   ',  layer.renderer)


                        // first time only,  must init and get esri native renderer.
                        if (native_renderer == null) {
                                native_renderer = layer.renderer.clone();
                        }

                        
                        /**/
                        //   --- --- --- --- quantity color --- --- --- ---
                        /**/

                          // must be inside view.then, wait until native renderer get cloned. 
                          init_quantity_color()


                          // must after quantity color related html load completed.
                          symbol_changed()

                        /**/
                        //   --- --- end --- --- quantity color --- --- --- ---  
                        /**/
                      
                        return view.whenLayerView(layer);
          })
 

// ************* end *************  view hover hittest  ************************














                             


 

}); // require, everything should be inside







