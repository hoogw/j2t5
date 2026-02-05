
    
    // top level folder jstree
    var folder_structure_flatjson= [];
   
    var current_selected_folder_tree_id_counter;
    
    var total_counter = 0  // total counter as node id number, root is 0,
    var key_id = 0
    // root item + folder item + service item(mapserver, geocodeserver, etc......)
    var flatJson_item; 
    var stack_item = {}
    
   
 var editor_json_root

    

   

      async function init_category_list(){


          

          init_category_list_ui()


          var response_json
          var response_json_file

           /*
            try{

            
                // live data  not exist so far
                response_json =  await $.ajax({
                    url: "google_get_all_categories", // google do not have cat. tree api
                    method: 'GET',
                    dataType: 'json',
                    success: function(data){
                        console.log('poi api get all categories', data)
                    }, 
                    error: async function(XMLHttpRequest, textStatus, errorThrown) { 
                        //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }
                }); 
                


                } catch{
             */

                    // backup json file if live is not available
                    response_json_file =  await $.ajax({
                         // warning:   
                         // original live json, id:  name:
                         // when copy paste to json file,  all property name must use double quote, "id":   "name": ...
                                        url: "https://transparentgov.net/data/live_data/google_poi_category_list.json",
                                        method: 'GET',
                                        dataType: 'text', // warning: must be text for file
                                        success: function(data){
                                        //console.log('poi api get all categories', data)
                                        }
                    }); 

                    console.log("response_json_file", response_json_file)          
                    response_json = JSON.parse(response_json_file)
                    console.log("response_json_file parse to json : ", response_json_file) 

           // }// catch
            console.log("response_json", response_json) 
        

      
          

          var poi_categories_object = response_json

          
          folder_structure_flatjson = []
          

          // ********* add root item *********             
              flatJson_item =  { 
               
                    "id" : 0, // 0
                    "parent" : "#",   // root parent id is #
                    "text" : "Root",
                    "icon" : folder_icon,
                    "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                    },
                    "type" : "folder"
                };


                // 1 time, first time run, add root item
                folder_structure_flatjson.push(flatJson_item) 
              
                    
          // *******  end  ********* add root item *********


        


        for (var key in poi_categories_object) {
            if (poi_categories_object.hasOwnProperty(key)) {

                var value = poi_categories_object[key];
                //console.log(`Key: ${key}, Value: ${value}`);

                // . . . .  add key . . . . 
                 total_counter += 1
                 key_id = total_counter // use as  child value parent

                 flatJson_item =  { 
                    "id" : total_counter, // 0
                    "parent" : 0,   // key's parent is always root 0
                    "text" : "<b>" + key + "</b>",
                    "icon" : folder_icon,
                    "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                    },
                    "type" : "folder"
                };
                // 1 time, first time run, add root item
                folder_structure_flatjson.push(flatJson_item) 
                // *******  end  *********. . . .  add key . . . .  



                // . . . .  add value . . . . 

                for (let i = 0; i < value.length; i++) {

                    total_counter += 1

                    flatJson_item =  { 
                        "id" : total_counter, // 0
                        "parent" : key_id,   // value's parent is always key-id
                        "text" : value[i],
                        "icon" : folder_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                        },
                        "type" : "folder"
                    };
                    // 1 time, first time run, add root item
                    folder_structure_flatjson.push(flatJson_item) 
                   
                }//for

                // *******  end  *********. . . .  add value  . . . .  




            }//if
        }//for



          $("#poi_categories_total").html(total_counter)

          jstree_root_folder(folder_structure_flatjson)





                                                
                                                
                /**/
                //   = = = = =   f=json  = = = = =  = = = = =
                /**/
                var _html_for_f_json = ''
                _html_for_f_json += "</br>"
                _html_for_f_json += '<a target="_blank" id="root_url_link2" href="https://transparentgov.net/data/live_data/google_poi_category_list.json" style="font-size:xx-small; font-weight: lighter;">'  
                _html_for_f_json += 'https://transparentgov.net/data/live_data/google_poi_category_list.json'
                _html_for_f_json += '</a>'
                
                $("#root-more-info").html(_html_for_f_json)         

    // json for root, never hide, so never need show up. But json for map server, for icon (app), often hidden, must run show up  
    //$("#json-root").show();
    // knowing issue, editor not yet load completed, then server.html try to set json on it, cause error. 
    // not fix, how to await json editor load completed, then run other code?
    if (editor_json_root){
        editor_json_root.set({json:root})
    }

                
                /**/
                //   = = = = =    end   = = = = =   f=json  = = = = =  = = = = =
                /**/     


      }

      // top level [left panel]  ----- folder ------   
      function jstree_root_folder(root_allfolders_flatjson){

         console.log(" jstree all folder  flat json feed : ", root_allfolders_flatjson)

         $('#poi_categories')
            
            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
            // not use these 2 line, Because they will NOT fire event, if you click a already selected node, it only fire event if selected node changed.
            //.on('select_node.jstree', function (e, data) {
            //.on('changed.jstree', function (e, data) {
            // if you want to always fire event, even on a already selected node, use this line 
            .on('activate_node.jstree', function (e, data) {
                
                console.log(' click select folder node, event ', data)


                if (!(data.action == 'deselect_all')){

                      var i, j, _selected_name = [], _selected_id_code = [],  _selected_text = [], _selected_id = [], _selected_type = [];

                      for(i = 0, j = data.selected.length; i < j; i++) {
                        
                        _selected_text.push(data.instance.get_node(data.selected[i]).text);
            _selected_relative_path.push(data.instance.get_node(data.selected[i]).original.relative_path);
                        _selected_id.push(data.instance.get_node(data.selected[i]).id);

                        
                        // must use .original.type, because re-structured json does not carry our customized field 'type'
                        _selected_type.push(data.instance.get_node(data.selected[i]).original.type);                                                   
                      }


                      // only get 1st selected node, so always use    _selected_xxxxx[0]
                      //$('#event_result').html('Selected: ' + r.join(', '));
                      console.log('Selected node id : ' + _selected_id[0])
                      console.log('Selected node text : ' +  _selected_text[0])
        console.log('Selected node relative path : ' +  _selected_relative_path[0])
                     
                      console.log('Selected node type : ' +  _selected_type[0])

                      var selected_node_type = _selected_type[0]
                      
                      update_url_parameter('select_folder_id', _selected_id[0]);
                      update_url_parameter('select_folder_text', _selected_text[0]);
                    

                      var selected_text = _selected_text[0].replace("<b>", "")
                      selected_text = selected_text.replace("</b>", "")
                      $("#filter_folder_list_by").val(selected_text)
                      
                      switch(selected_node_type) {
                          case "folder":
                                          console.log(' render folder ', _selected_id[0])
                                         
                          break;

                          default:     
                      }//switch
                      
                
                }//if
                                                              
            })

            // 'ready.jstree' triggered after all nodes are finished loading
            // 'loaded.jstree' , triggered after the root node is loaded for the first time
            .on('ready.jstree', function (e, data) {

              // only run 1 time, first time when root folder jstree complete loaded
              pre_select_folder_level()

          })


          // create the instance $('#xxxx_div').jstree({ })
          .jstree({ 
              

              /**/
              // - - - filter layer list  - - - 
              /**/

                      // doc https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches_children
                      'search': {
                          // sample https://codepen.io/JGSpark/pen/VNeRLN
                          'fuzzy': false, // default is false,
                          'case_sensitive': false, // default,
                          // Indicates if the tree should be filtered (by default) to show only matching nodes
                          'show_only_matches' : true, //false, 
                          //Indicates if the children of matched element are shown (when show_only_matches is true)
                          'show_only_matches_children': true, //false,
                          //Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. 
                          'close_opened_onclear': false,   // Default is true,
                          // Indicates if only leaf nodes should be included in search results
                          'search_leaves_only' : false, // default,
                      },
                      "plugins" : [ "search" ], // not use "wholerow", it will make line icon disappear 
              
              /**/
              // ... end ...  - - - filter layer list  - - -
              /**/
              
              
              'core' : {

                                  'themes': {
                                      'name': 'proton',
                                      'responsive': true
                                  },
                          

                              'data' : root_allfolders_flatjson





                      } 


          });
                                                          
                

      }


  

          /**/
          // - - - filter layer list  - - - 
          /**/

          // folder
          var filterfolderList_by_keyword
          async function filter_folderList_now(event){
            
            filterfolderList_by_keyword = $('#filter_folder_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('filterfolderList now keyword ...  ', filterfolderList_by_keyword)
            if ($('#poi_categories').jstree(true)){
                $('#poi_categories').jstree(true).search(filterfolderList_by_keyword);
            }
            
          }
          function show_all_folder_list(){
            
            filterfolderList_by_keyword = ''
            $("#filter_folder_list_by").val(filterfolderList_by_keyword)
            console.log('show all folder list now, you clicked clear button . . .  ', filterfolderList_by_keyword)
            
            
              update_url_parameter('select_folder_id', '');
              update_url_parameter('select_folder_text', '');
              update_url_parameter('select_folder_alias', '');;

            
            
            
            if ($('#poi_categories').jstree(true)){
                
                // when user click and select a item, undo select
                $('#poi_categories').jstree('deselect_all');

                // when user type keyword in search bar, highlight some results in red, undo search
                $('#poi_categories').jstree(true).clear_search();
            }

          
          }

          /**/
          // ... end ...  - - - filter layer list  - - -
          /**/
             


            // ****** pre select by url param  ****** 
              var selected_folderLevel_id;
              var selected_folderLevel_text;
              var selected_folderLevel_alias;

              function  pre_select_folder_level(){

                          // Do NOT re-create instance of url params, use first time, filter by=xxx  as records
                          urlParams = new URLSearchParams(window.location.search);

                              selected_folderLevel_id = urlParams.get('select_folder_id');
                              selected_folderLevel_text = urlParams.get('select_folder_text');
                              selected_folderLevel_alias = urlParams.get('select_folder_alias');
                              
                              
                              console.log('pre selected folder id ',  selected_folderLevel_id)
                              console.log('pre selected folder text ',  selected_folderLevel_text)
                              console.log('pre selected folder alias ',  selected_folderLevel_alias)




                              // node id may not be true, if new item has been added to arcgis server, node text is always true, 
                              // node text is raw html, including html sup tag, + plus sign, but no need to clean up, just use it as is 
                              if ((selected_folderLevel_alias == undefined) || (selected_folderLevel_alias == null) || (selected_folderLevel_alias == '')){
                                      // select folder alias is null, undefined, nothing to do, just use node id
                              }else {
                                      // select folder text should overwrite node id, get real node id by node text
                                      // get existing jstree flat json https://groups.google.com/g/jstree/c/nn7GPC43WpA
                                      var rootFolderFlatJsonData = $('#poi_categories').jstree(true).get_json('#', {no_state:true,flat:true})
                                      console.log('pre select ,  root Folder Flat Json Data',  rootFolderFlatJsonData)
                                      
                                      for (let i = 0; i < rootFolderFlatJsonData.length; i++) {
                                          if(rootFolderFlatJsonData[i]['alias'] == selected_folderLevel_alias){
                                              selected_folderLevel_id = rootFolderFlatJsonData[i]['id']
                                              console.log('find new real node id ',  selected_folderLevel_id)
                                          }//if
                                      }//for

                              }//if



  
                              if ((selected_folderLevel_id == undefined) || (selected_folderLevel_id == null) || (selected_folderLevel_id == '')){
  
                                  // select folder is null, undefined, nothing to select
                              }else {
  
                                  console.log('selected_folderLevel_id',  selected_folderLevel_id)
                                  selectFolderLevelItem(selected_folderLevel_id)
                              }



              }

              // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
              function selectFolderLevelItem(folderLevel_id){

                  console.log(' **** select folder level id is  ***** ', folderLevel_id )
                  console.log(' **** select folder level id is  ***** ', $('#poi_categories').jstree(true) )
                  $('#poi_categories').jstree().deselect_all(true);    // true means not trigger change.jstree event
                  $('#poi_categories').jstree(true).select_node(folderLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                  //$('#poi_categories').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

              }      
            // ******  end   ******  pre select by url param  ****** 
            /**/
                      


          

          




            function init_category_list_ui(){

                      $("#filter_folder_list_by").on('keyup', filter_folderList_now);
                      $('#clear_filter_folder_list_button').on('click', show_all_folder_list);  
  
                      $("#collapse_button_folder").on('click',function(){
                        if ($('#poi_categories').jstree(true)){
                            $('#poi_categories').jstree('close_all');
                        }
                      }); 
  
                      $("#expand_button_folder").on('click',function(){
                          if ($('#poi_categories').jstree(true)){
                              $('#poi_categories').jstree('open_all');
                          }
                      }); 



                        //  - - - when user click x at end of search bar(input type=search)  - - -
                        // so no need filter by button, clear button
                        $('#filter_folder_list_by').on('search', function(event) {
                            if ($('#filter_folder_list_by').val().trim().toLowerCase()){
                                filter_folderList_now()
                            } else {
                                // empty
                                show_all_folder_list()
                            }
                        });
                        //  - - -  end  - - - when user click x at end of search bar(input type=search)   - - -



            }
                 
  
  
  









          