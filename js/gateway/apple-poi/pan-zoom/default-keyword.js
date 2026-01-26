


/**/
//  --- apple poi      --- 
/**/    



function show_info_outline_Tab(___properties){    
    $('#info-window-div').html(poi_viewer_for_download(___properties))
}
function empty_info_outline_Tab(){
  $('#info-window-div').html("")
}






           
            
         async function nearby_poi(_lat, _lng, _zoom_string){  // apple use lat-lng-region, not circle, but circle is ok


            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/
            search_poi_keyword = $("#search_poi_input").val()
            update_url_parameter('poi', search_poi_keyword);
            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/

            if (search_poi_keyword){


             var temp_access_token 
             var response_token =  await $.ajax({
                  url: apple_token_url,
                  headers: {
                    'Authorization': 'Bearer ' + _apple_token,  //'Bearer xxxxxx',
                   },
                  method: 'GET',
                  dataType: 'json',
                  success: function(data){
                     temp_access_token = data.accessToken
                     console.log('temp_access_token', temp_access_token)
                  }, 
                  error: function(jqXHR, textStatus, errorThrown) {
                    // Handle error response
                    console.error("Error:", textStatus, errorThrown);
                  }
                }); 
                




              var apple_map_server_api_url = apple_search_api + "?lang=en-US"
              apple_map_server_api_url += "&q=" + search_poi_keyword

              // north-latitude,east-longitude,south-latitude,west-longitude
              apple_map_server_api_url += "&searchRegion=" + get_region_string(_lat, _lng, _zoom_string)
              
              
              var response_raw =  await $.ajax({
                  url: apple_map_server_api_url,
                  headers: {
                 'Authorization': 'Bearer ' + temp_access_token,  //'Bearer xxxxxx',
                  },

                  method: 'GET',
                  dataType: 'json',
                  
                  success: function(data){
                    console.log('poi search by categories success', data)
                    mapServerApi_poi_result_callback("", data)
                  }, 
                  error: function(jqXHR, textStatus, errorThrown) {
                    // Handle error response
                    console.error("Error:", textStatus, errorThrown);
                  }
                }); 
                console.log(' place search nearby results : ', response_raw);
                    
                
               } else {
                $('#info-window-div').html("<span style='font-size:large;'>Missing Keyword (required) !  <br></span>") 
            }//if

            }


            // only for apple map server api
            function mapServerApi_poi_result_callback(_error, _data){

                console.log('apple poi search object search call back ', _error, _data)

                var places = []
                if (_data.hasOwnProperty("results") && (_data.results)){
                  places = _data.results
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
                      poi_geojson = poi_to_geojson_mapServerApi(_all_poi_flat_array)
                      console.log('poi geojson', poi_geojson)

       
                      //  . . efficient core newOnly  . - .
                            console.log('_this_newOnly_result_array', _this_newOnly_result_array)
                            _this_newOnly_poi_geojson = poi_to_geojson_mapServerApi(_this_newOnly_result_array)
                            
                            
                            // both works, the same, this is apple's mapkit.importGeoJSON   https://developer.apple.com/documentation/mapkitjs/mapkit/2974044-importgeojson
                            //mapkit.importGeoJSON(_this_newOnly_poi_geojson, geoJSONParserDelegate);
                            // in use, manually convert geojson to apple overlay, annotation,
                            poi_geojson_to_feature(_this_newOnly_poi_geojson)
                            
                      // . .  end . . efficient core newOnly  . - .   


        


            }//function
/**/
//  --- end  ---  apple poi    --- 
/**/


