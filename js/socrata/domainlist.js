  
  
 
// with mark.js,   But no lunr.js ( search = name + domain, need add both field to lunr )    use for-loop, because only 300 item, no need) 



  
  // domainlist_live.html get list by  live rest api (http://api.us.socrata.com/api/catalog/v1/domains)
  //  domainlist.html  get list from mysql 
  
  
  
  // this is "domain" version
  
  /*
                                                       *   {
                                                            "results" :
                                                              [
                                                                { "domain" : "2014bonds.cityofws.org", "count" : 5 },
                                                                { "domain" : "amopen.amo.on.ca", "count" : 94 },
                                                                { "domain" : "apd-data.albanyny.gov", "count" : 36 }
                                                              
                                                               ],
                                                            "resultSetSize" : 274,
                                                            "timings" : { "serviceMillis" : 22, "searchMillis" : [ 10, 15 ] }
                                                          }
                                                    */
  
  
  
  // static json 
  // https://transparentgov.net/json2tree/js/utility/domain_count.json
  // http://j2t.transparentgov.net/domainlist.html?url=https://transparentgov.net/json2tree/js/utility/domain_count.json
  // 
  // 
  //
  //live dynamic json
  //http://j2t.transparentgov.net/domainlist.html?url=https://api.us.socrata.com/api/catalog/v1/domains
  //
  //
  //j2t.transparentgov.net
  //http://localhost:10/json2tree
  //
  //
  //
//get all domains
   // http://api.us.socrata.com/api/catalog/v1/domains
   
   
   
   
   
  // dataset
  // https://agv1.transparentgov.net/socrata/dataset/default?layer=Sex_Offenders&url=https://data.cityofchicago.org/resource&layer_id=cjcg-yw47

   
  // map 
 //  http://agv1.transparentgov.net/socrata/googlemaps/default?url_id=12&layer_id=r9g3-4ubb&layer=Senior_Centers&value={%22location_field%22:%22location%22}&center_lat=41.84707799851276&center_long=-87.67753598140399&center_zoom=11
 
    





 var input_current       // whole array of json, without filter, 
 var _filtered_results   // filtered results
 
 
 
 var _filter_by // search filter by keyword
 var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500                 
 var short_list_count = 100   
 var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'
             
 var current_filter_result_count;
