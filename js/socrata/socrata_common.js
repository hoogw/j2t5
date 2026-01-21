      
                

            function get_domain_list_url(){





                    



                        // ___url_string = 'https://api.us.socrata.com/api/catalog/v1?search_context=data.seattle.gov&limit=3'
                            
                        //   &limit=3  must encode to %26limit=3 , otherwise, it will regards another parameter instead of the part value of url
                        // ___url_string = 'https://api.us.socrata.com/api/catalog/v1?search_context=data.seattle.gov%26limit=3'
                        // 
                        
                        
                        
                        // there are many way to get domain list:
                        
                        //comment out which one you want. 
                        // var ___url_getJson =
                        
                        
                        
                        
                        // Option 1:       original live dynmic  
                                            // ___url_string =  'https://api.us.socrata.com/api/catalog/v1/domains'
                        
                        
                                            // var ___url_getJson = ___url_string;
                        
                        


                        
                        // option 2:          static json 
                                
                                                //static file local test
                                            // var ___url_getJson = 'http://localhost:10/json2tree/js/utility/domain_count.json';

                                                //static file production
                                            // var ___url_getJson = 'https://transparentgov.net/json2tree/js/utility/domain_count.json';







                        // option 3:              from mysql get domain_count.json from rest api
                        
                                                // local
                                                //var ___url_getJson = "https://localhost:3200/restapi/domain_count?select=*&orderby=count&asc_desc=desc";
                                                // production
                                            // var ___url_getJson = "https://transparentgov.net:3200/restapi/domain_count?select=*&orderby=asset_count&asc_desc=desc"






                        // option 4:              from mysql get domain_list from rest api 

                                                // production
                                            // var ___url_getJson = "https://transparentgov.net:3200/restapi/domain_count?select=*&orderby=asset_count&asc_desc=desc"


                                            // local
                                            // var ___url_getJson ="http://localhost:3000/restapi/domain_list?select=*&orderby=organization&asc_desc=asc";


                        var _current_host = window.location.hostname


                        // Do not filter out the dead link
                        // where=audit is null ( audit=1 means unavailable, audi is null means available)

                        if (_current_host.includes('localhost')){
                                //   local

                                // filter out the dead link
                                // return  "http://localhost:3000/restapi/domain_list?select=*&where=audit%20is%20null&orderby=organization&asc_desc=asc"
                               
                                //  include dead link
                                return  "http://localhost:3000/restapi/domain_list?select=*&orderby=organization&asc_desc=asc"
                               
                               
                                // temporary use production
                                // return  "https://transparentgov.net:3200/restapi/domain_list?select=*&orderby=organization&asc_desc=asc"

                        }else {                     
                                // production
                                // include dead link by remove (&where=audit%20is%20null)
                                return  "https://transparentgov.net:3200/restapi/domain_list?select=*&orderby=organization&asc_desc=asc"
                        }      





            }















      
      // socrata api always https, so far no http found, 
      // production no need port switch, https://transparentgov.net/json2tree/  --> https://transparentgov.net:3200/socrata
      // but local(no https) http://localhost:10 --> http://localhost:3000 or https://localhost:3200
      //.......... port http:3000   https:3200 ............. 
       var _port_http_https = ''
       if (window.location.protocol == 'http:') {
           _port_http_https = '3000'
           
       }else {
           _port_http_https = '3200'
       }
       //..... end ..... port http:3000   https:3200 ............. 





   /*
     var _apache_localhost_port = '80'
     if  (window.location.hostname == 'localhost'){
         _apache_localhost_port = '10'
     }
  */


