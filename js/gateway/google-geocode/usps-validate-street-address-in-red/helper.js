 
 









 



 
 





























        

              
                                        
                                          
                                       
                                
                   










































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
        //  ---  ---  usps validate    --- 
        /**/

        async function usps_address_validate_by(full_address_string){

          // every time need a new token
          if (usps_token){
                 console.log("current USPS token expire in 8 hours ", usps_token)
          } else {

                  await $.ajax({
                        url: usps_generate_token_url,
                        type: "POST", // or "post"
                        data: {
                                                      
                                "grant_type": "client_credentials",
                                "client_id": usps_consumer_key,
                                "client_secret": usps_consumer_secret,
                                //"scope": "ResourceA ResourceB ResourceC"
                              
                        },
                        success: function(response) {
                            console.log("Success token from usps ", response);
                            usps_token = response.access_token
                        },
                        error: function(response) {
                            console.log("Error:", response);
                            if (response.responseJSON.error){
                              var _usps_error_html = ""
                              _usps_error_html += "<span style='font-size:small;'>" 
                              _usps_error_html += response.responseJSON.error.errors[0].title  + ", "
                              _usps_error_html += response.responseJSON.error.errors[0].detail 
                              $('#info-window-div').html(_usps_error_html)   
                            } 
                          
                        }
                    });
            
          }//if

          //  . . . address need to further split  . . . 
          // api https://github.com/hassansin/parse-address
          // remove comma with space
          console.log("before split address:", full_address_string);
          address_component =  parseAddress.parseLocation(full_address_string.replaceAll(",", " "));
          console.log("address_component:", address_component);
          // . . .  end  . . .  address need to further split

          var _usps_addr_url = usps_validate_address_url 
          _usps_addr_url +='?'

          _usps_addr_url += '&streetAddress='
          if (address_component.number){_usps_addr_url += address_component.number + ' '} 
          if (address_component.prefix){_usps_addr_url += address_component.prefix + ' '}
          if (address_component.street){_usps_addr_url += address_component.street + ' '}
          if (address_component.type){_usps_addr_url += address_component.type + ' '}
          if (address_component.city){_usps_addr_url += address_component.city + ' '}

          if (address_component.zip){_usps_addr_url += '&ZIPCode=' + address_component.zip}

          // state is always required, no matter what
          if (address_component.state){

            _usps_addr_url += '&state=' + address_component.state

          } else if (address_component.zip){

            // usps api get state and city by zip
             var _usps_city_state_url =  usps_validate_address_url.replace("v3/address", "v3/city-state")
             _usps_city_state_url += "?ZIPCode=" + address_component.zip
             console.log("usps api get state and city by zip:", address_component.zip);

          
            await $.ajax({
            
                    url:  _usps_city_state_url,
                    type: "GET", 
                    headers: {
                                 'Authorization': 'Bearer ' + usps_token
                              },
                    //method: 'GET',
                    dataType: 'json',
                    success: function(response) {
                        console.log("Success city-state by zip ", response);
                        console.log("found state is : ", response.state);
                        _usps_addr_url += '&state=' + response.state
                    },
                    error: function(response) {
                        console.log("Error:", response);
                         if (response.responseJSON.error){
                          var _usps_error_html = ""
                          _usps_error_html += "<span style='font-size:small;'>" 
                          _usps_error_html += response.responseJSON.error.errors[0].title  + ", "
                          _usps_error_html += response.responseJSON.error.errors[0].detail 
                          $('#info-window-div').html(_usps_error_html)   
                        } 
                       
                    }
                });
         

          } else {  
            // without zip, without state, default to CA
            _usps_addr_url += '&state=CA'
          }

          
  

          await $.ajax({

                    url:  _usps_addr_url,
                    type: "GET", 
                    headers: {
                                 'Authorization': 'Bearer ' + usps_token
                              },
                    //method: 'GET',
                    dataType: 'json',
                    success: function(usps_response) {
                        console.log("Success address from usps ", usps_response);

                         var _usps_html = ""
                            var _usps_dpv_confirmation = usps_response.additionalInfo.DPVConfirmation
                            var _usps_dpv_cmra = usps_response.additionalInfo.DPVCMRA
                           
                              // https://www.smarty.com/articles/usps-dpv-delivery-point-validation-confirmation-indicator#key-components-of-dpv
                            if ( (_usps_dpv_confirmation == 'Y') || //Y (Yes): This is fully confirmed. Both the primary (street + building number) and secondary (apartment/unit) match USPS delivery records, and the address is considered real and deliverable by USPS.
                                 (_usps_dpv_confirmation == 'D') || //D (Missing secondary): Primary is valid, but a secondary (apartment/suite) is expected and missing. Think of a large apartment building where the user didn't input a unit number. 
                                 (_usps_dpv_confirmation == 'S') //S (Invalid secondary): Primary is valid, but the provided secondary doesn't exist (think, someone fat-fingered the wrong apartment/suite number).
                            ){

                              _usps_html += "<span style='font-size:xx-large;'>" + 'Yes' + "</span>"



                              switch (_usps_dpv_confirmation) {
                                case 'Y':
                                   _usps_html += "<span style='font-size:small;'>(Y) Real and Deliverable</span>"
                                  break;
                                case 'D':
                                  _usps_html += "<span style='font-size:small;'>(D) Primary address is valid, but apartment/suite is missing</span>"
                                  break;
                                case 'S':
                                  _usps_html += "<span style='font-size:small;'>(S) Primary address is valid, but apartment/suite is wrong</span>"
                                  break;
                                default:
                                  // Code to be executed if no case matches
                              }




                              if (_usps_dpv_cmra == 'Y'){
                                        _usps_html += "<span style='font-size:large;'>" + 'Commercial Mail Receiving Agency' + "</span>"
                              } else if (_usps_dpv_cmra == 'N'){
                                        _usps_html += "<span style='font-size:large;'>" + 'Private Mailbox' + "</span>"
                              } else {
                                      // _usps_html += "<span style='font-size:large;'>" + 'unknow' + "</span>"
                              }//if 





                              _usps_html += "<span style='font-size:small;'>Carrier Route:" + usps_response.additionalInfo.carrierRoute + "</span>"
                              _usps_html += "<span style='font-size:small;'>Delivery Point:" + usps_response.additionalInfo.deliveryPoint + "</span>"

                            } else if (_usps_dpv_confirmation == 'N') {
                              // N (No): Neither the primary nor the secondary address datapoints match USPS records. This address is NOT deliverable.
                              _usps_html += "<span style='font-size:large;'>" + 'NOT deliverable !' + "</span>"
                              
                            }

                            _usps_html += "<span style='font-size:small;'>" 

                                  //_usps_html += usps_response.address.streetAddressAbbreviation + ", "
                                  _usps_html += usps_response.address.streetAddress + ", "
                                  //_usps_html += usps_response.address.cityAbbreviation + ", "
                                  _usps_html += usps_response.address.city + ", "

                                  _usps_html += usps_response.address.state + ", "
                                  _usps_html += usps_response.address.ZIPCode + "-" + usps_response.address.ZIPPlus4

                              _usps_html += "</span>"


                            $('#info-window-div').html(_usps_html)  
                        
                    },
                     error: function(response) {
                        console.log("Error:", response);
                         if (response.responseJSON.error){
                          var _usps_error_html = ""
                          _usps_error_html += "<span style='font-size:small;'>" 
                          _usps_error_html += response.responseJSON.error.errors[0].title  + ", "
                          _usps_error_html += response.responseJSON.error.errors[0].detail 
                          $('#info-window-div').html(_usps_error_html)   
                        } 
                       
                    }
                });

                

                             
       }//if



        

        /**/
        //  --- end  ---  usps validate    --- 
        /**/







            




             













/**/






            



