



// geocoding address esri example https://developers.arcgis.com/javascript/latest/search-for-an-address/



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
         

         /**/
              //   --- --- --- --- back to previous extent --- ------ ---
              /**/
              var extentStack = new Stack(); 
              /**/
              //   --- --- end --- --- back to previous extent --- --- --- ---  
              /**/

      /**/
      // ----- image or tile -----  ----- 
      /**/
          var background_type = 'image'  // 'data' tile  tile
          var backgroundMapImageLayer
          var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression

          var backgroundTileLayer

          var backgroundFeatureLayer  
          var backgroundFeatureLayer_layerView   // for filter feature layer

          
          

          var searchResults_1st_highlight_graphic
          var searchResults_highlight_graphic
          var searchResults_highlight_graphic_array = []

          var clicked_graphic
          
          
          var graphic_geometryType 
         
      /**/
      // ----- end  -----  image or tile -----  ----- 
      /**/
      
      


/**/
// - - - search by field - - - 
/**/

      var current_searchByField = 'allfield'  // default is all field
      
/**/
// ... end ...  - - - search by field  - - -
/**/






          /**/
          //  .. - .. - ... zoom 2 feature   ... - .. - .. 
          /**/
                var zoom2feature_noMoreThan = 20  // default
                var zoom2feature_zoomLevel = 18  // default
                var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
                //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level' 
                //var zoom2feature_yesNo = 'donot_zoom2feature' 
                
          /**/
          //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
          /**/








     
      var searchText = ''
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
                        

                   

/**/
// - - - filter in visible view oroverall - - - 
/**/

       

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
       

        // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
        // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
        backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
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

      }



