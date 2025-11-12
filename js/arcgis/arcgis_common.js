





var layerID_NAME_separator = ' &#x21E2; '


// default, 
var objectid_field_name = "OBJECTID" // FID ...

// token
var arcgis_online_token = ''           
var param_arcgis_online_token 



var ftOpacity = 0.7 // default

var current_geometryType

// only for init_globle_var()
var param_search
var param_select_level_1
var param_select_level_2
var param_select_level_3

var zoom_to_1st_feature = true;


var param_attachment_image_size
var attachment_image_width_small = 200  // arcgis server will always output 200, even you set w=150 
var attachment_image_width_medium = 600 // arcgis server will always output 600, even you set w=500
var attachment_image_width_large = 1080


var _total_count_of_feature = -2;
    var _current_count_of_feature = -1;

var ___bgurl
var ___bgprotocol
var ___bghostname
var ___bgpathname
var ___bgpathArray
var param_background_layer_url
var param_layer_id
var param_background_mapserver_url
var param_background_type
var param_filter_inVisibleViewOrOverall

var param_overlayOpacity
var param_symbolType  // only for color style   'native'( original ArcMap has whatever color, then default has same color) or  'customized'
var param_labelType    // only for label style   'native'( original ArcMap has label, then default has same label) or  'customized'

var param_strokeColor
var param_strokeWeight
var param_fillColor
var param_pointRadius
var param_outlinePattern
var param_simplefillPattern
var param_simpleMarker

var param_polygonFillBy
var param_click_or_hover
var param_zoom_to_feature_or_not
var param_filterType
var param_pagingFeatureTable
var param_dynamicLabel
var param_quantityFieldName 
var param_colorScale

var param_searchByField


var _center_radius_in_meter

var search_poi_keyword
var param_search_poi_keyword

var _current_location_input_text
var param_current_location_input_text 


  var your_google_api_key
  var param_your_google_api_key
  var your_esrilocation_key
  var param_your_esrilocation_key
  var your_microsoft_api_key
  var param_your_microsoft_api_key

// --- end --- only for init_globle_var()



var input_geocode_endpoint_url = ''
var param_input_geocode_endpoint_url = ''
var input_naserver_endpoint_url = ''
var param_input_naserver_endpoint_url = ''


var esri_dark_theme_white = '#adadad'  // esri dark theme white 
var esri_dark_theme_black = '#242424' // esri dark theme black 


//  --- zoom to feature or not radio button     --- 
var zoom_to_feature_or_not = 'zoom_to_feature'   // 'not_zoom2feature'
var default_zoom_level_for_point = 19
//  --- end  ---  zoom to feature or not radio button    --- 


  var default_opacity = 0.6
  var _opacity = default_opacity
  var param_opacity

  var widget_opacity = 0.91 // 0.7 for on-map widget, off-map, outside map widget must redefine to 0.97
  var param_widget_opacity

 var legend_position =  'outside_mapview' // 'on_mapview' // currently removed option for 'off'
 var printer_position =  'outside_mapview' // 'on_mapview' // currently removed option for 'off'

  var background_mapserver_url // = "https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer"
  var layer_id // = 0
  var background_layer_url // = background_mapserver_url + '/' +  layer_id


        /**/
        // ----- feature layer -----  ----- 
        /**/
              var current_feature_rendered
              var total_feature_count
             
        /**/
        // ----- end  -----  feature layer -----  ----- 
        /**/


var original_color_or_yellow = 'yellow' // 'original_color'
var param_original_color_or_yellow


var options = {};
          
var input = {};

var _timeout = 7000;

var layers_flat;


  var current_url;
  var current_pathname;
  var current_pathArray;
  var linkToPathname = "";
  
  
  var urlParams;
  var ___url_string;
  var ___portal_id;
  
  
  //var _center={"_center_lat": ... , "_center_long": ...};
  var _center={};
    
    
  
var page_size = 10;         // for search result only
var page_sources = [];
var page_size_valueList = 50;         // for value list only
var page_sources_valueList = [];

  // current window protocol is not reliable as true value, because, if mixed content(http img + https), chrome will automatically convert https to http, this cause all down stream template use wrong port
  // template port (http 3000, https 3200) should not binding with current window protocol, instead should binding to target url 
  // not use, but need here, old, history file will use it
    var ____current_window_protocol = window.location.protocol
    
 

  // for example target url = https://geohub.lacity.org,  template protocol should always be https, no matter what
  var template_protocol = 'https:'  // by default, later will adjust as template_protocol = _targetURL_protocol
 




 var  proxyurl_https = "https://transparentgov.net:7200/";
 var  proxyurl_http = "http://transparentgov.net:7000/";  

    
    
 var mouse_pointed_feature_highlight_handle 
 var mouse_pointed_graphic_highlight_handle
    

 var _selected_graphic_in_geojson
 

 

 var radiusMeterForSinglePOI = 30


/**/

                                                // --------- add proxy  --------- 
                                                              var ____current_window_protocol = window.location.protocol

                                                              // default http
                                                              var proxyurl = "http://transparentgov.net:7000/";  

                                                              console.log('____current_window_protocol', ____current_window_protocol)

                                                              if (____current_window_protocol == 'https:') {
                                                              
                                                                proxyurl = "https://transparentgov.net:7200/";
                                                                
                                                              }
                                                  // --------- end  ---------  add proxy  --------- 




/**/





                  /**/
                  // .. - .. - ... scan root or mapserver only   ... - .. - .. 
                  /**/                             
                  var scan_root_or_mapserver_only = 'scan_root'   // default 
                  var param_scan_root_or_mapserver_only                   
                                                  
                  /**/                           
                  // ... - .. - ..  end .. - .. - ... scan root or mapserver only    ... - .. - .. 
                  /**/






                  /**/
                  //  .. - .. - ... zoom to extent or 1st feature   ... - .. - .. 
                  /**/
                  var zoom_to_extent_or_1st_feature = 'zoom_to_1st_feature_of_this_layer'   // default 
                  var param_zoom_to_extent_or_1st_feature 
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... zoom to extent or 1st feature    ... - .. - .. 
                  /**/



       
  // .....url parameter ..... global .......     
  var _organization = 'Arcgis Server';   
  var _center_lat = 33.9288;
  var param_center_lat
  var _center_long = -118.2468 ;
  var param_center_long
  var _center_zoom = 13;
  var param_center_zoom


  
  var ___url;
  var ___protocol  // this is means url paramter protocol  ?..&url=https://....
  var ___hostname 
  var ___pathname 
  var ___urlParams        
  var ___pathArray
  var ___service
  
  
  var _layer
  var _layer_id
  var _layer_name
  

var clicked_graphic_index
var current_queryFeatureResultsAsGraphic_length

							                /**/
                              // ----- color style setting ----- 
                              /**/  
        

                            //--------------- overwrite the mysql theme table id=yellow --------------------
                            /**/


                            // feature layer view higlight option  https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#HighlightOptions
                            var featureLayerView_higlightOption_fillColor = [255, 255, 255, 0.22]
                            var featureLayerView_higlightOption_haloColor =  [0,0,255, 0.95] //blue [244, 187, 68, 0.95] orange, not use this [223, 255, 0, 0.95]yellow 
                            var featureLayerView_higlightOption_haloOpacity = 0.9
                            var featureLayerView_higlightOption_fillOpacity = 0.6

                            // inactive is for easy find overlapping polygon, has thin black stroke line, gray tint fill, like default google geojson  
                            var _inactive_fillColor    =   'rgba(0,0,0,  0.2)';
                            var _inactive_fillOpacity    =  0.8  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                            var _inactive_strokeColor    =  'rgba(0,0,0, 0.95)';   //'black'
                            var _inactive_strokeWeight   =  1
                            var _inactive_pointRadius = 12 
                            var _inactive_pointRadius_px = '12px' // Simple Markerpoint size must be string format '100px'


                                        
                                  // always all time transparent
                                  var  _default_fillColor    =   'rgba(255, 255,255, 0)';   // hex code format NOT support transparency "#00FFFFFF" will not transparent.  
                                        
                                  // azure fill patthern, size must be 2,4, 8, 16, ..
                                  // https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.polygonlayeroptions?view=azure-maps-typescript-latest#azure-maps-control-atlas-polygonlayeroptions-fillpattern
                                  var _default_fillPattern_svg = '<svg width="8px" height="8px" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M2 2v20h20V2zm19 6h-5V3h5zm-6-5v5H9V3zM3 9h5v6H3zm6 0h6v6H9zM8 3v5H3V3zM3 21v-5h5v5zm6-5h6v5H9zm12 5h-5v-5h5zm-5-6V9h5v6z"/><path fill="none" d="M0 0h24v24H0z"/></svg>'
                                  

                                  var   _default_fillOpacity    =  1  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                  var   _default_strokeColor    =  'rgba(255,255,0, 0.95)';   //'yellow'
                                  var   _default_strokeWeight   =  2
                                  
                                  var   _highlight_color =       'rgba(255,0,0, 0.1)';   //'red'
                                  var   _highlight_color_for_esri = [255,0,0, 0.1];   //'red'
                                  var   _highlight_fillOpacity  =  0
                                  var   _highlight_strokeColor  =  'rgba(255,0,0, 0.75)';   //'red'
                                  var   _highlight_strokeWeight =  5
                                  
                                  var   _classfiy_color = 'rgba(0,0,255, 0.1)';   //'blue'
                                  var  _classfiy_fillOpacity   =  0
                                  var  _classfiy_strokeColor   =  'rgba(0,0,255, 0.65)';   //'blue'
                                  var   _classfiy_strokeWeight  =  8
                                  
                                  
                                  var  _font_size = "0.7em";  
                                  var  _thicker_wider_line_over_polygonOrPointOutline = 3

                                  var _default_pointStrokeOpacity = 0.8;

                                  var _default_pointRadius = 4 
                                  var _default_pointRadius_px = '4px' // Simple Markerpoint size must be string format '100px'
                                  
                                  var _highlight_pointRadius = 8  
                                  var _highlight_pointRadius_px = '8px' // Simple Markerpoint size must be string format '100px'
                            
                                  var _classfiy_pointRadius = 12; 
                                  var _classfiy_pointRadius_px = '12px' // Simple Markerpoint size must be string format '100px'
                            
                            
                            //--------------- End ------- overwrite the mysql theme table id=yellow --------------------
                            
 



                            /**/
                           // . . .. . map image layer click square box  . . .. .
                            var square_graphic
                            var square_graphic_geometry
                            var square_graphic_symbol = {
                                                            type: "simple-line", // autocasts as SimpleLineSymbol()
                                                            color: [226, 119, 40, 0.9],
                                                            width: 3,
                                                            style: "short-dot",  // https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html#style
                                                          };
                               
                           
                            var SWlong 
                            var SWlat 
                            var NElong 
                            var NElat 
                            var NW
                            var SW
                            var NE
                            var SE


                            //       - -  -  -  core 16x   - -  -  -
                            var NW_center_lat
                            var NW_center_long
                            var SE_center_lat
                            var SE_center_long


                            var square_graphic_southWest 
                            var square_graphic_southEast 
                            var square_graphic_northEast  
                            var square_graphic_northWest 

                            var zoom_adjust_by   
                            var buffer_tolerance_lat_degree
                            var buffer_tolerance_lng_degree
                            var lat_tolerance_degree_base = 0.000003 // 1 lat degree = 111.32km(always) = 111 319m, 0.0001 lat degree = 11m(always),   precision can tell different home address point. 
                            var lng_tolerance_degree_base = 0.000004 // 1 lng degree = 111km(at lat is 0, equator) = 0km (at lat 90, pole), 0.0001 lng degree = (between 11m - 0m, from equator-pole),   precision can tell different home address point. 
                                 // lat 45 degree, 1 lng degree is 5m, at lat 22.5 degree, 1 lng degree is 2.5m


                            //  . . .. . end . . .. . map image layer click square box  . . .. .
                             /**/
                            





          /**/
          //================================== renderer for graphic =================================================
          /**/


          //  - - - - - inactive   - - - - -
            // polygon
            var inactive_polygon_symbol = {
              type: "simple-fill",  // autocasts as new SimpleFillSymbol()
              color:   _inactive_fillColor,  
              outline: {  // autocasts as new SimpleLineSymbol()
                width: _inactive_strokeWeight,
                color: _inactive_strokeColor,
              }
          };
          // line
          var inactive_polyline_symbol =  {
              type: "simple-line",  // autocasts as new SimpleFillSymbol()
              color: _inactive_strokeColor,
              width: _inactive_strokeWeight
            // style: "short-dot"
          };
          // point
          var inactive_point_symbol = {
              type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
              style: "square",
              color: _inactive_fillColor,
              size: _inactive_pointRadius_px, // Simple Markerpoint size must be string format '100px'
              outline: {  // autocasts as new SimpleLineSymbol()
                  width: _inactive_strokeWeight,
                  color: _inactive_strokeColor,
              }
          };


          //  - - - - - default   - - - - -
            // polygon
            var polygon_symbol = {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color:   _default_fillColor,  
                outline: {  // autocasts as new SimpleLineSymbol()
                  width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                  color: _default_strokeColor,
                }
            };
            // line
            var polyline_symbol =  {
                type: "simple-line",  // autocasts as new SimpleFillSymbol()
                color: _default_strokeColor,
                width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  
              // style: "short-dot"
            };
            // point
            var point_symbol = {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                style: "square",
                color: _default_fillColor,
                size: _default_pointRadius_px, // Simple Markerpoint size must be string format '100px'
                outline: {  // autocasts as new SimpleLineSymbol()
                    width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                    color: _default_strokeColor,
                }
            };



              //  - - - - - highlight  - - - - -
                    // polygon
                    var highlight_polygon_symbol = {
                      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                      color: _classfiy_color, 
                      //style: "solid",
                      outline: {  // autocasts as new SimpleLineSymbol()
                        width: _classfiy_strokeWeight,
                        color: _classfiy_strokeColor, 
                      }
                    };
                    // line
                    var highlight_polyline_symbol =  {
                        type: "simple-line",  // autocasts as new SimpleFillSymbol()
                        color: _classfiy_strokeColor, 
                        width: _classfiy_strokeWeight
                      // style: "short-dot"
                    };
                    // point
                    var highlight_point_symbol = {
                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                        style: "square",
                        color: _classfiy_color,
                        size:  _classfiy_pointRadius_px, // Simple Markerpoint size must be string format '100px' 
                        outline: {  // autocasts as new SimpleLineSymbol()
                            width: _classfiy_strokeWeight,
                            color: _classfiy_strokeColor, 
                        }
                    };



              // highligh client-side featurelayer by override default featurelayer renderer  https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-collection/
              // overrides the layer's default renderer

              var highlight_polygon_renderer = {  // overrides the layer's default renderer
                                                  type: "simple",

                                                  // not work, not sure why, outline did not show, only show fill red color
                                                  //symbol: highlight_polygon_symbol,
                                                  // fixed, just copy highlight_polygon_symbol object to here
                                                  symbol:{
                                                            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                                                            color: _classfiy_color, //[51,51, 204, 0.4],
                                                            //style: "solid",
                                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                              color: _classfiy_strokeColor, //"white",
                                                              width: _classfiy_strokeWeight,// 3
                                                            }
                                                          }
                                                  


                                                }

              var highlight_line_renderer = {  // overrides the layer's default renderer
                                                  type: "simple",  //simple renderer https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html
                                                  
                                                  symbol: highlight_polyline_symbol,
                                                  

              }


               var highlight_point_renderer = {  // overrides the layer's default renderer
                                                type: "simple",  //simple renderer https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html
                                                symbol: highlight_point_symbol,

                                                /* this is picture also works, but click may not work
                                                symbol: {
                                                  type: "text",
                                                  color: "#7A003C",
                                                  text: "\ue661",
                                                  font: {
                                                    size: 60,
                                                    family: "CalciteWebCoreIcons"
                                                  }
                                                }
                                                */


                                              }


          /**/
          //===============  end =================== renderer for graphic =================================================
          /**/

            //  . . .simple fill symbol style . . .

            
                var editor_dynamicLayers_array
                var dynamicLayers_array = {} // must define as object
          

                // REST api, symbol object https://developers.arcgis.com/rest/services-reference/enterprise/symbol-objects/
                var current_outlinePattern = 12  // solid  // esriSLSDash | esriSLSDashDot | esriSLSDashDotDot | esriSLSDot | esriSLSNull | esriSLSSolid
                var pattern_simpleLineSymbol_esriSLS_js_api_array = ['dash', 'dash-dot', 'dot', 'inside-frame', 'long-dash', 'long-dash-dot', 'long-dash-dot-dot', 'none', 'short-dash', 'short-dash-dot', 'short-dash-dot-dot', 'short-dot', 'solid']
                
                var current_simplefillPattern = 7  // esriSFSSolid // esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertica
                var pattern_simpleFillSymbol_esriSFS_js_api_array = ['backward-diagonal', 'cross', 'diagonal-cross', 'forward-diagonal', 'horizontal', 'none', 'solid', 'vertical']
        
                var current_simpleMarker = 3 // circle   //esriSMSCircle | esriSMSCross | esriSMSDiamond | esriSMSSquare | esriSMSX | esriSMSTriangle
                var simpleMarkerSymbol_esriSMS_array = ['circle', 'cross', 'diamond', 'square', 'x', 'triangle']

   

                var overlapIdentify_counter = -1
                var overlapIdentify_pattern_simpleFillSymbol_esriSFS_js_api_array = ['horizontal',  'vertical', 'forward-diagonal', 'backward-diagonal']
                var overlapIdentify_remainder_operand = overlapIdentify_pattern_simpleFillSymbol_esriSFS_js_api_array.length
                //  most of time, only use red, blue, yellow, which can have 12 layers overlap
                var overlapIdentify_color_array = ['rgba(255, 68, 51, 0.95)',   // red
                                                   'rgba(0, 0, 255, 0.95)',     // blue
                                                   'rgba(223, 255, 0, 0.95)',   // yellow

                                                   'rgba(250, 249, 246, 0.95)', // white,
                                                   'rgba(25, 25, 112, 0.95)',   // black,

                                                   'rgba(124, 252, 0, 0.95)',   // green, 
                                                   'rgba(191, 64, 191, 0.95)',   // purple, 
                                                   'rgba(255, 172, 28, 0.95)',   // orange,
                                                   'rgba(255, 182, 193, 0.95)',   // pink,
                                                  ]
            // . . . end . . . simple fill symbol style



 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  



 
  
  
  // scene view camera  https://developers.arcgis.com/javascript/latest/api-reference/esri-Camera.html#position
  var _tilt = 75;    // 0 look down, 90 look parallel to surface
  var _heading = 0;  // default is 0, heading north,  90 for east
  var _altitude = 1000;  // altitude in meters
  
  

  // font and color(must have)
  var _font_size              =  "0.7em"
    


  var _panto = 1 // default is 1, without _panto means 1,    0 means, not pan to real location  
  
  






        /**/
        //------------ search feature --------
          var _feature_attributes =[];
          var _feature_attributes_string =[];
          var _feature_attributes_integer =[];
          var _feature_attributes_double =[];
          var _feature_attributes_date =[];
        //---------  End --- search feature --------


        var current_object_id_field_name ='OBJECTID'  

        // ... lunr.js  ... 
              var idx
              var lunr_index
              /*
                    ---In a shapefile, the 'FID' field contains the ObjectID, and the values start at zero.
                    ---In a geodatabase feature class or standalone table within a geodatabase, the 'OBJECTID' field contains the ObjectID, and the values start at one.
                    ---In a standalone dBase table, the 'OID' field contains the ObjectID, and the values start at zero.
                    if FID exist, use it, if not exist, try OID, , if not, try OBJECTID.
                    FID for shape file,
                    OBJECTID for geodatabase
                    OID for dBase table
              */  
              // case sensitive, arcgis usually use uppercase, socrata use lowercase, that is why we have all possible mix of uppercase and lowercase 
              var possible_idx_field_name_array = [
                                                    // possible field name in arcgis 
                                                    'OID','FID','OBJECTID',
                                                    'oid','fid','objectid', 
                                                    'Oid','Fid','Objectid',
                                                    'oID','fID','objectID',
                                                    'ObjectID',

                                                    // possible field name in socrata
                                                    'id', 'ID', 'Id'  
                                                  ]

              var idx_reference_field='lunr_id'; 
        //  ...  end ... lunr.js  ...  

          /**/
          //   *****  classified , filter by     *****
          
                                   

                                                                  var _supportsAdvancedQueries  = false;

                                                                  var _supportsCountDistinct  = false;
                                                                  var _supportsDistinct = false;
                                                                  var _supportsHavingClause = false;
                                                                  var _supportsOrderBy = false;
                                                                  var _supportsPagination = false;
                                                                  var _useStandardizedQueries = false;
                                                                  var _supportsStatistics = false;
                                                                  var _supportsTrueCurve = false;
                                                                  var _supportsReturningQueryExtent = false;
                                                                  var _supportsQueryWithDistance = false;

                                                                  var _supportsQueryWithResultType = false
                              
                              
                              
                var field_alias = {}
                var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
                var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                var field_value = []
                var flatJson_item
                var fieldValue_flatjson
                var field_structure_flatjson = []


                var current_selected_field_type = 'text'
                var current_selected_field_name = 'showall'
                var current_selected_field_value = 'showall'
                var current_selected_field_name_tag_id = -2
                var current_selected_field_value_tag_id = -2


          //   *****  end     *****   classified , filter by     *****  



                        /**/
                        //  ... ... .. ... order by field name  ... ... .. ... 
                        /**/
                                
                        var field_name_order_by_alphabetic_ascending = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                        var field_name_order_by_alphabetic_descending = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                        var orderby_fieldname = 'orderby_fieldname_default'  // same as radio value 'orderby_fieldname_alphabetic_ascending'  'orderby_fieldname_alphabetic_descending'   
                        /**/
                        //  ... end ... ... .. ... order by field name  ... ... .. ...
                        /**/












               /**/
               //  ---  uds only   --- 
               /**/
                     var param_tool_type

			         /**/
               //  --- end  ---  uds only   --- 
               /**/





