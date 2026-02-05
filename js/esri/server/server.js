
// service (singleServer) jstree
var singleServer_flatjson = []
var current_type // can be use for any thing


// because raw single server json does not tell me what type of server, so I need to see
async function scan_any_single_server(){
// this is different from all-in-1 folder.js,  all-in-1 does not allow user change single server, 
// so I always know its what type, mapServer, or featureServer or, GeocodeServer etc.
// but here, server.js allow user choose different single server (service) url, so I don't know what server type ahead of time
// I have to check server-json to decide



    singleServer_flatjson = []
    var _url_singleServer = ___url_string
    console.log( 'scan singleServer url >>>>>  ', _url_singleServer)


    // always before await ajax, show ajax url , instead of show progressing bar
    progressing_info('layer', '(Single Server (service)): ', _url_singleServer);

    raw_singleServer =await arcgis_ajax_cross_origin(_url_singleServer, _cross);  // cross origin method 
    console.log( 'scan singleServer root response  ', raw_singleServer)


   // raw map server json does not carry this mapServer true name, 
   // it only have mapName, which maybe same as true map server name, so do not use 
   

 
   // determine single server type by url 
   // all-in-1 folder.js can get server type from root folder json, js tree node. 
   // but this seperated server.js can not do that
    if (___url_string){

        ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
        ___pathname = ___url.pathname; //    /ArcGIS/rest/services
        ___pathArray = ___pathname.split('/');
        // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
        // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]
        console.log("url path array", ___pathArray)
        current_type = ___pathArray[___pathArray.length -1]
        _organization = ___pathArray[___pathArray.length - 2]
    }


    var service_name_and_type = _organization + ' ' + '<sup>' + current_type + '</sup>';

    var singleServer_icon = mapservice_icon;
    switch(current_type) {
        case "MapServer":
        case "FeatureServer":
            singleServer_icon = mapservice_icon
        break;

        

        case "VectorTileServer":
            singleServer_icon = VectorTileServer_icon
        break;

        case "ImageServer":
            singleServer_icon = ImageServer_icon
        break;

        


        case "SceneServer":
            singleServer_icon = SceneServer_icon
        break;


        case "GeocodeServer":
            singleServer_icon = GeocodeServer_icon
        break;


        case "NAServer":
            singleServer_icon = NAServer_icon
        break;

        default:
        singleServer_icon = GroupLayer_icon
    }
    
   
    //  ....... add root item  ....... 

    // default for all geocode, naServer, imageServer, featureServer, mapServer, all use same icon here.
    var layer_item = { 

        "id" :  -1,     // -1 defined by arcgis rest api, they define top level item's parent id is -1, we must follow this rule
        
        "parent" : "#",
        "text" : service_name_and_type,
        "icon" : singleServer_icon,
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "absolute_path" : _url_singleServer,
    };
    // 1 time, first time run, add root item
    singleServer_flatjson.push(layer_item) 
    //  .......   end ....... add root item  ....... 




    /**/
    // .......  .......  map server or feature server { layers: [ ....... ] } ....... ....... 
    if (raw_singleServer.layers) {
        if ( raw_singleServer.layers.length > 0 ) {

            console.log(" have .layers array is MapServer or FeatureServer ")







            // must define default first layer id is 0 here, otherwise, first layer id will be undefined.
            var mapserver_layers_id = 0

            var mapserver_layers_parentLayerId, 
                mapserver_layers_name, 
                mapserver_layers_geometryType, 
                mapserver_layers_type;


            var _layer_or_folder_icon = layer_icon;
            var _mapserver_layers_display_text;

            var mapserver_layers = raw_singleServer.layers
            for (var l = 0; l < mapserver_layers.length; l++) { 
                        
                        // --------- avoid undefined,null value, validate -----------------
                                    
                    if ((mapserver_layers[l].id !== undefined) && (mapserver_layers[l].id !== null) && (mapserver_layers[l].id !== "")) {
                        mapserver_layers_id = mapserver_layers[l].id

                    } else {
                        mapserver_layers_id = l  // default layer item id should be 0,1,2.... in order, (if no layer id provided) 
                    }

                    
                    var mapserver_layers_absolute_path = _url_singleServer + '/'+ mapserver_layers_id;
                    var current_layer_server_path =   _url_singleServer;

                    // fix bug:  if (0) means false, if (-1, or any other number than 0) means true. following value are not truthy, null, undefined, 0, ""empty string, false, NaN
                    // for id type with possible value 0, we can not use if (id), because if (0) will means false, invalid, which we want it means valid
                    // for other string type, we can use if (string) {},  because null, undefined, empty string all will evaluate at false, which is correct.
                    if ((mapserver_layers[l].parentLayerId !== undefined) && (mapserver_layers[l].parentLayerId !== null) && (mapserver_layers[l].parentLayerId !== "")){
                        mapserver_layers_parentLayerId = mapserver_layers[l].parentLayerId

                    } else {
                        mapserver_layers_parentLayerId = -1 // -1 defined by arcgis rest api, they define top level item's parent id is -1, we must follow this rule
                    }


                    if (mapserver_layers[l].name) {
                        mapserver_layers_name = mapserver_layers[l].name

                    } else {
                        mapserver_layers_name =  ''; // 'unknown layer name'
                    }


                    if (mapserver_layers[l].geometryType) {
                        mapserver_layers_geometryType = mapserver_layers[l].geometryType

                    } else {
                        mapserver_layers_geometryType = 'unknown geometry type'; // 'unknown geometry type'
                    }


                    //  ------------ display icon, text based on type ---------------

                    // default
                    _mapserver_layers_display_text =  mapserver_layers_id + layerID_NAME_separator + mapserver_layers_name;

                    if (mapserver_layers[l].type) {
                        mapserver_layers_type = mapserver_layers[l].type
                        
                                                        
                                                            switch(mapserver_layers_type) {

                                                                case "Group Layer":
                                                                    //   if 'type' is 'Group Layer', means this is a folder, use folder icon
                                                                    _layer_or_folder_icon = GroupLayer_icon;
                                                                    mapserver_layers_geometryType = 'folder'
                                                                    
                                                                break;




                                                                case "Feature Layer":
                                                                case "Annotation Layer":
                                                                    //_layer_or_folder_icon = layer_icon
                                                                    //_layer_or_folder_icon = AnnotationLayer_icon
                                                                    switch(mapserver_layers_geometryType) {
                                                                        case "esriGeometryPolygon":
                                                                            _layer_or_folder_icon = polygon_icon
                                                                                break;
                                                                        case "esriGeometryPolyline":
                                                                            _layer_or_folder_icon = line_icon
                                                                                break;

                                                                        case "esriGeometryMultipoint":        
                                                                        case "esriGeometryPoint":
                                                                            _layer_or_folder_icon = point_icon
                                                                                break;
                                                                        default:
                                                                            _layer_or_folder_icon = unknow_geometry_icon
                                                                    }//switch geometry type
                                                                
                                                                break;

                                                                    
                                                                    

                                                                case "Raster Layer":
                                                                    _layer_or_folder_icon = RasterLayer_icon
                                                                    
                                                                break;
                                                                case "Raster Catalog Layer":
                                                                    _layer_or_folder_icon = RasterCatalogLayer_icon
                                                                
                                                                break;

                                                                case "Mosaic Layer":
                                                                    _layer_or_folder_icon = MosaicLayer_icon
                                                                    
                                                                break;

                                                                default:
                                                                _layer_or_folder_icon = unknow_layer_icon
                                                                
                                                            } 

                        


                    } else {
                        // item under {layers:[... ... ...]}, if no .type,   type = undefined
                        console.log('warning:  .type is undefined, not a feature layer, unknown layer, can not handle, blank ')
                        mapserver_layers_type = 'unknow type'
                        _layer_or_folder_icon = unknow_layer_icon

                        //   type: undefined, for v10.5 and before, type is undefined, but it is a featuerServer
                        // _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"
                        if ((current_layer_server_path.includes('FeatureServer')) || ( current_layer_server_path.includes('MapServer'))){ 
                                mapserver_layers_type = 'Feature Layer'
                                _layer_or_folder_icon = unknow_geometry_icon //line_icon, point_icon, assume polygon, but could be line, point
                                console.log('warning:  .type is undefined, but url is feature layer ')
                        }
                        
                    }// if

                    // ------------ end ------------ display icon, text based on type ---------------



                    // add layer type and geometry type to display text
                    _mapserver_layers_display_text = mapserver_layers_id + layerID_NAME_separator + mapserver_layers_name + ' ' + '<sup>' + mapserver_layers_type + '<sub>' + ' ' +  mapserver_layers_geometryType + '</sub></sup>';
                                


                    /* works, but not use

                    //  .subLayerIds =[], no sub layer id, means this item is  not a group layer folder
                    //  use another way:  if 'type' is 'Group Layer', also means this is a folder 

                    if (mapserver_layers[l].subLayerIds){
                        

                                        console.log("mapserver_layers[l].subLayerIds", l, mapserver_layers[l].subLayerIds)

                                        var _sublayerids = mapserver_layers[l].subLayerIds

                                        if (_sublayerids.length >0) {

                                                        console.log("_sublayerids.lenght > 0  ", _sublayerids.length)
                                                        // .subLayerIds have some thing, icon is folder icon
                                                        _layer_or_folder_icon = folder_icon

                                        } else {
                                                // .subLayerIds length is 0, icon is layer item
                                                _layer_or_folder_icon = layer_icon
                                        }


                    } else {

                                // .subLayerIds is null, icon is layer item,
                                _layer_or_folder_icon = layer_icon
                    }

                */
                // --------- end --------- avoid undefined,null value, validate  -----------------




                layer_item = { 
                    "id" :  mapserver_layers_id,
                    "layer_id" :  mapserver_layers_id,
                    "parent" : mapserver_layers_parentLayerId,
                    "text" : _mapserver_layers_display_text, 
                    "icon" :  _layer_or_folder_icon,
                    "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },

                   
                    "relative_path" : mapserver_layers_name, // only for layer name (without type)
                    "absolute_path" : mapserver_layers_absolute_path, 
                    "server_path" : current_layer_server_path,
                    "geometryType" :  mapserver_layers_geometryType,               
                    "type" : mapserver_layers_type
                };


                singleServer_flatjson.push(layer_item) 
        
            } // for

        } // if layers.length > 0
    } // if layers
    // .......  end .......  map server or feature server { layers: [ ....... ] } ....... ....... 



    
    /**/
    // .......  ....... feature table { tables: [ ....... ] } .......  ....... 
    if (raw_singleServer.tables)  {
        if ( raw_singleServer.tables.length > 0 )  {



            // feature table 
            var mapserver_tables_id, 
                mapserver_tables_name, 
                mapserver_tables_type;


            // {tables:[ item, item]}  because table items are flat, no structure, not like layers item( layers item is tree structure, have parent folder, children)
            // table item icon default to table_icon, not possible to be folder icon(group layer icon) 
            _layer_or_folder_icon = table_icon;

            var _mapserver_tables_display_text;


            var table_root_folder_id = -2;


            // add first item, 'table',  group layer type, parentID is -1, all sub tables will attach to this , this item id use accumulated id
            
            //  ....... add mapserver root item  ....... 
            layer_item = { 

                "id" :  table_root_folder_id,     // -2 means table (folder) 
                
                "parent" : -1,
                "text" : "Table",
                "icon" : folder_icon,
                "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },

               
                "absolute_path" : _url_singleServer,
                   
                "type" : "Group Layer"
            };
            // 1 time, first time run, add root item
            singleServer_flatjson.push(layer_item) 

        
            //  ....... add mapserver root item  ....... 



            var mapserver_tables = raw_singleServer.tables


            for (var l = 0; l < mapserver_tables.length; l++) { 
                

                            // --------- avoid undefined,null value, validate -----------------
                            

                                if ((mapserver_tables[l].id !== undefined) && (mapserver_tables[l].id !== null) && (mapserver_tables[l].id !== "")) {
                                    mapserver_tables_id = mapserver_tables[l].id

                                } else {
                                    mapserver_tables_id = l  // default layer item id should be 0,1,2.... in order, (if no layer id provided) 
                                }





                                if (mapserver_tables[l].name) {
                                    mapserver_tables_name = mapserver_tables[l].name

                                } else {
                                    mapserver_tables_name = 'unknown'
                                }





                                //  ------------ display icon, text based on type ---------------

                                            
                                    // default
                                    _mapserver_tables_display_text = mapserver_tables_id + layerID_NAME_separator + mapserver_tables_name;     
                                            

                                    if (mapserver_tables[l].type){
                                                                                    mapserver_tables_type = mapserver_tables[l].type
                                                                                    _mapserver_tables_display_text = mapserver_tables_id + layerID_NAME_separator + mapserver_tables_name + ' ' + '<sup>' + mapserver_tables_type + '</sup>';
                                                                                
                                                                                    switch(mapserver_tables_type) {

                                                                                        case "Table":
                                                                                            //   if 'type' is 'Group Layer', means this is a folder, use folder icon
                                                                                            _layer_or_folder_icon = table_icon;
                                                                                        
                                                                                        break;
                                                                                        
                                                                                    } 


                                            } else {
                                                            // item under {tables:[... ... ...]}, if no .type, default to 'Table'
                                                            mapserver_tables_type = 'Table'

                                                            
                                            }

                                // ------------ end ------------ display icon, text based on type ---------------



            
                // attach all tables to 'table' group layer item. item id is accumulated, layer_id is different from item id, 





                
                var mapserver_tables_absolute_path = _url_singleServer + '/'+ mapserver_tables_id;
                var current_tables_server_path =   _url_singleServer;

                layer_item = { 
                    "id" :  mapserver_tables_id,
                    "layer_id" :  mapserver_tables_id,
                    "parent" : table_root_folder_id,
                    "text" : _mapserver_tables_display_text, 
                    "icon" :  _layer_or_folder_icon,
                    "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },


                   
                    "absolute_path" : mapserver_tables_absolute_path, 
                    "server_path" : current_tables_server_path,

                    "type" : mapserver_tables_type
                };


                singleServer_flatjson.push(layer_item) 
            











            
            } // for



        } // if table length > 0
    } // if table
    // .......  ....... feature table { tables: [ ....... ] } .......  ....... 
    

    


// for GeocodeServer, VectorTileServer, ImageServer  , SceneServer ,.... for 3 panel only, for middle service panel only,  j s t r e e _mapserver() [middle panel]
           







//  .......   end ....... for GeocodeServer, VectorTileServer, ImageServer  , SceneServer ,.... for 3 panel only, for middle service panel only,  j s t r e e _mapserver() [middle panel]
 




    // must keep at bottom, if flat json is empty means, this is not supported type of single server
    if (singleServer_flatjson.length > 0 ){
                // flatjson include both layers:[] and tables:[],  tables all attached to table group folder
                jstree_mapserver_for_mobile(singleServer_flatjson, _url_singleServer, service_name_and_type)
    }else {
        //only have 1 root item, means, no layers:[],  no table:[] , or both are empty, show error,   mapserver url 
        console.log("mapserver url error ...>> ",JSON.stringify(raw_singleServer) )

        // show error message, if empty, will show error message too
        render_message_service_panel("Not Supported (service type)")
        //render_message_service_panel(JSON.stringify(raw_singleServer))
    }




}

  


