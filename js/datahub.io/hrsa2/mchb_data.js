
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
 
   
  "esri/layers/support/LabelClass",

  "esri/renderers/ClassBreaksRenderer",  // mchb only

  "esri/rest/locator",
  "esri/rest/places",
  "esri/rest/support/FetchPlaceParameters",
  "esri/rest/support/PlacesQueryParameters",
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
          
            
            LabelClass,

            ClassBreaksRenderer,  // mchb only

            locator,
            places, 
            FetchPlaceParameters, 
            PlacesQueryParameters,
            
             Track,
             Locate,
             Graphic,
            
             Print,
            
             promiseUtils,
             reactiveUtils,
 
 
            ) {
    
    

              
               
              

              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer  
                         
           
            /**/
            //   --- --- --- --- quantity color --- --- --- ---
            /**/

            var current_colorScale = 'colorScale_red'  // default
           
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
 





              // any document ready function is in here
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



               //=================== toggle basemap ============================



                    /*   not use

                      // 1 - Create the widget
                        var toggle = new BasemapToggle({
                          // 2 - Set properties
                          view: view, // view that provides access to the map's 'topo' basemap
                          nextBasemap: "streets-vector" // allows for toggling to the 'hybrid' basemap
                        });

                        // Add widget to the top right corner of the view
                        view.ui.add(toggle, "top-right");

                    */





                        // in use
                        // Create a BasemapGallery widget instance and set
                        // its container to a div element

                        
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






                  //========  end =========== toggle basemap ============================
              


                    //track current location https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
                    
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





                       
  


          async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

                          
            


                          backgroundFeatureLayer = new FeatureLayer({
                                                                      
                                                                      //https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html

                                                                      // url:  "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
                                                                        url: background_layer_url,

                                                                        /**/
                                                                        // ===== ==== === == field mask ===== ==== === == 
                                                                        /**/

                                                                          outFields: _fieldmask_showing_field_array,  // will have you defined fields

                                                                        /**/
                                                                        // ===== ==== end === == field mask ===== ==== === == 
                                                                        /**/
                                                                        
                                                                        opacity: groundoverlay_opacity,

                                                                       // by default, is nolabel 
                                                                       // labelingInfo: bglayer_labelClass,
                                                                       // labelsVisible: true,
                                                    });

                          map.add(backgroundFeatureLayer);  // not use, use map properties instead
              

                           /*
                                  queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
                                  How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
                           */
                          backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                                    // prints the total count to the console
                                    console.log('total count is : ', numFeatures);
                                    total_feature_count = numFeatures
                                    update_statistic_info(current_feature_rendered , total_feature_count)

                                  });



                          view.whenLayerView(backgroundFeatureLayer).then(function(layerView){

                                                                 

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
                          
                          
                          });// view . when
                          
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
                            




  
  
  


                               






      
      function init_feature_layer_view(){

                                //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                                //view.on("pointer-move", function(event){


                                // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
                                view.on("click", function(event){

                                  view.hitTest(event).then(function(response){

                                   


                                                  if (response.results.length) {

                                                    let hitResult = response.results.filter(function (result) {
                                                                                return result.graphic.layer === backgroundFeatureLayer;
                                                                              })
                                                    let graphic                                                        
                                                    if (hitResult[0]){
                                                                          graphic = hitResult[0].graphic;
                                                                          
                                                                          console.log(' ! * ! hit test ! * ! result ! * ! graphic ! * ! ', graphic )

                                                                          show_info_outline_Tab(graphic.attributes)

                                                                          view.whenLayerView(graphic.layer)

                                                                                .then(function(layerView){
                                                                      
                                                                                                          if (mouse_pointed_feature_highlight_handle){
                                                                                                            mouse_pointed_feature_highlight_handle.remove()
                                                                                                          }
                                                                                                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic);
                                                                                                    });


                                                      }  // if hit result

                                                  } else {

                                                          // hit test do not find anything.
                                                          /**/

                                                          // remove highlight graphic on layer view
                                                            if (mouse_pointed_feature_highlight_handle){
                                                              mouse_pointed_feature_highlight_handle.remove()
                                                            }

                                                            // hide info outline 
                                                            empty_info_outline_Tab()


                                                  }

                                 

                                  }); // view . hit test

                                }); // view . on . click

                                // --  end  --- highlight feature on pointer-move
      }// function




  

                            
      /**/
      //==========================  renderer =================================================
      /**/
              

                      // mchb only
                      async function re_render_layer(symbolType){
                                                    
                        switch(symbolType) {

                          case 'native':
                            backgroundFeatureLayer.renderer = native_renderer;
                            break;

                          case 'customized':
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
                                                color:   _default_fillColor,  
                                                outline: {  // autocasts as new SimpleLineSymbol()
                                                  width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                                                  color: _default_strokeColor,
                                                
                                                }
                                              }
                                            };

                                            // line
                                            var polyline_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                type: "simple-line",  // autocasts as new SimpleFillSymbol()
                                                color: _default_strokeColor,
                                                width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  
                                              // style: "short-dot"

                                              }
                                            };

                                            // point
                                            var point_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                                color: _default_fillColor,
                                                size: _default_pointRadius, // 10,
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                    width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                                                    color: _default_strokeColor,
                                                }

                                              }
                                            };

                                            // ----------- re-render as our customized style, without this section, by default, it use esri native, original symbol  -----------
                                                              //view.goTo(featureLayer.fullExtent);
                                                              console.log( ' backgroundFeatureLayer.geometryType ......>'  , backgroundFeatureLayer.geometryType)
                                                              
  
                                                              var _geometry_type_ = backgroundFeatureLayer.geometryType.toLowerCase()
  
                                                          if (_geometry_type_ == 'polygon') {
  
                                                            backgroundFeatureLayer.renderer = polygon_renderer;
                                                            // backgroundFeatureLayer.renderer = polyline_renderer;
  
                                                          } 
  
  
                                                        if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
  
                                                          backgroundFeatureLayer.renderer = point_renderer;
  
                                                          }   
  
  
                                                          if (_geometry_type_ == 'polyline') {
  
                                                            backgroundFeatureLayer.renderer = polyline_renderer;
  
                                                          }   
  
                                          // ----------- End ------------  re-render as our customized style, without this section, by default, it use esri native, original symbol  -----------
                                
                            break;


                          default:
                                  // field name 
                                  console.log(' re render by symbol Type (field name) ',  symbolType)

                                  /**/ 
                                  //   ---   get max min value method 1  ---  javascript api: 
                                  //    https://gis.stackexchange.com/questions/417563/get-basic-statistics-from-a-feature-server-and-display-it-in-an-own-element-in-a
                                
                                      var statisticsQuery = backgroundFeatureLayer.createQuery();

                                      
                                      statisticsQuery.outStatistics = [
                                            {
                                              onStatisticField: symbolType,
                                              outStatisticFieldName: "max_value",
                                              statisticType: "MAX"
                                            },

                                            {
                                              onStatisticField: symbolType,
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
                                              "classificationField": symbolType,
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
                                            }//for


                                        let quantity_class_breaks_renderer = new ClassBreaksRenderer({
                                          // attribute of interest 
                                          field: symbolType
                                        });


                                        // .. . . warning: for MapImageLayer.renderer,   class break order matters, must from min to max, from 1 to 5 .. . . 
                                        // otherwise, if revers from 5 to 1, will cause  dynamicLayer, renderer object, "minValue": set to wrong value. 
                                        // however, FeatureLayer.renderer does not affect by this bug. 

                                        quantity_class_breaks_renderer.addClassBreakInfo({
                                          minValue: quantity_class_range_array[0],
                                          maxValue: quantity_class_range_array[1],
                                          symbol: {
                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                            color:   color_scale[current_colorScale][1],  
                                            outline: {  // autocasts as new SimpleLineSymbol()
                                              width: color_scale_outline_width,
                                              color: color_scale_outline_color,
                                            }
                                          }
                                        });




                                        quantity_class_breaks_renderer.addClassBreakInfo({
                                          minValue: quantity_class_range_array[1],
                                          maxValue: quantity_class_range_array[2],
                                          symbol: {
                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                            color:   color_scale[current_colorScale][2],  
                                            outline: {  // autocasts as new SimpleLineSymbol()
                                              width: color_scale_outline_width,
                                              color: color_scale_outline_color,
                                            }
                                          }
                                        });


                                      


                                        quantity_class_breaks_renderer.addClassBreakInfo({
                                          minValue: quantity_class_range_array[2],
                                          maxValue: quantity_class_range_array[3],
                                          symbol: {
                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                            color:   color_scale[current_colorScale][3],  
                                            outline: {  // autocasts as new SimpleLineSymbol()
                                              width: color_scale_outline_width,
                                              color: color_scale_outline_color,
                                            }
                                          }
                                        });



                                        quantity_class_breaks_renderer.addClassBreakInfo({
                                          minValue: quantity_class_range_array[3],
                                          maxValue: quantity_class_range_array[4],
                                          symbol: {
                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                            color:   color_scale[current_colorScale][4],  
                                            outline: {  // autocasts as new SimpleLineSymbol()
                                              width: color_scale_outline_width,
                                              color: color_scale_outline_color,
                                            }
                                          }
                                        });




                                        quantity_class_breaks_renderer.addClassBreakInfo({
                                          minValue: quantity_class_range_array[4],
                                          maxValue: quantity_class_range_array[5],
                                          symbol: {
                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                            color:   color_scale[current_colorScale][5],  
                                            outline: {  // autocasts as new SimpleLineSymbol()
                                              width: color_scale_outline_width,
                                              color: color_scale_outline_color,
                                            }
                                          }
                                        });
                                      
                                      
                                        console.log('featurelayer class breaks renderer  ', quantity_class_breaks_renderer)

                                        backgroundFeatureLayer.renderer = quantity_class_breaks_renderer;
                          

                                      });  

                        }//switch               
  
                      } 
    

                      function symbol_changed(){

                                    var fieldColorIndex = $("input[name='symbolType_radio']:checked").attr('data-index')
                                    console.log(" field color index, remainder  ", fieldColorIndex,  fieldColorIndex % color_scale_name_index.length);
                                    current_colorScale = color_scale_name_index[fieldColorIndex % color_scale_name_index.length ];
                                    console.log(" use color  ", current_colorScale);

                                    symbolType_radioValue = $("input[name='symbolType_radio']:checked").val();
                                    current_symbol_fieldName = $("input[name='symbolType_radio']:checked").val();

                                    console.log("current_symbol_fieldName : --  ", current_symbol_fieldName);
                                    // clear previous mark highlight
                                    $("span.context").unmark();
                                    if (current_symbol_fieldName){
                                      
                                      /**/
                                      //   --- . . . --- . . . filter by value --- . . . --- . . .
                                      /**/

                                      //filter by value range option 
                                      $("#currentSymbolFieldNameAlias_span").html(field_alias[current_symbol_fieldName])
                                      $("#currentSymbolFieldName_span").html(current_symbol_fieldName)

                                      $("span.context").mark(current_symbol_fieldName); // will mark the keyword "test", requires an element with class "context" to exist


                                    } else {
                                      $("#currentSymbolFieldNameAlias_span").html('')
                                      $("#currentSymbolFieldName_span").html('')
                                    }
                                   
                                    /**/
                                    //   . . . --- end  --- . . . --- . . . filter by value  --- . . . --- . . .  
                                    /**/



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

                                        
                                         


                                          $('#line_width_label').text(_default_strokeWeight);
                                          $('#line_width_range').val(_default_strokeWeight);
                    
                                          $('#point_radius_label').text(_default_pointRadius);
                                          $('#point_radius_range').val(_default_pointRadius);



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

                
                
                init_filter_by() //   --- . . . --- . . . filter by  --- . . . --- . . .
    
                         
               


                          init_settingTab()

                          init_print() //  ---  print   --- 
                           

                          init_json_viewer()


                                                       
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
                  
                  

    }




              function init_user_interface_event(){

                $('#info_outline').hide()
               
                $('#close_info_outline_panel').on('click', function(event) {
                    empty_info_outline_Tab()
                });


              




                
              }





                           



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
                                  }// if
                        }




                                          
                                  function update_url_parameter(_field, _value){
                                                  
                                                  
                                    // if ((_value) && (_value.length !== 0)) {

                                          console.log("update url parameter: _field _value", _field + " + "+ _value);

                                          var _____searchParams = new URLSearchParams(window.location.search);
                                          _____searchParams.set(_field, _value);


                                          // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                                          //window.location.search = searchParams.toString();

                                          // instead avoid reload
                                          var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
                                          history.pushState(null, '', _____newRelativePathQuery);
                                    //   }            

                                  } 




            // %%%%%%%%%%% end %%%%%%%%%%%  coordinate widget %%%%%%%%%%%%%%
