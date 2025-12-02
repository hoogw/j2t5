


/**
 *    false :                   always close   
 *    iconJstreeforceOpen    :  always open
 *    iconJstreeNodeOpened
 * 
 */




// for folder.js, also for searchLayer.js(from create tree icon flat json function )
function feature_layer_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){

     var icon_flatjson = [];

     //  ....... add  root item  ....... 
     var icon_item = { 

        "id" :  10,     
        "parent" : "#",
        "text" : _layer_name_,
        "layer_name" : _layer_name_,
        "icon" : folder_icon, // layer_item.icon,  
        "link_type": "folder",
        "state"       : {
             // root folder is always open
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },

       
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
         "type" : _type_

       
    };
    // 1 time, first time run, add root item
    icon_flatjson.push(icon_item) 


//  ....... add  root item  ....... 









// ---  --- start  --- top --- --- --- ---level --- ---







                    icon_item = { 
                        "id" :  327,     
                        "parent" : 10,

                        "text" : "911 location platform",

                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 


                              
                    
                    icon_item = { 
                        "id" :  4907,     
                        "parent" : 10,
                        // google
                        "text" : google_svg + " Google" + "<small><sub>2010-now</sub></small>",  //v3 
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 



                       icon_item = { 
                        "id" :  970,     
                        "parent" : 10,
                        "text" : "Legend" + pin_svg,
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    : false,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item)



                    icon_item = { 
                        "id" :  90,     
                        "parent" : 10,
                        "text" : "Attribute table" + table_svg,
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    : false,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 
                    
                  


                    icon_item = { 
                        "id" :  648,     
                        "parent" : 10,
                        "text" : "Download" + download_svg, 
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    : false, //iconJstreeforceOpen, // false,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 

                  

                    


                    icon_item = { 
                        "id" :  8651,     
                        "parent" : 10,
                        // Microsoft
                        "text" : microsoft_svg + " Microsoft AzureMap" + "<small><sub>2018-now</sub></small>",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 

                  

    
                    
                    icon_item = { 
                        "id" :  777,     
                        "parent" : 10,
                        "text" : apple_svg + "Apple",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 








                    icon_item = { 
                        "id" :  577,     
                        "parent" : 10,
                        "text" : esri_svg + " Esri forever",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 




                    icon_item = { 
                        "id" :  579,     
                        "parent" : 10,
                        "text" : esri_svg + " Esri component" + "<small><sub>2023.10-now</sub></small>",  //<sup>v4.28-now</sup>
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 


                    icon_item = { 
                        "id" :  4679,     
                        "parent" : 10,
                        "text" : esri_svg + "  Esri widget" + "<small><sub>2008.6-2025.2</sub></small>", //<sup>v1.2-v4.31</sup>
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 



                   
                                        




                 


                    
                    icon_item = { 
                        "id" :  589,     
                        "parent" : 10,
                        "text" : esri_svg + " Esri official",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 
                   




//  ------------------------- end --- top -------- level -----------------------------------------









                    icon_item = {
                                    "id" :  500,     
                                    "parent" : 970,
                                    "text" : esri_svg + "  Esri widget" + '<small><sub>2008.6-2025.2, token 4 restricted</sub></small>',
                                    "icon" : folder_icon,  
                                    "link_type": "folder", 
                                    "state"       : {
                                    "opened": false,  // iconJstreeNodeOpened,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }
                    };
                    icon_flatjson.push(icon_item) 


                    
                  






                    icon_item = { 
                        "id" :  102222,     
                        "parent" : 970,
                        "text" : google_svg +  " Google" + "<small><sub>2005-2021</sub></small>", //v2 
                        "icon" : folder_icon,  
                        "link_type": "folder", 
                        "state"       : {
                        "opened": false,  // iconJstreeNodeOpened,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 







                        icon_item = { 
                                        "id" :  200,     
                                        "parent" : 970,
                                        "text" : microsoft_svg + " Microsoft BingMap" + "<small><sub>2005-2025</sub></small>",
                                        "icon" : folder_icon, 
                                        "link_type": "folder",  
                                        "state"       : {
                                                        "opened": false,  //iconJstreeNodeOpened,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    }
                                    };
                        icon_flatjson.push(icon_item) 




                        icon_item = { 
                                        "id" :  700,     
                                        "parent" : 970,
                                        "text" : "Here Map" + "<small><sub>2012-now</sub></small>",
                                        "icon" : folder_icon,  
                                        "link_type": "folder", 
                                        "state"       : {
                                        "opened": iconJstreeNodeOpened,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    }
                                    };
                        icon_flatjson.push(icon_item) 




                       





                        icon_item = { 
                                        "id" :  300,     
                                        "parent" : 970,
                                        "text" : "Mapbox" + "<small><sub>2015-now</sub></small>",
                                        "icon" : folder_icon, 
                                        "link_type": "folder",  
                                        "state"       : {
                                        "opened": false,  //iconJstreeNodeOpened,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    }
                                    };
                        icon_flatjson.push(icon_item) 



                        icon_item = { 
                            "id" :  10200,     
                            "parent" : 970,
                            "text" : "Apple" + "<small><sub>2012-now</sub></small>",
                            "icon" : folder_icon, 
                            "link_type": "folder",  
                            "state"       : {
                                            "opened": false,  //iconJstreeNodeOpened,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        }
                        };
                        icon_flatjson.push(icon_item) 






// --- end  --- only  --- top level brand  --- ---




/**/
// = = = = Embed this map in your website = = = =
/**/





        /* = = = = sub folder = = = = g o o g l e M a p = = = =  */
        icon_item = { 
            "id" :  639,     
            "parent" : 4907,
            "text" : "single select",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 





                   


                            icon_item = { 

                                "id" :  6392,     
                                "parent" : 639,
                                
                                
                                "text" : "6392 download",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6392",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                icon_flatjson.push(icon_item) 



                                icon_item = { 

                                    "id" :  2481,     
                                    "parent" : 629,
                                    
                                    
                                    "text" : "6392" + google_svg + " single select",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6392",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };




                                
                                icon_flatjson.push(icon_item) 

                               

                                icon_item = { 

                                    "id" :  6393,     
                                    "parent" : 639,
                                    
                                    
                                    "text" : "6393 hover or click",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6393",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item) 




                                    icon_item = { 

                                        "id" :  6395,     
                                        "parent" : 639,
                                        
                                        
                                        "text" : "6395 base map",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_6395",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item) 



                                        icon_item = { 

                                            "id" :  6396,     
                                            "parent" : 639,
                                            
                                            
                                            "text" : "6396 base map" + "<sup>vertical</sup>",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_6396",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item) 


                                            icon_item = { 

                                            "id" :  6397,     
                                            "parent" : 639,
                                            
                                            
                                            "text" : "6397 near-map",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_6397",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)

                                     


/* = = = = sub folder = = = = g o o g l e M a p = = = =  */
icon_item = { 
    "id" :  638,     
    "parent" : 4907,
    "text" : "multiple select",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 



                        icon_item = { 

                            "id" :  7967,     
                            "parent" : 638,
                            
                            
                            "text" : "7967 click-select, again-unselect",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_7967",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 




                            icon_item = { 

                                "id" :  2485,     
                                "parent" : 629,
                                
                                
                                "text" : "7967" + google_svg + " multiple select (click-select, again-unselect)",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_7967",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 




/* = = = = sub folder = = = = g o o g l e M a p = = = =  */
icon_item = { 
    "id" :  779,     
    "parent" : 4907,
    "text" : "MapImageLayer",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 


                    icon_item = { 

                        "id" :  7791,     
                        "parent" : 779,
                        
                        
                        "text" : "7791 click",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_7791",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 



/*  = = = =  end  = = = = sub folder = = = = g o o g l e M a p = = = =  */
    







/* = = = = sub folder = = = = g o o g l e M a p = = = =  */
icon_item = { 
    "id" :  7479,     
    "parent" : 4907,
    "text" : "click map show",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 





                            icon_item = { 

                                "id" :  6792,     
                                "parent" : 7479,
                                
                                
                                "text" : "6792 lat-lng",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6792",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 




                            icon_item = { 

                                "id" :  6793,     
                                "parent" : 7479,
                                
                                
                                "text" : "6793 lat-lng (multi-basemap)",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6793",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 





                                 icon_item = { 

                                "id" :  6797,     
                                "parent" : 7479,
                                
                                
                                "text" : "6797 street view",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6797",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 








        /* = = = = sub folder = = = = G oogle Map = = = =  */
        icon_item = { 
            "id" :  6200,     
            "parent" : 4907,
            "text" : "efficient engine",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 




                                /* = = = = sub folder = = = = g o o g l e M a p = = = =  */
                                icon_item = { 
                                    "id" :  5297,     
                                    "parent" : 6200,
                                    "text" : "new marker",
                                    "icon" : folder_icon,
                                    "link_type": "folder",   
                                    "state"       : {
                                    // use this opened line for always default open this folder
                                                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }
                                };
                                icon_flatjson.push(icon_item) 






                                 icon_item = { 

                                                        "id" :  5295,     
                                                        "parent" : 5297,
                                                        
                                                        
                                                        "text" : "5295 &#9671; diamond &#9671;  point 1x&#9634;",
                                                        
                                                        "layer_name" : _layer_name_,
                                                        "icon" : open_new_tab_icon,
                                                        "link_type": "embed_5295",
                                                        "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    },
                                                                    
                                                        "node_path" : _node_path_, 
                                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                        "server_path" : _map_server_url_,
                                                        "layer_id" :  _layer_id_,            
                                                        "type" : _type_
                                                        
                                                        
                                                        
                                                        };
                                                        
                                                        icon_flatjson.push(icon_item) 




                                                    icon_item = { 

                                                        "id" :  5296,     
                                                        "parent" : 5297,
                                                        
                                                        
                                                        "text" : "5296 advanced marker 1x&#9634;",
                                                        
                                                        "layer_name" : _layer_name_,
                                                        "icon" : open_new_tab_icon,
                                                        "link_type": "embed_5296",
                                                        "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    },
                                                                    
                                                        "node_path" : _node_path_, 
                                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                        "server_path" : _map_server_url_,
                                                        "layer_id" :  _layer_id_,            
                                                        "type" : _type_
                                                        
                                                        
                                                        
                                                        };
                                                        
                                                        icon_flatjson.push(icon_item) 
    


     /* = = = = sub folder = = = = g o o g l e M a p = = = =  */
     icon_item = { 
                                    "id" :  7177,     
                                    "parent" : 6200,
                                    "text" : "label",
                                    "icon" : folder_icon,
                                    "link_type": "folder",   
                                    "state"       : {
                                    // use this opened line for always default open this folder
                                                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }
    };
    icon_flatjson.push(icon_item) 


                                        icon_item = { 

                                            "id" :  7176,     
                                            "parent" : 7177,
                                            
                                            
                                            "text" : "7176 label &#9634;",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_7176",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item) 








                icon_item = { 

                    "id" :  6216,     
                    "parent" : 6200,
                    
                    
                    "text" : "6216 core 16x &#9638;",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "embed_6216",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item) 


                    icon_item = { 

                        "id" :  6204,     
                        "parent" : 6200,
                        
                        
                        "text" : "6204 core 4x &#8862;",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6204",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 




                       






                           

                        icon_item = { 

                            "id" :  6206,     
                            "parent" : 6200,
                            
                            
                            "text" : "6206 core 1x &#9634;",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_6206",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 



                            icon_item = { 

                                "id" :  6207,     
                                "parent" : 6200,
                                
                                
                                "text" : "6207 vertical 1x &#9634;",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6207",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 




                                
        /* = = = = sub folder = = = = g o o g l e M a p = = = =  */
        icon_item = { 
            "id" :  3521,     
            "parent" : 4907,
            "text" : "label",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 



                                    icon_item = { 

                                        "id" :  3523,     
                                        "parent" : 3521,
                                        
                                        
                                        "text" : "3523 centroid",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_3523",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item) 




       /* = = = = sub folder = = = = g o o g l e M a p = = = =  */
        icon_item = { 
            "id" :  5521,     
            "parent" : 4907,
            "text" : "new marker",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 




                                       icon_item = { 

                                        "id" :  5525,     
                                        "parent" : 5521,
                                        
                                        
                                        "text" : "5525 &#9671; diamond &#9671;  point",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_5525",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)




                                    icon_item = { 
                                        "id" :  5522,     
                                        "parent" : 5521,
                                        "text" : "5522 advanced marker",
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_5522",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        icon_flatjson.push(icon_item) 




/* = = = = sub folder = = = = G oogle Map = = = =  */
        icon_item = { 
            "id" :  5300,     
            "parent" : 4907,
            "text" : "max load",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 


                                        icon_item = { 
                                        "id" :  5310,     
                                        "parent" : 5300,
                                        "text" : "5310 1x Max",
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_5310",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        icon_flatjson.push(icon_item) 







                                        icon_item = { 
                                        "id" :  5316,     
                                        "parent" : 5300,
                                        "text" : "5316 progressive Max",
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_5316",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        icon_flatjson.push(icon_item) 




                                        icon_item = { 
                                        "id" :  5319,     
                                        "parent" : 5300,
                                        "text" : "5319 progressive Limited",
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_5319",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        icon_flatjson.push(icon_item)




                                         icon_item = { 
                                        "id" :  5346,     
                                        "parent" : 5300,
                                        "text" : "5346 evenly distribute 4x-ajax</sup>",
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_5346",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        icon_flatjson.push(icon_item)






       /* = = = = sub folder = = = = g o o g l e M a p = = = =  */
        icon_item = { 
            "id" :  7132,     
            "parent" : 4907,
            "text" : "street view",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 

         icon_item = { 

                        "id" :  6390,     
                        "parent" : 7132,
                        
                        
                        "text" : "6390 dark",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6390",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 




                        icon_item = { 

                            "id" :  6391,     
                            "parent" : 7132,
                            
                            
                            "text" : "6391 light",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_6391",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 




                           
                                      





/*  = = = =  end  = = = = sub folder = = = = g o o g l e M a p = = = =  */
    











        icon_item = { 
            "id" :  6190,     
            "parent" : 8651,
            "text" : "feature-layer",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 




        icon_item = { 
            "id" :  6199,     
            "parent" : 6190,
            "text" : "efficient engine",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 



        icon_item = { 

            "id" :  3316,     
            "parent" : 6199,
            "text" : "3316 &#9638; 16x core",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_3316",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)


        icon_item = { 

            "id" :  3384,     
            "parent" : 6199,
            "text" : "3384 &#8862; 4x core",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_3384",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)


        icon_item = { 

            "id" :  3385,     
            "parent" : 6199,
            "text" : "3385 &#9634; 1x core",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_3385",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)






          




        icon_item = { 

            "id" :  31725,     
            "parent" : 6190,
            
            
            "text" : "31725 hover",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_31725",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)




            


icon_item = { 
            "id" :  5159,     
            "parent" : 6190,
            "text" : "click map to get",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 



         icon_item = { 

                "id" :  3326,     
                "parent" : 5159,
                
                
                "text" : "3326 address",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_3326",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item)



        icon_item = { 

            "id" :  31729,     
            "parent" : 5159,
            
            
            "text" : "31729 lat-lng",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_31729",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)




            icon_item = { 

                "id" :  31727,     
                "parent" : 5159,
                
                
                "text" : "31727 lat-lng" + "<sup>multiple basemap</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_31727",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item)







/* = = = = sub folder = = = = Feature Layer = = = =  */
icon_item = { 
    "id" :  679,     
    "parent" : 4679,
    "text" : "Feature Layer",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 

            /* = = = = sub folder = = = = Feature Layer = = = =  */
            icon_item = { 
                "id" :  539,     
                "parent" : 679,
                "text" : "single select",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 

                        
                    icon_item = { 

                        "id" :  9391,     
                        "parent" : 539,
                        
                        
                        "text" : "9391 hover or click",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_9391",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 


                        icon_item = { 

                            "id" :  9006,     
                            "parent" : 539,
                            
                            
                            "text" : "9006 download",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_9006",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 




                            icon_item = { 

                                "id" :  2486,     
                                "parent" : 629,
                                
                                
                                "text" : "9006" + esri_svg + " single select",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_9006",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 


                        icon_item = { 

                            "id" :  9007,     
                            "parent" : 539,
                            
                            
                            "text" : "9007 googleMap as baseMap",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_9007",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 



                        icon_item = { 

                            "id" :  9341,     
                            "parent" : 539,
                            
                            
                            "text" : "9341 filter by",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_9341",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


                    
                            

                        icon_item = { 

                            "id" :  9370,     
                            "parent" : 539,
                            
                            
                            "text" : "9370 label & color",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_9370",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 







                                icon_item = { 

                                    "id" :  9362,     
                                    "parent" : 539,
                                    
                                    
                                    "text" : "9362 url attribute",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_9362",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item) 



                                icon_item = { 

                                    "id" :  9361,     
                                    "parent" : 539,
                                    
                                    
                                    "text" : "9361 attachment image",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_9361",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item) 




             /* = = = = sub folder = = = = Feature Layer = = = =  */
            icon_item = { 
                "id" :  538,     
                "parent" : 679,
                "text" : "multiple select",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 

                                                icon_item = { 

                                                    "id" :  5381,     
                                                    "parent" : 538,
                                                    
                                                    
                                                    "text" : "5381 click-2-select, again-unselect",
                                                    
                                                    "layer_name" : _layer_name_,
                                                    "icon" : open_new_tab_icon,
                                                    "link_type": "embed_5381",
                                                    "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                },
                                                                
                                                    "node_path" : _node_path_, 
                                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                    "server_path" : _map_server_url_,
                                                    "layer_id" :  _layer_id_,            
                                                    "type" : _type_
                                                    
                                                    
                                                    
                                                    };
                                                    
                                                    icon_flatjson.push(icon_item) 





                                                    icon_item = { 

                                                        "id" :  9117,     
                                                        "parent" : 629,
                                                        
                                                        
                                                        "text" : "5381" + esri_svg + " multiple select(click-select, again-unselect)",
                                                        
                                                        "layer_name" : _layer_name_,
                                                        "icon" : open_new_tab_icon,
                                                        "link_type": "embed_5381",
                                                        "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    },
                                                                    
                                                        "node_path" : _node_path_, 
                                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                        "server_path" : _map_server_url_,
                                                        "layer_id" :  _layer_id_,            
                                                        "type" : _type_
                                                        
                                                        
                                                        
                                                        };
                                                        
                                                        icon_flatjson.push(icon_item) 

/*   = = = =  end  = = = = sub folder = = = = Feature Layer = = = =  */







/* = = = = sub folder = = = = Feature Layer = = = =  */
            icon_item = { 
                "id" :  5127,     
                "parent" : 579,
                "text" : "hover",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 


            icon_item = { 

                            "id" :  6122,     
                            "parent" : 5127,
                            
                            
                            "text" : "6122 feature attribute",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_6122",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


            icon_item = { 

                            "id" :  6123,     
                            "parent" : 5127,
                            
                            
                            "text" : "6123 nearmap",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_6123",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 




  /* = = = = sub folder = = = = Feature Layer = = = =  */
            icon_item = { 
                "id" :  5129,     
                "parent" : 579,
                "text" : "click map to get",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 


            





             icon_item = { 

                            "id" :  6121,     
                            "parent" : 5129,
                            
                            
                            "text" : "6121 feature attribute",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_6121",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 



                            icon_item = { 

                            "id" :  5126,     
                            "parent" : 5129,
                            
                            
                            "text" : "5126 address (Esri)",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_5126",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 



                            icon_item = { 

                            "id" :  5136,     
                            "parent" : 5129,
                            
                            
                            "text" : "5136 address (Google vs. Esri vs. Microsoft)",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_5136",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


                           









                      







            /* = = = = sub folder = = = = Feature Layer = = = =  */
            icon_item = { 
                "id" :  5189,     
                "parent" : 5129,
                "text" : "lat-lng",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 






            icon_item = { 

                "id" :  5186,     
                "parent" : 5189,
                
                
                "text" : "5186 radio basemap" + "<sup>right</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_5186",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 


            icon_item = { 

                "id" :  5187,     
                "parent" : 5189,
                
                
                "text" : "5187 radio basemap" + "<sup>left</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_5187",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 


            icon_item = { 

                "id" :  5188,     
                "parent" : 5189,
                
                
                "text" : "5188 basemap gallery" + "<sup>on map</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_5188",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 










                
  /* = = = = sub folder = = = = Feature Layer = = = =  */
            icon_item = { 
                "id" :  5329,     
                "parent" : 579,
                "text" : "TEST your geo-service",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 

                  
                        icon_item = { 

                        "id" :  5328,     
                        "parent" : 5329,
                        
                        
                        "text" : "5328 GeoCode-Server",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_5328",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 




                        icon_item = { 

                        "id" :  5327,     
                        "parent" : 5329,
                        
                        
                        "text" : "5327 NA-Server(Network Analysis)",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_5327",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 




                        icon_item = { 

                        "id" :  5326,     
                        "parent" : 5329,
                        
                        
                        "text" : "5326 Multiple Stops (NA-Server)",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_5326",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 



/* = = = = sub folder = = = = MapImage Layer = = = =  */
icon_item = { 
    "id" :  339,     
    "parent" : 4679,
    "text" : "MapImage Layer",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 

                        
                    icon_item = { 

                        "id" :  3391,     
                        "parent" : 339,
                        
                        
                        "text" : "3391 clickable only",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_3391",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 


                        icon_item = { 

                            "id" :  3370,     
                            "parent" : 339,
                            
                            
                            "text" : "3370 label & color",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_3370",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 



                        icon_item = { 

                            "id" :  3341,     
                            "parent" : 339,
                            
                            
                            "text" : "3341 filter by",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_3341",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


                            icon_item = { 

                                "id" :  3347,     
                                "parent" : 339,
                                
                                
                                "text" : "3347 filter by & label & color",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_3347",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 

                    
                            

                     







/*   = = = =  end  = = = = sub folder = = = = MapImage Layer = = = =  */








/* = = = = sub folder = = = = Multiple Feature Layer only on this MapServer = = = =  */
icon_item = { 
    "id" :  839,     
    "parent" : 4679,
    "text" : "Multiple Feature Layer" + '<sup> only this MapServer</sup>',
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 


    icon_item = { 

        "id" :  9393,     
        "parent" : 839,
        
        
        "text" : "9393 single select",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "embed_9393",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item)



        icon_item = { 

            "id" :  9383,     
            "parent" : 839,
            
            
            "text" : "9383 color texture" + "<sup>" + "single select" + "</sup>",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_9383",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)




        icon_item = { 

            "id" :  9397,     
            "parent" : 839,
            
            
            "text" : "9397 multiple select",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "embed_9397",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item)

            
            icon_item = { 

                "id" :  9387,     
                "parent" : 839,
                
                
                "text" : "9387 overlap identify" + "<sup>" + "multiple select" + "</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_9387",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item)




/*  = = = =  end  = = = = sub folder = = = = Multiple Feature Layer only on this MapServer = = = =  */




/* = = = = sub folder = = = = Multiple Feature Layer on Entire Arcgis Server = = = =  */
icon_item = { 
    "id" :  439,     
    "parent" : 4679,
    "text" : "Multiple Feature Layer" + '<sup> Entire Arcgis Server</sup>',
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 

            icon_item = { 

                "id" :  9395,     
                "parent" : 439,
                
                
                "text" : "9395 single select",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_9395",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item)


                icon_item = { 

                    "id" :  9398,     
                    "parent" : 439,
                    
                    
                    "text" : "9398 multiple select",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "embed_9398",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item) 


/*  = = = =  end  = = = = sub folder = = = = Entire Arcgis Server = = = =  */


        


/*  = = = =  = = = = sub folder = = = = Download Map = = = =  */




icon_item = { 
    "id" :  629,     
    "parent" : 648,
    "text" : "one & handful",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 


          
icon_item = { 
    "id" :  358,     
    "parent" : 648,
    "text" : "massive",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 





            icon_item = { 
                "id" :  723,     
                "parent" : 358,
                "text" : "&#9634; square",
                "icon" : folder_icon,
                "link_type": "folder",   
                "state"       : {
                // use this opened line for always default open this folder
                                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            }
            };
            icon_flatjson.push(icon_item) 


      

                        icon_item = { 

                            "id" :  6323,     
                            "parent" : 723,
                            
                            
                            "text" : "6323 &#9634; 1x ",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_6323",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


                          
                            icon_item = { 

                                "id" :  6801,     
                                "parent" : 723,
                                
                                
                                "text" : "6801 select by uploaded polygon.geojson",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6801",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 


                                icon_item = { 

                                    "id" :  6803,     
                                    "parent" : 723,
                                    
                                    
                                    "text" : "6803 &#9986; split address into component" + "<sup>911</sup>",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6803",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item) 



                                   






                            icon_item = { 

                                "id" :  6325,     
                                "parent" : 358,
                                
                                
                                "text" : "6325 &#9711; circle",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_6325",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 



                                icon_item = { 

                                    "id" :  6327,     
                                    "parent" : 358,
                                    
                                    
                                    "text" : "6327 &#9665; polygon",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6327",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item) 






                                           
icon_item = { 
    "id" :  3652,     
    "parent" : 648,
    "text" : "entire",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 



                                                                            
                icon_item = { 
                    "id" :  374,     
                    "parent" : 3652,
                    "text" : microsoft_svg + " Microsoft",
                    "icon" : folder_icon,
                    "link_type": "folder",   
                    "state"       : {
                    // use this opened line for always default open this folder
                                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                }
                };
                icon_flatjson.push(icon_item) 





                icon_item = { 

                    "id" :  7452,     
                    "parent" : 374,
                    
                    
                    "text" : "7452 limited",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "embed_7452",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item) 



                     



                                     
icon_item = { 
    "id" :  357,     
    "parent" : 3652,
    "text" : google_svg + " Google",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 





 icon_item = { 

                            "id" :  7461,     
                            "parent" : 357,
                            
                            
                            "text" : "7461 &#9671; diamond &#9671;  point",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_7461",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 





                    icon_item = { 

                        "id" :  7453,     
                        "parent" : 357,
                        
                        
                        "text" : "7453 advanced marker",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_7453",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 



                        icon_item = { 

                            "id" :  7456,     
                            "parent" : 357,
                            
                            
                            "text" : "7456 unlimited advanced marker",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_7456",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


      

                        icon_item = { 

                            "id" :  7454,     
                            "parent" : 357,
                            
                            
                            "text" : "7454 old marker",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_7454",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 


                            icon_item = { 

                            "id" :  7458,     
                            "parent" : 357,
                            
                            
                            "text" : "7458 unlimited old marker",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_7458",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item) 



                            icon_item = { 

                                "id" :  7455,     
                                "parent" : 357,
                                
                                
                                "text" : "7455 &#9986; split address into component" + "<sup>911</sup>",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_7455",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item) 


/*  = = = =  = = = = sub folder = = = = Download Map = = = =  */



icon_item = { 
    "id" :  649,     
    "parent" : 648,
    "text" : "geojson viewer",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 





            icon_item = { 

                "id" :  6885,     
                "parent" : 649,
                
                
                "text" : "6885" + esri_svg,
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_6885",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 




                icon_item = { 

                    "id" :  6883,     
                    "parent" : 649,
                    
                    
                    "text" : "6883 mapbox (official)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "embed_6883",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item) 





                    icon_item = { 

                        "id" :  6887,     
                        "parent" : 649,
                        
                        
                        "text" : "6887 new" + google_svg,
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6887",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 




                    icon_item = { 

                        "id" :  6888,     
                        "parent" : 649,
                        
                        
                        "text" : "6888 old" + google_svg,
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6888",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item) 

/*  = = = =  end  = = = = sub folder = = = = Download Map = = = =  */













/*  = = = =  = = = = sub folder = = = = esri official viewer= = = =  */


icon_item = { 
    "id" :  588,     
    "parent" : 589,
    "text" : "Map Viewer",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 


                                
                                            icon_item = { 

                                                "id" :  3957,     
                                                "parent" : 588,
                                                
                                                
                                                "text" : "3957 (2021.4-now) js-api-v4.x",
                                                
                                                "layer_name" : _layer_name_,
                                                "icon" : open_new_tab_icon,
                                                "link_type": "embed_3957",
                                                "state"       : {
                                                                "opened"    : true,  // is the node open
                                                                // disabled  : boolean  // is the node disabled
                                                                // "selected"  : true   // is the node selected
                                                            },
                                                            
                                                "node_path" : _node_path_, 
                                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                "server_path" : _map_server_url_,
                                                "layer_id" :  _layer_id_,            
                                                "type" : _type_
                                                
                                                
                                                
                                                };
                                                
                                                icon_flatjson.push(icon_item)




                                                icon_item = { 

                                                    "id" :  3955,     
                                                    "parent" : 588,
                                                    
                                                    
                                                    "text" : "3955 classic (1982-2021) js-api-v3.x",
                                                    
                                                    "layer_name" : _layer_name_,
                                                    "icon" : open_new_tab_icon,
                                                    "link_type": "embed_3955",
                                                    "state"       : {
                                                                    "opened"    : true,  // is the node open
                                                                    // disabled  : boolean  // is the node disabled
                                                                    // "selected"  : true   // is the node selected
                                                                },
                                                                
                                                    "node_path" : _node_path_, 
                                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                    "server_path" : _map_server_url_,
                                                    "layer_id" :  _layer_id_,            
                                                    "type" : _type_
                                                    
                                                    
                                                    
                                                    };
                                                    
                                                    icon_flatjson.push(icon_item)



                                                    icon_item = { 

                                                        "id" :  3953,     
                                                        "parent" : 588,
                                                        
                                                        
                                                        "text" : "3953 all layers (MapServer)",
                                                        
                                                        "layer_name" : _layer_name_,
                                                        "icon" : open_new_tab_icon,
                                                        "link_type": "embed_3953",
                                                        "state"       : {
                                                                        "opened"    : true,  // is the node open
                                                                        // disabled  : boolean  // is the node disabled
                                                                        // "selected"  : true   // is the node selected
                                                                    },
                                                                    
                                                        "node_path" : _node_path_, 
                                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                                        "server_path" : _map_server_url_,
                                                        "layer_id" :  _layer_id_,            
                                                        "type" : _type_
                                                        
                                                        
                                                        
                                                        };
                                                        
                                                        icon_flatjson.push(icon_item)




/*  = = = =  = = = = sub folder = = = = esri official endpoint= = = =  */


icon_item = { 
    "id" :  578,     
    "parent" : 589,
    "text" : "endpoint",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 



                                icon_item = { 

                                    "id" :  6421,     
                                    "parent" : 578,
                                    
                                    
                                    "text" : '6421 layer ' + webpage_svg + ' web page',
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6421",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                    icon_item = { 

                                    "id" :  6422,     
                                    "parent" : 578,
                                    
                                    
                                    "text" : '6422 layer ' + json_svg + ' json',
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6422",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)


                                     icon_item = { 

                                    "id" :  6423,     
                                    "parent" : 578,
                                    
                                    
                                    "text" : '6423 query layer',
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6423",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)


                                    icon_item = { 

                                    "id" :  6424,     
                                    "parent" : 578,
                                    
                                    
                                    "text" : '6424 query layer attachment',
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6424",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                    icon_item = { 

                                        "id" :  6425,     
                                        "parent" : 578,
                                        
                                        
                                        "text" : '6425 MapServer ' + webpage_svg + ' web page' + "<sup style='font-size:7px'>multiple layers</sup>",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_6425",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)


                                         icon_item = { 

                                        "id" :  6426,     
                                        "parent" : 578,
                                        
                                        
                                        "text" : '6426 MapServer ' + json_svg + ' json' + "<sup style='font-size:7px'>multiple layers</sup>",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_6426",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)



                                        
                                        
                                        
                                       


                                        icon_item = { 

                                            "id" :  6427,     
                                            "parent" : 578,
                                            
                                            
                                            "text" : '6427 home-root ' + webpage_svg + ' web page',
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_6427",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)



                                             icon_item = { 

                                            "id" :  6428,     
                                            "parent" : 578,
                                            
                                            
                                            "text" : '6428 home-root ' + json_svg + ' json',
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_6428",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)




                                            /*  = = = =  = = = = sub folder = = = = esri official endpoint= = = =  */


icon_item = { 
    "id" :  896,     
    "parent" : 589,
    "text" : "download file",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 



                                icon_item = { 

                                    "id" :  8967,     
                                    "parent" : 896,
                                    
                                    
                                    "text" : "8967 Google Earth kmz file",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8967",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                    icon_item = { 

                                        "id" :  8966,     
                                        "parent" : 896,
                                        
                                        
                                        "text" : "8966 ArcMap layer definition file",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_8966",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)



                                        icon_item = { 

                                            "id" :  8963,     
                                            "parent" : 896,
                                            
                                            
                                            "text" : "8963 ArcPro project package file",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8963",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)









                                            

                               
/* = = = = sub folder = = = = y e lp poi = = = =  */
icon_item = { 
    "id" :  328,     
    "parent" : 327,
    "text" : yelp_svg + " Yelp POI (free)", 
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 






           



  /* = = = = sub folder = = = = yelp poi download   = = = = */
icon_item = { 
    "id" :  6501,     
    "parent" : 328,
    "text" : "pan & zoom",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 





                                        icon_item = { 

                                            "id" :  8348,     
                                            "parent" : 6501,
                                            
                                            "text" : "8348 category",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8348",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)



                                            icon_item = { 

                                            "id" :  8358,     
                                            "parent" : 6501,
                                            
                                            "text" : "8358 category + streetView",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8358",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)



                                        icon_item = { 

                                            "id" :  8342,     
                                            "parent" : 6501,
                                            
                                            "text" : "8342 keywords",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8342",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)





                                             icon_item = { 

                                            "id" :  8352,     
                                            "parent" : 6501,
                                            
                                            "text" : "8352 keyword + streetView",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8352",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)



                                          
                                            icon_item = { 
                                            "id" :  8301,     
                                            "parent" : 6501,
                                            "text" : "Police dept 8301",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8301",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8302,     
                                            "parent" : 6501,
                                            "text" : "Jails & Prisons 8302",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8302",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8303,     
                                            "parent" : 6501,
                                            "text" : "Court Houses 8303",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8303",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8304,     
                                            "parent" : 6501,
                                            "text" : "Hospitals 8304",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8304",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8305,     
                                            "parent" : 6501,
                                            "text" : "Medical Centers 8305",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8305",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8306,     
                                            "parent" : 6501,
                                            "text" : "Emergency Rooms 8306",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8306",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8307,     
                                            "parent" : 6501,
                                            "text" : "Urgent Care 8307 ",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8307",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)
            
            

                                            icon_item = { 
                                            "id" :  8321,     
                                            "parent" : 6501,
                                            "text" : "Hostels 8321",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8321",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)


                                            icon_item = { 
                                            "id" :  8322,     
                                            "parent" : 6501,
                                            "text" : "Resorts 8322",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8322",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)

                                            icon_item = { 
                                            "id" :  8323,     
                                            "parent" : 6501,
                                            "text" : "Vacation Rentals 8323",
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_8323",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            };
                                            icon_flatjson.push(icon_item)


           


/* = = = = sub folder = = = = y elp poi download   = = = = */
icon_item = { 
"id" :  6500,     
"parent" : 328,
"text" : "draw circle",
"icon" : folder_icon,
"link_type": "folder",   
"state"       : {
// use this opened line for always default open this folder
                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }
};
icon_flatjson.push(icon_item) 




            icon_item = { 

                "id" :  8345,     
                "parent" : 6500,
                
                "text" : "8345 category",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "embed_8345",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item)



                icon_item = { 

                    "id" :  8343,     
                    "parent" : 6500,
                    
                    "text" : "8343 keyword",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "embed_8343",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item)




          


/* = = = = sub folder = = = = yelp poi download   = = = = */
icon_item = { 
    "id" :  6503,     
    "parent" : 328,
    "text" : "manual search",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 


                            icon_item = { 

                                "id" :  8231,     
                                "parent" : 6503,
                                
                                "text" : "8231 keyword",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8231",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                                 icon_item = { 

                                "id" :  8251,     
                                "parent" : 6503,
                                
                                "text" : "8251 keyword + streetView",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8251",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)


                               

                                icon_item = { 

                                "id" :  8233,     
                                "parent" : 6503,
                                
                                "text" : "8233 category",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8233",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                                 icon_item = { 

                                "id" :  8253,     
                                "parent" : 6503,
                                
                                "text" : "8253 category + streetView",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8253",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                                    icon_item = { 

                                        "id" :  8341,     
                                        "parent" : 6503,
                                        
                                        "text" : "8341 direction",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_8341",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)



    icon_item = { 
        "id" :  5348,     
        "parent" : 328,
        "text" : yelp_svg + " category list",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "embed_5348",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item)


                                
                  








/* = = = = sub folder = = = = apple poi = = = =  */
icon_item = { 
"id" :  3284,     
"parent" : 327,
"text" : apple_svg + "Apple POI (free)",
"icon" : folder_icon,
"link_type": "folder",   
"state"       : {
// use this opened line for always default open this folder
                "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }
};
icon_flatjson.push(icon_item)






                                     




/* = = = = sub folder = = = = g o o g l e p o i = = = =  */
icon_item = { 
    "id" :  3280,     
    "parent" : 327,
    "text" : google_svg + " Google POI" + paypal_svg + visa_svg + mastercard_svg,
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item)






/* = = = = sub folder = = = = g o o g l e p o i = = = =  */
        icon_item = { 
            "id" :  3186,     
            "parent" : 3280,
            "text" : "pan & zoom",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item)








                    icon_item = { 
                        "id" :  3286,     
                        "parent" : 3186,
                        "text" : "everything (category optional)",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item)





                                icon_item = { 

                                    "id" :  3827,     
                                    "parent" : 3286,
                                    
                                    "text" : "3827 pin marker (default)",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3827",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                icon_item = { 

                                    "id" :  3837,     
                                    "parent" : 3286,
                                    
                                    "text" : "3837 label",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3837",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)




                                     icon_item = { 

                                    "id" :  3847,     
                                    "parent" : 3286,
                                    
                                    "text" : "3847 photo",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3847",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)






                                    icon_item = { 

                                    "id" :  3857,     
                                    "parent" : 3286,
                                    
                                    "text" : "3857 street view",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3857",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)


                                    icon_item = { 

                                    "id" :  3887,     
                                    "parent" : 3286,
                                    
                                    "text" : "3887 street view + photo",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3887",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                    icon_item = { 
                                    "id" :  3901,     
                                    "parent" : 3286,
                                    "text" : "police 3901",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3901",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                     icon_item = { 
                                    "id" :  3902,     
                                    "parent" : 3286,
                                    "text" : "courthouse 3902",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3902",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3904,     
                                    "parent" : 3286,
                                    "text" : "motel 3904",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3904",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3905,     
                                    "parent" : 3286,
                                    "text" : "hotel 3905",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3905",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3906,     
                                    "parent" : 3286,
                                    "text" : "inn 3906",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3906",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3907,     
                                    "parent" : 3286,
                                    "text" : "hospital 3907",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3907",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3908,     
                                    "parent" : 3286,
                                    "text" : "bar 3908",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3908",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3909,     
                                    "parent" : 3286,
                                    "text" : "bar_and_grill 3909",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3909",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    icon_item = { 
                                    "id" :  3910,     
                                    "parent" : 3286,
                                    "text" : "night_club 3910",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3910",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)







                                    




                    icon_item = { 
                        "id" :  3386,     
                        "parent" : 3186,
                        "text" : "keyword required (donut marker)",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item)






                                    icon_item = { 

                                        "id" :  3832,     
                                        "parent" : 3386,
                                        
                                        "text" : "3832 default",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_3832",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)


                                     icon_item = { 

                                        "id" :  3842,     
                                        "parent" : 3386,
                                        
                                        "text" : "3842 photo",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_3842",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)



                                        
                                    icon_item = { 

                                        "id" :  3852,     
                                        "parent" : 3386,
                                        
                                        "text" : "3852 street view",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_3852",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)





                                         icon_item = { 

                                        "id" :  3862,     
                                        "parent" : 3386,
                                        
                                        "text" : "3862 street view + photo",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_3862",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)




                                         icon_item = { 

                                        "id" :  3903,     
                                        "parent" : 3386,
                                        
                                        "text" : "jail 3903",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_3903",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)








                  














            

    /* = = = = sub folder = = = = g o o g l e p o i = = = =  */
    icon_item = { 
        "id" :  3289,     
        "parent" : 3280,
        "text" : "draw",
        "icon" : folder_icon,
        "link_type": "folder",   
        "state"       : {
        // use this opened line for always default open this folder
                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };
    icon_flatjson.push(icon_item)



        /* = = = = sub folder = = = = g o o g l e p o i = = = =  */
        icon_item = { 
            "id" :  3287,     
            "parent" : 3289,
            "text" : "everything (category optional)",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item)



                      icon_item = { 

                                "id" :  3820,     
                                "parent" : 3287,
                                
                                "text" : "3820 auto",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_3820",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                    icon_item = { 

                                "id" :  3816,     
                                "parent" : 3287,
                                
                                "text" : "3816 16x320",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_3816",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)




                    icon_item = { 

                                "id" :  3834,     
                                "parent" : 3287,
                                
                                "text" : "3834 4x80",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_3834",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                            icon_item = { 

                                "id" :  3835,     
                                "parent" : 3287,
                                
                                "text" : "3835 1x20",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_3835",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)





 /* = = = = sub folder = = = = g o o g l e p o i = = = =  */
        icon_item = { 
            "id" :  3317,     
            "parent" : 3289,
            "text" : "keyword required (square)",
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item)


                            icon_item = { 

                                "id" :  3126,     
                                "parent" : 3317,
                                
                                "text" : "3126 1x20",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_3126",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)





  /* = = = = sub folder = = = = g o o g l e p o i = = = =  */


  icon_item = { 
    "id" :  3379,     
    "parent" : 3280,
    "text" : "manual search",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item)









             


    icon_item = { 
        "id" :  3275,     
        "parent" : 3379,
        "text" : "everything (category optional)",
        "icon" : folder_icon,
        "link_type": "folder",   
        "state"       : {
        // use this opened line for always default open this folder
                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };
    icon_flatjson.push(icon_item)




                                    icon_item = { 

                                    "id" :  3817,     
                                    "parent" : 3275,
                                    
                                    "text" : "3817 default",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3817",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)


                                    icon_item = { 

                                    "id" :  3867,     
                                    "parent" : 3275,
                                    
                                    "text" : "3867 label",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3867",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)





                                     icon_item = { 

                                    "id" :  3897,     
                                    "parent" : 3275,
                                    
                                    "text" : "3897 photo",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3897",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)








                                     icon_item = { 

                                    "id" :  3877,     
                                    "parent" : 3275,
                                    
                                    "text" : "3877 street view",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3877",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)




                                    
                                     icon_item = { 

                                    "id" :  3875,     
                                    "parent" : 3275,
                                    
                                    "text" : "3875 street view + photo",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3875",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                    




                                      



   icon_item = { 
    "id" :  3479,     
    "parent" : 3379,
    "text" : "keyword required",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item)





                                icon_item = { 

                                    "id" :  3829,     
                                    "parent" : 3479,
                                    
                                    "text" : "3829 default",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3829",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)

                   
                                    icon_item = { 

                                    "id" :  3869,     
                                    "parent" : 3479,
                                    
                                    "text" : "3869 label",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3869",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                     icon_item = { 

                                    "id" :  3849,     
                                    "parent" : 3479,
                                    
                                    "text" : "3849 photo",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3849",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                     icon_item = { 

                                    "id" :  3859,     
                                    "parent" : 3479,
                                    
                                    "text" : "3859 street view",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3859",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)




                                     icon_item = { 

                                    "id" :  3839,     
                                    "parent" : 3479,
                                    
                                    "text" : "3839 street view + photo",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_3839",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)




                                                    
                    icon_item = { 
                        "id" :  4347,     
                        "parent" : 3280,
                        "text" : google_svg + " category list",
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_4347",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                    };
                    icon_flatjson.push(icon_item)




        



/* = = = = sub folder = = = = m i crosoft poi = = = =  */
icon_item = { 
    "id" :  7281,     
    "parent" : 327,
    "text" : microsoft_svg + "&nbsp;" + "Microsoft POI" + visa_svg + mastercard_svg,
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 










       /* = = = = sub folder = = = = m i crosoft poi download   = = = = */
                icon_item = { 
                    "id" :  3285,     
                    "parent" : 7281,
                    "text" : "pan & zoom",
                    "icon" : folder_icon,
                    "link_type": "folder",   
                    "state"       : {
                    // use this opened line for always default open this folder
                                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                }
                };
                icon_flatjson.push(icon_item) 


                               



                                
                                icon_item = { 

                                    "id" :  7510,     
                                    "parent" : 3285,
                                    
                                    "text" : "7510 everything",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_7510",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)




                                icon_item = { 

                                    "id" :  8522,     
                                    "parent" : 3285,
                                    
                                    "text" : "8522 by keyword",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8522",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)




                                    icon_item = { 

                                    "id" :  6533,     
                                    "parent" : 3285,
                                    
                                    "text" : "6533 by category",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_6533",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)
                                  




                                   // police
                                   icon_item = { 
                                    "id" :  7322,     
                                    "parent" : 3285,
                                    "text" : "Police Dept,Station(7322)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_7322",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)


                                    // Prison Jail Correction
                                   icon_item = { 
                                    "id" :  9154,     
                                    "parent" : 3285,
                                    "text" : "Prison,Jail,Correction(9154)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_9154",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)


                                    // Courthouse
                                   icon_item = { 
                                    "id" :  9363,     
                                    "parent" : 3285,
                                    "text" : "Courthouse, Law Court(9154)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_9363",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)




                                   // Hospital
                                   icon_item = { 
                                    "id" :  7321,     
                                    "parent" : 3285,
                                    "text" : "Hospital(7321)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_7321",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)

                                    // Emergency Room
                                   icon_item = { 
                                    "id" :  9956,     
                                    "parent" : 3285,
                                    "text" : "Emergency Room(9956)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_9956",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)


                                   // Emergency Medical Service
                                   icon_item = { 
                                    "id" :  7391,     
                                    "parent" : 3285,
                                    "text" : "Emergency Medical Service(7391)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_7391",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)



                                    // motel
                                   icon_item = { 
                                    "id" :  7314,     
                                    "parent" : 3285,
                                    "text" : "Hotel,Motel,Inn(7314)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_7314",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)


                                   // Nightlife
                                   icon_item = { 
                                    "id" :  9379,     
                                    "parent" : 3285,
                                    "text" : "Nightlife(9379)",
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_9379",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    icon_flatjson.push(icon_item)










/* = = = = sub folder = = = = m i crosoft poi download   = = = = */
icon_item = { 
    "id" :  3299,     
    "parent" : 7281,
    "text" : "draw circle",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 






                
    /* = = = = sub folder = = = = m i crosoft poi download   = = = = */
    icon_item = { 
        "id" :  3281,     
        "parent" : 3299,
        "text" : "everything",
        "icon" : folder_icon,
        "link_type": "folder",   
        "state"       : {
        // use this opened line for always default open this folder
                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };
    icon_flatjson.push(icon_item) 





                  icon_item = { 

                                "id" :  8520,     
                                "parent" : 3281,
                                
                                "text" : "8520 auto",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8520",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                 icon_item = { 

                                "id" :  8516,     
                                "parent" : 3281,
                                
                                "text" : "8516 16x1600",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8516",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                            icon_item = { 

                                "id" :  8504,     
                                "parent" : 3281,
                                
                                "text" : "8504 4x400",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_8504",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                
                                
                                
                                };
                                
                                icon_flatjson.push(icon_item)



                                icon_item = { 

                                    "id" :  8527,     
                                    "parent" : 3281,
                                    
                                    "text" : "8527 1x100",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8527",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)






               /* = = = = sub folder = = = = m i crosoft poi download   = = = = */





icon_item = { 
    "id" :  4276,     
    "parent" : 7281,
    "text" : "manual search",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 




                                icon_item = { 

                                    "id" :  8523,     
                                    "parent" : 4276,
                                    
                                    "text" : "8523 by category",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8523",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)


                                     icon_item = { 

                                    "id" :  8533,     
                                    "parent" : 4276,
                                    
                                    "text" : "8533 by keyword",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8533",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)





                                    icon_item = { 

                                    "id" :  8513,     
                                    "parent" : 4276,
                                    
                                    "text" : "8513 everything",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8513",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)



                                    icon_item = { 

                                    "id" :  8526,     
                                    "parent" : 4276,
                                    
                                    "text" : "8526 everything x4",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_8526",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item)





    icon_item = { 
        "id" :  4348,     
        "parent" : 7281,
        "text" : microsoft_svg + " category list",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "embed_4348",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item)



         






/* = = = = sub folder = = = = e sri poi = = = =  */
icon_item = { 
    "id" :  3283,     
    "parent" : 327,
    "text" : esri_svg + "  Esri POI" + visa_svg + mastercard_svg ,
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 



                                    icon_item = { 

                                        "id" :  2739,     
                                        "parent" : 3283,
                                        
                                        "text" : "2739 pan & zoom",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_2739",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item)




                                        icon_item = { 

                                            "id" :  2737,     
                                            "parent" : 3283,
                                            
                                            "text" : "2737 draw circle",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_2737",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)




                                            
/*  = = = =  = = = = sub folder = = = =  = = = =  */


icon_item = { 
    "id" :  476,     
    "parent" : 327,
    "text" : "click map show POI",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 




                   


                                                    
        /*  = = = =  = = = = sub folder = = = =  = = = =  */



        icon_item = { 
            "id" :  4761,     
            "parent" : 476,
            "text" : google_svg + paypal_svg + visa_svg + mastercard_svg,
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 







                   icon_item = { 

                        "id" :  4766796,     
                        "parent" : 4761,
                        
                        
                        "text" : "6796 compare",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6796",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)



                    icon_item = { 

                        "id" :  6795,     
                        "parent" : 4761,
                        
                        
                        "text" : "6795 street view",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6795",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)


                    icon_item = { 

                        "id" :  6794,     
                        "parent" : 4761,
                        
                        
                        "text" : "6794 photo",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6794",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)


                        icon_item = { 

                        "id" :  6791,     
                        "parent" : 4761,
                        
                        
                        "text" : "6791 photo + street view",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6791",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)

                      



                                                    
        /*  = = = =  = = = = sub folder = = = =  = = = =  */



        icon_item = { 
            "id" :  4762,     
            "parent" : 476,
            "text" : microsoft_svg,
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 





                    icon_item = { 

                        "id" :  4763326,     
                        "parent" : 4762,
                        
                        
                        "text" : "3326",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_3326",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)

                             





                                                    
        /*  = = = =  = = = = sub folder = = = =  = = = =  */


        icon_item = { 
            "id" :  4764,     
            "parent" : 476,
            "text" : esri_svg,
            "icon" : folder_icon,
            "link_type": "folder",   
            "state"       : {
            // use this opened line for always default open this folder
                            "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
        };
        icon_flatjson.push(icon_item) 




                         icon_item = { 

                        "id" :  4765136,     
                        "parent" : 4764,
                        
                        
                        "text" : "5136 compare",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_5136",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)


                         icon_item = { 

                        "id" :  4765126,     
                        "parent" : 4764,
                        
                        
                        "text" : "5126",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_5126",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)



/*  = = = =  = = = = sub folder = = = = speed limit = = = =  */


icon_item = { 
    "id" :  3172,     
    "parent" : 327,
    "text" : "Speed Limit" + speed_limit_svg,
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 


                    




                    icon_item = { 

                        "id" :  31728,     
                        "parent" : 3172,
                        
                        
                        "text" : "31728" + microsoft_svg,
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_31728",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)
                            




                        icon_item = { 

                                    "id" :  31720,     
                                    "parent" : 3172,
                                    
                                    
                                    "text" : "31720 Here (by map view)",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "embed_31720",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    
                                    
                                    
                                    };
                                    
                                    icon_flatjson.push(icon_item) 
                    
                    
                    
                                    icon_item = { 
                    
                                        "id" :  31722,     
                                        "parent" : 3172,
                                        
                                        
                                        "text" : "31722 Here (by route)",
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "embed_31722",
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        
                                        
                                        
                                        };
                                        
                                        icon_flatjson.push(icon_item) 
                    
                    
                    
                                        icon_item = { 
                    
                                            "id" :  31724,     
                                            "parent" : 3172,
                                            
                                            
                                            "text" : "31724 Here (by lat lng)",
                                            
                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "embed_31724",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_
                                            
                                            
                                            
                                            };
                                            
                                            icon_flatjson.push(icon_item)




                   
icon_item = { 
    "id" :  5372,     
    "parent" : 327,
    "text" : "One Way" + one_way_svg,
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 




                    icon_item = { 

                        "id" :  61728,     
                        "parent" : 5372,
                        
                        
                        "text" : "6390" + google_svg,
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "embed_6390",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        icon_flatjson.push(icon_item)
                            
 
                    


                        icon_item = { 

                            "id" :  61726,     
                            "parent" : 5372,
                            
                            
                            "text" : "31729" + microsoft_svg,
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "embed_31729",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            icon_flatjson.push(icon_item)
                    

/*  = = = =  = = = =  end = = = = sub folder = = = = speed limit = = = =  */



/*  = = = =  = = = = sub folder = = = = Download Map = = = =  */


icon_item = { 
    "id" :  3271,     
    "parent" : 327,
    "text" : "POI geojson viewer",
    "icon" : folder_icon,
    "link_type": "folder",   
    "state"       : {
    // use this opened line for always default open this folder
                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
};
icon_flatjson.push(icon_item) 





icon_item = { 

    "id" :  32785,     
    "parent" : 3271,
    
    
    "text" : "6885" + esri_svg,
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "embed_6885",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 




icon_item = { 

    "id" :  32783,     
    "parent" : 3271,
    
    
    "text" : "6883 mapbox (official)",
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "embed_6883",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 




    
    icon_item = { 

        "id" :  32787,     
        "parent" : 3271,
        
        
        "text" : "6887 new" + google_svg,
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "embed_6887",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 



    icon_item = { 

        "id" :  32788,     
        "parent" : 3271,
        
        
        "text" : "6888 old" + google_svg,
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "embed_6888",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 

/*  = = = =  end  = = = = sub folder = = = = Download Map = = = =  */









                /* = = = = sub folder = = = = here poi = = = =  */
                icon_item = { 
                    "id" :  3282,     
                    "parent" : 327,
                    "text" : "Here POI",
                    "icon" : folder_icon,
                    "link_type": "folder",   
                    "state"       : {
                    // use this opened line for always default open this folder
                                    "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                }
                };
                icon_flatjson.push(icon_item) 



                icon_item = { 

                    "id" :  8237,     
                    "parent" : 3282,
                    
                    "text" : "8237 basemap",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "embed_8237",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item)



               





        /*  = = = =  end  = = = =  = = = = sub folder = = = = POI ( Point Of Interest ) = = = =  */


        








/**/
// --- end  ---  = = = = Embed this map in your website = = = =
/**/






// = = = = apple = = = =
              


icon_item = { 

"id" :  1020000,     
"parent" : 10200,


"text" : "a0 hoverable data only",

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "apple_a0",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  1020001,     
"parent" : 10200,


"text" : "a0p hoverable data only (zoomable point)",

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "apple_a0p",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  1020020,     
"parent" : 10200,


"text" : "a20 hoverable data + tile",

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "apple_a20",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  1020021,     
"parent" : 10200,


"text" : "a20p hoverable data + tile (zoomable point)",

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "apple_a20p",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  10200120,     
"parent" : 10200,


"text" : "a120 clickable tile",

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "apple_a120",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 

//  = = = = end = = = = apple = = = =
/**/




// = = = = bing = = = =



      


        icon_item = { 

            "id" :  20000,     
            "parent" : 200,

        
            "text" : "b0 hoverable data only",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b0",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item) 


        icon_item = { 

            "id" :  20001,     
            "parent" : 200,

        
            "text" : "b0 [card]",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b0c",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item) 
       

        icon_item = { 

            "id" :  20010,     
            "parent" : 200,

        
            "text" : "b10 hoverable data + image",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b10",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item) 




        icon_item = { 

            "id" :  200101,     
            "parent" : 200,

        
            "text" : "b10 [card]",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b10c",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item) 


        icon_item = { 

            "id" :  20020,     
            "parent" : 200,

        
            "text" : "b20 hoverable data + tile",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b20",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item)



     




       




        icon_item = { 

            "id" :  200110,     
            "parent" : 200,

        
            "text" : "b110 clickable image",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b110",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item)


        icon_item = { 

            "id" :  200120,     
            "parent" : 200,

        
            "text" : "b120 clickable tile",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "bing_b120",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_


        
        };

        icon_flatjson.push(icon_item)



        

//  = = = = end = = = = bing = = = =
/**/



// = = = = here = = = =

  




  
    icon_item = { 

        "id" :  70000,     
        "parent" : 700,
        "text" : "h0 hoverable data only",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h0",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };

    icon_flatjson.push(icon_item) 


    icon_item = { 

        "id" :  70001,     
        "parent" : 700,
        "text" : "h0 [card]",

        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h0c",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };

    icon_flatjson.push(icon_item) 



    icon_item = { 

        "id" :  70010,     
        "parent" : 700,
        "text" : "h10 hoverable data + image",

        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h10",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };
    icon_flatjson.push(icon_item) 

    icon_item = { 

        "id" :  700101,     
        "parent" : 700,
        "text" : "h10 [card]",

        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h10",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };
    icon_flatjson.push(icon_item) 





    icon_item = { 

        "id" :  70020,     
        "parent" : 700,
        "text" : "h20 hoverable data + tile",

        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h20",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };
    icon_flatjson.push(icon_item) 

   





    icon_item = { 

        "id" :  700110,     
        "parent" : 700,
        "text" : "h110 clickable image",

        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h110",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };
    icon_flatjson.push(icon_item) 

    icon_item = { 

        "id" :  700120,     
        "parent" : 700,
        "text" : "h120 clickable tile",

        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "here_h120",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_


    
    };
    icon_flatjson.push(icon_item) 


//  = = = = end = = = = here = = = =
/**/

// = = = = mapbox = = = =







icon_item = {
"id" :  30000,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m0 hoverable data only",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m0",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
"id" :  30001,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m0 [card]",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m0c",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 



icon_item = {
"id" :  30010,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m10 hoverable data + image",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m10",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
"id" :  300101,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m10 [card]",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m10c",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 




icon_item = {
"id" :  30020,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m20 hoverable data + tile",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m20",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 








icon_item = {
"id" :  300110,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m110 clickable image",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m110",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item)

icon_item = {
"id" :  300120,     
"parent" : 300,
//"text" : layer_item.type + " (CORS)",
"text" : "m120 clickable tile",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "mapbox_m120",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item)


//  = = = = end = = = = mapbox = = = =
/**/









// ...  ... google top frame ...  ...      



icon_item = { 

"id" :  10202,     
"parent" : 102222,
"text" : "hoverable <sup>featureData + mapImage + tile</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened":  iconJstreeNodeOpened, 
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 




             
icon_item = { 

    "id" :  212,     
    "parent" : 102222,
    "text" : "clickable image and tile <sup>FeatureServer not supported</sup>",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened":  iconJstreeNodeOpened, 
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
    
    
    };
    
    icon_flatjson.push(icon_item) 
    



                           
icon_item = { 

    "id" :  100400,     
    "parent" : 102222,
    "text" : "classified" + "<sup><mark> esri-token</mark></sup><sub>printPDF</sub>",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened":  iconJstreeNodeOpened, 
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
    
    
    };
    
    icon_flatjson.push(icon_item) 
    
    


icon_item = { 

"id" :  100,     
"parent" : 102222,
"text" : "color and label",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  110,     
"parent" : 102222,
"text" : "multilayer limit on this MapServer",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item)

  
icon_item = { 

    "id" :  1103000,     
    "parent" : 102222,
    "text" : "spatial relation <sup>multilayer limit on this MapServer</sup>",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened": iconJstreeNodeOpened,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
    
    
    };
    
    icon_flatjson.push(icon_item) 
    


icon_item = { 

"id" :  120,     
"parent" : 102222,
"text" : "multilayer AnyWhere",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item)







// ... end  ... google top frame...  ...               





































// = = = = google = = = =  single layer  = = = =   = = = = 







icon_item = {
    "id" :  100000,     
    "parent" : 10202,
    "text" : '0 FeatureData + MapImage <sup><mark> esri-token</mark></sup><sub>printPDF</sub>',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_0",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)
    
    
    icon_item = { 
    "id" :  100001,     
    "parent" : 10202,
    "text" : '0 [card]',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_0c",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    







    icon_item = {
        "id" :  3290110,     
        "parent" : 212,
        "text" : '110 MapImage-based Route-Direction Address Elevation ' + '<sup><mark> esri-token</mark></sup>',
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "google_110",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
         "node_path" : _node_path_, 
         "absolute_path" : _map_server_url_ + '/' + _layer_id_,
         "server_path" : _map_server_url_,
         "layer_id" :  _layer_id_,            
         "type" : _type_
        };
        icon_flatjson.push(icon_item) 
        
        
        
        icon_item = {
        "id" :  3290120,     
        "parent" : 212,
        "text" : '120 tile-based Route-Direction Address Elevation ' + '<sup><mark> esri-token</mark></sup>',
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "google_120",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)



icon_item = {
    "id" :  2981,     
    "parent" : 212,
    "text" : '210 MapImage-based <span style="font-weight:900">overlap-identifier</span> <sup><mark> esri-token</mark></sup>',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_210",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)
    



icon_item = {
    "id" :  2982,     
    "parent" : 212,
    "text" : '220 tile-based <span style="font-weight:900">overlap-identifier</span> <sup><mark> esri-token</mark></sup>',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_220",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)






    
    


icon_item = {
    "id" :  212201,     
    "parent" : 212,
    "text" : '201 address intersect layer<sup>image</sup>',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_201",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)
    


    icon_item = {
        "id" :  212202,     
        "parent" : 212,
        "text" : '202 address intersect layer<sup>tile</sup>',
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "google_202",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)
        
    



        icon_item = {
            "id" :  212230,     
            "parent" : 212,
            "text" : '230 Nearmap',
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "google_230",
            "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            };
            icon_flatjson.push(icon_item)
    

            icon_item = {
                "id" :  212232,     
                "parent" : 212,
                "text" : '232 Esri Imagery vs Google',
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "google_232",
                "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                };
                icon_flatjson.push(icon_item)




icon_item = {
"id" :  10222210,     
"parent" : 10202,
"text" : '10 browser side rendering original data color style<sup>best for featureServer featureLayer</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_10",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 


icon_item = {
"id" :  102222101,     
"parent" : 10202,
"text" : '710 browser side labeling with original data color style<sup>best for featureServer featureLayer</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_710",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 



icon_item = {
    "id" :  10202101,     
    "parent" : 10202,
    "text" : '101 address intersect layer <sup>data only</sup>',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_101",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    










icon_item = { 

"id" :  100917,     
"parent" : 10202,


  "text" : '917 pop-up',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_917",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 











icon_item = { 

"id" :  100221,     
"parent" : 10202,

"text" : '221 Douglas-Peucker simplify algorithm',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_221",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

    "id" :  100231,     
    "parent" : 10202,
    
    "text" : '231 Nearmap',
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_231",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 


    icon_item = { 

        "id" :  100233,     
        "parent" : 10202,
        
        "text" : '233 Esri Imagery vs Google',
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "google_233",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 




// ## ## ##  sub-folder ## ## ##    google label     ## ## ##                              
icon_item = { 

"id" :  10073,     
"parent" : 100,
"text" : "google label",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};
icon_flatjson.push(icon_item) 


icon_item = { 
"id" :  1007373,     
"parent" : 10073,
"text" : '73 single label',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_73",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
"id" :  10073730,     
"parent" : 10073,
"text" : '730 single label custom color',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_730",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
    "id" :  10073731,     
    "parent" : 10073,
    "text" : '731 centroid buffer simplify ( browser side geometrical analysis )',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_731",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)





// ## ## ##  sub-folder ## ## ##   classified google label     ## ## ##                              
                        icon_item = { 

                            "id" :  100473,     
                            "parent" : 100,
                            "text" : "classified google label",
                            "icon" : folder_icon,  
                            "link_type": "folder", 
                            "state"       : {
                                "opened": iconJstreeNodeOpened,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            }


                        };
                        icon_flatjson.push(icon_item) 


                        icon_item = { 
                            "id" :  100473473,     
                            "parent" : 100473,
                            "text" : '473 classified google label',
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "google_473",
                            "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                        };
                        icon_flatjson.push(icon_item) 

                        icon_item = { 
                            "id" :  1004734738,     
                            "parent" : 100473,
                            "text" : '4738 classified colored google label',
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "google_4738",
                            "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                        };
                        icon_flatjson.push(icon_item) 





// ## ## ##  sub-folder ## ## ##   classified google color    ## ## ##                              
                            icon_item = { 

                                "id" :  100480,     
                                "parent" : 100,
                                "text" : "classified google color",
                                "icon" : folder_icon,  
                                "link_type": "folder", 
                                "state"       : {
                                    "opened": iconJstreeNodeOpened,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                }


                            };
                            icon_flatjson.push(icon_item) 


                            icon_item = { 
                                "id" :  100480480,     
                                "parent" : 100480,
                                "text" : '480 classified google color',
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "google_480",
                                "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                            };
                            icon_flatjson.push(icon_item) 


                            icon_item = { 
                                "id" :  100480482,     
                                "parent" : 100480,
                                "text" : '482 classified google color + blackout',
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "google_482",
                                "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                            };
                            icon_flatjson.push(icon_item) 


                            icon_item = { 
                                "id" :  100480487,     
                                "parent" : 100480,
                                "text" : '487 classified google color + google label',
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "google_487",
                                "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                            };
                            icon_flatjson.push(icon_item) 






// ## ## ##  sub-folder ## ## ##    single color     ## ## ##                              
icon_item = { 

"id" :  10018,     
"parent" : 100,
"text" : "arcgis-server-side color and label<sup>&copy;dynamicLayers v10.9 required</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  1001818,     
"parent" : 10018,

"text" : '18 color',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_18",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  10018180,     
"parent" : 10018,

"text" : '180 color(named)',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_180",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  10018181,     
"parent" : 10018,

"text" : '181 color(named) + custom point marker',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_181",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  10018187,     
"parent" : 10018,

"text" : '187 color(named)+label<sub>&copy;maplex required</sub>',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_187",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 









// ## ## ##  sub-folder ## ## ##    labeling    ## ## ##                              
icon_item = { 

"id" :  10017,     
"parent" : 100,
"text" : "arcgis-server-side label<sub>&copy;maplex required</sub><sup>&copy;dynamicLayers v10.9 required</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
    "opened": iconJstreeNodeOpened,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }


};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  1001717,     
"parent" : 10017,

"text" : '17 label',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_17",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 








icon_item = { 

"id" :  10017170,     
"parent" : 10017,

"text" : '170 label + transparency',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_170",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  10017171,     
"parent" : 10017,

"text" : '171 label + multiple color, size, style',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_171",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  10017270,     
"parent" : 10017,

"text" : '270 multiple label',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_270",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  10017271,     
"parent" : 10017,

"text" : '271 multiple label + multiple color, size, style',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_271",
"state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 












// ## ## ##  sub-folder ## ## ##    classified     ## ## ##                              
icon_item = { 

"id" :  1001447,     
"parent" : 100,
"text" : "arcgis-server-side classify<sup>&copy;dynamicLayers v10.9+ required</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 





icon_item = {
"id" :  100144700014,     
"parent" : 1001447,
"text" : '14 classified color<sup>MapImage</sup> + blackout',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_14",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 






icon_item = {
"id" :  100144700044,     
"parent" : 1001447,
"text" : '44 classified color<sup>MapImage</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_44",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 



icon_item = {
"id" :  100144700047,     
"parent" : 1001447,
"text" : '47 classified label<sup>MapImage</sup><sub>&copy;maplex required</sub>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_47",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 




icon_item = {
"id" :  144774,     
"parent" : 1001447,
"text" : '74 classified color+label<sup>MapImage</sup><sub>&copy;maplex required</sub>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_74",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 




















icon_item = {
"id" :  100401,     
"parent" : 100400,
"text" : '141 hoverable<sup>link</sup><sub>printPDF</sub>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_141",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 



icon_item = {
    "id" :  100143,     
    "parent" : 100400,
    "text" : '143 advanced 2 dimensional filter ( search value list )',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_143",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)



icon_item = {
"id" :  100402,     
"parent" : 100400,
"text" : '4 hoverable<sup>tree</sup><sub>printPDF</sub>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_4",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 


icon_item = {
"id" :  100430,     
"parent" : 100400,
"text" : '430 multiple choice(checkbox)<sup>tree</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_430",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 





icon_item = { 
"id" :  1004140,     
"parent" : 100400,
"text" : '140 clickable image<sup>link</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_140",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 




icon_item = { 
    "id" :  1004142,     
    "parent" : 100400,
    "text" : '142 clickable image<sup>advanced 2 dimensional filter ( search value list )</sup>',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_142",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 



icon_item = { 
"id" :  100404,     
"parent" : 100400,
"text" : '410 clickable image<sup>tree</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_410",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 





// ## ## ##  sub-folder ## ## ##    graduated color by value range     ## ## ##                              
icon_item = { 

"id" :  100456,     
"parent" : 102222,
"text" : "graduated color by value range",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened":  iconJstreeNodeOpened, //iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 


icon_item = { 
"id" :  100445,     
"parent" : 100456,
"text" : '45 rendering in browser <sup>for both FeatureServer and MapServer</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_45",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 


icon_item = { 
"id" :  100446,     
"parent" : 100456,
"text" : '46 arcgis-server-side imaging<sup>only for MapServer, not for FeatureServer</sup>',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_46",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 













// ## ## ##  sub-folder ## ## ##    ... ... .. ... subtype domain ... ... ..      ## ## ##                              
icon_item = { 

    "id" :  106146,     
    "parent" :102222, 
    "text" : "subtype domain<sup>not show field alias, only show field name</sup>",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
        "opened":  iconJstreeNodeOpened, //iconJstreeNodeOpened,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }


};

icon_flatjson.push(icon_item) 

icon_item = {
    "id" :  106,     
    "parent" : 106146,
    "text" : '106 hoverable',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_106",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = {
    "id" :  146,     
    "parent" : 106146,
    "text" : '146 classify',
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "google_146",
    "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
};
icon_flatjson.push(icon_item) 















// ## ## ##  sub-folder ## ## ##    classified     ## ## ##    
icon_item = { 

"id" :  1001189,     
"parent" : 102222, 
"text" : "dynamic legend<sup>&copy;dynamicLayers v10.9+ required</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 



icon_item = {
                "id" :  1001189118,     
                "parent" : 1001189,
                "text" : '118 hoverable (single layer) ',
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "google_118",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
                "id" :  1001189119,     
                "parent" : 1001189,
                "text" : '119 clickable image (single layer)',
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "google_119",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = {
                "id" :  1001189218,     
                "parent" : 1001189,
                "text" : '218 hoverable (multilayer on same server) ',
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "google_218",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
                "id" :  1001189219,     
                "parent" : 1001189,
                "text" : '219 clickable image (multilayer on same server) ',
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "google_219",
                "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
};
icon_flatjson.push(icon_item) 









// ---- google ----  ---- multilayer limit on this MapServer  ---- ----



icon_item = { 

"id" :  110717,   
"parent" : 110,


"text" : '717 label<sup>MapImage</sup><sub>&copy;maplex required</sub><sup>&copy;dynamicLayers v10.9+ required</sup>',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_717",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  110727,   
"parent" : 110,


"text" : '727 label with transparency<sup>MapImage</sup><sub>&copy;maplex required</sub><sup>&copy;dynamicLayers v10.9+ required</sup>',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_727",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  110617,     
"parent" : 110,


"text" : '617 movable layers drag-n-drop<sup>&copy;dynamicLayers v10.9+ required</sup>',    // from 111, 




"layer_name" : _layer_name_,

"icon" : open_new_tab_icon,
"link_type": "google_617",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },

"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_


};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  110627,     
"parent" : 110,


"text" : '627 movable layers drag-n-drop (transparency)<sup>&copy;dynamicLayers v10.9+ required</sup>',    // from 111, 




"layer_name" : _layer_name_,

"icon" : open_new_tab_icon,
"link_type": "google_627",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },

"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_


};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  110912,     
"parent" : 110,



"text" : '912 pop-up<sup>all layers identify</sup>',

"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_912",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  110113,     
"parent" : 110,


"text" : '113 clickable image<sup>all layers identify</sup>',




"layer_name" : _layer_name_,

"icon" : open_new_tab_icon,
"link_type": "google_113",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },

"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_


};

icon_flatjson.push(icon_item) 





icon_item = { 

"id" :  110111,     
"parent" : 110,


"text" : '111 clickable image',




"layer_name" : _layer_name_,

"icon" : open_new_tab_icon,
"link_type": "google_111",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },

"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_


};

icon_flatjson.push(icon_item) 










icon_item = { 

"id" :  10150,     
"parent" : 110,


"text" : '11 hoverable',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_11",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  10151,     
"parent" : 110,


"text" : '11 [card]',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_11c",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 







icon_item = { 
"id" :  1018,     
"parent" : 110,
"text" : '411 classified',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_classified_multilayer",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_                                       
};
icon_flatjson.push(icon_item) 




icon_item = { 
"id" :  1019,     
"parent" : 110,
"text" : '420 classified clickable image',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_classified_clickable_multilayer",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 










icon_item = { 

"id" :  11030003000,     
"parent" : 1103000,


"text" : '3000 overlay',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3000",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" : 11030003002,     
"parent" : 1103000,


"text" : '3002 overlay fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3002",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  11030003010,     
"parent" : 1103000,


"text" : '3010 highlight',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3010",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  11030003012,     
"parent" : 1103000,


"text" : '3012 highlight fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3012",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 








icon_item = { 

"id" :  11030003020,     
"parent" : 1103000,


"text" : '3020',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3020",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  11030003022,   
"parent" : 1103000,


"text" : '3022 fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3022",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  11030003030,     
"parent" : 1103000,


"text" : '3030 overlay highlight',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3030",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  11030003032,   
"parent" : 1103000,


"text" : '3032 overlay highlight fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_3032",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



//  .......... google   .......... multilayer anywhere    .......... 



icon_item = { 

"id" :  1207717,     
"parent" : 120,


"text" : '7717 label<sup>MapImage</sup><sub>&copy;maplex required</sub><sup>&copy;dynamicLayers v10.9+ required</sup>',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_7717",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  1206617,     
"parent" : 120,


"text" : '6617 movable layers drag-n-drop<sup>&copy;dynamicLayers v10.9+ required</sup>',    // from 2110, 


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_6617",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  2113,     
"parent" : 120,


"text" : '2113 clickable image<sup>all layers identify in order</sup>',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2113",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  2116,     
"parent" : 120,


"text" : '2116 clickable image<sup>all layers identify mixed</sup>',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2116",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 






icon_item = { 

"id" :  2000,     
"parent" : 120,


"text" : '2000 hoverable',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2000",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 





icon_item = { 
"id" :  2004,     
"parent" : 120,
"text" : '2004 classified',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2004",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 






icon_item = { 
"id" :  2410,     
"parent" : 120,
"text" : '2410 classified clickable image',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2410",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  1202110,     
"parent" : 120,


"text" : '2110 clickable image',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2110",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


// ## ## ##  sub-folder ## ## ##    multilayer against us Protected Public Land    ## ## ##    

icon_item = { 

"id" :  1202000,     
"parent" : 120,
"text" : "compare with US Protected Public Land",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 


icon_item = { 
"id" :  200001,     
"parent" : 1202000,
"text" : '2000-1 image',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2000_1",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
"id" :  200002,     
"parent" : 1202000,
"text" : '2000-2 tile',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_2000_2",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 





// ## ## ##  sub-folder ## ## ##    spatial analysis    ## ## ##    

icon_item = { 

"id" :  977,     
"parent" : 102222,
"text" : "spatial analysis",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
// disabled  : boolean  // is the node disabled
// "selected"  : true   // is the node selected
}


};

icon_flatjson.push(icon_item) 



// ## ## ##  sub-folder ## ## ##    spatial relation      ## ## ##    
icon_item = { 

"id" :  1205000,     
"parent" : 977,
"text" : "spatial relation",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  12050005000,     
"parent" : 1205000,


"text" : '5000 overlay',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5000",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  12050005002,     
"parent" : 1205000,


"text" : '5002 overlay fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5002",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 





icon_item = { 

"id" :  12050005010,     
"parent" : 1205000,


"text" : '5010 highlight',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5010",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  12050005011,     
"parent" : 1205000,


"text" : '5011 highlight fieldMask horizontal',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5011",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 





icon_item = { 

"id" :  12050005012,     
"parent" : 1205000,


"text" : '5012 highlight fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5012",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 







icon_item = { 

"id" :  12050005020,     
"parent" : 1205000,


"text" : '5020',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5020",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  12050005022,     
"parent" : 1205000,


"text" : '5022 fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5022",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 








icon_item = { 

"id" :  12050005030,     
"parent" : 1205000,


"text" : '5030 overlay highlight',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5030",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  12050005032,     
"parent" : 1205000,


"text" : '5032 overlay highlight fieldMask',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_5032",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 






// ## ## ##  sub-folder ## ## ##    spatial filtering     ## ## ##    
icon_item = { 

"id" :  12031,     
"parent" : 977,
"text" : "spatial filtering<sup>&copy;dynamicLayers v10.9+ required</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }


};

icon_flatjson.push(icon_item) 









icon_item = { 

"id" :  1203130,     
"parent" : 12031,


"text" : '30 data + image (simplify by Douglas–Peucker algorithm)',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_30",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

"id" :  12031130,     
"parent" : 12031,


"text" : '130 data + image (lossless)',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_130",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 







icon_item = { 

"id" :  1203131,     
"parent" : 12031,


"text" : '31 image (simplify by Douglas–Peucker algorithm)',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_31",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  12031131,     
"parent" : 12031,


"text" : '131 image (lossless)',


"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_131",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 




// ## ## ##  sub-folder ## ## ##    overlap detector     ## ## ##    
icon_item = { 

"id" :  521,     
"parent" : 977,
"text" : "overlap detector",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
        // disabled  : boolean  // is the node disabled
        // "selected"  : true   // is the node selected
    }


};

icon_flatjson.push(icon_item) 





icon_item = { 

"id" :  651,     
"parent" : 521,
"text" : '651 image overlapped (generic)',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_651",
"state"       : {
        "opened"    : true,  // is the node open
        // disabled  : boolean  // is the node disabled
        // "selected"  : true   // is the node selected
    },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_                               
};
icon_flatjson.push(icon_item) 


icon_item = { 
"id" :  652,     
"parent" : 521,
"text" : '652 tile overlapped (generic)',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_652",
"state"       : {
        "opened"    : true,  // is the node open
        // disabled  : boolean  // is the node disabled
        // "selected"  : true   // is the node selected
    },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 



// = = = = overlap US Protected Public Land = = = =

icon_item = { 
"id" :  522,     
"parent" : 521,
"text" : "interact with US Protected Public Land",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
        // disabled  : boolean  // is the node disabled
        // "selected"  : true   // is the node selected
    }
};
icon_flatjson.push(icon_item) 



icon_item = {
"id" :  6511,     
"parent" : 522,
"text" : '651-1 ManagerName (image)',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_651_1",
"state"       : {
        "opened"    : true,  // is the node open
        // disabled  : boolean  // is the node disabled
        // "selected"  : true   // is the node selected
    },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_                               
};
icon_flatjson.push(icon_item) 



icon_item = {
"id" :  6521,     
"parent" : 522,
"text" : '652-1 ManagerName (tile)',
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "google_652_1",
"state"       : {
        "opened"    : true,  // is the node open
        // disabled  : boolean  // is the node disabled
        // "selected"  : true   // is the node selected
    },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_                               
};
icon_flatjson.push(icon_item) 







// = = = = esri = = = =
/**/
// ...  ... esri top frame ...  ...   


// ... subfolder ...  ... 


icon_item = { 

"id" :  510,     
"parent" : 500,
"text" : "FeatureDataLayer",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        }
};
icon_flatjson.push(icon_item) 






icon_item = { 

    "id" :  51023,     
    "parent" : 510,
    
    "text" :  "+23 &#x270B; hover & click (right hand)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_51023",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 



icon_item = { 

    "id" :  51023099,     
    "parent" : 510,
    
    "text" :  "-23 &#x1F91A; hover & click (left hand)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_51023099",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 
    



icon_item = { 
    "id" :  51022,     
    "parent" : 510,
    "text" :  "+22 click (right hand &#x270B;)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_51022",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    
    

    icon_item = { 
        "id" :  51022099,     
        "parent" : 510,
        "text" :  "-22 click (&#x1F91A; left hand)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_51022099",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)


icon_item = { 

"id" :  51020,     
"parent" : 510,

"text" :  "+20 color (right &#x270B;)",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_51020",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
        
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

    "id" :  51020099,     
    "parent" : 510,
    
    "text" :  "-20 color (left &#x1F91A;)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_51020099",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 




icon_item = { 

"id" :  51021,     
"parent" : 510,

"text" : "+21 label  &#x270B;",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_51021",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
        
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 



icon_item = { 

    "id" :  51021099,     
    "parent" : 510,
    
    "text" : "-21 label  &#x1F91A;",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_51021099",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 



    icon_item = { 
        "id" :  50050225,     
        "parent" : 510,
        "text" :  "225 Route Direction Address Elevation",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_225",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item) 
        
        






    icon_item = { 

        "id" :  510236,     
        "parent" : 510,
        
        "text" :  "236 attachment image",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_510236",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 
        




icon_item = { 

    "id" :  510235,     
    "parent" : 510,
    
    "text" :  "235 url attribute",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_510235",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 






    icon_item = { 

        "id" :  51025,     
        "parent" : 510,
        
        "text" :  "25 address intersect layer",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_51025",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 
        
    
    
    
icon_item = { 
    "id" :  510229,     
    "parent" : 510,
    "text" :  "22.9 Nearmap" ,
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_510229",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)


    



icon_item = { 

"id" :  51099,     
"parent" : 510,
//"text" : layer_item.type + " (v3.x)",
"text" : "99 classic v3.x",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_51099",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
        
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 





icon_item = { 

"id" :  550,     
"parent" : 500,
"text" : "MapImageLayer",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        }
};
icon_flatjson.push(icon_item) 



icon_item = { 
    "id" :  55011,     
    "parent" : 550,
    "text" :  "11 clickable",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_55011",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 

 
    
icon_item = { 
    "id" :  55013,     
    "parent" : 550,
    "text" :  "13 color  ",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_55013",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    
    
    
    icon_item = { 
    "id" :  55014,     
    "parent" : 550,
    "text" :  "14 label <sub>&copy;maplex required</sub><sup>&copy;dynamicLayers v10.9 required</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_55014",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    
    
    icon_item = { 
        "id" :  50050115,     
        "parent" : 550,
        "text" :  "115 Route Direction Address Elevation",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_115",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)
        
    
    
    


icon_item = { 
    "id" :  55015,     
    "parent" : 550,
    "text" :  "15 address intersect layer ",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_55015",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    





icon_item = { 
    "id" :  550119,     
    "parent" : 550,
    "text" :  "11.9 Nearmap",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_550119",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 









icon_item = { 
"id" :  55010,     
"parent" : 550,
"text" :  "10 search widget<sup>customized for each field</sup><sub>esri widget</sub>",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_55010",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 



icon_item = { 
    "id" :  550101,     
    "parent" : 550,
    "text" :  "10.1 search by field",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_550101",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 



    icon_item = { 
        "id" :  550102,     
        "parent" : 550,
        "text" :  "10.2 suggestion (search by field)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_550102",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item) 



// ... subfolder ...  ... 


icon_item = { 

"id" :  520,     
"parent" : 500,
"text" : "Classified FeatureDataLayer",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        }
};
icon_flatjson.push(icon_item) 


icon_item = { 
"id" :  52041,     
"parent" : 520,
"text" :  "+41 Filter by field name (right hand &#x270B;)",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_52041",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item)


icon_item = { 
    "id" :  52041099,     
    "parent" : 520,
    "text" :  "-41 Filter by field name (&#x1F91A; left hand)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_52041099",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)







icon_item = { 
    "id" :  520417,     
    "parent" : 520,
    "text" :  "+417 with label (right hand &#x270B;)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_520417",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 

    icon_item = { 
        "id" :  520417099,     
        "parent" : 520,
        "text" :  "-417 with label (&#x1F91A; left hand)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_520417099",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)










icon_item = { 
"id" :  52043,     
"parent" : 520,
"text" :  "+413 Filter by field name (right hand &#x270B;)",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_520413",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 

icon_item = { 
    "id" :  52043099,     
    "parent" : 520,
    "text" :  "-413 Filter by field name (&#x1F91A; left hand)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_520413099",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item)










// ... subfolder ...  ... 


icon_item = { 

    "id" :  523,     
    "parent" : 500,
    "text" : "Classified MapImageLayer",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }
    };
    icon_flatjson.push(icon_item) 



icon_item = { 
    "id" :  520422,     
    "parent" : 523,
    "text" :  "+422 Filter by field name (right hand &#x270B;)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_520422",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 


    icon_item = { 
        "id" :  520422099,     
        "parent" : 523,
        "text" :  "-422 Filter by field name (&#x1F91A; left hand)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_520422099",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)



    icon_item = { 
        "id" :  520427,     
        "parent" : 523,
        "text" :  "+427 with label (right hand &#x270B;)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_520427",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item) 


        icon_item = { 
            "id" :  520427099,     
            "parent" : 523,
            "text" :  "-427 with label (&#x1F91A; left hand)",
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "esri_520427099",
            "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            };
            icon_flatjson.push(icon_item) 


    icon_item = { 
        "id" :  520423,     
        "parent" : 523,
        "text" :  "+423 with value filter (right hand &#x270B;)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_520423",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item) 


        icon_item = { 
            "id" :  520423099,     
            "parent" : 523,
            "text" :  "-423 with value filter (&#x1F91A; left hand)",
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "esri_520423099",
            "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            };
            icon_flatjson.push(icon_item) 



// ... subfolder ...  ... 


icon_item = { 

    "id" :  524,     
    "parent" : 500,
    "text" : "Classified Graduated Color by Value Range",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }
    };
    icon_flatjson.push(icon_item) 




icon_item = { 
    "id" :  52045,     
    "parent" : 524,
    "text" :  "+45 FeatureDataLayer (right hand &#x270B;)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_52045",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 
    
    icon_item = { 
        "id" :  52045099,     
        "parent" : 524,
        "text" :  "-45 FeatureDataLayer (&#x1F91A; left hand)",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_52045099",
        "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        icon_flatjson.push(icon_item)



icon_item = { 
"id" :  52046,     
"parent" : 524,
"text" :  "+46 MapImageLayer (right hand &#x270B;)",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_52046",
"state"       : {
            "opened"    : true,  // is the node open
            // disabled  : boolean  // is the node disabled
            // "selected"  : true   // is the node selected
        },
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_
};
icon_flatjson.push(icon_item) 


icon_item = { 
    "id" :  52046099,     
    "parent" : 524,
    "text" :  "-46 MapImageLayer (&#x1F91A; left hand)",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_52046099",
    "state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    icon_flatjson.push(icon_item) 



// ... subfolder ...  ... 
icon_item = {
    "id" :  5100,     
    "parent" : 500,
    "text" : "Multiple layer",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened": iconJstreeNodeOpened,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
    };
    icon_flatjson.push(icon_item) 
    
    






// ... subfolder ...  ... 
icon_item = {
"id" :  50020,     
"parent" : 5100,
"text" : "This MapServer<sup>only</sup>",
"icon" : folder_icon,  
"link_type": "folder", 
"state"       : {
"opened": iconJstreeNodeOpened,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            }
};
icon_flatjson.push(icon_item) 





icon_item = { 

    "id" :  5002000,     
    "parent" : 50020,
    
    "text" :  "2000 FeatureLayer <sup>single select</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_2000",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 



icon_item = { 

"id" :  5002100,     
"parent" : 50020,

"text" :  "2100 FeatureLayer <sup>multiple select</sup>",
"layer_name" : _layer_name_,
"icon" : open_new_tab_icon,
"link_type": "esri_2100",
"state"       : {
                "opened"    : true,  // is the node open
                // disabled  : boolean  // is the node disabled
                // "selected"  : true   // is the node selected
            },
            
"node_path" : _node_path_, 
"absolute_path" : _map_server_url_ + '/' + _layer_id_,
"server_path" : _map_server_url_,
"layer_id" :  _layer_id_,            
"type" : _type_



};

icon_flatjson.push(icon_item) 


icon_item = { 

    "id" :  5003000,     
    "parent" : 50020,
    
    "text" :  "3000 MapImageLayer <sup>single select</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_3000",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 







icon_item = { 

    "id" :  5003100,     
    "parent" : 50020,
    
    "text" :  "3100 MapImageLayer <sup>multiple select</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_3100",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 

   




    



// ... subfolder ...  ... 
icon_item = { 

    "id" :  50022,     
    "parent" : 5100,
    "text" : 'Entire Arcgis Server of <sup>all layers</sup>',
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
    "opened": iconJstreeNodeOpened,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                }
    
    
    };
    
    icon_flatjson.push(icon_item) 




    icon_item = { 
    
        "id" :  500222020,     
        "parent" : 50022,
        
        "text" :  "2020 Entire FeatureLayer <sup>single select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_2020",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
    };
        
    icon_flatjson.push(icon_item) 





    icon_item = { 

    "id" :  500222120,     
    "parent" : 50022,
    
    "text" :  "2120 Entire FeatureLayer <sup>multiple select</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_2120",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item) 




    icon_item = { 
    
        "id" :  500223020,     
        "parent" : 50022,
        
        "text" :  "3020 Entire MapImageLayer <sup>single select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_3020",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 
    
    



        icon_item = { 

        "id" :  500223120,     
        "parent" : 50022,
        
        "text" :  "3120 Entire MapImageLayer <sup>multiple select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_3120",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        icon_flatjson.push(icon_item) 
    
      
    
    
    
       
    
    
    
     













// ... subfolder ...  ... 

    icon_item = { 

        "id" :  50030,     
        "parent" : 500,
        "text" : "By State County Zip Address <sup>FeatureServer not supported</sup>",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
            "opened": iconJstreeNodeOpened,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }
    };
    icon_flatjson.push(icon_item) 



    icon_item = { 
        "id" :  500301,     
        "parent" : 50030,
        "text" :  "by county",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_500301",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item) 


    icon_item = { 
        "id" :  500304,     
        "parent" : 50030,
        "text" :  "by county zip",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_500304",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item) 


    icon_item = { 
        "id" :  500305,     
        "parent" : 50030,
        "text" :  "by city",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_500305",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item) 


    icon_item = { 
        "id" :  500306,     
        "parent" : 50030,
        "text" :  "by congress district",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_500306",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item) 





    icon_item = { 
        "id" :  500302,     
        "parent" : 50030,
        "text" :  "by zip code",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_500302",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item) 


    icon_item = { 
        "id" :  500303,     
        "parent" : 50030,
        "text" :  "by address",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_500303",
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    icon_flatjson.push(icon_item) 









// = = = = attribute table  = = = =






                                            icon_item = { 

                                            "id" :  90701,     
                                            "parent" : 90,

                                            //"text" : layer_item.type + " (ESRI Grid)",
                                            "text" : "excel table",

                                            "layer_name" : _layer_name_,
                                            "icon" : open_new_tab_icon,
                                            "link_type": "table_90701",
                                            "state"       : {
                                                            "opened"    : true,  // is the node open
                                                            // disabled  : boolean  // is the node disabled
                                                            // "selected"  : true   // is the node selected
                                                        },
                                                        
                                            "node_path" : _node_path_, 
                                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                            "server_path" : _map_server_url_,
                                            "layer_id" :  _layer_id_,            
                                            "type" : _type_



                                            };

                                            icon_flatjson.push(icon_item) 




// ... subfolder ...  ... 
icon_item = { 

    "id" :  711,     
    "parent" : 90,
    "text" : esri_svg + " advanced search",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
        "opened": false, //iconJstreeNodeOpened,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
};
icon_flatjson.push(icon_item) 









                // ... subfolder ...  ... 
                icon_item = { 

                    "id" :  7190,     
                    "parent" : 711,
                    "text" : "single select",
                    "icon" : folder_icon,  
                    "link_type": "folder", 
                    "state"       : {
                        "opened": false, //iconJstreeNodeOpened,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                };
                icon_flatjson.push(icon_item) 







                                icon_item = { 

                                    "id" :  7195,     
                                    "parent" : 7190,
                                    "text" : "T-7195 hover or click",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "table_7195",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                };

                                icon_flatjson.push(icon_item) 

                               



                                icon_item = { 

                                    "id" :  7196,     
                                    "parent" : 7190,
                                    "text" : "T-7196 selected only or not",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "table_7196",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                };

                                icon_flatjson.push(icon_item) 



                                










                // ... subfolder ...  ... 
                icon_item = { 

                    "id" :  7200,     
                    "parent" : 711,
                    "text" : "multiple select",
                    "icon" : folder_icon,  
                    "link_type": "folder", 
                    "state"       : {
                        "opened": false, //iconJstreeNodeOpened,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                };
                icon_flatjson.push(icon_item) 






                                icon_item = { 

                                    "id" :  7201,     
                                    "parent" : 7200,
                                    "text" : "T-7201 click-2-select, again-unselect",
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "table_7201",
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                };

                                icon_flatjson.push(icon_item)


// ... subfolder ...  ... 
icon_item = { 

    "id" :  908,     
    "parent" : 90,
    "text" : google_svg + " advanced search",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
        "opened": false, //iconJstreeNodeOpened,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
};
icon_flatjson.push(icon_item) 





                        icon_item = { 

                            "id" :  90880,     
                            "parent" : 908,
                            "text" : "T-90880 search",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "table_90880",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                        };

                        icon_flatjson.push(icon_item) 





                        icon_item = { 

                            "id" :  90881,     
                            "parent" : 908,
                            "text" : "T-90881 street view",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "table_90881",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                        };

                        icon_flatjson.push(icon_item)










// ... subfolder ...  ... 
icon_item = { 

    "id" :  809,     
    "parent" : 90,
    "text" : "without map ",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
        "opened": false,  //iconJstreeNodeOpened,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
};
icon_flatjson.push(icon_item) 




// ... subfolder ...  ... 
icon_item = { 

    "id" :  909,     
    "parent" : 809,
    "text" : "classified",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
        "opened": false,  //iconJstreeNodeOpened,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
};
icon_flatjson.push(icon_item) 



icon_item = { 

    "id" :  909403,     
    "parent" : 909,
    
    "text" : "T-403 value list (limit 2 MaxRecordReturnCount) ",
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "table_403",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    icon_flatjson.push(icon_item)


        icon_item = { 

            "id" :  909404,     
            "parent" : 909,
            
            "text" : "T-404 full range value list",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "table_404",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            icon_flatjson.push(icon_item) 




            icon_item = { 

                "id" :  909405,     
                "parent" : 909,
                
                "text" : "T-405 paging value list ",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "table_405",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                };
                
                icon_flatjson.push(icon_item) 


                icon_item = { 

                    "id" :  909406,     
                    "parent" : 909,
                    
                    "text" : "T-406 search value list (limit 2 MaxRecordReturnCount) ",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "table_406",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    icon_flatjson.push(icon_item) 








 

/*  not yet done

            icon_item = { 

            "id" :  90910,     
            "parent" : 909,

           
            "text" : "T-4 value list (limit 2 MaxRecordReturnCount) ",

            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "table_classified",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_



            };

            icon_flatjson.push(icon_item) 



            icon_item = { 

                "id" :  909413,     
                "parent" : 909,
                
                "text" : "T-413 value list (limit 2 MaxRecordReturnCount)<b>vertical</b> ",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "table_413",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 



            icon_item = { 

                "id" :  909414,     
                "parent" : 909,
                
                "text" : "T-414 full range value list <b>vertical</b> ",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "table_414",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 
    
    
    
    
                icon_item = { 
    
                    "id" :  909415,     
                    "parent" : 909,
                    
                    "text" : "T-415 paging value list  <b>vertical</b>",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "table_415",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    icon_flatjson.push(icon_item) 
    
    
                    icon_item = { 
    
                        "id" :  909416,     
                        "parent" : 909,
                        
                        "text" : "T-416 search value list (limit 2 MaxRecordReturnCount) <b>vertical</b> ",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "table_416",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        };
                        
                        icon_flatjson.push(icon_item) 


*/




// ... subfolder ...  ... 
icon_item = { 

    "id" :  819,     
    "parent" : 809,
    "text" : "searchable",
    "icon" : folder_icon,  
    "link_type": "folder", 
    "state"       : {
        "opened": false,  //iconJstreeNodeOpened,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
};
icon_flatjson.push(icon_item) 


            icon_item = { 

                "id" :  90931,     
                "parent" : 819,
                
                
                "text" : "T-90931 human friendly card <sup>vertical</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "table_90931",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                icon_flatjson.push(icon_item) 



                icon_item = { 

                    "id" :  90932,     
                    "parent" : 819,
                    
                    
                    "text" : "T-90932 vertical",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "table_90932",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    icon_flatjson.push(icon_item) 


                   

                    /*

                        icon_item = { 

                        "id" :  90930,     
                        "parent" : 819,

                        
                        "text" : "T-0 human friendly card <sup>full screen</sup> ",

                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "table_searchable",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_



                        };

                        icon_flatjson.push(icon_item) 

*/












                  // . . . . apple  . . . .   

                    icon_item = { 
                        "id" :  776,     
                        "parent" : 777,
                        "text" : "single select",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    :false, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 



                                icon_item = { 

                                "id" : 7760,     
                                "parent" : 776,
                                "text" : "7760 hover",
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_7760",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                };
                                icon_flatjson.push(icon_item) 


                                icon_item = { 

                                "id" : 7762,     
                                "parent" : 776,
                                "text" : "7762 hover(zoomable point) ",
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_7762",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                };
                                icon_flatjson.push(icon_item) 



                                icon_item = { 

                                "id" : 7761,     
                                "parent" : 776,
                                "text" : "7761 change color",
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "embed_7761",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                };
                                icon_flatjson.push(icon_item) 





                  // . . . .  end   . . . .    apple  . . . .    


return icon_flatjson


}


// same as render feature layer, but remove all 'map' section, only keep 'table' section
function create_tableFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){

      var table_flatjson = [];

      //  ....... add  root item  ....... 
        var table_item = { 

            "id" :  10,     
            "parent" : "#",
            "text" : _layer_name_,
            "layer_name" : _layer_name_,
            "icon" : folder_icon, // layer_item.icon,  
            "link_type": "folder",
            "state"       : {
                // root folder is always open
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },

        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_

        
        };
        // 1 time, first time run, add root item
        table_flatjson.push(table_item) 
     //  ....... add  root item  ....... 



/**/
// ---  --- only  --- top level type  --- ---
    table_item = { 
                    "id" :  100,     
                    "parent" : 10,
                    "text" : "Attribute Table",
                    "icon" : folder_icon,  
                    "link_type": "folder", 
                    "state"       : {
                    "opened": iconJstreeforceOpen,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                }
                };
    
    table_flatjson.push(table_item)
// ---  --- only  --- top level type  --- ---
/**/
    


table_item = { 

    "id" :  919404,     
    "parent" : 100,
    
   "text" : "T-404 classified <sup>ValueList NoPaging Subject to MaxRecordReturnCount</sup> ",
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "table_404",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
};

table_flatjson.push(table_item) 




table_item = { 

    "id" :  919405,     
    "parent" : 100,
    
    "text" : "T-405 classified <sup>Paged ValueList FullRange</sup> ",
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "table_405",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
};

table_flatjson.push(table_item) 





     
     table_item = { 

        "id" :  9194,     
        "parent" : 100,
        
        "text" : "T-4 classified <sup>human friendly card</sup> ",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "table_classified",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
    };
    
    table_flatjson.push(table_item) 





    table_item = { 

        "id" :  91931,     
        "parent" : 100,
        
        //"text" : layer_item.type + "  (Attribute Table)",
        "text" : "T-90931 searchable <sup>human friendly card</sup> ",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "table_90931",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        table_flatjson.push(table_item) 



    table_item = { 

        "id" :  91932,     
        "parent" : 100,
        
        //"text" : layer_item.type + "  (Attribute Table)",
        "text" : "T-90932 vertical ",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "table_90932",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        table_flatjson.push(table_item) 



    table_item = { 

        "id" :  91933,     
        "parent" : 100,
        
        //"text" : layer_item.type + "  (Attribute Table)",
        "text" : "T-90933 attachment image",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "table_90933",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        table_flatjson.push(table_item) 

    


    table_item = { 

    "id" :  91930,     
    "parent" : 100,
    
    //"text" : layer_item.type + "  (Attribute Table)",
    "text" : "T-0 searchable <sup>human friendly card</sup> ",
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "table_searchable",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    table_flatjson.push(table_item) 






    table_item = { 

    "id" :  10090701,     
    "parent" : 100,
    
    //"text" : layer_item.type + " (ESRI Grid)",
    "text" : "T-90701 esri grid <sup>No Paging all-in-1-page</sup>",
    
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "table_90701",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    
    
    
    };
    
    table_flatjson.push(table_item) 
    
  return table_flatjson

}



function create_rasterFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){

    var raster_flatjson = [];

    //  ....... add  root item  ....... 
      var raster_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      raster_flatjson.push(raster_item) 
  //  ....... add  root item  ....... 


    /**/
    // ---  --- only  --- top level type  --- ---
    raster_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "Raster Layer",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    raster_flatjson.push(raster_item)
    // ---  --- only  --- top level type  --- ---
    /**/


    raster_item = { 

        "id" :  100917,     
        "parent" : 100,
        
        "text" : "917 google raster layer <sub>single layer</sub>",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "google_raster_single_layer",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        raster_flatjson.push(raster_item) 



        raster_item = { 

            "id" :  100912,     
            "parent" : 100,
            
            "text" : "912 google raster layer <sub>multilayer</sub>",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "google_raster_multi_layer",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            raster_flatjson.push(raster_item)



  return raster_flatjson

}


function create_sceneServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){


    var scene_server_flatjson = [];

    //  ....... add  root item  ....... 
      var scene_server_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      scene_server_flatjson.push(scene_server_item) 
  //  ....... add  root item  ....... 



  /**/
    // ---  --- only  --- top level type  --- ---
    scene_server_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "Scene Server",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    scene_server_flatjson.push(scene_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/



    scene_server_item = { 

        "id" :  100140,     
        "parent" : 100,
        
        "text" : "e140 clickable",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "scene_esri_v4_e140",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        scene_server_flatjson.push(scene_server_item) 




        scene_server_item = { 

            "id" :  100141,     
            "parent" : 100,
            
            "text" : "e141 fullscreen",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "scene_esri_v4_e141",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ + '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            scene_server_flatjson.push(scene_server_item)


  return scene_server_flatjson

}



function create_MapServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){



    var map_server_flatjson = [];

    //  ....... add  root item  ....... 
      var map_server_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : mapservice_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      map_server_flatjson.push(map_server_item) 
  //  ....... add  root item  ....... 



  /**/
    // ---  --- only  --- top level type  --- ---
    map_server_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "This MapServer<sup>only</sup>", // _type_,
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    map_server_flatjson.push(map_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/


    map_server_item = { 

        "id" :  1002000,     
        "parent" : 100,
        
        "text" : "2000 FeatureLayer <sup>single select</sup>",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_2000",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        map_server_flatjson.push(map_server_item) 



    map_server_item = { 
    "id" :  1002100,     
    "parent" : 100,
    "text" : "2100 FeatureLayer <sup>multiple select</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_2100",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    map_server_flatjson.push(map_server_item) 



        map_server_item = { 
        "id" :  1003000,     
        "parent" : 100,
        "text" : "3000 MapImageLayer <sup>single select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_3000",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        map_server_flatjson.push(map_server_item) 



        map_server_item = { 
        "id" :  1003100,     
        "parent" : 100,
        "text" : "3100 MapImageLayer <sup>multiple select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_3100",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        map_server_flatjson.push(map_server_item) 




  
       
   





    /**/
    // ---  --- only  --- top level type  --- ---
    map_server_item = { 
        "id" :  101020,     
        "parent" : 10,
        "text" : 'Entire Arcgis Server of <sup>all layers</sup>',  //_type_
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    map_server_flatjson.push(map_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/




    map_server_item = { 

        "id" :  1002020,     
        "parent" : 101020,
        
        "text" : "2020 Entire FeatureLayer <sup>single select</sup>",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_2020",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        map_server_flatjson.push(map_server_item) 





    map_server_item = { 
    "id" :  1002120,     
    "parent" : 101020,
    "text" : "2120 Entire FeatureLayer <sup>multiple select</sup>",
    "layer_name" : _layer_name_,
    "icon" : open_new_tab_icon,
    "link_type": "esri_2120",
    "state"       : {
                    "opened"    : true,  // is the node open
                    // disabled  : boolean  // is the node disabled
                    // "selected"  : true   // is the node selected
                },
                
    "node_path" : _node_path_, 
    "absolute_path" : _map_server_url_ + '/' + _layer_id_,
    "server_path" : _map_server_url_,
    "layer_id" :  _layer_id_,            
    "type" : _type_
    };
    map_server_flatjson.push(map_server_item) 




    map_server_item = { 
        "id" :  1003020,     
        "parent" : 101020,
        "text" : "3020 Entire MapImageLayer <sup>single select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_3020",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        map_server_flatjson.push(map_server_item) 




    map_server_item = { 
        "id" :  1003120,     
        "parent" : 101020,
        "text" : "3120 Entire MapImageLayer <sup>multiple select</sup>",
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "esri_3120",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_ + '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        map_server_flatjson.push(map_server_item) 




       



       










  return map_server_flatjson

}



function create_ImageServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){



    var image_server_flatjson = [];

    //  ....... add  root item  ....... 
      var image_server_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      image_server_flatjson.push(image_server_item) 
  //  ....... add  root item  ....... 



  /**/
    // ---  --- only  --- top level type  --- ---
    image_server_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "Image Server",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    image_server_flatjson.push(image_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/



    image_server_item = { 

        "id" :  100910,     
        "parent" : 100,
        
        "text" : "910 google single-image-layer",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "google_910",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        
        
        
        };
        
        image_server_flatjson.push(image_server_item) 


        image_server_item = { 

            "id" :  100911,     
            "parent" : 100,
            
            "text" : "911 google multi-image-layer",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "google_911",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_ ,  // warning image server do not add '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            
            
            
            };
            
            image_server_flatjson.push(image_server_item) 




            image_server_item = { 

                "id" :  100101,     
                "parent" : 100,
                
                "text" : "e101",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "image_esri_e101",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_ ,  // warning image server do not add '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                
                
                
                };
                
                image_server_flatjson.push(image_server_item) 



                image_server_item = { 

                    "id" :  100102,     
                    "parent" : 100,
                    
                    "text" : "e102",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "image_esri_e102",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_ ,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    
                    
                    
                    };
                    
                    image_server_flatjson.push(image_server_item) 




                    image_server_item = { 

                        "id" :  100103,     
                        "parent" : 100,
                        
                        "text" : "e103",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "image_esri_e103",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_ ,  // warning image server do not add '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        
                        
                        
                        };
                        
                        image_server_flatjson.push(image_server_item) 




                        image_server_item = { 

                            "id" :  100100,     
                            "parent" : 100,
                            
                            "text" : "e100 classic",
                            
                            "layer_name" : _layer_name_,
                            "icon" : open_new_tab_icon,
                            "link_type": "image_esri_e100",
                            "state"       : {
                                            "opened"    : true,  // is the node open
                                            // disabled  : boolean  // is the node disabled
                                            // "selected"  : true   // is the node selected
                                        },
                                        
                            "node_path" : _node_path_, 
                            "absolute_path" : _map_server_url_ ,  // warning image server do not add '/' + _layer_id_,
                            "server_path" : _map_server_url_,
                            "layer_id" :  _layer_id_,            
                            "type" : _type_
                            
                            
                            
                            };
                            
                            image_server_flatjson.push(image_server_item)

  return image_server_flatjson

}




function create_VectorTileServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){



    var vector_tile_server_flatjson = [];

    //  ....... add  root item  ....... 
      var vector_tile_server_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      vector_tile_server_flatjson.push(vector_tile_server_item) 
  //  ....... add  root item  ....... 



  /**/
    // ---  --- only  --- top level type  --- ---
    vector_tile_server_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "Vector Tile Server",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    vector_tile_server_flatjson.push(vector_tile_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/






/**/
    // ---  --- 2nd level brand  --- ---

    vector_tile_server_item = { 

        "id" :  300,     
        "parent" : 100,
        "text" : "Mapbox",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }

       
    };
   
    vector_tile_server_flatjson.push(vector_tile_server_item) 







    vector_tile_server_item = { 

        "id" :  600,     
        "parent" : 100,
        "text" : "Openlayers",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }

       
    };
   
    vector_tile_server_flatjson.push(vector_tile_server_item) 








    vector_tile_server_item = { 

        "id" :  500,     
        "parent" : 100,
        "text" : "ESRI",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        }

       
    };
   
    vector_tile_server_flatjson.push(vector_tile_server_item) 


/**/
// ---  end  --- 2nd level brand  --- ---




    



// = = = = mapbox = = = =

    vector_tile_server_item = { 

        "id" :  3020,     
        "parent" : 300,
        "text" :  'm13 with label',    //layer_item.type,    //"Vector Tile",
        
        "layer_name" : _layer_name_,
        "icon" : open_new_tab_icon,
        "link_type": "vectortile_mapbox",
        "state"       : {
                        "opened"    : true,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    },
                    
        "node_path" : _node_path_, 
        "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
        "server_path" : _map_server_url_,
        "layer_id" :  _layer_id_,            
        "type" : _type_
        };
        
        vector_tile_server_flatjson.push(vector_tile_server_item)


        vector_tile_server_item = { 

            "id" :  3022,     
            "parent" : 300,
            "text" :  'm14 no label',  //layer_item.type +  " (hover highlight feature)",     // "Vector Tile hover highlight feature",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "vectortile_mapbox13",     // --- hover highlight feature ---
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            };
            
            vector_tile_server_flatjson.push(vector_tile_server_item)







// = = = = openlayers = = = =
                                        
                                vector_tile_server_item = { 

                                    "id" :  6020,     
                                        "parent" : 600,
                                        "text" : "o1 highlight",  // layer_item.type, 
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "vectortile_openlayers",     
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    
                                    vector_tile_server_flatjson.push(vector_tile_server_item)




                                    vector_tile_server_item = { 

                                        "id" :  6022,     
                                        "parent" : 600,
                                        "text" : "o2 no highlight",  
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "vectortile_openlayers2",     
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        vector_tile_server_flatjson.push(vector_tile_server_item)
    
    


// = = = = esri = = = =


                            vector_tile_server_item = { 

                                "id" :  500231,     
                                        "parent" : 500,
                                        "text" : "e231",   //layer_item.type + " (v4.x)",  
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "vectortile_esri_v4_e231",     
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                            
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                };
                                
                                vector_tile_server_flatjson.push(vector_tile_server_item)





                                vector_tile_server_item = { 

                                    "id" :  500232,     
                                        "parent" : 500,
                                        "text" :  "e232",   //layer_item.type + " (v4.x popup)",   
                                    
                                    "layer_name" : _layer_name_,
                                    "icon" : open_new_tab_icon,
                                    "link_type": "vectortile_esri_v4_e232",     
                                    "state"       : {
                                                    "opened"    : true,  // is the node open
                                                    // disabled  : boolean  // is the node disabled
                                                    // "selected"  : true   // is the node selected
                                                },
                                                
                                    "node_path" : _node_path_, 
                                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                                    "server_path" : _map_server_url_,
                                    "layer_id" :  _layer_id_,            
                                    "type" : _type_
                                    };
                                    
                                    vector_tile_server_flatjson.push(vector_tile_server_item)
    



                                    vector_tile_server_item = { 

                                        "id" :  500230,     
                                        "parent" : 500,
                                        "text" : "e230 classic",   //layer_item.type + " (v3.x)", 
                                        
                                        "layer_name" : _layer_name_,
                                        "icon" : open_new_tab_icon,
                                        "link_type": "vectortile_esri_v3_e230",     
                                        "state"       : {
                                                        "opened"    : true,  // is the node open
                                                        // disabled  : boolean  // is the node disabled
                                                        // "selected"  : true   // is the node selected
                                                    },
                                                    
                                        "node_path" : _node_path_, 
                                        "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                                        "server_path" : _map_server_url_,
                                        "layer_id" :  _layer_id_,            
                                        "type" : _type_
                                        };
                                        
                                        vector_tile_server_flatjson.push(vector_tile_server_item)
        







    return vector_tile_server_flatjson


}



function create_GeocodeServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){



    var geocode_server_flatjson = [];

    //  ....... add  root item  ....... 
      var geocode_server_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      geocode_server_flatjson.push(geocode_server_item) 
  //  ....... add  root item  ....... 









/**/
    // ---  --- only  --- top level type  --- ---
    geocode_server_item = { 
        "id" :  120,     
        "parent" : 10,
        "text" : "esri",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    geocode_server_flatjson.push(geocode_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/







                geocode_server_item = { 

                    "id" :  2631,     
                    "parent" : 120,
                    
                    "text" : "2631 default,stock",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2631",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



      
                geocode_server_item = { 

                    "id" :  2632,     
                    "parent" : 120,
                    
                    "text" : "2632 advanced.number.search",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2632",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)


         
                
              



                   geocode_server_item = { 

                    "id" :  2640,     
                    "parent" : 120,
                    
                    "text" : "2640 motorola-flex-replica",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2640",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)




                    


/**/
    // ---  --- only  --- top level type  --- ---
    geocode_server_item = { 
        "id" :  2510,     
        "parent" : 120,
        "text" : "only address,no street",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    geocode_server_flatjson.push(geocode_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/

                    

                   geocode_server_item = { 

                    "id" :  2610,     
                    "parent" : 2510,
                    
                    "text" : "2610 only real addr",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2610",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)












               geocode_server_item = { 

                    "id" :  2653,     
                    "parent" : 2510,
                    
                    "text" : "2653" + red_square_icon + "fake str.addr(RED)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2653",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                    geocode_server_item = { 

                    "id" :  2655,     
                    "parent" : 2510,
                    
                    "text" : "2655" + yellow_square_icon + "POI(yellow)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2655",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)




                    geocode_server_item = { 

                    "id" :  2657,     
                    "parent" : 2510,
                    
                    "text" : "2657" + yellow_square_icon + "POI(yellow) &" + red_square_icon + "fake str.addr(RED)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2657",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)









                geocode_server_item = { 

                    "id" :  2633,     
                    "parent" : 120,
                    
                    "text" : "2633 advanced.POI.search",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2633",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)

                       



                    geocode_server_item = { 

                    "id" :  2625,     
                    "parent" : 120,
                    
                    "text" : "2625" + " advanced" + yellow_square_icon + "POI(yellow)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2625",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                     geocode_server_item = { 

                    "id" :  2613,     
                    "parent" : 120,
                    
                    "text" : "2613" + " only advanced POI, no addr, no street",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2613",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)






                     geocode_server_item = { 

                    "id" :  2641,     
                    "parent" : 120,
                    
                    "text" : "2641" + pink_square_icon + "Parcel number(pink)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_2641",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)





  /**/
    // ---  --- only  --- top level type  --- ---
    geocode_server_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "street view by google",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    geocode_server_flatjson.push(geocode_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/






                    geocode_server_item = { 

                    "id" :  1631,     
                    "parent" : 100,
                    
                    "text" : "1631 default,stock",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1631",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)




                    geocode_server_item = { 

                    "id" :  1632,     
                    "parent" : 100,
                    
                    "text" : "1632 advanced.number.search",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1632",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)






                    geocode_server_item = { 

                    "id" :  1640,     
                    "parent" : 100,
                    
                    "text" : "1640 motorola-flex-replica",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1640",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                    

/**/
    // ---  --- only  --- top level type  --- ---
    geocode_server_item = { 
        "id" :  2511,     
        "parent" : 100,
        "text" : "only address,no street",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    geocode_server_flatjson.push(geocode_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/





                     geocode_server_item = { 

                    "id" :  1610,     
                    "parent" : 2511,
                    
                    "text" : "1610 only real addr",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1610",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                    geocode_server_item = { 

                    "id" :  1653,     
                    "parent" : 2511,
                    
                    "text" : "1653" + red_square_icon + "fake str.addr(RED)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1653",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                     geocode_server_item = { 

                    "id" :  1655,     
                    "parent" : 2511,
                    
                    "text" : "1655" + yellow_square_icon + "POI(yellow)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1655",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                    geocode_server_item = { 

                    "id" :  1657,     
                    "parent" : 2511,
                    
                    "text" : "1657" + yellow_square_icon + "POI(yellow) &" + red_square_icon + "fake str.addr(RED)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1657",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)








                    
                
                    geocode_server_item = { 

                    "id" :  1633,     
                    "parent" : 100,
                    
                    "text" : "1633 advanced.POI.search",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1633",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)








                     geocode_server_item = { 

                    "id" :  1625,     
                    "parent" : 100,
                    
                    "text" : "1625" + " advanced" + yellow_square_icon + "POI(yellow)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1625",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                     geocode_server_item = { 

                    "id" :  1613,     
                    "parent" : 100,
                    
                    "text" : "1613" + " only advanced POI, no addr, no street",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1613",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)




                     geocode_server_item = { 

                    "id" :  1641,     
                    "parent" : 100,
                    
                    "text" : "1641" + pink_square_icon + "Parcel number(pink)",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1641",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)


 /**/
    // ---  --- only  --- top level type  --- ---
    geocode_server_item = { 
        "id" :  2526,     
        "parent" : 100,
        "text" : "add layer",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    geocode_server_flatjson.push(geocode_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/




    
                geocode_server_item = { 

                "id" :  2620,     
                "parent" : 2526,
                
                "text" : "2626 search-addr" + "<sup>+hoverable-layer</sup>",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "geocodeServer_searchable_googlemaps",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                };
                
                geocode_server_flatjson.push(geocode_server_item)




                geocode_server_item = { 

                    "id" :  2627,     
                    "parent" : 2526,
                    
                    "text" : "2627 search-addr" + "<sup>+clickable-layer</sup>",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_imagepriority_googlemaps",
                    "state"       : {
                                    "opened"    : true,  // is the node open
                                    // disabled  : boolean  // is the node disabled
                                    // "selected"  : true   // is the node selected
                                },
                                
                    "node_path" : _node_path_, 
                    "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                    "server_path" : _map_server_url_,
                    "layer_id" :  _layer_id_,            
                    "type" : _type_
                    };
                    
                    geocode_server_flatjson.push(geocode_server_item)



                



                    geocode_server_item = { 

                        "id" :  2628,     
                        "parent" : 2526,
                        
                        "text" : "2628 click-show-addr" + "<sup>+imageLayer</sup>",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "geocodeServer_reverse_googlemaps",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                        "server_path" : _map_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        };
                        
                        geocode_server_flatjson.push(geocode_server_item)
    





/**/
    // ---  --- only  --- top level type  --- ---
    geocode_server_item = { 
        "id" :  110,     
        "parent" : 10,
        "text" : "esri official query",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    geocode_server_flatjson.push(geocode_server_item)
    // ---  --- only  --- top level type  --- ---
    /**/





           geocode_server_item = { 

            "id" :  2227,     
            "parent" : 110,
            
            "text" : "2227 find-address-candidate",
            
            "layer_name" : _layer_name_,
            "icon" : open_new_tab_icon,
            "link_type": "geocodeServer_esriOfficial",
            "state"       : {
                            "opened"    : true,  // is the node open
                            // disabled  : boolean  // is the node disabled
                            // "selected"  : true   // is the node selected
                        },
                        
            "node_path" : _node_path_, 
            "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
            "server_path" : _map_server_url_,
            "layer_id" :  _layer_id_,            
            "type" : _type_
            };
            
            geocode_server_flatjson.push(geocode_server_item)



        geocode_server_item = { 

                "id" :  2228,     
                "parent" : 110,
                
                "text" : "2228 lat-lng -> address",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "geocodeServer_reverse_esriOfficial",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                };
                
                geocode_server_flatjson.push(geocode_server_item)





                geocode_server_item = { 

                "id" :  2226,     
                "parent" : 110,
                
                "text" : "2226 suggest",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "geocodeServer_suggest_esriOfficial",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                };
                
                geocode_server_flatjson.push(geocode_server_item)



                geocode_server_item = { 

                "id" :  2224,     
                "parent" : 110,
                
                "text" : "2224 geocode-addresses",
                
                "layer_name" : _layer_name_,
                "icon" : open_new_tab_icon,
                "link_type": "geocodeServer_geocodeAddresses_esriOfficial",
                "state"       : {
                                "opened"    : true,  // is the node open
                                // disabled  : boolean  // is the node disabled
                                // "selected"  : true   // is the node selected
                            },
                            
                "node_path" : _node_path_, 
                "absolute_path" : _map_server_url_,  // warning image server do not add '/' + _layer_id_,
                "server_path" : _map_server_url_,
                "layer_id" :  _layer_id_,            
                "type" : _type_
                };
                
                geocode_server_flatjson.push(geocode_server_item)



    return geocode_server_flatjson


}



function create_NAServerFlatjson(_NA_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){

    var na_server_flatjson = [];

    

    //  ....... add  root item  ....... 
      var na_server_item = { 

          "id" :  6309,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _NA_server_url_ + '/' + _layer_id_,
          "server_path" : _NA_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      na_server_flatjson.push(na_server_item) 
  //  ....... add  root item  ....... 





  switch (_type_) {

    case "route-layer":

                    na_server_item = { 

                        "id" :  1006319,     
                        "parent" : 6309,
                        
                        "text" : "6319 find route",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "NAserver_6319",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _NA_server_url_,  // warning image server do not add '/' + _layer_id_,
                        "server_path" : _NA_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        };
                        
                        na_server_flatjson.push(na_server_item)




                        na_server_item = { 

                        "id" :  1006318,     
                        "parent" : 6309,
                        
                        "text" : "6318 multi-stops route",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "NAserver_6318",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _NA_server_url_,  // warning image server do not add '/' + _layer_id_,
                        "server_path" : _NA_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        };
                        
                        na_server_flatjson.push(na_server_item)


    break;


    case "closest-facility-layer":


                na_server_item = { 

                        "id" :  1006329,     
                        "parent" : 6309,
                        
                        "text" : "6329 find closest facility",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "NAserver_6329",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _NA_server_url_,  // warning image server do not add '/' + _layer_id_,
                        "server_path" : _NA_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        };
                        
                        na_server_flatjson.push(na_server_item)


    break;

    case "service-area-layer":


                         na_server_item = { 

                        "id" :  1006339,     
                        "parent" : 6309,
                        
                        "text" : "6339 find service area",
                        
                        "layer_name" : _layer_name_,
                        "icon" : open_new_tab_icon,
                        "link_type": "NAserver_6339",
                        "state"       : {
                                        "opened"    : true,  // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    },
                                    
                        "node_path" : _node_path_, 
                        "absolute_path" : _NA_server_url_,  // warning image server do not add '/' + _layer_id_,
                        "server_path" : _NA_server_url_,
                        "layer_id" :  _layer_id_,            
                        "type" : _type_
                        };
                        
                        na_server_flatjson.push(na_server_item)

    break;

    default:
        // Code to execute if no case matches
  }//switch

    
   


    return na_server_flatjson


}



function create_NOTsupportFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){



    var not_support_flatjson = [];

    //  ....... add  root item  ....... 
      var not_support_item = { 

          "id" :  10,     
          "parent" : "#",
          "text" : _layer_name_,
          "layer_name" : _layer_name_,
          "icon" : folder_icon, // layer_item.icon,  
          "link_type": "folder",
          "state"       : {
              // root folder is always open
                              "opened"    : true,  // is the node open
                              // disabled  : boolean  // is the node disabled
                              // "selected"  : true   // is the node selected
                          },

      
          "node_path" : _node_path_, 
          "absolute_path" : _map_server_url_ + '/' + _layer_id_,
          "server_path" : _map_server_url_,
          "layer_id" :  _layer_id_,            
          "type" : _type_

      
      };
      // 1 time, first time run, add root item
      not_support_flatjson.push(not_support_item) 
  //  ....... add  root item  ....... 



  /**/
    // ---  --- only  --- top level type  --- ---
    not_support_item = { 
        "id" :  100,     
        "parent" : 10,
        "text" : "Not Support",
        "icon" : folder_icon,  
        "link_type": "folder", 
        "state"       : {
        "opened": iconJstreeforceOpen,  // is the node open
                        // disabled  : boolean  // is the node disabled
                        // "selected"  : true   // is the node selected
                    }
    };

    not_support_flatjson.push(not_support_item)
    // ---  --- only  --- top level type  --- ---
    /**/


    
    


    return not_support_flatjson


}




// only for list,  searchLayer.js, not for folder.js !!!, folder.js will skip this function, directly call create_MapServer_flatjson()
function create_tree_icon_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_){


    var multiType_flatjson = [];


    // only for arcgis online list 
    if (_type_ == 'other'){ 
       
        console.log(' other. . . tree icon flat json item ... ...  ')
        multiType_flatjson = create_NOTsupportFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)




    /* only for searchMapServer list 
       _type_ use equal because I have control of type, I set type and layer id -999999 previously
    */  
    } else if ((_type_ == 'MapServer') || (_type_ == 'FeatureServer')){   
            
            console.log(' MapServer . . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_MapServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

        } else if (_type_ == 'ImageServer'){  

            console.log(' ImageServer . . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_ImageServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

        } else if (_type_ == 'SceneServer'){ 

            console.log(' SceneServer. . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_sceneServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

        } else if (_type_ == 'VectorTileServer'){ 

            console.log(' VectorTileServer. . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_VectorTileServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

        } else if (_type_ == 'GeocodeServer'){ 

            console.log(' GeocodeServer. . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_GeocodeServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)


         } else if (_type_ == 'NAServer'){ 

            console.log(' NAServer. . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_NAServerFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

            
        } else if (_type_ == 'GeometryServer'){ 

            console.log(' GeometryServer. . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_NOTsupportFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

        } else if (_type_ == 'GPServer'){ 

            console.log(' GPServer. . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_NOTsupportFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)




        /* only for searchlayer list 
           _type_ use includes is because I have no control of type, esri, sometime use lower case 'table', sometime use "Table", same for other type  
        */                      
        // order is matter,  table, raster must before MapServer
       } else if ((_type_.includes("table")) || (_type_.includes("Table"))){       

            // ============= for feature tables only =====================
            /**/
            console.log(' table . . . tree icon flat json item ... ...  ')
            multiType_flatjson = create_tableFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
            /**/
            // ======  End ======= for tables only =====================

        } else if (_type_.includes("Raster") || _type_.includes("raster")){    
                                    // render layer only
                                    /**/
                                    // order is matter,  table, raster must before MapServer     
                                        
                                            // ********** raster layers only **********
                                            /**/
                                            console.log(' Raster . . . tree icon flat json item ... ...  ')
                                            multiType_flatjson = create_rasterFlatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

                                            // only for  "raster catalog layer", show raster tile boundary as feature layer.
                                            if (_type_ == "Raster Catalog Layer"){
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
                                                console.log(' Raster Catalog Layer . . . tree icon flat json item ... ...  ')
                                                // regard as 'feature layer for grid'
                                                multiType_flatjson = feature_layer_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)
                                            }
                                    // **********  end  **********  raster layers only **********
                                                           
                                       
        } else {  
                                                /*
                                                    ____type.includes("Feature"))  or undefined unknow type  all treat as 'feature' layer icon
                                                    everything else, can't identify, by type, or by url    
                                                    special case, some time, type is undefined, but it is a featuerServer
                                                                                                                            id: 0
                                                                                                                            name: "AnaheimBuildings"
                                                                                                                            type: undefined
                                                                                                                            _center_lat: "33.836594"
                                                                                                                            _center_long: "-117.914299"
                                                                                                                            _center_zoom: "17"
                                                                                                                            _layer_path: "/Hosted/Test_Local_Gov_Scene_WFL1"
                                                        _layer_url: "https://gis.anaheim.net/server/rest/services/Hosted/Test_Local_Gov_Scene_WFL1/FeatureServer"

                                                        annotation layer example:   type:undefined
                                                        http://localhost:10/json2tree/esri/server/searchLayer.html?url=https%3A%2F%2Femapsplus.com%2Farcgis%2Frest%2Fservices%2FAlabama%2FAutaugaAnalyst%2FMapServer&org=Autauga+County%2C%C2%A0%C2%A0Alabama+State%2C%C2%A0%C2%A0https%3A%2F%2Femapsplus.com%2Farcgis%2Frest%2Fservices%2FAlabama%2FAutaugaAnalyst%2FMapServer&_center_lat=32.636507341858454&_center_long=-86.62695338761657&_center_zoom=16&filter_by=
                                                                                                                            
                                                    temp assuming all  type:undefined -> annotation layer
                                                */
                                                if (_type_.includes("Feature") || _type_.includes("feature")){ 

                                                    // warning, folder.js find log "create tree icon flatjson:    _type_ Feature Layer",  always is feature layer, no other choice.
                                                    // but for searchLayer.js,   could be others
                                                    console.log(' feature layer . . . tree icon flat json item ... ...  ')
                                                } else {
                                                    // unknow undefined type
                                                    console.log(' unknow undefined type, but still treat as feature layer . . . tree icon flat json item ... ...  ')
                                                }

                                                // only for feature layer
                                                multiType_flatjson = feature_layer_flatjson(_map_server_url_, _layer_id_,  _layer_name_ , _type_, _node_path_)

        } // else if  for layer only
       


        console.log(' multi Type flatjson  :  ',  multiType_flatjson)
        return multiType_flatjson

}       

