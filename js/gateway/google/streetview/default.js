


/**/
// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 


      var _maxAllowableOffset = 0  // default

// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
/**/



//  +++++++++ ********* +++++++++   ground overlay,  map tile   +++++++++ ********* +++++++++  
/**/


       // default
       var current_overlaytype = 'overlayType_image';
       

       var singleFusedMapCache = false;
       var spatial_reference_mapserver = 4326 // default for map server (tile is regards map server, multi-layers)
       var imageMapType

       




       
               
               var image_opacity = 0;  // default
               var spatial_reference = 4326 // default for layer (image, groundOverlay is regards layers)
               var groundoverlay;
               var groundOverlayImage = null // must be global var for image loading progressing bar


//  +++++++++ ********* end  +++++++++      ground overlay,  map tile    +++++++++ ********* +++++++++  








 /**/





          








/**/


    // ++++++++++   geocode    ++++++++++

    var _address_content="";
    var _long_content="";
    var _lat_content="";
    var _url2_content="";
    var _url1_content="";

   var candidateLocationResult

   var _candidate_location_geojson_layer;

   var _singleLineAddressField
   var _addressFields




   
   

// ++++++++++   end   ++++++++++   geocode    ++++++++++














/**/

                                                              // --------- add proxy  --------- 
                                                                          var ____current_window_protocol = window.location.protocol

                                                                          // default http
                                                                          var proxyurl = "http://transparentgov.net:7000/";  

                                                                          console.log('____current_window_protocol', ____current_window_protocol)

                                                                          if (____current_window_protocol == 'https:') {
                                                                          
                                                                            proxyurl = "https://transparentgov.net:7200/";
                                                                            
                                                                          }
                                                              // --------- end  ---------  add proxy  --------- 
  



/**/




 

 
 



 // -2 means current showing not available,  -1 means total count not available
  
 
 

 



