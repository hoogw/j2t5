
         

              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer  
                         
            
             
              var objectId; // must be global var, otherwise, highlight will not work when multiple layers



             




                              /**/
                              // ----- color style setting ----- 
                              /**/ 
                              var native_renderer
                              var symbolType_radioValue = 'native'
 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  


                              
           
 



              // any document ready function is in here
              dom_ready_dojo();

              // component
            
              //self-run
              (async function init_map_component_event(){  //  --- esri manual drawing circle   ---  


                // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
                arcgisMap = document.querySelector("arcgis-map")
                arcgisMap.center = [_center_long, _center_lat]
                arcgisMap.zoom = _center_zoom

                

                // component // reactive Utils . watch (
                arcgisMap.addEventListener("arcgisViewChange", (event) => {


                  console.log('arcgis View Change event',  event)
                  update_center_latLngZoom_esri_component(arcgisMap)

                          /**/
                          //  --- esri manual drawing circle   --- 
                          /**/

                          manually_adjust_max_radius()

                          /**/
                          //  --- end  ---  esri manual drawing circle    --- 
                          /**/

                              
                  if (layerView){
                    layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: arcgisMap.extent,  // for component 

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


                }); 

                // component // view . when 
                arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {


                  

                  createFeatureLayer()
                  init_feature_layer_view()

                  // must place after  createa feature layer, other wise view is not ready, will cause error
                  init_view_ui()
                  // if don't want google map, just delete this line
                  init_base_map_radio() 
                              
                              // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                              // pan to real location is inside function of create feature layer, at last
                              
                  
                  

                  

                          /**/
                          //  - - - esri poi  - - - 
                          /**/
                          console.log('a r c g i s M a p  - v i e w    is     r e a d y', arcgisMap.extent.height)
                          init_poi_graphic_layer() 
                          
                          // 1 time 1st time run, when v i e w    is    r e a d y
                          manually_adjust_max_radius() 

                          /**/
                          //  - - -  end  - - -    esri poi    - - - 
                          /**/



                })

             })();
            

              


             




               // component
               function init_view_ui(){
              
                

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
                                                  backgroundFeatureLayer.opacity = groundoverlay_opacity
                            });
                            // ... end ... opacity




                   


              }// init ui





                       
  


          
          
          var layerView
          
          // component
          async function createFeatureLayer(){
          


            if (backgroundFeatureLayer){
            } else {
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url,
                      outFields: "*",
                      opacity: groundoverlay_opacity,
                    });
            }


           
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info_vertical(current_feature_rendered , total_feature_count)

            });

              arcgisMap.map.add(backgroundFeatureLayer)

              layerView = await arcgisMap.whenLayerView(backgroundFeatureLayer);

             
              

               // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = backgroundFeatureLayer.renderer.clone();
                }
               

                // enforce use yellow square for point, yellow line, yellow polygon
                // must be here after featurelayer fully loaded
                enforce_yellow_linepointpolygon(backgroundFeatureLayer)





                console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                  if (zoom_to_1st_feature){
                                              // only zoom 1 time, first time, never zoom again
                                              zoom_to_1st_feature = false; 
                                              //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                              pan_to_real_location()
                  }//if  
          } 







  
  
  


                               






      // only for :  single layer,  click_or_hover     
      var graphic_object_indexAsKey = {} 
      // component 
     // component must use e v e n t .  d e t a i l
     async function init_feature_layer_view(){

        // component // view . on ( " click " , function(event){
        arcgisMap.addEventListener("arcgisViewClick", (event) => {
          console.log(' view * click * fire 1 time is fine ', event)


           /**/
           //  - - - esri poi  - - - 
           /**/

        
           var click_lng = event.detail.mapPoint.longitude;
           var click_lat = event.detail.mapPoint.latitude
           console.log(' * * * * clicked feature layer * * * > > > lng, lat ', click_lng, click_lat)


           nearby_poi(current_circle_radius, click_lng, click_lat)
           /**/
           //  - - -  end  - - -    esri poi    - - - 
           /**/

       

         }); // view . on . click

                               
      }// function









 /**/
 //  -  -  - esri guided ring  -  -  - 
 /**/
var circle_range_guided_ring
var circle_range_graphic_guided_ring
      

