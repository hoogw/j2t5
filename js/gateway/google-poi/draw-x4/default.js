


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
//  --- google poi      --- 
/**/
  
              function show_info_outline_Tab(___properties){
                
                $('#info-window-div').html(poi_viewer_for_download(___properties))
             


                /**/
                //  --- side by side   --- 
                /**/
                        
                // for embed at top, right and or left side info window, always scroll to top
                $("#info_outline").show()
                //$('#flex_1').scrollTop(0); // build in scroll to top popup info window


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
//  --- end  ---  google poi    --- 
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
                          //  --- google poi      --- 
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
                          //  --- end  ---  google poi    --- 
                          /**/

                        }



                            



                      
                                








/**/
//  --- google poi      --- 
/**/       

        /**/
        //  --- google poi circle 4x4   --- 
        /**/

           

            // only for manual, circle has click event 
            function drawing_4circle(_radiusMeter, _centerLng, _centerLat){


              get_4circle_radiusCenter(_radiusMeter, _centerLng, _centerLat)

              for (let i = 0; i < circle_centerPoint_array.length; i++) {
               

                  // 4x circle center lat lng  
                  _centerLng = circle_centerPoint_array[i].lng();
                  _centerLat = circle_centerPoint_array[i].lat();
                  console.log('drawing  4x circle center lat lng', i,  _4circle_radius, _centerLng, _centerLat)

                  circle_range = 
                  new google.maps.Circle({
                    strokeColor: 'rgba(255, 0, 0, 1)',
                    strokeOpacity: 0.877,
                    strokeWeight: 1.45,
                    fillColor: 'rgba(255, 0, 0, 1)',
                    fillOpacity: 0.171,
                    map,
                    center: { lat: _centerLat, lng: _centerLng },
                    radius: _4circle_radius,
                  });
                  
                  circle_array.push(circle_range)



                  // only for manual, circle has click event 
                  google.maps.event.addListener(circle_range, 'click', function(event) {
                    // This function will be executed when the circle is clicked
                    console.log('Circle clicked at:', event.latLng.lat(), event.latLng.lng());
                    

                            /**/
                            //  --- google poi circle 4x4   --- 
                            /**/
                            var click_lat = Number(event.latLng.lat());
                            var click_lng = Number(event.latLng.lng());
                            var click_lat_lng_point = { lng : click_lng, lat : click_lat }
                            console.log(' circle get clicked . . .  lng, lat ', click_lng, click_lat)

                            nearby_poi_x_circle(current_circle_radius, click_lng, click_lat)

                            /**/
                            //  --- end  ---  google poi circle 4x4    --- 
                            /**/


                  });



              }//for


            }

           




                  
                    
            async function nearby_poi_x_circle(_radiusMeter, _centerLng, _centerLat){

                drawing_4circle(_radiusMeter, _centerLng, _centerLat)

                      
               
              /**/
              //  -  -  - category  -  -  - 
              /**/
                  _category_string = $("#category-input").val()
                  update_url_parameter("poicategory",_category_string)
                  if (_category_string){
                        _category_array = _category_string.split(","); // Splits by comma
                  } else {
                        _category_array = []
                  }
                  console.log('category array', _category_array); // Output: ["apple", "banana", "orange"]
              /**/
              //  -  -  - end  -  -  -  category    -  -  - 
              /**/




             //https://developers.google.com/maps/documentation/places/web-service/nearby-search
             var google_place_header = {

              // must use this to post json
              "Content-Type": "application/json",
             

              // required
              "X-Goog-FieldMask" : google_place_fieldMask,
              "X-Goog-Api-Key":  _google_place_api_key, // local restriction applied


             

             }











                for (let i = 0; i < circle_centerPoint_array.length; i++) {


                  // 4x circle center lat lng  
                  _centerLng = circle_centerPoint_array[i].lng();
                  _centerLat = circle_centerPoint_array[i].lat();




                  var google_nearby_post_data = {

                
                  // https://developers.google.com/maps/documentation/places/web-service/nearby-search
                  // optional,      includedTypes/excludedTypes, includedPrimaryTypes/excludedPrimaryTypes
                  "includedPrimaryTypes": _category_array,
                  //"includedTypes": _category_array,

                  "maxResultCount": max_google_poi_limit,

                  // required
                  "locationRestriction": {
                                          "circle": {
                                            "center": {
                                              "latitude": _centerLat,
                                              "longitude": _centerLng
                                            },
                                            "radius": _4circle_radius
                                          }
                                        },
                }

                  

                  
                  var response_raw =  await $.ajax({
                      url: google_nearby,
                      method: 'POST',
                      dataType: 'json',
                      headers: google_place_header,
                      
                      // do not let jquery convert object to string,   
                      processData: false, // default is true, jquery convert object to string in its own rule, different from json,stringify
                      // must convert object to string, 
                      data: JSON.stringify(google_nearby_post_data),

                      success: function(data){
                        console.log('poi search by categories success', data)
                      }, 
                      error: function(jqXHR, textStatus, errorThrown) {
                        // Handle error response
                        console.error("Error:", textStatus, errorThrown);
                      }
                    }); 
                    console.log(' place search nearby results : ', response_raw);
                        
                    
                    var places = []
                if (response_raw.hasOwnProperty("places") && (response_raw.places)){
                  places = response_raw.places
                }
                    
           




                              
                      //  . . efficient core newOnly  . - .
                      _this_newOnly_result_array = []

                        // not use, 
                        // Merge the second array into the first one https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
                        //_all_poi_flat_array.push(...places)

                        // test if this new poi already exist
                        for (let p = 0; p < places.length; p++) {
                          _uniqueID = places[p].id
                          if (_all_poi_uniqueID_array.includes(_uniqueID)){
                            // already exist, skip
                          } else {
                            _all_poi_uniqueID_array.push(_uniqueID)
                            _all_poi_flat_array.push(places[p])
                          
                            //  . . efficient core newOnly  . - .
                            _this_newOnly_result_array.push(places[p])

                          }//if
                        }//for
                        _total_poi = Number(_all_poi_flat_array.length)
                        $("#poi_total").html(_total_poi)

                        // special version only for google place poi
                        poi_geojson = poi_to_geojson(_all_poi_flat_array)
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

                        
                      // . .  end . . efficient core newOnly  . - .


                     }//for



                     set_poi_style(_poi_strokeColor, _poi_strokeWeight, _poi_fillColor, _poi_pointRadius)

                    }//function




              

        /**/
        //  --- end  ---  google poi circle 4x4    --- 
        /**/







                 
  
  

/**/
//  --- end  ---  google poi    --- 
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





