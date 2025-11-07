



// geocoding address esri example https://developers.arcgis.com/javascript/latest/search-for-an-address/



require([
          "esri/config",
          "esri/Map",
          "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
          "esri/widgets/BasemapToggle",

          
          "esri/layers/support/LabelClass",

          "esri/renderers/ClassBreaksRenderer",  // mchb only

          
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

          
          LabelClass,

          ClassBreaksRenderer,  // mchb only

           
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


              
               
              
              
              
               


      /**/
      // ----- image or tile -----  ----- 
      /**/
          var background_type = 'image' //   'data'  tile
          var backgroundMapImageLayer
    var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression
          var backgroundTileLayer
          var backgroundFeatureLayer  
          

          var clicked_graphic
          
          
          var graphic_geometryType 
      /**/
      // ----- end  -----  image or tile -----  ----- 
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
            // -- -- -- mapimagelayer serverside label  -- -- -- 

            var current_dynamicLabel = 'nolabel'
            var bglayer_labelClass
            var bglayer_labelExpression = "$feature.OBJECTID" // default for labelExpressionInfo( must support Arcade)
            var bglayer_labelExpression_MapImage = "[OBJECTID] CONCAT" // default for mapimagelayer (without Arcade)
            var bglayer_labelColor = css_rgba_color_array[1]  // blue
            var bglayer_labelColorName = color_name_array[1]  // blue
            var bglayer_labelFontSize = 12

          //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 
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




                                                                    if (native_renderer == null) {
                                                                      native_renderer = backgroundMapImageLayer.sublayers.items[0].renderer.clone();
                                                                   }
                                                                   console.log("Map Image Layer, is ready, ", backgroundMapImageLayer);
                                                                    console.log("Map Image Layer, layer 0, native renderer", native_renderer);


                                                                     // first time set symbol type 'native' or 'customized'
                                                                    $("input[type=radio][name=symbolType_radio][value=" + symbolType_radioValue + "]").prop('checked', true);
                                                                    //symbol type radio, native or customized 
                                                                    $("input[type='radio'][name='symbolType_radio']").change(function(){
                                                                      symbol_changed()
                                                                    });


                                                                    symbol_changed()
                                            
                                            });

                          }
                        

                          

                          async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

                            

                            backgroundFeatureLayer = new FeatureLayer({
                              url: background_layer_url, 
                              // labeling see this example https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/
                              // labelingInfo: [labelClass]  // not use, this will add label to entire layer data, not just filtered result
                              opacity: _opacity,
                              outFields: ['*'],
                            });


                            if (background_type == 'data'){

                                    
                                      map.add(backgroundFeatureLayer)
                            
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

                            }//if data

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
                    
                   

            // ....  end ... ...  background layer url .... ... ... 
            /**/

      }






      function init_user_interface_event(){

        $('#info_outline').hide()
        $('#close_info_outline_panel').on('click', function(event) {
          empty_info_outline_Tab()
        });


      }


      /**/
      // --- --- ... ----  jsoneditor related   --- --- ... ----
      /**/
      
          
           


          
            function show_info_outline_Tab(___properties){

                  //  ---  mchb only   --- 
                  /**/
                      var display_properties = {}

                      // loop through object key,value
                      for (const [key, value] of Object.entries(___properties)) {
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


              
                  $('#info_outline').show();
                  $('#jsoneditor_info_outline').show();

                  editor_info_outline.set(display_properties);  //  ---  mchb only   ---
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
              
            }
            
            
            function empty_info_outline_Tab(){
              $('#info_outline').hide();
$('#info-window-div').html("")
              $('#jsoneditor_info_outline').hide();
              editor_info_outline.set({});
            }
            
      /**/   
      // --- --- ... ----  jsoneditor related   --- --- ... ----
      /**/





                /**/
                // -- -- -- mapimagelayer serverside label  -- -- -- 
                /**/



                function init_label(){

                  if (param_dynamicLabel){
                            current_dynamicLabel = param_dynamicLabel
                            current_classifyFieldName = current_dynamicLabel
                          }
                
                  // -- -- -- mapimagelayer serverside label  -- -- --
                  init_dynamic_label(_featurelayerJSON)
                  //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 


                } 


                // only for single layer 
                function change_label_handler(_labelAs_fieldName){


                   
                 
                  console.log(' dynamicLabel_eachField_radio ,  change to ', _labelAs_fieldName)
                  
                 
                  // bug fix, for all movable box, must explicitly add 'checked=checked' attribute to the labelAsRadioTag, also remove 'checked' from all other  labelAsRadioTag
                  // only for single layer 
                  $('input[type=radio][name=dynamicLabel_eachField_radio]').removeAttr('checked')
                  $('#'+_labelAs_fieldName).attr('checked', true)




                  if (_labelAs_fieldName == 'nolabel'){

                    backgroundMapImageLayer.sublayers.items[0].labelsVisible = false 

                  } else {

                    bglayer_labelExpression = "$feature." + _labelAs_fieldName
                    bglayer_labelExpression_MapImage = '[' + _labelAs_fieldName + ']'

                    bglayer_labelClass = new LabelClass({
                            //  MapImageLayer can use both labelExpression and labelExpressionInfo(support Arcade)
                            //  FeatureLayer can only use labelExpressionInfo(must support Arcade)  https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#labelExpression
                            
                            //labelExpressionInfo: { expression: bglayer_labelExpression }, // only if MapImageLayer support Arcade
                            labelExpression: bglayer_labelExpression_MapImage,              // does not matter support Arcade or not

                            symbol: {
                              type: "text",  // autocasts as new TextSymbol()
                              color: bglayer_labelColor,
                              haloSize: 1.5,
                              haloColor: "white",
                              font: { family: "Arial Unicode MS", size: bglayer_labelFontSize, weight: "bold" },
                            }
                    });

                    backgroundMapImageLayer.sublayers.items[0].labelingInfo = bglayer_labelClass
                    backgroundMapImageLayer.sublayers.items[0].labelsVisible = true        
                                

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
                                            _dynamicLabel_html += '<sup><span style="font-size: 8px;"> rendering remotely on hosting arcgis server</span></sup>'
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
                                            var ____fieldAlias  //  --- mchb only  --- 
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
        //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 
        /**/




      


                             
      /**/
      //==========================  renderer =================================================
                    
            function re_render_layer(symbolType){
                                                          
                                                          
              switch(symbolType) {

                          case 'native':
                                backgroundMapImageLayer.sublayers.items[0].renderer = null;
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
                                /**/
                                                  //view.goTo(featureLayer.fullExtent);
                                                  console.log( ' backgroundMapImageLayer.sublayers.items[0].geometryType ......>'  , backgroundMapImageLayer.sublayers.items[0].geometryType)
                                                  
  
                                              var _geometry_type_ = backgroundMapImageLayer.sublayers.items[0].geometryType.toLowerCase()
  
                                              if (_geometry_type_ == 'polygon') {
  
                                                backgroundMapImageLayer.sublayers.items[0].renderer = polygon_renderer;
                                                // backgroundFeatureLayer.renderer = polyline_renderer;
  
                                              } 
  
  
                                            if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
  
                                              backgroundMapImageLayer.sublayers.items[0].renderer = point_renderer;
  
                                              }   
  
  
                                              if (_geometry_type_ == 'polyline') {
  
                                                backgroundMapImageLayer.sublayers.items[0].renderer = polyline_renderer;
  
                                              }   
  
                              // ----------- End ------------  re-render as our customized style, without this section, by default, it use esri native, original symbol  -----------
                    
                  
                            break;





                          /* 1 */    
                          case 'Breastfeeding_Initiation_natural_break':

                          let Breastfeeding_Initiation_natural_break_renderer = new ClassBreaksRenderer({
                            // attribute of interest 
                            field: "BF_SMTH"
                          });
                          
                          Breastfeeding_Initiation_natural_break_renderer.addClassBreakInfo({
                            minValue: 20.9,
                            maxValue: 53.2,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][1],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });
                        
                          Breastfeeding_Initiation_natural_break_renderer.addClassBreakInfo({
                            minValue: 53.21,
                            maxValue: 67.2,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][2],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });
                          
                          Breastfeeding_Initiation_natural_break_renderer.addClassBreakInfo({
                            minValue: 67.21,
                            maxValue: 77.2,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][3],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });

                          Breastfeeding_Initiation_natural_break_renderer.addClassBreakInfo({
                            minValue: 77.21,
                            maxValue: 85.8,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][4],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });


                          Breastfeeding_Initiation_natural_break_renderer.addClassBreakInfo({
                            minValue: 85.81,
                            maxValue: 97.6,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][5],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });


                          backgroundMapImageLayer.sublayers.items[0].renderer = Breastfeeding_Initiation_natural_break_renderer;
                          break;




              /* 2 */            
                 case 'Breastfeeding_Initiation_quantile':

                          let Breastfeeding_Initiation_quantile_renderer = new ClassBreaksRenderer({
                            // attribute of interest 
                            field: "BF_SMTH"
                          });
                          
                          Breastfeeding_Initiation_quantile_renderer.addClassBreakInfo({
                            minValue: 20.9,
                            maxValue: 69.4,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][1],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });
                        
                          Breastfeeding_Initiation_quantile_renderer.addClassBreakInfo({
                            minValue: 69.41,
                            maxValue: 78.2,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][2],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });
                          
                          Breastfeeding_Initiation_quantile_renderer.addClassBreakInfo({
                            minValue: 78.21,
                            maxValue: 82.9,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][3],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });

                          Breastfeeding_Initiation_quantile_renderer.addClassBreakInfo({
                            minValue: 82.91,
                            maxValue: 87.9,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][4],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });


                          Breastfeeding_Initiation_quantile_renderer.addClassBreakInfo({
                            minValue: 87.91,
                            maxValue: 97.6,
                            symbol: {
                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                              color:   color_scale['colorScale_pink'][5],  
                              outline: {  // autocasts as new SimpleLineSymbol()
                                width: color_scale_outline_width,
                                color: color_scale_outline_color,
                              }
                            }
                          });


                          backgroundMapImageLayer.sublayers.items[0].renderer = Breastfeeding_Initiation_quantile_renderer;
                          break;







      /* 1 */    
      case 'Cesarean_Delivery_All_natural_break':

            let Cesarean_Delivery_All_natural_break_renderer = new ClassBreaksRenderer({
              // attribute of interest 
              field: "CSRN_SMTH"
            });
            
            Cesarean_Delivery_All_natural_break_renderer.addClassBreakInfo({
              minValue: 7.9,
              maxValue: 25.7,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   color_scale['colorScale_orange'][1],  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: color_scale_outline_width,
                  color: color_scale_outline_color,
                }
              }
            });
          
            Cesarean_Delivery_All_natural_break_renderer.addClassBreakInfo({
              minValue: 25.71,
              maxValue: 30.1,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   color_scale['colorScale_orange'][2],  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: color_scale_outline_width,
                  color: color_scale_outline_color,
                }
              }
            });
            
            Cesarean_Delivery_All_natural_break_renderer.addClassBreakInfo({
              minValue: 30.11,
              maxValue: 33.9,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   color_scale['colorScale_orange'][3],  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: color_scale_outline_width,
                  color: color_scale_outline_color,
                }
              }
            });

            Cesarean_Delivery_All_natural_break_renderer.addClassBreakInfo({
              minValue: 33.91,
              maxValue: 38.5,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   color_scale['colorScale_orange'][4],  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: color_scale_outline_width,
                  color: color_scale_outline_color,
                }
              }
            });


            Cesarean_Delivery_All_natural_break_renderer.addClassBreakInfo({
              minValue: 38.51,
              maxValue: 50.6,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   color_scale['colorScale_orange'][5],  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: color_scale_outline_width,
                  color: color_scale_outline_color,
                }
              }
            });


            backgroundMapImageLayer.sublayers.items[0].renderer = Cesarean_Delivery_All_natural_break_renderer;
            break;





   /* 2 */    
      case 'Cesarean_Delivery_All_quantile':

      let Cesarean_Delivery_All_quantile_renderer = new ClassBreaksRenderer({
        // attribute of interest 
        field: "CSRN_SMTH"
      });
      
      Cesarean_Delivery_All_quantile_renderer.addClassBreakInfo({
        minValue: 7.9,
        maxValue: 27.6,
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color:   color_scale['colorScale_orange'][1],  
          outline: {  // autocasts as new SimpleLineSymbol()
            width: color_scale_outline_width,
            color: color_scale_outline_color,
          }
        }
      });
    
      Cesarean_Delivery_All_quantile_renderer.addClassBreakInfo({
        minValue: 27.61,
        maxValue: 30.3,
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color:   color_scale['colorScale_orange'][2],  
          outline: {  // autocasts as new SimpleLineSymbol()
            width: color_scale_outline_width,
            color: color_scale_outline_color,
          }
        }
      });
      
      Cesarean_Delivery_All_quantile_renderer.addClassBreakInfo({
        minValue: 30.31,
        maxValue: 32.6,
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color:   color_scale['colorScale_orange'][3],  
          outline: {  // autocasts as new SimpleLineSymbol()
            width: color_scale_outline_width,
            color: color_scale_outline_color,
          }
        }
      });

      Cesarean_Delivery_All_quantile_renderer.addClassBreakInfo({
        minValue: 32.61,
        maxValue: 35.4,
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color:   color_scale['colorScale_orange'][4],  
          outline: {  // autocasts as new SimpleLineSymbol()
            width: color_scale_outline_width,
            color: color_scale_outline_color,
          }
        }
      });


      Cesarean_Delivery_All_quantile_renderer.addClassBreakInfo({
        minValue: 35.41,
        maxValue: 50.6,
        symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color:   color_scale['colorScale_orange'][5],  
          outline: {  // autocasts as new SimpleLineSymbol()
            width: color_scale_outline_width,
            color: color_scale_outline_color,
          }
        }
      });


      backgroundMapImageLayer.sublayers.items[0].renderer = Cesarean_Delivery_All_quantile_renderer;
      break;









