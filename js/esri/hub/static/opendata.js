 
 
 /*


  ?file=hub.site.static.data.2019.js.zip 
   without '?file=xxx'   by default file=hub.site.static.data.js.zip;


 
   for local test only, need add ?localdomain=1

            http://localhost:10/json2tree/esri/hub.site.static.html?localdomain=1

              &localdomain=1 //by default, without this paramerter, will use production domain,  
            // with this parameter , 1 means, use localhost:3000/restapi....
            
            
            
              // https: ---- production
                            // var _static_site_zip_uri = 'https://transparentgov.net/data/json2tree/hub.site.static.data.js.zip'
                                
                                // http ---- localhost
                           //   var _static_site_zip_uri = 'http://localhost:10
                           

            
            
 */
 








 
 
 // with lunr ( enforce inject lunr_id )
 // with mark.js

 
var _static_site_zip_uri
 
 
 
 
 var input_current       // whole array of json, without filter, 
 var _filtered_results   // filtered results

 var _filter_by // search filter by keyword
 var scroll_bottom_px = 900  // 5k 900px,   4k 1200,  1080p 1500               
 var short_list_count = 100     
 var need_render_all = '';   // '' means no need render,   'input_current' or 'filter_result'
 
 var current_filter_result_count;
 var __total_item_count;
 
 
 // lunr.js
 var idx
 var lunr_index
 var lunr_idx_ready_status= false;
 
 
 
 
 
 


  
  
  
