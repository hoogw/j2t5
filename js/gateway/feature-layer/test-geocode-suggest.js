


     

              
              var click_lng
              var click_lat
              var lng_comma_lat
              var markerSymbol

              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer 
              var native_renderer
                       
              
 							                
                      

              // any document ready function is in here
              dom_ready_dojo();

             // component
              
              //self-run
              (async function init_map_component_event(){ 

                // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
                arcgisMap = document.querySelector("arcgis-map")
                            arcgisMap.center = [_center_long, _center_lat]
                            arcgisMap.zoom = _center_zoom

                // component // reactive Utils . watch (
                arcgisMap.addEventListener("arcgisViewChange", (event) => {

                      console.log('arcgis View Change event',  event)
                      update_center_latLngZoom_esri_component(arcgisMap)
            
                      if (layerView){
                                  layerView.queryFeatures({
                                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                                          geometry: arcgisMap.extent,  // for component 

                                                  //outFields: layerView.availableFields,
                                                  //where: "DEW_POINT > 10"
                                                })
                                                  .then(function(results) {
                                                                              current_feature_rendered = results.features.length
                                                                              console.log("current features returned and rendered : ",  current_feature_rendered);
                                                                              update_statistic_info_vertical(current_feature_rendered , total_feature_count)                                          
                                                      })
                                                        .catch(function(error) {
                                                                              console.log("query failed: ", error);
                                                            });
                      }//if


                }); 
                  
                // component // view . when 
                // await arcgisMap.viewOnReady();
                arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                      // Once the map component is ready, get the feature layer and set the outFields.
                      // both works, await arcgisMap.viewOnReady();
                      createFeatureLayer()
                      init_feature_layer_view()

                      // must place after  createa feature layer, other wise view is not ready, will cause error
                      init_view_ui()
                      // if don't want google map, just delete this line
                      init_base_map_radio() 
                  
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                   
                              
                })

            })();





                
/**/
//  --- geocode  (on top of feature layer)  --- 
/**/


          geocode_map_event()

          function geocode_map_event(){

              // component // view . on ( " click " , function(event){
              arcgisMap.addEventListener("arcgisViewClick", (event) => {
                          
                    console.log(' view * click * fire 1 time is fine ', event)

                    click_lng = event.detail.mapPoint.longitude
                    click_lat = event.detail.mapPoint.latitude
                    lng_comma_lat = click_lng + ',' + click_lat

                    input_geocode_endpoint_url = $("#geocode-server-url-input").val()
                    console.log("input_geocode_endpoint_url", input_geocode_endpoint_url)
                    if (input_geocode_endpoint_url){

                              //  - -  clear previous suggest-geocode results if any  - - 
                                $('#info-window-div').html("")
                                $('#geocode-suggest-input').val("")
                                $('#suggest-options').html("")
                                $('#suggest-options').hide()
                              arcgisMap.graphics.removeAll();
                              //  - -  end  - -  clear previous suggest-geocode results if any  - - 

                              create_graphic_point(click_lng, click_lat)
                              reverse_geocode(click_lng, click_lat)

                    } else { 
                              alert('you must input geocode serve endpoint url')
                    }
                          

              }); // view . on . click

          }
            

/**/
//  --- end  ---  geocode  (on top of feature layer)  --- 
/**/





               
              

              // component
               function init_view_ui(){
              
                            //  ... opacity  ...

                            if (param_overlayOpacity){
                              groundoverlay_opacity = param_overlayOpacity / 10
                            }

                            var opacity_slider = document.querySelector("#overlay_opacity_range");
                            opacity_slider.value = groundoverlay_opacity * 10

                            var opacity_value_text = document.querySelector("#opacity_value_text");
                            opacity_value_text.textContent = opacity_slider.value;
                            
                            // event handle   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                            opacity_slider.addEventListener("input", (event) => {
                              var _overlay_opacity = event.target.value;
                              opacity_value_text.textContent = _overlay_opacity
                              update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  groundoverlay_opacity = _overlay_opacity / 10;
                    
                                                  // update overlay opacity
                                                  backgroundFeatureLayer.opacity = groundoverlay_opacity
                            });
                            // ... end ... opacity




                   


              }// init ui


          var layerView
          // component
          async function createFeatureLayer(){
          

            if (backgroundFeatureLayer){
            } else {
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url,
                      outFields: "*",
                      opacity: groundoverlay_opacity,
                    });
            }


           
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info_vertical(current_feature_rendered , total_feature_count)

            });

              arcgisMap.map.add(backgroundFeatureLayer)

              layerView = await arcgisMap.whenLayerView(backgroundFeatureLayer);

               // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = backgroundFeatureLayer.renderer.clone();
                }
               

                // enforce use yellow square for point, yellow line, yellow polygon
                // must be here after featurelayer fully loaded
                enforce_yellow_linepointpolygon(backgroundFeatureLayer)

                // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                  if (zoom_to_1st_feature){
                                              // only zoom 1 time, first time, never zoom again
                                              zoom_to_1st_feature = false; 
                                              //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                              pan_to_real_location()
                  }//if 
          } 




     
      // component 
     // component must use e v e n t .  d e t a i l
     async function init_feature_layer_view(){
        
      }// function








