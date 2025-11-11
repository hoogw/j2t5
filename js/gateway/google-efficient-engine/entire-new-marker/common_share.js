// async await will fail if user quickly zoom in out, pan.
// await cause every ajax in queue, you can't cancel the unwanted ajax. 
// so must not use await.



var map;
var _geojson_object;
// - - - - download geojson  - - - -
var _geojson_object_selected_feature
var _empty_geojson_object = {type: "FeatureCollection", features: []}

var _search_keyword = ''
var _search_keyword_data_array = _search_keyword.split(' ');


var search_result_feature_array_global_var = [];


var _timeout = 60000;


var _base_map_type = 'streets' // for apple bing, not for google
var _first_time_load = true;


//  --- click or hover   --- 
var click_or_hover = 'hover'   // 'click'









                //  ---------- abort ajax call   ---------- 

                    /* 
                          ajax.abort can not use async-await, must process response inside success function
                    
                          arcgis server by default will output max 2000 feature per query. so if query more than 2000 feature, you will only get 2000. you will not get more than 2000 feature all time.  

                    */


                        // abort  
                        var data_count_only;
                        var data_only; 
                        var  ___XMLHttpRequest_count_only;
                        var  ___XMLHttpRequest_data;

                        
                    
                        // not abort
                        var search_layer_result
                //   ---------- end   ----------  abort ajax call   ---------- 






var _envelope;
var _url_returncountonly;
var _url_returngeojson;

var _current_geojson_layer;
var _last_geojson_layer;
var search_layer_result_geojson;



var info_panel_lock = false;



                      
              




var highlighted_color = '#1F51FF' // Neon Blue

 




  /**/
   //  .. - .. - ... zoom 2 feature   ... - .. - .. 
   /**/
   var zoom2feature_noMoreThan = 20  // default
   var zoom2feature_zoomLevel = 18  // default
   var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
   //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level' 
   //var zoom2feature_yesNo = 'donot_zoom2feature' 
   
   /**/
   // - - fit bound - - 
   var latlngList = [];

   /**/
   //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
   /**/
   
  



//       - -  -  -  entire   - -  -  - 
   // download entire by object id array, no need limit, comment out this line
   //limit = 200 
//      - -  -  -   end    - -  -  -  entire   - -  -  -  



//  . . efficient core newOnly  . - .

// unlimit(999999) will crash out of memory
var maxCountBrowserDisplay = 22000; // if lower than ajax limit 200, evenly delete every 1, will get wrong display number,

 /**/
 // -- -- --  google advanced marker replace geojson  -- -- --
       
        // test only, this number must over batch count which is 20(test)
        var google_marker_max_count = 500
 // -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
 /**/


 

/**/
//  - - -  efficient engine delete random shuffled marker or feature      - - - 
/**/
var delete_start_position = 0
var delete_end_position = 0
var delete_objectid_array = []
/**/
//  --- end  ---  efficient engine delete random shuffled marker or feature    - - - 
/**/



 

var loaded_all_feature_count = 0;
var thisNewOnlyAjaxFeatureCount = 0;

var _all_feature_flat_array = []
var _all_feature_uniqueID_array = []
var _this_ajaxrequest_array = []
var _this_newOnly_feature_array = []
var _this_newOnly_geojson 
var _uniqueID


// . .  end . . efficient core newOnly  . - .




//       - -  -  -  entire   - -  -  -  


// In IE, the max limit of a URL in a get was 2048 https://community.esri.com/t5/arcgis-enterprise-questions/what-is-the-maximum-length-for-a-feature-layer/td-p/1154929
// max length of url, https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
// 500 not work, server limit max length of http get request, 2048 char
// batch count should less than arcgis server max return count.
// 200 object id x 5 digit = 1000, should be safe under 2048 max limit.
// 200 is fastest for arcgis server loading on each request


var batch_count = 100 // each ajax get back how many feature by object id  
// test only
//var batch_count = 100


// to use 500, 500 x 5dig = 2500 more than 2048( for get request)
// should use post request. However, 500 isn't fast for arcgis server loading. 
// so use get request with 200 is best choice.



var batch_of_chunk_2D_objectid_array = []
var objectid_string_by_comma


var _url_get_objectid
var _objectid_response
var _objectid_array = []
var unshuffle_objectid_array = []
var _url_featureByObjectid
var post_url_featureByObjectid

var post_form_data

var get_url_batched_array = []
var postFormData_array = []

