











          



            







              // limit = 10 = page_size (10 record per page) define at top
              // offset means bypass how many record, start from where 
              async function get_paged_json_by_limit_and_offset(fulltextSearch_parameter,_limit, _offset){

                  

                try {


                      //https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm#ESRI_SECTION1_CCD86252F6F348D19BB2D47294D6568C
                      //If using orderByFields with the resultOffset and resultRecordCount parameters to paginate through an ordered set of rows, 
                      //make sure to set the orderByFields such that order is deterministic. For example, 
                      //if you need to order by type and multiple rows can have the same type values, 
                      //set the orderByFields to be type,objectid.
                      
                      //Note that when you pass in one of these two parameters and orderByFields is left empty, 
                      //the map service uses the object-id field to sort the result. 
                      //For a query layer with a pseudo column as the object-id field (for example, FID), you must provideorderByFields; otherwise the query fails.
                      
                      //orderByFields=FID
                      // resultOffset and resultRecordCount

                        //var _paging_parameter = '$limit='+_limit + '&$offset=' +  _offset;
                        
                        //var _paging_parameter = '&orderByFields=FID' + '&resultRecordCount='+_limit + '&resultOffset=' +  _offset;
                        
                        // fix bug, some do not have FID field. so remove '&orderByFields=FID' 
                        var _paging_parameter =  '&resultRecordCount='+_limit + '&resultOffset=' +  _offset;
                        

                        //https://dev.socrata.com/docs/paging.html 
                        // $order=:id make sure result is ordered
                        // https://data.cityofnewyork.us/resource/ic3t-wcy2.json?$order=:id&$limit=10&$offset=5
                      // var _url_paged = _url + '/'+  _layer_id + '.json?$order=:id&' + _paging_parameter + fulltextSearch_parameter;
                        
                        // fix error: sometime  $order=:id cause internal error. so remove it
                        
                        //var _url_paged = _url + '/'+  _layer_id + '.json?' + _paging_parameter + fulltextSearch_parameter;
                        //var _url_paged = ___url + '/'+   _layer_id + '/query?f=json&outFields=*&outSR=4326' + _paging_parameter + fulltextSearch_parameter 
                        var _url_paged = ___url + '/'+   _layer_id + '/query?returnGeometry=false&f=json&outFields=*&outSR=4326' + _paging_parameter + fulltextSearch_parameter  


                        console.log('_url_paged :::: ',_url_paged);
                        


                    // ---------- get paged result ---------------

                    


                          // empty json editor
                          show_json_viewer({features:[]},'Empty',  '')
                         

                          console.log('arcgis ajax cross origin (_url_paged,  _cross) ',_url_paged,  _cross)

                          var success_returnBack= await ajax_cross_origin(_url_paged,  _cross);  // cross origin method  

                          console.log('success_returnBack',success_returnBack)




                    if (success_returnBack.features) {


                      /*

                           only need attributes, do not need geometry, url must add  '/?returnGeometry=false&'

                            [
                              {attributes: {…}, geometry: {…}}
                              {attributes: {…}, geometry: {…}}
                            ]
                      
                      */

                            var _features_array = success_returnBack.features
                            var _attribute_array = []
                            var _properties_alias
                            for (let f = 0; f < _features_array.length; f++) {
                              _properties_alias = addAliasToFieldName(_features_array[f].attributes, field_alias)
                              _attribute_array.push(_properties_alias)
                            }


                          show_json_viewer(_attribute_array,'records',  current_selected_field_value)


                    }






                      
                    
                    
                        $('#message_field').empty();



                        // ......... some_action_need_after_first_load_complete .......... 
                                // better not do a separate function, because success_returnBack.fields scope is only here

                                // (only first time, one time )if feature attribute array is empty, need to populate feature attribute array
                                if ( _feature_attributes.length == 0 ){
                                  
                                  console.log('success_returnBack.fields --', success_returnBack.fields)
                                  
                                  parse_feature_attributes(success_returnBack.fields)
                                  
                                  
                                } 
              
              
              
                                
              
                            


                         // ......... some_action_need_after_first_load_complete .......... 









                    // ----------   end --------- get paged result ---------------


                } catch(err) {
                    
                    console.log('get paged json by limit and offset ... get error ', err)

                   


                }//catch

            }  








        // special for non-j-s-t-r-e-e version of value list( link )    
        async function resetPagination(){


          


          try {                     
            //   *****  classified , filter by     *****  

                var _____search_parameter = '&where=9999=9999'; // fast
                //var _____search_parameter = '&where=1=1'; // slow 

                // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                //if ((current_selected_field_name) && (current_selected_field_value)){
                console.log('  ------  current selected field_name ------ ',  current_selected_field_name)
                console.log('  ------  current selected field value ------ ', current_selected_field_value)


                // special for non-j-s-t-r-e-e version of value list( link ) 
                var _raw_field_value = current_selected_field_value
                if ((typeof _raw_field_value) == 'number'){
                  _raw_field_value = _raw_field_value.toString();
                }


                                   
                if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

                                                // any showall means no filter, no search parameter, means browsing , always use pagination,
                                                _____search_parameter = '&where=9999=9999';

                                                $('#valueList-message_label').html('');
                                                $('#valueList-pagination-container').hide()
                                                $('#message_div').html('');


                } else {
                                          
                                         //  field name, must be not empty, not blank, field name must be something other than 'showall'

                                                          
                                                          // must encode, (otherwise, special char '&' feed into SQL, will cause error, example: 'ALLE EMIL J & DOLORES J FAMILY TR' will cause error )
                                                          var _encoded_fieldName = encodeURIComponent(current_selected_field_name)
                                                          var _encoded_fieldValue = encodeURIComponent(current_selected_field_value)

                                                          if (! current_selected_field_value){

                                                                // 'null' value,  example:     ?&where=tennis_court is null
                                                                _____search_parameter = '&where='+  _encoded_fieldName + ' is null'


                                                          } else{

                                                                    if (_feature_attributes_string.includes(current_selected_field_name)) {

                                                                                // field type is string , where='xxxxx' 
                                                                                _____search_parameter = '&where='+ _encoded_fieldName + "='" + _encoded_fieldValue + "'"

                                                                    } else {

                                                                                  // field type is not string, where=89876   could be id objectid, oid, int, double ... 
                                                                                  _____search_parameter = '&where='+ _encoded_fieldName + "=" + _encoded_fieldValue
                                                                    }

                                                          } // null  






                }// if name

            //   *****  end     *****   classified , filter by     *****  

                // socrata only  https://data.cityofnewyork.us/api/id/vx8i-nprf.json?$select=count(*)&$q=virgin
                //var _url_count = _url + '/'+  _layer_id + '.json?$select=count(*)'+   '&$where=' + _____search_parameter;

                // arcgis only
                var _url_count = ___url + '/'+  _layer_id + '/query?f=json&returnCountOnly=true'+ _____search_parameter;
                console.log('_url_count ',_url_count);
                  
                      
                // ---------- count pagination ---------------
                _current_count_of_feature = await ajax_cross_origin(_url_count, _cross)
                
               // {count: 170825}
               if (! _current_count_of_feature.count) {
                      // does not exist
                      // no result empty
                      
                      _current_count_of_feature = 0
                      display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                     
                       
                      console.log('nothing found ---- ',_current_count_of_feature)

                      //  ...... empty card panel and json-editor ...... 
                                      page_sources=[];
                                      $('#pagination-container').pagination({
                                        dataSource: page_sources,
                                        pageSize: page_size,
                                        showGoInput: true,
                                        showGoButton: true,
                                        className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                                        callback: function(data, pagination) {

                                                        
                                                        show_json_viewer([],'Empty',  '')

                                                        $('#message_field').empty();

                                        }
                                      })   //$('#pagination-container) 

                      //  ...... empty card panel and json-editor ...... 


               } else {

                 // does exist

                 _current_count_of_feature = _current_count_of_feature.count
                        
                 console.log(' current count of feature ',  _current_count_of_feature);
                 display_count_info(_layer, _current_count_of_feature, _total_count_of_feature)
                

                 // -------------- search result paging or not  --------------
                 if ((_supportsPagination) && (_search_result_paging_or_not == 'paging')){

                          // pagination supported
                          $('#pagination-container').show()

              
                          page_sources=[];
                          for (var i = 1; i <= _current_count_of_feature; i++) {
                                  page_sources.push(i);
                              }//for
                            
                          
                          $('#pagination-container').pagination({
                              dataSource: page_sources,
                              pageSize: page_size,
                              showGoInput: true,
                              showGoButton: true,
                              className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                              callback: function(data, pagination) {
              
                                console.log('pagination call back data, returned data -> ', data) 
                                  // .... fix bug if data is [] ....
                                  var _off_set;
                                  if (data.length == 0) {
                                      _off_set = 0;
                                  }else {
                                    _off_set = data[0]-1;
                                  }
                                  // .... fix bug if data is [] ....


                                  
                                  console.log('pagination --- ', pagination)
              
                                  get_paged_json_by_limit_and_offset(_____search_parameter,page_size,_off_set);
                            
                              }
                          })   //$('#pagination-container) 


                  } else { 

                     // user choose no-paging,  or this arcgis server do not support pagination

                     // pagination not supported, should hide pagination bar
                     $('#pagination-container').hide()

                     var _url_no_paging = ___url + '/'+   _layer_id + '/query?returnGeometry=false&f=json&outFields=*&outSR=4326'  + _____search_parameter  
                     console.log('_url_no_paging :::: ',_url_no_paging);

                     // empty json editor
                     show_json_viewer({features:[]},'Empty',  '')
                     var success_returnBack= await ajax_cross_origin(_url_no_paging,  _cross);  // cross origin method 
                     console.log('success_returnBack from _url_no_paging ',success_returnBack)

                     if (success_returnBack.features) {


                      /*

                           only need attributes, do not need geometry, url must add  '/?returnGeometry=false&'

                            [
                              {attributes: {…}, geometry: {…}}
                              {attributes: {…}, geometry: {…}}
                            ]
                      
                      */

                            var _features_array = success_returnBack.features
                            var _attribute_array = []
                            var _properties_alias
                            for (let f = 0; f < _features_array.length; f++) {
                              _properties_alias = addAliasToFieldName(_features_array[f].attributes, field_alias)
                              _attribute_array.push(_properties_alias)
                            }


                          show_json_viewer(_attribute_array,'records',  current_selected_field_value)


                    }


                  }// if paging

               }// if count

                    // ----------   end --------- count pagination ---------------

              } catch(err) {

                console.error(' catch error : ', err)

                

                  
              }// try catch

          }   



















          

          // init entry
          $( document ).ready( async function() {
            
            init_global_var_from_node();
             console.log(' root url ', _url)

            init_json_viewer_for_table();
            init_card_toggle();

            init_user_interface_event()
           
            await get_feature_attributes_onlyForFeatureTable(_layer_id)

            build_field_list()
             
            get_total_count()
            

            pre_select_field_level()
            
            // main entrance, everything start here
           // resetPagination(); // suppose to be here, but move to  pre-select-node completed
            
          });
