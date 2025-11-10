


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




 var _map_type = 'hybrid' // default    roadmap, satellite, terrain

 var _panto = 1 // default is 1, without _panto means 1,    0 means, not pan to real location
 var need_pan_to_real_location = true



 // -2 means current showing not available,  -1 means total count not available
 var _current_rendering_feature = -2 
 var _current_area_count_of_feature = -2
 var _total_count_of_feature = -1;

 



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

          /**/
          //  --- yelp manual drawing circle   --- 
          /**/


       


          async function nearby_poi(_radiusMeter, _centerLng, _centerLat){

              drawing_circle(_radiusMeter, _centerLng, _centerLat)




                ____nearby_url = yelp_api_search



                //  - - reset to 0 for everything  - - 
                _paged_poi_array = []
               
                _paged_offset = 0
                // offset integer 0 to 1000, Offset the list of returned results by this amount
                _paged_offset_url_param = '&offset=' + _paged_offset
                // - -  end - - reset to 0 for everything

     


                
                search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                  console.log('search_poi_keyword --->  ', search_poi_keyword)
                  // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
                  if (search_poi_keyword){
                    // If categories is not included the endpoint will default to searching across businesses from a small number of popular categories.
                    ____nearby_url += 'categories=' + search_poi_keyword
                  }//if



                // . .   limit by bound, lat lng with minium radius
                ____nearby_url += '&latitude=' + _centerLat
                ____nearby_url += '&longitude=' + _centerLng
                ____nearby_url += '&radius=' + _radiusMeter
                ____nearby_url += '&limit=' + _yelp_page_size  // integer 0 to 50 Defaults to 20
                

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

               

                this_page_poi_array = response_string.businesses
                _paged_poi_array.push(this_page_poi_array)


                
               

               
               


                
                // ----------------download rest of result ----------------
                
                while ((_paged_offset < _total_poi) && (_paged_offset < max_yelp_offset)) {

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



                
                        /**/
                        //  - - -  point 2 diamond point     - - -  for - poi only -
                        /**/

                        _this_newOnly_poi_geojson = geojsonPoint2diamond(_this_newOnly_poi_geojson)

                        /**/
                        //  --- end  ---  point 2 diamond point   - - - 
                        /**/






                _current_geojson_POI = map.data.addGeoJson(_this_newOnly_poi_geojson);
                // manual draw circle only
                _this_newOnly_geojsonGoogleHandlerArray.push(_current_geojson_POI)

                set_poi_style(_poi_strokeColor, _poi_strokeWeight, _poi_fillColor, _poi_pointRadius)
              // . .  end . . efficient core newOnly  . - .


            }//function


       //   ---  end  --- yelp POI max ---




                    //  . . efficient core newOnly  . - .
                    function clear_all_poi(){

                      //  . . efficient core newOnly  . - .
                           var _thisNewGeoJsonGoogleHandler
                           if (_this_newOnly_geojsonGoogleHandlerArray){
                             
                             for (var l = 0; l< _this_newOnly_geojsonGoogleHandlerArray.length; l++){
                               _thisNewGeoJsonGoogleHandler = _this_newOnly_geojsonGoogleHandlerArray[l]
                               for (var k = 0; k< _thisNewGeoJsonGoogleHandler.length; k++){
                                 map.data.remove(_thisNewGeoJsonGoogleHandler[k]);
                               }// for
                             }// for


                           }//if
                           
                             _this_newOnly_geojsonGoogleHandlerArray = []
                      // . .  end . . efficient core newOnly  . - .


                      

                     _all_poi_uniqueID_array = []
                     _all_poi_flat_array = []

                   _total_poi = 0
                      empty_info_outline_Tab()
                     $("#poi_total").html(_total_poi)
                 }
             



          /**/
          //  --- end  ---  yelp manual drawing circle    --- 
          /**/







         




           function init_poi_ui(){



                /**/
                //  --- side by side   --- 
                /**/

                $('#info_outline').hide()
                $('#close_info_outline_panel').on('click', function(event) {
                    empty_info_outline_Tab()
                });
                /**/
                //   --- end  ---   --- side by side   --- 
                /**/

  
           
              /**/
              //  . . search bar . . 
  
                      console.log('url param search poi',  search_poi_keyword)
  
                      // first time, 1 time
                      // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
                      if (search_poi_keyword){
                                  search_poi_keyword = search_poi_keyword.toLowerCase().trim();
                                  $('#search_poi_input').val(search_poi_keyword);

                                  // first time, 1 time
                                  //search_poi()
                      }// if
              
              
                                                  
                      // only update URL search_data=xxx, not perform real search.
                      $("#search_poi_input").on('keyup', update_search_poi_content);
              
                     
  
              //  . . end . .  . . search bar . . 
              /**/
  
            }
                 
  
  

            
              function update_search_poi_content(){
                search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                console.log('search_poi_keyword --->  ', search_poi_keyword)
                update_url_parameter('poi', search_poi_keyword);
              }
                 
  
  

/**/
//  --- end  ---  yelp POI on google    --- 
/**/


                              





/**/
//  - - -  point 2 diamond point     - - - 
/**/


var diamondDiagonalMeter = 5 // default

function geojsonPoint2diamond(_geojsonPoint){

   
    var diamondPointGeojsonFeatures_array = []

   //  - - -  point 2 diamond point     - - -  for - poi only -
   // do not change size
   //diamondDiagonalMeter = zoom2diamondEdgeMeter[_center_zoom]

    for (let i = 0; i < _geojsonPoint.features.length; i++) {

              

              var point_element = _geojsonPoint.features[i]
              //console.log('point_element ',i,  point_element)
              
              

              // geojson type, point [lng,lat], multipoint[[lng,lat], [lng,lat], ], 
              switch (point_element.geometry.type) {

                case "Point":
                              // point [lng,lat]
                              var point_lng = point_element.geometry.coordinates[0]
                              var point_lat = point_element.geometry.coordinates[1]
                              var diamond_coordinate = point2diamond(diamondDiagonalMeter, point_lng, point_lat)
                              
                              var diamondPoint_element = {
                                                "type": "Feature",
                                                "geometry": {
                                                  "type": "Polygon",
                                                  "coordinates": diamond_coordinate
                                                },
                                                "properties": point_element.properties
                                              }


                              break;

                case "MultiPoint":
                                    // multipoint[[lng,lat], [lng,lat], ], 
                                    var multipoint_coord_array = point_element.geometry.coordinates

                                    for (let mp = 0; mp < multipoint_coord_array.length; mp++) {
                                      var point_lng = multipoint_coord_array[mp][0]
                                      var point_lat = multipoint_coord_array[mp][1]
                                      var diamond_coordinate = point2diamond(diamondDiagonalMeter, point_lng, point_lat)
                              
                                      var diamondPoint_element = {
                                                  "type": "Feature",
                                                  "geometry": {
                                                    "type": "Polygon",
                                                    "coordinates": diamond_coordinate
                                                  },
                                                  "properties": point_element.properties
                                                }
                                      }//for
                                    
                                    break;

                default:
                  console.log("warning: geojson type is not point, not multipoint !! failed to convert point to diamond !")
              }




                diamondPointGeojsonFeatures_array.push(diamondPoint_element)

            }//for

   var diamondPointGeojson = {
      type: "FeatureCollection",
      features: diamondPointGeojsonFeatures_array
    }

  return diamondPointGeojson

}


function point2diamond(_diagonal_meter, point_lng, point_lat){

   var _centerLngLatPoint = { lng : point_lng, lat : point_lat }

   var half_diagonal_meter = Number(_diagonal_meter / 2)

    mid_north = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_diagonal_meter, 0);
          mid_north_lat = mid_north.lat();
          mid_north_lng = mid_north.lng();
          //console.log('mid_north', mid_north_lng, mid_north_lat)

          mid_east = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_diagonal_meter, 90);
          mid_east_lat = mid_east.lat();
          mid_east_lng = mid_east.lng();
          //console.log('mid_east', mid_east_lng, mid_east_lat)

          mid_south = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_diagonal_meter, 180);
          mid_south_lat = mid_south.lat();
          mid_south_lng = mid_south.lng();
          //console.log('mid_south', mid_south_lng, mid_south_lat)


          mid_west = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_diagonal_meter, 270);
          mid_west_lat = mid_west.lat();
          mid_west_lng = mid_west.lng();
          //console.log('mid_west', mid_west_lng, mid_west_lat)

   return [
            [
              [mid_north_lng, mid_north_lat],
              [mid_east_lng, mid_east_lat],
              [mid_south_lng, mid_south_lat],
              [mid_west_lng, mid_west_lat],
              [mid_north_lng, mid_north_lat] 
          ]
        ]       

}





