


// warning:  because show details share with 'server2/xxx',   'online2/list,search' do not have static file version like shp,kml,geojson, only online1/list,search  has shp,kml,geojson



/*


   current, only one way to get all ( dataset, document, app map, scene, etc) info from  

      https://opendata.london.ca//data.json    ( ...//data.json works fine, no need fix to .../data.json)


    right now, all ( dataset, document, app map, scene, etc)   use same  @type: "dcat:Dataset" , which is not right, should change in future.

    right now, only way to identify is it dataset(feature layer or feature table) or document(csv,pdf,excel,shapefile,etc) or app map(scene)

    is by distribution format:

              feature layer:  if distribution have KML format, 

              feature table:  if distribution NOT have KML format, but have CSV 


              Document, App maps: if distribution NOT have KML format, NOT have CSV 









   for hub.js only 

        How to identify feature table(no map, only table) from feature layer(with map)


        Document (PDF) example:   //distribution NOT have KML format, NOT have CSV 


         @type: "dcat:Dataset"
          accessLevel: "public"
          contactPoint: {@type: "vcard:Contact", fn: "acodispo_London"}
          description: "This includes the City Boundary, bridges, roads, railways, street index grid, watercourses and waterbodies. Streets are listed alphabetically and are numbered by area."
          distribution: Array(2)
          0: {@type: "dcat:Distribution", title: "ArcGIS Hub Dataset", format: "Web Page", mediaType: "text/html", accessURL: "http://opendata.london.ca/datasets/b182bb23422244ff85e9d8bcc3eb561d"}
          1: {@type: "dcat:Distribution", title: "Esri Rest API", format: "Esri REST", mediaType: "application/json"}
          length: 2
          __proto__: Array(0)
          identifier: "http://opendata.london.ca/datasets/b182bb23422244ff85e9d8bcc3eb561d"
          issued: "2019-03-15T19:41:33.000Z"
          keyword: ["community"]
          landingPage: "http://opendata.london.ca/datasets/b182bb23422244ff85e9d8bcc3eb561d"
          license: "http://opendata.london.ca/datasets/b182bb23422244ff85e9d8bcc3eb561d/license.json"
          lunr_id: "117"
          modified: "2019-09-25T18:42:40.000Z"
          publisher: {source: "acodispo_London"}
          title: "City of London Street Map Index"





        feature table distribution do not have KML and shapefile

             feature table example: (https://transparentgov.net/json2tree/esri/online/hub.html?url=https://opendata.london.ca/&org=City%20of%20London%20Open%20Data&_center_lat=42.978&_center_long=-81.23&_center_zoom=11)
             #1 is 

                      @type: "dcat:Dataset"
                      accessLevel: "public"
                      contactPoint: {@type: "vcard:Contact", fn: "acodispo_London"}
                      description: "<p>This feature class contains locational and cartographic styling attributes. Additional street lighting attributes which pertain to specific components of the street light feature (i.e. pole, arm and lamp attributes) are exposed through predefined relationship classes or by joining or relating the component attribute tables to this feature class.</p><p>Street light poles and locations are approximate for information purposes only. For other uses, locations should be field inspected and measured for accuracy.</p>"
                      distribution: Array(4)
                      0: {@type: "dcat:Distribution", title: "ArcGIS Hub Dataset", format: "Web Page", mediaType: "text/html", accessURL: "http://opendata.london.ca/datasets/6aec170337de4d1b8b0dc55794c8aa68_22"}
                      1: {@type: "dcat:Distribution", title: "Esri Rest API", format: "Esri REST", mediaType: "application/json", accessURL: "https://maps.london.ca/arcgisa/rest/services/OpenData/OpenData_Transportation/MapServer/22"}
                      2: {@type: "dcat:Distribution", title: "GeoJSON", format: "GeoJSON", mediaType: "application/vnd.geo+json", accessURL: "http://opendata.london.ca/datasets/6aec170337de4d1…2.geojson?outSR={"latestWkid":26917,"wkid":26917}"}
                      3: {@type: "dcat:Distribution", title: "CSV", format: "CSV", mediaType: "text/csv", accessURL: "http://opendata.london.ca/datasets/6aec170337de4d1…68_22.csv?outSR={"latestWkid":26917,"wkid":26917}"}









                feature layer distribution have KML and shapefile  
                example:

                      @type: "dcat:Dataset"
                      accessLevel: "public"
                      contactPoint: {@type: "vcard:Contact", fn: "acodispo_London"}
                      description: " This feature class can be used in addition to other Sewer feature classes to create a representation of the municipal sewer network. Subtype Code defines Type.  There is no distinction between Assumed and Unassumed."
                      distribution: Array(6)
                      0: {@type: "dcat:Distribution", title: "ArcGIS Hub Dataset", format: "Web Page", mediaType: "text/html", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e2b03311c95331cb75_3"}
                      1: {@type: "dcat:Distribution", title: "Esri Rest API", format: "Esri REST", mediaType: "application/json", accessURL: "https://maps.london.ca/arcgisa/rest/services/OpenData/OpenData_Environment/MapServer/3"}
                      2: {@type: "dcat:Distribution", title: "GeoJSON", format: "GeoJSON", mediaType: "application/vnd.geo+json", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…3.geojson?outSR={"latestWkid":26917,"wkid":26917}"}
                      3: {@type: "dcat:Distribution", title: "CSV", format: "CSV", mediaType: "text/csv", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…b75_3.csv?outSR={"latestWkid":26917,"wkid":26917}"}
                      4: {@type: "dcat:Distribution", title: "KML", format: "KML", mediaType: "application/vnd.google-earth.kml+xml", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…b75_3.kml?outSR={"latestWkid":26917,"wkid":26917}"}
                      5: {@type: "dcat:Distribution", title: "Shapefile", format: "ZIP", mediaType: "application/zip", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…b75_3.zip?outSR={"latestWkid":26917,"wkid":26917}"}

                



                      full example: 

                      @type: "dcat:Dataset"
                      accessLevel: "public"
                      contactPoint: {@type: "vcard:Contact", fn: "acodispo_London"}
                      description: " This feature class can be used in addition to other Sewer feature classes to create a representation of the municipal sewer network. Subtype Code defines Type.  There is no distinction between Assumed and Unassumed."
                      distribution: Array(6)
                      0: {@type: "dcat:Distribution", title: "ArcGIS Hub Dataset", format: "Web Page", mediaType: "text/html", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e2b03311c95331cb75_3"}
                      1: {@type: "dcat:Distribution", title: "Esri Rest API", format: "Esri REST", mediaType: "application/json", accessURL: "https://maps.london.ca/arcgisa/rest/services/OpenData/OpenData_Environment/MapServer/3"}
                      2: {@type: "dcat:Distribution", title: "GeoJSON", format: "GeoJSON", mediaType: "application/vnd.geo+json", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…3.geojson?outSR={"latestWkid":26917,"wkid":26917}"}
                      3: {@type: "dcat:Distribution", title: "CSV", format: "CSV", mediaType: "text/csv", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…b75_3.csv?outSR={"latestWkid":26917,"wkid":26917}"}
                      4: {@type: "dcat:Distribution", title: "KML", format: "KML", mediaType: "application/vnd.google-earth.kml+xml", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…b75_3.kml?outSR={"latestWkid":26917,"wkid":26917}"}
                      5: {@type: "dcat:Distribution", title: "Shapefile", format: "ZIP", mediaType: "application/zip", accessURL: "http://opendata.london.ca/datasets/69ccb6a5bbf748e…b75_3.zip?outSR={"latestWkid":26917,"wkid":26917}"}
                      length: 6
                      __proto__: Array(0)
                      identifier: "http://opendata.london.ca/datasets/69ccb6a5bbf748e2b03311c95331cb75_3"
                      issued: "2019-06-21T15:07:12.000Z"
                      keyword: (4) ["sewer", "network", "nodes", "environment"]
                      landingPage: "http://opendata.london.ca/datasets/69ccb6a5bbf748e2b03311c95331cb75_3"
                      license: "http://opendata.london.ca/datasets/69ccb6a5bbf748e2b03311c95331cb75_3/license.json"
                      modified: "2019-11-07T16:50:54.000Z"
                      publisher: {source: "acodispo_London"}
                      spatial: "0,-90,-81.127,43.0552"
                      theme: ["geospatial"]
                      title: "Sewer Other Nodes"

--------------------------------------------------------


      for search.js only 


      hubType or type will tell you it is feature layer or feature table(no map)


      possible type: 

                            
                            1)
                            hubType: "Feature Layer"
                            hubType: "Feature Service"   // same as feature layer
                            
                            hubType: "Feature Collection"   //  because no url provided, so only item page 






                           2)
                           hubType: "Table"
                                     // handle as feature table






                            3)
                            hubType: "GeoJson"

                                 not handle, because not provide local domain, we need "local domain/datasets/id.geojson" as download link
                                 
                                 so we only provide original html page, for download geojson or json 

                                 In future, we can get local domain by orgId, but that need extra ajax to get, will do in future.


                                   //not included in this search result: http://opendata.ajax.ca  not host on esri,  ___id.geojson only available this domain.
                                                             // this search result only have this:   https://exploreajax.ajax.ca/mapajax/rest/services/
                                                             // can't make geojson icon, because only id.geojson available, but not domain. 
                                                             // geojson download URL is:   domain/datasets/id.geojson
                                




                           4)
                            hubType: "Raster Layer"

                                 not handle, just show original page






                           5)
                            hubType: "Web Scene"

                                 not handle, just show original page
         




                           6)
                            hubtype = 'Web Map' or 'Web Mapping Application'

                                 not handle, just show original page





                          7)
                            hubType: "Shapefile"

                                 not handle, just show original page






                          8) 
                          hubType:: "Image"


                            not handle, just show original page






      Feature Layer example: 
    
      hubType: "Feature Layer"
      type: "Feature Layer"



             
      attributes:
            access: "public"
            additionalResources: []
            advancedQueryCapabilities: {supportsStatistics: true, supportsSqlExpression: true, supportsQueryWithResultType: true, supportsOrderBy: true, supportsQueryRelatedPagination: true, …}
            categories: []
            collection: ["Dataset"]
            commentsEnabled: true
            composeStatus: {retries: 0, pass: true, lastRetriedAt: 1591004214594}
            composedAt: 1591004214580
            content: "Feature Service"
            contentSecurityPolicy: null
            created: 1590077035000
            currentVersion: 10.7
            description: ""
            displayField: "Field1"
            downloadable: true
            enrichCoverage: "local"
            enrichQuality: 65
            errors: []
            extent: {coordinates: Array(2), type: "envelope"}
            fieldNames: (71) ["OBJECTID", "Field1", "Accident_Index", "Vehicle_Reference", "Vehicle_Type", "Towing_and_Articulation", "Vehicle_Manoeuvre", "Vehicle_Location_Restricted_Lan", "Vehicle_Location-Restricted_Lane", "Junction_Location", "Skidding_and_Overturning", "Hit_Object_in_Carriageway", "Vehicle_Leaving_Carriageway", "Hit_Object_off_Carriageway", "F1st_Point_of_Impact", "1st_Point_of_Impact", "Was_Vehicle_Left_Hand_Drive_", "Was_Vehicle_Left_Hand_Drive?", "Journey_Purpose_of_Driver", "Sex_of_Driver", "Age_of_Driver", "Age_Band_of_Driver", "Engine_Capacity__CC_", "Engine_Capacity_(CC)", "Propulsion_Code", "Age_of_Vehicle", "Driver_IMD_Decile", "Driver_Home_Area_Type", "Vehicle_IMD_Decile", "Location_Easting_OSGR", "Location_Northing_OSGR", "Longitude", "Latitude", "Police_Force", "Accident_Severity", "Number_of_Vehicles", "Number_of_Casualties", "Date", "Day_of_Week", "Time", "Local_Authority__District_", "Local_Authority_(District)", "Local_Authority__Highway_", "Local_Authority_(Highway)", "F1st_Road_Class", "1st_Road_Class", "F1st_Road_Number", "1st_Road_Number", "Road_Type", "Speed_limit", "Junction_Detail", "Junction_Control", "F2nd_Road_Class", "2nd_Road_Class", "F2nd_Road_Number", "2nd_Road_Number", "Pedestrian_Crossing_Human_Contr", "Pedestrian_Crossing-Human_Control", "Pedestrian_Crossing_Physical_Fa", "Pedestrian_Crossing-Physical_Facilities", "Light_Conditions", "Weather_Conditions", "Road_Surface_Conditions", "Special_Conditions_at_Site", "Carriageway_Hazards", "Urban_or_Rural_Area", "Did_Police_Officer_Attend_Scene", "Did_Police_Officer_Attend_Scene_of_Accident", "LSOA_of_Accident_Location", "geometry", "Field"]
            fields: (58) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            geometryType: "esriGeometryPoint"
            groupIds: []
            hasApi: true
            hubType: "Feature Layer"
            id: "b9a4310a14514cbca44acef6d8ec85c0_6"
            itemModified: 1591004169000
            layer: {extent: {…}, supportsApplyEditsWithGlobalIds: false, maxRecordCount: 2000, type: "Feature Layer", hasStaticData: false, …}
            layers: [{…}]
            license: "none"
            licenseInfo: ""
            maxRecordCount: 2000
            metadata: {metadata: {…}}
            modified: 1590077050943
            modifiedProvenance: "layer.editingInfo.lastEditDate"
            name: "Speed Limit 20 LDN"
            objectIdField: "OBJECTID"
            openData: false
            owner: "student.UWE"
            recordCount: 627
            searchDescription: ""
            server: {allowGeometryUpdates: true, supportsApplyEditsWithGlobalIds: false, maxRecordCount: 2000, description: "", units: "esriMeters", …}
            serverCapabilities: "Query"
            serviceSpatialReference: {latestWkid: 3857, wkid: 102100}
            size: 33816576
            source: "student.UWE"
            sourceProvenance: "item.owner"
            structuredLicense: {type: "none"}
            supportedQueryFormats: "JSON, geoJSON"
            supportsAdvancedQueries: true
            tags: (4) ["London", "Accident", "Cycling", "DualCarriageway"]
            thumbnail: "thumbnail/thumbnail.png"
            thumbnailUrl: "thumbnail/thumbnail.png"
            type: "Feature Layer"
            typeCategories: ["Dataset"]
            typeKeywords: (8) ["ArcGIS Server", "Data", "Feature Access", "Feature Service", "Metadata", "Multilayer", "Service", "Hosted Service"]
            url: "https://services1.arcgis.com/FQMgDfaSplXrXkUI/arcgis/rest/services/RoadType_DualCarriageway_LDN_WFL1/FeatureServer/6"
            useStandardizedQueries: true
            validExtent: true
            xFrameOptions: null
            __proto__: Object
            id: "b9a4310a14514cbca44acef6d8ec85c0_6"
            links: {self: "http://opendata.arcgis.com/api/v3/datasets/b9a4310a14514cbca44acef6d8ec85c0_6", rawEs: "http://opendata.arcgis.com/api/es/datasets/b9a4310a14514cbca44acef6d8ec85c0_6", itemPage: "https://www.arcgis.com/home/item.html?id=b9a4310a14514cbca44acef6d8ec85c0", esriRest: "https://www.arcgis.com/sharing/content/items/b9a4310a14514cbca44acef6d8ec85c0?f=json"}
            meta: {highlights: {…}, matchedFields: Array(0)}
            type: "dataset"





            .....................


            feature table example: 
                      
                        hubType: "Table"
                        type: "Table"


        attributes:
              access: "public"
              additionalResources: []
              advancedQueryCapabilities: {supportsStatistics: true, supportsSqlExpression: true, supportsQueryWithResultType: true, supportsOrderBy: true, supportsQueryRelatedPagination: true, …}
              categories: []
              collection: ["Dataset"]
              commentsEnabled: true
              composeStatus: {retries: 0, pass: true, lastRetriedAt: 1575143741635}
              composedAt: 1575143741634
              content: "Feature Service"
              contentSecurityPolicy: null
              created: 1575139612000
              currentVersion: 10.7
              description: null
              displayField: "RefName"
              downloadable: true
              enrichCoverage: "local"
              enrichQuality: 60
              errors: []
              extent: {coordinates: Array(2), type: "envelope"}
              fieldNames: (10) ["OBJECTID_1", "X", "Y", "OBJECTID", "Theme", "Layer", "FeatureCode", "CadType", "RefName", "Angle"]
              fields: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
              groupIds: []
              hasApi: true
              hubType: "Table"
              id: "a2d0be9f465c49dc9e0b12db0e2ac8be_3"
              itemModified: 1575139705000
              layer: {supportsApplyEditsWithGlobalIds: false, maxRecordCount: 2000, type: "Table", hasStaticData: false, editingInfo: {…}, …}
              layers: [{…}]
              license: "none"
              licenseInfo: null
              maxRecordCount: 2000
              metadata: {metadata: {…}}
              modified: 1575139620954
              modifiedProvenance: "layer.editingInfo.lastEditDate"
              name: "Tree Inventory.csv"
              objectIdField: "OBJECTID_1"
              openData: false
              owner: "ERTH3500_rc752692"
              recordCount: 851162
              searchDescription: null
              server: {allowGeometryUpdates: true, supportsApplyEditsWithGlobalIds: false, maxRecordCount: 2000, description: "", units: "esriMeters", …}
              serverCapabilities: "Query"
              serviceSpatialReference: {latestWkid: 26917, wkid: 26917}
              size: 157900800
              source: "ERTH3500_rc752692"
              sourceProvenance: "item.owner"
              structuredLicense: {type: "none"}
              supportedQueryFormats: "JSON, geoJSON"
              supportsAdvancedQueries: true
              tags: (5) ["Tree Density", "London", "Ontario", "Census Tract", "ERTH 3500"]
              thumbnail: "thumbnail/thumbnail.png"
              thumbnailUrl: "thumbnail/thumbnail.png"
              type: "Table"
              typeCategories: ["Dataset"]
              typeKeywords: (8) ["ArcGIS Server", "Data", "Feature Access", "Feature Service", "Metadata", "Multilayer", "Service", "Hosted Service"]
              url: "https://services1.arcgis.com/jYHC0Oa2n7z2uKcM/arcgis/rest/services/Tree_Density_in_London_Ontario_WFL1/FeatureServer/3"
              useStandardizedQueries: true
              validExtent: true
              xFrameOptions: null
              __proto__: Object
              id: "a2d0be9f465c49dc9e0b12db0e2ac8be_3"
              links: {self: "http://opendata.arcgis.com/api/v3/datasets/a2d0be9f465c49dc9e0b12db0e2ac8be_3", rawEs: "http://opendata.arcgis.com/api/es/datasets/a2d0be9f465c49dc9e0b12db0e2ac8be_3", itemPage: "https://www.arcgis.com/home/item.html?id=a2d0be9f465c49dc9e0b12db0e2ac8be", esriRest: "https://www.arcgis.com/sharing/content/items/a2d0be9f465c49dc9e0b12db0e2ac8be?f=json"}
              meta: {highlights: {…}, matchedFields: Array(0)}
              type: "dataset"


*/











  
                    //-------------- sort item by page view (socrata domain.js only) ----------------------
                    // Sort array of objects by string property value
                    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
                    

                            //_results[i].resource.page_views.page_views_total
                            function compare(a,b) {
                              if (a.numViews < b.numViews)
                                return 1;
                              if (a.numViews > b.numViews)
                                return -1;
                              return 0;
                            }
  
                      //-------------- sort item by page view  (socrata domain.js only) ----------------------
    
    

