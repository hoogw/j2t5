


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




 var _map_type = 'hybrid' // default    roadmap, satellite, terrain

 var _panto = 1 // default is 1, without _panto means 1,    0 means, not pan to real location
 var need_pan_to_real_location = true



 // -2 means current showing not available,  -1 means total count not available
 var _current_rendering_feature = -2 
 var _current_area_count_of_feature = -2
 var _total_count_of_feature = -1;

 



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
//  --- yelp POI on google      --- 
/**/
  
              function show_info_outline_Tab(event){
                
                event.feature.toGeoJson(function(_geojson_hovered){ 
                  console.log('hovered geojson ', _geojson_hovered)
                  var ___properties = _geojson_hovered.properties

                  if (___properties.poi_id){

                    $('#info-window-div').html(poi_viewer(___properties))

                  } else {

                    $('#info-window-div').html(json_flex_tip_viewer(___properties))

                  }
                });



                /**/
                //  --- side by side   --- 
                /**/
                        
                // for embed at top, right and or left side info window, always scroll to top
                $("#info_outline").show()
                $('#flex_1').scrollTop(0); // build in scroll to top popup info window


                /**/
                //   --- end  ---   --- side by side   --- 
                /**/
                
              }


              function empty_info_outline_Tab(){

                

                /**/
                //  --- side by side   --- 
                /**/
                        
                $('#info_outline').hide();


                /**/
                //   --- end  ---   --- side by side   --- 
                /**/
                              
                
                $('#info-window-div').html("")
              }


/**/
//  --- end  ---  yelp POI on google    --- 
/**/




                             
                        function display_count_info(_subject, ___showing_cnt, ___all_cnt, ____rendering_cnt){


                          $('#layer-info-vertical').html('<a  target="_blank" href="' + _url +  '/' + _layer_id +'">' + _subject + '</a>')

                          console.log(' update statistic info', ___showing_cnt, ___all_cnt)

                          if (isNaN(___showing_cnt)){ ___showing_cnt = '...' } // not available...
                          if (isNaN(___all_cnt)){ ___all_cnt = '...' } // not available...
                          
                          $('#feature-on-map').html(___showing_cnt)
                          $('#total-feature').html(___all_cnt)
                             
                        }
                        





                        function valid_lat_lng(_lat, _lng){


                          if ((_lat<= 90 ) && (_lat >= -90) && (_lng <= 180) && (_lng >= -180)){


                            return true

                          } else {

                          return false
                          }

                        }


              
                        function validate_long(_invalid_long){

                                  var _valid_long

                                  if (_invalid_long > 180) {
                                    _valid_long = -180 + (_invalid_long - 180)

                                  } 

                                  if (_invalid_long < -180) {
                                    _valid_long = 180 - (_invalid_long + 180)

                                  } 


                                  console.log(' ! ! !  warning ! ! !  invalid long found ! ! !  ! ! !  invalid ----> valid  ! ! !  ! ! !  ',  _invalid_long, _valid_long)

                                  return _valid_long

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






                                                      
                          /**/
                          //  --- yelp POI on google      --- 
                          /**/

                           var _latlngzoom_html = ''
                           //_latlngzoom_html +='visible area : '
                           _latlngzoom_html += 'center (lat: ' + _center_lat.toFixed(3)
                           _latlngzoom_html += '   lng: ' + _center_long.toFixed(3) + ')'
                           _latlngzoom_html += '   zoom: ' + _center_zoom
                           _latlngzoom_html += '&nbsp;&nbsp;'
                           _latlngzoom_html += '   radius: ' + get_center_radius_in_map_bound() + ' meter'
                           $("#lat-lng-zoom").html(_latlngzoom_html)

                          /**/
                          //  --- end  ---  yelp POI on google    --- 
                          /**/

                        }



                            



                        /**/

                        // ................ google geolocation api  ................    ................

                            // https://developers.google.com/maps/documentation/javascript/examples/map-geolocation#maps_map_geolocation-javascript
                            // https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript

                            var infoPopUpWindow_geolocation;


                            // must after map object created
                            function geolocation(){

                               
                                infoPopUpWindow_geolocation = new google.maps.InfoWindow();

                                var locationButton = document.getElementById("panToCurrent_geolocation_button");

                                locationButton.addEventListener("click", () => {
                                    // Try HTML5 geolocation.
                                    if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                        const pos = {
                                            lat: position.coords.latitude,
                                            lng: position.coords.longitude,
                                        };

                                        infoPopUpWindow_geolocation.setPosition(pos);
                                        infoPopUpWindow_geolocation.setContent("Your current location is here");
                                        infoPopUpWindow_geolocation.open(map);
                                        map.setCenter(pos);
                                        },
                                        () => {
                                        handleLocationError(true, infoPopUpWindow_geolocation, map.getCenter());
                                        }
                                    );
                                    } else {
                                    // Browser doesn't support Geolocation
                                    handleLocationError(false, infoPopUpWindow_geolocation, map.getCenter());
                                    }
                                });

                            }
                            

                            function handleLocationError(browserHasGeolocation, infoWindow, pos) {

                                        infoWindow.setPosition(pos);

                                        infoWindow.setContent(

                                            browserHasGeolocation
                                            ? "Error: The Geolocation service failed."
                                            : "Error: Your browser doesn't support geolocation."
                                        );

                                        infoWindow.open(map);

                            }

                                        
                                // reverse pan-to-your-current-location
                                function zoom_to_layer() {

                                  

                                  var zoomToLayerButton = document.getElementById("zoomToLayer_button");

                                  zoomToLayerButton.addEventListener("click", () => {

                                    pan_to_real_location();  

                                  });


                                }


// ................ end   ................  google geolocation api  ................    ................

