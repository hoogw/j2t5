
//  .. ..  from node.js arcgis viewer transition to json2tree  .. ..  


// always at top, 



/**/
// ------- apple map only  -------
/**/

var _apple_token = "eyJraWQiOiIyNzVBRk1SWkRBIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJDNE5YNVM5UTRCIiwiaWF0IjoxNzY0MjA2NzY1LCJleHAiOjE3NjQ4MzUxOTl9.KWeSyWdXECi21otg0IQQPbcgETvkLfG1f-Z6A10yyFwJLmYqEGH6E7xmk-ZoY_9BNulWQGryWRj0CUzV94sD0Q"

// must above default icon color
var   _default_strokeOpacity   =  1  // apple only
var   _highlight_strokeOpacity   =  1  // apple only
var   _classfiy_strokeOpacity   =  1  // apple only
 
var geoJSONParserDelegate 
var geoJSONParserDelegate_for_each_feature
var default_overlay_style 
var highlight_overlay_style
var classfiy_overlay_style
   
var default_icon_svg  = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">'
    default_icon_svg +=       '<circle cx="25" cy="25" r="20" stroke="${outline_color}" stroke-width="${line_width}" fill="${fill_color}" />'
    default_icon_svg += '</svg>'

var default_icon = default_icon_svg.replace('${outline_color}', _default_strokeColor).replace('${line_width}', _default_strokeWeight).replace('${fill_color}', _default_fillColor)
var highlight_icon = default_icon_svg.replace('${outline_color}', _highlight_strokeColor).replace('${line_width}', _highlight_strokeWeight).replace('${fill_color}', _highlight_color)
var classfiy_icon = default_icon_svg.replace('${outline_color}', _classfiy_strokeColor).replace('${line_width}', _classfiy_strokeWeight).replace('${fill_color}', _classfiy_color)

console.log('standard default icon svg ',   default_icon)
console.log('standard highlight icon svg ', highlight_icon)
console.log('standard classfiy icon svg ',  classfiy_icon)

/**/
// --- end --- apple map only -------
/**/
  

 var _map_type = 'hybrid' // default    roadmap, satellite, terrain
 var need_pan_to_real_location = true

 // -2 means current showing not available,  -1 means total count not available
 var _current_rendering_feature = -2 
 var _current_area_count_of_feature = -2
 var _total_count_of_feature = -1;

 

 // use in pan to real location, get how many sample  
var _sample_count = 10
var _default_resultRecordCount = 500    




/**/
// ... ... .. simplify vertex by set maxAllowableOffset ... ... ..
      var _maxAllowableOffset = 0  // default
// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
/**/





// microsoft marker don't have problem, can set no limit
// no limit, will get maxReturnCount set by arcgis server admin.
//var max_count_for_rendering = undefined // null,


// google must set limit
// old google marker(data layer point icon) will crash browser, if no limit, new google marker seems ok 
var max_count_for_rendering = 500


// 1). limit, used in function reduce feature count to limit
// 2). limit, used in url?...&resultRecordCount = limit
var limit = max_count_for_rendering   


var zoom2level = 20 // google map 18 will not show house number, 19,20 will show house number,  
$("#zoom2level-input").val(zoom2level)





var _url // main layer url node.js arcgisViewer use
var ___url_string  // main layer url json2tree use

var _center_lat
var _center_long
var _center_zoom



// .. ..  end  .. ..  from node.js arcgis viewer transition to json2tree  .. ..  





// only for init_globle_var()
var param_search









        // google dash line square or circle
        var north_east
        var south_east
        var south_west
        var north_west
        var dottedlineSymbol 
        var dashlineSymbol




