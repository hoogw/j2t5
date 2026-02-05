
/*

 How to make iframe version ( for example /server2i/  i for iframe )

 all other js file has no change, only js file need change is this function create_click_link() 

 1. copy function create_click_link(),  paste here, rename as tree_icon_link_iframe.js

 2. replace 
 
 w i n d o  w.o p e n (_newTab_link,'_blank');

 by 

 document.getElementById("map-window-iframe").src = _newTab_link;


 3. add "only for mobile" section
   

*/








 //https://api.jquery.com/on/
function create_click_link(event, data) {
  
    



    
            console.log('click icon node event ', data)

                // must use .original.type, because re-structured json does not carry our customized field 'type'
                var selected_layer_id = data.node.original.layer_id
                var selected_path = data.node.original.absolute_path
                var selected_server_path = data.node.original.server_path
                var selected_link_type = data.node.original.link_type
                var selected_layer_name = data.node.original.layer_name
                var selected_layer_type = data.node.original.type
                // must use .original.type, because re-structured json does not carry our customized field 'type'




            // only get 1st selected node, so always use    _selected_xxxxx[0] 

            //$('#event_result').html('Selected: ' + r.join(', '));
            console.log('before verify,   layer id  : ' + selected_layer_id + "   + layer name  ->   " + selected_layer_name  + "    + link type ->   " +  selected_link_type + "    + absolute_path ->   " + selected_path + "    + server_path ->   " + selected_server_path)

           
// layer id could be 0, do not use layer id
//if ((selected_layer_id) &&    
//if ((selected_layer_name) && 
if ((selected_link_type !== "folder") && 
    (selected_path) &&
    (selected_server_path) 
  ){


     console.log('all these value MUST NOT be undefined,   layer id  : ' + selected_layer_id + "   + layer name  ->   " + selected_layer_name  + "    + link type ->   " +  selected_link_type + "    + absolute_path ->   " + selected_path + "    + server_path ->   " + selected_server_path)




     

      //  - -- - only for mobile  - -- -


          // user click one layer in map server div 
          $("#back-3-panel").show();
          $("#back-2-panel").show();

          $("#root-folder-div").hide();
          $("#map-server-div").hide();
          $("#app-div").hide();

          $("#map-window-iframe").show();

      //  - -- - end  - -- -   only for mobile  - -- -







            // token
            var realLayerName_0 
            var realLayerName 
            if (selected_layer_name.indexOf('<') > -1 ){
                    realLayerName_0 = selected_layer_name.substring(0, selected_layer_name.indexOf('<')-1)
            } else {
                realLayerName_0 = selected_layer_name
            }
            console.log(' . . . real . . . Layer . . . Name 0 0 0 . . . without html tag, but with layer id : ', realLayerName_0)


            //if (realLayerName_0.indexOf('.') > -1 ){
            if (realLayerName_0.indexOf(layerID_NAME_separator) > -1 ){
                    // with layer id number:    6. xxxx  ,   6 --> xxxx
                    //realLayerName = realLayerName_0.substring(realLayerName_0.indexOf('.') + 2, realLayerName_0.length)
                    realLayerName = realLayerName_0.substring(realLayerName_0.indexOf(layerID_NAME_separator) + layerID_NAME_separator.length, realLayerName_0.length)
            } else {
                    // without layer id number:    xxxx
                    realLayerName = realLayerName_0
            }
            console.log(' . . . final  . . .  real . . . Layer . . . Name . . . without layer id : ', realLayerName)
            


            // _center from arcgis_common, by default, is from mysql table rest_api center lat/long (manually collected value), if missing this value in mysql, 
            // will calculate it from raw_mapserver_response x, y  extend/2, not accurate some time due to extend is falsy

            var _layer_center_lat = _center._center_lat
            var _layer_center_long = _center._center_long
            var _layer_center_zoom = _center._center_zoom

            console.log(' _layer_center_lat : ', _layer_center_lat, ' _layer_center_long : ', _layer_center_long, ' _layer_center_zoom : ', _layer_center_zoom)

            current_layerEndpoint_url = selected_server_path

            switch(selected_link_type) {


                case "folder":

                            
                        // nothing to do    
                        
                break;

            
//  ======= ========   ======= ========  open new tab   ======= ========   ======= ======== 


/**/                  


//  +++++++++++++++++++++++  google feature layer   +++++++++++++++++++++++ 


                          case "google_14":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps14/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                        

                          case "google_44":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps44/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                         
                          




                          case "google_47":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps47/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          
                          

                          case "google_74":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps74/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                        




                          case "google_73":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps73/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_730":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps730/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_731":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps731/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;



                          case "google_473":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps473/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_4738":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps4738/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;


                          
                          case "google_480":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps480/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_482":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps482/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_487":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps487/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;






                          case "google_141":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps141/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                   // token
                                   if (arcgis_online_token){
                                            _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                    }
                                    console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_4":
                              // classified  
                              var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps4/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                              // token
                              if (arcgis_online_token){
                                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                        }
                        console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_430":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps430/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  // token
                                  if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                            }
                            console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_143":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps143/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  // token
                                  if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                    }
                                    console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                              case "google_140":
                                  // classified  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps140/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  // token
                                  if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                            }
                            console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                              break;
                              case "google_142":
                                // classified  
                                var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps142/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                // token
                                if (arcgis_online_token){
                                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                            }
                            console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                            break;
                          case "google_410":
                              // classified  
                              var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps410/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                              // token
                              if (arcgis_online_token){
                                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                        }
                        console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_45":
                              // graduated color by value range(polygon only, client-data)  
                              var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps45/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_46":
                              // graduated color by value range(polygon only, server-image)  
                              var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps46/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                        
                       



                          case "google_106":
                                  // subtype domain hoverable  
                                  var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps106/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_146":
                              // subtype domain classified  
                              var  _newTab_link =  url_template_googlemaps.replace('/googlemaps/default?','/googlemaps146/default?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;





                        case "google_120":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps120/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            // token
                            if (arcgis_online_token){
                                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                        }
                        console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;



                        case "google_111":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps111/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;



                        case "google_617":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps617/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_627":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps627/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_113":

                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps113/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                      
                        case "google_0":
                                var  _newTab_link =  url_template_googlemaps + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                                     
                                // token
                                if (arcgis_online_token){
                                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                                }
                                console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                     
                                document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_0c":
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;


                        case "google_11":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps11/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_11c":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps11/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_classified_multilayer":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps411/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_classified_clickable_multilayer":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps420/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                        // layer-browser need org=
                        case "google_2000":
                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2000/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_2000_1":
                          // us Protected Public Land
                          var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2000/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                          _newTab_link += '&url2=https%3A%2F%2Fgis1.usgs.gov%2Farcgis%2Frest%2Fservices%2Fpadus3%2FManager_Name%2FMapServer&layer_id2=0'
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_2000_2":
                          // us Protected Public Land
                          var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2000/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                          _newTab_link += '&url2=https%3A%2F%2Fgis1.usgs.gov%2Farcgis%2Frest%2Fservices%2Fpadus3%2FManager_Name%2FMapServer&layer_id2=0'
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;


                        // layer-browser need org=
                        case "google_2004":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2004/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        // layer-browser need org=
                        case "google_2410":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2410/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;

                       

                        // layer-browser need org=
                        case "google_2110":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2110/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                         // layer-browser need org=
                         case "google_6617":

                          // feature layer
                          var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps6617/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                      break;



                        // layer-browser need org=
                        case "google_2113":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2113/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                         // layer-browser need org=
                         case "google_2116":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps2116/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                        
                        case "google_3000":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3000/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                        case "google_3002":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3002/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                        case "google_3010":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3010/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;

                        case "google_3012":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3012/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_3020":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3020/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;

                        case "google_3022":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3022/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                        case "google_3030":

                          // feature layer
                          var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3030/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                      break;

                      case "google_3032":

                          // feature layer
                          var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps3032/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                      break;











                        case "google_717":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps717/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        case "google_727":

                          // feature layer
                          var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps727/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                      break;


                      

                         // layer-browser need org=
                         case "google_5000":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5000/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                         // layer-browser need org=
                         case "google_5002":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5002/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        // layer-browser need org=
                        case "google_5010":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5010/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                         // layer-browser need org=
                         case "google_5011":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5010/default1?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;


                        // layer-browser need org=
                        case "google_5012":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5012/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;




                         // layer-browser need org=
                         case "google_5020":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5020/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;

                         // layer-browser need org=
                         case "google_5022":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5022/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;




                         // layer-browser need org=
                         case "google_5030":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5030/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;

                         // layer-browser need org=
                         case "google_5032":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps5032/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;






                        // layer-browser need org=
                        case "google_30":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps30/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                         // layer-browser need org=
                        case "google_130":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps130/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                         // layer-browser need org=
                         case "google_31":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps31/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                         break;
                         // layer-browser need org=
                         case "google_131":
                              // feature layer
                              var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps131/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                         break;



                         // 651
                         case "google_651":
                                  // feature layer
                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps651/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_651_1":
                                  // us Protected Public Land
                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps651/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                                  _newTab_link += '&url2=https%3A%2F%2Fgis1.usgs.gov%2Farcgis%2Frest%2Fservices%2Fpadus3%2FManager_Name%2FMapServer&layer_id2=0'
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          // 652
                          case "google_652":
                                  // feature layer
                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps652/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_652_1":
                                 // us Protected Public Land
                                  var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps652/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                                  _newTab_link += '&url2=https%3A%2F%2Fgis1.usgs.gov%2Farcgis%2Frest%2Fservices%2Fpadus3%2FManager_Name%2FMapServer&layer_id2=0'
                                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                         

                        



                         // layer-browser need org=
                         case "google_7717":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps7717/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;



                        case "google_53":

                            // feature layer
                            var  _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps53/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path + '&org=' + encodeURIComponent(_organization)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                        break;





                        case "google_917":

                                        // feature layer
                                        var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps917/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                
                        break;

                        case "google_912":

                                    // feature layer
                                    var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps912/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                                    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                            
                                
                        break;



                        case "google_201":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps201/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_202":
                              // feature layer
                              var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps202/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                            break;

                        case "google_210":
                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps210/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path
                          // token
                          if (arcgis_online_token){
                            _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                    }
                    console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link) 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_220":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps220/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            // token
                            if (arcgis_online_token){
                                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                        }
                        console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_230":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps230/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_232":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps232/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_231":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps231/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                          case "google_233":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps233/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                          break;
                        case "google_10":
                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps10/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_710":
                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps710/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;

                        case "google_101":
                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps101/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;



                        case "google_110":
                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps110/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            // token
                            if (arcgis_online_token){
                                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                        }
                        console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;






                        case "google_221":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps221/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                      
                        break;


                        case "google_18":

                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps18/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        
                        break;

                        case "google_180":

                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps180/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        
                        break;

                        case "google_181":

                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps181/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        
                        break;

                        case "google_187":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps187/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                      
                      break;



                        case "google_17":

                            // feature layer
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps17/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        
                        break;


                        case "google_170":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps170/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                      
                        break;
                       

                        case "google_171":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps171/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                      
                        break;


                        case "google_270":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps270/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                      
                        break;

                        case "google_271":

                          // feature layer
                          var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps271/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                      
                        break;



                        case "google_118":
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps118/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_119":
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps119/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_218":
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps218/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;
                        case "google_219":
                            var      _newTab_link =  url_template_googlemaps.replace('googlemaps/default?','googlemaps219/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                        break;



//  +++++++++++++++++++++++ end    +++++++++++++++++++++++  google feature layer   +++++++++++++++++++++++ 




/**/
// = = = = Embed this map in your website = = = =
/**/


case "embed_6323":
      var _newTab_link =  url_for_google.replace('google.html?', 'square.html?') + '&layer_id=' + selected_layer_id + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6801":
      var _newTab_link =  url_for_google.replace('google.html?', 'square-add-geojson.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6803":
      var _newTab_link =  url_for_google.replace('google.html?', 'square-add-geojson-split-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6325":
      var _newTab_link =  url_for_google.replace('google.html?', 'circle.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6327":
    var _newTab_link =  url_for_google.replace('google.html?', 'polygon.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
  console.log('_newTab_link', _newTab_link)
break;

case "embed_6395":
case "embed_2481":  
      var _newTab_link =  url_for_google.replace('google.html?', 'basemap.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  

  case "embed_6397":
      var _newTab_link =  url_for_google.replace('google.html?', 'basemap-nearmap.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_5522":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-marker/hover-click.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_5525":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-marker/diamond-point.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

 






  case "embed_5310":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-max-load/1x-max.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_5316":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-max-load/progressive-max.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_5319":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-max-load/progressive-limited.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;






  case "embed_3523":
    var _newTab_link =  url_for_google.replace('google.html?', 'centroid-label.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
  console.log('_newTab_link', _newTab_link)
break;



  case "embed_6887":
    var _newTab_link =  url_for_google.replace('google.html?', 'geojson.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
  console.log('_newTab_link', _newTab_link)
break;



case "embed_7453":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/entire-new-marker.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_7456":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/entire-new-marker-no-limit.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_7454":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/entire.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_7461":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/entire-diamond-point.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


   case "embed_7458":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/entire-no-limit.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_7455":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/entire-split-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  case "embed_6216":
    var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/core-16x.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
  console.log('_newTab_link', _newTab_link)
break;



  case "embed_6204":
    var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/core-4x.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
  console.log('_newTab_link', _newTab_link)
break;



case "embed_7176":
  var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/label.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
  document.getElementById("map-window-iframe").src = _newTab_link;
console.log('_newTab_link', _newTab_link)
break;

case "embed_5296":
  var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/core-1x-marker.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
  document.getElementById("map-window-iframe").src = _newTab_link;
console.log('_newTab_link', _newTab_link)
break;

case "embed_5295":
  var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/core-1x-diamond-point.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
  document.getElementById("map-window-iframe").src = _newTab_link;
console.log('_newTab_link', _newTab_link)
break;

  case "embed_6206":
      var _newTab_link =  url_for_google.replace('google/google.html?', 'google-efficient-engine/core.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;





case "embed_6392":
      var _newTab_link =  url_for_google.replace('google.html?', 'hover.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

case "mobile_6392":
      var _newTab_link =  url_for_google.replace('google.html?', 'hover.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6391":
      var _newTab_link =  url_for_google.replace('google.html?', 'streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  

  case "embed_7967":
    case "embed_2485":
      var _newTab_link =  url_for_google.replace('google.html?', 'unselect.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_7791":
      var _newTab_link =  url_for_google.replace('google.html?', 'mapimagelayer.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_31720":
      var _newTab_link = 'https://demo.support.here.com/examples/v3/pde_speed_limits_in_view'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_31722":
      var _newTab_link = 'https://demo.support.here.com/examples/v3/pde_speed_limits_along_route'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_31724":
      var _newTab_link = 'https://demo.support.here.com/examples/v3/link_speed_locator'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

 

  // google map + here geocode 
   case "embed_6782":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/here-download-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  // google map + here geocode 
   case "embed_6780":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/here-show-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  // google map + apple geocode 
   case "embed_8130":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/apple-show-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  


  case "embed_6793":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/download-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   case "embed_6795":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/download-address-street-view.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6790":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/show-address.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6794":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/show-address-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


    case "embed_6791":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/show-address-photo-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;





  case "embed_6797":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/lat-lng-street-view.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6792":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-click-map-to-get/lat-lng.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  


  case "embed_31728":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/speed_limit.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_31727":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'basemap_click_map_to_get.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_31729":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'click_map_to_get.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  case "embed_3325":
    var _newTab_link =  url_for_microsoft.replace('/microsoft/basemap.html?', '/microsoft-click-map-to-get/download-address.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

case "embed_3326":
    var _newTab_link =  url_for_microsoft.replace('/microsoft/basemap.html?', '/microsoft-click-map-to-get/show-address.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  

  case "embed_31725":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'feature-layer.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  
  case "embed_7452":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'feature-layer-entire.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  

  case "embed_3385":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'feature-layer-core-1x.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3384":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'feature-layer-core-4x.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3316":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'feature-layer-core-16x.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6883":
      var _newTab_link = 'https://geojson.io'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6885":
      var _newTab_link = 'https://transparentgov.net/json2tree/datahub.io/embed/upload_geojson_as_featurelayer.html?clickorhover=click&overlayOpacity=7'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6888":
    var _newTab_link = 'https://transparentgov.net:3200/googlemaps93/upload'
    document.getElementById("map-window-iframe").src = _newTab_link;
  console.log('_newTab_link', _newTab_link)
break;
  

  case "embed_8231":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/search-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8251":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/search-keyword-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8233":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/search-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;


  case "embed_8253":
      var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/search-category-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8341":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/fromToPOI.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;









  case "embed_8301":// policedepartments
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=policedepartments'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8302":// jailsandprisons
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=jailsandprisons'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8303":// courthouses
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=courthouses'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8304":// hospitals
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=hospitals'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8305":// medcenters
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=medcenters'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8306":// emergencyrooms
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=emergencyrooms'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8307":// urgent_care
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=urgent_care'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8321":// hostels
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=hostels'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8322":// resorts
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=resorts'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_8323":// vacation_rentals
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=vacation_rentals'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  
  case "embed_5348":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/category-list.html')
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  case "embed_8348":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8358":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-marker-label-category-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8342":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


   case "embed_8352":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/pan-zoom-keyword-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  

  case "embed_8345":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/draw-diamond-point-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8343":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/yelp/draw-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_3832":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_3842":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-keyword-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_3852":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-keyword-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_3862":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-keyword-streetview-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  
  case "embed_3903": // jail
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poi=jail'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  

   case "embed_3820":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/draw-auto.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   case "embed_3816":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/draw-x16.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   case "embed_3834":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/draw-x4.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3835":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/draw-diamond-point-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3126":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/draw-diamond-point-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;











  case "embed_3827":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3837":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category-label.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_3847":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3857":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3887":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category-streetview-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;






  case "embed_3901": // police
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=police'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3902": // courthouse
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=courthouse'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3904": // motel
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=motel'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3905": // hotel
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=hotel'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3906": // inn
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=inn'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3907": // hospital
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=hospital'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3908": // bar
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=bar'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3909": // bar_and_grill
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=bar_and_grill'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_3910": // night_club
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/pan-zoom-marker-label-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    _newTab_link += '&poicategory=night_club'
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;










  case "embed_3817":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3867":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-category-label.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_3897":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-category-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   case "embed_3877":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-category-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3875":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-category-streetview-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3829":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3869":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-keyword-label.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

    case "embed_3849":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-keyword-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3859":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-keyword-streetview.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3839":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/search-keyword-streetview-photo.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


 case "embed_4347":
    var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-poi/category-list.html')
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8520":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/draw-auto.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8516":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/draw-16x.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8504":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/draw-4x.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


 
  
  case "embed_4348":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/category-list.html')
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  
  case "embed_8526":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/search-4x-nearby-everything.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_8527":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/draw-1x.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8523":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/search-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8533":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/search-keyword-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_8513":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/search-nearby-everything.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_7510":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-nearby-everything.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;




  case "embed_7322": // police
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=police" // police
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9154": // Prison Jail Correction
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=jail" // Prison Jail Correction
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9363": // Courthouse
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=courthouse" // Courthouse
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  
  case "embed_7321": // Hospital
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=hospital" // Hospital
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9956": // Emergency Room
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=emergency room" // Emergency Room
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7391": // Emergency Medical Service
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=emergency medical service" // Emergency Medical Service
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  case "embed_7314": // motel
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=motel" // motel
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9379": // Nightlife
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    _newTab_link += "&poicategory=nightlife" // Nightlife
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;




  case "embed_8522":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-keyword-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_6533":
    var _newTab_link =  url_for_microsoft.replace('microsoft/basemap.html?', 'microsoft-poi/pan-zoom-category-googlebasemap.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  

  case "embed_8533":
    var _newTab_link =  url_for_microsoft.replace('basemap.html?', 'category.html?') + '&layer_id=' + selected_layer_id +  '&url=' + selected_server_path   
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;





  case "embed_5381":
  case "embed_2484":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_unselect.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  

case "embed_9391":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9006":
  case "embed_2486":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_download.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9007":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_legend.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_9362":
    var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_htmlpopup.html?') + '&backgroundlayerurl=' + selected_path  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;
  case "embed_9361":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_attachments.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_9341":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_filterBy.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_9370":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'featurelayer_label_color.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



  case "embed_2739":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'poi-pan-zoom.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6123":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-hover/hover-feature-nearmap.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6122":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-hover/hover-feature.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   case "embed_7350":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-hover/hover-legend.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6910":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-hover/hover-url.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6912":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-hover/hover-attachment.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


   case "embed_6121":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-click/click-feature.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   case "embed_7351":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-click/click-card-legend.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6911":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-click/click-url.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6913":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-click/click-attachment.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  


  case "embed_4687":
      var _newTab_link =  url_for_esri_gateway.replace('feature-layer/test.html?', 'feature-filter/featurelayer_filterBy.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_5126":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'click-address.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

 
 

  case "embed_5187":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'click-map-to-get.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  


case "embed_5328":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'test-geocode-suggest.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


case "embed_5327":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'test-naserver-route.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_5326":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'test-naserver-route-multi-stops.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  


  case "embed_2737":
      var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'poi-draw-circle.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;




  case "embed_9398":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'multilayerMultiSelect.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  





  case "embed_9393":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'multilayerSingleSelect.html?') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_9383":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'multilayerSingleSelect_colorTexture.html?') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_9397":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'multilayerMultiSelect.html?') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_9387":
    var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'multilayerMultiSelect_overlapIdentify.html?') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;




  case "embed_9395":
      var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'multilayerSingleSelect.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  



  case "embed_3391":
      var _newTab_link =  url_template_base_esri_featurelayer.replace('featurelayer/featurelayer.html?', 'mapimagelayer/click_mapimage.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3370":
      var _newTab_link =  url_template_base_esri_featurelayer.replace('featurelayer/featurelayer.html?', 'mapimagelayer/label_color_mapimage.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3341":
      var _newTab_link =  url_template_base_esri_featurelayer.replace('featurelayer/featurelayer.html?', 'mapimagelayer/mapimage_filterBy.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3347":
      var _newTab_link =  url_template_base_esri_featurelayer.replace('featurelayer/featurelayer.html?', 'mapimagelayer/mapimage_filterBy_label.html?') + '&backgroundlayerurl=' + selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;












  case "embed_3957":
    var _newTab_link = url_esri_map_viewer + 'url=' + selected_path  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_3955":
    var _newTab_link = url_esri_map_viewer_classic + 'url=' + selected_path  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


case "embed_3953":
    var _newTab_link = current_singleServerEndpoint_url + '?f=jsapi' 
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;







  case "embed_6421":
      var _newTab_link = selected_path  
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  
  case "embed_6422":
      var _newTab_link = selected_path + '?f=pjson'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6423":
      var _newTab_link = selected_path + '/query'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6423":
      var _newTab_link = selected_path + '/queryAttachments'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;


  case "embed_6425":
      var _newTab_link = current_singleServerEndpoint_url  
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6426":
      var _newTab_link = current_singleServerEndpoint_url + '?f=pjson'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;




  case "embed_6427":
      var _newTab_link = current_rootEndpoint_url  
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

  case "embed_6428":
      var _newTab_link = current_rootEndpoint_url  + '?f=pjson'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;






  case "embed_8967":
    var _newTab_link = current_singleServerEndpoint_url + '/kml/mapImage.kmz'  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_8966":
    var _newTab_link = current_singleServerEndpoint_url + '?f=lyr'  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


  case "embed_8963":
    var _newTab_link = current_singleServerEndpoint_url + '?f=pitemx'  
    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;


/**/
// --- end  ---  = = = = Embed this map in your website = = = =
/**/


/**/


// ^^^^^^^^^^^^^^^^^^^^^  apple  feature layer    ^^^^^^^^^^^^^^^^^^^^^

  case "apple_a120":
      var _newTab_link =  url_template_base_applemaps.replace('applemaps/default?', 'applemaps120/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "apple_a20":
      var _newTab_link =  url_template_base_applemaps.replace('applemaps/default?', 'applemaps20/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "apple_a20p":
      var _newTab_link =  url_template_base_applemaps.replace('applemaps/default?', 'applemaps20/default2?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "apple_a0":
      var _newTab_link =  url_template_base_applemaps + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "apple_a0p":
      var _newTab_link =  url_template_base_applemaps.replace('applemaps/default?', 'applemaps/default2?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;






  case "embed_7660":
      var _newTab_link =  apple_base_url.replace('default.html?', 'hover-look-around.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7662":
      var _newTab_link =  apple_base_url.replace('default.html?', 'click-look-around.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7760":
      var _newTab_link =  apple_base_url.replace('default.html?', 'hover.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "mobile_7760":
      var _newTab_link =  apple_base_url.replace('default.html?', 'hover.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7762":
      var _newTab_link =  apple_base_url.replace('default.html?', 'hover-point-fix-size.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7761":
      var _newTab_link =  apple_base_url.replace('default.html?', 'hover-color.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7770":
      var _newTab_link =  apple_base_url.replace('default.html?', 'click.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_7750":
      var _newTab_link =  apple_base_url.replace('default.html?', 'click-map-latlng.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;



   // apple poi

   // apple poi keyword, use map server api
   case "embed_4012":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  // apple poi keyword, use mapkit class
   case "embed_4013":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-keyword-mapkit.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

   

  
   case "embed_4042":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      _newTab_link += '&poi=police'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_4044":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      _newTab_link += '&poi=hospital'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_4046":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      _newTab_link += '&poi=hotel'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_4048":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-keyword.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      _newTab_link += '&poi=nightlife'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  // - -  end  - -   apple poi keyword


  // apple poi category
  case "embed_4015":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_4016":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-look-around.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_4011":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-mapkit.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  case "embed_4014":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-mapkit-x4.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path   
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

  
  


   case "embed_4021":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-x4.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      _newTab_link += '&poicategory=police'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_4023":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-x4.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      _newTab_link += '&poicategory=hospital'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_4025":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-x4.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      _newTab_link += '&poicategory=hotel'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;
  case "embed_4027":
      var _newTab_link =  apple_base_url.replace('apple/default.html?', 'apple-poi/pan-zoom-category-x4.html?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
      _newTab_link += '&poicategory=nightlife'
      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
  break;

 //  - -  end  - -  apple poi category


//   ^^^^^^^^^^^^^^^^^^^^^   end   ^^^^^^^^^^^^^^^^^^^^^  bing  feature layer     ^^^^^^^^^^^^^^^^^^^^^
/**/


// ^^^^^^^^^^^^^^^^^^^^^  bing  feature layer    ^^^^^^^^^^^^^^^^^^^^^


                  case "bing_b10":
                      var _newTab_link =  url_template_base_bingmaps.replace('bingmaps/default?', 'bingmaps10/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "bing_b10c":
                      var _newTab_link =  url_template_base_bingmaps.replace('bingmaps/default?', 'bingmaps10/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "bing_b0":
                      var _newTab_link =  url_template_base_bingmaps + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "bing_b0c":
                      var _newTab_link =  url_template_base_bingmaps.replace('bingmaps/default?', 'bingmaps/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "bing_b20":
                      var _newTab_link =  url_template_base_bingmaps.replace('bingmaps/default?', 'bingmaps20/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "bing_b110":
                      var _newTab_link =  url_template_base_bingmaps.replace('bingmaps/default?', 'bingmaps110/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "bing_b120":
                      var _newTab_link =  url_template_base_bingmaps.replace('bingmaps/default?', 'bingmaps120/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                 

              


//   ^^^^^^^^^^^^^^^^^^^^^   end   ^^^^^^^^^^^^^^^^^^^^^  bing  feature layer     ^^^^^^^^^^^^^^^^^^^^^
/**/



// ^^^^^^^^^^^^^^^^^^^^^  here  feature layer    ^^^^^^^^^^^^^^^^^^^^^
                  case "here_h10":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps10/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h10c":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps10/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h0":
                      var _newTab_link =  url_template_base_heremaps + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h0c":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h20":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps20/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h20c":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps20/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h110":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps110/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
                  case "here_h120":
                      var _newTab_link =  url_template_base_heremaps.replace('heremaps/default?', 'heremaps120/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                  break;
              


//   ^^^^^^^^^^^^^^^^^^^^^   end   ^^^^^^^^^^^^^^^^^^^^^  bing  feature layer     ^^^^^^^^^^^^^^^^^^^^^


/**/


// %%%%%%%%%%%%%%%%%%%  mapbox  feature layer %%%%%%%%%%%%%%%%%%% 


                case "mapbox_m10":
                    var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox10/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)                                                                                      
                break;
                case "mapbox_m10c":
                    var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox10/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                break;
                case "mapbox_m0":
                    var _newTab_link =  url_template_base_mapbox + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)                                                                                      
                break;
                case "mapbox_m0c":
                    var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                    document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                break;
                case "mapbox_m20":
                  var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox20/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)                                                                                      
                break;
                case "mapbox_m20c":
                  var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox20/default_card?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                break;
                case "mapbox_m110":
                  var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox110/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)                                                                                      
                break;
                case "mapbox_m120":
                  var _newTab_link =  url_template_base_mapbox.replace('mapbox/default?', 'mapbox120/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)                                                                                      
                break;



//  %%%%%%%%%%%%%%%%%%%    end  %%%%%%%%%%%%%%%%%%%   mapbox  feature layer   %%%%%%%%%%%%%%%%%%% 



/**/


//  ==============================  esri  feature layer  ==============================  
                                   
/**/


             // search

             case "esri_55011":
              var _newTab_link =  url_template_base_esri_usgs + '/explore.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_550119":
              var _newTab_link =  url_template_base_esri_usgs + '/explore_nearmap.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             


             case "esri_55013":
              var _newTab_link =  url_template_base_esri_usgs + '/color_image.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             case "esri_55014":
              var _newTab_link =  url_template_base_esri_usgs + '/label_image.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;




             case "esri_55015":
              var _newTab_link =  url_template_base_esri_usgs + '/where_is_what_image.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

          

             case "esri_55010":
              var _newTab_link =  url_template_base_esri_usgs + '/search_widget.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             case "esri_550101":
              var _newTab_link =  url_template_base_esri_usgs + '/search_byField.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             case "esri_550102":
              var _newTab_link =  url_template_base_esri_usgs + '/search_byField_suggestion.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             // classify unique value
             case "esri_52041":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_data.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_52041099":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_data_lefthand.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             // classify unique value
             case "esri_520417":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_data_label.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_520417099":
                var _newTab_link =  url_template_base_esri_usgs + '/classify_data_label_lefthand.html?backgroundlayerurl=' +   selected_path 
                // token
                if (arcgis_online_token){
                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                }
                console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                    
                document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
               break;

             // classify unique value
             case "esri_520413":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_data_filterValueList.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_520413099":
                var _newTab_link =  url_template_base_esri_usgs + '/classify_data_filterValueList_lefthand.html?backgroundlayerurl=' +   selected_path 
                // token
                if (arcgis_online_token){
                    _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                }
                console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                    
                document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
               break;



             // classify unique value
             case "esri_520422":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_image.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_520422099":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_image_lefthand.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             // classify unique value
             case "esri_520427":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_image_label.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_520427099":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_image_label_lefthand.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;



             // classify unique value
             case "esri_520423":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_image_filterValueList.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;

             case "esri_520423099":
              var _newTab_link =  url_template_base_esri_usgs + '/classify_image_filterValueList_lefthand.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             // classify quantity graduated color
             case "esri_52045":
                  var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/quantity_data.html?') +  '&backgroundlayerurl=' + selected_path 
                  // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;

              case "esri_52045099":
                var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/quantity_data_lefthand.html?') +  '&backgroundlayerurl=' + selected_path 
                // token
            if (arcgis_online_token){
                _newTab_link += '&arcgis_online_token=' + arcgis_online_token
            }
            console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
            document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
            break;
            
             // classify quantity graduated color
             case "esri_52046":
              var _newTab_link =  url_template_base_esri_usgs + '/quantity_image.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;


             case "esri_52046099":
              var _newTab_link =  url_template_base_esri_usgs + '/quantity_image_lefthand.html?backgroundlayerurl=' +   selected_path 
              // token
              if (arcgis_online_token){
                  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
              }
              console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                  
              document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;



             // Travel Route Time Distance
             case "esri_225":
                      var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature225.html?') +  '&backgroundlayerurl=' + selected_path 
                      // token
                      if (arcgis_online_token){
                          _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                      }
                      console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                          
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;
             case "esri_115":
                      var _newTab_link =  url_template_base_esri_usgs + '/explore115.html?backgroundlayerurl=' +   selected_path 
                      // token
                      if (arcgis_online_token){
                          _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                      }
                      console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                          
                      document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
             break;



              // By County Zip Address
              case "esri_500301":
                  var _newTab_link =  url_template_base_esri_hrsa + '/bycounty.html?backgroundlayerurl=' +   selected_path 
                  // token
                  if (arcgis_online_token){
                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                  }
                  console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                      
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;
              case "esri_500304":
                  var _newTab_link =  url_template_base_esri_hrsa + '/bycountyzip.html?backgroundlayerurl=' +   selected_path 
                  // token
                  if (arcgis_online_token){
                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                  }
                  console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                      
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;
              case "esri_500305":
                  var _newTab_link =  url_template_base_esri_hrsa + '/bycity.html?backgroundlayerurl=' +   selected_path 
                  // token
                  if (arcgis_online_token){
                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                  }
                  console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                      
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;
              case "esri_500306":
                  var _newTab_link =  url_template_base_esri_hrsa + '/bycongressdistrict.html?backgroundlayerurl=' +   selected_path 
                  // token
                  if (arcgis_online_token){
                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                  }
                  console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                      
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;
              case "esri_500302":
                  var _newTab_link =  url_template_base_esri_hrsa + '/byzipcode.html?backgroundlayerurl=' +   selected_path 
                  // token
                  if (arcgis_online_token){
                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                  }
                  console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                      
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;
              case "esri_500303":
                  var _newTab_link =  url_template_base_esri_hrsa + '/byaddress.html?backgroundlayerurl=' +   selected_path 
                  // token
                  if (arcgis_online_token){
                      _newTab_link += '&arcgis_online_token=' + arcgis_online_token
                  }
                  console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                      
                  document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
              break;




      // esri single layer , must use selected_path,   not      selected_server_path 

      case "esri_51025":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/where_is_what_data.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
               _newTab_link += '&arcgis_online_token=' + arcgis_online_token
          }
          console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                 
          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;

      case "esri_51020":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/color_feature.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
               _newTab_link += '&arcgis_online_token=' + arcgis_online_token
          }
          console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                 
          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;

      case "esri_51020099":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/color_feature_lefthand.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
               _newTab_link += '&arcgis_online_token=' + arcgis_online_token
          }
          console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                 
          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;


      case "esri_51021":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/label_feature.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
         }
         console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
         document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;

      case "esri_51021099":
        var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/label_feature_lefthand.html?') +  '&backgroundlayerurl=' + selected_path 
        // token
        if (arcgis_online_token){
            _newTab_link += '&arcgis_online_token=' + arcgis_online_token
       }
       console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                              
       document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
    break;

      case "esri_51022":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
         }
         console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
         document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;


      case "esri_51022099":
        var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature_lefthand.html?') +  '&backgroundlayerurl=' + selected_path 
        // token
        if (arcgis_online_token){
            _newTab_link += '&arcgis_online_token=' + arcgis_online_token
       }
       console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                              
       document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
    break;

      case "esri_510229":
        var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_feature_nearmap.html?') +  '&backgroundlayerurl=' + selected_path 
        // token
        if (arcgis_online_token){
            _newTab_link += '&arcgis_online_token=' + arcgis_online_token
       }
       console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                              
       document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
    break;

      case "esri_51023":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
         }
         console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
         document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;

      case "esri_51023099":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature_lefthand.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
         }
         console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
         document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;

      case "esri_510235":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature_htmlpopup.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
         }
         console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
         document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;

      case "esri_510236":
          var _newTab_link =  url_template_base_esri_featurelayer.replace('/featurelayer.html?', '/click_hover_feature_attachments.html?') +  '&backgroundlayerurl=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
         }
         console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                                
         document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
      break;


   


    case "esri_51099":

        var _newTab_link =  url_template_base_esri2  +   '&url=' + selected_path 
          // token
          if (arcgis_online_token){
              _newTab_link += '&arcgis_online_token=' + arcgis_online_token
          }
          console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                              
          document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                
    break;


    
// esri multilayer , must use selected_server_path,  not selected_path     





case "esri_3120":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root_multi') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "esri_3020":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_root') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "esri_2120":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root_multi') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "esri_2020":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_root') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;



case "esri_3100":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer_multi') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "esri_3000":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'mapimagelayer_sublayer') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "esri_2100":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer_multi') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;



case "esri_2000":
var _newTab_link =  url_template_base_esri_js4_tree.replace('featurelayer_sublayer', 'featurelayer_sublayer') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path   
// only for esri_19xx esri_2000 multilayer
_newTab_link += '&selectedItemIdArray=' + selected_layer_id
// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;



// token
if (arcgis_online_token){
  _newTab_link += '&arcgis_online_token=' + arcgis_online_token
}
console.log(' . . . . .  open  . . . . .  link   . . . . .  ',  _newTab_link)
                      
document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;







//  ==============================    end    ==============================    esri  feature layer      ==============================






// ################################  table   feature layer   ################################  


                                    

                                    case "table_7195":
                                        var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'esri_featureTable_hover_click.html?') + '&backgroundlayerurl=' + selected_path  
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;
                                    case "table_7196":
                                        var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'esri_featureTable_hover_click_selection_enabled.html?') + '&backgroundlayerurl=' + selected_path  
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;
                                    case "table_7201":
                                        var _newTab_link =  url_template_base_embed.replace('featurelayer.html?', 'esri_featureTable_multi_select_unselect.html?') + '&backgroundlayerurl=' + selected_path  
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;





                                    case "table_classified":
                                        var _newTab_link =  url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable4/default?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_403":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featureTable_classified.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_404":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featureTable_classified_fullvaluelist.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_405":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featuretable_classified_valuePaging.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_406":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featuretable_classified_searchvaluelist.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;


                                    case "table_413":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featureTable_classified_vertical.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_414":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featureTable_classified_fullvaluelist_vertical.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_415":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featuretable_classified_valuePaging_vertical.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_416":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featuretable_classified_searchvaluelist_vertical.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;


                                    case "table_423":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featureTable_classified_google.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_424":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featureTable_classified_fullvaluelist_google.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_425":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featuretable_classified_valuePaging_google.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_426":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?','featuretable_classified_searchvaluelist_google.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                   



                                    case "table_90931":

                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?', 'featureTable_card.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path  

                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                                
                                    break;
                                    case "table_90932":

                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?', 'featureTable_vertical.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path  

                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                                
                                    break;

                                   


                                    case "table_90880":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?', 'featureTable_google.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_90881":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?', 'featureTable_google_streetview.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_84840":
                                        var _newTab_link =  url_template_arcgis_feature_table_json2tree.replace('featureTable.html?', 'featureTable_google_classified.html?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 
                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                    break;

                                    case "table_searchable":

                                        var _newTab_link =  url_template_arcgis_feature_table_2.replace('featuretable/default?','featuretable/default?cross=default') + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 

                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                                
                                    break;






                                    case "table_90701":

                                        var _newTab_link =  url_template_arcgis_feature_table + '&layer_id=' + selected_layer_id +    '&url=' + selected_server_path 

                                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                                
                                    break;


//   ################################    end   ################################   table   feature layer   ################################  









// ..................  google raster layer   ..................  







                
                    case "google_raster_single_layer":

                        // raster layer
                        var     _newTab_link =  url_template_base_googlemaps_rasterLayer.replace('googlemaps912/default?','googlemaps917/default?') + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
                                                                                                
                    break;




                    case "google_raster_multi_layer":
                                                                                            
                        // raster layer 
                        var _newTab_link =  url_template_base_googlemaps_rasterLayer + '&layer_id=' + selected_layer_id  + '&url=' + selected_server_path 
                        document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

                    break;



                  



// ..................  end   ..................   google raster layer   ..................  




//  ======= ========   ======= ========  VectorTileServer   ======= ========   ======= ======== 

//  ..... mapbox .....

case "vectortile_mapbox":

var _newTab_link =  url_template_base_mapbox_vector_tile_layer +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
    
break;


case "vectortile_mapbox13":

var _newTab_link =  url_template_base_mapbox_vector_tile_layer.replace('default?','default2?') +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
    
break;


//  ..... esri .....

// cmv v3.x icon
case "vectortile_esri_v3_e230":

var _newTab_link =  url_template_base_esri_vector_tile  +   '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;


case "vectortile_esri_v4_e231":

var _newTab_link =  url_template_base_esri_vector_tile_layer +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;


case "vectortile_esri_v4_e232":

var _newTab_link =  url_template_base_esri_vector_tile_layer.replace('vectortile.html','vectortile2.html') +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;



//  ..... openlayers .....

case "vectortile_openlayers":

var _newTab_link =  url_template_base_openlayers_vector_tile_layer +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;


case "vectortile_openlayers2":

var _newTab_link =  url_template_base_openlayers_vector_tile_layer.replace('arcgisvector.html?','arcgisvector2.html?') +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;


//  ..... leaflet .....



case "vectortile_leaflet":

var _newTab_link =  url_template_base_leaflet_vector_tile_layer +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;


case "vectortile_leaflet2":

var _newTab_link =  url_template_base_leaflet_vector_tile_layer.replace('arcgisvector.html?','arcgisvector2.html?') +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
        
break;



//  ======= ========   ======= ========  ImageServer   ======= ========   ======= ======== 

// google maps for imageServer
case "google_910":

var _newTab_link =  url_template_base_googlemaps_imageServer +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;



case "google_911":

var _newTab_link =  url_template_base_googlemaps_imageServer.replace('googlemaps910/default?', 'googlemaps911/default?') +  '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;




case "image_esri_e101":

var _newTab_link =  url_template_base_esri_imagery_layer +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


case "image_esri_e102":

var _newTab_link =  url_template_base_esri_imagery_layer.replace('imagerylayer.html','imagerylayer2.html') +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


case "image_esri_e103":

var _newTab_link =  url_template_base_esri_imagery_layer.replace('imagerylayer.html','imagerylayer3.html') +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


// cmv v3.x icon
case "image_esri_e100":

var _newTab_link =  url_template_base_esri3  +   '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


//  ++++++ ++++++ +++++++  GeocodeServer   ++++++ ++++++ +++++++ 

// layer-browser need org=



// esri based



case "geocodeServer_2631":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2632":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-advanced-number-search.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2633":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-advanced-poi-search.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2625":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-advanced-poi-yellow.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2613":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-advanced-poi-only.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2641":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-parcel-pink.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2653":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-street-address-in-red.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2655":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-poi-in-yellow.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2657":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-poi-yellow-street-addr-red.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2640":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-motorola.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_2610":
var _newTab_link =  url_for_esri_gateway.replace('/feature-layer/test.html?', '/feature-geocode/geocode-suggest-real-addr.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;



// google based

case "geocodeServer_1633":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-advanced-poi-search.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1625":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-advanced-poi-yellow.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1613":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-advanced-poi-only.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1641":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-parcel-pink.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1632":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-advanced-number-search.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1631":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1640":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-motorola.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1610":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-real-addr.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "geocodeServer_1652":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/usps-validate-street-address-in-red.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1653":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-street-address-in-red.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


case "geocodeServer_1655":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-poi-in-yellow.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;

case "geocodeServer_1657":
var _newTab_link =  url_for_google.replace('/google/google.html?', '/google-geocode/suggest-poi-yellow-street-addr-red.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


// g26
case "geocodeServer_searchable_googlemaps":

var _newTab_link =  url_template_base_googlemaps_geocodeServer +    '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url2=' + selected_path + '&org=' + encodeURIComponent(_organization)

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;

// g27
case "geocodeServer_imagepriority_googlemaps":

var _newTab_link =  url_template_base_googlemaps_geocodeServer.replace('/googlemaps26/default?','/googlemaps27/default?')  +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url2=' + selected_path + '&org=' + encodeURIComponent(_organization)

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


case "geocodeServer_esriOfficial":

var _newTab_link = selected_path + '/findAddressCandidates'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
  break;

// g28
case "geocodeServer_reverse_googlemaps":

var _newTab_link =  url_template_base_googlemaps_geocodeServer.replace('/googlemaps26/default?','/googlemaps28/default?')  +  '&center_lat='+  _layer_center_lat + '&center_long='+  _layer_center_long + '&center_zoom=' + _layer_center_zoom + '&url2=' + selected_path + '&org=' + encodeURIComponent(_organization)

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


case "geocodeServer_reverse_esriOfficial":

var _newTab_link = selected_path + '/reverseGeocode'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
break;


case "geocodeServer_suggest_esriOfficial":

var _newTab_link = selected_path + '/suggest'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
break;


case "geocodeServer_geocodeAddresses_esriOfficial":

var _newTab_link = selected_path + '/geocodeAddresses'
      document.getElementById("map-window-iframe").src = _newTab_link;
      console.log('_newTab_link', _newTab_link)
break;





case "NAserver_6319":
var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'naserver-route.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;
case "NAserver_6318":
var _newTab_link =  url_for_esri_gateway.replace('test.html?', 'naserver-route-multi-stops.html?') + '&backgroundlayerurl=' + selected_path  
     document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)
break;


//  ======= ========   ======= ========  SceneServer   ======= ========   ======= ======== 




case "scene_esri_v4_e140":

var _newTab_link =  url_template_base_esri_scene_layer +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;


case "scene_esri_v4_e141":

var _newTab_link =  url_template_base_esri_scene_layer.replace('scenelayer.html','scenelayer2.html')   +  + '&url=' + selected_path 

document.getElementById("map-window-iframe").src = _newTab_link;
    console.log('_newTab_link', _newTab_link)

break;










                default:
                    
            }// switch
        


          } else {

            console.log("you click a model folder, not a actual model, so nothing to do here ")
                   }//if
        
        }