/**/
// ... end ...  - - - filter in visible view oroverall  - - -
/**/




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




              


                
                // only for :single layer, map image layer, click   
                var graphic_object_indexAsKey = {}
                function init_feature_layer_view(){


                    //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                    //view.on("pointer-move", function(event){
                    // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
                    view.on("click", function(event){


                      // test, because feature layer did not add to map, only map image layer add to map, so hit test map image layer will return empty, only hit test feature layer will return something. 
                      view.hitTest(event).then(function(response){
                        if (response.results.length) {
                          let hitResult = response.results.filter(function (result) {
                                  return result.graphic.layer === backgroundFeatureLayer;
                          })
                          console.log(' test, because feature layer did not add to map, only map image layer add to map, so hit test map image layer will return empty, only hit test feature layer will return something.  ', hitResult )
                        }
                      })




                      // ... ... . only for map image layer and tile layer, click event  ... ... . 
                              console.log('view clicked, .. .. .. ',event,  event.mapPoint )

                              // remove previous both inactive and highlighted graphic and square guide box 
                              clear_clicked_graphic()
                              
                        if ((background_type == 'image') || (background_type == 'tile')){
                                      
                                      console.log('Map Image Layer or tile,  get clicked, .. .. .. ',event,  event.mapPoint )
                                      
                                      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures
                                      const queryParams = backgroundFeatureLayer.createQuery();
                            
                            

                                      //do not use point, because it works with polygon, but not work with line and point
                                      //queryParams.geometry = event.mapPoint;
                                      // . . . use buffer  . . .
                                            zoom_adjust_by =  Math.pow(2,(23 - view.zoom))
                                            buffer_tolerance_lat_degree = lat_tolerance_degree_base * zoom_adjust_by;
                                            buffer_tolerance_lng_degree = lng_tolerance_degree_base * zoom_adjust_by;
                                            console.log(' after zoom adjust, tolerance is ', view.zoom, zoom_adjust_by, buffer_tolerance_lat_degree, buffer_tolerance_lng_degree)

                                            SWlong = event.mapPoint.longitude - buffer_tolerance_lng_degree;
                                            SWlat  = event.mapPoint.latitude - buffer_tolerance_lat_degree;
                                            NElong = event.mapPoint.longitude + buffer_tolerance_lng_degree;
                                            NElat  = event.mapPoint.latitude + buffer_tolerance_lat_degree;
                                            console.log(' after zoom adjust, SWlong SWlat NElong NElat', SWlong, SWlat, NElong, NElat)

                                            square_graphic_southWest = [SWlong, SWlat]
                                            square_graphic_southEast = [NElong, SWlat]
                                            square_graphic_northEast = [NElong, NElat]
                                            square_graphic_northWest = [SWlong, NElat]
                                            console.log(' after zoom adjust, square_graphic_southWest  square_graphic_southEast square_graphic_northEast square_graphic_northWest ', square_graphic_southWest, square_graphic_southEast, square_graphic_northEast, square_graphic_northWest)

                                            square_graphic_geometry = {
                                              type: "polygon", // autocasts as new Polygon()
                                              rings: [square_graphic_southWest, square_graphic_southEast, square_graphic_northEast,square_graphic_northWest,square_graphic_southWest ]
                                            }

                                            square_graphic = new Graphic({
                                              geometry: square_graphic_geometry,
                                              symbol: square_graphic_symbol,
                                            });
                                            // square guide box graphic always at collection-array index as 0 
                                            view.graphics.add(square_graphic, 0);

                                            // not use, because it works with polygon, but line and point will not work well when zoom level is 10 or less
                                            //const ptBuff = geometryEngine.buffer(event.mapPoint, 300, "feet");
                                            //queryParams.geometry = ptBuff;

                                            queryParams.geometry = square_graphic_geometry

                                      //  . . . end . . . use buffer  . . .






                            backgroundFeatureLayer.queryFeatures(queryParams).then(function(results){

                                    // prints the array of result graphics to the console
                                    console.log('.. .. .. Map view clicked, .. .. .. query feature layer result .. .. .. could be more than 1 feature', results.features);

                                    //console.log('only show 1st feature', results.features[0]);
                                    if (results.features.length){

                                        graphic_object_indexAsKey = {}
                                        let ___graphic___ 
                                        var multiple_layer_properties_html = ''
                                        var __layer_name
                                        var ___properties

                                        current_queryFeatureResultsAsGraphic_length = results.features.length
                                        var shift_index_as_key

                                        for (let _index = 0; _index < results.features.length; _index++) {
                                        
                                          shift_index_as_key = _index + 1 // shift index by 1, 
                                          ___graphic___ = results.features[_index]

                                          graphic_object_indexAsKey[shift_index_as_key] = ___graphic___
                                          console.log(' ! * ! click ! * ! result ! * ! add graphic by shift-index-as-key ! * ! ', shift_index_as_key, ___graphic___)
                                              
                                          __layer_name = ''
                                          __layer_name += 'UniqueID(' + ___graphic___.uid + ')' + layerID_NAME_separator + 'OBJECTID ( ' + ___graphic___.attributes.OBJECTID + ' )'
                                          __layer_name += layerID_NAME_separator + ___graphic___.layer.title + '(layerID:' + ___graphic___.layer.layerId + ')'
                                          
                                          ___properties = ___graphic___.attributes


                                          
                                          // add all graphic to map, but only highlight last graphic (default yellow), others as inactive symbol color (thin black line, gray tint)
                                          graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                          // not use, because by default, first added graphic is always at bottom, will be blocked by later other inactive graphic
                                          //if (_index == 0){  
                                          // last added graphic is always on top, will not be blocked by other previously added inactive graphic. So highlight last graphic is the solution, don't forget to reverse the order of info-window, 1 at bottom, max at top
                                          if (_index == results.features.length - 1){  
                                                        // add last(index is length minus 1) graphic as selected (default yellow)
                                                            if (graphic_geometryType.includes('polygon')){
                                                              ___graphic___.symbol = polygon_symbol
                                                            } else if (graphic_geometryType.includes('line')){
                                                              ___graphic___.symbol = polyline_symbol
                                                            } else if (graphic_geometryType.includes('point')){  
                                                              ___graphic___.symbol = point_symbol
                                                            } //if 
                                                            clicked_graphic_index = shift_index_as_key
                                          } else {
                                                  // add other index as inactive (like google default geojson color)
                                                    if (graphic_geometryType.includes('polygon')){
                                                      ___graphic___.symbol = inactive_polygon_symbol
                                                    } else if (graphic_geometryType.includes('line')){
                                                      ___graphic___.symbol = inactive_polyline_symbol
                                                    } else if (graphic_geometryType.includes('point')){  
                                                      ___graphic___.symbol = inactive_point_symbol
                                                    } //if 
                                          }//if

                                          view.graphics.add(___graphic___, shift_index_as_key);
                                          // . . end . . add all graphic to map,


                                                
                                          multiple_layer_properties_html += '</br>'

                                          // build html only, reverse order, 1 should at bottom, last-index should be at top, because I highlight last-index graphic
                                          var _html_floor = ''
                                          //if (_index == 0){
                                          if (_index == results.features.length - 1){  
                                            _html_floor += '<fieldset>' 
                                            _html_floor +=     '<legend>' + shift_index_as_key +  ' : ' + __layer_name +'</legend>'
                                            _html_floor +=     '<div class="flex-row selected_highlighted_style attribute_field_set_style"   id="attribute_field_set_' + shift_index_as_key +  '"   >'  // if 0, means need start a new info window
                                            _html_floor +=           json_flex_tip_viewer(___properties)
                                            _html_floor +=     '<div>'
                                            _html_floor += '</fieldset>'
                                          } else {

                                                    _html_floor += '<fieldset>'
                                                    _html_floor +=     '<legend>' + shift_index_as_key +  ' : ' + __layer_name +'</legend>'
                                                    _html_floor +=     '<div class="flex-row attribute_field_set_style"   id="attribute_field_set_' + shift_index_as_key +  '"   >' // not 0, means need append to existing info window
                                                    _html_floor +=         json_flex_tip_viewer(___properties)
                                                    _html_floor +=     '<div>'
                                                    _html_floor += '</fieldset>'

                                          }//if
                                          
                                          // reverse order, 1 at bottom, max at top, since I highlight last-index graphic, it added lastly, will not block by previously added inactive graphic
                                          multiple_layer_properties_html = _html_floor + multiple_layer_properties_html
                                          //  . .  end    . .  build html only

                                        }// for index
                                        
                                        



                                        $('#info_outline').show();
                                        $('#info-window-div').html(multiple_layer_properties_html)


                                        // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                                        for (let _index = 0; _index < results.features.length; _index++) {

                                          shift_index_as_key = _index + 1 // shift index by 1, 


                                          console.log('add event to element id :  attribute_field_set_', shift_index_as_key)
                                          $("#attribute_field_set_" + shift_index_as_key ).on('click', function(){
                                                      var element_id = $(this).attr('id');
                                                      var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                                      console.log("you click  index  :   ",  _select_highlight_index)
                
                                                      $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                                      $(this).addClass('selected_highlighted_style')

                                                      // change previous highlight selected graphic to inactive 
                                                      ___graphic___ = view.graphics.getItemAt(clicked_graphic_index);
                                                      graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                                      if (graphic_geometryType.includes('polygon')){
                                                        ___graphic___.symbol = inactive_polygon_symbol
                                                      } else if (graphic_geometryType.includes('line')){
                                                        ___graphic___.symbol = inactive_polyline_symbol
                                                      } else if (graphic_geometryType.includes('point')){  
                                                        ___graphic___.symbol = inactive_point_symbol
                                                      } 

                                                      // then change selected inactive graphic to highlight
                                                      ___graphic___ = view.graphics.getItemAt(_select_highlight_index);
                                                      graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                                      if (graphic_geometryType.includes('polygon')){
                                                        ___graphic___.symbol = polygon_symbol
                                                      } else if (graphic_geometryType.includes('line')){
                                                        ___graphic___.symbol = polyline_symbol
                                                      } else if (graphic_geometryType.includes('point')){  
                                                        ___graphic___.symbol = point_symbol
                                                      } 


                                                      clicked_graphic_index = _select_highlight_index
                                          });

                                        }//for

                                        
                                    
                                    } 

                          });// back ground
                        }

                      // ... end ... . only for map image layer and tile layer, click event  ... ... . 



                    }); // view . on

                    // --  end  --- highlight feature on pointer-move

                }// function



               // remove previous both inactive and highlighted graphic and square guide box 
               function clear_clicked_graphic(){

                    console.log('remove all previous inactive, highlighted, square guide box, (they all are graphic), remove-all-function works')

                    view.graphics.removeAll()

                    empty_info_outline_Tab()
               }



