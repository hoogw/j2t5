


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
                  
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))

                  

                  /**/
                  // - - - - download geojson  - - - - 
                  /**/
                  _geojson_object_selected_feature = {type: "FeatureCollection", features: [_geojson_hovered]} 

                  /**/
                  //  - - - -  end  - - - -  download geojson   - - - - 
                  /**/


                 
                });

                // for embed at top, right and or left side info window, always scroll to top
                $('#flex_1').scrollTop(0); // build in scroll to top popup info window
              }


              function empty_info_outline_Tab(){
                              
                $('#info-window-div').html("")
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

                            var _latlngzoom_html = ''
                            //_latlngzoom_html +='visible area : '
                            _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
                            _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
                            _latlngzoom_html += ',zoom:' + _center_zoom
                            $("#lat-lng-zoom").html(_latlngzoom_html)

                        }



                            


       





/**/
//  - - -  point 2 diamond point     - - - 
/**/


var diamondDiagonalMeter = 5 // default

function geojsonPoint2diamond(_geojsonPoint){

   
    var diamondPointGeojsonFeatures_array = []

   diamondDiagonalMeter = zoom2diamondEdgeMeter[_center_zoom]

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
//  - - -  max load     - - - 
/**/      

var limit_radio_value

function init_max_load(){



  if (_supportsPagination){
    $("#support-pagination").html("Support Limit(pagination)")
  } else {
    $("#support-pagination").html("Not Support Limit(pagination), max return count used")
  }

   if (maxRecordCount){
    $("#max-record-count").html(maxRecordCount)
   }

  if (tileMaxRecordCount){
    $("#1x-tile-max").html(formatNumber(tileMaxRecordCount))
    $("#2x-tile-max").html(formatNumber(tileMaxRecordCount * 2))
    $("#4x-tile-max").html(formatNumber(tileMaxRecordCount * 4))
    $("#8x-tile-max").html(formatNumber(tileMaxRecordCount * 8))
  } 

  if (standardMaxRecordCount){
    $("#1x-standard-max").html(formatNumber(standardMaxRecordCount))
    $("#2x-standard-max").html(formatNumber(standardMaxRecordCount * 2))
    $("#4x-standard-max").html(formatNumber(standardMaxRecordCount * 4))
    $("#8x-standard-max").html(formatNumber(standardMaxRecordCount * 8))
  } 
  
  
  // first time set radio
  limit_radio_value = limit
  $("input[type=radio][name=max-limit-radio][value=" + limit_radio_value + "]").prop('checked', true);

  switch (limit_radio_value) {
        case "1x-tile-max":
          limit = tileMaxRecordCount
          break;
        case "2x-tile-max":
          limit = tileMaxRecordCount * 2
          break;
        case "4x-tile-max":
          limit = tileMaxRecordCount * 4
          break;
        case "8x-tile-max":
          limit = tileMaxRecordCount * 8
          break;



        case "1x-standard-max":
          limit = standardMaxRecordCount
          break;
        case "2x-standard-max":
          limit = standardMaxRecordCount * 2
          break;
        case "4x-standard-max":
          limit = standardMaxRecordCount * 4
          break;
        case "8x-standard-max":
          limit = standardMaxRecordCount * 8
          break;
        


        
        default:
          limit = parseInt(limit_radio_value)
      }//switch



  // radio change event
  $("input[type='radio'][name='max-limit-radio']").change(function(){

    limit_radio_value = $("input[type='radio'][name='max-limit-radio']:checked").val();

    switch (limit_radio_value) {
        case "1x-tile-max":
          limit = tileMaxRecordCount
          break;
        case "2x-tile-max":
          limit = tileMaxRecordCount * 2
          break;
        case "4x-tile-max":
          limit = tileMaxRecordCount * 4
          break;
        case "8x-tile-max":
          limit = tileMaxRecordCount * 8
          break;


        case "1x-standard-max":
          limit = standardMaxRecordCount
          break;
        case "2x-standard-max":
          limit = standardMaxRecordCount * 2
          break;
        case "4x-standard-max":
          limit = standardMaxRecordCount * 4
          break;
        case "8x-standard-max":
          limit = standardMaxRecordCount * 8
          break;
        
        default:
          limit = parseInt(limit_radio_value)
      }

      console.log(" limit change to   ", limit);
      update_url_parameter('limit', limit_radio_value);


      // every time change limit, re-load everything as new limit
      get_map_bound()

  });// event

              



}

/**/
//  --- end  ---  max load   - - - 
/**/



                              



                              


