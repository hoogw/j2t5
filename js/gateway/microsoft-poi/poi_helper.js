


var _total_poi = 0
var _all_poi_flat_array = []
var _all_poi_uniqueID_array = []
var _this_result_array = []

//  . . efficient core newOnly  . - .
var _this_newOnly_result_array = []
var _this_newOnly_poi_geojson


var _uniqueID

var microsoft_poi_geojson
var poi_geojson 
var _last_geojson_POI;
var _current_geojson_POI;


var traffic_control_handler
var traffic_legend_control_handler




var latitude_distance
var longitude_distance










function setLimit_onNearbyCircleRadius(){

    if (_center_radius_in_meter > max_microsoft_poi_radius_meter){
        _center_radius_in_meter = max_microsoft_poi_radius_meter
    }
    console.log('microsoft nearby limit 50k _center_radius_in_meter',  _center_radius_in_meter)
    //only for single auto version
    $('#radius_div').html('<span style="font-size:12.7px">Circle Radius: ' + _center_radius_in_meter + '  meters</span>');
    //only for multiple manual  version
    $('#manual_radius_div').html('<span style="font-size:12.7px">Max radius: <span style="font-size:16.6px; font-weight:800">' + _center_radius_in_meter + '</span>  meters (otherwise circle expand beyond current map view) </span>');

}


        
// used by both search-poi and nearby-poi, difference is search-poi does not limit radius, while nearby-poi does limit radius max 50k
function get_center_radius_in_map_bound(){

  // must keep here, to get NW SW SW SE
  get_map_bound()

 //calculate 2 position distance https://learn.microsoft.com/en-us/javascript/api/azure-maps-control/atlas.math?view=azure-maps-typescript-latest
  var vertical_distance   = atlas.math.getDistanceTo(NW, SW, "meters") 
  var horizontal_distance = atlas.math.getDistanceTo(SW, SE, "meters")

  console.log("vertical_distance in meter", vertical_distance)
  console.log("horizontal_distance in meter", horizontal_distance)

  var min_radius
  if (vertical_distance <= horizontal_distance){
    min_radius = Math.floor(vertical_distance / 2)
  } else {
    min_radius = Math.floor(horizontal_distance / 2)
  }


  // microsoft SearchPOI does not limit radius, but searchNearBy limit to 50k
  // If the specified value is too large, a AREA_TOO_LARGE error may be returned. The max value is 40,000 meters (about 25 miles).
  if (min_radius > max_microsoft_poi_radius_meter){
            min_radius = max_microsoft_poi_radius_meter
  }

  console.log("min_radius in meter", min_radius)
  return min_radius
}




/**/
// --   --  --  search address only  --   --  --  

// sample https://github.com/Azure-Samples/AzureMapsCodeSamples/blob/main/Samples/REST%20Services/Search%20Autosuggest%20and%20JQuery%20UI/Search%20Autosuggest%20and%20JQuery%20UI.html

// Note that the typeahead parameter is set to true.
var geocodeServiceUrlTemplate = 'https://{azMapsDomain}/search/{searchType}/json?typeahead=true&api-version=1.0&query={query}&language={language}&lon={lon}&lat={lat}&countrySet={countrySet}&view=Auto';

function searchAddressOnly(){


  
   //Create a jQuery autocomplete UI widget.
   $("#search-address-input").autocomplete({
       minLength: 3,   //Don't ask for suggestions until atleast 3 characters have been typed. This will reduce costs by not making requests that will likely not have much relevance.
       source: function (request, response) {
           var center = map.getCamera().center;

           //var elm = document.getElementById('countrySelector');
           var countryIso = 'US';  //elm.options[elm.selectedIndex].value;

           //Create a URL to the Azure Maps search service to perform the search.
           var requestUrl = geocodeServiceUrlTemplate.replace('{query}', encodeURIComponent(request.term))
               //.replace('{searchType}', document.querySelector('input[name="searchTypeGroup"]:checked').value)
               .replace('{searchType}', 'address')
               .replace('{language}', 'en-US')
               .replace('{lon}', center[0])    //Use a lat and lon value of the center the map to bais the results to the current map view.
               .replace('{lat}', center[1])
               .replace('{countrySet}', countryIso); //A comma seperated string of country codes to limit the suggestions to.

           processRequest(requestUrl).then(data => {
               response(data.results);
           });
       },
       select: function (event, ui) {
           //Remove any previous added data from the map.
           datasource.clear();

           console.log('search address results point ', ui )

           //Create a point feature to mark the selected location.
           var _search_address_result_point = new atlas.data.Point([ui.item.position.lon, ui.item.position.lat])
           var _search_address_result_feature = new atlas.data.Feature(_search_address_result_point, ui.item.address, 1 )
           
           console.log('search address results feature ', _search_address_result_feature )

           datasource.add(_search_address_result_feature);

           //Zoom the map into the selected location.
           map.setCamera({
               bounds: [
                   ui.item.viewport.topLeftPoint.lon, ui.item.viewport.btmRightPoint.lat,
                   ui.item.viewport.btmRightPoint.lon, ui.item.viewport.topLeftPoint.lat
               ],
               padding: 30
           });
       }
   }).autocomplete("instance")._renderItem = function (ul, item) {
       //Format the displayed suggestion to show the formatted suggestion string.
       var suggestionLabel = item.address.freeformAddress;

       if (item.poi && item.poi.name) {
           suggestionLabel = item.poi.name + ' (' + suggestionLabel + ')';
       }

       return $("<li>")
           .append("<a>" + suggestionLabel + "</a>")
           .appendTo(ul);
   };



}




