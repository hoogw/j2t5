


               
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









                                          function  jstree_folder(_naming_flatjson){

                                            $('#jstree_naming')
                                            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                                            .on('changed.jstree', function (e, data) {


                                            })

                                            // create the instance $('#xxxx_div').jstree({ })
                                            .jstree({ 
                                                
                                                
                                                
                                                'core' : {

                                                                    'themes': {
                                                                        'name': 'proton',
                                                                        'responsive': true
                                                                    },
                                                            


                                                                
                                                                'data' : _naming_flatjson





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




                                             // ********* add root item *********

                                                            
                                                        naming_item =  { 
                                                        
                                                              "id" : 10, 
                                                              "parent" : "#",   // root parent id is #
                                                              "text" : "Socrata",
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


                                                 

 /* .... apple  ....   */       


                                      naming_item = { 
                                        "id" :  91,     
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
                                        "id" :  9191,     
                                        "parent" : 91,
                                        "text" : "Apple hoverable",
                                        "icon" : folder_icon,
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }
                                      };
                                      folder_structure_flatjson.push(naming_item)


                                      naming_item = {
                                        "id" :  91911,     
                                        "parent" : 9191,
                                        "text" : "A0",
                                        "icon" : layer_icon,
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }
                                      };
                                      folder_structure_flatjson.push(naming_item) 

                                      naming_item = { 
                                      "id" :  91912,     
                                      "parent" : 9191,
                                      "text" : "A0p zoomable point",
                                      "icon" : layer_icon,
                                      "state"       : {
                                                          "opened"    : true,  // is the node open
                                                          // disabled  : boolean  // is the node disabled
                                                          // "selected"  : true   // is the node selected
                                                      }
                                      };
                                      folder_structure_flatjson.push(naming_item) 





/* .... microsoft bing  ....   */       



                                        naming_item = { 
                                          "id" :  70,     
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
                                          "id" :  7070,     
                                          "parent" : 70,
                                          "text" : "Bing hoverable",
                                          "icon" : folder_icon,
                                          "state"       : {
                                                              "opened"    : true,  // is the node open
                                                              // disabled  : boolean  // is the node disabled
                                                              // "selected"  : true   // is the node selected
                                                          }
                                        };
                                        folder_structure_flatjson.push(naming_item) 


                                        naming_item = {
                                          "id" :  70701,     
                                          "parent" : 7070,
                                          "text" : "B0",
                                          "icon" : layer_icon,
                                          "state"       : {
                                                              "opened"    : true,  // is the node open
                                                              // disabled  : boolean  // is the node disabled
                                                              // "selected"  : true   // is the node selected
                                                          }
                                      };
                                      folder_structure_flatjson.push(naming_item) 

                                      naming_item = { 
                                        "id" : 70702,     
                                        "parent" : 7070,
                                        "text" : "B0c search result as card",
                                        "icon" : layer_icon,
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }
                                    };
                                    folder_structure_flatjson.push(naming_item) 





/* .... here  ....   */       



                                          naming_item = { 
                                            "id" :  1060,     
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
                                            "id" :  106010,     
                                            "parent" : 1060,
                                            "text" : "HereWeGo hoverable",
                                            "icon" : folder_icon,
                                            "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            }
                                          };
                                          folder_structure_flatjson.push(naming_item) 


                                          naming_item = {
                                            "id" :  10601010,     
                                            "parent" : 106010,
                                            "text" : "H0",
                                            "icon" : layer_icon,
                                            "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            }
                                        };
                                        folder_structure_flatjson.push(naming_item) 

                                        naming_item = { 
                                          "id" :  10601011,     
                                          "parent" : 106010,
                                          "text" : "H0c search result as card",
                                          "icon" : layer_icon,
                                          "state"       : {
                                                              "opened"    : true,  // is the node open
                                                              // disabled  : boolean  // is the node disabled
                                                              // "selected"  : true   // is the node selected
                                                          }
                                      };
                                      folder_structure_flatjson.push(naming_item) 







/* .... mapbox  ....   */   


            
                                                            naming_item = { 
                                                              "id" :  80,     
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
                                                              "id" :  100,     
                                                              "parent" : 80,
                                                              "text" : "Mapbox hoverable",
                                                              "icon" : folder_icon,
                                                              "state"       : {
                                                                                  "opened"    : true,  // is the node open
                                                                                  // disabled  : boolean  // is the node disabled
                                                                                  // "selected"  : true   // is the node selected
                                                                              }
                                                            };
                                                            folder_structure_flatjson.push(naming_item) 



                                                            naming_item = { 

                                                              "id" :  1001,     
                                                              "parent" : 100,
                                                              "text" : "M0",
                                                              "icon" : layer_icon,
                                                                
                                                              "state"       : {
                                                                                  "opened"    : true,  // is the node open
                                                                                  // disabled  : boolean  // is the node disabled
                                                                                  // "selected"  : true   // is the node selected
                                                                              }


                                                            };

                                                            folder_structure_flatjson.push(naming_item) 



                                                            naming_item = { 

                                                            "id" :  1002,     
                                                            "parent" : 100,
                                                            "text" : "M0c search result as card",
                                                            "icon" : layer_icon,
                                                              
                                                            "state"       : {
                                                                                "opened"    : true,  // is the node open
                                                                                // disabled  : boolean  // is the node disabled
                                                                                // "selected"  : true   // is the node selected
                                                                            }


                                                            };

                                                            folder_structure_flatjson.push(naming_item) 










 /* --------- google  ---------  */ 

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




                                                              naming_item = { 

                                                                "id" :  40,     
                                                                "parent" : 30,
                                                                "text" : "Google hoverable",
                                                                "icon" : folder_icon,
                                                                   
                                                                "state"       : {
                                                                                    "opened"    : true,  // is the node open
                                                                                    // disabled  : boolean  // is the node disabled
                                                                                    // "selected"  : true   // is the node selected
                                                                                }

                                                              
                                                            };
                                                          
                                                            folder_structure_flatjson.push(naming_item) 



                                                            naming_item = { 

                                                              "id" :  50,     
                                                              "parent" : 30,   
                                                              "text" : "Google classified",
                                                              "icon" : folder_icon,
                                                                 
                                                              "state"       : {
                                                                                  "opened"    : true,  // is the node open
                                                                                  // disabled  : boolean  // is the node disabled
                                                                                  // "selected"  : true   // is the node selected
                                                                              }

                                                            
                                                          };
                                                        
                                                          folder_structure_flatjson.push(naming_item) 





                                                                naming_item = { 

                                                                  "id" :  60,     
                                                                  "parent" : 30,
                                                                  "text" : "Google arcgisConnect",
                                                                  "icon" : folder_icon,
                                                                     
                                                                  "state"       : {
                                                                                      "opened"    : false,  // is the node open
                                                                                      // disabled  : boolean  // is the node disabled
                                                                                      // "selected"  : true   // is the node selected
                                                                                  }

                                                                
                                                              };
                                                            
                                                              folder_structure_flatjson.push(naming_item) 

 

                                                            

                                                            



                                               /**/
                                               // ....... end  ....... add  folder item  ....... 
 


                                               /**/
                                               // ======  add element item  ======  


                                       /* ....  google  ....   */                      

                                                naming_item = {
                                                    "id" :  4001,     
                                                    "parent" : 40,
                                                    "text" : "0",
                                                    "icon" : layer_icon,
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }
                                                };
                                                folder_structure_flatjson.push(naming_item) 
                                                naming_item = {
                                                    "id" :  4002,     
                                                    "parent" : 40,
                                                    "text" : "0c search result as card",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }
                                                };
                                                folder_structure_flatjson.push(naming_item) 




                                            


                                          naming_item = { 

                                            "id" :  4073,     
                                            "parent" : 40,
                                            "text" : "73 google label",
                                            "icon" : layer_icon,
                                               
                                            "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            }

                                          
                                        };
                                      
                                        folder_structure_flatjson.push(naming_item) 


                                        naming_item = { 

                                          "id" :  40730,     
                                          "parent" : 40,
                                          "text" : "730 google label custom color",
                                          "icon" : layer_icon,
                                             
                                          "state"       : {
                                                              "opened"    : true,  // is the node open
                                                              // disabled  : boolean  // is the node disabled
                                                              // "selected"  : true   // is the node selected
                                                          }

                                        
                                      };
                                    
                                      folder_structure_flatjson.push(naming_item) 



                                      naming_item = { 
                                        "id" :  4071,     
                                        "parent" : 40,
                                        "text" : "71 google label point only",
                                        "icon" : layer_icon,
                                        "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        }
                                      };
                                      folder_structure_flatjson.push(naming_item) 


                                      naming_item = {
                                          "id" :  40710,     
                                          "parent" : 40,
                                          "text" : "710 google label point only custom color",
                                          "icon" : layer_icon,
                                          "state"       : {
                                                              "opened"    : true,  // is the node open
                                                              // disabled  : boolean  // is the node disabled
                                                              // "selected"  : true   // is the node selected
                                                          }
                                      };
                                      folder_structure_flatjson.push(naming_item) 
                                      

                                            naming_item = { 

                                              "id" :  4081,     
                                              "parent" : 40,
                                              "text" : "81 custom google marker (point only)",
                                              "icon" : layer_icon,
                                                 
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }
  
                                            
                                          };
                                        
                                          folder_structure_flatjson.push(naming_item) 




                                            





                    // .............. google classified   ..............


                    naming_item = { 
                      "id" :  5041,     
                      "parent" : 50,  
                      "text" : "41 link",
                      "icon" : layer_icon,
                      "state"       : {
                                          "opened"    : true,  // is the node open
                                          // disabled  : boolean  // is the node disabled
                                          // "selected"  : true   // is the node selected
                                      }
                    };
                    folder_structure_flatjson.push(naming_item) 

                
                      naming_item = { 
                        "id" :  5004,     
                        "parent" : 50,   
                        "text" : "4 tree",
                        "icon" : layer_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        }
                      };
                      folder_structure_flatjson.push(naming_item) 


                      naming_item = { 
                        "id" :  50043,     
                        "parent" : 50,   
                        "text" : "43 multiple choice(checkbox)<sup>tree</sup>",
                        "icon" : layer_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        }
                      };
                      folder_structure_flatjson.push(naming_item) 



                      naming_item = { 
                        "id" :  50413,     
                        "parent" : 50,  
                        "text" : "413 search by field(column)",
                        "icon" : layer_icon,
                        "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        }
                      };
                      folder_structure_flatjson.push(naming_item) 
  

                                           

                                            naming_item = { 
                                              "id" :  50480,     
                                              "parent" : 50,   
                                              "text" : "480 colored",
                                              "icon" : layer_icon,
                                                
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }


                                              };

                                            folder_structure_flatjson.push(naming_item) 


                                            naming_item = { 

                                              "id" :  50482,     
                                              "parent" : 50,   
                                              "text" : "482 colored (blackout)",
                                              "icon" : layer_icon,
                                                
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }


                                              };

                                            folder_structure_flatjson.push(naming_item) 

                                              

 

                                            naming_item = { 

                                              "id" :  50487,     
                                              "parent" : 50,   
                                              "text" : "487 colored + labeled",
                                              "icon" : layer_icon,
                                                
                                              "state"       : {
                                                                  "opened"    : true,  // is the node open
                                                                  // disabled  : boolean  // is the node disabled
                                                                  // "selected"  : true   // is the node selected
                                                              }


                                              };

                                              folder_structure_flatjson.push(naming_item) 

                                                   

                                          naming_item = { 

                                            "id" :  504738,     
                                            "parent" : 50,   
                                            "text" : "4738 colored google label",
                                            "icon" : layer_icon,
                                              
                                            "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            }


                                            };

                                            folder_structure_flatjson.push(naming_item) 

                                           

                                                              naming_item = { 

                                                                "id" :  50473,     
                                                                "parent" : 50,  
                                                                "text" : "473 google label",
                                                                "icon" : layer_icon,
                                                                  
                                                                "state"       : {
                                                                                    "opened"    : true,  // is the node open
                                                                                    // disabled  : boolean  // is the node disabled
                                                                                    // "selected"  : true   // is the node selected
                                                                                }


                                                                };

                                                                folder_structure_flatjson.push(naming_item) 

                                                             


                                                                    naming_item = { 

                                                                      "id" :  504718,     
                                                                        "parent" : 50,   
                                                                        "text" : "4718 colored google label point only",
                                                                        "icon" : layer_icon,
                                                                          
                                                                        "state"       : {
                                                                                            "opened"    : true,  // is the node open
                                                                                            // disabled  : boolean  // is the node disabled
                                                                                            // "selected"  : true   // is the node selected
                                                                                        }

                                                                      
                                                                    };
                                                                  
                                                                    folder_structure_flatjson.push(naming_item) 

                                                                                   





                                                            naming_item = { 

                                                              "id" :  50471,     
                                                                "parent" : 50,  
                                                              "text" : "471 google label point only",
                                                              "icon" : layer_icon,
                                                                
                                                              "state"       : {
                                                                                  "opened"    : true,  // is the node open
                                                                                  // disabled  : boolean  // is the node disabled
                                                                                  // "selected"  : true   // is the node selected
                                                                              }

                                                            
                                                          };
                                                        
                                                          folder_structure_flatjson.push(naming_item) 

                                                                        







                                      









                                  naming_item = { 

                                    "id" :  2000,     
                                    "parent" : 60,
                                    "text" : "arcgis2000 multilayer hoverable",
                                    "icon" : layer_icon,
                                       
                                    "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    }

                                  
                                };
                              
                                folder_structure_flatjson.push(naming_item) 




                                naming_item = { 

                                  "id" :  2004,     
                                  "parent" : 60,
                                  "text" : "arcgis2004 multilayer classified",
                                  "icon" : layer_icon,
                                     
                                  "state"       : {
                                                      "opened"    : true,  // is the node open
                                                      // disabled  : boolean  // is the node disabled
                                                      // "selected"  : true   // is the node selected
                                                  }

                                
                              };
                            
                              folder_structure_flatjson.push(naming_item) 



                              naming_item = { 

                                "id" :  2113,     
                                "parent" : 60,
                                "text" : "arcgis2113 clickable (* In-order)",
                                "icon" : layer_icon,
                                   
                                "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }

                              
                            };
                          
                            folder_structure_flatjson.push(naming_item) 




                            naming_item = { 

                              "id" :  2116,     
                              "parent" : 60,
                              "text" : "arcgis2116 clickable (* Mixed)",
                              "icon" : layer_icon,
                                 
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }

                            
                          };
                        
                          folder_structure_flatjson.push(naming_item) 



                              naming_item = { 

                                "id" :  5010,     
                                "parent" : 60,
                                "text" : "arcgis5000 spatial relation (overlay)",
                                "icon" : layer_icon,
                                   
                                "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }

                              
                            };
                          
                            folder_structure_flatjson.push(naming_item) 



                            naming_item = { 

                              "id" :  5002,     
                              "parent" : 60,
                              "text" : "arcgis5002 spatial relation (overlay fieldmask)",
                              "icon" : layer_icon,
                                 
                              "state"       : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              }

                            
                          };
                        
                          folder_structure_flatjson.push(naming_item) 



                          naming_item = { 

                            "id" :  303030,     
                            "parent" : 60,
                            "text" : "arcgis30 spatial filter",
                            "icon" : layer_icon,
                               
                            "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            }

                          
                        };
                      
                        folder_structure_flatjson.push(naming_item) 


               




