    /*
  

    localdomain=1 means use local SQL db
            http://localhost:10/json2tree/esri/check/arcgisServerReport.html?localdomain=1



  * 
  * 
  * top level index page
  * 
                1) arcgisServerList, 

                        child link must match parent original URL http/https 
                        all child link under those index page, must match parent protocol 
                        
                        child link is restapi.html:   
 
                                    child                       parent
                                    http://.../restapi.html?url=http://....... 
                                 or 
                                    https://.../restapi.html?url=https://....... 

                              No mix allowed.
                                   error  https://.../restapi.html?url=http://....... 
 
 
     
                         same rule for hub.html, (if enforce https, ajax.ca will not work). 
 
                                child                       parent
                                    http://.../hub.html?url=http://....... 
                                 or 
                                    https://.../hub.html?url=https://....... 

                              No mix allowed.
                                   error  https://.../hub.html?url=http://....... 
                                
                                
                                
                                
                                
                                For example: 

                                http://opendata.ajax.ca ( only http works,  enforce https failed https://opendata.ajax.ca/data.json error)
 
                                http://opendata.esrichina.hk ( both http, https works, https://opendata.esrichina.hk/data.json works)
 
 
 



 
 
                2)  hub.arcgis(hub.site.live, hub.site.static)
                      
                      all child  are ESRI hosted, links seems all use https, 
                         https://.../hub.html?url=https://.......
 
                      

                           
 
 
 
 
 
                    
 
            
    middle level page
    
               i) searchLayer, searchMapServer,  
               
               
                     must parent-child http/https match rule.

                    for example: 
                                     child icon link                          parent
                                     http://.../googlemaps/mapbox/.../...&url=http://.......
 
                                     https://.../googlemaps/mapbox/.../...&url=https://....... 
 
 
                    No mix allowed.  https://....../...&url=http://....... 
      
 
           
              2)  hub.html page: (due to https://....los angeles/data.json/  request some http content, automatically change browser from https to http)
 
                  The current browser protocol (http/https) is no longer truth!  
                  
                  the child link must bind to target url ___url_string, ( only apply for geojosn, arcgis rest api url is bind to itself resource URL)
 
              
 
 
 
 
 
    
       hub, portal only. 


       when get  https://...../data.json, 
       also get  http://garbage image 
       error:  .... was loaded over HTTPS, but requested an insecure image 'http://fedmaps.maps.arcgis.com/sharing/rest/content/items/825d3d1469bd4a46b26bb6a0105411a2/data'. This content should also be served over HTTPS.
       ESIR have NOT fix this bug.

       This will cause browser change from https:// to http://  too bad. 





     -----------------------------------------
      
      each individual url resource get from     ../data.json  are mixed of http and https. Domain maybe different too.

               
        

        hub handle differently, more complex

                                         
               1. for geojson download resource url  --at--   arcgis-online-hub only

                      example: https://geohub.lacity.org
                      some geojson download link have http

                      arcgis online url is https, browser automatically change it to http due to ...data.json reqeust some http img content.( los angeles hub, etc.... )
                      template url must always bind to target url, regardless current browser window protocol, this binding is done at arcgis_common. 
                
          


               2. for individual arcgis rest api url  --at--   arcgis-online-hub only

                       example:   http://opendata.ajax.ca

                        each individual resource url are mixed of :
                              https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer
                              http://opendata.ajax.ca/datasets/74334e58247544cfb0dc8dd6762be143_10.geojson

                        arcgis_common  force protocol match between target url and template base url , are only truth for arcgis_rest_api related, searchLayer, searchMapserver, restapi.html
                        at hub.js, we need manually adjust enfore protocol match between  each individual resource url and template base url
                        
                        This action is done at every hub.js file, not at arcgis common




               3. even some arcgis online url is http, but due to host on esri, https works too. ( hong kong, idaho state, etc....)
                no action yet

                  


                               

              //   xxx.opendata.arcgis.com/data.json 
              //   ONLY get first 1000 record, if over 1 thousand record, no sure how to get 
              // https://community.esri.com/thread/226451-arcgis-open-data-api



                
              // mapbox-vector, only need 1 parameter (required) url=xxxx.geojson
              //  optional:   layer=xxxxx,  only purpose is to display subject
              //  optional:   center_zoom=16 means pan_to_real_location
              // http://localhost:3000/mapbox_vector/default?center_lat=34.061982871977456&center_long=-118.26338517522096&center_zoom=10&url=https://opendata.arcgis.com/datasets/6996f03a1b364dbab4008d99380370ed_0.geojson

                
                
   
    
   */ 
    

    
              var layerID_NAME_separator = ' &#x21E2; '
  




/**/
// token
/**/
  var arcgis_online_token = ''           
  var param_arcgis_online_token 
  var arggis_online_genToken_url = 'https://www.arcgis.com/sharing/generateToken' 
  var arggis_enterprise_portal_genToken_url = '/portal/sharing/rest/generateToken'  // must add domain in front.    
  var generateTokenUrl = arggis_online_genToken_url // by default

  var portal_domain
  
  var local_token_referer = 'http://localhost/'
  var production_token_referer = 'https://transparentgov.net/'
  var token_referer = production_token_referer
  
/**/
// . . end .  .  . token
/**/



  
   
  // local and production domain switch 
  var localhost_domain_port = 'http://localhost:3000';
  var production_domain_port = 'https://transparentgov.net:3200';

  var localhost_domain_port_apache = 'http://localhost:10';
  var production_domain_port_apache = 'https://transparentgov.net';


  // url, set,  localdomain=1 means use local SQL db
  var in_use_domain_port= production_domain_port;
  var in_use_domain_port_apache= production_domain_port_apache;


var _open_link = ''



  // current window protocol is not reliable as true value, because, if mixed content(http img + https), chrome will automatically convert https to http, this cause all down stream template use wrong port
  // template port (http 3000, https 3200) should not binding with current window protocol, instead should binding to target url 
  // not use, but need here, old, history file will use it
    var ____current_window_protocol = window.location.protocol
    
 

  // for example target url = https://geohub.lacity.org,  template protocol should always be https, no matter what
  var template_protocol = 'https:'  // by default, later will adjust as template_protocol = _targetURL_protocol
 




 var  proxyurl_https = "https://transparentgov.net:7200/";
 var  proxyurl_http = "http://transparentgov.net:7000/";  

    
var portal_gallery_html = '/home/gallery.html'
var selfHost_portal_gallery_html = '/gallery.html'   
    
    

/**/

                                                // --------- add proxy  --------- 
                                                              var ____current_window_protocol = window.location.protocol

                                                              // default http
                                                              var proxyurl = "http://transparentgov.net:7000/";  

                                                              console.log('____current_window_protocol', ____current_window_protocol)

                                                              if (____current_window_protocol == 'https:') {
                                                              
                                                                proxyurl = "https://transparentgov.net:7200/";
                                                                
                                                              }
                                                  // --------- end  ---------  add proxy  --------- 




/**/


    
    
    
    //-------- get domain, only for apache server, with json2tree ----------
      
       // not include node.js server, 
       // 
        
            var _full_url = window.location.href;
            var _start_of = _full_url.indexOf("/json2tree/");
            
            // everything before /json2tree/, specially for ipfs, http://127.0.0.0:8080/ipfs/QmPJTc3aLz3rHMdkjmp9CLaL4EvUQktRv3FnvmMbcSabf4/json2tree/.......
            var _root_server = _full_url.substring(0, _start_of)
            
            console.log('_root_server > ', _root_server)
    //-------- end ---------  get domain ----------
    
    
    
    
    
    
    
    
    
       //.......... port http:3000   https:3200 ............. 

              var _port_http_https = ''


              // will call this function later 
              function get_port_http_https(){

                   

                    if (template_protocol == 'http:') {
                        _port_http_https = '3000'
                        
                        
                        
                    }else {
                        _port_http_https = '3200'
                    }


                    console.log('template protocol, port will use ===>', template_protocol, _port_http_https)

              }
       //..... end ..... port http:3000   https:3200 ............. 
  
  
  
  
  
     var _apache_localhost_port = ''
     if  (window.location.hostname == 'localhost'){
         _apache_localhost_port = ':10'


        
     }
  
  
  


var options = {};
          
var input = {};


    // ========= timeout ========= 


        /*
             default timeout for most of case, 1 sec, Can not be too long, otherwise, scan folder can stuck for ever. for example  any USGS, http://localhost:10/json2tree/esri/server2/folder.html?url=https%3A%2F%2Fgis.usgs.gov%2Fsciencebase1%2Frest%2Fservices&org=USGS+-+ScienceBase%2C%C2%A0%C2%A0&_center_lat=43.04614726082467&_center_long=-128.43724108004662&_center_zoom=16&select_folder=60&select_layer=0
             if need longer timeout, set in url:   ?..&timeout=5000
             lowest timeout is 300,  because 200 will cause bad request error.  300 is lowest, 500 is safe number.
         */
          var _timeout = 2000;  // 9 sec
          var param_timeout; // get URL param value time out, feed to real _timeout
          

    // =========   end   =========    timeout ========= 





var layers_flat;




// for folder, service only
//var base_url = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
var  base_url = '';







  var current_layerEndpoint_url
  var current_mapServerEndpoint_url
  var current_rootEndpoint_url
  
  var current_url;
  var current_pathname;
  var current_pathArray;
  var linkToPathname = "";
  
  
  var urlParams;
  var ___url_string;
  



  // ========== must init as null, same as if URL have no lat long provided, extract URL will set value as null ========
        var _center={"_center_lat": null , "_center_long": null , "_center_zoom": null};
          
        var _center_lat;
        var _center_long;
        var _center_zoom;


        // default to log angeles downtown, those value is fixed (do not change value), will be use downstream as sign to get true value 
        var default_center_lat = 34.049039
        var default_center_long = -118.246521
        var default_center_zoom = 16     // mapserver1 (cmv) will error if zoom is decimal 16.7 will cause error.
 // ===================================





  
       
  // .....url parameter ..... global .......     
  var _organization = '';   

  var _cross = 'default';  // cross origin method, can be : default, cors, jsonp, proxy 

  


  
  var _health; // health=1,true,yes (anything) will show health check icon

  
  var ___url;
  var ___protocol  // this is means url paramter protocol  ?..&url=https://....
  var ___hostname 
  var ___pathname 
  var ___urlParams        
  var ___pathArray
  var ___service
  






  
  
  // ----- special for checker page -----

        // arcgisServerCheck.html?start=1&end=10&test_mode=0&default=1&cors=0&jsonp=0&proxy=0 
        var test_range_start =1
        var test_range_end = 10  
        var test_mode_parameter = 0    // test_mode only available at checker page

       

        var test_default = 1
        var test_cors = 0
        var test_jsonp = 0
        var test_proxy = 0
        var test_https = 0
        var test_http = 0

        var audit = 0  // 0 by default show all, 1 means only show audit='1',  2 means only show audit='2', 
        var localdomain = 0  // 0 by default use production domain,  1 means use local domain
        var file                       
           
        var test_method= 'fjson'   // default fjson: (only test ... mapserver/7?f=pjson)         objectid   fid   oid   total count 


        var test_category= ['default', 'cors', 'jsonp', 'proxy', 'https', 'http']
        
        var test_category_icon= ['alpha-d-box-outline', 'alpha-c-box-outline', 'alpha-j-box-outline', 'alpha-p-box-outline', 'shield-lock-outline', 'shield-alert-outline']
        var test_category_color= ['teal', 'teal', 'teal', 'teal', 'teal', 'teal']



  // ----- end -----------  special for checker page -----
  
  



          // ............... global var for template url base ...............

                  var url_template_googlemaps
                  var url_template_base_googlemaps
                  var url_template_base_googlemaps_vector
                  var url_template_base_googlemaps_imageServer
                  var url_template_base_googlemaps_geocodeServer
                  var url_template_base_googlemaps_rasterLayer


                  var url_template_base_applemaps
                  var apple_base_url

                  var url_template_base_bingmaps
                  

                  var url_template_base_heremaps
                  


                  var url_template_base_mapbox
                  var url_template_base_mapbox_vector


                  var url_esri_map_viewer         = 'https://www.arcgis.com/apps/mapviewer/index.html?'
                  var url_esri_map_viewer_classic = 'https://www.arcgis.com/home/webmap/viewer.html?'
                  var url_esri_jsapi_viewer = 'MapServerURL( ... /MapServer' + '?f=jsapi'

                  var url_template_base_esri
                  
                  
                  var url_template_base_esri_vector_tile  // only for cmv (configurable-map-viewer)

                  var url_template_base_esri_vector_tile_layer
                  


                  var url_template_base_mapbox_vector_tile_layer
                  var url_template_base_openlayers_vector_tile_layer
                  var url_template_base_leaflet_vector_tile_layer



                  var url_template_base_esri_scene_layer
                 


                  var url_template_base_esri_imagery_layer
                  var url_template_base_esri_imagery_layer_popup


          
                  var url_template_base_esri_mapimagelayer_identify 
                  var url_template_base_esri_featurelayer_flat   
                  var url_template_base_esri_js4_tree
                  
                  var url_template_base_embed 
                  var url_for_google 
                   
                  var url_for_microsoft
                  var url_for_esri_gateway
                  var url_for_here
                  
                  var url_template_base_esri_hrsa
                  var url_template_base_esri_usgs
                  
                 
                  
                
                  var url_template_base_esri_webmap_portalid 
                
                  var url_template_base_esri_geojson   
                
                  var url_template_base_esri_geojson_popup   
                  
                  
                
                  var url_template_base_esri_featurelayer
                 
                 
                  
                  
                  
                
                  var url_template_base_esri2 
                  var url_template_base_esri3 
                  var _searchLayer_base_url



                  var url_template_arcgis_feature_table
                  var url_template_arcgis_feature_table_json2tree
                  var url_template_arcgis_feature_table_1
                  var url_template_arcgis_feature_table_2
                  var url_template_arcgis_feature_table_3
                  var url_template_arcgis_feature_table_4


          // ......   end   ......... global var for template url base ...............




           // get full list
          
           var csv_realtimelive = "https://mappingsupport.com/p/arcgis_list/list-federal-state-county-city-GIS-servers.csv"
           var csv_backup = "https://transparentgov.net/data/live_data/list-federal-state-county-city-GIS-servers.csv"

           //var mappingsupport_csv_url = csv_realtimelive // for production by default
           var mappingsupport_csv_url = csv_backup       // for test


           var mappingsupport_json
           var column_name_array
           var row_array
           var categorized_inputCurrent_array=[]
           var federal_inputCurrent_array=[]
           var state_inputCurrent_array=[]
           var county_inputCurrent_array=[]
           var city_inputCurrent_array=[]
           var other_inputCurrent_array=[]

         // no parameter, all use global var
          function build_url_base_template(){



        



          
          
            //...................................... google .............................................

             //replace googlemaps/  --> googlemaps4/     --> googlemaps11/   
             url_template_googlemaps = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps/default?';

             

              // not use, but keep,  maybe somewhere use it, I don't know.    google map    
              url_template_base_googlemaps = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps/default?';






              // googlemaps92
              url_template_base_googlemaps_vector    =  template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps92/default?';



              // google ImageServer  ---> in use /googlemaps910/
              url_template_base_googlemaps_imageServer = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps910/default?';


              // google GeocodeServer  ---> in use /googlemaps26/ searchable reference layer,        g27 imagepriority reference layer,      g28 reverse geocode
              url_template_base_googlemaps_geocodeServer = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps26/default?';




              // raster layer (under mapserver)  ---> in use /googlemaps912/
              url_template_base_googlemaps_rasterLayer = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/googlemaps912/default?';



              /**/ 
              //...................................................................................

                // apple node.js
                url_template_base_applemaps = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/applemaps/default?';
                // apple json2tree
                apple_base_url = _root_server +  '/json2tree/gateway/apple/default.html?'; 
             
             
                
              //...................................................................................


            /**/ 
            //...................................................................................

            // bing map
            url_template_base_bingmaps = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/bingmaps/default?';
            
           
            
          //...................................................................................



              // here map
              url_template_base_heremaps = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/heremaps/default?';
                
              
                      
            //...................................................................................


            // mapbox 
             url_template_base_mapbox = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/mapbox/default?';
          
            // mapbox_vector style
            url_template_base_mapbox_vector    =  template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/mapbox_vector/default?';

            url_template_base_mapbox_vector_tile_layer = template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/mapbox13/default?';
            
            //...................................................................................   
              
              // openlayers

              url_template_base_openlayers_vector_tile_layer = _root_server +  '/ol2/dist/arcgisvector.html?';   
            //...................................................................................   

                // leaflet

                url_template_base_leaflet_vector_tile_layer = _root_server +  '/ol2/dist/arcgisvector.html?';   






            // cmv server  type='dynamic'
              // production
              //var url_template_base_esri = 'http://ms.transparentgov.net/?config=viewer_simple1';
              //var url_template_base_esri = template_protocol +  '//' + window.location.host +   '/mapserver1/viewer/?config=viewer_simple1';
             url_template_base_esri = _root_server +   '/mapserver1/viewer/?config=viewer_simple1';
              
              //localhost
            // var url_template_base_esri = 'http://localhost:10/mapserver1/viewer/?config=viewer_simple1';

            
            
        // esri vector tile server    


                        
                         
                          url_template_base_esri_vector_tile = _root_server +   '/mapserver1/viewer/?config=viewer_simple4'; 




            
        // esri VectorTileLayer    


                               
                                  url_template_base_esri_vector_tile_layer = _root_server +  '/json2tree/arcgis/js4/vectortile.html?';   

                                  url_template_base_esri_vector_tile_layer_popup = _root_server +  '/json2tree/arcgis/js4/vectortile2.html?';   
                                  
            // esri sceneLayer    

                       
                          url_template_base_esri_scene_layer = _root_server +  '/json2tree/arcgis/js4/scenelayer.html?';   
                         
                            
            
            // esri imageryLayer    


                        
                        url_template_base_esri_imagery_layer = _root_server +  '/json2tree/arcgis/js4/imagerylayer.html?';   
                        
          
                        url_template_base_esri_imagery_layer_popup = _root_server +  '/json2tree/arcgis/js4/imagerylayer2.html?';   
            
            
          // esri v4.x mapImageLayer    


                               
                                url_template_base_esri_mapimagelayer_identify = _root_server +  '/json2tree/arcgis/js4/mapimagelayer_identify.html?';  
                                
                                url_template_base_esri_featurelayer_flat = _root_server +  '/json2tree/arcgis/js4/featurelayer_flat.html?';  
                                     
                                

              // embed
              url_template_base_embed = _root_server +  '/json2tree/datahub.io/embed/featurelayer.html?';               
                               
              // google
              url_for_google = _root_server +  '/json2tree/gateway/google/google.html?';    

             

              // microsoft
              url_for_microsoft = _root_server +  '/json2tree/gateway/microsoft/basemap.html?';  

              // esri
              url_for_esri_gateway = _root_server +  '/json2tree/gateway/feature-layer/test.html?';  

              // here
              url_for_here = _root_server +  '/json2tree/gateway/here/basemap.html?';  
                                
                                
                                // this portal id MUST be webMap item, if it is feature service item, would not work. 
                              url_template_base_esri_webmap_portalid  =  _root_server   +'/json2tree/arcgis/js4/webmap_portalid.html?';
            
            // esri v4.x tree 
                        url_template_base_esri_js4_tree = _root_server +  '/json2tree/arcgis/js4tree/featurelayer_sublayer.html?';
           





            
              // esri_geojson
        
                            //var url_template_base_esri_geojson    =  template_protocol +  '//' + window.location.hostname +  _apache_localhost_port   +'/json2tree/arcgis/geojson/geojson.html?';
                          url_template_base_esri_geojson    =  _root_server   +'/json2tree/arcgis/geojson/geojson.html?';
                          
                          url_template_base_esri_geojson_popup    =  _root_server   +'/json2tree/arcgis/geojson/geojson_popup.html?';

            

            // usgs

                          url_template_base_esri_usgs = _root_server  +'/json2tree/datahub.io/usgs';

            // hrsa
                          url_template_base_esri_hrsa = _root_server  +'/json2tree/datahub.io/hrsa';

            
            // esri featurelayer and native

              
                        
                      url_template_base_esri_featurelayer = _root_server  +'/json2tree/arcgis/featurelayer/featurelayer.html?';
                     
            

        // cmv server,  type='feature'
              // production
              //var url_template_base_esri2 = 'http://ms.transparentgov.net/?config=viewer_simple2';
            // var url_template_base_esri2 = template_protocol +  '//' + window.location.host + '/mapserver1/viewer/?config=viewer_simple2';
              url_template_base_esri2 = _root_server + '/mapserver1/viewer/?config=viewer_simple2';
              
              
              
              //local test
            // var url_template_base_esri2 = 'http://localhost:10/mapserver1/viewer/?config=viewer_simple2';
            
            
            
        // cmv server,  type='image'
              // production
              //var url_template_base_esri3 = 'http://ms.transparentgov.net/?config=viewer_simple3';
              //var url_template_base_esri3 = template_protocol +  '//' + window.location.host + '/mapserver1/viewer/?config=viewer_simple3';
             url_template_base_esri3 = _root_server + '/mapserver1/viewer/?config=viewer_simple3';
              
              //local test
              //var url_template_base_esri3 = 'http://localhost:10/mapserver1/viewer/?config=viewer_simple3';
              
            
            
        
        // searchLayer.html base url,
        //  use in searchMapServer.js
              //  http://localhost:10/json2tree/searchLayer.html?org=XXXXYYYYY&url=https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/ArcGIS/rest/services/Subway/FeatureServer

              // local test
              // var _searchLayer_base_url = 'http://localhost:10/json2tree/searchLayer.html?';  
              // production 
              // var _searchLayer_base_url = 'http://j2t.transparentgov.net/searchLayer.html?';  
              // var _searchLayer_base_url = template_protocol +  '//' + window.location.host + '/json2tree/esri/searchLayer.html?';  
            _searchLayer_base_url = _root_server + '/json2tree/esri/searchLayer.html?';  









            // arcgis feature table 

                        // json2tree version
                        url_template_arcgis_feature_table_json2tree = _root_server +'/json2tree/datahub.io/embed/featureTable.html?';


              
                        // featuretable - esri grid
                        url_template_arcgis_feature_table = _root_server +'/json2tree/gateway/feature-table/featureTable.html?';
                        
                        


                          // featuretable1 -   (node , arcgis viewer) rest api
                          url_template_arcgis_feature_table_1 =  template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/arcgis/featuretable/default?';
                          // node arcgis viewer version
                          url_template_arcgis_feature_table_2 =  template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/arcgis/featuretable/default?';
                          // featuretable3 -   (node , arcgis viewer) geojson
                          url_template_arcgis_feature_table_3 =  template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/arcgis/featuretable2/default?';
                          // featuretable4 -   (node , arcgis viewer) geojson
                          url_template_arcgis_feature_table_4 =  template_protocol +  '//' + window.location.hostname + ':' + _port_http_https  +'/arcgis/featuretable3/default?';
                           

          }






 // google api https://developers.google.com/custom-search/v1/using_rest
 var google_api_url_template = 'https://www.googleapis.com/customsearch/v1?'

 // google custom search api key (localhost only):
