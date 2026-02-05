




             function update_url_parameter(_field, _value){
                                      
              var _____searchParams = new URLSearchParams(window.location.search);

              if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
              //if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                       // remove this param from uRL
                          _____searchParams.delete(_field);
                          console.log("delete url parameter(field)-->", _field );
              } else {
                      // update this param from uRL
                          _____searchParams.set(_field, _value);
                          console.log("update url parameter(field=value)-->", _field + "="+ _value);
              }

              // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
              //window.location.search = searchParams.toString();

              // instead avoid reload
              var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
              history.pushState(null, '', _____newRelativePathQuery);

              // ...  ... ... share url  ...  ... ...
              $('#share_url').val(window.location.href);
              // ... end ... ... share url  ...  ... ...
              /**/
      } 




          function search_message(__message_content){
                                                          

            document.getElementById('message_div').innerHTML = __message_content;
            $(".progress").hide(); 

            
      }



    

    


















/**/
   // ========== classified  ========== 
/**/

                  // remove all filter, show     all    feature
                  function showAll(){

                    current_selected_field_name = 'showall'
                    current_classifyFieldName = current_selected_field_name
                    current_selected_field_value = 'showall'
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                    

                  $('.field_name_class').removeClass('selected_style')
                  $('#fieldname_tag_-1').addClass('selected_style')

                  update_url_parameter('select_field', -1);
                  update_url_parameter('select_fieldvalue', -1);


                 
                  $('#value_list').html('');



                    resetPagination()


                  }

                  function showAll_fieldvalue(){

                    // Do not make it empty, must keep current selected field
                    //current_selected_field_name = ''
                    //current_classifyFieldName = current_selected_field_name

                    current_selected_field_value_tag_id = -1
                    current_selected_field_value = 'showall'
                    
                   

                    $('.field_value_class').removeClass('selected_style')
                    $('#fieldvalue_tag_-1').addClass('selected_style')

                    update_url_parameter('select_fieldvalue', -1);

                    resetPagination()


                  } 
                  







                          














                  
  
                  async function build_value_list(_fieldName, _field_name_tag_id){
                  

                    $('.field_name_class').removeClass('selected_style')
                    $('#fieldname_tag_' + _field_name_tag_id).addClass('selected_style')



                    current_selected_field_value = 'showall'
                    current_selected_field_value_tag_id = -2
                    current_selected_field_name = _fieldName
                    current_classifyFieldName = current_selected_field_name
                    current_selected_field_name_tag_id = _field_name_tag_id

                    update_url_parameter('select_field', _field_name_tag_id);
                    update_url_parameter('select_fieldvalue', -1);

                    var _fieldType = field_type[_fieldName]
          var ____fieldType_lowerCase  = _fieldType.toLowerCase();
                    /*
                    if (_fieldType){
                      //nothing to do
                    } else {
                      // field type could be undefined, by default, assign as string
                      _fieldType =  "esriFieldTypeString"
                    } 
                    */
                    console.log(' get distinct field value by field name and field type', _fieldName, _fieldType)

                    /*
                    field type  :  https://developers.arcgis.com/documentation/common-data-types/field.htm
                                                                    esriFieldTypeDate | 

                                                                    esriFieldTypeSingle | 
                                                                    esriFieldTypeInteger |
                                                                    esriFieldTypeSmallInteger | 
                                                                    esriFieldTypeDouble | 

                                                                    esriFieldTypeGeometry | 
                                                                    esriFieldTypeRaster |

                                                                    esriFieldTypeGlobalID | 
                                                                    esriFieldTypeGUID | 
                                                                    esriFieldTypeOID | 

                                                                    esriFieldTypeBlob |
                                                                    esriFieldTypeString | 
                                                                    esriFieldTypeXML
                                                                    
                    */

                    // ******************  unique value  ****************** 

                                                                /*
                                                                    // returnDistinctValues  https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm


                                                                    returnDistinctValues = true, it returns distinct values based on the fields specified in outFields.

                                                                    *** *** warning *** ***

                                                                                        This parameter applies only if the supportsAdvancedQueries property of the layer is true. 

                                                                                        Most of time, Supports Advanced Queries:  false, will return by default 1000 record with duplicated value,

                                                                                        No matter wether distinct value or duplicated value, we all go through our process to remove duplicated value.


                                                                    *** *** end  **** *** warning *** *** 

                                                                    This parameter can be used with returnCountOnly to return the count of distinct values of subfields.
                                                                    // working example: https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/16/query?f=pjson&
                                                                                                    returnGeometry=false&
                                                                                                    returnCountOnly=false&
                                                                                                    returnDistinctValues=true&
                                                                                                    outFields=ZONE_&
                                                                                                    where=1=1


                                                                      Response:
                                                                                {
                                                                                                                          "displayFieldName": "ZONE_",
                                                                                                                          "fieldAliases": {
                                                                                                                            "ZONE_": "ZONE_"
                                                                                },


                                                                                  "fields": [
                                                                                                                            {
                                                                                                                            "name": "ZONE_",
                                                                                                                            "type": "esriFieldTypeString",
                                                                                                                            "alias": "ZONE_",
                                                                                                                            "length": 25
                                                                                                                            }
                                                                                            ],


                                                                                  "features": [
                                                                                                                            {
                                                                                                                            "attributes": {
                                                                                                                              "ZONE_": "R1-F"
                                                                                                                            }
                                                                                                                            },
                                                                                                                            {
                                                                                                                            "attributes": {
                                                                                                                              "ZONE_": "RM4"
                                                                                                                            }
                                                                                                                            },
                                                                                                                            {
                                                                                                                            "attributes": {
                                                                                                                              "ZONE_": "PE"
                                                                                                                            }
                                                                  */



                                                                    // always use returnDistinctValues=true,  
                                                                    //    in case of not support advanced query, not support distinct value, returnDistinctValues=true will NOT cause error, just ignore this value, 
                                                                    //    but will return first 100 to 1000 (limit), may not be a completed list, may missing some distinct value.
                                                                    //    only if support distinct value, will guarantee full complete list of distinct value.
                                                                    console.log( '_supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct ---->>>>---',  _supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct )


                                                                    

                    //  ======  ===== =======  group by  ======  ===== =======  

                                                                                                                /*

                                                                                                                  This parameter is supported only on layers/tables that indicate supportsStatistics is true, means, "supportsAdvancedQueries": true, 
                                                                                                                  https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm
                                                                                                                  Warning:  both must used together, groupByFieldsForStatistics is valid only when the outStatistics parameter is used.
                                                                                                                        outStatistics, 
                                                                                                                        groupByFieldsForStatistics,
                                                                                                                        outStatistics =   [
                                                                                                                                              {
                                                                                                                                                "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                "onStatisticField": "Field1", 
                                                                                                                                                "outStatisticFieldName": "Out_Field_Name1"
                                                                                                                                              },
                                                                                                                                              {
                                                                                                                                                "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                "onStatisticField": "Field2",
                                                                                                                                                "outStatisticFieldName": "Out_Field_Name2"
                                                                                                                                              }  
                                                                                                                                            ]
                                                                                                              */
                                                                                                                        var _outStatistics = [
                                                                                                                                                {
                                                                                                                                                  "statisticType": "count",
                                                                                                                                                  "onStatisticField": _fieldName,
                                                                                                                                                  "outStatisticFieldName": "count"
                                                                                                                                                }
                                                                                                                                              ]

                                                                                                                        // warning:  out statistics is object, not like other are string, you must convert object to string, then url encoded that string, before send to ajax                      
                                                                                                                        var stringified_outStatistics = JSON.stringify(_outStatistics)
                                                                                                                        var encoded_outStatistics =  encodeURIComponent(stringified_outStatistics)
                                                                                                                        console.log(' supports Statistics,  stringified out Statistics,   encoded out Statistics ==== ', _supportsStatistics, stringified_outStatistics, encoded_outStatistics)
                                                                                                                    
                                                                                                                    // _url_distinctFieldValue_groupby =  _url + '/'+  _layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson&returnGeometry=false&returnCountOnly=false&where=1=1'
                                                                                                                    var _url_distinctFieldValue_groupby =  _url + '/'+  _layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson'
                                                                                                                    
                                                                                                                    console.log( 'render 2ndTier url group by field/count %%%%%%  group by  %%%%%% ',  _url_distinctFieldValue_groupby)



                                                                                /**/
                                                                                //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                /*
                                                                                    kowning issue for esri only: 
                                                                                    groupby does not work with 'null', always get null{0}, should be null{29} if use distinct, default200, click 'null' will populate it to  null{29}
                                                                                */
                                                                                      var _where_is_null = encodeURIComponent(_fieldName) +  encodeURIComponent(" is null or ") + encodeURIComponent(_fieldName) + encodeURIComponent("=''") 
                                                                                      var _url_esri_groupby_null_fix =  _url + '/'+  _layer_id + '/query?' + 'where=' + _where_is_null + '&returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson'
                                                                                      console.log('_url_esri_groupby_null_fix', _url_esri_groupby_null_fix)
                                                                                      var null_count = {  "count": 'count of empty(blank or null) field' } // default 
                                                                                      try {
                                                                                             null_count = await ajax_try_jsonp_cors_proxy_return_json_object(_url_esri_groupby_null_fix)
                                                                                      } catch {
                                                                                             null_count = {  "count": 'ajax error 404 failed to count empty(blank or null) field' }
                                                                                             console.log('ajax error 404 when try get null_count', null_count)
                                                                                      }
                                                                                      /*
                                                                                              {
                                                                                                "count": 29
                                                                                              }
                                                                                      */
                                                                                      console.log('null_count', null_count)
                                                                                      if (null_count.hasOwnProperty('error')){
                                                                                            null_count = {  "count": 'arcgis server error failed to execute query when count empty(blank or null) field - ' + JSON.stringify(null_count.error) }
                                                                                      }

                                                                                /**/
                                                                                //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                /**/



                                                                                                                    


                      //  ======  =====  end =======    group by  ======  ===== ======= 
                                                                                                          /**/
                                                                                                          // ======  ===== =======    distinct  ======  ===== =======  
                                                                                                                var _url_distinctFieldValue_distinct =  _url + '/'+  _layer_id + '/query?outFields=' + _fieldName + '&f=pjson&returnGeometry=false&returnCountOnly=false&returnDistinctValues=true&where=1=1'
                                                                                                                console.log( 'render 2ndTier  url <<<<<<< distinct >>>>>>> FieldValue ........  ', _url_distinctFieldValue_distinct)
                                                                                                          // ======  =====  end  =======    distinct  ======  ===== ======= 
                                                                                                          /**/




                                                                                    var raw_distinctFieldValue
                                                                                    // url group-by
                                                                                    raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_groupby)

                                                                                    /*
                                                                                            error: {code: 400, message: "Unable to complete operation.", details: []}
                                                                                                    code: 400
                                                                                                    details: []
                                                                                                    message: "Unable to complete operation."

                                                                                          warning: 
                                                                                          
                                                                                                    will error if use oracle spatial, instead of ESRI, even supportsAdvancedQueries,supportsStatistics = true  
                                                                                                    "outStatistics arcgis not working"   https://community.esri.com/t5/arcgis-enterprise-questions/outstatistics-return-unable-to-complete-operation/td-p/456011

                                                                                                    error sample:  all navigateLA 
                                                                                                    https://maps.lacity.org/arcgis/rest/services
                                                                                                    http://localhost:10/json2tree/esri/server/folder.html?url=https%3A%2F%2Fmaps.lacity.org%2Farcgis%2Frest%2Fservices&org=Los+Angeles+CA+navigateLA&_center_lat=34.02006286055584&_center_long=-118.41204261445893&_center_zoom=16&select_folder=22&select_layer=57

                                                                                      */ 
                                                                                      console.log('raw distinct Field Value ajax by Group-by ', raw_distinctFieldValue)







                                                                                      /**/
                                                                                      //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                                                                                      /**/
                                                                                                            
                                                                                      if (raw_distinctFieldValue.error) {

                                                                                                  // groupby have error, only use distict
                                                                                                                _distinct_or_groupby = 'distinct'
                                                                                                                update_url_parameter('distinctorgroupby', 'distinct' )
                                                                                                                _orderby_count_or_value = 'orderby_value'
                                                                                                                update_url_parameter('orderbycountorvalue', 'orderby_value')

                                                                                                                // enforce order by value
                                                                                                                $('#orderby_value').attr('checked', true)
                                                                                                                $('#orderby_count').removeAttr('checked')
                                                                                                                //disable this radio 
                                                                                                                $('input[name=orderby_radio]').attr("disabled",true);
                                                                                                      

                                                                                                                // url distinct
                                                                                                                raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_distinct)
                                                                                                                
                                                                                      } else {

                                                                                                    // groupby works, do not use distict
                                                                                                    _distinct_or_groupby = 'groupby'
                                                                                                    update_url_parameter('distinctorgroupby', 'groupby' )

                                                                                                    /**/
                                                                                                    //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                                    /**/
                                                                                                        var features_array_null_fix = raw_distinctFieldValue.features 
                                                                                                        var _attributes_null_fix
                                                                                                        var __field_value_null_fix
                                                                                                        for (var n = 0; n < features_array_null_fix.length; n++) { 
                                                                                                          _attributes_null_fix = features_array_null_fix[n].attributes
                                                                                                          __field_value_null_fix = _attributes_null_fix[_fieldName]
                                                                                                          if (__field_value_null_fix == null){
                                                                                                            raw_distinctFieldValue.features[n]['attributes']['count'] = null_count['count']
                                                                                                            break // for loop
                                                                                                          }//if
                                                                                                        }//for
                                                                                                        console.log('raw_distinctFieldValue  * * * after null fix  * * *', raw_distinctFieldValue)

                                                                                                    /**/
                                                                                                    //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                                    /**/
                                                                                      }


                                                                                      /**/
                                                                                      //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                                                                                      /**/

      
                                                                                      console.log( ' {{{{{{{{{{  _distinct_or_groupby  }}}}}}}}}}', _distinct_or_groupby)      
                                                                                      console.log( ' {{{{{{{{{{  distinct field value  .....  raw un-sorted  ......  }}}}}}}}}}    ', raw_distinctFieldValue)



                                                                      var real_distinct_fieldvalue_array = []


                                                                // not works,   because it generate object {}, instead of plain element
                                                                // remove duplicate element from array, get a new array
                                                                // var  real_distinct_fieldvalue_SET = new Set(distinctFieldValue)
                                                                // real_distinct_fieldvalue_array = [ ... real_distinct_fieldvalue_SET]


                                                                // mapserver raw response,  processing, { features: [ ....... ] }
                                                                /*
                                                                
                                                                    features: 
                                                                                [
                                                                                  {
                                                                                    attributes: 
                                                                                                {
                                                                                                  ZoneName: "Parks and Recreation", 
                                                                                                  count: 60
                                                                                                  }
                                                                                  }



                                                                                  {
                                                                                    attributes: {
                                                                                                    ZoneName: "Medium High Density Residential", 
                                                                                                    count: 83
                                                                                                  } 
                                                                                  }
                                                                                ]
                                                                */
                                                                                if (raw_distinctFieldValue.features) {

                                                                                  if ( raw_distinctFieldValue.features.length > 0 ) {
    
    
                                                                                              var features_array = raw_distinctFieldValue.features
                                                                                              var _attributes
                                                                                              var __field_value_
    
                                                                                              for (var l = 0; l < features_array.length; l++) { 
    
                                                                                                      _attributes = features_array[l].attributes
                                                                                                      __field_value_ = _attributes[_fieldName]
    
    
                                                                                                    
                                                                                                    
                                                                                                    if (_distinct_or_groupby == 'groupby') {
    
                                                                                                            //  ======  ===== =======  group by  ======  ===== ======= 
    
                                                                                                                                  //real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }   
                                                                                                                                          // indexOf method in an object array https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array/38516944 
                                                                                                                                  _index_position = real_distinct_fieldvalue_array.map(function(e) { return e[_fieldName]; }).indexOf(__field_value_);
                                                                                                                                  if (_index_position == -1 ) {
                                            
                                                                                                                                            real_distinct_fieldvalue_array.push(_attributes)
    
    
                                                                                                                                  } else {
    
                                                                                                                                        // found duplicated value, nothing to do 
    
                                                                                                                                  }// if 
    
    
    
    
                                                                                                    } else if (_distinct_or_groupby == 'distinct'){
    
                                                                                                            // ======  ===== =======    distinct  ======  ===== =======  
    
    
                                                                                                                          // real distinct array element is string  : 'dog'
                                                                                                                        if  (real_distinct_fieldvalue_array.indexOf(__field_value_) == -1 ) {
                                                                                                                                real_distinct_fieldvalue_array.push(__field_value_)
                                                                                                                        } else {
                                                                                                                                // found duplicated value, nothing to do 
                                                                                                                        }// if 
    
                                                                                                                                  
    
    
    
    
                                                                                                    } // supports Statistics
    
    
    
    
    
    
    
                                                                                              
                                                                                              } // for
    
                                                                              
                                                                                
                                                                                } // if raw.length > 0
                                                                              } // if raw
    
                                                                            console.log( '  before sort, unique value , real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
    


                      /**/
                      //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                      /**/
                                                                            console.log( ' * * * * * *  _orderby_count_or_value  * * * * * * ',  _orderby_count_or_value)
                                                                            console.log( ' * * * * * *  _distinct_or_groupby  * * * * * * ',  _distinct_or_groupby)

                                                                            if (_orderby_count_or_value == 'orderby_count'){


                                                                                        if (_distinct_or_groupby == 'groupby'){
                                                                                                      //  ======  ===== =======  group by  ======  ===== ======= 
                                                                                                      /**/
                                                                                                              //   ########      ########    sort by "count"  DESC  ########      ######## 
                                                                                                              /**/  
                                                                                                                      // real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }
                                                                                                                      console.log( '  ********* sort ~~~~~~~ count DESCending ~~~~~~~   *********-> ', real_distinct_fieldvalue_array)
                                                                                                                                                                                        
                                                                                                                      // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                      real_distinct_fieldvalue_array.sort(
                                                                                                                                                            function(a, b) {
                                                                                                                                                                                        
                                                                                                                                                                            // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                            // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                        if ( parseFloat(a['count']) < parseFloat(b['count']) ){
                                                                                                                                                                                          return 1;
                                                                                                                                                                                        }
                                                                                                                                                                                        if ( parseFloat(a['count']) > parseFloat(b['count']) ){
                                                                                                                                                                                          return -1;
                                                                                                                                                                                        }
                                                                                                                                                                                        return 0;
                                                                                                                                                                            }
                                                                                                                                                          );
                                                                                                                      console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                              //   ########    end    ########     sort by "count"  DESC  ########      ######## 
                                                                                          } else {
                                                                                                       // can not sort, nothing to do, do not sort, because order by count must have groupby working.
                                                                                                       console.log('can not sort, nothing to do, do not sort, because order by count must have groupby working.')
                                                                                          }// groupby





    
                                                                          } else if (_orderby_count_or_value == 'orderby_value'){

                                     
                                                                                           if (_distinct_or_groupby == 'distinct'){
                                                                                                            // only for g200, g100
                                                                                                              // ======  ===== =======    distinct  ======  ===== =======
                                                                                                              /**/ 
                                                                                                                            //   ########    ########    sort by field value alphabetic  ~~~~~~~  distinct url only  ~~~~~~~    ########   ######## 
                                                                                                                             /**/ 
                                                                                                                                    // sort array ascending  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    
                                                                                                                                    var ____fieldType_lowerCase  = _fieldType.toLowerCase(); 
    
                                                                                                                                    if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ) {
                                                                                                                                                              
                                                                                                                                                              // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                                              real_distinct_fieldvalue_array.sort(
                                                                                                                                                                                                    function(a, b) {
                                                                                                                                                                                                                    return a - b;
                                                                                                                                                                                                                    }
                                                                                                                                                                                                  );
    
                                                                                                                                    } else {
                                                                                                                                                                // by default work on string, text, compare UTF-16, Unicode,  but not works on numeric number, expected output: Array [1, 100000, 21, 30, 4]
                                                                                                                                                                real_distinct_fieldvalue_array.sort() 
                                                                                                                                    }
                                                                                                                                    console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                            //   ########    end   ########    sort by field value alphabetic      ########   ######## 


                                                                                            } else if (_distinct_or_groupby == 'groupby'){
                                                                                                              // only for g400, g300, not for g430, g330

                                                                                                              //   ########    ########    sort by field value alphabetic      ########   ######## 
                                                                                                                        console.log( '  ~~~~~~~  sort by field value alphabetic  ASCending ~~~~~~~  group by url only ~~~~~~~  ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                                    
                                                                                                                        // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                        real_distinct_fieldvalue_array.sort(
                                                                                                                                                              function(a, b) {
                                                                                                                                                                                          
                                                                                                                                                                              // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                              // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                          if ( a[_fieldName] < b[_fieldName] ){
                                                                                                                                                                                            return -1;
                                                                                                                                                                                          }
                                                                                                                                                                                          if ( a[_fieldName] > b[_fieldName] ){
                                                                                                                                                                                            return 1;
                                                                                                                                                                                          }
                                                                                                                                                                                          return 0;
                                                                                                                                                                              }
                                                                                                                                                            );
                                                                                                                        console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                              //   ########    end   ########    sort by field value alphabetic      ########   ######## 

                                                                                            }// distinct



                                                                      } // supports Statistics
    
    
                      /**/
                      //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                      /**/




                    var value_html = '';
                    value_html += '<div>';
    
                    var _node_display_text 
                    var _node_groupBy_count = '' 
                    

                    if (real_distinct_fieldvalue_array) {
                      if ( real_distinct_fieldvalue_array.length > 0 ) {
                          
                            value_html += '<ol>';
                            value_html +=   '<a  id="fieldvalue_tag_-1" class="field_value_class" href="#">';
                            value_html +=    '<span style="font-size:24px; font-weight:700;">Show all</span>' 
                            value_html +=   '</a>';
                            value_html +=   ' {' + _total_count_of_feature + '}'
                            
                            for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) { 


                              var _this_field_value

                              if (_distinct_or_groupby == 'groupby') {

                                      //  ======  ===== =======  group by  ======  ===== ======= 
                                      
                                      _node_display_text = real_distinct_fieldvalue_array[r][_fieldName] 
                                      _node_groupBy_count = ' {' + real_distinct_fieldvalue_array[r]['count'] + '}'
                                      _this_field_value = real_distinct_fieldvalue_array[r][_fieldName]

                              } else if (_distinct_or_groupby == 'distinct'){

                                      // ======  ===== =======    distinct  ======  ===== ======= 
                                      
                                      _node_display_text = real_distinct_fieldvalue_array[r]
                                      _this_field_value = real_distinct_fieldvalue_array[r]

                              
                              } // supports Statistics



                              value_html += '<li>' // css .ordered_list_number{ size font};
                              
                              value_html +=   '<a id="fieldvalue_tag_' + r + '" class="field_value_class" href="#"  data-field-value="' + _this_field_value +  '" data-tag-id="' + r +  '">';
                              value_html +=    _node_display_text  
                              value_html +=   '</a>';
                              value_html +=   _node_groupBy_count;

                              // . . . add filtered count  . . .
                              value_html +=   '<span id="fieldvalue_count_' + r + '">' + '</span>';
                              // . . . end  . . . add filtered count  . . .

                              value_html += '</li>';
                            }// for

                            value_html += '</ol>';
                            value_html +='</div>'
                            $('#value_list').html(value_html);

                            // event
                            var _fieldvalue_tag_id
                            for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) {                               
                              _fieldvalue_tag_id = '#fieldvalue_tag_' + r
                              $(_fieldvalue_tag_id).on('click', function(){
                                                                        //filter_result($(this).data('field-value'), $(this).data('tag-id'))
                                                                        current_selected_field_value = $(this).data('field-value')
                                                                        current_selected_field_value_tag_id = $(this).data('tag-id')
                                                                        $('.field_value_class').removeClass('selected_style')
                                                                        $('#fieldvalue_tag_' + current_selected_field_value_tag_id).addClass('selected_style')
                                                                        update_url_parameter('select_fieldvalue', current_selected_field_value_tag_id);

                                                                        resetPagination()
                                                                });
                            }// for
                            $("#fieldvalue_tag_-1").on('click', showAll_fieldvalue)


                      } else {
                        value_html +=  '<div style="font-size: 18px; font-weight: 100;">' + 'No Value Can Be Selected' +  '</div>' 
                        value_html +='</div>'
                        $('#value_list').html(value_html);

                      }//if  
                    }//if
                   
                    

                // must enforce update map
             // get_map_bound()

          }

           






      /**/
      //  ... ... .. ... order by field name  ... ... .. ... 
      /**/

            // special vertial field list, value 
            function create_field_html(fieldNameListArray){

                  var field_html = '';
                  // radio button  - - -  https://uiverse.io/Pradeepsaranbishnoi/bitter-rabbit-96
                  field_html += '<div class="radio-tile-container" style="flex-direction: column;">'  // special vertial field list, value 
                  field_html +=     '<div class="radio-tile-group" style="flex-direction: column;">'  // special vertial field list, value 
                  field_html +=          '<div style="font-size: 24px; font-weight: 900;">FilterBy</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' 


                  if (fieldNameListArray.length > 0) {
                          // only for vertial embed                                  
                          field_html +='<div class="radio-tile-input-container">'
                          field_html += '<div class="radio-tile">'
                          field_html +=   '<label id="fieldname_tag_-1" class="field_name_class radio-tile-label">';
                          field_html +=       '<span style="font-size: 24px; font-weight: 900;">'  +  'No Filter'  + '</span>'
                          field_html +=   '</label>'
                          field_html += '</div>'
                          field_html +='</div>'

                          
                          var i1 = 0
                          for (var i = 0; i < fieldNameListArray.length; ++i) {
                            i1 = i + 1   
                                    field_html +='<div class="radio-tile-input-container">'
                                    //field_html +=   '<span style="display:inline; font-size: 18px; font-weight: 100;">'  + '<sup>' + i1 +  '</sup>' + '</span>'

                                    field_html +=  '<div class="radio-tile">'
                                    field_html +=   '<label id="fieldname_tag_' + i + '" class="field_name_class  radio-tile-label" data-field-name="' + fieldNameListArray[i] +  '" data-fdnm-tagid=' + i +  '>';
                                    field_html +=     fieldNameListArray[i]
                                    field_html +=   '</label>';
                                    field_html += '</div>'
                                    field_html +='</div>'

                              

                          }// for

                          //field_html += '</ol>';
                          field_html +='</div></div></div>'

                          $('#field_list').html(field_html);

                          // event
                            var _fieldName_tag_id
                            for (var i = 0; i < fieldNameListArray.length; ++i) {                           
                              _fieldName_tag_id = '#fieldname_tag_' + i
                              $(_fieldName_tag_id).on('click', function(){
                                                                           build_value_list($(this).data('field-name'), $(this).data('fdnm-tagid'))
                                                                          });
                            }// for
                            $("#fieldname_tag_-1").on('click', showAll)


                  } else {
                    field_html +=  '<div style="font-size: 18px; font-weight: 100;">' + 'No Column Name or Field name, No Filter Can Be Select' +  '</div>' 
                    field_html +='</div>'
                    $('#field_list').html(field_html);
                  }//if
                  
                 
                  // user have not select any value, by default, show this message
                  $('#value_list').html('');
            }


            function build_field_list(){

                                          console.log('orderby_fieldname', orderby_fieldname)

                                          if (orderby_fieldname == 'orderby_fieldname_default'){
                                                  // default order
                                                  console.log('field_name', field_name)
                                                  create_field_html(field_name)

                                          } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){

                                                  // sort field name alphabetic_ascending
                                                  field_name_order_by_alphabetic_ascending = structuredClone(field_name)
                                                  field_name_order_by_alphabetic_ascending.sort();
                                                  console.log('field_name_order_by_alphabetic_ascending',  field_name_order_by_alphabetic_ascending)
                                                  create_field_html(field_name_order_by_alphabetic_ascending)

                                          } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){

                                                  // sort field name alphabetic descending
                                                  field_name_order_by_alphabetic_descending = structuredClone(field_name)
                                                  field_name_order_by_alphabetic_descending.sort();
                                                  field_name_order_by_alphabetic_descending.reverse()
                                                  console.log('field_name_order_by_alphabetic_descending', field_name_order_by_alphabetic_descending)
                                                  create_field_html(field_name_order_by_alphabetic_descending)
                                          }

            }
          

      /**/
      //  ... end ... ... .. ... order by field name  ... ... .. ...
      /**/





 // . . . add filtered count  . . .
 function update_value_list_tag_count(_tagId, _filteredTotal){

  console.log(' ++ ++ ++ update value list tag count ++ ++ ++ ++ ++ ', _tagId, _filteredTotal)
  var _filtered_count_tagId = '#fieldvalue_count_' + _tagId
  if ($(_filtered_count_tagId).html()){
        // already has something, nothing to do
  } else {
         // null, need add filtered count
         $(_filtered_count_tagId).html(' {~' + _filteredTotal + '~}')
  }

}

