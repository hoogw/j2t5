
/*

    domain2 :  add category select

*/


   /**/
   //  .. - .. - ... select by category   ... - .. - .. 
   /**/


        var current_category = 0 // default is 'all' index is 0
        var category_array = ['All', 
                              'Location Map (point only)',
                              'Geometry Map (polygon line point)',
                              'Table', //'Table(filtered)','Table(visualization)',
                              'File',
                              'Link',
                              'Data Lens',
                              'Chart',
                              'Story',
                              'Form',
                              'Others'
                            ]

         
         var everything // for raw input json, input_current for in used category
         var in_use_catory_name = 'everything'



         var gmap_only = []
         var shapefile_only  = []
         var table_only = []
         var  file_only = []
         var  link_only = []
         var  datalens_only = []
         var   chart_only = []
         var  story_only = []
         var  form_only = []
         var  others_only = []
   /**/
   //     ... - .. - ..  end .. - .. - ... select by category   ... - .. - .. 
   /**/
   
  



// with lunr.js mark.js hightlight 


// ..... .../socrata/dataset/default?......


      // rest api, progressive loading,   
      // fast:     domain/api/id/xxxx-xxxx.json
        var __resource_api_id = '/api/id&'   
        
        // slow, with app_token:     domain/resource/xxxx-xxxx.json
      // var __resource_api_id = '/resource&' 

// ..... end .../socrata/dataset/default?......



//..... .../socrata/dataset/default2?......

    // load whole json
    // https://data.lacity.org/api/views/dm6x-gsac/rows.json

    //_json_download_path1 + id + _json_download_path2

    var _json_download_path1 = '/api/views/'   
    var _json_download_path2 = '/rows.json'
    