/* .... ... ... external function ... ... ... */       





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



      
      function add_search_results_to_panel(___feature_array){

        show_or_hide_search_related_component('show')

              // =========== show json on search tab result panel ===========
              var   ___feature_array_properties_only=[]
              document.getElementById('badge_on_searchTab').innerHTML =  '<sub>'+ 'Total' + '</sub>' +  '<h1 style="display:inline;"><b><mark>' + ___feature_array.length + '</mark></b></h1>'  +  '<sub>'+ 'found' + '</sub>' 
              
              for (var i = 0; i < ___feature_array.length; i++){
                      ___feature_array_properties_only.push(___feature_array[i].attributes) 
              } 
              
              search_result_feature_array_global_var =  ___feature_array;

              console.log(' ___feature_array_properties_only', ___feature_array_properties_only)
              console.log(' search_result_feature_array_global_var', search_result_feature_array_global_var)

              show_search_Tab(___feature_array_properties_only, searchText)



      }

     







      function search_layer_now(){

              // search logic here
                       // this function will be executed on click of X (clear button)

                       
                       searchText = $('#search_text_esri').val().trim().toLowerCase();
                       console.log('search ', searchText)
                       update_url_parameter('search', searchText);


                       // reset before a new search
                       $('#jsoneditor_search').hide();
                       editor_search.set({});
                       document.getElementById('badge_on_searchTab').innerHTML =  '';
                       
                       map.remove(backgroundFeatureLayer)
                       map.remove(backgroundMapImageLayer)
                       map.remove(backgroundTileLayer)


                       if (searchText){

                       

                                              ___where_clause_operator = 'like'   //event.data.clause_operator
                                              console.log(' query?where clause operator : ', ___where_clause_operator)
  
                                             


                                /**/
                                // - - - search by field - - - 
                                /**/
                                     if (current_searchByField == 'allfield'){
                                            _where_condition = build_where_condition_single_keyword(searchText, ___where_clause_operator)
                                     } else {
                                            _where_condition = build_where_condition_by_field(searchText, ___where_clause_operator, current_searchByField)
                                     }


                                /**/
                                // ... end ...  - - - search by field  - - -
                                /**/

 
                                              
                                              

                                              // fake where
                                              //_where_condition = 'APN = 677270051'
                                              console.log('feature-server only -> query?where ->  ', _where_condition)  


                             

                                                                          if (background_type == 'image'){
                                                                                                                  console.log('filter overall map, map image layer, definition Expression = ', _where_condition)
                                                                                                                  // image layer, definition expressin , https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-definitionexpression/
                                                                                                                  mapimagerlayer_sub_layer.definitionExpression = _where_condition
                                                                                                                  map.add(backgroundMapImageLayer)
    
                                                                                                                  // only for zoom to search result extent, do not actually add feature layer to map.
                                                                                                                  backgroundFeatureLayer.definitionExpression = _where_condition

                                                                          } else if (background_type == 'tile'){
                                                                                                                  map.add(backgroundTileLayer)
                                                                          } else if (background_type == 'data'){  
                                                                                                                    console.log('filter overall map, feature layer, definition Expression = ', _where_condition)
                                                                                                                    
                                                                                                                    //createFeatureLayer() // not use, because I want set definition expression on old single 1 backgroundfeaturelayer object
                                                                                                                    map.add(backgroundFeatureLayer)
                                                                                                                    backgroundFeatureLayer.definitionExpression = _where_condition
                                                                          }


                                                                          backgroundFeatureLayer.queryFeatures().then(function(results){
                                                                            // prints the array of result graphics to the console
                                                                            console.log('filter overall whole layer query results :  ', results.features)
                                                                            

                                                                            // convert from raw graphic to highlighted graphic
                                                                            var raw_search_results_graphic_array = results.features
                                                                            var higlighted_search_results_graphic_array = []
                                                                            var geometry_type = raw_search_results_graphic_array[0].geometry.type
                                                                            console.log('1st feature in search result array, geometry type : ', geometry_type)
                                                                            higlighted_search_results_graphic_array = raw_search_results_graphic_array.map((feature) => {
                                                                              console.log(' each feature in search result array : ', feature)

                                                                              var graphic_as_highlight

                                                                              if (geometry_type.includes('polygon')){
                                                                                 // polygon highlight graphic only
                                                                                 graphic_as_highlight = new Graphic({
                                                                                  geometry:feature.geometry,
                                                                                  symbol: highlight_polygon_symbol,                   
                                                                                  attributes: feature.attributes
                                                                                });

                                                                                // Return a Search Result
                                                                                // raw search results is just array of feature, must use this map function to re-format as { extent, feature(graphic), name(label)} 
                                                                                return graphic_as_highlight;
                                                                              }// if polygon    



                                                                              if (geometry_type.includes('point')){

                                                                                highlight_point_symbol.size = _classfiy_pointRadius

                                                                                 //  point highlight graphic only
                                                                                 graphic_as_highlight = new Graphic({
                                                                                  geometry:feature.geometry,
                                                                                  symbol: highlight_point_symbol,
                                                                                  attributes: feature.attributes
                                                                                });
                                                                                // Optionally, you can provide an extent for a point result, so the view can zoom to it
                                                                                /*var buffer = geometryEngine.geodesicBuffer(
                                                                                  graphic_as_highlight.geometry,
                                                                                  100,
                                                                                  "meters"
                                                                                );*/
                                                                                console.log(' return highlighted point graphic : ', highlight_point_symbol, graphic_as_highlight)
                                                                                // Return a Search Result
                                                                                // raw search results is just array of feature, must use this map function to re-format as { extent, feature(graphic), name(label)} 
                                                                                return graphic_as_highlight;
                                                                              }//if point


                                                                              if (geometry_type.includes('line')){
                                                                                 // line highlight graphic only
                                                                                 graphic_as_highlight = new Graphic({
                                                                                  geometry:feature.geometry,
                                                                                  symbol: highlight_polyline_symbol,                   
                                                                                  attributes: feature.attributes
                                                                                });

                                                                                // Return a Search Result
                                                                                // raw search results is just array of feature, must use this map function to re-format as { extent, feature(graphic), name(label)} 
                                                                                return graphic_as_highlight;
                                                                              }// if line  
                                                                            }); // map 

                                                                            console.log('raw_search_results_graphic_array', raw_search_results_graphic_array)
                                                                            console.log('higlighted_search_results_graphic_array', higlighted_search_results_graphic_array)

                                                                            // remove all previous highlighted graphic
                                                                            if (searchResults_highlight_graphic_array.length > 0){
                                                                              for (let j = 0; j < searchResults_highlight_graphic_array.length; j++) {
                                                                                  if (searchResults_highlight_graphic_array[j]){
                                                                                    view.graphics.remove(searchResults_highlight_graphic_array[j])
                                                                                  }
                                                                              }//for
                                                                            }//if

                                                                            // get 1st result is only for zoom to first result, user can click popup window's other result to zoom to other results
                                                                            searchResults_1st_highlight_graphic = higlighted_search_results_graphic_array[0]

                                                                            console.log('get 1st result is only for zoom to first result, user can click popup window other result to zoom to other results : ', searchResults_1st_highlight_graphic)
                                                                            //view.graphics.add(searchResults_1st_highlight_graphic)


                                                                            // highlight all results, but only zoom to first results, 
                                                                            var searchResults_array = higlighted_search_results_graphic_array
                                                                            searchResults_highlight_graphic_array = []
                                                                            for (let i = 0; i < searchResults_array.length; i++) {
                                                                              searchResults_highlight_graphic = searchResults_array[i]
                                                                              searchResults_highlight_graphic_array.push(searchResults_highlight_graphic)
                                                                              view.graphics.add(searchResults_highlight_graphic)
                                                                            }//for



                                                                            // action = false (no shift key hold, event.shiftkey = false) 
                                                                            if (zoom2feature_yesNo == 'donot_zoom2feature'){

                                                                              // nothing to do, do not zoom to anywhere, just keep still

                                                                            } else if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                                              view.goTo(searchResults_1st_highlight_graphic);
                                                                                              if (searchResults_1st_highlight_graphic.geometry.type == 'point'){
                                                                                                view.zoom = zoom2feature_noMoreThan
                                                                                              }

                                                                            } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                                                            view.goTo(searchResults_1st_highlight_graphic); 
                                                                                            view.zoom = zoom2feature_zoomLevel

                                                                            } 


                                                                            



                                                                            /**/
                                                                              //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                                              /**/
                                                                                    // =========== show json on search tab result panel ===========
                                                                                    var   searchResults_array_properties_only=[]
                                                                                    document.getElementById('badge_on_searchTab').innerHTML =  '<sub>'+ 'Total' + '</sub>' +  '<h1 style="display:inline;"><b><mark>' + searchResults_array.length + '</mark></b></h1>'  +  '<sub>'+ 'found' + '</sub>' 
                                                                                    
                                                                                    for (var i = 0; i < searchResults_array.length; i++){
                                                                                      searchResults_array_properties_only.push(searchResults_array[i].attributes) 
                                                                                    } 
                                                                                    
                                                                                   
                                                                                    search_result_feature_array_global_var =  searchResults_highlight_graphic_array;

                                                                                    console.log(' searchResults_array_properties_only', searchResults_array_properties_only)
                                                                                    console.log(' search_result_feature_array_global_var', search_result_feature_array_global_var)

                                                                                    show_search_Tab(searchResults_array_properties_only, searchText)
                                                                                    // ==== end ======= show json on search tab result panel ===========
                                                                              /**/
                                                                              //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                                              /**/
                                                                              $('#jsoneditor_search').show();

                                                                          });


                                                                          /* not use, because already zoom to 1st result
                                                                          //after search result loaded, must zoom fly to search result extent
                                                                          backgroundFeatureLayer.queryExtent().then(function(results){
                                                                            console.log('go to the extent of the results satisfying the query :  ', results)
                                                                            // go to the extent of the results satisfying the query
                                                                            view.goTo(results.extent);
                                                                          });
                                                                          */



                                                                        } else {
                        
                                                                          clear_search_result()
                                                  
                                                                         }
                                                  
                                                  
                                                  
                                                        }


      var ___where_clause_operator = ''
      var _where_condition = ''
      function init_search(){



        // ----------- esri searh  -----------   


        /**/
        // first time init search key word
        if (param_search){ searchText =  param_search;}
        $("#search_text_esri").val(searchText)

        show_or_hide_search_related_component('hide')

        

           
                  // do no trigger real search, but keep here only for user press key up, to update url search param, so when refresh do not need to type search content again
                  $("#search_text_esri").on('keyup',function(){
                                                                $('#result_div').html('')
                                                                searchText = $('#search_text_esri').val().trim();
                                                                console.log(' you type xxx in search bar', searchText)
                                                                update_url_parameter('search', searchText);
                  }); 
          


              // only for click enter key and click X clear button
              $("#search_text_esri").on('search',search_layer_now); 


              // search button clicked. 
              $('#search_button_fuzzy').on('click', search_layer_now);
              // show all button clicked. 
              $('#show_all').on('click', clear_search_result);



        //  -----------  end ----------- esri searh  ----------- 
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
            empty_info_outline_Tab()
        });


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




                  



            
          }


      /**/
      // --- --- ... ----  jsoneditor related   --- --- ... ----
      /**/
      
          
      

      




    
      function show_info_outline_Tab(___properties){
        $('#info_outline').show();
        
                  
                  
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
        console.log('current_selected_field_value', current_selected_field_value)
        highlight_keywords_markjs(current_selected_field_value)
      }
      
      
      function empty_info_outline_Tab(){
        $('#info_outline').hide();
$('#info-window-div').html("")
      }




                        

            function show_search_Tab(__json_content, ___highlight_keywords){

              
                  
              $('#jsoneditor_search').show();
              editor_search.set(__json_content);
              editor_search.expandAll();
              editor_search.setName('search result')

              // ************ jsoneditor highlight keywords  ************
                  // for example key words have multiple words:   auto broker
                  // must highlight each words
                  var __keywords_array = ___highlight_keywords.split(" ");

                  for (var k = 0; k < __keywords_array.length; k++) {
                    
                        var _each_keyword_item = __keywords_array[k].trim()
                        

                        // highlight search keywords by 
                          //https://github.com/josdejong/jsoneditor/issues/364
                          //If in any other mode, like 'View' or 'Tree'
                        // editor.search(__highlight_keywords____)

                          //When using 'code' mode, 
                          //editor.aceEditor.find(__highlight_keywords____);
                        editor_search.search(_each_keyword_item)
                  }// for
                // ************ end ********** jsoneditor highlight keywords  ************ 


                
                                                    // warning:  ESRI do not support 2 keyword cross different field. 
                                                              // double highlight system (2)
                                                              // always show highlighted node via css class
                                                              // https://github.com/josdejong/jsoneditor/issues/1038
                                                              editor_search.refresh() 
            }





            function empty_search_Tab(){

                  $('#search_text_esri').val('');
                  update_url_parameter('search', '');
                  $('#jsoneditor_search').hide();
                  editor_search.set({});
                  document.getElementById('badge_on_searchTab').innerHTML =  '';
                  show_or_hide_search_related_component('hide')



                      
                       map.remove(backgroundFeatureLayer)
                       map.remove(backgroundMapImageLayer)
                       map.remove(backgroundTileLayer)


                       if (background_type == 'image'){
                                                              
                                                              mapimagerlayer_sub_layer.definitionExpression = ''
                                                              map.add(backgroundMapImageLayer)

                                                              // only for zoom to search result extent, do not actually add feature layer to map.
                                                              backgroundFeatureLayer.definitionExpression = ''
                       } else if (background_type == 'tile'){
                        map.add(backgroundTileLayer)
                      } else if (background_type == 'data'){  
                                                                //add original feature layer
                                                                //createFeatureLayer() // not use, because I want set definition expression on old single 1 backgroundfeaturelayer object 
                                                                map.add(backgroundFeatureLayer)
                                                                backgroundFeatureLayer.definitionExpression = ''  //null
                      }
            }


            function show_or_hide_search_related_component(_show_or_hide){
                          if (_show_or_hide == 'hide'){
                                        $('#badge_on_searchTab').hide();
                                        $('#jsoneditor_search').hide();
                          } else {
                              $('#badge_on_searchTab').show();
                              $('#jsoneditor_search').show();
                          }
            }


            function clear_search_result(){


              $('#search_layers_content').val('')
              document.getElementById('badge_on_searchTab').innerHTML =  '';
             

              empty_search_Tab()

              show_or_hide_search_related_component('hide')

              // remove last time pin point
              view.graphics.remove(pin_pointGraphic)

              
              // remove all previous highlighted graphic
              if (searchResults_highlight_graphic_array.length > 0){
                for (let j = 0; j < searchResults_highlight_graphic_array.length; j++) {
                    if (searchResults_highlight_graphic_array[j]){
                      view.graphics.remove(searchResults_highlight_graphic_array[j])
                    }
                }//for
              }//if




              //update_url_parameter('search_data', '');

            }
            
      /**/   
      // --- --- ... ----  jsoneditor related   --- --- ... ----
      /**/




                                     
                                          
                            


