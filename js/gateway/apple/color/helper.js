      
            
/**/
// ------- apple map only  -------
/*

helper2    only difference is looking for '// - - - special for circle overlay instead of annotation - - -'
and 
helper1 
difference:
difference:

       helper1 : point use annotation ( svg circle tag)
                 when zoom in/out,  annotation marker size remain same relative to screen size.

       helper2 : point use apple overlay.circle, same way as overly.polygon , overlay.polyline
                 when zoom in/out,  overlay.circle size remain same relative to earth. because overlay.circle size unit is meter. 
                 relative to user, screen, when zoom out, overlay.circle will become smaller and smaller.

*/
// --- end --- apple map only -------
/**/
      



/**/
// ------- apple map only  -------
/**/

      
      // ------- apple map only  -------
      function get_map_bound(){
        /*
               BoundingRegion 
                              number northLatitude,  - NElat
                              number eastLongitude,  - NElong
                              number southLatitude,  - SWlat
                              number westLongitude   - SWlong
                              
                              https://developer.apple.com/documentation/mapkitjs/mapkit/boundingregion/2973840-mapkit_boundingregion 
                              */
              
                              var bounds = map.region.toBoundingRegion();
                              var SWlong = bounds.westLongitude;
                              var SWlat = bounds.southLatitude;
                              var NElong = bounds.eastLongitude;
                              var NElat = bounds.northLatitude;
                              console.log('bounds', bounds, SWlong, SWlat, NElong, NElat)
                    
                           //   ********* envelope(arcgis rest api only) cross 180th Meridian  ************ 
                                 // when cross prime 0th meridian (SWlong <0)&&(NElong >0), tested with UK london data, arcgis server responds correctly without any fix here.
                                 // when cross prime 180th meridian (SWlong>0)&&(NElong <0), test with Alaska data, arcgis server responds incorrectly, query the opposite side of earth, get empty result. must fix here.
                                 if ((SWlong>0)&&(NElong <0)){
                                  var _cross_180_meridian_swLong = -(360 - SWlong)
                                  console.log(' !!!! cross_180_meridian_swLong !!!!', _cross_180_meridian_swLong)
                                  SWlong = _cross_180_meridian_swLong
                                }
                            //   ********* end ********* envelope(arcgis rest api only) cross 180th Meridian  ************ 
                            /**/

                  //-------------- arcgis server, rest API --------------------------------
                
                  // this is bad request, should not use layerDefs={'0':''}, instead should use FeatureServer/0/query?...
                  // http://services3.arcgis.com/VILr8UqX00eNAkeO/arcgis/rest/services/Parcels/FeatureServer/query?layerDefs={'0':''}&returnGeometry=true&f=json&geometryType=esriGeometryEnvelope&geometry={'xmin' : -117.923158, 'ymin' : 33.644081, 'xmax' : -117.921436, 'ymax' : 33.645157,'spatialReference' : {'wkid' : 4326}}
                  
                  // this is good one
                  // http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/333/query?f=pjson&returnCountOnly=false&outFields=*&outSR=4326&where=ASSETID = 1723459
                  // must specify &outSR=4326& in URL, because gis layer default srid is NOT 4326
                  // srid=4326 is only srid for lat long
                

                  // esri, by default, use esri:102100, 
                  //_envelope_111 = '{"spatialReference":{"latestWkid":3857,"wkid":102100},"xmin":-9178558.356484555,"ymin":3240929.9992936105,"xmax":-9177335.364031991,"ymax":3242152.991746176}';
                  
                  //var _envelope = '{"xmin" : -117.923158, "ymin" : 33.644081, "xmax" : -117.921436, "ymax" : 33.645157,"spatialReference" : {"wkid" : 4326}}';
                  var _envelope_un_encode ='{"spatialReference":{"wkid":4326}, "xmin" : '+ SWlong +', "ymin" : '+ SWlat + ', "xmax" : '+NElong +', "ymax" : '+ NElat + '}';
                  
                  // fix bug, _envelope must encodeURI( ), without this some city (tampagov.net)
                  // will show no-cross origine error, the real problem is envelope need encode
                  
                  _envelope = encodeURI(_envelope_un_encode);
                  console.log('_envelope --- encoded >>>', _envelope)


                


                  

                  console.log('layer id ---', _layer_id)
                            
                            // Note: must specify outFields=*, in order to get all properties, without this, properties= null
                            _url_returncountonly = _url + '/'+ _layer_id + '/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson&geometryType=esriGeometryEnvelope&geometry='+ _envelope;
                            

                          // no limit, rely on default maxRecordCount set by admin, usually is 2000, admin could reset it to very large number.  
                          _url_returngeojson = _url + '/'+  _layer_id + '/query'
                          _url_returngeojson += '?returnGeometry=true'
                          _url_returngeojson += '&outSR=4326'


                           /**/
                           // ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 


                           if (_maxAllowableOffset !== 0){
                                     _url_returngeojson += '&maxAllowableOffset=' + _maxAllowableOffset
                           }

                           // ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
                           /**/


                          _url_returngeojson += '&f=pjson'
                          _url_returngeojson += '&outFields=*'
                          _url_returngeojson += '&geometryType=esriGeometryEnvelope'
                          _url_returngeojson += '&geometry='+ _envelope;


                
                     /*

                                                    improvement: 
                                                
                                                    https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm

                                                    sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                                    example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0


                                                    if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10


                                                    since we not sure, we can only try both, if 100 not work, then get default 2000 

                                                */   

                            if (_supportsPagination){

                                      _url_returngeojson = _url + '/'+  _layer_id + '/query'

                                      
                                      _url_returngeojson += '?returnGeometry=true'
                                      _url_returngeojson += '&resultOffset=0'
                                      _url_returngeojson += '&resultRecordCount=' + limit
                                      _url_returngeojson += '&outSR=4326'
          
                                      /**/
                                      // ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 


                                      if (_maxAllowableOffset !== 0){
                                                _url_returngeojson += '&maxAllowableOffset=' + _maxAllowableOffset
                                      }

                                      // ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
                                      /**/
          
                                      _url_returngeojson += '&f=pjson'
                                      _url_returngeojson += '&outFields=*'
                                      _url_returngeojson += '&geometryType=esriGeometryEnvelope'
                                      _url_returngeojson += '&geometry='+ _envelope;


                            }






                            //--------- End ----- arcgis server, rest API --------------------------------
                  
                  
                  
        ajax_GeoJSON(_url_returncountonly, _url_returngeojson);
                  
     
      }// function get map bound




      function reset_all_overlay_style_to_default(){
        var current_overlay_array = map.overlays
        for (let i = 0; i < current_overlay_array.length; i++) {
          current_overlay_array[i].style = default_overlay_style;
        }
    }
  
    function reset_all_annotation_style_to_default(){
      console.log(' !!! reset !!! all !!!  annotation !!! style !!! to !!! default !!! ')
      var current_annotation_array = map.annotations
      for (let i = 0; i < current_annotation_array.length; i++) {
        current_annotation_array[i].element.innerHTML= default_icon;
      }
    }
  

    function create_overlay_with_build_in_properties(_properties, points){
        //console.log('create overlay with build  in  properties',  _properties, points )
        // create a polygon overlay sample https://developer.apple.com/documentation/mapkitjs/polygonoverlay
        //var points = [ [41, -109.05], [41, -102.05], [37, -102.05], [37, -109.05] ];
        // Map the raw coordinate points to MapKit JS Coordinate objects:
        var coordinate_array = points.map(function(point) {

          // warning:  coordinate(lat ,long), while geojson coordinate (long, lat)
          return new mapkit.Coordinate(point[1], point[0]);
        });

        var _polygon_overlay = new mapkit.PolygonOverlay(coordinate_array, default_overlay_style)

        _polygon_overlay.data = _properties
        map.addOverlay(_polygon_overlay);


        // fix bug, without this, always use apple default blue color for circle, until user move mouse on map, trigger mousemove event, then trigger this function. 
        reset_all_overlay_style_to_default()


    }// overlay 


    function create_annotation_with_build_in_properties(_properties, point){

                            //console.log('create annotation with build  in  properties',  _properties, point )

                            coordinate = new mapkit.Coordinate(point[1], point[0]);

                            // https://developer.apple.com/documentation/mapkitjs/geojsondelegate/2991192-itemforpoint

                            var factory = function(coordinate, options) {

                                                                            var div = document.createElement("svg")

                                                                            div.innerHTML = default_icon
                                                                            //div.textContent = 'test'
                                                                            // Using element's data attributes https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
                                                                            div.data = _properties
                                                                            
                                                                            // annotation hover event listener,  DOM element event, not apple mapkit event 
                                                                            div.addEventListener("mouseenter", function(event) {
                                                                                                                                          /*
                                                                                                                                            mouseenter will trigger multiple times and mouseleave failed to fire, 
                                                                                                                                            it is not because of I embed a svg image inside.
                                                                                                                                            it is because I change svg color by change div innert html content when hover.
                                                                                                                                            if do not change to svg highlight color , mouseenter will fire only 1 time, which is what i want.
                                                                                                                                         
                                                                                                                                              https://stackoverflow.com/questions/7286532/jquery-mouseenter-vs-mouseover
                                                                                                                                              https://stackoverflow.com/questions/1104344/what-is-the-difference-between-the-mouseover-and-mouseenter-events
                                                                                                                                              https://stackoverflow.com/questions/1638877/difference-between-onmouseover-and-onmouseenter
                                                                                                                                              warning mouseover do not work, because, mouseover fired when mouse is on both 'this' element and its 'children'(in this case, children element is svg icon tag)
                                                                                                                                              mouseover could be target on svg instead of wrapper div element. I only attach .data(property) attribute to div, not svg. 
                                                                                                                                              so event.target.data will be empty if mouseover target at svg. 

                                                                                                                                              mouseenter/mouseleave will only target on div element, not its child svg. 
                                                                                                                                              so event.target.data will always be div's data, which I always attached properties to. 
                                                                                                                                         

                                                                                                                                              console.log("annotation mouseenter hover event, DOM event ", event);
                                                                                                                                              console.log("annotation mouseenter hover event, DOM event  .target", event.target);
                                                                                                                                              console.log("annotation mouseenter hover event, DOM event  .target.innerHTML", event.target.innerHTML);
                                                                                                                                           */
                                                                                                                                         
                                                                                                                                          // not fixed bug, so not highlight svg icon when hover for now
                                                                                                                                          //event.target.innerHTML = highlight_icon  // this will cause mouseenter  trigger multiple times and mouseleave failed to fire, 
                                                                                                                                          
                                                                                                                                          show_info_outline_Tab(event.target.data)
                                                                            }); 


                                                                            div.addEventListener("mouseleave", function(event) {
                                                                                                                                  console.log("annotation mouse out event, DOM event", event);
                                                                                                                                  // not fixed bug, so not highlight svg icon when hover for now
                                                                                                                                  //event.target.innerHTML = default_icon // this will cause mouseenter  trigger multiple times and mouseleave failed to fire,                                                                                                                                           
                                                                                                                                  empty_info_outline_Tab()
                                                                            }); 


                                                                            return div;
                              
                            }; // factory 

                            

                            var options = {
                              // https://developer.apple.com/documentation/mapkitjs/annotationconstructoroptions             
                              data: _properties,
                              //size: { width: 30, height: 30 }, not working,  The desired dimensions of the annotation, in CSS pixels.  https://developer.apple.com/documentation/mapkitjs/annotation/2973833-size
                              enabled: true,

                            }
                            var annotation = new mapkit.Annotation(coordinate, factory, options);
                          
                            
                            // annotation icon image dom click event failed to trigger, use this apple event instead
                            annotation.addEventListener('select', function(event) {  

                                  console.log("select overlay. event", event);

                                  // reset all overlay style to default
                                  reset_all_annotation_style_to_default()
                                 
                                  // only change this selected overlay color
                                  event.target.element.innerHTML = classfiy_icon;
                                  show_listTab(event.target.data)

                            });
                            

                            map.addAnnotation(annotation);
                            return annotation;


                            


    }// annotaion

    function geojson_to_feature(single_whole_geojson){

      var features_array = single_whole_geojson.features
      var one_geojson_feature
      for (let i = 0; i < features_array.length; i++) {

        one_geojson_feature =  features_array[i] 
        var _the_geom_type = one_geojson_feature.geometry.type
        _the_geom_type = _the_geom_type.toLowerCase()
        console.log('controled zoom to real location . . . .  the geom type . . . . . ', _the_geom_type)

        var _coordinate_array
        var _coordinate_point
        if (_the_geom_type == 'point'){

                    _coordinate_point = one_geojson_feature.geometry.coordinates
                    create_annotation_with_build_in_properties(one_geojson_feature.properties, _coordinate_point)

                    // fix bug, if use annotation, must disable overlay event. otherwise overlay event will overwrite annotation event, cause it failed to function
                    document.querySelector("#map").removeEventListener("mousemove", mousemove_on_map_event_handler)
                    document.querySelector("#map").removeEventListener("click",click_on_map_event_handler) 
                    

        } else {
                      if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multipoint')){
                        _coordinate_array = one_geojson_feature.geometry.coordinates
                        create_overlay_with_build_in_properties(one_geojson_feature.properties, _coordinate_array)
                      }//if type = line 

                      if ((_the_geom_type == 'polygon') || (_the_geom_type == 'multilinestring')){
                        _coordinate_array = one_geojson_feature.geometry.coordinates[0]
                        create_overlay_with_build_in_properties(one_geojson_feature.properties, _coordinate_array)
                      }// type = Polygon  

                      if (_the_geom_type == 'multipolygon'){
                        var polygon_array = one_geojson_feature.geometry.coordinates
                        for (let i = 0; i < polygon_array.length; i++) {
                          _coordinate_array = polygon_array[i][0]
                          create_overlay_with_build_in_properties(one_geojson_feature.properties, _coordinate_array) 
                        }//for
                      }// type = multipolygon 
        }//if

      }



    }




    // DOM's map-element's hover and click event, only for polygon and line, not for point annotation marker
    // hover
    function mousemove_on_map_event_handler(event){

     

                var targetOverlay = map.topOverlayAtPoint(new DOMPoint(event.pageX, event.pageY));
                // Add special styling to the overlay to indicate its hover state or whatever you want.
                // ...

                //console.log('targetOverlay' ,  targetOverlay)

                // outside 'if' on hover, reset all overlay style to default
                reset_all_overlay_style_to_default()
                if (targetOverlay){
                          // only change this selected overlay color
                          targetOverlay.style = highlight_overlay_style;

                          //console.log('show properties' ,  targetOverlay.data)
                          show_info_outline_Tab(targetOverlay.data)
                } else {
                          empty_info_outline_Tab()
                }
     

    }


    // DOM's map-element's hover and click event, only for polygon and line, not for point annotation marker
     function click_on_map_event_handler(event){

      var targetOverlay = map.topOverlayAtPoint(new DOMPoint(event.pageX, event.pageY));
      // Add special styling to the overlay to indicate its hover state or whatever you want.
      // ...

      //console.log('targetOverlay' ,  targetOverlay)

      if (targetOverlay){
                // inside 'if' on click,reset all overlay style to default
                reset_all_overlay_style_to_default()
                
                // only change this selected overlay color
                targetOverlay.style = classfiy_overlay_style;

                //console.log('show properties' ,  targetOverlay.data)
                show_info_outline_Tab(targetOverlay.data)
              
      } else {

         empty_info_outline_Tab()

      }

    }

    // DOM's map-element's hover and click event, only for polygon and line, not for point annotation marker
    // hover
    function mouseleave_on_map_event_handler(event){
                empty_info_outline_Tab()
    }

    function add_mapdata_listener(){

      // only for annotation point
      var icon_size = 'width="' + (_default_pointRadius * 4) + '" height="' + (_default_pointRadius * 4) + '"'
      var icon_center_radius = 'cx="' + (_default_pointRadius * 2) + '" cy="' + (_default_pointRadius * 2) + '" r="' + (_default_pointRadius * 1.5) + '"'
      default_icon = default_icon_svg.replace('${outline_color}', _default_strokeColor).replace('${line_width}', _default_strokeWeight).replace('${fill_color}', _default_fillColor).replace('width="50" height="50"', icon_size).replace('cx="25" cy="25" r="20"', icon_center_radius)

      var icon_size = 'width="' + (_default_pointRadius * 4) + '" height="' + (_default_pointRadius * 4) + '"'
      var icon_center_radius = 'cx="' + (_default_pointRadius * 2) + '" cy="' + (_default_pointRadius * 2) + '" r="' + (_default_pointRadius * 1.5) + '"'
      highlight_icon = default_icon_svg.replace('${outline_color}', _highlight_strokeColor).replace('${line_width}', _highlight_strokeWeight).replace('${fill_color}', _highlight_color).replace('width="50" height="50"', icon_size).replace('cx="25" cy="25" r="20"', icon_center_radius)
      console.log('add map data  ,   highlight icon svg ', highlight_icon)


      var icon_size = 'width="' + (_default_pointRadius * 4) + '" height="' + (_default_pointRadius * 4) + '"'
      var icon_center_radius = 'cx="' + (_default_pointRadius * 2) + '" cy="' + (_default_pointRadius * 2) + '" r="' + (_default_pointRadius * 1.5) + '"'
      classfiy_icon = default_icon_svg.replace('${outline_color}', _classfiy_strokeColor).replace('${line_width}', _classfiy_strokeWeight).replace('${fill_color}', _classfiy_color).replace('width="50" height="50"', icon_size).replace('cx="25" cy="25" r="20"', icon_center_radius)
      console.log('add map data  ,   classfiy icon svg ', classfiy_icon)




      default_overlay_style = new mapkit.Style({
                                                  strokeColor: _default_strokeColor,
                                                  strokeOpacity: _default_strokeOpacity,
                                                  lineWidth: parseInt(_default_strokeWeight),  // apple only
                                                  fillOpacity: _default_fillOpacity,
                                                  fillColor: _default_fillColor,
                                              });

      highlight_overlay_style = new mapkit.Style({
                                                  strokeColor: _highlight_strokeColor,
                                                  strokeOpacity: _highlight_strokeOpacity,
                                                  lineWidth: _highlight_strokeWeight,
                                                  fillOpacity: _highlight_fillOpacity,
                                                  fillColor: _highlight_color,
                                            });

      classfiy_overlay_style = new mapkit.Style({
                                              strokeColor: _classfiy_strokeColor,
                                              strokeOpacity: _classfiy_strokeOpacity,
                                              lineWidth: _classfiy_strokeWeight,
                                              fillOpacity: _classfiy_fillOpacity,
                                              fillColor: _classfiy_color,
                                        });




      // not use, works, keep.  
      geoJSONParserDelegate = {

                                            // style https://developer.apple.com/documentation/mapkitjs/stylesoverlayoptions/2991311-style

                                            itemForFeature: function(item, one_geojson_feature) {

                                              console.log( ' Feature item , only this json have original properties', item  , one_geojson_feature)
                                              console.log( ' Feature item , only this json have original properties  00000 .data', item.data.coordinates)

                                              var _the_geom_type = one_geojson_feature.geometry.type
                                              _the_geom_type = _the_geom_type.toLowerCase()
                                              console.log('controled zoom to real location . . . .  the geom type . . . . . ', _the_geom_type)

                                              var _coordinate_array
                                              var _coordinate_point
                                              if (_the_geom_type == 'point'){

                                                          _coordinate_point = one_geojson_feature.geometry.coordinates
                                                          create_annotation_with_build_in_properties(one_geojson_feature.properties, _coordinate_point)

                                              } else {
                                                            if ((_the_geom_type == 'linestring') || (_the_geom_type == 'multipoint')){
                                                              _coordinate_array = one_geojson_feature.geometry.coordinates
                                                            }//if type = line 

                                                            if ((_the_geom_type == 'polygon') || (_the_geom_type == 'multilinestring')){
                                                              _coordinate_array = one_geojson_feature.geometry.coordinates[0]
                                                            }// type = Polygon  

                                                            if (_the_geom_type == 'multipolygon'){
                                                              _coordinate_array = one_geojson_feature.geometry.coordinates[0][0]
                                                            }// type = multipolygon  
                                                          
                                                            create_overlay_with_build_in_properties(one_geojson_feature.properties, _coordinate_array)
                                              }//if
                                            }, 

                                            /*

                                            not use, apple method, because apple does not provide a way to attach geojson properties to overlay object.

                                            styleForOverlay: function(overlay, json) {
                                                                                        console.log( ' style For Overlay, json not carry properties ', overlay  , json)
                                                                                      // map.addOverlay(overlay);
                                                                                        return default_overlay_style
                                            }, 

                                            // just for test, nothing to do
                                            itemForFeatureCollection: function(itemCollection, json) {
                                                                                        console.log( ' Feature itemCollection , only this json have original properties', itemCollection  , json)
                                                                                        console.log( ' Feature itemCollection , only this json have original properties 11111 .data', itemCollection.data)
                                                                                        console.log( ' Feature itemCollection , only this json have original properties 22222 .getFlattenedItemList', itemCollection.getFlattenedItemList)
                                                                                        console.log( ' Feature itemCollection , only this json have original properties 33333 .items', itemCollection.items)
                                            }, 
                                          
                                            */

                                          /*
                                              not use, because I use styleForOverlay instead for polygon and line

                                              itemForPolygon: function(overlay, json) {
                                                                      console.log( ' Polygon overlay ', overlay , json)
                                                                      // https://developer.apple.com/documentation/mapkitjs/polygonoverlay
                                                                      overlay.style = default_overlay_style
                                                                      overlay.visible = true;
                                                                      overlay.enabled = true;
                                                                      overlay.data = json;

                                                                      /*  works, but not use,  use map click event instead
                                                                      overlay.addEventListener('select', function(event) { 
                                                                      
                                                                            change_operation_mode('click')
                                                                            console.log("onmouseenter overlay. event", event);

                                                                            // reset all overlay style to default
                                                                            reset_all_overlay_style_to_default()


                                                                            // only change this selected overlay color
                                                                            event.target.style = classfiy_overlay_style;
                                                                            // also work
                                                                            // event.target.style.strokeColor = _classfiy_strokeColor

                                                                      });
                                                                      * /

                                                                      map.addOverlay(overlay);
                                                                      return overlay;
                                                                  },


                                              itemForLineString: function(overlay, json) {
                                                                    console.log( ' LineString overlay ', overlay , json)
                                                                    // https://developer.apple.com/documentation/mapkitjs/polylineoverlay
                                                                    overlay.style = default_overlay_style
                                                                    overlay.visible = true;
                                                                    overlay.enabled = true;
                                                                    overlay.data = json;

                                                                    /* works, but not use,  use map click event instead
                                                                    overlay.addEventListener('select', function(event) {  

                                                                          change_operation_mode('click')
                                                                          console.log("select overlay. event", event);

                                                                          // reset all overlay style to default
                                                                          reset_all_overlay_style_to_default()


                                                                          // only change this selected overlay color
                                                                          event.target.style = classfiy_overlay_style;
                                                                          // also work
                                                                          // event.target.style.strokeColor = _classfiy_strokeColor

                                                                    });
                                                                  * /

                                                                    map.addOverlay(overlay);
                                                                    return overlay;
                                                                },

                                          */

                                          /* point   
                                                itemForPoint: function(coordinate, json) {

                                                              console.log( ' Point coordinate ', coordinate , json)
                                                              // https://developer.apple.com/documentation/mapkitjs/geojsondelegate/2991192-itemforpoint

                                                              var factory = function(coordinate, options) {
                                                                var div = document.createElement("div")
                                                                div.innerHTML = default_icon
                                                                return div;
                                                              };

                                                              var options = {
                                                                // https://developer.apple.com/documentation/mapkitjs/annotationconstructoroptions
                                                              }
                                                              var annotation = new mapkit.Annotation(coordinate, factory, options);

                                                              annotation.addEventListener('select', function(event) {  

                                                                    console.log("select overlay. event", event);

                                                                    // reset all overlay style to default
                                                                    reset_all_annotation_style_to_default()

                                                                    // only change this selected overlay color
                                                                    event.target.element.innerHTML = highlight_icon;
                                                                  

                                                              });

                                                              map.addAnnotation(annotation);
                                                              return annotation;

                                                              /*
                                                                  not use, because circle overlay radius is meter, will becomes smaller and smaller when you zoom out, I need marker/annotation, fixed size. 
                                                                  //CircleOverlay
                                                                  var style = new mapkit.Style({
                                                                                                        strokeColor: _default_strokeColor,
                                                                                                        strokeOpacity: _default_strokeOpacity,
                                                                                                        lineWidth: _default_strokeWeight,
                                                                                                        fillOpacity: _default_fillOpacity,
                                                                                                        fillColor: _default_fillColor,
                                                                                                    });
                                                                  var radius = _default_pointRadius;
                                                                  var circle = new mapkit.CircleOverlay(coordinate, radius, style);
                                                                  map.addOverlay(circle);
                                                                  return circle;
                                                              * /


                                                              /*
                                                                  not use,
                                                                  // MarkerAnnotation
                                                                  var customMarker = new mapkit.MarkerAnnotation(coordinate, {
                                                                      color: _default_strokeColor,
                                                                      glyphColor: _default_strokeColor,
                                                                    // glyphImage: { 1: "glyphImage.png" },
                                                                    // selectedGlyphImage: { 1: "detailedIcon.png", 2: "detailedIcon_2x.png", 3: "detailedIcon_3x.png" }
                                                                  });
                                                                  map.addAnnotation(customMarker);
                                                                  return customMarker;
                                                                * /

                                          },
                                          */





                                            geoJSONDidComplete: function(result, geoJSON) {
                                                console.log('GeoJSONDelegate.geoJSONDidComplete 1');
                                                console.log('GeoJSONDelegate.geoJSONDidComplete 2 success-result', result);
                                                console.log('GeoJSONDelegate.geoJSONDidComplete 3 success-geoJSON', geoJSON);
                                            },
                                            geoJSONDidError: function(error, geoJSON) {
                                                console.log('GeoJSONDelegate.geoJSONDidError 1 ');
                                                console.log('GeoJSONDelegate.geoJSONDidError 2 error', error);
                                                console.log('GeoJSONDelegate.geoJSONDidError 2 error-geoJSON', geoJSON);
                                            }
      }; //geoJSONParserDelegate

      /*
          not use,  mapkit apple event, instead use DOM element event instead
          // https://developer.apple.com/documentation/mapkitjs/mapkit/overlays/adding_interactivity_to_overlays
          map.addEventListener('select', function(event) {
                                      if (event.overlay){
                                          console.log("map select event, You selected an overlay.");
                                      }
          });
       */
      // DOM's map-element's hover and click event, only for polygon and line, not for point annotation marker
      document.querySelector("#map").addEventListener("mousemove", mousemove_on_map_event_handler) 
      document.querySelector("#map").addEventListener("click", click_on_map_event_handler)
      //fix bug, when mouse leave map, should close info tab window
      document.querySelector("#map").addEventListener("mouseleave", mouseleave_on_map_event_handler)

    } //function 


    function add_map_listener_idle(){   

      map.addEventListener("region-change-end", function(event) {

        console.log("region-change-end   !!! map idle event   !!! ");
        update_center_latLngZoom();
        get_map_bound();
            
      });
    }

  