/**/
                                






  /**/


            //  -------------------  esri  ------------------- pan to real location  ------------------- 


                  /**/

                          // only for esri,    socrata does not use this 
                         async function pan_to_real_location(){


                                             

                                                      var _use_sample_feature_result = await use_sample_feature()
                                                      console.log(' _use_sample_feature_result ', _use_sample_feature_result)

                                                      if (_use_sample_feature_result) {
                                                              
                                                              console.log('successfully use sample feature to improve best viewing, zoom-in to single feature level  - -> - - > : ', _center_lat, _center_long, _center_zoom )

                                                      } else {

                                                              console.log('layer maybe have image only, no feature, get 0 sample.  ::::::  ', _center_lat, _center_long, _center_zoom )



                                                              //  use extent ,  fast, only need 2 very quick ajax call, 1 for layer_json, 2 for mapserver_json 
                                                              // after 2 quick ajax call, in the projection process, most of time, use projection method, 'default' or 'esri_proj', no ajax call, no await.  Only 'read_from_string'+proj4  need await, ajax call.
                                                              // how ever, extent may not have best result, because it is too far away, we use sample feature to improve zoom in to single feature level.
                                                              await use_extent()
                                                      }

                                           

                          } // pan to real location






                          async function use_sample_feature(){


                            


                            //=============== in use :  &where=1=1 ===========================
    
    
    
                                                      /*
    
                                                          improvement: 
                                                      
                                                          https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
    
                                                          sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                                          example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0
    
    
                                                          if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10
    
    
                                                          since we not sure, we can only try both, if 100 not work, then get default 2000 
    
                                                      */     
    
    
    
    
                            var _url_sample_json = _url + '/'+  _layer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1';
    
                            if (_supportsPagination){
    
                            
                                    _url_sample_json = _url + '/'+  _layer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1&resultOffset=0&resultRecordCount=' + _sample_count;
    
                            }
    
                  
                            



                          var _sample_json = {};
    
    
                          console.log('url sample json url  supportsPagination : ',_supportsPagination,  _url_sample_json)
                                                    
    
    
                          /*
                              no need, because of variable hoisting/ function hoisting, response_string inside each try/catch block will available through this whole function, 
                              https://stackoverflow.com/questions/10441717/javascript-scope-in-a-try-block
                              var response_string
                          */
    
                          try {
    
    
                                // test only
                                // throw ' ++++++++ test only ++++++++ jsonp failed';
    
    
                                // jsonp 
    
    
                                var response_string =  await $.ajax({
    
                                    // large data take long long time , so should not time out, let it run until get it
                                    //timeout: _timeout,
    
                                      type: 'GET',
                                      dataType: 'jsonp',
                                      data: {},
                                      url: _url_sample_json,
                                      error: function (jqXHR, textStatus, errorThrown) {
                                        
                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                              console.log('ajax error  + ', _error_status);
                                                            
    
    
                                      },
                                      success: function (data) {
    
                                        console.log('pan to real location , use sample feature --> jsonp --> success  --> ');
                                          
                                       
                                      }
                                    });  // await
    
    
    
                             
                            } catch(jsonp_failed) {
    
    
                                  console.log('pan to real location , use sample feature,  --> jsonp failed !!!!!!', jsonp_failed);
    
                                 try {
    
                                               
    
    
    
                                                // test only
                                                // throw ' ++++++++ test only ++++++++ cors failed'; 
                                
                                                // cors
                                                var response_string =  await $.ajax({
    
                                                                                      // large data take long long time , so should not time out, let it run until get it
                                                                                    // timeout: _timeout,
    
    
                                                                                        type: 'GET',
                                                                                        
                                                                                        url: _url_sample_json,
                                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                                          
                                                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                console.log('ajax error  + ', _error_status);
                                                                                                            
                                                                
                                                                
                                                                                        },
                                                                                        success: function (data) {
    
                                                                                          console.log('pan to real location , use sample feature --> cors --> success  --> ');
                                         
                                                                                        }
                                                                                      });  // await
    
    
    
    
                                                
                                  
                                  } catch(cors_failed) {
    
                                                console.log('pan to real location , use sample feature,  --> cors failed !!!!!!', cors_failed);
    
                                                try {
    
                                                          
    
                                                          // proxy
                                                          // --------- add proxy  ---------
                                                          var _url_sample_json_proxy = proxyurl +  _url_sample_json
    
                                                          var response_string =  await $.ajax({
    
                                                                                                    // large data take long long time , so should not time out, let it run until get it
                                                                                                    // timeout: _timeout,
    
    
                                                                                                    type: 'GET',
                                                                                                    
                                                                                                    url: _url_sample_json_proxy,
                                                                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                                                                      
                                                                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                            console.log('ajax error  + ', _error_status);
                                                                                                                        
                                                                            
                                                                            
                                                                                                    },
                                                                                                    success: function (data) {
                                                                                                      console.log('pan to real location , use sample feature --> proxy --> success  --> ');
                                         
                                                                                                    }
                                                          });  // await
    
    
    
    
                                                        
    
    
    
                                                } catch(proxy_failed) {
    
    
                                                  console.log('pan to real location , use sample feature,  --> proxy failed !!!!!!', proxy_failed);
    
    
    
                                                } // catch proxy
                                          
    
                                  } // catch cors
    
    
                            } // catch jsonp
    
    
    
    
                            // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                            if (typeof response_string === 'object') {
                                // is object
                                _sample_json = response_string
                            } else {
                                // is string
                                _sample_json = JSON.parse(response_string)
                            }
    
                            
    
    
                                
                            console.log(' >>>>>>>>  sample json  feature array [] >>>>>>  ', _sample_json.features);
    
                           
    
                            if (
                              (typeof (_sample_json.features)  == 'undefined' )
                              || (typeof (_sample_json.error) !== 'undefined' )
                              || (_sample_json.features.length == 0) // sample feature is empty array [],
                            ){
    
                                  /*
                                      raster layer do not have sample feature, will return error like this: 
    
                                        {  error: {code: 400, message: "Invalid or missing input parameters.", details: []} }
                                  
                                        features[] array is 'undefined'
                                        //return false;
                                  */
    
                                  get_map_bound()
    
                         } else {
    
                                   var _sample_arcgis_feature_Set = _sample_json
    
    
                                   
    
    
    
    
                                  
                                    // parse an ArcGIS feature set (Geometry) to GeoJSON
                                                    
                                    // Terraformer does not support Feature Set, only support single arcgis geometry.
                                    //_geojson_object = Terraformer.ArcGIS.parse(arcgis_feature_Set.features[0])
                                    var _sample_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(_sample_arcgis_feature_Set)
    
    
    
    
    
    
    
                                    //  "type": "FeatureCollection"
    
                                    var _sample_coordinates;
    
                                    // array of features for test
                                    var _sample_feature =[]; 
    
    
                                    if (_sample_geojson_object.type.toLowerCase() ===  "featurecollection") 
                                    {
                                      _sample_feature = _sample_geojson_object.features
    
                                    } else if (_sample_geojson_object.type.toLowerCase() ===  "feature") {
    
                                      // only 1 element 
                                      _sample_feature.push(_sample_geojson_object)
                                    }
    
    
    
                                    console.log ('sample feature array[] ', _sample_feature )
    
    
    
    
    
    
                                    if (_sample_feature.length > 0 ) {
    
    
                                            // layer have feature, just get a few sample feature as real location
    
    
                                            /**/
    
                                                    // arcgis &where=1=1 by default have 1k or 2k record
                                                    for (var s = 0; s < _sample_feature.length; s++) {
                              
                                                            // if anything wrong, try next sample feature
                                                            try {
    
    
    
                                                                        /**/
                                                                        //  .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                                                        /**/
    
                                                                        // - - fit bound - - 
                                                                        latlngList = []
    
                                                                        var _one_sample_feature = _sample_feature[s]
                                                                        var _one_sample_geometry
                                                                        console.log('pan to real location  >>>>> loop through sample feature >> this is a single one', s, _one_sample_feature);
    
                                                                        if (_one_sample_feature.geometry.type.toLowerCase() ===  "geometrycollection"){
                                                                          _one_sample_geometry = _one_sample_feature.geometry.geometries[0]
                                                                        } else  {
                                                                          _one_sample_geometry =_one_sample_feature.geometry
                                                                        }
                        
    
                                                                        /*
                                                                                 _one_sample_geometry  sample:
                                                                                      {
                                                                                        type:"Point"
                                                                                        coordinates: [-111.979231, 40.682038]
                                                                                      }
                                                                        */
                                                                                  // centerOfMass, centroid, cener  see https://turfjs.org/docs/#center    
                                                                                  var turf_center = turf.center(_one_sample_geometry);
                                                                                  console.log(' turf center ', turf_center)
    
                                                                                  _center_lat  = turf_center.geometry.coordinates[1]
                                                                                  _center_long = turf_center.geometry.coordinates[0]
                                                                                  console.log('controled zoom to real location . . . .  _center_lat ...', _center_lat )
                                                                                  console.log('controled zoom to real location . . . .  _center_long ...', _center_long )
                                                                              
    
                                                                       
                                                                                  
                                                                                  // warning: _one_sample_geometry is "geometry" object, not 'feature' object, see above the_geom sample
                                                                                  var _the_geom_type = _one_sample_geometry.type
                                                                                  _the_geom_type = _the_geom_type.toLowerCase()
    
                                                                                  console.log('pan to real location() >>>> _the_geom_type >>>', _the_geom_type)
    
    
                                                                                  
                                                                                        
    
    
    
                                                                                  if (_the_geom_type == 'point'){
                                                                                      latlngList.push(new google.maps.LatLng(_center_lat, _center_long));
                                                                                      console.log(' fit bound point lat lng List', latlngList)
                                                                                  }//if type = point
            
                                                                                  if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multipoint')){
                                                                                                  // add all point into list for later fit bound
                                                                                                  var line_coordinate = _one_sample_geometry.coordinates
                                                                                                  for (let c = 0; c < line_coordinate.length; c++) {
                                                                                                    latlngList.push(new google.maps.LatLng(line_coordinate[c][1], line_coordinate[c][0]));    // geojson coordinate pair is (long, lat)
                                                                                                  }
                                                                                                  console.log(' fit bound line lat lng List', latlngList)
                                                                                  }//if type = line 
            
                                                                                  if ((_the_geom_type == 'polygon') || (_the_geom_type == 'multilinestring')){
                                                                                          // add all point into list for later fit bound
                                                                                          var polygon_coordinate_level3 = _one_sample_geometry.coordinates
                                                                                          for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                                                  var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                                                  for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                                                            latlngList.push(new google.maps.LatLng(polygon_coordinate_level2[p2][1], polygon_coordinate_level2[p2][0]));    // geojson coordinate pair is (long, lat)
                                                                                                  }//for p2
                                                                                          }//for p3
                                                                                          console.log(' fit bound polygon lat lng List', latlngList)
                                                                                  }// type = Polygon  
            
                                                                                  if (_the_geom_type == 'multipolygon'){
                                                                                                  // add all point into list for later fit bound
                                                                                                  var polygon_coordinate_level4 = _one_sample_geometry.coordinates
                                                                                                  for (let p4 = 0; p4 < polygon_coordinate_level4.length; p4++) {
                                                                                                        var polygon_coordinate_level3 = polygon_coordinate_level4[p4]
                                                                                                        for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                                                                var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                                                                for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                                                                          latlngList.push(new google.maps.LatLng(polygon_coordinate_level2[p2][1], polygon_coordinate_level2[p2][0]));    // geojson coordinate pair is (long, lat)
                                                                                                                }//for p2
                                                                                                        }//for p3
                                                                                                  }//for p4
                                                                                                  console.log(' fit bound multipolygon lat lng List', latlngList)
                                                                                  }// type = multipolygon   
    
    
    
    
                                                                                                                    
                                                                        /**/
                                                                        //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                                        /**/
    
    
    
                                                                  
    
                                                                        /**/
                                                                        //  .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                                                        /**/
                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
    
                                                                                console.log('pan-to-real-location auto  ## fit bound ## : all point lat lng list', _center_lat, _center_long, latlngList )
    
                                                                                var bounds = new google.maps.LatLngBounds();
                                                                                latlngList.forEach(function(n){
                                                                                  bounds.extend(n);
                                                                                });
                                                                                map.fitBounds(bounds, 20); // padding 20 pixel, https://developers.google.com/maps/documentation/javascript/reference/map#Map-Methods
                                                                                              // avoid 21 too close, set max zoom level no more than
                                                                                if (map.getZoom() > zoom2feature_noMoreThan){
                                                                                  map.setZoom(zoom2feature_noMoreThan); 
                                                                                }
                                                                                
    
                                                                          } else {
    
                                                                            console.log('pan-to-real-location calculated - lat - long - : ', _center_lat, _center_long )
                                                                                            
                                                                            var latLng = new google.maps.LatLng(_center_lat, _center_long);
                                                                            map.panTo(latLng);
                                                                            map.setZoom(zoom2feature_zoomLevel); 
    
                                                                          }
    
    
                                                                          //!!! esri only !!!  ... - .. - ..,  pan to real location, sample json have many feature in for loop, I only use first success feature, once find first success feature, then return true
                                                                get_map_bound()
                                                                          return true; 
    
                                                                          /**/
                                                                          //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                                                          /**/
                                                                                                                
                        
                        
                        
                                                            } catch(error_get_sample_feature){
                        
                                                                      console.log ('  if anything wrong, try next sample feature ', error_get_sample_feature )
                        
                        
                                                                              //"jumps over" one iteration in the for loop
                                                                              continue;
                        
                                                            } // try              
                        
                                                                          
                                                    }// for
    
                                                          
    
                      
                                      } else {
    
                                               
                             
                                                   // sample feature failed  
                                                   console.log( ' sample feature failed  ')
                                                   return false
    
                                      } // if
    
                              
                                    } // if error       
    
                            }
    
    







                        async function use_extent(){



                          /**/

                          var _url_layer_extent = _url + '/'+  _layer_id + '?f=pjson';
                          var _url_server_extent = _url  + '/'   +  '?f=pjson';             // could be 'map server' or 'image server'


                          
                        

                          console.log( '_url_layer_extent , ', _url_layer_extent)
                          console.log( '_url_server_extent, ', _url_server_extent)



                          

                          var _layer_extent_json
                          var _server_extent_json  // could be 'map server' or 'image server'





                          //  layer extent
                          try {
                            


                            // test only
                            // throw ' ++++++++ test only ++++++++ jsonp failed';

                            // jsonp 


                             var response_string =  await $.ajax({

                                                          
                                                              type: 'GET',
                                                              dataType: 'jsonp',
                                                              data: {},

                                                              url:_url_layer_extent,



                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                
                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                      console.log('ajax error  + ', _error_status);
                                                                                    


                                                              },
                                                              success: function (data) {

                                                                console.log('use extent,  layer json  --> jsonp success ');
                                                                  
                                                                 
                                                              }
                                                            });  // await

                              } catch(jsonp_failed) {


                                    console.log('use extent,  layer json --> jsonp failed !!!!!!', jsonp_failed);

                                    try {
                                      // cors

                                      // test only
                                      // throw ' ++++++++ test only ++++++++ cors failed'; 

                                      var response_string =  await $.ajax({

                                                                        

                                                                            type: 'GET',
                                                                            
                                                                            url:_url_layer_extent,

                                                                            error: function (jqXHR, textStatus, errorThrown) {
                                                                              
                                                                              var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                    console.log('ajax error  + ', _error_status);
                                                                                                  
                                                    
                                                    
                                                                            },
                                                                            success: function (data) {
                                                                              console.log('use extent,  layer json  -->  --> cors  --->   success  ');
                                                                                
                                                                               
                                                                            }
                                                                          });  // await

                                         
                                      } catch(cors_failed) {
                                                                          
                                    
                                                  console.log('use extent,  layer json  --> --> cors failed !!!!!!', cors_failed);


                                                  try {
                                                    // proxy

                                                    // --------- add proxy  ---------
                                                    var _url_layer_extent_proxy = proxyurl + _url_layer_extent


                                                    var response_string =  await $.ajax({
             

                                                                                            type: 'GET',
                                                                                            
                                                                                            url:  _url_layer_extent_proxy,

                                                                                            error: function (jqXHR, textStatus, errorThrown) {
                                                                                              
                                                                                              var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                    console.log('ajax error  + ', _error_status);
                                                                                                                  
                                                                    
                                                                    
                                                                                            },
                                                                                            success: function (data) {
                                                                                              console.log('use extent,  layer json  -->  --> proxy  --->   success  ');
                                                                                                
                                                                                               
                                                                                            }
                                                                                          });  // await


                                                   

                                                  } catch(proxy_failed) {

                                                    console.log('use extent,  layer json  --> --> proxy failed !!!!!!', proxy_failed);



                                                  } // catch proxy
                                      

                                    } // catch cors
      
      
                              } // catch jsonp



                              // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                              if (typeof response_string === 'object') {
                                  // is object
                                  _layer_extent_json = response_string
                              } else {
                                  // is string
                                  _layer_extent_json = JSON.parse(response_string)
                              }


                               





                          //  mapserver extent
                          try {
                             


                              // test only
                              // throw ' ++++++++ test only ++++++++ jsonp failed';

                              // jsonp 


                          var response_string =  await $.ajax({

                                                          
                                                              type: 'GET',
                                                              dataType: 'jsonp',
                                                              data: {},

                                                              url:_url_server_extent,



                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                
                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                      console.log('ajax error  + ', _error_status);
                                                                                    


                                                              },
                                                              success: function (data) {

                                                                console.log('use extent,  server json  --> --> jsonp success ');
                                                                  
                                                                  
                                                              }
                                                            });  // await

                              } catch(jsonp_failed) {


                                    console.log('use extent,  server json --> jsonp failed !!!!!!', jsonp_failed);

                                    try {
                                      
                                    
                                                  // test only
                                                  // throw ' ++++++++ test only ++++++++ cors failed'; 

                                                  // cors
                                                  var response_string =  await $.ajax({

                                                                                    

                                                                                        type: 'GET',
                                                                                        
                                                                                        url:_url_server_extent,

                                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                                          
                                                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                console.log('ajax error  + ', _error_status);
                                                                                                              
                                                                
                                                                
                                                                                        },
                                                                                        success: function (data) {

                                                                                          console.log('use extent,  server json  --> cors  --->    success  ');
                                                                                            
                                                                                        }
                                                                                      });  // await



                                                                                      
                                                
                                                   



                                        } catch(cors_failed) {


                                                console.log('use extent,  server json --> cors failed !!!!!!', cors_failed);

                                                try {
                                                  // proxy

                                                  // --------- add proxy  ---------
                                                  var _url_server_extent_proxy = proxyurl + _url_server_extent

                                                            var response_string =  await $.ajax({
                                                                                                        type: 'GET',
                                                                                                        
                                                                                                        url:  _url_server_extent_proxy,

                                                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                                                          
                                                                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                                console.log('ajax error  + ', _error_status);
                                                                                                                              
                                                                                                        },
                                                                                                        success: function (data) {
                                                                                                          console.log('use extent,  server json  --> proxy  --->    success  ');
                                                                                                            
                                                                                                          
                                                                                                        }
                                                            });  // await



                                                  
            
                                                           



                                                } catch(proxy_failed) {


                                                  console.log('use extent,  server json --> proxy failed !!!!!!', proxy_failed);

                                                } // catch proxy
                                      

                                      } // catch cors
                                        
                                        
                            } // catch jsonp





                                
                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                          if (typeof response_string === 'object') {
                              // is object
                              _server_extent_json = response_string
                          } else {
                              // is string
                              _server_extent_json = JSON.parse(response_string)
                          }



                          var _zoom_beforeLayerExtent
                          var _zoom_afterLayerExtent
                          var _zoom_afterServerExtent
                          
                          var _zoomto_status = false

                          var _layer_extent_object
                          var _server_extent_object  // could be 'map server' or 'image server'

                         // 'layer' json    only have  'extent'
                         // 'map server'   json  have  'initExtent'  'fullExtent'
                         // 'image server' json  have  'extent'      'initExtent'  'fullExtent'


                          // try layer extent first,  

                          if (_layer_extent_json.extent) {
                                                              _layer_extent_object = _layer_extent_json.extent
                          } else if (_layer_extent_json.initialExtent) {
                                                              _layer_extent_object = _layer_extent_json.initialExtent
                          } else if (_layer_extent_json.fullExtent) {  
                                                              _layer_extent_object = _layer_extent_json.fullExtent
                          } else {

                                  // ('image server' do not have layer) will end up here
                                  console.log( ' zoom to layer extent failed, layer json do not have  - extent - ')
                                  _zoomto_status = false
                          }


                          if (_layer_extent_object) {
                                                          _zoom_beforeLayerExtent = map.getZoom()
                                                          console.log( '_zoom_beforeLayerExtent ......... ', _zoom_beforeLayerExtent)
                                                                                                                      
                                                          // will map.fitBound(),  must use await because this function call ajax, need to wait until resolve promise. 
                                                          await zoom_to_esri_extent(_layer_extent_object)

                                                          _zoom_afterLayerExtent = map.getZoom()
                                                          console.log( '_zoom_afterLayerExtent ......... ', _zoom_afterLayerExtent)
                          }

                          






                          
                          if (! _zoomto_status){



                                          if (_server_extent_json.extent) {
                                                                              _server_extent_object = _server_extent_json.extent
                                          } else if (_server_extent_json.initialExtent) {
                                                                              _server_extent_object = _server_extent_json.initialExtent
                                          } else if (_server_extent_json.fullExtent) {  
                                                                              _server_extent_object = _server_extent_json.fullExtent
                                          } else {
                                                  console.log( ' zoom to Server extent failed, Server json do not have  - any extent - ')
                                                  _zoomto_status = false
                                          }




                                          if (_server_extent_object) {

                                                      //layer extent is whole world, zoom level will be 1, then try mapserver extent
                                                      await zoom_to_esri_extent(_server_extent_object)

                                                      _zoom_afterServerExtent = map.getZoom()
                                                      console.log( '_zoom_afterServerExtent ......... ', _zoom_afterServerExtent)
                                          }

                          }


                        
                         

                          
                          
                            





                        }








                          function panto_googlemaps(_panto_latitude, _panto_longitude, _panto_zoom){


                            var latLng = new google.maps.LatLng(_panto_latitude, _panto_longitude);
                            map.panTo(latLng);
                            map.setZoom(_panto_zoom); 

                          }



                          /*
                          
                              socrata does not need this 

                          */ 
                          async function zoom_to_esri_extent(bbox) {




                              /*

                                  if  "wkid": 102100, "latestWkid": 3857,  already have projection-string, directly convert.
                                  convert from  "wkid": 102100, "latestWkid": 3857 (x,y),   to  wgs_84(lat,lng)

                                  otherwise,  like "latestWkid": 2230, must read 2230's projection-string from  
                                  website 'https://spatialreference.org/ref/epsg/2230/proj4js/"
                                  This link read:     Proj4js.defs["EPSG:2230"] = "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";

                                  use projection-string feed into pro4j  


                                  another way is use ESRI's on the fly projection


                                  bbox is extent
                              
                                  "extent": {
                                                  "xmin": -2.0037507842788246E7,
                                                  "ymin": -3.024097145838615E7,
                                                  "xmax": 2.0037507842788246E7,
                                                  "ymax": 3.024097145838615E7,
                                                  "spatialReference": {



                                                  "wkid": 102100,                       // ESRI always available, can use https://gis.stackexchange.com/questions/278165/getting-lat-lng-from-wkid-latestwkid-and-x-y-coordinates
                                                                                        // https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project
                                                                                        // to get lat long on the fly


                                                  "latestWkid": 3857                    // EPSG sometime is missing, not be able to read projection-string from 'https://spatialreference.org/ref/epsg/2230/proj4js/"
                                              }
                              
                              
                              */

                                var projection_method = 'default'    // default ( 3857 x,y   ---->    4326 wgs84 lat lng )

                                var _________latestWkid
                                var _________wkid

                                // latestWkid exist, will use either default or  "read_proj_string".  
                                if (bbox.spatialReference.latestWkid) {

                                          // latestWkid,

                                                            _________latestWkid = bbox.spatialReference.latestWkid

                                                            if (_________latestWkid == 3857 ) { 
                                                                                                              projection_method = 'default' 
                                                            } else {

                                                                       // if esri.wkid exist, this will be over-write to esri_proj later,  read_proj_string is not reliable, so use esri_proj if both available
                                                                        projection_method = 'read_proj_string'    // from 'https://spatialreference.org/ref/epsg/2230/proj4js/"

                                                            } // 3857

                                } // latestWkid


                                          
                                // as long as esri wkid exist,  will either use default or esri_proj
                                if (bbox.spatialReference.wkid) {


                                                _________wkid = bbox.spatialReference.wkid


                                                if (_________wkid == 102100 ){ 
                                                          projection_method = 'default' 
                                                } else {

                                                          // this could over-write previous 'read_proj_string' , if latestWkid is not 3857
                                                          projection_method = 'esri_proj'   // get lat lng directly from  https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project
                                                }

                                } // wkid

                                    
                               












                                // test 3 way of projection, must comment out below code for production

                                
                                      // enforce use esri projection by uncomment this line.
                                                  //console.log(' ------------------- test  ------------------- enforce  ------------------- use  ------------------- esri_proj  -------------------  ')
                                                  // projection_method = 'esri_proj'    // works well



                                      // enforce use read_proj_string by uncomment below 2 lines.
                                                //console.log(' ------------------- test  ------------------- enforce  ------------------- use  ------------------- read_proj_string  -------------------  ')
                                                //projection_method = 'read_proj_string'    // works well
                                                











                                console.log('esri  extent to lat lng === bbox',  bbox )


                                

                                var _south_west_point_long_lat_array = [bbox.xmin,    bbox.ymin]
                                var _north_east_point_long_lat_array = [bbox.xmax,    bbox.ymax]

                                console.log(' esri extent   _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
                                console.log(' esri extent   _north_east_point_long_lat_array',  _north_east_point_long_lat_array )



                                switch (projection_method) {



                                                  case 'default':  
                                                                      // 3857 to 4326

                                                                      // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                                                                      _south_west_point_long_lat_array = proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [bbox.xmin,    bbox.ymin]);
                                                                      _north_east_point_long_lat_array = proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [bbox.xmax,    bbox.ymax]);


                                                                      // or use esri client side projection
                                                                      







                                                                      console.log(' ---> default ---> 3857 ---> 4326  ---> proj4    _south_west_point_long_lat_array ----> ', _south_west_point_long_lat_array )
                                                                      console.log('  ---> default ---> 3857 ---> 4326  ---> proj4   _north_east_point_long_lat_array ----> ', _north_east_point_long_lat_array )
                                                                      fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                                        

                                                                      break;




                                                  case 'read_proj_string':

                                                                          // non-(3857) always --- to --> 4326 , read proj string, feed in proj4


                                                                          // this server only work with jsonp, Does not work with cors
                                                                          // but jsonp will error as:  "Proj4js is not defined", because result string have "Proj4js.defs[....",  
                                                                          // I end up use proxy + cors 






          



                                                                          var _custom_projection_string_raw //  Proj4js.defs["EPSG:2230"] = "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";

                                                                          var _custom_projection_string     // +proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs;


                                                                          // --------- add proxy  ---------
                                                                          var _custom_projection_string_url = proxyurl +  'https://spatialreference.org/ref/epsg/' + _________latestWkid +'/proj4js/'

                                                                       
                                                                         


                                                                         

                                                                         

                                                                                _custom_projection_string_raw =  await $.ajax({
                                        
                                                                                                                // large data take long long time , so should not time out, let it run until get it
                                                                                                                //timeout: _timeout,
                                        
                                                                                                                  type: 'GET',
                                                                                                                  //dataType: 'jsonp',
                                                                                                                  //data: {},
                                        
                                                                                                                  url:_custom_projection_string_url,
                                        
                                        
                                        
                                                                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                                                                    
                                                                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                                          console.log('ajax error  + ', _error_status);
                                                                                                                                        
                                        
                                        
                                                                                                                  },
                                                                                                                  success: function (data) {
                                                                                                                    

                                                                                                                    
                                                                                                                  }
                                                                                                                 });  // await
                                                                                                                
                                    

                                                                         
                                                                         console.log('_custom_projection_string_raw  --> ', _custom_projection_string_raw );

                                                                                                                                  /*                           
                                                                                                                                
                                                                                                                                _custom_projection_string sample:  (must remove unused parts)

                                                                                                                                      Proj4js.defs["EPSG:2230"] = "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";



                                                                                                                                  */   

                                                                                                                                    
                                                                                                                                      // remove front part        Proj4js.defs["EPSG:2230"] = "
                                                                                                                                      _custom_projection_string = _custom_projection_string_raw.substring(_custom_projection_string_raw.indexOf('+proj='))

                                                                                                                                     // no need to remove last part       ";



                                                                         console.log('_custom_projection_string  --> ', _custom_projection_string );



                                                                          // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                                                                         _south_west_point_long_lat_array = proj4(_custom_projection_string, wgs84_EPSG_4326, [bbox.xmin,    bbox.ymin]);
                                                                         _north_east_point_long_lat_array = proj4(_custom_projection_string, wgs84_EPSG_4326, [bbox.xmax,    bbox.ymax]);


                                                                         console.log(' non-(3857) always --- to --> 4326 , read proj string, feed in proj4   _south_west_point_long_lat_array ----> ', projection_method,  _south_west_point_long_lat_array )
                                                                         console.log(' non-(3857) always --- to --> 4326 , read proj string, feed in proj4   _north_east_point_long_lat_array ----> ', projection_method,  _north_east_point_long_lat_array )
                                                                         fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)

                                                                     





                                                                          break;




                                                  case 'esri_proj':


                                                                     // non-(3857) always --- to --> 4326



                                                                     // in use, client side projection, very fast, no need await, fit bound must be inside require module

                                                                              // some case, may not await,
                                                                              esri_clientSide_projection(bbox)  
                                                                                 
                                                                              
                                                                              

                                                                             
                                                                              
    



                                                                    // not use, esri server side projection , very slow, due to ajax call, but works, must use await, because it has ajax call, 
                                                                          /*  
                                                                                var _esri_serverSide_projection_result = await esri_serverSide_projection(bbox)

                                                                                console.log('_esri_serverSide_projection_result', _esri_serverSide_projection_result)
                                                                                _south_west_point_long_lat_array = _esri_serverSide_projection_result.SouthWest_min
                                                                                _north_east_point_long_lat_array = _esri_serverSide_projection_result.NorthEast_max

                                                                                console.log('  esri server projection  ---->  non-(3857)   always to --> 4326   _south_west_point_long_lat_array ----> ',   _south_west_point_long_lat_array )
                                                                                console.log('  esri server projection  ---->  non-(3857)   always to --> 4326   _north_east_point_long_lat_array ----> ',   _north_east_point_long_lat_array )
                                                                                fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                                                                          */





                                                                    break;





                                                    

                                                  default:
                                                    console.log(`Sorry, we are out of ${projection_method}.`);


                                } // switch


                                









                                  
                            }


                      




                            function fit_bound_googlemaps(_southWest_lnglat_array, _northEast_lnglat_array){



                             

                              // https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
                              var google_bounds = new google.maps.LatLngBounds(
                                                                                  

                                                                                    //  latlng class object ( lat, lng) order matters
                                                                                    new google.maps.LatLng(_southWest_lnglat_array[1], _southWest_lnglat_array[0]), 
                                                                                  

                                                                                    new google.maps.LatLng(_northEast_lnglat_array[1], _northEast_lnglat_array[0])
                                                                                    

                                                                                    /*  latlng literal works as well
                                                                                    {lat:_southWest_lnglat_array[1], lng: _southWest_lnglat_array[0]},
                                                                                    {lat:_northEast_lnglat_array[1], lng: _northEast_lnglat_array[0]}
                                                                                    */

                                                                                  
                                                                              );

                                map.fitBounds(google_bounds);

                                

                              var _c_e_n_t_e_r = map.getCenter()

                             

                              _center_lat  =  _c_e_n_t_e_r.lat()
                              _center_long =  _c_e_n_t_e_r.lng()
                              _center_zoom = parseInt(map.getZoom())

                              console.log('  new center is - -> - - > : ', _center_lat, _center_long, _center_zoom )

                            }





                            

                           



                           // fit bound must inside require module
                           function esri_clientSide_projection(extent_geometry){

                            /*
                          
                                                            // also works at https://developers.arcgis.com/rest/services-reference/project.htm
                                                            // var _projection_server_url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?';
                          
                                                            all 3 kind of extent works, just choose one of them  
                                                      
                                                                  "extent": {
                                                                      "xmin": 1440000,
                                                                      "ymin": 535000,
                                                                      "xmax": 1455000,
                                                                      "ymax": 550000,
                                                                      "spatialReference": {
                                                                          "wkid": 102719,
                                                                          "latestWkid": 2264
                                                                      }
                                                                  },
                          
                          
                          
                                                                  "initialExtent": {
                                                                      "xmin": 1440000,
                                                                      "ymin": 535000,
                                                                      "xmax": 1455000,
                                                                      "ymax": 550000,
                                                                      "spatialReference": {
                                                                          "wkid": 102719,
                                                                          "latestWkid": 2264
                                                                      }
                                                                  },
                          
                          
                          
                                                                  "fullExtent": {
                                                                      "xmin": 1440000,
                                                                      "ymin": 535000,
                                                                      "xmax": 1455000,
                                                                      "ymax": 550000,
                                                                      "spatialReference": {
                                                                          "wkid": 102719,
                                                                          "latestWkid": 2264
                                                                      }
                                                                  },
                                                                  
                          
                                                             
                                                      
                                                      */
                                                       
                                                     
                          
                                                                 
                          
                          
                                                    
                                                                            require([
                                                                              "esri/geometry/SpatialReference",
                                                                              "esri/geometry/projection",
                                                                              "dojo/domReady!"
                                                                            ], function (
                                                                              SpatialReference, projection
                                                                            ) {
                                          
                                                                                        /*

                                                                                            fix bug projection do not have function isSupported()


                                                                                              https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/introducing-the-client-side-projection-engine/

                                                                                              https://developers.arcgis.com/javascript/3/jssamples/client_projection.html

                                                                                              https://developers.arcgis.com/javascript/3/jsapi/esri.geometry.projection-amd.html
                                                                                        */

                                                                                          
                                                                                              
                                                                                              console.log('  - 1 - projection.isSupported() ', projection)



                                                                                      
                                                                                        // load the projection module
                                                                                        projection.load().then(function () {
                          
                                                                                                      var outSpatialReference = new SpatialReference({
                                                                                                        wkid: 4326 //Sphere_Sinusoidal projection
                                                                                                      });
                          
                          
                                                                                              try {
                          
                          
                                                                                                      // project an array of geometries to the specified output spatial reference
                                                                                                      var extent_projectedGeometries = projection.project(extent_geometry , outSpatialReference);
                                                                                                          console.log("extent_projectedGeometries", extent_projectedGeometries);
                          
                          
                                                                                                          var _xmin = extent_projectedGeometries.xmin;
                                                                                                          var _ymin = extent_projectedGeometries.ymin;
                                                                                                          var _xmax = extent_projectedGeometries.xmax;
                                                                                                          var _ymax = extent_projectedGeometries.ymax;
                                                                                                          
                                                                                                          



                                                                                                      // fit bound must inside require module 
                                                                                                         
                            
                            
                                                                                                          // not use pan to lat/lng
                                                                                                          /*
                                                                                                                  var _xmiddle = (_xmax - _xmin) / 2 + _xmin;
                                                                                                                  var _ymiddle = (_ymax - _ymin) / 2 + _ymin;
                                                                                                                  panto_googlemaps( _ymiddle, _xmiddle, _center_zoom )   
                                                                                                          */
                                                                         
                                                                        
                                                                                                          // in use, fit bound
                                                                                                          var _south_west_point_long_lat_array = [_xmin,    _ymin]
                                                                                                          var _north_east_point_long_lat_array = [_xmax,    _ymax]  

                                                                                                          console.log(' -- esri client side projection  --   _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
                                                                                                          console.log(' -- esri client side projection  --   _north_east_point_long_lat_array',  _north_east_point_long_lat_array )       
                                                                                                          fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                          
                          
                          
                          
                          
                                                                                     


                          
                                                                                                        } catch (projection_error) {

                                                                                                          console.log(" +++ client side projection failed, projection is not load   ",projection_error );
          
                                                                                                          
                                                                                                            
                                                                                                          // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                                                                                                           
          
                                                                                                          return;
                      
                                                                           
                                                                                                }// catch
                                                                         
                          
                          
                          
                                                                                      }); // load projectin module
                          
                          
                                                                          }); //require([



                                                                          
                                            
                                                      }







                      

                           // not use, but keep here,  esri server side projection , very slow, due to ajax call, but works, must use await, because it has ajax call, 
                           async function esri_serverSide_projection(__bbox){



                                var esriServerSideProj_result = { SouthWest_min : [],   NorthEast_max: []  }
                                                    
                                



                                var _________latestWkid
                                var _________wkid

                                // latestWkid exist, will use either default or  "read_proj_string".  
                                if (__bbox.spatialReference.latestWkid) {

                                          // latestWkid,

                                                _________latestWkid = __bbox.spatialReference.latestWkid

                                                            

                                } // latestWkid


                                          
                                // as long as esri wkid exist,  will either use default or esri_proj
                                if (__bbox.spatialReference.wkid) {


                                                _________wkid = __bbox.spatialReference.wkid


                                                

                                } // wkid

                                                                    var __geometries_min = {
                                                                                            "geometryType" : "esriGeometryPoint",
                                                                                            "geometries" : [
                                                                                              {
                                                                                                "x" : __bbox.xmin, 
                                                                                                "y" : __bbox.ymin
                                                                                              }
                                                                                            ]
                                                                                          }

                                                                    var __geometries_max = {
                                                                                            "geometryType" : "esriGeometryPoint",
                                                                                            "geometries" : [
                                                                                              {
                                                                                                "x" : __bbox.xmax, 
                                                                                                "y" : __bbox.ymax
                                                                                              }
                                                                                            ]
                                                                                          }

                                
                                                                    /* The difference between encodeURI and encodeURIComponent is encodeURIComponent encodes the entire string, 
                                                                          where encodeURI ignores protocol prefix ('http://') and domain name. 
                                                                              encodeURIComponent is designed to encode everything, where encodeURI ignores a URL's domain related roots     
                                                                    */                
                                                                    __geometries_min = encodeURIComponent(JSON.stringify(__geometries_min))
                                                                    __geometries_max = encodeURIComponent(JSON.stringify(__geometries_max))


                                                                    var  _esri_proj_min_url =   'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?inSR=' + _________wkid    +  '&outSR=4326&geometries=' + __geometries_min + '&f=pjson';
                                                                    var  _esri_proj_max_url =   'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?inSR=' + _________wkid    +  '&outSR=4326&geometries=' + __geometries_max + '&f=pjson';


                                                                    var _esri_proj_min_result
                                                                    var _esri_proj_max_result



                                                                    // this esri server always use jsonp,   cors is not working.

                                                                        _esri_proj_min_result =  await $.ajax({
                              
                                                                                                      // large data take long long time , so should not time out, let it run until get it
                                                                                                      //timeout: _timeout,
                              
                                                                                                        type: 'GET',
                                                                                                        dataType: 'jsonp',
                                                                                                        data: {},
                              
                                                                                                        url:_esri_proj_min_url,
                              
                              
                              
                                                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                                                          
                                                                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                                console.log('ajax error  + ', _error_status);
                                                                                                                              
                              
                              
                                                                                                        },
                                                                                                        success: function (data) {
                                                                                                          console.log('_esri_proj_min_url --> jsonp success ', data );
                                                                                                            
                                                                                                            // note: data is already json type, you just specify dataType: jsonp
                                                                                                            return data;
                                                                                                        }
                                                                                                      });  // await
                          
                                                              
                          
                          
                                                                        _esri_proj_max_result =  await $.ajax({
                          
                                                                                                                // large data take long long time , so should not time out, let it run until get it
                                                                                                              // timeout: _timeout,
                          
                          
                                                                                                                  type: 'GET',
                                                                                                                  dataType: 'jsonp',
                                                                                                                  data: {},
                                                                                                                  
                                                                                                                  url:  _esri_proj_max_url,
                          
                                                                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                                                                    
                                                                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                                          console.log('ajax error  + ', _error_status);
                                                                                                                                        
                                                                                          
                                                                                          
                                                                                                                  },
                                                                                                                  success: function (data) {
                                                                                                                    console.log('_esri_proj_max_url  success  ',  data);
                                                                                                                      
                                                                                                                    
                                                                                                                    
                                                                                                                      return data;
                                                                                                                  }
                                                                                                                });  // await
                          
                          
                          
                                                                            /*
                                                                            
                                                                            {
                                                                                "geometryType" : "esriGeometryPoint", 
                                                                                
                                                                                "geometries" : 
                                                                                [
                                                                                  {
                                                                                    "x" : -119.917091348023, 
                                                                                    "y" : 48.683789765927
                                                                                  }
                                                                                ]
                                                                              }

                                                                            
                                                                            */                                    

                                                                                                                
                                                                              esriServerSideProj_result.SouthWest_min = [ _esri_proj_min_result.geometries[0].x  ,   _esri_proj_min_result.geometries[0].y  ]
                          
                                                                              esriServerSideProj_result.NorthEast_max = [ _esri_proj_max_result.geometries[0].x  ,   _esri_proj_max_result.geometries[0].y  ]
                                                              


                                                                              return esriServerSideProj_result


                           }










            //  -------------------  end    -------------------  esri  ------------------- pan to real location  ------------------- 