/**/        
//  bootstrap 5 icon ,  color name and code see .css ,  https://icons.getbootstrap.com/#install
   
 var folder_icon = "" //"bi bi-folder2-open blue_green";
            var folder_fill_icon = "" //"bi bi-folder-fill blue_green";
            var folder_check_icon = "" //"bi bi-folder-check blue_green";
            var open_new_tab_icon = "" //"bi bi-box-arrow-up-right glaucous";
            var fieldNameAlias_icon = "" //"bi bi-cloud-moon glaucous";
            var fieldName_icon = "" //"bi bi-cloud-sun glaucous";
            var displayfieldName_icon = "" //"bi bi-cloud-sun-fill glaucous";
            var fieldType_icon = "" //"bi bi-box glaucous";
            var fieldDomain_icon = "" //"bi bi-droplet-half glaucous";
            var fieldRoot_icon = "" //"bi bi-brightness-high glaucous";

/*
//var yes_icon = "bi bi-check-square-fill moss_green";
//var no_icon = "bi bi-x-circle black";

svg
https://icons.getbootstrap.com/icons/check-square-fill/
https://icons.getbootstrap.com/icons/x-circle/
*/
var yes_icon ='<svg fill="#00FF00" width="14px" height="14px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="green" d="M13 4.1974q0 .3097-.21677.5265L7.17806 10.329l-1.0529 1.0529q-.21677.2168-.52645.2168-.30968 0-.52645-.2168L4.01935 10.329 1.21677 7.5264Q1 7.3097 1 7t.21677-.5265l1.05291-1.0529q.21677-.2167.52645-.2167.30968 0 .52645.2167l2.27613 2.2839 5.07871-5.0864q.21677-.2168.52645-.2168.30968 0 .52645.2168l1.05291 1.0529Q13 3.8877 13 4.1974z"/></svg>'
var no_icon = '<svg fill="#FF0000" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <rect x="0" fill="none" width="20" height="20"/> <g> <path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"/> </g> </svg>'
var warning_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.88 111.54"><defs><style>.cls-1{fill:#cf1f25;}.cls-2{fill:#fec901;fill-rule:evenodd;}.cls-3{fill:#010101;}</style></defs><title>warning</title><path class="cls-1" d="M2.35,84.42,45.28,10.2l.17-.27h0A23,23,0,0,1,52.5,2.69,17,17,0,0,1,61.57,0a16.7,16.7,0,0,1,9.11,2.69,22.79,22.79,0,0,1,7,7.26q.19.32.36.63l42.23,73.34.24.44h0a22.48,22.48,0,0,1,2.37,10.19,17.63,17.63,0,0,1-2.17,8.35,15.94,15.94,0,0,1-6.93,6.6c-.19.1-.39.18-.58.26a21.19,21.19,0,0,1-9.11,1.75v0H17.61c-.22,0-.44,0-.65,0a18.07,18.07,0,0,1-6.2-1.15A16.42,16.42,0,0,1,3,104.24a17.53,17.53,0,0,1-3-9.57,23,23,0,0,1,1.57-8.74,7.66,7.66,0,0,1,.77-1.51Z"/><path class="cls-2" d="M9,88.75,52.12,14.16c5.24-8.25,13.54-8.46,18.87,0l42.43,73.69c3.39,6.81,1.71,16-9.33,15.77H17.61C10.35,103.8,5.67,97.43,9,88.75Z"/><path class="cls-3" d="M57.57,83.78A5.53,5.53,0,0,1,61,82.2a5.6,5.6,0,0,1,2.4.36,5.7,5.7,0,0,1,2,1.3,5.56,5.56,0,0,1,1.54,5,6.23,6.23,0,0,1-.42,1.35,5.57,5.57,0,0,1-5.22,3.26,5.72,5.72,0,0,1-2.27-.53A5.51,5.51,0,0,1,56.28,90a5.18,5.18,0,0,1-.36-1.27,5.83,5.83,0,0,1-.06-1.31h0a6.53,6.53,0,0,1,.57-2,4.7,4.7,0,0,1,1.14-1.56Zm8.15-10.24c-.19,4.79-8.31,4.8-8.49,0-.82-8.21-2.92-29.34-2.86-37.05.07-2.38,2-3.79,4.56-4.33a12.83,12.83,0,0,1,5,0c2.61.56,4.65,2,4.65,4.44v.24L65.72,73.54Z"/></svg>'
var info_icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" fill="blue" viewBox="0 0 122.88 122.88" enable-background="new 0 0 122.88 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M61.44,0c33.926,0,61.44,27.514,61.44,61.44c0,33.926-27.514,61.439-61.44,61.439 C27.513,122.88,0,95.366,0,61.44C0,27.514,27.513,0,61.44,0L61.44,0z M79.42,98.215H43.46v-6.053h6.757v-36.96H43.46v-4.816h16.808 c4.245,0,8.422-0.51,12.549-1.551v43.328h6.604V98.215L79.42,98.215z M63.859,21.078c2.785,0,4.975,0.805,6.571,2.396 c1.579,1.59,2.377,3.771,2.377,6.581c0,2.848-1.358,5.381-4.093,7.601c-2.751,2.22-5.941,3.338-9.577,3.338 c-2.733,0-4.905-0.765-6.569-2.297c-1.665-1.551-2.497-3.556-2.497-6.05c0-3.143,1.358-5.853,4.059-8.152 C56.83,22.219,60.072,21.078,63.859,21.078L63.859,21.078z"/></g></svg>'
var my_location = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.36328 12.0523C4.01081 11.5711 3.33457 11.3304 3.13309 10.9655C2.95849 10.6492 2.95032 10.2673 3.11124 9.94388C3.29694 9.57063 3.96228 9.30132 5.29295 8.76272L17.8356 3.68594C19.1461 3.15547 19.8014 2.89024 20.2154 3.02623C20.5747 3.14427 20.8565 3.42608 20.9746 3.7854C21.1106 4.19937 20.8453 4.85465 20.3149 6.16521L15.2381 18.7078C14.6995 20.0385 14.4302 20.7039 14.0569 20.8896C13.7335 21.0505 13.3516 21.0423 13.0353 20.8677C12.6704 20.6662 12.4297 19.99 11.9485 18.6375L10.4751 14.4967C10.3815 14.2336 10.3347 14.102 10.2582 13.9922C10.1905 13.8948 10.106 13.8103 10.0086 13.7426C9.89876 13.6661 9.76719 13.6193 9.50407 13.5257L5.36328 12.0523Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
var search_icon = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

// html unicode, you can change color with span css, seems not work.
            //var yes_icon ='<span style="color: lime;">&#128077;</span>'
//var no_icon = '&#9940;'


var mapservice_icon = "bi bi-layers" //"bi bi-folder-plus"
var GroupLayer_icon = "bi bi-layers-half"
var polygon_icon = "bi bi-pentagon" // "bi bi-heptagon"
var line_icon = "bi bi-slash-lg"
var point_icon = "bi bi-geo-alt"
var layer_icon = "bi bi-play-btn cadmium_green";
var table_icon = "bi bi-table";
var coming_icon = "bi bi-exclamation-circle blue_green";

// -123 means void, blank icon, for everything other than map-server, feature-server, feature-layer
var VectorTileServer_icon = "bi bi-map-fill"
var ImageServer_icon = "bi bi-images"
var SceneServer_icon = "bi bi-map"
var GeocodeServer_icon = "bi bi-cursor" //"bi bi-pin-map"
var NAServer_icon = "bi bi-sign-turn-right"
var unknow_server_icon = "bi bi-stack"

var AnnotationLayer_icon = "bi bi-play-fill taupe"
var RasterLayer_icon = "bi bi-file-earmark-image"
var RasterCatalogLayer_icon = "bi bi-heptagon"
var MosaicLayer_icon = "bi bi-play-fill taupe"
var unknow_layer_icon = "bi bi-layers-fill"
var unknow_geometry_icon = "bi bi-triangle"

//  - end - bootstrap 5 icon ,
/**/

              /**/
              //   ........... 18 color ...........

                            /* 18 color  from https://htmlcolorcodes.com/   

                            esri, color foramt "color":[51,51,51,255],  https://developers.arcgis.com/web-map-specification/objects/esriTS_symbol/
                              Color is represented as a four-element array. The four elements represent values for red, green, blue, and alpha in that order. Values range from 0 through 255. If color is undefined for a symbol, the color value is null.
                            rgba,    Alpha 0 - 255 ... where as alpha = 0 means - ---- completely transparent.  255 means complete opaque.
                            */
                          
                            var esri_rgba_color_array = [


                                          [0,0,0, 255],  // black
                                          [0, 0, 255, 255],  // blue
                                          [255, 0, 0, 255],   // red
                                          [0, 128, 0, 255],   // green
                                          [0, 0, 128, 255],   // navy
                                          [128, 0, 0, 255],   // Maroon
                                          [128, 0, 128, 255], // Purple
                                          [0, 128, 128, 255], // teal
                                          [255, 0, 255, 255], // Fuchsia
                                          [0, 255, 0, 255], // Lime
                                          [0, 255, 255, 255], // Aqua
                                                    

                                                    // popular color
                                                    [204, 204, 255, 255], // Periwinkle
                                                    [255, 191, 0, 255],   // Amber 
                                                    [159, 226, 191, 255],  // Seafoam Green
                                                    [100, 149, 237, 255],  // Cornflower Blue
                                                    [222, 49, 99, 255],    // Cerise
                                                    [64, 224, 208, 255],   // Turquoise
                                                    [255, 127, 80, 255],   // Coral
                                                    [223, 255, 0, 255],    // Chartreuse

                                          [255,255,255, 255],  // white
                                          [255,255,255, 0],  //nocolor
                                ]; 




                                var css_rgba_color_array = [


                                'rgba(0,0,0, 0.9)',  // black
                                'rgba(0, 0, 255, 0.9)',  // blue
                                'rgba(255, 0, 0, 0.9)',   // red
                                'rgba(0, 128, 0, 0.9)',   // green
                                'rgba(0, 0, 128, 0.9)',   // navy
                                'rgba(128, 0, 0, 0.9)',   // Maroon
                                'rgba(128, 0, 128, 0.9)', // Purple
                                'rgba(0, 128, 128, 0.9)', // teal
                                'rgba(255, 0, 255, 0.9)', // Fuchsia
                                'rgba(0, 255, 0, 0.9)', // Lime
                                'rgba(0, 255, 255, 0.9)', // Aqua


                                // popular color
                                'rgba(204, 204, 255, 0.9)',   // Periwinkle
                                'rgba(255, 191, 0, 0.9)',     // Amber 
                                'rgba(159, 226, 191, 0.9)',   // Seafoam Green
                                'rgba(100, 149, 237, 0.9)',   // Cornflower Blue
                                'rgba(222, 49, 99, 0.9)',     // Cerise
                                'rgba(64, 224, 208, 0.9)',    // Turquoise
                                'rgba(255, 127, 80, 0.9)',    // Coral
                                'rgba(223, 255, 0, 0.9)',     // Chartreuse

                                'rgba(255,255,255, 0.9)',  // white
                                'rgba(255,255,255, 0)',  //nocolor

                                ]; 


                                var color_name_array = [


                                  'Black',
                                  'Blue',
                                  'Red',
                                  'Green',
                                  'Navy',
                                  'Maroon',
                                  'Purple',
                                  'Teal',
                                  'Fuchsia',
                                  'Lime',
                                  'Aqua',
                                            

                                            // popular color
                                            'Periwinkle',
                                            'Amber', 
                                            'SeafoamGreen',
                                            'CornflowerBlue',
                                            'Cerise',
                                            'Turquoise',
                                            'Coral',
                                            'Chartreuse',

                                  'White',  
                                  'NoColor',          
                                ]; 

                  // ........... end  ........... 18 color ...........
                  /**/






                  /**/
                  //   --- --- --- --- color scale  --- --- --- ---
                  /**/



                  var esri_possible_numeric_field_type_array = ['esriFieldTypeBigInteger', 'esriFieldTypeDouble', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeSmallInteger']

                  // 5 class, element 0 is not used,
                  var line_stroke_weight = [1,2,5,10,15,20]
                  var point_marker_size_radius = [1,5,10,15,20,25]
                  
                                 
                  
                
                  var color_scale_outline_width = 1
                  var color_scale_outline_color = 'rgba(0,0,0, 0.9)'  // black


                  var color_scale_name_index = [
                      
                      'colorScale_red',
                      'colorScale_blue',
                      'colorScale_pink',
                      'colorScale_purple',
                      'colorScale_orange',
                      'colorScale_violet',
                      'colorScale_yellow',
                      'colorScale_slateblue',
                      'colorScale_green',
                      'colorScale_brown',
                      'colorScale_teal',
                      'colorScale_turquoise',
                      'colorScale_tan',
                      'colorScale_gray',

                  ];

                  var color_scale = {

                   
                    
                      
                      'colorScale_red': [
                              'rgba(255, 160, 122, 0.98)',   // LightSalmon
                              'rgba(250, 128, 114, 0.98)',   // Salmon
                              'rgba(205, 92, 92, 0.98)',   // IndianRed
                              'rgba(255, 0, 0, 0.98)',   // Red
                              'rgba(178, 34, 34, 0.98)',   // FireBrick
                              'rgba(139, 0, 0, 0.98)',   // DarkRed
                            ],


                      'colorScale_blue' :[
                              'rgba(135, 206, 250, 0.98)',   // LightSkyBlue
                              'rgba(135, 206, 250, 0.98)',   // LightSkyBlue
                              'rgba(0, 191, 255, 0.98)',   // DeepSkyBlue
                              'rgba(0, 0, 255, 0.98)',   // Blue
                              'rgba(0, 0, 169, 0.98)',   // DarkBlue
                              'rgba(0, 0, 98, 0.98)',   // Navy
                            ],



                      'colorScale_pink' :[
                                'rgba(255, 182, 193, 0.98)',   // LightPink
                                'rgba(255, 192, 203, 0.98)',   // Pink
                                'rgba(255, 105, 180, 0.98)',   // HotPink
                                'rgba(255, 20, 147, 0.98)',   // DeepPink
                                'rgba(219, 112, 147, 0.98)',   // PaleVioletRed
                                'rgba(199, 21, 133, 0.98)',   // MediumVioletRed
                              ], 


                     'colorScale_purple' :[
                                'rgba(230, 230, 250, 0.98)',   // Lavender
                                'rgba(230, 230, 250, 0.98)',   // Lavender
                                'rgba(221, 160, 221, 0.98)',   // Plum
                                'rgba(255, 0, 255, 0.98)',   // Fuchsia
                                'rgba(147, 112, 219, 0.98)',   // MediumPurple
                                'rgba(128, 0, 128, 0.98)',   // Purple
                              ],



                      'colorScale_orange' :[
                                    'rgba(255, 127, 80, 0.98)',   // Coral
                                    'rgba(255, 160, 122, 0.98)',   // LightSalmon
                                    'rgba(255, 165, 0, 0.98)',   // Orange
                                    
                                    'rgba(255, 140, 0, 0.98)',   // DarkOrange
                                    'rgba(255, 99, 71, 0.98)',   // Tomato
                                    'rgba(255, 69, 0, 0.98)',   // OrangeRed
                                  ],


                      'colorScale_violet' :[
                                    'rgba(230, 230, 250, 0.98)',   // Lavender
                                    'rgba(238, 130, 238, 0.98)',   // Violet
                                    'rgba(255, 0, 255, 0.98)',   // Fuchsia
                                    'rgba(138, 43, 226, 0.98)',   // BlueViolet
                                    'rgba(148, 0, 211, 0.98)',   // DarkViolet
                                    'rgba(75, 0, 130, 0.98)',   // Indigo
                                  ],

                 
                   'colorScale_yellow' :[
                                'rgba(255, 250, 205, 0.98)',   // LemonChiffon
                                'rgba(255, 255, 224, 0.98)',   // LightYellow
                                'rgba(240, 230, 140, 0.98)',   // Khaki
                                'rgba(255, 255, 0, 0.98)',   // Yellow
                                'rgba(255, 215, 0, 0.98)',   // Gold
                                'rgba(189, 183, 107, 0.98)',   // DarkKhaki
                              ],


                    'colorScale_slateblue' :[
                                  'rgba(230, 230, 250, 0.98)',   // Lavender
                                  'rgba(230, 230, 250, 0.98)',   // Lavender
                                  'rgba(255, 0, 255, 0.98)',   // Magenta
                                  'rgba(123, 104, 238, 0.98)',   // MediumSlateBlue
                                  'rgba(106, 90, 205, 0.98)',   // SlateBlue
                                  'rgba(72, 61, 139, 0.98)',   // DarkSlateBlue
                                ],

                      'colorScale_green' :[
                                  'rgba(144, 238, 144, 0.98)',   // LightGreen
                                  'rgba(144, 238, 144, 0.98)',   // LightGreen
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(60, 179, 113, 0.98)',   // MediumSeaGreen
                                  'rgba(0, 128, 0, 0.98)',   // Green
                                  'rgba(0, 100, 0, 0.98)',   // DarkGreen
                                ],

                      'colorScale_brown' :[
                                  'rgba(244, 164, 96, 0.98)',   // SandyBrown
                                  'rgba(244, 164, 96, 0.98)',   // SandyBrown
                                  'rgba(210, 105, 30, 0.98)',   // Chocolate
                                  'rgba(160, 82, 45, 0.98)',   // Sienna
                                  'rgba(165, 42, 42, 0.98)',   // Brown
                                  'rgba(128, 0, 0, 0.98)',   // Maroon
                                ],


                      'colorScale_teal' :[
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(0, 250, 154, 0.98)',   // MediumSpringGreen
                                  'rgba(102, 205, 170, 0.98)',   // MediumAquamarine
                                  'rgba(32, 178, 170, 0.98)',   // LightSeaGreen
                                  'rgba(0, 139, 139, 0.98)',   // DarkCyan
                                  'rgba(0, 98, 98, 0.98)',   // Teal
                                ],



                    

                     'colorScale_turquoise' :[
                                  'rgba(224, 255, 255, 0.98)',   // LightCyan
                                  'rgba(224, 255, 255, 0.98)',   // LightCyan
                                  'rgba(175, 238, 238, 0.98)',   // PaleTurquoise
                                  'rgba(64, 224, 208, 0.98)',   // Turquoise
                                  'rgba(0, 206, 209, 0.98)',   // DarkTurquoise
                                  'rgba(70, 130, 180, 0.98)',   // SteelBlue
                                ],


                    


                   'colorScale_tan' :[
                                  'rgba(255, 248, 220, 0.98)',   // Cornsilk
                                  'rgba(255, 248, 220, 0.98)',   // Cornsilk
                                  'rgba(245, 222, 179, 0.98)',   // Wheat
                                  'rgba(210, 180, 140, 0.98)',   // Tan
                                  'rgba(188, 143, 143, 0.98)',   // RosyBrown
                                  'rgba(139, 69, 19, 0.98)',   // SaddleBrown
                                ],



                   'colorScale_gray' :[
                                  'rgba(245, 245, 245, 0.98)',   // WhiteSmoke
                                  'rgba(245, 245, 245, 0.98)',   // WhiteSmoke
                                  'rgba(211, 211, 211, 0.98)',   // LightGray
                                  'rgba(169, 169, 169, 0.98)',   // DarkGray
                                  'rgba(112, 128, 144, 0.98)',   // SlateGray
                                  'rgba(47, 79, 79, 0.98)',   // DarkSlateGray
                                ],

                  }





                  /**/
                  //   --- --- end --- --- color scale  --- --- --- ---  
                  /**/



                  /**/
                  //  --- POI point of interest search esri     --- 
                  /**/

                      // simple marker
                      var poi_style =  "triangle"  // diamond, triangle, cross, x, circle, path, square
                      var poi_size = "20px"  // all works "31pt", "31px",
                      var poi_color = 'rgba(223, 255, 0, 0.69)'   //"yellow",
                      var poi_outlineColor = 'rgba(100, 149, 237, 0.94)'  //"#efefef",
                      var poi_outlineWidth = "0.8px"
                      // --- end --- simple marker


                      // text symbol as graphic label
                      var poi_TextColor = 'yellow'
                      var poi_haloColor = 'rgba(0,0,208, 0.69)'   //"blue",
                      var poi_haloSize =  "1.7px"
                      var poi_lineHeight = "5px"
                      var poi_lineWidth =  "73px"

                      // --- end --- text symbol as graphic label



                      var locator_style =  "square"  // diamond, triangle, cross, x, circle, path, square
                      var locator_size = 47  // all works "31pt", "31px",
                      var locator_color = 'rgba(0,0,208, 0.69)'   //"blue",
                      var locator_outlineColor = 'rgba(243,106,32, 0.94)'  //"#efefef",
                      var locator_outlineWidth = "11.5px"





                      var _category_string
                      var _category_array
                      var param_category_string



                      


                  /**/
                  //  --- end  ---  POI point of interest search esri    --- 
                  /**/





  /**/
  //   --- ---  --- --- microsoft azure  --- --- --- ---  
  /**/

        // find shared key:  azure console -> resources -> azure map account (map key) -> setting -> authentication -> shared key

        // hoogw@hotmail.com azure account have run out of free base map tile. subscription has been deleted with all keys.
        // any new api key under this account will not work for base map tile
       
        
        // currently use jhu@hppolice.org login azure 
        // public primary key
        var microsoft_azure_primary_key_public = '2EcKEaa1i02tTRNAUT7Ezip3htMkKcfPcH2JHokGwCynUY4oQHweJQQJ99BGAC8vTInSkNgnAAAgAZMP1MpR'
        // restrict for POI only primary key
        var microsoft_azure_primary_key_restrict = '84ivowqjNApFPwGYUwxNt8RogGtTq5622w19VWmGWmY8AvQ1jEuNJQQJ99BGAC8vTInSkNgnAAAgAZMP4XjG'
       
        
        
        
        // The minimum number of characters needed in the search input before a search is performed.
        var minSearchInputLength = 3;
        // The number of ms between key strokes to wait before performing a search.
        var keyStrokeDelay = 150;

       
        
        var azure_basemap_id = 'google-hybrid'  //'azure-hybrid'
        var param_azure_basemap_id

        var possible_basemap_layer_id_array = ['base', 'baseFeature', 'roadDetails', 'roads', 'buildings', 'JK', 'traffic_relative', 'labels',
          'google-hybrid-3rdPartyBaseMapLayer-id',
          'google-road-3rdPartyBaseMapLayer-id',
          'here-hybrid-3rdPartyBaseMapLayer-id',
          'here-road-3rdPartyBaseMapLayer-id',
          'open-street-map-3rdPartyBaseMapLayer-id'
        ]
        var datasource_layer_id


        var max_microsoft_poi_radius_meter = 50000 



  /**/
  //    --- --- end --- --- --- ---  --- --- microsoft azure  --- --- --- ---  
  /**/





  /**/
  //   --- ---  --- --- e s r i C o n f i g . a p i K e y  --- --- --- ---  
  /**/

             
  // p a l m s p r i n g s a p i K e y
  //var current_in_use_esriConfigaApiKey = "AAPKbe65b7c5e8a24683919a9fa6f8b525efbL5O1P8mONb5ZUgR-tJGWJa6qDk1B_nPYWrR2gdLcJQb-JcKWTBUbeEUb8Zfte1y";
              
  // v i c t o r v i l l e
  var current_in_use_esriConfigaApiKey = "AAPK3004c40aeb344af78b019cba2ebbab17ZobssPoefVD6zUPBpyNX_pRjNU_Ol8vpU0at3jruLgpfmhgG_YeWfkZVSH-xlOz6"

  // h u n t i n g t o n p a r k  ( inuse key  expire 7/15/2035 )
  //var current_in_use_esriConfigaApiKey = 'AAPTxy8BH1VEsoebNVZXo8HurI8k1WhGeAOutUFRKKsZy85lj2DIQAe2OjCQh-tOgGrmobbuwxYLTjzDrG5EzjtOuGGR2wJR_Aa_RwahBKzBiIq9m7e3MPYzRRJGds25-tHsbW9ksA45s72iRbeb45G5M1_qvp5Ti00ckpVEGgy5x9ida4cpSFS9WZnFVJxr3jYtBIt4HSRrL8TKvQNJ3LjoVLfJmw6I0k2BnfcTkI0MJ9w.AT1_lq0Q5kHk'
  // h u n t i n g t o n p a r k, backup key, expire 7/15/2035
  //var current_in_use_esriConfigaApiKey =  'AAPTxy8BH1VEsoebNVZXo8HurI8k1WhGeAOutUFRKKsZy86drMsongHVkkwMF-HzWOJnKdRDz7J5WofJ6i-18oHDHyjie7qZ6zWoQTwTzd4zDGfNlixM74rhWD7yAB-rYcnJfJr6AKWMl1c_uZRvNJJI_PO8T-er45DUxp7nCfcl88Trkij7gIcOLF_uQ1zNN5GE20y_Qkda3UUkt_LNE9kVY-Fmau_WnCLzPN8uyshpmz8.AT1_9eLSMjiB'     



              // ( should not expire 6/1/2026 as long as renewed )
              var huntington_park_hppolice_esriConfigaApiKey ='AAPTxy8BH1VEsoebNVZXo8HurI8k1WhGeAOutUFRKKsZy85OkL4GG8sS5vgP3MHfpNrjVSQumczsy_7cQGNTCUwpul7P__ETB16L8p_aDSgLiVCS_1OS9hQ2BnA9qTOVHFn6RkySudTNEIHKG-_YaWYy9-JLoDC5SFiXqJKsXJgvGLKqurDjo7Vu9nQ-TOpFllHczIMRwLLWWpqyKGXKU_N7mdzs3UHBrld3vP8wqgw8Ifo.AT1_lq0Q5kHk'



              var nearmap_api_key = "replace nearmap api key here" 
              //var nearmap_api_key = "ZWFkOGFhOTg. . . . . 0YTkxNTQ5"


              
              // each key subject to 500 request quota, if this key quota reached,
              // no matter how many key, all subject to 500 cap.
              // if you missing key, can go to location portal, api key item page, click generate secondary key button, or click re-generate key button
              
              //(hoogw2001, G2cg2h@40),
              // var esri_location_api_key = 'AAPTxy8BH1VEsoebNVZXo8HurP1XdWbhEQWgy-eia1C6qNR65QJ1N6ww2S3mIqnXz2VSFNw_iq7Ju5baSqPL5sDwKlk7ehym7A4FB-3Xyw2aKSBnb6VPoiQiW5BxApC6_fFPh39zn-KfFFzOtUHuV-2xZ7ZjnQLRzuVreH5Url8wvrbJzZX4TK8aAwvEpGxkxl6IrGxOsjTgkTz2waKyxc15CReqdUBnhk4SJ3kVbKmvfp41ACBGF48_r5ph4HL5btJ_AT1_Vg4RMRpo'
              var esri_location_api_key = 'AAPT85fOqywZsicJupSmVSCGriBmZSKeoedepYHKBMf9r68nWw1v39G-oBwvbeIwqc--8ATP9FD4uu1UUPA4T7LkK-UxoUVUkBFbvUhz5mrVENY-E73_p33XisU7mUP0hh5FPYaBhxl6RL2_G4e4gwNKFGa-31SZgpdkEzUOLnFSy1u_cz0Ii1Pmu5vuuNwuhYJFHlKxsSjhW6PW-5Hd6YpTTEDtG0AjwAZlNWDO2h60a3c.AT2_FLCViihn'
              
              // 500 free cap reached.(hppolice2, A3a#31). no matter what key generated, not working any more
              // future use (hoogw1, G2cg2h@40)


              
/**/
  //   --- --- end --- --- esriConfig.apiKey  --- --- --- ---  
  /**/










  
  var bing_map_key = 'ArS3KwfBjB1DBXL9_TedORar2sC7k47SodgBsiA41vAyQyLzB7cB_r57krZOlXAP'
  
  var nearmap_xyz = "https://api.nearmap.com/tiles/v3/Vert/{level}/{col}/{row}.img?apikey=" + nearmap_api_key




  


/**/
//  --- mapbox    --- 
/**/

  var mapbox_api_key = 'pk.eyJ1IjoiaG9vZ3ciLCJhIjoiYjdlZTA1Y2YyOGM4NjFmOWI2MjY3MmI5NWM3MmUyOWMifQ.gINCV5SXFGTG5wB8ouXxOw'
  // without label
  //var mapbox_satellite_raster = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=" + mapbox_api_key
  // with label
  var mapbox_satellite_raster = "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=" + mapbox_api_key
  // not use, too busy
  // var mapbox_streets_vector = "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.png?access_token=" + mapbox_api_key
  var mapbox_streets_vector = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}.png?access_token=" + mapbox_api_key
  