// for - - init global var
var urlParams




                  async function init_global_var_from_node(){
                



                    console.log(' default before update from url - - -  panto, need_pan_to_real_location',  need_pan_to_real_location )
                
                    console.log(' default before update from url - - -  center zoom:', _center_zoom, ' center lng:', _center_long, ' center lat:', _center_lat )
                
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
                  


                                  // as long as url has lat,lng,zm, then do not pan to loc

                                  // google lat lng must be number, can not be string
                                  param_center_lat = urlParams.get('center_lat');  
                                    if (param_center_lat) {
                                       _center_lat = Number(param_center_lat)

                                       // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       need_pan_to_real_location = false
                                    }
                                    param_center_long = urlParams.get('center_long');  
                                    if (param_center_long) {
                                      _center_long = Number(param_center_long)

                                      // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       need_pan_to_real_location = false
                                    }

                                    param_center_zoom = urlParams.get('center_zoom');  
                                    if (param_center_zoom) {
                                      _center_zoom = Number(param_center_zoom)

                                      // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       need_pan_to_real_location = false
                                    }

                                    
                                   


                    console.log('after update from url, panto,  need_pan_to_real_location ......  ',   need_pan_to_real_location)  
                                 
                    console.log(' after update from url,  - - -  center zoom:', _center_zoom, ' center lng:', _center_long, ' center lat:', _center_lat )
                
                  
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
                              //  ... ... .. ... search key word  ... ... .. ... 
                              /**/

                              param_search = urlParams.get('search');
                              if (param_search){ 
                                need_pan_to_real_location = false
                              }
                              
                              /**/
                              //  ... end ... ... .. ... search key word  ... ... .. ...
                              /**/



                  /**/
                  //  --- yelp POI on google      --- 
                  /**/
                  
                  param_search_poi_keyword = urlParams.get('poi');
                  console.log('url param param_search_poi_keyword',  param_search_poi_keyword)
                  if (param_search_poi_keyword){ 
                    search_poi_keyword = param_search_poi_keyword
                  }

                 

                  /**/
                  //  --- end  ---  yelp POI on google    --- 
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

                            
                            var param_sync_async = urlParams.get('sync_async');
                            if (param_sync_async){
                              sync_async = param_sync_async
                            }

                            /**/
                            //  --- end  ---  progressive max   - - - 
                            /**/



                            /**/
                            // -- -- -- label and color  -- -- -- 

                            param_polygonFillBy = urlParams.get('polygonFillBy');
                            //. . . end  . . . -- -- -- label and color  -- -- -- 
                            /**/





     
                            /**/
                            // -- -- --  split address -- -- --         
                              var param_addressField = urlParams.get('addressField');
                              if (param_addressField) {current_addressField = param_addressField}
                            // -- -- --  end -- -- --  split address -- -- -- 
                            /**/
                            /**/
                            // -- -- --  google labeling -- -- -- 
                            var param_labelAs = urlParams.get('labelAsField');
                            if (param_labelAs) {current_labelAs = param_labelAs}
                            // -- -- --  end -- -- --  google labeling -- -- -- 
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
                              //  --- use your key  --- 
                              /**/

                              // 1st time, one time
                              param_your_google_api_key = urlParams.get('yourGoogleKey'); 
                              if (param_your_google_api_key){
                                    $('#googlemap-key-input').val(param_your_google_api_key)
                                    your_google_api_key = param_your_google_api_key
                              }

                              /**/
                              //  --- end  ---  use your key    --- 
                              /**/






                                                            

                              /**/
                              //  -  -  - category  -  -  - 
                              /**/

                              param_category_string = urlParams.get('poicategory');
                              console.log('url param param_category_string',  param_category_string)
                              if (param_category_string){ 
                                _category_string = param_category_string
                              }


                              /**/
                              //  -  -  - end  -  -  -  category    -  -  - 
                              /**/



                    



                               /**/
                              //  ... ... .. ...background layer url  ... ... .. ... 
                              /**/
                              
                              param_background_layer_url = urlParams.get('backgroundlayerurl');
                              if ((param_background_layer_url == undefined) || (param_background_layer_url == null) || (param_background_layer_url == '')){
                                  
                                  // nothing to do
                                  
                              }else{
                                  ___bgurl = new URL(param_background_layer_url);   // ?url=https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0
                                  ___bgprotocol = ___bgurl.protocol; //   https:
                                  ___bghostname = ___bgurl.hostname; //    sampleserver3.arcgisonline.com
                                  ___bgpathname = ___bgurl.pathname; //    server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0
                                  ___bgpathArray = ___bgpathname.split('/');
     
                                  console.log('background layer url path array', ___bgpathArray )
     
                                    // https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0  
                                   // ___pathArray = ["", "server", "rest", "services", "AnalyzerTool", "AnalyzerTool", "MapServer", '0']
                                   param_layer_id = ___bgpathArray.pop() // remove last element
                                   ___bgpathArray.shift();         // remove first element, which is empty ''
                                   param_background_mapserver_url = ___bgprotocol + '//' + ___bghostname + '/' + ___bgpathArray.join('/')
     
                                   console.log('param background mapserver url ', param_background_mapserver_url )
     
                             }// if     

                              /**/
                              //  ... end ... ... ... .. ...background layer url  ... ... .. ... 
                              /**/


                    }
                    
                    
                  


                  





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

















                
               



                //   --- --- --- --- back to previous extent --- ---
                var extentStack = new Stack();             













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
                function display_count_info(_subject, ___showing_cnt, ___all_cnt, ____rendering_cnt){


                      $('#layer-info-vertical').html('<a  target="_blank" href="' + _url +  '/' + _layer_id +'">' + _subject + '</a>')

                      console.log(' update statistic info', ___showing_cnt, ___all_cnt)

                      if (isNaN(___showing_cnt)){ ___showing_cnt = '...' } // not available...
                      if (isNaN(___all_cnt)){ ___all_cnt = '...' } // not available...
                      
                      $('#feature-on-map').html(___showing_cnt)
                      $('#total-feature').html(___all_cnt)
                      $('#rendering-feature').html(____rendering_cnt)

                          
                }           




