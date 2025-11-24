


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



              

       

  
/**/
//  --- yelp POI on google      --- 
/**/
  
              function show_info_outline_Tab(___properties){
                
                //$('#info-window-div').html(poi_viewer_for_download(___properties))
                $('#info-window-div').html(poi_viewer(___properties))


                /**/
                //  --- side by side   --- 
                /**/
                        
                // for embed at top, right and or left side info window, always scroll to top
                $("#info_outline").show()
                $('#flex_1').scrollTop(0); // build in scroll to top popup info window


                /**/
                //   --- end  ---   --- side by side   --- 
                /**/
                
              }


              function empty_info_outline_Tab(){

                

                /**/
                //  --- side by side   --- 
                /**/
                        
                $('#info_outline').hide();


                /**/
                //   --- end  ---   --- side by side   --- 
                /**/
                              
                
                $('#info-window-div').html("")
              }


/**/
//  --- end  ---  yelp POI on google    --- 
/**/




                             
                        function display_count_info(_subject, ___showing_cnt, ___all_cnt, ____rendering_cnt){


                          $('#layer-info-vertical').html('<a  target="_blank" href="' + _url +  '/' + _layer_id +'">' + _subject + '</a>')

                          console.log(' update statistic info', ___showing_cnt, ___all_cnt)

                          if (isNaN(___showing_cnt)){ ___showing_cnt = '...' } // not available...
                          if (isNaN(___all_cnt)){ ___all_cnt = '...' } // not available...
                          
                          $('#feature-on-map').html(___showing_cnt)
                          $('#total-feature').html(___all_cnt)
                             
                        }
                        





                        function valid_lat_lng(_lat, _lng){


                          if ((_lat<= 90 ) && (_lat >= -90) && (_lng <= 180) && (_lng >= -180)){


                            return true

                          } else {

                          return false
                          }

                        }


              
                        function validate_long(_invalid_long){

                                  var _valid_long

                                  if (_invalid_long > 180) {
                                    _valid_long = -180 + (_invalid_long - 180)

                                  } 

                                  if (_invalid_long < -180) {
                                    _valid_long = 180 - (_invalid_long + 180)

                                  } 


                                  console.log(' ! ! !  warning ! ! !  invalid long found ! ! !  ! ! !  invalid ----> valid  ! ! !  ! ! !  ',  _invalid_long, _valid_long)

                                  return _valid_long

                        }
        


                        function update_center_latLngZoom(){

         

                          var center_latLng = map.getCenter();   // local variable
                          _center_lat = center_latLng.lat();     // global variable 
                          _center_long = center_latLng.lng();    // global variable 
                          _center_zoom = parseInt(map.getZoom());          // global variable 

                          console.log(' -------- update  -------- center  -------- lat  -------- Lng  -------- Zoom  -------- ', _center_lat, _center_long, _center_zoom)
                          
                          // google bug, sometime, google give long =242, but it really is long=-117
                          if (valid_lat_lng(_center_lat, _center_long)){

                             // nothing to do
                          } else {

                            _center_long =  validate_long(_center_long)


                          }



                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("center_lat", _center_lat);
                            searchParams.set("center_long", _center_long);
                            searchParams.set("center_zoom", _center_zoom);
                            searchParams.set("panto", 0);

                            // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                            //window.location.search = searchParams.toString();

                            // instead avoid reload
                            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                            history.pushState(null, '', newRelativePathQuery);
                            
                            }// if






                                                      
                          /**/
                          //  --- yelp POI on google      --- 
                          /**/

                           var _latlngzoom_html = ''
                           //_latlngzoom_html +='visible area : '
                           _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
                           _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
                           _latlngzoom_html += ',zoom:' + _center_zoom
                           //_latlngzoom_html += '&nbsp;&nbsp;'
                           _latlngzoom_html += ',radius:' + get_center_radius_in_map_bound() + 'm'
                           $("#lat-lng-zoom").html(_latlngzoom_html)

                          /**/
                          //  --- end  ---  yelp POI on google    --- 
                          /**/

                        }



                            













