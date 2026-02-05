




 // -----  layer-browser ----- json2tree only ----- 
 var browse_tree_panel_status = false;  // default is off
 var _port_http_https = ''
   // will call this function later 
   function get_port_http_https(){
         if (template_protocol == 'http:') {
             _port_http_https = '3000'
         }else {
             _port_http_https = '3200'
         }
         console.log('  layerBrowser . . .     template protocol, port will use ===>', template_protocol, _port_http_https)
   }  

    var whichBrowseTreeLayer = 0
    var whichBrowseListLayer = 0
    var current_selected_layer_url_from_tree_window

    function turn_on_browse_tree_panel(__which___layer_at_tree_panel) {
     $('#browse_tree_panel').show();
     browse_tree_panel_status = true;
     whichBrowseTreeLayer = __which___layer_at_tree_panel
   }
   function turn_off_browse_tree_panel(){
           $('#browse_tree_panel').hide();
           browse_tree_panel_status = false;
           whichBrowseTreeLayer = 0
   }

   // ----- end  -----  layer-browser ----- json2tree only ----- 



/* everything above is special for layer-browser in json2tree */







/*  everything below is copy from layer-browser.js in arcgis_viewer         */


var root_url  // same as in folder.js  example:   https://gis.la-quinta.org/arcgis/rest/services


var ___url;
var ___protocol  // this is means url paramter protocol  ?..&url=https://....
var ___hostname 
var ___pathname
var ___pathArray
var ___service


  // top level folder jstree
  var folder_structure_flatjson= [];
  // 2nd level service (mapserver) jstree
  var mapserver_flatjson = [];
  var singleServer_flatjson = [];
  // 3nd level icon jstree
  var icon_flatjson = [];
  // legend
  var mapserver_legend


  // https://spatialreference.org/ref/epsg/4362/,   must add '/' at the end
  var epsg_link = 'https://spatialreference.org/ref/epsg/'   
  var esri_link = 'https://spatialreference.org/ref/esri/' 

  var currentVersion = '0.0'


  var _timeout_for_tree = 60000;
  var _timeout_for_list = 60000;


     var _center={"_center_lat": _center_lat , "_center_long": _center_long , "_center_zoom": _center_zoom};
     // default to log angeles downtown, those value is fixed (do not change value), will be use downstream as sign to get true value 
     var default_center_lat = 34.049039
     var default_center_long = -118.246521
     var default_center_zoom = 16     // mapserver1 (cmv) will error if zoom is decimal 16.7 will cause error.   

     var _organization = '';



     // only use yes. no, icon
     var yes_icon ='<svg fill="#00FF00" width="14px" height="14px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="green" d="M13 4.1974q0 .3097-.21677.5265L7.17806 10.329l-1.0529 1.0529q-.21677.2168-.52645.2168-.30968 0-.52645-.2168L4.01935 10.329 1.21677 7.5264Q1 7.3097 1 7t.21677-.5265l1.05291-1.0529q.21677-.2167.52645-.2167.30968 0 .52645.2167l2.27613 2.2839 5.07871-5.0864q.21677-.2168.52645-.2168.30968 0 .52645.2168l1.05291 1.0529Q13 3.8877 13 4.1974z"/></svg>'
     var no_icon = '<svg fill="#FF0000" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <rect x="0" fill="none" width="20" height="20"/> <g> <path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"/> </g> </svg>'
     
     
     // html unicode, you can change color with span css, seems not work.
     //var yes_icon ='<span style="color: lime;">&#128077;</span>'
     //var no_icon = '&#9940;'
     
     // Must Keep , even I do not use any icon, variable name 'folder_icon' was used in jstree, without it, will undefined error
              var folder_icon = "fa fa-folder-open";
              var folder_fill_icon = "fa fa-folder blue_green";
              var folder_check_icon = "fa fa-folder-closed blue_green";
              var open_new_tab_icon = "fa fa-arrow-up-right-from-square glaucous";
              var mapservice_icon = "bi bi-layers" //"bi bi-folder-plus"
var GroupLayer_icon = "bi bi-layers-half"
var polygon_icon = "bi bi-pentagon" // "bi bi-heptagon"
var line_icon = "bi bi-slash-lg"
var point_icon = "bi bi-geo-alt"
              var layer_icon = "fa fa-play cadmium_green";
              var table_icon = "fa fa-plus viridian";
              var coming_icon = "fa fa-paper-plane blue_green";
              // -123 means void, blank icon, for everything other than map-server, feature-server, feature-layer
              var VectorTileServer_icon = "fa fa-sitemap taupe"
              var ImageServer_icon = "fa fa-sitemap taupe"
              var SceneServer_icon = "fa fa-sitemap taupe"
              var GeocodeServer_icon = "fa fa-sitemap taupe"
              var unknow_server_icon = "fa fa-sitemap taupe"
              var AnnotationLayer_icon = "fa fa-caret-right taupe"
              var RasterLayer_icon = "fa fa-caret-right taupe"
              var RasterCatalogLayer_icon = "fa fa-caret-right taupe"
              var MosaicLayer_icon = "fa fa-caret-right taupe"
              var unknow_layer_icon = "fa fa-caret-right taupe"

                        






                      /**/


                      // ............... global var for template url base ...............

                                          var url_template_googlemaps
                                          var url_template_base_googlemaps
                                          var url_template_base_googlemaps_vector
                                          var url_template_base_googlemaps_imageServer
                                          var url_template_base_googlemaps_geocodeServer
                                          var url_template_base_googlemaps_rasterLayer

                                          var url_template_base_bingmaps
                                          var url_template_base_bingmaps_vector


                                          var url_template_base_mapbox
                                          var url_template_base_mapbox_vector


                                          var url_template_base_esri =  'https://transparentgov.net//mapserver1/viewer/?config=viewer_simple1';  
                                          
                                          
                                          var url_template_base_esri_vector_tile  // only for cmv (configurable-map-viewer)

                                          var url_template_base_esri_vector_tile_layer
                                          var url_template_base_esri_vector_tile_layer_popup


                                          var url_template_base_mapbox_vector_tile_layer
                                          var url_template_base_openlayers_vector_tile_layer
                                          var url_template_base_leaflet_vector_tile_layer



                                          var url_template_base_esri_scene_layer
                                          


                                          var url_template_base_esri_imagery_layer
                                          var url_template_base_esri_imagery_layer_popup



                                          var url_template_base_esri_mapimagelayer_identify =  'https://transparentgov.net/json2tree/arcgis/js4/mapimagelayer_identify.html?';   
                                          var url_template_base_esri_featurelayer_flat =  'https://transparentgov.net/json2tree/arcgis/js4/featurelayer_flat.html?';   
                                          
                                          
                                          
                                          
                                          
                                          var url_template_base_esri_featurelayer_portalid  
                                          
                                          

                                          var url_template_base_esri_webmap_portalid 

                                          var url_template_base_esri_geojson   

                                          var url_template_base_esri_geojson_popup   
                                          
                                          

                                          var url_template_base_esri_featurelayer
                                          
                                         
                                          
                                          
                                          
                                          
                                          var url_template_base_esri_featurelayer_native
                                          var url_template_base_esri2 
                                          var url_template_base_esri3 
                                          var _searchLayer_base_url



                                          var url_template_arcgis_feature_table

                                          var url_template_arcgis_feature_table_2
                                          var url_template_arcgis_feature_table_1


                                          var url_template_arcgis_feature_table_3


                      // ......   end   ......... global var for template url base ...............



                      /**/





                          // ======== jstree =============
                          /**/
                          // warning: special only for layer-browser,  not use "arcgis_ajax_cross_origin  with _cross", instead use :  ajax_jsonp_cors_proxy(___thislayerurl___, _timeout_for_tree); 

