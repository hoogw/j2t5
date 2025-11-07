
// this is for hub , hub1, hub6, hub7 only, 
// NOT for search.html


var ___url_getJson
                 

/* */





  
  
                  //   *******  search event related   *******   only for hub1,6,7 ( no web worker) =======  hub(web worker use lunr inside worker)


      
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
                                          //autocomplete_search_instance.updateData({});


                




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
                                      
                                    // Do NOT use show_current()

                                    rendering_json_to_html(_filtered_results)

                                    // must highlight key words
                                    highlight_keywords()

                                    need_render_all = '';
                                    break;


                            case 'input_current':


                                     // Do NOT use show_current()


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

                              //$('#message_div').html('<a target="_blank" id="_orgnization_link">' + _organization + '  |  ' + ___hostname + '</a>' );
                              var _html_org = '<h1 style="display:inline;"  ><b>  <a target="_blank" id="_orgnization_link">' + _organization + '</a></b></h1>'
                              _html_org    +=       '<h3 style="display:inline;"><sup>&nbsp;Arcgis Hub</sup></h3>'
                              _html_org    += '<br> <h3 style="display:inline;"  ><sup><a target="_blank" id="_orgnization_link2">&nbsp;https://' + ___hostname + '</a></sup></h3>'
                              
                              $('#message_div').html( _html_org);

                              $('#_orgnization_link').attr("href", 'https://'+  ___hostname);
                              $('#_orgnization_link2').attr("href", 'https://'+  ___hostname);

                              /*
                              // ****  add tool tip to message orgnization   ****  
                              $('#_orgnization_link').attr("class", 'hoverable tooltipped');
                              $('#_orgnization_link').attr("data-position", 'bottom');
                              $('#_orgnization_link').attr("data-tooltip", 'https://'+ ___hostname);
                              // fix bug, must init tooltips(), every time get new search result
                              $('.tooltipped').tooltip();
                              // ****  add tool tip to message orgnization   **** 
                              */ 



                           
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





     //   *******   end  ******   search event related   *******      only for hub1,6,7 ( no web worker) =======  hub(web worker use lunr inside worker)




                 

/* */




  

          //  ======================== lunr.js ======================== only for hub1,6,7 ( no web worker) =======  hub(web worker use lunr inside worker)

                        
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
                                                    
                                      lunr_index.push({lunr_id: input_current[j].lunr_id,    title: input_current[j].title})
                                                      
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
                               this.field('title')
  
                                       
          
                              lunr_index.forEach(function (doc) {
                                                                  this.add(doc)
                                                                }, this)
                                                                                                  
                          })
                                                                                                
                  
          
                      }
          
          
          
          
            // =============== end   ============= lunr.js ======================== only for hub1,6,7 ( no web worker) =======  hub(web worker use lunr inside worker)
  
    



                    
                    