/**/
// for hub.js only  (include hub1.js  hub6.js  hub7.js)
                                                                              //  featuretable have all of rest api, geojson, csv
function rendering_json_to_html(_results) {  

                                 // only when check each resource
                                 // console.log('rendering json to html , whole json ', json)



                                        if (show_views_count_status) {
                           

                                            
                                                // default, input current already sort by page view, when user click show page view button, but lunr.js break this order, so must re-do compare to restore the order by page view. if without use lunr.js then no need this compare() 
                                                  //--- sort item by page view  --- 
                                                    //......Must have {count:587,......}, without count:xxx, or count is different name, must update compare function. 
                                                    _results.sort(compare);
                                                  //--- end --- sort item by page view  ---



                                        }
           
           
           
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
           
                                  
                                      
           
           
           
                                          html += '<div>';
           
                                         if (_results.length > 0)  {
           
           
           
            
                                            html += '<ol class="custom-counter">';
            
                                            for (var i = 0; i < _results.length; ++i) {
            
            
                                                                html += '<li>' // css .ordered_list_number{ size font};
            
                                                                
            
                                                                //"@type": "dcat:Dataset",
                                                              //  var ____type = _results[i]['@type'];
            
                                                              //  console.log(  ' in future hub type will change, right now, all use same type' , ____type);
            
            
            
            
                                                    //-------------------- distribution ---------------
            
                                                          /* sample
                                                          * 
                                                          * 
                                                            "distribution": [
                                                                    {
                                                                            "@type": "dcat:Distribution",
                                                                            "title": "ArcGIS Open Dataset",
                                                                            "format": "Web page",
                                                                            "mediaType": "text/html",
                                                                            "accessURL": "http://opendata.ajax.ca/datasets/0ab6e60bf28c4d29842adeab5c68c74f_20"
                                                                    },
                                                                    {
                                                                            "@type": "dcat:Distribution",
                                                                            "title": "Esri Rest API",
                                                                            "format": "Esri REST",
                                                                            "mediaType": "application/json",
                                                                            "accessURL": "https://maps.durham.ca/arcgis/rest/services/Open_Data/Durham_OpenData/MapServer/20"
                                                                    },
                                                                    {
                                                                            "@type": "dcat:Distribution",
                                                                            "title": "GeoJSON",
                                                                            "format": "GeoJSON",
                                                                            "mediaType": "application/vnd.geo+json",
                                                                            "downloadURL": "http://opendata.ajax.ca/datasets/0ab6e60bf28c4d29842adeab5c68c74f_20.geojson"
                                                                    },
                                                                    {
                                                                            "@type": "dcat:Distribution",
                                                                            "title": "CSV",
                                                                            "format": "CSV",
                                                                            "mediaType": "text/csv",
                                                                            "downloadURL": "http://opendata.ajax.ca/datasets/0ab6e60bf28c4d29842adeab5c68c74f_20.csv"
                                                                    },
                                                                    {
                                                                            "@type": "dcat:Distribution",
                                                                            "title": "KML",
                                                                            "format": "KML",
                                                                            "mediaType": "application/vnd.google-earth.kml+xml",
                                                                            "downloadURL": "http://opendata.ajax.ca/datasets/0ab6e60bf28c4d29842adeab5c68c74f_20.kml"
                                                                    },
                                                                    {
                                                                            "@type": "dcat:Distribution",
                                                                            "title": "Shapefile",
                                                                            "format": "ZIP",
                                                                            "mediaType": "application/zip",
                                                                            "downloadURL": "http://opendata.ajax.ca/datasets/0ab6e60bf28c4d29842adeab5c68c74f_20.zip"
                                                                    }
                                                            ],
            
            
                                                                  
            
            
                                                            ======================== London,ca   https://opendata.london.ca ===================================
                                                          
                                                            
            
                                                          if distribution have 
                                                                      format : "Esri Rest API" 
                                                                      and 
                                                                      accessURL is valid, 
                                                              
                                                                there are 2 posiable :
            
            
                                                                it could be "layer",    feature layer (Sewer Other Nodes   https://maps.london.ca/arcgisa/rest/services/OpenData/OpenData_Environment/MapServer/3/query?outFields=*&where=1%3D1)
                                                                or it could be "table"   feature table    (Street Lighting - Poles   https://maps.london.ca/arcgisa/rest/services/OpenData/OpenData_Transportation/MapServer/22/query?outFields=*&where=1%3D1)
            
            
                                        
                                                                if it have title : "Shapefile",   // careful: here must be title, not format
                                                                            and
                                                                            accessURL : "http://opendata.london.ca/datasets/69ccb6a5bbf748e2b03311c95331cb75_3.zip?outSR={"latestWkid":26917,"wkid":26917}"
            
                                                                            is valid, then it must be a feature layer, can be mapped
            
            
            
                                                                without "Shapefile", but still have "Esri Rest API" , also accessURL is valid,
                                                                it must be a feature table.
            
            
            
            
            
            
                                                            if distribution have only web page, and ESRI Rest API do not have a "accessURL" property
                                                            means this is something else. for example: excel file  (  Budget 2015 Tax Supported By Service)
            
                                                                  distribution
            
                                                                      @type : "dcat:Distribution"
                                                                      title : "ArcGIS Hub Dataset"
                                                                      format : "Web Page"
                                                                      mediaType : "text/html"
                                                                      accessURL : "http://opendata.london.ca/datasets/3619ba30273640359317cfd678a18034"
            
                                                                      @type : "dcat:Distribution"
                                                                      title : "Esri Rest API"
                                                                      format : "Esri REST"
                                                                      mediaType : "application/json"
            
            
                                                            
            
                                                          
            
                                                                      
                                                            only if distribution have  title : "Shapefile" and accessURL regards as a valid map
                                                            
                                                            
            
            
            
            
            
            
                                                            */
            
                                                                var ____distribution = _results[i].distribution;
            
            
                                                                var ____webPage_endpoint ='';
                                                                
                                                                var ____esri_rest_api_endpoint='';
                                                                var ____geojson_endpoint='';
            
                                                                var ____csv_endpoint='';
                                                                var ____kml_endpoint='';
                                                                var ____shapefile_endpoint='';
                                                                
                                                              
                                                                
            
                                                                for (var d = 0; d < ____distribution.length; ++d) {           
            
            

                                                                  if (____distribution[d].format) {
            
            
                                                                            //format : "Web Page"
                                                                            if (____distribution[d].format.toLowerCase().includes('web')){
            
                                                                              ____webPage_endpoint = ____distribution[d].accessURL;
                                                                            } 
            
            
            
            
            
            
                                                                            // "format": "Esri REST",      
                                                                            if (____distribution[d].format.toLowerCase().includes('rest')){
            
                                                                              ____esri_rest_api_endpoint = ____distribution[d].accessURL;
                                                                          }    
            
            
            
            
            
            
            
                                                                            //   format : "GeoJSON"
                                                                              if (____distribution[d].format.toLowerCase().includes('geojson')){
            
                                                                                  ____geojson_endpoint = ____distribution[d].downloadURL;
                                                                              }        
            
            
            
            
            
            
                                                                              //   format : "CSV"
                                                                              if (____distribution[d].format.toLowerCase().includes('csv')){
            
                                                                                ____csv_endpoint = ____distribution[d].accessURL;
                                                                            }  
            
            
            
            
            
                                                                              //  format : "KML"
                                                                              if (____distribution[d].format.toLowerCase().includes('kml')){
            
                                                                              ____kml_endpoint = ____distribution[d].accessURL;
                                                                              
                                                                          }  
            
            
            
            
            
                                                                          //  title : "Shapefile"
                                                                          /*
                                                                                    @type: "dcat:Distribution"
                                                                                      accessURL: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_184.zip?outSR={"latestWkid":3857,"wkid":102100}"
                                                                                      format: "ZIP"
                                                                                      mediaType: "application/zip"
                                                                                      title: "Shapefile"
                                                                          */
                                                                          if (____distribution[d].title.toLowerCase().includes('shapefile')){
            
                                                                            ____shapefile_endpoint = ____distribution[d].accessURL;
                                                                        }  
            
                                                                        
            

                                                                      }// if format

                                                                } // for      
            
            
            
                                                /*
                                                    based on distribution, decide the item is 
            
                                                    1) feature layer ( have everything include shapefile and KML)          have KML
                                                        
                                                    2) feature table ( have everything , but NOT have shapefile and KML)   have CSV, but NOT KML
            
                                                    3) something else (excel, pdf, word, web-app, etc...)                  NOT have CSV, NOT have KML
            
            
                                              
            
            
            
                                                */
            
            
                                                var content_type = 'feature_layer'  // by default, can do all mapping 
            
            
                                                // must in this order, order matters
                                                if ((____csv_endpoint.length > 0) && (____kml_endpoint.length == 0)) { content_type = 'feature_table'}
                                                if ((____csv_endpoint.length == 0) && (____kml_endpoint.length == 0)) { content_type = 'other' } 
                                                
                                                              
            
            
            
                                                  //--------  end ------------ distribution ---------------
            
            
            
            
            
            
            
            
            
            
                                                  // ....... strip HTML from a string  .....
            
                                                          var _description = _results[i].description;
                                                          var _name = _results[i].title;
                                                          
                                                          
                                                          


            
            
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
            
            
            
            
            



                                                //    ++++++++++++++++     text views type     ++++++++++++++++ 



                                                                // text  -   context class for mark.js highlight , no tool-tip , no link
                                                                html += '&nbsp;';
                                                                html += '<span class="context"><big><b>' + '.&nbsp;&nbsp;&nbsp;' + _name_stripedHtml   + '</b></big></span>'
            

                                                                // add views count, type,  etc
                                                                if (show_views_count_status){

                                                                  var _numViews = _results[i].numViews;
                                                                  var _type = _results[i].type;
                                                                  var _extent = _results[i].extent;

                                                                //  html += '<span class="context">'  + '[' + _type + ']' + '{' + _numViews  + ' views }'+ '</span>'
                                                                html += '<sup class="context"><b>'    + _numViews  + '</b> views</sup>'


                                                                }

                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                //    ++++++++++++++++   end  +++++++++++   text views type     ++++++++++++++++ 



            

                                                /**/
                                                // . . .. .. common shared for all type . . .. ..
                                                /**/ 
            
                                                      // arcgis online item page
                                                      html += '<small><sup>';

                                                      html += 'arcgis online item page';
                                                      html += '&nbsp;&nbsp;&nbsp;'
                                                      //  arcgis online item page  
                                                      html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                      html += _results[i].identifier;  //'origin'   
                                                      html +=  '</a>';
                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                                                      // arcgis online item page
                                                      html += 'landing page';
                                                      html += '&nbsp;&nbsp;&nbsp;'
                                                      //  arcgis online item page  
                                                      html += '<a target="_blank" href="' + _results[i].landingPage + '">';
                                                      html += _results[i].landingPage;  //'origin'   
                                                      html +=  '</a>';
                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            
                                                      html += '</sup></small>';
                                                /**/
                                                // . . .. .. common shared for all type . . .. ..
                                                /**/ 
            
            


                                                // for all 
                                                var __restapi_url;  // without layer-id    https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer
                                                var __layerId;      // 21
                                                var  _accessURL;   // with layer-id  https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/21  

                                                var _geojson_downloadURL;
                                                var raw_geojson_downloadURL;
                                                var _csv_downloadURL;
                                                var raw_csv_downloadURL;

                                                var _kml_downloadURL;
                                                var raw_kml_downloadURL;
                                                var _shp_downloadURL;
                                                var raw_shp_downloadURL;


                                                // .... get portal id, for hub only .....
                                                  //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                                                  // portal id : 9eee1f2d84da4730b02ac90e5bfb560d

                                                var _identifier = _results[i].identifier;
                                                var _landingPage = _results[i].landingPage;

                                                var _identifier_array = _identifier.split('/');

                                                var _portal_id = _identifier_array[_identifier_array.length - 1];

                                                    _portal_id_array = _portal_id.split('_');

                                                    _portal_id = _portal_id_array[0];


                                                    
                                                    input_current[i].portal_id = _portal_id
                                                // .... get portal id, for hub only .....


                                                var _distribution_array = _results[i].distribution
            




            
                                                if ( content_type == 'feature_layer' ){
            
                                                          // -------- feature layer    calculate layer id   ------------- 
                                                          
                                                                    for (var d = 0; d < _distribution_array.length; d++) { 

                                                                         if (_distribution_array[d].format) {


            
                                                                                            var _distribution_format = _distribution_array[d].format
                                
                                                                                            _distribution_format= _distribution_format.toLowerCase();
                                
                                
                                
                                
                                
                                                                                          // rest api, layer id  
                                                                                          if (_distribution_format.includes('rest'))       // (_distribution_format == 'Esri REST')
                                                                                          {
                                
                                
                                                                                                    if ( _distribution_array[d].accessURL)
                                                                                                    {
                                
                                                                                                                _accessURL = _distribution_array[d].accessURL;
                                                                                                                var  _accessURL_array = _accessURL.split('/');
                                                                                                                __layerId= _accessURL_array[_accessURL_array.length - 1];
                                
                                
                                                                                                                var lastIndex = _accessURL.lastIndexOf('/'+__layerId);
                                
                                                                                                                __restapi_url =  _accessURL.substring(0, lastIndex);
                                
                                                                                                    }//if
                                
                                
                                
                                
                                                                                                    // ---- only for hub-arcgis-rest-api-url,  re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                                                                                        if (_accessURL) {
                                
                                                                                                                if (_accessURL.includes('http://')){
                                
                                
                                
                                
                                                                                                                                // google
                                                                                                                                url_template_googlemaps = url_template_googlemaps.replace("https://", "http://");
                                                                                                                                url_template_googlemaps = url_template_googlemaps.replace(":3200", ":3000");         
                                
                                
                                                                                                                                // mapbox 
                                                                                                                                  url_template_base_mapbox = url_template_base_mapbox.replace("https://", "http://");
                                                                                                                                  url_template_base_mapbox = url_template_base_mapbox.replace(":3200", ":3000");
                                
                                
                                                                                                                } else if (_accessURL.includes('https://')){
                                
                                
                                
                                                                                                                      // google
                                                                                                                      url_template_googlemaps = url_template_googlemaps.replace("http://", "https://");
                                                                                                                      url_template_googlemaps = url_template_googlemaps.replace(":3000", ":3200");
                                
                                
                                                                                                                      // mapbox 
                                                                                                                      url_template_base_mapbox = url_template_base_mapbox.replace("http://", "https://");
                                                                                                                      url_template_base_mapbox = url_template_base_mapbox.replace(":3000", ":3200");
                                
                                
                                
                                
                                                                                                                } //if   
                                
                                                                                                        } //if          
                                                                                                    // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                
                                
                                
                                                                                          }// if  
                                
                                
                                
                                
                                
                                
                                
                                                                                          if (_distribution_format.includes('geojson'))     //(_distribution_array[d].format == 'GeoJSON')
                                                                                          {
                                
                                
                                                                                                  // api are different for different org, 
                                
                                
                                
                                                                                                  
                                
                                
                                                                                                  // sometimes use  accessURL
                                                                                                  if ( _distribution_array[d].accessURL) {
                                
                                                                                                        _geojson_downloadURL = _distribution_array[d].accessURL;
                                
                                
                                                                                                    }//if
                                
                                                                                                // sometimes use  downloadURL
                                                                                                if ( _distribution_array[d].downloadURL) {
                                
                                                                                                        _geojson_downloadURL = _distribution_array[d].downloadURL;
                                
                                                                                                  }//if
                                
                                                                                                  raw_geojson_downloadURL =  _geojson_downloadURL
                                
                                
                                                                                                  // ----  for hub-geojson only, correct geojson resource url, make it match base template url protocol with each individual resource URL. -----
                                                                                                  
                                                                                                    
                                                                                                    if (_geojson_downloadURL){
                                
                                
                                                                                                            // arcgis online hub url protocal 
                                                                                                            if (___url_string.includes('https://')){
                                
                                                                                                                    _geojson_downloadURL = _geojson_downloadURL.replace("http://", "https://");
                                
                                                                                                            } 
                                
                                                                                                    } 
                                                                                                  // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                
                                
                                                                                          }// if  
                                
                                
                                


                                                                                            if (_distribution_format.includes('csv'))     //(_distribution_array[d].format == 'csv')
                                                                                            {
                                        
                                        
                                                                                                    // api are different for different org, 
                                        
                                        
                                        
                                                                                                    
                                        
                                        
                                                                                                    // sometimes use  accessURL
                                                                                                    if ( _distribution_array[d].accessURL) {
                                        
                                                                                                          _csv_downloadURL = _distribution_array[d].accessURL;
                                        
                                        
                                                                                                      }//if
                                        
                                                                                                  // sometimes use  downloadURL
                                                                                                  if ( _distribution_array[d].downloadURL) {
                                        
                                                                                                          _csv_downloadURL = _distribution_array[d].downloadURL;
                                        
                                                                                                    }//if
                                        
                                        
                                                                                                    raw_csv_downloadURL =  _csv_downloadURL
                                        
                                                                                                    // ----  for hub-geojson only, correct geojson resource url, make it match base template url protocol with each individual resource URL. -----
                                                                                                    
                                                                                                      
                                                                                                      if (_csv_downloadURL){
                                        
                                        
                                                                                                              // arcgis online hub url protocal 
                                                                                                              if (___url_string.includes('https://')){
                                        
                                                                                                                      _csv_downloadURL = _csv_downloadURL.replace("http://", "https://");
                                        
                                                                                                              } 
                                        
                                                                                                      } 
                                                                                                    // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                        
                                        
                                        
                                                                                            }// if  
                                        
                                        


                                
                                                                                          if (_distribution_format.includes('kml'))     //(_distribution_array[d].format == 'kml')
                                                                                          {
                                
                                
                                                                                                  // api are different for different org, 
                                
                                
                                
                                                                                                  
                                
                                
                                                                                                  // sometimes use  accessURL
                                                                                                  if ( _distribution_array[d].accessURL) {
                                
                                                                                                        _kml_downloadURL = _distribution_array[d].accessURL;
                                
                                
                                                                                                    }//if
                                
                                                                                                // sometimes use  downloadURL
                                                                                                if ( _distribution_array[d].downloadURL) {
                                
                                                                                                        _kml_downloadURL = _distribution_array[d].downloadURL;
                                
                                                                                                  }//if
                                
                                                                                                  raw_kml_downloadURL =  _kml_downloadURL
                                
                                
                                                                                                  // ----  for hub-kml only, correct kml resource url, make it match base template url protocol with each individual resource URL. -----
                                                                                                  
                                                                                                    
                                                                                                    if (_kml_downloadURL){
                                
                                
                                                                                                            // arcgis online hub url protocal 
                                                                                                            if (___url_string.includes('https://')){
                                
                                                                                                                    _kml_downloadURL = _kml_downloadURL.replace("http://", "https://");
                                
                                                                                                            } 
                                
                                                                                                    } 
                                                                                                  // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                
                                
                                                                                          }// if  
                                
                                




                                                                                          // shp shape file format is zip
                                                                                          if (_distribution_format.includes('zip'))     //(_distribution_array[d].format == 'shp')
                                                                                          {
                                
                                
                                                                                                  // api are different for different org, 
                                
                                
                                
                                                                                                  
                                
                                
                                                                                                  // sometimes use  accessURL
                                                                                                  if ( _distribution_array[d].accessURL) {
                                
                                                                                                        _shp_downloadURL = _distribution_array[d].accessURL;
                                
                                
                                                                                                    }//if
                                
                                                                                                // sometimes use  downloadURL
                                                                                                if ( _distribution_array[d].downloadURL) {
                                
                                                                                                        _shp_downloadURL = _distribution_array[d].downloadURL;
                                
                                                                                                  }//if
                                
                                                                                                  raw_shp_downloadURL =  _shp_downloadURL
                                
                                                                                  
                                                                                                    // some shp are http, not available at https, so we should not enforce this rule    
                                                                                                  /*
                                                                                                            // ----  for hub-shp only, correct shp resource url, make it match base template url protocol with each individual resource URL. -----
                                                                                                            
                                                                                                              
                                                                                                              if (_shp_downloadURL){
                                          
                                          
                                                                                                                      // arcgis online hub url protocal 
                                                                                                                      if (___url_string.includes('https://')){
                                          

                                                                                                                            
                                                                                                                              _shp_downloadURL = _shp_downloadURL.replace("http://", "https://");
                                          
                                                                                                                      } 
                                          
                                                                                                              } 
                                                                                                            // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                                                                                  */







                                                                                                  // fix, shp.zip have special requirement, due to when viewer parsing shp.zip. must NOT have outSR={"latestWkid":2229,"wkid":102645}"
                                                                                                  // for example, the raw url is 
                                                                                                  // accessURL: "http://geohub.lacity.org/datasets/a22e7905d67f4330bbec630eebd38419_26.zip?outSR={"latestWkid":2229,"wkid":102645}"
                                                                                                  // must cut off everything after .zip
                                                                                                  // ideal result will be :
                                                                                                  // http://geohub.lacity.org/datasets/a22e7905d67f4330bbec630eebd38419_26.zip


                                                                                                  var split_str_array = _shp_downloadURL.split('?');
                                                                                                  _shp_downloadURL = split_str_array[0]


                                
                                
                                                                                          }// if  
                                





            
                                                                          } // if format
            
                                                                    } // for   before render icon, we need all resoure url link enforce parent-child protocol match rule, based on each individual resoure url protocol
            
                                                        // --------  end    ------------- feature layer    calculate layer id   -------------        
            
                            
                                                      // must encode url: 
                                                      // accessURL: "http://geohub.lacity.org/datasets/30400d96c9ef427380ff05dabd09fa2e_26.geojson?outSR={"latestWkid":2229,"wkid":102645}"
                                                      // without encode, will missing parts after 'outSR={', 
                                                      _geojson_downloadURL = encodeURIComponent(_geojson_downloadURL)

                                                      _csv_downloadURL = encodeURIComponent(_csv_downloadURL)
                            
                                                      _kml_downloadURL = encodeURIComponent(_kml_downloadURL)
                                                      _shp_downloadURL = encodeURIComponent(_shp_downloadURL)
            
            
            







                                                              


  

                                                                // type (map, table, other)
                                                                html += '<small><sup>';
                                                                
                                                                html += 'map';
                                                                html += '&nbsp;&nbsp;&nbsp;'
                                                                    
                          
                                                        // ============ original icon ============               
                          
                                                              //  original page icon       web-page-url  
                                                              html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                              html += _results[i].identifier;  //'origin'   
                                                              html +=  '</a>';
                          
                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                              html += 'source';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              // original source icon     rest api -url 
                                                              html += '<a target="_blank" href="' + _accessURL + '">';
                                                              html += _accessURL;  //'source'
                                                              html += '</a>';

                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                              html += 'rest-api';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              html += '</sup></small>';
                                                        // ============  end  ============   original icon ============   






            
                                    
                                      //*********  ***********  rest api  ***********  *********** 
                                                /**/
                                                            //*********  google ***********  
                                                              /**/
                                                                     

                                                                      // .... single layer .... google ....
                                                                      html += '<a target="_blank" href="' + url_template_googlemaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                      html += '<big>0</big>'  
                                                                      html +=  '</a>';
                                                                      html += '&nbsp;&nbsp;&nbsp;'

                                                                      html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                      html += '<big>10</big>'  
                                                                      html +=  '</a>';
                                                                      html += '&nbsp;&nbsp;&nbsp;'

                                                                      html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                      html += '<big>110</big>' 
                                                                      html += '</a>';
                                                                      html += '&nbsp;&nbsp;&nbsp;'

                                                                      html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                      html += '<big>120</big>'  
                                                                      html +=  '</a>';
                                                                      html += '&nbsp;&nbsp;&nbsp;'
                                                                      //  ....  end  .... single layer .... google ....
                                                                      /**/





                                                                      /**/
                                                                       // ==== data classified =====  google  =====  
                                                                       html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps4/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                       html += '<big>4</big>' 
                                                                       html +=  '</a>';
                                                                       html += '&nbsp;&nbsp;&nbsp;'

                                                                       html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps141/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                       html += '<big>141</big>' 
                                                                       html +=  '</a>';
                                                                       html += '&nbsp;&nbsp;&nbsp;'

                                                                       html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps140/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                       html += '<big>140</big>' 
                                                                       html +=  '</a>';
                                                                       html += '&nbsp;&nbsp;&nbsp;'
                                                                    
                                                                       html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps410/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                       html += '<big>410</big>' 
                                                                       html +=  '</a>';
                                                                       html += '&nbsp;&nbsp;&nbsp;'
                                                                      // ==== data classified =====  google  ===== 
                                                                      /**/ 

            
                                                      //  *** end ******  google *********** 
                                                      /**/




                                                      // -- -- apple  -- -- 

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                  html += '<big>A0</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps/default2?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                  html += '<big>A0p</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                  html += '<big>A20</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps20/default2?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                  html += '<big>A20p</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                  html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                  html += '<big>A120</big>'
                                                                  html +=  '</a>';
                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                      //  -- --  end  -- -- apple  -- -- 
                                                      /**/




                                                        // .. ... bingmaps  .. ... 

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>B0</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>B10</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>B20</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>B110</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>B120</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                        //  .. ...  end .. ... bingmaps  .. ... 
                                                        /**/


                                                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                                                        // .. ... heremaps  .. ... 

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>H0</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>H10</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>H20</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>H110</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                              html += '<big>H120</big>'
                                                              html +=  '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                        //  .. ...  end .. ... heremaps  .. ... 
                                                        /**/





                                                        // -- mapbox  -- 

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                    html += '<big>M0</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                    html += '<big>M10</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                    html += '<big>M20</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                    html += '<big>M110</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                    html += '<big>M120</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                        //   --  end  -- mapbox  -- 
                                                        /**/

                                                                
/**/
// ----- esri ----- 
      

    var _newTab_link =  url_template_base_esri_usgs + '/explore.html?backgroundlayerurl=' + _accessURL + '/'+ __layerId 
    // token
    if (arcgis_online_token){
        _newTab_link += '&arcgis_online_token=' + arcgis_online_token
    }
    html += '<a target="_blank" href="' + _newTab_link + '">';
    html += '<big>e11</big>'
    html +=  '</a>';
    html +='&nbsp;&nbsp;&nbsp;'


    var _newTab_link =  url_template_base_esri_usgs + '/explore_hover.html?backgroundlayerurl=' + _accessURL + '/'+ __layerId 
    // token
    if (arcgis_online_token){
        _newTab_link += '&arcgis_online_token=' + arcgis_online_token
    }
    html += '<a target="_blank" href="' + _newTab_link + '">';
    html += '<big>e12</big>'
    html +=  '</a>';
    html +='&nbsp;&nbsp;&nbsp;'


    var _newTab_link =  url_template_base_esri_usgs + '/classify_data.html?backgroundlayerurl=' + _accessURL + '/'+ __layerId 
    // token
    if (arcgis_online_token){
        _newTab_link += '&arcgis_online_token=' + arcgis_online_token
    }
    html += '<a target="_blank" href="' + _newTab_link + '">';
    html += '<big>e41</big>'
    html +=  '</a>';
    html +='&nbsp;&nbsp;&nbsp;'
                
            


    var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature.html?') +  '&backgroundlayerurl=' + _accessURL + '/'+ __layerId 
    // token
    if (arcgis_online_token){
        _newTab_link += '&arcgis_online_token=' + arcgis_online_token
    }
    html += '<a target="_blank" href="' + _newTab_link + '">';
    html += '<big>e22</big>'
    html +=  '</a>';
    html +='&nbsp;&nbsp;&nbsp;'
        

    var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature.html?') +  '&backgroundlayerurl=' + _accessURL + '/'+ __layerId 
    // token
    if (arcgis_online_token){
        _newTab_link += '&arcgis_online_token=' + arcgis_online_token
    }
    html += '<a target="_blank" href="' + _newTab_link + '">';
    html += '<big>e23</big>'
    html +=  '</a>';
    html +='&nbsp;&nbsp;&nbsp;'
      
        

// -----  end ----- esri ----- 
/**/
         
            
            
                                                                /*
                                                                  *   https://developers.arcgis.com/javascript/latest/sample-code/widgets-layerlist-legend/index.html
                                                                  Invalid portal item type 'Feature Service', expected 'Web Map', 
                                                                      portal id must be webmap item.
            
                                                                    // icon+ esri-webmap portal id
                                                                    // (not apply here:  socrata must be &center_lat=40.72&center_long=-74,   &center_zoom=9 is optional and be any zoom level )
                                                                    // for arcgis only:  center_zoom=17 means pan_to_real_location
                                                                    html += '<a target="_blank" href="' + url_template_base_esri_webmap_portalid 
                                                                    html +=   'layer=' +  _name_stripedHtml  
                                                                    html +=   '&portal-id=' +  _portal_id 
                                                                    html +=   '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'"   data-tooltip="Esri portal webmap v4.x">';
            
            
                                                                    html += '<span class="mdi mdi-food-apple"></span>'  +  '</a>&nbsp;&nbsp;&nbsp;'
            
                                                                  */
            
            
            
            
            
            
                                                                /*  have bug, portal id      
                                                                    // icon+ esri-featurelayer native portal id
                                                                    // (not apply here:  socrata must be &center_lat=40.72&center_long=-74,   &center_zoom=9 is optional and be any zoom level )
                                                                    // for arcgis only:  center_zoom=17 means pan_to_real_location
                                                                    html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_portalid  
                                                                    html +=   'layer=' +  _name_stripedHtml  
                                                                    html +=   '&portal-id=' +  _portal_id 
                                                                    html +=  '&url='+ _geojson_downloadURL +  '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'"   >';
            
            
                                                                    html += '<span class="mdi mdi-food-apple-outline"></span>'  +  '</a>&nbsp;&nbsp;&nbsp;'
                                                                */      
            

                                                  // --------  attribute table  ---- rest api --------
                                              
                                                    
                                                      // featuretable4 -  - default     ?cross=default
                                                      html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default');     
                                                      html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                      html += '<big>T4</big>';
                                                      html += '</a>';
                                                      html += '&nbsp;&nbsp;&nbsp;'
              
              
                                                      // featuretable -  - default     ?cross=default
                                                      html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default');     
                                                      html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                      html += '<big>T0</big>' 
                                                      html += '</a>';
                                                      html += '&nbsp;&nbsp;&nbsp;'
                                                    
                                                      // featuretable - esri grid
                                                      html += '<a target="_blank" href="' + url_template_arcgis_feature_table;  
                                                      html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                      html += '<big>T-grid</big>' 
                                                      html += '</a>';
                                                      html += '&nbsp;&nbsp;&nbsp;'
                                              

                                                  // -------- end --------   attribute table  ---- rest api --------

                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                            
                                            //*********  ***********  geojson ***********  ***********  
                                            
                                            html += '<sup><small>';
                                            html += 'download geojson';
                                            html += '&nbsp;&nbsp;&nbsp;'

                                            html += '<a target="_blank" href="' + raw_geojson_downloadURL   + '">';
                                            html += raw_geojson_downloadURL
                                            html += '</a>';

                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                
                                                              //*********  geojson  >>  google2 and google3 ***********  
            
                                                                    
            
                                                                    var _googlemaps93_template = url_template_base_googlemaps_vector.replace('googlemaps92','googlemaps93')
            
                                                                    //googlemaps cors   googlemap3/default
                                                                    html += '<a target="_blank" href="' + _googlemaps93_template  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL + '&center_zoom=17">';
                                                                    html += '<big>93-geojson-cors</big>'
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                    //googlemaps jsonp   googlemap3/default6000
                                                                    html += '<a target="_blank" href="' + _googlemaps93_template.replace('default?','default6000?')  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL + '&center_zoom=17">';
                                                                    html += '<big>93-geojson-jsonp</big>'
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                    //googlemaps proxy  googlemap3/default7000
                                                                    html += '<a target="_blank" href="' + _googlemaps93_template.replace('default?','default7000?')  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL + '&center_zoom=17">';
                                                                    html += '<big>93-geojson-proxy</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'



                                                                    //googlemaps cors    googlemap92/default
                                                                    html += '<a target="_blank" href="' + url_template_base_googlemaps_vector  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL + '&center_zoom=17">';
                                                                    html += '<big>92-geojson-worker</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                    html += '<a target="_blank" href="' + url_template_base_googlemaps_vector.replace('default','default4')  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL + '&center_zoom=17">';
                                                                    html += '<big>92-geojson-worker-4</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
            
                                                              //  ***** end ****    geojson  >>   google2 and google3 ***********  
            
                                                                    //mapbox
                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox_vector  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL + '&center_zoom=17">';
                                                                    html += '<big>Mapbox-geojson-cors</big>' 
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
            
            
                                                                  //esri-geojson 3D 
                                                                    html += '<a target="_blank" href="' + url_template_base_esri_geojson  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL +  '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'">';
                                                                    html += '<big>Esri-geojson-3D-clickable</big>'  
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                  //esri-geojson 2D
                                                                    html += '<a target="_blank" href="' + url_template_base_esri_geojson_popup  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL +  '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'"   >';
                                                                    html += '<big>Esri-geojson-2D-popup</big>'  
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                    //esri-geojson 2D variant
                                                                    html += '<a target="_blank" href="' + url_template_base_esri_geojson_popup.replace('geojson_popup', 'geojson_v3')  + 'layer=' +  _name_stripedHtml  + '&url='+ _geojson_downloadURL +  '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'"   >';
                                                                    html += '<big>Esri-geojson-2D-popup-variant</big>'  
                                                                    html += '</a>';
                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                 html += '</sup></small>';                         
            
            
            /**/
            
                                            //*********  ***********  kml ***********  *********** 

                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                               html += '<sup><small>';
                                               html += 'download kml';
                                               html += '&nbsp;&nbsp;&nbsp;'

                                                html += '<a target="_blank" href="' + raw_kml_downloadURL   + '">';
                                                html += raw_kml_downloadURL
                                                html += '</a>';

                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                  
                                                              //*********  kml  google5 ***********  
            /**/
                                                                            // googlemaps cors    googlemap95/default
                                                                            var _googlemaps95_template = url_template_base_googlemaps_vector.replace('googlemaps92','googlemaps95')
                                                                            html += '<a target="_blank" href="' + _googlemaps95_template   + 'layer=' +  _name_stripedHtml  + '&url='+ _kml_downloadURL + '&center_zoom=17">';
                                                                            html += '<big>95-kml-cors</big>' 
                                                                            html += '</a>';
                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                            // googlemaps jsonp   googlemap95/default6000
                                                                            html += '<a target="_blank" href="' + _googlemaps95_template.replace('default?','default6000?')  + 'layer=' +  _name_stripedHtml  + '&url='+ _kml_downloadURL + '&center_zoom=17">';
                                                                            html += '<big>95-kml-jsonp</big>'  
                                                                            html += '</a>';
                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                            //googlemaps proxy  googlemap95/default7000
                                                                            html += '<a target="_blank" href="' + _googlemaps95_template.replace('default?','default7000?')  + 'layer=' +  _name_stripedHtml  + '&url='+ _kml_downloadURL + '&center_zoom=17">';
                                                                            html += '<big>95-kml-proxy</big>'  
                                                                            html += '</a>';
                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                         html += '</sup></small>';
                                                            //  ***** end ****  kml  google5 ***********  

              /**/
                                      //*********  ***********  shp ***********  *********** 
                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                      html += '<sup><small>';
                                      html += 'download shapefile.zip';
                                      html += '&nbsp;&nbsp;&nbsp;'


                                                html += '<a target="_blank" href="' + raw_shp_downloadURL   + '">';
                                                html += raw_shp_downloadURL
                                                html += '</a>';

                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                            
                                                    //*********  shp  google6 ***********
                                                              // googlemaps cors    googlemaps6/default
                                                              var _googlemaps96_template = url_template_base_googlemaps_vector.replace('googlemaps92','googlemaps96')
                                                   
                                                              // if shp.zip is http, we must follow http at viewer
                                                              if (_shp_downloadURL.includes('https')){
                                                              }else{
                                                                _googlemaps96_template = _googlemaps96_template.replace('https','http')
                                                                _googlemaps96_template = _googlemaps96_template.replace('3200','3000')
                                                              }

                                                              html += '<a target="_blank" href="' + _googlemaps96_template   + 'layer=' +  _name_stripedHtml  + '&url='+ _shp_downloadURL + '&center_zoom=17">';
                                                              html += '<big>96-shp-cors</big>'  
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                              // googlemaps jsonp   googlemap96/default6000
                                                              html += '<a target="_blank" href="' + _googlemaps96_template.replace('default?','default6000?')  + 'layer=' +  _name_stripedHtml  + '&url='+ _shp_downloadURL + '&center_zoom=17">';
                                                              html += '<big>96-shp-jsonp</big>'  
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                              // googlemaps proxy  googlemap96/default7000
                                                              html += '<a target="_blank" href="' + _googlemaps96_template.replace('default?','default7000?')  + 'layer=' +  _name_stripedHtml  + '&url='+ _shp_downloadURL + '&center_zoom=17">';
                                                              html += '<big>96-shp-proxy</big>'  
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'
                                  html += '</sup></small>';
                                              //  ***** end ****  shp  google6 *********** 
                                              
                                              



                                  // --------  feature table  ---- geojson format --------
                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                    html += '<sup><small>';
                                                    html += 'download json';
                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                    html += '<a target="_blank" href="' + raw_geojson_downloadURL   + '">';
                                                    html += raw_geojson_downloadURL
                                                    html += '</a>';
    
                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                    // featuretable -  - CORS    
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_3;    
                                                    html +=  '&layer='+ _name_stripedHtml  + '&url=' + _geojson_downloadURL + '"  >';
                                                    html +=  '<big>T2-json-cors</big>';           
                                                    html += '</a>';
                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                    // featuretable -  - Proxy  
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_3.replace('default?','default7000?');  
                                                    html +=  '&layer='+ _name_stripedHtml  + '&url=' + _geojson_downloadURL + '"  >';
                                                    html +=  '<big>T2-json-proxy</big>';          
                                                    html += '</a>';
                                                    html += '&nbsp;&nbsp;&nbsp;'
                                          html += '</sup></small>';
                                // --------  end -------  feature table  ---- geojson format --------

/**/
                                          // --------  feature table  ---- csv format --------
                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                    html += '<sup><small>';
                                                    html += 'download csv';
                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                    html += '<a target="_blank" href="' + raw_csv_downloadURL   + '">';
                                                    html += raw_csv_downloadURL
                                                    html += '</a>';
    
                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                                                    // featuretable -  - CORS    
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_4;    
                                                    html +=  '&layer='+ _name_stripedHtml  + '&url=' + _csv_downloadURL + '"  >';
                                                    html +=  '<big>T3-csv-cors</big>';          
                                                    html += '</a>';
                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                    // featuretable -  - Proxy  
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_4.replace('default?','default7000?');  
                                                    html +=  '&layer='+ _name_stripedHtml  + '&url=' + _csv_downloadURL + '"  >';
                                                    html +=  '<big>T3-csv-proxy</big>';          
                                                    html += '</a>';
                                                    html += '&nbsp;&nbsp;&nbsp;'
                                           html += '</sup></small>';
                                            // --------  end -------  feature table  ---- csv format --------




                                                }// if
            
            
                        
            
                                                if ( content_type == 'feature_table' ){
            
                                                              // -------- feature layer    calculate layer id   ------------- 
                                                                          
                                                              for (var d = 0; d < _distribution_array.length; d++) { 

                                                                if (_distribution_array[d].format) {
            
                                                                                      var _distribution_format = _distribution_array[d].format
                                
                                                                                      _distribution_format= _distribution_format.toLowerCase();
                                
                                
                                
                                
                                
                                                                                    // rest api, layer id  
                                                                                    if (_distribution_format.includes('rest'))       // (_distribution_format == 'Esri REST')
                                                                                    {
                                
                                
                                                                                              if ( _distribution_array[d].accessURL)
                                                                                              {
                                
                                                                                                          _accessURL = _distribution_array[d].accessURL;
                                                                                                          var  _accessURL_array = _accessURL.split('/');
                                                                                                          __layerId= _accessURL_array[_accessURL_array.length - 1];
                                
                                
                                                                                                          var lastIndex = _accessURL.lastIndexOf('/'+__layerId);
                                
                                                                                                          __restapi_url =  _accessURL.substring(0, lastIndex);
                                
                                                                                              }//if
                                
                                
                                
                                
                                                                                              // ---- only for hub-arcgis-rest-api-url,  re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                                                                                  if (_accessURL) {
                                
                                                                                                          if (_accessURL.includes('http://')){
                                
                                
                                
                                
                                                                                                                          // google
                                                                                                                            url_template_googlemaps = url_template_googlemaps.replace("https://", "http://");
                                                                                                                            url_template_googlemaps = url_template_googlemaps.replace(":3200", ":3000");         
                                
                                
                                                                                                                          // mapbox 
                                                                                                                            url_template_base_mapbox = url_template_base_mapbox.replace("https://", "http://");
                                                                                                                            url_template_base_mapbox = url_template_base_mapbox.replace(":3200", ":3000");
                                
                                
                                                                                                          } else if (_accessURL.includes('https://')){
                                
                                
                                
                                                                                                                // google
                                                                                                                url_template_googlemaps = url_template_googlemaps.replace("http://", "https://");
                                                                                                                url_template_googlemaps = url_template_googlemaps.replace(":3000", ":3200");
                                
                                
                                                                                                                // mapbox 
                                                                                                                url_template_base_mapbox = url_template_base_mapbox.replace("http://", "https://");
                                                                                                                url_template_base_mapbox = url_template_base_mapbox.replace(":3000", ":3200");
                                
                                
                                
                                
                                                                                                          } //if   
                                
                                                                                                  } //if          
                                                                                              // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                
                                
                                
                                                                                    }// if  
                                
                                
                                
                                
                                
                                
                                
                                                                                    if (_distribution_format.includes('geojson'))     //(_distribution_array[d].format == 'GeoJSON')
                                                                                    {
                                
                                
                                                                                            // api are different for different org, 
                                
                                
                                
                                                                                            
                                
                                
                                                                                            // sometimes use  accessURL
                                                                                            if ( _distribution_array[d].accessURL) {
                                
                                                                                                  _geojson_downloadURL = _distribution_array[d].accessURL;
                                
                                
                                                                                              }//if
                                
                                                                                          // sometimes use  downloadURL
                                                                                          if ( _distribution_array[d].downloadURL) {
                                
                                                                                                  _geojson_downloadURL = _distribution_array[d].downloadURL;
                                
                                                                                            }//if
                                
                                
                                
                                
                                                                                            // ----  for hub-geojson only, correct geojson resource url, make it match base template url protocol with each individual resource URL. -----
                                                                                            
                                                                                              
                                                                                              if (_geojson_downloadURL){
                                
                                
                                                                                                      // arcgis online hub url protocal 
                                                                                                      if (___url_string.includes('https://')){
                                
                                                                                                              _geojson_downloadURL = _geojson_downloadURL.replace("http://", "https://");
                                
                                                                                                      } 
                                
                                                                                              } 
                                                                                            // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                
                                
                                                                                    }// if  
                                
                                
                                

                                                                                    if (_distribution_format.includes('csv'))     //(_distribution_array[d].format == 'csv')
                                                                                    {
                                
                                
                                                                                            // api are different for different org, 
                                
                                
                                
                                                                                            
                                
                                
                                                                                            // sometimes use  accessURL
                                                                                            if ( _distribution_array[d].accessURL) {
                                
                                                                                                  _csv_downloadURL = _distribution_array[d].accessURL;
                                
                                
                                                                                              }//if
                                
                                                                                          // sometimes use  downloadURL
                                                                                          if ( _distribution_array[d].downloadURL) {
                                
                                                                                                  _csv_downloadURL = _distribution_array[d].downloadURL;
                                
                                                                                            }//if
                                
                                
                                
                                
                                                                                            // ----  for hub-geojson only, correct geojson resource url, make it match base template url protocol with each individual resource URL. -----
                                                                                            
                                                                                              
                                                                                              if (_csv_downloadURL){
                                
                                
                                                                                                      // arcgis online hub url protocal 
                                                                                                      if (___url_string.includes('https://')){
                                
                                                                                                              _csv_downloadURL = _csv_downloadURL.replace("http://", "https://");
                                
                                                                                                      } 
                                
                                                                                              } 
                                                                                            // ----  End ---- only for hub, re-enforce parent-child match rule based on each individual resource URL. -----
                                
                                
                                
                                                                                    }// if  
              
              
              
                                                                }// if format
            
            
                                                              } // for   before render icon, we need all resoure url link enforce parent-child protocol match rule, based on each individual resoure url protocol
            
                                                              // --------  end    ------------- feature layer    calculate layer id   -------------
                                                              
                                      //*********  ***********  Feature Table  ***********  *********** 

                                                  // type (table)
                                                  html += '<small><sup>';
                                                    
                                                        html += 'dataSet';
                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                      
                                                  
                                                        // ============ original icon ============               
                          
                                                              //  original page icon       web-page-url   
                                                              html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                              html += _results[i].identifier;  //'origin'   
                                                              html += '</a>'

                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                              html += 'source';
                                                              html += '&nbsp;&nbsp;&nbsp;'
                          
                                                              // original source icon     rest api -url   
                                                              html += '<a target="_blank" href="' + _accessURL + '">';
                                                              html += _accessURL;  //'source'  
                                                              html += '</a>'

                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                              html += 'rest-api';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                  html += '</sup></small>';
                                                        // ============  end  ============   original icon ============   





      
                                                  // --------  feature table  ---- rest format --------
                                              
                                                    
                                                    
                                                    // featuretable4 -  - default     ?cross=default
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default');     
                                                    html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                    html += '<big>T4</big>';
                                                    html += '</a>';

                                                    html += '&nbsp;&nbsp;&nbsp;'
            
                                                    // featuretable -  - default     ?cross=default
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default');     
                                                    html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                    html += '<big>T0</big>' 
                                                    html += '</a>';
            
                                                    html += '&nbsp;&nbsp;&nbsp;'
                                    
                                                      // featuretable - esri grid
                                                      html += '<a target="_blank" href="' + url_template_arcgis_feature_table;  
                                                      html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                      html += '<big>T-grid</big>' 
                                                      html += '</a>';
                                              
                                                      html += '&nbsp;&nbsp;&nbsp;'

                                                  // -------- end --------  feature table  ---- rest format --------


                                                    




                                                    // --------  feature table  ---- geojson format --------

                                                    html += 'Json';

                                                    // featuretable -  - CORS    
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_3;    
                                                    html +=  '&layer='+ _name_stripedHtml  + '&url=' + _geojson_downloadURL + '"  >';
                                                    html +=  'cors';           //_name_stripedHtml 
                                                    html += '</a>';
                                              
                                                    html += '&nbsp;&nbsp;&nbsp;'
            
                                                    // featuretable -  - Proxy   7000
                                                    html += '<a target="_blank" href="' + url_template_arcgis_feature_table_3.replace('default?','default7000?');  
                                                    html +=  '&layer='+ _name_stripedHtml  + '&url=' + _geojson_downloadURL + '"  >';
                                                    html +=  'proxy';           //_name_stripedHtml 
                                                    html += '</a>';
                                              
                                                    html += '&nbsp;&nbsp;&nbsp;'
            

                                            // --------  end -------  feature table  ---- csv format --------


/**/

                                                    // --------  feature table  ---- csv format --------

                                                              html += 'CSV';
                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                            
                                                              // featuretable -  - CORS    
                                                              html += '<a target="_blank" href="' + url_template_arcgis_feature_table_4;    
                                                              html +=  '&layer='+ _name_stripedHtml  + '&url=' + _csv_downloadURL + '"  >';
                                                              html +=  'cors';           //_name_stripedHtml 
                                                              html += '</a>';
                                              
                                                              html += '&nbsp;&nbsp;&nbsp;'
                      
                                                              // featuretable -  - Proxy  
                                                              html += '<a target="_blank" href="' + url_template_arcgis_feature_table_4.replace('default?','default7000?');  
                                                              html +=  '&layer='+ _name_stripedHtml  + '&url=' + _csv_downloadURL + '"  >';
                                                              html +=  'proxy';           //_name_stripedHtml 
                                                              html += '</a>';
                                              
                                                              html += '&nbsp;&nbsp;&nbsp;'
                      
                                                      // --------  end -------  feature table  ---- csv format --------
    
                                                }
            
            
            
            
            
            
            
                                                              
                                              if ( content_type == 'other' ){



                                                  /*
                                                      sample 

                                                          @type: "dcat:Dataset"
                                                          accessLevel: "public"
                                                          contactPoint: {@type: "vcard:Contact", fn: "arcgis_data.update_lahub"}
                                                          description: "{{default.description}}"
                                                          distribution: Array(2)
                                                          0: {@type: "dcat:Distribution", title: "ArcGIS Hub Dataset", format: "Web Page", mediaType: "text/html", accessURL: "http://geohub.lacity.org/datasets/158dab4a07b04ecb8d47fea1746303ac"}
                                                          1: {@type: "dcat:Distribution", title: "Esri Rest API", format: "Esri REST", mediaType: "application/json"}
                                                          length: 2
                                                          __proto__: Array(0)
                                                          identifier: "http://geohub.lacity.org/datasets/158dab4a07b04ecb8d47fea1746303ac"
                                                          issued: "2020-04-22T20:16:49.000Z"
                                                          keyword: ["covid19"]
                                                          landingPage: "http://geohub.lacity.org/datasets/158dab4a07b04ecb8d47fea1746303ac"
                                                          license: "http://geohub.lacity.org/datasets/158dab4a07b04ecb8d47fea1746303ac/license.json"
                                                          modified: "2020-06-17T06:00:58.000Z"
                                                          publisher: {source: "City of Los Angeles Hub"}
                                                          spatial: "-119.095,33.521,-117.667,34.427"
                                                          theme: ["geospatial"]
                                                          title: "LA COVID Testing V5"
                                                  */
            
                                                                              

                                                                    // -------- document   ------------- 
                                                                                    
                                                                    var _apps_URL = '';



                                                                    // .... get portal id, for hub only .....
                                                                      //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                                                                      // portal id : 9eee1f2d84da4730b02ac90e5bfb560d

                                                                    var _identifier = _results[i].identifier;
                                                                    var _landingPage = _results[i].landingPage;

                                                                    var _identifier_array = _identifier.split('/');

                                                                    var _portal_id = _identifier_array[_identifier_array.length - 1];

                                                                        _portal_id_array = _portal_id.split('_');

                                                                        _portal_id = _portal_id_array[0];
                                                                    // .... get portal id, for hub only .....







                                                                    var _distribution_array = _results[i].distribution

                                                                    for (var d = 0; d < _distribution_array.length; d++) { 


                                                                      if (_distribution_array[d].format) {

   

                                                                                  var _distribution_format = _distribution_array[d].format

                                                                                  _distribution_format= _distribution_format.toLowerCase();

                                                                                  // (_distribution_format == 'Esri REST')
                                                                                  if (_distribution_format.includes('rest')){
                                                                                            if ( _distribution_array[d].accessURL){
                                                                                              _apps_URL = _distribution_array[d].accessURL;
                                                                                                        
                                                                                            }//if

                                                                                  }// if  

                                                                                  
                                                                      } // if format

                                                                    } // for   




                                                                    // --------  end    -------------------- document   -------------   





                                                                   


                                                                                /*


                                                                                    based on accessURL , 'other document' can be divide into imageserver, geocode server etc....


                                                                                
                                                                                  @type: "dcat:Distribution"
                                                                                    accessURL: "https://insideidaho.org/arcgis/rest/services/elevation/idaho_1as_bedem/ImageServer"
                                                                                    format: "ArcGIS GeoServices REST API"
                                                                                    mediaType: "application/json"
                                                                                    title: "ArcGIS GeoService"
                                                                                
                                                                                                  

                                                                                    accessURL  === >    ____esri_rest_api_endpoint     is same as      _apps_URL   use either one is ok

                                                                                */ 


                                                                                if (_apps_URL.toLowerCase().includes('imageserver')) {
                                                                                  content_type = 'ImageServer'
                                                                                }  

                                                                                if (_apps_URL.toLowerCase().includes('geocodeserver')) {
                                                                                  content_type = 'GeocodeServer'
                                                                                }  

                                                                                if (_apps_URL.toLowerCase().includes('mapserver')) {
                                                                                  content_type = 'MapServer'
                                                                                }  

                                                                                if (_apps_URL.toLowerCase().includes('featureserver')) {
                                                                                  content_type = 'FeatureServer'
                                                                                } 

                                                                                if (_apps_URL.toLowerCase().includes('sceneserver')) {
                                                                                  content_type = 'SceneServer'
                                                                                } 

                                                                                if (_apps_URL.toLowerCase().includes('vectortileserver')) {
                                                                                  content_type = 'VectorTileServer'
                                                                                } 




                                                                                switch (content_type) {



                                                                                            case 'ImageServer':

                                                                                              html += '<small><sup>';
                                                                                                              html += 'imageServer';
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                                              // ============ original icon ============               
                                                                                
                                                                                                                    //  original page icon       web-page-url   
                                                                                                                    html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                                    html += _results[i].identifier; //'origin' 
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                    html += 'source';
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                
                                                                                                                    if (_apps_URL.length > 0 ){
                                                                                                                              // original source icon     rest api -url   
                                                                                                                              html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                                              html += _apps_URL;  'source' 
                                                                                                                              html += '</a>';
                                              
                                                                                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                              html += 'rest-api';
                                                                                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                    }

                                                                                              html += '</sup></small>';
                                                                                                              // ============  end  ============   original icon ============ 


                                                                                                              // .... Image Server .... googlemap9 
                                                                                                              html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps910/default?')  
                                                                                                              html +=  '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + _apps_URL 
                                                                                                              html += '">';
                                                                                                              html += '<big>910</big>'   
                                                                                                              html += '</a>';
                                              
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                            
                                                                                                              // .... Image Server .... googlemap911 
                                                                                                              html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps911/default?')   
                                                                                                              html +=  '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + _apps_URL 
                                                                                                              html += '">';
                                                                                                              html += '<big>911</big>'    
                                                                                                              html += '</a>';
                                              
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                                                                       
                                                                                                            // esri v4.x icon
                                                                                                              html += '<a target="_blank" href="' + url_template_base_esri_imagery_layer
                                                                                                              html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                                              html += '">';
                                                                                                              html += '<big>3D</big>'     
                                                                                                              html += '</a>';
                                              
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                                                                            
                                                                                                              //popup 
                                                                                                            // esri v4.x icon
                                                                                                              html += '<a target="_blank" href="' + url_template_base_esri_imagery_layer_popup
                                                                                                              html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                                              html += '">';
                                                                                                              html += '<big>2D</big>'  
                                                                                                              html += '</a>';
                                              
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                                                                            
                                                                                                              // CMV icon v3.x
                                                                                                              html += '<a target="_blank" href="' + url_template_base_esri3  
                                                                                                              html += '&url=' + _apps_URL + '&title='+ _name_stripedHtml  +  '&zoom=16' +  '&lat='+ _center_lat +  '&long=' +  _center_long 
                                                                                                              html += '">' 
                                                                                                              html += '<big>Classic</big>' 
                                                                                                              html += '</a>';
                                              
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                              break;




                                                                                            case 'GeocodeServer':
                                                                                              html += '<small><sup>';
                                                                                                    html += 'geocodeServer';
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                                                    // ============ original icon ============               
                                                                      
                                                                                                          //  original page icon       web-page-url   
                                                                                                          html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                          html += _results[i].identifier;  //'origin'  
                                                                                                          html += '</a>';
                                              
                                                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                          html += 'source';
                                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                      
                                                                      
                                                                                                          if (_apps_URL.length > 0 ){
                                                                                                                    // original source icon     rest api -url   
                                                                                                                    html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                                    html += _apps_URL;  //'source'  
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                    html += 'rest-api';
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                                          }
                                                                                             html += '</sup></small>';
                                                                                                    // ============  end  ============   original icon ============   

/**/

                                                                                                        /* warning:     geocode server must use 'url2='    ,not use 'url='*/
                                                                                                        // google g26
                                                                                                        html += '<a target="_blank" href="' + url_template_base_googlemaps_geocodeServer
                                                                                                        html += '&url2=' + _apps_URL +   '&layer='+ _name_stripedHtml  +  '&center_zoom=17' + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                                                        html += '">';
                                                                                                        html += '<big>26</big>'    
                                                                                                        html += '</a>';
                                              
                                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                                      
                                                                                                        // google g27
                                                                                                        html += '<a target="_blank" href="' + url_template_base_googlemaps_geocodeServer.replace('googlemaps26/default?','googlemaps27/default?')
                                                                                                        html += '&url2=' + _apps_URL +   '&layer='+ _name_stripedHtml  +  '&center_zoom=17' + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                                                        html += '">';
                                                                                                        html += '<big>27</big>'    
                                                                                                        html += '</a>';
                                              
                                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                                      
                                                                                                                       
                                                                                                        // google g28
                                                                                                        html += '<a target="_blank" href="' + url_template_base_googlemaps_geocodeServer.replace('googlemaps26/default?','googlemaps28/default?')
                                                                                                        html += '&url2=' + _apps_URL +   '&layer='+ _name_stripedHtml  +  '&center_zoom=17' + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                                                        html += '">';
                                                                                                        html += '<big>28</big>'     
                                                                                                        html += '</a>';
                                              
                                                                                                        html += '&nbsp;&nbsp;&nbsp;'

                                                                                              break;





                                                                                            case 'MapServer':

                                                                                              html += '<small><sup>';
                                                                                                            
                                                                                                            html += 'mapServer';
                                                                                                            html += '&nbsp;&nbsp;&nbsp;'

                                                                                                            // ============ original icon ============               
                                                                              
                                                                                                                  //  original page icon       web-page-url   
                                                                                                                  html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                                  html += _results[i].identifier;  //'origin'  
                                                                                                                  html += '</a>';
                                              
                                                                                                                  html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                  html += 'source';
                                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                                                                              
                                                                              
                                                                                                                  if (_apps_URL.length > 0 ){
                                                                                                                            // original source icon     rest api -url   
                                                                                                                            html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                                            html += _apps_URL;  //'source'  
                                                                                                                            html += '</a>';
                                              
                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += 'rest-api';
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                  }
                                                                                                                  html += '</sup></small>';
                                                                                                            // ============  end  ============   original icon ============ 



                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer

                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3120</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3020</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2120</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2020</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3100</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3000</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2100</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2000</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_flat
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1001</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_flat.replace('featurelayer_flat.','featurelayer_flat_fullscreen.')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye10021</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'



                                                              // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1300</big>'     
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_fullscreen.')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1302</big>'     
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              //popup
                                                              // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_popup.')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1310</big>'    
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                            
                                                              // CMV v3.x icon
                                                              html += '<a target="_blank" href="' + url_template_base_esri
                                                              html += '&url=' + _apps_URL + '&title='+ _name_stripedHtml  +  '&zoom=16'  +  '&lat=' + _center_lat +  '&long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>e1997-classic</big>'     
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              break;



                                                           case 'FeatureServer':



                                                                                              html += '<small><sup>';
                                                                                                                    html += 'featureServer';
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                    // ============ original icon ============               
                                                                                      
                                                                                                                          //  original page icon       web-page-url   
                                                                                                                          html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                                          html += _results[i].identifier;  //'origin'  
                                                                                                                          html += '</a>';
                                              
                                                                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                          html += 'source';
                                                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                                      
                                                                                      
                                                                                                                          if (_apps_URL.length > 0 ){
                                                                                                                                    // original source icon     rest api -url   
                                                                                                                                    html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                                                    html += _apps_URL;  //'source'  
                                                                                                                                    html += '</a>';
                                              
                                                                                                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                                    html += 'rest-api';
                                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                          }
                                                                                              html += '</sup></small>';
                                                                                                                    // ============  end  ============   original icon ============ 

                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer

                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3120</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3020</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2120</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'



                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2020</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3100</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>3000</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer_multi')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2100</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'



                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>2000</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_flat
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1001</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_flat.replace('featurelayer_flat.','featurelayer_flat_fullscreen.')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye10021</big>'      
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'



                                                              // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1300</big>'     
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'


                                                              // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_fullscreen.')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1302</big>'     
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                              //popup
                                                              // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                                              html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_popup.')
                                                              html += 'url=' + _apps_URL + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>eye1310</big>'    
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                            
                                                              // CMV v3.x icon
                                                              html += '<a target="_blank" href="' + url_template_base_esri
                                                              html += '&url=' + _apps_URL + '&title='+ _name_stripedHtml  +  '&zoom=16'  +  '&lat=' + _center_lat +  '&long=' +  _center_long   
                                                              html += '">';
                                                              html += '<big>e1997-classic</big>'     
                                                              html += '</a>';
                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                             break;

                                                                                              case 'VectorTileServer':


                                                                                                html += '<small><sup>';
                                                                                                                  
                                                                                                                  html += 'vectorTileServer';
                                                                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                  // ============ original icon ============               
                                                                                    
                                                                                                                        //  original page icon       web-page-url   
                                                                                                                        html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                                        html += _results[i].identifier; //'origin'  
                                                                                                                        html += '</a>';

                                                                                                                        html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                        html += 'source';
                                                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                    
                                                                                                                        if (_apps_URL.length > 0 ){
                                                                                                                                  // original source icon     rest api -url   
                                                                                                                                  html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                                                  html += _apps_URL;  //'source'  
                                                                                                                                  html += '</a>';

                                                                                                                                  html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                                  html += 'rest-api';
                                                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                        }
                                                                                                                        html += '</sup></small>';
                                                                                                                  // ============  end  ============   original icon ============ 

/**/
                                                                                                                    
                                                                                                                    // mapbox 13, default 0, with label 
                                                                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox_vector_tile_layer
                                                                                                                    html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                                                    html += '">';
                                                                                                                    html += '<big>m13</big>'    
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'


                                                                                                                    // mapbox 13, default 2, No label 
                                                                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox_vector_tile_layer.replace('default?','default2?')
                                                                                                                    html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                                                    html += '">';
                                                                                                                    html += '<big>m14</big>'    
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'


                                                                                                                    // openlayer,  with label 
                                                                                                                    html += '<a target="_blank" href="' + url_template_base_openlayers_vector_tile_layer
                                                                                                                    html += '&url=' + _apps_URL + '&layer=' + _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                                                    html += '">';
                                                                                                                    html += '<big>o1</big>'    
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'


                                                                                                                    // openlayer, No label 
                                                                                                                    html += '<a target="_blank" href="' + url_template_base_openlayers_vector_tile_layer.replace('arcgisvector.html?','arcgisvector2.html?')
                                                                                                                    html += '&url=' + _apps_URL + '&layer=' + _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                                                    html += '">';
                                                                                                                    html += '<big>o2</big>'    
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                    
                                                                                                                    // esri v4.x icon
                                                                                                                    html += '<a target="_blank" href="' + url_template_base_esri_vector_tile_layer
                                                                                                                    html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                                                                                    html += '">';
                                                                                                                    html += '<big>e231</big>'       
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                    
                                                                                                                    
                                                                                                                  //popup
                                                                                                                  // esri v4.x icon
                                                                                                                    html += '<a target="_blank" href="' + url_template_base_esri_vector_tile_layer_popup
                                                                                                                    html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17'  + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                                                    html += '">';
                                                                                                                    html += '<big>e232</big>'     
                                                                                                                    html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                    
                                                                                                                      // cmv v3.x icon
                                                                                                                      html += '<a target="_blank" href="' + url_template_base_esri_vector_tile
                                                                                                                      html += '&url=' + _apps_URL + '&title='+ _name_stripedHtml  +  '&zoom=16'  +  '&lat=' + _center_lat +  '&long=' +  _center_long   
                                                                                                                      html += '">';
                                                                                                                      html += '<big>e230-classic</big>'    
                                                                                                                      html += '</a>';
                                              
                                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                    
                                                                                                break;

                                                                                            case 'SceneServer':


                                                                                              html += '<small><sup>';
                                                                                                            
                                                                                                            html += 'sceneServer';
                                                                                                            html += '&nbsp;&nbsp;&nbsp;'

                                                                                                            // ============ original icon ============               
                                                                              
                                                                                                                  //  original page icon       web-page-url   
                                                                                                                  html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                                  html += _results[i].identifier; //'origin'  
                                                                                                                  html += '</a>';
                                              
                                                                                                                  
                                                                                                                  html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                  html += 'source';
                                                                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                              
                                                                              
                                                                                                                  if (_apps_URL.length > 0 ){
                                                                                                                            // original source icon     rest api -url   
                                                                                                                            html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                                            html += _apps_URL; //'source'  
                                                                                                                            html += '</a>';
                                              
                                                                                                                            
                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += 'rest-api';
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                  }
                                                                                                                  html += '</sup></small>';
                                                                                                            // ============  end  ============   original icon ============ 

/**/

                                                                                                          // esri v4.x icon
                                                                                                            html += '<a target="_blank" href="' + url_template_base_esri_scene_layer
                                                                                                            html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&center_zoom=17' + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                                            html += '">';
                                                                                                            html += '<big>e140</big>'    
                                                                                                            html += '</a>';
                                              
                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                          
                                                                                                            //popup 
                                                                                                          // esri v4.x icon
                                                                                                            html += '<a target="_blank" href="' + url_template_base_esri_scene_layer.replace('scenelayer.html','scenelayer2.html') 
                                                                                                            html += '&url=' + _apps_URL + '&layer='+ _name_stripedHtml  +   '&center_zoom=17' + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                                            html += '">';
                                                                                                            html += '<big>e141</big>'    
                                                                                                            html += '</a>';
                                              
                                                                                                            html += '&nbsp;&nbsp;&nbsp;'

                                                                                              break;



                                                                                  default:


                                                                                          // type (other)
                                                                                          html += '<small><sup>';
                                                                                          html += 'document';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          // ============ original icon ============               
                                                            
                                                                                                //  original page icon       web-page-url   
                                                                                                html += '<a target="_blank" href="' + _results[i].identifier + '">';
                                                                                                html += _results[i].identifier;  //'origin'  
                                                                                                html += '</a>';

                                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                html += 'source';
                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                if (_apps_URL.length > 0 ){
                                                                                                          // original source icon     rest api -url   
                                                                                                          html += '<a target="_blank" href="' + _apps_URL + '">';
                                                                                                          html +=  _apps_URL;  //'source'  
                                                                                                          html += '</a>';
                                              
                                                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                }
                                                                                                html += '</sup></small>';
                                                                                          // ============  end  ============   original icon ============   
                                                                                    
                                                                                } // switch

            
                                              }// if other document
                                                                html += '<br><br>';
                                                                html += '</li>';
                                                                
            
                                            } // for
            
                                              html += '</ol>';
            
                                          }// if
                                           
                                        html +='</div>'
           
                                        /* Insert HTML in target DOM element */
                                       // $(this).html(html);
                                      $('#json-renderer').html(html);
           
}
           
  
  
  
  
  
  
  
  
  
  
  
  




                                 //  for search.js only,   featuretable only have rest api, NO geojson, NO csv
                                 function rendering_json_to_html_for_search(_results) {
                     
                                      var html = '';            
                                      html += '<div>';                           
                                      if (_results.length > 0){                 
                                          html += '<ol class="custom-counter">';
                                          for (var i = 0; i < _results.length; ++i){
                                              html += '<li>' // css .ordered_list_number{ size font}

                                              // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
                                              /**/
                                                                                                    // ...... attributes ......
                                                                                                        var ___url_with_mapserver_id= _results[i].attributes.url;     //"https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/5"
                                                                                                        var _name = _results[i].attributes.name;     //name: "Ajax POI"
                                                                                                        var _orgId = _results[i].attributes.orgId;    
                                                                                                        var _orgName = _results[i].attributes.orgName;    
                                                                                                        var _organization = _results[i].attributes.organization; 
                                                                                                          
                                                                                                        var _hasApi = _results[i].attributes.hasApi;    
                                                                                                        var _hubType = _results[i].attributes.hubType;     //hubType: "Feature Layer" or "Table"
                                                                                                        var _type = _results[i].attributes.type;
                                                                                      
                                                                                                        var ___layer_name = _name     
                                                                                                              
                                                                                                      if ( _orgName == undefined) { _orgName = '' }
                                                                                                      if ( _organization == undefined) { _organization = '' }
                                                                                                      //console.log(' hasApi  organization  ___url  -> ', i, _organization ,  _hasApi,___url )
                                                                                                      //console.log(' hubType  ',   _hubType, i)
                                                                                                  // ...... end ..........  attributes ......
                                                                                                  /**/

                                                                                                    // ....... links .........
                                                                                                          var _esriRest_links = _results[i].links.esriRest
                                                                                                          var _itemPage_links = _results[i].links.itemPage
                                                                                                          var _rawEs_links = _results[i].links.rawEs
                                                                                                          var _self_links = _results[i].links.self
                                                                                                    // ...... end ..........  links .........
                                                                                                     /**/
                                              // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
                                              /**/
                                                                                      
                                                                                        
                                                                                      // ....... strip HTML from a string  .....
                                                                                        
                                                                                      
                                                                                            // https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
                                                                                      
                                                                                            // ==== first step: remove html tag
                                                                                          
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
                                                                                            //_description_stripedHtml = _description_stripedHtml.replace(/<[^>]+>/g, '');
                                                                                            //_name_stripedHtml = _name_stripedHtml.replace(/<[^>]+>/g, '');
                                                                
                                                                
                                                                
                                                                                            // ==== second step: encode >, <, 
                                                                                            
                                                                                            
                                                                                            _name_stripedHtml = _name_stripedHtml.replace(/</g, '&lt;');
                                                                                            _name_stripedHtml = _name_stripedHtml.replace(/>/g, '&gt;');
                                                                                            
                                                                                      // ....... end ......  strip HTML from a string  .....
                                                                
                                                                
                                                                                            // text 
                                                                                            // class="context" for mark.js highlight, 
                                                                                            html += '&nbsp;';
                                                                                            html += '<span class="context"><big><b>'  + _name_stripedHtml  +  '</b></big></span><sup>' +   _orgName + '</sup>' 
                                                                                            

                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                            

                                                                                      // if none identified, fall to last section as 'all others' 
                                                                                      var _hubtype_identified = false

                                                                            /**/ 
                                                                            // *********** hubType: Feature Collection   ***********
                                                                            // must before 'feature'  section                            
                                                                            if (_hubType.toLowerCase().includes('collection')){
                                                                                                                
                                                                                                      //  *********  hubType *********
                                                                                                      html += '<small><sup>';
                                                                                                            html +=  _hubType  
                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                      //  ********* end   ********* hubType *********
                                                                                                          /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin' 
                                                                                                                            html +=  '</a>';
                                                      
                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += '</sup></small>';
                                                                                                                        //====== end ===== original item page  ======
                                                                                _hubtype_identified = true
                                                                                continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                                                            }
                                                                            // *********** end  ********** hubType: Feature Collection    ***********
                                                                            /**/ 
                                                 
                                                                            /**/ 
                                                                            // *********** hubType: feature layer,feature service ,only,  handle rest api URL   ***********
                                                                            if (_hubType.toLowerCase().includes('feature')){
                                                                                                      // *************** calculate layer id only ***************
                                                                                                                      var _coordinates ={}
                                                                                                                      var ____center_lat = 40.755931
                                                                                                                      var ____center_long = -73.984606
                                                                                                                      if (_results[i].attributes.extent){
                                                                                                                                    _coordinates = _results[i].attributes.extent.coordinates;
                                                                                                
                                                                                                                                    ____center_lat = (_coordinates[0][1] + _coordinates[1][1])/ 2
                                                                                                                      
                                                                                                                                    ____center_long = (_coordinates[0][0] + _coordinates[1][0])/ 2
                                                                                                
                                                                                                                        }
                                                                                                                        
                                                                                                                        var ___url_split_array = []
                                                                                                                        var ___layer_id = -99999
                                                                                                                        var ___layer_id_string = ''
                                                                                                                        var ___url = ''
                                                                                                                        
                                                                                                                        if(typeof ___url_with_mapserver_id !== "undefined"){

                                                                                                                                                        ___url_split_array = ___url_with_mapserver_id.split("/")

                                                                                                                                                        console.log(' layer id is number ? ',  ___url_split_array[___url_split_array.length-1])
                                                                                                                                                         
                                                                                                                                                        if (isNaN(___url_split_array[___url_split_array.length-1])){
                                                                                                                                                            ___layer_id = -99999
                                                                                                                                                            ___url = ___url_with_mapserver_id
                                                                                                                                                            console.log(' this is feature server or map server, without layer id',  ___layer_id)
                                                                                                                                                          } else {
                                                                                                                                                            ___layer_id = ___url_split_array[___url_split_array.length-1]
                                                                                                                                                            ___layer_id_string = '/'+ ___layer_id.toString()
                                                                                                                                                            ___url = ___url_with_mapserver_id.replace(___layer_id_string, "");
                                                                                                                                                        }
                                                                                                                        
                                                                                                                        
                                                                                                
                                                                                                                                        // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                                                                                                                                              var _link_protocal = window.location.protocol;
                                                                                                                                                              var _link_url_parameter = ___url_with_mapserver_id;
                                                                                                                                                              if (_link_url_parameter.indexOf('http://') > -1)
                                                                                                                                                          {
                                                                                                
                                                                                                                                                                  // if resource url is http, force link protacal as http: 
                                                                                                                                                                  _link_protocal = 'http:'
                                                                                                                                                              }// if
                                                                                                                                                        // ------ end fix bug,
                                                                                                                        
                                                                                                                        
                                                                                                                        
                                                                                                                        } else {
                                                                                                                            
                                                                                                                            
                                                                                                                            
                                                                                                                            
                                                                                                                        }

                                                                                                      // ************** end ************** calculate layer id only ***************
                                                                                                /**/
                                                                                                      /*  ... ... ....  naming match from hub.html to search.html  ... ... ....  */

                                                                                                              var __layerId = ___layer_id
                                                                                                              var _center_lat = ____center_lat
                                                                                                              var _center_long = ____center_long
                                                                                                              var __restapi_url = ___url
                                                                                                              // for esri classic v3.x only
                                                                                                              var _accessURL = ___url + '/'+ ___layer_id

                                                                                                      /*  ... ... .... end    ... ... ....  naming match from hub.html to search.html  ... ... ....  */
                            /**/
                                                                                                                  //  *********  hubType *********
                                                                                                                  html += '<small><sup>';
                                                                                                                        html += 'map'
                                                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                  //  ********* end   ********* hubType *********
                            /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links; //'origin'   
                                                                                                                            html +=  '</a>';

                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += 'source';
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                        //====== end ===== original item page  ======
                                              /**/
                                                                                                                //====== original source icon  ======
                                                                                                                  html += '<a target="_blank" href="' + ___url_with_mapserver_id + '">';
                                                                                                                  html += ___url_with_mapserver_id;  //'source'   
                                                                                                                  html +=  '</a>';
                                                                                                              //====== end ===== original source icon  ======
                                                                /**/


                                                    if (___layer_id !== -99999){


                                                                        //*********  ***********  rest api  ***********  *********** 
                                                                            /**/
                                                                                        //*********  google ***********  
                                                                                          /**/
                                                                                                  
                                                                                          html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                          html += 'feature layer';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '</sup></small>';




                                                                                                  // .... single layer .... google ....
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>0</big>'  
                                                                                                  html +=  '</a>';
                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps/default_card?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>0card</big>'  
                                                                                                  html +=  '</a>';
                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>10</big>'  
                                                                                                  html +=  '</a>';
                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps10/default_card?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>10card</big>'  
                                                                                                  html +=  '</a>';
                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>110</big>' 
                                                                                                  html += '</a>';
                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>120</big>'  
                                                                                                  html +=  '</a>';
                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                                                                                                  //  ....  end  .... single layer .... google ....
                                                                                                  /**/
                            
                            
                            
                            
                            
                                                                                                  /**/
                                                                                                    // ==== data classified =====  google  =====  
                                                                                                    html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps4/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                    html += '<big>4</big>' 
                                                                                                    html +=  '</a>';
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                    html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps141/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                    html += '<big>141</big>' 
                                                                                                    html +=  '</a>';
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                            
                                                                                                    html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps140/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                    html += '<big>140</big>' 
                                                                                                    html +=  '</a>';
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                                
                                                                                                    html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps410/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                    html += '<big>410</big>' 
                                                                                                    html +=  '</a>';
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                                  // ==== data classified =====  google  ===== 
                                                                                                  /**/ 
                                                                                      
                                        
                                                                                  //  *** end ******  google *********** 
                                                                                  /**/






                                                                                                // -- -- apple  -- -- 

                                                                                              html += '<a target="_blank" href="' + url_template_base_applemaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                              html += '<big>A0</big>'
                                                                                              html +=  '</a>';
                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                              html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps/default2?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                              html += '<big>A0p</big>'
                                                                                              html +=  '</a>';
                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                              html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                              html += '<big>A20</big>'
                                                                                              html +=  '</a>';
                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                              html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps20/default2?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                              html += '<big>A20p</big>'
                                                                                              html +=  '</a>';
                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                              html += '<a target="_blank" href="' + url_template_base_applemaps.replace('applemaps/default?','applemaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                              html += '<big>A120</big>'
                                                                                              html +=  '</a>';
                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                  //  -- --  end  -- -- apple  -- -- 
                                                                                  /**/




                                                                                    // .. ... bingmaps  .. ... 

                                                                                          html += '<a target="_blank" href="' + url_template_base_bingmaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>B0</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>B10</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>B20</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>B110</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_bingmaps.replace('bingmaps/default?','bingmaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>B120</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                    //  .. ...  end .. ... bingmaps  .. ... 
                                                                                    /**/


                                                                                    html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


                                                                                    // .. ... heremaps  .. ... 

                                                                                          html += '<a target="_blank" href="' + url_template_base_heremaps  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>H0</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>H10</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>H20</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>H110</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                          html += '<a target="_blank" href="' + url_template_base_heremaps.replace('heremaps/default?','heremaps120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                          html += '<big>H120</big>'
                                                                                          html +=  '</a>';
                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                    //  .. ...  end .. ... heremaps  .. ... 
                                                                                    /**/





                                                                                    // -- mapbox  -- 

                                                                                                html += '<a target="_blank" href="' + url_template_base_mapbox  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                html += '<big>M0</big>' 
                                                                                                html += '</a>';
                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox10/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                html += '<big>M10</big>' 
                                                                                                html += '</a>';
                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox20/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                html += '<big>M20</big>' 
                                                                                                html += '</a>';
                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox110/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                html += '<big>M110</big>' 
                                                                                                html += '</a>';
                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                html += '<a target="_blank" href="' + url_template_base_mapbox.replace('mapbox/default?','mapbox120/default?')  + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                html += '<big>M120</big>' 
                                                                                                html += '</a>';
                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                    //   --  end  -- mapbox  -- 
                                                                                    /**/


                                                                                                                                                              
                            /**/
                            // ----- esri ----- 
                                  

                                var _newTab_link =  url_template_base_esri_usgs + '/explore.html?backgroundlayerurl=' + _accessURL + '/'+ __layerId 
                                // token
                                if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                }
                                html += '<a target="_blank" href="' + _newTab_link + '">';
                                html += '<big>e11</big>'
                                html +=  '</a>';
                                html +='&nbsp;&nbsp;&nbsp;'


                                var _newTab_link =  url_template_base_esri_usgs + '/explore_hover.html?backgroundlayerurl=' + _accessURL + '/'+ __layerId 
                                // token
                                if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                }
                                html += '<a target="_blank" href="' + _newTab_link + '">';
                                html += '<big>e12</big>'
                                html +=  '</a>';
                                html +='&nbsp;&nbsp;&nbsp;'


                                var _newTab_link =  url_template_base_esri_usgs + '/classify_data.html?backgroundlayerurl=' + _accessURL + '/'+ __layerId 
                                // token
                                if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                }
                                html += '<a target="_blank" href="' + _newTab_link + '">';
                                html += '<big>e41</big>'
                                html +=  '</a>';
                                html +='&nbsp;&nbsp;&nbsp;'
                                            
                                        


                                var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature.html?') +  '&backgroundlayerurl=' + _accessURL + '/'+ __layerId 
                                // token
                                if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                }
                                html += '<a target="_blank" href="' + _newTab_link + '">';
                                html += '<big>e22</big>'
                                html +=  '</a>';
                                html +='&nbsp;&nbsp;&nbsp;'
                                    

                                var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature.html?') +  '&backgroundlayerurl=' + _accessURL + '/'+ __layerId 
                                // token
                                if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                }
                                html += '<a target="_blank" href="' + _newTab_link + '">';
                                html += '<big>e23</big>'
                                html +=  '</a>';
                                html +='&nbsp;&nbsp;&nbsp;'
                                  
                                    

                            // -----  end ----- esri ----- 
                            /**/
                                        
                                                                                            /*
                                                                                              *   https://developers.arcgis.com/javascript/latest/sample-code/widgets-layerlist-legend/index.html
                                                                                              Invalid portal item type 'Feature Service', expected 'Web Map', 
                                                                                                  portal id must be webmap item.
                                        
                                                                                                // icon+ esri-webmap portal id
                                                                                                // (not apply here:  socrata must be &center_lat=40.72&center_long=-74,   &center_zoom=9 is optional and be any zoom level )
                                                                                                // for arcgis only:  center_zoom=17 means pan_to_real_location
                                                                                                html += '<a target="_blank" href="' + url_template_base_esri_webmap_portalid 
                                                                                                html +=   'layer=' +  _name_stripedHtml  
                                                                                                html +=   '&portal-id=' +  _portal_id 
                                                                                                html +=   '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'"   data-tooltip="Esri portal webmap v4.x">';
                                        
                                        
                                                                                                html += '<span class="mdi mdi-food-apple"></span>'  +  '</a>&nbsp;&nbsp;&nbsp;'
                                        
                                                                                              */
                                        
                                        
                                        
                                        
                                        
                                        
                                                                                            /*  have bug, portal id      
                                                                                                // icon+ esri-featurelayer native portal id
                                                                                                // (not apply here:  socrata must be &center_lat=40.72&center_long=-74,   &center_zoom=9 is optional and be any zoom level )
                                                                                                // for arcgis only:  center_zoom=17 means pan_to_real_location
                                                                                                html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_portalid  
                                                                                                html +=   'layer=' +  _name_stripedHtml  
                                                                                                html +=   '&portal-id=' +  _portal_id 
                                                                                                html +=  '&url='+ _geojson_downloadURL +  '&_center_lat='+ _center_lat + '&_center_long='+  _center_long + '&_center_zoom='+  _center_zoom +'"   >';
                                        
                                        
                                                                                                html += '<span class="mdi mdi-food-apple-outline"></span>'  +  '</a>&nbsp;&nbsp;&nbsp;'
                                                                                            */      
                                        

                                                                                                      // --------  attribute table  ---- rest api --------
                                                                                                  
                                                                                                        
                                                                                                          // featuretable4 -  - default     ?cross=default
                                                                                                          html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default');     
                                                                                                          html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                                                                          html += '<big>T4</big>';
                                                                                                          html += '</a>';

                                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                  
                                                                                                          // featuretable -  - default     ?cross=default
                                                                                                          html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default');     
                                                                                                          html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                                                                          html += '<big>T0</big>' 
                                                                                                          html += '</a>';

                                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                                                        
                                                                                                          // featuretable - esri grid
                                                                                                          html += '<a target="_blank" href="' + url_template_arcgis_feature_table;  
                                                                                                          html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                                                                          html += '<big>T-grid</big>' 
                                                                                                          html += '</a>';
                                                                                                  
                                                                                                          html += '&nbsp;&nbsp;&nbsp;'

                                                                                                      // -------- end --------   attribute table  ---- rest api --------

                                                                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                              } else {

                                // feature server, don't have layer id, (id is -1)
                                console.log(' show link for feature server or map server, without layer id',  ___layer_id)

                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                html += 'feature server';
                                html += '&nbsp;&nbsp;&nbsp;'
                                html += '</sup></small>';



                                // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer

                                html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root_multi')
                                html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                html += '">';
                                html += '<big>3120</big>'     
                                html += '</a>';
                                html += '&nbsp;&nbsp;&nbsp;'

                                  // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root')
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>3020</big>'     
                                  html += '</a>';
                                  html += '&nbsp;&nbsp;&nbsp;'

                                // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root_multi')
                                html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                html += '">';
                                html += '<big>2120</big>'     
                                html += '</a>';
                                html += '&nbsp;&nbsp;&nbsp;'

                                  // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root')
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>2020</big>'     
                                  html += '</a>';
                                  html += '&nbsp;&nbsp;&nbsp;'


                                html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer_multi')
                                html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                html += '">';
                                html += '<big>3100</big>'     
                                html += '</a>';
                                html += '&nbsp;&nbsp;&nbsp;'

                                  // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer')
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>3000</big>'     
                                  html += '</a>';
                                  html += '&nbsp;&nbsp;&nbsp;'

                                // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer_multi')
                                html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                html += '">';
                                html += '<big>2100</big>'     
                                html += '</a>';
                                html += '&nbsp;&nbsp;&nbsp;'

                                  // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer')
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>2000</big>'     
                                  html += '</a>';
                                  html += '&nbsp;&nbsp;&nbsp;'






                                  // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_flat
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>eye1001</big>'     
                                  html += '</a>';

                                  html += '&nbsp;&nbsp;&nbsp;'


                                   // esri v4.x icon, flat, (v4.12 not work) must use v4.11 with highlight, not use sublayer, instead use create new featureLayer
                                   html += '<a target="_blank" href="' + url_template_base_esri_featurelayer_flat.replace('featurelayer_flat.','featurelayer_flat_fullscreen.')
                                   html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                   html += '">';
                                   html += '<big>eye1002</big>'     
                                   html += '</a>';
 
                                   html += '&nbsp;&nbsp;&nbsp;'




                                  // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>eye1300</big>'     
                                  html += '</a>';

                                  html += '&nbsp;&nbsp;&nbsp;'


                                  // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_fullscreen.')
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>eye1302</big>'     
                                  html += '</a>';

                                  html += '&nbsp;&nbsp;&nbsp;'






                                  //popup
                                  // esri v4.x icon, nonflat, v4.11 no highlight, use sublayer, NOT featureLayer
                                  html += '<a target="_blank" href="' + url_template_base_esri_mapimagelayer_identify.replace('mapimagelayer_identify.','mapimagelayer_identify_popup.')
                                  html += 'url=' + __restapi_url + '&layer='+ _name_stripedHtml  +  '&_center_zoom=17'  + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                  html += '">';
                                  html += '<big>eye1310</big>'     
                                  html += '</a>';

                                  html += '&nbsp;&nbsp;&nbsp;'


                                  // CMV v3.x icon
                                  html += '<a target="_blank" href="' + url_template_base_esri
                                  html += '&url=' + __restapi_url + '&title='+ _name_stripedHtml  +  '&zoom=16' +   '&lat=' + _center_lat +  '&long=' +  _center_long   
                                  html += '">';
                                  html += '<big>e1997-classic</big>'    
                                  html += '</a>';

                                  html += '&nbsp;&nbsp;&nbsp;'

                              }// if layer id -1

                                                                                              _hubtype_identified = true
                                                                                              continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                                                                        
                         } 
                                                                
                         // *********** end ***********   hubType: feature layer, collection, service only,  handle rest api URL   ***********
                                                                /**/
                                                                                
                                                               // *********** hubType: feature table   ***********
                                                                
                                                               if (_hubType.toLowerCase().includes('table')){
                                                                                                      // *************** calculate layer id only ***************
                                                                                                      var ___url_split_array = []
                                                                                                      var ___layer_id = -99999
                                                                                                      var ___layer_id_string = ''
                                                                                                      var ___url = ''
                                                                                                        
                                                                                                        if(typeof ___url_with_mapserver_id !== "undefined"){

                                                                                                                                        ___url_split_array = ___url_with_mapserver_id.split("/")

                                                                                                                                        console.log(' layer id is number ? ',  ___url_split_array[___url_split_array.length-1])
                                                                                                                                                         
                                                                                                                                                        if (isNaN(___url_split_array[___url_split_array.length-1])){
                                                                                                                                                            ___layer_id = -99999
                                                                                                                                                            ___url = ___url_with_mapserver_id
                                                                                                                                                            console.log(' this is feature server or map server, without layer id',  ___layer_id)
                                                                                                                                                          } else {
                                                                                                                                                            ___layer_id = ___url_split_array[___url_split_array.length-1]
                                                                                                                                                            ___layer_id_string = '/'+ ___layer_id.toString()
                                                                                                                                                            ___url = ___url_with_mapserver_id.replace(___layer_id_string, "");
                                                                                                                                                        }
                                                                                                        
                                                                                                                        // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                                                                                                                              var _link_protocal = window.location.protocol;
                                                                                                                                              var _link_url_parameter = ___url_with_mapserver_id;
                                                                                                                                              if (_link_url_parameter.indexOf('http://') > -1)
                                                                                                                                          {
                                                                                
                                                                                                                                                  // if resource url is http, force link protacal as http: 
                                                                                                                                                  _link_protocal = 'http:'
                                                                                                                                              }// if
                                                                                                                                        // ------ end fix bug,
                                                                                                        
                                                                                                        } 
                                                                                      // ************** end ************** calculate layer id only ***************
                            /**/

                                                                                                                      //  *********  hubType *********
                                                                                                                      html += '<small><sup>';
                                                                                                                                // original  _hubType = Table
                                                                                                                                html += _hubType 
                                                                                                                                html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                        //  ********* end   ********* hubType *********
                            /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin'   
                                                                                                                            html +=  '</a>';
                                                      
                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += 'source';
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                        //====== end ===== original item page  ======
                            /**/                                                    
                                                                                                                            //====== original source icon  ======
                                                                                                                              html += '<a target="_blank" href="' + ___url_with_mapserver_id + '">';
                                                                                                                              html += ___url_with_mapserver_id;  //'source'   
                                                                                                                              html +=  '</a>';
                                                      
                                                                                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                              html += 'rest-api';
                                                                                                                              html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                              html += '</sup></small>';
                                                                                                                          //====== end ===== original source icon  ======
                                                /**/
                                                                                                                              // --------  attribute table  ---- rest api --------
                                                                                                                          
                                                                                                                                      // featuretable4 -  - default     ?cross=default
                                                                                                                                      html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default');   
                                                                                                                                      html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                                                                                                      html +=  '<big>T4</big>';           //_name_stripedHtml 
                                                                                                                                      html +=  '</a>';
                                                      
                                                                                                                                      html += '&nbsp;&nbsp;&nbsp;'
                                                                                              
                                                                                                                                      // featuretable -  - default     ?cross=default
                                                                                                                                      html += '<a target="_blank" href="' + url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default');   
                                                                                                                                      html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                                                                                                      html +=  '<big>T0</big>';           //_name_stripedHtml 
                                                                                                                                      html +=  '</a>';
                                                      
                                                                                                                                      html += '&nbsp;&nbsp;&nbsp;'
                                                                                              
                                                                                                                                        // featuretable - esri grid
                                                                                                                                        html += '<a target="_blank" href="' + url_template_arcgis_feature_table;  
                                                                                                                                        html += '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml  + '&url=' + __restapi_url + '">';
                                                                                                                                        html += '<big>T-grid</big>';           //_name_stripedHtml 
                                                                                                                                        html +=  '</a>';
                                                      
                                                                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                        

                                                                                                                            // -------- end --------   attribute table  ---- rest api --------

                                                                                                _hubtype_identified = true
                                                                                                continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.                    
                                                               }

                                                                               
                                                                
                                                              // *********** NOT do .geoJSON because, not provide the hub domain, only rest api domain available    ***********
                                                                
                                                                                
                                                                                      //  for xxxx/id.geojson      
                                                                                      //  var ___id = _results[i].id;    
                                                                                      //  var ___downloadable =  _results[i].attributes.downloadable;      // true, means,  ___id.geojson available
                                                                
                                                                
                                                                
                                                                                    //   if (___downloadable){
                                                                
                                                                                            //not included in this search result: http://opendata.ajax.ca  not host on esri,  ___id.geojson only available this domain.
                                                                                            // this search result only have this:   https://exploreajax.ajax.ca/mapajax/rest/services/
                                                                                            // can't make geojson icon, because only id.geojson available, but not domain. 
                                                                                            // geojson download URL is:   domain/datasets/id.geojson
                                                                
                                                                
                                                                
                                                                                    //   }
                                                                
                                                                
                                                                               
                                                            // *********** hubType: Geojson   ***********
                                                            if (_hubType.toLowerCase().includes('geojson')){
                                                                                                          
                                                                                                                      //  *********  hubType *********
                                                                                                                            html += '<small><sup>';
                                                                                                                            html +=  _hubType 
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                                        //  ********* end   ********* hubType *********
                            /**/
                                                                                                                            //====== original item page  ======
                                                                                                                              html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                              html +=  _itemPage_links;  //'origin'   
                                                                                                                              html += '</a>';

                                                                                                                              html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                              html += '</sup></small>';
                                                                                                                          //====== end ===== original item page  ======

                                                                                                _hubtype_identified = true
                                                                                                continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                                            }

                                                                                // *********** end  ********** hubType: Geojson   ***********
                                                                                /**/
                                                                                  // *********** hubtype = 'Web Map' or 'Web Mapping Application'  ***********
                                                                
                                                                                  if (_hubType.toLowerCase().includes('map')){
                                                                                        // hubtype = 'Web Map' or 'Web Mapping Application'
                                                                                                            //  *********  hubType *********
                                                                                                            html += '<small><sup>';
                                                                                                                html += _hubType
                                                                                                                html += '&nbsp;&nbsp;&nbsp;'
                                                                                                            //  ********* end   ********* hubType *********
                                                                                                            /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin'   
                                                                                                                            html += '</a>';

                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += '</sup></small>';
                                                                                                                        //====== end ===== original item page  ======
                                                                                      _hubtype_identified = true
                                                                                      continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                                                                  }
                                                                                  // *********** end  ********** hubtype = 'Web Map' or 'Web Mapping Application'   ***********

                                                                              /**/   
                                                                          // *********** hubType: Raster   ***********
                                                                                                          
                                                                          if (_hubType.toLowerCase().includes('raster')){
                                                                                                                          
                                                                                                      // *************** calculate layer id only ***************
                                                                                                      var _coordinates ={}
                                                                                                      var ____center_lat = 40.755931
                                                                                                      var ____center_long = -73.984606
                                                                                                      if (_results[i].attributes.extent){
                                                                                                                    _coordinates = _results[i].attributes.extent.coordinates;
                                                                                
                                                                                                                    ____center_lat = (_coordinates[0][1] + _coordinates[1][1])/ 2
                                                                                                      
                                                                                                                    ____center_long = (_coordinates[0][0] + _coordinates[1][0])/ 2
                                                                                
                                                                                                      }
                                                                                                        
                                                                                                        var ___url_split_array = []
                                                                                                        var ___layer_id = -99999
                                                                                                        var ___layer_id_string = ''
                                                                                                        var ___url = ''
                                                                                                        
                                                                                                        
                                                                                                        if(typeof ___url_with_mapserver_id !== "undefined"){

                                                                                                                                        ___url_split_array = ___url_with_mapserver_id.split("/")

                                                                                                                                        console.log(' layer id is number ? ',  ___url_split_array[___url_split_array.length-1])
                                                                                                                                                         
                                                                                                                                        if (isNaN(___url_split_array[___url_split_array.length-1])){
                                                                                                                                            ___layer_id = -99999
                                                                                                                                            ___url = ___url_with_mapserver_id
                                                                                                                                            console.log(' this is feature server or map server, without layer id',  ___layer_id)
                                                                                                                                          } else {
                                                                                                                                            ___layer_id = ___url_split_array[___url_split_array.length-1]
                                                                                                                                            ___layer_id_string = '/'+ ___layer_id.toString()
                                                                                                                                            ___url = ___url_with_mapserver_id.replace(___layer_id_string, "");
                                                                                                                                        }
                                                                                                        
                                                                                                        
                                                                                
                                                                                                                        // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                                                                                                                              var _link_protocal = window.location.protocol;
                                                                                                                                              var _link_url_parameter = ___url_with_mapserver_id;
                                                                                                                                              if (_link_url_parameter.indexOf('http://') > -1)
                                                                                                                                          {
                                                                                
                                                                                                                                                  // if resource url is http, force link protacal as http: 
                                                                                                                                                  _link_protocal = 'http:'
                                                                                                                                              }// if
                                                                                                                                        // ------ end fix bug,
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        } else {
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                        }

                                                                                      // ************** end ************** calculate layer id only ***************
                                                                                
                            /**/
                                        
                                                                                      /*  ... ... ....  naming match from hub.html to search.html  ... ... ....  */



                                                                                              var __layerId = ___layer_id
                                                                                              var _center_lat = ____center_lat
                                                                                              var _center_long = ____center_long
                                                                                              var __restapi_url = ___url
                                                                                              // for esri classic v3.x only
                                                                                              var _accessURL = ___url + '/'+ ___layer_id

                                                                                      /*  ... ... .... end    ... ... ....  naming match from hub.html to search.html  ... ... ....  */

                            /**/

                                                                                                    //  *********  hubType *********
                                                                                                            html += '<small><sup>';
                                                                                                            html +=  _hubType   
                                                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                                                    //  ********* end   ********* hubType *********
                            /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin'   
                                                                                                                            html += '</a>';

                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += 'rest-api';
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                            html += '</sup></small>';
                                                                                                                        //====== end ===== original item page  ======
                                              
                                                                                                  /*
                                                                                                        specially on     arcgis-online-search

                                                                                                        "Raster layer" is on Map server
                                                                                                        
                                                                                                        we treat it as mapserver/raster layer ,  warning, export image usually not available, only tile available, 
                                                                                                        so use g7, g12, we must enforce overlay image type,   &overlayType=overlayType_tiled_image
                                                                                                    
                                                                                                  */


                                                                                                        html +=  'Tile only';
                                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                  
                                                                                                  // .... Image Only .... googlemap917 --- must enforce --- &overlayType=overlayType_tiled_image
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps917/default?') + '&overlayType=overlayType_tiled_image' + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>917</big>'
                                                                                                  html += '</a>';

                                                                                                  html += '&nbsp;&nbsp;&nbsp;'
                                                  
                                                                                                  
                                                                                                  // .... Tile Only .... googlemap912  
                                                                                                  html += '<a target="_blank" href="' + url_template_googlemaps.replace('googlemaps/default?','googlemaps912/default?')  + '&overlayType=overlayType_tiled_image' + '&layer_id=' + __layerId + '&layer='+ _name_stripedHtml +  '&center_lat='+ _center_lat + '&center_long='+  _center_long + '&center_zoom=17' + '&url=' + __restapi_url + '">';
                                                                                                  html += '<big>912</big>'
                                                                                                  html += '</a>';

                                                                                                  html += '&nbsp;&nbsp;&nbsp;'

                                                                              _hubtype_identified = true
                                                                              continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                                                          }

                                                                          // *********** end  ********** hubType: Raster   ***********
                            /**/
                                                                            // *********** hubType: Web Scene   ***********
                                                                                                          
                                                                            if (_hubType.toLowerCase().includes('web scene')){
                                                                                                      //  *********  hubType *********
                                                                                                              html += '<small><sup>';
                                                                                                              html += _hubType   
                                                                                                              html += '&nbsp;&nbsp;&nbsp;'
                                                                                                      //  ********* end   ********* hubType *********
                                  /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin'   
                                                                                                                            html += '</a>';

                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                                                            html += '</sup></small>';
                                                                                                                        //====== end ===== original item page  ======                  
                                                                                _hubtype_identified = true
                                                                                continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.      
                                                                            }
                                                                            // *********** end  ********** hubType: Web Scene   ***********
                                                                            /**/
                                                                            // *********** hubType: Shapefile   ***********
                                                                            if (_hubType.toLowerCase().includes('shapefile')){
                                                                                                      //  *********  hubType *********
                                                                                                                html += '<small><sup>';
                                                                                                                html += _hubType   
                                                                                                                html +=  '&nbsp;Tile only&nbsp;';
                                                                                                      //  ********* end   ********* hubType *********
                                                                                                      /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin'
                                                                                                                            html += '</a>';

                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

                                                                                                                            html += '</sup></small>';
                                                                                                                        //====== end ===== original item page  ======
                                              
                                                                                _hubtype_identified = true
                                                                                continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                  
                                                                            }
                                                                                  // *********** end  ********** hubType: Shapefile   ***********
                              /**/
                                                                            // *********** hubType: Image   ***********
                                                                                                          
                                                                            if (_hubType.toLowerCase().includes('image')){
                                                                                  /*  
                                                                            
                                                                                  Image Service
                                                                                    ------- image server -----------
                                                                                    example: 
                                                                                    https://www.arcgis.com/home/item.html?id=91cc492a0cd3424caaccc0e56efe8155
                                                                                    https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer
                                                                                    json example: 

                                                                                                    {
                                                                                                        attributes:

                                                                                                                  content: "Image Service"
                                                                                                                
                                                                                                                  hubType: "Image Service"
                                                                                                                  id: "91cc492a0cd3424caaccc0e56efe8155"
                                                                                                                  
                                                                                                                  name: "NOAA Raster Nautical Charts (RNC)"
                                                                                                                  orgExtent: {ymin: 6446275.841012891, xmin: -20037508.342779424, ymax: 12932243.111976184, xmax: -13358338.895186277, spatialReference: {…}}
                                                                                                                  orgId: "8MMg7skvEbOESlSM"
                                                                                                                  orgName: "Alaska Department of Environmental Conservation"
                                                                                                                  organization: "Alaska Department of Environmental Conservation"
                                                                                                                  
                                                                                                                  tags: (6) ['noaa', 'nautical', 'raster', 'charts', 'rnc', 'seamless']
                                                                                                                  
                                                                                                                  type: "Image Service"
                                                                                                                  
                                                                                                                  url: "https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer"
                                                                                                                  

                                                                                                    }
                                                                              
                                                                            */
                                  
                                                                                                      //  *********  hubType *********
                                                                                                                html += '<small><sup>';
                                                                                                                html +=  _hubType 
                                                                                                                html += '&nbsp;&nbsp;&nbsp;'
                                                                                                      //  ********* end   ********* hubType *********
                                                                                                      /**/
                                                                                                                        //====== original item page  ======
                                                                                                                            html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                            html += _itemPage_links;  //'origin'   
                                                                                                                            html += '</a>';

                                                                                                                            html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                            html += 'rest-api';
                                                                                                                            html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                            html += '</sup></small>';
                                                                                                                        //====== end ===== original item page  ======
                                              
                                                                                        // html +=  'Image server only';

                                                                                        // google g9
                                                                                        html += '<a target="_blank" href="' + url_template_base_googlemaps_imageServer
                                                                                        html += '&url=' + ___url_with_mapserver_id +   '&layer='+ _name_stripedHtml  +   '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                                        html += '">';
                                                                                        html += '<big>910</big>'    
                                                                                        html += '</a>';

                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                      
                                                                                      

                                                                                        // google g911
                                                                                        html += '<a target="_blank" href="' + url_template_base_googlemaps_imageServer.replace('googlemaps910/default?','googlemaps911/default?')
                                                                                        html += '&url=' + ___url_with_mapserver_id +   '&layer='+ _name_stripedHtml  +   '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                                        html += '">';
                                                                                        html += '<big>911</big>'      
                                                                                        html += '</a>';

                                                                                        html += '&nbsp;&nbsp;&nbsp;'
                                                                                      
                                                                                        

                                                                                                  
                                                                                        // esri v4.x icon
                                                                                          html += '<a target="_blank" href="' + url_template_base_esri_imagery_layer
                                                                                          html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +  '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                          html += '">';
                                                                                          html += '<big>3D</big>'     
                                                                                          html += '</a>';

                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                                        
                                                                                          //popup 
                                                                                        // esri v4.x icon
                                                                                          html += '<a target="_blank" href="' + url_template_base_esri_imagery_layer_popup
                                                                                          html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml   + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                          html += '">';
                                                                                          html += '<big>2D</big>'  
                                                                                          html += '</a>';

                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                                        
                                                                                        
                                                                                          // CMV icon v3.x
                                                                                          html += '<a target="_blank" href="' + url_template_base_esri3  
                                                                                          html += '&url=' + ___url_with_mapserver_id + '&title='+ _name_stripedHtml   +  '&lat='+ _center_lat +  '&long=' +  _center_long 
                                                                                          html += '">' 
                                                                                          html += '<big>Classic</big>' 
                                                                                          html += '</a>';

                                                                                          html += '&nbsp;&nbsp;&nbsp;'      
                                                                                                            
                                  
                                                                                _hubtype_identified = true
                                                                                continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                  
                                                                            }
                                  
                                                                            // *********** end  ********** hubType: Image   ***********
                                  
                                  
                                  
                            /**/



                                                                            // *********** hubType: Vector Tile Service   ***********
                                                                                                          
                                                                            if (_hubType.toLowerCase().includes('vector tile service')){
                                                                                                                                                    
                                                                                                                    
                                                                                                                    
                                                                              /*  
                                                                      


                                                                              Vector Tile Service




                                                                              ------- VectorTileServer -----------
                                                                                          
                                                                              example: 

                                                                              https://www.arcgis.com/home/item.html?id=91cc492a0cd3424caaccc0e56efe8155

                                                                              https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer





                                                                              json example: 

                                                                                              {
                                                                                                  attributes:

                                                                                                            content: "Vector Tile Service"
                                                                                                          
                                                                                                            hubType: "Vector Tile Service"
                                                                                                            id: "f74a81d3aa7446a083a2022cb739023f"
                                                                                                            
                                                                                                            name: "Colored Pencil Basemap"
                                                                                                            orgExtent: {ymin: 6446275.841012891, xmin: -20037508.342779424, ymax: 12932243.111976184, xmax: -13358338.895186277, spatialReference: {…}}
                                                                                                            orgId: "8MMg7skvEbOESlSM"
                                                                                                            orgName: "Alaska Department of Environmental Conservation"
                                                                                                            organization: "Alaska Department of Environmental Conservation"
                                                                                                            
                                                                                                            tags: (6) ['noaa', 'nautical', 'raster', 'charts', 'rnc', 'seamless']
                                                                                                            
                                                                                                            type: "Vector Tile Service"
                                                                                                            
                                                                                                            url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"

                                                                                              }
                                                                        
                                                                      */
                            
                                                                                                //  *********  hubType *********
                                                                                                          html += '<small><sup>';
                                                                                                          html +=  _hubType  
                                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                                                //  ********* end   ********* hubType *********
                                                                                                      /**/
                                                                                                                  //====== original item page  ======
                                                                                                                      html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                      html += _itemPage_links;  //'origin'   
                                                                                                                      html += '</a>';

                                                                                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                      html += 'rest-api';
                                                                                                                      html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                      html += '</sup></small>';
                                                                                                                  //====== end ===== original item page  ======
                                        
                                                                                    //html +=  'Vector Tile';


                                                                                    // mapbox 13, default 0, with label 
                                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox_vector_tile_layer
                                                                                    html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                    html += '">';
                                                                                    html += '<big>m13</big>'    
                                                                                    html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'


                                                                                    // mapbox 13, default 2, No label 
                                                                                    html += '<a target="_blank" href="' + url_template_base_mapbox_vector_tile_layer.replace('default?','default2?')
                                                                                    html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                    html += '">';
                                                                                    html += '<big>m14</big>'    
                                                                                    html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'





                                                                                    // openlayer,  with label 
                                                                                    html += '<a target="_blank" href="' + url_template_base_openlayers_vector_tile_layer
                                                                                    html += '&url=' + ___url_with_mapserver_id + '&layer=' + _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                    html += '">';
                                                                                    html += '<big>o1</big>'    
                                                                                    html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'


                                                                                    // openlayer, No label 
                                                                                    html += '<a target="_blank" href="' + url_template_base_openlayers_vector_tile_layer.replace('arcgisvector.html?','arcgisvector2.html?')
                                                                                    html += '&url=' + ___url_with_mapserver_id + '&layer=' + _name_stripedHtml  +   '&_center_zoom=17' + '&center_lat=' + _center_lat +  '&center_long=' +  _center_long   
                                                                                    html += '">';
                                                                                    html += '<big>o2</big>'    
                                                                                    html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'




                                                                                    // esri v4.x icon
                                                                                    html += '<a target="_blank" href="' + url_template_base_esri_vector_tile_layer
                                                                                    html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&_center_lat=' + _center_lat +  '&_center_long=' +  _center_long   
                                                                                    html += '">';
                                                                                    html += '<big>e231</big>'    
                                                                                    html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                    
                                                                                                                                                  
                                                                                  //popup
                                                                                  // esri v4.x icon
                                                                                    html += '<a target="_blank" href="' + url_template_base_esri_vector_tile_layer_popup
                                                                                    html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17'  + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                                    html += '">';
                                                                                    html += '<big>e232</big>'     
                                                                                    html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                    
                                                                                    
                                                                                      // cmv v3.x icon
                                                                                      html += '<a target="_blank" href="' + url_template_base_esri_vector_tile
                                                                                      html += '&url=' + ___url_with_mapserver_id + '&title='+ _name_stripedHtml  +  '&zoom=16'  +  '&lat=' + _center_lat +  '&long=' +  _center_long   
                                                                                      html += '">';
                                                                                      html += '<big>e230-classic</big>'  
                                                                                      html += '</a>';

                                                                                    html += '&nbsp;&nbsp;&nbsp;'

                                                                          _hubtype_identified = true
                                                                          continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                            
                                                                            }
                            
                                                                            // *********** end  ********** hubType: Vector Tile Service   ***********
                            
                            
                            



                            /**/

                                                                      // *********** hubType:  Scene Service   ***********
                                                                                                          
                                                                      if (_hubType.toLowerCase().includes('scene service')){
                                                                                                                                                    
                                                                                                                    
                                                                                                                    
                                                                        /*  
                                                                


                                                                        Scene Service




                                                                        -------  SceneServer -----------
                                                                                    
                                                                        example: 

                                                                        https://www.arcgis.com/home/item.html?id=91cc492a0cd3424caaccc0e56efe8155

                                                                        https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer





                                                                        json example: 

                                                                                        {
                                                                                            attributes:

                                                                                                      content: "Scene Service"
                                                                                                    
                                                                                                      hubType: "Scene Service"
                                                                                                      id: "f74a81d3aa7446a083a2022cb739023f"
                                                                                                      
                                                                                                      name: "Colored Pencil Basemap"
                                                                                                      orgExtent: {ymin: 6446275.841012891, xmin: -20037508.342779424, ymax: 12932243.111976184, xmax: -13358338.895186277, spatialReference: {…}}
                                                                                                      orgId: "8MMg7skvEbOESlSM"
                                                                                                      orgName: "Alaska Department of Environmental Conservation"
                                                                                                      organization: "Alaska Department of Environmental Conservation"
                                                                                                      
                                                                                                      tags: (6) ['noaa', 'nautical', 'raster', 'charts', 'rnc', 'seamless']
                                                                                                      
                                                                                                      type: "Scene Service"
                                                                                                      
                                                                                                      url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"

                                                                                        }
                                                                  
                                                                */

                                                                                          //  *********  hubType *********
                                                                                                    html += '<small><sup>';
                                                                                                    html +=  _hubType 
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                          //  ********* end   ********* hubType *********
                            /**/
                                                                                                            //====== original item page  ======
                                                                                                                html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                html += _itemPage_links;  //'origin'   
                                                                                                                html +=  '</a>';

                                                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                html += 'rest-api';
                                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                html += '</sup></small>';
                                                                                                            //====== end ===== original item page  ======
                                  
                                                                          //  html +=  'Scene Server';

                                                                          // esri v4.x icon
                                                                          html += '<a target="_blank" href="' + url_template_base_esri_scene_layer
                                                                          html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                          html += '">';
                                                                          html += '<big>e140</big>'    
                                                                          html +=  '</a>';

                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                        
                                                                          //popup 
                                                                        // esri v4.x icon
                                                                          html += '<a target="_blank" href="' + url_template_base_esri_scene_layer.replace('scenelayer.html','scenelayer2.html')
                                                                          html += '&url=' + ___url_with_mapserver_id + '&layer='+ _name_stripedHtml  +   '&_center_zoom=17' + '&_center_lat='+ _center_lat +  '&_center_long=' +  _center_long   
                                                                          html += '">';
                                                                          html += '<big>e141</big>'   
                                                                          html +=  '</a>';

                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                            
                                                                    _hubtype_identified = true
                                                                    continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.

                                                                      }

                                                                    // *********** end  ********** hubType:  Scene Service   ***********


                            /**/

                                                                      // *********** hubType:  Geocoding Service   ***********
                                                                                                          
                                                                      if (_hubType.toLowerCase().includes('geocoding')){
                                                                                                                                                    
                                                                                                                    
                                                                                                                    
                                                                        /*  
                                                                


                                                                        Geocoding Service




                                                                        -------  GeocodingServer -----------
                                                                                    
                                                                        example: 

                                                                        https://www.arcgis.com/home/item.html?id=91cc492a0cd3424caaccc0e56efe8155

                                                                        https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer





                                                                        json example: 

                                                                                        {
                                                                                            attributes:

                                                                                                      content: "Geocoding Service"
                                                                                                    
                                                                                                      hubType: "Geocoding Service"
                                                                                                      id: "f74a81d3aa7446a083a2022cb739023f"
                                                                                                      
                                                                                                      name: "Colored Pencil Basemap"
                                                                                                      orgExtent: {ymin: 6446275.841012891, xmin: -20037508.342779424, ymax: 12932243.111976184, xmax: -13358338.895186277, spatialReference: {…}}
                                                                                                      orgId: "8MMg7skvEbOESlSM"
                                                                                                      orgName: "Alaska Department of Environmental Conservation"
                                                                                                      organization: "Alaska Department of Environmental Conservation"
                                                                                                      
                                                                                                      tags: (6) ['noaa', 'nautical', 'raster', 'charts', 'rnc', 'seamless']
                                                                                                      
                                                                                                      type: "Geocoding Service"
                                                                                                      
                                                                                                      url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"

                                                                                        }
                                                                  
                                                                */

                                                                                          //  *********  hubType *********
                                                                                                    html += '<small><sup>';
                                                                                                    html +=  _hubType  
                                                                                                    html += '&nbsp;&nbsp;&nbsp;'
                                                                                          //  ********* end   ********* hubType *********
                            /**/
                                                                                                            //====== original item page  ======
                                                                                                                html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                html += _itemPage_links;   //'origin'   
                                                                                                                html +=  '</a>';

                                                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                html += 'rest-api';
                                                                                                                html += '&nbsp;&nbsp;&nbsp;'

                                                                                                                html += '</sup></small>';
                                                                                                            //====== end ===== original item page  ======

                                                                            // html +=  'Geocoding Server';

                                                                            // google g26
                                                                            html += '<a target="_blank" href="' + url_template_base_googlemaps_geocodeServer
                                                                            html += '&url2=' +___url_with_mapserver_id +   '&layer='+ _name_stripedHtml  +  '&center_zoom=17' + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                            html += '">';
                                                                            html += '<big>26</big>'      
                                                                            html +=  '</a>';

                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                          
                                                                          

                                                                            // google g27
                                                                            html += '<a target="_blank" href="' + url_template_base_googlemaps_geocodeServer.replace('googlemaps26/default?','googlemaps27/default?')
                                                                            html += '&url2=' + ___url_with_mapserver_id +   '&layer='+ _name_stripedHtml  +  '&center_zoom=17' + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                            html += '">';
                                                                            html += '<big>27</big>'     
                                                                            html +=  '</a>';

                                                                            html += '&nbsp;&nbsp;&nbsp;'
                                                                          
                                                                                                                                

                                                                            // google g28
                                                                            html += '<a target="_blank" href="' + url_template_base_googlemaps_geocodeServer.replace('googlemaps26/default?','googlemaps28/default?')
                                                                            html += '&url2=' + ___url_with_mapserver_id +   '&layer='+ _name_stripedHtml  +  '&center_zoom=17' + '&center_lat='+ _center_lat +  '&center_long=' +  _center_long   
                                                                            html += '">';
                                                                            html += '<big>28</big>'      
                                                                            html +=  '</a>';

                                                                            html += '&nbsp;&nbsp;&nbsp;'

                                                                    _hubtype_identified = true
                                                                    continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.

                                                                      }

                                                                    // *********** end  ********** hubType:  Geocoding Service   ***********




                                                                      // *********** hubType: all other type   ***********
                                                                                                                                                
                                                                      if (_hubtype_identified == false){
                                                                                                        
                                                                                                //  *********  hubType *********
                                                                                                          html += '<small><sup>';
                                                                                                          html +=  _hubType 
                                                                                                          html += '&nbsp;&nbsp;&nbsp;'
                                                                                                //  ********* end   ********* hubType *********
                                                                                                /**/
                                                                                                                      //====== original item page  ======
                                                                                                                      html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                                      html +=  _itemPage_links;   //'origin'   
                                                                                                                      html +=  '</a>';

                                                                                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                                      
                                                                                                                      html += '</sup></small>';
                                                                                                                      //====== end ===== original item page  ======

                                                                          _hubtype_identified = true
                                                                          continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.

                                                                      }

                                                                      // *********** end  ********** hubType: all other type  ***********

                                                                      html += '<br><br>';
                                                                      html += '</li>'; 
                                                  
                                                                  }// for
                                                                                    
                                                              html += '</ol>';
                                                                
                                                            } 
                                                                
                                                            
                                                      html +='</div>'
                                                                  
                                                      $('#json-renderer').html(html);
                                                                
                                 }  // function
                                  
                                  
                                  
                                  






