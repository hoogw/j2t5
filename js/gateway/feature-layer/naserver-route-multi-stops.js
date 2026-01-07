

              

            var stop_point_array = []
            var stop_count = 0


            var click_lng
            var click_lat
            var lng_comma_lat
            var markerSymbol

            dom_ready_dojo();

            // component
           
          //self-run
          (async function init_map_component_event(){ // without feature layer view

              // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
              arcgisMap = document.querySelector("arcgis-map")
                            arcgisMap.center = [_center_long, _center_lat]
                            arcgisMap.zoom = _center_zoom

              // component // reactive Utils . watch (
              arcgisMap.addEventListener("arcgisViewChange", (event) => {

                      console.log('arcgis View Change event',  event)
                      update_center_latLngZoom_esri_component(arcgisMap)
                        
              }); 

              // component // view . when 
              arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                            
                              // must place after  createa feature layer, other wise view is not ready, will cause error
                              init_view_ui()
                              
                              // if don't want google map, just delete this line
                              init_base_map_galleryComponent() 
                              
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                    
                      
              })

         })();


/**/
//  --- naserver  --- 
/**/


            route_map_event()


            // multi stop only 
            function route_map_event(){

                // component // view . on ( " click " , function(event){
                arcgisMap.addEventListener("arcgisViewClick", (event) => {
                                      
                                console.log(' view * click * fire 1 time is fine ', event)

                                click_lng = event.detail.mapPoint.longitude
                                click_lat = event.detail.mapPoint.latitude
                                lng_comma_lat = click_lng + ',' + click_lat


                                if (stop_count == 0){
                                  arcgisMap.graphics.removeAll();
                                  clear_direction()
                                }
                                stop_count += 1
                                create_graphic_point(click_lng, click_lat, stop_count)
                                stop_point_array.push(lng_comma_lat)

                          }); // view . on . click


            }

            
/**/
//  --- end  ---  naserver   --- 
/**/





        
        
            async function dom_ready_dojo(){


                          

            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/


            
         
            init_background_layer()
                                
            init_user_interface_event()
         init_user_interface_for_component()
                           
        } // dom ready



              






        
/**/
//  --- naserver  --- 
/**/

        


  
// only for multi stops

async function create_graphic_point(____lng, ____lat, ____index){
  



          // First create a point geometry 
          var point = {
            type: "point", // autocasts as new Point()
            longitude: ____lng,
            latitude: ____lat
          };

          // Create a symbol for drawing the point
          if (____index % 2 !== 0 ){
                          markerSymbol = {
                                  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                  style: "circle",
                                  color: [39, 66, 245, 0.376],
                                  size: "31px",  // pixels
                                  outline: {  // autocasts as new SimpleLineSymbol()
                                    color: [255,255,0,0.676],
                                    width: 3  // points
                                  }
                          };
          } else {
                      markerSymbol = {
                                    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                    style: "square",
                                    color: "red",
                                    size: "31px",  // pixels
                                    outline: {  // autocasts as new SimpleLineSymbol()
                                      color: [255,0,255],
                                      width: 3  // points
                                    }
                      };    
            
          }

       
          
          // Create a graphic and add the geometry and symbol to it
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });

          // Add the graphics to the view's graphics layer
          return arcgisMap.graphics.add(pointGraphic);

}





 const lineSymbol = {
      type: "simple-line", // autocasts as new SimpleLineSymbol()
      color: [226, 119, 40], // RGB color values as an array
      width: 4
    };

var polyline
var direction_html



function clear_direction(){
     $('#info-window-div').html("")
     $('#direction-details-steps').html("")
}

async function create_route_multi_stops(stop_point_array){



  var multi_stops_string = stop_point_array.join(";")


// api https://developers.arcgis.com/rest/routing/route-service-direct/
  var route_solve_url = background_layer_url + "/Route/solve?f=pjson&outSR=4326" + "&stops=" +  multi_stops_string

  var route_response = await ajax_getjson_common(route_solve_url)

  var route_json = JSON.parse(route_response)

  console.log("route_response ", route_json)

  if (route_json.error){
    // error 
    $('#info-window-div').html(route_json.error.details[0] + "   " + route_json.error.message)
  } else {

    // display route feature line
    var route_feature_array = route_json.routes.features
    var route_feature

    for (let i = 0; i < route_feature_array.length; i++) {

        route_feature = route_feature_array[i]


        // Create a line geometry with the coordinates of the line
        polyline = {
          type: "polyline", // autocasts as new Polyline()
          paths: route_feature.geometry.paths
        };

        
          // Create the graphic
        const polylineGraphic = new Graphic({
          geometry: polyline, // Add the geometry created in step 3
          symbol: lineSymbol, // Add the symbol created in step 4
          attributes: route_feature.attributes // Add the attributes created in step 5
        });

        // Add the graphic to the view's default graphics view
        // If adding multiple graphics, use addMany and pass in the array of graphics.
        arcgisMap.graphics.add(polylineGraphic);

    }//for 






    // display direction text
    var route_direction_array = route_json.directions
    var route_direction
    var direction_array

    for (let j = 0; j < route_direction_array.length; j++) {
      route_direction = route_direction_array[j]

      direction_html =  '<fieldset>'
      direction_html += '<legend>'
      direction_html +=   'Route : ' +  route_direction.routeId + '. ' + route_direction.routeName
      direction_html += '</legend>'

      direction_html +=  '<span>Driving Time:</span><span id="drive-time" style="font-weight:900;">' + route_direction.summary.totalDriveTime.toFixed(2) + '</span> mins'
      direction_html +=  '&nbsp;&nbsp;&nbsp;&nbsp;'
      direction_html +=  '<span>Distance:</span><span id="distance" style="font-weight:900;">' + route_direction.summary.totalLength.toFixed(2) + '</span> miles'
      //direction_html +=  '<br>'
      
      direction_array = route_direction.features
      for (let d = 0; d < direction_array.length; d++) {
        direction_html +=  '<br>'
        direction_html += '<span id="distance" style="font-weight:900;">' + d + '</span>' + '. ' + direction_array[d].attributes.text

      }//for

      direction_html += '</fieldset>'

      $('#direction-details-steps').html(direction_html)
              
     }//for 

  }//if 



}

            


/**/
//  --- end  ---  naserver   --- 
/**/




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
         
        $("#find-route-btn").on("click", function(){
            create_route_multi_stops(stop_point_array)
        });


        $("#clear-all-btn").on("click", function(){
            clear_direction()
            arcgisMap.graphics.removeAll();
            stop_point_array = []
            stop_count = 0
        });

      }



     // component
               function init_view_ui(){  // component

              
                   


      }// init ui



    
                 
             





                 
        
   


          