// -------------------- max count pagination --------------------

        // default maxRecordCount is 1000 or 2000, arcgis server admin can overwrite it to a large number like 20k, 
        // if admin set it to 20k, we must enforce it as 1000, means we only retrieve first 1000 records, no matter maxRecordCount is how large. 
        var _default_resultRecordCount = 500
        

        // use in pan to real location, get how many sample  
        var _sample_count = 10
        
         // define at feature layer json, advancedQueryCapabilities
       // if true, can use limited return ( default result Record Count ) result Off set, result Record Count, if false,  use unlimited (relay on maxRecordCount 2000) 
       // var _supportsPagination = false
        
 // -------------------- end --------------------
 
 


                                          //------------ search feature --------
                                          var _feature_attributes =[];
                                          var _feature_attributes_string =[];
                                          var _feature_attributes_integer =[];
                                          var _feature_attributes_double =[];
                                          var _feature_attributes_date =[];
                                          //---------  End --- search feature --------



                    /* 


                         "supportsAdvancedQueries": true, 


                          advancedQueryCapabilities:
                                                  supportsCountDistinct: true
                                                  supportsDistinct: true
                                                  supportsHavingClause: true
                                                  supportsOrderBy: true
                                                  supportsPagination: true
                                                  supportsQueryWithDistance: true
                                                  supportsReturningQueryExtent: true
                                                  supportsSqlExpression: true
                                                  supportsStatistics: true
                                                  supportsTrueCurve: true
                                                  useStandardizedQueries: true
                    */

                    var _supportsAdvancedQueries  = false;

                    var _supportsCountDistinct  = false;
                    var _supportsDistinct = false;
                    var _supportsHavingClause = false;
                    var _supportsOrderBy = false;
                    var _supportsPagination = false;
                    var _useStandardizedQueries = false;
                    var _supportsStatistics = false;
                    var _supportsTrueCurve = false;
                    var _supportsReturningQueryExtent = false;
                    var _supportsQueryWithDistance = false;
              
                    
                    var field_alias = {} 
                    var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
                    var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                    var field_value = []
                    var flatJson_item
                    var fieldValue_flatjson
                    var field_structure_flatjson = []
                    



                    


                    
                    

                   

                   



















           

















          









               /**/
              // -- -- -- vertial adjustment  -- -- -- 



              

               
              

              function show_info_outline_Tab(event){
                
                event.feature.toGeoJson(function(_geojson_hovered){ 
                  console.log('hovered geojson ', _geojson_hovered)
                  var ___properties = _geojson_hovered.properties

                 
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))



                  // .............. street view is always on  .............. 
                  if (pegman_follow_you_or_not == 'follow'){

                    // for polygon only, center of polygon maybe out of map view, user move mouse, pegman disappear from map view.
                    update_pegman2geojson(_geojson_hovered)
                  }
                  // .............. end   ..............  street view is always on  .............. 
    
                 
                });

                



              }


              function empty_info_outline_Tab(){
                              
                $('#info-window-div').html("")
              }





                             
                        
                        





                        


              
                        
        


                        



                            

       









                              /**/
                              // -------------- Street View Coverage Layer  --------------
                              /**/

                                  var street_view_coverage_layer
                                  var biking_layer
                                  var live_traffic_layer

                                  var street_view_coverage_layer_on_or_off = 'off' // on
                                  var live_traffic_layer_on_or_off = 'off'
                                  var biking_layer_on_or_off = 'off'

                                  var pegman_follow_you_or_not = 'follow' // 'not_follow'


                                  function init_streetViewCoverageLayer(){

                                              // Street View Coverage Layer https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewCoverageLayer
                                              // code sample https://stackoverflow.com/questions/11783782/display-valid-google-streetview-areas-as-a-layer-on-a-map-using-javascript-api-v

                                              street_view_coverage_layer = new google.maps.StreetViewCoverageLayer();

                                              // first time 1 time
                                              if (street_view_coverage_layer_on_or_off == 'on'){
                                                street_view_coverage_layer.setMap(map);
                                              } else {
                                                street_view_coverage_layer.setMap(null);
                                              }
                                              $('#show_street_view_coverage_layer').on('click', function(){
                                                  street_view_coverage_layer_on_or_off = 'on';
                                                  street_view_coverage_layer.setMap(map);
                                              })
                                              $('#hide_street_view_coverage_layer').on('click', function(){
                                                street_view_coverage_layer_on_or_off = 'off';
                                                street_view_coverage_layer.setMap(null);
                                              })






                                              biking_layer = new google.maps.BicyclingLayer();

                                              // first time 1 time
                                              if (biking_layer_on_or_off == 'on'){
                                                biking_layer.setMap(map);
                                              } else {
                                                biking_layer.setMap(null);
                                              }
                                              $('#show_biking_layer').on('click', function(){
                                                  biking_layer_on_or_off = 'on';
                                                  biking_layer.setMap(map);
                                              })
                                              $('#hide_biking_layer').on('click', function(){
                                                biking_layer_on_or_off = 'off';
                                                biking_layer.setMap(null);
                                              })





                                              live_traffic_layer = new google.maps.TrafficLayer();

                                              // first time 1 time
                                              if (live_traffic_layer_on_or_off == 'on'){
                                                live_traffic_layer.setMap(map);
                                              } else {
                                                live_traffic_layer.setMap(null);
                                              }
                                              $('#show_live_traffic_layer').on('click', function(){
                                                  live_traffic_layer_on_or_off = 'on';
                                                  live_traffic_layer.setMap(map);
                                              })
                                              $('#hide_live_traffic_layer').on('click', function(){
                                                live_traffic_layer_on_or_off = 'off';
                                                live_traffic_layer.setMap(null);
                                              })








                                        // first time set radio
                                        $("input[type=radio][name=pegman_follow_or_not_radio][value=" + pegman_follow_you_or_not + "]").prop('checked', true);
                                        // radio change event
                                        $("input[type='radio'][name='pegman_follow_or_not_radio']").on('change', function(){
                                          pegman_follow_you_or_not = $("input[type='radio'][name='pegman_follow_or_not_radio']:checked").val();
                                          console.log(" pegman_follow_you_or_not : --  ", pegman_follow_you_or_not);
                                          update_url_parameter('pegmanfollow', pegman_follow_you_or_not);
                                        });


                                  }

                              /**/
                              //  -------------- end  -------------- Street View Coverage Layer --------------
                              /**/



                              



                            /**/
                            // .............. street view is always on .............. 

                                  var _street_view_service  // free to create object
                                  var panorama              // billed to create object
      

                                  function turn_on_street_view(_pegman_lat, _pegman_lng, _pegman_radius) {





                                                /*
                                                        Only Street View panoramas generated with the StreetViewPanorama object are billed. 
                                                              The built-in Street View experience based on the Street View Pegman control, and the StreetViewService, are not billed
                                              
                                                        If user ever click  'Street View Toggle' button once,  All the browser session will use this same new created (charged $0.014/per new object ) panorama object.
                                                                            No matter how many times user turn off street view window by click 'Street View Toggle' button, 
                                                                            We never destroy this (charged $0.014/per new object ) panorama object, to SAVE money.

                                                                            When user turn on again, we re-use this (charged $0.014/per new object ) panorama object.
                                                                            We use   'panorama.setVisible(true)' to reuse panorama object and place yellow pegman in Map from street view control . 
                                                        We use   'panorama.setVisible(false)' to place yellow pegman back to street view control from Map. 
                                                */           
                                                //check street view availability,      programmatically determine the availability of Street View data, or return information about particular panoramas, without requiring direct manipulation of a map/panorama. You may do so using the StreetViewService object
                                                console.log('pegman radius: 1km from map view center, 100m for click', _center_lat, _center_long)

                                                if (_street_view_service) {
                                                          // use existing object
                                                } else {
                                                  // create new
                                                 _street_view_service = new google.maps.StreetViewService()
                                                }


                                                //Directly Accessing Street View Data based on current map center location, radius 1km  https://developers.google.com/maps/documentation/javascript/examples/streetview-service
                                                _street_view_service.getPanorama({
                                                                                    location: { lat: _pegman_lat, lng: _pegman_lng },  // https://developers.google.com/maps/documentation/javascript/streetview

                                                                                    //preference: google.maps.StreetViewPreference.BEST,  //do not use 'best', it far away from map center  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewPreference
                                                                                    preference: google.maps.StreetViewPreference.NEAREST,

                                                                                    //radius: 10,  //for test only, generate ' street view not found' alert
                                                                                    radius: _pegman_radius,   //  1000 for center,  100 for click unit in meter, "preference" use "NEAREST", "radius" must use 1km or less,  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewLocationRequest

                                                                                  }).then(found_and_process_street_view_data_handler)
                                                                                    .catch(_streetview_not_available_handler)
                                                                                    .finally();
                                  } // function

                                        

                                 


                                  function _streetview_not_available_handler(){
                                    console.log('Street view is not available near center 1km radius, move around and try again')
                                  }

                                  function found_and_process_street_view_data_handler(___StreetViewPanoramaData) {
                                                            console.log(' found  ___StreetViewPanoramaData', ___StreetViewPanoramaData)
                                                            //$("#street_view_toggle").attr("class", "street-view-button-turn-on-mode");
                                                            
                                                            var _pegman_location = ___StreetViewPanoramaData.data.location;
                                                            create_street_view_panorama_object(_pegman_location.pano)
                                  }



                                  function create_street_view_panorama_object(___location__pano){

                                        if (panorama) {
                                                          console.log(' panorama already exist,  do not create new object, just update old object ')
                                                          update_street_view(___location__pano)
                                        } else { 
                                                      console.log('...  create new panorama ...  ')
                                                      panorama = new google.maps.StreetViewPanorama(document.getElementById('street_view'));
                                                      panorama.setPano(___location__pano);
                                                      panorama.setPov({
                                                                        heading: 270,
                                                                        pitch: 0,
                                                                      });
                                                      
                                                      // must set visible to true, otherwise, if last time, no street view available, will set visible to false. 
                                                      panorama.setVisible(true);

                                                      //Binds this new StreetViewPanorama to the map. This new panorama overrides the existing default StreetViewPanorama, allowing the map to bind to an external panorama outside of the map.
                                                      map.setStreetView(panorama); 


                                                                                                               

                                        }// if 
                                  }


                                  function update_pegman2geojson(one_geojson_feature){

                                    console.log('update pegman 2 geojson ::::: event :::::', one_geojson_feature)

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
                                    var pegman_turfCenter = turf.center(one_geojson_feature);
                                    console.log(' update pegman 2 geojson turf center ', pegman_turfCenter)

                                    var pegman_center_lat  = pegman_turfCenter.geometry.coordinates[1]
                                    var pegman_center_long = pegman_turfCenter.geometry.coordinates[0]
                                    console.log('pegman center lat ...', pegman_center_lat )
                                    console.log('pegman center long ...', pegman_center_long )
                                              


                                    // for polygon only, center of polygon maybe out of map view, user move mouse, pegman disappear from map view.
                                    // polygon center move out of current map view,  do not move pegman
                                    var currentBounds = map.getBounds();

                                    /* not use half size of bound, use full size of bound
                                    var center = currentBounds.getCenter();
                                    var ne = currentBounds.getNorthEast();
                                    var sw = currentBounds.getSouthWest();
                                    var newNeLat = (ne.lat() + center.lat()) / 2;
                                    var newNeLng = (ne.lng() + center.lng()) / 2;
                                    var newSwLat = (sw.lat() + center.lat()) / 2;
                                    var newSwLng = (sw.lng() + center.lng()) / 2;
                                    var newNe = new google.maps.LatLng(newNeLat, newNeLng);
                                    var newSw = new google.maps.LatLng(newSwLat, newSwLng);
                                    var halfSizeBounds = new google.maps.LatLngBounds(newSw, newNe);
                                    */

                                    if (currentBounds) {
                                      if (currentBounds.contains({lat: pegman_center_lat, lng: pegman_center_long})) {
                                        
                                          console.log("The point is within the map bounds.");
                                          //  polygon center is within the current map view bounds, move the pegman



                                          //Directly Accessing Street View Data based on current map center location, radius 1km  https://developers.google.com/maps/documentation/javascript/examples/streetview-service
                                          _street_view_service.getPanorama({

                                            location: { lat: pegman_center_lat, lng: pegman_center_long },  // https://developers.google.com/maps/documentation/javascript/streetview

                                            //preference: google.maps.StreetViewPreference.BEST,  //do not use 'best', it far away from map center  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewPreference
                                            preference: google.maps.StreetViewPreference.NEAREST,

                                            //radius: 10,  //for test only, generate ' street view not found' alert
                                            radius: 1000,   // unit in meter, "preference" use "NEAREST", "radius" must use 1km or less,  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewLocationRequest

                                          }).then(found_and_process_street_view_data_handler)
                                          .catch(_streetview_not_available_handler)
                                          .finally();





                                      } else {
                                        console.log("The point is outside the map bounds.");
                                        // polygon center is out of current map view bounds,  do not move pegman
                                      }
                                    } else {
                                      console.log("Map bounds are not yet available. The map may not be fully initialized.");
                                    }



                                    

                                  }

                                 

                                  function update_street_view(___location__pano) {
                                                
                                                          // street view window is open
                                                            console.log('... update street view window by nearest available ___location__pano ...  with existing panorama ( with pano id)  ') 
                                                            
                                                            panorama.setPano(___location__pano);
                                                            panorama.setPov({
                                                              heading: 270,
                                                              pitch: 0,
                                                            });
                                                            // must set visible to true, otherwise, if last time, no street view available, will set visible to false. 
                                                            panorama.setVisible(true);
                                                
                                  }



                                  

                        // .............. end   ..............  street view is always on  ..............  
                        /**/

