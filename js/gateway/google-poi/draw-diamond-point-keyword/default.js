


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
             
              }


              function empty_info_outline_Tab(){

                $('#info-window-div').html("")
              }


/**/
//  --- end  ---  google poi    --- 
/**/




                             
                        
                        





                        


              
                        
        


                        



                            


          








/**/
//  --- google textSearch poi      --- 
/**/     
        /**/
        //  --- google manual drawing square   --- 
        /**/
        async function search_poi(clickEventLatLng){

          
                          

                // localhost bypass key, production enforce use user's key
                var hostname = window.location.hostname;
                var port = window.location.port;

                console.log("hostname,port ", hostname, port);
                if (hostname === "localhost" && port === '10') {
                  console.log("The current URL is localhost.");
                  // nothing to do with key
                } else {

                    // enforce user use their own api key  
                    console.log("The current URL is not localhost. it is ", hostname);
                    _google_place_api_key = $('#googlemap-key-input').val(); 
                    update_url_parameter('yourGoogleKey', your_google_api_key)
                    if (your_google_api_key){
                    } else {
                        $('#info-window-div').html("<span style='font-size:large;'>Must use your Google Map API key !  <br></span>")   
                    }
                }//if
                // . . .  end   . . . localhost bypass key, production enforce use user's key



            drawing_shape(current_square_edge, clickEventLatLng)
                     
            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/
            search_poi_keyword = $("#search_poi_input").val()
            update_url_parameter('poi', search_poi_keyword);
            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/

           


             //https://developers.google.com/maps/documentation/places/web-service/nearby-search
             var google_place_header = {

              // must use this to post json
              "Content-Type": "application/json",
             

              // required
              "X-Goog-FieldMask" : google_place_fieldMask,
              "X-Goog-Api-Key":  _google_place_api_key, // local restriction applied


             

             }


              /**/
              //  -  -  - search poi keyword  -  -  - 
              /**/

              var _SWlong = mid_west_lng;
              var _SWlat  = mid_south_lat;
              var _NElong = mid_east_lng;
              var _NElat  = mid_north_lat;

              //console.log("bounds", bounds)
              var view_rectangle = {
                      "rectangle": {
                        "low": {
                          "latitude": _SWlat,
                          "longitude": _SWlong ,
                        },
                        "high": {
                          "latitude":  _NElat,
                          "longitude": _NElong,
                        }
                      }
                  }



              var google_textSearch_post_data = {

                // https://developers.google.com/maps/documentation/places/web-service/text-search
                "textQuery":search_poi_keyword,
                // not use
                //"includedTypes": _category_array,

                // only use one, but not use both
                  // all result must be inside of rectangle 
                "locationRestriction": view_rectangle,
                //result must be outside of rectangle 
                //"locationBias": map.getBounds(),
              }

            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/
             
            



              
            
             
              
              var response_raw =  await $.ajax({
                  url: google_searchText,
                  method: 'POST',
                  dataType: 'json',
                  headers: google_place_header,
                  
                  // do not let jquery convert object to string,   
                  processData: false, // default is true, jquery convert object to string in its own rule, different from json,stringify
                  // must convert object to string, 
                  data: JSON.stringify(google_textSearch_post_data),

                  success: function(data){
                    console.log('poi search by categories success', data)
                  }, 
                  error: function(jqXHR, textStatus, errorThrown) {
                    // Handle error response
                    console.log("ajax error:", textStatus, errorThrown, jqXHR);
                    var _error_message_html = jqXHR.responseJSON.error.message
                    $('#info-window-div').html("<span style='font-size:large;'>Must use your Microsoft Map API key !  <br></span>")
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

                        set_poi_style(_poi_strokeColor, _poi_strokeWeight, _poi_fillColor, _poi_pointRadius)
                      // . .  end . . efficient core newOnly  . - .


                    }//function

        /**/
        //  --- end  ---  google manual drawing square    --- 
        /**/
/**/
//  --- end  ---  google textSearch poi    --- 
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
        var shape_guideRing

        function clear_shape_guideRing(){
            if (shape_guideRing) { shape_guideRing.setMap(null)}
        }

        function drawing_shape_guideRing(_squareEdgeMeter, _centerLngLatPoint){

           clear_shape_guideRing()

          console.log('drawing quare at _squareEdgeMeter, _centerLngLatPoint', _squareEdgeMeter, _centerLngLatPoint)

          var half_edge_meter = Number(_squareEdgeMeter / 2)

          mid_north = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_edge_meter, 0);
          mid_north_lat = mid_north.lat();
          mid_north_lng = mid_north.lng();
          //console.log('mid_north', mid_north_lng, mid_north_lat)

          mid_east = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_edge_meter, 90);
          mid_east_lat = mid_east.lat();
          mid_east_lng = mid_east.lng();
          //console.log('mid_east', mid_east_lng, mid_east_lat)

          mid_south = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_edge_meter, 180);
          mid_south_lat = mid_south.lat();
          mid_south_lng = mid_south.lng();
          //console.log('mid_south', mid_south_lng, mid_south_lat)


          mid_west = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, half_edge_meter, 270);
          mid_west_lat = mid_west.lat();
          mid_west_lng = mid_west.lng();
          //console.log('mid_west', mid_west_lng, mid_west_lat)


          console.log('draw square  mid_north_lat, mid_south_lat, mid_east_lng, mid_west_lng', mid_north_lat, mid_south_lat, mid_east_lng, mid_west_lng) 


          /*
          // red solid line
          shape_guideRing = new google.maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.9,
            strokeWeight: 4,
            fillColor: 'rgba(255, 0, 0, 0)', // ring, is empty fill
            fillOpacity: 0.25,
            map,
            bounds: {
              north: mid_north_lat,
              south: mid_south_lat,
              east: mid_east_lng,
              west: mid_west_lng,
            },
          });
          */




          

          // red dash line 

          var hypotenuse = Math.hypot(half_edge_meter, half_edge_meter);
          north_east = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, hypotenuse, 45);
          south_east = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, hypotenuse, 135);
          south_west = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, hypotenuse, 225);
          north_west = google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, hypotenuse, 315);
         

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

          shape_guideRing = new google.maps.Polyline({
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
                      north_east,
                      south_east,
                      south_west,
                      north_west,
                      north_east,
                    ],
              map: map
          });

          // . . . end   . . .  red dash line   . . . 





          // only for manual, guide ring has click event 
          google.maps.event.addListener(shape_guideRing, 'click', function(event) {

                  // This function will be executed when the guide ring is clicked
                  console.log('guide ring clicked at:', event.latLng.lat(), event.latLng.lng());
          

                  /**/
                  //  --- google manual drawing square   --- 
                  /**/
                  var click_lat = Number(event.latLng.lat());
                  var click_lng = Number(event.latLng.lng());
                  var click_lat_lng_point = { lng : click_lng, lat : click_lat }
                  console.log(' circle get clicked . . .  lng, lat ', click_lng, click_lat)

                  
                  drawing_shape(current_square_edge, event.latLng)

                  select_feature_intersect_with_square(current_square_edge, click_lat_lng_point)

                  /**/
                  //  --- end  ---  google manual drawing square    --- 
                  /**/


          });



          google.maps.event.addListener(shape_guideRing, 'mousemove', function(event) {
          
          
          console.log('guide ring mouse move at:', event.latLng.lat(), event.latLng.lng());
          
                  /**/
                  //  --- google manual drawing square   --- 
                  /**/
                  var mouse_lat = Number(event.latLng.lat());
                  var mouse_lng = Number(event.latLng.lng());
                  var mouse_lat_lng_point = { lng : mouse_lng, lat : mouse_lat }
                  console.log('guide ring   ,  catch   ,   mouse move event   , pointer lat, lng',mouse_lng, mouse_lat)
                  drawing_shape_guideRing(current_square_edge, event.latLng)
                  
                  /**/
                  //  --- end  ---  google manual drawing square    --- 
                  /**/
          });





        }


/**/
//  -  -  - end  -  -  -  guided ring for manual drawing circle or square    -  -  - 
/**/


