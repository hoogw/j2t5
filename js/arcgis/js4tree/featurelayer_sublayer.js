



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
  
  
  "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",


  
  "esri/widgets/Legend",
  "esri/widgets/Search",
  
  "esri/widgets/Print",

  "esri/core/promiseUtils",
  "esri/core/reactiveUtils",

  
  
  ], async function (
            Map, MapView,

            Basemap,
            Attribution,
            
            WebTileLayer, BasemapToggle,
             Track,
             Locate,
             Graphic, 
            Legend,Search,
  
            Print,
            
             promiseUtils,
            reactiveUtils,


) {

  

// 'real-layer-id'(whatever item.id or sublayer.layerid), is used for key, do not use layer name as key, since layer name could be duplicate in different sub-folder
/**/   
//  must use this for preselect (create featurelayer, add to map). Because preselect can't wait until all feature layer object created, if pre-selected feature layer object is not loaded yet, use this sublayer.item to create one 
var flatFeatureLayerSublayerItem = {}  //  {real-layer-id: MapImageLayer.sublayer.item}   1). MapImageLayer.sublayer.item.createFeaturelayer()    2).  map.add(new-created-featurelayer-object)
// {real-layer-id: MapImageLayer.sublayer.item.createFeatureLayer()}


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
        
        // For "featurelayer_xxx.html",  map image layer was used only for create layer list, not actually add to map
        //map.add(_map_image_layer)

                  //**/
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
                                  
                                  


                                  //track current location https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
                            
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
                          // --- hide legend  --- 
                          var hideLegend_element = document.createElement("button");
                          hideLegend_element.id = "hideLegend_button"
                          hideLegend_element.type = "button"
                          hideLegend_element.style.fontSize = '18px'
                          //hideLegend_element.style.fontWeight = 900
                          
                          hideLegend_element.style.color = 'black'
                          hideLegend_element.style.backgroundColor = 'white'
                          //hideLegend_element.style.textShadow = '10px 10px 10px #FFFFFF'
                          var hideLegend_text = document.createTextNode('Show Legend');
                          hideLegend_element.appendChild(hideLegend_text);
                          view.ui.add(hideLegend_element, "bottom-left");
                          // event handle
                          hideLegend_element.addEventListener("click", (event) => {


                            console.log('toggle or hide legend button clicked, before toggle, old legend position',  legend_position)

                            switch (legend_position) {
                              case 'outside_mapview':
                                                      // next position is on map view
                                                      /**/

                                                      // hide outside mapview legend
                                                      $('#legend-outside-mapview-div').hide()         

                                                      // show legend on mapview
                                                      if (view.ui.find("legend-id")){
                                                        console.log('legend already on map view, nothing to do')
                                                      } else {
                                                        view.ui.add(legend, "top-left");  // for print move from left to right
                                                      }
                                                      legend_position = 'on_mapview'
                                                      break;
                              case 'on_mapview':
                                                      // next position is off 
                                                      if (view.ui.find("legend-id")){
                                                            view.ui.remove(legend)
                                                      } else {
                                                        console.log('legend is not on map view, nothing to do')
                                                      }
                                                      legend_position = 'outside_mapview'  //  without option 'off', otherwise use 'off'
                                                      $('#legend-outside-mapview-div').show()
                                                      break;
                              case 'off':
                                          // next position is outside_mapview
                                          $('#legend-outside-mapview-div').show()   
                                          legend_position = 'outside_mapview'
                                          break;


                              default:
                                console.log('legend position is not found, do not know what to do');
                            }


                          
                            
                          });
                      // --- end  --- hide legend
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
                    
                                                  // update current layer
                                                  single_selected_featureLayerObject_on_map.opacity = ftOpacity
                                                  

                            });
                            /**/
                            // ... end ...  - - - ftOpacity  - - -
                            /**/






                             // statistic info
                             var statisticInfo_element = document.getElementById("statistic_info");
                             view.ui.add(statisticInfo_element, "top-right");
 
                             // ... end  ... statistic info




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





                        
function show_info_outline_Tab(___properties){

  $("#info_outline").show()
  
  
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
}

