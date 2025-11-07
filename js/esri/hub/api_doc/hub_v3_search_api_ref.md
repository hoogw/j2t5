> https://hub.arcgis.com/api/v3

The public-facing v3 API for ArcGIS Hub adheres to the [JSON:API](http://jsonapi.org/) standard. The specification is worth reading on its own but we will provide some examples here.

### Endpoints

- [Search](#search)
  - [GET /api/v3/datasets?{q,filter[],fields[],page[],}](#get-apiv3datasets)
  - [GET /api/v3/datasets/:id?{fields[]}](#get-apiv3datasetsid)
  - [GET /api/v3/explain/datasets?{q,filter[],fields[],page[]}](#get-apiv3explaindatasets)
  - [GET /api/v3/datasets/:id/related](#get-apiv3datasetsidrelated)
  - [GET /api/v3/datasets/:id/:namespace](#get-apiv3datasetsidnamespace)
  - [GET /api/v3/semantics?{node, lang, rel}](#get-apiv3semantics)

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
| sort | used for sorting results. a '-' in front of the attribute name means descending order | /api/v3/datasets?sort=-name - return a list of datasets in descending alphabetical order on the name attribute. Default sort is sorted by relevance first then by the `modified` attribute |


#### GET api/v3/datasets/:id

Returns a result if a dataset with that id exists. If the resource does not exist it returns a 404.

##### Responses

| HTTP Code | Scenario |
| --------  | -------- |
| 200       | request is successful and the dataset corresponding to the id was found |
| 404       | resource was not found |
| 500       | server error during the request |


##### Parameters

| param | description | example |
| ----- | ----------- | ------- |
| fields[{resource}] | used for client-specified payloads, i.e. [sparse fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets) | /api/v3/datasets?fields[datasets]=name,url,tags,owner - returns a list of datasets with only their name, url, tags, and owner attributes |


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

#### Filter Functions

The filter functions allow clients to greater control over how filter parameters are processed by the API. The filter functions that are available for a particular attribute
depend on the attribute's data type.

Strings

- `?filter[tags]=any(esri,boundaries)` - returns datasets with EITHER 'esri' or 'boundaries' in their tags
- `?filter[tags]=all(esri,boundaries)` - returns datasets with BOTH 'esri' or 'boundaries' in their tags
- `?filter[tags]=prefixAll(census,population)` - returns datasets with tags that start with 'census' AND 'population'. A dataset that has a tag 'census 2010' and 'population studies' would match. A dataset with just 'population change' would not.
- `?filter[source]=prefixAny(NOAA,NWS)` - returns datasets with sources that start with 'NOAA' OR 'NWS'

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

#### Response Formats

Collection Format (0 to many resources in an API response)
```json
{
  "data": [
    {
      "id": "{dataset_id}",
      "type": "dataset",
      "attributes": {
        "name": "{dataset_name}",
        "url": "{dataset_url}",
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

Object Format (at most 1 resource)

```json
{
    "data": {
      "id": "{dataset_id}",
      "type": "dataset",
      "attributes": {
        "name": "{dataset_name}",
        "url": "{dataset_url}",
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

## Namespaces

- /api/jobs: administrative API for inspecting and interacting with jobs (units of work that harvest, inspect, and enrich data from ArcGIS Online or Portal)
- /api/es/: administrative API for interacting with the underlying ElasticSearch cluster (read-only)
- /api/v3: public-facing API for ArcGIS Hub