/* */

                                  // top level [left panel]  ----- folder ------   
                                  function jstree_root_folder(root_allfolders_flatjson, root_url, root_url_organization, root_url_hostname){

                                      // icon
                                      var _html_org = "<h1 style='display:inline;' class='" + open_new_tab_icon + "' aria-hidden='true'></h1> "    
                                      // org name
                                      _html_org    += '<h1 style="display:inline;"><b><a target="_blank" id="_orgnization_link">&nbsp;' + root_url_organization +  '</a></b></h1>'
                                      // https://domain 
                                      _html_org    += '<br><h1 style="display:inline;"><sup><a target="_blank" id="_orgnization_link2">https://' + root_url_hostname    + '</a></sup></h1>' 
                                      // arcgis version number
                                      _html_org    += '<br><h1 style="display:inline;"><sub>Arcgis Server v<b><big>' + currentVersion + '</big></b> </sub></h1>'

                                      $('#message_root_folder').html(_html_org);
                                      
                                      $('#_orgnization_link').attr("href",  root_url);
                                      $('#_orgnization_link2').attr("href",  root_url);


                                      $("#collapse_button_folder").show();
                                      $("#expand_button_folder").show();


                                      console.log('  layerBrowser . . .      jstree all folder  flat json feed : ', root_allfolders_flatjson)

                                     

                                      
                                      $('#jstree_root_folder')
                                                          // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                                                      
                                                          .on('changed.jstree', function (e, data) {

                                                      //.on('select_node.jstree', function (e, data) {

                                                          // only for layer-browser,   when click any level 1 node, must empty last time level 2 and level 3 html content  
                                                          empty_level2_level3_html_when_click_level1_node()

                                                              console.log('  layerBrowser . . .      click select folder node, event ', data)
                                                              var i, j, _selected_text = [], _selected_id = [], _selected_type = [];

                                                              for(i = 0, j = data.selected.length; i < j; i++) {
                                                                  _selected_text.push(data.instance.get_node(data.selected[i]).text);
            _selected_relative_path.push(data.instance.get_node(data.selected[i]).original.relative_path);
                                                                  _selected_id.push(data.instance.get_node(data.selected[i]).id);
                                                                  // must use .original.type, because re-structured json does not carry our customized field 'type'
                                                                  _selected_type.push(data.instance.get_node(data.selected[i]).original.type);
                                                              }


                                                              // only get 1st selected node, so always use    _selected_xxxxx[0] 

                                                              //$('#event_result').html('Selected: ' + r.join(', '));
                                                              console.log('  layerBrowser . . .     Selected id + text  + type: ' + _selected_id[0] + "   ->   " + _selected_text[0]  + "   ->   " +  _selected_type[0])

                                                              


                                                              update_url_parameter('select_folder', _selected_id[0]);
                                                                    update_url_parameter('select_folder_text', _selected_text[0]);
                                                              update_url_parameter('select_layer', '');

                                                              switch(_selected_type[0]) {


                                                                  case "folder":
                                                                                  console.log('  layerBrowser . . .      render folder ', _selected_id[0])
                                                                                  render_folder(_selected_id[0])
                                                                      break;

                                                                  case "MapServer":
                                                                              render_mapserver(_selected_id[0])
                                                                              
                                                                          
                                                                      break;

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
                                                              
                                                              
                                                              
                                                              'core' : {

                                                                                  'themes': {
                                                                                      'name': 'proton',
                                                                                      'responsive': true,
                                                                                    // how to remove icon https://stackoverflow.com/questions/16526836/remove-folder-icon-in-jstree-while-using-checkbox 
                                                                                    "icons":false
                                                                                  },
                                                                          

                                                                              'data' : root_allfolders_flatjson





                                                                      } 


                                                          });

                                      

                                                         
                          

                                  }



/* */



                              // 2nd level [middle panel]  ----- service ------  
                                 var _html_for_message_mapserver  = ''
                                 var _html_for_more_info_mapserver  = '' // for more_info
                                 var _html_thumbnail_for_mapserver  = '' // thumbnail
                                 var _thumbnail_for_mapserver_url = ''

                                 // only for layer-browser
                                 function jstree_mapserver(mapserver_alllayers_flatjson, mapserver_url, mapserver_url_display_text){

                                          _html_for_message_mapserver  = ''
                                          _html_for_more_info_mapserver  = '' // for more_info
                                          // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                          _html_for_message_mapserver     = '<h3 style="display:inline;"  ><b>  <a target="_blank" id="_mapserver_link" href="'+  mapserver_url + '?f=html">'  + "<span class='" + open_new_tab_icon +"' aria-hidden='true'></span>&nbsp;"  + mapserver_url_display_text + '</a></b></h3>'
                                          _html_for_message_mapserver    += '<br> <h6 style="display:inline;"  ><sup><a target="_blank" id="_mapserver_link2" href="'+  mapserver_url + '?f=html">' + mapserver_url + '</a></sup></h6>'
                                         



                                          //  ...  ...  ...  ...  ...  thumbnail for mapserver ...  ...  ...  ...  ...  ...  ... 
                                              /*

                                                      Check if image exists on server using JavaScript
                                                      https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript


                                                      jquery how to check response type for ajax call
                                                      https://stackoverflow.com/questions/3741574/jquery-how-to-check-response-type-for-ajax-call


                                                      <img class="fit-picture"
                                                          src="https://gis.la-quinta.org/arcgis/rest/services/Community_and_economic/school_district/MapServer/info/thumbnail"
                                                          alt="thumbnail for mapserver">
                                              */

                                                          _thumbnail_for_mapserver_url = mapserver_url + '/info/thumbnail'

                                                          $.get(_thumbnail_for_mapserver_url)
                                                                  .done(function(response, status, xhr) {

                                                                      var content_type = xhr.getResponseHeader("content-type") || "";

                                                                      if (content_type.indexOf('json') > -1) {
                                                                          // handle json here
                                                                      } 

                                                                      if (content_type.indexOf('image/png') > -1) {
                                                                              // Do something now you know the image exists.
                                                                              _html_thumbnail_for_mapserver = '<img src="' + _thumbnail_for_mapserver_url + '" alt="thumbnail for mapserver">'                                            
                                                                              $('#thumbnail_for_mapserver').html(_html_thumbnail_for_mapserver);
                                                                      } else {

                                                                              // Image is blank empty, with 200 success response
                                                                              $('#thumbnail_for_mapserver').html('');
                                                                      }


                                                                  }).fail(function() { 
                                                                      // Image doesn't exist - do something else.
                                                                      $('#thumbnail_for_mapserver').html('');
                                                                  })


                                          


                                          //  ...  ... end ...  ...  ...  thumbnail for mapserver ...  ...  ...  ...  ...  ...  ... 



/**/


                          /**/
                                          // # # # # # # dynamic layer # # # # # #
                                          
                                                  if (raw_mapserver.supportsDynamicLayers){
                                                      _html_for_more_info_mapserver    += '<br>' +  yes_icon  + '<span style="font-size:10.21px; font-weight:100;">&nbsp;&copy;&nbsp;'  +  'DynamicLayers' + '</span>   <sup>available</sup>'
                                                      _support_dynamic_layers = true
                                                  } else {
                                                      _html_for_more_info_mapserver    += '<br>' +  no_icon.replace('width="20" height="20"', 'width="30" height="30"') + '<span style="font-size:10.21px; font-weight:100;">&nbsp;&copy;&nbsp;'  + 'DynamicLayers' + '</span>  <sup>NOT available</sup>'
                                                      _support_dynamic_layers = false
                                                  }
                                          // # # #  end  # # # dynamic layer # # # # # #
                                          /**/


                                      /**/
                                          //  = = = = =  tile  = = = = =  Yes  = = = = =   or  = = = = =  No = = = = =
                                          /*
                                             Warning: .capabilities is not accurate,
                                                    for example 'usgs pad' have tile, but does not have 'tilemap' in their capability. 

                                             for MapServer, FeatureServer, only  "capabilities": "Data,Map,Query,Tilemap",
                                             for ImageServer only "capabilities": "Image,Mensuration,Metadata,Tilemap",

                                              Tilemap : means tile is available
                                              Map or Image : means image is available
                                              Query :  featureServer only have 'Query', both image and tile are not available
                                          */
                                              var _capabilities = raw_mapserver.capabilities 
                                              console.log('  layerBrowser . . .     map server capabilities could be for mapserver and featureserver is(Data,Map,Query,Tilemap), for imageserver is(Image,Mensuration,Metadata) ', _capabilities )
                                              var _singleFusedMapCache = raw_mapserver.singleFusedMapCache 
                                              console.log('  layerBrowser . . .     map server singleFusedMapCache true or false or undefined', _singleFusedMapCache )
                                              console.log('  layerBrowser . . .       = = = = =  tile  = = = = =  Yes  = = = = =   or  = = = = =  No = = = = =  ', _singleFusedMapCache)
                                            
                                              if ((raw_mapserver.hasOwnProperty('singleFusedMapCache'))){ 
                                                  // single fused map cache could be 'true' 'false' or 'undefined'
                                                  if (raw_mapserver.singleFusedMapCache == true){  
                                                          // true, tile available
                                                          _html_for_more_info_mapserver    += '<br>' + yes_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Tile' + '</span>  <sup>available</sup>'
                                                          _html_for_more_info_mapserver    += '<br>'+ no_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Maplex Dynamic Labeling' + '</span>  <sup>NOT available</sup>'                                                           
                                                  } else {
                                                           // false, disable tile
                                                           _html_for_more_info_mapserver    += '<br>' + no_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Tile' + '</span>  <sup>NOT available</sup>'
                                                   }//if
                                              } else {
                                                  //'undefined' disable tile
                                                  _html_for_more_info_mapserver    += '<br>' + no_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Tile' + '</span>  <sup>NOT available</sup>'
                                              }

  
                                              if (_capabilities){ 
                                                  if ( (!(_capabilities.includes('Map'))) &&  (!(_capabilities.includes('Image')))  ) {
                                                      // disable image
                                                      _html_for_more_info_mapserver    += '<br>' + no_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Image' + '</span>  <sup>NOT available</sup>'
                                                  } else {
                                                      _html_for_more_info_mapserver    += '<br>' + yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Image' + '</span>  <sup>available</sup>'
                                                  }
                                              }
                                           //   = = = = =   end    = = = = =  tile  = = = = =  Yes  = = = = =   or  = = = = =  No = = = = =  
                                           /**/        



                                          /**/
              //  = = = = =   coordinate  = = = = =  system = = = = =

              console.log('  layerBrowser . . .      = = = = =   coordinate  = = = = =  system = = = = =  ', raw_mapserver.spatialReference)

              /*
              *   1) latestWkid (EPSG)  : I normally use this to look up detais at https://spatialreference.org
              *   2) wkt : well-know-text, if no wkid, wkt string will be used, as custom-coordinate-system, it is text string.
              *   3) wkid : not sure, where to look up details.   
              * 
              *    ESRI doc
              *    https://developers.arcgis.com/web-map-specification/objects/spatialReference/
              * 
              *    
              *   
              * 
              *    There are 4 groups of authorities
              *          1) EPSG  (4362)  not use 
              *                              look up wkid from EPSG   https://spatialreference.org/ref/epsg/3857/prettywkt/'
              *                              need ajax, some ESRI wkid are missing,  
              * 
              *          2) ESRI  (447) in use
              *                             look up wkid for ESRI  
              *                                               https://localhost:3200/esri_wkid/3857
              * 
              *                                        To update library go here: 
              *                                                    https://www.npmjs.com/package/@esri/proj-codes
              *                                                    https://github.com/Esri/projection-engine-db-doc#readme
              *                              guarantee ESRI wkid found, no missing, 
              * 
              * 
              *          3) IAU2000 (2380)
              *          4) spatialreference.org (2717)
              * 
              * 
              *   Example:

                      102100 [Esri:] ->   3857 [EPSG:] WGS_1984_Web_Mercator_Auxiliary_Sphere

                      pcs: projected coordinate system
                          vcs: vertical coordinate system
                          gcs: geographic coordinate system
                          gtf: geographic transformation
                          dat: datum
                          vdt: vertical datum
                          lin: linear unit
                          sph: spheroid
                          vtf: vertical transformation
              * 
              */
              
              
              if (raw_mapserver.spatialReference){


          /**/
                  // ============  esri  ============  look up  ============
                  var _wkid = raw_mapserver.spatialReference.wkid
                  if (_wkid){
                                      if ((_wkid == '102100') || (_wkid == '4326') ){ 
                                          // Spatial Reference: wkid  (latestWkid) 
                                          // Spatial Reference: 4326  (4326)
                                          // Spatial Reference: 102100  (3857)    
                                          var wgs1984_link
                                          var wgs1984_unit
                                          if (_wkid == '102100') {
                                              wgs1984_link = 'https://spatialreference.org/ref/esri/102100/'
                                              wgs1984_unit = '&nbsp;&nbsp;&nbsp;' + '<sub>unit</sub>'  + '<mark>Meter</mark>' + '&nbsp;&nbsp;&nbsp;'  + '<sub>datum</sub>' + 'WGS_1984'
                                          } else {
                                              wgs1984_link = 'https://spatialreference.org/ref/epsg/4362/'
                                              wgs1984_unit = '&nbsp;&nbsp;&nbsp;'  + '<sub>unit</sub>' + '<mark>Degree</mark>' + '&nbsp;&nbsp;&nbsp;'  + '<sub>datum</sub>' + 'WGS_1984'
                                          }


                                          _html_for_more_info_mapserver    += '<br>' + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'WGS 1984' + '</span>'
                                          _html_for_more_info_mapserver    += ' <sup>ESRI coordinate system (USA)</sup>' 
                                          _html_for_more_info_mapserver    +=  "<h6 style='display:inline;' class='" + open_new_tab_icon + "' aria-hidden='true'></h6> " + '<a target="_blank" href="' + wgs1984_link  +'">' + _wkid + '</a>' 
                                          _html_for_more_info_mapserver    +=  wgs1984_unit 
                                          _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; compatible with GoogleMaps</sup>'
                                      } else {  
                                                                  // ------- ESRI wkid: sync-version  -------

                                                                      template_protocol = ____current_window_protocol
                                                                      get_port_http_https() // make sure it is https://3200 or http://3000
                                                                      var _esri_wkid_lookup_url = window.location.protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/esri_wkid/' + _wkid;

                                                                      var ___url_getJson = _esri_wkid_lookup_url
                                                                      var _custom_timeout = 9000
                                                                      var _customized_datatype = 'json'
                                                                      console.log('  layerBrowser . . .     ajax (timeout) ',___url_getJson, _custom_timeout)
                                                                      $.ajax({
                                                                                                  timeout: _custom_timeout,
                                                                                                  url: ___url_getJson,
                                                                                                  type : 'GET',
                                                                                                  dataType: _customized_datatype,

                                                                                                  error: function (error_1) { 
                                                                                                                  console.log('  layerBrowser . . .     ajax_error_1 ',error_1) 
                                                                                                                  // ESRI not found or website is not available
                                                                                                                  _html_for_more_info_mapserver    += '<br>'  + '<h3 style="display:inline;"><b>'   + _wkid  + '</span>' 
                                                                                                                  _html_for_more_info_mapserver    += '&nbsp;<sup><span >ESRI<sub>us</sub></span> coordinate system</sup>' 
                                                                                                                  _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; NOT compatible with GoogleMaps</sup>'
                                                                                                                  $('#message_more_info_mapserver').html( _html_for_more_info_mapserver);
                                                                                                                  
                                                                                                          },

                                                                                                  success: function (_esri_wkid_json) {
                                                                                                                  console.log('  layerBrowser . . .      esri wkid json ', _wkid,  _esri_wkid_json)
                                                                                                                  var _custom_coordinate_system_name = _esri_wkid_json.name
                                                                                                                  var _custom_coordinate_system_wkt = _esri_wkid_json.wkt
                                                                                                                  
                                                                                                                  /*  
                                                                                                                      wkt
                                                                                                                  "PROJCS[\"NAD_1983_StatePlane_California_VI_FIPS_0406_Feet\",GEOGCS[\"GCS_North_American_1983\",DATUM[\"D_North_American_1983\",SPHEROID[\"GRS_1980\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Lambert_Conformal_Conic\"],PARAMETER[\"False_Easting\",6561666.666666666],PARAMETER[\"False_Northing\",1640416.666666667],PARAMETER[\"Central_Meridian\",-116.25],PARAMETER[\"Standard_Parallel_1\",32.78333333333333],PARAMETER[\"Standard_Parallel_2\",33.88333333333333],PARAMETER[\"Latitude_Of_Origin\",32.16666666666666],UNIT[\"Foot_US\",0.3048006096012192]]"

                                                                                                                  */
                                                                                                                  // from datum to spheroid
                                                                                                                  var _custom_coordinate_system_datum = _custom_coordinate_system_wkt.substring( (_custom_coordinate_system_wkt.indexOf('DATUM[\"') + 7),  _custom_coordinate_system_wkt.indexOf('\",SPHEROID[\"'))
                                                                                                                  var _custom_coordinate_system_unit  = _custom_coordinate_system_wkt.substring( (_custom_coordinate_system_wkt.lastIndexOf('UNIT[\"') + 6),  _custom_coordinate_system_wkt.lastIndexOf('\"'))

                                                                                                                  console.log('  layerBrowser . . .      _custom_coordinate_system_name : 1 ', _custom_coordinate_system_name, _esri_wkid_json)

                                                                                                                  _html_for_more_info_mapserver    += '<br>'  
                                                                                                                  _html_for_more_info_mapserver    +=  '<h5 style="display:inline;"><sub><b><big>'  + _custom_coordinate_system_name    + '</big></b></sub></h5>' 
                                                                                                                  _html_for_more_info_mapserver    +=  '<br>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sup><span >ESRI<sub>us</sub></span> coordinate system ' 
                                                                                                                  _html_for_more_info_mapserver    +=  '</sup>'  + "<h6  style='display:inline;' class='" + open_new_tab_icon + "' aria-hidden='true'></h6> " + '<a target="_blank" href="' + esri_link + _wkid +'/">' + _wkid + '</a>' 
                                                                                                                  _html_for_more_info_mapserver    +=  '&nbsp;&nbsp;&nbsp;' + '<sup>unit</sup>'  + '<span >' + _custom_coordinate_system_unit + '</span>' + '&nbsp;&nbsp;&nbsp;'  + '<sup>datum</sup>'   + '<span >'+ _custom_coordinate_system_datum + '</span>'
                                                                                                                  _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; NOT compatible with GoogleMaps</sup>'
                                                                                                                  $('#message_more_info_mapserver').html( _html_for_more_info_mapserver);
                                                                                                                  
                                                                                                      }  // success 
                                                                      }); // ajax
                                                                  // ------- end  -------  epsg: sync-version  -------
                                      }// if esri
                  } // if wkid
                  //   ============  end  ============  esri  ============  look up  ============


                                                                  /**/

                  // -------  epsg  -------  -------  ------- look up -------  -------  -------  -------
                  var _latestWkid = raw_mapserver.spatialReference.latestWkid
                  if (_latestWkid){
                                      if ((_latestWkid == '3857') || (_latestWkid == '4326') ){
                                          // Spatial Reference: wkid  (latestWkid) 
                                          // Spatial Reference: 4326  (4326)
                                          // Spatial Reference: 102100  (3857) 
                                          var wgs1984_link2
                                          var wgs1984_unit2
                                          if (_latestWkid == '3857') {
                                              wgs1984_link2 = 'https://spatialreference.org/ref/epsg/3857/'
                                              wgs1984_unit2 = '&nbsp;&nbsp;&nbsp;' + '<sub>unit</sub>'  + '<mark>Metre</mark>' + '&nbsp;&nbsp;&nbsp;'  + '<sub>datum</sub>' + 'WGS_1984'
                                          } else {
                                              wgs1984_link2 = 'https://spatialreference.org/ref/epsg/4362/'
                                              wgs1984_unit2 = '&nbsp;&nbsp;&nbsp;'  + '<sub>unit</sub>' + '<mark>Degree</mark>' + '&nbsp;&nbsp;&nbsp;'  + '<sub>datum</sub>' + 'WGS_1984'
                                          }  
                                          _html_for_more_info_mapserver    += '<br>' + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'WGS 1984' + '</span>'
                                          _html_for_more_info_mapserver    += ' <sup>EPSG coordinate system (Europe)</sup>' + "<h6  style='display:inline;' class='" + open_new_tab_icon + "' aria-hidden='true'></h6> " + '<a target="_blank" href="' + wgs1984_link2  +'">' + _latestWkid + '</a>' 
                                          _html_for_more_info_mapserver    +=  wgs1984_unit2 
                                          _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; compatible with GoogleMaps</sup>'
                                      } else {                 
                                              // ------- epsg: sync-version  -------
                                                                  // some ESRI wkid are missing,
                                                                  //var _prettywkt_url =  'https://spatialreference.org/ref/epsg/' + _latestWkid + '/prettywkt/'   // look up wkid from EPSG   https://spatialreference.org/
                                                                  var _prettywkt_url =  'https://spatialreference.org/ref/epsg/' + _latestWkid + '/ogcwkt/'   // look up wkid from EPSG   https://spatialreference.org/

                                                                  //works but do not use a-s-y-n-c-a-w-a-i-t for epsg 
                                                                  //var _prettywkt_txt = await arcgis_ajax_cross_origin(_prettywkt_url, 'proxy');  // only proxy works, cors, jsonp failed 
                                                                  //var _prettywkt_txt = await ajax_proxy_only_customized_type(_prettywkt_url, 3000, 'text')
                                                                  
                                                                      var ___url_getJson = _prettywkt_url
                                                                      var _custom_timeout = 9000
                                                                      var _customized_datatype = 'text'
                                                                      console.log('  layerBrowser . . .     ajax do not proxy, (timeout) ',___url_getJson, _custom_timeout) 
                                                                      //var _proxified_url = proxify_url(___url_getJson)
                                                                      //console.log('  layerBrowser . . .     try ajax do not proxy =======> ',  _proxified_url) 
                                                              
                                                                      $.ajax({
                                                                                                  timeout: _custom_timeout,
                                                                                                  url: ___url_getJson,  //_proxified_url,
                                                                                                  type : 'GET',
                                                                                                  dataType: _customized_datatype,

                                                                                                  error: function (proxy_error_1) { 
                                                                                                                  console.log('  layerBrowser . . .     ajax proxy_error_1 ',proxy_error_1) 
                                                                                                                  // epgs not found or website is not available
                                                                                                                  _html_for_more_info_mapserver    += '<br>' + '<h3 style="display:inline;"><b>'  + _latestWkid  + '</span>' 
                                                                                                                  _html_for_more_info_mapserver    += '&nbsp;<sup><span >EPSG<sub>european</sub></span> coordinate system</sup>'
                                                                                                                  _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; NOT compatible with GoogleMaps</sup>'
                                                                                                                  $('#message_more_info_mapserver').html( _html_for_more_info_mapserver);
                                                                                                                  
                                                                                                          },

                                                                                                  success: function (_prettywkt_txt) {
                                                                                                                  console.log('  layerBrowser . . .      > epsg well know text <  ', _latestWkid,  _prettywkt_txt)
                                                                                                                  /*
                                                                                                                          1) 2230 will give you following string:

                                                                                                                              pretty human readable wkt: 
                                                                                                                                          PROJCS["NAD83 / California zone 6 (ftUS)",
                                                                                                                                              GEOGCS["NAD83",
                                                                                                                                                  DATUM["North_American_Datum_1983",...
                                                                                                                                                  UNIT["US survey foot",0.3048006096012192,
                                                                                                                                                  AUTHORITY["EPSG","9003"]],
                                                                                                                                                  PROJECTION["Lambert_Conformal_Conic_2SP"],
                                                                                                                              
                                                                                                                              OGC wkt:
          PROJCS["NAD83 / Utah Central (ftUS)",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["US survey foot",0.3048006096012192,AUTHORITY["EPSG","9003"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",40.65],PARAMETER["standard_parallel_2",39.01666666666667],PARAMETER["latitude_of_origin",38.33333333333334],PARAMETER["central_meridian",-111.5],PARAMETER["false_easting",1640416.6667],PARAMETER["false_northing",6561666.666700001],AUTHORITY["EPSG","3566"],AXIS["X",EAST],AXIS["Y",NORTH]]


                                                                                                                          2) in case of error, you will get:
                                                                                                                                  Not found, /ref/epsg/35660/prettywkt/. 
                                                                                                                  */

                                                                                                                  var _custom_coordinate_system_name  =  _prettywkt_txt.substring(_prettywkt_txt.indexOf('"')+1)
                                                                                                                  var _custom_coordinate_system_datum =  _prettywkt_txt.substring( (_prettywkt_txt.indexOf('DATUM["') + 7),  _prettywkt_txt.indexOf('",SPHEROID["'))
                                                                                                                  var _custom_coordinate_system_unit_raw  =  _prettywkt_txt.substring( (_prettywkt_txt.lastIndexOf('UNIT["') + 6) )
                                                                                                                  var _custom_coordinate_system_unit  = _custom_coordinate_system_unit_raw.substring(0, _custom_coordinate_system_unit_raw.indexOf('",'))

                                                                                                                  console.log('  layerBrowser . . .      _custom_coordinate_system_name : 1 ', _custom_coordinate_system_name)
                                                                                                                  _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )
                                                                                                                  _html_for_more_info_mapserver    += '<br>'   
                                                                                                                  _html_for_more_info_mapserver    +=  '<h5 style="display:inline;"><sub><b><big>'  + _custom_coordinate_system_name    + '</big></b></sub></h5>' 
                                                                                                                  _html_for_more_info_mapserver    +=  '<br>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sup><span >EPSG<sub>european</sub></span> coordinate system ' 
                                                                                                                  _html_for_more_info_mapserver    +=  '</sup>'  + "<h6  style='display:inline;' class='" + open_new_tab_icon + "' aria-hidden='true'></h6> " + '<a target="_blank" href="' + epsg_link + _latestWkid +'/">' + _latestWkid + '</a>' 
                                                                                                                  _html_for_more_info_mapserver    +=  '&nbsp;&nbsp;&nbsp;' + '<sup>unit</sup>'  + '<span >' + _custom_coordinate_system_unit + '</span>' + '&nbsp;&nbsp;&nbsp;'  + '<sup>datum</sup>'   + '<span >'+ _custom_coordinate_system_datum + '</span>'
                                                                                                                  _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; NOT compatible with GoogleMaps</sup>'
                                                                                                                  $('#message_more_info_mapserver').html( _html_for_more_info_mapserver);
                                                                                                                  
                                                                                                      }  // success 
                                                                      }); // ajax
                                                                  // ------- end  -------  epsg: sync-version  -------

                                      }// if 3857
                  } // if latestWkid
                  // -------  epsg  -------  -------  ------- look up -------  -------  -------  -------

          /**/


                      

                      // ============  custom  ============  wkt  ============ 
                      /* 
                          only have custom wkt string (no wkid)
                          Spatial Reference : {
                                      wkt: 'PROJCS["NAD_1983_StatePlane_Utah_Central_FIPS_4302_Feet",GEOGCS["GCS_North_American_1983",DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Lambert_Conformal_Conic"],
                                              PARAMETER["False_Easting",1640416.666666667],PARAMETER["False_Northing",6561666.666666666],PARAMETER["Central_Meridian",-111.5],PARAMETER["Standard_Parallel_1",39.01666666666667],
                                              PARAMETER["Standard_Parallel_2",40.65],PARAMETER["Latitude_Of_Origin",38.33333333333334],UNIT["Foot_US",0.3048006096012192]],VERTCS["NAVD_1988",VDATUM["North_American_Vertical_Datum_1988"],
                                              PARAMETER["Vertical_Shift",0.0],PARAMETER["Direction",1.0],UNIT["Foot_US",0.3048006096012192]]
                                          '
                          }
                          */ 
                          var _custom_wkt_txt =  raw_mapserver.spatialReference.wkt
                          if (_custom_wkt_txt){
                                              var _custom_coordinate_system_name = _custom_wkt_txt.substring(_custom_wkt_txt.indexOf('"')+1)
                                              console.log('  layerBrowser . . .      _custom_coordinate_system_name : 1 ', _custom_coordinate_system_name)
                                              _custom_coordinate_system_name = _custom_coordinate_system_name.substring(0,  _custom_coordinate_system_name.indexOf('"') )
                                              _html_for_more_info_mapserver    += '<br>'  
                                              _html_for_more_info_mapserver    +=  '<h5 style="display:inline;"><sub><b><big>'  + _custom_coordinate_system_name    + '</big></b></sub></h5>' 
                                              _html_for_more_info_mapserver    +=  '<br>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sup><span class="copper">CUSTOM</span> coordinate system ' + '<span class="copper">' + _custom_coordinate_system_name + '</span></sup>'   
                                              _html_for_more_info_mapserver    += '<br><sup> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; NOT compatible with GoogleMaps</sup>'
                                              $('#message_more_info_mapserver').html( _html_for_more_info_mapserver);
                                              
                          }
                      // ============  end  ============  custom  ============  wkt  ============ 



                  
                  
              }// if spatial reference

              // = = = = =   end  = = = = =   coordinate  = = = = =  system = = = = =




/**/
          //   = = = = =   others  = = = = =  = = = = =

          if (raw_mapserver.maxRecordCount){
              _html_for_more_info_mapserver    += '<br>' +  '<h1 style="display:inline;"><b>&nbsp;'  + raw_mapserver.maxRecordCount + '</b></h1>' + '&nbsp;'  + '<sub>MaxReturnItems</sub>'
              } 
  
  
              // fix, vectorTileServer, no layers,
                if (raw_mapserver.hasOwnProperty('layers')){
                    if (raw_mapserver.layers.length){
                        if (raw_mapserver.layers[0].hasOwnProperty('supportsDynamicLegends')){                                  
                                _html_for_more_info_mapserver    += '<br>' + yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Dynamic Legend' + '</span>   <sup>available</sup>'
                        } else {
                                _html_for_more_info_mapserver    += '<br>' + no_icon.replace('width="20" height="20"', 'width="30" height="30"') + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Dynamic Legend' + '</span>  <sup>NOT available</sup>' 
                        }
                    }
                }
  
  
              if (raw_mapserver.supportsClipping){
              _html_for_more_info_mapserver    += '<br>'  + yes_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Clipping' + '</span>' + '&nbsp;'  +  '<sub>image</sub>'
              } else {
              _html_for_more_info_mapserver    += '<br>'+ no_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Clipping' + '</span>' + '&nbsp;'  +  '<sub>image</sub>'
              }
  
  
              if (raw_mapserver.supportsSpatialFilter){
              _html_for_more_info_mapserver    += '<br>' + yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Spatial Filter' + '</span>' + '&nbsp;'  +  '<sub>image</sub>'
              } else {
              _html_for_more_info_mapserver    += '<br>'+ no_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Spatial Filter' + '</span>' + '&nbsp;'  + '<sub>image</sub>'
              }
  
              if (raw_mapserver.supportsTimeRelation){
              _html_for_more_info_mapserver    += '<br>'+ yes_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Time Relation' + '</span>' 
              } else {
              _html_for_more_info_mapserver    += '<br>'+ no_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Time Relation' + '</span>' 
              }
  
              if (raw_mapserver.supportsQueryDataElements){
              _html_for_more_info_mapserver    += '<br>'+ yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Query Data Elements' + '</span>'  
              } else {
              _html_for_more_info_mapserver    += '<br>' + no_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Query Data Elements' + '</span>' 
              }
  
              if (raw_mapserver.supportsDatumTransformation){
              _html_for_more_info_mapserver    += '<br>'+ yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Datum Transformation' + '</span>'  
              } else {
              _html_for_more_info_mapserver    += '<br>'+ no_icon +  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Datum Transformation' + '</span>' 
              }
  
              if (raw_mapserver.resampling){
              _html_for_more_info_mapserver    += '<br>' + yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Resampling' + '</span>'  
              } else {
              _html_for_more_info_mapserver    += '<br>'+ no_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + 'Resampling' + '</span>' 
              }
  
  
  
  
              if (raw_mapserver.maxImageHeight){
              _html_for_more_info_mapserver    += '<br>'+  '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + raw_mapserver.maxImageHeight + '</span>' + '&nbsp;'  +  '<sub>MaxImageHeight</sub>'
              } 
              if (raw_mapserver.maxImageWidth){
              _html_for_more_info_mapserver    += '<br>'+   '<span style="font-size:10.21px; font-weight:100;">&nbsp;'  + raw_mapserver.maxImageWidth + '</span>' + '&nbsp;'  +  '<sub>MaxImageWidth</sub>'
              } 
              if (raw_mapserver.supportedExtensions){
              _html_for_more_info_mapserver    += '<br>'+  '<span style="font-size:10.21px; font-weight:100;">&nbsp;' + raw_mapserver.supportedExtensions + '</span>' + '&nbsp;'  +  '<sub>supported extensions</sub>'
              } else {
              _html_for_more_info_mapserver    += '<br>'+ no_icon + '&nbsp;'  +  '<sub>supported extensions</sub>'
              } 
  
              // = = = = =   end  = = = = =   others  = = = = =  = = = = =
  
              /**/


                                             

                                      $('#message_mapserver').html( _html_for_message_mapserver);
                                      $('#message_more_info_mapserver').html( _html_for_more_info_mapserver);


                                      
                                     
                                    
                                     $("#more_info_button_layer").show();
                                     $("#collapse_button_layer").show();
                                     $("#expand_button_layer").show();
                                  
                                      console.log('  layerBrowser . . .       >>> jstree-mapserver json : ', mapserver_alllayers_flatjson)

                              
                                    

                                      
                                      $('#jstree_mapserver')
                                                          // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                                                            //.on('select_node.jstree', function (e, data) {
                                                          .on('changed.jstree', function (e, data) {

                                                        
                                                              
                                                              // only for layer-browser
                                                              $("#select_this_layer_from_tree_window_button").hide()


                                                      
                                                              console.log('  layerBrowser . . .     click select service-layer node event ', data)
                                                              var i, j, _selected_path = [], _selected_text = [], _selected_id = [], _selected_type = [];

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
                                                              console.log('  layerBrowser . . .     Selected id  : ' + _selected_id[0] + "   + text ->   " + _selected_text[0]  + "    + type ->   " +  _selected_type[0] + "    + absolute_path ->   " + _selected_path[0])

                                                           
                                                              update_url_parameter('select_layer', _selected_id[0]);
                                                    update_url_parameter('select_layer_text', _selected_text[0]);


                                               

                                                             

                                                              var _____type = _selected_type[0];
                                                             
                                                              //   "Raster Layer",   "Raster Catalog Layer" 
                                                              if (_____type.includes("Raster")) {

                                                                  _____type = "Raster Layer";
                                                              }





                                                              //switch(_selected_type[0]) {     // this is true value
                                                              switch(_____type) {               // this is generalized value

                                                                  case "MapServer":

                                                                               // _center from arcgis_common, by default, is from mysql table rest_api center lat/long (manually collected value), if missing this value in mysql, 
                                                                               // will calculate it from raw_mapserver_response x, y  extend/2, not accurate some time due to extend is falsy
                                                                              add_view_mapserver_on(_selected_path[0], _selected_text[0], _center._center_lat, _center._center_long,  _center._center_zoom)
                                                                              render_group_layer(_selected_id[0])
                                                                              
                                                                          
                                                                  break;

                                                                  case "FeatureServer":

                                                                                  // _center from arcgis_common, by default, is from mysql table rest_api center lat/long (manually collected value), if missing this value in mysql, 
                                                                                  // will calculate it from raw_mapserver_response x, y  extend/2, not accurate some time due to extend is falsy
                                                                                          add_view_mapserver_on(_selected_path[0], _selected_text[0], _center._center_lat, _center._center_long,  _center._center_zoom)
                                                                                          render_group_layer(_selected_id[0])
                                                                              
                                                                          
                                                                  break;

                                                                  
                                                                  case "Group Layer":
                                                                                      
                                                                                      
                                                                                      // show list of child item, no jstree, only list item
                                                                                      render_group_layer(_selected_id[0])
                                                                                      
                                                                  break;


                                                                  case "Raster Layer": 

                                                                                      console.log('  layerBrowser . . .     render MapServer --> raster layer -->')

                                                                                      // show icon , with jstree_icon
                                                                                      render_raster_layer(_selected_id[0])


                                                                                      // show layer legend
                                                                                      show_legend(_selected_id[0], mapserver_legend)

                                                                  break;







                                                                  // Do not confuse with 'FeatureServer'(no space between),  'Feauter Layer'(have space between)
                                                                  case "Feature Layer": 

                                                                                      console.log('  layerBrowser . . .     render MapServer(featureServer) --> feature layer -->')
                                                                                     
                                                                                      

                                                                                      // show icon , with jstree_icon
                                                                                      render_feature_layer(_selected_id[0])


                                                                                      // show layer legend
                                                                                      show_legend(_selected_id[0], mapserver_legend)


                                                                                     
                                                                                      

                                                                  break;


                                                                  case "VectorTileServer": 

                                                                                     console.log('  layerBrowser . . .     render vector tile server -- #layer# --> ')

                                                                                       // show icon , with jstree_icon
                                                                                      render_vectortile_layer(_selected_id[0])

                                                                                     


                                                                  break;


                                                                  case "ImageServer": 

                                                                                            // show icon , with jstree_icon
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

                                                                              render_geocode_layer(_selected_id[0])


                                                                   break;






                                                                   case "SceneServer": 

                                                                                              // show icon , with jstree_icon
                                                                                      render_scene_layer(_selected_id[0])

                                                                                     


                                                                  break;









                                                                  case "Table": 
                                                                                          // show icon , with jstree_icon
                                                                                          render_table(_selected_id[0])
                                                                  break;





                                                                  case "unknown":     
                                                                  

                                                                                          render_layer_other(_selected_id[0])   


                                                                  break;


                                                              
                                                                  case "Annotation Layer":
                                                                     
                                                                      render_feature_layer(_selected_id[0])
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
                                                              
                                                              
                                                              
                                                              'core' : {

                                                                                  'themes': {
                                                                                      'name': 'proton',
                                                                                      'responsive': true,
                                                                                    // how to remove icon https://stackoverflow.com/questions/16526836/remove-folder-icon-in-jstree-while-using-checkbox 
                                                                                    "icons":false
                                                                                  },
                                                                          

                                                                              'data' : mapserver_alllayers_flatjson





                                                                      } 


                                                          })

                                      


                                 }



/* */




               


                              // 3rd level [right panel]  ----- layer  ------ 
                              var _html_for_message_icon = ''
                              var _html_for_more_info_icon  = ''
                              
                              function jstree_icon(_icons_flatjson,   _link_url, _link_display_text){

                                  

                                          _html_for_message_icon = ''
                                          _html_for_more_info_icon  = ''

                                        
                                          _html_for_message_icon = '     <h3 style="display:inline;"  ><b>  <a target="_blank" id="_layer_link">'  + "<span class='" + open_new_tab_icon +"' aria-hidden='true'></span>&nbsp;"  + _link_display_text + '</a></b></h3>'
                                          _html_for_message_icon    += '<br> <h6 style="display:inline;"  ><sup><a target="_blank" id="_layer_link2">&nbsp;' + _link_url + '</a></sup></h6>'

                                          $('#message_icon').html(_html_for_message_icon);
                                          $('#_layer_link').attr("href",  _link_url + '?f=html');
                                          $('#_layer_link2').attr("href",  _link_url + '?f=html');

                                      
                                          $("#more_info_button_icon").show();

                                          // hide, only for layer-browser-js
                                          $("#collapse_button_icon").hide();
                                          $("#expand_button_icon").hide();
                                          
                                      
                                          console.log('  layerBrowser . . .       >>> jstree-icon flat json : ', _icons_flatjson)

                                          $('#jstree_icon')
                                                              // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event                                                                
                                                              .on('changed.jstree', function (e, data) {

                                                          //.on('select_node.jstree', function (e, data) {


                                                          
                                                                  console.log('  layerBrowser . . .     click icon node event ', data)

                                                                  var i, j, _selected_path = [], 
                                                                              _selected_server_path = [], 
                                                                              _selected_layer_name = [], 
                                                                              _selected_layer_id = [], 
                                                                              _selected_link_type = [],
                                                                              _selected_layer_type = []

                                                                  ;





                                                                  for(i = 0, j = data.selected.length; i < j; i++) {

                                                                      _selected_path.push(data.instance.get_node(data.selected[i]).original.absolute_path);
                                                                      _selected_server_path.push(data.instance.get_node(data.selected[i]).original.server_path);

                                                                      _selected_layer_id.push(data.instance.get_node(data.selected[i]).original.layer_id);
                                                                      // must use .original.type, because re-structured json does not carry our customized field 'type'
                                                                      _selected_link_type.push(data.instance.get_node(data.selected[i]).original.link_type);

                                                                      _selected_layer_name.push(data.instance.get_node(data.selected[i]).original.layer_name);

                                                                      _selected_layer_type.push(data.instance.get_node(data.selected[i]).original.type);
                                                                  }
                                                                  
                                                                  
                                                                  // only get 1st selected node, so always use    _selected_xxxxx[0] 

                                                                  //$('#event_result').html('Selected: ' + r.join(', '));
                                                                  console.log('  layerBrowser . . .     layer id  : ' + _selected_layer_id[0] + "   + layer name  ->   " + _selected_layer_name[0]  + "    + link type ->   " +  _selected_link_type[0] + "    + absolute_path ->   " + _selected_path[0] + "    + server_path ->   " + _selected_server_path[0])

                                                              

                                                                  var _layer_center_lat = _center._center_lat
                                                                  var _layer_center_long = _center._center_long
                                                                  var _layer_center_zoom = _center._center_zoom

                                                                  console.log('  layerBrowser . . .      _layer_center_lat : ', _layer_center_lat, ' _layer_center_long : ', _layer_center_long, ' _layer_center_zoom : ', _layer_center_zoom)


                                                                  switch(_selected_link_type[0]) {


                                                                      case "folder":

                                                                                  
                                                                              // nothing to do    
                                                                              
                                                                      break;

                                                                      
      //  ======= ========   ======= ========  open new tab   ======= ========   ======= ======== 


                                                                      


                                                  //  +++++++++++++++++++++++  google feature layer   +++++++++++++++++++++++ 


                                                                              case "google_classified":

                                                                                  // classified  
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps4/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=17' + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;



                                                                              case "google_classified_image_priority":

                                                                                  // classified  
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps410/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=17' + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;



                                                                              case "google_tile_priority":

                                                                                  // feature layer
                                                                                  var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps120/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;



                                                                              case "google_image_priority_multilayer":

                                                                                  // feature layer
                                                                                  var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps111/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;



                                                                              case "google_searchable":

                                                                                      // feature layer
                                                                                      var  _newTab_link =  url_template_googlemaps + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;


                                                                              case "google_searchable_multilayer":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps11/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;


                                                                              case "google_classified_multilayer":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps411/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;


                                                                              case "google_classified_clickable_multilayer":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps420/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;


                                                                              case "google_2100":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2100/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;

                                                                              // layer-browser need org=
                                                                              case "google_2110":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2110/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] + '&org=' + _organization
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;




                                                                              case "google_data_referencing_same_mapserver":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3000/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;



                                                                              case "google_data_referencing_anywhere":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5000/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;


                                                                              // layer-browser need org=
                                                                              case "google_5010":

                                                                                  // feature layer
                                                                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5010/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] + '&org=' + _organization
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                              break;








                                                                              case "identify_single_layer":

                                                                                              // feature layer
                                                                                              var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps7/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                      
                                                                              break;

                                                                              case "identify_multilayer":

                                                                                          // feature layer
                                                                                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps12/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                  
                                                                                      
                                                                              break;






                                                                              case "google_image_priority":

                                                                                  // feature layer
                                                                                  var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps110/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                              
                                                                      break;



                                                  

                                                  //  +++++++++++++++++++++++ end    +++++++++++++++++++++++  google feature layer   +++++++++++++++++++++++ 




                                                  
                                                  // ^^^^^^^^^^^^^^^^^^^^^  bing  feature layer    ^^^^^^^^^^^^^^^^^^^^^


                                                                      case "bing_cors":

                                                                          var _newTab_link =  url_template_base_bingmaps + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 

                                                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                  
                                                                      break;

                                                                  


                                                  //   ^^^^^^^^^^^^^^^^^^^^^   end   ^^^^^^^^^^^^^^^^^^^^^  bing  feature layer     ^^^^^^^^^^^^^^^^^^^^^




                                                  // %%%%%%%%%%%%%%%%%%%  mapbox  feature layer %%%%%%%%%%%%%%%%%%% 
                                                  

                                                                      case "mapbox_cors":

                                                                          var _newTab_link =  url_template_base_mapbox + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 

                                                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                  
                                                                      break;




                                                  //  %%%%%%%%%%%%%%%%%%%    end  %%%%%%%%%%%%%%%%%%%   mapbox  feature layer   %%%%%%%%%%%%%%%%%%% 





                                                  //  ==============================  esri  feature layer  ==============================  
                                                                                                  

                                                                      case "esri_v4":

                                                                           var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature.html?') +  '&backgroundlayerurl=' + _selected_path[0] 
                                                                          // token
                                                                          if (arcgis_online_token){
                                                                              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                                                         }
                                                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                  
                                                                      break;


                                                                      case "esri_v4_popup":

                                                                          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature.html?') +  '&backgroundlayerurl=' + _selected_path[0] 
                                                                          // token
                                                                          if (arcgis_online_token){
                                                                              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                                                         }
                                                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                  
                                                                      break;



                                                                    

                                                  //  ==============================    end    ==============================    esri  feature layer      ==============================  






                                                  // ################################  table   feature layer   ################################  



                                                                                          case "table_classified":

                                                                                              var _newTab_link =  url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +   '&url=' + _selected_server_path[0] 

                                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                                      
                                                                                          break;


                                                                                          case "table_searchable":

                                                                                              var _newTab_link =  url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +   '&url=' + _selected_server_path[0] 

                                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                                      
                                                                                          break;






                                                                                          case "table_esri":

                                                                                              var _newTab_link =  url_template_arcgis_feature_table + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +   '&url=' + _selected_server_path[0] 

                                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                                      
                                                                                          break;


                                                  //   ################################    end   ################################   table   feature layer   ################################  


                              






                                                  // ..................  google raster layer   ..................  






                          
                                                                          
                                                                          case "google_raster_single_layer":

                                                                              // raster layer
                                                                              var     _newTab_link =  url_template_base_googlemaps_rasterLayer.replace('googlemaps12/default?','googlemaps7/default?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                                                                                                                      
                                                                          break;




                                                                          case "google_raster_multi_layer":
                                                                                                                                                  
                                                                              // raster layer 
                                                                              var _newTab_link =  url_template_base_googlemaps_rasterLayer + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                          break;



                                                                          /*  not use
                                                                          case "google_proxy_raster":

                                                                              // raster layer
                                                                              var  _newTab_link =  url_template_base_googlemaps_rasterLayer.replace('default?','default7?') + '&layer_id=' + _selected_layer_id[0] + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom='+ _layer_center_zoom + '&url=' + _selected_server_path[0] 
                                                                              window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)

                                                                      
                                                                          break;
                                                                          */



                                                  // ..................  end   ..................   google raster layer   ..................  




                          //  ======= ========   ======= ========  VectorTileServer   ======= ========   ======= ======== 

                              //  ..... mapbox .....

                                              case "vectortile_mapbox":

                                                  var _newTab_link =  url_template_base_mapbox_vector_tile_layer + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                          
                                              break;


                                              case "vectortile_mapbox13":

                                                  var _newTab_link =  url_template_base_mapbox_vector_tile_layer.replace('default?','default2?') + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                  window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                          
                                              break;


                              //  ..... esri .....

                                                  // cmv v3.x icon
                                                  case "vectortile_esri_v3":

                                                      var _newTab_link =  url_template_base_esri_vector_tile  + '&title='+ _selected_layer_name[0] +  '&zoom=' + _layer_center_zoom + '&lat='+  _layer_center_lat + '&long='+  _layer_center_long +  '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;


                                                  case "vectortile_esri_v4":

                                                      var _newTab_link =  url_template_base_esri_vector_tile_layer + '&layer='+ _selected_layer_name[0] +  '&_center_lat='+  _layer_center_lat + '&_center_long='+  _layer_center_long + '&_center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;


                                                  case "vectortile_esri_v4_popup":

                                                      var _newTab_link =  url_template_base_esri_vector_tile_layer_popup  + '&layer='+ _selected_layer_name[0] +  '&_center_lat='+  _layer_center_lat + '&_center_long='+  _layer_center_long + '&_center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;



                              //  ..... openlayers .....

                                                  case "vectortile_openlayers":

                                                      var _newTab_link =  url_template_base_openlayers_vector_tile_layer + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;


                                                  case "vectortile_openlayers2":

                                                      var _newTab_link =  url_template_base_openlayers_vector_tile_layer.replace('arcgisvector.html?','arcgisvector2.html?') + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;


                              //  ..... leaflet .....



                                                  case "vectortile_leaflet":

                                                      var _newTab_link =  url_template_base_leaflet_vector_tile_layer + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;


                                                  case "vectortile_leaflet2":

                                                      var _newTab_link =  url_template_base_leaflet_vector_tile_layer.replace('arcgisvector.html?','arcgisvector2.html?') + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                              
                                                  break;



                          //  ======= ========   ======= ========  ImageServer   ======= ========   ======= ======== 

                                  // google maps for imageServer
                                      case "imageServer_googlemaps":

                                          var _newTab_link =  url_template_base_googlemaps_imageServer + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                  
                                      break;



                                      case "imageServer2_googlemaps":

                                          var _newTab_link =  url_template_base_googlemaps_imageServer.replace('googlemaps9/default?', 'googlemaps911/default?') + '&layer='+ _selected_layer_name[0] +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                          window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                                  
                                      break;


                                  // cmv v3.x icon
                                  case "image_esri_v3":

                                      var _newTab_link =  url_template_base_esri3  + '&title='+ _selected_layer_name[0] +  '&zoom=' + _layer_center_zoom + '&lat=' +  _layer_center_lat + '&long='+  _layer_center_long +  '&url=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;


                                  case "image_esri_v4":

                                      var _newTab_link =  url_template_base_esri_imagery_layer + '&layer='+ _selected_layer_name[0] +  '&_center_lat='+  _layer_center_lat + '&_center_long='+  _layer_center_long + '&_center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;


                                  case "image_esri_v4_popup":

                                      var _newTab_link =  url_template_base_esri_imagery_layer_popup  + '&layer='+ _selected_layer_name[0] +  '&_center_lat='+  _layer_center_lat + '&_center_long='+  _layer_center_long + '&_center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;

                      



                          //  ++++++ ++++++ +++++++  GeocodeServer   ++++++ ++++++ +++++++ 

                                  // g26
                                  case "geocodeServer_searchable_googlemaps":

                                      var _newTab_link =  url_template_base_googlemaps_geocodeServer +    '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url2=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;

                                  // g27
                                  case "geocodeServer_imagepriority_googlemaps":

                                      var _newTab_link =  url_template_base_googlemaps_geocodeServer.replace('/googlemaps26/default?','/googlemaps27/default?')  +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url2=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;

                                  // g28
                                  case "geocodeServer_reverse_googlemaps":

                                      var _newTab_link =  url_template_base_googlemaps_geocodeServer.replace('/googlemaps26/default?','/googlemaps28/default?')  +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url2=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;




                          //  ======= ========   ======= ========  SceneServer   ======= ========   ======= ======== 

                                  


                                  case "scene_esri_v4":

                                      var _newTab_link =  url_template_base_esri_scene_layer + '&layer='+ _selected_layer_name[0] +  '&_center_lat='+  _layer_center_lat + '&_center_long='+  _layer_center_long + '&_center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;


                                  case "scene_esri_v4_popup":

                                      var _newTab_link =  url_template_base_esri_scene_layer.replace('scenelayer.html','scenelayer2.html')  + '&layer='+ _selected_layer_name[0] +  '&_center_lat='+  _layer_center_lat + '&_center_long='+  _layer_center_long + '&_center_zoom=' + _layer_center_zoom + '&url=' + _selected_path[0] 

                                      window.open(_newTab_link,'_blank');
    console.log('_newTab_link', _newTab_link)
                                              
                                  break;





                                                                      default:
                                                                          
                                                                  }
                                                                  
                                                                  



                                                              })

                                                              // create the instance $('#xxxx_div').jstree({ })
                                                              .jstree({ 
                                                                  
                                                                  
                                                                  
                                                                  'core' : {

                                                                                      'themes': {
                                                                                          'name': 'proton',
                                                                                          'responsive': true,
                                                                                    // how to remove icon https://stackoverflow.com/questions/16526836/remove-folder-icon-in-jstree-while-using-checkbox 
                                                                                    "icons":false
                                                                                      },
                                                                              


                                                                                  
                                                                                  'data' : _icons_flatjson





                                                                          } 


                                                              })

                                          get_layer_fields(_link_url)
                              }//function






                      // ========  end  ============== jstree =============



