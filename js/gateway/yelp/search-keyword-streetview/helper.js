 
 









 



 
 
 /**/
 
 

 /**/

           
                function get_map_bound(){
                  if (map.getBounds()){     
                 
                   


                          // get current map bounds as URL parameters. 
                            
                            var bounds = map.getBounds();
                            var southWest = bounds.getSouthWest();
                            var northEast = bounds.getNorthEast();
                            var SWlong = southWest.lng();
                            var SWlat = southWest.lat();
                            var NElong = northEast.lng();
                            var NElat = northEast.lat();
                              
                            
                            console.log(' get map bound, SWlong ', SWlong )
                            console.log(' get map bound, NElong ', NElong )
                            


                      //   ********* envelope(arcgis rest api only) cross 180th Meridian  ************ 



                      
                           // how to identify if bounding box cross 180 meridian?
                           // SWlong always less than NElong, otherwise, means cross 180 meridian

                            if (SWlong>NElong){


                              // bounding box cross 180 meridian :  SWlong>NElong
                              // bounding box NOT cross 180 meridian :  SWlong<NElong

                              // when cross prime 0th meridian, tested with UK london data, arcgis server responds correctly without any fix here.

                              // when cross prime 180th meridian (SWlong>NElong, test with Alaska data)
                               
                                

                                  // Case 1: 
                                  // without adjust, arcgis server responds incorrectly, query the opposite side of earth, get empty result. must fix here.
                                  


                                  // Case 2: 
                                  var  _cross_180_meridian_swLong = -(360 - SWlong)
                                      SWlong = _cross_180_meridian_swLong
                                    // NWlong = SWlong;      // NWlong are not needed in arcgis rest api envelop, not needed in socrata bbox bound box.  
                             


                                 // case 3:  same result as case 2
                                 // make it global
                                // SWlong = -180
                                // NElong = +180

                              console.log(' !!!! cross_180_meridian_swLong !!!!', SWlong)
                              console.log(' !!!! cross_180_meridian_NELong !!!!', NElong)

                              
                            }

                       




                  //   ********* end ********* envelope(arcgis rest api only) cross 180th Meridian  ************ 
                  
                  
                        
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
                            
                            





                            var _bbox = {"spatialReference":{"wkid":4326}, "xmin" : SWlong , "ymin" : SWlat , "xmax" : NElong , "ymax" :  NElat };       
                    


                           
       
                            if (current_overlaytype == 'overlayType_image') {
       
                                          // map tile is not available, use export image
                                          overlay_export_image(_url, _bbox, _layer_id)
                                     
                                          
                            }
       
                          
          
          
   
   
                            
                            
                            
                  ajax_GeoJSON(_url_returncountonly, _url_returngeojson);
                            


                  



              }// if map.getBounds()
                                  
                                  
                }// function get map bound