function empty_info_outline_Tab(){
$('#info_outline').hide();
$('#info-window-div').html("")
}
  




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

                              remove_all_featurelayer_from_map()

                              

                              switch(layertype_) {

                                  case "folder":
                                    console.log(' nothing to do when select "folder" ', layerid_as_key, layername___)
                                    
                                  break;

                                  case "layer":
                                        console.log(' render "layer" ', layerid_as_key, layername___)
                                    
                                      
                                        var sublayer = flatFeatureLayerSublayerItem[layerid_as_key];
                                        sublayer.createFeatureLayer()
                                                                                    .then((featureLayer) => featureLayer.load())
                                                                                    .then((featureLayer) => {
                                                                                        // feature layer auto popupTemplate, auto highlight, etc.
                                                                                        //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-popuptemplate
                                                                                        //featureLayer.popupTemplate = featureLayer.createPopupTemplate(); // idiot map
                                                                                        featureLayer.outFields = ["*"];
                                                                                        featureLayer.opacity =  ftOpacity;
                                                                                        featureLayer.popupEnabled = false; // idiot map


                                                                                         // for tree only, add to map, but enforce visible false, let user click tree node to turn visible true(on)
                                                                                         featureLayer.visible = true;
                                                                                         map.add(featureLayer);

                                                                                         
                                                                                         single_selected_featureLayerObject_on_map = featureLayer
                                                                                         single_selected_featureLayerRealLayerID = featureLayer.layerId


                                                                                        // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
                                                                                        // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
                                                                                        single_selected_featureLayerObject_on_map.queryFeatureCount().then(function(numFeatures){
                                                                                          // prints the total count to the console
                                                                                          console.log('this selected layer total count is : ', numFeatures);
                                                                                          total_feature_count = numFeatures
                                                                                          update_statistic_info(current_feature_rendered , total_feature_count)

                                                                                          // add total count to jstree node
                                                                                          update_jstree_node_text(single_selected_featureLayerRealLayerID, total_feature_count)

                                                                                        });


                                                                                        view.whenLayerView(single_selected_featureLayerObject_on_map).then(function(layerView){

                                                                                         

            // - - - when map stop moving, update total count of feature show on map  - - -

              /* not use layer view watch update event, 
                because even mouse move on a feature, also fire this event, should only fire when map stop moving, 
                view.drag view.mouse-wheel(zoom) also don't work, because they fire too many event at each move, should just fire 1 time.

                layerView.watch("updating", function(value){

                  console.log(" watch layer view updating event ", value);
                  if (!value) {

                    layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,


                      //outFields: layerView.availableFields,
                      //where: "DEW_POINT > 10"

                                            })
                      
                                            .then(function(results) {

                                                                      current_feature_rendered = results.features.length
                                                                      console.log("current features returned and rendered : ",  current_feature_rendered);
                                                                      update_statistic_info(current_feature_rendered , total_feature_count)
                                                              })
                                                              
                                                              .catch(function(error) {
                                                                          console.log("query failed: ", error);
                                                              });
                  }//if


                });// layer view watch

              */

              // not use, because every map move, tigger 2 time, 1st is begining position, 2nd is ending position
              //view.watch("stationary", function (isStationary) {

              // in use, sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils
              // Use reactiveUtils to check when the extent changes. We include view.stationary so we only show a message, when the view is not moving.
              reactiveUtils.watch(
                () => [view.stationary, view.extent, view.scale],
                ([stationary, extent, scale], [wasStationary]) => {
                 if (stationary) {      
                         console.log('stationary happened, current extent ', extent)
                                                             
                         layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,

                                  //outFields: layerView.availableFields,
                                  //where: "DEW_POINT > 10"
                                })
                                  .then(function(results) {
                                                               current_feature_rendered = results.features.length
                                                               console.log("current features returned and rendered : ",  current_feature_rendered);
                                                               update_statistic_info(current_feature_rendered , total_feature_count)                                          
                                      })
                                         .catch(function(error) {
                                                               console.log("query failed: ", error);
                                            });
          
                 } else if (wasStationary) {
                                              // nothing to do
                                              console.log(' was stationary , nothing to do, ')
                                            }
                 return "";
               }
             );//  reactiveUtils.watch


    //  - - - end - - - when map stop moving, update total count of feature show on map  - - -



                                                                      
                                                                      
                                                                      
                                                                                           //  configuring the layer view 's highlight color (when mouse point feaeture) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                                                                                            layerView.highlightOptions = {
                                                                      
                                                                                              // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#HighlightOptions
                                                                                              color: featureLayerView_higlightOption_fillColor,  // [255, 255, 255, 0.92],
                                                                                              haloColor: featureLayerView_higlightOption_haloColor,  // [223, 255, 0, 0.95],
                                                                                              haloOpacity: featureLayerView_higlightOption_haloOpacity,  // 0.9,  // default is 1
                                                                                              fillOpacity: featureLayerView_higlightOption_fillOpacity, // 0.6
                                                                                            };
                                                                      

// -- - - - -- - - -   mouse-move -- - - - event -- - - -  
       
                  /*
                      mouse-move will fire 100 event each time, which freeze browser, not responsive.  mouse-click don't have such problem. 
                      for best performance, place inside layerView scope,  

                        esri sample solution to improve, not solve the 100+ mouse-move event each time, 
                        https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-feature-sidepanel

                        Map flickering on mouse move, because fire 100+ mouse-move event each time, down stream operation will pile up, jamed.
                        https://community.esri.com/t5/net-maps-sdk-questions/map-flickering-on-mouse-move/m-p/542909#M6637
                  */

                        
                        const debouncedUpdate = promiseUtils.debounce(async (event) => {
    
                          //console.log('  - - -   pointer-move fire too many times - - -  ', click_or_hover )
                          if (click_or_hover == 'hover'){
      
                                        const hitTest = await view.hitTest(event, { include: single_selected_featureLayerObject_on_map});
                                        let hitResult = hitTest.results.filter(function (result) {
                                                                                return result.graphic.layer === single_selected_featureLayerObject_on_map;
                                                                              })
      
                                        let graphic      
                                       
                                        // && logical AND assignment,  only when hitResult[0] is truthy, same as : 
                                        // var newObjectId
                                        // if (hitResult[0]) { newObjectId = hitResult[0].graphic.attributes[single_selected_featureLayerObject_on_map.objectIdField]; } else { newObjectId = undefined }
                                        var newObjectId = hitResult[0] && hitResult[0].graphic.attributes[single_selected_featureLayerObject_on_map.objectIdField];
                                                            
                                         
                                      //console.log('hover new Object Id vs old object Id : ', newObjectId, objectId);
                                      // fix bug, object id could be 0,  if (0) is false, actually, 0 is real id, should be true here.
                                      //if (!newObjectId) {
                                      if (newObjectId == undefined) {
                                                                  if (mouse_pointed_feature_highlight_handle){
                                                                    mouse_pointed_feature_highlight_handle.remove()
                                                                  }
                                                                  objectId = undefined
                                                                  // hide info outline 
                                                                  empty_info_outline_Tab()
                                                              
                                        } else if (objectId !== newObjectId) {
                                
                                                                  if (mouse_pointed_feature_highlight_handle){
                                                                    mouse_pointed_feature_highlight_handle.remove()
                                                                  }
                                                                  objectId = newObjectId;
                                                                  graphic = hitResult[0].graphic;
      
                                                                // if outside scope of layer View, must need get layer view. For single layer, if inside scrope, it is optional. For multi layer, even inside scope, still must get layer view
                                                                // to be safe, I always get layer view here, even it is single layer, inside scope.
                                                                view.whenLayerView(graphic.layer)
                                                                .then(function(layerView){
                                                                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic);
                                                                });
      
                                                                  console.log('newObjectId', newObjectId)
                                                                  //console.log(' ! * ! hit test ! * ! result ! * ! graphic ! * ! ', graphic )
                                                                  show_info_outline_Tab(graphic.attributes)
                                        }//if newObjectId
                                          
      
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
      
      
                // -- - - -  -- - - -  end  -- - - - -- - - -   mouse-move -- - - -  -- - - -  
      
                 
  
  
  
                                                                        
              });// view . when










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

                                                                                    })

                                    
                                        // must here, each time, after create new feature layer                                            
                                        init_feature_layer_view()


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

                                             // add total count to jstree node
                                             'check_callback': true, // rename update jstree node text https://stackoverflow.com/questions/6254735/how-can-i-rename-a-jstree-node

                                                  'themes': {
                                                      'name': 'proton',
                                                      'responsive': true
                                                  },
                                              'data' : root_allfolders_flatjson
                                      }
                          });

                }


               

                
      // only for : non-embed,non-vertical,  multiple layer, single select,   click or hover     
      var graphic_object_indexAsKey = {} 
      function init_feature_layer_view(){

        // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
        view.on("click", function(event){

          console.log(' view * click * fire 1 time is fine , hit test ', click_or_hover )
          if (click_or_hover == 'click'){

              view.hitTest(event).then(function(response){

                if (response.results.length) {

                  let hitResult = response.results.filter(function (result) {
                          return result.graphic.layer === single_selected_featureLayerObject_on_map;
                  })

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


                                                  // only for : non-embed,non-vertical,  multiple layer, single select,   click or hover   
                                                        $("#info_outline").show()
                                                  // . . .  end   . . .  only for : non-embed,non-vertical,  multiple layer, single select,   click or hover   
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
// ************** all sublayer create featureLayer originally but no longer use default popupTemplate, use customized hoverable instead  **************
/**/            
                             
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




            // add total count to jstree node
            function update_jstree_node_text(jstreeNodeIdISLayerId, totalFeatureCount){

              var current_jstree_node_text = $('#jstree_layerlist').jstree('get_selected', true)[0].text;
              console.log('current_jstree_node_text', current_jstree_node_text)

              // check whether already have total in node text
              if (current_jstree_node_text.includes('[~')){
             
              } else {
                var new_jstree_node_text = current_jstree_node_text + '<sup style="font-size:10px">[~' + totalFeatureCount + '~]</sup>'
                $('#jstree_layerlist').jstree('rename_node', jstreeNodeIdISLayerId , new_jstree_node_text );
              }


            }


              /**/ 
              // ************** end ************** all sublayer create featureLayer originally but no longer use default popupTemplate, use customized hoverable instead  ************** 
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
                      // only for feature layer full extent
                      function use_extent(){
                        console.log('go to feature layer full extent')
                        
                        if (single_selected_featureLayerObject_on_map){
                          single_selected_featureLayerObject_on_map.queryExtent().then(function(results){
                            // go to the extent of the results satisfying the query
                            view.goTo(results.extent);
                          });
                        }// if
                    }
                  /**/
                  //   --- --- end --- --- back to previous extent --- --- esri only --- ---  
                  /**/



                  function init_user_interface_event(){


                    $('#info_outline').hide()
                    $('#close_info_outline_panel').on('click', function(event) {
                      // remove highlight graphic on layer view
              if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
              }
                        empty_info_outline_Tab()
                    });

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

                    init_user_interface_event()
      
                    
                    
                          
                  }



}); // require, everything should be inside
