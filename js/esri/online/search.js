 




                 // first search get page-1, no next page key            
                 //https://opendata.arcgis.com/api/v3/search?q=Los+Angeles&agg[fields]=downloadable,hasApi,sector,region,source,tags,type,access&filter[collection]=any(Dataset)&filter[openData]=true
               
                 // following page-? will have page key
                 //https://opendata.arcgis.com/api/v3/search?q=Los+Angeles&agg[fields]=downloadable,hasApi,sector,region,source,tags,type,access&filter[collection]=any(Dataset)&filter[openData]=true&page[key]=eyJodWIiOnsic3RhcnQiOjIxfSwiYWdvIjp7InN0YXJ0IjoyMX19
               
               
               
                // all following base search url works,  (base search url) + (q= or filter[tags]=)   
                // var ___url_search_data ="https://opendata.arcgis.com/api/v3/search?agg[fields]=downloadable,hasApi,sector,region,source,tags,type,access&filter[collection]=any(Dataset)&filter[openData]=true" 
               
                // too narrow result search 'london' have 8  
               //var ___url_search_data ="https://opendata.arcgis.com/api/v3/search?&filter[collection]=any(Dataset)&filter[openData]=true" 

               // in use,  dataset only, feature layer, feature table, geojson, shapefile, csv only, NOT include web map, scene, etc..... search 'london' have 1.2k 
               var ___url_search_data ="https://opendata.arcgis.com/api/v3/search?&filter[openData]=true&agg[fields]=collection" 
               //var ___url_search_data ="https://opendata.arcgis.com/api/v3/search?&filter[collection]=any(Dataset)" 


               // not use, too much result,  everything, include web map, scene, feature layer, feature table, geojson, shapefile, csv,    search 'london' have 1.7k 
               // var ___url_search_data ="https://opendata.arcgis.com/api/v3/search?" 

                // block by cors (hub.arcgis.com)
                //var ___url_search_data ="https://hub.arcgis.com/search?collection=Dataset" 

                 //var ___url_search_data ="https://opendata.arcgis.com/api/v3/datasets?agg[fields]=downloadable,hasApi,sector,region,source,tags,type,access&filter[collection]=any(Dataset)&filter[openData]=true" 






 // NO lunr, no suggest, just simple for loop 

 //  hub search original page:    https://hub.arcgis.com/search?collection=Dataset&q=london%20water
 var original_search_portal_base_url = "https://hub.arcgis.com/search?q=";
    
// currently use :   opendata.arcgis.com/api/v3/search
 
