 
 var arcgis_rest_api_viewer_base_url = 'https://transparentgov.net/json2tree/esri/server/restapi.html?url='
   
 var arcgis_online_viewer_base_url   =  'https://transparentgov.net/json2tree/esri/online/hub.html?url='

  
 var arcgis_rest_api_tree_structure_base_url = 'https://transparentgov.net/json2tree/esri/server/folder.html?url='


 var arcgis_rest_api_check_base_url = 'https://transparentgov.net/json2tree/esri/check/searchLayerCheck.html?url='


 // special for hub check page parameter
 //  '&start=1&end=10&test_mode=1&default=1&cors=0&jsonp=0&proxy=0&https=0&http=0&test_method=1';
 var arcgis_online_check_base_url   =  'https://transparentgov.net/json2tree/esri/check/hubCheck.html?start=1&end=10&test_mode=1&default=1&cors=0&jsonp=0&proxy=0&https=0&http=0&test_method=1&url='
 
  



                        function reset_text(){

                                $('#arcgis_server_url').val('');
                                                        
                                                        
                                $("#arcgis_rest_api").prop("href", '.')
                                $("#arcgis_rest_api_tree_structure").prop("href", '.')
                                $("#arcgis_rest_api_check").prop("href", '.')

                                $("#arcgis_rest_api-txt").text(arcgis_rest_api_viewer_base_url);
                                $("#arcgis_rest_api_tree_structure-txt").text(arcgis_rest_api_tree_structure_base_url);
                                $("#arcgis_rest_api_check-txt").text(arcgis_rest_api_check_base_url);
                        }



                        function set_text(){

                                var _arcgis_server_url = $("#arcgis_server_url").val()

                                console.log(' input ', _arcgis_server_url)


                                var _layer_viewer_url = arcgis_rest_api_viewer_base_url  + _arcgis_server_url;
                                var _layer_tree_structure_url = arcgis_rest_api_tree_structure_base_url  + _arcgis_server_url;
                                var _layer_check_url = arcgis_rest_api_check_base_url  + _arcgis_server_url;
                               
                                if (_arcgis_server_url.startsWith('http://') ){
                                        _layer_viewer_url = arcgis_rest_api_viewer_base_url.replace('https://', 'http://') + _arcgis_server_url;
                                        _layer_tree_structure_url = arcgis_rest_api_tree_structure_base_url.replace('https://', 'http://') + _arcgis_server_url;
                                        _layer_check_url = arcgis_rest_api_check_base_url.replace('https://', 'http://') + _arcgis_server_url;
                                }              

                                 $("#arcgis_rest_api").prop("href", _layer_viewer_url)
                                 $("#arcgis_rest_api-txt").text(_layer_viewer_url);

                                 $("#arcgis_rest_api_tree_structure").prop("href", _layer_tree_structure_url)
                                 $("#arcgis_rest_api_tree_structure-txt").text(_layer_tree_structure_url);

                                 $("#arcgis_rest_api_check").prop("href", _layer_check_url)
                                 $("#arcgis_rest_api_check-txt").text(_layer_check_url);
                     
                        }







  
  
  
  
  
  
  // document ready short hand
  
  
  (async function($){
  
                reset_text()
                $(".progress").hide(); 



                // ***************** text input on change event  ********************

                        $("#close_icon_arcgis_server").on('click', reset_text)
                                        
                        $("#arcgis_server_url").on('input', set_text) 
                
                // ***************  End ********** search input on change event  ********************




                 
})(jQuery);
