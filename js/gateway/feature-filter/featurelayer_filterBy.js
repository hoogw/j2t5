




    
     

              zoom_to_feature_or_not = 'not_zoom2feature' //'zoom_to_feature'   // 'not_zoom2feature'
              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer 
              var backgroundFeatureLayer_layerView   // for filter feature layer
            
              var click_or_hover = 'hover'   // 'click'

              /**/
              // ----- color style setting ----- 
              /**/ 
              var native_renderer
              var symbolType_radioValue = 'native'
                /**/
              // ----- end -----  color style setting ----- 
              /**/         
              

              /**/
              //  .. - .. - ... zoom 2 feature   ... - .. - .. 
              /**/

                    // -2 means current showing not available,  -1 means total count not available
                    var current_feature_rendered = -2
                    var _classified_count_of_feature = -1;

                    var zoom2feature_noMoreThan = 20  // default
                    var zoom2feature_zoomLevel = 18  // default
                    var zoom2feature_yesNo = 'zoom2feature_automatic_zoom_level' 
                    //var zoom2feature_yesNo = 'zoom2feature_fixed_zoom_level'

                    
            /**/
            //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
            /**/
 							                
                      

              // any document ready function is in here
              dom_ready_dojo();

            // component
              
              //self-run
              (async function init_map_component_event(){ 

                // old "v i e w . xxxxxxx " must all replace with " a r c g i s M a p . xxxxxx", for example, v i e w . g r a p h i c,  v i e w . o n
                
                 
                
                
                 
                // a w a i t    a r c g i s _ i m p o r t ( ) ;
                
                arcgisMap = document.querySelector("arcgis-map")
                            arcgisMap.center = [_center_long, _center_lat]
                            arcgisMap.zoom = _center_zoom

                // component // reactive Utils . watch (
                arcgisMap.addEventListener("arcgisViewChange", (event) => {

                      console.log('arcgis View Change event',  event)
                      update_center_latLngZoom_esri_component(arcgisMap)
            
                      if (layerView){
                                  layerView.queryFeatures({
                                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                                          geometry: arcgisMap.extent,  // for component 

                                                  //outFields: layerView.availableFields,
                                                  //where: "DEW_POINT > 10"
                                                })
                                                  .then(function(results) {
                                                                              current_feature_rendered = results.features.length
                                                                              console.log("current features returned and rendered : ",  current_feature_rendered);
                                                                              update_statistic_info_vertical(current_feature_rendered , total_feature_count)                                          
                                                      })
                                                        .catch(function(error) {
                                                                              console.log("query failed: ", error);
                                                            });
                      }//if


                }); 
                  
                // component // view . when 
                // await arcgisMap.viewOnReady();
                arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {

                      // Once the map component is ready, get the feature layer and set the outFields.
                      // both works, await arcgisMap.viewOnReady();
                      createFeatureLayer()
                      init_feature_layer_view()

                      // must place after  createa feature layer, other wise view is not ready, will cause error
                      init_view_ui()
                      // if don't want google map, just delete this line
                      init_base_map_radio() 
                  
                  // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                  // pan to real location is inside function of create feature layer, at last
                   
                              
                })

               })();






               
              

              // component
               function init_view_ui(){
              
                            //  ... opacity  ...

                            if (param_overlayOpacity){
                              groundoverlay_opacity = param_overlayOpacity / 10
                            }

                            var opacity_slider = document.querySelector("#overlay_opacity_range");
                            opacity_slider.value = groundoverlay_opacity * 10

                            var opacity_value_text = document.querySelector("#opacity_value_text");
                            opacity_value_text.textContent = opacity_slider.value;
                            
                            // event handle   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                            opacity_slider.addEventListener("input", (event) => {
                              var _overlay_opacity = event.target.value;
                              opacity_value_text.textContent = _overlay_opacity
                              update_url_parameter('overlayOpacity', _overlay_opacity);
                    
                                                  groundoverlay_opacity = _overlay_opacity / 10;
                    
                                                  // update overlay opacity
                                                  backgroundFeatureLayer.opacity = groundoverlay_opacity
                            });
                            // ... end ... opacity




                   // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui


          var layerView
          
          // component
          async function createFeatureLayer(){
          


            if (backgroundFeatureLayer){
            } else {
                    backgroundFeatureLayer = new FeatureLayer({
                      url: background_layer_url,
                      outFields: "*",
                      opacity: groundoverlay_opacity,
                    });
            }


           
    
            // queryFeatureCount https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatureCount
            // How To Show Total Count  https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-show-total-count/m-p/65357
            backgroundFeatureLayer.queryFeatureCount().then(function(numFeatures){
                        // prints the total count to the console
                        console.log('total count is : ', numFeatures);
                        total_feature_count = numFeatures
                        update_statistic_info_vertical(current_feature_rendered , total_feature_count)

            });

              arcgisMap.map.add(backgroundFeatureLayer)

              layerView = await arcgisMap.whenLayerView(backgroundFeatureLayer);

             
              

               // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = backgroundFeatureLayer.renderer.clone();
                }
               

                // enforce use yellow square for point, yellow line, yellow polygon
                // must be here after featurelayer fully loaded
                enforce_yellow_linepointpolygon(backgroundFeatureLayer)





                console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                  if (zoom_to_1st_feature){
                                              // only zoom 1 time, first time, never zoom again
                                              zoom_to_1st_feature = false; 
                                              //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                              pan_to_real_location()
                  }//if  
          } 



     // component 
     // component must use e v e n t .  d e t a i l
     async function init_feature_layer_view(){



      
               // -- - - - -- - - -   mouse-move -- - - - event -- - - -  
       
                  /*
                      mouse-move will fire 100 event each time, which freeze browser, not responsive.  mouse-click don't have such problem. 
                      for best performance, place inside layerView scope,  

                        esri sample solution to improve, not solve the 100+ mouse-move event each time, 
                        https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-feature-sidepanel

                        Map flickering on mouse move, because fire 100+ mouse-move event each time, down stream operation will pile up, jamed.
                        https://community.esri.com/t5/net-maps-sdk-questions/map-flickering-on-mouse-move/m-p/542909#M6637
                  */
                        
                        // component 
                        // warning: component must use e v e n t .  d e t a i l
                        const debouncedUpdate = promiseUtils.debounce(async (event) => {
    
    

                          // component 
                          // warning: component must use e v e n t .  d e t a i l
                                      const hitTest = await arcgisMap.hitTest(event.detail, { include: backgroundFeatureLayer});
                                      let hitResult = hitTest.results.filter(function (result) {
                                                                              return result.graphic.layer === backgroundFeatureLayer;
                                                                            })
    
                                      let graphic      
                                      
                                      // && logical AND assignment,  only when hitResult[0] is truthy, same as : 
                                      // var newObjectId
                                      // if (hitResult[0]) { newObjectId = hitResult[0].graphic.attributes[backgroundFeatureLayer.objectIdField]; } else { newObjectId = undefined }
                                      var newObjectId = hitResult[0] && hitResult[0].graphic.attributes[backgroundFeatureLayer.objectIdField];
                                                          
                                       
                                      //console.log('hover new Object Id vs old object Id : ', newObjectId, objectId);
                                      // fix bug, object id could be 0,  if (0) is false, actually, 0 is real id, should be true here.
                                      //if (!newObjectId) {
                                      if (newObjectId == undefined) {
                                                                if (mouse_pointed_feature_highlight_handle){
                                                                  mouse_pointed_feature_highlight_handle.remove()
                                                                }
                                                                objectId = undefined
                                                                // hide info outline 
                                                                empty_info_outline_Tab()
                                                            
                                      } else if (objectId !== newObjectId) {
                              
                                                                if (mouse_pointed_feature_highlight_handle){
                                                                  mouse_pointed_feature_highlight_handle.remove()
                                                                }
                                                                objectId = newObjectId;
                                                                graphic = hitResult[0].graphic;
    
                                                                // if outside scope of layer View, must need get layer v  i e w. For single layer, if inside scrope, it is optional. For multi layer, even inside scope, still must get layer view
                                                                // to be safe, I always get layer view here, even it is single layer, inside scope.
                                                             
                                                                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic);
                                                               
    
                                                                console.log('newObjectId', newObjectId)
                                                                console.log(' ! * ! hit test ! * ! result ! * ! graphic ! * ! ', graphic )
                                                                show_info_outline_Tab(graphic.attributes)
                                      }//if newObjectId
                                        
    
                        
    
                      });// debounce

    //  --- highlight feature on pointer-move ---    https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
    // component // view . on ( " pointer-move " , function(event){
    arcgisMap.addEventListener("arcgisViewPointerMove", (event) => {

      console.log('a r c g i s V i e w P o i n t e r M o v e - for - h o v e r')
                  debouncedUpdate(event).catch((err) => {
                                                          if (!promiseUtils.isAbortError(err)) {
                                                            throw err;
                                                          }
                });


         
              // -- - - -  -- - - -  end  -- - - - -- - - -   mouse-move -- - - -  -- - - -  
    
          
         
        }); // view . on . hover
      }// function


             
                 




              

