

// this is for 2-panel system







/*

 sample use: 
 
 http://localhost:10/json2tree/esri/server/folder.html?url=https://maps.lacity.org/arcgis/rest/services&org=Los+Angeles+CA+navigateLA&_center_lat=34.049039&_center_long=-118.246521&_center_zoom=17&select_folder=21&select_layer=3

 http://localhost:10/json2tree/esri/server/folder.html?url=https://gisprod10.co.fresno.ca.us/server/rest/services&org=Fresno+County+CA+gisprod10&_center_lat=36.746841&_center_long=-119.772591&_center_zoom=17&select_folder=43&select_layer=4
 
 http://localhost:10/json2tree/esri/server/folder.html?url=https://exploreajax.ajax.ca/mapajax/rest/services&org=Ajax+Canada&_center_lat=43.8505&_center_long=-79.02115&_center_zoom=17&select_folder=20

    url= mapaserver root url
    org= title or name
    _center_lat=
    _center_long=
    _center_zoom=


      select_folder=20      folder jstree flatjson array, item id
      select_layer=20       layer jstree flatjson array, item id
*/



var iconJstreeNodeOpened =  false; // true is expanded all,  false is collapse all 
var iconJstreeforceOpen = true;



// top level folder jstree
var folder_structure_flatjson= [];

// 2nd level service (mapserver) jstree
var mapserver_flatjson = [];


// 3nd level icon jstree
var icon_flatjson = [];





            // not use, only show as sample, later will re-populate  with real data
            folder_structure_flatjson = [
                                                                



                { 
                    "id" : "1", 
                    "parent" : "#", 
                    "text" : "Root",
                    "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        "selected"  : true   // is the node selected
                                    },
                },


                { 
                    "id" : "2", 
                    "parent" : "1", 
                    "text" : "Folder" ,
                    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        //"selected"  : true   // is the node selected
                    },
                },


                { 
                    "id" : "3", 
                    "parent" : "1", 
                    "text" : "Service",
                    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        //"selected"  : true   // is the node selected
                    },
                },

                { 
                    "id" : "4", 
                    "parent" : "2", 
                    "text" : "xxx 1" 
                },


                { 
                    "id" : "5", 
                    "parent" : "2", 
                    "text" : "xxx 2" 
                },

                { 
                    "id" : "6", 
                    "parent" : "3", 
                    "text" : "MapServer",
                  
                },

                { 
                    "id" : "7", 
                    "parent" : "3", 
                    "text" : "FeatureServer",
                    
                },



            ]





            

            function render_single_imageserver_root_folder(_imageServer_root, _imageServer_url){


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



                                                       folder_structure_flatjson = [ 
                                                        
                                                                // root 
                                                                {
                                                                    absolute_path: _imageServer_url,
                                                                    icon: folder_icon,
                                                                    id: 0,
                                                                    node_path: "/",
                                                                    parent: "#",
                                                                    relative_path: "Root",
                                                                    state: {opened: true},
                                                                    text: "Root",
                                                                    type: "folder",

                                                                }, 

                                                                // image server
                                                                {

                                                                    absolute_path: _imageServer_url,
                                                                    icon: ImageServer_icon,
                                                                    id: 1,
                                                                    node_path: _imageServer_root.name,                         // "Aerial/La_Quinta_areial_2013",
                                                                    parent: 0,
                                                                    relative_path: _imageServer_root.name,                     // "La_Quinta_areial_2013",
                                                                    state: {},
                                                                    text:   _imageServer_root.name + ' <sup>ImageServer</sup>',      // "La_Quinta_areial_2013 ( ImageServer ) ",
                                                                    type: "ImageServer"

                                                                }


                                                     ]


                                                      jstree_root_folder(folder_structure_flatjson, ___url_string,  _organization, ___hostname )


            }

        





                            // ======== jstree =============


