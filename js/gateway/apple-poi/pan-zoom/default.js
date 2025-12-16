



function show_info_outline_Tab(___properties){
    // make sure flex_1 is id of column
    $('#flex_1').scrollTop(0); // build in scroll to top popup info window
    $('#info-window-div').html(json_flex_tip_viewer(___properties))
    // for embed at top, right and or left side info window, always scroll to top
    $('#flex_1').scrollTop(0); // build in scroll to top popup info window
}


function empty_info_outline_Tab(){
  $('#info-window-div').html("")
}







/**/
//  --- apple poi      --- 
/**/    

           
            
         async function nearby_poi(_lat, _lng, _zoom_string){  // apple use lat-lng-region, not circle, but circle is ok


              if (apple_poi_search_object){
                
              } else {
                    apple_poi_search_object = new mapkit.PointsOfInterestSearch()
              }
             

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


              var apple_map_server_api_url = apple_nearby + "?"
              apple_map_server_api_url += "q=police"

              var region_encoded = encodeURIComponent(get_coord_region(_lat, _lng, _zoom_string))
              console.log("region_encoded", region_encoded)
              //apple_map_server_api_url += "&mapRegion=" + region_encoded

              
              var response_raw =  await $.ajax({
                  url: apple_map_server_api_url,
                  headers: {
                  // 'Authorization': 'Bearer ' + _apple_token,  //'Bearer xxxxxx',
                  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtYXBzYXBpIiwidGlkIjoiQzROWDVTOVE0QiIsImFwcGlkIjoiVGVzdCBUb2tlbiIsIml0aSI6ZmFsc2UsImlydCI6ZmFsc2UsImlhdCI6MTc2NTkxMDU0OCwiZXhwIjoxNzY1OTEyMzQ4fQ.YeWnAKQxWwpTjhJLMNJkQU3TWHW5SmlR9CdKV1Sgo6wlURKURCnwog9qAkiiQDeX3ICUp31MtSkmC9FnxspVKQ',
                  },

                  method: 'GET',
                  dataType: 'json',
                  
                  success: function(data){
                    console.log('poi search by categories success', data)
                    apple_poi_result_callback("", data)
                  }, 
                  error: function(jqXHR, textStatus, errorThrown) {
                    // Handle error response
                    console.error("Error:", textStatus, errorThrown);
                  }
                }); 
                console.log(' place search nearby results : ', response_raw);
                    
                


            }


            function apple_poi_result_callback(_error, _data){

                console.log('apple poi search object search call back ', _error, _data)

                var places = []
                if (_data.hasOwnProperty("places") && (_data.places)){
                  places = _data.places
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
                            console.log('_this_newOnly_result_array', _this_newOnly_result_array)
                            _this_newOnly_poi_geojson = poi_to_geojson(_this_newOnly_result_array)
                            
                            
                            // both works, the same, this is apple's mapkit.importGeoJSON   https://developer.apple.com/documentation/mapkitjs/mapkit/2974044-importgeojson
                            //mapkit.importGeoJSON(_this_newOnly_poi_geojson, geoJSONParserDelegate);
                            // in use, manually convert geojson to apple overlay, annotation,
                            poi_geojson_to_feature(_this_newOnly_poi_geojson)
                            
                      // . .  end . . efficient core newOnly  . - .   


        


            }//function
/**/
//  --- end  ---  apple poi    --- 
/**/


