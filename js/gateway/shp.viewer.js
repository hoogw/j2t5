 
 
 // google mapbox 
 var shp_viewer_base_url_no_change   =  'https://transparentgov.net:3200/googlemaps96/default?layer=shapefile&url='
 var shp_viewer_base_url
 // esri only
 // https://transparentgov.net/json2tree/arcgis/shp/shp.html?layer=Topeka+City+Council&url=https%3A%2F%2Fdata.topeka.org%2Fdatasets%2Ff18e1824711e4bfea78d08b06ede61b5_0.shp%3FoutSR%3D%257B%2522latestWkid%2522%253A6467%252C%2522wkid%2522%253A103049%257D&_center_lat=39.04831584317453&_center_long=-95.73251899493879&_center_zoom=12&panto=0
 var shp_esri_base_url_no_change   =  'https://transparentgov.net/json2tree/arcgis/shp/shp.html?layer=shp&url='
 var shp_esri_base_url


 var _shp_viewer_url
 var _shp_esri_url
  
                // ***************** text input on change event  ********************




                function clear_all_handler(){
                        $('#shp_url').val('');
                        build_link('', '')
                        $("#Original-shp").prop("href", '.')
                        $("#Original-shp-txt").text('');
                }











                function creat_link_handler(){

                        shp_viewer_base_url   =  shp_viewer_base_url_no_change
                        shp_esri_base_url = shp_esri_base_url_no_change

                                var _shp_url = $("#shp_url").val().trim()
                                $("#shp_url").val(_shp_url)
                                console.log('raw url is ', _shp_url)
                                $("#Original-shp").prop("href", _shp_url)
                                $("#Original-shp-txt").text(_shp_url);
                               
                               // & must encode as %26, must replace all occurence
                               _shp_url = _shp_url.replaceAll('&', '%26')
                               console.log('after encode url is ', _shp_url)      

                               $("#shp_url").val(_shp_url);     
                
                                        // localhost or production
                                        console.log('window.location.host', window.location.host)
                                        var host_name = window.location.host
                                        if (host_name.includes('localhost')){

                                                shp_viewer_base_url = shp_viewer_base_url.replace('transparentgov.net', 'localhost')

                                                shp_esri_base_url = shp_esri_base_url.replace('transparentgov.net', 'localhost:10')
                                                shp_esri_base_url = shp_esri_base_url.replace('https://', 'http://')
                                                console.log('change base host to localhost',shp_viewer_base_url,  shp_esri_base_url)
                                        }
                                            
                                            
                                        // https 3200 , or http 3000,  port
                                        if (_shp_url.startsWith('https://')){ 
                                            
                                                   _shp_viewer_url = shp_viewer_base_url + _shp_url;
                                                   _shp_esri_url = shp_esri_base_url + _shp_url;

                                                   console.log('use,  https 3200',shp_viewer_base_url,  shp_esri_base_url) 
                                                   build_link(_shp_viewer_url, _shp_esri_url)

                                        } 
                                           
                                           
                                        if (_shp_url.startsWith('http://')){ 
                                                   // http
                                                     
                                                         

                                                         _shp_viewer_url = shp_viewer_base_url.replace('https://', 'http://') + _shp_url;
                                                         _shp_viewer_url = _shp_viewer_url.replace(':3200', ':3000')

                                                         _shp_esri_url = shp_esri_base_url.replace('https://', 'http://') + _shp_url;

                                                         console.log('change to http 3000 ',shp_viewer_base_url,  shp_esri_base_url) 
                                                         build_link(_shp_viewer_url, _shp_esri_url)


                                                        


                                        }                    

                               
                       }

               // ***************  End ********** search input on change event  ********************
  
  
  
  
  /**/
  

                 // ---------------- helper -------------------------

                 function build_link(viewer1, viewer2){

                        console.log('build link', viewer1)


                        $("#GoogleMaps-CORS96").prop("href", viewer1)
                        $("#GoogleMaps-CORS96-txt").text(viewer1);
                        
                        $("#GoogleMaps-JSONP96").prop("href", viewer1.replace('default', 'default6000'))
                        $("#GoogleMaps-JSONP96-txt").text(viewer1.replace('default', 'default6000'));

                        $("#GoogleMaps-Proxy96").prop("href", viewer1.replace('default', 'default7000'))
                        $("#GoogleMaps-Proxy96-txt").text(viewer1.replace('default', 'default7000'));

                        


                                console.log('build link 2', viewer2)
                                

                                $("#esri3D").prop("href", viewer2)
                                $("#esri3D-txt").text(viewer2);

                                $("#esri2D").prop("href", viewer2.replace('shp.html', 'shp_popup.html'))
                                $("#esri2D-txt").text(viewer2.replace('shp.html', 'shp_popup.html'));

                                $("#esri2Dvariant").prop("href", viewer2.replace('shp.html', 'shp_v3.html'))
                                $("#esri2Dvariant-txt").text(viewer2.replace('shp.html', 'shp_v3.html'));


                 }


               

                 // ---------------- end --------- helper ------------


  
  
  
  
  // document ready short hand
  
  
  (async function($){

       
        $("#create_link_btn").click(creat_link_handler)

        $("#clear_btn").click(clear_all_handler)
       
})(jQuery);