// hoogw fork version:     https://gist.github.com/hoogw/902e75e569d851cc6a37fe3eff3b1cac
//  original         :   https://gist.github.com/jgravois/1b7ec5080e992a59f65cf7a2190e4365
//  hub v3 api follow this specification  --> json:api                https://jsonapi.org/
 
 
// for loop for search, no lunr, with mark.js
// no web worker, no stream


 // "input" was used in arcgis_common, do not use it here
 var input_current = [];  
 var _filtered_results   // filtered results


 var _filter_by // search filter by keyword
 var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500                 
 var short_list_count = 100                
 var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'

 var current_filter_result_count;
 var __total_item_count;

  
 // when stop search button clicked, this will become true.
 var stop_search_status = false;


 // when pause search button clicked, this will become true.
 var pause_search_status = false;

















  
  
  
  
  
  
  
  
  
  
  
  

                     
                     



                                
                                

  
                  //   *******  search event related   *******   


                                // simple for loop ( no lunr.js)
                                function search_layer_now() {

                                          


                                    



                                    _filter_by = $('#filter_by').val().toLowerCase().trim();

                                    
                                    var _filter_by_array = _filter_by.split(" ");
                                    
                                    console.log('_filter_by  --->  ', _filter_by)
                                    
                                    update_url_parameter('filter_by', _filter_by);
                                    
                                    
                                    
                                      if (_filter_by.length > 0) {  
                                    
                                    
                                                  //$('#clear_search_result_button').show();


                                    
                                                  // ............. filter results  ....................
                                    
                                              
                                                      _filtered_results = [];
                                                      var _test_string
                                                      var _valid

                                                      if (input_current.length > 0) {

                                                        for (var i = 0; i < input_current.length; ++i) {


                                                             //  not use : name + orgnization     
                                                              //_test_string = input_current[i].attributes.name + ' ' + input_current[i].attributes.orgName;
                                                              _test_string = input_current[i].attributes.name                                                   
                                                              _test_string = _test_string.toLowerCase();
                                                              



                                                                           _valid = true;

                                                                           //_filter_by_array.forEach(function(word){
                                                                          for (var k = 0; k < _filter_by_array.length; ++k) {





                                                                              // if(_test_string.includes(word)) {
                                                                              if(_test_string.indexOf(_filter_by_array[k]) > -1) {
                                                                                   // contain


                                                                               }else {
                                                                                   // Not contain

                                                                                   _valid = false;

                                                                               }// else





                                                                          } //for




                                                             if (_valid) {

                                                                  _filtered_results.push(input_current[i]);

                                                             }







                                                       }// for





                                                   }// if

                                                                      

                                                                  


                                                    show_current(_filtered_results, '_filtered_results')
                                
                                    
                                    


                                            // ..........  End ... filter results base on _search_for  ....................          

                                  
                                    } else {
                                          
                                          // only if filter by empty keyword, re-render whole data set
                                          // same idea, but clear search result will also remove clear button, update url param etc....
                                          //rendering_json_to_html(input_current)
                                          clear_search_result()
                                          
                                      }

                                      // fix bug, must init tooltips(), every time get new search result
                                      // $('.tooltipped').tooltip();

                            }





                            function clear_search_result(){

                              //  $('#clear_search_result_button').hide();   
                             
                                $('#filter_by').val('');
                              
                                _search_data_content='';
                                update_url_parameter('filter_by','');
      
                               
                                show_current(input_current, 'input_current')

                                

                                                                         
                            }



                                 
   
                            // special for search as  rendering json to html_for_search
                            function init_scrollable(){

                                                            
                              var back_to_top_button = $('#back_to_top_button');
                                              
                              $("#json-renderer").scroll(function() {
    
                                //console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                              // console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )
                              
    
                                if($("#json-renderer").scrollTop() > scroll_bottom_px ) {
    
    
                                      // console.log('--------------- close to bottom  --------------- ')
                                      // console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                                      //  console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )
    
                                      
                                      
    
                                        switch(need_render_all) {
    
    
                                          case '_filtered_results':
    
                                                  // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                                  // only reset scroll to top when re-render new data.   
                                                  // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                                    
                                                  rendering_json_to_html_for_search(_filtered_results)
    
                                                  // must highlight key words
                                                  highlight_keywords()
    
                                                  need_render_all = '';
                                                  break;
    
    
                                          case 'input_current':
    
    
                                                // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                                // only reset scroll to top when re-render new data.   
                                                // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                                rendering_json_to_html_for_search(input_current)
    
    
                                                // must highlight key words
                                                highlight_keywords()
                                                
                                                need_render_all = '';
                                                break;
    
    
    
                                          default:
                                            // nothing to render
    
    
    
                                        } // switch case
    
    
                                          
                                          back_to_top_button.addClass('show');
    
                                } else {
    
                                          back_to_top_button.removeClass('show');
    
                                }
    
    
    
    
    
    
    
                            });    //  .scroll()
    
    
    
                            back_to_top_button.on('click', function(e) {
                              e.preventDefault();
                              $("#json-renderer").animate({scrollTop:0}, scroll_bottom_px);
                            });
    
    
    
                            }
    
    



                            function init_search_button_event_handler(){

                                        // click search
                                      // $('#start_streaming_button').on('click',search_layer_now) 

                                        
                                      // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                                      $('#filter_by').on('search', search_layer_now);
                                  

                                          $('#clear_search_result_button').hide();
                                          $('#clear_search_result_button').on('click',clear_search_result);

                                          // fire when user every stroke any key  
                                          $("#filter_by").on('keyup',search_layer_now);
                                          
                                          // only fire when text field loose focus,  not fire when stroke any key  
                                          // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                          // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                          // $("#filter_by").change(search_layer_now);

                            }



                  //   *******   end  ******   search event related   *******      




