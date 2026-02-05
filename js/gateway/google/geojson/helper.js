 

                  function add_mapdata_listener(){



                    set_map_style(_default_strokeColor,_default_strokeWeight, _default_fillColor , _default_pointRadius)




                    // click listener
                      map.data.addListener('click', function(event) {


                         //  --- click or hover   ---
                         if (click_or_hover == 'click'){
                                    
                                map.data.revertStyle();    
                                map.data.overrideStyle(event.feature, {
                                  
                                  // icon only affect point 
                                  icon        : {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: _highlight_pointRadius,
                                    strokeColor: _classfiy_strokeColor, 
                                    strokeOpacity: _default_pointStrokeOpacity, 
                                    strokeWeight: _classfiy_strokeWeight
                                  },

                                  // affect polygon and polyline
                                  strokeWeight: _classfiy_strokeWeight,
                                  strokeColor: _classfiy_strokeColor,
                                  fillOpacity: _classfiy_fillOpacity
                                  //fillColor:''
                              });


                              show_info_outline_Tab(event)

                         }//if

                      });    





                      // mouse over listener
                        map.data.addListener('mouseover', function (event) {   
                          

                          // console.log('hover-event.feature - ', event.feature)

                        //  --- click or hover   ---
                              if (click_or_hover == 'hover'){
                               
                                    //map.data.revertStyle();                 
                                    map.data.overrideStyle(event.feature, {

                                      // icon only affect point 
                                      icon        : {
                                        path: google.maps.SymbolPath.CIRCLE,
                                        scale: _classfiy_pointRadius,
                                        strokeColor: _highlight_strokeColor, 
                                        strokeOpacity: _default_pointStrokeOpacity, 
                                        strokeWeight: _highlight_strokeWeight
                                      },

                                        // affect polygon and polyline
                                        strokeWeight: _highlight_strokeWeight,
                                        strokeColor: _highlight_strokeColor,
                                        fillOpacity: _highlight_fillOpacity
                                        //fillColor:''
                                    });
                                    

                                    show_info_outline_Tab(event)

                            }//if
                        });




                          // mouse out listener
                        map.data.addListener('mouseout', function (event) {

                            //  --- click or hover   ---
                            if (click_or_hover == 'hover'){
                            
                                   map.data.revertStyle(event.feature);
                                   empty_info_outline_Tab()

                            }//if
                        
                        });


                  }



      
                
                  function add_map_listener_idle(){   
                                                        
                                                
                                                        
                    listener_idle =  map.addListener('idle', function() {   

                      console.log('  !!! map idle event   !!! ')
                      update_center_latLngZoom();
                                   
                    });



                  }


                                      
            function update_url_parameter(_field, _value){
                                      
              var _____searchParams = new URLSearchParams(window.location.search);

              if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
              //if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                       // remove this param from uRL
                          _____searchParams.delete(_field);
                          console.log("delete url parameter(field)-->", _field );
              } else {
                      // update this param from uRL
                          _____searchParams.set(_field, _value);
                          console.log("update url parameter(field=value)-->", _field + "="+ _value);
              }

              // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
              //window.location.search = searchParams.toString();

              // instead avoid reload
              var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
              history.pushState(null, '', _____newRelativePathQuery);

             


            } 



               /**/      
               // ========= setting tab ==============   
                          
                  function set_map_style(____strokeColor, ____strokeWeight, ____fillColor , ____circle_radius){

                                  map.data.setStyle({
                                                          // icon only affect point 
                                                          icon        : {
                                                                            path: google.maps.SymbolPath.CIRCLE,
                                                                            scale: ____circle_radius,
                                                                            strokeColor: ____strokeColor, 
                                                                            strokeOpacity: 0.9,  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                                                            strokeWeight: ____strokeWeight
                                                                          },

                                                          // affect polygon and polyline  
                                                          fillOpacity: _default_fillOpacity,   // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                                          fillColor: ____fillColor,
                                                          strokeColor: ____strokeColor,
                                                          strokeWeight: ____strokeWeight
                                    
                                });
                  }

                  function update_map_style(){

                      _default_strokeColor = $('#symbol_color').val();
                      _default_strokeWeight = $('#line_width_range').val();
                      _default_fillColor = $('#fill_color').val();
                      _default_pointRadius = $('#point_radius_range').val();
                      console.log('line stroke symbol color change to  .... ... .. .',  _default_strokeColor)
                      console.log('line stroke symbol width change to  .... ... .. .',  _default_strokeWeight)
                      console.log('polygon fill color change to  .... ... .. .',  _default_fillColor)
                      console.log('point size change to  .... ... .. .',  _default_pointRadius)

                      set_map_style(_default_strokeColor, _default_strokeWeight, _default_fillColor, _default_pointRadius)
                  }

               // ========= end =========  setting tab ==============       





function init_user_interface_event(){



  


//       - -  -  -  geojson   - -  -  -  

      
       document.getElementById("file-input").addEventListener("change", (event) => {



       //  - -- - if you want to add multiple geojson, then don't remove previous geojson by comment out this section  - -- - 
            // remove previous geojson
            // remove all feature from google map data layer  https://stackoverflow.com/questions/23071775/how-to-remove-data-from-a-google-maps-data-layer
            map.data.forEach(function(feature) {
              // filter...
              map.data.remove(feature);
            });
        // - -- - end  - -- - if you want to add multiple geojson, then don't remove previous geojson by comment out this section  - -- - 
        
        
        // get c:\fakepath\xxx.xxx
        file_fakepath = event.target.value;
        // only name, no path
        fileName = event.target.files[0].name;
        console.log('file fake path, file Name',file_fakepath,  fileName)

        if (fileName.indexOf(".geojson") !== -1) {//is file a zip - if not notify user

          var file_reader = new FileReader();

          file_reader.onload = function(e) {
               var arrayBuffer = file_reader.result;
               var file_string = new TextDecoder("utf-8").decode(arrayBuffer);
               console.log('arrayBuffer -- ',arrayBuffer)
               console.log('file_string  -- ',file_string)
               add_geojson_google(file_string)
          } 

          file_reader.readAsArrayBuffer(document.getElementById('file-input').files[0]);

        } else {
          alert("not .geojson file, invalid file format")
        }
      });



//      - -  -  -   end    - -  -  -  geojson   - -  -  -  







  
  
  
  }

/**/