var entire_geojson_object

var on_map_total = 0

async function load_entire_feature(){


  // batch count should less than arcgis server max return count.
  if (maxRecordCount < batch_count){
    // for example la-quinta, max Record count = 50,  if batch count is 100, now should reset batch count to 50
    batch_count = maxRecordCount
  }



  _url_get_objectid = _url + '/'+ _layer_id + '/query?where=1=1&returnGeometry=false&returnIdsOnly=true&outSR=4326&f=pjson';
  _objectid_response = await ajax_jsonp_only(_url_get_objectid, _timeout)  
  
  console.log('_objectid_response', _objectid_response)

  if (_objectid_response.objectIdFieldName){
    objectid_field_name = _objectid_response.objectIdFieldName
  }
  console.log('objectid_field_name', objectid_field_name)

  if (_objectid_response.objectIds){
    unshuffle_objectid_array = _objectid_response.objectIds
    // shuffle array https://bost.ocks.org/mike/shuffle/
    _objectid_array = shuffle(unshuffle_objectid_array)
  }
  console.log('_objectid_array', _objectid_array)


                batch_of_chunk_2D_objectid_array = []
                for (let i = 0; i < _objectid_array.length; i += batch_count) {
                  batch_of_chunk_2D_objectid_array.push(_objectid_array.slice(i, i + batch_count));
                }//for



                console.log('batch_of_chunk_2D_objectid_array', batch_of_chunk_2D_objectid_array)

                _url_featureByObjectid = _url + '/'+  _layer_id + '/query'
                _url_featureByObjectid += '?returnGeometry=true'
                _url_featureByObjectid += '&outSR=4326'
                _url_featureByObjectid += '&f=pjson'
                _url_featureByObjectid += '&outFields=*'


                get_url_batched_array = []
                for (let j = 0;j < batch_of_chunk_2D_objectid_array.length; j += 1) {
                    objectid_string_by_comma = batch_of_chunk_2D_objectid_array[j].join(",")
                    console.log('objectid string by comma', objectid_string_by_comma)
                    get_url_batched_array.push(_url_featureByObjectid + '&objectIds=' + objectid_string_by_comma)
                }//for

                console.log(' url batched array', get_url_batched_array)

    // async, in use
    waitSyncGet_ajax()
    // sync, in use, for progressive max
    //noWait_Async_get_ajax()
                                    
}


async function waitSyncGet_ajax() {

  for (const _apiURI of get_url_batched_array) {
    try {
      
            console.log('ajax_GeoJSON_aaaaasync ---> : ', _apiURI);
            // jsonp  
            var response = await $.ajax({  
              timeout: _timeout,
              type: 'GET',
              dataType: 'jsonp',
              data: {},
              url: _apiURI,
              success: function (data) {
                return data
              }
            });  


            // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
            if (typeof response === 'object') {
              // is object
              data_only = response
            } else {
                // is string
                data_only = JSON.parse(response)
            }

            add_data_maps(data_only) 


            //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
            if (need_pan_to_real_location) {
              pan_to_sample(data_only)
              need_pan_to_real_location = false;
              update_url_parameter('panto', 0)
            }//if
          
    } catch (error) {
    

    }//try-catch
  }//for

   

}



var ___XMLHttpRequest_progressiveData
            // sync, for progressive max, not for download entire
            function noWait_Async_get_ajax(_apiURI) {



              //  ***** abort previously  ajax call   ***** 
                if (___XMLHttpRequest_progressiveData){
                    if (typeof ___XMLHttpRequest_progressiveData.abort !== "undefined"){
                        console.log('___XMLHttpRequest_progressiveData - xhr ', ___XMLHttpRequest_progressiveData)
                        // abort will cause jsonp call back error(normal, no need fix) :  Uncaught ReferenceError jqueryxxxxx_xxxxx  is not defined
                        ___XMLHttpRequest_progressiveData.abort()  
                    }
                }
              //  ******* end ***** abort previously  ajax call   *****  


              for (const _apiURI of get_url_batched_array) {

                try {
                
                        console.log('noWait_Async_get_ajax ---> : ', _apiURI);
                        // jsonp  
                        $.ajax({  
                          timeout: _timeout,
                          type: 'GET',
                          dataType: 'jsonp',
                          data: {},

                           beforeSend:  function( jqXHR, settings ){

                                                          ___XMLHttpRequest_progressiveData = jqXHR
                                                        },

                          url: _apiURI,
                          success: function (data) {
                                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                          if (typeof data === 'object') {
                                            // is object
                                            data_only = data
                                          } else {
                                              // is string
                                              data_only = JSON.parse(data)
                                          }

                                          add_data_maps(data_only) 


                                          
                          }// success
                        });// ajax  

                      } catch (error) {
                

                      }//try-catch
                    }//for


            }











