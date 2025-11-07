 
 
 // google mapbox 
 var kml_viewer_base_url_no_change   =  'https://transparentgov.net:3200/googlemaps95/default?layer=kml&url='
 var kml_viewer_base_url
 // esri only
 // https://transparentgov.net/json2tree/arcgis/kml/kml.html?layer=Topeka+City+Council&url=https%3A%2F%2Fdata.topeka.org%2Fdatasets%2Ff18e1824711e4bfea78d08b06ede61b5_0.kml%3FoutSR%3D%257B%2522latestWkid%2522%253A6467%252C%2522wkid%2522%253A103049%257D&_center_lat=39.04831584317453&_center_long=-95.73251899493879&_center_zoom=12&panto=0
 var kml_esri_base_url_no_change   =  'https://transparentgov.net/json2tree/arcgis/kml/kml.html?layer=kml&url='
 var kml_esri_base_url


 var _kml_viewer_url
 var _kml_esri_url
  
                // ***************** text input on change event  ********************




                function clear_all_handler(){
                        $('#kml_url').val('');
                        build_link('', '')
                        $("#Original-kml").prop("href", '.')
                        $("#Original-kml-txt").text('');
                }











                function creat_link_handler(){

                        kml_viewer_base_url   =  kml_viewer_base_url_no_change
                        kml_esri_base_url = kml_esri_base_url_no_change

                                var _kml_url = $("#kml_url").val().trim()
                                $("#kml_url").val(_kml_url)
                                console.log('raw url is ', _kml_url)
                                $("#Original-kml").prop("href", _kml_url)
                                $("#Original-kml-txt").text(_kml_url);

                               // & must encode as %26, must replace all occurence
                               _kml_url = _kml_url.replaceAll('&', '%26')
                               console.log('after encode url is ', _kml_url)

                               $("#kml_url").val(_kml_url);          

                                        // localhost or production
                                        console.log('window.location.host', window.location.host)
                                        var host_name = window.location.host
                                        if (host_name.includes('localhost')){

                                                kml_viewer_base_url = kml_viewer_base_url.replace('transparentgov.net', 'localhost')

                                                kml_esri_base_url = kml_esri_base_url.replace('transparentgov.net', 'localhost:10')
                                                kml_esri_base_url = kml_esri_base_url.replace('https://', 'http://')
                                                console.log('change base host to localhost',kml_viewer_base_url,  kml_esri_base_url)
                                        }
                                            
                                            
                                        // https 3200 , or http 3000,  port
                                        if (_kml_url.startsWith('https://')){ 
                                            
                                                   _kml_viewer_url = kml_viewer_base_url + _kml_url;
                                                   _kml_esri_url = kml_esri_base_url + _kml_url;

                                                   console.log('use,  https 3200',kml_viewer_base_url,  kml_esri_base_url) 
                                                   build_link(_kml_viewer_url, _kml_esri_url)

                                        } 
                                           
                                           
                                        if (_kml_url.startsWith('http://')){ 
                                                   // http
                                                     
                                                         

                                                         _kml_viewer_url = kml_viewer_base_url.replace('https://', 'http://') + _kml_url;
                                                         _kml_viewer_url = _kml_viewer_url.replace(':3200', ':3000')

                                                         _kml_esri_url = kml_esri_base_url.replace('https://', 'http://') + _kml_url;

                                                         console.log('change to http 3000 ',kml_viewer_base_url,  kml_esri_base_url) 
                                                         build_link(_kml_viewer_url, _kml_esri_url)


                                                        


                                        }                    

                               
                       }

               // ***************  End ********** search input on change event  ********************
  
  
  
  
  /**/
  

                 // ---------------- helper -------------------------

                 function build_link(viewer1, viewer2){

                        console.log('build link', viewer1)


                        $("#GoogleMaps-CORS95").prop("href", viewer1)
                        $("#GoogleMaps-CORS95-txt").text(viewer1);
                        
                        $("#GoogleMaps-JSONP95").prop("href", viewer1.replace('default', 'default6000'))
                        $("#GoogleMaps-JSONP95-txt").text(viewer1.replace('default', 'default6000'));

                        $("#GoogleMaps-Proxy95").prop("href", viewer1.replace('default', 'default7000'))
                        $("#GoogleMaps-Proxy95-txt").text(viewer1.replace('default', 'default7000'));

                        


                                console.log('build link 2', viewer2)
                                

                                $("#esri3D").prop("href", viewer2)
                                $("#esri3D-txt").text(viewer2);

                                $("#esri2D").prop("href", viewer2.replace('kml.html', 'kml_popup.html'))
                                $("#esri2D-txt").text(viewer2.replace('kml.html', 'kml_popup.html'));

                                $("#esri2Dvariant").prop("href", viewer2.replace('kml.html', 'kml_v3.html'))
                                $("#esri2Dvariant-txt").text(viewer2.replace('kml.html', 'kml_v3.html'));

                 }


               

                 // ---------------- end --------- helper ------------


  
  
  
  
  // document ready short hand
  
  
  (async function($){

       
        $("#create_link_btn").click(creat_link_handler)

        $("#clear_btn").click(clear_all_handler)
       
})(jQuery);