/**/
//  --- geocode  (on top of feature layer)  --- 
/**/


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




function clear_geocode(){
      $('#info-window-div').html("")
      $('#geocode-suggest-input').val("")
      $('#suggest-options').html("")
      $('#suggest-options').hide()
      arcgisMap.graphics.removeAll();
}




// only for test-geocode
async function reverse_geocode(clicked_lng, clicked_lat){ // only for test-geocode

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

  // only for test-geocode
  var reverseGeocode_url = input_geocode_endpoint_url + "/reverseGeocode?f=json&outSR=4326" // only for test-geocode 
  
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

      var _reverse_geocode_html = "<span style='font-size:xx-large;'>"
    //_reverse_geocode_html += reverseGeocode_json.address.Match_addr
    _reverse_geocode_html += reverseGeocode_json.address.LongLabel
    _reverse_geocode_html += "</span>"
    $('#info-window-div').html(_reverse_geocode_html)

    }//if 

 

}

            


        // only for test geocode server 
        async function apply_custom_geocode_server_handler(){

           input_geocode_endpoint_url = $("#geocode-server-url-input").val().trim();
          console.log(' geocode-server-url-input keyup event ', input_geocode_endpoint_url)
          update_url_parameter('geocode', input_geocode_endpoint_url)
          
          if (input_geocode_endpoint_url.includes("GeocodeServer")){
                  

               





              // check category
              geocode_json = await ajax_getjson_common(input_geocode_endpoint_url + "?f=json")
              console.log(' geocode_json ', geocode_json) 

              var _html_capabilities = "<span style='font-size:large; font-weight:900'>1.</span> click map show <b>Address</b>:"
              if (geocode_json.capabilities){
                
                if (! geocode_json.capabilities.includes("ReverseGeocode")){
                    _html_capabilities += warning_icon + "warning: missing ReverseGeocode capability"
                } 
                _html_capabilities += "<br>" + yes_icon + "locator capabilities: (" + geocode_json.capabilities + ")"
              } 
              $("#geocode-capabilities-label").html(_html_capabilities)
            
              var _html_categories = "<span style='font-size:large; font-weight:900'>2.</span> search locator <b>Categories</b>:"

              if (! geocode_json.capabilities.includes("Suggest")){
                    _html_categories    += warning_icon + "warning: missing Suggest capability"
              } 
              _html_categories    += "</br>"

              if (geocode_json.categories){
              for (let j = 0; j < geocode_json.categories.length; j++) {

                          //_html_categories   += info_icon
                          _html_categories    += yes_icon + "Role#"+ (j+1) + ":<b>" + geocode_json.categories[j].name + "</b>"
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
                              _html_categories    += ' }'

                          }//if

                          
                          _html_categories   += '<br>'

                     }//for




               // fake street address warning 
                var fake_address_found = false
                for (let f = 0; f < geocode_json.categories.length; f++) {

                    // p-a-r-c-e-l category don't have sub-category
                    if (geocode_json.categories[f].categories){

                        for (let h = 0; h < geocode_json.categories[f].categories.length; h++) {
                        if (geocode_json.categories[f].categories[h].name == "Street Address"){
                            _html_categories   += warning_icon + '<span>Warning: fake street address</span>'
                            fake_address_found = true
                            _html_categories   += '<br>'
                            break;
                            }
                        }//for

                    }//if
                }//for
                if (!(fake_address_found)){
                   //_html_categories   += info_icon + '<span>street address (estimated,may not real)  NOT present</span>'
                }
               // _html_categories   += '<br>'
              // - -  end  - -  fake street address warning 






        }//if 
              $("#geocode-categories-label").html(_html_categories)
              console.log("standard_categories_flat_array", standard_categories_flat_array)
              console.log("poi_cat_flat_array", poi_cat_flat_array)

              var _html_cross_street_connector =  "<span style='font-size:large; font-weight:900'>3.</span> search <b>Cross Street</b> "  
              if (geocode_json.locatorProperties.IntersectionConnectors){
                      _html_cross_street_connector +=  yes_icon + "use customized:[ <b>" + geocode_json.locatorProperties.IntersectionConnectors 
              } else {
                //https://pro.arcgis.com/en/pro-app/latest/help/data/geocoding/fundamentals-of-intersection-geocoding.htm
                      
                 if (fake_address_found){
                          _html_cross_street_connector  += yes_icon + "Use Default:[ <b>" + '&, |, \\, and, at' 
                 } else {
                          _html_cross_street_connector  += warning_icon + "Either Not Available or Use Default:[ <b>" + '&, |, \\, and, at' 
                 } 
              }

              _html_cross_street_connector += "</b> ]between 2 street name"
              _html_cross_street_connector   += '<br>'
              $("#geocode-crossstreetconnector-label").html(_html_cross_street_connector)
              console.log("cross street connector", geocode_json.locatorProperties.IntersectionConnectors)
            


          } else {

             $("#geocode-capabilities-label").html("")
             $("#geocode-categories-label").html("")
             $("#geocode-crossstreetconnector-label").html("")

          }// if geocode

        }




         // only for this model    
      async function suggest(){


            clear_lastTime()


            // Code to execute when a key is released in the input field
            console.log("Key released in input field");
            console.log("Current value:", $("#geocode-suggest-input").val());

            keywords = $("#geocode-suggest-input").val().trim();
            update_url_parameter("search",keywords)

            global_keyword = keywords // for abort last time

            if (keywords){

           

                    var suggestGeocode_url = input_geocode_endpoint_url + "/suggest?f=json&outSR=4326&maxSuggestions=" + max_suggestion_item_count + "&text=" + encodeURIComponent(keywords)


                    
                    var suggestGeocode_response = await ajax_getjson_common(suggestGeocode_url)

                    var suggestGeocode_json = suggestGeocode_response

                    //console.log("suggestGeocode_response ", suggestGeocode_json)

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

                      }//if

                      $('#geocode-total-label').html("Total:(" + data_src_array.length + ")")
              console.log("data_src_array ", data_src_array)

                      if (suggest_options_html){
                        $('#suggest-options').html(suggest_options_html)
                        $('#suggest-options').show()
                      } else {
                        
                        $('#suggest-options').html(suggest_options_html)
                        $('#suggest-options').hide()
                      }//if
                       
                      



                    }//if 


             }//if 



      }



      // only for test geocode server 
      function init_geocode(){ // only for test geocode server 


         

        $("#geocode-server-url-input").on("change keyup", apply_custom_geocode_server_handler);
        $("#apply-geocode-btn").on("click", apply_custom_geocode_server_handler);


       $("#geocode-suggest-input").on("keyup", suggest);


        $('#suggest-options').change(function() {
            //Use $option (with the "$") to see that the variable is a jQuery object
            var $option = $(this).find('option:selected');
            //Added with the EDIT
            var value = $option.val();//to get content of "value" attrib
            var text = $option.text();//to get <option>Text</option> content
            console.log(" you select value ", value, text)

            // alway clear previous point
              arcgisMap.graphics.removeAll();

            
            /* not use, use magic key instead
              // not use because, for example 3 letter as street name, single line text did not work, 
              // only for text
              //find_address_candidate_by(text)
              */

              // only for magic key, always works
              find_address_candidate_by(value)
        });

      }




      async function find_address_candidate_by(raw_key_word){

        //  - - - fix bug,  - - - 
        // if search key word have space, will cause inaccurate result lat-lng returned.
        // for example (wrong lat-lng returned)                ...&Address=SATURN AVE & MOUNTAIN VIEW AVE, HPK, 90255
        // will return different result as (correct lat-lng)   ...&Address=SATURN+AVE+&+MOUNTAIN+VIEW+AVE,+HPK,+90255
        var _key_word = encodeURIComponent(raw_key_word)
        console.log('en code key word no space,  ', raw_key_word)
        // - - - end --- fix bug  - - - 

        var findAddressCandidatesGeocode_url = input_geocode_endpoint_url
        findAddressCandidatesGeocode_url += "/findAddressCandidates?f=json&outSR=4326" 

        // to show custom output field, must set out fields is *
        findAddressCandidatesGeocode_url += "&outFields=*"

        /* not use, use magic key instead
        // not use because, for example 3 letter as street name, single line text did not work, 
        // only for text
        // some city use single line parameter,
        findAddressCandidatesGeocode_url += "&Single+Line+Input=" +  _key_word
        // some city use address parameter,
        findAddressCandidatesGeocode_url += "&Address=" +  _key_word
        */

        // only for magic key, always works
        findAddressCandidatesGeocode_url += "&magicKey=" +  _key_word

        
        var findAddressCandidatesGeocode_response = await ajax_getjson_common(findAddressCandidatesGeocode_url)

       
        var findAddressCandidatesGeocode_json = findAddressCandidatesGeocode_response

        console.log("findAddressCandidatesGeocode_response ", findAddressCandidatesGeocode_json)

        if (findAddressCandidatesGeocode_json.error){
          // error 
          $('#info-window-div').html(findAddressCandidatesGeocode_json.error.details[0] + "   " + findAddressCandidatesGeocode_json.error.message)
        } else {


          var _candidates_array = findAddressCandidatesGeocode_json.candidates

          if (_candidates_array.length){

          var _candidates_html = "<span style='font-size:xx-large;'>"
             _candidates_html +=  _candidates_array[0].attributes.LongLabel
             _candidates_html += "</span>"
             $('#info-window-div').html(_candidates_html)


          var candidate_lng = findAddressCandidatesGeocode_json.candidates[0].location.x
          var candidate_lat = findAddressCandidatesGeocode_json.candidates[0].location.y
          create_graphic_point(candidate_lng, candidate_lat)

          // zoom 2 location by move map
          arcgisMap.center = [candidate_lng, candidate_lat]
          arcgisMap.zoom = Number($("#zoom2level-input").val()) // default 20


         } else {
            // 0 candidate, empty previous result
            clear_lastCandidate()
            $('#info-window-div').html("Not found or not exist or fake address")
          }//if 

        }//if 
      }//function



      function clear_lastCandidate(){
            //  - -  clear previous reverse-geocode results if any  - -  
            $('#info-window-div').html("")
            arcgisMap.graphics.removeAll();
            // - -  end  - -   clear previous reverse-geocode results if any
      }



       var response_array = [] // for abort ajax   resp.abort
      function clear_lastTime(){

        //  - -  clear previous reverse-geocode results if any  - -  
        $('#info-window-div').html("")
        arcgisMap.graphics.removeAll();
        // - -  end  - -   clear previous reverse-geocode results if any


        // empty last time result in drop down selection option area
        magic_keys_array = []
        data_src_array = []
        suggest_options_html = ''
        $('#suggest-options').html(suggest_options_html)
        $('#suggest-options').hide()

        // a b o r t   last     k e y w o r d      a j a x
        for (let b = 0; b < response_array.length; b++) {
          // abort last ajax
          console.log('abort last ajax',  response_array[b])
          response_array[b].abort
        }
        response_array = []

      }






