


/**/
// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 


      var _maxAllowableOffset = 0  // default

// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
/**/



//  +++++++++ ********* +++++++++   ground overlay,  map tile   +++++++++ ********* +++++++++  
/**/


       // default
       var current_overlaytype = 'overlayType_image';
       

       var singleFusedMapCache = false;
       var spatial_reference_mapserver = 4326 // default for map server (tile is regards map server, multi-layers)
       var imageMapType

       




       
               
               var image_opacity = 0;  // default
               var spatial_reference = 4326 // default for layer (image, groundOverlay is regards layers)
               var groundoverlay;
               var groundOverlayImage = null // must be global var for image loading progressing bar


//  +++++++++ ********* end  +++++++++      ground overlay,  map tile    +++++++++ ********* +++++++++  








 /**/





          








/**/


    // ++++++++++   geocode    ++++++++++

    var _address_content="";
    var _long_content="";
    var _lat_content="";
    var _url2_content="";
    var _url1_content="";

   var candidateLocationResult

   var _candidate_location_geojson_layer;

   var _singleLineAddressField
   var _addressFields




   
   

// ++++++++++   end   ++++++++++   geocode    ++++++++++














/**/

                                                              // --------- add proxy  --------- 
                                                                          var ____current_window_protocol = window.location.protocol

                                                                          // default http
                                                                          var proxyurl = "http://transparentgov.net:7000/";  

                                                                          console.log('____current_window_protocol', ____current_window_protocol)

                                                                          if (____current_window_protocol == 'https:') {
                                                                          
                                                                            proxyurl = "https://transparentgov.net:7200/";
                                                                            
                                                                          }
                                                              // --------- end  ---------  add proxy  --------- 
  



/**/




 



 var _total_count_of_feature = -2;
 var _current_count_of_feature = -1;

 