/* 1 */    
  case 'Cesarean_Delivery_Low_Risk_natural_break':

       let Cesarean_Delivery_Low_Risk_natural_break_renderer = new ClassBreaksRenderer({
         // attribute of interest 
         field: "NTSV_SMTH"
       });
       
       Cesarean_Delivery_Low_Risk_natural_break_renderer.addClassBreakInfo({
         minValue: 3.2,
         maxValue: 18.2,
         symbol: {
           type: "simple-fill",  // autocasts as new SimpleFillSymbol()
           color:   color_scale['colorScale_yellow'][1],  
           outline: {  // autocasts as new SimpleLineSymbol()
             width: color_scale_outline_width,
             color: color_scale_outline_color,
           }
         }
       });
     
       Cesarean_Delivery_Low_Risk_natural_break_renderer.addClassBreakInfo({
         minValue: 18.21,
         maxValue: 22.9,
         symbol: {
           type: "simple-fill",  // autocasts as new SimpleFillSymbol()
           color:   color_scale['colorScale_yellow'][2],  
           outline: {  // autocasts as new SimpleLineSymbol()
             width: color_scale_outline_width,
             color: color_scale_outline_color,
           }
         }
       });
       
       Cesarean_Delivery_Low_Risk_natural_break_renderer.addClassBreakInfo({
         minValue: 22.91,
         maxValue: 26.5,
         symbol: {
           type: "simple-fill",  // autocasts as new SimpleFillSymbol()
           color:   color_scale['colorScale_yellow'][3],  
           outline: {  // autocasts as new SimpleLineSymbol()
             width: color_scale_outline_width,
             color: color_scale_outline_color,
           }
         }
       });

       Cesarean_Delivery_Low_Risk_natural_break_renderer.addClassBreakInfo({
         minValue: 26.51,
         maxValue: 31.0,
         symbol: {
           type: "simple-fill",  // autocasts as new SimpleFillSymbol()
           color:   color_scale['colorScale_yellow'][4],  
           outline: {  // autocasts as new SimpleLineSymbol()
             width: color_scale_outline_width,
             color: color_scale_outline_color,
           }
         }
       });


       Cesarean_Delivery_Low_Risk_natural_break_renderer.addClassBreakInfo({
         minValue: 31.01,
         maxValue: 47.6,
         symbol: {
           type: "simple-fill",  // autocasts as new SimpleFillSymbol()
           color:   color_scale['colorScale_yellow'][5],  
           outline: {  // autocasts as new SimpleLineSymbol()
             width: color_scale_outline_width,
             color: color_scale_outline_color,
           }
         }
       });


       backgroundMapImageLayer.sublayers.items[0].renderer = Cesarean_Delivery_Low_Risk_natural_break_renderer;
       break;




