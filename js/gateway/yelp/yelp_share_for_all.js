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



          


/**/
//  -  -  - guided ring for pan and zoom  -  -  - 
/**/


            var circle_guideRing

            // only for manual, circle has click event 
            function drawing_circle_guideRing(_radiusMeter, _centerLng, _centerLat){

              clear_circle_guideRing()

             // console.log('d r a w - g u i d e r i n g at ', _radiusMeter, _centerLng, _centerLat)

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






      

            function init_poi_ui_before_map_load(){

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





                          
                /**/
            //  - - - download csv  - - - 
            /**/




            $("#download_csv_button").on("click", function() {

              json_for_csv = geojson_to_csvReadyJsonArray(poi_geojson)
              
              /**/
              //  --- papaparse   --- 
              /**/
              var final_csv_string = parse_json_to_csv_string(json_for_csv)
              /**/
              //  --- end  ---  papaparse    --- 
              /**/

              saveStringAsFile('poi.csv', final_csv_string)

          });



      /**/
      //  - - -  end  - - -   download csv    - - - 
      /**/




  /**/
    // - - - - download poi  - - - - 
    /**/
    $("#download_poi_button").on("click", function() {
      saveJsonAsFile('poi.geojson', poi_geojson)
  });
/**/
//  - - - -  end  - - - -  download poi   - - - - 
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
             











/*
// yelp search include related business, kfc will include popeye, need filter them
// do not use, this filter, because in and out burger will not show, real name is in n out
function remove_without_keyword_from_search_result(__poi_geojson__){

       var filtered_feature_array = []
       var original_feature_array = __poi_geojson__.features
        console.log("original_feature_array", original_feature_array)

       for (let f = 0; f < original_feature_array.length; f++) {

        var original_name = original_feature_array[f].properties.name.toLowerCase()
        if (original_name.includes(search_poi_keyword)){

                 filtered_feature_array.push(original_feature_array[f])
        }//if

       }//for


       __poi_geojson__.features = filtered_feature_array
       return __poi_geojson__

}
*/







      function get_center_radius_in_map_bound(){


        // https://developers.google.com/maps/documentation/javascript/reference/geometry
        // There is no built-in property called "length" to directly access the diagonal distance of the bounds. 
        // To get the "length" of a LatLngBounds, you would need to calculate the distance between the southwest and northeast corners 
        // using a distance calculation function provided by the Google Maps API. 

        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        var SWlong = southWest.lng();
        var SWlat = southWest.lat();
        var NElong = northEast.lng();
        var NElat = northEast.lat();
          
        
        


        var northWest = new google.maps.LatLng(NElat, SWlong)
        var southEast = new google.maps.LatLng(SWlat, NElong)

        console.log(' northWest ', northWest )
        console.log(' southEast ', southEast )

        var vertical_distance = google.maps.geometry.spherical.computeDistanceBetween(southWest, northWest);
        var horizontal_distance = google.maps.geometry.spherical.computeDistanceBetween(southWest, southEast);

        console.log("vertical_distance in meter", vertical_distance)
        console.log("horizontal_distance in meter", horizontal_distance)

        var min_radius
        if (vertical_distance <= horizontal_distance){
          min_radius = Math.floor(vertical_distance / 2)
        } else {
          min_radius = Math.floor(horizontal_distance / 2)
        }


        // If the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40,000 meters (about 25 miles).
        if (min_radius > max_yelp_poi_radius_meter){
          min_radius = max_yelp_poi_radius_meter
        }

        console.log("min_radius in meter", min_radius)
        return min_radius
      }








      
                  function clear_all_poi_advancedMarker(){

                      
                       for (let m = 0; m < marker_array.length; m++) {
                          marker_array[m].setMap(null);
                       }//for
                       marker_array = []
                       
                        // reset to empty geojson template
          poi_geojson = {
                            "type": "FeatureCollection",
                            "features": []
                        };

                      _all_poi_uniqueID_array = []
                      _all_poi_flat_array = []

                    _total_poi = 0
                      empty_info_outline_Tab()
                      $("#poi_total").html(_total_poi)
                  }



                  // . . .  old marker only . . efficient core newOnly  . - .
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


                     // reset to empty geojson template
          poi_geojson = {
                            "type": "FeatureCollection",
                            "features": []
                        };

                    _all_poi_uniqueID_array = []
                    _all_poi_flat_array = []

                  _total_poi = 0
                    empty_info_outline_Tab()
                    $("#poi_total").html(_total_poi)
                  }







      function poi_viewer(___properties){




        // Don't set height AND width. Use one or the other and the correct aspect ratio will be maintained.
        // https://stackoverflow.com/questions/12912048/how-to-maintain-aspect-ratio-using-html-img-tag

        // large size
        var poi_img_large = '<img src="' + ___properties.image + '" alt="poi image"  style="max-width:1200px;">'
        // medium size
        var poi_img_medium = '<img src="' + ___properties.image + '" alt="poi image" style="max-width:580px;">'
        // small size
        var poi_img_small = '<img src="' + ___properties.image + '" alt="poi image" style="max-width:300px;">'
      


        var poi_link_html = '<a style="display: inline-block;width: 570px; overflow:hidden; " target="_blank" href="' + ___properties.url + '">' + ___properties.url + '</a>'
        


        /* not use, default, show remaining properties except image, url
        delete ___properties.poi_image_url;
        delete ___properties.poi_url;
        // remaining properties
        var poi_other_html = json_flex_tip_viewer(___properties)
        */



        //in use, customized properties ,  only for side info window, 
        var poi_other_html = '<div>'
        poi_other_html    +=      '<span style="font-size:39.1px; font-weight:600;">' + ___properties.name + '</span>' + '&nbsp;&nbsp;'
        poi_other_html    +=      '<sup> Reviews <span style="font-size:13.4px;  font-weight:600;">( ' + ___properties.reviewCT + ' )</span></sup>' + '&nbsp;&nbsp;'
        poi_other_html    += '</div>'

      
        poi_other_html    += '<div>'
        poi_other_html    +=      '<span style="font-size:30.3px;">' + ___properties.location.join(",") + '</span>' + '&nbsp;&nbsp;'
        poi_other_html    += '</div>'

        
        poi_other_html    += '<div>'

        // open close
        if (___properties.open){
          poi_other_html    +=      '<span style="font-size:45.9px; background-color:rgb(178, 34, 34); color:rgb(240, 255, 255);">' + ' CLOSED ' + '</span>' + '&nbsp;&nbsp;'
        } else {
          poi_other_html    +=      '<span style="font-size:45.9px; background-color:rgb(85, 107, 47); color:rgb(240, 255, 255);">' + ' OPEN ' + '</span>' + '&nbsp;&nbsp;'
        }

        poi_other_html    +=      '<span style="font-size:39.9px; font-weight:800;">' + ___properties.phone + '</span>' + '&nbsp;&nbsp;'


        // categories
        if (___properties.category){
          var categories_array = ___properties.category
          for (let i = 0; i < categories_array.length; i++) {
            poi_other_html    +=      '<span style="font-size:13.9px; font-weight:50;">' + categories_array[i].title + ',  </span>' 
          }//for
        }


        poi_other_html    += '</div>'

        poi_other_html    += '<div>'
        poi_other_html    +=  poi_link_html 
        poi_other_html    += '</div>'

        poi_other_html    +=  poi_img_medium
        // - -  end  - -  , customized properties


        

        return  poi_other_html 
        
      }




      function poi_viewer_for_download(___properties){

        //in use, customized properties ,  only for side info window, 
        var poi_other_html = ''

        poi_other_html    += '<a style="display: inline-block;" target="_blank" href="' + ___properties.url + '">' 
        poi_other_html    +=      '<span style="font-size:24.1px; font-weight:600;">' + ___properties.name + '</span>' + '&nbsp;&nbsp;'
       
        poi_other_html    +=      '<span style="font-size:13.4px;  font-weight:600;">Reviews( ' + ___properties.reviewCT + ' )</span>' + '&nbsp;&nbsp;'
        poi_other_html    += '</a>'

        poi_other_html    += '&nbsp;&nbsp;&nbsp;'
       
        
        poi_other_html    +=      '<span style="font-size:16.3px;">' + ___properties.location + '</span>' + '&nbsp;&nbsp;'
        
        
     

        // open close
        if (___properties.closed){
          poi_other_html    +=      '<span style="font-size:14.9px; background-color:rgb(178, 34, 34); color:rgb(240, 255, 255);">' + ' CLOSED ' + '</span>' + '&nbsp;&nbsp;'
        } else {
          poi_other_html    +=      '<span style="font-size:14.9px; background-color:rgb(85, 107, 47); color:rgb(240, 255, 255);">' + ' OPEN ' + '</span>' + '&nbsp;&nbsp;'
        }

        poi_other_html    +=      '<span style="font-size:14.9px; font-weight:800;">' + ___properties.phone + '</span>' + '&nbsp;&nbsp;'


        // categories
        if (___properties.hasOwnProperty('categories')){
          var categories_array = ___properties.categories
          if (categories_array.length){
            for (let i = 0; i < categories_array.length; i++) {
              poi_other_html    +=      '<span style="font-size:11.9px; font-weight:50;">' + categories_array[i].title + ',  </span>' 
            }//for
          }//if
        }//if


      

        //poi_other_html    += '<a style="display: inline-block;width: 570px; overflow:hidden; " target="_blank" href="' + ___properties.poi_url + '">' 
        //poi_other_html    +=  poi_img_small
        //poi_other_html    += '</a>'
        

        
        // - -  end  - -  , customized properties


        

        return  poi_other_html 
         
      }





    

      // only for yelp poi 
      function poi_to_geojson(____poi_array){

        var ____feature_array = []
        var ____feature
        var poi_element

        // street number, name, type 3-in-1
        var poi_address1
        // unit number, ste, suite number
        var poi_address2
        // bigger complex, market, hall, etc.
        var poi_address3





        var poi_addressComponents
        var poi_streetNumber
        var poi_streetName
        var poi_streetNameAbre


        
        var poi_id
        var poi_name
        var poi_name2
        var poi_phone
        var poi_url
        var poi_open


        var streetName_component = []
        var poi_streetPrefix
        var poi_streetNameOnly
        var poi_streetType


        var poi_city
        var poi_county
        var poi_state
        var poi_stateAbre
        var poi_zipCode
        var poi_country

        var poi_primaryType
        var poi_type

        for (let i = 0; i < ____poi_array.length; i++) {

          poi_element = ____poi_array[i]

          //console.log(' yelp poi to geojson ', poi_element)

          poi_address1 = poi_element.location.address1
          poi_address2 = poi_element.location.address2
          poi_address3 = poi_element.location.address3


          poi_streetName = poi_address1

          //  . . . street name need to further split  . . . 
          // api https://github.com/hassansin/parse-address
          streetName_component =  parseAddress.parseLocation(poi_streetName);
                  
                  //console.log(' parse street name only  ', poi_streetName,  streetName_component);
                  
                  if ((streetName_component) && (streetName_component.hasOwnProperty('prefix'))){
                    poi_streetPrefix = streetName_component.prefix.toUpperCase();
                  } else {
                    poi_streetPrefix = ''
                  }
                  
                  if ((streetName_component) && (streetName_component.hasOwnProperty('street'))){
                    poi_streetNameOnly = streetName_component.street.toUpperCase();
                  } else {
                    poi_streetNameOnly = ''
                  }
                  
                  if ((streetName_component) && (streetName_component.hasOwnProperty('type'))){
                    poi_streetType = streetName_component.type.toUpperCase();
                  } else {
                    poi_streetType = ''
                  }
                  // . . .  end  . . .  street name need to further split



          poi_city = poi_element.location.city
          poi_state = poi_element.location.state
          poi_zipCode = poi_element.location.zip_code
          poi_country = poi_element.location.country




          poi_id = poi_element.id
          poi_name = poi_element.name
          
          // - - motorola requirement  - - 
          // 1) remove special char by space
          //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
          poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
          // 2) truncate max length 60 char
          poi_name = poi_name.substring(0, 60);
          //  - -  end - - motorola requirement  - - 


          poi_phone = poi_element.display_phone
          poi_open = poi_element.is_closed
          poi_url = poi_element.url


          ____feature = {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [poi_element.coordinates.longitude, poi_element.coordinates.latitude]
            },
            "properties": {
              "poi_id": poi_id,
              "name": poi_name,
              
              "phone": poi_phone,
              "open": poi_open,
              "url": poi_url,

              
              "address1": poi_address1,
              "address2": poi_address2,
              "address3": poi_address3,


              //  . . . street name need to further split  . . . 
              "strName": poi_streetName,
              "stPrefix" : poi_streetPrefix,
              "stName" : poi_streetNameOnly,
              "stType" : poi_streetType,
              // . . .  end  . . .  street name need to further split



              "city": poi_city,
              "state": poi_state,
              "zipCode": poi_zipCode,


              "alias": poi_element.alias,
              
              "image": poi_element.image_url,
              "phone2": poi_element.phone,
              "closed": poi_element.is_closed,
              "reviewCT": poi_element.review_count,
              "location": poi_element.location.display_address,
              "category": poi_element.categories,
            }//properties
          }//feature

          ____feature_array.push(____feature)
          
        }//for

        
        geojson_template =  {
          "type": "FeatureCollection",
          "features": ____feature_array
        };

        return geojson_template

      }



