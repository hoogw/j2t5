






    var container
    var options
    var editor
    
    
    

    var _timeout = 60000;


    var _where_condition
               
    var ___url_getJson     
    

    var _total_count_of_feature = -1
    var _current_count_of_feature = -1



/**/

  //   *****  classified , filter by     *****





          var folder_icon = "glyphicon glyphicon-folder-open text-secondary";
          var open_new_tab_icon = "glyphicon glyphicon-new-window text-primary";
          var mapservice_icon = "glyphicon glyphicon-cog text-secondary";
          var layer_icon = "glyphicon glyphicon-picture text-secondary";
          var table_icon = "glyphicon glyphicon-list-alt text-secondary";

          var field_alias = {} 
                    var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
          var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
          var field_value = []
          var flatJson_item
          var fieldValue_flatjson
          var field_structure_flatjson = []



          var current_selected_field_type = 'text' // Number, more at https://dev.socrata.com/docs/datatypes/#,
          var current_selected_field_name = 'showall'
          var current_selected_field_value = 'showall'







  //   *****  end     *****   classified , filter by     *****  



/**/

  


 							  

 							   /**/
                  //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                  /**/

                                          // for 0 only, from 430, add 'orderby' radio
                                          var _orderby_count_or_value = 'orderby_count'  // default,   'orderby_value' 
                                          

                                          // for 400,430, 0 only, hybrid groupby+distinct
                                          var _distinct_or_groupby = 'groupby'    // default,    "groupby" or "distinct"
                                          var _url_distinctFieldValue_distinct 
                                          var _url_distinctFieldValue_groupby

                                          // url have 2 cases, distinct or group-by
                                          var _url_distinctFieldValue  // for 100,200,300 only

                                          function orderby_count_or_value_change_handler(){

                                            console.log( ' ------ * * * ------ * * *  _orderby_count_or_value  * * *  ------ * * *  ------',  _orderby_count_or_value)
                                            console.log( '  ------* * *  ------ * * *  _distinct_or_groupby  * * * ------ * * *  ------',  _distinct_or_groupby)
                                            console.log('orderby_count_or_value_change_handler,   current_selected_field_name, current_selected_field_name_tag_id  ',  current_selected_field_name, current_selected_field_name_tag_id)

                                            if ((current_selected_field_name == 'showall') || (current_selected_field_name_tag_id < 0)){
                                              console.log('you have not select any field name, change order-by does not make sense, does not do anything', )
                                            } else {
                                              build_value_list(current_selected_field_name, current_selected_field_name_tag_id)
                                            }
                                  

                                }


                  /**/
                  //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                  /**/





           //.............search layers section (arcgis rest api).............

                            //------------ search feature --------
                            var _feature_attributes =[];
                            var _feature_attributes_string =[];
                            var _feature_attributes_integer =[];
                            var _feature_attributes_double =[];
                            var _feature_attributes_date =[];
                            //---------  End --- search feature --------



  /* 


                         "supportsAdvancedQueries": true, 


                          advancedQueryCapabilities:
                                                  supportsCountDistinct: true
                                                  supportsDistinct: true
                                                  supportsHavingClause: true
                                                  supportsOrderBy: true
                                                  supportsPagination: true
                                                  supportsQueryWithDistance: true
                                                  supportsReturningQueryExtent: true
                                                  supportsSqlExpression: true
                                                  supportsStatistics: true
                                                  supportsTrueCurve: true
                                                  useStandardizedQueries: true
                    */

                                                  var _supportsAdvancedQueries  = false;

                                                  var _supportsCountDistinct  = false;
                                                  var _supportsDistinct = false;
                                                  var _supportsHavingClause = false;
                                                  var _supportsOrderBy = false;
                                                  var _supportsPagination = false;
                                                  var _useStandardizedQueries = false;
                                                  var _supportsStatistics = false;
                                                  var _supportsTrueCurve = false;
                                                  var _supportsReturningQueryExtent = false;
                                                  var _supportsQueryWithDistance = false;
                                            
                              
                              
                              
                              



                //=================== search button click =========================

               












                




                function search_message(__message_content){
                                                  

                  document.getElementById('message_div').innerHTML = __message_content;
                  $(".progress").hide(); 

                  
            }


          
          //==========  End  ========== search button click =========================









                                                  
                              
                            