/**/
//  --- end   --- mapbox    --- 
/**/






/**/
//  --- here map    --- 
/**/



// expired 2025-8-31 login with 'org214352394"
// org214352394 ( limit plan expire 8-31-2025) with old api key
//var heremap_api_key = 'aFfzO1tN4DxEPCkXrb93YHI13mFbXPbUALxeMokWcYk'
 

//for future use
// org629824882 (public)
// var heremap_api_key = 'w2p97UR0SMfIsw4_vzowCGdoqQsXkmupBZQogPYIfAk'
 // org629824882 (loc)
 //var heremap_api_key = '7C2IVYSI1Mv4FrMkOuQoM2rZ7kWjcNVJra7t1fs25I8'
 
 // in use org-id
 // org229655706 (public)
 var heremap_api_key = 'GMpSt1gPW1tti328T2v-7TtJ0-FW6B-c07tqd_kCH6Y'
 // org229655706 (loc)
 // var heremap_api_key = 'Dy5HHz1lCOyP5z4tHb0BRVVdiLwgDXPzHBqvXc6NCXs'

  // here xyz tile https://www.here.com/docs/bundle/raster-tile-api-migration-guide/page/README.html
  var here_v2_hybrid_vector = "https://1.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/jpg?apiKey=" + heremap_api_key
  var here_v3_hybrid_raster = "https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/jpeg?style=explore.satellite.day&apiKey=" + heremap_api_key
  var here_v2_satellite_vector = "https://1.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/jpg?apiKey=" + heremap_api_key
  var here_v3_satellite_raster = "https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/jpeg?style=satellite.day&apiKey=" + heremap_api_key
  // v2 normal day does not work
  var here_v2_road_vector = "https://1.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/jpg?apiKey=" + heremap_api_key
  var here_v3_road_raster = "https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/jpeg?style=explore.day&apiKey=" + heremap_api_key
  var here_v2_terrain_vector = "https://1.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/jpg?apiKey=" + heremap_api_key
  var here_v3_terrain_raster = "https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/jpeg?style=topo.day&apiKey=" + heremap_api_key



/**/
//  --- end  ---  here map    --- 
/**/






/**/
//  --- yelp POI on google      --- 
/**/

     var yelp_app_name = 'transparentgov.net'
     var yelp_client_id = 'w7WX-RkAITtSMfX1H0-K2Q'
     var yelp_api_key = 'Bearer jMjoHGF37yb2ORuGO_s7qwKxrvPL5oO8Fl4w0jLH5lEPD_UldbfL8qMx9Jy-LU7HFPcvvHo-Zs0hKOCutoyqZhfLCHbqZQDGmW6YveF-FO2u7d4SconkFufEEiWnXnYx'

     var yelp_api_get_all_categories = 'https://api.yelp.com/v3/categories'
     var yelp_api_search = 'https://api.yelp.com/v3/businesses/search?'
                     

     var max_yelp_poi_radius_meter = 40000 



     var _poi_fillColor = 'rgba(100, 149, 237, 0.1)';   //'blue'
     var _poi_fillOpacity   =  0
     var _poi_strokeColor   =  'rgba(100, 149, 237, 0.95)';   //'blue'
     var _poi_strokeWeight  =  5
     var _poi_pointRadius = 7; 
     var _poi_pointRadius_px = '7px' // Simple Markerpoint size must be string format '100px'


     var _poi_highlight_fillColor = 'rgba(255, 191, 0, 0.1)';   //'blue'
     var _poi_highlight_fillOpacity   =  0
     var _poi_highlight_strokeColor   =  'rgba(255, 191, 0, 0.95)';   //'blue'
     var _poi_highlight_strokeWeight  =  13
     var _poi_highlight_pointRadius = 13; 
     var _poi_highlight_pointRadius_px = '13px' // Simple Markerpoint size must be string format '100px'

/**/
//  --- end  ---  yelp POI on google    --- 
/**/



/**/
//  - - - esri poi  - - - 
/**/
var max_esri_page_size = 20 // page size must between 1 and 20
var max_esri_poi_limit = 200   // esri place api, max give you 200 poi on each search.
var max_esri_poi_radius_meter = 10000
/**/
//  - - -  end  - - -    esri poi    - - - 
/**/






/**/
//  --- google poi   --- 
/**/


var max_google_poi_limit = 20  
var max_google_poi_radius_meter = 50000  



/**/
//  --- end  ---  google poi    --- 
/**/


// sqaure
var mid_north
var mid_north_lat
var mid_north_lng

var mid_east
var mid_east_lat
var mid_east_lng

var mid_south
var mid_south_lat
var mid_south_lng

var mid_west
var mid_west_lat
var mid_west_lng

var zoom2diamondEdgeMeter = {
     22:4,
     21:6,
     20:8, 
     19:10,
     18:15,
     17:20,
     16:30,
     15:50,
     14:80,
     13:100,
     12:200,
     11:400,
     10:500,
     9:800,
     8:1200,
     7:1700,
     6:2300,
     5:300,
     4:3000,
     3:3000,
     2:3000,
     1:3000,
     0:3000,
}



var geojson_template = {
  type: "FeatureCollection",
  features: []
}
var geojson_feature_template = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": ["lng", "lat"]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
var geojsonTemplateFeatures_array = []






