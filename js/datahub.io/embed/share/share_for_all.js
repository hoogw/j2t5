
//  .. ..  from node.js arcgis viewer transition to json2tree  .. ..  


// always at top, 






 var _map_type = 'hybrid' // default    roadmap, satellite, terrain

 
 var need_pan_to_real_location = true



 // -2 means current showing not available,  -1 means total count not available
 var _current_rendering_feature = -2 
 var _current_area_count_of_feature = -2
 var _total_count_of_feature = -1;

 







// microsoft marker don't have problem, can set no limit
// no limit, will get maxReturnCount set by arcgis server admin.
//var max_count_for_rendering = undefined // null,


// google must set limit
// old google marker(data layer point icon) will crash browser, if no limit, new google marker seems ok 
var max_count_for_rendering = 500


// 1). limit, used in function reduce feature count to limit
// 2). limit, used in url?...&resultRecordCount = limit
var limit = max_count_for_rendering   


var zoom2level = 20 // google map 18 will not show house number, 19,20 will show house number,  
$("#zoom2level-input").val(zoom2level)





var _url // main layer url node.js arcgisViewer use
var ___url_string  // main layer url json2tree use

var _center_lat
var _center_long
var _center_zoom



// .. ..  end  .. ..  from node.js arcgis viewer transition to json2tree  .. ..  





// only for init_globle_var()
var param_search









  // for geocode server, locator only 
  
     var max_suggestion_item_count = 50
      var suggest_options_html = ''
      
      var magic_keys_array = []
      var data_src_array = []
      
      var selectedValue

      // check category
      var geocode_json
      var all_standard_categories_flat_array = [

                                                "Address", // top level cat.
                                                "Subaddress", 
                                                "Point Address", 
                                                "Street Address",
                                                "Intersection",
                                                "Street Midblock",
                                                "Street Between",
                                                "Street Name",

                                                
                                                "Coordinate System",// top level cat.
                                                "LatLong",
                                                "XY",
                                                "YX",
                                                "MGRS",
                                                "USNG",

                                               
                                                "POI",// top level cat.
                                                "Other",
                                              ]
      var standard_categories_flat_array = []
      var poi_cat_flat_array = []

 //  . .  end . . for geocode server, locator only 





        // google dash line square or circle
        var north_east
        var south_east
        var south_west
        var north_west
        var dottedlineSymbol 
        var dashlineSymbol



// -------------- value list paging   --------------
var maxRecordCount
var standardMaxRecordCount
var tileMaxRecordCount
var standardMaxRecordCountNoGeometry
var maxRecordCountFactor


var _totalCount_of_current_valueList




// token
var arcgis_online_token = ''           
var param_arcgis_online_token 



// for - - init global var
var urlParams



// ---  ---  marker-icon,label, size change based on zoom level  ---  ---  --- 
  var google_marker_icon_scale_by_zoom_level = {  0:1,  1:2, 2:2, 3:2,  4:3, 5:3,  
    6:4, 7:4,   8:5, 9:5,  10:6, 11:6,   12:7, 13:7, 
    14:8,   15:9, 16:11, 17:13, 18:15, 19:17, 20:19,  21:21,  22:23,   23:25}

  var google_marker_label_fontSize_by_zoom_level = {  0:'1px',  1:'1px', 2:'2px', 3:'3px',  4:'4px', 5:'5px',  
      6:'7px', 7:'9px',   8:'11px', 9:'13px',  10:'15px', 11:'17px',   12:'19px', 13:'21px', 
      14:'23px',   15:'25px', 16:'27px', 17:'29px', 18:'31px', 19:'33px', 20:'35px',  21:'37px',  22:'39px',   23:'41px'}