// --  end  --  --  search address only  --   --  -- 
/**/














/**/
//  --- microsoft manual drawing circle   --- 
/**/
    var this_circle_total
    var all_circle_total = 0

   
    var all_circle_geojson = {} // circle number as key,  1: {}, 2: {} 
    var merged_geojson
    var duplicated_point_count = 0

/**/
//  --- end  ---  microsoft manual drawing circle    --- 
/**/











/**/
//  --- microsoft circle 4x4 16x16 auto --- 
/**/

       var _auto_grid_side
       var _16circle_radius

       var _4circle_radius

       var center_point

       var quater_NW
       var quater_NW1
       var quater_NW2
       var quater_NW3
       var quater_NW4

       var quater_NW_point
       var quater_NW1_point
       var quater_NW2_point
       var quater_NW3_point
       var quater_NW4_point
      
       var quater_NE
       var quater_NE1
       var quater_NE2
       var quater_NE3
       var quater_NE4

       var quater_NE_point
       var quater_NE1_point
       var quater_NE2_point
       var quater_NE3_point
       var quater_NE4_point
      
       var quater_SW
       var quater_SW1
       var quater_SW2
       var quater_SW3
       var quater_SW4

       var quater_SW_point
       var quater_SW1_point
       var quater_SW2_point
       var quater_SW3_point
       var quater_SW4_point
      
       var quater_SE
       var quater_SE1
       var quater_SE2
       var quater_SE3
       var quater_SE4

       var quater_SE_point
       var quater_SE1_point
       var quater_SE2_point
       var quater_SE3_point
       var quater_SE4_point
      
        
    function get_4circle_radiusCenter(_radiusMeter, _centerLng, _centerLat){

     

      // Calculate sides of a right angle triangle with JavaScript
      //_4circle_radius = (Math.sqrt(_center_radius_in_meter **2 + _center_radius_in_meter **2)) / 2
      _4circle_radius = (Math.sqrt(_radiusMeter **2 + _radiusMeter **2)) / 2
      // smaller circle
      //_4circle_radius = (Math.sqrt(_center_radius_in_meter **2 + _center_radius_in_meter **2)) / 4
      //_4circle_radius = (Math.sqrt(_radiusMeter **2 + _radiusMeter **2)) / 4

      console.log('radius quater 4x4 : ', _4circle_radius )
      $('#radius_div').html('<span style="font-size:12.7px">Quater 4x4 Circle Radius: ' + _4circle_radius + '  meters</span>');

      center_point = new atlas.data.Position(_centerLng, _centerLat)

      // A heading angle between 0 - 360 degrees. 0 - North, 90 - East, 180 - South, 270 - West.
      quater_NW = atlas.math.getDestination(center_point, 315, _4circle_radius, "meters") 
      quater_NE = atlas.math.getDestination(center_point, 45, _4circle_radius, "meters") 
      quater_SE = atlas.math.getDestination(center_point, 135, _4circle_radius, "meters") 
      quater_SW = atlas.math.getDestination(center_point, 225, _4circle_radius, "meters") 

      console.log('quater_NW : ', quater_NW )
      console.log('quater_NE : ', quater_NE )
      console.log('quater_SE : ', quater_SE )
      console.log('quater_SW : ', quater_SW )

      quater_NW_point = new atlas.data.Point(quater_NW)
      quater_NE_point = new atlas.data.Point(quater_NE)
      quater_SE_point = new atlas.data.Point(quater_SE)
      quater_SW_point = new atlas.data.Point(quater_SW)
    }



     function get_16circle_radiusCenter(_radiusMeter, _centerLng, _centerLat){

     

      // Calculate sides of a right angle triangle with JavaScript
      //_4circle_radius = (Math.sqrt(_center_radius_in_meter **2 + _center_radius_in_meter **2)) / 2
      _4circle_radius = (Math.sqrt(_radiusMeter **2 + _radiusMeter **2)) / 2
      // smaller circle
      //_4circle_radius = (Math.sqrt(_center_radius_in_meter **2 + _center_radius_in_meter **2)) / 4
      //_4circle_radius = (Math.sqrt(_radiusMeter **2 + _radiusMeter **2)) / 4

      _16circle_radius = _4circle_radius / 2

      console.log('radius quater 16x16 : ', _16circle_radius )
      $('#radius_div').html('<span style="font-size:12.7px">Quater 16x16 Circle Radius: ' + _16circle_radius + '  meters</span>');

      center_point = new atlas.data.Position(_centerLng, _centerLat)

      // A heading angle between 0 - 360 degrees. 0 - North, 90 - East, 180 - South, 270 - West.
      quater_NW = atlas.math.getDestination(center_point, 315, _4circle_radius, "meters") 
      quater_NW_point = new atlas.data.Point(quater_NW)
      console.log('quater_NW : ', quater_NW )
      quater_NW1 = atlas.math.getDestination(quater_NW_point, 315, _16circle_radius, "meters") 
      quater_NW1_point = new atlas.data.Point(quater_NW1)
      quater_NW2 = atlas.math.getDestination(quater_NW_point, 45, _16circle_radius, "meters") 
      quater_NW2_point = new atlas.data.Point(quater_NW2)
      quater_NW3 = atlas.math.getDestination(quater_NW_point, 135, _16circle_radius, "meters") 
      quater_NW3_point = new atlas.data.Point(quater_NW3)
      quater_NW4 = atlas.math.getDestination(quater_NW_point, 225, _16circle_radius, "meters") 
      quater_NW4_point = new atlas.data.Point(quater_NW4)



      quater_NE = atlas.math.getDestination(center_point, 45, _4circle_radius, "meters") 
      quater_NE_point = new atlas.data.Point(quater_NE)
      console.log('quater_NE : ', quater_NE )
      quater_NE1 = atlas.math.getDestination(quater_NE_point, 315, _16circle_radius, "meters") 
      quater_NE1_point = new atlas.data.Point(quater_NE1)
      quater_NE2 = atlas.math.getDestination(quater_NE_point, 45, _16circle_radius, "meters") 
      quater_NE2_point = new atlas.data.Point(quater_NE2)
      quater_NE3 = atlas.math.getDestination(quater_NE_point, 135, _16circle_radius, "meters") 
      quater_NE3_point = new atlas.data.Point(quater_NE3)
      quater_NE4 = atlas.math.getDestination(quater_NE_point, 225, _16circle_radius, "meters") 
      quater_NE4_point = new atlas.data.Point(quater_NE4)




      quater_SE = atlas.math.getDestination(center_point, 135, _4circle_radius, "meters") 
      quater_SE_point = new atlas.data.Point(quater_SE)
      console.log('quater_SE : ', quater_SE )
      quater_SE1 = atlas.math.getDestination(quater_SE_point, 315, _16circle_radius, "meters") 
      quater_SE1_point = new atlas.data.Point(quater_SE1)
      quater_SE2 = atlas.math.getDestination(quater_SE_point, 45, _16circle_radius, "meters") 
      quater_SE2_point = new atlas.data.Point(quater_SE2)
      quater_SE3 = atlas.math.getDestination(quater_SE_point, 135, _16circle_radius, "meters") 
      quater_SE3_point = new atlas.data.Point(quater_SE3)
      quater_SE4 = atlas.math.getDestination(quater_SE_point, 225, _16circle_radius, "meters") 
      quater_SE4_point = new atlas.data.Point(quater_SE4)


      quater_SW = atlas.math.getDestination(center_point, 225, _4circle_radius, "meters") 
      quater_SW_point = new atlas.data.Point(quater_SW)
      console.log('quater_SW : ', quater_SW )
      quater_SW1 = atlas.math.getDestination(quater_SW_point, 315, _16circle_radius, "meters") 
      quater_SW1_point = new atlas.data.Point(quater_SW1)
      quater_SW2 = atlas.math.getDestination(quater_SW_point, 45, _16circle_radius, "meters") 
      quater_SW2_point = new atlas.data.Point(quater_SW2)
      quater_SW3 = atlas.math.getDestination(quater_SW_point, 135, _16circle_radius, "meters") 
      quater_SW3_point = new atlas.data.Point(quater_SW3)
      quater_SW4 = atlas.math.getDestination(quater_SW_point, 225, _16circle_radius, "meters") 
      quater_SW4_point = new atlas.data.Point(quater_SW4)

      
      
      
      
    }




    var grid_center_array = [] // for all 
    var grid_firstColumnCenterArray = []
    function calculate_grid_center(_radiusMeter){


      // must initialize as empty array
      grid_center_array = [] // for all 
      grid_firstColumnCenterArray = []


      _auto_grid_side = _radiusMeter * Math.sqrt(2);
      console.log('_auto_grid_side', _auto_grid_side, _radiusMeter)

      
      var NW_point = new atlas.data.Point(new atlas.data.Position(selected_bounds_west, selected_bounds_north))
      console.log('NW_point', NW_point)
      
      // 0,0
      var new_grid_center_point = new atlas.data.Point(atlas.math.getDestination(NW_point, 135, _radiusMeter, "meters"))
      var new_grid_center_lng = new_grid_center_point.coordinates[0]
      var new_grid_center_lat = new_grid_center_point.coordinates[1]
      grid_center_array.push(new_grid_center_point)
      grid_firstColumnCenterArray.push(new_grid_center_point)

     
      // get first column center only 
      while (new_grid_center_lat > selected_bounds_south) {
         new_grid_center_point = new atlas.data.Point(atlas.math.getDestination(new_grid_center_point, 180, _auto_grid_side, "meters"))
         new_grid_center_lng = new_grid_center_point.coordinates[0]
         new_grid_center_lat = new_grid_center_point.coordinates[1]
         grid_center_array.push(new_grid_center_point)
         grid_firstColumnCenterArray.push(new_grid_center_point)
      }// while


     
      for (let i = 0; i < (grid_firstColumnCenterArray.length); i++) {

        new_grid_center_point = grid_firstColumnCenterArray[i]
        new_grid_center_lng = new_grid_center_point.coordinates[0]
        new_grid_center_lat = new_grid_center_point.coordinates[1]

        while (new_grid_center_lng < selected_bounds_east) {
         new_grid_center_point = new atlas.data.Point(atlas.math.getDestination(new_grid_center_point, 90, _auto_grid_side, "meters"))
         new_grid_center_lng = new_grid_center_point.coordinates[0]
         new_grid_center_lat = new_grid_center_point.coordinates[1]
         grid_center_array.push(new_grid_center_point)
        }// while

      }//for

      console.log('grid_firstColumnCenterArray', grid_firstColumnCenterArray)
      console.log('grid_center_array', grid_center_array)
    
    }



    function draw_circle_on_grid(_radiusMeter){ // microsoft only

       for (let i = 0; i < grid_center_array.length; i++) {
          if (circle_datasource){
            //console.log('draw circle', grid_center_array[i], current_circle_radius)
            //Create a circle from a Point feature by providing it a subType property set to "Circle" and radius property.
            circle_datasource.add(new atlas.data.Feature(grid_center_array[i], {
                            subType: "Circle",
                            radius: _radiusMeter
            }));
          }//if
       }//for

    }


    