//..... end  .../socrata/dataset/default2?......





  // dataset
  // https://agv1.transparentgov.net/socrata/dataset/default?layer=Sex_Offenders&url=https://data.cityofchicago.org/api/id&layer_id=cjcg-yw47

   
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



    
  // lunr.js
 var idx
 var lunr_index
 
 var lunr_idx_ready_status= false;
 
 
    
    
 // socrata special
 var _organization   






  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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
                                //autocomplete_search_instance.updateData({});





                                var _filter_by = $('#filter_by').val().toLowerCase().trim();

                                
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
                                                                      //autocomplete_search_instance.updateData(feed_to_autocomplete);
                                                                
                                                                } else {
                                                                    //turn on auto complete by uncomment here,
                                                                    // disable auto complete by update a empty {}
                                                                    //autocomplete_search_instance.updateData({});
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
                                      
                                      
                                      // filter by empty keyword, re-render as 
                                    
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


                             // only for socrata : ___domainName         
                             //$('#message_div').html('<a target="_blank" id="_orgnization_link">' +     _organization + '  |  ' + ___domainName + '</a> ' );
                             var _html_org = '     <h1 style="display:inline;"  ><b>  <a target="_blank" id="_orgnization_link">' + _organization + '</a></b></h1>'
                             _html_org    += '<h3 style="display:inline;"                   ><sup>     &nbsp;Socrata<big>'  + '</big></sup></h3>'
                             _html_org    += '<br> <h3 style="display:inline;"  ><sup><a target="_blank" id="_orgnization_link2">&nbsp;&nbsp;https://' + ___domainName + '</a></sup></h3>'
                             
                             $('#message_div').html( _html_org);
                             
                             $('#_orgnization_link').attr("href", 'https://'+ ___domainName);
                             $('#_orgnization_link2').attr("href", 'https://'+ ___domainName);

                             /*
                              // ****  add tool tip to message orgnization   ****  
                              $('#_orgnization_link').attr("class", 'hoverable tooltipped');
                              $('#_orgnization_link').attr("data-position", 'bottom');
                              $('#_orgnization_link').attr("data-tooltip", 'https://'+ ___domainName);
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




             function init_user_interface_event(){

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



                            /**/
       
/**/


                            

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
                                                  
                                    lunr_index.push({lunr_id: input_current[j].lunr_id,    name: input_current[j].resource.name})
                                                    
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
            //  .. - .. - ... select by category   ... - .. - .. 
            /**/




                    function change_category_handler(category_index){

                          update_url_parameter('category', category_index)

                          var _category_name = category_array[category_index]
                          console.log(' change to category ', category_index, _category_name)

                          switch(category_index){

                            case 0: // 'All'
                                input_current = everything
                                break;

                            case 1: // 'Location Map(point only)'
                                input_current = gmap_only
                                break;

                            case 2: // 'Geometry Map(polygon,line,point)'
                                input_current = shapefile_only
                                break;

                            case 3: // 'Table',
                                input_current = table_only
                                break;

                          


                            case 4: // 'File',
                                input_current = file_only
                                break;

                            case 5: // 'Link',
                                input_current = link_only
                                break;

                            case 6: // 'Data Lens',
                                input_current = datalens_only
                                break;

                            case 7: // 'Chart',
                                input_current = chart_only
                                break; 

                            case 8: // 'Story',
                                input_current = story_only
                                break; 

                            case 9: // 'Form',
                                input_current = form_only
                                break; 

                            default:  // 'Others'
                                input_current = others_only
                          } // switch


                    
                      console.log('changed category in used input current >>> ', input_current)
                      __total_item_count = input_current.length;
                    
                     
                        // first time load all,  must keep here,
                        show_current(input_current, 'input_current')
                        $('#clear_search_result_button').hide(); 
                     

                      lunr_idx_ready_status= false;
                      filter_result_by_filter_by()
                      $(".progress").hide(); 


                    }


                    function group_by_category(_results){

                    
                      // default, get domain item already sort by page view from server, but lunr.js break this order, so must re-do compare to restore the order by page view. if without use lunr.js then no need this compare() 
                      //--- sort item by page view  --- 
                      //......Must have {count:587,......}, without count:xxx, or count is different name, must update compare function. 
                      _results.sort(compare);
                      //--- end --- sort item by page view  ---

                      if (_results.length > 0) {
                        for (var i = 0; i < _results.length; ++i) {

                          // ______ check if have the_geom, if have the_geom, means have export geojson option, can do mapbox_vector.
                                var _the_geom_exist = false;
                                var _columns_field_name_array = _results[i].resource.columns_field_name;
                                var _columns_name_array = _results[i].resource.columns_name;
                                var arrayLength9 = _columns_field_name_array.length;

                                for (var i9 = 0; i9 < arrayLength9; i9++) {
                                    if (_columns_field_name_array[i9] == 'the_geom') {
                                        _the_geom_exist = true;
                                        break;
                                    }
                                }
                          // ______ check if have the_geom, if have the_geom, means have export geojson option, can do mapbox_vector.
                          var _columns_datatype_array = _results[i].resource.columns_datatype;
                          var arrayLength = _columns_datatype_array.length;
                          var _type = _results[i].resource.type;
                          var _location_field_name = '';
                          var _description = _results[i].resource.description;
                          var _name = _results[i].resource.name;

                          for (var jj = 0; jj < arrayLength; jj++) {
                            if ((_columns_datatype_array[jj].toLowerCase() == 'location')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'geospatial') || 
                                (_columns_datatype_array[jj].toLowerCase() == 'point')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'line')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'polygon')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'multipoint')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'multiline')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'multipolygon')
                              )
                            { 
                                _type = 'gmap';
                                _location_field_name = _results[i].resource.columns_field_name[jj];
                              //  console.log('_location_field_name',_location_field_name);
                              // fix bug, utah employer list have 2 field (location_1, location_2) both are location type. 
                              // but only location_1 have lat long value, location_2 only have human address, no lat long
                              // ideally should identify which location field have lat long, but here returned json does not give detailed info to indentify.
                              // so temporary fix is once have first location type, exit for loop.
                              break; 
                            } //if
                        }// for

                        /**/ 
                              //  ............... start of  ............... gmap (rest api map)  ...............   
                              if (_type == 'gmap') {
                                      gmap_only.push(_results[i])
                              } else if (_type == 'map') {
                                      shapefile_only.push(_results[i])
                              } else if ((_type == 'dataset') || (_type == 'filter') || (_type == 'visualization')) {
                                      table_only.push(_results[i])
                              } else if (_type == 'file') { 
                                      file_only.push(_results[i])
                              } else if (_type == 'href') {          
                                      link_only.push(_results[i])
                              } else if (_type == 'datalens') {  
                                      datalens_only.push(_results[i])
                              } else if (_type == 'chart')  {
                                      chart_only.push(_results[i])
                              } else if (_type == 'story')  { 
                                      story_only.push(_results[i])
                              } else if (_type == 'form')  { 
                                      form_only.push(_results[i])
                              } else {
                                      others_only.push(_results[i])
                              }//if

                        }//for
                      }//if

                      console.log('gmap', gmap_only)
                      console.log('map',  shapefile_only)
                      console.log('dataset',  table_only)
                      console.log('file',  file_only)
                      console.log('href',  link_only)
                      console.log('datalens',  datalens_only)
                      console.log('chart',  chart_only)
                      console.log('story',  story_only)
                      console.log('form',  form_only)
                      console.log('others',  others_only)
                      
                    }





                    function init_category_radio(){

                      var html_category_radio = ''
                      html_category_radio += '<fieldset>'
                      for (let i = 0; i < category_array.length; i++) {
                                          html_category_radio += '<label>'
                                          
                                          if (current_category == i){
                                            html_category_radio +=   '<input type="radio" value="' + i + '" name="category_radio" id="category_' + i + '" checked/>'
                                          } else {
                                            html_category_radio +=   '<input type="radio" value="' + i + '" name="category_radio" id="category_' + i + '"/>'
                                          }
                                                                        
                                          html_category_radio +=   '<span>' +  category_array[i] + '</span>&nbsp;&nbsp;'
                                          html_category_radio += '</label>'
                                          //outlinePattern_html += '<br>'
                      }//for

                      html_category_radio += '</fieldset>'
                      //$("#category_radio_div").html(html_category_radio)
                      document.getElementById("category_radio_div").innerHTML = html_category_radio;

                      $('input[type=radio][name=category_radio]').on('change', function() {
                        current_category = parseInt($(this).val())
                        change_category_handler(current_category)
                      });


                      // first time, only run 1 time, init radio value
                      console.log('first time current category is ', current_category)
                      change_category_handler(current_category)
                     
                    }


            
            /**/
            //     ... - .. - ..  end .. - .. - ... select by category   ... - .. - .. 
            /**/
            
  
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
   
              //turn on auto complete by uncomment here,
              //init_autocomplete();
 
              init_user_interface_event();
    
              init_scrollable()

   
              // show domain name, link
                _organization = organization[___domainName]
              
              // set html page title, on browser tab title
              if (_organization) {

                                      // $("#title").text(_organization)
                                      // without jquery
                                      document.getElementById("title").innerHTML = _organization;
                        }
                
               // ___url_string = 'https://api.us.socrata.com/api/catalog/v1?search_context=data.seattle.gov&limit=3'
                
               //   &limit=3  must encode to %26limit=3 , otherwise, it will regards another parameter instead of the part value of url
               // ___url_string = 'https://api.us.socrata.com/api/catalog/v1?search_context=data.seattle.gov%26limit=3'
             
               var ___url_getJson = ___url_string;

               show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_getJson)

               everything = await $.ajax({
    
                            timeout: _timeout,
                            url: ___url_getJson,
                            type : 'GET',
    
                            error: function (jqXHR, textStatus, errorThrown) {
                                                                                               // ajax failed
                                                                                               
                                                                                      var _error_status = textStatus + ' : ' + errorThrown         
                                                                                     console.log('ajax error :  ', jqXHR)
                                                                                     
                                                                                     
                                                                                    
                                                                                      $('#result_name').text(_error_status); 
                                                                                      $('#result_count').text(___url_getJson);
                                                                                      $(".progress").hide(); 
                                                                                      
                                                                                      
                                                                                     
                                                                                 },
    
    
                            // socrata jsonp has special api https://dev.socrata.com/docs/cors-and-jsonp.html

                            // socrata Cross-Origin Resource Sharing (CORS) option 1 for old browser 
                          //  jsonp: "$jsonp",
                          //  dataType: 'jsonp' // avoid error no 'access-control-allow-origin' header is present on the requested

                           // socrata Cross-Origin Resource Sharing (CORS) option 2, for new browser support CORS

                           dataType: "json"
                           
                           /*   
                            *  https://api.us.socrata.com/api/catalog/v1?   do not accept app_token.
                            *  
                           data: {

                             "$$app_token": _socrata_app_token
                           }
           
                           */
           
                           }); // await
                  
               remove_loading_img_spinner('ajax_getJson_processing');  
               $(".progress").hide();             
                  

               console.log('everything whole json > > > ', everything)

               everything = everything.results
                  
                
                /**/
                //  .. - .. - ... select by category   ... - .. - .. 
                /**/
                group_by_category(everything)
                init_category_radio()
                /**/
                //     ... - .. - ..  end .. - .. - ... select by category   ... - .. - .. 
                /**/
                
                            
                  
               // first time load all  
               $('#clear_search_result_button').hide(); 
               show_current(input_current, 'input_current')

  
               filter_result_by_filter_by()
                 
                 
               init_naming_panel()
  
})(jQuery);
