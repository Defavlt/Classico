$(document).bind("ready", function() {

    var position = 
        new google.maps.LatLng(56.09080, 12.74496);

    var map_ele = $("aside.map");   
    var Options = {
        zoom: 15,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = 
        new google.maps.Map(map_ele[0], Options);
});
