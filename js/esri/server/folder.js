

// this is simple version, server/folder.html, collapse all by default 
var iconJstreeNodeOpened =  false; // true is expanded all,  false is collapse all 
var iconJstreeforceOpen = true;






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





        





                            // ======== jstree =============


/* */

                                    // top level [left panel]  ----- folder ------   
                                        function jstree_root_folder(root_allfolders_flatjson, root_url, root_url_organization, root_url_hostname){

                                            var _html_org = ""
                                            // arcgis version number
                                            var _html_version = '<span style="font-size:small;">ArcGIS Enterprise Version </span>'
                                            _html_version += '<span style="font-size:small; font-weight: bolder;">' + currentVersion + '</span>'
                                            _html_org += '<a target="_blank" id="_orgnization_link" href="'+ root_url + '">' + _html_version +  '</a>'
                                            // org name, not use, but keep here for future use 
                                            //_html_org += '<a target="_blank" id="_orgnization_link" href="'+ root_url + '">' + root_url_organization +  '</a>'
                                            // domain, not use, but keep here for future use 
                                            //_html_org += '<a target="_blank" id="_orgnization_link2" href="'+ root_url +'">' + root_url_hostname    + '</a>' 

                                            
                                            $('#message_root_folder').html(_html_org);
                                            


                                            console.log(" jstree all folder  flat json feed : ", root_allfolders_flatjson)



                                            
$('#jstree_root_folder')
                                                                
            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
            // these 2 line, they will NOT fire event, if you click a already selected node, it only fire event if selected node changed.
            //.on('select_node.jstree', function (e, data) {
            .on('changed.jstree', function (e, data) {

                
            // Warning: if you want to always fire event, even on a already selected node, use this line, 
            // the down stream code also need change, otherwise will not works
            //.on('activate_node.jstree', function (e, data) {








                                                                    console.log(' click select folder node, event ', data)
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



                                                                    if (selected_node_type){
                                                                        
                                                                    }else{
                                                                        //   type: undefined, for v10.5 and before, type is undefined, but it is a featuerServer
                                                                        // _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"
                                                                        if ((selected_node_path.includes('FeatureServer')) || ( selected_node_path.includes('MapServer'))){ 
                                                                            selected_node_type = 'FeatureServer'                                                                               
                                                                                console.log('warning:  .type is undefined, but url is feature server ')
                                                                        }
                                                                    }


                                                                    update_url_parameter('select_folder', selected_node_id);
                                                                    update_url_parameter('select_folder_text', selected_node_text);
                                                                    update_url_parameter('select_layer', '');


                                                                    

                                                                    
                                                            


                                                                    //  - -- - only for mobile  - -- -

                                                                    // only for 3 panel
                                                                    if (selected_node_type == "folder"){

                                                                             console.log('disable render folder, because it too complicated')

                                                                    } else {

                                                                            // user click one item in root folder
                                                                            $("#back-3-panel").show();
                                                                            $("#root-folder-div").hide();
                                                                            $("#map-server-div").show();
                                                                            $("#app-div").hide();
                                                                            $("#map-window-iframe").hide();

                                                                          }

                                                                    //  - -- - end  - -- -   only for mobile  - -- -








                                                                    empty_service_and_icon_panel_all_tag()



                                                                    switch(selected_node_type) {


                                                                        case "folder":
                                                                                        console.log('disable render folder, because it too complicated', _selected_id[0])

                                                                                    // disable render folder, because it too complicated
                                                                                       // render_folder(_selected_id[0])
                                                                            break;


                                                                        case "MapServer":
                                                                        case "FeatureServer":
                                                                                    render_mapserver(_selected_id[0])
                                                                        break;




                                                                        case "VectorTileServer":
                                                                                render_singleserver(_selected_id[0])
                                                                               
                                                                    
                                                                        break;




                                                                        case "ImageServer":
                                                                            render_singleserver(_selected_id[0])
                                                                            
                                                                        break;


                                                                        case "SceneServer":
                                                                            render_singleserver(_selected_id[0])
                                                                        break;







                                                                        case "GeocodeServer":
                                                                                
                                                                                render_singleserver(_selected_id[0])
                                                                        break;




                                                                        case "NAServer":
                                                                                
                                                                                render_NAserver(_selected_id[0])
                                                                                
                                                                        break;

                                                                    
                                                                        default:
                                                                                        render_other(_selected_id[0])
                                                                                        
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







                    // -------------------------  render  ---- folder --> service --> layer ----------------------


/**/



                                // ........... top level [left panel]  ........ will use jstree --> jstree() [left panel] ...............

                                    // first time load(one time run), prepare top level folder (flat json array) --> feed to --> jstree() [left panel]
                                async function scan_root_folder(){

                                    current_rootEndpoint_url = ___url_string


                                    folder_structure_flatjson = []

                                    // root
                                    var id_counter = 0;
                                    var current_parent_id_counter;

                                    // root item + folder item + service item(mapserver, geocodeserver, etc......)
                                    var flatJson_item; 

                                
                                    var custom_icon, service_name_and_type;
                                
                                            
                                    var _flat = [];     // ... accumulated... mapserver only or feature server only
                                    var _just_get = []  // not accumulat, only the current transaction get
                                    

                                    console.log( 'scan folder structure rest api root url >>>>>  ', ___url_string)
                                    

                                    var root_url = ___url_string






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
                                                                        // "id" : id_counter.toString(), 
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
                                                                                                var  node_path = current_folders[j2]                
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

            if (node !== null)
            {
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
                                                                                        var _current_services_type = current_services[i1].type 
                                                        console.log('_current_services_type', _current_services_type)                                                                                  // 'GPServer'
                                                                                    //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
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
                                                                                                                custom_icon = GroupLayer_icon
                                                                                                            }
                                                                                                            
                                                                                                            
                                                                                                            service_name_and_type = _relative_name + ' ' + '<sup>' + _current_services_type + '</sup>';

                                                                                                            flatJson_item =  { 
                                                                                                            // "id" : id_counter.toString(), 
                                                                                                                "id" : id_counter, 
                                                                                                            // "parent" : current_parent_id_counter.toString(),   // root parent id is #
                                                                                                                "parent" : current_parent_id_counter,   // root parent id is #
                                                                                                                "text" :  service_name_and_type,
                                                                                                                "icon" : custom_icon,
                                                                                                                    "state"       : {
                                                                                                                                    // "opened"    : true,  // is the node open
                                                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                                                    // "selected"  : true   // is the node selected
                                                                                                                                },

                                                                                                                "relative_path": _relative_name,                
                                                                                                                "node_path" : node_path, 
                                                                                                                "absolute_path" : absolute_path_service_url, 
                                                                                                                "type" : _current_services_type
                                                                                                            };
                                                                                                                    
                                                                                                            
                                                                                                                // add folder item
                                                                                                                folder_structure_flatjson.push(flatJson_item) 


                                                                                                // ********* end ********** add service item *********
                                                                                


                                                                                    
                                                                                            }// for 


                                                                                        }  // if services.length > 0
                                                                                    }  // if services
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    // if response have 'layers', means it is a xxx/MapServer or xxx/FeatureServer,  not xxx/rest/service 
                                                                                    // this is for if the url is a  xxx/MapServer, not the home root xxx/rest/service,  there is special case seattle, 
                    // or user input a featureServer url in root textarea then click start button   
                                                                                    if ( current.hasOwnProperty('layers')  && ( current.layers !== null ) && ( current.layers !== '' )) {

                                                                                        if ( current.layers.length > 0 ) {

                                                                                       

                                                                                        // add 1 item as 'service' mapserver 



                                                                                        /*

                                                                                            sample : current response :   (https://gisrevprxy.seattle.gov/arcgis/rest/services/ext/WM_CityGISLayers/MapServer?f=json)

                                                                                        
                                                                                                layers: [...]
                                                                                                documentInfo: {
                                                                                                        Title: "WM_CityGISLayers",
                                                                                                        Author: "",
                                                                                                        Comments: "WM_CityGISLayers",
                                                                                                        Subject: "WM_CityGISLayers",
                                                                                                        Category: "",
                                                                                                        AntialiasingMode: "None",
                                                                                                        TextAntialiasingMode: "Force",
                                                                                                        Keywords: ""
                                                                                                        },
                                                                                        
                                                                                        */ 

                                                                                    
                                                                                    
                                                                                                
                                                                                                //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                                                                                                // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                                                                                                // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                                                                                                // Portland/Aerial (ImageServer)
                                                                                                    
                                                                                                var node_path = root_url  //      'https://gisrevprxy.seattle.gov/arcgis/rest/services/ext/WM_CityGISLayers/MapServer'
                                                                                                var  node_path_array = node_path.split('/');
                                                                                                var  _relative_name = node_path_array[node_path_array.length-2]; //  only need 'WM_CityGISLayers'
                                                                                                var _current_services_type = node_path_array[node_path_array.length-1]; // "FeatureServer" or "MapServer"                                                                            
                                                                                                //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                                                                                            
                                                                                            
                                                                                    
                                                                                                /* not use, because it slow down 
                                                                                    
                                                                                                        
                                                                                                        // ---- only ajax once last map server to calculate center lat long -----
                                                                                                        
                                                                                                        
                                                                                                                    // only can use   .../MapServer or  .../FeatureServer to get _center lat long
                                                                                                                    // use first   .../MapServer or  .../FeatureServer have NO accurate, 
                                                                                                                    // instead, we use last one, or any one in middle is more accurate. 


                                                                                                                    
                                                                                                                    
                                                                                                                    if (( _center._center_lat == null ) ||  ( _center._center_long == null )
                                                                                              
                                                                                                                           || ( _center._center_lat == default_center_lat ) ||  ( _center._center_long == default_center_long )
                                                                                                         
                                                                                                                      ){  
                                                                                                                    






                                                                                                                                        var getLatLong_url = root_url


                                                                                                                                         // always before await ajax, show ajax url , instead of show progressing bar 
                                                                                                                                         progressing_info('folder', 'getting Lat Long', getLatLong_url);
                                                                                                                                    


                                                                                                                                        //var getLatLong_response =await ajax_getjson(getLatLong_url);
                                                                                                                                        var getLatLong_response =await arcgis_ajax_cross_origin(getLatLong_url, _cross);  // cross origin method 


                                                                                                                                        console.log('getLatLong_response.....>',getLatLong_url)
                                                                                                                                        console.log('getLatLong_response......>',getLatLong_response)



                                                                                                                                        if (getLatLong_response !== null){


                                                                                                                                     


                                                                                                                        / *
                                                                                                                                              // server side projection: (Do not delete, keep)

                                                                                                                                                 // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                                                                                                 // _center = await calculate_center_lat_long(getLatLong_response);

                                                                                                                                                  // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                                                                                                  _center = await proj4js_centerLatLong(getLatLong_response);


                                                                                                                                                  
                                                                                                                                                  console.log(' server side prjection get center ====> ', _center)
                                                                                                                                                  update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                  update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                  if ( _center._center_zoom == null ) {
                                                                                                                                                    update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                  }


                                                                                                                        * /                                                                                                                                          











                                                                                                                        / * not use, because it slow down the whole process

                                                                                                                                                    // client-side re-projection, no ajax, no geometryServer 
                                                                                                                                                            // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                                                                                                            // await does not works,  we manually set it run how many times
                                                                                                                                                    if (runClientProjectTimes < runClientProjectLimit) {

                                                                                                                                                                runClientProjectTimes += 1;
                                                                                                                                                                clientSide_project(getLatLong_response)  
                                                                                                                                                    } 

                                                                                                                          * /


                                                    







                                                                                                                                        }//if


                                                                                                                        }// if 
                                                                                                            
                                                                                                        // ----  ------- end ------------- only ajax once last map server to calculate center lat long -----
                                                                                                        
                                                                                                          
                                                                                                        
                                                                                            not use, because it slow down 
                                                                                            
                                                                                            */
                                                                                                        
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                                                                                    
                                                                                    
                                                                                    // dynamic CMV

                                                            //http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                                                            //http://ms.transparentgov.net/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                                                                                    
                                                            
                                                                                        
                                                                                        var absolute_path_service_url = root_url
                                                                                        
                                                                                        
                                                                                        var _relative_path = root_url;
                                                                                    
                                                                                        var _mapServer = {"name": _relative_name,  "type": _current_services_type, "absolute_url":absolute_path_service_url, "relative_path":_relative_path, "center_lat":_center._center_lat, "center_long":_center._center_long };


                                                                                        console.log('flat push a  _mapServer ', _mapServer)

                                                                                        _just_get = []
                                                                                        _just_get.push(_mapServer); 
                                                                                        _flat = _just_get.concat(_flat);




                                                                                                // ********* add service item *********

                                                                                                            id_counter += 1;

                                                                                                            //console.log('_current_services_type', _current_services_type)

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
                                                                                                                custom_icon = GroupLayer_icon
                                                                                                            }

                                                                                                            service_name_and_type = _relative_name + ' ' + '<sup>' + _current_services_type + '</sup>';

                                                                                                            flatJson_item =  { 
                                                                                                         
                                                                                                                "id" : 1, 
                                                                                                          
                                                                                                                "parent" : 0,   // root parent id is #
                                                                                                                "text" :  service_name_and_type,
                                                                                                                "icon" : custom_icon,
                                                                                                                    "state"       : {
                                                                                                                                    // "opened"    : true,  // is the node open
                                                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                                                    // "selected"  : true   // is the node selected
                                                                                                                                },

                                                                                                                "relative_path": _relative_name,                
                                                                                                                "node_path" : node_path, 
                                                                                                                "absolute_path" : absolute_path_service_url, 
                                                                                                                "type" : _current_services_type
                                                                                                            };
                                                                                                                    
                                                                                                            
                                                                                                                // add folder item
                                                                                                                folder_structure_flatjson.push(flatJson_item) 


                                                                                                // ********* end ********** add service item *********
                                                                                



                                                                                            } // if layers.length > 0
                                                                                    } // if layers
                                                                                    
                                                                                    
                                                                                    
                                                                                
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                
                                                                                    
                                                                                    
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

    // json for root, never hide, so never need show up. But json for map server, for icon (app), often hidden, must run show up  
    //$("#json-root").show();
    // knowing issue, editor not yet load completed, then server.html try to set json on it, cause error. 
    // not fix, how to await json editor load completed, then run other code?
    if (editor_json_root){
        editor_json_root.set({json:root})
    }

    
    /**/
    //   = = = = =    end   = = = = =   f=json  = = = = =  = = = = =
    /**/     



                                    }

                                // ........... end .......... top level [left panel]  ........ will use jstree --> jstree() [left panel] ...............