/**/
//  --- end  ---  point 2 diamond    - - - 
/**/










/**/
//  -  -  - guided ring for manual drawing circle or square  -  -  - 
/**/
            var circle_guideRing

            // only for manual, circle has click event 
            function drawing_circle_guideRing(_radiusMeter, _centerLng, _centerLat){

              clear_circle_guideRing()

              console.log('drawing guide ring at ', _radiusMeter, _centerLng, _centerLat)

                /*
              // red solid line
               circle_guideRing = 
               new google.maps.Circle({
                 strokeColor: 'rgba(255, 0, 0, 1)',
                 strokeOpacity: 0.877,
                 strokeWeight: 3.45,
                 fillColor: 'rgba(255, 0, 0, 0)', // ring, is empty fill
                 fillOpacity: 0.171,
                 map,
                 center: { lat: _centerLat, lng: _centerLng },
                 radius: _radiusMeter,
               });
              */

               // red dash line 


                // dotted line https://stackoverflow.com/questions/41967862/dashed-polygons-google-maps
                dottedlineSymbol = {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillOpacity: 0.97,
                    scale: 4,
                };


                // dash line https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-dashed
                dashlineSymbol = {
                  path: "M 0,-1 0,1",
                  strokeOpacity: 1,
                  scale: 4,
                };

                var _centerLngLatPoint = { lat: _centerLat, lng: _centerLng }

              circle_guideRing = new google.maps.Polyline({
                                  strokeColor: '#fc0404ff',
                                  strokeOpacity: 0,
                                  icons: [{
                                    //icon: dottedlineSymbol,
                                    icon: dashlineSymbol,
                                    offset: '0',
                                    //repeat: '13px', // for dotted line
                                    repeat: '20px',   // for dash line
                                  }],
                                  path: [
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 0),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 10),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 20),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 30),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 40),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 50),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 60),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 70),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 80),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 90),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 100),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 110),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 120),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 130),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 140),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 150),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 160),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 170),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 180),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 190),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 200),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 210),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 220),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 230),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 240),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 250),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 260),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 270),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 280),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 290),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 300),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 310),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 320),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 330),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 340),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 350),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 360),

                                        ],
                                  map: map
                              });

               // . . . end   . . .  red dash line   . . . 




              // only for manual, guide ring has click event 
               google.maps.event.addListener(circle_guideRing, 'click', function(event) {

                // This function will be executed when the guide ring is clicked
                console.log('guide ring clicked at:', event.latLng.lat(), event.latLng.lng());
                

                        /**/
                        //  --- google manual drawing circle   --- 
                        /**/
                        var click_lat = Number(event.latLng.lat());
                        var click_lng = Number(event.latLng.lng());
                        var click_lat_lng_point = { lng : click_lng, lat : click_lat }
                        console.log(' circle get clicked . . .  lng, lat ', click_lng, click_lat)

                        nearby_poi(current_circle_radius, click_lng, click_lat)

                        /**/
                        //  --- end  ---  google manual drawing circle    --- 
                        /**/


              });



               google.maps.event.addListener(circle_guideRing, 'mousemove', function(event) {
                
                
                console.log('guide ring mouse move at:', event.latLng.lat(), event.latLng.lng());
                
                        /**/
                        //  --- google manual drawing circle   --- 
                        /**/
                        var mouse_lat = Number(event.latLng.lat());
                        var mouse_lng = Number(event.latLng.lng());
                        console.log('guide ring   ,  catch   ,   mouse move event   , pointer lat, lng',mouse_lng, mouse_lat)
                        drawing_circle_guideRing(current_circle_radius, mouse_lng, mouse_lat)
                        /**/
                        //  --- end  ---  google manual drawing circle    --- 
                        /**/
                });


              
            }



            function clear_circle_guideRing(){
               if (circle_guideRing) { circle_guideRing.setMap(null)}
            }

/**/
//  -  -  - end  -  -  -  guided ring for manual drawing circle or square    -  -  - 
/**/