/* */

                                    // top level [left panel]  ----- folder ------   
                                        function jstree_root_folder(root_allfolders_flatjson, root_url, root_url_organization, root_url_hostname){

                                                  
                                            var _html_org = ""
                                            // arcgis version number
                                            var _html_version = '<span>ArcGIS Enterprise Version </span>'
                                            _html_version += '<span style="font-size:x-large; font-weight: bolder;">' + currentVersion + '</span>'
                                            _html_org += '<a target="_blank" id="_orgnization_link" href="'+ root_url + '">' + _html_version +  '</a>'
                                            // org name, not use, but keep here for future use 
                                            //_html_org += '<a target="_blank" id="_orgnization_link" href="'+ root_url + '">' + root_url_organization +  '</a>'
                                            // domain, not use, but keep here for future use 
                                            //_html_org += '<a target="_blank" id="_orgnization_link2" href="'+ root_url +'">' + root_url_hostname    + '</a>' 


                                            $('#message_root_folder').html(_html_org);
                                            

                                           

                                            console.log(" jstree all folder  flat json feed : ", root_allfolders_flatjson)



                                            
                                            $('#jstree_root_folder')
                                                                // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                                                            
                                                                .on('changed.jstree', function (e, data) {

                                                            //.on('select_node.jstree', function (e, data) {



                                                            

                                                                    //  - -- - only for mobile  - -- -

                                                                    // user click one item in root folder
                                                                     $("#back-2-panel").show();
                                                                     $("#root-folder-div").hide();
                                                                     $("#app-div").show();
                                                                     $("#map-window-iframe").hide();

                                                                    //  - -- - end  - -- -   only for mobile  - -- -






                                                                    console.log(' click select folder node, event ', data)
                                                                    var i, j,  _selected_path = [], _selected_text = [], _selected_id = [], _selected_type = [];

                                                                    for(i = 0, j = data.selected.length; i < j; i++) {
                                                                        _selected_path.push(data.instance.get_node(data.selected[i]).original.absolute_path);
                                                                        _selected_text.push(data.instance.get_node(data.selected[i]).text);
                                                                        _selected_id.push(data.instance.get_node(data.selected[i]).id);
                                                                        // must use .original.type, because re-structured json does not carry our customized field 'type'
                                                                        _selected_type.push(data.instance.get_node(data.selected[i]).original.type);
                                                                    }


                                                                    // only get 1st selected node, so always use    _selected_xxxxx[0] 

                                                                    //$('#event_result').html('Selected: ' + r.join(', '));
                                                                    console.log('Selected node id : ' + _selected_id[0])
                                                                    console.log('Selected node path : ' + _selected_path[0])
                                                                    console.log('Selected node text : ' +  _selected_text[0])
                                                                    console.log('Selected node type : ' +  _selected_type[0])


                                                                    var selected_node_type = _selected_type[0]
                                                                    if (selected_node_type){
                                                                      
                                                                    }else{
                                                                        //   type: undefined, for v10.5 and before, type is undefined, but it is a featuerServer
                                                                        // _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"
                                                                        if ((_selected_path[0].includes('FeatureServer')) || ( _selected_path[0].includes('MapServer'))){ 
                                                                            selected_node_type = 'Feature Layer'                                                                               
                                                                                console.log('warning:  .type is undefined, but url is feature server ')
                                                                        }
                                                                    }




                                                                    


                                                                    
                                                                    empty_icon_panel_all_tag()

                                                                    update_url_parameter('select_folder', _selected_id[0]);
                                                                    update_url_parameter('select_folder_text', _selected_text[0]);
                                                                    update_url_parameter('select_layer', '');

                                                                    switch(selected_node_type) {


                                                                         //  - - - -  feature layer  type  - - - - 
                                                                         /**/

                                                                            // Do not confuse with 'FeatureServer'(no space between),  'Feauter Layer'(have space between)
                                                                            case "Feature Layer":
                                                                            case "Annotation Layer":
                                                                                            console.log('render feature layer --')
                                                                                            show_icon_tag()
                                                                                            // show icon 
                                                                                            render_feature_layer(_selected_id[0])

                                                                                            // for 2 panel only, map.server.full.json, do not, exist yet, need ajax again show layer legend, this function move to render feature layer
                                                                                            // s h o w _ l e g e n d (_s elected_id[0], m a p s erver_l e g e n d)
                                                                            break;




                                                                            case "Table":

                                                                                            console.log('render table --')
                                                                                            show_icon_tag()
                                                                                            // show icon , 
                                                                                            render_table(_selected_id[0])
                                                                            break;

                                                                            case "Raster Layer": 
                                                                                    console.log('render MapServer -- raster layer --')
                                                                                    // show icon ,
                                                                                    render_raster_layer(_selected_id[0])

                                                                                    // for 2 panel only, map.server.full.json, do not, exist yet, need ajax again show layer legend, this function move to render feature layer
                                                                                    // s h o w _ l e g e n d (_s elected_id[0], m a p s erver_l e g e n d)
                                                                            break;

                                                                         //   - - - -   end - - - -  feature layer  type  - - - - 



                                                                       

                                                                            // folder and group layer are same thing, both use same render folder function
                                                                            case "folder":
                                                                                        console.log(' render folder ', _selected_id[0])
                                                                                        render_folder(_selected_id[0])
                                                                            break;
                                                                            case "Group Layer":
                                                                                console.log(' render group layer ', _selected_id[0])                                                                               
                                                                                render_folder(_selected_id[0])
                                                                            break;





                                                                        /**/
                                                                        //  - - - -  map server type  - - - - 




                                                                        case "MapServer":
                                                                        case "FeatureServer":
                                                                                    // for 2 panel, this show  mapserver's layers icon jstree
                                                                                    render_viewMapServerOn_layer(_selected_path[0], _selected_text[0])

                                                                                    // for 2 panel, this only show mapserver meta data, legend, etc. do not show layers icon jstree
                                                                                    // this original in 3 panel was used to render middle service panel, but in 2 panel system, use to show mapserver meta info only.
                                                                                    render_mapserver(_selected_id[0])

                                                                        break;

                                                                        case "ImageServer":
                                                                            console.log('render Image Server -- ')
                                                                            render_image_layer(_selected_id[0])
                                                                            
                                                                        break;





                                                                        case "GeocodeServer":
                                                                            console.log('render geocode server --  -- ')
                                                                            render_geocode_layer(_selected_id[0])
                                                                        break;


                                                                        

                                                                                                                                                

                                                                        /**/
                                                                        //  --- NAserver    --- 
                                                                        /**/


                                                                        case "NAServer":
                                                                                
                                                                            // for 2 panel, this show  mapserver's layers icon jstree
                                                                            // do not render anything, only render layers in NAserver 

                                                                            // for 3 panel not used 
                                                                            // render_NAserver(_selected_id[0])
                                                                           
                                                                        break;


                                                                         case "route-layer":
                                                                            case "closest-facility-layer":
                                                                                case "service-area-layer":
                                                                                    console.log('render network analysis NA server --  -- ')
                                                                                    render_network_analysis_layer(_selected_id[0])
                                                                        break;


                                                                        /**/
                                                                        //  --- end  ---  NAserver    --- 
                                                                        /**/





                                                                        case "VectorTileServer":
                                                                            console.log('render vector tile server -- #layer# -- ')
                                                                            // show icon ,
                                                                            render_vectortile_layer(_selected_id[0])
                                                                        break;

                                                                        case "SceneServer":
                                                                                    console.log('render scene server -- #layer# -- ')
                                                                                    // show icon , 
                                                                                    render_scene_layer(_selected_id[0])
                                                                        break;

                                                                       


                                                                    //  - - - -   end   - - - -  map server type  - - - - 



                                                                        case "unknown":
                                                                            render_layer_other(_selected_id[0]) 
                                                                        break;


                                                                        default:
                                                                            render_layer_other(_selected_id[0])  
                                                                                        
                                                                    }
                                                                    
                                                                






                                                                })




                                                                // 'ready.jstree' triggered after all nodes are finished loading
                                                                // 'loaded.jstree' , triggered after the root node is loaded for the first time
                                                                .on('ready.jstree', function (e, data) {

                                                                    // only run 1 time, first time when root folder jstree complete loaded
                                                                    pre_select_folder_level()

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
                                                                                

                                                                                    'data' : root_allfolders_flatjson





                                                                            } 


                                                                });

                                            

                                                               
                                

                                        }

                          


                            // ========  end  ============== jstree =============



/* */










  /**/
  // -- -- --  scan root server ( all layer from root for 2 panel )-- -- -- 
  /**/   

                                // ........... top level [left panel]  ........ will use jstree --> jstree() [left panel] ...............
/**/
                                    // first time load(one time run), prepare top level folder (flat json array) --> feed to --> jstree() [left panel]
                                async function scan_folder_structure(){

                                    console.log( 'scan folder structure rest api root url >>>>>  ', ___url_string)
                                    var root_url = ___url_string


                                    folder_structure_flatjson = []
                                    // root
                                    var id_counter = 0;
                                    var current_parent_id_counter;
                                    // root item + folder item + service item(mapserver, geocodeserver, etc......)
                                    var flatJson_item; 
                                    var custom_icon, service_name_and_type;
                                    var _flat = [];     // ... accumulated... mapserver only or feature server only
                                    var _just_get = []  // not accumulat, only the current transaction get

                                   






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





                                    
                                    // always before await ajax, show ajax url , instead of show progressing bar 
                                    progressing_info('folder', id_counter, root_url);
                                    

                                    var root = await arcgis_ajax_cross_origin(root_url, _cross);  // cross origin method 
                                                

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


        
    


// ********* add root item *********


    flatJson_item =  { 
    //"id" : id_counter.toString(), 
    "id" : id_counter, 
        "parent" : "#",   // root parent id is #
        "text" : "Root",
        "icon" : folder_icon,
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                        },

        "relative_path": "Root",              
        "node_path" : "/", 
        "absolute_path" : root_url, 
        "type" : "folder"
    };


    // 1 time, first time run, add root item
    folder_structure_flatjson.push(flatJson_item) 

    root.id = flatJson_item.id
