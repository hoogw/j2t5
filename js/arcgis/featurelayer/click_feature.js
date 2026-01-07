
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

              /**/
              // ----- ui ----- outside of map  ----- only for feature layer   ----- 
              /**/

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
                                console.log('legend outside mapview is created', legend_outside_mapview)
                            //======= end ============ add legend ============================
                            /**/ 



                      // for vertical only, all outside-esri-widget 
                      const searchAddressWidget = new Search({
                        allPlaceholder: "Search", // only works if you have multiple source l o c a  t o r, ignore if only 1 source, like here.
                      // work around is wait until all image loaded,  windows.load { document.querySelector('.esri-search .esri-search__input').setAttribute('placeholder', 'Google search this area   ')}
                      
                        
                        // new Search({view}, search-widget-container-dom-id)
                        
                            // adjust width at css ".esri-search{width: 593px !important;}" ,  "!important" will overwrite the default "width:240px" in original esri-search class 
                            id: "outside-esri-search-widget-id",
                            view: view
                        },
                        "outside-esri-search-widget"
                      );
                      //view.ui.add(searchAddressWidget, "top-leading"); //Add to the map




                      coordinate_widget()



//  . .  track  . . my current location .. must here,...... before basemap toggle widget ...... otherwise will block basemap popup  ...... 

     // current location https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
        
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

              // step2 - only for outside of map Set id properties ( must comment out if inside of map)
              //id: "outside-esri-track-current-location-id",

              view: view
            },
            // step3 - only for outside of map ( must comment out if inside of map)
            //"outside-esri-track-current-location"
          );

          // only for inside of map,  (must comment out if outside of map) 
          view.ui.add(locate, "bottom-right");

          // track large icon modified at color.css for button size, arcgis_common.js bottom for shadow DOM icon size change.
          // without shadow DOM, such as toggle basemap icon, to make it large only set at color.css 


