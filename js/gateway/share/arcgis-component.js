

// . . . import arcgis component  . . . (keep top)


var esriConfig
var geocodingServiceUrl
var apiKey


var arcgisMap


// layer
var FeatureLayer


// util
var promiseUtils


//geometry
var Circle 
var Graphic 
var GraphicsLayer


// place poi
var places
var FetchPlaceParameters
var PlacesQueryParameters 


// base-map
var Basemap
var WebTileLayer
var BasemapStyle

// legend
var Legend


// dynamic import is async(return promise)
// case 1. even use "a w a i t     a r c g i s _ i m p o r t ()" also put it inside a s y n c function, sometime still cause module not define error,
// case 2. self-run this function, sometime still cause module not define error,
// case 3. use this function without await, will always cause module not define error,
// self-run
(async function arcgis_import(){ 


    
    esriConfig = await $arcgis.import("@arcgis/core/config.js");
    // keep here, do not place in a r c g i s _ c o m m o n, because only geocoding, search POI etc need key, without these, no need key
    esriConfig.apiKey = current_in_use_esriConfigaApiKey;
    geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    apiKey = esriConfig.apiKey;




    // layer 
    // f e a t u r e    l a y e r     must use array [] for multiple export item  
    [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);
    
    // util
    promiseUtils = await $arcgis.import("@arcgis/core/core/promiseUtils.js");
    

    //geometry
    Circle = await $arcgis.import("@arcgis/core/geometry/Circle.js");
    Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
    GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
   
   
    // place poi
    places = await $arcgis.import("@arcgis/core/rest/places.js");
    FetchPlaceParameters = await $arcgis.import("@arcgis/core/rest/support/FetchPlaceParameters.js");
    PlacesQueryParameters = await $arcgis.import("@arcgis/core/rest/support/PlacesQueryParameters.js");
   

    // base-map 
    // these import must move to base map function 
    // because sometime, not always, get error as webTileLayer not available
    
    // legend
    Legend = await $arcgis.import("@arcgis/core/widgets/Legend.js");

    

})(); // self-run





     


//  . . .   end . . . import arcgis component  . . . (keep top)














  // for geocode server, locator only 
  
     var max_suggestion_item_count = 50
      var suggest_options_html = ''

      var magic_keys_array = []
      var data_src_array = []
      
      var selectedValue

      // check category
      var geocode_json
      var all_standard_categories_flat_array = [

                                                "Address", // top level cat.
                                                "Subaddress", 
                                                "Point Address", 
                                                "Street Address",
                                                "Intersection",
                                                "Street Midblock",
                                                "Street Between",
                                                "Street Name",

                                                
                                                "Coordinate System",// top level cat.
                                                "LatLong",
                                                "XY",
                                                "YX",
                                                "MGRS",
                                                "USNG",

                                               
                                                "POI",// top level cat.
                                                "Other",
                                              ]
      var standard_categories_flat_array = []
      var poi_cat_flat_array = []

 //  . .  end . . for geocode server, locator only 







var zoom2level = 20 // google map 18 will not show house number, 19,20 will show house number,   
$("#zoom2level-input").val(zoom2level)



var objectId









// component  
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
                                  

                          console.log("arcgisMap.center", arcgisMap.center)
                          console.log("arcgisMap.zoom", arcgisMap.zoom)
                          console.log("arcgisMap", arcgisMap)


                          arcgisMap.goTo(results.features[i].geometry)



                                  break; // break for loop
                                  }
                                }//for 
                                if (! found_1_valid_geometry){
                                  console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                                  // goto full extent, always works
                                  arcgisMap.goTo(results.features); 
                                }
          })
          .catch(function(error) {
                                console.log('failed to zoom to any feature ', error); 
          }); 
                                                                                                                    
                                            
}  
           

 function full_extent(){
  console.log('go to map image layer full extent')
  backgroundFeatureLayer.queryExtent().then(function(results){
    // go to the extent of the results satisfying the query
    arcgisMap.goTo(results.extent);
  });   
 }


