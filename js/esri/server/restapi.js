  
  
  
  
  
  
  // document ready short hand
  
  
  (async function($){
  
  
   
             // must be await, to get ___url_string
             await init_global_var();
   
            
   
   
   
   
   
              
                
                                   // ---- fix bug, _results[i].rest_url = http://xxx, window.location.protocol must use http, can not use https(original), mix content error.
                                        var _link_protocal = window.location.protocol;
                                        var _link_url_parameter = ___url_string;
                                        if (_link_url_parameter.includes('http://'))
                                        {

                                            // if resource url is http, force link protacal as http: 
                                            _link_protocal = 'http:'
                                        }// if
                                   // ------ end fix bug,
   
   
   
   
                                   
            var _searchAll_url =  _link_protocal + "//" + window.location.host + linkToPathname  + '/searchAll.html';
                            _searchAll_url += '?org=' +  encodeURIComponent(_organization);  // must encode each time before you use as in URL               
                            _searchAll_url += '&cross=' +  _cross;
                            _searchAll_url += '&url=' + ___url_string;
                            _searchAll_url += '&_center_lat=' + _center_lat;
                            _searchAll_url += '&_center_long=' + _center_long;
                            _searchAll_url += '&_center_zoom=17'; // 17 means pan_to_real_location  //  _center_zoom;
                            _searchAll_url += '&timeout=' + _timeout;

   
   
   
            var _searchLayer_url =  _link_protocal + "//" + window.location.host + linkToPathname  + '/searchLayer.html';
                _searchLayer_url += '?org=' +  encodeURIComponent(_organization);  // must encode each time before you use as in URL  
                _searchLayer_url += '&cross=' +  _cross;
                _searchLayer_url += '&url=' + ___url_string;
                _searchLayer_url += '&_center_lat=' + _center_lat;
                _searchLayer_url += '&_center_long=' + _center_long;
                _searchLayer_url += '&_center_zoom=17'; // 17 means pan_to_real_location  //  _center_zoom;
                _searchLayer_url += '&timeout=' + _timeout;
            
               

                
            
            var _searchMapserver_url =   _link_protocal + "//" + window.location.host + linkToPathname  + '/searchMapServer.html';
                _searchMapserver_url += '?org=' +  encodeURIComponent(_organization);  // must encode each time before you use as in URL  
                _searchMapserver_url += '&cross=' +  _cross;
                _searchMapserver_url += '&url=' + ___url_string;
                _searchMapserver_url += '&_center_lat=' + _center_lat;
                _searchMapserver_url += '&_center_long=' + _center_long;
                _searchMapserver_url += '&_center_zoom=17'; // 17 means pan_to_real_location  //  _center_zoom;
                _searchMapserver_url += '&timeout=' + _timeout;
                   
                    
             console.log('_searchAll_url  `````` ',_searchAll_url)  
             console.log('_searchLayer_url  `````` ',_searchLayer_url)   
             console.log('_searchMapserver_url  %%%%%% ',_searchMapserver_url)         
            
            
            
            $("#iframe_all").attr('src', _searchAll_url);
            $("#iframe_layers").attr('src', _searchLayer_url);
            $("#iframe_mapserver").attr('src', _searchMapserver_url);
            
            
            
            
                 
  
})(jQuery);











