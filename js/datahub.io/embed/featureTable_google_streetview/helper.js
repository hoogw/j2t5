 
 









 


    
               

                    function reduce_feature_count(___arcgis_feature_Set, ___reduced_feature_count){
                
                      //  console.log('___arcgis_feature_Set', ___arcgis_feature_Set)

                        var __features_array = ___arcgis_feature_Set.features
                  

                        if ( __features_array.length > ___reduced_feature_count) {

                          __features_array.length = ___reduced_feature_count

                        }
                      

                        ___arcgis_feature_Set.features = __features_array;



                        console.log(' after reduced feature count === ', ___arcgis_feature_Set.features.length)

              return ___arcgis_feature_Set



                    

                    }  








                                      
            function update_url_parameter(_field, _value){
                                      
              var _____searchParams = new URLSearchParams(window.location.search);

              if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
              //if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                       // remove this param from uRL
                          _____searchParams.delete(_field);
                          console.log("delete url parameter: _field", _field );
              } else {
                      // update this param from uRL
                          _____searchParams.set(_field, _value);
                          console.log("update url parameter: _field _value", _field + " + "+ _value);
              }

              // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
              //window.location.search = searchParams.toString();

              // instead avoid reload
              var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
              history.pushState(null, '', _____newRelativePathQuery);

             


            } 




               /**/      
               // ========= setting tab ==============   
                          
                  function set_map_style(____strokeColor, ____strokeWeight, ____fillColor , ____circle_radius){

                                  map.data.setStyle({
                                                          // icon only affect point 
                                                          icon        : {
                                                                            path: google.maps.SymbolPath.CIRCLE,
                                                                            scale: ____circle_radius,
                                                                            strokeColor: ____strokeColor, 
                                                                            strokeOpacity: 0.9,  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                                                            strokeWeight: ____strokeWeight
                                                                          },

                                                          // affect polygon and polyline  
                                                          fillOpacity: _default_fillOpacity,   // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                                          fillColor: ____fillColor,
                                                          strokeColor: ____strokeColor,
                                                          strokeWeight: ____strokeWeight
                                    
                                });
                  }

                  function update_map_style(){

                      _default_strokeColor = $('#symbol_color').val();
                      _default_strokeWeight = $('#line_width_range').val();
                      _default_fillColor = $('#fill_color').val();
                      _default_pointRadius = $('#point_radius_range').val();
                      console.log('line stroke symbol color change to  .... ... .. .',  _default_strokeColor)
                      console.log('line stroke symbol width change to  .... ... .. .',  _default_strokeWeight)
                      console.log('polygon fill color change to  .... ... .. .',  _default_fillColor)
                      console.log('point size change to  .... ... .. .',  _default_pointRadius)

                      set_map_style(_default_strokeColor, _default_strokeWeight, _default_fillColor, _default_pointRadius)
                  }

               // ========= end =========  setting tab ==============       



  /**/


            //  -------------------  - zoom 2 this layer -  ------------------- 


                                                
            async function zoom2thisLayer(_this_layer_id){

              console.log(' zoom to this layer-id ', _this_layer_id)

                    
              /* 
                  
                  if the layer have feature, just get a few sample feature as real location

                  if the layer is image only, no feature, get 0 sample. 
                                should use extend info as real location.

                
              */

                                

                                        var _use_thisLayer_sample_feature_result = await use_thisLayer_sample_feature(_this_layer_id)
                                        console.log('  use thisLayer sample feature result ', _use_thisLayer_sample_feature_result)

                                        if (_use_thisLayer_sample_feature_result) {
                                                
                                                console.log('successfully use thisLayer sample feature to improve best viewing, zoom-in to single feature level  - -> - - > : ', _center_lat, _center_long, _center_zoom )

                                        } else {

                                                console.log('thisLayer maybe have image only, no feature, get 0 sample.  ::::::  ', _center_lat, _center_long, _center_zoom )



                                                //  use extent ,  fast, only need 2 very quick ajax call, 1 for layer_json, 2 for mapserver_json 
                                                // after 2 quick ajax call, in the projection process, most of time, use projection method, 'default' or 'esri_proj', no ajax call, no await.  Only 'read_from_string'+proj4  need await, ajax call.
                                                // how ever, extent may not have best result, because it is too far away, we use sample feature to improve zoom in to single feature level.
                                                await use_thisLayer_extent(_this_layer_id)
                                        }


            } 




        async function use_thisLayer_sample_feature(_thislayer_id){


              


              //=============== in use :  &where=1=1 ===========================



                                        /*

                                            improvement: 
                                        
                                            https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm

                                            sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                            example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0


                                            if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10


                                            since we not sure, we can only try both, if 100 not work, then get default 2000 

                                        */     




              var _url_thislayer_sample_json = _url + '/'+  _thislayer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1';


              /*  To simplify, skip pagination 

                    if (_supportsPagination){

                    
                            _url_sample_json = _url + '/'+  _layer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1&resultOffset=0&resultRecordCount=' + _sample_count;

                    }
              */


                
    
            var _thislayer_sample_json = {};


          // console.log('url thislayer sample json url  supportsPagination : ',_supportsPagination,  _url_sample_json)
                                      


            



            
            try {


                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';


                  // jsonp 


                  var response_string =  await $.ajax({

                      // large data take long long time , so should not time out, let it run until get it
                      //timeout: _timeout,

                        type: 'GET',
                        dataType: 'jsonp',
                        data: {},
                        url: _url_thislayer_sample_json,
                        error: function (jqXHR, textStatus, errorThrown) {
                          
                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                console.log('ajax error  + ', _error_status);
                                              


                        },
                        success: function (data) {

                          console.log('zoom to this layer , use sample feature --> jsonp --> success  --> ');
                            
                        
                        }
                      });  // await



              
              } catch(jsonp_failed) {


                    console.log('zoom to this layer  , use sample feature,  --> jsonp failed !!!!!!', jsonp_failed);

                  try {

                                



                                  // test only
                                  // throw ' ++++++++ test only ++++++++ cors failed'; 
                  
                                  // cors
                                  var response_string =  await $.ajax({

                                                                        // large data take long long time , so should not time out, let it run until get it
                                                                      // timeout: _timeout,


                                                                          type: 'GET',
                                                                          
                                                                          url: _url_thislayer_sample_json,
                                                                          error: function (jqXHR, textStatus, errorThrown) {
                                                                            
                                                                            var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                  console.log('ajax error  + ', _error_status);
                                                                                              
                                                  
                                                  
                                                                          },
                                                                          success: function (data) {

                                                                            console.log('zoom to this layer  , use sample feature --> cors --> success  --> ');
                          
                                                                          }
                                                                        });  // await




                                  
                    
                    } catch(cors_failed) {

                                  console.log('zoom to this layer  , use sample feature,  --> cors failed !!!!!!', cors_failed);

                                  try {

                                            

                                            // proxy
                                            // --------- add proxy  ---------
                                            var _url_thislayer_sample_json_proxy = proxyurl +  _url_thislayer_sample_json

                                            var response_string =  await $.ajax({

                                                                                      // large data take long long time , so should not time out, let it run until get it
                                                                                      // timeout: _timeout,


                                                                                      type: 'GET',
                                                                                      
                                                                                      url: _url_thislayer_sample_json_proxy,
                                                                                      error: function (jqXHR, textStatus, errorThrown) {
                                                                                        
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                              console.log('ajax error  + ', _error_status);
                                                                                                          
                                                              
                                                              
                                                                                      },
                                                                                      success: function (data) {
                                                                                        console.log('zoom to this layer  , use sample feature --> proxy --> success  --> ');
                          
                                                                                      }
                                            });  // await




                                          



                                  } catch(proxy_failed) {


                                    console.log('zoom to this layer  , use sample feature,  --> proxy failed !!!!!!', proxy_failed);



                                  } // catch proxy
                            

                    } // catch cors


              } // catch jsonp




              // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
              if (typeof response_string === 'object') {
                  // is object
                  _thislayer_sample_json = response_string
              } else {
                  // is string
                  _thislayer_sample_json = JSON.parse(response_string)
              }

              


              console.log(' >>>>>>>> this layer sample json  feature array [] >>>>>>  ', _thislayer_sample_json.features);



            if (
                  (typeof (_thislayer_sample_json.features)  == 'undefined' )
                  || (typeof (_thislayer_sample_json.error) !== 'undefined' )
                ){

                      /*
                          raster layer do not have sample feature, will return error like this: 

                            {  error: {code: 400, message: "Invalid or missing input parameters.", details: []} }
                      
                            features[] array is 'undefined'
                                        //return false;
                      */

                  

            } else {




                    
                      // parse an ArcGIS feature set (Geometry) to GeoJSON
                                    //console.log(' before convert, arcgis json ', arcgis_feature_Set) 
                                      
                      // Terraformer does not support Feature Set, only support single arcgis geometry.
                      // sometime, they use 'OBJECTID_1' instead of default 'OBJECTID', you must specify it, 
                                    // otherwise, geojson id will not match object-id, 
                                    // or geojson id is same number or null, cause failed to show geojson on map 
                                    //_geojson_object = Terraformer.arcgisToGeoJSON(arcgis_feature_Set,'OBJECTID_1')
                      var _sample_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(_thislayer_sample_json, objectid_field_name)







                      //  "type": "FeatureCollection"

                      var _sample_coordinates;

                      // array of features for test
                      var _sample_feature =[]; 


                      if (_sample_geojson_object.type.toLowerCase() ===  "featurecollection") 
                      {
                        _sample_feature = _sample_geojson_object.features

                      } else if (_sample_geojson_object.type.toLowerCase() ===  "feature") {

                        // only 1 element 
                        _sample_feature.push(_sample_geojson_object)
                      }



                      console.log ('sample feature array[] ', _sample_feature )






                      if (_sample_feature.length > 0 ) {


                              // layer have feature, just get a few sample feature as real location


                              /**/

                                            // arcgis &where=1=1 by default have 1k or 2k record
                                            for (var s = 0; s < _sample_feature.length; s++) {
                
                                                    // if anything wrong, try next sample feature
                                                    try {
                
                                                                if (_sample_feature[s].geometry.type.toLowerCase() ===  "geometrycollection") 
                                                                {
                                                                  _sample_coordinates = _sample_feature[s].geometry.geometries[0].coordinates;
                                                                } else  {
                
                                                                  _sample_coordinates = _sample_feature[s].geometry.coordinates;
                                                                }
                
                                                                      console.log (' sample coordinates .....sample feature[',  s,  ']' , _sample_coordinates )
                
                                                                      // "type": "Point",  "coordinates": [100.0, 0.0]
                                                                      // "type": "LineString",  "coordinates": [  [101.0, 0.0], [102.0, 1.0]   ]
                                                                      //  "type": "Polygon",  "coordinates": [  [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ]
                                                                            
                
                                                                      // [long, lat]
                                                                      var _sample_lat_lng_array_pair = _recursive_nested_array(_sample_coordinates);
                                                                      console.log ('_sample_lat_lng_array_pair ++++++ ', _sample_lat_lng_array_pair )
                                                                        
                
                                                                      if ((_sample_lat_lng_array_pair[1] > -90) &&
                                                                          (_sample_lat_lng_array_pair[1] < 90) &&
                                                                            (_sample_lat_lng_array_pair[0] < 180) &&
                                                                              (_sample_lat_lng_array_pair[0] > -180))
                                                                              { 
                
                                                                                    _center_lat = _sample_lat_lng_array_pair[1];
                                                                                    _center_long = _sample_lat_lng_array_pair[0];
                                                                                    
                                                                                    
                                                                                    
                                                                                    console.log('layer have feature, just get a few sample feature as real location,   first_lat_long - -> - - > : ', _center_lat, _center_long, _center_zoom )

                                                                                    panto_googlemaps( _center_lat, _center_long, _center_zoom )  
                                                                                    
                                                                                    // sample feature success  
                                                                                    return true  //exit function
                                                                        
                                                                              } // if   
                
                
                
                                                    } catch(error_get_sample_feature){
                
                                                              console.log ('  if anything wrong, try next sample feature ', error_get_sample_feature )
                
                
                                                                      //"jumps over" one iteration in the for loop
                                                                      continue;
                
                                                    } // try              
                
                                                                  
                                            }// for

                                            

        
                        } else {

                                
              
                                    // sample feature failed  
                                    console.log( ' sample feature failed  ')
                                    return false

                        } // if

                


              } // if error       
                      

        } 




              async function use_thisLayer_extent(_thislayerID){



                /**/

                var _url_layer_extent = _url + '/'+  _thislayerID + '?f=pjson';
                var _url_server_extent = _url  + '/'   +  '?f=pjson';             // could be 'map server' or 'image server'


                
              

                console.log( '_url_layer_extent , ', _url_layer_extent)
                console.log( '_url_server_extent, ', _url_server_extent)



                

                var _layer_extent_json
                var _server_extent_json  // could be 'map server' or 'image server'





                //  layer extent
                try {
                  


                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';

                  // jsonp 


                  var response_string =  await $.ajax({

                                                
                                                    type: 'GET',
                                                    dataType: 'jsonp',
                                                    data: {},

                                                    url:_url_layer_extent,



                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                      
                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                            console.log('ajax error  + ', _error_status);
                                                                          


                                                    },
                                                    success: function (data) {

                                                      console.log('use extent,  layer json  --> jsonp success ');
                                                        
                                                      
                                                    }
                                                  });  // await

                    } catch(jsonp_failed) {


                          console.log('use extent,  layer json --> jsonp failed !!!!!!', jsonp_failed);

                          try {
                            // cors

                            // test only
                            // throw ' ++++++++ test only ++++++++ cors failed'; 

                            var response_string =  await $.ajax({

                                                              

                                                                  type: 'GET',
                                                                  
                                                                  url:_url_layer_extent,

                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                    
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                          console.log('ajax error  + ', _error_status);
                                                                                        
                                          
                                          
                                                                  },
                                                                  success: function (data) {
                                                                    console.log('use extent,  layer json  -->  --> cors  --->   success  ');
                                                                      
                                                                    
                                                                  }
                                                                });  // await

                              
                            } catch(cors_failed) {
                                                                
                          
                                        console.log('use extent,  layer json  --> --> cors failed !!!!!!', cors_failed);


                                        try {
                                          // proxy

                                          // --------- add proxy  ---------
                                          var _url_layer_extent_proxy = proxyurl + _url_layer_extent


                                          var response_string =  await $.ajax({
  

                                                                                  type: 'GET',
                                                                                  
                                                                                  url:  _url_layer_extent_proxy,

                                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                                    
                                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                          console.log('ajax error  + ', _error_status);
                                                                                                        
                                                          
                                                          
                                                                                  },
                                                                                  success: function (data) {
                                                                                    console.log('use extent,  layer json  -->  --> proxy  --->   success  ');
                                                                                      
                                                                                    
                                                                                  }
                                                                                });  // await


                                        

                                        } catch(proxy_failed) {

                                          console.log('use extent,  layer json  --> --> proxy failed !!!!!!', proxy_failed);



                                        } // catch proxy
                            

                          } // catch cors


                    } // catch jsonp



                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                    if (typeof response_string === 'object') {
                        // is object
                        _layer_extent_json = response_string
                    } else {
                        // is string
                        _layer_extent_json = JSON.parse(response_string)
                    }


                    





                //  mapserver extent
                try {
                  


                    // test only
                    // throw ' ++++++++ test only ++++++++ jsonp failed';

                    // jsonp 


                var response_string =  await $.ajax({

                                                
                                                    type: 'GET',
                                                    dataType: 'jsonp',
                                                    data: {},

                                                    url:_url_server_extent,



                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                      
                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                            console.log('ajax error  + ', _error_status);
                                                                          


                                                    },
                                                    success: function (data) {

                                                      console.log('use extent,  server json  --> --> jsonp success ');
                                                        
                                                        
                                                    }
                                                  });  // await

                    } catch(jsonp_failed) {


                          console.log('use extent,  server json --> jsonp failed !!!!!!', jsonp_failed);

                          try {
                            
                          
                                        // test only
                                        // throw ' ++++++++ test only ++++++++ cors failed'; 

                                        // cors
                                        var response_string =  await $.ajax({

                                                                          

                                                                              type: 'GET',
                                                                              
                                                                              url:_url_server_extent,

                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                
                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                    
                                                      
                                                      
                                                                              },
                                                                              success: function (data) {

                                                                                console.log('use extent,  server json  --> cors  --->    success  ');
                                                                                  
                                                                              }
                                                                            });  // await



                                                                            
                                      
                                        



                              } catch(cors_failed) {


                                      console.log('use extent,  server json --> cors failed !!!!!!', cors_failed);

                                      try {
                                        // proxy

                                        // --------- add proxy  ---------
                                        var _url_server_extent_proxy = proxyurl + _url_server_extent

                                                  var response_string =  await $.ajax({
                                                                                              type: 'GET',
                                                                                              
                                                                                              url:  _url_server_extent_proxy,

                                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                                
                                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                                    
                                                                                              },
                                                                                              success: function (data) {
                                                                                                console.log('use extent,  server json  --> proxy  --->    success  ');
                                                                                                  
                                                                                                
                                                                                              }
                                                  });  // await



                                        
  
                                                



                                      } catch(proxy_failed) {


                                        console.log('use extent,  server json --> proxy failed !!!!!!', proxy_failed);

                                      } // catch proxy
                            

                            } // catch cors
                              
                              
                  } // catch jsonp





                      
                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                if (typeof response_string === 'object') {
                    // is object
                    _server_extent_json = response_string
                } else {
                    // is string
                    _server_extent_json = JSON.parse(response_string)
                }



                var _zoom_beforeLayerExtent
                var _zoom_afterLayerExtent
                var _zoom_afterServerExtent
                
                var _zoomto_status = false

                var _layer_extent_object
                var _server_extent_object  // could be 'map server' or 'image server'

              // 'layer' json    only have  'extent'
              // 'map server'   json  have  'initExtent'  'fullExtent'
              // 'image server' json  have  'extent'      'initExtent'  'fullExtent'


                // try layer extent first,  

                if (_layer_extent_json.extent) {
                                                    _layer_extent_object = _layer_extent_json.extent
                } else if (_layer_extent_json.initialExtent) {
                                                    _layer_extent_object = _layer_extent_json.initialExtent
                } else if (_layer_extent_json.fullExtent) {  
                                                    _layer_extent_object = _layer_extent_json.fullExtent
                } else {

                        // ('image server' do not have layer) will end up here
                        console.log( ' zoom to layer extent failed, layer json do not have  - extent - ')
                        _zoomto_status = false
                }


                if (_layer_extent_object) {
                                                _zoom_beforeLayerExtent = map.getZoom()
                                                console.log( '_zoom_beforeLayerExtent ......... ', _zoom_beforeLayerExtent)
                                                                                                            
                                                // will map.fitBound(),  must use await because this function call ajax, need to wait until resolve promise. 
                                                await zoom_to_esri_extent(_layer_extent_object)

                                                _zoom_afterLayerExtent = map.getZoom()
                                                console.log( '_zoom_afterLayerExtent ......... ', _zoom_afterLayerExtent)
                }

                






                
                if (! _zoomto_status){



                                if (_server_extent_json.extent) {
                                                                    _server_extent_object = _server_extent_json.extent
                                } else if (_server_extent_json.initialExtent) {
                                                                    _server_extent_object = _server_extent_json.initialExtent
                                } else if (_server_extent_json.fullExtent) {  
                                                                    _server_extent_object = _server_extent_json.fullExtent
                                } else {
                                        console.log( ' zoom to Server extent failed, Server json do not have  - any extent - ')
                                        _zoomto_status = false
                                }




                                if (_server_extent_object) {

                                            //layer extent is whole world, zoom level will be 1, then try mapserver extent
                                            await zoom_to_esri_extent(_server_extent_object)

                                            _zoom_afterServerExtent = map.getZoom()
                                            console.log( '_zoom_afterServerExtent ......... ', _zoom_afterServerExtent)
                                }

                }


              
              

                
                
                  





              }


              // the others function will re-use pan-to-real-location related function

              /**/