/**/
//  --- end  ---  microsoft circle 4x4 16x16 auto --- 
/**/





// only for pipeline class, not for ajax http call
function splitAddressMicrosoft(_raw_poi_geojson){

  var formatedGeojson

  var poi_id
  var poi_name
  var poi_name2
  var poi_phone
  var poi_url
  var poi_open
  
        var poi_address
        var poi_streetNumber
        var poi_streetName
        var poi_streetNameAbre
        
        var streetName_component = []
        var poi_streetPrefix
        var poi_streetNameOnly
        var poi_streetType
        
        var poi_city
        var poi_county
        var poi_state
        var poi_stateAbre
        var poi_zipCode
        var poi_country

        var poi_primaryType
        var poi_type



  
  var feature = {}
  var features_array
  var _raw_features_array = _raw_poi_geojson.features
  var formated_features_array = []
  console.log(' raw features array ', _raw_features_array);

  for (let i = 0; i < _raw_features_array.length; i++) {
     
    feature = {}

    //console.log(' this raw feature ', _raw_features_array[i]);
    feature.type = _raw_features_array[i].type
    feature.geometry = _raw_features_array[i].geometry


    
    poi_address = _raw_features_array[i].properties.address.freeformAddress
    poi_streetNumber = _raw_features_array[i].properties.address.streetNumber



    
    poi_streetName = _raw_features_array[i].properties.address.streetName
    
    //  . . . street name need to further split  . . . 
    // api https://github.com/hassansin/parse-address
    streetName_component =  parseAddress.parseLocation(poi_streetName);
    
    //console.log(' parse street name only  ', poi_streetName,  streetName_component);
    
    if ((streetName_component) && (streetName_component.hasOwnProperty('prefix'))){
      poi_streetPrefix = streetName_component.prefix.toUpperCase();
    } else {
      poi_streetPrefix = ''
    }
    
    if ((streetName_component) && (streetName_component.hasOwnProperty('street'))){
      poi_streetNameOnly = streetName_component.street.toUpperCase();
    } else {
      poi_streetNameOnly = ''
    }
    
    if ((streetName_component) && (streetName_component.hasOwnProperty('type'))){
      poi_streetType = streetName_component.type.toUpperCase();
    } else {
      poi_streetType = ''
    }
    // . . .  end  . . .  street name need to further split




    poi_city = _raw_features_array[i].properties.address.localName.toUpperCase();
    poi_state = _raw_features_array[i].properties.address.countrySubdivisionCode
    poi_zipCode = _raw_features_array[i].properties.address.postalCode

    // both works the same way
    //poi_id = _raw_features_array[i].id
    poi_id = _raw_features_array[i].properties.id

    poi_name = _raw_features_array[i].properties.poi.name
    
          // - - motorola requirement  - - 
          // 1) remove special char by space
          //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
          poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
          // 2) truncate max length 60 char
          poi_name = poi_name.substring(0, 60);
          //  - -  end - - motorola requirement  - - 

    poi_phone = _raw_features_array[i].properties.poi.phone
    poi_url = _raw_features_array[i].properties.poi.url

    feature.properties = {
      
      // shp shape file, field name max 8, so use abrev as possible
      // but only poi_id keep, it is unique id, use later
      "poi_id": poi_id,
      "name": poi_name, 
      
      "phone": poi_phone,
      "url": poi_url, 
      
      "stNo" :  poi_streetNumber,

          
    //  . . . street name need to further split  . . . 
      "strName": poi_streetName,
      "stPrefix" : poi_streetPrefix,
      "stName" : poi_streetNameOnly,
      "stType" : poi_streetType,
      // . . .  end  . . .  street name need to further split



     
      
      "city": poi_city,
      "state": poi_state,
      "zipCode": poi_zipCode,

      "address": poi_address,

    }

    formated_features_array.push(feature)


  }//for

  var formatedGeojson = {
      "type": "FeatureCollection",
      "features": formated_features_array
  };




  return formatedGeojson
}






  
function show_info_outline_Tab_nonPOI(___properties){
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
  
}
  