function firstTime1TimeSearchKeywords(){
            // always at very end when everything is ready
            if (param_search){
                $("#geocode-suggest-input").val(param_search)
                // first time 1 time search existing keywords from url param
                suggest()
            }
}




/**/
//  --- end  ---  geocode  (on top of feature layer)  --- 
/**/


            


            
               
        
      

      async function dom_ready_dojo(){



        
            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/

      

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

                         

                                                       
         geocode_user_interface_event()
         init_user_interface_for_component()
                          
         update_layer_name(background_layer_url, _layer)  
                          
           
         

          /**/
          //  --- geocode  (on top of feature layer)  --- 
          /**/

          init_geocode()


            // always at very last 
            firstTime1TimeSearchKeywords()
          /**/
          //  --- end  ---  geocode  (on top of feature layer)  --- 
          /**/


        
                          
      } // dom ready



              




      function init_background_layer(){

        // .... ... ...  background layer url .... ... ... 

                  init_global_var() 
                  // must carry these value from arcgis_common.js
                  background_mapserver_url = param_background_mapserver_url
                  layer_id  = param_layer_id
                  background_layer_url = param_background_layer_url
                  console.log(' background_mapserver_url ', background_mapserver_url)  
                  console.log(' layer_id ', layer_id)  
                  console.log(' background_layer_url ', background_layer_url) 
                  
            

            }




            




