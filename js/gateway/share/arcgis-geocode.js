




      
      var keywords
      var response_array = [] // for abort ajax   resp.abort
      var global_keyword // for abort for loop
      var alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
      console.log('alphabet array', alphabet)

    

     

      



// both google/esri works
async function basic_default_suggest_this_category_paint_as_this_color(_this_category, _this_color){

  // cat. not exist, can cause http response error
  if (standard_categories_flat_array.includes(_this_category)){

      var suggestGeocode_url = background_layer_url + "/suggest?f=json&outSR=4326&maxSuggestions=" + max_suggestion_item_count 
          suggestGeocode_url += "&category=" + _this_category
          suggestGeocode_url += "&text=" + encodeURIComponent(keywords)

      var suggestGeocode_response = await ajax_getjson_common(suggestGeocode_url)
        
      
      var suggestGeocode_json = suggestGeocode_response
  
      if (suggestGeocode_json.error){
        // error 
              console.log("suggest error:" + suggestGeocode_json.error.details[0] + "   " + suggestGeocode_json.error.message);
              $('#info-window-div').html("suggest error:" + suggestGeocode_json.error.details[0] + "   " + suggestGeocode_json.error.message)

      } else {

        $('#info-window-div').html('') // remove previously error message if any
        console.log("suggestGeocode_response ", suggestGeocode_json)
        var suggestions_array = suggestGeocode_json.suggestions

        if (suggestions_array.length){
          for (let i = 0; i < suggestions_array.length; i++) {

            var _____suggestion_text = suggestions_array[i].text
            var ____magicKey = suggestions_array[i].magicKey

            if (magic_keys_array.includes(____magicKey)
              || (data_src_array.includes(_____suggestion_text))
            ){
                  // magic key already exist, or suggest text already exist,  nothing to do, skip
            } else {
                // 6611 e, generate E 55th st, etc, unrelated results, must filter out
                // do not use, cross street search will stop work
                //if (_____suggestion_text.toLowerCase().includes(keywords.toLowerCase())){

                    magic_keys_array.push(____magicKey)
                    data_src_array.push(_____suggestion_text)

                      if (_this_color == "no-color"){
                          suggest_options_html += '<option value="' + ____magicKey + '">' + _____suggestion_text + '</option>'
                      } else {
                          suggest_options_html += '<option style="background-color: ' + _this_color + ';"    value="' + ____magicKey + '">' + _____suggestion_text + '</option>'
                      }


                            
                //}//do not use if keywords
            }//if magic key
          
          }//for
        }// if
      }// if

  } 

  console.log("magic_keys_array", magic_keys_array)
  console.log("data_src_array", data_src_array)
  console.log("suggest_options_html,   normal suggest  ", suggest_options_html)


}

// both google/esri works
async function advanced_number_search_this_category_paint_as_this_color(_this_category, _this_color){

    // number search only for real addr
    if (standard_categories_flat_array.includes(_this_category)){


      // ajax 
      for (let a = 0; a < 26; a++) {

        // global keyword change, means no longer need search this old keywords, cancel the rest of for loop
        if (global_keyword != keywords){
          console.log('global_keyword != keywords')
          data_src_array = []
          magic_keys_array = []
          
          break; // for loop
        }



        var suggestGeocode_url_for_number = background_layer_url 
        suggestGeocode_url_for_number += "/suggest?f=json&outSR=4326" 
        suggestGeocode_url_for_number += "&maxSuggestions="  + max_suggestion_item_count
        suggestGeocode_url_for_number += "&category=" + _this_category
        suggestGeocode_url_for_number += "&text=" + encodeURIComponent(keywords + " " + alphabet[a])
  
        
        //var suggestGeocode_response_for_number = await ajax_getjson_common(suggestGeocode_url_for_number)

        $('#info-window-div').html("searching..." + keywords + " " + alphabet[a])

        var suggestGeocode_response_for_number = await $.ajax({
                                //timeout:_timeout,
                                url:suggestGeocode_url_for_number,
                                success: function (data) {                                                                                                         
                                }, // success
                                error: function (error) {
                                  console.log('ajax json failed ', error)
                                }                                                                                              
        });
        response_array.push(suggestGeocode_response_for_number)

    
        var suggestGeocode_json_for_number = suggestGeocode_response_for_number

        //console.log("suggestGeocode_response_for_number ", suggestGeocode_json_for_number)

        if (suggestGeocode_json_for_number.error){
          // error, skip
        } else {

          console.log("suggestGeocode_response_for_number ", suggestGeocode_json_for_number)

          var number_suggestions_array = suggestGeocode_json_for_number.suggestions

          if (number_suggestions_array.length){

            for (let i = 0; i < number_suggestions_array.length; i++) {
              var ____number_suggestion_text = number_suggestions_array[i].text
              var ____number_magicKey = number_suggestions_array[i].magicKey

              if (magic_keys_array.includes(____number_magicKey)
                || (data_src_array.includes(____number_suggestion_text))
              ){
                    // magic key already exist, or suggest text already exist,  nothing to do, skip
              } else {

                // 6611 e, generate E 55th st, etc, unrelated results, must filter out
                if (____number_suggestion_text.toLowerCase().includes(keywords.toLowerCase())){
                  
                  data_src_array.push(____number_suggestion_text)
                  magic_keys_array.push(____number_magicKey)

                  if (_this_color == "no-color"){
                      suggest_options_html += '<option value="' + ____number_magicKey + '">' + ____number_suggestion_text + '</option>'
                  } else {
                      suggest_options_html += '<option style="background-color: ' + _this_color + ';"    value="' + ____number_magicKey + '">' + ____number_suggestion_text + '</option>'
                  }


                }//if

              }//if

            }//for
            
          }//if

        }//if
        

        
      }//for

    }//if
    
}








