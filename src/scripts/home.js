var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');

var game_state = null;

exports.init = function(game_state){

    game_state = Data.loadGameState();

    setEvents();
    hideSplashScreen();

}

function hideSplashScreen(){
    $(".splash_logo_0").removeClass("invisible");
    setTimeout(function(){
        $(".splash_logo_1").removeClass("invisible");
    },1000);
    setTimeout(function(){
        $(".splash_logo_2").removeClass("invisible");
    },2000);
    setTimeout(function(){
        $("#section_splash").fadeOut(1000);
    },5000);
}

function setEvents(){
    $("#home").click(function(){Helpers.transitionTo('map');});
}