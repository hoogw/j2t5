


/*   
         folder_share.js will be used by both 
                                                server/folder.html and 
                                                server2/folder.hmtl

         folder_helper.js  have the difference 

*/








                                
                                function render_feature_layer(_featurelayer_id){


                                   

                                    icon_flatjson = [];

                                    console.log('render feature layer by tree parent id : ', _featurelayer_id )
                                    console.log('render feature layer by tree node[id] : ', mapserver_flatjson[_featurelayer_id])


                               // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                
                               var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                  console.log(' click layer , layer item ->', _featurelayer_id , layer_item)


                                  var _layer_absolute_path_url = layer_item.absolute_path
                                  var _map_server_url_ = layer_item.server_path
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
                                  var tree_icon_flatjson = feature_layer_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


                                    jstree_icon(tree_icon_flatjson, _layer_absolute_path_url,  _layer_name_)


                                    get_layer_fields(_layer_absolute_path_url)
                                    

                                }





                                    // 3rd level [right panel]  ----- layer  ------ 
                                    var _html_for_message_icon = ''
                                    var _html_for_more_info_icon  = ''
                                    function jstree_icon(_icons_flatjson,   _link_url, _link_display_text){

                                          empty_icon_panel_only_tag()
  
                                              _html_for_message_icon = ''
                                              _html_for_more_info_icon  = ''
  
                                               // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                              _html_for_message_icon = '     <h3 style="display:inline;"  ><b>  <a target="_blank" id="_layer_link" href="'+ _link_url + '?f=html'  +'">'  
                                              //_html_for_message_icon    += "<span class='" + open_new_tab_icon +"' aria-hidden='true'></span>&nbsp;"  
                                              _html_for_message_icon    += _link_display_text + '</a></b></h3>'
                                              _html_for_message_icon    += '<br> <h6 style="display:inline;"  ><sup><a target="_blank" id="_layer_link2" href="'+ _link_url + '?f=html">' + _link_url + '</a></sup></h6>'
  
                                              $('#message_icon').html(_html_for_message_icon);
                                              
  
                                   
                                      
                                              console.log("  >>> jstree-icon flat json : ", _icons_flatjson)
  
                                              $("#filter-icon-div").show()
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
  
  


                                    function render_image_layer(_featurelayer_id){

                                        icon_flatjson = [];
    
                                        // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                    
                                        var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);
    
                                        console.log(' click layer , layer item ->', _featurelayer_id , layer_item)



                                        var _layer_absolute_path_url = layer_item.absolute_path
                                        var _map_server_url_ = layer_item.server_path
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

                                        icon_flatjson = create_ImageServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
    
                                        jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)

                                        get_layer_fields(_layer_absolute_path_url)
                                    }



                                   
                                    
                                function render_raster_layer(_featurelayer_id) {


                                    icon_flatjson = [];

                                    // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                
                                    var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                    console.log(' click layer , layer item ->', _featurelayer_id , layer_item)


                                    var _layer_absolute_path_url = layer_item.absolute_path
                                    var _map_server_url_ = layer_item.server_path
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

                                    get_layer_fields(_layer_absolute_path_url)

                                }




                                function render_geocode_layer(_featurelayer_id){

                                    icon_flatjson = [];

                                    // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                
                                    var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                    console.log(' click layer , layer item ->', _featurelayer_id , layer_item)


                                        var _layer_absolute_path_url = layer_item.absolute_path
                                        var _map_server_url_ = layer_item.server_path
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

                                }





                                function render_network_analysis_layer(_NAlayer_id){

                                    icon_flatjson = [];

                                    // frome array[NAserver_flatjson],  get item,  item.id = _NAlayer_id
                                                
                                    var layer_item = NAserver_flatjson.find(element => element.id == _NAlayer_id);

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




   





                // 2nd level [middle panel]  ----- service ------ 
                function jstree_mapserver(mapserver_alllayers_flatjson, mapserver_url, mapserver_url_display_text){


                    // this function will trigger if user click anything in middle panel
                    empty_icon_panel_only_tag()



                            // top, name, link
                            var _html_for_message_mapserver  = ''
                            // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                            _html_for_message_mapserver     = '<a target="_blank" id="_mapserver_link" href="'+  mapserver_url + '?f=html" style="font-size:large; font-weight: bolder;">'  
                            _html_for_message_mapserver    +=    mapserver_url_display_text 
                            _html_for_message_mapserver    += '</a>'

                            _html_for_message_mapserver    += '<br>'

                            _html_for_message_mapserver    += '<a target="_blank" id="_mapserver_link2" href="'+  mapserver_url + '?f=html" style="font-size:xx-small; font-weight: lighter;">' 
                            _html_for_message_mapserver    +=    mapserver_url 
                            _html_for_message_mapserver    +=  '</a>'

                            $('#message_mapserver').html( _html_for_message_mapserver);


                            get_mapserver_info_html(mapserver_url)
                            
                            
                            

                            _this_mapserver_url_without_layerID = mapserver_url
                            
                            console.log("  >>> jstree-mapserver json : ", mapserver_alllayers_flatjson)


                            $("#filter-server-div").show()
                            $('#jstree_mapserver')
                                                // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                                                //.on('select_node.jstree', function (e, data) {
                                                .on('changed.jstree', function (e, data) {

                                            


                                            
                                                    console.log('click select service-layer node event ', data)
                                                    var i, j, _selected_path = [], _selected_text = [], _selected_id = [], _selected_type = [];

                                                    for(i = 0, j = data.selected.length; i < j; i++) {
                                                        _selected_path.push(data.instance.get_node(data.selected[i]).original.absolute_path);
                                                        _selected_text.push(data.instance.get_node(data.selected[i]).text);
                                                        _selected_id.push(data.instance.get_node(data.selected[i]).id);
                                                        // must use .original.type, because re-structured json does not carry our customized field 'type'
                                                        _selected_type.push(data.instance.get_node(data.selected[i]).original.type);
                                                    }
                                                    
                                                    
                                                    // only get 1st selected node, so always use    _selected_xxxxx[0] 

                                                    //$('#event_result').html('Selected: ' + r.join(', '));
                                                    console.log('Selected id  -> ' + _selected_id[0])
                                                    console.log('Selected text ->' + _selected_text[0] )
                                                    console.log('Selected type ->' +  _selected_type[0])
                                                    console.log('Selected absolute_path -> ' + _selected_path[0])

                                                   

                                                
                                                    update_url_parameter('select_layer', _selected_id[0]);
                                                    update_url_parameter('select_layer_text', _selected_text[0]);


                                                    var _____type = _selected_type[0];
                                                    
                                                    //   "Raster Layer",   "Raster Catalog Layer" 
                                                    if (_____type.includes("Raster")) {

                                                        _____type = "Raster Layer";
                                                    }





                                                    //switch(_selected_type[0]) {     // this is true value
                                                    switch(_____type) {               // this is generalized value


                                                     //  - - - -  feature layer  type  - - - - 
                                                     /**/
                                                         // Do not confuse with 'FeatureServer'(no space between),  'Feauter Layer'(have space between)
                                                         case "Feature Layer": 
                                                         case "Annotation Layer":
                                                                             console.log('render MapServer(featureServer) -- feature layer --')
                                                                             show_icon_tag()
                                                                             // show icon , 
                                                                             render_feature_layer(_selected_id[0])
                                                                             // for 3 panel only, because already have map.server.full.json, do not need ajax again show layer legend,  
                                                                             show_legend(_selected_id[0], mapserver_legend)
                                                         break;


                                                         case "Table":
                                                             console.log('render MapServer(featureServer) -- table --')
                                                             show_icon_tag()

                                                             // show icon ,
                                                             render_table(_selected_id[0])
                                                        break;

                                                        case "Raster Layer": 
                                                                    console.log('render MapServer -- raster layer --')
                                                                    // show icon , with 
                                                                    render_raster_layer(_selected_id[0])
                                                                    // for 3 panel only, show layer legend,because already have map.server.full.json, do not need ajax again show layer legend,  
                                                                    show_legend(_selected_id[0], mapserver_legend)
                                                        break;


                                                   //   - - - -   end - - - -  feature layer  type  - - - - 

                                                          
                                                   
                                                          case "Group Layer":
                                                            // show list of child item, no jstree, only list item
                                                            render_group_layer(_selected_id[0])
                                                          break;

                                                        
                                                        
                                                    /**/
                                                    //  - - - -  map server type  - - - - 

                                                        
                                                        case "MapServer":
                                                        case "FeatureServer":
                                                                    render_viewMapServerOn_layer(_selected_path[0], _selected_text[0])
                                                                                
                                                        break;

                                                        
                                                        case "VectorTileServer": 
                                                                console.log('render vector tile server -- #layer# -- ')
                                                                // show icon , with 
                                                                render_vectortile_layer(_selected_id[0])
                                                        break;


                                                        case "ImageServer": 
                                                                            // show icon , with 
                                                                            render_image_layer(_selected_id[0])

                                                                            // show layer legend
                                                                            // single server only have 1 layer, _selected_id[0] is always -1 , 
                                                                            // however in legend layers, that single layer id is 0, 
                                                                            // can't use _selected_id[0] which is always -1
                                                                            // show_legend(_selected_id[0], mapserver_legend)

                                                                            // single layer id is always 0
                                                                            show_legend(0, mapserver_legend)

                                                        break;

                                                        case "GeocodeServer":
                                                                    console.log('render geocode server --  -- ')
                                                                    render_geocode_layer(_selected_id[0])
                                                        break;

                                                       


                                                        case "SceneServer": 
                                                                 console.log('render scene server -- #layer# --')
                                                                 // show icon , with 
                                                                 render_scene_layer(_selected_id[0])
                                                        break;


                                                    //  - - - -   end   - - - -  map server type  - - - - 





                                                    // . . . NAserver  . . .

                                                         case "route-layer":
                                                             case "closest-facility-layer":
                                                                 case "service-area-layer":
                                                                    console.log('render network analysis NA server --  -- ')
                                                                    render_network_analysis_layer(_selected_id[0])
                                                        break;

                                                        

                                                     //  - - - -   end   - - - - . . . NAserver  . . .


                                                        

                                                        case "unknown": 
                                                               render_layer_other(_selected_id[0])
                                                        break;


                                                        default:
                                                            render_layer_other(_selected_id[0])   
                                                    }
                                                    
                                                






                                                })



                                                .on('ready.jstree', function (e, data) {

                                                            // only run 1 time, first time when root folder jstree complete loaded
                                                            if (firstTime_pre_select_layer){
                                                                firstTime_pre_select_layer = false
                                                                pre_select_layer_level()

                                                            }
                                                    

                                                })



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
                                                                

                                                                    'data' : mapserver_alllayers_flatjson





                                                            } 


                                                })

                        }
                      




                        // for 3 panel only,
                        function empty_icon_panel_only_tag(){

                            // for icon panel only,
                            console.log('. . . empty icon right panel only tag . . . ')
                            
                                    $("#message_icon").html('');

                                    $("#filter-icon-div").hide();
                                    $('#jstree_icon').jstree('destroy');
                                    $('#jstree_icon').html('');

                                    $("#view_mapserver_on").html('');
                                    $("#icon_list").html('');

                                    $("#layer_legend").html('');
                                    $("#message_more_info_icon").html('');
                                    

                                    
                                     


                                    // hide, need to show later
                                    $("#field_fieldset").hide();
                                    $("#subtype_fieldset").hide();
                                    $("#domain_fieldset").hide();
                                    $("#jsoneditor_field").hide();
                                    $("#jsoneditor_subtype").hide();
                                    $("#jsoneditor_domain").hide();

                                    $("#layer-more-info").html('');
                                    $("#json-layer").hide();

                            //  -- end -- for icon panel only,
                            
                        }





                         // for 3 panel only,
                         function empty_service_and_icon_panel_all_tag(){

                            
                                    empty_icon_panel_only_tag()

                                    // for service panel only,
                                    console.log('. . . empty service middle panel only tag . . . ')

                                            $("#message_mapserver").html('');

                                            $('#jstree_mapserver').jstree('destroy');
                                            $("#jstree_mapserver").html('');
                                            $("#filter-server-div").hide();

                                            $("#inside_folder_item_list").html('');
                                            
                                            $("#thumbnail_for_mapserver").html('');
                                            $("#message_more_info_mapserver").html('');
                                            $("#coord-sys-mapserver").html('');
                                            $("#json-mapserver").hide();
                                            
                                    //  -- end --  for service panel only,
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



                       