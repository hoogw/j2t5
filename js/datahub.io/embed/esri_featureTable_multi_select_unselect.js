

//only for :  click only multiple select unselect

// only selected:  filter-By-Selection-Enabled : true, // always true, for  only selected 

//  feature table selection not enabled version, feature-Table.filter-By-Selection-Enabled  should be all comment out

// hover or click, all-in-1-page and paging, only difference is paginationEnabled: false, 



require([
  
  "esri/Map",
  "esri/views/MapView",
  
  "esri/Basemap",
  "esri/widgets/Attribution",
  
  "esri/layers/WebTileLayer",
  "esri/widgets/BasemapToggle",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",

 
  
  
  "esri/widgets/FeatureTable",
  "esri/core/Handles",
  "esri/widgets/Track",
  "esri/widgets/Locate",
  "esri/Graphic",
  
  "esri/widgets/Print",

  "esri/core/promiseUtils",
  "esri/core/reactiveUtils",

  
  
], function(
            Map, 
            MapView,

            Basemap,
            Attribution,
            
            WebTileLayer,
            BasemapToggle,
            Expand, 
            BasemapGallery, 
            
            
            
          
            FeatureTable,
            Handles,
            Track,
             Locate,
             Graphic,


            Print,
            
             promiseUtils,
            reactiveUtils,


           
            ) {
    
  // must use async, because create feature table must after create feature layer completed
  (async () => {
            

              
              // feature layer opacity
              var groundoverlay_opacity = 0.8

              var backgroundFeatureLayer  
                         
            //  --- feature table paging    ---
            var pagingFeatureTable = 'allin1page' // 'paging' 

              var filterType =  'autoSwitch' // 'selection' 'geometry' 
              var objectId; // must be global var, otherwise, highlight will not work when multiple layers
              


             




                              /**/
                              // ----- color style setting ----- 
                              /**/ 
                              var native_renderer
                              var symbolType_radioValue = 'native'
 							                 /**/
                              // ----- end -----  color style setting ----- 
                              /**/  


                              
           
 



              // any document ready function is in here
              dom_ready_dojo();

              var map = new Map({
                basemap: google_hybrid,
              });
            
              
              var view = new MapView({

              // Exclude the zoom widget from the default UI
              ui: {
                components: ["attribution"]
              },
                container: "viewDiv",
                center: [_center_long, _center_lat],
                zoom: _center_zoom,
                map: map,
              });
            

              
      
              await createFeatureLayer() // only for feature table, must await before create feature table
              init_feature_layer_view()




              // must place after  createa feature layer, other wise view is not ready, will cause error
              init_view_ui()






              /**/
              // -------------- esri feature table --------------
              /**/

               
                    var featureTable
                    var selectionIdCount = 0; // The filtered selection id count
                    // Container for temporary feature highlights based on table and view interaction.
                    var highlightHandles = new Handles(); //  --  Synchronize FeatureTable highlights and selection  --
                    var features = [];

                    
                    await createFeatureTable()


                    async function createFeatureTable(){


                      // sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-featuretable-map

                      // Make sure the layer is loaded before constructing the FeatureTable
                      await reactiveUtils.whenOnce(() => backgroundFeatureLayer.loaded);

                      // Create the feature table
                        featureTable = new FeatureTable({

                          // This property accepts and returns a collection of feature object IDs. 
                          // Use this to access and control which features are currently selected in the table and subsequently highlighted within the map. 
                          // Once an application sets a collection of object IDs, the table will select the corresponding row and highlight its feature within the map
                          // highlightIds, // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#highlightIds
                          // Push the object IDs into a collection and select
                          //featureTable.highlightIds.push(2, 3, 4);

                          // Listen for changes in the collection of highlighted features
                          //featureTable.highlightIds.on("change", (event) => {
                            //console.log("features selected", event.added);
                            //console.log("features deselected", event.removed);
                          //});
                         
                          // ESRI unfixed bug v4.31, set false for single selection does not honored,  default is true, Controls whether the table allows multiple selected rows, 
                          // this is multiple select, so set as true here 
                          multipleSelectionEnabled : true, // not working here, must set after feature table created later

                          // default is true, Indicates whether to highlight the associated feature when a row is selected by checking the corresponding checkbox,
                          highlightEnabled : true, // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#highlightEnabled


                          // default is false, means, use geometry filter 
                          filterBySelectionEnabled : false, 


                          view: view, // Required for feature highlight to work
                          layer: backgroundFeatureLayer,

                          visibleElements: {
                            // Autocast to VisibleElements   https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html#VisibleElements
                            menuItems: {
                              clearSelection: false,
                              refreshData: false,
                              toggleColumns: false,
                              selectedRecordsShowAllToggle: false,
                              selectedRecordsShowSelectedToggle: false,
                              zoomToSelection: false
                            },
                          },

                          // hover or click, all-in-1-page and paging, only difference is paginationEnabled: false, 
                          paginationEnabled: false, // true,  required to enable pagination
                          
                          attachmentsEnabled: true, // required to enable attachments
                          relatedRecordsEnabled: true, // required to enable related records
                          editingEnabled: true, // required to enable editing

                          // not use, customize column
                          //tableTemplate: { columnTemplates: [{}] },




                          //   --  customize title and description   --  
                          title: () => {
                            if (!featureTable) {
                              return;
                            }
              
                            var state = featureTable.state;
                            switch (state) {
                              case "loading":
                                return "Loading layer data...";
                              case "loaded":
                                var title = featureTable.layer?.title;
                                var rowCount = featureTable.size;
                                var selectedCount = featureTable.highlightIds?.length ?? 0;
                                return `${title} (${selectedCount} rows selected out of ${rowCount} total) loaded`;
                               
                              case "error":
                                return "Error loading layer.";

                              default:

                                var title = featureTable.layer?.title;
                                var rowCount = featureTable.size;
                                var selectedCount = featureTable.highlightIds?.length ?? 0;
                                return `${title} (${selectedCount} rows selected out of ${rowCount} total) default`;
                                
                            }
                          },
                          description: background_layer_url,
                          // --  end -- customize title and description





                          //  --  Synchronize FeatureTable highlights and selection  --   https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-featuretable-row-highlights
                          // Configuration for the ActionColumn, which can be used to display a single action for each row.
                          // In this case, an action that zooms the map to a particular feature is displayed.
                          // This allows zooming to a particular feature without changing the table's current row selection.
                          actionColumnConfig: {
                            label: "Zoom to feature",
                            icon: "zoom-to-object",
                            callback: ({ feature }) => view.goTo(feature)
                          },
                          returnGeometryEnabled: true,
                          // --  end -- Synchronize FeatureTable highlights and selection



                          // use only if you want customize what field to show or not, without it show all fields
                          //tableTemplate: { columnTemplates: [ Takes an array of FieldColumnTemplate and GroupColumnTemplate] },

                          container: document.getElementById("tableDiv"),
                          
                        });


                        // ESRI unfixed bug v4.31, set false for single selection does not honored,  default is true, Controls whether the table allows multiple selected rows, 
                        featureTable.multipleSelectionEnabled = true;
                        console.log('1st time set feature table multiple Selection Enabled as false, now check if it is false :', featureTable.multipleSelectionEnabled)



                         /**/
                        //  --  Synchronize FeatureTable highlights and selection  --
                        /**/


                                                // When the active layer changes, clear all active highlights.
                                                //featureTable.watch("layer", () => highlightHandles?.removeAll());
                                                featureTable.watch("layer", function(event){
                                                                               console.log('layer changed event , remove all highlight handles ',  event)
                                                                               remove_all_previous_highlight_handles_by_table_cell_over_event()
                                                });




                                                // Highlight a feature on the view while hovering over a cell in the table.
                                                //featureTable.on("cell-pointerover", ({ feature }) => addHighlight(feature));
                                                //featureTable.on("cell-pointerover", addHighlight)
                                                featureTable.on("cell-pointerover",  function(event){

                                                                      console.log('cell pointer OVER event , add highlight handles ', event )

                                                                      // fix bug, if previously user mouse move out cell from left side, would not trigger event to clean previous highlight handle, 
                                                                      remove_all_previous_highlight_handles_by_table_cell_over_event()
                              
                                                                      var feature = event.feature
                                                                      if (featureTable.layerView && feature) {
                                                                        console.log('cell pointer over event , highlight this feature with id ', feature.getObjectId())
                                                                        highlightHandles.add(featureTable.layerView.highlight(feature), feature.getObjectId());
                                                                      }

                                                 });
                                                



                                                // Remove any active feature highlights when no longer hovering over a cell.
                                                // In the case of moving between cells, a "cell-pointerout" event associated with the first
                                                // "cell-pointerover" will always be emitted before any subsequent "cell-pointerover" events.
                                                //featureTable.on("cell-pointerout", () => highlightHandles?.removeAll());
                                                featureTable.on("cell-pointerout",  function(event){ 
                                                                                            console.log('cell pointer . . . OUT . . . event , remove all highlight handles ',  event)
                                                                                            remove_all_previous_highlight_handles_by_table_cell_over_event()
                                                });


                                                featureTable.on("cell-click",  function(event){

                                                            console.log('cell click event , add highlight handles ', event )

                                                            // fix bug, if previously user mouse move out cell from left side, would not trigger event to clean previous highlight handle, 
                                                            remove_all_previous_highlight_handles_by_table_cell_over_event()
                    
                                                            var feature = event.feature
                                                            if (featureTable.layerView && feature) {
                                                              console.log('cell pointer over event , highlight this feature with id ', feature.getObjectId())
                                                              highlightHandles.add(featureTable.layerView.highlight(feature), feature.getObjectId());
                                                            }

                                                });



                        /**/
                        // --  end -- Synchronize FeatureTable highlights and selection
                        /**/



            //   --   --    --   if user uncheck or check feature table row, highlight id changed,  should responding in map  --   --    --               

              // - - -  in use   - - -   

                        // Check if the highlights (selection) are being changed on the table by
                        // checking and unchecking the rows,
                        // and update the features array to match the table selection by adding
                        // or removing as appropriate
                        featureTable.highlightIds.on("change", async (event) => {

                          console.log('you check or uncheck some row in feature table, trigger feature table high light Ids change event', event)




                           // If the selection is added, push all added selections to array
                           event.added.forEach((item) => {
                                                      features.push(item);
                           }); // event added item


                           event.removed.forEach((item) => {
                                                              const data = features.find((data) => {
                                                                return data === item;
                                                              });

                                                              if (data) {
                                                                features.splice(features.indexOf(data), 1);
                                                              }


                                                              // Check if there are no more selected rows in the table,
                                                              // Once everything is unchecked, remove the filter for selected records
                                                              if (featureTable.highlightIds.length === 0) {

                                                                if (filterType == 'autoSwitch'){
                                                                  featureTable.filterBySelectionEnabled = false;
                                                                }

                                                                // fix bug, user uncheck the row(last feature selected by user previously click feature on map), highlighted on map would not de-highlighted.
                                                                empty_info_outline_featureTable()
                                                            
                                                              }// if highl light 0



                           }); // event removed item

                         
                        }); // feature table high light Ids change event

            //  --   -- end  --   --  - - -  in use   - - - 


            

   //   --   --    --   end  --   --    --   if user uncheck or check feature table row, highlight id changed,  should responding in map  --   --    --    




                /**/
                //  --- feature table paging    --- 
                /**/



                        // first time set radio, only 1 time
                        if (pagingFeatureTable == 'allin1page'){
                          featureTable.paginationEnabled = false;
                        } else {
                          featureTable.paginationEnabled = true;
                        }


                /**/
                //  --- end  ---  feature table paging    --- 
                /**/




                // first time set radio, only 1 time
                 switch (filterType) {
                  case 'selection':
                    featureTable.filterBySelectionEnabled = true;
                    break;
                  case 'autoSwitch':
                    featureTable.filterBySelectionEnabled = false;
                    break;
                  case 'geometry':
                    featureTable.filterBySelectionEnabled = false;
                    break;
                  default:
                    console.log(`Sorry, we are out of ${filterType}.`);
                }

             }// function



                    function remove_all_previous_highlight_handles_by_table_cell_over_event() {
                      if (highlightHandles){
                        highlightHandles.removeAll()
                      } else {
                        console.log('No previous highlight handles, nothing remove ')
                      }
                    }


              /**/
              //  -------------- end  -------------- esri feature table --------------
              /**/




              /**/
              //  --- feature table field selector     --- 
              /**/

              var _fields_array
              var _fieldmask_field_need_remove_array = []
              var _fieldmask_all_field_array = []

              await createFieldSelector()


              async function createFieldSelector(){

                console.log('create field selector', featureTable.columns)

                var _fields_array = featureTable.columns.toArray()
                console.log('create field selector - to array ', _fields_array)


                // .... check all  .... uncheck all  .... 

                      var _fieldmask_html = ''
                      _fieldmask_html +=       '<input type="checkbox" value="check_all_field" name="check_all_field" id="check_all_field" checked/>'
                      _fieldmask_html +=       '<strong>Show All Columns</strong>'
                      _fieldmask_html += '&nbsp;&nbsp;&nbsp;'

                // ....  end   ....  check all  .... uncheck all  ....


                for (var i = 0; i < _fields_array.length; i++) {
                                          
                  
                  // fix bug, the last array item, don't have field, because its field name is EsriFeatureTableActionColumn
                  if (_fields_array[i].field){

                        var ____fieldDisplayName = _fields_array[i].fieldName
                        var ____fieldType = _fields_array[i].field.type
                        var ____fieldName = _fields_array[i].field.name
                        _fieldmask_all_field_array.push(____fieldName)

                    
                        
                        _fieldmask_html +=       '<input type="checkbox" value="' + ____fieldName + '" name="each_field" id="each_field_' + i + '" checked/>'
                        _fieldmask_html +=       '<span style="font-size:13px;">' + ____fieldName  + '</span>'

                        // full version with display name, type
                        //_fieldmask_html +=       '<sup>' + '<b>' + '&nbsp;' + ____fieldDisplayName +  '</b>'  + '<sup><small class="fieldType">' + '&nbsp;' + ____fieldType + '</small></sup>' + '</sup>'
                        // simple version without display name, type
                       
                        _fieldmask_html += '&nbsp;&nbsp;&nbsp;'
                
                  }//if


                }//for   

             
                  var _fieldmask_div_tag = document.getElementById("fields-mask-div")
                  _fieldmask_div_tag.innerHTML = _fieldmask_html



                  // add check event 
                    $('#check_all_field').on('click', checkAllFields)
                    
                    for (var i = 0; i < _fields_array.length; i++) {
                        // fix bug, the last array item, don't have field, because its field name is EsriFeatureTableActionColumn
                        if (_fields_array[i].field){
                          $('#each_field_' + i).on('click', uncheckEachFields)
                        }//if
                    }//for   

                  // - end - add check event 

            }




              // click top check-all
              function checkAllFields(check, toBeChecked) {

                console.log('check All Fields clicked, ', check)
                console.log(' check All Fields checkbox current status ', $(check.currentTarget).prop("checked") ) 

                // fix bug, 
                check = check.currentTarget
                

                var toBeChecked = "each_field"

                $("input[name="+toBeChecked+"]").prop('checked', $(check).prop("checked"));
               

                if ($(check).prop("checked")) {
                  // check all checked
                  _fieldmask_field_need_remove_array = []
                } else {
                  // uncheck all
                  _fieldmask_field_need_remove_array = _fieldmask_all_field_array
                }

                configFeatureTableColumns()
                
              };

              // click each field
              function uncheckEachFields(check, parentCheck) {

                        console.log('uncheck Each Fields ', check)

                        var parentCheck = 'check_all_field'

                        $('#'+parentCheck+'').prop('checked', false);
                        // must add 'checked' attribute to checkbox tag
                        //$(check).prop("checked", (($(check).is(":checked"))))
                         $(check).attr('checked', (($(check).is(":checked"))) )

                        //Check if checkbox is checked with jQuery https://stackoverflow.com/questions/2204250/check-if-checkbox-is-checked-with-jquery
                        //var $boxes = $('input[name=each_field]:checked');
                        // find what is unchecked.     https://stackoverflow.com/questions/8465821/find-all-unchecked-checkboxes-in-jquery
                        var $boxes = $('input[name=each_field]:not(:checked)');

                        // console.log(' you clicked ', check ,' ...  checked field are .... ', $boxes.length, $boxes)
                        _fieldmask_field_need_remove_array = []
                      
                        // loop through see what field is unchecked, will be remove later
                        $boxes.each(function(){
                          console.log('unchecked only',this.value, this.id,  this)
                          _fieldmask_field_need_remove_array.push(this.value)
                        });

                        configFeatureTableColumns()
                        
              }




              function configFeatureTableColumns(){

                  // always initially show all columns
                  featureTable.showAllColumns()

                  // then remove hide some columns 
                  for (let i = 0; i < _fieldmask_field_need_remove_array.length; i++) {
                    featureTable.hideColumn(_fieldmask_field_need_remove_array[i])
                  }//for
              }


              



      /**/
      //  --- end  ---  feature table field selector   --- 
      /**/



             




          function init_view_ui(){
              
                // remove following widget
                view.ui.remove(["zoom", "attribution"]);


                  /**/ 
                  // = = = = = . . . attribution . . .  = = = = =

                  const attribution_widget = new Attribution({
                                                              view: view,
                                                              id: "attribution-id",
                                                              },
                                                           "attribution-outside-of-map-div" 
                                              );

                  
                  // = = = = =  end . . . attribution . . .  = = = = =
                  /**/ 


                
                     
                // ===== ========= ======== ====== track current location ===== ========= ======== ====== 
                      // https://developers.arcgis.com/javascript/latest/sample-code/widgets-track-basic/
                      
          // not use track, because it keep zoom in to user's location
          //const track = new Track({
          const locate = new Locate({
               icon: "pin-tear-f",   //  "compass-north-circle", (default)
              
              // Zoom level to scale converter https://developers.arcgis.com/documentation/mapping-and-location-services/reference/zoom-levels-and-scale/
              scale: 564,  // zoom level 20 = 564,  By default, the view will navigate to a scale of 2500 for 3D and 4514 for 2D
               


              // Overwrite the default symbol used for the graphic placed at the location of the user
              graphic: new Graphic ({
                symbol: {
                  // autocasts as new SimpleMarkerSymbol()
                  type: "simple-marker",
                  size:  locator_size,  // all works "31pt", "31px",
                  style: locator_style,  // diamond, triangle, cross, x, circle, path, square
                  color: locator_color,   //"blue",
                  // autocasts as new SimpleLineSymbol()
                  outline: {
                    // simple marker builder, https://sagewall.github.io/symbol-builder/simple-marker-symbol/
                    color: locator_outlineColor,  //"#efefef",
                    width: locator_outlineWidth,
                  }
                }
              }),


                        view: view
                      });
                      view.ui.add(locate,  "bottom-right");
                    // ===== =========   end  ======== ====== track current location ===== ========= ======== ====== 


                        
                   //=================== toggle basemap ============================

                        
                        // ESRI Well Known Basemap Ids https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
                        // https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/what-are-esri-well-known-basemap-ids/td-p/759266
                        const base_map_source_array = [
                          google_hybrid, 
                          microsoft_hybrid,
                          here3_hybrid,
                          mapbox_hybrid,
                          Basemap.fromId("hybrid"),  // esri base map id 
                          //nearmap_tile,
                          open_street_map,
                        ];

                        console.log('base_map_source_array', base_map_source_array)

                        const basemapGallery = new BasemapGallery({
                            source: base_map_source_array,
                            view: view,
                            container: document.createElement("div")
                          });

                          // Create an Expand instance and set the content
                          // property to the DOM node of the basemap gallery widget

                          const bgExpand = new Expand({
                            collapseIcon: "arrow-bold-right",
                            expandIcon: "arrow-bold-left",
                            collapseTooltip: "Close Options",
                            expandTooltip: "Open Back Ground Map Options",
                            

                            view: view,
                            content: basemapGallery
                          });

                          // Add the expand instance to the ui
                          view.ui.add(bgExpand, "bottom-right");

                    //========  end =========== toggle basemap ============================

               
         // init set all esri widget opacity
                   set_my_widget_opacity()
                   init_esri_widget_opacity()
                   // all ui need set opacity


              }// init ui





                       
  


          
          async function createFeatureLayer(){
          const [FeatureLayer] = await $arcgis.import(["@arcgis/core/layers/FeatureLayer.js"]);

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

              map.add(backgroundFeatureLayer)

              view.whenLayerView(backgroundFeatureLayer).then(function(layerView){

                // enforce use yellow square for point, yellow line, yellow polygon
                // must be here after featurelayer fully loaded
                enforce_yellow_linepointpolygon(backgroundFeatureLayer)



               

            // - - - when map stop moving, update total count of feature show on map  - - -

              /* not use layer view watch update event, 
                because even mouse move on a feature, also fire this event, should only fire when map stop moving, 
                view.drag view.mouse-wheel(zoom) also don't work, because they fire too many event at each move, should just fire 1 time.

                layerView.watch("updating", function(value){

                  console.log(" watch layer view updating event ", value);
                  if (!value) {

                    layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,


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


                });// layer view watch

              */

              // not use, because every map move, tigger 2 time, 1st is begining position, 2nd is ending position
              //view.watch("stationary", function (isStationary) {

              // in use, sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=watch-for-changes-reactiveutils
              // Use reactiveUtils to check when the extent changes. We include view.stationary so we only show a message, when the view is not moving.
              reactiveUtils.watch(
                () => [view.stationary, view.extent, view.scale],
                ([stationary, extent, scale], [wasStationary]) => {
                 if (stationary) {      
                         console.log('stationary happened, current extent ', extent)

                           /**/
                           // -------------- esri feature table --------------
                           /**/
                                  // Filter out and show only the visible features in the feature table.
                                  featureTable.filterGeometry = view.extent;

                           /**/
                           //  -------------- end  -------------- esri feature table --------------
                           /**/

                                                             
                         layerView.queryFeatures({
                          // from v 4 . 3 3 ,  To only return features visible in the view, set the geometry parameter in the query object to the view's extent.
                          // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#queryFeatures
                          geometry: view.extent,

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











          
                 } else if (wasStationary) {
                                              // nothing to do
                                              console.log(' was stationary , nothing to do, ')
                                            }
                 return "";
               }
             );//  reactiveUtils.watch


    //  - - - end - - - when map stop moving, update total count of feature show on map  - - -





                //  configuring the layer view 's highlight color (when mouse point feaeture) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html#highlight
                layerView.highlightOptions = {

                  // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#HighlightOptions
                  color: featureLayerView_higlightOption_fillColor,  // [255, 255, 255, 0.92],
                  haloColor: featureLayerView_higlightOption_haloColor,  // [223, 255, 0, 0.95],
                  haloOpacity: featureLayerView_higlightOption_haloOpacity,  // 0.9,  // default is 1
                  fillOpacity: featureLayerView_higlightOption_fillOpacity, // 0.6
                };

               
            });// view . when

  


          } 





                          function pan_to_real_location(){

                                                                  /*
                                                                  Do not Zoom to extent of all features, bad idea, slow, bulky,  https://developers.arcgis.com/javascript/latest/sample-code/featurelayer-queryextent/
                                                                  only zoom to first feature, good idea, fast, neat
                                                                  does not matter you add feature layer to map or not, it can alway zoom to 1st feature
                                                                  */
                                                                  const  query1stFeature = {
                                                                    
                                                                           // query object https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html
                                                                           where: '1=1',  // return max count of return feature
                                      
                                                                           /*  
                                                                                Do not use "num" and "start", because if use any of them, will require 'paging', however, if shapefile as source, 'paging' will not be supported, will get error failed query due to paging not supported
                                                                                https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-Query.html#num
                                                                                without use them, must use "where 1=1" will return max number of return count
                                                                                if use "num" and "start", then do not use "where 1=1"
                                      
                                                                                num:1,
                                                                                start:0,
                                                                           */
                                      
                                                                           returnGeometry:true,
                                                                         }
                                                  
                                                                         backgroundFeatureLayer
                                                                         .queryFeatures(query1stFeature)
                                                                         .then((results) => {
                                                                                               console.log("zoom to 1st valid feature, if not find valid, zoom to all feature array(full extent) : ",results.features)
                                                                                               // goto(geometry) https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
                                                                                               var found_1_valid_geometry = false
                                                                                               for (let i = 0; i < results.features.length; i++) {
                                                                                                 if (results.features[i].geometry){
                                                                                                  console.log(' go to the 1st valid feature, index, geometry  ', i, results.features[i].geometry)
                                                                                                  found_1_valid_geometry = true
                                                                                                  
                                                    view.goTo(results.features[i].geometry)
                                                                                                  break; // break for loop
                                                                                                 }
                                                                                               }//for 
                                                                                               if (! found_1_valid_geometry){
                                                                                                  console.log('not find a valid feature geometry, so zoom to all features array (full extent)')
                                                                                                  // goto full extent, always works
                                                                                                  view.goTo(results.features); 
                                                                                               }
                                                                         })
                                                                         .catch(function(error) {
                                                                                               console.log('failed to zoom to any feature ', error); 
                                                                         }); 
                                                                                                                         
                                                  
                          }  
                            




  
  
  


                               






        
      var graphic_object_indexAsKey = {} 
      function init_feature_layer_view(){




        // possible event, https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#events-summary , https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
        view.on("click", function(event){

          console.log(' view * click * fire 1 time is fine , hit test ')
        

              view.hitTest(event).then(function(response){

                if (response.results.length) {

                   let hitResult = response.results.filter(function (result) {
                           return result.graphic.layer === backgroundFeatureLayer;
                   })

                   console.log(' ! * ! hit test ! * ! click ! * ! hitResult hitResult hitResult ', hitResult )

                   graphic_object_indexAsKey = {} 
                   let graphic                                                        
                   if (hitResult[0]){
                                                  var multiple_layer_properties_html = ''
                                                  var __layer_name
                                                  var ___properties

                                                  for (let _index = 0; _index < hitResult.length; _index++) {

                                                      graphic = hitResult[_index].graphic;
                                                      graphic_object_indexAsKey[_index] = graphic
                                                      console.log(' ! * ! hit test ! * ! result ! * ! add graphic by index ! * ! ', _index, graphic )

                                                     

                                                      
                                                      
                                                       /**/
                                                      // -------------- esri feature table --------------
                                                      /**/
                                                            var newObjectId = graphic.attributes[backgroundFeatureLayer.objectIdField];

                                                            console.log(' you click, new object id is ', newObjectId )
                                                            console.log(' you click, old object id is ', objectId )
                                                            
                                                            show_info_outline_featureTable(newObjectId)
                                                      /**/
                                                      //  -------------- end  -------------- esri feature table --------------
                                                      /**/

                                                  }//for
                     } 

                    // by default, always highlight (first index 0) graphic,   only, not others
                    if (graphic_object_indexAsKey[0] && graphic_object_indexAsKey[0].layer){
                          if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
                          }
                          mouse_pointed_feature_highlight_handle = layerView.highlight(graphic_object_indexAsKey[0]);
                    }// if




                } else {

                     // hit test do not find anything.
                     /**/

                     // remove highlight graphic on layer view
                     if (mouse_pointed_feature_highlight_handle){
                            mouse_pointed_feature_highlight_handle.remove()
                     }

                     // hide info outline 
                     empty_info_outline_Tab()


                  
                }// if response results length







              }); // view . hit test

         

         }); // view . on . click


        //  --  Synchronize FeatureTable highlights and selection  -- 
        //only for table cell over event, cell over or out interaction has bug, if cell out from left side, failed to trigger clean event,
         view.on("pointer-move", function(event){
          // view event https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#on
          remove_all_previous_highlight_handles_by_table_cell_over_event()
         });
        // --  end -- Synchronize FeatureTable highlights and selection

                               
      }// function




  



                      

               
                                          
                 
                 
             


      
               
/**/
//  --- google as basemap   --- 
/**/

    var google_hybrid
    var microsoft_hybrid
    var here3_hybrid
    var mapbox_hybrid
    var nearmap_tile
    var open_street_map
    
   
    function init_base_map(){

          // Google Hybrid
          google_hybrid = new Basemap({
            baseLayers: [new WebTileLayer({
              // also work   https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}
              urlTemplate : "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}", 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Google Hybrid with Label ",
              id: "layerID_google_hybrid",
              title: "Google",
            })],
            id: "basemapID_google_hybrid",
            title: "Google",
            thumbnailUrl: "../../public/images/google1000.png",
          });




          
          // microsoft hybrid
          var microsoft_tile_url = 'https://atlas.microsoft.com/map/tile?'
          microsoft_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          microsoft_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          microsoft_tile_url +=  '&tilesetId=' + 'microsoft.imagery'  // no label
          microsoft_tile_url +=  '&x={x}' + '&y={y}' + '&zoom={z}'
          microsoft_tile_url +=  '&tileSize=256'

          var microsoft_label_tile_url = 'https://atlas.microsoft.com/map/tile?'
          microsoft_label_tile_url +=  'subscription-key=' + microsoft_azure_primary_key_public 
          microsoft_label_tile_url +=  '&api-version=2024-04-01'
          // raster or vector tile set id is here https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tile?view=rest-maps-2025-01-01&tabs=HTTP#tilesetid
          // must be raster(png), can not be vector(pbf)
          microsoft_label_tile_url +=  '&tilesetId=' + 'microsoft.base.labels.road'  // no label
          microsoft_label_tile_url +=  '&x={x}' + '&y={y}' + '&zoom={z}'
          microsoft_label_tile_url +=  '&tileSize=256'

          microsoft_hybrid = new Basemap({


             baseLayers: [
              

              // saterlite only, no label
              new WebTileLayer({
                urlTemplate : microsoft_tile_url, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                
                id: "layerID_microsoft_hybrid",
                title: "Microsoft",
              }), 
          
              // label only 
              new WebTileLayer({
                urlTemplate : microsoft_label_tile_url, 
                copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + "Microsoft Hybrid ",
                
                id: "layerID_microsoft_label",
                title: "Microsoft label",
              }), 
          
          
          
          ],
            
            id: "basemapID_microsoft_hybrid",
            title: "Microsoft",
            thumbnailUrl: "../../public/images/microsoft300.png",
          });
          //  . .  end . . . . microsoft hybrid



          
          

        // . . . . here hybrid . . . .
        here3_hybrid = new Basemap({
          baseLayers: [new WebTileLayer({
            urlTemplate : here_v3_hybrid_raster, 
            copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Here WeGo Hybrid with Label ",
            id: "layerID_here3_hybrid",
            title: "Here raster v3 hybrid with label Layer",
          })],
          id: "basemapID_here3_hybrid",
          title: "HereMap",
          thumbnailUrl: "../../public/images/here256.png",
        });




          // . . . . . . mapbox . . .. . .
          mapbox_hybrid = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : mapbox_satellite_raster, 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Mapbox Hybrid ",
              id: "layerID_mapbox_hybrid",
              title: "Mapbox",
            })],
  
            id: "basemapID_mapbox_hybrid",
            title: "Mapbox",
            thumbnailUrl: "../../public/images/mapbox001.png",
          });
          // . .  end . . . . mapbox . . .. . .



          // . . . nearmap only . . .
          nearmap_tile = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : nearmap_xyz, 
              copyright: "&#169;" + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1) + " Nearmap no Label ",
              id: "layerID_nearmap",
              title: "Nearmap no Label Layer",
            })],

            id: "basemapID_nearmap_no_label",
            title: "NearMap",
            thumbnailUrl: "../../public/images/nearmap000.png",
          });
           //  . . . end . . . nearmap only . . .
      
          


        // . . . . open street map  . . . .
          open_street_map = new Basemap({
            baseLayers: [new WebTileLayer({
              urlTemplate : "http://tile.openstreetmap.org/{z}/{x}/{y}.png", 
              copyright: "Open Street Map " + (new Date().getFullYear()) + '.' + (new Date().getMonth() + 1),
              id: "layerID_open_street_map",
              title: "Open Street Map Layer",
            })],

            id: "basemapID_open_street_map",
            title: "OpenStreetMap",
            thumbnailUrl: "../../public/images/openstreetmap002.png",
          });



        }// function