/**/
//  --- yelp POI on google      --- 
/**/       



            async function nearby_poi(_radiusMeter, _centerLng, _centerLat){

              // yelp always use circle for both s e a r c h k e y w o r d & c a t e g o r y,
              // only d r a w   c i r c l e when radius large than max 
              if (_radiusMeter >= max_yelp_poi_radius_meter){
                  drawing_circle(_radiusMeter, _centerLng, _centerLat)
              }//if
              





                ____nearby_url = yelp_api_search



                

            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/
                  search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                  console.log('search_poi_keyword --->  ', search_poi_keyword)
                  update_url_parameter('poi', search_poi_keyword);
                  
                  // yelp support search empty keywprd for all things,
                  if (search_poi_keyword){
                    // If term is not included the endpoint will default to searching across businesses from a small number of popular categories.
                    ____nearby_url += 'term=' + search_poi_keyword
                  } else {
                    // empty keyword means show all things, otherwise, uncommnent alert to require keyword
                    //return alert("search keyword required !")
                  }//if

            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/

                console.log('nearby poi url ', ____nearby_url + _paged_offset_url_param )

     

              // . .   limit by bound, lat lng with minium radius
                _center_radius_in_meter = get_center_radius_in_map_bound()
                ____nearby_url += '&latitude=' + _center_lat
                ____nearby_url += '&longitude=' + _center_long
                ____nearby_url += '&radius=' + _center_radius_in_meter
               
               
               
               // yelp max allow 240, 50 per page, 
                ____nearby_url += '&limit=' + _yelp_page_size  // integer 0 to 50 Defaults to 20
                //  - - reset to 0 for everything  - - 
                _paged_poi_array = []
               
                _paged_offset = 0
                // offset integer 0 to 1000, Offset the list of returned results by this amount
                _paged_offset_url_param = '&offset=' + _paged_offset
                // - -  end - - reset to 0 for everything


           

                 console.log('nearby poi url ', ____nearby_url + _paged_offset_url_param )




                
                var response_string =  await $.ajax({
                  url: ____nearby_url + _paged_offset_url_param,
                  headers: {
                  'Authorization': yelp_api_key,  //'Bearer xxxxxx',
                  },
                  method: 'GET',
                  dataType: 'json',
                  success: function(data){
                    console.log('poi search by categories success', data)
                  }, 
                  error: function(jqXHR, textStatus, errorThrown) {
                    // Handle error response
                    console.error("Error:", textStatus, errorThrown);
                  }
                });  

                _total_poi = Number(response_string.total)
                //$("#poi_on_map").html(_total_poi)

                this_page_poi_array = response_string.businesses
                _paged_poi_array.push(this_page_poi_array)

                
                // ----------------download rest of result ----------------
                while (((_paged_offset + _yelp_page_size) < _total_poi) && ( (_paged_offset + _yelp_page_size) < max_yelp_offset)) {

                    _paged_offset += _yelp_page_size
                    _paged_offset_url_param = '&offset=' + _paged_offset
                    console.log('nearby poi url, offset is  ', _paged_offset,  ____nearby_url + _paged_offset_url_param )

                    try{
                    
                                var response_string =  await $.ajax({
                                  url: ____nearby_url + _paged_offset_url_param,
                                  headers: {
                                  'Authorization': yelp_api_key,  //'Bearer xxxxxx',
                                  },
                                  method: 'GET',
                                  dataType: 'json',
                                  success: function(data){
                                    console.log('poi search by categories success', data)

                                  }, 
                                  error: function(jqXHR, textStatus, errorThrown) {
                                    // Handle error response
                                    console.error("Error:", textStatus, errorThrown);
                                    console.log('break loop because of Error at offset ',  _paged_offset )
                                    
                                  }

                                });  

                                this_page_poi_array = response_string.businesses
                                if (this_page_poi_array.length){
                                  console.log('add page, offset ', _paged_offset)
                                  _paged_poi_array.push(this_page_poi_array)
                                } else {
                                  console.log('break loop because of empty result at offset ',  _paged_offset )
                                  break; // b r e a k while loop
                                }

                    } catch{

                      console.log('break loop because of catch error at offset ',  _paged_offset )
                      break; // b r e a k while loop

                    }

                }// while
                // ------ end ----------download rest of result ----------------



                //  . . efficient core newOnly  . - .
                _this_newOnly_result_array = []



                // test if this new poi already exist
                for (let i = 0; i < _paged_poi_array.length; i++) {
                  
                    this_page_poi_array = _paged_poi_array[i]
                    for (let j = 0; j < this_page_poi_array.length; j++) {
                              // test if this new poi already exist
                              _uniqueID = this_page_poi_array[j].id
                              if (_all_poi_uniqueID_array.includes(_uniqueID)){
                                // already exist, skip
                              } else {
                                _all_poi_uniqueID_array.push(_uniqueID)
                                _all_poi_flat_array.push(this_page_poi_array[j])
                              
                                //  . . efficient core newOnly  . - .
                                _this_newOnly_result_array.push(this_page_poi_array[j])

                              }//if
                    }//for

                }//for

                
                poi_geojson = poi_to_geojson(_all_poi_flat_array)

                _total_poi = Number(_all_poi_flat_array.length)
                $("#poi_total").html(_total_poi)

                console.log('poi geojson', poi_geojson)




                //  . . efficient core newOnly  . - .
                _this_newOnly_poi_geojson = poi_to_geojson(_this_newOnly_result_array)
                _current_geojson_POI = map.data.addGeoJson(_this_newOnly_poi_geojson);
                // manual draw circle only
              _this_newOnly_geojsonGoogleHandlerArray.push(_current_geojson_POI)


                set_poi_style(_poi_strokeColor, _poi_strokeWeight, _poi_fillColor, _poi_pointRadius)
                // . .  end . . efficient core newOnly  . - .




            }//function


       //   ---  end  --- yelp POI max ---



           
  
  

/**/
//  --- end  ---  yelp POI on google    --- 
/**/


                              









// .............. street view for poi ..............


  // for poi only
  var last_poi_lat = 0
  var last_poi_lng = 0


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



                                  

// .............. end   ..............  street view for poi  .............. 