// *******  end  ********* add root item *********





    // add relative path reference
    root.relative_path = '/';
    root.absolute_path = root_url;
    // build stack


    var stack = new Stack();
    stack.push(root);





    // console.log(stack.count);
    
    while(stack.count > 0) {
                
            




                // first pop up 'root', because root was first push into the stack(queue), first in stack, first pop up stack 

                var current = stack.pop();
                

                // console.log('current-------',current);
                // set current node id as sub-item's parent id
                current_parent_id_counter = current.id;

            
                








                
                
                // all folders ---> stack
                if(current.hasOwnProperty('folders')&& (current.folders !== null ) && (current.folders !== '' )) {
                    if(current.folders.length >0) {





                    var current_folders = current.folders;
                    for (var j2 = 0; j2 < current_folders.length; j2++) {
                        
                        
                        
                        //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                        // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                        // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                        // Portland/Aerial (ImageServer)

                        // node_path is 'Portland/Aerial'
                        //
                            var node_path = current_folders[j2]                
                            var  node_path_array = node_path.split('/');
                            var  _relative_name = node_path_array[node_path_array.length-1]; // if have /, only need last part after last /

                        //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                    




                        
                        // this absolute path is for children's absolute path, do not confuse with current(parent) absolute path
                        var absolute_path = current.absolute_path + '/'+ _relative_name; 

                        


                        // ********* add folder item *********

                                    id_counter += 1;

                                    flatJson_item =  { 
                                        //"id" : id_counter.toString(), 
                                        "id" : id_counter, 
                                        //"parent" : current_parent_id_counter.toString(),   // root parent id is #
                                        "parent" : current_parent_id_counter,   // root parent id is #
                                        "text" : _relative_name,
                                        "icon" : folder_icon,
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },

                                        "relative_path":  _relative_name,               
                                        "node_path" : node_path, 
                                        "absolute_path" : absolute_path, 
                                        "type" : "folder"
                                    };
                                            
                                    
                                        // add folder item
                                        folder_structure_flatjson.push(flatJson_item) 


                        // ********* end ********** add folder item *********
                        



        // always before await ajax, show ajax url , instead of show progressing bar 
        console.log('folder relative name (folder name)', id_counter, _relative_name); 
        console.log('folder (path)', id_counter, absolute_path);
     
        progressing_info('folder', id_counter, absolute_path);

       

                        // this absolute path is for children's absolute path, do not confuse with current(parent) absolute path
                        // var node =await ajax_getjson(absolute_path);
                        var node =await arcgis_ajax_cross_origin(absolute_path, _cross);  // cross origin method 


                        
                        if (node !== null){
                                node.absolute_path = absolute_path;
                                node.relative_path = current.relative_path+ '/'+_relative_name;
                                
                                // must carry this id as sub-item's parent id
                                node.id = flatJson_item.id;

                                stack.push(node);
                        }// if





 }// for
                            




                    }  // if folders.length >0    
                    }  // if folders    
                    
                    
                    





    
    
    
    
                
                
            
                // all services ---> flat 
                if ( current.hasOwnProperty('services')  && (current.services !== null ) && (current.services !== '' )){

                    if ( current.services.length > 0 ){


                        var current_services = current.services;
                
                        console.log('current_services, folder-id ',current_parent_id_counter,  current_services)

                        for (var i1 = 0; i1 < current_services.length; i1++) {
                    
                        
                            //console.log('i1-', i1)
                
                
                
                
                //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                // Portland/Aerial (ImageServer)
                    
                    var node_path = current_services[i1].name  //      'Utilities/GeocodingTools'
                    var  node_path_array = node_path.split('/');
                    var  _relative_name = node_path_array[node_path_array.length-1]; // if have /, only need last part after last /      we only need  'GeocodingTools'
                    var _current_services_type = current_services[i1].type                                                                               // 'GPServer'
                //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                
                
                
                
                /* not use, because it slow down the whole process
                
                // ---- only ajax once last map server to calculate center lat long -----
                
                            // only can use   .../MapServer or  .../FeatureServer to get _center lat long
                            // use first   .../MapServer or  .../FeatureServer have NO accurate, 
                            // instead, we use last one, or any one in middle is more accurate. 
                            // if ((( _center._center_lat == null ) ||  ( _center._center_long == null )) && ( (_current_services_type == 'MapServer')||(_current_services_type == 'FeatureServer'))) 
                            
                            // apply to all case
                            if (( _center._center_lat == null ) ||  ( _center._center_long == null )
                                    || ( _center._center_lat == default_center_lat ) ||  ( _center._center_long == default_center_long )
                                ){  
                                    if  (
                                        ((_current_services_type == 'MapServer')||(_current_services_type == 'FeatureServer'))
                                        // must not have'SampleWorldCities'
                                        // must exclude --- SampleWorldCities ( MapServer ) it always give lat=13 long=-14    https://gismaps.kingcounty.gov/arcgis/rest/services/SampleWorldCities/MapServer
                                        && (_relative_name.toLowerCase().indexOf("world") == -1)
                                    ){

                                                    //var getLatLong_url = current.absolute_path + '/'+current_services[i1].name +  '/'+_current_services_type
                                                    var getLatLong_url = current.absolute_path + '/'+  _relative_name +  '/' + _current_services_type

                                                    // always before await ajax, show ajax url , instead of show progressing bar 
                                                    progressing_info('folder', 'getting Lat Long', getLatLong_url);

                                                    //var getLatLong_response = await ajax_getjson(getLatLong_url);
                                                    var getLatLong_response = await arcgis_ajax_cross_origin(getLatLong_url, _cross);  // cross origin method 


                                                    console.log('getLatLong_response.....>',getLatLong_url)
                                                    console.log('getLatLong_response......>',getLatLong_response)

                                                    if (getLatLong_response !== null){

                                                                        // server side projection: (Do not delete, keep)
                                                                            // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                            // _center = await calculate_center_lat_long(getLatLong_response);
                                                                            // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                            // _center = await proj4js_centerLatLong(getLatLong_response);
                                                                            // console.log(' server side prjection get center ====> ', _center)
                                                                            // update_url_parameter('_center_lat', _center._center_lat);
                                                                            // update_url_parameter('_center_long', _center._center_long);
                                                                            // if ( _center._center_zoom == null ) {
                                                                            //    update_url_parameter('_center_zoom', default_center_zoom);
                                                                            //  }

                                                                // client-side re-projection, no ajax, no geometryServer 
                                                                        // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                        // await does not works,  we manually set it run how many times
                                                                if (runClientProjectTimes < runClientProjectLimit) {
                                                                            runClientProjectTimes += 1;
                                                                            clientSide_project(getLatLong_response)  
                                                                } 
                                                    }//if
                                    }// if 
                            }// if 
                    
                // ----  ------- end ------------- only ajax once last map server to calculate center lat long -----
                
                */
                
                
                
                
                
                
                
                
                // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                
                
                // dynamic CMV

//http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

//http://ms.transparentgov.net/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                

                    
                    var absolute_path_service_url = current.absolute_path + '/'+ _relative_name +  '/'+_current_services_type
                    
                    
                    var _relative_path = current.relative_path + '/'+ _relative_name +  '/'+_current_services_type;
                
                    var _mapServer = {"name": current_services[i1].name,  "type": _current_services_type, "absolute_url":absolute_path_service_url, "relative_path":_relative_path, "center_lat":_center._center_lat, "center_long":_center._center_long };


                    console.log('flat push a  _mapServer ', _mapServer)

                    _just_get = []
                    _just_get.push(_mapServer); 
                    _flat = _just_get.concat(_flat);




                            // ********* add service item *********

                                        id_counter += 1;

                                        switch(_current_services_type) {

                                            case "MapServer":
                                            case "FeatureServer":
                                                custom_icon = mapservice_icon
                                            break;


                                            case "VectorTileServer":
                                                custom_icon = VectorTileServer_icon
                                            break;

                                            case "ImageServer":
                                                custom_icon = ImageServer_icon
                                            break;

                                            


                                            case "SceneServer":
                                                custom_icon = SceneServer_icon
                                            break;


                                            case "GeocodeServer":
                                                custom_icon = GeocodeServer_icon
                                            break;

                                            case "NAServer":
                                                custom_icon = NAServer_icon
                                            break;


                                            default:
                                            custom_icon = unknow_layer_icon
                                        }
                                        
                                        
                                        service_name_and_type = _relative_name + ' ' + '<sup>' + _current_services_type + '</sup>';

                                        flatJson_item =  { 
                                        //"id" : id_counter.toString(), 
                                            "id" : id_counter, 
                                        //"parent" : current_parent_id_counter.toString(),   // root parent id is #
                                        "parent" : current_parent_id_counter,   // root parent id is #
                                            "text" :  service_name_and_type,
                                            "icon" : custom_icon,
                                                "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            },

                                            "relative_path": _relative_name,                
                                            "node_path" : node_path, 
                                            "absolute_path_parent_service" : absolute_path_service_url,
                                            "absolute_path" : absolute_path_service_url, 
                                            "type" : _current_services_type
                                        };
                                                
                                        
                                            // add service item
                                            folder_structure_flatjson.push(flatJson_item) 


                            // ********* end ********** add service item *********



                        // always before await ajax, show ajax url , instead of show progressing bar
                        progressing_info('folder', id_counter, absolute_path_service_url);
                        console.log('service id before ajax', id_counter, absolute_path_service_url)


                        // this absolute path is for children's absolute path (absolute_path_service_url), do not confuse with current(parent) absolute path
                        // var node =await ajax_getjson(absolute_path_service_url);
                        var node =await arcgis_ajax_cross_origin(absolute_path_service_url, _cross);  // cross origin method 
                        console.log(' layer node raw raw ', id_counter, absolute_path_service_url, node)
            
                        if (node !== null)
                            {
                                
                                node.absolute_path = absolute_path_service_url;
                                node.relative_path = _relative_path
                                
                                // must carry this id as sub-item's parent id
                                //node.id = flatJson_item.id;
                                // both works same
                                node.id = id_counter


                                console.log(' layer node, id, path has been set, before push ', node.id, node)
                                stack.push(node);
                            }// if



                
                        }// for 


                    }  // if services.length > 0
                }  // if services
                
                
                
                
                
                


                
                
                
                
                
                // if response have 'layers', means it is a xxx/MapServer,  not xxx/rest/service 
                // this is for if the url is a  xxx/MapServer, not the home root xxx/rest/service,  there is special case seattle,   
                if ( current.hasOwnProperty('layers')  && ( current.layers !== null ) && ( current.layers !== '' )) {

                    if ( current.layers.length > 0 ) {


                        console.log(' processing current.layers ', current.layers)

                        
                        var layer_flatjson_array = []

                        var current_layers = []
                        
                        // by default, only process layers
                        current_layers = current.layers

                        // if response have 'tables', means it is a mapserver, with table, just regard table as other layer
                        // test look for BaseMap/parcels_table  at https://gis.la-quinta.org/arcgis/rest/services
                        if ( current.hasOwnProperty('tables')  && ( current.tables !== null ) && ( current.tables !== '' )) {
                            if ( current.tables.length > 0 ) {
                                console.log(' processing current.tables ', current.tables)
                                current_layers = []
                                current_layers = current.layers.concat(current.tables);
                            } // if tables.length > 0
                        } // if tables





                        for (var j2 = 0; j2 < current_layers.length; j2++) {
                            

                            
                            // subLayerIds 
                            var subLayerIds_array = current_layers[j2].subLayerIds
                            var parentLayerId_relative_to_sublayerid = current_layers[j2].parentLayerId
                            // parentLayerId_relative_to_sublayerid = -1 means top layer or folder(group layer) relative to map server (service)
                        
                            var this_layer_parent_id 
                            if ((parentLayerId_relative_to_sublayerid == -1) 
                                || (parentLayerId_relative_to_sublayerid == undefined)
                                    || (parentLayerId_relative_to_sublayerid == null)) {

                                // by default, this layer parent id should be upper level map service id       
                                this_layer_parent_id = current.id

                            } else {

                                // if parent layer id has specific number 0, 1, 2...., means this is group layer folder. parent id, should be unique treeid(id counter generated) translate from parentLayerId_relative_to_sublayerid
                                //this_layer_parent_id =>>>>  translate (parentLayerId_relative_to_sublayerid)
                                var found_parent_layer = layer_flatjson_array.find((element) => element.layer_id == parentLayerId_relative_to_sublayerid);

                                if (found_parent_layer){
                                    if (found_parent_layer.hasOwnProperty('id')){
                                            this_layer_parent_id = found_parent_layer.id
                                    } 
                                    
                                } else {
                                    console.log(' warning,  found_parent_layer, not found !!!!!! this parent id not found ', parentLayerId_relative_to_sublayerid, layer_flatjson_array )
                                    this_layer_parent_id = current.id
                                }
                                
                            }

                                                    // --------- avoid undefined,null value, validate -----------------
                    
                                                            var this_layer_id 
                                                            if ((current_layers[j2].id !== undefined) && (current_layers[j2].id !== null) && (current_layers[j2].id !== "")) {
                                                                this_layer_id = current_layers[j2].id
                                                            } else {
                                                                this_layer_id = j2 // default layer item id should be 0,1,2.... in order, (if no layer id provided) 
                                                            }

                                    
                                                            var _current_layer_type 
                                                            if (current_layers[j2].type){
                                                                _current_layer_type = current_layers[j2].type
                                                            } else {
                                                                _current_layer_type =  ''; // 'unknown layer type'
                                                            }


                                                            var _current_layer_geometryType 
                                                            if (current_layers[j2].geometryType){
                                                                _current_layer_geometryType = current_layers[j2].geometryType
                                                            } else {
                                                                _current_layer_geometryType = ''; // 'unknown geometry type'
                                                            }


                                                            var _current_layer_name
                                                            if (current_layers[j2].name){
                                                                _current_layer_name = current_layers[j2].name
                                                            } else {
                                                                _current_layer_name = ''; // 'unknown layer name'
                                                            }

                                                    
                                                    var node_path = current_layers[j2]
                                                    var absolute_path_service_url = current.absolute_path
                                                    var _relative_path_service_url = current.relative_path 
                                                    var absolute_path_layer_url = current.absolute_path + '/' + this_layer_id
                                                    var _relative_path_layer_url = current.relative_path + '/' + this_layer_id
                                                    
                                                    
                                    
                                                    switch(_current_layer_type) {


                                                        case "Group Layer":
                                                            custom_icon = GroupLayer_icon
                                                            _current_layer_geometryType = 'folder'
                                                        break;

                                                        case "Feature Layer":
                                                        case "Annotation Layer":
                                                            //_layer_or_folder_icon = layer_icon
                                                            //custom_icon = AnnotationLayer_icon
                                                            switch(_current_layer_geometryType) {
                                                                case "esriGeometryPolygon":
                                                                        custom_icon = polygon_icon
                                                                        break;
                                                                case "esriGeometryPolyline":
                                                                        custom_icon = line_icon
                                                                        break;

                                                                case "esriGeometryMultipoint":        
                                                                case "esriGeometryPoint":
                                                                        custom_icon = point_icon
                                                                        break;
                                                                default:
                                                                            custom_icon = layer_icon
                                                            }//switch geometry type

                                                        break;

                                                    

                                                        
                                                            
                                                        


                                                        case "Raster Layer":
                                                            custom_icon = RasterLayer_icon
                                                        break;

                                                        case "Raster Catalog Layer":
                                                            custom_icon = RasterCatalogLayer_icon
                                                        break;

                                                        case "Mosaic Layer":
                                                            custom_icon = MosaicLayer_icon
                                                        break;


                                                        case "Table":
                                                            custom_icon = table_icon
                                                        break;



                                                        default:
                                                        custom_icon = unknow_layer_icon
                                                    }

                                                    var _node_display_text = this_layer_id + layerID_NAME_separator + _current_layer_name + '<sup>' + _current_layer_type + '<sub>' + ' ' +  _current_layer_geometryType + '</sub></sup>';
                                    

                                                // ********* add layer item *********
                                                
                                                            id_counter += 1;


                                                        

                                                            flatJson_item =  { 
                                                        
                                                                "id" :  id_counter, 
                                                                
                                                                "layer_id" : this_layer_id, 
                                                                "layer_parent_id":this_layer_parent_id,

                                                                "parent" : this_layer_parent_id,   
                                                                "text" :  _node_display_text,
                                                                "icon" : custom_icon,
                                                                    "state"       : {
                                                                                    "opened"    : true,  // is the node open
                                                                                    // disabled  : boolean  // is the node disabled
                                                                                    // "selected"  : true   // is the node selected
                                                                                },

                                                                "relative_path_parent_service": _relative_path_service_url,
                                                                "relative_path": _relative_path_layer_url,                
                                                                "node_path" : node_path, 
                                                                "absolute_path_parent_service" : absolute_path_service_url,
                                                                "absolute_path" : absolute_path_layer_url, 
                                                                "type" : _current_layer_type
                                                            };
                                                                    

                                                            console.log(' stack push layer item ', _node_display_text, flatJson_item)
                                                            

                                                                layer_flatjson_array.push(flatJson_item)

                                                                // add layer item
                                                                folder_structure_flatjson.push(flatJson_item) 


                                                // ********* end ********** add layer item *********



                        

                                





                            }// for

                        } // if layers.length > 0
                } // if layers
                
                
                
            
                




