
/*

    atlas.live2 is same as atlas.live, but only difference is url source is different. 
    atlas.live   refer items have "living atlas" tag, have 6400 items so far           https://laquinta.maps.arcgis.com/sharing/rest/content/groups/47dd57c9a59d458c86d3d6b978560088/search
    atlas.live2  refer items have "arcgis online" tag, max limit to 10000 items so far https://laquinta.maps.arcgis.com/sharing/rest/search

    living atlas can be found at 
      
    any arcgis rest api, mapserver page,
    click 'view in' 'arcgis online map viewer'
    top menu, click 'add' button, choose 'living atlas'
    click 'living atlas' drop down, you can choose 'arcgis online' which have 10000 item. 
    living atlas, have 6400 item so far

    https://laquinta.maps.arcgis.com/home/webmap/viewer.html?url=https%3A%2F%2Fgis.la-quinta.org%2Farcgis%2Frest%2Fservices%2Fshort_term_vacation_rentals%2FSTVR_exempt_zone%2FMapServer&source=sd


      esri limit max 100 item per http request,  get from 1 - 100 , descending by view count

      decoded
      https://laquinta.maps.arcgis.com/sharing/rest/search?f=json&q=((type:"Map Service" OR type:"Image Service" OR type:"Feature Service" OR type:"Stream Service" OR type:"Vector Tile Service" OR type:"WMS" OR type:"WFS" OR type:"WMTS" OR type:"KML" OR type:"Feature Collection" OR type:"Feed") AND (-type:"KML Collection" AND -type:"Feature Collection Template")) (-typekeywords:"Elevation 3D Layer" AND -type:"Feature Collection Template")
      &num=100
      &sortOrder=desc
      &sortField=numviews
      &start=1
      

      encoded
     https://laquinta.maps.arcgis.com/sharing/rest/search?f=json&q=((type%3A%22Map%20Service%22%20OR%20type%3A%22Image%20Service%22%20OR%20type%3A%22Feature%20Service%22%20OR%20type%3A%22Stream%20Service%22%20OR%20type%3A%22Vector%20Tile%20Service%22%20OR%20type%3A%22WMS%22%20OR%20type%3A%22WFS%22%20OR%20type%3A%22WMTS%22%20OR%20type%3A%22KML%22%20OR%20type%3A%22Feature%20Collection%22%20OR%20type%3A%22Feed%22)%20AND%20(-type%3A%22KML%20Collection%22%20AND%20-type%3A%22Feature%20Collection%20Template%22))%20(-typekeywords%3A%22Elevation%203D%20Layer%22%20AND%20-type%3A%22Feature%20Collection%20Template%22)&num=100&sortOrder=desc&start=1&sortField=numviews
*/