// both google/esri works
async function advanced_poi_search_this_category_paint_as_this_color(_this_category, _this_color){

  // poi search 
  if (standard_categories_flat_array.includes(_this_category)){

    // ajax 
    for (let a = 0; a < 26; a++) {

        // global keyword change, means no longer need search this old keywords, cancel the rest of for loop
        if (global_keyword != keywords){
          console.log('global_keyword != keywords')
          data_src_array = []
          magic_keys_array = []
          
          break; // for loop
        }


        var suggestGeocode_url_for_poi = background_layer_url 
        suggestGeocode_url_for_poi += "/suggest?f=json&outSR=4326" 
        suggestGeocode_url_for_poi += "&maxSuggestions="  + max_suggestion_item_count 
        suggestGeocode_url_for_poi += "&category=" + _this_category
        suggestGeocode_url_for_poi += "&text=" + encodeURIComponent(keywords + " " + alphabet[a])
  
        
        //var suggestGeocode_response_for_poi = await ajax_getjson_common(suggestGeocode_url_for_poi)

        $('#info-window-div').html("searching..." + keywords + " " + alphabet[a])

        var suggestGeocode_response_for_poi = await $.ajax({
                                //timeout:_timeout,
                                url:suggestGeocode_url_for_poi,
                                success: function (data) {                                                                                                         
                                }, // success
                                error: function (error) {
                                  console.log('ajax json failed ', error)
                                }                                                                                              
        });
        response_array.push(suggestGeocode_response_for_poi)

                        
        var suggestGeocode_json_for_poi = suggestGeocode_response_for_poi

        //console.log("suggestGeocode_response_for_poi ", suggestGeocode_json_for_poi)

        if (suggestGeocode_json_for_poi.error){
          // error, skip
        } else {
                console.log("suggestGeocode_response_for_poi ", suggestGeocode_json_for_poi)

                var poi_suggestions_array = suggestGeocode_json_for_poi.suggestions

                if (poi_suggestions_array.length){

                      for (let i = 0; i < poi_suggestions_array.length; i++) {
                            var ____poi_suggestion_text = poi_suggestions_array[i].text
                            var ____poi_magicKey = poi_suggestions_array[i].magicKey

                            if (magic_keys_array.includes(____poi_magicKey)
                              || (data_src_array.includes(____poi_suggestion_text))
                            ){
                                  // magic key already exist, or suggest text already exist,  nothing to do, skip
                            } else {

                                      
                                      // 6611 e, generate E 55th st, etc, unrelated results, must filter out
                                      // poi does not use this
                                      if (____poi_suggestion_text.toLowerCase().includes(keywords.toLowerCase())){
                                        
                                        data_src_array.push(____poi_suggestion_text)
                                        magic_keys_array.push(____poi_magicKey)
                                       
                                      
                                        if (_this_color == "no-color"){
                                            suggest_options_html += '<option value="' + ____poi_magicKey + '">' + ____poi_suggestion_text + '</option>'
                                        } else {
                                            suggest_options_html += '<option style="background-color: ' + _this_color + ';"    value="' + ____poi_magicKey + '">' + ____poi_suggestion_text + '</option>'
                                        }
                                      
                                      
                                      }//if

                            }//if

                      }//for
                  
                }//if

        }//if
                        

                        
      }//for


  }//if

}


