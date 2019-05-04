var V = require('./vars.js');
var Data = require('./data.js');
var Home_view = require('./home.js');
var Map_view = require('./map.js');
var Task_view = require('./task.js');
var Answers_view = require('./answers.js');

window.onload = function(){
    init();
}


function init(){

    var game_state = Data.loadGameState();

    var body_id = $("body").attr('id');

    if(body_id === "home") Home_view.init();
    if(body_id === "map") Map_view.init();
    if(body_id === "task") Task_view.init();
    if(body_id === "answers") Answers_view.init();
}