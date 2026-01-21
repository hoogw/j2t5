


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
                  //  -  -  - google photo  -  -  - 
                  /**/
                           google_photo(___properties.poi_id)
                  /**/
                  //  -  -  - end  -  -  -  google photo    -  -  - 
                  /**/

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
            async function search_poi(){


              
                          

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


              var _bounds = map.getBounds();
              var _southWest = _bounds.getSouthWest();
              var _northEast = _bounds.getNorthEast();
              var _SWlong = _southWest.lng();
              var _SWlat = _southWest.lat();
              var _NElong = _northEast.lng();
              var _NElat = _northEast.lat();

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
                    $('#info-window-div').append("<span style='font-size:large;'>" + _error_message_html + "</span>")
                  }
                }); 
                console.log(' place search nearby results : ', response_raw);
                    
                
                var places = []
                if (response_raw.hasOwnProperty("places") && (response_raw.places)){
                  places = response_raw.places
                }

                

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
/**/
//  --- end  ---  google textSearch poi    --- 
/**/



                              