// apple only           
function update_center_latLngZoom(){  // apple only 

  // not work, I  get lat:0, long:-0, must use "region . center" instead of ". center"
  //var center_latLng = map.center; // local variable
  var center_latLng = map.region.center; // local variable
  console.log('update center lat Lng Zoom center latLng ', center_latLng)
  _center_lat = center_latLng.latitude;    // global variable 
  _center_long = center_latLng.longitude;  // global variable 

  var latitudeDelta = map.region.span.latitudeDelta;  // local variable only for local use each time
  var longitudeDelta = map.region.span.longitudeDelta;// local variable only for local use each time
  _center_zoom = latitudeDelta.toFixed(3) + ',' + longitudeDelta.toFixed(3)  // global variable 

  console.log('update center lat Lng Zoom center lat', _center_lat)
  console.log('update center lat Lng Zoom center long', _center_long)

  /**/
  //   --- --- --- --- back to previous extent --- --- --- ---
  /**/
  var new_extent = {
                      "center_lat": _center_lat,
                      "center_long": _center_long,
                      "center_zoom": _center_zoom
                    }
  extentStack.push(new_extent)
  console.log('extent stack just add new extent', extentStack.count, new_extent)

  /**/
  //   --- --- end --- --- back to previous extent --- --- --- ---  
  /**/







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

  console.log('======= zoom change ==== latitudeDelta ==== longitudeDelta ====', _center_zoom)

  // apple map control only, 
  var _latlngzoom_html = ''
  //_latlngzoom_html +='visible area : '
  _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
  _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
  _latlngzoom_html += ',zoom:' + _center_zoom
  $("#lat-lng-zoom").html(_latlngzoom_html)

}







        

