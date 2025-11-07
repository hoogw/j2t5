 






    function reset_text(){  

        $('#arcgis_layer_url').val('');
        ___layer___id = ''
        ___mapserver___url = ''
        _arcgis_layer_url = ''
        fill_link()

  }




  


  function set_text(){




                _arcgis_layer_url = $("#arcgis_layer_url").val()


                // ------------ parse ------------ layer id   ------------  mapserver URL  ------------ 
                if (isValidHttpUrl(_arcgis_layer_url)){
                         
                        // get layer id from last  '.../7'
                        var _URL_object = new URL(_arcgis_layer_url)
                        var _pathname = _URL_object.pathname;  //   /arcgis/rest/services/Planning/zoning/MapServer/7
                        var _patharray = _pathname.split( '/' )               //  (8) ["", "arcgis", "rest", "services", "Planning", "zoning", "MapServer", "7"]
                        ___layer___id = _patharray[_patharray.length -1]     // 7

                        console.log(' _pathname', _pathname)
                        console.log(' _patharray', _patharray)
                        console.log(' ___layer___id', ___layer___id)

                        
                        var ___lastindexof_slash = _arcgis_layer_url.lastIndexOf('/');
                        ___mapserver___url = _arcgis_layer_url.substring(0, ___lastindexof_slash)
                        console.log(' ___mapserver___url', ___mapserver___url)




                        // https or http switch
                        if ( _URL_object.protocol === 'http://') {
                                googlemaps_base_url = googlemaps_base_url.replace('https://', 'http://')
                        } else if ( _URL_object.protocol === 'https://') {
                                googlemaps_base_url = googlemaps_base_url.replace('http://', 'https://')

                        }


                        // layer id must be a number
                        if (  ( ! isNaN(___layer___id) )  && (___layer___id.trim().length) ){ 
                        } else {
                                ___layer___id = ''
                        }  // valid layer id number

                } else {
                        ___mapserver___url = _arcgis_layer_url
                        ___layer___id = ''
                }


                fill_link()

}





 function fill_link(){




                        //Classified Google 4
                        _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps4/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#ClassifiedGoogle4").prop("href", _u_r_l_)
                        $("#ClassifiedGoogle4-txt").text(_u_r_l_);
                        console.log('classified --->>>>> ',  _u_r_l_ )

      
                        // Searchable Google 0
                        _u_r_l_ = googlemaps_base_url + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#SearchableGoogle0").prop("href", _u_r_l_)
                        $("#SearchableGoogle0-txt").text(_u_r_l_);


                        //Pop-up Google 7
                        _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps7/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#Pop-upGoogle7").prop("href", _u_r_l_)
                        $("#Pop-upGoogle7-txt").text(_u_r_l_);



                        //Clickable (Image) Google 110
                        _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps110/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#ClickableImageGoogle110").prop("href", _u_r_l_)
                        $("#ClickableImageGoogle110-txt").text(_u_r_l_);




                        //Clickable (Tile) Google 120
                        _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps120/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#ClickableTileGoogle120").prop("href", _u_r_l_)
                        $("#ClickableTileGoogle120-txt").text(_u_r_l_);



                         //Pop-up (Multilayer) Google 12
                         _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps12/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                         $("#Pop-upMultilayer12").prop("href", _u_r_l_)
                         $("#Pop-upMultilayer12-txt").text(_u_r_l_);




                        //Clickable (Multilayer) Google 111
                        _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps111/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#ClickableMultilayerGoogle111").prop("href", _u_r_l_)
                        $("#ClickableMultilayerGoogle111-txt").text(_u_r_l_);




                        // Searchable (Multilayer) Google 11
                        _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps11/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                        $("#SearchableMultilayerGoogle11").prop("href", _u_r_l_)
                        $("#SearchableMultilayerGoogle11-txt").text(_u_r_l_);




                         //Classified (Multilayer) Google 411
                         _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps411/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                         $("#ClassifiedMultilayerGoogle411").prop("href", _u_r_l_)
                         $("#ClassifiedMultilayerGoogle411-txt").text(_u_r_l_);
                      
 

                          //Classified clickable (Multilayer) Google 420
                          _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps420/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                          $("#ClassifiedMultilayerGoogle420").prop("href", _u_r_l_)
                          $("#ClassifiedMultilayerGoogle420-txt").text(_u_r_l_);



                           //Classified clickable image (Multilayer anywhere) Google 2110
                           _u_r_l_ = googlemaps_base_url.replace("googlemaps/default?", "googlemaps2110/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                           $("#ClassifiedMultilayerGoogle2110").prop("href", _u_r_l_)
                           $("#ClassifiedMultilayerGoogle2110-txt").text(_u_r_l_);



       // bings map       
       _u_r_l_ = bingmaps_base_url + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
       $("#BasicBing").prop("href", _u_r_l_)
       $("#BasicBing-txt").text(_u_r_l_);




       // mapbox
       _u_r_l_ = mapbox_base_url + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
       $("#BasicMapbox").prop("href", _u_r_l_)
       $("#BasicMapbox-txt").text(_u_r_l_);








       // esri
       // ESRI is different, should use layer url, _arcgis_layer_url, not mapserver url

                                //_u_r_l_ = esri3d_base_url + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
                                _u_r_l_ = esri3d_base_url + "layer_id=" +  ___layer___id  +  "&url=" + _arcgis_layer_url
                                $("#ESRI3D").prop("href", _u_r_l_)
                                $("#ESRI3D-txt").text(_u_r_l_);



                                _u_r_l_ = esri2d_base_url + "layer_id=" +  ___layer___id  +  "&url=" + _arcgis_layer_url
                                $("#ESRI2D").prop("href", _u_r_l_)
                                $("#ESRI2D-txt").text(_u_r_l_);



                                //http://localhost:10/mapserver1/viewer/?config=viewer_simple2&url=https://gis.la-quinta.org/arcgis/rest/services/TrackIt/TRACKiT_Data/MapServer/11&title=SOI&zoom=17&lat=33.6634&long=-116.31
                                _u_r_l_ = esri_classic_base_url + "title=" +  _arcgis_layer_url  +  "&url=" + _arcgis_layer_url
                                $("#ESRIClassic").prop("href", _u_r_l_)
                                $("#ESRIClassic-txt").text(_u_r_l_);





       // attribute table
                        //https://localhost:3200/arcgis/featuretable/default?cross=default&layer_id=11&layer=SOI&url=https://gis.la-quinta.org/arcgis/rest/services/TrackIt/TRACKiT_Data/MapServer
       _u_r_l_ = attributetable_base_url.replace("featuretable/default?", "featuretable4/default?") + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
       $("#AttributeTable4").prop("href", _u_r_l_)
       $("#AttributeTable4-txt").text(_u_r_l_);


       _u_r_l_ = attributetable_base_url + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
       $("#AttributeTable0").prop("href", _u_r_l_)
       $("#AttributeTable0-txt").text(_u_r_l_);






       _u_r_l_ = attributetable_esri_grid_base_url + "layer_id=" +  ___layer___id  +  "&url=" + ___mapserver___url
       $("#AttributeTableESRIGrid").prop("href", _u_r_l_)
       $("#AttributeTableESRIGrid-txt").text(_u_r_l_);




 }












  
  
  
  
  
  
  
  
  
  // document ready short hand
  
  
  (async function($){
         
        reset_text()
        $(".progress").hide(); 



        // ***************** text input on change event  ********************

                $("#close_icon_arcgis_layer").on('click', reset_text)
                                
                $("#arcgis_layer_url").on('input', set_text) 
        
        // ***************  End ********** search input on change event  ********************


                 
        })(jQuery);
