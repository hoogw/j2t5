

var google_nearby = "https://places.googleapis.com/v1/places:searchNearby"
var google_searchText = "https://places.googleapis.com/v1/places:searchText"




// https://developers.google.com/maps/documentation/places/web-service/nearby-search
var google_place_fieldMask = ""
google_place_fieldMask = "places.id,"
google_place_fieldMask += "places.displayName,"
google_place_fieldMask += "places.businessStatus,"
google_place_fieldMask += "places.types,"
google_place_fieldMask += "places.primaryType,"
// address
google_place_fieldMask += "places.location,"
google_place_fieldMask += "places.formattedAddress,"
google_place_fieldMask += "places.addressComponents,"
google_place_fieldMask += "places.adrFormatAddress,"
google_place_fieldMask += "places.shortFormattedAddress,"
// not use, enterprise SKU only
//google_place_fieldMask += "places.nationalPhoneNumber,"
//google_place_fieldMask += "places.reviews,"
//google_place_fieldMask += "places.photos,"






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










 /**/
 //  -  -  - google photo  -  -  - only for new marker
 /**/

     var last_poi_id 
     var current_poi_id 

/**/
//  -  -  - end  -  -  -  google photo    -  -  - only for new marker
/**/





 /**/
 //  -  -  - google photo  -  -  - 
 /**/

 async function google_photo(_place_id){

   
    var _photos_html = ''

    var _place_details
    var _place_displayName
    var _photos_array
    var _photos_name
    var _photos_heightPx
    var _photos_widthPx

    var _photo_api_key


        

    var hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
        console.log("The current URL is localhost.");
        _photo_api_key = _google_place_api_key
    } else {
        // use client's key
        _photo_api_key = your_google_api_key
    }
       
    // Place Details (New) requests https://developers.google.com/maps/documentation/places/web-service/place-details
    var _place_details_by_google_url = 'https://places.googleapis.com/v1/places/' + _place_id + '?fields=id,displayName,photos&key=' +  _photo_api_key
     

           var _response_place_details = await ajax_getjson_common(_place_details_by_google_url)
              if (typeof _response_place_details === 'object') {
                              // is object
                              _place_details = _response_place_details
              } else {
                              // is string
                              _place_details = JSON.parse(_response_place_details)
              }
              console.log('_place_details', _place_details)


              // place name 
              if (_place_details.hasOwnProperty('displayName')){
                _place_displayName =  _place_details.displayName.text
              }
              _photos_html += '<span style="font-size:19.3px; font-weight:800;">' + _place_displayName + '</span>' 
              
              
             
              // photos
              if (_place_details.hasOwnProperty('photos')){

                _photos_array = _place_details.photos
                for (let p = 0; p < _photos_array.length; p++) {
                  _photos_name =  _photos_array[p].name
                  _photos_heightPx = _photos_array[p].heightPx
                  _photos_widthPx = _photos_array[p].widthPx
                  _photos_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=570&maxWidthPx=570&key=' + _photo_api_key + '" >'
                }// for photo

              }//if


               
              $('#google-photo-div').html(_photos_html)
              

               



 }

/**/
//  -  -  - end  -  -  -  google photo    -  -  - 
/**/










