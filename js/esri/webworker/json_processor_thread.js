 

 // fetch ( no proxy for cors)



    

   
  // lunr.js 
  // script(src='/public/utility/lunr/lunr.js')   //not use in pug,
  importScripts('../../lib/lunr/lunr.js')   //but use in web worker
    
                  
  


  
  var input_current = null    // whole json
  var current_filter_result_count;
  var __total_item_count;
 





// ================  lunr.js ==========================  
 var idx
 var lunr_index
 var lunr_idx_ready_status = false
// ================  end ==========  lunr.js ======================  








//  ---- fetch stream api   ---- 

      var chunck_count_threathold = 5  // add json to map per 50 chunck,
      
       var result_string = "";
       var chunck_string = "";
       
      var chunck_array
     
      var chunck_features = [];
      var chunck_feature;
      var chunck_feature_string;
     
      var chunck_count = 0;
      var chunck_MB;
      
//  ---- end  ---- fetch stream api



 var operation,    url,   
     _search_keyword,  _search_operator ;

 var _total_json_count
 
 var _stream_is_active = true;


              

// views count
 var meta_info_url;
 var meta_info;   
 var meta_info_response

 var short_list_count = 100 





                    //----------------------------- lunr related ----------------------------------------



                                            
                          function elastic_lunr_search(_filter_by, _search_operator){

                                                          

                             
                            
                                //Remove whitespace from both sides of a string
                                // make sure a space can not become a substring. example: "  626-6603   " 
                                _filter_by = _filter_by.toLowerCase().trim();

                              
                              
                              var _filter_by_array = _filter_by.split(" ");
                              
                              
                              
                              if (_filter_by.length > 0) {  
                      
                    

                                              // ............. filter results  ....................
                      
                                            
                                                    var _filtered_results = [];
                                                  

                                                    var _filter_by_tailing= '';  // foo*   wildcard 
                                                    var _suggest_keyword = '';   // suggest keyword always is a single word, if multiple words present, always use last word
                                                    var _suggest_keyword_tailing = '';

                                                    var _idx_results = [];
                                                    var _idx_results_exact_match = [];     // exact match ('foo') with stemming
                                                    var _idx_results_tailing = [];  //  wildcard ('foo*') without stemming
                                  
                                                    var _suggest_results = [];
                                                    var _suggest_results_exact_match = [];
                                                    var _suggest_results_tailing = [];

                    
                      
                                           // ************ lunr.js *******************
                                              
                                              
                                              
                                                  //https://github.com/olivernn/lunr.js/issues/344
                                                  // search 'city' and 'salt' and 'lake', must have all 3 words, should use "+city +salt +lake"
                                              
                                          if (_filter_by_array.length > 1) {
                                                              
                                                    // multiple keywords
                                                      
                                                    _filter_by ='';
                                                    _filter_by_tailing = '';

                                                    for (var p = 0; p < _filter_by_array.length; ++p) {



                                                      _filter_by += ' +' + _filter_by_array[p]   // search('+los +an')
                                                      _filter_by_tailing =   _filter_by + '*';   // search('+los +an*')   only last word have wildcard


                                                      //if multiple words present, always use last word
                                                      _suggest_keyword = _filter_by_array[p];
                                                      _suggest_keyword_tailing = _suggest_keyword
                                                  
                                                    }//for



                                                      console.log('  ### multiple keywords  ###  exact match ',_filter_by)
                                                      console.log('  ### multiple keywords  ###  wildcard tailing ',_filter_by_tailing)
                                              
                                          } else {



                                                  

                                                      // single keywords          
                                                      // .search('foo*'), with wildcard will not stemming, so must add both exact match .search('foo') and  .search('foo*')  
                                                      
                                                      _filter_by_tailing =   _filter_by + '*';
                                                      _suggest_keyword = _filter_by
                                                      _suggest_keyword_tailing = _suggest_keyword + '*';
                                                  

                                                    console.log(' single keywords exact match ', _filter_by)
                                                    console.log(' single keywords wildcard tailing ',_filter_by_tailing)


                                          }
                                              



                                              
                                          _idx_results_exact_match =idx.search(_filter_by)         // search('+los +an')
                                          _idx_results_tailing = idx.search(_filter_by_tailing)    // search('+los +an*')   only last word have wildcard

                                          // this will duplicate results by 2 times, some time exact match have results,but tailing have zero. sometimes, tailing have results, exact match have zero
                                        // _idx_results =_idx_results_exact_match.concat(_idx_results_tailing)

                                        if (_idx_results_exact_match.length > _idx_results_tailing.length){

                                                    _idx_results =  _idx_results_exact_match


                                        } else {

                                                    _idx_results =  _idx_results_tailing

                                        }
                                        
                                        console.log('_idx_results_exact_match  ***  ', _idx_results_exact_match)
                                        console.log('_idx_results_tailing  ***  ', _idx_results_tailing)
                                          console.log('_idx_results  ***  ', _idx_results)














                                            // ************** lunr suggest *******************      
                                                    
                                                            // idx.tokenSet, get all token(stem keywords) in this index.  intersect with suggest keyword
                                                            _suggest_results_exact_match = idx.tokenSet.intersect(lunr.TokenSet.fromString(_suggest_keyword)).toArray();
                                                            _suggest_results_tailing  = idx.tokenSet.intersect(lunr.TokenSet.fromString(_suggest_keyword_tailing)).toArray();

                                                          
                                                      if (_suggest_results_exact_match.length > _suggest_results_tailing.length){

                                                                  
                                                                  _suggest_results = _suggest_results_exact_match 

                                                      } else {

                                                                _suggest_results =  _suggest_results_tailing 

                                                      }

                                                              console.log(' ^^^^^^ suggest results  exact match  ^^^^^^ ', _suggest_results_exact_match)
                                                              console.log(' ^^^^^^  suggest results  tailing ^^^^^^ ',         _suggest_results_tailing)
                                                              console.log(' ^^^^^^  suggest results  ^^^^^^ ',         _suggest_results)







                                        // **************  end *************  lunr suggest *******************   










                                                    

                                        for (var l = 0; l < _idx_results.length; ++l) {

                                                      //  console.log('_idx :  ', _idx_results[l].ref)
                                                        
                                                     

                                                               //Find an object in an array by one of its properties 
                                                               // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
                                                               // const result = inventory.find( ({ lunr_id }) => lunr_id === 'xxxx' );
                                                               _filtered_results.push(input_current.find(({ lunr_id }) => lunr_id === _idx_results[l].ref) )


                                                    


                                                  }// for


                                              // ************ end  ************* lunr.js *******************
                      
                      
                      


                                          var _searchResults = {'filter':_filtered_results, 'suggest':_suggest_results}
                      
                                            console.log(' _searchResults ' , _searchResults)
                                              return _searchResults
                      
                      


                                    
                    } else {
                          
                          
                          // keyword is empty
                          // return  json object.features
                            return null

                      }
                    
                    
                                  


                          } 





                         
                    function inject_lunr_id(){
                                            

                      /*
                            [
                              
                              {

                                // will inject this field
                                  lunr_id: xxx 

               

                                  @type: "dcat:Dataset"
                                  accessLevel: "public"
                                  contactPoint: {@type: "vcard:Contact", fn: "lacounty_isd"}
                                  description: "<p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>Location Management System (LMS) is County of Los Angeles GIS Program to maintain a single, comprehensive geographic database of locations countywide.  The scope of this information is broad, including locations of services, points of interest, physical features, to name a few.  The goal is that maintenance of the information will be done by the jurisdiction (city, department, agency) that provides the service.</p><p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>A standard set of information about each location will be maintained and accessed by agencies and the public through all of the applications and maps that the County develops.</p>"
                                  distribution: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
                                  identifier: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118"
                                  issued: "2016-03-02T23:30:02.000Z"
                                  keyword: (3) ["Location Management System", "LMS", "Points of Interest"]
                                  landingPage: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118"
                                  license: "http://geohub.lacity.org/datasets/6f6c4677365b4418bd585db2ef8e201f_118/license.json"
                                  modified: "2018-05-15T14:25:10.000Z"
                                  publisher: {source: "County of Los Angeles"}
                                  spatial: "-143.049,23.3761,-75.063,46.7642"
                                  theme: ["geospatial"]
                                  title: "Private Non Retail Shipping Locations"
                              }, 

                              {},
                              {},
                              ...

                              {}
                            ]

                          */    

                          
                          for (p = 0; p < input_current.length; p++) {

                          
                            input_current[p].lunr_id = p.toString();  
                            

                          }



                    }
                  



                          function populate_lunr_index(){
                        
                            lunr_index = []
                
                            for (var j = 0; j < input_current.length; ++j){
                                              
                                lunr_index.push({lunr_id: input_current[j].lunr_id,    title: input_current[j].title})
                                                
                            }
                    
    
                  
                }
    

      

                function init_lunr_index(){
                                        
                  
                      // enforce add lunr_id field
                      inject_lunr_id()
                                          
                      
                      console.log('enforce add lunr_id field ', input_current)


                      populate_lunr_index()
    
                    
    
                      console.log('lunr_index ......++++++ ', lunr_index)
                     
    
                    idx = lunr(function () {
                          
                        this.ref('lunr_id')

                        // specify what field will be searching for, you can add more and more field here.
                        // only one search field
                         this.field('title')

                                 
    
                        lunr_index.forEach(function (doc) {
                                                            this.add(doc)
                                                          }, this)
                                                                                            
                    })
                                                                                          
            
    
                }
    
                
                
                
                
            //----------------   end  ----------------- lunr related ----------------------------------------

                  




            //-------------- sort by view count ----------------------
            // Sort array of objects by string property value
            // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
            
            function compare(a,b) {
              if (a.numViews < b.numViews)
                return 1;
              if (a.numViews > b.numViews)
                return -1;
              return 0;
            }
  
              //-------------- sort domain by count ----------------------
  
  
  






