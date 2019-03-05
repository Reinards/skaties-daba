var V = require('./vars.js');
var Data = require('./data.js');


// TRANSITIONS

exports.transitionTo = function (where){
    $(V.transition_element).animate({
        opacity: 1
    },V.transition_duration,function(){
        window.location = where+".html";
    });
}

exports.transitionFrom = function (){
    $(V.transition_element).animate({
        opacity: 0
    },V.transition_duration);
}


// MODALS

exports.showModal = function (modal_id, overlay_class){
    $(V.blur_element).removeClass('blur--hidden');
    $(V.screen_overlay).removeClass(overlay_class+'--hidden');
    $("#modal-"+modal_id).removeClass('modal--hidden');
}

exports.hideModal = function (modal_id, overlay_class){
    $(V.blur_element).addClass('blur--hidden');
    $(V.screen_overlay).addClass(overlay_class+'--hidden');
    $("#modal-"+modal_id).addClass('modal--hidden');
}



// DISTANCE

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

exports.calcDistV1 = function (lat1, lon1, lat2, lon2) {
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

  
function calcDistV2(lat1, lon1, lat2, lon2, unit) {
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