async function drawing_circle_guided_ring(_radiusMeter, _centerLng, _centerLat){
 
  //console.log('drawing circle at _radiusMeter, _centerLng, _centerLat', _radiusMeter, _centerLng, _centerLat)

   arcgisMap.graphics.remove(circle_range_graphic_guided_ring);

  // Add a red circle to the map centered at -113°E, 36°N with a radius of 100 kilometers.
  circle_range_guided_ring = new Circle({
    center: [_centerLng, _centerLat],
    geodesic: true,
    numberOfPoints: 100,
    radius: _radiusMeter,
    radiusUnit: "meters"
  });


  circle_range_graphic_guided_ring = new Graphic({
    geometry: circle_range_guided_ring,
    symbol: {
      type: "simple-fill",
      style: "none", // solid
      color: [0, 0, 255, 0.171],
      outline: {
        width: 1,
        color: [0, 0, 255, 255]
      }
    }
  })

  arcgisMap.graphics.add(circle_range_graphic_guided_ring);


}


/**/
//  -  -  - end  -  -  -  esri guided ring    -  -  - 
/**/






             
                
/**/
//  --- esri manual drawing circle   --- 
/**/



var current_circle_radius

var circle_range
var circle_range_graphic
var circle_array = []


async function drawing_circle(_radiusMeter, _centerLng, _centerLat){
 
  //console.log('drawing circle at _radiusMeter, _centerLng, _centerLat', _radiusMeter, _centerLng, _centerLat)

  

  // Add a red circle to the map centered at -113°E, 36°N with a radius of 100 kilometers.
  circle_range = new Circle({
    center: [_centerLng, _centerLat],
    geodesic: true,
    numberOfPoints: 100,
    radius: _radiusMeter,
    radiusUnit: "meters"
  });


  circle_range_graphic = new Graphic({
    geometry: circle_range,
    symbol: {
      type: "simple-fill",
      style: "solid", // none
      color: [0, 0, 255, 0.171],
      outline: {
        width: 1,
        color: [0, 0, 255, 255]
      }
    }
  })

  arcgisMap.graphics.add(circle_range_graphic);

  circle_array.push(circle_range_graphic)
}




function clear_all_circle(){
  for (let i = 0; i < circle_array.length; i++) {
    if (circle_array[i]) { 
      arcgisMap.graphics.remove(circle_array[i])
    }
  }
  circle_array = []
}
          

function setLimit_onNearbyCircleRadius(){

  if (_center_radius_in_meter > max_esri_poi_radius_meter){
      _center_radius_in_meter = max_esri_poi_radius_meter
  }
  console.log('esri nearby limit 50k _center_radius_in_meter',  _center_radius_in_meter)
  //only for single auto version
  $('#radius_div').html('<span style="font-size:12.7px">Circle Radius: ' + _center_radius_in_meter + '  meters (google limit max 50000 meters(about 30 miles) </span>');
  //only for multiple manual  version
  $('#manual_radius_div').html('<span style="font-size:12.7px">Max radius: <span style="font-size:16.6px; font-weight:800">' + _center_radius_in_meter + '</span>  meters (otherwise circle expand beyond current map view) </span>');

}

function manually_adjust_max_radius(){

  
  if (arcgisMap.extent){ // fix bug, view change, but view may not ready yet, 

    _center_radius_in_meter = get_center_radius_in_map_bound() 
    // esri SearchPOI does not limit radius, but searchNearBy limit to 50k
    setLimit_onNearbyCircleRadius()


    $("#circle_radius_range").attr("max", Math.floor(_center_radius_in_meter / 2));

    // smaller circle is good to align with city limit
    current_circle_radius = Math.floor(_center_radius_in_meter / 4);
    $("#circle_radius_range").val(current_circle_radius);

    $("#circle_radius_value_label").html(current_circle_radius);
  }//if
}




function clear_all_poi(){


  graphic_layer.removeAll()

   // reset to empty geojson template
          poi_geojson = {
                            "type": "FeatureCollection",
                            "features": []
                        };

  _all_poi_uniqueID_array = []
  _all_poi_flat_array = []

  _total_poi = 0
  $("#poi_total").html(_total_poi)

}



/**/
//  --- end  ---  esri manual drawing circle    --- 
/**/

















  

/**/
//  - - - esri poi  - - - 
/**/



var _total_poi = 0
var _all_poi_flat_array = []
var _all_poi_uniqueID_array = []
var _this_page_result_array = []

var _uniqueID