/**/
//   --- end  ---   --- google as basemap   --- 
/**/                      
                 
                 
             


      async function dom_ready_dojo(){

        init_base_map()

        init_background_layer()
        // must await
        await get_feature_attributes(background_mapserver_url, layer_id)

                         

                                                       
                          init_user_interface_event()
                          
                          update_layer_name(background_layer_url, _layer)         
                          
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
               //  --- feature table paging    --- 
               /**/

                      if (param_pagingFeatureTable){
                        pagingFeatureTable = param_pagingFeatureTable
                      }

                      
                      // first time set radio
                      $("input[type=radio][name=pagingFeatureTable_radio][value=" + pagingFeatureTable + "]").prop('checked', true);
                      



                      // radio change event
                      $("input[type='radio'][name='pagingFeatureTable_radio']").change(function(){

                        pagingFeatureTable = $("input[type='radio'][name='pagingFeatureTable_radio']:checked").val();

                        if (pagingFeatureTable == 'allin1page'){
                          featureTable.paginationEnabled = false;
                        } else {
                          featureTable.paginationEnabled = true;
                        }
                        
                        console.log(" pagingFeatureTable : --  ", pagingFeatureTable);
                        update_url_parameter('pagingfeaturetable', pagingFeatureTable);
                      });

              /**/
              //  --- end  ---  feature table paging    --- 
              /**/
           
                
 			         /**/
               //  --- filter type   --- 
               /**/

                      if (param_filterType){
                        filterType = param_filterType
                      }


                      // first time set radio
                      $("input[type=radio][name=filterType_radio][value=" + filterType + "]").prop('checked', true);
                      



                      // radio change event
                      $("input[type='radio'][name='filterType_radio']").change(function(){

                        filterType = $("input[type='radio'][name='filterType_radio']:checked").val();

                        switch (filterType) {
                          case 'selection':
                            featureTable.filterBySelectionEnabled = true;
                            break;
                          case 'autoSwitch':
                            featureTable.filterBySelectionEnabled = false;
                            break;
                          case 'geometry':
                            featureTable.filterBySelectionEnabled = false;
                            break;
                          default:
                            console.log(`Sorry, we are out of ${filterType}.`);
                        }
                        
                        console.log(" filterType : --  ", filterType);
                        update_url_parameter('filtertype', filterType);
                      });

               /**/
               //  --- end  ---  filter type   --- 
               /**/








              /**/
              //  --- feature table multi button     --- 
              /**/

              $( "#refresh_btn" ).on( "click", function() {
                featureTable.refresh();
              } );
              $( "#clearSelection_btn" ).on( "click", function() {
                featureTable.highlightIds.removeAll();
              } );



              $( "#scrollToBottom_btn" ).on( "click", function() {
                featureTable.scrollToBottom();
              } );
              $( "#scrollToTop_btn" ).on( "click", function() {
                featureTable.scrollToTop();
              } );
              $( "#scrollToLeft_btn" ).on( "click", function() {
                featureTable.scrollLeft();
              } );



              $( "#zoomToSelection_btn" ).on( "click", function() {
                featureTable.zoomToSelection();
              } );
              $( "#exportSelectionToCSV_btn" ).on( "click", function() {
                featureTable.exportSelectionToCSV();
              } );

        /**/
        //  --- end  ---  feature table multi button   --- 
        /**/



                
              }





                 


          

              /**/
              // -- -- -- vertial adjustment  -- -- -- 



              

              
     

