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
          stack_item.alias = 'root' 
          stack_item.title = 'Root'

          category_title_array.push('root')
          category_alias_array.push('root')


          var stack = new Stack();
          stack.push(stack_item);


          while(stack.count > 0) {                                              

            var stack_parent_item = stack.pop();
                      
            if (stack_parent_item.alias == 'root'){

            
              for (let i = 0; i < poi_categories_array.length; i++) {

                  if (!(poi_categories_array[i].parent_aliases.length)){ 
                    // length is 0,  !0 is true
                      stack_item = {}
                      stack_item.alias = poi_categories_array[i].alias
                      stack_item.title = poi_categories_array[i].title
                      stack.push(stack_item);

                      category_title_array.push(poi_categories_array[i].title.toLowerCase())
                      category_alias_array.push(poi_categories_array[i].alias.toLowerCase())
          


                  }//if root

              }//for loop array

            } else {

                // not root
                for (let i = 0; i < poi_categories_array.length; i++) {

                    if (poi_categories_array[i].parent_aliases[0] == stack_parent_item.alias){ 
                      // length is 0,  !0 is true

                        stack_item = {}
                        stack_item.alias = poi_categories_array[i].alias
                        stack_item.title = poi_categories_array[i].title
                        stack.push(stack_item);

                        category_title_array.push(poi_categories_array[i].title.toLowerCase())
                        category_alias_array.push(poi_categories_array[i].alias.toLowerCase())
          

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






      

            function init_poi_ui(){

             // only for poi, set map image layer transparency as 0
             image_opacity = 0;





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



            




            /**/
            //  -  -  - category  -  -  - 
            /**/

            // 1st time, one time run
            if (_category_string){
              $("#category-input").val(_category_string)
              console.log("1st time, one time run, set poi category search", _category_string)
            }
            // do not use, cause unwanted click-refresh, close-dev-tool
            //$("#category-input").on('keyup', update_poi_cat_content);
           


            /**/
            //  -  -  - end  -  -  -  category    -  -  - 
            /**/



                 
            
            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/

            // 1st time, one time run
            if (search_poi_keyword){
            $("#search_poi_input").val(search_poi_keyword)
                console.log("1st time, one time run, set poi keyword search", search_poi_keyword)
            }
            // do not use, cause unwanted click-refresh, close-dev-tool
            //$("#search_poi_input").on('keyup', update_poi_keyword_content);


            // search bar close icon clicked. clear everything.
            //$('#clear_poi_button').on('click', remove_current_poi);
    
            //$('#search_poi_button').on('click', search_poi);
          
            // default search
            //$('#search_poi_input').on('search', search_poi);


            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/




  
            }
                 
  
  
/*
          // do not use, cause unwanted click-refresh, close-dev-tool
          function update_poi_keyword_content(){
            search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('search_poi_keyword --->  ', search_poi_keyword)
            update_url_parameter('poi', search_poi_keyword);
          }

          function update_poi_cat_content(){
            _category_string = $('#category-input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('_category_string --->  ', _category_string)
            update_url_parameter("poicategory",_category_string)
          }
            */









              

 /**/
                  //  --- papaparse   --- 
                  /**/
                  
                  var inputType = "string";
                  var stepped = 0, rowCount = 0, errorCount = 0, firstError;
                  var start, end;
                  var firstRun = true;
                  // do not limit length
                  //var maxUnparseLength = 1000000;
          
          
          
               
          
          
                  // must wait until csv parse completed at function completeFn
                  function parse_json_to_csv_string(_csv_ready_json){


                      
          
                      //  . . . papaparse  . . . demo . . .  https://www.papaparse.com/demo
          
                      stepped = 0;
                      rowCount = 0;
                      errorCount = 0;
                      firstError = undefined;
          

                      start = now();
                      var csv_string = Papa.unparse(_csv_ready_json, 
                     
                          // config see demo.js https://www.papaparse.com/demo
                          {
                            delimiter: ',', // The delimiting character. Usually comma or tab. Default is comma.
                            header: true, // Keys data by field name rather than an array.
                            dynamicTyping: true, // Turns numeric data into numbers and true/false into booleans.
                            //skipEmptyLines: true, // By default, empty lines are parsed; check to skip.
                            // preview: 100, //If > 0, stops parsing after this many rows.
                            // step: stepFn, // not use, only when very large file
                            // encoding: 'UTF-8', // Only applies when reading local files. Default is specified by the browser (usually UTF-8).
                            //worker: false, // Uses a separate thread so the web page doesn't lock up.
                            // comments: '',  // If specified, skips lines starting with this string.
                            complete: completeFn,
                            error: errorFn,
                            //download: true,
                          }
                        )

                        end = now();


                     // do not limit length   
                     // if (csv_string.length > maxUnparseLength){
                     //     csv_string = csv_string.substr(0, maxUnparseLength);
                     //      console.log("(Results truncated for brevity)");
                     // }
                  
                      console.log('final csv string ', csv_string);


                      return csv_string
                      
                      // . . . end  . . . papaparse  . . . 
          
                  }
           
            
                    function stepFn(results, parser)
                    {
                      stepped++;
                      if (results)
                      {
                        if (results.data)
                          rowCount += results.data.length;
                        if (results.errors)
                        {
                          errorCount += results.errors.length;
                          firstError = firstError || results.errors[0];
                        }
                      }
                    }
          
                    function completeFn(results)
                    {
                      end = now();
          
                      if (results && results.errors)
                      {
                        if (results.errors)
                        {
                          errorCount = results.errors.length;
                          firstError = results.errors[0];
                        }
                        if (results.data && results.data.length > 0)
                          rowCount = results.data.length;
                      }
          
                      printStats("Parse complete",  results);

                     
                      
          
                    }
          
          
          
          
          
          
                    function errorFn(err, file)
                    {
                      end = now();
                    }
          
          
                    function now()
                    {
                      return typeof window.performance !== 'undefined'
                          ? window.performance.now()
                          : 0;
                    }
          
          
          
                    function printStats(msg)
                    {
                      if (msg)
                        console.log(msg);
                      console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
                      console.log("  Row count:", rowCount);
                      if (stepped)
                        console.log("    Stepped:", stepped);
                      console.log("     Errors:", errorCount);
                      if (errorCount)
                        console.log("First error:", firstError);
                    }
          
          
          /**/
          //  --- end  ---  papaparse    --- 
          /**/
             








          


/**/
//  -  -  - guided ring for pan and zoom  -  -  - 
/**/


            var circle_guideRing

            // only for manual, circle has click event 
            function drawing_circle_guideRing(_radiusMeter, _centerLng, _centerLat){

              clear_circle_guideRing()

              console.log('d r a w - g u i d e r i n g at ', _radiusMeter, _centerLng, _centerLat)

                /*
              // red solid line
               circle_guideRing = 
               new google.maps.Circle({
                 strokeColor: 'rgba(255, 0, 0, 1)',
                 strokeOpacity: 0.877,
                 strokeWeight: 3.45,
                 fillColor: 'rgba(255, 0, 0, 0)', // ring, is empty fill
                 fillOpacity: 0.171,
                 map,
                 center: { lat: _centerLat, lng: _centerLng },
                 radius: _radiusMeter,
               });
              */

               // red dash line 


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

                var _centerLngLatPoint = { lat: _centerLat, lng: _centerLng }

              circle_guideRing = new google.maps.Polyline({
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
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 0),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 10),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 20),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 30),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 40),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 50),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 60),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 70),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 80),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 90),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 100),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 110),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 120),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 130),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 140),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 150),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 160),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 170),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 180),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 190),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 200),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 210),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 220),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 230),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 240),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 250),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 260),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 270),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 280),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 290),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 300),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 310),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 320),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 330),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 340),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 350),
                                          google.maps.geometry.spherical.computeOffset(_centerLngLatPoint, _radiusMeter, 360),

                                        ],
                                  map: map
                              });

               // . . . end   . . .  red dash line   . . . 


              
            }



            function clear_circle_guideRing(){
               if (circle_guideRing) { circle_guideRing.setMap(null)}
            }


/**/
//  -  -  - end  -  -  -  guided ring for pan and zoom    -  -  - 
/**/