// --- end ---  marker-icon,label, size change based on zoom level  ---  ---  --- 




                  /**/
                  //   --- --- --- --- color scale  --- --- --- --- warning, google dynamiclayer must use xxx_for_esri_color only
                  /**/



                  var esri_possible_numeric_field_type_array = ['esriFieldTypeBigInteger', 'esriFieldTypeDouble', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeSmallInteger']

                  // 5 class, element 0 is not used,
                  var line_stroke_weight = [1,2,5,10,15,20]
                  var point_marker_size_radius = [1,5,10,15,20,25]
                  
                                 
                  
                
                  var color_scale_outline_width = 1
                  var color_scale_outline_color = 'rgba(0,0,0, 0.9)'  // black
                  var color_scale_outline_color_for_esri_color = [0,0,0, 240]  // black


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




                  var color_scale_for_esri_color = {

                   
                    
                      
                    'colorScale_red': [
                            [255, 160, 122, 240],   // LightSalmon
                            [250, 128, 114, 240],   // Salmon
                            [205, 92, 92, 240],   // IndianRed
                            [255, 0, 0, 240],   // Red
                            [178, 34, 34, 240],   // FireBrick
                            [139, 0, 0, 240],   // DarkRed
                          ],


                    'colorScale_blue' :[
                            [135, 206, 250, 240],   // LightSkyBlue
                            [135, 206, 250, 240],   // LightSkyBlue
                            [0, 191, 255, 240],   // DeepSkyBlue
                            [0, 0, 255, 240],   // Blue
                            [0, 0, 169, 240],   // DarkBlue
                            [0, 0, 98, 240],   // Navy
                          ],



                    'colorScale_pink' :[
                              [255, 182, 193, 240],   // LightPink
                              [255, 192, 203, 240],   // Pink
                              [255, 105, 180, 240],   // HotPink
                              [255, 20, 147, 240],   // DeepPink
                              [219, 112, 147, 240],   // PaleVioletRed
                              [199, 21, 133, 240],   // MediumVioletRed
                            ], 


                   'colorScale_purple' :[
                              [230, 230, 250, 240],   // Lavender
                              [230, 230, 250, 240],   // Lavender
                              [221, 160, 221, 240],   // Plum
                              [255, 0, 255, 240],   // Fuchsia
                              [147, 112, 219, 240],   // MediumPurple
                              [128, 0, 128, 240],   // Purple
                            ],



                    'colorScale_orange' :[
                                  [255, 127, 80, 240],   // Coral
                                  [255, 160, 122, 240],   // LightSalmon
                                  [255, 165, 0, 240],   // Orange
                                  
                                  [255, 140, 0, 240],   // DarkOrange
                                  [255, 99, 71, 240],   // Tomato
                                  [255, 69, 0, 240],   // OrangeRed
                                ],


                    'colorScale_violet' :[
                                  [230, 230, 250, 240],   // Lavender
                                  [238, 130, 238, 240],   // Violet
                                  [255, 0, 255, 240],   // Fuchsia
                                  [138, 43, 226, 240],   // BlueViolet
                                  [148, 0, 211, 240],   // DarkViolet
                                  [75, 0, 130, 240],   // Indigo
                                ],

               
                 'colorScale_yellow' :[
                              [255, 250, 205, 240],   // LemonChiffon
                              [255, 255, 224, 240],   // LightYellow
                              [240, 230, 140, 240],   // Khaki
                              [255, 255, 0, 240],   // Yellow
                              [255, 215, 0, 240],   // Gold
                              [189, 183, 107, 240],   // DarkKhaki
                            ],


                  'colorScale_slateblue' :[
                                [230, 230, 250, 240],   // Lavender
                                [230, 230, 250, 240],   // Lavender
                                [255, 0, 255, 240],   // Magenta
                                [123, 104, 238, 240],   // MediumSlateBlue
                                [106, 90, 205, 240],   // SlateBlue
                                [72, 61, 139, 240],   // DarkSlateBlue
                              ],

                    'colorScale_green' :[
                                [144, 238, 144, 240],   // LightGreen
                                [144, 238, 144, 240],   // LightGreen
                                [0, 250, 154, 240],   // MediumSpringGreen
                                [60, 179, 113, 240],   // MediumSeaGreen
                                [0, 128, 0, 240],   // Green
                                [0, 100, 0, 240],   // DarkGreen
                              ],

                    'colorScale_brown' :[
                                [244, 164, 96, 240],   // SandyBrown
                                [244, 164, 96, 240],   // SandyBrown
                                [210, 105, 30, 240],   // Chocolate
                                [160, 82, 45, 240],   // Sienna
                                [165, 42, 42, 240],   // Brown
                                [128, 0, 0, 240],   // Maroon
                              ],


                    'colorScale_teal' :[
                                [0, 250, 154, 240],   // MediumSpringGreen
                                [0, 250, 154, 240],   // MediumSpringGreen
                                [102, 205, 170, 240],   // MediumAquamarine
                                [32, 178, 170, 240],   // LightSeaGreen
                                [0, 139, 139, 240],   // DarkCyan
                                [0, 98, 98, 240],   // Teal
                              ],



                  

                   'colorScale_turquoise' :[
                                [224, 255, 255, 240],   // LightCyan
                                [224, 255, 255, 240],   // LightCyan
                                [175, 238, 238, 240],   // PaleTurquoise
                                [64, 224, 208, 240],   // Turquoise
                                [0, 206, 209, 240],   // DarkTurquoise
                                [70, 130, 180, 240],   // SteelBlue
                              ],


                  


                 'colorScale_tan' :[
                                [255, 248, 220, 240],   // Cornsilk
                                [255, 248, 220, 240],   // Cornsilk
                                [245, 222, 179, 240],   // Wheat
                                [210, 180, 140, 240],   // Tan
                                [188, 143, 143, 240],   // RosyBrown
                                [139, 69, 19, 240],   // SaddleBrown
                              ],



                 'colorScale_gray' :[
                                [245, 245, 245, 240],   // WhiteSmoke
                                [245, 245, 245, 240],   // WhiteSmoke
                                [211, 211, 211, 240],   // LightGray
                                [169, 169, 169, 240],   // DarkGray
                                [112, 128, 144, 240],   // SlateGray
                                [47, 79, 79, 240],   // DarkSlateGray
                              ],

                }


                  /**/
                  //   --- --- end --- --- color scale  --- --- --- ---  
                  /**/





/**/
// -------------- search result paging or not  --------------
/**/

var _search_result_paging_or_not = 'paging'  // 'not_paging'

/**/
//  -------------- end  -------------- search result paging or not  --------------
/**/


var pegman_follow_you_or_not = 'follow' // 'not_follow'

/**/
// -------------- Street View Coverage Layer  --------------
/**/


/**/
//  -------------- end  -------------- Street View Coverage Layer --------------
/**/








/**/
// - - - - dynamic layer  - - - - 
/**/


// default blue 
var polygonFillBy = 'blue-diagonal-cross' //'original-color' 
var param_polygonFillBy


var current_fillColor = 'rgba(0, 200, 255, 0.87)'     // teal
var current_outlineColor = 'rgba(0, 0, 255, 0.87)'       // blue 
var current_outlineWidth = 1   // array[6] = 5
var current_outlinePattern = 0  // solid
var current_simplefillPattern = 2  // esriSFSDiagonalCross
var current_pointSize = 24       // array[4] = 24
var current_pointShape = 0      // circle



/**/
//   ###  ###  ### width size  ###  ###  ###

     
      // Simple Line Symbol (esriSLS) https://developers.arcgis.com/web-map-specification/objects/esriSLS_symbol/
      var pattern_simpleLineSymbol_array = ['Solid', 'Dash', 'Dash Dot', 'Dash Dot Dot', 'Dot', 'Long Dash', 'Long Dash Dot', 'Short Dash','Short Dash Dot', 'Short Dash Dot Dot','Short Dot','Null']
      var pattern_simpleLineSymbol_esriSLS_array = ['esriSLSSolid', 'esriSLSDash', 'esriSLSDashDot', 'esriSLSDashDotDot', 'esriSLSDot', 'esriSLSLongDash', 'esriSLSLongDashDot', 'esriSLSShortDash','esriSLSShortDashDot', 'esriSLSShortDashDotDot','esriSLSShortDot','esriSLSNull']
      
      // Simple Fill Symbol (esriSFS) https://developers.arcgis.com/rest/services-reference/enterprise/symbol-objects/
      var pattern_simpleFillSymbol_array = ['Backward Diagonal', 'Cross', 'Diagonal Cross', 'Forward Diagonal', 'Horizontal', 'Null', 'Solid', 'Vertical']
      var pattern_simpleFillSymbol_esriSFS_array = ['esriSFSBackwardDiagonal', 'esriSFSCross', 'esriSFSDiagonalCross', 'esriSFSForwardDiagonal', 'esriSFSHorizontal', 'esriSFSNull', 'esriSFSSolid', 'esriSFSVertical']

      // Simple Marker Symbol (esriSMS) https://developers.arcgis.com/web-map-specification/objects/esriSMS_symbol/
      var shape_array = ['Circle', 'Cross', 'Diamond', 'Square', 'Triangle', 'X']
      var shape_esriSMS_array = ['esriSMSCircle', 'esriSMSCross', 'esriSMSDiamond', 'esriSMSSquare', 'esriSMSTriangle', 'esriSMSX']

//   ###  ###  ### width size  ###  ###  ###
/**/




        var polygon_renderer = {
                                    "type":"simple",
                                    "symbol":{
                                                "color": esri_rgba_color_array[current_fillColor],  //[0,112,255,255],
                                                "outline":{
                                                                "color": esri_rgba_color_array[current_outlineColor],  //[255,255,0,255],
                                                                "width": current_outlineWidth, //4.5,
                                                                "type": "esriSLS",
                                                                "style": pattern_simpleLineSymbol_esriSLS_array[current_outlinePattern], //"esriSLSSolid"
                                                },
                                                "type":"esriSFS",  // Simple Fill Symbol (esriSFS)
                                                "style":pattern_simpleFillSymbol_esriSFS_array[current_simplefillPattern], // esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical  
                                    }
                                }



        var line_renderer = {
                                "type":"simple",
                                "symbol":{
                                    "color": esri_rgba_color_array[current_fillColor],  //[0,92,230,255],
                                    "width": current_outlineWidth, //4.5,
                                    "type":"esriSLS",   // Simple Line Symbol (esriSLS)
                                    "style": pattern_simpleLineSymbol_esriSLS_array[current_outlinePattern], //"esriSLSSolid"
                                }
                            }


        
        var point_renderer = {
                                "type":"simple",
                                "symbol":{
                                    "color": esri_rgba_color_array[current_fillColor],  //[0,77,168,128],
                                    "size":  current_pointSize, //10,
                                    "angle":0,
                                    "xoffset":0,
                                    "yoffset":0,
                                    "type":"esriSMS",
                                    "style": shape_esriSMS_array[current_pointShape],  //"esriSMSCircle",

                                    "outline":{
                                        "color": esri_rgba_color_array[current_outlineColor],  //[230,230,0,255],
                                        "width": current_outlineWidth, //4.5,
                                        "type": "esriSLS",
                                        "style": pattern_simpleLineSymbol_esriSLS_array[current_outlinePattern], //"esriSLSSolid"
                                    }
                                }
                            }


   var template_polygon_renderer = {
                              "type":"simple",
                              "symbol":{
                                          "color":[0,112,255,255],
                                          "outline":{
                                                          "color":[255,255,0,255],
                                                          "width":4.5,
                                                          "type":"esriSLS",
                                                          "style":"esriSLSSolid"
                                          },
                                          "type":"esriSFS",  // Simple Fill Symbol (esriSFS)
                                          "style":"esriSFSSolid", // esriSFSBackwardDiagonal | esriSFSCross | esriSFSDiagonalCross | esriSFSForwardDiagonal | esriSFSHorizontal | esriSFSNull | esriSFSSolid | esriSFSVertical 
                              }
                          }



  var template_line_renderer = {
                          "type":"simple",
                          "symbol":{
                              "color":[0,92,230,255],
                              "width":4.5,
                              "type":"esriSLS",   // Simple Line Symbol (esriSLS)
                              "style":"esriSLSSolid"
                          }
                      }


  
  var template_point_renderer = {
                          "type":"simple",
                          "symbol":{
                              "color":[0,77,168,128],
                              "size":10,
                              "angle":0,
                              "xoffset":0,
                              "yoffset":0,
                              "type":"esriSMS",
                              "style":"esriSMSCircle",

                              "outline":{
                                  "color":[230,230,0,255],
                                  "width":4.5,
                                  "type":"esriSLS",
                                  "style":"esriSLSSolid"
                              }
                          }
                      }




        
        var current_geometryType = ''

        var dynamicLayers_string = ''

        var dynamicLayers_string_encoded = ''

        
        var editor_dynamicLayers_array 
        var dynamicLayers_array = [
                                              {
                                                  "id":1,
                                                  "name":"parks_trail",

                                                  "source": {
                                                                  "type":"mapLayer",
                                                                  "mapLayerId":1
                                                            },
                                                            
                                                  "definitionExpression": "",   // example: "definitionExpression": "STVR='allow'",

                                                  "drawingInfo": {
                                                                    "renderer": polygon_renderer,   // default is empty string, will change later depending on feature type(line,point, polygon)
                                                                    "showLabels":false,
                                                                 },  

                                                    "minScale":0,
                                                    "maxScale":0
                                                }
                                        ]



/**/
//  - - - -  end  - - - -  dynamic layer   - - - - 
/**/











 /**/
 // -- -- --  google advanced marker replace geojson  -- -- -- 
    var marker_array = []      
 // -- -- --  end -- -- --  google advanced marker replace geojson -- -- -- 
 /**/





                  async function init_global_var_from_node(){
                



                    console.log(' default before update from url - - -  panto, need_pan_to_real_location',  need_pan_to_real_location )
                
                    console.log(' default before update from url - - -  center zoom:', _center_zoom, ' center lng:', _center_long, ' center lat:', _center_lat )
                
                    //  .......... global var ..............
                    
                      
                          // https://developer.mozilla.org/en-US/docs/Web/API/Location
                    
                            current_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    
                            console.log('current_url ...... ',current_url);
                            
                            current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
                            current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
                            
                            // ----- parse url param ?url=xxxxxxxxxx  --------
                  
                            urlParams = new URLSearchParams(window.location.search);
                  
                              /**/            
                              //.................. required parameter .................
                                  _layer = urlParams.get('layer'); // required,  Warning:  router.js >layout.pug already get a copy, but it is encoded including single quote, must either decode including single quote, or get param again like this line does. 
                                  _layer_id = urlParams.get('layer_id'); // required,  Warning:  router.js >layout.pug already get a copy,  this line will overwrite that copy
                                              
                                  _cross = urlParams.get('cross'); // optional, without this will be  value 'default'
                                  if (_cross) {} else {_cross ='default' }
                  
                                  _url = urlParams.get('url');  // required
                  


                                  // as long as url has lat,lng,zm, then do not pan to loc

                                  // google lat lng must be number, can not be string
                                  param_center_lat = urlParams.get('center_lat');  
                                    if (param_center_lat) {
                                       _center_lat = Number(param_center_lat)

                                       // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       need_pan_to_real_location = false
                                    }
                                    param_center_long = urlParams.get('center_long');  
                                    if (param_center_long) {
                                      _center_long = Number(param_center_long)

                                      // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       need_pan_to_real_location = false
                                    }

                                    param_center_zoom = urlParams.get('center_zoom');  
                                    if (param_center_zoom) {
                                      _center_zoom = Number(param_center_zoom)

                                      // as long as url has lat,lng,zm, then do not pan to loc
                                      
                                       need_pan_to_real_location = false
                                    }

                                    
                                   


                    console.log('after update from url, panto,  need_pan_to_real_location ......  ',   need_pan_to_real_location)  
                                 
                    console.log(' after update from url,  - - -  center zoom:', _center_zoom, ' center lng:', _center_long, ' center lat:', _center_lat )
                
                  
                              //.................. required parameter .................
                              /**/
                                              
                                              
                                              
                                              
                  
                              // ***** setting tab parameter *********
                                              
                                                  var param_overlayOpacity = urlParams.get('overlayOpacity');
                                                  if ((param_overlayOpacity > 0 ) && (param_overlayOpacity < 11 )) {
                  
                                                    console.log('use new overlay opacity ',  param_overlayOpacity)
                                                    image_opacity = param_overlayOpacity / 10
                                                  
                                                  } else if (param_overlayOpacity == 0 ){
                  
                                                    image_opacity = 0
                  
                                                  }
                  
                  
                                                  var param_limit = urlParams.get('limit');
                                                  if (param_limit){
                                                    console.log('use new limit from urlparam ',  param_limit)
                                                    limit = param_limit
                                                  }
                  
                              // *****  end  ******* setting tab parameter *********
                  
                                              
                                               
                        
                                          ___url_string = _url     
                                          if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                                          {
                                              
                                              // nothing to do
                                              
                                          } else {
                                                ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                                              base_url = ___url_string;
                  
                                              ___protocol = ___url.protocol; //   https:
                                              ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                                              ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                                              ___urlParams = new URLSearchParams(___url.search); //
                  
                                              ___pathArray = ___pathname.split('/');
                                              ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 
                  
                                          }// if     
                                  // ----- parse url param ?url=xxxxxxxxxx  --------




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
                  // -------------- search result paging or not  --------------
                  /**/
                      var param_search_result_paging_or_not = urlParams.get('searchpaging');
                      if (param_search_result_paging_or_not){
                        _search_result_paging_or_not = param_search_result_paging_or_not
                        console.log('from url param _search_result_paging_or_not ', _search_result_paging_or_not)
                      }

                  /**/
                  //  -------------- end  -------------- search result paging or not  --------------
                  /**/





                  /**/
                  // -------------- Street View Coverage Layer  --------------
                  /**/
 
                      var param_pegman_follow_you_or_not = urlParams.get('pegmanfollow');
                      if (param_pegman_follow_you_or_not){
                        pegman_follow_you_or_not = param_pegman_follow_you_or_not
                        console.log('from url param pegman_follow_you_or_not ', pegman_follow_you_or_not)
                      }

                  /**/
                  //  -------------- end  -------------- Street View Coverage Layer --------------
                  /**/




                              /**/
                              //  ... ... .. ... search key word  ... ... .. ... 
                              /**/

                              param_search = urlParams.get('search');
                              if (param_search){ 
                                need_pan_to_real_location = false
                              }
                              
                              /**/
                              //  ... end ... ... .. ... search key word  ... ... .. ...
                              /**/



                  /**/
                  //  --- yelp POI on google      --- 
                  /**/
                  
                  param_search_poi_keyword = urlParams.get('poi');
                  console.log('url param param_search_poi_keyword',  param_search_poi_keyword)
                  if (param_search_poi_keyword){ 
                    search_poi_keyword = param_search_poi_keyword
                  }

                 

                  /**/
                  //  --- end  ---  yelp POI on google    --- 
                  /**/



                            /**/
                            //  --- click or hover   --- 
                            /**/
                            param_click_or_hover = urlParams.get('clickorhover');

                            /**/
                            //  --- end  ---  click or hover   --- 
                            /**/


                             /**/
                            //  - - -  progressive max    - - - 
                            /**/

                            
                            var param_sync_async = urlParams.get('sync_async');
                            if (param_sync_async){
                              sync_async = param_sync_async
                            }

                            /**/
                            //  --- end  ---  progressive max   - - - 
                            /**/



                            /**/
                            // -- -- -- label and color  -- -- -- 

                            param_polygonFillBy = urlParams.get('polygonFillBy');
                            //. . . end  . . . -- -- -- label and color  -- -- -- 
                            /**/





     
                            /**/
                            // -- -- --  split address -- -- --         
                              var param_addressField = urlParams.get('addressField');
                              if (param_addressField) {current_addressField = param_addressField}
                            // -- -- --  end -- -- --  split address -- -- -- 
                            /**/
                            /**/
                            // -- -- --  google labeling -- -- -- 
                            var param_labelAs = urlParams.get('labelAsField');
                            if (param_labelAs) {current_labelAs = param_labelAs}
                            // -- -- --  end -- -- --  google labeling -- -- -- 
                            /**/



                                                        
                            /**/
                            //  - - -  progressive max    - - - 
                            /**/
                            var param_progressive = urlParams.get('progressive');
                            if (param_progressive) {batch_count = parseInt(param_progressive)}


                            /**/
                            //  --- end  ---  progressive max   - - - 
                            /**/



                                                        

                            /**/
                            //  - - -  browser max display count    - - - 
                            /**/

                            var param_browserlimit = urlParams.get('browserlimit');
                            if (param_browserlimit) {maxCountBrowserDisplay = parseInt(param_browserlimit)}


                            /**/
                            //  --- end  ---  browser max display count   - - - 
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

                              /**/
                              //  --- end  ---  use your key    --- 
                              /**/






                                                            

                              /**/
                              //  -  -  - category  -  -  - 
                              /**/

                              param_category_string = urlParams.get('poicategory');
                              console.log('url param param_category_string',  param_category_string)
                              if (param_category_string){ 
                                _category_string = param_category_string
                              }


                              /**/
                              //  -  -  - end  -  -  -  category    -  -  - 
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


                    }
                    
                    
                  


                  





          //  1 keyword search, not for multiple keywords, for example "region 10"
          function build_where_condition_single_keyword(_search_keyword, _clause_Operator){
            // standard 'where-condition' for all arcgis rest api both type 'table' or 'feature layer' 
            console.log('what field is string type . . .1 keyword search :', _feature_attributes_string)
            console.log('what field is number type . . .1 keyword search :', _feature_attributes_integer)

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
                // not a number, string
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
            return encoded_where_condition

            // arcgis v4.x use feature filter set where clause, no need encode.
            //return where_condition
          }
          




          // for all arcgis rest api both type 'table' or 'feature layer' , for multiple keywords 
          function build_where_condition_multiple_keyword(_search_keyword, _clause_Operator){

           console.log('what field is string type . . .multiple keywords :', _feature_attributes_string)
           console.log('what field is number type . . .multiple keywords :  ', _feature_attributes_integer)

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
                                                                                    where_condition += 'LOWER( ' +  _feature_attributes_string[i] + " ) like '%" + _each_keyword_item + "%'"; 
                                                                            }// for k

                                                                    } else if (_clause_Operator == 'equal') {

                                                                              // exact field match , full field match only
                                                                              where_condition +=  'LOWER( ' +_feature_attributes_string[i] + " ) = '" + _search_keyword + "'";
                                            
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

              // fix bug, if search keywords have number, for example 18T,  where =  like '%18T' %18 becomes special char. 
              // so must encode where condition before send to url
              var encoded_where_condition = encodeURI(where_condition); 

              return encoded_where_condition
              //return where_condition
          }









 		     /**/
         //  ---  print   --- 
         /**/

                var widget_opacity = 0.91
                var param_widget_opacity

                var legend_panel_status = true
                var dynamicLegend_panel_status = true

                var title_html = ''


                  function init_print(){


                                          /**/
                                          //  ---  print   --- 
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
                                          //  --- end  --- print   --- 
                                          /**/




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



                    // .............. legend panel  .............. 
                    //turn_off_legend_panel()
                    $('#legend_panel_toggle').on('click', function(event) {
                            event.preventDefault(); // To prevent following the link (optional)
                            if (legend_panel_status) {
                                          //$("#legend_panel_toggle").attr("class", "legend-button");
                                          turn_off_legend_panel()
                            } else {
                                          //$("#legend_panel_toggle").attr("class", "legend-button-turn-on-mode");                                   
                                          turn_on_legend_panel()
                            } // if
                    });

                    //turn_off_dynamicLegend_panel()
                    $('#dynamicLegend_panel_toggle').on('click', function(event) {
                            event.preventDefault(); // To prevent following the link (optional)
                            if (dynamicLegend_panel_status) {
                                          //$("#dynamicLegend_panel_toggle").attr("class", "dynamicLegend-button");
                                          turn_off_dynamicLegend_panel()
                            } else {
                                          //$("#dynamicLegend_panel_toggle").attr("class", "dynamicLegend-button-turn-on-mode");                                   
                                          turn_on_dynamicLegend_panel()
                            } // if
                    });
                  // .............. end   ..............  legend panel  ..............  









                    /**/
                    //  ---  print   --- 
                    /**/

                                      

                                          /**/
                                          // ======== google widget my widget opacity control together  ========
                                        
                                          $('#widget_opacity_label').text( parseInt(widget_opacity * 10));
                                          $('#widget_opacity_slider_input').val(parseInt(widget_opacity * 10));
                                          
                                          var widget_opacity_div = document.getElementById("widget_opacity_div")
                                          map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(widget_opacity_div);

                                          // event handle
                                          $('#widget_opacity_slider_input').on('change', function() {


                                            widget_opacity = $('#widget_opacity_slider_input').val() / 10 ;
                                            $('#widget_opacity_label').text(widget_opacity * 10);
                                            update_url_parameter('widgetopacity', widget_opacity)

                                            set_my_widget_opacity()
                                            set_google_widget_opacity()

                                            

                                          });
                                    // ======== end  ======== google widget my widget opacity control together  ========
                                    /**/


                                    // init set all esri widget opacity
                                    set_my_widget_opacity()
                                    




                                  var title_div_DOMobject =document.getElementById("title_div")
                                  map.controls[google.maps.ControlPosition.TOP_LEFT].push(title_div_DOMobject);

                                  const legend_div_DOMobject =document.getElementById("legend-div")
                                  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend_div_DOMobject);

                                  const dynamicLegend_div_DOMobject =document.getElementById("dynamic-legend")
                                  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(dynamicLegend_div_DOMobject);


                                  /**/
                                  //  --- end  --- print   --- 
                                  /**/










                  }
                            
                  function set_my_widget_opacity(){
                      $('.title_div').css({'opacity': widget_opacity})  //  .css({object})
                      $('.legend-div').css({'opacity': widget_opacity})  //  .css({object})
                      $('.dynamic-legend').css({'opacity': widget_opacity})  //  .css({object})

                      $('#opacity_div').css({'opacity': widget_opacity})  //  .css({object})
                      $('#zoom_level_id').css({'opacity': widget_opacity})  //  .css({object})
                      $('#pac-input').css({'opacity': widget_opacity})  //  .css({object})
                      $('#zoomToLayer_button').css({'opacity': widget_opacity})  //  .css({object})
                      $('#panToCurrent_geolocation_button').css({'opacity': widget_opacity})  //  .css({object})

                  }          

                  function set_google_widget_opacity(){
                    // you can't change opacity of native google widget, maybe use flutter plugin.... too complicated. not doing it. 
                  }

                          // .............. legend panel  .............. 

                                  function turn_on_legend_panel() {
                                          $('#legend-div').show();
                                          legend_panel_status = true;
                                  }
                                  function turn_off_legend_panel(){
                                          $('#legend-div').hide();
                                          legend_panel_status = false;
                                  }

                                  function turn_on_dynamicLegend_panel() {
                                    $('#dynamic-legend').show();
                                    dynamicLegend_panel_status = true;
                                  }
                                  function turn_off_dynamicLegend_panel(){
                                          $('#dynamic-legend').hide();
                                          dynamicLegend_panel_status = false;
                                  }


                          // .............. end   ..............  legend panel  .............. 

        /**/
        //  --- end  --- print   --- 
        /**/





                /**/
                //  ... --- ... show count   ... --- ...
                /**/
                            var show_count_status = 'show_count' // default
                            var param_show_count_status

                                    function init_show_count(){





                                            /**/
                                            //  ... --- ... show count   ... --- ...
                                            /**/
                                            param_show_count_status  = urlParams.get('show_count_status');  
                                            if (param_show_count_status){
                                              show_count_status = param_show_count_status
                                            } else {
                                              show_count_status = 'show_count'  // default
                                            }

                                            /**/
                                            // ... --- ... end ... --- ... show count   ... --- ...
                                            /**/




                                            if (show_count_status == 'show_count'){
                                              $('#show_count').attr('checked', true)
                                              $('#hide_count').removeAttr('checked')
                                              $("#message_info").removeClass( "disabled_color_class");
                                            } else {
                                              $('#hide_count').attr('checked', true)
                                              $('#show_count').removeAttr('checked')
                                              $("#message_info").addClass( "disabled_color_class");
                                            }



                                        // event
                                        $('input[type=radio][name=show_hide_count_radio]').on('change', function() {

                                          show_count_status = $(this).val()
                                          update_url_parameter('show_count_status', show_count_status)

                                          if (show_count_status == 'show_count'){
                                                  $("#message_info").removeClass( "disabled_color_class");
                                          } else {
                                                  // hide count
                                                  $("#message_info").addClass( "disabled_color_class");
                                          }
                                        });

                                      
                                    }
                /**/
                // ... --- ... end ... --- ... show count   ... --- ...
                /**/












                /**/
                //   --- --- --- --- elevation  --- --- --- ---
                /**/

                /*
                    Show Elevation when click  https://developers.google.com/maps/documentation/javascript/examples/elevation-simple
                    Showing Elevation Along a Path  https://developers.google.com/maps/documentation/javascript/examples/elevation-paths
                */

                var click_function = 'highlight_feature' // default
                var elevator
                var param_click_function
                var address_value_html
                var elevation_value_html

                // Converting Metres to Feet and Feet to Metres
                const meter_feet_conversion = 3.281
                var elevation_in_meter
                var elevation_in_meter_int
                var elevation_in_meter_decimal
                var elevation_in_meter_decimal_string
                var elevation_in_meter_decimal_string_digit
                var elevation_in_feet
                var elevation_in_feet_int
                var elevation_in_feet_decimal
                var elevation_in_feet_decimal_string
                var elevation_in_feet_decimal_string_digit


                var elevation_path_sample_count = 20
                var param_elevation_path_sample_count
                var elevation_path_polyline_strokeWeight = 30 
                var elevation_path_polyline_color = "#0000CC"
                var elevation_path_polyline_opacity = 0.4

                var path_origin_marker_color = "rgba(255,255,255, 0.8)"
                var path_destination_marker_color = "rgba(135, 206, 235, 0.8)"

                var path_step = 'origin'
                var path_origin_marker_graphic
                var path_destination_marker_graphic
                var pathLine_graphic_array = []
                var path_total_miles = 0
                var elevation_path = []
              
                var origin_marker
                var destination_marker
                var elevation_path_polyline


                


                // Directions
                var directionsRenderer 
                var directionsService
                var route_step = 'origin'
                var route_start_marker
                var route_end_marker
                var route_start_location
                var route_end_location

                var travel_mode = 'DRIVING'
                var param_travel_mode
                var googleTravelModeObject


                function init_click_function(){

                    param_click_function  = urlParams.get('click_function'); 
                    console.log('param click function',  param_click_function) 
                    if (param_click_function){
                                                click_function = param_click_function
                    }
                    console.log('init click function',  click_function) 


                    param_elevation_path_sample_count  = urlParams.get('elevation_path_sample_count'); 
                    console.log('param elevation_path_sample_count',  param_elevation_path_sample_count) 
                    if (param_elevation_path_sample_count){
                      elevation_path_sample_count = Number.parseInt(param_elevation_path_sample_count)
                    }
                    $('#elevation_path_sample_count_slider_input').val(elevation_path_sample_count)
                    $('#elevation_path_sample_count_label').html(elevation_path_sample_count)


                    param_travel_mode  = urlParams.get('travel_mode'); 
                    console.log('param travel mode',  param_travel_mode) 
                    if (param_travel_mode){
                      travel_mode = param_travel_mode
                    }
                    console.log('init travel mode',  travel_mode) 





                    // first time init, only run 1 time
                    click_function_change_handler()


                     // event
                     $('input[type=radio][name=click_function_radio]').on('change', function() {

                                          click_function = $(this).val()
                                          update_url_parameter('click_function', click_function)

                                          click_function_change_handler()
                                        });

                    // event handle
                    $('#elevation_path_sample_count_slider_input').on('change', function() {
                              elevation_path_sample_count = Number.parseInt($('#elevation_path_sample_count_slider_input').val())
                              $('#elevation_path_sample_count_label').html(elevation_path_sample_count)
                              update_url_parameter('elevation_path_sample_count', elevation_path_sample_count)
                              
                              displayPathElevation(elevation_path, elevator, map);
                    });




                    elevator = new google.maps.ElevationService();

                    // elevation chart for path only https://developers.google.com/maps/documentation/javascript/examples/elevation-paths#maps_elevation_paths-javascript
                    // Load the Visualization API and the columnchart package.
                    // @ts-ignore TODO update to newest visualization library
                    google.load("visualization", "1", { packages: ["columnchart"] });



                    // --- --- direction   --- --- 
                    directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsService = new google.maps.DirectionsService();
                    directionsRenderer.setPanel(document.getElementById("route_text_direction"));  
                  
                }



                function click_function_change_handler(){


                    // remove previous highlighted feature
                    remove_all_data_from_map()

                    remove_elevation_path_and_point()

                    remove_route()

                    $('#address_span').html('')
                    $('#elevation_meter_span').html('')
                    $('#elevation_chart').html('')
                    $('#straightLine_distance').html('')
                    $('#straightLine_distance_for_route').html('')
                    $('#route_text_direction').html('')
                    $('#local_time_span').html('')

                    $("input:radio[name*='click_function_radio']").removeAttr("checked"); 

                    switch (click_function) {

                      case 'highlight_feature':
                                              $('#highlight_feature').attr('checked', true)                                             
                        break;

                      case 'show_address':
                                              $('#show_address').attr('checked', true)                                             
                        break;

                      case 'show_elevation':
                                              $('#show_elevation').attr('checked', true)                                             
                        break;

                      case 'show_elevation_along_path':

                                              $('#show_elevation_along_path').attr('checked', true)
                                              path_step = 'origin'
                        break;

                      case 'DRIVING':
                                              $('#DRIVING').attr('checked', true)
                                              route_step = 'origin'
                        break;


                      case 'WALKING':
                                              $('#WALKING').attr('checked', true)
                                              route_step = 'origin'
                        break;


                      case 'BICYCLING':
                                              $('#BICYCLING').attr('checked', true)
                                              route_step = 'origin'
                        break;


                      case 'TRANSIT':
                                              $('#TRANSIT').attr('checked', true)
                                              route_step = 'origin'
                        break;



                     case 'show_local_time':
                                              $('#show_local_time').attr('checked', true)
                        break;


                    default:
                        console.log('Sorry, we are out of click_function');
                  }

                }




                function remove_elevation_path_and_point(){

                  if (origin_marker){origin_marker.setMap(null)}
                  if (destination_marker){destination_marker.setMap(null)}
                  if (elevation_path_polyline){elevation_path_polyline.setMap(null)}

                }



                var clicked_lng
                var clicked_lat
                function displayAddress(location) {

                  console.log('you clicked location: ', location)
                  clicked_lat = location.lat()
                  clicked_lng = location.lng()
                  console.log('you clicked location lat lng: ', clicked_lat, clicked_lng )

                  // billing https://developers.google.com/maps/documentation/geocoding/usage-and-billing

                                // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=your_api_key

                                // for this kind of place,geocode api call with &key=xxx,Google not allow use website restrict(localhost,referer restrict is not allowed), can only use IP restrict (hp-police)localhost ip: 167.224.97.162  production server ip: 116.221.167.72
                                // different from google map api key,  which is website restrict to transparentgov.net only
                                var _reverseGeocode_by_google_url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + _google_public_map_only_api_key +  '&latlng=' + clicked_lat  + ',' + clicked_lng;
                                     
                                console.log(' _reverseGeocode_by_google_url ', _reverseGeocode_by_google_url)    
                               
                                
                                $.ajax({
                                  timeout: _timeout,
                                  type: 'GET',

                                 // call google api, never use jsonp, however, call arcgis rest api, need use jsonp 
                                 // dataType: 'jsonp',
                                
                                
                                  url: _reverseGeocode_by_google_url,
                                  
                                  // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                                 error: function (jqXHR, textStatus, errorThrown) {
                                          // ajax failed
                                          var _error_status = textStatus + ' : ' + errorThrown         
                                          console.log('ajax error  + ', _error_status)

                                        

                                          console.log("address No results found ", error)
                                          $('#address_span').html('<mark><h1 style="display:inline">' + "no results found" + '</h1></mark>')
                                },

                                success: function (data) {

                                  var addressResult
                                  if (typeof data === 'object') {
                                     // is object
                                     addressResult = data
                                  } else {
                                     // is string
                                     addressResult = JSON.parse(data)
                                  }
                                
                                  console.log('address result', addressResult)
                                  console.log('1st address', addressResult.results[0].formatted_address)
                                  address_value_html = '<span style="font-size:64px;">' + addressResult.results[0].formatted_address +   '</span>'  
                                  
                                  $('#address_span').html(address_value_html)

                                }// success
                              }) // ajax
                }

                
                function displayLocationElevation(location, elevator) {
                  // Initiate the location request
                  elevator
                    .getElevationForLocations({
                      locations: [location],
                    })
                    .then(({ results }) => {

                            console.log('elevation result', results)
                             
                            // Retrieve the first result
                            if (results[0]) {
                              elevation_in_meter = Number.parseFloat(results[0].elevation);
                              elevation_in_meter_int = Number.parseInt(results[0].elevation);
                              elevation_in_meter_decimal = Number.parseFloat(elevation_in_meter - elevation_in_meter_int).toFixed(2);
                              elevation_in_meter_decimal_string = elevation_in_meter_decimal.toString()
                              elevation_in_meter_decimal_string_digit = elevation_in_meter_decimal_string.substring(elevation_in_meter_decimal_string.indexOf('.'))
                              console.log('elevation meter, int, decimal, decimal string', elevation_in_meter, elevation_in_meter_int, elevation_in_meter_decimal, elevation_in_meter_decimal_string, elevation_in_meter_decimal_string_digit)

                              elevation_in_feet = elevation_in_meter * meter_feet_conversion
                              elevation_in_feet_int = Number.parseInt(elevation_in_feet);
                              elevation_in_feet_decimal = Number.parseFloat(elevation_in_feet - elevation_in_feet_int).toFixed(2);
                              elevation_in_feet_decimal_string = elevation_in_feet_decimal.toString()
                              elevation_in_feet_decimal_string_digit = elevation_in_feet_decimal_string.substring(elevation_in_feet_decimal_string.indexOf('.'))
                              console.log('elevation feet, int, decimal, decimal string', elevation_in_feet, elevation_in_feet_int, elevation_in_feet_decimal, elevation_in_feet_decimal_string, elevation_in_feet_decimal_string_digit)

                              elevation_value_html = '<span style="font-size:64px;">' + elevation_in_meter_int +   '</span>' +  '<span>' +  elevation_in_meter_decimal_string_digit  + '</span>' +  ' meters ' 
                              elevation_value_html += '<span style="font-size:64px;">= </span>'
                              elevation_value_html += '<span style="font-size:64px;">' + elevation_in_feet_int +   '</span>' +  '<span>' +  elevation_in_feet_decimal_string_digit  + '</span>' +  ' feet '

                              $('#elevation_meter_span').html(elevation_value_html)
                            } else {
                               console.log("Elevation service No results found ", error)
                               $('#elevation_meter_span').html('<mark><h1 style="display:inline">' + "no results found" + '</h1></mark>')
                            }
                         


                    })
                    .catch((error) => {
                        console.log("Elevation service failed due to: ", error)
                        $('#elevation_meter_span').html('<mark><h1 style="display:inline">' + "elevation service failed" + '</h1></mark>')
                });
                }
                


                function displayPathElevation(path, elevator, map) {
                  
                  if (path){
                    if (path.length == 2){

                              console.log('path a to b', path)
                              straightLine_distance_html = getStraightLineDistance(path[0]['lat'], path[0]['lng'], path[1]['lat'], path[1]['lng']) //(lat1,lon1,lat2,lon2)                             
                              $('#straightLine_distance').html(straightLine_distance_html)

                              // Create a PathElevationRequest object using this array.
                              // Ask for 256 samples along that path.
                              // Initiate the path request.
                              elevator
                                .getElevationAlongPath({
                                  path: path,
                                  samples: elevation_path_sample_count,
                                })
                                .then(plotElevation)
                                .catch((e) => {
                                  const chartDiv = document.getElementById("elevation_chart");
                            
                                  // Show the error code inside the chartDiv.
                                  chartDiv.innerHTML = "Cannot show elevation: request failed because " + e;
                                });


                      }//if
                  }//if



                }
                
                // Takes an array of ElevationResult objects, draws the path on the map
                // and plots the elevation profile on a Visualization API ColumnChart.
                function plotElevation({ results }) {
                  const chartDiv = document.getElementById("elevation_chart");
                  // Create a new chart in the elevation_chart DIV.
                  const chart = new google.visualization.ColumnChart(chartDiv);
                  // Extract the data from which to populate the chart.
                  // Because the samples are equidistant, the 'Sample'
                  // column here does double duty as distance along the
                  // X axis.
                  const data = new google.visualization.DataTable();
                
                  data.addColumn("string", "Sample");
                  data.addColumn("number", "Elevation");
                
                  for (let i = 0; i < results.length; i++) {
                    data.addRow(["", results[i].elevation]);
                  }
                
                  // Draw the chart using the data within its DIV.
                  chart.draw(data, {
                    height: 150,
                    legend: "none",
                    // @ts-ignore TODO update to newest visualization library
                    titleY: "Elevation (m)",
                  });
                }



                function add_pathMarkerGraphic(pathMarker_type, point) {

                  if (pathMarker_type == "origin"){

                     // start over, first remove previously path and points
                     remove_elevation_path_and_point()
                     elevation_path = []

                    origin_marker =  new google.maps.marker.AdvancedMarkerElement({
                              position: point,
                              map,
                              title: "origin",
                            });

                           
                            elevation_path.push(point) 
                    
                  } else if (pathMarker_type == "destination"){

                    destination_marker = new google.maps.marker.AdvancedMarkerElement({
                              position: point,
                              map,
                              title: "destination",
                            });

                            elevation_path.push(point) 

                            // test only Display a polyline of the elevation path.
                    elevation_path_polyline = new google.maps.Polyline({
                              path: elevation_path,
                              strokeColor: elevation_path_polyline_color, 
                              strokeOpacity: elevation_path_polyline_opacity,
                              strokeWeight: elevation_path_polyline_strokeWeight, 
                              map: map,
                            });

                             // Draw the path, using the Visualization API and the Elevation service.
                             displayPathElevation(elevation_path, elevator, map);

                

                  }


              }




              

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










              // --- --- direction   --- --- 


              function calculateAndDisplayRoute(directionsService, directionsRenderer) {
                var start = route_start_location;
                var end = route_end_location;

                console.log(' route a to b ',start, end )
                straightLine_distance_html = getStraightLineDistance(start['lat'],start['lng'], end['lat'], end['lng']) //(lat1,lon1,lat2,lon2)
                $('#straightLine_distance_for_route').html(straightLine_distance_html)
              
                directionsService
                  .route({
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode[click_function],  // google.maps.TravelMode.DRIVING,
                  })
                  .then((response) => {
                    directionsRenderer.setDirections(response);
                  })
                  .catch((e) => window.alert("Directions request failed due to " + e));
              }

              function add_routeMarkerGraphic(routeMarker_type, point) {

                  if (routeMarker_type == "origin"){

                    // start over, first remove previously route
                    remove_route()
                   
                    route_start_location = point

                    route_start_marker =  new google.maps.marker.AdvancedMarkerElement({
                              position: point,
                              map,
                              title: "origin",
                            });

                          
                           
                    
                  } else if (routeMarker_type == "destination"){

                    route_end_location = point

                    route_end_marker = new google.maps.marker.AdvancedMarkerElement({
                              position: point,
                              map,
                              title: "destination",
                            });

                           // route_start_marker.setMap(null);
                           // route_end_marker.setMap(null);

                            directionsRenderer.setMap(map);
                            
                            calculateAndDisplayRoute(directionsService, directionsRenderer);

                  }


              }


              function remove_route(){

                if (directionsRenderer){directionsRenderer.setMap(null)};
                if (route_start_marker){route_start_marker.setMap(null)};
                if (route_end_marker){route_end_marker.setMap(null)};

              }


             //   --- --- end  --- --- direction   --- --- 





             function displayLocalTime(location) {

              // https://developers.google.com/maps/documentation/timezone/requests-timezone#requests

              var timeZoneServiceURL = 'https://maps.googleapis.com/maps/api/timezone/json?'

              console.log('display Local Time, location ', location.lat(),  location.lng());
              var location_param = 'location=' + location.lat() + '%2C' +  location.lng()
              
              // both works https://stackoverflow.com/questions/8047616/get-a-utc-timestamp
              // it is milliseconds, does not work with google time zone api 
              var timestamp_milliseconds =  new Date().getTime();
               // both works, 
              //var timestamp_milliseconds =  Date.now();  


              // must remove milliseconds to work with google time zone api  https://stackoverflow.com/questions/29079575/gettime-alternative-without-milliseconds
              var currentTimeUTC_without_milliseconds = Math.floor(timestamp_milliseconds / 1000)
             
              var timestamp_param = '&timestamp=' +  currentTimeUTC_without_milliseconds;  
              
              timeZoneServiceURL += location_param + timestamp_param + '&key=' + _google_public_map_only_api_key

              var timeZoneResult

              console.log(' timeZoneServiceURL ', timeZoneServiceURL);

              try{
                            $.ajax({
                                                    timeout: _timeout,
                                                    type: 'GET',
                                                    url: timeZoneServiceURL,
                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                        console.log(' time zone error  : ', _error_status);
                                                    },
                                                    success: function (data) {
              
                                                      // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                      if (typeof data === 'object') {
                                                          // is object
                                                          timeZoneResult = data
                                                      } else {
                                                          // is string
                                                          timeZoneResult = JSON.parse(data)
                                                      }
                                                      console.log(' time zone results', timeZoneResult )
                                                      

                                                      if (timeZoneResult.status == 'OK'){
                                                      
                                                          var localTimeUTC_without_milliseconds = currentTimeUTC_without_milliseconds + timeZoneResult.dstOffset + timeZoneResult.rawOffset
                                                          var localTimeUTC_milliseconds = localTimeUTC_without_milliseconds * 1000
                                                          var localTimeDateString = (new Date(localTimeUTC_milliseconds)).toUTCString()
                                                          console.log(' local time string', localTimeDateString )
                                                          /* not working
                                                          var localTimeDateObject = new Date(localTimeUTC_milliseconds)
                                                          var localTime_date = localTimeDateObject.getFullYear()+'-'+(localTimeDateObject.getMonth()+1)+'-'+localTimeDateObject.getDate();
                                                          var localTime_time = localTimeDateObject.getHours() + ":" + localTimeDateObject.getMinutes() + ":" + localTimeDateObject.getSeconds();
                                                          var localTime_dateTime = localTime_date + ' ' + localTime_time;
                                                          console.log(' local time string', localTime_dateTime )
                                                          */
                                                         
                                                          
                                                          var today = new Date();
                                                          var today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                                                          var today_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                                          var today_dateTime = today_date + ' ' + today_time;
                                                          console.log('your time ', today_dateTime)


                                                          var localTimeHTML = ''
                                                          localTimeHTML += '<b>' + timeZoneResult.timeZoneId + '</b>' + ' ' +  '<sub>' + timeZoneResult.timeZoneName + '</sub>'
                                                          localTimeHTML += '</br>'
                                                          localTimeHTML += '<span style="font-size:36px;">' + localTimeDateString + '</span>'
                                                          localTimeHTML += '</br>'
                                                          localTimeHTML += '<sup> Your time is </sup><b>' + today_dateTime + '</b>'

                                                          $('#local_time_span').html(localTimeHTML)

                                                      } else {

                                                         // time zone failed 

                                                      }
                                                   
                                                      
                                                    }
                                                });   
        
                                        
                                        
       
              } catch(ajax_error) {
                  
                  console.log('time zone results - ajax error ', ajax_error)
              }

            }



                /**/
                //   --- --- end --- --- elevation  --- --- --- ---  
                /**/








                function addAliasToFieldName(_propertiesObj, _fieldAliasObj){

                  var _propertiesObj_aliasAdded = {}
                  var _fieldName_aliasAdded = ''
    
                  for (const [key, value] of Object.entries(_propertiesObj)) {
                    //console.log(`${key}: ${value}`);
                    if (_fieldAliasObj.hasOwnProperty(key)){
                            _fieldName_aliasAdded = key + ' (' + _fieldAliasObj[key] + ')' 
                            _propertiesObj_aliasAdded[_fieldName_aliasAdded] = value
                    } else {
                      _propertiesObj_aliasAdded[key] = value
                    }
                    
                  }//for
                  
                  return _propertiesObj_aliasAdded
                }








                
               



                //   --- --- --- --- back to previous extent --- ---
                var extentStack = new Stack();             










  // ..... google search place ......outside of map only...........  current location ....   ...   ....
           
      var infowindow_googleMap;

      var new_place_marker

      function add_search_place(){

        infowindow_googleMap = new google.maps.InfoWindow();

        // Create the search box and link it to the UI element.
            var  place_input = document.getElementById('pac-input');
            var  searchBox = new google.maps.places.SearchBox(place_input);
              //map.controls[google.maps.ControlPosition.TOP_CENTER].push(place_input);

              // disable this line will make it outside of map
              //map.controls[google.maps.ControlPosition.TOP_LEFT].push(place_input);

              // Bias the SearchBox results towards current map's viewport.
              map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
              });

              var markers = [];
              // Listen for the event fired when the user selects a prediction and retrieve
              // more details for that place.
              searchBox.addListener('places_changed', function() {


                _current_location_input_text = $("#pac-input").val()
    update_url_parameter("location", _current_location_input_text)
                console.log('new place in address place search bar', _current_location_input_text)

                var places = searchBox.getPlaces();

                if (places.length == 0) {
                  return;
                }

                // Clear out the old markers.
                markers.forEach(function(marker) {
                  marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                  if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                  }
                  var icon = {
                    url: place.icon, //https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(75, 75)
                  };

                  // Create a marker for each place.
                  new_place_marker = new google.maps.marker.AdvancedMarkerElement({
                    map: map,
                    
                    title: place.name,
                    position: place.geometry.location
                  })
                  google.maps.event.addListener(new_place_marker, 'click', function() {
                    infowindow_googleMap.setContent(place.name);
                    infowindow_googleMap.open(map, this);
                  });
                  markers.push(new_place_marker);

                  if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                  } else {
                    bounds.extend(place.geometry.location);
                  }
                });
                map.fitBounds(bounds);
              });


      }

  // ..... end ..... google search place ........outside of map only.........




  





                  

                  // newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy 
                  async function get_total_count(){


                    /*    
                    var SWlong = globe_bounding_box.coordinates[0][0][0];
                    var SWlat  = globe_bounding_box.coordinates[0][0][1];
                    var NElong = globe_bounding_box.coordinates[0][2][0];
                    var NElat  = globe_bounding_box.coordinates[0][2][1];
                      
                    

                    //-------------- arcgis server, rest API --------------------------------

                    // this is bad request, should not use layerDefs={'0':''}, instead should use FeatureServer/0/query?...
                    // http://services3.arcgis.com/VILr8UqX00eNAkeO/arcgis/rest/services/Parcels/FeatureServer/query?layerDefs={'0':''}&returnGeometry=true&f=json&geometryType=esriGeometryEnvelope&geometry={'xmin' : -117.923158, 'ymin' : 33.644081, 'xmax' : -117.921436, 'ymax' : 33.645157,'spatialReference' : {'wkid' : 4326}}
                    
                    // this is good one
                    // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=ASSETID = 1723459
                    // must specify &outSR=4326& in URL, because gis layer default srid is NOT 4326
                    // srid=4326 is only srid for lat long


                    // esri, by default, use esri:102100, 
                    //_envelope_111 = '{"spatialReference":{"latestWkid":3857,"wkid":102100},"xmin":-9178558.356484555,"ymin":3240929.9992936105,"xmax":-9177335.364031991,"ymax":3242152.991746176}';
                    
                    //var _envelope = '{"xmin" : -117.923158, "ymin" : 33.644081, "xmax" : -117.921436, "ymax" : 33.645157,"spatialReference" : {"wkid" : 4326}}';
                    var _envelope_un_encode ='{"spatialReference":{"wkid":4326}, "xmin" : '+ SWlong +', "ymin" : '+ SWlat + ', "xmax" : '+NElong +', "ymax" : '+ NElat + '}';
                    
                    // fix bug, _envelope must encodeURI( ), without this some city (tampagov.net)
                    // will show no-cross origine error, the real problem is envelope need encode
                    
                  var _envelope = encodeURI(_envelope_un_encode);
                  //  console.log('_envelope --- encoded >>>', _envelope)

                    
                    // Note: must specify outFields=*, in order to get all properties, without this, properties= null
                    var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&geometryType=esriGeometryEnvelope&geometry='+ _envelope;
                    

                    //--------- End ----- arcgis server, rest API --------------------------------
                    
                  */




                              






                  
            // use where=1=1 ,  will get total count only ,   (where=FID>0 , where=objectid>0 also can, but not every layer have FID or objectid, you could run into error if layer do not have FID, or objectid) 
            //var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&where=1=1';
            
              /*
                                    https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm

                                    only works from 10.8.1, 
                                    but if 10.7 or lower, no error, just not fast, same as where=1=1

                                      Non-hosted feature services published from ArcGIS Pro support an optimization for getting a layer's row count. 
                                      By setting where as 9999=9999 and returnCountOnly as true, the result is an approximate count that is returned very quickly. 
                                      For accurate, but slower to return, row counts, use any other filter (e.g. where: 1=1). 
                                      This is only supported when a layer has both isDataVersioned and isDataArchived as false.
              */ 
            var _url_total_countonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&where=9999=9999';
            

                                

            var _total_count_result_json





            // newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy 
            try {

              // cors
              var response_string =  await $.ajax({ 
                type: 'GET',
              
                url: _url_total_countonly,

                error: function (jqXHR, textStatus, errorThrown) {
                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                      console.log('ajax error  + ', _error_status);
                },

                success: function (data) {
                  console.log('get total count --> cors --> success  --> ');
                }

              });  // await
            } catch(cors_failed) {

                    console.log('get total count  --> cors failed !!!!!!', cors_failed);

                    try {         
                          // jsonp 
                          var response_string =  await $.ajax({
                            type: 'GET',
                            dataType: 'jsonp',
                            data: {},

                            url: _url_total_countonly,

                            error: function (jqXHR, textStatus, errorThrown) {
                                                  var _error_status = textStatus + ' : ' + errorThrown;         
                                                  console.log('ajax error  + ', _error_status);
                            },

                            success: function (data) {
                              console.log('get total count --> jsonp --> success  --> ');
                            }

                    });  // await
    
                    } catch(jsonp_failed) {

                              console.log('get total count  --> jsonp failed !!!!!!', jsonp_failed);

                              try {

                                        

                                        // proxy
                                        // --------- add proxy  ---------
                                        var _url_total_countonly_proxy = proxyurl +  _url_total_countonly

                                        var response_string =  await $.ajax({
                                          type: 'GET',
                                    
                                          url: _url_total_countonly_proxy,
      
                                          error: function (jqXHR, textStatus, errorThrown) {
                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                console.log('ajax error  + ', _error_status);
                                          },
      
                                          success: function (data) {
                                            console.log('get total count --> proxy --> success  --> ');
                                          }
      
                                  });  // await



                                } catch(proxy_failed) {


                                  console.log('get total count  --> proxy failed !!!!!!', proxy_failed);



                                } // catch proxy
                          

                    } // catch cors


            } // catch jsonp





            
                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                          if (typeof response_string === 'object') {
                              // is object
                              _total_count_result_json = response_string
                          } else {
                              // is string
                              _total_count_result_json = JSON.parse(response_string)
                          }



                          console.log('try get total count, success ', _total_count_result_json);
                                
                          _total_count_of_feature = get_count(_total_count_result_json)

                      
                          display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)





                  }   
                  // only for total count ,
                  function get_count(__raw_count){

                          
                                                        
                    //{ 'count': 1661}

                    // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
                    //is already a plain JavaScript object; no need to try to parse it.
                    var data_count
                    if (typeof __raw_count === 'object') {
                        // is object
                        data_count = __raw_count.count
                    } else {
                        // is string
                        data_count = JSON.parse(__raw_count).count
                    }
                  
                    return data_count

                  }











  /**/


            //  -------------------  esri  ------------------- pan to real location  ------------------- 


                  /**/

                          // only for esri,    socrata does not use this 
                          async function pan_to_real_location(){


                                             

                            var _use_sample_feature_result = await use_sample_feature()
                            console.log(' _use_sample_feature_result ', _use_sample_feature_result)

                            if (_use_sample_feature_result) {
                                    
                                    console.log('successfully use sample feature to improve best viewing, zoom-in to single feature level  - -> - - > : ', _center_lat, _center_long, _center_zoom )

                            } else {

                                    console.log('layer maybe have image only, no feature, get 0 sample.  ::::::  ', _center_lat, _center_long, _center_zoom )



                                    //  use extent ,  fast, only need 2 very quick ajax call, 1 for layer_json, 2 for mapserver_json 
                                    // after 2 quick ajax call, in the projection process, most of time, use projection method, 'default' or 'esri_proj', no ajax call, no await.  Only 'read_from_string'+proj4  need await, ajax call.
                                    // how ever, extent may not have best result, because it is too far away, we use sample feature to improve zoom in to single feature level.
                                    await use_extent()
                            }

                 

} // pan to real location





// newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy
async function use_sample_feature(){


  


  //=============== in use :  &where=1=1 ===========================



                            /*

                                improvement: 
                            
                                https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm

                                sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0


                                if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10


                                since we not sure, we can only try both, if 100 not work, then get default 2000 

                            */     




  var _url_sample_json = _url + '/'+  _layer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1';

  if (_supportsPagination){

  
          _url_sample_json = _url + '/'+  _layer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1&resultOffset=0&resultRecordCount=' + _sample_count;

  }


  



var _sample_json = {};


console.log('url sample json url  supportsPagination : ',_supportsPagination,  _url_sample_json)
                          


/*
    no need, because of variable hoisting/ function hoisting, response_string inside each try/catch block will available through this whole function, 
    https://stackoverflow.com/questions/10441717/javascript-scope-in-a-try-block
    var response_string
*/


// newer arcgis server seems prefer cors instead of jsonp, use cors first - then jsonp - proxy
try {

       // cors
       var response_string =  await $.ajax({

        // large data take long long time , so should not time out, let it run until get it
      // timeout: _timeout,


          type: 'GET',
          
          url: _url_sample_json,
          error: function (jqXHR, textStatus, errorThrown) {
            
            var _error_status = textStatus + ' : ' + errorThrown;         
                                  console.log('ajax error  + ', _error_status);
                              


          },
          success: function (data) {

            console.log('pan to real location , use sample feature --> cors --> success  --> ');

          }
       });  // await

  } catch(cors_failed) {


        console.log('pan to real location , use sample feature,  --> cors failed !!!!!!', cors_failed);

       try {

                     
            // jsonp 
            var response_string =  await $.ajax({
            
              // large data take long long time , so should not time out, let it run until get it
              //timeout: _timeout,

                type: 'GET',
                dataType: 'jsonp',
                data: {},
                url: _url_sample_json,
                error: function (jqXHR, textStatus, errorThrown) {
                  
                  var _error_status = textStatus + ' : ' + errorThrown;         
                                        console.log('ajax error  + ', _error_status);
                                      


                },
                success: function (data) {

                  console.log('pan to real location , use sample feature --> jsonp --> success  --> ');
                    
                
                }
            });  // await

        } catch(cors_failed) {

                      console.log('pan to real location , use sample feature,  --> cors failed !!!!!!', cors_failed);

                      try {

                                

                                // proxy
                                // --------- add proxy  ---------
                                var _url_sample_json_proxy = proxyurl +  _url_sample_json

                                var response_string =  await $.ajax({

                                                                          // large data take long long time , so should not time out, let it run until get it
                                                                          // timeout: _timeout,


                                                                          type: 'GET',
                                                                          
                                                                          url: _url_sample_json_proxy,
                                                                          error: function (jqXHR, textStatus, errorThrown) {
                                                                            
                                                                            var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                  console.log('ajax error  + ', _error_status);
                                                                                              
                                                  
                                                  
                                                                          },
                                                                          success: function (data) {
                                                                            console.log('pan to real location , use sample feature --> proxy --> success  --> ');
               
                                                                          }
                                });  // await




                              



                      } catch(proxy_failed) {


                        console.log('pan to real location , use sample feature,  --> proxy failed !!!!!!', proxy_failed);



                      } // catch proxy
                

        } // catch cors


  } // catch jsonp




  // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
  if (typeof response_string === 'object') {
      // is object
      _sample_json = response_string
  } else {
      // is string
      _sample_json = JSON.parse(response_string)
  }

  


      
  console.log(' >>>>>>>>  sample json  feature array [] >>>>>>  ', _sample_json.features);

 

  if (
    (typeof (_sample_json.features)  == 'undefined' )
    || (typeof (_sample_json.error) !== 'undefined' )
    || (_sample_json.features.length == 0) // sample feature is empty array [],
  ){

        /*
            raster layer do not have sample feature, will return error like this: 

              {  error: {code: 400, message: "Invalid or missing input parameters.", details: []} }
        
              features[] array is 'undefined'
              //return false;
        */

        get_map_bound()

} else {

         var _sample_arcgis_feature_Set = _sample_json


         




        
          // parse an ArcGIS feature set (Geometry) to GeoJSON
                                    //console.log(' before convert, arcgis json ', arcgis_feature_Set) 
                          
          // Terraformer does not support Feature Set, only support single arcgis geometry.
          // sometime, they use 'OBJECTID_1' instead of default 'OBJECTID', you must specify it, 
                                    // otherwise, geojson id will not match object-id, 
                                    // or geojson id is same number or null, cause failed to show geojson on map 
                                    //_geojson_object = Terraformer.arcgisToGeoJSON(arcgis_feature_Set,'OBJECTID_1')
          var _sample_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(_sample_arcgis_feature_Set, objectid_field_name)







          //  "type": "FeatureCollection"

          var _sample_coordinates;

          // array of features for test
          var _sample_feature =[]; 


          if (_sample_geojson_object.type.toLowerCase() ===  "featurecollection") 
          {
            _sample_feature = _sample_geojson_object.features

          } else if (_sample_geojson_object.type.toLowerCase() ===  "feature") {

            // only 1 element 
            _sample_feature.push(_sample_geojson_object)
          }



          console.log ('sample feature array[] ', _sample_feature )






          if (_sample_feature.length > 0 ) {


                  // layer have feature, just get a few sample feature as real location


                  /**/

                          // arcgis &where=1=1 by default have 1k or 2k record
                          for (var s = 0; s < _sample_feature.length; s++) {
    
                                  // if anything wrong, try next sample feature
                                  try {



                                              /**/
                                              //  .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                              /**/

                                              // - - fit bound - - 
                                              latlngList = []

                                              var _one_sample_feature = _sample_feature[s]
                                              var _one_sample_geometry
                                              console.log('pan to real location  >>>>> loop through sample feature >> this is a single one', s, _one_sample_feature);

                                              if (_one_sample_feature.geometry.type.toLowerCase() ===  "geometrycollection"){
                                                _one_sample_geometry = _one_sample_feature.geometry.geometries[0]
                                              } else  {
                                                _one_sample_geometry =_one_sample_feature.geometry
                                              }


                                              /*
                                                       _one_sample_geometry  sample:
                                                            {
                                                              type:"Point"
                                                              coordinates: [-111.979231, 40.682038]
                                                            }
                                              */
                                                        // centerOfMass, centroid, cener  see https://turfjs.org/docs/#center    
                                                        var turf_center = turf.center(_one_sample_geometry);
                                                        console.log(' turf center ', turf_center)

                                                        _center_lat  = turf_center.geometry.coordinates[1]
                                                        _center_long = turf_center.geometry.coordinates[0]
                                                        console.log('controled zoom to real location . . . .  _center_lat ...', _center_lat )
                                                        console.log('controled zoom to real location . . . .  _center_long ...', _center_long )
                                                    

                                             
                                                        
                                                        // warning: _one_sample_geometry is "geometry" object, not 'feature' object, see above the_geom sample
                                                        var _the_geom_type = _one_sample_geometry.type
                                                        _the_geom_type = _the_geom_type.toLowerCase()

                                                        console.log('pan to real location() >>>> _the_geom_type >>>', _the_geom_type)


                                                        
                                                              



                                                        if (_the_geom_type == 'point'){
                                                            latlngList.push(new google.maps.LatLng(_center_lat, _center_long));
                                                            console.log(' fit bound point lat lng List', latlngList)
                                                        }//if type = point

                                                        if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multipoint')){
                                                                        // add all point into list for later fit bound
                                                                        var line_coordinate = _one_sample_geometry.coordinates
                                                                        for (let c = 0; c < line_coordinate.length; c++) {
                                                                          latlngList.push(new google.maps.LatLng(line_coordinate[c][1], line_coordinate[c][0]));    // geojson coordinate pair is (long, lat)
                                                                        }
                                                                        console.log(' fit bound line lat lng List', latlngList)
                                                        }//if type = line 

                                                        if ((_the_geom_type == 'polygon') || (_the_geom_type == 'multilinestring')){
                                                                // add all point into list for later fit bound
                                                                var polygon_coordinate_level3 = _one_sample_geometry.coordinates
                                                                for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                        var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                        for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                                  latlngList.push(new google.maps.LatLng(polygon_coordinate_level2[p2][1], polygon_coordinate_level2[p2][0]));    // geojson coordinate pair is (long, lat)
                                                                        }//for p2
                                                                }//for p3
                                                                console.log(' fit bound polygon lat lng List', latlngList)
                                                        }// type = Polygon  

                                                        if (_the_geom_type == 'multipolygon'){
                                                                        // add all point into list for later fit bound
                                                                        var polygon_coordinate_level4 = _one_sample_geometry.coordinates
                                                                        for (let p4 = 0; p4 < polygon_coordinate_level4.length; p4++) {
                                                                              var polygon_coordinate_level3 = polygon_coordinate_level4[p4]
                                                                              for (let p3 = 0; p3 < polygon_coordinate_level3.length; p3++) {
                                                                                      var polygon_coordinate_level2 = polygon_coordinate_level3[p3]
                                                                                      for (let p2 = 0; p2 < polygon_coordinate_level2.length; p2++) {
                                                                                                latlngList.push(new google.maps.LatLng(polygon_coordinate_level2[p2][1], polygon_coordinate_level2[p2][0]));    // geojson coordinate pair is (long, lat)
                                                                                      }//for p2
                                                                              }//for p3
                                                                        }//for p4
                                                                        console.log(' fit bound multipolygon lat lng List', latlngList)
                                                        }// type = multipolygon   




                                                                                          
                                              /**/
                                              //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
                                              /**/



                                        

                                              /**/
                                              //  .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                              /**/
                                              if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){

                                                      console.log('pan-to-real-location auto  ## fit bound ## : all point lat lng list', _center_lat, _center_long, latlngList )

                                                      var bounds = new google.maps.LatLngBounds();
                                                      latlngList.forEach(function(n){
                                                        bounds.extend(n);
                                                      });
                                                      map.fitBounds(bounds, 20); // padding 20 pixel, https://developers.google.com/maps/documentation/javascript/reference/map#Map-Methods
                                                                    // avoid 21 too close, set max zoom level no more than
                                                      if (map.getZoom() > zoom2feature_noMoreThan){
                                                        map.setZoom(zoom2feature_noMoreThan); 
                                                      }
                                                      

                                                } else {

                                                  console.log('pan-to-real-location calculated - lat - long - : ', _center_lat, _center_long )
                                                                  
                                                  var latLng = new google.maps.LatLng(_center_lat, _center_long);
                                                  map.panTo(latLng);
                                                  map.setZoom(zoom2feature_zoomLevel); 

                                                }


                                                //!!! esri only !!!  ... - .. - ..,  pan to real location, sample json have many feature in for loop, I only use first success feature, once find first success feature, then return true
                                      get_map_bound()
                                                return true; 

                                                /**/
                                                //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. !!! esri only !!!  ... - .. - ..
                                                /**/
                                                                                      



                                  } catch(error_get_sample_feature){

                                            console.log ('  if anything wrong, try next sample feature ', error_get_sample_feature )


                                                    //"jumps over" one iteration in the for loop
                                                    continue;

                                  } // try              

                                                
                          }// for

                                


            } else {

                     
   
                         // sample feature failed  
                         console.log( ' sample feature failed  ')
                         return false

            } // if

    
          } // if error       

  }









