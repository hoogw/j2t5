
 

var input_current       // whole array of json, without filter, 
 var current_filter_result_count;
var __total_item_count;

 
      
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
                                                  _open_link = _link_protocol + "//" + window.location.host + '/json2tree/esri/server/folder2.html?url=' +  _results[i].ArcGIS_url + '&org=' + encoded_naming_scheme
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
                  
        
        
        
        


/**/
//  --- category   --- 
/**/
                          function show_current(_current_showing) {
                                                                                                  
                                         current_filter_result_count = _current_showing.length
                                         
                                         //$('#counter_label').html( '<span class="orange-text">&nbsp;' + current_filter_result_count + "</span>" + ' / ' + '<span class="green-text">' + __total_item_count + "&nbsp;</span>");  
                                         display_count_info('', current_filter_result_count, __total_item_count, 'counter_label')
                                       
                                         rendering_json_to_html(_current_showing)
                
                                         // reset scroll position to 0, means top 
                                         $("#json-renderer").scrollTop(0);
                          }
                
/**/
//  --- end  ---  category    --- 
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
            show_current(input_current)
           


            /**/
            //  --- category   --- 
            /**/
        
              // by default root category, input current means all 
              categorized_inputCurrent_array = input_current
              build_category(input_current)

              // expand collaps button
              ui_event_register()

            /**/
            //  --- end  ---  category    --- 
            /**/






                
          }






          function errorFn(err, file)
          {
            end = now();
            console.log("ERROR:", err, file);

            
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

  






/**/
//  --- category   --- 
/**/



              /* bootstrap 3 icon

                          bootstrap icon :  https://getbootstrap.com/docs/3.3/components/
                          https://icons.getbootstrap.com/
                          https://glyphicons.bootstrapcheatsheets.com/
              */

              var folder_icon = "glyphicon glyphicon-folder-open text-secondary";
              var open_new_tab_icon = "glyphicon glyphicon-new-window text-primary";
              var fieldNameAlias_icon = "bi bi-cloud-moon glaucous";
                          var fieldName_icon = "bi bi-cloud-sun glaucous";
                          var displayfieldName_icon = "bi bi-cloud-sun-fill glaucous";
                          var fieldType_icon = "bi bi-box glaucous";
                          var fieldDomain_icon = "bi bi-droplet-half glaucous";
              var mapservice_icon = "glyphicon glyphicon-cog text-secondary";
              var layer_icon = "glyphicon glyphicon-picture text-secondary";
              var table_icon = "glyphicon glyphicon-list-alt text-secondary";

              // -- end ---  bootstrap 3 icon

            var federal_owner_array = []
            var state_owner_array = []
           
            var county_owner_array = []
            var city_owner_array = []
            var other_owner_array = []

            var folder_structure_flatjson = []


            var _topmenu = { "Federal":{tree_id: 1},
                              "State":{tree_id: 2},
                              "County":{tree_id: 3},
                              "City":{tree_id: 4},
                              "Others":{tree_id: 9}
                            }
            






            function build_category(all_array_of_json){

              

              // top menu id 0 - 9, other is 9.. so counter start from 10
              var id_counter = 10;
              var current_parent_id_counter=0;
              var flatJson_item; 
              var server_owner_name
              var state_name
              var county_name
              var city_name

              // ********* add root item *********

                                                            
              flatJson_item =  { 
                // "id" : id_counter.toString(), 
                "id" : 0, 
                "parent" : "#",   // root parent id is #
                "text" : "Root",    // without count
                "icon" : folder_icon,
                "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                                },
                "type" : "root"
                                                                    
              };                                              
              folder_structure_flatjson.push(flatJson_item) 





              // ********* add top menu item *********
              for (const [key, value] of Object.entries(_topmenu)) {

                flatJson_item =  { 
                    "id" : value.tree_id,
                    "parent" : 0,   // root parent id is #
                    "text" : key,    // without count
                    "icon" : folder_icon,
                    "state"       : {
                                        "opened"    : false,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                    "type" : "top_menu"
                };
                // add folder item
                folder_structure_flatjson.push(flatJson_item) 
              } // for
              // ********* end ********** add top menu item *********



              // - - - add federal item  - - -

              // federal id is 1
              current_parent_id_counter = _topmenu["Federal"].tree_id

              for (var i = 0; i < input_current.length; ++i) {

                if (Number(input_current[i].Type) == 1){

                  server_owner_name = input_current[i].Server_owner
                  

                  if (federal_owner_array.includes(server_owner_name)){
                  // already exist, nothing to do
                  }else{

                    // add item

                    id_counter += 1;

                    flatJson_item =  { 
                        "id" : id_counter,
                        "parent" : current_parent_id_counter,   // root parent id is #
                        "text" :server_owner_name,    // without count
                        "icon" : mapservice_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                        "type" : "federal_owner"
                    };
                    // add folder item
                    folder_structure_flatjson.push(flatJson_item) 

                    federal_owner_array.push(server_owner_name)
                  }//if

                }//if

              }//for


              // - - -  end    - - - add federal item  - - -




              // - - - add state item  - - -

              // state id is 2
              current_parent_id_counter = _topmenu["State"].tree_id

              for (var i = 0; i < input_current.length; ++i) {

                if ((input_current[i].Type == 2)
                    && !(input_current[i].County)
                    && !(input_current[i].Town)
                ){

                  state_name = input_current[i].State
                  

                  if (state_owner_array.includes(state_name)){
                  // already exist, nothing to do
                  }else{

                    // add item

                    id_counter += 1;

                    flatJson_item =  { 
                        "id" : id_counter,
                        "parent" : current_parent_id_counter,   // root parent id is #
                        "text" : state_name,    // without count
                        "icon" : mapservice_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                        "type" : "state_owner"
                    };
                    // add folder item
                    folder_structure_flatjson.push(flatJson_item) 

                    state_owner_array.push(state_name)
                    
                  }//if

                }//if

              }//for


              // - - -  end    - - - add state item  - - -





 // - - - add county item  - - -

              // county id is 3
              current_parent_id_counter = _topmenu["County"].tree_id

              for (var s = 0; s < state_owner_array.length; ++s) {
           

                    state_name = state_owner_array[s]

                    id_counter += 1;

                    flatJson_item =  { 
                        "id" : id_counter,
                        "parent" : current_parent_id_counter,   // root parent id is #
                        "text" : state_name,    // without count
                        "icon" : folder_icon,
                        "state"       : {
                                            "opened"    : false,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                        "type" : "county_parent_state"
                    };
                    // add folder item
                    folder_structure_flatjson.push(flatJson_item) 

                    county_owner_array = []
                    var county_parent_state_treeID = id_counter

                    for (var i = 0; i < input_current.length; ++i) {

                      if ((input_current[i].Type == 2)
                          && (input_current[i].State == state_name)
                          && (input_current[i].County)
                          && !(input_current[i].Town)
                      ){

                        county_name = input_current[i].County
                        

                        if (county_owner_array.includes(county_name)){
                        // already exist, nothing to do
                        }else{

                          // add item

                          id_counter += 1;

                          flatJson_item =  { 
                              "id" : id_counter,
                              "parent" : county_parent_state_treeID,   // root parent id is #
                              "text" : county_name,    // without count
                              "icon" : mapservice_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              },
                              "parent_name" :  state_name,              
                              "type" : "county_owner"
                          };
                          // add folder item
                          folder_structure_flatjson.push(flatJson_item) 

                          county_owner_array.push(county_name)
                        }//if

                      }//if

                    }//for


               }//for state loop of county

              // - - -  end    - - - add county item  - - -







              
 // - - - add city item  - - -

              // city id is 3
              current_parent_id_counter = _topmenu["City"].tree_id

              for (var s = 0; s < state_owner_array.length; ++s) {
           

                    state_name = state_owner_array[s]

                    id_counter += 1;

                    flatJson_item =  { 
                        "id" : id_counter,
                        "parent" : current_parent_id_counter,   // root parent id is #
                        "text" : state_name,    // without count
                        "icon" : folder_icon,
                        "state"       : {
                                            "opened"    : false,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                        "type" : "city_parent_state"
                    };
                    // add folder item
                    folder_structure_flatjson.push(flatJson_item) 


                    city_owner_array = []
                    var city_parent_state_treeID = id_counter

                    for (var i = 0; i < input_current.length; ++i) {

                      if ((input_current[i].Type == 2)
                          && (input_current[i].State == state_name)
                          && !(input_current[i].County)
                          && (input_current[i].Town)
                      ){

                        city_name = input_current[i].Town
                        

                        if (city_owner_array.includes(city_name)){
                        // already exist, nothing to do
                        }else{

                          // add item

                          id_counter += 1;

                          flatJson_item =  { 
                              "id" : id_counter,
                              "parent" : city_parent_state_treeID,   // root parent id is #
                              "text" : city_name,    // without count
                              "icon" : mapservice_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              },
                              "parent_name" :  state_name,              
                              "type" : "city_owner"
                          };
                          // add folder item
                          folder_structure_flatjson.push(flatJson_item) 

                          city_owner_array.push(city_name)
                        }//if

                      }//if

                    }//for


               }//for state loop of city

              // - - -  end    - - - add city item  - - -







              // - - - add other item  - - -

              // other id is 9
              current_parent_id_counter = _topmenu["Others"].tree_id

              for (var i = 0; i < input_current.length; ++i) {

                if (input_current[i].Type == 3){

                  server_owner_name = input_current[i].Server_owner
                  

                  if (other_owner_array.includes(server_owner_name)){
                  // already exist, nothing to do
                  }else{

                    // add item

                    id_counter += 1;

                    flatJson_item =  { 
                        "id" : id_counter,
                        "parent" : current_parent_id_counter,   // root parent id is #
                        "text" : server_owner_name,    // without count
                        "icon" : mapservice_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                        "type" : "other_owner"
                    };
                    // add folder item
                    folder_structure_flatjson.push(flatJson_item) 

                    other_owner_array.push(server_owner_name)
                  }//if

                }//if

              }//for


              // - - -  end    - - - add state item  - - -

              jstree_toplevel_menu(folder_structure_flatjson)

            }



              function jstree_toplevel_menu(topLevel_flatjson){

                console.log(" jstree topMenu  flat json feed : ", topLevel_flatjson)

                $('#jstree_topMenu')
                                    
            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
            // not use these 2 line, Because they will NOT fire event, if you click a already selected node, it only fire event if selected node changed.
            //.on('select_node.jstree', function (e, data) {
            //.on('changed.jstree', function (e, data) {
            // if you want to always fire event, even on a already selected node, use this line 
            .on('activate_node.jstree', function (e, data) {


                                        console.log(' click select menu node, event ', data)
                                        var i, j, _selected_text = [], _selected_id = [], _selected_type = [];

                                        var _selected_parent_name = []

                                        for(i = 0, j = data.selected.length; i < j; i++) {
                                            _selected_text.push(data.instance.get_node(data.selected[i]).text);
            _selected_relative_path.push(data.instance.get_node(data.selected[i]).original.relative_path);
                                            _selected_id.push(data.instance.get_node(data.selected[i]).id);
                                            // must use .original.type, because re-structured json does not carry our customized field 'type'
                                            _selected_type.push(data.instance.get_node(data.selected[i]).original.type);


                                            _selected_parent_name.push(data.instance.get_node(data.selected[i]).original.parent_name);
                                        }


                                        // only get 1st selected node, so always use    _selected_xxxxx[0] 

                                        //$('#event_result').html('Selected: ' + r.join(', '));
                                        console.log('Selected node id : ' + _selected_id[0])
                                        console.log('Selected node text : ' +  _selected_text[0])
        console.log('Selected node relative path : ' +  _selected_relative_path[0])
                                        console.log('Selected node parent name : ' +  _selected_parent_name[0])
                                        console.log('Selected node type : ' +  _selected_type[0])

                                        


                                        update_url_parameter('select_menu', _selected_id[0]);
                                        
                                        categorized_inputCurrent_array = []

                                        switch(_selected_type[0]) {


                                            case "root":
                                                        console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                        $("#category_label").html(_selected_text[0])

                                                        show_current(input_current)
                                                            
                                                        break;
                                        
                                            case "top_menu":

                                                              console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                              $("#category_label").html(_selected_text[0])

                                                            
                                                                switch (_selected_text[0]) {

                                                                  case "Federal":
                                                                                console.log('only federal owner')
                                                                                for (var i = 0; i < input_current.length; ++i) {
                                                                                  if (input_current[i].Type == 1){
                                                                                    categorized_inputCurrent_array.push(input_current[i])
                                                                                  }
                                                                                }//for
                                                                                console.log('only federal owner', categorized_inputCurrent_array)
                                                                                show_current(categorized_inputCurrent_array)
                                                                                break;



                                                                  case "State":
                                                                                console.log('only state owner')
                                                                                for (var i = 0; i < input_current.length; ++i) {
                                                                                  if ((input_current[i].Type == 2)
                                                                                      && !(input_current[i].County)
                                                                                      && !(input_current[i].Town)
                                                                                  ){
                                                                                    categorized_inputCurrent_array.push(input_current[i])
                                                                                  }
                                                                                }//for
                                                                                console.log('only state owner', categorized_inputCurrent_array)
                                                                                show_current(categorized_inputCurrent_array)
                                                                                break;




                                                                  case "County":

                                                                                  console.log('only county owner')
                                                                                  for (var i = 0; i < input_current.length; ++i) {
                                                                                    if ((input_current[i].Type == 2)
                                                                                        && (input_current[i].County)
                                                                                        && !(input_current[i].Town)
                                                                                    ){
                                                                                      categorized_inputCurrent_array.push(input_current[i])
                                                                                    }
                                                                                  }//for
                                                                                  console.log('only state owner', categorized_inputCurrent_array)
                                                                                  show_current(categorized_inputCurrent_array)
                                                                                  break;


                                                                  case   "City":


                                                                                  console.log('only city owner')
                                                                                  for (var i = 0; i < input_current.length; ++i) {
                                                                                    if ((input_current[i].Type == 2)
                                                                                        && !(input_current[i].County)
                                                                                        && (input_current[i].Town)
                                                                                    ){
                                                                                      categorized_inputCurrent_array.push(input_current[i])
                                                                                    }
                                                                                  }//for
                                                                                  console.log('only state owner', categorized_inputCurrent_array)
                                                                                  show_current(categorized_inputCurrent_array)
                                                                                  break;


                                                                  case   "Others":

                                                                                    console.log('only other owner')
                                                                                    for (var i = 0; i < input_current.length; ++i) {
                                                                                      if (input_current[i].Type == 3){
                                                                                        categorized_inputCurrent_array.push(input_current[i])
                                                                                      }
                                                                                    }//for
                                                                                    console.log('only other owner', categorized_inputCurrent_array)
                                                                                    show_current(categorized_inputCurrent_array)
                                                                                    break;






                                                                  default:
                                                                    console.log(`Sorry, we are out of ${expr}.`);
                                                                }// switch

                                                            
                                                              
                                                            
                                                          
                                                      break;



                                            case "federal_owner":
                                                                    console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                                    $("#category_label").html(_selected_text[0])

                                                                    for (var i = 0; i < input_current.length; ++i) {
                                                                      server_owner_name = input_current[i].Server_owner
                                                                      if (server_owner_name == _selected_text[0]){
                                                                        categorized_inputCurrent_array.push(input_current[i])
                                                                      }//if
                                                                    }//for

                                                                    
                                                                    show_current(categorized_inputCurrent_array)

                                                        
                                                    break;


                                            case "state_owner":
                                                      console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                      $("#category_label").html(_selected_text[0])

                                                      for (var i = 0; i < input_current.length; ++i) {
                                                        state_name = input_current[i].State
                                                        if ((state_name == _selected_text[0])
                                                            && !(input_current[i].County)
                                                            && !(input_current[i].Town)
                                                        ){
                                                          categorized_inputCurrent_array.push(input_current[i])
                                                        }//if
                                                      }//for

                                                      
                                                      show_current(categorized_inputCurrent_array)

                                          
                                            break;



                                            case "county_owner":
                                                      console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0], _selected_parent_name[0])
                                                      $("#category_label").html(_selected_text[0])

                                                      for (var i = 0; i < input_current.length; ++i) {
                                                        state_name = input_current[i].State
                                                        if ((state_name == _selected_parent_name[0])
                                                            && (input_current[i].County == _selected_text[0])
                                                            && !(input_current[i].Town)
                                                        ){
                                                          categorized_inputCurrent_array.push(input_current[i])
                                                        }//if
                                                      }//for

                                                      
                                                      show_current(categorized_inputCurrent_array)

                                          
                                            break;


                                            case "county_parent_state":
                                                      console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                      $("#category_label").html(_selected_text[0])

                                                      for (var i = 0; i < input_current.length; ++i) {
                                                        state_name = input_current[i].State
                                                        if ((state_name == _selected_text[0])
                                                            && (input_current[i].County)
                                                            && !(input_current[i].Town)
                                                        ){
                                                          categorized_inputCurrent_array.push(input_current[i])
                                                        }//if
                                                      }//for

                                                      
                                                      show_current(categorized_inputCurrent_array)

                                          
                                            break;







                                            case "city_owner":
                                                      console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0], _selected_parent_name[0])
                                                      $("#category_label").html(_selected_text[0])

                                                      for (var i = 0; i < input_current.length; ++i) {
                                                        state_name = input_current[i].State
                                                        if ((state_name == _selected_parent_name[0])
                                                            && !(input_current[i].County)
                                                            && (input_current[i].Town == _selected_text[0])
                                                        ){
                                                          categorized_inputCurrent_array.push(input_current[i])
                                                        }//if
                                                      }//for

                                                      
                                                      show_current(categorized_inputCurrent_array)

                                          
                                            break;


                                            case "city_parent_state":
                                                      console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                      $("#category_label").html(_selected_text[0])

                                                      for (var i = 0; i < input_current.length; ++i) {
                                                        state_name = input_current[i].State
                                                        if ((state_name == _selected_text[0])
                                                            && !(input_current[i].County)
                                                            && (input_current[i].Town)
                                                        ){
                                                          categorized_inputCurrent_array.push(input_current[i])
                                                        }//if
                                                      }//for

                                                      
                                                      show_current(categorized_inputCurrent_array)

                                          
                                            break;






                                            case "other_owner":
                                                      console.log(' render node ', _selected_text[0], _selected_type[0], _selected_id[0])
                                                      $("#category_label").html(_selected_text[0])

                                                      for (var i = 0; i < input_current.length; ++i) {
                                                        server_owner_name = input_current[i].Server_owner

                                                        if (server_owner_name == _selected_text[0]){
                                                          categorized_inputCurrent_array.push(input_current[i])
                                                        }//if
                                                      }//for

                                                      
                                                      show_current(categorized_inputCurrent_array)

                                          
                                            break;
                                                            
                                        }
                                        
                                    






                                    })




                                    // 'ready.jstree' triggered after all nodes are finished loading
                                    // 'loaded.jstree' , triggered after the root node is loaded for the first time
                                    .on('ready.jstree', function (e, data) {

                                        // only run 1 time, first time when root folder jstree complete loaded
                                        pre_select_menu_level()

                                    })


                                    // create the instance $('#xxxx_div').jstree({ })
                                    .jstree({ 
                                        
                                        
                                        
                                        'core' : {

                                                            'themes': {
                                                                'name': 'proton',
                                                                'responsive': true
                                                            },
                                                    

                                                        'data' : topLevel_flatjson





                                                } 


                                    });

                

                                


            }






            var selected_menuLevel_id;
            function  pre_select_menu_level(){

                        // must create instance of url params, use first time, filter by=xxx  as records (do not use init global var)
                        urlParams = new URLSearchParams(window.location.search);

                            selected_menuLevel_id = urlParams.get('select_menu');
                        
                            
                        
                        


                            if ((selected_menuLevel_id == undefined) || (selected_menuLevel_id == null) || (selected_menuLevel_id == '')){

                                // select menu is null, undefined, nothing to select
                            }else {

                                console.log('selected_menuLevel_id',  selected_menuLevel_id)
                                selectMenuLevelItem(selected_menuLevel_id)
                            
                            
                            }



            }




            function selectMenuLevelItem(menuLevel_id){

              console.log(' **** select menu level id is  ***** ', menuLevel_id )
              console.log(' **** select menu level id is  ***** ', $('#jstree_topMenu').jstree(true) )
              $('#jstree_topMenu').jstree().deselect_all(true);    // true means not trigger change.jstree event
              $('#jstree_topMenu').jstree(true).select_node(menuLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
            
          }


          // collapse expand button
          function ui_event_register(){

            $("#collapse_button_topMenu").click(function(){
                
                $('#jstree_topMenu').jstree('close_all');

            }); 

            $("#expand_button_topMenu").click(function(){

                $('#jstree_topMenu').jstree('open_all');
                
            }); 


          }

/**/
//  --- end  ---  category    --- 
/**/



  
  
  
  
  (function($){
              
               init_global_var()
               // reverse title = _org at init-global-var ..... still need to keep it here
               document.getElementById("title").innerHTML = "Joseph Elfelt's List";
               
             

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
