function start(){
 var mapOptions = {
          center: new google.maps.LatLng(42.3583, -71.0603),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
}
function mapStations(){
    console.log('mapStations');
}

function detectLocation(){
    console.log('detectLocation');
}

function displayT(){
    console.log('displayT');
}

function subwayClick(){
    console.log('subwayClick');
}

function carmen(){
    console.log('carmen');
}

function waldo(){
    console.log('waldo');
}

function calcDistance(){
    console.log('calcDistance');
}
