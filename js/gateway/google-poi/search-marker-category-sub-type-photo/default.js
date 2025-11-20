


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


           

//  -  -  - shoot it !!! -  -  - 
async function nearby_poi(_radiusMeter, _centerLng, _centerLat){  //  -  -  - shoot it !!! -  -  - 


                                
                  /**/
                  //  -  -  - shoot it !!! -  -  - 
                  /**/
                  // comment out this line
                  drawing_circle(_radiusMeter, _centerLng, _centerLat)
                  /**/
                  //  -  -  - end  -  -  -  shoot it !!!    -  -  - 
                  /**/



              

              
            // https://developers.google.com/maps/documentation/javascript/load-maps-js-api#use-legacy-tag
             var { Place } = await google.maps.importLibrary("places");
             // https://developers.google.com/maps/documentation/javascript/libraries


            var google_place_request_param = {


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


                      locationRestriction: {
                        center: { lat: _center_lat, lng: _center_long },
                        radius:  _center_radius_in_meter,  
                      },

                      // optional parameters
                      //includedPrimaryTypes: ["restaurant"],
                      maxResultCount: max_google_poi_limit,   
                      //rankPreference: SearchNearbyRankPreference.POPULARITY,
                      //language: "en-US",
                      //region: "us",
            };



            /**/
            //  -  -  - category  -  -  - sub-type -  -  - 
            /**/

                // array of types. https://developers.google.com/maps/documentation/javascript/reference/place#Place.types
                // legacy types.  https://developers.google.com/maps/documentation/places/web-service/legacy/supported_types 
                _category_string = $("#category-input").val()
                update_url_parameter("poicategory",_category_string)
    
                
                if (_category_string){
                      _category_array = _category_string.split(","); // Splits by comma
                      
                } else {
                      _category_array = []
                }
                console.log('category array', _category_array); // Output: ["apple", "banana", "orange"]

              

                


                //  -  -  - category  -  -  - sub-type -  -  - 
                if (_category_string){
                    // https://developers.google.com/maps/documentation/javascript/reference/place#SearchNearbyRequest
                    //google_place_request_param.includedPrimaryTypes = _category_array
                    google_place_request_param.includedTypes = _category_array
                }//if   
                //  -  -  - category  -  -  - sub-type -  -  - 

            /**/
            //  -  -  - end  -  -  -  category    -  -  - sub-type -  -  -  
            /**/


              
              
              var { places } = await Place.searchNearby(google_place_request_param);
            
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

  


 /**/
 // -- -- --  google advanced marker replace geojson  -- -- -- 

      //  . . efficient core newOnly  . - .
      console.log('_this_newOnly_result_array', _this_newOnly_result_array)
      _this_newOnly_poi_geojson = poi_to_geojson(_this_newOnly_result_array)
      // parameter is geojson.features array only
      poi_geojsonPointFeature_to_marker_label(_this_newOnly_poi_geojson.features, 'name')
      
      // . .  end . . efficient core newOnly  . - .                    
 // -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
 /**/



              



}//function



           

           




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


                              