var __total_item_count;





  // only for domainlist (static), difference is static version does not sort by count, while live version does sort by count:xxx
  function rendering_json_to_html(_results) {
  
       
      // already remove "results", only array [{}, {}....]
      
                  //--- sort domain by count --- 
                  //only for live list from socrata
                  //......Must have {count:587,......}, without count:xxx, or count is different name, must update compare function. 
                 //_results.sort(compare);
                  




        var html = '';
      
     
     
      
       /*
 
         *    <ul>
         *        <li>
         *             <a href=''> xxx </a>
         *        </li>  
         *           
         *        <li>
         *             <a href=''> xxx </a>
         *        </li>  
         *        
         *        <li>
         *             <a href=''> xxx </a>
         *        </li>  
         *    </ul>
         *   
         *   
         *   
         *  Do not use materialized css, collection, because it is has border, tool tip etc... overhead, slow down everything.
         *   <ul class="collection">
                    <li class="collection-item">Alvin</li>
                    <li class="collection-item">Alvin</li>
                    <li class="collection-item">Alvin</li>
                    <li class="collection-item">Alvin</li>
                </ul>
      
         */
        
        
        
        
        
         
        // ---------- build --------------
        
        
        
        
                        html += '<div>';
                    
                    
            
                          if (_results.length > 0){


                                

                            html += '<ol class="custom-counter">';


                              for (var i = 0; i < _results.length; ++i) {


                                  // domain with 0 count will not display, NO, still need to display, because, 
                                  // sometime, socrata api error, all count is 0, will result nothing on list
                                  // if (_results[i].count > 0 ){


                                          html += '<li>' // css .ordered_list_number{ size font}

                                                            




                                        /*  
                                            //  ###### audit icon ######
                                            if (_results[i].audit == 1) {



                                              html += '<a target="_blank" href="https://' + _results[i].domain_url + '" class="hoverable red-text">';

                                              html += '<span class="mdi mdi-close-octagon red-text"></span>&nbsp;' 

                                              html += '</a>';


                                                      
                                          
                                            } else {

                                              html += '<a target="_blank" href="https://' + _results[i].domain_url + '" class="hoverable lime-text">';

                                              html += '<span class="mdi mdi-check lime-text"></span>&nbsp;' 

                                              html += '</a>';

                                            }
                                          //  ###### audit icon ######

                                        */






                                          
                                          
                                          
                                          var __organization = _results[i].organization;
                                          
                                          
                                          
                                          
                                            
                                            if ((__organization == undefined) || (__organization == null)){
                                                __organization ='';
                                            }
                                        //  console.log('__organization  ========= ',__organization);
                                          
                                          
                                          
                                        html +='&nbsp;&nbsp;'; 


                                              if ( _results[i].audit == '1') {
                                                            // audit = 1 means unavailable 
                                                        //  ----- index icon unavailable  --------


                                                        /*

                                                        // working "a" tag   
                                                                html += '<a target="_blank" href="' + window.location.protocol + "//" + window.location.host + linkToPathname  
                                                                html += '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                                                html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC '
                                                                html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom 
                                                                html +=  '">';
                                                                          html += 'unavailable';
                                                                html +='</a>';
                                                        */



                                                                html += '<button class="click_change_style" onclick="window.open(\''  + window.location.protocol + "//" + window.location.host + linkToPathname  
                                                                html += '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                                                html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC'
                                                                html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom 
                                                                html +=  '\',\'_blank\')">'
                                                                          html += 'unavailable';
                                                                html +='</button>';


                                                        //  ----- end   -----  index icon unavailable --------
                                              } else {
                                        
                                                                        //  ----- index icon --------

                                                                        /*
                                                                                          //http://j2t.transparentgov.net/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains=data.cityofnewyork.us%26limit=10000


                                                                                          //https://transparentgov.net/json2tree/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains=data.cityofnewyork.us%26limit=10000

                                                                                          // no need to specify order=page_views_total+DESC or order=page_views_total20%DESC
                                                                                          // default is order by total views count

                                                                                          //html += '<a target="_blank" href="' + window.location.protocol + "//" + window.location.host + linkToPathname  + '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='+ _results[i].domain +  '%26limit=10000" class="json-string">';
                                                                                               
                                                                                // working "a" tag               
                                                                                            html += '<a target="_blank" href="' + window.location.protocol + "//" + window.location.host + linkToPathname  
                                                                                            html += '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                                                                            html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC '
                                                                                           
                                                                                            html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom 
                                                                                            
                                                                                            html +=  '">';
                                                                                                      html += 'open';
                                                                                            html +='</a>';

                                                                        */

                                                                                            // domain1.html
                                                                                            html += '<button class="click_change_style" onclick="window.open(\''  + window.location.protocol + "//" + window.location.host + linkToPathname  
                                                                                            html += '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                                                                            html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC'
                                                                                            html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom
                                                                                            html +=  '\',\'_blank\')">';
                                                                                                      html += 'open';
                                                                                            html += '</button>'
                                                                                            html +='&nbsp;&nbsp;';

                                                                                            // domain2.html
                                                                                            html += '<button class="click_change_style" onclick="window.open(\''  + window.location.protocol + "//" + window.location.host + linkToPathname  
                                                                                            html += '/domain2.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                                                                            html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC'
                                                                                            html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom
                                                                                            html +=  '\',\'_blank\')">';
                                                                                                      html += '<small><b>' + 'advanced' + '</b></small>';
                                                                                            html += '</button>'
                                                                      
                                                                          //  ----- end   -----  index icon --------


                                              } // if

                                              html +='&nbsp;&nbsp;';

                                              // text  organization
                                                          html += '<span class="context"><b>' + __organization +  '</b>&nbsp;&nbsp;</span>' 
                                                          html +=   '<a target="_blank" href="https://'  + _results[i].domain_url +  '">';
                                                          html +=     _results[i].domain_url
                                                          html +=   '</a>&nbsp;'; 



                                              /**/
                                              //  ###### socrata totalItemCount ######
                                                        var _resource_count = _results[i].resource_count
                                                        if ((_resource_count) && (_resource_count !== '0')){
                                                                html += '<span class="context"><sub>total['  + _resource_count + ']</sub>&nbsp;&nbsp;'+ '</span>'
                                                        }
                                              //  ###### socrata totalItemCount ######
                                              /**/
                                                          
                                          html += '<br><br>'; 
                                          html += '</li>';
                                          
                                    }// for

                                    html += '</ol>';

                              } 

                        html +='</div>'

                        $('#json-renderer').html(html);
      
                }  // function  
  
  
  
  
  
  
                // ***************** search event related   ********************

                            // simple for loop ( no lunr.js)
                             // only for  static version, live version are different at  var _test_string
                              function search_layer_now() {

                                            
                                _filter_by = $('#filter_by').val().toLowerCase().trim();

                                    
                                    
                                
                                  
                                  var _filter_by_array = _filter_by.split(" ");
                                  
                                  
                                  
                                  
                                  
                                  update_url_parameter('filter_by', _filter_by);
                                  
                                  
                                  if (_filter_by.length > 0) {  
                                  
                                  
                                  
                                                      
                                              $('#clear_search_result_button').show();


                                                        
                                          // ............. filter results  ....................
                                                  
                                                  _filtered_results = [];
                                                  
                                                  var _test_string
                                                  var _valid
                                            
                                            
                                           
                                  
                                  
                                  
                                            if (input_current.length > 0) {

                                                    for (var i = 0; i < input_current.length; ++i) {

                                                          /*
                                                          *   {
                                                                "results" :
                                                                  [
                                                                    { "domain" : "2014bonds.cityofws.org", "count" : 5 },
                                                                    { "domain" : "amopen.amo.on.ca", "count" : 94 },
                                                                    { "domain" : "apd-data.albanyny.gov", "count" : 36 }
                                                                  
                                                                  ],
                                                                "resultSetSize" : 274,
                                                                "timings" : { "serviceMillis" : 22, "searchMillis" : [ 10, 15 ] }
                                                              }
                                                        */
                                                      
                                                      
                                                        // for domainlist_live only
                                                        // _test_string = input_current[i].domain + ' ' + organization[input_current[i].domain];
                                                          
                                                          
                                                          // for domainlist static only
                                                          _test_string = input_current[i].domain_url + ' ' + input_current[i].organization;
                                                          
                                                          
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

                                          }  else {
                                        
                                        
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
                      



                              function show_current(_current_showing, _render_all_signal) {
                                // only show short list = 100, if more than limit, also mark  'need_render_all'  
                    
                                           
                                                                                                                               
                                             current_filter_result_count = _current_showing.length

                                             //$('#message_div').text( current_filter_result_count + ' / ' + __total_item_count );
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
                    
                      


                      
                             function init_search_button_event_handler(){

                              // click search
                            // $('#start_search_button').click(search_layer_now) 


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







               // ***************  End ********** search event related   ********************
  
  
  
  
  /**/
  
  
                    //-------------- sort domain by count ----------------------
                    // Sort array of objects by string property value
                    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
                    
                    function compare(a,b) {
                    if (a.count < b.count)
                      return 1;
                    if (a.count > b.count)
                      return -1;
                    return 0;
                  }

                    //-------------- sort domain by count ----------------------
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  (async function($){
  
     init_global_var();
     init_search_button_event_handler();
     init_scrollable()

                 var ___url_getJson = get_domain_list_url()

                  show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_getJson)
                
                  input_current = await ajax_getjson_common(___url_getJson);
                  
                  remove_loading_img_spinner('ajax_getJson_processing');
                  $(".progress").hide(); 
                  
                  // static json and socrata api have "results" 
                   if (input_current.hasOwnProperty('results')) {
                        input_current = input_current.results
                    }else {
                              // but our mysql rest api do not have "results"
                    }
                    console.log('input_current ---> ', input_current)
                    
                  __total_item_count = input_current.length;
                    
                    // first time load all  
                    $('#clear_search_result_button').hide();
                    show_current(input_current, 'input_current')

           // ---------- end ----------------- ajax ___url_string response = input  -------------

            filter_result_by_filter_by()
  
})(jQuery);
