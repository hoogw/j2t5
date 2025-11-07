
init_global_var();

const [FeatureLayer, FeatureTable] = await $arcgis.import([
        "@arcgis/core/layers/FeatureLayer.js",
        "@arcgis/core/widgets/FeatureTable.js",
      ]);



 // var _featureTable_url = ___url + '/'+  _table_id;
          var _featureTable_url = ___url + '/'+  _layer_id;

        // Create the feature layer
        var myFeatureLayer = new FeatureLayer({
                  // "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/california_census_blocks/FeatureServer/0", 
                  url: _featureTable_url,

                 /*    
                 {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields:  ["*"],
                    visible: true,
                    id: "fLayer"
                  }
                  */
                 
                  title:_layer_name,
            });

        var myFeatureTable = new FeatureTable({
          layer : myFeatureLayer,
           multiSortEnabled: true,
           visibleElements: { selectionColumn: false },
        
             container: document.getElementById("tableDiv"),
         });
        