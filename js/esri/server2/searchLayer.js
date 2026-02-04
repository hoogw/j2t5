


// for-loop search is not slow, no need lunr. The slowness is rendering large amount item, already solved by 'scrollable' only show first 100 item until scroll to bottom to load others
// for-loop search 1 field, is simple 1 round loop, no need lunr. Only if full text search, multiple fields, need lunr. Because, for-loop search 10 fields is 10x round loop, will be slow.
   
// no lunr, no suggest, because it use nested recursive json, already complex, do not want more complex. just keep it simple






   // searchLayer.js search all layers ( under both /MapServer/0, /FeatureServer/0 ) and project those layers on google map.
   
   
// sample use:  
   //http://localhost:10/json2tree/searchLayer.html?org=City+Of+Los+Angeles&url=https://maps.lacity.org/arcgis/rest/services
   //   org= organization name
   //   url= arcgis server home url(/rest/services/) 
   //   cross=default,cors,jsonp,proxy ( cross origin method ), without this parameter, is 'default'
   //   


   //   or anysub folder, or  
   //&url=https://maps.lacity.org/arcgis/rest/services/Mapping
  
  // or xxx/MapServer
   //&url=https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer

    // or xxxxx/FeatureServer
   //&url=https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/ArcGIS/rest/services/Subway/FeatureServer
   
   

   
   
   
   //Do not use LRS - linear Reference Service, this is for electricity, gas line, water line only 
   //https://developers.arcgis.com/rest/services-reference/linear-referencing-service.htm
   
   
 



var input_current       // whole array of json, without filter, 
var _filtered_results   // filtered results


var _filter_by // search filter by keyword
var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500               
var short_list_count = 100     
var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'

var current_filter_result_count;
var __total_item_count;


// when stop search button clicked, this will become true.
var stop_search_status = false;


// when pause search button clicked, this will become true.
var pause_search_status = false;


