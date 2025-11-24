




  // async await will fail if user quickly zoom in out, pan.
// await cause every ajax in queue, you can't cancel the unwanted ajax. 
// so must not use await.



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



                      
              




var highlighted_color = '#1F51FF' // Neon Blue

 




  /**/
   //  .. - .. - ... zoom 2 feature   ... - .. - .. 
   /**/
   var zoom2feature_noMoreThan = 20  // default
   var zoom2feature_zoomLevel = 18  // default
   var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
   //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level' 
   //var zoom2feature_yesNo = 'donot_zoom2feature' 
   
   /**/
   // - - fit bound - - 
   var latlngList = [];

   /**/
   //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
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
                                    //console.log(' before convert, arcgis json ', arcgis_feature_Set) 
                                                    
                                    // Terraformer.ArcGIS.convert(geoJSON, options),  options default is objectid, FID, if you want use OID, must specify
                                    //http://terraformer.io/arcgis-parser/#arcgisconvert
                                    // sometime, they use 'OBJECTID_1' instead of default 'OBJECTID', you must specify it, 
                                    // otherwise, geojson id will not match object-id, 
                                    // or geojson id is same number or null, cause failed to show geojson on map 
                                    //_geojson_object = Terraformer.arcgisToGeoJSON(arcgis_feature_Set,'OBJECTID_1')
                                    _geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set, objectid_field_name)

                                                
                                    


                                    
                                    /**/
                                    //  - - -  point 2 diamond point     - - - 
                                    /**/
                                   
                                    if ((featurelayer_geometrytype == 'esriGeometryPoint') || (featurelayer_geometrytype == 'esriGeometryMultipoint')){
                                        // point 
                                        _geojson_object = geojsonPoint2diamond(_geojson_object)
                                    }//if 

                                    $("#rendering-feature").html(_geojson_object.features.length)
                                    /**/
                                    //  --- end  ---  point 2 diamond    - - - 
                                    /**/



                                                  
                                                  //----------------  add new geojson, then remove last geojson --------------------

                                                    _last_geojson_layer = _current_geojson_layer;

                                                    _current_geojson_layer = map.data.addGeoJson(_geojson_object);

                                                    

                                                  // ---- after add new geojson, now remove last time old geojson -------------
                                                  // don't use Array.ForEach is about 95% slower than for() in JavaScript.

                                                    if (_last_geojson_layer){
                                                    
                                                        for (var l = 0, len = _last_geojson_layer.length; l < len; l++)
                                                        {
                                                        
                                                                    map.data.remove(_last_geojson_layer[l]);

                                                                }// for
                                                    }// if
                                                    

                                                  //------------------------end add new geojson, then remove last geojson------------------------- ---------------

                              



            }






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













          



     





            





                  
                            
                  




                          

                          






                         


                              
                                  
                                      /**/
                                      //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                      /**/
                                      
                                                                
                                              // flyto real location fit bound, only for search result, in normal version  
                                              // only for search result as jsoneditor, (not for card) 
                                              function zoom_to_feature(one_geojson_feature,  _searchResult_serial_number, _action){                 

                                                console.log('zoom to feature ::::: event :::::', one_geojson_feature, _searchResult_serial_number, _action)

                                                /*
                                                one geojson feature sample:

                                                  {
                                                      type: 'Feature', 
                                                      geometry: {
                                                                    type:"Point"
                                                                    coordinates: [-111.979231, 40.682038]
                                                      }
                                                      properties: {…}
                                                    }
                                                */
                                                // centerOfMass, centroid, cener  see https://turfjs.org/docs/#center    
                                                var turf_center = turf.center(one_geojson_feature);
                                                console.log(' turf center ', turf_center)

                                                _center_lat  = turf_center.geometry.coordinates[1]
                                                _center_long = turf_center.geometry.coordinates[0]
                                                console.log('controled zoom to real location . . . .  _center_lat ...', _center_lat )
                                                console.log('controled zoom to real location . . . .  _center_long ...', _center_long )
                                                          
                                                       

                                                /**/
                                                // - - fit bound - - 
                                                            // warning: this is geojson format, must use .geometry.type,  if it is socrata json, must use .type without .geometry. 
                                                            var _the_geom_type = one_geojson_feature.geometry.type
                                                            _the_geom_type = _the_geom_type.toLowerCase()
                                                            console.log('controled zoom to real location . . . .  the geom type . . . . . ', _the_geom_type)

                                                            


                                                                                    /*
                                                                                       -=- -=- -=-  curved line string center fix   -=- -=- -=- 

                                                                                       lineString's center is off the line, not along the line, must correct it by:

                                                                                          1) Measure the lenght of the line in meter
                                                                                          2) Use along() with the half of the measured distance. 

                                                                                       https://gis.stackexchange.com/questions/281974/turf-js-midpoint-of-line
                                                                                       https://gis.stackexchange.com/questions/408328/turf-js-length-gives-incorrect-result
                                                                                    */ 
                                                                                       if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multilinestring')){

                                                                                            var singleLineString 

                                                                                            if (_the_geom_type == 'linestring'){
                                                                                              singleLineString = one_geojson_feature
                                                                                            }//if

                                                                                            if (_the_geom_type == 'multilinestring'){

                                                                                              // multilinestring only use first line to rebuild a single lineString
                                                                                              singleLineString = {
                                                                                                                    type: 'Feature',
                                                                                                                    geometry: {
                                                                                                                                  type: "LineString",
                                                                                                                                  coordinates: one_geojson_feature.geometry.coordinates[0]  // only extract first line 
                                                                                                                    },
                                                                                                                    properties: one_geojson_feature.properties
                                                                                                                  }
                                                                                            }//if

                                                                                            var turfUnitsOptions = {units: "meters"}
                                                                                            var linestring_length = turf.length(singleLineString, turfUnitsOptions);
                                                                                            console.log('linestring only, length in meter ', linestring_length, _the_geom_type, one_geojson_feature )
                                                                                            linestring_length = linestring_length / 2
                                                                                            var centerPointAlongLine = turf.along(singleLineString, linestring_length, turfUnitsOptions);
                                                                                            console.log('corrected center Point Along Line, linestring only,', centerPointAlongLine )
                                                                                            _center_lat  = centerPointAlongLine.geometry.coordinates[1]
                                                                                            _center_long = centerPointAlongLine.geometry.coordinates[0]
                                                                                            console.log('corrected center Point Along Line, linestring only, --->  _center_lat ---> ', _center_lat )
                                                                                            console.log('corrected center Point Along Line, linestring only, --->   _center_long ---> ', _center_long )
                                                                                        }//if
                                                                                        //  -=- -=- -=-   end -=- -=- -=-  curved line string center fix   -=- -=- -=- 






                                                            latlngList = [];
                                                            if (_the_geom_type == 'point'){
                                                                latlngList.push(new google.maps.LatLng(_center_lat, _center_long));
                                                                console.log(' fit bound point lat lng List', latlngList)
                                                            }//if type = point
                                                            
                                                            if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multipoint')){  
                                                                            // add all point into list for later fit bound
                                                                            var line_coordinate = one_geojson_feature.geometry.coordinates
                                                                            for (let c = 0; c < line_coordinate.length; c++) {
                                                                              latlngList.push(new google.maps.LatLng(line_coordinate[c][1], line_coordinate[c][0]));    // geojson coordinate pair is (long, lat)
                                                                            }
                                                                            console.log(' fit bound line lat lng List', latlngList)
                                                            }//if type = line 

                                                            if ((_the_geom_type == 'polygon') || (_the_geom_type == 'multilinestring')){
                                                                    // add all point into list for later fit bound
                                                                    var polygon_coordinate_level3 = one_geojson_feature.geometry.coordinates
                                                                    for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                            var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                            for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                                      latlngList.push(new google.maps.LatLng(polygon_coordinate_level2[p2][1], polygon_coordinate_level2[p2][0]));    // geojson coordinate pair is (long, lat)
                                                                            }//for p2
                                                                    }//for p3
                                                                    console.log(' fit bound polygon lat lng List', latlngList)
                                                            }// type = Polygon  

                                                            if (_the_geom_type == 'multipolygon'){
                                                                            // add all point into list for later fit bound
                                                                            var polygon_coordinate_level4 = one_geojson_feature.geometry.coordinates
                                                                            for (let p4 = 0; p4 < polygon_coordinate_level4.length; p4++) {
                                                                                  var polygon_coordinate_level3 = polygon_coordinate_level4[p4]
                                                                                  for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                                          var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                                          for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                                                    latlngList.push(new google.maps.LatLng(polygon_coordinate_level2[p2][1], polygon_coordinate_level2[p2][0]));    // geojson coordinate pair is (long, lat)
                                                                                          }//for p2
                                                                                  }//for p3
                                                                            }//for p4
                                                                            console.log(' fit bound multipolygon lat lng List', latlngList)
                                                            }// type = multipolygon  

                                                            console.log('zoom2feature_yesNo', zoom2feature_yesNo,  latlngList.length)
                                                             
                                                            // action = false (no shift key hold, event.shiftkey = false) 
                                                            if ((_action) || (zoom2feature_yesNo == 'donot_zoom2feature')){

                                                              // nothing to do, do not zoom to anywhere, just keep still

                                                            } else if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){

                                                                                console.log('fly to real location auto (search result only)  ## fit bound ## : all point lat lng list', _center_lat, _center_long, latlngList )

                                                                                var bounds = new google.maps.LatLngBounds();
                                                                                latlngList.forEach(function(n){
                                                                                  bounds.extend(n);
                                                                                });
                                                                                map.fitBounds(bounds, 20); // padding 20 pixel, https://developers.google.com/maps/documentation/javascript/reference/map#Map-Methods
                                                                                          // avoid 21 too close, set max zoom level no more than
                                                                                if (map.getZoom() > zoom2feature_noMoreThan){
                                                                                  map.setZoom(zoom2feature_noMoreThan); 
                                                                                }
                                                                                
                                                            } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){

                                                                                console.log('fly to real location auto (search result only) calculated - lat - long - : ', _center_lat, _center_long )
                                                                                var latLng = new google.maps.LatLng(_center_lat, _center_long);
                                                                                map.panTo(latLng);
                                                                                map.setZoom(zoom2feature_zoomLevel); 
                                                            } 
                                                //   - -  end  - - fit bound - -  
                                                
                                                /**/
                                                //*********  add a default red pin marker show location ***********
                                                                   
                                                                    // google map only
                                                                    var _marker_info_location_only = '<a class="btn-floating btn-large waves-effect waves-light red">' + _searchResult_serial_number + '</a>';
                                                                    create_marker_at_lat_lng(_center_lat, _center_long, _marker_info_location_only, 'default') 
                                                                    //add feature to map
                                                                    create_higlight_feature(one_geojson_feature)
                                                //*********  end ********** add a default red pin marker show location ***********
                                                   
                                                    
                                              }  // function      

                                      /**/
                                      //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                      /**/
                                  







                    //---------------------- End -------------------  markers and  highlighted shape -----------------------------------



