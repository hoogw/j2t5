



    
     

            
              
            var start_point = ''
            var end_point = ''
            
            var click_lng
            var click_lat
            var lng_comma_lat
            var markerSymbol


              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer 
              var native_renderer
                       
              
 							                
                      

              // any document ready function is in here
              dom_ready_dojo();

             // component
              
              //self-run
              (async function init_map_component_event(){ 

                // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
                arcgisMap = document.querySelector("arcgis-map")
                            arcgisMap.center = [_center_long, _center_lat]
                            arcgisMap.zoom = _center_zoom

                // component // reactive Utils . watch (
                arcgisMap.addEventListener("arcgisViewChange", (event) => {

                      console.log('arcgis View Change event',  event)
                      update_center_latLngZoom_esri_component(arcgisMap)
            
                      if (layerView){
                                  layerView.queryFeatures({
                                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                                          geometry: arcgisMap.extent,  // for component 

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


                }); 
                  
                // component // view . when 
                // await arcgisMap.viewOnReady();
                arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                      // Once the map component is ready, get the feature layer and set the outFields.
                      // both works, await arcgisMap.viewOnReady();
                      createFeatureLayer()
                      init_feature_layer_view()

                      // must place after  createa feature layer, other wise view is not ready, will cause error
                      init_view_ui()
                      // if don't want google map, just delete this line
                      init_base_map_radio() 
                  
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                   
                              
                })

              })();

                 

/**/
//  --- naserver  (on top of feature layer)  --- 
/**/

            route_map_event()

            function route_map_event(){

              // component // view . on ( " click " , function(event){
                arcgisMap.addEventListener("arcgisViewClick", (event) => {
                            
                      console.log(' view * click * fire 1 time is fine ', event)

                      click_lng = event.detail.mapPoint.longitude
                      click_lat = event.detail.mapPoint.latitude
                      lng_comma_lat = click_lng + ',' + click_lat


                      if (start_point){

                              end_point = lng_comma_lat
                              $("#end").html(lng_comma_lat)
                              create_graphic_point(click_lng, click_lat, "end")

                              create_route(start_point, end_point)
                              start_point = ''
                        
                      } else {

                                end_point = ''
                                $("#end").html('')
                                arcgisMap.graphics.removeAll();
                                
                                clear_direction()

                              start_point = lng_comma_lat
                              $("#start").html(lng_comma_lat)
                              create_graphic_point(click_lng, click_lat, "start")
                      }

                }); // view . on . click


            }


/**/
//  --- end  ---  naserver  (on top of feature layer)  --- 
/**/




               
              

              // component
               function init_view_ui(){
              
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


          var layerView
          // component
          async function createFeatureLayer(){
          

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

              arcgisMap.map.add(backgroundFeatureLayer)

              layerView = await arcgisMap.whenLayerView(backgroundFeatureLayer);

               // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = backgroundFeatureLayer.renderer.clone();
                }
               

                // enforce use yellow square for point, yellow line, yellow polygon
                // must be here after featurelayer fully loaded
                enforce_yellow_linepointpolygon(backgroundFeatureLayer)

                // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                  if (zoom_to_1st_feature){
                                              // only zoom 1 time, first time, never zoom again
                                              zoom_to_1st_feature = false; 
                                              //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                              pan_to_real_location()
                  }//if 
          } 




     
      // component 
     // component must use e v e n t .  d e t a i l
     async function init_feature_layer_view(){
        
      }// function





            
      
                      
                 
        
      

      async function dom_ready_dojo(){



        
            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/

      

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

                         

                                                       
         init_user_interface_event()
         init_user_interface_for_component()
                          
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




            




          function init_user_interface_event(){
         

            

            $("#naserver-url-input").on("change", function(){
               input_naserver_endpoint_url = $("#naserver-url-input").val()
               console.log(' naserver-url-input change event ', input_naserver_endpoint_url)
               update_url_parameter('naserver', input_naserver_endpoint_url)
            });
            $("#naserver-url-input").on("keyup", function(){
               input_naserver_endpoint_url = $("#naserver-url-input").val()
               console.log(' naserver-url-input keyup event ', input_naserver_endpoint_url)
               update_url_parameter('naserver', input_naserver_endpoint_url)
            });





                
          }





                 


          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 


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








/**/
//  --- naserver  (on top of feature layer)  --- 
/**/


async function create_graphic_point(____lng, ____lat, ____type){
                 

          // First create a point geometry 
          var point = {
            type: "point", // autocasts as new Point()
            longitude: ____lng,
            latitude: ____lat
          };

          // Create a symbol for drawing the point

          if (____type == 'start'){

            
                      markerSymbol = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        style: "circle",
                        color: [39, 66, 245, 0.376],
                        size: "31px",  // pixels
                        outline: {  // autocasts as new SimpleLineSymbol()
                          color: [255,255,0,0.676],
                          width: 3  // points
                        }
                      };


          } else {


                      markerSymbol = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        style: "square",
                        color: "red",
                        size: "31px",  // pixels
                        outline: {  // autocasts as new SimpleLineSymbol()
                          color: [255,0,255],
                          width: 3  // points
                        }
                      };     

          }
          
          // Create a graphic and add the geometry and symbol to it
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });

          // Add the graphics to the view's graphics layer
          return arcgisMap.graphics.add(pointGraphic);

}





 const lineSymbol = {
      type: "simple-line", // autocasts as new SimpleLineSymbol()
      color: [226, 119, 40], // RGB color values as an array
      width: 4
    };

var polyline
var direction_html



function clear_direction(){
     $('#info-window-div').html("")
     $('#direction-details-steps').html("")
}

async function create_route(____start____point,   ____end____point){

  input_naserver_endpoint_url = $("#naserver-url-input").val()
  if (input_naserver_endpoint_url){

      // api https://developers.arcgis.com/rest/routing/route-service-direct/
      var route_solve_url = input_naserver_endpoint_url + "/Route/solve?f=pjson&outSR=4326" + "&stops=" +  ____start____point + ";" + ____end____point

      var route_response = await ajax_getjson_common(route_solve_url)

      var route_json = JSON.parse(route_response)

      console.log("route_response ", route_json)

      if (route_json.error){
        // error 
        $('#info-window-div').html(route_json.error.details[0] + "   " + route_json.error.message)
      } else {

        // display route feature line
        var route_feature_array = route_json.routes.features
        var route_feature

        for (let i = 0; i < route_feature_array.length; i++) {

            route_feature = route_feature_array[i]


            // Create a line geometry with the coordinates of the line
            polyline = {
              type: "polyline", // autocasts as new Polyline()
              paths: route_feature.geometry.paths
            };

            
              // Create the graphic
            const polylineGraphic = new Graphic({
              geometry: polyline, // Add the geometry created in step 3
              symbol: lineSymbol, // Add the symbol created in step 4
              attributes: route_feature.attributes // Add the attributes created in step 5
            });

            // Add the graphic to the view's default graphics view
            // If adding multiple graphics, use addMany and pass in the array of graphics.
            arcgisMap.graphics.add(polylineGraphic);

        }//for 






        // display direction text
        var route_direction_array = route_json.directions
        var route_direction
        var direction_array

        for (let j = 0; j < route_direction_array.length; j++) {
          route_direction = route_direction_array[j]

          direction_html =  '<fieldset>'
          direction_html += '<legend>'
          direction_html +=   'Route : ' +  route_direction.routeId + '. ' + route_direction.routeName
          direction_html += '</legend>'

          direction_html +=  '<span>Driving Time:</span><span id="drive-time" style="font-weight:900;">' + route_direction.summary.totalDriveTime.toFixed(2) + '</span> mins'
          direction_html +=  '&nbsp;&nbsp;&nbsp;&nbsp;'
          direction_html +=  '<span>Distance:</span><span id="distance" style="font-weight:900;">' + route_direction.summary.totalLength.toFixed(2) + '</span> miles'
          //direction_html +=  '<br>'
          
          direction_array = route_direction.features
          for (let d = 0; d < direction_array.length; d++) {
            direction_html +=  '<br>'
            direction_html += '<span id="distance" style="font-weight:900;">' + d + '</span>' + '. ' + direction_array[d].attributes.text

          }//for

          direction_html += '</fieldset>'

          $('#direction-details-steps').html(direction_html)
                  
        }//for 

      }//if 



  } else { 
              alert('you must input naserve endpoint url')
  }//if 

}

  
 
/**/
//  --- end  ---  naserver  (on top of feature layer)  --- 
/**/