var google_api_key_local_only = 'AIzaSyAUaELIu9LUeqRZAkyxbOQN8CmGtW_gDmY'
 // get google search api key https://developers.google.com/custom-search/v1/introduction
 google_api_url_template += 'key=' + google_api_key_local_only

 // get search engine id https://programmablesearchengine.google.com/controlpanel/overview?cx=a2bca0af3c40b47cf
 google_api_url_template += '&cx=' + 'a2bca0af3c40b47cf'
 var google_api_url

// search entire web search engine
//<script async src="https://cse.google.com/cse.js?cx=a2bca0af3c40b47cf">
//</script>
//<div class="gcse-search"></div>







// resize canvas, click view button, adjust canvas, file - export - new .svg file    https://boxy-svg.com/

var pin_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path fill="#00ff11" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>'


var table_svg = '<svg width="16px" height="16px" viewBox="5.607 7.521 50.735 51.009" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="table.svg"/></bx:export></defs><g id="General" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="SLICES-64px" transform="translate(-180.000000, -400.000000)"/><g id="ICONS" transform="translate(-175.000000, -395.000000)"><g id="db-table" transform="translate(182.000000, 404.000000)"><path d="M0,45 C0,46.656 1.343,48 3,48 L12,48 L12,36 L0,36 L0,45 Z" id="Fill-581" fill="#FFFFFF"/><polygon id="Fill-582" fill="#FFFFFF" points="0 36 12 36 12 24 0 24"/><polygon id="Fill-583" fill="#FFFFFF" points="12 48 24 48 24 36 12 36"/><polygon id="Fill-584" fill="#FFFFFF" points="24 48 36 48 36 36 24 36"/><polygon id="Fill-585" fill="#FFFFFF" points="12 36 24 36 24 24 12 24"/><polygon id="Fill-586" fill="#FFFFFF" points="24 36 36 36 36 24 24 24"/><polygon id="Fill-587" fill="#FFFFFF" points="36 36 48 36 48 24 36 24"/><polygon id="Fill-588" fill="#FFFFFF" points="0 24 12 24 12 12 0 12"/><polygon id="Fill-589" fill="#FFFFFF" points="12 24 24 24 24 12 12 12"/><polygon id="Fill-590" fill="#FFFFFF" points="24 24 36 24 36 12 24 12"/><polygon id="Fill-591" fill="#FFFFFF" points="36 24 48 24 48 12 36 12"/><path d="M45,0 L3,0 C1.343,0 0,1.344 0,3 L0,12 L48,12 L48,3 C48,1.344 46.657,0 45,0" id="Fill-592" fill="#4BAADC"/><path d="M36,36 L36,48 L45,48 C46.657,48 48,46.656 48,45 L48,36 L36,36 Z" id="Fill-593" fill="#FFFFFF"/><path d="M45,0 L3,0 C1.343,0 0,1.343 0,3 L0,45 C0,46.657 1.343,48 3,48 L45,48 C46.657,48 48,46.657 48,45 L48,3 C48,1.343 46.657,0 45,0 Z" id="Stroke-594" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M0,12 L48,12" id="Stroke-595" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M0,24 L48,24" id="Stroke-596" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M0,36 L48,36" id="Stroke-597" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24,12 L24,48" id="Stroke-598" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M36,12 L36,48" id="Stroke-599" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12,12 L12,48" id="Stroke-600" stroke="#1E69A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></g></g></svg>'

var download_svg = '<svg fill="#000000" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.978 29.978" xml:space="preserve"> <g><path fill="#ff0000" d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012	v-8.861H25.462z"/><path fill="#ff0000" d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723	c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742	c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193	C15.092,18.979,14.62,18.426,14.62,18.426z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g> </g> </svg>'


var microsoft_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="5.436 5.641 37.026 37.026"  xmlns:bx="https://boxy-svg.com"><defs><bx:export><bx:file format="svg" path="microsoft.svg"/></bx:export></defs><path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"/><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"/><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"/><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"/></svg>'


var google_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="3.487 3.59 40.821 40.615" xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="google.svg"/></bx:export></defs><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>'

var here_svg = '<svg width="90" height="34" viewBox="0 0 126 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.875 32.0288L12.7139 33.2286L17.0547 15.9378L12.2158 14.738L7.875 32.0288ZM25.327 14.738L20.9862 32.0288L25.8251 33.2286L30.1659 15.9378L25.327 14.738Z" fill="#315994"/> <path d="M9.21094 26.6828L16.5226 16.9612L10.0471 23.4011L9.21094 26.6828ZM23.1405 23.4188L22.3222 26.7005L29.6339 16.9788L23.1405 23.4188Z" fill="#092F4B"/> <mask id="mask0_1399_5478" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="12" width="40" height="24"> <path d="M17.1249 15.3559C17.1249 13.9973 16.0041 12.8857 14.6343 12.8857C13.9583 12.8857 13.3356 13.1504 12.8909 13.6091L12.8731 13.6268L5.41906 21.0018C4.95652 21.4606 4.67188 22.0781 4.67188 22.7662C4.67188 24.1247 5.79265 25.2363 7.16248 25.2363C7.8385 25.2363 8.46115 24.954 8.92369 24.5129L16.4133 17.1026C16.858 16.6438 17.1249 16.0263 17.1249 15.3559Z" fill="white"/> <path d="M30.2361 15.3735C30.2361 14.0149 29.1154 12.9034 27.7455 12.9034C27.0517 12.9034 26.4291 13.1857 25.9843 13.6444L8.55009 30.9175C8.08755 31.3586 7.8207 31.9938 7.8207 32.6643C7.8207 34.0228 8.94147 35.1344 10.3113 35.1344C11.0051 35.1344 11.6278 34.8521 12.0725 34.411L29.3644 17.2614C29.8448 16.7673 30.2361 16.1322 30.2361 15.3735Z" fill="white"/> <path d="M43.3296 12.8857V16.4674L25.1838 34.3581C24.739 34.8168 24.0986 35.1167 23.387 35.1167C22.0171 35.1167 20.8964 34.0052 20.8964 32.6466C20.8964 31.9232 21.1988 31.2881 21.6969 30.847L39.8072 12.8857H43.3296Z" fill="white"/> </mask> <g mask="url(#mask0_1399_5478)"> <path d="M17.125 35.1166L39.9932 12.5327H47.5459L24.8876 35.1166H17.125Z" fill="url(#paint0_linear_1399_5478)"/> <path d="M3.78125 35.1166L26.7831 12.5327H34.3801L11.5892 35.1166H3.78125Z" fill="url(#paint1_linear_1399_5478)"/> <path d="M2.35938 23.7526L13.6475 12.5327H20.861L7.44342 25.9419L2.35938 23.7526Z" fill="url(#paint2_linear_1399_5478)"/> </g> <path d="M55.984 23.64H50.736V29H49.776V18.04H50.736V22.824H55.984V18.04H56.944V29H55.984V23.64ZM65.1508 18.84H60.6547V22.92H64.5428V23.72H60.6547V28.2H65.3748V29H59.6947V18.04H65.2628L65.1508 18.84ZM70.2343 24.088H68.0422V29H67.0822V18.04H69.7382C72.3409 18.04 73.6423 19.032 73.6423 21.016C73.6423 21.8053 73.4343 22.4347 73.0182 22.904C72.6022 23.3733 71.9942 23.7093 71.1943 23.912L74.2023 29H73.0662L70.2343 24.088ZM69.8663 23.304C71.7009 23.304 72.6182 22.5413 72.6182 21.016C72.6182 20.2693 72.3889 19.72 71.9303 19.368C71.4716 19.0053 70.7302 18.824 69.7062 18.824H68.0422V23.304H69.8663ZM81.1758 18.84H76.6798V22.92H80.5678V23.72H76.6798V28.2H81.3998V29H75.7198V18.04H81.2878L81.1758 18.84ZM97.6033 17.912L95.7473 29H92.3393L90.9633 20.536L89.5073 29H86.1793L84.3553 17.912H86.9793L88.0833 27.016L89.6193 17.912H92.3713L93.8113 27.016L95.1073 17.912H97.6033ZM105.938 24.584C105.938 24.856 105.922 25.24 105.89 25.496H100.626C100.802 27.016 101.522 27.432 102.562 27.432C103.25 27.432 103.858 27.192 104.594 26.68L105.634 28.088C104.786 28.76 103.698 29.272 102.322 29.272C99.4899 29.272 98.0499 27.448 98.0499 24.792C98.0499 22.248 99.4419 20.232 102.018 20.232C104.45 20.232 105.938 21.832 105.938 24.584ZM103.458 23.976V23.864C103.442 22.712 103.09 21.912 102.082 21.912C101.234 21.912 100.738 22.456 100.626 23.976H103.458ZM112.173 17.64C113.789 17.64 114.957 18.2 115.869 19L114.541 20.392C113.789 19.816 113.181 19.544 112.285 19.544C110.733 19.544 109.581 20.696 109.581 23.448C109.581 26.36 110.349 27.352 111.885 27.352C112.429 27.352 112.925 27.24 113.389 26.984V24.472H111.949L111.693 22.616H115.933V28.104C114.781 28.84 113.341 29.272 111.949 29.272C108.557 29.272 106.861 27.24 106.861 23.448C106.861 19.688 109.197 17.64 112.173 17.64ZM121.254 20.232C123.846 20.232 125.414 21.896 125.414 24.76C125.414 27.48 123.846 29.272 121.254 29.272C118.678 29.272 117.094 27.608 117.094 24.744C117.094 22.024 118.662 20.232 121.254 20.232ZM121.254 22.088C120.23 22.088 119.718 22.904 119.718 24.744C119.718 26.632 120.23 27.416 121.254 27.416C122.278 27.416 122.79 26.6 122.79 24.76C122.79 22.872 122.278 22.088 121.254 22.088Z" fill="white"/> <defs> <linearGradient id="paint0_linear_1399_5478" x1="17.699" y1="38.547" x2="24.2252" y2="5.14303" gradientUnits="userSpaceOnUse"> <stop offset="0.16" stop-color="#48DAD0"/> <stop offset="0.2" stop-color="#48D4D3"/> <stop offset="0.42" stop-color="#49B2E6"/> <stop offset="0.64" stop-color="#4A9AF4"/> <stop offset="0.84" stop-color="#4A8BFC"/> <stop offset="1" stop-color="#4A86FF"/> </linearGradient> <linearGradient id="paint1_linear_1399_5478" x1="4.50292" y1="37.9753" x2="10.9953" y2="5.41335" gradientUnits="userSpaceOnUse"> <stop offset="0.16" stop-color="#48DAD0"/> <stop offset="0.2" stop-color="#48D4D3"/> <stop offset="0.42" stop-color="#49B2E6"/> <stop offset="0.64" stop-color="#4A9AF4"/> <stop offset="0.84" stop-color="#4A8BFC"/> <stop offset="1" stop-color="#4A86FF"/> </linearGradient> <linearGradient id="paint2_linear_1399_5478" x1="1.67413" y1="27.447" x2="5.90151" y2="6.96339" gradientUnits="userSpaceOnUse"> <stop offset="0.16" stop-color="#48DAD0"/> <stop offset="0.2" stop-color="#48D4D3"/> <stop offset="0.42" stop-color="#49B2E6"/> <stop offset="0.64" stop-color="#4A9AF4"/> <stop offset="0.84" stop-color="#4A8BFC"/> <stop offset="1" stop-color="#4A86FF"/> </linearGradient> </defs> </svg>'