//  . . efficient core newOnly  . - .
var _this_newOnly_result_array = []
var _this_newOnly_poi_geojson  
// manual draw circle only
var _this_newOnly_geojsonGoogleHandlerArray = []



var __off_sets___ = 0
var _response
var _attribute_for_popup
var graphic_symbol
var graphic_layer
var poi_graphicLayer_layerView


var poi_geojson

// component 
// component must use e v e n t .  d e t a i l
async function init_poi_graphic_layer(){

            

              // new empty graphic layer
              graphic_layer = new GraphicsLayer({
                graphics: []
              })

              // add new empty graphic layer to map
              arcgisMap.map.add(graphic_layer)



              poi_graphicLayer_layerView = await arcgisMap.whenLayerView(graphic_layer);


              poi_graphicLayer_layerView.highlightOptions = {

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
              // component 
              // warning: component must use e v e n t .  d e t a i l
              const debouncedUpdate = promiseUtils.debounce(async (event) => {
    
      
              // component 
              // warning: component must use e v e n t .  d e t a i l
              const hitTest = await arcgisMap.hitTest(event.detail, { include: graphic_layer});
              let hitResult = hitTest.results.filter(function (result) {
                                                                        return result.graphic.layer === graphic_layer;
              })
        
              let graphic      
                 
              // && logical AND assignment,  only when hitResult[0] is truthy, same as : 
              // var newObjectId
              // if (hitResult[0]) { newObjectId = hitResult[0].graphic.attributes[backgroundFeatureLayer.objectIdField]; } else { newObjectId = undefined }
              var newObjectId = hitResult[0] && hitResult[0].graphic.attributes['placeId'];
                  
              
              
              //console.log('hover new Object Id vs old object Id : ', newObjectId, objectId);
              // fix bug, object id could be 0,  if (0) is false, actually, 0 is real id, should be true here.
              //if (!newObjectId) {
              if (newObjectId == undefined) {
                      if (mouse_pointed_graphic_highlight_handle){
                        mouse_pointed_graphic_highlight_handle.remove()
                      }
                      objectId = undefined
                      // hide info outline 
                      empty_info_outline_Tab()
                                    
              } else if (objectId !== newObjectId) {
      
                    if (mouse_pointed_graphic_highlight_handle){
                      mouse_pointed_graphic_highlight_handle.remove()
                    }
                    objectId = newObjectId;
                    graphic = hitResult[0].graphic;

                    // if outside scope of layer View, must need get layer view. For single layer, if inside scrope, it is optional. For multi layer, even inside scope, still must get layer view
                    // to be safe, I always get layer view here, even it is single layer, inside scope.
                
                    mouse_pointed_graphic_highlight_handle = poi_graphicLayer_layerView.highlight(graphic);
                  

                    console.log('newObjectId', newObjectId)
                    //console.log(' ! * ! hit test ! * ! result ! * ! graphic ! * ! ', graphic )
                    show_info_outline_Tab(graphic.attributes)
              }//if newObjectId
                



});// debounce


//  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
// component // view . on ( " pointer-move " , function(event){
arcgisMap.addEventListener("arcgisViewPointerMove", (event) => {


  

 /**/
 //  -  -  - esri guided ring  -  -  - for draw circle
 /**/
      console.log('a r c g i s V i e w P o i n t e r M o v e - for - h o v e r event', event )
            var screenPoint = {
                x: event.detail.x,
                y: event.detail.y
              };
            var mapPoint = arcgisMap.toMap(screenPoint);
            var guided_ring_lng = mapPoint.longitude;
            var guided_ring_lat = mapPoint.latitude
            console.log(' * * * * guided_ring * * * > > > lng, lat ', guided_ring_lng, guided_ring_lat)

            
            drawing_circle_guided_ring(current_circle_radius, guided_ring_lng, guided_ring_lat)
/**/
//  -  -  - end  -  -  -  esri guided ring    -  -  - 
/**/


  




          debouncedUpdate(event).catch((err) => {

             
 
              if (!promiseUtils.isAbortError(err)) {
                throw err;
              }
          });
          // -- - - -  -- - - -  end  -- - - - -- - - -   mouse-move -- - - -  -- - - - 

 
 

            
  }); // view . on . hover
}


// has view, inside of require scope
function get_center_radius_in_map_bound(){

  console.log('a r c g i s M a p - v i e w c h a n g e d', arcgisMap.extent.height)
  var _map_extent_height_InMapUnit = arcgisMap.extent.height
  var _map_extent_width_InMapUnit = arcgisMap.extent.width

  var spatialRef = arcgisMap.extent.spatialReference;

  var _map_extent_height_InMeters = _map_extent_height_InMapUnit * spatialRef.metersPerUnit; 
  var _map_extent_width_InMeters = _map_extent_width_InMapUnit * spatialRef.metersPerUnit;
  var min_radius
  if (_map_extent_height_InMeters <= _map_extent_width_InMeters){
    min_radius = Math.floor(_map_extent_height_InMeters / 2.7) // 2 is too large, over bottom line
  } else {
    min_radius = Math.floor(_map_extent_width_InMeters / 2.7) // 2 is too large, over bottom line
  }

  // esri limit radius max radius 10,000 meters https://developers.arcgis.com/documentation/mapping-and-location-services/place-finding/nearby-search/
  // If the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 10,000 meters (about 5 miles).
  if (min_radius > max_esri_poi_radius_meter){
    min_radius = max_esri_poi_radius_meter
  }

  console.log("min_radius in meter", min_radius)
  return min_radius
}





            async function nearby_poi(_radiusMeter, _centerLng, _centerLat){






            /**/
            //  --- use your key  --- 
            /**/

                      
            var hostname = window.location.hostname;
  var port = window.location.port;

            console.log("hostname,port ", hostname, port);
  if (hostname === "localhost" && port === '10') {
              console.log("The current URL is localhost.");
              
              //for production
              your_esrilocation_key = esri_location_api_key
              // for test only
              //your_esrilocation_key = $('#esrilocation-key-input').val();

            } else {
              console.log("The current URL is not localhost. it is ", hostname);
              your_esrilocation_key = $('#esrilocation-key-input').val();
            }
            update_url_parameter('youresrilocationkey', your_esrilocation_key);

if (your_esrilocation_key){

            /**/
            //  --- end  ---  use your key    --- 
            /**/









              drawing_circle(_radiusMeter, _centerLng, _centerLat)


              //  . . efficient core newOnly  . - .
              _this_newOnly_result_array = []




              __off_sets___ = 0
              // 10 page
              for (var i = 0; i < 10; i++) {

                __off_sets___ = i * max_esri_page_size
                var placesQueryParameters = new PlacesQueryParameters({
                  apiKey: esri_location_api_key,
                  // esri place api, max give you 200 poi on each search.
                  pageSize: max_esri_page_size, // page size must between 1 and 20
                  offset: __off_sets___,  // max offset 199
                  radius: _radiusMeter,
                  point: {type: "point", longitude: _centerLng, latitude: _centerLat},
                });

                _response = await places.queryPlacesNearPoint(
                  placesQueryParameters
                );

                _this_page_result_array = _response.results

                console.log(' this page : ', _this_page_result_array.length, _this_page_result_array)
                if (_this_page_result_array.length){
                 
                      // not use, it add duplicate poi  
                      // _all_poi_flat_array.push(..._this_page_result_array)

                     

                      // test if this new poi already exist
                      for (var p = 0; p < _this_page_result_array.length; p++) {
                        _uniqueID = _this_page_result_array[p].placeId
                        if (_all_poi_uniqueID_array.includes(_uniqueID)){
                          // already exist, skip
                        } else {
                          _all_poi_uniqueID_array.push(_uniqueID)
                          _all_poi_flat_array.push(_this_page_result_array[p])
                        
                            //  . . efficient core newOnly  . - .
                            _this_newOnly_result_array.push(_this_page_result_array[p])

                          }//if
                      }//for 


                }//if 
              }//for 

              console.log(' near by poi results', _all_poi_flat_array)
              // special version only for esri place poi
              poi_geojson = poi_to_geojson(_all_poi_flat_array)
              _total_poi = _all_poi_flat_array.length
              $("#poi_total").html(_total_poi)
              
              
              
              // not use, show all poi
              //showResults_placeAPI(_all_poi_flat_array);
              //  . . efficient core newOnly  . - .
               showResults_placeAPI(_this_newOnly_result_array);
               // . .  end . . efficient core newOnly  . - .



}// if esri locatin key exist


            }

            async function showResults_placeAPI(_poi_array) {


              if (_poi_array.length){



                // both works

                // version 1:  every time init a new graphic layer
                 //map.remove(graphic_layer)
                 // config new empty graphic layer's highlight, hover event
                // await init_poi_graphic_layer()
                       
                
                // version 2: always use same one graphic layer,
                // remove all last time poi graphic
                //  . . efficient core newOnly  . - ., not use
                //graphic_layer.removeAll()




                
                var result
                for (var i = 0; i < _poi_array.length; i++) {

                  result = _poi_array[i]
                  //console.log('show result', result)

                  _attribute_for_popup = {
                    name: result.name,
                    placeId: result.placeId,
                  }

                  graphic_symbol =  new Graphic({
                    attributes: _attribute_for_popup,
                    geometry: result.location,

                    //  -- simple marker symbol  -- 
                        symbol: {
                            // autocasts as new SimpleMarkerSymbol()
                            type: "simple-marker",
                            color: poi_color,   //"yellow",
                            size:  poi_size,  // all works "31pt", "31px",
                            style: poi_style, // diamond, triangle, cross, x, circle, path, square
                            // autocasts as new SimpleLineSymbol()
                            outline: {
                              // simple marker builder, https://sagewall.github.io/symbol-builder/simple-marker-symbol/
                              color: poi_outlineColor,  //"#efefef",
                              width: poi_outlineWidth
                            }
                        },
                    // -- end  -- simple marker symbol  -- 
                
                    popupTemplate: {
                      title: "{name}",
                    }
                  })// graphic symbol


                  // add new graphic to graphic layer https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html#constructors-summary
                  // all works
                  graphic_layer.graphics.push(graphic_symbol);
                  //graphic_layer.graphics.add(graphic_symbol);
                  //graphic_layer.add(graphic_symbol);

                  
                  
                } //for





             }//if
            }//function 


          
      // special version only for esri place poi
      function poi_to_geojson(____poi_array){

        var ____feature_array = []
        var ____feature
        var poi_element

        var poi_location
        var poi_lat
        var poi_lng

        for (let i = 0; i < ____poi_array.length; i++) {

          poi_element = ____poi_array[i]
          //console.log('esri place item ',i,  poi_element)
          poi_location = poi_element.location
          poi_lng = poi_location.longitude
          poi_lat = poi_location.latitude


          ____feature = {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [poi_lng, poi_lat]
            },
            "properties": {

              "poi_id": poi_element.placeId,
              "name": poi_element.name,
            
            }//properties
          }//feature

          ____feature_array.push(____feature)
          
        }//for

        
        geojson_template =  {
          "type": "FeatureCollection",
          "features": ____feature_array
        };

        return geojson_template

      }





