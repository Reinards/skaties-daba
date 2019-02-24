var user = {
    longitude: 0,
    latitude: 0,
    heading: 0 // specified in degrees counting clockwise relative to the true north. 
}


var cp = [
    {name: 'Viestura ist.', latitude: 56.64683302, longitude: 22.45118814},
    {name: 'Vecāku ist.', latitude: 56.64686358, longitude: 22.45113082},
    {name: 'Aplis', latitude: 56.649794, longitude: 22.469495}
];



document.addEventListener('deviceready', onDeviceReady, false);




function onDeviceReady(){
    
    var l1 = degreesToRadians(cp[0].latitude);
    var l2 = degreesToRadians(cp[2].latitude);
    var lo1 = degreesToRadians(cp[0].longitude);
    var lo2 = degreesToRadians(cp[2].longitude);
    var d = distance(cp[0].latitude,cp[0].longitude,cp[1].latitude,cp[1].longitude,"K");

    watchPosition();
    
    // alert(d*1000.0);
}


function getPosition() {

    var options = {
       enableHighAccuracy: true,
       maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
 
    function onSuccess(position) {
        user.latitude = position.coords.latitude;
        user.longitude = position.coords.longitude;
        user.heading = position.coords.heading;
        alert(user.latitude+"(lat); "+user.longitude+"(lon); "+user.heading);
    };
 
    function onError(error) {
       alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
 }


 function watchPosition() {
    var options = {
       maximumAge: 3600000,
       timeout: 3000,
       enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
 
    function onSuccess(position) {
        user.latitude = position.coords.latitude;
        user.longitude = position.coords.longitude;
        user.heading = position.coords.heading;
        
        // alert(distance(cp[0].latitude,cp[0].longitude,user.latitude,user.longitude,"K")*1000.0);
        alert(distanceInKmBetweenEarthCoordinates(cp[0].latitude,cp[0].longitude,cp[2].latitude,cp[2].longitude)*1000.0);
    };
 
    function onError(error) {
       alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
 }

 function initClicks(){
     $("#get-pos-btn").click(getPosition());
 }














 function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }
  function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}