var esri_svg = '<svg height="20" width="20" viewBox="23.744 23.6 980.678 980.587"  xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="esri-1.svg"/></bx:export></defs><radialGradient id="a" cx="377.99" cy="444.28" gradientUnits="userSpaceOnUse" r="289.58"><stop offset="0" stop-color="#a9e0f6"/><stop offset="1" stop-color="#147bc1"/></radialGradient><linearGradient id="b"><stop offset="0" stop-color="#a4cd39"/><stop offset="0.96" stop-color="#0f9f49"/><stop offset="1" stop-color="#0f9f49"/></linearGradient><radialGradient id="c" cx="358.49" cy="448.47" gradientUnits="userSpaceOnUse" r="354.3" href="#b"/><radialGradient id="d" cx="440.58" cy="425.25" gradientUnits="userSpaceOnUse" r="452.2" href="#b"/><radialGradient id="e" cx="487.84" cy="232.55" gradientUnits="userSpaceOnUse" r="595.54" href="#b"/><path d="m100.4 520.1c0 225.5 183.4 408.3 409.5 408.3s409.5-182.8 409.5-408.3-183.4-408.4-409.5-408.4-409.5 182.9-409.5 408.4" fill="url(#a)"/><path d="m337 198.8c-31.5 1.3-61.8 5.5-91.9 10-85.4 72.3-140.6 178.8-144.4 298.4 24.2 25.4 56 82.7 92.8 115.9a132.9 132.9 0 0 1 15.8-5.7c-18-20.9-43.3-48.6-47.1-61.4-18.5-62.5 3-121 49.5-125.6 41.6-4.2 77.3-65.9 106.7-106.5 60.5-83.4 153.3-69.5 148.7-111.2-5.4-24.4-19.8-31.9-38.3-31.9-27.7 0-64.3 16.9-91.8 18" fill="url(#c)"/><path d="m226.8 612.4-17.5 5c-5 1.3-9 3.3-15.8 5.7-15 6.7-25.9 16.9-28.4 38.8-4.6 39.7 33.2 70.8 65.1 79.9 40.4 11.6 43.8-1.9 65 26.7 14.9 20 17.7 57 25.3 81.4a251.3 251.3 0 0 0 16.8 40.5 407.1 407.1 0 0 0 91.7 30c7.9-47 4.3-110.5 14.9-137.9 21.6-56.2 33.8-81 4.6-138.9-64.3-18.2-83.9-23.9-148.6-37.2-13.3-2.7-21.5-4-28.9-4-11.5 0-21 3.2-44.2 10" fill="url(#d)"/><path d="m625 286.8c-18.9 27.1-85.5 34.5-106.8 64.9-16.6 23.7.5 70.3-13.9 97.2-6.7 12.4-3.6 48.4 4.5 60.2 25.6 37.2 68.2 16.5 100.2 29.9 39.1 16.2 43.6 61.5 76 94.5s-41.4 84.2 18.9 204.6c6.4 12.9 14 22.4 22 28.9a410.9 410.9 0 0 0 106.2-95.2c9.2-60.8-11.4-80.2 14.3-135.9 15.9-34.3 43.1-93.8 72.4-134.1-4.9-112.7-55.7-213.6-134.2-284.5-7.4 2-16.7 2.4-29.5.1a158.4 158.4 0 0 0 -29.9-2.9c-60.5 0-78.6 41.5-100.2 72.3" fill="url(#e)"/><path d="m378.6 428.9c69.7-29.5 145.3-53.1 247.1-61.6-26-62.1-54.6-106-88.3-146.1-75 6-143.6 26.2-202.8 50.6 8.7 46 25.2 101.6 44 157.1m324.9 171.1c-96.4-1.1-180.5 21.9-238.1 50.1 24.4 52.3 72.6 121.7 90.6 150.2 31.4-11.6 65-20.3 91.2-24.4s60.9-7.9 84.5-7.5c-4.2-60.9-11.4-102-28.2-168.4m-255.5 15.2c77-35.3 161.6-51.2 246.8-48.9-23.3-80.3-36.6-117.6-56.4-166.5-94.6 4.1-175.3 27.4-248.8 62.1 0 0 27.1 86.9 58.4 153.3m296.1-387.6c-47.2-8.6-116.1-14-167.2-10.9 34.9 48.1 60.4 90 84.4 149.7 64.6 1.6 152.5 20.9 188.5 35-21.5-57.2-62.3-129.7-105.7-173.8m146.9 379.5c-2.9-53-11-123.9-30.8-173.3-52.2-20.9-123.6-34-186.3-34.6 19.3 45 41.8 120.2 52.8 168.6 45.3 5.5 116.1 18.2 164.3 39.3m-43.1-371c-67.4-82.3-219.9-152.3-389.6-141.7 37.9 24.9 69.5 62.6 97.1 93.6 42.4-3.9 131.4 3.1 164.9 12.3-5.7-6.7-12.7-13.3-14.5-17.3-4.8-10.2 6.7-12.4 15.9-6.6 11.6 7.5 25 16.3 35.6 27.1 19.7 4.4 68.1 21 90.6 32.6m81.2 396.1c-1.9 6.6-13.5 13.2-18.9 11.6.8 11.7-2 69.9-5.1 92.4 8.1-16.6 23.6-57.9 28.3-75.2l6.5-25.7c6.6-21.7 27.7-97 8.6-195.9-21.3-109.9-61.2-149.2-75.1-166.6-35.4-19.2-89-36.7-89-36.7 48.5 65.6 65.4 96.5 94.4 174.6 16.9 8.7 47.5 25.6 51.2 30.3s3.2 10.2-6.4 10c-8 0-23.5-7.6-35.5-10.8 12.8 42.5 22.6 122 21.9 175.3 0 0 21.1 10.1 19.1 16.7m-61.9 161.8c7-7 17.4-21.7 21.5-30.3 4.1-34.9 4.2-106.5 2.7-127.3-42.2-17.1-107.4-30.6-155-34.1 15.5 56.7 23.2 140.1 24.4 167.3 22.8 2.3 80.5 13.9 106.4 24.4m-108.4 95.8c37-22.9 71.6-49.3 96.8-81.1-21.7-5.4-70.1-12-94.1-10.4 0 0-.7 57.4-2.7 91.5m-100.8 47.4c18.4-5.8 65.2-27 74.9-33.4a989.1 989.1 0 0 0 .4-105.9c-49.2 0-118.5 14.3-158.1 30.9 23 37 54.7 77.7 82.8 108.4m-221-32.1c13.7 13.8 68.2 49.8 68.2 49.8 36.2 1.5 82-2.7 114.7-8.4-18.1-20.5-63-84-76.7-105.4-34.8 14.6-78.9 41.4-106.2 64m-148.9-151.2c34.7 44.3 88.9 100.5 126.7 131.6 35.7-28.6 76.2-55.4 109.9-71.7-29.1-44.9-72-110.2-90-150.4-64.5 28.5-101.1 52.4-146.6 90.5m-92.1-177.7c22.1 62.8 43.4 110.7 71.3 150.2 32.6-28.2 99.4-72.9 150.5-97.3-16.8-36.1-41.1-103.5-58-154-65.9 32.2-115 63.6-163.8 101.1m-52.8-188.6c5.2 36.1 22.6 114.1 38.3 153.6 37.2-27.9 121.3-79.7 169-100.6-16.7-60.6-27.9-98.8-37.2-159.9-67.3 29.9-138.5 76.3-170.1 106.9m-8.2-128.7c-2.3 18.2.1 51.8 4.7 92 37.2-33.1 109-76.4 169-102.8-7-45.6-14.4-118.3-13.6-137.7-55.5 30.4-116.4 91.4-161.1 154.1m181.6-189.9c79.8-32.9 157.5-51 247.2-38.8 10 1.4 9.1 9.8-1.5 9.9l-12.6.4c-72.2 1.1-178.5 24-233.5 55-1.1 36.5 5.8 94.6 13.2 140.4 49.9-20.9 127.2-42.4 185.8-48.9-33.3-35.2-78.6-68.6-84-72.5s-8.1-10.5-8.1-19c.8-15.9 14.5-17.9 21.8-16 24.4-4.8 48.7-10.1 90-8.8 174.8-7.6 334.4 90.9 395.3 203.3 154.4 243.4.1 579.3-202 668.7-86.5 38.3-160.6 54.8-297.2 35.8s-248.8-85.8-335.7-226.1c-107.1-172.9-46.8-374.3-31.8-416.5 64.5-151.6 170.1-232 253.1-266.9m-206.1 299.6c-1.7-26.2-3.8-62-3.8-62-19.3 41.8-30.8 67-36.2 115.9 13.5-23.9 40-53.9 40-53.9m282 530.8c-29.1-21.7-100.9-89.6-130.7-130.6-11 6.4-23.2 23.9-39 26.9-6.2 1.1-20.3 2.8-24.4 1.1s.9-10.4 5.4-16.2a191 191 0 0 1 35.6-36c-35.4-51.8-52.2-89.7-76.3-152.1-14 8.7-24.1 16.4-36.2 26-4.1 3.2-15.4 5.3-20.8.4-9.9-8.9-10.1-24.5 3.9-34.4 5.7-4 34-23.5 40.6-29-17.4-50.1-32-115.9-35.9-150.1-11.6 10.1-27.9 21.5-32.5 24.7-6.6 1.8-11-.3-12.9-.6-6.6 70.8 1 148.8 22.1 219.2 36.3 121.1 138.1 236.5 275.5 279.5 3.2-4.8 19-23 25.6-28.8m71.6 48.5c-13.6-7.8-30.6-19.8-46.4-30.3-6.6 5.8-11.9 14.3-17.2 21.2 18.2 6.2 42.7 6.7 63.6 9.1" fill="#1f191a"/></svg>'

var mapbox_svg = '<svg fill="#734dff" width="20px" height="20px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Mapbox icon</title><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.696 14.943c-4.103 4.103-11.433 2.794-11.433 2.794S4.94 10.421 9.057 6.304c2.281-2.281 6.061-2.187 8.45.189s2.471 6.168.189 8.45zm-4.319-7.91l-1.174 2.416-2.416 1.174 2.416 1.174 1.174 2.416 1.174-2.416 2.416-1.174-2.416-1.174-1.174-2.416z"/></svg>'
var police_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="18" viewBox="0 0 7410 3900"> <rect width="7410" height="3900" fill="#000"/> <path d="M0,450H7410m0,600H0m0,600H7410m0,1200H0m0,600H7410m0" stroke="#FFF" stroke-width="300"/> <path d="M0,2250H7410m0" stroke="#00F" stroke-width="300"/> <rect width="2964" height="2100" fill="#000"/> <g fill="#FFF"> <g id="s18"> <g id="s9"> <g id="s5"> <g id="s4"> <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/> <use xlink:href="#s" y="420"/> <use xlink:href="#s" y="840"/> <use xlink:href="#s" y="1260"/> </g> <use xlink:href="#s" y="1680"/> </g> <use xlink:href="#s4" x="247" y="210"/> </g> <use xlink:href="#s9" x="494"/> </g> <use xlink:href="#s18" x="988"/> <use xlink:href="#s9" x="1976"/> <use xlink:href="#s5" x="2470"/> </g> </svg>'

var yelp_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="20px" viewBox="8.308 3.077 31.179 42.256"  xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="yelp.svg"/></bx:export></defs><path fill="#DD2C00" d="M10.7,32.7c-0.5,0-0.9-0.3-1.2-0.8c-0.2-0.4-0.3-1-0.4-1.7c-0.2-2.2,0-5.5,0.7-6.5c0.3-0.5,0.8-0.7,1.2-0.7c0.3,0,0.6,0.1,7.1,2.8c0,0,1.9,0.8,1.9,0.8c0.7,0.3,1.1,1,1.1,1.8c0,0.8-0.5,1.4-1.2,1.6c0,0-2.7,0.9-2.7,0.9C11.2,32.7,11,32.7,10.7,32.7z M24,36.3c0,6.3,0,6.5-0.1,6.8c-0.2,0.5-0.6,0.8-1.1,0.9c-1.6,0.3-6.6-1.6-7.7-2.8c-0.2-0.3-0.3-0.5-0.4-0.8c0-0.2,0-0.4,0.1-0.6c0.1-0.3,0.3-0.6,4.8-5.9c0,0,1.3-1.6,1.3-1.6c0.4-0.6,1.3-0.7,2-0.5c0.7,0.3,1.2,0.9,1.1,1.6C24,33.5,24,36.3,24,36.3z M22.8,22.9c-0.3,0.1-1.3,0.4-2.5-1.6c0,0-8.1-12.9-8.3-13.3c-0.1-0.4,0-1,0.4-1.4c1.2-1.3,7.7-3.1,9.4-2.7c0.6,0.1,0.9,0.5,1.1,1c0.1,0.6,0.9,12.5,1,15.2C24.1,22.5,23.1,22.8,22.8,22.9z M27.2,25.9c-0.4-0.6-0.4-1.4,0-1.9c0,0,1.7-2.3,1.7-2.3c3.6-5,3.8-5.3,4.1-5.4c0.4-0.3,0.9-0.3,1.4-0.1c1.4,0.7,4.4,5.1,4.6,6.7c0,0,0,0,0,0.1c0,0.6-0.2,1-0.6,1.3c-0.3,0.2-0.5,0.3-7.4,1.9c-1.1,0.3-1.7,0.4-2,0.5c0,0,0-0.1,0-0.1C28.4,26.9,27.6,26.5,27.2,25.9z M38.9,34.4c-0.2,1.6-3.5,5.8-5.1,6.4c-0.5,0.2-1,0.2-1.4-0.2c-0.3-0.2-0.5-0.6-4.1-6.4l-1.1-1.7c-0.4-0.6-0.3-1.4,0.2-2.1c0.5-0.6,1.2-0.8,1.9-0.6c0,0,2.7,0.9,2.7,0.9c6,2,6.2,2,6.4,2.2C38.8,33.4,39,33.9,38.9,34.4z"/></svg>'


//var paypal_text_svg = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566.93 137.35"><defs><style>.cls-1{fill:#009ee3;}.cls-1,.cls-2,.cls-3{fill-rule:evenodd;}.cls-2{fill:#113984;}.cls-3{fill:#172c70;}</style></defs><path class="cls-1" d="M192.95,386.87h38.74c20.8,0,28.63,10.53,27.42,26-2,25.54-17.44,39.67-37.92,39.67H210.85c-2.81,0-4.7,1.86-5.46,6.9L201,488.74c-0.29,1.9-1.29,3-2.79,3.15H173.87c-2.29,0-3.1-1.75-2.5-5.54l14.84-93.93C186.79,388.66,188.85,386.87,192.95,386.87Z" transform="translate(-143.48 -354.54)"/><path class="cls-2" d="M361.14,385.13c13.07,0,25.13,7.09,23.48,24.76-2,21-13.25,32.62-31,32.67H338.11c-2.23,0-3.31,1.82-3.89,5.55l-3,19.07c-0.45,2.88-1.93,4.3-4.11,4.3H312.68c-2.3,0-3.1-1.47-2.59-4.76L322,390.29c0.59-3.76,2-5.16,4.57-5.16h34.54Zm-23.5,40.92h11.75c7.35-.28,12.23-5.37,12.72-14.55,0.3-5.67-3.53-9.73-9.62-9.7l-11.06.05-3.79,24.2h0Zm86.21,39.58c1.32-1.2,2.66-1.82,2.47-.34l-0.47,3.54c-0.24,1.85.49,2.83,2.21,2.83h12.82c2.16,0,3.21-.87,3.74-4.21l7.9-49.58c0.4-2.49-.21-3.71-2.1-3.71H436.32c-1.27,0-1.89.71-2.22,2.65l-0.52,3.05c-0.27,1.59-1,1.87-1.68.27-2.39-5.66-8.49-8.2-17-8-19.77.41-33.1,15.42-34.53,34.66-1.1,14.88,9.56,26.57,23.62,26.57,10.2,0,14.76-3,19.9-7.7h0ZM413.11,458c-8.51,0-14.44-6.79-13.21-15.11s9.19-15.11,17.7-15.11,14.44,6.79,13.21,15.11S421.63,458,413.11,458h0Zm64.5-44h-13c-2.68,0-3.77,2-2.92,4.46l16.14,47.26L462,488.21c-1.33,1.88-.3,3.59,1.57,3.59h14.61a4.47,4.47,0,0,0,4.34-2.13l49.64-71.2c1.53-2.19.81-4.49-1.7-4.49H516.63c-2.37,0-3.32.94-4.68,2.91l-20.7,30L482,416.82C481.46,415,480.11,414,477.62,414Z" transform="translate(-143.48 -354.54)"/><path class="cls-1" d="M583.8,385.13c13.07,0,25.13,7.09,23.48,24.76-2,21-13.25,32.62-31,32.67H560.78c-2.23,0-3.31,1.82-3.89,5.55l-3,19.07c-0.45,2.88-1.93,4.3-4.11,4.3H535.35c-2.3,0-3.1-1.47-2.59-4.76l11.93-76.45c0.59-3.76,2-5.16,4.57-5.16H583.8Zm-23.5,40.92h11.75c7.35-.28,12.23-5.37,12.72-14.55,0.3-5.67-3.53-9.73-9.62-9.7l-11.06.05-3.79,24.2h0Zm86.21,39.58c1.32-1.2,2.66-1.82,2.47-.34l-0.47,3.54c-0.24,1.85.49,2.83,2.21,2.83h12.82c2.16,0,3.21-.87,3.74-4.21l7.9-49.58c0.4-2.49-.21-3.71-2.1-3.71H659c-1.27,0-1.89.71-2.22,2.65l-0.52,3.05c-0.27,1.59-1,1.87-1.68.27-2.39-5.66-8.49-8.2-17-8-19.77.41-33.1,15.42-34.53,34.66-1.1,14.88,9.56,26.57,23.62,26.57,10.2,0,14.76-3,19.9-7.7h0ZM635.78,458c-8.51,0-14.44-6.79-13.21-15.11s9.19-15.11,17.7-15.11,14.44,6.79,13.21,15.11S644.29,458,635.78,458h0Zm59.13,13.74h-14.8a1.75,1.75,0,0,1-1.81-2l13-82.36a2.55,2.55,0,0,1,2.46-2h14.8a1.75,1.75,0,0,1,1.81,2l-13,82.36A2.55,2.55,0,0,1,694.91,471.76Z" transform="translate(-143.48 -354.54)"/><path class="cls-2" d="M168.72,354.54h38.78c10.92,0,23.88.35,32.54,8,5.79,5.11,8.83,13.24,8.13,22-2.38,29.61-20.09,46.2-43.85,46.2H185.2c-3.26,0-5.41,2.16-6.33,8l-5.34,34c-0.35,2.2-1.3,3.5-3,3.66H146.6c-2.65,0-3.59-2-2.9-6.42L160.9,361C161.59,356.62,164,354.54,168.72,354.54Z" transform="translate(-143.48 -354.54)"/><path class="cls-3" d="M179.43,435.29l6.77-42.87c0.59-3.76,2.65-5.56,6.75-5.56h38.74c6.41,0,11.6,1,15.66,2.85-3.89,26.36-20.94,41-43.26,41H185C182.44,430.72,180.56,432,179.43,435.29Z" transform="translate(-143.48 -354.54)"/></svg>'
var paypal_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="4.513 5.538 36.82 36.923"  xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="paypal.svg"/></bx:export></defs><path fill="#1565C0" d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"/><path fill="#039BE5" d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z"/><path fill="#283593" d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z"/></svg>'

