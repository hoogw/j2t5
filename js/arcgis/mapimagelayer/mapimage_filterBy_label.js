
/*

       3D          featurelayer use following name, but mean the same thing:  v4.x  ,  3Dscene, 
       2D          featurelayer_popup use following name, but mean the same thing:  v4.x_popup  ,  2D, 
       2D variant  featurelayer_v3 use following name, but mean the same thing:  v3  ,  just a different version, no longer use v3.x, 

*/




/*
 http://localhost:10/json2tree/arcgis/js4/featurelayer.html?
 layer=Adjacent_Cities
 &url=https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer/1
 &_center_zoom=16.7
 &_center_lat=34.0653347
 &_center_long=-118.24389

http://localhost:10/json2tree/arcgis/js4/featurelayer.html?layer=Adjacent_Cities&url=https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer/1&_center_zoom=16.7&_center_lat=34.0653347&_center_long=-118.24389

 *
 **/




require([
  
  "esri/Map",
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",
  
  
  "esri/layers/support/LabelClass",
  
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

  
  
], function(
            Map, 
            MapView,

            Basemap,
            Attribution,
            
            WebTileLayer,
            BasemapToggle,
            
            
            LabelClass,
             
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

 // classified image only
var groundoverlay_opacity = 0.8
var background_type = 'image'  // // image only ,    'data' tile  
var backgroundMapImageLayer
var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression


// for map image layer only, do not add featurelayer to map, but still create for total count, zoom to feature 
var backgroundFeatureLayer  
var backgroundFeatureLayer_layerView   // for filter feature layer

var clicked_graphic
          

var graphic_geometryType 
/**/
// ----- end  -----  image or tile -----  ----- 
/**/



       






    /**/
    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
    /**/

          // -2 means current showing not available,  -1 means total count not available
          var current_feature_rendered = -2
          var _classified_count_of_feature = -1;

          var zoom2feature_noMoreThan = 20  // default
          var zoom2feature_zoomLevel = 18  // default
          var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
          //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level'

          
   /**/
   //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
   /**/
   

                              /**/
                              // ----- color style setting ----- 
                              /**/ 
                              var native_renderer
                              var symbolType_radioValue = 'native'
 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  


                   /**/          
            // -- -- -- mapimagelayer serverside label  -- -- -- 

            var current_dynamicLabel = 'nolabel'
            var bglayer_labelClass
            var bglayer_labelExpression = "$feature.OBJECTID" // default for labelExpressionInfo( must support Arcade)
            var bglayer_labelExpression_MapImage = "[OBJECTID] CONCAT" // default for mapimagelayer (without Arcade)
            var bglayer_labelColor = css_rgba_color_array[1]  // blue
            var bglayer_labelColorName = color_name_array[1]  // blue
            var bglayer_labelFontSize = 12

          //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 
          /**/

                
/**/
// -- -- -- label and color  -- -- -- 

var polygonFillBy = 'red-diagonal-cross' //'original-color'

//. . . end  . . . -- -- -- label and color  -- -- -- 
/**/


             
           
 



              // any document ready function is in here
              dom_ready_dojo();

              var map = new Map({
                basemap: google_hybrid,
              });
            
              
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
                     //view.ui.add(legend, "top-right");  

             //======= end ============ add legend ============================
             /**/ 



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


                 id: "outside-esri-track-current-location-id",
                 view: view
               },
               "outside-esri-track-current-location"
             );
             //view.ui.add(locate, "bottom-right");
          // track large icon modified at color.css for button size, arcgis_common.js bottom for shadow DOM icon size change.
          // without shadow DOM, such as toggle basemap icon, to make it large only set at color.css 
          //   . . end  . .  track  . . 


                             
                                 
            



             /**/
             // --- hide legend  --- 
               
             // first time set, next position is on map view
             legend_position = 'outside_mapview' //'outside_mapview' // 'on_mapview'  'off'
             //$('#legend-outside-mapview-div').hide() 


                 // event handle
                 $('#hideLegend_button').on('click', function(event) {


                   console.log('toggle or hide legend button clicked, before toggle, old legend position',  legend_position)

                   switch (legend_position) {
                     case 'outside_mapview':
                                             // next position is on map view
                                             /**/

                                             // hide outside mapview legend
                                             $('#legend-outside-mapview-div').show() 
                                             legend_position = 'outside_mapview'  //  without option 'off', otherwise use 'off'
                                                      $('#legend-outside-mapview-div').show()
                                             break;
                     
                     case 'off':
                                 // next position is outside_mapview
                                 $('#legend-outside-mapview-div').hide()   
                                 legend_position = 'outside_mapview'
                                 break;


                     default:
                       console.log('legend position is not found, do not know what to do');
                   }


                 
                   
                 });
             // --- end  --- hide legend
             /**/




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


                                    if (native_renderer == null) {
                                      native_renderer = backgroundMapImageLayer.sublayers.items[0].renderer.clone();
                                    }
                                    console.log("Map Image Layer, is ready, ", backgroundMapImageLayer);
                                    console.log("Map Image Layer, layer 0, native renderer", native_renderer);



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




               
/**/
// -- -- -- Warning: Only for classified  -- -- -- map image layer only  -- -- --
/**/ 

         


                
                // only for :single layer, map image layer, click   
                var graphic_object_indexAsKey = {}
                // Warning: Only for classified, background feature query by current_selected_field_name, current_selected_field_value
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





                            /**/
                            // -- -- -- Warning: Only for classified  -- -- --
                            /**/ 
                                  var _fieldType
                                  if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){
                                            // any showall means no filter, no search parameter
                                            queryParams.where = '1=1'
                                  } else {
                                            _fieldType = field_type[current_selected_field_name]
                                            var ____fieldType_lowerCase  = _fieldType.toLowerCase(); 
                            
                                            if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ) {
                                              queryParams.where = current_selected_field_name + " = " + current_selected_field_value + "";
                                            } else {
                                              queryParams.where = current_selected_field_name + " = '" + current_selected_field_value + "'";                                                                                                                
                                            }

                                    }//if

                            /**/
                            // . . . end  . . . -- -- -- Warning: Only for classified  -- -- -- 
                            /**/





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
                                          });

                                        }//for

                                        



                                        /**/
                                        // -- -- -- Warning: Only for classified  -- -- --
                                        /**/ 

                                        highlight_keywords_markjs(current_selected_field_value)
                                        /**/
                                        // . . . end  . . . -- -- -- Warning: Only for classified  -- -- -- 
                                        /**/



                                    
                                    } 

                          });// back ground
                        }

                      // ... end ... . only for map image layer and tile layer, click event  ... ... . 



                    }); // view . on

                    // --  end  --- highlight feature on pointer-move

                }// function

/**/
// . . . end  . . . -- -- -- Warning: Only for classified  -- -- --  map image layer only  -- -- --
/**/

               // remove previous both inactive and highlighted graphic and square guide box 
               function clear_clicked_graphic(){

                    console.log('remove all previous inactive, highlighted, square guide box, (they all are graphic), remove-all-function works')

                    view.graphics.removeAll()

                    empty_info_outline_Tab()
               }



/* .... ... ... external function ... ... ... */ 


                      

               
                                          
                 

