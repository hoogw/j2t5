



var ___layer___id = ''      // 7
var ___layer___name  = ''   // Zone_Merge

var ___layer___id2 = ''      // 7
var ___layer___name2  = ''   // Zone_Merge


var ___mapserver___url  = ''// https://gis.la-quinta.org/arcgis/rest/services/Planning/zoning/MapServer
var _arcgis_layer_url  = '' // https://gis.la-quinta.org/arcgis/rest/services/Planning/zoning/MapServer/7
var _u_r_l_  = ''


var ___mapserver___url2  = ''// https://gis.la-quinta.org/arcgis/rest/services/Planning/zoning/MapServer
var _arcgis_layer_url2  = '' // https://gis.la-quinta.org/arcgis/rest/services/Planning/zoning/MapServer/7
var _u_r_l_2  = ''




// only for double layer
var double_layer_google_base_url = 'https://transparentgov.net:3200/googlemaps14/default?'


// only for geocode
var geocode_google_base_url = 'https://transparentgov.net:3200/googlemaps26/default?'


// only for raster+feature layer
var raster_feature_layer_unclassified_searchable_google_base_url = 'https://transparentgov.net:3200/googlemaps15/default?'
var raster_feature_layer_classified_unsearchable_google_base_url = 'https://transparentgov.net:3200/googlemaps16/default?'




 var googlemaps_base_url = 'https://transparentgov.net:3200/googlemaps/default?'
 var bingmaps_base_url = 'https://transparentgov.net:3200/bingmaps/default?'
 var mapbox_base_url = 'https://transparentgov.net:3200/mapbox/default?'



 var esri3d_base_url = 'https://transparentgov.net/json2tree/arcgis/featurelayer/featurelayer.html?' 
 var esri2d_base_url = 'https://transparentgov.net/json2tree/arcgis/featurelayer/featurelayer_popup.html?' 




 //http://localhost:10/mapserver1/viewer/?config=viewer_simple2&url=https://gis.la-quinta.org/arcgis/rest/services/TrackIt/TRACKiT_Data/MapServer/11&title=SOI&zoom=17&lat=33.6634&long=-116.31
 var esri_classic_base_url = 'https://transparentgov.net/mapserver1/viewer/?config=viewer_simple2&' 


 

 
 //https://localhost:3200/arcgis/featuretable/default?cross=default&layer_id=11&layer=SOI&url=https://gis.la-quinta.org/arcgis/rest/services/TrackIt/TRACKiT_Data/MapServer
 var attributetable_base_url = 'https://transparentgov.net:3200/arcgis/featuretable/default?cross=default&'

 // http://localhost:10/json2tree/arcgis/js3/featureTable.html?&layer_id=0&layer=Sphere%20of%20Influence%20and%20Planning%20Area&url=https://gis.la-quinta.org/arcgis/rest/services/Planning/zoning/MapServer
 var attributetable_esri_grid_base_url = 'https://transparentgov.net/json2tree/arcgis/js3/featureTable.html?&'




// Check if a JavaScript string is a URL   https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }