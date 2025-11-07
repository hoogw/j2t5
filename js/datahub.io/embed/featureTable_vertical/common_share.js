 
 

 // http://localhost:10/json2tree/arcgis/featureTable.html?&table_id=0&table=SB272_Enterprise_System_Report&url=https://services.arcgis.com/aA3snZwJfFkVyDuP/arcgis/rest/services/SB272_Enterprise_System_Report/FeatureServer

 //&table_id=0
 //&table=SB272_Enterprise_System_Report   // table_name
 //&url=https://services.arcgis.com/aA3snZwJfFkVyDuP/arcgis/rest/services/SB272_Enterprise_System_Report/FeatureServer
 
   
   

    var container
    var options
    var editor
    


    var _timeout = 30000; // 30 sec

    var _total_count_of_feature = -2;
    var _current_count_of_feature = -1;












/**/
               









              // limit = 10 = page_size (10 record per page) define at top
              // offset means bypass how many record, start from where 
              async function get_paged_json_by_limit_and_offset(fulltextSearch_parameter,_limit, _offset){

                  

                  try {


                        //https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm#ESRI_SECTION1_CCD86252F6F348D19BB2D47294D6568C
                        //If using orderByFields with the resultOffset and resultRecordCount parameters to paginate through an ordered set of rows, 
                        //make sure to set the orderByFields such that order is deterministic. For example, 
                        //if you need to order by type and multiple rows can have the same type values, 
                        //set the orderByFields to be type,objectid.
                        
                        //Note that when you pass in one of these two parameters and orderByFields is left empty, 
                        //the map service uses the object-id field to sort the result. 
                        //For a query layer with a pseudo column as the object-id field (for example, FID), you must provideorderByFields; otherwise the query fails.
                        
                        //orderByFields=FID
                        // resultOffset and resultRecordCount

                          //var _paging_parameter = '$limit='+_limit + '&$offset=' +  _offset;
                          
                          //var _paging_parameter = '&orderByFields=FID' + '&resultRecordCount='+_limit + '&resultOffset=' +  _offset;
                          
                          // fix bug, some do not have FID field. so remove '&orderByFields=FID' 
                          var _paging_parameter =  '&resultRecordCount='+_limit + '&resultOffset=' +  _offset;
                          

                          //https://dev.socrata.com/docs/paging.html 
                          // $order=:id make sure result is ordered
                          // https://data.cityofnewyork.us/resource/ic3t-wcy2.json?$order=:id&$limit=10&$offset=5
                        // var _url_paged = _url + '/'+  _layer_id + '.json?$order=:id&' + _paging_parameter + fulltextSearch_parameter;
                          
                          // fix error: sometime  $order=:id cause internal error. so remove it
                          
                          //var _url_paged = _url + '/'+  _layer_id + '.json?' + _paging_parameter + fulltextSearch_parameter;
                          //var _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + _paging_parameter + fulltextSearch_parameter 


                          // default, pagination not supported,
                          var _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + fulltextSearch_parameter  


                          // pagination supported
                          if (_supportsPagination) {
                              _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + _paging_parameter + fulltextSearch_parameter  
                              $('#pagination-container').show()
                          } else {

                            // pagination not supported, should hide pagination bar
                            $('#pagination-container').hide()
                          }


                          console.log('url unpaged or paged :::: depends on > _supportsPagination >',_supportsPagination, _url_paged);
                          



                          



                        




                      // ---------- get paged result ---------------

                      


                    /*

                      var success_returnBack = await $.ajax({

                          timeout: _timeout,
                          url: _url_paged,
                          method: "GET",

                          error: function (jqXHR, textStatus, errorThrown) {
                              console.log(jqXHR);
                              var _error_status = textStatus + ' : ' + errorThrown;         
                              console.log('ajax error  + ', _error_status);
                            },


                          dataType: "json"
                          
                          }); // await

              */

                          // empty json editor
                          show_json_viewer({features:[]},'Empty',  '')
                         

                          console.log('arcgis ajax cross origin (_url_paged,  _cross) ',_url_paged,  _cross)

                          var success_returnBack= await ajax_cross_origin(_url_paged,  _cross);  // cross origin method  

                          console.log('success_returnBack',success_returnBack)

                          show_json_viewer(success_returnBack,'records',  _search_data_content)

                      
                        
                          $('#message_div').empty();



                          // ......... some_action_need_after_first_load_complete .......... 
                                  // better not do a separate function, because success_returnBack.fields scope is only here

                                  // (only first time, one time )if feature attribute array is empty, need to populate feature attribute array
                                  if ( _feature_attributes.length == 0 ){
                                    
                                    console.log('success_returnBack.fields --', success_returnBack.fields)
                                    
                                    parse_feature_attributes(success_returnBack.fields)
                                    
                                    
                                  } 
                
                
                
                                  
                
                              


                           // ......... some_action_need_after_first_load_complete .......... 









                      // ----------   end --------- get paged result ---------------


                  } catch(err) {
                      
                      console.log(err)

                      var _show_message = err
                      if (_show_message.length == 0) {
                          _show_message = 'Data Source Current Not Available, Try Again Next Time.'
                      }
                    
                      show_message('message_div', _show_message);


                  }// try catch

              }   //async function get_paged_json_by_limit_and_offset









              async function resetPagination(_keyword){

                            $('#message_div').empty();
                
                            /*
                            arcgis attribute table, only browsing use pagination,  search use find api, no offset, limit available, so no pagination 
                              '&where=1=1' '&where=1%3D1' means select all records 
                              By setting where=9999=9999 and returnCountOnly as true, 
                              the result is an approximate count that is returned very quickly. 
                              For accurate, but slower to return, row counts, use any other filter (e.g. where: 1=1)
    
                                                          improvement: 
                                                          https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
    
                                                          sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                                          example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0
    
                                                          if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10
                                                          since we not sure, we can only try both, if 100 not work, then get default 2000 
                                                      */     
                            var _fulltextSearch_parameter = '&where=9999=9999'; // fast
                            // var _fulltextSearch_parameter = '&where=1=1'; // slow 
                            var _findLayer_url

                            if (_keyword.length > 0) {

                              // have search keyword,   means searching , default use pagination, but options are use all-in-one-page, no paging 

                                                    // use find api, do not use pagination any more ,arcgis attribute table, only browsing use pagination,  search use find api, no offset, limit available, so no pagination 
                                                    $('#clear_search_result_button').show();
                                                    $('#pagination-container').hide();
                                                    console.log('use find api, do not use pagination any more  ....._keyword ::: ', _keyword)
                                                    
                                                    



                                                     
                                                            /*
                                                                Do not use find api at anytime, because find api does not have paging. 
                                                                Always use query? where api, because it have paging. 
  




                                                                FeatureServer and table do not support 'find' api,  must use 'where='
                                                                 1)  Type: Feature Layer, may support 'find' api if url include MapServer, otherwise, FeatureServer will not support find api
                                                                 2)  Type: Table, do not support 'find' api, must use 'where='   for example : https://gis.la-quinta.org/arcgis/rest/services/BaseMap/parcels_table/MapServer/3
                                                           
                                                            console.log(' check _featurelayerJSON.type use find or where api ', _featurelayerJSON.type)
                                                            if ((_featurelayerJSON.type == 'Table')
                                                                 || (_url.includes('FeatureServer'))
                                                                   || (_url.includes('MapServer'))  
                                                            ){
                                                               // FeatureServer and table do not support 'find' api,  must use 'where='
                                                            */

                                                               //Always use query? where api, because it have paging. 

                                                               // ===== ==== query?where= ===== ====  support paging if possible ===== ====


                                                               console.log('either url has FeatureServer or type is table  !!!! find api not supported, must use https://<mapservice-url>/0?query=where', _url)
                                                              
                                                               var ___where_clause_operator = 'like'   //event.data.clause_operator
                                                               console.log(' query?where clause operator : ', ___where_clause_operator)

                                                               // 'like' cost 100 times than '=' 
                                                               //var _where_condition = 'ASSETID = 1487468' 
                                                               //var _where_condition = "PIND like '%129A213' or PIND like '129A213%' or PIND like '%129A213%'"
                                                               //var _where_condition = "PIND like '129A213%'"
                                                               //var _where_condition = "BOOK like '5148'"
                                                               
                                                               var _where_condition = build_where_condition_single_keyword(_keyword, ___where_clause_operator)
                                                               console.log('feature-server only -> query?where ->  ', _where_condition)  

                                                               
                                                               // -------------- search result paging or not  --------------
                                                               if ((_supportsPagination) && (_search_result_paging_or_not == 'paging')){

                                                                                     // pagination supported
                                                                                     $('#pagination-container').show()



                                                                                     var _url_count_where_api = ___url + '/'+  _layer_id + '/query?f=json&returnCountOnly=true'+ '&where=' + _where_condition;
                                                                                     console.log('_url_count_where_api  ',_url_count_where_api);
                                                                                     
                                                                                     _current_count_of_feature = await ajax_cross_origin(_url_count_where_api,  _cross);  // cross origin method  
                                                                                     if(_current_count_of_feature.hasOwnProperty('count')) {
                                                                                             _current_count_of_feature = _current_count_of_feature.count
                                                                                             _total_count_of_feature =  _current_count_of_feature
                                                                                             console.log('search something its count regards as new total : ', _total_count_of_feature);
                                                                                             display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                                           
                                                                                             page_sources=[];
                                                                                             for (var i = 1; i <= _current_count_of_feature; i++) {
                                                                                               page_sources.push(i);
                                                                                             }//for

                                                                                             $('#pagination-container').pagination({
                                                                                               dataSource: page_sources,
                                                                                               pageSize: page_size,
                                                                                               showGoInput: true,
                                                                                               showGoButton: true,
                                                                                               className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                               callback: function(data, pagination) {
                                                                               
                                                                                                   console.log('pagination call back data, returned data -> ', data) 
                                                                                                   // .... fix bug if data is [] ....
                                                                                                   var _off_set;
                                                                                                   if (data.length == 0) {
                                                                                                       _off_set = 0;
                                                                                                   }else {
                                                                                                     _off_set = data[0]-1;
                                                                                                   }
                                                                                                   // .... fix bug if data is [] ....


                                                                                                   
                                                                                                   console.log('pagination --- ', pagination)
                                                                               
                                                                                                   get_paged_json_by_limit_and_offset('&where=' + _where_condition,    page_size,_off_set);
                                                                                             
                                                                                               }
                                                                                             })   //$('#pagination-container) 


                                                                                     } else {
                                                                                                       // nothing found
                                                                                                       _current_count_of_feature = 0
                                                                                                       display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                                       //  ...... empty card panel and json-editor ...... 

                                                                                                       page_sources=[];
                                                                                                       $('#pagination-container').pagination({
                                                                                                         dataSource: page_sources,
                                                                                                         pageSize: page_size,
                                                                                                         showGoInput: true,
                                                                                                         showGoButton: true,
                                                                                                         className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                                         callback: function(data, pagination) {
                                                                                         
                                                                                                                         // empty json editor
                                                                                                                         show_json_viewer({features:[]},'Empty',  '')

                                                                                                                         
                                                                                                                         $('#message_div').empty();

                                                                                                         }
                                                                                                     })   //$('#pagination-container) 
                                                                                                 
                                                                                           //  ...... empty card panel and json-editor ...... 

                                                                                           

                                                                                     }// if else 



                                                                     

                                                               } else {

                                                                 // user choose no-paging,  or this arcgis server do not support pagination

                                                                       // pagination not supported, should hide pagination bar
                                                                       $('#pagination-container').hide()

                                                                       // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=ASSETID = 1723459
                                                                       // must specify &outSR=4326& in URL, because gis layer default srid is NOT 4326
                                                                       // srid=4326 is only srid for lat long

                                                                       // parameter reference: 
                                                                       //https://developers.arcgis.com/rest/services-reference/query-map-service-layer-.htm

                                                                       _findLayer_url = ''
                                                                       _findLayer_url = _url + '/'+  _layer_id 
                                                                       _findLayer_url += '/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=' 
                                                                       _findLayer_url += _where_condition
                                                                         // the map service defaults it to maxRecordCount. The maximum value for this parameter is the value of the layer's maxRecordCount property. 
                                                                         // resultRecordCount= 
                                                                         // error "Pagination is not supported." This parameter only applies if supportsPagination is true.
                                                                         //_findLayer_url += '&resultRecordCount=100'


                                                                         // empty json editor
                                                                         show_json_viewer({features:[]},'Empty',  '')
                                                                         
                                                                         var success_returnBack= await ajax_cross_origin(_findLayer_url,  _cross);  // cross origin method  
                                                                         console.log(' find api,  result :  ',success_returnBack)
                                                                         show_json_viewer(success_returnBack,'records',  _search_data_content)
                                                                         
                                                                         $('#message_div').empty();

                                                               }//if


                                                                 
                                                           // ===== ====  end   ===== ====  query?where= ===== ====    support paging if possible ===== ====


                                                   /*       

                                                    Keep find api source code here, but Do not use find api at anytime, because find api does not have paging. 

                                                       } else {


                                                          // . . . find api   . . . https://<mapservice-url>/find     https://developers.arcgis.com/rest/services-reference/find.htm

                                                         // MapServer have 2 option, can use both find api and where api, Warning: no paging in find api, where api has paging

                                                         // pagination not supported, should hide pagination bar
                                                         $('#pagination-container').hide()


                                                               _findLayer_url = _url + '/find?f=json'
                                                               _findLayer_url += '&layers=' +  _layer_id  
                                                               // _findLayer_url += '&searchFields=' +  ''    // not specify, will search all field
                                                               _findLayer_url += '&sr=' +  '4326'    // well-known ID not specify, output geometries are returned in the spatial reference of the map
                                                               _findLayer_url += '&searchText=' +  encodeURIComponent(_keyword)  // must encode, for 2 key word with space between , "keyword1 keyword2", however ESRI find api do not support 2 keywords cross different field. Only socrata support 2 key word cross different field. 
                                                               _findLayer_url += '&contains=true'  
                                                               _findLayer_url += '&returnGeometry=false'
                                                               _findLayer_url += '&returnFieldName=true'  // must have for 'field mask', default is 'false'. search result will use 'field alias', not true field name, field mask use true field name. so both are not match.
                                                               console.log(' _findLayer_url ', _findLayer_url) 


                                                               // empty json editor
                                                               show_json_viewer({features:[]},'Empty',  '')
                                                               
                                                               var success_returnBack= await ajax_cross_origin(_findLayer_url,  _cross);  // cross origin method  
                                                               console.log(' find api,  result :  ',success_returnBack)
                                                               show_json_viewer(success_returnBack,'records',  _search_data_content)
                                                               
                                                               $('#message_div').empty();

                                                       }//if 

                                               */





                                                

/* 
                                                 if (_keyword.length == 0) {
                                                        
                                                               search empty keywords means no filter, list all records
                                                               both mapserver and feature server use same 'query' api,   
                                                               https://developers.arcgis.com/rest/services-reference/enterprise/query-map-service-layer-.htm
                                                         
                                                         _findLayer_url = ''
                                                         _findLayer_url = _url + '/'+  _layer_id 
                                                         _findLayer_url += '/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326' 
                                                         _findLayer_url += _fulltextSearch_parameter
                                                 }

*/

                                                 




                          } else {
                                
                           

                                                        // arcgis attribute table, only browsing use pagination,
                                                        $('#pagination-container').show();

                                        
                                                        try {
                                                
                                                                          var _url_count = ___url + '/'+  _layer_id + '/query?f=json&returnCountOnly=true'+ _fulltextSearch_parameter;
                                                                          
                                                                          console.log('_url_count - ',_url_count);
                                                                    

                                                                        
                                                                        // ---------- count pagination ---------------

                                                                    
                                                                                     

                                                                                        

                                                                                        console.log('ajax cross origin(_url_count,  _cross) ',_url_count,  _cross)

                                                                                        _current_count_of_feature = await ajax_cross_origin(_url_count,  _cross);  // cross origin method  




                                                                                      

                                                                                      
                                                                                      if(_current_count_of_feature.hasOwnProperty('count')) {
                                                                                          
                                                                                                                      
                                                                                                                      // does exist
                                                                                                                  

                                                                                                                      _current_count_of_feature = _current_count_of_feature.count


                                                                                                                      if (_search_data_content.length == 0){
                                                                                                                      
                                                                                                                          _total_count_of_feature =  _current_count_of_feature

                                                                                                                          console.log('_total_count_of_feature : ', _total_count_of_feature);
                                                                                                                      }   

                                                                                                                          display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                                    




                                                                                                                          page_sources=[];
                                                                                                                          for (var i = 1; i <= _current_count_of_feature; i++) {
                                                                                                                                  page_sources.push(i);
                                                                                                                              }
                                                                                                                            
                                                                                                                              
                                                                                                                          
                                                                                                                          


                                                                                                                          
                                                                                                                          $('#pagination-container').pagination({
                                                                                                                              dataSource: page_sources,
                                                                                                                              pageSize: page_size,
                                                                                                                              showGoInput: true,
                                                                                                                              showGoButton: true,
                                                                                                                              className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                                                              callback: function(data, pagination) {
                                                                                                              
                                                                                                                                  console.log('pagination call back data, returned data -> ', data) 
                                                                                                                                  // .... fix bug if data is [] ....
                                                                                                                                  var _off_set;
                                                                                                                                  if (data.length == 0) {
                                                                                                                                      _off_set = 0;
                                                                                                                                  }else {
                                                                                                                                    _off_set = data[0]-1;
                                                                                                                                  }
                                                                                                                                  // .... fix bug if data is [] ....


                                                                                                                                  
                                                                                                                                  console.log('pagination --- ', pagination)
                                                                                                              
                                                                                                                                  get_paged_json_by_limit_and_offset(_fulltextSearch_parameter,page_size,_off_set);
                                                                                                                            
                                                                                                                              }
                                                                                                                          })   //$('#pagination-container) 
                                                                                                                      
                                                                                                                      
                                                                                                                    


                                                                                              } else {
                                                                                                  
                                                                                                
                                                                                                  // nothing found
                                                                                                
                                                                                                  _current_count_of_feature = 0
                                                                                                  display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                                                                                

                                                                                                  //  ...... empty card panel and json-editor ...... 

                                                                                                                page_sources=[];
                                                                                                                $('#pagination-container').pagination({
                                                                                                                  dataSource: page_sources,
                                                                                                                  pageSize: page_size,
                                                                                                                  showGoInput: true,
                                                                                                                  showGoButton: true,
                                                                                                                  className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                                                                                                  callback: function(data, pagination) {
                                                                                                  
                                                                                                                                  // empty json editor
                                                                                                                                  show_json_viewer({features:[]},'Empty',  '')

                                                                                                                             
                                                                                                                                  $('#message_div').empty();

                                                                                                                  }
                                                                                                              })   //$('#pagination-container) 
                                                                                                          
                                                                                                    //  ...... empty card panel and json-editor ...... 

                                                                                                    

                                                                                              }// if else 




                                                                        // ----------   end --------- count pagination ---------------



                                                                                  

                                                        } catch(err) {

                                                            console.log(err)

                                                            var _show_message = err
                                                            if (_show_message.length == 0) {
                                                                _show_message = 'Data Source Current Not Available, Try Again Next Time.'
                                                            }
                                                           
                                                            show_message('message_div', _show_message);

                                                            
                                                        }// try catch


                        }//if

           } //async function 



                
                
  
  
  
  
  
  
  
  
  
  
  
  
  





  
  
  // document ready short hand
  
  
  (async function($){
  
   
             init_global_var_from_node();
             console.log(' root url ', _url)
            
             // for search feature attributes table
             await get_feature_attributes_onlyForFeatureTable(_layer_id);
             console.log(' _feature_attributes_string',  _feature_attributes_string)
               
             display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)

              init_search_button_event_handler()

              // main entrance, everything start here  
              search_by_url_param()

})(jQuery);
