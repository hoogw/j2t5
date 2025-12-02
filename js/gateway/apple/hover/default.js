



function show_info_outline_Tab(___properties){
    // make sure flex_1 is id of column
    $('#flex_1').scrollTop(0); // build in scroll to top popup info window
    $('#info-window-div').html(json_flex_tip_viewer(___properties))
    // for embed at top, right and or left side info window, always scroll to top
    $('#flex_1').scrollTop(0); // build in scroll to top popup info window
}


function empty_info_outline_Tab(){
  $('#info-window-div').html("")
}