async function use_extent(){



/**/

var _url_layer_extent = _url + '/'+  _layer_id + '?f=pjson';
var _url_server_extent = _url  + '/'   +  '?f=pjson';             // could be 'map server' or 'image server'





console.log( '_url_layer_extent , ', _url_layer_extent)
console.log( '_url_server_extent, ', _url_server_extent)





var _layer_extent_json
var _server_extent_json  // could be 'map server' or 'image server'





//  layer extent
try {
  


  // test only
  // throw ' ++++++++ test only ++++++++ jsonp failed';

  // jsonp 


   var response_string =  await $.ajax({

                                
                                    type: 'GET',
                                    dataType: 'jsonp',
                                    data: {},

                                    url:_url_layer_extent,



                                    error: function (jqXHR, textStatus, errorThrown) {
                                      
                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                            console.log('ajax error  + ', _error_status);
                                                          


                                    },
                                    success: function (data) {

                                      console.log('use extent,  layer json  --> jsonp success ');
                                        
                                       
                                    }
                                  });  // await

    } catch(jsonp_failed) {


          console.log('use extent,  layer json --> jsonp failed !!!!!!', jsonp_failed);

          try {
            // cors

            // test only
            // throw ' ++++++++ test only ++++++++ cors failed'; 

            var response_string =  await $.ajax({

                                              

                                                  type: 'GET',
                                                  
                                                  url:_url_layer_extent,

                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                    
                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                          console.log('ajax error  + ', _error_status);
                                                                        
                          
                          
                                                  },
                                                  success: function (data) {
                                                    console.log('use extent,  layer json  -->  --> cors  --->   success  ');
                                                      
                                                     
                                                  }
                                                });  // await

               
            } catch(cors_failed) {
                                                
          
                        console.log('use extent,  layer json  --> --> cors failed !!!!!!', cors_failed);


                        try {
                          // proxy

                          // --------- add proxy  ---------
                          var _url_layer_extent_proxy = proxyurl + _url_layer_extent


                          var response_string =  await $.ajax({


                                                                  type: 'GET',
                                                                  
                                                                  url:  _url_layer_extent_proxy,

                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                    
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                          console.log('ajax error  + ', _error_status);
                                                                                        
                                          
                                          
                                                                  },
                                                                  success: function (data) {
                                                                    console.log('use extent,  layer json  -->  --> proxy  --->   success  ');
                                                                      
                                                                     
                                                                  }
                                                                });  // await


                         

                        } catch(proxy_failed) {

                          console.log('use extent,  layer json  --> --> proxy failed !!!!!!', proxy_failed);



                        } // catch proxy
            

          } // catch cors


    } // catch jsonp



    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
    if (typeof response_string === 'object') {
        // is object
        _layer_extent_json = response_string
    } else {
        // is string
        _layer_extent_json = JSON.parse(response_string)
    }


     





//  mapserver extent
try {
   


    // test only
    // throw ' ++++++++ test only ++++++++ jsonp failed';

    // jsonp 


var response_string =  await $.ajax({

                                
                                    type: 'GET',
                                    dataType: 'jsonp',
                                    data: {},

                                    url:_url_server_extent,



                                    error: function (jqXHR, textStatus, errorThrown) {
                                      
                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                            console.log('ajax error  + ', _error_status);
                                                          


                                    },
                                    success: function (data) {

                                      console.log('use extent,  server json  --> --> jsonp success ');
                                        
                                        
                                    }
                                  });  // await

    } catch(jsonp_failed) {


          console.log('use extent,  server json --> jsonp failed !!!!!!', jsonp_failed);

          try {
            
          
                        // test only
                        // throw ' ++++++++ test only ++++++++ cors failed'; 

                        // cors
                        var response_string =  await $.ajax({

                                                          

                                                              type: 'GET',
                                                              
                                                              url:_url_server_extent,

                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                
                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                      console.log('ajax error  + ', _error_status);
                                                                                    
                                      
                                      
                                                              },
                                                              success: function (data) {

                                                                console.log('use extent,  server json  --> cors  --->    success  ');
                                                                  
                                                              }
                                                            });  // await



                                                            
                      
                         



              } catch(cors_failed) {


                      console.log('use extent,  server json --> cors failed !!!!!!', cors_failed);

                      try {
                        // proxy

                        // --------- add proxy  ---------
                        var _url_server_extent_proxy = proxyurl + _url_server_extent

                                  var response_string =  await $.ajax({
                                                                              type: 'GET',
                                                                              
                                                                              url:  _url_server_extent_proxy,

                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                
                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                    
                                                                              },
                                                                              success: function (data) {
                                                                                console.log('use extent,  server json  --> proxy  --->    success  ');
                                                                                  
                                                                                
                                                                              }
                                  });  // await



                        

                                 



                      } catch(proxy_failed) {


                        console.log('use extent,  server json --> proxy failed !!!!!!', proxy_failed);

                      } // catch proxy
            

            } // catch cors
              
              
  } // catch jsonp





      
// jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
if (typeof response_string === 'object') {
    // is object
    _server_extent_json = response_string
} else {
    // is string
    _server_extent_json = JSON.parse(response_string)
}



var _zoom_beforeLayerExtent
var _zoom_afterLayerExtent
var _zoom_afterServerExtent

var _zoomto_status = false

var _layer_extent_object
var _server_extent_object  // could be 'map server' or 'image server'

// 'layer' json    only have  'extent'
// 'map server'   json  have  'initExtent'  'fullExtent'
// 'image server' json  have  'extent'      'initExtent'  'fullExtent'


// try layer extent first,  

if (_layer_extent_json.extent) {
                                    _layer_extent_object = _layer_extent_json.extent
} else if (_layer_extent_json.initialExtent) {
                                    _layer_extent_object = _layer_extent_json.initialExtent
} else if (_layer_extent_json.fullExtent) {  
                                    _layer_extent_object = _layer_extent_json.fullExtent
} else {

        // ('image server' do not have layer) will end up here
        console.log( ' zoom to layer extent failed, layer json do not have  - extent - ')
        _zoomto_status = false
}


if (_layer_extent_object) {
                                _zoom_beforeLayerExtent = map.getZoom()
                                console.log( '_zoom_beforeLayerExtent ......... ', _zoom_beforeLayerExtent)
                                                                                            
                                // will map.fitBound(),  must use await because this function call ajax, need to wait until resolve promise. 
                                await zoom_to_esri_extent(_layer_extent_object)

                                _zoom_afterLayerExtent = map.getZoom()
                                console.log( '_zoom_afterLayerExtent ......... ', _zoom_afterLayerExtent)
}









if (! _zoomto_status){



                if (_server_extent_json.extent) {
                                                    _server_extent_object = _server_extent_json.extent
                } else if (_server_extent_json.initialExtent) {
                                                    _server_extent_object = _server_extent_json.initialExtent
                } else if (_server_extent_json.fullExtent) {  
                                                    _server_extent_object = _server_extent_json.fullExtent
                } else {
                        console.log( ' zoom to Server extent failed, Server json do not have  - any extent - ')
                        _zoomto_status = false
                }




                if (_server_extent_object) {

                            //layer extent is whole world, zoom level will be 1, then try mapserver extent
                            await zoom_to_esri_extent(_server_extent_object)

                            _zoom_afterServerExtent = map.getZoom()
                            console.log( '_zoom_afterServerExtent ......... ', _zoom_afterServerExtent)
                }

}







  





}








function panto_googlemaps(_panto_latitude, _panto_longitude, _panto_zoom){


  var latLng = new google.maps.LatLng(_panto_latitude, _panto_longitude);
  map.panTo(latLng);
  map.setZoom(_panto_zoom); 

}



/*

    socrata does not need this 

*/ 
async function zoom_to_esri_extent(bbox) {




    /*

        if  "wkid": 102100, "latestWkid": 3857,  already have projection-string, directly convert.
        convert from  "wkid": 102100, "latestWkid": 3857 (x,y),   to  wgs_84(lat,lng)

        otherwise,  like "latestWkid": 2230, must read 2230's projection-string from  
        website 'https://spatialreference.org/ref/epsg/2230/proj4js/"
        This link read:     Proj4js.defs["EPSG:2230"] = "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";

        use projection-string feed into pro4j  


        another way is use ESRI's on the fly projection


        bbox is extent
    
        "extent": {
                        "xmin": -2.0037507842788246E7,
                        "ymin": -3.024097145838615E7,
                        "xmax": 2.0037507842788246E7,
                        "ymax": 3.024097145838615E7,
                        "spatialReference": {



                        "wkid": 102100,                       // ESRI always available, can use https://gis.stackexchange.com/questions/278165/getting-lat-lng-from-wkid-latestwkid-and-x-y-coordinates
                                                              // https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project
                                                              // to get lat long on the fly


                        "latestWkid": 3857                    // EPSG sometime is missing, not be able to read projection-string from 'https://spatialreference.org/ref/epsg/2230/proj4js/"
                    }
    
    
    */

      var projection_method = 'default'    // default ( 3857 x,y   ---->    4326 wgs84 lat lng )

      var _________latestWkid
      var _________wkid

      // latestWkid exist, will use either default or  "read_proj_string".  
      if (bbox.spatialReference.latestWkid) {

                // latestWkid,

                                  _________latestWkid = bbox.spatialReference.latestWkid

                                  if (_________latestWkid == 3857 ) { 
                                                                                    projection_method = 'default' 
                                  } else {

                                             // if esri.wkid exist, this will be over-write to esri_proj later,  read_proj_string is not reliable, so use esri_proj if both available
                                              projection_method = 'read_proj_string'    // from 'https://spatialreference.org/ref/epsg/2230/proj4js/"

                                  } // 3857

      } // latestWkid


                
      // as long as esri wkid exist,  will either use default or esri_proj
      if (bbox.spatialReference.wkid) {


                      _________wkid = bbox.spatialReference.wkid


                      if (_________wkid == 102100 ){ 
                                projection_method = 'default' 
                      } else {

                                // this could over-write previous 'read_proj_string' , if latestWkid is not 3857
                                projection_method = 'esri_proj'   // get lat lng directly from  https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project
                      }

      } // wkid

          
     












      // test 3 way of projection, must comment out below code for production

      
            // enforce use esri projection by uncomment this line.
                        //console.log(' ------------------- test  ------------------- enforce  ------------------- use  ------------------- esri_proj  -------------------  ')
                        // projection_method = 'esri_proj'    // works well



            // enforce use read_proj_string by uncomment below 2 lines.
                      //console.log(' ------------------- test  ------------------- enforce  ------------------- use  ------------------- read_proj_string  -------------------  ')
                      //projection_method = 'read_proj_string'    // works well
                      











      console.log('esri  extent to lat lng === bbox',  bbox )


      

      var _south_west_point_long_lat_array = [bbox.xmin,    bbox.ymin]
      var _north_east_point_long_lat_array = [bbox.xmax,    bbox.ymax]

      console.log(' esri extent   _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
      console.log(' esri extent   _north_east_point_long_lat_array',  _north_east_point_long_lat_array )



      switch (projection_method) {



                        case 'default':  
                                            // 3857 to 4326

                                            // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                                            _south_west_point_long_lat_array = proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [bbox.xmin,    bbox.ymin]);
                                            _north_east_point_long_lat_array = proj4(target_projection_EPSG_3857, wgs84_EPSG_4326, [bbox.xmax,    bbox.ymax]);


                                            // or use esri client side projection
                                            







                                            console.log(' ---> default ---> 3857 ---> 4326  ---> proj4    _south_west_point_long_lat_array ----> ', _south_west_point_long_lat_array )
                                            console.log('  ---> default ---> 3857 ---> 4326  ---> proj4   _north_east_point_long_lat_array ----> ', _north_east_point_long_lat_array )
                                            fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
              

                                            break;




                        case 'read_proj_string':

                                                // non-(3857) always --- to --> 4326 , read proj string, feed in proj4


                                                // this server only work with jsonp, Does not work with cors
                                                // but jsonp will error as:  "Proj4js is not defined", because result string have "Proj4js.defs[....",  
                                                // I end up use proxy + cors 










                                                var _custom_projection_string_raw //  Proj4js.defs["EPSG:2230"] = "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";

                                                var _custom_projection_string     // +proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs;


                                                // --------- add proxy  ---------
                                                var _custom_projection_string_url = proxyurl +  'https://spatialreference.org/ref/epsg/' + _________latestWkid +'/proj4js/'

                                             
                                               


                                               

                                               

                                                      _custom_projection_string_raw =  await $.ajax({
              
                                                                                      // large data take long long time , so should not time out, let it run until get it
                                                                                      //timeout: _timeout,
              
                                                                                        type: 'GET',
                                                                                        //dataType: 'jsonp',
                                                                                        //data: {},
              
                                                                                        url:_custom_projection_string_url,
              
              
              
                                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                                          
                                                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                console.log('ajax error  + ', _error_status);
                                                                                                              
              
              
                                                                                        },
                                                                                        success: function (data) {
                                                                                          

                                                                                          
                                                                                        }
                                                                                       });  // await
                                                                                      
          

                                               
                                               console.log('_custom_projection_string_raw  --> ', _custom_projection_string_raw );

                                                                                                        /*                           
                                                                                                      
                                                                                                      _custom_projection_string sample:  (must remove unused parts)

                                                                                                            Proj4js.defs["EPSG:2230"] = "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs";



                                                                                                        */   

                                                                                                          
                                                                                                            // remove front part        Proj4js.defs["EPSG:2230"] = "
                                                                                                            _custom_projection_string = _custom_projection_string_raw.substring(_custom_projection_string_raw.indexOf('+proj='))

                                                                                                           // no need to remove last part       ";



                                               console.log('_custom_projection_string  --> ', _custom_projection_string );



                                                // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                                               _south_west_point_long_lat_array = proj4(_custom_projection_string, wgs84_EPSG_4326, [bbox.xmin,    bbox.ymin]);
                                               _north_east_point_long_lat_array = proj4(_custom_projection_string, wgs84_EPSG_4326, [bbox.xmax,    bbox.ymax]);


                                               console.log(' non-(3857) always --- to --> 4326 , read proj string, feed in proj4   _south_west_point_long_lat_array ----> ', projection_method,  _south_west_point_long_lat_array )
                                               console.log(' non-(3857) always --- to --> 4326 , read proj string, feed in proj4   _north_east_point_long_lat_array ----> ', projection_method,  _north_east_point_long_lat_array )
                                               fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)

                                           





                                                break;




                        case 'esri_proj':


                                           // non-(3857) always --- to --> 4326



                                           // in use, client side projection, very fast, no need await, fit bound must be inside require module

                                                    // some case, may not await,
                                                    esri_clientSide_projection(bbox)  
                                                       
                                                    
                                                    

                                                   
                                                    




                                          // not use, esri server side projection , very slow, due to ajax call, but works, must use await, because it has ajax call, 
                                                /*  
                                                      var _esri_serverSide_projection_result = await esri_serverSide_projection(bbox)

                                                      console.log('_esri_serverSide_projection_result', _esri_serverSide_projection_result)
                                                      _south_west_point_long_lat_array = _esri_serverSide_projection_result.SouthWest_min
                                                      _north_east_point_long_lat_array = _esri_serverSide_projection_result.NorthEast_max

                                                      console.log('  esri server projection  ---->  non-(3857)   always to --> 4326   _south_west_point_long_lat_array ----> ',   _south_west_point_long_lat_array )
                                                      console.log('  esri server projection  ---->  non-(3857)   always to --> 4326   _north_east_point_long_lat_array ----> ',   _north_east_point_long_lat_array )
                                                      fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)
                                                */





                                          break;





                          

                        default:
                          console.log(`Sorry, we are out of ${projection_method}.`);


      } // switch


      









        
  }







  function fit_bound_googlemaps(_southWest_lnglat_array, _northEast_lnglat_array){



   

    // https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
    var google_bounds = new google.maps.LatLngBounds(
                                                        

                                                          //  latlng class object ( lat, lng) order matters
                                                          new google.maps.LatLng(_southWest_lnglat_array[1], _southWest_lnglat_array[0]), 
                                                        

                                                          new google.maps.LatLng(_northEast_lnglat_array[1], _northEast_lnglat_array[0])
                                                          

                                                          /*  latlng literal works as well
                                                          {lat:_southWest_lnglat_array[1], lng: _southWest_lnglat_array[0]},
                                                          {lat:_northEast_lnglat_array[1], lng: _northEast_lnglat_array[0]}
                                                          */

                                                        
                                                    );

      map.fitBounds(google_bounds);

      

    var _c_e_n_t_e_r = map.getCenter()

   

    _center_lat  =  _c_e_n_t_e_r.lat()
    _center_long =  _c_e_n_t_e_r.lng()
    _center_zoom = parseInt(map.getZoom())

    console.log('  new center is - -> - - > : ', _center_lat, _center_long, _center_zoom )

  }





  

 



 // fit bound must inside require module
 function esri_clientSide_projection(extent_geometry){

  /*

                                  // also works at https://developers.arcgis.com/rest/services-reference/project.htm
                                  // var _projection_server_url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?';

                                  all 3 kind of extent works, just choose one of them  
                            
                                        "extent": {
                                            "xmin": 1440000,
                                            "ymin": 535000,
                                            "xmax": 1455000,
                                            "ymax": 550000,
                                            "spatialReference": {
                                                "wkid": 102719,
                                                "latestWkid": 2264
                                            }
                                        },



                                        "initialExtent": {
                                            "xmin": 1440000,
                                            "ymin": 535000,
                                            "xmax": 1455000,
                                            "ymax": 550000,
                                            "spatialReference": {
                                                "wkid": 102719,
                                                "latestWkid": 2264
                                            }
                                        },



                                        "fullExtent": {
                                            "xmin": 1440000,
                                            "ymin": 535000,
                                            "xmax": 1455000,
                                            "ymax": 550000,
                                            "spatialReference": {
                                                "wkid": 102719,
                                                "latestWkid": 2264
                                            }
                                        },
                                        

                                   
                            
                            */
                             
                           

                                       


                          
                                                  require([
                                                    "esri/geometry/SpatialReference",
                                                    "esri/geometry/projection",
                                                    "dojo/domReady!"
                                                  ], function (
                                                    SpatialReference, projection
                                                  ) {
                
                                                              /*

                                                                  fix bug projection do not have function isSupported()


                                                                    https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/introducing-the-client-side-projection-engine/

                                                                    https://developers.arcgis.com/javascript/3/jssamples/client_projection.html

                                                                    https://developers.arcgis.com/javascript/3/jsapi/esri.geometry.projection-amd.html
                                                              */

                                                                
                                                                    
                                                                    console.log('  - 1 - projection.isSupported() ', projection)



                                                            
                                                              // load the projection module
                                                              projection.load().then(function () {

                                                                            var outSpatialReference = new SpatialReference({
                                                                              wkid: 4326 //Sphere_Sinusoidal projection
                                                                            });


                                                                    try {


                                                                            // project an array of geometries to the specified output spatial reference
                                                                            var extent_projectedGeometries = projection.project(extent_geometry , outSpatialReference);
                                                                                console.log("extent_projectedGeometries", extent_projectedGeometries);


                                                                                var _xmin = extent_projectedGeometries.xmin;
                                                                                var _ymin = extent_projectedGeometries.ymin;
                                                                                var _xmax = extent_projectedGeometries.xmax;
                                                                                var _ymax = extent_projectedGeometries.ymax;
                                                                                
                                                                                



                                                                            // fit bound must inside require module 
                                                                               
  
  
                                                                                // not use pan to lat/lng
                                                                                /*
                                                                                        var _xmiddle = (_xmax - _xmin) / 2 + _xmin;
                                                                                        var _ymiddle = (_ymax - _ymin) / 2 + _ymin;
                                                                                        panto_googlemaps( _ymiddle, _xmiddle, _center_zoom )   
                                                                                */
                                               
                                              
                                                                                // in use, fit bound
                                                                                var _south_west_point_long_lat_array = [_xmin,    _ymin]
                                                                                var _north_east_point_long_lat_array = [_xmax,    _ymax]  

                                                                                console.log(' -- esri client side projection  --   _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
                                                                                console.log(' -- esri client side projection  --   _north_east_point_long_lat_array',  _north_east_point_long_lat_array )       
                                                                                fit_bound_googlemaps(_south_west_point_long_lat_array,  _north_east_point_long_lat_array)





                                                           



                                                                              } catch (projection_error) {

                                                                                console.log(" +++ client side projection failed, projection is not load   ",projection_error );

                                                                                
                                                                                  
                                                                                // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                                                                                 

                                                                                return;

                                                 
                                                                      }// catch
                                               



                                                            }); // load projectin module


                                                }); //require([



                                                
                  
 }









 // not use, but keep here,  esri server side projection , very slow, due to ajax call, but works, must use await, because it has ajax call, 
 async function esri_serverSide_projection(__bbox){



      var esriServerSideProj_result = { SouthWest_min : [],   NorthEast_max: []  }
                          
      



      var _________latestWkid
      var _________wkid

      // latestWkid exist, will use either default or  "read_proj_string".  
      if (__bbox.spatialReference.latestWkid) {

                // latestWkid,

                      _________latestWkid = __bbox.spatialReference.latestWkid

                                  

      } // latestWkid


                
      // as long as esri wkid exist,  will either use default or esri_proj
      if (__bbox.spatialReference.wkid) {


                      _________wkid = __bbox.spatialReference.wkid


                      

      } // wkid

                                          var __geometries_min = {
                                                                  "geometryType" : "esriGeometryPoint",
                                                                  "geometries" : [
                                                                    {
                                                                      "x" : __bbox.xmin, 
                                                                      "y" : __bbox.ymin
                                                                    }
                                                                  ]
                                                                }

                                          var __geometries_max = {
                                                                  "geometryType" : "esriGeometryPoint",
                                                                  "geometries" : [
                                                                    {
                                                                      "x" : __bbox.xmax, 
                                                                      "y" : __bbox.ymax
                                                                    }
                                                                  ]
                                                                }

      
                                          /* The difference between encodeURI and encodeURIComponent is encodeURIComponent encodes the entire string, 
                                                where encodeURI ignores protocol prefix ('http://') and domain name. 
                                                    encodeURIComponent is designed to encode everything, where encodeURI ignores a URL's domain related roots     
                                          */                
                                          __geometries_min = encodeURIComponent(JSON.stringify(__geometries_min))
                                          __geometries_max = encodeURIComponent(JSON.stringify(__geometries_max))


                                          var  _esri_proj_min_url =   'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?inSR=' + _________wkid    +  '&outSR=4326&geometries=' + __geometries_min + '&f=pjson';
                                          var  _esri_proj_max_url =   'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?inSR=' + _________wkid    +  '&outSR=4326&geometries=' + __geometries_max + '&f=pjson';


                                          var _esri_proj_min_result
                                          var _esri_proj_max_result



                                          // this esri server always use jsonp,   cors is not working.

                                              _esri_proj_min_result =  await $.ajax({
    
                                                                            // large data take long long time , so should not time out, let it run until get it
                                                                            //timeout: _timeout,
    
                                                                              type: 'GET',
                                                                              dataType: 'jsonp',
                                                                              data: {},
    
                                                                              url:_esri_proj_min_url,
    
    
    
                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                
                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                    
    
    
                                                                              },
                                                                              success: function (data) {
                                                                                console.log('_esri_proj_min_url --> jsonp success ', data );
                                                                                  
                                                                                  // note: data is already json type, you just specify dataType: jsonp
                                                                                  return data;
                                                                              }
                                                                            });  // await

                                    


                                              _esri_proj_max_result =  await $.ajax({

                                                                                      // large data take long long time , so should not time out, let it run until get it
                                                                                    // timeout: _timeout,


                                                                                        type: 'GET',
                                                                                        dataType: 'jsonp',
                                                                                        data: {},
                                                                                        
                                                                                        url:  _esri_proj_max_url,

                                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                                          
                                                                                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                console.log('ajax error  + ', _error_status);
                                                                                                              
                                                                
                                                                
                                                                                        },
                                                                                        success: function (data) {
                                                                                          console.log('_esri_proj_max_url  success  ',  data);
                                                                                            
                                                                                          
                                                                                          
                                                                                            return data;
                                                                                        }
                                                                                      });  // await



                                                  /*
                                                  
                                                  {
                                                      "geometryType" : "esriGeometryPoint", 
                                                      
                                                      "geometries" : 
                                                      [
                                                        {
                                                          "x" : -119.917091348023, 
                                                          "y" : 48.683789765927
                                                        }
                                                      ]
                                                    }

                                                  
                                                  */                                    

                                                                                      
                                                    esriServerSideProj_result.SouthWest_min = [ _esri_proj_min_result.geometries[0].x  ,   _esri_proj_min_result.geometries[0].y  ]

                                                    esriServerSideProj_result.NorthEast_max = [ _esri_proj_max_result.geometries[0].x  ,   _esri_proj_max_result.geometries[0].y  ]
                                    


                                                    return esriServerSideProj_result


 }










//  -------------------  end    -------------------  esri  ------------------- pan to real location  ------------------- 









//  - -- - google basemap  - -- -

    /* 
    xyz tiles
    https://gis.stackexchange.com/questions/370594/getting-bing-maps-to-display-in-qgis

    "Google Maps","","","","https://mt1.google.com/vt/lyrs=m&x=%7Bx%7D&y=%7By%7D&z=%7Bz%7D","","19","0"])
    "Google Satellite", "", "", "", "https://mt1.google.com/vt/lyrs=s&x=%7Bx%7D&y=%7By%7D&z=%7Bz%7D", "", "19", "0"])
    "Google Terrain", "", "", "", "https://mt1.google.com/vt/lyrs=t&x=%7Bx%7D&y=%7By%7D&z=%7Bz%7D", "", "19", "0"])
    "Google Terrain Hybrid", "", "", "", "https://mt1.google.com/vt/lyrs=p&x=%7Bx%7D&y=%7By%7D&z=%7Bz%7D", "", "19", "0"])
    "Google Satellite Hybrid", "", "", "", "https://mt1.google.com/vt/lyrs=y&x=%7Bx%7D&y=%7By%7D&z=%7Bz%7D", "", "19", "0"])

    "Stamen Terrain", "", "", "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL", "http://tile.stamen.com/terrain/{z}/{x}/{y}.png", "", "20", "0"])
    "Stamen Toner", "", "", "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL", "http://tile.stamen.com/toner/{z}/{x}/{y}.png", "", "20", "0"])
    "Stamen Toner Light", "", "", "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL", "http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png", "", "20", "0"])
    "Stamen Watercolor", "", "", "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL", "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg", "", "18", "0"])

    "Wikimedia Map", "", "", "OpenStreetMap contributors, under ODbL", "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png", "", "20", "1"])
    "Wikimedia Hike Bike Map", "", "", "OpenStreetMap contributors, under ODbL", "http://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png", "", "17", "1"])




    "Esri Boundaries Places", "", "", "", "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", "", "20", "0"])
    "Esri Gray (dark)", "", "", "", "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", "", "16", "0"])
    "Esri Gray (light)", "", "", "", "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", "", "16", "0"])
    "Esri National Geographic", "", "", "", "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}", "", "12", "0"])
    "Esri Ocean", "", "", "", "https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", "", "10", "0"])
    "Esri Satellite", "", "", "", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", "", "17", "0"])
    "Esri Standard", "", "", "", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", "", "17", "0"])
    "Esri Terrain", "", "", "", "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}", "", "13", "0"])
    "Esri Transportation", "", "", "", "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}", "", "20", "0"])
    "Esri Topo World", "", "", "", "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", "", "20", "0"])
    Esri Topo World reference https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}

    "OpenStreetMap Standard", "", "", "OpenStreetMap contributors, CC-BY-SA", "http://tile.openstreetmap.org/{z}/{x}/{y}.png", "", "19", "0"])
    "OpenStreetMap H.O.T.", "", "", "OpenStreetMap contributors, CC-BY-SA", "http://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", "", "19", "0"])
    "OpenStreetMap Monochrome", "", "", "OpenStreetMap contributors, CC-BY-SA", "http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", "", "19", "0"])

    "OpenTopoMap", "", "", "Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)", "https://tile.opentopomap.org/{z}/{x}/{y}.png", "", "17", "1"])

    "Strava All", "", "", "OpenStreetMap contributors, CC-BY-SA", "https://heatmap-external-b.strava.com/tiles/all/bluered/{z}/{x}/{y}.png", "", "15", "0"])
    "Strava Run", "", "", "OpenStreetMap contributors, CC-BY-SA", "https://heatmap-external-b.strava.com/tiles/run/bluered/{z}/{x}/{y}.png?v=19", "", "15", "0"])

    "Open Weather Map Temperature", "", "", "Map tiles by OpenWeatherMap, under CC BY-SA 4.0", "http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?APPID=1c3e4ef8e25596946ee1f3846b53218a", "", "19", "0"])
    "Open Weather Map Clouds", "", "", "Map tiles by OpenWeatherMap, under CC BY-SA 4.0", "http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?APPID=ef3c5137f6c31db50c4c6f1ce4e7e9dd", "", "19", "0"])
    "Open Weather Map Wind Speed", "", "", "Map tiles by OpenWeatherMap, under CC BY-SA 4.0", "http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?APPID=f9d0069aa69438d52276ae25c1ee9893", "", "19", "0"])

    "CartoDb Dark Matter", "", "", "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.", "http://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", "", "20", "0"])
    "CartoDb Positron", "", "", "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.", "http://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", "", "20", "0"])

    "Bing VirtualEarth", "", "", "", "http://ecn.t3.tiles.virtualearth.net/tiles/a{q}.jpeg?g=1", "", "19", "1"])

    */

    var google_map_type_id = 'hybrid'  // display name : google-hybrid 
    // sample https://developers.google.com/maps/documentation/javascript/examples/maptype-base#maps_maptype_base-javascript
    


    // default is radio-option-div, outside of map 
    function init_google_base_map(){

      create_add_map_type()

      // default always to top 2, the others will add after
      // these will be used a base map radio display text
      var google_map_type_array = [
              'hybrid',  // google-hybrid  
              'roadmap', // google-road
              
              'microsoft-hybrid', 
              'microsoft-road',

              'here-hybrid',
              'here-road', 
                      
              'esri-hybrid', 
              'esri-road',

              //'nearmap', // uncomment to add back

              'mapbox-hybrid',
              'mapbox-road',
                        
              'open-street-map'
            ]


      var radio_basemap_html = ''
      radio_basemap_html += "<fieldset>"
      radio_basemap_html += "      <legend>Change Background Map</legend>"

      var google_map_type_display_name
      for (let i = 0; i < google_map_type_array.length; i++) {
        console.log("google map type array ", google_map_type_array[i]); 

        switch (google_map_type_array[i]) {

          case 'hybrid':
            google_map_type_display_name = 'google-hybrid'
            break;

          case 'roadmap':
            google_map_type_display_name = 'google-road'
            break;
         
          default:
            google_map_type_display_name = google_map_type_array[i]
        }



        // value use original name
        radio_basemap_html += '<input name="basemap_radio" type="radio"  value="' + google_map_type_array[i] + '"/>'
        // display name might changed 
        radio_basemap_html += '<span>' + google_map_type_display_name + '</span>'
        radio_basemap_html += '&nbsp;&nbsp;'

      }//for
      radio_basemap_html += "</fieldset>"
      $("#radio-basemap-id").html(radio_basemap_html)



      //add event to radio
      urlParams = new URLSearchParams(window.location.search);
      var param_google_map_type_id = urlParams.get('googleMapType'); 
      if (param_google_map_type_id){
        google_map_type_id = param_google_map_type_id
      }//if
      
      // first time set radio
      $("input[type=radio][name='basemap_radio'][value=" + google_map_type_id + "]").prop('checked', true);
      // 1 time, 1st time set base map
      // set google map type https://developers.google.com/maps/documentation/javascript/reference/map#Map
      // directly set google map type is not working, error is 'set' is not a function
      //map.mapTypes = google_map_type_id
      // Instead, working, warning: mapId(required by advanced marker), warning, map style controlled by cloud console.
      map.setOptions({
                mapTypeId: google_map_type_id,

               
      })// s e t o p t i o n


      // radio change event
      $("input[type='radio'][name='basemap_radio']").change(function(){
        google_map_type_id = $("input[type='radio'][name='basemap_radio']:checked").val();
        console.log(" google_map_type_id : --  ", google_map_type_id);
        update_url_parameter('googleMapType', google_map_type_id);
        // set google map type https://developers.google.com/maps/documentation/javascript/reference/map#Map
        // directly set google map type is not working, error is 'set' is not a function
        //map.mapTypes = google_map_type_id
        // Instead, working, warning: mapId(required by advanced marker), warning, map style controlled by cloud console.
        map.setOptions({
                mapTypeId: google_map_type_id,

               
        })// s e t o p t i o n

      });// input radio
      // . . - -  end    . . - -   add event to radio  . . - - 


    }


    // on-map-control
    function init_google_base_map_withOnMapControl(){


      create_add_map_type()


      // this will overwrite the previous default map option in common-share.js
      map.setOptions({


                mapTypeControl:true,
                
                // set default base map, always satellite, 
                mapTypeId: 'hybrid', //'open-street-map-id',

                // set initial default vaule,  only google map can have street view control, other map, should hide street view control
                streetViewControl: true,

                mapTypeControlOptions: {
                    // TOP_RIGHT, not work, placed outside of map,  due to our css, map div only half of width, 
                    position: google.maps.ControlPosition.RIGHT_TOP,  //  BOTTOM_CENTER,
                 

                    // Basic Map Types
                    //https://developers.google.com/maps/documentation/javascript/examples/maptype-base
                    mapTypeIds: [
                      'hybrid', 
                      'roadmap',

                      'microsoft-hybrid', 
                      'microsoft-road',

                      'here-hybrid',
                      'here-road', 
                              
                      'esri-hybrid', 
                      'esri-road',

                      'nearmap',

                      'mapbox-hybrid',
                      'mapbox-road',
                                
                      'open-street-map'
                    ],

                    // 3 options https://developers.google.com/maps/documentation/javascript/reference/control
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    //style: google.maps.MapTypeControlStyle.DEFAULT
                    //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                }
                
      })// s e t o p t i o n



      // make sure only google map has street view control on, 
      map.addListener('maptypeid_changed', function() {

                var current_map_type_id = map.getMapTypeId()

                var showStreetViewControl = false;

                switch (current_map_type_id) {
                  case 'hybrid':
                  case 'roadmap':
                    showStreetViewControl = true;
                    break;
                  
                  default:
                    showStreetViewControl = false;
                }
                        
                map.setOptions({
                  streetViewControl: showStreetViewControl
                });
      });

          

    }


    function create_add_map_type(){



      /**/
        // . . . . esri hybrid  . . . .

        //esri hybrid has 2 layers.  https://developers.arcgis.com/javascript/3/jsapi/esri.basemaps-amd.html#hybrid
        //The World Imagery with Labels map is a detailed imagery map layer and labels that is designed to be used as a basemap for various maps and applications. It contains:
        //https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer
        //https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer
      

        function EsriHybrid_MapType(tileSize) {
          this.tileSize = tileSize;
        }

        EsriHybrid_MapType.prototype.maxZoom = 20;
        EsriHybrid_MapType.prototype.name = 'Esri-Hybrid';
        EsriHybrid_MapType.prototype.alt = 'Esri Hybrid';

        EsriHybrid_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

          // ESRI    /zoom level/row/column  should be  zoom/y/x  

              // satellite no label only
              // both works 1
              // https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
              var satellite_no_label_tile_url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/' + zoom + '/' + coord.y + '/' + coord.x 
              // both works 2
              // https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/4/3/8/
              //var tile_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/' + zoom + '/' + coord.y + '/' + coord.x 

             
              var _width = this.tileSize.width + 'px';
              var _height = this.tileSize.height + 'px';

              var x = document.createElement("IMG");
                x.setAttribute("src", satellite_no_label_tile_url);
                x.setAttribute("width", _width);
                x.setAttribute("height", _height);
                x.setAttribute("alt", "tile");
               x.setAttribute("class", "overlap-image");



              // reference label layer 
              // https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
              var reference_label_tile_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/' + zoom + '/' + coord.y + '/' + coord.x 
              // esri raster label and imagery are seperated,   
              // how to overlap 2 image https://stackoverflow.com/questions/48361900/how-do-i-overlap-two-images-in-one-div
              
               
               var x2 = document.createElement("IMG");
                x2.setAttribute("src", reference_label_tile_url);
                x2.setAttribute("width", _width);
                x2.setAttribute("height", _height);
                x2.setAttribute("alt", "tile");
               x2.setAttribute("class", "overlap-image");
               
               
            var container_for2overlap_image = document.createElement("div");
            container_for2overlap_image.setAttribute("class", "container-for2overlap-image");
            container_for2overlap_image.append(x,x2)

          
          return container_for2overlap_image;
        
        };

        // Now attach the coordinate map type to the map's registry.
        map.mapTypes.set('esri-hybrid',  new EsriHybrid_MapType(new google.maps.Size(256,256)));






          function EsriRoad_MapType(tileSize) {
            this.tileSize = tileSize;
          }
      
          EsriRoad_MapType.prototype.maxZoom = 20;
          EsriRoad_MapType.prototype.name = 'Esri-Road';
          EsriRoad_MapType.prototype.alt = 'Esri Street';
      
          EsriRoad_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {
      
          
            // ESRI    /zoom level/row/column  should be  zoom/y/x  
      
            
            // https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}
            var tile_url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/' + zoom + '/' + coord.y + '/' + coord.x 
            
            
            var _width = this.tileSize.width + 'px';
            var _height = this.tileSize.height + 'px';
          
            var x = document.createElement("IMG");
              x.setAttribute("src", tile_url);
              x.setAttribute("width", _width);
              x.setAttribute("height", _height);
              x.setAttribute("alt", "tile");
            // console.log(' overlapped tile image element ', x)
                return x;
          };
      
            // Now attach the coordinate map type to the map's registry.
            map.mapTypes.set('esri-road',  new EsriRoad_MapType(new google.maps.Size(256,256)));



          
          
    // . . .     . . .     end  . . .    . . .  . . . . esri hybrid  . . . .
    /**/



        // . . . . bing map hybrid  . . . .
        // Bing Maps tiles https://learn.microsoft.com/en-us/bingmaps/rest-services/directly-accessing-the-bing-maps-tiles

      // convert zoom,x,y to quadkeys https://learn.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system 
      // this sample has error, never use digit +=2 https://www.here.com/docs/bundle/traffic-api-developer-guide-v6/page/topics/quadkeys.html
      function tileXYToQuadKey(xTile, yTile, z) {
        var quadKey = "";
        for (var i = z; i > 0; i--) {
          var digit = "0",
          mask = 1 << (i - 1);
          if ((xTile & mask) != 0) {
            digit++;
          }
          
          if ((yTile & mask) != 0) {
            digit++;  
            digit++;   
          }
          quadKey += digit;
        } // for i return quadKey; 
      
        return quadKey;
      }







    // . . .  . . .  . . . . bing map hybrid  . . . .
      function BingMapHybrid_MapType(tileSize) {
          this.tileSize = tileSize;
      }

      BingMapHybrid_MapType.prototype.maxZoom = 20;
      BingMapHybrid_MapType.prototype.name = 'MicroSoft-H';
      BingMapHybrid_MapType.prototype.alt = 'Microsoft Hybrid';

      BingMapHybrid_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {


          // not use, bing map, satellite no label  https://t0.tiles.virtualearth.net/tiles/a{q}.jpeg?g=685&mkt=en-us&n=z
          // var tile_url = 'https://t0.tiles.virtualearth.net/tiles/a' + tileXYToQuadKey(coord.x, coord.y, zoom) + '.jpeg?g=685&mkt=en-us&n=z'
          // satellite no label http://ecn.t3.tiles.virtualearth.net/tiles/a{q}.jpeg?g=0&dir=dir_n
          // var tile_url = 'http://ecn.t3.tiles.virtualearth.net/tiles/a' + tileXYToQuadKey(coord.x, coord.y, zoom) + '.jpeg?g=0&dir=dir_n'
          // satellite no label      http://ecn.t3.tiles.virtualearth.net/tiles/a{q}.jpeg?g=1
          //var tile_url = 'http://ecn.t3.tiles.virtualearth.net/tiles/a' + tileXYToQuadKey(coord.x, coord.y, zoom) + '.jpeg?g=1'


          // in use, azure map need key authorize 
          // must add subscription-key https://learn.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication
          // https://atlas.microsoft.com/map/tile?api-version=2024-04-01&tilesetId={tilesetId}&zoom={zoom}&x={x}&y={y}
          // https://atlas.microsoft.com/map/tile?subscription-key={Your-Azure-Maps-Subscription-key}&api-version=2024-04-01&tilesetId=microsoft.base.road&zoom=15&x=5236&y=12665&tileSize=256
          
          
          // only for imagery, without label
          var tile_url = 'https://atlas.microsoft.com/map/tile?'
          tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          //tile_url +=  '&tilesetId=' + 'microsoft.terra.main'
          tile_url +=  '&tilesetId=' + 'microsoft.imagery'  // no label
          //tile_url +=  '&tilesetId=' + 'microsoft.base.darkgrey'   // no imagery
          //tile_url +=  '&tilesetId=' + 'microsoft.base.hybrid.darkgrey'
          tile_url +=  '&zoom=' + zoom + '&x=' + coord.x + '&y=' + coord.y 
          tile_url +=  '&tileSize=256'
            
          var _width = this.tileSize.width + 'px';
          var _height = this.tileSize.height + 'px';
        
          var x = document.createElement("IMG");
            x.setAttribute("src", tile_url);
            x.setAttribute("width", _width);
            x.setAttribute("height", _height);
            x.setAttribute("alt", "tile");
            x.setAttribute("class", "overlap-image");
            




          // microsoft raster label and imagery are seperated,   hybrid is only available as vector, not available as raster. 
          // how to overlap 2 image https://stackoverflow.com/questions/48361900/how-do-i-overlap-two-images-in-one-div


           // only for label, without  imagery
          var label_tile_url = 'https://atlas.microsoft.com/map/tile?'
          label_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          label_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          //label_tile_url +=  '&tilesetId=' + 'microsoft.base.road'  // not transparent, not use
          //label_tile_url +=  '&tilesetId=' + 'microsoft.base.hybrid.road'   
          label_tile_url +=  '&tilesetId=' + 'microsoft.base.labels.road'
          label_tile_url +=  '&zoom=' + zoom + '&x=' + coord.x + '&y=' + coord.y 
          label_tile_url +=  '&tileSize=256'

          var x2 = document.createElement("IMG");
            x2.setAttribute("src", label_tile_url);
            x2.setAttribute("width", _width);
            x2.setAttribute("height", _height);
            x2.setAttribute("alt", "tile");
            x2.setAttribute("class", "overlap-image");



            var container_for2overlap_image = document.createElement("div");
            container_for2overlap_image.setAttribute("class", "container-for2overlap-image");
            container_for2overlap_image.append(x,x2)

          
          return container_for2overlap_image;
      };

      // Now attach the coordinate map type to the map's registry.
       map.mapTypes.set('microsoft-hybrid',  new BingMapHybrid_MapType(new google.maps.Size(256,256)));
          
    // . . .     . . .     end  . . .    . . .  . . . . bing map hybrid  . . . .






    


    // ----- bing road    ----- 
      function BingMapRoad_MapType(tileSize) {
        this.tileSize = tileSize;
      }

      BingMapRoad_MapType.prototype.maxZoom = 20;
      BingMapRoad_MapType.prototype.name = 'MicroSoft-R';
      BingMapRoad_MapType.prototype.alt = 'Microsoft Road';

      BingMapRoad_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

      
        // not use, bing map, Bing map road with label http://ecn.dynamic.t0.tiles.virtualearth.net/comp/CompositionHandler/{q}?mkt=en-us&it=G,VE,BX,L,LA&shading=hill
        //var tile_url = 'http://ecn.dynamic.t0.tiles.virtualearth.net/comp/CompositionHandler/' + tileXYToQuadKey(coord.x, coord.y, zoom) + '?mkt=en-us&it=G,VE,BX,L,LA&shading=hill'

          // in use, azure map need key authorize 
          // must add subscription-key https://learn.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication
          // https://atlas.microsoft.com/map/tile?api-version=2024-04-01&tilesetId={tilesetId}&zoom={zoom}&x={x}&y={y}
          // https://atlas.microsoft.com/map/tile?subscription-key={Your-Azure-Maps-Subscription-key}&api-version=2024-04-01&tilesetId=microsoft.base.road&zoom=15&x=5236&y=12665&tileSize=256
          
          // road with label
          var tile_url = 'https://atlas.microsoft.com/map/tile?'
          tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          
          tile_url +=  '&tilesetId=' + 'microsoft.base.road'  
          //tile_url +=  '&tilesetId=' + 'microsoft.base.hybrid.road'   // no imagery
          //tile_url +=  '&tilesetId=' + 'microsoft.base.hybrid.darkgrey'

          tile_url +=  '&zoom=' + zoom + '&x=' + coord.x + '&y=' + coord.y 
          tile_url +=  '&tileSize=256'
        

        
        var _width = this.tileSize.width + 'px';
        var _height = this.tileSize.height + 'px';
      
        var x = document.createElement("IMG");
          x.setAttribute("src", tile_url);
          x.setAttribute("width", _width);
          x.setAttribute("height", _height);
          x.setAttribute("alt", "tile");
        
          // console.log(' overlapped tile image element ', x)
          return x;
      };

      // Now attach the coordinate map type to the map's registry.
      map.mapTypes.set('microsoft-road',  new BingMapRoad_MapType(new google.maps.Size(256,256)));
    //    -----  end ----- bing road    ----- 






      /**/
        // . . . . here map hybrid  . . . .

        function HereMapHybrid_MapType(tileSize) {
          this.tileSize = tileSize;
        }

        HereMapHybrid_MapType.prototype.maxZoom = 20;
        HereMapHybrid_MapType.prototype.name = 'Here-Hybrid';
        HereMapHybrid_MapType.prototype.alt = 'Here-Hybrid';

        HereMapHybrid_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

        
          // ESRI    /zoom level/row/column  should be  zoom/y/x
          //var tile_url = _maptile_url + '/' +zoom+ '/' + coord.y + '/' + coord.x

          // here map  /zoom/x/y,   "https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/jpeg?style=explore.satellite.day&apiKey=" + heremap_api_key 
          var tile_url = 'https://maps.hereapi.com/v3/base/mc/' +zoom+ '/' +coord.x + '/' +coord.y + '/jpeg?style=explore.satellite.day&apiKey=' + heremap_api_key 

          var _width = this.tileSize.width + 'px';
          var _height = this.tileSize.height + 'px';
        
          var x = document.createElement("IMG");
            x.setAttribute("src", tile_url);
            x.setAttribute("width", _width);
            x.setAttribute("height", _height);
            x.setAttribute("alt", "tile");
          // console.log(' overlapped tile image element ', x)
                return x;
        };

          // Now attach the coordinate map type to the map's registry.
          map.mapTypes.set('here-hybrid',  new HereMapHybrid_MapType(new google.maps.Size(256,256)));





          function HereMapRoad_MapType(tileSize) {
            this.tileSize = tileSize;
          }
      
          HereMapRoad_MapType.prototype.maxZoom = 20;
          HereMapRoad_MapType.prototype.name = 'Here-Road';
          HereMapRoad_MapType.prototype.alt = 'Here-Road';
      
          HereMapRoad_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {
      
          
            // ESRI    /zoom level/row/column  should be  zoom/y/x
            //var tile_url = _maptile_url + '/' +zoom+ '/' + coord.y + '/' + coord.x
      
            // here map  /zoom/x/y,   "https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/jpeg?style=explore.day&apiKey=" + heremap_api_key
            var tile_url = 'https://maps.hereapi.com/v3/base/mc/' +zoom+ '/' +coord.x + '/' +coord.y + '/jpeg?style=explore.day&apiKey=' + heremap_api_key 
      
            var _width = this.tileSize.width + 'px';
            var _height = this.tileSize.height + 'px';
          
            var x = document.createElement("IMG");
              x.setAttribute("src", tile_url);
              x.setAttribute("width", _width);
              x.setAttribute("height", _height);
              x.setAttribute("alt", "tile");
            // console.log(' overlapped tile image element ', x)
                return x;
          };
      
            // Now attach the coordinate map type to the map's registry.
            map.mapTypes.set('here-road',  new HereMapRoad_MapType(new google.maps.Size(256,256)));
          
    // . . .     . . .     end  . . .    . . .  . . . . here map hybrid  . . . .
    /**/




    // works, but not use, keep here
        // . . . .nearmap  . . . .

        function nearmap_MapType(tileSize) {
          this.tileSize = tileSize;
        }

        nearmap_MapType.prototype.maxZoom = 23;
        nearmap_MapType.prototype.name = 'NearMap';
        nearmap_MapType.prototype.alt = 'NearMap';

        nearmap_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

        
          // ESRI    /zoom level/row/column  should be  zoom/y/x
          //var tile_url = _maptile_url + '/' +zoom+ '/' + coord.y + '/' + coord.x

          // nearmap  /zoom/x/y,   "https://api.nearmap.com/tiles/v3/Vert/{level}/{col}/{row}.img?apikey=" + nearmap_api_key
      
          var tile_url = 'https://api.nearmap.com/tiles/v3/Vert/' + zoom + '/' + coord.x + '/' + coord.y + '.img?apikey=' + nearmap_api_key

          var _width = this.tileSize.width + 'px';
          var _height = this.tileSize.height + 'px';
        
          var x = document.createElement("IMG");
            x.setAttribute("src", tile_url);
            x.setAttribute("width", _width);
            x.setAttribute("height", _height);
            x.setAttribute("alt", "tile");
          // console.log(' overlapped tile image element ', x)
          return x;
        };

          // Now attach the coordinate map type to the map's registry.
          map.mapTypes.set('nearmap',  new nearmap_MapType(new google.maps.Size(256,256)));
          
    // . . .     . . .     end  . . .    . . .  . . . . nearmap  . . . .
    //




    /**/
        // . . . .mapbox  . . . .




        // mapbox xyz tile  https://stackoverflow.com/questions/58846393/how-to-apply-api-key-to-google-maps-tile-server-url
        // xyz tile url format https://docs.mapbox.com/api/maps/vector-tiles/
        // raster tile format https://docs.mapbox.com/api/maps/raster-tiles/  

      
        function mapboxSatellite_MapType(tileSize) {
          this.tileSize = tileSize;
        }

        mapboxSatellite_MapType.prototype.maxZoom = 23;
        mapboxSatellite_MapType.prototype.name = 'Mapbox-H';
        mapboxSatellite_MapType.prototype.alt = 'Mapbox Hybrid';

        mapboxSatellite_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

        
          // Static Tiles API  https://docs.mapbox.com/api/maps/static-tiles/  
          //The default is 512×512 pixels  https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{tilesize}/{z}/{x}/{y}{@2x}
          // works, no label
          // var tile_url = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/' + zoom + '/' + coord.x + '/' + coord.y + '?access_token=' + mapbox_api_key

          //hybrid,  with label, it is here https://docs.mapbox.com/api/maps/styles/#mapbox-styles
          var tile_url = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/' + zoom + '/' + coord.x + '/' + coord.y + '?access_token=' + mapbox_api_key
          
          var _width = this.tileSize.width + 'px';
          var _height = this.tileSize.height + 'px';
        
          var x = document.createElement("IMG");
            x.setAttribute("src", tile_url);
            x.setAttribute("width", _width);
            x.setAttribute("height", _height);
            x.setAttribute("alt", "tile");
          // console.log(' overlapped tile image element ', x)
          return x;
        };

          // Now attach the coordinate map type to the map's registry.
          map.mapTypes.set('mapbox-hybrid',  new mapboxSatellite_MapType(new google.maps.Size(256,256)));






          
        function mapboxStreets_MapType(tileSize) {
          this.tileSize = tileSize;
        }

        mapboxStreets_MapType.prototype.maxZoom = 23;
        mapboxStreets_MapType.prototype.name = 'Mapbox-R';
        mapboxStreets_MapType.prototype.alt = 'Mapbox-Road';

        mapboxStreets_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

        

          // street
          // mapbox  Raster Tiles API  
          // https://docs.mapbox.com/api/maps/raster-tiles/
          // "https://api.mapbox.com/v4/{tileset_id}/{zoom}/{x}/{y}.{format}?access_token=" + mapbox_api_key
          // https://api.mapbox.com/v4/{tileset_id}/{zoom}/{x}/{y}{@2x}.{format}?access_token=xxxxxxx
          // not use, too busy
          //var tile_url = 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/' + zoom + '/' + coord.x + '/' + coord.y + '.png?access_token=' + mapbox_api_key
          var tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/' + zoom + '/' + coord.x + '/' + coord.y + '?access_token=' + mapbox_api_key
          

          
          var _width = this.tileSize.width + 'px';
          var _height = this.tileSize.height + 'px';
        
          var x = document.createElement("IMG");
            x.setAttribute("src", tile_url);
            x.setAttribute("width", _width);
            x.setAttribute("height", _height);
            x.setAttribute("alt", "tile");
          // console.log(' overlapped tile image element ', x)
          return x;
        };

          // Now attach the coordinate map type to the map's registry.
          map.mapTypes.set('mapbox-road',  new mapboxStreets_MapType(new google.maps.Size(256,256)));








          
    // . . .     . . .     end  . . .    . . .  . . . . mapbox  . . . .
    /**/




        /**/
        // . . . . open street map  . . . .

              function OpenStreetMap_MapType(tileSize) {
                this.tileSize = tileSize;
              }

              OpenStreetMap_MapType.prototype.maxZoom = 19;
              OpenStreetMap_MapType.prototype.name = 'OpenStreet';
              OpenStreetMap_MapType.prototype.alt = 'Open Street Map';

              OpenStreetMap_MapType.prototype.getTile = function(coord, zoom, ownerDocument) {

              
                // ESRI    /zoom level/row/column  should be  zoom/y/x
                //var tile_url = _maptile_url + '/' +zoom+ '/' + coord.y + '/' + coord.x

                // openstreet map  /zoom/x/y,   "http://tile.openstreetmap.org/{z}/{x}/{y}.png" 
                var tile_url = 'https://tile.openstreetmap.org/' +zoom+ '/' +coord.x + '/' +coord.y + '.png'

                var _width = this.tileSize.width + 'px';
                var _height = this.tileSize.height + 'px';
              
                var x = document.createElement("IMG");
                  x.setAttribute("src", tile_url);
                  x.setAttribute("width", _width);
                  x.setAttribute("height", _height);
                  x.setAttribute("alt", "tile");
                // console.log(' overlapped tile image element ', x)
                return x;
              };

                // Now attach the coordinate map type to the map's registry.
                map.mapTypes.set('open-street-map',  new OpenStreetMap_MapType(new google.maps.Size(256,256)));
                
        // . . .     . . .     end  . . .    . . .  . . . . open street map  . . . .
        /**/

    } // end add map type