function init_user_interface_for_component(){


  
      // my location button also outside of map, as custom button
      browser_my_location()


  // zoom 2 layer event handle
  $('#zoom2layer_button').on("click", (event) => {
    console.log('zoom 2 layer button clicked')
    pan_to_real_location()
  });


  $('#full_extent_btn').on('click', function(event) {
    full_extent()
  });

}



   
    async function create_my_location_graphic_point(____lng, ____lat){
   

              // First create a point geometry 
              var point = {
                type: "point", // autocasts as new Point()
                longitude: ____lng,
                latitude: ____lat
              };

              
              markerSymbol = {
                                        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                        style: "square",
                                        color: [39, 66, 245, 0.376],
                                        size: "31px",  // pixels
                                        outline: {  // autocasts as new SimpleLineSymbol()
                                          color: [255,255,0,0.676],
                                          width: 3  // points
                                        }
                          };    
                
          
          
              
              // Create a graphic and add the geometry and symbol to it
              var pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
              });

              // Add the graphics to the view's graphics layer
              return arcgisMap.graphics.add(pointGraphic);

    }


    var myLocationGraphicPoint
    function browser_my_location(){

      $("#panToCurrent_geolocation_button").on("click", function(){

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                              var my_lat = position.coords.latitude
                              var my_lng = position.coords.longitude
                              arcgisMap.center = [my_lng, my_lat]

                              arcgisMap.zoom = 18 // zoom to my location

                              // clean last time my location point
                              if (myLocationGraphicPoint){
                                // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html#methods-summary
                                arcgisMap.graphics.remove(myLocationGraphicPoint);
                              }
                              myLocationGraphicPoint = create_my_location_graphic_point(my_lng, my_lat)
                            },
              () => {
                      alert('failed to get your location')
                    }
            );
        } else {
                 // Browser doesn't support Geolocation
                 alert('browser not support geolocation')
        }
                            
       
      });

    }



    
               
/**/
//  --- google as basemap for component only  --- 
/**/


    var google_hybrid
    var microsoft_hybrid
    var here3_hybrid
    var mapbox_hybrid
    var esri_imagery
    var esri_imagery_standard
    var esri_road
    var esri_labels
    var open_street_map
    var nearmap
    var base_map_source_array = []
   

    
async function create_rasterTile_basemap(){

    // these import must move to base map function 
    // because sometime, not always, get error as webTileLayer not available
    Basemap = await $arcgis.import("@arcgis/core/Basemap.js");
    // for google microsoft here mapbox open-street-map
    WebTileLayer = await $arcgis.import("@arcgis/core/layers/WebTileLayer.js");
    // for esri-vector-tile mapbox v8 style  
    BasemapStyle = await $arcgis.import("@arcgis/core/support/BasemapStyle.js");

            
      // there are 4 way to create esri basemap,  https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap 
      // 1). new Basemap({portalItem:id,  
      // 2). Basemap.fromId("topo-vector")
      // 3). new Basemap({style: {id: "arcgis/outdoor",
      // 4). new Basemap({baseLayers: [new WebTileLayer(...)], referenceLayers: [new WebTileLayer(...)]

      // for raster tile, use 4).
      
          // Google Hybrid
            google_hybrid = new Basemap({
              baseLayers: [new WebTileLayer({
                // also work   https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}
                urlTemplate : "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}", 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Google Hybrid with Label ",
                id: "layerID_google_hybrid",
                title: "Google",
              })],
              id: "Google",
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
            microsoft_label_tile_url +=  '&tilesetId=' + 'microsoft.base.labels.road'  // microsoft has street number label only, no poi place label 
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
            
                // microsoft has street number label only, no poi place label 
                new WebTileLayer({
                  urlTemplate : microsoft_label_tile_url, 
                  copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                  
                  id: "layerID_microsoft_label",
                  title: "Microsoft label",
                }), 
            
            
            
            ],
              
              id: "Microsoft", // use as radio text
              title: "Microsoft", // not use as radio text
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
            id: "Here",
            title: "Here",
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
    
              id: "Mapbox",
              title: "Mapbox",
              thumbnailUrl: "../../public/images/mapbox001.png",
            });
            // . .  end . . . . mapbox . . .. . .





            
          // . . . . open street map  . . . .
            open_street_map = new Basemap({
              baseLayers: [new WebTileLayer({
                urlTemplate : "http://tile.openstreetmap.org/{z}/{x}/{y}.png", 
                copyright: "Open Street Map " + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1),
                id: "layerID_open_street_map",
                title: "Open Street Map One Way Layer",
              })],

              id: "OpenStreetMap",
              title: "OpenStreetMap", // icon already has text
              thumbnailUrl: "../../public/images/openstreetmap002.png",
            });




            // . . . nearmap only . . .
            nearmap = new Basemap({
              baseLayers: [new WebTileLayer({
                urlTemplate : "https://api.nearmap.com/tiles/v3/Vert/{level}/{col}/{row}.img?apikey=" + nearmap_api_key, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Nearmap no Label ",
                id: "layerID_nearmap",
                title: "NearMap Layer",
              })],

              id: "NearMap",
              title: "NearMap", // icon already has text
              thumbnailUrl: "../../public/images/nearmap000.png",
            });
            //  . . . end . . . nearmap only . . .



            // raster tile base map only, not include esri's vector tile
             base_map_source_array = [
                      google_hybrid, 
                      
                      // not work for radio-basemap, only work for basemap-gallery
                      // this is 2d legacy id, https://developers.arcgis.com/javascript/latest/api-reference/esri-Basemap.html
                      //Basemap.fromId("hybrid"),  // esri base map id      

                      microsoft_hybrid,
                      here3_hybrid,
                      mapbox_hybrid,

                      open_street_map,
                      //nearmap, // uncomment to add back
      ];


}