// both google/esri works
async function normal_suggest_all_cat_no_color(){

              var suggestGeocode_url = background_layer_url + "/suggest?f=json&outSR=4326&maxSuggestions=" + max_suggestion_item_count + "&text=" + encodeURIComponent(keywords) 
             
              var suggestGeocode_response = await ajax_getjson_common(suggestGeocode_url)
               
              
              var suggestGeocode_json = suggestGeocode_response
          
              if (suggestGeocode_json.error){
                // error 
                      console.log("suggest error:" + suggestGeocode_json.error.details[0] + "   " + suggestGeocode_json.error.message);
                      $('#info-window-div').html("suggest error:" + suggestGeocode_json.error.details[0] + "   " + suggestGeocode_json.error.message)


              } else {

                $('#info-window-div').html('') // remove previously error message if any
                console.log("suggestGeocode_response ", suggestGeocode_json)
                var suggestions_array = suggestGeocode_json.suggestions

                if (suggestions_array.length){
                  for (let i = 0; i < suggestions_array.length; i++) {

                        var _____suggestion_text = suggestions_array[i].text
                        var ____magicKey = suggestions_array[i].magicKey

                        if (magic_keys_array.includes(____magicKey)
                          || (data_src_array.includes(_____suggestion_text))
                        ){
                              // magic key already exist, or suggest text already exist,  nothing to do, skip
                        } else {
                                    // 6611 e, generate E 55th st, etc, unrelated results, must filter out
                                    // do not use, cross street search will stop work
                                      //if (_____suggestion_text.toLowerCase().includes(keywords.toLowerCase())){
                                        magic_keys_array.push(____magicKey)
                                        
                                        data_src_array.push(_____suggestion_text)
                                        suggest_options_html += '<option value="' + ____magicKey + '">' + _____suggestion_text + '</option>'
                              
                                    //}//do not use if keywords
                        }//if magic key
                      



                  }//for
                }// if
              }// if

}


// both google/esri works
async function advanced_suggest_all_cat_no_color(){

    // ajax 
    for (let a = 0; a < 26; a++) {

          // global keyword change, means no longer need search this old keywords, cancel the rest of for loop
          if (global_keyword != keywords){
            console.log('global_keyword != keywords')
            data_src_array = []
            magic_keys_array = []
            
            break; // for loop
          }


          var suggestGeocode_url_for_poi = background_layer_url 
          suggestGeocode_url_for_poi += "/suggest?f=json&outSR=4326" 
          suggestGeocode_url_for_poi += "&maxSuggestions="  + max_suggestion_item_count 
          suggestGeocode_url_for_poi += "&text=" + encodeURIComponent(keywords + " " + alphabet[a])
    
          
          //var suggestGeocode_response_for_poi = await ajax_getjson_common(suggestGeocode_url_for_poi)

          $('#info-window-div').html("searching..." + keywords + " " + alphabet[a])

          var suggestGeocode_response_for_poi = await $.ajax({
                                  //timeout:_timeout,
                                  url:suggestGeocode_url_for_poi,
                                  success: function (data) {                                                                                                         
                                  }, // success
                                  error: function (error) {
                                    console.log('ajax json failed ', error)
                                  }                                                                                              
          });
          response_array.push(suggestGeocode_response_for_poi)

      
          var suggestGeocode_json_for_poi = suggestGeocode_response_for_poi

          //console.log("suggestGeocode_response_for_poi ", suggestGeocode_json_for_poi)

          if (suggestGeocode_json_for_poi.error){
            // error, skip
          } else {
                  console.log("suggestGeocode_response_for_poi ", suggestGeocode_json_for_poi)

                  var poi_suggestions_array = suggestGeocode_json_for_poi.suggestions

                  if (poi_suggestions_array.length){

                        for (let i = 0; i < poi_suggestions_array.length; i++) {
                              var ____poi_suggestion_text = poi_suggestions_array[i].text
                              var ____poi_magicKey = poi_suggestions_array[i].magicKey

                              if (magic_keys_array.includes(____poi_magicKey)
                                || (data_src_array.includes(____poi_suggestion_text))
                              ){
                                    // magic key already exist, or suggest text already exist,  nothing to do, skip
                              } else {

                                        
                                        // 6611 e, generate E 55th st, etc, unrelated results, must filter out
                                        // poi does not use this
                                        if (____poi_suggestion_text.toLowerCase().includes(keywords.toLowerCase())){
                                          
                                          data_src_array.push(____poi_suggestion_text)
                                          magic_keys_array.push(____poi_magicKey)
                                          suggest_options_html += '<option value="' + ____poi_magicKey + '">' + ____poi_suggestion_text + '</option>'
                                        }//if

                              }//if

                        }//for
                    
                  }//if

          }//if
      

      
    }//for

}