/**/
// ========== classified  ========== 
/**/







                  // remove all filter, show     all    feature
                  function showAll(){

                    current_selected_field_name = 'showall'
                    current_classifyFieldName = current_selected_field_name
                    current_selected_field_value = 'showall'
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                    _classified_count_of_feature = -1

                
                  update_url_parameter('select_field', -1);
                  update_url_parameter('select_fieldvalue', -1);


                 
                  $('#value_list').html('');

                  
                  // classified data only,  
                  filter_featureLayerView()
                 
                  get_classified_count_zoom_to_feature()


                  }

                  function showAll_fieldvalue(){

                  // Do not make it empty, must keep current selected field
                  //current_selected_field_name = ''
                  //current_classifyFieldName = current_selected_field_name

                  current_selected_field_value = 'showall'
                  _classified_count_of_feature = -1

                  
                  update_url_parameter('select_fieldvalue', -1);

                  // classified data only,  
                  filter_featureLayerView()
                  
                  get_classified_count_zoom_to_feature()


                  } 








                  // ( radio only )
                  async function build_value_list(_fieldName, _field_name_tag_id){
                  

                            


                            current_selected_field_value = 'showall'
                            current_selected_field_value_tag_id = -2
                            current_selected_field_name = _fieldName
                            current_classifyFieldName = current_selected_field_name
                            current_selected_field_name_tag_id = _field_name_tag_id

                            update_url_parameter('select_field', _field_name_tag_id);
                            update_url_parameter('select_fieldvalue', -1);

                            var _fieldType = field_type[_fieldName]
                            var ____fieldType_lowerCase  = _fieldType.toLowerCase();
                            /*
                            if (_fieldType){
                              //nothing to do
                            } else {
                              // field type could be undefined, by default, assign as string
                              _fieldType =  "esriFieldTypeString"
                            } 
                            */
                            console.log(' get distinct field value by field name and field type', _fieldName, _fieldType)

                            /*
                            field type  :  https://developers.arcgis.com/documentation/common-data-types/field.htm
                                                                            esriFieldTypeDate | 

                                                                            esriFieldTypeSingle | 
                                                                            esriFieldTypeInteger |
                                                                            esriFieldTypeSmallInteger | 
                                                                            esriFieldTypeDouble | 

                                                                            esriFieldTypeGeometry | 
                                                                            esriFieldTypeRaster |

                                                                            esriFieldTypeGlobalID | 
                                                                            esriFieldTypeGUID | 
                                                                            esriFieldTypeOID | 

                                                                            esriFieldTypeBlob |
                                                                            esriFieldTypeString | 
                                                                            esriFieldTypeXML
                                                                            
                            */

                            // ******************  unique value  ****************** 

                                                                        /*
                                                                            // returnDistinctValues  https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm


                                                                            returnDistinctValues = true, it returns distinct values based on the fields specified in outFields.

                                                                            *** *** warning *** ***

                                                                                                This parameter applies only if the supportsAdvancedQueries property of the layer is true. 

                                                                                                Most of time, Supports Advanced Queries:  false, will return by default 1000 record with duplicated value,

                                                                                                No matter wether distinct value or duplicated value, we all go through our process to remove duplicated value.


                                                                            *** *** end  **** *** warning *** *** 

                                                                            This parameter can be used with returnCountOnly to return the count of distinct values of subfields.
                                                                            // working example: https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/16/query?f=pjson&
                                                                                                            returnGeometry=false&
                                                                                                            returnCountOnly=false&
                                                                                                            returnDistinctValues=true&
                                                                                                            outFields=ZONE_&
                                                                                                            where=1=1


                                                                              Response:
                                                                                        {
                                                                                                                                  "displayFieldName": "ZONE_",
                                                                                                                                  "fieldAliases": {
                                                                                                                                    "ZONE_": "ZONE_"
                                                                                        },


                                                                                          "fields": [
                                                                                                                                    {
                                                                                                                                    "name": "ZONE_",
                                                                                                                                    "type": "esriFieldTypeString",
                                                                                                                                    "alias": "ZONE_",
                                                                                                                                    "length": 25
                                                                                                                                    }
                                                                                                    ],


                                                                                          "features": [
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "R1-F"
                                                                                                                                    }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "RM4"
                                                                                                                                    }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                    "attributes": {
                                                                                                                                      "ZONE_": "PE"
                                                                                                                                    }
                                                                          */



                                                                            // always use returnDistinctValues=true,  
                                                                            //    in case of not support advanced query, not support distinct value, returnDistinctValues=true will NOT cause error, just ignore this value, 
                                                                            //    but will return first 100 to 1000 (limit), may not be a completed list, may missing some distinct value.
                                                                            //    only if support distinct value, will guarantee full complete list of distinct value.
                                                                            console.log( '_supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct ---->>>>---',  _supportsAdvancedQueries , _supportsStatistics, _supportsCountDistinct , _supportsDistinct )


                                                                            

                            //  ======  ===== =======  group by  ======  ===== =======  

                                                                                                                        /*

                                                                                                                          This parameter is supported only on layers/tables that indicate supportsStatistics is true, means, "supportsAdvancedQueries": true, 
                                                                                                                          https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm
                                                                                                                          Warning:  both must used together, groupByFieldsForStatistics is valid only when the outStatistics parameter is used.
                                                                                                                                outStatistics, 
                                                                                                                                groupByFieldsForStatistics,
                                                                                                                                outStatistics =   [
                                                                                                                                                      {
                                                                                                                                                        "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                        "onStatisticField": "Field1", 
                                                                                                                                                        "outStatisticFieldName": "Out_Field_Name1"
                                                                                                                                                      },
                                                                                                                                                      {
                                                                                                                                                        "statisticType": "<count | sum | min | max | avg | stddev | var>",
                                                                                                                                                        "onStatisticField": "Field2",
                                                                                                                                                        "outStatisticFieldName": "Out_Field_Name2"
                                                                                                                                                      }  
                                                                                                                                                    ]
                                                                                                                      */
                                                                                                                                var _outStatistics = [
                                                                                                                                                        {
                                                                                                                                                          "statisticType": "count",
                                                                                                                                                          "onStatisticField": _fieldName,
                                                                                                                                                          "outStatisticFieldName": "count"
                                                                                                                                                        }
                                                                                                                                                      ]

                                                                                                                                // warning:  out statistics is object, not like other are string, you must convert object to string, then url encoded that string, before send to ajax                      
                                                                                                                                var stringified_outStatistics = JSON.stringify(_outStatistics)
                                                                                                                                var encoded_outStatistics =  encodeURIComponent(stringified_outStatistics)
                                                                                                                                console.log(' supports Statistics,  stringified out Statistics,   encoded out Statistics ==== ', _supportsStatistics, stringified_outStatistics, encoded_outStatistics)
                                                                                                                            
                                                                                                                            // _url_distinctFieldValue_groupby =  background_mapserver_url + '/'+  layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson&returnGeometry=false&returnCountOnly=false&where=1=1'
                                                                                                                            var _url_distinctFieldValue_groupby =  background_mapserver_url + '/'+  layer_id + '/query?outStatistics=' + encoded_outStatistics + '&groupByFieldsForStatistics=' + _fieldName  +'&f=pjson'
                                                                                                                            
                                                                                                                            console.log( 'render 2ndTier url group by field/count %%%%%%  group by  %%%%%% ',  _url_distinctFieldValue_groupby)



                                                                                        /**/
                                                                                        //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                        /*
                                                                                            kowning issue for esri only: 
                                                                                            groupby does not work with 'null', always get null{0}, should be null{29} if use distinct, default200, click 'null' will populate it to  null{29}
                                                                                        */
                                                                                              var _where_is_null = encodeURIComponent(_fieldName) +  encodeURIComponent(" is null or ") + encodeURIComponent(_fieldName) + encodeURIComponent("=''") 
                                                                                              var _url_esri_groupby_null_fix =  background_mapserver_url + '/'+  layer_id + '/query?' + 'where=' + _where_is_null + '&returnGeometry=false&returnCountOnly=true&outSR=4326&f=pjson'
                                                                                              console.log('_url_esri_groupby_null_fix', _url_esri_groupby_null_fix)
                                                                                              var null_count = {  "count": 'count of empty(blank or null) field' } // default 
                                                                                              try {
                                                                                                     null_count = await ajax_try_jsonp_cors_proxy_return_json_object(_url_esri_groupby_null_fix)
                                                                                              } catch {
                                                                                                     null_count = {  "count": 'ajax error 404 failed to count empty(blank or null) field' }
                                                                                                     console.log('ajax error 404 when try get null_count', null_count)
                                                                                              }
                                                                                              /*
                                                                                                      {
                                                                                                        "count": 29
                                                                                                      }
                                                                                              */
                                                                                              console.log('null_count', null_count)
                                                                                              if (null_count.hasOwnProperty('error')){
                                                                                                    null_count = {  "count": 'arcgis server error failed to execute query when count empty(blank or null) field - ' + JSON.stringify(null_count.error) }
                                                                                              }

                                                                                        /**/
                                                                                        //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                        /**/



                                                                                                                            


                              //  ======  =====  end =======    group by  ======  ===== ======= 
                                                                                                                  /**/
                                                                                                                  // ======  ===== =======    distinct  ======  ===== =======  
                                                                                                                        var _url_distinctFieldValue_distinct =  background_mapserver_url + '/'+  layer_id + '/query?outFields=' + _fieldName + '&f=pjson&returnGeometry=false&returnCountOnly=false&returnDistinctValues=true&where=1=1'
                                                                                                                        console.log( 'render 2ndTier  url <<<<<<< distinct >>>>>>> FieldValue ........  ', _url_distinctFieldValue_distinct)
                                                                                                                  // ======  =====  end  =======    distinct  ======  ===== ======= 
                                                                                                                  /**/




                                                                                            var raw_distinctFieldValue
                                                                                            // url group-by
                                                                                            raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_groupby)

                                                                                            /*
                                                                                                    error: {code: 400, message: "Unable to complete operation.", details: []}
                                                                                                            code: 400
                                                                                                            details: []
                                                                                                            message: "Unable to complete operation."

                                                                                                  warning: 
                                                                                                  
                                                                                                            will error if use oracle spatial, instead of ESRI, even supportsAdvancedQueries,supportsStatistics = true  
                                                                                                            "outStatistics arcgis not working"   https://community.esri.com/t5/arcgis-enterprise-questions/outstatistics-return-unable-to-complete-operation/td-p/456011

                                                                                                            error sample:  all navigateLA 
                                                                                                            https://maps.lacity.org/arcgis/rest/services
                                                                                                            http://localhost:10/json2tree/esri/server/folder.html?url=https%3A%2F%2Fmaps.lacity.org%2Farcgis%2Frest%2Fservices&org=Los+Angeles+CA+navigateLA&_center_lat=34.02006286055584&_center_long=-118.41204261445893&_center_zoom=16&select_folder=22&select_layer=57

                                                                                              */ 
                                                                                              console.log('raw distinct Field Value ajax by Group-by ', raw_distinctFieldValue)







                                                                                              /**/
                                                                                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                                                                                              /**/
                                                                                                                    
                                                                                              if (raw_distinctFieldValue.error) {

                                                                                                          // groupby have error, only use distict
                                                                                                                        _distinct_or_groupby = 'distinct'
                                                                                                                        update_url_parameter('distinctorgroupby', 'distinct' )
                                                                                                                        _orderby_count_or_value = 'orderby_value'
                                                                                                                        update_url_parameter('orderbycountorvalue', 'orderby_value')

                                                                                                                        // enforce order by value
                                                                                                                        $('#orderby_value').attr('checked', true)
                                                                                                                        $('#orderby_count').removeAttr('checked')
                                                                                                                        //disable this radio 
                                                                                                                        $('input[name=orderby_radio]').attr("disabled",true);
                                                                                                              

                                                                                                                        // url distinct
                                                                                                                        raw_distinctFieldValue = await ajax_try_jsonp_cors_proxy_return_json_object(_url_distinctFieldValue_distinct)
                                                                                                                        
                                                                                              } else {

                                                                                                            // groupby works, do not use distict
                                                                                                            _distinct_or_groupby = 'groupby'
                                                                                                            update_url_parameter('distinctorgroupby', 'groupby' )

                                                                                                            /**/
                                                                                                            //  ... ... .. ... esri group by null fix  ... ... .. ... 
                                                                                                            /**/
                                                                                                                var features_array_null_fix = raw_distinctFieldValue.features 
                                                                                                                var _attributes_null_fix
                                                                                                                var __field_value_null_fix
                                                                                                                for (var n = 0; n < features_array_null_fix.length; n++) { 
                                                                                                                  _attributes_null_fix = features_array_null_fix[n].attributes
                                                                                                                  __field_value_null_fix = _attributes_null_fix[_fieldName]
                                                                                                                  if (__field_value_null_fix == null){
                                                                                                                    raw_distinctFieldValue.features[n]['attributes']['count'] = null_count['count']
                                                                                                                    break // for loop
                                                                                                                  }//if
                                                                                                                }//for
                                                                                                                console.log('raw_distinctFieldValue  * * * after null fix  * * *', raw_distinctFieldValue)

                                                                                                            /**/
                                                                                                            //  ... end ... ... .. ... esri group by null fix  ... ... .. ...
                                                                                                            /**/
                                                                                              }


                                                                                              /**/
                                                                                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                                                                                              /**/

              
                                                                                              console.log( ' {{{{{{{{{{  _distinct_or_groupby  }}}}}}}}}}', _distinct_or_groupby)      
                                                                                              console.log( ' {{{{{{{{{{  distinct field value  .....  raw un-sorted  ......  }}}}}}}}}}    ', raw_distinctFieldValue)



                                                                              var real_distinct_fieldvalue_array = []


                                                                        // not works,   because it generate object {}, instead of plain element
                                                                        // remove duplicate element from array, get a new array
                                                                        // var  real_distinct_fieldvalue_SET = new Set(distinctFieldValue)
                                                                        // real_distinct_fieldvalue_array = [ ... real_distinct_fieldvalue_SET]


                                                                        // mapserver raw response,  processing, { features: [ ....... ] }
                                                                        /*
                                                                        
                                                                            features: 
                                                                                        [
                                                                                          {
                                                                                            attributes: 
                                                                                                        {
                                                                                                          ZoneName: "Parks and Recreation", 
                                                                                                          count: 60
                                                                                                          }
                                                                                          }



                                                                                          {
                                                                                            attributes: {
                                                                                                            ZoneName: "Medium High Density Residential", 
                                                                                                            count: 83
                                                                                                          } 
                                                                                          }
                                                                                        ]
                                                                        */
                                                                                        if (raw_distinctFieldValue.features) {

                                                                                          if ( raw_distinctFieldValue.features.length > 0 ) {
            
            
                                                                                                      var features_array = raw_distinctFieldValue.features
                                                                                                      var _attributes
                                                                                                      var __field_value_
            
                                                                                                      for (var l = 0; l < features_array.length; l++) { 
            
                                                                                                              _attributes = features_array[l].attributes
                                                                                                              __field_value_ = _attributes[_fieldName]
            
            
                                                                                                            
                                                                                                            
                                                                                                            if (_distinct_or_groupby == 'groupby') {
            
                                                                                                                    //  ======  ===== =======  group by  ======  ===== ======= 
            
                                                                                                                                          //real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }   
                                                                                                                                                  // indexOf method in an object array https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array/38516944 
                                                                                                                                          _index_position = real_distinct_fieldvalue_array.map(function(e) { return e[_fieldName]; }).indexOf(__field_value_);
                                                                                                                                          if (_index_position == -1 ) {
                                                    
                                                                                                                                                    real_distinct_fieldvalue_array.push(_attributes)
            
            
                                                                                                                                          } else {
            
                                                                                                                                                // found duplicated value, nothing to do 
            
                                                                                                                                          }// if 
            
            
            
            
                                                                                                            } else if (_distinct_or_groupby == 'distinct'){
            
                                                                                                                    // ======  ===== =======    distinct  ======  ===== =======  
            
            
                                                                                                                                  // real distinct array element is string  : 'dog'
                                                                                                                                if  (real_distinct_fieldvalue_array.indexOf(__field_value_) == -1 ) {
                                                                                                                                        real_distinct_fieldvalue_array.push(__field_value_)
                                                                                                                                } else {
                                                                                                                                        // found duplicated value, nothing to do 
                                                                                                                                }// if 
            
                                                                                                                                          
            
            
            
            
                                                                                                            } // supports Statistics
            
            
            
            
            
            
            
                                                                                                      
                                                                                                      } // for
            
                                                                                      
                                                                                        
                                                                                        } // if raw.length > 0
                                                                                      } // if raw
            
                                                                                    console.log( '  before sort, unique value , real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
            


                              /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/
                                                                                    console.log( ' * * * * * *  _orderby_count_or_value  * * * * * * ',  _orderby_count_or_value)
                                                                                    console.log( ' * * * * * *  _distinct_or_groupby  * * * * * * ',  _distinct_or_groupby)

                                                                                    if (_orderby_count_or_value == 'orderby_count'){


                                                                                                if (_distinct_or_groupby == 'groupby'){
                                                                                                              //  ======  ===== =======  group by  ======  ===== ======= 
                                                                                                              /**/
                                                                                                                      //   ########      ########    sort by "count"  DESC  ########      ######## 
                                                                                                                      /**/  
                                                                                                                              // real distinct array element is object  :  {  ZoneName: "Parks and Recreation", count: 60 }
                                                                                                                              console.log( '  ********* sort ~~~~~~~ count DESCending ~~~~~~~   *********-> ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                
                                                                                                                              // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                              real_distinct_fieldvalue_array.sort(
                                                                                                                                                                    function(a, b) {
                                                                                                                                                                                                
                                                                                                                                                                                    // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                                    // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                                if ( parseFloat(a['count']) < parseFloat(b['count']) ){
                                                                                                                                                                                                  return 1;
                                                                                                                                                                                                }
                                                                                                                                                                                                if ( parseFloat(a['count']) > parseFloat(b['count']) ){
                                                                                                                                                                                                  return -1;
                                                                                                                                                                                                }
                                                                                                                                                                                                return 0;
                                                                                                                                                                                    }
                                                                                                                                                                  );
                                                                                                                              console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                      //   ########    end    ########     sort by "count"  DESC  ########      ######## 
                                                                                                  } else {
                                                                                                               // can not sort, nothing to do, do not sort, because order by count must have groupby working.
                                                                                                               console.log('can not sort, nothing to do, do not sort, because order by count must have groupby working.')
                                                                                                  }// groupby





            
                                                                                  } else if (_orderby_count_or_value == 'orderby_value'){

                                             
                                                                                                   if (_distinct_or_groupby == 'distinct'){
                                                                                                                    // only for g200, g100
                                                                                                                      // ======  ===== =======    distinct  ======  ===== =======
                                                                                                                      /**/ 
                                                                                                                                    //   ########    ########    sort by field value alphabetic  ~~~~~~~  distinct url only  ~~~~~~~    ########   ######## 
                                                                                                                                     /**/ 
                                                                                                                                            // sort array ascending  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            
                                                                                                                                            var ____fieldType_lowerCase  = _fieldType.toLowerCase(); 
            
                                                                                                                                            if (____fieldType_lowerCase.includes('integer') || ____fieldType_lowerCase.includes('double') ) {
                                                                                                                                                                      
                                                                                                                                                                      // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                                                      real_distinct_fieldvalue_array.sort(
                                                                                                                                                                                                            function(a, b) {
                                                                                                                                                                                                                            return a - b;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                          );
            
                                                                                                                                            } else {
                                                                                                                                                                        // by default work on string, text, compare UTF-16, Unicode,  but not works on numeric number, expected output: Array [1, 100000, 21, 30, 4]
                                                                                                                                                                        real_distinct_fieldvalue_array.sort() 
                                                                                                                                            }
                                                                                                                                            console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                                    //   ########    end   ########    sort by field value alphabetic      ########   ######## 


                                                                                                    } else if (_distinct_or_groupby == 'groupby'){
                                                                                                                      // only for g400, g300, not for g430, g330

                                                                                                                      //   ########    ########    sort by field value alphabetic      ########   ######## 
                                                                                                                                console.log( '  ~~~~~~~  sort by field value alphabetic  ASCending ~~~~~~~  group by url only ~~~~~~~  ', real_distinct_fieldvalue_array)
                                                                                                                                                                                                                            
                                                                                                                                // only for numeric, expected output: Array [1, 4, 21, 30, 100000]
                                                                                                                                real_distinct_fieldvalue_array.sort(
                                                                                                                                                                      function(a, b) {
                                                                                                                                                                                                  
                                                                                                                                                                                      // even field type is number, however, when we ajax get result as string, we must convert string to number before compare, parseFloat(decimal)
                                                                                                                                                                                      // number use descending order, big number first, 10,9...2,1  
                                                                                                                                                                                              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                                                                                                                                                                                                  if ( a[_fieldName] < b[_fieldName] ){
                                                                                                                                                                                                    return -1;
                                                                                                                                                                                                  }
                                                                                                                                                                                                  if ( a[_fieldName] > b[_fieldName] ){
                                                                                                                                                                                                    return 1;
                                                                                                                                                                                                  }
                                                                                                                                                                                                  return 0;
                                                                                                                                                                                      }
                                                                                                                                                                    );
                                                                                                                                console.log( ' after sort ascending real distinct fieldvalue array ',  real_distinct_fieldvalue_array)
                                                                                                                      //   ########    end   ########    sort by field value alphabetic      ########   ######## 

                                                                                                    }// distinct



                                                                              } // supports Statistics
            
            
                              /**/
                              //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                              /**/




                            var value_html = '';
                            
            
                            var _node_display_text 
                            var _node_groupBy_count = '' 

                            if (real_distinct_fieldvalue_array) {
                              if ( real_distinct_fieldvalue_array.length > 0 ) {
                                  
                                    value_html += '<div>';
                                    value_html +=    '<input type="radio" id="-1" name="fieldvalue-radio"  value="' + 'Show-all' + '" checked/>'
                                    value_html +=    '<span style="font-size:large;">Show all</span>' 
                                    value_html +=    '{' + total_feature_count + '}'
                                    value_html += '</div>';
                                    
                                    for (var r = 0; r < real_distinct_fieldvalue_array.length; r++) { 


                                      var _this_field_value

                                      if (_distinct_or_groupby == 'groupby') {

                                              //  ======  ===== =======  group by  ======  ===== ======= 

                                              _node_display_text = real_distinct_fieldvalue_array[r][_fieldName] 
                                              _node_groupBy_count = ' {' + real_distinct_fieldvalue_array[r]['count'] + '}'
                                              _this_field_value = real_distinct_fieldvalue_array[r][_fieldName]

                                      } else if (_distinct_or_groupby == 'distinct'){

                                              // ======  ===== =======    distinct  ======  ===== ======= 
                                              
                                              _node_display_text = real_distinct_fieldvalue_array[r]
                                              _this_field_value = real_distinct_fieldvalue_array[r]

                                      
                                      } // supports Statistics



                                      value_html += '<div>' 
                                      value_html +=   '<input type="radio"  id="' + r + '" name="fieldvalue-radio"   value="' + _this_field_value +  '"/>';
                                      value_html +=   '<span>' + _node_display_text + '</span>'
                                      value_html +=   _node_groupBy_count;
                                      
                                      // . . . add filtered count  . . .
                                      value_html +=   '<span id="fieldvalue_count_' + r + '">' + '</span>';
                                      // . . . end  . . . add filtered count  . . .

                                      value_html += '</div>';

                                    }// for

                                    $('#value_list').html(value_html);

                                    // event
                                    $('input[name="fieldvalue-radio"]').on('change', function() {
                                      var selectedValue = $(this).val();
                                      var selectedRadioID = $(this).attr('id');
                                      current_selected_field_value_tag_id = selectedRadioID
                                      console.log("you selected value: " + selectedValue);
                                      if (selectedRadioID == '-1'){
                                        showAll_fieldvalue()
                                      } else {
                                        filter_result(selectedValue,selectedRadioID)
                                      }
                                      
                                    })


                              } else {
                                value_html +=  '<span>' + 'No Value Can Be Selected' +  '</span>' 
                                
                                $('#value_list').html(value_html);

                              }//if  
                            }//if
                           
                            

                        // must enforce update map
                     // get_map_bound()

                  }

 							    /**/
                  //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                  /**/

                                          // for 0 only, from 430, add 'orderby' radio
                                          var _orderby_count_or_value = 'orderby_count'  // default,   'orderby_value' 
                                          

                                          // for 400,430, 0 only, hybrid groupby+distinct
                                          var _distinct_or_groupby = 'groupby'    // default,    "groupby" or "distinct"
                                          var _url_distinctFieldValue_distinct 
                                          var _url_distinctFieldValue_groupby

                                          // url have 2 cases, distinct or group-by
                                          var _url_distinctFieldValue  // for 100,200,300 only

                                          function orderby_count_or_value_change_handler(){

                                                      console.log( ' ------ * * * ------ * * *  _orderby_count_or_value  * * *  ------ * * *  ------',  _orderby_count_or_value)
                                                      console.log( '  ------* * *  ------ * * *  _distinct_or_groupby  * * * ------ * * *  ------',  _distinct_or_groupby)
                                                      console.log('orderby_count_or_value_change_handler,   current_selected_field_name, current_selected_field_name_tag_id  ',  current_selected_field_name, current_selected_field_name_tag_id)

                                                      if ((current_selected_field_name == 'showall') || (current_selected_field_name_tag_id < 0)){
                                                        console.log('you have not select any field name, change order-by does not make sense, does not do anything', )
                                                      } else {
                                                        build_value_list(current_selected_field_name, current_selected_field_name_tag_id)
                                                       
                                                      }
                                            

                                          }


                  /**/
                  //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                  /**/






              /**/
              //  ... ... .. ... order by field name ( radio only ) ... ... .. ... 
              /**/

                    // only for vertial embed
                    function create_field_html(fieldNameListArray){

                          var field_html = '' 
                              
                          if (fieldNameListArray.length > 0) {
                                  // only for vertial embed                                  
                                  
                                  field_html += '<div>'
                                  field_html += '<input type="radio" id="-1" name="fieldName-radio" value="' + 'No-Filter' + '" checked/>'
                                  field_html += '<span style="font-size:large;">'  +  'No Filter'  + '</span>'
                                  field_html += '</div>'
                                 
                                  

                                  
                                 
                                  for (var i = 0; i < fieldNameListArray.length; ++i) {
                                    
                                    field_html += '<div>'
                                    field_html += '<input type="radio" id="' + i + '" name="fieldName-radio" value="' + fieldNameListArray[i] + '"/>'
                                    field_html += '<span>' + fieldNameListArray[i] + '</span>';
                                    field_html += '</div>'
                                    
                                  }// for

                                 
                                  $('#field_list').html(field_html);

                                  // event

                                  $('input[name="fieldName-radio"]').on('change', function() {
                                    var selectedValue = $(this).val();
                                    var selectedRadioID = $(this).attr('id');
                                    current_selected_field_name_tag_id = selectedRadioID
                                    update_url_parameter('select_field', current_selected_field_name_tag_id);
                                    console.log("you selected value: " + selectedValue);
                                    if (selectedRadioID == '-1'){
                                      showAll()
                                    } else {
                                      build_value_list(selectedValue,selectedRadioID)
                                    }
                                    
                                })




                          } else {
                            field_html +=  '<span>' + 'No Column Name or Field name, No Filter Can Be Select' +  '</span>' 
                            
                            $('#field_list').html(field_html);
                          }//if
                          
                         
                          // user have not select any value, by default, show this message
                          $('#value_list').html('');
                    }


                    function build_field_list(){

                                                  console.log('orderby_fieldname', orderby_fieldname)

                                                  if (orderby_fieldname == 'orderby_fieldname_default'){
                                                          // default order
                                                          console.log('field_name', field_name)
                                                          create_field_html(field_name)

                                                  } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){

                                                          // sort field name alphabetic_ascending
                                                          field_name_order_by_alphabetic_ascending = structuredClone(field_name)
                                                          field_name_order_by_alphabetic_ascending.sort();
                                                          console.log('field_name_order_by_alphabetic_ascending',  field_name_order_by_alphabetic_ascending)
                                                          create_field_html(field_name_order_by_alphabetic_ascending)

                                                  } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){

                                                          // sort field name alphabetic descending
                                                          field_name_order_by_alphabetic_descending = structuredClone(field_name)
                                                          field_name_order_by_alphabetic_descending.sort();
                                                          field_name_order_by_alphabetic_descending.reverse()
                                                          console.log('field_name_order_by_alphabetic_descending', field_name_order_by_alphabetic_descending)
                                                          create_field_html(field_name_order_by_alphabetic_descending)
                                                  }

                    }
                  

              /**/
              //  ... end ... ... .. ... order by field name ( radio only ) ... ... .. ...
              /**/







      /**/
      // ==========  end   ==========  classified  ========== 
      /**/

   












        // ++++++++++++++++  ++++++++++++++++ classified only  ++++++++++++++++  ++++++++++++++++  ++++++++++++++++ 
                    /**/

                              // . . . add filtered count  . . .
                              function update_value_list_tag_count(_tagId, _filteredTotal){

                                console.log(' ++ ++ ++ update value list tag count ++ ++ ++ ++ ++ ', _tagId, _filteredTotal)
                                var _filtered_count_tagId = '#fieldvalue_count_' + _tagId
                                if ($(_filtered_count_tagId).html()){
                                      // already has something, nothing to do
                                } else {
                                       // null, need add filtered count
                                       $(_filtered_count_tagId).html(' {~' + _filteredTotal + '~}')
                                }

                              }

                              // . . . end  . . . add filtered count  . . .
                              /**/

                              
                  
                              // classified only
                              function display_count_info(_subject, ___all_cnt,  ____classified_cnt){

                              //  ------  ---------  ------ 3 ---------  ------  --------- 

                              var _percentage_html3 = ''
                              var _percentage_float3, _percentage_integer3, _percentage_decimal3;

                                if ((____classified_cnt > 0) && ( ___all_cnt> 0)) {
                                   //_percentage3 = ((100 * ____classified_cnt) / ___all_cnt).toFixed(3)
                                   _percentage_float3 = (100 * ____classified_cnt) / ___all_cnt
                                   _percentage_integer3 = Math.floor(_percentage_float3);
                                   _percentage_decimal3 = (_percentage_float3.toFixed(3)).split(".")[1]

                                    document.getElementById('percent').innerHTML = _percentage_integer3 +  '.'  +  _percentage_decimal3 + '%' 
                                    //document.getElementById('feature-on-map').innerHTML =   
                                    document.getElementById('filter-total').innerHTML = ____classified_cnt  
                                
                                } else {
                                  document.getElementById('percent').innerHTML = '...%'
                                  //document.getElementById('feature-on-map').innerHTML = '...'
                                  document.getElementById('filter-total').innerHTML = '...'
                                }


                              }


                              function filter_result(____current___selected___field___value, _field_value_tag_id){
                             
                                
      
                                current_selected_field_value = ____current___selected___field___value
                                /**/
                                // . . . add filtered count  . . .
                                current_selected_field_value_tag_id = _field_value_tag_id
                                // . . . end  . . . add filtered count  . . .
                                /**/
      
                                console.log(" now filter by  (current selected field name =  current selected field value ) : ", current_selected_field_name,   current_selected_field_value )
      
                                update_url_parameter('select_fieldvalue', _field_value_tag_id);

                                // classified data only,  
                                filter_featureLayerView()
                                
                                get_classified_count_zoom_to_feature()
                              }




                             // classified image only, Filter feature using map image layer
                             function filter_mapImageLayer(){
                              /*
                                 Filter feature using map image layer, using a definitionExpression in order to filter a sublayer by attribute
                                   https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/filter-feature-using-map-image-layer/td-p/1062407
                                   https://developers.arcgis.com/javascript/latest/sample-code/layers-mapimagelayer-definitionexpression/
                              */

                                   console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )
                                   var mapImageLayer_sublayer_definitionExpression = ''
                                   if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

             


                                            mapImageLayer_sublayer_definitionExpression = ''
                                   } else {

                                                if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                                  mapImageLayer_sublayer_definitionExpression = current_selected_field_name + ' is null'  //"STATE_NAME is null ";
                                                } else{

                                                  // by default  where condition think it is string
                                                  mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                    
                                                  // string
                                                  if (_feature_attributes_string.includes(current_selected_field_name)){  
                                                    mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                  }
                                                  
                                                  // number (integer, double,)
                                                  if (_feature_attributes_integer.includes(current_selected_field_name)){
                                                    mapImageLayer_sublayer_definitionExpression =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                                  }

                                                  // date 
                                                  if (_feature_attributes_date.includes(current_selected_field_name)){
                                                    // need to handle date type, so far by default use string, may not work
                                                    console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                                  }

                                                } // null 
                                   }

                                   
                                          console.log('mapImageLayer_sublayer_definitionExpression  :   ',  mapImageLayer_sublayer_definitionExpression)
                                          mapimagerlayer_sub_layer.definitionExpression = mapImageLayer_sublayer_definitionExpression;
                                 
                            }


                           // classified data only,  
                             function filter_featureLayerView(){

                              console.log('filter map Image Layer, use its sublayer, by field name, field value', current_selected_field_name, current_selected_field_value )

                                let featureLayerView_filter_where = ''
                                //   *****  classified , filter by     ***** 
                                // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
                                //if ((current_selected_field_name) && (current_selected_field_value)){
                                if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

              


                                          // any showall means no filter, no search parameter
                                          featureLayerView_filter_where = '1=1'    
                                } else {
                                          
                                          //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
                                          if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                                            featureLayerView_filter_where =   current_selected_field_name + ' is null'  //"STATE_NAME is null ";
                                          } else{

                                                      // by default  where condition think it is string
                                                      featureLayerView_filter_where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                      
                                                      // string
                                                      if (_feature_attributes_string.includes(current_selected_field_name)){  
                                                        featureLayerView_filter_where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                                                      }
                                                      
                                                      // number (integer, double,)
                                                      if (_feature_attributes_integer.includes(current_selected_field_name)){
                                                        featureLayerView_filter_where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                                                      }

                                                      // date 
                                                      if (_feature_attributes_date.includes(current_selected_field_name)){
                                                        // need to handle date type, so far by default use string, may not work
                                                        console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                                                      }


                                          } // null 
                                          console.log('classified query where clause is: ', featureLayerView_filter_where )
                                }

                                if (backgroundFeatureLayer_layerView){
                                      backgroundFeatureLayer_layerView.filter = { where : featureLayerView_filter_where} 
                                } 
                                 
        
                            }
                              
        

                    // ++++++++++++++++  end ++++++++++++++++ classified only  ++++++++++++++++  ++++++++++++++++  ++++++++++++++++ 







      // .. - .. - ... zoom 2 feature   ... - .. - ..
      function get_classified_count_zoom_to_feature(){

        console.log('get classified count by field name, field value', current_selected_field_name, current_selected_field_value )

        let classified_query = backgroundFeatureLayer.createQuery();
        // fix blank/null field value,  animal_type='',  current_selected_field_value can be empty string
        //if ((current_selected_field_name) && (current_selected_field_value)){
        if ((current_selected_field_name == 'showall') || (current_selected_field_value == 'showall')){

              /**/
              // . . . add filtered count  . . .
                  if ((current_selected_field_name == 'showall')){
                    current_selected_field_name_tag_id = -2
                    current_selected_field_value_tag_id = -2
                  }
                  if ((current_selected_field_value == 'showall')){
                    current_selected_field_value_tag_id = -2
                  }
              // . . . end  . . . add filtered count  . . .
              /**/


                    // any showall means no filter, no search parameter
                    _classified_count_of_feature = -1
                    display_count_info(_layer, total_feature_count, _classified_count_of_feature)
                   
        } else {

            //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
              if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                      classified_query.where =   current_selected_field_name + ' is null'     //"STATE_NAME is null ";
            } else { 

                      // by default  where condition think it is string
                      classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                      // string
                      if (_feature_attributes_string.includes(current_selected_field_name)){  
                        classified_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                      }
                                                      
                      // number (integer, double,)
                      if (_feature_attributes_integer.includes(current_selected_field_name)){
                        classified_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                      }

                      // date 
                      if (_feature_attributes_date.includes(current_selected_field_name)){
                        // need to handle date type, so far by default use string, may not work
                        console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                      }

            } // null         
            
            console.log('classified query where clause is: ', classified_query.where )

            backgroundFeatureLayer.queryFeatureCount(classified_query)
            .then(function(numFeatures){
              // prints the total count to the console
              console.log(' -- -- **  ** classified count of feature -- -- **  ** ', numFeatures)
              _classified_count_of_feature = numFeatures
              console.log(' -- -- **  ** classified count of feature -- -- **  ** ', _classified_count_of_feature )

              // . . . add filtered count  . . .
              update_value_list_tag_count(current_selected_field_value_tag_id, _classified_count_of_feature)
              // . . . end  . . . add filtered count  . . .

              display_count_info(_layer, total_feature_count, _classified_count_of_feature)
              
            }).catch((error) => {
              console.log(' **  ** query last feature of classified return count failed **  ** ', error);                                        
            }); 




            // zoom to feature
            if (zoom2feature_yesNo == 'donot_zoom2feature'){

              // do not zoom, but still need to query filtered result currently showing on map, by trigger pan or zoom at same location, when map stationary, will calculate filtered feature on map 
              view.goTo({
                         target: view.center,
                         zoom: view.zoom,
                        });


            } else { 
              // zoom to feature by query feature layer, then get extent of the query result( not use), instead zoom to first feature result.

              let classified_1st_feature_query = backgroundFeatureLayer.createQuery();

              // query param:  https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#properties-summary
              classified_1st_feature_query.returnGeometry = true;  // only need geometry

               /*  
                              Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                              https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                              without use them, must use "where 1=1" will return max number of return count
                              if use "num" and "start", then do not use "where 1=1"

                              num:1,
                              start:0,
                          */
              //classified_1st_feature_query.num = 1;  // do not use.

              classified_1st_feature_query.outFields = ['*'];  // no need attribute, but for console log,keep it. 

              //if ((current_selected_field_value.toLowerCase() == 'null') || (current_selected_field_value.length == 0)){
              if ((current_selected_field_value == null) || (current_selected_field_value == '') || (current_selected_field_value == undefined)){
                classified_1st_feature_query.where =   current_selected_field_name + ' is null'  //"STATE_NAME is null ";
              } else{ 

                        // by default  where condition think it is string
                        classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";

                        // string
                        if (_feature_attributes_string.includes(current_selected_field_name)){ 
                                  classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   "'" + current_selected_field_value + "'"   //"STATE_NAME = 'Washington'";
                        }
                                                      
                        // number (integer, double,)
                        if (_feature_attributes_integer.includes(current_selected_field_name)){
                          classified_1st_feature_query.where =   current_selected_field_name + ' = ' +   current_selected_field_value    //"STATE_NAME = 12345 ";
                        }

                        // date 
                        if (_feature_attributes_date.includes(current_selected_field_name)){
                          // need to handle date type, so far by default use string, may not work
                          console.log('need to handle date type, so far by default use string, may not work : ', current_selected_field_name)
                        }

              } // null         
              
              console.log('classified 1st feature query where clause is: ', classified_1st_feature_query.where )

              backgroundFeatureLayer.queryFeatures(classified_1st_feature_query)
                .then(function(results){


                  console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                  // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                  var found_1_valid_geometry = false
                  for (let i = 0; i < results.features.length; i++) {
                        if (results.features[i].geometry){
                            console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                            found_1_valid_geometry = true

                            // polygon, line works fine, but point, would not zoom to point (closer), is because for point,geometry,extent is null. However polygon's geometry's extent have value. 
                            console.log('(point, extent is null) (polygon or line, extent has somevalue) test 1st geometry, type, and extent  :   ', results.features[i].geometry.type, results.features[i].geometry.extent  )
                            

                            
                                                    view.goTo(results.features[i].geometry).then(function(goto_results){

                              
                              



                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                  
                                                                                console.log('- -- - zoom now - -- -  no more than - -- -   ', view.zoom, zoom2feature_noMoreThan)
                                                                                if (view.zoom > zoom2feature_noMoreThan ){
                                                                                    // view zoom https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
                                                                                    view.goTo({
                                                                                      target: view.center,
                                                                                      zoom: zoom2feature_noMoreThan
                                                                                    });
                                                                                }//if

                                                                                // fix for ( point is always has null extent), enforce to zoom to level 20 (zoom2feature_noMoreThan)
                                                                                if (results.features[i].geometry.type == 'point'){
                                                                                  view.goTo({
                                                                                    target: view.center,
                                                                                    zoom: zoom2feature_noMoreThan
                                                                                  });
                                                                                } 

                                                                        } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                    
                                                                                                console.log(' - -- -  zoom now - -- -  fix at - -- -   ', view.zoom, zoom2feature_zoomLevel)
                                                                                                view.goTo({
                                                                                                  target: view.center,
                                                                                                  zoom: zoom2feature_zoomLevel
                                                                                                });
                                                                        }//if
                                                                })// view goto
                                                                .catch((error) => {
                                                                  console.log('-- -- go to classified 1st valid feature failed -- -- ', error);                                        
                                                                }); // view goto

                            break; // break for loop
                        }
                  }//for 
                  if (! found_1_valid_geometry){
                        console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                        // goto full extent, always works
                        view.goTo(results.features).then(function(goto_results){

                                                                        if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                                                                  
                                                                                console.log('- -- - zoom now - -- -  no more than - -- -   ', view.zoom, zoom2feature_noMoreThan)
                                                                                if (view.zoom > zoom2feature_noMoreThan ){
                                                                                    // view zoom https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#properties-summary
                                                                                    view.goTo({
                                                                                      target: view.center,
                                                                                      zoom: zoom2feature_noMoreThan
                                                                                    });
                                                                                }//if

                                                                        } else if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                                                    
                                                                                                console.log(' - -- -  zoom now - -- -  fix at - -- -   ', view.zoom, zoom2feature_zoomLevel)
                                                                                                view.goTo({
                                                                                                  target: view.center,
                                                                                                  zoom: zoom2feature_zoomLevel
                                                                                                });
                                                                        }//if
                                                                })// view goto
                                                                .catch((error) => {
                                                                  console.log('-- -- go to classified 1st valid feature failed -- -- ', error);                                        
                                                                }); // view goto
                  }//if


                }).catch((error) => {
                  console.log('-- -- query classified 1st valid feature failed -- -- ', error);                                        
                }); 
            }// zoom to feature



        } //if name




      }  
     //   ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 





 /**/
 // ****** pre select by url param ( radio only )****** 
      
            var _first_time_load_for_field = true;
            var _first_time_load_for_fieldvalue = true;
            var selected_fieldLevel_id;
            async function  pre_select_field_level(){
                    var _rightnow_url_params
                    if (_first_time_load_for_field) {

                      // only run 1 time, 1st time, get original url param from init global variable function
                       _rightnow_url_params = urlParams
                       _first_time_load_for_field = false

                    } else {
                        //  re-create instance of url params
                         _rightnow_url_params = new URLSearchParams(window.location.search);

                    }  
                            selected_fieldLevel_id = _rightnow_url_params.get('select_field');                                                  
                            console.log('selected_field_id',  selected_fieldLevel_id)
                            if ((selected_fieldLevel_id == undefined) || (selected_fieldLevel_id == null) || (selected_fieldLevel_id == '')){
                                // select folder is null, undefined, nothing to select
                            } else if (selected_fieldLevel_id == -1){

                                  showAll()
                            
                            } else {
                                  // radio 
                                  $('input[name="fieldName-radio"][id="' + selected_fieldLevel_id + '"]').prop('checked', true);
                                  var selected_fieldname = $('input[name="fieldName-radio"]:checked').val();
                                 
                                  console.log('pre select field by ',  selected_fieldname,  selected_fieldLevel_id)
                                  await build_value_list(selected_fieldname,  selected_fieldLevel_id)
                                  pre_select_fieldvalue_level()
                            }
            }

            var selected_fieldvalueLevel_id;
            function  pre_select_fieldvalue_level(){


                                  var _rightnow_url_params

                                  if (_first_time_load_for_fieldvalue) {

                                    // only run 1 time, 1st time, get original url param from init global variable function
                                    _rightnow_url_params = urlParams
                                    _first_time_load_for_fieldvalue = false

                                  } else {
                                      //  re-create instance of url params
                                      _rightnow_url_params = new URLSearchParams(window.location.search);

                                  }    



                                selected_fieldvalueLevel_id = _rightnow_url_params.get('select_fieldvalue');

                                
                                
                                console.log('selected_fieldvalue_id',  selected_fieldvalueLevel_id)

    
                                // -1 means show all, do nothing
                                if ((selected_fieldvalueLevel_id == undefined) || (selected_fieldvalueLevel_id == null) || (selected_fieldvalueLevel_id == '')){
    
                                    // select layer is null, undefined, nothing to select
                                } else if (selected_fieldvalueLevel_id == -1){

                                    showAll_fieldvalue()

                                } else {
    
                                  // radio 
                                  $('input[name="fieldvalue-radio"][id="' + selected_fieldvalueLevel_id + '"]').prop('checked', true);
                                  var selected_fieldvalue = $('input[name="fieldvalue-radio"]:checked').val();
                                 
                                    selected_fieldvalue = selected_fieldvalue.split('{')[0]
                                    selected_fieldvalue = selected_fieldvalue.trim()
                                    console.log('pre select field value by selected fieldvalue',  selected_fieldvalue)
                                    console.log('pre select field value by selected fieldvalueLevel id',   selected_fieldvalueLevel_id)
                                    filter_result(selected_fieldvalue, selected_fieldvalueLevel_id)
    
                                }



            }