/**/


                  
                      
          
                      
                      




                            // modified from get feature attribute
                            function parse_feature_attributes(_fields_array){

                              

                                            if (_fields_array !== undefined){


                                                  _feature_attributes = _fields_array

                                                  var arrayLength = _feature_attributes.length;
                                                  for (var i = 0; i < arrayLength; i++) {

                                                        var _type = _feature_attributes[i].type
                                                        var _field = _feature_attributes[i].name

                                                        if (_type == 'esriFieldTypeString'){

                                                              _feature_attributes_string.push(_field)
                                                        }
                                                              else if ((_type == 'esriFieldTypeInteger') || (_type == 'esriFieldTypeDouble') || (_type == 'esriFieldTypeSmallInteger')){

                                                                              _feature_attributes_integer.push(_field)
                                                                          }// if

                                                    }// for

                                                    console.log('_feature_attributes_string --- ',_feature_attributes_string)
                                                    console.log('_feature_attributes_integer --- ',_feature_attributes_integer)


                                                  }       
                                                

                        } 












          //.............search layers section (arcgis rest api).........  End ....
  
  
  





          /**/





          


// --------------------- total count ------------------------




/**/





          // table only, classified only (use message_label)
          function display_count_info(_subject, ___showing_cnt, ___all_cnt){

            var _percentage_html = ''
            var _percentage_float, _percentage_integer, _percentage_decimal;
            
            if ((___showing_cnt > 0) && (___all_cnt > 0)) {
              _percentage_float = (100 * ___showing_cnt) / ___all_cnt
              _percentage_integer = Math.floor(_percentage_float);
              _percentage_decimal = (_percentage_float.toFixed(3)).split(".")[1]

               // in use, simple number as :  50.987%
               _percentage_html =   '<h6 style="display: inline;"><mark>' 
               _percentage_html +=        '<b>' + _percentage_integer +  '</b>'   
               _percentage_html +=        '.' 
               _percentage_html +=        '<sup><small>' + _percentage_decimal + '</small></sup>' 
               _percentage_html +=        '%' 
               _percentage_html +=   '</mark></h6>'
            }

            var _html_for_layer_link = '<a target="_blank" title="' + _url + '" href="' + _url + '"><h1 style="display:inline;">' + _subject + '</h1></a>' + '</br>' + '<a target="_blank" title="' + _url + '" href="' + _url + '"><sup><small>' + _url + '</small></sup></a>' + '</br>' 
                
            var _html_for_count =   '<h1 style="display: inline;"><mark><big>' + ___showing_cnt + '</big></mark>' 
                _html_for_count +=    '/' 
                _html_for_count +=       '<sup><small>' + ___all_cnt +'</small></sup>'    
                _html_for_count +=         '</h1>' + '&nbsp;&nbsp;' + _percentage_html

            document.getElementById('message_label').innerHTML =   _html_for_count + '&nbsp;&nbsp;&nbsp;&nbsp;' +  _html_for_layer_link ;
          }






         


               // only for total count ,
                  function get_count(__raw_count){

                      
                                                    
                  //{ 'count': 1661}

                  // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                  //is already a plain JavaScript object; no need to try to parse it.
                  var data_count
                  if (typeof __raw_count === 'object') {
                      // is object
                      data_count = __raw_count.count
                  } else {
                      // is string
                      data_count = JSON.parse(__raw_count).count
                  }
                
                  return data_count

                }










            






                async function get_total_count(){

                              
                  // use where=1=1 ,  will get total count only ,   (where=FID>0 , where=objectid>0 also can, but not every layer have FID or objectid, you could run into error if layer do not have FID, or objectid) 
                  //var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&where=1=1';
                  
                   /*
                                         https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
       
                                         only works from 10.8.1, 
                                         but if 10.7 or lower, no error, just not fast, same as where=1=1
       
                                           Non-hosted feature services published from ArcGIS Pro support an optimization for getting a layer's row count. 
                                           By setting where as 9999=9999 and returnCountOnly as true, the result is an approximate count that is returned very quickly. 
                                           For accurate, but slower to return, row counts, use any other filter (e.g. where: 1=1). 
                                           This is only supported when a layer has both isDataVersioned and isDataArchived as false.
                   */ 
                  var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&where=9999=9999';
                  
       
                  var _total_count_result_json
                       
       
                             
                             _total_count_result_json = await ajax_cross_origin(_url_total_countonly,  _cross);
       
                              
       
                             console.log('try get total count, success ', _total_count_result_json);
                                     
                             _total_count_of_feature = get_count(_total_count_result_json)
       
         
                                       console.log(' _real_total_count ',  _total_count_of_feature);
                                       
                                       display_count_info(_layer, _current_count_of_feature, _total_count_of_feature) 
                                     
                           
       
       
           }   
       
       