/**/


               // - -  -  -  streaming   - -  -  -  
                

               function init_streaming_event_handler() {

                              $("#original_search_portal").attr("href", original_search_portal_base_url)

                              remove_loading_img_spinner('ajax_getJson_processing');

                              $("#pause_streaming_button").hide(); 
                              $("#resume_streaming_button").hide(); 
                              $("#stop_streaming_button").hide(); 
                              $("#clear_streaming_result").hide();


                              // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                              $('#search_data').on('search',prepare_streaming_url);
                              
                              $('#start_streaming_button').on('click',prepare_streaming_url);       // where only
                              $('#start_streaming_button_2').on('click',prepare_streaming_url_2); 


                              $('#clear_streaming_result').on('click',clear_streaming_result);   
                              
                              
                              $('#pause_streaming_button').on('click',pause_streaming);
                              $('#resume_streaming_button').on('click',resume_streaming);
                              $('#stop_streaming_button').on('click',stop_streaming);
                              
                              
                              // only update URL search_data=xxx, not perform real search.
                              $("#search_data").on('keyup', function(){

                                _search_data_content = $('#search_data').val().toLowerCase().trim();

                                console.log('search key word entered is ', _search_data_content);

                                update_url_parameter('search_data', _search_data_content);
                              
                                

                                
                                if (_search_data_content.length == 0) {
                                    
                                    clear_streaming_result()
                                }




                                  // special for search portal
                                  $("#original_search_portal").attr("href", original_search_portal_base_url + _search_data_content)


                                

                              });

                
                }



                var ___url_getJson     
                var _search_data_content
                var _search_content_split

                   // default tags search filter[tags]=all()    (where only)                      
                   function prepare_streaming_url_2(){ 

                     _search_data_content = $('#search_data').val().toLowerCase().trim();   // .trim()  Removes only leading & trailing whitespaces;
                     
                     if (_search_data_content.length !== 0){

                              console.log('search tag only --->  ', _search_data_content)
                              update_url_parameter('search_data', _search_data_content);
                              document.getElementById("title").innerHTML = _search_data_content;
                     
                              // https://gist.github.com/jgravois/1b7ec5080e992a59f65cf7a2190e4365

                              // currently use tag and name

                              // name= have little results, can ignore,  use tags= 
                              // var ___url_getJson = ___url_search_data  + "&filter[name]=all("    + _search_data_content + ")"
                              // console.log(' name = >>>>  ', ___url_getJson)

                              // filter[{attribute}] filter used to narrow the scope of dataset results. NOT used for 'fuzzy' scoring, /api/v3/datasets?filter[tags]=any(esri,boundaries) - returns a list of datasets that have EITHER 'esri' or 'boundaries' in their tags
                              ___url_getJson = ___url_search_data  + "&filter[tags]=all("    + _search_data_content + ")"
                              console.log(' tags search only = >>>>  ', ___url_getJson)

                              start_streaming()

                       } else {

                              clear_streaming_result()

                      }

                   }


                
                 //  q=xxx                  
                 function prepare_streaming_url(){ 

                           _search_data_content = $('#search_data').val().toLowerCase().trim();   // .trim()  Removes only leading & trailing whitespaces;
                           
                           if (_search_data_content.length !== 0){
                                              console.log('search  --->  ', _search_data_content)
                                              update_url_parameter('search_data', _search_data_content);
                                              document.getElementById("title").innerHTML = _search_data_content;

                                              // https://gist.github.com/jgravois/1b7ec5080e992a59f65cf7a2190e4365
                                    
                                              // too much results, 10k for london, 1.5k for phoenix, much are not related,just simply mention keywords, more keywords mention in name, tag, will ranked on top,  
                                              // q=    full-text query ('fuzzy' queries)  /api/v3/datasets?q=redlands parcels - will return results that best match a query for 'redlands parcels'
                                              ___url_getJson = ___url_search_data + "&q=" + _search_data_content 

                                              //___url_getJson = ___url_search_data + "&q=" + _search_data_content +   "&filter[tags]=all("    +  _search_content_split[0].trim()  +  "," +  _search_content_split[1].trim() + ")"
                                              //___url_getJson = ___url_search_data + "&q=" + _search_data_content +   "&filter[tags]=all("     +  _search_content_split[1].trim() + ")"

                                              console.log(' fuzzy search q=  ', ___url_getJson)

                                                start_streaming()
                            } else {

                                  clear_streaming_result()

                            }

                 }



                   
                 async function start_streaming(){
                       
                       stop_search_status = false;
                       pause_search_status = false;
                       input_current = [];  // partially accumulate..

                       $("#pause_streaming_button").show(); 
                       $("#resume_streaming_button").hide(); 
                       $("#stop_streaming_button").show(); 
                     
                       empty_last_time_result()
                       $("#json-renderer").show();
                       $("#clear_streaming_result").show();
                       $('#counter_label').text('searching...');
                       console.log('  _search_data_content ', _search_data_content.length)

                       if (_search_data_content.length > 0) {

                              //console.log(___url_getJson)
                               var _this_page_raw_return = {} 
                               var _next_page_url = ___url_getJson;
                               show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_getJson)
                               
                               _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                               
                               
                               /*  sample of search returns
                                 
                                 {
                                   "data": {...}
                       
                                   "meta": {
                                             "queryParameters": {
                                                                     "q": "ajax",
                                                                     "agg": {
                                                                       "fields": "downloadable,hasApi,sector,region,source,tags,type,access"
                                                                     },
                                                                     "filter": {
                                                                       "collection": "any(Dataset)",
                                                                       "openData": "true",
                                                                       "source": "not(ESRI R&D Center,ArcGIS Hub,Esri Support Services,City of X Hub,L10N Release,City of Smartville,Esri Canada Training,Esri State Sales Team Mapping Platform,Agency Online Organization)",
                                                                       "isCancelled": "eventsEq(false)",
                                                                       "status": "not(private,draft,planned)",
                                                                       "endDate": "eventsBefore(1568218595969)"
                                                                     },
                                                                     "page": {
                                                                       "key": "eyJodWIiOnsic3RhcnQiOjExfSwiYWdvIjp7InN0YXJ0IjoxMX19",
                                                                       "size": 10
                                                                     }
                                                                   },
                                 
                                             "stats": {
                                                         "count": 10,
                                                         "totalCount": 24,

                                                         "aggs": {
                                                               "downloadable": [
                                                                 {
                                                                   "key": "true",
                                                                   "docCount": 24
                                                                 }
                                                               ],
                                                               "access": [
                                                                 {
                                                                   "key": "public",
                                                                   "docCount": 24
                                                                 }
                                                               ],
                                                               "hasApi": [
                                                                 {
                                                                   "key": "true",
                                                                   "docCount": 24
                                                                 }
                                                               ],
                                                               "source": [
                                                                 {
                                                                   "key": "town of ajax",
                                                                   "docCount": 22
                                                                 },
                                                                 {
                                                                   "key": "region of durham",
                                                                   "docCount": 1
                                                                 },
                                                                 {
                                                                   "key": "state of maine",
                                                                   "docCount": 1
                                                                 }
                                                               ],
                                                               "type": [
                                                                 {
                                                                   "key": "feature layer",
                                                                   "docCount": 21
                                                                 },
                                                                 {
                                                                   "key": "feature service",
                                                                   "docCount": 2
                                                                 },
                                                                 {
                                                                   "key": "table",
                                                                   "docCount": 1
                                                                 }
                                                               ],
                                                               "region": [
                                                                 {
                                                                   "key": "ca",
                                                                   "docCount": 23
                                                                 },
                                                                 {
                                                                   "key": "us",
                                                                   "docCount": 1
                                                                 }
                                                               ],
                                                               "sector": [
                                                                 {
                                                                   "key": "local and state government",
                                                                   "docCount": 19
                                                                 }
                                                               ],
                                                               "tags": [
                                                                 {
                                                                   "key": "recreation",
                                                                   "docCount": 8
                                                                 },
                                                                 {
                                                                   "key": "civic",
                                                                   "docCount": 5
                                                                 },
                                                                 {
                                                                   "key": "community",
                                                                   "docCount": 5
                                                                 },
                                                                 {
                                                                   "key": "planning",
                                                                   "docCount": 5
                                                                 },
                                                                 {
                                                                   "key": "ajax",
                                                                   "docCount": 4
                                                                 },
                                                                 {
                                                                   "key": "bicycle",
                                                                   "docCount": 3
                                                                 },
                                                                 {
                                                                   "key": "boundaries",
                                                                   "docCount": 3
                                                                 },
                                                                 {
                                                                   "key": "boundary",
                                                                   "docCount": 3
                                                                 },
                                                                 {
                                                                   "key": "culture",
                                                                   "docCount": 2
                                                                 },
                                                                 {
                                                                   "key": "cycle",
                                                                   "docCount": 2
                                                                 }
                                                               ]
                                                             }
                                                           },
                                                           "next": "https://opendata.arcgis.com/api/v3/search?q=ajax&agg%5Bfields%5D=downloadable%2ChasApi%2Csector%2Cregion%2Csource%2Ctags%2Ctype%2Caccess&filter%5Bcollection%5D=any%28Dataset%29&filter%5BopenData%5D=true&page%5Bkey%5D=eyJodWIiOnsic3RhcnQiOjIxfSwiYWdvIjp7InN0YXJ0IjoyMX19"
                                                         }
                       
                       
                                           }
                       
                       
                                 */
                               
                                 __total_item_count = _this_page_raw_return.meta.stats.totalCount;
                               
                              for (i = 0; i < (__total_item_count / 10 ); i++){ 
                                   
                                         // only run if  user clicked the stop button, killed streaming 
                                         if (stop_search_status){
                                                        // stop = true, means user clicked the stop button, killed streaming 

                                                        // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                                        show_current(input_current, 'input_current')
                                                        console.log(' stop, killed, final showing ----###--- ',  input_current)
                                                       
                  
                                                        // url  ...&sfilter_by=xxx,  show filtered results
                                                        filter_result_by_filter_by()

                                                        return;  // return streaming function ( include break for loop )
                                         }
                                   
                                   
                                   
                                   
                                   
                                   
                                   
                                   
                                             _this_page_raw_return = {}

                                             _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                                   
                                   
                                               
                                             if ((_this_page_raw_return) && (_this_page_raw_return.data)){
                                                 
                                                       var __this_page_array = _this_page_raw_return.data
                                             
                                             
                                                           // we want to add new array from the beginning of old array, to show changing to the user. 
                                                           //https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
                                                             // input_current = input_current.concat(_this_page_raw_return.data);
                                                             
                                                             //hub.data.search.js:668 Uncaught (in promise) TypeError: input_current.unshift is not a function
                                                             //unshift only works for 1 element, not work for another array.
                                                             // input_current = input_current.unshift(_this_page_raw_return.data);
                                                             
                                                             

                                                             // only for show user downloading progress, with latest result on top,
                                                             input_current = __this_page_array.concat(input_current);
                                                             

                                                               _next_page_url = _this_page_raw_return.meta.next;
                                                               
                                                               
                                                               
                                                               // pause still send ajax query behind
                                                               if (! pause_search_status){
                                                                   
                                                                       // pause = false, means not pause, need show partial result

                                                                       // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                                                       show_current(input_current, 'input_current')

                                                             
                                                             
                                                             } else {
                                                                 
                                                                     // pause = true, means user clicked pause button, streaming still running, but not update                                                                                     
                                                                                     
                                                                 
                                                             }
                                                             
                                                             
                                                             
                                                             
                                   
                                             }// if
                                             
                                             
                              } // for pages
                                   
                                            // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                            show_current(input_current, 'input_current')
                                            console.log(' stream ended, final showing ----###--- ',  input_current)
                                            
                                            // url  ...&sfilter_by=xxx,  always, all time show filtered results
                                            filter_result_by_filter_by()







                       } else {
                                    search_message('Search key word is empty');
                                    $("#json-renderer").hide();

                       }  

                       remove_loading_img_spinner('ajax_getJson_processing'); 
                                    $("#pause_streaming_button").hide(); 
                                    $("#resume_streaming_button").hide(); 
                                    $("#stop_streaming_button").hide();


                                
                   }
                   
                   
                   
                   
                   
                  function empty_last_time_result(){
                     rendering_json_to_html_for_search({});
                  }   
                   
                   function clear_streaming_result(){
                       // if still sending request, need to stop it, otherwise, keep running.
                         stop_streaming()  


                         $('#search_data').val('');
                         $('#filter_by').val('');
                         $('#counter_label').html('');
                         update_url_parameter('search_data', '');
                         update_url_parameter('filter_by', '');
                         
                          // when update filter by, must re-create url search params, without this, it will keep use old last time filter by, while it should use updated filter by
                          urlParams = new URLSearchParams(window.location.search);

                                 $("#json-renderer").hide();
                                 $("#clear_streaming_result").hide();
                                 $("#counter_label").hide();
                                 
                          $("#original_search_portal").attr("href", original_search_portal_base_url)

                          console.log('set default page title  ===  Search Arcgis online hub')
                          document.getElementById("title").innerHTML = 'Search Arcgis online hub';

                       
                   }
                   
                   
                   
                   
                   function stop_streaming(){
                                stop_search_status = true
                                console.log('  stop button clicked ===> ' )
                                // we do not need to stop javascript or stop browser, we only need to stop/abort the for loop which keep send ajax request.
                                //works the same as browser 'x' button
                                //window.stop();
                                remove_loading_img_spinner('ajax_getJson_processing');

                                 $("#pause_streaming_button").hide(); 
                                 $("#resume_streaming_button").hide(); 
                                 $("#stop_streaming_button").hide(); 
                   }
                   
                   
                   
                   
                   
                   function resume_streaming(){
                        pause_search_status = false;
                        show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_getJson)
                        $("#pause_streaming_button").show(); 
                        $("#resume_streaming_button").hide(); 
                   }
                   
                   
                   
                   
                   function pause_streaming(){
                       pause_search_status = true;
                       remove_loading_img_spinner('ajax_getJson_processing'); 
                       $("#pause_streaming_button").hide(); 
                       $("#resume_streaming_button").show();
                   }
                   
                   
                   
                  
                   function show_current(_current_showing, _render_all_signal) {
                     // only show short list = 100, if more than limit, also mark  'need_render_all'  

                                
                                                                                                                    
                                  current_filter_result_count = _current_showing.length
                                  
                                  //$('#counter_label').html( '<span class="orange-text">&nbsp;' + current_filter_result_count + "</span>" + ' / ' + '<span class="green-text">' + __total_item_count + "&nbsp;</span>");  
                                  display_count_info('', current_filter_result_count, __total_item_count, 'counter_label')
                                  

                                  rendering_json_to_html_for_search(_current_showing.slice(0,short_list_count))

                                  highlight_keywords()
                                                    

                                  // reset scroll position to 0, means top 
                                  $("#json-renderer").scrollTop(0);

                                  
                                  if (current_filter_result_count > short_list_count){

                                            need_render_all = _render_all_signal

                                  } else {

                                            need_render_all = ''
                                  }






                  }


                             


                                
                   function search_message(__message_content){
                                                          

                    document.getElementById('message_div').innerHTML = __message_content;
                    remove_loading_img_spinner('ajax_getJson_processing');

                    
                }






                                 
                   function search_by_url_param(){


                     // based on URL ... &search_data=xxxx 
                       ___url_search_for = urlParams.get('search_data');









                       console.log('___url_search_data',  ___url_search_for)

                       if ((___url_search_for == undefined) || (___url_search_for == null) || (___url_search_for == '')){

                           // search for is null, undefined, nothing to search for


                       }else {

                         ___url_search_for = ___url_search_for.toLowerCase().trim();

                           $('#search_data').val(___url_search_for);
                           $("#original_search_portal").attr("href", original_search_portal_base_url + ___url_search_for)

                           // default search 
                           prepare_streaming_url()



                           // trigger keyup event, filter result by _search_for
                           // $(function() {
                                         // $('#search').keydown();
                                         //  $('item').keypress();
                             // both works (1)
                                         //  $('#search').on('keyup', );
                                         //  $('item').blur();
                             //         });




                               // both works (2)
                             // $('#search_data').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                       }

                 }






               //      - -  -  -   end    - -  -  -  streaming   - -  -  -  







  
  (async function($){
  
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()

               init_naming_panel()
               
               init_search_button_event_handler();

               init_scrollable()

               init_streaming_event_handler();

               // url  ...&search_data=xxx
               search_by_url_param()
               

               // Can't be here, must wait until streaming compete, to do filter. 
               // url  ...&sfilter_by=xxx
               //filter_result_by_filter_by()

})(jQuery);