//  - -- - end   - -- - google basemap  - -- -









                    var _featurelayerJSON;
                    var _feature_attributes
                    var featurelayer_geometrytype // esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
                    async function get_feature_attributes(layerID){


                             



                              // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
                              // layer_id is 333, 
                                  var _url_layer = _url + '/'+  layerID + '?f=pjson'

                                  

                                console.log('get feature attributes url layer -layerID-:',layerID, _url_layer)

                                
                               
                                
                                
                                
                                try {


                                        // test only
                                        // throw ' ++++++++ test only ++++++++ jsonp failed';


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

                                                      



                                                        // test only
                                                        // throw ' ++++++++ test only ++++++++ cors failed'; 
                                        
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

                                




                                      // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
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
       
                                               if (_featurelayerJSON.advancedQueryCapabilities){
       
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


                                                              if (_featurelayerJSON.geometryType){
                                                                    featurelayer_geometrytype = _featurelayerJSON.geometryType
                                                              } else {
                                                                    featurelayer_geometrytype = ''
                                                              }
                     









                              // warning:  .fields can be null, if layer is only raster image  
                              if (_featurelayerJSON.fields) {

                                      _feature_attributes = _featurelayerJSON.fields
                                              
                                      var arrayLength = _feature_attributes.length;

                                      for (var i = 0; i < arrayLength; i++) {
                                               
                                              var ____fieldAlias = _feature_attributes[i].alias
                                              var ____fieldType = _feature_attributes[i].type
                                              var ____fieldName = _feature_attributes[i].name
                                              var ____fieldName_lowerCase  = ____fieldName.toLowerCase();
                                              var ____fieldType_lowerCase  = ____fieldType.toLowerCase();
                                              var ____fieldAlias_lowerCase  = ____fieldAlias.toLowerCase();
                                              

                                              
                                                                                              

                                              /*
                                                              
                                                                        A string defining the field type. Available values include: 

                                                                              esriFieldTypeString

                                                                              esriFieldTypeDouble | esriFieldTypeInteger | esriFieldTypeSmallInteger

                                                                              esriFieldTypeDate

                                                                              esriFieldTypeGeometry 

                                                                              esriFieldTypeOID | esriFieldTypeGlobalID | esriFieldTypeGUID  

                                                                              esriFieldTypeRaster 

                                                                              esriFieldTypeSingle  

                                                                              esriFieldTypeBlob 

                                                                              esriFieldTypeXML

                                                                      https://developers.arcgis.com/documentation/common-data-types/field.htm


                                                                                                0: {name: "Shape", type: "esriFieldTypeGeometry", alias: "Shape", domain: null}
                                                                                                1: {name: "ZoneCode", type: "esriFieldTypeString", alias: "ZoneCode", length: 3, domain: null}
                                                                                                2: {name: "ZoneName", type: "esriFieldTypeString", alias: "ZoneName", length: 254, domain: null}
                                                                                                3: {name: "Shape_Leng", type: "esriFieldTypeDouble", alias: "Shape_Leng", domain: null}
                                                                                                4: {name: "CityName", type: "esriFieldTypeString", alias: "CityName", length: 254, domain: null}
                                                                                                5: {name: "Shape_Area", type: "esriFieldTypeDouble", alias: "Shape_Area", domain: null}
                                                                                                6: {name: "Shape_Le_1", type: "esriFieldTypeDouble", alias: "Shape_Le_1", domain: null}
                                                                                                7: {name: "OBJECTID", type: "esriFieldTypeOID", alias: "OBJECTID", domain: null}
                                                                                                8: {name: "Shape_Length", type: "esriFieldTypeDouble", alias: "Shape_Length", domain: null}

                                              */

                                                                                                
                                              if     (
                                                                                                      
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

                                                                                    

                                                      ) 
                                              { 

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
                                                          
                                                            } else if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ){

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

                              }




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


                    
                          


                    } 





                                                  
                    // only for feature table, no legend, no spatial reference, it is reduced from regular original same name function 
                    async function get_feature_attributes_onlyForFeatureTable(layerID){

  

                      // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333?f=pjson
                      // layer_id is 333, 
                          var _url_layer = _url + '/'+  layerID + '?f=pjson'

                        console.log('get feature attributes url layer -layerID-:',layerID, _url_layer)

                        
                        
                        
                        
                        
                        try {


                                // test only
                                // throw ' ++++++++ test only ++++++++ jsonp failed';


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

                                              



                                                // test only
                                                // throw ' ++++++++ test only ++++++++ cors failed'; 
                                
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

                        




                              // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
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
       
                                               if (_featurelayerJSON.advancedQueryCapabilities){
       
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


                                                              if (_featurelayerJSON.geometryType){
                                                                    featurelayer_geometrytype = _featurelayerJSON.geometryType
                                                              } else {
                                                                    featurelayer_geometrytype = ''
                                                              }
                     





                     






                      // warning:  .fields can be null, if layer is only raster image  
                      if (_featurelayerJSON.fields) {

                              _feature_attributes = _featurelayerJSON.fields
                                      
                              var arrayLength = _feature_attributes.length;

                              for (var i = 0; i < arrayLength; i++) {
                                                    
                                      var ____fieldAlias = _feature_attributes[i].alias
                                      var ____fieldType = _feature_attributes[i].type
                                      var ____fieldName = _feature_attributes[i].name
                                      var ____fieldName_lowerCase  = ____fieldName.toLowerCase();
                                      var ____fieldType_lowerCase  = ____fieldType.toLowerCase();
                                      var ____fieldAlias_lowerCase  = ____fieldAlias.toLowerCase();
                                      

                                      
                                                                                      

                                      /*
                                                      
                                                                A string defining the field type. Available values include: 

                                                                      esriFieldTypeString

                                                                      esriFieldTypeDouble | esriFieldTypeInteger | esriFieldTypeSmallInteger

                                                                      esriFieldTypeDate

                                                                      esriFieldTypeGeometry 

                                                                      esriFieldTypeOID | esriFieldTypeGlobalID | esriFieldTypeGUID  

                                                                      esriFieldTypeRaster 

                                                                      esriFieldTypeSingle  

                                                                      esriFieldTypeBlob 

                                                                      esriFieldTypeXML

                                                              https://developers.arcgis.com/documentation/common-data-types/field.htm


                                                                                        0: {name: "Shape", type: "esriFieldTypeGeometry", alias: "Shape", domain: null}
                                                                                        1: {name: "ZoneCode", type: "esriFieldTypeString", alias: "ZoneCode", length: 3, domain: null}
                                                                                        2: {name: "ZoneName", type: "esriFieldTypeString", alias: "ZoneName", length: 254, domain: null}
                                                                                        3: {name: "Shape_Leng", type: "esriFieldTypeDouble", alias: "Shape_Leng", domain: null}
                                                                                        4: {name: "CityName", type: "esriFieldTypeString", alias: "CityName", length: 254, domain: null}
                                                                                        5: {name: "Shape_Area", type: "esriFieldTypeDouble", alias: "Shape_Area", domain: null}
                                                                                        6: {name: "Shape_Le_1", type: "esriFieldTypeDouble", alias: "Shape_Le_1", domain: null}
                                                                                        7: {name: "OBJECTID", type: "esriFieldTypeOID", alias: "OBJECTID", domain: null}
                                                                                        8: {name: "Shape_Length", type: "esriFieldTypeDouble", alias: "Shape_Length", domain: null}

                                      */

                                                                                        
                                      if     (
                                                                                              
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

                                                                            

                                              ) 
                                      { 

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
                                                  
                                                    } else if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ){

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

                      }




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


            
                  


                    } 

                      



/**/
//  --- use your key  --- 
/**/


   
   function use_your_key(){


          // 1st time, one time
          urlParams = new URLSearchParams(window.location.search);
          param_your_google_api_key = urlParams.get('yourGoogleKey'); 
          if (param_your_google_api_key){
                $('#googlemap-key-input').val(param_your_google_api_key)
                your_google_api_key = param_your_google_api_key
                import_google_map_dynamic_library(your_google_api_key)
          }


    
          $('#googlemap-button').on("click", async (event) => {

              your_google_api_key = $('#googlemap-key-input').val();
              update_url_parameter('yourGoogleKey', your_google_api_key);
              import_google_map_dynamic_library(your_google_api_key)
          });// click 

   }


/**/
//  --- end  ---  use your key    --- 
/**/



async function import_google_map_dynamic_library(_key){

                    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
                              key: _key,
                              v: "weekly",
                              // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
                              // Add other bootstrap parameters as needed, using camel case.
                    });
                    
                    console.log("i m p o r t, g o o g l e,  l i b r a r y ");
                    await google.maps.importLibrary("maps");
                    await google.maps.importLibrary("geometry");
                    await google.maps.importLibrary("places");
                    await google.maps.importLibrary("marker");

                    initMap()

}








 /**/
 //  -  -  - google photo  -  -  - only for new marker
 /**/

     var last_poi_id 
     var current_poi_id 

/**/
//  -  -  - end  -  -  -  google photo    -  -  - only for new marker
/**/





 /**/
 //  -  -  - google photo  -  -  - 
 /**/

 async function google_photo(_place_id){

   
    var _photos_html = ''

    var _place_details
    var _place_displayName
    var _photos_array
    var _photos_name
    var _photos_heightPx
    var _photos_widthPx

    var _photo_api_key


        

    var hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
        console.log("The current URL is localhost.");
        _photo_api_key = _google_place_api_key
    } else {
        // use client's key
        _photo_api_key = your_google_api_key
    }
       
    // Place Details (New) requests https://developers.google.com/maps/documentation/places/web-service/place-details
    var _place_details_by_google_url = 'https://places.googleapis.com/v1/places/' + _place_id + '?fields=id,displayName,photos&key=' +  _photo_api_key
     

           var _response_place_details = await ajax_getjson_common(_place_details_by_google_url)
              if (typeof _response_place_details === 'object') {
                              // is object
                              _place_details = _response_place_details
              } else {
                              // is string
                              _place_details = JSON.parse(_response_place_details)
              }
              console.log('_place_details', _place_details)


              // place name 
              if (_place_details.hasOwnProperty('displayName')){
                _place_displayName =  _place_details.displayName.text
              }
              _photos_html += '<span style="font-size:19.3px; font-weight:800;">' + _place_displayName + '</span>' 
              
              
             
              // photos
              if (_place_details.hasOwnProperty('photos')){

                _photos_array = _place_details.photos
                for (let p = 0; p < _photos_array.length; p++) {
                  _photos_name =  _photos_array[p].name
                  _photos_heightPx = _photos_array[p].heightPx
                  _photos_widthPx = _photos_array[p].widthPx
                  _photos_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=570&maxWidthPx=570&key=' + _photo_api_key + '" >'
                }// for photo

              }//if


               
              $('#google-photo-div').html(_photos_html)
              

               



 }

/**/
//  -  -  - end  -  -  -  google photo    -  -  - 
/**/










/**/
//  --- google place geocode    --- 
/**/
          


  var _google_public_map_only_api_key = "AIzaSyCeIFVL6oxxXNT7NToJjfU4J9TV2J8m4vE"
  // poi only(with restriction),   not work for compare google poi( require no-referal-restriction) 
  var _google_place_api_key = 'AIzaSyAUaELIu9LUeqRZAkyxbOQN8CmGtW_gDmY'
  

  // with photo, without street view
  async function google_place_api_reverseGeocode(_lat_comma_lng_string){

    your_google_api_key = $('#googlemap-key-input').val(); 
    update_url_parameter('yourGoogleKey', your_google_api_key)

    // billing https://developers.google.com/maps/documentation/geocoding/usage-and-billing
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=your_api_key
    // for this kind of place,geocode api call with &key=xxx,Google not allow use website restrict(localhost,referer restrict is not allowed), can only use IP restrict (hp-police)localhost ip: 167.224.97.162  production server ip: 116.221.167.72
    // different from google map api key,  which is website restrict to transparentgov.net only

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
    address_value_html = ''

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
                //address_value_html += "<br>"

              // photos
              if (_place_details.hasOwnProperty('photos')){

                _photos_array = _place_details.photos
                for (let p = 0; p < _photos_array.length; p++) {
                  _photos_name =  _photos_array[p].name
                  _photos_heightPx = _photos_array[p].heightPx
                  _photos_widthPx = _photos_array[p].widthPx
                    address_value_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=400&maxWidthPx=400&key=' + your_google_api_key + '" >'
                }// for photo

              }//if


              //address_value_html += "<br>"

        } else{    
         
                      //address_value_html += "<br>"
                      address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'  
                      address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
        }// if
    }// for
                                  
    $('#info-window-div').html(address_value_html)

  }


                  // .............. click to show street view  .............. 

                  

                    // no photo, for street view
                    // photo conflict with street view, do not show photo to keep street view
                    async function google_place_api_reverseGeocode_streetview(_lat_comma_lng_string){
                      
                      your_google_api_key = $('#googlemap-key-input').val(); 
                      update_url_parameter('yourGoogleKey', your_google_api_key)


                      // billing https://developers.google.com/maps/documentation/geocoding/usage-and-billing
                      // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=your_api_key
                      // for this kind of place,geocode api call with &key=xxx,Google not allow use website restrict(localhost,referer restrict is not allowed), can only use IP restrict (hp-police)localhost ip: 167.224.97.162  production server ip: 116.221.167.72
                      // different from google map api key,  which is website restrict to transparentgov.net only

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
                      address_value_html = ''
                      

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
                                // photo conflict with street view, do not show photo to keep street view
                                //address_value_html += "<br>"


                                 // photos
                                  if (_place_details.hasOwnProperty('photos')){

                                    _photos_array = _place_details.photos
                                    for (let p = 0; p < _photos_array.length; p++) {
                                      _photos_name =  _photos_array[p].name
                                      _photos_heightPx = _photos_array[p].heightPx
                                      _photos_widthPx = _photos_array[p].widthPx
                                        address_value_html += '<img src="https://places.googleapis.com/v1/' + _photos_name + '/media?maxHeightPx=400&maxWidthPx=400&key=' + your_google_api_key + '" >'
                                    }// for photo

                                  }//if


                                  //address_value_html += "<br>"

                          } else{    
                            
                            
                              
                                      //address_value_html += "<br>"
                                      address_value_html += '<span style="font-size:11px;">' + _formatted_address +   '</span>'  
                                      address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                          }// if
                      }// for
                                                    
                      $('#info-window-div').html(address_value_html)
                      

                    }
                  // .............. end   ..............  click to show street view  .............. 


                  

