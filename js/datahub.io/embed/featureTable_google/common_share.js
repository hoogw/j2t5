// async await will fail if user quickly zoom in out, pan.
// await cause every ajax in queue, you can't cancel the unwanted ajax. 
// so must not use await.



var map;
var _geojson_object;
var _empty_geojson_object = {type: "FeatureCollection", features: []}

var _search_keyword = ''
var _search_keyword_data_array = _search_keyword.split(' ');


var _global_var_featureObject_indexAsKey = {};



var container
var options
var editor


var _timeout = 60000;


var _base_map_type = 'streets' // for apple bing, not for google
var _first_time_load = true;







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
   




  /**/
  //  --- click or hover   --- 
  /**/

var click_or_hover = 'hover'   // 'click'
 /**/
 //  --- end  ---  click or hover   --- 
 /**/





            // -------------- attribute table driven map  --------------
            function add_data_maps(data) { 

            

                        
                                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
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

               
                                                  


                                                                            
                          /**/
                          // -------------- attribute table driven map  --------------
                          /**/

                              console.log('. . . . arcgis . . . . feature . . . . Set . . . . ', arcgis_feature_Set)
                              console.log('. . geojson . . object . . (make sure it is lat,lng in geometry, otherwise, coordinate system isnt right) . .  . . ', _geojson_object)
                              
                              clear_last_time_high_lighted_feature()
                              
                              // {type: "FeatureCollection", features: [ {}, {},....array ]}
                              console.log('_geojson_object.features.length --- ', _geojson_object.features.length)
                              var ___feature_array
                              if (_geojson_object.features.length) {


                                ___feature_array = _geojson_object.features
                             
                                for (let f = 0; f < ___feature_array.length; f++) {

                                  // add index field in attribute
                                  ___feature_array[f]['properties']['global_index'] = f

                                  console.log(' after add global index field, to feature, now you should see it : ', ___feature_array[f])
                                  _global_var_featureObject_indexAsKey[f] = ___feature_array[f]
                                }



                                // by default, highlight and zoom to 1st feature ( geojson object array index is 0)
                                zoom_to_feature(_global_var_featureObject_indexAsKey[0], 0) // (_mouse_over_feature, __serial_no, __lock_map )

                              }//if
                                          
                          /**/
                          //  -------------- end  -------------- attribute table driven map  --------------
                          /**/




              


            }



          


          var _where_condition
               
          var ___url_getJson     
          var _search_data_content="";
          var _search_content_split

     
            


                  
                     
                  function search_message(__message_content){
                    
                    $('#message_label').html('<h1><mark><b>'+ __message_content + '</b></mark></h1>');
                    $('#badge_on_searchTab').hide();
                    $('#jsoneditor_search').hide();

                    // remove current geojson layer
                    if (_current_geojson_layer){
                      for (var l = 0, len = _current_geojson_layer.length; l < len; l++){
                                  map.data.remove(_current_geojson_layer[l]);
                      }
                    }

                    // *** remove last time old marker
                    if (marker_show_location_only) {
                      marker_show_location_only.setMap(null);
                    }
                  }

             //---------------------- markers and  highlighted shape -----------------------------------

                  var infowindow_googleMap;
                                      
                  var marker_show_location_only;


                  // special for google maps only, mapbox is different
                  function create_marker_at_lat_lng(_lat, _lng, _info, _marker_icon){
                  
                          
                            
                            if (_marker_icon == 'default'){
                                // when user click search layer result, fly-to, show red pin marker only 1 time, show location only

                                if (marker_show_location_only){
                                  marker_show_location_only.setMap(null);
                                }

                                marker_show_location_only = new google.maps.marker.AdvancedMarkerElement({
                                          opacity: 0.8,
                                          map: map,
                                          //icon:  _marker_icon,              // without this, default red pin
                                          position: {lat: _lat, lng: _lng}
                                        });

                                    
                                        
                                        google.maps.event.addListener(marker_show_location_only, 'click', function() {
                                          infowindow_googleMap.setContent(_info);
                                          infowindow_googleMap.open(map, this);
                                        });

                            }// if 


                  }

          
                  var highlighted_GoogleVector;
                  var _hightlighted_GoogleVector_symbol;

                  function create_higlight_feature(_hightlighted_feature){

                          console.log('_hightlighted_feature --- ', _hightlighted_feature)



                          clear_last_time_high_lighted_feature()











                          
                          _hightlighted_GoogleVector_symbol = {
                                                              
                                                                // same as when click 

                                                              // affect both polyline and polygon
                                                                  "strokeColor": highlighted_color,
                                                                  "strokeOpacity": 0.7,
                                                                  "strokeWeight": 15,
                                                                  "fillColor": highlighted_color,
                                                                  "fillOpacity": 0.2,

                                                                  // must specify here make it underneath the geojson layer.
                                                                  "zIndex" : -1,

                                                              // only affect marker
                                                              
                                                                  "icon"        : {
                                                                    path: google.maps.SymbolPath.CIRCLE,
                                                                    scale: 12,
                                                                    strokeColor: highlighted_color, 
                                                                    strokeOpacity: _default_pointStrokeOpacity, 
                                                                    strokeWeight: 12
                                                                  }

                                                                

                                                                }

                          






                          // convert geojson to google shapes
                          //https://github.com/maxogden/GeoJSON-to-Google-Maps
                          highlighted_GoogleVector = new GeoJSON(_hightlighted_feature, _hightlighted_GoogleVector_symbol);



                          console.log('highlighted_GoogleVector ---- > ', highlighted_GoogleVector)


                        if (Array.isArray(highlighted_GoogleVector)){

                                    var q, _item;
                                    for (q = 0; q < highlighted_GoogleVector.length; q++) {
                                      
                                          highlighted_GoogleVector[q].setMap(map)

                                    }


                        } else {
                                        if (highlighted_GoogleVector.error){
                                          // Handle the error.

                                                console.log('highlighted_GoogleVector.error ---- > ', highlighted_GoogleVector.error)

                                        } else {

                                        

                                                    highlighted_GoogleVector.setMap(map);
                                        }//if


                        }//if



                  }

                  function delete_all_googlemap_pushpins(){
                    
                    // *** remove last time old marker
                    if (marker_show_location_only) {
                      marker_show_location_only.setMap(null);
                    }

                  }
                  

                  function clear_last_time_high_lighted_feature(){


                    if (Array.isArray(highlighted_GoogleVector)){

                      var q, _item;
                      for (q = 0; q < highlighted_GoogleVector.length; q++) {
                        
                            highlighted_GoogleVector[q].setMap(null)
                      }//for

                    } else {


                      if (highlighted_GoogleVector){
                                  if (highlighted_GoogleVector.error){
                                    
                                  } else {
                                              highlighted_GoogleVector.setMap(null);
                                  }//if
                        }//if            

                    }

                  }



                              
                                  
                                      /**/
                                      //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                      /**/
                                      
                                                                
                                              // special no shift key, no action,  flyto real location fit bound, 
                                              function zoom_to_feature(one_geojson_feature,  _searchResult_serial_number){  
                                                
                                                


                                                          /**/
                                                          // -------------- attribute table driven map  --------------
                                                          /**/

                                                          // clear last time hover or click caused highlight style, intend to use search result highlight style 
                                                          map.data.revertStyle();   

                                                          /**/
                                                          //  -------------- end  -------------- attribute table driven map  --------------
                                                          /**/



                                               


                                                console.log('zoom to feature ::::: event :::::', one_geojson_feature, _searchResult_serial_number)

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
                                                            if (zoom2feature_yesNo == 'donot_zoom2feature'){

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


            



              // limit = 10 = page_size (10 record per page) define at top
              // offset means bypass how many record, start from where 
              async function get_paged_json_by_limit_and_offset(fulltextSearch_parameter,_limit, _offset){

                  

                try {


                      //https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm#ESRI_SECTION1_CCD86252F6F348D19BB2D47294D6568C
                      //If using orderByFields with the resultOffset and resultRecordCount parameters to paginate through an ordered set of rows, 
                      //make sure to set the orderByFields such that order is deterministic. For example, 
                      //if you need to order by type and multiple rows can have the same type values, 
                      //set the orderByFields to be type,objectid.
                      
                      //Note that when you pass in one of these two parameters and orderByFields is left empty, 
                      //the map service uses the object-id field to sort the result. 
                      //For a query layer with a pseudo column as the object-id field (for example, FID), you must provideorderByFields; otherwise the query fails.
                      
                      //orderByFields=FID
                      // resultOffset and resultRecordCount

                        //var _paging_parameter = '$limit='+_limit + '&$offset=' +  _offset;
                        
                        //var _paging_parameter = '&orderByFields=FID' + '&resultRecordCount='+_limit + '&resultOffset=' +  _offset;
                        
                        // fix bug, some do not have FID field. so remove '&orderByFields=FID' 
                        var _paging_parameter =  '&resultRecordCount='+_limit + '&resultOffset=' +  _offset;
                        

                        //https://dev.socrata.com/docs/paging.html 
                        // $order=:id make sure result is ordered
                        // https://data.cityofnewyork.us/resource/ic3t-wcy2.json?$order=:id&$limit=10&$offset=5
                      // var _url_paged = _url + '/'+  _layer_id + '.json?$order=:id&' + _paging_parameter + fulltextSearch_parameter;
                        
                        // fix error: sometime  $order=:id cause internal error. so remove it
                        
                        //var _url_paged = _url + '/'+  _layer_id + '.json?' + _paging_parameter + fulltextSearch_parameter;
                        //var _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + _paging_parameter + fulltextSearch_parameter 


                        // default, pagination not supported,
                        var _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + fulltextSearch_parameter  


                        // pagination supported
                        if (_supportsPagination) {
                            _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + _paging_parameter + fulltextSearch_parameter  
                            $('#pagination-container').show()
                        } else {

                          // pagination not supported, should hide pagination bar
                          $('#pagination-container').hide()
                        }


                        console.log('url unpaged or paged :::: depends on > _supportsPagination >',_supportsPagination, _url_paged);
                        



                        



                      




                    // ---------- get paged result ---------------

                    


                  /*

                    var success_returnBack = await $.ajax({

                        timeout: _timeout,
                        url: _url_paged,
                        method: "GET",

                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR);
                            var _error_status = textStatus + ' : ' + errorThrown;         
                            console.log('ajax error  + ', _error_status);
                          },


                        dataType: "json"
                        
                        }); // await

            */

                        // empty json editor
                        show_json_viewer({features:[]},'Empty',  '')
                       

                        console.log('arcgis ajax cross origin (_url_paged,  _cross) ',_url_paged,  _cross)

                        var success_returnBack= await ajax_cross_origin(_url_paged,  _cross);  // cross origin method  

                        console.log('success_returnBack',success_returnBack)

                        show_json_viewer(success_returnBack,'records',  _search_data_content)

                        $('#message_div').empty();






                      /**/
                      // -------------- attribute table driven map  --------------
                      /**/
                              add_data_maps(success_returnBack)  // -------------- attribute table driven map  --------------
                      /**/
                      //  -------------- end  -------------- attribute table driven map  --------------
                      /**/










                        // ......... some_action_need_after_first_load_complete .......... 
                                // better not do a separate function, because success_returnBack.fields scope is only here

                                // (only first time, one time )if feature attribute array is empty, need to populate feature attribute array
                                if ( _feature_attributes.length == 0 ){
                                  
                                  console.log('success_returnBack.fields --', success_returnBack.fields)
                                  
                                  parse_feature_attributes(success_returnBack.fields)
                                  
                                  
                                } 
              
              
              
                                
              
                            


                         // ......... some_action_need_after_first_load_complete .......... 









                    // ----------   end --------- get paged result ---------------


                } catch(err) {
                    
                    console.log(err)

                    var _show_message = err
                    if (_show_message.length == 0) {
                        _show_message = 'Data Source Current Not Available, Try Again Next Time.'
                    }
                  
                    show_message('message_div', _show_message);


                }// try catch

            }   //async function get_paged_json_by_limit_and_offset









            async function resetPagination(_keyword){

                          $('#message_div').empty();
              
                          /*
                          arcgis attribute table, only browsing use pagination,  search use find api, no offset, limit available, so no pagination 
                            '&where=1=1' '&where=1%3D1' means select all records 
                            By setting where=9999=9999 and returnCountOnly as true, 
                            the result is an approximate count that is returned very quickly. 
                            For accurate, but slower to return, row counts, use any other filter (e.g. where: 1=1)
  
                                                        improvement: 
                                                        https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
  
                                                        sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                                        example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0
  
                                                        if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10
                                                        since we not sure, we can only try both, if 100 not work, then get default 2000 
                                                    */     
                          var _fulltextSearch_parameter = '&where=9999=9999'; // fast
                          // var _fulltextSearch_parameter = '&where=1=1'; // slow 
                          var _findLayer_url

                          if (_keyword.length > 0) {


                            // have search keyword,   means searching , default use pagination, but options are use all-in-one-page, no paging 

                                                  // use find api, do not use pagination any more ,arcgis attribute table, only browsing use pagination,  search use find api, no offset, limit available, so no pagination 
                                                 
                                                  $('#pagination-container').hide();
                                                  console.log('use find api, do not use pagination any more  ....._keyword ::: ', _keyword)
                                                  




                                                     
                                                            /*
                                                                Do not use find api at anytime, because find api does not have paging. 
                                                                Always use query? where api, because it have paging. 
  




                                                                FeatureServer and table do not support 'find' api,  must use 'where='
                                                                 1)  Type: Feature Layer, may support 'find' api if url include MapServer, otherwise, FeatureServer will not support find api
                                                                 2)  Type: Table, do not support 'find' api, must use 'where='   for example : https://gis.la-quinta.org/arcgis/rest/services/BaseMap/parcels_table/MapServer/3
                                                           
                                                            console.log(' check _featurelayerJSON.type use find or where api ', _featurelayerJSON.type)
                                                            if ((_featurelayerJSON.type == 'Table')
                                                                 || (_url.includes('FeatureServer'))
                                                                   || (_url.includes('MapServer'))  
                                                            ){
                                                               // FeatureServer and table do not support 'find' api,  must use 'where='
                                                            */

                                                               //Always use query? where api, because it have paging. 

                                                               // ===== ==== query?where= ===== ====  support paging if possible ===== ====


                                                               console.log('either url has FeatureServer or type is table  !!!! find api not supported, must use https://<mapservice-url>/0?query=where', _url)
                                                              
                                                               var ___where_clause_operator = 'like'   //event.data.clause_operator
                                                               console.log(' query?where clause operator : ', ___where_clause_operator)

                                                               // 'like' cost 100 times than '=' 
                                                               //var _where_condition = 'ASSETID = 1487468' 
                                                               //var _where_condition = "PIND like '%129A213' or PIND like '129A213%' or PIND like '%129A213%'"
                                                               //var _where_condition = "PIND like '129A213%'"
                                                               //var _where_condition = "BOOK like '5148'"
                                                               
                                                               var _where_condition = build_where_condition_single_keyword(_keyword, ___where_clause_operator)
                                                               console.log('feature-server only -> query?where ->  ', _where_condition)  

                                                               
                                                               // -------------- search result paging or not  --------------
                                                               if ((_supportsPagination) && (_search_result_paging_or_not == 'paging')){

                                                                                     // pagination supported
                                                                                     $('#pagination-container').show()



                                                                                     var _url_count_where_api = ___url + '/'+  _layer_id + '/query?f=json&returnCountOnly=true'+ '&where=' + _where_condition;
                                                                                     console.log('_url_count_where_api  ',_url_count_where_api);
                                                                                     
                                                                                     _current_count_of_feature = await ajax_cross_origin(_url_count_where_api,  _cross);  // cross origin method  
                                                                                     if(_current_count_of_feature.hasOwnProperty('count')) {
                                                                                             _current_count_of_feature = _current_count_of_feature.count
                                                                                             _total_count_of_feature =  _current_count_of_feature
                                                                                             console.log('search something its count regards as new total : ', _total_count_of_feature);
                                                                                             display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                                           
                                                                                             page_sources=[];
                                                                                             for (var i = 1; i <= _current_count_of_feature; i++) {
                                                                                               page_sources.push(i);
                                                                                             }//for

                                                                                             $('#pagination-container').pagination({
                                                                                               dataSource: page_sources,
                                                                                               pageSize: page_size,
                                                                                               showGoInput: true,
                                                                                               showGoButton: true,
                                                                                               className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                               callback: function(data, pagination) {
                                                                               
                                                                                                   console.log('pagination call back data, returned data -> ', data) 
                                                                                                   // .... fix bug if data is [] ....
                                                                                                   var _off_set;
                                                                                                   if (data.length == 0) {
                                                                                                       _off_set = 0;
                                                                                                   }else {
                                                                                                     _off_set = data[0]-1;
                                                                                                   }
                                                                                                   // .... fix bug if data is [] ....


                                                                                                   
                                                                                                   console.log('pagination --- ', pagination)
                                                                               
                                                                                                   get_paged_json_by_limit_and_offset('&where=' + _where_condition,    page_size,_off_set);
                                                                                             
                                                                                               }
                                                                                             })   //$('#pagination-container) 


                                                                                     } else {
                                                                                                       // nothing found
                                                                                                       _current_count_of_feature = 0
                                                                                                       display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                                       //  ...... empty card panel and json-editor ...... 

                                                                                                       page_sources=[];
                                                                                                       $('#pagination-container').pagination({
                                                                                                         dataSource: page_sources,
                                                                                                         pageSize: page_size,
                                                                                                         showGoInput: true,
                                                                                                         showGoButton: true,
                                                                                                         className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                                         callback: function(data, pagination) {
                                                                                         
                                                                                                                         // empty json editor
                                                                                                                         show_json_viewer({features:[]},'Empty',  '')

                                                                                                                         
                                                                                                                         $('#message_div').empty();

                                                                                                         }
                                                                                                     })   //$('#pagination-container) 
                                                                                                 
                                                                                           //  ...... empty card panel and json-editor ...... 

                                                                                           

                                                                                     }// if else 



                                                                     

                                                               } else {

                                                                 // user choose no-paging,  or this arcgis server do not support pagination

                                                                       // pagination not supported, should hide pagination bar
                                                                       $('#pagination-container').hide()

                                                                       // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=ASSETID = 1723459
                                                                       // must specify &outSR=4326& in URL, because gis layer default srid is NOT 4326
                                                                       // srid=4326 is only srid for lat long

                                                                       // parameter reference: 
                                                                       //https://developers.arcgis.com/rest/services-reference/query-map-service-layer-.htm

                                                                       _findLayer_url = ''
                                                                       _findLayer_url = _url + '/'+  _layer_id 
                                                                       _findLayer_url += '/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=' 
                                                                       _findLayer_url += _where_condition
                                                                         // the map service defaults it to maxRecordCount. The maximum value for this parameter is the value of the layer's maxRecordCount property. 
                                                                         // resultRecordCount= 
                                                                         // error "Pagination is not supported." This parameter only applies if supportsPagination is true.
                                                                         //_findLayer_url += '&resultRecordCount=100'


                                                                         // empty json editor
                                                                         show_json_viewer({features:[]},'Empty',  '')
                                                                         
                                                                         var success_returnBack= await ajax_cross_origin(_findLayer_url,  _cross);  // cross origin method  
                                                                         console.log(' find api,  result :  ',success_returnBack)
                                                                         show_json_viewer(success_returnBack,'records',  _search_data_content)
                                                                         
                                                                         $('#message_div').empty();



                                                                        /**/
                                                                        // -------------- attribute table driven map  --------------
                                                                        /**/
                                                                                add_data_maps(success_returnBack)  // -------------- attribute table driven map  --------------
                                                                        /**/
                                                                        //  -------------- end  -------------- attribute table driven map  --------------
                                                                        /**/

                                                               }//if


                                                                 
                                                           // ===== ====  end   ===== ====  query?where= ===== ====    support paging if possible ===== ====


                                                   /*       

                                                    Keep find api source code here, but Do not use find api at anytime, because find api does not have paging. 

                                                       } else {


                                                          // . . . find api   . . . https://<mapservice-url>/find     https://developers.arcgis.com/rest/services-reference/find.htm

                                                         // MapServer have 2 option, can use both find api and where api, Warning: no paging in find api, where api has paging

                                                         // pagination not supported, should hide pagination bar
                                                         $('#pagination-container').hide()


                                                               _findLayer_url = _url + '/find?f=json'
                                                               _findLayer_url += '&layers=' +  _layer_id  
                                                               // _findLayer_url += '&searchFields=' +  ''    // not specify, will search all field
                                                               _findLayer_url += '&sr=' +  '4326'    // well-known ID not specify, output geometries are returned in the spatial reference of the map
                                                               _findLayer_url += '&searchText=' +  encodeURIComponent(_keyword)  // must encode, for 2 key word with space between , "keyword1 keyword2", however ESRI find api do not support 2 keywords cross different field. Only socrata support 2 key word cross different field. 
                                                               _findLayer_url += '&contains=true'  

                                                               
                                                   
                                                    // -------------- attribute table driven map  --------------
                                                   
                                                              _findLayer_url += '&returnGeometry=true'

                                                             
                                                   //  -------------- end  -------------- attribute table driven map  --------------



                                                   
                                                             
                                                               _findLayer_url += '&returnGeometry=false'
                                                               _findLayer_url += '&returnFieldName=true'  // must have for 'field mask', default is 'false'. search result will use 'field alias', not true field name, field mask use true field name. so both are not match.
                                                               console.log(' _findLayer_url ', _findLayer_url) 


                                                               // empty json editor
                                                               show_json_viewer({features:[]},'Empty',  '')
                                                               
                                                               var success_returnBack= await ajax_cross_origin(_findLayer_url,  _cross);  // cross origin method  
                                                               console.log(' find api,  result :  ',success_returnBack)
                                                               show_json_viewer(success_returnBack,'records',  _search_data_content)
                                                               
                                                               $('#message_div').empty();

                                                       }//if 

                                               */





                                                

/* 
                                                 if (_keyword.length == 0) {
                                                        
                                                               search empty keywords means no filter, list all records
                                                               both mapserver and feature server use same 'query' api,   
                                                               https://developers.arcgis.com/rest/services-reference/enterprise/query-map-service-layer-.htm
                                                         
                                                         _findLayer_url = ''
                                                         _findLayer_url = _url + '/'+  _layer_id 
                                                         _findLayer_url += '/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326' 
                                                         _findLayer_url += _fulltextSearch_parameter
                                                 }

*/

                                                 



                                                    


                        } else {
                              
                         

                                                      // arcgis attribute table, only browsing use pagination,
                                                      $('#pagination-container').show();

                                      
                                                      try {
                                              
                                                                        var _url_count = ___url + '/'+  _layer_id + '/query?f=json&returnCountOnly=true'+ _fulltextSearch_parameter;
                                                                        
                                                                        console.log('_url_count - ',_url_count);
                                                                  

                                                                      
                                                                      // ---------- count pagination ---------------

                                                                  
                                                                                   

                                                                                      

                                                                                      console.log('ajax cross origin(_url_count,  _cross) ',_url_count,  _cross)

                                                                                      _current_count_of_feature = await ajax_cross_origin(_url_count,  _cross);  // cross origin method  




                                                                                    

                                                                                    
                                                                                    if(_current_count_of_feature.hasOwnProperty('count')) {
                                                                                        
                                                                                                                    
                                                                                                                    // does exist
                                                                                                                

                                                                                                                    _current_count_of_feature = _current_count_of_feature.count


                                                                                                                    if (_search_data_content.length == 0){
                                                                                                                    
                                                                                                                        _total_count_of_feature =  _current_count_of_feature

                                                                                                                        console.log('_total_count_of_feature : ', _total_count_of_feature);
                                                                                                                    }   

                                                                                                                        display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                                  




                                                                                                                        page_sources=[];
                                                                                                                        for (var i = 1; i <= _current_count_of_feature; i++) {
                                                                                                                                page_sources.push(i);
                                                                                                                            }
                                                                                                                          
                                                                                                                            
                                                                                                                        
                                                                                                                        


                                                                                                                        
                                                                                                                        $('#pagination-container').pagination({
                                                                                                                            dataSource: page_sources,
                                                                                                                            pageSize: page_size,
                                                                                                                            showGoInput: true,
                                                                                                                            showGoButton: true,
                                                                                                                            className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                                                            callback: function(data, pagination) {
                                                                                                            
                                                                                                                                console.log('pagination call back data, returned data -> ', data) 
                                                                                                                                // .... fix bug if data is [] ....
                                                                                                                                var _off_set;
                                                                                                                                if (data.length == 0) {
                                                                                                                                    _off_set = 0;
                                                                                                                                }else {
                                                                                                                                  _off_set = data[0]-1;
                                                                                                                                }
                                                                                                                                // .... fix bug if data is [] ....


                                                                                                                                
                                                                                                                                console.log('pagination --- ', pagination)
                                                                                                            
                                                                                                                                get_paged_json_by_limit_and_offset(_fulltextSearch_parameter,page_size,_off_set);
                                                                                                                          
                                                                                                                            }
                                                                                                                        })   //$('#pagination-container) 
                                                                                                                    
                                                                                                                    
                                                                                                                  


                                                                                            } else {
                                                                                                
                                                                                              
                                                                                                // nothing found
                                                                                              
                                                                                                _current_count_of_feature = 0
                                                                                                display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                              

                                                                                                //  ...... empty card panel and json-editor ...... 

                                                                                                              page_sources=[];
                                                                                                              $('#pagination-container').pagination({
                                                                                                                dataSource: page_sources,
                                                                                                                pageSize: page_size,
                                                                                                                showGoInput: true,
                                                                                                                showGoButton: true,
                                                                                                                className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                                                callback: function(data, pagination) {
                                                                                                
                                                                                                                                // empty json editor
                                                                                                                                show_json_viewer({features:[]},'Empty',  '')

                                                                                                                           
                                                                                                                                $('#message_div').empty();

                                                                                                                }
                                                                                                            })   //$('#pagination-container) 
                                                                                                        
                                                                                                  //  ...... empty card panel and json-editor ...... 

                                                                                                  

                                                                                            }// if else 




                                                                      // ----------   end --------- count pagination ---------------



                                                                                

                                                      } catch(err) {

                                                          console.log(err)

                                                          var _show_message = err
                                                          if (_show_message.length == 0) {
                                                              _show_message = 'Data Source Current Not Available, Try Again Next Time.'
                                                          }
                                                         
                                                          show_message('message_div', _show_message);

                                                          
                                                      }// try catch


                      }//if

            } //async function 







/**/
// must have async, for later use await
async function initMap() {
                                 
                                  init_global_var_from_node();
                                  console.log(' root url ', _url)

                                  
                                  // for search feature attributes table
                                  // need async await
                                  await get_feature_attributes_onlyForFeatureTable(_layer_id);
                                  
                                  

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
                               


                                   
                                  console.log('rest api url: ' + _url)  


                                 


                                  /**/
                                  // -------------- attribute table driven map  --------------
                                  /**/

                                      // special only for attribute table driven map
                                      add_mapdata_listener()

                                      // special only for attribute table driven map
                                      add_map_listener_idle()

                                      // due to street view use map object, should after map object created.                             
                                      init_user_interface_event()

                                      

                                     
                                  /**/
                                  //  -------------- end  -------------- attribute table driven map  --------------
                                  /**/




                                 



                                  

                                  

                                  init_search_button_event_handler()

                                  // main entrance, everything start here  
                                  search_by_url_param()
                                 


                  }// function initMap






$(document).ready(function() {


    import_google_map_dynamic_library(_google_public_map_only_api_key)
  
       
});


          