// -------------------- max count pagination --------------------

        // default maxRecordCount is 1000 or 2000, arcgis server admin can overwrite it to a large number like 20k, 
        // if admin set it to 20k, we must enforce it as 1000, means we only retrieve first 1000 records, no matter maxRecordCount is how large. 
        var _default_resultRecordCount = 500
        

        // use in pan to real location, get how many sample  
        var _sample_count = 10
        
         // define at feature layer json, advancedQueryCapabilities
       // if true, can use limited return ( default result Record Count ) result Off set, result Record Count, if false,  use unlimited (relay on maxRecordCount 2000) 
       // var _supportsPagination = false
        
 // -------------------- end --------------------
 
 


                                          //------------ search feature --------
                                          var _feature_attributes =[];
                                          var _feature_attributes_string =[];
                                          var _feature_attributes_integer =[];
                                          var _feature_attributes_double =[];
                                          var _feature_attributes_date =[];
                                          //---------  End --- search feature --------



                    /* 


                         "supportsAdvancedQueries": true, 


                          advancedQueryCapabilities:
                                                  supportsCountDistinct: true
                                                  supportsDistinct: true
                                                  supportsHavingClause: true
                                                  supportsOrderBy: true
                                                  supportsPagination: true
                                                  supportsQueryWithDistance: true
                                                  supportsReturningQueryExtent: true
                                                  supportsSqlExpression: true
                                                  supportsStatistics: true
                                                  supportsTrueCurve: true
                                                  useStandardizedQueries: true
                    */

                    var _supportsAdvancedQueries  = false;

                    var _supportsCountDistinct  = false;
                    var _supportsDistinct = false;
                    var _supportsHavingClause = false;
                    var _supportsOrderBy = false;
                    var _supportsPagination = false;
                    var _useStandardizedQueries = false;
                    var _supportsStatistics = false;
                    var _supportsTrueCurve = false;
                    var _supportsReturningQueryExtent = false;
                    var _supportsQueryWithDistance = false;
              
                    
                    var field_alias = {} 
                    var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
                    var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                    var field_value = []
                    var flatJson_item
                    var fieldValue_flatjson
                    var field_structure_flatjson = []
                    







               /**/
              // -- -- -- vertial adjustment  -- -- -- 



          /**/
          // only for vertical table 
          function display_count_info(_subject, ___showing_cnt, ___all_cnt){

            $('#layer-info-vertical').html('<a  target="_blank" href="' + _url +  '/' + _layer_id +'">' + _subject + '</a>')
            console.log(' update statistic info', ___showing_cnt, ___all_cnt)
            if (isNaN(___showing_cnt)){ ___showing_cnt = '...' } // not available...
            if (isNaN(___all_cnt)){ ___all_cnt = '...' } // not available...
            $('#feature-on-map').html(___showing_cnt)
            $('#total-feature').html(___all_cnt)

            var _percentage_html = ''
            var _percentage_float, _percentage_integer, _percentage_decimal;
            
            if ((___showing_cnt > 0) && (___all_cnt > 0)) {
              _percentage_float = (100 * ___showing_cnt) / ___all_cnt
              _percentage_integer = Math.floor(_percentage_float);
              _percentage_decimal = (_percentage_float.toFixed(3)).split(".")[1]

               // in use, simple number as :  50.987%
               _percentage_html =   '<h6 style="display: inline;"><mark>' 
               _percentage_html +=        '<b>' + _percentage_integer +  '</b>'   
               _percentage_html +=        '.' 
               _percentage_html +=        '<sup><small>' + _percentage_decimal + '</small></sup>' 
               _percentage_html +=        '%' 
               _percentage_html +=   '</mark></h6>'
            }
                  
            // do not use percentage
            //document.getElementById('percentage').innerHTML =   _percentage_html;
          }
                        


                        


              
                        
        


                        function update_center_latLngZoom(){

         

                          var center_latLng = map.getCenter();   // local variable
                          _center_lat = center_latLng.lat();     // global variable 
                          _center_long = center_latLng.lng();    // global variable 
                          _center_zoom = parseInt(map.getZoom());          // global variable 

                          console.log(' -------- update  -------- center  -------- lat  -------- Lng  -------- Zoom  -------- ', _center_lat, _center_long, _center_zoom)
                          
                          // google bug, sometime, google give long =242, but it really is long=-117
                          if (valid_lat_lng(_center_lat, _center_long)){

                             // nothing to do
                          } else {

                            _center_long =  validate_long(_center_long)


                          }



                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("center_lat", _center_lat);
                            searchParams.set("center_long", _center_long);
                            searchParams.set("center_zoom", _center_zoom);
                            searchParams.set("panto", 0);

                            // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                            //window.location.search = searchParams.toString();

                            // instead avoid reload
                            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                            history.pushState(null, '', newRelativePathQuery);
                            
                            }// if




                            $('#zoom_level_id').text(_center_zoom)

                        }



                            




      

              // only for result panel , 
              function show_json_viewer(__json___,  ___name__ , __highlight_keywords____ ){

                var _restructured_json
                          /*
                              only for arcgis - rest api - feature table only ------------
                                      features: Array(10)
                                                    0:
                                                    attributes:
                                                                FeedSubtype: "OHF"
                                                                GIS_FeatureKey: "25381_P1"
                                                                GIS_ID: 25381
                                                                HeadCount: 1
                                                                OBJECTID: 11
                                   json.features: [ {attributes: {…}},  {attributes: {…}}, {attributes: {…}}] 
                          */

                          // remove 'attributes' from array, to make it flat one level
                          if (__json___.features){
                               // only for ?query=
                                _restructured_json = restructure_json(__json___.features)
                          }
                          if (__json___.results){
                               // only for ?find= 
                               _restructured_json = restructure_json(__json___.results)
                              }
                      // raw json is array of properties  :  [ {OBJECTID	:	1 , GIS_ID	:	44832 },  {OBJECTID	:	2 , GIS_ID	:	44832}, {OBJECTID	:	3 , GIS_ID	:	44832}]  
                    
                      _current_count_of_feature =    _restructured_json.length
                      display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)

                      console.log(' ! * ! _restructured_json ', _restructured_json )
              
                      var multiple_layer_properties_html = ''
                      var ___properties
                                  
                      for (let _index = 0; _index < _restructured_json.length; _index++) {

                          ___properties = _restructured_json[_index]
                          multiple_layer_properties_html += '</br>'              

                          // build html only
                          if (_index == 0){
                            multiple_layer_properties_html += '<fieldset>' 
                            multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' +'</legend>'
                            multiple_layer_properties_html +=     '<div class="flex-row selected_highlighted_style attribute_field_set_style"   id="attribute_field_set_0"   >'  // if 0, means need start a new info window
                            multiple_layer_properties_html +=           json_flex_tip_viewer(___properties)
                            multiple_layer_properties_html +=     '<div>'
                            multiple_layer_properties_html += '</fieldset>'
                          } else {

                          multiple_layer_properties_html += '<fieldset>'
                          multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' +'</legend>'
                          multiple_layer_properties_html +=     '<div class="flex-row attribute_field_set_style"   id="attribute_field_set_' + _index +  '"   >' // not 0, means need append to existing info window
                          multiple_layer_properties_html +=         json_flex_tip_viewer(___properties)
                          multiple_layer_properties_html +=     '<div>'
                          multiple_layer_properties_html += '</fieldset>'

                          }//if
                          //  . .  end    . .  build html only

                      }//for
                      
                      $('#info-window-div').html(multiple_layer_properties_html)

                      // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                      for (let _index = 0; _index < _restructured_json.length; _index++) {

                        console.log('add event to element id :  attribute_field_set_', _index)



                        $("#attribute_field_set_" + _index ).on('mouseover', function(){

                          if (click_or_hover == 'hover'){

                                    var element_id = $(this).attr('id');
                                    var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                    console.log("you hover  index  :   ",  _select_highlight_index)

                                    $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                    $(this).addClass('selected_highlighted_style')

                                    // highlight and zoom to user clicked feature ( geojson object array index is _select_highlight_index)
                                    zoom_to_feature(_global_var_featureObject_indexAsKey[_select_highlight_index], _select_highlight_index) // (_mouse_over_feature, __serial_no, __lock_map )

                         }// if hover

                         });




                        $("#attribute_field_set_" + _index ).on('click', function(){

                          if (click_or_hover == 'click'){

                                    var element_id = $(this).attr('id');
                                    var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                    console.log("you click  index  :   ",  _select_highlight_index)

                                    $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                    $(this).addClass('selected_highlighted_style')

                                    // highlight and zoom to user clicked feature ( geojson object array index is _select_highlight_index)
                                    zoom_to_feature(_global_var_featureObject_indexAsKey[_select_highlight_index], _select_highlight_index) // (_mouse_over_feature, __serial_no, __lock_map )

                          }// if click

                         });





                      }//for


                      /**/
                      // -- -- -- Warning: Only for search  -- -- --
                      /**/ 
                            highlight_keywords_markjs(__highlight_keywords____); // _multi_keyWords_
                      /**/
                      //  . . . end  . . . -- -- -- Warning: Only for search  -- -- --
                      /**/

              } // function 
              
              
                    
              function restructure_json(____raw_____json){
                /*
                            only for arcgis - rest api - feature table only ------------
                                    features: Array(10)
                                                  0:
                                                  attributes:
                                                  FeedSubtype: "OHF"
                                                  GIS_FeatureKey: "25381_P1"
                                                  GIS_ID: 25381
                                                  HeadCount: 1
                                                  OBJECTID: 11

                                json.features: [ {attributes: {…}},  {attributes: {…}}, {attributes: {…}}]     
                                
                                
                            

                        */

                        // remove 'attributes' from array, to make it flat one level


                          // before  :     [ {attributes: {…}},  {attributes: {…}}, {attributes: {…}}]    
                          // after   :     [ {…},                {…},                {…},]    

                  var ____restructured_____json = []
                  var _properties_alias
                  for (var r = 0; r < ____raw_____json.length; r++) {
                    
                    _properties_alias = addAliasToFieldName(____raw_____json[r].attributes, field_alias)
                    ____restructured_____json.push(_properties_alias)
                    //____restructured_____json.push(____raw_____json[r].attributes)

                  }





              return ____restructured_____json
              }






                          /**/
                              // -------------- Street View Coverage Layer  --------------
                              /**/

                              var street_view_coverage_layer
                              var biking_layer
                              var live_traffic_layer

                              var street_view_coverage_layer_on_or_off = 'off' // on
                              var live_traffic_layer_on_or_off = 'off'
                              var biking_layer_on_or_off = 'off'

                              var pegman_follow_you_or_not = 'follow' // 'not_follow'


                              function init_streetViewCoverageLayer(){

                                          // Street View Coverage Layer https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewCoverageLayer
                                          // code sample https://stackoverflow.com/questions/11783782/display-valid-google-streetview-areas-as-a-layer-on-a-map-using-javascript-api-v

                                          street_view_coverage_layer = new google.maps.StreetViewCoverageLayer();

                                          // first time 1 time
                                          if (street_view_coverage_layer_on_or_off == 'on'){
                                            street_view_coverage_layer.setMap(map);
                                          } else {
                                            street_view_coverage_layer.setMap(null);
                                          }
                                          $('#show_street_view_coverage_layer').on('click', function(){
                                              street_view_coverage_layer_on_or_off = 'on';
                                              street_view_coverage_layer.setMap(map);
                                          })
                                          $('#hide_street_view_coverage_layer').on('click', function(){
                                            street_view_coverage_layer_on_or_off = 'off';
                                            street_view_coverage_layer.setMap(null);
                                          })






                                          biking_layer = new google.maps.BicyclingLayer();

                                          // first time 1 time
                                          if (biking_layer_on_or_off == 'on'){
                                            biking_layer.setMap(map);
                                          } else {
                                            biking_layer.setMap(null);
                                          }
                                          $('#show_biking_layer').on('click', function(){
                                              biking_layer_on_or_off = 'on';
                                              biking_layer.setMap(map);
                                          })
                                          $('#hide_biking_layer').on('click', function(){
                                            biking_layer_on_or_off = 'off';
                                            biking_layer.setMap(null);
                                          })





                                          live_traffic_layer = new google.maps.TrafficLayer();

                                          // first time 1 time
                                          if (live_traffic_layer_on_or_off == 'on'){
                                            live_traffic_layer.setMap(map);
                                          } else {
                                            live_traffic_layer.setMap(null);
                                          }
                                          $('#show_live_traffic_layer').on('click', function(){
                                              live_traffic_layer_on_or_off = 'on';
                                              live_traffic_layer.setMap(map);
                                          })
                                          $('#hide_live_traffic_layer').on('click', function(){
                                            live_traffic_layer_on_or_off = 'off';
                                            live_traffic_layer.setMap(null);
                                          })







                                    // first time set radio
                                    $("input[type=radio][name=pegman_follow_or_not_radio][value=" + pegman_follow_you_or_not + "]").prop('checked', true);
                                    // radio change event
                                    $("input[type='radio'][name='pegman_follow_or_not_radio']").on('change', function(){
                                      pegman_follow_you_or_not = $("input[type='radio'][name='pegman_follow_or_not_radio']:checked").val();
                                      console.log(" pegman_follow_you_or_not : --  ", pegman_follow_you_or_not);
                                      update_url_parameter('pegmanfollow', pegman_follow_you_or_not);
                                    });


                              }

                          /**/
                          //  -------------- end  -------------- Street View Coverage Layer --------------
                          /**/



                      




              

                            /**/
                            // .............. street view is always on .............. 

                            var _street_view_service  // free to create object
                            var panorama              // billed to create object


                           function turn_on_street_view(_pegman_lat, _pegman_lng, _pegman_radius) {





                                                /*
                                                        Only Street View panoramas generated with the StreetViewPanorama object are billed. 
                                                              The built-in Street View experience based on the Street View Pegman control, and the StreetViewService, are not billed
                                              
                                                        If user ever click  'Street View Toggle' button once,  All the browser session will use this same new created (charged $0.014/per new object ) panorama object.
                                                                            No matter how many times user turn off street view window by click 'Street View Toggle' button, 
                                                                            We never destroy this (charged $0.014/per new object ) panorama object, to SAVE money.

                                                                            When user turn on again, we re-use this (charged $0.014/per new object ) panorama object.
                                                                            We use   'panorama.setVisible(true)' to reuse panorama object and place yellow pegman in Map from street view control . 
                                                        We use   'panorama.setVisible(false)' to place yellow pegman back to street view control from Map. 
                                                */           
                                                //check street view availability,      programmatically determine the availability of Street View data, or return information about particular panoramas, without requiring direct manipulation of a map/panorama. You may do so using the StreetViewService object
                                                console.log('pegman radius: 1km from map view center, 100m for click', _center_lat, _center_long)

                                                if (_street_view_service) {
                                                          // use existing object
                                                } else {
                                                  // create new
                                                 _street_view_service = new google.maps.StreetViewService()
                                                }


                                                //Directly Accessing Street View Data based on current map center location, radius 1km  https://developers.google.com/maps/documentation/javascript/examples/streetview-service
                                                _street_view_service.getPanorama({
                                                                                    location: { lat: _pegman_lat, lng: _pegman_lng },  // https://developers.google.com/maps/documentation/javascript/streetview

                                                                                    //preference: google.maps.StreetViewPreference.BEST,  //do not use 'best', it far away from map center  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewPreference
                                                                                    preference: google.maps.StreetViewPreference.NEAREST,

                                                                                    //radius: 10,  //for test only, generate ' street view not found' alert
                                                                                    radius: _pegman_radius,   //  1000 for center,  100 for click unit in meter, "preference" use "NEAREST", "radius" must use 1km or less,  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewLocationRequest

                                                                                  }).then(found_and_process_street_view_data_handler)
                                                                                    .catch(_streetview_not_available_handler)
                                                                                    .finally();
                                  } // function

                                  

                           


                            function _streetview_not_available_handler(){
                              console.log('Street view is not available near center 1km radius, move around and try again')
                            }

                            function found_and_process_street_view_data_handler(___StreetViewPanoramaData) {
                                                      console.log(' found  ___StreetViewPanoramaData', ___StreetViewPanoramaData)
                                                      //$("#street_view_toggle").attr("class", "street-view-button-turn-on-mode");
                                                      
                                                      var _pegman_location = ___StreetViewPanoramaData.data.location;
                                                      create_street_view_panorama_object(_pegman_location.pano)
                            }



                            function create_street_view_panorama_object(___location__pano){

                                  if (panorama) {
                                                    console.log(' panorama already exist,  do not create new object, just update old object ')
                                                    update_street_view(___location__pano)
                                  } else { 
                                                console.log('...  create new panorama ...  ')
                                                panorama = new google.maps.StreetViewPanorama(document.getElementById('street_view'));
                                                panorama.setPano(___location__pano);
                                                panorama.setPov({
                                                                  heading: 270,
                                                                  pitch: 0,
                                                                });
                                                
                                                // must set visible to true, otherwise, if last time, no street view available, will set visible to false. 
                                                panorama.setVisible(true);

                                                //Binds this new StreetViewPanorama to the map. This new panorama overrides the existing default StreetViewPanorama, allowing the map to bind to an external panorama outside of the map.
                                                map.setStreetView(panorama); 


                                                                                                         

                                  }// if 
                            }


                            function update_pegman2geojson(one_geojson_feature){

                              console.log('update pegman 2 geojson ::::: event :::::', one_geojson_feature)

                              /*
                              one geojson feature sample:

                                {
                                    type: 'Feature', 
                                    geometry: {
                                                  type:"Point"
                                                  coordinates: [-111.979231, 40.682038]
                                    }
                                    properties: {…}
                                  }
                              */
                              // centerOfMass, centroid, cener  see https://turfjs.org/docs/#center    
                              var pegman_turfCenter = turf.center(one_geojson_feature);
                              console.log(' update pegman 2 geojson turf center ', pegman_turfCenter)

                              var pegman_center_lat  = pegman_turfCenter.geometry.coordinates[1]
                              var pegman_center_long = pegman_turfCenter.geometry.coordinates[0]
                              console.log('pegman center lat ...', pegman_center_lat )
                              console.log('pegman center long ...', pegman_center_long )
                                        

                               //Directly Accessing Street View Data based on current map center location, radius 1km  https://developers.google.com/maps/documentation/javascript/examples/streetview-service
                               _street_view_service.getPanorama({

                                      location: { lat: pegman_center_lat, lng: pegman_center_long },  // https://developers.google.com/maps/documentation/javascript/streetview

                                      //preference: google.maps.StreetViewPreference.BEST,  //do not use 'best', it far away from map center  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewPreference
                                      preference: google.maps.StreetViewPreference.NEAREST,

                                      //radius: 10,  //for test only, generate ' street view not found' alert
                                      radius: 1000,   // unit in meter, "preference" use "NEAREST", "radius" must use 1km or less,  https://developers.google.com/maps/documentation/javascript/reference/street-view-service#StreetViewLocationRequest

                              }).then(found_and_process_street_view_data_handler)
                                .catch(_streetview_not_available_handler)
                                .finally();

                            }

                           

                            function update_street_view(___location__pano) {
                                          
                                                    // street view window is open
                                                      console.log('... update street view window by nearest available ___location__pano ...  with existing panorama ( with pano id)  ') 
                                                      
                                                      panorama.setPano(___location__pano);
                                                      panorama.setPov({
                                                        heading: 270,
                                                        pitch: 0,
                                                      });
                                                      // must set visible to true, otherwise, if last time, no street view available, will set visible to false. 
                                                      panorama.setVisible(true);
                                          
                            }



                            

                  // .............. end   ..............  street view is always on  ..............  
                  /**/