// ---------- end ----------- total count ------------------------







/**/
// -------------- layout style  --------------
/**/

        
          var _layout_style = 'horizontal_card'

          function change_layout_style(___LayoutStyle){
            switch(___LayoutStyle) {
       
              case 'horizontal_card':
                $("#jsoneditor").hide();
                $("#card-toggle-container").show();
                // change each item class to Horizontal
                $( ".block_vertical").attr("class", "block_horizontal z-depth-5 hoverable");
      
                break;
      
              case 'vertical_card':
                $("#jsoneditor").hide();
                $("#card-toggle-container").show();
                 // change each item class to vertical
                 $( ".block_horizontal").attr("class", "block_vertical z-depth-5 hoverable");
      
                break;
      
              case 'text_only':
                $("#jsoneditor").show();
                $("#card-toggle-container").hide();
                                  
                break;
      
              default:
                // code block
            }// switch
          }

          function init_card_toggle(){
       
           var param_layout_style = urlParams.get('layoutstyle');
           if (param_layout_style){
             _layout_style = param_layout_style
                 console.log('from url param _layout_style ', _layout_style)
           }
       
           // first time set radio
           $("input[type=radio][name=layout_style_radio][value=" + _layout_style + "]").prop('checked', true);
           change_layout_style(_layout_style)


           // radio change event
           $("input[type='radio'][name='layout_style_radio']").on('change', function(){

             _layout_style = $("input[type='radio'][name='layout_style_radio']:checked").val();
             console.log(" layout style  radio : --  ", _layout_style);
             update_url_parameter('layoutstyle', _layout_style);
             change_layout_style(_layout_style)
           });

         }

