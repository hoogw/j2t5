




var map;
var _geojson_object;
var _empty_geojson_object = {type: "FeatureCollection", features: []}




var _search_keyword = ''
var _search_keyword_data_array = _search_keyword.split(' ');

var search_result_feature_array_global_var = [];



var _timeout = 60000; 


var _base_map_type = 'streets' // for apple bing, not for google
var _first_time_load = true;








                //  ---------- abort ajax call   ---------- 

                    /* 
                          ajax.abort can not use async-await, must process response inside success function
                    
                          arcgis server by default will output max 2000 feature per query. so if query more than 2000 feature, you will only get 2000. you will not get more than 2000 feature all time.  

                    */


                        // abort  
                        var data_count_only;
                        var data_only; 
                        var  ___XMLHttpRequest_count_only;
                        var  ___XMLHttpRequest_data;

                        
                    
                        // not abort
                        var search_layer_result
                //   ---------- end   ----------  abort ajax call   ---------- 






var _envelope;
var _url_returncountonly;
var _url_returngeojson;

var _current_geojson_layer;
var _last_geojson_layer;
var search_layer_result_geojson;


var info_panel_lock = false;




// not have stroke opacity, fill opacity, so must specify opacity here.
var highlighted_color_stroke = 'rgba(255,0,255, 0.7)'  // VIOLET
var highlighted_color_fill = 'rgba(255,0,255, 0.2)'  // VIOLET












   

            // ajax.abort - can not use async-await 
            function ajax_GeoJSON(_apiURI_returncountonly, _apiURI) {
                


              
            //  ***** abort previously  ajax call   ***** 
                 if (___XMLHttpRequest_data){
                   if (typeof ___XMLHttpRequest_data.abort !== "undefined"){

                     console.log('___XMLHttpRequest_data - xhr ', ___XMLHttpRequest_data)

                     // abort will cause jsonp call back error(normal, no need fix) :  Uncaught ReferenceError jqueryxxxxx_xxxxx  is not defined
                     ___XMLHttpRequest_data.abort()  


                   }
                 }



                 // abort previously all ajax call
                 if (___XMLHttpRequest_count_only){
                   if (typeof ___XMLHttpRequest_count_only.abort !== "undefined"){

                     console.log('___XMLHttpRequest_count_only - xhr ', ___XMLHttpRequest_count_only)

                     // abort will cause jsonp call back error(normal, no need fix) :  Uncaught ReferenceError jqueryxxxxx_xxxxx  is not defined
                     ___XMLHttpRequest_count_only.abort()
                   }
                 }
            //  ******* end ***** abort previously  ajax call   *****  





       
         $('#error_message').empty();




          console.log('ajax url--count only --> : ', _apiURI_returncountonly);
          console.log('ajax url-- with-geometry ---> : ', _apiURI);

          
          



          // count only

          /**/


          try{



                  // test only
                  //throw ' ++++++++ test only ++++++++ jsonp failed';

          // jsonp
            $.ajax({
                                              timeout: _timeout,
                                              type: 'GET',
                                              dataType: 'jsonp',
                                              data: {},

                                              beforeSend:  function( jqXHR, settings ){

                                                ___XMLHttpRequest_count_only = jqXHR
                                              },
                                            

                                              url: _apiURI_returncountonly,
                                              error: function (jqXHR, textStatus, errorThrown) {
                                                  
                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                  console.log(' count only , jsonp  error  : ', _error_status);

                                                

                                              },
                                              success: function (data) {


                                                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                if (typeof data === 'object') {
                                                    // is object
                                                    data_count_only = data
                                                } else {
                                                    // is string
                                                    data_count_only = JSON.parse(data)
                                                }
                                                
                                                
                                                show_count(data_count_only)
                                                  
                                              }
                                          });   
          
                                          
                                          

          } catch(jsonp_failed) {

              
              console.log('count only - jsonp failed ', jsonp_failed)

              try{



                                  // test only
                                  //throw ' ++++++++ test only ++++++++ cors failed'; 

                      // cors
                          $.ajax({
                                                        timeout: _timeout,
                                                        type: 'GET',
                                                      


                                                        beforeSend:  function( jqXHR, settings ){

                                                          ___XMLHttpRequest_count_only = jqXHR
                                                        },



                                                        url: _apiURI_returncountonly,
                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                            
                                                            var _error_status = textStatus + ' : ' + errorThrown;         
                                                            console.log('count only - cors error  : ', _error_status);

                                                        

                                                        },
                                                        success: function (data) {

                                                            // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                            if (typeof data === 'object') {
                                                                // is object
                                                                data_count_only = data
                                                            } else {
                                                                // is string
                                                                data_count_only = JSON.parse(data)
                                                            }
                                                            
                                                            
                                                            show_count(data_count_only)
                                                          
                                                        }
                          }); 



                      

              } catch (cors_failed){

                                          console.log('count only - cors failed ', cors_failed)

                                          
                                          try {

                                            // proxy
                                            // --------- add proxy  ---------
                                            var _apiURI_returncountonly_proxy = proxyurl +  _apiURI_returncountonly

                                            
                                            $.ajax({


                                                          timeout: _timeout,
                                                          type: 'GET',
                                                        


                                                          beforeSend:  function( jqXHR, settings ){

                                                            ___XMLHttpRequest_count_only = jqXHR
                                                          },



                                                          url: _apiURI_returncountonly_proxy,
                                                          error: function (jqXHR, textStatus, errorThrown) {
                                                              
                                                              var _error_status = textStatus + ' : ' + errorThrown;         
                                                              console.log('count only - proxy error  : ', _error_status);

                                                          

                                                          },
                                                          success: function (data) {

                                                            // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                            if (typeof data === 'object') {
                                                                // is object
                                                                data_count_only = data
                                                            } else {
                                                                // is string
                                                                data_count_only = JSON.parse(data)
                                                            }
                                                            
                                                            
                                                            show_count(data_count_only)
                                                          
                                                        }
                                          }); 



                                          


                                          } catch(proxy_failed) {

                                            console.log('count only - proxy failed ', proxy_failed)

                                          } // catch proxy

              }// catch cors

          }// catch jsonp










            

            
            // data

              try{



                  // test only
                  //throw ' ++++++++ test only ++++++++ jsonp failed';
                    
                    // jsonp  
                    $.ajax({  

                                      timeout: _timeout,
                                      type: 'GET',
                                      dataType: 'jsonp',
                                      data: {},
                                      url: _apiURI,



                                    beforeSend:  function( jqXHR, settings ){

                                      ___XMLHttpRequest_data = jqXHR
                                    },


                                      error: function (jqXHR, textStatus, errorThrown) {
                                          
                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                console.log('data - jsonp, error  : ', _error_status);

                                      },
                                      
                                        success: function (data) {



                                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                          if (typeof data === 'object') {
                                              // is object
                                              data_only = data
                                          } else {
                                              // is string
                                              data_only = JSON.parse(data)
                                          }
                                        
                                        
                                            
                                          add_data_maps(data_only)  
                                             
                                                            
                                      }
                    });  
            
              
                    } catch(jsonp_failed) {



                      console.log('data - jsonp, failed ', jsonp_failed)


                      
                      try{
                      

                          // test only
                          // throw ' ++++++++ test only ++++++++ cors failed'; 
                        
                        // cors
                        $.ajax({
                                                          timeout: _timeout,
                                                          type: 'GET',
                                                        
                                                          url: _apiURI,



                                                          beforeSend:  function( jqXHR, settings ){

                                                            ___XMLHttpRequest_data = jqXHR
                                                          },




                                                          error: function (jqXHR, textStatus, errorThrown) {
                                                              
                                                              var _error_status = textStatus + ' : ' + errorThrown;         
                                                              console.log('data - cors, error  : ', _error_status);

                                                            

                                                          },
                                                          success: function (data) {
                                                            
                                                            

                                                                              // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                                              if (typeof data === 'object') {
                                                                                  // is object
                                                                                  data_only = data
                                                                              } else {
                                                                                  // is string
                                                                                  data_only = JSON.parse(data)
                                                                              }
                                                                            
                                                                            
                                                                              
                                                                              add_data_maps(data_only)  
                                                                                 
                                                                                              
                                                                          }
                                                      }); 



                      


                    } catch (cors_failed){

                      console.log('data - cors failed ', cors_failed)

                      try {

                                // proxy
                                // --------- add proxy  ---------
                                var _apiURI_proxy = proxyurl +  _apiURI
                                
                                $.ajax({
                                  timeout: _timeout,
                                  type: 'GET',

                                  url: _apiURI_proxy,



                                  beforeSend:  function( jqXHR, settings ){

                                    ___XMLHttpRequest_data = jqXHR
                                  },




                                  error: function (jqXHR, textStatus, errorThrown) {
                                      
                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                      console.log('data - cors, error  : ', _error_status);

                                    

                                  },
                                  success: function (data) {
                                                            
                                                            

                                                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                          if (typeof data === 'object') {
                                                              // is object
                                                              data_only = data
                                                          } else {
                                                              // is string
                                                              data_only = JSON.parse(data)
                                                          }
                                                        
                                                        
                                                          
                                                          add_data_maps(data_only)  
                                                             
                                                                          
                                                      }
                                  }); 



                                



                      } catch(proxy_failed) {


                        console.log('data - proxy failed ', proxy_failed)

                    } // catch proxy
                            

                  } // catch cors


            } // catch jsonp
                




      


            }



            // not use, keep here, just as example fetch.abort
            function fetch_GeoJSON(_apiURI_returncountonly, _apiURI) {
      


              if (controller) {
                controller.abort()
              }

              controller = new AbortController();
              signal = controller.signal;




                
                  $('#error_message').empty();




          console.log('fetch url--count only --> : ', _apiURI_returncountonly);
          console.log('fetch url-- with-geometry ---> : ', _apiURI);

          
          
          // #####  1  ##### 
          // count only
          

          fetch(_apiURI_returncountonly, {signal:signal})
        // fetch(_apiURI_returncountonly, {signal})  // is wrong, failed to abort. 
          
              .then(function(response) {

                  return response.json()  // is NOT a real json, it is a Promise object, must use next then to resolve it. 
              })

              .then(function(data) {
            
                

                                  console.log('response.count_only --> : ', data);
                
                                          show_count(data)


                                          })

          
              .catch(function(e) {

                                            
                              console.log('fetch count error : ',e)           
                }); 
          
                                          
        

            

            
            //  #####  2  #####  
            // get real data
                  
                    
            fetch(_apiURI,{signal:signal})
          
                      .then(function(response) {
                        return response.json()  // is NOT a real json, it is a Promise object, must use next then to resolve it. 
                      })

                      .then(function(data) {
                    
                    
                                              

                                              console.log('response.data --> : ', data);


                                                  add_data_maps(data)  
                                                   
                                                  
                                                


                                                  })
                  
                      .catch(function(e) {

                                                    
                                      console.log('fetch data error : ',e) 
                                                            
                  }); 
                

      

            }






