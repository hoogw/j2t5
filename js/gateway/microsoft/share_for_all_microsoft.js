




//  .. ..  from node.js arcgis viewer transition to json2tree  .. ..  



// always at top, 


// microsoft marker don't have problem, can set no limit
// no limit, will get maxReturnCount set by arcgis server admin.
//var max_count_for_rendering = undefined // null,


// google must set limit
// old google marker(data layer point icon) will crash browser, if no limit, new google marker seems ok 
var max_count_for_rendering = 500

// 1). limit, used in function reduce feature count to limit
// 2). limit, used in url?...&resultRecordCount = limit
var limit = max_count_for_rendering   








var _url // main layer url node.js arcgisViewer use
var ___url_string  // main layer url json2tree use

var _center_lat
var _center_long
var _center_zoom



// .. ..  end  .. ..  from node.js arcgis viewer transition to json2tree  .. ..  





// -------------- value list paging   --------------
var maxRecordCount
var standardMaxRecordCount
var tileMaxRecordCount
var standardMaxRecordCountNoGeometry
var maxRecordCountFactor

var _totalCount_of_current_valueList




// token
var arcgis_online_token = ''           
var param_arcgis_online_token 



// for - - init global var
var urlParams



// ---  ---  marker-icon,label, size change based on zoom level  ---  ---  --- 
  var google_marker_icon_scale_by_zoom_level = {  0:1,  1:2, 2:2, 3:2,  4:3, 5:3,  
    6:4, 7:4,   8:5, 9:5,  10:6, 11:6,   12:7, 13:7, 
    14:8,   15:9, 16:11, 17:13, 18:15, 19:17, 20:19,  21:21,  22:23,   23:25}

  var google_marker_label_fontSize_by_zoom_level = {  0:'1px',  1:'1px', 2:'2px', 3:'3px',  4:'4px', 5:'5px',  
      6:'7px', 7:'9px',   8:'11px', 9:'13px',  10:'15px', 11:'17px',   12:'19px', 13:'21px', 
      14:'23px',   15:'25px', 16:'27px', 17:'29px', 18:'31px', 19:'33px', 20:'35px',  21:'37px',  22:'39px',   23:'41px'}

// --- end ---  marker-icon,label, size change based on zoom level  ---  ---  --- 




var radiusMeterForSinglePOI = 30



/**/
//  --- Microsoft feature layer   --- 
/**/



var _panto = 1 // default is 1, without _panto means 1,    0 means, not pan to real location
 var need_pan_to_real_location = true



 // -2 means current showing not available,  -1 means total count not available
 var _current_rendering_feature = -2 
 var _current_area_count_of_feature = -2
 var _total_count_of_feature = -1;

 var _geojson_object;
 var _empty_geojson_object = {type: "FeatureCollection", features: []}
 
 var _search_keyword = ''
 var _search_keyword_data_array = _search_keyword.split(' ');
 
 
 var search_result_feature_array_global_var = [];
 
 
 var _timeout = 60000;
 
 
 var _base_map_type = 'streets' // for apple bing, not for google
 var _first_time_load = true;
 
 
 
 //  --- click or hover   --- 
 var click_or_hover = 'hover'   // 'click'
 
 
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
 
 
 
                       
       
var search_poi_keyword
var param_search_poi_keyword
        
 
 
 
 
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
    






                  async function init_global_var_from_node(){
                
                
                    //  .......... global var ..............
                    
                      
                          // https://developer.mozilla.org/en-US/docs/Web/API/Location
                    
                            current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    
                            console.log('current_url ...... ',current_url);
                            
                            current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
                            current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
                            
                            // ----- parse url param ?url=xxxxxxxxxx  --------
                  
                            urlParams = new URLSearchParams(window.location.search);
                  
                              /**/            
                              //.................. required parameter .................
                                  _layer = urlParams.get('layer'); // required,  Warning:  router.js >layout.pug already get a copy, but it is encoded including single quote, must either decode including single quote, or get param again like this line does. 
                                  _layer_id = urlParams.get('layer_id'); // required,  Warning:  router.js >layout.pug already get a copy,  this line will overwrite that copy
                                              
                                  _cross = urlParams.get('cross'); // optional, without this will be  value 'default'
                                  if (_cross) {} else {_cross ='default' }
                  
                                  _url = urlParams.get('url');  // required
                  
                  
                                  // google, lat long  must be number
                                  _center_lat = Number(urlParams.get('_center_lat'));  // not use, only get it from router.js > layout.pug
                                  _center_long = Number(urlParams.get('_center_long'));  // not use, only get it from router.js > layout.pug
                                  _center_zoom = Number(urlParams.get('_center_zoom'));  // not use, only get it from router.js > layout.pug
                  
                                  
                               
                              //.................. required parameter .................
                              /**/
                                              
                                              
                                              
                                              
                  
                              // ***** setting tab parameter *********
                                              
                                                  var param_overlayOpacity = urlParams.get('overlayOpacity');
                                                  if ((param_overlayOpacity > 0 ) && (param_overlayOpacity < 11 )) {
                  
                                                    console.log('use new overlay opacity ',  param_overlayOpacity)
                                                    image_opacity = param_overlayOpacity / 10
                                                  
                                                  } else if (param_overlayOpacity == 0 ){
                  
                                                    image_opacity = 0
                  
                                                  }
                  
                  
                                                  var param_limit = urlParams.get('limit');
                                                  if (param_limit){
                                                    console.log('use new limit from urlparam ',  param_limit)
                                                    limit = param_limit
                                                  }
                  
                              // *****  end  ******* setting tab parameter *********
                  
                                              
                                               _panto = urlParams.get('panto');
                  
                                               if (_panto) {
                                                   if (_panto == 0) {need_pan_to_real_location = false}
                                                   if (_panto == 1) {need_pan_to_real_location = true}
                                               } else {
                                                 _panto = 1;  // default is 1, without _panto means 1,    0 means, not pan to real location  
                                                 need_pan_to_real_location = true
                                               }
                                               console.log('panto,  need_pan_to_real_location ......  ', _panto,  need_pan_to_real_location)  
                                              
                        
                                          ___url_string = _url     
                                          if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                                          {
                                              
                                              // nothing to do
                                              
                                          } else {
                                                ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                                              base_url = ___url_string;
                  
                                              ___protocol = ___url.protocol; //   https:
                                              ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                                              ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                                              ___urlParams = new URLSearchParams(___url.search); //
                  
                                              ___pathArray = ___pathname.split('/');
                                              ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 
                  
                                          }// if     
                                  // ----- parse url param ?url=xxxxxxxxxx  --------




  /**/
                                                      //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                      /**/
                                                      var param_zoom2feature_noMoreThan = urlParams.get('zoom2feature_noMoreThan');
                                                      if (param_zoom2feature_noMoreThan){
                                                                            console.log('use new zoom to feature no More Than from urlparam ',  param_zoom2feature_noMoreThan)
                                                                            zoom2feature_noMoreThan = parseInt(param_zoom2feature_noMoreThan)
                                                      }

                                                      var param_zoom2feature_zoomLevel = urlParams.get('zoom2feature_zoomLevel');
                                                      if (param_zoom2feature_zoomLevel){
                                                                            console.log('use new zoom to feature zoom Level from urlparam ',  param_zoom2feature_zoomLevel)
                                                                            zoom2feature_zoomLevel = parseInt(param_zoom2feature_zoomLevel)
                                                      }  

                                                      var param_zoom2feature_yesNo = urlParams.get('zoom2feature_yesNo');
                                                      if (param_zoom2feature_yesNo){
                                                                            console.log('use new zoom to feature yes no from urlparam ',  param_zoom2feature_yesNo)
                                                                            zoom2feature_yesNo = param_zoom2feature_yesNo
                                                      } 
                                                    
                                                    /**/
                                                    //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                    /**/
                                                    

                 



                  /**/
                  // -------------- search result paging or not  --------------
                  /**/
                      var param_search_result_paging_or_not = urlParams.get('searchpaging');
                      if (param_search_result_paging_or_not){
                        _search_result_paging_or_not = param_search_result_paging_or_not
                        console.log('from url param _search_result_paging_or_not ', _search_result_paging_or_not)
                      }

                  /**/
                  //  -------------- end  -------------- search result paging or not  --------------
                  /**/





                  /**/
                  // -------------- Street View Coverage Layer  --------------
                  /**/
 
                      var param_pegman_follow_you_or_not = urlParams.get('pegmanfollow');
                      if (param_pegman_follow_you_or_not){
                        pegman_follow_you_or_not = param_pegman_follow_you_or_not
                        console.log('from url param pegman_follow_you_or_not ', pegman_follow_you_or_not)
                      }

                  /**/
                  //  -------------- end  -------------- Street View Coverage Layer --------------
                  /**/








                            /**/
                            //  --- click or hover   --- 
                            /**/
                            param_click_or_hover = urlParams.get('clickorhover');

                            /**/
                            //  --- end  ---  click or hover   --- 
                            /**/


                             /**/
                            //  - - -  progressive max    - - - 
                            /**/

                            param_sync_async = urlParams.get('sync_async');

                            /**/
                            //  --- end  ---  progressive max   - - - 
                            /**/

                            /**/
                            // -- -- -- label and color  -- -- -- 

                            param_polygonFillBy = urlParams.get('polygonFillBy');
                            //. . . end  . . . -- -- -- label and color  -- -- -- 
                            /**/




                            /**/
                            //  - - -  progressive max    - - - 
                            /**/
                            var param_progressive = urlParams.get('progressive');
                            if (param_progressive) {batch_count = parseInt(param_progressive)}


                            /**/
                            //  --- end  ---  progressive max   - - - 
                            /**/



                                                     

                            /**/
                            //  - - -  browser max display count    - - - 
                            /**/

                            var param_browserlimit = urlParams.get('browserlimit');
                            if (param_browserlimit) {maxCountBrowserDisplay = parseInt(param_browserlimit)}


                            /**/
                            //  --- end  ---  browser max display count   - - - 
                            /**/





                                    





                              /**/
                              //  --- POI point of interest search esri     --- 
                              /**/

                              param_search_poi_keyword = urlParams.get('poi');
                              console.log('url param param_search_poi_keyword',  param_search_poi_keyword)
                              if (param_search_poi_keyword){ 
                                search_poi_keyword = param_search_poi_keyword
                              }


                              param_category_string = urlParams.get('poicategory');
                              console.log('url param param_category_string',  param_category_string)
                              if (param_category_string){ 
                                _category_string = param_category_string
                                console.log('url param _category_string',  _category_string)
                              }

                              /**/
                              //  --- end  ---  POI point of interest search esri    --- 
                              /**/
                    
                  }
                    






                    
                  var _featurelayerJSON;
                  var _feature_attributes
                  var featurelayer_geometrytype // esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
                  async function get_feature_attributes(layerID){


                           



                            // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
                            // layer_id is 333, 
                                var _url_layer = _url + '/'+  layerID + '?f=pjson'

                                

                              console.log('get feature attributes url layer -layerID-:',layerID, _url_layer)

                              
                             
                              
                              
                              
                              try {


                                      // test only
                                      // throw ' ++++++++ test only ++++++++ jsonp failed';


                                      // jsonp 


                                      var response_string =  await $.ajax({

                                  
                                      
                                                                type: 'GET',
                                                                dataType: 'jsonp',
                                                                data: {},
                                                                url: _url_layer,
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                  
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                                    
                                                                },
                                                                success: function (data) {
                                                                  console.log('get feature attributes , layer json --> jsonp --> success  --> ');
                                                                }
                                                              });  // await



                                    
                              } catch(jsonp_failed) {


                                        console.log('get feature attributes , layer json  --> jsonp failed !!!!!!', jsonp_failed);

                                      try {

                                                    



                                                      // test only
                                                      // throw ' ++++++++ test only ++++++++ cors failed'; 
                                      
                                                      // cors
                                                      var response_string =  await $.ajax({
                                                        type: 'GET',
                                                      
                                                        url: _url_layer,
                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                          
                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                console.log('ajax error  + ', _error_status);
                                                                            
                                                        },
                                                        success: function (data) {
                                                          console.log('get feature attributes , layer json --> cors --> success  --> ');
                                                        }
                                                      });  // await




                                                        
                                          
                                      } catch(cors_failed) {
                      
                                                                  console.log('get feature attributes , layer json  --> cors failed !!!!!!', cors_failed);
                      
                                                                  try {
                      
                                                                            
                      
                                                                            // proxy
                                                                            // --------- add proxy  ---------
                                                                            var _url_layer_proxy = proxyurl +  _url_layer
                      
                                                                            var response_string =  await $.ajax({
                                                                              type: 'GET',
                                                      
                                                                              url: _url_layer_proxy,
                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                
                                                                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                  
                                                                              },
                                                                              success: function (data) {
                                                                                console.log('get feature attributes , layer json --> proxy --> success  --> ');
                                                                              }
                                                                            });  // await
                      



                                                                          } catch(proxy_failed) {


                                                                            console.log('get feature attributes , layer json  --> proxy failed !!!!!!', proxy_failed);
                              
                              
                              
                                                                          } // catch proxy
                                                                    
                              
                                                            } // catch cors
                              
                              
                              } // catch jsonp

                              




                                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                    if (typeof response_string === 'object') {
                                        // is object
                                        _featurelayerJSON = response_string
                                    } else {
                                        // is string
                                        _featurelayerJSON = JSON.parse(response_string)
                                    }

                              
                                    console.log(' get feature attributes, advanced query support   ====  _featurelayerJSON', _featurelayerJSON)



