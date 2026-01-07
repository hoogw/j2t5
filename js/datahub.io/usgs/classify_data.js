
// reference this example https://developers.arcgis.com/javascript/latest/query-a-feature-layer-sql/






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
  
  "esri/layers/TileLayer",
  "esri/geometry/geometryEngine",

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

  
], function (
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
             
            TileLayer,
            geometryEngine,
            
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
 
 
) {


/*

  CORS with the API
  https://developers.arcgis.com/javascript/latest/cors/




   usgs/pad will get cors error, but hrsa is ok, 
   https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/cors-issue-with-demographics8-arcgis-com/td-p/3942

    // not work
    esriConfig.request.trustedServers.push('https://gis.usgs.gov'); //https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#request
    esriConfig.request.proxyUrl = "https://transparentgov.net:7200/"; // https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#request
    esriConfig.request.urlPrefix = "gis.usgs.gov";

    // not work
    urlUtils.addProxyRule({
      urlPrefix: "gis.usgs.gov",
      proxyUrl: "https://transparentgov.net:7200/"
    });
*/




               
              
              
              
               
              
         
         // keep here, do not place in a r c g i s _ c o m m o n, because only geocoding, search POI etc need key, without these, no need key
         esriConfig.apiKey = current_in_use_esriConfigaApiKey;
              const geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
         const apiKey = esriConfig.apiKey;



/**/
              //   --- --- --- --- back to previous extent --- ------ ---
              /**/
              var extentStack = new Stack(); 
              /**/
              //   --- --- end --- --- back to previous extent --- --- --- ---  
              /**/


    

var current_selected_level_1 = 'showall'
var current_selected_level_2 = 'showall'
var current_selected_level_1_tag_id = -2
var current_selected_level_2_tag_id = -2




    /**/
    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
    /**/

          // -2 means current showing not available,  -1 means total count not available
          var current_feature_rendered = -2
          var _classified_count_of_feature = -1;

          var zoom2feature_noMoreThan = 20  // default
          var zoom2feature_zoomLevel = 18  // default
          var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
          //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level'

          
   /**/
   //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
   /**/
   







var searchText = ''



/**/
// ----- data or image  -----  ----- 
/**/
    var background_type = 'data' // data only 
    var backgroundMapImageLayer
    var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression
    
    var backgroundFeatureLayer
    var backgroundFeatureLayer_layerView   // for filter feature layer



    var clicked_graphic
          
    
    var graphic_geometryType 
/**/
// ----- end  -----  data or image -----  ----- 
/**/



      
                              /**/
                              // ----- color style setting ----- 
                              /**/ 
                              var native_renderer
                              var symbolType_radioValue = 'native'
 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  



        
        // must at top to get above url ready
        dom_ready_dojo();



 

       var map = new Map({
                             //base map id without an API key is here https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                             basemap: google_hybrid, 
                         });

       

        // Add the map to a MapView
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

       
            
    // ----- ui -----  ----- 
    init_view_ui()

          
    // for data only
    createFeatureLayer()  
          
    // for both image and tile
    createMapImageLayer()
              

    init_feature_layer_view()

            

    /**/
    // ----- ui -----  ----- 
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


              const searchAddressWidget = new Search({
                             allPlaceholder: "Search", // only works if you have multiple source l o c a  t o r, ignore if only 1 source, like here.
                      // work around is wait until all image loaded,  windows.load { document.querySelector('.esri-search .esri-search__input').setAttribute('placeholder', 'Google search this area   ')}
                      
                            // adjust width at css ".esri-search{width: 593px !important;}" ,  "!important" will overwrite the default "width:240px" in original esri-search class 
                              
                view: view
              });
              view.ui.add(searchAddressWidget, "top-leading"); //Add to the map



           


    
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





          
              // add zoom level html https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#add
              //var zoomLevel_html = '<b id="current_zoom_level" style="font-size:84px;">15</b>'
              var zoomLevel_element = document.createElement("b");
              zoomLevel_element.id = "current_zoom_level"
              zoomLevel_element.style.fontSize = '36px'
              
              zoomLevel_element.style.color = 'white'
              zoomLevel_element.style.textShadow = '2px 2px 2px #000000'

              // get current zoom level ,https://gis.stackexchange.com/questions/222652/getting-current-zoom-level-in-arcgis-api-for-javascript-4  
              //https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom
              _center_zoom = parseInt(view.zoom)  
              var zoomLevel_text = document.createTextNode(_center_zoom);
              zoomLevel_element.appendChild(zoomLevel_text);
              view.ui.add(zoomLevel_element, "bottom-left");


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
              opacity_slider.value = _opacity * 10
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

              var opacity_value_text = document.createTextNode(_opacity * 10);
              opacity_value.appendChild(opacity_value_text);
              view.ui.add(opacity_value, "bottom-left");


              



              // event handle
              opacity_slider.addEventListener("change", (event) => {

                _opacity = event.target.value / 10
                console.log(' opacity slider change to ', _opacity )
                // must use set 'text', because I previously create 'text' node
                document.getElementById('overlay_opacity_label').textContent = _opacity * 10
                // both works
                //$('#overlay_opacity_label').text(_opacity * 10)
                    update_url_parameter('opacity', _opacity)

                if (backgroundMapImageLayer){ backgroundMapImageLayer.opacity = _opacity }
               
                if (backgroundFeatureLayer){ backgroundFeatureLayer.opacity = _opacity }  


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


// not use, because without stationary, this trigger hundreds of event, while I only need stationary one, map change event,  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/mapview-extent-change/td-p/305234
                            //view.watch("extent", function(newValue, oldValue) {

                             // not use, same as view . watch 
                             // map.watch("extent", function(newValue, oldValue) {
                             // watch map change event https://developers.arcgis.com/javascript/latest/working-with-props/


// in use, sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils
// Use reactiveUtils to check when the extent changes. We include view.stationary so we only show a message, when the view is not moving.
reactiveUtils.watch(
  () => [view.stationary, view.extent, view.scale],
  ([stationary, extent, scale], [wasStationary]) => {
      if (stationary) {

            console.log('stationary happened, current extent ', extent)

                   
                          _center_zoom = parseInt(view.zoom); // extent don't have zoom, zoom only from view
                          //_center_zoom = parseInt(extent.center.zoom) // not work, extent don't have zoom, zoom only from view
                          $('#current_zoom_level').text(_center_zoom);
                          update_url_parameter('_center_zoom', _center_zoom)

                          //_center_lat = view.center.latitude
                          //_center_long = view.center.longitude
                          _center_lat = extent.center.latitude // both work
                          _center_long = extent.center.longitude // both work
                          update_url_parameter('_center_lat', _center_lat)
                          update_url_parameter('_center_long', _center_long)

                          console.log(' watch extend changed..... lat, long, zoom',_center_lat,  _center_long,  _center_zoom)

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

                          
                          
      } else if (wasStationary) {
                          // nothing to do
                          console.log(' was stationary , nothing to do, ')
      }
      return "";
    }
);

          // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui

/**/
// ----- end  ----- ui -----  ----- 
/**/

            
            

           /**/
           // ----- image or tile -----  ----- 
           /**/   
                     // mapimagelayer - widget - convert - to - component - 
                
                async function createMapImageLayer(){
                 const [MapImageLayer] = await $arcgis.import(["@arcgis/core/layers/MapImageLayer.js"]); 
                //- - end - - mapimagelayer - widget - convert - to - component -  
                           
                                           backgroundMapImageLayer = new MapImageLayer({

                                             //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
                                             url: background_mapserver_url,
                                             
                                             sublayers: [
                                               {  // sets a definition expression on sublayer 3
                                                 id: parseInt(layer_id), // warning sub layer id must be number, can't be string
                                               }],


                                             // withou this , by default, only 'name' field exported, must specify ["*"] here 
                                             outFields: ["*"],
                                             
                                             // opacitySlider, since v4.12, we use 4.11 because v4.12 have bug, failed popupTemplate.content ["*"]
                                             //https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-smartMapping-OpacitySlider.html
                                             //https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/
                                             opacity: _opacity
                                           
                                       });


                                       
// classified image only
backgroundMapImageLayer.when(() => {
  // must wait until map image layer is ready
  console.log('map Image Layer sublayer id  :   ',  layer_id, backgroundMapImageLayer)
  mapimagerlayer_sub_layer = backgroundMapImageLayer.findSublayerById(parseInt(layer_id)); // warning sub layer id must be number, can't be string
  console.log('map Image Layer sublayer object :   ',  mapimagerlayer_sub_layer)
});

                                     
                                       // must wait until promise resolved 
                                       backgroundMapImageLayer.loadAll()
                                       .catch(function(error) {
                                         // Ignore any failed resources
                                       })
                                       .then(function() {
                                         console.log("backgroundMapImageLayer All loaded, ===  capabilities  === : === ", backgroundMapImageLayer.capabilities);
                                         console.log('backgroundMapImageLayer , url',background_mapserver_url,  backgroundMapImageLayer)


                                         console.log("background type", background_type);
                                         if (background_type == 'image'){
                                           map.add(backgroundMapImageLayer)
                                         } 
                                       
                                       });

                     }
                   


                     var highlightHandles = new Handles();
                      var layerView 
                      // special for map image, data, tile interchangable 
                      async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

                     
                              backgroundFeatureLayer = new FeatureLayer({
                                url: background_layer_url, 
                                // labeling see this example https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/
                                // labelingInfo: [labelClass]  // not use, this will add label to entire layer data, not just filtered result
                                opacity: _opacity,
                                outFields: ['*'],
                              });
                     



                              // only for vertical classified
                              console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )

                              let classified_query = backgroundFeatureLayer.createQuery();
                              // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                              //if ((current_selected_field_name) && (current_selected_field_value)){
                              if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

             


                                          // any showall means no filter, no search parameter
                                          classified_query.where = '1=1'
                              } else {

                                  //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                                    if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                            classified_query.where =   current_selected_field_name + ' is null'     //"STATE_NAME is null ";
                                  } else { 

                                            // by default  where condition think it is string
                                            classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                                            // string
                                            if (_feature_attributes_string.includes(current_selected_field_name)){  
                                              classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                            }
                                                                            
                                            // number (integer, double,)
                                            if (_feature_attributes_integer.includes(current_selected_field_name)){
                                              classified_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                            }

                                            // date 
                                            if (_feature_attributes_date.includes(current_selected_field_name)){
                                              // need to handle date type, so far by default use string, may not work
                                              console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                            }

                                  } // null         
                                  
                                  console.log('classified query where clause is: ', classified_query.where )

                              } // null  




              
                      // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
                      // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
                      //backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                      backgroundFeatureLayer.queryFeatureCount(classified_query).then(function(numFeatures){
                                  // prints the total count to the console
                                  console.log('total count is : ', numFeatures);
                                  total_feature_count = numFeatures
                                  update_statistic_info(current_feature_rendered , total_feature_count)

                      });
          
                      console.log("background type", background_type);
                      if (background_type == 'data'){
                        map.add(backgroundFeatureLayer)
                      

                        layerView = await view.whenLayerView(backgroundFeatureLayer);
                        backgroundFeatureLayer_layerView = layerView;

                         

                /**/
                //  --- original color or yellow   --- 
                /**/
                if (original_color_or_yellow == 'yellow'){
                  enforce_yellow_linepointpolygon(backgroundFeatureLayer)
                } else {
                    backgroundFeatureLayer.renderer = native_renderer
                }
                /**/
                //  --- end  ---  original color or yellow   --- 
                /**/




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


                         // only for vertical classified
                         let classified_query = backgroundFeatureLayer.createQuery();
                         // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                         //if ((current_selected_field_name) && (current_selected_field_value)){
                         if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

             


                                     // any showall means no filter, no search parameter
                                     classified_query.where = '1=1'
                         } else {

                             //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                               if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                       classified_query.where =   current_selected_field_name + ' is null'     //"STATE_NAME is null ";
                             } else { 

                                       // by default  where condition think it is string
                                       classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                                       // string
                                       if (_feature_attributes_string.includes(current_selected_field_name)){  
                                         classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                       }
                                                                       
                                       // number (integer, double,)
                                       if (_feature_attributes_integer.includes(current_selected_field_name)){
                                         classified_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                       }

                                       // date 
                                       if (_feature_attributes_date.includes(current_selected_field_name)){
                                         // need to handle date type, so far by default use string, may not work
                                         console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                       }

                             } // null         
                             
                             console.log('classified query where clause is: ', classified_query.where )

                         } // null  


                                                             
                         //layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,

                                  //outFields: layerView.availableFields,
                                  //where: "DEW_POINT > 10"
                         //       })
                          layerView.queryFeatures(classified_query)
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

            /**/
                // ----- end  -----  image or tile -----  ----- 
                /**/