/**/
// - - - search by field - - - 
/**/
          async function init_search_by_field(){

            if (param_searchByField){
              current_searchByField = param_searchByField
            }
  
            

            if (_featurelayerJSON.hasOwnProperty('eometryType')){
                  current_geometryType = _featurelayerJSON.geometryType
            } else {
                  current_geometryType = ''
            }
         



        // ---------- build search by field as field ---- radio ---- event -----------
        /**/
                       // warning:  .fields can be null, if layer is only raster image  
                       if (_featurelayerJSON.hasOwnProperty('fields')){

                                     var _fields_array = _featurelayerJSON.fields

                                     var _fieldList_html = '<fieldset class="eachLabelAsClass">'
                                     _fieldList_html +=       '<legend>'
                                     _fieldList_html +=           '<b>Search on field</b>'
                                     _fieldList_html +=       '</legend>'

                                    



                                     /**/
                                     // ##  'all field' radio ## 
                                     _fieldList_html +=    '<label>'
                                     if (current_searchByField == 'allfield') {
                                               // checked
                                               _fieldList_html +=       '<input type="radio" value="' + 'allfield' + '" name="searchByField_radio" id="' + 'allfield' + '" checked/>'
                                     } else {
                                               // un-checked
                                               _fieldList_html +=       '<input type="radio" value="' + 'allfield' + '" name="searchByField_radio" id="' + 'allfield' + '"/>'
                                     }
                                     _fieldList_html +=       '<span class="fieldName white-font-black-background">' + '&nbsp;' + 'All Fields' + '&nbsp;'  + '</span>'                                                      
                                     _fieldList_html +=     '</label>'
                                     _fieldList_html +=   '<br>'
                                     // ## end ##  'no label' radio ## 
                                     /**/
                                      



                                     // other field radio 
                                     for (var i = 0; i < _fields_array.length; i++) {
                                                                 
                                                   var ____fieldDisplayName = _fields_array[i].alias             
                                           var ____fieldType = _fields_array[i].type
                                                   var ____fieldName = _fields_array[i].name
                                                 
                                                 // _fieldList_html +=  '<p>'
                                                   _fieldList_html +=    '<label>'

                                                   if (current_searchByField == ____fieldName) {
                                                           // checked
                                                           _fieldList_html +=       '<input type="radio" value="' + ____fieldName + '" name="searchByField_radio" id="' + ____fieldName + '"  checked />'
                                                   } else {
                                                           // un-checked
                                                           _fieldList_html +=       '<input type="radio" value="' + ____fieldName + '" name="searchByField_radio" id="' + ____fieldName + '"/>'
                                                   }
                                                   
                                                   _fieldList_html +=       '<span class="fieldName">'  + '&nbsp;' + ____fieldName  + '</span>'
                                                   _fieldList_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'
                                                   _fieldList_html +=     '</label>'
                                                 //  _fieldList_html +=   '</p>'
                                                 _fieldList_html +=   '<br>'
                                                   


                                     }//for   
                                     
                                     
                                     _fieldList_html +=   '</fieldset>'
                                     var _fieldList_div_tag = document.getElementById("search-by-field-list")
                                     _fieldList_div_tag.innerHTML = _fieldList_html

                          //  -----------  end ---------- build search by field as field ---- radio ---- event -----------
                          /**/

                                     // only for existing static html tag "search-by-field-list", if html tag is dynamic added, do not use this method
                                     $('input[type=radio][name=searchByField_radio]').on('change', function() {
                                             current_searchByField = $(this).val()
                                             update_url_parameter('searchByField', current_searchByField)
                                     });

                               
                         }//if  


          }






