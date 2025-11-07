







# Hub v3 API Docs

> https://hub.arcgis.com/api/v3

The public-facing v3 API for ArcGIS Hub adheres to the [JSON:API](http://jsonapi.org/) standard. The specification is worth reading on its own but we will provide some examples here.

### Endpoints

- [Search](#search)
  - [GET /api/v3/datasets?{q,filter[],fields[],page[],agg[]}](#get-apiv3datasets)
  - [GET /api/v3/datasets/feed?{q,filter[],fields[],page[],agg[]}](#get-apiv3datasetsfeed)
  - [GET /api/v3/datasets/:id?{fields[]}](#get-apiv3datasetsid)
  - [GET /api/v3/explain/datasets?{q,filter[],fields[],page[]}](#get-apiv3explaindatasets)
  - [GET /api/v3/datasets/:id/files?{projection,geometry,where}](#get-apiv3datasetsidfiles)
  - [POST /api/v3/datasets/:id/files?{geometry,where}](#post-apiv3datasetsidfiles)
  - [GET /api/v3/datasets/:id/files/:srid/:format?{geometry,where}](#get-apiv3datasetsidfilessridformat)
  - [GET /api/v3/datasets/:id/related](#get-apiv3datasetsidrelated)
  - [GET /api/v3/datasets/:id/connected-content](#get-connected-content)
  - [GET /api/v3/datasets/:id/content](#get-connectedcontent)
  - [GET /api/v3/datasets/:id/:namespace](#get-apiv3datasetsidnamespace)
  - [GET /api/v3/datasets/:id/redirect](#get-apiv3datasetsidredirect)
  - [GET /api/v3/semantics?{node, lang, rel}](#get-apiv3semantics)
  - [GET /api/v3/search?{q,filter[],fields[],page[],agg[]}](#get-apiv3search)
  - [POST /api/v3/jobs/group/:id/harvest](#post-apiv3jobsgroupidharvest)

- [Events](#events)
  - [GET /api/v3/events/:orgId?{token}](#get-apiv3eventsorgid)
  - [GET /api/v3/events/:orgId/:view/:layerId?{token}](#get-apiv3eventsorgidviewlayerid)
  - [GET /api/v3/events/:orgId/:view/:layerId/:id?{token}](#get-apiv3eventsorgidviewlayeridid)
  - [GET /api/v3/events/:orgId/:view/:layerId/:id/attachments?{token}](#get-apiv3eventsorgidviewlayerididattachments)
  - [GET /api/v3/events/:orgId/:view/:layerId/:id/attachments/:attachmentId?{token}](#get-apiv3eventsorgidviewlayerididattachmentsattachmentid)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/applyEdits](#post-apiv3eventsorgidviewlayerididapplyedits)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/addFeatures](#post-apiv3eventsorgidviewlayerididaddfeatures)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/updateFeatures](#post-apiv3eventsorgidviewlayerididupdatefeatures)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/deleteFeatures](#post-apiv3eventsorgidviewlayerididdeletefeatures)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/addAttachment](#post-apiv3eventsorgidviewlayerididaddattachment)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/updateAttachment](#post-apiv3eventsorgidviewlayerididupdateattachment)
  - [POST /api/v3/events/:orgId/:view/:layerId/:id/deleteAttachment](#post-apiv3eventsorgidviewlayerididdeleteattachment)

- [Domains](#domains)
  - [GET /api/v3/domains/validate?{hostname}](#get-apiv3domainsvalidate)

- [Telemetry](#telemetry)
  - [POST /api/internal/telemetry/tests](#post-apiinternaltelemetrytests)

- [Vector Tiles](#vector-tiles)
  - [GET /api/v3/arcgis/rest/info](#get-apiv3arcgisrestinfo)
  - [GET /api/v3/arcgis/rest/services/:id/VectorTileServer](#get-apiv3arcgisrestservicesidvectortileserver)
  - [GET /api/v3/arcgis/rest/services/:id/VectorTileServer/resources/styles/root.json](#get-apiv3arcgisrestservicesidvectortileserverresourcesstylesrootjson)
  - [GET /api/v3/arcgis/rest/services/:id/VectorTileServer/resources/fonts/:fontname/:fontrange.pbf](#get-apiv3arcgisrestservicesidvectortileserverresourcesfontsfontnamefontrangepbf)
  - [GET /api/v3/arcgis/rest/services/:id/VectorTileServer/resources/sprites/sprite.json](#get-apiv3arcgisrestservicesidvectortileserverresourcesspritesspritejson)

## Search

#### GET api/v3/datasets

This is the main endpoint for searching, filtering, and sorting collections of datasets.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful, even if the query returns 0 results |
| 500       | server error during the request |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| q     | full-text query ('fuzzy' queries) | /api/v3/datasets?q=redlands parcels - will return results that best match a query for 'redlands parcels' |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/datasets?fields[datasets]=name,url,tags,owner - returns a list of datasets with only their name, url, tags, and owner attributes |
| filter[{attribute}] | filter used to narrow the scope of dataset results. NOT used for 'fuzzy' scoring. More details on filters and their advanced usage in the filter function section | /api/v3/datasets?filter[tags]=any(esri,boundaries) - returns a list of datasets that have EITHER 'esri' or 'boundaries' in their tags |
| agg[{property}] | used for specifying field aggregation settings, including `fields`, `size`, `mode`. The aggregation works on given attribute fields at `agg[fields]` and returns dataset count for each field value (up to the number specified at `agg[size]`, by default `10`). The `agg[mode]` specifies the type of stats returned by the aggregation. | /api/v3/datasets?agg[fields]=source&agg[size]=10 - returns the top 10 dataset sources and the associated dataset count for each source |
| sort | used for sorting results. a '-' in front of the attribute name means descending order | /api/v3/datasets?sort=-name - return a list of datasets in descending alphabetical order on the name attribute. Default sort is sorted by relevance first then by the `modified` attribute |
| includeFailures | used to instruct the API whether to include datasets that failed composition (`default.composeStatus.pass=false`) in the response alongside datasets the successfully composed | /api/v3/datasets?includeFailures=true will not restrict the elasticsearch query to only  `default.composeStatus.pass=true`
| onlyFailures | used to instruct the API whether to only return datasets that failed composition (`default.composeStatus.pass=false`) in the response | /api/v3/datasets?onlyFailures=true will only return datasets that have  `default.composeStatus.pass=false`

See [errors](errors.md) for a more-thorough document on error types and parameters.  

#### GET api/v3/datasets/feed

Returns an XML response of datasets associated with the initiative/site defined by the hostname of the request.

#### GET api/v3/datasets/:id

Returns a result if a dataset with that id exists. If the resource does not exist it returns a 404.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and datasets associated with hostname were found |
| 404       | document of type 'Hub Site Application' with `siteUrl` equal to the hostname was not found in the index |
| 500       | server error during the request |


##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the dataset corresponding to the id was found |
| 404       | resource was not found |
| 500       | server error during the request |

##### Parameters

Same parameters as the [/api/v3/datasets](#get-apiv3datasets) endpoint

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/datasets?fields[datasets]=name,url,tags,owner - returns a list of datasets with only their name, url, tags, and owner attributes |
| includeFailures | used to instruct the API whether to include datasets that failed composition (`default.composeStatus.pass=false`) in the response alongside datasets the successfully composed | /api/v3/datasets?includeFailures=true will not restrict the elasticsearch query to only  `default.composeStatus.pass=true`
| onlyFailures | used to instruct the API whether to only return datasets that failed composition (`default.composeStatus.pass=false`) in the response | /api/v3/datasets?onlyFailures=true will only return datasets that have  `default.composeStatus.pass=false`


#### GET api/v3/explain/datasets

This endpoint returns the ElasticSearch Query that would be run given the query parameters specified

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| q     | full-text query ('fuzzy' queries) | /api/v3/datasets?q=redlands parcels - will return results that best match a query for 'redlands parcels' |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/datasets?fields[datasets]=name,url,tags,owner - returns a list of datasets with only their name, url, tags, and owner attributes |
| filter[{attribute}] | filter used to narrow the scope of dataset results. NOT used for 'fuzzy' scoring. More details on filters and their advanced usage in the filter function section | /api/v3/datasets?filter[tags]=any(esri,boundaries) - returns a list of datasets that have EITHER 'esri' or 'boundaries' in their tags |
| sort | used for sorting results. a '-' in front of the attribute name means descending order | /api/v3/datasets?sort=-name - return a list of datasets in descending alphabetical order on the name attribute. Default sort is sorted by relevance first then by the `modified` attribute |

#### GET api/v3/datasets/:id/:namespace

This endpoint returns the set of keys under a specific dataset namespace. E.g. item, layers, enrichments, validations.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the values corresponding to the id and namespace were found |
| 404       | resource was not found |
| 500       | server error during the request |


#### GET /api/v3/datasets/:id/files

This endpoint returns dataset, file and caching information. Dataset info includes:

| Item attribute | Data type | Description | Example |
| --- | --- | --- | --- |
| type | string | type of dataset/item |  `Feature Service` |
| serviceUrl | string | URL for accessing the source data | `https://servicesdev.arcgis.com/LjjARY1mkhxulWPq/arcgis/rest/services/FloridaState/FeatureServer/0` |
| srid | number | spatial reference of dataset's source service | `2927` |
| sourceLastModified | string | publish timestamp of source service | `2019-08-28T17:03:23.323Z` |

Each of the following file formats are given an entry in the response: `fgdb`, `ndjson`, `csv`, `shp`, `kml`, `geojson`.  Note that not all datasets will support `fgdb`. Each format will have subset of the following attributes, dependent on its caching status and stage:

| Item attribute | Data type | Description | Example |
| --- | --- | --- | --- |
| format | string | format of requested file | `csv` |
| cached | boolean | a cached file exists | `true` |
| upToDate | boolean | the cached file's contents are in sync with the source data | `true` |
| cacheTime | number | caching time for last job in the file's pipeline | `1000` |
| lastModified | string | creation timestamp for cached file | `2020-01-22T00:58:31.000Z` |
| contentLastModified | string | publish timestamp of cached file's contents/data | `2019-08-28T17:03:23.323Z` |
| srid | number | spatial reference of the cached file | `2927` |
| downloadUrl | string | URL for downloading the cached file | `https://dev-koop-downloads.s3.amazonaws.com/files/7691b5c5a93047c1a004162fc7ed7d39/0/3857/full/7691b5c5a93047c1a004162fc7ed7d39_0_3857.csv` |
| jobPipeline | string[] | Ordered list of job names required to generate this file. A "paging" job that follows a "fgbd" is only executed in the event that the "fgdb" job fails" | `[ "fgdb", "paging", "conversion"]` |
| cachingStatus | string | current status of caching process; present if caching in progress or failed | `failed` or `inProgress` |
| cachingStage | string | current stage of caching process; present if caching in progress | `fgdb` |
| processingTime | string | time elapsed on current caching stage; present if caching in progress or failed | `10.52 minutes` |
| jobs | object[] | array of any failed or in progress jobs that are part of the pipeline for this file | |
| error | object | if cachingStatus is failed, the error causing the failure | |
| error.message | string | error message of last cache job failure | `remote server error` |
| error.stack | string | error stack of last cache job failure | |
| error.timestamp | string | error stack of last cache job failure | `2020-08-28T17:03:23.323Z` |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| where | Geoservices `where` clause | `where=color=red` |
| geometry | Geoservices `geometry` filter | `geometry={"xmin":-88.244,"ymin":39.726,"xmax":-86.411,"ymax":40.095,"type":"extent","spatialReference":{"wkid":4326}}` |
| projection | listed files should be projected in service's native projection; `kml` and `geojson` are always WGS84/4326 | `projection=true` |

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful |
| 404       | resource was not found or recently deleted |
| 500       | server error during the request |

#### POST /api/v3/datasets/:id/files

This endpoint schedules new caching jobs for the dataset. Files are only recached if existing files are out of date. Returns a status URL for checking the progress of dataset caching.
##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| where | Geoservices `where` clause | `where=color=red` |
| geometry | Geoservices `geometry` filter | `geometry={"xmin":-88.244,"ymin":39.726,"xmax":-86.411,"ymax":40.095,"type":"extent","spatialReference":{"wkid":4326}}` |

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful |
| 404       | resource was not found or recently deleted |
| 500       | server error during the request |

#### DELETE /api/v3/datasets/:id/files

This endpoint triggers deletes of a dataset's cached download files.  The request requires a token from a user with a organiztion that matches the organization of the dataset. A successful request returns a 200 code with an empty response body.

##### Request Headers

The following are optional request headers this endpoint accepts in order to search AGO restricted items

| field | description | example |
| ----- | ----------- | ------- |
| authorization     | ArcGIS Online token. Required either in the header or as a query parameter. |  |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| token | ArcGIS Online token. Required either in the header or as a query parameter. | |

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the related datasets were found |
| 403       | request is forbidden by this user |
| 404       | resource was not found |
| 500       | server error during the request |

#### GET /api/v3/datasets/:id/files/:srid/:format

This endpoint returns metadata about a specfic download, defined by it's dataset ID, spatial reference ID (srid), and file format.  The response schema is formatted in compliance with JSON API spec.  Attributes are noted below.

| Item attribute | Data type | Description | Example |
| --- | --- | --- | --- |
| format | string | format of requested file | `csv` |
| srid | number | spatial reference of requested file | `2927` |
| cached | boolean | a cached file exists | `true` |
| upToDate | boolean | the cached file's contents are in sync with the source data | `true` |
| cacheTime | number | caching time for last job in the file's pipeline | `1000` |
| lastModified | string | creation timestamp for cached file | `2020-01-22T00:58:31.000Z` |
| contentLastModified | string | publish timestamp of cached file's contents/data | `2019-08-28T17:03:23.323Z` |
| sourceLastModified | string | publish timestamp of source service | `2019-08-28T17:03:23.323Z` |
| downloadUrl | string | URL for downloading the cached file | `https://dev-koop-downloads.s3.amazonaws.com/files/7691b5c5a93047c1a004162fc7ed7d39/0/3857/full/7691b5c5a93047c1a004162fc7ed7d39_0_3857.csv` |
| jobPipeline | string[] | Ordered list of job names required to generate this file. A "paging" job that follows a "fgbd" is only executed in the event that the "fgdb" job fails" | `[ "fgdb", "paging", "conversion"]` |
| cachingStatus | string | current status of caching process. | `failed` or `inProgress` |
| cachingStage | string | current stage of caching process. | `fgdb` |
| processingTime | string | time elapsed on current caching stage | `10.52 minutes` |
| error | object | if cachingStatus is failed, the error causing the failure | |
| error.message | string | error message of last cache job failure | `remote server error` |
| error.stack | string | error stack of last cache job failure | |
| error.timestamp | string | error stack of last cache job failure | `2020-08-28T17:03:23.323Z` |
| jobs | object[] | array of any failed or in progress jobs that are part of the pipeline for this file | |
| type | string | type of dataset/item |  `Feature Service` |
| serviceUrl | string | URL for accessing the source data | `https://servicesdev.arcgis.com/LjjARY1mkhxulWPq/arcgis/rest/services/FloridaState/FeatureServer/0` |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| datasetId  | item and optional layer ID (CSV items won't have a layer ID) | abcedef0123456789abcdef0123456789_0 |
| srid  | spatial reference ID of requested download | 2927 |
| format  | file format of requested download | csv |
| where | Geoservices `where` clause | `where=color=red` |
| geometry | Geoservices `geometry` filter | `geometry={"xmin":-88.244,"ymin":39.726,"xmax":-86.411,"ymax":40.095,"type":"extent","spatialReference":{"wkid":4326}}` |

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the related datasets were found |
| 404       | resource was not found |
| 500       | server error during the request |

#### GET api/v3/datasets/:id/related

This endpoint returns a set of datasets related to the id that is passed in.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the related datasets were found |
| 404       | resource was not found |
| 500       | server error during the request |


##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/datasets?fields[datasets]=name,url,tags,owner - returns a list of datasets with only their name, url, tags, and owner attributes |
| filter[{attribute}] | filter used to narrow the scope of dataset results. NOT used for 'fuzzy' scoring. More details on filters and their advanced usage in the filter function section | /api/v3/datasets?filter[tags]=any(esri,boundaries) - returns a list of datasets that have EITHER 'esri' or 'boundaries' in their tags |
| sort | used for sorting results. a '-' in front of the attribute name means descending order | /api/v3/datasets?sort=-name - return a list of datasets in descending alphabetical order on the name attribute. Default sort is sorted by relevance first then by the `modified` attribute |

#### GET api/v3/datasets/:id/connected-content

This endpoint returns all the datasets that are connected to the id that is passed in.  Connected content is considered any open data layers that are either used in a Web Maps / Web Scences or used in Web Maps / Web Scenes in Web Mapping Applications.  A `url` parameter is available to optionally filter for ids. 

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the connected datasets were found |
| 404       | resource was not found |
| 500       | server error during the request |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/datasets/connected-content?fields[datasets]=name,url,tags,owner - returns a list of datasets with only their name, url, tags, and owner attributes |
| url | used to optionally filter by url | /api/v3/datasets/abc123/connected-content?url=http://example.com |

#### Filter Functions

The filter functions allow clients to greater control over how filter parameters are processed by the API. The filter functions that are available for a particular attribute
depend on the attribute's data type.

Strings

- `?filter[tags]=any(esri,boundaries)` - returns datasets with EITHER 'esri' or 'boundaries' in their tags
- `?filter[tags]=all(esri,boundaries)` - returns datasets with BOTH 'esri' or 'boundaries' in their tags
- `?filter[tags]=prefixAll(census,population)` - returns datasets with tags that start with 'census' AND 'population'. A dataset that has a tag 'census 2010' and 'population studies' would match. A dataset with just 'population change' would not.
- `?filter[source]=prefixAny(NOAA,NWS)` - returns datasets with sources that start with 'NOAA' OR 'NWS'
- `?filter[collection]=any(Event)` - returns datasets that are index as part of the collection type 'Event'.  See [here](https://github.com/Esri/hub.js/blob/master/packages/common/src/categories.ts#L166-L178) for a list of all collection types.

Numbers

- `?filter[recordCount]=gt(100)` - returns datasets with recordCount greater than 100
- `?filter[recordCount]=gte(100)` - returns datasets with recordCount greater than or equal to 100
- `?filter[recordCount]=lt(4000)` - returns datasets with recordCount less than to 4000
- `?filter[recordCount]=lte(4000)` - returns datasets with recordCount less than or equal to 4000
- `?filter[recordCount]=range(100,500)` - returns datasets with recordCount between 100 and 500 (inclusive on both ends)

Dates

- `?filter[created]=before(2017/01/01)` - returns datasets where their items were created before 2017-01-01
- `?filter[composedAt]=after(2017/09/21)` - returns datasets that were composed after 2017-09-21
- `?filter[modified]=between(2017/01/01,2017/02/01)` - returns datasets where their items were modified between 2017-01-01 and 2017-02-01 (inclusive on both ends)

Geo Shapes

- `?filter[bbox]=intersects(-77.342,38.855,-76.709,38.949)` - returns datasets that have bounding boxes that intersect with the query
- `?filter[bbox]=contains(-77.342,38.855,-76.709,38.949)` - returns datasets that have bounding boxes that contain the query
- `?filter[bbox]=disjoint(-77.342,38.855,-76.709,38.949)` - returns datasets that have bounding boxes that have no overlap with the query
- `?filter[bbox]=within(-77.342,38.855,-76.709,38.949)` - returns datasets that have bounding boxes are within the query

#### Aggregation

Modes

- `?agg[mode]=uniqueCount` - returns the total number of unique values for each field

#### Dataset Schema

Attribute

| Attribute | Data Type | Description | Filterable | Sortable | Readonly | Path | Aggregation |
| --------- | --------- | ----------- | ---------- | -------- | -------- | ---- | ----------- |
| name      | String    | name of dataset | n | y | n | default.name | n |
| commentsEnabled | Boolean | if true, commenting is enabled on the Item | y | n | n | item.commentsEnabled | n |
| hubType | String | general data type | y | y | y | default.type | y |
| source | String | the name of the Organization responsible for the dataset | y | y | y | default.source.source | y |
| description | String | description of dataset | n | n | n | default.description | n |
| url | String | url for data source on Item | n | n | n | default.description | n |
| serverURL | String | url of data source Server (if applicable) | n | n | n | default.url | n |
| created | Date | timestamp of when Item was created | y | y | y | item.created | n |
| modified | Date | timestamp of when Item was last modified | y | y | y | item.modified | n |
| composedAt | Date | timestamp of when Dataset was last composed (i.e. the first step of harvesting) | y | y | y | default.composedAt | n |
| composeStatus| Object | status report for compose harvesting step | n | n | y | default.composeStatus | n |
| extent | Object | extent on Item | y | n | n | default.extent | n |
| thumbnail | String | url for Item thumbnail | n | n | n | item.thumbnail | n |
| licenseInfo | String | license for Item | n | n | n | item.licenseInfo | n |
| enrichPerformanceRating | String | heuristic for server performance (good or bad) | y | y | y | enrichments.enrichPerformanceRating | y |
| type | String | type of Dataset | y | y | y | default.type | y |
| tags | String(Array) | user created tags for Item | y | n | n | item.tags | y |
| owner | String | username of user that created the Item | y | y | y | item.owner | y |
| enrichRelated | String | terms related to dataset | y | n | y | enrichRelated.enrichRelated | y |
| layers | Object(Array) | layers for Item (if applicable) | n | n | y | layers | n |
| currentVersion | Float | server version | y | y | y | server.currentVersion | y |
| useStandardizedQueries | Boolean | useStandardizedQueries from server | n | n | y | server.useStandardizedQueries | n |
| supportedExtensions | String | supportedExtensions from server | n | n | y | server.supportedExtensions | n |
| maxRecordCount | Integer | maximum records that can be returned from the server for this dataset | y | y | y | server.maxRecordCount | n |
| serviceSpatialReference | Object | server spatial reference | n | n | y | server.extent.spatialReference | n |
| supportedsAdvancedQueries | Boolean | if true, advanced query capabilities are enabled on the server | y | n | y | server.supportedsAdvancedQueries | n |
| enrichments | Object | enrichment object for dataset | n | n | y | enrichments | n |
| metadata | Object | metadata object for dataset | n | n | y | metadata | n |
| server | Object | server object for dataset | n | n | y | server | n |
| venue | String | (events only) name of event venue | n | y | y | event.venue | n |
| address | String | (events only) address of event venue | n | y | y | event.address | n |
| organizer | String | (events only) name of person or organization that set up the event| n | y | y | event.organizer | n |
| initiativeTitle | String | (events only) related initative | n | y | y | event.initiativeTitle | n |
| startDate | Date | (events only) start date/time of event | y | n | y | event.startDate | n |
| endDate | Date | (events only) enddate/time of event | y | n | y | event.endDate | n |
| status | Boolean | (events only) public, private, draft, planned | y | n | y | event.status | n |
| boundary | Object | boundary around the data points | n | n | y | enrichments.boundary | n |
| vectorTiles | Object | date when vector tiles were updated and link to the vector tiles | n | n | y | enrichments.vectorTiles | n |


#### Attribute Details  
##### Boundary:  
```json
{
  "boundary": {
      "center": [
          -77.03681666666667,
          38.925891666666665
      ],
      "size": 277,
      "geometry": {
          "type": "polygon",
          "rings": [
              [
                  "-77.0390",
                  "38.7916"
              ],
              [
                  "-77.1198",
                  "38.9344"
              ]
          ],
          "spatialReference": {
              "wkid": 4326
          }
      }
  }
}
```

#### Response Formats

##### Collection Format for /api/v3/datasets endpoint (0 to many resources in an API response)

```json
{
  "data": [
    {
      "id": "{dataset_id}",
      "type": "dataset",
      "attributes": {
        "name": "{dataset_name}",
        "url": "{dataset_url}",
        "errors: [],
        // ...
      },
      "links": {
        "self": "https://hub.arcgis.com/api/v3/datasets/{dataset_id}",
        "itemPage": "https://www.arcgis.com/home/item.html?id={item_id}",
        "esriRest": "https://www.arcgis.com/sharing/content/items/{item_id}?f=json"
      }
    },
    {
      // ...
    }
  ],
  "meta": {
    "apiRoot": "https://hub.arcgis.com/api/v3",
    "resourceRoot": "https://hub.arcgis.com/api/v3/datasets",
    "request": "http://hub.arcgis.com/api/v3/datasets?fields[datasets]=name,type,owner,tags&filter[tags]=any(parcels)",
    "queryParameters": {},
    "stats": {
      "total": 0,
      "pageCount": 0,
      "aggs": {
        "tags": [
          {
            "key": "opendata",
            "doc_count": 0
          }
        ]
      }
    }
  }
}
```

##### Object Format (at most 1 resource)

```json
{
    "data": {
      "id": "{dataset_id}",
      "type": "dataset",
      "attributes": {
        "name": "{dataset_name}",
        "url": "{dataset_url}",
        "errors: [],
        // ...
      },
      "links": {
        "self": "https://hub.arcgis.com/api/v3/datasets/{dataset_id}",
        "itemPage": "https://www.arcgis.com/home/item.html?id={item_id}",
        "esriRest": "https://www.arcgis.com/sharing/content/items/{item_id}?f=json"
      }
    }
}
```

##### Aggregation

default aggregation

``` json
{
  "meta": {
    "stats": {
      "aggs": {
        "{{field_name}}": [
          {
            "key": "{{filed_value}}",
            "doc_count": "{{dataset_count}}"
          }
        ]
      }
    }
  }
}
```

unique count aggregation (`agg[mode]=uniqueCount`)

``` json
{
  "meta": {
    "stats": {
      "aggs": {
        "{{field_name}}": "{{unique_value_count}}"
      }
    }
  }
}
```


#### GET api/v3/datasets/:id/redirect

Redirects to a url with more information about the dataset of the passed in id parameter. The URL pattern depends on the type of dataset requested. Dataset IDs that cannot be found or do not have attributes for URL construction redirect to the Hub 404 page.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 302       | request is redirected |
| 500       | server error during the request |

#### GET api/v3/semantics

Returns edges that represent relations like RelatedTo and Synonym for a given set of terms (nodes).

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the edges are found for the given nodes and relation query |
| 400       | the request is invalid like incorrect relation, invalid language, and nodes or relations are blank |
| 500       | server error during the request |


##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| nodes (required) | nodes are terms that are comma separated | /api/v3/semantics?nodes=bike,trail,hike&relations=RelatedTo,Synonym - returns `RelatedTo`, `Synonym` edge relations for the input nodes |
| relations (required) | relations are edge relations like RelatedTo and Synonym (Currently, only `RelatedTo` and `Synonym` relations are allowed) | /api/v3/semantics?nodes=bike,trail,hike&relations=RelatedTo,Synonym - returns `RelatedTo`, `Synonym` edge relations for the input nodes |
| language (optional) | language abbreviation of the nodes (terms). For a list of supported languages, please refer to [api/middleware/helpers/languages.json](../api/middleware/helpers/languages.json). By default the language will be considered as English | /api/v3/semantics?nodes=fleuve&relations=RelatedTo,Synonym&language=fr - returns `RelatedTo`, `Synonym` edge relations for the input node which is in French |

#### Filter Functions

The filter functions give clients a greater control over how results are filtered by the API

- `?filter[similarityThreshold]=0.65` - returns edges of the `RelatedTo` type that are at least 65% similar. This filter is applicable only for `RelatedTo` relation.

#### Response Format

Collection Format (0 to many resources in an API response)

```json
{
   "data": [
     {
       "id": "c/en/accident-RelatedTo-c/en/crash",
       "type": "RelatedTo",
       "attributes": {
         "start": "accident",
         "end": "crash",
         "similarity": 0.67,
         "startLanguage": "English",
         "endLanguage": "English"
       },
       "meta": {
         "source": "verbosity"
       }
     }
   ],
   "meta": {
     "total": 986,
     "inputMap": {
       "Accidents": "accident",
    }
   }
}
```

#### Semantics Schema

Attributes

| Attribute | Data Type | Description |
| --------- | --------- | ----------- |
| start     | String    | start node of the edge |
| end     | String    | end node of the edge |
| similarity     | Number    | cosine similarity between the start and end nodes (field present only if the edge type is `RelatedTo`) |
| startLanguage     | String    | language of the start node |
| endLanguage     | String    | language of the end node |

Meta Attributes

| Attribute | Data Type | Description |
| --------- | --------- | ----------- |
| id     | String    | ConceptNet's core edge representing start node -- edge type -- end node as URIs |
| type     | String    | edge relation |
| source     | String    | the source of this edge in ConceptNet |
| inputMap     | String    | a mapping that indicates how the input nodes were preprocessed |
| total     | Number    | total number of resources |

#### GET api/v3/search

This is the new endpoint (aka unified-search) for searching, filtering, and sorting collections of datasets and restricted items.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful, even if the query returns 0 results |
| 500       | server error during the request |

##### Request Headers

The following are optional request headers this endpoint accepts in order to search AGO restricted items

| field | description | example |
| ----- | ----------- | ------- |
| authorization     | ArcGIS Online token |  |
| portal     | ArcGIS Online portal environment to search | `https://${env}ext.arcgis.com/sharing/rest` where env is dev, qa, or prod |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| q     | full-text query ('fuzzy' queries) | /api/v3/search?q=redlands parcels - will return results that best match a query for 'redlands parcels' |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/search?fields[datasets]=name,url,tags,owner - returns a list of datasets/items with only their name, url, tags, and owner attributes |
| filter[{attribute}] | filter used to narrow the scope of dataset results. NOT used for 'fuzzy' scoring. More details on filters and their advanced usage in the filter function section | /api/v3/search?filter[tags]=any(esri,boundaries) - returns a list of datasets/items that have EITHER 'esri' or 'boundaries' in their tags |
| agg[{property}] | used for specifying field aggregation settings, including `fields`, `size`, `mode`. The aggregation works on given attribute fields at `agg[fields]` and returns dataset count for each field value (up to the number specified at `agg[size]`, by default `10`). The `agg[mode]` specifies the type of stats returned by the aggregation. | /api/v3/search?agg[fields]=source&agg[size]=10 - returns the top 10 dataset sources and the associated dataset count for each source |
| sort | used for sorting results. a '-' in front of the attribute name means descending order | /api/v3/search?sort=-name - return a list of datasets in descending alphabetical order on the name attribute. Default sort is sorted by relevance first then by the `modified` attribute |
| page[key] | used to fetch the next set of results where the key is provided by the previous response's meta.next field. It is auto-generated by the api | /api/v3/search?page[key]=1ef

See [errors](errors.md) for a more-thorough document on error types and parameters.

##### Collection Format for /api/v3/search endpoint (0 to many resources in an API response)


| Field | Notes |
| --------- | --------- |
| data | Array of data containing public and private datasets/items from Hub and/or AGO |
| meta | Metadata about the response |
| `meta.queryParameters` | The query parameters sent for this request. i.e. request.query object |
| `meta.stats.count` | Number of results in this response |
| `meta.stats.totalCount` | Total number of results for this request |
| `meta.stats.aggs` | Aggregations for the requested fields where each agg is of format `key` and `docCount` where key is the value in the aggregated field and docCount is the number of documents that match that key |
| `meta.next` | A link to the next set of results for the same request |
| `meta.warning` | An array of warnings describing whether something went wrong in the search |

Example:

```json
{
  "data": [
    {
      "id": "{dataset_id}",
      "type": "dataset",
      "attributes": {
        "name": "{dataset_name}",
        "url": "{dataset_url}",
        "access": "public",
        // ...
      },
    },
    {
      // ...
    }
  ],
  "meta": {    
    "queryParameters": {},
    "stats": {
      "count": 20,
      "totalCount": 123
      "aggs": {
        "tags": [
          {
            "key": "opendata",
            "doc_count": 0
          }
        ]
      },
      "next": "https://...?q=...&page[key]=1xx==...",
      "warning": [
        {
          "title": "ArcGISAuthError",
          "status": 498,
          "message": "498: Invalid token."
        }
      ]
    }
  }
}
```

#### POST /api/v3/jobs/group/:id/harvest

This authenticated endpoint is used to publish a harvest-group job for a group ID. 

##### Responses

| HTTP Code | Scenario | Response |
| --------- | -------- | ------------ |
| 200       | harvest-group job is published and request is successful | `{ jobId }`
| 400       | POST body does not contain `isOpenData` property | `{ message: <error message> }`
| 403       | authentication failed | |
| 404       | `id` is not in GUID format | |
| 500       | harvest-group job could not be published | `{ message: <error message> }` |

##### Request Headers

The following are optional request headers this endpoint accepts in order to search AGO restricted items

| field | description | example |
| ----- | ----------- | ------- |
| authorization     | ArcGIS Online token |  |
| portal     | ArcGIS Online portal environment to search | `https://${env}ext.arcgis.com/sharing/rest` where env is dev, qa, or prod |

## Events

#### GET api/v3/events/:orgId
Returns server info for an organization's Events feature service.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |

##### Query parameters
| param | description | example |
| ----- | ----------- | ------- |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### GET /api/v3/events/:orgId/:view/layers
Returns information about all the layers that are defined for an organization's event service.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |

#### GET /api/v3/events/:orgId/:view/:layerId
Returns information about a layer for an organization's Events feature service.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events, unless it's value is `layers`. Otherwise it is present strictly for routing purposes.  | 0 |

##### Query parameters
| param | description | example |
| ----- | ----------- | ------- |
| token | Authorization token issued to the requesting user | `token=ABCDEFG` |

#### GET /api/v3/events/:orgId/:view/:layerId/query
Query all or a subset of events using query parameters defined by the [ArcGIS REST API](https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm).

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |

#### GET /api/v3/events/:orgId/:view/:layerId/:id
Get information about an organization's event.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |
| id | ID of the event.  Can also be set to `query` and all event features are returned. | 1 |

##### Query parameters
| param | description | example |
| ----- | ----------- | ------- |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |
| others | See [GeoServices API](http://geoservices.github.io/query.html) | |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/applyEdits
Edit the organization's event feature service layer. This route essentially passes through to the feature service. Additional information about parameters and responses can be found [here](https://developers.arcgis.com/rest/services-reference/apply-edits-feature-service-layer-.htm).

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| adds | Can be sent as form-data or raw POST body json. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/apply-edits-feature-service-layer-.htm) for additional information. | |
| updates | Can be sent as form-data or raw POST body json. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/apply-edits-feature-service-layer-.htm) for additional information. | |
| deletes | Can be sent as form-data or raw POST body json. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/apply-edits-feature-service-layer-.htm) for additional information. | |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/addFeatures
Add features to the organization's event feature service layer. This route essentially passes through to the feature service and then the event data is added to the search index. Additional information about parameters and responses can be found [here](https://developers.arcgis.com/rest/services-reference/add-features.htm).

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| features | Can be sent as form-data or raw POST body json. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/add-features.htm) for additional information. In addition to `attributes` and `geometry`, each feature should also have the following properties to facilitate addition to the search index: `orgTitle`, `initiativeTitle`, and `eventUrl` | |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/updateFeatures
Update existing features in the organization's event feature service layer. This route essentially passes through to the feature service and then the event data is used to update the search index. Additional information about parameters and responses can be found [here](https://developers.arcgis.com/rest/services-reference/update-features.htm).

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| features | Can be sent as form-data or raw POST body json. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/add-features.htm) for additional information. In addition to `attributes` and `geometry`, each feature should also have the following properties to facilitate update of the search index: `orgTitle`, `initiativeTitle`, and `eventUrl` | |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/deleteFeatures
Delete existing features in the organization's event feature service layer. This route essentially passes through to the feature service and the posted `objectIds` are used to remove events from the search index. Additional information about parameters and responses can be found [here](https://developers.arcgis.com/rest/services-reference/delete-features.htm).

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| objectIds | Can be sent as form-data or raw POST body json. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/delete-features.htm) for additional information. In addition to `attributes` and `geometry`, each feature should also have the following properties to facilitate update of the search index: `orgTitle`, `initiativeTitle`, and `eventUrl` | |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### GET /api/v3/events/:orgId/:view/:layerId/:id/attachments
Get attachments for an organization's event.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |
| id | ID of the event. | 1 |

##### Query parameters
| param | description | example |
| ----- | ----------- | ------- |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### GET /api/v3/events/:orgId/:view/:layerId/:id/attachments/:attachmentId
Get specific attachments for an organization's event.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |
| id | ID of the event. | 1 |
| attachmentId | ID of the event's attachment. | 1 |

##### Query parameters
| param | description | example |
| ----- | ----------- | ------- |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/addAttachment
Add an attachment to an organization's event.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |
| id | ID of the event. | 1 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| attachment | Can be sent as form-data. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/add-attachment.htm) for additional information. | |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/updateAttachment
Update an organization's event attachment.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |
| id | ID of the event. | 1 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| attachmentId | ID of the event's attachment. | 1 |
| attachment | Can be sent as form-data. See ArcGIS [services reference](https://developers.arcgis.com/rest/services-reference/update-attachment.htm) for additional information. | |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

#### POST /api/v3/events/:orgId/:view/:layerId/:id/deleteAttachment
Delete an organization's event attachment.

##### Responses
| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and feature server information is returned or feature service returned an error wrapped in a success object |
| 500       | server error during the request |

##### Route parameters
| param | description | example |
| ----- | ----------- | ------- |
| orgId | ID of the organization for which events are being requested | ABCDEFG |
| view | Name of the permissioned view you are requesting. | `Hub Events` |
| layerId | ID of the feature server layer for which events are being requested. Note that this parameter is overwritten by the layer ID that is returned in the feature service URL for an organizations events. Otherwise it is present strictly for routing purposes.  | 0 |
| id | ID of the event. | 1 |

##### Body parameters
| param | description | example |
| ----- | ----------- | ------- |
| attachmentId | ID of the event's attachment. | 1 |
| token | Authorization token issued to the requeesting user | `token=ABCDEFG` |

### ACME Challenge

#### Endpoints
* PUT /.well-known/acme-challenge/:tokenName
* GET /.well-known/acme-challenge/:tokenName

#### PUT /.well-known/acme-challenge/:tokenName

This endpoint inserts the token text with the given token name and the domain. If the token name already exists, it updates its token text with the given one. Authentication (AGO token) is required for this endpoint and it is for hub team members only.

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| tokenName | token name to update | /.well-known/acme-challenge/employee-login |

##### Request Body

``` json
{
  "tokenText": "your token text"
}
```

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful |
| 4xx       | authentication error |
| 500       | server error during the request |

##### Response Format

It returns the token text as raw text.

```
token-text
```

#### GET /.well-known/acme-challenge/:tokenName

This endpoint retrieves the token text using the given token name and the domain.

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| tokenName | token name to query | /.well-known/acme-challenge/employee-login |

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful |
| 404       | token name not found |
| 500       | server error during the request |

##### Response Format

It returns the token text as raw text.

```
token-text
```

## Domains

#### GET /api/v3/domains/validate

Validates a specified hostname for use with ArcGIS Hub by testing it for a `CNAME` record that resolves to `hub.arcgis.com`.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | domain successfully tested but may or may not be valid |
| 400       | domain is malformed |
| 500       | server error during domain validation |

##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| hostname | hostname to validate for use with ArcGIS Hub | /api/v3/hostname?hostname=foo.bar.com - returns `success=true` and tested url if foo.bar.com resolves to Hub, `success=false`, tested url, and error info if it does not |

##### Response Format

```json
{
  "success": true,
  "input": "qa.testopendata.com"
}
```
```json
{
  "success": false,
  "input": "foo.com",
  "reason": "notHubCname"
}
```
```json
{
  "success": false,
  "input": "foobar",
  "error": {
    "code": 400,
    "detail": "ENOTFOUND",
    "message": "domainNotFound"
  }
}
```
```json
{
  "success": false,
  "input": "foobar",
  "error": {
    "code": 500,
    "detail": "FOO",
    "message": "domainValidationError"
  }
}
```

## Telemetry

#### POST /api/internal/telemetry/tests

Accepts JSON representing a test suite and its individual tests. Results are written to the elasticsearch index `tests-$date`.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | test suite received and indexed |
| 500       | error during processing test suite |

##### Input Format

```js
{
  start: 2732166123,
  end: 2732166882,
  suite: 'admin',
  emberVersion: '3.5.2',
  nodeVersion: '8.4.2',
  chromeVersion: 74,
  results: [
    {
       timestamp,
       duration,
       type, <acceptance | unit | integration>
       module,
       name,
       status <pass|fail|skipped>,
       duration
       error <null or stacktrace>
    }
  ]
}
```
##### Response Format

```json
{
  "success": true,
  "id": "1ef141",
  "receivedCount": 3
}
```

## Vector Tiles
#### GET api/v3/arcgis/rest/info

This endpoint returns a `JSON` object that provides mocked ArcGIS server information so AGO clients can use vector tiles without error.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful `json` object is returned |
| 404       | resource was not found |
| 500       | server error during the request |

#### GET api/v3/arcgis/rest/services/:id/VectorTileServer

This endpoint returns a `JSON` object that provides the location of styling for the vector tiles and also provides the location of where the tiles themselves are stored.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful `json` object is returned |
| 404       | resource was not found |
| 500       | server error during the request |

#### GET api/v3/arcgis/rest/services/:id/VectorTileServer/resources/styles/root.json

This endpoint returns a `JSON` object that provides the styling for the vector tiles. The returned object also contains the url to the [`/VectorTileServer`](#get-apiv3datasetsidvectortileserver) endpoint which in turn points to the exact location of the vector tiles.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful `json` object with styling is returned |
| 404       | resource was not found |
| 500       | server error during the request |

#### GET api/v3/arcgis/rest/services/:id/VectorTileServer/resources/sprites/sprite.json

This endpoint is currently required by ArcGIS clients, which have errors without it. Our vector tiles don't use sprites so we return an empty object.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful `json` object is returned |
| 404       | resource was not found |
| 500       | server error during the request |

#### GET api/v3/arcgis/rest/services/:id/VectorTileServer/resources/fonts/:fontname/:fontrange.pbf

This endpoint is currently required by ArcGIS clients, which have errors without it. Our vector tiles don't use fonts so we return an empty body.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful |
| 404       | resource was not found |
| 500       | server error during the request |


## Namespaces

- /api/jobs: administrative API for inspecting and interacting with jobs (units of work that harvest, inspect, and enrich data from ArcGIS Online or Portal)
- /api/es/: administrative API for interacting with the underlying ElasticSearch cluster (read-only)
- /api/v3: public-facing API for ArcGIS Hub