// esri base map 
async function create_vectorTile_basemap(){

      // these import must move to base map function 
      // because sometime, not always, get error as webTileLayer not available
      Basemap = await $arcgis.import("@arcgis/core/Basemap.js");
      // for google microsoft here mapbox open-street-map
      WebTileLayer = await $arcgis.import("@arcgis/core/layers/WebTileLayer.js");
      // for esri-vector-tile mapbox v8 style  
      BasemapStyle = await $arcgis.import("@arcgis/core/support/BasemapStyle.js");
          
      // there are 4 way to create esri basemap, https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
      // 1). new Basemap({portalItem:id,  
      // 2). Basemap.fromId("topo-vector")
      // 3). new Basemap({style: {id: "arcgis/outdoor",
      // 4). new Basemap({baseLayers: [new WebTileLayer(...)], referenceLayers: [new WebTileLayer(...)]

      // for vector tile, use 3).

      // ESRI Well Known Basemap Ids https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
      // https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/what-are-esri-well-known-basemap-ids/td-p/759266
       
      // . . . . . . esri . . .. . .


      // in radio basemap, only bug found, 
      // this https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer?f=json&places=all 
      // forget insert token, failed, trigger arcgis online login screen
      // base map style has 2 family: ArcGIS Basemap styles and Open Basemap styles https://developers.arcgis.com/rest/basemap-styles/
      // fix bug, by Configure global properties of the library 
      esriConfig.apiKeys.basemapStyles = current_in_use_esriConfigaApiKey;




      // warning:  must set places = all to show poi label !

       
      esri_imagery = new Basemap({

        style: new BasemapStyle({
                  // because esriConfig set global api key, no need api key here
                  //a p i K e y : c u r r e n t _ i n _ u s e _ e s r i C o n f i g a A p i K e y,
                  id: "arcgis/imagery",
                 
                  // warning:  must set places = all to show poi label !
                  places: "all", //"attributed", //"none" returns the place's esri_place_id
            }),


        id: "Esri(POI)", // use as key and radio display text and radio value
        title: "Esri(POI)", //Not use because of warning: esri always change this title to "ArcGIS Imagery",
        thumbnailUrl: "../../public/images/esri100.png",
      })

       
      esri_imagery_standard = new Basemap({
        style: new BasemapStyle({
          // because esriConfig set global api key, no need api key here
          //a p i K e y : c u r r e n t _ i n _ u s e _ e s r i C o n f i g a A p i K e y,
          id: "arcgis/imagery/standard",

          // warning:  must set places = all to show poi label !
          places: "all", //"attributed", //"none" returns the place's esri_place_id
          }),

        id: "Esri(POI)Standard", // use as key and radio display text and radio value
        title: "Esri(POI)Standard", //Not use because of warning: esri always change this title to "ArcGIS Imagery Standard", 
        thumbnailUrl: "../../public/images/esri100.png",
      })


      
      esri_road = new Basemap({
        style: new BasemapStyle({
          // because esriConfig set global api key, no need api key here
          //a p i K e y : c u r r e n t _ i n _ u s e _ e s r i C o n f i g a A p i K e y,
          id: "arcgis/streets",

          // warning:  must set places = all to show poi label !
          places: "all", //"attributed", //"none" returns the place's esri_place_id
          }),

        id: "EsriRoad", // use as key and radio display text and radio value
        title: "EsriRoad", //Not use because of warning: esri always change this title to "ArcGIS Streets",
        thumbnailUrl: "../../public/images/esri100.png",
      })


      esri_labels = new Basemap({

        style: new BasemapStyle({
          // because esriConfig set global api key, no need api key here
          //a p i K e y : c u r r e n t _ i n _ u s e _ e s r i C o n f i g a A p i K e y,
          id: "arcgis/imagery/labels",

          // warning:  must set places = all to show poi label !
          places: "all", //"attributed", //"none" returns the place's esri_place_id
        }),

        id: "EsriPlaceLabelOnly", // use as key and radio display text and radio value
        title: "EsriPlaceLabelOnly", //Not use because of warning: esri always change this title to "ArcGIS Imagery Labels", 
        thumbnailUrl: "../../public/images/esri100.png",
      })

         
            // . .  end . . . . esri . . .. . .




            base_map_source_array.unshift(
              esri_imagery, 
              //esri_imagery_standard,   // bug? no poi label
              //esri_road, 
              //esri_labels, 
            )
                     

}
    


    async function create_basemap(){  // async await for import arcgis module
            
      await create_rasterTile_basemap()
      await create_vectorTile_basemap()
    
      console.log('base_map_source_array', base_map_source_array)
        
    }
    

    //not use, this is for old base map widget (arcgis basemap gallery component)
    async function init_base_map_galleryComponent(){
      await create_basemap()
      setup_arcgis_basemap_gallery()
    }

    // for radio basemap
    async function init_base_map_radio(){
      await create_basemap()
      setup_radio_basemap()

    }





    var esri_basemap_id = 'Google'
    function setup_radio_basemap(){

      var radio_basemap_html = ''
     
      for (let i = 0; i < base_map_source_array.length; i++) {
        console.log("base map source array ", base_map_source_array[i]); // Accessing elements using the index
        radio_basemap_html += '<div>'
        radio_basemap_html += '<input name="basemap_radio" type="radio"  value="' + base_map_source_array[i].id + '"/>'
        radio_basemap_html += '<span>' + base_map_source_array[i].id + '</span>'
        radio_basemap_html += '</div>'
      }//for
   
      $("#radio-basemap-id").html(radio_basemap_html)


      //add event to radio
                urlParams = new URLSearchParams(window.location.search);
                var param_esri_basemap_id = urlParams.get('esriBaseMap'); 
                if (param_esri_basemap_id){
                    esri_basemap_id = param_esri_basemap_id
                }//if
                // first time set radio
                $("input[type=radio][name='basemap_radio'][value=" + esri_basemap_id + "]").prop('checked', true);
                // 1 time, 1st time set base map
                assign_basemap_by_id(esri_basemap_id)



                // radio change event
                $("input[type='radio'][name='basemap_radio']").change(function(){
                    esri_basemap_id = $("input[type='radio'][name='basemap_radio']:checked").val();
                    console.log(" esri_basemap_id ", esri_basemap_id);
                    console.log(" base_map_source_array ", base_map_source_array);
                    update_url_parameter('esriBaseMap', esri_basemap_id);
                    assign_basemap_by_id(esri_basemap_id)
                });

            // . . - -  end    . . - -   add event to radio  . . - - 


    }



    function assign_basemap_by_id(_assignToBaseMapID){

     

       // warning: esri always change this title to "ArcGIS Imagery", 
                    // when you look up basemap layer by element.title, must use "ArcGIS Imagery"
                    // custom title only used in radio text, keep here.
                    switch (_assignToBaseMapID) {
                      case "Esri(POI)":
                          arcgisMap.basemap = esri_imagery
                        break;
                      case "Esri(POI)Standard":
                          arcgisMap.basemap = esri_imagery_standard
                        break;
                      case "EsriRoad": 
                          arcgisMap.basemap = esri_road
                        break;
                      case "EsriPlaceLabelOnly":
                          arcgisMap.basemap = esri_labels
                        break;
                      
                      // for all others, google microsoft, here, mapbox,  
                      default:
                        // do not use e l e m e n t . t i t l e, because esri always change title to "ArcGIS Imagery"
                        arcgisMap.basemap = base_map_source_array.find(element => element.id === _assignToBaseMapID)
                    }

    }
    
      
    // for arcgis basemap gallery component
    function setup_arcgis_basemap_gallery(){ 

                          // only for basemap-gallery
                          document.querySelector("arcgis-basemap-gallery").source = base_map_source_array
                          document.querySelector("arcgis-basemap-gallery").disabled = false // true //false

                          //document.querySelector("arcgis-basemap-gallery").state = 'ready'
                          document.querySelector("arcgis-basemap-gallery").activeBasemap = google_hybrid

                          // fix bug, sometime, it does not pick google
                          arcgisMap.basemap = google_hybrid
                          // - -  end  - -   only for basemap-gallery



                          // for basemap toggle
                          //document.querySelector("arcgis-basemap-toggle").nextBasemap = google_hybrid
                          // re-set current base map  https://developers.arcgis.com/javascript/latest/references/map-components/arcgis-map/#basemap
                          //arcgisMap.basemap = google_hybrid
  
    }// function



     
   