/**/
// ... end ...  - - - search by field  - - -
/**/



                    


 				  /**/
                  //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                  /**/
                  


                  var pin_point
                  var pin_markerSymbol
                  var pin_pointGraphic
                  function create_marker_at_lat_lng(_lat, _lng){

                    // remove last time pin point
                    view.graphics.remove(pin_pointGraphic)


                    // sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=intro-graphics


                    pin_point = {
                      type: "point", // autocasts as new Point()
                      longitude: _lng,
                      latitude: _lat
                    };

                  // Create a symbol for drawing the point
                  pin_markerSymbol = {
                        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        color: [226, 119, 40, 0.6],
                        size: '48px',
                        outline: {
                          // autocasts as new SimpleLineSymbol()
                          color: [255, 255, 255, 0.8],
                          width: 2
                        }
                      };

                      // Create a graphic and add the geometry and symbol to it
                      pin_pointGraphic = new Graphic({
                        geometry: pin_point,
                        symbol: pin_markerSymbol
                      });

                      view.graphics.add(pin_pointGraphic)

                  }


                  function zoom_to_feature(esri_highlighted_graphic,  _searchResult_serial_number, _action){

                    console.log('zoom to feature ::::: event :::::', esri_highlighted_graphic, _searchResult_serial_number, _action)

                    
                    // find center lat lng
                    if (esri_highlighted_graphic.geometry.type == 'point'){
                            _center_lat = esri_highlighted_graphic.geometry.latitude
                            _center_long = esri_highlighted_graphic.geometry.longitude
                    } else {
                      // polygon and line center, lat lng
                      _center_lat  = esri_highlighted_graphic.geometry.centroid.latitude
                      _center_long = esri_highlighted_graphic.geometry.centroid.longitude
                    }

                    console.log('zoom to feature ::::: _center_lat ::: _center_long ::', _center_lat, _center_long)

                    // action = false (no shift key hold, event.shiftkey = false) 
                    if ((_action) || (zoom2feature_yesNo == 'donot_zoom2feature')){

                      // nothing to do, do not zoom to anywhere, just keep still

                    } else if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                      view.goTo(esri_highlighted_graphic); 
                                      if (esri_highlighted_graphic.geometry.type == 'point'){
                                        view.zoom = zoom2feature_noMoreThan
                                      }

                    } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                    view.goTo(esri_highlighted_graphic); 
                                    view.zoom = zoom2feature_zoomLevel

                    } 



                    // add marker graphic pin to show location
                    create_marker_at_lat_lng(_center_lat, _center_long)

                  
                  }



              /**/
              // --- --- ... ----  jsoneditor related   --- --- ... ---- special for zoom2feature  --- --- ... ---- 
              /**/

                    // search result user mouse over a node, should fly to lat lng 
                      function onEvent_for_zoom2feature(node, event) {

                      console.log(' on  event: node, event ---->', node, event) 
                      console.log(' search_result_feature_array_global_var ---->', search_result_feature_array_global_var) 


                      /*
                          "node" object never is  undefined/null, but when user hover title bar, will cause error, because  "node" is  {field: undefined, path: []}

                          field: undefined means, path will be null, will cause error, must fix by node.field is not undefined

                          "event" object never is undefined/null, so ignore 

                      */     

                      if (node.field) {



                                    var __lock_map = event.shiftKey;
                                    var __serial_no = node.path[0]
                                    var _mouse_over_feature = search_result_feature_array_global_var[__serial_no]
                                    console.log(' mouse over feature , serial number, graphic :',__serial_no,  _mouse_over_feature)

                                    /**/
                                    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                    /**/
                                        if (_mouse_over_feature){
                                          console.log('_mouse_over_feature, __serial_no, __lock_map', _mouse_over_feature, __serial_no, __lock_map)
                                          zoom_to_feature(_mouse_over_feature, __serial_no, __lock_map )
                                        }
                                    /**/
                                    //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                    /**/                                                                   
                                  
                                                                                                        
                                  

                                            // !!!!!!!!!!! highlight hovered node  !!!!!!!!!!!

                                                      /*
                                                        {
                                                            field: 'ZoneName', 
                                                            path: [ 1,  "ZoneName"  ]
                                                        } 
                                                                                    
                                                      // How to highlight specific node when mouse hover that node ,    https://github.com/josdejong/jsoneditor/issues/1383
                                                      // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#jsoneditorsetselectionstart-end  

                                                      JSONEditor.setSelection(start, end)
                                                                                            Set selection for a range of nodes, Only applicable for mode 'tree'.

                                                                                            If no parameters sent - the current selection will be removed, if exists.
                                                                                            For single node selecion send only the start parameter.
                                                                                            If the nodes are not from the same level the first common parent will be selected
                                                                                            Parameters:
                                                                                            {path: Array.<String>} start
                                                                                            Path for the start node
                                                                                            {path: Array.<String>} end
                                                                                            Path for the end node
                                                                                        
                                                      // Set selection for a range of nodes, Only applicable for mode 'tree'.
                                                      */
                                                    
                                                      editor_search.setSelection() // If no parameters sent - the current selection will be removed, if exists.  will remove all previous selection
                                                      
                                                      // not use, highlight only single property,   node = path: [ 1,  "ZoneName"  ]
                                                      //editor_search.setSelection(node)  // For single node selecion send only the start parameter.

                                                      // highlight whole node, not single property
                                                      var _highlight_whole_node = {path:[__serial_no]}
                                                      editor_search.setSelection(_highlight_whole_node)


                                            // !!!!!!!!!!!    end    !!!!!!!!!!!    highlight hovered node  !!!!!!!!!!!




                      } // if 

                      } // function

                      function onSelectionChange_for_zoom2feature(start, end) {
                                                                                              
                        console.log(' on selection change event   start, end :  ++++++++ ', start, end) 


                      }

                      function init_json_viewer_for_zoom2feature(){

                        // inside nested function 
                        function onClassName_FieldName_for_zoom2feature({ path, field, value }) {

                        // warning:  must define  current_classifyFieldName = current_quantityFieldName, current_field name, etc 
                        //---- only for json2tree  --- --- ... ----
                                  
                        // console.log("  ######  onClassName  for_quantityColor  ######   field  ==  current_classifyFieldName  ######   ",  field , ' - ', current_classifyFieldName)
                          // only for quantity color, highlight by field name

                          if (field && current_classifyFieldName){   // must check undefined error
                                  /* warning: field is actually "field (alias)",  but current quantityFieldName is only "field", they never equal,do not use "==", instead, should use ".includes" */
                                  //if (field == current_classifyFieldName){
                                  if (field.includes(current_classifyFieldName)){
                                                        // add class to highlight that node
                                                        //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                        // found match, mark this node by add a new css class 
                                                        console.log(" . . . .    . . . .  return  highlight_row_by_fieldName  . . . .  . . . . ",  field , ' . . .  ', current_classifyFieldName)
                                                        return 'highlight_row_by_fieldName'   // css must create class named "highlight_row_by_fieldName"
                                  } else {
                                                        //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                        return undefined
                                  }

                          }
                        }

                        // inside nested function 
                        function onClassName_for_zoom2feature({ path, field, value }) {
                                //  console.log("  ######  onClassName   ######   call back   ######  path, field, value   ######   ", path, field, value )
                                // only for dataset1, non-classified version, search key word is :     _search_data_content = "dog banning"
                                var node_is_match = false;
                                
                                if (typeof value === 'string') {
                                              var value_lowercase = value.toLowerCase()
                                              for (var i = 0; i < _search_keyword_data_array.length; i++) {

                                                      var _search_keyword_item_lowercase = _search_keyword_data_array[i].toLowerCase()
                                                      // console.log('  $$$$$$$$$ before match $$$$$$$$$$$$  ', value_lowercase, _search_data_array, _search_data_array[i], value_lowercase.indexOf(_search_data_array[i]) )
                                                        if ((_search_keyword_item_lowercase) && ( value_lowercase.indexOf(_search_keyword_item_lowercase) > -1 )) {
                                                            //console.log('  $$$$$$$$$ found match key word $$$$$$$ add Class $$$$$$$$$$$$  ' )
                                                              node_is_match = true;
                                                              break;
                                                        } // if
                                              } // for
                                } // if 

                              if (node_is_match){
                                                    // add class to highlight that node
                                                    //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                    // found match, mark this node by add a new css class 
                                                    return 'different_element'   // css must create class named "different_element"
                              } else {
                                                    //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                    return undefined
                              }
                        }





                        // ========== create the Jsoneditor ===============
                        container_info_outline = document.getElementById("jsoneditor_info_outline");
                        container_list = document.getElementById("jsoneditor_list");
                        // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
          
                        // options = {sortObjectKeys:true};   // alphabetically sort object key, default is false
                        options_info_outline = {                          
                                      modes:['view', 'tree', 'preview'],
                                      mainMenuBar  : false,    // remove main menu bar
                                      navigationBar : false,   // remove navigation bar
                                      "search": false,        // remove search box , default is true

                                      onClassName: onClassName_FieldName_for_zoom2feature, //   --- --- --- --- quantity color --- --- --- ---
              
                        };
                        options_list = {                          
                                      modes:['view', 'tree', 'preview'],
                                      mainMenuBar  : false,    // remove main menu bar
                                      navigationBar : false,   // remove navigation bar
                                      "search": false,          // remove search box , default is true

                                      onClassName: onClassName_FieldName_for_zoom2feature, //   --- --- --- --- quantity color --- --- --- ---
              
                        };
                        editor_info_outline = new JSONEditor(container_info_outline, options_info_outline);
                        editor_list = new JSONEditor(container_list, options_list);
          

                        options_for_search_only = {
                                      modes:['view', 'tree', 'preview'],
                                      mainMenuBar  :  true,    // keep main menu bar
                                      navigationBar :     true,   // keep navigation bar
                                      "search": false,         // do not use search box , default is true

                                      /*
                                          only at search result, to speed up by only show 10 results.
                                          maxVisibleChilds:  Number of children allowed for a given node before the "show more / show all" message appears (in 'tree', 'view', or 'form' modes). 100 by default.
                                          https://github.com/josdejong/jsoneditor/blob/develop/docs/api.md
                                      */ 
                                          maxVisibleChilds:10,
          
                                      onSelectionChange : onSelectionChange_for_zoom2feature,
                                      onEvent: onEvent_for_zoom2feature,

                                      // https://github.com/josdejong/jsoneditor/blob/develop/examples/20_custom_css_style_for_nodes.html
                                      // https://github.com/josdejong/jsoneditor/issues/1038
                                      onClassName: onClassName_for_zoom2feature,

                                      /*
                                          onChangeJSON: function (j) {
                                                        window.editor.refresh()
                                          }
                                      */
                        
                        };
                        container_search = document.getElementById("jsoneditor_search"); 
                        editor_search = new JSONEditor(container_search, options_for_search_only);
                        // ==========   End ======== create the Jsoneditor ===============
                        /**/


                        // only for json2tree by default, hide all json-editor-hosted-parent-div
                        $("#info_outline").hide()
                        $("#list").hide()
                        $("#search-result-div").hide()
                      }

              /**/
              //  --- --- ... ---- end --- --- ... ----  jsoneditor related   --- --- ... ---- special for zoom2feature  --- --- ... ---- 
              /**/    
            
            /**/
            //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
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
         
            
            //  .. - .. - ... zoom 2 feature   ... - .. - .. 
            init_json_viewer_for_zoom2feature()

            init_user_interface_event()

            init_print() //  ---  print   --- 
                           


            /**/
                            // - - - search by field - - - 
                            /**/

                            init_search_by_field()
                            /**/
                            // ... end ...  - - - search by field  - - -
                            /**/

                                    init_search()
                                    //not working,  pre-search-keyword, get keyword from url param, only run 1 time, first time
                                    /*
                                    console.log(' pre search text',  searchText)
                                    if (searchText){
                                      search_layer_now()
                                    }
                                    */


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

                            
                            })
                            .catch(function(err) {
                              // A rejected view indicates a fatal error making it unable to display.
                              // Use the errback function to handle when the view doesn't load properly
                              console.error("MapView rejected:", err);
                            });
                    
         





                            




}); // require, everything should be inside

