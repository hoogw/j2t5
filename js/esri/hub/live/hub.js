


/**/
//  --- for hub.com v1   --- 
/**/


// each time only pick one

// if combine 2 year, total 7k-8k, will always failed in half. only get 3k-4k, so don't combine years. 


// 2016
// 1/1/2016 - 1/1/2017 created 0
var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201451606400000%20AND%201483228800000))"

// everyting start 2017.

// 2017
// 1/1/2017 - 1/1/2018 created 402
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201483228800000%20AND%201514764800000))"



// 2018
// 1/1/2018 - 1/1/2019 created 819
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201514764800000%20AND%201546300800000))"


// 2019
// 1/1/2019 - 1/1/2020 created 1586
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201546300800000%20AND%201577836800000))"


// 2020
// 1/1/2020 - 1/1/2021 created 4416
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201577836800000%20AND%201609574399999))"


// 2021
// 1/1/2021 - 1/1/2022 created 4262
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201609488000000%20AND%201640995200000))&limit=12&startindex=13&sortBy=-properties.modified"


// 2022
// 1/1/2022 - 1/1/2023 created 4154
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201640995200000%20AND%201672646399999))&limit=12&startindex=13&sortBy=-properties.modified"


// 2023
// 1/1/2023 - 1/1/2024 created 4406
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201672560000000%20AND%201704182399999))&limit=12&startindex=13&sortBy=-properties.modified"


// 2024
// 1/1/2024 - 1/1/2025 created 4426
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201704096000000%20AND%201735804799999))&limit=12&startindex=13&sortBy=-properties.modified"


// 2025
// 1/1/2025 - 3/26/2025 created 787
//var ___url_string_full_list ="https://hub.arcgis.com/api/search/v1/collections/site/items?filter=((openData%3Dtrue))%20AND%20((created%20BETWEEN%201735718400000%20AND%201743058799999))"




/**/
//  --- end  ---  for hub.com v1    --- 
/**/







var input_current       // whole array of json, without filter, 
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





/**/
//  --- for hub.com v1   --- 
/**/