/**/
//  --- NAserver    --- 
/**/                                                                                       


if ( current.hasOwnProperty('routeLayers')  && ( current.routeLayers !== null ) && ( current.routeLayers !== '' )) {

if ( current.routeLayers.length > 0 ) {

console.log(' processing current.routeLayers ',current,  current.routeLayers)                
var layer_flatjson_array = []
var current_layers = []
// by default, only process layers
current_layers = current.routeLayers


// by default, this layer parent id should be upper level map service id       
var this_layer_parent_id = current.id
id_counter += 1;
var folder_as_parent_id = id_counter

flatJson_item = { 
"id" :  folder_as_parent_id,                                        
"parent" : this_layer_parent_id, 
"text" : "Route Layers", 
"icon" :  folder_icon,
"state"       : {
"opened"    : true,  // is the node open
// disabled  : boolean  // is the node disabled
// "selected"  : true   // is the node selected
},
"type" : "na-server-folder",

    
};
folder_structure_flatjson.push(flatJson_item) 



var NAserver_layers_name;
var encodedURL_NAserver_layers_name 
var _NAserver_layers_display_text


var NAserver_layers_absolute_path = current.absolute_path ;
var current_layer_server_path =   current.absolute_path;


console.log('NAserver_layers_absolute_path  ', NAserver_layers_absolute_path)
console.log('current_layer_server_path  ', current_layer_server_path)

for (var j2 = 0; j2 < current_layers.length; j2++) {  

id_counter += 1;
console.log('parent-id, self-id,  routeLayers  ', this_layer_parent_id,  id_counter, current_layers[j2])

_NAserver_layers_display_text = current_layers[j2]
NAserver_layers_name = current_layers[j2]
encodedURL_NAserver_layers_name = encodeURIComponent(NAserver_layers_name) 

flatJson_item = { 
"id" :  id_counter,                                      
"parent" : folder_as_parent_id,
"text" : _NAserver_layers_display_text,
"name" : NAserver_layers_name, 
"icon" :  layer_icon,
"state": {
"opened"    : true,  // is the node open
// disabled  : boolean  // is the node disabled
// "selected"  : true   // is the node selected
},

"absolute_path" : NAserver_layers_absolute_path + "/" + encodedURL_NAserver_layers_name,
"server_path" : current_layer_server_path,
"type" : "route-layer",
        
};
// add layer item
folder_structure_flatjson.push(flatJson_item)                                                   
}// for


} // if
} // if routeLayers


