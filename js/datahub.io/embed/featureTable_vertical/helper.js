

var options = {};
          
var input = {};

var _timeout = 7000;

var layers_flat;


  var current_url;
  var current_pathname;
  var current_pathArray;
  var linkToPathname = "";
  
  
  var urlParams;
  var ___url_string;
  var ___portal_id;
  
  
  //var _center={"_center_lat": ... , "_center_long": ...};
  var _center={};
    
    
  





       
  // .....url parameter ..... global .......     
  var _organization = 'Arcgis Server';   
  var _center_lat;
  var _center_long;
  var _center_zoom;
  
  
  var ___url;
  var ___protocol  // this is means url paramter protocol  ?..&url=https://....
  var ___hostname 
  var ___pathname 
  var ___urlParams        
  var ___pathArray
  var ___service
  
  var _layer
  var _layer_id
 
  
  
  
  
  var native_renderer = null;
  
  
  
  
                                          //------------ search feature --------
                                          var _feature_attributes =[];
                                          var _feature_attributes_string =[];
                                          var _feature_attributes_integer =[];
                                          var _feature_attributes_double =[];
                                          var _feature_attributes_date =[];
                                          //---------  End --- search feature --------

                
                
                
                


  




  
  
  
           //.............search layers section (arcgis rest api).............

                          

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
                                                  
                              
                              
                              



                //=================== search button click =========================

                var _where_condition
               
                var ___url_getJson     
                var _search_data_content="";
                var _search_content_split














                




                function search_message(__message_content){
                                                  

                  document.getElementById('message_div').innerHTML = __message_content;
                  $(".progress").hide(); 

                  
            }


          
          //==========  End  ========== search button click =========================






/**/


                                                  
                 
                      
                      




                            // modified from get feature attribute
                            function parse_feature_attributes(_fields_array){

                              /*
                                try {
                                                // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
                                                // layer_id is 333, 
                                                    var _url_layer = _url + '/'+  layerID + '?f=pjson'

                                                  console.log('****',layerID)

                                                  //var response_string = await $.get(_url_layer);

                                                  // fix bug No 'Access-Control-Allow-Origin' header is present on the requested resource.
                                                  // dataType: 'jsonp',
                                                  var response_string =  await $.ajax({
                                                    type: 'GET',
                                                    dataType: 'jsonp',
                                                    data: {},
                                                    url: _url_layer,
                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                        console.log(jqXHR)
                                                    },
                                                    success: function (data) {
                                                      // console.log(data);

                                                        // note: data is already json type, you just specify dataType: jsonp
                                                        return data;
                                                    }
                                                });  











                                                  // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                                                  //is already a plain JavaScript object; no need to try to parse it.
                                                  var _layer
                                                  if (typeof response_string === 'object') {
                                                      // is object
                                                      _layer = response_string
                                                  } else {
                                                      // is string
                                                        _layer = JSON.parse(response_string)
                                                  }

                                          */



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
                                                /*_feature_attributes
                                                    // return result;
                                                    } catch (error) {
                                                        console.error(error);
                                                    }// try
                                                */

                        } 





  





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






  

















           //   *******  search event related   *******      

                    function search_layer_now() {

                      $('#clear_search_result_button').show();

                      //_search_data_content = $('#search_data').val().toLowerCase().trim();
                      //search,  case sensitive, do not lower-case
                      _search_data_content = $('#search_data').val().trim();

                      console.log('search  --->  ', _search_data_content)
                      update_url_parameter('search_data', _search_data_content);

                      resetPagination(_search_data_content);
                  
                }




                                
                function search_by_url_param(){


                  // based on URL ... &search_data=xxxx 
                    var ___url_search_for = urlParams.get('search_data');


                    console.log('url param search data',  ___url_search_for)

                    if ((___url_search_for == undefined) || (___url_search_for == null) || (___url_search_for == '')){


                      // browsing all data with pagination
                      resetPagination(_search_data_content);

                    }else {



                      ___url_search_for = ___url_search_for.toLowerCase().trim();

                        $('#search_data').val(___url_search_for);
                        

                        // search , no pagination, find api, does not have offset= limit=, can't do pagination
                        search_layer_now()



                    }

              }





                function clear_search_result(){
                          
                          _search_keyword = ''

                    $('#clear_search_result_button').hide();   

                    $('#search_data').val('')
                  
                    _search_data_content='';
                    update_url_parameter('search_data', '');

                    resetPagination(_search_data_content);
                }



                    


                    function init_search_button_event_handler(){

                                // click search
                                $('#start_search_button').click(search_layer_now) 


                                // default search, by enter
                                $('#search_data').on('search', search_layer_now);
                          


                                  // search bar close icon clicked. clear everything.
                                  $('#clear_search_content').on('click', clear_search_result);




                                  $('#clear_search_result_button').hide();
                                  $('#clear_search_result_button').click(clear_search_result);






                                  // only update URL search_data=xxx, not perform real search.
                                  $("#search_data").on('keyup', function(){


                                              _search_data_content = $('#search_data').val().toLowerCase().trim();

                                              console.log('search key word entered is ', _search_data_content);

                                              update_url_parameter('search_data', _search_data_content);
                                            
                                            

                                              
                                              if (_search_data_content.length == 0) {
                                                  
                                                clear_search_result()
                                              }



                                              $("#message_div").hide();
                                              search_message('');

                                });



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

                    }


          //   *******   end  ******   search event related   *******      














// ...... loading spinner with timer ......... jquery css   .........  



                   /**/

                   
                                     




                  

                  // special only for arcgis feature table and socrata dataset
                  function show_message(elementID_appendTo, text_message){
                              
                    // <span class="new badge">error</span>
                    
                  // var _text_panel = document.createElement('span');
                    //_text_panel.className = 'new badge';
  
                // <div> <p class="z-depth-1">z-depth-1</p></div>
                    var _text_panel = document.createElement('p');
                    _text_panel.className = 'z-depth-5';
  
                    _text_panel.innerHTML = text_message;
  
  
                    //
                    var element = document.getElementById(elementID_appendTo);
                    element.appendChild(_text_panel);
  
                    }
  



                  


                  


                  
//  ......   ......  end   ......  ...... loading spinner with timer ......... jquery css   .........  