/**/
//  --- google place geocode    --- 
/**/
            
  // poi only(with restriction),   not work for compare google poi( require no-referal-restriction) 
  var _google_place_api_key = 'AIzaSyAUaELIu9LUeqRZAkyxbOQN8CmGtW_gDmY'
  

  // with photo, without street view
  async function google_place_api_reverseGeocode(_lat_comma_lng_string){

    your_google_api_key = $('#googlemap-key-input').val(); 
    update_url_parameter('yourGoogleKey', your_google_api_key)

    // billing https://developers.google.com/maps/documentation/geocoding/usage-and-billing
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=your_api_key
    // for this kind of place,geocode api call with &key=xxx,Google not allow use website restrict(localhost,referer restrict is not allowed), can only use IP restrict (hp-police)localhost ip: 167.224.97.162  production server ip: 116.221.167.72
    // different from google map api key,  which is website restrict to transparentgov.net only

    var _reverseGeocode_by_google_url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + your_google_api_key +  '&latlng=' + _lat_comma_lng_string;
    console.log(' _reverseGeocode_by_google_url ', _reverseGeocode_by_google_url)
                 
    
    var _response_reverseGeocode = await ajax_getjson_common(_reverseGeocode_by_google_url)
    if (typeof _response_reverseGeocode === 'object') {
                    // is object
                    addressResult = _response_reverseGeocode
    } else {
                    // is string
                    addressResult = JSON.parse(_response_reverseGeocode)
    }
    console.log('address result', addressResult)

    var _formatted_address = ''
    var _place_id = ''
    address_value_html = ''

    var _place_details
    var _place_displayName
    var _photos_array
    var _photos_name
    var _photos_heightPx
    var _photos_widthPx

    var results_array = addressResult.results
                
    for (let i = 0; i < results_array.length; i++) {

        _formatted_address = results_array[i].formatted_address
        _place_id = results_array[i].place_id
                  
        if (i < 2){
         
          // Place Details (New) requests https://developers.google.com/maps/documentation/places/web-service/place-details
          var _place_details_by_google_url = 'https://places.googleapis.com/v1/places/' + _place_id + '?fields=id,displayName,photos&key=' +  your_google_api_key
          
          
          var _response_place_details = await ajax_getjson_common(_place_details_by_google_url)
              if (typeof _response_place_details === 'object') {
                              // is object
                              _place_details = _response_place_details
              } else {
                              // is string
                              _place_details = JSON.parse(_response_place_details)
              }
              console.log('_place_details', _place_details)


              if (_place_details.hasOwnProperty('displayName')){
                _place_displayName =  _place_details.displayName.text
              }


              // place name 
                address_value_html += '<span style="font-size:19.3px; font-weight:800;">' + _place_displayName + '</span>'  
                address_value_html += "&nbsp;"
                // address 
                address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'
                // place id 
                //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                //address_value_html += "<br>"

              // photos
              if (_place_details.hasOwnProperty('photos')){

                _photos_array = _place_details.photos
                for (let p = 0; p < _photos_array.length; p++) {
                  _photos_name =  _photos_array[p].name
                  _photos_heightPx = _photos_array[p].heightPx
                  _photos_widthPx = _photos_array[p].widthPx
                    address_value_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=400&maxWidthPx=400&key=' + your_google_api_key + '" >'
                }// for photo

              }//if


              //address_value_html += "<br>"

        } else{    
         
                      //address_value_html += "<br>"
                      address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'  
                      address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
        }// if
    }// for
                                  
    $('#info-window-div').html(address_value_html)

  }


                  // .............. click to show street view  .............. 

                  

                    // no photo, for street view
                    // photo conflict with street view, do not show photo to keep street view
                    async function google_place_api_reverseGeocode_streetview(_lat_comma_lng_string){
                      
                      your_google_api_key = $('#googlemap-key-input').val(); 
                      update_url_parameter('yourGoogleKey', your_google_api_key)


                      // billing https://developers.google.com/maps/documentation/geocoding/usage-and-billing
                      // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=your_api_key
                      // for this kind of place,geocode api call with &key=xxx,Google not allow use website restrict(localhost,referer restrict is not allowed), can only use IP restrict (hp-police)localhost ip: 167.224.97.162  production server ip: 116.221.167.72
                      // different from google map api key,  which is website restrict to transparentgov.net only

                      var _reverseGeocode_by_google_url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + your_google_api_key +  '&latlng=' + _lat_comma_lng_string;
                      console.log(' _reverseGeocode_by_google_url ', _reverseGeocode_by_google_url)
                                  
                      
                      var _response_reverseGeocode = await ajax_getjson_common(_reverseGeocode_by_google_url)
                      if (typeof _response_reverseGeocode === 'object') {
                                      // is object
                                      addressResult = _response_reverseGeocode
                      } else {
                                      // is string
                                      addressResult = JSON.parse(_response_reverseGeocode)
                      }
                      console.log('address result', addressResult)

                      var _formatted_address = ''
                      var _place_id = ''
                      address_value_html = ''
                      

                      var _place_details
                      var _place_displayName
                      var _photos_array
                      var _photos_name
                      var _photos_heightPx
                      var _photos_widthPx

                      var results_array = addressResult.results
                                  
                      for (let i = 0; i < results_array.length; i++) {

                          _formatted_address = results_array[i].formatted_address
                          _place_id = results_array[i].place_id
                                    
                          if (i < 2){
                          
                            // Place Details (New) requests https://developers.google.com/maps/documentation/places/web-service/place-details
                            var _place_details_by_google_url = 'https://places.googleapis.com/v1/places/' + _place_id + '?fields=id,displayName,photos&key=' +  your_google_api_key
                            
                            
                            var _response_place_details = await ajax_getjson_common(_place_details_by_google_url)
                                
                            if (typeof _response_place_details === 'object') {
                                                // is object
                                                _place_details = _response_place_details
                                } else {
                                                // is string
                                                _place_details = JSON.parse(_response_place_details)
                                }
                                console.log('_place_details', _place_details)


                            if (_place_details.hasOwnProperty('displayName')){
                                  _place_displayName =  _place_details.displayName.text
                                }


                                // place name 
                                address_value_html += '<span style="font-size:19.3px; font-weight:800;">' + _place_displayName + '</span>'  
                                address_value_html += "&nbsp;"
                                // address 
                                address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'
                                // place id 
                                //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                                address_value_html += "&nbsp;"
                                // photo conflict with street view, do not show photo to keep street view
                                //address_value_html += "<br>"


                                 // photos
                                  if (_place_details.hasOwnProperty('photos')){

                                    _photos_array = _place_details.photos
                                    for (let p = 0; p < _photos_array.length; p++) {
                                      _photos_name =  _photos_array[p].name
                                      _photos_heightPx = _photos_array[p].heightPx
                                      _photos_widthPx = _photos_array[p].widthPx
                                        address_value_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=400&maxWidthPx=400&key=' + your_google_api_key + '" >'
                                    }// for photo

                                  }//if


                                  //address_value_html += "<br>"

                          } else{    
                            
                            
                              
                                      //address_value_html += "<br>"
                                      address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'  
                                      address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                          }// if
                      }// for
                                                    
                      $('#info-window-div').html(address_value_html)
                      

                    }
                  // .............. end   ..............  click to show street view  .............. 


                  