// . . . end  . . . add filtered count  . . .
/**



/**/


                        // ****** pre select by url param  ****** 

                                    var _first_time_load_for_field = true;
                                    var _first_time_load_for_fieldvalue = true;


                                    var selected_fieldLevel_id;
                                    var selected_fieldvalueLevel_id = -1; // default -1, means, select root node by default

            async function  pre_select_field_level(){
                    var _rightnow_url_params
                    if (_first_time_load_for_field) {

                      // only run 1 time, 1st time, get original url param from init global variable function
                       _rightnow_url_params = urlParams
                       _first_time_load_for_field = false

                    } else {
                        //  re-create instance of url params
                         _rightnow_url_params = new URLSearchParams(window.location.search);

                    }  
                            selected_fieldLevel_id = _rightnow_url_params.get('select_field');                                                  
                            console.log('selected_field_id',  selected_fieldLevel_id)

                            selected_fieldvalueLevel_id = _rightnow_url_params.get('select_fieldvalue');
                            console.log('selected_fieldvalue_id',  selected_fieldvalueLevel_id)

                                                    if ((selected_fieldLevel_id == undefined) || (selected_fieldLevel_id == null) || (selected_fieldLevel_id == '')){
                                                      
                                                        // select folder is null, undefined, nothing to select
                                                        current_selected_field_name = 'showall'
                                                        // if select field name is null, empty, means show all records
                                                        resetPagination()

                                                    } else if (selected_fieldLevel_id == -1){
                        

                                                      $('.field_name_class').removeClass('selected_style')
                                                      $('#fieldname_tag_-1' ).addClass('selected_style')

                                                        // select folder is null, undefined, nothing to select
                                                        current_selected_field_name = 'showall'
                                                        // if select field name is null, empty, means show all records
                                                        resetPagination()

                                                    }else {
                        
                                                        
                                                      var selected_fieldname = $('#fieldname_tag_' + selected_fieldLevel_id).text()
                                                      //var _fieldNameWithAlias = $('#fieldname_tag_' + selected_fieldLevel_id).text()
                                                      //var selected_fieldname = _fieldNameWithAlias.slice(0,_fieldNameWithAlias.indexOf(' {'))
                    
                                                      console.log('pre select field by ',  selected_fieldname,  selected_fieldLevel_id)
                                                      await build_value_list(selected_fieldname,  selected_fieldLevel_id)
                                                      pre_select_fieldvalue_level()
                                                      
                                                      
                                                    }



                                    }



                                    
                                     async function pre_select_fieldvalue_level(){
                            
                                                        if ((selected_fieldvalueLevel_id == undefined) || (selected_fieldvalueLevel_id == null) || (selected_fieldvalueLevel_id == '')){
                            
                                                           // if select field value is null, empty, means show all records
                                                           current_selected_field_value_tag_id = -1; // default -1, means, select root node by default                                                         
                                                           current_selected_field_value = 'showall'

                                                           

                                                        } else if (selected_fieldvalueLevel_id == -1){
                                                           
                                                            current_selected_field_value_tag_id = -1; // default -1, means, select root node by default                                                         
                                                            current_selected_field_value = 'showall'
                                                            $('.field_value_class').removeClass('selected_style')
                                                            $('#fieldvalue_tag_-1' ).addClass('selected_style')

                                                        
                                                        } else {
                            
                            
                                                          var selected_fieldvalue = $('#fieldvalue_tag_' + selected_fieldvalueLevel_id).text()
                                                          selected_fieldvalue = selected_fieldvalue.split('{')[0]
                                                          selected_fieldvalue = selected_fieldvalue.trim()
                                                          console.log('pre select field value by selected fieldvalue',  selected_fieldvalue)
                                                          console.log('pre select field value by selected fieldvalueLevel id',   selected_fieldvalueLevel_id)

                                                          current_selected_field_value = selected_fieldvalue
                                                          current_selected_field_value_tag_id = selected_fieldvalueLevel_id
                                                          $('.field_value_class').removeClass('selected_style')
                                                          $('#fieldvalue_tag_' + current_selected_field_value_tag_id).addClass('selected_style')


                                                         
                            
                            
                                                        }

                                                       
                                                        // no matter what, always reset pagination
                                                        resetPagination()

                                    }



                        // ******  end   ******  pre select by url param  ****** 





/**/








             // ==========  end   ==========  classified  ========== 










