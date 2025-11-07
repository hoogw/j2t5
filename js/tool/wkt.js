 
// This section is specific to different json format, geometry projection code. 
// Any new json format, new column structure, new prjection, need to re-wrote this page accordingly.




                          /* 
                              arcgis layer info 
                              
                               extent:{
                                     spatialReference: {
                                                  wkid: 102100,        // esri version
                                                  latestWkid: 3857     // EPSG version
                                                  }
                                                }
                          */






       

    var wkt_column_name = 'WKT'
                                                       



       // ************* WKT-proj4js-geojson  ****************


       /*

             arcgis rest api always use Spatial Reference: 102100 (3857)

             ESRI:102100   === is same ==  EPSG:3857

             ESRI:102100      https://spatialreference.org/ref/sr-org/esri102100/
             EPSG:3857 -- WGS84 Web Mercator (Auxiliary Sphere)     https://spatialreference.org/ref/sr-org/epsg3857-wgs84-web-mercator-auxiliary-sphere/



            Question  https://support.esri.com/en/technical-article/000013950
            Why does ArcGIS Online use a deprecated spatial reference (102100) for hosted services?

            Answer
            ArcGIS Online uses the WGS_1984_Web_Mercator_Auxiliary_Sphere (WKID 3857) projection. However, from the REST endpoint of a hosted service, the spatial reference being used may appear as 102100 (3857). This is an expected behavior. The well-known ID (WKID) for a given spatial reference may occasionally change.

            At ArcGIS version 10, the WKID for the WGS 1984 Web Mercator (Auxiliary Sphere) projection was changed from 102100 to 3857. The JSON wkid property is always the value originally assigned to a spatial reference when it was initially created. The reason behind this is to ensure backwards compatibility with older spatial data servers. This is documented in the following ArcGIS REST API help page: Geometry objects.

            For ArcGIS version 10.1 and later, a new property (latestWkid) was added. latestWkid identifies the current WKID value as of a given software release, associated with the same spatial reference.

            To view the wkid and latestWkid properties, request the JSON of a map layer by appending “?f=pjson” to the end of the service URL. For example:

            https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0?f=pjson
            The following image is an example of the wkid and latestWkid properties displayed after requesting the JSON of a map layer:





            https://developers.arcgis.com/web-map-specification/objects/spatialReference/
            latestWkid	(Optional) Identifies the current wkid value associated with the same spatial reference. For example a WKID of '102100' (Web Mercator) has a latestWKid of '3857'.
            wkid	The well-known ID (WKID) of the coordinate system. Specify either WKID or the well-known text (WKT) of the coordinate system.
            wkt	The well-known text (WKT) of the coordinate system. Specify either WKT or WKID of the coordinate system.


       */





          // ****** how to look up projection string **************
          // 'EPSG:2229'    NAD83 / California zone 5 (ftUS)  los angeles county 
          // Not default, must specify by:   https://spatialreference.org/ref/epsg/2229/ 
          // choose proj4 or proj4js format
          // ******  end ****** how to look up projection string **************



           // both works 1 
                          //proj4.defs('EPSG:2229','+proj=lcc +lat_1=35.46666666666667 +lat_2=34.03333333333333 +lat_0=33.5 +lon_0=-118 +x_0=2000000.0001016 +y_0=500000.0001016001 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs');
                         
                          //var target_projection_EPSG = 'EPSG:2229'

                          proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
                         
                          var target_projection_EPSG_3857 = 'EPSG:3857' // same as target_projection_ESRI_102100

           // both works 2
                                                          
                          var target_projection_ESRI_102100 = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
                                                


                                                           
            var wgs84_EPSG_4326 = 'EPSG:4326'   // proj4js default








                                                         
            
            function test_reproject(){

              // works 
              const test_fromProj = '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs '
             
             
             /*
              const test_geojson = {
                type: 'POINT',
                coordinates: [319180, 6399862]
              }
              */


              const test_geojson = {
                type: 'POINT',
                coordinates: [319180, 6399862]
              }





              
              const reprojected = reproject.toWgs84(test_geojson, test_fromProj)

              
              console.log(' test reprojected  ' , reprojected)

              
            }




           
            function reproject_geojson_towgs84(_geometry_, ___from_projection){


               /* 
               
                ***********  browserify  ***********  

                  1) must use sudo install globally
                    sudo npm install -g brwoserify

                     https://github.com/perliedman/reproject
                     sudo npm install reproject    // install locally is fine

                     must manually create 'dist' folder for later output file use

                  2) must use --s expose global variable function 'reproject' and or 'toWgs84' you will use later in browser js.
                        without --s , will get 'reproject' undefined error . https://makerlog.org/posts/creating-js-library-builds-with-browserify-and-other-npm-modules
                        browserify --help will list all options.  -o means output file directory

                     browserify node_modules/reproject/index.js --s reproject -o node_modules/reproject/dist/reproject.js


                  3) in browser js, NOTE: reproject is a global object, represent the whole module, all sub function must start from it
                      
                        reproject.reproject(....)
                        reproject.toWgs84(...)






              ***********    terraformer.js polluted geometry must clean before feed into reproject.js ****************           

                   https://github.com/perliedman/reproject/issues/66      

                        test code working is because test_geometry object prototype is kind of empty.
                        however, geometry ( this is my real data, get from WKT -> terraformor.WKT.parser -> geometry)
                        geometry object's prototype constructor is not empty, it has some stuff inheritage from terraformer.point. when I run reproject.reproject(geometry) will get above error.
                        
                        I guess reproject.js use trigger 'point' constructor, which trigger terraformer.js to work
                        
                        This is first time I see this kind of error.
                        
                        the solution is before feed into reproject.js, you must clean the terraformer.js polluted geometry object,


                      
                        const test_geojson = {
                          type: 'POINT',
                          coordinates: [6377115.215955053, 1891910.244350331]
                        }
                        console.log(' test_geojson ' , test_geojson)

                      //  var ___reprojected_geometry = reproject.toWgs84(test_geojson, ___from_projection)

                      // test_reproject()

                        console.log(' _geometry_ ' , _geometry_ )
                      
                        console.log(' reproject ' , reproject)

                         // terraformer.js polluted geometry object, its prototype have constructor as terraformer.Point when feed into reproject.js, will trigger constructor call, then invalide point error.
                         
                          var _cleaned_geometry = {}
                              _cleaned_geometry.type = _geometry_.type
                              _cleaned_geometry.coordinates = _geometry_.coordinates

                        var ___reprojected_geometry = reproject.toWgs84(_cleaned_geometry , ___from_projection)
              */  
              

              // wellknown.js  not need to clean (only terraformer.js WKT parser need to)
              var ___reprojected_geometry = reproject.toWgs84(_geometry_ , ___from_projection)


                  // console.log(' ___reprojected_geometry ' , ___reprojected_geometry)
                   return ___reprojected_geometry
                 

            }






             
             function reproject_coordinate(_geometry_){
               
               // not finish yet, only support point so far.  
               
               // alternative to reproject.js

               // manually re-project each long-lat pair by proj4js based on type(point, line, polygon etc.)
               

               /*

                        EPSG: 4326 uses a coordinate system on the surface of a sphere or ellipsoid of reference.
                        EPSG: 3857 uses a coordinate system PROJECTED from the surface of the sphere or ellipsoid to a flat surface.
                        Think of it as this way:
                        EPSG 4326 uses a coordinate system the same as a GLOBE (curved surface). EPSG 3857 uses a coordinate system the same as a MAP (flat surface).

                        Google Earth is in a Geographic coordinate system with the wgs84 datum. (EPSG: 4326)
                        Google Maps is in a projected coordinate system that is based on the wgs84 datum. (EPSG 3857)
                        The data in Open Street Map database is stored in a gcs with units decimal degrees & datum of wgs84. (EPSG: 4326)
                        The Open Street Map tiles and the WMS webservice, are in the projected coordinate system that is based on the wgs84 datum. (EPSG 3857)
                        So if you are making a web map, which uses the tiles from Google Maps or tiles from the Open Street Map webservice, they will be in Sperical Mercator (EPSG 3857 or srid: 900913) and hence your map has to have the same projection.

                        
                        All of this further confused by that fact that often even though the map is in Web Mercator(EPSG: 3857), the actual coordinates used are in lat-long (EPSG: 4326). This convention is used in many places, such as:
                        In Most Mapping API,s You can give the coordinates in Lat-long, and the API automatically transforms it to the appropriate Web Mercator coordinates.
                        While Making a KML, you will always give the coordinates in geographic Lat-long, even though it might be showed on top of a web Mercator map.
                        Most mobile mapping Libraries use lat-long for position, while the map is in web Mercator.

                        EPSG:3857 calls its units metres, but they are not real metres. The more to the north you come, the more squeezed they are
                        Google uses Google Mercator (EPSG:3857 or EPSG:900913) for displaying, but I think you/the Javascript API want lat/lon coordinates for input. see here https://spatialreference.org/ref/sr-org/google-projection/
                        OpenLayers is capable of dealing with most projections. If you do not explicitly set one, your map is going to use our default which is the Web Mercator projection (EPSG:3857). 
                        The same projection is used e.g. for the maps of the OpenStreetMap-project and commercial products such as Bing Maps or Google Maps.


               */


              var ___unproj_coordinate = _geometry_.coordinates

              var _geometry_type_ = _geometry_.type

              var ___reproj_coordinate;

              
              switch(_geometry_type_.toLowerCase()){

                case 'point':
                  // code block  proj4(from, to)
                  ___reproj_coordinate = proj4(target_projection_EPSG,  wgs84_EPSG, ___unproj_coordinate);


                  break;



                case 'polygon':
                  // code block

                  break;


                case 'line':
                    // code block
  
                    break;
  

  
                case 'multipolygon':
                      // code block
    
                      break;



                default:
                  // code block





              } // case 


                                
             





              _geometry_.coordinates = ___reproj_coordinate


               return _geometry_

             }




             

             
              function wkt_to_geojson(___raw_json){

                /*
                    specific for json structure  
                                          { 
                                             columns:['id', 'spatialtype', 'wkt'],  
                                             data:   [1,     'polygon', 'polygon((POLYGON ((6480843.8347842479 1813953.9593123174))] 
                                          }
              
                 */



                 var ___columns =  ___raw_json.COLUMNS
                 var ___data = ___raw_json.DATA

                  var ____featureCollection = 
                                                {
                                                  "type": "FeatureCollection",
                                                  "features": [
                                                  ]
                                                }
                  
                  /*
                  {
                    "type": "FeatureCollection",
                    "features": [
                      {
                        "type": "Feature",
                        "properties": {
                          "population": 200
                        },
                        "geometry": {
                          "type": "Point",
                          "coordinates": [-112.0372, 46.608058]
                        }
                      }
                    ]
                  }
                   */   

                  for (var d = 0; d < ___data.length; d++) {
                    
                       var ____feature = {
                                          "type": "Feature",
                                          "geometry": {
                                           // "type": "Point",
                                           // "coordinates": [125.6, 10.1]
                                          },
                                          "properties": {
                                            //"name": "Dinagat Islands"
                                          }
                                        }


                       /*
                       {
                        "type": "Feature",
                        "geometry": {
                          "type": "Point",
                          "coordinates": [125.6, 10.1]
                        },
                        "properties": {
                          "name": "Dinagat Islands"
                        }
                      }
                      */


                           


                           for (var c = 0; c < ___columns.length; c++){

                             
                             

                               if ((___columns[c] == wkt_column_name) ){


                                      //wkt string to geojson feature coodinate 
                                      var ___wkt_string = ___data[d][c]

                                     // console.log(' ___wkt_string  ', ___wkt_string)

                                      // use terraformer wkt parser(both works 1)
                                      //var ___geometry = Terraformer.WKT.parse(___wkt_string);


                                      // use wellknown.js (both works 2)
                                      var ___geometry = wellknown.parse(___wkt_string);

                                      ____feature.geometry = ___geometry
                                     // console.log(' ___geometry  ', ___geometry)

                                      
                                      // manually implement, not complete, only support 'point' so far
                                     // var ___reproj_geometry = reproject_coordinate(___geometry)

                                      // use reproject.js
                                      var ___reproj_geometry = reproject_geojson_towgs84(___geometry, target_projection)




                                     // console.log('___reproj_geometry ', ___reproj_geometry)

                                      ____feature.geometry = ___reproj_geometry
                                      



                               } else { 
                                     
                                          // populate properties
                                           ____feature.properties[___columns[c]] = ___data[d][c]


                               }
    

                           } // for columns






                           ____featureCollection.features.push(____feature)




                  }  // for data



                 // console.log(' reproj geojson feature Collection ....>>>>>>  ', ____featureCollection)



                  return ____featureCollection

              }








              function reproject_geojson(_geometry_,   ___from_projection,  ___to_projection){


 
               // wellknown.js  not need to clean (only terraformer.js WKT parser need to)
               var ___reprojected_geometry = reproject.reproject(_geometry_ , ___from_projection ,  ___to_projection)
 
 
                    console.log(' ___reprojected_geometry ' , ___reprojected_geometry)
                    return ___reprojected_geometry
                  
 
             }
 


              function geojson_to_wkt(_sample_geojson){

                // use wellknown.js     https://github.com/mapbox/wellknown

                var ___wkt_str = wellknown.stringify(_sample_geojson);
                console.log(' geojson to wkt : ' , ___wkt_str)

                return ___wkt_str
              }

      // ************* end  ***************  WKT-proj4js-geojson  ****************




