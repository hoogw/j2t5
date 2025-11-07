

    
    
  

        //------ cross, proxy ------
            var _cross = 'default';  // cross origin method, can be : default, cors, jsonp, proxy


            var  proxyurl_https = "https://transparentgov.net:7200/";
            var  proxyurl_http = "http://transparentgov.net:7000/";  
    
        //------ cross, proxy ------





  
  


  






            
             async function ajax_cross_origin(_url, __cross_origin_method){

              // Most of arcgis server support JSONP
              // newer arcgis server support both JSONP + CORS
              // some only support CORS, NOT JSONP



               



                if (__cross_origin_method) {

                } else {

                  __cross_origin_method = 'default'
                }
                



                var _response_


               switch(__cross_origin_method) {


                case 'default':

                    _response_ = await ajax_jsonp_cors_proxy(_url, _timeout)
                  

                  break;


                case 'cors':
                    _response_ = await ajax_cors(_url, _timeout)
                  break;


                  case 'jsonp':
                      _response_ = await ajax_jsonp(_url, _timeout)
                      break;


                case 'proxy':
                    _response_ = await ajax_proxy(_url, _timeout)
                          break;     

                default:
                    _response_ = await ajax_jsonp_cors_proxy(_url, _timeout)
              }




              return  _response_



             }

                 
                        




                      
      
        
        async function ajax_cors(___url_getJson, _customer_timeout){
            

            //dataType: "json" same as fetch, server must support CORS,
            // if server NOT support CORS, you have to use proxy to work around 

            //dataType: "json", the result is already json, no need to JSON.parse().

            // without dataType: "json", the result is string,  need to JSON.parse().




             console.log('ajax datatype json, (timeout) ',___url_getJson, _customer_timeout)   


             var input

        try{
      
                  input  = await $.ajax({
                  
                                              timeout: _customer_timeout,
                                              url: ___url_getJson,
                                              type : 'GET',

                                              error: function (json_error_1) {
                                                                                                        
                                                              console.log('ajax datatype:json json_error_1 ',json_error_1)  
                                                              
                                                            
                                                    },


                                              success: function (data) {
                                                //console.log('success back --> ', data);

                                              },


                                            dataType: "json"


                                            // jsonp only works for arcgis server whoever support JSONP, 
                                            // jsonp NOT works for any file json, or file geojson

                                            //dataType: "jsonp"  // not work for hub    /data.json
                                            

                                            }); // await

          

                                        
                                
                                          } catch(json_error_2){
                              
                              
                                            // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                            // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                            //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                            // the problem is internal folder is forbidden.
              
                                            
                                            console.log('catch( json_error_2 )', json_error_2)
                                            
                                           
                                            // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                            var error_status = {
                                              errorFrom: 'ajax_cors',
                                              readyState:json_error_2.readyState,
                                              responseJSON:json_error_2.responseJSON,
                                              status:json_error_2.status,
                                              statusText: json_error_2.statusText
                                            
                                            }
              
                                             return error_status
              
                                            
                                        }     




          return input
          


      }







        async function ajax_jsonp(___url_getJson, _customer_timeout){
            

          // jsonp only work for arcgis server who support JSONP
          // jsonp NOT work for file .json, file .geojson or any file download 


          console.log('ajax jsonp only ',___url_getJson)   
          var input;


          try{  

          input = await $.ajax({
                              timeout:_customer_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',


                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                             
                              error: function (jsonp_error) {
                                                                        
                                                                     
                                                              console.log('throw event , jsonp error 1   ', jsonp_error)

                                                          },
                                                          
                              success: function (data) {
                                 // console.log('jsonp success : ', data);

                                 
                              }
                          });                          


            }
        catch( jsonp_error_2 ){

         
                  console.log('catch jsonp error 2    ', jsonp_error_2)

                  var error_status = {

                    errorFrom: 'ajax_jsonp',
                    readyState:jsonp_error_2.readyState,
                    responseJSON:jsonp_error_2.responseJSON,
                    status:jsonp_error_2.status,
                    statusText: jsonp_error_2.statusText
                  
                  }

                  return error_status

        }// try - catch




      return input
      }// function 





      async function ajax_proxy(___url_getJson, _customer_timeout){
            

        //dataType: "json" same as fetch, server must support CORS,
        // if server NOT support CORS, you have to use proxy to work around 

        //dataType: "json", the result is already json, no need to JSON.parse().

        // without dataType: "json", the result is string,  need to JSON.parse().




         console.log('ajax proxy, (timeout) ',___url_getJson, _customer_timeout)   

         var _proxified_url = proxify_url(___url_getJson)


         console.log('try ajax proxy =======> ',  _proxified_url)  



         var input

    try{
  
              input  = await $.ajax({
              
                                          timeout: _customer_timeout,
                                          url: _proxified_url,
                                          type : 'GET',

                                          error: function (proxy_error_1) {
                                                                                                    
                                                          console.log('ajax proxy_error_1 ',proxy_error_1)  
                                                          
                                                        
                                                },


                                          success: function (data) {
                                            //console.log('success back --> ', data);

                                          },


                                        dataType: "json"


                                        // jsonp only works for arcgis server whoever support JSONP, 
                                        // jsonp NOT works for any file json, or file geojson

                                        //dataType: "jsonp"  // not work for hub    /data.json
                                        

                                        }); // await

      

                                    
                            
                                      } catch(proxy_error_1){
                          
                          
                                        // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                        // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                        //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                        // the problem is internal folder is forbidden.
          
                                        
                                        console.log('catch( proxy_error_1 )', proxy_error_1)
                                        
                                       
                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                        var error_status = {
                                          errorFrom: 'ajax_proxy',
                                          readyState:proxy_error_1.readyState,
                                          responseJSON:proxy_error_1.responseJSON,
                                          status:proxy_error_1.status,
                                          statusText: proxy_error_1.statusText
                                        
                                        }
          
                                         return error_status
          
                                        
                                    }     




      return input
      


  }






             
       function proxify_url(_target_url){


                       /*
                              // fetch + proxy (bypass cors)

                              //  ****** cors ******

                                  // some site that doesn’t send Access-Control-*, our browser will block response as No 'Access-Control-Allow-Origin' header is present on the requested resource  
                                  // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
                                  // we must add such header via this proxy
                                  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

                                  //const proxyurl = "http://localhost:7000/";
                                  //const proxyurl = "https://localhost:7200/";
                       */



                // --------- add proxy  --------- 
                var ____current_window_protocol = window.location.protocol

                // default http
                var proxyurl = "http://transparentgov.net:7000/";  

                console.log('____current_window_protocol', ____current_window_protocol)

                if (____current_window_protocol == 'https:') {

                  proxyurl = "https://transparentgov.net:7200/";
                  
                }
                // --------- end  ---------  add proxy  --------- 



                var _proxified_target;


                if (_target_url.includes('https://')){

                          _proxified_target = proxyurl_https  + _target_url;
                } else{

                          _proxified_target = proxyurl_http + _target_url;  
                }


                return _proxified_target

       }
       

      
        async function ajax_jsonp_cors_proxy(___url_getJson, _customer_timeout){
            

            // 3 level try, jsonp > json(cors) > proxy ,   good for arcgis server rest api

           // first try jsonp 
           //  if jsonp failed, catch and try  datatype:json
           // if json failed, catch and try proxy

          

           // always with time out option 


          
          var response_string;
          var result_json;


          try{  



            // test only
            // throw ' ++++++++ test only ++++++++ jsonp failed';
                  
                  
            // jsonp 
            response_string = await $.ajax({
                              
                              type: 'GET',
                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                              
                              error: function (jsonp_error) {
                                                          
                                console.log('jsonp-cors-proxy (jsonp) === error ===  ',___url_getJson,  jsonp_error )                                        
                              },
                                                          
                              success: function (data) {
                                console.log('jsonp-cors-proxy --> jsonp --> success  --> ',___url_getJson);
                              }
                          });                          


              } catch(jsonp_failed){ 

                         
                    

                          console.log('jsonp-cors-proxy  --> !!!!!! jsonp failed !!!!!!',___url_getJson, jsonp_failed);


                          try {
                          
                                 
                             // test only
                             // throw ' ++++++++ test only ++++++++ cors failed'; 
                                                                  
                                  // cors
                                  response_string = await $.ajax({
                                                                
                                                                url:___url_getJson,

                                                                dataType: 'json',

                                                                error: function (cors_error) {
                                                                  
                                                                  console.log(' jsonp-cors-proxy (cors) error ',___url_getJson,  cors_error)                                        
                                                                },

                                                                success: function (data) {

                                                                  console.log(' jsonp-cors-proxy --> cors --> success  -->  ',  ___url_getJson)   
                                                                  
                                                                }
                                                                
                                                            });
                              
                              
                              
                              


                            
                          } catch(cors_failed){


                            console.log('jsonp-cors-proxy  --> !!!!!! cors failed !!!!!!',___url_getJson, cors_failed);

                              

                            try {
                          
                           

                               // proxy
                               // --------- add proxy  ---------
                                 var _proxified_url = proxify_url(___url_getJson)


                                 
                              
                                 response_string = await $.ajax({
                                                            
                                                            url:_proxified_url,

                                                            dataType: 'json',


                                                            
                                                            
                                                            error: function (proxy_error) {
                                                              
                                                              console.log(' jsonp-cors-proxy (proxy)  error ',_proxified_url, proxy_error)                                        
                                                            },

                                                            success: function (data) {

                                                              console.log(' jsonp-cors-proxy --> proxy --> success  -->   ',  _proxified_url)  
                                                              
                                                            }
                                                            
                                                        });
                          
                          
                          
                          


                        
                                        } catch(proxy_failed){


                                          console.log('jsonp-cors-proxy  --> !!!!!! proxy failed !!!!!!',  _proxified_url, proxy_failed);
                                                  

                                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                                        var error_status = {
                                                                                errorFrom:   'ajax_jsonp_cors_proxy',
                                                                                readyState:  proxy_failed.readyState,
                                                                                responseJSON:proxy_failed.responseJSON,
                                                                                status:      proxy_failed.status,
                                                                                statusText:  proxy_failed.statusText
                                                        
                                                        }

                                                        return error_status

                                          } // try proxy 




                              
                          } // try cors
                      
                      
                      

        } // try jsonp 




                            // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                            if (typeof response_string === 'object') {
                              // is object
                              result_json = response_string
                          } else {
                              // is string
                              result_json = JSON.parse(response_string)
                          }
  




              return result_json
      }







      async function ajax_json_proxy(___url_getJson, _customer_timeout){
            

          // 2 level try, json > proxy,  good for hub  /data.json


        // first try json 
        //  if json failed, catch and try  proxy

       

        // always with time out option 


       console.log('ajax json --> proxy ',___url_getJson)   
       var input;


       try{  

         input = await $.ajax({
                           timeout:_customer_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                           type: 'GET',
                           dataType: 'json',
                          
                           url: ___url_getJson,
                           
                           
                           error: function (json_error_1) {
                                                       
                             console.log('throw error event(ajax json failed json_error_1) ', json_error_1)                                        
                           },
                                                       
                           success: function (data) {
                             
                           }
                       });                          


           } catch(json_error_1){ 

                       console.log('catch ( ajax jsonp failed jsonp_error ) ', json_error_1)  
                       
                       // not return error yet, because we will try proxy

                       var _proxified_url = proxify_url(___url_getJson)


                       console.log('try ajax proxy =======> ',  _proxified_url)  
                       
                       
                       try {
                       
                               // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                               
                               input = await $.ajax({
                                                             timeout: _customer_timeout,
                                                             url:_proxified_url,

                                                             dataType: 'json',


                                                             success: function (data) {
                                                               
                                                             }, // success
                                                             
                                                             error: function (proxy_error_2) {
                                                               
                                                               console.log('throw error event (ajax proxy failed proxy_error_2)', proxy_error_2)                                        
                                                             }
                                                             
                                                         });
                           
                           
                           
                           


                         
                       } catch(proxy_error_2){
                           
                           
                           // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                           // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                           //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                           // the problem is internal folder is forbidden.

                           
                           console.log('catch( proxy_error_2 )', proxy_error_2)
                           
                          
                           var error_status = {
                                                    errorFrom: 'ajax_json_proxy',
                                                    readyState:proxy_error_2.readyState,
                                                    responseJSON:proxy_error_2.responseJSON,
                                                    status:proxy_error_2.status,
                                                    statusText: proxy_error_2.statusText
                                                  
                                                  }
                    
                            return error_status

                           
                       }     
                   
                   
                   

     }// try - catch






   return input
   }






                            

          // No time out, general use, no prefix for url          
          // fetch with time out option 
          async function fetch_only(___url_getJson, _customer_timeout){
              

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


        // arcgis only, when domain not exist, fetch will error, must catch, return null

          try{
          
                    var  _resp_f = await fetch(___url_getJson);

                    return _resp_f


              } catch (error) {


                      console.log('fetch Error:', error);
                    return null

              }


        }







