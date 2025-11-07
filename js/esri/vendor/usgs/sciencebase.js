
/*
    
        you can change search paramter at here:
        https://www.sciencebase.gov/catalog/items/queryForm?q=&max=20&filter=browseCategory%3DMap&filter=browseType%3DArcGIS+REST+Map+Service


        // max can get from 1 - 1000

        // total=84,  browseType=ArcGIS REST Map Service ,  browseCategory=Map, is for arcgis rest api
        var ___url_usgs_sciencebase_template ='https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=browseType=ArcGIS REST Map Service&filter=browseCategory=Map&format=jsonp'

        // total=2954 , browseType=ArcGIS REST Map Service, is for arcgis rest api
        var ___url_usgs_sciencebase_template ='https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=browseType=ArcGIS REST Map Service&format=jsonp'

        


        // total=16475973 all,  not for arcgis rest api
        var ___url_usgs_sciencebase_template ='https://www.sciencebase.gov/catalog/items?q=&max=9999&format=jsonp'

        // total=490 browseCategory=Map,  not for arcgis rest api
        var ___url_usgs_sciencebase_template ='https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=browseCategory=Map&format=jsonp'

        // tota=4384 extension=raster,  not for arcgis rest api
        var ___url_usgs_sciencebase_template ='https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=facets.facetName%3DRaster&format=jsonp'

        Must choose one of above
 */ 
        var usgs_catalog = 'ArcGIS_REST_Map_Service' // default 84 
        var usgs_catalog_url_array = {
          'ArcGIS_REST_Map_Service' : 'https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=browseType=ArcGIS REST Map Service&filter=browseCategory=Map&format=jsonp', 
          'ArcGIS'                  : 'https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=browseType=ArcGIS REST Map Service&format=jsonp',
          'Map_Service'             : 'https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=browseCategory=Map&format=jsonp',
          'Raster'                  : 'https://www.sciencebase.gov/catalog/items?q=&max=9999&filter=facets.facetName%3DRaster&format=jsonp',
          'All'                     : 'https://www.sciencebase.gov/catalog/items?q=&max=9999&format=jsonp'
        }
        var ___url_usgs_sciencebase_template = '' // will get init value at init usgs catalog function






 