var currentVersion = '0.0'





            

          function rendering_json_to_html(_results){
                
           

              var html = '';
            
          
          
            
              /*

              *    <ol>
              *        <li>
              *             <a href=''> xxx </a>
              *        </li>  
              *           
              *        <li>
              *             <a href=''> xxx </a>
              *        </li>  
              *        
              *        <li>
              *             <a href=''> xxx </a>
              *        </li>  
              *    </ol>
              *   
              *   
            
              */
              
              
              
              // ---------- build --------------
              
              
              
              
                      
                        html += '<div>';
            
                          if (_results.length > 0) {



                                        html += '<ol class="custom-counter">';
                                        

                                        for (var i = 0; i < _results.length; ++i) {

                                          
                                          html += '<li>' // css .ordered_list_number{ size font};


                          
                            
                                              var _____type = _results[i].type;

                                              // v10.6 and below, type is always undefined
                                              if ((_____type == undefined) || (_____type == "undefined")){

                                                                          _____type = 'unknown'
                                              } else {
                                                                        //  _____type = _____type.toLowerCase();
                                                                          
                                              }



                                              var _____layer_name = _results[i].name;
                                              
                                              var _____layer_id = _results[i].id;

                                              var _____layer_url = _results[i]._layer_url;

                                              var _____table_url = _results[i]._table_url;
                                              

                                              var _____center_lat = _results[i]._center_lat;
                                              var _____center_long = _results[i]._center_long;
                                              var _____center_zoom = _results[i]._center_zoom;
                              
                                              // ....... strip HTML from a string  .....
                                                
                                              
                                                    // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
                                              
                                                    // ==== first step: remove html tag
                                                  
                                                    var _name_stripedHtml = $("<div>").html(_____layer_name).text();
                                                    
                                                    // regular express remove <xxx> tag 
                                                    // str = str.replace(/[^a-z0-9-]/g, '');
                                                    /*
                                                        Everything between the indicates what your are looking for

                                                        / is here to delimit your pattern so you have one to start and one to end
                                                        [] indicates the pattern your are looking for on one specific character
                                                        ^ indicates that you want every character NOT corresponding to what follows
                                                        a-z matches any character between 'a' and 'z' included
                                                        0-9 matches any digit between '0' and '9' included (meaning any digit)
                                                        - the '-' character
                                                        g at the end is a special parameter saying that you do not want you regex to stop on the first character matching your pattern but to continue on the whole string
                                                      */
                                                      // 
                                                    //_description_stripedHtml = _description_stripedHtml.replace(/<[^>]+>/g, '');
                                                    //_name_stripedHtml = _name_stripedHtml.replace(/<[^>]+>/g, '');



                                                    // ==== second step: encode >, <, 
                                                    
                                                    
                                                    _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                                                    _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');
                                                    
                                                    
                                              
                                              // ....... end ......  strip HTML from a string  .....
                            
                            
                                                        /**/
                            
                                                        // order is matter,  table, raster must before MapServer
                                                        if ((_____type.includes("table")) || (_____type.includes("Table"))){       

                                                              // ============= for feature tables only =====================
                                                                                              /**/
                                                                    
                                                                    // text
                                                                    html += '<big><b>&nbsp;'
                                                                    html += '<span class="context">'  + _name_stripedHtml + '&nbsp;&nbsp;<small><sup>' +  _____type  +  '</sup></small></span>'
                                                                    html += '</b></big>'


                                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                    //====== original source icon  ======
                                                                        html += '<a target="_blank" href="' + _____table_url +  '/' +  _____layer_id   +  '">' 
                                                                        html +=   _____table_url +  '/' +  _____layer_id;  //'origin';
                                                                        html +=  '</a>';
                                                                    //====== end ===== original source icon  ====== 
                                                                    
                                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                              

                                                                                        // --------  attribute table  ---- rest api --------

                                                                                                  // featuretable4 -  - default     ?cross=default
                                                                                                  html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default');    
                                                                                                  html += '&layer_id=' + _____layer_id + '&layer='+ _____layer_name  + '&url=' + _____table_url + '" class="hoverable green-text" >';
                                                                                                  html += '<big>T4</big>';
                                                                                                  html += '</a>';

                                                                                                  html +='&nbsp;&nbsp;&nbsp;'
                                                          
                                                                                                  // featuretable -  - default     ?cross=default
                                                                                                  html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default');    
                                                                                                  html += '&layer_id=' + _____layer_id + '&layer='+ _____layer_name  + '&url=' + _____table_url + '" class="hoverable green-text" >';
                                                                                                  html += '<big>T0</big>' 
                                                                                                  html += '</a>';

                                                                                                  html +='&nbsp;&nbsp;&nbsp;'
                                                                                                  
                                                                                                    // featuretable - esri grid
                                                                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table;  
                                                                                                    html += '&layer_id=' + _____layer_id + '&layer='+ _____layer_name + '&url=' + _____table_url + '" class="hoverable green-text" >';
                                                                                                    html += '<big>T-grid</big>'
                                                                                                    html += '</a>';

                                                                                                    html +='&nbsp;&nbsp;&nbsp;'
                                                                                    
                                                                                        // -------- end --------   attribute table  ---- rest api --------
                                  /**/
                                                                /**/
                                                                // ======  End ======= for tables only =====================
                                                                
                                                        } else {
                                                              
                                                            // render layer only
                                                            /**/
                                                            // order is matter,  table, raster must before MapServer     
                                                            if (_____type.includes("Raster")) {      
                                                              // ********** raster layers only **********
                                        /**/
                                                                                                
                                                                                                      
                                  /**/
                                                                                              // text
                                                                                              html += '<big><b>&nbsp;'
                                                                                              html += '<span class="context">'  + _name_stripedHtml + '&nbsp;&nbsp;<small><sup>' +  _____type  +   '</sup></small></span>'
                                                                                              html += '</b></big>'

                                                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                                                                                              //====== original source icon  ======
                                                                                                html += '<a target="_blank" href="' + _____layer_url +  '/' +  _____layer_id   + '">';
                                                                                                html +=  _____layer_url +  '/' +  _____layer_id; //'origin'  
                                                                                                html +=  '</a>';
                                                                                              //====== end ===== original source icon  ======  
                                                                                              
                                                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                            
                                                                                        //*********  google ***********  
                                  /**/
                                                                                              // icon+ view map =  googlemap917 
                                                                                              html += '<a target="_blank" href="' + url_template_base_googlemaps_rasterLayer.replace('googlemaps912/default?','googlemaps917/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                              html += '<big>917</big>' 
                                                                                              html +=  '</a>';

                                                                                              html +='&nbsp;&nbsp;&nbsp;'

                                                                                              // icon+ view map =  googlemap912  
                                                                                              html += '<a target="_blank" href="' + url_template_base_googlemaps_rasterLayer + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                              html += '<big>912</big>'  
                                                                                              html +=  '</a>';

                                                                                              html +='&nbsp;&nbsp;&nbsp;'

                                                                                      //  *** end ******  google *********** 

                                  /**/
                                                                                              /* raster layer does not work with classic 
                                                                                              // icon+ view map =  ESRI CMV native v3.x
                                                                                              html += '<a target="_blank" href="' + url_template_base_esri2  + '&url=' + _____layer_url + '/'+ _____layer_id + '&title='+ _____layer_name  +  '&zoom=' + _____center_zoom + '&lat='+ _____center_lat +  '&long=' +  _____center_long   +'">';
                                                                                              html += '<big>Classic</big>'
                                                                                              html += '</a>';
                                                                                              */

                                                                    // only for  "raster catalog layer", show raster tile boundary as feature layer.
                                                                    if (_____type == "Raster Catalog Layer") {

                                                                                                          /*
                                                                                                                only for  "raster catalog layer"
                                                                                                                "Raster Catalog Layer" , is a layer with tile grid line only, no tile, 
                                                                                                                just treat it as regular 'feature layer' ,  show raster tile boundary as feature layer.
                                                                                                                this only apply for "Raster Catalog Layer", for normal "raster layer", use link above
                                                                                                                
                                                                                                                Warning:   following are image-server, not Raster Catalog Layer
                                                                                                                                                https://gis.anaheim.net/server/rest/services/Orange_County_Hillshade/ImageServer
                                                                                                                                                http://localhost:10/json2tree/esri/server/folder.html?url=https%3A%2F%2Fgis.anaheim.net%2Fserver%2Frest%2Fservices&org=Anaheim&_center_lat=33.836594&_center_long=-117.914299&_center_zoom=17&select_folder=193&select_layer=0
                                                                                                                                                Raster Catalog Item :  https://developers.arcgis.com/rest/services-reference/enterprise/raster-catalog-item.htm
                                                                                                                                                Raster Image :  https://developers.arcgis.com/rest/services-reference/enterprise/raster-image.htm
                                                                                                                                                lot of image raster, here:  https://gis.anaheim.net/server/rest/services
                                                                                                          */
                                    
                                                                                                                // g   Tile Grid Line only, no image, searchable
                                                                                                                html += '<a target="_blank" href="' + url_template_googlemaps  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '" class="hoverable purple-text"  >';
                                                                                                                html += '<big>0</big>' 
                                                                                                                html +=  '</a>';

                                                                                                                html +='&nbsp;&nbsp;&nbsp;'

                                                                                                                // g111   Tile Grid Line only, no image, image priority
                                                                                                                html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps111/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '" class="hoverable purple-text"  >';
                                                                                                                html += '<big>111</big>' 
                                                                                                                html +=  '</a>';

                                                                                                                html +='&nbsp;&nbsp;&nbsp;'
                                                                      }

                                                                


                                                              // **********  end  **********  raster layers only **********



                                                      
                                                            
                                                            }  else if (_____layer_url.includes('SceneServer')){

                                                                /*
                                                                    only for 'SceneServer'
                                                                    SceneServer , available at searchMapServer.html, however, I duplicate by showing it here at  searchLayer.html, they share the same code 
                                                                    
                                                                    special case: 
                                                                                  type: undefined  ,   "FeatureServer" already processed previously. only handle 'SceneServer'

                                                                        id: 0
                                                                        name: "AnaheimBuildings"
                                                                        type: undefined
                                                                        _center_lat: "33.836594"
                                                                        _center_long: "-117.914299"
                                                                        _center_zoom: "17"
                                                                        _layer_path: "/Hosted/Test_Local_Gov_Scene_WFL1"
                                                                        _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"

                                                                        id: 0
                                                                        name: "3D Buildings"
                                                                        type: undefined
                                                                        _center_lat: "33.836594"
                                                                        _center_long: "-117.914299"
                                                                        _center_zoom: "17"
                                                                        _layer_path: "/Hosted/GIS_DAY_3D_WSL1"
                                                                        _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/GIS_DAY_3D_WSL1/SceneServer"

                                                                  */
                                                              
                                                                                    
                                                                                          
                                                                                  // text
                                                                                  html += '<big><b>&nbsp;'
                                                                                  html += '<span class="context">'  + _name_stripedHtml + '&nbsp;&nbsp;<small><sup>'  + 'SceneServer' +  '</sup></small></span>'
                                                                                  html += '</b></big>'

                                                                                  html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                  //====== original source icon  ======
                                                                                      html += '<a target="_blank" href="' + _____layer_url +  '/' +  _____layer_id   + '">';
                                                                                      html +=  _____layer_url +  '/' +  _____layer_id;  //'origin'  
                                                                                      html +=  '</a>';
                                                                                  //====== end ===== original source icon  ======  
                                                                                    
                                                                                    
                                                                                  html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                  
                                                                                                  // esri v4.x icon
                                                                                                  html += '<a target="_blank" href="' + url_template_base_esri_scene_layer
                                                                                                  html += '&url=' + _____layer_url + '&layer='+ _____layer_name  +   '&_center_zoom=' + _____center_zoom + '&_center_lat='+ _____center_lat +  '&_center_long=' +  _____center_long  
                                                                                                  html += '">';
                                                                                                
                                                                                                  html += '<big>e140</big>'  
                                                                                                  html +=  '</a>';


                                                                                                  html +='&nbsp;&nbsp;&nbsp;'
                                                                                                
                                                                                                  //popup 
                                                                                                  // esri v4.x icon
                                                                                                  html += '<a target="_blank" href="' + url_template_base_esri_scene_layer.replace('scenelayer.html','scenelayer2.html')
                                                                                                  html += '&url=' +  _____layer_url + '&layer='+ _____layer_name  +   '&_center_zoom=' + _____center_zoom + '&_center_lat='+ _____center_lat +  '&_center_long=' +  _____center_long  
                                                                                                  html += '">';
                                                                                                
                                                                                                  html += '<big>e141</big>'    
                                                                                                  html +=  '</a>';

                                                                                                  html +='&nbsp;&nbsp;&nbsp;'

                                                            
                                                            }  else    {   


                                                                            /*

                                                                                  ____type.includes("Feature"))  or undefined unknow type  all treat as 'feature' layer icon

                                                                                  everything else, can't identify, by type, or by url    

                                                                              
                                                                                  
                                                                                    special case, some time, type is undefined, but it is a featuerServer

                                                                                        id: 0
                                                                                        name: "AnaheimBuildings"
                                                                                        type: undefined
                                                                                        _center_lat: "33.836594"
                                                                                        _center_long: "-117.914299"
                                                                                        _center_zoom: "17"
                                                                                        _layer_path: "/Hosted/Test_Local_Gov_Scene_WFL1"
                                                                                        _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"

                                                                                


                                                                                        
                                                                                        annotation layer example:   type:undefined
                                                                                        http://localhost:10/json2tree/esri/server/searchLayer.html?url=https%3A%2F%2Femapsplus.com%2Farcgis%2Frest%2Fservices%2FAlabama%2FAutaugaAnalyst%2FMapServer&org=Autauga+County%2C%C2%A0%C2%A0Alabama+State%2C%C2%A0%C2%A0https%3A%2F%2Femapsplus.com%2Farcgis%2Frest%2Fservices%2FAlabama%2FAutaugaAnalyst%2FMapServer&_center_lat=32.636507341858454&_center_long=-86.62695338761657&_center_zoom=16&filter_by=
                                                                                        
                                                                                        temp assuming all  type:undefined -> annotation layer
                                                                

                                                                            */
                                                                              

                                                                            if   (_____type.includes("Feature")){ 
                                                                                                              
                                                                                                      // text
                                                                                                      html += '<big><b>&nbsp;'
                                                                                                      html += '<span class="context">'  + _name_stripedHtml + '</span>'
                                                                                                      html += '</b></big>'

                                                                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                                      //====== original source icon  ======
                                                                                                        html += '<a target="_blank" href="' + _____layer_url +  '/' +  _____layer_id   + '">';
                                                                                                        html +=  _____layer_url +  '/' +  _____layer_id;  //'origin'  
                                                                                                        html +=  '</a>';
                                                                                                      //====== end ===== original source icon  ======     
                                                                                                        
                                                                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'



                                                                            } else {

                                                                                      // unknow undefined type

                                                                                      var _unknow_item = _results[i]
                                                                                      console.log(' **** **** unknow **** **** item **** ****',  _unknow_item )

                                                                                      var _unknow_url
                                                                                      var _unknow_layer_id
                                                                                      var _unknow_type = _results[i].type
                                                                                      

                                                                                      //  _layer_url, only for searchLayer.html   
                                                                                      if (_results[i]._layer_url) {
                                                                                        _unknow_url = _results[i]._layer_url
                                                                                        _unknow_layer_id = _results[i].id
                                                                                        }
                                                                                        if (_results[i]._table_url) {
                                                                                          _unknow_url = _results[i]._table_url
                                                                                          _unknow_layer_id = _results[i].id
                                                                                        }

                                                                                          //  absolute_url, only for searchMapServer.html
                                                                                        if (_results[i].absolute_url) {
                                                                                          _unknow_url = _results[i].absolute_url
                                                                                          _unknow_layer_id = ''
                                                                                        }


                                                                                          // text
                                                                                          html += '<big><b>&nbsp;'
                                                                                          html += '<span class="context">'  + _name_stripedHtml + '</span>'
                                                                                          html += '</b></big>'

                                                                                          html +='&nbsp;&nbsp;&nbsp;'
                                                                                        
                                                                                          // unknow type, undefined, lable
                                                                                        // html += '<b>' +  _unknow_type  +   '</b>(type)' ;

                                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                          //====== original source icon  ======
                                                                                            html += '<a target="_blank" href="' + _unknow_url +  '/' +  _unknow_layer_id   + '">';
                                                                                            html +=  _unknow_url +  '/' +  _unknow_layer_id;    //'origin'  
                                                                                            html +=  '</a>';
                                                                                          //====== end ===== original source icon  ======  

                                                                                        

                                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                                                                            }





                                                                                    // ============= feature layers only =====================

                                                                                    
                                                                                       
 /**/
                                                                                    //*********  google *********** 
                                                                                        
 /**/
                                                                                        // .... single layer .... google ....
                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>0</big>' 
                                                                                        html +=  '</a>';
                                                                                        html +='&nbsp;&nbsp;&nbsp;'

                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps10/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>10</big>'  
                                                                                        html +=  '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                  
                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps110/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>110</big>' 
                                                                                        html += '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                  
                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps120/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>120</big>'  
                                                                                        html +=  '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                        //  ....  end  .... single layer .... google ....
                                                                                        /**/
                  



                                                                                        /**/
                                                                                        // ==== data classified =====  google  =====  
                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps4/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>4</big>' 
                                                                                        html +=  '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'

                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps141/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>141</big>' 
                                                                                        html +=  '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'

                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps140/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>140</big>' 
                                                                                        html +=  '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                      
                                                                                        html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps410/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                                        html += '<big>410</big>' 
                                                                                        html +=  '</a>';
                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                        // ==== data classified =====  google  ===== 
                                                                                        /**/ 

                                          
                                                                                    //  *** end ******  google *********** 
                                                                                    /**/






                                                      // -- -- apple  -- -- 

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                  html += '<big>A0</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps/default2?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                  html += '<big>A0p</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps20/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                  html += '<big>A20</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps20/default2?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                  html += '<big>A20p</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps120/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                  html += '<big>A120</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                      //  -- --  end  -- -- apple  -- -- 
                                                      /**/




                                                        // .. ... bingmaps  .. ... 

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>B0</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps10/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>B10</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps20/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>B20</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps110/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>B110</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps120/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>B120</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                        //  .. ...  end .. ... bingmaps  .. ... 
                                                        /**/


                                                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'



                                                        // .. ... heremaps  .. ... 

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>H0</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps10/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>H10</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps20/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>H20</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps110/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>H110</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps120/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                              html += '<big>H120</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                        //  .. ...  end .. ... heremaps  .. ... 
                                                        /**/





                                                        // -- mapbox  -- 

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                    html += '<big>M0</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox10/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                    html += '<big>M10</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox20/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                    html += '<big>M20</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox110/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                    html += '<big>M110</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox120/default?')  + '&layer_id=' + _____layer_id + '&layer='+ _____layer_name +  '&center_lat='+ _____center_lat + '&center_long='+  _____center_long + '&center_zoom=' + _____center_zoom + '&url=' + _____layer_url + '">';
                                                                    html += '<big>M120</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                        //   --  end  -- mapbox  -- 
                                                        /**/

                                                            




/**/
// ----- esri ----- 
              var _newTab_link =  url_template_base_esri_usgs + '/explore.html?backgroundlayerurl=' + _____layer_url + '/'+ _____layer_id 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              html += '<a target="_blank" href="' + _newTab_link + '">';
              html += '<big>e11</big>'
              html +=  '</a>';
              html +='&nbsp;&nbsp;&nbsp;'



              var _newTab_link =  url_template_base_esri_usgs + '/explore_hover.html?backgroundlayerurl=' + _____layer_url + '/'+ _____layer_id 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              html += '<a target="_blank" href="' + _newTab_link + '">';
              html += '<big>e12</big>'
              html +=  '</a>';
              html +='&nbsp;&nbsp;&nbsp;'



              var _newTab_link =  url_template_base_esri_usgs + '/classify_data.html?backgroundlayerurl=' + _____layer_url + '/'+ _____layer_id 
              // token
              if (arcgis_online_token){
                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              html += '<a target="_blank" href="' + _newTab_link + '">';
              html += '<big>e41</big>'
              html +=  '</a>';
              html +='&nbsp;&nbsp;&nbsp;'



              var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature.html?') +  '&backgroundlayerurl=' + _____layer_url + '/'+ _____layer_id 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              html += '<a target="_blank" href="' + _newTab_link + '">';
              html += '<big>e22</big>'
              html +=  '</a>';
              html +='&nbsp;&nbsp;&nbsp;'


              var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature.html?') +  '&backgroundlayerurl=' + _____layer_url + '/'+ _____layer_id 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              html += '<a target="_blank" href="' + _newTab_link + '">';
              html += '<big>e23</big>'
              html +=  '</a>';
              html +='&nbsp;&nbsp;&nbsp;'



// -----  end ----- esri ----- 
/**/





                                                                                                                // --------  attribute table  ---- rest api --------
                                                              
                                                                                                                                // featuretable4 -  - default     ?cross=default
                                                                                                                                html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default');    
                                                                                                                                html += '&layer_id=' + _____layer_id + '&layer='+ _____layer_name  + '&url=' + _____layer_url + '" class="hoverable green-text" >';
                                                                                                                                html += '<big>T4</big>';
                                                                                                                                html += '</a>';
                                                                                        
                                                                                                                                html +='&nbsp;&nbsp;&nbsp;'
                                                                                        
                                                                                                                                // featuretable -  - default     ?cross=default
                                                                                                                                html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default');    
                                                                                                                                html += '&layer_id=' + _____layer_id + '&layer='+ _____layer_name  + '&url=' + _____layer_url + '" class="hoverable green-text" >';
                                                                                                                                html += '<big>T0</big>' 
                                                                                                                                html += '</a>';
                                                                                                                                
                                                                                                                                html +='&nbsp;&nbsp;&nbsp;'
                                                                                        
                                                                                                                                  // featuretable - esri grid
                                                                                                                                  html += '<a target="_blank" href="' + url_template_arcgis_feature_table;  
                                                                                                                                  html += '&layer_id=' + _____layer_id + '&layer='+ _____layer_name + '&url=' + _____layer_url + '" class="hoverable green-text" >';
                                                                                                                                  html += '<big>T-grid</big>'
                                                                                                                                  html += '</a>';
                                                                                                            
                                                                                                                // -------- end --------   attribute table  ---- rest api --------


                                                                                       /**/
                                                                                                               
                                                                                          
                                                                                    // ======  End ======= feature layers only =====================


                                                            } // else if  for layer only
                                                        } // table        
                          
                          
                                       

                                          html += '<br><br>';
                                          html += '</li>';
                                        }// for


                                          
                                          html += '</ol>';

                              }
                                else {
                                  // html += '[]';
                                }

                
                
                
                            html +='</div>'
                            
                // --------- end --------- build --------------
                
              



                $('#json-renderer').html(html);



          }  // function



  
  
          function render_single_imageserver(_imageServer_root, _imageServer_url){


            /*

                                                  
                                                          .../rest/services/.../ImageServer
                                                          https://emapsplus.com/arcgis/rest/services/Orthos/ALBarbour2015/ImageServer

                                                               {
                                                                  advancedQueryCapabilities: {useStandardizedQueries: true, supportsStatistics: true, supportsOrderBy: true, supportsDistinct: true,…}
                                                                  allowComputeTiePoints: false
                                                                  allowRasterFunction: true
                                                                  allowedMosaicMethods: "NorthWest,Center,LockRaster,ByAttribute,Nadir,Viewpoint,Seamline,None"
                                                                  bandCount: 3
                                                                  capabilities: "Image,Metadata,Catalog"
                                                                  copyrightText: ""
                                                                  currentVersion: 10.31
                                                                  defaultCompressionQuality: 75
                                                                  defaultMosaicMethod: "Northwest"
                                                                  defaultResamplingMethod: "Bilinear"
                                                                  description: "Orthos/ALBarbour2015"
                                                                  editFieldsInfo: null
                                                                  exportTilesAllowed: false
                                                                  extent: {xmin: 680085.0512943268, ymin: 383020.5546703398, xmax: 916230.5512943268, ymax: 617293.0546703398,…}
                                                                  fields: [{name: "OBJECTID", type: "esriFieldTypeOID", alias: "OBJECTID", domain: null},…]
                                                                  fullExtent: {xmin: 680085.0512943268, ymin: 383020.5546703398, xmax: 916230.5512943268, ymax: 617293.0546703398,…}
                                                                  hasColormap: false
                                                                  hasHistograms: true
                                                                  hasMultidimensions: false
                                                                  hasRasterAttributeTable: false
                                                                  initialExtent: {xmin: 680085.0512943268, ymin: 383020.5546703398, xmax: 916230.5512943268, ymax: 617293.0546703398,…}
                                                                  maxDownloadImageCount: 20
                                                                  maxDownloadSizeLimit: 2048
                                                                  maxImageHeight: 4100
                                                                  maxImageWidth: 15000
                                                                  maxMosaicImageCount: 20
                                                                  maxPixelSize: 0
                                                                  maxRecordCount: 1000
                                                                  maxScale: 0
                                                                  maxValues: [255, 255, 255]
                                                                  meanValues: [68.50144885956104, 83.65670840420518, 82.23853310654343]
                                                                  mensurationCapabilities: "None"
                                                                  minPixelSize: 0
                                                                  minScale: 0
                                                                  minValues: [0, 0, 0]
                                                                  mosaicOperator: "First"
                                                                  name: "Orthos/ALBarbour2015"
                                                                  objectIdField: "OBJECTID"
                                                                  ownershipBasedAccessControlForRasters: null
                                                                  pixelSizeX: 0.5
                                                                  pixelSizeY: 0.5
                                                                  pixelType: "U8"
                                                                  rasterFunctionInfos: []
                                                                  rasterTypeInfos: [{name: "Raster Dataset", description: "Supports all ArcGIS Raster Datasets", help: ""}]
                                                                  serviceDataType: "esriImageServiceDataTypeRGB"
                                                                  serviceDescription: ""
                                                                  sortField: ""
                                                                  sortValue: null
                                                                  spatialReference: {wkid: 102629, latestWkid: 102629}
                                                                  stdvValues: [54.08312313448168, 61.45362817410963, 59.15355889026894]
                                                                  supportsAdvancedQueries: true
                                                                  supportsStatistics: true
                                                                  useStandardizedQueries: true
                                                               }


                                                               ImageServer have single layer, no nested structure, so just output 1 single layer


                                                */


                                                               // get center lat, center long, from image-server "extent" , "fullextent" properties
                                                               // not use, because it slow down the whole process
                                                               //clientSide_project(_imageServer_root) 



                                                               //------ show title and url link ------ 
                                                                      //$('#message_div').html('<a target="_blank" id="_orgnization_link">' + _organization + '  |  v' + currentVersion + '  |  ' + _imageServer_url   +  '</a> ' );
                                                                      var _html_org = '     <h1 style="display:inline;"  ><b>  <a target="_blank" id="_orgnization_link">' + _organization + '</a></b></h1>'
                                                                      _html_org    += '<h3 style="display:inline;"                   ><sup>     &nbsp;Arcgis Enterprise v<big>' + currentVersion + '</big></sup></h3>'
                                                                      _html_org    += '<br> <h3 style="display:inline;"  ><sup><a target="_blank" id="_orgnization_link2">&nbsp;' + _imageServer_url + '</a></sup></h3>'
                                                                      
                                                                      $('#message_div').html( _html_org);
                                                                      
                                                                      // only for searchLayer,   href do not use ___hostname, should use true url
                                                                      $('#_orgnization_link').attr("href",  _imageServer_url);
                                                                      $('#_orgnization_link2').attr("href",  _imageServer_url);
                                                                      /*
                                                                      // ****  add tool tip to message orgnization   ****  
                                                                            $('#_orgnization_link').attr("class", 'hoverable tooltipped');
                                                                            $('#_orgnization_link').attr("data-position", 'bottom');
                                                                            $('#_orgnization_link').attr("data-tooltip", 'https://'+ _imageServer_url);
                                                                            // fix bug, must init tooltips(), every time get new search result
                                                                            $('.tooltipped').tooltip();
                                                                      // ****  add tool tip to message orgnization   ****  
                                                                      */

                                                                    /**/
                                                                //------ show title and url link ------ 






                                                               var html = '';
                                                               html += '<div>';
                                                               html += '<ol class="custom-counter">';
                                                               html += '<li>' // css .ordered_list_number{ size font};
                                                              

                                                               var _name = _imageServer_root.name;
                                                               var _name_stripedHtml = $("<div>").html(_name).text();
                                                               _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                                                               _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');

                                                            // ImageServer

                                                      
                                

                                                      // text- without link
                                                      html += '<big><b>&nbsp;'        
                                                      html += '<span class="context">'  + _name_stripedHtml + '&nbsp;&nbsp;<small><sup>'  + 'ImageServer' +  '</sup></small></span>'
                                                      html += '</b></big>'

                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                      //====== original source icon  ======
                                                              html += '<a target="_blank" href="' + _imageServer_url
                                                              html += '">';
                                                              html += _imageServer_url;   //'origin'    
                                                              html +=  '</a>';
                                                      //====== end ===== original source icon  ======

                                
                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                 
                                                            // google g9
                                                            html += '<a target="_blank" href="' + url_template_base_googlemaps_imageServer
                                                            html += '&url=' + _imageServer_url +   '&layer='+ _name_stripedHtml  +  '&center_zoom=' + _center_zoom + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                            html += '">';
                                                            html += '<big>9</big>'    
                                                            html +=  '</a>';

                                                            html +='&nbsp;&nbsp;&nbsp;'
                                                          
                                                          

                                                            // google g911
                                                            html += '<a target="_blank" href="' + url_template_base_googlemaps_imageServer.replace('googlemaps9/default?','googlemaps911/default?')
                                                            html += '&url=' + _imageServer_url +   '&layer='+ _name_stripedHtml  +  '&center_zoom=' + _center_zoom + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                            html += '">';
                                                            html += '<big>911</big>'    
                                                            html +=  '</a>';

                                                            html +='&nbsp;&nbsp;&nbsp;'
                                                          
                                                            
                                                            // esri v4.x icon
                                                              html += '<a target="_blank" href="' + url_template_base_esri_imagery_layer
                                                              html += '&url=' + _imageServer_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=' + _center_zoom + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                            
                                                              html += '<big>3D</big>'
                                                              html +=  '</a>';

                                                              html +='&nbsp;&nbsp;&nbsp;'
                                                            
                                                            
                                                              //popup 
                                                            // esri v4.x icon
                                                              html += '<a target="_blank" href="' + url_template_base_esri_imagery_layer_popup
                                                              html += '&url=' + _imageServer_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=' + _center_zoom + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                            
                                                              html += '<big>2D</big>'
                                                              html +=  '</a>';

                                                              html +='&nbsp;&nbsp;&nbsp;'
                                                            
                                                            
                                                              // CMV icon v3.x
                                                              html += '<a target="_blank" href="' + url_template_base_esri3  
                                                              html += '&url=' + _imageServer_url + '&title='+ _name_stripedHtml  +  '&zoom=' + _center_zoom +  '&lat='+ _center_lat +  '&long=' +  _center_long 
                                                              html += '">' 

                                                              html += '<big>Classic</big>'
                                                              html +=  '</a>';

                                                              html +='&nbsp;&nbsp;&nbsp;'
                                                              
                                                                                                                          
                                                              html += '<br><br>';
                                                              html += '</li>';
                                                              html += '</ol>';
                                                              html +='</div>'

                                                              $('#json-renderer').html(html);


          }
  
  
  
  
  
                            
                            

                     //************** recursive streaming ****************************


                 
                 



                              
                              
                            async function nested_to_flat(_url){




                                  
                                    var _flat = [];     // ... accumulated...
                                    var _just_get = []  // not accumulat, only the current transaction get
                                    
                                  
                                    console.log('_url root  ....', _url)
                                  
                                    progressing_info('Root url', _url );

                                    var root =await arcgis_ajax_cross_origin(_url, _cross);  // cross origin method 
                                    
                                    console.log( 'raw root response >>>>>  ', root)
                                    currentVersion = root.currentVersion


                                   /*

                                       good root:
                                        {

                                        
                                           
                                            absolute_path: "https://services.arcgis.com/aA3snZwJfFkVyDuP/arcgis/rest/services",
                                            currentVersion: 10.81, 
                                            id: 0,
                                            relative_path: "/",

                                            folders: [{},{}....], 
                                            services: [{},{}....], 
                                            

                                               // special case, only for seattle, it is a mapserver node,not regular folder node
                                                layers: [{},{}....], 
                                         }




                                       bad root:
                                                 {
                                                    absolute_path: "http://www.dot.state.ak.us/ArcGIS/rest/services"
                                                    errorFrom: "ajax_jsonp_json_proxy_proxy3"
                                                    id: 0
                                                    readyState: 4
                                                    relative_path: "/"
                                                    responseJSON: undefined
                                                    status: 502
                                                    statusText: "Bad Gateway"
                                                 }

                                    
                                    */
                                    


                                   if ((root.folders) || (root.services) || (root.layers)) {

                                            
                                             
                                             
                                            



                                                              // add relative path reference
                                                              root.relative_path = '';
                                                              root.absolute_path = _url;
                                                              // build stack
                                                          
                                                          
                                                              var stack = new Stack();
                                                              stack.push(root);
                                                          
                                                          
                                                              // console.log(stack.count);
                                                              
                                                              while(stack.count > 0) {
                                                                          

                                                               






                                                                        var current = stack.pop();
                                                                        
                                                                      // console.log('current-------',current);
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        // all layers ---> flat 
                                                                        if (current.hasOwnProperty('layers')  && (current.layers !== null ) && (current.layers !== '' )) {

                                                                              var current_layers = current.layers;
                                                                            
                                                                              


                                                                              for (var k1 = 0; k1 < current_layers.length; k1++) {
                                                                                        
                                                                                        // For layers:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                                                                                        
                                                                                        
                                                                                        // console.log('current_layers::::: ',current_layers)
                                                                                        
                                                                                        if ((current_layers[k1].hasOwnProperty('name')) && (current_layers[k1].hasOwnProperty('id')) ) {
                                                                                            
                                                                                                  // layers, subLayerIds == null, means this is solid layer, can display
                                                                                                  // if subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it. 
                                                                                                  if (current_layers[k1].subLayerIds == null) { 
                                                                                                  
                                                                                                                  // solid layer,  need to count, add to final flat array 
                                                                                            
                                                                                                                    /* not use, because it slow down the whole process
                                                                                    
                                                                                                                    // ---- only ajax once last map server to calculate center lat long -----
                                                                                                                      // if in URL, no lat,long provided,  arcgis_common_share extract lat lng from URL is null, {_center_lat: null, _center_long: null}
                                                                                                                      if (( _center._center_lat == null ) ||  ( _center._center_long == null )
                                                                                                                            || ( _center._center_lat == default_center_lat ) ||  ( _center._center_long == default_center_long )
                                                                                                                         ){ 
                                                                                                                               console.log(' client side project use first layer > ',current_layers[k1] )
                                                                                                                              // must exclude sample layer like :  Cities, Continent, World
                                                                                                                              var  _layer__name = current_layers[k1].name
                                                                                                                              if ((_layer__name.toLowerCase().indexOf("world") == -1) &&
                                                                                                                                  (_layer__name.toLowerCase().indexOf("cities") == -1) &&
                                                                                                                                  (_layer__name.toLowerCase().indexOf("continent") == -1)){

                                                                                                                                              // server side projection: (Do not delete, keep)
                                                                                                                                                 // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                                                                                                 // _center = await calculate_center_lat_long(current);
                                                                                                                                                  // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                                                                                                 // _center = await proj4js_centerLatLong(current);
                                                                                                                                                 // console.log(' server side prjection get center ====> ', _center)
                                                                                                                                                 // update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                 // update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                 // if ( _center._center_zoom == null ) {
                                                                                                                                                 //   update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                 // }

                                                                                                                                              // client-side re-projection, no ajax, no geometryServer 
                                                                                                                                               // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                                                                                               // await does not works,  we manually set it run how many times
                                                                                                                                              if (runClientProjectTimes < runClientProjectLimit) {
                                                                                                                                                        runClientProjectTimes += 1;
                                                                                                                                                        // arcgis js api , load "project" class
                                                                                                                                                        clientSide_project(current) 
                                                                                                                                              } 
                                                                                                                                  }// if
                                                                                                                      }//if
                                                                                                                    // ----  ------- end ------------- only ajax once last map server to calculate center lat long -----
                                                                                    
                                                                                                                    */



                                                                                                                    



                                                                                                                      var _absolute_url = _url;  //  _url(service type) is  xxx/mapserver
                                                                                                                                            
                                                                                                                      // _url(home, folder type) is xxx/rest/service or any folder
                                                                                                                      if (current.hasOwnProperty('absolute_path')){
                                                                                                                          _absolute_url = current.absolute_path;
                                                                                                                      }
                                                                                                                      
                                                                                                                        
                                                                                                                        
                                                                                                                        var _relative_path = _url; 
                                                                                                                        if (current.hasOwnProperty('relative_path')){
                                                                                                                            
                                                                                                                            _relative_path = current.relative_path;
                                                                                                                        }
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        // layer type could be :  Feature Layer  or  Raster Layer ( use google12 ) ,  
                                                                                                                        var _layer = {"type": current_layers[k1].type, "name": current_layers[k1].name, "id": current_layers[k1].id, "_layer_path":_relative_path, "_layer_url":_absolute_url, "_center_lat":_center._center_lat, "_center_long":_center._center_long, "_center_zoom":_center._center_zoom};
                                                                                                                       
                                                                                                                        _just_get = []
                                                                                                                        _just_get.push(_layer); 
                                                                                                                        _flat = _just_get.concat(_flat);

                                                                                                                    
                                                                                                                      // do not show just get or partial results, it will freeze browser not responsive.  
                                                                                                                      //  show_current(_flat, 'input_current')
                                                                                                                      // rendering_json_to_html(_just_get)
                                                                                                                      console.log( 'all layers ---> flat '   ,  _flat.length, _layer._layer_path)
                                                                                                                      progressing_info(_flat.length, _layer._layer_path);
                                                                                              
                                                                                              } else {

                                                                                                   // subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it, do nothing. do not count, do not add to final flat array 

                                        

                                                                                              }




                                                                                        }//if 
                                                                                        

                                                                              
                                                                              }// for


                                                                        
                                                                              
                                                                        
                                                                        } // layers
                                                                        
                                                                        
                                                                        
                                                                    
                                                              
                                                                        // all tables ---> flat 
                                                                        if (current.hasOwnProperty('tables') && (current.tables !== null ) && (current.tables !== '' )){

                                                                          var current_tables = current.tables;
                                                                        
                                                                           _just_get = []

                                                                          for (var k1 = 0; k1 < current_tables.length; k1++) {
                                                                              
                                                                              // For tables:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                                                                              
                                                                              
                                                                            // console.log('current_tables::::: ',current_tables)
                                                                              
                                                                              if ((current_tables[k1].hasOwnProperty('name')) && (current_tables[k1].hasOwnProperty('id')) ){
                                                                                  
                                                                                  /*
                                                                                  * 
                                                                                              "layers": [

                                                                                                        ],
                                                                          
                                                                                              "tables": [
                                                                                                {
                                                                                                  "id": 0,
                                                                                                  "name": "SB272_Enterprise_System_Report",
                                                                                                  "parentLayerId": -1,
                                                                                                  "defaultVisibility": true,
                                                                                                  "subLayerIds": null,
                                                                                                  "minScale": 0,
                                                                                                  "maxScale": 0
                                                                                                }
                                                        ]
                                                                                  */
                                                                                  
                                                                                  
                                                                                // tables, subLayerIds == null, means this is solid table, can display
                                                                                // if subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it. 
                                                                                if (current_tables[k1].subLayerIds == null){ 
                                                                                  
                                                                                  
                                                                                           // solid layer,  need to count, add to final flat array 
                                                                                          
                                                                                  
                                                                                  
                                                                                                          var _absolute_url = _url;  //  _url(service type) is  xxx/mapserver
                                                                                                            
                                                                                                            // _url(home, folder type) is xxx/rest/service or any folder
                                                                                                            if(current.hasOwnProperty('absolute_path')){
                                                                                                                _absolute_url = current.absolute_path;
                                                                                                            }
                                                                                                            
                                                                                                              
                                                                                                              
                                                                                                              var _relative_path = _url;
                                                                                                              if(current.hasOwnProperty('relative_path')){
                                                                                                                  _relative_path = current.relative_path;
                                                                                                              }
                                                                                                      
                                                                                                              

                                                                                                        // "type":"table"  identifier, default is "layer"
                                                                                                        var _layer = {"type":"table","name": current_tables[k1].name, "id": current_tables[k1].id, "_table_path":_relative_path, "_table_url":_absolute_url};
                                                                                                        
                                                                                                        _just_get = []
                                                                                                        _just_get.push(_layer); 
                                                                                                        _flat = _just_get.concat(_flat);

                                                                                                   
                                                                                                   
                                                                                                                    // do not show just get or partial results, it will freeze browser not responsive.  
                                                                                                                      //  show_current(_flat, 'input_current')
                                                                                                                      // rendering_json_to_html(_just_get)
                                                                                                                      console.log( 'all tables ---> flat  '   ,  _flat.length, _layer._table_path)
                                                                                                                      progressing_info(_flat.length, _layer._layer_path);
                                                                              
                                                                              
                                                                                    
                                                                                    
                                                                                  } else {

                                                                                    // subLayerIds have some value, means this layer is not solid, it only use as folder directory, should skip it, do nothing. do not count, do not add to final flat array 

                         

                                                                               }
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              }//if 
                                                                              
                                                                              
                                                                          }// for


                                                                        
                                                                        } // tables
                                                              
                                                              
                                                              
                                                              
                                                                        
                                                                        
                                                                        
                                                                        // all services ---> flat    ( possible stop kill streaming)
                                                                        if(current.hasOwnProperty('services')  && (current.services !== null ) && (current.services !== '' )){

                                                                          var current_services = current.services;
                                                                        
                                                                          for (var i1 = 0; i1 < current_services.length; i1++) {
                                                                              
                                                                              // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                                                                              
                                                                              
                                                                              /*
                                                                                                  "folders": [
                                                        
                                                                                                  ],
                                                                                                          
                                                                                                  "services": [
                                                                                                    {
                                                                                                      "name": "Portland/Aerial",
                                                                                                      "type": "ImageServer"
                                                                                                    },
                                                                                                    {
                                                                                                      "name": "Portland/CascadeLandsat",
                                                                                                      "type": "ImageServer"
                                                                                                    }
                                                                                                  ]
                                                                              
                                                                                  */
                                                                              
                                                                              
                                                                              //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                                                                              // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                                                                              // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                                                                              // Portland/Aerial (ImageServer)
                                                                                  
                                                                                  var _absolute_name = current_services[i1].name
                                                                                  var  _absolute_name_array = _absolute_name.split('/');
                                                                                  var  _relative_name = _absolute_name_array[_absolute_name_array.length-1]; // if have /, only need last part after last /
                                                                                  var _current_services_type = current_services[i1].type
                                                                              //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              var node_path = current.absolute_path + '/'+ _relative_name +  '/'+_current_services_type
                                                                              
                                                                              

                                                                              
                                                                              console.log('node_path service ----> ',node_path)



                                                                              progressing_info(_flat.length, _cross + ' ' + node_path);
                                                                            
                                                                              
                                                                              //var node =await ajax_getjson(node_path);
                                                                              var node =await arcgis_ajax_cross_origin(node_path, _cross);  // cross origin method 
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              if (node !== null) {
                                                                                        
                                                                                            node.absolute_path = node_path;
                                                                                            
                                                                                            node.relative_path = current.relative_path+ '/'+_relative_name;
                                                                                          
                                                                                            stack.push(node);
                                                                              }//if







                                                                              
                                                                              // only run if  user clicked the stop button, killed streaming 
                                                                              if (stop_search_status){
                                                                                             console.log(' break for loop --> all services ---> flat ,, stack count ===> stop_search_status' , stack.count, stop_search_status)
                                                                                              break;
                                                                              } // if stop





                                                                              
                                                                          }//for
                                                                        
                                                                        } // service
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        // all folders ---> stack  ( possible stop kill streaming)
                                                                        if(current.hasOwnProperty('folders')&& (current.folders !== null ) && (current.folders !== '' )) {

                                                                              var current_folders = current.folders;
                                                                              for (var j2 = 0; j2 < current_folders.length; j2++) {
                                                                                  
                                                                                  
                                                                                  //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                                                                              // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                                                                              // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                                                                              // Portland/Aerial (ImageServer)
                                                                                  
                                                                                  var _absolute_name = current_folders[j2]
                                                                                  var  _absolute_name_array = _absolute_name.split('/');
                                                                                  var  _relative_name = _absolute_name_array[_absolute_name_array.length-1]; // if have /, only need last part after last /
                                                                              
                                                                              //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                                                                              
                                                                                  
                                                                                  
                                                                                  

                                                                                
                                                                                  var node_path = current.absolute_path + '/'+ _relative_name; 
                                                                                  
                                                                                  
                                                                                  console.log('node path folder +++++++>>> ',node_path)
                                                                                  


                                                                                  progressing_info(_flat.length, _cross + ' ' + node_path);
                                                                                  

                                                                                  
                                                                                  var node =await arcgis_ajax_cross_origin(node_path, _cross);  // cross origin method 


                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                      if (node !== null) {
                                                                                                            
                                                                                                              node.absolute_path = node_path;
                                                                                                                                                                                                                       
                                                                                                              node.relative_path = current.relative_path+ '/'+_relative_name;
                                                                                                            
                                                                                                              stack.push(node);
                                                                                      }// if






                                                                                      // only run if  user clicked the stop button, killed streaming 
                                                                                      if (stop_search_status){
                                                                                        console.log(' break for loop --> all folders ---> stack ,, stack count ===> stop_search_status' , stack.count, stop_search_status)
                                                                                        break;
                                                                                      } // if stop





                                                                                }// for
                                                                                
                                                                        } // folders    
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                      
                                                                        //( possible stop kill streaming)  for outer while loop
                                                                        if (stop_search_status){
                                                                          console.log(' break outer while loop -->  stack count ===> stop_search_status' , stack.count, stop_search_status)
                                                                          break;
                                                                        } // if stop 
                                                                        
                                                                  }// while
                                                              
                                                          
                                                        
                                                        console.log(' return final result , _flat' , _flat)
                                                        return _flat;





                                   } else if (root.name){


                                              render_single_imageserver(root, _url)
                                              return false;


                                  } else {


                                                          /*
                                                                        bad root:
                                                                        {
                                                                              absolute_path: "http://www.dot.state.ak.us/ArcGIS/rest/services"
                                                                                                              errorFrom: "ajax_jsonp_json_proxy_proxy3"
                                                                                                              id: 0
                                                                                                              readyState: 4
                                                                                                              relative_path: "/"
                                                                                                              responseJSON: undefined
                                                                                                              status: 502
                                                                                                              statusText: "Bad Gateway"
                                                                                                              
                                                                        }
                                                                        
                                                            */


                                                              var _error_root = 'Bad request or Blocked by Admin';

                                                              progressing_info(_error_root, JSON.stringify(root));

                                       
                                        return false;
                                   }      
                                      
                                      

                                  
                              }
                              
                              
                              
                              function progressing_info(_signal, _info){


                                      if (! pause_search_status){
                                                        
                                                          $('#message_div').text(' ( '+ _signal + ' ) ' + _info ); 
                                                          
                                                        
                                      } else {}


                              }
                              
  


                     //**************  end  *********** recursive streaming ****************************
                      


  


/**/





               
  
                  //   *******  search event related   *******   


                                // simple for loop ( no lunr.js)
                                function search_layer_now() {

                                          


                                    

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
                                                      var _test_string
                                                      var _valid

                                                      if (input_current.length > 0) {

                                                        for (var i = 0; i < input_current.length; ++i) {



                                                               _test_string = input_current[i].name;

                                                             _test_string = _test_string.toLowerCase();




                                                                           _valid = true;

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
                                        
                                          clear_search_result()
                                          
                                      }

                                      // fix bug, must init tooltips(), every time get new search result
                                      // $('.tooltipped').tooltip();

                            }





                            function clear_search_result(){

                               $('#clear_search_result_button').hide();   

                                $('#filter_by').val('');
                              
                                _search_data_content='';
                                update_url_parameter('filter_by','');
      
                              
                                show_current(input_current, 'input_current')


                                                                                  
                            }



                                      
                              function init_scrollable(){

                                                                  
                                var back_to_top_button = $('#back_to_top_button');
                                                
                                $("#json-renderer").scroll(function() {

                                  //console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                                // console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )
                                

                                  if($("#json-renderer").scrollTop() > scroll_bottom_px ) {


                                        // console.log('--------------- close to bottom  --------------- ')
                                        // console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                                        //  console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )

                                        
                                        

                                          switch(need_render_all) {


                                            case '_filtered_results':

                                                    // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                                    // only reset scroll to top when re-render new data.   
                                                    // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                                      
                                                    rendering_json_to_html(_filtered_results)

                                                    // must highlight key words
                                                    highlight_keywords()

                                                    need_render_all = '';
                                                    break;


                                            case 'input_current':


                                                  // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                                  // only reset scroll to top when re-render new data.   
                                                  // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                                  rendering_json_to_html(input_current)


                                                  // must highlight key words
                                                  highlight_keywords()
                                                  
                                                  need_render_all = '';
                                                  break;



                                            default:
                                              // nothing to render



                                          } // switch case


                                            
                                            back_to_top_button.addClass('show');

                                  } else {

                                            back_to_top_button.removeClass('show');

                                  }







                              });    //  .scroll()



                              back_to_top_button.on('click', function(e) {
                                e.preventDefault();
                                $("#json-renderer").animate({scrollTop:0}, scroll_bottom_px);
                              });



                              }

                                    





                            function init_user_interface_event(){

                                        // click search
                                       // $('#start_search_button').on('click',search_layer_now) 


                                        // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                                        $('#filter_by').on('search', search_layer_now);
                                  
                                         $('#clear_search_result_button').hide();
                                         $('#clear_search_result_button').on('click',clear_search_result);

                                          // fire when user every stroke any key  
                                          $("#filter_by").on('keyup',search_layer_now);

                                          // only fire when text field loose focus,  not fire when stroke any key  
                                          // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                          // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                          // $("#filter_by").change(search_layer_now);

                           
                            /**/
       
              
/**/


                            

              }



                  //   *******   end  ******   search event related   *******      






/**/



  

               // - -  -  -  streaming   - -  -  -  
                

                             function init_streaming_event_handler() {

                                  remove_loading_img_spinner('ajax_getJson_processing');

                                  $("#pause_streaming_button").hide(); 
                                  $("#resume_streaming_button").hide(); 
                                  $("#stop_streaming_button").hide(); 
                                  

                                  $('#pause_streaming_button').on('click',pause_streaming);
                                  $('#resume_streaming_button').on('click',resume_streaming);
                                  $('#stop_streaming_button').on('click',stop_streaming);
                                  
                             }


                              
                              // this function only run 1 time
                              async function start_streaming(){
                                  
                                    stop_search_status = false;
                                    pause_search_status = false;
                                    input_current = []; 

                                    $("#pause_streaming_button").show(); 
                                    $("#resume_streaming_button").hide(); 
                                    $("#stop_streaming_button").show(); 

                                    show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_string)

                                    /**/
                                    // token
                                    /**/
                                          param_arcgis_online_token = $('#arcgis_online_token').val()
                                          if (param_arcgis_online_token){
                                                    arcgis_online_token = param_arcgis_online_token
                                          } else {
                                                    arcgis_online_token = ''
                                          }
                                          update_url_parameter('arcgis_online_token', arcgis_online_token)

                                          

                                          // set online or portal radio
                                          if (___url_string.includes('.arcgis.com')){

                                                    // arcgis online
                                                    $("input[name=online_or_portal_radio][value=arcgis_online]").prop('checked', true);
                                                    generateTokenUrl = arggis_online_genToken_url
                                                    $("#genToken_url").val(generateTokenUrl);

                                          } else {

                                                    // arcgis enterprise portal
                                                        $("input[name=online_or_portal_radio][value=arcgis_enterprise_portal]").prop('checked', true);

                                                        // sample:  https://gisnexus.palmspringsca.gov/portal/sharing/rest/generateToken
                                                        //Get The Current Domain Name  https://stackoverflow.com/questions/11401897/get-the-current-domain-name-with-javascript-not-the-path-etc
                                                        // get domain from URL
                                                        console.log(' gen token from enterprise portal:',  ___url_string)
                                                        portal_domain = (new URL(___url_string));
                                                        portal_domain = portal_domain.hostname;
                                                        generateTokenUrl = 'https://' + portal_domain + arggis_enterprise_portal_genToken_url // https:// +  domain + /portal/sharing/rest/generateToken
                                                        console.log(' gen token url from enterprise portal:' , generateTokenUrl, portal_domain)
                                                        $("#genToken_url").val(generateTokenUrl);
                                                      
                                          }



                                          // token referer
                                          if (window.location.hostname.includes('localhost')){
                                            token_referer = local_token_referer
                                          } else {
                                            token_referer = production_token_referer
                                          }

                                    /**/
                                    // . . end .  .  . token
                                    /**/

                                  
                                   console.log( 'nested to flat url  +++ ', ___url_string)
                                   input_current =await nested_to_flat(___url_string);
                                        
                                        
                                   if (input_current) {    
                                        
                                          //  ----- sort input_current = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------
                                              // function compareStrings() is at arcgis_common.js
                                              // sort by property 'name'. If property is others, then do not sort, comment out this section. 
                                        
                                                  input_current.sort(function(a, b) {
                                                          return compareStrings(a.name, b.name);
                                                        });
                                        
                                            //  ----- end ------ sort input_current = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------
                                        
                                            __total_item_count = input_current.length;
                                    
                                              console.log(' ******* input_current ************** ', input_current)
                                    
                                            // in case of user clicked pause, when streaming ended, update the final result  
                                            show_current(input_current, 'input_current')
                                            filter_result_by_filter_by()
                                   } // if - input current is array []
                                   
                                   remove_loading_img_spinner('ajax_getJson_processing');
                                   $("#pause_streaming_button").hide(); 
                                   $("#resume_streaming_button").hide(); 
                                   $("#stop_streaming_button").hide();
                              }
                              
                              
                              
                              
                              
                              function stop_streaming(){
                                      stop_search_status = true
                                      console.log('  stop button clicked ===> ' )
                                      // we do not need to stop javascript or stop browser, we only need to stop/abort the for loop which keep send ajax request.
                                      //works the same as browser 'x' button
                                      //window.stop();
                                      remove_loading_img_spinner('ajax_getJson_processing');

                                        $("#pause_streaming_button").hide(); 
                                        $("#resume_streaming_button").hide(); 
                                        $("#stop_streaming_button").hide(); 
                              }
                              
                              
                              
                              
                              
                              function resume_streaming(){
                                  pause_search_status = false;
                                  show_loading_img_spinner('control_panel', 'ajax_getJson_processing', ___url_string)
                                  $("#pause_streaming_button").show(); 
                                  $("#resume_streaming_button").hide(); 
                              }
                              
                              
                              
                              
                              function pause_streaming(){
                                  pause_search_status = true;
                                  remove_loading_img_spinner('ajax_getJson_processing'); 
                                  $("#pause_streaming_button").hide(); 
                                  $("#resume_streaming_button").show();
                              }
                              
                
                


                              
                              function show_current(_current_showing, _render_all_signal) {
                                // only show short list = 100, if more than limit, also mark  'need_render_all'  
           
                                           
                                                                                                                               
                                             current_filter_result_count = _current_showing.length
                                           
                                             //$('#counter_label').html( '<span class="orange-text">&nbsp;' + current_filter_result_count + "</span>" + ' / ' + '<span class="green-text">' + __total_item_count + "&nbsp;</span>");  
                                             display_count_info('', current_filter_result_count, __total_item_count, 'counter_label')


                                                    //$('#message_div').html('<a target="_blank" id="_orgnization_link">' + _organization + '  |  v' + currentVersion + '  |  ' + ___hostname   +  '</a> ' );
                                                    var _html_org = '     <h1 style="display:inline;"  ><b>  <a target="_blank" id="_orgnization_link">' + _organization + '</a></b></h1>'
                                                    _html_org    += '<h3 style="display:inline;"                   ><sup>     &nbsp;Arcgis Enterprise v<big>' + currentVersion + '</big></sup></h3>'
                                                    _html_org    += '<br> <h3 style="display:inline;"  ><sup><a target="_blank" id="_orgnization_link2">&nbsp;' + ___url_string + '</a></sup></h3>'
                                                    
                                                    $('#message_div').html( _html_org);
                                                    
                                                    // only for searchLayer,   href do not use ___hostname, should use true url
                                                    $('#_orgnization_link').attr("href",  ___url_string);
                                                    $('#_orgnization_link2').attr("href",  ___url_string);


                                                    /*
                                                      // ****  add tool tip to message orgnization   ****  
                                                      $('#_orgnization_link').attr("class", 'hoverable tooltipped');
                                                      $('#_orgnization_link').attr("data-position", 'bottom');
                                                      $('#_orgnization_link').attr("data-tooltip", 'https://'+ ___hostname);
                                                      // fix bug, must init tooltips(), every time get new search result
                                                      $('.tooltipped').tooltip();
                                                      // ****  add tool tip to message orgnization   ****  
                                                   */


                                           
                                             rendering_json_to_html(_current_showing.slice(0,short_list_count))
           
                                             highlight_keywords()
                                                               
           
                                             // reset scroll position to 0, means top 
                                             $("#json-renderer").scrollTop(0);
           
                                             
                                             if (current_filter_result_count > short_list_count){
           
                                                       need_render_all = _render_all_signal
           
                                             } else {
           
                                                       need_render_all = ''
                                             }
           
           
           
           
           
           
                             }
           
  
              //      - -  -  -   end    - -  -  -  streaming   - -  -  -  
  
  
  
  
  








 
 
 
 
 
  
  // document ready short hand
  
  
  (async function($){
  
             
             init_global_var();

             init_naming_panel()
             init_user_interface_event();
             init_scrollable()
             init_streaming_event_handler();
     
            /**/
            // ------- let's go to your REST api  -------
            /**/
                      init_start_root_input()
            /**/
            // --- end --- let's go to your REST api -------
            /**/
              
            // first time run 
            if (___url_string){     
                                  show_search_bar()
                                  start_streaming()
            }

            // can't be here, must await until streaming completed
            // filter_result_by_filter_by()

})(jQuery);