/**/
// ------- apple map only  -------
/**/

              // .................  ................. apple map search place .................  ................. always search limited on current region, current map view  .................  .................

              var apple_searchPlaceResultSingleAnnotation



              /*
                 How to create a autocomplete lookup in MapKit JS https://stackoverflow.com/questions/58240556/how-to-create-a-autocomplete-lookup-in-mapkit-js-similar-to-googles-place-autoc
              */
                 var new_place_marker
              function add_search_place(){



                  // Listen for keyup in the input field
                    $('#mapLookup').on('keyup', function(){
                      // Make sure it's not a zero length string
                      if($('#mapLookup').length>0) {
                          let search = new mapkit.Search({ region: map.region });
                          search.autocomplete($('#mapLookup').val(), (error, data) => {
                              if (error) {
                                  return;
                              }
                              // Unhide the result box
                              $('#results').show();
                              var results = "";
                              // Loop through the results a build 
                              data.results.forEach(function(result) {
                                  if(result.coordinate) {
                                      // Builds the HTML it'll display in the results. This includes the data in the attributes so it can be used later
                                      results = results + '<div class="mapSearchResultsItem" data-title="' +result.displayLines[0] + '" data-latitude="'+result.coordinate.latitude+'" data-longitude="'+result.coordinate.longitude+'" data-address="'+result.displayLines[1]+'"><b>' + result.displayLines[0] + '</b> ' + result.displayLines[1] + '</div>';
                                  }
                              });
                              // Display the results
                              $('#results').html(results);
                              // List for a click on an item we've just displayed
                              $('.mapSearchResultsItem').click(function() {
                                  // Get all the data - you might want to write this into form fields on your page to capture the data if this map is part of a form.
                                  var latitude = $(this).data('latitude');
                                  var longitude = $(this).data('longitude');
                                  var title = $(this).data('title').toString();
                                  var address = $(this).data('address');

                                  // Calc the new region
                                  var myRegion = new mapkit.CoordinateRegion(
                                      new mapkit.Coordinate(latitude, longitude),
                                      new mapkit.CoordinateSpan(0.01, 0.01)
                                  );

                                  // Clean up the map of old searches
                                  if (apple_searchPlaceResultSingleAnnotation){
                                    map.removeAnnotation(apple_searchPlaceResultSingleAnnotation);
                                  }
                                  
                                  map.region = myRegion;
                                  // Add the new annotation
                                  apple_searchPlaceResultSingleAnnotation = new mapkit.MarkerAnnotation(new mapkit.Coordinate(latitude, longitude), { 
                                      color: "#9b6bcc", 
                                      title: title,
                                      subtitle: address
                                  });
                                  map.addAnnotation(apple_searchPlaceResultSingleAnnotation);

                                  console.log('- - -  apple search place - - -  , - - -   add - - -   marker annotation to map - - -  ', apple_searchPlaceResultSingleAnnotation)
                                  // Hide the results box
                                  $('#results').hide();
                              });
                          });
                      } else {
                          $('#results').hide();
                      }
                  });


                }

                

                function delete_all_apple_annotation(){ 
                  map.removeAnnotations(map.annotations);

                  // fix bug, each map move, get map bound,  apple search place result single annotation get removed as well by remove 'all' annoation, I need to add it back.
                  if (apple_searchPlaceResultSingleAnnotation){
                    map.addAnnotation(apple_searchPlaceResultSingleAnnotation);
                  }
                }

                
    // ................. end .................  ................. apple map search place .................  .................


