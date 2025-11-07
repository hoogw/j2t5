// async await will fail if user quickly zoom in out, pan.
// await cause every ajax in queue, you can't cancel the unwanted ajax. 
// so must not use await.



var map;
var _geojson_object;
// - - - - download geojson  - - - -
var _geojson_object_selected_feature
var _empty_geojson_object = {type: "FeatureCollection", features: []}

var _search_keyword = ''
var _search_keyword_data_array = _search_keyword.split(' ');


var search_result_feature_array_global_var = [];


var _timeout = 60000;


var _base_map_type = 'streets' // for apple bing, not for google
var _first_time_load = true;


//  --- click or hover   --- 
var click_or_hover = 'hover'   // 'click'









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
   
  



//  . . efficient core newOnly  . - .
//limit = 777777 // use arcgis-server's max-return-count that admin set, not use, because slow down server response.
// paged ajax has limit parameter, 
// not-suppport pagination, no limit parameter, when returned 2000, will be reduce to default limit
 
 
// unlimit(999999) will crash out of memory
var maxCountBrowserDisplay = 22000; // if lower than ajax limit 200, evenly delete every 1, will get wrong display number,
 /**/
 // -- -- --  google advanced marker replace geojson  -- -- --
        
        // test only
        var google_marker_max_count = 500 
 // -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
 /**/




/**/
//  - - -  efficient engine delete random shuffled marker or feature      - - - 
/**/
var delete_start_position = 0
var delete_end_position = 0
var delete_objectid_array = []

/**/
//  --- end  ---  efficient engine delete random shuffled marker or feature    - - - 
/**/



var currentBrowserDisplayFeatureCount = 0;
var thisNewOnlyAjaxFeatureCount = 0;

var _all_feature_flat_array = []
var _all_feature_uniqueID_array = []
var _this_ajaxrequest_array = []
var _this_newOnly_feature_array = []
var _this_newOnly_geojson 
var _uniqueID


// . .  end . . efficient core newOnly  . - .










/**/
// -- -- --  all turf centroid efficient engine google labeling -- -- -- 




var current_labelAs = 'nolabel'
var _fields_array = []
var current_map_data_style
var _google_label_text

// for basic style control, point, line, polygon
var _line_width  = _default_strokeWeight
var _fill_opacity = _default_fillOpacity
var _point_radius = _default_pointRadius
var _symbol_color = _default_strokeColor





/**/
// -- -- --  all turf centroid efficient engine google labeling -- -- -- __   __ polygon line labeling  __   __   __ 
var _geojson_object_pointForLabeling;
var _current_pointForLabeling_layer;
var _last_pointForLabeling_layer;
var _point_radius_only_for_labeling = 0.1 // only for polygon and line, very tiny point for labeling, 
//  __   __   __  end  -- -- --  all turf centroid efficient engine google labeling -- -- --   __   __  polygon line labeling  __   __   __ 
/**/



// -- -- --  end -- -- --  all turf centroid efficient engine google labeling -- -- -- 
/**/







//  . . efficient core newOnly  . - .
function add_data_maps(data) {


  // google point marker more than 1k will frozen browser, must reset max browser display count if featurelayer_geometrytype is point
  // microsoft can display 100k point marker without problem.
  // geometryType: "esriGeometryPoint",
  if ((featurelayer_geometrytype == 'esriGeometryPoint') || (featurelayer_geometrytype == 'esriGeometryMultipoint')){
    maxCountBrowserDisplay = google_marker_max_count
  }

  
  var arcgis_feature_Set
  if (typeof data === 'object') {
      // is object
      arcgis_feature_Set = data
  } else {
      // is string
      arcgis_feature_Set = JSON.parse(data)
  }                                    

  
  


/**/
//  - - -  efficient engine delete random shuffled marker or feature      - - - 
/**/

    //efficient engine do not reduce in add-data-map, but do reduce in ajax call
    //arcgis_feature_Set = reduce_feature_count(arcgis_feature_Set, limit)

/**/
//  --- end  ---  efficient engine delete random shuffled marker or feature    - - - 
/**/


  
  _geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set, objectid_field_name)

  

  // do not use arcgis rest api return centroid = true, here don't extract centroid from arcgis raw data