function show_info_outline_Tab(___properties){
  $('#info-window-div').html(poi_viewer_for_download(___properties))
  
}


function empty_info_outline_Tab(){
  $('#info-window-div').html("")
}





function poi_viewer_for_download(___properties){

  //in use, customized properties ,  only for side info window, 
  var poi_other_html = ''
  poi_other_html    +=      '<span style="font-size:22.2px; font-weight:900;">' + ___properties.name + '</span>' + '&nbsp;&nbsp;'

  if (___properties.phone){
    poi_other_html    +=      '<span style="font-size:16.3px;">' + ___properties.phone + '</span>' + '&nbsp;&nbsp;'
  }

  if (___properties.address){
    poi_other_html    +=      '<span style="font-size:13.3px;">' + ___properties.address + '</span>' + '&nbsp;&nbsp;'
  }

  // hide poi id
  //poi_other_html    +=      '<span style="font-size:7.3px;">' + ___properties.poi_id + '</span>' + '&nbsp;&nbsp;'

  if (___properties.url){
    poi_other_html    +=      '<a href="' + ___properties.url + '" target="_blank">' + ___properties.url + '</a>' + '&nbsp;&nbsp;'
  }
  
 
  //poi_other_html    +=      '<span style="font-size:11.3px;">reviews(' + ___properties.poi_reviews + ')</span>' + '&nbsp;&nbsp;'
  //poi_other_html    +=      '<span style="font-size:8.3px;">' + ___properties.poi_photos + '</span>' + '&nbsp;&nbsp;'

        poi_other_html    +=      '<span style="font-size:12.2px;">primaryType(' + ___properties.primaryType + ')</span>' + '&nbsp;&nbsp;'
        //poi_other_html    +=    '<span style="font-size:10.2px;">types(' + ___properties.type + ')</span>' + '&nbsp;&nbsp;'
  return  poi_other_html 
   
}