// bootstrap svg icon path can be found here https://icons.getbootstrap.com/icons/geo-alt-fill/
// https://icons.getbootstrap.com/icons/geo-alt-fill/
const svg_icon_path_pin1 = "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6";
// https://icons.getbootstrap.com/icons/geo-fill/
const svg_icon_path_pin2 = "M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411";
// https://icons.getbootstrap.com/icons/pin-fill/
const svg_icon_path_pin3 = "M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354";




  async function init_global_var(){
  
  
  //  .......... global var ..............
  
     
         // https://developer.mozilla.org/en-US/docs/Web/API/Location
  
          current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
  
          console.log('current_url ...... ',current_url);
          
          current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
          current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
          
          
          
          
          
          
          //.......... for arcgisServerList.js only .......................
                // bug fix i start from 1 instead of 0, otherwise, has 2 //,  //json2tree/domain.html
                  for (i = 1; i < current_pathArray.length-1; i++) {
                    linkToPathname += "/";
                    linkToPathname += current_pathArray[i];
                  }
                 console.log('linkToPathname----',linkToPathname); 
          //.......... end ..............  for arcgisServerList.js only .......................
          
          
          
          
          
          
                    // ----- parse url param ?url=xxxxxxxxxx  --------

                             urlParams = new URLSearchParams(window.location.search);


                                                          
                            // token
                            // never use jquery in arcgis-common-js, because, arcgis/js3/featureTable.hmtl don't include jquery
                            param_arcgis_online_token = urlParams.get('arcgis_online_token'); 
                            if (param_arcgis_online_token){
                                                  //$('#arcgis_online_token_label').show()
                                                  //$('#arcgis_online_token').show()
                                                  if (document.getElementById("arcgis_online_token_label")){
                                                    document.getElementById("arcgis_online_token_label").style.display = "block";
                                                  }
                                                  if (document.getElementById("arcgis_online_token")){
                                                    document.getElementById("arcgis_online_token").style.display = "block";
                                                  }
                                                  
                                                  arcgis_online_token = param_arcgis_online_token
                                                  //$('#arcgis_online_token').html('&nbsp;&nbsp;<b>Arcgis Token</b> = <mark>' + arcgis_online_token + '</mark> <b>was used to access restricted content</b>')
                                                  if (document.getElementById("arcgis_online_token")){
                                                        document.getElementById("arcgis_online_token").innerHTML = '&nbsp;&nbsp;<b>Arcgis Token</b> = <mark>' + arcgis_online_token + '</mark> <b>was used to access restricted content</b>'
                                                  }
                              } else {
                              //$('#arcgis_online_token_label').hide()
                              //$('#arcgis_online_token').hide()
                              if (document.getElementById("arcgis_online_token_label")){
                                      document.getElementById("arcgis_online_token_label").style.display = "none";
                              }
                              if (document.getElementById("arcgis_online_token")){
                                      document.getElementById("arcgis_online_token").style.display = "none";
                              }
                              //$('#arcgis_online_token').html('&nbsp;&nbsp;No token was used, this content is <b>NOT</b> restricted, it is public')
                              //if (document.getElementById("arcgis_online_token")){
                                  //document.getElementById("arcgis_online_token").innerHTML = '&nbsp;&nbsp;No token was used, this content is <b>NOT</b> restricted, it is public'
                               //}
                            }




                              

                                                        
                              /**/
                              //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                              /**/
                              var param_zoom2feature_noMoreThan = urlParams.get('zoom2feature_noMoreThan');
                              if (param_zoom2feature_noMoreThan){
                                                    console.log('use new zoom to feature no More Than from urlparam ',  param_zoom2feature_noMoreThan)
                                                    zoom2feature_noMoreThan = parseInt(param_zoom2feature_noMoreThan)
                              }

                              var param_zoom2feature_zoomLevel = urlParams.get('zoom2feature_zoomLevel');
                              if (param_zoom2feature_zoomLevel){
                                                    console.log('use new zoom to feature zoom Level from urlparam ',  param_zoom2feature_zoomLevel)
                                                    zoom2feature_zoomLevel = parseInt(param_zoom2feature_zoomLevel)
                              }  

                              var param_zoom2feature_yesNo = urlParams.get('zoom2feature_yesNo');
                              if (param_zoom2feature_yesNo){
                                                    console.log('use new zoom to feature yes no from urlparam ',  param_zoom2feature_yesNo)
                                                    zoom2feature_yesNo = param_zoom2feature_yesNo
                              } 
                            
                            /**/
                            //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                            /**/
                            

                             

                              /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/

                              var param_orderby_count_or_value = urlParams.get('orderbycountorvalue');
                              if (param_orderby_count_or_value){
                                                    console.log('_orderby_count_or_value ',  param_orderby_count_or_value)
                                                    _orderby_count_or_value = param_orderby_count_or_value
                              } 

                              var param_distinct_or_groupby = urlParams.get('distinctorgroupby');
                              if (param_distinct_or_groupby){
                                                    console.log('_distinct_or_groupby ',  param_distinct_or_groupby)
                                                    _distinct_or_groupby = param_distinct_or_groupby
                              } 


                              /**/
                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                              /**/




                              /**/
                              //  ... ... .. ... order by field name  ... ... .. ... 
                              /**/

                              var param_orderby_fieldname = urlParams.get('orderbyfieldname');
                              if (param_orderby_fieldname){
                                                    console.log('param_orderby_fieldname ',  param_orderby_fieldname)
                                                    orderby_fieldname = param_orderby_fieldname
                              } 
                              /**/
                              //  ... end ... ... .. ... order by field name  ... ... .. ...
                              /**/





                             
                              /**/
                              //  ... ... .. ... search key word  ... ... .. ... 
                              /**/

                              param_search = urlParams.get('search');
                              if (param_search){ 
                                zoom_to_1st_feature = false
                              }
                              
                              /**/
                              //  ... end ... ... .. ... search key word  ... ... .. ...
                              /**/





                              /**/
                              //  --- POI point of interest search esri     --- 
                              /**/

                              param_search_poi_keyword = urlParams.get('poi');
                              console.log('url param param_search_poi_keyword',  param_search_poi_keyword)
                              if (param_search_poi_keyword){ 
                                search_poi_keyword = param_search_poi_keyword
                              }


                              param_category_string = urlParams.get('poicategory');
                              console.log('url param param_category_string',  param_category_string)
                              if (param_category_string){ 
                                _category_string = param_category_string
                                console.log("init global var, set poi category as : ", _category_string)
                              }

                              /**/
                              //  --- end  ---  POI point of interest search esri    --- 
                              /**/




                              /**/
                              //  --- use your key  --- 
                              /**/

                              // 1st time, one time
                              param_your_google_api_key = urlParams.get('yourGoogleKey'); 
                              if (param_your_google_api_key){
                                    $('#googlemap-key-input').val(param_your_google_api_key)
                                    your_google_api_key = param_your_google_api_key
                              }


                              // 1st time, one time
                              param_your_esrilocation_key = urlParams.get('youresrilocationkey'); 
                              if (param_your_esrilocation_key){
                                    $('#esrilocation-key-input').val(param_your_esrilocation_key)
                                    your_esrilocation_key = param_your_esrilocation_key
                              }

                              /**/
                              //  --- end  ---  use your key    --- 
                              /**/






                                /**/
                                // - - - search by field - - - 
                                /**/
                                param_searchByField = urlParams.get('searchByField');
                                /**/
                                // ... end ...  - - - search by field  - - -
                                /**/





                              /**/
                              //  ... ... .. ... select level 1 and 2  ... ... .. ... 
                              /**/

                              param_select_level_1 = urlParams.get('select_level1value');
                              param_select_level_2 = urlParams.get('select_level2value');
                              param_select_level_3 = urlParams.get('select_level3value');
                              if ((param_select_level_1) || (param_select_level_2) || (param_select_level_3)){ zoom_to_1st_feature = false}
                              /**/
                              //  ... end ... ... .. ... select level 1 and 2   ... ... .. ...
                              /**/

                              /**/
                              //  ... ... .. ...background layer url  ... ... .. ... 
                              /**/
                              
                              param_background_layer_url = urlParams.get('backgroundlayerurl');
                              if ((param_background_layer_url == undefined) || (param_background_layer_url == null) || (param_background_layer_url == '')){
                                  
                                  // nothing to do
                                  
                              }else{
                                  ___bgurl = new URL(param_background_layer_url);   // ?url=https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0
                                  ___bgprotocol = ___bgurl.protocol; //   https:
                                  ___bghostname = ___bgurl.hostname; //    sampleserver3.arcgisonline.com
                                  ___bgpathname = ___bgurl.pathname; //    server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0
                                  ___bgpathArray = ___bgpathname.split('/');
     
                                  console.log('background layer url path array', ___bgpathArray )
     
                                    // https://gisportal.hrsa.gov/server/rest/services/AnalyzerTool/AnalyzerTool/MapServer/0  
                                   // ___pathArray = ["", "server", "rest", "services", "AnalyzerTool", "AnalyzerTool", "MapServer", '0']
                                   param_layer_id = ___bgpathArray.pop() // remove last element
                                   ___bgpathArray.shift();         // remove first element, which is empty ''
                                   param_background_mapserver_url = ___bgprotocol + '//' + ___bghostname + '/' + ___bgpathArray.join('/')
     
                                   console.log('param background mapserver url ', param_background_mapserver_url )
     
                             }// if     

                              /**/
                              //  ... end ... ... ... .. ...background layer url  ... ... .. ... 
                              /**/
                             
                             





                              /**/
                              // ----- image or tile -----  ----- 
                              /**/

                                param_background_type = urlParams.get('backgroundtype');

                              /**/
                              // ----- end  -----  image or tile -----  ----- 
                              /**/




                              /**/
                              // ----- opacity ----- widget ----- 
                              /**/
                              param_opacity  = urlParams.get('opacity');  
                              if (param_opacity){
                                _opacity = param_opacity
                              }
                              param_widget_opacity  = urlParams.get('widgetopacity');  
                              if (param_widget_opacity){
                                widget_opacity = param_widget_opacity
                              }
                              /**/
                              // ----- end  ----- opacity ----- widget ----- 
                              /**/



                             
                              /**/
                              // ----- color style setting ----- 
                              /**/  
                              param_symbolType = urlParams.get('symbolType');
                              param_labelType = urlParams.get('labelType');

                              param_overlayOpacity  = urlParams.get('overlayOpacity');  
                              param_strokeColor = urlParams.get('strokeColor');
                              param_strokeWeight = urlParams.get('strokeWeight');
                              param_fillColor = urlParams.get('fillColor');
                              param_pointRadius = urlParams.get('pointRadius');

                                //  . . .simple fill symbol style . . .
                                param_outlinePattern = urlParams.get('outlinePattern');
                                param_simplefillPattern = urlParams.get('simplefillPattern');
                                param_simpleMarker = urlParams.get('simpleMarker');
                                // . . . end . . . simple fill symbol style

                              //  . . .simple fill symbol style . . .
 
 
                                // . . . end . . . simple fill symbol style



                              /**/
                              // ----- end -----  color style setting ----- 
                              /**/  


                             


                            /**/
                            //  ---  uds only   --- 
                            /**/
                                  param_tool_type = urlParams.get('tooltype');
                              /**/
                            //  --- end  ---  uds only   --- 
                            /**/

                                           

                             /**/
                              //  ... ... .. ... geocode server endpoint url ... ... .. ... 
                              /**/

                              param_input_geocode_endpoint_url = urlParams.get('geocode');
                              if (param_input_geocode_endpoint_url){ 
                                input_geocode_endpoint_url = param_input_geocode_endpoint_url
                              }
                               // 1st time, one time
                              $("#geocode-server-url-input").val(input_geocode_endpoint_url)
          
                              /**/
                              //  ... end ... ... .. ... geocode server endpoint url  ... ... .. ...
                              /**/

                            


                              /**/
                              //  ... ... .. ... naserver endpoint url ... ... .. ... 
                              /**/

                              param_input_naserver_endpoint_url = urlParams.get('naserver');
                              if (param_input_naserver_endpoint_url){ 
                                input_naserver_endpoint_url = param_input_naserver_endpoint_url
                              }
                              // 1st time, one time
                              $("#naserver-url-input").val(input_naserver_endpoint_url)
                              
                              /**/
                              //  ... end ... ... .. ... naserver endpoint url  ... ... .. ...
                              /**/



                                /**/
                                // - - - filter in visible view oroverall - - - 
                                /**/
                                param_filter_inVisibleViewOrOverall = urlParams.get('filter_inVisibleViewOrOverall');

                                /**/
                                // ... end ...  - - - filter in visible view oroverall  - - -
                                /**/






                            /**/
                            // -- -- -- label and color  -- -- -- 

                            param_polygonFillBy = urlParams.get('polygonFillBy');
                            //. . . end  . . . -- -- -- label and color  -- -- -- 
                            /**/

                          

                            /**/
                            //  --- click or hover   --- 
                            /**/
                            param_click_or_hover = urlParams.get('clickorhover');

                            /**/
                            //  --- end  ---  click or hover   --- 
                            /**/



                                                        
                            /**/
                            //  --- zoom to feature or not radio button     --- 
                            /**/
                            param_zoom_to_feature_or_not = urlParams.get('zoomt2feature');


                            /**/
                            //  --- end  ---  zoom to feature or not radio button    --- 
                            /**/


                            /**/
                            //  --- original color or yellow   --- 
                            /**/
                            param_original_color_or_yellow = urlParams.get('original_color_or_yellow');

                            /**/
                            //  --- end  ---  original color or yellow   --- 
                            /**/






                            /**/
                            //  --- filter type   --- 
                            /**/
                            param_filterType = urlParams.get('filtertype');
                            /**/
                            //  --- end  ---  filter type   --- 
                            /**/
                            

                              /**/
                              //  --- feature table paging    --- 
                              /**/
                              param_pagingFeatureTable = urlParams.get('pagingfeaturetable');
                              /**/
                              //  --- end  ---  feature table paging    --- 
                              /**/


                            /**/
                            // -------------- attachment  --------------
                            /**/
                            param_attachment_image_size = urlParams.get('attachmentimagesize');
                           

                            /**/
                            //  -------------- end  -------------- attachment  --------------
                            /**/




                          /**/                 
                          // -- -- -- featurelayer clientside label  -- -- -- 
                          
                              param_dynamicLabel = urlParams.get('dynamicLabelField');
                         
                          //  -- -- --  end  -- -- -- featurelayer clientside label  -- -- --
                          /**/
                             





                            /**/
                            //   --- --- --- --- quantity color --- --- --- ---
                            /**/

                                param_quantityFieldName  = urlParams.get('quantityFieldName');
                                param_colorScale  = urlParams.get('colorScale');

                            /**/
                            //   --- --- end --- --- quantity color --- --- --- ---  
                            /**/




                  /**/
                  // .. - .. - ... scan root or mapserver only   ... - .. - .. 
                  /**/                             
                                                  
                  param_scan_root_or_mapserver_only = urlParams.get('rootormapserver');           
                  /**/                           
                  // ... - .. - ..  end .. - .. - ... scan root or mapserver only    ... - .. - .. 
                  /**/





                  /**/
                  //  .. - .. - ... zoom to extent or 1st feature   ... - .. - .. 
                  /**/
                  
                  param_zoom_to_extent_or_1st_feature = urlParams.get('zoom2ext1st');
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... zoom to extent or 1st feature    ... - .. - .. 
                  /**/




                             
                             //.................. required parameter .................

                             
                                    _layer = urlParams.get('layer'); 
                                    _layer_id = urlParams.get('layer_id'); 
                                    _layer_name = urlParams.get('layer'); 
                                
                                    var param_cross = urlParams.get('cross'); 
                                    if (param_cross) {
                                                      _cross = param_cross
                                    } else {
                                                      _cross ='default' 
                                    }


                                   
                                   

                                    ___url_string = urlParams.get('url');  


                                    // only for arcgis portal item
                                    ___portal_id = urlParams.get('portal-id'); 





                                  // as long as url has lat,lng,zm, then do not pan to loc

                                  // esri lat lng can be a string,no need to convert to number
                                    param_center_lat = urlParams.get('_center_lat');  
                                    if (param_center_lat) {
                                       _center_lat = param_center_lat
                                       
                                       // as long as url has lat,lng,zm, then do not pan to loc
                                       _panto = 0
                                       zoom_to_1st_feature = false
                                    }
                                    param_center_long = urlParams.get('_center_long');  
                                    if (param_center_long) {
                                      _center_long = param_center_long
                                      
                                       // as long as url has lat,lng,zm, then do not pan to loc
                                       _panto = 0
                                      zoom_to_1st_feature = false
                                    }

                                    param_center_zoom = urlParams.get('_center_zoom');  
                                    if (param_center_zoom) {
                                      _center_zoom = param_center_zoom
                                      
                                       // as long as url has lat,lng,zm, then do not pan to loc
                                       _panto = 0
                                      zoom_to_1st_feature = false
                                    }


                                   // scene view camera
                                    _tilt = urlParams.get('tilt');
                                    _heading = urlParams.get('heading');
                                    _altitude = urlParams.get('altitude');


                                   
                             //.................. required parameter .................
                             
                             
                             
                             
                              _center={"_center_lat":_center_lat , "_center_long": _center_long};
                              
                             console.log('___url_string ......  ',___url_string)  
                             console.log('_center ......  ',_center)  
                                 
                                           
                         
      
      
      
      
                         if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                         {
                             
                             // nothing to do
                             
                         }else{
                              ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                             base_url = ___url_string;

                             ___protocol = ___url.protocol; //   https:
                             ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                             ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                             ___urlParams = new URLSearchParams(___url.search); //
                            

                            ___pathArray = ___pathname.split('/');


                               // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
                              // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]



                             // ___service = https://maps.lacity.org/arcgis/rest/services
                            ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 



                             /*
                              console.log(___url);
                              console.log(___protocol);
                              console.log(___hostname);
                             */ 
                              
                        }// if     
                 // ----- parse url param ?url=xxxxxxxxxx  --------







                          
                          // set html page title, on browser tab title
                          if (_layer) {
                            
                            // $("#title").text(_layer)
                            // without jquery
                            document.getElementById("title").innerHTML = _layer;


                          }
                    





                          
                        // scene view camera
                        if ((_tilt) && (! isNaN(_tilt) )) {
                        } else {
                          _tilt = 75;    // 0 look down, 90 look parallel to surface
                        }

                        if ((_heading) && (! isNaN(_heading) )) {
                        } else {
                          _heading = 0;  // default is 0, heading north,  90 for east
                        }

                        if ((_altitude) && (! isNaN(_altitude) )) {
                        } else {
                          _altitude = 1000; 
                        }






  


                        console.log(' after initial globle var, zoom to layer depends on following param exist, search key words, lat, lng, zoom, select level 123, etc...', zoom_to_1st_feature)
  } // function 
  
  


  async function ajax_xml_string(_url){

    var xml_document;
    try{  

        xml_document = await $.ajax({
                        timeout:_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                        type: 'GET',
                        dataType: 'xml',
                        url: _url,
                        error: function (xml_error) {
                          console.log('xml_error ', xml_error)                                        
                        },                    
                        success: function (data) {                          
                        }
                    }); 
    } catch(xml_error){ 
                    console.log('catch xml error ', xml_error) 
    }// try - catch

    console.log( 'ajax xml_document response >>>>>  ', xml_document)

        const _xml_serializer = new XMLSerializer();
        var xml_string = _xml_serializer.serializeToString(xml_document);

    //console.log( 'serialize to xml_string >>>>>  ', xml_string)
    return xml_string
  }




  
/**/
//*************************   ajax arcgis server section ***********************************  
/**/

                      // Only for :  arcgis rest api type  ----- url + '?f=json' ----------- 
                      async function arcgis_ajax_cross_origin(_url, __cross_origin_method){

                        // Most of arcgis server support JSONP
                        // newer arcgis server support both JSONP + CORS
                        // some only support CORS, NOT JSONP



                        

                          // sample
                          // _url = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                        
                          _url = _url + '?f=json';

                          // special for feature layer
                          //_url = _url + '&f=json';

                        

                          var _response_


                        switch(__cross_origin_method) {


                          case 'default':

                              _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
                            

                            break;


                          case 'cors':
                              _response_ = await ajax_datatype_json(_url, _timeout)
                            break;


                            case 'jsonp':
                                _response_ = await ajax_jsonp_only(_url, _timeout)
                                break;


                          case 'proxy':
                              _response_ = await ajax_proxy_only(_url, _timeout)
                                    break;     

                          default:
                              _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
                        }




                        return  _response_



                      }
           
                  
                      async function ajax_getjson(_url){

                          // this will be retired soon     
                            
                          // Most of arcgis server support JSONP
                          // newer arcgis server support both JSONP + CORS
                          // some only support CORS, NOT JSONP



                           // Only for :  arcgis rest api type  ----- url + '?f=json' -----------   
                           // fist try datatype:jsonp, if failed, try datatype:json (need cors)
                           // arcgis server rest api , usually support jsonp( because of old history reason), the newer version also support CORS.
                           
                           



                          // --------- ajax ___url_string response = input  -------------



                                                // ___url_string = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                                                var ___url_getJson = _url + '?f=json';

                                                console.log('ajax-jsonp -> ',___url_getJson)   

                                               var input;


                                                try{  

                                                  input = await $.ajax({
                                                                    timeout:_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                    type: 'GET',
                                                                    dataType: 'jsonp',
                                                                   
                                                                    url: ___url_getJson,
                                                                    
                                                                    
                                                                    error: function (jsonp_error_1) {
                                                                                                
                                                                      console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                                                                    },
                                                                                                
                                                                    success: function (data) {
                                                                      
                                                                    }
                                                                });                          


                                                    } catch(jsonp_error_2){ 

                                                                console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_2)    

                                                                // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                                                          

                                                                console.log('ajax-datatype:json-=======> ',___url_getJson)   
                                                                try {
                                                                
                                                                        // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                        
                                                                        input = await $.ajax({
                                                                                                      timeout:_timeout,
                                                                                                      url:___url_getJson,

                                                                                                      dataType: 'json',


                                                                                                      success: function (data) {
                                                                                                        
                                                                                                      }, // success
                                                                                                      
                                                                                                      error: function (json_error_1) {
                                                                                                        
                                                                                                        console.log('throw error event (ajax datatype:json failed json_error_1)', json_error_1)                                        
                                                                                                      }
                                                                                                      
                                                                                                  });
                                                                    
                                                                    
                                                                    
                                                                    


                                                                  
                                                                } catch(json_error_2){
                                                                    
                                                                    
                                                                    // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                                                    // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                                                    //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                                                    // the problem is internal folder is forbidden.

                                                                    
                                                                    console.log('catch( json_error_2 )', json_error_2)
                                                                    
                                                                   
                                                                    
                                                                }     
                                                            
                                                            
                                                            

                                              }// try - catch


                            
                         


                      return input
                      }// function 


                      // Only for our rest api,https://localhost:3200/restapi/rest_url?select=*&where=
                      //  without _url + '?f=json',  without jsonp
                      // return json, no need parse.
                      async function ajax_getjson_common(_url){
                                              // ___url_string = 'https://localhost:3200/restapi/rest_url?select=*&where=type='folder'&orderby=name&asc_desc=asc'
                                              var ___url_getJson = _url;
                                              var input;
                                                
                         try{                            
                                          input = await $.ajax({
                                                                                              timeout:_timeout,
                                                                                              url:___url_getJson,
                                                                                              success: function (data) {                                                                                                         
                                                                                              }, // success
                                                                                              error: function (error) {
                                                                                                console.log('ajax json failed ', error)
                                                                                              }                                                                                              
                                                              });
                                        return input                    
                         } catch{
                                        return null 

                         }   
                      }




                      async function ajax_getjson_common_custom_timeout(_url, custom_timeout){
                        // ___url_string = 'https://localhost:3200/restapi/rest_url?select=*&where=type='folder'&orderby=name&asc_desc=asc'
                        var ___url_getJson = _url;
                        var input;
                          
                        try{                            
                                          input = await $.ajax({
                                                                                              timeout:custom_timeout,
                                                                                              url:___url_getJson,
                                                                                              success: function (data) {                                                                                                         
                                                                                              }, // success
                                                                                              error: function (error) {
                                                                                                console.log('ajax json failed ', error)
                                                                                              }                                                                                              
                                                              });
                                        return input                    
                        } catch{
                                        return null 

                        }   
                      }



                      







                      function convert_to_json(response_string){

                        var response_json

                        if (typeof response_string === 'object') {
                          // is object
                          response_json = response_string
                        } else {
                            // is string
                            response_json = JSON.parse(response_string)
                        }

                        return response_json
                      }
/**/
//************* end ************   ajax arcgis server section ***********************************  
/**/



                      

