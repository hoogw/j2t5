  

 //http://localhost:10/json2tree/searchAsset.html?limit=200
 // by default, max search result return by limit=100, no need specify. 
 
 
 
//Find by query term
  // https://api.us.socrata.com/api/catalog/v1?q=chicago%20crime&order=page_views_total+DESC
  
  
  
  

  //  search original page: https://www.opendatanetwork.com/search?q=miami
  var original_search_portal_base_url = "https://www.opendatanetwork.com/search?q=";
  
  
  
   
  // dataset
  // https://agv1.transparentgov.net/socrata/dataset/default?layer=Sex_Offenders&url=https://data.cityofchicago.org/resource&layer_id=cjcg-yw47

   
  // map 
 //  https://agv1.transparentgov.net/socrata/googlemaps/default?url_id=12&layer_id=r9g3-4ubb&layer=Senior_Centers&value={%22location_field%22:%22location%22}&center_lat=41.84707799851276&center_long=-87.67753598140399&center_zoom=11
 
    
    
         var url_template_base_dataset = 'https://agv1.transparentgov.net/socrata/dataset/default?';
         var url_template_base_map     = 'https://agv1.transparentgov.net/socrata/googlemaps/default?';
 
         
          
 // "input" was used in arcgis_common, do not use it here
 var input_current = [];  // for display only, not for accumulate result array
 var _filtered_results   // filtered results


 var _filter_by // search filter by keyword
 var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500                 
 var short_list_count = 100                
 var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'

 var current_filter_result_count;
 var __total_item_count;




          var _timeout = 5000;



    
    
    
    





  
  
  
                  //   *******  search event related   *******   


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


                                                         // _test_string = input_current[i].resource.name;
                                                           _test_string = input_current[i].resource.name + ' ' + organization[input_current[i].metadata.domain];
                                                      


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

                                $('#clear_search_result_button').hide();   

                                $('#filter_by').val('');
                              
                                _search_data_content='';
                                update_url_parameter('filter_by','');
      
                                show_current(input_current, 'input_current')
                                               
                            }



                            // special for search as  rendering_json_to_html_for_search
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

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  





               // - -  -  -  streaming   - -  -  -  
                                        

                         function init_streaming_event_handler() {

                                       
                                        $("#original_search_portal").attr("href", original_search_portal_base_url)

                                        remove_loading_img_spinner('ajax_getJson_processing');

                                        //$("#pause_streaming_button").hide(); 
                                        //$("#resume_streaming_button").hide(); 
                                        //$("#stop_streaming_button").hide(); 
                                        $("#clear_streaming_result").hide();




                                        // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                                        $('#search_data').on('search',prepare_streaming_url);

                                        $('#start_streaming_button').on('click', prepare_streaming_url);       
                                        

                                        $('#clear_streaming_result').on('click', clear_streaming_result);   
                                        
                                        
                                        //$('#pause_streaming_button').on('click',pause_streaming);
                                        //$('#resume_streaming_button').on('click',resume_streaming);
                                        //$('#stop_streaming_button').on('click',stop_streaming);
                                        
                                        
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

                                           
                            function prepare_streaming_url(){ 

                              _search_data_content = $('#search_data').val().toLowerCase().trim();   // .trim()  Removes only leading & trailing whitespaces;

                              if (_search_data_content.length !== 0){
                             
                                              console.log('search  --->  ', _search_data_content)
                                              update_url_parameter('search_data', _search_data_content);
                                              document.getElementById("title").innerHTML = _search_data_content;
 
                                              // https://api.us.socrata.com/api/catalog/v1?q=chicago%20crime
                                              //  by default limit=100 
                                              // but we set our default limit=3000, cover all large city chicago have 1.5k, los angeles have 1.1k 
                                              if ((___limit == undefined) || (___limit == null)) {
                                                ___limit = 3000;
                                              }
 
                                              //  default is '3<60%', meaning that if there are 3 or fewer search terms specified, all of them must match; otherwise 60% of the search terms must be found in the fields specified above.
                                              //  &min_should_match=3%3C60%25
                                              //  https://socratadiscovery.docs.apiary.io/#reference/0/find-by-license/search-by-query-term
 
                                                ___url_getJson = "https://api.us.socrata.com/api/catalog/v1?limit=" + ___limit + "&order=page_views_total+DESC&q=" + _search_data_content;
    
                                                // var ___url_getJson = "https://api.us.socrata.com/api/catalog/v1?"  + "order=page_views_total+DESC&q=" + _search_data_content;
    
                                                console.log('___url_getJson   ___limit: ', ___limit, ___url_getJson)
    
                                                start_streaming()
                                } else {

                                  clear_streaming_result()

                                }

                            }


                          



                            
                          async function start_streaming(){  

                                empty_last_time_result()
                                $("#json-renderer").show();
                                $("#clear_streaming_result").show();
                                $('#counter_label').text('searching...');
                                console.log('  _search_data_content ', _search_data_content.length)

                                if (_search_data_content.length > 0) {

                                              show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_getJson)
                                
                                              input_current = await $.ajax({
                                                                
                                                timeout:_timeout,
                                                url: ___url_getJson,
                                                type : 'GET',
                                                
                                                
                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                                // ajax failed
                                                                                          
                                                                                var _error_status = textStatus + ' : ' + errorThrown         
                                                                                console.log('ajax error :  ', jqXHR)
                                                                                
                                                                                $('#counter_label').text(_error_status, ___url_getJson); 
                                                                                
                                                                               
                                                                                
                                                                            },

                                                // socrata jsonp has special api https://dev.socrata.com/docs/cors-and-jsonp.html

                                                // socrata Cross-Origin Resource Sharing (CORS) option 1 for old browser 
                                              //  jsonp: "$jsonp",
                                              //  dataType: 'jsonp' // avoid error no 'access-control-allow-origin' header is present on the requested

                                              // socrata Cross-Origin Resource Sharing (CORS) option 2, for new browser support CORS

                                              dataType: "json"

                                            //     
                                            //     https://api.us.socrata.com/api/catalog/v1?   do not accept app_token.

                                            //   data: {

                                          //      "$$app_token": _socrata_app_token
                                          //    }

                                          //    

                                              }); // await

                                              remove_loading_img_spinner('ajax_getJson_processing');  
                                              

                                                // socrata only    json.results  {"results":[]}
                                                input_current = input_current.results

                                                __total_item_count = input_current.length;

                                                show_current(input_current, 'input_current')
                                                console.log('  final showing ----###--- ',  input_current)
                                               

                                          
                                                          // url  ...&sfilter_by=xxx
                                                          filter_result_by_filter_by()

                                      
                                } else { 
                                          search_message('Search key word is empty');
                                          remove_loading_img_spinner('ajax_getJson_processing');
                                          $("#json-renderer").hide();
                                        } 
                            }
                            
                            
                            
                            
                            function empty_last_time_result(){
                              rendering_json_to_html_for_search({});
                           }   
                            
                            
                            function clear_streaming_result(){
                                
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

                                    console.log('set default page title  ===  search Socrata')
                                    document.getElementById("title").innerHTML = 'search Socrata';
                                
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
                                                  //  $('#search').keyup();
                                                  //  $('item').blur();
                                      //         });




                                        // both works (2)
                                      // $('#search_data').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                                }

                          }






                        //      - -  -  -   end    - -  -  -  streaming   - -  -  -  






                     















                            
                            













                            
  
  
  
                
                
  
                        
  
  
  
  
  
  
  
  // document ready short hand
  
  
  (async function($){
  
   

        
   
         //---------------------------------------------------------------------------------------------------------------
         // organization = {}  get it from mysql by rest api call. (old way is include js/organization.js)
         // https://transparentgov.net:3200/restapi/rest_url?select=*&where=type=%27folder%27&orderby=name&asc_desc=asc
         // https://transparentgov.net:3200/restapi/domain_list?select=*
         
             // not use
            //organization = await organization_rest_api('https://transparentgov.net:3200/restapi/domain_list?select=*');

            organization = await organization_rest_api();
            console.log('organization ..... ', organization)
         //----------------------------------------------------------------------------------------------------------------   
            
            
         init_global_var();

   
         init_search_button_event_handler();

         init_scrollable()


         // socrata does not really streaming, just simple click, then get search result in one transaction, 
         // only arcgis use streaming to get all result page by page 
         init_streaming_event_handler();









               // url  ...&search_data=xxx
               search_by_url_param()
               

               // Can't be here, must wait until streaming compete, to do filter. 
               // url  ...&sfilter_by=xxx
               //filter_result_by_filter_by()
  
             
               init_naming_panel()
  
})(jQuery);
