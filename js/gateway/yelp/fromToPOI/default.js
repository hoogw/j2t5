


/**/
// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 


      var _maxAllowableOffset = 0  // default

// ... ... .. simplify vertex by set maxAllowableOffset ... ... .. 
/**/



//  +++++++++ ********* +++++++++   ground overlay,  map tile   +++++++++ ********* +++++++++  
/**/


       // default
       var current_overlaytype = 'overlayType_image';
       

       var singleFusedMapCache = false;
       var spatial_reference_mapserver = 4326 // default for map server (tile is regards map server, multi-layers)
       var imageMapType

       




       
               
               var image_opacity = 0;  // default
               var spatial_reference = 4326 // default for layer (image, groundOverlay is regards layers)
               var groundoverlay;
               var groundOverlayImage = null // must be global var for image loading progressing bar


//  +++++++++ ********* end  +++++++++      ground overlay,  map tile    +++++++++ ********* +++++++++  








 /**/





          








/**/


    // ++++++++++   geocode    ++++++++++

    var _address_content="";
    var _long_content="";
    var _lat_content="";
    var _url2_content="";
    var _url1_content="";

   var candidateLocationResult

   var _candidate_location_geojson_layer;

   var _singleLineAddressField
   var _addressFields




   
   

// ++++++++++   end   ++++++++++   geocode    ++++++++++














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




 

 
 



 // -2 means current showing not available,  -1 means total count not available
  
 
 

 



// -------------------- max count pagination --------------------

        // default maxRecordCount is 1000 or 2000, arcgis server admin can overwrite it to a large number like 20k, 
        // if admin set it to 20k, we must enforce it as 1000, means we only retrieve first 1000 records, no matter maxRecordCount is how large. 
        var _default_resultRecordCount = 500
        

        // use in pan to real location, get how many sample  
        var _sample_count = 10
        
         // define at feature layer json, advancedQueryCapabilities
       // if true, can use limited return ( default result Record Count ) result Off set, result Record Count, if false,  use unlimited (relay on maxRecordCount 2000) 
       // var _supportsPagination = false
        
 // -------------------- end --------------------
 
 


                                          //------------ search feature --------
                                          var _feature_attributes =[];
                                          var _feature_attributes_string =[];
                                          var _feature_attributes_integer =[];
                                          var _feature_attributes_double =[];
                                          var _feature_attributes_date =[];
                                          //---------  End --- search feature --------



                    /* 


                         "supportsAdvancedQueries": true, 


                          advancedQueryCapabilities:
                                                  supportsCountDistinct: true
                                                  supportsDistinct: true
                                                  supportsHavingClause: true
                                                  supportsOrderBy: true
                                                  supportsPagination: true
                                                  supportsQueryWithDistance: true
                                                  supportsReturningQueryExtent: true
                                                  supportsSqlExpression: true
                                                  supportsStatistics: true
                                                  supportsTrueCurve: true
                                                  useStandardizedQueries: true
                    */

                    var _supportsAdvancedQueries  = false;

                    var _supportsCountDistinct  = false;
                    var _supportsDistinct = false;
                    var _supportsHavingClause = false;
                    var _supportsOrderBy = false;
                    var _supportsPagination = false;
                    var _useStandardizedQueries = false;
                    var _supportsStatistics = false;
                    var _supportsTrueCurve = false;
                    var _supportsReturningQueryExtent = false;
                    var _supportsQueryWithDistance = false;
              
                    
                    var field_alias = {} 
                    var field_type = {}   // { 'date': 'calendar_date', 'rainfall_amount_inches': 'number',  'station':'text'   }
                    var field_name = []   // [ 'date',                  'rainfall_amount_inches',            'station']
                    var field_value = []
                    var flatJson_item
                    var fieldValue_flatjson
                    var field_structure_flatjson = []
                    



                    


                    
                    

                   

                   



















           

















          









               /**/
              // -- -- -- vertial adjustment  -- -- -- 



              

       

  
/**/
//  --- yelp POI on google      --- 
/**/
  
              function show_info_outline_Tab(___properties){
                
                $('#info-window-div').html(poi_viewer_for_route(___properties))

              }


              function empty_info_outline_Tab(){

                $('#info-window-div').html("")
              }


/**/
//  --- end  ---  yelp POI on google    --- 
/**/




                             
                        
                        





                        


              
                        
        


                        



                            



                       









/**/
//  --- yelp POI on google      --- 
/**/



          
           
  
  
 /**/
 //  . . search bar . .
 /**/ 



              
                 
            async function nearby_poi(_radiusMeter, _centerLng, _centerLat){

              // yelp always use circle for both s e a r c h k e y w o r d & c a t e g o r y,
              // only d r a w   c i r c l e when radius large than max 
              if (_radiusMeter >= max_yelp_poi_radius_meter){
                  drawing_circle(_radiusMeter, _centerLng, _centerLat)
              }//if
              
              

              
                search_poi_keyword = $('#search_poi_input').val().trim().toLowerCase();   // .trim()  Removes only leading & trailing whitespaces
                
                console.log('search_poi_keyword --->  ', search_poi_keyword)
                update_url_parameter('poi', search_poi_keyword);
                  
                var ____url = yelp_api_search

                  // yelp support search empty keywprd for all things,
                if (search_poi_keyword){
                    // If term is not included the endpoint will default to searching across businesses from a small number of popular categories.
                    ____url += 'term=' + search_poi_keyword
                 } else {

                    // empty keyword means show all things, otherwise, uncommnent alert to require keyword
                    //return alert("search keyword required !")
                 }//if

                 
                  


                 
                   _center_radius_in_meter = get_center_radius_in_map_bound()
                    ____url += '&latitude=' + _center_lat
                    ____url += '&longitude=' + _center_long
                    ____url += '&radius=' + _center_radius_in_meter
                    ____url += '&limit=50'  // integer 0 to 50 Defaults to 20
                    ____url += '&offset=0'   // offset integer 0 to 1000, Offset the list of returned results by this amount
                    
                 
                  



      
                  console.log('poi search by keyword term url ', ____url )
                  
                  var response_string =  await $.ajax({
                    url: ____url,
                    headers: {
                    'Authorization': yelp_api_key,  //'Bearer xxxxxx',
                    },
                    method: 'GET',
                    dataType: 'json',
                    success: function(data){
                      console.log('poi search by categories success', data)
                    }
                  });  
      
  
                  $("#poi_total").html(response_string.total)
                  $("#poi_on_map").html(response_string.businesses.length)
                  poi_geojson = poi_to_geojson(response_string.businesses)
        
                  console.log('poi geojson', poi_geojson)
        
                
        
                 /**/
                  //  ---  POI marker replace point geojson      --- 
                  /**/
                  poi_geojsonPointFeature_to_marker_label(poi_geojson.features, 'name')
                  /**/
                  //  --- end  ---  POI marker replace point geojson    --- 
                  /**/
        
                    
                
  
  
              }//function
              
              
  
  



 //  . . end . .  . . search bar . . 
 /**/



/**/
//  --- end  ---  yelp POI on google    --- 
/**/


                              