var visa_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="16px" width="24px"  viewBox="2.667 8.718 42.564 30.563"  xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="visa.svg"/></bx:export></defs><path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"/><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"/></svg>'

var mastercard_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="16px" width="24px" viewBox="-0.299 -0.231 70.299 48.312" fill="none" xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" path="mastercard.svg"/></bx:export></defs><rect x="0.5" y="0.5" width="69" height="47" rx="5.5" fill="white" stroke="#D9D9D9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M35.3945 34.7619C33.0114 36.8184 29.92 38.0599 26.5421 38.0599C19.0047 38.0599 12.8945 31.8788 12.8945 24.254C12.8945 16.6291 19.0047 10.448 26.5421 10.448C29.92 10.448 33.0114 11.6895 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z" fill="#ED0006"/><path fill-rule="evenodd" clip-rule="evenodd" d="M35.3945 34.7619C38.3289 32.2296 40.1896 28.4616 40.1896 24.254C40.1896 20.0463 38.3289 16.2783 35.3945 13.7461C37.7777 11.6895 40.869 10.448 44.247 10.448C51.7843 10.448 57.8945 16.6291 57.8945 24.254C57.8945 31.8788 51.7843 38.0599 44.247 38.0599C40.869 38.0599 37.7777 36.8184 35.3945 34.7619Z" fill="#F9A000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M35.3946 13.7461C38.329 16.2784 40.1897 20.0463 40.1897 24.254C40.1897 28.4616 38.329 32.2295 35.3946 34.7618C32.4603 32.2295 30.5996 28.4616 30.5996 24.254C30.5996 20.0463 32.4603 16.2784 35.3946 13.7461Z" fill="#FF5E00"/></svg>'

// not use
//var google_wallet_svg = '<svg height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 	 viewBox="0 0 291.764 291.764" xml:space="preserve"> <g> 	<path style="fill:#26A6D1;" d="M122.077,133.692c-16.631-23.15-41.558-43.436-67.79-57.605c-3.994-2.161-8.489-3.301-13.002-3.301 		c-10.221,0-19.548,5.635-24.353,14.707c-7.176,13.549-2.106,30.453,11.297,37.72c40.482,21.846,66.595,63.559,69.668,111.755 		l-0.009-0.128c-0.465-5.379,0.401-10.631,2.854-15.619l1.204-2.243c12.628-20.998,21.071-45.16,21.071-69.859 		C123.016,143.949,122.66,138.798,122.077,133.692"/> 	<path style="fill:#EFC75E;" d="M196.176,248.647c15.062-32.039,22.703-66.376,22.703-102.127c0-12.291-0.839-21.244-1.468-26.906 		c-19.794-31.857-48.506-60.331-82.132-81.165l0.839,0.556c2.325,1.696,4.285,3.456,6.328,6.127l1.751,2.544 		c17.907,29.751,27.362,63.933,27.362,98.854c0,4.167-0.137,8.315-0.401,12.464c14.36,27.481,22.201,58.699,22.201,91.477 		c0,2.589,0.055,6.774-0.018,9.838c0.155-3.428,0.994-7.039,2.225-10.194L196.176,248.647"/> 	<path style="fill:#3DB39E;" d="M270.211,79.178c-5.106-21.299-12.692-42.078-22.539-61.809C242.384,6.829,231.078,0,218.797,0 		c-4.741,0-9.346,0.994-13.676,2.954c-15.901,7.212-22.657,25.447-15.117,40.528c16.22,32.568,24.235,66.978,24.235,102.719 		s-8.06,70.106-23.952,102.127c-0.246,0.501-3.027,6.164-3.027,12.719c-0.036,1.833,0.191,4.595,0.821,7.048 		c2.061,8.598,7.96,16.421,17.415,20.715c4.331,1.96,8.899,2.954,13.64,2.954c11.634,0,22.42-6.145,27.982-15.774 		c6.364-11.379,12.81-26.359,18.427-45.606c1.76-5.79,3.246-11.233,4.65-17.132c5.197-21.746,7.896-44.148,7.896-67.051 		C278.089,123.571,275.39,100.85,270.211,79.178"/> 	<path style="fill:#E2574C;" d="M150.141,50.557l-1.787-2.562c-2.042-2.69-4.468-4.914-7.203-6.711 		c-4.641-3.027-10.212-4.787-15.865-4.787c-4.696,0-7.094,0.565-10.458,1.924c-3.465,1.368-7.139,3.255-10.458,6.765 		c-3.291,3.474-5.27,7.021-6.647,10.704c-2.781,7.413-2.444,17.159,2.407,24.946c10.194,16.384,16.193,34.975,18.399,54.122 		c0.593,5.097,0.948,10.221,0.948,15.391c0,24.627-6.711,48.706-19.421,69.631l-1.213,2.243c-2.471,4.978-3.364,10.385-2.872,15.637 		c0.848,8.89,5.689,17.305,13.895,22.274c2.106,1.286,4.358,2.243,6.674,2.954c2.754,0.821,5.589,1.304,8.479,1.304 		c10.312,0,19.658-5.252,25.019-14.069c16.102-26.496,25.484-56.466,27.517-87.402c0.246-4.167,0.401-8.37,0.401-12.573 		C177.931,115.101,168.321,80.591,150.141,50.557"/> </g> </svg>' 


var apple_pay_svg = '<svg width="64px" height="64px" viewBox="-5.8 -5.8 69.60 69.60" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c2c2c2" transform="matrix(1, 0, 0, 1, 0, 0)"> <g id="SVGRepo_bgCarrier" stroke-width="0"/> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/> <g id="SVGRepo_iconCarrier"> <rect x="0.5" y="0.5" width="57" height="39" rx="3.5" fill="white" stroke="#ffffff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5771 14.9265C17.1553 15.4313 16.4803 15.8294 15.8053 15.7725C15.7209 15.09 16.0513 14.3649 16.4381 13.9171C16.8599 13.3981 17.5982 13.0284 18.1959 13C18.2662 13.7109 17.992 14.4076 17.5771 14.9265ZM18.1888 15.9076C17.5942 15.873 17.0516 16.0884 16.6133 16.2624C16.3313 16.3744 16.0924 16.4692 15.9107 16.4692C15.7068 16.4692 15.4581 16.3693 15.1789 16.2571C14.813 16.1102 14.3947 15.9422 13.956 15.9502C12.9506 15.9645 12.0154 16.5403 11.5021 17.4573C10.4474 19.2915 11.2279 22.0071 12.2474 23.5C12.7467 24.2393 13.3443 25.0498 14.1318 25.0213C14.4783 25.0081 14.7275 24.9012 14.9854 24.7905C15.2823 24.6631 15.5908 24.5308 16.0724 24.5308C16.5374 24.5308 16.8324 24.6597 17.1155 24.7834C17.3847 24.9011 17.6433 25.014 18.0271 25.0071C18.8428 24.9929 19.356 24.2678 19.8553 23.5284C20.394 22.7349 20.6307 21.9605 20.6667 21.843L20.6709 21.8294C20.67 21.8285 20.6634 21.8254 20.6516 21.82C20.4715 21.7366 19.095 21.0995 19.0818 19.391C19.0686 17.957 20.1736 17.2304 20.3476 17.116C20.3582 17.109 20.3653 17.1043 20.3685 17.1019C19.6654 16.0498 18.5685 15.936 18.1888 15.9076ZM23.8349 24.9289V13.846H27.9482C30.0717 13.846 31.5553 15.3246 31.5553 17.4858C31.5553 19.6469 30.0435 21.1398 27.892 21.1398H25.5365V24.9289H23.8349ZM25.5365 15.2962H27.4982C28.9748 15.2962 29.8185 16.0924 29.8185 17.4929C29.8185 18.8934 28.9748 19.6967 27.4912 19.6967H25.5365V15.2962ZM37.1732 23.5995C36.7232 24.4668 35.7318 25.0142 34.6631 25.0142C33.081 25.0142 31.9771 24.0616 31.9771 22.6256C31.9771 21.2038 33.0459 20.3863 35.0217 20.2654L37.1451 20.1374V19.5261C37.1451 18.6232 36.5615 18.1327 35.5209 18.1327C34.6631 18.1327 34.0373 18.5806 33.9107 19.263H32.3779C32.4271 17.827 33.7631 16.782 35.5701 16.782C37.5177 16.782 38.7834 17.8128 38.7834 19.4123V24.9289H37.2084V23.5995H37.1732ZM35.1201 23.6991C34.2131 23.6991 33.6365 23.2583 33.6365 22.5829C33.6365 21.8863 34.192 21.481 35.2537 21.4171L37.1451 21.2962V21.9218C37.1451 22.9597 36.2732 23.6991 35.1201 23.6991ZM44.0076 25.3626C43.3256 27.3033 42.5451 27.9431 40.8857 27.9431C40.7592 27.9431 40.3373 27.9289 40.2388 27.9005V26.5711C40.3443 26.5853 40.6045 26.5995 40.7381 26.5995C41.4904 26.5995 41.9123 26.2796 42.1724 25.4479L42.3271 24.9573L39.4443 16.8886H41.2232L43.2271 23.436H43.2623L45.2662 16.8886H46.9959L44.0076 25.3626Z" fill="#c2c2c2"/> </g> </svg>'
var apple_svg = '<svg fill="#b0b0b0" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <g id="SVGRepo_bgCarrier" stroke-width="0"/> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/> <g id="SVGRepo_iconCarrier"> <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/> </g> </svg>'
var chrome_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" ><defs><linearGradient id="a" x1="3.2173" y1="15" x2="44.7812" y2="15" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d93025"/><stop offset="1" stop-color="#ea4335"/></linearGradient><linearGradient id="b" x1="20.7219" y1="47.6791" x2="41.5039" y2="11.6837" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcc934"/><stop offset="1" stop-color="#fbbc04"/></linearGradient><linearGradient id="c" x1="26.5981" y1="46.5015" x2="5.8161" y2="10.506" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1e8e3e"/><stop offset="1" stop-color="#34a853"/></linearGradient></defs><circle cx="24" cy="23.9947" r="12" style="fill:#fff"/><path d="M3.2154,36A24,24,0,1,0,12,3.2154,24,24,0,0,0,3.2154,36ZM34.3923,18A12,12,0,1,1,18,13.6077,12,12,0,0,1,34.3923,18Z" style="fill:none"/><path d="M24,12H44.7812a23.9939,23.9939,0,0,0-41.5639.0029L13.6079,30l.0093-.0024A11.9852,11.9852,0,0,1,24,12Z" style="fill:url(#a)"/><circle cx="24" cy="24" r="9.5" style="fill:#1a73e8"/><path d="M34.3913,30.0029,24.0007,48A23.994,23.994,0,0,0,44.78,12.0031H23.9989l-.0025.0093A11.985,11.985,0,0,1,34.3913,30.0029Z" style="fill:url(#b)"/><path d="M13.6086,30.0031,3.218,12.006A23.994,23.994,0,0,0,24.0025,48L34.3931,30.0029l-.0067-.0068a11.9852,11.9852,0,0,1-20.7778.007Z" style="fill:url(#c)"/></svg>'


var poi_svg = ''
var speed_limit_svg = '<svg id="R2-1" xmlns="http://www.w3.org/2000/svg" width="14px" height="16px" viewBox="0 0 1728 2160">   <g>     <rect width="1728" height="2160" rx="108" ry="108" style="fill: #fff;"/>     <path d="M1620,2.2536c58.3088,0,105.7463,47.4375,105.7463,105.7464v1944c0,58.3088-47.4375,105.7463-105.7463,105.7463H108c-58.3089,0-105.7464-47.4375-105.7464-105.7463V108C2.2536,49.6911,49.6911,2.2536,108,2.2536h1512M1620,0H108C48.3533,0,0,48.3533,0,108v1944c0,59.6467,48.3533,108,108,108h1512c59.6466,0,108-48.3533,108-108V108c0-59.6467-48.3534-108-108-108h0Z"/>   </g>   <path d="M1620,27H108c-44.66,0-81,36.34-81,81v1944c0,44.6599,36.34,81,81,81h1512c44.6599,0,81-36.3401,81-81V108c0-44.66-36.3401-81-81-81ZM1656,2052c0,19.8501-16.15,36-36,36H108c-19.85,0-36-16.1499-36-36V108c0-19.85,16.15-36,36-36h1512c19.85,0,36,16.15,36,36v1944Z"/>   <g id="SPEED">     <path d="M368.3126,561.6359c-20.3014,12.276-46.5423,19.4761-73.0351,19.4761-49.7102,0-87.2896-18.432-119.758-56.3401l41.6111-32.7961c21.3097,25.596,44.635,36.9001,77.103,36.9001,36.5354,0,62.9203-17.1721,62.9203-37.9081,0-29.2678-29.1925-31.2481-109.7868-53.892-40.531-11.3759-58.6727-42.228-58.6727-73.1518,0-48.2043,40.6389-80.9281,99.4556-80.9281,42.6189,0,78.2187,14.2918,107.5914,45.0003l-38.5876,34.8476c-18.2496-19.4761-41.6111-28.6921-69.0038-28.6921-31.5681,0-46.6502,12.8161-46.6502,29.3762,0,31.9317,39.1994,24.8762,110.8307,50.1118,50.574,17.8562,56.5853,61.056,56.5853,79.3444,0,29.7-13.2105,52.2717-40.6033,68.6517Z"/>     <path d="M524.8535,462.8159v113.1841h-52.554v-288h140.8875c60.6888,0,92.5088,46.1879,92.5088,87.4079,0,38.3041-28.5085,87.4079-90.2774,87.4079h-90.565ZM524.8535,339.5519v71.7121h87.0015c25.2331,0,42.4031-14.1478,42.4031-35.3521,0-22.2479-16.8463-36.36-42.4749-36.36h-86.9297Z"/>     <path d="M760.4418,288h210.8987v51.5519h-158.1654v53.5321h86.1738v52.5598h-86.1738v78.8043h163.2407v51.5519h-215.9739v-288Z"/>     <path d="M1039.8018,288h210.8987v51.5519h-158.165v53.5321h86.1733v52.5598h-86.1733v78.8043h163.2402v51.5519h-215.9739v-288Z"/>     <path d="M1319.1598,288h92.9771c83.0054,0,140.3826,60.3362,140.3826,143.496,0,79.1281-51.2942,144.504-137.827,144.504h-95.5328v-288ZM1371.6416,339.5519v184.8962h39.9192c46.1458,0,89.521-30.456,89.521-92.9521,0-58.104-36.3918-91.9441-89.1255-91.9441h-40.3147Z"/>   </g>   <g id="LIMIT">     <path d="M337.5,720h51.7377v243.5398h164.286v44.4602h-216.0237v-288Z"/>     <path d="M602.1596,720h51.8461v288h-51.8461v-288Z"/>     <path d="M948.713,832.1762l-85.2211,175.8238-84.2131-175.8238v175.8238h-50.7292v-288h50.7292l84.2131,170.7841,85.2211-170.7841h50.7297v288h-50.7297v-175.8238Z"/>     <path d="M1074.0099,720h51.8451v288h-51.8451v-288Z"/>     <path d="M1307.7277,1008h-50.4776v-237.4561h-82.7733v-50.5439h216.0232v50.5439h-82.7723v237.4561Z"/>   </g>   <g>     <path d="M231.2893,1490.4874l22.8603-338.4907h482.0401l-2.5196,126.3598h-357.7503l-7.6502,103.6801c58.3203-12.5093,93.8701-17.7293,139.5903-17.7293,164.9698,0,284.13,111.1501,284.13,260.1896,0,151.56-126.8998,260.1905-304.4702,260.1905-98.9099,0-187.7403-25.2003-279.0903-80.8198l68.4902-108.6305c81.0898,47.0703,156.4201,58.0503,215.9104,58.0503,111.3298,0,169.3801-54.0003,169.3801-126.4506,0-62.4596-34.8301-131.2193-154.4405-131.2193-53.01,0-90.4501,5.8499-147.1502,27.7199l-129.3301-32.85Z"/>     <path d="M914.4101,1510.7372c0-189.1807,91.1698-371.2508,303.8393-371.2508,216.091,0,301.3212,185.581,301.3212,368.821,0,184.3202-83.9703,376.2901-301.3212,376.2901-215.1892,0-303.8393-184.6806-303.8393-373.8603ZM1218.2494,1268.1871c-129.1499,0-174.6894,133.9196-174.6894,240.0295,0,159.2107,65.7894,247.5006,174.6894,247.5006,112.3211,0,172.1703-110.3396,172.1703-244.9799,0-151.56-63.2692-242.5502-172.1703-242.5502Z"/>   </g> </svg>'


