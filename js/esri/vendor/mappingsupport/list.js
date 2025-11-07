/*

 for local test only, need add ?localdomain=1

   http://localhost:10/json2tree/esri/arcgisServerList.html?localdomain=1&audit=1


                      &audit=1 // 1 means only show  'previously check the site is not available audit='1'
                               //by default, without this paramerter, will show all,        
                                       
                      &localdomain=1  //by default, without this paramerter, will use production domain,  
                                      // with this parameter , 1 means, use localhost:3000/restapi....

*/








/*
            
               
           sample:       
                 {
                            Line_number: 3308,
                            Type: 2,
                            State: "Vermont",
                            County: "",
                            Town: "Worcester",
                            FIPS: "",
                            Server_owner: "",
                            ArcGIS_url: "https://services3.arcgis.com/nJbIFHiSnaX0z0hS/ArcGIS/rest/services/Worcester_Service/FeatureServer",
                            https: "Y",
                            Show_contents: "Y",
                            SSL: "OK",
                            Open: "Y",
                            Comment: ""
                  },




 */
 
 
 
 
 
 
 
 

                  var input_current       // whole array of json, without filter, 
                  var _filtered_results   // filtered results
                  
                  
                  var _filter_by // search filter by keyword  
                  var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500                 
                   var short_list_count = 100 
                   var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'
                                  
                   var current_filter_result_count;
                  var __total_item_count;
                   
                  
                  
                   
                   
                   
                    // lunr.js
                   var idx
                   var lunr_index
                   var lunr_idx_ready_status= false;
                   
                   
                  
                  
                   
                       
                  
                  
                  
                    
                    
                     function rendering_json_to_html(array_of_json) {
                          var _results = array_of_json;
                          var html = '';
                          /*
                   
                           *    <ol>
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
                           *    </ol>
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
                          
                           
                         
                          
                          
                          
                                      html += '<div>';
                                      
                                      
                        
                                      if (_results.length > 0) {
                  
                                           html += '<ol class="custom-counter">';
                  
                                           for (var i = 0; i < _results.length; ++i) {
                  
                                                       html += '<li>' // css .ordered_list_number{ size font}
                  
                                                                    // ---- fix bug, _results[i].ArcGIS_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                                                          var _link_protocol = window.location.protocol;
                                                                          var _link_url_parameter = _results[i].ArcGIS_url;
                                                                          if (_link_url_parameter.indexOf('http://') > -1)
                                                                          {
                  
                                                                              // if resource url is http, force link protocol as http: 
                                                                              _link_protocol = 'http:'
                                                                          }// if
                                                                    // ------ end fix bug,
                                    
                                    
                                                  //  Server_owner + Town + County + State +  ArcGIS_url
                                                  //var naming_scheme = _results[i].Server_owner + '&nbsp;'  +  _results[i].Town + '&nbsp;'  +  _results[i].County + ' County &nbsp;'  + _results[i].State  + ' State &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>'  + _results[i].ArcGIS_url + '</b>'
                  
                                                              var naming_scheme ="" 
                                                              if (_results[i].Server_owner) { naming_scheme += _results[i].Server_owner + ',&nbsp;&nbsp;' }
                                                              if (_results[i].Town)         { naming_scheme += 'City of ' + _results[i].Town + ',&nbsp;&nbsp;' }
                                                              if (_results[i].County)       { naming_scheme += _results[i].County + ' County,&nbsp;&nbsp;' }
                                                              if (_results[i].State)       { naming_scheme += _results[i].State + ' State' }
                                                              // if (_results[i].ArcGIS_url)       { naming_scheme += _results[i].ArcGIS_url }
                                                              /* 
                                                                                 encodeURI vs encodeURIComponent,  
                                                                                 https://thisthat.dev/encode-uri-vs-encode-uri-component/#:~:text=encodeURI%20is%20used%20to%20encode%20a%20full%20URL.&text=Whereas%20encodeURIComponent%20is%20used%20for,such%20as%20a%20query%20string.&text=There%20are%2011%20characters%20which,encodeURI%20%2C%20but%20encoded%20by%20encodeURIComponent%20.
                                                                                 must use escape, because, coeur'd Alene Tribe, single quot will cause error, 
                                                                                 Javascript encodeURIComponent doesn't encode single quotes, https://stackoverflow.com/questions/10896807/javascript-encodeuricomponent-doesnt-encode-single-quotes,
                                                                            */
                                                              var encoded_naming_scheme = encodeURIComponent(naming_scheme).replace(/[!'()*]/g, escape);
                                                  
                                                            html += '&nbsp;';
                  
                                                           
                  
                                                                              
                                                             // context class for mark.js highlight
                                                             html += '<span class="context" style="font-size:16.3px;">'  + naming_scheme +  '</span>' 
                                                             html += '&nbsp;';
                                                          
                  
                  
                                                            if (_results[i].ArcGIS_url.includes('/rest/services')){
                                
                                                              //_open_link = _link_protocol + "//" + window.location.host + linkToPathname  + '/server/folder2.html?url=' +  _results[i].ArcGIS_url + '&org=' + encoded_naming_scheme
                                                              _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  _results[i].ArcGIS_url + '&org=' + encoded_naming_scheme
                                                              html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
                                                              html +=       '<span style="font-size:16.6px">Show All Layers</span>';
                                                              //html +=       '&nbsp;'
                                                              //html +=       '<sup style="font-size:9.9px">trnspGOV</sup>';
                                                              html += '</button>';
                                                              html += '&nbsp;&nbsp;';
                                              
                                                            }
                  

                  
                                                            html += '<br>';
                                                            html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';  
                                                            html += '<a style="display: inline-block; width:600px; overflow:hidden;" target="_blank" href="' + _results[i].ArcGIS_url + '">';
                                                            html +=   _results[i].ArcGIS_url 
                                                            html += '</a>&nbsp;'; 
                                              
                  
                  
                                                            html += '<br>';
                                                            html += '<br>'; 
                                                            html += '<br>'; 
                                                        html += '</li>';
                                                                       
                                                                      
                                            }// for
                     
                                             html += '</ol>';
                  
                  
                                          } else {
                                                        // html += '[]';
                                          } // if
                  
                                            html +='</div>'
                                                      $('#json-renderer').html(html);
                                  
                                            }  
                              
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                                    //   *******  search event related   *******   
                  
                  
                        
                                            function search_layer_now() {
                  
                                                    
                  
                                                  // first time search, need to build lunr index idx
                                                  if (! lunr_idx_ready_status){
                                                            // ****** ****** ******   init lunr index  must immediately after input_current **************
                                                                        // parameter:  [json array], index field, search field
                                                                        // init_lunr_index('lunr_id', 'name' )
                                                                        init_lunr_index()
                                                            // ******  End  ********** init lunr index  must immediately after input_current **************
                  
                                                            lunr_idx_ready_status = true
                                                    }     
                                                                                                                
                                                    // reset scroll position to 0, means top 
                                                    $("#json-renderer").scrollTop(0);
                  
                                                    //turn on auto complete by uncomment here,
                                                    // always clean last time auto-compelete data
                                                   // autocomplete_search_instance.updateData({});
                                                                                
                  
                  
                  
                  
                                                   _filter_by = $('#filter_by').val().toLowerCase().trim();
                  
                                                    
                                                    var _filter_by_array = _filter_by.split(" ");
                                                    
                                                    console.log('_filter_by  --->  ', _filter_by)
                                                    
                                                    update_url_parameter('filter_by', _filter_by);
                                                    
                                                    
                                                    
                                                      if (_filter_by.length > 0) {  
                                                    
                                                    
                                                                  $('#clear_search_result_button').show();
                  
                  
                                                    
                                                          // ............. filter results  ....................
                                                    
                                                              
                                                                      _filtered_results = [];
                                                                    
                  
                                                                      var _filter_by_tailing= '';  // foo*   wildcard 
                                                                      var _suggest_keyword = '';   // suggest keyword always is a single word, if multiple words present, always use last word
                                                                      var _suggest_keyword_tailing = '';
                  
                                                                      var _idx_results = [];
                                                                      var _idx_results_exact_match = [];     // exact match ('foo') with stemming
                                                                      var _idx_results_tailing = [];  //  wildcard ('foo*') without stemming
                                                    
                                                                      var _suggest_results = [];
                                                                      var _suggest_results_exact_match = [];
                                                                      var _suggest_results_tailing = [];
                  
                  
                  
                  
                  
                                                                              // ************ lunr.js *******************
                                                                              
                                                                              
                                                                              
                                                                                  //https://github.com/olivernn/lunr.js/issues/344
                                                                                  // search 'city' and 'salt' and 'lake', must have all 3 words, should use "+city +salt +lake"
                                                                              
                                                                                if (_filter_by_array.length > 1) {
                  
                                                                                        // multiple keywords
                                                                                    
                                                                                          _filter_by ='';
                                                                                          _filter_by_tailing = '';
                  
                                                                                          for (var p = 0; p < _filter_by_array.length; ++p) {
                  
                  
                  
                                                                                            _filter_by += ' +' + _filter_by_array[p]   // search('+los +an')
                                                                                            _filter_by_tailing =   _filter_by + '*';   // search('+los +an*')   only last word have wildcard
                  
                  
                                                                                            //if multiple words present, always use last word
                                                                                            _suggest_keyword = _filter_by_array[p];
                                                                                            _suggest_keyword_tailing = _suggest_keyword
                                                                                        
                                                                                          }//for
                  
                  
                  
                                                                                            console.log('  ### multiple keywords  ###  exact match ',_filter_by)
                                                                                            console.log('  ### multiple keywords  ###  wildcard tailing ',_filter_by_tailing)
                                                                                    
                                                                                } else {
                  
                  
                  
                                                                                        
                  
                                                                                            // single keywords          
                                                                                            // .search('foo*'), with wildcard will not stemming, so must add both exact match .search('foo') and  .search('foo*')  
                                                                                            
                                                                                            _filter_by_tailing =   _filter_by + '*';
                                                                                            _suggest_keyword = _filter_by
                                                                                            _suggest_keyword_tailing = _suggest_keyword + '*';
                                                                                        
                  
                                                                                          console.log(' single keywords exact match ', _filter_by)
                                                                                          console.log(' single keywords wildcard tailing ',_filter_by_tailing)
                            
                  
                                                                                }
                                                                              
                  
                                                                              
                                                                                _idx_results_exact_match =idx.search(_filter_by)         // search('+los +an')
                                                                                _idx_results_tailing = idx.search(_filter_by_tailing)    // search('+los +an*')   only last word have wildcard
                  
                                                                                // this will duplicate results by 2 times, some time exact match have results,but tailing have zero. sometimes, tailing have results, exact match have zero
                                                                              // _idx_results =_idx_results_exact_match.concat(_idx_results_tailing)
                  
                                                                              if (_idx_results_exact_match.length > _idx_results_tailing.length){
                  
                                                                                          _idx_results =  _idx_results_exact_match
                  
                  
                                                                              } else {
                  
                                                                                          _idx_results =  _idx_results_tailing
                  
                                                                              }
                                                                              
                                                                              console.log('_idx_results_exact_match  ***  ', _idx_results_exact_match)
                                                                              console.log('_idx_results_tailing  ***  ', _idx_results_tailing)
                                                                                console.log('_idx_results  ***  ', _idx_results)
                  
                  
                                                                                  
                  
                  
                                                                          // ************** lunr suggest *******************      
                                                                                  
                                                                                          // idx.tokenSet, get all token(stem keywords) in this index.  intersect with suggest keyword
                                                                                                _suggest_results_exact_match = idx.tokenSet.intersect(lunr.TokenSet.fromString(_suggest_keyword)).toArray();
                                                                                                _suggest_results_tailing  = idx.tokenSet.intersect(lunr.TokenSet.fromString(_suggest_keyword_tailing)).toArray();
                  
                                                                                              
                                                                                          if (_suggest_results_exact_match.length > _suggest_results_tailing.length){
                  
                                                                                                      
                                                                                                      _suggest_results = _suggest_results_exact_match 
                  
                                                                                          } else {
                  
                                                                                                    _suggest_results =  _suggest_results_tailing 
                  
                                                                                          }
                  
                                                                                                  console.log(' ^^^^^^ suggest results  exact match  ^^^^^^ ', _suggest_results_exact_match)
                                                                                                  console.log(' ^^^^^^  suggest results  tailing ^^^^^^ ',         _suggest_results_tailing)
                                                                                                  console.log(' ^^^^^^  suggest results  ^^^^^^ ',         _suggest_results)
                  
                  
                                                                                      // suggest_results = ["zone", "zonnic"]
                                                                                      // must convert to {"zone": null, "zonnic": null}  before feed to autocomplete
                                                    
                                                                                      var feed_to_autocomplete = {}
                                                                                      for (var s = 0; s < _suggest_results.length; s++) {
                                                                                        feed_to_autocomplete[_suggest_results[s]] =  null;
                                                                                      }
                                                                                      console.log('feed_to_autocomplete', feed_to_autocomplete)
                  
                  
                  
                                                                                    autocomplete_switch_status  = $("#autocomplete_switch").is(":checked");
                  
                                                                                    if (autocomplete_switch_status){
                                                                                        //turn on auto complete by uncomment here,
                                                                                       // autocomplete_search_instance.updateData(feed_to_autocomplete);
                                                                                    } else {
                                                                                      //turn on auto complete by uncomment here,
                                                                                      // disable auto complete by update a empty {}
                                                                                      //  autocomplete_search_instance.updateData({});
                                                                                    }
                                            
                                                                                        
                  
                                                                            // **************  end *************  lunr suggest *******************   
                  
                  
                  
                  
                  
                                                                                      
                  
                                                                                  
                  
                  
                  
                                                                                  for (var l = 0; l < _idx_results.length; ++l) {
                  
                                                                                      // console.log('_idx :  ', _idx_results[l].ref)
                                                                                      
                                                                                      
                                                                                    //Find an object in an array by one of its properties 
                                                                                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
                                                                                    // const result = inventory.find( ({ lunr_id }) => lunr_id === 'xxxx' );
                                                                                    _filtered_results.push(input_current.find(({ lunr_id }) => lunr_id === _idx_results[l].ref) )
                  
                                                                                  }
                  
                  
                                                                              // ************ end  ************* lunr.js *******************
                                                    
                                                    
                                                    
                  
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
                                              
                                                _filter_by ='';
                                                update_url_parameter('filter_by','');
                  
                  
                                               
                                      
                                              show_current(input_current, 'input_current')
                  
                     
                                                   
                                            }
                              
                  
                  
                     
                  
                                            function init_scrollable(){
                  
                                                                              
                                              var back_to_top_button = $('#back_to_top_button');
                                                              
                                              $("#json-renderer").scroll(function() {
                    
                                                console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                                                console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )
                                              
                    
                                                if($("#json-renderer").scrollTop() > scroll_bottom_px ) {
                    
                    
                                                       
                                                       console.log('--------------- close to bottom  ---------------  scrollTop ####### ', $("#json-renderer").scrollTop() )
                                                       console.log('--------------- close to bottom  ---------------  height ^^^^^^^^^^ ', $("#json-renderer").height() )
                    
                                                      
                                                      
                    
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
                          
                  
                  
                                   //   *******   end  ******   search event related   *******      
                    
                    
                    
                    
                    
                            /**/
                            // ======================== lunr.js ========= mappingsupport.com only ===============
                            /**/
                  
                                      // mappingsupport.com only  -- add new field "name" =   Server_owner + Town + County + State +  ArcGIS_url  
                                      function inject_lunr_id(){
                                                              
                  
                                        /*
                                              [
                                                
                                                {
                  
                                                  // will inject this field
                                                    lunr_id: xxx 
                  
                                 
                  
                                                    @type: "dcat:Dataset"
                                                    accessLevel: "public"
                                                    contactPoint: {@type: "vcard:Contact", fn: "lacounty_isd"}
                                                    description: "<p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>Location Management System (LMS) is County of Los Angeles GIS Program to maintain a single, comprehensive geographic database of locations countywide.  The scope of this information is broad, including locations of services, points of interest, physical features, to name a few.  The goal is that maintenance of the information will be done by the jurisdiction (city, department, agency) that provides the service.</p><p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>A standard set of information about each location will be maintained and accessed by agencies and the public through all of the applications and maps that the County develops.</p>"
                                                    distribution: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
                                                    identifier: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118"
                                                    issued: "2016-03-02T23:30:02.000Z"
                                                    keyword: (3) ["Location Management System", "LMS", "Points of Interest"]
                                                    landingPage: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118"
                                                    license: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118/license.json"
                                                    modified: "2018-05-15T14:25:10.000Z"
                                                    publisher: {source: "County of Los Angeles"}
                                                    spatial: "-143.049,23.3761,-75.063,46.7642"
                                                    theme: ["geospatial"]
                                                    title: "Private Non Retail Shipping Locations"
                                                }, 
                  
                                                {},
                                                {},
                                                ...
                  
                                                {}
                                              ]
                  
                                            */    
                  
                                            
                                            for (p = 0; p < input_current.length; p++) {
                  
                                            
                                              input_current[p].lunr_id = p.toString();  
                                              input_current[p].name = input_current[p].Server_owner + ' ' +  input_current[p].Town + ' ' + input_current[p].County + ' ' + input_current[p].State + ' ' +  input_current[p].ArcGIS_url
                  
                                            }
                  
                  
                  
                                      }
                                    
                  
                  
                                      
                                      function populate_lunr_index(){
                                        
                                                  lunr_index = []
                                      
                                                  for (var j = 0; j < input_current.length; ++j){
                                                                    
                                                      lunr_index.push({lunr_id: input_current[j].lunr_id,    name: input_current[j].name})
                                                                      
                                                  }
                                          
                          
                                        
                                      }
                          
                  
                            
                  
                                      function init_lunr_index(){
                                                              
                                        
                                            // enforce add lunr_id field
                                            inject_lunr_id()
                                                                
                                            
                                            console.log('enforce add lunr_id field ', input_current)
                  
                  
                                            populate_lunr_index()
                          
                                          
                          
                                            console.log('lunr_index ......++++++ ', lunr_index)
                                           
                          
                                          idx = lunr(function () {
                                                
                                              this.ref('lunr_id')
                  
                                              // specify what field will be searching for, you can add more and more field here.
                                              // only one search field
                                               this.field('name')
                  
                                                       
                          
                                              lunr_index.forEach(function (doc) {
                                                                                  this.add(doc)
                                                                                }, this)
                                                                                                                  
                                          })
                                                                                                                
                                  
                          
                                      }
                          
                            // =============== end   ============= lunr.js ========================
                            /**/
                    
                    
                    
                    
                  
                  
                           
                  
                  /**/
                  //  --- papaparse   --- 
                  /**/
                  
                          var inputType = "string";
                          var stepped = 0, rowCount = 0, errorCount = 0, firstError;
                          var start, end;
                          var firstRun = true;
                          var maxUnparseLength = 10000;
                  
                  
                  
                          function jsonTable2object(row_array){
                  
                            // first line is column
                            column_name_array = row_array[0]
                  
                            _jsonObj_array = []
                            var valid_count = 0
                  
                            for (let i = 1; i < row_array.length; i++) {
                              // type = 0 means comment line, remove it
                              if (Number(row_array[i][1])){
                  
                                  valid_count +=1
                  
                                  _jsonObj_array.push({
                                                        Line_number: row_array[i][0],
                                                        Type:        row_array[i][1],
                                                        State:       row_array[i][2],
                                                        County:      row_array[i][3],
                                                        Town:        row_array[i][4],
                                                        FIPS:        row_array[i][5],
                                                        Server_owner:row_array[i][6],
                                                        ArcGIS_url:  row_array[i][7],
                                                        https:       row_array[i][8],
                                                        Show_contents:row_array[i][9],
                                                        SSL:row_array[i][10],
                                                        Open:row_array[i][11],
                                                        Dead:row_array[i][12],
                                                        Comment:row_array[i][13],
                                                      })
                  
                                                      
                              }//if
                              
                            }//for
                  
                            __total_item_count = valid_count
                  
                            return _jsonObj_array
                          }
                  
                  
                          // must wait until csv parse completed at function completeFn
                          function csv2json(_csv_link){
                              
                  
                              //  . . . papaparse  . . . demo . . .  https://www.papaparse.com/demo
                  
                              stepped = 0;
                              rowCount = 0;
                              errorCount = 0;
                              firstError = undefined;
                  

                              try {
                              console.log('csv file url : ', _csv_link)
                              Papa.parse(_csv_link, 
                  
                                  // config see demo.js https://www.papaparse.com/demo
                                  {
                                    //delimiter: ',', // The delimiting character. Usually comma or tab. Default is comma.
                                    //header: false, // Keys data by field name rather than an array.
                                    //dynamicTyping: true, // Turns numeric data into numbers and true/false into booleans.
                                    //skipEmptyLines: true, // By default, empty lines are parsed; check to skip.
                                    // preview: 100, //If > 0, stops parsing after this many rows.
                                    // step: stepFn, // not use, only when very large file
                                    // encoding: 'UTF-8', // Only applies when reading local files. Default is specified by the browser (usually UTF-8).
                                    //worker: false, // Uses a separate thread so the web page doesn't lock up.
                                    // comments: '',  // If specified, skips lines starting with this string.
                                    complete: completeFn,
                                    error: errorFn,
                                    download: true,
                                  }
                                )

                              
                              } catch {

                                console.log('failed csv link is not working', _csv_link )

                              }//try
                  
                              // . . . end  . . . papaparse  . . . 
                  
                          }
                   
                    
                            function stepFn(results, parser)
                            {
                              stepped++;
                              if (results)
                              {
                                if (results.data)
                                  rowCount += results.data.length;
                                if (results.errors)
                                {
                                  errorCount += results.errors.length;
                                  firstError = firstError || results.errors[0];
                                }
                              }
                            }
                  
                            function completeFn(results)
                            {
                              end = now();
                  
                              if (results && results.errors)
                              {
                                if (results.errors)
                                {
                                  errorCount = results.errors.length;
                                  firstError = results.errors[0];
                                }
                                if (results.data && results.data.length > 0)
                                  rowCount = results.data.length;
                              }
                  
                              printStats("Parse complete");

                              if (mappingsupport_csv_url.includes('transparentgov')){
                                $("#backup_info").html("(backup at trnspGOV)")
                              } else {
                                $("#backup_info").html("(real time)")
                              }
                              
                  
                  
                              __total_item_count = rowCount
                              mappingsupport_json = results
                              console.log('json results of csv : ', mappingsupport_json)
                  
                  
                              input_current = jsonTable2object(mappingsupport_json.data)
                                   
                              // first time load all  
                              show_current(input_current, 'input_current')
                              $('#clear_search_result_button').hide(); 
                  
                              filter_result_by_filter_by()
                                  
                            }
                  
                  
                  
                  
                  
                  
                            function errorFn(err, file)
                            {
                              end = now();
                              console.log("csv live link failed ERROR", err, file);


                              $("#backup_info").html("failed to download or parse Joseph Elfelt's List CSV file")
                              console.log("try csv backup link", err, file);
                              mappingsupport_csv_url = csv_backup
                              csv2json(mappingsupport_csv_url)
                            
                            }
                  
                  
                            function now()
                            {
                              return typeof window.performance !== 'undefined'
                                  ? window.performance.now()
                                  : 0;
                            }
                  
                  
                  
                            function printStats(msg)
                            {
                              if (msg)
                                console.log(msg);
                              console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
                              console.log("  Row count:", rowCount);
                              if (stepped)
                                console.log("    Stepped:", stepped);
                              console.log("     Errors:", errorCount);
                              if (errorCount)
                                console.log("First error:", firstError);
                            }
                  
                  
                  /**/
                  //  --- end  ---  papaparse    --- 
                  /**/
                  
                    
                    
                    
                    
                    
                    (function($){
                                 // not get url parameters, because arcgisServerList do not need any url parameters.
                                 // but here only need to get "linktopath" etc..... still need to keep it here
                                 init_global_var()
                                 // reverse title = _org at init-global-var ..... still need to keep it here
                                 document.getElementById("title").innerHTML = "Joseph Elfelt's List";
                                 
                                 //turn on auto complete by uncomment here,
                                 //init_autocomplete();
                  
                                 init_search_button_event_handler();
                  
                                 init_scrollable()
                  
                  
                  
                                 init_user_interface_event()
                                 
                               
                  
                                                
                  
                                  /**/
                                  //  --- papaparse   --- 
                                  /**/
                                     // must wait until csv parse completed at function completeFn
                                      csv2json(mappingsupport_csv_url)
                  
                                  /**/
                                  //  --- end  ---  papaparse    --- 
                                  /**/
                  
                  
                  
                                
                                 
                                  
                  
                  
                  
                   
                                  
                  
                  
                  
                  })(jQuery);
                  