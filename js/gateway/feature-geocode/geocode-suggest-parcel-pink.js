

            var click_lng
            var click_lat
            var lng_comma_lat
            var markerSymbol
    
            dom_ready_dojo();

            // component
            
            //self-run
            (async function init_map_component_event(){ // without feature layer view

              // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
              arcgisMap = document.querySelector("arcgis-map")
                            arcgisMap.center = [_center_long, _center_lat]
                            arcgisMap.zoom = _center_zoom

              // component // reactive Utils . watch (
              arcgisMap.addEventListener("arcgisViewChange", (event) => {

                      console.log('arcgis View Change event',  event)
                      update_center_latLngZoom_esri_component(arcgisMap)
                        
              }); 

              // component // view . when 
              arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                            
                              // must place after  createa feature layer, other wise view is not ready, will cause error
                              init_view_ui()
                              
                              // if don't want google map, just delete this line
                              //init_base_map_galleryComponent() 
                              init_base_map_radio() 
                              
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                    
                      
              })
          })();


          

/**/
//  --- geocode    --- 
/**/

  
            geocode_map_event()

          function geocode_map_event(){

              // component // view . on ( " click " , function(event){
              arcgisMap.addEventListener("arcgisViewClick", (event) => {
                          
                    console.log(' view * click * fire 1 time is fine ', event)

                    click_lng = event.detail.mapPoint.longitude
                    click_lat = event.detail.mapPoint.latitude
                    lng_comma_lat = click_lng + ',' + click_lat

                  
                    

                    //  - -  clear previous suggest-geocode results if any  - - 
                      $('#info-window-div').html("")
                      $('#geocode-suggest-input').val("")
                      $('#suggest-options').html("")
                      $('#suggest-options').hide()
                    arcgisMap.graphics.removeAll();
                    //  - -  end  - -  clear previous suggest-geocode results if any  - - 


                    create_graphic_point(click_lng, click_lat)

                          
                    reverse_geocode(click_lng, click_lat)
                          

              }); // view . on . click

          }

   
            
          // only for this model    
          async function suggest(){

            clear_lastTime()


            // Code to execute when a key is released in the input field
            console.log("Key released in input field");
            console.log("Current value:", $("#geocode-suggest-input").val());

            keywords = $("#geocode-suggest-input").val().trim();
            update_url_parameter("search",keywords)

            if (keywords){
    
           
             //   -  -  - normal suggest   -  -  -
             // parcel in pink
             await basic_default_suggest_this_category_paint_as_this_color("Parcel","pink")
             await normal_suggest_all_cat_no_color()
              //    -  -  - end  -  -  - normal suggest   -  -  -




              $('#geocode-total-label').html("Total:(" + data_src_array.length + ")")
              console.log("data_src_array ", data_src_array)
              console.log("suggest_options_html advanced number search", suggest_options_html)


              if (suggest_options_html){
                $('#suggest-options').html(suggest_options_html)
                $('#suggest-options').show()
              } else {
                
                $('#suggest-options').html(suggest_options_html)
                $('#suggest-options').hide()
              }//if

             
            } else {

              clear_lastTime()


            }//if keywords

          }





 function init_geocode(){

        
        
        
        //show_locator_category() // not use to save space
        set_geocode_server_name_as_layer_name()

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






/**/
//  --- end  ---  geocode    --- 
/**/






      // component
               function init_view_ui(){  // component

              
                   


      }// init ui



    
            async function dom_ready_dojo(){


                          

            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/

            geocode_user_interface_event()
         init_user_interface_for_component()
            
         
         
                                
            init_geocode()


            // always at very last 
            firstTime1TimeSearchKeywords()
                           
        } // dom ready



              


         
             


               
   


                 


          