/**/
//  --- end  ---  NAserver    --- 
/**/                                                                                                            
                                





                            





            
                
                
                
            
                
                
    }// while
    



jstree_root_folder(folder_structure_flatjson, ___url_string,  _organization, ___hostname )


                            
} else if (root.name){

            // only for searlayer, searchMapServer, searchAll
            render_single_imageserver_root_folder(root, root_url)

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

            progressing_info('folder', _error_root, JSON.stringify(root));

        
            return false;
}       
                                            

                               
                                    
    /**/
    //   = = = = =   f=json  = = = = =  = = = = =
    /**/
    var _html_for_f_json = ''
    _html_for_f_json += "</br>"
    _html_for_f_json += '<a target="_blank" id="root_url_link2" href="'+  root_url + '?f=json" style="font-size:xx-small; font-weight: lighter;">'  
    _html_for_f_json += root_url + '?f=json' 
    _html_for_f_json += '</a>'
    
    $("#root-more-info").html(_html_for_f_json)         

    //$("#json-root").show();
    editor_json_root.set({json:root})

    
    /**/
    //   = = = = =    end   = = = = =   f=json  = = = = =  = = = = =
    /**/     





}

/**/
// -- -- --  end -- -- --  scan root server ( all layer from root for 2 panel ) -- -- -- 
/**/













                            // ######### 2nd level [center panel] #########  will use jstree --> j s t r e e_mapserver() [center panel] ######### 