/**/
//  --- end  ---  google place geocode    --- 
/**/







/**/
// ................ google geolocation api  ................    ................

    // https://developers.google.com/maps/documentation/javascript/examples/map-geolocation#maps_map_geolocation-javascript
    // https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript

    var myLocationMarker;


    // must after map object created
    function geolocation(){

        var locationButton = document.getElementById("panToCurrent_geolocation_button");

        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                  panto_googlemaps(position.coords.latitude, position.coords.longitude, 18) 

                  var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };
                       
                  if (myLocationMarker){
                   // remove previous my location marker
                   myLocationMarker.setMap(null)
                  }

                  myLocationMarker = new google.maps.Marker({
                    position: pos,
                    map,

                    // default icon used if comment out this custom svg icon
                    icon: {
                            path: "M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 	C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 	C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z",
                            fillColor: "blue",
                            fillOpacity: 0.6,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 0.666,
                            anchor: new google.maps.Point(0, 20),
                          },

                         
                  });
                
                },
                () => {
                alert("failed: Turn on (allow) geolocation in your browser setting.")
                }
            );
            } else {
            // Browser doesn't support Geolocation
            alert("Error: Your browser doesn't support geolocation.")
            }
        });

    }
    

    
    function panto_googlemaps(_panto_latitude, _panto_longitude, _panto_zoom){


      var latLng = new google.maps.LatLng(_panto_latitude, _panto_longitude);
      map.panTo(latLng);
      map.setZoom(_panto_zoom); 

    }
   
                
    // reverse pan-to-your-current-location
    function zoom_to_layer() {

      

      var zoomToLayerButton = document.getElementById("zoomToLayer_button");

      zoomToLayerButton.addEventListener("click", () => {

        pan_to_real_location();  

      });


    }


// ................ end   ................  google geolocation api  ................    ................
/**/
                                