//  . . efficient core newOnly  . - .
function add_data_maps(data) {

  
  // new google marker still can't more than this number
  // geometryType: "esriGeometryPoint",
  if ((featurelayer_geometrytype == 'esriGeometryPoint') || (featurelayer_geometrytype == 'esriGeometryMultipoint')){
    maxCountBrowserDisplay = google_marker_max_count
  }

  
  var arcgis_feature_Set
  if (typeof data === 'object') {
      // is object
      arcgis_feature_Set = data
  } else {
      // is string
      arcgis_feature_Set = JSON.parse(data)
  }                                    

  //       - -  -  -  entire   - -  -  -  
  // do not reduce feature
  //arcgis_feature_Set = reduce_feature_count(arcgis_feature_Set, limit)
  _geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set, objectid_field_name)

  //       - -  -  -  entire   - -  -  -  

    

  

        _this_newOnly_feature_array = []

        // do not test if this new feature already exist
        _this_ajaxrequest_array = _geojson_object.features

        for (let p = 0; p < _this_ajaxrequest_array.length; p++) {
          _uniqueID = _this_ajaxrequest_array[p]['properties'][objectid_field_name]
          _all_feature_uniqueID_array.push(_uniqueID)
          _all_feature_flat_array.push(_this_ajaxrequest_array[p])
        
          //  . . efficient core newOnly  . - .
          _this_newOnly_feature_array.push(_this_ajaxrequest_array[p])
        }//for
        console.log(' this ajax request add new feature ', _this_newOnly_feature_array.length)
        



        