function firstTime1TimeSearchKeywords(){
            // always at very end when everything is ready
            if (param_search){
                $("#geocode-suggest-input").val(param_search)
                // first time 1 time search existing keywords from url param
                suggest()
            }
}




 function geocode_user_interface_event(){

         
  $("#suggest_btn").on("click", suggest);

  $("#find_btn").on("click", function(){
      console.log(" find button clicked, now selected option text is,  ", $('#suggest-options option:selected').text())
      find_address_candidate_by($('#suggest-options option:selected').text())
  });

  $("#clear_btn").on("click", function(){
      clear_geocode()
  });

 }







      // esri only
      async function show_locator_category(){


        // must carry these value from arcgis_common.js
        background_mapserver_url = param_background_mapserver_url
        layer_id  = param_layer_id
        background_layer_url = param_background_layer_url
        console.log(' background_mapserver_url ', background_mapserver_url)  
        console.log(' layer_id ', layer_id)  
        console.log(' background_layer_url ', background_layer_url) 
        
        

        // check category
        geocode_json = await ajax_getjson_common(background_layer_url + "?f=json")
        console.log(' geocode_json ', geocode_json) 


        // 1
        var _html_capabilities = "<b>1.</b> Click map show <b>Address</b>,  "
        if (geocode_json.capabilities){
          if (! geocode_json.capabilities.includes("ReverseGeocode")){
            //_html_capabilities += warning_icon 
            _html_capabilities += "warning: missing ReverseGeocode capability"
          } 
          //_html_capabilities +=  yes_icon
          _html_capabilities += "locator capabilities:(" + geocode_json.capabilities + ")"
        } 
        _html_capabilities += "<br>" 
        $("#geocode-capabilities-label").html(_html_capabilities)



        // 2
        var _html_categories = "<b>2.</b> Search locator <b>Categories</b>,   "
        if (! geocode_json.capabilities.includes("Suggest")){
           _html_categories    += warning_icon
           _html_categories    += "warning: missing Suggest capability"
        } 
        if (geocode_json.categories){
         for (let j = 0; j < geocode_json.categories.length; j++) {

                    //_html_categories   += yes_icon
                    _html_categories    +=  "Role#"+ (j+1) + ":<b>" + geocode_json.categories[j].name + "</b>"
                    standard_categories_flat_array.push(geocode_json.categories[j].name)


                    // p-a-r-c-e-l category don't have sub-category
                    if (geocode_json.categories[j].categories){

                        _html_categories    += "{Cat.( "

                        for (let k = 0; k < geocode_json.categories[j].categories.length; k++) {
                            
                          if (geocode_json.categories[j].name == "POI"){

                            // only poi category
                            poi_cat_flat_array.push(geocode_json.categories[j].categories[k].name)

                          } else {

                            // except POI all other category
                            standard_categories_flat_array.push(geocode_json.categories[j].categories[k].name)
                          }


                            _html_categories    += geocode_json.categories[j].categories[k].name
                            _html_categories    += ', '
                        }//for

                        _html_categories    += ' )'
                        _html_categories    += ' },  '
                        

                    }//if

                    _html_categories    += '  '
                    //_html_categories   += '<br>'

                }//for




               // fake street address warning 
                var fake_address_found = false
                for (let f = 0; f < geocode_json.categories.length; f++) {

                    // p-a-r-c-e-l category don't have sub-category
                    if (geocode_json.categories[f].categories){

                        for (let h = 0; h < geocode_json.categories[f].categories.length; h++) {
                          if (geocode_json.categories[f].categories[h].name == "Street Address"){
                            //_html_categories   += warning_icon
                            _html_categories   += '<span>Warning: fake street address</span>'
                            fake_address_found = true
                            //_html_categories   += '<br>'
                            break;
                          }//if
                        }//for

                    }//if
                }//for
                if (!(fake_address_found)){
                   //_html_categories   += info_icon + '<span>street address (estimated,may not real)  NOT present</span>'
                }
               // _html_categories   += '<br>'
              // - -  end  - -  fake street address warning 






        }//if 
        _html_categories    += "</br>"
        $("#geocode-categories-label").html(_html_categories)
        console.log("standard_categories_flat_array", standard_categories_flat_array)
        console.log("poi_cat_flat_array", poi_cat_flat_array)




        // 3 
        var _html_cross_street_connector =  "<b>3.</b> Search <b>Cross Street</b> "  
        if (geocode_json.locatorProperties.IntersectionConnectors){
          //_html_cross_street_connector +=  yes_icon
          _html_cross_street_connector += "use customized:[ <b>" + geocode_json.locatorProperties.IntersectionConnectors 
        } else {
                 //https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/fundamentals-of-intersection-geocoding.htm
                 if (fake_address_found){
                  //_html_cross_street_connector  += yes_icon
                  _html_cross_street_connector  += "Use Default:[ <b>" + '&, |, \\, and, at' 
                 } else {
                  //_html_cross_street_connector  += warning_icon
                  _html_cross_street_connector  += "Either Not Available or Use Default:[ <b>" + '&, |, \\, and, at' 
                 } 
        }

        _html_cross_street_connector += "</b> ]between 2 street name"
        _html_cross_street_connector   += '<br>'
        $("#geocode-crossstreetconnector-label").html(_html_cross_street_connector)
        console.log("cross street connector", geocode_json.locatorProperties.IntersectionConnectors)
      


      }



      // esri only
      function set_geocode_server_name_as_layer_name(){

        var geocode_server_name = ''
        var path_array = background_mapserver_url.split("/")
        geocode_server_name = path_array[path_array.length-1]
        document.title = geocode_server_name  
        update_url_parameter('layer', geocode_server_name ) 
        $('#layer-info-vertical').html('<a  target="_blank" href="' + background_layer_url +'">' + geocode_server_name + '</a>')
        
      }



