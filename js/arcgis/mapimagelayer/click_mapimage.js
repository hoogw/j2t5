



// geocoding address esri example https://developers.arcgis.com/javascript/latest/search-for-an-address/



require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",

  
  
  "esri/layers/TileLayer",
  "esri/geometry/geometryEngine",
  
  "esri/widgets/Legend",
  "esri/widgets/Search",
 
  "esri/rest/locator",
  "esri/rest/places",
  "esri/rest/support/FetchPlaceParameters",
  "esri/rest/support/PlacesQueryParameters",
  "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",

  "esri/widgets/Print",

  

  "esri/core/promiseUtils",
  "esri/core/reactiveUtils",

  
], function (
  esriConfig,
  Map, 
  MapView,

            Basemap,
            Attribution,
            
            WebTileLayer, 
  BasemapToggle,

  
   
  TileLayer,
  geometryEngine,
  Legend,
  Search,
  
  
  locator,
            places, 
            FetchPlaceParameters, 
            PlacesQueryParameters,
            
   Track,
             Locate,
             Graphic,
    
   Print,
            
   

             promiseUtils,
   reactiveUtils,


) {


  
      
       
      
      
      
       
      





/**/
// ----- image or tile -----  ----- 
/**/


var groundoverlay_opacity = 0.8

  var background_type = 'image'  // 'data' tile  tile
  var backgroundMapImageLayer
  var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression
  

  // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
  var backgroundFeatureLayer  
  

  var clicked_graphic
          
  
  var graphic_geometryType 
/**/
// ----- end  -----  image or tile -----  ----- 
/**/











// must at top to get above url ready
dom_ready_dojo();







var map = new Map({
                     //base map id without an API key is here https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                     basemap: google_hybrid, 
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
});



// ----- ui -----  ----- 
init_view_ui()

       // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
       createFeatureLayer() 
       
// for both image and tile
createMapImageLayer()
        
// for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
init_feature_layer_view()
  
                  

/**/
// ----- ui -----  ----- 
/**/
    
          // for vertical only, all outside-esri-widget 
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


            

                   // for vertical only, all outside-esri-widget 
                    const searchAddressWidget = new Search({

                      allPlaceholder: "Search", // only works if you have multiple source l o c a  t o r, ignore if only 1 source, like here.
                      // work around is wait until all image loaded,  windows.load { document.querySelector('.esri-search .esri-search__input').setAttribute('placeholder', 'Google search this area   ')}
                      
                      
                      // new Search({view}, search-widget-container-dom-id)
                       
                          // adjust width at css ".esri-search{width: 593px !important;}" ,  "!important" will overwrite the default "width:240px" in original esri-search class 
                          id: "outside-esri-search-widget-id",
                          view: view
                      },
                      "outside-esri-search-widget"
                    );
                    //view.ui.add(searchAddressWidget, "top-leading"); //Add to the map
                    
  
           
                    // ...................... toggle basemap ....................
                          //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-widgets
                          // 1 - Create the widget
                          var toggle = new BasemapToggle( //new BasemapToggle({view}, toggle-basemap-widget-container-dom-id)
                            {
                              // 2 - Set properties
                              id: "outside-esri-toggle-basemap-id",
                              view: view, // view that provides access to the map's 'topo' basemap
                              nextBasemap: "hybrid" // use without an API key, more choice https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                            },
                            "outside-esri-toggle-basemap"
                        );
                          // Add widget to the top right corner of the view
                          //view.ui.add(toggle, "bottom-left");
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


                        // change button icon size by 
                          
                        id: "outside-esri-track-current-location-id",
                        view: view
                      },
                      "outside-esri-track-current-location"
                    );
                    //view.ui.add(locate, "bottom-right");
          // track large icon modified at color.css for button size, arcgis_common.js bottom for shadow DOM icon size change.
          // without shadow DOM, such as toggle basemap icon, to make it large only set at color.css 
          //   . . end  . .  track  . . 


                                    
                                        
                   





                    //  ... opacity  ...

                    if (param_overlayOpacity){
                      groundoverlay_opacity = param_overlayOpacity / 10
                    }

                    var opacity_slider = document.querySelector("#overlay_opacity_range");
                    opacity_slider.value = groundoverlay_opacity * 10

                    var opacity_value_text = document.querySelector("#opacity_value_text");
                    opacity_value_text.textContent = opacity_slider.value;
                    
                    // event handle   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                    opacity_slider.addEventListener("input", (event) => {
                      var _overlay_opacity = event.target.value;
                      opacity_value_text.textContent = _overlay_opacity
                      update_url_parameter('overlayOpacity', _overlay_opacity);
            
                      groundoverlay_opacity = _overlay_opacity / 10;
            
                      // update overlay opacity
                      if (backgroundMapImageLayer){ backgroundMapImageLayer.opacity = groundoverlay_opacity }
                                         
                    });
                    // ... end ... opacity


                 

                     






  




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
        // ----- image or tile -----  ----- 
        /**/   
                  // mapimagelayer - widget - convert - to - component - 
                
                async function createMapImageLayer(){
                 const [MapImageLayer] = await $arcgis.import(["@arcgis/core/layers/MapImageLayer.js"]); 
                //- - end - - mapimagelayer - widget - convert - to - component -  
                        
                                        

                                        backgroundMapImageLayer = new MapImageLayer({

                                          //url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
                                          url: background_mapserver_url,
                                          
                                          sublayers: [
                                            {  // sets a definition expression on sublayer 3
                                              id: parseInt(layer_id), // warning sub layer id must be number, can't be string
                                            }],


                                          // withou this , by default, only 'name' field exported, must specify ["*"] here 
                                          outFields: ["*"],
                                          
                                          // opacitySlider, since v4.12, we use 4.11 because v4.12 have bug, failed popupTemplate.content ["*"]
                                          //https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-smartMapping-OpacitySlider.html
                                          //https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/
                                          opacity: groundoverlay_opacity
                                        
                                    });

                                   

                                    
                                    // classified image only
                               backgroundMapImageLayer.when(() => {
                                // must wait until map image layer is ready
                                console.log('map Image Layer sublayer id  :   ',  layer_id, backgroundMapImageLayer)
                                mapimagerlayer_sub_layer = backgroundMapImageLayer.findSublayerById(parseInt(layer_id)); // warning sub layer id must be number, can't be string
                                console.log('map Image Layer sublayer object :   ',  mapimagerlayer_sub_layer)
                              });

                                  
                                    // must wait until promise resolved 
                                    backgroundMapImageLayer.loadAll()

                                          .catch(function(error) {
                                            // Ignore any failed resources
                                          })

                                          .then(function() {
                                                            console.log("backgroundMapImageLayer All loaded, ===  capabilities  === : === ", backgroundMapImageLayer.capabilities);
                                                            console.log('backgroundMapImageLayer , url',background_mapserver_url,  backgroundMapImageLayer)
                                                            map.add(backgroundMapImageLayer)

                                                            // enforce use yellow square for point, yellow line, yellow polygon
                                                            // must be here after MapImageLayer fully loaded
                                                            enforce_yellow_linepointpolygon(backgroundMapImageLayer)
                                    });

                  }
                

                  // for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
                  async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);  // special for map image, data, tile interchangable

                     
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url, 
                      // labeling see this example https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/
                      // labelingInfo: [labelClass]  // not use, this will add label to entire layer data, not just filtered result
                      opacity: _opacity,
                      outFields: ['*'],
                    });
           
    
    
                    // only for vertical classified
                    console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )
    
                    let classified_query = backgroundFeatureLayer.createQuery();
                    // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                    //if ((current_selected_field_name) && (current_selected_field_value)){
                    if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){
    
    
    
                                // any showall means no filter, no search parameter
                                classified_query.where = '1=1'
                    } else {
    
                        //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                          if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                  classified_query.where =   current_selected_field_name + ' is null'     //"STATE_NAME is null ";
                        } else { 
    
                                  // by default  where condition think it is string
                                  classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
    
                                  // string
                                  if (_feature_attributes_string.includes(current_selected_field_name)){  
                                    classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                  }
                                                                  
                                  // number (integer, double,)
                                  if (_feature_attributes_integer.includes(current_selected_field_name)){
                                    classified_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                  }
    
                                  // date 
                                  if (_feature_attributes_date.includes(current_selected_field_name)){
                                    // need to handle date type, so far by default use string, may not work
                                    console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                  }
    
                        } // null         
                        
                        console.log('classified query where clause is: ', classified_query.where )
    
                    } // null  
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            //backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
            backgroundFeatureLayer.queryFeatureCount(classified_query).then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info_vertical(current_feature_rendered , total_feature_count)
    
            });
    
            console.log("background type", background_type);
            if (background_type == 'data'){
              map.add(backgroundFeatureLayer)
           
    
              view.whenLayerView(backgroundFeatureLayer).then(function(layerView){
    
                backgroundFeatureLayer_layerView = layerView
    
               
    
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
                                                            update_statistic_info_vertical(current_feature_rendered , total_feature_count)
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
    
               // only for vertical classified
               let classified_query = backgroundFeatureLayer.createQuery();
               // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
               //if ((current_selected_field_name) && (current_selected_field_value)){
               if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){
    
    
    
                           // any showall means no filter, no search parameter
                           classified_query.where = '1=1'
               } else {
    
                   //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                     if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                             classified_query.where =   current_selected_field_name + ' is null'     //"STATE_NAME is null ";
                   } else { 
    
                             // by default  where condition think it is string
                             classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
    
                             // string
                             if (_feature_attributes_string.includes(current_selected_field_name)){  
                               classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                             }
                                                             
                             // number (integer, double,)
                             if (_feature_attributes_integer.includes(current_selected_field_name)){
                               classified_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                             }
    
                             // date 
                             if (_feature_attributes_date.includes(current_selected_field_name)){
                               // need to handle date type, so far by default use string, may not work
                               console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                             }
    
                   } // null         
                   
                   console.log('classified query where clause is: ', classified_query.where )
    
               } // null  
                                                   
               //layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,

                        //outFields: layerView.availableFields,
                        //where: "DEW_POINT > 10"
               //       })
               layerView.queryFeatures(classified_query)
                        .then(function(results) {
                                                     current_feature_rendered = results.features.length
                                                     console.log("current features returned and rendered : ",  current_feature_rendered);
                                                     update_statistic_info_vertical(current_feature_rendered , total_feature_count)                                          
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
    
    
              });// view . when
    
            }
    
                  }
                 

                  function pan_to_real_location(){

                    /*
                    Do not Zoom to extent of all features, bad idea, slow, bulky,  https://developers.arcgis.com/javascript/latest/sample-code/featurelayer-queryextent/
                    only zoom to first feature, good idea, fast, neat
                    does not matter you add feature layer to map or not, it can alway zoom to 1st feature
                    */
                    const  query1stFeature = {
                      
                             // query object https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html
                             where: '1=1',  // return max count of return feature

                             /*  
                                  Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                                  https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                                  without use them, must use "where 1=1" will return max number of return count
                                  if use "num" and "start", then do not use "where 1=1"

                                  num:1,
                                  start:0,
                             */

                             returnGeometry:true,
                           }
    
                           backgroundFeatureLayer
                           .queryFeatures(query1stFeature)
                           .then((results) => {
                                                 console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                                                 // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                                                 var found_1_valid_geometry = false
                                                 for (let i = 0; i < results.features.length; i++) {
                                                   if (results.features[i].geometry){
                                                    console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                                                    found_1_valid_geometry = true
                                                    
                                                    view.goTo(results.features[i].geometry)
                                                    break; // break for loop
                                                   }
                                                 }//for 
                                                 if (! found_1_valid_geometry){
                                                    console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                                                    // goto full extent, always works
                                                    view.goTo(results.features); 
                                                 }
                           })
                           .catch(function(error) {
                                                 console.log('failed to zoom to any feature ', error); 
                           });  
                                                                           
    
                 }




        /**/
                // ----- end  -----  image or tile -----  ----- 
                /**/




              


                
                // only for :single layer, map image layer, click   
                var graphic_object_indexAsKey = {}
                function init_feature_layer_view(){


                    //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                    //view.on("pointer-move", function(event){
                    // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
                    view.on("click", function(event){


                      // test, because feature layer did not add to map, only map image layer add to map, so hit test map image layer will return empty, only hit test feature layer will return something. 
                      view.hitTest(event).then(function(response){
                        if (response.results.length) {
                          let hitResult = response.results.filter(function (result) {
                                  return result.graphic.layer === backgroundFeatureLayer;
                          })
                          console.log(' test, because feature layer did not add to map, only map image layer add to map, so hit test map image layer will return empty, only hit test feature layer will return something.  ', hitResult )
                        }
                      })




                      // ... ... . only for map image layer and tile layer, click event  ... ... . 
                              console.log('view clicked, .. .. .. ',event,  event.mapPoint )

                              // remove previous both inactive and highlighted graphic and square guide box 
                              clear_clicked_graphic()
                              
                        if ((background_type == 'image') || (background_type == 'tile')){
                                      
                                      console.log('Map Image Layer or tile,  get clicked, .. .. .. ',event,  event.mapPoint )
                                      
                                      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures
                                      const queryParams = backgroundFeatureLayer.createQuery();
                            
                            

                                      //do not use point, because it works with polygon, but not work with line and point
                                      //queryParams.geometry = event.mapPoint;
                                      // . . . use buffer  . . .
                                            zoom_adjust_by =  Math.pow(2,(23 - view.zoom))
                                            buffer_tolerance_lat_degree = lat_tolerance_degree_base * zoom_adjust_by;
                                            buffer_tolerance_lng_degree = lng_tolerance_degree_base * zoom_adjust_by;
                                            console.log(' after zoom adjust, tolerance is ', view.zoom, zoom_adjust_by, buffer_tolerance_lat_degree, buffer_tolerance_lng_degree)

                                            SWlong = event.mapPoint.longitude - buffer_tolerance_lng_degree;
                                            SWlat  = event.mapPoint.latitude - buffer_tolerance_lat_degree;
                                            NElong = event.mapPoint.longitude + buffer_tolerance_lng_degree;
                                            NElat  = event.mapPoint.latitude + buffer_tolerance_lat_degree;
                                            console.log(' after zoom adjust, SWlong SWlat NElong NElat', SWlong, SWlat, NElong, NElat)

                                            square_graphic_southWest = [SWlong, SWlat]
                                            square_graphic_southEast = [NElong, SWlat]
                                            square_graphic_northEast = [NElong, NElat]
                                            square_graphic_northWest = [SWlong, NElat]
                                            console.log(' after zoom adjust, square_graphic_southWest  square_graphic_southEast square_graphic_northEast square_graphic_northWest ', square_graphic_southWest, square_graphic_southEast, square_graphic_northEast, square_graphic_northWest)

                                            square_graphic_geometry = {
                                              type: "polygon", // autocasts as new Polygon()
                                              rings: [square_graphic_southWest, square_graphic_southEast, square_graphic_northEast,square_graphic_northWest,square_graphic_southWest ]
                                            }

                                            square_graphic = new Graphic({
                                              geometry: square_graphic_geometry,
                                              symbol: square_graphic_symbol,
                                            });
                                            // square guide box graphic always at collection-array index as 0 
                                            view.graphics.add(square_graphic, 0);

                                            // not use, because it works with polygon, but line and point will not work well when zoom level is 10 or less
                                            //const ptBuff = geometryEngine.buffer(event.mapPoint, 300, "feet");
                                            //queryParams.geometry = ptBuff;

                                            queryParams.geometry = square_graphic_geometry

                                      //  . . . end . . . use buffer  . . .






                            backgroundFeatureLayer.queryFeatures(queryParams).then(function(results){

                                    // prints the array of result graphics to the console
                                    console.log('.. .. .. Map view clicked, .. .. .. query feature layer result .. .. .. could be more than 1 feature', results.features);

                                    //console.log('only show 1st feature', results.features[0]);
                                    if (results.features.length){

                                        graphic_object_indexAsKey = {}
                                        let ___graphic___ 
                                        var multiple_layer_properties_html = ''
                                        var __layer_name
                                        var ___properties

                                        current_queryFeatureResultsAsGraphic_length = results.features.length
                                        var shift_index_as_key

                                        for (let _index = 0; _index < results.features.length; _index++) {
                                        
                                          shift_index_as_key = _index + 1 // shift index by 1, 
                                          ___graphic___ = results.features[_index]

                                          graphic_object_indexAsKey[shift_index_as_key] = ___graphic___
                                          console.log(' ! * ! click ! * ! result ! * ! add graphic by shift-index-as-key ! * ! ', shift_index_as_key, ___graphic___)
                                              
                                          __layer_name = ''
                                          __layer_name += 'UniqueID(' + ___graphic___.uid + ')' + layerID_NAME_separator + 'OBJECTID ( ' + ___graphic___.attributes.OBJECTID + ' )'
                                          __layer_name += layerID_NAME_separator + ___graphic___.layer.title + '(layerID:' + ___graphic___.layer.layerId + ')'
                                          
                                          ___properties = ___graphic___.attributes


                                          
                                          // add all graphic to map, but only highlight last graphic (default yellow), others as inactive symbol color (thin black line, gray tint)
                                          graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                          // not use, because by default, first added graphic is always at bottom, will be blocked by later other inactive graphic
                                          //if (_index == 0){  
                                          // last added graphic is always on top, will not be blocked by other previously added inactive graphic. So highlight last graphic is the solution, don't forget to reverse the order of info-window, 1 at bottom, max at top
                                          if (_index == results.features.length - 1){  
                                                        // add last(index is length minus 1) graphic as selected (default yellow)
                                                            if (graphic_geometryType.includes('polygon')){
                                                              ___graphic___.symbol = polygon_symbol
                                                            } else if (graphic_geometryType.includes('line')){
                                                              ___graphic___.symbol = polyline_symbol
                                                            } else if (graphic_geometryType.includes('point')){  
                                                              ___graphic___.symbol = point_symbol
                                                            } //if 
                                                            clicked_graphic_index = shift_index_as_key
                                          } else {
                                                  // add other index as inactive (like google default geojson color)
                                                    if (graphic_geometryType.includes('polygon')){
                                                      ___graphic___.symbol = inactive_polygon_symbol
                                                    } else if (graphic_geometryType.includes('line')){
                                                      ___graphic___.symbol = inactive_polyline_symbol
                                                    } else if (graphic_geometryType.includes('point')){  
                                                      ___graphic___.symbol = inactive_point_symbol
                                                    } //if 
                                          }//if

                                          view.graphics.add(___graphic___, shift_index_as_key);
                                          // . . end . . add all graphic to map,


                                                
                                          multiple_layer_properties_html += '</br>'

                                          // build html only, reverse order, 1 should at bottom, last-index should be at top, because I highlight last-index graphic
                                          var _html_floor = ''
                                          //if (_index == 0){
                                          if (_index == results.features.length - 1){  
                                            _html_floor += '<fieldset>' 
                                            _html_floor +=     '<legend>' + shift_index_as_key +  ' : ' + __layer_name +'</legend>'
                                            _html_floor +=     '<div class="flex-row selected_highlighted_style attribute_field_set_style"   id="attribute_field_set_' + shift_index_as_key +  '"   >'  // if 0, means need start a new info window
                                            _html_floor +=           json_flex_tip_viewer(___properties)
                                            _html_floor +=     '<div>'
                                            _html_floor += '</fieldset>'
                                          } else {

                                                    _html_floor += '<fieldset>'
                                                    _html_floor +=     '<legend>' + shift_index_as_key +  ' : ' + __layer_name +'</legend>'
                                                    _html_floor +=     '<div class="flex-row attribute_field_set_style"   id="attribute_field_set_' + shift_index_as_key +  '"   >' // not 0, means need append to existing info window
                                                    _html_floor +=         json_flex_tip_viewer(___properties)
                                                    _html_floor +=     '<div>'
                                                    _html_floor += '</fieldset>'

                                          }//if
                                          
                                          // reverse order, 1 at bottom, max at top, since I highlight last-index graphic, it added lastly, will not block by previously added inactive graphic
                                          multiple_layer_properties_html = _html_floor + multiple_layer_properties_html
                                          //  . .  end    . .  build html only


                                           /**/
                                          //  --- zoom to feature or not radio button     --- 
                                          /**/

                                                        //if ((zoom_to_feature_or_not == 'zoom_to_feature') && (_index == 0)){
                                                        // reverse order, 1 should at bottom, last-index should be at top, because I highlight last-index graphic
                                                        if ((zoom_to_feature_or_not == 'zoom_to_feature') && (_index == results.features.length - 1)){

                                                          // only zoom to 1st feature
                                                          console.log('zoom to feature or not', ___graphic___)
                                                          view.goTo(___graphic___)

                                                          var ___graphic___geometry___type____ = ___graphic___.geometry.type

                                                          // point only, enforce to zoom level 18
                                                          if (___graphic___geometry___type____.includes('point')){
                                                          view.zoom = default_zoom_level_for_point;
                                                          }

                                          } else {

                                          }//if

                                          /**/
                                          //  --- end  ---  zoom to feature or not radio button    --- 
                                          /**/



                                        }// for index
                                        
                                        



                                        $('#info_outline').show();
                                        $('#info-window-div').html(multiple_layer_properties_html)


                                        // add click event to html, everythime, .html() will lose previous event, so must add event from 0 to index
                                        for (let _index = 0; _index < results.features.length; _index++) {

                                          shift_index_as_key = _index + 1 // shift index by 1, 


                                          console.log('add event to element id :  attribute_field_set_', shift_index_as_key)
                                          $("#attribute_field_set_" + shift_index_as_key ).on('click', function(){
                                                      var element_id = $(this).attr('id');
                                                      var _select_highlight_index = Number(element_id.replace('attribute_field_set_', ''))
                                                      console.log("you click  index  :   ",  _select_highlight_index)
                
                                                      $(".attribute_field_set_style").removeClass('selected_highlighted_style')
                                                      $(this).addClass('selected_highlighted_style')

                                                      // change previous highlight selected graphic to inactive 
                                                      ___graphic___ = view.graphics.getItemAt(clicked_graphic_index);
                                                      graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                                      if (graphic_geometryType.includes('polygon')){
                                                        ___graphic___.symbol = inactive_polygon_symbol
                                                      } else if (graphic_geometryType.includes('line')){
                                                        ___graphic___.symbol = inactive_polyline_symbol
                                                      } else if (graphic_geometryType.includes('point')){  
                                                        ___graphic___.symbol = inactive_point_symbol
                                                      } 

                                                      // then change selected inactive graphic to highlight
                                                      ___graphic___ = view.graphics.getItemAt(_select_highlight_index);
                                                      graphic_geometryType = ___graphic___.geometry.type.toLowerCase()
                                                      if (graphic_geometryType.includes('polygon')){
                                                        ___graphic___.symbol = polygon_symbol
                                                      } else if (graphic_geometryType.includes('line')){
                                                        ___graphic___.symbol = polyline_symbol
                                                      } else if (graphic_geometryType.includes('point')){  
                                                        ___graphic___.symbol = point_symbol
                                                      } 


                                                      clicked_graphic_index = _select_highlight_index



                                                       /**/
                                                      //  --- zoom to feature or not radio button     --- 
                                                      /**/

                                                                
                                                                console.log('you click  index graphic ', ___graphic___)

                                                                if (zoom_to_feature_or_not == 'zoom_to_feature'){
                                                                  // only zoom to 1st feature
                                                                  view.goTo(___graphic___)

                                                                  var ___graphic___geometry___type____ = ___graphic___.geometry.type

                                                                  // point only, enforce to zoom level 18
                                                                  if (___graphic___geometry___type____.includes('point')){
                                                                    view.zoom = default_zoom_level_for_point;
                                                                  }

                                                                } else {

                                                                }//if

                                                      /**/
                                                      //  --- end  ---  zoom to feature or not radio button    --- 
                                                      /**/



                                          });

                                        }//for

                                        
                                    
                                    } 

                          });// back ground
                        }

                      // ... end ... . only for map image layer and tile layer, click event  ... ... . 



                    }); // view . on

                    // --  end  --- highlight feature on pointer-move

                }// function



               // remove previous both inactive and highlighted graphic and square guide box 
               function clear_clicked_graphic(){

                    console.log('remove all previous inactive, highlighted, square guide box, (they all are graphic), remove-all-function works')

                    view.graphics.removeAll()

                    empty_info_outline_Tab()
               }