/**/
//  - - -  efficient engine delete random shuffled marker or feature      - - - 
/**/
        
             
        
              // always add this new feature to map

              /**/
              // -- -- --  google advanced marker replace geojson  -- -- -- 
                  
                  if ((featurelayer_geometrytype == 'esriGeometryPoint') || (featurelayer_geometrytype == 'esriGeometryMultipoint')){
                    // point
                                //  . . efficient core newOnly  . - .
                                console.log('_this_newOnly_feature_array', _this_newOnly_feature_array)
                                // parameter is geojson.features array only
                                geojsonPointFeature_to_marker_label(_this_newOnly_feature_array, objectid_field_name)
                                // . .  end . . efficient core newOnly  . - .
                  } else {
                    // polygon or line

                          
                              _this_newOnly_geojson =  {
                                type: "FeatureCollection",
                                features: _this_newOnly_feature_array,
                              }
                              map.data.addGeoJson(_this_newOnly_geojson);

                             
                  }//if 


                  on_map_total = on_map_total + _this_newOnly_feature_array.length



              // -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
              /**/


                //console.log('on_map_total, maxCountBrowserDisplay', on_map_total, maxCountBrowserDisplay )

                //  -- -- -- if over loaded, remove oldest feature  -- -- -- 
                if (on_map_total > maxCountBrowserDisplay){

                    //  over loaded, remove oldest feature
                    

                    delete_end_position = delete_start_position + _this_newOnly_feature_array.length
                    delete_objectid_array = []
                    
                    for (let d = delete_start_position; d < (delete_end_position); d++) {
                      delete_objectid_array.push(_all_feature_uniqueID_array[d])
                    }//for
                    delete_start_position = delete_end_position

                    //console.log('delete_objectid_array', delete_objectid_array )

                    if ((featurelayer_geometrytype == 'esriGeometryPoint') || (featurelayer_geometrytype == 'esriGeometryMultipoint')){
                      // point

                        for (let m = 0; m < marker_array.length; m++) {
                          if (delete_objectid_array.includes(marker_array[m].object_id)){
                                marker_array[m].map = null
                          }//if
                        }//for

                    } else {
                      // polygon or line

                       var feature_object_id


                       //console.log('delete_objectid_array', delete_objectid_array )

                       map.data.forEach(function(feature){

                           //console.log('feature for each',  feature)
                           // get feature's all property  https://developers.google.com/maps/documentation/javascript/reference/data#Data.Feature
                           feature.toGeoJson(function(feature_to_geojson){ 

                                //console.log('after feature to geojson ', feature_to_geojson)
                                var ___properties = feature_to_geojson.properties
                                //console.log('confirm this feature all properties   ', ___properties)
                                feature_object_id = ___properties[objectid_field_name]

                                if (delete_objectid_array.includes(feature_object_id)){
                                    //console.log('feature for each, delete this obj id - feature ', feature_object_id )
                                    map.data.remove(feature);
                                }//if
                           
                           });// to geojson

                       })// map data for each






                    }//if 

                 
                     on_map_total = on_map_total - delete_objectid_array.length


                }//if
                // -- -- --  end -- -- --  if over loaded, remove oldest feature  -- -- -- 



                
        /**/
        //  --- end  ---  efficient engine delete random shuffled marker or feature    - - - 
        /**/

              loaded_all_feature_count = _all_feature_flat_array.length
              console.log(' loaded all feature count ', loaded_all_feature_count)
              display_count_info(_layer, loaded_all_feature_count, _total_count_of_feature, on_map_total)
        

  //      - -  -  -   end    - -  -  -  entire   - -  -  - 



}







    /**/
    // -- -- --  google advanced marker replace geojson  -- -- -- 

              
          // geojson point, multipoint
          function createMarkerLabel(point_element, point_lng, point_lat, point_label){

                   

                    const pin_div = document.createElement("div");
                    pin_div.className =  "black_label";  //'black_label'; "white_label";
                    pin_div.textContent = point_element.properties[objectid_field_name];

                    // api https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization
                    const pin = new google.maps.marker.PinElement({
                      scale: 0.5,
                      background: "#FBBC04",
                      borderColor: "#137333",
                      
                      // only text
                      //glyph: point_name, // "x", "o",
                      // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
                    

                      // if want show label, uncomment this line 
                      //glyph: pin_div, 

                      glyphColor: "white",

                      // not use, only v=beta channel.
                      //gmpClickable: true,

                    });


                    // warning:  must inside function, use const, can not use global var, 
                    // otherwise add mouse over event lisenter will mess up  
                    const point_marker = new google.maps.marker.AdvancedMarkerElement({
                      map,
                      position: { lat: point_lat, lng: point_lng },

                      // not use, because it popup a text label on map
                      //title: point_name, 

                      // text + pin
                      content: pin.element,

                      // without pin, only text
                      //content: pin_div, 
                    });


                    


                    // add Custom data to markers
                    // you can add your own properties, just not conflit with existing google properties
                    // https://stackoverflow.com/questions/11378450/google-map-api-v3-how-to-add-custom-data-to-markers
                    point_marker.feature = point_element


                    // for highlight label
                    point_marker.label_text = point_label
                    point_marker.object_id = point_element.properties[objectid_field_name];



                    // Add a click listener for each marker, and set up the info window.


                    // click 
                    //not work
                    //point_marker.addEventListener("gmp-click", ({ domEvent, latLng }) => {

                    // both works, js event, and google map event  
                    //point_marker.addListener("click", ({ domEvent, latLng }) => {
                    point_marker.addEventListener("click", ({ domEvent, latLng }) => {
                    

                      if (click_or_hover == 'click'){

                    

                        show_info_outline_Tab(point_marker.feature)



                      
                      reset_all_marker_to_normal()
                        
                      const highlight_pin_div = document.createElement("div");
                      highlight_pin_div.className =  "blue_label";  //'black_label'; "white_label";

                      // for highlight label, carry over from marker creation
                      highlight_pin_div.textContent = point_marker.label_text;

                      const highlight_pin = new google.maps.marker.PinElement({
                        scale: 0.9,
                        background: "#FBBC04",
                        borderColor: "#137333",
                        
                        // only text
                        //glyph: point_name, // "x", "o",
                        // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
                      
            
                        // if want show label, uncomment this line 
                        ////glyph: highlight_pin_div, 
            
                        glyphColor: "white",
            
                        // not use, only v=beta channel.
                        //gmpClickable: true,
            
                      });
                      point_marker.content = highlight_pin.element


                      }//if
                      
                    });


                    // hover
                    // not working, addListener(google map event)
                    // point_marker.addListener("mouseover", ({ domEvent, latLng }) => {
                    // working, mouseover use addEventListener(js event), not addListener(google map event)
                    point_marker.addEventListener("mouseover", ({ event, latLng }) => {
                      if (click_or_hover == 'hover'){
                        show_info_outline_Tab(point_marker.feature)



                        
                        reset_all_marker_to_normal()

                        const highlight_pin_div = document.createElement("div");
                      highlight_pin_div.className =  "blue_label";  //'black_label'; "white_label";

                      // for highlight label, carry over from marker creation
                      highlight_pin_div.textContent = point_marker.label_text;

                      const highlight_pin = new google.maps.marker.PinElement({
                        scale: 0.9,
                        background: "#FBBC04",
                        borderColor: "#137333",
                        
                        // only text
                        //glyph: point_name, // "x", "o",
                        // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
                      
            
                        // if want show label, uncomment this line 
                        ////glyph: highlight_pin_div, 
            
                        glyphColor: "white",
            
                        // not use, only v=beta channel.
                        //gmpClickable: true,
            
                      });
                      point_marker.content = highlight_pin.element


                      }//if
                    });

                    point_marker.addEventListener("mouseout", ({ domEvent, latLng }) => {
                      if (click_or_hover == 'hover'){


                        empty_info_outline_Tab()

                        
                        reset_all_marker_to_normal()

                      


                      }//if
                    });

                    
                    marker_array.push(point_marker)



          }


              
          // parameter is geojson.features array only, support geojson point, multipoint
          // without lable, just comment out glyph: pin_div
          // this one is without label
          function geojsonPointFeature_to_marker_label(point_array, fieldName_as_markerlabel){

            console.log('point_array ', point_array)
            
            for (let i = 0; i < point_array.length; i++) {

              var point_element = point_array[i]
              //console.log('point_element ',i,  point_element)
              
              var point_label = point_element.properties[fieldName_as_markerlabel];

              // geojson type, point [lng,lat], multipoint[[lng,lat], [lng,lat], ], 
              switch (point_element.geometry.type) {

                case "Point":
                              // point [lng,lat]
                              var point_lng = point_element.geometry.coordinates[0]
                              var point_lat = point_element.geometry.coordinates[1]
                              createMarkerLabel(point_element, point_lng, point_lat, point_label)
                              break;

                case "MultiPoint":
                                    // multipoint[[lng,lat], [lng,lat], ], 
                                    var multipoint_coord_array = point_element.geometry.coordinates

                                    for (let mp = 0; mp < multipoint_coord_array.length; mp++) {
                                      var point_lng = multipoint_coord_array[mp][0]
                                      var point_lat = multipoint_coord_array[mp][1]
                                      createMarkerLabel(point_element, point_lng, point_lat, point_label)
                                    }//for
                                    
                                    break;

                default:
                  console.log("warning: geojson type is not point, not multipoint !! failed to create marker !")
              }



            }//for


          }


         // fix bug, mouse out some time does not reset this marker to normal, so reset all marker to make sure it happen 
         function reset_all_marker_to_normal(){

          for (let m = 0; m < marker_array.length; m++) {
           
       

              const pin_div = document.createElement("div");
              pin_div.className =  "black_label";  //'black_label'; "white_label";
              pin_div.textContent = marker_array[m].label_text;

              // api https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization
              const pin = new google.maps.marker.PinElement({
                scale: 0.5,
                background: "#FBBC04",
                borderColor: "#137333",
                
                // only text
                //glyph: point_name, // "x", "o",
                // string, element, url,  https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions.glyph
              

                // if want show label, uncomment this line 
                //glyph: pin_div, 

                glyphColor: "white",

                // not use, only v=beta channel.
                //gmpClickable: true,

              });

              marker_array[m].content = pin.element

           }//for


         }



         function remove_all_marker(){
          for (let m = 0; m < marker_array.length; m++) {
            marker_array[m].map = null
          }//for
          marker_array = []
         }


    // -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
    /**/