/**/
                // ------- apple map only  -------
                /**/       
                
                          

                          function add_data_maps(data) {

                                                                      
                            // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                            //is already a plain JavaScript object; no need to try to parse it.
                            var arcgis_feature_Set
                            if (typeof data === 'object') {
                                // is object
                                arcgis_feature_Set = data
                            } else {
                                // is string
                                arcgis_feature_Set = JSON.parse(data)
                            }


                            arcgis_feature_Set = reduce_feature_count(arcgis_feature_Set, limit)  


                            _current_rendering_feature = arcgis_feature_Set.features.length
                            display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)


                            // parse an ArcGIS feature set (Geometry) to GeoJSON
                                            
                            // Terraformer.ArcGIS.convert(geoJSON, options),  options default is objectid, FID, if you want use OID, must specify
                            //http://terraformer.io/arcgis-parser/#arcgisconvert
                            //_geojson_object = Terraformer.ArcGIS.parse(arcgis_feature_Set.features[0])
                            _geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set)

                                      
                            console.log('test ArcgisToGeojsonUtils exist ', ArcgisToGeojsonUtils)
                                
                              
                                    
                          //---------------- apple only add new geojson, then remove last geojson --------------------
                          /**/
              
                                // remove all previous overlays, warning: each polygon is a overlay, each point or line is a overlay,
                                /**/
                                // for polygon and line 
                                map.removeOverlays(map.overlays);
                                // for point only
                                delete_all_apple_annotation();  // remove all annotation then add back search place annotation.

                // remaining content will be deleted
                empty_info_outline_Tab()
              
              
                                console.log(' geojson object --> ', _geojson_object)
              
                                // both works, the same, this is apple's mapkit.importGeoJSON   https://developer.apple.com/documentation/mapkitjs/mapkit/2974044-importgeojson
                                //mapkit.importGeoJSON(_geojson_object, geoJSONParserDelegate);
                                // in use, manually convert geojson to apple overlay, annotation,
                                geojson_to_feature_withoutHoverClickEvent(_geojson_object)
              
                          //------------------------end add new geojson, then remove last geojson------------------------- ---------------
              
              
              
                          }


                  /**/
                  // --- end --- apple map only -------
                  /**/


          

                