/**/
//  -------------- end  --------------  layout style   --------------
/**/







                  // only for classified version dataset4    there are 2 search key word, current_selected_field_value, current_selected_field_value2
                  function show_json_viewer(__json___,  ___name__ , __highlight_keywords____ ){



                    console.log(' ++++++++ show  ++++++++ json  ++++++++ viewer  ++++++++   highlightkeywords , ',   __highlight_keywords____ , __json___); 
                    
                    

                    // ------ for single-json editor only ---------------

                                            editor.set(__json___);
                                                  
                                            editor.expandAll();

                                            editor.setName(___name__)

                                            if (__highlight_keywords____){

                                              // for example key words have multiple words:   auto broker
                                              // must highlight each words
                                              
                                                
                                                var __keywords_array = []
                                                if (isNaN(__highlight_keywords____)) {
                                                  // string
                                                  __keywords_array = __highlight_keywords____.split(" ");
                                                } else {
                                                  // number
                                                  __keywords_array.push(__highlight_keywords____.toString())
                                                }


                                              // not use,  highlight last key word 
                                                        /*
                                                                  for (var k = 0; k < __keywords_array.length; k++) {
                                                                    
                                                                        var _each_keyword_item = __keywords_array[k].trim()
                                                                        


                                                                        // key word is url, failed to highlight, fix is highlight field name instead of url value
                                                                        if (current_selected_field_type.includes('url')) {
                                                                                console.log('  ###  highlight   ###   URL field name only   ### since URL value highlight failed   ', current_selected_field_name,  _each_keyword_item)
                                                                                editor.search(current_selected_field_name)
                                                                        } 

                                                                        if (current_selected_field_type2.includes('url')) {
                                                                                console.log('   --------  2 dimension     --------   ###  highlight   ###   URL field name only   ### since URL value highlight failed   ', current_selected_field_name,  _each_keyword_item)
                                                                                editor.search(current_selected_field_name2)
                                                                        } 



                    
                                                                                      
                                                                                                    

                                                                                        // highlight search keywords by 
                                                                                          //https://github.com/josdejong/jsoneditor/issues/364
                                                                                          //If in any other mode, like 'View' or 'Tree'
                                                                                        // editor.search(__highlight_keywords____)

                                                                                          //When using 'code' mode, 
                                                                                          //editor.aceEditor.find(__highlight_keywords____);



                                                                            console.log('  ###  highlight   ###   key    ###   word   ###  ',k,  _each_keyword_item)

                                                                          // highlight one key words use this one, but highlight 2 keywords do not use this   
                                                                          editor.search(_each_keyword_item)

                                                                          



                                                                  } // for
                                                  */

                                                    // double highlight system (1)
                                                    // only highlight first key word
                                                    editor.search(__keywords_array[0]) 
                                                    
                                            

                                                  // double highlight system (2)
                                                  // always show highlighted node via css class
                                                  // https://github.com/josdejong/jsoneditor/issues/1038
                                                  editor.refresh()      
                                                          

                                            } // if highlight 
                                            
                    // ------  end  ---------- for single-json editor only ---------------

/**/



      // build html for each card

      document.getElementById('card-toggle-container').innerHTML = '';

      _restructured_json = __json___

      var _properties_list;  //{OBJECTID	:	1 , GIS_ID	:	44832 }

      var i1
     

      for (var c = 0; c < _restructured_json.length; c++) {

                  _properties_list = _restructured_json[c];


                  // for marker number
                  i1 = c + 1  
             

                  // ========== create the Jsoneditor ===============

                  var search_result_card_div = document.createElement("div");

                 
                  // css class block_horizontal to control how many div in 1 row
                  search_result_card_div.className = "block_horizontal"


                  search_result_card_div.id = 'collection_item_' + i1.toString();

                  var search_result_item_div = document.createElement("div");
                 
                    
                  var search_result_item_options = {
                                                
                            modes:['view','tree','preview'],
                            mainMenuBar  : false,    // remove main menu bar
                            navigationBar : false,   // remove navigation bar
                            "search": false          // remove search box , default is true

                          };

                  var  editor_search_result_item = new JSONEditor(search_result_item_div, search_result_item_options);

                  editor_search_result_item.set(_properties_list);
                  editor_search_result_item.expandAll();
                  editor_search_result_item.setName(i1)


                                                      // ************ jsoneditor highlight keywords  ************ only for ************  editor search result item ************ 
                                                  
                                                                              
                                                                      console.log(' everytime highlight search key word, if any ....... ', __highlight_keywords____)
                                                                     
                                                                      
                                                                      var __keywords_array = []
                                                                      if (isNaN(__highlight_keywords____)) {
                                                                        // string
                                                                        __keywords_array = __highlight_keywords____.split(" ");
                                                                      } else {
                                                                        // number
                                                                        __keywords_array.push(__highlight_keywords____.toString())
                                                                      }

                                                                      
                                                                      for (var k = 0; k < __keywords_array.length; k++) {
                                                                        
                                                                                  var _each_keyword_item = __keywords_array[k].trim()
                                                                                  // console.log(' highlight each key word --> ', _each_keyword_item)

                                                                                  // highlight search keywords by 
                                                                                    //https://github.com/josdejong/jsoneditor/issues/364
                                                                                    //If in any other mode, like 'View' or 'Tree'
                                                                                  // editor.search(__highlight_keywords____)

                                                                                    //When using 'code' mode, 
                                                                                    //editor.aceEditor.find(__highlight_keywords____);
                                                                                    editor_search_result_item.search(_each_keyword_item)
                                                                                    
                                                                      }// for

                                                      // ************ end ********** jsoneditor highlight keywords  ************ 



                                                      // warning:  ESRI do not support 2 keyword cross different field. 
                                                                // double highlight system (2)
                                                                // always show highlighted node via css class
                                                                // https://github.com/josdejong/jsoneditor/issues/1038
                                                                editor_search_result_item.refresh() 





                  // ==========   End ======== create the Jsoneditor ===============



                  search_result_card_div.appendChild(search_result_item_div)
                  
                  var _collection_search_div = document.getElementById('card-toggle-container')
                  _collection_search_div.appendChild(search_result_card_div)
                  
                                      



                  // .......   ......   .....   dynamically change json editor color  .......   ......   .....  


                                                  /*
                                  
                                                      from 1 to n, dynamically change all item color in js
                                                        
                                                        #collection_item_1 div.jsoneditor-menu {
                                                          background-color:  rgba(255,255,255, .0); 
                                                          border: thin solid #9FE2BF;
                                                        }

                                                        #collection_item_1 div.jsoneditor {
                                                            border: thin solid #9FE2BF;
                                                        }




                                                            

                                                      <div class="collection-item" id="collection_item_2">
                                                            <div class="jsoneditor jsoneditor-mode-view"> 
                                                                  <div class="jsoneditor-menu"></div> 
                                                                  <div class="jsoneditor-navigation-bar nav-bar-empty"></div>
                                                                  <div class="jsoneditor-outer has-main-menu-bar has-nav-bar"></div>
                                                            </div>
                                                      </div>



                                                */

                                                // change border color 
                                                var _jsoneditor_node = search_result_item_div.childNodes[0]
                                                _jsoneditor_node.style.border = 'thick solid #9FE2BF'
                                          

                                              /* 
                                                    // not use, remove 2 node 'menu' and 'navigation', instead in option, use,    mainMenuBar  : true, navigationBar : false,
                                                    var _jsoneditor_menu_node = _jsoneditor_node.childNodes[0]
                                                    var _jsoneditor_navigation_bar = _jsoneditor_node.childNodes[1]
                                                    _jsoneditor_node.removeChild(_jsoneditor_menu_node)
                                                    _jsoneditor_node.removeChild(_jsoneditor_navigation_bar)
                                            
                                                    // change menu color 
                                                    _jsoneditor_menu_node.style.backgroundColor ='rgba(255,255,255, .0)'
                                                    _jsoneditor_menu_node.style.border ='thin solid #9FE2BF'

                                                */


                                // .......   ......   .....  end  .......   ......   ..... dynamically change json editor color  .......   ......   .....   





                              } // for property

                      

                  }









                      // only for classified version dataset4,   there are 1 search key word, current_selected_field_value
                      function init_json_viewer(){





                                      // inside nested function 
                                      function onClassName({ path, field, value }) {
                                        
                                        
                                       

                                               // console.log("  ######  onClassName   ######   call back   ######  path, field, value   ######   ", path, field, value )

                                                 
                                                 if (value == current_selected_field_value) {

                                                         // add class to highlight that node
                                                         //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                         return 'different_element'   // css must create class named "different_element"
                                                  
                                                } else {

                                                          //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                           return undefined
                                                }

                                                // In order to update css classes when they depend on external state, you can call editor.refresh().

                                      }






                                      function onSelectionChange(start, end) {
      
                                              console.log(' on selection change event   start, end :  ++++++++ ', start, end) 
                              
                              
                                        }
                                    
                                    
                                        function onEvent(node, event) {
                                    
                                        // console.log(' on  event: node, event ---->', node, event) 
                              
                              
                                        }
                        





                                        // ========== create the Jsoneditor ===============
                                        container = document.getElementById("jsoneditor");

                                        // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options

                                        // options = {sortObjectKeys:true};   // alphabetically sort object key, default is false
                                        options = {
                                          modes:['view','tree','preview'],
                                          mainMenuBar  : false,    // remove main menu bar
                                          navigationBar : false,   // remove navigation bar
                                          "search": false,          // remove search box , default is true

                                                                  onSelectionChange : onSelectionChange,
                                                                  onEvent: onEvent,


                                                                  // https://github.com/josdejong/jsoneditor/blob/develop/examples/20_custom_css_style_for_nodes.html
                                                                  //https://github.com/josdejong/jsoneditor/issues/1038
                                                                  onClassName: onClassName,

                                                                  /*
                                                                          onChangeJSON: function (j) {
                                                                            
                                                                            window.editor.refresh()
                                                                          }
                                                                  */

                                                  };





                                        editor = new JSONEditor(container, options);
                                        // ==========   End ======== create the Jsoneditor ===============



                          }

                          










              
                  // bootstrap only
                  function init_user_interface_event(){


    
                                   /**/
                                  //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                                  /**/
    
                                       // first time,  init 
                                        if (_orderby_count_or_value == 'orderby_count'){
                                          $('#orderby_count').attr('checked', true)
                                          $('#orderby_value').removeAttr('checked')
                                        } else if (_orderby_count_or_value == 'orderby_value'){
                                          $('#orderby_value').attr('checked', true)
                                          $('#orderby_count').removeAttr('checked')
                                        } else {
                                          $('#orderby_value').removeAttr('checked')
                                          $('#orderby_count').removeAttr('checked')
                                        }
    
                                        // event
                                        $('input[type=radio][name=orderby_radio]').on('change', function() {
                                          _orderby_count_or_value = $(this).val()
                                          orderby_count_or_value_change_handler()
                                          update_url_parameter('orderbycountorvalue', _orderby_count_or_value)
                                        });
    
    
                                  /**/
                                  //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                                  /**/
    
    


                                /**/
                                // -------------- search result paging or not  --------------
                                /**/
                                        // first time set radio
                                        $("input[type=radio][name=search_result_paging_or_not_radio][value=" + _search_result_paging_or_not + "]").prop('checked', true);
                                        // radio change event
                                        $("input[type='radio'][name='search_result_paging_or_not_radio']").on('change', function(){
                                          _search_result_paging_or_not = $("input[type='radio'][name='search_result_paging_or_not_radio']:checked").val();
                                          console.log(" search result paging or not radio : --  ", _search_result_paging_or_not);
                                          update_url_parameter('searchpaging', _search_result_paging_or_not);
                                        });

                                /**/
                                //  -------------- end  -------------- search result paging or not  --------------
                                /**/

    


                                
                                /**/
                                // - - - filter value list  - - - 
                                /**/

                                      
                                      $("#filter_value_list_by").on('keyup', filter_valueList_now);
                                      $("#search_value_list_button").on('click', filter_valueList_now);
                                      $('#clear_filter_value_list_button').on('click', show_all_value_list);  
                                                              

                                /**/
                                // ... end ...  - - - filter value list  - - -
                                /**/

    
    
                      }
    
    




              async function ajax_try_jsonp_cors_proxy_return_json_object(_custom_url){

                var _return_json_object
                console.log('ajax try jsonp cors proxy return json object',_custom_url)
      
               
                try {
      
      
                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';
      
      
                  // jsonp 
      
      
                  var response_string =  await $.ajax({
      
      
                  
                                            type: 'GET',
                                            dataType: 'jsonp',
                                            data: {},
                                            url: _custom_url,
                                            error: function (jqXHR, textStatus, errorThrown) {
                                              
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                    console.log('ajax error  + ', _error_status);
                                                                
                                            },
                                            success: function (data) {
                                              console.log('ajax try jsonp cors proxy return json object --> jsonp --> success  --> ');
                                            }
                                          });  // await
      
      
      
                
                } catch(jsonp_failed) {
      
      
                          console.log('ajax try jsonp cors proxy return json object  --> jsonp failed !!!!!!', jsonp_failed);
      
                        try {
      
                                      
      
      
      
                                        // test only
                                        // throw ' ++++++++ test only ++++++++ cors failed'; 
                        
                                        // cors
                                        var response_string =  await $.ajax({
                                          type: 'GET',
                                        
                                          url: _custom_url,
                                          error: function (jqXHR, textStatus, errorThrown) {
                                            
                                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                                  console.log('ajax error  + ', _error_status);
                                                              
                                          },
                                          success: function (data) {
                                            console.log('ajax try jsonp cors proxy return json object --> cors --> success  --> ');
                                          }
                                        });  // await
      
      
      
      
                                          
                            
                        } catch(cors_failed) {
      
                                                    console.log('ajax try jsonp cors proxy return json object  --> cors failed !!!!!!', cors_failed);
      
                                                    try {
      
                                                              
      
                                                              // proxy
                                                              // --------- add proxy  ---------
                                                              var _custom_url_proxy = proxyurl +  _custom_url
      
                                                              var response_string =  await $.ajax({
                                                                type: 'GET',
                                        
                                                                url: _custom_url_proxy,
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                  
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                                    
                                                                },
                                                                success: function (data) {
                                                                  console.log('ajax try jsonp cors proxy return json object --> proxy --> success  --> ');
                                                                }
                                                              });  // await
      
      
      
      
                                                            } catch(proxy_failed) {
      
      
                                                              console.log('ajax try jsonp cors proxy return json object  --> proxy failed !!!!!!', proxy_failed);
                                                        return {'error':'ajax jsonp cors proxy all 3 failed'}
                
                
                
                                                            } // catch proxy
                                                      
                
                                              } // catch cors
                
                
                } // catch jsonp
      
                
                // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                //is already a plain JavaScript object; no need to try to parse it.
                
                if (typeof response_string === 'object') {
                    // is object
                    _return_json_object = response_string
                } else {
                    // is string
                    _return_json_object = JSON.parse(response_string)
                }
      
                console.log(' ajax try jsonp cors proxy return json object  ---- ', _return_json_object)
                return _return_json_object
              }
      
      
      




              



          /**/
          // - - - filter value list  - - - 
          /**/

          var filterValueList_by_keyword
          async function filter_valueList_now(event){

            filterValueList_by_keyword = $('#filter_value_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('filterValueList now keyword ...  ', filterValueList_by_keyword)
            build_value_list(current_selected_field_name, current_selected_field_name_tag_id)
            update_url_parameter('filtervaluelist', filterValueList_by_keyword)
            
          }


          function show_all_value_list(){
            
            filterValueList_by_keyword = ''
            $("#filter_value_list_by").val(filterValueList_by_keyword)
            console.log('show all value list now, you clicked clear button . . .  ', filterValueList_by_keyword)

            build_value_list(current_selected_field_name, current_selected_field_name_tag_id)
            update_url_parameter('filtervaluelist', '')
          }


          /**/
          // ... end ...  - - - filter value list  - - -
          /**/