/**/
// -- -- -- Warning: Only for classified  -- -- --  feature layer only  -- -- --
/**/
   
              


                
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




                                                            /**/
                                                            // -- -- -- Warning: Only for classified  -- -- --
                                                            /**/ 

                                                            highlight_keywords_markjs(current_selected_field_value)
                                                            /**/
                                                            // . . . end  . . . -- -- -- Warning: Only for classified  -- -- -- 
                                                            /**/





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

                   

                    // --  end  --- highlight feature on pointer-move

                }// function


/**/
// . . . end  . . . -- -- -- Warning: Only for classified  -- -- --  feature layer only  -- -- --
/**/
   

               // remove previous both inactive and highlighted graphic and square guide box 
               function clear_clicked_graphic(){

                    console.log('remove all previous inactive, highlighted, square guide box, (they all are graphic), remove-all-function works')

                    view.graphics.removeAll()

                    empty_info_outline_Tab()
               }



/* .... ... ... external function ... ... ... */ 

    
    



    function remove_current_layer(thisLayerNeedToBeRemovedFromMap){

      if (thisLayerNeedToBeRemovedFromMap){
        // remove previous layer
        map.remove(thisLayerNeedToBeRemovedFromMap);
      }
    }





    // no tile, classify only
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

            



                 /**/
                    // ----- data or image  -----  ----- 
                    /**/

                                // esri js api only, xxx = param_xxxx can not place in arcgis_common.js, because xxx must define here(local), if place in arcgis_common.js, will not pick up value (due to sync) 
                                if (param_background_type){
                                  background_type = param_background_type
                                }


                                if (background_type == 'image'){
                                  $('#image').attr('checked', true)
                                 
                                  $('#data').removeAttr('checked')
                               
                                } else if (background_type == 'data'){
                                  $('#image').removeAttr('checked')
                                
                                  $('#data').attr('checked', true)
                                }

                              
                                $('input[type=radio][name=background_type_radio]').on('change', function() {


                                            clear_clicked_graphic()

                                          
                                            console.log(' * before * * * user change background type ', background_type) 
                                            background_type =  $(this).val()
                                            update_url_parameter('backgroundtype', background_type)
                                            console.log(' * after * * * user change background type ', background_type) 

                                            map.remove(backgroundMapImageLayer)
                                           
                                            map.remove(backgroundFeatureLayer)
                                            $('#statistic_info').html('')

                                            if (background_type == 'image'){
                                              map.add(backgroundMapImageLayer)
                                            } else if (background_type == 'data'){
                                             
                                              createFeatureLayer()
                                            }

                                });


                    /**/
                    // ----- end  -----  data or image -----  ----- 
                    /**/

                
                

                 

          // ....  end ... ...  background layer url .... ... ... 
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
                    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                    /**/

                          // nested function
                          function zoom2feature_change_handler(){
                                  
                            if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').attr('checked', true)
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              

                            } 
                            
                            if (zoom2feature_yesNo == 'donot_zoom2feature'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').attr('checked', true)
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              
                            }

                            if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').attr('checked', true)
                              
                              
                            }
                        
                            $('#zoom_to_no_more_than').val(zoom2feature_noMoreThan)
                            $('#zoom_to_no_more_than_label').text(zoom2feature_noMoreThan)
                            $('#zoom_to_range').val(zoom2feature_zoomLevel)
                            $('#zoom_to_label').text(zoom2feature_zoomLevel)
                    }

                    // first time init run 1 time only
                    zoom2feature_change_handler()


                    // event
                    $('input[type=radio][name=zoom2feature_radio]').on('change', function() {
                              zoom2feature_yesNo = $(this).val()
                              zoom2feature_change_handler()
                              update_url_parameter('zoom2feature_yesNo', zoom2feature_yesNo)
                    });

                    $('#zoom_to_no_more_than').on('change', function() {
                                zoom2feature_noMoreThan =  parseInt($(this).val())
                                $('#zoom_to_no_more_than_label').text(zoom2feature_noMoreThan)
                                update_url_parameter('zoom2feature_noMoreThan', zoom2feature_noMoreThan)
                    });

                    $('#zoom_to_range').on('change', function() {
                              zoom2feature_zoomLevel =  parseInt($(this).val())
                              $('#zoom_to_label').text(zoom2feature_zoomLevel)
                              update_url_parameter('zoom2feature_zoomLevel', zoom2feature_zoomLevel)
                    }); 


              /**/
              //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
              /**/







 							                /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/

                                   // first time,  init 
                                   if (_orderby_count_or_value == 'orderby_count'){
                                    $('#orderby_count').attr('checked', true)
                                    $('#orderby_value').removeAttr('checked')
                                  } else if (_orderby_count_or_value == 'orderby_value'){
                                    $('#orderby_value').attr('checked', true)
                                    $('#orderby_count').removeAttr('checked')
                                  } else {
                                    $('#orderby_value').removeAttr('checked')
                                    $('#orderby_count').removeAttr('checked')
                                  }

                                  // event
                                  $('input[type=radio][name=orderby_radio]').on('change', function() {
                                    _orderby_count_or_value = $(this).val()
                                    orderby_count_or_value_change_handler()
                                    update_url_parameter('orderbycountorvalue', _orderby_count_or_value)
                                  });


                            /**/
                            //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                            /**/








                  /**/
                  //  ... ... .. ... order by field name  ... ... .. ... 
                  /**/

                        // first time,  init 
                        if (orderby_fieldname == 'orderby_fieldname_default'){
                          $('#orderby_fieldname_default').attr('checked', true)
                          $('#orderby_fieldname_alphabetic_ascending').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_descending').removeAttr('checked')
                        } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){
                          $('#orderby_fieldname_default').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_ascending').attr('checked', true)
                          $('#orderby_fieldname_alphabetic_descending').removeAttr('checked')
                        } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){
                          $('#orderby_fieldname_default').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_ascending').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_descending').attr('checked', true)
                        }

                        // event
                        $('input[type=radio][name=orderby_fieldname_radio]').on('change', function() {
                          orderby_fieldname = $(this).val()
                          showAll()
                          build_field_list()
                          update_url_parameter('orderbyfieldname', orderby_fieldname)
                        });



                  /**/
                  //  ... end ... ... .. ... order by field name  ... ... .. ...
                  /**/



                  
           /**/
          //  --- POI point of interest search esri     --- 
          /**/

          init_search_poi_event_handler()

          /**/
          //  --- end  ---  POI point of interest search esri    --- 
          /**/


                      
    }





            



        

      
          
            function show_info_outline_Tab(___properties){
              $('#info_outline').show();
              
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
              console.log('current_selected_field_value', current_selected_field_value)
              highlight_keywords_markjs(current_selected_field_value)
            }
            
            
            function empty_info_outline_Tab(){
              $('#info_outline').hide();
$('#info-window-div').html("")
            }
            
     












