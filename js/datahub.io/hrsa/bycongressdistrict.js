
// reference this example https://developers.arcgis.com/javascript/latest/query-a-feature-layer-sql/






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
           
               Track,
             Locate,
             Graphic,
            
           Print,
            
            reactiveUtils,
) {




              
               
              
              
              
               
              


// for county only, buffer size and relationship is special for county
var negative_buffer = -5
var negative_buffer_unit ='kilometers'

var   ___url_string = "https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer"
var congressdistrict_layer_url = ___url_string + '/8' 


// level 1 is state name
var level1_field_name = 'STATE_NM'
var level1_url = congressdistrict_layer_url + '/query?outFields='
    level1_url += level1_field_name + '&f=pjson&returnGeometry=false&returnCountOnly=false&returnDistinctValues=true&where=1=1'
var raw_distinct_level1_value
var level1_value_array = []
var clicked_level1_value



// level 2 is congress district
var level2_field_name = 'CONG_DIST_NM'
var congressdistrict_fips_cd_field_name = 'STATE_FIPS_CD_CONG_DIST_NUM'
var congressdistrict_fips_cd = {}
var congressdistrict_representative_name_field_name = 'REPRESENTATIVE_NM'
var congressdistrict_representative_name = {}
var congressdistrict_representative_url_field_name = 'URL_TXT'
var congressdistrict_representative_url = {}

var level2_url = congressdistrict_layer_url + '/query?outFields=' + congressdistrict_fips_cd_field_name + ',' + congressdistrict_representative_name_field_name + ','  + congressdistrict_representative_url_field_name + ','
    level2_url += level2_field_name + '&f=pjson&returnGeometry=false&returnCountOnly=false&returnDistinctValues=true&where='
    level2_url += level1_field_name + '=\''
var raw_distinct_level2_value
var level2_value_array = []
var clicked_level2_value



var current_selected_level_1 = 'showall'
var current_selected_level_2 = 'showall'
var current_selected_level_1_tag_id = -2
var current_selected_level_2_tag_id = -2



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
var congressdistrictMapImageLayer
var congressdistrictFeatureLayer







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





/* .... ... ... external function ... ... ... */     




    async function work_on_value(workonthiskeyword, index){

      $('#loader_iconimage').show()
      $('#result_div').html('')

      console.log(' work_on_value ', workonthiskeyword, index, level2_field_name )

      // mark level 2 selection
      current_selected_level_2 = index
      current_selected_level_2_tag_id = index
      $('.level2value_class').removeClass('selected_style')
      $('#level2value_tag_' + index).addClass('selected_style')
      update_url_parameter('select_level2value', current_selected_level_2);



          



      //Add county layer
      remove_current_layer(congressdistrictFeatureLayer)


      /*  
      //not use image layer, because you can't change color and label of a image layer, instead, you should use feature layer
      congressdistrictMapImageLayer = new MapImageLayer({
                                            url: background_mapserver_url,
                                            sublayers: [{
                                                id: 14,
                                                title: workonthiskeyword,

                                                // both works
                                                // warning: because multiple county could have same name, 'orange county', must use 'sql' 'AND' to restrict state name
                                                definitionExpression: level2_field_name + "='" + workonthiskeyword + "' AND " +  level1_field_name + "='" + clicked_level1_value + "'",
                                                // fips id works, do not have to use, in this case, not use 
                                                //definitionExpression: congressdistrict_fips_cd_field_name +'=\'' + congressdistrict_fips_cd[workonthiskeyword] + '\'' ,
                                                
                                                popupTemplate: {
                                                      content: workonthiskeyword
                                                }
                                            }],
                                            opacity: 0.9
                                        });
      map.add(congressdistrictMapImageLayer);
      */





      //Zoom to county
      congressdistrictFeatureLayer = new FeatureLayer({
          url: congressdistrict_layer_url
      });



     

      const countyQuery = {

                            // both works
                            // warning: because multiple county could have same name, 'orange county', must use 'sql' 'AND' to restrict state name
                            where: level2_field_name + "='" + workonthiskeyword + "' AND " +  level1_field_name + "='" + clicked_level1_value + "'",  // Set by select element
                            // fips id works, do not have to use, in this case, not use 
                            //where: congressdistrict_fips_cd_field_name + '=\'' + congressdistrict_fips_cd[workonthiskeyword] + '\'',

                            
                            // spatialRelationship: "intersects", // Relationship operation to apply
                            // geometry: extent, // Restricted to visible extent of the map
                            outFields: ['*'], // Attributes to return
                            returnGeometry: true
                          };


      congressdistrictFeatureLayer.queryFeatures(countyQuery)

                          .then((results) => {
                  
                                                  if (results.features.length){
                                                    // results is > 0
                                                    console.log("Feature count: " + results.features.length)
                                                    displayResults(results);

                                                    testRelationship(results, negative_buffer, negative_buffer_unit)

                                                  } else {
                                                      // results = 0
                                                      $('#result_div').html('<span style="font-size: 72px;">Not Found</span>')
                                                  }//if
                  
                          }).catch((error) => {

                                                console.log(' query feature failed ', error);
                                                              //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                              $('#loader_iconimage').hide()
                          });                  
      


      /*
      // do not use, works but randomly zoom to africa if query result is null or empty or invalid.       
      congressdistrictFeatureLayer.queryExtent(countyQuery).then(function (results) {
          view.goTo(results.extent.expand(1.5));
          //view.goTo(results.extent);
      });
      */

      

    }




    // only for congress district (popup template) 
    function displayResults(results) {

      console.log(' display results and zoom to extent', results.features )

      // zoom to extent, goTo(graphic or geometry or array of them), if empty results feature, will not zoom to anywhere, stay at where it is.
      // see https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-do-i-find-the-extent-of-an-array-of-graphics/td-p/368324
      view.goTo(results.features);


            // https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
            const symbol = {
                              type: "simple-fill",
                              color: [20, 130, 200, 0],


                              // developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
                              outline: {
                                color: [0, 150, 255, 0.9],
                                width: 12,
                                style: "solid", // dash, solid , long-dash //  https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html#style
                              },
            };

            const popupTemplate = {
              title: "{CONG_DIST_NM}",
              content: "{REPRESENTATIVE_TITLE} &nbsp;:&nbsp; {REPRESENTATIVE_NM}  <br> website &nbsp;:&nbsp; {URL_TXT}  <br>  {CMN_REGION_NM} "
            };

            // Assign styles and popup to features
            results.features.map((feature) => {
              feature.symbol = symbol;
              feature.popupTemplate = popupTemplate;
              return feature;
            });

            // Clear display
            
            view.graphics.removeAll();
            // Add features to graphics layer
            view.graphics.addMany(results.features);

    }


    
    
    function testRelationship(results, buffer_distance, buffer_unit){

      

      // we only test first .[0] feature geometry against background, ignore the others if results have multiple feature 
      var first_feature_geometry_original = results.features[0].geometry
      console.log(' test original without buffer', first_feature_geometry_original )

      /*
         why need buffer? 
         because some case, county boundary accidently touch-overlap with rural health boundary a few meters, 
         this will cause "intersects" as true, if I shrink (negative buffer) by for example 10km, intersects will be false, which is what I want.
         negative buffer size can be adjusted here
         
         buffer will slow down by a few seconds, however it will give more accurate results.
         without buffer, will be fast, however, when 2 polygon boundary touch-overlap a little, will result as wrong info.    
         
         geometryEngine, is client side buffer, while,  GeometryService is server side buffer
         buffer example https://developers.arcgis.com/javascript/latest/sample-code/ge-geodesicbuffer/
         
      */
      // without buffer
      // var first_feature_geometry = first_feature_geometry_original
      // with buffer
      var first_feature_geometry = geometryEngine.geodesicBuffer(first_feature_geometry_original, buffer_distance, buffer_unit)
      console.log(' test ---- after apply buffer  ----  geometry  ---- ', first_feature_geometry )

      // buffer could be failed, for example, colorado -> broomfield county -> polygon have complex multipart 
      if (first_feature_geometry){
              // buffer success
              console.log('buffer success')
      } else {
              // buffer failed, just don't use buffer, use origial
              first_feature_geometry = first_feature_geometry_original
              console.log('buffer failed, use original ')
      }


      /* possible relationship 
                    https://resources.arcgis.com/en/help/arcobjects-net/componentHelp/index.html#//002500000086000000
                    https://gis.stackexchange.com/questions/130034/what-is-the-difference-between-intersect-overlap-in-arcgis-server

                    depends on 2 layers boundary match or not
                    county layer :  use "within" better than 'intersects'
                    zip code layer: use 'intersects' better than "within"

      */
                    const backgroundQuery_1 = {
                      geometry: first_feature_geometry,
                      spatialRelationship :   "within",  // "overlaps",   "within",  "intersects",      "contains", 
                      outFields: ['*'], // Attributes to return
                      returnGeometry: false
                    };
    
                    const backgroundQuery_2 = {
                      geometry: first_feature_geometry,
                      spatialRelationship : "intersects",
                      outFields: ['*'], // Attributes to return
                      returnGeometry: false
                    };

// sever-side query instead of visible-view query https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount

/*
      backgroundFeatureLayer.queryFeatures(backgroundQuery_1)
      .then((results) => {

                            console.log(" level 1 query result " + results.features.length)


                                      // for queryFeatures use this section
                                      if (results.features.length){
                                                   //level1 within results is > 0, means 1 polygon completely within 1 polygon(background)
                                                  //if 1 polygon overlapped by  2 or 3 or 4 connected polygon, such as 3 state connection, "within" result will be 0.  "intersect" result will be 2,3,4
                                                  $('#result_div').html('<span style="font-size:72px; background-color:green; color:white;"> &nbsp; Yes, eligible &nbsp; </span>')
                                      } else {
                                                    // results = 0
                                                    backgroundFeatureLayer.queryFeatures(backgroundQuery_2)
                                                    .then((results2) => {
                                                                          console.log(" level 2 query result " + results2.features.length)
                                                                            if (results2.features.length){
                                                                                                            // results2 is > 0
                                                                                                            if (results2.features.length == 1){
                                                                                                              // level1 within is 0,  level2 intersect is 1,  regarding as partial overlap
                                                                                                              $('#result_div').html('<span style="font-size:72px; background-color:yellow; color:black;"> &nbsp; Partial eligible &nbsp; </span>')
                                                                                                            } else {
                                                                                                                      //level1 within is 0,  level2 intersect is 2 or 3 ,  regarding as fully overlap,  
                                                                                                                      // 1 polygon overlapped by  2 or 3 or 4 connected polygon, such as 3 state connection, "within" result will be 0. "intersect" result will be 2,3,4
                                                                                                                      $('#result_div').html('<span style="font-size:72px; background-color:orange; color:white;"> &nbsp; Found feature partially or completely within boundary &nbsp; </span>')
                                                                                                            }
                                                                            } else {
                                                                                      // results2 = 0
                                                                                      $('#result_div').html('<span style="font-size:72px; background-color:red; color:white;"> &nbsp; No feature intersect with boundary &nbsp; </span>')
                                                                            }


                                                    }).catch((error) => {
                                                      console.log(' query feature failed ', error);
                                                              //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                              $('#loader_iconimage').hide()
                                                    }); 
                                      }//if
        
      }).catch((error) => {
                                      console.log(' query feature failed ', error);
                                                              //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                              $('#loader_iconimage').hide()
      });  
      */


    
      backgroundFeatureLayer.queryFeatureCount(backgroundQuery_1)
                                      .then((results) => {
                                                              console.log(' level 1 query result ', results); 
                                                              if (results){
                                                                            //level1 within results is > 0, means 1 polygon completely within 1 polygon(background)
                                                                            //if 1 polygon overlapped by  2 or 3 or 4 connected polygon, such as 3 state connection, "within" result will be 0.  "intersect" result will be 2,3,4
                                                                            $('#result_div').html('<span style="font-size:72px; background-color:green; color:white;"> &nbsp; Yes, eligible &nbsp; </span>')
                                                              } else {
                                                                          // results = 0
                                                                          backgroundFeatureLayer.queryFeatureCount(backgroundQuery_2)
                                                                          .then((results2) => {
                                                                                                    console.log(" level 2 query result " + results2)
                                                                                                    if (results2){
                                                                                                              // results2 is > 0
                                                                                                              if (results2 == 1){
                                                                                                                // level1 within is 0,  level2 intersect is 1,  regarding as partial overlap
                                                                                                                $('#result_div').html('<span style="font-size:72px; background-color:yellow; color:black;"> &nbsp; Partial eligible &nbsp; </span>')
                                                                                                              } else {
                                                                                                                        //level1 within is 0,  level2 intersect is 2 or 3 ,  regarding as fully overlap,  
                                                                                                                        // 1 polygon overlapped by  2 or 3 or 4 connected polygon, such as 3 state connection, "within" result will be 0. "intersect" result will be 2,3,4
                                                                                                                        $('#result_div').html('<span style="font-size:72px; background-color:orange; color:white;"> &nbsp; Found feature partially or completely within boundary &nbsp; </span>')
                                                                                                              }
                                                                                                              
                                                                                                    } else {
                                                                                                              // results2 = 0
                                                                                                              $('#result_div').html('<span style="font-size:72px; background-color:red; color:white;"> &nbsp; No feature intersect with boundary &nbsp; </span>')
                                                                                                    }
                                                                          }).catch((error) => {
                                                                            console.log(' query feature failed ', error);
                                                              //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                              $('#loader_iconimage').hide()
                                                                          }); 
                                                              }    

                                                              $('#loader_iconimage').hide()
                                      }).catch((error) => {
                                                              console.log(' query feature failed ', error);
                                                              //$('#result_div').html('<span style="font-size:12px; background-color:black; color:white;"> &nbsp; This ArcgisServer does not support CORS, cause spatial query failed ! Please ask this ArcgisServer administrator to enable CORS on their server !!! &nbsp; </span>')
                                                                        $('#result_div').html('')
                                                              $('#loader_iconimage').hide()
                                      });
}




    function remove_current_layer(thisLayerNeedToBeRemovedFromMap){

      if (thisLayerNeedToBeRemovedFromMap){
        // remove previous layer
        map.remove(thisLayerNeedToBeRemovedFromMap);
      }
    }


    function clear_level2(){

      $('.level2value_class').removeClass('selected_style')
      $('#level2value_tag_-1').addClass('selected_style')

      update_url_parameter('select_level2value', -1);
      $("#result_div").html('');

      remove_current_layer(congressdistrictFeatureLayer)
      
    }


    function clear_level1(){

      $('.level1value_class').removeClass('selected_style')
      $('#level1value_tag_-1').addClass('selected_style')

      update_url_parameter('select_level1value', -1);
      update_url_parameter('select_level2value', -1);

      $("#value_list2").html('');
      $("#result_div").html('');

      remove_current_layer(congressdistrictFeatureLayer)
    }



    async function build_level2_list(filterbykeyword, index){

      // mark level 1 selection
      current_selected_level_1 = index
      current_selected_level_1_tag_id = index
      $('.level1value_class').removeClass('selected_style')
      $('#level1value_tag_' + index).addClass('selected_style')
      update_url_parameter('select_level1value', current_selected_level_1);
      update_url_parameter('select_level2value', -1);


          console.log('build level 2 html by value', filterbykeyword, index, level2_field_name)

          console.log('level2_url  before add level 1 where filter', level2_url)
          var this_level2_url = level2_url + encodeURIComponent(filterbykeyword) + '\''
          console.log('level2_url after add level 1 where filter', this_level2_url)

          raw_distinct_level2_value = await ajax_getjson_common_custom_timeout(this_level2_url, 600000) // custom_timeout depends on hrsa county layer speed
          raw_distinct_level2_value = convert_to_json(raw_distinct_level2_value)
          console.log(' raw level 2 ', raw_distinct_level2_value)

          level2_value_array = []
          congressdistrict_fips_cd = {}
          congressdistrict_representative_name = {}
          congressdistrict_representative_url = {}
          var _level_2_value
          for (let j = 0; j < raw_distinct_level2_value.features.length; j++) {
            _level_2_value = raw_distinct_level2_value.features[j]['attributes'][level2_field_name]
            level2_value_array.push(_level_2_value)
            congressdistrict_fips_cd[_level_2_value] = raw_distinct_level2_value.features[j]['attributes'][congressdistrict_fips_cd_field_name]
            congressdistrict_representative_name[_level_2_value] = raw_distinct_level2_value.features[j]['attributes'][congressdistrict_representative_name_field_name]
            congressdistrict_representative_url[_level_2_value] = raw_distinct_level2_value.features[j]['attributes'][congressdistrict_representative_url_field_name]
          }
          level2_value_array.sort()
          console.log(' ordered level 2 array', level2_value_array)


          // ...   ... build html  ...  ...
          var value_html = '';
          value_html += '<div>';

          var _node_display_text 

          if (level2_value_array) {
            if ( level2_value_array.length > 0 ) {
                
                    value_html += '<ol>';

                    value_html += '<h2 style="display:inline">Congress District</h2>'
                    value_html += '</br>';
                    value_html +=   '<a  id="level2value_tag_-1" class="level2value_class" href="#">';
                    value_html +=       '<b>clear selection</b>'
                    value_html +=   '</a>';

                    value_html +=   '</br></br>';
                    
                    for (var r = 0; r < level2_value_array.length; r++) { 
                              // ======  ===== =======    distinct  ======  ===== ======= 
                              _node_display_text = level2_value_array[r]
                              _this_field_value = level2_value_array[r]
                  
                              value_html += '<li>' // css .ordered_list_number{ size font};
                              value_html +=   '<a id="level2value_tag_' + r + '" class="level2value_class" href="#" index="'  + r + '"   >';
                              value_html +=    _node_display_text  
                              value_html +=   '</a>';

                              value_html += '<br>'  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                              value_html += '<b>' +  congressdistrict_representative_name[_this_field_value]  + '</b>' 
                              value_html += '<br>'  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'  + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                              value_html += '<sup>'
                              value_html += '<a target="blank" href="' + congressdistrict_representative_url[_this_field_value]  + '">' +  congressdistrict_representative_url[_this_field_value]  + '</a>' 
                              value_html += '</sup>'

                              value_html += '</li>';


                              value_html += '<br>' 

                  }// for
                  value_html += '</ol>';
            } else {
            }//if  
          }//if
          value_html +='</div>'
          $('#value_list2').html(value_html);




          // registar event handler
          if (level2_value_array) {
            if ( level2_value_array.length > 0 ) {

              // clear selection
              $('#level2value_tag_-1').on('click', function(event){
                event.preventDefault();
                clear_level2()
              })

              for (var e = 0; e < level2_value_array.length; e++) { 

                var this_tag_id = '#' + 'level2value_tag_' + e.toString()
                $(this_tag_id).on('click', function(event){
                    event.preventDefault();
                    clicked_level2_value = $(event.target).text();
                    var tag_index = $(this).attr('index');
                    console.log('click -- level 2 --- ', clicked_level2_value, tag_index,  this);

                    work_on_value(clicked_level2_value, tag_index)
                })


              }// for

            } else {
            }//if  
          }//if




      
    }



   

    async function build_level1_list(){


      

              console.log(' level 1 url ', level1_url)
              raw_distinct_level1_value = await ajax_getjson_common_custom_timeout(level1_url, 600000) // custom_timeout depends on hrsa county layer speed
              raw_distinct_level1_value = convert_to_json(raw_distinct_level1_value)
              console.log(' raw level 1 ', raw_distinct_level1_value)

              level1_value_array = []
              for (let i = 0; i < raw_distinct_level1_value.features.length; i++) {
                level1_value_array.push(raw_distinct_level1_value.features[i]['attributes'][level1_field_name])
              }
              level1_value_array.sort()
              console.log(' ordered level 1 array', level1_value_array)



              // ...   ... build html  ...  ...
              var value_html = '';
              value_html += '<div>';

              var _node_display_text 

              if (level1_value_array) {
                if ( level1_value_array.length > 0 ) {
                    
                        value_html += '<ol>';

                        //value_html +=   '<a  id="level1value_tag_-1" class="level1value_class" href="#" onclick="clear_level1()">';

                        value_html += '<h2 style="display:inline">State</h2>'
                        value_html += '</br>'
                        value_html +=   '<a  id="level1value_tag_-1" class="level1value_class" href="#">';
                        value_html +=    '<b>clear selection</b>'
                        value_html +=   '</a>';
                        value_html +=   '</br></br>';
                        
                        for (var r = 0; r < level1_value_array.length; r++) { 
                                  // ======  ===== =======    distinct  ======  ===== ======= 
                                  _node_display_text = level1_value_array[r]
                                  _this_field_value = level1_value_array[r]
                      
                                  value_html += '<li>' // css .ordered_list_number{ size font};
                                  value_html +=   '<a id="level1value_tag_' + r + '" class="level1value_class" href="#" index="'  + r + '"   >';
                                  value_html +=    _node_display_text  
                                  value_html +=   '</a>';
                                  value_html += '</li>';
                      }// for
                      value_html += '</ol>';
                } else {
                }//if  
              }//if
              value_html +='</div>'
              $('#value_list').html(value_html);





              // registar event handler
              if (level1_value_array) {
                if ( level1_value_array.length > 0 ) {


                  // clear selection
                  $('#level1value_tag_-1').on('click', function(event){
                    event.preventDefault();
                    clear_level1()
                  })


                  for (let e = 0; e < level1_value_array.length; e++) { 
                         
                         var this_tag_id = '#' + 'level1value_tag_' + e.toString()
                         $(this_tag_id).on('click', function(event){
                             event.preventDefault();
                             clicked_level1_value = $(event.target).text();
                             var tag_index = $(this).attr('index');
                             console.log('click -- level 1 ---', clicked_level1_value,  tag_index , this);
                             
                             build_level2_list(clicked_level1_value, tag_index)
                         })


                  }// for


                } else {
                }//if  
              }//if


              // ...  end  ... build html  ...  ...     

    }




    async function pre_select(){
      current_selected_level_1 = param_select_level_1
      current_selected_level_2 = param_select_level_2

      console.log('pre_select  current_selected_level_1 ', current_selected_level_1)
      console.log('pre_select  current_selected_level_2 ', current_selected_level_2)

      if (current_selected_level_1){
        if (current_selected_level_1 == -1){
            // nothing to do
        } else {
                      var this_tag_id = '#' + 'level1value_tag_' + current_selected_level_1.toString()
                      clicked_level1_value = $(this_tag_id).text();
                      console.log('pre_select this_tag_id clicked_level1_value ',this_tag_id, clicked_level1_value)

                      await build_level2_list(clicked_level1_value, current_selected_level_1)

                      if (current_selected_level_2){
                              if (current_selected_level_2 == -1){
                                    // nothing to do
                              } else {
                                var this_tag_id2 = '#' + 'level2value_tag_' + current_selected_level_2.toString()
                                clicked_level2_value = $(this_tag_id2).text();
                                work_on_value(clicked_level2_value, current_selected_level_2)
                              }//if
                      }//if

        }//if
      }//if
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
            await get_feature_attributes(background_mapserver_url, layer_id)

            await build_level1_list()

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



                  })
                  .catch(function(err) {
                    // A rejected view indicates a fatal error making it unable to display.
                    // Use the errback function to handle when the view doesn't load properly
                    console.error("MapView rejected:", err);
                  });
          
         






}); // require, everything should be inside

