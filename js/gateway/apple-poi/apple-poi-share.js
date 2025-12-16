


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





var apple_poi_search_object

var apple_poi_annotation
var apple_poi_annotation_array = []


    // apple poi only
    function poi_to_geojson(____poi_array){  // apple poi only  

    var ____feature_array = []
    var ____feature
    var poi_element

    var poi_location
    var poi_lat
    var poi_lng


    var poi_id
    var poi_muid
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
    

    var poi_primaryType
    var poi_type


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
        poi_url = poi_element.urls[0] // only use 1st url, ignore others
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
                
                // not fixed bug, so not highlight svg icon when hover for now
                event.target.innerHTML = highlight_icon  // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 
                
                show_info_outline_Tab(event.target.data)
            }); 


            div.addEventListener("mouseleave", function(event) {
                
                console.log("poi annotation mouse out event, DOM event", event);
                
                // some time, it failed  
                event.target.innerHTML = default_icon // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 
                                                                                                                                                         
                empty_info_outline_Tab()
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
                event.target.element.innerHTML = classfiy_icon;
                show_info_outline_Tab(event.target.data)

        });
        

        map.addAnnotation(apple_poi_annotation);
        apple_poi_annotation_array.push(apple_poi_annotation)
        return apple_poi_annotation;


        


    }// annotaion




     function poi_reset_all_annotation_style_to_default(){


      console.log(' !!! reset !!! all !!!  annotation !!! style !!! to !!! default !!! ')
      
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


          

        _all_poi_uniqueID_array = []
        _all_poi_flat_array = []

        _total_poi = 0
        empty_info_outline_Tab()
        $("#poi_total").html(_total_poi)
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
             