/**/
// --- end --- apple map only -------
/**/


 

          




  









              











          function init_settingTab(){


            // set init value on html
             
              $('#line_width_label').text(_default_strokeWeight);
              $('#line_width_range').val(_default_strokeWeight);

              

            

              $('#point_radius_label').text(_default_pointRadius);
              $('#point_radius_range').val(_default_pointRadius);




              $('#line_width_range').on('change', function() {

                var _line_width = $('#line_width_range').val();
                $('#line_width_label').text(_line_width);
                update_url_parameter('strokeWeight', _line_width);

                update_map_style()
              });


              







              $('#point_radius_range').on('change', function() {

                var _point_radius = $('#point_radius_range').val();
                $('#point_radius_label').text(_point_radius);
                update_url_parameter('pointRadius', _point_radius);

                update_map_style()
              });







              //  =============== color picker =======================

                    /**/
                        // . . . . line or polygon border line or point circle line stroke color  . . . .
                        console.log('init set _default_strokeColor ', _default_strokeColor)
                        
                        $('#symbol_color').val(_default_strokeColor);

                        var symbol_color = new iro.ColorPicker("#row_symbol_color", {
                                                                                      width: 150,   // Set the size of the color picker
                                                                                      color: _default_strokeColor, // Set the initial color to '#ffffff' //  init color set black does not work,  because it is a black circle, black ball.    Default googleLabelTextColor is black.
                                                                                    
                                                                                      //  setting   https://iro.js.org/advanced.html
                                                                                      layoutDirection: 'horizontal',  //  Default value: "vertical"  https://iro.js.org/colorPicker_api.html#options
                                                                                      layout: [
                                                                                                    { 
                                                                                                      component: iro.ui.Slider,
                                                                                                      options: {
                                                                                                        // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                        sliderType: 'hue'
                                                                                                      }
                                                                                                    },
                                                                                                    { 
                                                                                                      component: iro.ui.Slider,
                                                                                                      options: {
                                                                                                        // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                        sliderType: 'saturation'
                                                                                                      }
                                                                                                    },
                                                                                                    { 
                                                                                                      component: iro.ui.Wheel,
                                                                                                      options: {
                                                                                                        wheelLightness: false,  // must set false, default is true, black color will cause wheel dark to black. False, will make sure, wheel isn't dark when set color as black.
                                                                                                        wheelDirection: 'clockwise', 
                                                                                                        wheelAngle: 0
                                                                                                      }
                                                                                                    },
                                                                                                    { 
                                                                                                      component: iro.ui.Slider,
                                                                                                      options: {
                                                                                                        // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                        sliderType: 'value'
                                                                                                      }
                                                                                                    },
                                                                                                    { 
                                                                                                      component: iro.ui.Slider,
                                                                                                      options: {
                                                                                                        // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                                                                        sliderType: 'alpha'
                                                                                                      }
                                                                                                    },
                                                                                      ]// layout
                                                                                  });


                        symbol_color.on('color:change', function(color) {
                                                                                    // log the current color as a HEX alpha string  https://iro.js.org/color_api.html#constructor
                                                                                    var _symbol_color = color.rgbaString
                                                                                    $('#symbol_color').val(_symbol_color);
                                                                                    console.log(' stroke color changed new color is ',  _symbol_color)
                                                                                    update_url_parameter('strokeColor', _symbol_color);
                                                                                    update_map_style()
                                                        });

                        // . . . . line or polygon border line or point circle line stroke color  . . . .
                        /**/

                        /**/
                        // . . . . polygon fill color  . . . .
                              console.log('init set _default_fillColor ', _default_fillColor)
                              
                              $('#fill_color').val(_default_fillColor);


                              var fill_color = new iro.ColorPicker("#row_fill_color", {
                                  width: 200,   // Set the size of the color picker
                                  color: _default_fillColor, // Set the initial color to '#ffffff' //  init color set black does not work,  because it is a black circle, black ball.    Default googleLabelTextColor is black.
                                
                                  //  setting   https://iro.js.org/advanced.html
                                  layoutDirection: 'horizontal',  //  Default value: "vertical"  https://iro.js.org/colorPicker_api.html#options
                                  layout: [
                                                { 
                                                  component: iro.ui.Slider,
                                                  options: {
                                                    // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                    sliderType: 'hue'
                                                  }
                                                },
                                                { 
                                                  component: iro.ui.Slider,
                                                  options: {
                                                    // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                    sliderType: 'saturation'
                                                  }
                                                },
                                                { 
                                                  component: iro.ui.Wheel,
                                                  options: {
                                                    wheelLightness: false,  // must set false, default is true, black color will cause wheel dark to black. False, will make sure, wheel isn't dark when set color as black.
                                                    wheelDirection: 'clockwise', 
                                                    wheelAngle: 0
                                                  }
                                                },
                                                { 
                                                  component: iro.ui.Slider,
                                                  options: {
                                                    // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                    sliderType: 'value'
                                                  }
                                                },
                                                { 
                                                  component: iro.ui.Slider,
                                                  options: {
                                                    // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                                                    sliderType: 'alpha'
                                                  }
                                                },
                                  ]// layout
                              });

                              fill_color.on('color:change', function(color) {
                                                          // log the current color as a HEX alpha string  https://iro.js.org/color_api.html#constructor
                                                          var _fill_color = color.rgbaString
                                                          $('#fill_color').val(_fill_color);
                                                          console.log(' fill color changed new color is ',  _fill_color)
                                                          update_url_parameter('fillColor', _fill_color);
                                                          update_map_style()
                              });
                        // . . . . end  . . . . polygon fill color  . . . .
                        /**/
                        
              //  ======= end ======== color picker =======================

          }


          
                    
/**/

          
      function init_user_interface_event(){

                init_settingTab()
              
      }

