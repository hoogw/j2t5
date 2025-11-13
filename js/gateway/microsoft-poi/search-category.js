




var map
var datasource
var datasource_highlight
var featureLayerGeojson_datasource
var featureLayerGeojson_datasource_highlight
var popup
var searchInput
//  --- microsoft circle       --- 
var circle_datasource;
       




/**/
//  --- microsoft circle       --- 
/**/


                
    async function nearby_poi(_radiusMeter, _centerLng, _centerLat) {

    


        /**/
        //  -  -  - category  -  -  - 
        /**/

            // excel file :  https://onedrive.live.com/:x:/g/personal/0D35222484A76A01/s!AgFqp4QkIjUNr71EalRJTnRM0AEPjA?resid=0D35222484A76A01!777924&ithint=file%2Cxlsx&e=o8ewEb&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3gvcyFBZ0ZxcDRRa0lqVU5yNzFFYWxSSlRuUk0wQUVQakE_ZT1vOGV3RWI
            // json tree :  https://atlas.microsoft.com/search/poi/category/tree/json?api-version=1.0&subscription-key=2EcKEaa1i02tTRNAUT7Ezip3htMkKcfPcH2JHokGwCynUY4oQHweJQQJ99BGAC8vTInSkNgnAAAgAZMP1MpR
            _category_string = $("#category-input").val()
            update_url_parameter("poicategory",_category_string)
            
            
            if (_category_string){

                // convert array of string to array of integer, only for micosoft 
                // https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-nearby?view=rest-maps-1.0&tabs=HTTP
                _category_array = _category_string.split(',').map(function(item) {
                    return parseInt(item, 10);
            }); // Splits by comma
                
            } else {
                _category_array = []
            }
            console.log('category array', _category_array); // Output: ["apple", "banana", "orange"]


    
        // api  
        // URL REST parameter is here https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-poi?view=rest-maps-1.0&tabs=HTTP
        // class api is here: https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
        // do not use class, bug found,  pipeline, searchNearBy class  not working with "categorySet", so I have to use ajax rest api here with key

            var microsoft_search_nearby_url ="https://atlas.microsoft.com/search/nearby/json?api-version=1.0"
            microsoft_search_nearby_url += '&lat=' + _centerLat
            microsoft_search_nearby_url += '&lon=' + _centerLng
            microsoft_search_nearby_url += '&limit=' + 100
            //microsoft_search_nearby_url += '&ofs=' + 0
            microsoft_search_nearby_url += '&radius=' + _radiusMeter
            //microsoft_search_nearby_url += '&query=' + search_poi_keyword
            microsoft_search_nearby_url += '&categorySet=' + _category_array
            
            microsoft_search_nearby_url += '&subscription-key=' + microsoft_azure_primary_key_restrict

            var microsoft_search_nearby_response = await ajax_getjson_common(microsoft_search_nearby_url)
            console.log('search nearby result ', microsoft_search_nearby_response)

            //  . . . street name need to further split  . . . 
            _current_geojson_POI = splitAddressMicrosoft_REST_API(microsoft_search_nearby_response.results)
            console.log('split Address Microsoft  ', _current_geojson_POI)
            // . . .  end  . . .  street name need to further split



            
            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/





        //  . . efficient core newOnly  . - .
        _this_newOnly_result_array = []


        //  . . .  test if this new poi already exist  . . . 
        _this_result_array = _current_geojson_POI.features
                for (let p = 0; p < _this_result_array.length; p++) {
                    _uniqueID = _this_result_array[p].properties.poi_id
                    if (_all_poi_uniqueID_array.includes(_uniqueID)){
                    // already exist, skip
                    } else {
                        _all_poi_uniqueID_array.push(_uniqueID)
                        _all_poi_flat_array.push(_this_result_array[p])

                        //  . . efficient core newOnly  . - .
                        _this_newOnly_result_array.push(_this_result_array[p])

                    }//if
                }//for
                _total_poi = Number(_all_poi_flat_array.length)
                $("#poi_total").html(_total_poi)

                console.log('_all_poi_uniqueID_array  ', _all_poi_uniqueID_array)
                console.log('_all_poi_flat_array  ', _all_poi_flat_array)

                
                // not use, version 1. for single circle version
                //datasource.add(poi_geojson);
                // in use,  version 2. accumulate 
                poi_geojson = {
                    "type": "FeatureCollection",
                    "features": _all_poi_flat_array
                };
                //datasource.add(poi_geojson);


                //  . . efficient core newOnly  . - .
                _this_newOnly_poi_geojson = {
                    "type": "FeatureCollection",
                    "features": _this_newOnly_result_array
                };
                datasource.add(_this_newOnly_poi_geojson);
                    // . .  end . . efficient core newOnly  . - .

                //   . . .  end  . . .  . . .  test if this new poi already exist  . . . 
                

            



        
    }

    function clear_all_poi(){

        //Remove any previous results from the map.
        if (datasource){
            datasource.clear();
        }
        if (datasource_highlight){
            datasource_highlight.clear();
        }


        _all_poi_uniqueID_array = []
        _all_poi_flat_array = []

        _total_poi = 0
        $("#poi_total").html(_total_poi)

    }


