
var _search_keyword = ''

/*

       result panel 

                    

                    https://codepen.io/ProjectBarks/pen/MyLmmp

                    https://codepen.io/hoogw/pen/rNxYxby
                    https://codepen.io/hoogw/pen/rNxYxby


                    scss: ( must compile to css before use)

                    // Media Query Ranges
                    $small-screen-up: 601px !default;
                    $medium-screen-up: 993px !default;
                    $large-screen-up: 1201px !default;
                    $small-screen: 600px !default;
                    $medium-screen: 992px !default;
                    $large-screen: 1200px !default;

                    $medium-and-up: "only screen and (min-width : #{$small-screen-up})" !default;
                    $large-and-up: "only screen and (min-width : #{$medium-screen-up})" !default;
                    $small-and-down: "only screen and (max-width : #{$small-screen})" !default;
                    $medium-and-down: "only screen and (max-width : #{$medium-screen})" !default;
                    $medium-only: "only screen and (min-width : #{$small-screen-up}) and (max-width : #{$medium-screen})" !default;

                    @mixin column-count($ct) {
                      -webkit-column-count: $ct;
                      -moz-column-count: $ct;
                      column-count: $ct;
                    }

                    .cards-container {
                      column-break-inside: avoid;
                      .card {
                        transform: translateZ(0);
                        display: inline-block;
                        overflow: visible;
                      }
                    }

                    @media #{$small-and-down} {
                      .cards-container {
                        @include column-count(1);
                      }
                    }
                    @media #{$medium-and-up} {
                      .cards-container {
                        @include column-count(2);
                      }
                    }
                    @media #{$large-and-up} {
                      .cards-container {
                        @include column-count(5);
                      }
                    }


                    /// Styles for demo
                    .text-center {
                      text-align: center;
                    }




                    

                    // for toggle column only 
                    $("#toggle").click(function() {
                                                    var container = $("#card-toggle-container");
                                                    if (container.hasClass("cards-container")) {
                                                      container.removeClass("cards-container");
                                                    
                                                    } else {
                                                      container.addClass("cards-container");
                                                     
                                                    }
                                                  });





*/








           
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




                           





              // only for result panel , it is different from jsoneditor,
              function show_json_viewer(__json___,  ___name__ , __highlight_keywords____ ){

                var _restructured_json
                          /*
                              only for arcgis - rest api - feature table only ------------
                                      features: Array(10)
                                                    0:
                                                    attributes:
                                                                FeedSubtype: "OHF"
                                                                GIS_FeatureKey: "25381_P1"
                                                                GIS_ID: 25381
                                                                HeadCount: 1
                                                                OBJECTID: 11
                                   json.features: [ {attributes: {…}},  {attributes: {…}}, {attributes: {…}}] 
                          */

                          // remove 'attributes' from array, to make it flat one level
                          if (__json___.features){
                               // only for ?query=
                                _restructured_json = restructure_json(__json___.features)
                          }
                          if (__json___.results){
                               // only for ?find= 
                               _restructured_json = restructure_json(__json___.results)
                              }
                      // raw json is array of properties  :  [ {OBJECTID	:	1 , GIS_ID	:	44832 },  {OBJECTID	:	2 , GIS_ID	:	44832}, {OBJECTID	:	3 , GIS_ID	:	44832}]  
                    
                      _current_count_of_feature =    _restructured_json.length
                      display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)

                       /**/
                       // ------ for single-json editor only ---------------
                                        editor.set(_restructured_json);
                                        editor.expandAll();
                                        editor.setName(___name__)
                                             // not use, simply highlight as is 
                                             // editor.search(__highlight_keywords____)
                                            // for example key words have multiple words:   auto broker
                                            // must highlight each words
                                            
                                             
                                             var __keywords_array = []
                                             if (isNaN(__highlight_keywords____)) {
                                               // string
                                               __keywords_array = __highlight_keywords____.split(" ");
                                             } else {
                                               // number
                                               __keywords_array.push(__highlight_keywords____)
                                             }


                                              for (var k = 0; k < __keywords_array.length; k++) {
                                                    var _each_keyword_item = __keywords_array[k].trim()
                                                    // highlight search keywords by 
                                                      //https://github.com/josdejong/jsoneditor/issues/364
                                                      //If in any other mode, like 'View' or 'Tree'
                                                    // editor.search(__highlight_keywords____)
                                                      //When using 'code' mode, 
                                                      //editor.aceEditor.find(__highlight_keywords____);
                                                    editor.search(_each_keyword_item)
                                              }
                      // ------  end  ---------- for single-json editor only ---------------
                      /**/
              
               

                      if (_restructured_json.length < 50 ){


                        $("#jsoneditor").hide();
                        $("#card-toggle-container").show();

                                                // build html for each card
                                                document.getElementById('card-toggle-container').innerHTML = '';
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
                                                                                                                  __keywords_array.push(__highlight_keywords____)
                                                                                                                }                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                for (var k = 0; k < __keywords_array.length; k++) {
                                                                                                                  
                                                                                                                            var _each_keyword_item = __keywords_array[k].trim()
                                                                                                                          //  // console.log(' highlight each key word --> ', _each_keyword_item)
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

                                                                




                                } else {

                                  // search result > 50, can not create too many card, will crash browser. turn text editor on 

                                  $("#jsoneditor").show();
                                  $("#card-toggle-container").hide();                                  
                                }


                                  
                                              









              
              } // function 
              
              



             


        
        



                    
              function restructure_json(____raw_____json){
                /*
                            only for arcgis - rest api - feature table only ------------
                                    features: Array(10)
                                                  0:
                                                  attributes:
                                                  FeedSubtype: "OHF"
                                                  GIS_FeatureKey: "25381_P1"
                                                  GIS_ID: 25381
                                                  HeadCount: 1
                                                  OBJECTID: 11

                                json.features: [ {attributes: {…}},  {attributes: {…}}, {attributes: {…}}]     
                                
                                
                            

                        */

                        // remove 'attributes' from array, to make it flat one level


                          // before  :     [ {attributes: {…}},  {attributes: {…}}, {attributes: {…}}]    
                          // after   :     [ {…},                {…},                {…},]    

                  var ____restructured_____json = []
                  var _properties_alias
                  for (var r = 0; r < ____raw_____json.length; r++) {
                    
                    _properties_alias = addAliasToFieldName(____raw_____json[r].attributes, field_alias)
                    ____restructured_____json.push(_properties_alias)
                    //____restructured_____json.push(____raw_____json[r].attributes)

                  }





              return ____restructured_____json
              }


            