var one_way_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" viewBox="0 0 266 266">   <defs>     <style>       .cls-1 {         fill: #ffdb00;       }       .cls-2 {         stroke: #000;         stroke-width: 7px;         fill: none;       }       .cls-3 {         fill: #000;         fill-rule: evenodd;       }     </style>   </defs>   <rect width="266" height="266" rx="22.167" ry="22.167" class="cls-1"/>   <rect x="5" y="5" width="256" height="256" rx="22.167" ry="22.167" class="cls-2"/>   <path d="M8.009,169.185 L128.085,169.185 L128.085,208.008 L236.991,133.000 L128.085,57.992 L128.085,96.815 L8.009,96.815 L8.009,169.185 Z" class="cls-3"/> </svg>'

var geocode_search_svg = '<svg fill="#0af030" height="14px" width="14px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 488.40 488.40" xml:space="preserve" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ffeb0f" stroke-width="30.2808"> <g> <g> <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"/> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"/> </g> </g> </g></svg>'
var webpage_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="15" viewBox="0 0 384 512"><path fill="#3723cd" d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>'           
var json_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="18" width="16" viewBox="0 0 448 512"><path fill="#FFD43B" d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6 .4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2 .7 376.3 .7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8 .5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z"/></svg>'   
            
var geojson_svg = '<svg width="20px" height="20px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gis" preserveAspectRatio="xMidYMid meet" fill="#000000"> <g id="SVGRepo_bgCarrier" stroke-width="0"/> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/> <g id="SVGRepo_iconCarrier"> <path d="M13.996 0a2.5 2.5 0 0 0-2.5 2.5V70H0v22h11.496v5.5a2.5 2.5 0 0 0 2.5 2.5h72a2.5 2.5 0 0 0 2.5-2.5V21.625c.027-1.113.004-1.777-.732-2.59L69.46.732A2.5 2.5 0 0 0 67.662 0H13.996zm2.5 5h48.902l1.252 14.568a2.5 2.5 0 0 0 2.278 2.278l14.568 1.252V95h-67v-3H80V70H16.496V5zm54.275 4.115l8.61 8.61l-7.928-.682l-.682-7.928zM10.48 73c1.37 0 2.439.379 3.207 1.137c.772.751 1.269 1.793 1.49 3.125l-2.213.543c-.156-.712-.45-1.271-.881-1.68c-.426-.415-.961-.623-1.603-.623c-.974 0-1.748.406-2.325 1.217c-.572.81-.86 2.012-.86 3.607c0 1.72.292 3.014.874 3.877c.582.857 1.346 1.285 2.289 1.285c.467 0 .932-.118 1.398-.355a4.72 4.72 0 0 0 1.213-.881v-1.838h-2.55v-2.443h4.8v5.775c-.466.593-1.143 1.118-2.03 1.572c-.884.449-1.78.672-2.688.672c-1.154 0-2.16-.316-3.018-.949c-.858-.64-1.504-1.549-1.936-2.728C5.215 83.126 5 81.835 5 80.445c0-1.51.241-2.85.723-4.023c.481-1.173 1.187-2.073 2.115-2.7c.707-.48 1.587-.722 2.64-.722zm37.33 0c1.384 0 2.425.4 3.123 1.197c.702.798 1.07 1.862 1.105 3.194l-2.226.129c-.096-.745-.302-1.281-.618-1.604c-.31-.33-.78-.494-1.408-.494c-.647 0-1.153.176-1.52.525c-.235.224-.353.523-.353.899c0 .342.11.637.33.88c.281.31.963.633 2.047.97c1.084.336 1.886.686 2.402 1.048c.522.356.928.847 1.22 1.473c.295.62.443 1.388.443 2.304c0 .831-.175 1.607-.526 2.333c-.351.725-.848 1.267-1.49 1.623c-.642.349-1.444.523-2.402.523c-1.395 0-2.466-.422-3.213-1.266c-.748-.85-1.195-2.085-1.34-3.707l2.168-.277c.13.956.392 1.657.789 2.105c.401.449.942.672 1.619.672c.717 0 1.256-.196 1.617-.591c.366-.403.551-.87.551-1.405c0-.343-.079-.634-.234-.87c-.15-.245-.416-.456-.797-.634c-.261-.118-.855-.33-1.783-.632c-1.195-.39-2.033-.867-2.514-1.434c-.678-.798-1.018-1.77-1.018-2.916a4.6 4.6 0 0 1 .475-2.066a3.361 3.361 0 0 1 1.377-1.475c.602-.336 1.328-.504 2.176-.504zm11.318 0c1.626 0 2.925.663 3.898 1.988c.979 1.325 1.47 3.168 1.47 5.528c0 2.34-.486 4.17-1.454 5.496c-.968 1.318-2.262 1.978-3.883 1.978c-1.64 0-2.946-.657-3.914-1.969c-.968-1.318-1.453-3.13-1.453-5.437c0-1.477.168-2.717.504-3.719c.25-.738.592-1.4 1.023-1.986c.437-.587.915-1.021 1.432-1.305c.687-.382 1.479-.574 2.377-.574zm-19.777.248h2.218v9.176c0 1.2-.08 2.121-.24 2.767c-.216.844-.607 1.523-1.174 2.038c-.567.507-1.314.761-2.242.761c-1.089 0-1.927-.4-2.514-1.197c-.587-.804-.883-1.98-.888-3.53l2.1-.316c.024.83.118 1.417.279 1.76c.24.52.606.781 1.097.781c.497 0 .85-.183 1.055-.552c.206-.376.309-1.151.309-2.325v-9.363zm26.898 0h2.166l4.516 9.68v-9.68H75v14.494h-2.234l-4.45-9.451v9.451h-2.068V73.248zm-7.098 2.254c-.918 0-1.658.415-2.22 1.246c-.562.824-.842 2.069-.842 3.736c0 1.642.288 2.888.865 3.739c.577.843 1.31 1.265 2.197 1.265c.888 0 1.615-.418 2.182-1.256c.572-.843.86-2.106.86-3.787c0-1.66-.28-2.9-.837-3.716c-.551-.818-1.286-1.227-2.205-1.227zm-38.752 1.502c1.19 0 2.128.518 2.815 1.553c.687 1.028 1.016 2.607.986 4.736h-5.3c.015.824.186 1.466.512 1.928c.326.455.732.683 1.219.683c.331 0 .61-.12.836-.357c.226-.237.396-.62.512-1.147l2.107.465c-.271 1.015-.7 1.79-1.287 2.324c-.582.528-1.312.791-2.19.791c-1.39 0-2.418-.595-3.086-1.789c-.526-.955-.79-2.162-.79-3.619c0-1.74.346-3.102 1.038-4.084c.693-.989 1.569-1.484 2.627-1.484zm9.159 0c1.209 0 2.202.518 2.974 1.553c.773 1.028 1.158 2.33 1.158 3.906c0 1.589-.39 2.907-1.173 3.955c-.778 1.041-1.76 1.562-2.944 1.562c-.732 0-1.432-.217-2.1-.652c-.662-.435-1.165-1.07-1.511-1.908c-.346-.844-.52-1.87-.52-3.076c0-.923.174-1.816.52-2.68c.346-.863.835-1.522 1.467-1.977a3.58 3.58 0 0 1 2.129-.683zm-9.032 2.127c-.461 0-.841.22-1.142.662c-.301.442-.45 1.04-.445 1.799H22.1c-.015-.804-.174-1.413-.475-1.828c-.301-.422-.668-.633-1.1-.633zm9.04.139c-.552 0-1.017.276-1.393.83c-.376.553-.565 1.35-.565 2.392c0 1.042.189 1.839.565 2.393c.376.553.84.832 1.392.832c.552 0 1.014-.279 1.385-.832c.377-.554.565-1.358.565-2.412c0-1.029-.188-1.82-.565-2.373c-.371-.554-.833-.83-1.385-.83z" fill="#37ff00"/> <path d="M51.252 18v10.11h8.852a25.56 25.56 0 0 0-1.707-3.881c-1.985-3.606-4.507-5.78-7.145-6.229zm-2.504.1c-2.469.613-4.813 2.735-6.682 6.13a25.56 25.56 0 0 0-1.706 3.881h8.388zm-5.769.678a22.547 22.547 0 0 0-12.005 9.333h6.739c.594-1.851 1.318-3.562 2.16-5.089c.897-1.63 1.942-3.067 3.106-4.244zm14.729.231c1.074 1.134 2.044 2.488 2.883 4.013c.841 1.527 1.564 3.238 2.157 5.089h6.278a22.56 22.56 0 0 0-11.318-9.102zM29.595 30.615a22.435 22.435 0 0 0-2.095 8.329h8.408c.097-2.941.48-5.744 1.103-8.329zm10.004 0c-.662 2.542-1.078 5.357-1.184 8.329h10.333v-8.329zm11.653 0v8.329h10.797c-.106-2.972-.523-5.787-1.184-8.329zm12.197 0a41.505 41.505 0 0 1 1.1 8.329H72.5a22.435 22.435 0 0 0-2.095-8.329zM27.5 41.447a22.435 22.435 0 0 0 2.095 8.329h7.298c-.588-2.593-.934-5.396-.999-8.329zm10.898 0c.07 2.962.452 5.774 1.075 8.329h9.275v-8.329zm12.854 0v8.329h9.738c.624-2.555 1.005-5.367 1.075-8.329zm13.31 0c-.065 2.932-.409 5.736-.995 8.329h6.838a22.435 22.435 0 0 0 2.095-8.329zM30.973 52.28a22.565 22.565 0 0 0 11.33 9.105a20.107 20.107 0 0 1-2.432-3.514c-.917-1.666-1.697-3.546-2.319-5.591zm9.212 0c.532 1.61 1.165 3.084 1.88 4.383c1.753 3.182 3.923 5.246 6.222 5.997c.154.01.306.03.46.03V52.275zm11.066 0v10.415c.357-.02.713-.04 1.065-.08c2.247-.789 4.364-2.834 6.08-5.951c.716-1.299 1.349-2.773 1.88-4.383zm11.656 0c-.62 2.045-1.4 3.926-2.317 5.591a20.4 20.4 0 0 1-2.197 3.243a22.568 22.568 0 0 0 10.632-8.834z" fill="#37ff00"/> </g> </svg>'