/**/
//  - - -  end  - - -    esri poi    - - - 
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


        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

                         
        
                                                       
                          init_user_interface_event()
         
                          
                          update_layer_name(background_layer_url, _layer)         
                          
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
      //  --- esri manual drawing circle   --- 
      /**/

      $("#circle_radius_range").on("change", function() {
        current_circle_radius = Number($(this).val());
        $("#circle_radius_value_label").html(current_circle_radius);
      });


      $("#start_over_button").on("click", function() {
      clear_all_circle()
      clear_all_poi()

     

      });

  /**/
  //  --- end  ---  esri manual drawing circle    --- 
  /**/



                
/**/
            //  - - - download csv  - - - 
            /**/




            $("#download_csv_button").on("click", function() {



              json_for_csv = geojson_to_csvReadyJsonArray(poi_geojson)
              
              /**/
              //  --- papaparse   --- 
              /**/
              var final_csv_string = parse_json_to_csv_string(json_for_csv)
              /**/
              //  --- end  ---  papaparse    --- 
              /**/

              saveStringAsFile('poi.csv', final_csv_string)



          });



      /**/
      //  - - -  end  - - -   download csv    - - - 
      /**/


  /**/
    // - - - - download poi  - - - - 
    /**/
    $("#download_poi_button").on("click", function() {
      saveJsonAsFile('poi.geojson', poi_geojson)
    });
  /**/
  //  - - - -  end  - - - -  download poi   - - - - 
  /**/





                
              }





                 


          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 



              

              
              

              function show_info_outline_Tab(___properties){
                console.log('show info window  properties : ', ___properties )

                
                // show object json string 
                //$('#info-window-div').html(JSON.stringify(___properties))

                
               
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




               // enforce use yellow square for point, yellow line, yellow polygon              
               function enforce_yellow_linepointpolygon(_this_feature_layer){



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