/**/



                                            // when user click a folder, find all sub-item which use this _folder_item_id as their parent id, show sub-item (children item) at service panel (center)
                                            // will not use jstree, only display list collection
                                            function render_folder(_parent_id){


                                                console.log('render  folder  id is ', _parent_id )


                                              
                                            
                                                var list_array = ["<div class='list-group'>"];


                                                for (f = 0; f < folder_structure_flatjson.length; f++) {
                                                
                                                    // if (folder_structure_flatjson[f].parent == _parent_id.toString()) {
                                                    if (folder_structure_flatjson[f].parent == _parent_id) {


                                                                                

                                                                    // no need based on type, always use  onclick='selectFolderLevelItem(id)'
                                                                    // when user click list-collection any type item(group layer, feature layer, or table), always trigger select correspondent node on jstree, so no mather what type is.
                                                                    // just like (equal to) user manually click any jstree node, then follow downstream processing. 

                                                        

                                                                    if (folder_structure_flatjson[f].type == 'folder') {


                                                                            // folder 
                                                                                            
                                                                                        
                                                                                     // List group with transparent background  https://github.com/twbs/bootstrap/issues/29318
                                                                                            var _html_tag   = "<a href='javascript:;' onclick='selectFolderLevelItem(" + folder_structure_flatjson[f].id + ");'>";

                                                                                            _html_tag  +=       "<span class='" + folder_structure_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                                            _html_tag  +=       "  " +  folder_structure_flatjson[f].text

                                                                                            _html_tag  +=    "</a>"
                                                                                            _html_tag  +=    "</br>"

                                                                                            list_array.push(_html_tag);
                                                                                    


                                                                    } else {
                                                                            // service , mapserver, etc....
                                                                                            


                                                                                                var _html_tag   = "<a href='javascript:;' onclick='selectFolderLevelItem(" + folder_structure_flatjson[f].id + ");'>";

                                                                                                _html_tag  +=       "<span class='" + folder_structure_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                                                _html_tag  +=       "  " + folder_structure_flatjson[f].text 

                                                                                                _html_tag  +=    "</a>"
                                                                                                _html_tag  +=    "</br>"

                                                                                                list_array.push(_html_tag);
                                                                    }//if

                                                    }//if




                                                }// for 


                                                list_array.push("</div>")
                                                $("#inside_folder_item_list").html(list_array.join(""));
                                               


                                                if (list_array.length > 2) {
                                                            // not empty, nothing to do
                                                } else {
                                                            // empty, insert empty message
                                                            render_message_service_panel("Empty ( or maybe login to gis portal with password required)")
                                                }




                                                // at bottom of render folder function, because render folder do not use jstree. 
                                                // other render xxx use jstree, will place message_xxxx into there jstree_xxxx function
                                                // wrong
                                                //var parent_folder_itself = folder_structure_flatjson[_parent_id]

                                                // find the item, item.id = parent id
                                                var parent_folder_itself = folder_structure_flatjson.find(element => element.id == _parent_id);

                                                                                    


                                                var parent_folder_display_text = parent_folder_itself.relative_path
                                                var parent_folder_full_url = parent_folder_itself.absolute_path
                                                console.log("parent_folder_itself", parent_folder_itself)

                                                // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                                var _html_for_message_mapserver = '<a target="_blank" id="_mapserver_link" href="' + parent_folder_full_url + '?f=html">'  
                                                _html_for_message_mapserver    += parent_folder_display_text 
                                                _html_for_message_mapserver    += '</a>'

                                                _html_for_message_mapserver    += '<br>' 
                                                
                                                _html_for_message_mapserver    += '<a target="_blank" id="_mapserver_link2" href="' + parent_folder_full_url + '?f=html">' 
                                                _html_for_message_mapserver    +=    parent_folder_full_url 
                                                _html_for_message_mapserver    += '</a>'
                                               
                                                $('#message_mapserver').html( _html_for_message_mapserver);

                                                

                                            }



                                            // for 2 panel, do not show layers, only show mapserver meta data
                                            
                                            async function render_mapserver(_parent_id){



                                                            console.log('render mapserver  id : ', _parent_id )
                                                            console.log('render mapserver  node[id] : ', folder_structure_flatjson[_parent_id])

                                                           

                                                            // frome array[folder_structure_flatjson],  get item,  item.id = _parent_id
                                                            var folder_item = folder_structure_flatjson.find(element => element.id == _parent_id);
                                                            console.log('folder_item  node[id] : ', folder_item)

                                                            var _url_mapserver = folder_item.absolute_path
                                                            current_mapServerEndpoint_url = _url_mapserver
                                                            console.log( 'you click mapserver url >>>>>  ', _url_mapserver)

                                                                                                                    
                                                            // always before await ajax, show ajax url , instead of show progressing bar
                                                            progressing_info('folder', _parent_id, _url_mapserver);


                                                            raw_mapserver =await arcgis_ajax_cross_origin(_url_mapserver, _cross);  // cross origin method 
                                                                                
                                                            console.log( 'you click mapserver root response : ', raw_mapserver)

                                                            

                                                           //  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
                                                           //  VectorTileServer, scene server can't use ..../legend must exclude them

                                                           var _lowerCase_mapserverurl = _url_mapserver.toLowerCase();
                                                           if (_lowerCase_mapserverurl.includes('vectortile')){

                                                                        console.log( ' Do not do vector tile legend at  2nd tier , server level  ')
                                                           } else {

                                                                         var  _url_mapserver_legend = _url_mapserver + '/legend'
                                                                            mapserver_legend  =await arcgis_ajax_cross_origin(_url_mapserver_legend, _cross);  // cross origin method 
                                                                            console.log( ' ** mapserver ** legend **  ', mapserver_legend )
                                                           }


                                                             // --- --- -- calculate every mapserver center lat long --- ---- -- --

                                                                                          // only calculate center lat long once
                                                                                          // if in URL, no lat,long provided,  arcgis_common_share extract lat lng from URL is null, {_center_lat: null, _center_long: null}
                                                                                          console.log( 'before calculate mapserver center, center is from mysql rest api table, is :  ', _center)

                                                                                          if (( _center._center_lat == null ) ||  ( _center._center_long == null )
                                                                                              
                                                                                               || ( _center._center_lat == default_center_lat ) ||  ( _center._center_long == default_center_long )
                                                                                          ){         




                                                                                            /*
                                                                                                     _current_services_type is undefined,  error not fix, do not use, 

                                                                                                                if  (
                                                                                                                    ((_current_services_type == 'MapServer')||(_current_services_type == 'FeatureServer'))
                                                                                                            
                                                                                                                    // must not have'SampleWorldCities'
                                                                                                                    // must exclude --- SampleWorldCities ( MapServer ) it always give lat=13 long=-14    https://gismaps.kingcounty.gov/arcgis/rest/services/SampleWorldCities/MapServer
                                                                                                                    && (_relative_name.toLowerCase().indexOf("world") == -1)
                                                                                                                    
                                                                                                            
                                                                                                                ){

                                                                                            */







                                                                                                                        /*
                                                                                                                                              // server side projection: (Do not delete, keep)

                                                                                                                                                 // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                                                                                                 // _center = await calculate_center_lat_long(raw_mapserver);

                                                                                                                                                  // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                                                                                                  _center = await proj4js_centerLatLong(raw_mapserver);


                                                                                                                                                  
                                                                                                                                                  console.log(' server side prjection get center ====> ', _center)
                                                                                                                                                  update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                  update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                  if ( _center._center_zoom == null ) {
                                                                                                                                                    update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                  }


                                                                                                                        */                                                                                                                                          








                                                                                                                        /* not use, because it slow down the whole process


                                                                                                                                    // client-side re-projection, no ajax, no geometryServer 
                                                                                                                                               // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                                                                                               // await does not works,  we manually set it run how many times
                                                                                                                                     if (runClientProjectTimes < runClientProjectLimit) {

                                                                                                                                                runClientProjectTimes += 1;
                                                                                                                                                clientSide_project(raw_mapserver) 
                                                                                                                                      } 


                                    
                                                                                                                                      */










                                                                                                             //   }
                                                                                        
                                                                                        }


                                                             // --- ----- end -- --- --- --- calculate every mapserver center lat long -- --- ---- --

                                                             var mapserver_display_text = folder_item.text;

                                                             jstree_mapserver(_url_mapserver, mapserver_display_text)




                                            }






                                           



                                           


                                            




                            // #########  end   ###################   2nd  level [center panel] #########  will use jstree --> j s t r e e_mapserver() [center panel] ######### 





                                function render_vectortile_layer(_featurelayer_id){

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

                                        icon_flatjson = create_VectorTileServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)


                                     // when click vectorTileServer, do not show layer legend yet, should wait until click next layer level, show legend 

                                     show_legend_vectorStyle(_layer_absolute_path_url, _layer_name_)

                                }



                               
                               
                               
                                function render_scene_layer(_featurelayer_id){

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


                                    icon_flatjson = create_sceneServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)


                                }













                               // for 2 panel, same as render feature layer, but remove all 'map' section, only keep 'table' section
                               async function render_table(_featurelayer_id) {


                                    icon_flatjson = [];

                                    console.log('render feature layer by tree parent id : ', _featurelayer_id )
                                    console.log('render feature layer by tree node[id] : ', folder_structure_flatjson[_featurelayer_id])



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

                                  icon_flatjson = create_tableFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)


                                     // .......... table  more info   ..........
                                     /**/ 


                                             await get_layer_fields(_layer_absolute_path_url)

                                             // for 2 panel, do not hide mapserver related tag
                                             var mapserver_info_html  = await get_mapserver_info_html(_map_server_url_) // for more_info
                                             console.log('show feature layer, but still show mapserver_info_html', mapserver_info_html)
                                             $('#message_more_info_mapserver').html(mapserver_info_html);


                                          /**/ 
                                          // .......... end   ..........  table  more info   ..........   





                        }






                                            // for icon panel only,  no jstree,  only list collection, show "comming soon"
                                            function render_layer_other(_otherlayer_id){

                                                console.log('render other layer id : ', _otherlayer_id )
                                                //render_message_icon_panel("Coming Soon... ... ...")
                                                
                                            }






                                            function render_viewMapServerOn_layer(_mapserver_fullurl, _mapserver_fulltext){

                                                var multiType_flatjson = [];
            
            
                                                var _mapserver_or_featureserver = 'MapServer'
                                                if ((_mapserver_fullurl.includes('FeatureServer')) || (_mapserver_fullurl.includes('featureserver'))){
                                                    _mapserver_or_featureserver = 'FeatureServer'
                                                }
            
                                                console.log(' special render MapServer . . .(clicked MapServer node) ... ... _mapserver_fullurl, _mapserver_fulltext', _mapserver_fullurl, _mapserver_fulltext)
                                                multiType_flatjson = create_MapServerFlatjson(_mapserver_fullurl, -99999,  _mapserver_fulltext , _mapserver_or_featureserver, null) // node path is null
            
                                                jstree_icon(multiType_flatjson, _mapserver_fullurl, _mapserver_fulltext)
                                            }


                 


 // %%%%%%%%%%%%%  end  %%%%%%%%%%%%%%%%%%%  3rd level [right panel] #########  will use jstree --> j s t r e e_icon() [right panel] ######### 