/**/
// ========== classified  ========== 
/**/







                  // remove all filter, show     all    feature
                  function showAll(){

                    current_selected_field_name = 'showall'
                    current_classifyFieldName = current_selected_field_name
                    current_selected_field_value = 'showall'
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                    _classified_count_of_feature = -1

                  $('.field_name_class').removeClass('selected_style')
                  $('#fieldname_tag_-1').addClass('selected_style')

                  update_url_parameter('select_field', -1);
                  update_url_parameter('select_fieldvalue', -1);

                  $('#value_list').html('');

                  if (background_type == 'data'){
                    // classified data only,  
                            filter_featureLayerView()
                  } else if (background_type == 'image'){
                    // classified image only
                            filter_mapImageLayer()
                  }
                  get_classified_count_zoom_to_feature()


                  }

                  function showAll_fieldvalue(){

                  // Do not make it empty, must keep current selected field
                  //current_selected_field_name = ''
                  //current_classifyFieldName = current_selected_field_name

                  current_selected_field_value = 'showall'
                  _classified_count_of_feature = -1

                  $('.field_value_class').removeClass('selected_style')
                  $('#fieldvalue_tag_-1').addClass('selected_style')

                  update_url_parameter('select_fieldvalue', -1);

                  if (background_type == 'data'){
                    // classified data only,  
                            filter_featureLayerView()
                  } else if (background_type == 'image'){
                    // classified image only
                            filter_mapImageLayer()
                  }
                  get_classified_count_zoom_to_feature()


                  } 








                  
                  async function build_value_list(_fieldName, _field_name_tag_id){
                  

                            $('.field_name_class').removeClass('selected_style')
                            $('#fieldname_tag_' + _field_name_tag_id).addClass('selected_style')



                            current_selected_field_value = 'showall'
                            current_selected_field_value_tag_id = -2
                            current_selected_field_name = _fieldName
                            current_classifyFieldName = current_selected_field_name
                            current_selected_field_name_tag_id = _field_name_tag_id

                            update_url_parameter('select_field', _field_name_tag_id);
                            update_url_parameter('select_fieldvalue', -1);

                            var _fieldType = field_type[_fieldName]
          var ____fieldType_lowerCase  = _fieldType.toLowerCase();
                            /*
                            if (_fieldType){
                              //nothing to do
                            } else {
                              // field type could be undefined, by default, assign as string
                              _fieldType =  "esriFieldTypeString"
                            } 
                            */
                            console.log(' get distinct field value by field name and field type', _fieldName, _fieldType)

                            /*
                            field type  :  https://developers.arcgis.com/documentation/common-data-types/field.htm
                                                                            esriFieldTypeDate | 

                                                                            esriFieldTypeSingle | 
                                                                            esriFieldTypeInteger |
                                                                            esriFieldTypeSmallInteger | 
                                                                            esriFieldTypeDouble | 

                                                                            esriFieldTypeGeometry | 
                                                                            esriFieldTypeRaster |

                                                                            esriFieldTypeGlobalID | 
                                                                            esriFieldTypeGUID | 
                                                                            esriFieldTypeOID | 

                                                                            esriFieldTypeBlob |
                                                                            esriFieldTypeString | 
                                                                            esriFieldTypeXML
                                                                            
                            */

                            // ******************  unique value  ****************** 

                                                                        /*
                                                                            // returnDistinctValues  https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm


                                                                            returnDistinctValues = true, it returns distinct values based on the fields specified in outFields.

                                                                            *** *** warning *** ***

                                                                                                This parameter applies only if the supportsAdvancedQueries property of the layer is true. 

                                                                                                Most of time, Supports Advanced Queries:  false, will return by default 1000 record with duplicated value,

                                                                                                No matter wether distinct value or duplicated value, we all go through our process to remove duplicated value.


                                                                            *** *** end  **** *** warning *** *** 

                                                                            This parameter can be used with returnCountOnly to return the count of distinct values of subfields.
                                                                            // working example: https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/16/query?f=pjson&
                                                                                                            returnGeometry=false&
                                                                                                            returnCountOnly=false&
                                                                                                            returnDistinctValues=true&
                                                                                                            outFields=ZONE_&
                                                                                                            where=1=1


                                                                              Response:
                                                                                        {
                                                                                                                                  "displayFieldName": "ZONE_",
                                                                                                                                  "fieldAliases": {
                                                                                                                                    "ZONE_": "ZONE_"
                                                                                        },


                                                                                          "fields": [
                                                                                                                                    {
                                                                                                                                    "name": "ZONE_",
                                                                                                                                    "type": "esriFieldTypeString",
                                                                                                                                    "alias": "ZONE_",
                                                                                                                                    "length": 25
                                                                                                                                    }
                                                                                                    ],


                                                                                          "features": [
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "R1-F"
                                                                                                                                    }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "RM4"
                                                                                                                                    }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "PE"
                                                                                                                                    }
                                                                          */



                                                                            // always use returnDistinctValues=true,  
                                                                            //    in case of not support advanced query, not support distinct value, returnDistinctValues=true will NOT cause error, just ignore this value, 
                                                                            //    but will return first 100 to 1000 (limit), may not be a completed list, may missing some distinct value.
                                                                            //    only if support distinct value, will guarantee full complete list of distinct value.
                                                                            console.log( '_supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct ---->>>>---',  _supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct )


                                                                            

                            //  ======  ===== =======  group by  ======  ===== =======  

                                                                                                                        /*

                                                                                                                          This parameter is supported only on layers/tables that indicate supportsStatistics is true, means, "supportsAdvancedQueries": true, 
                                                                                                                          https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm
                                                                                                                          Warning:  both must used together, groupByFieldsForStatistics is valid only when the outStatistics parameter is used.
                                                                                                                                outStatistics, 
                                                                                                                                groupByFieldsForStatistics,
                                                                                                                                outStatistics =   [
                                                                                                                                                      {
                                                                                                                                                        "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                        "onStatisticField": "Field1", 
                                                                                                                                                        "outStatisticFieldName": "Out_Field_Name1"
                                                                                                                                                      },
                                                                                                                                                      {
                                                                                                                                                        "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                        "onStatisticField": "Field2",
                                                                                                                                                        "outStatisticFieldName": "Out_Field_Name2"
                                                                                                                                                      }  
                                                                                                                                                    ]
                                                                                                                      */
                                                                                                                                var _outStatistics = [
                                                                                                                                                        {
                                                                                                                                                          "statisticType": "count",
                                                                                                                                                          "onStatisticField": _fieldName,
                                                                                                                                                          "outStatisticFieldName": "count"
                                                                                                                                                        }
                                                                                                                                                      ]

                                                                                                                                // warning:  out statistics is object, not like other are string, you must convert object to string, then url encoded that string, before send to ajax                      
                                                                                                                                var stringified_outStatistics = JSON.stringify(_outStatistics)
                                                                                                                                var encoded_outStatistics =  encodeURIComponent(stringified_outStatistics)
                                                                                                                                console.log(' supports Statistics,  stringified out Statistics,   encoded out Statistics ==== ', _supportsStatistics, stringified_outStatistics, encoded_outStatistics)
                                                                                                                            
                                                                                                                            // _url_distinctFieldValue_groupby =  background_mapserver_url + '/'+  layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson&returnGeometry=false&returnCountOnly=false&where=1=1'
                                                                                                                            var _url_distinctFieldValue_groupby =  background_mapserver_url + '/'+  layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson'
                                                                                                                            
                                                                                                                            console.log( 'render 2ndTier url group by field/count %%%%%%  group by  %%%%%% ',  _url_distinctFieldValue_groupby)



                                                                                        /**/
                                                                                        //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                        /*
                                                                                            kowning issue for esri only: 
                                                                                            groupby does not work with 'null', always get null{0}, should be null{29} if use distinct, default200, click 'null' will populate it to  null{29}
                                                                                        */
                                                                                              var _where_is_null = encodeURIComponent(_fieldName) +  encodeURIComponent(" is null or ") + encodeURIComponent(_fieldName) + encodeURIComponent("=''") 
                                                                                              var _url_esri_groupby_null_fix =  background_mapserver_url + '/'+  layer_id + '/query?' + 'where=' + _where_is_null + '&returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson'
                                                                                              console.log('_url_esri_groupby_null_fix', _url_esri_groupby_null_fix)
                                                                                              var null_count = {  "count": 'count of empty(blank or null) field' } // default 
                                                                                              try {
                                                                                                     null_count = await ajax_try_jsonp_cors_proxy_return_json_object(_url_esri_groupby_null_fix)
                                                                                              } catch {
                                                                                                     null_count = {  "count": 'ajax error 404 failed to count empty(blank or null) field' }
                                                                                                     console.log('ajax error 404 when try get null_count', null_count)
                                                                                              }
                                                                                              /*
                                                                                                      {
                                                                                                        "count": 29
                                                                                                      }
                                                                                              */
                                                                                              console.log('null_count', null_count)
                                                                                              if (null_count.hasOwnProperty('error')){
                                                                                                    null_count = {  "count": 'arcgis server error failed to execute query when count empty(blank or null) field - ' + JSON.stringify(null_count.error) }
                                                                                              }

                                                                                        /**/
                                                                                        //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                        /**/



                                                                                                                            


                              //  ======  =====  end =======    group by  ======  ===== ======= 
                                                                                                                  /**/
                                                                                                                  // ======  ===== =======    distinct  ======  ===== =======  
                                                                                                                        var _url_distinctFieldValue_distinct =  background_mapserver_url + '/'+  layer_id + '/query?outFields=' + _fieldName + '&f=pjson&returnGeometry=false&returnCountOnly=false&returnDistinctValues=true&where=1=1'
                                                                                                                        console.log( 'render 2ndTier  url <<<<<<< distinct >>>>>>> FieldValue ........  ', _url_distinctFieldValue_distinct)
                                                                                                                  // ======  =====  end  =======    distinct  ======  ===== ======= 
                                                                                                                  /**/




                                                                                            var raw_distinctFieldValue
                                                                                            // url group-by
                                                                                            raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_groupby)

                                                                                            /*
                                                                                                    error: {code: 400, message: "Unable to complete operation.", details: []}
                                                                                                            code: 400
                                                                                                            details: []
                                                                                                            message: "Unable to complete operation."

                                                                                                  warning: 
                                                                                                  
                                                                                                            will error if use oracle spatial, instead of ESRI, even supportsAdvancedQueries,supportsStatistics = true  
                                                                                                            "outStatistics arcgis not working"   https://community.esri.com/t5/arcgis-enterprise-questions/outstatistics-return-unable-to-complete-operation/td-p/456011

                                                                                                            error sample:  all navigateLA 
                                                                                                            https://maps.lacity.org/arcgis/rest/services
                                                                                                            http://localhost:10/json2tree/esri/server/folder.html?url=https%3A%2F%2Fmaps.lacity.org%2Farcgis%2Frest%2Fservices&org=Los+Angeles+CA+navigateLA&_center_lat=34.02006286055584&_center_long=-118.41204261445893&_center_zoom=16&select_folder=22&select_layer=57

                                                                                              */ 
                                                                                              console.log('raw distinct Field Value ajax by Group-by ', raw_distinctFieldValue)







                                                                                              /**/
                                                                                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                                                                                              /**/
                                                                                                                    
                                                                                              if (raw_distinctFieldValue.error) {

                                                                                                          // groupby have error, only use distict
                                                                                                                        _distinct_or_groupby = 'distinct'
                                                                                                                        update_url_parameter('distinctorgroupby', 'distinct' )
                                                                                                                        _orderby_count_or_value = 'orderby_value'
                                                                                                                        update_url_parameter('orderbycountorvalue', 'orderby_value')

                                                                                                                        // enforce order by value
                                                                                                                        $('#orderby_value').attr('checked', true)
                                                                                                                        $('#orderby_count').removeAttr('checked')
                                                                                                                        //disable this radio 
                                                                                                                        $('input[name=orderby_radio]').attr("disabled",true);
                                                                                                              

                                                                                                                        // url distinct
                                                                                                                        raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_distinct)
                                                                                                                        
                                                                                              } else {

                                                                                                            // groupby works, do not use distict
                                                                                                            _distinct_or_groupby = 'groupby'
                                                                                                            update_url_parameter('distinctorgroupby', 'groupby' )

                                                                                                            /**/
                                                                                                            //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                                            /**/
                                                                                                                var features_array_null_fix = raw_distinctFieldValue.features 
                                                                                                                var _attributes_null_fix
                                                                                                                var __field_value_null_fix
                                                                                                                for (var n = 0; n < features_array_null_fix.length; n++) { 
                                                                                                                  _attributes_null_fix = features_array_null_fix[n].attributes
                                                                                                                  __field_value_null_fix = _attributes_null_fix[_fieldName]
                                                                                                                  if (__field_value_null_fix == null){
                                                                                                                    raw_distinctFieldValue.features[n]['attributes']['count'] = null_count['count']
                                                                                                                    break // for loop
                                                                                                                  }//if
                                                                                                                }//for
                                                                                                                console.log('raw_distinctFieldValue  * * * after null fix  * * *', raw_distinctFieldValue)

                                                                                                            /**/
                                                                                                            //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                                            /**/
                                                                                              }


                                                                                              /**/
                                                                                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                                                                                              /**/

              
                                                                                              console.log( ' {{{{{{{{{{  _distinct_or_groupby  }}}}}}}}}}', _distinct_or_groupby)      
                                                                                              console.log( ' {{{{{{{{{{  distinct field value  .....  raw un-sorted  ......  }}}}}}}}}}    ', raw_distinctFieldValue)



                                                                              var real_distinct_fieldvalue_array = []


                                                                        // not works,   because it generate object {}, instead of plain element
                                                                        // remove duplicate element from array, get a new array
                                                                        // var  real_distinct_fieldvalue_SET = new Set(distinctFieldValue)
                                                                        // real_distinct_fieldvalue_array = [ ... real_distinct_fieldvalue_SET]


                                                                        // mapserver raw response,  processing, { features: [ ....... ] }
                                                                        /*
                                                                        
                                                                            features: 
                                                                                        [
                                                                                          {
                                                                                            attributes: 
                                                                                                        {
                                                                                                          ZoneName: "Parks and Recreation", 
                                                                                                          count: 60
                                                                                                          }
                                                                                          }



                                                                                          {
                                                                                            attributes: {
                                                                                                            ZoneName: "Medium High Density Residential", 
                                                                                                            count: 83
                                                                                                          } 
                                                                                          }
                                                                                        ]
                                                                        */
                                                                                        if (raw_distinctFieldValue.features) {

                                                                                          if ( raw_distinctFieldValue.features.length > 0 ) {
            
            
                                                                                                      var features_array = raw_distinctFieldValue.features
                                                                                                      var _attributes
                                                                                                      var __field_value_
            
                                                                                                      for (var l = 0; l < features_array.length; l++) { 
            
                                                                                                              _attributes = features_array[l].attributes
                                                                                                              __field_value_ = _attributes[_fieldName]
            
            
                                                                                                            
                                                                                                            
                                                                                                            if (_distinct_or_groupby == 'groupby') {
            
                                                                                                                    //  ======  ===== =======  group by  ======  ===== ======= 
            
                                                                                                                                          //real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }   
                                                                                                                                                  // indexOf method in an object array https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array/38516944 
                                                                                                                                          _index_position = real_distinct_fieldvalue_array.map(function(e) { return e[_fieldName]; }).indexOf(__field_value_);
                                                                                                                                          if (_index_position == -1 ) {
                                                    
                                                                                                                                                    real_distinct_fieldvalue_array.push(_attributes)
            
            
                                                                                                                                          } else {
            
                                                                                                                                                // found duplicated value, nothing to do 
            
                                                                                                                                          }// if 
            
            
            
            
                                                                                                            } else if (_distinct_or_groupby == 'distinct'){
            
                                                                                                                    // ======  ===== =======    distinct  ======  ===== =======  
            
            
                                                                                                                                  // real distinct array element is string  : 'dog'
                                                                                                                                if  (real_distinct_fieldvalue_array.indexOf(__field_value_) == -1 ) {
                                                                                                                                        real_distinct_fieldvalue_array.push(__field_value_)
                                                                                                                                } else {
                                                                                                                                        // found duplicated value, nothing to do 
                                                                                                                                }// if 
            
                                                                                                                                          
            
            
            
            
                                                                                                            } // supports Statistics
            
            
            
            
            
            
            
                                                                                                      
                                                                                                      } // for
            
                                                                                      
                                                                                        
                                                                                        } // if raw.length > 0
                                                                                      } // if raw
            
                                                                                    console.log( '  before sort, unique value , real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
            


                              /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/
                                                                                    console.log( ' * * * * * *  _orderby_count_or_value  * * * * * * ',  _orderby_count_or_value)
                                                                                    console.log( ' * * * * * *  _distinct_or_groupby  * * * * * * ',  _distinct_or_groupby)

                                                                                    if (_orderby_count_or_value == 'orderby_count'){


                                                                                                if (_distinct_or_groupby == 'groupby'){
                                                                                                              //  ======  ===== =======  group by  ======  ===== ======= 
                                                                                                              /**/
                                                                                                                      //   ########      ########    sort by "count"  DESC  ########      ######## 
                                                                                                                      /**/  
                                                                                                                              // real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }
                                                                                                                              console.log( '  ********* sort ~~~~~~~ count DESCending ~~~~~~~   *********-> ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                
                                                                                                                              // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                              real_distinct_fieldvalue_array.sort(
                                                                                                                                                                    function(a, b) {
                                                                                                                                                                                                
                                                                                                                                                                                    // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                                    // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                                if ( parseFloat(a['count']) < parseFloat(b['count']) ){
                                                                                                                                                                                                  return 1;
                                                                                                                                                                                                }
                                                                                                                                                                                                if ( parseFloat(a['count']) > parseFloat(b['count']) ){
                                                                                                                                                                                                  return -1;
                                                                                                                                                                                                }
                                                                                                                                                                                                return 0;
                                                                                                                                                                                    }
                                                                                                                                                                  );
                                                                                                                              console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                      //   ########    end    ########     sort by "count"  DESC  ########      ######## 
                                                                                                  } else {
                                                                                                               // can not sort, nothing to do, do not sort, because order by count must have groupby working.
                                                                                                               console.log('can not sort, nothing to do, do not sort, because order by count must have groupby working.')
                                                                                                  }// groupby





            
                                                                                  } else if (_orderby_count_or_value == 'orderby_value'){

                                             
                                                                                                   if (_distinct_or_groupby == 'distinct'){
                                                                                                                    // only for g200, g100
                                                                                                                      // ======  ===== =======    distinct  ======  ===== =======
                                                                                                                      /**/ 
                                                                                                                                    //   ########    ########    sort by field value alphabetic  ~~~~~~~  distinct url only  ~~~~~~~    ########   ######## 
                                                                                                                                     /**/ 
                                                                                                                                            // sort array ascending  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            
                                                                                                                                            var ____fieldType_lowerCase  = _fieldType.toLowerCase(); 
            
                                                                                                                                            if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ) {
                                                                                                                                                                      
                                                                                                                                                                      // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                                                      real_distinct_fieldvalue_array.sort(
                                                                                                                                                                                                            function(a, b) {
                                                                                                                                                                                                                            return a - b;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                          );
            
                                                                                                                                            } else {
                                                                                                                                                                        // by default work on string, text, compare UTF-16, Unicode,  but not works on numeric number, expected output: Array [1, 100000, 21, 30, 4]
                                                                                                                                                                        real_distinct_fieldvalue_array.sort() 
                                                                                                                                            }
                                                                                                                                            console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                                    //   ########    end   ########    sort by field value alphabetic      ########   ######## 


                                                                                                    } else if (_distinct_or_groupby == 'groupby'){
                                                                                                                      // only for g400, g300, not for g430, g330

                                                                                                                      //   ########    ########    sort by field value alphabetic      ########   ######## 
                                                                                                                                console.log( '  ~~~~~~~  sort by field value alphabetic  ASCending ~~~~~~~  group by url only ~~~~~~~  ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                                            
                                                                                                                                // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                real_distinct_fieldvalue_array.sort(
                                                                                                                                                                      function(a, b) {
                                                                                                                                                                                                  
                                                                                                                                                                                      // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                                      // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                                  if ( a[_fieldName] < b[_fieldName] ){
                                                                                                                                                                                                    return -1;
                                                                                                                                                                                                  }
                                                                                                                                                                                                  if ( a[_fieldName] > b[_fieldName] ){
                                                                                                                                                                                                    return 1;
                                                                                                                                                                                                  }
                                                                                                                                                                                                  return 0;
                                                                                                                                                                                      }
                                                                                                                                                                    );
                                                                                                                                console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                      //   ########    end   ########    sort by field value alphabetic      ########   ######## 

                                                                                                    }// distinct



                                                                              } // supports Statistics
            
            
                              /**/
                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                              /**/




                            var value_html = '';
                            value_html += '<div>';
            
                            var _node_display_text 
                    var _node_groupBy_count = '' 

                            if (real_distinct_fieldvalue_array) {
                              if ( real_distinct_fieldvalue_array.length > 0 ) {
                                  
                                value_html += '<ol>';
                                value_html +=   '<a  id="fieldvalue_tag_-1" class="field_value_class" href="#">';
                                value_html +=    '<span style="font-size:24px; font-weight:700;">Show all</span>' 
                                value_html +=   '</a>';
                                value_html +=   ' {' + total_feature_count + '}'
                                    
                                    for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) { 


                                      var _this_field_value

                                      if (_distinct_or_groupby == 'groupby') {

                                              //  ======  ===== =======  group by  ======  ===== ======= 

                                              _node_display_text = real_distinct_fieldvalue_array[r][_fieldName] 
                                              _node_groupBy_count = ' {' + real_distinct_fieldvalue_array[r]['count'] + '}'
                                              _this_field_value = real_distinct_fieldvalue_array[r][_fieldName]

                                      } else if (_distinct_or_groupby == 'distinct'){

                                              // ======  ===== =======    distinct  ======  ===== ======= 
                                              
                                              _node_display_text = real_distinct_fieldvalue_array[r]
                                              _this_field_value = real_distinct_fieldvalue_array[r]

                                      
                                      } // supports Statistics



                                      value_html += '<li>' // css .ordered_list_number{ size font};
                                      //value_html +=   '<a id="fieldvalue_tag_' + r + '" class="field_value_class" href="#" onclick="filter_result(\'' + _this_field_value + '\', ' + r + ')">';
                                      value_html +=   '<a id="fieldvalue_tag_' + r + '" class="field_value_class" href="#"  data-field-value="' + _this_field_value +  '" data-tag-id="' + r +  '">';
                                      value_html +=    _node_display_text  
                                      value_html +=   '</a>';
                                      value_html +=   _node_groupBy_count;

                                      // . . . add filtered count  . . .
                                      value_html +=   '<span id="fieldvalue_count_' + r + '">' + '</span>';
                                      // . . . end  . . . add filtered count  . . .

                                      value_html += '</li>';
                                    }// for

                                    value_html += '</ol>';
                                    value_html +='</div>'
                                    $('#value_list').html(value_html);

                                    // event
                                    var _fieldvalue_tag_id
                                    for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) {                               
                                      _fieldvalue_tag_id = '#fieldvalue_tag_' + r
                                      $(_fieldvalue_tag_id).on('click', function(){
                                                                                filter_result($(this).data('field-value'), $(this).data('tag-id'))
                                                                        });
                                    }// for
                                    $("#fieldvalue_tag_-1").on('click', showAll_fieldvalue)


                                  } else {
                                    value_html +=  '<div style="font-size: 18px; font-weight: 100;">' + 'No Value Can Be Selected' +  '</div>' 
                                    value_html +='</div>'
                                    $('#value_list').html(value_html);
    
                                  }//if  
                                }//if
                            

                        // must enforce update map
                     // get_map_bound()

                  }

 							    /**/
                  //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                  /**/

                                          // for 0 only, from 430, add 'orderby' radio
                                          var _orderby_count_or_value = 'orderby_count'  // default,   'orderby_value' 
                                          

                                          // for 400,430, 0 only, hybrid groupby+distinct
                                          var _distinct_or_groupby = 'groupby'    // default,    "groupby" or "distinct"
                                          var _url_distinctFieldValue_distinct 
                                          var _url_distinctFieldValue_groupby

                                          // url have 2 cases, distinct or group-by
                                          var _url_distinctFieldValue  // for 100,200,300 only

                                          function orderby_count_or_value_change_handler(){

                                                      console.log( ' ------ * * * ------ * * *  _orderby_count_or_value  * * *  ------ * * *  ------',  _orderby_count_or_value)
                                                      console.log( '  ------* * *  ------ * * *  _distinct_or_groupby  * * * ------ * * *  ------',  _distinct_or_groupby)
                                                      console.log('orderby_count_or_value_change_handler,   current_selected_field_name, current_selected_field_name_tag_id  ',  current_selected_field_name, current_selected_field_name_tag_id)

                                                      if ((current_selected_field_name == 'showall') || (current_selected_field_name_tag_id < 0)){
                                                        console.log('you have not select any field name, change order-by does not make sense, does not do anything', )
                                                      } else {
                                                        build_value_list(current_selected_field_name, current_selected_field_name_tag_id)
                                                       
                                                      }
                                            

                                          }


                  /**/
                  //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                  /**/






              /**/
              //  ... ... .. ... order by field name  ... ... .. ... 
              /**/

                    function create_field_html(fieldNameListArray){

                          var field_html = '';
                          field_html += '<div>';

                          if (fieldNameListArray.length > 0) {
                                  //field_html += '<ol class="custom-counter">';
                                  field_html += '<ol>';

                                  //field_html +=   '<a id="fieldname_tag_-1" class="field_name_class" href="#" onclick="showAll()">';
                                  field_html +=   '<a id="fieldname_tag_-1" class="field_name_class" href="#">';
                                  field_html +=    '<b><h3 style="display:inline">Show all</h3></b>' 
                                  field_html +=   '</a>';
                                
                                  for (var i = 0; i < fieldNameListArray.length; ++i) {
                                        field_html += '<li>' // css .ordered_list_number{ size font};
                                        //field_html +=   '<a id="fieldname_tag_' + i + '" class="field_name_class" href="#" onclick="build_value_list(\'' + fieldNameListArray[i] + '\',' + i + ')">';
                                        field_html +=   '<a id="fieldname_tag_' + i + '" class="field_name_class" href="#" data-field-name="' + fieldNameListArray[i] +  '" data-fdnm-tagid=' + i +  '>';
                                        field_html +=    fieldNameListArray[i]  
                                        field_html +=   '</a>';
                                        field_html += '</li>';
                                  }// for
                                  field_html += '</ol>';

                                  field_html +='</div>'

                                  $('#field_list').html(field_html);

                                  // event
                                    var _fieldName_tag_id
                                    for (var i = 0; i < fieldNameListArray.length; ++i) {                           
                                      _fieldName_tag_id = '#fieldname_tag_' + i
                                      $(_fieldName_tag_id).on('click', function(){
                                                                                   build_value_list($(this).data('field-name'), $(this).data('fdnm-tagid'))
                                                                                  });
                                    }// for
                                    $("#fieldname_tag_-1").on('click', showAll)


                                  } else {
                                    field_html +=  '<div style="font-size: 18px; font-weight: 100;">' + 'No Column Name or Field name, No Filter Can Be Select' +  '</div>' 
                                    field_html +='</div>'
                                    $('#field_list').html(field_html);
                                  }//if
                          
                         
                          // user have not select any value, by default, show this message
                          $('#value_list').html('');
                        }


                    function build_field_list(){

                                                  console.log('orderby_fieldname', orderby_fieldname)

                                                  if (orderby_fieldname == 'orderby_fieldname_default'){
                                                          // default order
                                                          console.log('field_name', field_name)
                                                          create_field_html(field_name)

                                                  } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){

                                                          // sort field name alphabetic_ascending
                                                          field_name_order_by_alphabetic_ascending = structuredClone(field_name)
                                                          field_name_order_by_alphabetic_ascending.sort();
                                                          console.log('field_name_order_by_alphabetic_ascending',  field_name_order_by_alphabetic_ascending)
                                                          create_field_html(field_name_order_by_alphabetic_ascending)

                                                  } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){

                                                          // sort field name alphabetic descending
                                                          field_name_order_by_alphabetic_descending = structuredClone(field_name)
                                                          field_name_order_by_alphabetic_descending.sort();
                                                          field_name_order_by_alphabetic_descending.reverse()
                                                          console.log('field_name_order_by_alphabetic_descending', field_name_order_by_alphabetic_descending)
                                                          create_field_html(field_name_order_by_alphabetic_descending)
                                                  }

                    }
                  

              /**/
              //  ... end ... ... .. ... order by field name  ... ... .. ...
              /**/







      /**/
      // ==========  end   ==========  classified  ========== 
      /**/

   












        // ++++++++++++++++  ++++++++++++++++ classified only  ++++++++++++++++  ++++++++++++++++  ++++++++++++++++ 
                    /**/

                     // . . . add filtered count  . . .
                     function update_value_list_tag_count(_tagId, _filteredTotal){

                      console.log(' ++ ++ ++ update value list tag count ++ ++ ++ ++ ++ ', _tagId, _filteredTotal)
                      var _filtered_count_tagId = '#fieldvalue_count_' + _tagId
                      if ($(_filtered_count_tagId).html()){
                            // already has something, nothing to do
                      } else {
                             // null, need add filtered count
                             $(_filtered_count_tagId).html(' {~' + _filteredTotal + '~}')
                      }

                    }

                    // . . . end  . . . add filtered count  . . .
                    /**/
                              
                  
                              // classified only
                              function display_count_info(_subject, ___all_cnt,  ____classified_cnt){

                              //  ------  ---------  ------ 3 ---------  ------  --------- 

                              var _percentage_html3 = ''
                              var _percentage_float3, _percentage_integer3, _percentage_decimal3;

                                if ((____classified_cnt > 0) && ( ___all_cnt> 0)) {
                                   //_percentage3 = ((100 * ____classified_cnt) / ___all_cnt).toFixed(3)
                                   _percentage_float3 = (100 * ____classified_cnt) / ___all_cnt
                                   _percentage_integer3 = Math.floor(_percentage_float3);
                                   _percentage_decimal3 = (_percentage_float3.toFixed(3)).split(".")[1]

                                  
                                   _percentage_html3 =   '<mark>' 
                                   _percentage_html3 +=        '<b>' + _percentage_integer3 +  '</b>'   
                                   _percentage_html3 +=        '.' 
                                   _percentage_html3 +=        '<sup><small>' + _percentage_decimal3 + '</small></sup>' 
                                   _percentage_html3 +=        '%' 
                                   _percentage_html3 +=   '</mark>'
                                



                                    // filtered count / total
                                    var _html_for_count3 =    ''
                                    _html_for_count3 += '<div>'
                                    _html_for_count3 +=   '<span class="highlight-number-extra-large2">'
                                    _html_for_count3 +=     '<mark>' +  ____classified_cnt + '</mark>' 
                                    _html_for_count3 +=     '/'
                                    _html_for_count3 +=     '<sup class="number-medium2">' + ___all_cnt + '</sup>'
                                    _html_for_count3 +=   '</span>'
                                    //  0.45%  percentage 
                                    _html_for_count3 +=      '<span>filtered</span> / <sup>total</sup>'   
                                    _html_for_count3 +=      '&nbsp;&nbsp;&nbsp;'
                                    _html_for_count3 +=      _percentage_html3 
                                    _html_for_count3 +=    '</div>'
                                    
                                   
                                    document.getElementById('message_value').innerHTML = _html_for_count3  
                                
                                } else {
                                  document.getElementById('message_value').innerHTML = ''
                                }


                              }


                              function filter_result(____current___selected___field___value, _field_value_tag_id){
                             
                                $('.field_value_class').removeClass('selected_style')
                                $('#fieldvalue_tag_' + _field_value_tag_id).addClass('selected_style')
      
      
                                current_selected_field_value = ____current___selected___field___value
                                /**/
                                // . . . add filtered count  . . .
                                current_selected_field_value_tag_id = _field_value_tag_id
                                // . . . end  . . . add filtered count  . . .
                                /**/
      
                                console.log(" now filter by  (current selected field name =  current selected field value ) : ", current_selected_field_name,   current_selected_field_value )
      
                                update_url_parameter('select_fieldvalue', _field_value_tag_id);

                                if (background_type == 'data'){
                                  // classified data only,  
                                          filter_featureLayerView()
                                } else if (background_type == 'image'){
                                  // classified image only
                                          filter_mapImageLayer()
                                }
                                get_classified_count_zoom_to_feature()
                              }




                             // classified image only, Filter feature using map image layer
                             function filter_mapImageLayer(){
                              /*
                                 Filter feature using map image layer, using a definitionExpression in order to filter a sublayer by attribute
                                   https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/filter-feature-using-map-image-layer/td-p/1062407
                                   https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-definitionexpression/
                              */

                                   console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )
                                   var mapImageLayer_sublayer_definitionExpression = ''
                                   if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

              


                                            mapImageLayer_sublayer_definitionExpression = ''
                                   } else {

                                                if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                                  mapImageLayer_sublayer_definitionExpression = current_selected_field_name + ' is null'  //"STATE_NAME is null ";
                                                } else{

                                                  // by default  where condition think it is string
                                                  mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                    
                                                  // string
                                                  if (_feature_attributes_string.includes(current_selected_field_name)){  
                                                    mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                  }
                                                  
                                                  // number (integer, double,)
                                                  if (_feature_attributes_integer.includes(current_selected_field_name)){
                                                    mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                                  }

                                                  // date 
                                                  if (_feature_attributes_date.includes(current_selected_field_name)){
                                                    // need to handle date type, so far by default use string, may not work
                                                    console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                                  }

                                                } // null 
                                   }

                                   
                                          console.log('mapImageLayer_sublayer_definitionExpression  :   ',  mapImageLayer_sublayer_definitionExpression)
                                          mapimagerlayer_sub_layer.definitionExpression = mapImageLayer_sublayer_definitionExpression;
                                 
                            }


                           // classified data only,  
                             function filter_featureLayerView(){

                              console.log('filter map Image Layer, use its sublayer, by field name, field value', current_selected_field_name, current_selected_field_value )

                                let featureLayerView_filter_where = ''
                                //   *****  classified , filter by     ***** 
                                // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                                //if ((current_selected_field_name) && (current_selected_field_value)){
                                if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

             


                                          // any showall means no filter, no search parameter
                                          featureLayerView_filter_where = '1=1'    
                                } else {
                                          
                                          //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                                          if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                            featureLayerView_filter_where =   current_selected_field_name + ' is null'  //"STATE_NAME is null ";
                                          } else{

                                                      // by default  where condition think it is string
                                                      featureLayerView_filter_where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                      
                                                      // string
                                                      if (_feature_attributes_string.includes(current_selected_field_name)){  
                                                        featureLayerView_filter_where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                      }
                                                      
                                                      // number (integer, double,)
                                                      if (_feature_attributes_integer.includes(current_selected_field_name)){
                                                        featureLayerView_filter_where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                                      }

                                                      // date 
                                                      if (_feature_attributes_date.includes(current_selected_field_name)){
                                                        // need to handle date type, so far by default use string, may not work
                                                        console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                                      }


                                          } // null 
                                          console.log('classified query where clause is: ', featureLayerView_filter_where )
                                }

                                if (backgroundFeatureLayer_layerView){
                                      backgroundFeatureLayer_layerView.filter = { where : featureLayerView_filter_where} 
                                } 
                                
                                 
        
                            }
                              
        

                    // ++++++++++++++++  end ++++++++++++++++ classified only  ++++++++++++++++  ++++++++++++++++  ++++++++++++++++ 







      // .. - .. - ... zoom 2 feature   ... - .. - ..
      function get_classified_count_zoom_to_feature(){

        console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )

        let classified_query = backgroundFeatureLayer.createQuery();
        // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
        //if ((current_selected_field_name) && (current_selected_field_value)){
        if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

              /**/
              // . . . add filtered count  . . .
                  if ((current_selected_field_name == 'showall')){
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                  }
                  if ((current_selected_field_value == 'showall')){
                    current_selected_field_value_tag_id = -2
                  }
              // . . . end  . . . add filtered count  . . .
              /**/


                    // any showall means no filter, no search parameter
                    _classified_count_of_feature = -1
                    display_count_info(_layer, total_feature_count, _classified_count_of_feature)
        } else {

            //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
              if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                      classified_query.where =   current_selected_field_name + ' is null'     //"STATE_NAME is null ";
            } else { 

                      // by default  where condition think it is string
                      classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                      // string
                      if (_feature_attributes_string.includes(current_selected_field_name)){  
                        classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                      }
                                                      
                      // number (integer, double,)
                      if (_feature_attributes_integer.includes(current_selected_field_name)){
                        classified_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                      }

                      // date 
                      if (_feature_attributes_date.includes(current_selected_field_name)){
                        // need to handle date type, so far by default use string, may not work
                        console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                      }

            } // null         
            
            console.log('classified query where clause is: ', classified_query.where )

            backgroundFeatureLayer.queryFeatureCount(classified_query)
            .then(function(numFeatures){
              // prints the total count to the console
              console.log(' -- -- **  ** classified count of feature -- -- **  ** ', numFeatures)
              _classified_count_of_feature = numFeatures
              console.log(' -- -- **  ** classified count of feature -- -- **  ** ', _classified_count_of_feature )

              // . . . add filtered count  . . .
              update_value_list_tag_count(current_selected_field_value_tag_id, _classified_count_of_feature)
              // . . . end  . . . add filtered count  . . .
              
              display_count_info(_layer, total_feature_count, _classified_count_of_feature)
              
            }).catch((error) => {
              console.log(' **  ** query last feature of classified return count failed **  ** ', error);                                        
            }); 




            // zoom to feature
            if (zoom2feature_yesNo == 'donot_zoom2feature'){

              // do not zoom, but still need to query filtered result currently showing on map, by trigger pan or zoom at same location, when map stationary, will calculate filtered feature on map 
              view.goTo({
                         target: view.center,
                         zoom: view.zoom,
                        });


            } else {  
              // zoom to feature by query feature layer, then get extent of the query result( not use), instead zoom to first feature result.

              let classified_1st_feature_query = backgroundFeatureLayer.createQuery();

              // query param:  https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#properties-summary
              classified_1st_feature_query.returnGeometry = true;  // only need geometry

               /*  
                              Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                              https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                              without use them, must use "where 1=1" will return max number of return count
                              if use "num" and "start", then do not use "where 1=1"

                              num:1,
                              start:0,
                          */
              //classified_1st_feature_query.num = 1;  // do not use.

              classified_1st_feature_query.outFields = ['*'];  // no need attribute, but for console log,keep it. 

              //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
              if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                classified_1st_feature_query.where =   current_selected_field_name + ' is null'  //"STATE_NAME is null ";
              } else{ 

                        // by default  where condition think it is string
                        classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                        // string
                        if (_feature_attributes_string.includes(current_selected_field_name)){ 
                                  classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                        }
                                                      
                        // number (integer, double,)
                        if (_feature_attributes_integer.includes(current_selected_field_name)){
                          classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                        }

                        // date 
                        if (_feature_attributes_date.includes(current_selected_field_name)){
                          // need to handle date type, so far by default use string, may not work
                          console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                        }

              } // null         
              
              console.log('classified 1st feature query where clause is: ', classified_1st_feature_query.where )

              backgroundFeatureLayer.queryFeatures(classified_1st_feature_query)
                .then(function(results){


                  console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                  // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                  var found_1_valid_geometry = false
                  for (let i = 0; i < results.features.length; i++) {
                        if (results.features[i].geometry){
                            console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                            found_1_valid_geometry = true

                            // polygon, line works fine, but point, would not zoom to point (closer), is because for point,geometry,extent is null. However polygon's geometry's extent have value. 
                            console.log('(point, extent is null) (polygon or line, extent has somevalue) test 1st geometry, type, and extent  :   ', results.features[i].geometry.type, results.features[i].geometry.extent  )
                            

                            
                                                    view.goTo(results.features[i].geometry).then(function(goto_results){

                              
                              



                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                  
                                                                                console.log('- -- - zoom now - -- -  no more than - -- -   ', view.zoom, zoom2feature_noMoreThan)
                                                                                if (view.zoom > zoom2feature_noMoreThan ){
                                                                                    // view zoom https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
                                                                                    view.goTo({
                                                                                      target: view.center,
                                                                                      zoom: zoom2feature_noMoreThan
                                                                                    });
                                                                                }//if

                                                                                // fix for ( point is always has null extent), enforce to zoom to level 20 (zoom2feature_noMoreThan)
                                                                                if (results.features[i].geometry.type == 'point'){
                                                                                  view.goTo({
                                                                                    target: view.center,
                                                                                    zoom: zoom2feature_noMoreThan
                                                                                  });
                                                                                } 

                                                                        } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                    
                                                                                                console.log(' - -- -  zoom now - -- -  fix at - -- -   ', view.zoom, zoom2feature_zoomLevel)
                                                                                                view.goTo({
                                                                                                  target: view.center,
                                                                                                  zoom: zoom2feature_zoomLevel
                                                                                                });
                                                                        }//if
                                                                })// view goto
                                                                .catch((error) => {
                                                                  console.log('-- -- go to classified 1st valid feature failed -- -- ', error);                                        
                                                                }); // view goto

                            break; // break for loop
                        }
                  }//for 
                  if (! found_1_valid_geometry){
                        console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                        // goto full extent, always works
                        view.goTo(results.features).then(function(goto_results){

                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                  
                                                                                console.log('- -- - zoom now - -- -  no more than - -- -   ', view.zoom, zoom2feature_noMoreThan)
                                                                                if (view.zoom > zoom2feature_noMoreThan ){
                                                                                    // view zoom https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
                                                                                    view.goTo({
                                                                                      target: view.center,
                                                                                      zoom: zoom2feature_noMoreThan
                                                                                    });
                                                                                }//if

                                                                        } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                    
                                                                                                console.log(' - -- -  zoom now - -- -  fix at - -- -   ', view.zoom, zoom2feature_zoomLevel)
                                                                                                view.goTo({
                                                                                                  target: view.center,
                                                                                                  zoom: zoom2feature_zoomLevel
                                                                                                });
                                                                        }//if
                                                                })// view goto
                                                                .catch((error) => {
                                                                  console.log('-- -- go to classified 1st valid feature failed -- -- ', error);                                        
                                                                }); // view goto
                  }//if


                }).catch((error) => {
                  console.log('-- -- query classified 1st valid feature failed -- -- ', error);                                        
                }); 
            }// zoom to feature



        } //if name




      }  
     //   ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 





 /**/
 // ****** pre select by url param  ****** 
      
            var _first_time_load_for_field = true;
            var _first_time_load_for_fieldvalue = true;
            var selected_fieldLevel_id;
          var selected_fieldvalueLevel_id;
            async function  pre_select_field_level(){
                    var _rightnow_url_params
                    if (_first_time_load_for_field) {

                      // only run 1 time, 1st time, get original url param from init global variable function
                       _rightnow_url_params = urlParams
                       _first_time_load_for_field = false

                    } else {
                        //  re-create instance of url params
                         _rightnow_url_params = new URLSearchParams(window.location.search);

                    }  
                            selected_fieldLevel_id = _rightnow_url_params.get('select_field');                                                  
                            console.log('selected_field_id',  selected_fieldLevel_id)

                            selected_fieldvalueLevel_id = _rightnow_url_params.get('select_fieldvalue');
                            console.log('selected_fieldvalue_id',  selected_fieldvalueLevel_id)

                            if ((selected_fieldLevel_id == undefined) || (selected_fieldLevel_id == null) || (selected_fieldLevel_id == '')){
                                // select folder is null, undefined, nothing to select
                            } else if (selected_fieldLevel_id == -1){

                                  showAll()
                            
                            } else {

                                  var selected_fieldname = $('#fieldname_tag_' + selected_fieldLevel_id).text()
                                  //var _fieldNameWithAlias = $('#fieldname_tag_' + selected_fieldLevel_id).text()
                                  //var selected_fieldname = _fieldNameWithAlias.slice(0,_fieldNameWithAlias.indexOf(' {'))

                                  console.log('pre select field by ',  selected_fieldname,  selected_fieldLevel_id)
                                  await build_value_list(selected_fieldname,  selected_fieldLevel_id)
                                  pre_select_fieldvalue_level()
                            }
            }

             async function pre_select_fieldvalue_level(){
    
                                // -1 means show all, do nothing
                                if ((selected_fieldvalueLevel_id == undefined) || (selected_fieldvalueLevel_id == null) || (selected_fieldvalueLevel_id == '')){
    
                                    // select layer is null, undefined, nothing to select
                                } else if (selected_fieldvalueLevel_id == -1){

                                    showAll_fieldvalue()

                                } else {
    
    
                                    var selected_fieldvalue = $('#fieldvalue_tag_' + selected_fieldvalueLevel_id).text()
                                    selected_fieldvalue = selected_fieldvalue.split('{')[0]
                                    selected_fieldvalue = selected_fieldvalue.trim()
                                    console.log('pre select field value by selected fieldvalue',  selected_fieldvalue)
                                    console.log('pre select field value by selected fieldvalueLevel id',   selected_fieldvalueLevel_id)
                                    filter_result(selected_fieldvalue, selected_fieldvalueLevel_id)
    
                                }



            }

