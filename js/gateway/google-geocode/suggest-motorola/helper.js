 
 









 



 
 





























        

              
                                        
                                          
                                       
                                
                   










































          // ----------  add map listener idle ---------- 

          function add_map_listener_idle(){   
                                                        
                                                
                                                        
            listener_idle =  map.addListener('idle', function() {   

              console.log('  !!! map idle event   !!! ')
              update_center_latLngZoom();
            
           
              // .............. street view is always on .............. 
                // update exsiting street view
                turn_on_street_view(_center_lat, _center_long, 1000)
              // .............. end   ..............  street view is always on  .............. 


     
            });





            /**/
            //  --- geocode    --- 
            /**/


              var listener_click =  map.addListener('click', function(click_event) {   

                  console.log(' * * * * click  map   event * * * ', click_event )
                  var click_lat = Number(click_event.latLng.lat());
                  var click_lng = Number(click_event.latLng.lng());
                  var click_lat_lng_point = { lng : click_lng, lat : click_lat }
                  console.log(' **** click map *** >>> lng, lat ', click_lng, click_lat)

                
                
                // .............. street view is always on .............. 
                  // update exsiting street view
                  turn_on_street_view(click_lat, click_lng, 100)
                // .............. end   ..............  street view is always on  .............. 






                      //  - -  clear previous suggest-geocode results if any  - - 
                        $('#info-window-div').html("")
                        $('#geocode-suggest-input').val("")
                        $('#suggest-options').html("")
                        $('#suggest-options').hide()

                        if (myLocationMarker){
                          // remove previous my location marker
                          myLocationMarker.setMap(null)
                        }
                      //  - -  end  - -  clear previous suggest-geocode results if any  - - 


                      create_graphic_point(click_lng, click_lat)

                            
                      reverse_geocode(click_lng, click_lat)
                            





              });


                    
            /**/
            //  --- end  ---  geocode    --- 
            /**/





          }



          //  - - - -  end  - - - -   ----------  add map listener idle ---------- 











              

                                      
            function update_url_parameter(_field, _value){
                                      
              var _____searchParams = new URLSearchParams(window.location.search);

              if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
              //if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                       // remove this param from uRL
                          _____searchParams.delete(_field);
                          console.log("delete url parameter: _field", _field );
              } else {
                      // update this param from uRL
                          _____searchParams.set(_field, _value);
                          console.log("update url parameter: _field _value", _field + " + "+ _value);
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
                                                                            //path: svg_icon_path_pin1,

                                                                            // ---  ---  marker-icon,label, size change based on zoom level  ---  ---  --- 
                                                                            scale: ____circle_radius,
                                                                            //scale: Math.floor(google_marker_icon_scale_by_zoom_level[_center_zoom] / 2),
                                                                            //scale: Math.floor(google_marker_icon_scale_by_zoom_level[_center_zoom]),


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


                















            




             













/**/






            



