
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

  
  "esri/core/Handles",
  "esri/layers/support/LabelClass",

  "esri/views/draw/Draw",
  
  "esri/geometry/geometryEngine",

  "esri/rest/serviceArea",
  "esri/rest/support/ServiceAreaParameters",
  "esri/rest/networkService",
  "esri/rest/support/TravelMode",
  "esri/geometry/SpatialReference",
  "esri/rest/route",
  "esri/rest/support/RouteParameters",
  "esri/rest/support/FeatureSet",


  "esri/widgets/Legend",
  "esri/widgets/Search",
 
 
  
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

  "esri/geometry/Point",

  "esri/widgets/ElevationProfile",
  "esri/widgets/CoordinateConversion",
  "esri/widgets/Directions", 
  "esri/layers/RouteLayer",
  
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

            
            Handles,
            LabelClass,

            Draw,
            
            geometryEngine,

            serviceArea, 
            ServiceAreaParams, 
            networkService,
            TravelMode,
            SpatialReference,
            route, 
            RouteParameters, 
            FeatureSet,
            
            Legend, 
            Search, 
           
          
           
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
            

            Point,
            ElevationProfile,
            CoordinateConversion,
            Directions,
            RouteLayer,
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





                  /**/
                  // - - - esri geocode address elevation - - - 
                  /**/

                        // reverse geocode sample : https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
                        var reverseGeocodeURL_template = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=' // ...&location=-117.20744088954731%2C34.0375903447169

                        var address_value_html
                        var CoordinateConversionWidget

                        var elevationProfile
                        var _elevation_profile_viewModel // use view model to control its behavior, start, stop, cancel

                        var routeLayer
                        var directionsWidget
                        var directionsWidget_viewModel  // use view model to control its behavior, reset everything, clear route results

                  /**/
                  // ... end ...  - - - esri geocode address elevation - - -
                  /**/









         /**/
         //  ---  select by area TravelTimeDistance   --- 
         /**/

              // https://developers.arcgis.com/javascript/latest/find-service-areas/ 
              const serviceAreaUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea";

              const travelModeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World";
              
              
             
              
             
              var drivingDistance = 8
              var drivingTime = 6
              var walkingDistance = 3
              var walkingTime = 17
              var marker_color = "rgba(159, 226, 191, 0.7)"
              var marker_size = 20
              var serviceAreaPolygon_color = "rgba(255, 255, 255, 0.3)"
              var marker_graphic
              var serviceArea_graphic

              var user_clicked_point_lat
              var user_clicked_point_lng
              var user_clicked_graphic

              var drivingDistanceCutoffs  = []
              var drivingTimeCutoffs = []
              var walkingDistanceCutoffs = []
              var walkingTimeCutoffs = []
             
              
              var serviceAreaParams

              var current_used_travel_mode
              var defaultTravelMode
              var drivingTimeTravelMode
              var drivingDistanceTravelMode
              var walkingTimeTravelMode
              var walkingDistanceTravelMode
              
              var serviceArea_intersect_feature_graphic_array
              var single_serviceArea_intersect_graphic
			   /**/
         //  --- end  --- select by area TravelTimeDistance   --- 
         /**/







         /**/
         //  ---  select by route   --- 
         /**/

              // https://developers.arcgis.com/javascript/latest/find-a-route-and-directions/
              const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

              var route_width = 10 
              var route_color = 'rgba(255, 191, 0, 0.8)'
              var route_size = '20px' 

              var route_origin_marker_color = "rgba(255,255,255, 0.8)"
              var route_destination_marker_color = "rgba(135, 206, 235, 0.8)"

              var route_step = 'start'
              var route_origin_marker_graphic
              var route_destination_marker_graphic
              var routeLine_graphic_array = []
              var route_total_miles = 0

              var directions  // all rows of direction, dom element
              var direction  // each row
			   /**/
         //  --- end  --- select by route   --- 
         /**/






                                    /**/
                                    //  ---  select by area TravelTimeDistance   --- 
                                    /**/
                                    /**/
                                    //  ---  select by route   --- 
                                    /**/
                                            var tool_type = 'popup_on'   // means regular click to popup info window.

                                            

                                    /**/
                                    //  --- end  --- select by route   --- 
                                    /**/
                     
                                    /**/
                                    //  --- end  --- select by area TravelTimeDistance   --- 
                                    /**/
                     





                               







              // any document ready function is in here
              dom_ready_dojo();

              var map = new Map({
               
                // remove google map as background
                //basemap: google_hybrid,
                basemap: "hybrid",

                /**/
                // - - - esri geocode address elevation - - - 
                /**/
                      ground: "world-elevation",  // must set for elevation profile : https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#properties-summary
                /**/
                // - - - end - - -  - - - esri geocode address elevation - - -
                /**/
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
              //  -----  speicial edition only for elevation route ----- ui ----- outside of map  ----- only for feature layer   ----- 
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
         

              // remove google map as background
             //=================== toggle basemap ============================

                        // Create a BasemapGallery widget instance and set, its container to a div element

                        const basemapGallery = new BasemapGallery({
                          // 2 - Set properties
                          id: "outside-esri-toggle-basemap-id",
                          view: view,
                          //container: document.createElement("div")
                        },
                        "outside-esri-toggle-basemap"
                      );

                        // Create an Expand instance and set the content
                        // property to the DOM node of the basemap gallery widget

                        const bgExpand = new Expand({
                          // 2 - Set properties
                          id: "outside-esri-toggle-basemap-expand-id",
                          view: view,
                          content: basemapGallery
                        },
                        "outside-esri-toggle-basemap-expand"
                      );

                        // Add the expand instance to the ui
                        view.ui.add(bgExpand, "bottom-right");
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



                                /**/
                                // - - - esri geocode address elevation - - - 
                                /**/
                                    // create the elevation profile widget
                                    elevationProfile = new ElevationProfile({
                                      view: view,
                                      container: 'elevation_profile_span',
                                      // configure widget with desired profile lines
                                      profiles: [
                                        {type: "ground" },// first profile line samples the ground elevation
                                        // {type: "view" }  // second profile samples the view and shows building profiles
                                      ],
                                      // hide the select button
                                      // this button can be displayed when there are polylines in the
                                      // scene to select and display the elevation profile for
                                      visibleElements: {
                                        selectButton: false,

                                        legend: true,
                                        chart: true,
                                        clearButton: true,
                                        settingsButton: true,
                                        sketchButton: true,
                                        uniformChartScalingToggle: true
                                      }
                                    });
                                    // not use, add the widget to the view
                                    //view.ui.add(elevationProfile, "bottom-right");

                                    // use view model to control its behavior, start, stop, cancel
                                    _elevation_profile_viewModel = elevationProfile.viewModel

                                    // CoordinateConversion widget : https://developers.arcgis.com/javascript/latest/sample-code/widgets-coordinateconversion/
                                    CoordinateConversionWidget = new CoordinateConversion({
                                              view: view,
                                              container: 'coordinate_span',
                                            });
                                    //view.ui.add(CoordinateConversionWidget, "bottom-left");



                                   // Directions widget : https://developers.arcgis.com/javascript/latest/sample-code/widgets-directions/
                                    // create a new RouteLayer, required for Directions widget
                                    routeLayer = new RouteLayer();
                                    map.add(routeLayer)
                                    // new RouteLayer must be added to Directions widget
                                    directionsWidget = new Directions({
                                      layer: routeLayer,
                                      apiKey,
                                      view,
                                      container: 'direction_span',
                                      visibleElements: {
                                        //layerDetailsLink: false,
                                        saveAsButton: false,
                                        saveButton: false
                                      }
                                    });
                                    // Add the Directions widget to the top right corner of the view
                                    //view.ui.add(directionsWidget, {position: "top-right"});

                                    // use view model to control its behavior, reset everything, clear route results
                                    directionsWidget_viewModel = directionsWidget.viewModel

                                /**/
                                // - - - end - - -  - - - esri geocode address elevation - - -
                                /**/




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
                            




  
  
  


                               






      // only for 225 225, single feature layer, click event ( hover event not here)  
      var graphic_object_indexAsKey = {}    
      function init_feature_layer_view(){

          //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
          //view.on("pointer-move", function(event){


          // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
          view.on("click", async function(event){

                          switch (tool_type) {
                                  /**/
                                  // - - - esri geocode address elevation - - - 
                                  /**/
                                        // must use async
                                        case 'show_address':
                                              user_clicked_point_lat = event.mapPoint.latitude
                                              user_clicked_point_lng = event.mapPoint.longitude
                                              console.log("user clicked point ", user_clicked_point_lat,  user_clicked_point_lng )

                                              var _esri_reverse_geocode_url = reverseGeocodeURL_template + user_clicked_point_lng + ',' + user_clicked_point_lat
                                              console.log("reverse geocode url :  ", _esri_reverse_geocode_url)

                                              var addressResult_string = await ajax_getjson_common(_esri_reverse_geocode_url)
                                              console.log("reverse geocode address results :  ", addressResult_string)
                                              var addressResult = convert_to_json(addressResult_string)
                                              console.log('LongLabel address', addressResult.address.LongLabel)
                                              address_value_html = '<span style="font-size:36px;">' + addressResult.address.LongLabel +   '</span>' 
                                              $('#address_span').html(address_value_html)
                                        break;

                                        case 'show_elevation_along_path':
                                              $("#elevation_profile_span").show()
                                        break;


                                        case 'show_coordinate':
                                              $("#coordinate_span").show()
                                        break;


                                        case 'show_direction':
                                          $("#direction_span").show()
                                        break;


                                  /**/
                                  // ... end ...  - - - esri geocode address elevation - - -
                                  /**/


                                      /**/
                                      //  ---  select by route   --- 
                                      /**/
                                      case 'select_by_route':

                                            /* Haversine formula How to calculate distances between points */
                                            console.log(' route a to b', event.mapPoint.latitude,   event.mapPoint.longitude)

                                                    if (route_step == 'start') {

                                                      add_routeMarkerGraphic("origin", event.mapPoint);
                                                      route_step = 'end'

                                                      /* Haversine formula How to calculate distances between points */
                                                      latitude_1 = event.mapPoint.latitude
                                                      longitude_1 = event.mapPoint.longitude

                                                    } else if (route_step == 'end') {

                                                      add_routeMarkerGraphic("destination", event.mapPoint);
                                                      route_step = 'next'

                                                      /* Haversine formula How to calculate distances between points */
                                                      latitude_2 = event.mapPoint.latitude
                                                      longitude_2 = event.mapPoint.longitude
                                                      straightLine_distance_html = getStraightLineDistance(latitude_1,longitude_1,latitude_2,longitude_2)
                                                      $('#straightLine_distance').html(straightLine_distance_html)

                                                      getRoute(); // Call the route service

                                                    } else if (route_step == 'next') {

                                                      // start over, remove previously route
                                                      remove_route()
                                                      add_routeMarkerGraphic("origin",event.mapPoint);
                                                      route_step = 'end'

                                                      /* Haversine formula How to calculate distances between points */
                                                      latitude_1 = event.mapPoint.latitude
                                                      longitude_1 = event.mapPoint.longitude


                                                    }

                                              break;
                                        /**/
                                        //  --- end  --- select by route   --- 
                                        /**/




                        
                                        /**/
                                        //  ---  select by area TravelTimeDistance   --- 
                                        /**/
                                  
                                              case 'select_by_drivingDistance':
                                                case 'select_by_drivingTime':
                                                  case 'select_by_walkingDistance':
                                                    case 'select_by_walkingTime':
                                                
                                                            //console.log('  select by area TravelTimeDistance - - - click event -  click event -  click event ' , event)
                                                            //console.log('  select by area TravelTimeDistance - - - click event -  view  ' ,  view)                       
                                                            //user_clicked_point_lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                                                            user_clicked_point_lat = event.mapPoint.latitude
                                                            user_clicked_point_lng = event.mapPoint.longitude
                                                            console.log("user clicked point ", user_clicked_point_lat,  user_clicked_point_lng )

                                                            user_clicked_graphic = createMarkerGraphic_atUserClickedLocation(event.mapPoint);

                                                            switch (tool_type) {

                                                                      case 'select_by_drivingDistance':

                                                                                build_service_area_by_drivingDistance()

                                                                        break;

                                                                      case 'select_by_drivingTime':

                                                                                  build_service_area_by_drivingTime()
                                                                                  
                                                                        break;

                                                                      case 'select_by_walkingDistance':

                                                                                  build_service_area_by_walkingDistance()

                                                                        break;

                                                                      case 'select_by_walkingTime':

                                                                                  build_service_area_by_walkingTime()

                                                                        break;
                                                                        
                                                                      default:
                                                                        console.log(`Sorry, we are out of tool type`, tool_type);
                                                            }//switch area travel 
                                      
                                            

                                              break;
                                      
                                          /**/
                                          //  --- end  --- select by area TravelTimeDistance   --- 
                                          /**/




                                        // defaul case      
                                        default:


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


                                  }//switch click based on tool type

          }); // view . on . click

                                // --  end  --- highlight feature on pointer-move
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








            function tool_type_changed_event_handler(){


                    /**/
                    //  ---  select by area TravelTimeDistance   --- 
                    /**/
                          //remove_serviceArea()
                          diable_drivingDistance()       
                          diable_drivingTime()  
                          diable_walkingDistance()       
                          diable_walkingTime()   
                    /**/
                    //  --- end  --- select by area TravelTimeDistance   --- 
                    /**/

                    /**/
                    // - - - esri geocode address elevation - - - 
                    /**/

                            $('#address_span').html('')
                            $("#coordinate_span").hide()

                            //delete previous route
                            remove_route()


                            // delete previous elevation profile
                            $("#elevation_profile_span").hide()
                            // all widget should use its view model to control its behavior : https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ElevationProfile-ElevationProfileViewModel.html#methods-summary
                            _elevation_profile_viewModel.clear()


                            // delete previous direction
                            $("#direction_span").hide()
                            // clear all input and route, https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Directions-DirectionsViewModel.html#methods-summary
                            directionsWidget_viewModel.reset()
                    /**/
                    // - - - end - - -  - - - esri geocode address elevation - - -
                    /**/

                    switch (tool_type) {

                      case 'popup_on':
                        // nothing to do, just regular click to popup info window
                      break;

                      /**/
                      // - - - esri geocode address elevation - - - 
                      /**/
                          case 'show_address':
                            // nothing to do, feature layer or map image layer, or map will hear click event
                          break;

                          case 'show_elevation_along_path':
                            $("#elevation_profile_span").show()
                          break;

                          case 'show_coordinate':
                            $("#coordinate_span").show()
                          break;

                          case 'show_direction':
                            $("#direction_span").show()
                          break;
                      /**/
                      // - - - end - - -  - - - esri geocode address elevation - - -
                      /**/

                      /**/
                      //  ---  select by route   --- 
                      /**/

                          case 'select_by_route':
                            // must remove previous route related graphic, direction ui element
                            remove_route()
                            route_step = 'start'
                          break;

                      
                      /**/
                      //  --- end  --- select by route   --- 
                      /**/






                      /**/
                        //  ---  select by area TravelTimeDistance   --- 
                        /**/

                        case 'select_by_drivingDistance':
                          enable_drivingDistance()
                          break;

                          case 'select_by_drivingTime':
                                    enable_drivingTime()
                          break;

                          case 'select_by_walkingDistance':
                                    enable_walkingDistance()
                          break;

                          case 'select_by_walkingTime':
                                    enable_walkingTime()
                          break;

                        /**/
                        //  --- end  --- select by area TravelTimeDistance   --- 
                        /**/

                      default:
                        console.log('tool type has problem, do not know what to do');
                    }// switch
                                      
            
            
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


               



                // --------- tool type  ---------  radio   ---------  
                /**/

                          // first time set tool type based on param
                          if (param_tool_type){ 
                                  tool_type = param_tool_type
                          }
                          console.log('first time set tool type based on param ', tool_type)
                          $("input[type=radio][name=tool_radio][value=" + tool_type + "]").prop('checked', true);
                          

                          




                          // tool type change event
                          $('input[type=radio][name=tool_radio]').on('change', function(){

                            console.log(' * before * * * user change tool type ', tool_type) 
                            tool_type =  $(this).val()
                            update_url_parameter('tooltype', tool_type)
                            console.log(' * after * * * user change tool type ', tool_type)

                            tool_type_changed_event_handler()

                          });




                          /**/
                          //  ---  select by area TravelTimeDistance   --- 
                          /**/

                          $('#drivingDistance_range_label').text(drivingDistance)
                          $('#drivingTime_range_label').text(drivingTime)
                          $('#walkingDistance_range_label').text(walkingDistance)
                          $('#walkingTime_range_label').html(walkingTime)

                          $('#drivingDistance_range').val(drivingDistance)
                          $('#drivingTime_range').val(drivingTime)
                          $('#walkingDistance_range').val(walkingDistance)
                          $('#walkingTime_range').val(walkingTime)


                          $('#drivingDistance_range').on('change', drivingDistance_change_handler)
                          $('#drivingTime_range').on('change', drivingTime_change_handler)
                          $('#walkingDistance_range').on('change', walkingDistance_change_handler)
                          $('#walkingTime_range').on('change', walkingTime_change_handler)
                          
                          $("#clear_serviceArea_btn").on('click', remove_serviceArea); 
                          $("#show_serviceArea_btn").on('click', show_serviceArea); 

                        

                        /**/
                        //  --- end  --- select by area TravelTimeDistance   --- 
                        /**/





                          /**/
                          //  ---  select by route   --- 
                          /**/
                              $("#clear_route_btn").on('click', remove_route); 
                              $("#show_route_btn").on('click', show_route); 
                          /**/
                          //  --- end  --- select by route   --- 
                          /**/

                      /**/
                      //   ---------    end --------- tool type  ---------  radio   ---------  



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
                                                          
                                                          _dynamicLabel_html +=       '<span class="fieldName">'  + '&nbsp;' + ____fieldName  + '</span>'
                                                          _dynamicLabel_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
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
                  //  ---  select by area TravelTimeDistance   --- 
                  /**/
                            

                              function enable_drivingDistance(){
                                console.log(' enable driving distance ')
                                $("#drivingDistance_range").removeAttr('disabled');
                                build_service_area_by_drivingDistance()
                              }
                              function diable_drivingDistance(){
                                console.log(' dis-able  drivingDistance ')
                                $("#drivingDistance_range").prop("disabled", true);
                              }



                              function enable_drivingTime(){
                                console.log(' enable drivingTime ')
                                $("#drivingTime_range").removeAttr('disabled');
                                build_service_area_by_drivingTime()
                              }
                              function diable_drivingTime(){
                                console.log(' dis-able  drivingTime ')
                                $("#drivingTime_range").prop("disabled", true);
                              }



                              function enable_walkingDistance(){
                                console.log(' enable walking distance ')
                                $("#walkingDistance_range").removeAttr('disabled');
                                build_service_area_by_walkingDistance()
                              }
                              function diable_walkingDistance(){
                                console.log(' dis-able  walkingDistance ')
                                $("#walkingDistance_range").prop("disabled", true);
                              }



                              function enable_walkingTime(){
                                console.log(' enable walkingTime ')
                                $("#walkingTime_range").removeAttr('disabled');
                                build_service_area_by_walkingTime()
                              }
                              function diable_walkingTime(){
                                console.log(' dis-able  walkingTime ')
                                $("#walkingTime_range").prop("disabled", true);
                              }









                              function remove_serviceArea(){
                                if (marker_graphic){
                                        view.graphics.remove(marker_graphic);
                                }

                                if (serviceArea_graphic){
                                        view.graphics.remove(serviceArea_graphic);
                                }
                              }


                              function show_serviceArea(){
                                if (marker_graphic){
                                                          if (view.graphics.includes(marker_graphic)){
                                                              console.log(' marker graphic already exist, nothing to do')
                                                          } else {
                                                                view.graphics.add(marker_graphic);
                                                          }
                                }

                                if (serviceArea_graphic){
                                                          if (view.graphics.includes(serviceArea_graphic)){
                                                              console.log(' service Area graphic  already exist, nothing to do')
                                                          } else {
                                                                  view.graphics.add(serviceArea_graphic);
                                                          }
                                }
                              }





                              function build_service_area_by_drivingDistance(){

                                  
                                    current_used_travel_mode = drivingDistanceTravelMode 

                                    if (user_clicked_graphic){
                                                            // not use 4 contour, because it take esri too long time to response.
                                                            //drivingDistanceCutoffs = [Math.round(drivingDistance * 0.25),Math.round(drivingDistance * 0.5),,Math.round(drivingDistance * 0.75),  drivingDistance]; // Miles
                                                            drivingDistanceCutoffs = [drivingDistance];  // just 1 polygon
                                                            serviceAreaParams = createServiceAreaParams(user_clicked_graphic, drivingDistanceCutoffs, view.spatialReference);
                                                    
                                                            solveServiceArea(serviceAreaUrl, serviceAreaParams);
                                    }//if
                              }


                              function build_service_area_by_drivingTime(){

                                    current_used_travel_mode = drivingTimeTravelMode 
                                                          
                                    if (user_clicked_graphic){

                                                          // not use 4 contour, because it take esri too long time to response.
                                                            //drivingTimeCutoffs = [Math.round(drivingTime * 0.25),Math.round(drivingTime * 0.5),,Math.round(drivingTime * 0.75),  drivingTime]; // Minutes
                                                            drivingTimeCutoffs = [drivingTime];  // just 1 polygon
                                                            serviceAreaParams = createServiceAreaParams(user_clicked_graphic, drivingTimeCutoffs, view.spatialReference);
                                                    
                                                            solveServiceArea(serviceAreaUrl, serviceAreaParams);
                                    }//if
                              }


                              function build_service_area_by_walkingDistance(){

                                  current_used_travel_mode = walkingDistanceTravelMode   

                                  if (user_clicked_graphic){
                                                // not use 4 contour, because it take esri too long time to response.
                                                //walkingDistanceCutoffs = [Math.round(walkingDistance * 0.25),Math.round(walkingDistance * 0.5),,Math.round(walkingDistance * 0.75),  walkingDistance]; // Miles
                                                walkingDistanceCutoffs = [walkingDistance];  // just 1 polygon
                                                serviceAreaParams = createServiceAreaParams(user_clicked_graphic, walkingDistanceCutoffs, view.spatialReference);
                                        
                                                solveServiceArea(serviceAreaUrl, serviceAreaParams);
                                  }//if
                              }

                              function build_service_area_by_walkingTime(){

                                    current_used_travel_mode = walkingTimeTravelMode
                                            
                                    if (user_clicked_graphic){
                                                            // not use 4 contour, because it take esri too long time to response.
                                                            //walkingTimeCutoffs = [Math.round(walkingTime * 0.25),Math.round(walkingTime * 0.5),,Math.round(walkingTime * 0.75),  walkingTime]; // Minutes
                                                            walkingTimeCutoffs = [walkingTime];  // just 1 polygon
                                                            serviceAreaParams = createServiceAreaParams(user_clicked_graphic, walkingTimeCutoffs, view.spatialReference);
                                                    
                                                            solveServiceArea(serviceAreaUrl, serviceAreaParams);
                                    }//if

                              }


                              function drivingDistance_change_handler(){
                                drivingDistance = $('#drivingDistance_range').val();
                                $('#drivingDistance_range_label').text(drivingDistance);
                                update_url_parameter('drivingDistance', drivingDistance);
                                build_service_area_by_drivingDistance()
                              }

                              function drivingTime_change_handler(){
                                drivingTime = $('#drivingTime_range').val();
                                $('#drivingTime_range_label').text(drivingTime);
                                update_url_parameter('drivingTime', drivingTime);
                                build_service_area_by_drivingTime()
                              }

                              function walkingDistance_change_handler(){
                                walkingDistance = $('#walkingDistance_range').val();
                                $('#walkingDistance_range_label').text(walkingDistance);
                                update_url_parameter('walkingDistance', walkingDistance);
                                build_service_area_by_walkingDistance()
                              }

                              function walkingTime_change_handler(){
                                walkingTime = $('#walkingTime_range').val();
                                $('#walkingTime_range_label').text(walkingTime);
                                update_url_parameter('walkingTime', walkingTime);
                                build_service_area_by_walkingTime()
                              }





                              // define user clicked marker
                              function createMarkerGraphic_atUserClickedLocation(point) {

                                // remove previous 
                                remove_serviceArea()
                                
                                marker_graphic = new Graphic({
                                  geometry: point,
                                  symbol: {
                                    type: "simple-marker",
                                    color: marker_color,
                                    size: marker_size
                                  }
                                });

                                view.graphics.add(marker_graphic);
                                return marker_graphic;
                              }



                              async function init_travelMode(){

                                // network service https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-ServiceAreaParameters.html#defaultBreaks
                                const networkDescription = await networkService.fetchServiceDescription(travelModeUrl, apiKey);
                                console.log( 'network Description, array of supportted travel mode object, look up by "name" properties . . .', networkDescription)
                                // service description https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-networkService.html#ServiceDescription

                                defaultTravelMode = networkDescription.defaultTravelMode


                              
                                drivingDistanceTravelMode = networkDescription.supportedTravelModes.find(
                                  (travelMode) => travelMode.name === "Driving Distance"
                                );
                                drivingTimeTravelMode = networkDescription.supportedTravelModes.find(
                                  (travelMode) => travelMode.name === "Driving Time"
                                );


                                walkingDistanceTravelMode = networkDescription.supportedTravelModes.find(
                                  (travelMode) => travelMode.name === "Walking Distance"
                                );
                                walkingTimeTravelMode = networkDescription.supportedTravelModes.find(
                                  (travelMode) => travelMode.name === "Walking Time"
                                );
                                

                                console.log( 'default travel mode', defaultTravelMode)
                                console.log( 'driving distance travel mode', drivingDistanceTravelMode)
                                console.log( 'driving time travel mode', drivingTimeTravelMode)
                                console.log( 'walking distance travel mode', walkingDistanceTravelMode)
                                console.log( 'walking time travel mode', walkingTimeTravelMode)
                                

                              }


                              function createServiceAreaParams(locationGraphic, mileOrMinsCutoffs, outSpatialReference) {

                              

                                // Create one or more locations (facilities) to solve for
                                const featureSet = new FeatureSet({
                                  features: [locationGraphic]
                                });

                                // Set all of the input parameters for the service
                                const taskParameters = new ServiceAreaParams({
                                  facilities: featureSet,
                                  defaultBreaks: mileOrMinsCutoffs,
                                  travelMode:  current_used_travel_mode,
                                  travelDirection: "from-facility",  //to-facility", 
                                  trimOuterPolygon: true,
                                  outSpatialReference: outSpatialReference,
                                });
                                return taskParameters;

                              }

                              function solveServiceArea(url, serviceAreaParams) {

                                return serviceArea.solve(url, serviceAreaParams)
                                  .then(function(result){


                                    // remove last time old service area graphic
                                    remove_serviceArea()

                                    if (result.serviceAreaPolygons.features.length) {

                                      // Draw each service area polygon
                                      result.serviceAreaPolygons.features.forEach(function(graphic){
                                        graphic.symbol = {
                                          type: "simple-fill",
                                          color: serviceAreaPolygon_color
                                        }
                                        view.graphics.add(graphic,0);
                                        serviceArea_graphic = graphic

                                        // fix bug, make sure user click marker add back, because previous remove service area also removed user clicked marker
                                        show_serviceArea()

                                      });
                                    }
                                  }, function(error){
                                    console.log(error);
                                  });

                              }


                /**/
                //  --- end  --- select by area TravelTimeDistance   --- 
                /**/









                  /**/
                  //  ---  select by route   --- 
                  /**/


                        // remove all route related graphic and direction ui element
                        function remove_route(){

                                if (route_origin_marker_graphic){
                                  view.graphics.remove(route_origin_marker_graphic);
                                }
                                if (route_destination_marker_graphic){
                                  view.graphics.remove(route_destination_marker_graphic);
                                }


                                for (let step = 0; step < routeLine_graphic_array.length; step++) {
                                  if (routeLine_graphic_array[step]){
                                        view.graphics.remove(routeLine_graphic_array[step]);
                                  }
                                }


                                // remove ui direction panel
                                //view.ui.remove(directions);
                                $("#direction_step_by_step").hide()
                                


                                 /*   Haversine formula How to calculate distances between points */
                                 $('#straightLine_distance').html('')
                          }



                          function show_route(){

                                  if (route_origin_marker_graphic){
                                            if (view.graphics.includes(route_origin_marker_graphic)){
                                              console.log(' origin graphic already exist, nothing to do')
                                            } else {
                                                view.graphics.add(route_origin_marker_graphic);
                                            }
                                  }

                                  if (route_destination_marker_graphic){
                                          if (view.graphics.includes(route_destination_marker_graphic)){
                                            console.log(' destination graphic already exist, nothing to do')
                                          } else {
                                                  view.graphics.add(route_destination_marker_graphic);
                                          }
                                  }

                                  for (let step = 0; step < routeLine_graphic_array.length; step++) {
                                    if (routeLine_graphic_array[step]){
                                      if (view.graphics.includes(routeLine_graphic_array[step])){
                                        console.log(' routeLine graphic already exist, nothing to do')
                                      } else {
                                                  view.graphics.add(routeLine_graphic_array[step]);
                                      }
                                    }//if

                                  }//for


                                  //view.ui.add(directions, "bottom-right");
                                $("#direction_step_by_step").html(directions)
                                $("#direction_step_by_step").show()


                                   /*   Haversine formula How to calculate distances between points */
                                   $('#straightLine_distance').html(straightLine_distance_html)

                          }




                          function add_routeMarkerGraphic(routeMarker_type, point) {


                              if (routeMarker_type == "origin"){

                                    route_origin_marker_graphic = new Graphic({
                                      symbol: {
                                        type: "simple-marker",
                                        //color: (type === "origin") ? "white" : "black",
                                        color:  route_origin_marker_color,
                                        size: route_size
                                      },
                                      geometry: point
                                    });
                                    view.graphics.add(route_origin_marker_graphic);

                              } else if (routeMarker_type == "destination"){

                                    route_destination_marker_graphic = new Graphic({
                                      symbol: {
                                        type: "simple-marker",
                                        //color: (type === "origin") ? "white" : "black",
                                        color: route_destination_marker_color,
                                        size: route_size
                                      },
                                      geometry: point
                                    });
                                    view.graphics.add(route_destination_marker_graphic);

                              }


                          }


                          function getRoute() {
                          const routeParams = new RouteParameters({
                          stops: new FeatureSet({

                            //features: view.graphics.toArray()
                            features: [route_origin_marker_graphic, route_destination_marker_graphic]
                          }),

                          returnDirections: true

                          });

                          routeLine_graphic_array = []
                          route_total_miles = 0

                          route.solve(routeUrl, routeParams)
                          .then(function(data) {

                            data.routeResults.forEach(function(result) {

                              result.route.symbol = {
                                type: "simple-line",
                                color: route_color,
                                width: route_width
                              };
                              view.graphics.add(result.route);


                              routeLine_graphic_array.push(result.route)



                              // Display directions
                              if (data.routeResults.length > 0) {
                                directions = document.createElement("ol");
                                directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
                                directions.style.marginTop = "0";
                                directions.style.padding = "15px 15px 15px 30px";
                                const features = data.routeResults[0].directions.features;

                                // Show each direction
                                features.forEach(function(result,i){
                                  direction = document.createElement("li");
                                  direction.innerHTML = " . " + result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
                                  directions.appendChild(direction);

                                  route_total_miles += Number(result.attributes.length)

                                });

                                var total_miles_html = document.createElement("span");
                                total_miles_html.innerHTML =  '<h1 style="display:inline;">' + route_total_miles.toFixed(2) + '</h1>' +  '<sup><b> miles </b></sup>' 
                                directions.prepend(total_miles_html);
                                
                                //view.ui.empty("bottom-right");
                                //view.ui.add(directions, "bottom-right");
                                $("#direction_step_by_step").html(directions)
                                $("#direction_step_by_step").show()
                              }//if




                            });// for each

                          }) // then

                          .catch(function(error){
                            console.log('route direction error', error);
                          }) // catch


                          }


                    /**/
                    //  --- end  --- select by route   --- 
                    /**/









                    
  
                 
             


      async function dom_ready_dojo(){

      

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
                
              

                 /**/
                  //  ---  select by area TravelTimeDistance   --- 
                  /**/

                  init_travelMode()

                  /**/
                  //  --- end  --- select by area TravelTimeDistance   --- 
                  /**/


    } // dom ready




 
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





                                    /**/
                                    //  ---  select by area TravelTimeDistance   --- 
                                    /**/
                                    /**/
                                    //  ---  select by route   --- 
                                    /**/
                                          // first time depends on param tool type, apply action, must wait until view is ready, keep here.
                                          tool_type_changed_event_handler()

                                    /**/
                                    //  --- end  --- select by route   --- 
                                    /**/
                     
                                    /**/
                                    //  --- end  --- select by area TravelTimeDistance   --- 
                                    /**/
                     

                  
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
 document.querySelector('body').classList.add('dark')

}); // require, everything should be inside