/**/
    
               
                function  overlay_export_image(mapservice_url, bbox, layers){
  
                      console.log(' overlay export image ',  layers, bbox )
  
  
                      var imageBounds = {
                        north: bbox.ymax,
                        south: bbox.ymin,
                        east: bbox.xmax,
                        west: bbox.xmin,
                      };
  
  
  
  
                      var map_div_width = map.getDiv().offsetWidth;
                      var map_div_height = map.getDiv().offsetHeight;
  
  
                      var map_div = document.getElementById('map');
                      var map_div_width = map_div.offsetWidth;
                      var map_div_height = map_div.offsetHeight;
  
  
  
  
  
  
  
                      
  
  
                      var _south_west_point_long_lat_array = [bbox.xmin,    bbox.ymin]
                      var _north_east_point_long_lat_array = [bbox.xmax,    bbox.ymax]
                      var _imageSR_param = '&imageSR=4326'
                      var _bboxSR_param = '&bboxSR=4326'
  
                     

                      

                    // original map is 4326, imageSR=4326, boxSR=4326 , exported image do not align with true polygon boundary. always have little off-align, maybe it is bug of arcgis server
                          // work around is re-project 4326(WGS 1984) to 3875(ESRI prefer 102100 is 3875)
                          // 4326(is WGS 1984) used in arcgis online, google map, bing map, etc.......
                          // arcgis document recommend use  wgs 1984, if you want overlay on google map, bing maps, however, it has bug, not works https://desktop.arcgis.com/en/arcmap/latest/map/publish-map-services/designing-a-map-to-overlay-arcgis-online-google-maps-and-bing-maps.htm
                     

                    // no matter what spatial reference always use ESRI prefered 3857 ( 102100 )
                   // if (spatial_reference == 102100) {


                          // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                          _south_west_point_long_lat_array = proj4(wgs84_EPSG_4326,target_projection_EPSG_3857, [bbox.xmin,    bbox.ymin]);
                          _north_east_point_long_lat_array = proj4(wgs84_EPSG_4326,target_projection_EPSG_3857, [bbox.xmax,    bbox.ymax]);
 
                           console.log(' proj4   _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
                           console.log(' proj4   _north_east_point_long_lat_array',  _north_east_point_long_lat_array )
 
                           _imageSR_param = '&imageSR=102100';
                           _bboxSR_param = '&bboxSR=102100';
                   //  }
 
 
 
                      
                           /*  
                           
                           // original map is 4326, if directly use 4326 , exported image will always off-alignment with true location, this is bug on arcgis server, can't use until esri fix it.    
 
                     if (spatial_reference == 4326) {
 
                          
 
                          
                               _south_west_point_long_lat_array = [bbox.xmin,    bbox.ymin];
                               _north_east_point_long_lat_array = [bbox.xmax,    bbox.ymax];
 
                               console.log(' default 4326,    _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
                               console.log(' default 4326,    _north_east_point_long_lat_array',  _north_east_point_long_lat_array )
 
 
                               // if original map is 4326, no need specify imageSR, bboxSR, will use default as original map(4326) 
                               //_imageSR_param = '&imageSR=4326';
                              // _bboxSR_param = '&bboxSR=4326';
                               _imageSR_param = '';
                               _bboxSR_param = '';
 
                     }
                        */
 
 
 
 
  
  
  
  
  
  
  
                      var export_image_url = mapservice_url + '/export?dpi=96&f=image'
  
  
                         export_image_url += '&format=png32'  // png does not work with transparency setting, should use png32
                         export_image_url += '&transparent=true'
  
  
                          export_image_url += _imageSR_param
  
                          export_image_url += '&layers=show:'+ layers  // layers is only 1 layer id. currently not allow multi layer, for multi layer,  use show: 1,2,3
                          export_image_url += '&size=' +  map_div_width + ',' +  map_div_height            // The size (width and height) of the exported image in pixels , should be google map view width and height in pixel
                          
                          export_image_url += _bboxSR_param
  
  
  
                          export_image_url += '&bbox=' + _south_west_point_long_lat_array[0] + ',' +  _south_west_point_long_lat_array[1] + ',' +  _north_east_point_long_lat_array[0] + ',' +   _north_east_point_long_lat_array[1]
  

                          
  
  
                      console.log(' export image url  ', export_image_url, layers, bbox )
  
  
                      
  
  






                  /**/ 
                  //  =========== add image loading progressing bar   ===========     

                        //How to detect progress, image loaded for GroundOverlay
                        //https://stackoverflow.com/questions/10833465/how-to-detect-progress-loaded-for-groundoverlay


                            // nested function
                            var _imageOnLoadEventHandler = function(){

                              console.log(' ground Overlay Image onload event , image loaded completed')
                              
                             
                              
                            }


                            if (groundOverlayImage){
                  
                                      // last time exportImage exist, re-use last time Image() object, do not create a new one.
                                      groundOverlayImage.src = export_image_url

                                      
                                      

                            } else {
                                      groundOverlayImage = new Image();
                                      groundOverlayImage.crossOrigin = 'anonymous';
                                      groundOverlayImage.alt = 'failed to load overlay image';

                                      groundOverlayImage.src = export_image_url
                                      
                                      groundOverlayImage.onload =  _imageOnLoadEventHandler
                                      groundOverlayImage.onerror = function(){
                                        console.log(' ground Overlay Image ERROR error ERROR failed to load overly image')
                                       
                                      }
                          }
                       
                        
                  //  =========== end   ===========  add image loading progressing bar   ===========   
                  /**/ 












  
                     // must remove last time old overlay before add a new one
                     if (groundoverlay) {
                           groundoverlay.setMap(null);
                     } 
  
                      groundoverlay = new google.maps.GroundOverlay(
                        export_image_url,
                        imageBounds,
                        {
                           clickable: true,
                           map: map,
                           opacity: image_opacity
  
                        }
                      );
                      groundoverlay.setMap(map);
  
  
  
  
                }
  

                    function reduce_feature_count(___arcgis_feature_Set, ___reduced_feature_count){
                
                      //  console.log('___arcgis_feature_Set', ___arcgis_feature_Set)

                        var __features_array = ___arcgis_feature_Set.features
                  

                        if ( __features_array.length > ___reduced_feature_count) {

                          __features_array.length = ___reduced_feature_count

                        }
                      

                        ___arcgis_feature_Set.features = __features_array;



                        console.log(' after reduced feature count === ', ___arcgis_feature_Set.features.length)

              return ___arcgis_feature_Set



                    

                    }  



                        //  +++++++++ ********* +++++++++    map tile   +++++++++ ********* +++++++++  

                        async function get_maptile(_url_mapservice){


                          

                          // must trigger re-load export image by trigger get_map_bound, or move map a liitle bit
                          get_map_bound()

                      /*



                              Tile overlay google map

                                                https://gis.stackexchange.com/questions/99659/how-do-i-implement-google-maps-api-v3-image-map-type

                                                https://stackoverflow.com/questions/4596597/google-maps-api-v3-custom-tiles

                                                  2 sample, 2 way

                                                  ImageMapType  
                                                      map.overlayMapTypes.push(imageMapType)
                                                          https://jsfiddle.net/hoogw/dtL147w2/1/



                                                  CoordMapType
                                                      map.overlayMapTypes.insertAt( 0, new CoordMapType(new google.maps.Size(256, 256)));
                                                              https://jsfiddle.net/hoogw/m94qy82z/





                      */





                      var _url_mapservice_json = _url_mapservice +  '?f=pjson'


                      

                        var _mapservice 
                        
                        
                        
                        
                        
                        try {


                          // test only
                          // throw ' ++++++++ test only ++++++++ jsonp failed';


                          // jsonp 


                          var response_string = await $.ajax({
                                                  
                                                  type: 'GET',
                                                  dataType: 'jsonp',
                                                  data: {},
                                                  url: _url_mapservice_json,
                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                    
                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                          console.log('ajax error  + ', _error_status);
                                                                      
                                                  },
                                                  success: function (data) {
                                                    console.log('get maptile, map server json --> jsonp --> success  --> ');
                             
                                                  }
                                                });  // await



                 
                        } catch(jsonp_failed) {
                      
                      
                                                    console.log('get maptile, map server json  --> jsonp failed !!!!!!', jsonp_failed);
                      
                                                   try {
                      
                                                                 
                      
                      
                      
                                                                  // test only
                                                                  // throw ' ++++++++ test only ++++++++ cors failed'; 
                                                  
                                                                  // cors
                                                                  var response_string =  await $.ajax({ 

                                                                    type: 'GET',
                                                                    
                                                                    url: _url_mapservice_json,
                                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                                      
                                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                            console.log('ajax error  + ', _error_status);
                                                                                        
                                                                    },
                                                                    success: function (data) {
                                                                      console.log('get maptile, map server json --> cors --> success  --> ');
                                               
                                                                    }
                                                                  });  // await                                                



                                                  } catch(cors_failed) {

                                                                  console.log('get maptile, map server json  --> cors failed !!!!!!', cors_failed);
                      
                                                                  try {
                      
                                                                            
                      
                                                                            // proxy
                                                                            // --------- add proxy  ---------
                                                                            var _url_mapservice_json_proxy = proxyurl +  _url_mapservice_json
                      
                                                                            var response_string =  await $.ajax({

                                                                              type: 'GET',
                                                                    
                                                                              url: _url_mapservice_json_proxy,
                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                
                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                  
                                                                              },
                                                                              success: function (data) {
                                                                                console.log('get maptile, map server json --> proxy --> success  --> ');
                                                         
                                                                              }
                                                                            });  // await 



                                                                  } catch(proxy_failed) {


                                                                            console.log('get maptile, map server json  --> proxy failed !!!!!!', proxy_failed);
                              
                              
                              
                                                                          } // catch proxy
                                                                    
                              
                                                            } // catch cors
                              
                              
                                                      } // catch jsonp
                              


                                                                                
                                          // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                          if (typeof response_string === 'object') {
                                              // is object
                                              _mapservice = response_string
                                          } else {
                                              // is string
                                              _mapservice = JSON.parse(response_string)
                                          }





                                          console.log('mapservice', _mapservice)
                                          
                                          spatial_reference_mapserver = _mapservice.spatialReference.wkid
                                          singleFusedMapCache = _mapservice.singleFusedMapCache

                                          console.log('single Fused Map Cache tile , wkid ',spatial_reference_mapserver, singleFusedMapCache )



                                    /*
                                       Warning: .capabilities is not accurate,
                                              for example 'usgs pad' have tile, but does not have 'tilemap' in their capability. 
                                    
                                       for MapServer, FeatureServer, only  "capabilities": "Data,Map,Query,Tilemap",
                                       for ImageServer only "capabilities": "Image,Mensuration,Metadata,Tilemap",

                                        Tilemap : means tile is available
                                        Map or Image : means image is available
                                        Query :  featureServer only have 'Query', both image and tile are not available
                                    
                                    */
                                      var _capabilities = _mapservice.capabilities 
                                      console.log('_capabilities ', _capabilities )

                                      

                                      
                                      
                                       
                        }
                        //  +++++++++ ********* end  +++++++++    map tile   +++++++++ ********* +++++++++  





































        

              
                                        
                                          
                                       
                                
                   