/**/
//  --- yelp POI on google      --- 
/**/


      

          /**/
          // - - - filter layer list  - - - 
          /**/

          // folder
          var filterfolderList_by_keyword
          async function filter_folderList_now(event){
            
            filterfolderList_by_keyword = $('#filter_folder_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('filterfolderList now keyword ...  ', filterfolderList_by_keyword)
            if ($('#poi_categories').jstree(true)){
                $('#poi_categories').jstree(true).search(filterfolderList_by_keyword);
            }
            
          }
          function show_all_folder_list(){
            
            filterfolderList_by_keyword = ''
            $("#filter_folder_list_by").val(filterfolderList_by_keyword)
            console.log('show all folder list now, you clicked clear button . . .  ', filterfolderList_by_keyword)
            if ($('#poi_categories').jstree(true)){
                $('#poi_categories').jstree(true).clear_search();
            }
          }

          /**/
          // ... end ...  - - - filter layer list  - - -
          /**/


                          


             // ****** pre select by url param  ****** 

             var selected_folderLevel_id;
             var selected_folderLevel_text;
             var selected_folderLevel_alias;

             function  pre_select_folder_level(){

                         // Do NOT re-create instance of url params, use first time, filter by=xxx  as records
                         //urlParams = new URLSearchParams(window.location.search);

                             selected_folderLevel_id = urlParams.get('select_folder_id');
                             selected_folderLevel_text = urlParams.get('select_folder_text');
                             selected_folderLevel_alias = urlParams.get('select_folder_alias');
                            
                            
                             console.log('pre selected folder id ',  selected_folderLevel_id)
                             console.log('pre selected folder text ',  selected_folderLevel_text)
                             console.log('pre selected folder alias ',  selected_folderLevel_alias)




                             // node id may not be true, if new item has been added to arcgis server, node text is always true, 
                             // node text is raw html, including html sup tag, + plus sign, but no need to clean up, just use it as is 
                             if ((selected_folderLevel_alias == undefined) || (selected_folderLevel_alias == null) || (selected_folderLevel_alias == '')){
                                     // select folder alias is null, undefined, nothing to do, just use node id
                             }else {
                                     // select folder text should overwrite node id, get real node id by node text
                                     // get existing jstree flat json https://groups.google.com/g/jstree/c/nn7GPC43WpA
                                     var rootFolderFlatJsonData = $('#poi_categories').jstree(true).get_json('#', {no_state:true,flat:true})
                                     console.log('pre select ,  root Folder Flat Json Data',  rootFolderFlatJsonData)
                                     
                                     for (let i = 0; i < rootFolderFlatJsonData.length; i++) {
                                         if(rootFolderFlatJsonData[i]['alias'] == selected_folderLevel_alias){
                                             selected_folderLevel_id = rootFolderFlatJsonData[i]['id']
                                             console.log('find new real node id ',  selected_folderLevel_id)
                                         }//if
                                     }//for

                             }//if



 
                             if ((selected_folderLevel_id == undefined) || (selected_folderLevel_id == null) || (selected_folderLevel_id == '')){
 
                                 // select folder is null, undefined, nothing to select
                             }else {
 
                                 console.log('selected_folderLevel_id',  selected_folderLevel_id)
                                 selectFolderLevelItem(selected_folderLevel_id)
                             }



             }




               // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
               function selectFolderLevelItem(folderLevel_id){

                    console.log(' **** select folder level id is  ***** ', folderLevel_id )
                    console.log(' **** select folder level id is  ***** ', $('#poi_categories').jstree(true) )
                    $('#poi_categories').jstree().deselect_all(true);    // true means not trigger change.jstree event
                    $('#poi_categories').jstree(true).select_node(folderLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                    //$('#poi_categories').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

               }

                        
            // ******  end   ******  pre select by url param  ****** 
            /**/
                      


            function remove_current_poi(){

              if (_current_geojson_POI){
                for (var l = 0, len = _current_geojson_POI.length; l < len; l++){
                            map.data.remove(_current_geojson_POI[l]);
                }// for
              }// if

              $("#info-window-div").html('')

              $("#poi_total").html('...')
              $("#poi_on_map").html('...')

            }


            function clear_poi_category(){

              if ($('#poi_categories').jstree(true)){
                $('#poi_categories').jstree('deselect_all');
              }

              remove_current_poi()


              update_url_parameter('select_folder_id', '');
              update_url_parameter('select_folder_text', '');
              update_url_parameter('select_folder_alias', '');;


            }




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




              /**/
              //  . . category . . 
          
                      $("#filter_folder_list_by").on('keyup', filter_folderList_now);
                      $("#search_folder_list_button").on('click', filter_folderList_now);
                      $('#clear_filter_folder_list_button').on('click', show_all_folder_list);  
  
  
  
                      $("#collapse_button_folder").on('click',function(){
                        if ($('#poi_categories').jstree(true)){
                            $('#poi_categories').jstree('close_all');
                        }
                      }); 
  
                      $("#expand_button_folder").on('click',function(){
                          if ($('#poi_categories').jstree(true)){
                              $('#poi_categories').jstree('open_all');
                          }
                      }); 

                      // search bar close icon clicked. clear everything.
                      $('#clear_poi_category_button').on('click', clear_poi_category);

  
              // . . end . .  category . . 
              /**/
  
  
  
  
  
              /**/
              //  . . search bar . . 
  
                      console.log('url param search poi',  search_poi_keyword)
  
                      // first time, 1 time
                      if (search_poi_keyword){
                                  search_poi_keyword = search_poi_keyword.toLowerCase().trim();
                                  $('#search_poi_input').val(search_poi_keyword);

                                  // first time, 1 time
                                  search_poi()
                      }// if
              
              
                                                  
                      // only update URL search_data=xxx, not perform real search.
                      $("#search_poi_input").on('keyup', update_poi_keyword_content);
              
                      // search bar close icon clicked. clear everything.
                      $('#clear_poi_button').on('click', clear_search_poi_result);
              
                      $('#search_poi_button').on('click', search_poi);
              
                      // default search
                      $('#search_poi_input').on('search', search_poi);
  
              //  . . end . .  . . search bar . . 
              /**/



              //  . .  . . limit by bound or location radio  . .  . . 
                // first time set radio
                $("input[type=radio][name=limit_by_bound_or_location_radio][value=" + limit_by_bound_or_location + "]").prop('checked', true);
                // radio change event
                $("input[type='radio'][name='limit_by_bound_or_location_radio']").change(function(){
                  limit_by_bound_or_location = $("input[type='radio'][name='limit_by_bound_or_location_radio']:checked").val();
                  console.log(" limit_by_bound_or_location : --  ", limit_by_bound_or_location);
                  update_url_parameter('limit_by_bound_or_location', limit_by_bound_or_location);
                });
              //  . . end . .  . .  limit_by_bound_or_location_radio  . .  . . 




  
            }
                 
  
  
  
 /**/
 //  . . search bar . .
 /**/ 



              // has view, inside of require scope
              async function search_poi(event){

                // category or term not same time,  before search bar term, clear search  category
                clear_poi_category()


              
                search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                
                console.log('search_poi_keyword --->  ', search_poi_keyword)
  
  
               


                  var ____url = yelp_api_search

                  if (search_poi_keyword){
                    // If term is not included the endpoint will default to searching across businesses from a small number of popular categories.
                    ____url += 'term=' + search_poi_keyword
                  }//if

                 
                  


                 
                   // . .   limit by bound or location radio,  . .  

                    // not use, only lat lng with minium radius
                    //____url += '&latitude=' + _center_lat
                    //____url += '&longitude=' + _center_long

                      if (limit_by_bound_or_location == 'location'){

                          // user choose location

                          _current_location_input_text = $("#pac-input").val()
                          update_url_parameter("location", _current_location_input_text)
                          console.log('new place in address place search bar', _current_location_input_text)

                          if (_current_location_input_text){
                            //location exist, use it
                            ____url += '&location=' + _current_location_input_text
                          } else {
                            //location not exist, must use lat,lng, raduis in meter
                            _center_radius_in_meter = get_center_radius_in_map_bound()

                            ____url += '&latitude=' + _center_lat
                            ____url += '&longitude=' + _center_long
                            ____url += '&radius=' + _center_radius_in_meter
                          }


                      } else {

                              // user choose bound
                              _center_radius_in_meter = get_center_radius_in_map_bound()
                              ____url += '&latitude=' + _center_lat
                              ____url += '&longitude=' + _center_long
                              ____url += '&radius=' + _center_radius_in_meter

                      }//if location
                      
                    // . .  end  . .   limit by bound or location radio,
                    
                 
                  



      
                  console.log('poi search by keyword term url ', ____url )
                  
                  var response_string =  await $.ajax({
                    url: ____url,
                    headers: {
                    'Authorization': yelp_api_key,  //'Bearer xxxxxx',
                    },
                    method: 'GET',
                    dataType: 'json',
                    success: function(data){
                      console.log('poi search by categories success', data)
                    }
                  });  
      
  
                  $("#poi_total").html(response_string.total)
                  $("#poi_on_map").html(response_string.businesses.length)
                  poi_geojson = poi_to_geojson(response_string.businesses)
        
                  console.log('poi geojson', poi_geojson)
        
                
        
                 //----------------  add new geojson, then remove last geojson --------------------
                 _last_geojson_POI = _current_geojson_POI;
                 _current_geojson_POI = map.data.addGeoJson(poi_geojson);
        
                 set_poi_style(_poi_strokeColor, _poi_strokeWeight, _poi_fillColor, _poi_pointRadius)
        
                // ---- after add new geojson, now remove last time old geojson -------------
                // don't use Array.ForEach is about 95% slower than for() in JavaScript.
        
                 if (_last_geojson_POI){
                     for (var l = 0, len = _last_geojson_POI.length; l < len; l++){
                                 map.data.remove(_last_geojson_POI[l]);
                     }// for
                 }// if
               //------------------------end add new geojson, then remove last geojson------------------------- ---------------
        
        
                    
                
  
  
              }//function
              
              

              function clear_search_poi_result(){

                // clear key word in search bar
                $('#search_poi_input').val('')
                search_poi_keyword = ''
                update_url_parameter('poi', '');
  
                remove_current_poi()


              }
  
  
              function update_poi_keyword_content(){
                search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                console.log('search_poi_keyword --->  ', search_poi_keyword)
                update_url_parameter('poi', search_poi_keyword);
              }




 //  . . end . .  . . search bar . . 
 /**/



/**/
//  --- end  ---  yelp POI on google    --- 
/**/


                              


