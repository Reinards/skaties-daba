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