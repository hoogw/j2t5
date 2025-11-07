
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
                                function rendering_json_to_html(_results) {  

                                 // only when check each resource
                                 // console.log('rendering_json_to_html ', json)



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

            
if ( content_type == 'feature_layer' ){   
      // -------- feature layer    calculate layer id   ------------- 
                                                          
                                                          
                                                                    var __restapi_url;  // without layer-id    https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer
                                                                    var __layerId;      // 21
                                                                    var  _accessURL;   // with layer-id  https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/21  
            
                                                                    var _geojson_downloadURL;
                                                                    var _csv_downloadURL;

                                                                    var _kml_downloadURL;
                                                                    var _shp_downloadURL;
            
                                                                    // .... get portal id, for hub only .....
                                                                      //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                                                                      // portal id : 9eee1f2d84da4730b02ac90e5bfb560d
            
                                                                    var _identifier = _results[i].identifier;
                                                                    var _identifier_array = _identifier.split('/');
                                                                    var _portal_id = _identifier_array[_identifier_array.length - 1];
                                                                        _portal_id_array = _portal_id.split('_');
                                                                        _portal_id = _portal_id_array[0];
                                                                        
                                                                        input_current[i].portal_id = _portal_id
                                                                    // .... get portal id, for hub only .....
            
                                                                    var _distribution_array = _results[i].distribution
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


      // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
            var value_param = {
              url:     __restapi_url,
              layerId: __layerId, 
              name:    _name_stripedHtml,
              type:    'feature_layer'
            }
            var value_param_string = JSON.stringify(value_param)
            console.log('value param string', value_param_string)
            html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
            html += '<sup> &#9758; show &#8680; <b>feature</b> layer</sup>'
            html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        }



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
                                                              html += '</sup></small>';
                                                        // ============  end  ============   original icon ============   


                                           

}// if feature layer
            
            
                        
            
 if ( content_type == 'feature_table' ){
            
                                                              // -------- feature layer    calculate layer id   ------------- 
                                                              var __restapi_url;  // without layer-id    https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer
                                                              var __layerId;      // 21
                                                              var  _accessURL;   // with layer-id  https://exploreajax.ajax.ca/mapajax/rest/services/Open_Data/Ajax_Open_Data/MapServer/21  
            
                                                              var _geojson_downloadURL;
                                                              var _csv_downloadURL;
            
                                                              // .... get portal id, for hub only .....
                                                                //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                                                                // portal id : 9eee1f2d84da4730b02ac90e5bfb560d
            
                                                              var _identifier = _results[i].identifier;
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
                                                                      
                                                                      
        // only difference online2/hub,  has showdetails button
        if ($('#detail_container').length){
          var value_param = {
            url:     __restapi_url,
            layerId: __layerId, 
            name:    _name_stripedHtml,
            type:    'table'
          }
          var value_param_string = JSON.stringify(value_param)
          console.log('value param string', value_param_string)
          html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
          html += '<sup> &#9758; show &#8680; <b>table</b></sup>'
          html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        }
                        

                                              
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
                                                              html += '</sup></small>';
                                                        // ============  end  ============   original icon ============   

} // if table
            
                                                              
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

                                                                            
      var _service_type = content_type
      
      // only difference server2/searchMapServer  has show details button
      if ($('#detail_container').length){
        var value_param = {
          url:     _apps_URL,
          layerId: -99999, 
          name:    _name_stripedHtml,
          type:    _service_type
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b><small>' + _service_type + '</small></b></sup>'
        html += '&nbsp;&nbsp;'
      }  

                                                                            


                                                                        // ============ original icon ============               
                                                                                    html += '<small><sup>' + _service_type +'&nbsp;&nbsp;&nbsp;'

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
                                                                                              html += '<br>'
                                                                                    }

                                                                                    html += '</sup></small>';
                                                                          // ============  end  ============   original icon ============ 

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


                                      $("input[type='radio'][name='show_details_radio']").change(function(){
                                        var _value_string = $( "input[type='radio'][name='show_details_radio']:checked" ).val();
                                        console.log('show details radio value string', _value_string)
                                        var _value_obj = JSON.parse(_value_string)
                                        console.log('show details radio value obj', _value_obj)
                                        var param_url = _value_obj.url
                                        var param_layerId = _value_obj.layerId
                                        var param_name =  _value_obj.name
                                        var param_type =  _value_obj.type
                                        show_details(param_url, param_layerId, param_name, param_type)
                                      });
           
                                }
           
  
  
  
  
  
  
  
  
  
  
  
  




