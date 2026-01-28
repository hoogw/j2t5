


// mapkit class use this
var apple_nearby_api = "https://api.apple-mapkit.com/v1/nearbyPoi"
//var apple_nearby_api = "https://maps-api.apple.com/v1/nearbyPoi"

var apple_search_api = "https://maps-api.apple.com/v1/search"
var apple_reverse_geocode_api = "https://maps-api.apple.com/v1/reverseGeocode"
var apple_token_url = "https://maps-api.apple.com/v1/token"


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




var apple_search_object
var apple_poi_search_object

var apple_poi_annotation
var apple_poi_annotation_array = []


    // apple poi only, for mapkit-class use, not for mapkit-server-api
    function poi_to_geojson(____poi_array){  // apple poi only  

    var ____feature_array = []
    var ____feature
    var poi_element

    var poi_location
    var poi_lat
    var poi_lng


    var poi_id
    
    var poi_name
    
    var poi_phone
    var poi_url
    
   
    
    var poi_streetNumber
    var poi_streetName
    
    var poi_formattedAddress

    var streetName_component = []
    var poi_streetPrefix
    var poi_streetNameOnly
    var poi_streetType


    var poi_city
  
    var poi_state
    var poi_stateAbre
    var poi_zipCode
    

    var poi_category
   

    for (let i = 0; i < ____poi_array.length; i++) {

        poi_element = ____poi_array[i]
        //console.log('apple poi item ',i,  poi_element)
        poi_location = poi_element.coordinate
        poi_lng = poi_location.longitude
        poi_lat = poi_location.latitude

        // street number
        poi_streetNumber = poi_element.subThoroughfare;
        // full street name
        poi_streetName = poi_element.thoroughfare;

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


        // city 
        poi_city = poi_element.locality;
              
                 
        // state
        poi_state = poi_element.administrativeArea;
        poi_stateAbre = poi_element.administrativeAreaCode;

        // zip-code 
        poi_zipCode = poi_element.postCode;
              

        // poi category
        poi_category = poi_element.pointOfInterestCategory;

        poi_id = poi_element.id
        poi_muid = poi_element.muid // apple only, not use
        poi_name = poi_element.name


        
        // not use, these should be done in arcpro
        // - - motorola requirement  - - 
        // 1) remove special char by space
        //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
        //poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
        // 2) truncate max length 60 char
        //poi_name = poi_name.substring(0, 60);
        //  - -  end - - motorola requirement  - - 


        poi_phone = poi_element.telephone

        if (poi_element.urls){
                poi_url = poi_element.urls[0] // only use 1st url, ignore others
        }
        poi_formattedAddress = poi_element.formattedAddress
        

        ____feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [poi_lng, poi_lat]
        },
        "properties": {

            "poi_id": poi_id,
            "name": poi_name,

            "category":poi_category,
            
            "phone": poi_phone,
            "url": poi_url,

            "stNo": poi_streetNumber,
            

            //  . . . street name need to further split  . . . 
            "strName": poi_streetName,
            "stPrefix" : poi_streetPrefix,
            "stName" : poi_streetNameOnly,
            "stType" : poi_streetType,
            // . . .  end  . . .  street name need to further split


            "city": poi_city,
            "state": poi_stateAbre,
            "state1":poi_state,
            "zipCode": poi_zipCode,

            "fmtAddr": poi_formattedAddress,

           
        
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

    // apple poi only, for map-server-api
    function poi_to_geojson_mapServerApi(____poi_array){  // apple poi only  

    var ____feature_array = []
    var ____feature
    var poi_element

    var poi_location
    var poi_lat
    var poi_lng


    var poi_id
    
    var poi_name
    
    var poi_phone
    var poi_url
    
   
    
    var poi_streetNumber
    var poi_streetName
    
    var poi_formattedAddress

    var streetName_component = []
    var poi_streetPrefix
    var poi_streetNameOnly
    var poi_streetType


    var poi_city
  
    var poi_state
    var poi_stateAbre
    var poi_zipCode
    

    var poi_category


    for (let i = 0; i < ____poi_array.length; i++) {

        poi_element = ____poi_array[i]
        //console.log('apple poi item ',i,  poi_element)
        poi_location = poi_element.coordinate
        poi_lng = poi_location.longitude
        poi_lat = poi_location.latitude

        poi_formattedAddress = poi_element.formattedAddressLines.join(', ');


        // street number
        poi_streetNumber = poi_element.structuredAddress.subThoroughfare;
        // full street name
        poi_streetName = poi_element.structuredAddress.thoroughfare;

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


        // city 
        poi_city = poi_element.structuredAddress.locality;
              
                 
        // state
        poi_state = poi_element.structuredAddress.administrativeArea;
        poi_stateAbre = poi_element.structuredAddress.administrativeAreaCode;

        // zip-code 
        poi_zipCode = poi_element.structuredAddress.postCode;
              

        // poi category
        poi_category = poi_element.poiCategory;

        poi_id = poi_element.id
       
        poi_name = poi_element.name


        
        // not use, these should be done in arcpro
        // - - motorola requirement  - - 
        // 1) remove special char by space
        //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
        //poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
        // 2) truncate max length 60 char
        //poi_name = poi_name.substring(0, 60);
        //  - -  end - - motorola requirement  - - 


       
       

        

        ____feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [poi_lng, poi_lat]
        },
        "properties": {

            "poi_id": poi_id,
            "name": poi_name,
            "category":poi_category,
            
            "phone": poi_phone,
            "url": poi_url,

            "stNo": poi_streetNumber,
            

            //  . . . street name need to further split  . . . 
            "strName": poi_streetName,
            "stPrefix" : poi_streetPrefix,
            "stName" : poi_streetNameOnly,
            "stType" : poi_streetType,
            // . . .  end  . . .  street name need to further split


            "city": poi_city,
            "state": poi_stateAbre,
            "state1":poi_state,
            "zipCode": poi_zipCode,

            "fmtAddr": poi_formattedAddress,

           
        
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


    // for mapkit-server-api only ( map-server-api does not have nearby, mapkit-api have nearby)
    function poi_to_geojson_mapKitApi(____poi_array){  // apple poi only  

    var ____feature_array = []
    var ____feature
    var poi_element

    var poi_location
    var poi_lat
    var poi_lng


    var poi_id
    
    var poi_name
    
    var poi_phone
    var poi_url
    
   
    
    var poi_streetNumber
    var poi_streetName
    
    var poi_formattedAddress

    var streetName_component = []
    var poi_streetPrefix
    var poi_streetNameOnly
    var poi_streetType


    var poi_city
  
    var poi_state
    var poi_stateAbre
    var poi_zipCode
    

    var poi_category


    for (let i = 0; i < ____poi_array.length; i++) {

        poi_element = ____poi_array[i]
        //console.log('apple poi item ',i,  poi_element)


        //  - -  for mapkit-api only ( map-server-api does not have nearby, mapkit-api have nearby) - -  
        poi_location = poi_element.center
        poi_lng = poi_location.lng
        poi_lat = poi_location.lat
        // - -  end  - -  for mapkit-api only  - -  

        poi_formattedAddress = poi_element.formattedAddressLines.join(', ');


        // street number
        poi_streetNumber = poi_element.subThoroughfare;
        // full street name
        poi_streetName = poi_element.thoroughfare;

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


        // city 
        poi_city = poi_element.locality;
              
                 
        // state
        poi_state = poi_element.administrativeArea;
        poi_stateAbre = poi_element.administrativeAreaCode;

        // zip-code 
        poi_zipCode = poi_element.postCode;
              

        // poi category
        poi_category = poi_element.poiCategory;

        poi_id = poi_element.id
       
        poi_name = poi_element.name



        poi_phone =  poi_element.telephone
        if (poi_element.urls){
                poi_url = poi_element.urls[0]
        }

        
        // not use, these should be done in arcpro
        // - - motorola requirement  - - 
        // 1) remove special char by space
        //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
        //poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
        // 2) truncate max length 60 char
        //poi_name = poi_name.substring(0, 60);
        //  - -  end - - motorola requirement  - - 


       
       

        

        ____feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [poi_lng, poi_lat]
        },
        "properties": {

            "poi_id": poi_id,
            "name": poi_name,
            "category":poi_category,
            
            "phone": poi_phone,
            "url": poi_url,

            "stNo": poi_streetNumber,
            

            //  . . . street name need to further split  . . . 
            "strName": poi_streetName,
            "stPrefix" : poi_streetPrefix,
            "stName" : poi_streetNameOnly,
            "stType" : poi_streetType,
            // . . .  end  . . .  street name need to further split


            "city": poi_city,
            "state": poi_stateAbre,
            "state1":poi_state,
            "zipCode": poi_zipCode,

            "fmtAddr": poi_formattedAddress,

           
        
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

    // only add poi point geojson to annotation
    function poi_geojson_to_feature(single_whole_geojson){

      var features_array = single_whole_geojson.features
      var one_geojson_feature
      for (let i = 0; i < features_array.length; i++) {
        one_geojson_feature =  features_array[i]
        var _coordinate_point = one_geojson_feature.geometry.coordinates
        poi_create_annotation(one_geojson_feature.properties, _coordinate_point)

        
        // fix bug, if use annotation, must disable overlay event. otherwise overlay event will overwrite annotation event, cause it failed to function
        // only-for-click-map-latlng
        //document.querySelector("#map").removeEventListener("mousemove", mousemove_on_map_event_handler)
        //document.querySelector("#map").removeEventListener("click",click_on_map_event_handler) 
                    

      
      }//for



    }




    
    function poi_create_annotation(_properties, point){

        //console.log('create annotation with build  in  properties',  _properties, point )

        coordinate = new mapkit.Coordinate(point[1], point[0]);

        // https://developer.apple.com/documentation/mapkitjs/geojsondelegate/2991192-itemforpoint

        var factory = function(coordinate, options) {

            var div = document.createElement("svg")

            div.innerHTML = default_icon
            //div.textContent = 'test'
            // Using element's data attributes https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
            div.data = _properties
            
            // annotation hover event listener,  DOM element event, not apple mapkit event 
            div.addEventListener("mouseenter", function(event) {
                
                console.log("poi annotation mouse enter event, DOM event", event);
                console.log("hovered_icon", hovered_icon);
                console.log("default_icon", default_icon);
                console.log("event.target.data", event.target.data);

                poi_reset_all_annotation_style_to_default()

                show_info_outline_Tab(event.target.data)
                
                // not fixed bug, so not highlight svg icon when hover for now
                event.target.innerHTML = hovered_icon  // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 




                
                    /**/
                    //  ---  ---  apple look around    --- 
                    /**/
                             var event_screen_coordinate = map.convertPointOnPageToCoordinate(new DOMPoint(event.pageX, event.pageY));
                             console.log("event_screen_coordinate", event_screen_coordinate)
                             create_apple_look_around(event_screen_coordinate.latitude, event_screen_coordinate.longitude)
                     
                    /**/
                    //  --- end  ---  apple look around    --- 
                    /**/
                
                
            }); 


            div.addEventListener("mouseleave", function(event) {
                
                
                    console.log("annotation mouse out event, DOM event", event);
                    // keep, but do not use, hover leave do not clean or close
                    // event.target.innerHTML = default_icon // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 
                    // empty_info_outline_Tab()
            }); 


            return div;
            
        }; // factory 

        

        var options = {
            // https://developer.apple.com/documentation/mapkitjs/annotationconstructoroptions             
            data: _properties,
            //size: { width: 30, height: 30 }, not working,  The desired dimensions of the annotation, in CSS pixels.  https://developer.apple.com/documentation/mapkitjs/annotation/2973833-size
            enabled: true,

        }
        apple_poi_annotation = new mapkit.Annotation(coordinate, factory, options);
        
        
        // annotation icon image dom click event failed to trigger, use this apple event instead
        apple_poi_annotation.addEventListener('select', function(event) {  

                console.log("select overlay. event", event);

                // reset all overlay style to default
                poi_reset_all_annotation_style_to_default()
                
                // only change this selected overlay color
                event.target.element.innerHTML = clicked_icon;
                show_info_outline_Tab(event.target.data)

        });
        

        map.addAnnotation(apple_poi_annotation);
        apple_poi_annotation_array.push(apple_poi_annotation)
        return apple_poi_annotation;


        


    }// annotaion




     function poi_reset_all_annotation_style_to_default(){


      //console.log(' !!! reset !!! all !!!  annotation !!! style !!! to !!! default !!! ')
      
      for (let i = 0; i < apple_poi_annotation_array.length; i++) {
        apple_poi_annotation_array[i].element.innerHTML= default_icon;
      }

     empty_info_outline_Tab()

    }








    
      //  . . efficient core newOnly  . - .
      function clear_all_poi(){

          //  . . efficient core newOnly  . - .
              var _this_apple_poi_annotation
              if (apple_poi_annotation_array){
                
                for (var l = 0; l< apple_poi_annotation_array.length; l++){
                  _this_apple_poi_annotation = apple_poi_annotation_array[l]
                  map.removeAnnotation(_this_apple_poi_annotation);
                }// for


              }//if
              
              apple_poi_annotation_array = []
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
        





      
      function poi_viewer_for_download(___properties){

        //in use, customized properties ,  only for side info window, 
        var poi_other_html = ''
        poi_other_html    +=      '<b style="font-size:xxx-large">' + ___properties.name + '</b>' + '&nbsp;&nbsp;'
        
        poi_other_html    +=      '<span style="font-size:x-large">' + ___properties.fmtAddr + '</span>' + '&nbsp;&nbsp;'
        
        // not use google poi id, too much info
        //poi_other_html    +=      '<span  style="font-size:small">' + ___properties.poi_id + '</span>' + '&nbsp;&nbsp;'
        
        //poi_other_html    +=      '<span  style="font-size:small; background-color:#FF8C00;">' + ___properties.open + '</span>' + '&nbsp;&nbsp;'
        if (___properties.phone){
           poi_other_html    +=      '<span style="font-size:small">phone(' + ___properties.phone + ')</span>' + '&nbsp;&nbsp;'
        }
        if (___properties.url){
           poi_other_html    +=      '<a href="' + ___properties.url + ' target="_blank">' + ___properties.url + '</a>' + '&nbsp;&nbsp;'
        }

        if (___properties.category){
            poi_other_html    +=      '<span style="font-size:small">category(' + ___properties.category + ')</span>' + '&nbsp;&nbsp;'
        }

        return  poi_other_html 
         
      }




      
            function init_poi_ui_before_map_load(){

           


            // only for pan & zoom, not for manual drawing circle
            $("#start_over_button").on("click", function() {
                  
                   clear_all_poi()
            });



                
            




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
             



          
function show_info_outline_Tab(___properties){ 
    console.log("show_info_outline_Tab", ___properties)   
    $('#info-window-div').html(poi_viewer_for_download(___properties))
}
function empty_info_outline_Tab(){
  $('#info-window-div').html("")
}