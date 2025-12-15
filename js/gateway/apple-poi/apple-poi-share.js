


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
    function poi_geojson_to_feature_for_hover(single_whole_geojson){

      var features_array = single_whole_geojson.features
      
      for (let i = 0; i < features_array.length; i++) {
        var one_geojson_feature =  features_array[i]
        var _coordinate_point = one_geojson_feature.geometry.coordinates
        poi_create_annotation_for_hover(one_geojson_feature.properties, _coordinate_point)

        
        // fix bug, if use annotation, must disable overlay event. otherwise overlay event will overwrite annotation event, cause it failed to function
        // only-for-click-map-latlng
        //document.querySelector("#map").removeEventListener("mousemove", mousemove_on_map_event_handler)
        document.querySelector("#map").removeEventListener("click",click_on_map_event_handler) 
                    

      
      }//for



    }




    var apple_poi_Annotation
    function poi_create_annotation_for_hover(_properties, point){

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
                /*
                mouseenter will trigger multiple times and mouseleave failed to fire, 
                it is not because of I embed a svg image inside.
                it is because I change svg color by change div innert html content when hover.
                if do not change to svg highlight color , mouseenter will fire only 1 time, which is what i want.
                
                    https://stackoverflow.com/questions/7286532/jquery-mouseenter-vs-mouseover
                    https://stackoverflow.com/questions/1104344/what-is-the-difference-between-the-mouseover-and-mouseenter-events
                    https://stackoverflow.com/questions/1638877/difference-between-onmouseover-and-onmouseenter
                    warning mouseover do not work, because, mouseover fired when mouse is on both 'this' element and its 'children'(in this case, children element is svg icon tag)
                    mouseover could be target on svg instead of wrapper div element. I only attach .data(property) attribute to div, not svg. 
                    so event.target.data will be empty if mouseover target at svg. 

                    mouseenter/mouseleave will only target on div element, not its child svg. 
                    so event.target.data will always be div's data, which I always attached properties to. 
                

                    console.log("annotation mouseenter hover event, DOM event ", event);
                    console.log("annotation mouseenter hover event, DOM event  .target", event.target);
                    console.log("annotation mouseenter hover event, DOM event  .target.innerHTML", event.target.innerHTML);
                */
                
                // not fixed bug, so not highlight svg icon when hover for now
                event.target.innerHTML = highlight_icon  // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 
                
                show_info_outline_Tab(event.target.data)
            }); 


            div.addEventListener("mouseleave", function(event) {
                console.log("annotation mouse out event, DOM event", event);
                // some time, it failed  
                event.target.innerHTML = default_icon // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 
                //  when it failed, enforce it 
                reset_all_annotation_style_to_default()
                                                                                                                                                         
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
        apple_poi_Annotation = new mapkit.Annotation(coordinate, factory, options);
        
        
        // annotation icon image dom click event failed to trigger, use this apple event instead
        apple_poi_Annotation.addEventListener('select', function(event) {  

                console.log("select overlay. event", event);

                // reset all overlay style to default
                reset_all_annotation_style_to_default()
                
                // only change this selected overlay color
                event.target.element.innerHTML = classfiy_icon;
                show_listTab(event.target.data)

        });
        

        map.addAnnotation(apple_poi_Annotation);
        return apple_poi_Annotation;


        


    }// annotaion