// only for direct http ajax 
function splitAddressMicrosoft_REST_API(_raw_features_array){

    var formatedGeojson

  var poi_id
  var poi_name
  var poi_name2
  var poi_phone
  var poi_url
  var poi_open
  
        var poi_address
        var poi_streetNumber
        var poi_streetName
        var poi_streetNameAbre
        
        var streetName_component = []
        var poi_streetPrefix
        var poi_streetNameOnly
        var poi_streetType
        
        var poi_city
        var poi_county
        var poi_state
        var poi_stateAbre
        var poi_zipCode
        var poi_country

        var poi_primaryType
        var poi_type



  
  var feature = {}
  var features_array
  
  var formated_features_array = []
  console.log(' raw features array ', _raw_features_array);



    for (let p = 0; p < _raw_features_array.length; p++) {

       feature = {}

       //console.log(' this raw feature ', _raw_features_array[p]);
       feature.type = 'Feature'
       feature.geometry = {
        "type": "Point",
        "coordinates": [
          _raw_features_array[p].position.lon,
          _raw_features_array[p].position.lat,
        ]
      }



      poi_address = _raw_features_array[p].address.freeformAddress,
      poi_streetNumber = _raw_features_array[p].address.streetNumber,
      poi_streetName = _raw_features_array[p].address.streetName

      //  . . . street name need to further split  . . . 
          // api https://github.com/hassansin/parse-address
          streetName_component =  parseAddress.parseLocation(poi_streetName);
          
          //console.log(' parse street name only  ', poi_streetName,  streetName_component);
          
          if ((streetName_component) && (streetName_component.hasOwnProperty('prefix'))){
            poi_streetPrefix = streetName_component.prefix.toUpperCase();
          } else {
            poi_streetPrefix = ''
          }
          
          if ((streetName_component) && (streetName_component.hasOwnProperty('street'))){
            poi_streetNameOnly = streetName_component.street.toUpperCase();
          } else {
            poi_streetNameOnly = ''
          }
          
          if ((streetName_component) && (streetName_component.hasOwnProperty('type'))){
            poi_streetType = streetName_component.type.toUpperCase();
          } else {
            poi_streetType = ''
          }
      // . . .  end  . . .  street name need to further split



      
    poi_city = _raw_features_array[p].address.localName.toUpperCase();
    poi_state = _raw_features_array[p].address.countrySubdivisionCode
    poi_zipCode = _raw_features_array[p].address.postalCode

    // both works the same way
    //poi_id = _raw_features_array[i].id
    poi_id = _raw_features_array[p].id

    poi_name = _raw_features_array[p].poi.name


    // - - motorola requirement  - - 
          // 1) remove special char by space
          //The regular expression /[^a-zA-Z0-9\s]/g matches any character that is NOT an alphabet (a-z, A-Z), a number (0-9), or a whitespace character
          poi_name = poi_name.replace(/[^a-zA-Z0-9\s]/g, ' ');
          // 2) truncate max length 60 char
          poi_name = poi_name.substring(0, 60);
    //  - -  end - - motorola requirement  - - 

    poi_phone = _raw_features_array[p].poi.phone
    poi_url = _raw_features_array[p].poi.url


    poi_primaryType = _raw_features_array[p].poi.categories[0]
    poi_type = _raw_features_array[p].poi.categories[1]

      feature.properties = {
      
      // shp shape file, field name max 8, so use abrev as possible
      // but only poi_id keep, it is unique id, use later
      "poi_id": poi_id,
      "name": poi_name, 
      
      "phone": poi_phone,
      "url": poi_url, 
      
      "stNo" :  poi_streetNumber,

          
    //  . . . street name need to further split  . . . 
      "strName": poi_streetName,
      "stPrefix" : poi_streetPrefix,
      "stName" : poi_streetNameOnly,
      "stType" : poi_streetType,
      // . . .  end  . . .  street name need to further split



     
      
      "city": poi_city,
      "state": poi_state,
      "zipCode": poi_zipCode,

      "address": poi_address,

      "primaryType":poi_primaryType,
      "type":poi_type,

    }

    formated_features_array.push(feature)


  }//for

  var formatedGeojson = {
      "type": "FeatureCollection",
      "features": formated_features_array
  };


 console.log('formatedGeojson', formatedGeojson)

  return formatedGeojson

}


















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
             






           function init_user_interface_before_microsoft_map_load(){


                        
            /**/
            //  -  -  - category  -  -  - 
            /**/

            // 1st time, one time run
            if (_category_string){
              $("#category-input").val(_category_string)
              console.log("1st time, one time run, set poi category search", _category_string)
            }
             
            // do not use, cause unwanted click-refresh, close-dev-tool
            //$("#category-input").on('keyup', update_poi_cat_content);
           


            /**/
            //  -  -  - end  -  -  -  category    -  -  - 
            /**/



                 
            
            /**/
            //  -  -  - search poi keyword  -  -  - 
            /**/

            // 1st time, one time run
            if (search_poi_keyword){
            $("#search_poi_input").val(search_poi_keyword)
                console.log("1st time, one time run, set poi keyword search", search_poi_keyword)
            }

            // do not use, cause unwanted click-refresh, close-dev-tool
            //$("#search_poi_input").on('keyup', update_poi_keyword_content);

            /**/
            //  -  -  - end  -  -  -  search poi keyword    -  -  - 
            /**/






            /**/
            //  - - - download csv  - - - 
            /**/

                $("#download_csv_button").on("click", function() {

                    json_for_csv = geojson_to_csvReadyJsonArray(poi_geojson)
                    
                    /**/
                    //  --- papaparse   --- 
                    /**/
                    var final_csv_string = parse_json_to_csv_string(json_for_csv)
                    /**/
                    //  --- end  ---  papaparse    --- 
                    /**/

                    saveStringAsFile('poi.csv', final_csv_string)

                });
            /**/
            //  - - -  end  - - -   download csv    - - - 
            /**/



            /**/
            // - - - - download poi  - - - - 
            /**/
              $("#download_poi_button").on("click", function() {
                  saveJsonAsFile('poi.geojson',  poi_geojson);
              });
            /**/
            //  - - - -  end  - - - -  download poi   - - - - 
            /**/
        




           }


           /*
          // do not use, cause unwanted click-refresh, close-dev-tool
          function update_poi_keyword_content(){
            search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('search_poi_keyword --->  ', search_poi_keyword)
            update_url_parameter('poi', search_poi_keyword);
          }

          function update_poi_cat_content(){
            _category_string = $('#category-input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
            console.log('_category_string --->  ', _category_string)
            update_url_parameter("poicategory",_category_string)
          }
            */






        // without basemap version 
        function load_microsoft_map(_key) {


           console.log('load microsoft map with key ', _key)



           


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
                    subscriptionKey: _key, 
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
                //  --- microsoft circle     (without basemap version)  --- 
                /**/

                    //  (without basemap version) cirlce data source layer can be before or after search layer
                    init_circle_dataSource()

                   /**/
                    //  --- Microsoft feature layer   --- 
                    /**/

                    // must keep searchlayer datasource, it was used by search address, can be used for other future purpose
                    add_dataSource_searchLayer()

                    add_dataSource_geojson_layer()

                     // first time 1 time, must after init circle data source function
                     moveend_handler()

                    /**/
                    //  --- end  ---  Microsoft feature layer    --- 
                    /**/

                    
                                
                /**/
                //  --- end  ---  microsoft circle    (without basemap version)  --- 
                /**/

                                


                

                /**/
                // --   --  --  search address only  --   --  --  
                searchAddressOnly()
                // --  end  --  --  search address only  --   --  -- 
                /**/



            // without basemap version 
            init_user_interface_after_microsoft_map_load()

                
                

                                 //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
                                 if (need_pan_to_real_location) {
                                    pan_to_real_location();
                                    need_pan_to_real_location = false;
                                    update_url_parameter('panto', 0)
  
                                   } 
            


            });





            




        }// get map function 



        // . . . . basemap  . . . .
        function load_microsoft_basemap(_key){

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
                    subscriptionKey: _key,
                }
            }); // new map


            

           

            add_map_event()
           

            //Wait until the map resources are ready.
            map.events.add('ready', function () {

                /**/
                //  --- Microsoft traffic (basemap) version   --- 
                /**/

                    // . . . . basemap  . . . .


                        traffic_legend_control_handler = new atlas.control.TrafficLegendControl()


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
                        

                                //  - -  must switch to microsoft hybrid  - -  
                                remove_3rdParty_basemap_layer()
                                azure_basemap_id = 'azure-hybrid',
                                update_url_parameter('azureBaseMap', azure_basemap_id);
                                $("input[type=radio][name='azure_basemap_radio'][value=" + azure_basemap_id + "]").prop('checked', true);
                                // - -  end - - must switch to microsoft hybrid

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
                    //  . . . .  end  . . . . basemap  . . . .
                       
                /**/
                //  --- end  ---  Microsoft traffic (basemap) version   ---
                /**/




                

/**/
//  --- microsoft circle  (only for basemap version)     --- 
/**/

                

                /**/
                    //  --- Microsoft feature layer   --- 
                    /**/

                    // must keep searchlayer datasource, it was used by search address, can be used for other future purpose
                    add_dataSource_searchLayer()

                    add_dataSource_geojson_layer()

                     

                    /**/
                    //  --- end  ---  Microsoft feature layer    --- 
                    /**/

                    
                

                // only for basemap version, add circle must after search layer. 
                init_circle_dataSource()
                


                // first time 1 time, must after init circle data source function
                moveend_handler()
/**/
//  --- end  ---  microsoft circle   (only for basemap version)    --- 
/**/

                


                

                /**/
                // --   --  --  search address only  --   --  --  
                searchAddressOnly()
                // --  end  --  --  search address only  --   --  -- 
                /**/



                 // . . . . basemap  . . . .
                // must wait until map is ready, so must be inside ready function, 
                init_user_interface_after_microsoft_map_load()

                
                

                                 //   pan to real location,  must be at last steps, must after map object created ,,after init web worker, pan to real location 
                                 if (need_pan_to_real_location) {
                                    pan_to_real_location();
                                    need_pan_to_real_location = false;
                                    update_url_parameter('panto', 0)
  
                                   } 
            


            });


        }



/**/
//  --- use your key  --- 
/**/


   
   function use_your_key(_googlebasemap_){


          // 1st time, one time
          urlParams = new URLSearchParams(window.location.search);
          param_your_microsoft_api_key = urlParams.get('yourMicrosoftKey'); 
          if (param_your_microsoft_api_key){
                
                $('#microsoftmap-key-input').val(param_your_microsoft_api_key)
                
                your_microsoft_api_key = param_your_microsoft_api_key
                
                // comment out this line, will cause production never get poi, because 
                // restrict key is localhost only, even user find out my public key, they 
                // can load microsoft map, but with local host only restrict api key, they
                // never can get POI.
                // enable this line, will let user use their key or my public key collect poi 
                microsoft_azure_primary_key_restrict = your_microsoft_api_key


                if (_googlebasemap_ == "google"){
                    load_microsoft_basemap(your_microsoft_api_key)
                } else {
                    // without multi base map
                    load_microsoft_map(your_microsoft_api_key)
                }
                
          }


    
          $('#microsoftmap-button').on("click", async (event) => {

              your_microsoft_api_key = $('#microsoftmap-key-input').val();

              
              // comment out this line, will cause production never get poi, because 
              // restrict key is localhost only, even user find out my public key, they 
              // can load microsoft map, but with local host only restrict api key, they
              // never can get POI.
              // enable this line, will let user use their key or my public key collect poi 
              microsoft_azure_primary_key_restrict = your_microsoft_api_key

              
              update_url_parameter('yourMicrosoftKey', your_microsoft_api_key);

              if (_googlebasemap_ == "google"){
                    load_microsoft_basemap(your_microsoft_api_key)
                } else {
                    // without multi base map
                    load_microsoft_map(your_microsoft_api_key)
                }
          });// click 

   }