/* .... table ....   */   

                                                 



                                                  naming_item = { 

                                                    "id" :  20,     
                                                    "parent" : 10,
                                                    "text" : "Table",
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
                                                    "text" : "T24 classified (2 dimension)",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 



                                                  naming_item = { 

                                                    "id" :  204,     
                                                    "parent" : 20,
                                                    "text" : "T2 json searchable",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 



                                                  naming_item = { 

                                                    "id" :  205,     
                                                    "parent" : 20,
                                                    "text" : "T3 csv searchable",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 






/* .... geojson ....   */   



                                                  naming_item = { 

                                                    "id" :  25,     
                                                    "parent" : 10,
                                                    "text" : "Geojson",
                                                    "icon" : folder_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : false,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 




                                                  naming_item = { 

                                                    "id" :  2592,     
                                                    "parent" : 25,
                                                    "text" : "92 google hoverable (web worker)",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 


                                                  naming_item = { 

                                                    "id" :  2593,     
                                                    "parent" : 25,
                                                    "text" : "93 google hoverable",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 



                                                  naming_item = { 

                                                    "id" :  252,     
                                                    "parent" : 25,
                                                    "text" : "M2 mapbox hoverable",
                                                    "icon" : layer_icon,
                                                      
                                                    "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    }


                                                  };

                                                  folder_structure_flatjson.push(naming_item) 



                                                  naming_item = { 

                                                    "id" :  253,     
                                                    "parent" : 25,
                                                    "text" : "E0 esri",
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