/**/
//  --- end  ---  google place geocode    --- 
/**/










            var circle_range
            var circle_array = []
            
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
//  -  -  - guided ring for manual drawing circle or square  -  -  - 
/**/
            var circle_guideRing

            // only for manual, circle has click event 
            function drawing_circle_guideRing_for_manual_draw(_radiusMeter, _centerLng, _centerLat){

              clear_circle_guideRing()

              //console.log('drawing guide ring at ', _radiusMeter, _centerLng, _centerLat)

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




              // only for manual, guide ring has click event 
               google.maps.event.addListener(circle_guideRing, 'click', function(event) {

                // This function will be executed when the guide ring is clicked
                console.log('guide ring clicked at:', event.latLng.lat(), event.latLng.lng());
                

                        /**/
                        //  --- google manual drawing circle   --- 
                        /**/
                        var click_lat = Number(event.latLng.lat());
                        var click_lng = Number(event.latLng.lng());
                        var click_lat_lng_point = { lng : click_lng, lat : click_lat }
                        console.log(' circle get clicked . . .  lng, lat ', click_lng, click_lat)

                        nearby_poi(current_circle_radius, click_lng, click_lat)

                        /**/
                        //  --- end  ---  google manual drawing circle    --- 
                        /**/


              });



               google.maps.event.addListener(circle_guideRing, 'mousemove', function(event) {
                
                
                console.log('guide ring mouse move at:', event.latLng.lat(), event.latLng.lng());
                
                        /**/
                        //  --- google manual drawing circle   --- 
                        /**/
                        var mouse_lat = Number(event.latLng.lat());
                        var mouse_lng = Number(event.latLng.lng());
                        console.log('guide ring   ,  catch   ,   mouse move event   , pointer lat, lng',mouse_lng, mouse_lat)
                        drawing_circle_guideRing_for_manual_draw(current_circle_radius, mouse_lng, mouse_lat)
                        /**/
                        //  --- end  ---  google manual drawing circle    --- 
                        /**/
                });


              
            }



            function clear_circle_guideRing(){
               if (circle_guideRing) { circle_guideRing.setMap(null)}
            }

/**/
//  -  -  - end  -  -  -  guided ring for manual drawing circle or square    -  -  - 
/**/