/* .... ... ... external function ... ... ... */      





function init_background_layer(){

  // .... ... ...  background layer url .... ... ... 

            init_global_var() 
            // must carry these value from arcgis_common.js
            background_mapserver_url = param_background_mapserver_url
            layer_id  = param_layer_id
            background_layer_url = param_background_layer_url
            console.log(' background_mapserver_url ', background_mapserver_url)  
            console.log(' layer_id ', layer_id)  
            console.log(' background_layer_url ', background_layer_url) 


            /**/
                  // token
                  /**/
                  // add token https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-do-i-add-a-secured-feature-service-using-a/td-p/1040881
                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#RequestInterceptor
                  if (arcgis_online_token){
                    esriConfig.request.interceptors.push({
                      // set the `urls` property to the URL of the FeatureLayer so that this
                      // interceptor only applies to requests made to the FeatureLayer URL
                      urls: background_layer_url,  // only this layer
                      // use the BeforeInterceptorCallback to add token to query
                      before: function (params) {
                          params.requestOptions.query = params.requestOptions.query || {};
                          params.requestOptions.query.token = arcgis_online_token
                      },
                    });
                  }
                  /**/
                  // . . end .  .  . token
                  /**/
            
            
}







function init_user_interface_event(){



    /**/
        //  --- zoom to feature or not radio button     --- 
        /**/
        if (param_zoom_to_feature_or_not){
          zoom_to_feature_or_not = param_zoom_to_feature_or_not
        }
        // first time set radio
        $("input[type=radio][name=zoom_to_feature_or_not_radio][value=" + zoom_to_feature_or_not + "]").prop('checked', true);
        // radio change event
        $("input[type='radio'][name='zoom_to_feature_or_not_radio']").change(function(){
          zoom_to_feature_or_not = $("input[type='radio'][name='zoom_to_feature_or_not_radio']:checked").val();
          console.log(" zoom_to_feature_or_not : --  ", zoom_to_feature_or_not);
          update_url_parameter('zoom2feature', zoom_to_feature_or_not);
        });

    /**/
    //  --- end  ---  zoom to feature or not radio button    --- 
    /**/
    
  }





  /**/
  // -- -- -- vertial adjustment  -- -- -- 

    

    

     

    
    function show_info_outline_Tab(___properties){
        $('#info_outline').show();
        
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
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

init_background_layer()
// must await
await get_feature_attributes(background_mapserver_url, layer_id)
 
   


    

    init_user_interface_event()

    update_layer_name(background_layer_url, _layer)    
    
    

   
   
                  

}




            /**/
              // -- -- -- only for map image layer classified  -- -- -- 
              var polygonFillBy = 'red-diagonal-cross' // 'yellow-forward-diagonal'


              // only for map image layer,             
              function enforce_yellow_linepointpolygon(_this_mapimage_layer){


              // default stroke(outline) color is yellow, but for map image layer only, change it to blue or red color
              _default_strokeColor = 'rgba(0,0,255, 0.95)';   //'blue'


                 /**/
                // -- -- -- label and color  -- -- -- 

              if (polygonFillBy == 'original-color'){

                // only for map image layer, 'native'
                _this_mapimage_layer.sublayers.items[0].renderer = null;

              } else {

             


             

                switch (polygonFillBy) {

                  case 'original-color':
                    current_simplefillPattern = 2  // backward-diagonal
                    _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                    break;

                  case 'red-diagonal-cross':
                    current_simplefillPattern = 2  // backward-diagonal
                    _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                    break;

                  case 'blue-tint':
                    current_simplefillPattern = 6  // solid
                    _default_fillColor = 'rgba(0, 0, 255, 0.2)'; // blue
                    break;

                  case 'nothing':
                    current_simplefillPattern = 5  // none
                    break;


                    case 'yellow-forward-diagonal':
                      current_simplefillPattern = 3  // backward-diagonal
                      _default_fillColor = 'rgba(255,255,0, 0.95)'; // yellow
                      break;


                    case 'red-cross':
                      current_simplefillPattern = 1  // backward-diagonal
                      _default_fillColor = 'rgba(255, 68, 51, 0.95)'; // red
                      break;


                      case 'yellow-tint':
                    current_simplefillPattern = 6  // solid
                    _default_fillColor = 'rgba(255,255,0, 0.2)'; // red
                    break;


                    case 'yellow-backward-diagonal':
                      current_simplefillPattern = 0  // backward-diagonal
                      _default_fillColor = 'rgba(255,255,0, 0.95)'; // yellow
                      break;

                  default:
                    console.log(`Sorry, we are out of ${polygonFillBy}.`);
                }



                //. . . end  . . . -- -- -- label and color  -- -- -- 
                /**/



                    // for geojsonlayer, featurelayer, 
                    //================================== renderer =================================================
                    // polygon

                    var polygon_renderer = {
                      type: "simple",  // autocasts as new SimpleRenderer()
                      symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()

                        //  . . .simple fill symbol style . . .
                        style: pattern_simpleFillSymbol_esriSFS_js_api_array[current_simplefillPattern],
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






                  console.log( ' _this_mapimage_layer.sublayers.items[0].geometryType ......>'  , _this_mapimage_layer.sublayers.items[0].geometryType)
                  var _geometry_type_ = _this_mapimage_layer.sublayers.items[0].geometryType.toLowerCase()
                  if (_geometry_type_ == 'polygon') {
                                console.log( ' _this_mapimage_layer.sublayers.items[0].renderer ......>'  , polygon_renderer)
                                _this_mapimage_layer.sublayers.items[0].renderer = polygon_renderer;
                  } 

                  if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                    _this_mapimage_layer.sublayers.items[0].renderer = point_renderer;
                  }   


                  if (_geometry_type_ == 'polyline') {
                    _this_mapimage_layer.sublayers.items[0].renderer = polyline_renderer;
                  }   



            // -- -- -- label and color  -- -- -- 
                }// if original color


              } 
              //    . . . end  . . . enforce use yellow square for point, yellow line, yellow polygon 
              /**/  


            //. . . end  . . . -- -- -- map image layer classified  -- -- -- 
            /**/
         


          /* 
                The last things before require end is pre-select or pre-search keywords, must wait until MapView is ready.


                1). pre select must await until all level 1 html loaded
                2). pre select must await until MapView is ready,  see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
                    A MapView may not be immediately ready for display after it has been constructed. 
                    For example, map data may need to be loaded first to determine the spatialReference of the view, 
                    or the DOM container may not yet have a non-zero size. 
                    Many of the view methods (such as hitTest or goTo) need the view to be ready before they can be used.
                    .when() method on the MapView instance can be called to execute processes that may only run after the map has loaded.

                    2.1). dojo use .when, https://dojotoolkit.org/reference-guide/1.9/dojo/when.html
                    dojo/when is designed to make it easier to merge coding of synchronous and asynchronous threads. 
                    Accepts promises but also transparently handles non-promises. 
                    If no callbacks are provided returns a promise, regardless of the initial value. 
                    Also, foreign promises are converted.
                    If callbacks are provided and the initial value is not a promise, 
                    the callback is executed immediately with no error handling. 
                    Returns a promise if the initial value is a promise, or the result of the callback otherwise.



            */
                    view.when(function(){


                      // MapView is now ready for display and can be used. Here we will
                      // use goTo to view a particular location at a given zoom level and center
                      /* 
                          view.goTo({
                            center: [-112, 38],
                            zoom: 12
                          });
                      */


                            // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                            console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                            if (zoom_to_1st_feature){
                                                        // only zoom 1 time, first time, never zoom again
                                                        zoom_to_1st_feature = false; 
                                                        //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                                        pan_to_real_location()
                            }//if



                            // pre-search-keyword here, not done yet,

                           
                    
                    })
                    .catch(function(err) {
                      // A rejected view indicates a fatal error making it unable to display.
                      // Use the errback function to handle when the view doesn't load properly
                      console.error("MapView rejected:", err);
                    });
            
 

}); // require, everything should be inside

