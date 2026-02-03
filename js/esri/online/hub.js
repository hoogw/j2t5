// fetch , no proxy

// NO web worker

// with lunr.js and mark.js
// lunr add forced to generate lunr_id as index.

  
// all hub related need get ..../data.json first
// fetch(need CORS) or datatype:json (need CORS) always works, becaue all arcgis online hub server enable CORS for data.json.





 
 // "input" was used in arcgis_common, do not use it here
 var input_current = [];  
 var _filtered_results   // filtered results


 var _filter_by // search filter by keyword
 var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500                 
 var short_list_count = 100                
 var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'

 var current_filter_result_count;
 var __total_item_count;


 var show_views_count_status = false;
 var meta_info_url;
 var meta_info;
 
  // lunr.js
 var idx
 var lunr_index
 var lunr_idx_ready_status= false;
 



// only for hub.js  5 min (360 sec)
var _timeout_hub_only = 360000;







    async function download_json(_json_url){

      
      show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_string)
      //  need server have CORS supported
      //input_current = await fetch_only(___url_getJson, _timeout_hub_only)
      // need server have CORS supported
      input_current = await ajax_datatype_json(___url_getJson, _timeout_hub_only)

      remove_loading_img_spinner('ajax_getJson_processing');

      console.log("input current", input_current) 

      if (input_current.dataset){
                                $("#message_div").text('');
                                input_current =  input_current.dataset
                                    
                                //  ----- sort input_current = [title: "Sewer Structure", ...] alphabetically by title  ---------
                                    // function compareStrings() is at arcgis_common.js
                                    // sort by property 'title'. If property is others, then do not sort, comment out this section.
                                    input_current.sort(function(a, b) {
                                      return compareStrings(a.title, b.title);
                                    });
                                //  ----- end ------ sort input_current = [title: "Sewer Structure", ...] alphabetically by title  ---------
                                /**/

                                // ****** ****** ******   init lunr index  must immediately after input_current **************
                                        // parameter:  [json array], index field, search field
                                        //init_lunr_index(input_current, 'lunr_id', 'title' )
                                        init_lunr_index()
                                // ******  End  ********** init lunr index  must immediately after input_current **************
                                      
                                __total_item_count = input_current.length;
                                    
                                // first time load all  
                                clear_search_result()

                                filter_result_by_filter_by()

                                $(".progress").hide();
      } else {
        $(".progress").hide(); 
        $("#message_div").text('CORS not available, try proxy hub7.html ');
      }      
      
    }
      
      
  
  // document ready short hand
  (async function($){
  
             // must be await, to get ___url_string
             await init_global_var();

             init_naming_panel()
   
             //turn on auto complete by uncomment here,
             //init_autocomplete();

             init_search_button_event_handler();
   
             init_scrollable()
            
             views_count()
            
             
               
            


            /**/
            // ------- let's go to your REST api  -------
            /**/
            init_start_root_input()
            /**/
            // --- end --- let's go to your REST api -------
            /**/
              
            // first time run 
            if (___url_string){ 

              //sample:    hub-domain + /data.json    http://opendata.ajax.ca/data.json 
              ___url_getJson = ___url_string + '/data.json';

                                  show_search_bar()
                                  // only for web worker  
                                  download_json(___url_getJson)
            }
                                      
                 
  
})(jQuery);