function rendering_json_to_html(_results) {

  var html = '';

  html += '<div>';
              
  if (_results.length > 0) {

               html += '<ol class="custom-counter">';

               for (var i = 0; i < _results.length; ++i){



    // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
      
    // sometime attributes.url is NOT null, but attributes.siteUrl is null.   if url is null, siteUrl always is null
      var ___siteUrl = _results[i].properties.url;   // true site url 
       
      // - - hub only - -
      var _source = _results[i].properties.source;
      var _title = _results[i].properties.title;

      var hub_name = _results[i].properties.name;
      var hub_orgId = _results[i].properties.orgId;    
             
      var hub_created  = convertTimestampToHumanTime(Number(_results[i].properties.created));
      var hub_modified = convertTimestampToHumanTime(Number(_results[i].properties.modified));
      
      var hub_owner = _results[i].properties.owner;

      // - - hub only - -
      var hub_numViews = _results[i].properties.numViews; 
      
      var hub_id = _results[i].properties.id;
      
      var hub_description = _results[i].properties.description;

      var hub_created_timestamp  = _results[i].properties.created;
      var hub_created  = convertTimestampToHumanTime(hub_created_timestamp);
      var hub_modified_timestamp = _results[i].properties.modified;
      var hub_modified = convertTimestampToHumanTime(hub_modified_timestamp);


      
      //- - only opendata v3 - - removed on hub v1  - - 

      //var hub_orgName = _results[i].properties.orgName;    
      //var hub_organization = _results[i].properties.organization; 
      //var hub_orgContactEmail = _results[i].properties.orgContactEmail; 
     
      //var hub_region = _results[i].properties.region;
      //var hub_searchDescription = _results[i].properties.searchDescription;
      //var hub_server = _results[i].properties.server;
      //var hub_siteUrl = _results[i].properties.siteUrl;
      //var hub_slug = _results[i].properties.slug;
      //var hub_sourceProvenance = _results[i].properties.sourceProvenance;
      //var hub_hubType = _results[i].properties.hubType;

      //var links_self = _results[i].links.self;
      //var links_rawEs = _results[i].links.rawEs;
      //var links_itemPage = _results[i].links.itemPage;
      //var links_esriRest = _results[i].links.esriRest;


       //   - - end - - only opendata v3 - - removed on hub v1  - - 



      
      
      
      var hub_type = _results[i].properties.type;

      var hub_url = _results[i].properties.url;
      var hub_snippet = _results[i].properties.snippet;
      var hub_culture = _results[i].properties.culture;

      // - - hub only - -
      var links_href = _results[i].links.href;

      

      var org_short_name = ''
      org_short_name = getStringBetweenChars(___siteUrl, '-', '.hub.arcgis.com')
      if (!(org_short_name)){org_short_name = getStringBetweenChars(___siteUrl, '-', '.opendata.arcgis.com')}

        var hubsite_short_name = ''
        hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.hub.arcgis.com')
        if (!(hubsite_short_name)){hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.opendata.arcgis.com')}



      var portal_json_url = ''
      if (hub_orgId){ portal_json_url = 'https://www.arcgis.com/sharing/rest/portals/' +  hub_orgId + '?f=pjson'}

      var org_home_page_url = ''
      var org_home_gallery_url = ''
  if (org_short_name){ 
      org_home_page_url = 'https://' +  org_short_name + '.maps.arcgis.com'
      org_home_gallery_url = org_home_page_url + portal_gallery_html
  }
      
      var esri_hosted_arcgis_server_url = ''
      if (hub_orgId){ esri_hosted_arcgis_server_url = 'https://services.arcgis.com/'  + hub_orgId + '/arcgis/rest/services'}

          


         // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************

                        html += '<li>' // css .ordered_list_number{ size font}
                        html += '&nbsp;';

                        html += '<a target="_blank" href="' + ___siteUrl + '">';
                        html +=   ___siteUrl 
                        html += '</a>'; 
                        html += '&nbsp;&nbsp;&nbsp;';
                       
                        html += '<span class="context"><b>'  + _source + '</b></span>' 
                        html += '&nbsp;&nbsp;&nbsp;';
                        html += '<span class="context">'  + _title + '</span>' 
                        html += '&nbsp;&nbsp;&nbsp;';
                        
                        
  
                        //html += '<br>';

                        html += '<span style="font-size:20.7px;font-weight:900; background-color:#FFA07A;" class="context">'  + hub_orgId + '</span>' 
                        html += '&nbsp;&nbsp;&nbsp;';
                        html += '<span style="font-size:20.7px;font-weight:900; background-color:#FFA500;" class="context">'  + org_short_name + '</span>' 
                        html += '&nbsp;&nbsp;&nbsp;';
                       
                        
                       
                        html += '<span style="font-weight:100; background-color:#E6E6FA;" class="context">'  + hub_owner + '</span>' 
                        html += '&nbsp;&nbsp;&nbsp;';
                        html += '<span style="font-weight:100; background-color:#ADFF2F;" class="context">'  + hub_numViews + '</span>' 
                        html += '&nbsp;&nbsp;&nbsp;';


                        html += '<span style="font-size:10.3px;">' + hub_created + '</span>'
                        html += '&nbsp;&nbsp;&nbsp;';
                        html += '<span style="font-size:10.3px;">' + hub_modified + '</span>'
                        html += '&nbsp;&nbsp;&nbsp;';
                    
                        html += '<br><br>';    
                        html += '</li>';

               }// for

               html += '</ol>';
  } 

  html +='</div>'
  $('#json-renderer').html(html);

}  // function

     

/**/
//  --- end  ---  for hub.com v1    --- 
/**/



      



                                
  
                  //   *******  search event related   *******   


                               /**/
                                // simple for loop ( no lunr.js)
                                function search_layer_now() {


                                  // reset scroll position to 0, means top 
                                  $("#json-renderer").scrollTop(0);

                                    _filter_by = $('#filter_by').val().toLowerCase().trim();

                                    var _filter_by_array = _filter_by.split(" ");
                                    
                                    console.log('_filter_by  --->  ', _filter_by)
                                    
                                    update_url_parameter('filter_by', _filter_by);
                                    
                                    
                                    
                                      if (_filter_by.length > 0) {  
                                    
                                    
                                                  $('#clear_search_result_button').show();

                                                  // ............. filter results  ....................
                                              
                                                      _filtered_results = [];
                                                      var _test_string
                                                      var _valid

                                                      if (input_current.length > 0) {

                                                            for (var i = 0; i < input_current.length; ++i) {

                                                                _test_string = input_current[i].properties.name;

                                                                if (_test_string){
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

                                                                              }// if 
                                                                } // if
                                                          }// for
                                                      }// if

                                                   show_current(_filtered_results, '_filtered_results')
                                
                                            // ..........  End ... filter results base on _search_for  ....................          

                                    } else {
                                          
                                          // only if filter by empty keyword, re-render whole data set
                                          // same idea, but clear search result will also remove clear button, update url param etc....
                                         
                                          clear_search_result()
                                          
                                      }

                                      // fix bug, must init tooltips(), every time get new search result
                                      // $('.tooltipped').tooltip();

                                }





                                function clear_search_result(){
                                    $('#clear_search_result_button').hide();
                                    $('#filter_by').val('');
                                    _search_data_content='';
                                    update_url_parameter('filter_by','');
                                    show_current(input_current, 'input_current')       
                                }



                               
   

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
                                                    
                                                  rendering_json_to_html(_filtered_results)
    
                                                  // must highlight key words
                                                  highlight_keywords()
    
                                                  need_render_all = '';
                                                  break;
    
    
                                          case 'input_current':
    
    
                                                // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                                // only reset scroll to top when re-render new data.   
                                                // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                                rendering_json_to_html(input_current)
    
    
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
                                      // $('#start_search_button').on('click',search_layer_now) 


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


                                        /**/
                                        // - - - - download json csv  - - - - 
                                        /**/
                                       
                                        $("#download_json_button").on("click", function() {
                                          console.log('ready_download_json', ready_download_json)
                                          saveJsonAsFile('full_raw_list.json', ready_download_json)
                                        });
                                      /**/
                                      //  - - - -  end  - - - -  download json csv   - - - - 
                                      /**/

                            }



                  //   *******   end  ******   search event related   *******      