/**/



                 



                    


                    
                  function _recursive_nested_array(_nested_array){
                    

                    if (typeof _nested_array[0] === 'number') {

                      return _nested_array

                    } else if (typeof _nested_array[0] === 'object') {

                      return _recursive_nested_array(_nested_array[0])

                    }

                }
 
  



                  //-------------  end --------- helper function ----------------------------------




          





          
                 




            



     


            



/**/
//  --- google poi      --- 
/**/

    // top level folder jstree
    var folder_structure_flatjson= [];
    // root
    var id_counter = 0;
    var current_selected_folder_tree_id_counter;

    // root item + folder item + service item(mapserver, geocodeserver, etc......)
    var flatJson_item; 

    var stack_item = {}
    
    var poi_geojson 
    var _last_geojson_POI;
    var _current_geojson_POI;
    
  
    
    var geojson_template = {
                        "type": "FeatureCollection",
                        "features": []
                      };
   






   

    function init_poi(){

        // only for poi, set map image layer transparency as 0
        image_opacity = 0;

        init_poi_ui()



     }


         

      function get_center_radius_in_map_bound(){


        // https://developers.google.com/maps/documentation/javascript/reference/geometry
        // There is no built-in property called "length" to directly access the diagonal distance of the bounds. 
        // To get the "length" of a LatLngBounds, you would need to calculate the distance between the southwest and northeast corners 
        // using a distance calculation function provided by the Google Maps API. 

        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        var SWlong = southWest.lng();
        var SWlat = southWest.lat();
        var NElong = northEast.lng();
        var NElat = northEast.lat();
          
        
        


        var northWest = new google.maps.LatLng(NElat, SWlong)
        var southEast = new google.maps.LatLng(SWlat, NElong)

        console.log(' northWest ', northWest )
        console.log(' southEast ', southEast )

        var vertical_distance = google.maps.geometry.spherical.computeDistanceBetween(southWest, northWest);
        var horizontal_distance = google.maps.geometry.spherical.computeDistanceBetween(southWest, southEast);

        console.log("vertical_distance in meter", vertical_distance)
        console.log("horizontal_distance in meter", horizontal_distance)

        var min_radius
        if (vertical_distance <= horizontal_distance){
          min_radius = Math.floor(vertical_distance / 2)
        } else {
          min_radius = Math.floor(horizontal_distance / 2)
        }


        // If the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40,000 meters (about 25 miles).
        if (min_radius > max_google_poi_radius_meter){
          min_radius = max_google_poi_radius_meter
        }

        console.log("min_radius in meter", min_radius)
        return min_radius
      }


     



      function set_poi_style(____strokeColor, ____strokeWeight, ____fillColor , ____circle_radius){

        map.data.setStyle((feature) => {
      
          if (feature.getProperty("poi_id")) {

                //  only for POI style

                  return /** @type {!google.maps.Data.StyleOptions} */ {
                    // icon only affect point 
                    icon        : {

                      
                      path: google.maps.SymbolPath.CIRCLE,
                      //path: svg_icon_path_pin3,

                      // ---  ---  marker-icon,label, size change based on zoom level  ---  ---  --- 
                      scale: ____circle_radius,
                      //scale: Math.floor(google_marker_icon_scale_by_zoom_level[_center_zoom] / 4), 
                      //scale: Math.floor(google_marker_icon_scale_by_zoom_level[_center_zoom] / 2),

                      strokeColor: ____strokeColor, 
                      strokeOpacity: 0.9,  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                      strokeWeight: ____strokeWeight,
                      },
                     //   -- -- --  end  -- -- --  google labeling -- -- -- 
                     /**/




                    // affect polygon and polyline  
                    fillOpacity: _default_fillOpacity,   // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                    fillColor: ____fillColor,
                    strokeColor: ____strokeColor,
                    strokeWeight: ____strokeWeight,

                    


                  };


               
             

                
          } else {

           

                //  only for ESRI feature layer, same as default style

                return /** @type {!google.maps.Data.StyleOptions} */ {
                        // icon only affect point 
                        icon        : {
                                          path: google.maps.SymbolPath.CIRCLE,
                                          scale: _default_pointRadius,
                                          strokeColor: _default_strokeColor, 
                                          strokeOpacity: 0.9,  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                          strokeWeight: _default_strokeWeight
                                        },

                        // affect polygon and polyline  
                        fillOpacity: _default_fillOpacity,   // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                        fillColor: _default_fillColor,
                        strokeColor: _default_strokeColor,
                        strokeWeight: _default_strokeWeight

                      };



          }//if

        });//set style

      }//function