// for test geocode only, it does not include shared arcgis-geocode, so have to have this function seperately
 function geocode_user_interface_event(){
         
  $("#suggest_btn").on("click", suggest);

  $("#find_btn").on("click", function(){
      
       /* not use, use magic key instead
        // not use because, for example 3 letter as street name, single line text did not work, 
        // only for text
        console.log(" find button clicked, now selected option text is,  ", $('#suggest-options option:selected').text())
        find_address_candidate_by($('#suggest-options option:selected').text())
      */

      // only for magic key, always works
      console.log(" find button clicked, now selected option value (magic key) is,  ", $('#suggest-options option:selected').val())
      find_address_candidate_by($('#suggest-options option:selected').val())
  });

  $("#clear_btn").on("click", function(){
      clear_geocode()
  });

 }



                 


          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 


              // arcgis common adjustment
              function update_layer_name(___layer_url, ___layer_name){

                // without link
                //$('#layer-info-vertical').html('<strong style="font-size:12px;">' + ___layer_name + '</strong>')
                // with link
                $('#layer-info-vertical').html('<a  target="_blank" href="' + ___layer_url +'">' + ___layer_name + '</a>')


              }


              function update_statistic_info_vertical(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ total = '...' } // not available...
                
                $('#feature-on-map').html(rendered)
                $('#total-feature').html(total)
              }


              function update_statistic_info_vertical_calculation(rendered, total){

                console.log(' update statistic info only for calculation  - - - : - - - ', rendered, total  )

                var funding_on_map  = '...' 
                if (isNaN(rendered)){ 
                  $('#funding-on-map').html(funding_on_map)
                } else {

                  var funding_on_map = Math.floor(Math.random() * rendered)
                  var funding_on_map_formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(funding_on_map,)
                  $('#funding-on-map').html(funding_on_map_formatted + 'M')

                }
                
              }




               // enforce use yellow square for point, yellow line, yellow polygon              
               function enforce_yellow_linepointpolygon(_this_feature_layer){



                      // for geojsonlayer, featurelayer, 
                      //================================== renderer =================================================
                      // polygon

                      var polygon_renderer = {
                        type: "simple",  // autocasts as new SimpleRenderer()
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()

                          //  . . .simple fill symbol style . . .
                          style: pattern_simpleFillSymbol_esriSFS_js_api_array[current_simplefillPattern],
                          // . . . end . . . simple fill symbol style

                          color:   _default_fillColor,  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                            color: _default_strokeColor,

                            //  . . .simple fill symbol style . . .
                            type: "simple-line",  // autocasts as new SimpleLineSymbol()
                            style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                            // . . . end . . . simple fill symbol style
                          }
                        }
                      };




                      // line
                      var polyline_renderer = {
                        type: "simple",  // autocasts as new SimpleRenderer()
                        symbol: {
                                  //  . . .simple fill symbol style . . .
                                  type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                  style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                  // . . . end . . . simple fill symbol style


                                  color: _default_strokeColor,
                                  width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  

                        

                        }
                      };



                      // point
                      var point_renderer = {
                        type: "simple",  // autocasts as new SimpleRenderer()
                        symbol: {
                          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()

                          //  . . .simple fill symbol style . . .
                          style: simpleMarkerSymbol_esriSMS_array[current_simpleMarker],
                          // . . . end . . . simple fill symbol style


                          color: _default_fillColor,
                          size: _default_pointRadius, // 10,
                        outline: {  // autocasts as new SimpleLineSymbol()
                              width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                              color: _default_strokeColor,

                              //  . . .simple fill symbol style . . .
                              type: "simple-line",  // autocasts as new SimpleLineSymbol()
                              style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                              // . . . end . . . simple fill symbol style
                          }

                        }
                      };






                    console.log( ' _this_feature_layer.geometryType ......>'  , _this_feature_layer.geometryType)
                    var _geometry_type_ = _this_feature_layer.geometryType.toLowerCase()
                    if (_geometry_type_ == 'polygon') {
                                  console.log( ' _this_feature_layer.renderer ......>'  , polygon_renderer)
                                  _this_feature_layer.renderer = polygon_renderer;
                    } 

                    if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                                _this_feature_layer.renderer = point_renderer;
                    }   


                    if (_geometry_type_ == 'polyline') {
                                  _this_feature_layer.renderer = polyline_renderer;
                    }   




              } 
              //    . . . end  . . . enforce use yellow square for point, yellow line, yellow polygon 
              /**/  



              // -- -- -- vertial adjustment  -- -- -- 
              /**/




 