/**/



  

               // - -  -  -  streaming   - -  -  -  
                

                        function init_streaming_event_handler() {

                          remove_loading_img_spinner('ajax_getJson_processing');

                          $("#pause_streaming_button").hide(); 
                          $("#resume_streaming_button").hide(); 
                          $("#stop_streaming_button").hide(); 
                          

                          $('#start_streaming_button').on('click',start_streaming);
                          $('#pause_streaming_button').on('click',pause_streaming);
                          $('#resume_streaming_button').on('click',resume_streaming);
                          $('#stop_streaming_button').on('click',stop_streaming);
                        
                          }


                          
                          // this function only run 1 time
                          async function start_streaming(){
                              
                              
                            stop_search_status = false;
                            pause_search_status = false;
                            input_current = []; 

                            $("#pause_streaming_button").show(); 
                            $("#resume_streaming_button").hide(); 
                            $("#stop_streaming_button").show(); 

                                                                
                                      var ___url_getJson = ___url_string_full_list;
                                          //console.log(___url_getJson)
                                      var _this_page_raw_return = {}
                                      var _next_page_url = ___url_getJson;

                                      show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_string)  
                            
                                      // first time ajax only need total site number, not using the data
                                      _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                                      
                                      
                                      
                                      
                                                  
/**/
//  --- for hub.com v1   --- 
/**/

  
                                      // only for opendata v3 url https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[openData]=true&sort=create
                                       // __total_item_count = _this_page_raw_return.meta.stats.totalCount;

                                       // for hub.com v1 url https://hub.arcgis.com/api/search/v1/collections/site
                                       __total_item_count = _this_page_raw_return.numberMatched
                                      
     

                                      
                                    
                                      
                                      
                                          // each ajax get 1 page 20 item

                                          // step 1 use this, get 1 - 10000 range
                                         // for (i = 0; i < (__total_item_count / 20 ); i++) { 
                                          
                                          // step 2 ( hub.site.live2 )run this get 10000 - 17603 range   7603 / 20 = 380 +1 = 381
                                        for (i = 0; i < ( 381 ); i++) { 
                                          
                                                // only run if  user clicked the stop button, killed streaming 
                                                if (stop_search_status){
                                                    
                                                    // stop = true, means user clicked the stop button, killed streaming 

                                                    // in case of user clicked pause, when streaming ended, update the final result  
                                                    show_current(input_current, 'input_current')
                                                    console.log(' stop, killed, final showing ----###--- ',  input_current)


                                                    // url  ...&sfilter_by=xxx,  show filtered results
                                                    filter_result_by_filter_by()


                                                    return;  // return streaming function ( include break for loop )
                                                }
                                          
                                          
                                          
                                          
                                          
                                                console.log(' for loop - next page url - ',  i,  _next_page_url)
                                          
                                          
                                                    _this_page_raw_return = {}

                                                    _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                                                                                                    
                                                    if ((_this_page_raw_return) && (_this_page_raw_return.features)){
                                                        
                                                                  var __this_page_array = _this_page_raw_return.features
                                                    
                                                    
                                                                  // we want to add new array from the beginning of old array, to show changing to the user. 
                                                                  //https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
                                                                    // input_current = input_current.concat(_this_page_raw_return.features);
                                                                    
                                                                    //hub.data.search.js:668 Uncaught (in promise) TypeError: input_current.unshift is not a function
                                                                    //unshift only works for 1 element, not work for another array.
                                                                    // input_current = input_current.unshift(_this_page_raw_return.features);
                                                                    
                                                                    
                                                                    input_current = __this_page_array.concat(input_current);
                                                                    
                                                                    
                                                                    _next_page_url = ''
                                                                    for (let i = 0; i < _this_page_raw_return.links.length; i++) {
                                                                      if (_this_page_raw_return.links[i].rel == 'next'){
                                                                        _next_page_url = _this_page_raw_return.links[i].href
                                                                      }
                                                                    }

                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      
                                                                      // even user click pause button, streaming still runing sending ajax query in background
                                                                      if (! pause_search_status){

                                                                          // pause = false, means not pause, need show partial result

                                                                            // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                                                          show_current(input_current, 'input_current')
                                                                        

                                                                        } else {
                                                                              // pause = true, means user clicked pause button, streaming still running, but not update the 
                                                                            
                                                                        }
                                                                    
                                                                    
                                                                    
                                                                    
                                          
                                                    }// if
                                                    
                                                    

                                                  

                                          } // for
                                          
                                  