/**/
//  --- end  ---  google poi    --- 
/**/









/**/
//  --- google poi circle 4x4    --- 
/**/

       var _4circle_radius
       var circle_centerPoint_array = []

       var center_point

       var quater_NW
       var quater_NE
       var quater_SW
       var quater_SE
      
      
        
    function get_4circle_radiusCenter(_radiusMeter, _centerLng, _centerLat){

      

      // Calculate sides of a right angle triangle with JavaScript
      //_4circle_radius = (Math.sqrt(_center_radius_in_meter **2 + _center_radius_in_meter **2)) / 2
      _4circle_radius = (Math.sqrt(_radiusMeter **2 + _radiusMeter **2)) / 2
      // smaller circle
      //_4circle_radius = (Math.sqrt(_center_radius_in_meter **2 + _center_radius_in_meter **2)) / 4
      //_4circle_radius = (Math.sqrt(_radiusMeter **2 + _radiusMeter **2)) / 4

      console.log('radius quater 4x4 : ', _4circle_radius )
      $('#radius_div').html('<span style="font-size:12.7px">Quater 4x4 Circle Radius: ' + _4circle_radius + '  meters</span>');

      center_point =  { lng : _centerLng, lat : _centerLat }

      // A heading angle between 0 - 360 degrees. 0 - North, 90 - East, 180 - South, 270 - West.
      quater_NW = google.maps.geometry.spherical.computeOffset(center_point, _4circle_radius, 315);
      quater_NE = google.maps.geometry.spherical.computeOffset(center_point, _4circle_radius, 45); 
      quater_SE = google.maps.geometry.spherical.computeOffset(center_point, _4circle_radius, 135);  
      quater_SW = google.maps.geometry.spherical.computeOffset(center_point, _4circle_radius, 225); 

      console.log('quater_NW : ', quater_NW )
      console.log('quater_NE : ', quater_NE )
      console.log('quater_SE : ', quater_SE )
      console.log('quater_SW : ', quater_SW )

      circle_centerPoint_array = []
      circle_centerPoint_array.push(quater_NW)
      circle_centerPoint_array.push(quater_NE)
      circle_centerPoint_array.push(quater_SE)
      circle_centerPoint_array.push(quater_SW)
     
    }