/* */









/**/



                              // ........... top level [left panel]  ........ will use jstree --> jstree() [left panel] ...............
                                  /**/
                                  // first time load(one time run), prepare top level folder (flat json array) --> feed to --> jstree() [left panel]
                                  async function scan_root_folder(){

                                      folder_structure_flatjson = []
  
                                      // root
                                      var id_counter = 0;
                                      var current_parent_id_counter;
  
                                      // root item + folder item + service item(mapserver, geocodeserver, etc......)
                                      var flatJson_item; 
                                      var custom_icon, service_name_and_type;
                                  
                                      var _flat = [];     // ... accumulated... mapserver only or feature server only
                                      var _just_get = []  // not accumulat, only the current transaction get
                                      
                                      console.log('  layerBrowser . . .     scan folder structure rest api root url >>>>>  ', root_url)
                                      
                                      // always before await ajax, show ajax url , instead of show progressing bar 
                                      progressing_info('folder', id_counter, root_url);
                                      var root = await ajax_jsonp_cors_proxy(root_url, _timeout_for_tree);
  
                                      console.log('  layerBrowser . . .     raw root response >>>>>  ',root_url,  root)
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
                                                      errorFrom: ""
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
                                                                      
                                                                      
  
  
  
                                                                          // //console.log(stack.count);
                                                                          
                                                                          while(stack.count > 0) {
                                                                                      
                                                                                  
  
  
  
  
                                                                                      // first pop up 'root', because root was first push into the stack(queue), first in stack, first pop up stack 
  
                                                                                      var current = stack.pop();
                                                                                      
  
                                                                                      // console.log('  layerBrowser . . .     current-------',current);
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
                                                                                              progressing_info('folder', id_counter, absolute_path);
  
                                                                                              // this absolute path is for children's absolute path, do not confuse with current(parent) absolute path
                                                                                              // var node =await ajax_getjosn(absolute_path);
                                                                                              var node =await ajax_jsonp_cors_proxy(absolute_path, _timeout_for_tree);  // cross origin method 
                                                                                              
                          
                                                                                              
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
                                                                                      
                                                                                               console.log('  layerBrowser . . .     current_services, folder-id ',current_parent_id_counter,  current_services)
  
                                                                                              for (var i1 = 0; i1 < current_services.length; i1++) {
                                                                                                
                                                                                              
                                                                                              
                                                                                                  //console.log('  layerBrowser . . .     i1-', i1)
                                                                                      
                                                                                      
                                                                                      
                                                                                      
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
                                                                                      
                                                                                      
                                                                                      
                                                                                      
                                                                                      
                                                                                     /* Not need 
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
  
                                                                                                                          
                                                                                                                          var getLatLong_response = await ajax_jsonp_cors_proxy(getLatLong_url, _timeout_for_tree);  
                                                                                                                          
  
                                                                                                                          console.log('  layerBrowser . . .     getLatLong_response.....>',getLatLong_url)
                                                                                                                          console.log('  layerBrowser . . .     getLatLong_response......>',getLatLong_response)
  
  
  
                                                                                                                          if (getLatLong_response !== null){
  
  
  
  
                                                                                                                         
  
  
  
                                                                                                                          /*
                                                                                                                                                // server side projection: (Do not delete, keep)
  
                                                                                                                                                   // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                                                                                                   // _center = await calculate_center_lat_long(getLatLong_response);
  
                                                                                                                                                    // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                                                                                                    _center = await proj4js_centerLatLong(getLatLong_response);
  
  
                                                                                                                                                    
                                                                                                                                                    console.log('  layerBrowser . . .      server side prjection get center ====> ', _center)
                                                                                                                                                    update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                    update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                    if ( _center._center_zoom == null ) {
                                                                                                                                                      update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                    }
                                                                                                                          ////                          
  
  
                                                                                                                                                                                                                                                                  
  
  
  
  
  
  
  
  
  
  
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
  
  
                                                                                          console.log('  layerBrowser . . .     flat push a  _mapServer ', _mapServer)
  
                                                                                          _just_get = []
                                                                                          _just_get.push(_mapServer); 
                                                                                          _flat = _just_get.concat(_flat);
  
  
  
  
                                                                                                  // ********* add service item *********
  
                                                                                                              id_counter += 1;
  
                                                                                                              switch(_current_services_type) {
                                                                                                                  case "MapServer":
                                                                                                                      custom_icon = mapservice_icon
                                                                                                                  break;
  
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
  
                                                                                          //render_mapserver(_selected_id[0])
  
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
                                                                                              
                                                                                              
                                                                                      
                                                                                      
                                                                                                          /* Not need 
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
                                                                                                                                      
  
  
                                                                                                                                          //var getLatLong_response =await ajax_getjosn(getLatLong_url);
                                                                                                                                          var getLatLong_response =await ajax_jsonp_cors_proxy(getLatLong_url, _timeout_for_tree);
                                                                                                                                          
                                                                                                                                          console.log('  layerBrowser . . .     getLatLong_response.....>',getLatLong_url)
                                                                                                                                          console.log('  layerBrowser . . .     getLatLong_response......>',getLatLong_response)
  
  
  
                                                                                                                                          if (getLatLong_response !== null){
  
  
                                                                                                                                       
  
  
                                                                                                                          /*
                                                                                                                                                // server side projection: (Do not delete, keep)
  
                                                                                                                                                   // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                                                                                                   // _center = await calculate_center_lat_long(getLatLong_response);
  
                                                                                                                                                    // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                                                                                                    _center = await proj4js_centerLatLong(getLatLong_response);
  
  
                                                                                                                                                    
                                                                                                                                                    console.log('  layerBrowser . . .      server side prjection get center ====> ', _center)
                                                                                                                                                    update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                    update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                    if ( _center._center_zoom == null ) {
                                                                                                                                                      update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                    }
  
  
                                                                                                                          ////                                                                                                                                          
  
  
  
  
  
  
  
  
  
  
  
  
                                                                                                                                                      // client-side re-projection, no ajax, no geometryServer 
                                                                                                                                                              // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                                                                                                              // await does not works,  we manually set it run how many times
                                                                                                                                                      if (runClientProjectTimes < runClientProjectLimit) {
  
                                                                                                                                                                  runClientProjectTimes += 1;
                                                                                                                                                                  clientSide_project(getLatLong_response)  
                                                                                                                                                      } 
  
  
                                                      
  
  
  
  
  
  
  
                                                                                                                                          }//if
  
  
                                                                                                                          }// if 
                                                                                                              
                                                                                                          // ----  ------- end ------------- only ajax once last map server to calculate center lat long -----
                                                                                                          */
                                                                                                          
                                                                                                          
                                                                                      
                                                                                      
                                                                                      
                                                                                      
                                                                                      
                                                                                      
                                                                                      
                                                                                      // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                                                                                      
                                                                                      
                                                                                      // dynamic CMV
  
                                                              //http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420
  
                                                              //http://ms.transparentgov.net/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420
  
                                                                                      
                                                              
                                                                                          
                                                                                          var absolute_path_service_url = root_url
                                                                                          
                                                                                          
                                                                                          var _relative_path = root_url;
                                                                                      
                                                                                          var _mapServer = {"name": _relative_name,  "type": _current_services_type, "absolute_url":absolute_path_service_url, "relative_path":_relative_path, "center_lat":_center._center_lat, "center_long":_center._center_long };
  
  
                                                                                          console.log('  layerBrowser . . .     flat push a  _mapServer ', _mapServer)
  
                                                                                          _just_get = []
                                                                                          _just_get.push(_mapServer); 
                                                                                          _flat = _just_get.concat(_flat);
  
  
  
  
                                                                                                  // ********* add service item *********
  
                                                                                                              id_counter += 1;
  
                                                                                                              switch(_current_services_type) {
                                                                                                                  case "MapServer":
                                                                                                                      custom_icon = mapservice_icon
                                                                                                                  break;
  
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
                                                                          
                                                                      
  
  
                                                                      jstree_root_folder(folder_structure_flatjson, root_url,  _organization, ___hostname )
  
  
                                                                     
                                      } else if (root.name){
  
                                                  // only for searlayer, searchMapServer, searchAll
                                                  render_single_imageserver_root_folder(root, root_url)
  
                                                  return false;
                        
                                      } else {
                                                 
                                                              
  
                                                  /*
  
                                                                                          bad root:
                                                                                                  {
                                                                                                      absolute_path: "http://www.dot.state.ak.us/ArcGIS/rest/services"
                                                                                                      errorFrom: ""
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
                                              
  
  
  
  
  
                                  }
  
                              // ........... end .......... top level [left panel]  ........ will use jstree --> jstree() [left panel] ...............
  
  
  
  
  
  /**/
  
  



                          // ######### 2nd level [center panel] #########  will use jstree --> jstree_mapserver() [center panel] ######### 


/**/



                                          // when user click a folder, find all sub-item which use this _folder_item_id as their parent id, show sub-item (children item) at service panel (center)
                                          // will not use jstree, only display list collection
                                          function render_folder(_parent_id){


                                             

                                              console.log('  layerBrowser . . .     render  folder  id is ', _parent_id )

                                              $("#more_info_button_layer").hide();
                                              $("#collapse_button_layer").hide();
                                              $("#expand_button_layer").hide();

                                              $("#more_info_button_icon").hide();
                                              $("#collapse_button_icon").hide();
                                              $("#expand_button_icon").hide();

                                              // clear right side mapserver tree
                                              $('#jstree_mapserver').jstree('destroy');
                                              $("#jstree_mapserver").html('');
                                              $('#jstree_icon').jstree('destroy');
                                              $("#jstree_icon").html('');
                                              $("#layer_legend").html('');



                                            
                                          
                                              var list_array = ["<div class='list-group'>"];


                                              for (f = 0; f < folder_structure_flatjson.length; f++) {
                                              
                                                  // if (folder_structure_flatjson[f].parent == _parent_id.toString()) {
                                                  if (folder_structure_flatjson[f].parent == _parent_id) {


                                                                              

                                                                  // no need based on type, always use  onclick='selectFolderLevelItem(id)'
                                                                  // when user click list-collection any type item(group layer, feature layer, or table), always trigger select correspondent node on jstree, so no mather what type is.
                                                                  // just like (equal to) user manually click any jstree node, then follow downstream processing. 

                                                      

                                                                  if (folder_structure_flatjson[f].type == 'folder') {


                                                                          // folder 
                                                                                          
                                                                                      

                                                                                          var _html_tag   = "<a class='list-group-item list-group-item-action' href='javascript:;' onclick='selectFolderLevelItem(" + folder_structure_flatjson[f].id + ");'>";

                                                                                          _html_tag  +=       "<span class='" + folder_structure_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                                          _html_tag  +=       "  " +  folder_structure_flatjson[f].text

                                                                                          _html_tag  +=    "</a>"


                                                                                          list_array.push(_html_tag);
                                                                                  


                                                                  } else {
                                                                          // service , mapserver, etc....
                                                                                          


                                                                                              var _html_tag   = "<a class='list-group-item list-group-item-action' href='javascript:;' onclick='selectFolderLevelItem(" + folder_structure_flatjson[f].id + ");'>";

                                                                                              _html_tag  +=       "<span class='" + folder_structure_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                                              _html_tag  +=       "  " + folder_structure_flatjson[f].text 

                                                                                              _html_tag  +=    "</a>"


                                                                                              list_array.push(_html_tag);
                                                                  }//if

                                                  }//if




                                              }// for 


                                              list_array.push("</div>")

                                              var _test_list_html_content = list_array.join("")
                                              console.log('  layerBrowser . . .     click xxxx folder, show list of map server, not use jstree ', _test_list_html_content)
                                              $("#inside_folder_item_list").html(_test_list_html_content);
                                              



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
                                              console.log('  layerBrowser . . .      parent_folder_itself', parent_folder_itself)


                                              // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                              var _html_for_message_mapserver = '     <h3 style="display:inline;"  ><b>  <a target="_blank" id="_mapserver_link" href="' + parent_folder_full_url + '?f=html">'  + "<span class='" + open_new_tab_icon +"' aria-hidden='true'></span>&nbsp;"  + parent_folder_display_text + '</a></b></h3>'
                                              _html_for_message_mapserver    += '<br> <h6 style="display:inline;"  ><sup><a target="_blank" id="_mapserver_link2" href="' + parent_folder_full_url + '?f=html">' + parent_folder_full_url + '</a></sup></h6>'
                                             
                                              $('#message_mapserver').html(_html_for_message_mapserver);

                                              
                                              
  


                                          }



                                          //  will use jstree  -->  jstree_mapserver() [middle panel]   
                                          //  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
                                          // when user click a mapserver(feature server), ajax, prepare 2nd  level service (flat json array) --> feed to --> jstree_mapserver() [middle panel]
                                          var raw_mapserver  // global var  mapserver json
                                          async function render_mapserver(_parent_id){


                                                          mapserver_flatjson = []


                                                          console.log('  layerBrowser . . .     render 2ndTier-mapserver  id : ', _parent_id )

                                                          console.log('  layerBrowser . . .     render 2ndTier-mapserver  node[id] : ', folder_structure_flatjson[_parent_id])


                                                        
                                                         

                                                          // must destroy last time old tree
                                                          $('#jstree_mapserver').jstree('destroy');
                                                          $("#jstree_mapserver").html('');
                                                          $('#jstree_icon').jstree('destroy');
                                                          $("#jstree_icon").html('');
                                                          $("#layer_legend").html('');


                                                          $("#more_info_button_layer").show();
                                                          $("#collapse_button_layer").show();
                                                          $("#expand_button_layer").show();

                                                          $("#more_info_button_icon").hide();
                                                          $("#collapse_button_icon").hide();
                                                          $("#expand_button_icon").hide();

                                                      


                                                       // frome array[folder_structure_flatjson],  get item,  item.id = _parent_id
                                                      
                                                      var folder_item = folder_structure_flatjson.find(element => element.id == _parent_id);

                                                      console.log('  layerBrowser . . .     folder_item  node[id] : ', folder_item)





                                                          var _url_mapserver = folder_item.absolute_path
                                                            current_singleServerEndpoint_url = _url_mapserver
                                                          console.log('  layerBrowser . . .     render 2ndTier-mapserver url >>>>>  ', _url_mapserver)

                                                                                                                  
                                                          // always before await ajax, show ajax url , instead of show progressing bar 
                                                          progressing_info('layer', 'getting 2ndTier-MapServer...', _url_mapserver);


                                                          
                                                          raw_mapserver =await ajax_jsonp_cors_proxy(_url_mapserver, _timeout_for_tree);
                                                                              
                                                          console.log('  layerBrowser . . .     render 2ndTier-mapserver root response  ', raw_mapserver)

                                                          

                                                         //  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
                                                         //  VectorTileServer, scene server can't use ..../legend must exclude them

                                                         var _lowerCase_mapserverurl = _url_mapserver.toLowerCase();
                                                         if (_lowerCase_mapserverurl.includes('vectortile')){

                                                                      console.log('  layerBrowser . . .      Do not do vector tile legend at  2nd tier , server level  ')
                                                         } else {

                                                                       var  _url_mapserver_legend = _url_mapserver + '/legend'
                                                                          
                                                                          mapserver_legend  =await ajax_jsonp_cors_proxy(_url_mapserver_legend, _timeout_for_tree);
                                                                                              
                                                                          console.log('  layerBrowser . . .      ** mapserver ** legend **  ', mapserver_legend )

                                                         }


                                                         /* Not need 
                                                           // --- --- -- calculate every mapserver center lat long --- ---- -- --

                                                                                        // only calculate center lat long once
                                                                                        // if in URL, no lat,long provided,  arcgis_common_share extract lat lng from URL is null, {_center_lat: null, _center_long: null}
                                                                                        console.log('  layerBrowser . . .     before calculate mapserver center, center is from mysql rest api table, is :  ', _center)

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


                                                                                                                                                
                                                                                                                                                console.log('  layerBrowser . . .      server side prjection get center ====> ', _center)
                                                                                                                                                update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                if ( _center._center_zoom == null ) {
                                                                                                                                                  update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                }


                                                                                                                      ////                                                                                                                                          








                                                                                                                                  // client-side re-projection, no ajax, no geometryServer 
                                                                                                                                             // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                                                                                             // await does not works,  we manually set it run how many times
                                                                                                                                   if (runClientProjectTimes < runClientProjectLimit) {

                                                                                                                                              runClientProjectTimes += 1;
                                                                                                                                              clientSide_project(raw_mapserver) 
                                                                                                                                    } 


                                  









                                                                                                           //   }
                                                                                      
                                                                                      }


                                                           // --- ----- end -- --- --- --- calculate every mapserver center lat long -- --- ---- --
                                                           */




                                                         

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
                                                                                              

                                                                                                              console.log('  layerBrowser . . .       mapserver_layers[l].subLayerIds', l, mapserver_layers[l].subLayerIds)

                                                                                                              var _sublayerids = mapserver_layers[l].subLayerIds

                                                                                                              if (_sublayerids.length >0) {

                                                                                                                              console.log('  layerBrowser . . .       _sublayerids.lenght > 0  ', _sublayerids.length)
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
                                                                              "absolute_path" : mapserver_layers_absolute_path, 
                                                                              "server_path" : current_layer_server_path,
                                                                              "geometryType" :  mapserver_layers_geometryType,               
                                                                              "type" : mapserver_layers_type
                                                                          };


                                                                          mapserver_flatjson.push(layer_item) 
                                                                      
                                                                      } // for

                                                      
                                                        
                                                         } // if layers.length > 0
                                                      } // if layers









                                     // sample feature table test  https://arcgis.tampagov.net/arcgis/rest/services/Metrics/COTMetrics/MapServer
                                     //  http://localhost:10/json2tree/esri/server/folder.html?url=https://arcgis.tampagov.net/arcgis/rest/services/Metrics/COTMetrics/MapServer&select_folder=159&select_layer=



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
                                                                                      _mapserver_tables_display_text =  mapserver_tables_name;     
                                                                                              

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
                                                              jstree_mapserver(mapserver_flatjson, _url_mapserver, mapserver_display_text)


                                                  }else {


                                                      //only have 1 root item, means, no layers:[],  no table:[] , or both are empty, show error,   mapserver url 



                                                      console.log('  layerBrowser . . .       mapserver url error ...>> ',JSON.stringify(raw_mapserver) )

                                                      // show error message, if empty, will show error message too
                                                      render_message_service_panel("No layers/tables found or error, check //console.log for details ")
                                                      //render_message_service_panel(JSON.stringify(raw_mapserver))
                                                  
                                                  }





                                          }






                                          //  will use jstree  -->  jstree_mapserver() [middle panel]   
                                          // for  ---->  VectorTileServer ,   ImageServer  , SceneServer ,....
                                          var raw_mapserver
                                          async function render_singleserver(_parent_id){


                                              mapserver_flatjson = []


                                              console.log('  layerBrowser . . .     render single server  id : ', _parent_id )

                                              console.log('  layerBrowser . . .     render single server  node[id] : ', folder_structure_flatjson[_parent_id])


                                              
                                             

                                              // must destroy last time old tree
                                              $('#jstree_mapserver').jstree('destroy');
                                              $("#jstree_mapserver").html('');
                                              $('#jstree_icon').jstree('destroy');
                                              $("#jstree_icon").html('');
                                              $("#layer_legend").html('');


                                              $("#more_info_button_layer").show();
                                              $("#collapse_button_layer").show();
                                              $("#expand_button_layer").show();

                                              $("#more_info_button_icon").hide();
                                              $("#collapse_button_icon").hide();
                                              $("#expand_button_icon").hide();




                                           // frome array[folder_structure_flatjson],  get item,  item.id = _parent_id
                                                      
                                           var folder_item = folder_structure_flatjson.find(element => element.id == _parent_id);

                                           console.log('  layerBrowser . . .     folder_item  node[id] : ', folder_item)





                                               var _url_mapserver = folder_item.absolute_path
                                                            current_singleServerEndpoint_url = _url_mapserver
                                               console.log('  layerBrowser . . .     render single server url >>>>>  ', _url_mapserver)

                                                                                                       
                                               // always before await ajax, show ajax url , instead of show progressing bar 
                                               progressing_info('single server', 'getting single server...', _url_mapserver);



                                               raw_mapserver =await ajax_jsonp_cors_proxy(_url_mapserver, _timeout_for_tree);
                                                                              
                                                          console.log('  layerBrowser . . .     render single-server root response  ', raw_mapserver)

                                                          




                                                         //  this mapserver means 2nd level 2nd tier, could be imageServer, vectorTileServer, mapServer, featureServer, as long as it is 2nd tier. 
                                                         //  VectorTileServer, scene server can't use ..../legend must exclude them

                                                         var _lowerCase_mapserverurl = _url_mapserver.toLowerCase();
                                                         if (_lowerCase_mapserverurl.includes('vectortile')){

                                                                      console.log('  layerBrowser . . .      Do not do vector tile legend at  2nd tier , server level  ')
                                                         } else {

                                                                       var  _url_mapserver_legend = _url_mapserver + '/legend'
                                                                          
                                                                          mapserver_legend  =await ajax_jsonp_cors_proxy(_url_mapserver_legend,  _timeout_for_tree);
                                                                          console.log('  layerBrowser . . .      ### single-server ### legend ###  ', mapserver_legend )


                                                         }

                                                         





                                                           /*  Not need  
                                                           // --- --- -- calculate every mapserver center lat long --- ---- -- --

                                                                                        // only calculate center lat long once
                                                                                        // if in URL, no lat,long provided,  arcgis_common_share extract lat lng from URL is null, {_center_lat: null, _center_long: null}
                                                                                        console.log('  layerBrowser . . .     before calculate mapserver center, center is from mysql rest api table, is :  ', _center)

                                                                                        if (( _center._center_lat == null ) ||  ( _center._center_long == null )
                                                                                            
                                                                                             || ( _center._center_lat == default_center_lat ) ||  ( _center._center_long == default_center_long )
                                                                             
                                                                                         ){          
                                                                                             
                                                                                          

                                                                                                      if  (
                                                                                                          ((_current_services_type == 'MapServer')||(_current_services_type == 'FeatureServer'))
                                                                                                  
                                                                                                          // must not have'SampleWorldCities'
                                                                                                          // must exclude --- SampleWorldCities ( MapServer ) it always give lat=13 long=-14    https://gismaps.kingcounty.gov/arcgis/rest/services/SampleWorldCities/MapServer
                                                                                                          && (_relative_name.toLowerCase().indexOf("world") == -1)
                                                                                                          
                                                                                                  
                                                                                                      ){








                                                                                                                      /*
                                                                                                                                            // server side projection: (Do not delete, keep)

                                                                                                                                               // both works 1:   ajax --> geometryServer   arcgis rest api project, ( any geometry server)
                                                                                                                                               // _center = await calculate_center_lat_long(raw_mapserver);

                                                                                                                                                // both works 2:  pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369
                                                                                                                                                _center = await proj4js_centerLatLong(raw_mapserver);


                                                                                                                                                
                                                                                                                                                console.log('  layerBrowser . . .      server side prjection get center ====> ', _center)
                                                                                                                                                update_url_parameter('_center_lat', _center._center_lat);
                                                                                                                                                update_url_parameter('_center_long', _center._center_long);
                                                                                                                                                if ( _center._center_zoom == null ) {
                                                                                                                                                  update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                                                                }


                                                                                                                      /////                                                                                                                                          








                                                                                                                                  // client-side re-projection, no ajax, no geometryServer 
                                                                                                                                             // will re project all layers, should just project 1 layers, dojo async require() and async load module, 2 step both are asynchronous, they reflect true center later, cause all layers are projected.
                                                                                                                                             // await does not works,  we manually set it run how many times
                                                                                                                                             if (runClientProjectTimes < runClientProjectLimit) {

                                                                                                                                              runClientProjectTimes += 1;
                                                                                                                                              clientSide_project(raw_mapserver) 
                                                                                                                                    } 


                                  









                                                                                                      }
                                                                                      
                                                                                      }


                                                           // --- ----- end -- --- --- --- calculate every mapserver center lat long -- --- ---- --
                                                           */





                                               var mapserver_display_text = folder_item.text;
                                               var mapserver_icon = folder_item.icon;



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
                                                      "layer_id" :  -1,  
                                                      "type" : folder_item.type

                                                  
                                                  };
                                                  // 1 time, first time run, add root item
                                                  mapserver_flatjson.push(layer_item) 


                                                  //  ....... add  root item  ....... 



                                                  // no other layer, only 1 root item


                                                  jstree_mapserver(mapserver_flatjson, _url_mapserver, mapserver_display_text)

                                                  



                                          }



                                          // no jstree,  only list collection, show "comming soon"
                                          function render_other(_parent_id){


                                             

                                             

                                              $("#more_info_button_layer").hide();
                                              $("#collapse_button_layer").hide();
                                              $("#expand_button_layer").hide();

                                              $("#more_info_button_icon").hide();
                                              $("#collapse_button_icon").hide();
                                              $("#expand_button_icon").hide();

                                              // clear right side mapserver tree
                                              $('#jstree_mapserver').jstree('destroy');
                                              $("#jstree_mapserver").html('');
                                              $('#jstree_icon').jstree('destroy');
                                              $("#jstree_icon").html('');
                                              $("#layer_legend").html('');




                                              

                                              console.log('  layerBrowser . . .     render other id : ', _parent_id )
                                              render_message_service_panel("Coming Soon... ... ...")
                                              
                                          }


                                         // only for layer-browser,   when click any level 1 node, must empty last time level 2 and level 3 html content  
                                          function empty_level2_level3_html_when_click_level1_node(){

                                              $("#inside_folder_item_list").html('');
                                              $("#icon_list").html('');
                                              $("#view_mapserver_on").html('');
                                              $("#message_more_info_mapserver").html('');
                                              $("#coord-sys-mapserver").html('');
                                              $("#json-mapserver").hide();

                                              $("#message_more_info_icon").html('');
                                              
                                              $("#layer_legend").html('');


                                              $("#message_mapserver").html('');
                                              $("#message_icon").html('');


                                              // only for layer-browser
                                              $("#select_this_layer_from_tree_window_button").hide()
                                          }


                          // #########  end   ###################   2nd  level [center panel] #########  will use jstree --> jstree_mapserver() [center panel] ######### 




