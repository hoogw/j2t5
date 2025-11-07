/**
 * jQuery json-viewer
 * @author: Alexandre Bodelot <alexandre.bodelot@gmail.com>
 */




(function($){
    
   // var base_url = 'http://maps.lacity.org/arcgis/rest/services/Mapping/NavigateLA/MapServer/'


    
    /**
   *   "parentLayerId" : -1     means top level
   *   "subLayerIds"   :
                        [ 
                        "0" : 1,
                        "1" : 2,
                        "2" : 3,
                        "3" :  4
                        ]
   */
    
    
    function getNestedChildren(arr, parent) {
        
            var out = []
            for(var i in arr) {
                if(arr[i].parentLayerId == parent) {
                    
                    var subLayerIds = getNestedChildren(arr, arr[i].id)

                    if(subLayerIds.length) {
                        arr[i].subLayerIds = subLayerIds
                    }
                    out.push(arr[i])
                }
            }
            return out
    }

    
    
    
    
    
    
    

  /**
   * Check if arg is either an array with at least 1 element, or a dict with at least 1 key
   * @return boolean
   */
  function isCollapsable(arg) {
    //return arg instanceof Object && Object.keys(arg).length > 0;
    
    // if subLayerIds is NOT null, return true( collapsable ). if subLayerIds is null, return false, NOT collapsable
    return arg.subLayerIds; 
  }

  /**
   * Check if a string represents a valid url
   * @return boolean
   */
  function isUrl(string) {
     var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
     return regexp.test(string);
  }

  /**
   * Transform a json object into html representation
   * @return string
   */
  function json2html(json, _json_id, options) {
      
      
    var html = '';
    
    if (typeof json === 'string') {
      
          
          console.log(json)
          
          
          /* Escape tags */
      
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (isUrl(json))
        html += '<a href="' + json + '" class="json-string">' + json + '</a>';
      else
       // html += '<span class="json-string">"' + json + '"</span>';
       // html += '<span class="json-string">"' + json + ' ('+ _json_id + ')' +'"</span>';
    
    // https://www.html5-tutorial.net/forms/checkboxes/
        html += '<input type="checkbox" name="selected_layers" onclick="return currrent_selected();"    value="' +  _json_id  +'"> <a target="_blank" href="' + base_url + _json_id + '?layer='+ json + '" class="json-string">' + json +  ' ('+ _json_id + ')' +'</a>';
    
      }
    
    else if (typeof json === 'number') {
        
      // hide xxx:5  
      // html += '<span class="json-literal">' + json + '</span>';
    }
    
    else if (typeof json === 'boolean') {
      
      // hide xxx: true     
      // html += '<span class="json-literal">' + json + '</span>';
    }
    
    else if (json === null) {
      
          // hide xxx:null
          //html += '<span class="json-literal">null</span>';
    }
    
    
    
    else if (json instanceof Array) {
      if (json.length > 0) {
        // html += '[<ol class="json-array">';
         html += '<ol class="json-array">';
        
        
        for (var i = 0; i < json.length; ++i) {
          html += '<li>' // css .ordered_list_number{ size font};
          
          
          
          console.log(json[i])
          
          
          /* Add toggle button if item is collapsable */
          
         if (isCollapsable(json[i])) {
            html += '<a href class="json-toggle"></a>';
          }
          
          
          
          html += json2html(json[i], options);
          /* Add comma if item is not last */
          if (i < json.length - 1) {
           // html += ',';
          }
          html += '</li>';
        }
        //html += '</ol>]';
         html += '</ol>';
      }
      else {
       // html += '[]';
      }
    }
    
    
    else if (typeof json === 'object') {
      var key_count = Object.keys(json).length;
      if (key_count > 0) {
          
          
        //html += '{<ul class="json-dict">';
        html += '<ul class="json-dict">';
        
        
        for (var key in json) {
            
            
            
            
           //------------arcgis mapserver  only name and id ---------
           
           // only show 'name' and 'subLayerIds' 
          if (json.hasOwnProperty(key) && ((key === 'name') || (key === 'subLayerIds') && (json.subLayerIds)) )
          {
           //-------  end -----arcgis mapserver  only name and id ---------   
              
              
                      
              
                        html += '<li>' // css .ordered_list_number{ size font};
                        
                        //var keyRepr = options.withQuotes ? '<span class="json-string">"' + key + '"</span>' : key;
                        
                  
                        /* Add toggle button if item is collapsable */

                        if (isCollapsable(json[key])) {
                         // hide    subLayerIds:
                         // html += '<a href class="json-toggle">' + keyRepr + '</a>';
                        }
                        else {
                          // hide key name 
                          //html += keyRepr;
                        }



                        // html += ': ' + json2html(json[key], options);
                        html += json2html(json[key], json.id ,options);


                        /* Add comma if item is not last */
                        
                        // if (--key_count > 0)
                        //    html += ',';


                        html += '</li>';
            
            
          }// if
          
          
        }//for
        
        
        //html += '</ul>}';
        html += '</ul>';
        
      }// if
      else {
          
          
        //html += '{}';
        
        
      } // else if
    }// if
    return html;
  }

  /**
   * jQuery plugin method
   * @param json: a javascript object
   * @param options: an optional options hash
   */
  $.fn.jsonViewer = function(json, options) {
    options = options || {};

    /* jQuery chaining */
    return this.each(function() {


        //------------arcgis mapserver layers :{} ---------
      
         
          
          
        json = getNestedChildren(json.layers, -1);
       
        //----  end ----- arcgis mapserver layers :{} ---------
        //
        //
      



      /* Transform to HTML */
      var html = json2html(json, -1, options);
      if (isCollapsable(json))
        html = '<a href class="json-toggle"></a>' + html;

      /* Insert HTML in target DOM element */
      $(this).html(html);

      /* Bind click on toggle buttons */
      $(this).off('click');
      $(this).on('click', 'a.json-toggle', function() {
        var target = $(this).toggleClass('collapsed').siblings('ul.json-dict, ol.json-array');
        target.toggle();
        if (target.is(':visible')) {
          target.siblings('.json-placeholder').remove();
        }
        else {
            
            
          //var count = target.children('li').length;
          //var placeholder = count + (count > 1 ? ' items' : ' item');
          
           // DOM children 
           // without checkbox
          // var placeholder = target.children('li')[0].children[0].innerHTML
          
          // with checkbox
           var placeholder = target.children('li')[0].children[1].innerHTML
          
          
         
          target.after('<a href class="json-placeholder">' + placeholder + '</a>');
          
          
          
        }
        return false;
      });

      /* Simulate click on toggle button when placeholder is clicked */
      $(this).on('click', 'a.json-placeholder', function() {
        $(this).siblings('a.json-toggle').click();
        return false;
      });

      if (options.collapsed == true) {
        /* Trigger click to collapse all nodes */
        $(this).find('a.json-toggle').click();
      }
    });
  };
})(jQuery);