/**/









                            // ######### 2nd level [center panel] #########  will use jstree --> j s t r e e _mapserver() [center panel] ######### 


/**/



//  will use jstree  -->  j s t r e e _mapserver() [middle panel]   
//  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
async function render_mapserver(_parent_id){

        mapserver_flatjson = []
        console.log('render 2ndTier-mapserver  id : ', _parent_id )
        console.log('render 2ndTier-mapserver  node[id] : ', folder_structure_flatjson[_parent_id])

        // frome array[folder_structure_flatjson],  get item,  item.id = _parent_id
        var folder_item = folder_structure_flatjson.find(element => element.id == _parent_id);
        console.log('folder_item  node[id] : ', folder_item)

        current_singleServerEndpoint_url = folder_item.absolute_path
        console.log( 'render 2ndTier-mapserver url >>>>>  ', current_singleServerEndpoint_url)
        
        // always before await ajax, show ajax url , instead of show progressing bar
        progressing_info('layer', '(MapServer)', current_singleServerEndpoint_url);

        raw_mapserver =await arcgis_ajax_cross_origin(current_singleServerEndpoint_url, _cross);  // cross origin method 
        console.log( 'render 2ndTier-mapserver root response  ', raw_mapserver)

                

        //  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
        //  VectorTileServer, scene server can't use ..../legend must exclude them
        var _lowerCase_mapserverurl = current_singleServerEndpoint_url.toLowerCase();
        if (_lowerCase_mapserverurl.includes('vectortile')){
                    console.log( ' Do not do vector tile legend at  2nd tier , server level  ')
        } else {
                        var  current_singleServerEndpoint_url_legend = current_singleServerEndpoint_url + '/legend'
                        mapserver_legend  =await arcgis_ajax_cross_origin(current_singleServerEndpoint_url_legend, _cross);  // cross origin method 
                        console.log( ' ** mapserver ** legend **  ', mapserver_legend )
        }




        var mapserver_display_text = folder_item.text;
        var mapserver_icon = folder_item.icon;
        //  ....... add mapserver root item  ....... 
        var layer_item = { 

            "id" :  -1,     // -1 defined by arcgis rest api, they define top level item's parent id is -1, we must follow this rule
            
            "parent" : "#",
            "text" : mapserver_display_text,
            "icon" : mapserver_icon,
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },

            "relative_path": folder_item.relative_path,
            "node_path" : folder_item.node_path, 
            "absolute_path" : folder_item.absolute_path,
            "layer_id" :  -1,            
            "type" : folder_item.type
        };
        // 1 time, first time run, add root item
        mapserver_flatjson.push(layer_item) 
        //  ....... add mapserver root item  ....... 




            // must define default first layer id is 0 here, otherwise, first layer id will be undefined.
            var mapserver_layers_id = 0

            var mapserver_layers_parentLayerId, 
                mapserver_layers_name, 
                mapserver_layers_geometryType, 
                mapserver_layers_type;


            var _layer_or_folder_icon = layer_icon;
            var _mapserver_layers_display_text;


            // mapserver raw response,  processing, { layers: [ ....... ] }
            if (raw_mapserver.layers) {
                if ( raw_mapserver.layers.length > 0 ) {

                    var mapserver_layers = raw_mapserver.layers
                    for (var l = 0; l < mapserver_layers.length; l++) { 
                                
                                // --------- avoid undefined,null value, validate -----------------
                                            
                            if ((mapserver_layers[l].id !== undefined) && (mapserver_layers[l].id !== null) && (mapserver_layers[l].id !== "")) {
                                mapserver_layers_id = mapserver_layers[l].id

                            } else {
                                mapserver_layers_id = l  // default layer item id should be 0,1,2.... in order, (if no layer id provided) 
                            }

                            var mapserver_layers_node_path = folder_item.node_path + '/'+ mapserver_layers_id;
                            var mapserver_layers_absolute_path = folder_item.absolute_path + '/'+ mapserver_layers_id;
                            var current_layer_server_path =   folder_item.absolute_path;

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


                            "node_path" : mapserver_layers_node_path, 
                            "relative_path" : mapserver_layers_name, // only for layer name (without type)
                            "absolute_path" : mapserver_layers_absolute_path, 
                            "server_path" : current_layer_server_path,
                            "geometryType" :  mapserver_layers_geometryType,               
                            "type" : mapserver_layers_type
                        };


                        mapserver_flatjson.push(layer_item) 
                
                    } // for

                } // if layers.length > 0
            } // if layers



        // feature table 
        var mapserver_tables_id, 
            mapserver_tables_name, 
            mapserver_tables_type;


        // {tables:[ item, item]}  because table items are flat, no structure, not like layers item( layers item is tree structure, have parent folder, children)
        // table item icon default to table_icon, not possible to be folder icon(group layer icon) 
        _layer_or_folder_icon = table_icon;

        var _mapserver_tables_display_text;


        var table_root_folder_id = -2;

        // mapserver raw response,  processing, { tables: [ ....... ] }
        if (raw_mapserver.tables)  {

            if ( raw_mapserver.tables.length > 0 )  {


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

                    "relative_path": folder_item.relative_path,
                    "node_path" : folder_item.node_path, 
                    "absolute_path" : folder_item.absolute_path,
                    "layer_id" :  table_root_folder_id,            
                    "type" : "Group Layer"
                };
                // 1 time, first time run, add root item
                mapserver_flatjson.push(layer_item) 

            
                //  ....... add mapserver root item  ....... 



                var mapserver_tables = raw_mapserver.tables


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





                    var mapserver_tables_node_path = folder_item.node_path + '/'+ mapserver_tables_id;
                    var mapserver_tables_absolute_path = folder_item.absolute_path + '/'+ mapserver_tables_id;
                    var current_tables_server_path =   folder_item.absolute_path;

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


                        "node_path" : mapserver_tables_node_path, 
                        "absolute_path" : mapserver_tables_absolute_path, 
                        "server_path" : current_tables_server_path,

                        "type" : mapserver_tables_type
                    };


                    mapserver_flatjson.push(layer_item) 
                











                
                } // for



            } // if table length > 0
        } // if table
        
        
        if (mapserver_flatjson.length > 1 ){
                    // flatjson include both layers:[] and tables:[],  tables all attached to table group folder
                    jstree_mapserver(mapserver_flatjson, current_singleServerEndpoint_url, mapserver_display_text)
        }else {
            //only have 1 root item, means, no layers:[],  no table:[] , or both are empty, show error,   mapserver url 
            console.log("mapserver url error ...>> ",JSON.stringify(raw_mapserver) )

            // show error message, if empty, will show error message too
            render_message_service_panel("No layers/tables found or error, check console.log for details ")
            //render_message_service_panel(JSON.stringify(raw_mapserver))
        }





}



                                            var raw_NAserver
                                            var NAserver_flatjson = []
                                            async function render_NAserver(_parent_id){

                                                        NAserver_flatjson = []
                                                        console.log('render 2ndTier-NAserver  id : ', _parent_id )
                                                        console.log('render 2ndTier-NAserver  node[id] : ', folder_structure_flatjson[_parent_id])

                                                         // frome array[folder_structure_flatjson],  get item,  item.id = _parent_id
                                                        var folder_item = folder_structure_flatjson.find(element => element.id == _parent_id);
                                                        console.log('folder_item  node[id] : ', folder_item)

                                                        var _url_NAserver = folder_item.absolute_path
                                                        current_NAServerEndpoint_url = _url_NAserver
                                                        console.log( 'render 2ndTier-NAserver url >>>>>  ', _url_NAserver)
   
                                                        // always before await ajax, show ajax url , instead of show progressing bar 
                                                       // progressing_info('folder', '(NAServer)', _url_NAserver);
                                                        
                                                        raw_NAserver = await arcgis_ajax_cross_origin(_url_NAserver, _cross);  // cross origin method 
                                                        console.log( 'render 2ndTier-NAserver root response  ', raw_NAserver)




                                                        //  ....... add mapserver root item  ....... 
                                                                var layer_item = { 

                                                                    "id" :  -1,     // -1 defined by arcgis rest api, they define top level item's parent id is -1, we must follow this rule
                                                                    
                                                                    "parent" : "#",
                                                                    "text" : folder_item.text,
                                                                    "icon" : folder_item.icon,
                                                                    "state"       : {
                                                                                        "opened"    : true,  // is the node open
                                                                                        // disabled  : boolean  // is the node disabled
                                                                                        // "selected"  : true   // is the node selected
                                                                                    },

                                                                    "relative_path": folder_item.relative_path,
                                                                    "node_path" : folder_item.node_path, 
                                                                    "absolute_path" : folder_item.absolute_path,
                                                                    "layer_id" :  -1,            
                                                                    "type" : "na-server-folder"
                                                                };
                                                                // 1 time, first time run, add root item
                                                                NAserver_flatjson.push(layer_item) 

                                                            
                                                        //  ....... add mapserver root item  ....... 




                                                        // root is -1, every time create a folder or layer, id will increase by 1 id=id+1
                                                        var NAserver_layers_id = -1



                                                        var NAserver_layers_parentLayerId
                                                        var NAserver_layers_name;
                                                        var encodedURL_NAserver_layers_name 
                                                         var _NAserver_layers_display_text
                                                                                         
                                                        var NAserver_layers_node_path = folder_item.node_path;
                                                        var NAserver_layers_absolute_path = folder_item.absolute_path ;
                                                        var current_layer_server_path =   folder_item.absolute_path;


                                                        


                                                        // route 
                                                        if (raw_NAserver.routeLayers){


                                                            // create sub-folder for route folder
                                                            NAserver_layers_id += 1
                                                            NAserver_layers_parentLayerId = NAserver_layers_id
                                                             layer_item = { 
                                                                                "id" :  NAserver_layers_id,
                                                                                
                                                                                "parent" : -1, // always to root folder, -1
                                                                                "text" : "Route Layers", 
                                                                                "icon" :  folder_icon,
                                                                                "state"       : {
                                                                                                    "opened"    : true,  // is the node open
                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                    // "selected"  : true   // is the node selected
                                                                                                },
                                                                                "type" : "na-server-folder",

                                                                           
                                                             };
                                                             NAserver_flatjson.push(layer_item) 


                                                            var _routeLayers = raw_NAserver.routeLayers

                                                            for (var l = 0; l < _routeLayers.length; l++) { 

                                                                NAserver_layers_id += 1

                                                                _NAserver_layers_display_text = _routeLayers[l]
                                                                NAserver_layers_name = _routeLayers[l]
                                                                encodedURL_NAserver_layers_name = encodeURIComponent(NAserver_layers_name) 
                                                          
                                                                layer_item = { 
                                                                                "id" :  NAserver_layers_id,
                                                                              
                                                                                "parent" : NAserver_layers_parentLayerId,
                                                                                "text" : _NAserver_layers_display_text,
                                                                                "name" : NAserver_layers_name, 
                                                                                "icon" :  layer_icon,
                                                                                "state"       : {
                                                                                                    "opened"    : true,  // is the node open
                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                    // "selected"  : true   // is the node selected
                                                                                                },


                                                                                "node_path" : NAserver_layers_node_path + "/" + encodedURL_NAserver_layers_name, 
                                                                                "absolute_path" : NAserver_layers_absolute_path + "/" + encodedURL_NAserver_layers_name,
                                                                                "server_path" : current_layer_server_path,
                                                                                "type" : "route-layer",
                                                                              
                                                                            };


                                                                            NAserver_flatjson.push(layer_item) 
                                                                        
                                                            }//for
                                                        }//if route



                                                        // closest Facility Layers 
                                                        if (raw_NAserver.closestFacilityLayers){


                                                            // create sub-folder for route folder
                                                            NAserver_layers_id += 1
                                                            NAserver_layers_parentLayerId = NAserver_layers_id
                                                            layer_item = { 
                                                                                "id" :  NAserver_layers_id,
                                                                                
                                                                                "parent" : -1, // always to root folder, -1
                                                                                "text" : "Closest Facility Layers", 
                                                                                "icon" :  folder_icon,
                                                                                "state"       : {
                                                                                                    "opened"    : true,  // is the node open
                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                    // "selected"  : true   // is the node selected
                                                                                                },
                                                                                "type" : "na-server-folder",

                                                                                
                                                             };
                                                             NAserver_flatjson.push(layer_item) 


                                                            var _closestFacilityLayers = raw_NAserver.closestFacilityLayers

                                                            for (var l = 0; l < _closestFacilityLayers.length; l++) { 

                                                                NAserver_layers_id += 1

                                                                _NAserver_layers_display_text = _closestFacilityLayers[l]
                                                                NAserver_layers_name = _closestFacilityLayers[l]
                                                                encodedURL_NAserver_layers_name = encodeURIComponent(NAserver_layers_name)

                                                                layer_item = { 
                                                                                "id" :  NAserver_layers_id,
                                                                              
                                                                                "parent" : NAserver_layers_parentLayerId,
                                                                                "text" : _NAserver_layers_display_text, 
                                                                                "name" : NAserver_layers_name,
                                                                                "icon" :  layer_icon,
                                                                                "state"       : {
                                                                                                    "opened"    : true,  // is the node open
                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                    // "selected"  : true   // is the node selected
                                                                                                },
                                                                                

                                                                                           
                                                                                "node_path" : NAserver_layers_node_path + "/" + encodedURL_NAserver_layers_name, 
                                                                                "absolute_path" : NAserver_layers_absolute_path + "/" + encodedURL_NAserver_layers_name,
                                                                                "server_path" : current_layer_server_path,

                                                                                "type" : "closest-facility-layer",
                                                                              
                                                                            };


                                                                            NAserver_flatjson.push(layer_item) 
                                                                        
                                                            }//for
                                                        }//if route



                                                        // service Area Layers 
                                                        if (raw_NAserver.serviceAreaLayers){


                                                            // create sub-folder for route folder
                                                            NAserver_layers_id += 1
                                                            NAserver_layers_parentLayerId = NAserver_layers_id
                                                            layer_item = { 
                                                                                "id" :  NAserver_layers_id,
                                                                                
                                                                                "parent" : -1, // always to root folder, -1
                                                                                "text" : "Service Area Layers", 
                                                                                
                                                                                "icon" :  folder_icon,
                                                                                "state"       : {
                                                                                                    "opened"    : true,  // is the node open
                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                    // "selected"  : true   // is the node selected
                                                                                                },

                                                                                "type" : "na-server-folder",


                                                             };
                                                             NAserver_flatjson.push(layer_item) 


                                                            var _serviceAreaLayers = raw_NAserver.serviceAreaLayers

                                                            for (var l = 0; l < _serviceAreaLayers.length; l++) { 

                                                                NAserver_layers_id += 1

                                                                var _NAserver_layers_display_text = _serviceAreaLayers[l]
                                                                NAserver_layers_name = _serviceAreaLayers[l]
                                                                encodedURL_NAserver_layers_name = encodeURIComponent(NAserver_layers_name)
                                                          
                                                                layer_item = { 
                                                                                "id" :  NAserver_layers_id,
                                                                              
                                                                                "parent" : NAserver_layers_parentLayerId,
                                                                                "text" : _NAserver_layers_display_text, 
                                                                                "name" : NAserver_layers_name,
                                                                                "icon" :  layer_icon,
                                                                                "state"       : {
                                                                                                    "opened"    : true,  // is the node open
                                                                                                    // disabled  : boolean  // is the node disabled
                                                                                                    // "selected"  : true   // is the node selected
                                                                                                },


                                                                                              
                                                                                "node_path" : NAserver_layers_node_path + "/" + encodedURL_NAserver_layers_name,
                                                                                "absolute_path" : NAserver_layers_absolute_path + "/" + encodedURL_NAserver_layers_name,
                                                                                "server_path" : current_layer_server_path,


                                                                                "type" : "service-area-layer",
                                                                               
                                                                            };


                                                                            NAserver_flatjson.push(layer_item) 
                                                                        
                                                            }//for
                                                        }//if route





                                                   
                                                    if (NAserver_flatjson.length > 1 ){

                                                                // flatjson include both layers:[] and tables:[],  tables all attached to table group folder
                                                                jstree_mapserver(NAserver_flatjson, _url_NAserver, NAserver_display_text)


                                                    }else {


                                                        //only have 1 root item, means, no layers:[],  no table:[] , or both are empty, show error,   mapserver url 



                                                        console.log("NAserver url error ...>> ",JSON.stringify(raw_NAserver) )

                                                        // show error message, if empty, will show error message too
                                                        render_message_service_panel("No layers/tables found or error, check console.log for details ")
                                                        //render_message_service_panel(JSON.stringify(raw_mapserver))
                                                    
                                                    }





                                            }


        
    // for GeocodeServer, VectorTileServer, ImageServer  , SceneServer ,.... for 3 panel only, for middle service panel only,  j s t r e e _mapserver() [middle panel]
    async function render_singleserver(_parent_id){

        mapserver_flatjson = []
        console.log('render single server  id : ', _parent_id )
        console.log('render single server  node[id] : ', folder_structure_flatjson[_parent_id])
        
        


        // frome array[folder_structure_flatjson],  get item,  item.id = _parent_id
        var folder_item = folder_structure_flatjson.find(element => element.id == _parent_id);
        console.log('folder_item  node[id] : ', folder_item)

            current_singleServerEndpoint_url = folder_item.absolute_path
            console.log( 'render single server url >>>>>  ', current_singleServerEndpoint_url)
                                                                    
            // always before await ajax, show ajax url , instead of show progressing bar 
        // progressing_info('folder', '(single server)', current_singleServerEndpoint_url);

                    raw_mapserver =await arcgis_ajax_cross_origin(current_singleServerEndpoint_url, _cross);  // cross origin method                                                                                 
                    console.log( 'render single-server root response  ', raw_mapserver)

                    //  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
                    //  VectorTileServer, scene server can't use ..../legend must exclude them

                    var _lowerCase_mapserverurl = current_singleServerEndpoint_url.toLowerCase();
                    if (_lowerCase_mapserverurl.includes('vectortile')){
                                console.log( ' Do not do vector tile legend at  2nd tier , server level  ')
                    } else {
                                    var  current_singleServerEndpoint_url_legend = current_singleServerEndpoint_url + '/legend'
                                    mapserver_legend  =await arcgis_ajax_cross_origin(current_singleServerEndpoint_url_legend, _cross);  // cross origin method 
                                    console.log( ' ### single-server ### legend ###  ', mapserver_legend )
                    }

                    

            var mapserver_display_text = folder_item.text;
            var mapserver_icon = folder_item.icon;
            var singleServiceType = folder_item.type



            



            //  ....... add  root item  ....... 
            var layer_item = { 

                "id" :  -1,     
                "parent" : "#",
                "text" : mapserver_display_text,
                "layer_name" : mapserver_display_text,
                "icon" : mapserver_icon, 
                                                                        "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },

            
                "relative_path": folder_item.relative_path,
                "node_path" : folder_item.node_path, 
                "absolute_path" : folder_item.absolute_path,
                "server_path" : folder_item.absolute_path,  // warning:   must set server path
                "layer_id" :  -1,  
                "type" : singleServiceType                                                    
            };
            // 1 time, first time run, add root item
            mapserver_flatjson.push(layer_item) 
            //  ....... add  root item  ....... 






            // no other layer, only 1 root item
            jstree_mapserver(mapserver_flatjson, current_singleServerEndpoint_url, mapserver_display_text)
    }



                                            // no jstree,  only list collection, show "comming soon"
                                            function render_other(_parent_id){


                                                console.log('render other id : ', _parent_id )
                                                render_message_service_panel("Coming Soon... ... ...")
                                                
                                            }


                                            




                            // #########  end   ###################   2nd  level [center panel] #########  will use jstree --> j s t r e e _mapserver() [center panel] ######### 



                   






                                function render_vectortile_layer(_featurelayer_id){

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

                                        icon_flatjson = create_VectorTileServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)


                                     // when click vectorTileServer, do not show layer legend yet, should wait until click next layer level, show legend 

                                     show_legend_vectorStyle(_layer_absolute_path_url, _layer_name_)

                                }



                               

                                function render_scene_layer(_featurelayer_id){

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


                                    icon_flatjson = create_sceneServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)


                                }













                               // same as render feature layer, but remove all 'map' section, only keep 'table' section
                                function render_table(_featurelayer_id) {


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

                                  icon_flatjson = create_tableFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


                                    jstree_icon(icon_flatjson, _layer_absolute_path_url,  _layer_name_)

                        }




                                 // only when user click mapserver sub-folder( group layer type), list all item.parentid = this grouplayer id
                                  // will not use jstree, 
                                 function render_group_layer(_grouplayer_id_as_parentid){
                                         
                                    empty_icon_panel_only_tag()

                                    console.log('render (mapserver folder ) group layer id is ', _grouplayer_id_as_parentid )

                                    var list_array = ["<div class='list-group'>"];

                                    for (f = 0; f < mapserver_flatjson.length; f++) {
                                    
                                        if (mapserver_flatjson[f].parent == _grouplayer_id_as_parentid) {

                                            // no need based on type, always use  onclick='selectLayerLevelItem(id)'
                                            // when user click list-collection any type item(group layer, feature layer, or table), always trigger select correspondent node on jstree, so no mather what type is.
                                            // just like (equal to) user manually click any jstree node, then follow downstream processing. 
                                            
                                            var group_layer_item_type
                                            if (mapserver_flatjson[f].type){
                                                group_layer_item_type = mapserver_flatjson[f].type
                                            }

                                            switch (group_layer_item_type){

                                                case 'Group Layer':
                                                                    var _html_tag   = "<a href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";

                                                                    _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                    _html_tag  +=       "  " +  mapserver_flatjson[f].text

                                                                    _html_tag  +=    "</a>"
                                                                    _html_tag  +=    "</br>"

                                                                    list_array.push(_html_tag);
                                                break;
                                                            
                                                case 'Feature Layer':

                                                            var _html_tag   = "<a href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";

                                                            _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                            _html_tag  +=       "  " +  mapserver_flatjson[f].text

                                                            _html_tag  +=    "</a>"
                                                            _html_tag  +=    "</br>"
                                                            list_array.push(_html_tag);

                                                break;


                                                case 'Table':
            
                                                                        var _html_tag   = "<a href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";
            
                                                                        _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                        _html_tag  +=       "  " +  mapserver_flatjson[f].text
            
                                                                        _html_tag  +=    "</a>"
                                                                        _html_tag  +=    "</br>"
                                                                        list_array.push(_html_tag);

                                                                  

                                                break;


                                                default: 


                                                            var _html_tag   = "<a href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";
            
                                                            _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                            _html_tag  +=       "  " +  mapserver_flatjson[f].text

                                                            _html_tag  +=    "</a>"
                                                            _html_tag  +=    "</br>"


                                                            list_array.push(_html_tag);

                                             } //switch
                                                                       


                                        }//if parent id
                                    }// for 


                                    list_array.push("</div>")
                                    $("#icon_list").html(list_array.join(""));
                                    



                                    if (list_array.length > 2) {
                                                // not empty, nothing to do
                                    } else {
                                                // empty, insert empty message
                                                render_message_icon_panel("Empty")
                                    }




                                    // at bottom of render grouplayer function, because render grouplayer do not use jstree. 
                                    // other render xxx use jstree, will place message_xxxx into there jstree_xxxx function
                                     // wrong, 
                                    // var parent_folder_itself = mapserver_flatjson[_grouplayer_id_as_parentid]
                                    // find the item, item.id = group layer id
                                    var parent_folder_itself = mapserver_flatjson.find(element => element.id == _grouplayer_id_as_parentid);

                                    




                                    console.log("parent_folder_itself", parent_folder_itself)
                                    var parent_folder_display_text = parent_folder_itself.text
                                    var parent_folder_full_url = parent_folder_itself.absolute_path
                                    console.log("parent_folder_itself", parent_folder_itself)


                                    
                                     var _html_icon = '     <h3 style="display:inline;"  ><b>  <a target="_blank" id="_grouplayer_link">'  
                                     //_html_icon    += "<span class='" + open_new_tab_icon +"' aria-hidden='true'></span>&nbsp;"  
                                     _html_icon    += parent_folder_display_text + '</a></b></h3>'
                                     _html_icon    += '<br> <h6 style="display:inline;"  ><sup><a target="_blank" id="_grouplayer_link2">&nbsp;' + parent_folder_full_url + '</a></sup></h6>'
                                       
                                       
                                     $('#message_icon').html( _html_icon);
                                     
                                     
                                     // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                     $('#_grouplayer_link').attr("href",  parent_folder_full_url + '?f=html');
                                     $('#_grouplayer_link2').attr("href",  parent_folder_full_url + '?f=html');

                                }






                                            // no jstree,  only list collection, show "comming soon"
                                            function render_layer_other(_otherlayer_id){
                                                console.log('render other layer id : ', _otherlayer_id )
                                                //render_message_icon_panel("Coming Soon... ... ...")
                                            }






                                            function render_viewMapServerOn_layer(_mapserver_fullurl, _mapserver_fulltext, _mapserver_center_lat, _mapserver_center_long, _mapserver_center_zoom){

                                                var multiType_flatjson = [];
            
                                                
            
                                                var _mapserver_or_featureserver = 'MapServer'
                                                if ((_mapserver_fullurl.includes('FeatureServer')) || (_mapserver_fullurl.includes('featureserver'))){
                                                    _mapserver_or_featureserver = 'FeatureServer'
                                                }
            
                                                console.log(' special render MapServer . . .(clicked MapServer node) ... ... _mapserver_fullurl, _mapserver_fulltext, _mapserver_center_lat, _mapserver_center_long, _mapserver_center_zoom ', _mapserver_fullurl, _mapserver_fulltext, _mapserver_center_lat, _mapserver_center_long, _mapserver_center_zoom)
                                                multiType_flatjson = create_MapServerFlatjson(_mapserver_fullurl, -99999,  _mapserver_fulltext , _mapserver_or_featureserver, null) // node path is null
            
                                                jstree_icon(multiType_flatjson, _mapserver_fullurl, _mapserver_fulltext)
                                            }



                                        


 // %%%%%%%%%%%%%  end  %%%%%%%%%%%%%%%%%%%  3rd level [right panel] #########  will use jstree --> j s t r e e _ i c o n() [right panel] ######### 
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











(function($){

   
    
    init_global_var();
    
        
    /**/
    // ------- let's go to your REST api  -------
    /**/
            init_start_root_input()
    /**/
    // --- end --- let's go to your REST api -------
    /**/
      
    // first time run 
    if (___url_string){
                          scan_root_folder()
    }


     //all init button, click event, including collapse expand button
     ui_event_register() 


    // can't be here, must await until first time load completed
    //pre_select_folder_level()



})(jQuery);












