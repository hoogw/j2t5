 
 
// with mark.js,   But no lunr.js ( search = name + domain, need add both field to lunr )    use for-loop, because only 300 item, no need) 




/*
//  test range start , and     .../?start=10&end=20    
//  test mode                   .../?test_mode=1
//  test category               .../?default=1
                                       &cors=1
                                       &jsonp=1
                                       &proxy=1 
                                       &https=1
                                       &http=1
                                     
                                        &audit=1 // 1 means only show  'previously check the site is not available audit='1'
                                                 //by default, without this paramerter, will show all,        
                                       
                      &localdomain=1  //by default, without this paramerter, will use production domain,  
                                      // with this parameter , 1 means, use localhost:3000/restapi....

//  http://localhost:10/json2tree/esri/check/arcgisServerCheck.html?start=1&end=10&test_mode=0&default=1&cors=0&jsonp=0&proxy=0&https=0&http=0



*/

  
  
  
  
  
  
  
  
  // domainlist_live.html get list by  live rest api (http://api.us.socrata.com/api/catalog/v1/domains)
  //  domainlist.html  get list from mysql 
  
  
  
  // this is "domain" version
  
  /*
                                                       *   {
                                                            "results" :
                                                              [
                                                                { "domain" : "2014bonds.cityofws.org", "count" : 5 },
                                                                { "domain" : "amopen.amo.on.ca", "count" : 94 },
                                                                { "domain" : "apd-data.albanyny.gov", "count" : 36 }
                                                              
                                                               ],
                                                            "resultSetSize" : 274,
                                                            "timings" : { "serviceMillis" : 22, "searchMillis" : [ 10, 15 ] }
                                                          }
                                                    */
  
  
  
  // static json 
  // https://transparentgov.net/json2tree/js/utility/domain_count.json
  // http://j2t.transparentgov.net/domainlist.html?url=https://transparentgov.net/json2tree/js/utility/domain_count.json
  // 
  // 
  //
  //live dynamic json
  //http://j2t.transparentgov.net/domainlist.html?url=https://api.us.socrata.com/api/catalog/v1/domains
  //
  //
  //j2t.transparentgov.net
  //http://localhost:10/json2tree
  //
  //
  //
//get all domains
   // http://api.us.socrata.com/api/catalog/v1/domains
   
   
   
   
   
  // dataset
  // https://agv1.transparentgov.net/socrata/dataset/default?layer=Sex_Offenders&url=https://data.cityofchicago.org/resource&layer_id=cjcg-yw47

   
  // map 
 //  http://agv1.transparentgov.net/socrata/googlemaps/default?url_id=12&layer_id=r9g3-4ubb&layer=Senior_Centers&value={%22location_field%22:%22location%22}&center_lat=41.84707799851276&center_long=-87.67753598140399&center_zoom=11
 
    

//for test mode only. Test mode will re-use this re-render  
 var current_showing;  // this hold value current showing, could be whole dataset, could be filtered dataset, for test mode only. Test mode will re-use this re-render 

 

// production must set as false,  only at localhost set as true
var insert_sql_yes_or_no = false;
 

 var input_current;    // whole array of json, without filter, this is downloaded full dataset
 var _filtered_results   // filtered results
 
 
 var _filter_by // search filter by keyword
              
 var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'
  
 var current_filter_result_count;
 var __total_item_count;


var timeout_for_test= 5000








         //  ====== special for check url live or NOT  ==========
      

                var test_mode = false;

                // fix bug, filter by conflict with test mode = 1, must turn off test mode, when filter by  
                var _filter_result_by;


          //  ====== special for check url live or NOT  ==========