// ******  end   ******  pre select by url param  ( radio only ) ****** 
/**/




                 
            





        
      

      async function dom_ready_dojo(){



        
            /**/
            //  --- esri update latlngzoom    --- 
            /**/
                  init_global_var()

            /**/
            //  --- end  ---  esri update latlngzoom    --- 
            /**/

      

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

        build_field_list()                  

                                                       
        init_user_interface_event()
        init_user_interface_for_component()
         
                          
        update_layer_name(background_layer_url, _layer)  
                          
        pre_select_field_level()                 
                          
      } // dom ready



              




      function init_background_layer(){

        // .... ... ...  background layer url .... ... ... 

                  init_global_var() 
                  // must carry these value from arcgis_common.js
                  background_mapserver_url = param_background_mapserver_url
                  layer_id  = param_layer_id
                  background_layer_url = param_background_layer_url
                  console.log(' background_mapserver_url ', background_mapserver_url)  
                  console.log(' layer_id ', layer_id)  
                  console.log(' background_layer_url ', background_layer_url) 
                  
            

      }




            




         function init_user_interface_event(){

           
                
 			         /**/
               //  --- click or hover   --- 
               /**/

                      if (param_click_or_hover){
                        click_or_hover = param_click_or_hover
                      }
                      // first time set radio
                      $("input[type=radio][name=click_or_hover_radio][value=" + click_or_hover + "]").prop('checked', true);
                      // radio change event
                      $("input[type='radio'][name='click_or_hover_radio']").change(function(){
                        click_or_hover = $("input[type='radio'][name='click_or_hover_radio']:checked").val();
                        console.log(" click_or_hover : --  ", click_or_hover);
                        update_url_parameter('clickorhover', click_or_hover);
                      });

               /**/
               //  --- end  ---  click or hover   --- 
               /**/

                




                /**/
                    //  .. - .. - ... zoom 2 feature   ... - .. - .. 
                    /**/

                          // nested function
                          function zoom2feature_change_handler(){
                                  
                            if (zoom2feature_yesNo == 'zoom2feature_fixed_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').attr('checked', true)
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              

                            } 
                            
                            if (zoom2feature_yesNo == 'donot_zoom2feature'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').attr('checked', true)
                              $('#zoom2feature_automatic_zoom_level').removeAttr('checked')
                              
                              
                            }

                            if (zoom2feature_yesNo == 'zoom2feature_automatic_zoom_level'){
                              $('#zoom2feature_fixed_zoom_level').removeAttr('checked')
                              $('#donot_zoom2feature').removeAttr('checked')
                              $('#zoom2feature_automatic_zoom_level').attr('checked', true)
                              
                              
                            }
                        
                            $('#zoom_to_no_more_than').val(zoom2feature_noMoreThan)
                            $('#zoom_to_no_more_than_label').text(zoom2feature_noMoreThan)
                            $('#zoom_to_range').val(zoom2feature_zoomLevel)
                            $('#zoom_to_label').text(zoom2feature_zoomLevel)
                    }

                    // first time init run 1 time only
                    zoom2feature_change_handler()


                    // event
                    $('input[type=radio][name=zoom2feature_radio]').on('change', function() {
                              zoom2feature_yesNo = $(this).val()
                              zoom2feature_change_handler()
                              update_url_parameter('zoom2feature_yesNo', zoom2feature_yesNo)
                    });

                    $('#zoom_to_no_more_than').on('change', function() {
                                zoom2feature_noMoreThan =  parseInt($(this).val())
                                $('#zoom_to_no_more_than_label').text(zoom2feature_noMoreThan)
                                update_url_parameter('zoom2feature_noMoreThan', zoom2feature_noMoreThan)
                    });

                    $('#zoom_to_range').on('change', function() {
                              zoom2feature_zoomLevel =  parseInt($(this).val())
                              $('#zoom_to_label').text(zoom2feature_zoomLevel)
                              update_url_parameter('zoom2feature_zoomLevel', zoom2feature_zoomLevel)
                    }); 


              /**/
              //     ... - .. - ..  end .. - .. - ... zoom 2 feature   ... - .. - .. 
              /**/







 							                /**/
                              //  .. - .. - ... order by count or value for classified only   ... - .. - .. 
                              /**/

                                   // first time,  init 
                                   if (_orderby_count_or_value == 'orderby_count'){
                                    $('#orderby_count').attr('checked', true)
                                    $('#orderby_value').removeAttr('checked')
                                  } else if (_orderby_count_or_value == 'orderby_value'){
                                    $('#orderby_value').attr('checked', true)
                                    $('#orderby_count').removeAttr('checked')
                                  } else {
                                    $('#orderby_value').removeAttr('checked')
                                    $('#orderby_count').removeAttr('checked')
                                  }

                                  // event
                                  $('input[type=radio][name=orderby_radio]').on('change', function() {
                                    _orderby_count_or_value = $(this).val()
                                    orderby_count_or_value_change_handler()
                                    update_url_parameter('orderbycountorvalue', _orderby_count_or_value)
                                  });


                            /**/
                            //  .. - .. end  - ... order by count or value for classified only   ... - .. - .. 
                            /**/








                  /**/
                  //  ... ... .. ... order by field name  ... ... .. ... 
                  /**/

                        // first time,  init 
                        if (orderby_fieldname == 'orderby_fieldname_default'){
                          $('#orderby_fieldname_default').attr('checked', true)
                          $('#orderby_fieldname_alphabetic_ascending').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_descending').removeAttr('checked')
                        } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_ascending'){
                          $('#orderby_fieldname_default').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_ascending').attr('checked', true)
                          $('#orderby_fieldname_alphabetic_descending').removeAttr('checked')
                        } else if (orderby_fieldname == 'orderby_fieldname_alphabetic_descending'){
                          $('#orderby_fieldname_default').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_ascending').removeAttr('checked')
                          $('#orderby_fieldname_alphabetic_descending').attr('checked', true)
                        }

                        // event
                        $('input[type=radio][name=orderby_fieldname_radio]').on('change', function() {
                          orderby_fieldname = $(this).val()
                          showAll()
                          build_field_list()
                          update_url_parameter('orderbyfieldname', orderby_fieldname)
                        });



                  /**/
                  //  ... end ... ... .. ... order by field name  ... ... .. ...
                  /**/







         }




                        
