

// --------------- socrata api url path ---------------

        //both works for domain.js and search.js

           // fast 
           // _socrata_api_url_path_ = '/api/id&'

            // slow 
           // _socrata_api_url_path_ = '/resource&'

           // so far not use
           var _socrata_api_url_path_;

// --------------- end ---------- socrata api url path ---------------
/**/ 


  
    

/**/ 


  
  // only for domain.js
  //  difference is   ___domainName is always single one, not change all time
  function rendering_json_to_html(_results) {
       
      

                     
            
                 // default, get domain item already sort by page view from server, but lunr.js break this order, so must re-do compare to restore the order by page view. if without use lunr.js then no need this compare() 
                  //--- sort item by page view  --- 
                    //......Must have {count:587,......}, without count:xxx, or count is different name, must update compare function. 
                    _results.sort(compare);
                  //--- end --- sort item by page view  ---








        var html = '';
      
     
     
      
       /*
 
         *    <ol>
         *        <li>
         *             <a href=''> xxx </a>
         *        </li>  
         *           
         *        <li>
         *             <a href=''> xxx </a>
         *        </li>  
         *        
         *        <li>
         *             <a href=''> xxx </a>
         *        </li>  
         *    </ol>
         *   
         *   
      
         */
        
         
         
        // ---------- build --------------
        
        
        
        
                    html += '<div>';
      
                    if (_results.length > 0) {

                        html += '<ol class="custom-counter">';

                        for (var i = 0; i < _results.length; ++i) {

                                  html += '<li>' // css .ordered_list_number{ size font};

                                   // for staging
                                   //  html += '<a target="_self" href="' + current_url  + '?url='+ ___url_string + '/' + _results[i].resource.id +  '">' + _results[i].resource.name +  '</a>';

                                    // +++++ build link base on if have column type as location/geospatial, go to /googlemaps otherwise go to /dataset  ++++++++++

                                    // ______ check if have the_geom, if have the_geom, means have export geojson option, can do mapbox_vector.

                                       // lens_view_type normally is 'tabular', means no geojson, just (table +latlng), if it is 'geo', means it is shape file based, have kml, geojson, shp
                                          var _the_geom_exist = false;

                                          if (_results[i].resource.lens_view_type == 'geo'){
                                            _the_geom_exist = true;
                                            _type = 'map';
                                          }

                                    // ______ end  ______  check if have the_geom, if have the_geom, means have export geojson option, can do mapbox_vector.

                                    var _columns_datatype_array = _results[i].resource.columns_datatype;
                                    var arrayLength = _columns_datatype_array.length;
                                    var _type = _results[i].resource.type;
                                    var _location_field_name = '';
                                    var _description = _results[i].resource.description;
                                    var _name = _results[i].resource.name;
                        
                                    var _permalink = _results[i].permalink

                       // ....... strip HTML from a string  .....
                        
                       
                            // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
                       
                            // ==== first step: remove html tag
                            var _description_stripedHtml = $("<div>").html(_description).text();
                            var _name_stripedHtml = $("<div>").html(_name).text();
                            
                             // regular express remove <xxx> tag 
                             // str = str.replace(/[^a-z0-9-]/g, '');
                             /*
                                Everything between the indicates what your are looking for

                                / is here to delimit your pattern so you have one to start and one to end
                                [] indicates the pattern your are looking for on one specific character
                                ^ indicates that you want every character NOT corresponding to what follows
                                a-z matches any character between 'a' and 'z' included
                                0-9 matches any digit between '0' and '9' included (meaning any digit)
                                - the '-' character
                                g at the end is a special parameter saying that you do not want you regex to stop on the first character matching your pattern but to continue on the whole string
                               */
                              // 
                             //_description_stripedHtml = _description_stripedHtml.replace(/<[^>]+>/g, '');
                             //_name_stripedHtml = _name_stripedHtml.replace(/<[^>]+>/g, '');

                            // ==== second step: encode >, <, 
                             _description_stripedHtml = _description_stripedHtml.replace(/</g, '&lt;');
                             _description_stripedHtml = _description_stripedHtml.replace(/>/g, '&gt;');
                             _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                             _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');
                       // ....... end ......  strip HTML from a string  .....
                       
                       
                       for (var jj = 0; jj < arrayLength; jj++) {
                            if ((_columns_datatype_array[jj].toLowerCase() == 'location')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'geospatial') || 
                                (_columns_datatype_array[jj].toLowerCase() == 'point')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'line')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'polygon')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'multipoint')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'multiline')|| 
                                (_columns_datatype_array[jj].toLowerCase() == 'multipolygon')
                               )
                            { 
                                _type = 'gmap';
                                _location_field_name = _results[i].resource.columns_field_name[jj];
                              //  console.log('_location_field_name',_location_field_name);
                               // fix bug, utah employer list have 2 field (location_1, location_2) both are location type. 
                               // but only location_1 have lat long value, location_2 only have human address, no lat long
                               // ideally should identify which location field have lat long, but here returned json does not give detailed info to indentify.
                               // so temporary fix is once have first location type, exit for loop.
                               break; 
                            } //if
                        }// for

                        // alternative way to verify it is tabular, gmap, table+latLng 
                        if (_results[i].resource.lens_view_type == 'tabular'){
                          _type = 'gmap';
                        }



                      /*   ------ text  -- xxx(views)  context class for mark.js highlight --------   */ 
                        html += '&nbsp;';
                        html += '<span class="context">' +  _name_stripedHtml + ' <sup><b>' + _results[i].resource.page_views.page_views_total + '</b> views</sup>'   + '</span>';
                        html += '</br>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                      /*  ------   end   ------   text  -- xxx(views)  context class for mark.js highlight --------   */ 



                     // gmap means type = dataset,  as long as have location field, we can make it into a map. 
                     // if type = map,  location colums are NOT list here, it is empty here.
                     // "columns_field_name" : [],
                     // "columns_datatype" : [],
                     // type = dataset, but with location field, NO export geojson,
                     


                     /**/ 
                     //  ............... start of  ............... gmap (rest api map)  ...............   
                     if (_type === 'gmap') {
                      // this is our map type. it is type = dataset, but with location field.
                        

                         //icon  original-web-page, type-icon = permalink,      tooltips = link
                         html += '<big>Map</big>' 
                         html += '&nbsp;'
                         html += '<a target="_blank" href="' + _permalink + '">' 
                         html +=      '<sup>' + _permalink +   '</sup>'  
                         html += '</a>';

                         html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';
                         
                         
                        
                         // googlemap searchable rest api - new no-tab version
                         html += '<a target="_blank" href="' + url_template_base_map  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'
                         html += '<big>0</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         // googlemap searchable rest api - new no-tab version  ---- card ---- 
                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'
                         html += '<big>0c</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';







                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps73/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                         html += '<big>73</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps730/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                         html += '<big>730</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps71/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                         html += '<big>71</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps710/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                         html += '<big>710</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps81/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                         html += '<big>81</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                         




                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                        // apple searchable rest api 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','applemaps/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>A0</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        // bing searchable rest api   ---- card ---- 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','applemaps/default2')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>A0p</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                        // bing searchable rest api 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','bingmaps/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>B0</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        // bing searchable rest api   ---- card ---- 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','bingmaps/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>B0c</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                       // here searchable rest api 
                       html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','heremaps/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                       html += '<big>H0</big>' 
                       html += ' </a>';
                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                       // here searchable rest api   ---- card ---- 
                       html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','heremaps/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                       html += '<big>H0c</big>' 
                       html += ' </a>';
                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                        
                        // mapbox searchable rest api
                        html += '<a target="_blank" href="' + url_template_base_map_2  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>M0</big>' 
                        html += ' </a>';  
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        // mapbox searchable rest api ---- card ---- 
                        html += '<a target="_blank" href="' + url_template_base_map_2.replace('mapbox/default','mapbox/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>M0c</big>' 
                        html += ' </a>';  
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                      
                        




                      

                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';


                        // 41
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps41/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>41</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                       

                        // 4
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps4/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>4</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                        // 43
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps43/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>43</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                        // 413
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps413/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>413</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                         // 471 
                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps471/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                         html += '<big>471</big>' 
                         html += ' </a>';
                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                       
                        
                        // 473 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps473/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>473</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        

                        
                        // 480 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps480/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>480</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        


                        // 482 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps482/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>482</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                       

                        // 487 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps487/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>487</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                        // 4718 
                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps4718/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                        html += '<big>4718</big>' 
                        html += ' </a>';
                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                          // 4738 
                          html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps4738/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                          html += '<big>4738</big>' 
                          html += ' </a>';
                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                
                         




                         
                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                         


                          
                         // classified dataset4  - rest api 
                         html += '<a target="_blank" href="' + url_template_base_dataset4  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                         html += '<big>T4</big>' 
                         html += ' </a>';

                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                        
                         // classified dataset24  - rest api 
                         html += '<a target="_blank" href="' + url_template_base_dataset24  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                         html += '<big>T24</big>' 
                         html += ' </a>';

                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                         // icon - for dataset  - rest api
                         html += '<a target="_blank" href="' + url_template_base_dataset  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                         html += '<big>T0</big>' 
                         html += ' </a>';

                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         
                          // icon - for dataset2  - json  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.json?accessType=DOWNLOAD
                          html += '<a target="_blank" href="' + url_template_base_dataset2  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                          html += '<big>T2</big>' 
                          html += ' </a>';
                         

                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                          // icon - for dataset3  - csv  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.csv?accessType=DOWNLOAD
                          html += '<a target="_blank" href="' + url_template_base_dataset3  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.csv'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                          html += '<big>T3</big>' 
                          html += ' </a>';

                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                         
                         
                              
                                  //  ---- arcgis connection  ----  arcConnect  ----  arcXXX   ----
                                           
                                                                                  html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 
                                                                               
                                                                                   // arc2000  googlemap searchable rest api - new no-tab version
                                                                                   html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2000/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'
                                                                                   html += 'arcgis<big>2000</big>' 
                                                                                   html += ' </a>';
                                                                                   html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                           
                                                                                           
                                                                                   // arc2004 google map classified rest api googlemaps4
                                                                                   html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2004/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                   html += 'arcgis<big>2004</big>' 
                                                                                   html += ' </a>';
                                                                                   html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                    //  arc2113 
                                                                                    html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2113/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                    html += 'arcgis<big>2113</big>' 
                                                                                    html += ' </a>';
                                                                                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                    // arc2116 
                                                                                    html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2116/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                    html += 'arcgis<big>2116</big>' 
                                                                                    html += ' </a>';
                                                                                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                           
                                           
                                                                                   // arc5000  data reference 
                                                                                   html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps5000/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                   html += 'arcgis<big>5000</big>' 
                                                                                   html += ' </a>';
                                                                                   html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                   
                                                                                   // arc5002 data reference - field mask
                                                                                   html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps5002/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                   html += 'arcgis<big>5002</big>' 
                                                                                   html += ' </a>';
                                                                                   html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                           
                                           
                                                                                    // arc30  mask
                                                                                    html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps30/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                    html += 'arcgis<big>30</big>' 
                                                                                    html += ' </a>';
                                                                                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                    
                                           
                                           
                                           
                                //   ----   end   ----    ---- arcgis connection  ----  arcConnect  ----  arcXXX   ----
                                           
                                                                    /**/
                                           
                                           
                      //  ............... end of  ............... gmap (rest api map)  ............... 
                            
                     } else if (_type == 'map') {
                          // ******************  shape file type   ******************  
                                        // original icon = permalink,
                                        html += '<big>Map(shapefile)</big>' 
                                        html += '&nbsp;'     
                                        html += '<a target="_blank" href="' + _permalink + '">' 
                                        html +=      '<sup>' + _permalink +   '</sup>'    
                                        html +=  '</a>';

                                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';
  
                                          // type = map, means export GeoJson available at: 
                                          // https://data.lacity.org/api/geospatial/7aty-5ywx(page-id = resource-id)?method=export&format=GeoJSON
                                          // Note: export GeoJSON, should use resource-id, no need to find real-resource-id( SODA api endpoint)
                                          // so can do mapbox_vector, which means load full geojson at one time.
                                          // "columns_datatype" : [],  location field, type, name lost list here.
                                      
                                          // var _map_type_subset_real_ID = _results[i].resource.name + ' | ' + _results[i].resource.id + '  |real-id| >  ' +  _real_id
                                          // console.log('_real_id map type', _map_type_subset_real_ID );
                                          var _real_id = _results[i].resource.id;



                                           // ----------- dynamic real_id works   ----------- 
                                                                                  // parse html page ( via map page id) to get the real map id
                                                                                  // onclick="return myFunction();"
                                                                
                                                                                 
                   
                                                                                 //  googlemap (rest api) - new no tab version
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  googlemap (rest api) - new no tab version  ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps/default_card') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps73/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>73</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps730/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>730</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps71/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>71</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps710/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>710</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps81/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>81</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                 html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                //  apple (rest api) 
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'applemaps/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>A0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  bing (rest api)   ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'applemaps/default2') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>A0p</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 //  bing (rest api) 
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'bingmaps/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>B0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  bing (rest api)   ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'bingmaps/default_card') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>B0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                 //  here (rest api) 
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'heremaps/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>H0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  here (rest api)   ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'heremaps/default_card') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>H0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';

  
                                                                                 // mapbox (rest api)
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map_2 +  '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>M0</big>' 
                                                                                 html += ' </a>'; 
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 // mapbox (rest api)  ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map_2.replace('mapbox/default', 'mapbox/default_card') +  '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>M0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                                                                







                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                  // 41
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps41/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>41</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                  

                                                                                 // 4
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps4/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>4</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                


                                                                                 // 43
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps43/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>43</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                 // 413
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps413/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>413</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 
                                                                                 // 471
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps471/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>471</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 
  
                                                                                  // 473
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps473/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>473</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 
 

                                                                                  // 480
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps480/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>480</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 



                                                                                  // 482
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps482/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>482</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 

                                                                                  // 487
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps487/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>487</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                  

                                                                                  // 4718
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps4718/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>4718</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 

                                                                                  // 4738
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps4738/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>4738</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                  




                                                                                 
                                                                                 
                                                                                 html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                





  
                                                                                  // classified dataset4  - rest api 
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset4 + '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T4</big>' 
                                                                                  html += ' </a>';

                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                                  // classified dataset24  - rest api 
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset24 + '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T24</big>' 
                                                                                  html += ' </a>';

                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                                                                
                                                                                 // dataset 1 (rest api)  
                                                                                 // display pageView only
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset + '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>T0</big>' 
                                                                                 html += ' </a>';

                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
  
                                                                                  // dataset 2 (json)
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset2 + '\', \'json\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T2</big>' 
                                                                                  html += ' </a>';  
                                                                                  
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                                  // dataset 3 (csv)
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset3 + '\', \'csv\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T3</big>' 
                                                                                  html += ' </a>';  
                                                                                  
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                         
                                                         
                                                         
                                                                                  // ----------- end   -----------  dynamic real_id works   ----------- 


                                              //  ---- arcgis connection  ----  arcConnect  ----  arcXXX   ----
                                                                                                                            
                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                                              // arc2000 googlemap searchable rest api - new no-tab version
                                              html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2000/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                              html += 'arcgis<big>2000</big>' 
                                              html += ' </a>';
                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                              // arc2004 google map classified rest api googlemaps4
                                              html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2004/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                              html += 'arcgis<big>2004</big>' 
                                              html += ' </a>';
                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                              // arc2113
                                              html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2113/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                              html += 'arcgis<big>2113</big>' 
                                              html += ' </a>';
                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                              // arc2116
                                              html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2116/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                              html += 'arcgis<big>2116</big>' 
                                              html += ' </a>';
                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                              // arc5000 data reference 
                                              html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps5000/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                              html += 'arcgis<big>5000</big>' 
                                              html += ' </a>';
                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                              // arc5002 data reference - field mask
                                              html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps5002/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                              html += 'arcgis<big>5002</big>' 
                                              html += ' </a>';
                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                // arc30 mask
                                                html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps30/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                html += 'arcgis<big>30</big>' 
                                                html += ' </a>';
                                                html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                                                      

                                                                                             

      
                                          //  -----  googlemaps_vector geojson   ----- 
                                          
                                                                        html += '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                        html += '<sup><small>';
                                                                        html += 'download geojson';
                                                                        html += '&nbsp;&nbsp;&nbsp;';     
                                               
                                                                      

                                                                         var _socrata_geojson_url = 'https://'+ ___domainName + '/api/geospatial/' + _real_id + '?method=export&format=GeoJSON'
                                                                         var raw_socrata_geojson_url = _socrata_geojson_url

                                                                          html += '<a target="_blank" href="' + raw_socrata_geojson_url   + '">';
                                                                          html += raw_socrata_geojson_url
                                                                          html += '</a>';

                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  
                                                                         // encodeURI() not work,  will skip ? and &, we must replace them as   %3F (?) , %26 (&)
                                                                         // var _encoded_socrata_geojson_url  = encodeURI(_socrata_geojson_url)
                                                                         // should use replace
                                                                         var _encoded_socrata_geojson_url  = _socrata_geojson_url.replace("?", "%3F").replace("&", "%26")
                                                                         // console.log('_encoded_socrata_geojson_url  --> ', _encoded_socrata_geojson_url)
  
                                                                         html += '<a target="_blank" href="' + url_template_base_map_google_geojson  + 'url=' + _encoded_socrata_geojson_url + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                         html += '<big>92-geojson-worker</big>' 
                                                                         html += '</a>'; 
                                                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                         
                                                                         html += '<a target="_blank" href="' + url_template_base_map_google_geojson.replace('googlemaps92/default', 'googlemaps93/default')  + 'url=' + _encoded_socrata_geojson_url + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                         html += '<big>93-geojson-cors</big>' 
                                                                         html += '</a>';
                                                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                               
  
                                          // --- mapbox_vector  geojson  --- 
                                                                                 
                                                                                  html += '<a target="_blank" href="' + url_template_base_map_3  + 'url=' + _encoded_socrata_geojson_url + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">' 
                                                                                  html += '<big>Mapbox-geojson</big>' 
                                                                                  html += '</a>';

                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                          
                                          //............... special for arcgis/js4/esri_geojson ...............
                                                                                      
                                                                                          //var _full_geojson_url = 'https://data.lacity.org/api/geospatial/' + _layer_id + '?method=export&format=GeoJSON'
                                                                                          //var _full_geojson_url = _url + _layer_id + '?method=export&format=GeoJSON'
                                                                                          // '?' must encode as '%3F',     '&' must encode as '%26'
                                                                                          var _full_geojson_url = 'url=https://'+ ___domainName + '/api/geospatial/' + _real_id + '%3Fmethod=export%26format=GeoJSON';
  
                                                                                          // esri_geojson
                                                                                          html += '<a target="_blank" href="' + url_template_base_map_4  + _full_geojson_url  +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                          html += '<big>Esri-geojson-3D-clickable</big>' 
                                                                                          html += '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                          // esri_geojson
                                                                                          html += '<a target="_blank" href="' + url_template_base_map_4.replace('geojson/geojson.html', 'geojson/geojson_popup.html')  + _full_geojson_url  +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                          html += '<big>Esri-geojson-2D-popup</big>' 
                                                                                          html += '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                          // esri_geojson
                                                                                          html += '<a target="_blank" href="' + url_template_base_map_4.replace('geojson/geojson.html', 'geojson/geojson_v3.html')  + _full_geojson_url  +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                                                                          html += '<big>Esri-geojson-2D-popup-variant</big>' 
                                                                                          html += '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                  html += '</sup></small>'; 
                                        //...........end ........... special for arcgis/js4/esri_geojson ...............



                                       
                                        html += '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                        html += '<sup><small>';
                                        html += 'download kml';
                                        html += '&nbsp;&nbsp;&nbsp;';  
                                       
                                        var raw_socrata_kml_url =  raw_socrata_geojson_url.replace('GeoJSON', 'KML')

                                        html += '<a target="_blank" href="' + raw_socrata_kml_url   + '">';
                                        html += raw_socrata_kml_url
                                        html += '</a>';

                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                         html += '<a target="_blank" href="' + url_template_base_map_google_geojson.replace('googlemaps92/default', 'googlemaps95/default')  + 'url=' + _encoded_socrata_geojson_url.replace("format=GeoJSON", "format=KML") + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                         html += '<big>95-kml-cors</big>' 
                                                                         html += '</a>'; 
                                                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                        

                                      html += '</sup></small>'; 
                                                          
                                      


                                      html += '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                      html += '<sup><small>';
                                      html += 'download Shapefile';
                                      html += '&nbsp;&nbsp;&nbsp;';  
                                     
                                      var raw_socrata_shp_url =  raw_socrata_geojson_url.replace('GeoJSON', 'Shapefile')  

                                      html += '<a target="_blank" href="' + raw_socrata_shp_url   + '">';
                                        html += raw_socrata_shp_url
                                        html += '</a>';

                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                 
                                                                                                          html += '<a target="_blank" href="' + url_template_base_map_google_geojson.replace('googlemaps92/default', 'googlemaps96/default')  + 'url=' + _encoded_socrata_geojson_url.replace("format=GeoJSON", "format=Shapefile") + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                                                          html += '<big>96-shp-cors</big>' 
                                                                                                          html += '</a>'; 
                                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';                          
                                       html += '</sup></small>';
  
                                                                        
  
                                                                 /*
                                                                      // .......... static resource id, real_id, based  dataset, google mapbox rest api not works, due to socrata api change   .......... 
  
                                                                                  // go to dataset with _real_id, not resource id
                                                                                  html += '<a target="_blank" href="' + url_template_base_dataset  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '">' + '<span class="mdi mdi-text-search light-blue-text" ></span>'+ '</a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';   
  
  
                                                                                  // go to dataset with _real_id, not resource id
                                                                                  // icon - for dataset/default2  - json  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.json?accessType=DOWNLOAD
                                                                                  html += '<a target="_blank" href="' + url_template_base_dataset2  + 'url=https://'+ ___domainName + '/api/views/'+ _real_id  + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '"><span class="mdi mdi-text-search lime-text"></span></a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';   
  
  
                                                                                  // go to dataset with _real_id, not resource id
                                                                                  // icon - for dataset/default3  - csv  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.csv?accessType=DOWNLOAD
                                                                                  html += '<a target="_blank" href="' + url_template_base_dataset3  + 'url=https://'+ ___domainName + '/api/views/'+ _real_id  + '/rows.csv'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '"><span class="mdi mdi-text-search pink-text"></span></a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';   
                                                                                             
                                                                            // google maps                       
                                                                            html += '<a href="#" onclick="getRealMapIdLocationField_by_parentFxf(\''+ _real_id + '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map +  '\',\'' + ___domainName + '\');return false;">'+ '<span class="mdi mdi-google-maps light-blue-text"></span></a>';
                                                                               html += '&nbsp;&nbsp;&nbsp;&nbsp;';               
                                                                                                  
                                                                            // mapbox                      
                                                                            html += '<a href="#" onclick="getRealMapIdLocationField_by_parentFxf(\''+ _real_id + '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map_2 +  '\',\'' + ___domainName + '\');return false;">'+ '<span class="mdi mdi-mapbox light-blue-text"></span></a>';
                                                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;'; 
  
                                                                      // ..........  end   ..........   dataset not works, due to socrata api change   .......... 
  
                                                               */
                                      
                                      
                                     
  
  
  
  /**/
                              
  
                                        
                                  
                     // ******************   end   ******************   shape file type   ******************   


                     } else if ((_type == 'dataset') || (_type == 'filter') || (_type == 'visualization')) {
                         
                        // table only 
                        
                          // original icon = permalink, 
                          html += '<big>Table</big>' 
                          html += '&nbsp;'     
                          html += '<a target="_blank" href="' + _permalink + '" class="hoverable lime-text">' 
                          html +=      '<sup>' + _permalink +   '</sup>'   
                          html +=  '</a>';   

                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                          // classified ---- directly go to dataset 4 (rest api)
                          html += '<a target="_blank" href="' + url_template_base_dataset4  + 'url=https://'+ ___domainName + '/api/id&'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                          html += '<big>T4</big>' 
                          html += ' </a>';  
                          
                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
 
                          // classified ---- directly go to dataset 24 (rest api)
                          html += '<a target="_blank" href="' + url_template_base_dataset24  + 'url=https://'+ ___domainName + '/api/id&'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                          html += '<big>T24</big>' 
                          html += ' </a>';  
 
                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                          
                          // directly go to dataset 1 (rest api)
                          html += '<a target="_blank" href="' + url_template_base_dataset  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id +  '">'
                          html += '<big>T0</big>' 
                          html += ' </a>';

                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
 
                          // directly go to dataset 2 (json)
                          html += '<a target="_blank" href="' + url_template_base_dataset2  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                          html += '<big>T2</big>' 
                          html += ' </a>';   

                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
 
                           // directly go to dataset 3 (csv)
                           html += '<a target="_blank" href="' + url_template_base_dataset3  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.csv'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T3</big>' 
                           html += ' </a>';

                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                     } else if (_type == 'file') {  
                       
                          // file
                          html += '<big>File</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">'
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html +=  '</a>'; 
                          

                     } else if (_type == 'href') {  
                       
                          // href
                          html += '<big>Link</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '">' 
                          html +=      '<sup>' + _permalink +   '</sup>'    
                          html +=  '</a>';   

                     } else if (_type == 'datalens') {  
                       
                        // datalens
                          html += '<big>Data Lens</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'   
                          html +=  '</a>';   
                        
                     } else if (_type == 'chart')  { 
                       
                        // chart
                          html += '<big>Chart</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html +=  '</a>';    

                     } else if (_type == 'story')  {  
                       
                        // story
                          html += '<big>Story</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'   
                          html +=  '</a>';  

                     } else if (_type == 'form')  { 
                       
                        // form
                          html += '<big>Form</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html +=  '</a>';  

                     } else {
                         // other than above type
                          console.log('Non-dataset------',_type);
                          console.log(_name_stripedHtml);
                          console.log(_results[i].resource.id);

                          html += '<big>Others</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'    
                          html +=  '</a>';  
                     }




                    
  
               // +++++ end ++++++++ build link base on if have column type as location/geospatial, go to /googlemaps otherwise go to /dataset  ++++++++++

                                      html += '<br><br>';
                                      html += '</li>';
                                   }// for


                                  
                                    html += '</ol>';

                         }
          
                       html +='</div>'
                       
           // --------- end --------- build --------------
          
       


           $('#json-renderer').html(html);



 }  
  
  








           // ................  only for search.js ................ 
           // difference is  ___domainName is always change, every item has its own domain name, must calculate domain name for each item, see below section


               // ................  only for search.js ................ 
                //  var  ___domainName = _results[i].metadata.domain;
               // ................  only for search.js ................ 

          
          function rendering_json_to_html_for_search(_results) {
              
            console.log('rendering_json_to_html_for_search', _results)

                  // because no lunr.js used, so no need this compare(), if use lunr.js, must re-order by compare()
                 // default, get domain item already sort by page view from server, but lunr.js break this order, so must re-do compare to restore the order by page view. if without use lunr.js then no need this compare() 
                  //--- sort item by page view  --- 
                    //......Must have {count:587,......}, without count:xxx, or count is different name, must update compare function. 
                    //_results.sort(compare);
                  //--- end --- sort item by page view  ---

              var html = '';
            
          
          
            
            /*

              *    <ol>
              *        <li>
              *             <a href=''> xxx </a>
              *        </li>  
              *           
              *        <li>
              *             <a href=''> xxx </a>
              *        </li>  
              *        
              *        <li>
              *             <a href=''> xxx </a>
              *        </li>  
              *    </ol>
              *   
              *   
            
              */
              
            
              
              // ---------- build --------------
              
              
              
              
                          html += '<div>';
            
                          if (_results.length > 0) {



                              html += '<ol class="custom-counter">';


                                        for (var i = 0; i < _results.length; ++i) {

                                          
                                          html += '<li>' // css .ordered_list_number{ size font};



                                        
                                        // for staging
                                        //  html += '<a target="_self" href="' + current_url  + '?url='+ ___url_string + '/' + _results[i].resource.id +  '">' + _results[i].resource.name +  '</a>';



                                          
                  // +++++ build link base on if have column type as location/geospatial, go to /googlemaps otherwise go to /dataset  ++++++++++




                            // ______ check if have the_geom, if have the_geom, means have export geojson option, can do mapbox_vector.

                                       // lens_view_type normally is 'tabular', means no geojson, just (table +latlng), if it is 'geo', means it is shape file based, have kml, geojson, shp
                                       var _the_geom_exist = false;

                                       if (_results[i].resource.lens_view_type == 'geo'){
                                         _the_geom_exist = true;
                                         _type = 'map';
                                       }

                                 // ______ end  ______  check if have the_geom, if have the_geom, means have export geojson option, can do mapbox_vector.




                                                
                                    var _columns_datatype_array = _results[i].resource.columns_datatype;
                                    
                                    var arrayLength = _columns_datatype_array.length;
                                    var _type = _results[i].resource.type;
                                    var _location_field_name = '';
                                    
                                    var _description = _results[i].resource.description;
                                    var _name = _results[i].resource.name;

                                    var _permalink = _results[i].permalink
                              

                                    // ................  only for search.js  ( part 1, must at top) ................ 
                                       
                                        
                                          var  ___domainName = _results[i].metadata.domain;

                                          var __organization = organization[___domainName];

                                   // ................  end  .............  only for search.js ................ 



                              
                              
                              
                            // ....... strip HTML from a string  .....
                              
                            
                                  // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
                            
                                  // ==== first step: remove html tag
                                  var _description_stripedHtml = $("<div>").html(_description).text();
                                  var _name_stripedHtml = $("<div>").html(_name).text();
                                  
                                  // regular express remove <xxx> tag 
                                  // str = str.replace(/[^a-z0-9-]/g, '');
                                  /*
                                      Everything between the indicates what your are looking for

                                      / is here to delimit your pattern so you have one to start and one to end
                                      [] indicates the pattern your are looking for on one specific character
                                      ^ indicates that you want every character NOT corresponding to what follows
                                      a-z matches any character between 'a' and 'z' included
                                      0-9 matches any digit between '0' and '9' included (meaning any digit)
                                      - the '-' character
                                      g at the end is a special parameter saying that you do not want you regex to stop on the first character matching your pattern but to continue on the whole string
                                    */
                                    // 
                                  //_description_stripedHtml = _description_stripedHtml.replace(/<[^>]+>/g, '');
                                  //_name_stripedHtml = _name_stripedHtml.replace(/<[^>]+>/g, '');



                                  // ==== second step: encode >, <, 
                                  _description_stripedHtml = _description_stripedHtml.replace(/</g, '&lt;');
                                  _description_stripedHtml = _description_stripedHtml.replace(/>/g, '&gt;');
                                  
                                  _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                                  _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');
                                  
                                  
                            
                            // ....... end ......  strip HTML from a string  .....
                            
                            
                            
                            
                            
                            
                            
                            for (var jj = 0; jj < arrayLength; jj++) {
                                
                                
                                
                                  if ((_columns_datatype_array[jj].toLowerCase() == 'location')|| 
                                      (_columns_datatype_array[jj].toLowerCase() == 'geospatial') || 
                                      (_columns_datatype_array[jj].toLowerCase() == 'point')|| 
                                      (_columns_datatype_array[jj].toLowerCase() == 'line')|| 
                                      (_columns_datatype_array[jj].toLowerCase() == 'polygon')|| 
                                      (_columns_datatype_array[jj].toLowerCase() == 'multipoint')|| 
                                      (_columns_datatype_array[jj].toLowerCase() == 'multiline')|| 
                                      (_columns_datatype_array[jj].toLowerCase() == 'multipolygon')
                                    )
                                  
                                  
                                  {
                                      
                                      _type = 'gmap';
                                      _location_field_name = _results[i].resource.columns_field_name[jj];
                                      
                                    //  console.log('_location_field_name',_location_field_name);
                                    
                                    
                                    
                                    
                                    // fix bug, utah employer list have 2 field (location_1, location_2) both are location type. 
                                    // but only location_1 have lat long value, location_2 only have human address, no lat long
                                    // ideally should identify which location field have lat long, but here returned json does not give detailed info to indentify.
                                    // so temporary fix is once have first location type, exit for loop.
                                    break;   
                                    
                                      
                                  } //if
                                    
                                    
                              }// for


                              // alternative way to verify it is tabular, gmap, table+latLng 
                        if (_results[i].resource.lens_view_type == 'tabular'){
                          _type = 'gmap';
                        }


                      /*   ------ text  -- xxx(views)  context class for mark.js highlight --------   */ 
                            html += '&nbsp;';
                            html += '<span class="context">' +  _name_stripedHtml  
                            
                                // ................  only for search.js  ( part 2, must at bottom) ................ 
                                if ((__organization == undefined) || (__organization == null)){
                                  __organization ='';
                                  } else {
                                      // add organization
                                      html +=  '<sup> '  + __organization  + '</sup>';
                                  }
                                // ................  end  ............. only for search.js ................ 
                            
                            html +=  '&nbsp;<sub><b>' 
                            html += _results[i].resource.page_views.page_views_total + '</b> views</sub>'   + '</span>';
                            html += '</br>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                      /*  ------   end   ------   text  -- xxx(views)  context class for mark.js highlight --------   */ 

                      

                    /**/ 
                    //  ............... start of  ............... gmap (rest api map)  ...............   
                      if (_type === 'gmap') {
                        // this is our map type. it is type = dataset, but with location field.
                          
  
                           //icon  original-web-page, type-icon = permalink,      tooltips = link
                           html += '<big>Map</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '">' 
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html += '</a>';

                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';
                           
                          



                          
                           // googlemap searchable rest api - new no-tab version
                           html += '<a target="_blank" href="' + url_template_base_map  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'
                           html += '<big>0</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           // googlemap searchable rest api - new no-tab version  ---- card ---- 
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'
                           html += '<big>0c</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';




                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps73/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>73</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps730/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>730</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps71/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>71</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps710/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>710</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps81/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>81</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                           html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                           // apple searchable rest api 
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','applemaps/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>A0</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           // apple searchable rest api   ---- card ---- 
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','applemaps/default2')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>A0p</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                            // bing searchable rest api 
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','bingmaps/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>B0</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                            // bing searchable rest api   ---- card ---- 
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','bingmaps/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>B0c</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
 
                             // here searchable rest api 
                             html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','heremaps/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                             html += '<big>H0</big>' 
                             html += ' </a>';
                             html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                             // here searchable rest api   ---- card ---- 
                             html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','heremaps/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                             html += '<big>H0c</big>' 
                             html += ' </a>';
                             html += '&nbsp;&nbsp;&nbsp;&nbsp;';
 
                            // mapbox searchable rest api
                            html += '<a target="_blank" href="' + url_template_base_map_2  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>M0</big>' 
                            html += ' </a>';  
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                            // mapbox searchable rest api ---- card ---- 
                            html += '<a target="_blank" href="' + url_template_base_map_2.replace('mapbox/default','mapbox/default_card')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>M0c</big>' 
                            html += ' </a>';  
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
 
 





                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                              // 41
                              html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps41/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                              html += '<big>41</big>' 
                              html += ' </a>';
                              html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                             

                            // 4
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps4/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>4</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                            // 43
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps43/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>43</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                             

                             // 413
                             html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps413/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                             html += '<big>413</big>' 
                             html += ' </a>';
                             html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                            // 471
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps471/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>471</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                          

                            // 473
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps473/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>473</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                              // 480
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps480/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>480</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                          



                            // 482
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps482/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>482</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           


                            // 487
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps487/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>487</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           

                            // 4718
                            html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps4718/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                            html += '<big>4718</big>' 
                            html += ' </a>';
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                            

                             // 4738
                           html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps4738/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                           html += '<big>4738</big>' 
                           html += ' </a>';
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                          

                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                          
                           
                           
                           

                          

                            
                           // classified dataset4  - rest api 
                           html += '<a target="_blank" href="' + url_template_base_dataset4  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T4</big>' 
                           html += ' </a>';

                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                          
                           // classified dataset24  - rest api 
                           html += '<a target="_blank" href="' + url_template_base_dataset24  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T24</big>' 
                           html += ' </a>';

                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                           // icon - for dataset  - rest api
                           html += '<a target="_blank" href="' + url_template_base_dataset  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T0</big>' 
                           html += ' </a>';

                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           
                            // icon - for dataset2  - json  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.json?accessType=DOWNLOAD
                            html += '<a target="_blank" href="' + url_template_base_dataset2  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                            html += '<big>T2</big>' 
                            html += ' </a>';
                           

                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                            // icon - for dataset3  - csv  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.csv?accessType=DOWNLOAD
                            html += '<a target="_blank" href="' + url_template_base_dataset3  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.csv'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                            html += '<big>T3</big>' 
                            html += ' </a>';
  
                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           
                          
                              
                               //  ---- arcgis connection  ----  arcConnect  ----  arcXXX   ----

                                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';
                                      
                                    
                                        // arc2000 googlemap searchable rest api - new no-tab version
                                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2000/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'
                                        html += 'arcgis<big>2000</big>' 
                                        html += ' </a>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                
                                        // arc2004 google map classified rest api googlemaps4
                                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2004/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                        html += 'arcgis<big>2004</big>' 
                                        html += ' </a>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                         // arc2113
                                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2113/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                         html += 'arcgis<big>2113</big>' 
                                         html += ' </a>';
                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                         // arc2116
                                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps2116/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                         html += 'arcgis<big>2116</big>' 
                                         html += ' </a>';
                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                        // arc5000 data reference 
                                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps5000/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                        html += 'arcgis<big>5000</big>' 
                                        html += ' </a>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                        
                                        // arc5002 data reference - field mask
                                        html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps5002/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                        html += 'arcgis<big>5002</big>' 
                                        html += ' </a>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                         // arc30 mask
                                         html += '<a target="_blank" href="' + url_template_base_map.replace('googlemaps/default','googlemaps30/default')  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">' 
                                         html += 'arcgis<big>30</big>' 
                                         html += ' </a>';
                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                              //   ----   end   ----    ---- arcgis connection  ----  arcConnect  ----  arcXXX   ----

                         /**/


                         //  ............... end of  ............... gmap (rest api map)  ............... 
                              
                              
                       } else if (_type == 'map') {
                            // ******************  shape file type   ******************  
                                          // original icon = permalink,     
                                          html += '<big>Map(shapefile)</big>' 
                                        html += '&nbsp;'     
                                        html += '<a target="_blank" href="' + _permalink + '">' 
                                        html +=      '<sup>' + _permalink +   '</sup>'    
                                        html +=  '</a>';

                                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';
  
                                          // type = map, means export GeoJson available at: 
                                          // https://data.lacity.org/api/geospatial/7aty-5ywx(page-id = resource-id)?method=export&format=GeoJSON
                                          // Note: export GeoJSON, should use resource-id, no need to find real-resource-id( SODA api endpoint)
                                          // so can do mapbox_vector, which means load full geojson at one time.
                                          // "columns_datatype" : [],  location field, type, name lost list here.
                                      
                                          // var _map_type_subset_real_ID = _results[i].resource.name + ' | ' + _results[i].resource.id + '  |real-id| >  ' +  _real_id
                                          // console.log('_real_id map type', _map_type_subset_real_ID );
                                          var _real_id = _results[i].resource.id;



                                           // ----------- dynamic real_id works   ----------- 
                                                                                  // parse html page ( via map page id) to get the real map id
                                                                                  // onclick="return myFunction();"
                                                                
                                                                                 
                   
                                                                                 //  googlemap (rest api) - new no tab version
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  googlemap (rest api) - new no tab version  ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps/default_card') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps73/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>73</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps730/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>730</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps71/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>71</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps710/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>710</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps81/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>81</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                 



                                                                                 html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 //  apple (rest api) 
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'applemaps/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>A0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  apple (rest api)   ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'applemaps/default2') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>A0p</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 //  bing (rest api) 
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'bingmaps/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>B0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  bing (rest api)   ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'bingmaps/default_card') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>B0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                 //  here (rest api) 
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'heremaps/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>H0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 //  here (rest api)   ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'heremaps/default_card') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>H0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';

  
                                                                                 // mapbox (rest api)
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map_2 +  '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>M0</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 // mapbox (rest api)  ---- card ----
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map_2.replace('mapbox/default', 'mapbox/default_card') +  '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>M0c</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 







                                                                                 html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 // 41
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps41/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>41</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                




                                                                                 // 4
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps4/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>4</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                

                                                                                 // 43
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps43/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>43</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                 // 413
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps413/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>413</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                


                                                                                 // 471
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps471/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>471</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 




                                                                                 // 473
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps473/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>473</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                

                                                                                 
                                                                                  // 480
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps480/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>480</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 


                                                                                   // 482
                                                                                   html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps482/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                   html += '<big>482</big>' 
                                                                                   html += ' </a>';
                                                                                   html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                  


                                                                                   // 487
                                                                                   html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps487/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                   html += '<big>487</big>' 
                                                                                   html += ' </a>';
                                                                                   html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                  



                                                                                 // 4718
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps4718/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>4718</big>' 
                                                                                 html += ' </a>';
                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 


                                                                                  // 4738
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps4738/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>4738</big>' 
                                                                                  html += ' </a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                                 


                                                                                 html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                                                                                 



  
                                                                                  // classified dataset4  - rest api 
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset4 + '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T4</big>' 
                                                                                  html += ' </a>';

                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                                  // classified dataset24  - rest api 
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset24 + '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T24</big>' 
                                                                                  html += ' </a>';

                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                                                                
                                                                                 // dataset 1 (rest api)  
                                                                                 // display pageView only
                                                                                 html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset + '\', \'rest\',\'' + _permalink + '\');return false;">'
                                                                                 html += '<big>T0</big>' 
                                                                                 html += ' </a>';

                                                                                 html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
  
                                                                                  // dataset 2 (json)
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset2 + '\', \'json\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T2</big>' 
                                                                                  html += ' </a>';  
                                                                                  
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                                  // dataset 3 (csv)
                                                                                  html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_dataset3 + '\', \'csv\',\'' + _permalink + '\');return false;">'
                                                                                  html += '<big>T3</big>' 
                                                                                  html += ' </a>';  
                                                                                  
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                                                           // ----------- end   -----------  dynamic real_id works   ----------- 
      

                                                                          

                                          //  -----  googlemaps_vector geojson   -----   
                                          
                                          html += '</br>';
                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                          html += '<span>geojson</span>';
                                          html += '&nbsp;&nbsp;&nbsp;';
                                          
                                                                         var _socrata_geojson_url = 'https://'+ ___domainName + '/api/geospatial/' + _real_id + '?method=export&format=GeoJSON'
  
                                                                         // encodeURI() not work,  will skip ? and &, we must replace them as   %3F (?) , %26 (&)
                                                                         // var _encoded_socrata_geojson_url  = encodeURI(_socrata_geojson_url)
                                                                         // should use replace
                                                                         var _encoded_socrata_geojson_url  = _socrata_geojson_url.replace("?", "%3F").replace("&", "%26")
                                                                         // console.log('_encoded_socrata_geojson_url  --> ', _encoded_socrata_geojson_url)
  
                                                                         html += '<a target="_blank" href="' + url_template_base_map_google_geojson  + 'url=' + _encoded_socrata_geojson_url + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                         html += '<big>92-geojson-worker</big>' 
                                                                         html += '</a>';
                                                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                         html += '<a target="_blank" href="' + url_template_base_map_google_geojson.replace('googlemaps92/default', 'googlemaps93/default')  + 'url=' + _encoded_socrata_geojson_url + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                         html += '<big>93-geojson-cors</big>' 
                                                                         html += '</a>'; 
                                                                         html += '&nbsp;&nbsp;&nbsp;&nbsp;';


  
                                          // --- mapbox_vector  geojson  --- 
                                                                                  
                                                                                  html += '<a target="_blank" href="' + url_template_base_map_3  + 'url=' + _encoded_socrata_geojson_url + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">' 
                                                                                  html += '<big>Mapbox-geojson</big>' 
                                                                                  html += '</a>';

                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                                          
                                          //............... special for arcgis/js4/esri_geojson ...............
                                                                                     
                                                                                          // & must encode as %26
                                                                                          var _full_geojson_url = 'url=https://'+ ___domainName + '/api/geospatial/' + _real_id + '?method=export%26format=GeoJSON';
  
                                                                                          // esri_geojson
                                                                                          html += '<a target="_blank" href="' + url_template_base_map_4  + _full_geojson_url  +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'  
                                                                                          html += '<big>Esri-geojson-3D-clickable</big>' 
                                                                                          html += '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                          // esri_geojson
                                                                                          html += '<a target="_blank" href="' + url_template_base_map_4.replace('geojson/geojson.html', 'geojson/geojson_popup.html')  + _full_geojson_url  +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'  
                                                                                          html += '<big>Esri-geojson-2D-popup</big>' 
                                                                                          html += '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                                                          // esri_geojson
                                                                                          html += '<a target="_blank" href="' + url_template_base_map_4.replace('geojson/geojson.html', 'geojson/geojson_v3.html')  + _full_geojson_url  +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'  
                                                                                          html += '<big>Esri-geojson-2D-popup-variant</big>' 
                                                                                          html += '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                                        //...........end ........... special for arcgis/js4/esri_geojson ...............


                                        html += '</br>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                        html += '<span>kml</span>';
                                        html += '&nbsp;&nbsp;&nbsp;'; 

                                                    html += '<a target="_blank" href="' + url_template_base_map_google_geojson.replace('googlemaps92/default', 'googlemaps95/default4')  + 'url=' + _encoded_socrata_geojson_url.replace("format=GeoJSON", "format=KML") + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                    html += '<big>95-kml-cors</big>' 
                                                    html += '</a>';
                                                    html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                     // esri_geojson
                                                     html += '<a target="_blank" href="' + url_template_base_map_4.replace("geojson/geojson", "kml/kml")  + _full_geojson_url.replace("format=GeoJSON", "format=KML") +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'  
                                                     html += '<big>Esri-kml-2D-clickable</big>' 
                                                     html += '</a>';
                                                     html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                                     // esri_geojson
                                                     html += '<a target="_blank" href="' + url_template_base_map_4.replace("geojson/geojson", "kml/kml_popup")  + _full_geojson_url.replace("format=GeoJSON", "format=KML") +'&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '&value={%22location_field%22:%22' + _location_field_name + '%22}&permalink=' + _permalink + '">'  
                                                     html += '<big>Esri-kml-2D-popup</big>' 
                                                     html += '</a>';
                                                     html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                    


                                        html += '</br>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                        html += '<span>shp</span>';
                                        html += '&nbsp;&nbsp;&nbsp;'; 
            
                                                                html += '<a target="_blank" href="' + url_template_base_map_google_geojson.replace('googlemaps92/default', 'googlemaps96/default4')  + 'url=' + _encoded_socrata_geojson_url.replace("format=GeoJSON", "format=Shapefile") + '&layer=' +_name_stripedHtml + '&permalink=' + _permalink + '">'  
                                                                html += '<big>96-shp-cors</big>' 
                                                                html += '</a>';
                                                                html += '&nbsp;&nbsp;&nbsp;&nbsp;';

                                                                

  
                                                                 /*
                                                                      // .......... static resource id, real_id, based  dataset, google mapbox rest api not works, due to socrata api change   .......... 
  
                                                                                  // go to dataset with _real_id, not resource id
                                                                                  html += '<a target="_blank" href="' + url_template_base_dataset  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '">' + '<span class="mdi mdi-text-search light-blue-text" ></span>'+ '</a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';   
  
  
                                                                                  // go to dataset with _real_id, not resource id
                                                                                  // icon - for dataset/default2  - json  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.json?accessType=DOWNLOAD
                                                                                  html += '<a target="_blank" href="' + url_template_base_dataset2  + 'url=https://'+ ___domainName + '/api/views/'+ _real_id  + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '"><span class="mdi mdi-text-search lime-text"></span></a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';   
  
  
                                                                                  // go to dataset with _real_id, not resource id
                                                                                  // icon - for dataset/default3  - csv  -- sample --- https://data.lacity.org/api/views/dm6x-gsac/rows.csv?accessType=DOWNLOAD
                                                                                  html += '<a target="_blank" href="' + url_template_base_dataset3  + 'url=https://'+ ___domainName + '/api/views/'+ _real_id  + '/rows.csv'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _real_id + '"><span class="mdi mdi-text-search pink-text"></span></a>';
                                                                                  html += '&nbsp;&nbsp;&nbsp;&nbsp;';   
                                                                                             
                                                                            // google maps                       
                                                                            html += '<a href="#" onclick="getRealMapIdLocationField_by_parentFxf(\''+ _real_id + '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map +  '\',\'' + ___domainName + '\');return false;">'+ '<span class="mdi mdi-google-maps light-blue-text"></span></a>';
                                                                               html += '&nbsp;&nbsp;&nbsp;&nbsp;';               
                                                                                                  
                                                                            // mapbox                      
                                                                            html += '<a href="#" onclick="getRealMapIdLocationField_by_parentFxf(\''+ _real_id + '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map_2 +  '\',\'' + ___domainName + '\');return false;">'+ '<span class="mdi mdi-mapbox light-blue-text"></span></a>';
                                                                              html += '&nbsp;&nbsp;&nbsp;&nbsp;'; 
  
                                                                      // ..........  end   ..........   dataset not works, due to socrata api change   .......... 
  
                                                               */
  
  
                          //  ---- arcgis connection  ----  arcConnect  ----  arcXXX   ----

                                       html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';  

                                       // arc2000 googlemap searchable rest api - new no-tab version
                                       html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2000/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                       html += 'arcgis<big>2000</big>'  
                                       html += ' </a>';
                                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                       // arc2004 google map classified rest api googlemaps4
                                       html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2004/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                       html += 'arcgis<big>2004</big>'  
                                       html += ' </a>';
                                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                       // arc2113
                                       html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2113/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                       html += 'arcgis<big>2113</big>'  
                                       html += ' </a>';
                                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                       // arc2116
                                       html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps2116/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                       html += 'arcgis<big>2116</big>'  
                                       html += ' </a>';
                                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                       // arc5000 data reference 
                                       html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps5000/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                       html += 'arcgis<big>5000</big>'  
                                       html += ' </a>';
                                       html += '&nbsp;&nbsp;&nbsp;&nbsp;';



                                        // arc5002 data reference - field mask
                                        html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps5002/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                        html += 'arcgis<big>5002</big>'  
                                        html += ' </a>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';


                                        // arc30 mask
                                        html += '<a href="#" onclick="getRealMapId(\''+ _results[i].resource.id +  '\',\'' + _name_stripedHtml +  '\',\'' + url_template_base_map.replace('googlemaps/default', 'googlemaps30/default') +   '\', \'rest\',\'' + _permalink + '\');return false;">'
                                        html += 'arcgis<big>30</big>'  
                                        html += ' </a>';
                                        html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
  
  
  
  /**/
                              
  
                                        
                                  
                     // ******************   end   ******************   shape file type   ******************  
  
  
                       } else if ((_type == 'dataset') || (_type == 'filter') || (_type == 'visualization')) {
                           
                          // table only 
                          
                            // original icon = permalink,      
                            html += '<big>Table</big>' 
                          html += '&nbsp;'     
                          html += '<a target="_blank" href="' + _permalink + '" class="hoverable lime-text">' 
                          html +=      '<sup>' + _permalink +   '</sup>'   
                          html +=  '</a>';   

                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;';

                           // classified ---- directly go to dataset 4 (rest api)
                           html += '<a target="_blank" href="' + url_template_base_dataset4  + 'url=https://'+ ___domainName + '/api/id&'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T4</big>' 
                           html += ' </a>';  
                           
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                           // classified ---- directly go to dataset 24 (rest api)
                           html += '<a target="_blank" href="' + url_template_base_dataset24  + 'url=https://'+ ___domainName + '/api/id&'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T24</big>' 
                           html += ' </a>';  
  
                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
                           
                           // directly go to dataset 1 (rest api)
                           html += '<a target="_blank" href="' + url_template_base_dataset  + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id +  '">'
                           html += '<big>T0</big>' 
                           html += ' </a>';

                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                           // directly go to dataset 2 (json)
                           html += '<a target="_blank" href="' + url_template_base_dataset2  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.json'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                           html += '<big>T2</big>' 
                           html += ' </a>';   

                           html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                            // directly go to dataset 3 (csv)
                            html += '<a target="_blank" href="' + url_template_base_dataset3  + 'url=https://'+ ___domainName + '/api/views/'+ _results[i].resource.id + '/rows.csv'     + '&layer=' +_name_stripedHtml + '&layer_id='+  _results[i].resource.id + '&permalink=' + _permalink + '">'
                            html += '<big>T3</big>' 
                            html += ' </a>';

                            html += '&nbsp;&nbsp;&nbsp;&nbsp;';
  
                       } else if (_type == 'file') {  
                         
                            // file
                            html += '<big>File</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">'
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html +=  '</a>';  
                            
  
                       } else if (_type == 'href')  {  
                         
                            // href
                            html += '<big>Link</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '">' 
                          html +=      '<sup>' + _permalink +   '</sup>'    
                          html +=  '</a>';      
  
                       } else if (_type == 'datalens') {  
                         
                          // datalens
                          html += '<big>Data Lens</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'   
                          html +=  '</a>';  
                          
                       } else if (_type == 'chart')  { 
                         
                          // chart
                          html += '<big>Chart</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html +=  '</a>';     
  
                       } else if (_type == 'story')  {  
                         
                          // story
                          html += '<big>Story</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'   
                          html +=  '</a>';  
  
                       } else if (_type == 'form')  { 
                         
                          // form
                          html += '<big>Form</big>' 
                          html += '&nbsp;'
                          html += '<a target="_blank" href="' + _permalink + '"">' 
                          html +=      '<sup>' + _permalink +   '</sup>'  
                          html +=  '</a>';   
  
                       } else {
                           // other than above type
                            console.log('Non-dataset------',_type);
                            console.log(_name_stripedHtml);
                            console.log(_results[i].resource.id);
  
                            html += '<big>Others</big>' 
                            html += '&nbsp;'
                            html += '<a target="_blank" href="' + _permalink + '"">' 
                            html +=      '<sup>' + _permalink +   '</sup>'    
                            html +=  '</a>';  
                       }

                    // +++++ end ++++++++ build link base on if have column type as location/geospatial, go to /googlemaps otherwise go to /dataset  ++++++++++

                                          html += '<br><br>';
                                          html += '</li>';
                                        }// for
                                          html += '</ol>';
                              }
                               
                            html +='</div>'
                            
                // --------- end --------- build --------------
                
            


                $('#json-renderer').html(html);



        }  


  
  
  
  
            
                    
                    
                    // if dataset type=map, you must get real map resource id from map page id.
                          // ___format : .json or .csv
                    function getRealMapId(_mapPageId, _name, _____url_template_base_map, ___format, _permalink){    
                      console.log('= clicked === mapPageId ===== ', _mapPageId)
                    //  console.log('= clicked === domain ===== ', _domain)

                    // console.log('= clicked === _mapPageUrl_permlink ===== ', _mapPageUrl_permlink)

                    // console.log('= clicked === _mapPageUrl_link ===== ', _mapPageUrl_link)



                      




                      // from mapPageId ---- get Real Map Id ---------- 
                      // https://_domain/api/views/_mapPageId.json?accessType=WEBSITE
                    // https://data.cityofchicago.org/api/views/cauq-8yn6.json?accessType=WEBSITE

                    //  "childViews" : [ "igwz-8jzy" ],   // Do not use this 

                    //"geo" : {
                    //               "bbox" : "-87.9401140825235,41.644543121506054,-87.52413710389523,42.023038586147585",
                    //               "owsUrl" : "/api/geospatial/cauq-8yn6",
                    //               "layers" : "igwz-8jzy",   // use this one.


                      var _mapPage_apiViews_url = 'https://' + ___domainName + '/api/views/' + _mapPageId + '.json?accessType=WEBSITE';



                      // Without parent_fxf, the location field assume is 'the_geom'
                      // now we do not ajax to find location field, just assume it a the 'the_geom'
                      var _real_location_field = 'the_geom';


                      $.ajax({
                          
                          timeout: _timeout,
                          url: _mapPage_apiViews_url,
                          type: 'GET',
                          dataType: "json",
                                                                    
                          async: false,     // preserve user click as trusted event, avoid popup window block by browser
                                                                    
                          success: function(_realMapId_apiViews)
                          {
                                                                        
                            var _realMapId = _realMapId_apiViews.metadata.geo.layers;
                            
                            
                            
                            //fix bug, _realMapId,  layer_id= sw3c-x2hx,ee5q-u9aq,4n9f-iihs,jnwm-mx8g,5icv-hrai,4wd4-uzr6 
                            // have multiple layer, here only get the first layer-id
                            var _realMapId_array = _realMapId.split(",");
                            
                            
                            _realMapId = _realMapId_array[0];
                            
                            
                            
                              // url_template_base_map  ----> googlemaps
                              // url_template_base_map_2  ----> mapbox
                              

                              var _url_map_view


                              switch(___format) {

                                            case 'rest':
                                              // ___format is .rest ( rest api) only 
                                                _url_map_view = _____url_template_base_map + 'url=https://'+ ___domainName + '/api/id&' + 'layer=' +_name + '&layer_id='+  _realMapId + '&value={%22location_field%22:%22' + _real_location_field + '%22}&permalink=' + _permalink
                                  
                                              break;

                                            case 'json':
                                              // ___format is .json and .csv only , working sample  http://localhost:3000/socrata/dataset2/default?url=https://information.stpaul.gov/api/views/9k7y-jzeq/rows.json&layer=Libraries%20-%20Filtered%20View&layer_id=9k7y-jzeq
                                              _url_map_view = _____url_template_base_map + 'url=https://'+ ___domainName + '/api/views/'+  _realMapId   + '/rows.' + ___format +'&layer=' +_name + '&layer_id='+  _realMapId + '&value={%22location_field%22:%22' + _real_location_field + '%22}&permalink=' + _permalink
                                    
                                              break;
                                              
                                            case 'csv':
                                                // ___format is .json and .csv only , working sample  http://localhost:3000/socrata/dataset2/default?url=https://information.stpaul.gov/api/views/9k7y-jzeq/rows.json&layer=Libraries%20-%20Filtered%20View&layer_id=9k7y-jzeq
                                              _url_map_view = _____url_template_base_map + 'url=https://'+ ___domainName + '/api/views/'+  _realMapId   + '/rows.' + ___format +'&layer=' +_name + '&layer_id='+  _realMapId + '&value={%22location_field%22:%22' + _real_location_field + '%22}&permalink=' + _permalink
                                    
                                                break;

                                            default:
                                              // code block

                              } // switch



                                    
                                    


                                    console.log('parse pageView to get real map id >>> ', _url_map_view)





                                                                              //var win = window.open(_url_map_view, '_self');
                                                                              var win = window.open(_url_map_view, '_blank');
                                                                              if (win) {
                                                                                  //Browser has allowed it to be opened
                                                                                  win.focus();
                                                                              } else {
                                                                                  //Browser has blocked it
                                                                                      // alert('Popup Window Blocked. Please allow popups for this website');


                                                                                      // open view-map modal 

                                                                                      $('#view_map_modal_content').append('<a target="_blank" href="' + _url_map_view + '">' + _url_map_view + '</a>');

                                                                                      $('#view_map_modal_open_in_new_btn').attr("href", _url_map_view);
                                                                                      $('#view_map_modal_open_in_new_btn').attr("target", "_blank");
                                                                                      $('#view_map_modal').modal('open');

                                                                              }// if else popup blocked 



                        
                                                                        
                          },// success 
                          
                          // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                          error: function (jqXHR, textStatus, errorThrown) {
                                                                        // ajax failed
                                                                          console.log('ajax error : ',jqXHR);
                                                                          var _error_status = textStatus + ' : ' + errorThrown
                                                                          $('#error_message_modal_content').text(_error_status)
                                                                          $('#error_message_modal').modal('open');
                                                                          //modal_instances.open();
                                                                      }
                          
                          

                      });  // ajax




                    } // function getRealMapId






                    /**/ 
                    //-------------- sort item by page view (socrata domain.js only) ----------------------
                    // Sort array of objects by string property value
                    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
                    

                            //_results[i].resource.page_views.page_views_total
                            function compare(a,b) {
                              if (a.resource.page_views.page_views_total < b.resource.page_views.page_views_total)
                                return 1;
                              if (a.resource.page_views.page_views_total > b.resource.page_views.page_views_total)
                                return -1;
                              return 0;
                            }
  
                      //-------------- sort item by page view  (socrata domain.js only) ----------------------
                      /**/ 
    
    





                    function getRealMapIdLocationField_by_parentFxf(_realID,_name, ______url_template_base_map, ______domainName){


                    console.log('_realID', _realID)
                    console.log('_name', _name)
                    
                    console.log('______url_template_base_map', ______url_template_base_map)
                                              



                                                //+++++++++++++++ get real id +++++++ real location field +++++++++++++++++++++++ 
                                                
                                                          


                                                            // find real location field 
                                                            //get this resource column type by
                                                            //https://api.us.socrata.com/api/catalog/v1?ids=e6cg-sqdy

                                                            var _real_resource_meta_url = 'https://api.us.socrata.com/api/catalog/v1?ids='+_realID ;
                                                          // var _real_resource_meta_url = 'https://xxxxx.xxxx.xxxx/api/catalog/v1?ids='+_realID ;

                                                            var _real_location_field = '';


                                                      

                                                          // var _real_resource_id_metadata = $.ajax({
                                                            $.ajax({
                                                                
                                                                        timeout: _timeout,
                                                                        url: _real_resource_meta_url,
                                                                        type: 'GET',


                                                                      dataType: "json",
                                                                      
                                                                      
                                                                      async: false,     // preserve user click as trusted event, avoid popup window block by browser
                                                                      
                                                                      success: function(_real_resource_id_metadata)
                                                                      {
                                                                          
                                                                          //window.open(someUrl);
                                                                          
                                                                          if (_real_resource_id_metadata.results.length > 0) 
                                                                          {
                                                                          
                                                                          
                                                                            var _real_columns_datatype_array = _real_resource_id_metadata.results[0].resource.columns_datatype;


                                                                                for (var jj1 = 0; jj1 < _real_columns_datatype_array.length; jj1++) {

                                                                                    if ((_real_columns_datatype_array[jj1].toLowerCase() == 'location')|| 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'geospatial') || 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'point')|| 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'line')|| 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'polygon')|| 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'multipoint')|| 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'multiline')|| 
                                                                                        (_real_columns_datatype_array[jj1].toLowerCase() == 'multipolygon')
                                                                                      )


                                                                                    {


                                                                                        _real_location_field = _real_resource_id_metadata.results[0].resource.columns_field_name[jj1];

                                                                                        console.log('_real_location_field',_real_location_field);



                                                                                    } //if


                                                                                }// for
                                                                          
                                                                          
                                                                          } else {
                                                                              // empty results
                                                                              
                                                                              $('#error_message_modal_content').text('Map view not available: resource meta returns 0 emtpy');
                                                                              //modal_instances.open();
                                                                              $('#error_message_modal').modal('open');
                                                                          }
                                                                          
                                                                          
                                                                          
                                                                          
                                                                          
                                                                        if (_real_location_field !== '')
                                                                        {  
                                                                          
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                   
                    var _url_map_view = ______url_template_base_map + 'url=https://'+ ______domainName + '/api/id&' + 'layer=' +_name + '&layer_id='+  _realID + '&value={%22location_field%22:%22' + _real_location_field + '%22}&permalink=' + _permalink

                                                                                console.log('_url_map_view ->  ', _url_map_view)





                                                                                        

                                                                            
                                                                                var win = window.open(_url_map_view, '_blank');
                                                                                if (win) {
                                                                                    //Browser has allowed it to be opened
                                                                                    win.focus();
                                                                                } else {
                                                                                        //Browser has blocked it
                                                                                        // alert('Popup Window Blocked. Please allow popups for this website');


                                                                                        // open view-map modal 

                                                                                        $('#view_map_modal_content').append('<a target="_blank" href="' + _url_map_view + '">' + _url_map_view + '</a>');

                                                                                        $('#view_map_modal_open_in_new_btn').attr("href", _url_map_view);
                                                                                        $('#view_map_modal_open_in_new_btn').attr("target", "_blank");
                                                                                        $('#view_map_modal').modal('open');

                                                                                }// if else popup blocked 
                                                                                
                                                                              
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                          
                                                                          }  else {
                                                                              // location_field is '' empty
                                                                              
                                                                              $('#error_message_modal_content').text('Map view not available: no geo-location field ');
                                                                              //modal_instances.open();
                                                                              $('#error_message_modal').modal('open');
                                                                          }
                                                                          
                                                                          
                                                                          
                                                                          
                                                                          
                                                                      
                                                                        }, // success 
                                                                        
                                                                        
                                                                      // error Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                                          // ajax failed
                                                                            console.log('ajax error : ',jqXHR);
                                                                            var _error_status = textStatus + ' : ' + errorThrown
                                                                            $('#error_message_modal_content').text(_error_status)
                                                                            $('#error_message_modal').modal('open');
                                                                            //modal_instances.open();
                                                                        }
                                                                        
                                                                        
                                                                        
                                                                        

                                                                      });  // ajax


                                                            
                                                                    
                                                                  
                                                        
                                                        
                                                        
                                                        
                                                  //++++++++   End +++++++ get real id +++++++ real location field +++++++++++++++++++++++ 


                    } // function getRealMapIdLocationField_by_parentFxf

