/**/
//  --- end  ---  use your key    --- 
/**/







/**/
//  --- microsoft geocode    --- 
/**/
          

  
  
  function microsoft_geocode_api_reverseGeocode(_centerLng, _centerLat, _radiusMeter){

    
  
        //Use MapControlCredential to share authentication between a map control and the service module.
        var pipeline = atlas.service.MapsURL.newPipeline(new atlas.service.MapControlCredential(map));

        //Construct the SearchURL object
        var searchURL = new atlas.service.SearchURL(pipeline);


        // api search Nearby parameter https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
        
        // api https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest
        searchURL.searchAddressReverse(

            // aborter
            atlas.service.Aborter.timeout(10000), 
            // searchAddressReverse
            // https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchaddressreverse
            [Number(_centerLng), Number(_centerLat)],   // _lng_lat_array,

        ).then((addressResult) => {


           

           
            console.log('address result', addressResult)

      

        var _freeformAddress = ''
        var _place_id = ''
        var address_value_html = ''

       

        var results_array = addressResult.addresses

                    
        for (let i = 0; i < results_array.length; i++) {

            _freeformAddress = results_array[i].address.freeformAddress

            _place_id = results_array[i].id
                      
            if (i < 2){
            
              

                  // address 
                  address_value_html += '<span style="font-size:21px;">' + _freeformAddress +   '</span>'
                  // place id 
                  //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
                  address_value_html += "<br>"




                  address_value_html += "<br>"

            } else{    
              
              

                        address_value_html += "<br>"
                        address_value_html += '<span style="font-size:11px;">' + _freeformAddress +   '</span>'  
                        //address_value_html += '<sup style="font-size:7px;">' + _place_id +   '</sup>'
            }// if
        }// for

    



                                  
    $('#info-window-div').html(address_value_html)




    
      })
      .catch(error => {
        // Handle any errors
        console.error('There has been a problem with your fetch operation:', error);
      });




      
       // api search Nearby parameter https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
        searchURL.searchNearby(

            // aborter
            atlas.service.Aborter.timeout(10000), 

            // location GeoJSON.Position an array of [longitude, latitude]
            [Number(_centerLng), Number(_centerLat)], 

            // SearchNearbyOptions  
            // URL REST parameter is here https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-nearby?view=rest-maps-1.0&tabs=HTTP
            // class api is here: https://learn.microsoft.com/en-us/javascript/api/azure-maps-rest/atlas.service.searchurl?view=azure-maps-typescript-latest#azure-maps-rest-atlas-service-searchurl-searchnearby
            
            {
            
            // Starting offset of the returned results within the full result set. Default: 0 
            ofs: 0,
            
            limit: 100, // max is 100
            lon: Number(_centerLng),
            lat: Number(_centerLat),


            // maxFuzzyLevel https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-fuzzy?view=rest-maps-1.0&tabs=HTTP
            //maxFuzzyLevel: 4,
            //minFuzzyLevel: 1,


            radius: Number(_radiusMeter),
           

            // not working
            // must convert position array to string
            //topLeft: topLeft_NW_position.toString(),
            //btmRigh: btmRigh_SE_position.toString(),
            //topLeft: topLeft_NW_position,
            //btmRigh: btmRigh_SE_position,

            view: 'Auto',

        }).then((results) => {

            console.log('microsoft nearby result ', results)

            microsoft_poi_geojson = results.geojson.getFeatures();
            console.log('microsoft nearby result , get features ,microsoft poi geojson ', microsoft_poi_geojson)

            var microsoft_poi_html = ''
            var microsoft_poi_results_array = results.results
            for (let i = 0; i < microsoft_poi_results_array.length; i++) {
              microsoft_poi_html += "<span style='font-size:22.2px; font-weight:800;'>" + microsoft_poi_results_array[i].poi.name + "</span>" 
              microsoft_poi_html += ", "
            }


            //  --- microsoft poi   ( for esri compare only )   --- 
            $('#message3').html(microsoft_poi_html)       

        });// then search poi






  }

