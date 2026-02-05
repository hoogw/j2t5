
// this is simple version, server/folder.html, collapse all by default 
var iconJstreeNodeOpened =  false; // true is expanded all,  false is collapse all 
var iconJstreeforceOpen = true;




               
/* 
    bootstrap 5 icon 
       color name and code see .css 
       https://icons.getbootstrap.com/#install
*/    

var folder_icon = "bi bi-folder2-open blue_green";
var folder_fill_icon = "bi bi-folder-fill blue_green";
var folder_check_icon = "bi bi-folder-check blue_green";
var open_new_tab_icon = "bi bi-box-arrow-up-right glaucous";
var fieldNameAlias_icon = "bi bi-cloud-moon glaucous";
            var fieldName_icon = "bi bi-cloud-sun glaucous";
            var displayfieldName_icon = "bi bi-cloud-sun-fill glaucous";
            var fieldType_icon = "bi bi-box glaucous";
            var fieldDomain_icon = "bi bi-droplet-half glaucous";

var yes_icon = "bi bi-check-square-fill moss_green";
var no_icon = "bi bi-x-circle black";
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

/*
bootstrap 3 icon, not use

bootstrap icon :  https://getbootstrap.com/docs/3.3/components/
https://icons.getbootstrap.com/
https://glyphicons.bootstrapcheatsheets.com/

var folder_icon = "glyphicon glyphicon-folder-open blue_green";
var open_new_tab_icon = "glyphicon glyphicon-new-window glaucous";
var yes_icon = "glyphicon glyphicon-ok moss_green";
var no_icon = "glyphicon glyphicon-remove mango"; 
var mapservice_icon = "glyphicon glyphicon-globe taupe";
var layer_icon = "glyphicon glyphicon-map-marker cadmium_green";
var table_icon = "glyphicon glyphicon-list viridian";
var coming_icon = "glyphicon glyphicon-info-sign blue_green";

// -123 means void, blank icon, for everything other than map-server, feature-server, feature-layer
var VectorTileServer_icon = "glyphicon glyphicon-123 taupe"
var ImageServer_icon = "glyphicon glyphicon-123 taupe"
var SceneServer_icon = "glyphicon glyphicon-123 taupe"
var GeocodeServer_icon = "glyphicon glyphicon-123 taupe"
var unknow_server_icon = "glyphicon glyphicon-123 taupe"

var AnnotationLayer_icon = "glyphicon glyphicon-123 taupe"
var RasterLayer_icon = "glyphicon glyphicon-123 taupe"
var RasterCatalogLayer_icon = "glyphicon glyphicon-123 taupe"
var MosaicLayer_icon = "glyphicon glyphicon-123 taupe"
var unknow_layer_icon = "glyphicon glyphicon-123 taupe"
*/




var naming_panel_status = true

var naming_item; 
var id_counter = 0;
var current_parent_id_counter;
var folder_structure_flatjson = []