function rendering_json_to_html(json) {
      
  var _results = json;
  var html = '';
  html += '<div>';
                    
  if (_results.length > 0) {

    html += '<ol class="custom-counter">';

    for (var i = 0; i < _results.length; ++i){  
                    
      display_count_info('', i+1 , __total_item_count, 'counter_label')


      // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************

      // sometime attributes.url is NOT null, but attributes.siteUrl is null.   if url is null, siteUrl always is null
      var ___siteUrl = _results[i].attributes.url;   // true site url 
      var ___siteUrl_alternative = _results[i].attributes.siteUrl;  

      var _name = _results[i].attributes.name;  

      var hub_id = _results[i].attributes.id;
      var hub_itemId = _results[i].attributes.itemId;
      var hub_content = _results[i].attributes.content;
      var hub_description = _results[i].attributes.description;

      var hub_created_timestamp  = _results[i].attributes.created;
      var hub_created  = convertTimestampToHumanTime(hub_created_timestamp);
      var hub_modified_timestamp = _results[i].attributes.modified;
      var hub_modified = convertTimestampToHumanTime(hub_modified_timestamp);


      var hub_name = _results[i].attributes.name;
      var hub_orgId = _results[i].attributes.orgId;    
      var hub_orgName = _results[i].attributes.orgName;    
      var hub_organization = _results[i].attributes.organization; 
      var hub_orgContactEmail = _results[i].attributes.orgContactEmail; 
      var hub_owner = _results[i].attributes.owner;
      var hub_region = _results[i].attributes.region;
      var hub_searchDescription = _results[i].attributes.searchDescription;
      var hub_server = _results[i].attributes.server;
      
      var hub_slug = _results[i].attributes.slug;
      var hub_source = _results[i].attributes.source;
      var hub_sourceProvenance = _results[i].attributes.sourceProvenance;
      var hub_hubType = _results[i].attributes.hubType;
      var hub_type = _results[i].attributes.type;

      var hub_url = _results[i].attributes.url;
      var hub_snippet = _results[i].attributes.snippet;
      var hub_culture = _results[i].attributes.culture;

      var links_self = _results[i].links.self;
      var links_rawEs = _results[i].links.rawEs;
      var links_itemPage = _results[i].links.itemPage;
      var links_esriRest = _results[i].links.esriRest;

      

      var org_short_name = ''
      org_short_name = getStringBetweenChars(___siteUrl, '-', '.hub.arcgis.com')
      if (!(org_short_name)){org_short_name = getStringBetweenChars(___siteUrl, '-', '.opendata.arcgis.com')}

        var hubsite_short_name = ''
        hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.hub.arcgis.com')
        if (!(hubsite_short_name)){hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.opendata.arcgis.com')}



      var portal_json_url = ''
      if (hub_orgId){ portal_json_url = 'https://www.arcgis.com/sharing/rest/portals/' +  hub_orgId + '?f=pjson'}

      var org_home_page_url = ''
      var org_home_gallery_url = ''
  if (org_short_name){ 
      org_home_page_url = 'https://' +  org_short_name + '.maps.arcgis.com'
      org_home_gallery_url = org_home_page_url + portal_gallery_html
  }
      
      var esri_hosted_arcgis_server_url = ''
      if (hub_orgId){ esri_hosted_arcgis_server_url = 'https://services.arcgis.com/'  + hub_orgId + '/arcgis/rest/services'}


      //  ---- only for opendata v3. . .. . must keep for ----- show layer button . . .. .
                
                    var _coordinates ={}
                    var ____center_lat = 40.755931
                    var ____center_long = -73.984606

                    if (_results[i].attributes.extent){
                      //  ---- only for opendata v3. .
                      _coordinates = _results[i].attributes.extent.coordinates;
                      //  ---- only for opendata v3. .

                      
                                      ____center_lat = (_coordinates[0][1] + _coordinates[1][1])/ 2
                                      ____center_long = (_coordinates[0][0] + _coordinates[1][0])/ 2
                    } 
                    // console.log('___siteUrl -> ', ___siteUrl)

                    // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                    var _link_protocal = window.location.protocol;
                    if (___siteUrl) {
                        if (___siteUrl.indexOf('http://') > -1) {
                                // if resource url is http, force link protacal as http: 
                                _link_protocal = 'http:'
                        }        
                    } else {
                     // console.log(' warn :  attribute.Url is null  _name, check attribute.siteUrl ', _name, ___siteUrl_alternative )
                    }
                    // ------ end fix bug, --------------------


                                        
                      // ---- fix bug, _results[i].ArcGIS_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                      var _link_protocol = window.location.protocol;
                      var _link_url_parameter = esri_hosted_arcgis_server_url;
                      if (_link_url_parameter.indexOf('http://') > -1)
                      {

                          // if resource url is http, force link protocol as http: 
                          _link_protocol = 'http:'
                      }// if
                    // ------ end fix bug,

       // ***** end ***. . .. . must keep for ----- show layer button . . .. .
      
      // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
      

      html += '<li>' // css .ordered_list_number{ size font}
      html += '&#8680;&nbsp;';

      html += '<span class="context" style="font-size:22.2px;font-weight:800;">'  + hub_name + '</span>' 
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<a target="_blank" href="' + ___siteUrl + '">';
      html +=   ___siteUrl 
      html += '</a>'; 
      html += '</br>';

      html += '<sup style="font-size:15.5px;">created </sup>'
      html += '<span style="font-size:15.5px;">' + hub_created + ' [-unix-time-' + hub_created_timestamp + ']' + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<br>';
      html += '<sup style="font-size:15.5px;">modified </sup>'
      html += '<span style="font-size:15.5px;">' + hub_modified + ' [-unix-time-' + hub_modified_timestamp + ']' +'</span>'
      html += '</br>';

      

     
      html += '<sup style="font-size:15.5px;">Organization-Short-Name</sup>'
      html += '<span class="context" style="font-size:25.5px; font-weight:600; background-color:#FFA500;">'  + org_short_name + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';


     
      html += '<sup style="font-size:15.5px;">Organization-ID</sup>'
      html += '<span class="context" style="font-size:23.3px; font-weight:600; background-color:#FFA07A;">'  + hub_orgId + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';


      html += '</br>';

      html += '<sup style="font-size:18.5px; background-color:#FF1493"> AGOL-organization-home-esri-hosted-portal </sup>'
      html += '<a target="_blank"  style="font-size:20.3px;" href="' + org_home_gallery_url + '">';
      html +=   org_home_gallery_url 
      html += '</a>'; 
      
      
    

      if (hub_orgId){

       
      
        html += '</br>';

        html += '<sup style="font-size:9.1px;">Esri-hosted-Portal-JSON-allowedRedirectUris-urlKey</sup>'
        html += '<a target="_blank"  style="font-size:18.8px;" href="' + portal_json_url + '">';
        html +=   portal_json_url 
        html += '</a>';
        html += '&nbsp;&nbsp;&nbsp;';

        html += '</br>';


        //  . . .self hosted  . . .
        html += '<span style="font-size:18.8px;"><b>Self</b></span><span style="font-size:8.8px;">-Hosted-Enterprise-Portal-URL: look for allowedRedirectUris </span>'
        html += '<a target="_blank"  style="font-size:9.1px;" href="' + portal_json_url + '">';
        html +=   portal_json_url 
        html += '</a>';
        html += '&nbsp;&nbsp;&nbsp;';
        html += '</br>';
        html += '<span style="font-size:18.8px;"><b>Self</b></span><span style="font-size:8.8px;">-Hosted-Arcgis-Server-URL:  from Self-Hosted-Enterprise-Portal &#8594; Gallery tab &#8594; any layer &#8594; layer source  </span>'
        html += '</br>';
        // . . . end  . . . self hosted 


        html += '<span style="font-size:18.8px;"><b>Esri</b></span><span style="font-size:10.8px;">-Hosted-Feature-Server-URL: 0-9 possible link, only ONE works, find out youself</span>'
        html += '</br>';

        html += '<sup style="font-size:15.5px;">0 </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url + '">';
        html +=   esri_hosted_arcgis_server_url 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;'; 
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 0</span>';
        html += '</button>';
          



        html += '</br>';
        html += '<sup style="font-size:15.5px;">1  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services1.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services1.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;'; 
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services1.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 1</span>';
        html += '</button>';




        html += '</br>';
        html += '<sup style="font-size:15.5px;">2  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services2.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services2.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;';
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services2.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 2</span>';
        html += '</button>';
        
        


        html += '</br>';
        html += '<sup style="font-size:15.5px;">3  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services3.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services3.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;'; 
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services3.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 3</span>';
        html += '</button>';





        html += '</br>';
        html += '<sup style="font-size:15.5px;">4  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services4.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services4.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;'; 
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services4.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 4</span>';
        html += '</button>';




        html += '</br>';
        html += '<sup style="font-size:15.5px;">5  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services5.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services5.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;'; 
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services5.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 5</span>';
        html += '</button>';




        html += '</br>';
        html += '<sup style="font-size:15.5px;">6  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services6.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services6.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;';
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services6.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 6</span>';
        html += '</button>'; 




        html += '</br>';
        html += '<sup style="font-size:15.5px;">7  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services7.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services7.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;'; 
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services7.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 7</span>';
        html += '</button>';





        html += '</br>';
        html += '<sup style="font-size:15.5px;">8  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services8.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services8.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;';
        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services8.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 8</span>';
        html += '</button>';




        html += '</br>';
        html += '<sup style="font-size:15.5px;">9  </sup>'
        html += '<a target="_blank"  style="font-size:11.1px;" href="' + esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services9.arcgis.com') + '">';
        html +=   esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services9.arcgis.com') 
        html += '</a>'; 
        html += '&nbsp;&nbsp;&nbsp;';


        //  . .  button  . .
        html += '&nbsp;&nbsp;';
        _open_link = _link_protocol + "//" + window.location.host +  '/json2tree/esri/server/folder2.html?url=' +  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services9.arcgis.com') + '&org=' + hub_orgName
        html += '<button class="click_change_style" onclick="open_link(\'' + _open_link + '\')">';
        html +=       '<span style="font-size:9.6px">Show layers 9</span>';
        html += '</button>';



      } else {
        html += '&nbsp;&nbsp;&nbsp;';
        html += '<span style="font-size:13.1px;">Esri-Hosted-Feature-Server-Not-Available </span>'
      }
      
      

      html += '</br>';

      
      html += '<sup style="font-size:15.5px">org-name</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_orgName + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">org-full-name</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_organization + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">org-contact</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_orgContactEmail + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">owner</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_owner + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">region</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_region + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">culture</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_culture + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';


      html += '</br>';


      html += '<sup style="font-size:15.5px">slug</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_slug + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">source</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_source + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">source provenance</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_sourceProvenance + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      

      html += '</br>';

      html += '<sup style="font-size:15.5px">id</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_id + '</span>' 
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">hub type</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_hubType + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      html += '<sup style="font-size:15.5px">type</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_type + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">snippet</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_snippet + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';

      html += '<sup style="font-size:15.5px">server</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_server + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';

      html += '<sup style="font-size:15.5px">content</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_content + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';

      html += '<sup style="font-size:15.5px">item ID</sup><span class="context" style="font-size:17.7px;font-weight:800">'  + hub_itemId + '</span>'
      html += '&nbsp;&nbsp;&nbsp;';
      

      html += '</br>';
      html += '<sup style="font-size:19.9px;">Description</sup><span class="context" style="font-size:12.2px;font-style:italic;">'  + hub_description + '</span>'
      
      
      html += '</br>';

      html += '<sup style="font-size:15.5px">url</sup>'
      html += '<a target="_blank"  style="font-size:15.5px" href="' + hub_url + '">';
      html +=   hub_url 
      html += '</a>'; 
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">url alternative</sup>'
      html += '<a target="_blank"  style="font-size:15.5px" href="' + ___siteUrl_alternative + '">';
      html +=   ___siteUrl_alternative 
      html += '</a>'; 
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">self</sup>'
      html += '<a target="_blank"  style="font-size:15.5px" href="' + links_self + '">';
      html +=   links_self 
      html += '</a>'; 
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">rawEs</sup>'
      html += '<a target="_blank"  style="font-size:15.5px" href="' + links_rawEs + '">';
      html +=   links_rawEs 
      html += '</a>'; 
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">item page</sup>'
      html += '<a target="_blank"  style="font-size:15.5px" href="' + links_itemPage + '">';
      html +=   links_itemPage 
      html += '</a>'; 
      html += '&nbsp;&nbsp;&nbsp;';

      html += '</br>';

      html += '<sup style="font-size:15.5px">esri REST</sup>'
      html += '<a target="_blank"  style="font-size:15.5px" href="' + links_esriRest + '">';
      html +=   links_esriRest 
      html += '</a>'; 
      html += '&nbsp;&nbsp;&nbsp;';


      html += '</br>';

      html += '<sup style="font-size:19.9px;">Search Description</sup><span class="context" style="font-size:12.2px;font-style:italic;">'  + hub_searchDescription + '</span>'
      html += '</br>';




        




        //  . .  button  . . 
          html += '<button class="click_change_style" onclick="window.open(\'' + _link_protocal + "//" + window.location.host +  '/json2tree/esri/online2/hub.html?url=' +  ___siteUrl;
          html += '&org=' + encodeURIComponent(_name);
            html += '&_center_lat=' + ____center_lat;
            html += '&_center_long=' + ____center_long;
            html += '&_center_zoom=' +  '11';        //_center_zoom;
            html +=  '\',\'_blank\')">';
                    html +=  'show layer list';
            html += '</button>';
            html += '&nbsp;&nbsp;&nbsp;';


          html += '<button class="click_change_style" onclick="window.open(\'' + _link_protocal + "//" + window.location.host +  '/json2tree/esri/online/hub.html?url=' +  ___siteUrl;
          html += '&org=' + encodeURIComponent(_name);
            html += '&_center_lat=' + ____center_lat;
            html += '&_center_long=' + ____center_long;
            html += '&_center_zoom=' +  '11';        //_center_zoom;
            html +=  '\',\'_blank\')">';
                    html +=  'show layer list(maze)';
            html += '</button>';
            html += '&nbsp;&nbsp;&nbsp;';
        // . .  end  . .  button  . .  
                                  

                    
        
        html += '<br><br><br>';    
        html += '</li>';

      } // for

    html += '</ol>';
  } // if

  html +='</div>'
  $('#json-renderer').html(html);

}  

                              
  
  
function build_json_for_csv(_raw_json){

  var refined_json = []
  

  for (let i = 0; i < _raw_json.length; i++) {


  var ___siteUrl = _raw_json[i].attributes.url;   // true site url 
  var ___siteUrl_alternative = _raw_json[i].attributes.siteUrl;  

  var _name = _raw_json[i].attributes.name;   

  var hub_id = _raw_json[i].attributes.id;
  var hub_itemId = _raw_json[i].attributes.itemId;
  var hub_content = _raw_json[i].attributes.content;
  var hub_description = _raw_json[i].attributes.description;

  var hub_name = _raw_json[i].attributes.name;
  var hub_orgId = _raw_json[i].attributes.orgId;    
  var hub_orgName = _raw_json[i].attributes.orgName;    
  var hub_organization = _raw_json[i].attributes.organization; 
  var hub_orgContactEmail = _raw_json[i].attributes.orgContactEmail; 
  var hub_owner = _raw_json[i].attributes.owner;
  var hub_region = _raw_json[i].attributes.region;
  var hub_searchDescription = _raw_json[i].attributes.searchDescription;
  var hub_server = _raw_json[i].attributes.server;
  var hub_siteUrl = _raw_json[i].attributes.siteUrl;
  var hub_slug = _raw_json[i].attributes.slug;
  var hub_source = _raw_json[i].attributes.source;
  var hub_sourceProvenance = _raw_json[i].attributes.sourceProvenance;
  var hub_hubType = _raw_json[i].attributes.hubType;
  var hub_type = _raw_json[i].attributes.type;

  var hub_url = _raw_json[i].attributes.url;
  
  var hub_snippet = _raw_json[i].attributes.snippet;
  var hub_culture = _raw_json[i].attributes.culture;

  var links_self = _raw_json[i].links.self;
  var links_rawEs = _raw_json[i].links.rawEs;
  var links_itemPage = _raw_json[i].links.itemPage;
  var links_esriRest = _raw_json[i].links.esriRest;

  

  var org_short_name = ''
  org_short_name = getStringBetweenChars(___siteUrl, '-', '.hub.arcgis.com')
  if (!(org_short_name)){org_short_name = getStringBetweenChars(___siteUrl, '-', '.opendata.arcgis.com')}

  var hubsite_short_name = ''
  hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.hub.arcgis.com')
  if (!(hubsite_short_name)){hubsite_short_name =  getStringBetweenChars(___siteUrl, '/', '.opendata.arcgis.com')}




  var portal_json_url = ''
  if (hub_orgId){ portal_json_url = 'https://www.arcgis.com/sharing/rest/portals/' +  hub_orgId + '?f=pjson'}

  var org_home_page_url = ''
  var org_home_gallery_url = ''
  if (org_short_name){ 
      org_home_page_url = 'https://' +  org_short_name + '.maps.arcgis.com'
      org_home_gallery_url = org_home_page_url + portal_gallery_html
  }
  
  var esri_hosted_arcgis_server_url = ''
  if (hub_orgId){ esri_hosted_arcgis_server_url = 'https://services.arcgis.com/'  + hub_orgId + '/arcgis/rest/services'}



  var single_hub_item = {}
  single_hub_item['line_number'] =  i+1
  single_hub_item['organization_name'] =  hub_orgName

  single_hub_item['organization_id'] =  hub_orgId
  single_hub_item['organization_short_name'] = org_short_name
  single_hub_item['hubsite_short_name'] = hubsite_short_name

    single_hub_item['organization_home_page_url'] =  org_home_page_url
    
    single_hub_item['portal_json_url']   =  portal_json_url

    single_hub_item['hub_site_name'] =  hub_name
    single_hub_item['organization_full_name'] =  hub_organization
    single_hub_item['contact_email'] =  hub_orgContactEmail
    single_hub_item['owner'] =  hub_owner
    single_hub_item['region'] =  hub_region


    single_hub_item['site_url'] =  hub_siteUrl
    single_hub_item['site_url_alternative'] =___siteUrl_alternative
    single_hub_item['slug'] =  hub_slug

    single_hub_item['source'] =  hub_source
    single_hub_item['sourceProvenance'] =  hub_sourceProvenance

    single_hub_item['url'] =  hub_url
    single_hub_item['snippet'] =  hub_snippet
    single_hub_item['culture'] =  hub_culture
    single_hub_item['links_self'] =  links_self
    single_hub_item['links_rawEs'] =  links_rawEs
    single_hub_item['links_itemPage'] =  links_itemPage
    single_hub_item['links_esriRest'] =  links_esriRest
    
    
    single_hub_item['hub_id'] =  hub_id
    single_hub_item['hubType'] =  hub_hubType
    single_hub_item['itemId'] =  hub_itemId

    single_hub_item['id'] =  _raw_json[i].id
    single_hub_item['type'] =  _raw_json[i].type

    if (hub_orgId){
      single_hub_item['possible_esri_hosted_arcgis_server_url']   =  esri_hosted_arcgis_server_url
      single_hub_item['possible_esri_hosted_arcgis_server_url_1'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services1.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_2'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services2.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_3'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services3.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_4'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services4.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_5'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services5.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_6'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services6.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_7'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services7.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_8'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services8.arcgis.com')
      single_hub_item['possible_esri_hosted_arcgis_server_url_9'] =  esri_hosted_arcgis_server_url.replace('https://services.arcgis.com', 'https://services9.arcgis.com')
      
    } else {
      single_hub_item['possible_esri_hosted_arcgis_server_url']   =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_1'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_2'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_3'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_4'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_5'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_6'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_7'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_8'] =  ''
      single_hub_item['possible_esri_hosted_arcgis_server_url_9'] =  ''
    
    }//if

    single_hub_item['search_searchDescription'] =  hub_searchDescription
    single_hub_item['search_description'] =  hub_description

    refined_json.push(single_hub_item) 
  }//for

  //console.log('refined_json', refined_json)

  return refined_json
}
  
  
  
  
  
  
  
  
  
  



  
  
  
                  //   *******  search event related   *******   


                
                            function search_layer_now() {

                             


                              // first time search, need to build lunr index idx
                              if (! lunr_idx_ready_status){
                                        // ****** ****** ******   init lunr index  must immediately after input_current **************
                                                    // parameter:  [json array], index field, search field
                                                    // init_lunr_index('lunr_id', 'name' )
                                                    init_lunr_index()
                                        // ******  End  ********** init lunr index  must immediately after input_current **************

                                        lunr_idx_ready_status = true
                                }     
                                    
                                

                              // reset scroll position to 0, means top 
                              $("#json-renderer").scrollTop(0);


                              //turn on auto complete by uncomment here,
                                  // always clean last time auto-compelete data
                                 // autocomplete_search_instance.updateData({});

                          




                                 _filter_by = $('#filter_by').val().toLowerCase().trim();

                                
                                var _filter_by_array = _filter_by.split(" ");
                                
                                console.log('_filter_by  --->  ', _filter_by)
                                
                                update_url_parameter('filter_by', _filter_by);
                                
                                
                                
                                  if (_filter_by.length > 0) {  
                                 
                                
                                              $('#clear_search_result_button').show();


                                
                                      // ............. filter results  ....................
                                
                                          
                                                   _filtered_results = [];
                                                

                                                  var _filter_by_tailing= '';  // foo*   wildcard 
                                                  var _suggest_keyword = '';   // suggest keyword always is a single word, if multiple words present, always use last word
                                                  var _suggest_keyword_tailing = '';

                                                  var _idx_results = [];
                                                  var _idx_results_exact_match = [];     // exact match ('foo') with stemming
                                                  var _idx_results_tailing = [];  //  wildcard ('foo*') without stemming
                                
                                                  var _suggest_results = [];
                                                  var _suggest_results_exact_match = [];
                                                  var _suggest_results_tailing = [];





                                                          // ************ lunr.js *******************
                                                          
                                                          
                                                          
                                                              //https://github.com/olivernn/lunr.js/issues/344
                                                              // search 'city' and 'salt' and 'lake', must have all 3 words, should use "+city +salt +lake"
                                                          
                                                            if (_filter_by_array.length > 1) {

                                                                    // multiple keywords
                                                                
                                                                      _filter_by ='';
                                                                      _filter_by_tailing = '';

                                                                      for (var p = 0; p < _filter_by_array.length; ++p) {



                                                                        _filter_by += ' +' + _filter_by_array[p]   // search('+los +an')
                                                                        _filter_by_tailing =   _filter_by + '*';   // search('+los +an*')   only last word have wildcard


                                                                        //if multiple words present, always use last word
                                                                        _suggest_keyword = _filter_by_array[p];
                                                                        _suggest_keyword_tailing = _suggest_keyword
                                                                    
                                                                      }//for



                                                                        console.log('  ### multiple keywords  ###  exact match ',_filter_by)
                                                                        console.log('  ### multiple keywords  ###  wildcard tailing ',_filter_by_tailing)
                                                                
                                                            } else {



                                                                    

                                                                        // single keywords          
                                                                        // .search('foo*'), with wildcard will not stemming, so must add both exact match .search('foo') and  .search('foo*')  
                                                                        
                                                                        _filter_by_tailing =   _filter_by + '*';
                                                                        _suggest_keyword = _filter_by
                                                                        _suggest_keyword_tailing = _suggest_keyword + '*';
                                                                    

                                                                      console.log(' single keywords exact match ', _filter_by)
                                                                      console.log(' single keywords wildcard tailing ',_filter_by_tailing)


                                                            }
                                                          

                                                          
                                                            _idx_results_exact_match =idx.search(_filter_by)         // search('+los +an')
                                                            _idx_results_tailing = idx.search(_filter_by_tailing)    // search('+los +an*')   only last word have wildcard

                                                            // this will duplicate results by 2 times, some time exact match have results,but tailing have zero. sometimes, tailing have results, exact match have zero
                                                          // _idx_results =_idx_results_exact_match.concat(_idx_results_tailing)

                                                          if (_idx_results_exact_match.length > _idx_results_tailing.length){

                                                                      _idx_results =  _idx_results_exact_match


                                                          } else {

                                                                      _idx_results =  _idx_results_tailing

                                                          }
                                                          
                                                          console.log('_idx_results_exact_match  ***  ', _idx_results_exact_match)
                                                          console.log('_idx_results_tailing  ***  ', _idx_results_tailing)
                                                          console.log('_idx_results  ***  ', _idx_results)


                                                              
                                     /* uncomment this seciton to use :  auto suggest toggle on/off 

                                                      // ************** lunr suggest *******************      
                                                              
                                                                      // idx.tokenSet, get all token(stem keywords) in this index.  intersect with suggest keyword
                                                                            _suggest_results_exact_match = idx.tokenSet.intersect(lunr.TokenSet.fromString(_suggest_keyword)).toArray();
                                                                            _suggest_results_tailing  = idx.tokenSet.intersect(lunr.TokenSet.fromString(_suggest_keyword_tailing)).toArray();

                                                                          
                                                                      if (_suggest_results_exact_match.length > _suggest_results_tailing.length){

                                                                                  
                                                                                  _suggest_results = _suggest_results_exact_match 

                                                                      } else {

                                                                                _suggest_results =  _suggest_results_tailing 

                                                                      }

                                                                              console.log(' ^^^^^^ suggest results  exact match  ^^^^^^ ', _suggest_results_exact_match)
                                                                              console.log(' ^^^^^^  suggest results  tailing ^^^^^^ ',         _suggest_results_tailing)
                                                                              console.log(' ^^^^^^  suggest results  ^^^^^^ ',         _suggest_results)


                                                                  // suggest_results = ["zone", "zonnic"]
                                                                  // must convert to {"zone": null, "zonnic": null}  before feed to autocomplete
                                
                                                                  
                                                                  var feed_to_autocomplete = {}
                                                                  for (var s = 0; s < _suggest_results.length; s++) {
                                                                    feed_to_autocomplete[_suggest_results[s]] =  null;
                                                                  }
                                                                  console.log('feed_to_autocomplete', feed_to_autocomplete)



                                                                autocomplete_switch_status  = $("#autocomplete_switch").is(":checked");

                                                                if (autocomplete_switch_status){
                                                                    //turn on auto complete by uncomment here,
                                                                  // autocomplete_search_instance.updateData(feed_to_autocomplete);
                                                                } else {
                                                                  //turn on auto complete by uncomment here,
                                                                  // disable auto complete by update a empty {}
                                                                  //  autocomplete_search_instance.updateData({});
                                                                }
                        
                                                                    

                                                        // **************  end *************  lunr suggest *******************   

                                uncomment this seciton to use :  auto suggest toggle on/off     
                                 */



                                                                  

                                                              



                                                              for (var l = 0; l < _idx_results.length; ++l) {

                                                                  // console.log('_idx :  ', _idx_results[l].ref)
                                                                  
                                                                  
                                                                //Find an object in an array by one of its properties 
                                                                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
                                                                // const result = inventory.find( ({ lunr_id }) => lunr_id === 'xxxx' );
                                                                _filtered_results.push(input_current.find(({ lunr_id }) => lunr_id === _idx_results[l].ref) )

                                                              }


                                                          // ************ end  ************* lunr.js *******************
                                
                                
                                
                            
                                

                                                          show_current(_filtered_results, '_filtered_results')
                                
                                    

                                




                                        // ..........  End ... filter results base on _search_for  ....................          

                              
                                } else {
                                      
                                      // only if filter by empty keyword, re-render whole data set
                                      // same idea, but clear search result will also remove clear button, update url param etc....
                                     
                                      clear_search_result()
                                      
                                  }

                                  // fix bug, must init tooltips(), every time get new search result
                                  // $('.tooltipped').tooltip();

                        }





                        function clear_search_result(){
                            $('#clear_search_result_button').hide();
                            $('#filter_by').val('');
                            _search_data_content='';
                            update_url_parameter('filter_by','');
                            show_current(input_current, 'input_current')       
                        }



                            

                        function init_scrollable(){

                                                            
                          var back_to_top_button = $('#back_to_top_button');
                                          
                          $("#json-renderer").scroll(function() {

                            //console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                          // console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )
                          

                            if($("#json-renderer").scrollTop() > scroll_bottom_px ) {


                                  // console.log('--------------- close to bottom  --------------- ')
                                  // console.log(' scrollTop ####### ', $("#json-renderer").scrollTop() )
                                  //  console.log(' height ^^^^^^^^^^ ', $("#json-renderer").height() )

                                  
                                  

                                    switch(need_render_all) {


                                      case '_filtered_results':

                                              // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                              // only reset scroll to top when re-render new data.   
                                              // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                                
                                              rendering_json_to_html(_filtered_results)

                                              // must highlight key words
                                              highlight_keywords()

                                              need_render_all = '';
                                              break;


                                      case 'input_current':


                                            // do not scroll to top, this is not render new data, but is continuous scroll from short list (100) to all, 
                                            // only reset scroll to top when re-render new data.   
                                            // $("#json-renderer").scrollTop(0); //reset scroll position to 0
                                            rendering_json_to_html(input_current)


                                            // must highlight key words
                                            highlight_keywords()
                                            
                                            need_render_all = '';
                                            break;



                                      default:
                                        // nothing to render



                                    } // switch case


                                      
                                      back_to_top_button.addClass('show');

                            } else {

                                      back_to_top_button.removeClass('show');

                            }







                        });    //  .scroll()



                        back_to_top_button.on('click', function(e) {
                          e.preventDefault();
                          $("#json-renderer").animate({scrollTop:0}, scroll_bottom_px);
                        });



                        }




  

                        function show_current(_current_showing, _render_all_signal) {
                          // only show short list = 100, if more than limit, also mark  'need_render_all'  
                                                    
                                                                
                                      /**/
                                      // - - - - download json csv  - - - - 
                                      /**/

                                      ready_download_json = _current_showing
                                      /**/
                                      //  - - - -  end  - - - -  download json csv   - - - - 
                                      /**/


                         
                                                                                                                         
                                       current_filter_result_count = _current_showing.length
                                      
                                       //$('#counter_label').html( '<span class="orange-text">&nbsp;' + current_filter_result_count + "</span>" + ' / ' + '<span class="green-text">' + __total_item_count + "&nbsp;</span>");  
                                       display_count_info('', current_filter_result_count, __total_item_count, 'counter_label')
                                     
                                       rendering_json_to_html(_current_showing.slice(0,short_list_count))
              
                                       highlight_keywords()
                                                         
              
                                       // reset scroll position to 0, means top 
                                       $("#json-renderer").scrollTop(0);
              
                                       
                                       if (current_filter_result_count > short_list_count){
              
                                                 need_render_all = _render_all_signal
              
                                       } else {
              
                                                 need_render_all = ''
                                       }
              
              
              
              
              
              
                       }
              
                
              


                       function init_search_button_event_handler(){

                                    // click search
                                  // $('#start_search_button').click(search_layer_now) 


                                    // when user click 'x'  or  when user click 'enter' to 'search' , both will trigger 'on search' event. you can't tell which is which, both will fire this event.  https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
                                    $('#filter_by').on('search', search_layer_now);
                              
                                    $('#clear_search_result_button').hide();
                                    $('#clear_search_result_button').on('click',clear_search_result);

                                      // fire when user every stroke any key  
                                      $("#filter_by").on('keyup',search_layer_now);

                                      // only fire when text field loose focus,  not fire when stroke any key  
                                      // when use choose option from autocomplete dropdwon list, field will loose focus, will fire this change event
                                      // works, but use alternative way >>>>>  autocomplete_options.onAutocomplete:  search_layer_now  //Callback for when autocompleted.
                                      // $("#filter_by").change(search_layer_now);




                                        /**/
                                        // - - - - download json csv  - - - - 
                                        /**/
                                        $("#download_csv_button").on("click", function() {

                                                    /**/
                                                    //  --- papaparse   --- 
                                                    /**/
                                                    console.log('ready_download_json', ready_download_json)
                                                    json_for_csv = build_json_for_csv(ready_download_json)

                                                    console.log('json_for_csv', json_for_csv)
                                                    var final_csv_string = parse_json_to_csv_string(json_for_csv)

                                                    saveStringAsFile('filted_list.csv', final_csv_string)
                     
          
                                                   
                                                    /**/
                                                    //  --- end  ---  papaparse    --- 
                                                    /**/
                                        });

                                        

                                        $("#download_json_button").on("click", function() {
                                          console.log('ready_download_json', ready_download_json)
                                          json_for_csv = build_json_for_csv(ready_download_json)
                                          saveJsonAsFile('filted_list.json', json_for_csv)
                                        });
                                      /**/
                                      //  - - - -  end  - - - -  download json csv   - - - - 
                                      /**/




                        }



  //   *******   end  ******   search event related   *******
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
             
  
                    /**/
                    //  - - - org-id shortName    - - -
                    /**/
  

          // ======================== lunr.js ========================

                       
                    function inject_lunr_id(){
                                            

                      /*
                            [
                              
                              {

                                // will inject this field
                                  lunr_id: xxx 

               

                                  @type: "dcat:Dataset"
                                  accessLevel: "public"
                                  contactPoint: {@type: "vcard:Contact", fn: "lacounty_isd"}
                                  description: "<p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>Location Management System (LMS) is County of Los Angeles GIS Program to maintain a single, comprehensive geographic database of locations countywide.  The scope of this information is broad, including locations of services, points of interest, physical features, to name a few.  The goal is that maintenance of the information will be done by the jurisdiction (city, department, agency) that provides the service.</p><p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>A standard set of information about each location will be maintained and accessed by agencies and the public through all of the applications and maps that the County develops.</p>"
                                  distribution: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
                                  identifier: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118"
                                  issued: "2016-03-02T23:30:02.000Z"
                                  keyword: (3) ["Location Management System", "LMS", "Points of Interest"]
                                  landingPage: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118"
                                  license: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118/license.json"
                                  modified: "2018-05-15T14:25:10.000Z"
                                  publisher: {source: "County of Los Angeles"}
                                  spatial: "-143.049,23.3761,-75.063,46.7642"
                                  theme: ["geospatial"]
                                  title: "Private Non Retail Shipping Locations"
                              }, 

                              {},
                              {},
                              ...

                              {}
                            ]

                          */    

                          
                          for (p = 0; p < input_current.length; p++) {

                          
                            input_current[p].lunr_id = p.toString();  
                            

                          }



                    }
                  


                                        



                                        
                    function populate_lunr_index(){

                      lunr_index = []
                      var hub_item
                                        
                      for (var j = 0; j < input_current.length; ++j){

                        hub_item = input_current[j]
                                          
                        lunr_index.push({
                              lunr_id:    hub_item.lunr_id,   
                              name:     hub_item.attributes.name,


                                                      

                        /**/
                        //  - - - org-id shortName    - - -
                        /**/
                              id:       hub_item.id,
                              type:     hub_item.type,

                              hub_access:     hub_item.attributes.access,
                              hub_content:     hub_item.attributes.content,
                              hub_description:     hub_item.attributes.description,
                              hub_enrichCoverage:     hub_item.attributes.enrichCoverage,
                              //hub_enrichQuality:     hub_item.attributes.enrichQuality,
                              hub_hubType:     hub_item.attributes.hubType,
                              hub_id:     hub_item.attributes.id,
                              hub_itemId:     hub_item.attributes.itemId,
                              hub_layer:     hub_item.attributes.layer,
                              hub_layers:     hub_item.attributes.layers,

                              hub_name:     hub_item.attributes.name,
                              hub_orgId:     hub_item.attributes.orgId,
                              hub_orgName:     hub_item.attributes.orgName,
                              hub_organization:     hub_item.attributes.organization,
                              hub_orgContactEmail:     hub_item.attributes.orgContactEmail,
                              hub_owner:     hub_item.attributes.owner,
                              hub_region:     hub_item.attributes.region,
                              hub_searchDescription:     hub_item.attributes.searchDescription,
                              hub_server:     hub_item.attributes.server,
                              hub_siteUrl:     hub_item.attributes.siteUrl,
                              hub_slug:     hub_item.attributes.slug,
                              hub_source:     hub_item.attributes.source,
                              hub_sourceProvenance:     hub_item.attributes.sourceProvenance,
                              
                              hub_structuredLicense:     hub_item.attributes.structuredLicense,
                              hub_license:     hub_item.attributes.license,
                              hub_tags:     hub_item.attributes.tags,
                              hub_type:     hub_item.attributes.type,
                              hub_typeCategories:     hub_item.attributes.typeCategories,
                              hub_typeKeywords:     hub_item.attributes.typeKeywords,
                              hub_url:     hub_item.attributes.url,
                              hub_snippet:     hub_item.attributes.snippet,
                              hub_culture:     hub_item.attributes.culture,


                              links_self:      hub_item.self,
                              links_rawEs:     hub_item.rawEs,
                              links_itemPage:     hub_item.itemPage,
                              links_esriRest:     hub_item.esriRest,


                            /**/
                            //  - - - end   - - -  org-id shortName    - - -
                            /**/



                        })
                                            
                      }//for
                    }// lunr index
                                                    


                 



                    function init_lunr_index(){
                                            
                      
                          // enforce add lunr_id field
                          inject_lunr_id()
                                              
                          
                          console.log('enforce add lunr_id field ', input_current)


                          populate_lunr_index()

                        

                          console.log('lunr_index ......++++++ ', lunr_index)
                        

                        idx = lunr(function () {
                              
                            this.ref('lunr_id')

                            

                            /**/
                            //  - - - org-id shortName    - - -
                            /**/

                              // specify what field will be searching for, you can add more and more field here.
                              // only one search field
                              this.field('name')
                              this.field('id')
                              this.field('type')

                              this.field('hub_access')
                              this.field('hub_content')
                              this.field('hub_description')
                              this.field('hub_enrichCoverage')
                              this.field('hub_hubType')
                              this.field('hub_id')
                              this.field('hub_itemId')
                              this.field('hub_layer')
                              this.field('hub_layers')

                              this.field('hub_name')
                              this.field('hub_orgId')
                              this.field('hub_orgName')
                              this.field('hub_organization')
                              this.field('hub_orgContactEmail')
                              this.field('hub_owner')
                              this.field('hub_region')
                              this.field('hub_searchDescription')
                              this.field('hub_server')
                              this.field('hub_siteUrl')
                              this.field('hub_slug')
                              this.field('hub_source')
                              this.field('hub_sourceProvenance')
                              
                              this.field('hub_structuredLicense')
                              this.field('hub_license')
                              this.field('hub_tags')
                              this.field('hub_type')
                              this.field('hub_typeCategories')
                              this.field('hub_typeKeywords')
                              this.field('hub_url')
                              this.field('hub_snippet')
                              this.field('hub_culture')

                              this.field('links_self')
                              this.field('links_rawEs')
                              this.field('links_itemPage')
                              this.field('links_esriRest')


                            /**/
                            //  - - - end   - - -  org-id shortName    - - -
                            /**/


                           

                                    

                            lunr_index.forEach(function (doc) {
                                                                this.add(doc)
                                                              }, this)
                                                                                                
                        })
                                                                                              
                

                    }




          // =============== end   ============= lunr.js ========================


   /**/
   //  - - - end   - - -  org-id shortName    - - -
   /**/

  
  
  
  
  
  
  
  
  
  
  (async function($){
  
   
               
               // not get url parameters, because arcgisServerList do not need any url parameters.
               // but here only need to get "linktopath" etc.....
               init_global_var()
               
               //turn on auto complete by uncomment here,
               //init_autocomplete();

               init_search_button_event_handler();

               init_scrollable()




               if (localdomain == 1){

                in_use_domain_port_apache = localhost_domain_port_apache
              }

       
               if (file) {
                // file is from URL param file=xxx.zip

               } else {
                // default 
                file =  'opendata_v3_region_us_9972.zip';
                
                // test, add file=xxx.zip to url will use new file
                // http://localhost:10/json2tree/esri/hub/static/opendata.html?localdomain=1&file=hub_1_to_1k.zip&filter_by=hub_1_to_1k.zip
                //file =  'hub_1_to_1k.zip';     // 1k
                //file =  'hub_1_to_10k.zip';  //10k

               }

              _static_site_zip_uri = in_use_domain_port_apache + '/data/json2tree/' + file;   



              console.log('_static_site_zip_uri',  _static_site_zip_uri)
              show_loading_img_spinner('control_panel', 'ajax_getJson_processing', _static_site_zip_uri)




               
               //------------------- zip.js -----------------------------------
               
                 //https://stackoverflow.com/questions/57878862/how-to-include-huge-javascript-js-file-in-html/57878911#57878911
               
               
               
                  
                    
                    
                    zip.workerScriptsPath = "../js/lib/zipjs/";



                    //https://github.com/gildas-lormeau/zip.js/issues/93

                    zip.createReader(new zip.HttpReader(_static_site_zip_uri), 
                                                                               function(zipReader){
                                                                                                    
                                                                                   
                                                                   zipReader.getEntries(function(entries){
                                                                       if (entries.length) {

                                                                            // get first entry content as text
                                                                            entries[0].getData(new zip.TextWriter(), function(text) {
                                                                              // text contains the entry data as a String
                                                                             // console.log(text);
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                               //..........load into json-viewer,  unzipped text is string .........
                                                                               
                                                                               
                                                                               
                                                                                        // do not reduce json size.
                                                                                        input_current = JSON.parse(text);
                                                                                        console.log('input_current >>> ', input_current)     
                                                                                         
                                                                                        
                                                                                        __total_item_count = input_current.length;
              
              
                                                                                       
                                                                                       // first time load all  
                                                                                       clear_search_result()



                                                                                      
                                                                                        
                                                                                          filter_result_by_filter_by()
                                                                                        
                                                                                      
                                                                                        remove_loading_img_spinner('ajax_getJson_processing');  
                                                                                         $(".progress").hide(); 
                
                                                                                //.......... End ....... load into json-viewer,  unzipped text is string .........
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             
                                                                             

                                                                              // close the zip reader
                                                                              zipReader.close(function() {
                                                                                // onclose callback
                                                                              });

                                                                            }, function(current, total) {
                                                                              // onprogress callback
                                                                              
                                                                               // console.log('current-', current)
                                                                               //  console.log('total-', total)
                                                                            });
                                                                          }
                                                                        });
                                                                      }, function(zipreader_error) {
                                                                        // onerror callback
                                                                        console.log('zipreader_error --->',zipreader_error)
                                                                      });
               
               
               
               
               
               //------------------- End ---------------  zip.js -----------------------------------
               
               
               
  
})(jQuery);