/*
   arcgis server always response error message as 
                                                 { error:
                                                        code: 400
                                                        details: []
                                                        message: "Invalid URL
                                                 } 
*/
if (_featurelayerJSON.error) {
                                throw _featurelayerJSON.error.message;
}
                                                  
standardMaxRecordCount = _featurelayerJSON.standardMaxRecordCount
tileMaxRecordCount = _featurelayerJSON.tileMaxRecordCount
standardMaxRecordCountNoGeometry = _featurelayerJSON.standardMaxRecordCountNoGeometry
maxRecordCountFactor = _featurelayerJSON.maxRecordCountFactor
maxRecordCount = _featurelayerJSON.maxRecordCount

                                             _supportsAdvancedQueries  =  _featurelayerJSON.supportsAdvancedQueries
                                             _supportsStatistics       =  _featurelayerJSON.supportsStatistics
     
                                             if (_featurelayerJSON.advancedQueryCapabilities){
     
                                                      _supportsCountDistinct  = _featurelayerJSON.advancedQueryCapabilities.supportsCountDistinct
                                                      _supportsDistinct       = _featurelayerJSON.advancedQueryCapabilities.supportsDistinct
                                                      _supportsHavingClause   = _featurelayerJSON.advancedQueryCapabilities.supportsHavingClause
                                                      _supportsOrderBy        = _featurelayerJSON.advancedQueryCapabilities.supportsOrderBy
                                                      _supportsPagination     = _featurelayerJSON.advancedQueryCapabilities.supportsPagination
                                                      _useStandardizedQueries = _featurelayerJSON.advancedQueryCapabilities.useStandardizedQueries
                                                      _supportsStatistics     = _featurelayerJSON.advancedQueryCapabilities.supportsStatistics
                                                      _supportsTrueCurve      = _featurelayerJSON.advancedQueryCapabilities.supportsTrueCurve
                                                      _supportsReturningQueryExtent = _featurelayerJSON.advancedQueryCapabilities.supportsReturningQueryExtent
                                                      _supportsQueryWithDistance = _featurelayerJSON.advancedQueryCapabilities.supportsQueryWithDistance
                                                        _supportsQueryWithResultType = _featurelayerJSON.advancedQueryCapabilities.supportsQueryWithResultType
     
                                             }  
     
     



                                   if (_featurelayerJSON.hasOwnProperty("extent")){
                                    spatial_reference = _featurelayerJSON.extent.spatialReference.wkid
                                   }

                                   if (_featurelayerJSON.hasOwnProperty("fullExtent")){
                                    spatial_reference = _featurelayerJSON.fullExtent.spatialReference.wkid
                                   }

                                   if (_featurelayerJSON.hasOwnProperty("initialExtent")){
                                    spatial_reference = _featurelayerJSON.initialExtent.spatialReference.wkid
                                   }


                                                            if (_featurelayerJSON.geometryType){
                                                                  featurelayer_geometrytype = _featurelayerJSON.geometryType
                                                            } else {
                                                                  featurelayer_geometrytype = ''
                                                            }
                   









                            // warning:  .fields can be null, if layer is only raster image  
                            if (_featurelayerJSON.fields) {

                                    _feature_attributes = _featurelayerJSON.fields
                                            
                                    var arrayLength = _feature_attributes.length;

                                    for (var i = 0; i < arrayLength; i++) {
                                             
                                            var ____fieldAlias = _feature_attributes[i].alias
                                            var ____fieldType = _feature_attributes[i].type
                                            var ____fieldName = _feature_attributes[i].name
                                            var ____fieldName_lowerCase  = ____fieldName.toLowerCase();
                                            var ____fieldType_lowerCase  = ____fieldType.toLowerCase();
                                            var ____fieldAlias_lowerCase  = ____fieldAlias.toLowerCase();
                                            

                                            
                                                                                            

                                            /*
                                                            
                                                                      A string defining the field type. Available values include: 

                                                                            esriFieldTypeString

                                                                            esriFieldTypeDouble | esriFieldTypeInteger | esriFieldTypeSmallInteger

                                                                            esriFieldTypeDate

                                                                            esriFieldTypeGeometry 

                                                                            esriFieldTypeOID | esriFieldTypeGlobalID | esriFieldTypeGUID  

                                                                            esriFieldTypeRaster 

                                                                            esriFieldTypeSingle  

                                                                            esriFieldTypeBlob 

                                                                            esriFieldTypeXML

                                                                    https://developers.arcgis.com/documentation/common-data-types/field.htm


                                                                                              0: {name: "Shape", type: "esriFieldTypeGeometry", alias: "Shape", domain: null}
                                                                                              1: {name: "ZoneCode", type: "esriFieldTypeString", alias: "ZoneCode", length: 3, domain: null}
                                                                                              2: {name: "ZoneName", type: "esriFieldTypeString", alias: "ZoneName", length: 254, domain: null}
                                                                                              3: {name: "Shape_Leng", type: "esriFieldTypeDouble", alias: "Shape_Leng", domain: null}
                                                                                              4: {name: "CityName", type: "esriFieldTypeString", alias: "CityName", length: 254, domain: null}
                                                                                              5: {name: "Shape_Area", type: "esriFieldTypeDouble", alias: "Shape_Area", domain: null}
                                                                                              6: {name: "Shape_Le_1", type: "esriFieldTypeDouble", alias: "Shape_Le_1", domain: null}
                                                                                              7: {name: "OBJECTID", type: "esriFieldTypeOID", alias: "OBJECTID", domain: null}
                                                                                              8: {name: "Shape_Length", type: "esriFieldTypeDouble", alias: "Shape_Length", domain: null}

                                            */

                                                                                              
                                            if     (
                                                                                                    
                                                                                  // skip geometry field "SHAPE", "SHAPE.LEN", "SHAPE.AREA"
                                                                                  (____fieldName_lowerCase.includes('shape') ) ||
                                                                                  (____fieldType_lowerCase.includes('geometry') ) ||

                                                                                  // skip all ID field , esriFieldTypeOID | esriFieldTypeGlobalID | esriFieldTypeGUID  
                                                                                  (____fieldType_lowerCase.includes('id') )  ||
                                                                                  (____fieldName_lowerCase.includes('fid') ) ||
                                                                                  (____fieldName_lowerCase.includes('oid') ) ||
                                                                                  (____fieldName_lowerCase.includes('objectid') ) ||
                                                                                  (____fieldName_lowerCase.includes('guid') ) ||
                                                                                  (____fieldName_lowerCase.includes('globalid') ) ||

                                                                                  // skip below field
                                                                                  (____fieldType_lowerCase.includes('raster') )  ||
                                                                                  (____fieldType_lowerCase.includes('blob') )  ||
                                                                                  (____fieldType_lowerCase.includes('xml') ) 

                                                                                  

                                                    ) 
                                            { 

                                                          // skip esri geometry, shape, object-id,etc.. field


                                            } else {  
                                                              field_name.push(____fieldName)


                                                          
                                                              // not use 0,1,2, as index key, 
                                                              //field_type.push(____fieldType)

                                                              // in use, field name as index key
                                                              field_type[____fieldName] = ____fieldType
                                                              field_alias[____fieldName] = ____fieldAlias
                                                             




                                                      
                                                          if (____fieldType_lowerCase.includes('string')){  

                                                                                    _feature_attributes_string.push(____fieldName)
                                                        
                                                          } else if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ){

                                                                                    _feature_attributes_integer.push(____fieldName)
                                                        
                                                          } else if (____fieldType_lowerCase.includes('date') ){

                                                                                    _feature_attributes_date.push(____fieldName)
                                                        
                                                          }// if

                                          }// if 

                                                            
                                      }// for

                                          console.log(' text field name array : ',   _feature_attributes_string)
                                          console.log(' number field name array : ', _feature_attributes_integer)
                                          console.log(' date field name array : ', _feature_attributes_date)

                                          console.log('field type object based on field name as key : ', field_type)
                                                        console.log('all displaying mixed field name : ', field_name)  

                            }




                            // update object id field name
                            if (_featurelayerJSON.objectIdField){
                                  objectid_field_name = _featurelayerJSON.objectIdField
                            } else {
                                     if (_featurelayerJSON.fields) {
                                      _feature_attributes = _featurelayerJSON.fields
                                      for (var i = 0; i < _feature_attributes.length; i++) {
                                        if ((_feature_attributes[i].type == 'esriFieldTypeOID')
                                            || (_feature_attributes[i].alias == 'OBJECTID')){
                                              objectid_field_name = _feature_attributes[i].name
                                              break;
                                          }//if
                                        }//for
                                      }//if
                            }//if object-id
                            


                            // update layer name           
                            _layer = _featurelayerJSON.name   
                            document.title = _layer   
                            update_url_parameter('layer',_layer )  


                  
                        


                  } 





                  function display_count_info(_subject, ___showing_cnt, ___all_cnt, ____rendering_cnt){


                    $('#layer-info-vertical').html('<a  target="_blank" href="' + _url +  '/' + _layer_id +'">' + _subject + '</a>')

                    console.log(' update statistic info', ___showing_cnt, ___all_cnt)

                    if (isNaN(___showing_cnt)){ ___showing_cnt = '...' } // not available...
                    if (isNaN(___all_cnt)){ ___all_cnt = '...' } // not available...
                    
                    $('#feature-on-map').html(___showing_cnt)
                    $('#total-feature').html(___all_cnt)
                    $('#rendering-feature').html(____rendering_cnt)
                  }








                  
            // rest api specific, this is only for arcgis rest api
            function show_count(data_count_only){



              //{ 'count': 1661}

              // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
              //is already a plain JavaScript object; no need to try to parse it.
             
              if (typeof data_count_only === 'object') {
                  // is object
                  _current_area_count_of_feature = data_count_only.count
              } else {
                  // is string
                  _current_area_count_of_feature = JSON.parse(data_count_only).count
              }
              



              
              display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)
             

            }



                  // only for total count ,
                  function get_count(__raw_count){

                          
                                                        
                    //{ 'count': 1661}

                    // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                    //is already a plain JavaScript object; no need to try to parse it.
                    var data_count
                    if (typeof __raw_count === 'object') {
                        // is object
                        data_count = __raw_count.count
                    } else {
                        // is string
                        data_count = JSON.parse(__raw_count).count
                    }
                  
                    return data_count

                  }




                 // newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy 
                 async function get_total_count(){


                    /*    
                    var SWlong = globe_bounding_box.coordinates[0][0][0];
                    var SWlat  = globe_bounding_box.coordinates[0][0][1];
                    var NElong = globe_bounding_box.coordinates[0][2][0];
                    var NElat  = globe_bounding_box.coordinates[0][2][1];
                      
                    

                    //-------------- arcgis server, rest API --------------------------------

                    // this is bad request, should not use layerDefs={'0':''}, instead should use FeatureServer/0/query?...
                    // http://services3.arcgis.com/VILr8UqX00eNAkeO/arcgis/rest/services/Parcels/FeatureServer/query?layerDefs={'0':''}&returnGeometry=true&f=json&geometryType=esriGeometryEnvelope&geometry={'xmin' : -117.923158, 'ymin' : 33.644081, 'xmax' : -117.921436, 'ymax' : 33.645157,'spatialReference' : {'wkid' : 4326}}
                    
                    // this is good one
                    // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=ASSETID = 1723459
                    // must specify &outSR=4326& in URL, because gis layer default srid is NOT 4326
                    // srid=4326 is only srid for lat long


                    // esri, by default, use esri:102100, 
                    //_envelope_111 = '{"spatialReference":{"latestWkid":3857,"wkid":102100},"xmin":-9178558.356484555,"ymin":3240929.9992936105,"xmax":-9177335.364031991,"ymax":3242152.991746176}';
                    
                    //var _envelope = '{"xmin" : -117.923158, "ymin" : 33.644081, "xmax" : -117.921436, "ymax" : 33.645157,"spatialReference" : {"wkid" : 4326}}';
                    var _envelope_un_encode ='{"spatialReference":{"wkid":4326}, "xmin" : '+ SWlong +', "ymin" : '+ SWlat + ', "xmax" : '+NElong +', "ymax" : '+ NElat + '}';
                    
                    // fix bug, _envelope must encodeURI( ), without this some city (tampagov.net)
                    // will show no-cross origine error, the real problem is envelope need encode
                    
                  var _envelope = encodeURI(_envelope_un_encode);
                  //  console.log('_envelope --- encoded >>>', _envelope)

                    
                    // Note: must specify outFields=*, in order to get all properties, without this, properties= null
                    var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&geometryType=esriGeometryEnvelope&geometry='+ _envelope;
                    

                    //--------- End ----- arcgis server, rest API --------------------------------
                    
                  */




                              






                  
            // use where=1=1 ,  will get total count only ,   (where=FID>0 , where=objectid>0 also can, but not every layer have FID or objectid, you could run into error if layer do not have FID, or objectid) 
            //var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&where=1=1';
            
              /*
                                    https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm

                                    only works from 10.8.1, 
                                    but if 10.7 or lower, no error, just not fast, same as where=1=1

                                      Non-hosted feature services published from ArcGIS Pro support an optimization for getting a layer's row count. 
                                      By setting where as 9999=9999 and returnCountOnly as true, the result is an approximate count that is returned very quickly. 
                                      For accurate, but slower to return, row counts, use any other filter (e.g. where: 1=1). 
                                      This is only supported when a layer has both isDataVersioned and isDataArchived as false.
              */ 
            var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&where=9999=9999';
            

                                

            var _total_count_result_json





            // newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy 
            try {

              // cors
              var response_string =  await $.ajax({ 
                type: 'GET',
              
                url: _url_total_countonly,

                error: function (jqXHR, textStatus, errorThrown) {
                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                      console.log('ajax error  + ', _error_status);
                },

                success: function (data) {
                  console.log('get total count --> cors --> success  --> ');
                }

              });  // await
            } catch(cors_failed) {

                    console.log('get total count  --> cors failed !!!!!!', cors_failed);

                    try {         
                          // jsonp 
                          var response_string =  await $.ajax({
                            type: 'GET',
                            dataType: 'jsonp',
                            data: {},

                            url: _url_total_countonly,

                            error: function (jqXHR, textStatus, errorThrown) {
                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                  console.log('ajax error  + ', _error_status);
                            },

                            success: function (data) {
                              console.log('get total count --> jsonp --> success  --> ');
                            }

                    });  // await
    
                    } catch(jsonp_failed) {

                              console.log('get total count  --> jsonp failed !!!!!!', jsonp_failed);

                              try {

                                        

                                        // proxy
                                        // --------- add proxy  ---------
                                        var _url_total_countonly_proxy = proxyurl +  _url_total_countonly

                                        var response_string =  await $.ajax({
                                          type: 'GET',
                                    
                                          url: _url_total_countonly_proxy,
      
                                          error: function (jqXHR, textStatus, errorThrown) {
                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                console.log('ajax error  + ', _error_status);
                                          },
      
                                          success: function (data) {
                                            console.log('get total count --> proxy --> success  --> ');
                                          }
      
                                  });  // await



                                } catch(proxy_failed) {


                                  console.log('get total count  --> proxy failed !!!!!!', proxy_failed);



                                } // catch proxy
                          

                    } // catch cors


            } // catch jsonp





            
                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                          if (typeof response_string === 'object') {
                              // is object
                              _total_count_result_json = response_string
                          } else {
                              // is string
                              _total_count_result_json = JSON.parse(response_string)
                          }



                          console.log('try get total count, success ', _total_count_result_json);
                                
                          _total_count_of_feature = get_count(_total_count_result_json)

                      
                          display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)





                  }   





                  // reverse pan-to-your-current-location
                  function zoom_to_layer() {

                                  

                    var zoomToLayerButton = document.getElementById("zoomToLayer_button");

                    zoomToLayerButton.addEventListener("click", () => {

                      pan_to_real_location();  

                    });


                  }



                  function reduce_feature_count(___arcgis_feature_Set, ___reduced_feature_count){
                
                    //  console.log('___arcgis_feature_Set', ___arcgis_feature_Set)

                      var __features_array = ___arcgis_feature_Set.features
                

                      if ( __features_array.length > ___reduced_feature_count) {

                        __features_array.length = ___reduced_feature_count

                      }
                    

                      ___arcgis_feature_Set.features = __features_array;



                      console.log(' after reduced feature count === ', ___arcgis_feature_Set.features.length)

            return ___arcgis_feature_Set



                  

                  }  




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





// newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy
// microsoft only - microsoft only - microsoft only
async function use_sample_feature(){// microsoft only - microsoft only - microsoft only


                            


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


// newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy
try {

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

                                                          // api https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.data.boundingbox?view=azure-maps-typescript-latest#azure-maps-control-atlas-data-boundingbox-fromlatlngs
                                                          // both works
                                                          //latlngList.push(new atlas.data.Position(_center_long, _center_lat));
                                                          latlngList.push({Latitude:_center_lat, Longitude:_center_long});

                                                          console.log(' fit bound point lat lng List', latlngList)

                                                        }//if type = point

                                                        if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multipoint')){
                                                                        // add all point into list for later fit bound
                                                                        var line_coordinate = _one_sample_geometry.coordinates
                                                                        for (let c = 0; c < line_coordinate.length; c++) {
                                                                          
                                                                          // both works
                                                                          //latlngList.push(new atlas.data.Position(line_coordinate[c][0], line_coordinate[c][1]));    // geojson coordinate pair is (long, lat)
                                                                          latlngList.push({Latitude:line_coordinate[c][1],  Longitude:line_coordinate[c][0]});    // geojson coordinate pair is (long, lat)
                                                                       
                                                                        }
                                                                        console.log(' fit bound line lat lng List', latlngList)
                                                        }//if type = line 

                                                        if ((_the_geom_type == 'polygon') || (_the_geom_type == 'multilinestring')){
                                                                // add all point into list for later fit bound
                                                                var polygon_coordinate_level3 = _one_sample_geometry.coordinates
                                                                for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                        var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                        for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                         
                                                                          // both works
                                                                          //latlngList.push(new atlas.data.Position(polygon_coordinate_level2[p2][0], polygon_coordinate_level2[p2][1]));    // geojson coordinate pair is (long, lat)
                                                                          latlngList.push({Latitude:polygon_coordinate_level2[p2][1], Longitude:polygon_coordinate_level2[p2][0]});    // geojson coordinate pair is (long, lat)
                                                                        
                                                                        
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

                                                                                        // both works
                                                                                        //latlngList.push(new atlas.data.Position(polygon_coordinate_level2[p2][0], polygon_coordinate_level2[p2][1]));    // geojson coordinate pair is (long, lat)
                                                                                        latlngList.push({Latitude:polygon_coordinate_level2[p2][1], Longitude:polygon_coordinate_level2[p2][0]});    // geojson coordinate pair is (long, lat)
                                                                                      
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


                                                      // sample https://stackoverflow.com/questions/60835006/zoom-and-center-map-to-fit-all-features-on-bubble-layer
                                                      map.setCamera({

                                                        // both works
                                                        //bounds: atlas.data.BoundingBox.fromPositions(latlngList),
                                                        bounds: atlas.data.BoundingBox.fromLatLngs(latlngList),
                                                        padding: 20

                                                      });
                                                      
                                                    
                                                      
                                                      if (map.getCamera().zoom > zoom2feature_noMoreThan){
                                                        // set zoom level
                                                        map.setCamera({
                                                          zoom: zoom2feature_noMoreThan 
                                                        });
                                                      }
                                                      

                                                } else {

                                                  console.log('pan-to-real-location calculated - lat - long - : ', _center_lat, _center_long )
                                                
                                                  // both works
                                                  //var latLng = new atlas.data.Position(_center_long, _center_lat,);
                                                  var latLng = {Latitude:_center_lat, Longitude:_center_long};

                                                  map.setCamera({
                                                    center: latLng,
                                                    zoom:   zoom2feature_zoomLevel,
                                                  });

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
                                _zoom_beforeLayerExtent = map.getCamera().zoom;
                                console.log( '_zoom_beforeLayerExtent ......... ', _zoom_beforeLayerExtent)
                                                                                            
                                // will map.fitBound(),  must use await because this function call ajax, need to wait until resolve promise. 
                                await zoom_to_esri_extent(_layer_extent_object)

                                _zoom_afterLayerExtent = map.getCamera().zoom;
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

                            _zoom_afterServerExtent = map.getCamera().zoom;
                            console.log( '_zoom_afterServerExtent ......... ', _zoom_afterServerExtent)
                }

}







  





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
    _center_zoom = parseInt(map.getCamera().zoom)

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
//  --- end  ---  Microsoft feature layer    --- 
/**/




















                  /**/
                  //   --- --- --- --- color scale  --- --- --- --- warning, google dynamiclayer must use xxx_for_esri_color only
                  /**/



                  var esri_possible_numeric_field_type_array = ['esriFieldTypeBigInteger', 'esriFieldTypeDouble', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeSmallInteger']

                  // 5 class, element 0 is not used,
                  var line_stroke_weight = [1,2,5,10,15,20]
                  var point_marker_size_radius = [1,5,10,15,20,25]
                  
                                 
                  
                
                  var color_scale_outline_width = 1
                  var color_scale_outline_color = 'rgba(0,0,0, 0.9)'  // black
                  var color_scale_outline_color_for_esri_color = [0,0,0, 240]  // black


                  var color_scale_name_index = [
                      
                      'colorScale_red',
                      'colorScale_blue',
                      'colorScale_pink',
                      'colorScale_purple',
                      'colorScale_orange',
                      'colorScale_violet',
                      'colorScale_yellow',
                      'colorScale_slateblue',
                      'colorScale_green',
                      'colorScale_brown',
                      'colorScale_teal',
                      'colorScale_turquoise',
                      'colorScale_tan',
                      'colorScale_gray',

                  ];

                  var color_scale = {

                   
                    
                      
                      'colorScale_red': [
                              'rgba(255, 160, 122, 0.98)',   // LightSalmon
                              'rgba(250, 128, 114, 0.98)',   // Salmon
                              'rgba(205, 92, 92, 0.98)',   // IndianRed
                              'rgba(255, 0, 0, 0.98)',   // Red
                              'rgba(178, 34, 34, 0.98)',   // FireBrick
                              'rgba(139, 0, 0, 0.98)',   // DarkRed
                            ],


                      'colorScale_blue' :[
                              'rgba(135, 206, 250, 0.98)',   // LightSkyBlue
                              'rgba(135, 206, 250, 0.98)',   // LightSkyBlue
                              'rgba(0, 191, 255, 0.98)',   // DeepSkyBlue
                              'rgba(0, 0, 255, 0.98)',   // Blue
                              'rgba(0, 0, 169, 0.98)',   // DarkBlue
                              'rgba(0, 0, 98, 0.98)',   // Navy
                            ],



                      'colorScale_pink' :[
                                'rgba(255, 182, 193, 0.98)',   // LightPink
                                'rgba(255, 192, 203, 0.98)',   // Pink
                                'rgba(255, 105, 180, 0.98)',   // HotPink
                                'rgba(255, 20, 147, 0.98)',   // DeepPink
                                'rgba(219, 112, 147, 0.98)',   // PaleVioletRed
                                'rgba(199, 21, 133, 0.98)',   // MediumVioletRed
                              ], 


                     'colorScale_purple' :[
                                'rgba(230, 230, 250, 0.98)',   // Lavender
                                'rgba(230, 230, 250, 0.98)',   // Lavender
                                'rgba(221, 160, 221, 0.98)',   // Plum
                                'rgba(255, 0, 255, 0.98)',   // Fuchsia
                                'rgba(147, 112, 219, 0.98)',   // MediumPurple
                                'rgba(128, 0, 128, 0.98)',   // Purple
                              ],



                      'colorScale_orange' :[
                                    'rgba(255, 127, 80, 0.98)',   // Coral
                                    'rgba(255, 160, 122, 0.98)',   // LightSalmon
                                    'rgba(255, 165, 0, 0.98)',   // Orange
                                    
                                    'rgba(255, 140, 0, 0.98)',   // DarkOrange
                                    'rgba(255, 99, 71, 0.98)',   // Tomato
                                    'rgba(255, 69, 0, 0.98)',   // OrangeRed
                                  ],


                      'colorScale_violet' :[
                                    'rgba(230, 230, 250, 0.98)',   // Lavender
                                    'rgba(238, 130, 238, 0.98)',   // Violet
                                    'rgba(255, 0, 255, 0.98)',   // Fuchsia
                                    'rgba(138, 43, 226, 0.98)',   // BlueViolet
                                    'rgba(148, 0, 211, 0.98)',   // DarkViolet
                                    'rgba(75, 0, 130, 0.98)',   // Indigo
                                  ],

                 
                   'colorScale_yellow' :[
                                'rgba(255, 250, 205, 0.98)',   // LemonChiffon
                                'rgba(255, 255, 224, 0.98)',   // LightYellow
                                'rgba(240, 230, 140, 0.98)',   // Khaki
                                'rgba(255, 255, 0, 0.98)',   // Yellow
                                'rgba(255, 215, 0, 0.98)',   // Gold
                                'rgba(189, 183, 107, 0.98)',   // DarkKhaki
                              ],


                    'colorScale_slateblue' :[
                                  'rgba(230, 230, 250, 0.98)',   // Lavender
                                  'rgba(230, 230, 250, 0.98)',   // Lavender
                                  'rgba(255, 0, 255, 0.98)',   // Magenta
                                  'rgba(123, 104, 238, 0.98)',   // MediumSlateBlue
                                  'rgba(106, 90, 205, 0.98)',   // SlateBlue
                                  'rgba(72, 61, 139, 0.98)',   // DarkSlateBlue
                                ],

                      'colorScale_green' :[
                                  'rgba(144, 238, 144, 0.98)',   // LightGreen
                                  'rgba(144, 238, 144, 0.98)',   // LightGreen
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(60, 179, 113, 0.98)',   // MediumSeaGreen
                                  'rgba(0, 128, 0, 0.98)',   // Green
                                  'rgba(0, 100, 0, 0.98)',   // DarkGreen
                                ],

                      'colorScale_brown' :[
                                  'rgba(244, 164, 96, 0.98)',   // SandyBrown
                                  'rgba(244, 164, 96, 0.98)',   // SandyBrown
                                  'rgba(210, 105, 30, 0.98)',   // Chocolate
                                  'rgba(160, 82, 45, 0.98)',   // Sienna
                                  'rgba(165, 42, 42, 0.98)',   // Brown
                                  'rgba(128, 0, 0, 0.98)',   // Maroon
                                ],


                      'colorScale_teal' :[
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(102, 205, 170, 0.98)',   // MediumAquamarine
                                  'rgba(32, 178, 170, 0.98)',   // LightSeaGreen
                                  'rgba(0, 139, 139, 0.98)',   // DarkCyan
                                  'rgba(0, 98, 98, 0.98)',   // Teal
                                ],



                    

                     'colorScale_turquoise' :[
                                  'rgba(224, 255, 255, 0.98)',   // LightCyan
                                  'rgba(224, 255, 255, 0.98)',   // LightCyan
                                  'rgba(175, 238, 238, 0.98)',   // PaleTurquoise
                                  'rgba(64, 224, 208, 0.98)',   // Turquoise
                                  'rgba(0, 206, 209, 0.98)',   // DarkTurquoise
                                  'rgba(70, 130, 180, 0.98)',   // SteelBlue
                                ],


                    


                   'colorScale_tan' :[
                                  'rgba(255, 248, 220, 0.98)',   // Cornsilk
                                  'rgba(255, 248, 220, 0.98)',   // Cornsilk
                                  'rgba(245, 222, 179, 0.98)',   // Wheat
                                  'rgba(210, 180, 140, 0.98)',   // Tan
                                  'rgba(188, 143, 143, 0.98)',   // RosyBrown
                                  'rgba(139, 69, 19, 0.98)',   // SaddleBrown
                                ],



                   'colorScale_gray' :[
                                  'rgba(245, 245, 245, 0.98)',   // WhiteSmoke
                                  'rgba(245, 245, 245, 0.98)',   // WhiteSmoke
                                  'rgba(211, 211, 211, 0.98)',   // LightGray
                                  'rgba(169, 169, 169, 0.98)',   // DarkGray
                                  'rgba(112, 128, 144, 0.98)',   // SlateGray
                                  'rgba(47, 79, 79, 0.98)',   // DarkSlateGray
                                ],

                  }




                  var color_scale_for_esri_color = {

                   
                    
                      
                    'colorScale_red': [
                            [255, 160, 122, 240],   // LightSalmon
                            [250, 128, 114, 240],   // Salmon
                            [205, 92, 92, 240],   // IndianRed
                            [255, 0, 0, 240],   // Red
                            [178, 34, 34, 240],   // FireBrick
                            [139, 0, 0, 240],   // DarkRed
                          ],


                    'colorScale_blue' :[
                            [135, 206, 250, 240],   // LightSkyBlue
                            [135, 206, 250, 240],   // LightSkyBlue
                            [0, 191, 255, 240],   // DeepSkyBlue
                            [0, 0, 255, 240],   // Blue
                            [0, 0, 169, 240],   // DarkBlue
                            [0, 0, 98, 240],   // Navy
                          ],



                    'colorScale_pink' :[
                              [255, 182, 193, 240],   // LightPink
                              [255, 192, 203, 240],   // Pink
                              [255, 105, 180, 240],   // HotPink
                              [255, 20, 147, 240],   // DeepPink
                              [219, 112, 147, 240],   // PaleVioletRed
                              [199, 21, 133, 240],   // MediumVioletRed
                            ], 


                   'colorScale_purple' :[
                              [230, 230, 250, 240],   // Lavender
                              [230, 230, 250, 240],   // Lavender
                              [221, 160, 221, 240],   // Plum
                              [255, 0, 255, 240],   // Fuchsia
                              [147, 112, 219, 240],   // MediumPurple
                              [128, 0, 128, 240],   // Purple
                            ],



                    'colorScale_orange' :[
                                  [255, 127, 80, 240],   // Coral
                                  [255, 160, 122, 240],   // LightSalmon
                                  [255, 165, 0, 240],   // Orange
                                  
                                  [255, 140, 0, 240],   // DarkOrange
                                  [255, 99, 71, 240],   // Tomato
                                  [255, 69, 0, 240],   // OrangeRed
                                ],


                    'colorScale_violet' :[
                                  [230, 230, 250, 240],   // Lavender
                                  [238, 130, 238, 240],   // Violet
                                  [255, 0, 255, 240],   // Fuchsia
                                  [138, 43, 226, 240],   // BlueViolet
                                  [148, 0, 211, 240],   // DarkViolet
                                  [75, 0, 130, 240],   // Indigo
                                ],

               
                 'colorScale_yellow' :[
                              [255, 250, 205, 240],   // LemonChiffon
                              [255, 255, 224, 240],   // LightYellow
                              [240, 230, 140, 240],   // Khaki
                              [255, 255, 0, 240],   // Yellow
                              [255, 215, 0, 240],   // Gold
                              [189, 183, 107, 240],   // DarkKhaki
                            ],


                  'colorScale_slateblue' :[
                                [230, 230, 250, 240],   // Lavender
                                [230, 230, 250, 240],   // Lavender
                                [255, 0, 255, 240],   // Magenta
                                [123, 104, 238, 240],   // MediumSlateBlue
                                [106, 90, 205, 240],   // SlateBlue
                                [72, 61, 139, 240],   // DarkSlateBlue
                              ],

                    'colorScale_green' :[
                                [144, 238, 144, 240],   // LightGreen
                                [144, 238, 144, 240],   // LightGreen
                                [0, 250, 154, 240],   // MediumSpringGreen
                                [60, 179, 113, 240],   // MediumSeaGreen
                                [0, 128, 0, 240],   // Green
                                [0, 100, 0, 240],   // DarkGreen
                              ],

                    'colorScale_brown' :[
                                [244, 164, 96, 240],   // SandyBrown
                                [244, 164, 96, 240],   // SandyBrown
                                [210, 105, 30, 240],   // Chocolate
                                [160, 82, 45, 240],   // Sienna
                                [165, 42, 42, 240],   // Brown
                                [128, 0, 0, 240],   // Maroon
                              ],


                    'colorScale_teal' :[
                                [0, 250, 154, 240],   // MediumSpringGreen
                                [0, 250, 154, 240],   // MediumSpringGreen
                                [102, 205, 170, 240],   // MediumAquamarine
                                [32, 178, 170, 240],   // LightSeaGreen
                                [0, 139, 139, 240],   // DarkCyan
                                [0, 98, 98, 240],   // Teal
                              ],



                  

                   'colorScale_turquoise' :[
                                [224, 255, 255, 240],   // LightCyan
                                [224, 255, 255, 240],   // LightCyan
                                [175, 238, 238, 240],   // PaleTurquoise
                                [64, 224, 208, 240],   // Turquoise
                                [0, 206, 209, 240],   // DarkTurquoise
                                [70, 130, 180, 240],   // SteelBlue
                              ],


                  


                 'colorScale_tan' :[
                                [255, 248, 220, 240],   // Cornsilk
                                [255, 248, 220, 240],   // Cornsilk
                                [245, 222, 179, 240],   // Wheat
                                [210, 180, 140, 240],   // Tan
                                [188, 143, 143, 240],   // RosyBrown
                                [139, 69, 19, 240],   // SaddleBrown
                              ],



                 'colorScale_gray' :[
                                [245, 245, 245, 240],   // WhiteSmoke
                                [245, 245, 245, 240],   // WhiteSmoke
                                [211, 211, 211, 240],   // LightGray
                                [169, 169, 169, 240],   // DarkGray
                                [112, 128, 144, 240],   // SlateGray
                                [47, 79, 79, 240],   // DarkSlateGray
                              ],

                }


                  /**/
                  //   --- --- end --- --- color scale  --- --- --- ---  
                  /**/





/**/
// -------------- search result paging or not  --------------
/**/

var _search_result_paging_or_not = 'paging'  // 'not_paging'

/**/
//  -------------- end  -------------- search result paging or not  --------------
/**/


var pegman_follow_you_or_not = 'follow' // 'not_follow'

/**/
// -------------- Street View Coverage Layer  --------------
/**/


/**/
//  -------------- end  -------------- Street View Coverage Layer --------------
/**/








/**/
// - - - - dynamic layer  - - - - 
/**/


// default blue 
var polygonFillBy = 'blue-diagonal-cross' //'original-color' 
var param_polygonFillBy


var current_fillColor = 'rgba(0, 200, 255, 0.87)'     // teal
var current_outlineColor = 'rgba(0, 0, 255, 0.87)'       // blue 
var current_outlineWidth = 1   // array[6] = 5
var current_outlinePattern = 0  // solid
var current_simplefillPattern = 2  // esriSFSDiagonalCross
var current_pointSize = 24       // array[4] = 24
var current_pointShape = 0      // circle



/**/
//   ###  ###  ### width size  ###  ###  ###

     
      // Simple Line Symbol (esriSLS) https://developers.arcgis.com/web-map-specification/objects/esriSLS_symbol/
      var pattern_simpleLineSymbol_array = ['Solid', 'Dash', 'Dash Dot', 'Dash Dot Dot', 'Dot', 'Long Dash', 'Long Dash Dot', 'Short Dash','Short Dash Dot', 'Short Dash Dot Dot','Short Dot','Null']
      var pattern_simpleLineSymbol_esriSLS_array = ['esriSLSSolid', 'esriSLSDash', 'esriSLSDashDot', 'esriSLSDashDotDot', 'esriSLSDot', 'esriSLSLongDash', 'esriSLSLongDashDot', 'esriSLSShortDash','esriSLSShortDashDot', 'esriSLSShortDashDotDot','esriSLSShortDot','esriSLSNull']
      
      // Simple Fill Symbol (esriSFS) https://developers.arcgis.com/rest/services-reference/enterprise/symbol-objects/
      var pattern_simpleFillSymbol_array = ['Backward Diagonal', 'Cross', 'Diagonal Cross', 'Forward Diagonal', 'Horizontal', 'Null', 'Solid', 'Vertical']
      var pattern_simpleFillSymbol_esriSFS_array = ['esriSFSBackwardDiagonal', 'esriSFSCross', 'esriSFSDiagonalCross', 'esriSFSForwardDiagonal', 'esriSFSHorizontal', 'esriSFSNull', 'esriSFSSolid', 'esriSFSVertical']

      // Simple Marker Symbol (esriSMS) https://developers.arcgis.com/web-map-specification/objects/esriSMS_symbol/
      var shape_array = ['Circle', 'Cross', 'Diamond', 'Square', 'Triangle', 'X']
      var shape_esriSMS_array = ['esriSMSCircle', 'esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSTriangle', 'esriSMSX']

//   ###  ###  ### width size  ###  ###  ###
/**/




        var polygon_renderer = {
                                    "type":"simple",
                                    "symbol":{
                                                "color": esri_rgba_color_array[current_fillColor],  //[0,112,255,255],
                                                "outline":{
                                                                "color": esri_rgba_color_array[current_outlineColor],  //[255,255,0,255],
                                                                "width": current_outlineWidth, //4.5,
                                                                "type": "esriSLS",
                                                                "style": pattern_simpleLineSymbol_esriSLS_array[current_outlinePattern], //"esriSLSSolid"
                                                },
                                                "type":"esriSFS",  // Simple Fill Symbol (esriSFS)
                                                "style":pattern_simpleFillSymbol_esriSFS_array[current_simplefillPattern], // esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical  
                                    }
                                }



        var line_renderer = {
                                "type":"simple",
                                "symbol":{
                                    "color": esri_rgba_color_array[current_fillColor],  //[0,92,230,255],
                                    "width": current_outlineWidth, //4.5,
                                    "type":"esriSLS",   // Simple Line Symbol (esriSLS)
                                    "style": pattern_simpleLineSymbol_esriSLS_array[current_outlinePattern], //"esriSLSSolid"
                                }
                            }


        
        var point_renderer = {
                                "type":"simple",
                                "symbol":{
                                    "color": esri_rgba_color_array[current_fillColor],  //[0,77,168,128],
                                    "size":  current_pointSize, //10,
                                    "angle":0,
                                    "xoffset":0,
                                    "yoffset":0,
                                    "type":"esriSMS",
                                    "style": shape_esriSMS_array[current_pointShape],  //"esriSMSCircle",

                                    "outline":{
                                        "color": esri_rgba_color_array[current_outlineColor],  //[230,230,0,255],
                                        "width": current_outlineWidth, //4.5,
                                        "type": "esriSLS",
                                        "style": pattern_simpleLineSymbol_esriSLS_array[current_outlinePattern], //"esriSLSSolid"
                                    }
                                }
                            }


   var template_polygon_renderer = {
                              "type":"simple",
                              "symbol":{
                                          "color":[0,112,255,255],
                                          "outline":{
                                                          "color":[255,255,0,255],
                                                          "width":4.5,
                                                          "type":"esriSLS",
                                                          "style":"esriSLSSolid"
                                          },
                                          "type":"esriSFS",  // Simple Fill Symbol (esriSFS)
                                          "style":"esriSFSSolid", // esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical 
                              }
                          }



  var template_line_renderer = {
                          "type":"simple",
                          "symbol":{
                              "color":[0,92,230,255],
                              "width":4.5,
                              "type":"esriSLS",   // Simple Line Symbol (esriSLS)
                              "style":"esriSLSSolid"
                          }
                      }


  
  var template_point_renderer = {
                          "type":"simple",
                          "symbol":{
                              "color":[0,77,168,128],
                              "size":10,
                              "angle":0,
                              "xoffset":0,
                              "yoffset":0,
                              "type":"esriSMS",
                              "style":"esriSMSCircle",

                              "outline":{
                                  "color":[230,230,0,255],
                                  "width":4.5,
                                  "type":"esriSLS",
                                  "style":"esriSLSSolid"
                              }
                          }
                      }




        
        var current_geometryType = ''

        var dynamicLayers_string = ''

        var dynamicLayers_string_encoded = ''

        
        var editor_dynamicLayers_array 
        var dynamicLayers_array = [
                                              {
                                                  "id":1,
                                                  "name":"parks_trail",

                                                  "source": {
                                                                  "type":"mapLayer",
                                                                  "mapLayerId":1
                                                            },
                                                            
                                                  "definitionExpression": "",   // example: "definitionExpression": "STVR='allow'",

                                                  "drawingInfo": {
                                                                    "renderer": polygon_renderer,   // default is empty string, will change later depending on feature type(line,point, polygon)
                                                                    "showLabels":false,
                                                                 },  

                                                    "minScale":0,
                                                    "maxScale":0
                                                }
                                        ]



/**/
//  - - - -  end  - - - -  dynamic layer   - - - - 
/**/

































          //  1 keyword search, not for multiple keywords, for example "region 10"
          function build_where_condition_single_keyword(_search_keyword, _clause_Operator){
            // standard 'where-condition' for all arcgis rest api both type 'table' or 'feature layer' 
            console.log('what field is string type . . .1 keyword search :', _feature_attributes_string)
            console.log('what field is number type . . .1 keyword search :', _feature_attributes_integer)

            var where_condition = ''

            // step 1) no matter what, first always treat search keyword as string,  
                    // no matter is number or string, always treat as 'string' first
                    for (var i = 0; i < _feature_attributes_string.length; i++) {
                          if (i>0){ where_condition +=  ' or '}
                          if (_clause_Operator == 'like'){            
                              // slow,   'like' cost 10 times expensive than '=' 
                              // %	Any string of zero or more characters.	WHERE title LIKE '%computer%' finds all book titles with the word 'computer' anywhere in the book title.
                              where_condition += 'LOWER( ' + _feature_attributes_string[i] + " ) like '%" + _search_keyword.toLowerCase() + "%'";
                          } else if (_clause_Operator == 'equal') {
                              // exact field match , full field match only
                              where_condition += 'LOWER( ' + _feature_attributes_string[i] + " ) = '" + _search_keyword.toLowerCase() + "'";
                          }// if
                    }// for

            // step 2) if is number must add integer field at the end, 
            if (isNaN(_search_keyword)){
                // not a number, string
            } else {
                // is number 12345, must add attributes_integer = xxx
                for (var i = 0; i < _feature_attributes_integer.length; i++) {
                        where_condition += ' or ' // always add or, because it append to previous clause
                        where_condition += _feature_attributes_integer[i] + ' = ' + _search_keyword 
                }// for
            }//if
              
            // fix bug, if search keywords have number, for example 18T,  where =  like '%18T' %18 becomes special char. 
            // so must encode where condition before send to url
            var encoded_where_condition = encodeURI(where_condition); 

            // only when directly use arcgis REST api, send where clause via URL, need encode, 
            return encoded_where_condition

            // arcgis v4.x use feature filter set where clause, no need encode.
            //return where_condition
          }
          




          // for all arcgis rest api both type 'table' or 'feature layer' , for multiple keywords 
          function build_where_condition_multiple_keyword(_search_keyword, _clause_Operator){

           console.log('what field is string type . . .multiple keywords :', _feature_attributes_string)
           console.log('what field is number type . . .multiple keywords :  ', _feature_attributes_integer)

            var where_condition = ''; 
            var __keywords_array = _search_keyword.split(" ");
            console.log(' keywords array ->  ', _search_keyword, __keywords_array)

            
          /*

                    // ============ sql server full text search =================

                                            // arcgis rest api full text search is based on sql server full text search.
                                            // not like socrata ( support full text search, for multiple keywords, example,  'wood black', will find any fields have both wood and black)

                                                          // NOT use, because most of sql server did not create full text search index
                                                          // only works when arcgis server - sql server - create full text search index.

                                                        
                                                                  https://docs.microsoft.com/en-us/sql/t-sql/queries/contains-transact-sql?view=sql-server-ver15

                                                                      CONTAINS (   
                                                                        {   
                                                                          column_name | ( column_list )   
                                                                        | *   
                                                                        | PROPERTY ( { column_name }, 'property_name' )    
                                                                        }   
                                                                        , '<contains_search_condition>'  
                                                                        [ , LANGUAGE language_term ]  
                                                                      )   



                                                                  https://docs.microsoft.com/en-us/sql/t-sql/queries/freetext-transact-sql?view=sql-server-ver15


                                                                        FREETEXT ( { column_name | (column_list) | * }   
                                                                                  , 'freetext_string' [ , LANGUAGE language_term ] )  
                                                        

                                                                // _feature_attributes_string = [ 'name', 'address'....]   // all field type is char nvchar,
                                                                var _charType_fieldName_string = _feature_attributes_string.join()  // default join(), separate by comma:     'name,address,....'
                                  
                                                                // contains :  means keywords phrase must be same wording
                                                                // not use
                                                                // where_condition += " CONTAINS ({" + _charType_fieldName_string + "},  '" + _search_keyword    +"')";


                                                                // freetext : means keywords phrase not be same wording, separate each keywords use AND.
                                                                // in use
                                                                where_condition += " FREETEXT ({" + _charType_fieldName_string + "},  '" + _search_keyword   +"')";

                                                              
                    // ============  end  ============  sql server full text search =================       

              */


            
                  // step 1) no matter what, first always treat search keyword as string,                 
                            // no matter is number or string, always treat as 'string' first
                                  // ********* not real full text search,  a OR b ( real full text search is a AND b) ********* 
                                                        console.log(' string - feature attributes ,  ', _search_keyword , _feature_attributes_string)
                                                                                            
                                                        for (var i = 0; i < _feature_attributes_string.length; i++) {

                                                                    if (i>0) {where_condition +=  ' or ' } // first item must not start with 'or', otherwise, will error

                                                                    where_condition += ' ( '

                                                                    if (_clause_Operator == 'like'){  

                                                                            for (var k = 0; k < __keywords_array.length; k++) {
                                                        
                                                                                    var _each_keyword_item = __keywords_array[k].trim()

                                                                                    if (k>0) {where_condition = where_condition + ' or ' }

                                                                                    // slow,   'like' cost 10 times expensive than '=' 
                                                                                    // %	Any string of zero or more characters.	WHERE title LIKE '%computer%' finds all book titles with the word 'computer' anywhere in the book title.
                                                                                    //where_condition += _feature_attributes_string[i] + " like '%" + _each_keyword_item + "%'";
                                                                                    // SQL always use lowercase,  SELECT * FROM trees WHERE LOWER( trees.title ) LIKE  '%elm%'   https://stackoverflow.com/questions/2876789/how-can-i-search-case-insensitive-in-a-column-using-like-wildcard
                                                                                    where_condition += 'LOWER( ' +  _feature_attributes_string[i] + " ) like '%" + _each_keyword_item + "%'"; 
                                                                            }// for k

                                                                    } else if (_clause_Operator == 'equal') {

                                                                              // exact field match , full field match only
                                                                              where_condition +=  'LOWER( ' +_feature_attributes_string[i] + " ) = '" + _search_keyword + "'";
                                            
                                                                    }// if  

                                                                    where_condition += ' ) '

                                                        }// for i
                                    // ************  end   ********* not real full text search,  a OR b ( really full text search is a AND b) ********* 
              
              // step 2) if is number must add integer field at the end, 
              if (isNaN(_search_keyword)){ 
                // nothing to do here, 

              } else {

                                  // is number 12345, must add attributes_integer = xxx
                                  console.log('  integer -  feature attributes ,  ', _search_keyword , _feature_attributes_integer)
                                  for (var i = 0; i < _feature_attributes_integer.length; i++) {
                                      // at least have 1 text string field, number integer field is never be first one, so always need 'or' 
                                      where_condition +=  ' or '
                                      //if (i>0) {where_condition +=  ' or ' }  // first item must not start with 'or', otherwise, will error
                                      where_condition += _feature_attributes_integer[i] + ' = ' + _search_keyword 
                                  }// for

              } // if



              console.log(' where condition ******* before enccode ******** ', where_condition)

              // fix bug, if search keywords have number, for example 18T,  where =  like '%18T' %18 becomes special char. 
              // so must encode where condition before send to url
              var encoded_where_condition = encodeURI(where_condition); 

              return encoded_where_condition
              //return where_condition
          }









 		     /**/
         //  ---  print   --- 
         /**/

                var widget_opacity = 0.91
                var param_widget_opacity

                var legend_panel_status = true
                var dynamicLegend_panel_status = true

                var title_html = ''


                  function init_print(){


                                          /**/
                                          //  ---  print   --- 
                                          /**/

                                                          /**/
                                                          // ----- opacity ----- widget ----- 
                                                          /**/
                                                          param_opacity  = urlParams.get('opacity');  
                                                          if (param_opacity){
                                                            _opacity = param_opacity
                                                          }
                                                          param_widget_opacity  = urlParams.get('widgetopacity');  
                                                          if (param_widget_opacity){
                                                            widget_opacity = param_widget_opacity
                                                          }
                                                          /**/
                                                          // ----- end  ----- opacity ----- widget ----- 
                                                          /**/


                                          /**/
                                          //  --- end  --- print   --- 
                                          /**/




                              $("#print_map_btn").on( "click", function(){
                                console.log(' clicked print map button ')
                                // full page print
                                window.print();
                                
                              }); // click
              
                              $("#sample_title_btn").on( "click", function(){
              
                                title_html = '<div style="background-color:rgba(100, 149, 237, 0.9);"><h1 style="display:inline;">edit title here</h1></br><span>details here</span></div>'
                                $("#edit_title_textarea").val(title_html)
                                console.log(' title html changed to ', title_html);
                                $("#title_div").html(title_html)
                              }); // clear
              
                              $("#clear_title_btn").on( "click", function(){
                                console.log(' clicked clear button ')
                                $("#edit_title_textarea").val('')
                                $("#title_div").html('')
                              }); // clear
              
                              $("#update_title_btn").on( "click", function(){
                                title_html = $("#edit_title_textarea").val()
                                console.log(' title html changed to ', title_html);
                                $("#title_div").html(title_html)
                              }); // clear
              
                              $("#edit_title_textarea").on( "keyup", function(){
                                title_html = $("#edit_title_textarea").val()
                                console.log(' title html changed to ', title_html);
                                $("#title_div").html(title_html)
                              }); // keyup



                    // .............. legend panel  .............. 
                    //turn_off_legend_panel()
                    $('#legend_panel_toggle').on('click', function(event) {
                            event.preventDefault(); // To prevent following the link (optional)
                            if (legend_panel_status) {
                                          //$("#legend_panel_toggle").attr("class", "legend-button");
                                          turn_off_legend_panel()
                            } else {
                                          //$("#legend_panel_toggle").attr("class", "legend-button-turn-on-mode");                                   
                                          turn_on_legend_panel()
                            } // if
                    });

                    //turn_off_dynamicLegend_panel()
                    $('#dynamicLegend_panel_toggle').on('click', function(event) {
                            event.preventDefault(); // To prevent following the link (optional)
                            if (dynamicLegend_panel_status) {
                                          //$("#dynamicLegend_panel_toggle").attr("class", "dynamicLegend-button");
                                          turn_off_dynamicLegend_panel()
                            } else {
                                          //$("#dynamicLegend_panel_toggle").attr("class", "dynamicLegend-button-turn-on-mode");                                   
                                          turn_on_dynamicLegend_panel()
                            } // if
                    });
                  // .............. end   ..............  legend panel  ..............  









                    /**/
                    //  ---  print   --- 
                    /**/

                                      

                                          /**/
                                          // ======== google widget my widget opacity control together  ========
                                        
                                          $('#widget_opacity_label').text( parseInt(widget_opacity * 10));
                                          $('#widget_opacity_slider_input').val(parseInt(widget_opacity * 10));
                                          
                                          var widget_opacity_div = document.getElementById("widget_opacity_div")
                                          map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(widget_opacity_div);

                                          // event handle
                                          $('#widget_opacity_slider_input').on('change', function() {


                                            widget_opacity = $('#widget_opacity_slider_input').val() / 10 ;
                                            $('#widget_opacity_label').text(widget_opacity * 10);
                                            update_url_parameter('widgetopacity', widget_opacity)

                                            set_my_widget_opacity()
                                            set_google_widget_opacity()

                                            

                                          });
                                    // ======== end  ======== google widget my widget opacity control together  ========
                                    /**/


                                    // init set all esri widget opacity
                                    set_my_widget_opacity()
                                    




                                  var title_div_DOMobject =document.getElementById("title_div")
                                  map.controls[google.maps.ControlPosition.TOP_LEFT].push(title_div_DOMobject);

                                  const legend_div_DOMobject =document.getElementById("legend-div")
                                  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend_div_DOMobject);

                                  const dynamicLegend_div_DOMobject =document.getElementById("dynamic-legend")
                                  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(dynamicLegend_div_DOMobject);


                                  /**/
                                  //  --- end  --- print   --- 
                                  /**/










                  }
                            
                  function set_my_widget_opacity(){
                      $('.title_div').css({'opacity': widget_opacity})  //  .css({object})
                      $('.legend-div').css({'opacity': widget_opacity})  //  .css({object})
                      $('.dynamic-legend').css({'opacity': widget_opacity})  //  .css({object})

                      $('#opacity_div').css({'opacity': widget_opacity})  //  .css({object})
                      $('#zoom_level_id').css({'opacity': widget_opacity})  //  .css({object})
                      $('#pac-input').css({'opacity': widget_opacity})  //  .css({object})
                      $('#zoomToLayer_button').css({'opacity': widget_opacity})  //  .css({object})
                      $('#panToCurrent_geolocation_button').css({'opacity': widget_opacity})  //  .css({object})

                  }          

                  function set_google_widget_opacity(){
                    // you can't change opacity of native google widget, maybe use flutter plugin.... too complicated. not doing it. 
                  }

                          // .............. legend panel  .............. 

                                  function turn_on_legend_panel() {
                                          $('#legend-div').show();
                                          legend_panel_status = true;
                                  }
                                  function turn_off_legend_panel(){
                                          $('#legend-div').hide();
                                          legend_panel_status = false;
                                  }

                                  function turn_on_dynamicLegend_panel() {
                                    $('#dynamic-legend').show();
                                    dynamicLegend_panel_status = true;
                                  }
                                  function turn_off_dynamicLegend_panel(){
                                          $('#dynamic-legend').hide();
                                          dynamicLegend_panel_status = false;
                                  }


                          // .............. end   ..............  legend panel  .............. 

        /**/
        //  --- end  --- print   --- 
        /**/





                /**/
                //  ... --- ... show count   ... --- ...
                /**/
                            var show_count_status = 'show_count' // default
                            var param_show_count_status

                                    function init_show_count(){





                                            /**/
                                            //  ... --- ... show count   ... --- ...
                                            /**/
                                            param_show_count_status  = urlParams.get('show_count_status');  
                                            if (param_show_count_status){
                                              show_count_status = param_show_count_status
                                            } else {
                                              show_count_status = 'show_count'  // default
                                            }

                                            /**/
                                            // ... --- ... end ... --- ... show count   ... --- ...
                                            /**/




                                            if (show_count_status == 'show_count'){
                                              $('#show_count').attr('checked', true)
                                              $('#hide_count').removeAttr('checked')
                                              $("#message_info").removeClass( "disabled_color_class");
                                            } else {
                                              $('#hide_count').attr('checked', true)
                                              $('#show_count').removeAttr('checked')
                                              $("#message_info").addClass( "disabled_color_class");
                                            }



                                        // event
                                        $('input[type=radio][name=show_hide_count_radio]').on('change', function() {

                                          show_count_status = $(this).val()
                                          update_url_parameter('show_count_status', show_count_status)

                                          if (show_count_status == 'show_count'){
                                                  $("#message_info").removeClass( "disabled_color_class");
                                          } else {
                                                  // hide count
                                                  $("#message_info").addClass( "disabled_color_class");
                                          }
                                        });

                                      
                                    }
                /**/
                // ... --- ... end ... --- ... show count   ... --- ...
                /**/














                function addAliasToFieldName(_propertiesObj, _fieldAliasObj){

                  var _propertiesObj_aliasAdded = {}
                  var _fieldName_aliasAdded = ''
    
                  for (const [key, value] of Object.entries(_propertiesObj)) {
                    //console.log(`${key}: ${value}`);
                    if (_fieldAliasObj.hasOwnProperty(key)){
                            _fieldName_aliasAdded = key + ' (' + _fieldAliasObj[key] + ')' 
                            _propertiesObj_aliasAdded[_fieldName_aliasAdded] = value
                    } else {
                      _propertiesObj_aliasAdded[key] = value
                    }
                    
                  }//for
                  
                  return _propertiesObj_aliasAdded
                }








                
               



                //   --- --- --- --- back to previous extent --- ---
                var extentStack = new Stack();             







  