/**/
//  -  -  - guided ring for pan and zoom  -  -  - 
/**/
            //  circle do not have click event 
            function drawing_circle_guideRing_for_pan_zoom(_radiusMeter, _centerLng, _centerLat){

              clear_circle_guideRing()

              console.log('drawing guide ring at ', _radiusMeter, _centerLng, _centerLat)

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
/**/
//  -  -  - end  -  -  -  guided ring for pan and zoom    -  -  - 
/**/







      function init_poi_ui(){


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


      }
            



      //  . . efficient core newOnly  . - .
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
                    
              
              



            
      // special version only for google place poi
      function poi_to_geojson(____poi_array){

        var ____feature_array = []
        var ____feature
        var poi_element

        var poi_location
        var poi_lat
        var poi_lng


        var poi_id
        var poi_name
        
        var poi_phone
        var poi_open

        var poi_addressComponents
        var poi_streetNumber
        var poi_streetName
        var poi_streetNameAbre

        var poi_formattedAddress
        
        var streetName_component = []
        var poi_streetPrefix
        var poi_streetNameOnly
        var poi_streetType


        var poi_city
        var poi_county
        var poi_state
        var poi_stateAbre
        var poi_zipCode
        

        var poi_primaryType
        var poi_type


        for (let i = 0; i < ____poi_array.length; i++) {

          poi_element = ____poi_array[i]
          //console.log('google place item ',i,  poi_element)
          poi_location = poi_element.location
          poi_lng = poi_location.longitude
          poi_lat = poi_location.latitude




          //console.log('test address component type ',i,  poi_element.addressComponents[1].types[0])
          poi_addressComponents = poi_element.addressComponents
          for (let c = 0; c < poi_addressComponents.length; c++) {

            if (poi_addressComponents[c].hasOwnProperty("types")){   // some do not have "types"

              switch (poi_addressComponents[c].types[0]) {
                case 'street_number':
                    poi_streetNumber = poi_addressComponents[c].longText;
                    break;

                // street name    
                case 'route':
                    poi_streetName = poi_addressComponents[c].longText;
                    poi_streetNameAbre = poi_addressComponents[c].shortText;


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






                    break;

                // city    
                case "locality":
                    poi_city = poi_addressComponents[c].longText;
                    break;

                // county    
                case 'administrative_area_level_2':
                      poi_county = poi_addressComponents[c].longText;
                      break;

                // state
                case 'administrative_area_level_1':
                    poi_state = poi_addressComponents[c].longText;
                    poi_stateAbre = poi_addressComponents[c].shortText;
                    break;

                // zip-code    
                case 'postal_code':
                    poi_zipCode = poi_addressComponents[c].longText;
                    break;
              
                default:
                
                  break;
              }//switch

            }//if
          }//for




          poi_id = poi_element.id
          poi_name = poi_element.displayName.text

          poi_primaryType = poi_element.primaryType
          poi_type = poi_element.types


          // not use, these should be done in arcpro
          // - - motorola requirement  - - 
          // 1) remove special char by space
          //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
          //poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
          // 2) truncate max length 60 char
          //poi_name = poi_name.substring(0, 60);
          //  - -  end - - motorola requirement  - - 


          poi_phone = poi_element.nationalPhoneNumber
          poi_open = poi_element.businessStatus
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
              "open": poi_open,

              "stNo": poi_streetNumber,
              

              //  . . . street name need to further split  . . . 
              "strName": poi_streetName,
              "stPrefix" : poi_streetPrefix,
              "stName" : poi_streetNameOnly,
              "stType" : poi_streetType,
              // . . .  end  . . .  street name need to further split



              "stNmAbre": poi_streetNameAbre,
            
              "county": poi_county,
              "city": poi_city,
              "state": poi_stateAbre,
              "state1":poi_state,
              "zipCode": poi_zipCode,

              "fmtAddr": poi_formattedAddress,

              "primaryType": poi_primaryType,
              "type": poi_type,

              //"poi_adrFormatAddress": poi_element.adrFormatAddress,
              //"poi_addressComponents": poi_element.addressComponents,
              // not working, because it is object
              //"poi_photos": poi_photo_url,
              //"poi_reviews": poi_element.reviews,
            
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




      
      function poi_viewer_for_download(___properties){

        //in use, customized properties ,  only for side info window, 
        var poi_other_html = ''
        poi_other_html    +=      '<span style="font-size:22.2px; font-weight:900;">' + ___properties.name + '</span>' + '&nbsp;&nbsp;'
        
        poi_other_html    +=      '<span style="font-size:13.3px;">' + ___properties.fmtAddr + '</span>' + '&nbsp;&nbsp;'
        
        // not use google poi id, too much info
        //poi_other_html    +=      '<span style="font-size:7.3px;">' + ___properties.poi_id + '</span>' + '&nbsp;&nbsp;'
        
        poi_other_html    +=      '<span style="font-size:9.3px; background-color:#FF8C00">' + ___properties.open + '</span>' + '&nbsp;&nbsp;'
       
        //poi_other_html    +=      '<span style="font-size:11.3px;">reviews(' + ___properties.poi_reviews + ')</span>' + '&nbsp;&nbsp;'
        //poi_other_html    +=      '<span style="font-size:8.3px;">' + ___properties.poi_photos + '</span>' + '&nbsp;&nbsp;'

        poi_other_html    +=      '<span style="font-size:12.2px;">primaryType(' + ___properties.primaryType + ')</span>' + '&nbsp;&nbsp;'
        
        
        //poi_other_html    +=    '<span style="font-size:10.2px;">types(' + ___properties.type + ')</span>' + '&nbsp;&nbsp;'
        return  poi_other_html 
         
      }







      

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
             










      