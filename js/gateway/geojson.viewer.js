 
 
 // google mapbox 
 var geojson_viewer_base_url_no_change   =  'https://transparentgov.net:3200/googlemaps92/default?layer=geojson&url='
 var geojson_viewer_base_url
 // esri only
 // https://transparentgov.net/json2tree/arcgis/geojson/geojson_popup.html?layer=Topeka+City+Council&url=https%3A%2F%2Fdata.topeka.org%2Fdatasets%2Ff18e1824711e4bfea78d08b06ede61b5_0.geojson%3FoutSR%3D%257B%2522latestWkid%2522%253A6467%252C%2522wkid%2522%253A103049%257D&_center_lat=39.04831584317453&_center_long=-95.73251899493879&_center_zoom=12&panto=0
 var geojson_esri_base_url_no_change   =  'https://transparentgov.net/json2tree/arcgis/geojson/geojson.html?layer=geojson&url='
 var geojson_esri_base_url


 var _geojson_viewer_url
 var _geojson_esri_url
  
                // ***************** text input on change event  ********************




                function clear_all_handler(){
                        $('#geojson_url').val('');
                        build_link('', '')
                        $("#Original-GeoJson").prop("href", '.')
                        $("#Original-GeoJson-txt").text('');
                }











                function creat_link_handler(){

                        geojson_viewer_base_url   =  geojson_viewer_base_url_no_change
                        geojson_esri_base_url = geojson_esri_base_url_no_change

                                var _geojson_url = $("#geojson_url").val().trim()
                                $("#geojson_url").val(_geojson_url)
                                console.log('raw url is ', _geojson_url)
                                $("#Original-GeoJson").prop("href", _geojson_url)
                                $("#Original-GeoJson-txt").text(_geojson_url);
                               
                                // & must encode as %26, must replace all occurence
                                _geojson_url = _geojson_url.replaceAll('&', '%26')
                                console.log('after encode url is ', _geojson_url)

                                $("#geojson_url").val(_geojson_url);
                                        
                                        // localhost or production
                                        console.log('window.location.host', window.location.host)
                                        var host_name = window.location.host
                                        if (host_name.includes('localhost')){

                                                geojson_viewer_base_url = geojson_viewer_base_url.replace('transparentgov.net', 'localhost')

                                                geojson_esri_base_url = geojson_esri_base_url.replace('transparentgov.net', 'localhost:10')
                                                geojson_esri_base_url = geojson_esri_base_url.replace('https://', 'http://')
                                                
                                                console.log('change base host to localhost',geojson_viewer_base_url,  geojson_esri_base_url)
                                        }
                                            
                                            
                                        // https 3200 , or http 3000,  port
                                        if (_geojson_url.startsWith('https://')){ 
                                            
                                           

                                                   _geojson_viewer_url = geojson_viewer_base_url + _geojson_url;
                                                   _geojson_esri_url = geojson_esri_base_url + _geojson_url;

                                                   console.log('use,  https 3200',geojson_viewer_base_url,  geojson_esri_base_url) 
                                                   build_link(_geojson_viewer_url, _geojson_esri_url)

                                                   
                                              

                                        } 
                                           
                                           
                                        if (_geojson_url.startsWith('http://')){ 
                                                   // http
                                                     
                                                         

                                                         _geojson_viewer_url = geojson_viewer_base_url.replace('https://', 'http://') + _geojson_url;
                                                         _geojson_viewer_url = _geojson_viewer_url.replace(':3200', ':3000')

                                                         _geojson_esri_url = geojson_esri_base_url.replace('https://', 'http://') + _geojson_url;

                                                         console.log('change to http 3000 ',geojson_viewer_base_url,  geojson_esri_base_url) 
                                                         build_link(_geojson_viewer_url, _geojson_esri_url)


                                                        


                                        }                    

                               
                       }

               // ***************  End ********** search input on change event  ********************
  
  
  
  
  /**/
  

                 // ---------------- helper -------------------------

                 function build_link(viewer1, viewer2){

                        console.log('build link', viewer1)


                        $("#GoogleMaps-CORS93").prop("href", viewer1.replace('googlemaps92/default', 'googlemaps93/default'));
                        $("#GoogleMaps-CORS93-txt").text(viewer1.replace('googlemaps92/default', 'googlemaps93/default'));
                        
                        $("#GoogleMaps-JSONP93").prop("href", viewer1.replace('googlemaps92/default', 'googlemaps93/default6000'))
                        $("#GoogleMaps-JSONP93-txt").text(viewer1.replace('googlemaps92/default', 'googlemaps93/default6000'));

                        $("#GoogleMaps-Proxy93").prop("href", viewer1.replace('googlemaps92/default', 'googlemaps93/default7000'))
                        $("#GoogleMaps-Proxy93-txt").text(viewer1.replace('googlemaps92/default', 'googlemaps93/default7000'));

                        $("#GoogleMaps-92").prop("href", viewer1)
                        $("#GoogleMaps-92-txt").text(viewer1);
                        
                        $("#GoogleMaps-92-4").prop("href", viewer1.replace('googlemaps92/default', 'googlemaps92/default4'))
                        $("#GoogleMaps-92-4-txt").text(viewer1.replace('googlemaps92/default', 'googlemaps92/default4'));

                        

                        $("#Mapbox").prop("href", viewer1.replace('googlemaps92/default', 'mapbox_vector/default'))
                        $("#Mapbox-txt").text(viewer1.replace('googlemaps92/default', 'mapbox_vector/default'));

                        
                       


                                console.log('build link 2', viewer2)
                                

                                $("#esri3D").prop("href", viewer2)
                                $("#esri3D-txt").text(viewer2);

                                $("#esri2D").prop("href", viewer2.replace('geojson.html', 'geojson_popup.html'))
                                $("#esri2D-txt").text(viewer2.replace('geojson.html', 'geojson_popup.html'));

                                $("#esri2Dvariant").prop("href", viewer2.replace('geojson.html', 'geojson_v3.html'))
                                $("#esri2Dvariant-txt").text(viewer2.replace('geojson.html', 'geojson_v3.html'));


                 }


               

                 // ---------------- end --------- helper ------------


  
  
  
  
  // document ready short hand
  
  
  (async function($){

        
        $("#create_link_btn").click(creat_link_handler)

        $("#clear_btn").click(clear_all_handler)
        
                 
})(jQuery);