/* 2 */    
case 'Cesarean_Delivery_Low_Risk_quantile':

let Cesarean_Delivery_Low_Risk_quantile_renderer = new ClassBreaksRenderer({
  // attribute of interest 
  field: "NTSV_SMTH"
});

Cesarean_Delivery_Low_Risk_quantile_renderer.addClassBreakInfo({
  minValue: 3.2,
  maxValue: 21.6,
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color:   color_scale['colorScale_yellow'][1],  
    outline: {  // autocasts as new SimpleLineSymbol()
      width: color_scale_outline_width,
      color: color_scale_outline_color,
    }
  }
});

Cesarean_Delivery_Low_Risk_quantile_renderer.addClassBreakInfo({
  minValue: 21.61,
  maxValue: 23.9,
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color:   color_scale['colorScale_yellow'][2],  
    outline: {  // autocasts as new SimpleLineSymbol()
      width: color_scale_outline_width,
      color: color_scale_outline_color,
    }
  }
});

Cesarean_Delivery_Low_Risk_quantile_renderer.addClassBreakInfo({
  minValue: 23.91,
  maxValue: 26.0,
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color:   color_scale['colorScale_yellow'][3],  
    outline: {  // autocasts as new SimpleLineSymbol()
      width: color_scale_outline_width,
      color: color_scale_outline_color,
    }
  }
});

