



// where-is-what-image is from explore.js, add zoom to clicked feature function



require([
          "esri/config",
          "esri/Map",
          "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
          "esri/widgets/BasemapToggle",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",

 
          
  "esri/core/Handles",
          
          "esri/layers/TileLayer",
          "esri/geometry/geometryEngine",
          
          "esri/widgets/Legend",
          "esri/widgets/Search",
 
 
         
           "esri/rest/locator",
  "esri/rest/places",
  "esri/rest/support/FetchPlaceParameters",
  "esri/rest/support/PlacesQueryParameters",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",

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
            Expand, 
            BasemapGallery, 
            
            
          
            Handles,
           
          TileLayer,
          geometryEngine,
          Legend,
          Search, 
         
        
          locator,
            places, 
            FetchPlaceParameters, 
            PlacesQueryParameters,
            
            TextSymbol,
            Font, 

           Track,
             Locate,
             Graphic,
            
           Print,
            
             promiseUtils,
           reactiveUtils,


        ) {


          
              
               
              
              
              
               
              
         
         // keep here, do not place in a r c g i s _ c o m m o n, because only geocoding, search POI etc need key, without these, no need key
         esriConfig.apiKey = current_in_use_esriConfigaApiKey;
              const geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
         const apiKey = esriConfig.apiKey;
         



              /**/
              //   --- --- --- --- back to previous extent --- ------ ---
              /**/
              var extentStack = new Stack(); 
              /**/
              //   --- --- end --- --- back to previous extent --- --- --- ---  
              /**/





      /**/
      // ----- image or tile -----  ----- 
      /**/
          var background_type = 'image'   //'data'  //    tile
          var backgroundMapImageLayer
    var mapimagerlayer_sub_layer // filter map image layer, use layer definition expression
          var backgroundTileLayer
          var backgroundFeatureLayer  
          

          var clicked_graphic
          
          
          var graphic_geometryType 
      /**/
      // ----- end  -----  image or tile -----  ----- 
      /**/
      
      


    /**/
    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
    /**/
    var searchAddressWidget
    var intersectedFeature_graphic

    var zoom2feature_noMoreThan = 20  // default
    var zoom2feature_zoomLevel = 18  // default
    var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
    //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level'

    

   /**/
   //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
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

               
        // for data only
        createFeatureLayer()  
               
        // for both image and tile
        createMapImageLayer()
                
        
        init_feature_layer_view()
        
                 
          
             
        /**/
        // special edition add - - - add search widget - - - 
        // ----- ui ----- outside of map  ----- only for map image layer   ----- 
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


                  //=================== user input title for browser print ============================
                          var title_div_element = document.getElementById('title_div')
                  view.ui.add(title_div_element, "top-left"); //Add to the map
                          //======== end =========== user input title for browser print ============================


                   /**/ 
                  //========== special edition only for where is what =================== add search widget ============================
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

                    // only for where is what, need 'rooftop'  
                    includeDefaultSources: false, // default locator source is "point on street", not use. use point on roof-top  
                    //includeDefaultSources: true, 
                    //  in use, only for where is what, need 'rooftop', however it might trigger login arcgis online to access online geocoding item, in victorville, hrsa, (palm springs works fine)
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
                    ],
                    


                // add these 2 lines to make search widget outside of map
                    id: "outside-esri-search-widget-id",
                },
                 "outside-esri-search-widget"
                 // -- end --  add these 2 lines to make search widget outside of map
              
              );
                // in use
                //view.ui.add(searchAddressWidget, "top-leading"); //Add to the map
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

          //  .. - .. - ... zoom 2 feature   ... - .. - .. 
              var featureIntersectWithAddressQuery = backgroundFeatureLayer.createQuery();
              featureIntersectWithAddressQuery.geometry = event.results[0].results[0].feature.geometry;
              featureIntersectWithAddressQuery.spatialRelationship = 'intersects';  //Possible Values:"intersects"|"contains"|"crosses"|"disjoint"|"envelope-intersects"|"index-intersects"|"overlaps"|"touches"|"within"|"relation"
              featureIntersectWithAddressQuery.outFields = ['*'];
              featureIntersectWithAddressQuery.returnGeometry = true;
              featureIntersectWithAddressQuery.outSpatialReference = view.spatialReference;
              featureIntersectWithAddressQuery.maxAllowableOffset = 0;
              backgroundFeatureLayer.queryFeatures(featureIntersectWithAddressQuery).then(function(intersectedFeatureResult){

                                            // always remove previous clicked graphic
                                            clear_this_graphic(intersectedFeature_graphic);

                                            console.log('find intersected Feature Result', intersectedFeatureResult)
                                            

                                            intersectedFeature_graphic = intersectedFeatureResult.features[0]

                                            if (intersectedFeature_graphic){

                                                  console.log('intersect feature, graphic, found,     ', intersectedFeature_graphic)
                                                  // html check mark https://www.toptal.com/designers/htmlarrows/symbols/check-mark/
                                                  $('#alert_message').html('<span style="font-size:48px; background-color: coral;">&#10003;</span> Found intersect feature on ' + '<b>' + _layer + '</b>')
                                                  

                                                  graphic_geometryType = intersectedFeature_graphic.geometry.type.toLowerCase()
                                                  if (graphic_geometryType.includes('polygon')){
                                                    intersectedFeature_graphic.symbol = polygon_symbol
                                                  } else if (graphic_geometryType.includes('line')){
                                                    intersectedFeature_graphic.symbol = polyline_symbol
                                                  } else if (graphic_geometryType.includes('point')){  
                                                    intersectedFeature_graphic.symbol = point_symbol
                                                  }
                                                  view.graphics.add(intersectedFeature_graphic);
                                                  show_info_outline_Tab(intersectedFeature_graphic.attributes)


                                                  //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                                              
                                                  // zoom to feature
                                                      if (zoom2feature_yesNo == 'donot_zoom2feature'){
                                                                      // nothing to do
                                                      } else { 

                                                        // polygon, line works fine, but point, would not zoom to point (closer), is because for point,geometry,extent is null. However polygon's geometry's extent have value. 
                                                        console.log('(point, extent is null) (polygon or line, extent has somevalue) test 1st geometry, type, and extent  :   ', intersectedFeature_graphic.geometry.type, intersectedFeature_graphic.geometry.extent  )
                  
                                                                      
                                                            view.goTo(intersectedFeature_graphic.geometry).then(function(goto_results){

                                                                console.log(' go to intersect graphic result , ,  ,',  goto_results)
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
                                                                                  if (intersectedFeature_graphic.geometry.type == 'point'){
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


                                                      }//if                      
                                                  //  ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - ..


                                            } else {
                                                  console.log(' No intersect feature found')
                                                  //html icon https://www.toptal.com/designers/htmlarrows/math/multiplication-sign/
                                                  $('#alert_message').html('<span style="font-size:48px; background-color: #9FE2BF;">&#215;</span> No intersect feature found on ' + '<b>' + _layer + '</b>')
                                                  
                                                  // zoom to address


                                            }//if

                                    });
          //  ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - ..

        });
        
        //========= end ========== add search widget ============================
        /**/ 




                  


                    
//  . .  track  . . my current location .. must here,...... before basemap toggle widget ...... otherwise will block basemap popup  ...... 

     // current location https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
        
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

              // step2 - only for outside of map Set id properties ( must comment out if inside of map)
              //id: "outside-esri-track-current-location-id",

              view: view
            },
            // step3 - only for outside of map ( must comment out if inside of map)
            //"outside-esri-track-current-location"
          );

          // only for inside of map,  (must comment out if outside of map) 
          view.ui.add(locate, "bottom-right");

          // track large icon modified at color.css for button size, arcgis_common.js bottom for shadow DOM icon size change.
          // without shadow DOM, such as toggle basemap icon, to make it large only set at color.css 