function  jstree_folder(_icons_flatjson){

    $('#jstree_naming')
      // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
      // not use these 2 line, Because they will NOT fire event, if you click a already selected node, it only fire event if selected node changed.
      //.on('select_node.jstree', create_click_link) 
      //.on('changed.jstree', create_click_link) 
      // if you want to always fire event, even on a already selected node, use this line 
      .on('activate_node.jstree', create_click_link) 
                                              
       /**/
       // create the instance $('#xxxx_div').jstree({ })
       .jstree({ 
                 'core' : {
                            'themes': {
                                            'name': 'proton',
                                            'responsive': true
                                        },
                            'data' : _icons_flatjson
                         } 
        })




}






                                          function turn_on_naming_panel() {

                                            $('#naming_panel').show();
                                            $("#naming_panel_toggle").attr("class", "street-view-button-turn-on-mode");
                                            naming_panel_status = true;

                                          }



                                          function turn_off_naming_panel(){

                                                    
                                                  $('#naming_panel').hide();
                                                  $("#naming_panel_toggle").attr("class", "street-view-button");  
                                                  naming_panel_status = false;

                                          }






                                          // for searchMapServer.js only
                                          function init_naming_panel_for_mapserver(){




                                             // .............. naming panel  .............. 
                                             turn_on_naming_panel()

                                             $('#naming_panel_toggle').on('click', function(event) {
                                                     event.preventDefault(); // To prevent following the link (optional)
                                                     if (naming_panel_status) {
                                                                   $("#naming_panel_toggle").attr("class", "street-view-button");
                                                                   // turn off street view
                                                                   turn_off_naming_panel()
                                                     } else {
                                                                   $("#naming_panel_toggle").attr("class", "street-view-button-turn-on-mode");
                                                                   // turn on street view
                                                                   turn_on_naming_panel()
                                                     } // if
                                             });
                                       // .............. end   ..............  naming panel  .............. 





                                            $("#collapse_button_naming").on('click',function(){
                                                
                                              console.log(' collapse naming ')
                                              $('#jstree_naming').jstree('close_all');


                                          }); 

                                          $("#expand_button_naming").on('click',function(){

                                              console.log(' expand naming ')
                                              $('#jstree_naming').jstree('open_all');
                                              
                                          }); 




                             // ********* add root item *********

                                            
                                        naming_item =  { 
                                        
                                              "id" : 0, 
                                              "parent" : "#",   // root parent id is #
                                              "text" : "ArcServer",
                                              "icon" : folder_icon,
                                                 
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                              // "selected"  : true   // is the node selected
                                                              },                                                 
                                              
                                          };


                                          // 1 time, first time run, add root item
                                          folder_structure_flatjson.push(naming_item) 

                                        
                              // *******  end  ********* add root item *********

                               


                               /**/
                               //  ....... add  folder item  ....... 


                                    /* level 1 */ 

                                                  naming_item = { 

                                                      "id" :  10,     
                                                      "parent" : 0,
                                                      "text" : "e for Esri",
                                                      "icon" : folder_icon,
                                                         
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }

                                                    
                                                  };
                                                
                                                  folder_structure_flatjson.push(naming_item) 





                                    /* level 2 */ 



                                                  naming_item = { 

                                                    "id" :  65,     
                                                    "parent" : 10,
                                                    "text" : "MapServer and FeatureServer",
                                                    "icon" : folder_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }

                                                  
                                                };
                                              
                                                folder_structure_flatjson.push(naming_item) 




                                                naming_item = { 

                                                  "id" :  66,     
                                                  "parent" : 10,
                                                  "text" : "ImageServer",
                                                  "icon" : folder_icon,
                                                    
                                                  "state"       : {
                                                                      "opened"    : true,  // is the node open
                                                                      // disabled  : boolean  // is the node disabled
                                                                      // "selected"  : true   // is the node selected
                                                                  }

                                                
                                              };
                                            
                                              folder_structure_flatjson.push(naming_item) 




                                              naming_item = { 

                                                "id" :  67,     
                                                "parent" : 10,
                                                "text" : "VectorTileServer",
                                                "icon" : folder_icon,
                                                  
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }

                                              
                                            };
                                          
                                            folder_structure_flatjson.push(naming_item) 



                                            naming_item = { 

                                              "id" :  68,     
                                              "parent" : 10,
                                              "text" : "SceneServer",
                                              "icon" : folder_icon,
                                                
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }

                                            
                                          };
                                        
                                          folder_structure_flatjson.push(naming_item) 





                                                naming_item = { 

                                                  "id" :  30,     
                                                  "parent" : 10,
                                                  "text" : "Google",
                                                  "icon" : folder_icon,
                                                     
                                                  "state"       : {
                                                                      "opened"    : true,  // is the node open
                                                                      // disabled  : boolean  // is the node disabled
                                                                      // "selected"  : true   // is the node selected
                                                                  }

                                                
                                              };
                                            
                                              folder_structure_flatjson.push(naming_item) 






                                        







                               /**/
                               // ....... end  ....... add  folder item  ....... 



                               /**/
                               // ======  add element item  ======  





