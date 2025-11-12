


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


            async function nearby_poi(_radiusMeter, _centerLng, _centerLat){

              // yelp always use circle for both s e a r c h k e y w o r d & c a t e g o r y,
              // only d r a w   c i r c l e when radius large than max 
              if (_radiusMeter == max_yelp_poi_radius_meter){
                  drawing_circle(_radiusMeter, _centerLng, _centerLat)
              }//if
              





                ____nearby_url = yelp_api_search



                //  - - reset to 0 for everything  - - 
                _paged_poi_array = []
               
                _paged_offset = 0
                // offset integer 0 to 1000, Offset the list of returned results by this amount
                _paged_offset_url_param = '&offset=' + _paged_offset
                // - -  end - - reset to 0 for everything

     

            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/
                  search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                  console.log('search_poi_keyword --->  ', search_poi_keyword)
                  update_url_parameter('poi', search_poi_keyword);
                  
                  // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
                  if (search_poi_keyword){
                    // If term is not included the endpoint will default to searching across businesses from a small number of popular categories.
                    ____nearby_url += 'term=' + search_poi_keyword
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
                ____nearby_url += '&limit=' + _yelp_page_size  // integer 0 to 50 Defaults to 20
                

            




                
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
                $("#poi_on_map").html(_total_poi)

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


                // yelp search include related business, kfc will include popeye, need filter them
                // poi_geojson = remove_without_keyword_from_search_result(poi_geojson)
                // console.log('remove without keyword from search result', poi_geojson)



                $("#poi_total").html(_all_poi_flat_array.length)

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
//  --- end  ---  yelp POI on google    --- 
/**/


                              


