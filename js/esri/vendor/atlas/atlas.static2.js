 
 
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







  ?file=hub.site.static.data.2019.js.zip 
   without '?file=xxx'   by default file=hub.site.static.data.js.zip;


 
   for local test only, need add ?localdomain=1

            http://localhost:10/json2tree/esri/hub.site.static.html?localdomain=1

              &localdomain=1 //by default, without this paramerter, will use production domain,  
            // with this parameter , 1 means, use localhost:3000/restapi....
            
            
            
              // https: ---- production
                            // var _static_data_zip_uri = 'https://transparentgov.net/data/json2tree/hub.site.static.data.js.zip'
                                
                                // http ---- localhost
                           //   var _static_data_zip_uri = 'http://localhost:10
                           

            
            
 */
 








 
 
 // with lunr ( enforce inject lunr_id )
 // with mark.js

 // no web worker, no stream
 
 
 
var _static_data_zip_uri
 
 
 
 
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
 
 
 
 
 
 
 // live from hug.arcgis.com
 // or opendata.arcgis.com
 
 // max page size is 99
 var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)"

 
 // search next page url 
// var ___url_string_full_list ="https://opendata.arcgis.com/api/v3/search?filter[collection]=any(Site)&page[size]=20&page[key]=eyJodWIiOnsic3RhcnQiOjExfSwiYWdvIjp7InN0YXJ0IjoxMX19"

 
  
  
  
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


          html += '<span class="context"><b>'  + _title + '</b></span>' 
          html += '&nbsp;';
          html += '<small><sup>'  + _view_count + ' views</small></sup>'

          html += '&nbsp;&nbsp;'




          if (___siteUrl){
                
                  // not use, no js needed, only css, for simple click to change color
                  //html += '<button class="click_change_style" onclick="window.open(\'' + _link_protocal + "//" + window.location.host + '/json2tree/esri' + '/server2/folder2.html?url=' +  ___siteUrl;

                  // not use, all button flashing,  too busy
                  //html += '<button class="flashing-btn-div flashing-btn-div2" onclick="click_button_change_style_handler(event,\'flashing-btn-div\', \'flashing-btn-div2\', \'font-effect-neon\');  window.open(\'' + _link_protocal + "//" + window.location.host + '/json2tree/esri' + '/server2/folder2.html?url=' +  ___siteUrl;
                  
                  // in use
                  html += '<button class="flashing-btn-div no-class" onclick="click_button_change_style_handler(event,\'flashing-btn-div\', \'no-class\', \'flashing-btn-div2\');  window.open(\'' + _link_protocal + "//" + window.location.host + '/json2tree/esri' + '/server/folder2.html?url=' +  ___siteUrl;
                    html += '&org=' + encodeURIComponent(_title);
                    html += '&_center_lat=' + ____center_lat;
                    html += '&_center_long=' + ____center_long;
                    html += '&_center_zoom=' +  '11';        //_center_zoom;
                    html +=  '\',\'_blank\')">';
                                html +=  '<span style="font-size:23.3px" class="flashing-font">Open</span>';
                  html += '</button>';
                  html += '&nbsp;&nbsp;&nbsp;';

                  html += '<button class="flashing-btn-div no-class" onclick="click_button_change_style_handler(event,\'flashing-btn-div\', \'no-class\', \'flashing-btn-div2\');  window.open(\'' + _link_protocal + "//" + window.location.host + '/json2tree/esri' + '/server2/folder2.html?url=' +  ___siteUrl;
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
  
      
             
  
  

          // ======================== lunr.js ========================

                       
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
                            

                          }



                    }
                  


                    
                    function populate_lunr_index(){
                      
                                lunr_index = []
                    
                                for (var j = 0; j < input_current.length; ++j){
                                                  
                                    lunr_index.push({lunr_id: input_current[j].lunr_id,    name: input_current[j].title})
                                                    
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



  
  
  
  
  
  
  
  
  
  
  (async function($){
  
   
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()
               
               //turn on auto complete by uncomment here,
               //init_autocomplete();

               init_search_button_event_handler();

               init_scrollable()




               if (localdomain == 1){

                in_use_domain_port_apache = localhost_domain_port_apache
              }

       
               if (file) {
                // file is from URL param file=xxx.zip

               } else {
                 // default file=hub.site.static.data.js.zip;
                file =  'atlas.static.data2.js.zip';
               }


               console.log('in_use_domain_port_apache', in_use_domain_port_apache)

              _static_data_zip_uri = in_use_domain_port_apache + '/data/json2tree/' + file; 

              console.log('_static_data_zip_uri', _static_data_zip_uri)


              show_loading_img_spinner('control_panel', 'ajax_getJson_processing', _static_data_zip_uri)



               
               //------------------- zip.js -----------------------------------
               
                 //https://stackoverflow.com/questions/57878862/how-to-include-huge-javascript-js-file-in-html/57878911#57878911
               
               
               
                  
                    
                    
                    zip.workerScriptsPath = "../js/lib/zipjs/";



                    //https://github.com/gildas-lormeau/zip.js/issues/93

                    zip.createReader(new zip.HttpReader(_static_data_zip_uri), 
                                                                               function(zipReader){
                                                                                                    
                                                                                   
                                                                   zipReader.getEntries(function(entries){
                                                                       if (entries.length) {

                                                                            // get first entry content as text
                                                                            entries[0].getData(new zip.TextWriter(), function(text) {
                                                                              // text contains the entry data as a String
                                                                             // console.log(text);
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                               //..........load into json-viewer,  unzipped text is string .........
                                                                               
                                                                               
                                                                               
                                                                                        // do not reduce json size.
                                                                                        input_current = JSON.parse(text);
                                                                                        console.log('input_current >>> ', input_current)     
                                                                                         
                                                                                        
                                                                                        __total_item_count = input_current.length;
              
              
                                                                                       
                                                                                       // first time load all  
                                                                                       clear_search_result()



                                                                                      
                                                                                        
                                                                                          filter_result_by_filter_by()
                                                                                        
                                                                                      
                                                                                        remove_loading_img_spinner('ajax_getJson_processing');  
                                                                                         $(".progress").hide(); 
                
                                                                                //.......... End ....... load into json-viewer,  unzipped text is string .........
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             

                                                                              // close the zip reader
                                                                              zipReader.close(function() {
                                                                                // onclose callback
                                                                              });

                                                                            }, function(current, total) {
                                                                              // onprogress callback
                                                                              
                                                                               // console.log('current-', current)
                                                                               //  console.log('total-', total)
                                                                            });
                                                                          }
                                                                        });
                                                                      }, function(zipreader_error) {
                                                                        // onerror callback
                                                                        console.log('zipreader_error --->',zipreader_error)
                                                                      });
               
               
               
               
               
               //------------------- End ---------------  zip.js -----------------------------------
               
               
               
  
})(jQuery);