/**/




              function show_info_outline_Tab(___properties){

                 /**/
                 // ===== ==== === == field mask ===== ==== === == 
                 var fieldMasked_properties = removeFieldsByFieldMask(___properties)
                 //  ===== ==== === == end  ===== ==== === == field mask ===== ==== === == 
                 /**/
 


                /**/
                //  ---  mchb only   --- 
                /**/
                  var display_properties = {}

                  // loop through object key,value
                  for (const [key, value] of Object.entries(fieldMasked_properties)) {
                    //console.log(`${key}: ${value}`);
                    if (field_alias.hasOwnProperty(key)){
                      // only alias
                      //display_properties[field_alias[key]] = value
                      // field name + alias
                      display_properties[field_alias[key] + ' [' + key + ']'] = value
                      
                    } else {
                      // not in field alias dictionary, use original field name
                      display_properties[key] = value
                    }
                  }//for

                /**/
                //  --- end  ---  mchb only   --- 
                /**/


                $("#info_outline").show()
                $('#jsoneditor_info_outline').show();

                  editor_info_outline.set(display_properties); //  ---  mchb only   --- 
                  editor_info_outline.expandAll();
                  editor_info_outline.setName(_layer)

                /**/
                //  ---  mchb only   --- 
                /**/ 
                  // highlight current selected classify symbol
                  if (current_symbol_fieldName){
                        editor_info_outline.search(current_symbol_fieldName)
                  }
                /**/
                //  --- end  ---  mchb only   --- 
                /**/

              }


              
              
              
              function empty_info_outline_Tab(){
                $('#info_outline').hide();
$('#info-window-div').html("")
                $('#jsoneditor_info_outline').hide();
                editor_info_outline.set({});
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
                                                    var ____fieldAlias //  --- mchb only  --- 
                                                    for (var i = 0; i < _fields_array.length; i++) {
                                                                                
                                                                  var ____fieldDisplayName = _fields_array[i].alias             
                                                  var ____fieldType = _fields_array[i].type
                                                                  var ____fieldName = _fields_array[i].name

                                                                   /**/
                                                                   //  --- mchb only  --- 
                                                                      if (field_alias.hasOwnProperty(____fieldName)){
                                                                        ____fieldAlias = field_alias[____fieldName]
                                                                      } else {
                                                                        // not in field alias dictionary, use original field name
                                                                        ____fieldAlias = ''
                                                                      }
                                                                  // --- end ---  mchb only
                                                                  /**/


                                                                
                                                                // _dynamicLabel_html +=  '<p>'
                                                                  _dynamicLabel_html +=    '<label>'

                                                                  if (current_dynamicLabel == ____fieldName) {
                                                                          // checked
                                                                          _dynamicLabel_html +=       '<input type="radio" value="' + ____fieldName + '" name="dynamicLabel_eachField_radio" id="' + ____fieldName + '"  checked />'
                                                                  } else {
                                                                          // un-checked
                                                                          _dynamicLabel_html +=       '<input type="radio" value="' + ____fieldName + '" name="dynamicLabel_eachField_radio" id="' + ____fieldName + '"/>'
                                                                  }
                                                                  
                                                                  //  --- mchb only  ---  context class for mark.js highlight
                                                                  _dynamicLabel_html +=       '<span class="fieldName context">'  + '&nbsp;' + ____fieldName  + '</span>'

                                                                  //_dynamicLabel_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
                                                                  //  --- mchb only  --- 
                                                                  _dynamicLabel_html +=       '<sup><small class="fieldType">' + '&nbsp;' + ____fieldAlias + '</small></sup>'


                                                                  _dynamicLabel_html +=     '</label>'
                                                                //  _dynamicLabel_html +=   '</p>'
                                                                _dynamicLabel_html +=   '<br>'
                                                                  


                                                    }//for   
                                                    
                                                    
                                                    _dynamicLabel_html +=   '</fieldset>'
                                                    var _dynamiclabel_div_tag = document.getElementById("dynamic-label")
                                                    _dynamiclabel_div_tag.innerHTML = _dynamicLabel_html


                                                    // only for existing static html tag "dynamic-label", if html tag is dynamic added, do not use this method
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



                                                    var ____fieldAlias //  --- mchb only  --- 
                                                    for (var i = 0; i < _fields_array.length; i++) {
                                                                          
                                                            var ____fieldDisplayName = _fields_array[i].alias             
                                                  var ____fieldType = _fields_array[i].type
                                                            var ____fieldName = _fields_array[i].name
                                                            _fieldmask_all_field_array.push(____fieldName)


                                                             //  --- mchb only  --- 
                                                                  if (field_alias.hasOwnProperty(____fieldName)){
                                                                    ____fieldAlias = field_alias[____fieldName]
                                                                  } else {
                                                                    // not in field alias dictionary, use original field name
                                                                    ____fieldAlias = ''
                                                                  }
                                                             // --- end ---  mchb only



                                                          /**/   
                                                          // _fieldmask_html +=  '<p>'
                                                            _fieldmask_html +=    '<label>'
                                                            _fieldmask_html +=       '<input type="checkbox" value="' + ____fieldName + '" name="each_field" id="each_field_' + i + '"  checked/>'
                                                            
                                                            //  --- mchb only  ---  context class for mark.js highlight
                                                            _fieldmask_html +=       '<span class="fieldName context">' + '&nbsp;' + ____fieldName  + '</span>'

                                                            //_fieldmask_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
                                                            //  --- mchb only  --- 
                                                            _fieldmask_html +=       '<sup><small class="fieldType">' + '&nbsp;' + ____fieldAlias + '</small></sup>'

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






            //  ---  mchb only   --- 
            async function init_quantity_field_name(){



               /**/
                    // ===== ==== === == field mask ===== ==== === == 
                    /**/

                    // special for parent function init_xxx() can not put inside dom ready, this init_xxx() have to be in view.when()
                    if (_featurelayerJSON.hasOwnProperty('fields')){
                      // normally feature layer json is done at dom ready function at very early begining.
                    } else {
                      // due to init_xxx in view.when, (not in dom ready), feature layer json is not ready at this point, so have to double get it 
                      await get_feature_attributes(background_mapserver_url, layer_id)
                    }
                    
                    var ___feature_layer_full_JSON =  _featurelayerJSON
                  /**/
                  // ===== ==== end === == field mask ===== ==== === == 
                  /**/



              

              // warning:  .fields can be null, if layer is only raster image  
              if (___feature_layer_full_JSON.fields) {

                            var _fields_array = ___feature_layer_full_JSON.fields

                            var _quantityField_html = '<input name="symbolType_radio" type="radio" value="native" checked /><b>no classify</b>'
                            _quantityField_html += "<ol>"
                            var _radio_index = -1

                            // other field radio 
                            for (var i = 0; i < _fields_array.length; i++) {
                                                        
                               var ____fieldDisplayName = _fields_array[i].alias             
                                                  var ____fieldType = _fields_array[i].type
                               var ____fieldName = _fields_array[i].name


                                /**/
                                //  --- mchb only  --- 
                                  if (field_alias.hasOwnProperty(____fieldName)){
                                        ____fieldAlias = field_alias[____fieldName]
                                  } else {
                                        // not in field alias dictionary, use original field name
                                        ____fieldAlias = ''
                                  }
                                // --- end ---  mchb only
                                /**/

                                        
                                if (esri_possible_numeric_field_type_array.includes(____fieldType)){

                                          _quantityField_html +=    '<label>'

                                          _radio_index += 1

                                          if (current_symbol_fieldName == ____fieldName) {
                                                  // checked
                                                  
                                                  _quantityField_html +=       '<input type="radio" data-index="' + _radio_index  + '" value="' + ____fieldName + '" name="symbolType_radio" id="' + ____fieldName + '"  checked />'
                                          } else {
                                                  // un-checked
                                                  
                                                  _quantityField_html +=       '<input type="radio" data-index="' + _radio_index  + '" value="' + ____fieldName + '" name="symbolType_radio" id="' + ____fieldName + '"/>'
                                          }
                                          
                                          _quantityField_html +=       '<span class="fieldName">'  + '&nbsp;' + _radio_index + '.' + '&nbsp;'  + ____fieldAlias  + '</span>'

                                          //   ---  context class for mark.js highlight  ---
                                          _quantityField_html +=       '<sup><span class="fieldType context">' + '&nbsp;' + ____fieldName + '</span></sup>'

                                          _quantityField_html +=     '</label>'
                                        //  _quantityField_html +=   '</p>'
                                        _quantityField_html +=   '<br>'
                                }//if
                                          


                            }//for   

                            _quantityField_html += "</ol>"
                            
                            $('#quantity_field_radio_list').html(_quantityField_html)
                           
                      
                }//if  



                  // first time set symbol type 'native' or 'customized'
                  $("input[type=radio][name=symbolType_radio][value=" + symbolType_radioValue + "]").prop('checked', true);
                  //symbol type radio, native or customized 
                  $("input[type='radio'][name='symbolType_radio']").change(function(){
                    console.log(' symbol type changed event ')
                    symbol_changed()
                  });



              }//function



 

  // ************* view hover hittest  ************************
  
  view.when(function(){
            
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
      
                // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = layer.renderer.clone();
                }


                // must before symbolchanged because event handler is in symbol changed
                init_quantity_field_name() //  ---  mchb only   --- 

                symbol_changed()
              
                return view.whenLayerView(layer);
  })
 

// ************* end *************  view hover hittest  ************************









                /**/
                //   --- . . . --- . . . filter by  --- . . . --- . . .
                /**/


                         



                          function filterByChanged(_filterByOption){

                            disable_all_filterByOption()

                            switch(_filterByOption) {

                              case "no_filter":
                                    
                                    remove_all_filter()

                                    break;



                              /**/
                              //   --- . . . --- . . . filter by value --- . . . --- . . .
                              /**/

                              case "value_range":

                                    $("#more_than").removeAttr("disabled");
                                    $("#less_than").removeAttr("disabled");
                                    $("#apply_value_range_btn").removeAttr("disabled");

                                    

                                    break;

                              /**/
                              //   . . . --- end  --- . . . --- . . . filter by value  --- . . . --- . . .  
                              /**/

                              

                              case "urban_rural":
                                    $("input[type='checkbox'][name='urban_rural_option']").removeAttr("disabled");

                                    checked_urban_rural_array = []
                                    $('input[name="urban_rural_option"]:checked').each(function() {
                                      checked_urban_rural_array.push(this.value);
                                    });
                                    console.log('checked_urban_rural_array', checked_urban_rural_array)
                                    filter_featureLayer_by(filter_by, checked_urban_rural_array)
                                    break;

                              case "rural":
                                    $("input[type='checkbox'][name='rural_option']").removeAttr("disabled");

                                    checked_rural_array = []
                                    $('input[name="rural_option"]:checked').each(function() {
                                      checked_rural_array.push(this.value);
                                    });
                                    console.log('checked_rural_array', checked_rural_array)
                                    filter_featureLayer_by(filter_by, checked_rural_array)
                                    break;

                              case "hrsa_region":
                                    $("input[type='checkbox'][name='hrsa_region_option']").removeAttr("disabled");

                                    checked_hrsa_region_array = []
                                    $('input[name="hrsa_region_option"]:checked').each(function() {
                                      checked_hrsa_region_array.push(this.value);
                                    });
                                    console.log('checked_hrsa_region_array', checked_hrsa_region_array)
                                    filter_featureLayer_by(filter_by, checked_hrsa_region_array)
                                    break;

                              case "state":
                                    $("input[type='checkbox'][name='state_option']").removeAttr("disabled");

                                    checked_state_array = []
                                    $('input[name="state_option"]:checked').each(function() {
                                      checked_state_array.push(this.value);
                                    });
                                    console.log('checked_state_array', checked_state_array)
                                    filter_featureLayer_by(filter_by, checked_state_array)
                                    break;

                            default:
                              // code block
                          }

                          }



                          function remove_all_filter(){

                            backgroundFeatureLayer.definitionExpression = ''

                          }


                          function disable_all_filterByOption(){

                            $("input[type='checkbox'][name='urban_rural_option']").attr("disabled", true);
                            $("input[type='checkbox'][name='rural_option']").attr("disabled", true);
                            $("input[type='checkbox'][name='hrsa_region_option']").attr("disabled", true);
                            $("input[type='checkbox'][name='state_option']").attr("disabled", true);



                              /**/
                              //   --- . . . --- . . . filter by value --- . . . --- . . .
                              /**/
                             
                              $("#more_than").attr("disabled", true);
                              $("#less_than").attr("disabled", true);
                              $("#apply_value_range_btn").attr("disabled", true);

                              /**/
                              //   . . . --- end  --- . . . --- . . . filter by value  --- . . . --- . . .  
                              /**/

                          }




                          function init_filter_by(){
                              
                            /**/
                            //   --- . . . --- . . . filter by value --- . . . --- . . .
                            /**/

                            $( "#apply_value_range_btn" ).on( "click", function() {

                                        more_than_float = Number.parseFloat($("#more_than").val())
                                        less_than_float = Number.parseFloat($("#less_than").val())
                                        console.log(' apply clicked, more than, less than ', more_than_float, less_than_float)

                                        if (isNaN(more_than_float) && isNaN(less_than_float)){ alert('invalid value range'); return null;}

                                        if (more_than_float >= less_than_float){ alert('invalid value range, more-than value greater than less-than value'); return null;}

                                        if (!(current_symbol_fieldName)){ alert('invalid no subject field selected'); return null;}


                                        if (isNaN(more_than_float)){

                                                  sql_where =  current_symbol_fieldName + ' < ' + less_than_float

                                        } else {

                                                  sql_where =  current_symbol_fieldName + ' > ' + more_than_float

                                                  if (isNaN(less_than_float)){
                                                      // nothing to do
                                                  } else {
                                                    sql_where += ' AND ' + current_symbol_fieldName + ' < ' + less_than_float
                                                  }
                                        }
                                        
                                        console.log(" value range filter sql where ", sql_where)
                                        backgroundFeatureLayer.definitionExpression =  sql_where;
                                        

                            } );
                                 

                            /**/
                            //   . . . --- end  --- . . . --- . . . filter by value  --- . . . --- . . .  
                            /**/

                                            
                            var urban_rural_option_html = ''
                            for (let i = 0; i < urban_rural_array.length; i++) {
                              //  <input type="checkbox" id="Medium metro" name="urban_rural_option" value="Medium metro"><span>Medium metro</span>&nbsp;
                              urban_rural_option_html  += '<input type="checkbox" id="' + urban_rural_array[i] + '" name="urban_rural_option" value="' + urban_rural_array[i] + '" disabled><span>' + urban_rural_array[i] + '</span>&nbsp;&nbsp;'
                            }//for
                            $('#urban_rural_option_div').html(urban_rural_option_html)
    
    
                            var rural_option_html = ''
                            for (let j = 0; j < rural_array.length; j++) {
                              rural_option_html  += '<input type="checkbox" id="' + rural_array[j] + '" name="rural_option" value="' + rural_array[j] + '" disabled><span>' + rural_array[j] + '</span>&nbsp;&nbsp;'
                            }//for
                            $('#rural_option_div').html(rural_option_html)
    
    
                            var hrsa_region_option_html = ''
                            for (let k = 0; k < hrsa_region_array.length; k++) {
                              hrsa_region_option_html  += '<input type="checkbox" id="' + hrsa_region_array[k] + '" name="hrsa_region_option" value="' + hrsa_region_array[k] + '" disabled><span>' + hrsa_region_array[k] + '</span>&nbsp;&nbsp;'
                            }//for
                            $('#hrsa_region_option_div').html(hrsa_region_option_html)
    
    
    
                            var state_option_html = ''
                            for (let l = 0; l < state_array.length; l++) {
                              state_option_html  += '<input type="checkbox" id="' + state_array[l] + '" name="state_option" value="' + state_array[l] + '" disabled><span>' + state_array[l] + '</span>&nbsp;&nbsp;'
                            }//for
                            $('#state_option_div').html(state_option_html)
    
    

                            $("input[type='checkbox'][name='urban_rural_option']").change(function(){
                                    checked_urban_rural_array = []
                                    $('input[name="urban_rural_option"]:checked').each(function() {
                                      checked_urban_rural_array.push(this.value);
                                    });
                                    console.log('checked_urban_rural_array', checked_urban_rural_array)
                                    filter_featureLayer_by(filter_by, checked_urban_rural_array)
                            });


                            $("input[type='checkbox'][name='rural_option']").change(function(){
                              checked_rural_array = []
                              $('input[name="rural_option"]:checked').each(function() {
                                checked_rural_array.push(this.value);
                              });
                              console.log('checked_rural_array', checked_rural_array)
                              filter_featureLayer_by(filter_by, checked_rural_array)
                            });


                            $("input[type='checkbox'][name='hrsa_region_option']").change(function(){
                              checked_hrsa_region_array = []
                              $('input[name="hrsa_region_option"]:checked').each(function() {
                                checked_hrsa_region_array.push(this.value);
                              });
                              console.log('checked_hrsa_region_array', checked_hrsa_region_array)
                              filter_featureLayer_by(filter_by, checked_hrsa_region_array)
                            });


                            $("input[type='checkbox'][name='state_option']").change(function(){
                              checked_state_array = []
                              $('input[name="state_option"]:checked').each(function() {
                                checked_state_array.push(this.value);
                              });
                              console.log('checked_state_array', checked_state_array)
                              filter_featureLayer_by(filter_by, checked_state_array)
                            });







    
                            $("input[type='radio'][name='filterBy_radio']").change(function(){
    
                                    filter_by = $("input[name='filterBy_radio']:checked").val();
                                    if (filter_by){
                                        console.log(" filter by change to  ", filter_by);
                                        //update_url_parameter('filter_by', filter_by);
                                        filterByChanged(filter_by)
                                    } // if
    
                            });
    
    
                          }    
    
               
    


                          function filter_featureLayer_by(_filterBy_, _checkedOptionArray){

                            console.log(" filter_featureLayer_by  ", _filterBy_, _checkedOptionArray);
                            var sql_where

                            switch(_filterBy_) {

                              case "urban_rural":

                                //backgroundFeatureLayer.definitionExpression = "NCHS_URBAN_RURAL_DESC = '" + _checkedOptionArray[0] + "'";
                                sql_where = "NCHS_URBAN_RURAL_DESC in (" 

                                    if (_checkedOptionArray.length){

                                        for (let i = 0; i < _checkedOptionArray.length; i++) {
                                          if (i > 0){ sql_where += "," }
                                          sql_where +=  "'" +  _checkedOptionArray[i] + "'"
                                        }//for

                                    } else{
                                            sql_where +=  "'nothing'"
                                    }

                                    sql_where += ")"
                                    console.log(" urban rural filter sql where ", sql_where)
                                    backgroundFeatureLayer.definitionExpression =  sql_where;

                                    break;

                              case "rural":

                                    sql_where = "RURAL_STATUS_DESC in (" 

                                    if (_checkedOptionArray.length){

                                        for (let i = 0; i < _checkedOptionArray.length; i++) {
                                          if (i > 0){ sql_where += "," }
                                          sql_where +=  "'" +  _checkedOptionArray[i] + "'"
                                        }//for

                                    } else{
                                            sql_where +=  "'nothing'"
                                    }

                                    sql_where += ")"
                                    console.log(" rural filter sql where ", sql_where)
                                    backgroundFeatureLayer.definitionExpression =  sql_where;
                                    
                                    break;

                              case "hrsa_region":

                                    sql_where = "REGION_ID in (" 

                                    if (_checkedOptionArray.length){

                                        for (let i = 0; i < _checkedOptionArray.length; i++) {
                                          if (i > 0){ sql_where += "," }
                                          sql_where +=   _checkedOptionArray[i] 
                                        }//for

                                    } else{
                                            sql_where +=  "-1"
                                    }

                                    sql_where += ")"
                                    console.log(" hrsa region filter sql where ", sql_where)
                                    backgroundFeatureLayer.definitionExpression =  sql_where;

                                   
                                    break;

                              case "state":

                                    //backgroundFeatureLayer.definitionExpression = "STATE_NM = '" + _checkedOptionArray[0] + "'";
                                    sql_where = "STATE_NM in (" 

                                    if (_checkedOptionArray.length){

                                        for (let i = 0; i < _checkedOptionArray.length; i++) {
                                          if (i > 0){ sql_where += "," }
                                          sql_where +=  "'" +  _checkedOptionArray[i] + "'"
                                        }//for

                                    } else{
                                            sql_where +=  "'nothing'"
                                    }

                                    sql_where += ")"
                                    console.log(" state filter sql where ", sql_where)
                                    backgroundFeatureLayer.definitionExpression =  sql_where;

                              break;



                            default:
                              // code block
                          }
                            
                          }

                /**/
                //   . . . --- end  --- . . . --- . . . filter by  --- . . . --- . . .  
                /**/






                                  

              



              

 // set dark mode by default
 //document.querySelector('body').classList.add('dark')

}); // require, everything should be inside







