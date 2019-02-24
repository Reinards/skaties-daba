var V = require('./vars.js');
var Data = require('./data.js');
var Home_view = require('./home.js');
var Map_view = require('./map.js');
var Task_view = require('./task.js');



$(document).ready(function(){ init(); });



function init(){

    var game_state = Data.loadGameState();

    var body_id = $("body").attr('id');

    if(body_id === "home") Home_view.init();
    if(body_id === "map") Map_view.init();
    if(body_id === "task") Task_view.init();
}