function init_global_var(){
            
            
            //  .......... global var ..............
            
              
                  // https://developer.mozilla.org/en-US/docs/Web/API/Location
            
                    current_url = template_protocol + "//" + window.location.host + window.location.pathname;
            
                    console.log('current_url ...... ',current_url);
                    
                    current_pathname = window.location.pathname;       //    /json2tree/arcgisServerList.html
                    current_pathArray = current_pathname.split('/');   //    ["", "json2tree", "arcgisServerList.html"]
                    
                    
                    
                    
                    
                    
                    //.......... for arcgisServerList.js only .......................
                          // bug fix i start from 1 instead of 0, otherwise, has 2 //,  //json2tree/domain.html
                            for (i = 1; i < current_pathArray.length-1; i++) {
                              linkToPathname += "/";
                              linkToPathname += current_pathArray[i];
                            }
                          console.log('linkToPathname----',linkToPathname); 
                    //.......... end ..............  for arcgisServerList.js only .......................
                    
                    
                    
                    
                    
                    
                              // ----- parse url param ?url=xxxxxxxxxx  --------

                                      urlParams = new URLSearchParams(window.location.search);

                                      


                                    // token
                                    param_arcgis_online_token = urlParams.get('arcgis_online_token'); 
                                    if (param_arcgis_online_token){
                                      arcgis_online_token = param_arcgis_online_token
                                      $('#arcgis_online_token').val(arcgis_online_token)
                                    }
                                   



                                                                                
                                          /**/ 
                                          // ... ... .. .. . category radio ... ... .. .. . 
                                          var param_category = urlParams.get('category'); 
                                          if (param_category) {
                                            current_category = param_category
                                          } 
                                          // ... ... end .. .. . category radio ... ... .. .. .
                                          /**/  
       
                                      
                                      
                                      
                                      //.................. required parameter .................
                                              _organization = urlParams.get('org'); 
                                              console.log('org= without decode', _organization)
                                              //_organization = decodeURIComponent(_organization)  // do not use, will cause error 'URI malformed' if org string have percentage sign %, in fact it already been decoded automatically. 
                                              
                                              var param_cross = urlParams.get('cross'); 
                                              if (param_cross) {
                                                                _cross = param_cross
                                              } else {
                                                                _cross ='default' 
                                              }


                                              ___url_string = urlParams.get('url');  


                                              _center_lat = urlParams.get('_center_lat');  
                                              _center_long = urlParams.get('_center_long');  
                                              _center_zoom = urlParams.get('_center_zoom');  


                                              _health = urlParams.get('health'); // health=1,true,yes (anything) will show health check icon
                                              file = urlParams.get('file');   // hub.site.static file=xxx.zip
                                             
                                      //.................. required parameter .................
                                      
                                      
                                      
                                      
                                         // default center info Los agneles downtown
                                         // if (0) is false, so we must skip 0
                                         if ((_center_lat) || (_center_lat == 0)) {} else { _center_lat = default_center_lat}
                                         if ((_center_long) || (_center_long == 0)) {} else { _center_long = default_center_long}
                                         if ((_center_zoom) || (_center_zoom == 0)) {} else { _center_zoom = default_center_zoom}
                                      
                                        _center={"_center_lat":_center_lat , "_center_long": _center_long, "_center_zoom": _center_zoom};
                                        
                                      


                                      console.log('___url_string ......  ',___url_string)  
                                      console.log('_center ......  ',_center)  
                                          
                                                    
                                  
                
                
                
                
                                  if ((___url_string == undefined) || (___url_string == null) || (___url_string == ''))
                                  {
                                      
                                      // nothing to do
                                      
                                  }else{
                                        ___url = new URL(___url_string);   // ?url=https://sampleserver3.arcgisonline.com/ArcGIS/rest/services
                                      base_url = ___url_string;

                                      ___protocol = ___url.protocol; //   https:

                                      // template protocal always binding to target url protocol
                                      template_protocol = ___protocol

                                      

                                      ___hostname = ___url.hostname; //    sampleserver3.arcgisonline.com
                                      ___pathname = ___url.pathname; //    /ArcGIS/rest/services
                                      ___urlParams = new URLSearchParams(___url.search); //
                                      

                                      ___pathArray = ___pathname.split('/');


                                        // https://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/GPServer    
                                        // ___pathArray = ["", "arcgis", "rest", "services", "Mapping", "NavigateLA", "MapServer"]



                                      // ___service = https://maps.lacity.org/arcgis/rest/services
                                      ___service = ___protocol + '//' + ___hostname + '/' +  ___pathArray[1] + '/' +   ___pathArray[2] + '/' +   ___pathArray[3] 



                                      /*
                                        console.log(___url);
                                        console.log(___protocol);
                                        console.log(___hostname);
                                      */ 
                                        
                                  }// if     
                          // ----- parse url param ?url=xxxxxxxxxx  --------
                          
                          
                          



                                    // ----- special for checker page -----

                                    test_range_start = urlParams.get('start');
                                    test_range_end =   urlParams.get('end');
                                    test_mode_parameter = urlParams.get('test_mode');    // test_mode only available at checker page
                                    test_default =  urlParams.get('default'); 
                                    test_cors = urlParams.get('cors'); 
                                    test_jsonp = urlParams.get('jsonp'); 
                                    test_proxy = urlParams.get('proxy'); 
                                    test_https = urlParams.get('https'); 
                                    test_http = urlParams.get('http'); 


                                    test_method = urlParams.get('test_method'); 

                                    // default test method is 1
                                    if (test_method) {
                                    } else {
                                      test_method = 1
                                    }
                                    
                                      //  global var available everywhere 
                                      _filter_result_by = urlParams.get('filter_by');
                                  
                          
                          


                                  audit = urlParams.get('audit'); 
                                  localdomain =urlParams.get('localdomain');  // by default is production domain, if local=1, means use local host domain.




                                  


                          // ----- special for checker page -----
                          
                          
                          param_timeout = urlParams.get('timeout'); 
                            
                          // param_timeout is from URL &timeout=xxx,  _timeout is ajax: timeout
                          if (parseInt(param_timeout)) {
                              _timeout = parseInt(param_timeout)
                          } 
                          // 1st time 1 time display time out value on input field
                          $('#timeout_millisecond').val(_timeout)
                          // user change time out value
                          $('#timeout_millisecond').on('keyup', function(){
                            param_timeout = $("#timeout_millisecond").val()
                            console.log('time out changed to :', param_timeout)
                            if (parseInt(param_timeout)) {
                              _timeout = parseInt(param_timeout)
                              update_url_parameter('timeout', _timeout)
                            } 
                          })
                          
                          
                          
                          
                          
                          // set html page title, on browser tab title
                          if (_organization !== 'null') {
                              // because previously _organization has been decoded, null becomes string 'null'
                              console.log('page title set as org=', _organization)
                                 // $("#title").text(_organization)
                                  // without jquery
                                   document.getElementById("title").innerHTML = _organization;
                              }
                          
                          
                          
                          
                          
                          

                              // decide use which one 
                              get_port_http_https()
                              // finally build template url
                              build_url_base_template() 



            
            }
            
            
  
  
  
  
  
            function dark_mode(){
                  //  dark mode  https://codepen.io/j_holtslander/pen/MRbpLX
    


                 
                        // SWAP ICON ON CLICK
                        // Source: https://stackoverflow.com/a/34254979/751570
                        $('.dark-toggle').on('click',function(){
                          if ($(this).find('i').text() == 'brightness_4'){
                              $(this).find('i').text('brightness_high');
                          } else {
                              $(this).find('i').text('brightness_4');
                          }
                        });



            }
  
  
  
  
  

           // +++++++ autocomplete auto suggest  +++++++


                var autocomplete_search_instance, autocomplete_options, autocomplete_elem, autocomplete_switch_status;
                function init_autocomplete(){

              
      /*
                            
                            $('input.autocomplete').autocomplete({
                              data: {
                                "Apple": null,
                                "Microsoft": null,
                                "Google": 'http://placehold.it/250x250'
                              },
                              limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                            onAutocomplete: null,
                            });
                          
      */

                        
                autocomplete_options = {

                          data: {
                            
                          },


                          limit: 5, // The max amount of results that can be shown at once. Default: Infinity.


                          onAutocomplete:  search_layer_now  //Callback for when autocompleted.

                        }


                              // get all instances
                              // var elems = document.querySelectorAll('.autocomplete');

                              // only one instance
                              autocomplete_elem = document.getElementById('filter_by')

                          
                             autocomplete_search_instance = M.Autocomplete.init(autocomplete_elem, autocomplete_options);
                          

                }

          // +++++++ end  +++++++ autocomplete auto suggest  +++++++



  
  
  
          var modal_elem, modal_options , modal_instances;
          function materialize_init(){

                        // init all component
                          //M.AutoInit();


                          // init without jquery
                          modal_options = {};
                          modal_elems = document.querySelectorAll('.modal');
                          modal_instances = M.Modal.init(modal_elems, modal_options);
        
                          
                          
                          
                          // modal for error message display
                          $('.modal').modal();




                          $('.tooltipped').tooltip();
          }

  
  
  
  
  
  
           
             
                function update_url_parameter(_field, _value){
                    
                    
                   // if ((_value) && (_value.length !== 0)) {

                                console.log("update url parameter: _field _value", _field + " + "+ _value);

                                var searchParams = new URLSearchParams(window.location.search);
                                searchParams.set(_field, _value);


                                // this cause reload  https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
                                //window.location.search = searchParams.toString();

                                // instead avoid reload
                                var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
                                history.pushState(null, '', newRelativePathQuery);
                         //   }            

                } 
  
  
           
             
             
             
             
        

                var extent_geometry;
                var runClientProjectTimes = 0;   // 0 not run yet
                var runClientProjectLimit = 10    // let run 5 times 
                // special customized only get lat long, do not pan on map
               async function clientSide_project(_input){

/*

                       // also works at https://developers.arcgis.com/rest/services-reference/project.htm
                       // var _projection_server_url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?';

                       all 3 kind of extent works, just choose one of them  
                 
                             "extent": {
                                 "xmin": 1440000,
                                 "ymin": 535000,
                                 "xmax": 1455000,
                                 "ymax": 550000,
                                 "spatialReference": {
                                     "wkid": 102719,
                                     "latestWkid": 2264
                                 }
                             },



                             "initialExtent": {
                                 "xmin": 1440000,
                                 "ymin": 535000,
                                 "xmax": 1455000,
                                 "ymax": 550000,
                                 "spatialReference": {
                                     "wkid": 102719,
                                     "latestWkid": 2264
                                 }
                             },



                             "fullExtent": {
                                 "xmin": 1440000,
                                 "ymin": 535000,
                                 "xmax": 1455000,
                                 "ymax": 550000,
                                 "spatialReference": {
                                     "wkid": 102719,
                                     "latestWkid": 2264
                                 }
                             },
                             

                        
                 
                 */
                  
                


                 
                     
                         // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                         
                         if (_input.hasOwnProperty('initialExtent') && (_input.initialExtent.spatialReference.hasOwnProperty('wkid'))){

                                  extent_geometry = _input.initialExtent;

                         } else if (_input.hasOwnProperty('extent') && (_input.initialExtent.spatialReference.hasOwnProperty('wkid'))){

                                  extent_geometry = _input.extent

                         } else if (_input.hasOwnProperty('fullExtent') && (_input.initialExtent.spatialReference.hasOwnProperty('wkid'))){

                                  extent_geometry = _input.fullExtent
                         }         



               
                                       require([
                                         "esri/geometry/SpatialReference",
                                         "esri/geometry/projection",
                                         "dojo/domReady!"
                                       ], function (
                                         SpatialReference, projection
                                       ) {
     

                                        /*

                                             fix bug projection do not have function isSupported()


                                              https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/introducing-the-client-side-projection-engine/

                                              https://developers.arcgis.com/javascript/3/jssamples/client_projection.html

                                              https://developers.arcgis.com/javascript/3/jsapi/esri.geometry.projection-amd.html
                                        */

                                           
                                              
                                                   console.log('  - 1 - projection.isSupported() ', projection)

                                                   
                                                   // must wait until fully load the projection module
                                                    projection.load().then(function () {


                                                               console.log('   - 22 -  projection.isSupported() ', projection)



                                                                          var outSpatialReference = new SpatialReference({
                                                                            wkid: 4326 //Sphere_Sinusoidal projection
                                                                          });


                                                               try {
                                                                          // project an array of geometries to the specified output spatial reference
                                                                          var extent_projectedGeometries = projection.project(extent_geometry , outSpatialReference);


                                                                              console.log("extent_projectedGeometries", extent_projectedGeometries);


                                                                              var _xmin = extent_projectedGeometries.xmin;
                                                                              var _ymin = extent_projectedGeometries.ymin;
                                                                              var _xmax = extent_projectedGeometries.xmax;
                                                                              var _ymax = extent_projectedGeometries.ymax;
                                                                              
                                                                              
                                                                              var _xmiddle = (_xmax - _xmin) / 2 + _xmin;
                                                                              var _ymiddle = (_ymax - _ymin) / 2 + _ymin;

                                                                              // panto_googlemaps( _ymiddle, _xmiddle, _center_zoom )   
                                                                            //return {"_center_lat":_ymiddle , "_center_long": _xmiddle };

                                                                            _center = {"_center_lat":_ymiddle , "_center_long": _xmiddle };
                                                                            console.log('arcgis common client side prject center ==== ', _center)

                                                                            update_url_parameter('_center_lat', _center._center_lat);

                                                                            update_url_parameter('_center_long', _center._center_long);

                                                                            if ( _center._center_zoom == null ) {
                                                                              update_url_parameter('_center_zoom', default_center_zoom);
                                                                            }// if



                                                                } catch (projection_error) {

                                                                                                console.log(" +++ client side projection failed, projection is not load  +++ ");

                                                                                                console.log(" +++ client-side projection is not supported, default to Los Angeles  +++");
                                                                                                  // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                                                                                                  //default to Los Angeles 
                                                                                                  _center_lat = 34.049039
                                                                                                  _center_long = -118.246521
                                                                                                  //panto_googlemaps( _center_lat, _center_long, _center_zoom )    
                                                                                                  //return {"_center_lat":_ymiddle , "_center_long": _xmiddle };

                                                                                                  _center = {"_center_lat":_center_lat , "_center_long": _center_long };
                                                                                                  console.log('arcgis common client side prject USE DEFault center ====  ', _center)

                                                                                                  update_url_parameter('_center_lat', _center._center_lat);

                                                                                                  update_url_parameter('_center_long', _center._center_long);

                                                                                                  if ( _center._center_zoom == null ) {
                                                                                                    update_url_parameter('_center_zoom', default_center_zoom);
                                                                                                  }// if

                                                                                                  return;
            
                                                                 
                                                             }// catch
                                                               

                                                 });


                                     }); //require([
       
                       }


  
           //   *** ***** *******  server side projection  *** ***** *******  

              // ajax --> geometryServer   arcgis rest api project, ( any geometry server) 
              // from custom projection to 4326
              async function calculate_center_lat_long(_input){
                    
                    
                  
                    
                    
                    // ============= calculate center_lat and center_long ===================
                            
                        // http, https, both works, but do not use http, always use https, because, https can NOT have http, however http can have https. So https here always works.    
                        var _projection_server_url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?';
                        //var _projection_server_url = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?';     
                        
                        
                    
                                        /*

                                                // also works at https://developers.arcgis.com/rest/services-reference/project.htm
                                                // var _projection_server_url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?';

                                                all 3 kind of extent works, just choose one of them  
                                          
                                                      "extent": {
                                                          "xmin": 1440000,
                                                          "ymin": 535000,
                                                          "xmax": 1455000,
                                                          "ymax": 550000,
                                                          "spatialReference": {
                                                              "wkid": 102719,
                                                              "latestWkid": 2264
                                                          }
                                                      },



                                                      "initialExtent": {
                                                          "xmin": 1440000,
                                                          "ymin": 535000,
                                                          "xmax": 1455000,
                                                          "ymax": 550000,
                                                          "spatialReference": {
                                                              "wkid": 102719,
                                                              "latestWkid": 2264
                                                          }
                                                      },



                                                      "fullExtent": {
                                                          "xmin": 1440000,
                                                          "ymin": 535000,
                                                          "xmax": 1455000,
                                                          "ymax": 550000,
                                                          "spatialReference": {
                                                              "wkid": 102719,
                                                              "latestWkid": 2264
                                                          }
                                                      },
                                                      

                                                
                                          
                                          */
                                          
                                        


                    
                    
                        // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                        
                        if(_input.hasOwnProperty('initialExtent') && (_input.initialExtent.spatialReference.hasOwnProperty('wkid'))){
                
                            
                            var _InUse_Extent = _input.initialExtent;
                                
                            var _spatialReference = _InUse_Extent.spatialReference;
                            
                            //  need more work, some do not have wkid, but have wkt
                            // "wkt":"PROJCS[\"NAD_1983_StatePlane_Michigan_South_FIPS_2113_IntlFeet\",GEOGCS[\"GCS_North_American_1983\",DATUM[\"D_North_American_1983\",SPHEROID[\"GRS_1980\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Lambert_Conformal_Conic\"],PARAMETER[\"False_Easting\",13123359.58005249],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-84.36666666666666],PARAMETER[\"Standard_Parallel_1\",42.1],PARAMETER[\"Standard_Parallel_2\",43.66666666666666],PARAMETER[\"Latitude_Of_Origin\",41.5],UNIT[\"Foot\",0.3048]]"}}
                            //sample:  https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer?f=json
                            
                            var _wkid = _spatialReference.wkid;
                                
                            var _latestWkid = _spatialReference.latestWkid;  
                            
                            var _xmin = _InUse_Extent.xmin;
                            var _ymin = _InUse_Extent.ymin;
                            var _xmax = _InUse_Extent.xmax;
                            var _ymax = _InUse_Extent.ymax;
                            
                            
                            var _xmiddle = (_xmax - _xmin) / 2 + _xmin;
                            var _ymiddle = (_ymax - _ymin) / 2 + _ymin;
                            
                            
                            //https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project?
                            //    inSR=102100&
                            //    outSR=4326&
                            //    geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":-11696523.780400001,"y":4804891.0001000017}]}&
                            //    f=pjson
                            
                            
                        // with &f=pjson 
                        var _reprojection_url = _projection_server_url + 'inSR=' + _wkid + '&outSR=4326&geometries={"geometryType":"esriGeometryPoint","geometries":[{"x":'+ _xmiddle + ',"y":' + _ymiddle + '}]}&f=pjson';
                              
                        
                      
                          var _reprojected_lat_lng;
                          
                          
                          
                              
                          console.log('_InUse_Extent .....',_InUse_Extent)
                            
                            
                              
                              
                              console.log('_reprojection_url.....',_reprojection_url)
                            
                            
                              
                              
                              
                              
                              
                              
                              
                              
                              
                              try{
                              
                              // dataType: 'jsonp',
                              _reprojected_lat_lng = await $.ajax({
                                  
                                                  timeout: _timeout,
                                                  type: 'GET',
                                                  dataType: 'jsonp',
                                                  data: {},
                                                  url: _reprojection_url,
                                                  // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                                            // ajax failed
                                                                                                    var _error_status = textStatus + ' : ' + errorThrown         
                                                                                                  console.log('ajax error  + ', _error_status)
                                                                                              },
                                                  success: function (data) {
                                                      console.log(data);
                                                      
                                                      // note: data is already json type, you just specify dataType: jsonp
                                                      return data;
                                                  }
                                              });                          
                                                                  
                                                                  
                            }
                            catch(error){
                              
                                
                                
                              // some time jsonP failed, because server do not sent json format, must use $get string as below
                              //   
                              //  Without dataType: 'jsonp', will get string, then must   JSON.parse(response_string)
                              //  with dataType: 'jsonp', is already json, NO need JSON.parse()
                            
                              
                              // without dataType: 'jsonp',
                                                        var response_string = await $.ajax({
                                                                                            timeout:_timeout,
                                                                                            url:_reprojection_url,
                                                                                            success: function (data) {
                                                                                                    return data;     
                                                                                            }, // success
                                                                                            
                                                                                            // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                                                                                              error: function (jqXHR, textStatus, errorThrown) {
                                                                                                            // ajax failed
                                                                                                    var _error_status = textStatus + ' : ' + errorThrown         
                                                                                                  console.log('ajax error  + ', _error_status)
                                                                                              }// error
                                                                                            
                                                                                        });
                              
                              
                              _reprojected_lat_lng =  JSON.parse(response_string)
                                
                                
                            }// try - catch
                            
                            
                            
                            
                            
                            
                            
                            
                            
                                /*
                                    _reprojected_lat_lng =  {
                                                            "geometryType" : "esriGeometryPoint", 

                                                            "geometries" : 
                                                            [
                                                              {
                                                                "x" : -105.071660830008, 
                                                                "y" : 39.5785846502541
                                                              }
                                                            ]
                                                          }
                                */
                            
                                var _c_lat = _reprojected_lat_lng.geometries[0].y;
                            
                                var _c_long = _reprojected_lat_lng.geometries[0].x;
                              
                                console.log( 'center lat: ', _c_lat,  'center long: ',_c_long)
                              
                              
                                return {"_center_lat":_c_lat, "_center_long":_c_long, "_center_zoom" : default_center_zoom};
                              
                              
                            }//  input.hasOwnProperty('initialExtent')
                            
                            else {
                                // no initialExtent
                                  // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                                  //default to Los Angeles 
                                  
                                


                                return {"_center_lat": default_center_lat, "_center_long": default_center_long, "_center_long": default_center_zoom};
                            }
                            
                            
                            
                            
                            // =============  End ============= calculate center_lat and center_long  =============
                    
                    
                    
                    
                } 
                
                



               // pro4js --> ajax https://epsg.io/your-wkid-here.js  get definition string,    https://github.com/proj4js/proj4js/issues/369 
               // from custom projection to 4326
                async function proj4js_centerLatLong(_input){
                    
                    
                  var _reprojected_lat_lng;
                    
                    
                  // ============= calculate center_lat and center_long ===================
                          
                      
                  
                                      /*

                                              // also works at https://developers.arcgis.com/rest/services-reference/project.htm
                                              // var _projection_server_url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?';

                                              all 3 kind of extent works, just choose one of them  
                                        
                                                    "extent": {
                                                        "xmin": 1440000,
                                                        "ymin": 535000,
                                                        "xmax": 1455000,
                                                        "ymax": 550000,
                                                        "spatialReference": {
                                                            "wkid": 102719,
                                                            "latestWkid": 2264
                                                        }
                                                    },



                                                    "initialExtent": {
                                                        "xmin": 1440000,
                                                        "ymin": 535000,
                                                        "xmax": 1455000,
                                                        "ymax": 550000,
                                                        "spatialReference": {
                                                            "wkid": 102719,
                                                            "latestWkid": 2264
                                                        }
                                                    },



                                                    "fullExtent": {
                                                        "xmin": 1440000,
                                                        "ymin": 535000,
                                                        "xmax": 1455000,
                                                        "ymax": 550000,
                                                        "spatialReference": {
                                                            "wkid": 102719,
                                                            "latestWkid": 2264
                                                        }
                                                    },
                                                    

                                              
                                        
                                        */
                                        
                                      


                  
                  
                      // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                      
                      if(_input.hasOwnProperty('initialExtent') && (_input.initialExtent.spatialReference.hasOwnProperty('wkid'))){
              
                          
                          var _InUse_Extent = _input.initialExtent;
                              
                          var _spatialReference = _InUse_Extent.spatialReference;
                          
                          //  need more work, some do not have wkid, but have wkt
                          // "wkt":"PROJCS[\"NAD_1983_StatePlane_Michigan_South_FIPS_2113_IntlFeet\",GEOGCS[\"GCS_North_American_1983\",DATUM[\"D_North_American_1983\",SPHEROID[\"GRS_1980\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Lambert_Conformal_Conic\"],PARAMETER[\"False_Easting\",13123359.58005249],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-84.36666666666666],PARAMETER[\"Standard_Parallel_1\",42.1],PARAMETER[\"Standard_Parallel_2\",43.66666666666666],PARAMETER[\"Latitude_Of_Origin\",41.5],UNIT[\"Foot\",0.3048]]"}}
                          //sample:  https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer?f=json
                          
                          var _wkid = _spatialReference.wkid;  // ESRI wkid 1021000
                              
                          var _latestWkid = _spatialReference.latestWkid;   // EPSG:3857
                          
                          var _xmin = _InUse_Extent.xmin;
                          var _ymin = _InUse_Extent.ymin;
                          var _xmax = _InUse_Extent.xmax;
                          var _ymax = _InUse_Extent.ymax;
                          
                          
                          var _xmiddle = (_xmax - _xmin) / 2 + _xmin;
                          var _ymiddle = (_ymax - _ymin) / 2 + _ymin;
                          
                          //  https://epsg.io/your-wkid-here.js      
                          //  must use latestWkid, it is EPSG:3857, Do not use _wkid, it is ESRI wkid 1021000, both are same, but https://epsg.io/ only accept EPSG wkid, not ESRI wkid
                          var wkid_definition_url = 'https://epsg.io/' + _latestWkid + '.js';  
                          var wkid_definition_string;
                         
                          console.log('_InUse_Extent .....',_InUse_Extent)
                          console.log('wkid_definition_url.....',wkid_definition_url)
                          


                         
                          wkid_definition_string = await $.ajax({
                                
                                                timeout: _timeout,
                                                type: 'GET',
                                                //dataType: 'jsonp',
                                                data: {},
                                                url: wkid_definition_url,
                                                // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                                                                                            error: function (jqXHR, textStatus, errorThrown) {
                                                                                                          // ajax failed
                                                                                                  var _error_status = textStatus + ' : ' + errorThrown         
                                                                                              //  console.log('ajax error  + ', _error_status)
                                                                                                console.log('ajax error  + ', textStatus,errorThrown )
                                                                                            },

                                                success: function (data) {
                                                 //   console.log('epsg wkid definition string back', data);
                                                    // note: data is already json type, you just specify dataType: jsonp
                                                    //return data;
                                                }
                                            });                          
                            
                                            
                                          
                        /*  both works
                            fetch(wkid_definition_url)
                                           .then(response => response.text())
                                           .then(
                                                   data =>  console.log('epsg wkid definition string back', data)
                                           );

                        */


                          // warn: returning string have proj4.defs(....)
                          //     proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");                                      
                          console.log('wkid_definition_string  .....',  wkid_definition_string)
                          // run this string as code :   eval('proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");      ')
                          eval(wkid_definition_string)

                          
                        
                          var from_epsg = 'EPSG:'+ _latestWkid  // must use latestWkid, it is EPSG:3857, Do not use _wkid, it is ESRI wkid 1021000, both are same, but https://epsg.io/ only accept EPSG wkid, not ESRI wkid
                         
                          proj4.defs([
                                          [ 'EPSG:4326',     '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees']
                                          //[ from_epsg,        wkid_definition_string]
                                      ]);
                          

                          //Coordinates may an object of the form {x:x,y:y} or an array of the form [x,y].
                          //proj4(fromProjection[, toProjection, coordinates])
                          _reprojected_lat_lng = proj4(from_epsg, 'EPSG:4326', [_xmiddle, _ymiddle])


                          
                              /*
                                  _reprojected_lat_lng =  [x, y]  [lng, lat]
                              */
                          
                              var _c_lat = _reprojected_lat_lng[1];
                          
                              var _c_long = _reprojected_lat_lng[0];
                            
                              console.log( 'center lat: ', _c_lat,  'center long: ',_c_long)
                            
                            
                              return {"_center_lat":_c_lat, "_center_long":_c_long, "_center_zoom" : default_center_zoom};
                            
                            
                          }//  input.hasOwnProperty('initialExtent')
                          
                          else {
                              // no initialExtent
                                // only xxx/MapServer have initialExtent, the other FeatureServer, ImageServer do NOT have it. 
                                //default to Los Angeles 
                                
                              


                              return {"_center_lat": default_center_lat, "_center_long": default_center_long, "_center_long": default_center_zoom};
                          }
                          
                          
                          
                          
                          // =============  End ============= calculate center_lat and center_long  =============
                  
                  
                  
                  
              } 
              
              //   *** ***** *******  server side projection  *** ***** *******  
 
                
  
  
  
  
  //  ----- sort array = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------
           
       function compareStrings(a, b) {
            // Assuming you want case-insensitive comparison
            a = a.toLowerCase();
            b = b.toLowerCase();

            return (a < b) ? -1 : (a > b) ? 1 : 0;
          }

   
        // array.sort(function(a, b) {
        //    return compareStrings(a.name, b.name);
        //  })
        
   //  ----- sort array = [{name:xxx}, {name:xxx}...] alphabetically by name  ---------      
   
   
   
   
   
     // ---------------------------   mark.js higlight keywords --------------------------- 
                function highlight_keywords(){
                            _filter_by = $('#filter_by').val();

                            _filter_by = _filter_by.toLowerCase();

                            if (_filter_by.length > 0){


                                     $("span.context").mark(_filter_by); // will mark the keyword "test", requires an element with class "context" to exist


                            }// if


                 }// function
                 
    // --------------- End ------------   mark.js higlight keywords ---------------------------  
    
    
    
    
    
     
            function filter_result_by_filter_by(){
                
                                                    
                        // must re-create instance of url params, use first time, filter by=xxx  as records
                        urlParams = new URLSearchParams(window.location.search);


                               // only local use  
                              ___url_filter_by = urlParams.get('filter_by');


                              
                              console.log('___url_filter_by',  ___url_filter_by)

                              if ((___url_filter_by == undefined) || (___url_filter_by == null) || (___url_filter_by == '')){

                                  // search for is null, undefined, nothing to filter
                              }else {


                                   $('#filter_by').val(___url_filter_by);

                                  // trigger keyup event, filter result by _filter_by
                                   $(function() {
                                                 // $('#filter_by').keydown();
                                                //  $('item').keypress();
                                     // both works (1)
                                                //  $('#filter_by').keyup();
                                                //  $('item').blur();
                                              });




                                      // both works (2)
                                      $('#filter_by').trigger(jQuery.Event('keyup', { keyCode: 13 }));    


                            }
                         
            }
            
           






            var possible_idx_field_name_array = [
              // possible field name in arcgis 
              'OID','FID','OBJECTID',
              'oid','fid','objectid', 
              'Oid','Fid','Objectid',
              'oID','fID','objectID',
              'ObjectID',

              // possible field name in socrata
              'id', 'ID', 'Id'  
            ]







            




             //*************************   ajax arcgis server section ***********************************  






             // Only for :  arcgis rest api type  ----- url + '?f=json' ----------- 
             async function arcgis_ajax_cross_origin(_url, __cross_origin_method){

              // Most of arcgis server support JSONP
              // newer arcgis server support both JSONP + CORS
              // some only support CORS, NOT JSONP



               

                // sample
                // _url = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                _url = _url + '?f=json';

                // token
                console.log('arcgis_online_token = = =',  arcgis_online_token)
                if (arcgis_online_token){
                  // _url += '&token=MAKARXXcMYLn8T0JnfpcGm6xycts9qOVr9JLWI-YZvtEgZMzFA6ls6mb0fPqfIqBC9PFdNRdffBEaJlDFH14WpsaorpPJ0_wxCJIqRnDvoVFm99jV3xgX5uuEWJjmuS2jEgW0KVo0Ri_IQ8UubSHGjemPqPlT7ua62Qd1rENhINdzStuQT5uhahpnm4iMd_jlt7FVWEubyJgEoPB1Eek2oGCo69g_lvqjZeIEyPwacV4XRtPgMyrZLKbI9Al9o0Y'
                  _url += '&token=' + arcgis_online_token
                }
                


                var _response_


               switch(__cross_origin_method) {


                case 'default':

                    _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
                  

                  break;


                case 'cors':
                    _response_ = await ajax_datatype_json(_url, _timeout)
                  break;


                  case 'jsonp':
                      _response_ = await ajax_jsonp_only(_url, _timeout)
                      break;


                case 'proxy':
                    _response_ = await ajax_proxy_only(_url, _timeout)
                          break;     

                default:
                    _response_ = await ajax_jsonp_json_proxy(_url, _timeout)
              }




              return  _response_



             }

                 
                        
          



                          
                  
                      async function ajax_getjson(_url){

                          // this will be retired soon     
                            
                          // Most of arcgis server support JSONP
                          // newer arcgis server support both JSONP + CORS
                          // some only support CORS, NOT JSONP



                           // Only for :  arcgis rest api type  ----- url + '?f=json' -----------   
                           // fist try datatype:jsonp, if failed, try datatype:json (need cors)
                           // arcgis server rest api , usually support jsonp( because of old history reason), the newer version also support CORS.
                           
                           



                          // --------- ajax ___url_string response = input  -------------



                                                // ___url_string = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer'
                                                var ___url_getJson = _url + '?f=json';

                                                console.log('ajax-jsonp -> ',___url_getJson)   

                                               var input;


                                                try{  

                                                  input = await $.ajax({
                                                                    timeout:_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                    type: 'GET',
                                                                    dataType: 'jsonp',
                                                                   
                                                                    url: ___url_getJson,
                                                                    
                                                                    
                                                                    error: function (jsonp_error_1) {
                                                                                                
                                                                      console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                                                                    },
                                                                                                
                                                                    success: function (data) {
                                                                      
                                                                    }
                                                                });                          


                                                    } catch(jsonp_error_2){ 

                                                                console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_2)    

                                                                // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                                                          

                                                                console.log('ajax-datatype:json-=======> ',___url_getJson)   
                                                                try {
                                                                
                                                                        // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                                                        
                                                                        input = await $.ajax({
                                                                                                      timeout:_timeout,
                                                                                                      url:___url_getJson,

                                                                                                      dataType: 'json',


                                                                                                      success: function (data) {
                                                                                                        
                                                                                                      }, // success
                                                                                                      
                                                                                                      error: function (json_error_1) {
                                                                                                        
                                                                                                        console.log('throw error event (ajax datatype:json failed json_error_1)', json_error_1)                                        
                                                                                                      }
                                                                                                      
                                                                                                  });
                                                                    
                                                                    
                                                                    
                                                                    


                                                                  
                                                                } catch(json_error_2){
                                                                    
                                                                    
                                                                    // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                                                    // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                                                    //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                                                    // the problem is internal folder is forbidden.

                                                                    
                                                                    console.log('catch( json_error_2 )', json_error_2)
                                                                    
                                                                   

                                                                    // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                                                    var error_status = {
                                                                      errorFrom: 'ajax_getjson',
                                                                      readyState:json_error_2.readyState,
                                                                      responseJSON:json_error_2.responseJSON,
                                                                      status:json_error_2.status,
                                                                      statusText: json_error_2.statusText
                                                                    
                                                                    }

                                                                    return error_status
                                                                    
                                                                }     
                                                            
                                                            
                                                            

                                              }// try - catch


                            
                         


                      return input
                      }// function 






                       // Only for our rest api,https://localhost:3200/restapi/rest_url?select=*&where=
                      //  without _url + '?f=json',  without jsonp
                      // return json, no need parse.
                      async function ajax_getjson_common(___url_getJson){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout:_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                         
                          
                      }

                      async function ajax_getjson_common_custom_timeout(___url_getJson, custom_timeout){
                        
                        console.log('ajax_getjson_common url is ',___url_getJson) 
                        var response
                        var error_response_json
                        
                        try{
                            response = await $.ajax({
                                    timeout: custom_timeout,
                                    type: "get",
                                    url:___url_getJson,
                                    

                                    success: function (data) { 
                                      console.log('ajax json success ', data)
                                      // return function here only return to ajax response, not return of this whole function
                                    }, // success



                                    error: function (jqXHR) {
                                      console.log('ajax json failed, jqXHR.responseJSON', jqXHR.responseJSON)
                                      // ajax failed, error
                                      error_response_json = jqXHR.responseJSON 
                                    }                                                                                              
                            });

                        } catch {

                          console.log('catch error for ajax_getjson_common ', error_response_json) 
                          return error_response_json
                        }


                        if (typeof response === 'object') {
                          // is object
                          return response 
                        } else {
                          // is string
                          return (JSON.parse(response))
                        }  
                      }








                //************* end ************   ajax arcgis server section ***********************************  




                      


