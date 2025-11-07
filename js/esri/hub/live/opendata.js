

// today is 2025-03-29

// step 1. 
// get 1st 10000
// created since 2017-01-01 to today, total 26281, but only get oldest 10000, last day is 2021-05-27 sort=created , means descending order from oldest  ->  newest
//var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[created]=2017-01-01&sort=created"


// step 2. 
// get 2nd 10000
// created since 2021-05-27 to today, total 16288, but only get oldest 10000, last day is 2023-10-06 sort=created , means descending order from oldest  ->  newest
//var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[created]=2021-05-27&sort=created"


// step 3. 
// get 3nd 10000
// created since 2023-10-06 to today, total 6301, but only get oldest 10000, last day is 2023-10-06 sort=created , means descending order from oldest  ->  newest
var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[created]=2023-10-06&sort=created"







// region: "US", with opendata=true totalCount:9972,    without opendata=true , totalCount:10038,
// if it is over 10000, for example: 100038,   step 1. sort=-modified get 1-10000, step 2. sort=modified, only get 1-38, add 2 part together.
//var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[openData]=true&filter[region]=US&sort=-modified"




 /*
          basic
          var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)"


          There is no api doc, but you can get from here:
              only opendata=true, sort by created time 
              parameter, look at, network traffic from   https://hub.arcgis.com/search?collection=Site&sort=-created
              sort= -created (date created),  -modified (date updated),  name (title)
              -  '-' in front of the attribute name means descending order 
         var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&filter[openData]=true&sort=-created"

     
*/

// step 1 run this, to get range 1 - 10000,  sort=-created , means descending order from newest -> oldest
//var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&sort=-modified"

// step 2  run this, to get range 10000 - 100805 , sort=created, means ascending order  oldest - newest, we only need 805, then manually connect(copy past) 2 file data into 1 
// we also need to adjust for loop range to 805/ 20 = 41, search by " step 2 "
// not use &filter[openData]=true,  give tens of more record
//var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&sort=modified"
 

/*
       step 3,  add 2 result together,  
     
                      step 1 get array { data:[ {1}...{10000}] }      sort=-created   
                      step 2 get array { data:[ {1}...{805}] }        sort=created 

         [{1}...{10000}, {1}...{805} ]
*/










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







  
  
  function rendering_json_to_html(_results) {

        var html = '';
      
        html += '<div>';
                    
        if (_results.length > 0) {

                     html += '<ol class="custom-counter">';

                     for (var i = 0; i < _results.length; ++i){



                // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
                     // sometime attributes.url is NOT null, but attributes.siteUrl is null.   if url is null, siteUrl always is null
                  var ___siteUrl = _results[i].attributes.url;   // true site url 
                  var ___siteUrl_alternative = _results[i].attributes.siteUrl;  


                  var hub_created_timestamp  = _results[i].attributes.created;
                  var hub_created  = convertTimestampToHumanTime(hub_created_timestamp);
                  var hub_modified_timestamp = _results[i].attributes.modified;
                  var hub_modified = convertTimestampToHumanTime(hub_modified_timestamp);

                  var _name = _results[i].attributes.name;   

                  var hub_orgId = _results[i].attributes.orgId;    
                  var hub_orgName = _results[i].attributes.orgName;    
                  var hub_organization = _results[i].attributes.organization; 
                  var hub_orgContactEmail = _results[i].attributes.orgContactEmail; 
                  var hub_owner = _results[i].attributes.owner;
                  var hub_region = _results[i].attributes.region;   


                                  
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
                             
                              html += '<span class="context"><b>'  + _name + '</b></span>' 
                              html += '&nbsp;&nbsp;&nbsp;';
                              
        
                              //html += '<br>';

                              html += '<span style="font-size:20.7px;font-weight:900; background-color:#FFA07A;" class="context">'  + hub_orgId + '</span>' 
                              html += '&nbsp;&nbsp;&nbsp;';
                              html += '<span style="font-size:20.7px;font-weight:900; background-color:#FFA500;" class="context">'  + org_short_name + '</span>' 
                              html += '&nbsp;&nbsp;&nbsp;';
                              html += '<span style="font-weight:100; background-color:#FFC0CB;" class="context">'  + hub_orgName + '</span>' 
                              html += '&nbsp;&nbsp;&nbsp;';
                              
                              html += '<span style="font-weight:100; background-color:#F0E68C;" class="context">'  + hub_orgContactEmail + '</span>' 
                              html += '&nbsp;&nbsp;&nbsp;';
                              html += '<span style="font-weight:100; background-color:#E6E6FA;" class="context">'  + hub_owner + '</span>' 
                              html += '&nbsp;&nbsp;&nbsp;';
                              html += '<span style="font-weight:100; background-color:#ADFF2F;" class="context">'  + hub_region + '</span>' 
                              html += '&nbsp;&nbsp;&nbsp;';


                              html += '<span style="font-size:10.3px;">' + hub_created + ' [-unix-time-' + hub_created_timestamp + ']' + '</span>'
                              html += '&nbsp;&nbsp;&nbsp;';
                              html += '<br>';
                              html += '<span style="font-size:10.3px;">' + hub_modified + ' [-unix-time-' + hub_modified_timestamp + ']' +'</span>'
                              html += '&nbsp;&nbsp;&nbsp;';
                          
                              html += '<br><br>';    
                              html += '</li>';

                     }// for

                     html += '</ol>';
        } 

        html +='</div>'
        $('#json-renderer').html(html);
    
  }  // function
  
  
  
  
  


               
  
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

                                                                _test_string = input_current[i].attributes.name;

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
                                          
                                                                                    
                                            __total_item_count = _this_page_raw_return.meta.stats.totalCount;
                                          
                                          
                                          
                                          
                                              // each ajax get 1 page 20 item

                                              // step 1 use this, get 1 - 10000 range
                                              for (i = 0; i < (__total_item_count / 20 ); i++) { 
                                              
                                               // step 2 ( hub.site.live2 )run this get 10000 - 100805 range   805 / 20 = 40 +1 = 41
                                             //for (i = 0; i < ( 41 ); i++) { 
                                              
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
                                                                                                        
                                                        if ((_this_page_raw_return) && (_this_page_raw_return.data)){
                                                            
                                                                      var __this_page_array = _this_page_raw_return.data
                                                        
                                                        
                                                                      // we want to add new array from the beginning of old array, to show changing to the user. 
                                                                      //https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
                                                                        // input_current = input_current.concat(_this_page_raw_return.data);
                                                                        
                                                                        //hub.data.search.js:668 Uncaught (in promise) TypeError: input_current.unshift is not a function
                                                                        //unshift only works for 1 element, not work for another array.
                                                                        // input_current = input_current.unshift(_this_page_raw_return.data);
                                                                        
                                                                        
                                                                        input_current = __this_page_array.concat(input_current);
                                                                        
                                                                        
                                                                        

                                                                          _next_page_url = _this_page_raw_return.meta.next;
                                                                          
                                                                          
                                                                          
                                                                          
                                                                          
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
