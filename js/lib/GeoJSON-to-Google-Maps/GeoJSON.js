// https://github.com/maxogden/GeoJSON-to-Google-Maps

// original have many bugs,  must use this bug fixed code.
// only polygon, multipolygon, point, line, tested, 
// others are not test yet



var app = {markers: []};




var GeoJSON = function( geojson, options ){

	var _geometryToGoogleMaps = function( geojsonGeometry, opts, geojsonProperties ){
		
		var googleObj, ll, coord;
		
		
		
		switch ( geojsonGeometry.type ){

			case "Point":
				opts.position = new google.maps.LatLng(geojsonGeometry.coordinates[1], geojsonGeometry.coordinates[0]);
				googleObj = new google.maps.Marker(opts);

				
				if (geojsonProperties) {
					googleObj.set("geojsonProperties", geojsonProperties);
				}

				
				
				break;
				



			case "MultiPoint":
				googleObj = [];
				for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
					opts.position = new google.maps.LatLng(geojsonGeometry.coordinates[i][1], geojsonGeometry.coordinates[i][0]);
					googleObj.push(new google.maps.Marker(opts));
				}
				if (geojsonProperties) {
					for (var k = 0; k < googleObj.length; k++){
						googleObj[k].set("geojsonProperties", geojsonProperties);
					}
				}

				
				break;
				


			case "LineString":
				var path = [];
				for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
					 coord = geojsonGeometry.coordinates[i];
					 ll = new google.maps.LatLng(coord[1], coord[0]);
					path.push(ll);
				}
				opts.path = path;
				googleObj = new google.maps.Polyline(opts);
				if (geojsonProperties) {
					googleObj.set("geojsonProperties", geojsonProperties);
				}

				
				break;
				


			case "MultiLineString":
				googleObj = [];
				for (var i = 0; i < geojsonGeometry.coordinates.length; i++){
					var path = [];
					for (var j = 0; j < geojsonGeometry.coordinates[i].length; j++){
						 coord = geojsonGeometry.coordinates[i][j];
						 ll = new google.maps.LatLng(coord[1], coord[0]);
						path.push(ll);
					}
					opts.path = path;
					googleObj.push(new google.maps.Polyline(opts));
				}
				if (geojsonProperties) {
					for (var k = 0; k < googleObj.length; k++){
						googleObj[k].set("geojsonProperties", geojsonProperties);
					}
				}
				break;
				



			case "Polygon":
				var paths = new google.maps.MVCArray;
        
				for (var i = 0; i < geojsonGeometry.coordinates.length; i++){


					var path = new google.maps.MVCArray;

					for (var j = 0; j < geojsonGeometry.coordinates[i].length; j++){

								 ll = new google.maps.LatLng(geojsonGeometry.coordinates[i][j][1], geojsonGeometry.coordinates[i][j][0]);
					
								path.insertAt(path.length, ll);
					} // for j

												
												
								paths.insertAt(paths.length, path);
				} // for i



									opts.paths = paths;
									googleObj = new google.maps.Polygon(opts);
									if (geojsonProperties) {
										googleObj.set("geojsonProperties", geojsonProperties);
									}
								
											
			break;


				
			case "MultiPolygon":
				googleObj = [];

				for (var i = 0; i < geojsonGeometry.coordinates.length; i++){

					var paths = [];
					for (var j = 0; j < geojsonGeometry.coordinates[i].length; j++){

						var path = [];
						for (var k = 0; k < geojsonGeometry.coordinates[i][j].length; k++){

							 ll = new google.maps.LatLng(geojsonGeometry.coordinates[i][j][k][1], geojsonGeometry.coordinates[i][j][k][0]);
							
							
							path.push(ll);					
							//path.insertAt(path.length, ll);
								
							
							
						}//for k
						    paths.push(path);
						    //paths.insertAt(paths.length, path);
					}//for j


					opts.paths = paths;
					googleObj.push(new google.maps.Polygon(opts));
				} // for i



				if (geojsonProperties) {
					for (var k = 0; k < googleObj.length; k++){
						googleObj[k].set("geojsonProperties", geojsonProperties);
					}
				}

				

				break;



				
			case "GeometryCollection":
				googleObj = [];
				if (!geojsonGeometry.geometries){
					googleObj = _error("Invalid GeoJSON object: GeometryCollection object missing \"geometries\" member.");
				} else {
					for (var i = 0; i < geojsonGeometry.geometries.length; i++){
						googleObj.push(_geometryToGoogleMaps(geojsonGeometry.geometries[i], opts, geojsonProperties || null));
					}
				}
				break;
				
			default:
				googleObj = _error("Invalid GeoJSON object: Geometry object must be one of \"Point\", \"LineString\", \"Polygon\" or \"MultiPolygon\".");
		}
		

		
		
		console.log('googleObj - returned - ', googleObj)

		return googleObj;
		
	};
	
	var _error = function( message ){
	
         console.log(message)

		return {
			type: "Error",
			message: message
		};
	
	};
		
	var obj;
	
	var opts = options || {};
	
	switch ( geojson.type ){
	
		case "FeatureCollection":
			if (!geojson.features){
				obj = _error("Invalid GeoJSON object: FeatureCollection object missing \"features\" member.");
			} else {
				obj = [];
				for (var i = 0; i < geojson.features.length; i++){
					obj.push(_geometryToGoogleMaps(geojson.features[i].geometry, opts, geojson.features[i].properties));
				}
			}
			break;
		
		case "GeometryCollection":
			if (!geojson.geometries){
				obj = _error("Invalid GeoJSON object: GeometryCollection object missing \"geometries\" member.");
			} else {
				obj = [];
				for (var i = 0; i < geojson.geometries.length; i++){
					obj.push(_geometryToGoogleMaps(geojson.geometries[i], opts));
				}
			}
			break;
		
		case "Feature":
			if (!( geojson.properties && geojson.geometry )){
				obj = _error("Invalid GeoJSON object: Feature object missing \"properties\" or \"geometry\" member.");
			} else {
				obj = _geometryToGoogleMaps(geojson.geometry, opts, geojson.properties);
			}
			break;
		
		case "Point": case "MultiPoint": case "LineString": case "MultiLineString": case "Polygon": case "MultiPolygon":
			obj = geojson.coordinates
				? obj = _geometryToGoogleMaps(geojson, opts)
				: _error("Invalid GeoJSON object: Geometry object missing \"coordinates\" member.");


			break;
		
		default:
			obj = _error("Invalid GeoJSON object: GeoJSON object must be one of \"Point\", \"LineString\", \"Polygon\", \"MultiPolygon\", \"Feature\", \"FeatureCollection\" or \"GeometryCollection\".");
	
	}
	


	console.log('obj- returned - ', obj)
	return obj;
	
};