// --------------------- total count ------------------------







            // rest api specific, this is only for arcgis rest api
            function show_count(data_count_only){



              //{ 'count': 1661}

              // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
              //is already a plain JavaScript object; no need to try to parse it.
             
              if (typeof data_count_only === 'object') {
                  // is object
                  _current_area_count_of_feature = data_count_only.count
              } else {
                  // is string
                  _current_area_count_of_feature = JSON.parse(data_count_only).count
              }
              



              
              display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)
             

            }

















                  function add_mapdata_listener(){
                    set_map_style(_default_strokeColor,_default_strokeWeight, _default_fillColor , _default_pointRadius)
                    /**/
                    //  --- yelp POI marker update      --- 
                    /**/
                      // click listener
                        map.data.addListener('click', function(event) {
                            // silence esri feature hover and click
                        });    

                      // mouse over listener
                        map.data.addListener('mouseover', function (event) {  
                          // silence esri feature hover and click
                        });

                          // mouse out listener
                        map.data.addListener('mouseout', function (event) {
                            // silence esri feature hover and click
                        });
                    /**/
                    //  --- end  ---  yelp POI marker update    --- 
                    /**/
                  }















          // ----------  add map listener idle ---------- 

          function add_map_listener_idle(){   
                                                        
                                                
                                                        
            listener_idle =  map.addListener('idle', function() {   

              console.log('  !!! map idle event   !!! ')
              update_center_latLngZoom();
            
              get_map_bound();
                             
            });



             /**/
            // -- -- --  POI marker replace point geojson  -- -- -- 
                          // delete  set poi style                   
            // -- -- --  end -- -- --  POI marker replace point geojson -- -- -- 
            /**/


             /**/
            //  -  -  - guided ring for pan and zoom  -  -  - 
            /**/
                // all should works,  bounds_changed, center_changed, drag
                map.addListener("bounds_changed", (event) => {

                  update_center_latLngZoom()
                  // . .   limit by bound, lat lng with minium radius
                  _center_radius_in_meter = get_center_radius_in_map_bound()


                  // yelp always use circle for both s e a r c h k e y w o r d & c a t e g o r y,
                  // only d r a w   c i r c l e when radius large than max 
                  clear_circle_guideRing() // always clear last time guide ring
                  if (_center_radius_in_meter == max_yelp_poi_radius_meter){
                      drawing_circle_guideRing(_center_radius_in_meter, _center_long, _center_lat)
                  }//if
              
                 

                });

            /**/
            //  -  -  - end  -  -  -  guided ring for pan and zoom    -  -  - 
            /**/

          }



          //  - - - -  end  - - - -   ----------  add map listener idle ---------- 











              

                                      
            function update_url_parameter(_field, _value){
                                      
              var _____searchParams = new URLSearchParams(window.location.search);

              if ((_value !== 0) && ((_value == null) || (_value == '') || (_value.length == 0)) ){
              //if (_value.length == 0){   // layer id could be 0,  (0 == null) (0 == '') are all true, I actually want it be false since 0 is a valid layer id.  undefined/null or empty string is invalid layer id. so use  (layer-id.length == 0)
                       // remove this param from uRL
                          _____searchParams.delete(_field);
                          console.log("delete url parameter: _field", _field );
              } else {
                      // update this param from uRL
                          _____searchParams.set(_field, _value);
                          console.log("update url parameter: _field _value", _field + " + "+ _value);
              }

              // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
              //window.location.search = searchParams.toString();

              // instead avoid reload
              var _____newRelativePathQuery = window.location.pathname + '?' + _____searchParams.toString();
              history.pushState(null, '', _____newRelativePathQuery);

             


            } 




        










               /**/      
               // ========= setting tab ==============   
                          
                  function set_map_style(____strokeColor, ____strokeWeight, ____fillColor , ____circle_radius){

                                  map.data.setStyle({
                                                          // icon only affect point 
                                                          icon        : {
                                                                            //path: google.maps.SymbolPath.CIRCLE,
                                                                            path: svg_icon_path_pin1,

                                                                            // ---  ---  marker-icon,label, size change based on zoom level  ---  ---  --- 
                                                                            //scale: ____circle_radius,
                                                                            scale: Math.floor(google_marker_icon_scale_by_zoom_level[_center_zoom] / 2),


                                                                            strokeColor: ____strokeColor, 
                                                                            strokeOpacity: 0.9,  // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                                                            strokeWeight: ____strokeWeight
                                                                          },

                                                          // affect polygon and polyline  
                                                          fillOpacity: _default_fillOpacity,   // must set 1,  because fill color channel '4' already has opacity value, if not set 1, will cause color not solid
                                                          fillColor: ____fillColor,
                                                          strokeColor: ____strokeColor,
                                                          strokeWeight: ____strokeWeight
                                    
                                });
                  }

                  function update_map_style(){

                      _default_strokeColor = $('#symbol_color').val();
                      _default_strokeWeight = $('#line_width_range').val();
                      _default_fillColor = $('#fill_color').val();
                      _default_pointRadius = $('#point_radius_range').val();
                      console.log('line stroke symbol color change to  .... ... .. .',  _default_strokeColor)
                      console.log('line stroke symbol width change to  .... ... .. .',  _default_strokeWeight)
                      console.log('polygon fill color change to  .... ... .. .',  _default_fillColor)
                      console.log('point size change to  .... ... .. .',  _default_pointRadius)

                      set_map_style(_default_strokeColor, _default_strokeWeight, _default_fillColor, _default_pointRadius)
                  }

               // ========= end =========  setting tab ==============       


                















            




             













  /**/


            //  -------------------  - zoom 2 this layer -  ------------------- 


                                                
            async function zoom2thisLayer(_this_layer_id){

              console.log(' zoom to this layer-id ', _this_layer_id)

                    
              /* 
                  
                  if the layer have feature, just get a few sample feature as real location

                  if the layer is image only, no feature, get 0 sample. 
                                should use extend info as real location.

                
              */

                                

                                        var _use_thisLayer_sample_feature_result = await use_thisLayer_sample_feature(_this_layer_id)
                                        console.log('  use thisLayer sample feature result ', _use_thisLayer_sample_feature_result)

                                        if (_use_thisLayer_sample_feature_result) {
                                                
                                                console.log('successfully use thisLayer sample feature to improve best viewing, zoom-in to single feature level  - -> - - > : ', _center_lat, _center_long, _center_zoom )

                                        } else {

                                                console.log('thisLayer maybe have image only, no feature, get 0 sample.  ::::::  ', _center_lat, _center_long, _center_zoom )



                                                //  use extent ,  fast, only need 2 very quick ajax call, 1 for layer_json, 2 for mapserver_json 
                                                // after 2 quick ajax call, in the projection process, most of time, use projection method, 'default' or 'esri_proj', no ajax call, no await.  Only 'read_from_string'+proj4  need await, ajax call.
                                                // how ever, extent may not have best result, because it is too far away, we use sample feature to improve zoom in to single feature level.
                                                await use_thisLayer_extent(_this_layer_id)
                                        }


            } 




        async function use_thisLayer_sample_feature(_thislayer_id){


              


              //=============== in use :  &where=1=1 ===========================



                                        /*

                                            improvement: 
                                        
                                            https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm

                                            sometime, supportsPagination is false, not support,  can only use :  where=1=1,  get maxRecordCount (default is 2000)
                                            example:  not support pagination  https://rmgsc.cr.usgs.gov/arcgis/rest/services/contUS/MapServer/0


                                            if supportsPagination is true, we only need first 100 by use:    where=1=1&resultOffset=0&resultRecordCount=10


                                            since we not sure, we can only try both, if 100 not work, then get default 2000 

                                        */     




              var _url_thislayer_sample_json = _url + '/'+  _thislayer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1';


              /*  To simplify, skip pagination 

                    if (_supportsPagination){

                    
                            _url_sample_json = _url + '/'+  _layer_id + '/query?returnGeometry=true&outSR=4326&f=pjson&outFields=*&where=1=1&resultOffset=0&resultRecordCount=' + _sample_count;

                    }
              */


                
    
            var _thislayer_sample_json = {};


          // console.log('url thislayer sample json url  supportsPagination : ',_supportsPagination,  _url_sample_json)
                                      


            



            
            try {


                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';


                  // jsonp 


                  var response_string =  await $.ajax({

                      // large data take long long time , so should not time out, let it run until get it
                      //timeout: _timeout,

                        type: 'GET',
                        dataType: 'jsonp',
                        data: {},
                        url: _url_thislayer_sample_json,
                        error: function (jqXHR, textStatus, errorThrown) {
                          
                          var _error_status = textStatus + ' : ' + errorThrown;         
                                                console.log('ajax error  + ', _error_status);
                                              


                        },
                        success: function (data) {

                          console.log('zoom to this layer , use sample feature --> jsonp --> success  --> ');
                            
                        
                        }
                      });  // await



              
              } catch(jsonp_failed) {


                    console.log('zoom to this layer  , use sample feature,  --> jsonp failed !!!!!!', jsonp_failed);

                  try {

                                



                                  // test only
                                  // throw ' ++++++++ test only ++++++++ cors failed'; 
                  
                                  // cors
                                  var response_string =  await $.ajax({

                                                                        // large data take long long time , so should not time out, let it run until get it
                                                                      // timeout: _timeout,


                                                                          type: 'GET',
                                                                          
                                                                          url: _url_thislayer_sample_json,
                                                                          error: function (jqXHR, textStatus, errorThrown) {
                                                                            
                                                                            var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                  console.log('ajax error  + ', _error_status);
                                                                                              
                                                  
                                                  
                                                                          },
                                                                          success: function (data) {

                                                                            console.log('zoom to this layer  , use sample feature --> cors --> success  --> ');
                          
                                                                          }
                                                                        });  // await




                                  
                    
                    } catch(cors_failed) {

                                  console.log('zoom to this layer  , use sample feature,  --> cors failed !!!!!!', cors_failed);

                                  try {

                                            

                                            // proxy
                                            // --------- add proxy  ---------
                                            var _url_thislayer_sample_json_proxy = proxyurl +  _url_thislayer_sample_json

                                            var response_string =  await $.ajax({

                                                                                      // large data take long long time , so should not time out, let it run until get it
                                                                                      // timeout: _timeout,


                                                                                      type: 'GET',
                                                                                      
                                                                                      url: _url_thislayer_sample_json_proxy,
                                                                                      error: function (jqXHR, textStatus, errorThrown) {
                                                                                        
                                                                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                              console.log('ajax error  + ', _error_status);
                                                                                                          
                                                              
                                                              
                                                                                      },
                                                                                      success: function (data) {
                                                                                        console.log('zoom to this layer  , use sample feature --> proxy --> success  --> ');
                          
                                                                                      }
                                            });  // await




                                          



                                  } catch(proxy_failed) {


                                    console.log('zoom to this layer  , use sample feature,  --> proxy failed !!!!!!', proxy_failed);



                                  } // catch proxy
                            

                    } // catch cors


              } // catch jsonp




              // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
              if (typeof response_string === 'object') {
                  // is object
                  _thislayer_sample_json = response_string
              } else {
                  // is string
                  _thislayer_sample_json = JSON.parse(response_string)
              }

              


              console.log(' >>>>>>>> this layer sample json  feature array [] >>>>>>  ', _thislayer_sample_json.features);



            if (
                  (typeof (_thislayer_sample_json.features)  == 'undefined' )
                  || (typeof (_thislayer_sample_json.error) !== 'undefined' )
                ){

                      /*
                          raster layer do not have sample feature, will return error like this: 

                            {  error: {code: 400, message: "Invalid or missing input parameters.", details: []} }
                      
                            features[] array is 'undefined'
                                        //return false;
                      */

                      get_map_bound()

            } else {




                    
                      // parse an ArcGIS feature set (Geometry) to GeoJSON
                                    //console.log(' before convert, arcgis json ', arcgis_feature_Set) 
                                      
                      // Terraformer does not support Feature Set, only support single arcgis geometry.
                      // sometime, they use 'OBJECTID_1' instead of default 'OBJECTID', you must specify it, 
                                    // otherwise, geojson id will not match object-id, 
                                    // or geojson id is same number or null, cause failed to show geojson on map 
                                    //_geojson_object = Terraformer.arcgisToGeoJSON(arcgis_feature_Set,'OBJECTID_1')
                      var _sample_geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(_thislayer_sample_json, objectid_field_name)







                      //  "type": "FeatureCollection"

                      var _sample_coordinates;

                      // array of features for test
                      var _sample_feature =[]; 


                      if (_sample_geojson_object.type.toLowerCase() ===  "featurecollection") 
                      {
                        _sample_feature = _sample_geojson_object.features

                      } else if (_sample_geojson_object.type.toLowerCase() ===  "feature") {

                        // only 1 element 
                        _sample_feature.push(_sample_geojson_object)
                      }



                      console.log ('sample feature array[] ', _sample_feature )






                      if (_sample_feature.length > 0 ) {


                              // layer have feature, just get a few sample feature as real location


                              /**/

                                            // arcgis &where=1=1 by default have 1k or 2k record
                                            for (var s = 0; s < _sample_feature.length; s++) {
                
                                                    // if anything wrong, try next sample feature
                                                    try {
                
                                                                if (_sample_feature[s].geometry.type.toLowerCase() ===  "geometrycollection") 
                                                                {
                                                                  _sample_coordinates = _sample_feature[s].geometry.geometries[0].coordinates;
                                                                } else  {
                
                                                                  _sample_coordinates = _sample_feature[s].geometry.coordinates;
                                                                }
                
                                                                      console.log (' sample coordinates .....sample feature[',  s,  ']' , _sample_coordinates )
                
                                                                      // "type": "Point",  "coordinates": [100.0, 0.0]
                                                                      // "type": "LineString",  "coordinates": [  [101.0, 0.0], [102.0, 1.0]   ]
                                                                      //  "type": "Polygon",  "coordinates": [  [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ] ]
                                                                            
                
                                                                      // [long, lat]
                                                                      var _sample_lat_lng_array_pair = _recursive_nested_array(_sample_coordinates);
                                                                      console.log ('_sample_lat_lng_array_pair ++++++ ', _sample_lat_lng_array_pair )
                                                                        
                
                                                                      if ((_sample_lat_lng_array_pair[1] > -90) &&
                                                                          (_sample_lat_lng_array_pair[1] < 90) &&
                                                                            (_sample_lat_lng_array_pair[0] < 180) &&
                                                                              (_sample_lat_lng_array_pair[0] > -180))
                                                                              { 
                
                                                                                    _center_lat = _sample_lat_lng_array_pair[1];
                                                                                    _center_long = _sample_lat_lng_array_pair[0];
                                                                                    
                                                                                    
                                                                                    
                                                                                    console.log('layer have feature, just get a few sample feature as real location,   first_lat_long - -> - - > : ', _center_lat, _center_long, _center_zoom )

                                                                                    panto_googlemaps( _center_lat, _center_long, _center_zoom )  
                                                                                    
                                                                                    // sample feature success  
                                                                                    return true  //exit function
                                                                        
                                                                              } // if   
                
                
                
                                                    } catch(error_get_sample_feature){
                
                                                              console.log ('  if anything wrong, try next sample feature ', error_get_sample_feature )
                
                
                                                                      //"jumps over" one iteration in the for loop
                                                                      continue;
                
                                                    } // try              
                
                                                                  
                                            }// for

                                            

        
                        } else {

                                
              
                                    // sample feature failed  
                                    console.log( ' sample feature failed  ')
                                    return false

                        } // if

                


              } // if error       
                      

        } 




              async function use_thisLayer_extent(_thislayerID){



                /**/

                var _url_layer_extent = _url + '/'+  _thislayerID + '?f=pjson';
                var _url_server_extent = _url  + '/'   +  '?f=pjson';             // could be 'map server' or 'image server'


                
              

                console.log( '_url_layer_extent , ', _url_layer_extent)
                console.log( '_url_server_extent, ', _url_server_extent)



                

                var _layer_extent_json
                var _server_extent_json  // could be 'map server' or 'image server'





                //  layer extent
                try {
                  


                  // test only
                  // throw ' ++++++++ test only ++++++++ jsonp failed';

                  // jsonp 


                  var response_string =  await $.ajax({

                                                
                                                    type: 'GET',
                                                    dataType: 'jsonp',
                                                    data: {},

                                                    url:_url_layer_extent,



                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                      
                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                            console.log('ajax error  + ', _error_status);
                                                                          


                                                    },
                                                    success: function (data) {

                                                      console.log('use extent,  layer json  --> jsonp success ');
                                                        
                                                      
                                                    }
                                                  });  // await

                    } catch(jsonp_failed) {


                          console.log('use extent,  layer json --> jsonp failed !!!!!!', jsonp_failed);

                          try {
                            // cors

                            // test only
                            // throw ' ++++++++ test only ++++++++ cors failed'; 

                            var response_string =  await $.ajax({

                                                              

                                                                  type: 'GET',
                                                                  
                                                                  url:_url_layer_extent,

                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                    
                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                          console.log('ajax error  + ', _error_status);
                                                                                        
                                          
                                          
                                                                  },
                                                                  success: function (data) {
                                                                    console.log('use extent,  layer json  -->  --> cors  --->   success  ');
                                                                      
                                                                    
                                                                  }
                                                                });  // await

                              
                            } catch(cors_failed) {
                                                                
                          
                                        console.log('use extent,  layer json  --> --> cors failed !!!!!!', cors_failed);


                                        try {
                                          // proxy

                                          // --------- add proxy  ---------
                                          var _url_layer_extent_proxy = proxyurl + _url_layer_extent


                                          var response_string =  await $.ajax({
  

                                                                                  type: 'GET',
                                                                                  
                                                                                  url:  _url_layer_extent_proxy,

                                                                                  error: function (jqXHR, textStatus, errorThrown) {
                                                                                    
                                                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                          console.log('ajax error  + ', _error_status);
                                                                                                        
                                                          
                                                          
                                                                                  },
                                                                                  success: function (data) {
                                                                                    console.log('use extent,  layer json  -->  --> proxy  --->   success  ');
                                                                                      
                                                                                    
                                                                                  }
                                                                                });  // await


                                        

                                        } catch(proxy_failed) {

                                          console.log('use extent,  layer json  --> --> proxy failed !!!!!!', proxy_failed);



                                        } // catch proxy
                            

                          } // catch cors


                    } // catch jsonp



                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                    if (typeof response_string === 'object') {
                        // is object
                        _layer_extent_json = response_string
                    } else {
                        // is string
                        _layer_extent_json = JSON.parse(response_string)
                    }


                    





                //  mapserver extent
                try {
                  


                    // test only
                    // throw ' ++++++++ test only ++++++++ jsonp failed';

                    // jsonp 


                var response_string =  await $.ajax({

                                                
                                                    type: 'GET',
                                                    dataType: 'jsonp',
                                                    data: {},

                                                    url:_url_server_extent,



                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                      
                                                      var _error_status = textStatus + ' : ' + errorThrown;         
                                                                            console.log('ajax error  + ', _error_status);
                                                                          


                                                    },
                                                    success: function (data) {

                                                      console.log('use extent,  server json  --> --> jsonp success ');
                                                        
                                                        
                                                    }
                                                  });  // await

                    } catch(jsonp_failed) {


                          console.log('use extent,  server json --> jsonp failed !!!!!!', jsonp_failed);

                          try {
                            
                          
                                        // test only
                                        // throw ' ++++++++ test only ++++++++ cors failed'; 

                                        // cors
                                        var response_string =  await $.ajax({

                                                                          

                                                                              type: 'GET',
                                                                              
                                                                              url:_url_server_extent,

                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                
                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                    
                                                      
                                                      
                                                                              },
                                                                              success: function (data) {

                                                                                console.log('use extent,  server json  --> cors  --->    success  ');
                                                                                  
                                                                              }
                                                                            });  // await



                                                                            
                                      
                                        



                              } catch(cors_failed) {


                                      console.log('use extent,  server json --> cors failed !!!!!!', cors_failed);

                                      try {
                                        // proxy

                                        // --------- add proxy  ---------
                                        var _url_server_extent_proxy = proxyurl + _url_server_extent

                                                  var response_string =  await $.ajax({
                                                                                              type: 'GET',
                                                                                              
                                                                                              url:  _url_server_extent_proxy,

                                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                                
                                                                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                                                                                      console.log('ajax error  + ', _error_status);
                                                                                                                    
                                                                                              },
                                                                                              success: function (data) {
                                                                                                console.log('use extent,  server json  --> proxy  --->    success  ');
                                                                                                  
                                                                                                
                                                                                              }
                                                  });  // await



                                        
  
                                                



                                      } catch(proxy_failed) {


                                        console.log('use extent,  server json --> proxy failed !!!!!!', proxy_failed);

                                      } // catch proxy
                            

                            } // catch cors
                              
                              
                  } // catch jsonp





                      
                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                if (typeof response_string === 'object') {
                    // is object
                    _server_extent_json = response_string
                } else {
                    // is string
                    _server_extent_json = JSON.parse(response_string)
                }



                var _zoom_beforeLayerExtent
                var _zoom_afterLayerExtent
                var _zoom_afterServerExtent
                
                var _zoomto_status = false

                var _layer_extent_object
                var _server_extent_object  // could be 'map server' or 'image server'

              // 'layer' json    only have  'extent'
              // 'map server'   json  have  'initExtent'  'fullExtent'
              // 'image server' json  have  'extent'      'initExtent'  'fullExtent'


                // try layer extent first,  

                if (_layer_extent_json.extent) {
                                                    _layer_extent_object = _layer_extent_json.extent
                } else if (_layer_extent_json.initialExtent) {
                                                    _layer_extent_object = _layer_extent_json.initialExtent
                } else if (_layer_extent_json.fullExtent) {  
                                                    _layer_extent_object = _layer_extent_json.fullExtent
                } else {

                        // ('image server' do not have layer) will end up here
                        console.log( ' zoom to layer extent failed, layer json do not have  - extent - ')
                        _zoomto_status = false
                }


                if (_layer_extent_object) {
                                                _zoom_beforeLayerExtent = map.getZoom()
                                                console.log( '_zoom_beforeLayerExtent ......... ', _zoom_beforeLayerExtent)
                                                                                                            
                                                // will map.fitBound(),  must use await because this function call ajax, need to wait until resolve promise. 
                                                await zoom_to_esri_extent(_layer_extent_object)

                                                _zoom_afterLayerExtent = map.getZoom()
                                                console.log( '_zoom_afterLayerExtent ......... ', _zoom_afterLayerExtent)
                }

                






                
                if (! _zoomto_status){



                                if (_server_extent_json.extent) {
                                                                    _server_extent_object = _server_extent_json.extent
                                } else if (_server_extent_json.initialExtent) {
                                                                    _server_extent_object = _server_extent_json.initialExtent
                                } else if (_server_extent_json.fullExtent) {  
                                                                    _server_extent_object = _server_extent_json.fullExtent
                                } else {
                                        console.log( ' zoom to Server extent failed, Server json do not have  - any extent - ')
                                        _zoomto_status = false
                                }




                                if (_server_extent_object) {

                                            //layer extent is whole world, zoom level will be 1, then try mapserver extent
                                            await zoom_to_esri_extent(_server_extent_object)

                                            _zoom_afterServerExtent = map.getZoom()
                                            console.log( '_zoom_afterServerExtent ......... ', _zoom_afterServerExtent)
                                }

                }


              
              

                
                
                  





              }


              // the others function will re-use pan-to-real-location related function

              /**/


