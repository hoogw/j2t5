 
 var arcgis_rest_api_viewer_base_url = 'https://transparentgov.net/json2tree/esri/server/restapi.html?url='
   
 var arcgis_online_viewer_base_url   =  'https://transparentgov.net/json2tree/esri/online/hub.html?url='

  
 var arcgis_rest_api_tree_structure_base_url = 'https://transparentgov.net/json2tree/esri/server/folder.html?url='


 var arcgis_rest_api_check_base_url = 'https://transparentgov.net/json2tree/esri/check/searchLayerCheck.html?url='


 // special for hub check page parameter
 //  '&start=1&end=10&test_mode=1&default=1&cors=0&jsonp=0&proxy=0&https=0&http=0&test_method=1';
 var arcgis_online_check_base_url   =  'https://transparentgov.net/json2tree/esri/check/hubCheck.html?start=1&end=10&test_mode=1&default=1&cors=0&jsonp=0&proxy=0&https=0&http=0&test_method=1&url='
 
  








 function reset_text(){

        $('#arcgis_online_url').val('');
                                
                                
        $("#arcgis_online").prop("href", '.')
        $("#arcgis_online_check").prop("href", '.')
       

        $("#arcgis_online-txt").text(arcgis_online_viewer_base_url);
        $("#arcgis_online_check-txt").text(arcgis_online_check_base_url);
        
}



function set_text(){

        var _arcgis_online_url = $("#arcgis_online_url").val()

        console.log(' input ', _arcgis_online_url)


        var _online_viewer_url = arcgis_online_viewer_base_url + _arcgis_online_url;
        $("#arcgis_online").prop("href", _online_viewer_url);
        $("#arcgis_online-txt").text(_online_viewer_url);


        var _online_check_url = arcgis_online_check_base_url + _arcgis_online_url;
        $("#arcgis_online_check").prop("href", _online_check_url);
        $("#arcgis_online_check-txt").text(_online_check_url);



        
       
        if (_arcgis_online_url.startsWith('http://') ){
                _online_viewer_url = arcgis_online_viewer_base_url.replace('https://', 'http://') + _arcgis_online_url;
                _online_check_url = arcgis_online_check_base_url.replace('https://', 'http://') + _arcgis_online_url;
        }              

        $("#arcgis_online").prop("href", _online_viewer_url);
        $("#arcgis_online-txt").text(_online_viewer_url);
        $("#arcgis_online_check").prop("href", _online_check_url);
        $("#arcgis_online_check-txt").text(_online_check_url);

}



  
  
  
  // document ready short hand
  
  
  (async function($){
  
       
        reset_text()
        $(".progress").hide(); 



        // ***************** text input on change event  ********************

                $("#close_icon_arcgis_online").on('click', reset_text)
                                
                $("#arcgis_online_url").on('input', set_text) 
        
        // ***************  End ********** search input on change event  ********************

                 
})(jQuery);