//   . . end  . .  track  . . 
       
                    


          
                 //=================== toggle basemap ============================

                      // Create a BasemapGallery widget instance and set, its container to a div element

                      
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

                        /* not use
                        
                        // outside of map not working, when click did not change map due to styling issue, so change back to inside map
                        
                        
                        // outside of map follow step 1 to 3,   step1 is add div tag in html 
                        const basemapGallery = new BasemapGallery({
                            source: base_map_source_array,

                            // step2 - only for outside of map Set id properties ( must comment out if inside of map)
                            id: "outside-esri-toggle-basemap-id",
                            view: view,

                            // only for inside of map,  (must comment out if outside of map) 
                            //container: document.createElement("div")
                          },

                          // step3 - only for outside of map ( must comment out if inside of map)
                          "outside-esri-toggle-basemap"
                        );

                          // Create an Expand instance and set the content
                          // property to the DOM node of the basemap gallery widget

                          const bgExpand = new Expand({
                                      collapseIcon: "arrow-bold-right",
                                      expandIcon: "arrow-bold-left",
                                      collapseTooltip: "Close Options",
                                      expandTooltip: "Open Back Ground Map Options",
                                      

                            // step2 - only for outside of map Set id properties ( must comment out if inside of map)
                            id: "outside-esri-toggle-basemap-expand-id",

                            view: view,
                            content: basemapGallery
                          },

                          // step3 - only for outside of map ( must comment out if inside of map)
                          "outside-esri-toggle-basemap-expand"
                        );

                        // only for inside of map,  (must comment out if outside of map) 
                        // Add the expand instance to the ui
                        //view.ui.add(bgExpand, "bottom-right");

                        */


                        // in use,  = = =  inside map  = = = 
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
                        // = = =  end  = = =    inside map  = = = 
                //========  end =========== toggle basemap ============================    


                


                    /**/ 
                    //=================== add legend, outside of map ============================
                          
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

                    //======= end ============ add legend, outside of map ============================
                    /**/ 


                    // add zoom level html https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#add
                    //var zoomLevel_html = '<b id="current_zoom_level" style="font-size:84px;">15</b>'
                    var zoomLevel_element = document.createElement("b");
                    zoomLevel_element.id = "current_zoom_level"
                    zoomLevel_element.style.fontSize = '36px'
                    
                    zoomLevel_element.style.color = 'white'
                    zoomLevel_element.style.textShadow = '2px 2px 2px #000000'

                    // get current zoom level ,https://gis.stackexchange.com/questions/222652/getting-current-zoom-level-in-arcgis-api-for-javascript-4  
                    //https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom
                    _center_zoom = parseInt(view.zoom)  
                    var zoomLevel_text = document.createTextNode(_center_zoom);
                    zoomLevel_element.appendChild(zoomLevel_text);
                    view.ui.add(zoomLevel_element, "bottom-left");


                    // zoom 2 layer
                    
                    // event handle
                    $('#zoom2layer_button').on("click", (event) => {
                      console.log('zoom 2 layer button clicked')
                      pan_to_real_location()
                    });


                   


                    // opacity, outside of map, only for map image layer
                    var opacity_slider = document.querySelector("#overlay_opacity_range");
                    opacity_slider.value = _opacity * 10

                    var opacity_value_text = document.querySelector("#opacity_value_text");
                    opacity_value_text.textContent = opacity_slider.value;


                    // event handle   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                    opacity_slider.addEventListener("input", (event) => {

                      _opacity = event.target.value / 10
                      console.log(' opacity slider change to ', _opacity )
                      // must use set 'text', because I previously create 'text' node
                      document.getElementById('opacity_value_text').textContent = _opacity * 10
                      // both works
                      //$('#opacity_value_text').text(_opacity * 10)
                      update_url_parameter('opacity', _opacity)

                      if (backgroundMapImageLayer){ backgroundMapImageLayer.opacity = _opacity }
                      if (backgroundTileLayer){ backgroundTileLayer.opacity = _opacity }
                      if (backgroundFeatureLayer){ backgroundFeatureLayer.opacity = _opacity }  


                    });
                    // ... end ... opacity, outside of map, only for map image layer



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
        // ----- end  ----- ui ----- outside of map -----   ----- only for map image layer   -----
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
                                                  opacity: _opacity
                                                
                                            });

                                            backgroundTileLayer = new TileLayer({
                                              url: background_mapserver_url, // "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer"
                                              opacity: _opacity,
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

                                                                    console.log("background type", background_type);
                                                                    if (background_type == 'image'){
                                                                      map.add(backgroundMapImageLayer)

                                                                      


                                                                    } else if (background_type == 'tile'){
                                                                      map.add(backgroundTileLayer)

                                                                            



                                                                    } 
                                            
                                            });

                          }
                        

                          

                          var highlightHandles = new Handles();
                      var layerView 
                      // special for map image, data, tile interchangable 
                      async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

                           
                                    backgroundFeatureLayer = new FeatureLayer({
                                      url: background_layer_url, 
                                      // labeling see this example https://developers.arcgis.com/javascript/latest/sample-code/labels-basic/
                                      // labelingInfo: [labelClass]  // not use, this will add label to entire layer data, not just filtered result
                                      opacity: _opacity,
                                      outFields: ['*'],
                                    });
                           
                    
                            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
                            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
                            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                                        // prints the total count to the console
                                        console.log('total count is : ', numFeatures);
                                        total_feature_count = numFeatures
                                        update_statistic_info(current_feature_rendered , total_feature_count)

                            });
                
                            console.log("background type", background_type);
                            if (background_type == 'data'){
                              map.add(backgroundFeatureLayer)
                           

                              layerView = await view.whenLayerView(backgroundFeatureLayer);
                            
                               

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




              


                
        // special only for where is what,  because it add zoom 2 feature         
        var graphic_object_indexAsKey = {}      
        function init_feature_layer_view(){


                    //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                    //view.on("pointer-move", function(event){
                    // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
                    view.on("click", function(event){


                      // ... ... . only for map image layer and tile layer, click event  ... ... . 
                              console.log('view clicked, .. .. .. ',event,  event.mapPoint )

                              // remove previous both inactive and highlighted graphic and square guide box 
                              clear_clicked_graphic()

                                //  .. - .. - ... zoom 2 feature   ... - .. - ..
                                      $('#alert_message').html('')
                               //  ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - ..
                               /**/

                              
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


                                                          // special only for where is what,  because it add zoom 2 feature 
                                                          
                                                          //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                          clicked_graphic =  ___graphic___          
                                                            // zoom to feature
                                                            if (zoom2feature_yesNo == 'donot_zoom2feature'){
                                                              // nothing to do
                                                            } else { 
                                                                                
                                                                  // polygon, line works fine, but point, would not zoom to point (closer), is because for point,geometry,extent is null. However polygon's geometry's extent have value. 
                                                                  console.log('(point, extent is null) (polygon or line, extent has somevalue) test 1st geometry, type, and extent  :   ', clicked_graphic.geometry.type, clicked_graphic.geometry.extent  )
                                
                                                                      //view.goTo(graphic).then(function(goto_results){
                                                                      view.goTo(clicked_graphic.geometry).then(function(goto_results){

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
                                                                                    if (clicked_graphic.geometry.type == 'point'){
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


                                                            }//if                      
                                                        //  ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - ..



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

                                                  // special only for where is what,  because it add zoom 2 feature 
                                                  clicked_graphic = ___graphic___


                                                   //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                                                                          
                                                            // zoom to feature
                                                            if (zoom2feature_yesNo == 'donot_zoom2feature'){
                                                              // nothing to do
                                                            } else { 
                                                                                
                                                                  // polygon, line works fine, but point, would not zoom to point (closer), is because for point,geometry,extent is null. However polygon's geometry's extent have value. 
                                                                  console.log('(point, extent is null) (polygon or line, extent has somevalue) test 1st geometry, type, and extent  :   ', clicked_graphic.geometry.type, clicked_graphic.geometry.extent  )
                                
                                                                      //view.goTo(graphic).then(function(goto_results){
                                                                      view.goTo(clicked_graphic.geometry).then(function(goto_results){

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
                                                                                    if (clicked_graphic.geometry.type == 'point'){
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


                                                            }//if                      
                                                        //  ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - ..
                                      });

                                    }//for


                                                      



                                                        
                                                            
                                   }//if
                          
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
                    
                  

                    

                     

            // ....  end ... ...  background layer url .... ... ... 
            /**/

      }






     
    /**/
    //   --- --- --- --- back to previous extent --- --- esri only --- ---
    /**/
    function use_extent(){
                        console.log('go to map image layer full extent')

      backgroundFeatureLayer.queryExtent().then(function(results){
        // go to the extent of the results satisfying the query
        view.goTo(results.extent);
      });
      
}
/**/
//   --- --- end --- --- back to previous extent --- --- esri only --- ---  
/**/




      function init_user_interface_event(){

        $('#info_outline').hide()
        $('#close_info_outline_panel').on('click', function(event) {
            empty_info_outline_Tab()
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
                    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                    /**/
                    var param_zoom2feature_noMoreThan = urlParams.get('zoom2feature_noMoreThan');
                    if (param_zoom2feature_noMoreThan){
                                          console.log('use new zoom to feature no More Than from urlparam ',  param_zoom2feature_noMoreThan)
                                          zoom2feature_noMoreThan = parseInt(param_zoom2feature_noMoreThan)
                    }

                    var param_zoom2feature_zoomLevel = urlParams.get('zoom2feature_zoomLevel');
                    if (param_zoom2feature_zoomLevel){
                                          console.log('use new zoom to feature zoom Level from urlparam ',  param_zoom2feature_zoomLevel)
                                          zoom2feature_zoomLevel = parseInt(param_zoom2feature_zoomLevel)
                    }  

                    var param_zoom2feature_yesNo = urlParams.get('zoom2feature_yesNo');
                    if (param_zoom2feature_yesNo){
                                          console.log('use new zoom to feature yes no from urlparam ',  param_zoom2feature_yesNo)
                                          zoom2feature_yesNo = param_zoom2feature_yesNo
                    }
                                                      

                          // nested function
                          function zoom2feature_change_handler(){
                                  
                            if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').attr('checked', true)
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              /* not use
                              if (searchAddressWidget){
                                searchAddressWidget.autoSelect = true
                              }*/

                            } 
                            
                            if (zoom2feature_yesNo == 'donot_zoom2feature'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').attr('checked', true)
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              /*
                              if (searchAddressWidget){
                                // not use, because no marker created, no zoom to, no popup. I actually only need no zoom to, but still need marker and popup
                                // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#autoSelect
                                //searchAddressWidget.autoSelect = false
                              }
                              */
                            }

                            if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').attr('checked', true)
                              
                              /* not use
                              if (searchAddressWidget){
                                searchAddressWidget.autoSelect = true
                              }*/
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
          //  --- POI point of interest search esri     --- 
          /**/

          init_search_poi_event_handler()

          /**/
          //  --- end  ---  POI point of interest search esri    --- 
          /**/



      }



    /**/
    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
    /**/

        function clear_this_graphic(graphic_need_to_remove_from_view){
          //view.graphics.removeAll();
          view.graphics.remove(graphic_need_to_remove_from_view);
          empty_info_outline_Tab()
      }

                    
    /**/
    //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
    /**/







    

   
    
    function show_info_outline_Tab(___properties){
        $('#info_outline').show();
        
        
                  
                  
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
    }
    
    
    function empty_info_outline_Tab(){
      $('#info_outline').hide();
      $('#info-window-div').html("")
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

            init_print() //  ---  print   --- 
                           
            
            
           

           
           
                          

        }



/* ....  end ... ... external function ... ... ...*/     


                 /**/
            //  - - -   - - -  esri print widget   - - -   - - - 
            /**/

            var print_on_mapview
            var print_outside_mapview

                  // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-print
                  function init_esri_print_widget(){

                    print_on_mapview = new Print({
                      id: "esri-print-widget-id",
                      view: view,
                      // specify your own print service
                      printServiceUrl:
                        "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                      }
                    );
                    // Add widget to the top right corner of the view
                    //view.ui.add(print, "top-left");

                    print_outside_mapview = new Print({
                      id: "outside-esri-print-widget-id",
                      view: view,
                      // specify your own print service
                      printServiceUrl:
                        "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                      },
                      'esri-print-wiget-outside-mapview-div'
                    );

                    

                  }


            /**/
            //  --- end  ---  - - -   - - -  esri print widget  - - -   - - -  
            /**/




            

      /**/
      //  --- POI point of interest search esri     --- 
      /**/

                


            // has view, inside of require scope
            

            function get_center_radius_in_map_bound(){

              var _map_extent_height_InMapUnit = view.extent.height
              var _map_extent_width_InMapUnit = view.extent.width

              // both works
              //const spatialRef = map.spatialReference;
              const spatialRef = view.extent.spatialReference;

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



            function resetPagination(){

              $('#pagination-container').show();

              // esri max poi return limit is 200, page size 20, will be 10 page
              page_sources=[];
              for (var i = 1; i <= 200; i++) {
              page_sources.push(i);
              }//for 


              $('#pagination-container').pagination({
                dataSource: page_sources,
                pageSize: page_size,
                showGoInput: true,
                showGoButton: true,
                className: 'paginationjs-theme-grey paginationjs-big',   // blue skin  http://pagination.js.org/docs/index.html#Skin
                callback: function(data, pagination) {


                    console.log('pagination call back data, returned data -> ', data) 
                    // .... fix bug if data is [] ....
                    var _off_set;
                    if (data.length == 0) {
                        _off_set = 0;
                    }else {
                    _off_set = data[0]-1;
                    }
                    // .... fix bug if data is [] ....


                    
                    console.log('pagination --- ', pagination)

                    nearby_poi(page_size,_off_set);
            
                }
            })   //$('#pagination-container) 

            }


            async function nearby_poi(__page_size__, __off_sets___){

            

              search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
              console.log('nearby poi keyword --->  ', search_poi_keyword)

              var _map_center_point = view.center             
              _center_radius_in_meter = get_center_radius_in_map_bound() 
              console.log(' near by poi _map_center_point', _map_center_point)
              console.log(' near by poi _center_radius_in_meter', _center_radius_in_meter)



               // Pass search area, categories, and API Key to places service
               // Parameters for queryPlacesNearPoint()
                const placesQueryParameters = new PlacesQueryParameters({

                  // api https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-PlacesQueryParameters.html#properties-summary
                  // normal esri developer api key not working, must be esri location api key
                  apiKey: esri_location_api_key,

                  
                  // esri place api, max give you 200 poi on each search.
                  pageSize: __page_size__, // page size must between 1 and 20
                  offset: __off_sets___,  // max offset 199
                  searchText: search_poi_keyword,
                 
                  // without category will cross all category
                  //categoryIds: [10000], // [activeCategory], 
                  

                  // not working, must use point and radius, turns out as x,y,radius in url
                  //extent: view.extent
                  radius: _center_radius_in_meter,
                  point: _map_center_point,

                });


                // The results variable represents the PlacesQueryResult
                const results = await places.queryPlacesNearPoint(
                  placesQueryParameters
                );


                console.log(' near by poi results', results)


                
                showResults_placeAPI(results);

            }


            
            function showResults_placeAPI(results) {

              view.closePopup();
              view.graphics.removeAll();

              // place api, results is different, {pagination:{},  results:{}}
              results.results.forEach((result)=>{

                console.log('show result', result)


                // --- label POI  --- 
                /* both works
                var text_symbol = new TextSymbol(result.name);
                text_symbol.color = poi_color
                text_symbol.haloColor = poi_outlineColor
                text_symbol.haloSize = poi_outlineWidth
                */
                var text_symbol = new TextSymbol({ 

                                                  text: result.name,
                                                  color: poi_TextColor,
                                                  font:  poi_font,
                                                  haloColor: poi_haloColor,
                                                  haloSize: poi_haloSize,
                                                  horizontalAlignment: "center",
                                                  lineHeight: poi_lineHeight,
                                                  lineWidth: poi_lineWidth,

                });



                var _categories_string=''
                var _categories_array=[]
                for (let i = 0; i < result.categories.length; i++) {
                  _categories_array.push(result.categories[i].label)
                }//for
                _categories_string = _categories_array.toString()


                var _attribute_for_popup = {
                  name: result.name,
                  category: _categories_string,
                }



                var graphic_symbol =  new Graphic({
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
                    title: "Name: {name}",
                    content:"Category: {category}" 
                  }
                 
                })// graphic symbol

              

                var graphic_text =  new Graphic({
                  attributes: _attribute_for_popup,
                  geometry: result.location,

                  // --- label POI  --- 
                  // in use, text symbol as graphic label
                  symbol: text_symbol,
                  // --- end  --- label POI  --- 

                  popupTemplate: {
                      title: "Name: {name}",
                      content:"Category: {category}" 
                  }
                     
                })// graphic text

                // defaultPopupTemplateEnabled ( default is false ) https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html#getEffectivePopupTemplate
                graphic_symbol.getEffectivePopupTemplate(true)
                graphic_text.getEffectivePopupTemplate(true)
                
                // add symbol first, then add text on top of symbol
                view.graphics.add(graphic_symbol);
                view.graphics.add(graphic_text);
                
              }); // r e s u l t s


              /* not use
              // auto popup first record 
              if (results.length) {
                const g = view.graphics.getItemAt(0);
                view.openPopup({
                  features: [g],
                  location: g.geometry
                });
              }//if
              */


            }//function 







            function search_poi(event){

              
              search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
              
              console.log('search_poi_keyword --->  ', search_poi_keyword)


              // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
              if (search_poi_keyword){

                
                const params = {

                    // params api https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-locator.html#methods-summary
                    address: {
                      address: search_poi_keyword
                    },

                    //outFields: ["PlaceName","Place_addr"],
                    outFields: ["*"],


                    // Used to weight returned results for a specified area
                    //location: view.center,  // pt, San Francisco (-122.4194, 37.7749)
                    // Defines the extent within which the geocode server will search. Requires ArcGIS Server version 10.1 or greater.
                    searchExtent: view.extent,
                    

                    locationType: "rooftop",  //either "street" or "rooftop"
                    //categories: [],
                    countryCode: 'US',  // limit to  United States only
                    //maxLocations: ,

                }//p a r a m s



                locator.addressToLocations(geocodingServiceUrl, params).then((results)=> {

                  console.log('search poi results --->  ', results)
                  showResults(results);
                  
                });



              }//if
                    
                                

            }//function 


           // has view, inside of require scope
          // autocasts as new Font()
            var poi_font = new Font({ family: "Merriweather", size: "14px", style: "italic", weight: "bold" });
            
            function showResults(results) {

              $('#pagination-container').hide();


              view.closePopup();
              view.graphics.removeAll();


              results.forEach((result)=>{

                console.log('show result', result)


                // --- label POI  --- 
                /* both works
                var text_symbol = new TextSymbol(result.address);
                text_symbol.color = poi_color
                text_symbol.haloColor = poi_outlineColor
                text_symbol.haloSize = poi_outlineWidth
                */
                var text_symbol = new TextSymbol({ 

                                                  text: result.address,
                                                  color: poi_TextColor,
                                                  font:  poi_font,
                                                  haloColor: poi_haloColor,
                                                  haloSize: poi_haloSize,
                                                  horizontalAlignment: "center",
                                                  lineHeight: poi_lineHeight,
                                                  lineWidth: poi_lineWidth,

                });



                var graphic_symbol =  new Graphic({
                  attributes: result.attributes,
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
                    title: "Name: {PlaceName}",
                    //not use lat, lng ... + result.location.x.toFixed(5) + "," + result.location.y.toFixed(5)
                    content:"Address: {Place_addr}" + "<br>Phone: {Phone}" + "<br>Type:  {Type}"  + "<br>URL:  {URL}" 
                  }
                 
                })// graphic symbol

                var graphic_text =  new Graphic({
                  attributes: result.attributes,
                  geometry: result.location,

                  // --- label POI  --- 
                  // in use, text symbol as graphic label
                  symbol: text_symbol,
                  // --- end  --- label POI  --- 

                  popupTemplate: {
                      title: "Name: {PlaceName}",
                      //not use lat, lng ... + result.location.x.toFixed(5) + "," + result.location.y.toFixed(5)
                      content:"Address: {Place_addr}" + "<br>Phone: {Phone}" + "<br>Type:  {Type}"  + "<br>URL:  {URL}" 
                  }
                     
                })// graphic text

                // defaultPopupTemplateEnabled ( default is false ) https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html#getEffectivePopupTemplate
                graphic_symbol.getEffectivePopupTemplate(true)
                graphic_text.getEffectivePopupTemplate(true)
                
                // add symbol first, then add text on top of symbol
                view.graphics.add(graphic_symbol);
                view.graphics.add(graphic_text);
                
              }); // r e s u l t s


              /* not use
              // auto popup first record 
              if (results.length) {
                const g = view.graphics.getItemAt(0);
                view.openPopup({
                  features: [g],
                  location: g.geometry
                });
              }//if
              */


            }//function 




            // without view, can be out side of require scope

            function clear_search_poi_result(){

              // Do not clear key word in search bar
              //$('#search_poi_input').val('')
              //search_poi_keyword = ''
              //update_url_parameter('poi', '');

              // view.popup.close(); // only works with v4.30 and before
              view.closePopup(); // works with v4.31 and after
              view.graphics.removeAll();
            }


            function update_search_poi_content(){
              search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
              console.log('search_poi_keyword --->  ', search_poi_keyword)
              update_url_parameter('poi', search_poi_keyword);
            }


            function init_search_poi_event_handler(){


                    
                                                
                    console.log('url param search poi',  search_poi_keyword)

                    // first time, 1 time
                    // esri does not support search empty for all things, it only return 1 record as US, so limit it to non-empty
              if (search_poi_keyword){
                                search_poi_keyword = search_poi_keyword.toLowerCase().trim();
                                $('#search_poi_input').val(search_poi_keyword);
                    }// if


                                                
                    // only update URL search_data=xxx, not perform real search.
                    $("#search_poi_input").on('keyup', update_search_poi_content);

                    // search bar close icon clicked. clear everything.
                    $('#clear_poi_button').on('click', clear_search_poi_result);

                    $('#search_poi_button').on('click', search_poi);
                    $('#nearby_poi_button').on('click', resetPagination);
                    $('#pagination-container').hide(); // first time always hide paging bar
                    page_size = 20; // esir limit max 200 poi, custom page size 20 will get 10 page

                    // default search
                    $('#search_poi_input').on('search', search_poi);
            }


      /**/
      //  --- end  ---  POI point of interest search esri    --- 
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

                              init_esri_print_widget() // - - -  esri print widget   - - -
          
                              
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

