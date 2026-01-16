




  









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
                                  





                 



                    


                    
                  function _recursive_nested_array(_nested_array){
                    

                    if (typeof _nested_array[0] === 'number') {

                      return _nested_array

                    } else if (typeof _nested_array[0] === 'object') {

                      return _recursive_nested_array(_nested_array[0])

                    }

                }
 
  





/**/

// must have async, for later use await
async function initMap() {
                
    init_global_var_from_node();

    
    console.log("before init map",' center zoom:', _center_zoom, ' center lng:', _center_long, ' center lat:', _center_lat )

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
  

    add_search_place();

    
    
    // map zoom pan event
    add_map_listener_idle()

    

    // due to street view use map object, should after map object created.                             
    geocode_user_interface_event()

       
    
    init_geocode()
              
        

}// function initMap







$(document).ready(function() {


    import_google_map_dynamic_library(_google_public_map_only_api_key)
  
       
});

          