//  -------------------  end  ------------------- - zoom 2 this layer -  ------------------- 



/**/



function init_user_interface_after_map_load(){

//  .......  search poi button   ....... 
    // search bar close icon clicked. clear everything.
    
    $('#search_poi_button').on('click', search_poi);
    // default search
    $('#search_poi_input').on('search', search_poi);
//  ---  end  ---  .......  search poi button   ....... 

 // must at each model, instead of share
              $("#start_over_button").on("click", function() {

              clear_all_circle()
              clear_circle_guideRing()


              // only for marker label
              clear_all_poi_advancedMarker()

              // only for old marker
              //clear_all_poi()

              });
  
//  .......  opacity   ....... 
                                /**/
                                      // init control
                                      $('#overlay_opacity_label').text( parseInt(image_opacity * 10));
                                      $('#overlay_opacity_range').val(parseInt(image_opacity * 10));

                                      $('#overlay_opacity_range').on('change', function() {

                                                var _overlay_opacity = $('#overlay_opacity_range').val();
                                                $('#overlay_opacity_label').text( _overlay_opacity);
                                                update_url_parameter('overlayOpacity', _overlay_opacity);

                                                // all image and tile use single opacity value
                                                image_opacity = _overlay_opacity / 10;

                                                // set image only
                                                if (groundoverlay){
                                                  groundoverlay.setOpacity(image_opacity)
                                                }
                                                 
                                                // set tile opacity
                                                for (var l = 0, len = map.overlayMapTypes.length; l < len; l++){
                                                                                //map.overlayMapTypes[0].setOpacity(0.25);
                                                                                //map.overlayMapTypes.getAt(0).setOpacity(0.5);
                                                                                if (map.overlayMapTypes.getAt(l)){
                                                                                    map.overlayMapTypes.getAt(l).setOpacity(image_opacity);
                                                                                }
                                                }// for  

                                      });



                                //  .......  end    .......    opacity    ....... 

                                
/**/
                //  --- Google traffic    --- 
                /**/

                const trafficLayer = new google.maps.TrafficLayer();

                $('#show_traffic_checkbox').change(function(){
                  if ($(this).is(':checked')) {

                      console.log('traffic layer checked');
                      trafficLayer.setMap(map);

                  } else {
                    
                      console.log('traffic layer uncheck');
                      // hide traffic layer
                      trafficLayer.setMap(null);
                  }
              });  


              
/**/
//    ---  end  --- Google traffic    --- 
/**/


}


            



