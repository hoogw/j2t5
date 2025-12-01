


/**/
// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 


      var _maxAllowableOffset = 0  // default

// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
/**/



//  +++++++++ ********* +++++++++   ground overlay,  map tile   +++++++++ ********* +++++++++  
/**/


       // default
       var current_overlaytype = 'overlayType_image';
       

       var singleFusedMapCache = false;
       var spatial_reference_mapserver = 4326 // default for map server (tile is regards map server, multi-layers)
       var imageMapType

       




       
               
               var image_opacity = 0;  // default
               var spatial_reference = 4326 // default for layer (image, groundOverlay is regards layers)
               var groundoverlay;
               var groundOverlayImage = null // must be global var for image loading progressing bar


//  +++++++++ ********* end  +++++++++      ground overlay,  map tile    +++++++++ ********* +++++++++  








 /**/





          








/**/


    // ++++++++++   geocode    ++++++++++

    var _address_content="";
    var _long_content="";
    var _lat_content="";
    var _url2_content="";
    var _url1_content="";

   var candidateLocationResult

   var _candidate_location_geojson_layer;

   var _singleLineAddressField
   var _addressFields




   
   

// ++++++++++   end   ++++++++++   geocode    ++++++++++














/**/

                                                              // --------- add proxy  --------- 
                                                                          var ____current_window_protocol = window.location.protocol

                                                                          // default http
                                                                          var proxyurl = "http://transparentgov.net:7000/";  

                                                                          console.log('____current_window_protocol', ____current_window_protocol)

                                                                          if (____current_window_protocol == 'https:') {
                                                                          
                                                                            proxyurl = "https://transparentgov.net:7200/";
                                                                            
                                                                          }
                                                              // --------- end  ---------  add proxy  --------- 
  



/**/




 



 var _total_count_of_feature = -2;
 var _current_count_of_feature = -1;

 



// -------------------- max count pagination --------------------

        // default maxRecordCount is 1000 or 2000, arcgis server admin can overwrite it to a large number like 20k, 
        // if admin set it to 20k, we must enforce it as 1000, means we only retrieve first 1000 records, no matter maxRecordCount is how large. 
        var _default_resultRecordCount = 500
        

        // use in pan to real location, get how many sample  
        var _sample_count = 10
        
         // define at feature layer json, advancedQueryCapabilities
       // if true, can use limited return ( default result Record Count ) result Off set, result Record Count, if false,  use unlimited (relay on maxRecordCount 2000) 
       // var _supportsPagination = false
        
 // -------------------- end --------------------
 
 


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
              
                    
                    var field_alias = {} 
                    var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
                    var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                    var field_value = []
                    var flatJson_item
                    var fieldValue_flatjson
                    var field_structure_flatjson = []
                    







               /**/
              // -- -- -- vertial adjustment  -- -- -- 



          /**/
          // only for vertical table 
          function display_count_info(_subject, ___showing_cnt, ___all_cnt){

            $('#layer-info-vertical').html('<a  target="_blank" href="' + _url +  '/' + _layer_id +'">' + _subject + '</a>')
            console.log(' update statistic info', ___showing_cnt, ___all_cnt)
            if (isNaN(___showing_cnt)){ ___showing_cnt = '...' } // not available...
            if (isNaN(___all_cnt)){ ___all_cnt = '...' } // not available...
            $('#feature-on-map').html(___showing_cnt)
            $('#total-feature').html(___all_cnt)

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
                  
            // do not use percentage
            //document.getElementById('percentage').innerHTML =   _percentage_html;
          }
                        


                        


              
                        
        


                            




      

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



                        $("#attribute_field_set_" + _index ).on('mouseover', function(){

                          if (click_or_hover == 'hover'){

                                    var element_id = $(this).attr('id');
                                    var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                    console.log("you hover  index  :   ",  _select_highlight_index)

                                    $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                    $(this).addClass('selected_highlighted_style')

                                    // highlight and zoom to user clicked feature ( geojson object array index is _select_highlight_index)
                                    zoom_to_feature(_global_var_featureObject_indexAsKey[_select_highlight_index], _select_highlight_index) // (_mouse_over_feature, __serial_no, __lock_map )

                         }// if hover

                         });




                        $("#attribute_field_set_" + _index ).on('click', function(){

                          if (click_or_hover == 'click'){

                                    var element_id = $(this).attr('id');
                                    var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                    console.log("you click  index  :   ",  _select_highlight_index)

                                    $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                    $(this).addClass('selected_highlighted_style')

                                    // highlight and zoom to user clicked feature ( geojson object array index is _select_highlight_index)
                                    zoom_to_feature(_global_var_featureObject_indexAsKey[_select_highlight_index], _select_highlight_index) // (_mouse_over_feature, __serial_no, __lock_map )

                          }// if click

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