/**/
// ========== classified  ========== 
/**/







                  // remove all filter, show     all    feature
                  function showAll(){

                    current_selected_field_name = 'showall'
                    current_classifyFieldName = current_selected_field_name
                    current_selected_field_value = 'showall'
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                    _classified_count_of_feature = -1

                  $('.field_name_class').removeClass('selected_style')
                  $('#fieldname_tag_-1').addClass('selected_style')

                  update_url_parameter('select_field', -1);
                  update_url_parameter('select_fieldvalue', -1);


                 
                  $('#value_list').html('');

                  
                  if (background_type == 'data'){
                    // classified data only,  
                            filter_featureLayerView()
                  } else if (background_type == 'image'){
                    // classified image only
                            filter_mapImageLayer()
                  }
                 
                  get_classified_count_zoom_to_feature()


                  }

                  function showAll_fieldvalue(){

                  // Do not make it empty, must keep current selected field
                  //current_selected_field_name = ''
                  //current_classifyFieldName = current_selected_field_name

                  current_selected_field_value = 'showall'
                  _classified_count_of_feature = -1

                  $('.field_value_class').removeClass('selected_style')
                  $('#fieldvalue_tag_-1').addClass('selected_style')

                  update_url_parameter('select_fieldvalue', -1);

                  if (background_type == 'data'){
                    // classified data only,  
                            filter_featureLayerView()
                  } else if (background_type == 'image'){
                    // classified image only
                            filter_mapImageLayer()
                  }
                  
                  get_classified_count_zoom_to_feature()


                  } 








                  
                  async function build_value_list(_fieldName, _field_name_tag_id){
                  

                            $('.field_name_class').removeClass('selected_style')
                            $('#fieldname_tag_' + _field_name_tag_id).addClass('selected_style')



                            current_selected_field_value = 'showall'
                            current_selected_field_value_tag_id = -2
                            current_selected_field_name = _fieldName
                            current_classifyFieldName = current_selected_field_name
                            current_selected_field_name_tag_id = _field_name_tag_id

                            update_url_parameter('select_field', _field_name_tag_id);
                            update_url_parameter('select_fieldvalue', -1);

                            var _fieldType = field_type[_fieldName]
          var ____fieldType_lowerCase  = _fieldType.toLowerCase();
                            /*
                            if (_fieldType){
                              //nothing to do
                            } else {
                              // field type could be undefined, by default, assign as string
                              _fieldType =  "esriFieldTypeString"
                            } 
                            */
                            console.log(' get distinct field value by field name and field type', _fieldName, _fieldType)

                            /*
                            field type  :  https://developers.arcgis.com/documentation/common-data-types/field.htm
                                                                            esriFieldTypeDate | 

                                                                            esriFieldTypeSingle | 
                                                                            esriFieldTypeInteger |
                                                                            esriFieldTypeSmallInteger | 
                                                                            esriFieldTypeDouble | 

                                                                            esriFieldTypeGeometry | 
                                                                            esriFieldTypeRaster |

                                                                            esriFieldTypeGlobalID | 
                                                                            esriFieldTypeGUID | 
                                                                            esriFieldTypeOID | 

                                                                            esriFieldTypeBlob |
                                                                            esriFieldTypeString | 
                                                                            esriFieldTypeXML
                                                                            
                            */

                            // ******************  unique value  ****************** 

                                                                        /*
                                                                            // returnDistinctValues  https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm


                                                                            returnDistinctValues = true, it returns distinct values based on the fields specified in outFields.

                                                                            *** *** warning *** ***

                                                                                                This parameter applies only if the supportsAdvancedQueries property of the layer is true. 

                                                                                                Most of time, Supports Advanced Queries:  false, will return by default 1000 record with duplicated value,

                                                                                                No matter wether distinct value or duplicated value, we all go through our process to remove duplicated value.


                                                                            *** *** end  **** *** warning *** *** 

                                                                            This parameter can be used with returnCountOnly to return the count of distinct values of subfields.
                                                                            // working example: https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/16/query?f=pjson&
                                                                                                            returnGeometry=false&
                                                                                                            returnCountOnly=false&
                                                                                                            returnDistinctValues=true&
                                                                                                            outFields=ZONE_&
                                                                                                            where=1=1


                                                                              Response:
                                                                                        {
                                                                                                                                  "displayFieldName": "ZONE_",
                                                                                                                                  "fieldAliases": {
                                                                                                                                    "ZONE_": "ZONE_"
                                                                                        },


                                                                                          "fields": [
                                                                                                                                    {
                                                                                                                                    "name": "ZONE_",
                                                                                                                                    "type": "esriFieldTypeString",
                                                                                                                                    "alias": "ZONE_",
                                                                                                                                    "length": 25
                                                                                                                                    }
                                                                                                    ],


                                                                                          "features": [
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "R1-F"
                                                                                                                                    }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "RM4"
                                                                                                                                    }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "PE"
                                                                                                                                    }
                                                                          */



                                                                            // always use returnDistinctValues=true,  
                                                                            //    in case of not support advanced query, not support distinct value, returnDistinctValues=true will NOT cause error, just ignore this value, 
                                                                            //    but will return first 100 to 1000 (limit), may not be a completed list, may missing some distinct value.
                                                                            //    only if support distinct value, will guarantee full complete list of distinct value.
                                                                            console.log( '_supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct ---->>>>---',  _supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct )


                                                                            

                            //  ======  ===== =======  group by  ======  ===== =======  

                                                                                                                        /*

                                                                                                                          This parameter is supported only on layers/tables that indicate supportsStatistics is true, means, "supportsAdvancedQueries": true, 
                                                                                                                          https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm
                                                                                                                          Warning:  both must used together, groupByFieldsForStatistics is valid only when the outStatistics parameter is used.
                                                                                                                                outStatistics, 
                                                                                                                                groupByFieldsForStatistics,
                                                                                                                                outStatistics =   [
                                                                                                                                                      {
                                                                                                                                                        "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                        "onStatisticField": "Field1", 
                                                                                                                                                        "outStatisticFieldName": "Out_Field_Name1"
                                                                                                                                                      },
                                                                                                                                                      {
                                                                                                                                                        "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                        "onStatisticField": "Field2",
                                                                                                                                                        "outStatisticFieldName": "Out_Field_Name2"
                                                                                                                                                      }  
                                                                                                                                                    ]
                                                                                                                      */
                                                                                                                                var _outStatistics = [
                                                                                                                                                        {
                                                                                                                                                          "statisticType": "count",
                                                                                                                                                          "onStatisticField": _fieldName,
                                                                                                                                                          "outStatisticFieldName": "count"
                                                                                                                                                        }
                                                                                                                                                      ]

                                                                                                                                // warning:  out statistics is object, not like other are string, you must convert object to string, then url encoded that string, before send to ajax                      
                                                                                                                                var stringified_outStatistics = JSON.stringify(_outStatistics)
                                                                                                                                var encoded_outStatistics =  encodeURIComponent(stringified_outStatistics)
                                                                                                                                console.log(' supports Statistics,  stringified out Statistics,   encoded out Statistics ==== ', _supportsStatistics, stringified_outStatistics, encoded_outStatistics)
                                                                                                                            
                                                                                                                            // _url_distinctFieldValue_groupby =  background_mapserver_url + '/'+  layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson&returnGeometry=false&returnCountOnly=false&where=1=1'
                                                                                                                            var _url_distinctFieldValue_groupby =  background_mapserver_url + '/'+  layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson'
                                                                                                                            
                                                                                                                            console.log( 'render 2ndTier url group by field/count %%%%%%  group by  %%%%%% ',  _url_distinctFieldValue_groupby)



                                                                                        /**/
                                                                                        //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                        /*
                                                                                            kowning issue for esri only: 
                                                                                            groupby does not work with 'null', always get null{0}, should be null{29} if use distinct, default200, click 'null' will populate it to  null{29}
                                                                                        */
                                                                                              var _where_is_null = encodeURIComponent(_fieldName) +  encodeURIComponent(" is null or ") + encodeURIComponent(_fieldName) + encodeURIComponent("=''") 
                                                                                              var _url_esri_groupby_null_fix =  background_mapserver_url + '/'+  layer_id + '/query?' + 'where=' + _where_is_null + '&returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson'
                                                                                              console.log('_url_esri_groupby_null_fix', _url_esri_groupby_null_fix)
                                                                                              var null_count = {  "count": 'count of empty(blank or null) field' } // default 
                                                                                              try {
                                                                                                     null_count = await ajax_try_jsonp_cors_proxy_return_json_object(_url_esri_groupby_null_fix)
                                                                                              } catch {
                                                                                                     null_count = {  "count": 'ajax error 404 failed to count empty(blank or null) field' }
                                                                                                     console.log('ajax error 404 when try get null_count', null_count)
                                                                                              }
                                                                                              /*
                                                                                                      {
                                                                                                        "count": 29
                                                                                                      }
                                                                                              */
                                                                                              console.log('null_count', null_count)
                                                                                              if (null_count.hasOwnProperty('error')){
                                                                                                    null_count = {  "count": 'arcgis server error failed to execute query when count empty(blank or null) field - ' + JSON.stringify(null_count.error) }
                                                                                              }

                                                                                        /**/
                                                                                        //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                        /**/



                                                                                                                            


                              //  ======  =====  end =======    group by  ======  ===== ======= 
                                                                                                                  /**/
                                                                                                                  // ======  ===== =======    distinct  ======  ===== =======  
                                                                                                                        var _url_distinctFieldValue_distinct =  background_mapserver_url + '/'+  layer_id + '/query?outFields=' + _fieldName + '&f=pjson&returnGeometry=false&returnCountOnly=false&returnDistinctValues=true&where=1=1'
                                                                                                                        console.log( 'render 2ndTier  url <<<<<<< distinct >>>>>>> FieldValue ........  ', _url_distinctFieldValue_distinct)
                                                                                                                  // ======  =====  end  =======    distinct  ======  ===== ======= 
                                                                                                                  /**/




                                                                                            var raw_distinctFieldValue
                                                                                            // url group-by
                                                                                            raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_groupby)

                                                                                            /*
                                                                                                    error: {code: 400, message: "Unable to complete operation.", details: []}
                                                                                                            code: 400
                                                                                                            details: []
                                                                                                            message: "Unable to complete operation."

                                                                                                  warning: 
                                                                                                  
                                                                                                            will error if use oracle spatial, instead of ESRI, even supportsAdvancedQueries,supportsStatistics = true  
                                                                                                            "outStatistics arcgis not working"   https://community.esri.com/t5/arcgis-enterprise-questions/outstatistics-return-unable-to-complete-operation/td-p/456011

                                                                                                            error sample:  all navigateLA 
                                                                                                            https://maps.lacity.org/arcgis/rest/services
                                                                                                            http://localhost:10/json2tree/esri/server/folder.html?url=https%3A%2F%2Fmaps.lacity.org%2Farcgis%2Frest%2Fservices&org=Los+Angeles+CA+navigateLA&_center_lat=34.02006286055584&_center_long=-118.41204261445893&_center_zoom=16&select_folder=22&select_layer=57

                                                                                              */ 
                                                                                              console.log('raw distinct Field Value ajax by Group-by ', raw_distinctFieldValue)







                                                                                              /**/
                                                                                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                                                                                              /**/
                                                                                                                    
                                                                                              if (raw_distinctFieldValue.error) {

                                                                                                          // groupby have error, only use distict
                                                                                                                        _distinct_or_groupby = 'distinct'
                                                                                                                        update_url_parameter('distinctorgroupby', 'distinct' )
                                                                                                                        _orderby_count_or_value = 'orderby_value'
                                                                                                                        update_url_parameter('orderbycountorvalue', 'orderby_value')

                                                                                                                        // enforce order by value
                                                                                                                        $('#orderby_value').attr('checked', true)
                                                                                                                        $('#orderby_count').removeAttr('checked')
                                                                                                                        //disable this radio 
                                                                                                                        $('input[name=orderby_radio]').attr("disabled",true);
                                                                                                              

                                                                                                                        // url distinct
                                                                                                                        raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_distinct)
                                                                                                                        
                                                                                              } else {

                                                                                                            // groupby works, do not use distict
                                                                                                            _distinct_or_groupby = 'groupby'
                                                                                                            update_url_parameter('distinctorgroupby', 'groupby' )

                                                                                                            /**/
                                                                                                            //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                                            /**/
                                                                                                                var features_array_null_fix = raw_distinctFieldValue.features 
                                                                                                                var _attributes_null_fix
                                                                                                                var __field_value_null_fix
                                                                                                                for (var n = 0; n < features_array_null_fix.length; n++) { 
                                                                                                                  _attributes_null_fix = features_array_null_fix[n].attributes
                                                                                                                  __field_value_null_fix = _attributes_null_fix[_fieldName]
                                                                                                                  if (__field_value_null_fix == null){
                                                                                                                    raw_distinctFieldValue.features[n]['attributes']['count'] = null_count['count']
                                                                                                                    break // for loop
                                                                                                                  }//if
                                                                                                                }//for
                                                                                                                console.log('raw_distinctFieldValue  * * * after null fix  * * *', raw_distinctFieldValue)

                                                                                                            /**/
                                                                                                            //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                                            /**/
                                                                                              }


                                                                                              /**/
                                                                                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                                                                                              /**/

              
                                                                                              console.log( ' {{{{{{{{{{  _distinct_or_groupby  }}}}}}}}}}', _distinct_or_groupby)      
                                                                                              console.log( ' {{{{{{{{{{  distinct field value  .....  raw un-sorted  ......  }}}}}}}}}}    ', raw_distinctFieldValue)



                                                                              var real_distinct_fieldvalue_array = []


                                                                        // not works,   because it generate object {}, instead of plain element
                                                                        // remove duplicate element from array, get a new array
                                                                        // var  real_distinct_fieldvalue_SET = new Set(distinctFieldValue)
                                                                        // real_distinct_fieldvalue_array = [ ... real_distinct_fieldvalue_SET]


                                                                        // mapserver raw response,  processing, { features: [ ....... ] }
                                                                        /*
                                                                        
                                                                            features: 
                                                                                        [
                                                                                          {
                                                                                            attributes: 
                                                                                                        {
                                                                                                          ZoneName: "Parks and Recreation", 
                                                                                                          count: 60
                                                                                                          }
                                                                                          }



                                                                                          {
                                                                                            attributes: {
                                                                                                            ZoneName: "Medium High Density Residential", 
                                                                                                            count: 83
                                                                                                          } 
                                                                                          }
                                                                                        ]
                                                                        */
                                                                                        if (raw_distinctFieldValue.features) {

                                                                                          if ( raw_distinctFieldValue.features.length > 0 ) {
            
            
                                                                                                      var features_array = raw_distinctFieldValue.features
                                                                                                      var _attributes
                                                                                                      var __field_value_
            
                                                                                                      for (var l = 0; l < features_array.length; l++) { 
            
                                                                                                              _attributes = features_array[l].attributes
                                                                                                              __field_value_ = _attributes[_fieldName]
            
            
                                                                                                            
                                                                                                            
                                                                                                            if (_distinct_or_groupby == 'groupby') {
            
                                                                                                                    //  ======  ===== =======  group by  ======  ===== ======= 
            
                                                                                                                                          //real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }   
                                                                                                                                                  // indexOf method in an object array https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array/38516944 
                                                                                                                                          _index_position = real_distinct_fieldvalue_array.map(function(e) { return e[_fieldName]; }).indexOf(__field_value_);
                                                                                                                                          if (_index_position == -1 ) {
                                                    
                                                                                                                                                    real_distinct_fieldvalue_array.push(_attributes)
            
            
                                                                                                                                          } else {
            
                                                                                                                                                // found duplicated value, nothing to do 
            
                                                                                                                                          }// if 
            
            
            
            
                                                                                                            } else if (_distinct_or_groupby == 'distinct'){
            
                                                                                                                    // ======  ===== =======    distinct  ======  ===== =======  
            
            
                                                                                                                                  // real distinct array element is string  : 'dog'
                                                                                                                                if  (real_distinct_fieldvalue_array.indexOf(__field_value_) == -1 ) {
                                                                                                                                        real_distinct_fieldvalue_array.push(__field_value_)
                                                                                                                                } else {
                                                                                                                                        // found duplicated value, nothing to do 
                                                                                                                                }// if 
            
                                                                                                                                          
            
            
            
            
                                                                                                            } // supports Statistics
            
            
            
            
            
            
            
                                                                                                      
                                                                                                      } // for
            
                                                                                      
                                                                                        
                                                                                        } // if raw.length > 0
                                                                                      } // if raw
            
                                                                                    console.log( '  before sort, unique value , real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
            


                              /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/
                                                                                    console.log( ' * * * * * *  _orderby_count_or_value  * * * * * * ',  _orderby_count_or_value)
                                                                                    console.log( ' * * * * * *  _distinct_or_groupby  * * * * * * ',  _distinct_or_groupby)

                                                                                    if (_orderby_count_or_value == 'orderby_count'){


                                                                                                if (_distinct_or_groupby == 'groupby'){
                                                                                                              //  ======  ===== =======  group by  ======  ===== ======= 
                                                                                                              /**/
                                                                                                                      //   ########      ########    sort by "count"  DESC  ########      ######## 
                                                                                                                      /**/  
                                                                                                                              // real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }
                                                                                                                              console.log( '  ********* sort ~~~~~~~ count DESCending ~~~~~~~   *********-> ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                
                                                                                                                              // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                              real_distinct_fieldvalue_array.sort(
                                                                                                                                                                    function(a, b) {
                                                                                                                                                                                                
                                                                                                                                                                                    // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                                    // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                                if ( parseFloat(a['count']) < parseFloat(b['count']) ){
                                                                                                                                                                                                  return 1;
                                                                                                                                                                                                }
                                                                                                                                                                                                if ( parseFloat(a['count']) > parseFloat(b['count']) ){
                                                                                                                                                                                                  return -1;
                                                                                                                                                                                                }
                                                                                                                                                                                                return 0;
                                                                                                                                                                                    }
                                                                                                                                                                  );
                                                                                                                              console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                      //   ########    end    ########     sort by "count"  DESC  ########      ######## 
                                                                                                  } else {
                                                                                                               // can not sort, nothing to do, do not sort, because order by count must have groupby working.
                                                                                                               console.log('can not sort, nothing to do, do not sort, because order by count must have groupby working.')
                                                                                                  }// groupby





            
                                                                                  } else if (_orderby_count_or_value == 'orderby_value'){

                                             
                                                                                                   if (_distinct_or_groupby == 'distinct'){
                                                                                                                    // only for g200, g100
                                                                                                                      // ======  ===== =======    distinct  ======  ===== =======
                                                                                                                      /**/ 
                                                                                                                                    //   ########    ########    sort by field value alphabetic  ~~~~~~~  distinct url only  ~~~~~~~    ########   ######## 
                                                                                                                                     /**/ 
                                                                                                                                            // sort array ascending  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            
                                                                                                                                            var ____fieldType_lowerCase  = _fieldType.toLowerCase(); 
            
                                                                                                                                            if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ) {
                                                                                                                                                                      
                                                                                                                                                                      // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                                                      real_distinct_fieldvalue_array.sort(
                                                                                                                                                                                                            function(a, b) {
                                                                                                                                                                                                                            return a - b;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                          );
            
                                                                                                                                            } else {
                                                                                                                                                                        // by default work on string, text, compare UTF-16, Unicode,  but not works on numeric number, expected output: Array [1, 100000, 21, 30, 4]
                                                                                                                                                                        real_distinct_fieldvalue_array.sort() 
                                                                                                                                            }
                                                                                                                                            console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                                    //   ########    end   ########    sort by field value alphabetic      ########   ######## 


                                                                                                    } else if (_distinct_or_groupby == 'groupby'){
                                                                                                                      // only for g400, g300, not for g430, g330

                                                                                                                      //   ########    ########    sort by field value alphabetic      ########   ######## 
                                                                                                                                console.log( '  ~~~~~~~  sort by field value alphabetic  ASCending ~~~~~~~  group by url only ~~~~~~~  ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                                            
                                                                                                                                // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                real_distinct_fieldvalue_array.sort(
                                                                                                                                                                      function(a, b) {
                                                                                                                                                                                                  
                                                                                                                                                                                      // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                                      // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                                  if ( a[_fieldName] < b[_fieldName] ){
                                                                                                                                                                                                    return -1;
                                                                                                                                                                                                  }
                                                                                                                                                                                                  if ( a[_fieldName] > b[_fieldName] ){
                                                                                                                                                                                                    return 1;
                                                                                                                                                                                                  }
                                                                                                                                                                                                  return 0;
                                                                                                                                                                                      }
                                                                                                                                                                    );
                                                                                                                                console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                      //   ########    end   ########    sort by field value alphabetic      ########   ######## 

                                                                                                    }// distinct



                                                                              } // supports Statistics
            
            
                              /**/
                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                              /**/




                            var value_html = '';
                            value_html += '<div>';
            
                            var _node_display_text 
                    var _node_groupBy_count = '' 

                            if (real_distinct_fieldvalue_array) {
                              if ( real_distinct_fieldvalue_array.length > 0 ) {
                                  
                                value_html += '<ol>';
                                value_html +=   '<a  id="fieldvalue_tag_-1" class="field_value_class" href="#">';
                                value_html +=    '<span style="font-size:24px; font-weight:700;">Show all</span>' 
                                value_html +=   '</a>';
                                value_html +=   ' {' + total_feature_count + '}'
                                    
                                    for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) { 


                                      var _this_field_value

                                      if (_distinct_or_groupby == 'groupby') {

                                              //  ======  ===== =======  group by  ======  ===== ======= 

                                              _node_display_text = real_distinct_fieldvalue_array[r][_fieldName] 
                                              _node_groupBy_count = ' {' + real_distinct_fieldvalue_array[r]['count'] + '}'
                                              _this_field_value = real_distinct_fieldvalue_array[r][_fieldName]

                                      } else if (_distinct_or_groupby == 'distinct'){

                                              // ======  ===== =======    distinct  ======  ===== ======= 
                                              
                                              _node_display_text = real_distinct_fieldvalue_array[r]
                                              _this_field_value = real_distinct_fieldvalue_array[r]

                                      
                                      } // supports Statistics



                                      value_html += '<li>' // css .ordered_list_number{ size font};
                                      //value_html +=   '<a id="fieldvalue_tag_' + r + '" class="field_value_class" href="#" onclick="filter_result(\'' + _this_field_value + '\', ' + r + ')">';
                                      value_html +=   '<a id="fieldvalue_tag_' + r + '" class="field_value_class" href="#"  data-field-value="' + _this_field_value +  '" data-tag-id="' + r +  '">';
                                      value_html +=    _node_display_text  
                                      value_html +=   '</a>';
                                      value_html +=   _node_groupBy_count;

                                      // . . . add filtered count  . . .
                                      value_html +=   '<span id="fieldvalue_count_' + r + '">' + '</span>';
                                      // . . . end  . . . add filtered count  . . .

                                      value_html += '</li>';
                                    }// for

                                    value_html += '</ol>';
                                    value_html +='</div>'
                                    $('#value_list').html(value_html);

                                    // event
                                    var _fieldvalue_tag_id
                                    for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) {                               
                                      _fieldvalue_tag_id = '#fieldvalue_tag_' + r
                                      $(_fieldvalue_tag_id).on('click', function(){
                                                                                filter_result($(this).data('field-value'), $(this).data('tag-id'))
                                                                        });
                                    }// for
                                    $("#fieldvalue_tag_-1").on('click', showAll_fieldvalue)


                              } else {
                                value_html +=  '<div style="font-size: 18px; font-weight: 100;">' + 'No Value Can Be Selected' +  '</div>' 
                                value_html +='</div>'
                                $('#value_list').html(value_html);

                              }//if  
                            }//if
                           
                            

                        // must enforce update map
                     // get_map_bound()

                  }

 							    /**/
                  //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                  /**/

                                          // for 0 only, from 430, add 'orderby' radio
                                          var _orderby_count_or_value = 'orderby_count'  // default,   'orderby_value' 
                                          

                                          // for 400,430, 0 only, hybrid groupby+distinct
                                          var _distinct_or_groupby = 'groupby'    // default,    "groupby" or "distinct"
                                          var _url_distinctFieldValue_distinct 
                                          var _url_distinctFieldValue_groupby

                                          // url have 2 cases, distinct or group-by
                                          var _url_distinctFieldValue  // for 100,200,300 only

                                          function orderby_count_or_value_change_handler(){

                                                      console.log( ' ------ * * * ------ * * *  _orderby_count_or_value  * * *  ------ * * *  ------',  _orderby_count_or_value)
                                                      console.log( '  ------* * *  ------ * * *  _distinct_or_groupby  * * * ------ * * *  ------',  _distinct_or_groupby)
                                                      console.log('orderby_count_or_value_change_handler,   current_selected_field_name, current_selected_field_name_tag_id  ',  current_selected_field_name, current_selected_field_name_tag_id)

                                                      if ((current_selected_field_name == 'showall') || (current_selected_field_name_tag_id < 0)){
                                                        console.log('you have not select any field name, change order-by does not make sense, does not do anything', )
                                                      } else {
                                                        build_value_list(current_selected_field_name, current_selected_field_name_tag_id)
                                                       
                                                      }
                                            

                                          }


                  /**/
                  //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                  /**/






              /**/
              //  ... ... .. ... order by field name  ... ... .. ... 
              /**/

                    // only for vertial embed
                    function create_field_html(fieldNameListArray){

                          var field_html = '';
                          // radio button  - - -  https://uiverse.io/Pradeepsaranbishnoi/bitter-rabbit-96
                          field_html += '<div class="radio-tile-container">'
                          field_html +=     '<div class="radio-tile-group">'
                          field_html +=          '<div style="font-size: 24px; font-weight: 900;">FilterBy</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' 


                          if (fieldNameListArray.length > 0) {
                                  // only for vertial embed                                  
                                  field_html +='<div class="radio-tile-input-container">'
                                  field_html += '<div class="radio-tile">'
                                  field_html +=   '<label id="fieldname_tag_-1" class="field_name_class radio-tile-label">';
                                  field_html +=       '<span style="font-size: 24px; font-weight: 900;">'  +  'No Filter'  + '</span>'
                                  field_html +=   '</label>'
                                  field_html += '</div>'
                                  field_html +='</div>'

                                  
                                  var i1 = 0
                                  for (var i = 0; i < fieldNameListArray.length; ++i) {
                                    i1 = i + 1   
                                    field_html +='<div class="radio-tile-input-container">'
                                    //field_html +=   '<span style="display:inline; font-size: 18px; font-weight: 100;">'  + '<sup>' + i1 +  '</sup>' + '</span>'

                                    field_html +=  '<div class="radio-tile">'
                                    field_html +=   '<label id="fieldname_tag_' + i + '" class="field_name_class  radio-tile-label" data-field-name="' + fieldNameListArray[i] +  '" data-fdnm-tagid=' + i +  '>';
                                    field_html +=     fieldNameListArray[i]
                                    field_html +=   '</label>';
                                    field_html += '</div>'
                                    field_html +='</div>'

                                      

                                  }// for

                                  //field_html += '</ol>';
                                  field_html +='</div></div></div>'

                                  $('#field_list').html(field_html);

                                  // event
                                    var _fieldName_tag_id
                                    for (var i = 0; i < fieldNameListArray.length; ++i) {                           
                                      _fieldName_tag_id = '#fieldname_tag_' + i
                                      $(_fieldName_tag_id).on('click', function(){
                                                                                   build_value_list($(this).data('field-name'), $(this).data('fdnm-tagid'))
                                                                                  });
                                    }// for
                                    $("#fieldname_tag_-1").on('click', showAll)


                          } else {
                            field_html +=  '<div style="font-size: 18px; font-weight: 100;">' + 'No Column Name or Field name, No Filter Can Be Select' +  '</div>' 
                            field_html +='</div>'
                            $('#field_list').html(field_html);
                          }//if
                          
                         
                          // user have not select any value, by default, show this message
                          $('#value_list').html('');
                    }


                    function build_field_list(){

                                                  console.log('orderby_fieldname', orderby_fieldname)

                                                  if (orderby_fieldname == 'orderby_fieldname_default'){
                                                          // default order
                                                          console.log('field_name', field_name)
                                                          create_field_html(field_name)

                                                  } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){

                                                          // sort field name alphabetic_ascending
                                                          field_name_order_by_alphabetic_ascending = structuredClone(field_name)
                                                          field_name_order_by_alphabetic_ascending.sort();
                                                          console.log('field_name_order_by_alphabetic_ascending',  field_name_order_by_alphabetic_ascending)
                                                          create_field_html(field_name_order_by_alphabetic_ascending)

                                                  } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){

                                                          // sort field name alphabetic descending
                                                          field_name_order_by_alphabetic_descending = structuredClone(field_name)
                                                          field_name_order_by_alphabetic_descending.sort();
                                                          field_name_order_by_alphabetic_descending.reverse()
                                                          console.log('field_name_order_by_alphabetic_descending', field_name_order_by_alphabetic_descending)
                                                          create_field_html(field_name_order_by_alphabetic_descending)
                                                  }

                    }
                  

              /**/
              //  ... end ... ... .. ... order by field name  ... ... .. ...
              /**/







      /**/
      // ==========  end   ==========  classified  ========== 
      /**/

   












        // ++++++++++++++++  ++++++++++++++++ classified only  ++++++++++++++++  ++++++++++++++++  ++++++++++++++++ 
                    /**/

                              // . . . add filtered count  . . .
                              function update_value_list_tag_count(_tagId, _filteredTotal){

                                console.log(' ++ ++ ++ update value list tag count ++ ++ ++ ++ ++ ', _tagId, _filteredTotal)
                                var _filtered_count_tagId = '#fieldvalue_count_' + _tagId
                                if ($(_filtered_count_tagId).html()){
                                      // already has something, nothing to do
                                } else {
                                       // null, need add filtered count
                                       $(_filtered_count_tagId).html(' {~' + _filteredTotal + '~}')
                                }

                              }

                              // . . . end  . . . add filtered count  . . .
                              /**/

                              
                  
                              // classified only
                              function display_count_info(_subject, ___all_cnt,  ____classified_cnt){

                              //  ------  ---------  ------ 3 ---------  ------  --------- 

                              var _percentage_html3 = ''
                              var _percentage_float3, _percentage_integer3, _percentage_decimal3;

                                if ((____classified_cnt > 0) && ( ___all_cnt> 0)) {
                                   //_percentage3 = ((100 * ____classified_cnt) / ___all_cnt).toFixed(3)
                                   _percentage_float3 = (100 * ____classified_cnt) / ___all_cnt
                                   _percentage_integer3 = Math.floor(_percentage_float3);
                                   _percentage_decimal3 = (_percentage_float3.toFixed(3)).split(".")[1]

                                    document.getElementById('percent').innerHTML = _percentage_integer3 +  '.'  +  _percentage_decimal3 + '%' 
                                    //document.getElementById('feature-on-map').innerHTML =   
                                    document.getElementById('filter-total').innerHTML = ____classified_cnt  
                                
                                } else {
                                  document.getElementById('percent').innerHTML = '...%'
                                  //document.getElementById('feature-on-map').innerHTML = '...'
                                  document.getElementById('filter-total').innerHTML = '...'
                                }


                              }


                              function filter_result(____current___selected___field___value, _field_value_tag_id){
                             
                                $('.field_value_class').removeClass('selected_style')
                                $('#fieldvalue_tag_' + _field_value_tag_id).addClass('selected_style')
      
      
                                current_selected_field_value = ____current___selected___field___value
                                /**/
                                // . . . add filtered count  . . .
                                current_selected_field_value_tag_id = _field_value_tag_id
                                // . . . end  . . . add filtered count  . . .
                                /**/
      
                                console.log(" now filter by  (current selected field name =  current selected field value ) : ", current_selected_field_name,   current_selected_field_value )
      
                                update_url_parameter('select_fieldvalue', _field_value_tag_id);

                                if (background_type == 'data'){
                                  // classified data only,  
                                          filter_featureLayerView()
                                } else if (background_type == 'image'){
                                  // classified image only
                                          filter_mapImageLayer()
                                }
                                
                                get_classified_count_zoom_to_feature()
                              }




                             // classified image only, Filter feature using map image layer
                             function filter_mapImageLayer(){
                              /*
                                 Filter feature using map image layer, using a definitionExpression in order to filter a sublayer by attribute
                                   https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/filter-feature-using-map-image-layer/td-p/1062407
                                   https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-definitionexpression/
                              */

                                   console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )
                                   var mapImageLayer_sublayer_definitionExpression = ''
                                   if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

             


                                            mapImageLayer_sublayer_definitionExpression = ''
                                   } else {

                                                if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                                  mapImageLayer_sublayer_definitionExpression = current_selected_field_name + ' is null'  //"STATE_NAME is null ";
                                                } else{

                                                  // by default  where condition think it is string
                                                  mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                    
                                                  // string
                                                  if (_feature_attributes_string.includes(current_selected_field_name)){  
                                                    mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                  }
                                                  
                                                  // number (integer, double,)
                                                  if (_feature_attributes_integer.includes(current_selected_field_name)){
                                                    mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                                  }

                                                  // date 
                                                  if (_feature_attributes_date.includes(current_selected_field_name)){
                                                    // need to handle date type, so far by default use string, may not work
                                                    console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                                  }

                                                } // null 
                                   }

                                   
                                          console.log('mapImageLayer_sublayer_definitionExpression  :   ',  mapImageLayer_sublayer_definitionExpression)
                                          mapimagerlayer_sub_layer.definitionExpression = mapImageLayer_sublayer_definitionExpression;
                                 
                            }


                           // classified data only,  
                             function filter_featureLayerView(){

                              console.log('filter map Image Layer, use its sublayer, by field name, field value', current_selected_field_name, current_selected_field_value )

                                let featureLayerView_filter_where = ''
                                //   *****  classified , filter by     ***** 
                                // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                                //if ((current_selected_field_name) && (current_selected_field_value)){
                                if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

              


                                          // any showall means no filter, no search parameter
                                          featureLayerView_filter_where = '1=1'    
                                } else {
                                          
                                          //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                                          if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                            featureLayerView_filter_where =   current_selected_field_name + ' is null'  //"STATE_NAME is null ";
                                          } else{

                                                      // by default  where condition think it is string
                                                      featureLayerView_filter_where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                      
                                                      // string
                                                      if (_feature_attributes_string.includes(current_selected_field_name)){  
                                                        featureLayerView_filter_where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                      }
                                                      
                                                      // number (integer, double,)
                                                      if (_feature_attributes_integer.includes(current_selected_field_name)){
                                                        featureLayerView_filter_where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                                      }

                                                      // date 
                                                      if (_feature_attributes_date.includes(current_selected_field_name)){
                                                        // need to handle date type, so far by default use string, may not work
                                                        console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                                      }


                                          } // null 
                                          console.log('classified query where clause is: ', featureLayerView_filter_where )
                                }

                                if (backgroundFeatureLayer_layerView){
                                      backgroundFeatureLayer_layerView.filter = { where : featureLayerView_filter_where} 
                                } 
                                 
        
                            }
                              
        

                    // ++++++++++++++++  end ++++++++++++++++ classified only  ++++++++++++++++  ++++++++++++++++  ++++++++++++++++ 







      // .. - .. - ... zoom 2 feature   ... - .. - ..
      function get_classified_count_zoom_to_feature(){

        console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )

        let classified_query = backgroundFeatureLayer.createQuery();
        // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
        //if ((current_selected_field_name) && (current_selected_field_value)){
        if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

              /**/
              // . . . add filtered count  . . .
                  if ((current_selected_field_name == 'showall')){
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                  }
                  if ((current_selected_field_value == 'showall')){
                    current_selected_field_value_tag_id = -2
                  }
              // . . . end  . . . add filtered count  . . .
              /**/


                    // any showall means no filter, no search parameter
                    _classified_count_of_feature = -1
                    display_count_info(_layer, total_feature_count, _classified_count_of_feature)
                   
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

            backgroundFeatureLayer.queryFeatureCount(classified_query)
            .then(function(numFeatures){
              // prints the total count to the console
              console.log(' -- -- **  ** classified count of feature -- -- **  ** ', numFeatures)
              _classified_count_of_feature = numFeatures
              console.log(' -- -- **  ** classified count of feature -- -- **  ** ', _classified_count_of_feature )

              // . . . add filtered count  . . .
              update_value_list_tag_count(current_selected_field_value_tag_id, _classified_count_of_feature)
              // . . . end  . . . add filtered count  . . .

              display_count_info(_layer, total_feature_count, _classified_count_of_feature)
              
            }).catch((error) => {
              console.log(' **  ** query last feature of classified return count failed **  ** ', error);                                        
            }); 




            // zoom to feature
            if (zoom2feature_yesNo == 'donot_zoom2feature'){

              // do not zoom, but still need to query filtered result currently showing on map, by trigger pan or zoom at same location, when map stationary, will calculate filtered feature on map 
              view.goTo({
                         target: view.center,
                         zoom: view.zoom,
                        });


            } else { 
              // zoom to feature by query feature layer, then get extent of the query result( not use), instead zoom to first feature result.

              let classified_1st_feature_query = backgroundFeatureLayer.createQuery();

              // query param:  https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#properties-summary
              classified_1st_feature_query.returnGeometry = true;  // only need geometry

               /*  
                              Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                              https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                              without use them, must use "where 1=1" will return max number of return count
                              if use "num" and "start", then do not use "where 1=1"

                              num:1,
                              start:0,
                          */
              //classified_1st_feature_query.num = 1;  // do not use.

              classified_1st_feature_query.outFields = ['*'];  // no need attribute, but for console log,keep it. 

              //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
              if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                classified_1st_feature_query.where =   current_selected_field_name + ' is null'  //"STATE_NAME is null ";
              } else{ 

                        // by default  where condition think it is string
                        classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                        // string
                        if (_feature_attributes_string.includes(current_selected_field_name)){ 
                                  classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                        }
                                                      
                        // number (integer, double,)
                        if (_feature_attributes_integer.includes(current_selected_field_name)){
                          classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                        }

                        // date 
                        if (_feature_attributes_date.includes(current_selected_field_name)){
                          // need to handle date type, so far by default use string, may not work
                          console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                        }

              } // null         
              
              console.log('classified 1st feature query where clause is: ', classified_1st_feature_query.where )

              backgroundFeatureLayer.queryFeatures(classified_1st_feature_query)
                .then(function(results){


                  console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                  // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                  var found_1_valid_geometry = false
                  for (let i = 0; i < results.features.length; i++) {
                        if (results.features[i].geometry){
                            console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                            found_1_valid_geometry = true

                            // polygon, line works fine, but point, would not zoom to point (closer), is because for point,geometry,extent is null. However polygon's geometry's extent have value. 
                            console.log('(point, extent is null) (polygon or line, extent has somevalue) test 1st geometry, type, and extent  :   ', results.features[i].geometry.type, results.features[i].geometry.extent  )
                            

                            
                                                    view.goTo(results.features[i].geometry).then(function(goto_results){

                              
                              



                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                  
                                                                                console.log('- -- - zoom now - -- -  no more than - -- -   ', view.zoom, zoom2feature_noMoreThan)
                                                                                if (view.zoom > zoom2feature_noMoreThan ){
                                                                                    // view zoom https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
                                                                                    view.goTo({
                                                                                      target: view.center,
                                                                                      zoom: zoom2feature_noMoreThan
                                                                                    });
                                                                                }//if

                                                                                // fix for ( point is always has null extent), enforce to zoom to level 20 (zoom2feature_noMoreThan)
                                                                                if (results.features[i].geometry.type == 'point'){
                                                                                  view.goTo({
                                                                                    target: view.center,
                                                                                    zoom: zoom2feature_noMoreThan
                                                                                  });
                                                                                } 

                                                                        } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                    
                                                                                                console.log(' - -- -  zoom now - -- -  fix at - -- -   ', view.zoom, zoom2feature_zoomLevel)
                                                                                                view.goTo({
                                                                                                  target: view.center,
                                                                                                  zoom: zoom2feature_zoomLevel
                                                                                                });
                                                                        }//if
                                                                })// view goto
                                                                .catch((error) => {
                                                                  console.log('-- -- go to classified 1st valid feature failed -- -- ', error);                                        
                                                                }); // view goto

                            break; // break for loop
                        }
                  }//for 
                  if (! found_1_valid_geometry){
                        console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                        // goto full extent, always works
                        view.goTo(results.features).then(function(goto_results){

                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                  
                                                                                console.log('- -- - zoom now - -- -  no more than - -- -   ', view.zoom, zoom2feature_noMoreThan)
                                                                                if (view.zoom > zoom2feature_noMoreThan ){
                                                                                    // view zoom https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
                                                                                    view.goTo({
                                                                                      target: view.center,
                                                                                      zoom: zoom2feature_noMoreThan
                                                                                    });
                                                                                }//if

                                                                        } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                    
                                                                                                console.log(' - -- -  zoom now - -- -  fix at - -- -   ', view.zoom, zoom2feature_zoomLevel)
                                                                                                view.goTo({
                                                                                                  target: view.center,
                                                                                                  zoom: zoom2feature_zoomLevel
                                                                                                });
                                                                        }//if
                                                                })// view goto
                                                                .catch((error) => {
                                                                  console.log('-- -- go to classified 1st valid feature failed -- -- ', error);                                        
                                                                }); // view goto
                  }//if


                }).catch((error) => {
                  console.log('-- -- query classified 1st valid feature failed -- -- ', error);                                        
                }); 
            }// zoom to feature



        } //if name




      }  
     //   ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 





 /**/
 // ****** pre select by url param  ****** 
      
            var _first_time_load_for_field = true;
            var _first_time_load_for_fieldvalue = true;
            var selected_fieldLevel_id;
            async function  pre_select_field_level(){
                    var _rightnow_url_params
                    if (_first_time_load_for_field) {

                      // only run 1 time, 1st time, get original url param from init global variable function
                       _rightnow_url_params = urlParams
                       _first_time_load_for_field = false

                    } else {
                        //  re-create instance of url params
                         _rightnow_url_params = new URLSearchParams(window.location.search);

                    }  
                            selected_fieldLevel_id = _rightnow_url_params.get('select_field');                                                  
                            console.log('selected_field_id',  selected_fieldLevel_id)
                            if ((selected_fieldLevel_id == undefined) || (selected_fieldLevel_id == null) || (selected_fieldLevel_id == '')){
                                // select folder is null, undefined, nothing to select
                            } else if (selected_fieldLevel_id == -1){

                                  showAll()
                            
                            } else {

                                  var selected_fieldname = $('#fieldname_tag_' + selected_fieldLevel_id).text()
                                  //var _fieldNameWithAlias = $('#fieldname_tag_' + selected_fieldLevel_id).text()
                                  //var selected_fieldname = _fieldNameWithAlias.slice(0,_fieldNameWithAlias.indexOf(' {'))

                                  console.log('pre select field by ',  selected_fieldname,  selected_fieldLevel_id)
                                  await build_value_list(selected_fieldname,  selected_fieldLevel_id)
                                  pre_select_fieldvalue_level()
                            }
            }

            var selected_fieldvalueLevel_id;
            function  pre_select_fieldvalue_level(){


                                  var _rightnow_url_params

                                  if (_first_time_load_for_fieldvalue) {

                                    // only run 1 time, 1st time, get original url param from init global variable function
                                    _rightnow_url_params = urlParams
                                    _first_time_load_for_fieldvalue = false

                                  } else {
                                      //  re-create instance of url params
                                      _rightnow_url_params = new URLSearchParams(window.location.search);

                                  }    



                                selected_fieldvalueLevel_id = _rightnow_url_params.get('select_fieldvalue');

                                
                                
                                console.log('selected_fieldvalue_id',  selected_fieldvalueLevel_id)

    
                                // -1 means show all, do nothing
                                if ((selected_fieldvalueLevel_id == undefined) || (selected_fieldvalueLevel_id == null) || (selected_fieldvalueLevel_id == '')){
    
                                    // select layer is null, undefined, nothing to select
                                } else if (selected_fieldvalueLevel_id == -1){

                                    showAll_fieldvalue()

                                } else {
    
    
                                    var selected_fieldvalue = $('#fieldvalue_tag_' + selected_fieldvalueLevel_id).text()
                                    selected_fieldvalue = selected_fieldvalue.split('{')[0]
                                    selected_fieldvalue = selected_fieldvalue.trim()
                                    console.log('pre select field value by selected fieldvalue',  selected_fieldvalue)
                                    console.log('pre select field value by selected fieldvalueLevel id',   selected_fieldvalueLevel_id)
                                    filter_result(selected_fieldvalue, selected_fieldvalueLevel_id)
    
                                }



            }