//  for search.js only
function rendering_json_to_html_for_search(_results) {

                                        // only when check each resource
                                        // console.log('rendering_json_to_html_for_search', json)
        
                                        var html = '';
                                      
                                      
                                         /*
                                 
                                         *    <ul>
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
                                         *    </ul>
                                         *   
                                         *   
                                         *   
                                         *  Do not use materialized css, collection, because it is has border, tool tip etc... overhead, slow down everything.
                                         *   <ul class="collection">
                                                    <li class="collection-item">Alvin</li>
                                                    <li class="collection-item">Alvin</li>
                                                    <li class="collection-item">Alvin</li>
                                                    <li class="collection-item">Alvin</li>
                                                </ul>
                                      
                                         */
                                        
                                         
                                         
                                       
                                        
                                        
                                        
                            html += '<div>';
                                                        
                                                        
                                if (_results.length > 0) {
                                    
                                                        
                                  html += '<ol class="custom-counter">';
                                    
                                              for (var i = 0; i < _results.length; ++i){
                                    
                                                                              html += '<li>' // css .ordered_list_number{ size font}

                                                          
                                                                        // ********************  only    calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************




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

                                                                                  
                                                          
                                                                          //  console.log(' hasApi  organization  ___url  -> ', i, _organization ,  _hasApi,___url )

                                                                        //   console.log(' hubType  ',   _hubType, i)





                                                                      // ...... end ..........  attributes ......

    



                                                                        // ....... links .........

                                                                              var _esriRest_links = _results[i].links.esriRest
                                                                              var _itemPage_links = _results[i].links.itemPage
                                                                              var _rawEs_links = _results[i].links.rawEs
                                                                              var _self_links = _results[i].links.self


                                                                        // ...... end ..........  links .........
                                                          











                                                          
                                                          
                                                                        // ******************** end *************** only      calculate for hub.arcgis.com , opendata.arcgis.com    only   ****************************
                                                          
                                    
                                    
                                    
                                    
                                    
                                    
                                                          
                                                          
                                                          
                                                            
                                                            
                                                            
                                                            
                                                            
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
                                                                  // 
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

// *********** hubType: Feature Collection   ***********
// must before 'feature'  section                            
if (_hubType.toLowerCase().includes('collection')){
                                                                                     
                                                                          //  *********  hubType *********
                                                                          html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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
                                                                                            var ___layer_id = -1
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


                                if (__layerId !== -99999){

                                          // only difference online2/hub,  has showdetails button
                                          if ($('#detail_container').length){
                                            var value_param = {
                                              url:     ___url,
                                              layerId: __layerId, 
                                              name:    _name_stripedHtml,
                                              type:    'feature_layer'
                                            }
                                            var value_param_string = JSON.stringify(value_param)
                                            console.log('value param string', value_param_string)
                                            html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
                                            html += '<sup> &#9758; show &#8680; <b>feature</b> layer</sup>'
                                            html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                          }

                                        } else {


                                          // only difference online2/hub,  has showdetails button
                                          if ($('#detail_container').length){
                                            var value_param = {
                                              url:     ___url,
                                              layerId: -99999, 
                                              name:    _name_stripedHtml,
                                              type:    'MapServer'
                                            }
                                            var value_param_string = JSON.stringify(value_param)
                                            console.log('value param string', value_param_string)
                                            html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
                                            html += '<sup> &#9758; show &#8680; <b>feature</b> server</sup>'
                                            html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                          }



                                }



/**/
                                                                                      //  *********  hubType *********
                                                                                      html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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
                                                                                      html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                      
                                                                                      html += '</sup></small>';
                                                                                  //====== end ===== original source icon  ======
                                    
                                                                   _hubtype_identified = true
                                                                   continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                                            
                                                            } 
                                    
  // *********** hubType: feature table   ***********
 if (_hubType.toLowerCase().includes('table')){
                                                                          // *************** calculate layer id only ***************
                                                                          var ___url_split_array = []
                                                                          var ___layer_id = -1
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

        // only difference online2/hub,  has showdetails button
        if ($('#detail_container').length){
          var value_param = {
            url:     ___url,
            layerId: __layerId, 
            name:    _name_stripedHtml,
            type:    'table'
          }
          var value_param_string = JSON.stringify(value_param)
          console.log('value param string', value_param_string)
          html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
          html += '<sup> &#9758; show &#8680; <b>table</b></sup>'
          html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        }

                                                                                          //  *********  hubType *********
                                                                                          html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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
                                                                                                  html += '</sup></small>';
                                                                                              //====== end ===== original source icon  ======
                    /**/
                                                                       
                                                                    _hubtype_identified = true
                                                                    continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.                    
                                                              }

                                                    

// *********** hubType: Geojson   ***********
if (_hubType.toLowerCase().includes('geojson')){
                                                                              
                                                                                          //  *********  hubType *********
                                                                                          html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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
                                                                                html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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
                                                                            var ___layer_id = -1
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
                                                                        html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
                                                                        //  ********* end   ********* hubType *********
/**/
                                                                                             //====== original item page  ======
                                                                                                html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                html += _itemPage_links;  //'origin'   
                                                                                                html += '</a>';
                                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                html += '</sup></small>';
                                                                                            //====== end ===== original item page  ======
                  
                                                                      /*
                                                                            specially on     arcgis-online-search

                                                                            "Raster layer" is on Map server
                                                                            
                                                                            we treat it as mapserver/raster layer ,  warning, export image usually not available, only tile available, 
                                                                            so use g7, g12, we must enforce overlay image type,   &overlayType=overlayType_tiled_image
                                                                        
                                                                      */


 // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
        var value_param = {
          url:     ___url,
          layerId: __layerId, 
          name:    _name_stripedHtml,
          type:    'raster_layer'
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b>raster</b> layer</sup>'
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    }
                                                                           

                                                  _hubtype_identified = true
                                                  continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.
                                              }

                                              // *********** end  ********** hubType: Raster   ***********
/**/
 // *********** hubType: Web Scene   ***********
                                                                              
if (_hubType.toLowerCase().includes('web scene')){
                                                                          //  *********  hubType *********
                                                                          html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
                                                                          //  ********* end   ********* hubType *********
      /**/
                                                                                             //====== original item page  ======
                                                                                                html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                html += _itemPage_links;  //'origin'   
                                                                                                html += '</a>';
                                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                html += '</sup></small>';
                                                                                            //====== end ===== original item page  ======   
                                                         
                                                                                            
 // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
        var value_param = {
          url:     ___url,
          layerId: __layerId, 
          name:    _name_stripedHtml,
          type:    'SceneServer'
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b>SceneServer</b></sup>'
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    }
                                                                                            

                                                    _hubtype_identified = true
                                                    continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.      
                                                }
                                                // *********** end  ********** hubType: Web Scene   ***********
                                                /**/
                                                // *********** hubType: Shapefile   ***********
if (_hubType.toLowerCase().includes('shapefile')){
                                                                          //  *********  hubType *********
                                                                          html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
                                                                          //  ********* end   ********* hubType *********
                                                                           /**/
                                                                                            //====== original item page  ======
                                                                                                html += '<a target="_blank" href="' + _itemPage_links + '">';
                                                                                                html += _itemPage_links;  //'origin'
                                                                                                html += '</a>';
                                                                                                html += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                                                                                                html += '</sup></small>';
                                                                                            //====== end ===== original item page  ======
                                                                                       
 // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
        var value_param = {
          url:     ___url,
          layerId: __layerId, 
          name:    _name_stripedHtml,
          type:    'other'
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b>ImageServer</b></sup>'
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    }           


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


                                            
                                                                                                                                                             
 // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
        var value_param = {
          url:     ___url,
          layerId: __layerId, 
          name:    _name_stripedHtml,
          type:    'ImageServer'
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b>ImageServer</b></sup>'
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    }     
      
                                                                          //  *********  hubType *********
                                                                          html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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


                                                                                                                                                                                                                          
 // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
        var value_param = {
          url:     ___url,
          layerId: __layerId, 
          name:    _name_stripedHtml,
          type:    'VectorTileServer'
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b>VectorTileServer</b></sup>'
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    }   
 
                                                                     //  *********  hubType *********
                                                                     html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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

                                                                                                                                                
 // only difference online2/hub,  has showdetails button
      if ($('#detail_container').length){
        var value_param = {
          url:     ___url,
          layerId: __layerId, 
          name:    _name_stripedHtml,
          type:    'SceneServer'
        }
        var value_param_string = JSON.stringify(value_param)
        console.log('value param string', value_param_string)
        html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
        html += '<sup> &#9758; show &#8680; <b>SceneServer</b></sup>'
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    }
          

                                                               //  *********  hubType *********
                                                               html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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

                                                                                                                                          
 // only difference online2/hub,  has showdetails button
 if ($('#detail_container').length){
  var value_param = {
    url:     ___url,
    layerId: __layerId, 
    name:    _name_stripedHtml,
    type:    'GeocodeServer'
  }
  var value_param_string = JSON.stringify(value_param)
  console.log('value param string', value_param_string)
  html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
  html += '<sup> &#9758; show &#8680; <b>GeocodeServer</b></sup>'
  html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

}
    


                                                               //  *********  hubType *********
                                                               html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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
                                              
                                         _hubtype_identified = true
                                         continue; // for loop, breaks one iteration (in the loop),  continues with the next iteration in the loop.

                                          }

                                         // *********** end  ********** hubType:  Geocoding Service   ***********




                                          // *********** hubType: all other type   ***********
                                                                                                                    
                                          if (_hubtype_identified == false){

                                                                                                                               
 // only difference online2/hub,  has showdetails button
 if ($('#detail_container').length){
  var value_param = {
    url:     ___url,
    layerId: __layerId, 
    name:    _name_stripedHtml,
    type:    'other'
  }
  var value_param_string = JSON.stringify(value_param)
  console.log('value param string', value_param_string)
  html += "<input type='radio' name='show_details_radio' value='" + value_param_string  +"'/>"
  html += '<sup> &#9758; show &#8680; <b>other</b></sup>'
  html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

}

                                                                             
                                                                    //  *********  hubType *********
                                                                    html += '<small><sup>' + _hubType  +'&nbsp;&nbsp;&nbsp;'
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



                          $("input[type='radio'][name='show_details_radio']").change(function(){
                            var _value_string = $( "input[type='radio'][name='show_details_radio']:checked" ).val();
                            console.log('show details radio value string', _value_string)
                            var _value_obj = JSON.parse(_value_string)
                            console.log('show details radio value obj', _value_obj)
                            var param_url = _value_obj.url
                            var param_layerId = _value_obj.layerId
                            var param_name =  _value_obj.name
                            var param_type =  _value_obj.type
                            show_details(param_url, param_layerId, param_name, param_type)
                          });
                                     
}  // function
                                  
                                  
                                  
                                  






