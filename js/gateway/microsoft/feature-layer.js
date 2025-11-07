




var map
var datasource
var datasource_highlight
var featureLayerGeojson_datasource
var featureLayerGeojson_datasource_highlight
var popup
var searchInput
//  --- microsoft circle       --- 
var circle_datasource;
       













        


function get_map_bound(){

    // api https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.data.boundingbox?view=azure-maps-typescript-latest#azure-maps-control-atlas-data-boundingbox-getsouthwest

    var camera = map.getCamera()
    console.log('map.getCamera()', camera )
    var bounds = map.getCamera().bounds;
    console.log('map.getCamera().bounds',  bounds)
    
    SWlong = bounds[0];
    SWlat = bounds[1];
    NElong = bounds[2];
    NElat = bounds[3];

    _center_long = map.getCamera().center[0]
    _center_lat = map.getCamera().center[1]
    _center_zoom = map.getCamera().zoom


    NW = new atlas.data.Position(SWlong, NElat)
    SW = new atlas.data.Position(SWlong, SWlat)
    NE = new atlas.data.Position(NElong, NElat)
    SE = new atlas.data.Position(NElong, SWlat)


    update_url_parameter("_center_lat", _center_lat)
    update_url_parameter("_center_long", _center_long)
    update_url_parameter("_center_zoom", _center_zoom)

   

    /**/
    //  --- Microsoft feature layer   --- 
    /**/

    var _latlngzoom_html = ''
    //_latlngzoom_html +='visible area : '
    _latlngzoom_html += 'center(lat:' + _center_lat.toFixed(3)
    _latlngzoom_html += ',lng:' + _center_long.toFixed(3) + ')'
    _latlngzoom_html += ',zoom:' + _center_zoom.toFixed(1)
    $("#lat-lng-zoom").html(_latlngzoom_html)


/**/
//  --- end  ---  Microsoft feature layer    --- 
/**/




}







            /**/
            //  --- Microsoft map image layer   --- // -- without -- basemap ---- version - - -
            /**/



            // -- without -- basemap ---- version - - -
            function  overlay_export_image(mapservice_url, bbox, layers){
  
                 console.log(' overlay export image ',  layers, bbox )

                 // An array of positions for the corners of the image listed in clockwise order: [top left, top right, bottom right, bottom left].
                 var NW_topLeft = [bbox.xmin, bbox.ymax]
                 var NE_topRight = [bbox.xmax, bbox.ymax]
                 var NE_bottomRight = [bbox.xmax, bbox.ymin]
                 var NE_bottomLeft = [bbox.xmin, bbox.ymin]

                 var imageBounds_coordinates_array = [
                    NW_topLeft,
                    NE_topRight,
                    NE_bottomRight,
                    NE_bottomLeft
                 ]



              
                // not accurate, not use,  map div width height
                //var map_div = document.getElementById('map');
                //var map_div_width = map_div.offsetWidth;
                //var map_div_height = map_div.offsetHeight;
                
                 // map class https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/map-class
                 //var map_div_width = map.getMapContainer().offsetWidth
                 //var map_div_height = map.getMapContainer().offsetHeight

                 var map_div_width = map.getCanvas().width
                 var map_div_height = map.getCanvas().height

                 console.log('map div width, height,  for overlay export image ',  map_div_width, map_div_height )




                var _south_west_point_long_lat_array = [bbox.xmin,    bbox.ymin]
                var _north_east_point_long_lat_array = [bbox.xmax,    bbox.ymax]
                var _imageSR_param = '&imageSR=4326'
                var _bboxSR_param = '&bboxSR=4326'

                // proj4(fromProjection[, toProjection, coordinates [x, y]  [long, lat])
                _south_west_point_long_lat_array = proj4(wgs84_EPSG_4326,target_projection_EPSG_3857, [bbox.xmin,    bbox.ymin]);
                _north_east_point_long_lat_array = proj4(wgs84_EPSG_4326,target_projection_EPSG_3857, [bbox.xmax,    bbox.ymax]);
                console.log(' proj4   _south_west_point_long_lat_array',  _south_west_point_long_lat_array )
                console.log(' proj4   _north_east_point_long_lat_array',  _north_east_point_long_lat_array )
                _imageSR_param = '&imageSR=102100';
                _bboxSR_param = '&bboxSR=102100';
               

                var export_image_url = mapservice_url + '/export?dpi=96&f=image'

                    export_image_url += '&format=png32'  // png does not work with transparency setting, should use png32
                    export_image_url += '&transparent=true'
                    export_image_url += _imageSR_param

                    export_image_url += '&layers=show:'+ layers  // layers is only 1 layer id. currently not allow multi layer, for multi layer,  use show: 1,2,3
                    export_image_url += '&size=' +  map_div_width + ',' +  map_div_height            // The size (width and height) of the exported image in pixels , should be google map view width and height in pixel
                    
                    export_image_url += _bboxSR_param

                    export_image_url += '&bbox=' + _south_west_point_long_lat_array[0] + ',' +  _south_west_point_long_lat_array[1] + ',' +  _north_east_point_long_lat_array[0] + ',' +   _north_east_point_long_lat_array[1]

                    console.log(' export image url  ', export_image_url, layers, bbox )


                                  // must remove last time old overlay before add a new one
                                  if (map.layers.getLayerById("mapImageLayerID")) {
                                    map.layers.remove(groundoverlay);
                                  } 
                                  // Overlay https://learn.microsoft.com/en-us/azure/azure-maps/map-add-image-layer
                                  groundoverlay = new atlas.layer.ImageLayer({
                                    coordinates: imageBounds_coordinates_array,
                                    url: export_image_url,
                                    opacity: image_opacity, 
                                  }, "mapImageLayerID");

                                 

                                  console.log(' ground Overlay object', groundoverlay)


                                // fix bug, add try block , map ready event may not ready 
                                try{

                                    // -- only for basemap version  -- 
                                    // data source layer id, means geojson feature layer, so map image layer should add under(before) it
                                    //map.layers.add(groundoverlay, datasource_layer_id);
                                    // -- end -- only for basemap version  -- 
                                    

                                    // -- without -- basemap ---- version - - - 
                                    map.layers.add(groundoverlay, 'JK');  // other options labels, traffic_relative
                                    
                                    console.log('after add map image layer, geojson feature layer,  data source layer id ', datasource_layer_id)
                                    console.log('after add map image layer, now all layers index ',  map.layers.layerIndex)
                                } catch {
                     
                                }


              


            }




            /**/
            //  --- end  ---  Microsoft map image layer    --- 
            /**/