// ******  end   ******  pre select by url param  ****** 
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

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

        build_field_list()    
        
        
        /**/
        // -- -- -- mapimagelayer serverside label  -- -- -- 
        /**/

        init_label()

                /**/
                //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 
                /**/

                                                       
        init_user_interface_event()
                          
        update_layer_name(background_layer_url, _layer)         
                          
        pre_select_field_level()        
                          
      } // dom ready


              




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
                  
            

            }




            




          function init_user_interface_event(){

           
                
 			       
          /**/
          // -- -- -- label and color  -- -- -- 
          if (param_polygonFillBy){
            polygonFillBy = param_polygonFillBy
          }
          // first time set radio
          $("input[type=radio][name=polygonFillBy_radio][value=" + polygonFillBy + "]").prop('checked', true);
          

          // radio change event
          $("input[type='radio'][name='polygonFillBy_radio']").change(function(){
            polygonFillBy = $("input[type='radio'][name='polygonFillBy_radio']:checked").val();
            console.log(" polygonFillBy : --  ", polygonFillBy);
            update_url_parameter('polygonFillBy', polygonFillBy);

            enforce_yellow_linepointpolygon(backgroundMapImageLayer)
          });






  //. . . end  . . . -- -- -- label and color  -- -- -- 
  /**/
                




                /**/
                    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                    /**/

                          // nested function
                          function zoom2feature_change_handler(){
                                  
                            if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').attr('checked', true)
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              

                            } 
                            
                            if (zoom2feature_yesNo == 'donot_zoom2feature'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').attr('checked', true)
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              
                            }

                            if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').attr('checked', true)
                              
                              
                            }
                        
                            $('#zoom_to_no_more_than').val(zoom2feature_noMoreThan)
                            $('#zoom_to_no_more_than_label').text(zoom2feature_noMoreThan)
                            $('#zoom_to_range').val(zoom2feature_zoomLevel)
                            $('#zoom_to_label').text(zoom2feature_zoomLevel)
                    }

                    // first time init run 1 time only
                    zoom2feature_change_handler()


                    // event
                    $('input[type=radio][name=zoom2feature_radio]').on('change', function() {
                              zoom2feature_yesNo = $(this).val()
                              zoom2feature_change_handler()
                              update_url_parameter('zoom2feature_yesNo', zoom2feature_yesNo)
                    });

                    $('#zoom_to_no_more_than').on('change', function() {
                                zoom2feature_noMoreThan =  parseInt($(this).val())
                                $('#zoom_to_no_more_than_label').text(zoom2feature_noMoreThan)
                                update_url_parameter('zoom2feature_noMoreThan', zoom2feature_noMoreThan)
                    });

                    $('#zoom_to_range').on('change', function() {
                              zoom2feature_zoomLevel =  parseInt($(this).val())
                              $('#zoom_to_label').text(zoom2feature_zoomLevel)
                              update_url_parameter('zoom2feature_zoomLevel', zoom2feature_zoomLevel)
                    }); 


              /**/
              //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
              /**/







 							                /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/

                                   // first time,  init 
                                   if (_orderby_count_or_value == 'orderby_count'){
                                    $('#orderby_count').attr('checked', true)
                                    $('#orderby_value').removeAttr('checked')
                                  } else if (_orderby_count_or_value == 'orderby_value'){
                                    $('#orderby_value').attr('checked', true)
                                    $('#orderby_count').removeAttr('checked')
                                  } else {
                                    $('#orderby_value').removeAttr('checked')
                                    $('#orderby_count').removeAttr('checked')
                                  }

                                  // event
                                  $('input[type=radio][name=orderby_radio]').on('change', function() {
                                    _orderby_count_or_value = $(this).val()
                                    orderby_count_or_value_change_handler()
                                    update_url_parameter('orderbycountorvalue', _orderby_count_or_value)
                                  });


                            /**/
                            //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                            /**/








                  /**/
                  //  ... ... .. ... order by field name  ... ... .. ... 
                  /**/

                        // first time,  init 
                        if (orderby_fieldname == 'orderby_fieldname_default'){
                          $('#orderby_fieldname_default').attr('checked', true)
                          $('#orderby_fieldname_alphabetic_ascending').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_descending').removeAttr('checked')
                        } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){
                          $('#orderby_fieldname_default').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_ascending').attr('checked', true)
                          $('#orderby_fieldname_alphabetic_descending').removeAttr('checked')
                        } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){
                          $('#orderby_fieldname_default').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_ascending').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_descending').attr('checked', true)
                        }

                        // event
                        $('input[type=radio][name=orderby_fieldname_radio]').on('change', function() {
                          orderby_fieldname = $(this).val()
                          showAll()
                          build_field_list()
                          update_url_parameter('orderbyfieldname', orderby_fieldname)
                        });



                  /**/
                  //  ... end ... ... .. ... order by field name  ... ... .. ...
                  /**/







              }





                 


          

               /**/
              // -- -- -- vertial adjustment  -- -- -- 



              
              

              function show_info_outline_Tab(___properties){
                console.log('show info window  properties : ', ___properties )

                
                // show object json string 
                //$('#info-window-div').html(JSON.stringify(___properties))

                
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
                // -- -- -- mapimagelayer serverside label  -- -- -- 
                /**/



                function init_label(){

                  if (param_dynamicLabel){
                            current_dynamicLabel = param_dynamicLabel
                            current_classifyFieldName = current_dynamicLabel
                          }
                
                  // -- -- -- mapimagelayer serverside label  -- -- -- 
                  init_dynamic_label(_featurelayerJSON)
                  //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 


                } 


                // only for single layer 
                function change_label_handler(_labelAs_fieldName){


                   
                 
                  console.log(' dynamicLabel_eachField_radio ,  change to ', _labelAs_fieldName)
                  
                 
                  // bug fix, for all movable box, must explicitly add 'checked=checked' attribute to the labelAsRadioTag, also remove 'checked' from all other  labelAsRadioTag
                  // only for single layer 
                  $('input[type=radio][name=dynamicLabel_eachField_radio]').removeAttr('checked')
                  $('#'+_labelAs_fieldName).attr('checked', true)




                  if (_labelAs_fieldName == 'nolabel'){

                    backgroundMapImageLayer.sublayers.items[0].labelsVisible = false 

                  } else {

                    bglayer_labelExpression = "$feature." + _labelAs_fieldName
                    bglayer_labelExpression_MapImage = '[' + _labelAs_fieldName + ']'

                    bglayer_labelClass = new LabelClass({
                            //  MapImageLayer can use both labelExpression and labelExpressionInfo(support Arcade)
                            //  FeatureLayer can only use labelExpressionInfo(must support Arcade)  https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LabelClass.html#labelExpression
                            
                            //labelExpressionInfo: { expression: bglayer_labelExpression }, // only if MapImageLayer support Arcade
                            labelExpression: bglayer_labelExpression_MapImage,              // does not matter support Arcade or not

                            symbol: {
                              type: "text",  // autocasts as new TextSymbol()
                              color: bglayer_labelColor,
                              haloSize: 1.5,
                              haloColor: "white",
                              font: { family: "Arial Unicode MS", size: bglayer_labelFontSize, weight: "bold" },
                            }
                    });

                    backgroundMapImageLayer.sublayers.items[0].labelingInfo = bglayer_labelClass
                    backgroundMapImageLayer.sublayers.items[0].labelsVisible = true        
                                

                  }//if


                  update_url_parameter('dynamicLabelField', _labelAs_fieldName)

                 
                 
                
                }

                                      
              

              // only for horizontal row flex, not for vertical layout
              function init_dynamic_label(___feature_layer_full_JSON){

               

                if (___feature_layer_full_JSON.geometryType){
                     current_geometryType = ___feature_layer_full_JSON.geometryType
                } else {
                     current_geometryType = ''
                }
                



               // ---------- build label as field ---- radio ---- event -----------

               /**/
                              // warning:  .fields can be null, if layer is only raster image  
                              if (___feature_layer_full_JSON.fields) {

                                            var _fields_array = ___feature_layer_full_JSON.fields

                                            var _dynamicLabel_html =  '' 
                                              

                                 // radio button  - - -  https://uiverse.io/Pradeepsaranbishnoi/bitter-rabbit-96
                                        _dynamicLabel_html += '<div class="radio-tile-container">'

                                         _dynamicLabel_html +=     '<div class="simple-radio-tile-group">'

                                        _dynamicLabel_html +=          '<div style="font-size: 18px; font-weight: 900;">LabelBy</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' 
                                            /**/
                                            // ##  'no label' radio ## 
                                            _dynamicLabel_html +=    '<label class="simple-radio-button-label">'
                                            if (current_dynamicLabel == 'nolabel') {
                                                      // checked
                                                      _dynamicLabel_html +=       '<input  class="simple-radio-button" type="radio" value="' + 'nolabel' + '" name="dynamicLabel_eachField_radio" id="' + 'nolabel' + '" checked/>'
                                            } else {
                                                      // un-checked
                                                      _dynamicLabel_html +=       '<input  class="simple-radio-button" type="radio" value="' + 'nolabel' + '" name="dynamicLabel_eachField_radio" id="' + 'nolabel' + '"/>'
                                            }

                                            _dynamicLabel_html +=     '<span class="simple-radio-button-span">' + '&nbsp;'  + 'NoLabel' + '&nbsp;' + '</span>' 

                                            _dynamicLabel_html +=  '</label>'
                                            _dynamicLabel_html +=  '&nbsp;&nbsp;&nbsp;'
                                            // ## end ##  'no label' radio ## 
                                            /**/
                                             



                                            // other field radio 
                                            var i1 = 0
                                            for (var i = 0; i < _fields_array.length; i++) {
                                              i1 = i + 1            
                                                          var ____fieldDisplayName = _fields_array[i].alias             
                                                          var ____fieldType = _fields_array[i].type
                                                          var ____fieldName = _fields_array[i].name
                                                        
                                                      
                                                          _dynamicLabel_html +=    '<label class="simple-radio-button-label">'
                                                          if (current_dynamicLabel == ____fieldName) {
                                                                  // checked
                                                                  _dynamicLabel_html +=       '<input class="simple-radio-button" type="radio" value="' + ____fieldName  + '" name="dynamicLabel_eachField_radio" id="radio_'  + i1 + '_' + ____fieldName + '"  checked />'
                                                          } else {
                                                                  // un-checked
                                                                  _dynamicLabel_html +=       '<input class="simple-radio-button" type="radio" value="' + ____fieldName  + '" name="dynamicLabel_eachField_radio" id="radio_'  + i1 + '_' + ____fieldName + '"/>'
                                                          }
                                                          
                                                          _dynamicLabel_html +=       '<span class="simple-radio-button-span" id="label_' + i1 + '_' + ____fieldName + '">' + '&nbsp;' + '<sup style="font-size: 8px;">' + i1 +  '</sup>'  + ____fieldName  + '&nbsp;'  + '</span>' 
                                                          
                                                         // _dynamicLabel_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>'

                                                           _dynamicLabel_html +=  '</label>'
                                                           _dynamicLabel_html +=  '&nbsp;&nbsp;&nbsp;'
                                                       


                                            }//for   
                                            
                                           _dynamicLabel_html +=     '</div>' // for radio-tile-group
                                           _dynamicLabel_html +=  '</div>' // for radio-tile-container

                                           
                                            var _dynamiclabel_div_tag = document.getElementById("dynamic-label")
                                            _dynamiclabel_div_tag.innerHTML = _dynamicLabel_html


                                            // only for existing static html tag "dynamic-label", if html tag is dynamic added, do not use this method
                                            $('input[type=radio][name=dynamicLabel_eachField_radio]').on('change', function() {
                                                    current_dynamicLabel = $(this).val()
                                                    current_classifyFieldName = current_dynamicLabel
                                                    change_label_handler(current_dynamicLabel)
                                            });




                                      
                                }//if  



                     //  ----------- end  ---------- build label as field ---- radio ---- event -----------




                     /**/
                      // first time set radio
                      $("input[type=radio][name=dynamicLabel_eachField_radio][value=" + current_dynamicLabel + "]").prop('checked', true);    
                     // first time load, run one time, label as url parameter, current_dynamicLabel indicated. 
                     change_label_handler(current_dynamicLabel)



                    }//function


        /**/
        //  -- -- --  end  -- -- -- mapimagelayer serverside label  -- -- -- 
        /**/









               /**/
      //==========================  renderer =================================================
      /**/





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



                      // for map image layer, geojsonlayer, featurelayer, 
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



        /**/
        //========================== end ======== renderer =================================================
        /**/




              // -- -- -- vertial adjustment  -- -- -- 
              /**/




              
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
         

 

  // ************* view hover hittest  ************************
  
  view.when(function(){
            
                // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                if (zoom_to_1st_feature){
                                            // only zoom 1 time, first time, never zoom again
                                            zoom_to_1st_feature = false; 
                                            //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                            pan_to_real_location()
                }//if   
                  
      })
      .then(function() {
        return backgroundFeatureLayer.when();
      })
      .then(function(layer) {
               
  })
 

// ************* end *************  view hover hittest  ************************








            
}); // require, everything should be inside