/**/
//  --- end  ---  microsoft circle    --- 
/**/









        


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




function moveend_handler(){

            //  --- Microsoft feature layer   --- 
            get_map_bound()
            ajax_GeoJSON()
          
           _center_radius_in_meter = get_center_radius_in_map_bound() 
           // microsoft SearchPOI does not limit radius, but searchNearBy limit to 50k
           setLimit_onNearbyCircleRadius()
   
           // only for browse
           clear_all_circle()

           drawing_circle(_center_radius_in_meter, _center_long, _center_lat)

           

/**/
//  -  -  - shoot it !!! -  -  - 
/**/
     $("#shoot-it-button").prop('disabled', false);
/**/
//  -  -  - end  -  -  -  shoot it !!!    -  -  - 
/**/





           
   
}


function add_map_event(){

    // map event https://github.com/Azure-Samples/AzureMapsCodeSamples/blob/main/Samples/Map/Map%20Events/Map%20Events.html
   
    // idle not working, repeatly trigger event endlessly
    //map.events.add('idle', function(){
    // in use
    map.events.add('moveend', moveend_handler);


    
    
/**/
//  -  -  - guided ring for pan and zoom  -  -  - 
/**/

// drag, move, render event https://samples.azuremaps.com/map/map-events
 map.events.add('move', function (e) {



   
    get_map_bound()
    _center_radius_in_meter = get_center_radius_in_map_bound()
     console.log(' you drag map .. . .. . . .', _center_radius_in_meter, _center_long,  _center_lat)
    drawing_circle_guideRing(_center_radius_in_meter, _center_long,  _center_lat)


});

/**/
//  -  -  - end  -  -  -  guided ring for pan and zoom    -  -  - 
/**/




  
}





/**/
//  --- microsoft circle       --- 
/**/


       




        function  init_circle_dataSource(){

            //Create a data source and add it to the map.
            circle_datasource = new atlas.source.DataSource();
            map.sources.add(circle_datasource);

            //Create a polygon layer to render the filled in area of the circle polygon, and add it to the map.
            map.layers.add(new atlas.layer.PolygonLayer(circle_datasource, null, {
                // api https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.polygonlayeroptions?view=azure-maps-typescript-latest#azure-maps-control-atlas-polygonlayeroptions-fillantialias
                fillColor: 'rgba(0, 0, 255, 0.44)',   //'rgba(0, 200, 200, 0.44)',
                //fillPattern: 
                //fillOpacity: 0.44,

            }));



            
                            
                /**/
                //  -  -  - guided ring for pan and zoom  -  -  - 
                /**/


                    //Create a data source and add it to the map.
                    circle_guideRing_datasource = new atlas.source.DataSource();
                    map.sources.add(circle_guideRing_datasource);

                    //Create a polygon layer to render the filled in area of the circle polygon, and add it to the map.
                    map.layers.add(new atlas.layer.PolygonLayer(circle_guideRing_datasource, null, {
                        // api https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.polygonlayeroptions?view=azure-maps-typescript-latest#azure-maps-control-atlas-polygonlayeroptions-fillantialias
                        fillColor: 'rgba(0, 0, 255, 0.19)',   //'rgba(0, 200, 200, 0.44)',
                        //fillPattern: 
                        //fillOpacity: 0.44,

                    }));


                /**/
                //  -  -  - end  -  -  -  guided ring for pan and zoom    -  -  - 
                /**/


        }