onmessage = async function(e) {

                    
            operation = e.data.operation
            url =  e.data.url          
           
            _search_keyword = e.data.search_keyword
            _search_operator = e.data.search_operator


          



            switch(operation) {

              case 'download_json':  // always use store.within(globle_bounding_box)

                              
                                                    
                     console.log('download_json: url : ', url);
                                            


                      /*
                          sample :   hub/data.json

                            {"@context":"https://project-open-data.cio.gov/v1.1/schema/catalog.jsonld",
                            "@type":"dcat:Catalog",
                            "conformsTo":"https://project-open-data.cio.gov/v1.1/schema",
                            "describedBy":"https://project-open-data.cio.gov/v1.1/schema/catalog.json",
                            "dataset":[{"@type":"dcat:Dataset","identifier":....},{} ... {}]


                             }


                      */





                    //  ****************** fetch whole json ******************



                                          // ----- both works 2:   fetch , await, no stream , uncomment this section -----
                                              /*
                                                let response = await fetch(url);

                                                // before postMessage() back,  response must convert to json
                                                input_current = await response.json()  //  JSON.parse(response);
                                               
                                                this.console.log('input_current ', input_current)
                                              */
                                                
                                           // ----- end ----- fetch await, no stream -----








                     //  ----- both works 1:
                    // ----- fetch.stream api -----chunk string have html tag mixed, hard to split, so only return downloaded MB size so far. 
                    fetch(url)
                    .then((response) => {


                                           
                      //console.log('test ', uuuu)
      

                        const reader = response.body.getReader();

                        const stream = new ReadableStream({

                          start(controller) {

                              // The following function handles each data chunk
                              function push() {
                                // "done" is a Boolean and value a "Uint8Array"
                                reader.read().then(({ done, value }) => {


                                  // Is there no more data to read?
                                  if (done) {

                                                                    // console.log('test ', uuuu)  
                                                                    
                                                                      // this is whole downloaded json
                                                                      // must use dataset array []
                                                                      input_current = JSON.parse(result_string).dataset
                                                                      


                                                                     console.log('fetch Stream finished:', input_current)


                                                                     __total_item_count = input_current.length

                                                                      postMessage({
                                                                        operation: 'browse_result', 
                                                                        is_whole_status:true,
                                                                       
                                                                        current_json: input_current
                                                                      
                                                                      });   
                                                                  


                                                                      


                                                                      
                                                        // Tell the browser that we have finished sending data
                                                        controller.close();
                                                        reader.releaseLock();

                                                        
                                                        return;
                                                      }
                                            



                                                      // Get the data and send it to the browser via the controller
                                                      controller.enqueue(value);

                                                            chunck_string = new TextDecoder("utf-8").decode(value);

                                                            chunck_count +=1;


                                                            // display dowload progress and show downloaded chunk data on map, only when display 100th chunck, 200th chunck, etc.... 
                                                            if (
                                                                 ((chunck_count % chunck_count_threathold) == 0) 
                                                                 
                                                                  &&

                                                                  // must have:      },{"@type":"dcat:Dataset"
                                                                  (chunck_string.includes('},{"@type":"dcat:Dataset"'))
                                                                
                                                               ){


                                                                  
                                                                                  // works but have max size limit, when exceeded, rangeError
                                                                                  //chunck_string = String.fromCharCode.apply(null, value);

                                                                                 //  console.log('chunck value : ', value)
                                                                                 //console.log('chunck string : ', chunck_string)

                                                                                

                                                                                 // geojson, you can do  chunck_string.split('},{')
                                                                                 // but here hub data.json, you must do below
                                                                                  chunck_array = chunck_string.split('},{"@type":"dcat:Dataset"');
                                                                                 // console.log('chunck array : ', chunck_array.length, chunck_array[2])
                                                                                  chunck_features = [];

                                                                                  //chunck_array[0]  and chunck_array[length] (last item) are always half part, not usable, so must start from [1] to [array.length] 
                                                                                  // console.log('value is : ', chunck_array[0])

                                                                                  for (c = 1; c < chunck_array.length-1; c++) { 
                                                                                    
                                                                                    chunck_feature_string = '{"@type":"dcat:Dataset"'+ chunck_array[c] + '}'
                                                                                  
                                                                                    chunck_feature = JSON.parse(chunck_feature_string)
                                                                                    chunck_features.push(chunck_feature)
                                                                                  } 





                                                                                 
                                                                                 // console.log('post 10 chuck back, MB  : ', chunck_MB, chunck_features)          
                                                                        
                                                                          
                                                                                  
                                                                             
                                                                        postMessage({
                                                                          operation: 'browse_result', 
                                                                          is_whole_status:false,
                                                                          downloaded_chunck_size:chunck_MB,
                                                                          current_json: chunck_features
                                                                        
                                                                        });   
                                                                    
                                                                      
                                                                       

                                                            } // if

                                                            
                                                            //console.log('chunck_string --> ', chunck_string)


                                                            result_string += chunck_string;
                                        
                            
                                                            // --- display downloaded MB ---

                                                                chunck_MB = result_string.length * (1.0E-6)
                                                                chunck_MB = chunck_MB.toFixed(2)
                                                               
                                                            // --- display downloaded MB ---


                                                           // console.log('chunck_MB --> done', chunck_MB, done)

                                                           push();
                                                          });
                                                        };
                                                        
                                                        push();
      
      
      
                                                    }
      
      
      
      
      
                                                  });
                                            
                                                  //return new Response(stream, { headers: { "Content-Type": "text/html" } });
                                                  return new Response(stream);
      
      
                              }) // then

                              .catch((error) => {

                                
                                console.log('fetch Error -> :', error);

                                
            
                                postMessage({
                                    operation: 'error_result', 
                                    error_message:  'CORS not available, try proxy hub7.html '
                                  
                                  });   



                            });
                                          
                                             


                    // ----- end -------  fetch.stream -----






     
                 break;










              case 'search_keyword' :

                  // code block

                  

                            if (! lunr_idx_ready_status){

                              // large dataset will cost long time to run, so lunr will not run at beginning, until user first time search keywords.
                             // ****** ****** ******   init lunr index  **************
                                // parameter:  [json array], index field, search field
                                //init_lunr_index(input_current, 'lunr_id', 'title' )
                                init_lunr_index()
                             // ******  End  ********** init lunr index   **************
                                                                       

                              lunr_idx_ready_status = true;
                            }
                            

                            var searchResult  = elastic_lunr_search(_search_keyword, _search_operator)

                              

                            //_current_showing_count = search_result_features.length;

                            this.console.log('  searchResult --- ', searchResult)

                            postMessage({
                              operation: 'search_result'   , 
                             // current_showing_count:_current_showing_count,
                              current_json: searchResult
                            });

                            break;

                      


              case 'get_viewsCount':  
                              
                                                    
                        


              var show_views_shortlisted = true


              for (var v = 0; v < __total_item_count; v++) { 


                /*

                    layer meta info ( with view count, html ): 
                                  https://www.arcgis.com/home/item.html?id={item_id}
                                  https://www.arcgis.com/home/item.html?id=a22e7905d67f4330bbec630eebd38419




                    ***** we need this api for view count  ***** 
                    layer meta info ( with view count, json ): 
                              https://www.arcgis.com/sharing/content/items/{item_id}?f=json
                              https://www.arcgis.com/sharing/content/items/a22e7905d67f4330bbec630eebd38419?f=json

                */




                // must get portal id

                                                                    // .... get portal id, for hub only .....
                                                                      //"identifier": "http://geohub.lacity.org/datasets/9eee1f2d84da4730b02ac90e5bfb560d_9",
                                                                      // portal id : 9eee1f2d84da4730b02ac90e5bfb560d
            
                                                                      var _identifier = input_current[v].identifier;
            
                                                                      var _identifier_array = _identifier.split('/');
              
                                                                      var _portal_id = _identifier_array[_identifier_array.length - 1];
              
                                                                          _portal_id_array = _portal_id.split('_');
              
                                                                          _portal_id = _portal_id_array[0];
  
  
                                                                      input_current[v].portal_id = _portal_id
                                                                      
                                                                      // .... get portal id, for hub only .....




                meta_info_url =  'https://www.arcgis.com/sharing/content/items/' + input_current[v].portal_id + '?f=json'

                // only for fetch,  specially must use 2 await, without 2nd await .json(), will fail to catch promise
                meta_info_response = await fetch(meta_info_url)
                meta_info =  await meta_info_response.json();
               
                
               //console.log('meta_info', meta_info)


                /*

                        access: "public"
                        accessInformation: "County of Los Angeles↵Enterprise GIS (eGIS) Group↵egis@isd.lacounty.gov"
                        appCategories: []
                        avgRating: 0
                        banner: null
                        categories: []
                        commentsEnabled: true
                        culture: "en-us"
                        description: "<p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>Location Management System (LMS) is County of Los Angeles GIS Program to maintain a single, comprehensive geographic database of locations countywide.  The scope of this information is broad, including locations of services, points of interest, physical features, to name a few.  The goal is that maintenance of the information will be done by the jurisdiction (city, department, agency) that provides the service.</p><p style='padding: 0px; color: rgb(0, 0, 0); font-family: verdana, arial, sans-serif; line-height: 20.2222px; background-color: rgb(255, 255, 255);'>A standard set of information about each location will be maintained and accessed by agencies and the public through all of the applications and maps that the County develops.</p>"
                        documentation: null
                        extent: (2) [Array(2), Array(2)]
                        groupDesignations: null
                        guid: null
                        id: "6f6c4677365b4418bd585db2ef8e201f"
                        industries: []
                        item: "http://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/LMS_Data_Public_2014/MapServer"
                        itemType: "url"
                        languages: []
                        largeThumbnail: null
                        lastModified: -1
                        licenseInfo: "The data herein is for informational purposes, and may not have been prepared for or be suitable for legal, engineering, or surveying intents. The County of Los Angeles reserves the right to change, restrict or discontinue access at any time. All users of the maps and data presented on http://lacounty.maps.arcgis.com or deriving from any LA County REST URLs, agree to the following Terms of Use as outlined on the LA County GIS Data Portal (http://egis3.lacounty.gov/dataportal/about/termsofuse/termsofuse-agol/)."
                        listed: false
                        modified: 1526394310000
                        name: null
                        numComments: 0
                        numRatings: 0
                        numViews: 4700
                        orgId: "RmCCgQtiZLDCtblq"
                        owner: "lacounty_isd"
                        properties: null
                        proxyFilter: null
                        scoreCompleteness: 78
                        screenshots: []
                        size: 99
                        snippet: "Points of Interest from Location Management System"
                        spatialReference: "102100"
                        tags: (3) ["Location Management System", "LMS", "Points of Interest"]
                        thumbnail: "thumbnail/LMS.png"
                        title: "LMS"
                        type: "Map Service"
                        typeKeywords: (6) ["ArcGIS Server", "Data", "Dynamic", "Map Service", "Multilayer", "Service"]
                        uploaded: 1456961402000
                        url: "http://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/LMS_Data_Public_2014/MapServer"




                        error:
                                code: 400
                                details: []
                                message: "Item does not exist or is inaccessible."
                                messageCode: "CONT_0001"

                */


                            if (meta_info.error) {

                                        input_current[v].numViews = -1
                                        input_current[v].type = 'unknown'
                                        input_current[v].extent = 'undefined'


                            } else {


                                        input_current[v].numViews = meta_info.numViews

                                        input_current[v].type = meta_info.type
                                        input_current[v].extent = meta_info.extent


                            }//if
                            



                            postMessage({
                              operation: 'viewCountProgress_result', 
                              showViewsCountButton: true,
                              currentProgressValue: v
                            });

                            

                            // large data, when get first 100 views, temp display 
                            if ((v > short_list_count) && (show_views_shortlisted)) {

                                              show_views_shortlisted = false

                                              //--- sort by view count  --- 
                                              //......Must have {numViews:587,......}, without count:xxx, or count is different name, must update compare function. 
                                              input_current.sort(compare);
                                              

                                             


                                              postMessage({
                                                operation: 'browse_result', 
                                                is_whole_status:true,
                                               
                                                current_json: input_current
                                              
                                              });   

                                           

                            }//





                
              }// for


              postMessage({
                operation: 'viewCountProgress_result', 
                showViewsCountButton: false,
                currentProgressValue: v
              });

                  //--- sort by view count  --- 
                  //......Must have {numViews:587,......}, without count:xxx, or count is different name, must update compare function. 
                  input_current.sort(compare);
                  


                  postMessage({
                    operation: 'browse_result', 
                    is_whole_status:true,
                   
                    current_json: input_current
                  
                  });   


       
       
            
                        break;
       
       
       





              default:
                      // code block




      } // swtich


                      


                   











                





} // onmessage





     
