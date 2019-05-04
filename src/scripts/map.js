var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');
var TaskDb = require('./task_db.js');

var game_state = null;
var last_heading = 0;
var pos = [0,0];

var rel=100;
var min_range = 20; // in meters
var tasks_in_range = [];

var view_ready = false;

document.addEventListener('deviceready', onDeviceReady, false);

var locations = [];
var location_task_ids = [];
var location_id = [];

exports.init = function (){hor = 

    game_state = Data.loadGameState();
    setEvents();

    for(var i=1;i<=15;i++){
        // if(game_state.tasks[TaskDb.locations[i]["task_id"]-1]!=0){
        //     continue
        // };
        var tmp_location = [TaskDb.locations[i]["coords"]["la"],TaskDb.locations[i]["coords"]["lo"]];
        // console.log(tmp_location);
        locations.push(tmp_location);
        location_task_ids.push(TaskDb.locations[i]["task_id"]);
        location_id.push(i);
    }

    if(locations.length==0){
        Helpers.transitionTo("answers");
    }

    handleTaskModal();

    Helpers.transitionFrom();
    view_ready = true;
}

function setEvents(){
    $(V.quit_game_btn_id).click(function(){Helpers.showModal(V.quit_modal,'screen-overlay')});
    $(V.show_help_btn_id).click(function(){Helpers.showModal(V.help_modal,'screen-overlay')});
    $(V.confirm_and_quit_btn).click(function(){Helpers.transitionTo("answers")});
    $(V.hide_quit_modal_btn).click(function(){Helpers.hideModal(V.quit_modal,'screen-overlay')});
    $(V.hide_help_modal_btn).click(function(){Helpers.hideModal(V.help_modal,'screen-overlay')});
    $(V.show_tasks_btn_id).click(function(){Helpers.showModal(V.tasks_modal,'screen-overlay')});
    $(V.hide_tasks_modal_btn).click(function(){Helpers.hideModal(V.tasks_modal,'screen-overlay')});

    // $('#modal-'+V.tasks_modal+' .task_1').click(function(){Helpers.transitionTo('task_1');});
    // $('#modal-'+V.tasks_modal+' .task_2').click(function(){Helpers.transitionTo('task_2');});
    // $('#modal-'+V.tasks_modal+' .task_3').click(function(){Helpers.transitionTo('task_3');});
    // $('#modal-'+V.tasks_modal+' .task_4').click(function(){Helpers.transitionTo('task_4');});
    // $('#modal-'+V.tasks_modal+' .task_5').click(function(){Helpers.transitionTo('task_5');});
    // $('#modal-'+V.tasks_modal+' .task_6').click(function(){Helpers.transitionTo('task_6');});
    // $('#modal-'+V.tasks_modal+' .task_7').click(function(){Helpers.transitionTo('task_7');});
    // $('#modal-'+V.tasks_modal+' .task_8').click(function(){Helpers.transitionTo('task_8');});
    // $('#modal-'+V.tasks_modal+' .task_9').click(function(){Helpers.transitionTo('task_9');});
    // $('#modal-'+V.tasks_modal+' .task_10').click(function(){Helpers.transitionTo('task_10');});
    // $('#modal-'+V.tasks_modal+' .task_11').click(function(){Helpers.transitionTo('task_11');});
    // $('#modal-'+V.tasks_modal+' .task_12').click(function(){Helpers.transitionTo('task_12');});
    // $('#modal-'+V.tasks_modal+' .task_13').click(function(){Helpers.transitionTo('task_13');});
    // $('#modal-'+V.tasks_modal+' .task_14').click(function(){Helpers.transitionTo('task_14');});
    // $('#modal-'+V.tasks_modal+' .task_15').click(function(){Helpers.transitionTo('task_15');});


    $("#m25").click(function(){
        rel=25;
    });
    $("#m100").click(function(){
        rel=250;
    });
    $("#m1000").click(function(){
        rel=800;
    });
}

function handleTaskModal(){
    
    var tasks = game_state.tasks;

    for(var task_id = 0; task_id < locations.length; task_id++){
        console.log("Task ID: "+task_id);
        console.log(location_task_ids[task_id]);
        console.log(tasks[task_id]);
        if(tasks[task_id]==1){
            $('#modal-'+V.tasks_modal+' .task_'+(task_id+1)).addClass('task--done');
        }
    }
}





function onDeviceReady(){
    watchPosition();
 }


 function watchPosition() {
    var options = {
       maximumAge: 3600000,
       timeout: 3000,
       enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
 
    function onSuccess(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var heading = position.coords.heading;

        pos[0]=latitude; // V
        pos[1]=longitude;// H

        if(heading===0.00){
            heading = last_heading;
        }else{
            last_heading = heading;
        }
        
        $(".coords").html("X: "+longitude+"; Y: "+latitude+";");


        $(".map__arrow").css({
            'transform': 'translate(-50%, -50%) rotateZ('+heading+'deg)'
        });

        renderTasks();
    };
 
    function onError(error) {

    }
 }

 function renderTasks(){

     var tasks = game_state.tasks;

     if(!view_ready){
        return;
     }


     for(var task_id=0;task_id<locations.length;task_id++){

         if(tasks[task_id]==1) continue;

        var task_lat = locations[task_id][0];
        var task_lon = locations[task_id][1];
        var me_lat = pos[0];
        var me_lon = pos[1];

        var dist_lat = Helpers.calcDistV1(task_lat,0,me_lat,0);
        var dist_lon = Helpers.calcDistV1(0,task_lon,0,me_lon);
        var dist_total = Helpers.calcDistV1(task_lat,task_lon,me_lat,me_lon);

        
        dist_lon*=1000;
        dist_lat*=1000;
        dist_total*=1000;
        
        if(dist_total <= min_range){
            tasks_in_range.push(task_id);
            Helpers.transitionTo('task_'+location_task_ids[task_id]);
        }

        dist_lon=(300/rel)*dist_lon;
        dist_lat=(300/rel)*dist_lat;


        if(task_lat > me_lat){
            dist_lat*=-1;
        }

        if(task_lon < me_lon){
            dist_lon*=-1;
        }


        var ww = $(window).width();
        var wh = $(window).height();


        var t = document.getElementById('task_'+location_id[task_id]);
        t.style.top = (dist_lat+(wh/2))+'px';
        t.style.left = (dist_lon+(ww/2))+'px';
        $('#task_'+location_id[task_id]).removeClass('task--hidden');
     }
 }