function jstree_mapserver_for_mobile(mapserver_alllayers_flatjson, mapserver_url, mapserver_url_display_text){






        // top, name, link
        var _html_for_message_mapserver  = ''
        // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
        _html_for_message_mapserver     = '<a target="_blank" id="_mapserver_link" href="' +  mapserver_url + '?f=html" style="font-weight: bolder;">'  
        _html_for_message_mapserver    +=    mapserver_url_display_text 
        _html_for_message_mapserver    += '</a>'

      

        $('#message_mapserver').html( _html_for_message_mapserver);


        // for mobile only, do not show any info
        //get_mapserver_info_html(mapserver_url)
        
        
        
        
        console.log("  >>> jstree-mapserver json : ", mapserver_alllayers_flatjson)


        $("#filter-server-div").show()
        $('#jstree_mapserver')
                            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                            // not use these 2 line, Because they will NOT fire event, if you click a already selected node, it only fire event if selected node changed.
                            //.on('select_node.jstree', function (e, data) {
                            //.on('changed.jstree', function (e, data) {
                            // if you want to always fire event, even on a already selected node, use this line 
                            .on('activate_node.jstree', function (e, data) {
                        




                        
                                console.log('click select service-layer node event ', data)
                                var i, j,  _selected_path = [], _selected_relative_path = [], _selected_text = [], _selected_id = [], _selected_type = [];

                                for(i = 0, j = data.selected.length; i < j; i++) {
                                    _selected_path.push(data.instance.get_node(data.selected[i]).original.absolute_path);
                                    _selected_text.push(data.instance.get_node(data.selected[i]).text);
                                    _selected_relative_path.push(data.instance.get_node(data.selected[i]).original.relative_path);
                                    _selected_id.push(data.instance.get_node(data.selected[i]).id);
                                    // must use .original.type, because re-structured json does not carry our customized field 'type'
                                    _selected_type.push(data.instance.get_node(data.selected[i]).original.type);
                                }
                                
                                
                                // only get 1st selected node, so always use    _selected_xxxxx[0] 

                                //$('#event_result').html('Selected: ' + r.join(', '));
                                console.log('Selected node id : ' + _selected_id[0])
                                console.log('Selected node path : ' + _selected_path[0])
                                console.log('Selected node text : ' +  _selected_text[0])
                                console.log('Selected node relative path : ' +  _selected_relative_path[0])
                                console.log('Selected node type : ' +  _selected_type[0])

                                var selected_node_id = _selected_id[0]
                                var selected_node_path = _selected_path[0]
                                var selected_node_text = _selected_text[0]
                                var selected_node_relative_path = _selected_relative_path[0]
                                var selected_node_type = _selected_type[0]

                                update_url_parameter('select_layer', _selected_id[0]);
                                update_url_parameter('select_layer_text', _selected_text[0]);

                                //   "Raster Layer",   "Raster Catalog Layer" 
                                if (selected_node_type.includes("Raster")) {
                                    selected_node_type = "Raster Layer";
                                }

                                //switch(_selected_type[0]) {     // this is true value
                                switch(selected_node_type) {               // this is generalized value


                                    //  - - - -  feature layer  type  - - - - 
                                    /**/
                                        // Do not confuse with 'FeatureServer'(no space between),  'Feauter Layer'(have space between)
                                        case "Feature Layer": 
                                        case "Annotation Layer":
                                                            console.log('render MapServer(featureServer) -- feature layer --')
                                                        
                                                            // show icon , 
                                                            //render_feature_layer(_selected_id[0])
                                                            // for 3 panel only, because already have map.server.full.json, do not need ajax again show layer legend,  
                                                            //show_legend(_selected_id[0], mapserver_legend)
                                        break;


                                        case "Table":
                                            console.log('render MapServer(featureServer) -- table --')
                                        

                                            // show icon ,
                                            //render_table(_selected_id[0])
                                    break;

                                    case "Raster Layer": 
                                                console.log('render MapServer -- raster layer --')
                                                // show icon , with 
                                                //render_raster_layer(_selected_id[0])
                                                // for 3 panel only, show layer legend,because already have map.server.full.json, do not need ajax again show layer legend,  
                                                //show_legend(_selected_id[0], mapserver_legend)
                                    break;


                                //   - - - -   end - - - -  feature layer  type  - - - - 

                                        
                                
                                        case "Group Layer":
                                        // show list of child item, no jstree, only list item
                                        console.log(" disable render group layer, because it is too complicated ", _selected_id[0])
                                        // disable render group layer, because it is too complicated
                                        //render_group_layer(_selected_id[0])
                                        break;

                                    
                                    
                                /**/
                                //  - - - -  map server type  - - - - 

                                    
                                    case "MapServer":
                                    case "FeatureServer":
                                                // render_viewMapServerOn_layer(_selected_path[0], _selected_text[0])
                                                            
                                    break;

                                    
                                    case "VectorTileServer": 
                                            console.log('render vector tile server -- #layer# -- ')
                                            // show icon , with 
                                            // render_vectortile_layer(_selected_id[0])
                                    break;


                                    case "ImageServer": 
                                                        // show icon , with 
                                                        //  render_image_layer(_selected_id[0])

                                                        // show layer legend
                                                        // single server only have 1 layer, _selected_id[0] is always -1 , 
                                                        // however in legend layers, that single layer id is 0, 
                                                        // can't use _selected_id[0] which is always -1
                                                        // show_legend(_selected_id[0], mapserver_legend)

                                                        // single layer id is always 0
                                                        //  show_legend(0, mapserver_legend)

                                    break;

                                    case "GeocodeServer":
                                                console.log('render geocode server --  -- ')
                                                //  render_geocode_layer(_selected_id[0])
                                    break;

                                    


                                    case "SceneServer": 
                                                console.log('render scene server -- #layer# --')
                                                // show icon , with 
                                            //  render_scene_layer(_selected_id[0])
                                    break;


                                //  - - - -   end   - - - -  map server type  - - - - 





                                // . . . NAserver  . . .

                                        case "route-layer":
                                            case "closest-facility-layer":
                                                case "service-area-layer":
                                                console.log('render network analysis NA server --  -- ')
                                                //  render_network_analysis_layer(_selected_id[0])
                                    break;

                                    

                                    //  - - - -   end   - - - - . . . NAserver  . . .


                                    

                                    case "unknown": 
                                        //   render_layer_other(_selected_id[0])
                                    break;


                                    default:
                                        //  render_layer_other(_selected_id[0])   
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


               //  ****************  user click/select folder level item *******  layer level item  ********************
               /**/
                                    // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
                                    function selectFolderLevelItem(folderLevel_id){

                                        console.log(' **** select folder level id is  ***** ', folderLevel_id )
                                        console.log(' **** select folder level id is  ***** ', $('#jstree_root_folder').jstree(true) )
                                        $('#jstree_root_folder').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                        $('#jstree_root_folder').jstree(true).select_node(folderLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                        //$('#jstree_root_folder').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                    }

                                    // layer level item could be grouplayer( a folder have many sub layers ) or a feature layer or etc... ( render layer section)
                                    function selectLayerLevelItem(layerLevel_id){

                                        console.log(' **** select layer level id is  ***** ', layerLevel_id )
                                        $("#filter-server-div").show()
                                        $('#jstree_mapserver').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                        $('#jstree_mapserver').jstree(true).select_node(layerLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                        //$('#jstree_mapserver').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                    }

               //  ****************  end  ***************   user click/select folder level item *******  layer level item  ********************
                /* */

                    /* */

                        // ****** pre select by url param  ****** 

                                    var selected_folderLevel_id;
                                    var selected_folderLevel_text;

                                    function  pre_select_folder_level(){

                                                // Do NOT re-create instance of url params, use first time, filter by=xxx  as records
                                                //urlParams = new URLSearchParams(window.location.search);


                                                    
                                                    selected_folderLevel_id = urlParams.get('select_folder');
                                                    selected_folderLevel_text = urlParams.get('select_folder_text');
                                                   
                                                   
                                                    console.log('old existing in url node id ',  selected_folderLevel_id)
                                                    // node id may not be true, if new item has been added to arcgis server, node text is always true, 
                                                    // node text is raw html, including html sup tag, + plus sign, but no need to clean up, just use it as is 
                                                    if ((selected_folderLevel_text == undefined) || (selected_folderLevel_text == null) || (selected_folderLevel_text == '')){
                                                            // select folder text is null, undefined, nothing to do, just use node id
                                                    }else {
                                                            // select folder text should overwrite node id, get real node id by node text
                                                                // get existing jstree flat json https://groups.google.com/g/jstree/c/nn7GPC43WpA
                                                            var rootFolderFlatJsonData = $('#jstree_root_folder').jstree(true).get_json('#', {no_state:true,flat:true})
                                                            console.log('root Folder Flat Json Data',  rootFolderFlatJsonData)
                                                            
                                                            for (let i = 0; i < rootFolderFlatJsonData.length; i++) {
                                                                if(rootFolderFlatJsonData[i]['text'] == selected_folderLevel_text){
                                                                    selected_folderLevel_id = rootFolderFlatJsonData[i]['id']
                                                                    console.log('find new real node id ',  selected_folderLevel_id)
                                                                }//if
                                                            }//for

                                                    }//if



                        
                                                    if ((selected_folderLevel_id == undefined) || (selected_folderLevel_id == null) || (selected_folderLevel_id == '')){
                        
                                                        // select folder is null, undefined, nothing to select
                                                    }else {
                        
                                                        console.log('selected_folderLevel_id',  selected_folderLevel_id)
                                                        selectFolderLevelItem(selected_folderLevel_id)
                                                       
                                                       
                                                    }



                                    }

                                    var firstTime_pre_select_layer = true;
                                    var selected_layerLevel_id;
                                    var selected_layerLevel_text;

                                    function  pre_select_layer_level(){


                                                        
                                                        selected_layerLevel_id = urlParams.get('select_layer');
                                                        selected_layerLevel_text = urlParams.get('select_layer_text');
                                                        
                                                        console.log('old in url layer level node id ',  selected_layerLevel_id)
                                                        // node id may not be true, if new item has been added to arcgis server, node text is always true, 
                                                        // node text is raw html, including html sup tag, + plus sign, but no need to clean up, just use it as is 
                                                        if ((selected_layerLevel_text == undefined) || (selected_layerLevel_text == null) || (selected_layerLevel_text == '')){
                                                                // select folder text is null, undefined, nothing to do, just use node id
                                                        }else {
                                                                // select folder text should overwrite node id, get real node id by node text
                                                                // get existing jstree flat json https://groups.google.com/g/jstree/c/nn7GPC43WpA
                                                                $("#filter-server-div").show()
                                                                var layerFlatJsonData = $('#jstree_mapserver').jstree(true).get_json('#', {no_state:true,flat:true})
                                                                console.log('layer Flat Json Data',  layerFlatJsonData)
                                                                
                                                                for (let i = 0; i < layerFlatJsonData.length; i++) {
                                                                    if(layerFlatJsonData[i]['text'] == selected_layerLevel_text){
                                                                        selected_layerLevel_id = layerFlatJsonData[i]['id']
                                                                        console.log('find new layer real node id ',  selected_layerLevel_id)
                                                                    }//if
                                                                }//for

                                                        }//if
                                                        

                            
                                                        if ((selected_layerLevel_id == undefined) || (selected_layerLevel_id == null) || (selected_layerLevel_id == '')){
                            
                                                            // select layer is null, undefined, nothing to select
                                                        }else {
                            
                            
                                                            selectLayerLevelItem(selected_layerLevel_id)
                            
                            
                                                        }



                                    }

                        // ******  end   ******  pre select by url param  ****** 
                        /**/


                     







                function init_start_server_input(){
    
    
                    reset_everything()
    
                    $("#current_rest_api_endpoint").val(___url_string)
    
                    $('#current_rest_api_endpoint').on('search', letsgo_handler_for_server);
                    $( "#letsgo").click(letsgo_handler_for_server);

                   
                }


                

                function letsgo_handler_for_server(){

                        ___url_string = $("#current_rest_api_endpoint").val().trim();

                        reset_everything()

                        if (___url_string){

                            ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                            ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                            ___pathArray = ___pathname.split('/');
                            // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
                            // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]
                            console.log("___pathArray", ___pathArray)
                            current_type = ___pathArray[___pathArray.length -1]
                            _organization = ___pathArray[___pathArray.length - 2]


                            update_url_parameter('org', _organization)
                            update_url_parameter('url', ___url_string)
                            
                            document.getElementById("title").innerHTML = _organization; 
                                   
                            scan_any_single_server()
                        }//if

                }





(function($){

   
   
    
    init_global_var();
   
    init_start_server_input()
    
      
    // first time run 
    // url means map-server, etc.. path
    // org here means map-server name, or any other server name, image-server, feature-server, geocode-server, NAserver etc.
    if (___url_string){
         scan_any_single_server()
    }


     //all init button, click event, including collapse expand button
     ui_event_register() 


    // can't be here, must await until first time load completed
    //pre_select_folder_level()



})(jQuery);












