




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






 /**/
 // -- -- --  google advanced marker replace geojson  -- -- -- 



      // parameter is geojson.features array only
      function poi_geojsonPointFeature_to_marker_label(point_array, fieldName_as_markerlabel){

        console.log('point_array ', point_array)
  
        var point_element
        var point_lat
        var point_lng

        var point_label


        for (let i = 0; i < point_array.length; i++) {

          point_element = point_array[i]
          ////console.log('point_element ',i,  point_element)
          point_label = point_element.properties[fieldName_as_markerlabel];
          point_lng = point_element.geometry.coordinates[0]
          point_lat = point_element.geometry.coordinates[1]


          const pin_div = document.createElement("div");
          pin_div.className =  "black_label";  //'black_label'; "white_label";

          // show/hide label, comment out this line 
          //pin_div.textContent = point_label;


          // api https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization
          const pin = new google.maps.marker.PinElement({
            scale: 0.5,
            background: "#FBBC04",
            borderColor: "#137333",
            
             // only text
            //glyph: point_name, // "x", "o",
            // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
           

            // if want show label, uncomment this line 
            //glyph: pin_div, 

            glyphColor: "white",

            // not use, only v=beta channel.
            //gmpClickable: true,

          });


          // warning:  must inside function, use const, can not use global var, 
          // otherwise add mouse over event lisenter will mess up  
          const point_marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: point_lat, lng: point_lng },

            // not use, because it popup a text label on map
            //title: poi_name, 

            // text + pin
            content: pin.element,

            // without pin, only text
            //content: pin_div, 
          });


          


          // add Custom data to markers
          // you can add your own properties, just not conflit with existing google properties
          // https://stackoverflow.com/questions/11378450/google-map-api-v3-how-to-add-custom-data-to-markers
          point_marker.feature = point_element


           // for highlight label
           point_marker.label_text = point_label
           point_marker.object_id = point_element.properties[objectid_field_name];



          // Add a click listener for each marker, and set up the info window.

           // click 
          //not work
          //point_marker.addEventListener("gmp-click", ({ domEvent, latLng }) => {


           // click 
          // both works, js event, and google map event  
          point_marker.addListener("click", ({ domEvent, latLng }) => {
          //point_marker.addEventListener("click", ({ domEvent, latLng }) => {

           
            show_info_outline_Tab(point_marker.feature.properties)

            reset_all_marker_to_normal()
            
            const highlight_pin_div = document.createElement("div");
            highlight_pin_div.className =  "blue_label";  //'black_label'; "white_label";

            // show/hide highlight-label by comment out this line (text content carry over from marker creation)
            //do not show highlight label when hover or click, by comment out this line 
            highlight_pin_div.textContent = point_marker.label_text;

            const highlight_pin = new google.maps.marker.PinElement({
              scale: 0.9,
              background: "#FBBC04",
              borderColor: "#137333",
              
              // only text
              //glyph: point_name, // "x", "o",
              // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
             
  
              // if want show label, uncomment this line 
              glyph: highlight_pin_div, 
  
              glyphColor: "white",
  
              // not use, only v=beta channel.
              //gmpClickable: true,
  
            });
            point_marker.content = highlight_pin.element  
          });

          
          // hover
          // not working, addListener(google map event)
          // point_marker.addListener("mouseover", ({ domEvent, latLng }) => {
          // working, mouseover use addEventListener(js event), not addListener(google map event)
          point_marker.addEventListener("mouseover", ({ event, latLng }) => {
           

            

                  /**/
                  //  -  -  - google photo  -  -  - only for new marker
                  /**/
                  // fix bug, mouse over marker generate too many request,
                       current_poi_id = point_marker.feature.properties.poi_id

                       if (last_poi_id == current_poi_id){

                       } else {
                          google_photo(current_poi_id)

                          last_poi_id = current_poi_id
                       }
                           
                  /**/
                  //  -  -  - end  -  -  -  google photo    -  -  -  only for new marker
                  /**/

           
            show_info_outline_Tab(point_marker.feature.properties)

            reset_all_marker_to_normal()

            const highlight_pin_div = document.createElement("div");
            highlight_pin_div.className =  "blue_label";  //'black_label'; "white_label";

            // show/hide highlight-label by comment out this line (text content carry over from marker creation)
            //do not show highlight label when hover or click, by comment out this line 
            // highlight_pin_div.textContent = point_marker.label_text;

            const highlight_pin = new google.maps.marker.PinElement({
              scale: 0.9,
              background: "#FBBC04",
              borderColor: "#137333",
              
              // only text
              //glyph: point_name, // "x", "o",
              // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
             
  
              // if want show label, uncomment this line 
              glyph: highlight_pin_div, 
  
              glyphColor: "white",
  
              // not use, only v=beta channel.
              //gmpClickable: true,
  
            });
            point_marker.content = highlight_pin.element
          });

          point_marker.addEventListener("mouseout", ({ domEvent, latLng }) => {

             /**/
                          //  -  -  - google photo  -  -  - 
                          /**/

                            /* 
                            
                            //do not empty, let user scroll down to see photo

                             empty_info_outline_Tab()

                              reset_all_marker_to_normal()


                            */

                            /**/
                            //  -  -  - end  -  -  -  google photo    -  -  - 
                            /**/
          });

          
          marker_array.push(point_marker)


        }//for
      }


          // fix bug, mouse out some time does not reset this marker to normal, so reset all marker to make sure it happen 
          function reset_all_marker_to_normal(){

            for (let m = 0; m < marker_array.length; m++) {
             
         
  
                const pin_div = document.createElement("div");
                pin_div.className =  "black_label";  //'black_label'; "white_label";

                // show/hide label, comment out this line 
                //pin_div.textContent = marker_array[m].label_text;
  
                // api https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization
                const pin = new google.maps.marker.PinElement({
                  scale: 0.5,
                  background: "#FBBC04",
                  borderColor: "#137333",
                  
                  // only text
                  //glyph: point_name, // "x", "o",
                  // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
                
  
                  // if want show label, uncomment this line 
                  //glyph: pin_div, 
  
                  glyphColor: "white",
  
                  // not use, only v=beta channel.
                  //gmpClickable: true,
  
                });
  
                marker_array[m].content = pin.element
  
             }//for
  
  
           }   





          
                    function clear_all_poi_advancedMarker(){

                      
                       for (let m = 0; m < marker_array.length; m++) {
                          marker_array[m].setMap(null);
                       }//for
                       marker_array = []
                       

                      _all_poi_uniqueID_array = []
                      _all_poi_flat_array = []

                    _total_poi = 0
                      empty_info_outline_Tab()
                      $("#poi_total").html(_total_poi)
                  }