/* .... esri  ....   */  




                                    naming_item = { 

                                      "id" :  653100,     
                                      "parent" : 65,
                                      "text" : "3100 MapImageLayer <sup>multiple select</sup>",
                                      "icon" : layer_icon,
                                        
                                      "state"       : {
                                                          "opened"    : true,  // is the node open
                                                          // disabled  : boolean  // is the node disabled
                                                          // "selected"  : true   // is the node selected
                                                      }


                                    };

                                    folder_structure_flatjson.push(naming_item) 


                                    naming_item = { 

                                      "id" :  653000,     
                                      "parent" : 65,
                                      "text" : "3000 MapImageLayer <sup>single select</sup>",
                                      "icon" : layer_icon,
                                        
                                      "state"       : {
                                                          "opened"    : true,  // is the node open
                                                          // disabled  : boolean  // is the node disabled
                                                          // "selected"  : true   // is the node selected
                                                      }


                                    };

                                    folder_structure_flatjson.push(naming_item) 




                                      naming_item = { 

                                        "id" :  6499,     
                                        "parent" : 65,
                                        "text" : "2100 FeatureLayer <sup>multiple select</sup>",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  6500,     
                                        "parent" : 65,
                                        "text" : "2000 FeatureLayer <sup>single select</sup>",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  6501,     
                                        "parent" : 65,
                                        "text" : "eye1001 FeatureLayer (flat)",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  6502,     
                                        "parent" : 65,
                                        "text" : "eye1002 FeatureLayer (flat) <sub>fullscreen</sub>",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  6503,     
                                        "parent" : 65,
                                        "text" : "eye1300 MapImageLayer",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  6504,     
                                        "parent" : 65,
                                        "text" : "eye1302 MapImageLayer <sub>fullscreen</sub>",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 




                                      naming_item = { 

                                        "id" :  6505,     
                                        "parent" : 65,
                                        "text" : "eye1310 MapImageLayer <sup>pop-up</sup>",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  6510,     
                                        "parent" : 65,
                                        "text" : "e1997 Classic v3.x",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  66910,     
                                        "parent" : 66,
                                        "text" : "910 google single-image-layer",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 

                                      

                                      // ImageServer


                                      naming_item = { 

                                        "id" :  66911,     
                                        "parent" : 66,
                                        "text" : "911 google multi-image-layer",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 




                                      naming_item = { 

                                        "id" :  66101,     
                                        "parent" : 66,
                                        "text" : "e101",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  66102,     
                                        "parent" : 66,
                                        "text" : "e102",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  66103,     
                                        "parent" : 66,
                                        "text" : "e103",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  66100,     
                                        "parent" : 66,
                                        "text" : "e100 classic",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 




                                      // SceneServer


                                      naming_item = { 

                                        "id" :  68140,     
                                        "parent" : 68,
                                        "text" : "e140 clickable",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  68141,     
                                        "parent" : 68,
                                        "text" : "e141 fullscreen",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 

                                    


                                      // VectorTileServer


                                      naming_item = { 

                                        "id" :  6713,     
                                        "parent" : 67,
                                        "text" : "m13 mapbox with label",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 




                                      naming_item = { 

                                        "id" :  6714,     
                                        "parent" : 67,
                                        "text" : "m14 mapbox no label",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 





                                      naming_item = { 

                                        "id" :  6701,     
                                        "parent" : 67,
                                        "text" : "o1 openlayer with highlight",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  6702,     
                                        "parent" : 67,
                                        "text" : "o2 openlayer no highlight",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 





                                      naming_item = { 

                                        "id" :  67231,     
                                        "parent" : 67,
                                        "text" : "e231",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  67232,     
                                        "parent" : 67,
                                        "text" : "e232",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 





                                      naming_item = { 

                                        "id" :  67230,     
                                        "parent" : 67,
                                        "text" : "e230 classic",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 




/* ....  google  multilayer limited on this MapServer  ....   */                      

                                      naming_item = { 

                                        "id" :  30912,     
                                        "parent" : 30,
                                        "text" : "912 pop-up",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  1000111,     
                                        "parent" : 30,
                                        "text" : "111 clickable",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  1000113,     
                                        "parent" : 30,
                                        "text" : "113 clickable (* Identify-mixed)",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  100011,     
                                        "parent" : 30,
                                        "text" : "11 hoverable",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 




                                      naming_item = { 

                                        "id" :  1000411,     
                                        "parent" : 30,
                                        "text" : "411 classified",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  1000420,     
                                        "parent" : 30,
                                        "text" : "420 classified clickable",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = { 

                                        "id" :  10003000,     
                                        "parent" : 30,
                                        "text" : "3000 spatial relation (overlay)",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 

                                        "id" :  10003002,     
                                        "parent" : 30,
                                        "text" : "3002 spatial relation (overlay fieldmask)",
                                        "icon" : layer_icon,
                                          
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }


                                      };

                                      folder_structure_flatjson.push(naming_item) 









/**/
                               //  ======    end  ======   ======  add element item  ======  




                               jstree_folder(folder_structure_flatjson)




                          }


                                          // for searchLayer.js only
                                          function init_naming_panel(){



             
                                             // .............. naming panel  .............. 
                                                    turn_on_naming_panel()

                                                    $('#naming_panel_toggle').on('click', function(event) {
                                                            event.preventDefault(); // To prevent following the link (optional)
                                                            if (naming_panel_status) {
                                                                          $("#naming_panel_toggle").attr("class", "street-view-button");
                                                                          // turn off street view
                                                                          turn_off_naming_panel()
                                                            } else {
                                                                          $("#naming_panel_toggle").attr("class", "street-view-button-turn-on-mode");
                                                                          // turn on street view
                                                                          turn_on_naming_panel()
                                                            } // if
                                                    });
                                              // .............. end   ..............  naming panel  .............. 





                                                            $("#collapse_button_naming").on('click',function(){
                                                                
                                                              console.log(' collapse naming ')
                                                              $('#jstree_naming').jstree('close_all');


                                                          }); 

                                                          $("#expand_button_naming").on('click',function(){

                                                              console.log(' expand naming ')
                                                              $('#jstree_naming').jstree('open_all');
                                                              
                                                          }); 


                                                          reset_naming_tree()

                                          }







function reset_naming_tree(){


  folder_structure_flatjson = []
                                             // ********* add root item *********

                                                            
                                                        naming_item =  { 
                                                        
                                                              "id" : 10, 
                                                              "parent" : "#",   // root parent id is #
                                                              "text" : "Feature Layer",
                                                              "icon" : folder_icon,
                                                                 
                                                              "state"       : {
                                                                                  "opened"    : true,  // is the node open
                                                                                  // disabled  : boolean  // is the node disabled
                                                                              // "selected"  : true   // is the node selected
                                                                              },                                                 
                                                              
                                                          };


                                                          // 1 time, first time run, add root item
                                                          folder_structure_flatjson.push(naming_item) 

                                                        
                                              // *******  end  ********* add root item *********

                                               






                                                               




/*  .. .. apple  .. .. */


                                                    naming_item = { 
                                                      "id" :  8000,     
                                                      "parent" : 10,
                                                      "text" : "Apple&reg;",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : false,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = { 
                                                      "id" :  800000,     
                                                      "parent" : 8000,
                                                      "text" : "A0 hoverable data only",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = { 
                                                      "id" :  800001,     
                                                      "parent" : 8000,
                                                      "text" : "A0p hoverable data only (zoomable point)",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 


                                                    naming_item = { 
                                                      "id" :  800020,     
                                                      "parent" : 8000,
                                                      "text" : "A20 hoverable data + tile",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = { 
                                                      "id" :  800021,     
                                                      "parent" : 8000,
                                                      "text" : "A20p hoverable data + tile (zoomable point)",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = { 
                                                      "id" :  8000120,     
                                                      "parent" : 8000,
                                                      "text" : "A120 clickable tile",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 






/* ..  .. .. end   .. .. .. apple .. .. */


/**/
 /* .... bing  ....   */       



                                                    naming_item = { 
                                                      "id" :  2000,     
                                                      "parent" : 10,
                                                      "text" : "Microsoft&reg;",
                                                      "icon" : folder_icon,
                                                      "state"       : {
                                                                          "opened"    : false,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = {
                                                      "id" :  200000,     
                                                      "parent" : 2000,
                                                      "text" : "B0 hoverable data only",
                                                      "icon" : layer_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = {
                                                      "id" :  200010,     
                                                      "parent" : 2000,
                                                      "text" : "B10 hoverable data + image",
                                                      "icon" : layer_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = {
                                                      "id" :  200020,     
                                                      "parent" : 2000,
                                                      "text" : "B20 hoverable data + tile",
                                                      "icon" : layer_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = {
                                                      "id" :  2000110,     
                                                      "parent" : 2000,
                                                      "text" : "B110 clickable image",
                                                      "icon" : layer_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 

                                                    naming_item = {
                                                      "id" :  2000120,     
                                                      "parent" : 2000,
                                                      "text" : "B120 clickable tile",
                                                      "icon" : layer_icon,
                                                      "state"       : {
                                                                          "opened"    : true,  // is the node open
                                                                          // disabled  : boolean  // is the node disabled
                                                                          // "selected"  : true   // is the node selected
                                                                      }
                                                    };
                                                    folder_structure_flatjson.push(naming_item) 




 /*   ....     end   .... bing  ....   */       
/**/

                                      




/**/
 /* .... here  ....   */       



                            naming_item = { 
                              "id" :  3000,     
                              "parent" : 10,
                              "text" : "Here&reg;",
                              "icon" : folder_icon,
                              "state"       : {
                                                  "opened"    : false,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }
                            };
                            folder_structure_flatjson.push(naming_item) 

                            naming_item = {
                              "id" :  300000,     
                              "parent" : 3000,
                              "text" : "H0 hoverable data only",
                              "icon" : layer_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }
                            };
                            folder_structure_flatjson.push(naming_item) 

                            naming_item = {
                              "id" :  300010,     
                              "parent" : 3000,
                              "text" : "H10 hoverable data + image",
                              "icon" : layer_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }
                            };
                            folder_structure_flatjson.push(naming_item) 

                            naming_item = {
                              "id" :  300020,     
                              "parent" : 3000,
                              "text" : "H20 hoverable data + tile",
                              "icon" : layer_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }
                            };
                            folder_structure_flatjson.push(naming_item) 

                            naming_item = {
                              "id" :  3000110,     
                              "parent" : 3000,
                              "text" : "H110 clickable image",
                              "icon" : layer_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }
                            };
                            folder_structure_flatjson.push(naming_item) 

                            naming_item = {
                              "id" :  3000120,     
                              "parent" : 3000,
                              "text" : "H120 clickable tile",
                              "icon" : layer_icon,
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }
                            };
                            folder_structure_flatjson.push(naming_item) 




/*   ....     end   .... here  ....   */       
/**/






/**/
/* .... mapbox  ....   */   



                                              naming_item = { 
                                                "id" :  4000,     
                                                "parent" : 10,
                                                "text" : "Mapbox&reg;",
                                                "icon" : folder_icon,
                                                "state"       : {
                                                                    "opened"    : false,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                              };
                                              folder_structure_flatjson.push(naming_item) 

                                              naming_item = {
                                                "id" :  400000,     
                                                "parent" : 4000,
                                                "text" : "M0 hoverable data only",
                                                "icon" : layer_icon,
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                              };
                                              folder_structure_flatjson.push(naming_item) 

                                              naming_item = {
                                                "id" :  400010,     
                                                "parent" : 4000,
                                                "text" : "M10 hoverable data + image",
                                                "icon" : layer_icon,
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                              };
                                              folder_structure_flatjson.push(naming_item) 

                                              naming_item = {
                                                "id" :  400020,     
                                                "parent" : 4000,
                                                "text" : "M20 hoverable data + tile",
                                                "icon" : layer_icon,
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                              };
                                              folder_structure_flatjson.push(naming_item) 

                                              naming_item = {
                                                "id" :  4000110,     
                                                "parent" : 4000,
                                                "text" : "M110 clickable image",
                                                "icon" : layer_icon,
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                              };
                                              folder_structure_flatjson.push(naming_item) 

                                              naming_item = {
                                                "id" :  4000120,     
                                                "parent" : 4000,
                                                "text" : "M120 clickable tile",
                                                "icon" : layer_icon,
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                              };
                                              folder_structure_flatjson.push(naming_item) 



/* ....   end .... mapbox  ....   */   
/**/




/*  ....   esri  ....   */  

                                              naming_item = { 

                                                "id" :  65,     
                                                "parent" : 10,
                                                "text" : "Esri&reg;",
                                                "icon" : folder_icon,
                                                  
                                                "state"       : {
                                                                    "opened"    : false,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }


                                              };

                                              folder_structure_flatjson.push(naming_item) 



                                              naming_item = { 

                                                "id" :  10651,     
                                                "parent" : 65,
                                                "text" : "e11 clickable MapImageLayer",
                                                "icon" : folder_icon,
                                                  
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }


                                              };

                                              folder_structure_flatjson.push(naming_item) 



                                              naming_item = { 

                                              "id" :  10652,     
                                              "parent" : 65,
                                              "text" : "e12 hovererbale MapImageLayer",
                                              "icon" : folder_icon,
                                                
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }


                                              };

                                              folder_structure_flatjson.push(naming_item) 



                                              naming_item = { 

                                              "id" :  10653,     
                                              "parent" : 65,
                                              "text" : "e41 classified FeatureLayer",
                                              "icon" : folder_icon,
                                              
                                              "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            }


                                              };

                                              folder_structure_flatjson.push(naming_item) 



                                              naming_item = { 

                                                "id" :  10654,     
                                                "parent" : 65,
                                                "text" : "e22 clickable FeatureLayer",
                                                "icon" : folder_icon,
                                                
                                                "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }
  
  
                                                };
  
                                                folder_structure_flatjson.push(naming_item) 



                                                naming_item = { 

                                                  "id" :  10655,     
                                                  "parent" : 65,
                                                  "text" : "e23 hovererbale FeatureLayer",
                                                  "icon" : folder_icon,
                                                  
                                                  "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
    
    
                                                  };
    
                                                  folder_structure_flatjson.push(naming_item) 





/*  ....    end .... esri  ....   */  
/**/






 /* ---- ---- google ---- ---- 2 level folder ---- ----  */



                                                      naming_item = { 

                                                        "id" :  30,     
                                                        "parent" : 10,
                                                        "text" : "Google&reg;",
                                                        "icon" : folder_icon,
                                                          
                                                        "state"       : {
                                                                            "opened"    : true,  // is the node open
                                                                            // disabled  : boolean  // is the node disabled
                                                                            // "selected"  : true   // is the node selected
                                                                        }


                                                      };

                                                      folder_structure_flatjson.push(naming_item) 






 /* ---- ----  end ---- ---- google ---- ---- 2 level folder ---- ----  */
 /**/






 /* ....  google  single layer  ....   */                      




                                            naming_item = { 

                                              "id" :  1030,     
                                              "parent" : 30,
                                              "text" : "single layer",
                                              "icon" : folder_icon,
                                                
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }


                                              };

                                              folder_structure_flatjson.push(naming_item) 



                                               naming_item = { 
                                                "id" :  103000,     
                                                "parent" : 1030,
                                                "text" : "0 hoverable data + image + tile",
                                                "icon" : layer_icon,
                                                "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                }
                                                };
                                                folder_structure_flatjson.push(naming_item) 



                                                naming_item = { 
                                                  "id" :  103010,     
                                                  "parent" : 1030,
                                                  "text" : "10 hoverable data only",
                                                  "icon" : layer_icon,
                                                  "state"       : {
                                                                      "opened"    : true,  // is the node open
                                                                      // disabled  : boolean  // is the node disabled
                                                                      // "selected"  : true   // is the node selected
                                                                  }
                                                  };
                                                folder_structure_flatjson.push(naming_item) 


                                                naming_item = { 
                                                  "id" :  1030110,     
                                                  "parent" : 1030,
                                                  "text" : "110 clickable image",
                                                  "icon" : layer_icon,
                                                  "state"       : {
                                                                      "opened"    : true,  // is the node open
                                                                      // disabled  : boolean  // is the node disabled
                                                                      // "selected"  : true   // is the node selected
                                                                  }
                                                  };
                                                folder_structure_flatjson.push(naming_item) 


                                                naming_item = { 
                                                  "id" :  1030120,     
                                                  "parent" : 1030,
                                                  "text" : "120 clickable tile",
                                                  "icon" : layer_icon,
                                                  "state"       : {
                                                                      "opened"    : true,  // is the node open
                                                                      // disabled  : boolean  // is the node disabled
                                                                      // "selected"  : true   // is the node selected
                                                                  }
                                                  };
                                                folder_structure_flatjson.push(naming_item) 





 /*   ....  end ....  google  single layer  ....   */                      



                                                    

/**/
 /* ....  google  multilayer limited on this MapServer  ....   */                      



                                              naming_item = { 

                                                "id" :  1050,     
                                                "parent" : 30,   
                                                "text" : "multilayer limited on this MapServer",
                                                "icon" : folder_icon,
                                                
                                                "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }


                                                };

                                                folder_structure_flatjson.push(naming_item) 




 /*   ....    end  ....  google  multilayer limited on this MapServer  ....   */                      
/**/





                                                 

/**/
 /* ....  google  multilayer anywhere  ....   */                      





                                                naming_item = { 

                                                  "id" :  1060,     
                                                  "parent" : 30,
                                                  "text" : "multilayer anywhere",
                                                  "icon" : folder_icon,
                                                    
                                                  "state"       : {
                                                                      "opened"    : true,  // is the node open
                                                                      // disabled  : boolean  // is the node disabled
                                                                      // "selected"  : true   // is the node selected
                                                                  }


                                                };

                                                folder_structure_flatjson.push(naming_item) 





 /* ....  google  multilayer anywhere  ....   */                      
/**/


/* .... table ....   */   


                              naming_item = { 

                                "id" :  20,     
                                "parent" : 10,
                                "text" : "Attribute Table",
                                "icon" : folder_icon,
                                  
                                "state"       : {
                                                    "opened"    : false,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }


                              };

                              folder_structure_flatjson.push(naming_item) 



                                                  naming_item = { 

                                                    "id" :  201,     
                                                    "parent" : 20,
                                                    "text" : "T0 searchable",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 




                                                  naming_item = { 

                                                    "id" :  202,     
                                                    "parent" : 20,
                                                    "text" : "T4 classified (1 dimension)",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 




                                                  naming_item = { 

                                                    "id" :  203,     
                                                    "parent" : 20,
                                                    "text" : "T-grid esri",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 











 /**/
                                               //  ======    end  ======   ======  add element item  ======  




                                               // must destroy last time old tree
                                                $('#jstree_naming').jstree('destroy');
                                                $("#jstree_naming").html('');


                                               jstree_folder(folder_structure_flatjson)




                                          }