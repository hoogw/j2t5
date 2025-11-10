var ____nearby_url


//  --- yelp POI max ---
var max_yelp_limit = 240  //  240 this is yelp defined, but in fact, yelp only provide 200 poi max
var max_yelp_offset = 200 //  240 this is yelp defined, but in fact, yelp only provide 200 poi max
var _yelp_page_size = 50 // limit max is 50, if set 200 will cause error

var _paged_poi_array = []
var _paged_offset = 0
// offset integer 0 to 1000, Offset the list of returned results by this amount
var _paged_offset_url_param = '&offset=' + _paged_offset
var this_page_poi_array




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


            
var poi_geojson 
var _last_geojson_POI;
var _current_geojson_POI;



var geojson_template = {
      "type": "FeatureCollection",
      "features": []
    };
   






var category_title_array = []
var category_alias_array = []



      async function init_category_array(){

          var response_string =  await $.ajax({
                                                  url: yelp_api_get_all_categories,
                                                  headers: {
                                                  'Authorization': yelp_api_key,  //'Bearer xxxxxx',
                                                  },
                                                  method: 'GET',
                                                  dataType: 'json',
                                                  success: function(data){
                                                    console.log('poi api get all categories', data)
                                                  }
                                              });  
      
      

          var poi_categories_array = response_string.categories
          $("#poi_categories_total").html(poi_categories_array.length)


          


          stack_item = {}
          stack_item.id = 0
          stack_item.alias = 'root' 
          stack_item.title = 'Root'

          category_title_array.push('Root')
          category_alias_array.push('root')


          var stack = new Stack();
          stack.push(stack_item);


          while(stack.count > 0) {                                              

            var stack_parent_item = stack.pop();
                      
            if (stack_parent_item.alias == 'root'){

            
              for (let i = 0; i < poi_categories_array.length; i++) {

                  if (!(poi_categories_array[i].parent_aliases.length)){ 
                    // length is 0,  !0 is true

                      id_counter += 1

                      stack_item = {}
                      stack_item.id = id_counter
                      stack_item.alias = poi_categories_array[i].alias
                      stack_item.title = poi_categories_array[i].title
                      stack.push(stack_item);

                      category_title_array.push(poi_categories_array[i].title)
                      category_alias_array.push(poi_categories_array[i].alias)
          


                  }//if root

              }//for loop array

            } else {

                // not root
                for (let i = 0; i < poi_categories_array.length; i++) {

                    if (poi_categories_array[i].parent_aliases[0] == stack_parent_item.alias){ 
                      // length is 0,  !0 is true

                        id_counter += 1

                        stack_item = {}
                        stack_item.id = id_counter
                        stack_item.alias = poi_categories_array[i].alias
                        stack_item.title = poi_categories_array[i].title
                        stack.push(stack_item);

                        category_title_array.push(poi_categories_array[i].title)
                        category_alias_array.push(poi_categories_array[i].alias)
          

                    }//if root

                }//for loop array
              
            }//if

            
          }// while stack
                                                                          
                                                                      
          console.log("category_title_array", category_title_array)
          console.log("category_alias_array", category_alias_array)

      }




      
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