/**/
//  --- end  ---  microsoft circle    --- 
/**/








/**/
//  --- Microsoft feature layer   --- 
/**/

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
    map.sources.add(featureLayerGeojson_datasource);
    
    

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

    //Add a layer for rendering line data.
    var lineLayer = new atlas.layer.LineLayer(featureLayerGeojson_datasource, null, {
        strokeColor: _default_strokeColor,
        strokeWidth: _default_strokeWeight,
        filter: ['any', ['==', ['geometry-type'], 'LineString'], ['==', ['geometry-type'], 'MultiLineString']]	//Only render LineString or MultiLineString in this layer.
    }, 'geojsonFeatureLayer_line');

    //Add a click event to the layer.
    map.events.add('click', lineLayer, featureClicked);

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

    //Add all layers to the map.
    map.layers.add([polygonLayer_fillPattern, polygonLayer, lineLayer, pointLayer]);

}


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
            size: 1,  // original size default 1 times
            anchor: 'center',
            allowOverlap: true
        },

    }, "searchLayerID");
    map.layers.add(searchLayer);



    datasource_highlight = new atlas.source.DataSource();
    map.sources.add(datasource_highlight);
    var searchLayer_highlight = new atlas.layer.SymbolLayer(datasource_highlight, null, {
        iconOptions: {
            // color option https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.iconoptions?view=azure-maps-typescript-latest
            // marker-black, marker-blue, marker-darkblue, marker-red, marker-yellow, pin-blue, pin-darkblue, pin-red, pin-round-blue, pin-round-darkblue, pin-round-red. Default "marker-blue".
            image: 'pin-blue', 
            size: 2,  // 2 times bigger
            anchor: 'center',
            allowOverlap: true
        },

    }, "searchLayerID_highlight");
    map.layers.add(searchLayer_highlight);



    //Add a click event to the search layer and show a popup when a result is clicked.
    map.events.add("click", searchLayer, function (e) {
        //console.log(' click  ', e)
    });

    map.events.add("mouseover", searchLayer, function (e) {

        console.log(' mouse over ', e)

        //Make sure the event occurred on a shape feature.
        if (e.shapes && e.shapes.length > 0) {
            console.log(' mouse over ',  e.shapes[0]);

            var ___properties = e.shapes[0].data.properties
            if (___properties.poi_id){
                show_info_outline_Tab(___properties)

                datasource_highlight.add(e.shapes[0])
            }//if

            //



        }//if
    });

    

    map.events.add("mouseout", searchLayer, function (e) {

        console.log(' mouse out  ', e)

        if (datasource_highlight){
            datasource_highlight.clear();
        }
    
       empty_info_outline_Tab()
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
        function init_user_interface_after_microsoft_map_load(){


            $("#start_over_button").on("click", function() {
               $("#shoot-it-button").prop('disabled', false);
               clear_all_circle()
               clear_all_poi()
               

            });

            /**/
            //  -  -  - shoot it !!! -  -  - 
            /**/

            $("#shoot-it-button").on("click", function() {

                    nearby_poi(_center_radius_in_meter, _center_long, _center_lat)

                    $("#shoot-it-button").prop('disabled', true);
            });

            
            /**/
            //  -  -  - end  -  -  -  shoot it !!!    -  -  - 
            /**/



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


            init_user_interface_before_microsoft_map_load()








/**/
//  --- use your key  --- 
/**/


            var hostname = window.location.hostname;

            if (hostname === "localhost" || hostname === "127.0.0.1") {
                console.log("The current URL is localhost.");
                
                //for production
                load_microsoft_map(microsoft_azure_primary_key_restrict)
                // for test only
                //use_your_key()

            } else {
                console.log("The current URL is not localhost.");
                use_your_key()
            }


    
/**/
//  --- end  ---  use your key    --- 
/**/

        

        }// get map function 