//  -------------------  end  ------------------- - zoom 2 this layer -  ------------------- 



/**/








          // special only for arcgis feature table and socrata dataset
          function show_message(elementID_appendTo, text_message){
                                        
            // <span class="new badge">error</span>
            
          // var _text_panel = document.createElement('span');
            //_text_panel.className = 'new badge';

          // <div> <p class="z-depth-1">z-depth-1</p></div>
            var _text_panel = document.createElement('p');
            _text_panel.className = 'z-depth-5';

            _text_panel.innerHTML = text_message;


            //
            var element = document.getElementById(elementID_appendTo);
            element.appendChild(_text_panel);

            }



            
            function init_user_interface_event(){



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
                // -------------- Street View Coverage Layer  --------------
                /**/

                init_streetViewCoverageLayer()
                /**/
                //  -------------- end  -------------- Street View Coverage Layer --------------
                /**/


              // .............. street view is always on  .............. 
              turn_on_street_view(_center_lat, _center_long, 1000)
              // .............. end   ..............  street view is always on  .............. 


            

            }



           //   *******  search event related   *******      

                    function search_layer_now() {

                    

                      //_search_data_content = $('#search_data').val().toLowerCase().trim();
                      //search,  case sensitive, do not lower-case
                      _search_data_content = $('#search_data').val().trim();

                      console.log('search  --->  ', _search_data_content)
                      update_url_parameter('search_data', _search_data_content);

                      /**/
                        // -------------- attribute table driven map  --------------
                        /**/
                        delete_all_googlemap_pushpins()
                        clear_last_time_high_lighted_feature()
                      /**/
                      //  -------------- end  -------------- attribute table driven map  --------------
                      /**/

                      resetPagination(_search_data_content);
                  
                      }




                                
                        function search_by_url_param(){


                          // based on URL ... &search_data=xxxx 
                            var ___url_search_for = urlParams.get('search_data');


                            console.log('url param search data',  ___url_search_for)

                            if ((___url_search_for == undefined) || (___url_search_for == null) || (___url_search_for == '')){


                              // browsing all data with pagination
                              resetPagination(_search_data_content);

                            }else {



                              ___url_search_for = ___url_search_for.toLowerCase().trim();

                                $('#search_data').val(___url_search_for);
                                

                                // search , no pagination, find api, does not have offset= limit=, can't do pagination
                                search_layer_now()



                            }

                      }





                      function clear_search_result(){
                                
                          _search_keyword = ''
                          $('#search_data').val('')
                        
                          _search_data_content='';
                          update_url_parameter('search_data', '');



                        /**/
                        // -------------- attribute table driven map  --------------
                        /**/
                          delete_all_googlemap_pushpins()
                          clear_last_time_high_lighted_feature()
                        /**/
                        //  -------------- end  -------------- attribute table driven map  --------------
                        /**/

                          resetPagination(_search_data_content);
                      }



                    


                      function init_search_button_event_handler(){

                                  // click search
                                  $('#start_search_button').click(search_layer_now) 

                                  // default search, by enter
                                  $('#search_data').on('search', search_layer_now);
                            
                                  $('#clear_search_result_button').click(clear_search_result);

                                  /*
                                  // only update URL search_data=xxx, not perform real search.
                                  $("#search_data").on('keyup', function(){


                                                _search_data_content = $('#search_data').val().toLowerCase().trim();

                                                console.log('search key word entered is ', _search_data_content);

                                                update_url_parameter('search_data', _search_data_content);
                                              
                                              

                                                console.log('search key word length is ', _search_data_content.length);
                                                if (_search_data_content.length == 0) {
                                                  
                                                  clear_search_result()
                                                }



                                                $("#message_div").hide();
                                                search_message('');

                                  });
                                  */



                                /**/
                                // -------------- search result paging or not  --------------
                                /**/
                                        // first time set radio
                                        $("input[type=radio][name=search_result_paging_or_not_radio][value=" + _search_result_paging_or_not + "]").prop('checked', true);
                                        // radio change event
                                        $("input[type='radio'][name='search_result_paging_or_not_radio']").on('change', function(){
                                          _search_result_paging_or_not = $("input[type='radio'][name='search_result_paging_or_not_radio']:checked").val();
                                          console.log(" search result paging or not radio : --  ", _search_result_paging_or_not);
                                          update_url_parameter('searchpaging', _search_result_paging_or_not);
                                        });

                                /**/
                                //  -------------- end  -------------- search result paging or not  --------------
                                /**/


                      }


          //   *******   end  ******   search event related   *******      






            /**/
            // -------------- attribute table driven map  --------------
            /**/



              // special only for attribute table driven map
              function add_mapdata_listener(){

                set_map_style(_default_strokeColor,_default_strokeWeight, _default_fillColor , _default_pointRadius)

               

                // click listener
                  map.data.addListener('click', function(event) {

                      console.log('click-event.feature - ', event.feature)

                      if (click_or_hover == 'click'){

                            map.data.revertStyle();    
                            map.data.overrideStyle(event.feature, {
                              
                              // icon only affect point 
                              icon        : {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: _highlight_pointRadius,
                                strokeColor: _classfiy_strokeColor, 
                                strokeOpacity: _default_pointStrokeOpacity, 
                                strokeWeight: _classfiy_strokeWeight
                              },

                              // affect polygon and polyline
                              strokeWeight: _classfiy_strokeWeight,
                              strokeColor: _classfiy_strokeColor,
                              fillOpacity: _classfiy_fillOpacity
                              //fillColor:''
                            });

                            /**/
                            // -------------- attribute table driven map  --------------
                            /**/
                              delete_all_googlemap_pushpins()
                              clear_last_time_high_lighted_feature()

                              event.feature.toGeoJson(function(_geojson_selected){ 

                                  console.log('selected geojson ', _geojson_selected)
                                  var ___properties = _geojson_selected.properties
                                  var ___selected_feature_global_index = ___properties['global_index']
                                  console.log(' you clicked on map with global index : ', ___selected_feature_global_index)

                                  select_attributeFieldSetPanel_by_global_index(___selected_feature_global_index)

                                  // .............. street view is always on  .............. 
                                  if (pegman_follow_you_or_not == 'follow'){
                                    update_pegman2geojson(_geojson_selected)
                                  }
                                  // .............. end   ..............  street view is always on  .............. 



                              });
                            /**/
                            //  -------------- end  -------------- attribute table driven map  --------------
                            /**/

                      }// if click
                          
                    });    





                  // mouse over listener
                    map.data.addListener('mouseover', function (event) {   
                      

                      console.log('hover-event.feature - ', event.feature)

                      if (click_or_hover == 'hover'){
                                             
                                map.data.revertStyle();                 
                                map.data.overrideStyle(event.feature, {

                                  // icon only affect point 
                                  icon        : {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: _classfiy_pointRadius,
                                    strokeColor: _highlight_strokeColor, 
                                    strokeOpacity: _default_pointStrokeOpacity, 
                                    strokeWeight: _highlight_strokeWeight
                                  },

                                    // affect polygon and polyline
                                    strokeWeight: _highlight_strokeWeight,
                                    strokeColor: _highlight_strokeColor,
                                    fillOpacity: _highlight_fillOpacity
                                    //fillColor:''
                                });
                                

                                /**/
                                // -------------- attribute table driven map  --------------
                                /**/
                                  delete_all_googlemap_pushpins()
                                  clear_last_time_high_lighted_feature()

                                  event.feature.toGeoJson(function(_geojson_selected){ 

                                      console.log('selected geojson ', _geojson_selected)
                                      var ___properties = _geojson_selected.properties
                                      var ___selected_feature_global_index = ___properties['global_index']
                                      console.log(' you clicked on map with global index : ', ___selected_feature_global_index)

                                      select_attributeFieldSetPanel_by_global_index(___selected_feature_global_index)



                                       // .............. street view is always on  .............. 
                                       if (pegman_follow_you_or_not == 'follow'){
                                        update_pegman2geojson(_geojson_selected)
                                       }
                                        // .............. end   ..............  street view is always on  .............. 
    

                                  });
                                  
                                  
                                /**/
                                //  -------------- end  -------------- attribute table driven map  --------------
                                /**/


                      }// if hover
                      
                    });




                      // mouse out listener
                    map.data.addListener('mouseout', function (event) {


                      if (click_or_hover == 'hover'){
                          map.data.revertStyle(event.feature);
                          unselect_all_attributeFieldSetPanel()
                       }// if hover
                    
                    });



                    
              }





              // special only for attribute table driven map
              function add_map_listener_idle(){ 

                // ---  zoom level  --- 
                     const zoomLevel = document.createElement("button");

                     zoomLevel.id = 'zoom_level_id'
                     zoomLevel.textContent = _center_zoom;
                     zoomLevel.classList.add("zoomLevel");
                     zoomLevel.style.opacity = widget_opacity; //  ---  print   --- 
                     // https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning
                     //map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
                     map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(zoomLevel);
               // --- end --- zoom level  --- 
 

               listener_idle =  map.addListener('idle', function() {   
                 console.log('  !!! map idle event   !!! ')
                 update_center_latLngZoom();


                 // .............. street view is always on .............. 
                      // update exsiting street view
                      turn_on_street_view(_center_lat, _center_long, 1000)
                 // .............. end   ..............  street view is always on  .............. 



               });

             }





             function select_attributeFieldSetPanel_by_global_index(selected_global_Index){

              $(".attribute_field_set_style").removeClass('selected_highlighted_style')
              $("#attribute_field_set_" + selected_global_Index).addClass('selected_highlighted_style')

             }


             function unselect_all_attributeFieldSetPanel(){
              $(".attribute_field_set_style").removeClass('selected_highlighted_style')
             }

            /**/
            //  -------------- end  -------------- attribute table driven map  --------------
            /**/