// ******  end   ******  pre select by url param  ****** 
/**/






  // classify must aync-await
  
               
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

            // no tile, classify only
            init_background_layer()
            // do not await, this function only get layer name
            await get_feature_attributes(background_mapserver_url, layer_id)

            build_field_list()

            
            
            init_user_interface_event()

            init_print() //  ---  print   --- 
                           
             
        
        

        
        
                          
        

      }
 
        
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
            // -- -- -- only for feature layer classified  -- -- -- 
            var polygonFillBy = 'blue-forward-diagonal' //'red-diagonal-cross'



              // only for label and color,              
              function enforce_yellow_linepointpolygon(_this_feature_layer){


                if (polygonFillBy == 'original-color'){

                  _this_feature_layer.renderer = native_renderer

                } else {

               


                  /**/
                  // -- -- -- label and color  -- -- -- 

                  switch (polygonFillBy) {

                    case 'original-color':
                      current_simplefillPattern = 2  // backward-diagonal
                      _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                      break;

                    case 'red-diagonal-cross':
                      current_simplefillPattern = 2  // backward-diagonal
                      _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                      break;

                    case 'blue-tint':
                      current_simplefillPattern = 6  // solid
                      _default_fillColor = 'rgba(0, 0, 255, 0.2)'; // blue
                      break;

                    case 'nothing':
                      current_simplefillPattern = 5  // none
                      break;


                      case 'blue-forward-diagonal':
                        current_simplefillPattern = 3  // backward-diagonal
                        _default_fillColor = 'rgba(0, 0, 255, 0.95)'; // blue
                        break;
  

                      case 'red-cross':
                        current_simplefillPattern = 1  // backward-diagonal
                        _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                        break;


                        case 'red-tint':
                      current_simplefillPattern = 6  // solid
                      _default_fillColor = 'rgba(255, 68, 51, 0.2)'; // red
                      break;


                      case 'blue-backward-diagonal':
                        current_simplefillPattern = 0  // backward-diagonal
                        _default_fillColor = 'rgba(0, 0, 255, 0.95)'; // blue
                        break;

                    default:
                      console.log(`Sorry, we are out of ${polygonFillBy}.`);
                  }



                  //. . . end  . . . -- -- -- label and color  -- -- -- 
                  /**/



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






                    console.log( ' _this_feature_layer.geometryType ......>'  , _this_feature_layer.geometryType)
                    var _geometry_type_ = _this_feature_layer.geometryType.toLowerCase()
                    if (_geometry_type_ == 'polygon') {
                                  console.log( ' _this_feature_layer.renderer ......>'  , polygon_renderer)
                                  _this_feature_layer.renderer = polygon_renderer;
                    } 

                    if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                                _this_feature_layer.renderer = point_renderer;
                    }   


                    if (_geometry_type_ == 'polyline') {
                                  _this_feature_layer.renderer = polyline_renderer;
                    }   




                  }// if original color


              }  


            //. . . end  . . . -- -- --only for feature layer classified  -- -- -- 
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







        /* 
              The last things before require end is pre-select or pre-search keywords, must wait until MapView is ready.

              1). pre select must await until all level 1 html loaded
              2). pre select must await until MapView is ready,  see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
                  A MapView may not be immediately ready for display after it has been constructed. 
                  For example, map data may need to be loaded first to determine the spatialReference of the view, 
                  or the DOM container may not yet have a non-zero size. 
                  Many of the view methods (such as hitTest or goTo) need the view to be ready before they can be used.
                  .when() method on the MapView instance can be called to execute processes that may only run after the map has loaded.

                  2.1). dojo use .when, https://dojotoolkit.org/reference-guide/1.9/dojo/when.html
                  dojo/when is designed to make it easier to merge coding of synchronous and asynchronous threads. 
                  Accepts promises but also transparently handles non-promises. 
                  If no callbacks are provided returns a promise, regardless of the initial value. 
                  Also, foreign promises are converted.
                  If callbacks are provided and the initial value is not a promise, 
                  the callback is executed immediately with no error handling. 
                  Returns a promise if the initial value is a promise, or the result of the callback otherwise.



          */
                  view.when(function(){

                    init_esri_print_widget() // - - -  esri print widget   - - -

                    
                    // MapView is now ready for display and can be used. Here we will
                    // use goTo to view a particular location at a given zoom level and center
                    /* 
                        view.goTo({
                          center: [-112, 38],
                          zoom: 12
                        });
                    */

    
                        // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                        console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                        if (zoom_to_1st_feature){
                                                    // only zoom 1 time, first time, never zoom again
                                                    zoom_to_1st_feature = false; 
                                                    //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                                    pan_to_real_location()
                        }//if


                        



                        pre_select_field_level()



                  })
                  .then(function() {
                    return backgroundFeatureLayer.when();
                  })
                  .then(function(layer) {
                  
                            // first time only,  must init and get esri native renderer.
                            if (native_renderer == null) {
                              native_renderer = layer.renderer.clone();
                            }
                          
                          
                            return view.whenLayerView(layer);
              })
          
      




    // set dark mode by default
    //document.querySelector('body').classList.add('dark')


}); // require, everything should be inside

