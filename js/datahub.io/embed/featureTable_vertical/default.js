
var _search_keyword = ''





              // only for result panel , 
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

                      console.log(' ! * ! _restructured_json ', _restructured_json )
              
                      var multiple_layer_properties_html = ''
                      var ___properties
                                  
                      for (let _index = 0; _index < _restructured_json.length; _index++) {

                          ___properties = _restructured_json[_index]
                          multiple_layer_properties_html += '</br>'              

                          // build html only
                          if (_index == 0){
                            multiple_layer_properties_html += '<fieldset>' 
                            multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' +'</legend>'
                            multiple_layer_properties_html +=     '<div class="flex-row selected_highlighted_style attribute_field_set_style"   id="attribute_field_set_0"   >'  // if 0, means need start a new info window
                            multiple_layer_properties_html +=           json_flex_tip_viewer(___properties)
                            multiple_layer_properties_html +=     '<div>'
                            multiple_layer_properties_html += '</fieldset>'
                          } else {

                          multiple_layer_properties_html += '<fieldset>'
                          multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' +'</legend>'
                          multiple_layer_properties_html +=     '<div class="flex-row attribute_field_set_style"   id="attribute_field_set_' + _index +  '"   >' // not 0, means need append to existing info window
                          multiple_layer_properties_html +=         json_flex_tip_viewer(___properties)
                          multiple_layer_properties_html +=     '<div>'
                          multiple_layer_properties_html += '</fieldset>'

                          }//if
                          //  . .  end    . .  build html only

                      }//for
                      
                      $('#info-window-div').html(multiple_layer_properties_html)

                      // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                      for (let _index = 0; _index < _restructured_json.length; _index++) {

                        console.log('add event to element id :  attribute_field_set_', _index)
                        $("#attribute_field_set_" + _index ).on('click', function(){
                                    var element_id = $(this).attr('id');
                                    var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                    console.log("you click  index  :   ",  _select_highlight_index)

                                    $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                    $(this).addClass('selected_highlighted_style')



                                    /*
                                        do something, need replace

                                    view.whenLayerView(graphic_object_indexAsKey[_select_highlight_index].layer)
                                    .then(function(layerView){
                          
                                                              if (mouse_pointed_feature_highlight_handle){
                                                                mouse_pointed_feature_highlight_handle.remove()
                                                              }
                                                              mouse_pointed_feature_highlight_handle = layerView.highlight(graphic_object_indexAsKey[_select_highlight_index]);
                                    });// view . when
                                    */

                         });

                      }//for


                      /**/
                      // -- -- -- Warning: Only for search  -- -- --
                      /**/ 
                            highlight_keywords_markjs(__highlight_keywords____); // _multi_keyWords_
                      /**/
                      //  . . . end  . . . -- -- -- Warning: Only for search  -- -- --
                      /**/

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


            