/**/
//  --- end  ---  microsoft geocode    --- 
/**/








 function clear_all_poi(){

        //Remove any previous results from the map.
        if (datasource){
            datasource.clear();
        }
        if (datasource_highlight){
            datasource_highlight.clear();
        }

         // reset to empty geojson template
          poi_geojson = {
                            "type": "FeatureCollection",
                            "features": []
                        };

        _all_poi_uniqueID_array = []
        _all_poi_flat_array = []

        _total_poi = 0
        $("#poi_total").html(_total_poi)

    }






/**/
//  --- microsoft circle       --- 
/**/

      function clear_all_circle(){

          if (circle_datasource){
              circle_datasource.clear();
          }

        
      }
                      
      function drawing_circle(_radiusMeter, _centerLng, _centerLat){
          //console.log('drawing circle at _radiusMeter, _centerLng, _centerLat', _radiusMeter, _centerLng, _centerLat)

          if (circle_datasource){
            

              //Create a circle from a Point feature by providing it a subType property set to "Circle" and radius property.
              circle_datasource.add(new atlas.data.Feature(new atlas.data.Point([Number(_centerLng), Number(_centerLat)]), {
                  subType: "Circle",
                  radius: Number(_radiusMeter)
              }));

          }//if

      }



/**/
//  --- end  ---  microsoft circle    --- 
/**/







/**/
//  --- microsoft manual drawing circle   --- 
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
              //  -  -  - guided ring for manual drawing circle or square  -  -  - 
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
              //  -  -  - end  -  -  -  guided ring for manual drawing circle or square    -  -  - 
              /**/




        }



/**/
//  --- end  ---  microsoft manual drawing circle    --- 
/**/






/**/
//  -  -  - guided ring for manual drawing circle or square  -  -  - 
/**/


        var circle_guideRing_datasource


        function drawing_circle_guideRing(_radiusMeter, _centerLng, _centerLat){

            clear_circle_guideRing()

            //console.log('drawing circle at _radiusMeter, _centerLng, _centerLat', _radiusMeter, _centerLng, _centerLat)

            if (circle_guideRing_datasource){
                //Create a circle from a Point feature by providing it a subType property set to "Circle" and radius property.
                circle_guideRing_datasource.add(new atlas.data.Feature(new atlas.data.Point([Number(_centerLng), Number(_centerLat)]), {
                    subType: "Circle",
                    radius: Number(_radiusMeter)
                }));

            }//if

        }



         function clear_circle_guideRing(){

            if (circle_guideRing_datasource){
                circle_guideRing_datasource.clear();
            }
        
           
        }

        
/**/
//  -  -  - end  -  -  -  guided ring for manual drawing circle or square    -  -  - 
/**/
