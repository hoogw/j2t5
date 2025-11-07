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
//  --- google manual drawing square   --- 
/**/

       

        var max_square_edge
        var current_square_edge
        var max_square_edge_miles
        var current_square_edge_miles

       
        var google_shape
        var google_shape_array = []
        var selected_feature_array = []
        
        
       
        

        var total_selected_feature_count = 0
        var ____unique_objectId_array = []

        var ____objectId
        var ____feature_array = []
        var ____feature





        var geojson_template =  {
          "type": "FeatureCollection",
          "features": [],
        };



        

        function clear_all_shape(){

          for (let i = 0; i < google_shape_array.length; i++) {
            if (google_shape_array[i]) { google_shape_array[i].setMap(null)}
          }
          google_shape_array = []
          
        }





        // only for google manual drawing square
        function add_ground_overlay_listener_click(){

          var listener_ground_overlay_click =  groundoverlay.addListener('click', function(click_event) {   

            console.log(' * * * * click overlay map image layer  event * * * ', click_event )
            var click_lat = Number(click_event.latLng.lat());
            var click_lng = Number(click_event.latLng.lng());
            var click_lat_lng_point = { lng : click_lng, lat : click_lat }
            console.log(' **** clicked ground overlay image *** >>> lng, lat ', click_lng, click_lat)

           

          })// click event
        }





        

/**/
//  --- google drawing polygon   --- 
/**/




        var lng_lat_array_string = ''
        var polygon_vertice_array 
        var rectangle_bound
        var rectangle_bound_southWest
        var rectangle_bound_northEast
        var rectangle_bound_SWlong
        var rectangle_bound_SWlat
        var rectangle_bound_NElong
        var rectangle_bound_NElat

        var drawingManager
        
        
        function drawing_tool(){


          drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                //google.maps.drawing.OverlayType.MARKER,
                //google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                //google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE,
              ],
            },
          });
        
          drawingManager.setMap(map);



          google.maps.event.addListener(drawingManager, 'overlaycomplete', async function(event) {

            // only for polygon
            if (event.type == 'polygon'){
              console.log('polygoncomplete', event )
            
              // for set Map null , clear drawing
              google_shape_array.push(event.overlay)
              
              polygon_vertice_array = event.overlay.getPath();
              console.log('polygon_vertice_array', polygon_vertice_array )

              lng_lat_array_string = ''
              // Iterate over the vertices.
              for (let i = 0; i < polygon_vertice_array.getLength(); i++) {
                var xy = polygon_vertice_array.getAt(i);
                //console.log('polygon vertice array',  xy.lat() + "," + xy.lng())
                lng_lat_array_string += '[' + xy.lng() + ',' + xy.lat() + ']' + ','
              }

              console.log('lng_lat_array_string',  lng_lat_array_string)


                  var _polygon_un_encode = '{"spatialReference":{"wkid":4326},'
                 
                  
                  _polygon_un_encode += '"rings":[['
                  _polygon_un_encode += lng_lat_array_string
                  _polygon_un_encode +=  ']]'
                  _polygon_un_encode += '}'
                 
                  var _polygon = encodeURI(_polygon_un_encode);
                  console.log('_polygon --- encoded >>>', _polygon)         
                  console.log('layer id ---', _layer_id)
                  
                            
                  var _url_shape = _url + '/'+  _layer_id + '/query'
                  _url_shape += '?returnGeometry=true'
                  _url_shape += '&outSR=4326'
                  _url_shape += '&f=pjson'
                  _url_shape += '&outFields=*'

                  // fix bug, only large building foot print, get error "No where clause specified."
                  _url_shape += '&where=1=1'

                  _url_shape += '&geometryType=esriGeometryPolygon'
                  _url_shape += '&geometry='+ _polygon;



                  var arcgis_feature_Set_response = await ajax_getjson_common(_url_shape);
                  if (typeof arcgis_feature_Set_response === 'object') {
                    // is object
                  } else {
                      // is string
                      arcgis_feature_Set_response = JSON.parse(arcgis_feature_Set_response)
                  }
                  console.log("arcgis feature Set response  ,  ,  ", arcgis_feature_Set_response)
                  var for_download_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set_response)
                  console.log("for download geojson object  ,  ,  ", for_download_geojson_object)
                  
                 // test if this new feature already exist
                 if (for_download_geojson_object['features']){

                    ____feature_array = for_download_geojson_object['features']

                    for (let b = 0; b < ____feature_array.length; b++) {
                        ____feature = ____feature_array[b]
                        ____objectId = ____feature['properties'][objectid_field_name]


                        if (____unique_objectId_array.includes(____objectId)){
                          // duplicate, skip, nothing to do
                        } else {
                          ____unique_objectId_array.push(____objectId)
                          selected_feature_array.push(____feature)
                        }//if

                      }//for b

                      console.log("so far total ", selected_feature_array)
                      total_selected_feature_count = selected_feature_array.length
                      $("#total_count").html(total_selected_feature_count)


                      
                  // do not add selected geojson to map as blue, just re-paint if object id is in selected object id array
                  paint_selected_feature()
                    

                   


                  }//if






            }


            // only for rectangle
             if (event.type == 'rectangle'){
              console.log('rectangle complete', event )
            
              // for set Map null , clear drawing
              google_shape_array.push(event.overlay)
              
              rectangle_bound = event.overlay.getBounds();
              console.log('rectangle_bound', rectangle_bound )

              rectangle_bound_southWest = rectangle_bound.getSouthWest();
              rectangle_bound_northEast = rectangle_bound.getNorthEast();
              rectangle_bound_SWlong = rectangle_bound_southWest.lng();
              rectangle_bound_SWlat = rectangle_bound_southWest.lat();
              rectangle_bound_NElong = rectangle_bound_northEast.lng();
              rectangle_bound_NElat = rectangle_bound_northEast.lat();
                
              
              console.log(' rectangle_bound_, SWlong ', rectangle_bound_SWlong )
              console.log(' rectangle_bound_, NElong ', rectangle_bound_NElong )
              

              var rectangle_bound_envelope_un_encode ='{"spatialReference":{"wkid":4326}, "xmin" : '+ rectangle_bound_SWlong +', "ymin" : '+ rectangle_bound_SWlat + ', "xmax" : '+ rectangle_bound_NElong +', "ymax" : '+ rectangle_bound_NElat + '}';
              var rectangle_bound_envelope = encodeURI(rectangle_bound_envelope_un_encode);
              console.log('rectangle_bound_envelope --- encoded >>>', rectangle_bound_envelope)
  
              console.log('layer id ---', _layer_id)
                  
                            
                  var _url_shape = _url + '/'+  _layer_id + '/query'
                  _url_shape += '?returnGeometry=true'
                  _url_shape += '&outSR=4326'
                  _url_shape += '&f=pjson'
                  _url_shape += '&outFields=*'

                  // fix bug, only large building foot print, get error "No where clause specified."
                  _url_shape += '&where=1=1'

                  _url_shape += '&geometryType=esriGeometryEnvelope'
                  _url_shape += '&geometry=' + rectangle_bound_envelope;



                  var arcgis_feature_Set_response = await ajax_getjson_common(_url_shape);
                  if (typeof arcgis_feature_Set_response === 'object') {
                    // is object
                  } else {
                      // is string
                      arcgis_feature_Set_response = JSON.parse(arcgis_feature_Set_response)
                  }
                  console.log("arcgis feature Set response  ,  ,  ", arcgis_feature_Set_response)
                  var for_download_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set_response)
                  console.log("for download geojson object  ,  ,  ", for_download_geojson_object)
                  
                 // test if this new feature already exist
                 if (for_download_geojson_object['features']){

                    ____feature_array = for_download_geojson_object['features']

                    for (let b = 0; b < ____feature_array.length; b++) {
                        ____feature = ____feature_array[b]
                        ____objectId = ____feature['properties'][objectid_field_name]


                        if (____unique_objectId_array.includes(____objectId)){
                          // duplicate, skip, nothing to do
                        } else {
                          ____unique_objectId_array.push(____objectId)
                          selected_feature_array.push(____feature)
                        }//if

                      }//for b

                      console.log("so far total ", selected_feature_array)
                      total_selected_feature_count = selected_feature_array.length
                      $("#total_count").html(total_selected_feature_count)


                      
                    
                    // do not add selected geojson to map as blue, just re-paint if object id is in selected object id array
                    paint_selected_feature()

                  }//if



                  


            }
            
          });




        }



        var selected_fill_color = '#1F51FF' // Neon Blue
        var selected_fill_opacity = 0.33
        var selected_stroke_color = '#1F51FF' // Neon Blue
        var selected_stroke_opacity = 0.97


        function paint_selected_feature(){

          // Data Layer: Dynamic Styling  https://stackoverflow.com/questions/27829857/data-layer-dynamic-styling
          //  https://developers.google.com/maps/documentation/javascript/examples/layer-data-dynamic
                    map.data.setStyle(function(feature) {
                              

                            
                      ____objectId = feature.getProperty(objectid_field_name)
                      if (____unique_objectId_array.includes(____objectId)){

                        // selected feature color
                        return /** @type {google.maps.Data.StyleOptions} */ ({

                          // icon only affect point 
                          icon        : {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: selected_fill_color, 
                            fillOpacity: selected_fill_opacity,
                            scale: _default_pointRadius,
                            strokeColor: selected_stroke_color,
                            strokeOpacity: selected_stroke_opacity,
                            strokeWeight: _default_strokeWeight
                          },

                              // affect polygon and polyline  
                              fillOpacity: selected_fill_opacity,
                              fillColor: selected_fill_color,
                              strokeColor: selected_stroke_color,
                              strokeOpacity: selected_stroke_opacity,
                              strokeWeight: _default_strokeWeight
                        });

                      } else {

                        // not selected feature color
                        return /** @type {google.maps.Data.StyleOptions} */ ({
                       
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
    
                        });


                      }
                     
                     
                     
                    });
        }


        
/**/
//  --- end  ---  google drawing polygon    --- 
/**/




/**/
//  --- end  ---  google manual drawing square    --- 
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
                                  
                                  
                                  

                                
                                  

                                

                                  

                                  map = new google.maps.Map(document.getElementById('map'), 
                                                              {
                                                                mapId: "a5b7699664ef75d0", // Map ID is required for advanced markers.
                                                                center: {lat: _center_lat, lng: _center_long},
                                                                zoom: _center_zoom,

                                                                // user click, tile, image, etc, I don't want google-build-in Point of interest info window pop-up, must disable it  https://stackoverflow.com/questions/7478069/disable-point-of-interest-information-window-using-google-maps-api-v3
                                                                //clickableIcons: false,  
                                                                // idiot map only
                                                                disableDefaultUI: true,  

                                                                 mapTypeControl:false,
                                                                 mapTypeId:'hybrid',// default, will be overwrite later in init base map function
                                                                 mapTypeControlOptions: {
                                                                                          
                                                                                          
                                                                                          // TOP_RIGHT, not work, placed outside of map,  due to our css, map div only half of width, 
                                                                                          position: google.maps.ControlPosition.RIGHT_TOP  //  BOTTOM_CENTER,
                                                                                        },
                                                             });

                                       


                                 drawing_tool()


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

                                  
                                  init_google_base_map()
                               
                                 // due to street view use map object, should after map object created.                             
                                 init_user_interface_event()

                                  
                                 
                                 //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
                                 if (need_pan_to_real_location) {
                                  pan_to_real_location();
                                  need_pan_to_real_location = false;
                                  update_url_parameter('panto', 0)

                                 } 




                                
                                
                          

                  }// function initMap








$(document).ready(function() {


    import_google_map_dynamic_library(_google_public_map_only_api_key)
  
       
});
          