Cesarean_Delivery_Low_Risk_quantile_renderer.addClassBreakInfo({
  minValue: 26.01,
  maxValue: 28.4,
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color:   color_scale['colorScale_yellow'][4],  
    outline: {  // autocasts as new SimpleLineSymbol()
      width: color_scale_outline_width,
      color: color_scale_outline_color,
    }
  }
});


Cesarean_Delivery_Low_Risk_quantile_renderer.addClassBreakInfo({
  minValue: 28.41,
  maxValue: 47.6,
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color:   color_scale['colorScale_yellow'][5],  
    outline: {  // autocasts as new SimpleLineSymbol()
      width: color_scale_outline_width,
      color: color_scale_outline_color,
    }
  }
});


backgroundMapImageLayer.sublayers.items[0].renderer = Cesarean_Delivery_Low_Risk_quantile_renderer;
break;








          


                  /* 1 */    
                  case 'Diabetes_Pre_pregnancy_natural_break':

                  let Diabetes_Pre_pregnancy_natural_break_renderer = new ClassBreaksRenderer({
                    // attribute of interest 
                    field: "PRE_DIAB_SMTH"
                  });
                  
                  Diabetes_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                    minValue: 0.2,
                    maxValue: 0.9,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][1],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });

                  Diabetes_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                    minValue: 0.91,
                    maxValue: 1.3,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][2],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });
                  
                  Diabetes_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                    minValue: 1.31,
                    maxValue: 2.0,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][3],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });

                  Diabetes_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                    minValue: 2.01,
                    maxValue: 5.1,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][4],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });


                  Diabetes_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                    minValue: 5.11,
                    maxValue: 10.7,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][5],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });


                  backgroundMapImageLayer.sublayers.items[0].renderer = Diabetes_Pre_pregnancy_natural_break_renderer;
                  break;



                  /* 2 */    
                  case 'Diabetes_Pre_pregnancy_quantile':

                  let Diabetes_Pre_pregnancy_quantile_renderer = new ClassBreaksRenderer({
                    // attribute of interest 
                    field: "PRE_DIAB_SMTH"
                  });
                  
                  Diabetes_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                    minValue: 0.2,
                    maxValue: 0.8,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][1],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });

                  Diabetes_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                    minValue: 0.81,
                    maxValue: 1.0,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][2],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });
                  
                  Diabetes_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                    minValue: 1.01,
                    maxValue: 1.2,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][3],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });

                  Diabetes_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                    minValue: 1.21,
                    maxValue: 1.4,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][4],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });


                  Diabetes_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                    minValue: 1.41,
                    maxValue: 10.7,
                    symbol: {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color:   color_scale['colorScale_slateblue'][5],  
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: color_scale_outline_width,
                        color: color_scale_outline_color,
                      }
                    }
                  });


                  backgroundMapImageLayer.sublayers.items[0].renderer = Diabetes_Pre_pregnancy_quantile_renderer;
                  break;







                   /* 1 */    
                   case 'Diabetes_Pre_pregnancy_or_Gestational_natural_break':

                   let Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer = new ClassBreaksRenderer({
                     // attribute of interest 
                     field: "DIAB_SMTH"
                   });
                   
                   Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                     minValue: 1.2,
                     maxValue: 5.7,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_violet'][1],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
                   Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                     minValue: 5.71,
                     maxValue: 7.5,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_violet'][2],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
                   
                   Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                     minValue: 7.51,
                     maxValue: 9.5,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_violet'][3],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
                   Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                     minValue: 9.51,
                     maxValue: 13.3,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_violet'][4],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
 
                   Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                     minValue: 13.31,
                     maxValue: 25.2,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_violet'][5],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
 
                   backgroundMapImageLayer.sublayers.items[0].renderer = Diabetes_Pre_pregnancy_or_Gestational_natural_break_renderer;
                   break;
 


                    /* 2 */    
                    case 'Diabetes_Pre_pregnancy_or_Gestational_quantile':

                    let Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer = new ClassBreaksRenderer({
                      // attribute of interest 
                      field: "DIAB_SMTH"
                    });
                    
                    Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 1.2,
                      maxValue: 5.8,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_violet'][1],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 5.81,
                      maxValue: 6.9,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_violet'][2],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
                    
                    Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 6.91,
                      maxValue: 7.8,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_violet'][3],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 7.81,
                      maxValue: 9.0,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_violet'][4],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 9.01,
                      maxValue: 25.2,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_violet'][5],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    backgroundMapImageLayer.sublayers.items[0].renderer = Diabetes_Pre_pregnancy_or_Gestational_quantile_renderer;
                    break;








                 


                   /* 1 */    
                   case 'Hypertension_Pre_pregnancy_natural_break':

                   let Hypertension_Pre_pregnancy_natural_break_renderer = new ClassBreaksRenderer({
                     // attribute of interest 
                     field: "PRE_HYP_SMTH"
                   });
                   
                   Hypertension_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                     minValue: 0.1,
                     maxValue: 1.7,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_purple'][1],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
                   Hypertension_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                     minValue: 1.71,
                     maxValue: 2.6,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_purple'][2],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
                   
                   Hypertension_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                     minValue: 2.61,
                     maxValue: 3.6,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_purple'][3],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
                   Hypertension_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                     minValue: 3.61,
                     maxValue: 5.3,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_purple'][4],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
 
                   Hypertension_Pre_pregnancy_natural_break_renderer.addClassBreakInfo({
                     minValue: 5.31,
                     maxValue: 8.5,
                     symbol: {
                       type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                       color:   color_scale['colorScale_purple'][5],  
                       outline: {  // autocasts as new SimpleLineSymbol()
                         width: color_scale_outline_width,
                         color: color_scale_outline_color,
                       }
                     }
                   });
 
 
                   backgroundMapImageLayer.sublayers.items[0].renderer = Hypertension_Pre_pregnancy_natural_break_renderer;
                   break;



                    
 




                    /* 2 */    
                    case 'Hypertension_Pre_pregnancy_quantile':

                    let Hypertension_Pre_pregnancy_quantile_renderer = new ClassBreaksRenderer({
                      // attribute of interest 
                      field: "PRE_HYP_SMTH"
                    });
                    
                    Hypertension_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                      minValue: 0.1,
                      maxValue: 1.4,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][1],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Hypertension_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                      minValue: 1.41,
                      maxValue: 2.0,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][2],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
                    
                    Hypertension_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                      minValue: 2.01,
                      maxValue: 2.5,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][3],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Hypertension_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                      minValue: 2.51,
                      maxValue: 3.3,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][4],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    Hypertension_Pre_pregnancy_quantile_renderer.addClassBreakInfo({
                      minValue: 3.31,
                      maxValue: 8.5,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][5],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    backgroundMapImageLayer.sublayers.items[0].renderer = Hypertension_Pre_pregnancy_quantile_renderer;
                    break;
 








                    /* 1 */    
                    case 'Hypertension_Pre_pregnancy_or_Gestational_natural_break':

                    let Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer = new ClassBreaksRenderer({
                      // attribute of interest 
                      field: "HYP_SMTH"
                    });
                    
                    Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                      minValue: 1.1,
                      maxValue: 7.1,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][1],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                      minValue: 7.11,
                      maxValue: 9.4,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][2],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
                    
                    Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                      minValue: 9.41,
                      maxValue: 11.7,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][3],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                      minValue: 11.71,
                      maxValue: 15.2,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][4],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer.addClassBreakInfo({
                      minValue: 15.21,
                      maxValue: 24.7,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][5],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    backgroundMapImageLayer.sublayers.items[0].renderer = Hypertension_Pre_pregnancy_or_Gestational_natural_break_renderer;
                    break;






                    /* 2 */    
                    case 'Hypertension_Pre_pregnancy_or_Gestational_quantile':

                    let Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer = new ClassBreaksRenderer({
                      // attribute of interest 
                      field: "HYP_SMTH"
                    });
                    
                    Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 1.1,
                      maxValue: 7.7,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][1],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 7.71,
                      maxValue: 9.2,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][2],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
                    
                    Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 9.21,
                      maxValue: 10.5,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][3],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
                    Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 10.51,
                      maxValue: 12.3,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][4],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer.addClassBreakInfo({
                      minValue: 12.31,
                      maxValue: 24.7,
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color:   color_scale['colorScale_purple'][5],  
                        outline: {  // autocasts as new SimpleLineSymbol()
                          width: color_scale_outline_width,
                          color: color_scale_outline_color,
                        }
                      }
                    });
  
  
                    backgroundMapImageLayer.sublayers.items[0].renderer = Hypertension_Pre_pregnancy_or_Gestational_quantile_renderer;
                    break;








                     /* 1 */    
                     case 'Infant_Mortality_Rate_natural_break':

                     let Infant_Mortality_Rate_natural_break_renderer = new ClassBreaksRenderer({
                       // attribute of interest 
                       field: "IMR_SMTH"
                     });
                     
                     Infant_Mortality_Rate_natural_break_renderer.addClassBreakInfo({
                       minValue: 2.37,
                       maxValue: 4.96,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_red'][1],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
                     Infant_Mortality_Rate_natural_break_renderer.addClassBreakInfo({
                       minValue: 4.96,
                       maxValue: 6.32,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_red'][2],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
                     
                     Infant_Mortality_Rate_natural_break_renderer.addClassBreakInfo({
                       minValue: 6.32,
                       maxValue: 7.87,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_red'][3],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
                     Infant_Mortality_Rate_natural_break_renderer.addClassBreakInfo({
                       minValue: 7.87,
                       maxValue: 10.34,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_red'][4],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
   
                     Infant_Mortality_Rate_natural_break_renderer.addClassBreakInfo({
                       minValue: 10.34,
                       maxValue: 23.1,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_red'][5],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
   
                     backgroundMapImageLayer.sublayers.items[0].renderer = Infant_Mortality_Rate_natural_break_renderer;
                     break;




                      /* 2 */    
                      case 'Infant_Mortality_Rate_quantile':

                      let Infant_Mortality_Rate_quantile_renderer = new ClassBreaksRenderer({
                        // attribute of interest 
                        field: "IMR_SMTH"
                      });
                      
                      Infant_Mortality_Rate_quantile_renderer.addClassBreakInfo({
                        minValue: 2.37,
                        maxValue: 4.9,
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                          color:   color_scale['colorScale_red'][1],  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width: color_scale_outline_width,
                            color: color_scale_outline_color,
                          }
                        }
                      });
    
                      Infant_Mortality_Rate_quantile_renderer.addClassBreakInfo({
                        minValue: 4.91,
                        maxValue: 5.79,
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                          color:   color_scale['colorScale_red'][2],  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width: color_scale_outline_width,
                            color: color_scale_outline_color,
                          }
                        }
                      });
                      
                      Infant_Mortality_Rate_quantile_renderer.addClassBreakInfo({
                        minValue: 5.79,
                        maxValue: 6.6,
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                          color:   color_scale['colorScale_red'][3],  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width: color_scale_outline_width,
                            color: color_scale_outline_color,
                          }
                        }
                      });
    
                      Infant_Mortality_Rate_quantile_renderer.addClassBreakInfo({
                        minValue: 6.61,
                        maxValue: 7.69,
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                          color:   color_scale['colorScale_red'][4],  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width: color_scale_outline_width,
                            color: color_scale_outline_color,
                          }
                        }
                      });
    
    
                      Infant_Mortality_Rate_quantile_renderer.addClassBreakInfo({
                        minValue: 7.69,
                        maxValue: 23.1,
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                          color:   color_scale['colorScale_red'][5],  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width: color_scale_outline_width,
                            color: color_scale_outline_color,
                          }
                        }
                      });
    
    
                      backgroundMapImageLayer.sublayers.items[0].renderer = Infant_Mortality_Rate_quantile_renderer;
                      break;





                      /* 1 */    
                     case 'Low_Birth_Weight_natural_break':

                     let Low_Birth_Weight_natural_break_renderer = new ClassBreaksRenderer({
                       // attribute of interest 
                       field: "LBW_PCT"
                     });
                     
                     Low_Birth_Weight_natural_break_renderer.addClassBreakInfo({
                       minValue: 2.7,
                       maxValue: 7.0,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][1],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
                     Low_Birth_Weight_natural_break_renderer.addClassBreakInfo({
                       minValue: 7.01,
                       maxValue: 8.3,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][2],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
                     
                     Low_Birth_Weight_natural_break_renderer.addClassBreakInfo({
                       minValue: 8.31,
                       maxValue: 9.9,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][3],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
                     Low_Birth_Weight_natural_break_renderer.addClassBreakInfo({
                       minValue: 9.91,
                       maxValue: 12.2,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][4],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
   
                     Low_Birth_Weight_natural_break_renderer.addClassBreakInfo({
                       minValue: 12.21,
                       maxValue: 17.9,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][5],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
   
                     backgroundMapImageLayer.sublayers.items[0].renderer = Low_Birth_Weight_natural_break_renderer;
                     break;





                     /* 2 */    
                     case 'Low_Birth_Weight_quantile':

                     let Low_Birth_Weight_quantile_renderer = new ClassBreaksRenderer({
                       // attribute of interest 
                       field: "LBW_PCT"
                     });
                     
                     Low_Birth_Weight_quantile_renderer.addClassBreakInfo({
                       minValue: 2.7,
                       maxValue: 6.8,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][1],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
                     Low_Birth_Weight_quantile_renderer.addClassBreakInfo({
                       minValue: 6.81,
                       maxValue: 7.7,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][2],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
                     
                     Low_Birth_Weight_quantile_renderer.addClassBreakInfo({
                       minValue: 7.71,
                       maxValue: 8.5,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][3],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
                     Low_Birth_Weight_quantile_renderer.addClassBreakInfo({
                       minValue: 8.51,
                       maxValue: 9.7,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][4],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
   
                     Low_Birth_Weight_quantile_renderer.addClassBreakInfo({
                       minValue: 9.71,
                       maxValue: 17.9,
                       symbol: {
                         type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                         color:   color_scale['colorScale_green'][5],  
                         outline: {  // autocasts as new SimpleLineSymbol()
                           width: color_scale_outline_width,
                           color: color_scale_outline_color,
                         }
                       }
                     });
   
   
                     backgroundMapImageLayer.sublayers.items[0].renderer = Low_Birth_Weight_quantile_renderer;
                     break;












       /*   00000000   */


                            case 'birth_rate_natural_break':

                                          let birth_rate_natural_break_renderer = new ClassBreaksRenderer({
                                            // attribute of interest 
                                            field: "BIRTH_RATE"
                                          });
                                          
                                          birth_rate_natural_break_renderer.addClassBreakInfo({
                                            minValue: 1.3,
                                            maxValue: 9.02,
                                            symbol: {
                                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                              color:   color_scale['colorScale_red'][1],  
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                width: color_scale_outline_width,
                                                color: color_scale_outline_color,
                                              }
                                            }
                                          });
                                        
                                          birth_rate_natural_break_renderer.addClassBreakInfo({
                                            minValue: 9.03,
                                            maxValue: 10.97,
                                            symbol: {
                                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                              color:   color_scale['colorScale_red'][2],  
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                width: color_scale_outline_width,
                                                color: color_scale_outline_color,
                                              }
                                            }
                                          });
                                          
                                          birth_rate_natural_break_renderer.addClassBreakInfo({
                                            minValue: 10.98,
                                            maxValue: 12.94,
                                            symbol: {
                                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                              color:   color_scale['colorScale_red'][3],  
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                width: color_scale_outline_width,
                                                color: color_scale_outline_color,
                                              }
                                            }
                                          });

                                          birth_rate_natural_break_renderer.addClassBreakInfo({
                                            minValue: 12.95,
                                            maxValue: 16.5,
                                            symbol: {
                                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                              color:   color_scale['colorScale_red'][4],  
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                width: color_scale_outline_width,
                                                color: color_scale_outline_color,
                                              }
                                            }
                                          });


                                          birth_rate_natural_break_renderer.addClassBreakInfo({
                                            minValue: 16.6,
                                            maxValue: 29.51,
                                            symbol: {
                                              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                              color:   color_scale['colorScale_red'][5],  
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                width: color_scale_outline_width,
                                                color: color_scale_outline_color,
                                              }
                                            }
                                          });

                                          backgroundMapImageLayer.sublayers.items[0].renderer = birth_rate_natural_break_renderer;
                            break;


                            case 'birth_rate_quantile':

                                                        let birth_rate_quantile_renderer = new ClassBreaksRenderer({
                                                          // attribute of interest 
                                                          field: "BIRTH_RATE"
                                                        });
                                                        
                                                        birth_rate_quantile_renderer.addClassBreakInfo({
                                                          minValue: 1.3,
                                                          maxValue: 9.37,
                                                          symbol: {
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color:   color_scale['colorScale_red'][1],  
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              width: color_scale_outline_width,
                                                              color: color_scale_outline_color,
                                                            }
                                                          }
                                                        });
                                                      
                                                        birth_rate_quantile_renderer.addClassBreakInfo({
                                                          minValue: 9.38,
                                                          maxValue: 10.55,
                                                          symbol: {
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color:   color_scale['colorScale_red'][2],  
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              width: color_scale_outline_width,
                                                              color: color_scale_outline_color,
                                                            }
                                                          }
                                                        });
                                                        
                                                        birth_rate_quantile_renderer.addClassBreakInfo({
                                                          minValue: 10.56,
                                                          maxValue: 11.51,
                                                          symbol: {
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color:   color_scale['colorScale_red'][3],  
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              width: color_scale_outline_width,
                                                              color: color_scale_outline_color,
                                                            }
                                                          }
                                                        });

                                                        birth_rate_quantile_renderer.addClassBreakInfo({
                                                          minValue: 11.52,
                                                          maxValue: 12.69,
                                                          symbol: {
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color:   color_scale['colorScale_red'][4],  
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              width: color_scale_outline_width,
                                                              color: color_scale_outline_color,
                                                            }
                                                          }
                                                        });


                                                        birth_rate_quantile_renderer.addClassBreakInfo({
                                                          minValue: 12.70,
                                                          maxValue: 29.51,
                                                          symbol: {
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color:   color_scale['colorScale_red'][5],  
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              width: color_scale_outline_width,
                                                              color: color_scale_outline_color,
                                                            }
                                                          }
                                                        });

                                                        backgroundMapImageLayer.sublayers.items[0].renderer = birth_rate_quantile_renderer;
                                                        break;


                                        default:
                                          // code block
                                      }                

              

                                      console.log('backgroundMapImageLayer.sublayers.items[0].renderer', backgroundMapImageLayer.sublayers.items[0].renderer)
              
            } 


            function symbol_changed(){

                          symbolType_radioValue = $("input[name='symbolType_radio']:checked").val();

                          current_symbol_fieldName = $("input[name='symbolType_radio']:checked").attr("data-fieldName");
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
                // -- -- -- mapimagelayer serverside label  -- -- -- 
                /**/

                init_label()

                /**/
                //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 
                /**/

           
            init_filter_by() //   --- . . . --- . . . filter by  --- . . . --- . . .

           
           
         
           
            init_settingTab()

            init_json_viewer()

            init_user_interface_event()

            init_print() //  ---  print   --- 
                           

            
           //

        }



