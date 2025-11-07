

var traffic_control_handler
var traffic_legend_control_handler

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







  
function show_info_outline_Tab(___properties){
  
                  // make sure flex_1 is id of column
                  $('#flex_1').scrollTop(0); // build in scroll to top popup info window
                  $('#info-window-div').html(json_flex_tip_viewer(___properties))
  
}


function empty_info_outline_Tab(){
  $('#info-window-div').html("")
}