/**/



                              // %%%%%%%%%%%%% 3rd level [right panel] #########  will use jstree --> jstree_icon() [right panel] ######### 


/**/


                              // will use jstree will feed ---> jstree_icon()
                              // prepare flat json array , will feed ---> jstree_icon()
                              function render_raster_layer(_featurelayer_id) {


                                  icon_flatjson = [];


                                  $("#icon_list").html('');
                                  $("#view_mapserver_on").html('');


                                  // must destroy last time old tree
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');



                                  $("#more_info_button_icon").show();
                                  $("#collapse_button_icon").show();
                                  $("#expand_button_icon").show();


                             // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                              
                             var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)

                                  //  ....... add  root item  ....... 
                                          var icon_item = { 

                                              "id" :  0,     
                                              "parent" : "#",
                                              "text" : layer_item.text,
                                              "layer_name" : layer_item.text,
                                              "icon" : layer_item.icon,  
                                              "link_type": "folder",
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              },

                                             
                                              "node_path" : layer_item.node_path, 
                                              "absolute_path" : layer_item.absolute_path,
                                              "server_path" : layer_item.server_path,
                                              "layer_id" :  layer_item.id,            
                                               "type" : layer_item.type

                                             
                                          };
                                          // 1 time, first time run, add root item
                                          icon_flatjson.push(icon_item) 

                                      
                                  //  ....... add  root item  ....... 

                                  jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)

                              }