/**/
// -- -- --  all turf centroid efficient engine google labeling -- -- -- 
  // do not use arcgis rest api return centroid = true, here don't extract centroid from arcgis raw data
  // map-server(polygon,line,point), feature-server(polygon, line,point)
  for (let i = 0; i < _geojson_object.features.length; i++) {
    console.log(' geojson object features [ i ] ', _geojson_object.features[i])
    _centerPoint =  turf.centroid(_geojson_object.features[i])
    console.log(' _centerPoint ', _centerPoint)
    _geojson_object.features[i]['properties']['esri_centroid_lat'] = _centerPoint['geometry']['coordinates'][1]
    _geojson_object.features[i]['properties']['esri_centroid_lng'] = _centerPoint['geometry']['coordinates'][0]
  }//for
// -- -- --  end -- -- --  all turf centroid efficient engine google labeling -- -- -- 
/**/

/**/
// -- -- --  all turf centroid efficient engine google labeling -- -- -- 

    // each time, remove old geojson layer, also need remove label marker
    // do not remove previous label only for efficient engine, 
    //remove_all_label_marker()

// -- -- --  end -- -- --  all turf centroid efficient engine google labeling -- -- -- 
/**/






   //  . . efficient core newOnly  . - .
   _this_newOnly_feature_array = []



  // test if this new feature already exist
  _this_ajaxrequest_array = _geojson_object.features
console.log('  this ajax request array ', _this_ajaxrequest_array)




/**/
//  - - -  efficient engine delete random shuffled marker or feature      - - - 
/**/
      // over max count, empty all array
      // move to below
/**/
//  --- end  ---  efficient engine delete random shuffled marker or feature    - - - 
/**/

console.log('  object id field name ', objectid_field_name)

  
  for (let p = 0; p < _this_ajaxrequest_array.length; p++) {
    
    _uniqueID = _this_ajaxrequest_array[p]['properties'][objectid_field_name]
    //console.log('  unique ID ', _uniqueID)

    if (_all_feature_uniqueID_array.includes(_uniqueID)){
      // already exist, skip
    } else {
      _all_feature_uniqueID_array.push(_uniqueID)
      _all_feature_flat_array.push(_this_ajaxrequest_array[p])
    
      //  . . efficient core newOnly  . - .
      _this_newOnly_feature_array.push(_this_ajaxrequest_array[p])

    }//if
  }//for

  console.log(' this ajax request add new feature ', _this_newOnly_feature_array.length)
  
  



  
  