// ======================== standard =========  ajax fetch general use ==============================


      
        
        async function ajax_datatype_json(___url_getJson, _custom_timeout){
            

            //dataType: "json" same as fetch, server must support CORS,
            // if server NOT support CORS, you have to use proxy to work around 

            //dataType: "json", the result is already json, no need to JSON.parse().

            // without dataType: "json", the result is string,  need to JSON.parse().




            console.log('ajax cors only, datatype json, (timeout) ', _custom_timeout , ___url_getJson)   


             var input

        try{
      
                  input  = await $.ajax({
                  
                                              timeout: _custom_timeout,
                                              url: ___url_getJson,
                                              type : 'GET',

                                              error: function (json_error_1) {
                                                                                                        
                                                              console.log('ajax datatype:json json_error_1 ',json_error_1)  
                                                              
                                                            
                                                    },


                                              success: function (data) {
                                                //console.log('success back --> ', data);

                                              },


                                            dataType: "json"


                                            // jsonp only works for arcgis server whoever support JSONP, 
                                            // jsonp NOT works for any file json, or file geojson

                                            //dataType: "jsonp"  // not work for hub    /data.json
                                            

                                            }); // await

          

                                        
                                
        } catch(json_error_2){
                              
                              
                                            // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                            // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                            //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                            // the problem is internal folder is forbidden.
              
                                            
                                            console.log('catch( json_error_2 )', json_error_2)
                                            
                                           
                                            // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                            var error_status = {
                                              errorFrom: 'ajax_datatype_json',
                                              readyState:json_error_2.readyState,
                                              responseJSON:json_error_2.responseJSON,
                                              status:json_error_2.status,
                                              statusText: json_error_2.statusText
                                            
                                            }
              
                                             return error_status
              
                                            
                                        }     




          return input
          


        }





                            

          // No time out, general use, no prefix for url          
          // fetch with time out option 
        async function fetch_only(___url_getJson, _custom_timeout){
              

            console.log('fetch only ',___url_getJson)   


          // get raw json = input 
          /*  
            * bug fix: 
            * No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:10' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
            * https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
            */



               
         /*  works, but this NOT await,    
           
         
          fetch(___url_getJson)
                     .then(function(response) {
                          return response.json();
                     })
                     .then(function(data) {

                                                 
                        console.log(data);

                        
                                                  
                        return data

                    });// fetch

           */ 


        // arcgis only, when domain not exist, fetch will error, must catch, return null

          try{
          
                    var  _resp_f = await fetch(___url_getJson);

                    return _resp_f


              } catch (error) {


                      console.log('fetch Error:', error);
                    return null

              }


        }





        async function ajax_jsonp_only(___url_getJson, _custom_timeout){
            

          // jsonp only work for arcgis server who support JSONP
          // jsonp NOT work for file .json, file .geojson or any file download 


          console.log('ajax jsonp only, (timeout) ', _custom_timeout,___url_getJson)   
          var input;


          try{  

          input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',


                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                             
                              error: function (jsonp_error_1) {
                                                                        
                                                                     
                                                              console.log('throw event , jsonp error 1   ', jsonp_error_1)

                                                          },
                                                          
                              success: function (data) {
                                 // console.log('jsonp success : ', data);

                                 
                              }
                          });                          


            }
        catch( jsonp_error_2 ){

         
                  console.log('catch jsonp error 2    ', jsonp_error_2)

                  var error_status = {

                    errorFrom: 'ajax_jsonp_only',
                    readyState:jsonp_error_2.readyState,
                    responseJSON:jsonp_error_2.responseJSON,
                    status:jsonp_error_2.status,
                    statusText: jsonp_error_2.statusText
                  
                  }

                  return error_status

        }// try - catch




      return input
      }// function 





      async function ajax_proxy_only(___url_getJson, _custom_timeout){
            

        //dataType: "json" same as fetch, server must support CORS,
        // if server NOT support CORS, you have to use proxy to work around 

        //dataType: "json", the result is already json, no need to JSON.parse().

        // without dataType: "json", the result is string,  need to JSON.parse().




         console.log('ajax proxy only,  (timeout) ', _custom_timeout ,___url_getJson)   

         var _proxified_url = proxify_url(___url_getJson)


         console.log('try ajax proxy =======> ',  _proxified_url)  



         var input

    try{
  
              input  = await $.ajax({
              
                                          timeout: _custom_timeout,
                                          url: _proxified_url,
                                          type : 'GET',

                                          error: function (proxy_error_1) {
                                                                                                    
                                                          console.log('ajax proxy_error_1 ',proxy_error_1)  
                                                          
                                                        
                                                },


                                          success: function (data) {
                                            //console.log('success back --> ', data);

                                          },


                                        dataType: "json"


                                        // jsonp only works for arcgis server whoever support JSONP, 
                                        // jsonp NOT works for any file json, or file geojson

                                        //dataType: "jsonp"  // not work for hub    /data.json
                                        

                                        }); // await

      

                                    
                            
                                      } catch(proxy_error_1){
                          
                          
                                        // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                                        // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                                        //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                                        // the problem is internal folder is forbidden.
          
                                        
                                        console.log('catch( proxy_error_1 )', proxy_error_1)
                                        
                                       
                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                        var error_status = {
                                          errorFrom: 'ajax_proxy_only',
                                          readyState:proxy_error_1.readyState,
                                          responseJSON:proxy_error_1.responseJSON,
                                          status:proxy_error_1.status,
                                          statusText: proxy_error_1.statusText
                                        
                                        }
          
                                         return error_status
          
                                        
                                    }     




      return input
      


      }

      async function ajax_proxy_only_customized_type(___url_getJson, _custom_timeout, _customized_datatype){
        //dataType: can be text, html, script, may not be "json"  https://api.jquery.com/jquery.ajax/
         console.log('ajax proxy, (timeout) ',___url_getJson, _custom_timeout) 
         var _proxified_url = proxify_url(___url_getJson)
         console.log('try ajax proxy =======> ',  _proxified_url) 
         var input

        try{
                input  = await $.ajax({
                                        timeout: _custom_timeout,
                                        url: _proxified_url,
                                        type : 'GET',
                                        dataType: _customized_datatype,
                                          error: function (proxy_error_1) {                        
                                                          console.log('ajax proxy_error_1 ',proxy_error_1) 
                                                },
                                          success: function (data) {
                                            //console.log('success back --> ', data);
                                          }
                                        }); // await
        } catch(proxy_error_1){
              console.log('catch( proxy_error_1 )', proxy_error_1)
              return proxy_error_1
        }
        return input
      }




             
       function proxify_url(_target_url){


                              // fetch + proxy (bypass cors)

                              //  ****** cors ******

                                  // some site that doesn’t send Access-Control-*, our browser will block response as No 'Access-Control-Allow-Origin' header is present on the requested resource  
                                  // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
                                  // we must add such header via this proxy
                                  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

                                  //const proxyurl = "http://localhost:7000/";
                                  //const proxyurl = "https://localhost:7200/";


                var _proxified_target;


                if (_target_url.includes('https://')){

                          _proxified_target = proxyurl_https  + _target_url;
                } else{

                          _proxified_target = proxyurl_http + _target_url;  
                }


                return _proxified_target

       }
       


       
      // 3 level try, jsonp > json(cors) > proxy 
        async function ajax_jsonp_json_proxy(___url_getJson, _custom_timeout){
            

            // 3 level try, jsonp > json(cors) > proxy ,   good for arcgis server rest api

           // first try jsonp 
           //  if jsonp failed, catch and try  datatype:json
           // if json failed, catch and try proxy

          

           // always with time out option 


          console.log('ajax cross is default, 3 try, jsonp,cors,proxy (timeout)', _custom_timeout ,___url_getJson)   
          var input;


          try{  

            input = await $.ajax({
                              timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                              type: 'GET',
                              dataType: 'jsonp',
                             
                              url: ___url_getJson,
                              
                              
                              error: function (jsonp_error_1) {
                                                          
                                console.log('throw error event(ajax jsonp failed jsonp_error_1) ', jsonp_error_1)                                        
                              },
                                                          
                              success: function (data) {
                                
                              }
                          });                          


              } catch(jsonp_error_1){ 

                          console.log('catch ( ajax jsonp failed jsonp_error_2 ) ', jsonp_error_1)  
                          
                          // not return error yet, because we will try datatype:jsonp

                          // jsonp failed due to remote server does NOT support jsonp, try datatype:json (need cors)
                    

                          console.log('ajax-datatype:json-=======> ',___url_getJson)   
                          try {
                          
                                  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                                  
                                  input = await $.ajax({
                                                                timeout: _custom_timeout,
                                                                url:___url_getJson,

                                                                dataType: 'json',


                                                                success: function (data) {
                                                                  
                                                                }, // success
                                                                
                                                                error: function (json_error_2) {
                                                                  
                                                                  console.log('throw error event (ajax datatype:json failed json_error_2)', json_error_2)                                        
                                                                }
                                                                
                                                            });
                              
                              
                              
                              


                            
                          } catch(json_error_2){
                              
                              
                              // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                              // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                              //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                              // the problem is internal folder is forbidden.

                              
                              console.log('catch( json_error_2 )', json_error_2)
                              
                              // not return error yet, because we will try proxy 

                             



                            try {
                          
                           
                                 var _proxified_url = proxify_url(___url_getJson)


                                 console.log('try ajax proxy =======> ',  _proxified_url)  
                              
                              input = await $.ajax({
                                                            timeout: _custom_timeout,
                                                            url:_proxified_url,

                                                            dataType: 'json',


                                                            success: function (data) {
                                                              
                                                            }, // success
                                                            
                                                            error: function (proxy_error_3) {
                                                              
                                                              console.log('throw error event (ajax proxy failed proxy_error_1)', proxy_error_3)                                        
                                                            }
                                                            
                                                        });
                          
                          
                          
                          


                        
                                        } catch(proxy_error_3){



                                                        // can't return whole error object, if return whole error object, must use catch to handle it later down stream. 
                                                        var error_status = {
                                                          errorFrom: 'ajax_jsonp_json_proxy_proxy3',
                                                          readyState:proxy_error_3.readyState,
                                                          responseJSON:proxy_error_3.responseJSON,
                                                          status:proxy_error_3.status,
                                                          statusText: proxy_error_3.statusText
                                                        
                                                        }

                                                        return error_status

                                          } // try proxy 3




                              
                          } // try datatype:json   2
                      
                      
                      

        } // try jsonp 1






      return input
      }// function 







      async function ajax_json_proxy(___url_getJson, _custom_timeout){
            

          // 2 level try, json > proxy,  good for hub  /data.json


        // first try json 
        //  if json failed, catch and try  proxy

       

        // always with time out option 


       console.log('ajax json --> proxy ',___url_getJson)   
       var input;


       try{  

         input = await $.ajax({
                           timeout:_custom_timeout,  // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                           type: 'GET',
                           dataType: 'json',
                          
                           url: ___url_getJson,
                           
                           
                           error: function (json_error_1) {
                                                       
                             console.log('throw error event(ajax json failed json_error_1) ', json_error_1)                                        
                           },
                                                       
                           success: function (data) {
                             
                           }
                       });                          


           } catch(json_error_1){ 

                       console.log('catch ( ajax jsonp failed jsonp_error_1 ) ', json_error_1)  
                       
                       // not return error yet, because we will try proxy

                       var _proxified_url = proxify_url(___url_getJson)


                       console.log('try ajax proxy =======> ',  _proxified_url)  
                       
                       
                       try {
                       
                               // add timeout, because if one ajax pending for ever, it could skip it move to next ajax, instead of stuck for ever.
                               
                               input = await $.ajax({
                                                             timeout: _custom_timeout,
                                                             url:_proxified_url,

                                                             dataType: 'json',


                                                             success: function (data) {
                                                               
                                                             }, // success
                                                             
                                                             error: function (proxy_error_2) {
                                                               
                                                               console.log('throw error event (ajax proxy failed proxy_error_2)', proxy_error_2)                                        
                                                             }
                                                             
                                                         });
                           
                           
                           
                           


                         
                       } catch(proxy_error_2){
                           
                           
                           // http://localhost:10/json2tree/searchlayer.html?url=https://maps.lacity.org/arcgis/rest/services
                           // internal folder will failed both ajax call, jsonp and non-jsonp. must catch error.
                           //The error is No 'Access-Control-Allow-Origin' header is present, but the problem is not that, 
                           // the problem is internal folder is forbidden.

                           
                           console.log('catch( proxy_error_2 )', proxy_error_2)
                           
                          
                           var error_status = {
                                                    errorFrom: 'ajax_json_proxy',
                                                    readyState:proxy_error_2.readyState,
                                                    responseJSON:proxy_error_2.responseJSON,
                                                    status:proxy_error_2.status,
                                                    statusText: proxy_error_2.statusText
                                                  
                                                  }
                    
                            return error_status

                           
                       }     
                   
                   
                   

     }// try - catch






   return input
   }// function 









  // ==============   end ========== ajax fetch general use ==============================


















                    
                          