function pan_to_sample(_sample_arcgis_feature_Set){

  // parse an ArcGIS feature set (Geometry) to GeoJSON
                                    //console.log(' before convert, arcgis json ', arcgis_feature_Set) 
  // Terraformer does not support Feature Set, only support single arcgis geometry.
  // sometime, they use 'OBJECTID_1' instead of default 'OBJECTID', you must specify it, 
                                    // otherwise, geojson id will not match object-id, 
                                    // or geojson id is same number or null, cause failed to show geojson on map 
                                    //_geojson_object = Terraformer.arcgisToGeoJSON(arcgis_feature_Set,'OBJECTID_1')
  var _sample_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(_sample_arcgis_feature_Set, objectid_field_name)

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






}

//      - -  -  -   end    - -  -  -  entire   - -  -  -  


                                  








                          

                          






                         



                 



                    


                    
                  function _recursive_nested_array(_nested_array){
                    

                    if (typeof _nested_array[0] === 'number') {

                      return _nested_array

                    } else if (typeof _nested_array[0] === 'object') {

                      return _recursive_nested_array(_nested_array[0])

                    }

                }
 
  



                  //-------------  end --------- helper function ----------------------------------




          

















/**/
















                  // must have async, for later use await
                  async function initMap() {
                                 
                                  init_global_var_from_node();
                                  console.log(' root url ', _url)

                                  // for search feature attributes table
                                  // need async await
                                  await get_feature_attributes(_layer_id);
                                  
                                  
                                  


                                
                                  get_total_count()

                                  console.log('####### layerID ########', _layer_id)
                                  console.log('####### _center_lat ########', _center_lat)
                                  console.log('####### _center_long ########', _center_long)
                                  console.log('####### _center_zoom ########', _center_zoom)
                                  console.log('####### _map_type ########', _map_type)
                                  
                                  
                                  

                                
                                  

                                

                                  

                                  map = new google.maps.Map(document.getElementById('map'), 
                                  
                                  
                                                              {
                                                                mapId: "a5b7699664ef75d0", // Map ID is required for advanced markers.
                                                                center: {lat: _center_lat, lng: _center_long},
                                                                zoom: _center_zoom,

                                                                // user click, tile, image, etc, I don't want google-build-in Point of interest info window pop-up, must disable it  https://stackoverflow.com/questions/7478069/disable-point-of-interest-information-window-using-google-maps-api-v3
                                                                //clickableIcons: false,  
                                                                // idiot map only
                                                                disableDefaultUI: true,  

                                                                                            


                                                                 /*
                                                                      warning:  each control must privide xxxControlOption {

                                                                          position: google.maps.ControlPosition.LEFT_TOP
                                                                                            }
                                                                 */



                                                                 mapTypeControl:false,
                                                                 mapTypeId:'hybrid',// default, will be overwrite later in init base map function
                                                                 mapTypeControlOptions: {
                                                                                          

                                                                                          // TOP_RIGHT, not work, placed outside of map,  due to our css, map div only half of width, 
                                                                                          position: google.maps.ControlPosition.RIGHT_TOP  //  BOTTOM_CENTER,
                                                                                        },






                                                                zoomControl: false, // never use, remove it from map
                                                                zoomControlOptions: {
                                                                  position: google.maps.ControlPosition.RIGHT_BOTTOM, //BOTTOM_LEFT,
                                                                },


                                                                // scaleControl: true,


                                                                
                                                                 streetViewControl:        true,
                                                                 streetViewControlOptions: {
                                                                                              position: google.maps.ControlPosition.LEFT_BOTTOM, // street view only, BOTTOM_LEFT,
                                                                                            },



                                                                fullscreenControl: false, // never use, remove it from map
                                                                fullscreenControlOptions: {
                                                                  position: google.maps.ControlPosition.RIGHT_BOTTOM, //BOTTOM_LEFT,
                                                                },


                                                             });

                                       


                                  // disable 45° imagery
                                  map.setTilt(0);
                                  //enable 45° imagery 
                                  //map.setTilt(45);

                                  // google geolocation api  ................    ................
                                  // must after map object created,
                                  geolocation()
                                  zoom_to_layer() // reverse pan-to-your-current-location


                                  get_maptile(_url)

                                  //console.log('place : ' + _place)   
                                  console.log('rest api url: ' + _url)  
                                  
                                  add_search_place();

                                  // mouseover geojson event
                                  add_mapdata_listener()
                                  
                                  // map zoom pan event
                                  add_map_listener_idle()

                                  init_google_base_map()
                               
                                 // due to street view use map object, should after map object created.                             
                                 init_user_interface_event()

                                  
                                 
                                




                                  //       - -  -  -  entire   - -  -  - 
                                  load_entire_feature()
                                  //      - -  -  -   end    - -  -  -  entire   - -  -  -  



                                 
                                
                                // set dark mode by default
                                document.querySelector('body').classList.add('dark')
                          

                  }// function initMap






$(document).ready(function() {


    import_google_map_dynamic_library(_google_public_map_only_api_key)
  
       
});


          