//  get from 1 - 100 , descending by view count 
// must add this param "&start=1" at the end of URL
 var ___url_atlas_template ="https://laquinta.maps.arcgis.com/sharing/rest/search?f=json&q=((type%3A%22Map%20Service%22%20OR%20type%3A%22Image%20Service%22%20OR%20type%3A%22Feature%20Service%22%20OR%20type%3A%22Stream%20Service%22%20OR%20type%3A%22Vector%20Tile%20Service%22%20OR%20type%3A%22WMS%22%20OR%20type%3A%22WFS%22%20OR%20type%3A%22WMTS%22%20OR%20type%3A%22KML%22%20OR%20type%3A%22Feature%20Collection%22%20OR%20type%3A%22Feed%22)%20AND%20(-type%3A%22KML%20Collection%22%20AND%20-type%3A%22Feature%20Collection%20Template%22))%20(-typekeywords%3A%22Elevation%203D%20Layer%22%20AND%20-type%3A%22Feature%20Collection%20Template%22)&num=100&sortOrder=desc&sortField=numviews";
 // not working, because maps.lacity.org is not their arcgis online account url
 //var ___url_atlas_template ="https://maps.lacity.org/sharing/rest/search?f=json&q=((type%3A%22Map%20Service%22%20OR%20type%3A%22Image%20Service%22%20OR%20type%3A%22Feature%20Service%22%20OR%20type%3A%22Stream%20Service%22%20OR%20type%3A%22Vector%20Tile%20Service%22%20OR%20type%3A%22WMS%22%20OR%20type%3A%22WFS%22%20OR%20type%3A%22WMTS%22%20OR%20type%3A%22KML%22%20OR%20type%3A%22Feature%20Collection%22%20OR%20type%3A%22Feed%22)%20AND%20(-type%3A%22KML%20Collection%22%20AND%20-type%3A%22Feature%20Collection%20Template%22))%20(-typekeywords%3A%22Elevation%203D%20Layer%22%20AND%20-type%3A%22Feature%20Collection%20Template%22)&num=100&sortOrder=desc&sortField=numviews";
 



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







  
  
                function rendering_json_to_html(_results) {


                      // console.log('rendering json to html json array', _results)

                          /*

                       sample: json

                                            {
                                                    "id": "d3a78deedc0749eeb3ed9069773d5551",
                                                    "owner": "esri_DE_content",
                                                    "created": 1528701898000,
                                                    "modified": 1634731694000,
                                                    "guid": null,
                                                    "name": "Deutschland_Bundesländergrenzen_2018",
                                                    "title": "Bundesländergrenzen 2018",
                                                    "type": "Feature Service",
                                                    "typeKeywords": [
                                                        "ArcGIS Server",
                                                        "Data",
                                                        "Feature Access",
                                                        "Feature Service",
                                                        "Service",
                                                        "Singlelayer",
                                                        "Hosted Service"
                                                    ],
                                                    "description": "<span style='font-family:&quot;Avenir Next W01&quot;, &quot;Avenir Next W00&quot;, &quot;Avenir Next&quot;, Avenir, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size:17px; background-color:rgb(255, 255, 255);'>Der Service stellt die administrativen Bundesländergrenzen zum Stand 1. Januar 2018 ohne Wasserflächen im Maßstab 1:250.000 zur Verfügung.</span><div style='font-family:&quot;Avenir Next W01&quot;, &quot;Avenir Next W00&quot;, &quot;Avenir Next&quot;, Avenir, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size:17px; background-color:rgb(255, 255, 255);'>Der Datenbestand entspricht den Georeferenzdaten VG-Ebenen des BKG Bundesamtes für Kartographie und Geodäsie auf Ebene <b>Bundesland</b> (LAN) mit folgender Geometrieänderung:<div>Es wurden nur die Land-Geometrien (GF = 3 oder 4) übernommen, aufgelöscht und auf Web Mercator umprojiziert.</div><div><br /></div><div><a href='https://sg.geodatenzentrum.de/web_download/vg/vg250_0101/vg250_0101.pdf' target='_blank' rel='nofollow ugc noopener noreferrer'>Datensatzbeschreibung des BKG</a><br /></div><div><br /></div><div>English </div><div><br /></div><div>This service provides the <b>administrative Federal State boundaries</b> of Germany as of January 1st, 2018.</div><div>This layer only contains land surfaces at a 1:250,000 scale. It corresponds to the georeferenced boundary data of the BKG Federal Agency for Cartography and Geodesy.</div><div>Only the land geometries (GF=3 or GF=4) were adopted, dissolved and projected to Web Mercator.</div></div>",
                                                    "tags": [
                                                        "DE",
                                                        "Deutschland",
                                                        "Germany",
                                                        "Verwaltungsgebiete",
                                                        "Open Data",
                                                        "GeoBasis-DE",
                                                        "Grenzen",
                                                        "boundaries",
                                                        "BKG",
                                                        "Bundesländer",
                                                        "Bundesländergrenzen",
                                                        "federal states",
                                                        "administrative",
                                                        "2018"
                                                    ],
                                                    "snippet": "Offiziellen Bundesländergrenzen Deutschlands des Bundesamt für Kartographie und Geodäsie, optimiert für Analyse und statistische Berechnungen. / Federal State boundaries of Germany for Analysis and Demographic enrichment. Stand: 1.1.2018",
                                                    "thumbnail": "thumbnail/thumbnail1528727994327.png",
                                                    "documentation": null,
                                                    "extent": [
                                                        [
                                                            5.866250350648007,
                                                            47.27012360402181
                                                        ],
                                                        [
                                                            15.041815656608973,
                                                            55.05838359972467
                                                        ]
                                                    ],
                                                    "categories": [
                                                        "/Categories/Boundaries/Administrative"
                                                    ],
                                                    "spatialReference": "WGS_1984_Web_Mercator_Auxiliary_Sphere",
                                                    "accessInformation": "© GeoBasis-DE / BKG 2018",
                                                    "licenseInfo": ""
                                                     "culture": "de-de",
                                                    "properties": null,
                                                    "advancedSettings": null,
                                                    "url": "https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Deutschland_Bundesländergrenzen_2018/FeatureServer",
                                                    "proxyFilter": null,
                                                    "access": "public",
                                                    "size": -1,
                                                    "subInfo": 0,
                                                    "appCategories": [],
                                                    "industries": [],
                                                    "languages": [],
                                                    "largeThumbnail": "largethumbnail/Bundesl_C3_A4ndergrenzenLA.png",
                                                    "banner": null,
                                                    "screenshots": [],
                                                    "listed": false,
                                                    "numComments": 0,
                                                    "numRatings": 0,
                                                    "avgRating": 0,
                                                    "numViews": 2133876230,
                                                    "groupCategories": [
                                                        "/Region/DE",
                                                        "/Categories/Basemaps/Component Layers"
                                                    ],
                                                    "contentStatus": "public_authoritative",
                                                    "orgId": "jUpNdisbWqRpMo35",
                                                    "scoreCompleteness": 100,
                                                    "groupDesignations": "livingatlas",
                                                    "contentOrigin": "other"
                                                }

                                         */
        
        
        
        
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
        
                html += '<div>';
                    
                if (_results.length > 0) {

                     html += '<ol class="custom-counter">';

                     for (var i = 0; i < _results.length; ++i){

               
                          var ___siteUrl = _results[i].url;   // example  "https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Deutschland_Bundesländergrenzen_2018/FeatureServer"
                        
                          var _name = _results[i].name;  
                          var _type = _results[i].type;
                          var _title = _results[i].title;  
                          var _view_count_int = _results[i].numViews
                          var _thumbnail  =  _results[i].thumbnail
                    
                    
                    
                          //js number to k m b   https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
                          var _view_count=  Intl.NumberFormat('en-US', {
                                                                notation: "compact",
                                                                maximumFractionDigits: 1
                                                              }).format(_view_count_int);


                          
                   
                          var _coordinates ={}
                          var ____center_lat = 40.755931
                          var ____center_long = -73.984606
                          if (_results[i].extent){
                                        _coordinates = _results[i].extent;
                                        //console.log('extent coordinates array',  _coordinates)
                                        if (_coordinates.length > 0 ){
                                              ____center_lat = (_coordinates[0][1] + _coordinates[1][1])/ 2
                                              ____center_long = (_coordinates[0][0] + _coordinates[1][0])/ 2
                                        }
                                        
                          }


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

               // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************

                                        html += '<li>' // css .ordered_list_number{ size font}
                                        html += '&nbsp;';
                              
                                        if (___siteUrl){
                                              
                                          html += '<button class="click_change_style" onclick="window.open(\'' + _link_protocal + "//" + window.location.host + '/json2tree/esri' + '/server/folder2.html?url=' +  ___siteUrl;
                                          html += '&org=' + encodeURIComponent(_title);
                                          html += '&_center_lat=' + ____center_lat;
                                          html += '&_center_long=' + ____center_long;
                                          html += '&_center_zoom=' +  '11';        //_center_zoom;
                                          html +=  '\',\'_blank\')">';
                                                      html +=  '<span style="font-size:23.3px" class="flashing-font">Open</span>';
                                          html += '</button>';
                                          html += '&nbsp;&nbsp;&nbsp;';


                                          html += '<button class="click_change_style" onclick="window.open(\'' + _link_protocal + "//" + window.location.host + '/json2tree/esri' + '/server2/folder2.html?url=' +  ___siteUrl;
                                            html += '&org=' + encodeURIComponent(_title);
                                            html += '&_center_lat=' + ____center_lat;
                                            html += '&_center_long=' + ____center_long;
                                            html += '&_center_zoom=' +  '11';        //_center_zoom;
                                            html +=  '\',\'_blank\')">';
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
                                        html += '&nbsp;';
                                        html += '<small><sup>'  + _view_count + ' views</small></sup>'
                                        html += '<br>';  
                                        html += '&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;';
                                        html += '<a target="_blank" href="' + ___siteUrl + '">';
                                        html +=   ___siteUrl 
                                        html += '</a>';          
                                    
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

                                                                _test_string = input_current[i].title;

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
                                          var _next_page_url = ___url_atlas_template + "&start=1";

                                          show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_string)  
                                
                                          // first time ajax only need total site number, not using the data
                                          _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                                          
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
                                            
                                            input_current = _this_page_raw_return.results;
                                            input_current_reverse_for_display = input_current;  
                                          
                                            // fake total for test only, must comment out in production
                                            //  __total_item_count = 243
                                              for (i = 1; i < (Math.floor(__total_item_count / 100) ); i++) { 
                                              
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
                                              
                                                    _next_page_url = ___url_atlas_template + "&start=" +  ((i * 100) + 1).toString();
                                              
                                              
                                                    console.log(' for loop - next page url - ',  i, ((i * 100) + 1).toString() ,  _next_page_url)
                                              
                                              
                                                        _this_page_raw_return = {}

                                                        _this_page_raw_return = await ajax_getjson_common(_next_page_url);
                                                                                                        
                                                        if ((_this_page_raw_return) && (_this_page_raw_return.results)){
                                                            
                                                                      var __this_page_array = _this_page_raw_return.results
                                                        
                                                        
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // document ready short hand
  (async function($){
  
   
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()
               
               init_search_button_event_handler();

               init_scrollable()

               init_streaming_event_handler();
               start_streaming()
               
               
 
                // can't be here, must await until streaming completed
                // filter_result_by_filter_by()

  
  
})(jQuery);