// ...... loading spinner with timer ......... jquery css   .........  



                   /**/

                            
                   function show_loading_img_spinner(elementID_appendTo, process_bar_id, ____url___info___){


                    /*

                      =============    time count down progress bar     =============   

                      https://codepen.io/hoogw/pen/RwgmNNm

                      https://stackoverflow.com/questions/24530908/showing-a-time-countdown-progress-bar
                      https://codepen.io/Rudchyk/pen/qNOEGj


                  */

                      

                  // nested function    
                  function progress(timenow, timetotal, $element) {



                        if(timenow < timetotal-1) {

                                      var progressBarWidth = timenow * $element.width() / timetotal;
                                      $element.find('div').animate({ width: progressBarWidth }, 100).html(timenow);

                        } else {
                                      $element.find('div').html(timenow);
                        }
                        
                  
                        setTimeout(function() {

                            progress(timenow + 1, timetotal, $element);

                        }, 1000);


                  
                      

                  };








                                
                  var _jquery_process_bar_id = '#' +  process_bar_id

                  //if ( $( "#ajax_getJson_processing" ).length ) {
                  if ( $( _jquery_process_bar_id ).length ) { 
                  // already have one progress_bar do not duplicate

                  } else {

                          

                          var preloader_div = document.createElement('div');
                          preloader_div.setAttribute("id", process_bar_id);
                          

                          var preloader_div_inner = document.createElement('div');
                          preloader_div_inner.className = 'bar';
                          
                          



                          preloader_div.appendChild(preloader_div_inner);
                          

                          //------------End ----------- material preloader ----------------------

                        

                        var element = document.getElementById(elementID_appendTo);

                        

                        // in use, progress bar
                        element.appendChild(preloader_div);



                        progress(1, 9, $('#'+ process_bar_id));

                  }




                  }



                  

                  function remove_loading_img_spinner(elementID_remove){
                            


                    var _jquery_elementID_remove = '#' +  elementID_remove
      
                    //if ( $( "#ajax_getJson_processing" ).length ) {
                    if ( $( _jquery_elementID_remove ).length ) { 
                      
      
      
      
                            var elem = document.getElementById(elementID_remove);
                            elem.parentElement.removeChild(elem);
      
                    }
      
                  }
      

                  
                  function show_message(message_elementID, text_message){
                                                
                                          
                    console.log('show message:  message_elementID, text_message ', message_elementID, text_message)
                    document.getElementById(message_elementID).innerHTML = text_message

                    remove_loading_img_spinner('ajax_getJson_processing');
                
                  }



                  
//  ......   ......  end   ......  ...... loading spinner with timer ......... jquery css   .........  







        function display_count_info(_subject, ___showing_cnt, ___all_cnt, _label_id){

                var _percentage_html = ''
                var _percentage_float, _percentage_integer, _percentage_decimal;
                
                if ((___showing_cnt > 0) && (___all_cnt > 0)) {
                  _percentage_float = (100 * ___showing_cnt) / ___all_cnt
                  _percentage_integer = Math.floor(_percentage_float);
                  _percentage_decimal = (_percentage_float.toFixed(3)).split(".")[1]

                  // in use, simple number as :  50.987%
                  _percentage_html =   '<h6 style="display: inline;"><mark>' 
                  _percentage_html +=        '<b>' + _percentage_integer +  '</b>'   
                  _percentage_html +=        '.' 
                  _percentage_html +=        '<sup><small>' + _percentage_decimal + '</small></sup>' 
                  _percentage_html +=        '%' 
                  _percentage_html +=   '</mark></h6>'
                  

                  /*
                        // not use w3.css progress bar, just keep it here
                        _percentage_html =   '<div class="w3-dark-grey w3-large">'
                        _percentage_html +=      '<div class="w3-container w3-yellow" style="width:' +  _percentage + '%">' +   _percentage + '%</div>'
                        _percentage_html +=  '</div>'
                  */
                }

                var _html_for_count = ''
                
                    if (_subject) { _html_for_count +=    '<h5>' + _subject +  '</h5>' }
                                
                    _html_for_count +=   '<h1 style="display: inline;"><mark><big><b>' + ___showing_cnt + '</b></big></mark>' 
                    _html_for_count +=    '/' 
                    _html_for_count +=       '<small><sup>' + ___all_cnt +'</sup></small></h1>' 
                    _html_for_count +=    '&nbsp;&nbsp;'  
                    _html_for_count +=    _percentage_html 

                document.getElementById(_label_id).innerHTML =    _html_for_count 
        }






        function click_button_change_style_handler(event, select_all_element_with_this_class, original_class, change_to_class){

                 /*  click to remove this element original-class, do not add new change-to-class, use these code 
                        $("." + select_all_element_with_this_class).addClass(original_class);
                        $(event.target).parent().removeClass(original_class);
                 */

                      
                 $("." + change_to_class).removeClass(change_to_class).addClass(original_class);
                 $(event.target).parent().removeClass(original_class).addClass(change_to_class);

               console.log($(".open-btn"))
               console.log(event.target)

        }




        
        function open_link(_url_need_to_open_in_a_new_tab){
            console.log('open link url in a new tab' , _url_need_to_open_in_a_new_tab)
            _url_need_to_open_in_a_new_tab += '&cross=' + _cross
            _url_need_to_open_in_a_new_tab += '&timeout=' + _timeout
            window.open(_url_need_to_open_in_a_new_tab, '_blank')
        }


        function init_user_interface_event(){

          // -cross- 
          $('input[id=' + _cross + ']').prop('checked', true);
          $('input[type=radio][name=cross_radio').on('change', function(){
            _cross = this.value
            update_url_parameter('cross',_cross)
            console.log('cross radio change to ', _cross )
          });



          // -time- -out-
          $('#timeout_value').html(_timeout)
          document.getElementById("timeout_range").value = _timeout;
          $('#timeout_range').on('change', function(){
            _timeout =  document.getElementById("timeout_range").value
            $('#timeout_value').html(_timeout)
            update_url_parameter('timeout',_timeout)
          });

        }




        

        function getStringBetweenChars(str, char1, char2) {

          // Example usage:
          //const myString = "Hello [World]!";
          //const result = getStringBetweenChars(myString, "[", "]");
          //console.log(result); // Output: World

          // https://proyecto-causa-nuestra-fvalorate.hub.arcgis.com

          if (str){

            const index1 = str.lastIndexOf(char1);
            const index2 = str.indexOf(char2);
          
            if (index1 === -1 || index2 === -1 || index2 <= index1) {
              return ""; // Or handle the error as needed
            }
          
            return str.substring(index1 + 1, index2);

          } else {

            return str
          }

          
        }





function convertTimestampToHumanTime(timestamp) {
  // not use, normally is second, but ESRI already  time 1000 becomes to milliseconds
  //const date = new Date(timestamp * 1000); // Multiply by 1000 if timestamp is in seconds
  const date = new Date(timestamp); 

  // Returns a string representing the date and time in the user's locale
  //return date.toUTCString();   // GMT time
  return date  // local time
}

        

/**/
// - - - - download json csv  - - - - 
/**/

var ready_download_json
var json_for_csv

  // sample https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

  // only for save json file
  function saveJsonAsFile(filename, data) {


    // How can I beautify JSON  https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically
    const blob = new Blob([JSON.stringify(data, null, 2)]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()

  };


  function saveStringAsFile(filename, txt_string) {


    // How can I beautify JSON  https://stackoverflow.com/questions/2614862/how-can-i-beautify-json-programmatically
    const blob = new Blob([txt_string]);
    const link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click()

  };

/**/
//  - - - -  end  - - - -  download json csv   - - - - 
/**/





function getDomain(testing_url) {
  try {
    const testing_urlObj = new URL(testing_url);
    return testing_urlObj.hostname;
  } catch (e) {
    return null;
  }
}



function getSubstringBefore(str, searchValue) {
  const index = str.indexOf(searchValue);
  if (index === -1) {
    return str; // If the search value is not found, return the original string
  }
  return str.substring(0, index + searchValue.length);
}