/**/
// -------------- esri feature table --------------
/**/
         


             
              function show_info_outline_featureTable(___highlightObjectIds){

                
             
                
                console.log('show highlight selected object id in feature table : ',___highlightObjectIds )

                //only for :  click only multiple select unselect
                // comment out, for multiple select
                //empty_info_outline_featureTable()

                var highlightIds_index
                                                                
                // sample https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=widgets-featuretable-relates
                highlightIds_index = featureTable.highlightIds.indexOf(___highlightObjectIds);

                // If there are objectIds in the highlightIds, remove the clicked feature from the array. 
                // If there are no more objectIds, remove the filter to show only selected records
                if (highlightIds_index > -1) {

                  // this highlight id exist, means user click again to unselect,

                        featureTable.highlightIds.splice(highlightIds_index, 1);
                        if (featureTable.highlightIds.length === 0) {

                          // nothing selected
                          if (filterType == 'autoSwitch'){
                            featureTable.filterBySelectionEnabled = false;
                          }//if

                        }//if
                } else {

                        // Add the objectId of the clicked feature into the highlightIds.
                        // This selects the feature in the table and sets a filter to only display the selected rows
                        featureTable.highlightIds.push(___highlightObjectIds);
                        

                        // this is new selected object id, always enable selection filter, no matter what
                        featureTable.filterBySelectionEnabled = true;
                        
                      
                }

              }

              
              function empty_info_outline_featureTable(){

                
                // remove highlight graphic on layer view
                if (mouse_pointed_feature_highlight_handle){
                  mouse_pointed_feature_highlight_handle.remove()
                }

                console.log('empty all highlight selected in feature table : ')
                featureTable.highlightIds.removeAll();
              }


/**/
//  -------------- end  -------------- esri feature table --------------
/**/





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




 

  // ************* view hover hittest  ************************
  
  view.when(function(){
            
                // first time zoom to layer must wait until view is ready, otherwise, may not zoom to.
                console.log(' first time zoom to layer must wait until view is ready, otherwise, may not zoom to, - - - >  zoom yes or no', zoom_to_1st_feature)
                if (zoom_to_1st_feature){
                                            // only zoom 1 time, first time, never zoom again
                                            zoom_to_1st_feature = false; 
                                            //first time pan to real location, or zoom to last feature of max return count(zoom to 1st feature), must wait until view is ready, inside v i e w . w h e n ( ) here
                                            pan_to_real_location()
                }//if   

                

                  
      })
      .then(function() {
        return backgroundFeatureLayer.when();
      })
      .then(function(layer) {
      
                // first time only,  must init and get esri native renderer.
                if (native_renderer == null) {
                  native_renderer = layer.renderer.clone();
                }
               
              
                return view.whenLayerView(layer);
  })
 

// ************* end *************  view hover hittest  ************************





  })();// async 


            
}); // require, everything should be inside