/**/
//  --- end  ---  for hub.com v1    --- 
/**/

                                         
                                          
                                          
                                        // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                        show_current(input_current, 'input_current')
                                        console.log(' stream ended, final showing ----###--- ',  input_current)

                                        // url  ...&sfilter_by=xxx,  always, all time show filtered results
                                        filter_result_by_filter_by()
                        
                                        remove_loading_img_spinner('ajax_getJson_processing');
                                        $("#pause_streaming_button").hide(); 
                                        $("#resume_streaming_button").hide(); 
                                        $("#stop_streaming_button").hide(); 
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
                                show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_string)
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


                                /**/
                                      // - - - - download json csv  - - - - 
                                      /**/

                                      ready_download_json = _current_showing
                                      /**/
                                      //  - - - -  end  - - - -  download json csv   - - - - 
                                      /**/
           
                                          // console.log(' current showing ----###--- ',  _current_showing)
                                                                                                                               
                                             current_filter_result_count = _current_showing.length
                                             
                                             //$('#counter_label').html( '<span class="orange-text">&nbsp;' + current_filter_result_count + "</span>" + ' / ' + '<span class="green-text">' + __total_item_count + "&nbsp;</span>");  
                                             display_count_info('', current_filter_result_count, __total_item_count, 'counter_label')
                                           
                                             rendering_json_to_html(_current_showing.slice(0,short_list_count))
           
                                             highlight_keywords()
                                                               
           
                                             // reset scroll position to 0, means top 
                                             $("#json-renderer").scrollTop(0);
           
                                             
                                             if (current_filter_result_count > short_list_count){
           
                                                       need_render_all = _render_all_signal
           
                                             } else {
           
                                                       need_render_all = ''
                                             }
           
           
           
           
           
           
                             }
           
  
              //      - -  -  -   end    - -  -  -  streaming   - -  -  -  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // document ready short hand
  
  
  (async function($){
  
   
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()
               
               init_search_button_event_handler();

               init_scrollable()

               
               init_streaming_event_handler();
               
               // only when user click start button to start, uncomment here to auto start
               //start_streaming()
               
 
                // can't be here, must await until streaming completed
                // filter_result_by_filter_by()

  
  
})(jQuery);