/**/
//  --- Microsoft feature layer   --- 
/**/


 

        function add_map_event(){

            // map event https://github.com/Azure-Samples/AzureMapsCodeSamples/blob/main/Samples/Map/Map%20Events/Map%20Events.html
        
            // idle not working, repeatly trigger event endlessly
            //map.events.add('idle', function(){
            // in use
            map.events.add('moveend', function(){

                get_map_bound()
                ajax_GeoJSON()


            });


            

                map.events.add('click', function(event){

                    console.log('you click map, event ', event)
                   
                 

                });

                


        
        }










        function add_data_maps(data) {

                    

                                
                                            
            // fix SyntaxError: Unexpected token o in JSON at position 1 at JSON.parse (<anonymous>)                      
            //is already a plain JavaScript object; no need to try to parse it.
            var arcgis_feature_Set
            if (typeof data === 'object') {
                // is object
                arcgis_feature_Set = data
            } else {
                // is string
                arcgis_feature_Set = JSON.parse(data)
            }



            arcgis_feature_Set = reduce_feature_count(arcgis_feature_Set, limit)  




            _current_rendering_feature = arcgis_feature_Set.features.length
            display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)

        
            // parse an ArcGIS feature set (Geometry) to GeoJSON
                                    //console.log(' before convert, arcgis json ', arcgis_feature_Set) 
                            
            // Terraformer.ArcGIS.convert(geoJSON, options),  options default is objectid, FID, if you want use OID, must specify
            //http://terraformer.io/arcgis-parser/#arcgisconvert
            // sometime, they use 'OBJECTID_1' instead of default 'OBJECTID', you must specify it, 
                                    // otherwise, geojson id will not match object-id, 
                                    // or geojson id is same number or null, cause failed to show geojson on map 
                                    //_geojson_object = Terraformer.arcgisToGeoJSON(arcgis_feature_Set,'OBJECTID_1')
            _geojson_object = ArcgisToGeojsonUtils.arcgisToGeoJSON(arcgis_feature_Set, objectid_field_name)

            console.log('_geojson_object' , _geojson_object)

            if (featureLayerGeojson_datasource){

                featureLayerGeojson_datasource.clear()
                        
                featureLayerGeojson_datasource.add(_geojson_object)
            }//if
            

        }






        function ajax_GeoJSON() {
                        

            var _url_returngeojson


            var _url_returncountonly


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
                                    








                                    
                    
            //  ***** abort previously  ajax call   ***** 
                if (___XMLHttpRequest_data){
                if (typeof ___XMLHttpRequest_data.abort !== "undefined"){

                    console.log('___XMLHttpRequest_data - xhr ', ___XMLHttpRequest_data)

                    // abort will cause jsonp call back error(normal, no need fix) :  Uncaught ReferenceError jqueryxxxxx_xxxxx  is not defined
                    ___XMLHttpRequest_data.abort()  


                }
                }



                // abort previously all ajax call
                if (___XMLHttpRequest_count_only){
                if (typeof ___XMLHttpRequest_count_only.abort !== "undefined"){

                    console.log('___XMLHttpRequest_count_only - xhr ', ___XMLHttpRequest_count_only)

                    // abort will cause jsonp call back error(normal, no need fix) :  Uncaught ReferenceError jqueryxxxxx_xxxxx  is not defined
                    ___XMLHttpRequest_count_only.abort()
                }
                }
            //  ******* end ***** abort previously  ajax call   *****  






        $('#error_message').empty();




        console.log('ajax url--count only --> : ', _url_returngeojson);
        console.log('ajax url-- with-geometry ---> : ', _url_returngeojson);




        // count only

        /**/


        try{



        // test only
        //throw ' ++++++++ test only ++++++++ jsonp failed';

        // jsonp
        $.ajax({
                                    timeout: _timeout,
                                    type: 'GET',
                                    dataType: 'jsonp',
                                    data: {},

                                    beforeSend:  function( jqXHR, settings ){

                                    ___XMLHttpRequest_count_only = jqXHR
                                    },
                                

                                    url: _url_returncountonly,
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        
                                        var _error_status = textStatus + ' : ' + errorThrown;         
                                        console.log(' count only , jsonp  error  : ', _error_status);

                                    

                                    },
                                    success: function (data) {


                                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                    if (typeof data === 'object') {
                                        // is object
                                        data_count_only = data
                                    } else {
                                        // is string
                                        data_count_only = JSON.parse(data)
                                    }
                                    
                                    
                                    show_count(data_count_only)
                                        
                                    }
                                });   

                                
                                

        } catch(jsonp_failed) {


        console.log('count only - jsonp failed ', jsonp_failed)

        try{



                        // test only
                        //throw ' ++++++++ test only ++++++++ cors failed'; 

            // cors
                $.ajax({
                                            timeout: _timeout,
                                            type: 'GET',
                                            


                                            beforeSend:  function( jqXHR, settings ){

                                                ___XMLHttpRequest_count_only = jqXHR
                                            },



                                            url: _url_returncountonly,
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                
                                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                console.log('count only - cors error  : ', _error_status);

                                            

                                            },
                                            success: function (data) {

                                                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                if (typeof data === 'object') {
                                                    // is object
                                                    data_count_only = data
                                                } else {
                                                    // is string
                                                    data_count_only = JSON.parse(data)
                                                }
                                                
                                                
                                                show_count(data_count_only)
                                                
                                            }
                }); 



            

        } catch (cors_failed){

                                console.log('count only - cors failed ', cors_failed)

                                
                                try {

                                // proxy
                                // --------- add proxy  ---------
                                var _url_returncountonly_proxy = proxyurl +  _url_returncountonly

                                
                                $.ajax({


                                                timeout: _timeout,
                                                type: 'GET',
                                            


                                                beforeSend:  function( jqXHR, settings ){

                                                ___XMLHttpRequest_count_only = jqXHR
                                                },



                                                url: _url_returncountonly_proxy,
                                                error: function (jqXHR, textStatus, errorThrown) {
                                                    
                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                    console.log('count only - proxy error  : ', _error_status);

                                                

                                                },
                                                success: function (data) {

                                                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                if (typeof data === 'object') {
                                                    // is object
                                                    data_count_only = data
                                                } else {
                                                    // is string
                                                    data_count_only = JSON.parse(data)
                                                }
                                                
                                                
                                                show_count(data_count_only)
                                                
                                            }
                                }); 



                                


                                } catch(proxy_failed) {

                                console.log('count only - proxy failed ', proxy_failed)

                                } // catch proxy

        }// catch cors

        }// catch jsonp













        // data

        try{



        // test only
        //throw ' ++++++++ test only ++++++++ jsonp failed';
        
        // jsonp  
        $.ajax({  

                            timeout: _timeout,
                            type: 'GET',
                            dataType: 'jsonp',
                            data: {},
                            url: _url_returngeojson,



                        beforeSend:  function( jqXHR, settings ){

                            ___XMLHttpRequest_data = jqXHR
                        },


                            error: function (jqXHR, textStatus, errorThrown) {
                                
                                var _error_status = textStatus + ' : ' + errorThrown;         
                                                    console.log('data - jsonp, error  : ', _error_status);

                            },
                            
                            success: function (data) {



                                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                if (typeof data === 'object') {
                                    // is object
                                    data_only = data
                                } else {
                                    // is string
                                    data_only = JSON.parse(data)
                                }
                            
                            
                                
                                add_data_maps(data_only)  
                                
                                                
                            }
        });  


        } catch(jsonp_failed) {



            console.log('data - jsonp, failed ', jsonp_failed)


            
            try{
            

                // test only
                // throw ' ++++++++ test only ++++++++ cors failed'; 
            
            // cors
            $.ajax({
                                                timeout: _timeout,
                                                type: 'GET',
                                            
                                                url: _url_returngeojson,



                                                beforeSend:  function( jqXHR, settings ){

                                                ___XMLHttpRequest_data = jqXHR
                                                },




                                                error: function (jqXHR, textStatus, errorThrown) {
                                                    
                                                    var _error_status = textStatus + ' : ' + errorThrown;         
                                                    console.log('data - cors, error  : ', _error_status);

                                                

                                                },
                                                success: function (data) {
                                                
                                                

                                                                    // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                                    if (typeof data === 'object') {
                                                                        // is object
                                                                        data_only = data
                                                                    } else {
                                                                        // is string
                                                                        data_only = JSON.parse(data)
                                                                    }
                                                                
                                                                
                                                                    
                                                                    add_data_maps(data_only)  
                                                                    
                                                                                    
                                                                }
                                            }); 



            


        } catch (cors_failed){

            console.log('data - cors failed ', cors_failed)

            try {

                    // proxy
                    // --------- add proxy  ---------
                    var _url_returngeojson_proxy = proxyurl +  _url_returngeojson

                    $.ajax({
                        timeout: _timeout,
                        type: 'GET',

                        url: _url_returngeojson_proxy,



                        beforeSend:  function( jqXHR, settings ){

                        ___XMLHttpRequest_data = jqXHR
                        },




                        error: function (jqXHR, textStatus, errorThrown) {
                            
                            var _error_status = textStatus + ' : ' + errorThrown;         
                            console.log('data - cors, error  : ', _error_status);

                        

                        },
                        success: function (data) {
                                                
                                                

                                                // jsonp, usually return object.   cors, proxy, can return both string and object, must handle difference  
                                                if (typeof data === 'object') {
                                                    // is object
                                                    data_only = data
                                                } else {
                                                    // is string
                                                    data_only = JSON.parse(data)
                                                }
                                            
                                            
                                                
                                                add_data_maps(data_only)  
                                                
                                                                
                                            }
                        }); 



                    



            } catch(proxy_failed) {


            console.log('data - proxy failed ', proxy_failed)

        } // catch proxy
                

        } // catch cors


        } // catch jsonp








         /**/
         //  --- Microsoft map image layer   --- 
         /**/
                var _bbox = {"spatialReference":{"wkid":4326}, "xmin" : SWlong , "ymin" : SWlat , "xmax" : NElong , "ymax" :  NElat }; 
                if (current_overlaytype == 'overlayType_image') {
                            // map tile is not available, use export image
                           overlay_export_image(_url, _bbox, _layer_id)
                }
         /**/
         //  --- end  ---  Microsoft map image layer    --- 
         /**/






        }










        function  add_dataSource_geojson_layer(){

            //Create a data source and add it to the map.
            featureLayerGeojson_datasource = new atlas.source.DataSource();
            featureLayerGeojson_datasource_highlight = new atlas.source.DataSource();
            map.sources.add(featureLayerGeojson_datasource);
            map.sources.add(featureLayerGeojson_datasource_highlight);


            // only for polygon fill pattern
            // comment out for not using fill pattern, otherwise versa
            // map.imageSprite.add('grid', _default_fillPattern_svg)
            //https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.polygonlayeroptions?view=azure-maps-typescript-latest
            var polygonLayer_fillPattern = new atlas.layer.PolygonLayer(featureLayerGeojson_datasource, null, {
                fillColor: _default_fillColor,
                fillPattern: 'grid',
                fillOpacity: 0.5, // default
                filter: ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']]	//Only render Polygon or MultiPolygon in this layer.
            }, 'geojsonFeatureLayer_polygon');

            
    
            //Add a layer for rendering the outline of polygons.
            var polygonLayer = new atlas.layer.LineLayer(featureLayerGeojson_datasource, null, {
                        strokeColor: _default_strokeColor,
                        strokeWidth: _default_strokeWeight,
                        filter: ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']]	//Only render Polygon or MultiPolygon in this layer.
            }, 'geojsonFeatureLayer_polygon');

            //Add a click event to the layer.
            //map.events.add('click', polygonLayer, featureClicked);
            map.events.add('click', polygonLayer_fillPattern, featureClicked);
            //map.events.add('mouseover', polygonLayer, featureHovered);
            map.events.add('mouseover', polygonLayer_fillPattern, featureHovered);
            //map.events.add('mouseout', polygonLayer, featureMouseOut);
            map.events.add('mouseout', polygonLayer_fillPattern, featureMouseOut);
            //map.events.add('mouseenter', polygonLayer, featureHovered);
            //map.events.add('mouseleave', polygonLayer, featureMouseOut);

            var polygonLayer_highlight = new atlas.layer.LineLayer(featureLayerGeojson_datasource_highlight, null, {
                strokeColor: _highlight_strokeColor,
                strokeWidth: _highlight_strokeWeight,
                filter: ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']]	//Only render Polygon or MultiPolygon in this layer.
            }, 'geojsonFeatureLayer_polygon_highlight');









            //Add a layer for rendering line data.
            var lineLayer = new atlas.layer.LineLayer(featureLayerGeojson_datasource, null, {
                strokeColor: _default_strokeColor,
                strokeWidth: _default_strokeWeight,
                filter: ['any', ['==', ['geometry-type'], 'LineString'], ['==', ['geometry-type'], 'MultiLineString']]	//Only render LineString or MultiLineString in this layer.
            }, 'geojsonFeatureLayer_line');
            //Add a click event to the layer.
            map.events.add('click', lineLayer, featureClicked);
            map.events.add('mouseover', lineLayer, featureHovered);
            map.events.add('mouseout', lineLayer, featureMouseOut);
            //map.events.add('mouseenter', lineLayer, featureHovered);
            //map.events.add('mouseleave', lineLayer, featureMouseOut);

            var lineLayer_highlight = new atlas.layer.LineLayer(featureLayerGeojson_datasource_highlight, null, {
                strokeColor: _highlight_strokeColor,
                strokeWidth: _highlight_strokeWeight,
                filter: ['any', ['==', ['geometry-type'], 'LineString'], ['==', ['geometry-type'], 'MultiLineString']]	//Only render LineString or MultiLineString in this layer.
            }, 'geojsonFeatureLayer_line_highlight');








            //Add a layer for rendering point data.
            var pointLayer = new atlas.layer.SymbolLayer(featureLayerGeojson_datasource, null, {
                iconOptions: {
                    allowOverlap: true,
                    ignorePlacement: true,
                    image: 'pin-round-darkblue'
                },
                filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']] //Only render Point or MultiPoints in this layer.
            }, 'geojsonFeatureLayer_point');
            //Add a click event to the layer.
            map.events.add('click', pointLayer, featureClicked);
            map.events.add('mouseover', pointLayer, featureHovered);
            map.events.add('mouseout', pointLayer, featureMouseOut);
            //map.events.add('mouseenter', pointLayer, featureHovered);
            //map.events.add('mouseleave', pointLayer, featureMouseOut);



            var pointLayer_highlight = new atlas.layer.SymbolLayer(featureLayerGeojson_datasource_highlight, null, {
                iconOptions: {
                    allowOverlap: true,
                    ignorePlacement: true,
                    image: 'pin-red', 
                    size: 2,
                },
                filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']] //Only render Point or MultiPoints in this layer.
            }, 'geojsonFeatureLayer_point_highlight');








            //Add all layers to the map.
            map.layers.add([polygonLayer_fillPattern, polygonLayer, lineLayer, pointLayer]);
            map.layers.add([polygonLayer_highlight, lineLayer_highlight, pointLayer_highlight]);
        }



        // hover mouseover
        function featureHovered(e) {

            console.log(' mouse over ', e)

            //Make sure the event occurred on a shape feature.
            if (e.shapes && e.shapes.length > 0) {
                console.log(' mouse over ',  e.shapes[0]);
                var ___properties = e.shapes[0].properties
                show_info_outline_Tab(___properties)
                featureLayerGeojson_datasource_highlight.add(e.shapes[0])
            }//if
        }
       

        // hover mouseout
        function featureMouseOut(e) {

            console.log(' mouse out  ', e)

            if (featureLayerGeojson_datasource_highlight){
                featureLayerGeojson_datasource_highlight.clear();
            }
        
           empty_info_outline_Tab()

        }



        // not use, just keep here
        function featureClicked(e) {

            /*
            //Make sure the event occurred on a shape feature.
            if (e.shapes && e.shapes.length > 0) {
                //By default, show the popup where the mouse event occurred.
                var pos = e.position;
                var offset = [0, 0];
                var properties;

                if (e.shapes[0] instanceof atlas.Shape) {
                    properties = e.shapes[0].getProperties();

                    //If the shape is a point feature, show the popup at the points coordinate.
                    if (e.shapes[0].getType() === 'Point') {
                        pos = e.shapes[0].getCoordinates();
                        offset = [0, -18];
                    }
                } else {
                    properties = e.shapes[0].properties;

                    //If the shape is a point feature, show the popup at the points coordinate.
                    if (e.shapes[0].type === 'Point') {
                        pos = e.shapes[0].geometry.coordinates;
                        offset = [0, -18];
                    }
                }

                //Update the content and position of the popup.
                popup.setOptions({
                    //Create a table from the properties in the feature.
                    content: atlas.PopupTemplate.applyTemplate(properties),
                    position: pos,
                    pixelOffset: offset
                });

                //Open the popup.
                popup.open(map);
            }

            */







        }

