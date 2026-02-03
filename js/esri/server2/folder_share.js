


/*   
         folder_share.js will be used by both 
                                                server/folder.html and 
                                                server2/folder.hmtl

         folder_helper.js  have the difference 

*/








                                // for 2 panel, 
                                async function render_feature_layer(_featurelayer_id){


                                   

                                    icon_flatjson = [];

                                    console.log('render feature layer by tree parent id : ', _featurelayer_id )
                                    console.log('render feature layer by tree node[id] : ', folder_structure_flatjson[_featurelayer_id])



                               // frome array[folder_structure_flatjson],  get item,  item.id = _featurelayer_id
                                                
                               var layer_item = folder_structure_flatjson.find(element => element.id == _featurelayer_id);

                                  console.log(' click layer , layer item ->', _featurelayer_id , layer_item)


                                  var _layer_absolute_path_url = layer_item.absolute_path
                                  var _map_server_url_ = layer_item.absolute_path_parent_service
                                  var _layer_id_ = layer_item.layer_id
                                  var _layer_name_ = layer_item.text
                                  var _type_ = layer_item.type
                                  var _node_path_ = layer_item.node_path
                                  console.log('create tree icon flatjson:    _layer_absolute_path_url', _layer_absolute_path_url)
                                  console.log('create tree icon flatjson:    _map_server_url_', _map_server_url_)
                                  console.log('create tree icon flatjson:    _layer_id_', _layer_id_)
                                  console.log('create tree icon flatjson:    _layer_name_', _layer_name_)
                                  console.log('create tree icon flatjson:    _type_', _type_)
                                  console.log('create tree icon flatjson:    _node_path_', _node_path_)
                                  var tree_icon_flatjson = feature_layer_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


                                    jstree_icon(tree_icon_flatjson, _layer_absolute_path_url,  _layer_name_)



                                              // .......... feature layer  more info   ..........
                                              /**/ 

                                                // for 2 panel, map server did not exist yet, need to ajax, 3 panel don't need this, since it already get it.
                                                    raw_mapserver = await arcgis_ajax_cross_origin(_map_server_url_, _cross);  // cross origin method 
                                                    console.log( ' get map server thumbnail and info - mapserver root response  ', raw_mapserver)
                                               

                                                // for 2 panel only, every time, render feature layer, need to render parent mapserver 
                                                var  _url_mapserver_legend = _map_server_url_ + '/legend'
                                                mapserver_legend  = await arcgis_ajax_cross_origin(_url_mapserver_legend, _cross);  // cross origin method 
                                                console.log( ' ** mapserver ** legend **  ', mapserver_legend )
                                                // show layer legend
                                                show_legend(_layer_id_, mapserver_legend)



                                                await get_layer_fields(_layer_absolute_path_url)


                                                 // for 2 panel, load server info on icon panel
                                                 get_mapserver_info_html(_map_server_url_)
                                                 

                                                




                                              /**/ 
                                              // .......... end   .......... feature layer  more info   ..........   
  
  


                                }





                                    // for 2 panel,  [right panel]  ----- layer  ------ 
                                    var _html_for_message_icon = ''
                                    var _html_for_more_info_icon  = ''
                                    function jstree_icon(_icons_flatjson,   _link_url, _link_display_text){
  
                                              _html_for_message_icon = ''
                                              _html_for_more_info_icon  = ''
  
                                               // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                              _html_for_message_icon     = '<a target="_blank" id="_layer_link" href="'+ _link_url + '?f=html" style="font-size:x-large; font-weight: bolder;">'  
                                              _html_for_message_icon    +=   _link_display_text
                                              _html_for_message_icon    += '</a>'

                                              _html_for_message_icon    += '<br>'
                                              _html_for_message_icon    += '<a target="_blank" id="_layer_link2" href="'+ _link_url + '?f=html" style="font-size:xx-small; font-weight: lighter;">' 
                                              _html_for_message_icon    +=   _link_url 
                                              _html_for_message_icon    += '</a>'
  
                                              $('#message_icon').html(_html_for_message_icon);
                                              
  
                                   
                                      
                                              console.log("  >>> jstree-icon flat json : ", _icons_flatjson)

                                              
                                              $("#filter-icon-div").show();
  
                                              $('#jstree_icon')
                                                                  // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                                                                  //.on('changed.jstree', function (event, data) {
                                                                  //https://api.jquery.com/on/
                                                                  .on('changed.jstree',  create_click_link)  
                                                                  //.on('select_node.jstree', function (event, data) {
                                                                    
                                                                  /**/
                                                                  // create the instance $('#xxxx_div').jstree({ })
                                                                  .jstree({ 



                                                                    /**/
                                                                    // - - - filter layer list  - - - 
                                                                    /**/

                                                                            // doc https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches_children
                                                                            'search': {
                                                                                // sample https://codepen.io/JGSpark/pen/VNeRLN
                                                                                'fuzzy': false, // default is false,
                                                                                'case_sensitive': false, // default,
                                                                                // Indicates if the tree should be filtered (by default) to show only matching nodes
                                                                                'show_only_matches' : true, //false, 
                                                                                //Indicates if the children of matched element are shown (when show_only_matches is true)
                                                                                'show_only_matches_children': true, //false,
                                                                                //Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. 
                                                                                'close_opened_onclear': false,   // Default is true,
                                                                                // Indicates if only leaf nodes should be included in search results
                                                                                'search_leaves_only' : false, // default,
                                                                            },
                                                                            "plugins" : [ "search" ], // not use "wholerow", it will make line icon disappear 
                                                                    
                                                                    /**/
                                                                    // ... end ...  - - - filter layer list  - - -
                                                                    /**/


                                                                      'core' : {
                                                                                 'themes': {
                                                                                              'name': 'proton',
                                                                                              'responsive': true
                                                                                          },
                                                                                 'data' : _icons_flatjson
                                                                              } 
                                                                  })
  
  
  
                                                
  
  
  
                                              
  
                                      }//function
  
  

                                    // for 2 panel,
                                    async function render_image_layer(_featurelayer_id){

                                        icon_flatjson = [];
    
    
                                        // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                    
                                        var layer_item = folder_structure_flatjson.find(element => element.id == _featurelayer_id);
    
                                        console.log(' click layer , layer item ->', _featurelayer_id , layer_item)



                                        var _layer_absolute_path_url = layer_item.absolute_path
                                        var _map_server_url_ = layer_item.absolute_path_parent_service
                                        var _layer_id_ = layer_item.layer_id
                                        var _layer_name_ = layer_item.text
                                        var _type_ = layer_item.type
                                        var _node_path_ = layer_item.node_path
                                        console.log('create tree icon flatjson:    _layer_absolute_path_url', _layer_absolute_path_url)
                                        console.log('create tree icon flatjson:    _map_server_url_', _map_server_url_)
                                        console.log('create tree icon flatjson:    _layer_id_', _layer_id_)
                                        console.log('create tree icon flatjson:    _layer_name_', _layer_name_)
                                        console.log('create tree icon flatjson:    _type_', _type_)
                                        console.log('create tree icon flatjson:    _node_path_', _node_path_)

                                        icon_flatjson = create_ImageServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
    
                                        jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)



                                         // .......... image layer  more info   ..........
                                         /**/ 

                                                    // for 2 panel, map server did not exist yet, need to ajax, 3 panel don't need this, since it already get it.
                                                    raw_mapserver = await arcgis_ajax_cross_origin(_layer_absolute_path_url, _cross);  // cross origin method 
                                                    console.log( ' get map server thumbnail and info - mapserver root response  ', raw_mapserver)
                                                
                                                    // for 2 panel only, every time, render feature layer, need to render parent mapserver 
                                                    var  _url_mapserver_legend = _layer_absolute_path_url + '/legend'
                                                    mapserver_legend  = await arcgis_ajax_cross_origin(_url_mapserver_legend, _cross);  // cross origin method 
                                                    console.log( ' ** mapserver ** legend **  ', mapserver_legend )
                                                    
                                                    
                                                    // image single layer id is always 0,  show layer legend
                                                    show_legend(0, mapserver_legend)



                                                    await get_layer_fields(_layer_absolute_path_url)


                                                    // for 2 panel, load server info on icon panel
                                                    get_mapserver_info_html(_map_server_url_)
                                         

                                                


                                            /**/ 
                                            // .......... end   .......... image layer  more info   ..........   
  


                                    }



                                  
                                async function render_raster_layer(_featurelayer_id) {


                                    icon_flatjson = [];


                                    // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                
                                    var layer_item = folder_structure_flatjson.find(element => element.id == _featurelayer_id);

                                    console.log(' click layer , layer item ->', _featurelayer_id , layer_item)


                                    var _layer_absolute_path_url = layer_item.absolute_path
                                    var _map_server_url_ = layer_item.absolute_path_parent_service
                                    var _layer_id_ = layer_item.layer_id
                                    var _layer_name_ = layer_item.text
                                    var _type_ = layer_item.type
                                    var _node_path_ = layer_item.node_path
                                    console.log('create tree icon flatjson:    _layer_absolute_path_url', _layer_absolute_path_url)
                                    console.log('create tree icon flatjson:    _map_server_url_', _map_server_url_)
                                    console.log('create tree icon flatjson:    _layer_id_', _layer_id_)
                                    console.log('create tree icon flatjson:    _layer_name_', _layer_name_)
                                    console.log('create tree icon flatjson:    _type_', _type_)
                                    console.log('create tree icon flatjson:    _node_path_', _node_path_)


                                    icon_flatjson = create_rasterFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

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
                                   if (layer_item.type == "Raster Catalog Layer") {
                                      // treat as feature layer
                                      icon_flatjson = feature_layer_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
                                    } // Raster Catalog Layer

                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)



                                     // .......... raster layer  more info   ..........
                                     /**/ 

                                                // for 2 panel, map server did not exist yet, need to ajax, 3 panel don't need this, since it already get it.
                                                raw_mapserver = await arcgis_ajax_cross_origin(_map_server_url_, _cross);  // cross origin method 
                                                console.log( ' get map server thumbnail and info - mapserver root response  ', raw_mapserver)
                                           

                                            // for 2 panel only, every time, render feature layer, need to render parent mapserver 
                                            var  _url_mapserver_legend = _map_server_url_ + '/legend'
                                            mapserver_legend  = await arcgis_ajax_cross_origin(_url_mapserver_legend, _cross);  // cross origin method 
                                            console.log( ' ** mapserver ** legend **  ', mapserver_legend )
                                            // show layer legend
                                            show_legend(_layer_id_, mapserver_legend)



                                            await get_layer_fields(_layer_absolute_path_url)


                                            // for 2 panel, load server info on icon panel
                                            get_mapserver_info_html(_map_server_url_)
                                         
                                            


                                            




                                          /**/ 
                                          // .......... end   .......... raster layer  more info   ..........


                                }




                                function render_geocode_layer(_featurelayer_id){

                                    icon_flatjson = [];


                                    // frome array[folder_structure_flatjson],  get item,  item.id = _featurelayer_id
                                                
                                    var layer_item = folder_structure_flatjson.find(element => element.id == _featurelayer_id);

                                    console.log(' click layer , layer item ->', _featurelayer_id , layer_item)


                                        var _layer_absolute_path_url = layer_item.absolute_path
                                        var _map_server_url_ = layer_item.absolute_path_parent_service
                                        var _layer_id_ = layer_item.id
                                        var _layer_name_ = layer_item.text
                                        var _type_ = layer_item.type
                                        var _node_path_ = layer_item.node_path
                                        console.log('create tree icon flatjson:    _layer_absolute_path_url', _layer_absolute_path_url)
                                        console.log('create tree icon flatjson:    _map_server_url_', _map_server_url_)
                                        console.log('create tree icon flatjson:    _layer_id_', _layer_id_)
                                        console.log('create tree icon flatjson:    _layer_name_', _layer_name_)
                                        console.log('create tree icon flatjson:    _type_', _type_)
                                        console.log('create tree icon flatjson:    _node_path_', _node_path_)

                                        icon_flatjson = create_GeocodeServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
    
                                        jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)



                                         // for 2 panel, load server info on icon panel
                                         get_mapserver_info_html(_map_server_url_)
                                         



                                }







                                function render_network_analysis_layer(_NAlayer_id){

                                    icon_flatjson = [];

                                    // frome array[NAserver_flatjson],  get item,  item.id = _NAlayer_id
                                                
                                    var layer_item = folder_structure_flatjson.find(element => element.id == _NAlayer_id);

                                    console.log(' click layer , layer item ->', _NAlayer_id , layer_item)


                                        var _layer_absolute_path_url = layer_item.absolute_path
                                        var _NA_server_url_ = layer_item.server_path
                                        var _layer_id_ = layer_item.id
                                        var _layer_name_ = layer_item.name
                                        var _type_ = layer_item.type
                                        var _node_path_ = layer_item.node_path
                                        console.log('create tree icon flatjson:    _layer_absolute_path_url', _layer_absolute_path_url)
                                        console.log('create tree icon flatjson:    _NA_server_url_', _NA_server_url_)
                                        console.log('create tree icon flatjson:    _layer_id_', _layer_id_)
                                        console.log('create tree icon flatjson:    _layer_name_', _layer_name_)
                                        console.log('create tree icon flatjson:    _type_', _type_)
                                        console.log('create tree icon flatjson:    _node_path_', _node_path_)

                                        icon_flatjson = create_NAServerFlatjson(_NA_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
    
                                        jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)

                                }





   





                // for 2 panel only, this original is 2nd level [middle panel]  ----- service ------, but in 2 panel system, it is not use so much, just carry some info 
                        function jstree_mapserver(mapserver_url, mapserver_url_display_text){


                         
                            _this_mapserver_url_without_layerID = mapserver_url

                            // top, name, link
                            var _html_for_message_icon  = ''
                            // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                            _html_for_message_icon     = '<a target="_blank" id="_mapserver_link" href="'+  mapserver_url + '?f=html" style="font-size:x-large; font-weight: bolder;">'  
                            _html_for_message_icon    +=   mapserver_url_display_text 
                            _html_for_message_icon    += '</a>'

                            _html_for_message_icon    += '<br>'

                            _html_for_message_icon    += '<a target="_blank" id="_mapserver_link2" href="'+  mapserver_url + '?f=html" style="font-size:xx-small; font-weight: lighter;">' 
                            _html_for_message_icon    +=    mapserver_url 
                            _html_for_message_icon    += '</a>'
                            
                            
                            $('#message_icon').html( _html_for_message_icon);

                            // for 2 panel, load server info on icon panel
                            get_mapserver_info_html(mapserver_url)
                           
                            
                        }
                      



                         


                        // for both 2,3 panel, only field editor need hide show, other tags just set html as empty, don't need hide show
                        function show_icon_tag(){



                            $("#field_fieldset").show();
                            $("#subtype_fieldset").show();
                            $("#domain_fieldset").show();
                            $("#jsoneditor_field").show();
                            $("#jsoneditor_subtype").show();
                            $("#jsoneditor_domain").show();
                            

                            
                            $("#layer-more-info").show();
                            $("#json-layer").show();
                        }



                         // for 2 panel only, hide, empty both mapserver, feature layer, table related all tag
                         function empty_icon_panel_all_tag(){

                            // for 2 panel only, this combine original 3 panel serivce(middle) and icon(right) panel tag together
                            $("#message_icon").html('');

                            $("#filter-icon-div").hide();
                            $('#jstree_icon').jstree('destroy');
                            $("#jstree_icon").html('');

                            
                            $("#inside_folder_item_list").html('');
                            $("#view_mapserver_on").html('');
                            $("#icon_list").html('');
                            
                            $("#layer_legend").html('');
                            $("#message_more_info_icon").html('');
                            

                            $("#thumbnail_for_mapserver").html('');
                            $("#message_more_info_mapserver").html('');
                            $("#coord-sys-mapserver").html('');
                            $("#json-mapserver").hide();

                            // hide, need to show later
                            $("#field_fieldset").hide();
                            $("#subtype_fieldset").hide();
                            $("#domain_fieldset").hide();
                            $("#jsoneditor_field").hide();
                            $("#jsoneditor_subtype").hide();
                            $("#jsoneditor_domain").hide();

                              $("#layer-more-info").html('');
                              $("#json-layer").hide();

                        }












                        


    /**/
    // ------- let's go to your REST api  -------
    /**/


                 function reset_everything(){

                    empty_icon_panel_all_tag()
    
                     // clear left side root tree 
                     $('#jstree_root_folder').jstree('destroy');
                     $("#jstree_root_folder").html('');
                    
                    $("#message_root_folder").html('');
    
                }
    
    



                function letsgo_handler(){

                        ___url_string = $("#current_rest_api_endpoint").val().trim();

                        reset_everything()

                        update_url_parameter('org', ___url_string)
                        update_url_parameter('url', ___url_string)
                        _organization = ___url_string
                        document.getElementById("title").innerHTML = _organization;                        

                        if (___url_string){
                                    ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                                    ___hostname   = ___url.hostname; //    sampleserver3.arcgisonline.com

                                    scan_folder_structure()
                        }

                }

    
                function init_top_bar(){
    
    
                    reset_everything()
    
                    $("#current_rest_api_endpoint").val(___url_string)
    
                    $('#current_rest_api_endpoint').on('search', letsgo_handler);
                    $( "#letsgo").click(letsgo_handler);

                    // token
                    $( "#generate_token").click(generate_token_handler);
                    $( "#clear_token").click(clear_token_handler);
    
                }



                // token
                async function generate_token_handler(){


                    // Generate Token param : https://developers.arcgis.com/rest/services-reference/enterprise/generate-token.htm
                    var token_data_param = {}

                    /* working sample
                    token_data_param.username = 'your-portal-online-account-name'
                    token_data_param.password = 'Your-pass-word'
                    token_data_param.client = ''
                    token_data_param.ip = ''
                    // 'referer' must be specified."]
                    token_data_param.referer = 'https://gisnexus.palmspringsca.gov/server/admin'
                    token_data_param.expiration = 1440
                    token_data_param.f = 'pjson'
                    */
                    token_data_param.username = $("#login_name").val() //'your-portal-online-account-name'
                    token_data_param.password = $("#login_password").val() //'Your-pass-word'
                    token_data_param.client = ''
                    token_data_param.ip = ''
                    // 'referer' must be specified."]
                    token_data_param.referer = token_referer  //'http://localhost:10/json2tree'  'https://transparentgov.net/'  'https://gisnexus.palmspringsca.gov/server/admin'
                    
                    token_data_param.expiration = parseInt($("#expire_in_days").val()) * 1440
                    token_data_param.f = 'pjson'

                    var token_response

                    try{
                        var token_response_raw = await $.ajax({
                                    type: "POST",
                                    url: generateTokenUrl,
                                    data: token_data_param,
                                    success: function (data) {

                                        console.log(data);
                                        return data;
                                    },
                                    //dataType: dataType
                                });
                    } catch(error){
                        console.log('ajax token failed : ', error)
                        alert(error)
                    }// try - catch

                    console.log('token response raw : ', token_response_raw)
                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                    if (typeof token_response_raw === 'object') {
                        // is object
                        token_response = token_response_raw
                    } else {
                        // is string
                        token_response = JSON.parse(token_response_raw)
                    }
                    console.log('token response object : ', token_response)


                    if (token_response.token){
                        arcgis_online_token = token_response.token
                        $("#arcgis_online_token").val(arcgis_online_token)
                        // refresh with new token
                        letsgo_handler()
                    } 
                    if (token_response.error){
                        var error_message = token_response.error.details[0] + ' : ' + token_response.error.message
                        // do not do this, token should be always empty if no token used.
                        //$("#arcgis_online_token").val(error_message)
                        // instead use alert
                        alert(error_message)


                    }
                   



                }

                function clear_token_handler(){
                    arcgis_online_token = ''
                    $("#arcgis_online_token").val(arcgis_online_token)
                    update_url_parameter('arcgis_online_token', arcgis_online_token)
                }
    
    
    
    /**/
    // --- end --- let's go to your REST api -------
    /**/
