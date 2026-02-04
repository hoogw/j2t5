/*
    xxx_flatjson_mobile is simplify version of original website 
*/


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
                        "id" :  4907,     
                        "parent" : 10,
                        // google
                        "text" : google_svg + " Google",  
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    : true, //  iconJstreeforceOpen,   // is the node open
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
                                        "opened"    : true, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 





                   


                    icon_item = { 
                        "id" :  579,     
                        "parent" : 10,
                        "text" : esri_svg + " Esri", 
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    : true, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 


                        
                    
                    

                    icon_item = { 
                        "id" :  8651,     
                        "parent" : 10,
                        // Microsoft
                        "text" : microsoft_svg + " Microsoft",
                        "icon" : folder_icon,
                        "link_type": "folder",   
                        "state"       : {
                        // use this opened line for always default open this folder
                                        "opened"    : true, //  iconJstreeforceOpen,   // is the node open
                                        // disabled  : boolean  // is the node disabled
                                        // "selected"  : true   // is the node selected
                                    }
                    };
                    icon_flatjson.push(icon_item) 

                  



//  ------------------------- end --- top -------- level -----------------------------------------










 /*  = = = =  = = = = sub folder = = = =  = = = =  */

                            icon_item = { 

                                "id" :  6392,     
                                "parent" : 4907,
                                
                                
                                "text" : "6392 hover",
                                
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "mobile_6392",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
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

                                "id" : 7760,     
                                "parent" : 777,
                                "text" : "7760 hover",
                                "layer_name" : _layer_name_,
                                "icon" : open_new_tab_icon,
                                "link_type": "mobile_7760",
                                "state"       : {
                                                "opened"    : true,  // is the node open
                                                // disabled  : boolean  // is the node disabled
                                                // "selected"  : true   // is the node selected
                                            },
                                "node_path" : _node_path_, 
                                "absolute_path" : _map_server_url_ + '/' + _layer_id_,
                                "server_path" : _map_server_url_,
                                "layer_id" :  _layer_id_,            
                                "type" : _type_
                                };
                                icon_flatjson.push(icon_item) 












// final return whole thing, always at bottom                                
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
        "text" : esri_svg + " esri",
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
                    
                    "text" : "2631 Default",
                    
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
                    
                    "text" : "2632 Number-Search",
                    
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
                    
                    "text" : "2640 Motorola-Flex-Replica",
                    
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
        "text" : "Address-Only",
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
                    
                    "text" : "2610 Real-Address-Only",
                    
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
                    
                    "text" : "2653" + " Fake-Street-Address" + red_square_icon + "red",
                    
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
                    
                    "text" : "2655" + " POI" + yellow_square_icon + "yellow",
                    
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
                    
                    "text" : "2657" + " POI" + yellow_square_icon + "&" + " Fake-Street-Address" + red_square_icon,
                    
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
                    
                    "text" : "2633 List All POI",
                    
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
                    
                    "text" : "2625" + " List All POI" + yellow_square_icon ,
                    
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
                    
                    "text" : "2613 POI-Only",
                    
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
                    
                    "text" : "2641" + "Parcel-Number" + pink_square_icon + "pink",
                    
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
        "text" : google_svg + " google",
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
                    
                    "text" : "1631 Default",
                    
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
                    
                    "text" : "1632 Number-Search",
                    
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
                    
                    "text" : "1640 Motorola-Flex-Replica",
                    
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
        "text" : "Address-Only",
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
                    
                    "text" : "1610 Real-Address-Only",
                    
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
                    
                    "text" : "1653" + " Fake-Street-Address" + red_square_icon + "red",
                    
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

                    "id" :  1652,     
                    "parent" : 2511,
                    
                    "text" : "1652" + " USPS Validate" + red_square_icon + "fake-red",
                    
                    "layer_name" : _layer_name_,
                    "icon" : open_new_tab_icon,
                    "link_type": "geocodeServer_1652",
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
                    
                    "text" : "1655" + " POI" + yellow_square_icon + "yellow",
                    
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
                    
                    "text" : "1657" + " POI" + yellow_square_icon + "&" + " Fake-Street-Address" + red_square_icon,
                    
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
                    
                    "text" : "1633 List All POI",
                    
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
                    
                    "text" : "1625" + " List All POI" + yellow_square_icon,
                    
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
                    
                    "text" : "1613 POI-Only",
                    
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
                    
                    "text" : "1641" + "Parcel-Number" + pink_square_icon + "pink",
                    
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
        "text" : esri_svg + " esri official query",
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