/**/
//  --- end  ---  Microsoft feature layer    --- 
/**/





function  add_dataSource_searchLayer(){

    //Create a data source and add it to the map.
    datasource = new atlas.source.DataSource();
    map.sources.add(datasource);
    
    //Add a layer for rendering the results.
    var searchLayer = new atlas.layer.SymbolLayer(datasource, null, {
        iconOptions: {

            // color option https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.iconoptions?view=azure-maps-typescript-latest
            // marker-black, marker-blue, marker-darkblue, marker-red, marker-yellow, pin-blue, pin-darkblue, pin-red, pin-round-blue, pin-round-darkblue, pin-round-red. Default "marker-blue".
            image: 'pin-red', 


            anchor: 'center',
            allowOverlap: true
        },

    }, "searchLayerID");
    map.layers.add(searchLayer);

    //Add a click event to the search layer and show a popup when a result is clicked.
    map.events.add("click", searchLayer, function (e) {

        console.log(' click a point ', e)

        //Make sure the event occurred on a shape feature.
        if (e.shapes && e.shapes.length > 0) {
            showPopup(e.shapes[0]);
        }
    });

    
}







       


       




         
        
        // if you want to add other map control, add it here
        function add_azure_basemap_layer(){

            //Add a style control to the map.
            map.controls.add([
                                    
                //new atlas.control.PitchControl(),
                //new atlas.control.CompassControl(),
                //new atlas.control.FullscreenControl(),

                new atlas.control.StyleControl({
                    //Optionally specify which map styles you want to appear in the picker. 
                    //All styles available with the Gen1 S0 license tier appear by default in the control. 
                    //If using a Gen1 S1 or Gen2 tier license, you can use the mapStyles option to add premium styles such as 'satellite' and 'satellite_road_labels' to the control.
                    //To add all available styles, you can use the 'all' keyword.
                    //mapStyles: 'all'

                    //Alternatively, specify an array of all the map styles you would like displayed in the style picker.
                    mapStyles: [ 'road',  'satellite_road_labels', ],

                    //Customize the layout of the style picker to be a list scrollable list.
                    layout: 'list'
                }),
            ],

            {
                position: 'bottom-right'
            }
            );// map control

        }





        //  without basemap version
        function init_user_interface_event(){


             // without basemap version
             add_azure_basemap_layer()



            //Create a popup which we can reuse for each result.
            popup = new atlas.Popup();



            //   .......  Microsoft map image layer .......  opacity   ....... 
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
                        groundoverlay.setOptions({opacity: image_opacity})
                    }
                    
                     

            });


            //  .......  end    .......   .......  Microsoft map image layer .......  opacity   ....... 




                    

        }
        

       











       
        // Function to retrieve an Azure Maps access token.
        function getToken(resolve, reject, map) {

            //URL to your authentication service that retrieves an Microsoft Entra ID Token.
            var microsoft_azure_tokenServiceUrl = 'https://samples.azuremaps.com/api/GetAzureMapsToken';

            // cors error
            // fetch(microsoft_azure_tokenServiceUrl).then(r => r.text()).then(token => resolve(token));

            // cors error
            fetch(microsoft_azure_tokenServiceUrl).then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Failed to retrieve Azure Maps token.');
            }).then(token => resolve(token)).catch(error => reject(error));
            
        }



        

        async function getMap() {



            

            /**/
            //  --- Microsoft feature layer   --- 
            /**/

            init_global_var_from_node();
            console.log(' root url ', _url)


            // for search feature attributes table
            // need async await
            await get_feature_attributes(_layer_id);
                                  
                                  
            display_count_info(_layer, _current_area_count_of_feature, _total_count_of_feature, _current_rendering_feature)


                                
            get_total_count()

            console.log('####### layerID ########', _layer_id)
            console.log('####### _center_lat ########', _center_lat)
            console.log('####### _center_long ########', _center_long)
            console.log('####### _center_zoom ########', _center_zoom)
           
                                  

            /**/
            //  --- end  ---  Microsoft feature layer    --- 
            /**/

 

            // azure map only accept number, reject string, must convert to number
            console.log('_center_long', Number(_center_long))
            console.log('_center_lat', Number(_center_lat))
            console.log('_center_zoom', Number(_center_zoom))

            // Initialize a map instance.
            map = new atlas.Map('map', {

                //center: [-118.16529495143641, 33.859173743867004],
                //zoom: 14.368953969001554,
                // azure map only accept number, reject string, must convert to number
                center: [Number(_center_long), Number(_center_lat)],
                zoom: Number(_center_zoom),

                style: 'satellite_road_labels',

                //keep
                //showTileBoundaries: true,

                // default basemap, this should be same as azure_basemap_id = 'azure-hybrid'
                style: 'satellite_road_labels', 
                view: 'Auto',

                // Add authentication details for connecting to Azure Maps.
                authOptions: {

                    // not work, Use Microsoft Entra ID authentication.
                    //authType: 'anonymous',
                    //clientId: microsoft_azure_clientID,
                    //getToken: getToken,


                    
                    // works, use azure map primary key.
                    authType: 'subscriptionKey',
                    subscriptionKey: microsoft_azure_primary_key_public,
                }
            }); // new map


            

            add_map_event()
           
            
           

            //Wait until the map resources are ready.
            map.events.add('ready', function () {


                

                /**/
                //  --- Microsoft traffic   ( without basemap version )   --- 
                /**/

                     // legend only
                     traffic_legend_control_handler = new atlas.control.TrafficLegendControl()
                    

                     // not use, because, will use my custom checkbox
                     // traffic-control only,  will add layer id 'traffic_relative'
                     //traffic_control_handler = new atlas.control.TrafficControl({
                     //    isActive: false, 
                         //isActive: true, //false,
                     //    style: 'dark',
                     //    incidents: true, // will add layer id 'incidents'
 
                     //})
 
 
 
                     $('#show_traffic_checkbox').change(function(){
                         if ($(this).is(':checked')) {
 
                             console.log('traffic layer checked');
 
                             //Show traffic on the map using the traffic options.
                             map.setTraffic({
                                 incidents: true, // will add layer id 'incidents'
                                 flow: 'relative'
                             });
 
                             //Add a traffic legend. It will automatically appear whenever the map is displaying traffic flow data. This can be used on its own with the map or with the traffic toggle button control like in this sample.
                             
                             map.controls.add(traffic_legend_control_handler, { position: 'bottom-right' });    // 'bottom-left'
                     
 
                         } else {
                             console.log('traffic layer uncheck');
                             // hide traffic layer
                             map.setTraffic({
                                 incidents: false,
                                 flow: 'none'
                             });
 
                             map.controls.remove(traffic_legend_control_handler);
 
 
                         }
                     }); 

                /**/
                //  --- end  ---  Microsoft traffic   ( without basemap version )   --- 
                /**/





                                
                  /**/
                    //  --- Microsoft feature layer   --- 
                    /**/

                    // must keep searchlayer datasource, it was used by search address, can be used for other future purpose
                    add_dataSource_searchLayer()

                    add_dataSource_geojson_layer()

                    //first time only 1 time, fix bug, sometime, missed map moveend event, missed ajax geojson, etc.
                    get_map_bound()
                    ajax_GeoJSON()
                    //- - end - - first time only 1 time, fix bug, sometime, missed map moveend event, missed ajax geojson, etc.

                    /**/
                    //  --- end  ---  Microsoft feature layer    --- 
                    /**/



                

                /**/
                // --   --  --  search address only  --   --  --  
                searchAddressOnly()
                // --  end  --  --  search address only  --   --  -- 
                /**/



                 // without basemap version 
                init_user_interface_event()

                

                


          





               //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
               if (need_pan_to_real_location) {
                pan_to_real_location();
                need_pan_to_real_location = false;
                update_url_parameter('panto', 0)

               } 


               
                                // set dark mode by default
                                document.querySelector('body').classList.add('red')



            });


        }// get map function 