/**/







         //  ====== special for check url live or NOT  ==========

              function build_test_url(_rest_api_endpoint, _operation){

           

                              //....................... URL to get domain content   ..........................

                                  //  'https://api.us.socrata.com/api/catalog/v1?search_context=data.seattle.gov&limit=1'
                                    
                                  // warning: _rest_api_endpoint is only domain 'data.seattle.gov'

                                    _rest_api_endpoint = 'https://api.us.socrata.com/api/catalog/v1?limit=1&search_context='+ _rest_api_endpoint  

                                   // now  _rest_api_endpoint is a valid URL
                              //....................... end ............. URL to get domain content .............................







                              var _test_url= _rest_api_endpoint


                              switch (_operation) {

                                case 'default':
                                  

                                  break;




                                  case 'cors':

                                  break;




                                  case 'jsonp':

                                    
                                  break;


                                  case 'proxy':


                                        // fetch + proxy (bypass cors)

                                        //  ****** cors ******

                                            // some site that doesn’t send Access-Control-*, our browser will block response as No 'Access-Control-Allow-Origin' header is present on the requested resource  
                                            // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
                                            // we must add such header via this proxy
                                            //const proxyurl = "https://cors-anywhere.herokuapp.com/";

                                            //const proxyurl = "http://localhost:7000/";
                                            //const proxyurl = "https://localhost:7200/";

                                            if (_rest_api_endpoint.includes('https://')){

                                                      proxyurl = "https://transparentgov.net:7200/";
                                            } else{

                                                    proxyurl = "http://transparentgov.net:7000/";  
                                            }

                                        //  *** end *** cors ******





                                      _test_url =   proxyurl  +  _test_url

                                    


                                  break;

                                  

                                  case 'https':

                                      
                                      _test_url = _rest_api_endpoint.replace('http://','https://') 
                                      
                                      
              

                                  break;


                                  case 'http':


                                      

                                      _test_url = _rest_api_endpoint.replace('https://','http://') 

                                    

                                  break;

                                default:
                                  console.log('Sorry, we are out of ' + _operation + '.');
                              }





                              return _test_url;

              }





              async function update_domainlist(_which_id,   _totalResourceCount, _audit ){
                /*
                          working example
                                          http://localhost:3000/restapi/domain_list?update=*&set=resource_count=999,audit=0&where=id=500
                */
                
                var _update_url = "http://localhost:3000/restapi/domain_list?update=*&set=resource_count=" + _totalResourceCount + ",audit=" +  _audit    + "&where=id=" + _which_id
          
                var update_result  = await ajax_datatype_json(_update_url, timeout_for_test);
          
                return update_result
              }
          
          



          async function check_url(_test_url, _operation, __id){

                        var _status = 'online'
                        var _results = { 
                                          status: _status, 
                                          message : 0, 
                                        }
                        var _rsp
                        var _update_result
                        // show on message 
                        var _msg=  $('#message_div').text();
                 
                        switch (_operation) {

                            case 'default':
                              
                                $('#message_div').text(_msg + ' ' + _test_url );

                                console.log(' test default ajax_datatype_json', _test_url)
                                _rsp = await ajax_datatype_json(_test_url, timeout_for_test);

                              

                              break;




                              case 'cors':

                                  $('#message_div').text(_msg + ' ' + _test_url );


                                  console.log(' test CORS  fetch_only', _test_url)
                                  _rsp = await fetch_only(_test_url, timeout_for_test);

                              break;




                              case 'jsonp':

                                  $('#message_div').text(_msg + ' ' + _test_url );

                                  console.log(' test default  ajax_jsonp_only', _test_url)
                                  _rsp = await ajax_jsonp_only(_test_url, timeout_for_test);

                              
                              break;


                              case 'proxy':



                                  $('#message_div').text(_msg + ' ' + _test_url );


                                  console.log(' test Proxy  fetch_proxy', _test_url)

                                  try{
                                              _rsp = await fetch_only(_test_url, timeout_for_test);
                                  } catch{

                                          // failed
                                            _rsp = null
                                  }


                              break;

                              

                              case 'https':

                                  
                                 
                                  
                                  $('#message_div').text(_msg + ' ' + _test_url );
                                  console.log(' test https  ajax_datatype_json', _test_url)
                                  _rsp = await ajax_datatype_json(_test_url, timeout_for_test);
          

                              break;


                              case 'http':


                                  

                               

                                  $('#message_div').text(_msg + ' ' + _test_url );
                                  console.log(' test http  ajax_datatype_json', _test_url)
                                  _rsp = await ajax_datatype_json(_test_url, timeout_for_test);
          

                              break;




                            default:
                              console.log('Sorry, we are out of ' + _operation + '.');
                        }

                        $('#message_div').text(_msg);
                        console.log('_rsp ****>>>> ', _rsp)
                                
                        if (_rsp){
                                            //console.log('Success  YES',_test_url,  _rsp)
                                            console.log('Success  YES',_test_url)
                                            _status = true;

                                            if (insert_sql_yes_or_no){
                                                //alert('insert sql ?')
                                                _update_result = await update_domainlist(__id, _rsp.resultSetSize, 0)  // 0 means available ok
                                                console.log('update success domainlist set audit is 0', _update_result)
                                            }
                         } else {
                                    console.log('failed -> _rsp', _test_url,  _rsp)
                                    _status = false;
                                    if (insert_sql_yes_or_no){
                                      //alert('insert sql ?')
                                      _update_result = await update_domainlist(__id, 0, 1) // 1 means unavailable
                                      console.log('update success domainlist set audit is 0', _update_result)
                                  }


                         }
                         return _status
          }









        async function rendering_json_to_html(json) {
          
                console.log('test_range_start ', test_range_start)
                console.log('test_range_end  ', test_range_end)
        
                var _results = json;

                var html = '';
                var html_top ='';    // only for check page, show html part from 1 to star point
                var html_check_progressing =''; // only for check page, show html par from 1 to just checked progressing one
             
                /*  
                          //--- sort domain by count --- 
                          //only for live list from socrata
                          //......Must have {count:587,......}, without count:xxx, or count is different name, must update compare function. 
                        _results.sort(compare);
                */
                         
                // ---------- build --------------
                
                            html += '<div>';
                            if (_results.length > 0) {
                                html += '<ol class="custom-counter">';
                                for (var i = 0; i < _results.length; ++i) {


                                    // domain with 0 count will not display, NO, still need to display, because, 
                                    // sometime, socrata api error, all count is 0, will result nothing on list
                                  // if (_results[i].count > 0 )
                                    //{


                                            html += '<li>' // css .ordered_list_number{ size font}

                                                  //  ====== special for check url live or NOT  ==========
                                                  /**/
                                                        // test mode must be true, and within test range
                                                        if ((test_mode) && (   i>= (test_range_start-1) && i<test_range_end  )) {
                                                              console.log('test range  ',  test_range_start,  i,  test_range_end)
                                                              //--- must --- show from 1 to start point part --- before long time checking started ----- 
                                                              html_top = ''
                                                              html_top = html
                                                              html_top += '</ol>';
                                                              html_top +='</div>';
                                                              $('#json-renderer').html(html_top);
                                                              //--- must --- show from 1 to start point part --- before long time checking started ----- 
                                                               /**/
                                                                // must be local here, get real time value 1 or 0
                                                                  var test_category_value = [test_default, test_cors, test_jsonp, test_proxy, test_https, test_http]

                                                                  for (var c=0; c< test_category.length; c++){
                                                                      if (test_category_value[c] == 1){
                                                                            // test result
                                                                                    var _testURL = build_test_url(_results[i].domain_url, test_category[c])
                                                                                    html += '<a target="_blank" href="' + _testURL + '">';
                                                                                    var _live_status = await check_url(_testURL,  test_category[c], _results[i].id);
                                                                                    if (_live_status) {
                                                                                                          
                                                                                                        html += '<span class="mdi mdi-' +  test_category_icon[c] +'"></span>'   

                                                                                    } else {  
                                                                                                        html += '<span class="mdi mdi-close-octagon"></span>'   

                                                                                    }
                                                                                    html += '</a>&nbsp;';
                                                                      } else {
                                                                          // skip
                                                                                  html += '<a target="_blank" href="' + _testURL + '">';
                                                                                  html += '<span class="mdi mdi-circle-small"></span>'
                                                                                  html += '</a>&nbsp;';
                                                                    }
                                                                  }// for 
                                                        } 
                                                  //  ====== end ======  special for check url live or NOT  ==========
                                                  /**/

                                              //  ###### audit icon ######
                                                      if (_results[i].audit == 1) {
                                                        html += '<span class="mdi mdi-close-octagon"></span>'
                                                      } else {
                                                        html += '<span class="mdi mdi-check"></span>'
                                                      }
                                              //  ###### audit icon ######
                                               /**/

                                              var __organization = _results[i].organization;
                                              if ((__organization == undefined) || (__organization == null))
                                              {
                                                  __organization ='';
                                              }
                                              //  console.log('__organization  ========= ',__organization);
                                            
                                            html += '<a target="_blank" href="https://' + _results[i].domain_url + '" class="json-string">';
                                              html += '<span class="mdi mdi-satellite-uplink" ></span>';
                                            html += '</a>&nbsp;';


                                              /**/
                                              //  ###### socrata totalItemCount ######
                                                        var _resource_count = _results[i].resource_count
                                                        if ((_resource_count) && (_resource_count !== '0')){
                                                                html += '<span class="context"><sub>items['  + _resource_count + ']</sub>&nbsp;&nbsp;'+ '</span>'
                                                        }
                                              //  ###### socrata totalItemCount ######
                                              /**/
                                              html += '<span>id(' + _results[i].id + ')</span>&nbsp;' 

                                          /*
                                          //http://j2t.transparentgov.net/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains=data.cityofnewyork.us%26limit=10000
                                          //https://transparentgov.net/json2tree/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains=data.cityofnewyork.us%26limit=10000

                                          // no need to specify order=page_views_total+DESC or order=page_views_total20%DESC
                                          // default is order by total views count

                                          //html += '<a target="_blank" href="' + window.location.protocol + "//" + window.location.host + linkToPathname  + '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='+ _results[i].domain +  '%26limit=10000" class="json-string">';
                                         // working "a" tag                 
                                            html += '<a target="_blank" href="' + window.location.protocol + "//" + window.location.host + linkToPathname  
                                            html += '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                            html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC'
                                            html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom 
                                            html +=  '">';
                                                      html += '<span class="mdi mdi-magnify" ></span>';
                                            html +='</a>&nbsp;';
                                           */
                                            html += '<button class="click_change_style" onclick="window.open(\''  + window.location.protocol + "//" + window.location.host + linkToPathname  
                                            html += '/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains='
                                            html +=  _results[i].domain_url +  '%26limit=10000%26order=page_views_total%20DESC'
                                            html += '&center_lat='+_results[i].center_lat + '&center_long=' +_results[i].center_long + '&center_zoom=' +_results[i].center_zoom
                                            html +=  '\',\'_blank\')">';
                                                      html += 'open';
                                            html += '</button>'

                                          // add organization
                                          html +='&nbsp;&nbsp;';
                                          // text                         organization
                                          html += '<span class="context"><b>' + __organization +  '</b>&nbsp;&nbsp;</span>' 
                                          html +=   '<a target="_blank" href="https://'  + _results[i].domain_url +  '">';
                                          html +=     _results[i].domain_url
                                          html +=   '</a>'; 

                                          html += '<br>'; 
                                          html += '</li>';
                                          
                                          
                                                      //  ====== show checking progress :  special for check url live or NOT  ==========


                                                        // only within test range, show progress(will slow down), outside test range, do not slow down(not show progress)
                                                          // test mode must be true, and within test range
                                                          if ((test_mode) && (   i>= (test_range_start-1) && i<=test_range_end  )) {  

                                                          
                                                            html_check_progressing = ''
                                                            html_check_progressing = html
                                                            html_check_progressing += '</ol>';
                                                            html_check_progressing +='</div>';
                                                            $('#json-renderer').html(html_check_progressing);
                                                    }

                                                  //  ====== end ============ show checking progress : special for check url live or NOT  ==========

                                }// for
                                html += '</ol>';
                            }
                            html +='</div>'
                            $('#json-renderer').html(html);
              
                            // everytime render finished should set test mode to false
                            test_mode = false
        }  // function  
          
  
  
  






                    //  ====== special for check url live or NOT  ==========
                    function  init_test_mode(){

                      if ( window.location.host.includes('localhost:10')){
                        insert_sql_yes_or_no = true;
                      }

                      $("#test_range_start_text").val(test_range_start)
                      $("#test_range_end_text").val(test_range_end)

                      
                      if (test_mode_parameter == 1){ 
                        test_mode = true
                      } else {
                        test_mode = false
                      } 





                      if (test_default == 1){ 
                        
                        $("#test_default_checkbox").prop("checked", true);

                      } else {
                        $("#test_default_checkbox").prop("checked", false);
                      } 



                      if (test_cors == 1){ 
                        
                        $("#test_cors_checkbox").prop("checked", true);

                      } else {
                        $("#test_cors_checkbox").prop("checked", false);
                      } 



                      if (test_jsonp == 1){ 
                        
                        $("#test_jsonp_checkbox").prop("checked", true);

                      } else {
                        $("#test_jsonp_checkbox").prop("checked", false);
                      } 



                      if (test_proxy == 1){ 
                        
                        $("#test_proxy_checkbox").prop("checked", true);

                      } else {
                        $("#test_proxy_checkbox").prop("checked", false);
                      } 
                      



                      if (test_https == 1){ 
                        
                        $("#test_https_checkbox").prop("checked", true);

                      } else {
                        $("#test_https_checkbox").prop("checked", false);
                      } 



                      if (test_http == 1){ 
                        
                        $("#test_http_checkbox").prop("checked", true);

                      } else {
                        $("#test_http_checkbox").prop("checked", false);
                      } 



                  }






            // --------------------- test ui --------------------------

                    $("#test_now_button").click(function(){
                                                      
                      var validate_input = false;
                        test_mode = 1;
                        update_url_parameter('test_mode', 1)



                    //console.log(test_range_start , Number.isInteger(test_range_start))

                    test_range_start = parseInt($('#test_range_start_text').val(), 10)
                    test_range_end = parseInt($('#test_range_end_text').val(), 10)


                    console.log('test_range_start, test_range_end, __total_item_count', test_range_start, test_range_end, __total_item_count)
                    
                    
                    
                    console.log(isNaN(test_range_start));
                    console.log(isNaN(test_range_end));
                    console.log((test_range_start < 1 ));
                    console.log((test_range_start >__total_item_count));
                    console.log((test_range_end < 1 ));
                    console.log((test_range_end >__total_item_count));
                    console.log((test_range_end < test_range_start) );


                      if (
                            
                              
                              (test_range_start < 1 ) || 
                              (test_range_start >__total_item_count) ||
                              (test_range_end < 1 ) || 
                              (test_range_end >__total_item_count) ||
                              (test_range_end < test_range_start) 

                              
                      ){


                            validate_input = false
                            test_mode = 0
                            $("#message_test_ui").html('<span class="mdi mdi-24px mdi-alert">&nbsp;&nbsp;Start/End must within a valid range</span>')


                          } else {

                          validate_input = true
                          test_mode = 1

                          }



                          if (
                              (
                                (test_default == 0) && 
                                (test_cors == 0)    && 
                                (test_jsonp == 0)   && 
                                (test_proxy == 0)   && 
                                (test_https == 0)   && 
                                (test_http == 0)
                              )
                          ){

                                validate_input = false
                                test_mode = 0
                                $("#message_test_ui").html('<span class="mdi mdi-24px mdi-alert">&nbsp;&nbsp;At least check 1 category</span>')


                              } else {

                            validate_input = true
                            test_mode = 1
                            }





                        

                        


                          if (validate_input) {

                                    test_mode = true

                                    
                                    rendering_json_to_html(current_showing)
                          }



                      
                      
                  });







                    $("#test_range_start_text").keyup(function(){

                      test_range_start =  $('#test_range_start_text').val();
                      update_url_parameter('start',test_range_start);
                      $("#message_test_ui").html('')
                    });

                    $("#test_range_end_text").keyup(function(){

                      test_range_end =  $('#test_range_end_text').val();
                      update_url_parameter('end',test_range_end);
                      $("#message_test_ui").html('')
                    });


                    $("#test_https_checkbox").change(function() {

                      $("#message_test_ui").html('')

                      if($(this).is(":checked")) {
                        // console.log("Is checked");
                        test_https = 1
                        update_url_parameter('https',1);
                      }
                      else {
                        // console.log("Is Not checked");
                        test_https = 0
                        update_url_parameter('https',0);
                      }
                    })


                    $("#test_http_checkbox").change(function() {
                      
                      $("#message_test_ui").html('')

                      if($(this).is(":checked")) {
                        // console.log("Is checked");
                        test_http = 1
                        update_url_parameter('http',1);
                      }
                      else {
                        // console.log("Is Not checked");
                        test_http = 0
                        update_url_parameter('http',0);
                      }
                    })


                    $("#test_default_checkbox").change(function() {
                      
                      $("#message_test_ui").html('')
                      
                      if($(this).is(":checked")) {
                        // console.log("Is checked");
                        test_default = 1
                        update_url_parameter('default',1);
                      }
                      else {
                        // console.log("Is Not checked");
                        test_default = 0
                        update_url_parameter('default',0);
                      }
                    })


                    $("#test_cors_checkbox").change(function() {
                      
                      $("#message_test_ui").html('')
                      
                      if($(this).is(":checked")) {
                        // console.log("Is checked");
                        test_cors = 1
                        update_url_parameter('cors',1);
                      }
                      else {
                        // console.log("Is Not checked");
                        test_cors = 0
                        update_url_parameter('cors',0);
                      }
                    })


                    $("#test_jsonp_checkbox").change(function() {
                      
                      $("#message_test_ui").html('')
                      
                      if($(this).is(":checked")) {
                        // console.log("Is checked");
                        test_jsonp = 1
                        update_url_parameter('jsonp',1);
                      }
                      else {
                        // console.log("Is Not checked");
                        test_jsonp = 0
                        update_url_parameter('jsonp',0);
                      }
                    })
                    

                    $("#test_proxy_checkbox").change(function() {
                      
                      $("#message_test_ui").html('')
                      
                      if($(this).is(":checked")) {
                        // console.log("Is checked");
                        test_proxy = 1
                        update_url_parameter('proxy',1);
                      }
                      else {
                        // console.log("Is Not checked");
                        test_proxy = 0
                        update_url_parameter('proxy',0);
                      }
                    })
                    


                // ----------- end ---------- test ui --------------------------











  






















  
  
  
                    //-------------- sort domain by count ----------------------
                    // Sort array of objects by string property value
                    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
                    
                    function compare(a,b) {
                    if (a.count < b.count)
                      return 1;
                    if (a.count > b.count)
                      return -1;
                    return 0;
                  }

                    //-------------- sort domain by count ----------------------
  
  
  
  
  
  
  
  
  
  /**/
  
  
  
  
  
  
  
  
                  //   *******  search event related   *******   


                                            
                                  function search_layer_now() {

                                          test_mode = false                         

                                        
                                                                                                        
                                            // reset scroll position to 0, means top 
                                            $("#json-renderer").scrollTop(0);

                                          
                                                        




                                        _filter_by = $('#filter_by').val().toLowerCase().trim();

                                          
                                          var _filter_by_array = _filter_by.split(" ");
                                          
                                          console.log('_filter_by  --->  ', _filter_by)
                                          
                                          update_url_parameter('filter_by', _filter_by);
                                          
                                          
                                          
                                            if (_filter_by.length > 0) {  
                                          
                                          
                                                        $('#clear_search_result_button').show();


                                          
                                                // ............. filter results  ....................
                                          
                                                            
                                                            _filtered_results = [];
                                                          
                                                            
                                            
                                                                
                                                            if (input_current.length > 0) {

                                                                    for (var i = 0; i < input_current.length; ++i) {

                                                                        /*
                                                                          *   {
                                                                              "results" :
                                                                                [
                                                                                  { "domain" : "2014bonds.cityofws.org", "count" : 5 },
                                                                                  { "domain" : "amopen.amo.on.ca", "count" : 94 },
                                                                                  { "domain" : "apd-data.albanyny.gov", "count" : 36 }
                                                                                
                                                                                  ],
                                                                              "resultSetSize" : 274,
                                                                              "timings" : { "serviceMillis" : 22, "searchMillis" : [ 10, 15 ] }
                                                                            }
                                                                      */
                                                                      
                                                                      
                                                                        // for domainlist_live only
                                                                        // var _test_string = input_current[i].domain + ' ' + organization[input_current[i].domain];
                                                                        
                                                                        
                                                                        // for domainlist static only
                                                                        var _test_string = input_current[i].domain_url + ' ' + input_current[i].organization;
                                                                        
                                                                        
                                                                        _test_string = _test_string.toLowerCase();
                                                                        
                                                                        
                                                                        
                                                                        
                                                                                      var _valid = true;

                                                                                      //_filter_by_array.forEach(function(word){
                                                                                                          for (var k = 0; k < _filter_by_array.length; ++k) {





                                                                                                              // if(_test_string.includes(word)) {
                                                                                                              if(_test_string.indexOf(_filter_by_array[k]) > -1) {
                                                                                                                    // contain


                                                                                                                }else {
                                                                                                                    // Not contain

                                                                                                                    _valid = false;

                                                                                                                }// else





                                                                                                          } //for
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        if (_valid) {
                                                                            
                                                                              _filtered_results.push(input_current[i]);
                                                                            
                                                                        }
                                                                        
                                                                          
                                                                        
                                                                        
                                                                        
                                                                        
                                                  
                                                                    }// for
                                                                  
                                                        
                                                            }// if
                                                  
                                            
                                                        
                                          
                                          

                                                            show_current(_filtered_results, '_filtered_results')
                                        
                                            
                                      
                                          
                                                                                        
                                                                                          
                                                  // ..........  End ... filter results base on _search_for  ....................          

                                          } else {
                                                
                                                
                                                // only if filter by empty keyword, re-render whole data set
                                                // same idea, but clear search result will also remove clear button, update url param etc....
                                                //rendering_json_to_html(input_current)
                                                clear_search_result()
                                                
                                            }

                                            // fix bug, must init tooltips(), every time get new search result
                                            // $('.tooltipped').tooltip();

                                    }





                                    function clear_search_result(){

                                      test_mode = false


                                        $('#clear_search_result_button').hide();   

                                        $('#filter_by').val('');
                                      
                                        _search_data_content='';
                                        update_url_parameter('filter_by','');


                                      
                                        
                                      show_current(input_current, 'input_current')


                                          
                                    }










                                    function show_current(_current_showing, _render_all_signal) {
                                      // only show short list = 100, if more than limit, also mark  'need_render_all' 
                                      
                                      

                                      // test mode only 
                                      current_showing = _current_showing
                                                
                                                                                                                                    
                                                  current_filter_result_count = _current_showing.length
                                                  
                                                 
                                                  display_count_info('', current_filter_result_count, __total_item_count, 'counter_label')
                                                
                                                  rendering_json_to_html(_current_showing)
                          
                                                  highlight_keywords()
                          
                                  }
                          
                            



                                    function init_search_button_event_handler(){

                                                // click search
                                                $('#start_search_button').click(search_layer_now) 


                                                // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                                                $('#filter_by').on('search', search_layer_now);
                                          


                                                  // search bar close icon clicked. clear everything.
                                                  $('#clear_search_content').on('click', clear_search_result);




                                                  $('#clear_search_result_button').hide();
                                                  $('#clear_search_result_button').click(clear_search_result);






                                                  // fire when user every stroke any key  
                                                  $("#filter_by").keyup(search_layer_now);


                                                  
                                                  // only fire when text field loose focus,  not fire when stroke any key  
                                                  // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                                  // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                                  // $("#filter_by").change(search_layer_now);



                                    }



                    //   *******   end  ******   search event related   *******      



  
  
  
  
  
  
  
  
  
  
  // document ready short hand
  
  
  (async function($){
  
   
   
   
    
         
          init_global_var();


          init_search_button_event_handler();

        


          
          init_test_mode()
   
   



            //  ====== special for check url live or NOT  ==========


                // must remove '/check' from  relative path, / is special char in js, open close regex,  must use \ to escape forward slash
                // https://regex101.com was used to generate regex
                const regex = /\/check/gm;
                linkToPathname = linkToPathname.replace(regex, '')




                console.log(' linkToPathname #### ', linkToPathname.replace(regex, ''),    linkToPathname)

            //  ====== special for check url live or NOT  ==========

   
   







            var ___url_getJson = get_domain_list_url()


                  



                  
                  
                
                  input_current = await ajax_getjson_common(___url_getJson);
                  
                  
                   
                  
                  // for option 3 above from mysql only 
                  //============= static json and socrata api have "results" =============
                  // but our mysql rest api do not have "results", must add.
                        if (input_current.hasOwnProperty('results')){

                           // warning:    array is input_current.results
                            input_current = input_current.results
                  

                         } 
                   //================================== static json and socrata api have "results" =============
                  
            
                  
                  
               
                  
                 __total_item_count = input_current.length;
                 //  console.log('input_current length', __total_item_count)
                   
                  
 

              
              
              // first time load all  
              $('#clear_search_result_button').hide();
              show_current(input_current, 'input_current')

  
  
  
              filter_result_by_filter_by()
              $(".progress").hide(); 
  
})(jQuery);