// must have async, for later use await
async function initMap() {


              init_global_var_from_node();
              console.log(' root url ', _url)
            
              // for search feature attributes table
              // need async await
              await get_feature_attributes(_layer_id);

              
            
              get_total_count()
              console.log('####### layerID ########', _layer_id)

              display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)

            
              

            /**/
            //  ---  apple poi    --- 
            /**/
            init_poi_ui_before_map_load()
            /**/
            //  --- end  ---  apple poi    --- 
            /**/

        
            /**/
            // ------- apple map only  -------
            /**/
            
                      //not use, but keep,  to avoid hard code static token in javascript file, you can choose this local signed token each time use it. you have to setup sever endpoint to generate token.
                      //await setupMapKitJs_signedLocallyShortTermToken();

                      // in use, long-term static token, token was hard coded in javascript file
                      await setupMapKitJs_staticLongTermToken();

                      console.log(' init center lat ',  _center_lat)
                      console.log(' init center long ',  _center_long)

                      map = new mapkit.Map("map", 
                                                        { 
                                                          center: new mapkit.Coordinate(_center_lat,_center_long),
                                                          mapType: mapkit.Map.MapTypes.Hybrid,  // Standard,Satellite,MutedStandard    https://developer.apple.com/documentation/mapkitjs/map/maptypes/hybrid
                                                          showsUserLocationControl: true
                                                        });

                      // must allow wheel to zoom,   by default it is "shift + wheel" to zoom,   https://developer.apple.com/forums/thread/105612?login=true&page=1#744206022   https://gist.github.com/Mwni/0faf2cc41032c30ad6d492998dee8174                           
                      map._allowWheelToZoom = true;


                      // as soon as map is available, before zoom to location, add event listener
                      add_map_listener_idle()
                      // must after add add map listener idle,  region-change-end event, so this event can be fired if panto=0 
                      set_latlongZoom_for_apple_only(_center_lat, _center_long, _center_zoom)



            /**/
            // --- end --- apple map only -------
            /**/


            // because I use default-xxx.js to make different model, 
            init_default_js()
            // some function need in initMap, 
            // will be in this function, this function can be empty
            

            

            //  - -- - apple basemap  - -- -
            add_basemap_tile_for_apple()
            //  --- end  ---   apple basemap  - -- -


            init_user_interface_event()


            // apple map only, 
            add_search_place();


            zoom_to_layer() // reverse pan-to-your-current-location

            
            //console.log('place : ' + _place)   
            console.log('rest api url: ' + _url)   
                    
                   // mouseover geojson event
                   add_mapdata_listener()
                    
                
                    //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
                    if (need_pan_to_real_location) {
                                  pan_to_real_location();
                                  need_pan_to_real_location = false;
                                  update_url_parameter('panto', 0)
                    } 

                  
                          
}