/**/
// ======================== standard =========  ajax fetch general use ==============================
/**/
    
      async function ajax_datatype_json(___url_getJson, _custom_timeout){
            

            //dataType: "json" same as fetch, server must support CORS,
            // if server NOT support CORS, you have to use proxy to work around 

            //dataType: "json", the result is already json, no need to JSON.parse().

            // without dataType: "json", the result is string,  need to JSON.parse().




             console.log('ajax datatype json, (timeout) ',___url_getJson, _custom_timeout)   


             var input

        try{
      
                  input  = await $.ajax({
                  
                                              timeout: _custom_timeout,
                                              url: ___url_getJson,
                                              type : 'GET',

                                              error: function (json_error_1) {
                                                                                                        
                                                              console.log('ajax datatype:json json_error_1 ',json_error_1)  
                                                              
                                                            
                                                    },


                                              success: function (data) {
                                                //console.log('success back --> ', data);

                                              },


                                            dataType: "json"


                                            // jsonp only works for arcgis server whoever support JSONP, 
                                            // jsonp NOT works for any file json, or file geojson

                                            //dataType: "jsonp"  // not work for hub    /data.json
                                            

                                            }); // await

          

                                        
                                
                                          } catch(json_error_2){
                              
                              
                                            // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                            // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                            //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                            // the problem is internal folder is forbidden.
              
                                            
                                            console.log('catch( json_error_2 )', json_error_2)
                                            
                                           
                                            // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                            var error_status = {
                                              errorFrom: 'ajax_datatype_json',
                                              readyState:json_error_2.readyState,
                                              responseJSON:json_error_2.responseJSON,
                                              status:json_error_2.status,
                                              statusText: json_error_2.statusText
                                            
                                            }
              
                                             return error_status
              
                                            
                                        }     




          return input
          


      }

      // No time out, general use, no prefix for url          
          // fetch with time out option 
      async function fetch_only(___url_getJson, _custom_timeout){
              

            console.log('fetch only ',___url_getJson)   


          // get raw json = input 
          /*  
            * bug fix: 
            * No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:10' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
            * https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
            */



               
         /*  works, but this NOT await,    
           
         
          fetch(___url_getJson)
                     .then(function(response) {
                          return response.json();
                     })
                     .then(function(data) {

                                                 
                        console.log(data);

                        
                                                  
                        return data

                    });// fetch

           */ 


        // arcgis only, when domain not exist, fetch will error, must catch, return null

          try{
          
                    var  _resp_f = await fetch(___url_getJson);

                    return _resp_f


              } catch (error) {


                      console.log('fetch Error:', error);
                    return null

              }


      }

      async function ajax_jsonp_only(___url_getJson, _custom_timeout){
            

          // jsonp only work for arcgis server who support JSONP
          // jsonp NOT work for file .json, file .geojson or any file download 


          console.log('ajax jsonp only ',___url_getJson)   
          var input;


          try{  

          input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',


                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                             
                              error: function (jsonp_error_1) {
                                                                        
                                                                     
                                                              console.log('throw event , jsonp error 1   ', jsonp_error_1)

                                                          },
                                                          
                              success: function (data) {
                                 // console.log('jsonp success : ', data);

                                 
                              }
                          });                          


            }
        catch( jsonp_error_2 ){

         
                  console.log('catch jsonp error 2    ', jsonp_error_2)

                  var error_status = {

                    errorFrom: 'ajax_jsonp_only',
                    readyState:jsonp_error_2.readyState,
                    responseJSON:jsonp_error_2.responseJSON,
                    status:jsonp_error_2.status,
                    statusText: jsonp_error_2.statusText
                  
                  }

                  return error_status

        }// try - catch




      return input
      }// function 

      async function ajax_proxy_only(___url_getJson, _custom_timeout){
            

        //dataType: "json" same as fetch, server must support CORS,
        // if server NOT support CORS, you have to use proxy to work around 

        //dataType: "json", the result is already json, no need to JSON.parse().

        // without dataType: "json", the result is string,  need to JSON.parse().




         console.log('ajax proxy, (timeout) ',___url_getJson, _custom_timeout)   

         var _proxified_url = proxify_url(___url_getJson)


         console.log('try ajax proxy =======> ',  _proxified_url)  



         var input

    try{
  
              input  = await $.ajax({
              
                                          timeout: _custom_timeout,
                                          url: _proxified_url,
                                          type : 'GET',

                                          error: function (proxy_error_1) {
                                                                                                    
                                                          console.log('ajax proxy_error_1 ',proxy_error_1)  
                                                          
                                                        
                                                },


                                          success: function (data) {
                                            //console.log('success back --> ', data);

                                          },


                                        dataType: "json"


                                        // jsonp only works for arcgis server whoever support JSONP, 
                                        // jsonp NOT works for any file json, or file geojson

                                        //dataType: "jsonp"  // not work for hub    /data.json
                                        

                                        }); // await

      

                                    
                            
                                      } catch(proxy_error_1){
                          
                          
                                        // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                        // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                        //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                        // the problem is internal folder is forbidden.
          
                                        
                                        console.log('catch( proxy_error_1 )', proxy_error_1)
                                        
                                       
                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                        var error_status = {
                                          errorFrom: 'ajax_proxy_only',
                                          readyState:proxy_error_1.readyState,
                                          responseJSON:proxy_error_1.responseJSON,
                                          status:proxy_error_1.status,
                                          statusText: proxy_error_1.statusText
                                        
                                        }
          
                                         return error_status
          
                                        
                                    }     




      return input
      


      }
      
      function proxify_url(_target_url){


                              // fetch + proxy (bypass cors)

                              //  ****** cors ******

                                  // some site that doesn’t send Access-Control-*, our browser will block response as No 'Access-Control-Allow-Origin' header is present on the requested resource  
                                  // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
                                  // we must add such header via this proxy
                                  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

                                  //const proxyurl = "http://localhost:7000/";
                                  //const proxyurl = "https://localhost:7200/";


                var _proxified_target;


                if (_target_url.includes('https://')){

                          _proxified_target = proxyurl_https  + _target_url;
                } else{

                          _proxified_target = proxyurl_http + _target_url;  
                }


                return _proxified_target

      }
       
      async function ajax_jsonp_json_proxy(___url_getJson, _custom_timeout){
            

            // 3 level try, jsonp > json(cors) > proxy ,   good for arcgis server rest api

           // first try jsonp 
           //  if jsonp failed, catch and try  datatype:json
           // if json failed, catch and try proxy

          

           // always with time out option 


          console.log('ajax jsonp and json ',___url_getJson)   
          var input;


          try{  

            input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',
                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                              
                              error: function (jsonp_error_1) {
                                                          
                                console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                              },
                                                          
                              success: function (data) {
                                
                              }
                          });                          


              } catch(jsonp_error_1){ 

                          console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_1)  
                          
                          // not return error yet, because we will try datatype:jsonp

                          // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                    

                          console.log('ajax-datatype:json-=======> ',___url_getJson)   
                          try {
                          
                                  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                  
                                  input = await $.ajax({
                                                                timeout: _custom_timeout,
                                                                url:___url_getJson,

                                                                dataType: 'json',


                                                                success: function (data) {
                                                                  
                                                                }, // success
                                                                
                                                                error: function (json_error_2) {
                                                                  
                                                                  console.log('throw error event (ajax datatype:json failed json_error_2)', json_error_2)                                        
                                                                }
                                                                
                                                            });
                              
                              
                              
                              


                            
                          } catch(json_error_2){
                              
                              
                              // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                              // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                              //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                              // the problem is internal folder is forbidden.

                              
                              console.log('catch( json_error_2 )', json_error_2)
                              
                              // not return error yet, because we will try proxy 

                             



                            try {
                          
                           
                                 var _proxified_url = proxify_url(___url_getJson)


                                 console.log('try ajax proxy =======> ',  _proxified_url)  
                              
                              input = await $.ajax({
                                                            timeout: _custom_timeout,
                                                            url:_proxified_url,

                                                            dataType: 'json',


                                                            success: function (data) {
                                                              
                                                            }, // success
                                                            
                                                            error: function (proxy_error_3) {
                                                              
                                                              console.log('throw error event (ajax proxy failed proxy_error_1)', proxy_error_3)                                        
                                                            }
                                                            
                                                        });
                          
                          
                          
                          


                        
                                        } catch(proxy_error_3){



                                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                                        var error_status = {
                                                          errorFrom: 'ajax_jsonp_json_proxy_proxy3',
                                                          readyState:proxy_error_3.readyState,
                                                          responseJSON:proxy_error_3.responseJSON,
                                                          status:proxy_error_3.status,
                                                          statusText: proxy_error_3.statusText
                                                        
                                                        }

                                                        return error_status

                                          } // try proxy 3




                              
                          } // try datatype:json   2
                      
                      
                      

        } // try jsonp 1






      return input
      }// function 

      async function ajax_json_proxy(___url_getJson, _custom_timeout){
            

          // 2 level try, json > proxy,  good for hub  /data.json


        // first try json 
        //  if json failed, catch and try  proxy

       

        // always with time out option 


       console.log('ajax json --> proxy ',___url_getJson)   
       var input;


       try{  

         input = await $.ajax({
                           timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                           type: 'GET',
                           dataType: 'json',
                          
                           url: ___url_getJson,
                           
                           
                           error: function (json_error_1) {
                                                       
                             console.log('throw error event(ajax json failed json_error_1) ', json_error_1)                                        
                           },
                                                       
                           success: function (data) {
                             
                           }
                       });                          


           } catch(json_error_1){ 

                       console.log('catch ( ajax jsonp failed jsonp_error_1 ) ', json_error_1)  
                       
                       // not return error yet, because we will try proxy

                       var _proxified_url = proxify_url(___url_getJson)


                       console.log('try ajax proxy =======> ',  _proxified_url)  
                       
                       
                       try {
                       
                               // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                               
                               input = await $.ajax({
                                                             timeout: _custom_timeout,
                                                             url:_proxified_url,

                                                             dataType: 'json',


                                                             success: function (data) {
                                                               
                                                             }, // success
                                                             
                                                             error: function (proxy_error_2) {
                                                               
                                                               console.log('throw error event (ajax proxy failed proxy_error_2)', proxy_error_2)                                        
                                                             }
                                                             
                                                         });
                           
                           
                           
                           


                         
                       } catch(proxy_error_2){
                           
                           
                           // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                           // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                           //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                           // the problem is internal folder is forbidden.

                           
                           console.log('catch( proxy_error_2 )', proxy_error_2)
                           
                          
                           var error_status = {
                                                    errorFrom: 'ajax_json_proxy',
                                                    readyState:proxy_error_2.readyState,
                                                    responseJSON:proxy_error_2.responseJSON,
                                                    status:proxy_error_2.status,
                                                    statusText: proxy_error_2.statusText
                                                  
                                                  }
                    
                            return error_status

                           
                       }     
                   
                   
                   

     }// try - catch






   return input
      }// function 
      
/**/
// ==============   end ========== ajax fetch general use ==============================
/**/


  














      /**/
      // --- --- ... ----  jsoneditor related   --- --- ... ---- only for json2tree  --- --- ... ---- with single function share for all use
      /**/
            var container_info_outline 
            var options_info_outline
            var editor_info_outline   

            var container_list 
            var options_list
            var editor_list

            // warning: (45, 46, etc quantity color) search for 'current_quantityFieldName = ', then must add  'current_classifyFieldName = current_quantityFieldName'   
            /**/
            // (4, 141, etc classify) search for 'current_selected_field_name = ', then must add  'current_classifyFieldName = current_selected_field_name'
            var current_classifyFieldName //---- only for json2tree  --- --- ... ---- with single function share for all use
            
            var container_search
            var options_for_search_only
            var editor_search
            var _search_keyword_data_array = []
            var search_result_feature_array_global_var = []
                                                          

                                            function onSelectionChange(start, end) {
                                                                                          
                                              console.log(' on selection change event   start, end :  ++++++++ ', start, end) 


                                            }



                                           
                                            
                                            // search result user mouse over a node, should fly to lat lng 
                                            function onEvent(node, event) {

                                              console.log(' on  event: node, event ---->', node, event) 
                                              console.log(' search_result_feature_array_global_var ---->', search_result_feature_array_global_var) 
                                            }
                        


                                            
                                            function init_json_viewer(){

                                              // inside nested function 
                                              function onClassName_FieldName({ path, field, value }) {

                                               // warning:  must define  current_classifyFieldName = current_quantityFieldName, current_field name, etc 
                                               //---- only for json2tree  --- --- ... ----
                                                        
                                               // console.log("  ######  onClassName  for_quantityColor  ######   field  ==  current_classifyFieldName  ######   ",  field , ' - ', current_classifyFieldName)
                                                // only for quantity color, highlight by field name

                                                if (field && current_classifyFieldName){   // must check undefined error
                                                        /* warning: field is actually "field (alias)",  but current quantityFieldName is only "field", they never equal,do not use "==", instead, should use ".includes" */
                                                        //if (field == current_classifyFieldName){
                                                        if (field.includes(current_classifyFieldName)){
                                                                              // add class to highlight that node
                                                                              //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                                              // found match, mark this node by add a new css class 
                                                                              console.log(" . . . .    . . . .  return  highlight_row_by_fieldName  . . . .  . . . . ",  field , ' . . .  ', current_classifyFieldName)
                                                                              return 'highlight_row_by_fieldName'   // css must create class named "highlight_row_by_fieldName"
                                                        } else {
                                                                              //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                                              return undefined
                                                        }

                                                }
                                              }

                                              // inside nested function 
                                              function onClassName({ path, field, value }) {
                                                      //  console.log("  ######  onClassName   ######   call back   ######  path, field, value   ######   ", path, field, value )
                                                      // only for dataset1, non-classified version, search key word is :     _search_data_content = "dog banning"
                                                      var node_is_match = false;
                                                      
                                                      if (typeof value === 'string') {
                                                                    var value_lowercase = value.toLowerCase()
                                                                    for (var i = 0; i < _search_keyword_data_array.length; i++) {
              
                                                                            var _search_keyword_item_lowercase = _search_keyword_data_array[i].toLowerCase()
                                                                            // console.log('  $$$$$$$$$ before match $$$$$$$$$$$$  ', value_lowercase, _search_data_array, _search_data_array[i], value_lowercase.indexOf(_search_data_array[i]) )
                                                                              if ((_search_keyword_item_lowercase) && ( value_lowercase.indexOf(_search_keyword_item_lowercase) > -1 )) {
                                                                                  //console.log('  $$$$$$$$$ found match key word $$$$$$$ add Class $$$$$$$$$$$$  ' )
                                                                                    node_is_match = true;
                                                                                    break;
                                                                              } // if
                                                                    } // for
                                                      } // if 

                                                    if (node_is_match){
                                                                          // add class to highlight that node
                                                                          //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                                          // found match, mark this node by add a new css class 
                                                                          return 'different_element'   // css must create class named "different_element"
                                                    } else {
                                                                          //The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
                                                                          return undefined
                                                    }
                                              }



           

                                              // ========== create the Jsoneditor ===============
                                              container_info_outline = document.getElementById("jsoneditor_info_outline");
                                              container_list = document.getElementById("jsoneditor_list");
                                              // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
                                
                                              // options = {sortObjectKeys:true};   // alphabetically sort object key, default is false
                                              options_info_outline = {                          
                                                            modes:['view', 'tree', 'preview'],
                                                            mainMenuBar  : false,    // remove main menu bar
                                                            navigationBar : false,   // remove navigation bar
                                                            "search": false,        // remove search box , default is true

                                                            onClassName: onClassName_FieldName, //   --- --- --- --- quantity color --- --- --- ---
                                    
                                              };
                                              options_list = {                          
                                                            modes:['view', 'tree', 'preview'],
                                                            mainMenuBar  : false,    // remove main menu bar
                                                            navigationBar : false,   // remove navigation bar
                                                            "search": false,          // remove search box , default is true

                                                            onClassName: onClassName_FieldName, //   --- --- --- --- quantity color --- --- --- ---
                                    
                                              };
                                              editor_info_outline = new JSONEditor(container_info_outline, options_info_outline);
                                              editor_list = new JSONEditor(container_list, options_list);
                                

                                              options_for_search_only = {
                                                            modes:['view', 'tree', 'preview'],
                                                            mainMenuBar  :  true,    // keep main menu bar
                                                            navigationBar :     true,   // keep navigation bar
                                                            "search": false,         // do not use search box , default is true

                                                            /*
                                                                only at search result, to speed up by only show 10 results.
                                                                maxVisibleChilds:  Number of children allowed for a given node before the "show more / show all" message appears (in 'tree', 'view', or 'form' modes). 100 by default.
                                                                https://github.com/josdejong/jsoneditor/blob/develop/docs/api.md
                                                            */ 
                                                                maxVisibleChilds:10,
                                
                                                            onSelectionChange : onSelectionChange,
                                                            onEvent: onEvent,

                                                            // https://github.com/josdejong/jsoneditor/blob/develop/examples/20_custom_css_style_for_nodes.html
                                                            // https://github.com/josdejong/jsoneditor/issues/1038
                                                            onClassName: onClassName,

                                                            /*
                                                                onChangeJSON: function (j) {
                                                                              window.editor.refresh()
                                                                }
                                                            */
                                              
                                              };
                                              container_search = document.getElementById("jsoneditor_search"); 
                                              editor_search = new JSONEditor(container_search, options_for_search_only);
                                              // ==========   End ======== create the Jsoneditor ===============
                                              /**/


                                              // only for json2tree by default, hide all json-editor-hosted-parent-div
                                              $("#info_outline").hide()
                                              $("#list").hide()
                                              $("#search-result-div").hide()


                                            }




                                    function init_json_viewer_for_table(){

                                      // ========== only for feature table ===============
                                      container = document.getElementById("jsoneditor");
                                      // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
                                      options = {                       
                                        modes:['view','tree','preview'],
                                        // mainMenuBar  : false,    // remove main menu bar
                                        // navigationBar : false,   // remove navigation bar
                                        "search": false          // remove search box , default is true
                                      };
                                      editor = new JSONEditor(container, options);
                                      // ==========   End ======== only for feature table ===============
                                    }

                              
                        //-------------------- end -------------------- jsoneditor --------------------









                                       
                        function update_url_parameter(_field, _value){
                                      
                          var _____searchParams = new URLSearchParams(window.location.search);

                          if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
//if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                                   // remove this param from uRL
                                      _____searchParams.delete(_field);
                                      console.log("delete url parameter: _field", _field );
                          } else {
                                  // update this param from uRL
                                      _____searchParams.set(_field, _value);
                                      console.log("update url parameter: _field _value", _field + " + "+ _value);
                          }

                          // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                          //window.location.search = searchParams.toString();

                          // instead avoid reload
                          var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
                          history.pushState(null, '', _____newRelativePathQuery);

                            // ...  ... ... share url  ...  ... ...
                            $('#share_url').val(window.location.href);
                            // ... end ... ... share url  ...  ... ...
                            /**/
                  }  





                  function isValidHttpUrl(string) {
                    let url;
                    
                    try {
                      url = new URL(string);
                    } catch (_) {
                      return false;  
                    }

                    return url.protocol === "http:" || url.protocol === "https:";
                  }






                        function update_center_latLngZoom_esri(view){

                             // var _map_center_point = view.center 

                          var center_latLng = view.center;   // local variable
                          _center_lat = center_latLng.latitude;     // global variable 
                          _center_long = center_latLng.longitude;    // global variable 
                          _center_zoom = parseInt(view.zoom);          // global variable 

                          console.log(' -------- update  -------- center  -------- lat  -------- Lng  -------- Zoom  -------- ', _center_lat, _center_long, _center_zoom)
                          

                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("_center_lat", _center_lat);
                            searchParams.set("_center_long", _center_long);
                            searchParams.set("_center_zoom", _center_zoom);
                            searchParams.set("panto", 0);

                            // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                            //window.location.search = searchParams.toString();

                            // instead avoid reload
                            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                            history.pushState(null, '', newRelativePathQuery);
                            
                            }// if

                            var _latlngzoom_html = ''
                            //_latlngzoom_html +='visible area : '
                            _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
                            _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
                            _latlngzoom_html += ',zoom:' + _center_zoom
                            $("#lat-lng-zoom").html(_latlngzoom_html)

                        }



                        function update_center_latLngZoom_esri_component(arcgis_map_component){

                          console.log('update center latLngZoom esri component',  arcgis_map_component)

                          
                           console.log('update center latLngZoom esri component center',  arcgis_map_component.center)
                          _center_lat = arcgis_map_component.center.latitude;     // global variable 
                          _center_long = arcgis_map_component.center.longitude;    // global variable 
                          _center_zoom = parseInt(arcgis_map_component.zoom);          // global variable 

                          console.log(' -------- update  -------- center  -------- lat  -------- Lng  -------- Zoom  -------- ', _center_lat, _center_long, _center_zoom)
                          

                          if ('URLSearchParams' in window) {
                            var searchParams = new URLSearchParams(window.location.search);
                            searchParams.set("_center_lat", _center_lat);
                            searchParams.set("_center_long", _center_long);
                            searchParams.set("_center_zoom", _center_zoom);
                            searchParams.set("panto", 0);

                            // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                            //window.location.search = searchParams.toString();

                            // instead avoid reload
                            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                            history.pushState(null, '', newRelativePathQuery);
                            
                            }// if

                            var _latlngzoom_html = ''
                            //_latlngzoom_html +='visible area : '
                            _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
                            _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
                            _latlngzoom_html += ',zoom:' + _center_zoom
                            $("#lat-lng-zoom").html(_latlngzoom_html)

                        }





        /**/
        // ----- loader counter -----  ----- 
        /**/
        
            function show_loading_img_spinner(elementID_appendTo, process_bar_id, ____url___info___){

                      // nested inner function      
                      function frame() {

                              if (width >= 1000) {
                                clearInterval(id);
                              } else {

                                width++; 

                                if (width < 10){

                                      elem.style.width = width * 10 + '%'; 
                                } else {

                                      elem.style.width = '100%'
                                }

                                elem.innerHTML ='<b style="font-size:48px;">' + width   + '</b>' ;
                              }
                      }






                                    
                      var _jquery_process_bar_id = '#' +  process_bar_id
                      
                      if ( $( _jquery_process_bar_id ).length ) { 
                            // already have one progress_bar do not duplicate
                      } else {
                                var animation_bar_id = process_bar_id + '_animation'

                                var preloader_div = document.createElement('div');
                                    preloader_div.setAttribute("id", process_bar_id);
                                    preloader_div.style.backgroundColor = 'rgb(113, 121, 126)';
                                    preloader_div.style.height = '60px';

                                var preloader_div_inner = document.createElement('div');
                                    preloader_div_inner.setAttribute("id", animation_bar_id);
                                    preloader_div_inner.style.backgroundColor = 'rgb(211, 211, 211)';
                                    preloader_div_inner.style.width = '10%'
                                    preloader_div_inner.innerHTML = '<b style="font-size:48px;">' + '1' + '</b>'
                                   
                                

                                    preloader_div.appendChild(preloader_div_inner);
                                      
                                    var element = document.getElementById(elementID_appendTo);
            
                                    element.appendChild(preloader_div);


                                    var elem = document.getElementById(animation_bar_id);   
                                    var width = 0;
                                    var id = setInterval(frame, 1000); 


                      }



            } // function



           function remove_loading_img_spinner(elementID_remove){
                     


             var _jquery_elementID_remove = '#' +  elementID_remove

             //if ( $( "#ajax_getJson_processing" ).length ) {
             if ( $( _jquery_elementID_remove ).length ) { 
               



                     var elem = document.getElementById(elementID_remove);
                     elem.parentElement.removeChild(elem);

             }

           }
            
        /**/
        // ----- end  -----  loader counter -----  ----- 
        /**/


                  





                                        
                  function set_my_widget_opacity(){
                    // ... only for my widget, by id  ...
                        // css id selector working, you can change dom element css property, but not css class property
                        $('#title_div').css('opacity', widget_opacity)
                        $('#current_zoom_level').css('opacity', widget_opacity)
                        $('#zoom2layer_button').css('opacity', widget_opacity)
                        $('#opacitytitle_span').css('opacity', widget_opacity)
                        $('#overlay_opacity_range').css('opacity', widget_opacity)
                        $('#overlay_opacity_label').css('opacity', widget_opacity)
                        //$('#hideLegend_button').css({'opacity': widget_opacity}) //works
                        $('#hideLegend_button').css('opacity', widget_opacity)    //works
                        $('#hidePrinter_button').css('opacity', widget_opacity)    //works
                        $('#statistic_info').css('opacity', widget_opacity)    //works

                        $('#coordsWidget').css('opacity', widget_opacity)    //works
                    // ... end ... only for my widget, by id  ...
                  }          
        

                  function init_esri_widget_opacity(){

                    // ...  ... only for esri widget, by esri-widget class  ...  ...

                          // css class selector not working, because you can't change css class property, but you can change dom element css property  https://stackoverflow.com/questions/11474430/change-css-class-properties-with-jquery
                          //$('.esri-widget').css('opacity', 0.3);   //  .css(property, value)
                          //$('.esri-widget').css({'opacity': 0.3})  //  .css({object})
                        
                      
                          // works https://stackoverflow.com/questions/11474430/change-css-class-properties-with-jquery#comment34840592_11474522
                          //$("head").append('<style type="text/css"></style>');
                          //var esriwidget_Element = $("head").children(':last');
                          //esriwidget_Element.html('.esri-widget{opacity:0.3;}');

                          // even better esri widget
                          $("head").append('<style id="esri_widget_style_changer" type="text/css"></style>');
                          //$('#esri_widget_style_changer').html('.esri-widget{opacity:0.3;}');  // keep for testing
                          $('#esri_widget_style_changer').html('.esri-widget{opacity:' + widget_opacity + ';}');
                          // my widget can't do this way
                          //$('#esri_widget_style_changer').html('.esri-widget{opacity:' + widget_opacity + ';}   ' + '.my_widget{opacity:' + widget_opacity + ';}   ');  // my widget not working


                          // dynamically change esri widget opacity works
                          //$('#esri_widget_style_changer').html('.esri-widget{opacity:0.3;}');
                      
                    // ...  ... end ...  ... only for esri widget, by esri-widget class  ...  ...

                  }


                  function set_esri_widget_opacity(){
                      // only for esri widget opacity, change css class property
                      //$('#esri_widget_style_changer').html('.esri-widget{opacity:0.3;}'); // keey for test only
                      $('#esri_widget_style_changer').html('.esri-widget{opacity:' + widget_opacity + ';}');
                  }









        /**/
        // ----- feature layer -----  ----- 
        /**/

            
              function update_statistic_info(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ rendered = '...' } // not available...

                var statistic_info_html = '<b style="font-size:96px; color:yellow; text-shadow:5px 5px 5px #000000">' + rendered + '</b>' + '<span style="font-size:48px; color:white; text-shadow:1px 1px 1px #000000"> / ' + total + '</span>'

                $('#statistic_info').html(statistic_info_html)
                $('#statistic_info').show()
              }



              

              async function ajax_try_jsonp_cors_proxy_return_json_object(_custom_url){

                var _return_json_object
                console.log('ajax try jsonp cors proxy return json object',_custom_url)

               

                try {


                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';


                  // jsonp 


                  var response_string =  await $.ajax({


                  
                                            type: 'GET',
                                            dataType: 'jsonp',
                                            data: {},
                                            url: _custom_url,
                                            error: function (jqXHR, textStatus, errorThrown) {
                                              
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                    console.log('ajax error  + ', _error_status);
                                                                
                                            },
                                            success: function (data) {
                                              console.log('ajax try jsonp cors proxy return json object --> jsonp --> success  --> ');
                                            }
                                          });  // await



                
                } catch(jsonp_failed) {


                          console.log('ajax try jsonp cors proxy return json object  --> jsonp failed !!!!!!', jsonp_failed);

                        try {

                                      



                                        // test only
                                        // throw ' ++++++++ test only ++++++++ cors failed'; 
                        
                                        // cors
                                        var response_string =  await $.ajax({
                                          type: 'GET',
                                        
                                          url: _custom_url,
                                          error: function (jqXHR, textStatus, errorThrown) {
                                            
                                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                                  console.log('ajax error  + ', _error_status);
                                                              
                                          },
                                          success: function (data) {
                                            console.log('ajax try jsonp cors proxy return json object --> cors --> success  --> ');
                                          }
                                        });  // await




                                          
                            
                        } catch(cors_failed) {

                                                    console.log('ajax try jsonp cors proxy return json object  --> cors failed !!!!!!', cors_failed);

                                                    try {

                                                              

                                                              // proxy
                                                              // --------- add proxy  ---------
                                                              var _custom_url_proxy = proxyurl +  _custom_url

                                                              var response_string =  await $.ajax({
                                                                type: 'GET',
                                        
                                                                url: _custom_url_proxy,
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                  
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                                    
                                                                },
                                                                success: function (data) {
                                                                  console.log('ajax try jsonp cors proxy return json object --> proxy --> success  --> ');
                                                                }
                                                              });  // await




                                                            } catch(proxy_failed) {


                                                              console.log('ajax try jsonp cors proxy return json object  --> proxy failed !!!!!!', proxy_failed);
                                                              return {'error':'ajax jsonp cors proxy all 3 failed'}
                                                            
                
                
                                                            } // catch proxy
                                                      
                
                                              } // catch cors
                
                
                } // catch jsonp

                

                // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                //is already a plain JavaScript object; no need to try to parse it.
                
                if (typeof response_string === 'object') {
                    // is object
                    _return_json_object = response_string
                } else {
                    // is string
                    _return_json_object = JSON.parse(response_string)
                }

                console.log(' ajax try jsonp cors proxy return json object  ---- ', _return_json_object)
                return _return_json_object
              }









              var spatial_reference
              var _featurelayerJSON; 
              var _feature_attributes  
              
              var maxRecordCount
              var standardMaxRecordCount
              var tileMaxRecordCount
              var standardMaxRecordCountNoGeometry
              var maxRecordCountFactor
              async function get_feature_attributes(_url, layerID){

                // must reset field name, when switch layers
                field_name = []

                try {
                                  // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
                                  // layer_id is 333, 
                                  var _url_layer = _url + '/'+  layerID + '?f=pjson'


                                  // token
                                  //console.log('arcgis_online_token = = =',  arcgis_online_token)
                                  if (arcgis_online_token){
                                    _url_layer += '&token=' + arcgis_online_token
                                  }



                                  console.log('get feature attributes url layer -layerID-:',layerID, _url_layer)

                                
                                  try {
                                      // jsonp 
                                      var response_string =  await $.ajax({
                                                                type: 'GET',
                                                                dataType: 'jsonp',
                                                                data: {},
                                                                url: _url_layer,
                                                                error: function (jqXHR, textStatus, errorThrown) {
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                        console.log('ajax error  + ', _error_status);
                                                                },
                                                                success: function (data) {
                                                                  console.log('get feature attributes , layer json --> jsonp --> success  --> ');
                                                                }
                                                              });  // await
                                    } catch(jsonp_failed) {
                                              console.log('get feature attributes , layer json  --> jsonp failed !!!!!!', jsonp_failed);
                                              try {
                                                            // cors
                                                            var response_string =  await $.ajax({
                                                              type: 'GET',
                                                              url: _url_layer,
                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                      console.log('ajax error  + ', _error_status);
                                                              },
                                                              success: function (data) {
                                                                console.log('get feature attributes , layer json --> cors --> success  --> ');
                                                              }
                                                            });  // await
                                            } catch(cors_failed) {
                                                                        console.log('get feature attributes , layer json  --> cors failed !!!!!!', cors_failed);
                                                                        try {
                                                                                  // proxy
                                                                                  // --------- add proxy  ---------
                                                                                  var _url_layer_proxy = proxyurl +  _url_layer
                                                                                  var response_string =  await $.ajax({
                                                                                    type: 'GET',
                                                                                    url: _url_layer_proxy,
                                                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                                                                            var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                            console.log('ajax error  + ', _error_status);
                                                                                                        
                                                                                    },
                                                                                    success: function (data) {
                                                                                      console.log('get feature attributes , layer json --> proxy --> success  --> ');
                                                                                    }
                                                                                  });  // await
                                                                        } catch(proxy_failed) {
                                                                                  console.log('get feature attributes , layer json  --> proxy failed !!!!!!', proxy_failed);
                                                                        } // catch proxy
                                                                  } // catch cors
                                    
                                    } // catch jsonp

                                   
                                    // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                                    //is already a plain JavaScript object; no need to try to parse it.
                                    if (typeof response_string === 'object') {
                                        // is object
                                        _featurelayerJSON = response_string
                                    } else {
                                        // is string
                                        _featurelayerJSON = JSON.parse(response_string)
                                    }
                                    console.log(' get feature attributes, advanced query support   ====  _featurelayerJSON', _featurelayerJSON)


