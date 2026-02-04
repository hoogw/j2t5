


 				          /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                  
                         // will keep previous feature layer code, but convert feature layer to map image layer
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/




/*
  
      only for create feature layer from MapImageLayer.sublayer.items

      create 300+ feature layers at begining isn't a problem, but add feature layer to map by map.add(featurelayerObject) will instantly freeze browser. 

      1). create mapimagelayer-object, loaded complete.
      2). scan mapimagelayer-object.sublayers 
      3). create feature layer object for each item of "sublayers"
      4). Do not add feature layer object to map yet,  just create feature layer object, and keep track by 'real-layer-id'(whatever item.id or sublayer.layerid)   {real-layer-id: featurelayerObject}
      5). only when user click single layer, this is time to add feature layer object to map.
      6). before add single layer to map should remove all previous feature layer from map

*/



require([
  "esri/Map",
 
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",
  
  
  "esri/widgets/LayerList",
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "esri/core/reactiveUtils",

  

  "esri/rest/identify",
  "esri/rest/support/IdentifyParameters"
  
  ], async function (
  Map, MapView,

            Basemap,
            Attribution,
            
            WebTileLayer, BasemapToggle,
   LayerList, Legend,Search,
  reactiveUtils, 
  identify, IdentifyParameters
) {

  



        /**/
        //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
        /**/
                  
                  var turn_on_off_popup_status = false; //true;

                  var _pointer_move_handle;
                  var  params; // for identify
                  var _current_visible_layer_id_array = [];
        
        /**/
        //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
        /**/







// 'real-layer-id'(whatever item.id or sublayer.layerid), is used for key, do not use layer name as key, since layer name could be duplicate in different sub-folder
/**/   
//  must use this for preselect (create featurelayer, add to map). Because preselect can't wait until all feature layer object created, if pre-selected feature layer object is not loaded yet, use this sublayer.item to create one 
var flatFeatureLayerSublayerItem = {}  //  {real-layer-id: MapImageLayer.sublayer.item}   1). MapImageLayer.sublayer.item.createFeaturelayer()    2).  map.add(new-created-featurelayer-object)
// {real-layer-id: MapImageLayer.sublayer.item.createFeatureLayer()}


var multi_selected_featureLayerObject_on_map = {} 

// for single-select-only
var single_selected_featureLayerObject_on_map
var single_selected_featureLayerRealLayerID


var jstree_root_id = 98765


var folder_structure_flatjson= [];
var real_layer_id_as_jstreeid = 0;
var flatJson_item;
var custom_icon


/**/
              //   --- --- --- --- back to previous extent --- ------ ---
              /**/
              var extentStack = new Stack(); 
              /**/
              //   --- --- end --- --- back to previous extent --- --- --- ---  
              /**/



                  

  
// any document ready function is in here
dom_ready_dojo();

var map = new Map({

           //base map id without an API key is here https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                             basemap: "hybrid"
    
                         });

// mapimagelayer - widget - convert - to - component - 
            const [MapImageLayer] = await $arcgis.import(["@arcgis/core/layers/MapImageLayer.js"]); 
            //- - end - - mapimagelayer - widget - convert - to - component - 
            var _map_image_layer = new MapImageLayer({
     // url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        url: ___url_string,
        
        // withou this , by default, only 'name' field exported, must specify ["*"] here 
        outFields: ["*"],


       

        
        // opacitySlider, since v4.12, we use 4.11 because v4.12 have bug, failed popupTemplate.content ["*"]
        //https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-smartMapping-OpacitySlider.html
        //https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/
        opacity: 0.7
      
});



// must wait until promise resolved 
_map_image_layer
      .loadAll()
      .catch(function(error) {
        // Ignore any failed resources
      })
      .then(function() {
        console.log(" map image layer All loaded",___url_string,  _map_image_layer);
        // enforce update page title as MapServer title
        document.title = _map_image_layer.title


                  /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                  
                  // in use, must add empty map image layer to map ( for map image layer only)                   
                  map.add(_map_image_layer)
                  
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/




                  /**/
                  //   --- --- --- --- back to previous extent --- --- esri only --- ---
                  /**/
                              // first time, 1 time, zoom to map image layer full extent

                              // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-MapImageLayer.html#events-summary
                              // Although this example uses M  ap V i e w , any class instance that is a promise may use when() in the same way
                              view.when(function(evt) {
                                // This function will execute once the promise is resolved
                                use_extent()
                            }, function(error){
                                // This function will execute if the promise is rejected due to an error
                            });
                  /**/
                  //   --- --- end --- --- back to previous extent --- --- esri only --- ---  
                  /**/




                          

                     //    ****************** convert each layer in map_image_layer to featureLayer, then add featureLayer to map ********************
                     /**/

                            // only for v4.12+  https://community.esri.com/thread/221217-how-do-i-access-all-attributes-in-a-mapimagelayer-sublayer-from-popuptemplate
                            view.popup.defaultPopupTemplateEnabled = true;
                            // setting the popupTemplate's content to {"*"} is no longer supported. ( works for v4.11, but not v4.12) Instead, we suggest setting view.popup.defaultPopupTemplateEnabled = true. Unfortunately, this is not implemented on the MapImagelayer
                            
                            /**/
                            // must be here, when all layer loaded, otherwise, outside here, will not work.     
                            createRoot_tree(_map_image_layer);
                            // must be here, after recursive completed create jstree-flat-json
                            console.log(' final layer list flat json before create : : : jstree : : : : : : : : :',  folder_structure_flatjson)
                            jstree_layerlist(folder_structure_flatjson)


                            

                    //   ****************** convert each layer in map_image_layer to featureLayer, then add featureLayer to map ********************
                    /**/


                  /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/

                                          //  ++++++++++++++++ click +++++++++ identify ++++++++++++++++++++++++++++++  
                                            // executeIdentifyTask() is called each time the view is clicked
                                            // mouse event api:
                                            //https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#event-pointer-move  
                                            
                                           // view.on("pointer-move",  ["Shift"], executeIdentifyTask_hover);
                                           
                                           view.on("click", executeIdentifyTask_click);     
                                           _pointer_move_handle =    view.on("pointer-move",  executeIdentifyTask_hover);

                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/


                  // first time loadall() function load all map image layers, this is I don't want. I want empty all layers at begining, let user choose what layer they want to show. 
                  hide_all_sublayer_of_mapimagelayer()

                 

  });




 				  /**/
          //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
          /**/
                  

                    // specially for mouse hover event, no popup, only show info on side 
                    function executeIdentifyTask_hover(event) {

                      console.log('executeIdentifyTask_hover event>>>',event)

                  // only for hover, pointer-move event. NO need for click event.         
                  //******************** further propagation of the current event bubbling up the event chain ************************
                      //bug,   not fix,  not working.
                    // Prevents further propagation of the current event bubbling up the event chain.
                    // without this, will continue fire multiple event.
                    // event.preventDefault();  //not in arcgis api
                    
                  // only stop this already fired event propapate to parent element in DOM, 
                  // does NOT stop fire similar continued event train up.
                  event.stopPropagation();

                      // not in arcgis api
                      //https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
                    // event.stopImmediatePropagation();

                  //fix bug, temp work around is once first event fired, then 
                  // completely remove pointer-move event from view, 
                  // after a while, for example, identify task ajax call come back, must re-added back listener. 
                    _pointer_move_handle.remove();
                  //******************** end  **************** further propagation of the current event bubbling up the event chain ************************ 

                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#event-pointer-move 
                  var ______point = view.toMap({x: event.x, y: event.y});
                  
                  console.log("pointer-move-  ===== event ===== geometry  : ", ______point);
                  
                              // Set the parameters for the Identify
                              params = new IdentifyParameters();
                              params.tolerance = 3; //The distance in screen pixels from the specified geometry within which the identify should be performed

                              params.width = view.width;
                              params.height = view.height;
                  
                  //************ get current visible layer **************************
                              // bug not fixed by esri,  IdentifyTask returns feature even if layer is not visible
                              //https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-IdentifyParameters.html#layerOption
                            
                              
                            // by default, without define, it is "top", 
                            // only return one layer, which is last one ("top")  
                            // params.layerOption = "top";          
                              
                            
                            // if you want return multiple layers, must define  "visible" here.
                            params.layerOption = "visible";       

                              _current_visible_layer_id_array=[]
                            
                            // .allSublayers is a flat collection of all children layer, including parent folder 
                              _current_visible_layer_id_array = getVisibleLayerIds(_map_image_layer.allSublayers); 
                            
                              params.layerIds = _current_visible_layer_id_array
                            
                            console.log(' _current_visible_layer_id_array ????? ',_current_visible_layer_id_array)
                            
                            
                  //************ end ************  get current visible layer **************************



                  // Set the geometry to the location of the view click
                  params.geometry = ______point;   //event.mapPoint;
                  params.mapExtent = view.extent;
                  //document.getElementById("viewDiv").style.cursor = "wait";

                  // This function returns a promise that resolves to an array of features
                  // A custom popupTemplate is set for each feature based on the layer it
                  // originates from
                  //  https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=tasks-identify






                  identify
                  .identify(___url_string, params)
                  .then(function(response) {


                      var results = response.results;

                      console.log('mouse- move === >> identify-results: ', results)
                      
                      $("#info_outline").hide()
                      
                      
                          if (results.length > 0) 
                          {

                          
                              var _multiple_attributes = {};   
                              for (var k = 0; k < results.length; k++) {
                                      //console.log(results[k]);
                                      //Do something
                                      var _layerName = results[k].layerName
                                      _multiple_attributes[_layerName] = results[k].feature.attributes;
                                      
                                      
                                      
                                  }// for 
                                
                                //--------------- show attribute at left side -------------------
                              
                                editor_info_outline.set(_multiple_attributes);

                                editor_info_outline.expandAll();

                                //editor_info_outline.setName();

                                if (turn_on_off_popup_status){
                                      $("#info_outline").show()
                                }
                              

                                //--------------- End --------------  show attribute at left side -------------------
                      
                          } else {
                              // empty json_editor
                              editor_info_outline.set({});
                              
                          }
                          
                          
                          
                          
                          //document.getElementById("viewDiv").style.cursor = "auto";
                          
                          
                          
                          // only for hover, pointer-move event. NO need for click event.   
                        // after identify completed turn on pointer-move event listener
                          _pointer_move_handle = view.on("pointer-move",  executeIdentifyTask_hover);
                              
                        
                          

                  }) //  identifyTask







                    }


                    function executeIdentifyTask_click(event) {
                    console.log("click  ===== event ===== geometry  : ", event.mapPoint);

                                // Set the parameters for the Identify
                                params = new IdentifyParameters();
                                params.tolerance = 3; //The distance in screen pixels from the specified geometry within which the identify should be performed

                                

                                params.width = view.width;
                                params.height = view.height;




                    //************ get current visible layer **************************
                    //
                                // bug not fixed by esri,  IdentifyTask returns feature even if layer is not visible
                                //https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-IdentifyParameters.html#layerOption
                                // params.layerOption = "top";          // bug, should but not (top:  regardless visible or not,  identify all layers,)
                                params.layerOption = "visible";        // bug, should but not (only visible layers identified)



                                _current_visible_layer_id_array=[]
                              
                              
                              
                              
                              // .allSublayers is a flat collection of all children layer, including parent folder 
                                _current_visible_layer_id_array = getVisibleLayerIds(_map_image_layer.allSublayers); 
                              
                              
                              
                              
                              // not use, have better way, use collection.flatten(callback)
                              // recursive_nestedLayer(map,_map_image_layer.sublayers);
                                
                                
                                
                                
                                
                              //  console.log('_current_visible_layer_id_array ==>>', _current_visible_layer_id_array)
                                params.layerIds = _current_visible_layer_id_array
                                // params.layerIds = [0]
                              
                                
                                
                              //https://community.esri.com/thread/192627-jsapi-v43-identifytask-returns-feature-even-if-layer-is-not-visible

                              //  params.layerIds = [13,18]; // not work correctly, not sure why? bug? ESRI not fix !!
                                //params.layerIds = [-1];


                    //************ end ************  get current visible layer **************************








                    // Set the geometry to the location of the view click
                    params.geometry = event.mapPoint;
                    params.mapExtent = view.extent;
                    //  document.getElementById("viewDiv").style.cursor = "wait";

                    // This function returns a promise that resolves to an array of features
                    // A custom popupTemplate is set for each feature based on the layer it
                    // originates from
                    // old 4.22 https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=tasks-identify
                    // new 4.28 https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=identify


                    identify
                    .identify(___url_string, params)
                    .then(function(response) {


                        var results = response.results;

                        console.log('   click === >> identify-results: ', results)
                        
                        $("#list").hide()
                        
                        
                            if (results.length > 0) 
                            {

                            
                                var _multiple_attributes = {};   
                                for (var k = 0; k < results.length; k++) {
                                        //console.log(results[k]);
                                        //Do something
                                        var _layerName = results[k].layerName
                                        _multiple_attributes[_layerName] = results[k].feature.attributes;
                                        
                                        
                                        
                                    }// for 
                                  
                                  //--------------- show attribute at left side -------------------
                                
                                  editor_list.set(_multiple_attributes);

                                  editor_list.expandAll();

                                  //editor_list.setName();


                                  $("#list").show()

                                  //--------------- End --------------  show attribute at left side -------------------
                        
                            } else {
                                // empty json_editor
                                editor_list.set({});
                                
                            }
                            
                            
                            
                            //document.getElementById("viewDiv").style.cursor = "auto";
                            
                            
                            

                    }) //  identifyTask







                    } 



                    // *********************** get current visible layer ***********************

                              /*
                              // https://community.esri.com/thread/192627-jsapi-v43-identifytask-returns-feature-even-if-layer-is-not-visible 
                              // only works when layer  NOT  have nest sublayers. Only 1 level, 
                                function getVisibleLayerIds(map, layer){
                                    if (layer.sublayers){
                                      return layer.sublayers.filter(sublayer => sublayer.visible).map(sublayer => layer.sublayers.indexOf(sublayer));
                                    } else {
                                      return layer.visible ? [map.allLayers.indexOf(layer)] : [-1];
                                    }
                                  }
                              */  
                                  
                                  
                              function getVisibleLayerIds(flat_layer_collection){
                                  
                                // layer is collection of all kinds of layers. find the visible one
                                
                                var ___array = [];
                                flat_layer_collection.forEach(function(item, i){
                                    
                                        
                                      //  console.log("flat_collection_forEach - item: ====== >",item )
                                        
                                        
                                        
                                        
                                        if (item.sublayers) {
                                              // if item.sublayers is NOT null, means, item have children sulayer or layers.
                                            // filter out
                                            
                                        } else {
                                                  // sublayer is null
                                                        if (item.visible) {

                                                                ___array.push(item.id);
                                                        } else {

                                                                  ___array.push(-1);

                                                        }
                                        
                                                }
                                      });
                                
                                
                                return ___array;
                              } //  getVisibleLayerIds
                              
                              
                                // not use, have better way, use collection.flatten(callback) https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Collection.html#flatten              
                              // for nested sublayer, use recursive   
                              /*
                              function recursive_nestedLayer(map, _nestedLayer){
                                  
                                                _nestedLayer.forEach(function(item, i){
                                                                          
                                                          if (item.sublayers){
                                    
                                                                  // recursive function deep 1 level
                                                                  recursive_nestedLayer(map, item.sublayers);
                                                            }else {
                                                                
                                                                    console.log('-low-level-item',item )
                                                                    
                                                                    if (item.visible){
                                                                        
                                                                        console.log("visible !!!!")
                                                                        
                                                                        
                                                                        // map.allLayers.indexOf(item), not work, maybe lost layer handle, instead use item.id works.
                                                                        //_current_visible_layer_id_array.push(map.allLayers.indexOf(item));
                                                                        _current_visible_layer_id_array.push(item.id);
                                                                    } else {
                                                                        
                                                                        _current_visible_layer_id_array.push(-1);
                                                                        
                                                                    }
                                                                    
                                                                  
                                                    
                                                    
                                                            } // if             
                                                                                        
                                                });
                                
                                } //recursive_nestedLayer
                                    
                                  */
                                      
                    // *********************** end ********************** get current visible layer ***********************      
                          


          /**/
          //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
          /**/








  // Add the map to a MapView
  var view = new MapView({

              // Exclude the zoom widget from the default UI
              ui: {
                components: ["attribution"]
              },
      container: "viewDiv",
      center: [_center_long, _center_lat],
      zoom: _center_zoom,
      map: map,
      
      
      
      /*
      // mouse hover hightlight feature as 
          highlightOptions: {
            color: "orange"
          }
      */
      
  });

         
            // ----- ui -----  ----- 
            init_view_ui()
              
            /**/
            // ----- ui -----  ----- 
            /**/
                
               function init_view_ui(){
              
                // remove following widget
                view.ui.remove(["zoom", "attribution"]);


                  /**/ 
                  // = = = = = . . . attribution . . .  = = = = =

                  const attribution_widget = new Attribution({
                                                              view: view,
                                                              id: "attribution-id",
                                                              },
                                                           "attribution-outside-of-map-div" 
                                              );

                  
                  // = = = = =  end . . . attribution . . .  = = = = =
                  /**/ 


                
                                  // ...................... toggle basemap ....................
                                  
                                        //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-widgets
                                        // 1 - Create the widget
                                        var toggle = new BasemapToggle({
                                          // 2 - Set properties
                                          view: view, // view that provides access to the map's 'topo' basemap
                                          //  base map id https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
                                          nextBasemap: "dark-gray-3d"
                                        });

                                        // Add widget to the top right corner of the view
                                        view.ui.add(toggle, "bottom-trailing");

                                  // ...........end ........... toggle basemap ....................    

                                  /**/
                          //   --- --- --- --- back to previous extent --- --- --- ---
                          /**/
                                // legend block too much map, not use
                                //var legendDIV = document.getElementById("legend-div");
                                //view.ui.add(legendDIV, "top-right");

                                var darkButton = document.getElementById("dark-btn");
                                view.ui.add(darkButton, "bottom-right");

                                var fullExtentButton = document.getElementById("full_extent_btn");
                                view.ui.add(fullExtentButton, "bottom-right");
                                var back2PreviousExtentButton = document.getElementById("back_to_previous_extent_btn");
                                view.ui.add(back2PreviousExtentButton, "bottom-right");
                          /**/
                          //   --- --- end --- --- back to previous extent --- --- --- ---  
                          /**/ 

                            /**/
                            // - - - ftOpacity  - - - 
                            /**/
                            // first time, run 1 time, set opacity
                            if (param_overlayOpacity){
                              ftOpacity = param_overlayOpacity / 10
                            }


                            var opacity_title = document.createElement("span");
                            opacity_title.id = "opacitytitle_span"
                            opacity_title.style.fontSize = '36px'
                            opacity_title.style.fontWeight = 100
                            opacity_title.style.color = 'blue'
                            opacity_title.style.textShadow = '1px 1px 1px #FFFFFF'

                            var opacity_title_text = document.createTextNode('opacity');
                            opacity_title.appendChild(opacity_title_text);
                            view.ui.add(opacity_title, "bottom-left");

                            var opacity_slider = document.createElement("input");
                            opacity_slider.type = 'range'
                            opacity_slider.id  = 'overlay_opacity_range'
                            opacity_slider.min = 0
                            opacity_slider.max = 10
                            opacity_slider.value = ftOpacity * 10
                            // https://stackoverflow.com/questions/62943565/change-colour-of-input-type-range-bar-in-css/76503278#76503278
                            // both works,  $('#overlay_opacity_range').css({'accent-color':'blue'}),  $('#overlay_opacity_range').css('accent-color', 'blue')
                            opacity_slider.style.accentColor = 'blue'
                            view.ui.add(opacity_slider, "bottom-left");
                          

                            var opacity_value = document.createElement("span");
                            opacity_value.id = 'overlay_opacity_label'
                            opacity_value.style.fontSize = '36px'
                            opacity_value.style.fontWeight = 200
                            opacity_value.style.color = 'blue'
                            opacity_value.style.textShadow = '1px 1px 1px #FFFFFF'

                            var opacity_value_text = document.createTextNode(ftOpacity * 10);
                            opacity_value.appendChild(opacity_value_text);
                            view.ui.add(opacity_value, "bottom-left");


                            // event handle
                            opacity_slider.addEventListener("change", (event) => {

                                            var _overlay_opacity = $('#overlay_opacity_range').val();
                                            $('#overlay_opacity_label').text(_overlay_opacity);
                                            update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  ftOpacity = _overlay_opacity / 10;
                    
                  /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/

                                                 

                                                  console.log(' map image layer opacity changed, ', single_selected_featureLayerRealLayerID,   _map_image_layer)
                                                  var _mapImageLayer_allsublayer_collection = _map_image_layer.allSublayers
                                                  console.log(" map image layer all sub layer collection is ready, ", _mapImageLayer_allsublayer_collection);
                                                  _mapImageLayer_allsublayer_collection.forEach(function(item, i){

                                                    // must support dynamic layer to change opacity. 
                                                    //    If use v10.71, not support dynamic layer, will get error, 
                                                    //        "capability not available 'layer.capabilities.exportMap.supportsDynamicLayers
                                                    if (item.opacity){
                                                      item.opacity = ftOpacity;
                                                    }
                                                    
                                                  });
                                                  

                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/


                            });
                            /**/
                            // ... end ...  - - - ftOpacity  - - -
                            /**/



// not use, because without stationary, this trigger hundreds of event, while I only need stationary one, map change event,  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/mapview-extent-change/td-p/305234
                            //view.watch("extent", function(newValue, oldValue) {

                             // not use, same as view . watch 
                             // map.watch("extent", function(newValue, oldValue) {
                             // watch map change event https://developers.arcgis.com/javascript/latest/working-with-props/


// in use, sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils
// Use reactiveUtils to check when the extent changes. We include view.stationary so we only show a message, when the view is not moving.
reactiveUtils.watch(
  () => [view.stationary, view.extent, view.scale],
  ([stationary, extent, scale], [wasStationary]) => {
      if (stationary) {

            console.log('stationary happened, current extent ', extent)

                   
                          _center_zoom = parseInt(view.zoom); // extent don't have zoom, zoom only from view
                          //_center_zoom = parseInt(extent.center.zoom) // not work, extent don't have zoom, zoom only from view
                          $('#current_zoom_level').text(_center_zoom);
                          update_url_parameter('_center_zoom', _center_zoom)

                          //_center_lat = view.center.latitude
                          //_center_long = view.center.longitude
                          _center_lat = extent.center.latitude // both work
                          _center_long = extent.center.longitude // both work
                          update_url_parameter('_center_lat', _center_lat)
                          update_url_parameter('_center_long', _center_long)

                          console.log(' watch extend changed..... lat, long, zoom',_center_lat,  _center_long,  _center_zoom)

                          /**/
                          //   --- --- --- --- back to previous extent --- --- --- ---
                          /**/
                          var new_extent = {
                            "center_lat": _center_lat,
                            "center_long": _center_long,
                            "center_zoom": _center_zoom
                          }                          
                          extentStack.push(new_extent)
                          console.log('extent stack just add new extent', extentStack.count, new_extent)

                          /**/
                          //   --- --- end --- --- back to previous extent --- --- --- ---  
                          /**/ 
                          

                          
                          
      } else if (wasStationary) {
                          // nothing to do
                          console.log(' was stationary , nothing to do, ')
      }
      return "";
    }
);

          // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui

/**/
// ----- end  ----- ui -----  ----- 
/**/




 				          /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                  
                          function hide_all_sublayer_of_mapimagelayer(){
                            
                            console.log(' hide all sublayer of mapimagelayer, ')
                            var _mapImageLayer_allsublayer_collection = _map_image_layer.allSublayers
                            console.log(" map image layer all sub layer collection is ready, ", _mapImageLayer_allsublayer_collection);
                            _mapImageLayer_allsublayer_collection.forEach(function(item, i){

                              // do not hide folder, only hide layer, because if hide folder, even user click layer, layer is not showing because its parent folder visible is false, still hiding 
                              if (item.sublayers){
                                item.visible = true;
                              } else {
                                item.visible = false;
                              }
                                  
                            });

                           
                               
                           

                          }
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/


                  







                /**/
                // only for single select  
                function remove_all_featurelayer_from_map(){

                  // only for single select, only remove the layer that is actually on map, only for single select  
                  if (single_selected_featureLayerObject_on_map){
                        single_selected_featureLayerObject_on_map.visible = false;
                        map.remove(single_selected_featureLayerObject_on_map)
                        // do not set null, since it reference the feature layer object will be used 
                        //single_selected_featureLayerObject_on_map = null
                        single_selected_featureLayerRealLayerID = null
                  }
                  

                 
               

                }


                
                /* tree do not use layer list
                var layerList = new LayerList({
                                                view: view,
                                                container: "layerlist-div"
                                              });
                */
                

                // in use                              
                function jstree_layerlist(root_allfolders_flatjson){


                                  
                  $('#jstree_layerlist')
                  // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
              
                          .on('changed.jstree', function (e, data) {
                          //.on('select_node.jstree', function (e, data) {
                              console.log(' click select folder node, event ', data)
                              var i, j, _selected_text = [], _selected_id = [], _selected_type = [];

                              for(i = 0, j = data.selected.length; i < j; i++) {
                                  _selected_text.push(data.instance.get_node(data.selected[i]).text);
                                  _selected_id.push(data.instance.get_node(data.selected[i]).id);
                                  // must use .original.type, because re-structured json does not carry our customized field 'type'
                                  _selected_type.push(data.instance.get_node(data.selected[i]).original.type);
                              }
                              // only get 1st selected node, so always use    _selected_xxxxx[0] 

                              //$('#event_result').html('Selected: ' + r.join(', '));
                              console.log('Selected node id : ' + _selected_id[0])
                                                                    console.log('Selected node text : ' +  _selected_text[0])
                                                                    console.log('Selected node type : ' +  _selected_type[0])

                              var layerid_as_key= _selected_id[0]
                              // can't be key, since 2 layer possible have same name, in different folder. use layer id as key instead 
                              var layername___ = _selected_text[0] 
                              var layertype_= _selected_type[0]

                              update_url_parameter('select_item_id', layerid_as_key);
                              update_url_parameter('select_item_text', layername___);
                              update_url_parameter('select_item_type', layertype_);

                              
                  /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                              //remove_all_featurelayer_from_map()
                              hide_all_sublayer_of_mapimagelayer()
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                              

                              switch(layertype_) {

                                  case "folder":
                                    console.log(' nothing to do when select "folder" ', layerid_as_key, layername___)

                                  break;

                                  case "layer":
                                    console.log(' render "layer" ', layerid_as_key, layername___)


                                        /**/
                                        //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                                        /**/

                                                          
                                                          console.log(' only show selected sublayer of mapimagelayer, real layer id is, ', layerid_as_key)
                                                          var _mapImageLayer_allsublayer_collection = _map_image_layer.allSublayers
                                                          _mapImageLayer_allsublayer_collection.forEach(function(item, i){
                                                            

                                                              if (item.id == layerid_as_key){
                                                                console.log(' found sublayer, its id is,  ', item, item.id )
                                                                item.visible = true;
                                                              } else {

                                                                        // do not hide folder, only hide layer, because if hide folder, even user click layer, layer is not showing because its parent folder visible is false, still hiding 
                                                                        if (item.sublayers){
                                                                          item.visible = true;
                                                                        } else {
                                                                          item.visible = false;
                                                                        }

                                                              }

                                                              
                                                          });

                                                        
                                        /**/
                                        //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                                        /**/

                                    
                                  
                                        console.log(' try to add this feature layer, but feature layer object is not ready yet, need to create feature layer from sublayer-item, layer id is >>> ', layerid_as_key)


                                      
                                        var sublayer = flatFeatureLayerSublayerItem[layerid_as_key];



                                        sublayer.createFeatureLayer()
                                                                                    .then((featureLayer) => featureLayer.load())
                                                                                    .then((featureLayer) => {
                                                                                        // feature layer auto popupTemplate, auto highlight, etc.
                                                                                        //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-popuptemplate
                                                                                        featureLayer.popupTemplate = featureLayer.createPopupTemplate();
                                                                                          featureLayer.outFields = ["*"];
                                                                                          featureLayer.opacity =  ftOpacity;
                                                                                          featureLayer.popupEnabled = true;


                                                                                          /**/
                                                                                          //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                                                                                          /**/
                                                                                          
                                                                                              // for tree only, add to map, but enforce visible false, let user click tree node to turn visible true(on)
                                                                                              //featureLayer.visible = true;
                                                                                              //map.add(featureLayer);
                                                                                        
                                                                                          /**/
                                                                                          //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                                                                                          /**/



                                                                                         single_selected_featureLayerObject_on_map = featureLayer
                                                                                         single_selected_featureLayerRealLayerID = featureLayer.layerId

                                                                                            /**/
                                                                                            //  .. - .. - ... zoom to extent or 1st feature   ... - .. - .. 
                                                                                            /**/
                                                                                            
                                                                                                      switch(zoom_to_extent_or_1st_feature) {

                                                                                                        case 'do_not_zoom_to':
                                                                                                              // nothing to do
                                                                                                              break;

                                                                                                        case 'zoom_to_this_layer_full_extent':
                                                                                                                // zoom to this feature layer
                                                                                                                featureLayer
                                                                                                                    .when(() => {
                                                                                                                      return featureLayer.queryExtent();
                                                                                                                    })
                                                                                                                    .then((response) => {
                                                                                                                      view.goTo(response.extent)
                                                                                                                      .catch(function(gotoError) {
                                                                                                                        if (gotoError.name != "AbortError") {
                                                                                                                          console.log('gotoError',  gotoError);
                                                                                                                        }
                                                                                                                      });//catuch
                                                                                                                    });//then
                                                                                                                  // -- end -- zoom to this feature layer
                                                                                                              break;

                                                                                                        case 'zoom_to_1st_feature_of_this_layer':

                                                                                                                  // zoom to 1st feature  
                                                                                                                  let query1stFT = featureLayer.createQuery();
                                                                                                                  query1stFT.where = "1=1";
                                                                                                                  //query1stFT.start = 0; // not use, could cause error, "Pagination is not supported"
                                                                                                                  //query1stFT.num = 1; // not use, could cause error, "Pagination is not supported"

                                                                                                                  featureLayer
                                                                                                                  .when(() => {
                                                                                                                    return featureLayer.queryFeatures(query1stFT);
                                                                                                                  })
                                                                                                                  .then((response) => {

                                                                                                                    console.log(' 1st feature response ', response)
                                                                                                                    view.goTo(response.features[0])
                                                                                                                    .catch(function(gotoError) {
                                                                                                                      if (gotoError.name != "AbortError") {
                                                                                                                        console.log('gotoError',  gotoError);
                                                                                                                      }
                                                                                                                    });//catuch
                                                                                                                  });//then
                                                                                                                // -- end -- zoom to 1st feature

                                                                                                        break;


                                                                                                  default:
                                                                                                    // code block
                                                                                                        }// switch
                                                                                            
                                                                                            /**/
                                                                                            //     ... - .. - ..  end .. - .. - ... zoom to extent or 1st feature    ... - .. - .. 
                                                                                            /**/

                                                                                        console.log(' loading completed,  just add this feature layer obj to map ', featureLayer )
                                                                                        // not use, layer name as key, since duplicate name is possible
                                                                                        //multi_selected_featureLayerObject_on_map[featureLayer.title] = featureLayer
                                                                                        // in use, jstree-layer-id as key
                                                                                        multi_selected_featureLayerObject_on_map[featureLayer.layerId] = featureLayer

                                                                                    })

                                    

                                  break;

                                  default:
                              }






                  

                          })




                          // 'ready.jstree' triggered after all nodes are finished loading
                          // 'loaded.jstree' , triggered after the root node is loaded for the first time
                          .on('ready.jstree', function (e, data) {

                              // bug, jstree loaded, but some feature layer not loaded yet, (only run 1 time, first time when root folder jstree complete loaded)
                              pre_select_item_level()

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
              // ************** all sublayer create featureLayer with default popupTemplate.  **************

                             
              function createRoot_tree(_rootMapServerJSON){

                 // ********* add root item  *********
                        flatJson_item =  { 
                              "id" : jstree_root_id,
                              "parent" : "#",   // root parent id must be #
                              "text" :  _rootMapServerJSON.title,
                              "icon" : folder_icon,
                              "state" : {
                                                  "opened"    : true,  // is the node open
                                                  // disabled  : boolean  // is the node disabled
                                                  // "selected"  : true   // is the node selected
                                              },

                            // "relative_path": _relative_name,                
                            // "node_path" : node_path, 
                              "absolute_path" : _rootMapServerJSON.url , 
                              "type" : "folder"
                          };

                          console.log(' root added - - -  >', flatJson_item)
                          folder_structure_flatjson.push(flatJson_item)
                          
                          
                          console.log(' recursive - - -( sublayers[collection], parent id)  >', _rootMapServerJSON.sublayers, jstree_root_id)
                                    // esri bug, sublayers array, layer order is reversed by esri, must do opposite way
                                    var _rootMapServersublayers_array = _rootMapServerJSON.sublayers
                                    var reversed_rootMapServersublayers_array = _rootMapServersublayers_array.reverse()
                                    createFeatureLayer_tree(reversed_rootMapServersublayers_array, jstree_root_id)

                            // ********* end ********* add layer item  *********
              }



             // layer under root(mapServer) 
             function createFeatureLayer_tree(_layerAndSubFolderCollection, parent_item_id){

                                    
                                    _layerAndSubFolderCollection.forEach(function(item){

                                            console.log("sublayers collection forEach - item: ====== >",item )

                                            if (item.sublayers) {
                                              // have sublayers, means 'folder', could be top root mapserver folder, could be sub-folder
                                              /**/


                                                  /*
                                                  //   ......  add sub-folder in fron of sub-layer name  ...... 
                                                  
                                                        //  item.sublayers is NOT null, means, item is a parent(folder) have other children sulayer or layers.
                                                        console.log(' parent(folder) . . title is  . .   . .   . . ', item.title)
                                                        var parent_folder_title = item.title
                                                        var one_level_deep_sublayers = item.sublayers
                                                        console.log(' parent(folder) . . one level deep sublayers  <<<<<. .   . .   . .>>>>> ', one_level_deep_sublayers)

                                                        // inject parent folder title to each sublayers's title,    "folderTitle/sublayerName"
                                                        one_level_deep_sublayers.forEach(function(sub_item){
                                                          sub_item.title =  '[ ' + parent_folder_title + ' ] / ' + sub_item.title
                                                        })
                                                  //  ......   end ......  add sub-folder in fron of sub-layer name  ...... 
                                                  */



                                                  /**/
                                                  // ********* add sub-folder item  *********
                                                          real_layer_id_as_jstreeid = item.id

                                                          flatJson_item =  { 
                                                                "id" : real_layer_id_as_jstreeid,
                                                                "parent" : parent_item_id,   // root parent id must be #
                                                                "text" : real_layer_id_as_jstreeid + layerID_NAME_separator +  item.title,
                                                                "icon" : folder_icon,
                                                                "state" : {
                                                                                    "opened"    : true,  // is the node open
                                                                                    // disabled  : boolean  // is the node disabled
                                                                                    // "selected"  : true   // is the node selected
                                                                                },

                                                              // "relative_path": _relative_name,                
                                                              // "node_path" : node_path, 
                                                                "absolute_path" : item.url , 
                                                                "type" : "folder"
                                                            };

                                                            console.log(' folder item added - - -  >', flatJson_item)
                                                            folder_structure_flatjson.push(flatJson_item)
                                                            
                                                            // in use,  recursive, support multiple-level-deep,
                                                           console.log(' recursive - - -( sublayers[collection], parent id)  >', item.sublayers, real_layer_id_as_jstreeid)
                                                           createFeatureLayer_tree(item.sublayers, real_layer_id_as_jstreeid)

                                                           // not use, no recursive, only support 1 level deep 
                                                           //createSubLayer_tree(item.sublayers, real_layer_id_as_jstreeid)

                                                    // ********* end ********* add layer item  *********


                                        
                                            } else {

                                                          
                                                          /* ---- sample ---- sublayer > create featureLayer with popupTemplate -----------
                                                            sublayer.createFeatureLayer()
                                                                    .then((featureLayer) => featureLayer.load())
                                                                    .then((featureLayer) => {
                                                                      sublayer.popupTemplate = featureLayer.createPopupTemplate();
                                                                    })
                                                            -------------------------------------------------------------------------------*/
                                                          
                                                                    // sublayer is null, means, this item is children,create feature layer 
                                                                    // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-Sublayer.html#createFeatureLayer

                                                                    var sublayer = item;
                                                                    console.log(' add this layer item to tree ',  sublayer)


                                                                    var _current_layer_geometryType 
                                                                    if (item.geometryType){
                                                                      _current_layer_geometryType = item.geometryType
                                                                    } else {
                                                                        _current_layer_geometryType = ''; // 'unknown geometry type'
                                                                    }

                                                                    switch(_current_layer_geometryType) {
                                                                      case "polygon":
                                                                              custom_icon = polygon_icon
                                                                              break;
                                                                      case "polyline":
                                                                              custom_icon = line_icon
                                                                              break;

                                                                      case "multipoint":
                                                                      case "point":
                                                                              custom_icon = point_icon
                                                                              break;
                                                                      default:
                                                                                  custom_icon = layer_icon
                                                                  }//switch geometry type




                                                                    // ********* add layer item  *********

                                                                    real_layer_id_as_jstreeid = item.id;
                                                                    flatJson_item =  { 
                                                                          "id" :  real_layer_id_as_jstreeid,
                                                                          "parent" : parent_item_id,
                                                                          "text" : real_layer_id_as_jstreeid + layerID_NAME_separator +  sublayer.title + '<sup style="font-size:8px">' + _current_layer_geometryType + '</sup>',
                                                                          "icon" : custom_icon,
                                                                          "state" : {
                                                                                              // "opened"    : true,  // is the node open
                                                                                              // disabled  : boolean  // is the node disabled
                                                                                              // "selected"  : true   // is the node selected
                                                                                          },

                                                                        // "relative_path": _relative_name,                
                                                                        // "node_path" : node_path, 
                                                                          "absolute_path" : sublayer.url , 
                                                                          "type" : "layer"
                                                                      };
                                                                              
                                                                      
                                                                      console.log(' * * * layer item added * * *   >', flatJson_item)
                                                                      folder_structure_flatjson.push(flatJson_item)
                                                                    // ********* end ********* add layer item  *********
                                                                    /**/

                                                                    // not use, layer name as key
                                                                    //flatFeatureLayerSublayerItem[sublayer.title] = sublayer
                                                                    // in use, use jstree layer id as key
                                                                    flatFeatureLayerSublayerItem[real_layer_id_as_jstreeid] = sublayer
                                                                    

                                                           
                                     
                                            }// if
                                                           
                                    }); // forEach

                                  

            } 






              // ************** end ************** all sublayer create featureLayer with default popupTemplate.  ************** 
              /**/  





  // ****** pre select by url param  ****** 

              var selected_item_id;
              var selected_item_text;
              var selected_item_type;
              function  pre_select_item_level(){

                  // Do NOT re-create instance of url params, use first time, filter by=xxx  as records
                  //urlParams = new URLSearchParams(window.location.search);

                  selected_item_id = urlParams.get('select_item_id');
                  selected_item_text = urlParams.get('select_item_text');
                  selected_item_type = urlParams.get('select_item_type');
                  if ((selected_item_id == undefined) || (selected_item_id == null) || (selected_item_id == '')){
                                  // select folder is null, undefined, nothing to select
                  }else {
                                  console.log('selected_item_id',  selected_item_id)
                                  selectFolderLevelItem(selected_item_id)
                  }
              }
  // ******  end   ******  pre select by url param  ****** 
  /**/

  //  ****************  user click/select folder level item *******  layer level item  ********************
  /**/
                          // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
                          function selectFolderLevelItem(folderLevel_id){

                            console.log(' **** select folder level id is  ***** ', folderLevel_id )
                            console.log(' **** select folder level id is  ***** ', $('#jstree_layerlist').jstree(true) )
                            $('#jstree_layerlist').jstree().deselect_all(true);    // true means not trigger change.jstree event
                            $('#jstree_layerlist').jstree(true).select_node(folderLevel_id);   // Not set 'true' means  will intend to trigger change.jstree event
                            //$('#jstree_layerlist').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                        }
  //  ****************  end  ***************   user click/select folder level item *******  layer level item  ********************
  /* */



              //=================== add legend ============================
                                    var legend = new Legend({
                                            view: view,
                                            container: "legend-div"
                                            /*  if not set layerInfos,  by default, all visible layer legend will show here.
                                            layerInfos: [
                                              {
                                                layer: featureLayer
                                                //title: _layer
                                              }
                                            ]
                                            */
                                          });
                                     // Add widget to the bottom right corner of the view
                                    // view.ui.add(legend, "bottom-right");
               //======= end ============ add legend ============================
              /**/ 


           /**/ 
                  //=================== add search widget ============================
                  /**/
                  // api https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#methods-summary

                  /* not work,  should use customized sample https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/is-it-possible-to-edit-or-customize-search-result/td-p/714737
                  const searchAddressResultPopUpTemplate = {
                    // autocasts as new PopupTemplate()
                    title: "",
                    content: "",
                  };*/
                  

                  searchAddressWidget = new Search({
                             allPlaceholder: "Search", // only works if you have multiple source l o c a  t o r, ignore if only 1 source, like here.
                      // work around is wait until all image loaded,  windows.load { document.querySelector('.esri-search .esri-search__input').setAttribute('placeholder', 'Google search this area   ')}
                      
                    // adjust width at css ".esri-search{width: 593px !important;}" ,  "!important" will overwrite the default "width:240px" in original esri-search class 
                    
                    activeMenu : "suggestion", //  Possible Values:"none"|"suggestion"|"source"|"warning",    Default Value:none
                    //activeSource : ,  // Can be either a LayerSearchSource or a LocatorSearchSource.

                    popupEnabled : true, // Default :true
                    //popupTemplate : searchAddressResultPopUpTemplate, // not work, should use customized sample https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/is-it-possible-to-edit-or-customize-search-result/td-p/714737

                    //resultGraphic : searchAddressResultGraphic, // read-only,  can not set customized graphic, 
                    //resultGraphicEnabled : true, // Default :true
                    view: view, 


                    // Default sources[] when sources is not specified, 
                      // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#sources
                      // https://developers.arcgis.com/javascript/latest/sample-code/widgets-search-multiplesource/
                      //includeDefaultSources: false, // default locator source is "point on street", not use. use point on roof-top  
                      includeDefaultSources: true, 
                      /*  not use, because it trigger login arcgis online to access online geocoding item
                      sources:   [
                                  {
                                    url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                                    singleLineFieldName: "SingleLine",
                                    outFields: ["Addr_type"],
                                    name: "customized search address or place (rooftop)",
                                    placeholder: "customized search address or place (rooftop)",

                                    //https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search-LocatorSearchSource.html#locationType
                                    locationType: "rooftop", //"rooftop", // "street",

                                    resultSymbol: {
                                      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                                      url: window.location.protocol + "//" + window.location.host + "/json2tree/favicon.ico",
                                      size: 48,
                                      width: 48,
                                      height: 48,
                                      xoffset: 0,
                                      yoffset: 0
                                    }
                                  }
                      ]
                      */

                  });
                  // in use
                  view.ui.add(searchAddressWidget, "top-leading"); //Add to the map
                  /* not use, search widget outside of map, 
                  var searchWidget = new Search({
                    view: view,
                    container: "esri-search-widget-outside-div"
                  });*/


        
                  /* not use, but keep,  if you want some sourced result changed to 'rooftop' then use this,   
                  reactiveUtils.when(
                    // wait for the widget to be ready to set the locationType
                    () => searchAddressWidget.viewModel.state === "ready",
                    () => {
                      // default world geocoder source at(0) is 'street' address, not 'rooftop' address. 
                      // enforce change from default 'street' to 'rooftop'. 
                      let firstSource = searchAddressWidget.allSources.at(0);  // at(0) means first default source(which arcgis world geocode), at(1) means second source,
                      if (firstSource) {
                        firstSource.locationType = "rooftop";
                      }
                    }
                  );*/





                  //search widget event https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#events-summary
                  searchAddressWidget.on("search-complete", function(event){

                    // The results are stored in the event Object[]
                    console.log("search address results ", event);
                    console.log("search address results, lat, lng ", event.results[0].results[0].extent.center.latitude,  event.results[0].results[0].extent.center.longitude);

                  });
          
                /**/
                //========= end ========== add search widget ============================
                /**/ 


                  /**/
                  //   --- --- --- --- back to previous extent --- --- esri only --- ---
                  /**/
                      // only for map image layer full extent
                      function use_extent(){
                        console.log('go to map image layer full extent')
                        //  map image layer https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-MapImageLayer.html#fullExtent
                        view.goTo(_map_image_layer.fullExtent);
                    }
                  /**/
                  //   --- --- end --- --- back to previous extent --- --- esri only --- ---  
                  /**/



                  

                  /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/

                              function turn_off_popup_now(){
                                console.log(' user clicked turn off popup button, now should hide info_outline window')
                                        turn_on_off_popup_status = false;
                    
                                        $("#info_outline").hide()
                    
                                        $("#turn_on_popup").show()
                                        $("#turn_off_popup").hide()
                    
                              }
                    
                    
                              function turn_on_popup_now(){
                                console.log(' user clicked turn on popup button, now should show info_outline window')
                                        turn_on_off_popup_status = true;
                    
                                        $("#info_outline").show()
                    
                                        $("#turn_off_popup").show()
                                        $("#turn_on_popup").hide()
                    
                              }
                    
                              function close_list_window_now(){
                    
                                console.log(' user clicked close list window button, now should hide list window')
                                        $("#list").hide()
                    
                              }
                  
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/



                 









                  function init_user_interface_event(){




 				          /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                  
                          if (turn_on_off_popup_status){
                            turn_on_popup_now()
                          } else {
                            turn_off_popup_now()
                          }
                          
          
                        $("#turn_off_popup").on('click', turn_off_popup_now);
          
                        $("#turn_on_popup").on('click', turn_on_popup_now)
          
                        $("#close_list_window").on('click', close_list_window_now)
                  
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/


                       





                        $("#expand_button_layerlist").on('click',function(){
                          $('#jstree_layerlist').jstree('open_all');
                        }); 
                        $("#collapse_button_layerlist").on('click',function(){
                          $('#jstree_layerlist').jstree('close_all');
                        }); 


                        /**/
                        //   --- --- --- --- back to previous extent --- --- esri only --- ---
                        /**/

                              $('#full_extent_btn').on('click', function(event) {
                                use_extent()
                              });

                              $('#back_to_previous_extent_btn').on('click', function(event) {
                                  console.log('extent stack before pop', extentStack.count, extentStack)

                                  var skipCurrentExtent = extentStack.pop()
                                  console.log('back to previous extent - 1st pop - : ', skipCurrentExtent)
                                  var back2thisExtent = extentStack.pop()
                                  console.log('back to previous extent - 2st pop - : ', back2thisExtent)


                                  
                                  // esri only 
                                  if (back2thisExtent){

                                    console.log('back to previous extent - lat - long - : ', back2thisExtent.center_zoom, back2thisExtent.center_lat, back2thisExtent.center_long)
                                    
                                    //not use, because it will not trigger view 'stationary' event, will not add new extent, then I can't skip first stack pop above.
                                    //view.center = [back2thisExtent.center_long, back2thisExtent.center_lat]
                                    //view.zoom = back2thisExtent.center_zoom
                                  
                                    // in use, because it trigger view stationary event, will add a new extent. 
                                    view.goTo({
                                      center: [back2thisExtent.center_long, back2thisExtent.center_lat],
                                      zoom: back2thisExtent.center_zoom
                                    });
                                    

                                  } // if
                                  
                              });

                        /**/
                        //   --- --- end --- --- back to previous extent --- --- esri only --- ---  
                        /**/


                        /**/
                        // - - - filter layer list  - - - 
                        /**/
        
                            $("#filter_layer_list_by").on('keyup', filter_layerList_now);
                            $("#search_layer_list_button").on('click', filter_layerList_now);
                            $('#clear_filter_layer_list_button').on('click', show_all_layer_list);  
                               
                        /**/
                        // ... end ...  - - - filter layer list  - - -
                        /**/




                          /**/
                          //  .. - .. - ... zoom to extent or 1st feature   ... - .. - .. 
                          /**/
                              if (param_zoom_to_extent_or_1st_feature){
                                    zoom_to_extent_or_1st_feature = param_zoom_to_extent_or_1st_feature
                              }
                              // first time set radio
                              $("input[type=radio][name=zoom_to_extent_or_1st_feature_radio][value=" + zoom_to_extent_or_1st_feature + "]").prop('checked', true);
                              // radio change event
                              $("input[type='radio'][name='zoom_to_extent_or_1st_feature_radio']").change(function(){
                                zoom_to_extent_or_1st_feature = $("input[type='radio'][name='zoom_to_extent_or_1st_feature_radio']:checked").val();
                                console.log(" zoom_to_extent_or_1st_feature : --  ", zoom_to_extent_or_1st_feature);
                                update_url_parameter('zoom2ext1st', zoom_to_extent_or_1st_feature);
                              });
                          
                          
                          /**/
                          //     ... - .. - ..  end .. - .. - ... zoom to extent or 1st feature    ... - .. - .. 
                          /**/

                  }




          /**/
          // - - - filter layer list  - - - 
          /**/

                  var filterlayerList_by_keyword
                  async function filter_layerList_now(event){

                    remove_all_featurelayer_from_map()
                    filterlayerList_by_keyword = $('#filter_layer_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                    console.log('filterlayerList now keyword ...  ', filterlayerList_by_keyword)
                    if ($('#jstree_layerlist').jstree(true)){
                      $('#jstree_layerlist').jstree(true).search(filterlayerList_by_keyword);
                    }
                  }


                  function show_all_layer_list(){

                    remove_all_featurelayer_from_map()
                    filterlayerList_by_keyword = ''
                    $("#filter_layer_list_by").val(filterlayerList_by_keyword)
                    console.log('show all layer list now, you clicked clear button . . .  ', filterlayerList_by_keyword)
                    if ($('#jstree_layerlist').jstree(true)){
                      $('#jstree_layerlist').jstree(true).clear_search();
                    }
                    
                  }

          /**/
          // ... end ...  - - - filter layer list  - - -
          /**/






        
        
                  
               
/**/
//  --- google as basemap   --- 
/**/

    var google_hybrid
    var microsoft_hybrid
    var here3_hybrid
    var mapbox_hybrid
    var nearmap_tile
    var open_street_map
    
   
    function init_base_map(){

          // Google Hybrid
          google_hybrid = new Basemap({
            baseLayers: [new WebTileLayer({
              // also work   https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}
              urlTemplate : "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}", 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Google Hybrid with Label ",
              id: "layerID_google_hybrid",
              title: "Google",
            })],
            id: "basemapID_google_hybrid",
            title: "Google",
            thumbnailUrl: "../../public/images/google1000.png",
          });




          
          // microsoft hybrid
          var microsoft_tile_url = 'https://atlas.microsoft.com/map/tile?'
          microsoft_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          microsoft_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          microsoft_tile_url +=  '&tilesetId=' + 'microsoft.imagery'  // no label
          microsoft_tile_url +=  '&x={x}' + '&y={y}' + '&zoom={z}'
          microsoft_tile_url +=  '&tileSize=256'

          var microsoft_label_tile_url = 'https://atlas.microsoft.com/map/tile?'
          microsoft_label_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          microsoft_label_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          microsoft_label_tile_url +=  '&tilesetId=' + 'microsoft.base.labels.road'  // no label
          microsoft_label_tile_url +=  '&x={x}' + '&y={y}' + '&zoom={z}'
          microsoft_label_tile_url +=  '&tileSize=256'

          microsoft_hybrid = new Basemap({


             baseLayers: [
              

              // saterlite only, no label
              new WebTileLayer({
                urlTemplate : microsoft_tile_url, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                
                id: "layerID_microsoft_hybrid",
                title: "Microsoft",
              }), 
          
              // label only 
              new WebTileLayer({
                urlTemplate : microsoft_label_tile_url, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                
                id: "layerID_microsoft_label",
                title: "Microsoft label",
              }), 
          
          
          
          ],
            
            id: "basemapID_microsoft_hybrid",
            title: "Microsoft",
            thumbnailUrl: "../../public/images/microsoft300.png",
          });
          //  . .  end . . . . microsoft hybrid



          
          

        // . . . . here hybrid . . . .
        here3_hybrid = new Basemap({
          baseLayers: [new WebTileLayer({
            urlTemplate : here_v3_hybrid_raster, 
            copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Here WeGo Hybrid with Label ",
            id: "layerID_here3_hybrid",
            title: "Here raster v3 hybrid with label Layer",
          })],
          id: "basemapID_here3_hybrid",
          title: "HereMap",
          thumbnailUrl: "../../public/images/here256.png",
        });




          // . . . . . . mapbox . . .. . .
          mapbox_hybrid = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : mapbox_satellite_raster, 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Mapbox Hybrid ",
              id: "layerID_mapbox_hybrid",
              title: "Mapbox",
            })],
  
            id: "basemapID_mapbox_hybrid",
            title: "Mapbox",
            thumbnailUrl: "../../public/images/mapbox001.png",
          });
          // . .  end . . . . mapbox . . .. . .



          // . . . nearmap only . . .
          nearmap_tile = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : nearmap_xyz, 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Nearmap no Label ",
              id: "layerID_nearmap",
              title: "Nearmap no Label Layer",
            })],

            id: "basemapID_nearmap_no_label",
            title: "NearMap",
            thumbnailUrl: "../../public/images/nearmap000.png",
          });
           //  . . . end . . . nearmap only . . .
      
          


        // . . . . open street map  . . . .
          open_street_map = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : "http://tile.openstreetmap.org/{z}/{x}/{y}.png", 
              copyright: "Open Street Map " + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1),
              id: "layerID_open_street_map",
              title: "Open Street Map Layer",
            })],

            id: "basemapID_open_street_map",
            title: "OpenStreetMap",
            thumbnailUrl: "../../public/images/openstreetmap002.png",
          });



        }// function

/**/
//   --- end  ---   --- google as basemap   --- 
/**/                      
                 
                 
             


      async function dom_ready_dojo(){

        init_base_map()

                    
                    init_global_var();

                  /**/
                  //  .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/
                      init_json_viewer();
                  /**/
                  //     ... - .. - ..  end .. - .. - ... map image layer only (convert from feature layer)  ... - .. - .. 
                  /**/

                    
                    init_user_interface_event()
      
                    
                    
                          
                  }






                          



}); // require, everything should be inside