/* ....  end ... ... external function ... ... ...*/     


                 


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


                                    // pre-search-keyword here, not done yet,

                            
                            }) 
                            
                            .catch(function(err) {
                              // A rejected view indicates a fatal error making it unable to display.
                              // Use the errback function to handle when the view doesn't load properly
                              console.error("MapView rejected:", err);
                            });
                    
         




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
                                    //$("#urban_rural_option_div").removeClass('disabled_color_class')

                                    checked_urban_rural_array = []
                                    $('input[name="urban_rural_option"]:checked').each(function() {
                                      checked_urban_rural_array.push(this.value);
                                    });
                                    console.log('checked_urban_rural_array', checked_urban_rural_array)
                                    filter_mapImageLayer_by(filter_by, checked_urban_rural_array)
                                    break;

                              case "rural":
                                    $("input[type='checkbox'][name='rural_option']").removeAttr("disabled");
                                    //$("#rural_option_div").removeClass('disabled_color_class')

                                    checked_rural_array = []
                                    $('input[name="rural_option"]:checked').each(function() {
                                      checked_rural_array.push(this.value);
                                    });
                                    console.log('checked_rural_array', checked_rural_array)
                                    filter_mapImageLayer_by(filter_by, checked_rural_array)
                                    break;

                              case "hrsa_region":
                                    $("input[type='checkbox'][name='hrsa_region_option']").removeAttr("disabled");
                                    //$("#hrsa_region_option_div").removeClass('disabled_color_class')

                                    checked_hrsa_region_array = []
                                    $('input[name="hrsa_region_option"]:checked').each(function() {
                                      checked_hrsa_region_array.push(this.value);
                                    });
                                    console.log('checked_hrsa_region_array', checked_hrsa_region_array)
                                    filter_mapImageLayer_by(filter_by, checked_hrsa_region_array)
                                    break;

                              case "state":
                                    $("input[type='checkbox'][name='state_option']").removeAttr("disabled");
                                    //$("#state_option_div").removeClass('disabled_color_class')

                                    checked_state_array = []
                                    $('input[name="state_option"]:checked').each(function() {
                                      checked_state_array.push(this.value);
                                    });
                                    console.log('checked_state_array', checked_state_array)
                                    filter_mapImageLayer_by(filter_by, checked_state_array)
                                    break;

                            default:
                              // code block
                          }

                          }



                          function remove_all_filter(){

                            backgroundMapImageLayer.sublayers.items[0].definitionExpression = ''

                          }


                          function disable_all_filterByOption(){
                            $("input[type='checkbox'][name='urban_rural_option']").attr("disabled", true);
                            $("input[type='checkbox'][name='rural_option']").attr("disabled", true);
                            $("input[type='checkbox'][name='hrsa_region_option']").attr("disabled", true);
                            $("input[type='checkbox'][name='state_option']").attr("disabled", true);

                            /*
                            $("#urban_rural_option_div").addClass('disabled_color_class')
                            $("#rural_option_div").addClass('disabled_color_class')
                            $("#hrsa_region_option_div").addClass('disabled_color_class')
                            $("#state_option_div").addClass('disabled_color_class')
                            */

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
                                        backgroundMapImageLayer.sublayers.items[0].definitionExpression =  sql_where;
                                        

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
    
    
                            disable_all_filterByOption()

                            $("input[type='checkbox'][name='urban_rural_option']").change(function(){
                                    checked_urban_rural_array = []
                                    $('input[name="urban_rural_option"]:checked').each(function() {
                                      checked_urban_rural_array.push(this.value);
                                    });
                                    console.log('checked_urban_rural_array', checked_urban_rural_array)
                                    filter_mapImageLayer_by(filter_by, checked_urban_rural_array)
                            });


                            $("input[type='checkbox'][name='rural_option']").change(function(){
                              checked_rural_array = []
                              $('input[name="rural_option"]:checked').each(function() {
                                checked_rural_array.push(this.value);
                              });
                              console.log('checked_rural_array', checked_rural_array)
                              filter_mapImageLayer_by(filter_by, checked_rural_array)
                            });


                            $("input[type='checkbox'][name='hrsa_region_option']").change(function(){
                              checked_hrsa_region_array = []
                              $('input[name="hrsa_region_option"]:checked').each(function() {
                                checked_hrsa_region_array.push(this.value);
                              });
                              console.log('checked_hrsa_region_array', checked_hrsa_region_array)
                              filter_mapImageLayer_by(filter_by, checked_hrsa_region_array)
                            });


                            $("input[type='checkbox'][name='state_option']").change(function(){
                              checked_state_array = []
                              $('input[name="state_option"]:checked').each(function() {
                                checked_state_array.push(this.value);
                              });
                              console.log('checked_state_array', checked_state_array)
                              filter_mapImageLayer_by(filter_by, checked_state_array)
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
    
               
    


                          function filter_mapImageLayer_by(_filterBy_, _checkedOptionArray){

                            console.log(" filter_mapImageLayer_by  ", _filterBy_, _checkedOptionArray);
                            var sql_where

                            switch(_filterBy_) {

                              case "urban_rural":

                                //backgroundMapImageLayer.sublayers.items[0].definitionExpression = "NCHS_URBAN_RURAL_DESC = '" + _checkedOptionArray[0] + "'";
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
                                    backgroundMapImageLayer.sublayers.items[0].definitionExpression =  sql_where;

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
                                    backgroundMapImageLayer.sublayers.items[0].definitionExpression =  sql_where;
                                    
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
                                    backgroundMapImageLayer.sublayers.items[0].definitionExpression =  sql_where;

                                   
                                    break;

                              case "state":

                                    //backgroundMapImageLayer.sublayers.items[0].definitionExpression = "STATE_NM = '" + _checkedOptionArray[0] + "'";
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
                                    backgroundMapImageLayer.sublayers.items[0].definitionExpression =  sql_where;

                              break;



                            default:
                              // code block
                          }
                            
                          }

                /**/
                //   . . . --- end  --- . . . --- . . . filter by  --- . . . --- . . .  
                /**/








                


}); // require, everything should be inside