/* */









            //  ########## views counts  ##########



                              
                              async function get_views_count() {
                                    


                                show_views_count_status = true

                                var show_views_shortlisted = true


                                for (var v = 0; v < __total_item_count; v++) { 


                                  /*

                                      layer meta info ( with view count, html ): 
                                                    https://www.arcgis.com/home/item.html?id={item_id}
                                                    https://www.arcgis.com/home/item.html?id=a22e7905d67f4330bbec630eebd38419




                                      ***** we need this api for view count  ***** 
                                      layer meta info ( with view count, json ): 
                                                https://www.arcgis.com/sharing/content/items/{item_id}?f=json
                                                https://www.arcgis.com/sharing/content/items/a22e7905d67f4330bbec630eebd38419?f=json

                                  */




                                                                    // .... get portal id, for hub only .....
                                                                      //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                                                                      // portal id : 9eee1f2d84da4730b02ac90e5bfb560d
            
                                                                      var _identifier = input_current[v].identifier;
            
                                                                      var _identifier_array = _identifier.split('/');
              
                                                                      var _portal_id = _identifier_array[_identifier_array.length - 1];
              
                                                                          _portal_id_array = _portal_id.split('_');
              
                                                                          _portal_id = _portal_id_array[0];
  
  
                                                                      input_current[v].portal_id = _portal_id
                                                                      
                                                                      // .... get portal id, for hub only .....




                                  meta_info_url =  'https://www.arcgis.com/sharing/content/items/' + input_current[v].portal_id + '?f=json'

                                  meta_info = await ajax_datatype_json(meta_info_url, _timeout_hub_only)

                                  console.log('meta_info', meta_info)


                                  /*

                                          access: "public"
                                          accessInformation: "County of Los Angeles↵Enterprise GIS (eGIS) Group↵egis@isd.lacounty.gov"
                                          appCategories: []
                                          avgRating: 0
                                          banner: null
                                          categories: []
                                          commentsEnabled: true
                                          culture: "en-us"
                                          description: "<p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>Location Management System (LMS) is County of Los Angeles GIS Program to maintain a single, comprehensive geographic database of locations countywide.  The scope of this information is broad, including locations of services, points of interest, physical features, to name a few.  The goal is that maintenance of the information will be done by the jurisdiction (city, department, agency) that provides the service.</p><p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>A standard set of information about each location will be maintained and accessed by agencies and the public through all of the applications and maps that the County develops.</p>"
                                          documentation: null
                                          extent: (2) [Array(2), Array(2)]
                                          groupDesignations: null
                                          guid: null
                                          id: "6f6c4677365b4418bd585db2ef8e201f"
                                          industries: []
                                          item: "http://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/LMS_Data_Public_2014/MapServer"
                                          itemType: "url"
                                          languages: []
                                          largeThumbnail: null
                                          lastModified: -1
                                          licenseInfo: "The data herein is for informational purposes, and may not have been prepared for or be suitable for legal, engineering, or surveying intents. The County of Los Angeles reserves the right to change, restrict or discontinue access at any time. All users of the maps and data presented on http://lacounty.maps.arcgis.com or deriving from any LA County REST URLs, agree to the following Terms of Use as outlined on the LA County GIS Data Portal (http://egis3.lacounty.gov/dataportal/about/termsofuse/termsofuse-agol/)."
                                          listed: false
                                          modified: 1526394310000
                                          name: null
                                          numComments: 0
                                          numRatings: 0
                                          numViews: 4700
                                          orgId: "RmCCgQtiZLDCtblq"
                                          owner: "lacounty_isd"
                                          properties: null
                                          proxyFilter: null
                                          scoreCompleteness: 78
                                          screenshots: []
                                          size: 99
                                          snippet: "Points of Interest from Location Management System"
                                          spatialReference: "102100"
                                          tags: (3) ["Location Management System", "LMS", "Points of Interest"]
                                          thumbnail: "thumbnail/LMS.png"
                                          title: "LMS"
                                          type: "Map Service"
                                          typeKeywords: (6) ["ArcGIS Server", "Data", "Dynamic", "Map Service", "Multilayer", "Service"]
                                          uploaded: 1456961402000
                                          url: "http://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/LMS_Data_Public_2014/MapServer"




                                          error:
                                                  code: 400
                                                  details: []
                                                  message: "Item does not exist or is inaccessible."
                                                  messageCode: "CONT_0001"

                                  */


                                              if (meta_info.error) {

                                                          input_current[v].numViews = -1
                                                          input_current[v].type = 'unknown'
                                                          input_current[v].extent = 'undefined'


                                              } else {


                                                          input_current[v].numViews = meta_info.numViews

                                                          input_current[v].type = meta_info.type
                                                          input_current[v].extent = meta_info.extent


                                              }//if
                                              





                                              $('#show_view_count_button').text(v + '/' + __total_item_count)



                                              // large data, when get first 100 views, temp display 
                                              if ((v > short_list_count) && (show_views_shortlisted)) {

                                                                show_views_shortlisted = false

                                                                //--- sort by view count  --- 
                                                                //......Must have {numViews:587,......}, without count:xxx, or count is different name, must update compare function. 
                                                                input_current.sort(compare);
                                                                


                                                                show_current(input_current, 'input_current')

                                              }//



                                  
                                }// for


                                $('#show_view_count_button').hide();

                                    //--- sort by view count  --- 
                                    //......Must have {numViews:587,......}, without count:xxx, or count is different name, must update compare function. 
                                    input_current.sort(compare);
                                    


                                show_current(input_current, 'input_current')



                          }





                              //-------------- sort by view count ----------------------
                              // Sort array of objects by string property value
                              // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
                              
                              function compare(a,b) {
                              if (a.numViews < b.numViews)
                                return 1;
                              if (a.numViews > b.numViews)
                                return -1;
                              return 0;
                            }

                              //-------------- sort domain by count ----------------------








                          function views_count() {


                                
                                  $('#show_view_count_button').click(get_views_count) 

                              

                            
                          }
                                    


              //  ########## views counts  ##########











        /**/
        // ------- let's go to your REST api  -------
        /**/


        function reset_everything(){
          $('#clear_search_result_button').hide();
          //$('#show_view_count_button').hide();
          $('#message_div').html('');
          $('#counter_label').html('');
          $('#filter_by').val('');
          _search_data_content='';
          update_url_parameter('filter_by','');
          $('#json-renderer').html('');

          hide_search_bar()
      }

      function show_search_bar(){
        $("#filter_by").show()
        //$('#show_view_count_button').show();
        $("#naming_panel").show()
        $("#naming_panel_toggle").show()
      }

      function hide_search_bar(){
        $("#filter_by").hide()
        $("#naming_panel").hide()
        $("#naming_panel_toggle").hide()
      }


      function letsgo_handler(){

        ___url_string = $("#current_rest_api_endpoint").val().trim()

        reset_everything()

        update_url_parameter('org', ___url_string)
        update_url_parameter('url', ___url_string)
        _organization = ___url_string
        document.getElementById("title").innerHTML = _organization;

        __url_getJson = ___url_string + '/data.json';


        if (___url_string){
                ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                ___hostname   = ___url.hostname; //    sampleserver3.arcgisonline.com

                //sample:    hub-domain + /data.json    http://opendata.ajax.ca/data.json 
                ___url_getJson = ___url_string + '/data.json';
                
                show_search_bar()
                // only for web worker  
                download_json(___url_getJson)
        }

      }


      function init_top_bar(){


          reset_everything()

          $("#current_rest_api_endpoint").val(___url_string)

          $('#current_rest_api_endpoint').on('search', letsgo_handler);
          $( "#letsgo").click(letsgo_handler);
      }



/**/
// --- end --- let's go to your REST api -------
/**/


