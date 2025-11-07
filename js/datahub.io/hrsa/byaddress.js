



// geocoding address esri example https://developers.arcgis.com/javascript/latest/search-for-an-address/



require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
 
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",
  
  
  "esri/layers/TileLayer",
  "esri/geometry/geometryEngine",
  "esri/widgets/Legend",
  "esri/widgets/Search",
  
  "esri/rest/locator",
  "esri/rest/places",
  "esri/rest/support/FetchPlaceParameters",
  "esri/rest/support/PlacesQueryParameters",
  "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",
  
          "esri/widgets/Print",

          "esri/core/reactiveUtils",
], function (
          esriConfig,
          Map, 
          MapView,

            Basemap,
            Attribution,
           
            WebTileLayer, 
          BasemapToggle,
          
           
          TileLayer,
          geometryEngine,
          Legend,
          Search,
        
          locator,
            places, 
            FetchPlaceParameters, 
            PlacesQueryParameters,
            
           Track,
             Locate,
             Graphic,

           Print,
            
            reactiveUtils,
) {

  
               
              
              
              
               


/**/
// ----- image or tile -----  ----- 
/**/
  var background_type = 'image'  //'image'  tile
  var backgroundMapImageLayer
    var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression
  var backgroundTileLayer
  var backgroundFeatureLayer         
/**/
// ----- end  -----  image or tile -----  ----- 
/**/







var address
var select
var option
var search

var suggest_results_html
var current_selected_level_2 = 0



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



                        /* 
                        // no need, move default zoom to bottom
                        let zoomWidget = new Zoom({
                          view: view
                        });
                        view.ui.add(zoomWidget, "top-right"); //Add to the map
                        */
                        


              
                        // ...................... toggle basemap ....................
                              //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-widgets
                              // 1 - Create the widget
                              var toggle = new BasemapToggle({
                                // 2 - Set properties
                                view: view, // view that provides access to the map's 'topo' basemap
                                nextBasemap: "hybrid" // use without an API key, more choice https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                              });
                              // Add widget to the top right corner of the view
                              view.ui.add(toggle, "bottom-left");
                        // ...........end ........... toggle basemap ....................    


                    


              /**/ 
              //=================== add legend ============================
                      var legend = new Legend(
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
                                              

                                                /* 
                                                    Render Legend Widget outside MapView
                                                    https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/render-legend-widget-outside-mapview/td-p/215473

                                                    new Legend({view}, legend-container-dom-id)
                                                */
                                                "legend-div"
                                                
                                );

                                // comment this line, if you want legend outside of mapView. This line will enforce add legend on mapView
                                view.ui.add(legend, "top-left");  // for print move from left to right

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
                            view.ui.add(locate, "bottom-right");
          // track large icon modified at color.css for button size, arcgis_common.js bottom for shadow DOM icon size change.
          // without shadow DOM, such as toggle basemap icon, to make it large only set at color.css 
          //   . . end  . .  track  . . 








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
                          if (backgroundTileLayer){ backgroundTileLayer.opacity = _opacity }
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
                    console.log('hideLegend button clicked')

                    if (view.ui.find("legend-id")){
                      view.ui.remove(legend)
                    } else {
                      view.ui.add(legend, "top-left");  // for print move from left to right
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

                                            backgroundTileLayer = new TileLayer({
                                              url: background_mapserver_url, // "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer"
                                              opacity: _opacity,
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
                                              } else if (background_type == 'tile'){
                                                map.add(backgroundTileLayer)
                                              }
                                            
                                            });

                          }
                        

                          async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

                                      backgroundFeatureLayer = new FeatureLayer({
                                        url: background_layer_url, 
                                        // labeling see this example https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/
                                        // labelingInfo: [labelClass]  // not use, this will add label to entire layer data, not just filtered result
                                        opacity: _opacity
                                      });

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
                    // === ==== === ===  geocode auto suggest === ==== === ===  
                    /**/


    function showSuggestion(text, magicKey, _index) {

      suggest_results_html += '<li>'
      suggest_results_html +=     '<a id="suggestItem_tag_' + _index + '" class="suggestItem_class" href="#" magicKey="'  + magicKey + '" index="' + _index + '"  >';
      suggest_results_html +=       text  
      suggest_results_html +=     '</a>';
      suggest_results_html += '</li>'
      suggest_results_html += '</br>'

    }



    function geocodeSuggestion(suggestionText, magicKey) {

      console.log('geocodeSuggestion > suggestionText, magicKey', suggestionText, magicKey)

     

      const params = {
        SingeLine: suggestionText, // suggestion text
        address: {
          magicKey: magicKey, // suggestion magic key
        },
        outFields: ["PlaceName", "Place_addr", "LongLabel"],
      };
      // Geocode suggestion and show location
      locator.addressToLocations(geocodingServiceUrl,params).then((results) => {
        showSearchResult(results);
        testRelationship(results)
      });
    }

    function showSearchResult(results) {
      if (!results.length) {
        return;
      }
      const result = results[0];
      view.graphics.removeAll();
      const graphic = new Graphic({
        symbol: {
          type: "simple-marker",
          color: [20, 130, 200, 0], //"#000000",
          size: "48px",

          // developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
          outline: {
            color: [0, 150, 255, 0.9],
            width: 6,
            style: "solid", // dash, solid , long-dash //  https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html#style
          },
        },
        geometry: result.location,
        attributes: result.attributes,
        popupTemplate: {
          title: "{PlaceName}",
          content:
            "{LongLabel}" +
            "<br><br>" +
            result.location.longitude.toFixed(5) +
            "," +
            result.location.latitude.toFixed(5),
        },
      });
      view.graphics.add(graphic);

     

      view.goTo({
        target: result.location,
        zoom: 13,
      });
    }



    /**/ 
    // === ==== end === ===  geocode auto suggest === ==== === ===  
    /**/






/* .... ... ... external function ... ... ... */     



// for point address only, do not buffer 
function testRelationship(results){


         console.log('test point address relationship  results ', results)

         if (!results.length) {
          return;
        }
        const result = results[0];

        // we only test first .[0] feature geometry against background, ignore the others if results have multiple feature 
        var first_feature_geometry = result.location
        console.log(' test point address geometry', first_feature_geometry)

        const backgroundQuery = {
                                  geometry: first_feature_geometry,
                                  spatialRelationship : "intersects",
                                  outFields: ['*'], // Attributes to return
                                  returnGeometry: false
                                };

// sever-side query instead of visible-view query https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount

// both works, this is query feature 
        backgroundFeatureLayer.queryFeatures(backgroundQuery)
        .then((results) => {

                              console.log(" level 1 query result ",  results)

                                        // for queryFeatures use this section
                                        if (results.features.length){
                                                    // results is > 0
                                                    $('#result_div').html('<span style="font-size:72px; background-color:green; color:white;"> &nbsp; Yes, eligible &nbsp; </span>')
                                        } else {
                                                      // results = 0
                                                     $('#result_div').html('<span style="font-size:72px; background-color:red; color:white;"> &nbsp; No feature intersect with boundary &nbsp; </span>')
                                        }//if
          
        }).catch((error) => {
                                        console.log(' query feature failed ', error);
                                                                //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                                $('#loader_iconimage').hide()
        });  
       

/*
      // both works, this is query feature count, return a number
        backgroundFeatureLayer.queryFeatureCount(backgroundQuery)
                                        .then((results) => {
                                                                console.log(' level 1 query result ', results); 
                                                                if (results){
                                                                              // results is > 0
                                                                              $('#result_div').html('<span style="font-size:72px; background-color:green; color:white;"> &nbsp; Yes, eligible &nbsp; </span>')
                                                                } else {
                                                                            // results = 0
                                                                            $('#result_div').html('<span style="font-size:72px; background-color:red; color:white;"> &nbsp; No feature intersect with boundary &nbsp; </span>')
                                                                }
                                        }).catch((error) => {

                                                                console.log(' query feature failed ', error);
                                                                //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                                $('#loader_iconimage').hide()
                                        });   
                                        
                                        */
}






function auto_suggest_esri(keywords){




  var params = {
    text: keywords, // Suggestion text
  };

  locator.suggestLocations(geocodingServiceUrl, params)
  
  .then((response) => {


              //  -- build html   -- 
                                $('#auto_suggest_esri').html('')
                                suggest_results_html = '<ol>'

                                // Show a list of the suggestions
                                var idx = 0
                                response.forEach((suggestion) => {
                                  idx += 1
                                  showSuggestion(suggestion.text, suggestion.magicKey, idx);
                                });
                                
                                suggest_results_html += '</ol>'
                                $('#auto_suggest_esri').html(suggest_results_html)
              // -- end  -- build html   -- 
              /**/



              // . . .  register html event . . .  

                                for (let e = 1; e <= idx; e++) {
                                  
                                        var this_tag_id = '#' + 'suggestItem_tag_' + e.toString()

                                        $(this_tag_id).on('click', function(event){
                                    
                                                                                event.preventDefault();
                                                                                var suggestionText = $(event.target).text();
                                                                                var magicKey = $(this).attr('magicKey');
                                                                                var _idx = $(this).attr('index');
                                                                                console.log('click --suggest--- ', suggestionText, magicKey, _idx, this);

                                                                                var item_tag_id = '#' + 'suggestItem_tag_' + _idx.toString()
                                                                                $('.suggestItem_class').removeClass('selected_style')
                                                                                $(item_tag_id).addClass('selected_style')
                                                                                update_url_parameter('select_level2value', _idx);

                                                                                current_selected_level_2 = _idx
                                                                  
                                                  
                                                                                geocodeSuggestion(suggestionText, magicKey)
                                                                            })
                                }//for

              // . . .  end  . . .  register html event . . .  




              // for level 2, check pre-select level2 , only run 1 time
              if (param_select_level_2){
                var pre_click_tag_id = '#suggestItem_tag_'+  param_select_level_2.toString()
                console.log('check pre-select level2 , only run 1 time', pre_click_tag_id)

                // sometimes, not working
                // $(pre_click_tag_id ).trigger( "click" );
                // instead, manually do click
                var suggestionText = $(pre_click_tag_id).text();
                var magicKey = $(pre_click_tag_id).attr('magicKey');
                var _idx = $(pre_click_tag_id).attr('index');
                console.log('pre click ', suggestionText, magicKey, _idx);
                $('.suggestItem_class').removeClass('selected_style')
                $(pre_click_tag_id).addClass('selected_style')
                update_url_parameter('select_level2value', _idx);
                current_selected_level_2 = _idx
                geocodeSuggestion(suggestionText, magicKey)


                param_select_level_2 = 0
              }//if  
                     

                          
  });


}



function pre_select(){

    // pre-search
    search = param_search
                    
    console.log('init search address', search)
    if (search){
      auto_suggest_esri(search)   
      $( "#address_text_esri" ).val(search)
    }

}







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
            
          

    // ....  end ... ...  background layer url .... ... ... 
    /**/

}



function init_search(){

// ----------- esri searh address -----------    
          // only for user press key up
          $("#address_text_esri").on('keyup',function(){

            $('#result_div').html('')
            address = $('#address_text_esri').val();
            console.log('search address esri', address)
            update_url_parameter('search', address);
            update_url_parameter('select_level2value', null);

            if (address){
              auto_suggest_esri(address) 
            } else {
              
              $('#result_div').html('')
              $('#auto_suggest_esri').html('')
            }
      }); 


      // only for click enter key and click X clear button
      $("#address_text_esri").on('search',function(){

              // search logic here
               // this function will be executed on click of X (clear button)

               $('#result_div').html('')
               address = $('#address_text_esri').val();
               console.log('search address', address)
               update_url_parameter('search', address);
               update_url_parameter('select_level2value', null);

               if (address){
                 auto_suggest_esri(address) 
               } else {
                
                 $('#result_div').html('')
                 $('#auto_suggest_esri').html('')
               }
      }); 
//  -----------  end ----------- esri searh address ----------- 
/**/   


}



function dom_ready_dojo(){


    init_background_layer()
    // do not await, this function only get layer name
    get_feature_attributes(background_mapserver_url, layer_id)
 
    init_search()

    init_print() //  ---  print   --- 
                           

    
    

}



/* ....  end ... ... external function ... ... ...*/     



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



                          pre_select()




                      pre_select()
                    })
                    .catch(function(err) {
                      // A rejected view indicates a fatal error making it unable to display.
                      // Use the errback function to handle when the view doesn't load properly
                      console.error("MapView rejected:", err);
                    });
            
 



}); // require, everything should be inside