var _full_geojson_url;


        

        // var url_template_base_dataset = 'https://agv1.transparentgov.net/socrata/dataset/default?';





        // rest api
         var url_template_base_dataset = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  + '/socrata/dataset/default?';

        // json 
         var url_template_base_dataset2 = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  + '/socrata/dataset2/default?';
         

        // csv 
        var url_template_base_dataset3 = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  + '/socrata/dataset3/default?';
                

         // classified rest api
         var url_template_base_dataset4 = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  + '/socrata/dataset4/default?';
         var url_template_base_dataset24 = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  + '/socrata/dataset24/default?';
         var url_template_base_dataset34 = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  + '/socrata/dataset34/default?';





        // var url_template_base_map     = 'https://agv1.transparentgov.net/socrata/googlemaps/default?';

        
        
        // google map searchable rest api
         var url_template_base_map     =  window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/socrata/googlemaps/default?';
 


        // google map vector geojson
        var url_template_base_map_google_geojson     =  window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps92/default?';
 
 
 






 
        // mapbox searchable rest api
         var url_template_base_map_2     =  window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/socrata/mapbox/default?';
 





 
       // mapbox_vector style
       // old socrata one
       //  var url_template_base_map_3     =  window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/socrata/mapbox_vector/default?';
       // current use genetic one 
       var url_template_base_map_3     =  window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/mapbox_vector/default?';
 








            // esri_geojson
        if  (window.location.hostname == 'localhost')
        {
               var url_template_base_map_4     =  window.location.protocol +  '//' + window.location.hostname + ':10'  +'/json2tree/arcgis/geojson/geojson.html?';
        } else {
            var url_template_base_map_4     =  window.location.protocol +  '//' + window.location.hostname + '/json2tree/arcgis/geojson/geojson.html?';
 
           }
 
 

          var _timeout = 30000;



 var organization = {};


  
  
  var current_url;
  var current_pathname;
  var current_pathArray;
  var linkToPathname = "";
  




  var urlParams;
  var ___url_string;
  var ___url;
  var base_url;
  
  var ___protocol; //   https:
  var ___hostname; //    api.us.socrata.com
  var ___pathname; //    /api/catalog/v1 
  var ___urlParams; //
  var ___domainName; //    data.seattle.gov
  var ___pathArray;
  var ___service;
  
  
  // by default, will trigger fly to first geometry  
  //   center_lat=40.72&center_long=-74&center_zoom=9
  var _center_lat=40.72;
  var _center_long=-74;
  var _center_zoom=13;
  var _center_zoom_for_apple='0.0001,0.0001';
  

  // only for search.js , limit the search result size
  var ___limit 
  
  


  // ----- special for checker page -----

        // arcgisServerCheck.html?start=1&end=10&test_mode=0&default=1&cors=0&jsonp=0&proxy=0 
        var test_range_start =1
        var test_range_end = 10  
        var test_mode_parameter = 0    // test_mode only available at checker page

        var test_category= ['default', 'cors', 'jsonp', 'proxy', 'https', 'http']
        
        var test_category_icon= ['alpha-d-box-outline', 'alpha-c-box-outline', 'alpha-j-box-outline', 'alpha-p-box-outline', 'shield-lock-outline', 'shield-alert-outline']
       


        var test_default = 1
        var test_cors = 0
        var test_jsonp = 0
        var test_proxy = 0
        var test_https = 0
        var test_http = 0

        var audit = 0  // 0 by default show all, 1 means only show audit='1',  2 means only show audit='2', 
        var localdomain = 0  // 0 by default use production domain,  1 means use local domain
                               
        

  // ----- special for checker page -----
  



  
  
   
  
  
  
  
                
         function init_global_var(){ 
                
                
                
                    // sample
                // http://localhost:10/json2tree/domain.html?url=https://api.us.socrata.com/api/catalog/v1?domains=data.seattle.gov%26limit=10000&order=page_views_total+DESC

                // order=page_views_total+DESC or order=page_views_total20%DESC
                
                
                        current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
                
                        console.log('current_url ...... ',current_url);
                        
                        
                        current_pathname = window.location.pathname;       //    /json2tree/domainlist.html
                        current_pathArray = current_pathname.split('/');   //["", "json2tree", "domainlist.html"]





                        //.......... for domainList.js only, not for domain .......................    


                            // bug fix i start from 1 instead of 0, otherwise, has 2 //,  //json2tree/domain.html
                                for (i = 1; i < current_pathArray.length-1; i++) {
                                linkToPathname += "/";
                                linkToPathname += current_pathArray[i];
                                }
                            console.log('linkToPathname----',linkToPathname);

                    //.......... end ........... for domainList.js only, not for domain .......................    












                        
                        
                                    // ----- parse url param ?url=xxxxxxxxxx  --------

                                            urlParams = new URLSearchParams(window.location.search);
                          
                                          /**/ 
                                          // ... ... .. .. . socrata category radio ... ... .. .. . 
                                          /**/ 
                                          
                                          var param_category = urlParams.get('category'); 
                                          if (param_category) {
                                            // socrata category use number 0, not use string '0',  esri category use string
                                            current_category = parseInt(param_category)
                                          } 
                                          // ... ... end .. .. . socrata category radio ... ... .. .. .
                                          /**/  
       
                             
                                                //.................. required parameter .................
                                                
                                                
                                                       
                                                
                                                    _center_lat = urlParams.get('center_lat');  
                                                    _center_long = urlParams.get('center_long');  
                                                    _center_zoom = urlParams.get('center_zoom');  
                                        
                                                     
                                                    // center lat could be 'NaN'  must handle it https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
                                                    if (  (_center_lat) && (! isNaN(_center_lat) ) && (_center_lat < 91 ) && (_center_lat > -91)       ){

                                                        } else {
                                                            _center_lat  = 33.836594; 
                                                            };

                                                    if ((_center_long) && (! isNaN(_center_long) ) && (_center_long < 181 ) && (_center_long > -181)   ){

                                                        } else { 
                                                                _center_long = -117.914299;
                                                                };

                                                    if ((_center_zoom) && (! isNaN(_center_zoom) ) && (_center_zoom < 30 ) && (_center_long > -1 )    ){

                                                        } else { 
                                                                _center_zoom = 16;
                                                                }
                                                    
                                                    _center={"_center_lat":_center_lat , "_center_long": _center_long};
                            
                           
                                        
                                                //.................. required parameter .................




                                            ___url_string = urlParams.get('url');

                                                                
                                            if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                                            {
                                                
                                                // nothing to do
                                                
                                            }else{
                                                                ___url = new URL(___url_string);   // ?url=https://api.us.socrata.com/api/catalog/v1?domains=data.seattle.gov%26limit=10000 
                                                                base_url = ___url_string;

                                                                ___protocol = ___url.protocol; //   https:
                                                                ___hostname = ___url.hostname; //    api.us.socrata.com
                                                                ___pathname = ___url.pathname; //    /api/catalog/v1 
                                                                ___urlParams = new URLSearchParams(___url.search); //
                                                                ___domainName = ___urlParams.get('domains'); //    data.seattle.gov

                                                                

                                                                ___pathArray = ___pathname.split('/');





                                                                console.log('___url ',___url);
                                                                console.log('___protocol ',___protocol);
                                                                console.log('___hostname ',___hostname);
                                                                
                                                                
                                                                console.log('domain ', ___domainName);
                                                                
                                            }            
                                            
                                            
                                                
                                                
                                               
                                                
                                        // ----- parse url param ?url=xxxxxxxxxx  --------
                            










                                          // ----- special for checker page -----

                                                test_range_start = urlParams.get('start');
                                                test_range_end =   urlParams.get('end');
                                                test_mode_parameter = urlParams.get('test_mode');    // test_mode only available at checker page
                                                test_default =  urlParams.get('default'); 
                                                test_cors = urlParams.get('cors'); 
                                                test_jsonp = urlParams.get('jsonp'); 
                                                test_proxy = urlParams.get('proxy'); 
                                                test_https = urlParams.get('https'); 
                                                test_http = urlParams.get('http'); 

                                                
                                                    //  global var available everywhere 
                                                    _filter_result_by = urlParams.get('filter_by');
                                               
                                        
                                        


                                                audit = urlParams.get('audit'); 
                                                localdomain =urlParams.get('localdomain');  // by default is production domain, if local=1, means use local host domain.

                 
                                          // ----- special for checker page -----





                                          // only for search.js
                                          ___limit = urlParams.get('limit');



                    
                            
                }
                
  
  
  
  
  
  
  
  
                function dark_mode(){
                    //  dark mode  https://codepen.io/j_holtslander/pen/MRbpLX
      
  
  
                   
                          // SWAP ICON ON CLICK
                          // Source: https://stackoverflow.com/a/34254979/751570
                          $('.dark-toggle').on('click',function(){
                            if ($(this).find('i').text() == 'brightness_4'){
                                $(this).find('i').text('brightness_high');
                            } else {
                                $(this).find('i').text('brightness_4');
                            }
                          });
  
  
  
              }
    
    
  
  
  
  
        // ..................  update url parameter .........................
             
                function update_url_parameter(_field, _value){

                   var searchParams = new URLSearchParams(window.location.search);
                   searchParams.set(_field, _value);


                   // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                   //window.location.search = searchParams.toString();

                   // instead avoid reload
                   var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                   history.pushState(null, '', newRelativePathQuery);

                } // function update_url_parameter
  
  
             // .......... End ........  update url parameter .........................
  
  
  




  
  
  
  // global var, specail for domainlist-live check icon, get from organization rest api function
  var org_audit = {} 

  async function organization_rest_api()
  {
      


        var _rest_api_url;

        var _current_host = window.location.hostname


        if (_current_host.includes('localhost')){

            //   local
             _rest_api_url = 'http://localhost:3000/restapi/domain_list?select=*'

            // temp use production
            //_rest_api_url = 'https://transparentgov.net:3200/restapi/domain_list?select=*'


        }else {                     
            // production
            _rest_api_url = 'https://transparentgov.net:3200/restapi/domain_list?select=*'
        }      


    







      var _organization = {}
      var _domain_list_array = await ajax_getjson_common(_rest_api_url);
      
      
      //console.log('_domain_list_array ..... ',_domain_list_array)
      
      
      
           
              var arrayLength = _domain_list_array.length;
              for (var i = 0; i < arrayLength; i++) {
                  
                   //_domain_list_array[i]
                 
                  var _key = _domain_list_array[i].domain_url
                  
                  _organization[_key] = _domain_list_array[i].organization
                  
                  org_audit[_key] = _domain_list_array[i].audit
              }
      
      
      
      
      
      
     // console.log('_organization ::::::: ',_organization)
      return _organization
      
      
  }
  
  
  
  
  
     // ---------------------------   mark.js higlight keywords --------------------------- 
                function highlight_keywords(){
                            _filter_by = $('#filter_by').val();

                            _filter_by = _filter_by.toLowerCase();

                            if (_filter_by.length > 0){


                                     $("span.context").mark(_filter_by); // will mark the keyword "test", requires an element with class "context" to exist


                            }// if


                 }// function
                 
    // --------------- End ------------   mark.js higlight keywords ---------------------------  
    
    
    
    
    
     
            function filter_result_by_filter_by(){
                
                    // must re-create instance of url params, use first time, filter by=xxx  as records
                    urlParams = new URLSearchParams(window.location.search);

                              ___url_filter_by = urlParams.get('filter_by');

                              console.log('___url_filter_by',  ___url_filter_by)

                              if ((___url_filter_by == undefined) || (___url_filter_by == null) || (___url_filter_by == '')){

                                  // search for is null, undefined, nothing to filter
                              }else {


                                   $('#filter_by').val(___url_filter_by);

                                  // trigger keyup event, filter result by _filter_by
                                   $(function() {
                                                 // $('#filter_by').keydown();
                                                //  $('item').keypress();
                                     // both works (1)
                                                //  $('#filter_by').keyup();
                                                //  $('item').blur();
                                              });




                                      // both works (2)
                                      $('#filter_by').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                            }
                         
            }
            
           







                       // Only for our rest api,https://localhost:3200/restapi/rest_url?select=*&where=
                      //  without _url + '?f=json',  without jsonp
                      // return json, no need parse.
                      async function ajax_getjson_common(___url_getJson){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout:_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                         
                          
                      }





                    

                                    

                // ======================== ajax fetch general use ==============================



                    // general use, no prefix for url          
                        // fetch with time out option 
                        // hub.js  use this one
                        async function ajax_datatype_json(___url_getJson, _custom_timeout){
                            

                            console.log('ajax datatype json ',___url_getJson, _custom_timeout)   
                
                
                        try{
                        
                                    var rsp  = await $.ajax({
                                    
                                                                timeout: _custom_timeout,
                                                                url: ___url_getJson,
                                                                type : 'GET',
                
                                                                error: function (error) {
                                                                                                                        
                                                                                console.log('ajax failed ', error)  
                                                                                
                                                                            
                                                                    },
                
                
                                                                success: function (data) {
                                                                console.log('success back --> ', data);
                
                                                                },
                
                
                                                            // must use 'json' type here:  https://api.jquery.com/jquery.ajax/  
                                                            /*
                                                            "json": Evaluates the response as JSON and returns a JavaScript object. Cross-domain "json" requests that have a callback placeholder, e.g. ?callback=?, are performed using JSONP unless the request includes jsonp: false in its request options. The JSON data is parsed in a strict manner; any malformed JSON is rejected and a parse error is thrown. As of jQuery 1.9, an empty response is also rejected; the server should return a response of null or {} instead. (See json.org for more information on proper JSON formatting.)
                                "jsonp": Loads in a JSON block using JSONP. Adds an extra "?callback=?" to the end of your URL to specify the callback. Disables caching by appending a query string parameter, "_=[TIMESTAMP]", to the URL unless the cache option is set to true.
                                                            */
                                                            dataType: "json"
                                                            //dataType: "jsonp"  // not work for hub    /data.json
                                                            
                
                                                            }); // await
                
                            
                
                                                        
                                    return rsp;                          
                        } catch{
                
                
                                    return null
                        } 
                
                
                
                
                            
                            
                
                
                        }
                
                
                
                
                
                                            
                
                            // general use, no prefix for url          
                            // fetch with time out option 
                        async function fetch_only(___url_getJson, _custom_timeout){
                                
                
                            console.log('fetch only ',___url_getJson)   
                
                
                            // get raw json = input 
                            /*  
                            * bug fix: 
                            * No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:10' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
                            * https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
                            */
                
                
                
                                
                        /*  works, but this NOT await,    
                            
                        
                            fetch(___url_getJson)
                                    .then(function(response) {
                                            return response.json();
                                    })
                                    .then(function(data) {
                
                                                                
                                        console.log(data);
                
                                        
                                                                    
                                        return data
                
                                    });// fetch
                
                            */ 
                

               

                        try{
                        
                
                            var  _resp_f = await fetch(___url_getJson);
                

                                        // socrata only, fetch always return something even error,

                                        if (_resp_f.status == 200) {

                                            return _resp_f
                                            
                                        } else {


                                            console.log('fetch Error status:', _resp_f.status);
                                            return null

                                        }

                                

                           
                            } catch (error) {


                                console.log('fetch Error:', error);
                              return null
          
                        }
                
                
                        }
                
                
                
                
                         
                        async function ajax_jsonp_only(___url_getJson, _custom_timeout){
                        // socrata jsonp only,    https://dev.socrata.com/docs/cors-and-jsonp.html 
                
                            console.log('ajax jsonp only ',___url_getJson)   
                            var input;
                
                
                            try{  
                
                            input = await $.ajax({
                                                timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                type: 'GET',


                                                jsonp: "$jsonp",  // socrata special format
                                                dataType: 'jsonp',
                                            
                                                url: ___url_getJson,
                                                
                                            
                                                error: function (error) {
                                                                                        
                                                                                    
                                                                                console.log('jsonp error    ', error)
                
                                                                            },
                                                                            
                                                success: function (data) {
                                                // console.log('jsonp success : ', data);
                
                                                
                                                }
                                            });                          
                

                                            return input

                
                            }
                        catch(error){
                
                        
                            console.log('jsonp error    ', error)
                                    
                            return null

                        }// try - catch
                
                
                
                       
                        }
                
                
        async function ajax_jsonp_json_proxy(___url_getJson, _custom_timeout){
            
            // first try jsonp 
            //  if jsonp failed, catch and try  datatype:json
            // always with time out option 
 
 
           console.log('ajax jsonp and json ',___url_getJson)   
           var input;
 
 
           try{  
 
             input = await $.ajax({
                               timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                               type: 'GET',
                               dataType: 'jsonp',
                              
                               url: ___url_getJson,
                               
                               
                               error: function (jsonp_error_1) {
                                                           
                                 console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                               },
                                                           
                               success: function (data) {
                                 
                               }
                           });                          
 
 
               } catch(jsonp_error_2){ 
 
                           console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_2)    
 
                           // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                     
 
                           console.log('ajax-datatype:json-=======> ',___url_getJson)   
                           try {
                           
                                   // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                   
                                   input = await $.ajax({
                                                                 timeout: _custom_timeout,
                                                                 url:___url_getJson,
 
                                                                 dataType: 'json',
 
 
                                                                 success: function (data) {
                                                                   
                                                                 }, // success
                                                                 
                                                                 error: function (json_error_1) {
                                                                   
                                                                   console.log('throw error event (ajax datatype:json failed json_error_1)', json_error_1)                                        
                                                                 }
                                                                 
                                                             });
                               
                               
                               
                               
 
 
                             
                           } catch(json_error_2){
                               
                               
                               // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                               // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                               //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                               // the problem is internal folder is forbidden.
 
                               
                               console.log('catch( json_error_2 )', json_error_2)
                               
                              
                               
                           }     
                       
                       
                       
 
         }// try - catch
 
 
 
 
 
 
       return input
       }// function 
 
 
                
                
                
                
                
                
                
                    // ==============   end ========== ajax fetch general use ==============================
                
                









           // +++++++ autocomplete auto suggest  +++++++


                var autocomplete_search_instance, autocomplete_options, autocomplete_elem, autocomplete_switch_status;
                function init_autocomplete(){

              
      /*
                            
                            $('input.autocomplete').autocomplete({
                              data: {
                                "Apple": null,
                                "Microsoft": null,
                                "Google": 'http://placehold.it/250x250'
                              },
                              limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                            onAutocomplete: null,
                            });
                          
      */

                        
                autocomplete_options = {

                          data: {
                            
                          },


                          limit: 5, // The max amount of results that can be shown at once. Default: Infinity.


                          onAutocomplete:  search_layer_now  //Callback for when autocompleted.

                        }


                              // get all instances
                              // var elems = document.querySelectorAll('.autocomplete');

                              // only one instance
                              autocomplete_elem = document.getElementById('filter_by')

                          
                             autocomplete_search_instance = M.Autocomplete.init(autocomplete_elem, autocomplete_options);
                          

                }

          // +++++++ end  +++++++ autocomplete auto suggest  +++++++



  


  
          var modal_elem, modal_options , modal_instances;
          function materialize_init(){

                        // init all component
                          //M.AutoInit();


                          // init without jquery
                          modal_options = {};
                          modal_elems = document.querySelectorAll('.modal');
                          modal_instances = M.Modal.init(modal_elems, modal_options);
        
                          
                          
                          
                          // modal for error message display
                          $('.modal').modal();




                          $('.tooltipped').tooltip();
          }

  
  








                    
                          