/**/

                          

/**/

                               // will use jstree will feed ---> jstree_icon()
                              // prepare flat json array , will feed ---> jstree_icon()
                              // only for layer-browser
                              function render_feature_layer(_featurelayer_id) {


                                 

                                          icon_flatjson = [];


                                          $("#icon_list").html('');
                                          $("#view_mapserver_on").html('');


                                          // must destroy last time old tree
                                          $('#jstree_icon').jstree('destroy');
                                          $("#jstree_icon").html('');
                                          $("#layer_legend").html('');



                                          $("#more_info_button_icon").show();
                                          $("#collapse_button_icon").show();
                                          $("#expand_button_icon").show();


                                     // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                                      
                                     var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                        console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)




                                          //  ....... add  root item  ....... 
                                                  var icon_item = { 

                                                      "id" :  0,     
                                                      "parent" : "#",
                                                      "text" : layer_item.text,
                                                      "layer_name" : layer_item.text,
                                                      "icon" : layer_item.icon,  
                                                      "link_type": "folder",
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      },

                                                     
                                                      "node_path" : layer_item.node_path, 
                                                      "absolute_path" : layer_item.absolute_path,
                                                      "server_path" : layer_item.server_path,
                                                      "layer_id" :  layer_item.id,            
                                                       "type" : layer_item.type

                                                     
                                                  };
                                                  // 1 time, first time run, add root item
                                                  icon_flatjson.push(icon_item) 

                                              
                                          //  ....... add  root item  ....... 



                                          // only for layer-browser
                                          current_selected_layer_url_from_tree_window = layer_item.absolute_path

                                          // only for layer-browser
                                          $("#select_this_layer_from_tree_window_button").show()


                                          jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)

                              }




                              function render_vectortile_layer(_featurelayer_id){

                                  icon_flatjson = [];


                                  $("#icon_list").html('');
                                  $("#view_mapserver_on").html('');


                                  // must destroy last time old tree
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');



                                  $("#more_info_button_icon").show();
                                  $("#collapse_button_icon").show();
                                  $("#expand_button_icon").show();


                                  // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                              
                                  var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                  console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)


                                  //  ....... add  root item  ....... 
                                          var icon_item = { 

                                              "id" :  0,     
                                              "parent" : "#",
                                              "text" : layer_item.text,
                                              "layer_name" : layer_item.text,
                                              "icon" : layer_item.icon,  
                                              "link_type": "folder",
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              },

                                             
                                              "node_path" : layer_item.node_path, 
                                              "absolute_path" : layer_item.absolute_path,
                                              "server_path" : layer_item.server_path,
                                              "layer_id" :  layer_item.id,            
                                               "type" : layer_item.type

                                             
                                          };
                                          // 1 time, first time run, add root item
                                          icon_flatjson.push(icon_item) 

                                      
                                  //  ....... add  root item  ....... 

                                  jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)


                                   // when click vectorTileServer, do not show layer legend yet, should wait until click next layer level, show legend 

                                   show_legend_vectorStyle(layer_item.absolute_path, layer_item.text)

                              }




                              function render_image_layer(_featurelayer_id){

                                  icon_flatjson = [];


                                  $("#icon_list").html('');
                                  $("#view_mapserver_on").html('');


                                  // must destroy last time old tree
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');



                                  $("#more_info_button_icon").show();
                                  $("#collapse_button_icon").show();
                                  $("#expand_button_icon").show();


                                  // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                              
                                  var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                  console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)


                                  //  ....... add  root item  ....... 
                                          var icon_item = { 

                                              "id" :  0,     
                                              "parent" : "#",
                                              "text" : layer_item.text,
                                              "layer_name" : layer_item.text,
                                              "icon" : layer_item.icon,  
                                              "link_type": "folder",
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              },

                                             
                                              "node_path" : layer_item.node_path, 
                                              "absolute_path" : layer_item.absolute_path,
                                              "server_path" : layer_item.server_path,
                                              "layer_id" :  layer_item.id,            
                                               "type" : layer_item.type

                                             
                                          };
                                          // 1 time, first time run, add root item
                                          icon_flatjson.push(icon_item) 

                                      
                                  //  ....... add  root item  ....... 

                                  jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)

                              }

                              function render_geocode_layer(_featurelayer_id){

                                  icon_flatjson = [];


                                  $("#icon_list").html('');
                                  $("#view_mapserver_on").html('');


                                  // must destroy last time old tree
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');



                                  $("#more_info_button_icon").show();
                                  $("#collapse_button_icon").show();
                                  $("#expand_button_icon").show();


                                  // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                              
                                  var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                  console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)


                                  //  ....... add  root item  ....... 
                                          var icon_item = { 

                                              "id" :  0,     
                                              "parent" : "#",
                                              "text" : layer_item.text,
                                              "layer_name" : layer_item.text,
                                              "icon" : layer_item.icon,  
                                              "link_type": "folder",
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              },

                                             
                                              "node_path" : layer_item.node_path, 
                                              "absolute_path" : layer_item.absolute_path,
                                              "server_path" : layer_item.server_path,
                                              "layer_id" :  layer_item.id,            
                                               "type" : layer_item.type

                                             
                                          };
                                          // 1 time, first time run, add root item
                                          icon_flatjson.push(icon_item) 

                                      
                                  //  ....... add  root item  ....... 

                                  jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)

                              }

                              function render_scene_layer(_featurelayer_id){

                                  icon_flatjson = [];


                                  $("#icon_list").html('');
                                  $("#view_mapserver_on").html('');


                                  // must destroy last time old tree
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');



                                  $("#more_info_button_icon").show();
                                  $("#collapse_button_icon").show();
                                  $("#expand_button_icon").show();


                                  // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                              
                                  var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                  console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)


                                  //  ....... add  root item  ....... 
                                          var icon_item = { 

                                              "id" :  0,     
                                              "parent" : "#",
                                              "text" : layer_item.text,
                                              "layer_name" : layer_item.text,
                                              "icon" : layer_item.icon,  
                                              "link_type": "folder",
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              },

                                             
                                              "node_path" : layer_item.node_path, 
                                              "absolute_path" : layer_item.absolute_path,
                                              "server_path" : layer_item.server_path,
                                              "layer_id" :  layer_item.id,            
                                               "type" : layer_item.type

                                             
                                          };
                                          // 1 time, first time run, add root item
                                          icon_flatjson.push(icon_item) 

                                      
                                  //  ....... add  root item  ....... 

                                  jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)
                              }

                              // same as render feature layer, but remove all 'map' section, only keep 'table' section
                              function render_table(_featurelayer_id) {


                                  icon_flatjson = [];


                                  $("#icon_list").html('');
                                  $("#view_mapserver_on").html('');


                                  // must destroy last time old tree
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');



                                  $("#more_info_button_icon").show();
                                  $("#collapse_button_icon").show();
                                  $("#expand_button_icon").show();


                             // frome array[mapserver_flatjson],  get item,  item.id = _featurelayer_id
                                              
                             var layer_item = mapserver_flatjson.find(element => element.id == _featurelayer_id);

                                console.log('  layerBrowser . . .      click layer , layer item ->', _featurelayer_id , layer_item)


                                  //  ....... add  root item  ....... 
                                          var icon_item = { 

                                              "id" :  0,     
                                              "parent" : "#",
                                              "text" : layer_item.text,
                                              "layer_name" : layer_item.text,
                                              "icon" : layer_item.icon,  
                                              "link_type": "folder",
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              },

                                             
                                              "node_path" : layer_item.node_path, 
                                              "absolute_path" : layer_item.absolute_path,
                                              "server_path" : layer_item.server_path,
                                              "layer_id" :  layer_item.id,            
                                               "type" : layer_item.type

                                             
                                          };
                                          // 1 time, first time run, add root item
                                          icon_flatjson.push(icon_item) 

                                      
                                  //  ....... add  root item  ....... 

                                  jstree_icon(icon_flatjson, layer_item.absolute_path,  layer_item.text)

                              }




                               // only when user click mapserver sub-folder( group layer type), list all item.parentid = this grouplayer id
                                // will not use jstree, 
                               function render_group_layer(_grouplayer_id_as_parentid){
                                       

                                  $("#icon_list").html('');
                                  if (_grouplayer_id_as_parentid > -1) {
                                      // not -1, means, not root map server , should empty it
                                      $("#view_mapserver_on").html('');
                                  } else {
                                      // only if -1, means, root map server, show it, nothing to do
                                      
                                  }
                                  

                                  $("#message_icon").html('');
                                  

                                  console.log('  layerBrowser . . .     render (mapserver folder ) group layer id is ', _grouplayer_id_as_parentid )

                                  
                                  $("#more_info_button_icon").hide();
                                  $("#collapse_button_icon").hide();
                                  $("#expand_button_icon").hide();

                                  // clear right side mapserver tree
                               
                                  $('#jstree_icon').jstree('destroy');
                                  $("#jstree_icon").html('');
                                  $("#layer_legend").html('');




                                
                              
                                  var list_array = ["<div class='list-group'>"];











                                  for (f = 0; f < mapserver_flatjson.length; f++) {
                                  
                                     
                                      if (mapserver_flatjson[f].parent == _grouplayer_id_as_parentid) {




                                          // no need based on type, always use  onclick='selectLayerLevelItem(id)'
                                          // when user click list-collection any type item(group layer, feature layer, or table), always trigger select correspondent node on jstree, so no mather what type is.
                                          // just like (equal to) user manually click any jstree node, then follow downstream processing. 



                                          if (mapserver_flatjson[f].type == 'Group Layer') {   

                                              // Group Layer

                                                                  var _html_tag   = "<a class='list-group-item list-group-item-action' href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";

                                                                  _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                  _html_tag  +=       "  " +  mapserver_flatjson[f].text

                                                                  _html_tag  +=    "</a>"
                                                                  _html_tag  +=    "</br>"


                                                                  list_array.push(_html_tag);


                                                          
                                          } else if (mapserver_flatjson[f].type == 'Feature Layer'){

                                             
                                             
                                              // Feature Layer


                                                          var _html_tag   = "<a class='list-group-item list-group-item-action' href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";

                                                          _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                          _html_tag  +=       "  " +  mapserver_flatjson[f].text

                                                          _html_tag  +=    "</a>"
                                                          _html_tag  +=    "</br>"

                                                          list_array.push(_html_tag);



                                          } else if (mapserver_flatjson[f].type == 'Table'){

                                             
                                             
                                              // Table
          
          
                                                                      var _html_tag   = "<a class='list-group-item list-group-item-action' href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";
          
                                                                      _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                                      _html_tag  +=       "  " +  mapserver_flatjson[f].text
          
                                                                      _html_tag  +=    "</a>"
                                                                      _html_tag  +=    "</br>"
          
                                                                      list_array.push(_html_tag);
          
          
          







                                                                

                                          } else {  


                                              // other, 


                                              var _html_tag   = "<a class='list-group-item list-group-item-action' href='javascript:;' onclick='selectLayerLevelItem(" + mapserver_flatjson[f].id + ");'>";
          
                                                          _html_tag  +=       "<span class='" + mapserver_flatjson[f].icon + "' aria-hidden='true'></span>"  
                                                          _html_tag  +=       "  " +  mapserver_flatjson[f].text

                                                          _html_tag  +=    "</a>"
                                                          _html_tag  +=    "</br>"

                                                          list_array.push(_html_tag);



                                          }// type
                                                                     


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

                                  




                                  console.log('  layerBrowser . . .       parent_folder_itself ', parent_folder_itself)
                                  var parent_folder_display_text = parent_folder_itself.text
                                  var parent_folder_full_url = parent_folder_itself.absolute_path
                                  console.log('  layerBrowser . . .       parent_folder_itself  ', parent_folder_itself)


                                 
                                   var _html_icon = '     <h3 style="display:inline;"  ><b>  <a target="_blank" id="_grouplayer_link">'  + "<span class='" + open_new_tab_icon +"' aria-hidden='true'></span>&nbsp;"  + parent_folder_display_text + '</a></b></h3>'
                                   _html_icon    += '<br> <h6 style="display:inline;"  ><sup><a target="_blank" id="_grouplayer_link2">&nbsp;' + parent_folder_full_url + '</a></sup></h6>'
                                     
                                      // _html_icon    += '<br> <h2 style="display:inline;"                   ><sub><b>     &nbsp;Arcgis Server v<big>' + currentVersion + '</big></b></sub></h2>'
                                     
                                   $('#message_icon').html( _html_icon);
                                   
                                   
                                   // must attach '?f=html' at end of url, otherwise vectortile , scene url will use f=json by default 
                                   $('#_grouplayer_link').attr("href",  parent_folder_full_url + '?f=html');
                                   $('#_grouplayer_link2').attr("href",  parent_folder_full_url + '?f=html');

                              }






                                          // no jstree,  only list collection, show "comming soon"
                                          function render_layer_other(_otherlayer_id){


                                              
                                              $("#icon_list").html('');
                                              $("#view_mapserver_on").html('');
                                            
                                              $("#message_icon").html('');

                                             

                                              
                                              $("#more_info_button_icon").hide();
                                              $("#collapse_button_icon").hide();
                                              $("#expand_button_icon").hide();

                                              // clear right side mapserver tree
                                            
                                              $('#jstree_icon').jstree('destroy');
                                              $("#jstree_icon").html('');
                                              $("#layer_legend").html('');




                                              

                                              console.log('  layerBrowser . . .     render other layer id : ', _otherlayer_id )
                                              //render_message_icon_panel("Coming Soon... ... ...")
                                              
                                          }






                                      
                              function add_view_mapserver_on(_mapserver_fullurl, _mapserver_fulltext, _mapserver_center_lat, _mapserver_center_long, _mapserver_center_zoom){





                                  var list_array = ["<div class='list-group'>"];




                                // - - - - - view mapserver on esri  - - - - - 


                                                          // CMV v3.x icon
                                                              var _url_for_link = url_template_base_esri + "&url=" + _mapserver_fullurl + '&title='+ _mapserver_fulltext  +  '&zoom=' + _mapserver_center_zoom + '&lat='+ _mapserver_center_lat +  '&long=' +  _mapserver_center_long   ;
                                                              var _html_tag   = "<a class='list-group-item list-group-item-action' target='_blank' href='" + _url_for_link +"'>";
                                                                  _html_tag  +=       "<span class='" + open_new_tab_icon + "' aria-hidden='true'></span>"  
                                                                  _html_tag  +=       " view " + _mapserver_fulltext + "on ESRI V3.x"
                                                                  _html_tag  +=    "</a>"
                                                              list_array.push(_html_tag);





                                                            // esri v4.x icon, flat, (v4.12 not work) must use v4.11  with highlight, not use sublayer, instead use create new featureLayer
                                                            var _url_for_link = url_template_base_esri_featurelayer_flat + "&url=" + _mapserver_fullurl + '&layer='+ _mapserver_fulltext  +  '&_center_zoom=' + _mapserver_center_zoom + '&_center_lat=' + _mapserver_center_lat +  '&_center_long=' +  _mapserver_center_long   ;
                                                            var _html_tag   = "<a class='list-group-item list-group-item-action' target='_blank' href='" + _url_for_link +"'>";
                                                                  _html_tag  +=       "<span class='" + open_new_tab_icon + "' aria-hidden='true'></span>"  
                                                                  _html_tag  +=       " view " + _mapserver_fulltext + "on ESRI V4.x flat"
                                                                  _html_tag  +=    "</a>"
                                                              list_array.push(_html_tag);


                                                                                                                          
                                                          // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                          var _url_for_link = url_template_base_esri_mapimagelayer_identify + "&url=" + _mapserver_fullurl + '&layer='+ _mapserver_fulltext  +  '&_center_zoom=' + _mapserver_center_zoom + '&_center_lat=' + _mapserver_center_lat +  '&_center_long=' +  _mapserver_center_long   ;
                                                          var _html_tag   = "<a class='list-group-item list-group-item-action' target='_blank' href='" + _url_for_link +"'>";
                                                              _html_tag  +=       "<span class='" + open_new_tab_icon + "' aria-hidden='true'></span>"  
                                                              _html_tag  +=       " view " + _mapserver_fulltext + "on ESRI V4.x non-flat"
                                                              _html_tag  +=    "</a>"
                                                          list_array.push(_html_tag);




                                                          //popup
                                                            // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                            var _url_for_link = url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_popup.') + "&url=" + _mapserver_fullurl + '&layer='+ _mapserver_fulltext  +  '&_center_zoom=' + _mapserver_center_zoom + '&_center_lat=' + _mapserver_center_lat +  '&_center_long=' +  _mapserver_center_long   ;
                                                            var _html_tag   = "<a class='list-group-item list-group-item-action' target='_blank' href='" + _url_for_link +"'>";
                                                                _html_tag  +=       "<span class='" + open_new_tab_icon + "' aria-hidden='true'></span>"  
                                                                _html_tag  +=       " view " + _mapserver_fulltext + "on ESRI V4.x non-flat with popup"
                                                                _html_tag  +=    "</a>"
                                                            list_array.push(_html_tag);

                             // - - - - -  end    - - - - -  view mapserver on esri  - - - - - 










                                   list_array.push("</div>")
                                  $("#view_mapserver_on").html(list_array.join(""));
                                  


                              }



                              // %%%%%%%%%%%%%  end  %%%%%%%%%%%%%%%%%%%  3rd level [right panel] #########  will use jstree --> jstree_icon() [right panel] ######### 






/**/







                  // ------------------------- end -----------------  render  ---- folder --> service --> layer ----------------------







/**/




                      //  ****************  user click/select folder level item *******  layer level item  ******************** 

/**/




                                  // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
                                  function selectFolderLevelItem(folderLevel_id){

                                      console.log('  layerBrowser . . .      **** select folder level id is  ***** ', folderLevel_id )
                                      console.log('  layerBrowser . . .      **** select folder level id is  ***** ', $('#jstree_root_folder').jstree(true) )
                                      $('#jstree_root_folder').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                      $('#jstree_root_folder').jstree(true).select_node(folderLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                      //$('#jstree_root_folder').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                  }







                                  // layer level item could be grouplayer( a folder have many sub layers ) or a feature layer or etc... ( render layer section)
                                  function selectLayerLevelItem(layerLevel_id){

                                      console.log('  layerBrowser . . .      **** select layer level id is  ***** ', layerLevel_id )
                                      $('#jstree_mapserver').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                      $('#jstree_mapserver').jstree(true).select_node(layerLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                                      //$('#jstree_mapserver').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                  }






                         //  ****************  end  ***************   user click/select folder level item *******  layer level item  ******************** 








/* */







/**/



                   // +++++++++++ helper ++++++++++++++

                          function render_message_service_panel(_msg_){

                          // clear right side mapserver tree
                          $('#jstree_mapserver').jstree('destroy');
                          $("#jstree_mapserver").html('');


                          var list_array = ["<div class='list-group'>"];
                      
                          list_array.push("<label>" + _msg_ + "</label>")
                          list_array.push("</div>")
                          $("#inside_folder_item_list").html(list_array.join(""));

                                      

                          }

                          function render_message_icon_panel(_msg_){

                              // clear right side mapserver tree
                              $('#jstree_icon').jstree('destroy');
                              $("#jstree_icon").html('');
                              $("#layer_legend").html('');


                              var list_array = ["<div class='list-group'>"];
                          
                              list_array.push("<label>" + _msg_ + "</label>")
                              list_array.push("</div>")
                              $("#icon_list").html(list_array.join(""));

                                          

                          }

                          function progressing_info(_which_panel, _signal, _info){


                              //console.log(_which_panel, ' ( '+ _signal + ' ) ' + _info)
                                              
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

                          // collapse expand button
                          function ui_event_register(){

                              // by default hide, tile, image, coordinate system status
                              $("#more_info_panel_for_mapserver").hide();


                              // by default show, legend, geodatabase, fields
                              $("#more_info_panel_for_icon").hide();
                             

                                      $("#more_info_button_layer").hide();
                                      $("#collapse_button_layer").hide();
                                      $("#expand_button_layer").hide();

                                      $("#collapse_button_icon").hide();
                                      $("#expand_button_icon").hide();

                                      $("#collapse_button_folder").click(function(){
                                          

                                          $('#jstree_root_folder').jstree('close_all');


                                      }); 

                                      $("#expand_button_folder").click(function(){

                                          $('#jstree_root_folder').jstree('open_all');
                                          
                                      }); 

                                      // only for by default hide, tile, image, coordinate system status
                                      $("#more_info_button_layer").click(function(){

                                          console.log('  layerBrowser . . .      show more info button clicked ')

                                          if ($("#more_info_panel_for_mapserver").is(":hidden")) {
                                              console.log('  layerBrowser . . .      show more info about this layer ')  
                                              $("#more_info_panel_for_mapserver").show()
                                              $("#more_info_button_layer").addClass('copper') // only for by default hide, tile, image, coordinate system status
                                              $("#more_info_button_layer").text('Less Info')

                                          } else {
                                              console.log('  layerBrowser . . .      hide more info about this layer ') 
                                              $("#more_info_panel_for_mapserver").hide()
                                              $("#more_info_button_layer").removeClass('copper')  // only for by default hide, tile, image, coordinate system status
                                              $("#more_info_button_layer").text('More Info')

                                          }
                                          


                                      }); 


                                      $("#collapse_button_layer").click(function(){
                                          

                                          $('#jstree_mapserver').jstree('close_all');


                                      }); 

                                      $("#expand_button_layer").click(function(){

                                          $('#jstree_mapserver').jstree('open_all');
                                          
                                      }); 


                                      // only for by default hide, legend , geodatabase
                                      $("#more_info_button_icon").click(function(){

                                          console.log('  layerBrowser . . .      show more info button clicked  - icon panel')

                                          if ($("#more_info_panel_for_icon").is(":hidden")) {
                                              console.log('  layerBrowser . . .      show more info about this layer ')  
                                              $("#more_info_panel_for_icon").show()
                                             
                                              $("#more_info_button_icon").addClass('copper') // only for by default hide, legend , geodatabase
                                              $("#more_info_button_icon").text('Less Info')

                                          } else {
                                              console.log('  layerBrowser . . .      hide more info about this layer ') 
                                              $("#more_info_panel_for_icon").hide()
                                              
                                              $("#more_info_button_icon").removeClass('copper')  // only for by default hide, legend , geodatabase
                                              $("#more_info_button_icon").text('More Info')

                                          }
                                      }); 



                                      $("#collapse_button_icon").click(function(){
                                          

                                          $('#jstree_icon').jstree('close_all');


                                      }); 

                                      $("#expand_button_icon").click(function(){

                                          $('#jstree_icon').jstree('open_all');
                                          
                                      }); 

                          }


                          // special for arcgis_viewer
                          function proxify_url(_target_url){
                                  return proxyurl + _target_url
                          }
           

                          // 3 level try, jsonp > json(cors) > proxy 
                          async function ajax_jsonp_cors_proxy(_targetURLjsonEndpoint, _custom_timeout){

                              _targetURLjsonEndpoint = _targetURLjsonEndpoint + '?f=json'
                              console.log('  layerBrowser . . .     ajaxjsonpcorsproxy -- add ?f=json ',_targetURLjsonEndpoint)  
                              
                              var _result_response_
                              
                              try{  
                                  _result_response_ = await $.ajax({
                                                  timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                  type: 'GET',
                                                  dataType: 'jsonp',
                                                  url: _targetURLjsonEndpoint,
                                                  error: function (jsonp_error) {
                                                      console.log('  layerBrowser . . .     ajax jsonp failed ', jsonp_error)                                        
                                                  },                        
                                                  success: function (data) {
                                                  }
                                              }); 
                                  } catch(jsonp_error){
                                              try {  
                                                  _result_response_ = await $.ajax({
                                                                                      timeout: _custom_timeout,
                                                                                      url:_targetURLjsonEndpoint,
                                                                                      dataType: 'json',
                                                                                      success: function (data) {
                                                                                      }, // success
                                                                                      error: function (cors_error) {
                                                                                          console.log('  layerBrowser . . .     cors datatype:json failed ', cors_error)                                        
                                                                                      }
                                                                                  });
                                              } catch(cors_error){
                                                  try {
                                                      var _proxified_url = proxify_url(_targetURLjsonEndpoint)
                                                      console.log('  layerBrowser . . .     try ajax proxy = == == == > ',  _proxified_url) 
                                                      _result_response_ = await $.ajax({
                                                                                  timeout: _custom_timeout,
                                                                                  url:_proxified_url,
                                                                                  dataType: 'json',
                                                                                  success: function (data) {
                                                                                  }, // success
                                                                                  error: function (proxy_error) {
                                                                                      console.log('  layerBrowser . . .     proxy failed ', proxy_error)                                        
                                                                                  }
                                                                              });
                                                  } catch(proxy_error){
                                                                              return null
                                                  } //  proxy 
                                              } // cors
                                  } // jsonp

                                  console.log('  layerBrowser . . .      ajaxjsonpcorsproxy -- ', _targetURLjsonEndpoint, _result_response_ )
                                  return _result_response_
                          }// function 







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
              
                                              console.log('  layerBrowser . . .     selected_folderLevel_id',  selected_folderLevel_id)
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



                   // +++++++++++ end ++++++++++  helper ++++++++++++++



/**/




             
/**/



/**/


                      // ~~~~~~~~~~~~ legend , layer-fields ~~~~~~~~~~~~~~~~~

                      /**/
                      // special only for layer-browser,  not use "arcgis_ajax_cross_origin  with _cross", instead use :  ajax_jsonp_cors_proxy(___thislayerurl___, _timeout_for_tree); 

                      /**/
                                      // for mapserver, imageserver, (image legend)   only right panel attach to div 'layer_legend' 
                                      function show_legend(_layer_id_, _all_layer_legend){



                                          console.log('  layerBrowser . . .     find this layer id from all layer legend',_layer_id_,  _all_layer_legend)

                                          
                                          if (_all_layer_legend.layers){

                                                              
                                                                  // array.find()  must be array
                                                                  var _layer_legend = _all_layer_legend.layers.find(el => el.layerId == _layer_id_);

                                                                  console.log('  layerBrowser . . .     current layer legend',_layer_id_,  _layer_legend)


                                                                  if (_layer_legend){
                                                                                                  var _layer_legend_array = _layer_legend.legend;

                                                                                                  var _legend_html = '<fieldset>'
                                                                                                      _legend_html +=  '<legend>' + _layer_legend.layerName +  '</legend>'

                                                                                                      for (var l = 0; l < _layer_legend_array.length; l++) {
                                                                                                      
                                                                                                              _legend_html += '<img src="data:image/png;base64,' + _layer_legend_array[l].imageData + '"></img>&nbsp;'
                                                                                                              _legend_html += '<label>' + _layer_legend_array[l].label + '</label> <br/>'
                                                                                                      

                                                                                                      }// for

                                                                                                      _legend_html += '</fieldset>'

                                                                                                  // console.log('  layerBrowser . . .      legend html ', _legend_html)


                                                                                                      // set html to legend_div
                                                                                                      document.getElementById('layer_legend').innerHTML = _legend_html
                                                                  }
                                                                      

                                      } 


                                      }


                                  

                                      // special only for layer-browser,  not use "arcgis_ajax_cross_origin  with _cross", instead use :  ajax_jsonp_cors_proxy(___thislayerurl___, _timeout_for_tree); 
                                      async function get_layer_fields(___thislayerurl___){

                                          var _thisLayer_fullJSON = await ajax_jsonp_cors_proxy(___thislayerurl___, _timeout_for_tree);  // cross origin method 
                                          console.log('  layerBrowser . . .      this Layer full JSON ', _thisLayer_fullJSON)

                                          
                                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                          if (typeof _thisLayer_fullJSON === 'object') {
                                              // is object
                                              _thisLayer_fullJSON = _thisLayer_fullJSON
                                          } else {
                                              // is string
                                              _thisLayer_fullJSON = JSON.parse(_thisLayer_fullJSON)
                                          }





                                          




                                           // ... ... ...  geodatabase ... yes ... no ...  ... ... ... 

                                  var _advancedQueryCapabilities 

                                  if (_thisLayer_fullJSON.advancedQueryCapabilities){
                                             _advancedQueryCapabilities= _thisLayer_fullJSON.advancedQueryCapabilities





                                             console.log('  layerBrowser . . .      geodatabase,  Yes, or No, ', _thisLayer_fullJSON.supportsAdvancedQueries)
                                             if (_thisLayer_fullJSON.supportsAdvancedQueries){
                                                         // geodatabase, advanced query-> true
                                                         if (_thisLayer_fullJSON.supportsAdvancedQueries == true){
                                                             _html_for_more_info_icon    += '<br>' + yes_icon + '<span style="font-size:10.21px; font-weight:100;">&nbsp;'   + 'GeoDatabase' + '</span>  <sup>available'
                                                             
                                                         }   
                                             } else {
                                                         if (_thisLayer_fullJSON.supportsAdvancedQueries == false){
                                                             _html_for_more_info_icon    += '<br>' + no_icon  + '<span style="font-size:10.21px; font-weight:100;">&nbsp;' +    'GeoDatabase' + '</span>  <sup>NOT available'
                                                             
                                                         } else {
                                                             // advanced query, undefined,  not a feature layer ,  nothing display
                                                             console.log('  layerBrowser . . .     advanced query, undefined,  not a feature layer ,  nothing display')
                                                         }
                                             }

                                             _html_for_more_info_icon    += "</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                             if (_advancedQueryCapabilities.supportsPagination){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')   + 'Pagination' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'Pagination' 
                                             }

                                             if (_advancedQueryCapabilities.supportsStatistics){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'Statistics' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'Statistics' 
                                             }

                                             if (_advancedQueryCapabilities.supportsDistinct){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'Distinct' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'Distinct' 
                                             }

                                             if (_advancedQueryCapabilities.supportsOrderBy){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'OrderBy' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'OrderBy' 
                                             }

                                             if (_advancedQueryCapabilities.supportsHavingClause){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'HavingClause' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'HavingClause' 
                                             }

                                             if (_advancedQueryCapabilities.supportsCountDistinct){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'CountDistinct' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'CountDistinct' 
                                             }

                                             if (_advancedQueryCapabilities.supportsSqlExpression){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'SqlExpression' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'SqlExpression' 
                                             }

                                             if (_advancedQueryCapabilities.supportsQueryWithDistance){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'QueryWithDistance' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'QueryWithDistance' 
                                             }

                                             if (_advancedQueryCapabilities.supportsReturningQueryExtent){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'ReturningQueryExtent' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'ReturningQueryExtent' 
                                             }

                                             if (_advancedQueryCapabilities.useStandardizedQueries){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'StandardizedQueries' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'StandardizedQueries' 
                                             }

                                             if (_advancedQueryCapabilities.supportsTrueCurve){
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  yes_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'TrueCurve' 
                                             } else {
                                                 _html_for_more_info_icon    += "&nbsp;&nbsp;&nbsp;"
                                                 _html_for_more_info_icon    +=  no_icon.replace('width="20" height="20"', 'width="10" height="10"')    + 'TrueCurve' 
                                             }
                                             $('#message_more_info_icon').html(_html_for_more_info_icon);

                                         }// if exist

                                  //  ... ... ...   end ... ... ...  geodatabase ... yes ... no ...  ... ... ...  

                                  /**/


                                         
                                      }






                      // ~~~~~~~~~~~~ end ~~~~~~~~~~  legend  , layer-fields ~~~~~~~~~~~~~~~~~


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
                          


                          console.log('  layerBrowser . . .     layerStyleArray', layerStyleArray)

                          var layerNameArray = []
                          for(let j = 0; j < layerStyleArray.length; j++) {
                          layerNameArray.push(layerStyleArray[j]['source-layer'])
                          }

                          const uniqueLayers = layerNameArray.unique()
                          //console.log('  layerBrowser . . .     uniqueLayers', uniqueLayers)
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
                                          console.log('  layerBrowser . . .     _uniqueLayers', _uniqueLayers)
  
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
  
  
                                                                                          
  
  
  
  
                                                                                          console.log('  layerBrowser . . .     spritePosition',  layerID,  spritePosition)
  
  
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
  
                                          // console.log('  layerBrowser . . .      legend html ', _legend_html)
  
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

                                  


                                  console.log('  layerBrowser . . .      vectorStyle url :  ',  _vectorStyle_url )
                                  console.log('  layerBrowser . . .      vectorStyle resourceInfo url :  ',  _vectorStyle_resourceInfo_url)
                                  console.log('  layerBrowser . . .      sprite json url :  ',  _sprite_json_url )
                                  console.log('  layerBrowser . . .       sprite png url :  ',  _sprite_png_url )
                                  console.log('  layerBrowser . . .      sprite json 2x url :  ',  _sprite_json2x_url )
                                  console.log('  layerBrowser . . .       sprite png 2x url :  ',  _sprite_png2x_url )
                  
                                  var _vectorStyle_json =  await $.ajax({
                  
                                                      // large data take long long time , so should not time out, let it run until get it
                                                      // timeout: _timeout,
                                                      
                                                      type: 'GET',
                                                      dataType: 'jsonp',
                                                      data: {},
                                                      url: _vectorStyle_url,

                                                      error: function (jqXHR, textStatus, errorThrown) {
                                                          
                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                              console.log('  layerBrowser . . .     ajax error  + ', _error_status);
                                                                               
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
                                                                              console.log('  layerBrowser . . .     ajax error  + ', _error_status);
                                                                               
                                                      },


                                                      success: function (data) {
                                                                  
                                                                  // note: data is already json type, you just specify dataType: jsonp
                                                                  //return data;
                                      
                                                      } // success


                                  });  // ajax




                                 // _vectorStyle_json = JSON.parse( _vectorStyle_json)
                                 // _sprite_json = JSON.parse( _sprite_json)

                                  console.log('  layerBrowser . . .     vector style json', _vectorStyle_json)

                                  console.log('  layerBrowser . . .     sprite json', _sprite_json)



                                  vectorStyle_toLegent(_vectorTileLayerName, _vectorStyle_json, _sprite_json, _sprite_png_url, _sprite_json2x_url, _sprite_png2x_url)
                                      
                                                  



                      }





                      function show_legend_vectorStyle(vectorTileServer___url, vectorTileLayerName){

                          // vectorTileServer___url is .../.../VectorTileServer
                          console.log('  layerBrowser . . .      show legend vector style url ', vectorTileServer___url)
                          get_vectorTileStyle(vectorTileServer___url, vectorTileLayerName)

                      }


       // ~~~~~~~~~~~~ legend -- for vector style only --- ~~~~~~~~~~~~~~~~~









          function init_tree(){




              



              scan_root_folder()
              // collapse expand button
              ui_event_register() 

          }

          




          function get_root_url(___mapserver_url_without_layerID){

              // warning:  ___mapserver_url_without_layerID some time have layer id, must substring to "..../rest/services"

              if ((___mapserver_url_without_layerID == undefined) || (___mapserver_url_without_layerID == null) || (___mapserver_url_without_layerID == '')){
                  
                  // nothing to do
                  return null
                  
              } else {

                  
                        
                      ___url = new URL(___mapserver_url_without_layerID);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
              
                      ___protocol = ___url.protocol; //   https:
                      ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                      ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                      ___urlParams = new URLSearchParams(___url.search); //
                      ___pathArray = ___pathname.split('/');


                     
                      // 1).  arcgis server sample :   https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
                      // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]
                      // ___service = https://maps.lacity.org/arcgis/rest/services
                      // do not use, because it only apply 1). not work for 2). 
                      //___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 
                      // 2).  arcgis online hosted sample:  https://services.arcgis.com/f48yV21HSEYeCYMI/arcgis/rest/services
                

                      // substring https:// ... ... .. /rest/services
                      var markText = '/rest/services'
                      var index_of_1st_appear_char = ___mapserver_url_without_layerID.indexOf(markText)
                      var index_of_last_appear_char = index_of_1st_appear_char + markText.length
                    
                      ___service = ___mapserver_url_without_layerID.substring(0, index_of_last_appear_char)






              }// if     

              console.log('  layerBrowser . . .      root url === > ', ___service )
              //_organization = ___hostname
              return ___service

          }










/**/
          // =====  ===== layer-browser-user-interface ===== button-event =====  =====  ===== 


                          function close_browsing_tree_window_button_click_handler(){
                              turn_off_browse_tree_panel()
                              $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                              $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                              $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                              $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                              $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");

                          }


                          function select_this_layer_from_tree_window_button_click_handler(){
                              console.log('  layerBrowser . . .     select this layer, tree,  ', whichBrowseTreeLayer, current_selected_layer_url_from_tree_window)
                              switch(whichBrowseTreeLayer) {
                                  case 0:
                                  // nothing to do, window closed
                                  break;


                                    /**/
                                    // -----  layer-browser ----- json2tree only ----- 
                                    /**/
                                        case 2:
                                        $("#background_layer_url_textarea").val(current_selected_layer_url_from_tree_window)
                                        $("#background_layer_url_textarea").attr('value',current_selected_layer_url_from_tree_window)
                                        break;
                                    /**/
                                    // ----- end  -----  layer-browser ----- json2tree only ----- 
                                    /**/



                                  case 3:
                                  $("#arcgis_layer_url3").val(current_selected_layer_url_from_tree_window)
                                  $("#arcgis_layer_url3").attr('value',current_selected_layer_url_from_tree_window)
                                  break;
                                  case 4:
                                  $("#arcgis_layer_url4").val(current_selected_layer_url_from_tree_window)
                                  $("#arcgis_layer_url4").attr('value',current_selected_layer_url_from_tree_window)
                                  break;
                                  case 5:
                                  $("#arcgis_layer_url5").val(current_selected_layer_url_from_tree_window)
                                  $("#arcgis_layer_url5").attr('value',current_selected_layer_url_from_tree_window)
                                  break;
                                  case 6:
                                  $("#arcgis_layer_url6").val(current_selected_layer_url_from_tree_window)
                                  $("#arcgis_layer_url6").attr('value',current_selected_layer_url_from_tree_window)
                                  break;

                                  default:
                                  // code block
                              }

                          }


                          function browse_tree_btn_layer2_click_handler(event){

                              event.preventDefault(); // To prevent following the link (optional)
                                                  if (browse_tree_panel_status) {
                                                      if ($("#browse_tree_btn_layer2").attr("class") == "select-from-folder-button-turn-on-mode"){
                                                              $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                                              // turn off browse_tree
                                                              turn_off_browse_tree_panel()
                                                      } else {
                                                              $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button-turn-on-mode");
                                                              $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                                              $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                                              $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                                              $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                                              // turn on browse_tree
                                                              turn_on_browse_tree_panel(2)

                                                      }
                                                  } else {
                                                              $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button-turn-on-mode");
                                                              $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                                              $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                                              $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                                              $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");

                                                              // turn on browse_tree
                                                              turn_on_browse_tree_panel(2)
                                                  } // if

                          }


                          function browse_tree_btn_layer3_click_handler(event){

                              event.preventDefault(); // To prevent following the link (optional)
                              if (browse_tree_panel_status) {
                                  if ($("#browse_tree_btn_layer3").attr("class") == "select-from-folder-button-turn-on-mode"){
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                          // turn off browse_tree
                                          turn_off_browse_tree_panel()
                                  } else {
                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button-turn-on-mode");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(3)
                                  }
                              } else {
                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button-turn-on-mode");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(3)
                              } // if


                          }



                          function browse_tree_btn_layer4_click_handler(event){

                              event.preventDefault(); // To prevent following the link (optional)
                              if (browse_tree_panel_status) {
                                  if ($("#browse_tree_btn_layer4").attr("class") == "select-from-folder-button-turn-on-mode"){
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                          // turn off browse_tree
                                          turn_off_browse_tree_panel()
                                  } else {
                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button-turn-on-mode");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(4)
                                  }

                              } else {
                                          
                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button-turn-on-mode");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(4)
                              } // if


                          }

                          function browse_tree_btn_layer5_click_handler(event){

                              event.preventDefault(); // To prevent following the link (optional)
                              if (browse_tree_panel_status) {

                                  if ($("#browse_tree_btn_layer5").attr("class") == "select-from-folder-button-turn-on-mode"){
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          // turn off browse_tree
                                          turn_off_browse_tree_panel()

                                  } else {

                                              $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                              $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                              $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                              $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button-turn-on-mode");
                                              $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                              // turn on browse_tree
                                              turn_on_browse_tree_panel(5)


                                  }

                              } else {
                                          
                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button-turn-on-mode");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(5)
                              } // if


                          }


                          function browse_tree_btn_layer6_click_handler(event){

                              event.preventDefault(); // To prevent following the link (optional)
                              if (browse_tree_panel_status) {

                                  if ($("#browse_tree_btn_layer6").attr("class") == "select-from-folder-button-turn-on-mode"){
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button");
                                          // turn off browse_tree
                                          turn_off_browse_tree_panel()

                                  } else {


                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button-turn-on-mode");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(6)



                                  }
                                  
                                  
                              } else {
                                          
                                          $("#browse_tree_btn_layer2").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer3").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer4").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer5").attr("class", "select-from-folder-button");
                                          $("#browse_tree_btn_layer6").attr("class", "select-from-folder-button-turn-on-mode");
                                          // turn on browse_tree
                                          turn_on_browse_tree_panel(6)
                              } // if

                          }



                          function init_layer_browser_user_interface_event(){

                                          $('#select_this_layer_from_tree_window_button').hide()
                                          $('#select_this_layer_from_tree_window_button').on('click', select_this_layer_from_tree_window_button_click_handler);

                                          $('#close_browsing_tree_window_button').on('click', close_browsing_tree_window_button_click_handler);

                                          turn_off_browse_tree_panel()
                                      
                                          // 2
                                          $('#browse_tree_btn_layer2').on('click', browse_tree_btn_layer2_click_handler);
                                      
                                          // 3
                                          $('#browse_tree_btn_layer3').on('click', browse_tree_btn_layer3_click_handler);
                                      
                                          // 4
                                          $('#browse_tree_btn_layer4').on('click', browse_tree_btn_layer4_click_handler);
                                      
                                          // 5
                                          $('#browse_tree_btn_layer5').on('click', browse_tree_btn_layer5_click_handler);
                                          
                                          // 6
                                          $('#browse_tree_btn_layer6').on('click', browse_tree_btn_layer6_click_handler);
                          }         
    

           // ===== end ===== layer-browser-user-interface ===== button-event =====  =====  ===== 
/**/











// -----  only for geocode g26, g27, g28 layer-browser ----- this is the only difference from original function --------
function init_layer_browser_for_geocode(){


  init_layer_browser_user_interface_event()
  /*
       _url is reserved for reference layer, it could be anywhere url, not need to be the same server. 
       _url2 is geocode url, it is same server. 
      layer-browser by default will use same server as url2
  */

  // _url is mapserver url without ending layer id
  root_url = get_root_url(_url2)  // layer-browser by default will use same server as url2

  init_tree(root_url)

  

}







// -----  layer-browser ----- json2tree only ----- 
function init_layer_browser(_layer_url){
    init_layer_browser_user_interface_event()
    // _url is mapserver url without ending layer id
    root_url = get_root_url(_layer_url)
    init_tree(root_url)
}
// ----- end  -----  layer-browser ----- json2tree only ----- 