/**/
// --- end --- apple map only -------
/**/







                    var _featurelayerJSON;
                    var _feature_attributes
                    // esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
                    var featurelayer_geometrytype
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





                                                  
                    // only for feature table, no legend, no spatial reference, it is reduced from regular original same name function 
                    async function get_feature_attributes_onlyForFeatureTable(layerID){

  

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

                      








            /**/
            // ------- apple map only  -------  esri --- pan to real location  ------------------- 
            /**/
                          // only for esri,    socrata does not use this 
                          async function pan_to_real_location(){

                            /* 
                                if the layer have feature, just get a few sample feature as real location
                                if the layer is image only, no feature, get 0 sample. 
                                              should use extend info as real location.
                            */
                            
 
                                              // test only, enforce to use extent, by uncomment this line, and comment 'use sample feature' block.    production must comment out this line
                                              //await use_extent()

                                              
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



                          // ------- apple map only  -------
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
                                                                                  var turf_bbox = turf.bbox(_one_sample_geometry);
                                                                                  console.log('turf .. center ...', turf_center)
                                                                                  console.log('turf .. bbox ...', turf_bbox)
    
                                                                                  _center_lat  = turf_center.geometry.coordinates[1]
                                                                                  _center_long = turf_center.geometry.coordinates[0]
                                                                                  console.log('controled zoom to real location . . . .  _center_lat ...', _center_lat )
                                                                                  console.log('controled zoom to real location . . . .  _center_long ...', _center_long )
                                                                                                         
                                                                        /**/
                                                                        //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                                        /**/



                                                                  

                                                                        /**/
                                                                        //  .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                                                        /**/

                                                                                      console.log('apple only, always pan-to-real-location auto  ## fit bound ##, always, always ', _center_lat, _center_long)

                                                                                      /*  
                                                                                        Apple Maps API -- setRegionAnimated
                                                                                        https://developer.apple.com/documentation/mapkitjs/map/2973936-setregionanimated

                                                                                        turf - bbox extent in minX, minY, maxX, maxY order
                                                                                        https://turfjs.org/docs/#bbox
                                                                                      */
                                                                                      var latitudeDelta  = Math.abs(turf_bbox[3] - turf_bbox[1])     //  * 1.3; // Add a little extra space on the sides
                                                                                      var longitudeDelta = Math.abs(turf_bbox[2] - turf_bbox[0])     //  * 1.3; // Add a little extra space on the sides
                                                                                      console.log('pan to real location latitudeDelta ',  latitudeDelta)
                                                                                      console.log('pan to real location longitudeDelta ',  longitudeDelta)

                                                                                      // must adjust delta value other than 0, when point, latitudeDelta=0, longitudeDelta=0
                                                                                      if (latitudeDelta == 0){
                                                                                        //  https://developer.apple.com/documentation/mapkitjs/mapkit/coordinatespan/2973868-latitudedelta
                                                                                        latitudeDelta = 0.00005 // one degree of latitude is always approximately 111 kilometers (69 miles).
                                                                                      }
                                                                                      if (longitudeDelta == 0){
                                                                                        // https://developer.apple.com/documentation/mapkitjs/mapkit/coordinatespan/2973869-longitudedelta
                                                                                        longitudeDelta = 0.00005 //one degree of longitude spans a distance of approximately 111 kilometers (69 miles) at the equator but shrinks to 0 kilometers at the poles.
                                                                                      }

                                                                                      _center_zoom = latitudeDelta + ',' + longitudeDelta
                                                                                      set_latlongZoom_for_apple_only(_center_lat, _center_long, _center_zoom)


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
    

                           function get_current_apple_zoom_as_center_and_delta_span(){

                             return 'center(lat,lng):(' +  map.region.center.latitude + ',' + map.region.center.longitude + ')  .........  ......... span delta(lat,lng):' +  map.region.span.latitudeDelta + ',' +  map.region.span.longitudeDelta; //apple does not have zoom concept, map.getZoom()
                           }

                          // ------- apple map only  -------
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

                                /**/
                                // ------- apple map only  -------
                                /**/
                                _zoom_beforeLayerExtent = get_current_apple_zoom_as_center_and_delta_span()
                                console.log( ' ......... zoom ......... before .........  Layer Extent ......... ', _zoom_beforeLayerExtent)
                                /**/
                                // --- end --- apple map only -------
                                /**/
                                                              
                                                                                                                          
                                                              // will map.fitBound(),  must use await because this function call ajax, need to wait until resolve promise. 
                                                              await zoom_to_esri_extent(_layer_extent_object)

                                /**/
                                // ------- apple map only  -------
                                /**/
                                _zoom_afterLayerExtent = get_current_apple_zoom_as_center_and_delta_span()
                                console.log( ' ......... zoom ......... after ......... Layer Extent ......... ', _zoom_afterLayerExtent)
                                /**/
                                // --- end --- apple map only -------
                                /**/
    
                                                             
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

                                                /**/
                                                // ------- apple map only  -------
                                                /**/
                                                _zoom_beforeServerExtent = get_current_apple_zoom_as_center_and_delta_span()
                                                console.log( '  .. .. ... .. zoom   .. .. ... .. before   .. .. ... .. Server Extent .. .. ... .. ', _zoom_beforeServerExtent)
                                                /**/
                                                // --- end --- apple map only -------
                                                /**/
    
                                                          //layer extent is whole world, zoom level will be 1, then try mapserver extent
                                                          await zoom_to_esri_extent(_server_extent_object)
    
                                                         
                                                  /**/
                                                  // ------- apple map only  -------
                                                  /**/
                                                  _zoom_afterServerExtent = get_current_apple_zoom_as_center_and_delta_span()
                                                  console.log( '  .. .. ... .. zoom  .. .. ... .. after  .. .. ... .. Server Extent  .. .. ... ... ', _zoom_afterServerExtent)
                                                  /**/
                                                  // --- end --- apple map only -------
                                                  /**/
                                              }
    
                              }
    
    
                            
                             
    
                              
                              
                                
    
    
    
    
    
                            }
    
                         

                          /*
                             ESRI only, 

                             apple + esri have 'multipledefine' error at require[module]
                             to avoid use esri client projection (which is fast, no ajax needed)
                             instead, I use 'read_proj_string' (which need ajax)

                          */ 
                          async function zoom_to_esri_extent(bbox) {

                                  console.log('zoom to esri extent, bbox', bbox)


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

                                                         


                                                  /**/
                                                  // ------- apple map only  -------
                                                  /**/

                                                           /*
                                                              ESRI only, 

                                                              apple + esri have 'multipledefine' error at require[module]
                                                              to avoid use esri client projection (which is fast, no ajax needed)
                                                              instead, I use 'read_proj_string' (which need ajax)
                                                            */ 


                                                              // this could over-write previous 'read_proj_string' , if latestWkid is not 3857
                                                              // after fix 'multipledefine' bug, should use this, otherwise, comment this line
                                                              //projection_method = 'esri_proj'   // get lat lng directly from  https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project

                                                              // before fix'multipledefine' bug , temperary use this line 'read_proj_string'
                                                              projection_method = 'read_proj_string'    // from 'https://spatialreference.org/ref/epsg/2230/proj4js/"

                                                  /**/
                                                  // --- end --- apple map only -------
                                                  /**/
                                                    
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

                                console.log('projection method - zoom to esri extent',  projection_method )

                                switch (projection_method) {



                                                  case 'default':  
                                                                      // 3857 to 4326

                                                                      // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                                                                      _south_west_point_long_lat_array = proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [bbox.xmin,    bbox.ymin]);
                                                                      _north_east_point_long_lat_array = proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [bbox.xmax,    bbox.ymax]);


                                                                      // or use esri client side projection
                                                                      







                                                                      console.log(' ---> default ---> 3857 ---> 4326  ---> proj4    _south_west_point_long_lat_array ----> ', _south_west_point_long_lat_array )
                                                                      console.log('  ---> default ---> 3857 ---> 4326  ---> proj4   _north_east_point_long_lat_array ----> ', _north_east_point_long_lat_array )
                                                                      fit_bound_applemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                                        

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
                                                                         fit_bound_applemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)

                                                                          break;

                                                  case 'esri_proj':


                                                                      /**/
                                                                      // ------- apple map only  -------
                                                                      /**/

                                                                              /*
                                                                                  ESRI only, 

                                                                                  apple + esri have 'multipledefine' error at require[module]
                                                                                  to avoid use esri client projection (which is fast, no ajax needed)
                                                                                  instead, I use 'read_proj_string' (which need ajax)
                                                                                */ 


                                                                     // non-(3857) always --- to --> 4326
                                                                    
                                                                              // in use, client side projection,  very fast, no need await, fit bound must be inside require module
                                                                              // bug apple already define require[], esri client side projection will use require[] again, error is 'multipleDefine'
                                                                              esri_clientSide_projection(bbox)  
                                                                              

                                                                              // not use, esri server side projection , very slow, due to ajax call, but works, must use await, because it has ajax call, 
                                                                              /*
                                                                                    var _esri_serverSide_projection_result = await esri_serverSide_projection(bbox)

                                                                                    console.log('_esri_serverSide_projection_result', _esri_serverSide_projection_result)
                                                                                    _south_west_point_long_lat_array = _esri_serverSide_projection_result.SouthWest_min
                                                                                    _north_east_point_long_lat_array = _esri_serverSide_projection_result.NorthEast_max

                                                                                    console.log('  esri server projection  ---->  non-(3857)   always to --> 4326   _south_west_point_long_lat_array ----> ',   _south_west_point_long_lat_array )
                                                                                    console.log('  esri server projection  ---->  non-(3857)   always to --> 4326   _north_east_point_long_lat_array ----> ',   _north_east_point_long_lat_array )
                                                                                    fit_bound_applemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                                                                              */
                                                                      
                                                                    break;
                                                  default:
                                                    console.log(`Sorry, we are out of ${projection_method}.`);


                                } // switch


                                









                                  
                            }



                            function fit_bound_applemaps(_southWest_lnglat_array, _northEast_lnglat_array){


                              console.log('  fit bound applemaps - -> - - > : ', _southWest_lnglat_array, _northEast_lnglat_array )

                              // must in order:  new mapkit.BoundingRegion(northLatitude,  eastLongitude,  southLatitude,  westLongitude);    https://developer.apple.com/documentation/mapkitjs/mapkit/boundingregion/2973840-mapkit_boundingregion
                              var apple_boundsbox = new mapkit.BoundingRegion(_northEast_lnglat_array[1],_northEast_lnglat_array[0],_southWest_lnglat_array[1],_southWest_lnglat_array[0]);
                              
                              // set the map view to our bounding box
                              map.setRegionAnimated(
                                apple_boundsbox.toCoordinateRegion(),   // https://developer.apple.com/documentation/mapkitjs/map/2973936-setregionanimated
                                false // animate: boolean,  must set false, no animation,  otherwise, animation cause unexpected error, when get map region center
                              );

                              var _c_e_n_t_e_r = map.center;
                              _center_lat  =  _c_e_n_t_e_r.latitude;
                              _center_long =  _c_e_n_t_e_r.longitude;

                              var latitudeDelta = map.region.span.latitudeDelta;  // local variable only for local use each time
                              var longitudeDelta = map.region.span.longitudeDelta;// local variable only for local use each time
                              _center_zoom = latitudeDelta + ',' + longitudeDelta  // global variable 
                              

                              console.log('  new center is - -> - - > : ', _center_lat, _center_long, _center_zoom )

                            }



                            /**/
                            /*
                                ESRI only, 
                                apple + esri have 'multipledefine' error at require[module]
                                to avoid use esri client projection (which is fast, no ajax needed)
                                instead, I use 'read_proj_string' (which need ajax)
                            */                                             
                           // do not use, until fix bug,   fit bound must inside require module
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
                                                                                                          fit_bound_applemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                          


                          
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

            //  -------------------  end  -------- ------- apple map only  -------  esri --- pan to real location  ------------------- 
            /**/


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
              // ------- apple map only  -------
              /**/


              function set_map_style(____strokeColor, ____strokeWeight, ____fillColor , ____circle_radius){

                default_overlay_style = new mapkit.Style({
                    strokeColor: ____strokeColor,
                    strokeOpacity: _default_strokeOpacity,
                    lineWidth: parseInt(____strokeWeight),     // only for apple
                    fillOpacity: _default_fillOpacity,
                    fillColor: ____fillColor,
                });


                // only for annotation point
                var icon_size = 'width="' + (_default_pointRadius * 4) + '" height="' + (_default_pointRadius * 4) + '"'
                var icon_center_radius = 'cx="' + (_default_pointRadius * 2) + '" cy="' + (_default_pointRadius * 2) + '" r="' + (_default_pointRadius * 1.5) + '"'
                default_icon = default_icon_svg.replace('${outline_color}', ____strokeColor).replace('${line_width}', ____strokeWeight).replace('${fill_color}', ____fillColor).replace('width="50" height="50"', icon_size).replace('cx="25" cy="25" r="20"', icon_center_radius)


                var icon_size = 'width="' + (_default_pointRadius * 4) + '" height="' + (_default_pointRadius * 4) + '"'
                var icon_center_radius = 'cx="' + (_default_pointRadius * 2) + '" cy="' + (_default_pointRadius * 2) + '" r="' + (_default_pointRadius * 1.5) + '"'
                highlight_icon = default_icon_svg.replace('${outline_color}', _highlight_strokeColor).replace('${line_width}', _highlight_strokeWeight).replace('${fill_color}', _highlight_color).replace('width="50" height="50"', icon_size).replace('cx="25" cy="25" r="20"', icon_center_radius)
                console.log('set map style  ,   highlight icon svg ', highlight_icon)


                var icon_size = 'width="' + (_default_pointRadius * 4) + '" height="' + (_default_pointRadius * 4) + '"'
                var icon_center_radius = 'cx="' + (_default_pointRadius * 2) + '" cy="' + (_default_pointRadius * 2) + '" r="' + (_default_pointRadius * 1.5) + '"'
                classfiy_icon = default_icon_svg.replace('${outline_color}', _classfiy_strokeColor).replace('${line_width}', _classfiy_strokeWeight).replace('${fill_color}', _classfiy_color).replace('width="50" height="50"', icon_size).replace('cx="25" cy="25" r="20"', icon_center_radius)
                console.log('set map style  ,   classfiy icon svg ', classfiy_icon)





                // update all overlay including circle overlay to new default color
                reset_all_overlay_style_to_default()
                reset_all_annotation_style_to_default()
              }

                    
              /**/
              // --- end --- apple map only -------
              /**/


            

            
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








         



