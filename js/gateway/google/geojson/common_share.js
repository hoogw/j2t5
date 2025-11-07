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
   
  






                                      
                                              
                            function _recursive_nested_array(_nested_array){
                                              

                              if (typeof _nested_array[0] === 'number') {

                                return _nested_array

                              } else if (typeof _nested_array[0] === 'object') {

                                return _recursive_nested_array(_nested_array[0])

                              }

                          }
                                      



//       - -  -  -  geojson   - -  -  -  

        var file_fakepath
        var fileName

        function add_geojson_google(______full_geojson_string_____){

            set_map_style(_default_strokeColor,_default_strokeWeight, _default_fillColor , _default_pointRadius)
                    
            _layer = fileName
            document.getElementById('title').innerHTML = fileName;
            
            // this is whole uploaded geojson file
            _geojson_object = JSON.parse(______full_geojson_string_____)
                        
            _total_count_of_feature = _geojson_object.features.length;
            $("#total-feature").html(_total_count_of_feature)
                                                                  
          
            // everytime upload a new geojson, need pan to real location
              pan_to_geojson(_geojson_object)

              _current_geojson_layer  = map.data.addGeoJson(_geojson_object);
          


        } 

        // get sample json that have location field is not null, determin the lat long, pan to 
        // this is simple version, for socrata only,  different for the version for arcgis. 
        function pan_to_geojson(_sample_geojson_object){

          for (var g = 0; g < _sample_geojson_object.features.length; g++) {
                    

                //  "type": "FeatureCollection"

                var _sample_coordinates;
                var _sample_feature;


                if (_sample_geojson_object.type.toLowerCase() ===  "featurecollection") 
                {
                  _sample_feature = _sample_geojson_object.features[g]

                } else if (_sample_geojson_object.type.toLowerCase() ===  "feature") {

                  _sample_feature = _sample_geojson_object
                }




                if (_sample_feature.geometry.type.toLowerCase() ===  "geometrycollection") 
                {
                  _sample_coordinates = _sample_feature.geometry.geometries[0].coordinates;
                } else  {

                  _sample_coordinates = _sample_feature.geometry.coordinates;
                }

              console.log ('_sample_coordinates .....', _sample_coordinates )

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



                          




                            console.log('first_lat_long----: ', _center_lat, _center_long )




                            var latLng = new google.maps.LatLng(_center_lat, _center_long);
                                            map.panTo(latLng);
                                            


                            break; // break for loop
                
                      } // if   

                  



          } // for

              
                    
        }// function 

//      - -  -  -   end    - -  -  -  geojson   - -  -  -  















                  // must have async, for later use await
                  async function initMap() {
                                 
                                 

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
                                                                                          
                                                                                          
                                                                                          //style: google.maps.MapTypeControlStyle.DEFAULT,
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

                                 

                                  // mouseover geojson event
                                  add_mapdata_listener()
                                  
                                  // map zoom pan event
                                  add_map_listener_idle()

                                  
                                  init_google_base_map()
                               
                                 // due to street view use map object, should after map object created.                             
                                 init_user_interface_event()

                                  
                          // set dark mode by default
                          document.querySelector('body').classList.add('blue')

                  }// function initMap







$(document).ready(function() {


    import_google_map_dynamic_library(_google_public_map_only_api_key)
  
       
});

          