// -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
 /**/



      // special version only for google place poi
      function poi_to_geojson(____poi_array){

        var ____feature_array = []
        var ____feature
        var poi_element

        var poi_location
        var poi_lat
        var poi_lng


        var poi_id
        var poi_name
        var poi_name2
        var poi_phone
        var poi_url
        var poi_open

        var poi_addressComponents
        var poi_streetNumber
        var poi_streetName
        var poi_streetNameAbre


        
        var streetName_component = []
        var poi_streetPrefix
        var poi_streetNameOnly
        var poi_streetType


        var poi_city
        var poi_county
        var poi_state
        var poi_stateAbre
        var poi_zipCode
        var poi_country

        var poi_primaryType
        var poi_type


        for (let i = 0; i < ____poi_array.length; i++) {

          poi_element = ____poi_array[i]
          //console.log('google place item ',i,  poi_element)
          poi_location = poi_element.location
          poi_lng = poi_location.lng()
          poi_lat = poi_location.lat()



          //console.log('test address component type ',i,  poi_element.addressComponents[1].types[0])
          poi_addressComponents = poi_element.addressComponents
          for (let c = 0; c < poi_addressComponents.length; c++) {

            switch (poi_addressComponents[c].types[0]) {
              case 'street_number':
                  poi_streetNumber = poi_addressComponents[c].longText;
                  break;

              // street name    
              case 'route':
                  poi_streetName = poi_addressComponents[c].longText;
                  poi_streetNameAbre = poi_addressComponents[c].shortText;


                  //  . . . street name need to further split  . . . 
                  // api https://github.com/hassansin/parse-address
                  streetName_component =  parseAddress.parseLocation(poi_streetName);
                  
                  //console.log(' parse street name only  ', poi_streetName,  streetName_component);
                  
                  if ((streetName_component) && (streetName_component.hasOwnProperty('prefix'))){
                    poi_streetPrefix = streetName_component.prefix.toUpperCase();
                  } else {
                    poi_streetPrefix = ''
                  }
                  
                  if ((streetName_component) && (streetName_component.hasOwnProperty('street'))){
                    poi_streetNameOnly = streetName_component.street.toUpperCase();
                  } else {
                    poi_streetNameOnly = ''
                  }
                  
                  if ((streetName_component) && (streetName_component.hasOwnProperty('type'))){
                    poi_streetType = streetName_component.type.toUpperCase();
                  } else {
                    poi_streetType = ''
                  }
                  // . . .  end  . . .  street name need to further split






                  break;

              // city    
              case "locality":
                  poi_city = poi_addressComponents[c].longText;
                  break;

              // county    
              case 'administrative_area_level_2':
                    poi_county = poi_addressComponents[c].longText;
                    break;

              // state
              case 'administrative_area_level_1':
                  poi_state = poi_addressComponents[c].longText;
                  poi_stateAbre = poi_addressComponents[c].shortText;
                  break;

              // zip-code    
              case 'postal_code':
                  poi_zipCode = poi_addressComponents[c].longText;
                  break;
             
              default:
               
                break;
            }//switch
          }//for




          poi_id = poi_element.id
          poi_name = poi_element.displayName

          poi_primaryType = poi_element.primaryType
          poi_type = poi_element.types

          // - - motorola requirement  - - 
          // 1) remove special char by space
          //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
          poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
          // 2) truncate max length 60 char
          poi_name = poi_name.substring(0, 60);
          //  - -  end - - motorola requirement  - - 


          poi_phone = poi_element.nationalPhoneNumber
          poi_open = poi_element.businessStatus


          ____feature = {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [poi_lng, poi_lat]
            },
            "properties": {

              "poi_id": poi_id,
              "name": poi_name,
              
              "phone": poi_phone,
              "open": poi_open,

              "stNo": poi_streetNumber,
              

              //  . . . street name need to further split  . . . 
              "strName": poi_streetName,
              "stPrefix" : poi_streetPrefix,
              "stName" : poi_streetNameOnly,
              "stType" : poi_streetType,
              // . . .  end  . . .  street name need to further split



              "stNmAbre": poi_streetNameAbre,
            
              "county": poi_county,
              "city": poi_city,
              "state": poi_stateAbre,
              "state1":poi_state,
              "zipCode": poi_zipCode,

              "fmtAddr": poi_element.formattedAddress,

              "primaryType": poi_primaryType,
              "type": poi_type,

              //"poi_adrFormatAddress": poi_element.adrFormatAddress,
              //"poi_addressComponents": poi_element.addressComponents,
              // not working, because it is object
              //"poi_photos": poi_photo_url,
              //"poi_reviews": poi_element.reviews,
            
            }//properties
          }//feature

          ____feature_array.push(____feature)
          
        }//for

        
        geojson_template =  {
          "type": "FeatureCollection",
          "features": ____feature_array
        };

        return geojson_template

      }



 /**/
 // -- -- --  POI marker replace point geojson  -- -- -- 
              // delete function set poi style                   
 // -- -- --  end -- -- --  POI marker replace point geojson -- -- -- 
 /**/


      
      function poi_viewer_for_download(___properties){

        //in use, customized properties ,  only for side info window, 
        var poi_other_html = ''
        poi_other_html    +=      '<span style="font-size:22.2px; font-weight:900;">' + ___properties.name + '</span>' + '&nbsp;&nbsp;'
        poi_other_html    +=      '<span style="font-size:16.3px;">' + ___properties.phone + '</span>' + '&nbsp;&nbsp;'
        
        poi_other_html    +=      '<span style="font-size:13.3px;">' + ___properties.fmtAddr + '</span>' + '&nbsp;&nbsp;'
        
        // not use google poi id, too much info
        //poi_other_html    +=      '<span style="font-size:7.3px;">' + ___properties.poi_id + '</span>' + '&nbsp;&nbsp;'
        
        poi_other_html    +=      '<span style="font-size:9.3px; background-color:#FF8C00">' + ___properties.open + '</span>' + '&nbsp;&nbsp;'
       
        //poi_other_html    +=      '<span style="font-size:11.3px;">reviews(' + ___properties.poi_reviews + ')</span>' + '&nbsp;&nbsp;'
        //poi_other_html    +=      '<span style="font-size:8.3px;">' + ___properties.poi_photos + '</span>' + '&nbsp;&nbsp;'

        poi_other_html    +=      '<span style="font-size:12.2px;">primaryType(' + ___properties.primaryType + ')</span>' + '&nbsp;&nbsp;'
        
        // not use types, it has too much info 
        //poi_other_html    +=      '<span style="font-size:10.2px;">types(' + ___properties.type + ')</span>' + '&nbsp;&nbsp;'


        return  poi_other_html 
         
      }








/**/
//  --- end  ---  google poi    --- 
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

                                  

                                                                  
                                /**/
                                //  --- google poi      --- 
                                /**/

                                

                                     init_poi()

                                /**/
                                //  --- end  ---  google poi    --- 
                                /**/


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



          