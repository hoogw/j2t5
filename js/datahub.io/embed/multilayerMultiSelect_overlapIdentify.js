


// multiple select layer, use checkbox plugin in jstree


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
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",

 
            "esri/widgets/Legend",

            
            "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",

            "esri/widgets/Print",

  "esri/core/promiseUtils",
            "esri/core/reactiveUtils",
            
          ], async function (

          Map, 
          MapView,

            Basemap,
            Attribution,
            
            WebTileLayer,
          BasemapToggle,
            Expand, 
            BasemapGallery, 
            
            
          Legend, 

             
            Track,
             Locate,
             Graphic,


            Print,
            
             promiseUtils,
            reactiveUtils,
        ) {

            
         
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
        




          var click_or_hover = 'hover'   // 'click'
          var objectId; // must be global var, otherwise, highlight will not work when multiple layers
          // only for multiple layer multiple select
          var higlighted_layer_for_objectId

            
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
                  // For "featurelayer_xxx.html",  map image layer was used only for create layer list, not actually add to map
                  //map.add(_map_image_layer)

                  


                  

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
                  

            });
       

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


                


                /**/ 
                         //=================== add legend ============================
                         var legend = new Legend( 
                          // new Legend({view}, legend-container-dom-id)
                          {
                                view: view,
                                //container: "legend-div",  // not working
                                id: "legend-id",
                                /*  if not set layerInfos,  by default, all visible layer legend will show here.
                                layerInfos: [
                                  {
                                    layer: featureLayer
                                    //title: _layer
                                  }
                                ]
                                */
                          },
                          
                        );



                        var legend_outside_mapview = new Legend(
                                                                  // new Legend({view}, legend-container-dom-id)
                                                                  {
                                                                        view: view,
                                                                        id: "legend-id-outside_mapview",
                                                                  }, 
                                                                  
                                                                  // Render Legend Widget outside MapView https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/render-legend-widget-outside-mapview/td-p/215473
                                                                  "legend-outside-mapview-div"
                                                                );

                        // comment this line, if you want legend outside of mapView. This line will enforce add legend on mapView
                        //view.ui.add(legend, "top-left");  // for print move from left to right

                    //======= end ============ add legend ============================
                    /**/ 


                     // ===== ========= ======== ====== track current location ===== ========= ======== ====== 
                      // https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
                      
          // not use track, because it keep zoom in to user's location
          //const track = new Track({
          const locate = new Locate({
               icon: "pin-tear-f",   //  "compass-north-circle", (default)
              
              // Zoom level to scale converter https://developers.arcgis.com/documentation/mapping-and-location-services/reference/zoom-levels-and-scale/
              scale: 564,  // zoom level 20 = 564,  By default, the view will navigate to a scale of 2500 for 3D and 4514 for 2D
               


              // Overwrite the default symbol used for the graphic placed at the location of the user
              graphic: new Graphic ({
                symbol: {
                  // autocasts as new SimpleMarkerSymbol()
                  type: "simple-marker",
                  size:  locator_size,  // all works "31pt", "31px",
                  style: locator_style,  // diamond, triangle, cross, x, circle, path, square
                  color: locator_color,   //"blue",
                  // autocasts as new SimpleLineSymbol()
                  outline: {
                    // simple marker builder, https://sagewall.github.io/symbol-builder/simple-marker-symbol/
                    color: locator_outlineColor,  //"#efefef",
                    width: locator_outlineWidth,
                  }
                }
              }),


                        view: view
                      });
                      view.ui.add(locate,  "bottom-right");
                    // ===== =========   end  ======== ====== track current location ===== ========= ======== ====== 


                        
                   //=================== toggle basemap ============================

                        
                        // ESRI Well Known Basemap Ids https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                        // https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/what-are-esri-well-known-basemap-ids/td-p/759266
                        const base_map_source_array = [
                          google_hybrid, 
                          microsoft_hybrid,
                          here3_hybrid,
                          mapbox_hybrid,
                          Basemap.fromId("hybrid"),  // esri base map id 
                          //nearmap_tile,
                          open_street_map,
                        ];

                        console.log('base_map_source_array', base_map_source_array)

                        const basemapGallery = new BasemapGallery({
                            source: base_map_source_array,
                            view: view,
                            container: document.createElement("div")
                          });

                          // Create an Expand instance and set the content
                          // property to the DOM node of the basemap gallery widget

                          const bgExpand = new Expand({
                            collapseIcon: "arrow-bold-right",
                            expandIcon: "arrow-bold-left",
                            collapseTooltip: "Close Options",
                            expandTooltip: "Open Back Ground Map Options",
                            

                            view: view,
                            content: basemapGallery
                          });

                          // Add the expand instance to the ui
                          view.ui.add(bgExpand, "bottom-right");

                    //========  end =========== toggle basemap ============================





                            /**/
                            // - - - ftOpacity  - - - 
                            /**/
                            // first time, run 1 time, set opacity
                            if (param_overlayOpacity){
                              ftOpacity = param_overlayOpacity / 10
                            }


                            var opacity_slider = document.querySelector("#overlay_opacity_range");
                            opacity_slider.value = ftOpacity * 10

                            var opacity_value_text = document.querySelector("#opacity_value_text");
                            opacity_value_text.textContent = opacity_slider.value;
                          


                            // event handle
                            opacity_slider.addEventListener("change", (event) => {

                                            var _overlay_opacity = $('#overlay_opacity_range').val();
                                            $('#opacity_value_text').text(_overlay_opacity);
                                            update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  ftOpacity = _overlay_opacity / 10;

                                                  console.log('ftOpacity', ftOpacity)
                                                  console.log('multi_selected_featureLayerObject_on_map', multi_selected_featureLayerObject_on_map)
                    
                                                  // update current layer
                                                  //single_selected_featureLayerObject_on_map.opacity = ftOpacity
                                                  // update all selected feature layer  opacity
                                                  for (const [key, value] of Object.entries(multi_selected_featureLayerObject_on_map)) {
                                                    console.log('update all selected feature layer  opacity : ', `${key}: ${value}`);
                                                    value.opacity = ftOpacity;
                                                  }




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
                        // multiple select layer, use checkbox plugin in jstree
                        /**/
                         
                          // works both multi select and single select   
                          function remove_all_featurelayer_from_map(){

                            // remove all possible feature layer object from map, works both multi select and single select 
                            for (const [key, value] of Object.entries(multi_selected_featureLayerObject_on_map)) {
                              console.log('remove all feature layer on map : ', `${key}: ${value}`);
                              value.visible = false;
                              map.remove(value)

                              delete multi_selected_featureLayerObject_on_map[key];
                            }//for
                            //multi_selected_featureLayerObject_on_map = {}

                            console.log('after remove all feature layer', multi_selected_featureLayerObject_on_map )
                          }
                      /**/
                      //. . end .  .  . multiple select layer, use checkbox plugin in jstree
                      /**/


                          
                          /* jstree do not use layer list, use jstree instead
                          var layerList = new LayerList({
                                                          view: view,
                                                          container: "layerlist-div"
                                                        });*/                     
                          function jstree_layerlist(root_allfolders_flatjson){


                                            
                            $('#jstree_layerlist')
                            // listen for event https://www.jstree.com/api/#/?q=.jstree%20Event
                        
                                    .on('changed.jstree', function (e, data) {
                                    //.on('select_node.jstree', function (e, data) {

                                        console.log(' click select folder node, event ', data)



                                        /**/
                                        // multiple select layer, use checkbox plugin in jstree
                                        /**/

                                        remove_all_featurelayer_from_map()

                                        var i, j, currentNode_selected_text, currentNode_selected_id, currentNode_selected_type;
                                        var selectedItemIdArray = []
                                        
                                        
                                        overlapIdentify_counter = -1
                                        
                                        for(i = 0, j = data.selected.length; i < j; i++) {
                                       
                                          currentNode_selected_text = data.instance.get_node(data.selected[i]).text;
                                          currentNode_selected_id = data.instance.get_node(data.selected[i]).id;
                                          selectedItemIdArray.push(currentNode_selected_id)
                                          // must use .original.type, because re-structured json does not carry our customized field 'type'
                                          currentNode_selected_type = data.instance.get_node(data.selected[i]).original.type;
                                               
                                          // multiple selected node, only add 'feature layer' node, not 'sub-folder' node to map
                                          console.log('currentNode Selected id + text  + type: ' + currentNode_selected_id + "   ->   " + currentNode_selected_text  + "   ->   " +  currentNode_selected_type)

                                          var layerid_as_key= currentNode_selected_id
                                          // can't be key, since 2 layer possible have same name, in different folder. use layer id as key instead 
                                          var layername___ = currentNode_selected_text
                                          var layertype_= currentNode_selected_type


                                          console.log('tree event, layer id, multi_selected_featureLayerObject_on_map', layerid_as_key,  multi_selected_featureLayerObject_on_map)

                                          


                                                  switch(layertype_) {

                                                            case "folder":

                                                              console.log(' nothing to do when select "folder" ', layerid_as_key, layername___)
                                                              
                                                            break;

                                                            case "layer":

                                                              console.log(' render "layer" ', layerid_as_key, layername___)
                                                              

                                                            

                                                                  var sublayer = flatFeatureLayerSublayerItem[layerid_as_key];

                                                                  //console.log(' selected sublayer geometry type ', sublayer.geometryType, sublayer)
                                                                  




                                                                  sublayer.createFeatureLayer()
                                                                          .then((featureLayer) => featureLayer.load())
                                                                          .then((featureLayer) => {
                                                                                                                  // feature layer auto popupTemplate, auto highlight, etc.
                                                                                                                  //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-popuptemplate
                                                                                                                  //featureLayer.popupTemplate = featureLayer.createPopupTemplate();
                                                                                                                    featureLayer.outFields = ["*"];
                                                                                                                    featureLayer.opacity =  ftOpacity;
                                                                                                                    featureLayer.popupEnabled = false; // idiot map


                                                                                                                  // for tree only, add to map, but enforce visible false, let user click tree node to turn visible true(on)
                                                                                                                  featureLayer.visible = true;
                                                                                                                  map.add(featureLayer);
                                                                                                                  
                                                                                                                  single_selected_featureLayerObject_on_map = featureLayer
                                                                                                                  single_selected_featureLayerRealLayerID = featureLayer.layerId



                                                                                                                  




                                                                                                                  if (single_selected_featureLayerObject_on_map){

                                                                                                                    // sublayer already define featureLayer, do not double define here

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

                                                                                                                  }

                                                                                                                  console.log(' loading completed,  just add this feature layer obj to map ', featureLayer.layerId, featureLayer )
                                                                                                                  // not use, layer name as key, since duplicate name is possible
                                                                                                                  //multi_selected_featureLayerObject_on_map[featureLayer.title] = featureLayer
                                                                                                                  // in use, jstree-layer-id as key
                                                                                                                  multi_selected_featureLayerObject_on_map[featureLayer.layerId] = featureLayer


                                                                                                                  
                                                                                                                  // only for overlap identify, auto select fill texture
                                                                                                                  var sublayerGeometryType = featureLayer.geometryType
                                                                                                                  if (sublayerGeometryType == 'polygon'){
                                                                                                                    overlapIdentify_counter += 1
                                                                                                                  }
                                                                                                                  console.log(' selected feature Layer geometry type:   overlapIdentify_counter, featureLayer.layerId, sublayerGeometryType ', overlapIdentify_counter, featureLayer.layerId, sublayerGeometryType)
                                                                                                                 

                                                                                                                  // only for overlap identify, auto select fill texture
                                                                                                                  enforce_yellow_linepointpolygon(single_selected_featureLayerObject_on_map, overlapIdentify_counter)


                                                                                                                

                                                                                                                          
                                
                                
                                                                                                                      // without highlight option, by default, will use esri highlight style, otherwise uncomment this section to use my highlight option
                                                                                                                        view.whenLayerView(single_selected_featureLayerObject_on_map).then(function(layerView){

                                                                                                                          // configuring the layer view 's highlight color (when mouse point feaeture) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                                                                                                                          layerView.highlightOptions = {
                                                                                                    
                                                                                                                            // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#HighlightOptions
                                                                                                                            color: featureLayerView_higlightOption_fillColor,  // [255, 255, 255, 0.92],
                                                                                                                            haloColor: featureLayerView_higlightOption_haloColor,  // [223, 255, 0, 0.95],
                                                                                                                            haloOpacity: featureLayerView_higlightOption_haloOpacity,  // 0.9,  // default is 1
                                                                                                                            fillOpacity: featureLayerView_higlightOption_fillOpacity, // 0.6
                                                                                                                          };



        // -- - - - only for hover multiple layer-- - - -   mouse-move -- - - - event -- - - - only for hover multiple layer -- - - -
       
                        const debouncedUpdate = promiseUtils.debounce(async (event) => {
    
                          //console.log('  - - -   pointer-move fire too many times - - -  ', click_or_hover )
                          if (click_or_hover == 'hover'){
      
                             // should be all layers, don't use event , { layer name }
                             const hitTest = await view.hitTest(event);

                                          let hitResult = []
                                          let hitResult_layerId_as_key = []
                                          // only for multi select
                                          for (let r = 0; r < hitTest.results.length; r++) {
                                            for (const [key, value] of Object.entries(multi_selected_featureLayerObject_on_map)) {
                                              //console.log('hitResult filter return result for only selected layer,  ', `${key}: ${value}`);
                                              if (hitTest.results[r].graphic.layer === value ){
                                                hitResult.push(hitTest.results[r])
                                                hitResult_layerId_as_key.push(key)
                                              }//if
                                            }//for
                                          }//for

                                          console.log('hover hitResult filter return result for only selected layer, 111111 for layer graphic ', hitResult_layerId_as_key);
                                          console.log('hover hitResult filter return result for only selected layer, 222222 for layer id only', hitResult);
      
                                        let graphic      
                                       


                                        // only for multi select
                                        if (hitResult[0]){

                                        

                                              // hover only show toppest feature, ignore the rest 
                                              var _hover_layer = multi_selected_featureLayerObject_on_map[hitResult_layerId_as_key[0]]
                                              console.log('hover layer, layer[0] definition : ',    _hover_layer);

                                              var _hover_layer_objectID_fieldName = _hover_layer.objectIdField
                                              console.log('hover layer this layer[0] object id field name : ', _hover_layer_objectID_fieldName);

                                              var newObjectId = hitResult[0].graphic.attributes[_hover_layer_objectID_fieldName];
                                              // only for multiple layer multiple select
                                              var new_higlighted_layer_for_newObjectId = hitResult[0].graphic.layer

                                              console.log('hover new Object Id vs old object Id : ', newObjectId, objectId);
                                              // fix bug, object id could be 0,  if (0) is false, actually, 0 is real id, should be true here.
                                              //if (!newObjectId) {
                                              if (newObjectId == undefined) {
                                                                        if (mouse_pointed_feature_highlight_handle){
                                                                          mouse_pointed_feature_highlight_handle.remove()
                                                                        }
                                                                        objectId = undefined
                                                                        // hide info outline 
                                                                        empty_info_outline_Tab()
                                                                    
                                              // only for multiple layer multiple select
                                              } else if ((objectId !== newObjectId) || (higlighted_layer_for_objectId !== new_higlighted_layer_for_newObjectId)){
                                      
                                                                        if (mouse_pointed_feature_highlight_handle){
                                                                          mouse_pointed_feature_highlight_handle.remove()
                                                                        }
                                                                        objectId = newObjectId;
                                                                        graphic = hitResult[0].graphic;

                                                                        // only for multiple layer multiple select
                                                                        higlighted_layer_for_objectId = graphic.layer
            
                                                                        // only for multi select, because of each highlight graphic could be any of multiple layer, must get layerView from graphic.layer 
                                                                        view.whenLayerView(graphic.layer)
                                                                          .then(function(layerView){
                                                                                  mouse_pointed_feature_highlight_handle = layerView.highlight(graphic);
                                                                        });
            
                                                                        console.log('highlight new Object Id : ', newObjectId)
                                                                        //console.log(' ! * ! hit test ! * ! result ! * ! graphic ! * ! ', graphic )
                                                                        show_info_outline_Tab_withLayerNameForMultilayer(graphic)
                                              }//if newObjectId
                                          
      
                                  } else {

                                              if (mouse_pointed_feature_highlight_handle){
                                                mouse_pointed_feature_highlight_handle.remove()
                                              }
                                              objectId = undefined
                                              // hide info outline 
                                              empty_info_outline_Tab()
                                        
                                  }// if hit result 0


                          }// if hover
      
                        });// debounce
      
      
                        //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                        view.on("pointer-move", function(event){
  
                                    //console.log('event', event)
                                    //console.log('pointer-move event')
  
                                    debouncedUpdate(event).catch((err) => {
                                                    if (!promiseUtils.isAbortError(err)) {
                                                      throw err;
                                                    }
                                    });
                        }); // view . on . hover
      
      
                // -- - - -  -- - - -  end  -- - - - only for hover multiple layer-- - - -   mouse-move -- - - -  -- - - -  
      
                 
  
  
  
                                                                        
              });// view . when

                                                                                                                      


                                                                                                                



                                                                          })

                                                                  // must here, each time, after create new feature layer                                            
                                                                  init_feature_layer_view()
   
                                                              
                                                            break;

                                                            default:
                                                  }// switch


                                          

                                        }//for


                                        // only zoom to last selected layer, ignore the previous layers, because if zoom to previous layer, will cause uncaught error 'Goto was interrupted', 
                                        if (single_selected_featureLayerObject_on_map){
                                          var featureLayer = single_selected_featureLayerObject_on_map

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

                                          
                                        }


                                        update_url_parameter('selectedItemIdArray', selectedItemIdArray.toString());
                                        

                                        /**/
                                        //. . end .  .  . multiple select layer, use checkbox plugin in jstree
                                        /**/


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
                                      // - - - filter layer list (checkbox only)  - - - 
                                      /**/

                                                  // multiple select layer, use checkbox plugin in jstree
                                                  // doc https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches_children
                                                  "plugins" : [ "checkbox",  "search" ], // not use "wholerow", it will make line icon disappear 
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
                      
                                      /**/
                                      // ... end ...  - - - filter layer list (checkbox only)  - - -
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



                            update_layer_name(_rootMapServerJSON.url, _rootMapServerJSON.title) 

                        }



                       // layer under root(mapServer) 
                       function createFeatureLayer_tree(_layerAndSubFolderCollection, parent_item_id){

                        console.log(" = = = = = = > layer And Sub Folder Collection = = = = = = > ",_layerAndSubFolderCollection )

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
                                                                          "text" : real_layer_id_as_jstreeid + layerID_NAME_separator + item.title,
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
                                                                                    "text" : real_layer_id_as_jstreeid + layerID_NAME_separator + sublayer.title + '<sup style="font-size:8px">' + _current_layer_geometryType + '</sup>',
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



                      // not use, for non-recursive use, sub-layer under sub-folder 
                      function createSubLayer_tree(_sublayerCollection, parent_item_id){

                            _sublayerCollection.forEach(function(item){

                              var sublayer = item;
                              console.log(' add this sub-layer item to sub-folder,   ',  sublayer)

                              // ********* add layer item  *********

                              real_layer_id_as_jstreeid = item.id;
                              flatJson_item =  { 
                                    "id" : real_layer_id_as_jstreeid,
                                    "parent" : parent_item_id,
                                    "text" : real_layer_id_as_jstreeid + layerID_NAME_separator +  sublayer.title,
                                    "icon" : layer_icon,
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

                               // not use, layer name as key
                               //flatFeatureLayerSublayerItem[sublayer.title] = sublayer
                               // in use, use jstree layer id as key
                               flatFeatureLayerSublayerItem[real_layer_id_as_jstreeid] = sublayer
                              


 
                                            
                            }); // forEach

                      }



                        // ************** end ************** all sublayer create featureLayer with default popupTemplate.  ************** 
                        /**/  





            // ****** pre select by url param  ****** 

                        var selectedItemIdArray;
                        var param_string_selectedItemIdArray
                        function  pre_select_item_level(){

                            // Do NOT re-create instance of url params, use first time, filter by=xxx  as records
                            //urlParams = new URLSearchParams(window.location.search);

                            param_string_selectedItemIdArray = urlParams.get('selectedItemIdArray');
                           
                            if ((param_string_selectedItemIdArray == undefined) || (param_string_selectedItemIdArray == null) || (param_string_selectedItemIdArray == '')){
                                  // select folder is null, undefined, nothing to select
                                  
                                  // in use, nothing to do here, means nothing selecte, or I can enforece nothing select by this line below
                                  $('#jstree_layerlist').jstree().deselect_all(true);    // true means not trigger change.jstree event

                                  /* not use, keep as knowlege
                                    //  root node, id is -1, if I want to  select root node by default
                                      $('#jstree_layerlist').jstree().deselect_all(true);    // true means not trigger change.jstree event
                                      $('#jstree_layerlist').jstree(true).select_node(-1);   // Not set 'true' means  will intend to trigger change.jstree event
                                  */

                            }else {
                                            selectedItemIdArray = param_string_selectedItemIdArray.split(",")
                                            console.log('selectedItemIdArray',  selectedItemIdArray)
                                            selectFolderLevelItem(selectedItemIdArray)
                            }
                        }
            // ******  end   ******  pre select by url param  ****** 
            /**/

            //  ****************  user click/select folder level item *******  layer level item  ********************
            /**/
                                    // folder level item could be folder or mapserver or GPserver or geocodeServer ( render folder section)
                                    function selectFolderLevelItem(_selectedNodeArray){

                                      //console.log(' **** select folder level id is  ***** ', $('#jstree_layerlist').jstree(true) )
                                      $('#jstree_layerlist').jstree().deselect_all(true);    // true means not trigger change.jstree event


                                      // for select multiple node at 1 time, you can feed array
                                      // not use, because it trigger 2 times, for example, 24,25 will trigger 2 times event,  1st time selected is 24, 2nd time selected is 24,25,   24 is duplicated.
                                      // $('#jstree_layerlist').jstree(true).select_node(_selectedNodeArray);
                                      // https://www.jstree.com/api/#/?q=select_node&f=select_node(obj%20[,%20supress_event,%20prevent_open])
                                      //$('#jstree_layerlist').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.

                                      for (let i = 0; i < _selectedNodeArray.length; i++) {
                                        console.log(' **** pre-select node id is  ***** ', _selectedNodeArray[i])
                                        //$('#jstree_layerlist').jstree(true).select_node(_parent_id, true, true);  // true means not trigger change.jstree event.
                                        
                                        // only last node, trigger event,
                                        if (i + 1 == _selectedNodeArray.length){
                                          //last array element, trigger event
                                          console.log(' . . .  pre-select node last element,need trigger event   . . .  ', _selectedNodeArray[i])
                                                  $('#jstree_layerlist').jstree(true).select_node(_selectedNodeArray[i], false, false);   
                                        } else {
                                          // not last array element, do not trigger event
                                          console.log(' ------ pre-select node not last element,do not trigger event  ------', _selectedNodeArray[i])
                                                  $('#jstree_layerlist').jstree(true).select_node(_selectedNodeArray[i], true, true);  
                                        }
                                        
                                      }//for

                                      
                                  }
            //  ****************  end  ***************   user click/select folder level item *******  layer level item  ********************
            /* */



                  
        
       
                       

                  function init_user_interface_event(){







                    /**/
                    //  --- click or hover   --- 
                    /**/

                            if (param_click_or_hover){
                              click_or_hover = param_click_or_hover
                            }
                            // first time set radio
                            $("input[type=radio][name=click_or_hover_radio][value=" + click_or_hover + "]").prop('checked', true);
                            // radio change event
                            $("input[type='radio'][name='click_or_hover_radio']").change(function(){
                              click_or_hover = $("input[type='radio'][name='click_or_hover_radio']:checked").val();
                              console.log(" click_or_hover : --  ", click_or_hover);
                              update_url_parameter('clickorhover', click_or_hover);
                            });

                    /**/
                    //  --- end  ---  click or hover   --- 
                    /**/







                        $("#expand_button_layerlist").on('click',function(){
                          $('#jstree_layerlist').jstree('open_all');
                        }); 
                        $("#collapse_button_layerlist").on('click',function(){
                          $('#jstree_layerlist').jstree('close_all');
                        }); 


                        


                        /**/
                        // - - - filter layer list (checkbox only)  - - - 
                        /**/
        
                            $("#filter_layer_list_by").on('keyup', filter_layerList_now);
                            $("#search_layer_list_button").on('click', filter_layerList_now);
                            $('#clear_filter_layer_list_button').on('click', show_all_layer_list);  
                              
                        /**/
                        // ... end ...  - - - filter layer list (checkbox only)  - - -
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
          // - - - filter layer list (checkbox only)  - - - 
          /**/

                  var filterlayerList_by_keyword
                  async function filter_layerList_now(event){

                    // uncheck all checkbox
                    $('#jstree_layerlist').jstree(true).uncheck_all()
                    remove_all_featurelayer_from_map()

                    filterlayerList_by_keyword = $('#filter_layer_list_by').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                    console.log('filterlayerList now keyword ...  ', filterlayerList_by_keyword)
                    if ($('#jstree_layerlist').jstree(true)){
                      $('#jstree_layerlist').jstree(true).search(filterlayerList_by_keyword);
                    }
                  }


                  function show_all_layer_list(){

                    // uncheck all checkbox
                    $('#jstree_layerlist').jstree(true).uncheck_all()
                    remove_all_featurelayer_from_map()

                    filterlayerList_by_keyword = ''
                    $("#filter_layer_list_by").val(filterlayerList_by_keyword)
                    console.log('show all layer list now, you clicked clear button . . .  ', filterlayerList_by_keyword)
                    if ($('#jstree_layerlist').jstree(true)){
                      $('#jstree_layerlist').jstree(true).clear_search();
                    }
                  }

          /**/
          // ... end ...  - - - filter layer list (checkbox only)  - - -
          /**/

                  


          // only for multi select      
          var graphic_object_indexAsKey = {} 
          function init_feature_layer_view(){

            // only for multi select
            // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
            view.on("click", function(event){

              console.log(' view * click * fire 1 time is fine , hit test ', click_or_hover )
              if (click_or_hover == 'click'){

                        view.hitTest(event).then(function(response){

                          


                             if (response.results.length) {

                                          // not use, this only for single select  
                                          //let hitResult = response.results.filter(function (result) {
                                                                     // return result.graphic.layer === single_selected_featureLayerObject_on_map;
                                                                    //})
                                           
                                          console.log(' ! * ! hit test ! * ! click ! * ! response.results ', response.results )

                                          let hitResult = []
                                          // only for multi select
                                          for (let r = 0; r < response.results.length; r++) {
                                            for (const [key, value] of Object.entries(multi_selected_featureLayerObject_on_map)) {
                                              //console.log('hitResult filter return result for only selected layer,  ', `${key}: ${value}`);
                                              if (response.results[r].graphic.layer === value ){
                                                hitResult.push(response.results[r])
                                              }//if
                                            }//for
                                          }//for


                                          console.log(' ! * ! hit test ! * ! click ! * ! hitResult hitResult hitResult ', hitResult )

                                          graphic_object_indexAsKey = {}  
                                          let graphic                                                        
                                          if (hitResult[0]){

                                                  var multiple_layer_properties_html = ''
                                                  var __layer_name
                                                  var ___properties

                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                      graphic = hitResult[_index].graphic;
                                                      graphic_object_indexAsKey[_index] = graphic
                                                      console.log(' ! * ! hit test ! * ! result ! * ! add graphic by index ! * ! ', _index, graphic )

                                                     

                                                      
                                                      
                                                      __layer_name = ''
                                                      __layer_name += 'UniqueID(' + graphic.uid + ')' + layerID_NAME_separator + 'OBJECTID ( ' + graphic.attributes.OBJECTID + ' )'
                                                      __layer_name += layerID_NAME_separator + graphic.layer.title + '(layerID:' + graphic.layer.layerId + ')'
                                                      
                                                      ___properties = graphic.attributes

                                                      multiple_layer_properties_html += '</br>'

                                                // build html only
                                                      if (_index == 0){
                                                                        multiple_layer_properties_html += '<fieldset>' 
                                                                        multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' + __layer_name +'</legend>'
                                                                        multiple_layer_properties_html +=     '<div class="flex-row selected_highlighted_style attribute_field_set_style"   id="attribute_field_set_0"   >'  // if 0, means need start a new info window
                                                                        multiple_layer_properties_html +=           json_flex_tip_viewer(___properties)
                                                                        multiple_layer_properties_html +=     '<div>'
                                                                        multiple_layer_properties_html += '</fieldset>'
                                                      } else {

                                                                multiple_layer_properties_html += '<fieldset>'
                                                                multiple_layer_properties_html +=     '<legend>' + (_index +1) +  ' : ' + __layer_name +'</legend>'
                                                                multiple_layer_properties_html +=     '<div class="flex-row attribute_field_set_style"   id="attribute_field_set_' + _index +  '"   >' // not 0, means need append to existing info window
                                                                multiple_layer_properties_html +=         json_flex_tip_viewer(___properties)
                                                                multiple_layer_properties_html +=     '<div>'
                                                                multiple_layer_properties_html += '</fieldset>'

                                                      }//if
                                                      //  . .  end    . .  build html only

 

                                                  }//for

                                                  $('#info-window-div').html(multiple_layer_properties_html)


                                                  // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                    console.log('add event to element id :  attribute_field_set_', _index)
                                                    $("#attribute_field_set_" + _index ).on('click', function(){
                                                                var element_id = $(this).attr('id');
                                                                var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                                                console.log("you click  index  :   ",  _select_highlight_index)
                          
                                                                $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                                                $(this).addClass('selected_highlighted_style')



                                                                view.whenLayerView(graphic_object_indexAsKey[_select_highlight_index].layer)
                                                                .then(function(layerView){
                                                      
                                                                                          if (mouse_pointed_feature_highlight_handle){
                                                                                            mouse_pointed_feature_highlight_handle.remove()
                                                                                          }
                                                                                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic_object_indexAsKey[_select_highlight_index]);
                                                                });// view . when
                          
                                                     });

                                                  }//for




                                         } 

                    // by default, always highlight (first index 0) graphic,   only, not others
                    if (graphic_object_indexAsKey[0] && graphic_object_indexAsKey[0].layer){
                          if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
                          }
                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic_object_indexAsKey[0]);
                    }// if




                } else {

                     // hit test do not find anything.
                     /**/

                     // remove highlight graphic on layer view
                     if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
                     }

                     // hide info outline 
                     empty_info_outline_Tab()


                  
                }// if response results length
                         




                        }); // view . hit test


              }// if click
            }); // view . on . click

          }// function




                  
            
               
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

              init_user_interface_event()

              
              
                          
            }








              /**/
              // -- -- -- vertial adjustment  -- -- -- 


             



              
              



              function show_info_outline_Tab_withLayerNameForMultilayer(___graphic){

                var multiple_layer_properties_html = ''
                var __layer_name = 'layerId(' + ___graphic.layer.layerId + ')' + layerID_NAME_separator + ___graphic.layer.title
                var ___properties = ___graphic.attributes
                console.log('show info window  properties : ', ___properties )

                multiple_layer_properties_html += '<fieldset>' 
                multiple_layer_properties_html +=     '<legend>' + __layer_name + '</legend>'
                multiple_layer_properties_html +=     '<div class="flex-row attribute_field_set_style">'  // make sure field set is horizontal lay out, default is vertical lay out all field
                multiple_layer_properties_html +=           json_flex_tip_viewer(___properties)
                multiple_layer_properties_html +=     '<div>'
                multiple_layer_properties_html += '</fieldset>'

                $('#info-window-div').html(multiple_layer_properties_html)

              }
              

              
              function empty_info_outline_Tab(){
                
                $('#info-window-div').html("")
              }





              // arcgis common adjustment
              function update_layer_name(___layer_url, ___layer_name){

                // without link
                //$('#layer-info-vertical').html('<strong style="font-size:12px;">' + ___layer_name + '</strong>')
                // with link
                $('#layer-info-vertical').html('<a  target="_blank" href="' + ___layer_url +'">' + ___layer_name + '</a>')


              }


              function update_statistic_info_vertical(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ total = '...' } // not available...
                
                $('#feature-on-map').html(rendered)
                $('#total-feature').html(total)
              }


              function update_statistic_info_vertical_calculation(rendered, total){

                console.log(' update statistic info only for calculation  - - - : - - - ', rendered, total  )

                var funding_on_map  = '...' 
                if (isNaN(rendered)){ 
                  $('#funding-on-map').html(funding_on_map)
                } else {

                  var funding_on_map = Math.floor(Math.random() * rendered)
                  var funding_on_map_formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(funding_on_map,)
                  $('#funding-on-map').html(funding_on_map_formatted + 'M')

                }
                
              }




              // only for overlap identify, auto select fill texture,             
              function enforce_yellow_linepointpolygon(_this_feature_layer, _fillTexture_index){

                  /**/
                  // -- -- -- label and color  -- -- -- only for overlap identify, auto select fill texture
                  /**/

                      // original outline width is 5, if need thinner, uncomment this line
                      //_default_strokeWeight = 3


                     var real_color_index = Math.floor(_fillTexture_index / overlapIdentify_remainder_operand )
                      //_default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                     _default_fillColor = overlapIdentify_color_array[real_color_index]


                     var real_fillTexture_index = _fillTexture_index % overlapIdentify_remainder_operand

                  //. . . end  . . . -- -- -- label and color  -- -- -- only for overlap identify, auto select fill texture
                  /**/

                                            // for geojsonlayer, featurelayer, 
                                            //================================== renderer =================================================
                                            // polygon

                                            var polygon_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                type: "simple-fill",  // autocasts as new SimpleFillSymbol()

                                                //  . . .simple fill symbol style . . .
                                                // -- -- -- label and color  -- -- -- only for overlap identify, auto select fill texture
                                                style: overlapIdentify_pattern_simpleFillSymbol_esriSFS_js_api_array[real_fillTexture_index],
                                                //. . . end  . . . -- -- -- label and color  -- -- -- only for overlap identify, auto select fill texture
                                                // . . . end . . . simple fill symbol style

                                                color:   _default_fillColor,  
                                                outline: {  // autocasts as new SimpleLineSymbol()
                                                  width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                                                  color: _default_strokeColor,

                                                  //  . . .simple fill symbol style . . .
                                                  type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                                  style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                                  // . . . end . . . simple fill symbol style
                                                }
                                              }
                                            };




                                            // line
                                            var polyline_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                        //  . . .simple fill symbol style . . .
                                                        type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                                        style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                                        // . . . end . . . simple fill symbol style


                                                        color: _default_strokeColor,
                                                        width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  

                                              

                                              }
                                            };



                                            // point
                                            var point_renderer = {
                                              type: "simple",  // autocasts as new SimpleRenderer()
                                              symbol: {
                                                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()

                                                //  . . .simple fill symbol style . . .
                                                style: simpleMarkerSymbol_esriSMS_array[current_simpleMarker],
                                                // . . . end . . . simple fill symbol style


                                                color: _default_fillColor,
                                                size: _default_pointRadius, // 10,
                                              outline: {  // autocasts as new SimpleLineSymbol()
                                                    width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                                                    color: _default_strokeColor,

                                                    //  . . .simple fill symbol style . . .
                                                    type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                                    style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                                    // . . . end . . . simple fill symbol style
                                                }

                                              }
                                            };






                            console.log( ' _this_feature_layer.geometryType ......>'  , _this_feature_layer.geometryType)
                            var _geometry_type_ = _this_feature_layer.geometryType.toLowerCase()
                            if (_geometry_type_ == 'polygon') {
                                          console.log( ' _this_feature_layer.renderer ......>'  , polygon_renderer)
                                          _this_feature_layer.renderer = polygon_renderer;
                            } 

                            if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                                        _this_feature_layer.renderer = point_renderer;
                            }   


                            if (_geometry_type_ == 'polyline') {
                                          _this_feature_layer.renderer = polyline_renderer;
                            }   




              } 
              //    . . . end  . . . enforce use yellow square for point, yellow line, yellow polygon 
               /**/  



              // -- -- -- vertial adjustment  -- -- -- 
              /**/




}); // require, everything should be inside