var input_current       // whole array of json, without filter, 
var input_current_reverse_for_display
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





         function init_usgs_catalog(){


                  /*  seperate from init global var, only for this usgs purpose */
                  // ... ... .. .. . usgs_catalog radio ... ... .. .. . 
                  var _____url_Params__ = new URLSearchParams(window.location.search); 
                  var param_usgs_catalog = _____url_Params__.get('usgs_catalog'); 
                  if (param_usgs_catalog) {
                    usgs_catalog = param_usgs_catalog
                  } 
                  // ... ... end .. .. . category radio ... ... .. .. .
                  /**/  
              

                //  --  first time run and only run 1 time.
                $('input[id=' + usgs_catalog + ']').prop('checked', true);
                ___url_usgs_sciencebase_template = usgs_catalog_url_array[usgs_catalog]
                start_streaming()
                // --  end -- first time run and only run 1 time.


                $('input[type=radio][name=usgs_catalog_radio').on('change', function(){
                  usgs_catalog = this.value
                  update_url_parameter('usgs_catalog', usgs_catalog)
                  console.log('usgs_catalog radio change to ', usgs_catalog )
                  ___url_usgs_sciencebase_template = usgs_catalog_url_array[usgs_catalog]
                  start_streaming()
                });


         }


                  
          async function open_usgs_sciencebase_link(itemPageUrl,  itemId, itemTitle,  _type_){



             // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                        var _link_protocal = window.location.protocol;
                        if (itemPageUrl) {
                            if (itemPageUrl.indexOf('http://') > -1) {
                                    // if resource url is http, force link protacal as http: 
                                    _link_protocal = 'http:'
                            }        
                        } else {
                          console.log(' warn :  attribute.Url is null  ', _name )
                        }
              // ------ end fix bug, --------------------






            console.log('itemPageUrl itemId' , itemPageUrl, itemId)
            // not use, 
            //window.open(itemPageUrl, '_blank')

            var itemJsonURL = itemPageUrl + '?format=jsonp'
            show_loading_img_spinner('control_panel', 'ajax_getJson_processing', itemJsonURL)  
                  
            // first time ajax only need total site number, not using the data
            var itemJson = await $.ajax({
                                                    timeout: 60000,  // 1 min only for USGS
                                                    url: itemJsonURL,
                                                    dataType: "jsonp", // USGS only works with jsonp,  CORS are not working
                                                    type : 'GET',
                                                    error: function (error) {                         
                                                                    console.log('ajax jsonp error',error ) 
                                                            },
                                                    success: function (data) {
                                                    },
                                                  }); // await

            remove_loading_img_spinner('ajax_getJson_processing');
            $(".progress").hide(); 

            console.log('itemJson' , itemJsonURL, itemJson)

            if ((itemJson) && itemJson.hasOwnProperty('distributionLinks')){

                          var _distribution_links_array = itemJson.distributionLinks
                          var _arcgis_rest_url_link = _distribution_links_array.find(({ title }) => title.toLowerCase() == "arcgis rest service");
                          console.log('_arcgis_rest_url_link' , _arcgis_rest_url_link)

                          if ((_arcgis_rest_url_link) && _arcgis_rest_url_link.hasOwnProperty('uri')){

                                   switch (_type_){

                                    case "advanced":
                                                  var _searchlayer_url = _link_protocal + "//" + window.location.host + '/json2tree/esri/server/folder2.html?url=' +  _arcgis_rest_url_link.uri;
                                                  _searchlayer_url += '&org=' + encodeURIComponent(itemTitle)
                                                  window.open(_searchlayer_url, '_blank')
                                     break;


                                     case "simple":
                                                  var _searchlayer_url = _link_protocal + "//" + window.location.host + '/json2tree/esri/server2/folder2.html?url=' +  _arcgis_rest_url_link.uri;
                                                  _searchlayer_url += '&org=' + encodeURIComponent(itemTitle)
                                                  window.open(_searchlayer_url, '_blank')
                                     break;

                                     default:
                                   }





                          } else {
                            alert('Arcgis REST Service is not supported for this item')
                          }


            } else {
              alert('This item has not been shared')
            }
            


          }



  
  
                function rendering_json_to_html(_results) {
                    var html = '';
                    html += '<div>';
                    if (_results.length > 0) {

                        html += '<ol class="custom-counter">';

                        for (var i = 0; i < _results.length; ++i){

                  
                              var ___siteUrl = _results[i].link.url;   // example  "https://www.sciencebase.gov/catalog/item/589dfea5e4b099f50d3a063b"
                            
                              var _id = _results[i].id;
                              var _title = _results[i].title;  
                              var _summary = _results[i].summary; 
                        

                            // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                      var _link_protocal = window.location.protocol;
                                      if (___siteUrl) {
                                          if (___siteUrl.indexOf('http://') > -1) {
                                                  // if resource url is http, force link protacal as http: 
                                                  _link_protocal = 'http:'
                                          }        
                                      } else {
                                        console.log(' warn :  attribute.Url is null  ', _name )
                                      }
                            // ------ end fix bug, --------------------

                
                                            html += '<li>' // css .ordered_list_number{ size font}
                                            html += '&nbsp;';
                                  
                                            if (___siteUrl){

                                                    // just change to orange color, not flashing, no javascript needed
                                                    // html += '<button class="click_change_style" onclick="open_usgs_sciencebase_link(\'' + ___siteUrl + '\',\'' + _id +  '\',\'' + _title +  '\')">';
                                                              //html +=  'open';

                                                    // flashing, must add inline javascript at onclick=
                                                    html += '<button class="flashing-btn-div no-class" onclick="click_button_change_style_handler(event,\'flashing-btn-div\', \'no-class\', \'flashing-btn-div2\'); open_usgs_sciencebase_link(\'' + ___siteUrl + '\',\'' + _id +  '\',\'' + _title +  '\',\'' + 'advanced' + '\')">';
                                                             html +=  '<span style="font-size:23.3px" class="flashing-font">Open</span>';
                                                    html += '</button>';
                                                    html += '&nbsp;&nbsp;&nbsp;';


                                                    html += '<button class="flashing-btn-div no-class" onclick="click_button_change_style_handler(event,\'flashing-btn-div\', \'no-class\', \'flashing-btn-div2\'); open_usgs_sciencebase_link(\'' + ___siteUrl + '\',\'' + _id +  '\',\'' + _title +  '\',\'' + 'simple' + '\')">';
                                                             html +=  '<span style="font-size:13.3px" class="flashing-font">open-compact</span>';
                                                    html += '</button>';
                                                    html += '&nbsp;&nbsp;&nbsp;';


                                            } else {
                                                                  // site url is null, show x icon
                                                                  html += '<a target="_blank" href="#">';
                                                                  html +=  'site url unavailable';
                                                                  html += '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;';
                                            }
                                            html += '<span class="context"><b>'  + _title + '</b></span>' 
                                            html += '<br>';  
                                            //html += '&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;';
                                            html += '<a target="_blank" href="' + ___siteUrl + '">';
                                            html +=   ___siteUrl 
                                            html += '</a>';  
                                            html += '<br>';
                                            //html += '&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;';
                                            html += '<span class="context"><small><sup>'  + _summary + '</small></sup></span>'        
                                        
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

                                                                _test_string = input_current[i].title + input_current[i].summary;

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

                            }



                  //   *******   end  ******   search event related   *******      






/**/



  
                
                


/**/



  

               // - -  -  -  streaming   - -  -  -  
                

               function init_streaming_event_handler() {

                        remove_loading_img_spinner('ajax_getJson_processing');

                        $("#pause_streaming_button").hide(); 
                        $("#resume_streaming_button").hide(); 
                        $("#stop_streaming_button").hide(); 
                        

                        $('#pause_streaming_button').on('click',pause_streaming);
                        $('#resume_streaming_button').on('click',resume_streaming);
                        $('#stop_streaming_button').on('click',stop_streaming);
                      
                }


                
                // this function only run 1 time
                async function start_streaming(){
                    
                    
                  stop_search_status = false;
                  pause_search_status = false;
                  input_current = []; 
                  input_current_reverse_for_display = []; 

                  $("#pause_streaming_button").show(); 
                  $("#resume_streaming_button").hide(); 
                  $("#stop_streaming_button").show(); 

                                                      
                            
                            var _this_page_raw_return = {}
                            var _next_page_url = ___url_usgs_sciencebase_template;

                            show_loading_img_spinner('control_panel', 'ajax_getJson_processing', _next_page_url)  
                  
                            // first time ajax only need total site number, not using the data
                            _this_page_raw_return = await $.ajax({
                                                                    timeout: 60000,  // 1 min only for USGS
                                                                    url: _next_page_url,
                                                                    dataType: "jsonp", // USGS only works with jsonp,  CORS are not working
                                                                    type : 'GET',
                                                                    error: function (error) {                         
                                                                                    console.log('ajax jsonp error',error ) 
                                                                            },
                                                                    success: function (data) {
                                                                    },
                                                                  }); // await

                            remove_loading_img_spinner('ajax_getJson_processing');
                            $(".progress").hide(); 

                            console.log('this page raw return', _this_page_raw_return)
                            
                            /*  sample of search returns
                              
                                    {
                                      nextStart:101
                                      num:100
                                      query:"((type:\"Map Service\" OR type:\"Image Service\" OR type:\"Feature Service\" OR type:\"Stream Service\" OR type:\"Vector Tile Service\" OR type:\"WMS\" OR type:\"WFS\" OR type:\"WMTS\" OR type:\"KML\" OR type:\"Feature Collection\" OR type:\"Feed\") AND (-type:\"KML Collection\" AND -type:\"Feature Collection Template\")) (-typekeywords:\"Elevation 3D Layer\" AND -type:\"Feature Collection Template\")"
                                      results:(100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                                      start:1
                                      total:6435
                                    }
                    
                              */
                              __total_item_count = _this_page_raw_return.total;
                              
                              input_current = _this_page_raw_return.items;
                              input_current_reverse_for_display = input_current;  
                            
                              // fake total for test only, must comment out in production
                              //  __total_item_count = 243
                                for (i = 1; i <= (Math.floor(__total_item_count / 1000) ); i++) { 
                                
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
                                
                                      //both works
                                      //_next_page_url = ___url_usgs_sciencebase_template + "&offset=" +  ((i * 1000)).toString();
                                      _next_page_url = _this_page_raw_return.nextlink.url;
                                
                                      console.log(' for loop - next page url - ',  i, ((i * 1000)).toString() ,  _next_page_url)
                                
                                
                                          _this_page_raw_return = {}

                                          show_loading_img_spinner('control_panel', 'ajax_getJson_processing', _next_page_url) 
                                          
                                          _this_page_raw_return = await $.ajax({
                                            timeout: 60000,  // 1 min only for USGS
                                            url: _next_page_url,
                                            dataType: "jsonp", // USGS only works with jsonp,  CORS are not working
                                            type : 'GET',
                                            error: function (error) {                         
                                                            console.log('ajax jsonp error',error ) 
                                                    },
                                            success: function (data) {
                                            },
                                          }); // await

                                          remove_loading_img_spinner('ajax_getJson_processing');
                                          $(".progress").hide(); 

                                                                                          
                                          if ((_this_page_raw_return) && (_this_page_raw_return.items)){
                                              
                                                        var __this_page_array = _this_page_raw_return.items
                                          
                                          
                                                        // we want to add new array from the beginning of old array, to show changing to the user. 
                                                        //https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
                                                          // input_current = input_current.concat(_this_page_raw_return.data);
                                                          
                                                          //hub.data.search.js:668 Uncaught (in promise) TypeError: input_current.unshift is not a function
                                                          //unshift only works for 1 element, not work for another array.
                                                          // input_current = input_current.unshift(_this_page_raw_return.data);
                                                          
                                                          
                                                          console.log(' this page new array added to list ',  __this_page_array)

                                                          input_current_reverse_for_display = __this_page_array.concat(input_current);
                                                          input_current = input_current.concat(__this_page_array);
                                                          

                                                            
                                                            
                                                            
                                                            
                                                            
                                                            // even user click pause button, streaming still runing sending ajax query in background
                                                            if (! pause_search_status){

                                                                // pause = false, means not pause, need show partial result

                                                                // in case of user clicked pause, when streaming ended, update the final result , show partial result for what we already have 
                                                                show_current(input_current_reverse_for_display, 'input_current')
                                                                

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




        /**/



  
  
  
  
  
  
  
  
  
  
  
  
  
  // document ready short hand
  (async function($){
  
   
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()
               

              

               init_search_button_event_handler();

               init_scrollable()

               
                
                init_streaming_event_handler();


                init_usgs_catalog()
                // can be here, but better move to init usgs catalog function 
                //start_streaming()
                
                
  
                 // can't be here, must await until streaming completed
                 // filter_result_by_filter_by()
  
  
})(jQuery);