//   . . end  . .  track  . . 
         


                  //=================== toggle basemap ============================

                            // Create a BasemapGallery widget instance and set, its container to a div element

                            
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

                  /* not use
                        
                        // outside of map not working, when click did not change map due to styling issue, so change back to inside map
                        
                        
                        // outside of map follow step 1 to 3,   step1 is add div tag in html 
                        const basemapGallery = new BasemapGallery({
                            source: base_map_source_array,

                            // step2 - only for outside of map Set id properties ( must comment out if inside of map)
                            id: "outside-esri-toggle-basemap-id",
                            view: view,

                            // only for inside of map,  (must comment out if outside of map) 
                            //container: document.createElement("div")
                          },

                          // step3 - only for outside of map ( must comment out if inside of map)
                          "outside-esri-toggle-basemap"
                        );

                          // Create an Expand instance and set the content
                          // property to the DOM node of the basemap gallery widget

                          const bgExpand = new Expand({
                                      collapseIcon: "arrow-bold-right",
                                      expandIcon: "arrow-bold-left",
                                      collapseTooltip: "Close Options",
                                      expandTooltip: "Open Back Ground Map Options",
                                      

                            // step2 - only for outside of map Set id properties ( must comment out if inside of map)
                            id: "outside-esri-toggle-basemap-expand-id",

                            view: view,
                            content: basemapGallery
                          },

                          // step3 - only for outside of map ( must comment out if inside of map)
                          "outside-esri-toggle-basemap-expand"
                        );

                        // only for inside of map,  (must comment out if outside of map) 
                        // Add the expand instance to the ui
                        //view.ui.add(bgExpand, "bottom-right");

                        */


                        // in use,  = = =  inside map  = = = 
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
                        // = = =  end  = = =    inside map  = = = 

                      //========  end =========== toggle basemap ============================
                  






                        // zoom 2 layer
                        // event handle
                        $('#zoom2layer_button').on("click", (event) => {
                          console.log('zoom 2 layer button clicked')
                          pan_to_real_location()
                        });


                              





                                // opacity, outside of map, only for feature layer
                                var opacity_slider = document.querySelector("#overlay_opacity_range");
                                opacity_slider.value = groundoverlay_opacity * 10
                                var opacity_value_text = document.querySelector("#opacity_value_text");
                                opacity_value_text.textContent = opacity_slider.value;
                                // event handle
                                opacity_slider.addEventListener("change", (event) => {

                                                      var _overlay_opacity = $('#overlay_opacity_range').val();
                                                      $('#opacity_value_text').text(_overlay_opacity);
                                                      update_url_parameter('overlayOpacity', _overlay_opacity);
                                                      groundoverlay_opacity = _overlay_opacity / 10;
                                                      // update overlay opacity
                                                      backgroundFeatureLayer.opacity = groundoverlay_opacity
                                });
                                // ... end ... opacity, outside of map, only for feature layer







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





                          /*
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
                        


                       
                          */

                          // statistic info
                          var statisticInfo_element = document.getElementById("statistic_info");
                          view.ui.add(statisticInfo_element, "top-right");

                          // ... end  ... statistic info
                      





                  // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui
              /**/
              // ----- end  ----- ui ----- outside of map -----   ----- only for feature layer   -----
              /**/





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





                                                        /**/
                                                        //  --- zoom to feature or not radio button     --- 
                                                        /**/

                                                        if ((zoom_to_feature_or_not == 'zoom_to_feature') && (_index == 0)){
                                                           // only zoom to 1st feature
                                                           console.log('zoom to feature or not', graphic)
                                                           view.goTo(graphic)

                                                           var ___graphic___geometry___type____ = graphic.geometry.type

                                                           // point only, enforce to zoom level 18
                                                           if (___graphic___geometry___type____.includes('point')){
                                                            view.zoom = default_zoom_level_for_point;
                                                           }

                                                        } else {

                                                        }//if

                                                        /**/
                                                        //  --- end  ---  zoom to feature or not radio button    --- 
                                                        /**/





                                                  }//for


                                                  $("#info_outline").show()
                                                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                                                  $('#info-window-div').html(multiple_layer_properties_html)


                                                  // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                    console.log('add event to element id :  attribute_field_set_', _index)
                                                    $("#attribute_field_set_" + _index ).on('click', function(){
                                                                var element_id = $(this).attr('id');
                                                                var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                                                console.log("you click  index ",  _select_highlight_index)
                          
                                                                $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                                                $(this).addClass('selected_highlighted_style')




                                                                /**/
                                                                //  --- zoom to feature or not radio button     --- 
                                                                /**/

                                                                  var graphic = graphic_object_indexAsKey[_select_highlight_index]
                                                                  console.log('you click  index graphic ', graphic)

                                                                  if (zoom_to_feature_or_not == 'zoom_to_feature'){
                                                                    // only zoom to 1st feature
                                                                    view.goTo(graphic)

                                                                    var ___graphic___geometry___type____ = graphic.geometry.type

                                                                    // point only, enforce to zoom level 18
                                                                    if (___graphic___geometry___type____.includes('point')){
                                                                      view.zoom = default_zoom_level_for_point;
                                                                    }

                                                                  } else {

                                                                  }//if

                                                                /**/
                                                                //  --- end  ---  zoom to feature or not radio button    --- 
                                                                /**/



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
              
                      function re_render_layer(symbolType){
                                                    
                                                    
                          if (symbolType == 'native') {
                              
                                  // feature layer, 'native'

                                  backgroundFeatureLayer.renderer = native_renderer;
                              
                              
                          } else {
                          
                            // 'customized'
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
                                
                                
                              } // if

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
                          // ===== ==== === == field mask ===== ==== === == 
                          /**/
                          init_field_mask()  
                          /**/
                          // ===== ==== end === == field mask ===== ==== === == 
                          /**/


                          // can not be here, because color widget created too early, outside-map-legend div will not created within flex-1,conflict. 
                          // If (use flex-1 but without color widget), or (use color widget without flex-1), no problem here.  
                          // only if use both (color widget) and (flex-1), cause problem. 
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
        //  --- zoom to feature or not radio button     --- 
        /**/
            if (param_zoom_to_feature_or_not){
              zoom_to_feature_or_not = param_zoom_to_feature_or_not
            }
            // first time set radio
            $("input[type=radio][name=zoom_to_feature_or_not_radio][value=" + zoom_to_feature_or_not + "]").prop('checked', true);
            // radio change event
            $("input[type='radio'][name='zoom_to_feature_or_not_radio']").change(function(){
              zoom_to_feature_or_not = $("input[type='radio'][name='zoom_to_feature_or_not_radio']:checked").val();
              console.log(" zoom_to_feature_or_not : --  ", zoom_to_feature_or_not);
              update_url_parameter('zoom2feature', zoom_to_feature_or_not);
            });

        /**/
        //  --- end  ---  zoom to feature or not radio button    --- 
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
  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
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
                                                    _fieldmask_html +=       '<span class="fieldName">' + '&nbsp;' + ____fieldName  + '</span>'
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
      
                // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = layer.renderer.clone();
                }
                symbol_changed()
              
                

                return view.whenLayerView(layer);

                
  })
 

// ************* end *************  view hover hittest  ************************








              


 // set dark mode by default
 //document.querySelector('body').classList.add('dark')

}); // require, everything should be inside