/**/
//  --- end  ---  google poi circle 4x4    --- 
/**/








/**/

                  // must have async, for later use await
                  async function initMap() {
                                 
                                  init_global_var_from_node();
                                  console.log(' root url ', _url)

                                  // for search feature attributes table
                                  // need async await
                                  await get_feature_attributes(_layer_id);
                                  
                                  
                                  display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)


                                
                                  get_total_count()

                                  console.log('####### layerID ########', _layer_id)
                                  console.log('####### _center_lat ########', _center_lat)
                                  console.log('####### _center_long ########', _center_long)
                                  console.log('####### _center_zoom ########', _center_zoom)
                                  console.log('####### _map_type ########', _map_type)
                                  
                                  
                                  

                                
                                  

                                

                                  

                                  /**/
                                //  ---  google poi    --- 
                                /**/
                                init_poi_ui_before_map_load()
                                /**/
                                //  --- end  ---  google poi    --- 
                                /**/


                                  map = new google.maps.Map(document.getElementById('map'),  
                                  
                                  
                                                              {
                                                                mapId: "a5b7699664ef75d0", // Map ID is required for advanced markers.
                                                                center: {lat: _center_lat, lng: _center_long},
                                                                zoom: _center_zoom,

                                                                // user click, tile, image, etc, I don't want google-build-in Point of interest info window pop-up, must disable it  https://stackoverflow.com/questions/7478069/disable-point-of-interest-information-window-using-google-maps-api-v3
                                                                //clickableIcons: false,  
                                                                // idiot map only
                                                                disableDefaultUI: true,  

                                                                                            


                                                                 /*
                                                                      warning:  each control must privide xxxControlOption {

                                                                          position: google.maps.ControlPosition.LEFT_TOP
                                                                                            }
                                                                 */



                                                                 mapTypeControl:false,
                                                                 mapTypeId:'hybrid',// default, will be overwrite later in init base map function
                                                                 mapTypeControlOptions: {
                                                                                          

                                                                                          // TOP_RIGHT, not work, placed outside of map,  due to our css, map div only half of width, 
                                                                                          position: google.maps.ControlPosition.RIGHT_TOP  //  BOTTOM_CENTER,
                                                                                        },






                                                                zoomControl: false, // never use, remove it from map
                                                                zoomControlOptions: {
                                                                  position: google.maps.ControlPosition.RIGHT_BOTTOM, //BOTTOM_LEFT,
                                                                },


                                                                // scaleControl: true,


                                                                
                                                                 streetViewControl:        true,
                                                                 streetViewControlOptions: {
                                                                                              position: google.maps.ControlPosition.LEFT_BOTTOM, // street view only, BOTTOM_LEFT,
                                                                                            },



                                                                fullscreenControl: false, // never use, remove it from map
                                                                fullscreenControlOptions: {
                                                                  position: google.maps.ControlPosition.RIGHT_BOTTOM, //BOTTOM_LEFT,
                                                                },


                                                             });

                                       


                                  // disable 45° imagery
                                  map.setTilt(0);
                                  //enable 45° imagery 
                                  //map.setTilt(45);

                                  // google geolocation api  ................    ................
                                  // must after map object created,
                                  geolocation()
                                  zoom_to_layer() // reverse pan-to-your-current-location



                                  

                                  get_maptile(_url)

                                  //console.log('place : ' + _place)   
                                  console.log('rest api url: ' + _url)  
                                  

                                  add_search_place();

                                  // mouseover geojson event
                                  add_mapdata_listener()
                                  
                                  // map zoom pan event
                                  add_map_listener_idle()

                                  

                                                                  
                                // due to street view use map object, should after map object created.                             
                                 init_user_interface_after_map_load()


                                                              
                                 
                                 //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
                                 if (need_pan_to_real_location) {
                                  pan_to_real_location();
                                  need_pan_to_real_location = false;
                                  update_url_parameter('panto', 0)

                                 } 





                                
                                
                          

                  }// function initMap






$(document).ready(function() {


  var hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    console.log("The current URL is localhost.");
    
    //for production
    import_google_map_dynamic_library(_google_place_api_key)
    // for test only
    //use_your_key()

  } else {
    console.log("The current URL is not localhost.");
    use_your_key()
  }
       
});


          