/**/
//  - - -  efficient engine delete random shuffled marker or feature      - - - 
/**/
        

             
        
              // always add this new feature to map

              _this_newOnly_geojson =  {
                                type: "FeatureCollection",
                                features: _this_newOnly_feature_array,
                              }
              map.data.addGeoJson(_this_newOnly_geojson);

              // over max count, do not empty all array, delete some instead
              currentBrowserDisplayFeatureCount = _all_feature_flat_array.length
              thisNewOnlyAjaxFeatureCount = _this_newOnly_feature_array.length

                //  -- -- -- if over loaded, remove evenly distributed (not oldest) feature  -- -- -- 
            if (currentBrowserDisplayFeatureCount > maxCountBrowserDisplay){

                    //  over loaded, remove evenly distributed (not oldest) feature 

                    var overLoadCount = currentBrowserDisplayFeatureCount - maxCountBrowserDisplay
                    console.log('delete ? how many', overLoadCount)
                  
                    var _delete_ObjectID
                    var _delete_Index

                    //console.log('before shuffle, _all_feature_uniqueID_array ', _all_feature_uniqueID_array)
                    
                    // will change original array, not use
                    //delete_objectid_array = shuffle(_all_feature_uniqueID_array) 
                    // slice return only deleted array
                    delete_objectid_array = shuffle(structuredClone(_all_feature_uniqueID_array)).splice(0,overLoadCount)
                    //console.log('after shuffle, delete objectid array ', delete_objectid_array)
                    //console.log('after shuffle, _all_feature_uniqueID_array ', _all_feature_uniqueID_array)

                    for (let d = 0; d < overLoadCount; d++) {
                        _delete_ObjectID = delete_objectid_array[d]
                        _delete_Index = _all_feature_uniqueID_array.findIndex(function (element) { return element == _delete_ObjectID;})
                        // mark deleted array element as need-delete
                        _all_feature_uniqueID_array[_delete_Index] = "need-delete"
                        _all_feature_flat_array[_delete_Index] = "need-delete"
                    }//for
                    //console.log('will delete objectid array ', delete_objectid_array)
                    //console.log('before delete  ', _all_feature_uniqueID_array, _all_feature_flat_array )
                    
                    // delete previously marked element in array
                    for (let e = 0; e < _all_feature_uniqueID_array.length; e++) {
                      if (_all_feature_uniqueID_array[e] == "need-delete"){
                         _all_feature_uniqueID_array.splice(e, 1);
                         _all_feature_flat_array.splice(e, 1);
                      }//if
                    }//for

                    //console.log('after delete  ', _all_feature_uniqueID_array,_all_feature_flat_array )





                    console.log('now doing delete feature by objectid array ', delete_objectid_array)

                    var feature_object_id

                    map.data.forEach(function(feature){

                           //console.log('feature for each',  feature)
                           // get feature's all property  https://developers.google.com/maps/documentation/javascript/reference/data#Data.Feature
                           feature.toGeoJson(function(feature_to_geojson){ 

                                //console.log('after feature to geojson ', feature_to_geojson)
                                var ___properties = feature_to_geojson.properties
                                //console.log('confirm this feature all properties   ', ___properties)
                                feature_object_id = ___properties[objectid_field_name]

                                if (delete_objectid_array.includes(feature_object_id)){
                                    //console.log('feature for each, delete this obj id - feature ', feature_object_id )
                                    map.data.remove(feature);
                                }//if
                           
                           });// to geojson

                    })// map data for each

                    


                   


                }//if
                // -- -- --  end -- -- --  if over loaded, remove oldest feature  -- -- -- 


                        
        /**/
        //  --- end  ---  efficient engine delete random shuffled marker or feature    - - - 
        /**/

              
              // after delete, count everything and update
              currentBrowserDisplayFeatureCount = _all_feature_flat_array.length
              thisNewOnlyAjaxFeatureCount = _this_newOnly_feature_array.length
              $("#adding-feature").html(thisNewOnlyAjaxFeatureCount)
              $("#deleting-feature").html(overLoadCount)
              $("#rendering-feature").html(currentBrowserDisplayFeatureCount)
              

  //      - -  -  -   end    - -  -  -  entire   - -  -  - 



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
          // -- -- --  all turf centroid efficient engine google labeling -- -- -- 
          /**/



           // only for single layer 
           function change_label_handler(_labelAs_fieldName){

            console.log(' labelAs_eachField_radio ,  change to ', _labelAs_fieldName)

            // bug fix, for all movable box, must explicitly add 'checked=checked' attribute to the labelAsRadioTag, also remove 'checked' from all other  labelAsRadioTag
            // only for single layer 
            $('input[type=radio][name=labelAs_eachField_radio]').removeAttr('checked')
            $('#'+_labelAs_fieldName).attr('checked', true)

            //get_map_bound()
            set_map_style(current_labelAs, _default_strokeColor, _default_strokeWeight, _default_fillColor, _default_pointRadius)
                
            update_url_parameter('labelAsField', _labelAs_fieldName)

          }




          async function init_label_as(){

            // warning:  .fields can be null, if layer is only raster image  
            if (_feature_attributes) {
          
                                            
              // -- -- --  all turf centroid efficient engine google labeling -- -- -- use as global var
              _fields_array = _feature_attributes
          
                                    console.log('init label as field array',  _fields_array)

                                    // ---------- build label as field ---- radio ---- event -----------
                                    /**/
                                  

                                      var _labelAs_html = '<fieldset class="eachLabelAsClass">'
                                      _labelAs_html += '<legend style="color:' + css_rgba_color_array[0] + ';  font-weight: 900;">'
                                      _labelAs_html += '<span>Label as</span>'
                                      //_labelAs_html += '<span style="color: white; background-color:' + css_rgba_color_array[0]  + ';">&nbsp;&nbsp;&nbsp;' + color_name_array[0] + '&nbsp;&nbsp;&nbsp;</span>'
                                      _labelAs_html += '</legend>'

                                     

                                        

                                      /**/
                                      // ##  'no label' radio ## 
                                      _labelAs_html +=    '<label>'
                                      if (current_labelAs == 'nolabel') {
                                                // checked
                                                _labelAs_html +=       '<input type="radio" value="' + 'nolabel' + '" name="labelAs_eachField_radio" id="' + 'nolabel' + '" checked/>'
                                      } else {
                                                // un-checked
                                                _labelAs_html +=       '<input type="radio" value="' + 'nolabel' + '" name="labelAs_eachField_radio" id="' + 'nolabel' + '"/>'
                                      }
                                      _labelAs_html +=       '<span class="fieldName white-font-black-background">'  + 'No Label' + '</span>'                                                      
                                      _labelAs_html +=     '</label>'
                                      //_labelAs_html +=   '<br>'
                                        _labelAs_html +=   '&nbsp;&nbsp;'
                                      // ## end ##  'no label' radio ## 
                                      /**/
                                       


                                      // other field radio 
                                      for (var i = 0; i < _fields_array.length; i++) {
                                                                    
                                                                 
                                        var ____fieldDisplayName = _fields_array[i].alias             
                                        var ____fieldType = _fields_array[i].type
                                        var ____fieldName = _fields_array[i].name 

                                        // _labelAs_html +=  '<p>'
                                          _labelAs_html +=    '<label>'

                                          if (current_labelAs == ____fieldName) {
                                                  // checked
                                                  _labelAs_html +=       '<input type="radio" value="' + ____fieldName + '" name="labelAs_eachField_radio" id="' + ____fieldName + '"  checked />'
                                          } else {
                                                  // un-checked
                                                  _labelAs_html +=       '<input type="radio" value="' + ____fieldName + '" name="labelAs_eachField_radio" id="' + ____fieldName + '"/>'
                                          }
                                          
                                          
                                           _labelAs_html +=       '<span style="font-size:11.7px;">'  + ____fieldName  + '</span>'

                                          
                                          _labelAs_html +=     '</label>'
                                        
                                          _labelAs_html +=   '&nbsp;&nbsp;'

                            
                            }//for 
                                      
                                      
                                      _labelAs_html +=   '</fieldset>'
                                      var _dynamiclabel_div_tag = document.getElementById("label-as")
                                      _dynamiclabel_div_tag.innerHTML = _labelAs_html


                                      // only for existing static html tag "label-as", if html tag is dynamic added, do not use this method
                                      $('input[type=radio][name=labelAs_eachField_radio]').on('change', function() {
                                              current_labelAs = $(this).val()
                                              change_label_handler(current_labelAs)
                                      });

                                
                        



                                    //  ----------- end  ---------- build label as field ---- radio ---- event -----------




                                    /**/

        

            }//if
              
                   
          }//function




      // -- -- --  end -- -- --  all turf centroid efficient engine google labeling -- -- -- 
      /**/

     








/**/
















                  // must have async, for later use await
                  async function initMap() {
                                 
                                  init_global_var_from_node();
                                  console.log(' root url ', _url)

                                  // for search feature attributes table
                                  // need async await
                                  await get_feature_attributes(_layer_id);
                                  
                                  /**/
                                  // -- -- --  all turf centroid efficient engine google labeling -- -- -- 
                                  await init_label_as() // must after init field mask, because field-array must be available, which is get from field mask function
                                  // -- -- --  end -- -- --  all turf centroid efficient engine google labeling -- -- -- 
                                  /**/
                                  
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

                                  
                               
                                 // due to street view use map object, should after map object created.                             
                                 init_user_interface_event()

                                  
                                 
                                 //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
                                 if (need_pan_to_real_location) {
                                  pan_to_real_location();
                                  need_pan_to_real_location = false;
                                  update_url_parameter('panto', 0)

                                 } 



 // set dark mode by default
 document.querySelector('body').classList.add('dark')
                                
                                
                          

                  }// function initMap






$(document).ready(function() {


    import_google_map_dynamic_library(_google_public_map_only_api_key)
  
       
});


          