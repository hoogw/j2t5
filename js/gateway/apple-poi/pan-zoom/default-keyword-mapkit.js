


/**/
//  --- apple poi      --- 
/**/    



function show_info_outline_Tab(___properties){    
    $('#info-window-div').html(poi_viewer_for_download(___properties))
}
function empty_info_outline_Tab(){
  console.log('empty info outline now')
  $('#info-window-div').html("")
}
    

           
         // 1 x    
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

                apple_search_object = new mapkit.Search()
                apple_search_object.language = 'en'
                apple_search_object.includePhysicalFeatures = true
                apple_search_object.includeAddresses = true
                //apple_search_object.includePointsOfInterest = true
             

              // for 1 x, works
              apple_search_object.region = get_coord_region(_lat, _lng, _zoom_string)
              // .search(callback, option)
              //apple_search_object.search(mapkit_poi_result_callback, {"region": get_coord_region(_lat, _lng, _zoom_string)})
              apple_search_object.search(search_poi_keyword, mapkit_poi_result_callback)

          /* keep,but not use class, use map server api instead    
               // for 4 x, works
              var region4x_array = get_4x_coord_region(_lat, _lng, _zoom_string)
              console.log("region4x_array", region4x_array)
              for (let r = 0; r < region4x_array.length; r++) {
                  apple_search_object.region = region4x_array[r]
                  apple_search_object.search(mapkit_poi_result_callback)
              }//for
          */


            } else {
                $('#info-window-div').html("<span style='font-size:large;'>Missing Keyword (required) !  <br></span>") 
            }//if


            }


            function mapkit_poi_result_callback(_error, _data){

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