function show_info_outline_Tab(___properties){

    $('#info-window-div').html(json_flex_tip_viewer(___properties))
}

function empty_info_outline_Tab(){
$('#info-window-div').html("")
}
     

                 


          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 


              // arcgis common adjustment
              function update_layer_name(___layer_url, ___layer_name){

                // without link
                //$('#layer-info-vertical').html('<strong style="font-size:12px;">' + ___layer_name + '</strong>')
                // with link
                $('#layer-info-vertical').html('<a  target="_blank" href="' + ___layer_url +'">' + ___layer_name + '</a>')


              }


              function update_statistic_info_vertical(rendered, total){

                console.log(' update statistic info', rendered, total  )

                if (isNaN(rendered)){ rendered = '...' } // not available...
                if (isNaN(total)){ total = '...' } // not available...
                
                $('#feature-on-map').html(rendered)
                $('#total-feature').html(total)
              }


              function update_statistic_info_vertical_calculation(rendered, total){

                console.log(' update statistic info only for calculation  - - - : - - - ', rendered, total  )

                var funding_on_map  = '...' 
                if (isNaN(rendered)){ 
                  $('#funding-on-map').html(funding_on_map)
                } else {

                  var funding_on_map = Math.floor(Math.random() * rendered)
                  var funding_on_map_formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(funding_on_map,)
                  $('#funding-on-map').html(funding_on_map_formatted + 'M')

                }
                
              }




               // enforce use yellow square for point, yellow line, yellow polygon              
               function enforce_yellow_linepointpolygon(_this_feature_layer){



                      // for geojsonlayer, featurelayer, 
                      //================================== renderer =================================================
                      // polygon

                      var polygon_renderer = {
                        type: "simple",  // autocasts as new SimpleRenderer()
                        symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()

                          //  . . .simple fill symbol style . . .
                          style: pattern_simpleFillSymbol_esriSFS_js_api_array[current_simplefillPattern],
                          // . . . end . . . simple fill symbol style

                          color:   _default_fillColor,  
                          outline: {  // autocasts as new SimpleLineSymbol()
                            width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                            color: _default_strokeColor,

                            //  . . .simple fill symbol style . . .
                            type: "simple-line",  // autocasts as new SimpleLineSymbol()
                            style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                            // . . . end . . . simple fill symbol style
                          }
                        }
                      };




                      // line
                      var polyline_renderer = {
                        type: "simple",  // autocasts as new SimpleRenderer()
                        symbol: {
                                  //  . . .simple fill symbol style . . .
                                  type: "simple-line",  // autocasts as new SimpleLineSymbol()
                                  style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                                  // . . . end . . . simple fill symbol style


                                  color: _default_strokeColor,
                                  width:_default_strokeWeight * _thicker_wider_line_over_polygonOrPointOutline,  // no space between, for line only, thicker, wider, by multiple  

                        

                        }
                      };



                      // point
                      var point_renderer = {
                        type: "simple",  // autocasts as new SimpleRenderer()
                        symbol: {
                          type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()

                          //  . . .simple fill symbol style . . .
                          style: simpleMarkerSymbol_esriSMS_array[current_simpleMarker],
                          // . . . end . . . simple fill symbol style


                          color: _default_fillColor,
                          size: _default_pointRadius, // 10,
                        outline: {  // autocasts as new SimpleLineSymbol()
                              width:    _default_strokeWeight, // extra 3 space char, for only polygon or point outline, not for polyline
                              color: _default_strokeColor,

                              //  . . .simple fill symbol style . . .
                              type: "simple-line",  // autocasts as new SimpleLineSymbol()
                              style: pattern_simpleLineSymbol_esriSLS_js_api_array[current_outlinePattern], //"esriSLSSolid"
                              // . . . end . . . simple fill symbol style
                          }

                        }
                      };






                    console.log( ' _this_feature_layer.geometryType ......>'  , _this_feature_layer.geometryType)
                    var _geometry_type_ = _this_feature_layer.geometryType.toLowerCase()
                    if (_geometry_type_ == 'polygon') {
                                  console.log( ' _this_feature_layer.renderer ......>'  , polygon_renderer)
                                  _this_feature_layer.renderer = polygon_renderer;
                    } 

                    if ((_geometry_type_ == 'point') || (_geometry_type_ == 'multipoint')){
                                _this_feature_layer.renderer = point_renderer;
                    }   


                    if (_geometry_type_ == 'polyline') {
                                  _this_feature_layer.renderer = polyline_renderer;
                    }   




              } 
              //    . . . end  . . . enforce use yellow square for point, yellow line, yellow polygon 
              /**/  



              // -- -- -- vertial adjustment  -- -- -- 
              /**/




 