// ...... loading spinner with timer ......... jquery css   .........  



                   /**/

                            
                   function show_loading_img_spinner(elementID_appendTo, process_bar_id, ____url___info___){


                    /*

                      =============    time count down progress bar     =============   

                      https://codepen.io/hoogw/pen/RwgmNNm

                      https://stackoverflow.com/questions/24530908/showing-a-time-countdown-progress-bar
                      https://codepen.io/Rudchyk/pen/qNOEGj


                  */

                      

                  // nested function    
                  function progress(timenow, timetotal, $element) {



                        if(timenow < timetotal-1) {

                                      var progressBarWidth = timenow * $element.width() / timetotal;
                                      $element.find('div').animate({ width: progressBarWidth }, 100).html(timenow);

                        } else {
                                      $element.find('div').html(timenow);
                        }
                        
                  
                        setTimeout(function() {

                            progress(timenow + 1, timetotal, $element);

                        }, 1000);


                  
                      

                  };








                                
                  var _jquery_process_bar_id = '#' +  process_bar_id

                  //if ( $( "#ajax_getJson_processing" ).length ) {
                  if ( $( _jquery_process_bar_id ).length ) { 
                  // already have one progress_bar do not duplicate

                  } else {

                          

                          var preloader_div = document.createElement('div');
                          preloader_div.setAttribute("id", process_bar_id);
                          

                          var preloader_div_inner = document.createElement('div');
                          preloader_div_inner.className = 'bar';
                          
                          



                          preloader_div.appendChild(preloader_div_inner);
                          

                          //------------End ----------- material preloader ----------------------

                        

                        var element = document.getElementById(elementID_appendTo);

                        

                        // in use, progress bar
                        element.appendChild(preloader_div);



                        progress(1, 9, $('#'+ process_bar_id));

                  }




                  }



                  

                  function remove_loading_img_spinner(elementID_remove){
                            


                    var _jquery_elementID_remove = '#' +  elementID_remove
      
                    //if ( $( "#ajax_getJson_processing" ).length ) {
                    if ( $( _jquery_elementID_remove ).length ) { 
                      
      
      
      
                            var elem = document.getElementById(elementID_remove);
                            elem.parentElement.removeChild(elem);
      
                    }
      
                  }
      

                  
                  function show_message(message_elementID, text_message){
                                                
                                          
                    console.log('show message:  message_elementID, text_message ', message_elementID, text_message)
                    document.getElementById(message_elementID).innerHTML = text_message

                    remove_loading_img_spinner('ajax_getJson_processing');
                
                  }



                  
//  ......   ......  end   ......  ...... loading spinner with timer ......... jquery css   .........  








           
        function display_count_info(_subject, ___showing_cnt, ___all_cnt, _label_id){

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
                

                /*
                        // not use w3.css progress bar, just keep it here
                        _percentage_html =   '<div class="w3-dark-grey w3-large">'
                        _percentage_html +=      '<div class="w3-container w3-yellow" style="width:' +  _percentage + '%">' +   _percentage + '%</div>'
                        _percentage_html +=  '</div>'
                */
                }

                var _html_for_count = ''
                
                    if (_subject) { _html_for_count +=    '<h5>' + _subject +  '</h5>' }
                                
                    _html_for_count +=   '<h1 style="display: inline;"><mark><big><b>' + ___showing_cnt + '</b></big></mark>' 
                    _html_for_count +=    '/' 
                    _html_for_count +=       '<small><sup>' + ___all_cnt +'</sup></small></h1>' 
                    _html_for_count +=    '&nbsp;&nbsp;'  
                    _html_for_count +=    _percentage_html 

                document.getElementById(_label_id).innerHTML =    _html_for_count 
        }