/**/
//   --- end  ---   --- google as basemap for component only   --- 
/**/                      
                 
  
           









 /**/
                  //  --- papaparse   --- 
                  /**/
                  
                  var inputType = "string";
                  var stepped = 0, rowCount = 0, errorCount = 0, firstError;
                  var start, end;
                  var firstRun = true;
                  // do not limit length
                  //var maxUnparseLength = 1000000;
          
          
          
               
          
          
                  // must wait until csv parse completed at function completeFn
                  function parse_json_to_csv_string(_csv_ready_json){


                      
          
                      //  . . . papaparse  . . . demo . . .  https://www.papaparse.com/demo
          
                      stepped = 0;
                      rowCount = 0;
                      errorCount = 0;
                      firstError = undefined;
          

                      start = now();
                      var csv_string = Papa.unparse(_csv_ready_json, 
                     
                          // config see demo.js https://www.papaparse.com/demo
                          {
                            delimiter: ',', // The delimiting character. Usually comma or tab. Default is comma.
                            header: true, // Keys data by field name rather than an array.
                            dynamicTyping: true, // Turns numeric data into numbers and true/false into booleans.
                            //skipEmptyLines: true, // By default, empty lines are parsed; check to skip.
                            // preview: 100, //If > 0, stops parsing after this many rows.
                            // step: stepFn, // not use, only when very large file
                            // encoding: 'UTF-8', // Only applies when reading local files. Default is specified by the browser (usually UTF-8).
                            //worker: false, // Uses a separate thread so the web page doesn't lock up.
                            // comments: '',  // If specified, skips lines starting with this string.
                            complete: completeFn,
                            error: errorFn,
                            //download: true,
                          }
                        )

                        end = now();


                     // do not limit length   
                     // if (csv_string.length > maxUnparseLength){
                     //     csv_string = csv_string.substr(0, maxUnparseLength);
                     //      console.log("(Results truncated for brevity)");
                     // }
                  
                      console.log('final csv string ', csv_string);


                      return csv_string
                      
                      // . . . end  . . . papaparse  . . . 
          
                  }
           
            
                    function stepFn(results, parser)
                    {
                      stepped++;
                      if (results)
                      {
                        if (results.data)
                          rowCount += results.data.length;
                        if (results.errors)
                        {
                          errorCount += results.errors.length;
                          firstError = firstError || results.errors[0];
                        }
                      }
                    }
          
                    function completeFn(results)
                    {
                      end = now();
          
                      if (results && results.errors)
                      {
                        if (results.errors)
                        {
                          errorCount = results.errors.length;
                          firstError = results.errors[0];
                        }
                        if (results.data && results.data.length > 0)
                          rowCount = results.data.length;
                      }
          
                      printStats("Parse complete",  results);

                     
                      
          
                    }
          
          
          
          
          
          
                    function errorFn(err, file)
                    {
                      end = now();
                    }
          
          
                    function now()
                    {
                      return typeof window.performance !== 'undefined'
                          ? window.performance.now()
                          : 0;
                    }
          
          
          
                    function printStats(msg)
                    {
                      if (msg)
                        console.log(msg);
                      console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
                      console.log("  Row count:", rowCount);
                      if (stepped)
                        console.log("    Stepped:", stepped);
                      console.log("     Errors:", errorCount);
                      if (errorCount)
                        console.log("First error:", firstError);
                    }
          
          
          /**/
          //  --- end  ---  papaparse    --- 
          /**/
             