/*
   arcgis server always response error message as 
                                                 { error:
                                                        code: 400
                                                        details: []
                                                        message: "Invalid URL
                                                 } 
*/
if (_featurelayerJSON.error) {
                                throw _featurelayerJSON.error.message;
}
                                                  
standardMaxRecordCount = _featurelayerJSON.standardMaxRecordCount
tileMaxRecordCount = _featurelayerJSON.tileMaxRecordCount
standardMaxRecordCountNoGeometry = _featurelayerJSON.standardMaxRecordCountNoGeometry
maxRecordCountFactor = _featurelayerJSON.maxRecordCountFactor
maxRecordCount = _featurelayerJSON.maxRecordCount

                                    _supportsAdvancedQueries  =  _featurelayerJSON.supportsAdvancedQueries
                                    _supportsStatistics       =  _featurelayerJSON.supportsStatistics

                                    if (_featurelayerJSON.hasOwnProperty('advancedQueryCapabilities')){
                                            _supportsCountDistinct  = _featurelayerJSON.advancedQueryCapabilities.supportsCountDistinct
                                            _supportsDistinct       = _featurelayerJSON.advancedQueryCapabilities.supportsDistinct
                                            _supportsHavingClause   = _featurelayerJSON.advancedQueryCapabilities.supportsHavingClause
                                            _supportsOrderBy        = _featurelayerJSON.advancedQueryCapabilities.supportsOrderBy
                                            _supportsPagination     = _featurelayerJSON.advancedQueryCapabilities.supportsPagination
                                            _useStandardizedQueries = _featurelayerJSON.advancedQueryCapabilities.useStandardizedQueries
                                            _supportsStatistics     = _featurelayerJSON.advancedQueryCapabilities.supportsStatistics
                                            _supportsTrueCurve      = _featurelayerJSON.advancedQueryCapabilities.supportsTrueCurve
                                            _supportsReturningQueryExtent = _featurelayerJSON.advancedQueryCapabilities.supportsReturningQueryExtent
                                            _supportsQueryWithDistance = _featurelayerJSON.advancedQueryCapabilities.supportsQueryWithDistance
                                                        _supportsQueryWithResultType = _featurelayerJSON.advancedQueryCapabilities.supportsQueryWithResultType
                                    }  


                                   
                                   if (_featurelayerJSON.hasOwnProperty("extent")){
                                    spatial_reference = _featurelayerJSON.extent.spatialReference.wkid
                                   }

                                   if (_featurelayerJSON.hasOwnProperty("fullExtent")){
                                    spatial_reference = _featurelayerJSON.fullExtent.spatialReference.wkid
                                   }

                                   if (_featurelayerJSON.hasOwnProperty("initialExtent")){
                                    spatial_reference = _featurelayerJSON.initialExtent.spatialReference.wkid
                                   }


                                    // warning:  .fields can be null, if layer is only raster image  
                                    if (_featurelayerJSON.hasOwnProperty('fields')){
                                                          _feature_attributes = _featurelayerJSON.fields
                                                          var arrayLength = _feature_attributes.length;

                                                          for (var i = 0; i < arrayLength; i++) {

                                                                  var ____fieldAlias = _feature_attributes[i].alias
                                                                  var ____fieldType = _feature_attributes[i].type
                                                                  var ____fieldName = _feature_attributes[i].name
                                                                  var ____fieldName_lowerCase  = ____fieldName.toLowerCase();
                                                                  var ____fieldType_lowerCase  = ____fieldType.toLowerCase();
                                                                  var ____fieldAlias_lowerCase  = ____fieldAlias.toLowerCase();
                                                                                                      
                                                                  if (                                              
                                                                                                        // skip geometry field "SHAPE", "SHAPE.LEN", "SHAPE.AREA"
                                                                                                        (____fieldName_lowerCase.includes('shape') ) ||
                                                                                                        (____fieldType_lowerCase.includes('geometry') ) ||

                                                                                                        // skip all ID field , esriFieldTypeOID | esriFieldTypeGlobalID | esriFieldTypeGUID  
                                                                                                        (____fieldType_lowerCase.includes('id') )  ||
                                                                                                        (____fieldName_lowerCase.includes('fid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('oid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('objectid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('guid') ) ||
                                                                                                        (____fieldName_lowerCase.includes('globalid') ) ||

                                                                                                        // skip below field
                                                                                                        (____fieldType_lowerCase.includes('raster') )  ||
                                                                                                        (____fieldType_lowerCase.includes('blob') )  ||
                                                                                                        (____fieldType_lowerCase.includes('xml') )

                                                                  ){ 
                                                                                // skip esri geometry, shape, object-id,etc.. field
                                                                  } else {  
                                                                                    field_name.push(____fieldName)
                                                                                    // not use 0,1,2, as index key, 
                                                                                    //field_type.push(____fieldType)
                                                                                    // in use, field name as index key
                                                                                    field_type[____fieldName] = ____fieldType
                                                                                    field_alias[____fieldName] = ____fieldAlias
                                                                            
                                                                                    if (____fieldType_lowerCase.includes('string')){ 
                                                                                                              _feature_attributes_string.push(____fieldName)
                                                                                  
                                                                                    } else if (____fieldType_lowerCase.includes('integer') || 
                                                                                               ____fieldType_lowerCase.includes('double')  || 
                                                                                               ____fieldType_lowerCase.includes('single')){
                                                                                                              _feature_attributes_integer.push(____fieldName)
                                                                                  
                                                                                    } else if (____fieldType_lowerCase.includes('date') ){
                                                                                                              _feature_attributes_date.push(____fieldName)
                                                                                    }// if

                                                                }// if 

                                                                                  
                                                          }// for

                                                          console.log(' text field name array : ',   _feature_attributes_string)
                                                          console.log(' number field name array : ', _feature_attributes_integer)
                                                          console.log(' date field name array : ', _feature_attributes_date)
                                                          console.log('field type object based on field name as key : ', field_type)
                                                          console.log('all displaying mixed field name : ', field_name) 
                                    }//if fields

                           // update object id field name
                            if (_featurelayerJSON.objectIdField){
                                  objectid_field_name = _featurelayerJSON.objectIdField
                            } else {
                                     if (_featurelayerJSON.fields) {
                                      _feature_attributes = _featurelayerJSON.fields
                                      for (var i = 0; i < _feature_attributes.length; i++) {
                                        if ((_feature_attributes[i].type == 'esriFieldTypeOID')
                                            || (_feature_attributes[i].alias == 'OBJECTID')){
                                              objectid_field_name = _feature_attributes[i].name
                                              break;
                                          }//if
                                        }//for
                                      }//if
                            }//if object-id
                            


                            // update layer name           
                                  _layer = _featurelayerJSON.name   
                                  document.title = _layer  
                                  update_url_parameter('layer',_layer ) 

                                  var html_layerInfo = '<a href="' + _url_layer + '">' + '<strong style="font-size:27px;">' + _layer + '</strong>'  + '</a>'
                                  html_layerInfo += '</br>'
                                  html_layerInfo += '<a href="' + _url_layer + '">' + '<span style="font-size:10px;">' + _url_layer + '</span>' +  '</a>'
                                  $('#layer-info').html(html_layerInfo)
                        
                          } catch (error) {
                              console.error(' error on field name,  fail to get feature attribute -----> ', error);
                              //render_message_fieldName_panel(error)
                          }// try

              } 






        /**/
        // ----- end  -----  feature layer -----  ----- 
        /**/





        /* Haversine formula How to calculate distances between points 
                                        https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943#27943
                                        https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
                                  */



            // straight line distance
            var straightLine_distance_km
            var straightLine_distance_km_2digDecimal
            var straightLine_distance_mile
            var straightLine_distance_mile_2digDecimal
            var km_mile_conversion = 0.621371
            var straightLine_distance_html     
            var latitude_1,longitude_1,latitude_2,longitude_2;
            


            function getStraightLineDistance(lat1,lon1,lat2,lon2){
                                                      
                                         
              straightLine_distance_km = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)  //(lat1,lon1,lat2,lon2)
              straightLine_distance_mile = straightLine_distance_km * km_mile_conversion
              straightLine_distance_km_2digDecimal = Number.parseFloat(straightLine_distance_km).toFixed(2)
              straightLine_distance_mile_2digDecimal = Number.parseFloat(straightLine_distance_mile).toFixed(2)
              var _distance_html = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;straight line distance ' + '<span style="font-size:2em;">' + straightLine_distance_km_2digDecimal + '</span> km = ' + '<span style="font-size:2em;">' + straightLine_distance_mile_2digDecimal + '</span> mile' + ' (Haversine formula)'
              return _distance_html
              
            }


                // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943#27943 
                function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
                  var R = 6371; // Radius of the earth in km
                  var dLat = deg2rad(lat2-lat1);  // deg2rad below
                  var dLon = deg2rad(lon2-lon1); 
                  var a = 
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2)
                    ; 
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                  var d = R * c; // Distance in km
                  return d;
                }
                // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943#27943
                function deg2rad(deg) {
                  return deg * (Math.PI/180)
                }

        /*  === end = = = Haversine formula How to calculate distances between points */







 			   /**/
         //  ---  print   --- 
         /**/

         var title_html = ''


        

        


         function init_print(){



                $("#print_map_btn").on( "click", function(){
                  console.log(' clicked print map button ')
                  // full page print
                  window.print();
                }); // click

                $("#sample_title_btn").on( "click", function(){

                  title_html = '<div style="background-color:rgba(100, 149, 237, 0.9);"><h1 style="display:inline;">edit title here</h1></br><span>details here</span></div>'
                  $("#edit_title_textarea").val(title_html)
                  console.log(' title html changed to ', title_html);
                  $("#title_div").html(title_html)
                }); // clear

                $("#clear_title_btn").on( "click", function(){
                  console.log(' clicked clear button ')
                  $("#edit_title_textarea").val('')
                  $("#title_div").html('')
                }); // clear

                $("#update_title_btn").on( "click", function(){
                  title_html = $("#edit_title_textarea").val()
                  console.log(' title html changed to ', title_html);
                  $("#title_div").html(title_html)
                }); // clear

                $("#edit_title_textarea").on( "keyup", function(){
                  title_html = $("#edit_title_textarea").val()
                  console.log(' title html changed to ', title_html);
                  $("#title_div").html(title_html)
                }); // keyup





              }

          /**/
          //  --- end  --- print   --- 
          /**/





  









                  // feed to esri-geojson-layer only,   do not encode where-condition, not support multiple keyword, only support 1 keyword
                  function build_where_condition_single_keyword(_search_keyword, _clause_Operator){
                    // esri api only,   do not encode where-condition,
                    console.log('what field is string type . . . ', _feature_attributes_string)
                    console.log('what field is number type . . .  ', _feature_attributes_integer)

                    var where_condition = ''

                    // step 1) no matter what, first always treat search keyword as string,  
                                // no matter is number or string, always treat as 'string' first
                                for (var i = 0; i < _feature_attributes_string.length; i++) {
                                  if (i>0){ where_condition +=  ' or '}
                                  if (_clause_Operator == 'like'){            
                                      // slow,   'like' cost 10 times expensive than '=' 
                                      // %	Any string of zero or more characters.	WHERE title LIKE '%computer%' finds all book titles with the word 'computer' anywhere in the book title.
                                      where_condition += 'LOWER( ' + _feature_attributes_string[i] + " ) like '%" + _search_keyword.toLowerCase() + "%'";
                                  } else if (_clause_Operator == 'equal') {
                                      // exact field match , full field match only
                                      where_condition += 'LOWER( ' + _feature_attributes_string[i] + " ) = '" + _search_keyword.toLowerCase() + "'";
                                  }// if
                                }// for

                    // step 2) if is number must add integer field at the end, 
                    if (isNaN(_search_keyword)){
                        // nothing to do here, 
                    } else {
                                  // is number 12345, must add attributes_integer = xxx
                                  for (var i = 0; i < _feature_attributes_integer.length; i++) {
                                          where_condition += ' or ' // always add or, because it append to previous clause
                                          where_condition += _feature_attributes_integer[i] + ' = ' + _search_keyword 
                                  }// for

                    }//if
                      
                    // fix bug, if search keywords have number, for example 18T,  where =  like '%18T' %18 becomes special char. 
                    // so must encode where condition before send to url
                    var encoded_where_condition = encodeURI(where_condition); 

                    // only when directly use arcgis REST api, send where clause via URL, need encode, 
                    //return encoded_where_condition

                    // arcgis v4.x use feature filter set where clause, no need encode.
                    return where_condition
                  }
                  


                  function build_where_condition_by_field(_search_keyword, _clause_Operator, _searchByFieldName){
                    // esri api only,   do not encode where-condition,
                    console.log('searchByField, what field is string type . . . ',_searchByFieldName, _feature_attributes_string)
                    console.log('searchByField, what field is number type . . .  ',_searchByFieldName, _feature_attributes_integer)

                    var where_condition = ''

                    // step 1) no matter what, first always treat search keyword as string,  
                                // no matter is number or string, always treat as 'string' first
                                if (_feature_attributes_string.includes(_searchByFieldName)){
                                          if (_clause_Operator == 'like'){            
                                              // slow,   'like' cost 10 times expensive than '=' 
                                              // %	Any string of zero or more characters.	WHERE title LIKE '%computer%' finds all book titles with the word 'computer' anywhere in the book title.
                                              where_condition += 'LOWER( ' + _searchByFieldName + " ) like '%" + _search_keyword.toLowerCase() + "%'";
                                          } else if (_clause_Operator == 'equal') {
                                              // exact field match , full field match only
                                              where_condition += 'LOWER( ' + _searchByFieldName + " ) = '" + _search_keyword.toLowerCase() + "'";
                                          }// if
                                }//if includes
                             

                    // step 2) if is number must add integer field at the end, 
                    if (isNaN(_search_keyword)){
                        // nothing to do here, 
                    } else {

                              if (_feature_attributes_integer.includes(_searchByFieldName)){
                                  // is number 12345, must add attributes_integer = xxx
                                  where_condition += _searchByFieldName + ' = ' + _search_keyword 
                              }//if includes
                                

                    }//if
                      
                    // fix bug, if search keywords have number, for example 18T,  where =  like '%18T' %18 becomes special char. 
                    // so must encode where condition before send to url
                    var encoded_where_condition = encodeURI(where_condition); 

                    // only when directly use arcgis REST api, send where clause via URL, need encode, 
                    //return encoded_where_condition

                    // arcgis v4.x use feature filter set where clause, no need encode.
                    return where_condition
                  }




                   
                    // feed to esri-feature-layer only,   do not encode where-condition,  support multiple keyword
                    function build_where_condition_multiple_keyword(_search_keyword, _clause_Operator){

                      console.log('what field is string type . . . ', _feature_attributes_string)
                      console.log('what field is number type . . .  ', _feature_attributes_integer)

                      var where_condition = ''; 
                      var __keywords_array = _search_keyword.split(" ");
                      console.log(' keywords array ->  ', _search_keyword, __keywords_array)
                    
                        /*

                            // ============ sql server full text search =================

                                                    // arcgis rest api full text search is based on sql server full text search.
                                                    // not like socrata ( support full text search, for multiple keywords, example,  'wood black', will find any fields have both wood and black)

                                                                  // NOT use, because most of sql server did not create full text search index
                                                                  // only works when arcgis server - sql server - create full text search index.

                                                                
                                                                          https://docs.microsoft.com/en-us/sql/t-sql/queries/contains-transact-sql?view=sql-server-ver15

                                                                              CONTAINS (   
                                                                                {   
                                                                                  column_name | ( column_list )   
                                                                                | *   
                                                                                | PROPERTY ( { column_name }, 'property_name' )    
                                                                                }   
                                                                                , '<contains_search_condition>'  
                                                                                [ , LANGUAGE language_term ]  
                                                                              )   



                                                                          https://docs.microsoft.com/en-us/sql/t-sql/queries/freetext-transact-sql?view=sql-server-ver15


                                                                                FREETEXT ( { column_name | (column_list) | * }   
                                                                                          , 'freetext_string' [ , LANGUAGE language_term ] )  
                                                                

                                                                        // _feature_attributes_string = [ 'name', 'address'....]   // all field type is char nvchar,
                                                                        var _charType_fieldName_string = _feature_attributes_string.join()  // default join(), separate by comma:     'name,address,....'
                                          
                                                                        // contains :  means keywords phrase must be same wording
                                                                        // not use
                                                                        // where_condition += " CONTAINS ({" + _charType_fieldName_string + "},  '" + _search_keyword    +"')";


                                                                        // freetext : means keywords phrase not be same wording, separate each keywords use AND.
                                                                        // in use
                                                                        where_condition += " FREETEXT ({" + _charType_fieldName_string + "},  '" + _search_keyword   +"')";

                                                                      
                            // ============  end  ============  sql server full text search =================       

                      */


                       // step 1) no matter what, first always treat search keyword as string,                 
                                  // no matter is number or string, always treat as 'string' first
                                    // ********* not real full text search,  a OR b ( real full text search is a AND b) ********* 
                                    console.log(' string - feature attributes ,  ', _search_keyword , _feature_attributes_string)
                                                                                              
                                    for (var i = 0; i < _feature_attributes_string.length; i++) {

                                                if (i>0) {where_condition +=  ' or ' } // first item must not start with 'or', otherwise, will error

                                                where_condition += ' ( '

                                                if (_clause_Operator == 'like'){  

                                                        for (var k = 0; k < __keywords_array.length; k++) {
                                    
                                                                var _each_keyword_item = __keywords_array[k].trim()

                                                                if (k>0) {where_condition = where_condition + ' or ' }

                                                                // slow,   'like' cost 10 times expensive than '=' 
                                                                // %	Any string of zero or more characters.	WHERE title LIKE '%computer%' finds all book titles with the word 'computer' anywhere in the book title.
                                                                //where_condition += _feature_attributes_string[i] + " like '%" + _each_keyword_item + "%'";
                                                                // SQL always use lowercase,  SELECT * FROM trees WHERE LOWER( trees.title ) LIKE  '%elm%'   https://stackoverflow.com/questions/2876789/how-can-i-search-case-insensitive-in-a-column-using-like-wildcard
                                                                where_condition += 'LOWER( ' + _feature_attributes_string[i] + " ) like '%" + _each_keyword_item + "%'"; 
                                                        }// for k

                                                } else if (_clause_Operator == 'equal') {

                                                          // exact field match , full field match only
                                                          where_condition +=  'LOWER( ' + _feature_attributes_string[i] + " ) = '" + _search_keyword + "'";
                        
                                                }// if  

                                                where_condition += ' ) '

                                    }// for i
                                                  // ************  end   ********* not real full text search,  a OR b ( really full text search is a AND b) ********* 

                                    // step 2) if is number must add integer field at the end, 
                                    if (isNaN(_search_keyword)){ 
                                    // nothing to do here, 

                                    } else {

                                                // is number 12345, must add attributes_integer = xxx
                                                console.log('  integer -  feature attributes ,  ', _search_keyword , _feature_attributes_integer)
                                                for (var i = 0; i < _feature_attributes_integer.length; i++) {
                                                    // at least have 1 text string field, number integer field is never be first one, so always need 'or' 
                                                    where_condition +=  ' or '
                                                    //if (i>0) {where_condition +=  ' or ' }  // first item must not start with 'or', otherwise, will error
                                                    where_condition += _feature_attributes_integer[i] + ' = ' + _search_keyword 
                                                }// for

                                    } // if

                                              console.log(' where condition ******* before enccode ******** ', where_condition)

                                              // esri api, do not use encoded where condition
                                              // fix bug, if search keywords have number, for example 18T,  where =  like '%18T' %18 becomes special char. 
                                              // so must encode where condition before send to url
                                              //var encoded_where_condition = encodeURI(where_condition); 

                                              //return encoded_where_condition

                                              // esri api, do not use encoded where condition
                                              return where_condition
                    }
                    
                    
   




                        
    function get_feature_attributes_esri_featureLayer(___feature_fields_array){

      console.log('feature fields array .....from esri feature layer ', ___feature_fields_array)
      for (var i = 0; i < ___feature_fields_array.length; i++) {
                            
            var _type = ___feature_fields_array[i].type
            var _field = ___feature_fields_array[i].name

            _type = _type.toLowerCase();
            
            //if (_type == 'esriFieldTypeString'){
           if (_type.includes('string')){
                  _feature_attributes_string.push(_field)
           } 
           if ((_type.includes('integer')) || (_type.includes('double'))){
                                  _feature_attributes_integer.push(_field)
           }

           //......  must always find the id, decide which one exist 'OID','FID','OBJECTID'...  ..........
                    if (idx_reference_field == 'lunr_id'){

                            for (h2 = 0; h2 < possible_idx_field_name_array.length; h2++) {
                              
                                    if (_field == (possible_idx_field_name_array[h2])) {
                                        

                                      idx_reference_field = possible_idx_field_name_array[h2]

                                      console.log('idx_reference_field ..... ', idx_reference_field)
                                      
                                      break;  // first use OID, if not exist, use FID, the last use OBJECTID 
                                      
                                    }//if 
                      
                            }//for
                    }
           //...... end ..............  must always find the id, decide which one exist 'OID','FID','OBJECTID'...  ..........
            
     }// for

     console.log('_feature_attributes_string ',_feature_attributes_string)
     console.log('_feature_attributes_integer ',_feature_attributes_integer)
    }


    var default_zoom_level_for_point = 18

    function goToLatLong(__lat, __long,){
      view.goTo({
        center: [__long, __lat]
      })
      .catch(function(error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    }

    

    function zoomToLatLong(__lat, __long, __zoom){


      // bug fix https://community.esri.com/thread/224073-how-to-use-viewgoto
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo

      console.log('zoom To Lat Long ', __lat, __long, __zoom)

      var esri_point = new Point({
          latitude: __lat,
          longitude: __long
        });

      var esri_goto_option = {
          animate: true,
          duration: 200, 
        };




view.goTo({
          target: esri_point,
          zoom: __zoom

        }, esri_goto_option)

      
        
        .catch(function(error) {

          if (error.name != "AbortError") {
                    console.error('zoom to real location, view goto error', error);
          }

        });



    }








/**/
//  --- esri geocode    --- 
/**/


      // reverse geocode sample : https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
      var reverseGeocodeURL_template = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=' // ...&location=-117.20744088954731%2C34.0375903447169

   async function esri_geocode_api_reverseGeocode_compact_for_compare(_user_clicked_point_lng, _user_clicked_point_lat){

          var _esri_reverse_geocode_url = reverseGeocodeURL_template + _user_clicked_point_lng + ',' + _user_clicked_point_lat
          console.log("reverse geocode url :  ", _esri_reverse_geocode_url)

          var addressResult_string = await ajax_getjson_common(_esri_reverse_geocode_url)
          console.log("reverse geocode address results :  ", addressResult_string)
          var addressResult = convert_to_json(addressResult_string)
          console.log('LongLabel address', addressResult.address.LongLabel)
          address_value_html = '<span style="font-size:13px;">' + addressResult.address.LongLabel +   '</span>' 
          $('#message').html(address_value_html)


          //$('#info-window-div').html(json_flex_tip_viewer(addressResult.address))


   }

/**/
//  --- end  ---  esri geocode    --- 
/**/









    

/**/
//  --- microsoft geocode   ( for esri compare only )   --- 
/**/
   

  // only place holder hidden, for create
  var microsoft_map
  function microsoft_geocode_api_reverseGeocode_compact_for_compare(_centerLng, _centerLat, _radiusMeter){



    
    // Initialize a map instance.
    if (microsoft_map){

    } else {
             microsoft_map = new atlas.Map('microsoft_map', {
                  // Add authentication details for connecting to Azure Maps.
                  authOptions: {

                      // works, use azure map primary key.
                      authType: 'subscriptionKey',
                      subscriptionKey: microsoft_azure_primary_key_public,
                  }
              }); // new map
    }//if 
    
  
        //Use MapControlCredential to share authentication between a map control and the service module.
        var pipeline = atlas.service.MapsURL.newPipeline(new atlas.service.MapControlCredential(microsoft_map));

        //Construct the SearchURL object
        var searchURL = new atlas.service.SearchURL(pipeline);


        // api search Nearby parameter https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
        
        // api https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest
        searchURL.searchAddressReverse(

            // aborter
            atlas.service.Aborter.timeout(10000), 
            // searchAddressReverse
            // https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchaddressreverse
            [Number(_centerLng), Number(_centerLat)],   // _lng_lat_array,

        ).then((addressResult) => {


           

           
            console.log('address result', addressResult)

      

        var _freeformAddress = ''
        var _place_id = ''
        var address_value_html = ''

       

        var results_array = addressResult.addresses

                    
        for (let i = 0; i < results_array.length; i++) {

            _freeformAddress = results_array[i].address.freeformAddress

            _place_id = results_array[i].id
                      
            if (i < 2){
            
              

                  // address 
                  address_value_html += '<span style="font-size:13px;">' + _freeformAddress +   '</span>'
                  // place id 
                  //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                  //address_value_html += "<br>"




                  //address_value_html += "<br>"

            } else{    
              
              

                        //address_value_html += "<br>"
                        //address_value_html += '<span style="font-size:11px;">' + _freeformAddress +   '</span>'  
                        //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
            }// if
        }// for

    


         //  --- microsoft geocode   ( for esri compare only )   --- 
         $('#message2').html(address_value_html)                          
    




    
      })
      .catch(error => {
        // Handle any errors
        console.error('There has been a problem with your fetch operation:', error);
      });



       // api search Nearby parameter https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
        searchURL.searchNearby(

            // aborter
            atlas.service.Aborter.timeout(10000), 

            // location GeoJSON.Position an array of [longitude, latitude]
            [Number(_centerLng), Number(_centerLat)], 

            // SearchNearbyOptions  
            // URL REST parameter is here https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-nearby?view=rest-maps-1.0&tabs=HTTP
            // class api is here: https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
            
            {
            
            // Starting offset of the returned results within the full result set. Default: 0 
            ofs: 0,
            
            limit: 100, // max is 100
            lon: Number(_centerLng),
            lat: Number(_centerLat),


            // maxFuzzyLevel https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-fuzzy?view=rest-maps-1.0&tabs=HTTP
            //maxFuzzyLevel: 4,
            //minFuzzyLevel: 1,


            radius: Number(_radiusMeter),
           

            // not working
            // must convert position array to string
            //topLeft: topLeft_NW_position.toString(),
            //btmRigh: btmRigh_SE_position.toString(),
            //topLeft: topLeft_NW_position,
            //btmRigh: btmRigh_SE_position,

            view: 'Auto',

        }).then((results) => {

            console.log('microsoft nearby result ', results)

            microsoft_poi_geojson = results.geojson.getFeatures();
            console.log('microsoft nearby result , get features ,microsoft poi geojson ', microsoft_poi_geojson)

            var microsoft_poi_html = ''
            var microsoft_poi_results_array = results.results
            for (let i = 0; i < microsoft_poi_results_array.length; i++) {
              microsoft_poi_html += "<span style='font-size:16.2px;  font-weight:800;'>" + microsoft_poi_results_array[i].poi.name + "</span>" 
              microsoft_poi_html += ", "
            }


            //  --- microsoft poi   ( for esri compare only )   --- 
            $('#message3').html(microsoft_poi_html)       

        });// then search poi



  }

/**/
//  --- end  ---  microsoft geocode   ( for esri compare only )   --- 
/**/







/**/
//  --- here map    --- 
/**/


async function here_map_geocode_api_reverseGeocode_compact_for_compare(_lat_comma_lng_string){

    
    // old api key works
    var _reverseGeocode_by_here_url = 'https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=' + heremap_api_key


     _reverseGeocode_by_here_url +=  '&at=' + _lat_comma_lng_string
     _reverseGeocode_by_here_url +=  '&limit=2'  // 1-100
    // _reverseGeocode_by_here_url +=  '&types=place';  // "Unsupported value: 'place'. Supported values: 'address', 'area', 'city', 'street'",

    console.log(' _reverseGeocode_by_here_url ', _reverseGeocode_by_here_url)
                 
    
    var _response_reverseGeocode = await ajax_getjson_common(_reverseGeocode_by_here_url)
    if (typeof _response_reverseGeocode === 'object') {
                    // is object
                    addressResult = _response_reverseGeocode
    } else {
                    // is string
                    addressResult = JSON.parse(_response_reverseGeocode)
    }
    console.log('Here map address result', addressResult)



    
        var results_array = addressResult.items
        var place_title
        var address_label
        var address_value_html = ''

        for (let i = 0; i < results_array.length; i++) {
            address_label = results_array[i].address.label
            place_title = results_array[i].title

             address_value_html += '<span style="font-size:15px; font-weight:800;">' + place_title +   '</span>'
             address_value_html += '<sup style="font-size:10px;">' + address_label +   '</sup>' 
             address_value_html += '</br>'

        }//for

         //  --- here map geocode   ( for esri compare only )   --- 
         $('#message4').html(address_value_html)      

}


/**/
//  --- end  ---  here map    --- 
/**/



    


/**/
//  --- google place geocode  ( for esri compare only )  --- 
/**/
          

 
  async function google_place_api_reverseGeocode_compact_for_compare(_lat_comma_lng_string){

    // billing https://developers.google.com/maps/documentation/geocoding/usage-and-billing
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=your_api_key
    // for this kind of place,geocode api call with &key=xxx,Google not allow use website restrict(localhost,referer restrict is not allowed), can only use IP restrict (hp-police)localhost ip: 167.224.97.162  production server ip: 116.221.167.72
    // different from google map api key,  which is website restrict to transparentgov.net only

    your_google_api_key = $('#googlemap-key-input').val(); 
    update_url_parameter('yourGoogleKey', your_google_api_key)


    
    var _reverseGeocode_by_google_url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + your_google_api_key +  '&latlng=' + _lat_comma_lng_string;
    console.log(' _reverseGeocode_by_google_url ', _reverseGeocode_by_google_url)
                 
    
    var _response_reverseGeocode = await ajax_getjson_common(_reverseGeocode_by_google_url)
    if (typeof _response_reverseGeocode === 'object') {
                    // is object
                    addressResult = _response_reverseGeocode
    } else {
                    // is string
                    addressResult = JSON.parse(_response_reverseGeocode)
    }
    console.log('address result', addressResult)

    var _formatted_address = ''
    var _place_id = ''
    var address_value_html = ''

    var _place_details
    var _place_displayName
    var _photos_array
    var _photos_name
    var _photos_heightPx
    var _photos_widthPx

    var results_array = addressResult.results
                
    for (let i = 0; i < results_array.length; i++) {

        _formatted_address = results_array[i].formatted_address
        _place_id = results_array[i].place_id
                  
        if (i < 2){
         
          // Place Details (New) requests https://developers.google.com/maps/documentation/places/web-service/place-details
          var _place_details_by_google_url = 'https://places.googleapis.com/v1/places/' + _place_id + '?fields=id,displayName,photos&key=' +  your_google_api_key
          
          
          var _response_place_details = await ajax_getjson_common(_place_details_by_google_url)
              if (typeof _response_place_details === 'object') {
                              // is object
                              _place_details = _response_place_details
              } else {
                              // is string
                              _place_details = JSON.parse(_response_place_details)
              }
              console.log('_place_details', _place_details)


              if (_place_details.hasOwnProperty('displayName')){
                _place_displayName =  _place_details.displayName.text
              }


              // place name 
                address_value_html += '<span style="font-size:19.3px; font-weight:800;">' + _place_displayName + '</span>'  
                address_value_html += "&nbsp;"
                // address 
                address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'
                // place id 
                //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                address_value_html += "&nbsp;"

              // photos
              if (_place_details.hasOwnProperty('photos')){

                _photos_array = _place_details.photos
                for (let p = 0; p < _photos_array.length; p++) {
                  _photos_name =  _photos_array[p].name
                  _photos_heightPx = _photos_array[p].heightPx
                  _photos_widthPx = _photos_array[p].widthPx

                  //  --- google place geocode  ( for esri compare only )  ---   250px
                    address_value_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=250&maxWidthPx=250&key=' + your_google_api_key + '" >'
                }// for photo

              }//if


              address_value_html += "<br>"

        } else{    
          
          
                      address_value_html += "<br>"
                      address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'  
                      address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
        }// if
    }// for
                                  
    $('#message1').html(address_value_html)

  }

/**/
//  --- end  ---  google place geocode    --- 
/**/











        /**/
        // -- -- -- vertial adjustment  -- -- -- 
        /**/


            function json_flex_tip_viewer(object1){

              var attribute_html = ''

              for (const [key, value] of Object.entries(object1)) {
                //console.log(`${key}: ${value}`);
                //attribute_html += '&nbsp;&nbsp;&nbsp;'
                attribute_html += '<div>'
                attribute_html += '&nbsp;&nbsp;&nbsp;'
                attribute_html += '<sup><span class="flex-key-for-column">' + key + '</span></sup>'
                attribute_html += '&nbsp;'
                attribute_html += '<span class="flex-value-for-column context">' + value + '</span>'
                attribute_html += '</div>'
              }// for 

              return attribute_html;
            }


            function highlight_keywords_markjs(_multi_keyWords_){

              console.log(' mark.js highlight keywords : ',   _multi_keyWords_)
              // $("span.context").mark(_search_keyword); // will mark the keyword "test", requires an element with class "context" to exist

              var __keywords_array = []
              if (isNaN(_multi_keyWords_)) {
                    // string, single word or multiple word
                    __keywords_array = _multi_keyWords_.split(" ");
                    // multiple string keywords
                    for (var k = 0; k < __keywords_array.length; k++) {

                      var _each_keyword_item = __keywords_array[k].trim()

                      console.log(' mark.js highlight string each keywords : ', k, _each_keyword_item)
                      $("span.context").mark(_each_keyword_item);
                    }//for

              } else {
                console.log(' mark.js highlight 1 single number  : ', _multi_keyWords_)
                $("span.context").mark(_multi_keyWords_.toString());
              }//if

            }


            

            //Check if a JavaScript string is a URL https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
            function isValidURL(_test_value) {

              // must combine 2 method to check   
            
              try {

                  // check 1, failed on "xxx:"
                  const urlObject = new URL(_test_value);

                  // Additional checks, if necessary.
                  // check 2, failed on email, xxx@xx.com
                  var _test_string = String(_test_value)
                  var res = _test_string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                  return (res !== null)

              } catch (error) {
                  return false;
              }

            };


            //Check if a JavaScript string is a image URL, https://stackoverflow.com/questions/9714525/javascript-image-url-verify
            function isValidImageURL(_test_value) {
              var _test_string = String(_test_value)
              var res = _test_string.match(/\.(jpeg|jpg|gif|png)$/)
              return (res !== null)
            }

            // convert a url link to iframe (website), img tag(image)
            function json_flex_tip_viewer_urlAsIframe(object1){

              var attribute_html = ''

              for (const [key, value] of Object.entries(object1)) {
                
                // only find url link as vale, ignore other field
                if (isValidURL(value)){
                  // access ArcMap's HTML popup from the JS https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/is-it-possible-to-access-arcmap-s-html-popup-from/td-p/187445
                  
                  // break a new line in flex box
                  attribute_html += '<div class="break-a-new-line-in-flex-box"></div>'

                  attribute_html += '<fieldset>' 
                  attribute_html +=     '<legend style="margin:0 auto;padding: 4px;">' + key + '&nbsp;&nbsp;&nbsp;'
                  attribute_html +=     '<a target="_blank" href="' + value + '">' + value + '</a>' + '&nbsp;&nbsp;&nbsp;'
                  attribute_html +=     '</legend>'

                      if (isValidImageURL(value)){

                        // image
                        attribute_html += '<a target="_blank" href="' + value + '">'
                        attribute_html +=   '<img src="' + value + '" alt="' +  value  +'"'
                        // without width,height, it shows image whatever original size, if you want to fix size, 
                        //attribute_html +=   ' width="1120px" height="800px"'  
                        attribute_html +=   '>'
                        attribute_html += '</a>'

                      } else {

                                // website 
                                attribute_html += '<iframe src="' + value + '"' + ' scrolling="auto" frameborder="0" '
                                // attribute_html += '   width="1120px" height="800px" ' 
                                // attribute_html += '  style="width: 1120px; height: 900px; display: block; padding: 0px; margin: 0px;"'
                                attribute_html +=  '  style="position: relative; height: 900px; width: 100%;" '
                                attribute_html += '>'
                                attribute_html += '</iframe>';
                                
                      }// if image

                  attribute_html += '</fieldset>'
                 
                }//if valid url
                
              }// for 

              return attribute_html;
            }

          /**/
        // -- -- -- vertial adjustment  -- -- -- 
        /**/








       function determine_object_id_field_name(___feature_layer_JSON_object){

     
        var ___field_name
        var ___index

        var ___feature_layer_fields_array = ___feature_layer_JSON_object.fields

        if (___feature_layer_fields_array.length){

          for (let i = 0; i < ___feature_layer_fields_array.length; i++) {
            ___field_name = ___feature_layer_fields_array[i].name
            ___index = possible_idx_field_name_array.indexOf(___field_name);

            if (___index > -1) {
               // found match object id field

               console.log(' found match object id field ', ___field_name)
               return ___field_name
            } else{

            }//if

          }//for

        }//if

       }






/**/
// - - - - download json csv  - - - - 
/**/

var ready_download_json
var json_for_csv

  // sample https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

  // only for save json file
  function saveJsonAsFile(filename, data) {


    // How can I beautify JSON  https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically
    const blob = new Blob([JSON.stringify(data, null, 2)]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()

  };


  function saveStringAsFile(filename, txt_string) {


    // How can I beautify JSON  https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically
    const blob = new Blob([txt_string]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()

  };



  function geojson_to_csvReadyJsonArray(sample_geojson){

    console.log('before convert geojson to csv, geojson is ', sample_geojson)

    var _csvReadyJsonArray = []
    var _featureObj
    var _csvRowObj = {}
    var _featuresArray = sample_geojson.features
    var _featureGeometryType = _featuresArray[0].geometry.type

    if (_featureGeometryType.includes('Point')){

      // point only
      for (let i = 0; i < _featuresArray.length; i++) {
        _featureObj = _featuresArray[i]
        _csvRowObj = _featureObj.properties
        _csvRowObj.geometryType = _featureGeometryType

        // fix bug, sometimes, geometry is undefined
        if (_featureObj.geometry){
           if (_featureObj.geometry.coordinates[0]){
            _csvRowObj.longitude = _featureObj.geometry.coordinates[0]
           }//if
           if (_featureObj.geometry.coordinates[1]){
            _csvRowObj.latitude = _featureObj.geometry.coordinates[1]
           }//if
        }//if


        _csvReadyJsonArray.push(_csvRowObj)
      }//for

    } else {
   
      // polygon, line
      for (let i = 0; i < _featuresArray.length; i++) {
        _featureObj = _featuresArray[i]
        _csvRowObj = _featureObj.properties
        _csvRowObj.geometryType = _featureGeometryType
       // _csvRowObj.coordinates = _featureObj.geometry.coordinates
        _csvRowObj.coordinates = ''
        _csvReadyJsonArray.push(_csvRowObj)
      }//for


    }//if


    return _csvReadyJsonArray
  }

/**/
//  - - - -  end  - - - -  download json csv   - - - - 
/**/


      

//console.log(formatNumber(500));      // Output: 500
//console.log(formatNumber(1200));     // Output: 1.2K
//console.log(formatNumber(12345));    // Output: 12.3K
//consoleasingle.log(formatNumber(1200000));  // Output: 1.2M
function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}





//  ----- -- - -- -- -shuffle array https://bost.ocks.org/mike/shuffle/
            function shuffle(array) {
              var m = array.length, t, i;

              // While there remain elements to shuffle…
              while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
              }

              return array;
            }

//  -----  end -- - -- -- -shuffle array https://bost.ocks.org/mike/shuffle/










// ------- large text, dark light  ------- 
var iphone_scale =  "50%" 
var desktop_hd_scale =  "100%"  
var desktop_4k_scale =  "150%" 

var large_text = "200%"
var standard_text = "100%"
var small_text = "50%"
            

            
           $("#large-map-button").on('click',function(){
                  //for esri 
                if (document.getElementById("map-components-id")){
                    document.getElementById("map-components-id").style.zoom = large_text;
                } 
                //for google  
                if (document.getElementById("map")){
                    document.getElementById("map").style.zoom = large_text;
                }   
                       
            }); 
            
            $("#small-map-button").on('click',function(){
                  //for esri 
                  if (document.getElementById("map-components-id")){
                      document.getElementById("map-components-id").style.zoom = standard_text;
                  } 
                  //for google  
                  if (document.getElementById("map")){
                      document.getElementById("map").style.zoom = standard_text;
                  } 
                 
            }); 





            $("#large-text-button").on('click',function(){
                if (document.getElementById("flex_1")){
                    document.getElementById("flex_1").style.zoom = large_text;
                }   
                
                // only for excel like feature table
                if (document.getElementById("tableDiv")){
                    document.getElementById("tableDiv").style.zoom = large_text;
                } 
            }); 

             $("#standard-text-button").on('click',function(){
                if (document.getElementById("flex_1")){
                    document.getElementById("flex_1").style.zoom = standard_text;
                }   
                if (document.getElementById("tableDiv")){
                    document.getElementById("tableDiv").style.zoom = standard_text;
                }        
            }); 


             $("#small-text-button").on('click',function(){
                if (document.getElementById("flex_1")){
                    document.getElementById("flex_1").style.zoom = small_text;
                }   
                if (document.getElementById("tableDiv")){
                    document.getElementById("tableDiv").style.zoom = small_text;
                }        
            }); 


            $("#dark-button").on('click',function(){
               document.querySelector('body').classList.add('dark')             
            }); 
             $("#light-button").on('click',function(){
               document.querySelector('body').classList.remove('dark')             
            }); 


            
            $("#iphone-button").on('click',function(){
              console.log('you click iphone button')
                    document.body.style.zoom = iphone_scale;
            }); 
            $("#desktop-button").on('click',function(){
                    document.body.style.zoom = desktop_hd_scale;
            }); 
            $("#4k-button").on('click',function(){
                    document.body.style.zoom = desktop_4k_scale;
            }); 




//   -------   end ------- large text, dark light  ------- 












































// ----- -- - -- -- -  always at bottom  ----- -- - -- -- - never move  ----- -- - -- -- -


  
   
    // it works with v 4 . 3 2,  
   
          
          // must wait until html document and all image  completely loaded, otherwise, html collection will be empty null
          // Can't access the value of HTMLCollection 
          // https://stackoverflow.com/questions/32905183/how-do-you-get-elements-from-a-javascript-htmlcollection
          // https://stackoverflow.com/questions/32222255/cant-access-the-value-of-htmlcollection
window.addEventListener('load', function () {



    // fix bug, shadowroot is undefined, https://stackoverflow.com/questions/54610139/shadowroot-property-is-null-despite-open
    setTimeout(() => {

      // setTimeout in JavaScript is asynchronous; 
      // it does not block the execution of other code while waiting for the timer to expire, 
      // meaning it will not pause the current code flow to wait for the delayed function to run. 

              // console.log(el.shadowRoot);





                  // ----- -- - -- -- -  search widget  ----- -- - -- -- - 

                    // only if search widget ( work on both on-map and outside-map, because I select by esri class name ) exist
                    if (document.querySelector('.esri-search .esri-search__input')){

                      var search_input_Element = document.querySelector('.esri-search .esri-search__input'); // Get the host element
                      console.log('search_input_Element ', search_input_Element)

                      search_input_Element.setAttribute('placeholder', 'Search Address(only)')

                    }//if

                  // --  end --- -- - -- -- -  search widget  ----- -- - -- -- - 




            //  . .  track widget button ======= replace icon by text  =====================  . .

            

              // only if track widget ( work on both on-map and outside-map, because I select by esri class name ) exist
              //if (document.querySelector('.esri-track calcite-button')){
              if (document.querySelector('.esri-locate calcite-button')){

                // track widget
                //var track_onMap_host_calciteButton_Element = document.querySelector('.esri-track calcite-button'); // Get the host element
                // locate widget
                var track_onMap_host_calciteButton_Element = document.querySelector('.esri-locate calcite-button'); // Get the host element
                console.log('track_onMap_host_calciteButton_Element ', track_onMap_host_calciteButton_Element)
                // always change scale to large
                track_onMap_host_calciteButton_Element.setAttribute("scale", "l");
                track_onMap_host_calciteButton_Element.setAttribute("title", "show your current location now");
                
               
                 
                  var track_onMap_shadowRoot = track_onMap_host_calciteButton_Element.shadowRoot; // Access the shadow root 
                  console.log('track _onMap _onMap _onMap shadowRoot shadowRoot shadowRoot open mode ', track_onMap_shadowRoot)
                  
              


                // fix bug, must have this line to evaluate child node, without this line, all embeded map get empty child node, not sure why
                console.log('track _onMap shadowRoot childNodes ', track_onMap_shadowRoot.childNodes)


                var track_onMap_childNodes = track_onMap_shadowRoot.childNodes
                console.log('track _onMap childNodes ', track_onMap_childNodes)
                // v4 . 3. 2  change from item ( 0 ) to ( 1 ), because inspect element, it add extra comment line.
                console.log('track _onMap childNodes.item(1) ', track_onMap_childNodes.item(1))
                var track_onMap_button = track_onMap_childNodes.item(1)
                console.log('track _onMap button ', track_onMap_button)


                if (track_onMap_button){
                

                            // button found,  replace icon by text 
                            track_onMap_button.innerHTML = '<span style="font-size:23px; display:flex; flex-direction:column;">   <span style="margin:3px;">Show</span>  <span style="margin:3px;">Your</span>  <span style="margin:3px;">Location</span>  </span>';
                    
                } else {

                            // some of embed map,  on-map track widget, failed to get button, 
                            console.log('not find shadow DOM for track _onMap button, maybe waiting time(setTime out time) is too short, ', track_onMap_button)
                           
                            
                            /* not work, large svg view box
                            var track_onMap_icon_shadowRoot = track_onMap_icon.shadowRoot; // Access the shadow root 
                            console.log('track_onMap_icon_shadowRoot ', track_onMap_icon_shadowRoot)
                            var track_onMap_icon_childNodes = Array.from(track_onMap_icon_shadowRoot.childNodes);
                            console.log('track_onMap_icon_childNodes ', track_onMap_icon_childNodes)
                            console.log('track_onMap_icon_childNodes[0] ', track_onMap_icon_childNodes[0])
                            var track_onMap_icon_svg = track_onMap_icon_childNodes[0]
                            console.log('track_onMap_icon_svg ', track_onMap_icon_svg)

                            // not work, large svg view box
                            //track_onMap_icon_svg.setAttribute("viewBox", "0 0 64 64");
                            //track_onMap_icon_svg.setAttribute("width", "64px");
                            //track_onMap_icon_svg.setAttribute("height", "64px");
                            */

                }// if
                


                
                


              }//if


              /* not use 
              // only if track widget ( outside map ) exist, change svg icon scale to large
              if (document.getElementById('outside-esri-track-current-location')){

                          var track_btnElement = document.getElementById('outside-esri-track-current-location'); // Get the host element
                          console.log('track btnElement track_btnElement track btnElement ', track_btnElement)
                          console.log('track btnElement child child child child ', track_btnElement.children);

                          var track_HTMLCollection = track_btnElement.children;
                          console.log('html collection       : ', track_HTMLCollection);
                          console.log('html collection .length ', track_HTMLCollection.length);
                          console.log('html collection item[0]  : ', track_HTMLCollection[0]); 
                          console.log('html collection .item(0)  : ', track_HTMLCollection.item(0));
                        
                          var track_calciteButton_hostElement = track_HTMLCollection.item(0)
                          // not working 
                          //track_calciteButton_hostElement.setAttribute("scale", "l")
                          console.log('track calcite Button host Element  : ', track_calciteButton_hostElement);

                          var track_shadowRoot = track_calciteButton_hostElement.shadowRoot; // Access the shadow root 
                          console.log('track shadowRoot shadowRoot shadowRoot open mode ', track_shadowRoot)


                          var track_childNodes = Array.from(track_shadowRoot.childNodes);
                          console.log('track childNodes ', track_childNodes)
                          console.log('track childNodes[0] ', track_childNodes[0])
                          var track_button = track_childNodes[0]
                          console.log('track button ', track_button)
                          var track_icon_HTMLCollection = track_button.getElementsByTagName('calcite-icon')
                          console.log('track  icon HTMLCollection', track_icon_HTMLCollection)
                          var track_icon = track_icon_HTMLCollection.item(0)
                          console.log('track  icon ', track_icon)
                          // works, set as large scale
                          track_icon.setAttribute("scale", "l")

                       

              }//if

              */




             // . .  end   . .  track widget button ======= replace icon by text  =====================  . . 



              //=================== toggle basemap ======= replace icon by text  =====================

              
              // only if toggle basemap widget ( on map ) exist
              if (document.querySelector('.esri-expand__toggle calcite-action')){

                var toggle_basemap_onMap_host_calciteAction_Element = document.querySelector('.esri-expand__toggle calcite-action'); // Get the host element
                console.log('toggle_basemap_onMap_host_calciteAction_Element ', toggle_basemap_onMap_host_calciteAction_Element)
                
                var toggle_basemap_onMap_shadowRoot = toggle_basemap_onMap_host_calciteAction_Element.shadowRoot; // Access the shadow root 
                console.log('toggle_basemap_onMap_shadowRoot shadowRoot shadowRoot shadowRoot open mode ', toggle_basemap_onMap_shadowRoot)

              
                // fix bug, must have this line to evaluate child node, without this line, all embeded map get empty child node, not sure why
                console.log('toggle_basemap_onMap shadowRoot childNodes ', toggle_basemap_onMap_shadowRoot.childNodes)


                 // always change scale to large
                // toggle_basemap_onMap_host_calciteAction_Element.setAttribute("scale", "l");
                
                var toggle_basemap_onMap_childNodes  = toggle_basemap_onMap_shadowRoot.childNodes
                console.log('toggle_basemap _onMap childNodes ', toggle_basemap_onMap_childNodes)
                // v4 . 3. 2  change from item ( 0 ) to ( 1 ), because inspect element, it add extra comment line.
                console.log('toggle_basemap _onMap childNodes.item(1) ', toggle_basemap_onMap_childNodes.item(1))
                var toggle_basemap_onMap_button = toggle_basemap_onMap_childNodes.item(1)
                console.log('toggle_basemap _onMap button ', toggle_basemap_onMap_button)


                if (toggle_basemap_onMap_button){

                    var toggle_basemap_onMap_button_HTMLCollection = toggle_basemap_onMap_button.getElementsByTagName('button')
                    console.log('toggle_basemap_onMap_button_HTMLCollection', toggle_basemap_onMap_button_HTMLCollection)
                    var toggle_basemap_onMap_button = toggle_basemap_onMap_button_HTMLCollection.item(0)
                    console.log('toggle_basemap_onMap_button ', toggle_basemap_onMap_button)


                    // button found,  replace icon by text  
                    toggle_basemap_onMap_button.innerHTML = '<span style="font-size:23px;  display:flex; flex-direction:column;">   <span style="margin:3px;">Change</span>  <span style="margin:3px;">Background</span>  <span style="margin:3px;">Map</span>  </span>';

                } else {

                    // some of embed map,  on-map track widget, failed to get button, 
                    console.log('not find shadow DOM for track _onMap button, maybe waiting time(setTime out time) is too short, ', toggle_basemap_onMap_button)
                       
                       
                   
                }//if



          }//if





           //========  end =========== toggle basemap ============================




    // this number would not slow down page loading. 10 is too short, sometime not work. 1000 is works on most of time.             
    }, "200"); // set time out,  
              
})// windows load
         
          
          

          

// . .  end   . .----- -- - -- -- -  always at bottom  ----- -- - -- -- - never move  ----- -- - -- -- -


