
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
  
  "esri/Map",
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",

 
  "esri/widgets/Legend",
  
  "esri/core/Handles",
  "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",
  
  "esri/widgets/Print",

  "esri/core/promiseUtils",
  "esri/core/reactiveUtils",

  
  
], function(
            Map, 
            MapView,

            Basemap,
            Attribution,
            
            WebTileLayer,
            BasemapToggle,
            Expand, 
            BasemapGallery, 
            
            Legend, 
            
            
            Handles,
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
                         
            
              var click_or_hover = 'hover'   // 'click'
              var objectId; // must be global var, otherwise, highlight will not work when multiple layers



             




                              /**/
                              // ----- color style setting ----- 
                              /**/ 
                              var native_renderer
                              var symbolType_radioValue = 'native'
 							                 /**/
                              // ----- end -----  color style setting ----- 
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

                        
                   //=================== toggle basemap ============================

                        
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
                

                      

              /**/ 
              //=================== legend outside map ============================

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
              //======= end ============ legend outside map ============================
              /**/ 
                   


                            //  ... opacity  ...

                            if (param_overlayOpacity){
                              groundoverlay_opacity = param_overlayOpacity / 10
                            }

                            var opacity_slider = document.querySelector("#overlay_opacity_range");
                            opacity_slider.value = groundoverlay_opacity * 10

                            var opacity_value_text = document.querySelector("#opacity_value_text");
                            opacity_value_text.textContent = opacity_slider.value;
                            
                            // event handle   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                            opacity_slider.addEventListener("input", (event) => {
                              var _overlay_opacity = event.target.value;
                              opacity_value_text.textContent = _overlay_opacity
                              update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  groundoverlay_opacity = _overlay_opacity / 10;
                    
                                                  // update overlay opacity
                                                  backgroundFeatureLayer.opacity = groundoverlay_opacity
                            });
                            // ... end ... opacity




                   // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui





                       
  


          
          var highlightHandles = new Handles();
          var layerView  
          async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

            if (backgroundFeatureLayer){
            } else {
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url,
                      outFields: "*",
                      opacity: groundoverlay_opacity,
                    });
            }


           
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info_vertical(current_feature_rendered , total_feature_count)

            });

              map.add(backgroundFeatureLayer)

              layerView = await view.whenLayerView(backgroundFeatureLayer);

                // enforce use yellow square for point, yellow line, yellow polygon
                // must be here after featurelayer fully loaded

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
                                                                      update_statistic_info_vertical(current_feature_rendered , total_feature_count)
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
                                   
                         


                         
                          /**/
                          //  --- esri update latlngzoom    --- 
                          /**/
                                
                              update_center_latLngZoom_esri(view)
                          /**/
                          //  --- end  ---  esri update latlngzoom    --- 
                          /**/



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
                                                               update_statistic_info_vertical(current_feature_rendered , total_feature_count)                                          
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


             



               // -- - - - -- - - -   mouse-move -- - - - event -- - - -  
       
                  /*
                      mouse-move will fire 100 event each time, which freeze browser, not responsive.  mouse-click don't have such problem. 
                      for best performance, place inside layerView scope,  

                        esri sample solution to improve, not solve the 100+ mouse-move event each time, 
                        https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-feature-sidepanel

                        Map flickering on mouse move, because fire 100+ mouse-move event each time, down stream operation will pile up, jamed.
                        https://community.esri.com/t5/net-maps-sdk-questions/map-flickering-on-mouse-move/m-p/542909#M6637
                  */

                       
                        const debouncedUpdate = promiseUtils.debounce(async (event) => {
    
                        //console.log('  - - -   pointer-move fire too many times - - -  ', click_or_hover )
                        if (click_or_hover == 'hover'){
    
                                      const hitTest = await view.hitTest(event, { include: backgroundFeatureLayer});
                                      let hitResult = hitTest.results.filter(function (result) {
                                                                              return result.graphic.layer === backgroundFeatureLayer;
                                                                            })
    
                                      let graphic      
                                      
                                      // && logical AND assignment,  only when hitResult[0] is truthy, same as : 
                                      // var newObjectId
                                      // if (hitResult[0]) { newObjectId = hitResult[0].graphic.attributes[backgroundFeatureLayer.objectIdField]; } else { newObjectId = undefined }
                                      var newObjectId = hitResult[0] && hitResult[0].graphic.attributes[backgroundFeatureLayer.objectIdField];
                                        
                                     
                                      //console.log('hover new Object Id vs old object Id : ', newObjectId, objectId);
                                      // fix bug, object id could be 0,  if (0) is false, actually, 0 is real id, should be true here.
                                      //if (!newObjectId) {
                                      if (newObjectId == undefined) {
                                                                if (mouse_pointed_feature_highlight_handle){
                                                                  mouse_pointed_feature_highlight_handle.remove()
                                                                }
                                                                objectId = undefined
                                                                // hide info outline 
                                                                empty_info_outline_Tab()
                                                            
                                      } else if (objectId !== newObjectId) {
                              
                                                                if (mouse_pointed_feature_highlight_handle){
                                                                  mouse_pointed_feature_highlight_handle.remove()
                                                                }
                                                                objectId = newObjectId;
                                                                graphic = hitResult[0].graphic;
    
                                                                // if outside scope of layer View, must need get layer view. For single layer, if inside scrope, it is optional. For multi layer, even inside scope, still must get layer view
                                                                // to be safe, I always get layer view here, even it is single layer, inside scope.
                                                                mouse_pointed_feature_highlight_handle = layerView.highlight(graphic);
                                                              
    
                                                                console.log('newObjectId', newObjectId)
                                                                //console.log(' ! * ! hit test ! * ! result ! * ! graphic ! * ! ', graphic )
                                                                show_info_outline_Tab(graphic.attributes)
                                      }//if newObjectId
                                        
    
                        }// if hover
    
                      });// debounce
    
    
                      //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                      view.on("pointer-move", function(event){

                                  //console.log('event', event)
                                  //console.log('pointer-move event')

                                  debouncedUpdate(event).catch((err) => {
                                                  if (!promiseUtils.isAbortError(err)) {
                                                    throw err;
                                                  }
                                  });
                      }); // view . on . hover
    
    
              // -- - - -  -- - - -  end  -- - - - -- - - -   mouse-move -- - - -  -- - - -   
    
               
           

  


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
                            




  
  
  


                               






      // only for :  single layer,  click_or_hover     
      var graphic_object_indexAsKey = {} 
      function init_feature_layer_view(){

        // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
        view.on("click", function(event){

          console.log(' view * click * fire 1 time is fine , hit test ', click_or_hover )
          if (click_or_hover == 'click'){

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


                                                      


                                                      /**/
                                                      // - - - - download geojson  - - - - 
                                                      /**/
                                                      // both works, 
                                                      _selected_graphic_in_geojson = OneGraphicToOneGeoJSON(graphic)
                                                      // 2 step
                                                      //_selected_graphic_in_geojson = graphicToGeoJSON(graphic)
                                                      /**/
                                                      //  - - - -  end  - - - -  download geojson   - - - - 
                                                      /**/


                                                      
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

                                                  $('#info-window-div').html(multiple_layer_properties_html)

                                                  /**/
                                                  //  --- side by side   --- 
                                                  /**/
                                                          
                                                  // for embed at top, right and or left side info window, always scroll to top
                                                  $("#info_outline").show()
                                                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window


                                                  /**/
                                                  //   --- end  ---   --- side by side   --- 
                                                  /**/



                                                  // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                    console.log('add event to element id :  attribute_field_set_', _index)
                                                    $("#attribute_field_set_" + _index ).on('click', function(){
                                                                var element_id = $(this).attr('id');
                                                                var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                                                console.log("you click  index  :   ",  _select_highlight_index)
                          
                                                                $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                                                $(this).addClass('selected_highlighted_style')


                                                                /**/
                                                                //  --- zoom to feature or not radio button     --- 
                                                                /**/

                                                                var graphic = graphic_object_indexAsKey[_select_highlight_index]
                                                                console.log('you click  index graphic ', graphic)


                                                                /**/
                                                                // - - - - download geojson  - - - - 
                                                                /**/
                                                                
                                                                // both works, 
                                                                _selected_graphic_in_geojson = OneGraphicToOneGeoJSON(graphic)
                                                                // 2 step
                                                                //_selected_graphic_in_geojson = graphicToGeoJSON(graphic)
                                                                /**/
                                                                //  - - - -  end  - - - -  download geojson   - - - - 
                                                                /**/


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

            }// if click

         }); // view . on . click

                               
      }// function




  



                      

               
                                          
                 
                 
             


      
               
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


        
        
            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/

        init_base_map()

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

                         

                                                       
                          init_user_interface_event()
                          
                          update_layer_name(background_layer_url, _layer)         
                          
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



     

/**/
// - - - - download geojson  - - - - 
/**/

     


      // [long, lat]
      function coord3857_to_4326(coord_array){
        // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
        console.log('coord_array', coord_array)
        return proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [coord_array[0], coord_array[1]]);
      }

      // path [[long, lat], [], [], ]
      function path3857_to_4326(path_array){

        var path_array4326 = []
        for (let i = 0; i < path_array.length; i++) {
          path_array4326.push(coord3857_to_4326(path_array[i]));
        }//for

        return path_array4326
      }


      // ring [   [[long, lat],[],[],],    [[long, lat],[],[],],   ] 
      function ring3857_to_4326(ring_array){

        var ring_array4326 = []
        for (let i = 0; i < ring_array.length; i++) {
          ring_array4326.push(path3857_to_4326(ring_array[i]));
        }//for

        return ring_array4326
      }


      // multi ring[  [   [[long, lat],[],[],],    [[long, lat],[],[],],   ] , [   [[long, lat],[],[],],    [[long, lat],[],[],],   ],....]
      function multi_ring3857_to_4326(multi_ring_array){

        var multi_ring_array4326 = []
        for (let i = 0; i < multi_ring_array.length; i++) {
          multi_ring_array4326.push(ring3857_to_4326(multi_ring_array[i]));
        }//for

        return multi_ring_array4326

      }



      function getArrayDepth(arr) {
        if (!Array.isArray(arr)) {
          return 0;
        }
      
        let maxDepth = 1;
        for (const element of arr) {
          if (Array.isArray(element)) {
            maxDepth = Math.max(maxDepth, 1 + getArrayDepth(element));
          }
        }
        return maxDepth;
      }



      function graphicToFeature_of_geojson(_esri_graphic) {


      /*
      
            esri graphic wkid is 3857, not 4326(lat,lng)
            you must convert coordinate from 3857 to 4326
      
      */

      console.log('_esri_graphic To GeoJSON convert , this is raw graphic ',  _esri_graphic)

      var _graphic_toJson = _esri_graphic.toJSON();

      console.log('_esri_graphic To GeoJSON convert , this is raw graphic to JSON ',  _graphic_toJson)

      var _geojson_feature




      var _esriGraphicType = _esri_graphic.geometry.type

      // Possible Values:"point" |"multipoint" |"polyline" |"polygon" |"extent" |"mesh"
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html#type
      switch (_esriGraphicType) {

        case 'point':

          console.log(' point lat lng is ',  _esri_graphic.geometry.longitude, _esri_graphic.geometry.latitude )


          // 3857 to 4326
          var coord_3857 = [_esri_graphic.geometry.x, _esri_graphic.geometry.y]
          var coord_4326 = coord3857_to_4326(coord_3857)

          _geojson_feature = {
                                type: "Feature",
                            
                                // both work
                                properties: _esri_graphic.attributes,
                                //properties: _graphic_toJson.attributes,
                        
                                geometry: {
                                            type: 'Point',
                                            // both works
                                            //coordinates: [_esri_graphic.geometry.longitude, _esri_graphic.geometry.latitude],
                                            coordinates: coord_4326,
                                }
                            };
          break;



        case 'multipoint':

            console.log(' multipoint geometry ',  _esri_graphic.geometry )
  
  
            // 3857 to 4326
            var coord_3857 = _esri_graphic.geometry.points
            var coord_4326 = path3857_to_4326(coord_3857)
  
            _geojson_feature = {
                                  type: "Feature",
                              
                                  // both work
                                  properties: _esri_graphic.attributes,
                                  //properties: _graphic_toJson.attributes,
                          
                                  geometry: {
                                              type: 'MultiPoint',
                                              // both works
                                              //coordinates: [_esri_graphic.geometry.longitude, _esri_graphic.geometry.latitude],
                                              coordinates: coord_4326,
                                  }
                                };
              break;

            
        case 'polyline':

        // 3857 to 4326
        var line_paths_coord_3857 = _esri_graphic.geometry.paths

        var array_depth = getArrayDepth(line_paths_coord_3857)
        console.log('line path depth  ',  array_depth )
        var line_paths_coord_4326
        var geometry_type = 'LineString'

        if (array_depth == 3){
            line_paths_coord_4326 = ring3857_to_4326(line_paths_coord_3857)
            geometry_type = 'MultiLineString'
        }
        
        if (array_depth == 2){
            line_paths_coord_4326 = path3857_to_4326(line_paths_coord_3857)
            geometry_type = 'LineString'
        }




        _geojson_feature = {
                              type: "Feature",
                          
                              // both work
                              properties: _esri_graphic.attributes,
                              //properties: _graphic_toJson.attributes,
                      
                              geometry: {
                                type: geometry_type, //'LineString', 'MultiLineString'
                                coordinates: line_paths_coord_4326,
                              }
                            };
        break;



        case 'polygon':

         // 3857 to 4326
         var polygon_rings_coord_3857 = _esri_graphic.geometry.rings
         var array_depth = getArrayDepth(polygon_rings_coord_3857)

         console.log('polygon ring depth  ',  array_depth )
         var polygon_rings_coord_4326
         var geometry_type = 'Polygon'

         if (array_depth == 3){
          geometry_type = 'Polygon'
          polygon_rings_coord_4326 = ring3857_to_4326(polygon_rings_coord_3857)
         }

         if (array_depth == 4){
          geometry_type = 'MultiPolygon'
          polygon_rings_coord_4326 = multi_ring3857_to_4326(polygon_rings_coord_3857)
         }


        
        _geojson_feature = {

                              type: "Feature",
                          
                              // both work
                              properties: _esri_graphic.attributes,
                              //properties: _graphic_toJson.attributes,
                      
                              geometry: {
                                type: geometry_type,  //'Polygon','MultiPolygon'
                                coordinates: polygon_rings_coord_4326
                              }
                            };
        break;








        default:
          
          break;
      }

      console.log('graphic To feture of GeoJSON convert , this is after feature geojson ',  _geojson_feature)

      



      // Adjust for multi-part geometries if needed

      // if (_esri_graphic.geometry.type.startsWith("Multi")) {

      //    _geojson_feature.geometry.coordinates = _esri_graphic.geometry.coordinates.map(coordArray => coordArray);

      //  }


      return _geojson_feature;

      }


      function graphicToGeoJSON(__graphic_of_esri_){

        return {
                  "type": "FeatureCollection",
                  "features": [ graphicToFeature_of_geojson(__graphic_of_esri_) ], 
                };
      }


      // for single select, single download only, for multiple download, split it into 2 functions, graphic to feature(geojson), feature(geojson) to geojson
      function OneGraphicToOneGeoJSON(_esri_graphic) {


        /*
        
              esri graphic wkid is 3857, not 4326(lat,lng)
              you must convert coordinate from 3857 to 4326
        
        */
  
        console.log('_esri_graphic To GeoJSON convert , this is raw graphic ',  _esri_graphic)
  
        var _graphic_toJson = _esri_graphic.toJSON();
  
        console.log('_esri_graphic To GeoJSON convert , this is raw graphic to JSON ',  _graphic_toJson)
  
        var _geojson_from_graphic
  
  
  
  
        var _esriGraphicType = _esri_graphic.geometry.type
  
        // Possible Values:"point" |"multipoint" |"polyline" |"polygon" |"extent" |"mesh"
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html#type
        switch (_esriGraphicType) {
  
          case 'point':
  
            console.log(' point lat lng is ',  _esri_graphic.geometry.longitude, _esri_graphic.geometry.latitude )
  
  
            // 3857 to 4326
            var coord_3857 = [_esri_graphic.geometry.x, _esri_graphic.geometry.y]
            var coord_4326 = coord3857_to_4326(coord_3857)
  
            _geojson_from_graphic = {
              "type": "FeatureCollection",
              "features": [{
  
                              type: "Feature",
                          
                              // both work
                              properties: _esri_graphic.attributes,
                              //properties: _graphic_toJson.attributes,
                      
                              geometry: {
                                          type: 'Point',
                                          // both works
                                          //coordinates: [_esri_graphic.geometry.longitude, _esri_graphic.geometry.latitude],
                                          coordinates: coord_4326,
                              }
                        
                          }]
              };
              break;
  
  
  
          case 'multipoint':
  
              console.log(' multipoint geometry ',  _esri_graphic.geometry )
    
    
              // 3857 to 4326
              var coord_3857 = _esri_graphic.geometry.points
              var coord_4326 = path3857_to_4326(coord_3857)
    
              _geojson_from_graphic = {
                "type": "FeatureCollection",
                "features": [{
    
                                type: "Feature",
                            
                                // both work
                                properties: _esri_graphic.attributes,
                                //properties: _graphic_toJson.attributes,
                        
                                geometry: {
                                            type: 'MultiPoint',
                                            // both works
                                            //coordinates: [_esri_graphic.geometry.longitude, _esri_graphic.geometry.latitude],
                                            coordinates: coord_4326,
                                }
                          
                            }]
                };
                break;
  
              
          case 'polyline':
  
          // 3857 to 4326
          var line_paths_coord_3857 = _esri_graphic.geometry.paths
  
          var array_depth = getArrayDepth(line_paths_coord_3857)
          console.log('line path depth  ',  array_depth )
          var line_paths_coord_4326
          var geometry_type = 'LineString'
  
          if (array_depth == 3){
              line_paths_coord_4326 = ring3857_to_4326(line_paths_coord_3857)
              geometry_type = 'MultiLineString'
          }
          
          if (array_depth == 2){
              line_paths_coord_4326 = path3857_to_4326(line_paths_coord_3857)
              geometry_type = 'LineString'
          }
  
  
  
  
          _geojson_from_graphic = {
            "type": "FeatureCollection",
            "features": [{
  
                          type: "Feature",
                      
                          // both work
                          properties: _esri_graphic.attributes,
                          //properties: _graphic_toJson.attributes,
                  
                          geometry: {
                            type: geometry_type, //'LineString', 'MultiLineString'
                            coordinates: line_paths_coord_4326,
                          }
                      
                        }]
          };
          break;
  
  
  
          case 'polygon':
  
           // 3857 to 4326
           var polygon_rings_coord_3857 = _esri_graphic.geometry.rings
           var array_depth = getArrayDepth(polygon_rings_coord_3857)
  
           console.log('polygon ring depth  ',  array_depth )
           var polygon_rings_coord_4326
           var geometry_type = 'Polygon'
  
           if (array_depth == 3){
            geometry_type = 'Polygon'
            polygon_rings_coord_4326 = ring3857_to_4326(polygon_rings_coord_3857)
           }
  
           if (array_depth == 4){
            geometry_type = 'MultiPolygon'
            polygon_rings_coord_4326 = multi_ring3857_to_4326(polygon_rings_coord_3857)
           }
  
  
          
          _geojson_from_graphic = {
            "type": "FeatureCollection",
            "features": [{
  
                          type: "Feature",
                      
                          // both work
                          properties: _esri_graphic.attributes,
                          //properties: _graphic_toJson.attributes,
                  
                          geometry: {
                            type: geometry_type,  //'Polygon','MultiPolygon'
                            coordinates: polygon_rings_coord_4326
                          }
                      
                        }]
          };
          break;
  
  
  
  
  
  
  
  
          default:
            
            break;
        }
  
        console.log('graphic To GeoJSON convert , this is after geojson ',  _geojson_from_graphic)
  
        
  
  
  
        // Adjust for multi-part geometries if needed
  
        // if (_esri_graphic.geometry.type.startsWith("Multi")) {
  
        //    _geojson_from_graphic.geometry.coordinates = _esri_graphic.geometry.coordinates.map(coordArray => coordArray);
  
        //  }
  
  
        return _geojson_from_graphic;
  
      }

      

/**/
//  - - - -  end  - - - -  download geojson   - - - - 
/**/


            




          function init_user_interface_event(){

           
            
   /**/
    // - - - - download geojson  - - - - 
    /**/
    $("#download_selectedFeatureOnMap_button").on("click", function() {
      saveJsonAsFile('selectedFeatureOnMap.geojson', _selected_graphic_in_geojson)
    });
  /**/
  //  - - - -  end  - - - -  download geojson   - - - - 
  /**/


                
 			         /**/
               //  --- click or hover   --- 
               /**/

                      if (param_click_or_hover){
                        click_or_hover = param_click_or_hover
                      }
                      // first time set radio
                      $("input[type=radio][name=click_or_hover_radio][value=" + click_or_hover + "]").prop('checked', true);
                      // radio change event
                      $("input[type='radio'][name='click_or_hover_radio']").change(function(){
                        click_or_hover = $("input[type='radio'][name='click_or_hover_radio']:checked").val();
                        console.log(" click_or_hover : --  ", click_or_hover);
                        update_url_parameter('clickorhover', click_or_hover);
                      });

               /**/
               //  --- end  ---  click or hover   --- 
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
               //  --- original color or yellow   --- 
               /**/

               if (param_original_color_or_yellow){
                original_color_or_yellow = param_original_color_or_yellow
              }

                // first time set radio
                $("input[type=radio][name=original_color_or_yellow_radio][value=" + original_color_or_yellow + "]").prop('checked', true);
                // radio change event
                $("input[type='radio'][name='original_color_or_yellow_radio']").change(function(){
                  original_color_or_yellow = $("input[type='radio'][name='original_color_or_yellow_radio']:checked").val();
                  console.log(" original_color_or_yellow : --  ", original_color_or_yellow);
                  update_url_parameter('original_color_or_yellow', original_color_or_yellow);


                  if (original_color_or_yellow == 'yellow'){
                    enforce_yellow_linepointpolygon(backgroundFeatureLayer)
                  } else {
                    backgroundFeatureLayer.renderer = native_renderer
                  }
              

                });

                /**/
                //  --- end  ---  original color or yellow   --- 
                /**/



                /**/
                //  --- side by side   --- 
                /**/

                $('#info_outline').hide()
                $('#close_info_outline_panel').on('click', function(event) {
                  // remove highlight graphic on layer view
              if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
              }
                    empty_info_outline_Tab()
                });
       
                /**/
                //   --- end  ---   --- side by side   --- 
                /**/

                
              }





                 


          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 


              function show_info_outline_Tab(___properties){
                console.log('show info window  properties : ', ___properties )

                
                // show object json string 
                //$('#info-window-div').html(JSON.stringify(___properties))

                
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))

                 /**/
                //  --- side by side   --- 
                /**/
                        
                // for embed at top, right and or left side info window, always scroll to top
                $("#info_outline").show()
                $('#flex_1').scrollTop(0); // build in scroll to top popup info window


                /**/
                //   --- end  ---   --- side by side   --- 
                /**/

              }

              
              function empty_info_outline_Tab(){
                

                /**/
                //  --- side by side   --- 
                /**/
                        
                $('#info_outline').hide();


                /**/
                //   --- end  ---   --- side by side   --- 
                /**/
                
                $('#info-window-div').html("")
              }





              // arcgis common adjustment
              function update_layer_name(___layer_url, ___layer_name){

                // without link
                //$('#layer-info-vertical').html('<strong style="font-size:12px;">' + ___layer_name + '</strong>')
                // with link
                $('#layer-info-vertical').html('<a  target="_blank" href="' + ___layer_url +'">' + ___layer_name + '</a>')


              }


              function update_statistic_info_vertical(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ total = '...' } // not available...
                
                $('#feature-on-map').html(rendered)
                $('#total-feature').html(total)
              }


              function update_statistic_info_vertical_calculation(rendered, total){

                console.log(' update statistic info only for calculation  - - - : - - - ', rendered, total  )

                var funding_on_map  = '...' 
                if (isNaN(rendered)){ 
                  $('#funding-on-map').html(funding_on_map)
                } else {

                  var funding_on_map = Math.floor(Math.random() * rendered)
                  var funding_on_map_formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(funding_on_map,)
                  $('#funding-on-map').html(funding_on_map_formatted + 'M')

                }
                
              }




               // enforce use yellow square for point, yellow line, yellow polygon              
               function enforce_yellow_linepointpolygon(_this_feature_layer){



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




              } 
              //    . . . end  . . . enforce use yellow square for point, yellow line, yellow polygon 
              /**/  



              // -- -- -- vertial adjustment  -- -- -- 
              /**/




 

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
               
              
                return view.whenLayerView(layer);
  })
 

// ************* end *************  view hover hittest  ************************








            
}); // require, everything should be inside