// esri only
async function create_graphic_point(____lng, ____lat){


          // First create a point geometry 
          var point = {
            type: "point", // autocasts as new Point()
            longitude: ____lng,
            latitude: ____lat
          };

          // Create a symbol for drawing the point
           markerSymbol = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        style: "circle",
                        color: [39, 66, 245, 0.376],
                        size: "31px",  // pixels
                        outline: {  // autocasts as new SimpleLineSymbol()
                          color: [255,255,0,0.676],
                          width: 3  // points
                        }
                      };


          
          // Create a graphic and add the geometry and symbol to it
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });

          // Add the graphics to the view's graphics layer
           return arcgisMap.graphics.add(pointGraphic);

}



// esri only
function clear_geocode(){
      $('#info-window-div').html("")
      $('#geocode-suggest-input').val("")
      $('#suggest-options').html("")
      $('#suggest-options').hide()
      $('#geocode-total-label').html("")
      if (arcgisMap){
          arcgisMap.graphics.removeAll();
        }
}



// esri only
async function reverse_geocode(clicked_lng, clicked_lat){

  clear_lastTime()

  console.log("background_layer_url", background_layer_url)

  var _location_param = {
                          "x":clicked_lng,
                          "y":clicked_lat,
                          "spatialReference": {
                                                  "wkid": 4326
                                              }
                        }
  var encoded_location = encodeURI(JSON.stringify(_location_param)) 

  var reverseGeocode_url = background_layer_url + "/reverseGeocode?f=json&outSR=4326" 
  //reverseGeocode_url += "&returnIntersection=false"
  reverseGeocode_url += "&location=" +  encoded_location

  var reverseGeocode_response = await ajax_getjson_common(reverseGeocode_url)

  //var reverseGeocode_json = JSON.parse(reverseGeocode_response)
  var reverseGeocode_json = reverseGeocode_response

  console.log("reverseGeocode_response ", reverseGeocode_json)

  if (reverseGeocode_json.error){
    // error 
    $('#info-window-div').html(reverseGeocode_json.error.details[0] + "   " + reverseGeocode_json.error.message)
  } else {
    $('#info-window-div').html(json_flex_tip_viewer(reverseGeocode_json.address))
  }//if 



}

            



      // esri only
      async function find_address_candidate_by(raw_key_word){

        //  - - - fix bug,  - - - 
        // if search key word have space, will cause inaccurate result lat-lng returned.
        // for example (wrong lat-lng returned)                ...&Address=SATURN AVE & MOUNTAIN VIEW AVE, HPK, 90255
        // will return different result as (correct lat-lng)   ...&Address=SATURN+AVE+&+MOUNTAIN+VIEW+AVE,+HPK,+90255
        var _key_word = encodeURIComponent(raw_key_word)
        console.log('en code key word no space,  ', raw_key_word)
        // - - - end --- fix bug  - - - 

        var findAddressCandidatesGeocode_url = background_layer_url 
        findAddressCandidatesGeocode_url += "/findAddressCandidates?f=json&outSR=4326" 
        // some city use single line parameter,
        findAddressCandidatesGeocode_url += "&Single+Line+Input=" +  _key_word
        // some city use address parameter,
        findAddressCandidatesGeocode_url += "&Address=" +  _key_word

        
        var findAddressCandidatesGeocode_response = await ajax_getjson_common(findAddressCandidatesGeocode_url)

       
        var findAddressCandidatesGeocode_json = findAddressCandidatesGeocode_response

        console.log("findAddressCandidatesGeocode_response ", findAddressCandidatesGeocode_json)

        if (findAddressCandidatesGeocode_json.error){
          // error 
          $('#info-window-div').html(findAddressCandidatesGeocode_json.error.details[0] + "   " + findAddressCandidatesGeocode_json.error.message)
        } else {


          var _candidates_array = findAddressCandidatesGeocode_json.candidates

          if (_candidates_array.length){

              var _candidates_html = ''
              for (let i = 0; i < _candidates_array.length; i++) {
                _candidates_html += '<span style="font-size:7px;font-weight:900">&nbsp;&nbsp;' + (i+1) + '. ' + '</span>'
                _candidates_html += _candidates_array[i].address
                _candidates_html += '<sub style="font-size:8px">' + _candidates_array[i].location.x + ', '
                _candidates_html +=  _candidates_array[i].location.y + '</sub>'
                _candidates_html += '</br>'
              }//for
              $('#info-window-div').html(_candidates_html)

              var candidate_lng = findAddressCandidatesGeocode_json.candidates[0].location.x
              var candidate_lat = findAddressCandidatesGeocode_json.candidates[0].location.y
              create_graphic_point(candidate_lng, candidate_lat)

              // do not move map by comment out this line
              arcgisMap.center = [candidate_lng, candidate_lat]
              // do not zoom to by comment out this line
              arcgisMap.zoom = Number($("#zoom2level-input").val()) // default 20
          
          } else {
            // 0 candidate, empty previous result
            clear_lastCandidate()
            $('#info-window-div').html("Not found or not exist or fake address")
          }//if 

        }//if 
      }//function


      // esri only
      function clear_lastCandidate(){
            //  - -  clear previous reverse-geocode results if any  - -  
            $('#info-window-div').html("")
            if (arcgisMap){
              arcgisMap.graphics.removeAll();
            }
            // - -  end  - -   clear previous reverse-geocode results if any
      }


      // esri only
      function clear_lastTime(){


       //  - -  must  a b o r t  first, must at top, otherwise, after empty, array, some ajax remainings may left over  - -  
        // a b o r t   last     k e y w o r d      a j a x
        for (let b = 0; b < response_array.length; b++) {
          // abort last ajax
          console.log('abort last ajax',  response_array[b])
          response_array[b].abort
        }
        response_array = []
        //  - -  end  - -  must  a b o r t  first, must at top,





        //  - -  clear previous reverse-geocode results if any  - -  
        $('#info-window-div').html("")
        if (arcgisMap){
          arcgisMap.graphics.removeAll();
        }
        
        // - -  end  - -   clear previous reverse-geocode results if any


        // empty last time result in drop down selection option area
        magic_keys_array = []
        data_src_array = []
        suggest_options_html = ''
        $('#suggest-options').html(suggest_options_html)
        $('#suggest-options').hide()

        $('#geocode-total-label').html("")

       

      }

      
