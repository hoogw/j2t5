


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

var _total_poi = 0
var _all_poi_flat_array = []
var _all_poi_uniqueID_array = []
var _this_page_result_array = []

var _uniqueID

//  . . efficient core newOnly  . - .
var _this_newOnly_result_array = []
var _this_newOnly_poi_geojson  
// manual draw circle only
var _this_newOnly_geojsonGoogleHandlerArray = []


            var circle_range
            var circle_array = []
            
            function drawing_circle(_radiusMeter, _centerLng, _centerLat){
              //console.log('drawing circle at _radiusMeter, _centerLng, _centerLat', _radiusMeter, _centerLng, _centerLat)

               circle_range = 
               new google.maps.Circle({
                 strokeColor: 'rgba(255, 0, 0, 1)',
                 strokeOpacity: 0.877,
                 strokeWeight: 1.45,
                 fillColor: 'rgba(255, 0, 0, 1)',
                 fillOpacity: 0.171,
                 map,
                 center: { lat: _centerLat, lng: _centerLng },
                 radius: _radiusMeter,
               });
              
               circle_array.push(circle_range)
              
            }


            function clear_all_circle(){
              for (let i = 0; i < circle_array.length; i++) {
                if (circle_array[i]) { circle_array[i].setMap(null)}
              }
              circle_array = []
            }



            async function nearby_poi(_radiusMeter, _centerLng, _centerLat){



            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/

            // search by keyword, need map bound, not circle radius, so not drawing circle
            //d r a w i n g _ c i r c l e ( _  r a d i u s M e t e r , _ c e n t e r L n g , _c e n t e r L a t )

            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/


             
              
              
             // https://developers.google.com/maps/documentation/javascript/load-maps-js-api#use-legacy-tag
             var { Place } = await google.maps.importLibrary("places");
             // https://developers.google.com/maps/documentation/javascript/libraries





             
             

            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/
            search_poi_keyword = $("#search_poi_input").val()
            update_url_parameter('poi', search_poi_keyword);
            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/




              var google_place_request_param = {


                /**/
                //  -  -  - search poi keyword  -  -  - 
                /**/
                  // https://developers.google.com/maps/documentation/javascript/reference/place#SearchByTextRequest
                  textQuery:search_poi_keyword,
                /**/
                //  -  -  - end  -  -  -  search poi keyword    -  -  - 
                /**/

                // field options  https://developers.google.com/maps/documentation/javascript/place-class-data-fields
                fields: [
                          "id",  
                          "displayName", 
                          "nationalPhoneNumber",
                          "businessStatus",

                          "location", 
                          "formattedAddress", 
                          "adrFormatAddress",  
                          "addressComponents", 
                           


                         // "photos",
                         // "openingHours", 
                         //  "reviews", 
                         "types",
                         "primaryType",
                         // "",  
                         // "name",  //invalid
                        ],

                /**/
                //  -  -  - search poi keyword  -  -  - 
                /**/

                // only for keyword search text https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral
                locationRestriction: map.getBounds(),
                /**/
                //  -  -  - end  -  -  -  search poi keyword    -  -  - 
                /**/

                // optional parameters
                //includedPrimaryTypes: ["restaurant"],
                maxResultCount: max_google_poi_limit,   
                //rankPreference: SearchNearbyRankPreference.POPULARITY,
                //language: "en-US",
                //region: "us",
              };

              
                /**/
                //  -  -  - search poi keyword  -  -  - 
                /**/
                // https://developers.google.com/maps/documentation/javascript/reference/place#SearchByTextRequest
                var { places } = await Place.searchByText(google_place_request_param);
                /**/
                //  -  -  - end  -  -  -  search poi keyword    -  -  - 
                /**/

            
              console.log(' place search nearby results : ', places);
                

              //  . . efficient core newOnly  . - .
              _this_newOnly_result_array = []


               // not use, version 1. for single circle version
               // _all_poi_flat_array = places
               // in use,  version 2. accumulate 
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
                _current_geojson_POI = map.data.addGeoJson(_this_newOnly_poi_geojson);
              // manual draw circle only
              _this_newOnly_geojsonGoogleHandlerArray.push(_current_geojson_POI)

                set_poi_style(_poi_strokeColor, _poi_strokeWeight, _poi_fillColor, _poi_pointRadius)
              // . .  end . . efficient core newOnly  . - .



            }//function



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

  
            }
                 
  
  

/**/
//  --- end  ---  google poi    --- 
/**/


                              