/**/







                // ------------------------- end -----------------  render  ---- folder --> service --> layer ----------------------
                /**/




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
                                        $('#jstree_icon').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                        $('#jstree_icon').jstree(true).select_node(layerLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                        //$('#jstree_icon').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                    }

               //  ****************  end  ***************   user click/select folder level item *******  layer level item  ********************
                /* */



                     // +++++++++++ helper ++++++++++++++

                                function render_message_service_panel(_msg_){

                                    

                                    var list_array = ["<div class='list-group'>"];
                                   
                                    list_array.push("<label>" + _msg_ + "</label>")
                                    list_array.push("</div>")
                                    $("#inside_folder_item_list").html(list_array.join(""));

                                                

                                }

                                function render_message_icon_panel(_msg_){

                                   

                                    var list_array = ["<div class='list-group'>"];
                                   
                                    list_array.push("<label>" + _msg_ + "</label>")
                                    list_array.push("</div>")
                                    $("#icon_list").html(list_array.join(""));

                                                

                                }

                                function progressing_info(_which_panel, _signal, _info){


                                    console.log(_which_panel, ' ( '+ _signal + ' ) ' + _info)
                                                    
                                    switch(_which_panel) {

                                        case 'folder':
                                            $('#message_root_folder').text(' ('+ _signal + ')' + _info); 
                                          break;

                                        case 'layer':
                                            $('#message_mapserver').text(' ('+ _signal + ')' + _info); 
                                          break;

                                        case 'icon':
                                            $('#message_icon').text(' ('+ _signal + ')' + _info); 
                                            break;


                                        default:
                                          // code block
                                      }
                                                        
                                                    
                                    

                                }

                     // +++++++++++ end ++++++++++  helper ++++++++++++++
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


                     



                     // ~~~~~~~~~~~~ legend -- for vector style only --- ~~~~~~~~~~~~~~~~~



                                function getUniqueLayers(layerStyleArray){


                                    //  .... js array find unique values  .... 
                                            Array.prototype.unique = function() {
                                                let arr = [];
                                                for(let i = 0; i < this.length; i++) {
                                                    if(!arr.includes(this[i])) {
                                                        arr.push(this[i]);
                                                    }
                                                }
                                                return arr; 
                                            }
                                    //  ....  end   ....  js array find unique values  .... 
                                    
    
    
                                    console.log('layerStyleArray', layerStyleArray)
    
                                    var layerNameArray = []
                                    for(let j = 0; j < layerStyleArray.length; j++) {
                                    layerNameArray.push(layerStyleArray[j]['source-layer'])
                                    }
    
                                    const uniqueLayers = layerNameArray.unique()
                                    //console.log('uniqueLayers', uniqueLayers)
                                    return uniqueLayers
    
    
                                }
    
            
            
                                function vectorStyle_toLegent(_layer , vectorStyleJson, spriteJson, spritePNG, spriteJson2x,spritePNG2x){
            
            
                                    var _layersStyle
                                    var _legend_html
                                    var _uniqueLayers
            
            
            
                                    
                                        if (vectorStyleJson.layers){
            
                                                    _legend_html = '<fieldset>'
                                                    _legend_html +=  '<legend>'  + _layer +  '</legend>'
            
                                                    _layersStyle = vectorStyleJson.layers
            
                                                    _uniqueLayers = getUniqueLayers(_layersStyle);
                                                    console.log('_uniqueLayers', _uniqueLayers)
            
                                                    for (var u = 0; u < _uniqueLayers.length; u++) { 
                                                        
                                                            var sourceLayerName = _uniqueLayers[u]
                                                            _legend_html += '<span><strong>' + sourceLayerName + '</strong></span><br/>'
            
                                                            for (var l = 0; l < _layersStyle.length; l++) { 
                                                        
            
                                                                if (_layersStyle[l]['source-layer'] == sourceLayerName) {
            
                                                                        //  +++++++  symbology  +++++++  
            
            
                                                                                    // case (polygon)
                                                                                    var symbolType = _layersStyle[l].type
                                                                                    var layerID = _layersStyle[l].id 
            
                                                                                    switch(symbolType) {  
            
                                                                                    case "fill":
                                                                                        
                                                                                                    var fillcolor = _layersStyle[l].paint['fill-color']
                                                                                                    var filloutlinecolor = _layersStyle[l].paint['fill-outline-color']
            
                                                                                                    // span works
                                                                                                    //_legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="font-size: 1.5em; color:' + fillcolor + ';">' + '<i class="fas fa-square"></i></span>'
                                                                                                    // div works by prevent div break into next line by add "display: inline-block;"
                                                                                                    _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block;  font-size: 1.5em; color:' + fillcolor + ';">' + '<i class="fas fa-square"></i></div>'
                                                                                                    
                                                                                        break;
            
                                                                                    case "line":
                                                                                                                
                                                                                                    var linecolor = _layersStyle[l].paint['line-color']
                                                                                                    var linewidth = _layersStyle[l].paint['line-width']
            
                                                                                                    // span works
                                                                                                    //_legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="font-size: 2em; color:' + linecolor +  ';">' + '<i class="fas fa-minus"></i></span>'
                                                                                                    // div works by prevent div break into next line by add "display: inline-block;"
                                                                                                    _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block; font-size: 2em; color:' + linecolor +  ';">' + '<i class="fas fa-minus"></i></div>'
                                                                                                    
            
            
                                                                                        break;
            
            
            
                                                                                        case "symbol":
                                                                                                            
            
                                                                                                    /*
            
                                                                                                        // test sprite at http://www.spritecow.com
                                                                                                        // prevent div break into next line by add "display: inline-block;"
            
                                                                                                                <div id='sprite_test' style="background: url(https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/resources/sprites/sprite.png) no-repeat -91px -49px; width:76px;height:48px; display: inline-block;" >
                                                                                                                </div>
                                                                                                    
                                                                                                                <div id='sprite_test' style="background: url(https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Childrens_Map/VectorTileServer/resources/sprites/sprite.png) no-repeat -66px 0px; width:136px;height:136px; display: inline-block;" >
                                                                                                                </div>
            
                                                                                                    */
            
            
            
            
            
            
                                                                                                    // place holder, later will fill the real sprite image
                                                                                                    // _legend_html +=  '&nbsp;&nbsp;&nbsp; <span style="width:10px;height:10px" id="'   + layerID + '"></span>'
            
                                                                                                    var spritePosition = spriteJson[layerID]
            
            
                                                                                                    
            
            
            
            
                                                                                                    console.log('spritePosition',  layerID,  spritePosition)
            
            
                                                                                                    // warn: spritePosition undefined
                                                                                                    if (spritePosition) {
            
            
                                                                                                    var spanStyle = 'background: url(' + spritePNG + ') no-repeat -'+ spritePosition.x + 'px -' + spritePosition.y + 'px;   width:' + spritePosition.width + 'px;height:' + spritePosition.height + 'px; display: inline-block;'
                
                                                                                                    // must use div (span, label not work)
                                                                                                    _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="' +  spanStyle + '" id="'   + layerID + '"></div>'
            
            
            
                                                                                                    }
                                                                                                    
            
                                                                                                    
                                                                                        break;
            
            
            
            
            
            
                                                                                        case "circle":
            
                                                                                                    // https://pro.arcgis.com/en/pro-app/help/mapping/map-authoring/symbology-in-vector-tiles.htm
            
                                                                                                        /*
                                                                                                            "layers": [{
            
                                                                                                            "id": "xxxxxx", 
            
                                                                                                            "type":  "circle", 
            
                                                                                                            "source": "",
                                                                                                            "source-layer": "",
                                                                                                            "layout": {},
                        
                                                                                                                "paint" : {
            
                                                                                                                            "circle-color" : "#000fff",
            
                                                                                                                            'circle-opacity': 1,
            
                                                                                                                            "circle-radius" : {
                                                                                                                                                "property" : "size",
                                                                                                                                                "default" : 6.2,
                                                                                                                                                "stops" : [[2, 2.2], [26, 29.5333]]
                                                                                                                                                }
            
            
                                                                                                                        }
            
                                                                                                            }]        
            
                                                                                                        */
            
            
            
                                                                                                    var circlecolor = _layersStyle[l].paint['circle-color']
                                                                                                    
                                                                                                    // 'far' is circle-hole, 'fas' is solid circle 
                                                                                                    _legend_html +=  '&nbsp;&nbsp;&nbsp; <div style="display: inline-block;  font-size: 1.5em; color:' + circlecolor + ';">' + '<i class="fas fa-circle"></i></div>'
                                                                                                    
            
            
                                                                                        break;
            
            
            
            
            
            
            
                                                                                    default:
                                                                                        // code block
                                                                                    }
            
            
            
            
                                                                            //  +++++++   end    +++++++  symbol  +++++++  
                                                                        
                                                                            
                                                                            
            
                                                                            //    ------  text   ------  
            
                                                                                    /*
                                                                                        {
                                                                                                id: "Block Group/0 - 28 years of age",
                                                                                                type: "fill",
                                                                                                source: "esri",
                                                                                                source-layer: "Block Group",
                                                                                                filter: [
                                                                                                "==",
                                                                                                "_symbol",
                                                                                                2
                                                                                                ],
                                                                                                minzoom: 11.85,
                                                                                                layout: { },
                                                                                                paint: {
                                                                                                fill-color: "#00729A",
                                                                                                fill-outline-color: "#D6D6D6"
                                                                                                }
                                                                                        },
                                                                                    */
            
            
                                                                                    var _id = _layersStyle[l].id
                                                                                    var _source_layer = _layersStyle[l]['source-layer']
                                                                                    var _id_without_topGroup = _id.replace(_source_layer,'');
                                                                                    var displaylayerName = _id_without_topGroup

                                                                                    var _id_array = _id.split('/')
                                                                                    var _id_array_length = _id_array.length;


                                                                                    // we use 'sub-group/sub-sub-group/layer' as layer name, _id_array remove the first element(top-level-group)

                                                                                    // span works
                                                                                    //_legend_html += '&nbsp;&nbsp;<span>' + _id_array[_id_array_length - 1] + '</span> <br/>'
                                                                                    // div works by prevent div break into next line by add "display: inline-block;"

                                                                                    if (_id_without_topGroup.length > 0) {
                                                                                            
                                                                                            if (_id_without_topGroup.charAt(0) == '/') {
                                                                                                displaylayerName =  _id_without_topGroup.slice(1)
                                                                                            }
                                                                                            
                                                                                    } else {


                                                                                        // _id_without_topGroup is empty, means id is identical to source layer
                                                                                        displaylayerName = _source_layer 
                                                                                    
                                                                                    }   




                                                                                    _legend_html += '&nbsp;&nbsp;<div style="display: inline-block;">' + displaylayerName + '</div> <br/>'

            
                                                                            //    ------  end    ------ text   ------  
            
            
                                                                
                                                                } // if
                                                                                                    
            
                                                            }// for  l  
            
                                                            _legend_html += '<br/>'
                                                            // break;
            
                                                    }// for  u     
            
                                                    _legend_html += '</fieldset>'
            
                                                    // console.log(' legend html ', _legend_html)
            
                                                    // set html to legend_div
                                                    document.getElementById('layer_legend').innerHTML = _legend_html
            
                                        }//if
            
            
            
            
                                }
                    
        
        
        
        
                
                                async function get_vectorTileStyle(_vectorTileServer_url, _vectorTileLayerName){
        
                                            // https://developers.arcgis.com/rest/services-reference/vector-tile-style.htm
                                            // var _vectorStyle_url = _vectorTileServer_url + '/resources/styles'
        
                                            // also works the same way
                                            var _vectorStyle_url = _vectorTileServer_url + '/resources/styles/root.json'
        
        
                                            var _vectorStyle_resourceInfo_url = _vectorTileServer_url + '/resources/info'
                                            var _sprite_json_url = _vectorTileServer_url + '/resources/sprites/sprite.json'
                                            var _sprite_json2x_url = _vectorTileServer_url + '/resources/sprites/sprite@2x.json'
                                            var _sprite_png_url = _vectorTileServer_url + '/resources/sprites/sprite.png'
                                            var _sprite_png2x_url = _vectorTileServer_url + '/resources/sprites/sprite@2x.png'
        
                                            
        
        
                                            console.log(' vectorStyle url :  ',  _vectorStyle_url )
                                            console.log(' vectorStyle resourceInfo url :  ',  _vectorStyle_resourceInfo_url)
                                            console.log(' sprite json url :  ',  _sprite_json_url )
                                            console.log('  sprite png url :  ',  _sprite_png_url )
                                            console.log(' sprite json 2x url :  ',  _sprite_json2x_url )
                                            console.log('  sprite png 2x url :  ',  _sprite_png2x_url )
                            
                                            var _vectorStyle_json =  await $.ajax({
                            
                                                                // large data take long long time , so should not time out, let it run until get it
                                                                // timeout: _timeout,
                                                                
                                                                type: 'GET',
                                                                dataType: 'jsonp',
                                                                data: {},
                                                                url: _vectorStyle_url,
        
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                    
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                                        // browsing_message(_error_status) 
                                                                },
        
        
                                                                success: function (data) {
                                                                            
                                                                            // note: data is already json type, you just specify dataType: jsonp
                                                                            // return data;
                                                
                                                                } // success
        
        
                                            });  // ajax
        
                        
        
        
        
                                            var _sprite_json = await  $.ajax({
                                                // large data take long long time , so should not time out, let it run until get it
                                                                // timeout: _timeout,
                                                                
                                                                type: 'GET',
                                                                dataType: 'jsonp',
                                                                data: {},
                                                                url: _sprite_json_url,
        
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                    
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                                        // browsing_message(_error_status) 
                                                                },
        
        
                                                                success: function (data) {
                                                                            
                                                                            // note: data is already json type, you just specify dataType: jsonp
                                                                            //return data;
                                                
                                                                } // success
        
        
                                            });  // ajax
        
        
        
        
                                           // _vectorStyle_json = JSON.parse( _vectorStyle_json)
                                           // _sprite_json = JSON.parse( _sprite_json)

                                            console.log('vector style json', _vectorStyle_json)
        
                                            console.log('sprite json', _sprite_json)
        
        
        
                                            vectorStyle_toLegent(_vectorTileLayerName, _vectorStyle_json, _sprite_json, _sprite_png_url, _sprite_json2x_url, _sprite_png2x_url)
                                                
                                                            
        
        
        
                                }
        
        
        
  

                                function show_legend_vectorStyle(vectorTileServer___url, vectorTileLayerName){

                                    // vectorTileServer___url is .../.../VectorTileServer
                                    console.log(' show legend vector style url ', vectorTileServer___url)
                                    get_vectorTileStyle(vectorTileServer___url, vectorTileLayerName)

                                }


                 // ~~~~~~~~~~~~ legend -- for vector style only --- ~~~~~~~~~~~~~~~~~









(async function($){

   
    // must be await, to get ___url_string
    await init_global_var();
    
        
    /**/
    // ------- let's go to your REST api  -------
    /**/
            init_top_bar()
    /**/
    // --- end --- let's go to your REST api -------
    /**/
      
    // first time run 
    if (___url_string){
                          scan_folder_structure()
    }


     //all init button, click event, including collapse expand button
     ui_event_register() 


    // can't be here, must await until first time load completed
    //pre_select_folder_level()



})(jQuery);












