   

// for-loop search is not slow, no need lunr. The slowness is rendering large amount item, already solved by 'scrollable' only show first 100 item until scroll to bottom to load others
// for-loop search 1 field, is simple 1 round loop, no need lunr. Only if full text search, multiple fields, need lunr. Because, for-loop search 10 fields is 10x round loop, will be slow.
   
// no lunr, no suggest, because it use nested recursive json, already complex, do not want more complex. just keep it simple



   // sample use:  
   //http://localhost:10/json2tree/searchMapServer.html?org=City+Of+Los+Angeles&url=https://maps.lacity.org/arcgis/rest/services
   //   org= organization name
   //   url= arcgis server home url
   
   
   
   // dynamic CMV

//http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

//http://ms.transparentgov.net/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                        
   
 
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



                    
                  function rendering_json_to_html(_results) {

                        


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


                                                    
                                      
                                        
                                        
                                        
                                          var _name = _results[i].name;
                                          
                                          
                                          
                                          
                                          
                                        // ....... strip HTML from a string  .....
                                          
                                        
                                              // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
                                        
                                              // ==== first step: remove html tag
                                            
                                              var _name_stripedHtml = $("<div>").html(_name).text();
                                              
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
                                        
                                        var _service_type = _results[i].type;

                                        // text- without link 
                                        html += '<span class="context"><big><b>' + '.&nbsp;&nbsp;&nbsp;' + _name_stripedHtml   + '</b></big></span>' + '&nbsp;&nbsp;<small><sup>' + _service_type +  '</sup></small>'
                                                            
                                                         // only difference server2/searchMapServer  has show details button
                                                         if ($('#detail_container').length){
                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                            //html += '<button id="show_details_btn" class="click_change_style" onclick="show_details(\''   +  _results[i].absolute_url + '\',' +  '-99999' +  ',' +   '\'' +  _name_stripedHtml +  '\','   +  '\'MapServer\''  +')">show details</button>'
                                                            
                                                            var value_param = {
                                                              url:     _results[i].absolute_url,
                                                              layerId: -99999, 
                                                              name:    _name_stripedHtml,
                                                              type:    _service_type
                                                            }
                                                            var value_param_string = JSON.stringify(value_param)
                                                            console.log('value param string', value_param_string)
                                                            html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
                                                            html += '<sup> &#9758; show &#8680; <b><small>' + _service_type + '</small></b></sup>'
                                                            html += '&nbsp;&nbsp;'
                                                          }    
                                                          
                                                          
                                                          //====== original source icon  ======
                                                            html += '&nbsp;&nbsp;'
                                                                  html += '<a target="_blank" href="' + _results[i].absolute_url + '">';
                                                                  html += _results[i].absolute_url; // 'origin'  
                                                                  html +=  '</a>';
                                                            //====== end ===== original source icon  ======
                                                          
                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                      html += '<br>';
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



                              $("input[type='radio'][name='show_details_radio']").change(function(){
                                var _value_string = $( "input[type='radio'][name='show_details_radio']:checked" ).val();
                                console.log('show details radio value string', _value_string)
                                var _value_obj = JSON.parse(_value_string)
                                console.log('show details radio value obj', _value_obj)
                                var param_url = _value_obj.url
                                var param_layerId = _value_obj.layerId
                                var param_name =  _value_obj.name
                                var param_type =  _value_obj.type
                                show_details(param_url, param_layerId, param_name, param_type)
                              });



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
                                                                              _html_org    += '<h3 style="display:inline;"                   ><sup>     &nbsp;Arcgis Enterprise v<big>' + currentVersion + '</big></sup></h2>'
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
        
        //single ImageServer
        /**/
        // text- without link
        html += '<span class="context"><big><b>' + '.&nbsp;&nbsp;&nbsp;' + _name_stripedHtml   + '</b></big></span>' + '&nbsp;&nbsp;<small><sup>'  + 'ImageServer (single layer)' +  '</sup></small>'

        // only difference server2/searchMapServer,  has show details button
        if ($('#detail_container').length){
          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          //html += '<button id="show_details_btn" class="click_change_style" onclick="show_details(\''   +  _imageServer_url + '\',' +  '-99999' +  ',' +   '\'' +  _name_stripedHtml +  '\','   +  '\'ImageServer\''  +')">show details</button>'
          
          var value_param = {
            url:     _imageServer_url,
            layerId: -99999, 
            name:    _name_stripedHtml,
            type:    'ImageServer'
          }
          var value_param_string = JSON.stringify(value_param)
          console.log('value param string', value_param_string)
          html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
          html += '<sup> &#9758; show &#8680; <b><small>ImageServer (single layer)</small></b></sup>'
          html += '&nbsp;&nbsp;'

        }

                                                                                                  
                                                            //====== original source icon  ======
                                                              html += '&nbsp;&nbsp;'
                                                                      html += '<a target="_blank" href="' + _imageServer_url
                                                                      html += '">';
                                                                      html += _imageServer_url;    //'origin'    
                                                                      html +=  '</a>';
                                                              //====== end ===== original source icon  ======

        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                               
                                                                      html += '<br>';
                                                                      html += '</li>';
                                                                      html += '</ol>';
                                                                      html +='</div>'
        
                                                                      $('#json-renderer').html(html);


                                                                      $("input[type='radio'][name='show_details_radio']").change(function(){
                                                                        var _value_string = $( "input[type='radio'][name='show_details_radio']:checked" ).val();
                                                                        console.log('show details radio value string', _value_string)
                                                                        var _value_obj = JSON.parse(_value_string)
                                                                        console.log('show details radio value obj', _value_obj)
                                                                        var param_url = _value_obj.url
                                                                        var param_layerId = _value_obj.layerId
                                                                        var param_name =  _value_obj.name
                                                                        var param_type =  _value_obj.type
                                                                        show_details(param_url, param_layerId, param_name, param_type)
                                                                      });
        
        
                  }
          
          
          
                            
                            

                     //************** recursive streaming ****************************


                     /**/

                                          // special only for MapServer, no need layers,                                                             
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
                                                                                
                                                                                
                                                                                
                                                                                // this is for if the url is a  xxx/MapServer, not the home root xxx/rest/service,  there is special case seattle,   
                                                                                if (current.hasOwnProperty('layers')  && (current.layers !== null ) && (current.layers !== '' )) {


                                                                                   // normally for MapServer, no need "layers" section. 
                                                                                   // however, special case, example seattle _url = xxx/Mapserver, will have 'layers'
                                                                                   // measn current is layers info
                                                                                   // special case, when _url(service type) is xxx/rest/service/xxx/xxx/MapServer ( normally _url(folder type) should be xxx/rest/service )
                                                                                   // must comment out this line, only in here seattle special case
                                                                                  //  var current_layers = current.layers;
                                                                                    
                                                                                      





                                                                                        var _mapserver_url = current.absolute_path
                                                                                        var _relative_path = current.absolute_path
                                                                                    
                                                                                          console.log(' current layer, relative path .....', _relative_path)
                                                                                    
                                                                                      var _mapServer = {"name": current.documentInfo.Title,  "type": "MapServer", "absolute_url":_mapserver_url, "relative_path":_relative_path, "center_lat":_center._center_lat, "center_long":_center._center_long, "center_zoom":_center._center_zoom };

                                                                                      _just_get = []
                                                                                      _just_get.push(_mapServer); 
                                                                                      _flat = _just_get.concat(_flat);

                                                                                  

                                                                                                     // do not show just get or partial results, it will freeze browser not responsive.  
                                                                                                                      //  show_current(_flat, 'input_current')
                                                                                                                      // rendering_json_to_html(_just_get)
                                                                                                                      console.log( 'all services ---> flat  '   ,  _flat.length, _mapServer.relative_path)
                                                                                                                      progressing_info(_flat.length, _mapServer.relative_path);


                                                                                    
                                                                                } // layers
                                                                                
                                                                                
                                                                                
                                                                            
                                                                      
                                                                      
                                                                      
                                                                      
                                                                                
                                                                                
                                                                                
                                                                                // all services ---> flat 
                                                                                if(current.hasOwnProperty('services')  && (current.services !== null ) && (current.services !== '' )){

                                                                                        var current_services = current.services;
                                                                                


                                                                                          for (var i1 = 0; i1 < current_services.length; i1++) {
                                                                                         
                                                                                          
                                                                                            //console.log('i1-', i1)
                                                                                  
                                                                                  
                                                                                  
                                                                                            
                                                                                            //---- fix bug: absolute service/folder name need to convert to relative service/folder name ----
                                                                                            // https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Portland
                                                                                            // service name (Portland/Aerial) is absolute, we only need the "Aerial", not need "Portland/Aerial"
                                                                                            // Portland/Aerial (ImageServer)
                                                                                                
                                                                                                var _absolute_name = current_services[i1].name
                                                                                                var  _absolute_name_array = _absolute_name.split('/');
                                                                                                var  _relative_name = _absolute_name_array[_absolute_name_array.length-1]; // if have /, only need last part after last /
                                                                                                var _current_services_type = current_services[i1].type
                                                                                            //---- end ---- fix bug: absolute service/folder name need to convert to relative service/folder name -----
                                                                                            
                                                                                            
                                                                                  
                                                                                  
                                                                                            
                                                                                              
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                  
                                                                                                  
                                                                                                  
                                                                                                // For service:  _url_path/name/type  --->   https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer
                                                                                                  
                                                                                                  
                                                                                                // dynamic CMV

                                                                          //http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                                                                          //http://ms.transparentgov.net/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

                                                                                                  
                                                                        
                                                                                                    
                                                                                                      var _mapserver_url = current.absolute_path + '/'+ _relative_name +  '/'+_current_services_type
                                                                                                    
                                                                                                    
                                                                                                      var _relative_path = current.relative_path + '/'+ _relative_name +  '/'+_current_services_type;
                                                                                                    
                                                                                                      var _mapServer = {"name": current_services[i1].name,  "type": _current_services_type, "absolute_url":_mapserver_url, "relative_path":_relative_path, "center_lat":_center._center_lat, "center_long":_center._center_long, "center_zoom":_center._center_zoom};



                                                                                                      _just_get = []
                                                                                                      _just_get.push(_mapServer); 
                                                                                                      _flat = _just_get.concat(_flat);

                                                                                 
                                                                                                     
                                                                                                      
                                                                                                     // do not show just get or partial results, it will freeze browser not responsive.  
                                                                                                                      //  show_current(_flat, 'input_current')
                                                                                                                      // rendering_json_to_html(_just_get)
                                                                                                                      console.log( 'all services ---> flat  '   ,  _flat.length, _mapServer.relative_path)
                                                                                                                      progressing_info(_flat.length, _mapServer.relative_path);


                                                                                  
                                                                                          }// for 


                                                                                         
           

                                                                                }  // services
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                // all folders ---> stack
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
                                                                                        
                                                                                }  // folders    
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                        
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


                                                                                // include type, such as MapServer, FeatureServer, etc..   
                                                                                _test_string = input_current[i].name + ' ' + input_current[i].type;

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




                                                                            /**/
                                                      
                                                                            // .............. hide detail  .............. 
                                                                            turn_off_detail_panel()

                                                                            $('#hide_detail_panel').on('click', function(event) {
                                                                                    event.preventDefault(); // To prevent following the link (optional)
                                                                                    turn_off_detail_panel()
                                                                                          
                                                                            });
                                                                      // .............. end   ..............  naming panel  .............. 

                                                                      /**/


                            

              }



                                    //   *******   end  ******   search event related   *******      












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
  
  
  (function($){
  
     

            
            
            init_global_var();

            init_naming_panel_for_mapserver()
            // only for show detail, origin from folder.js
            ui_event_register() 
            
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
