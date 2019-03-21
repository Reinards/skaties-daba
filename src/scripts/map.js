var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');

var game_state = null;
var last_heading = 0;
var pos = [0,0];

var rel=100;

document.addEventListener('deviceready', onDeviceReady, false);

var cp = [
    [22.450546, 56.647362],
    [22.452706, 56.649830],
    [22.457440, 56.647978],
    [22.454349, 56.644493],
    [22.433120, 56.640203],
    [22.444911, 56.654231],
    [22.468448, 56.649212],
    [22.473861, 56.645073],
    [22.491722, 56.668205],
    [22.471644, 56.682244],
    [22.453664, 56.694684]
]


exports.init = function (){hor = 

    game_state = Data.loadGameState();

    setEvents();
    handleTaskModal();

    Helpers.transitionFrom();

}

function setEvents(){
    $(V.quit_game_btn_id).click(function(){Helpers.showModal(V.quit_modal,'screen-overlay')});
    $(V.show_help_btn_id).click(function(){Helpers.showModal(V.help_modal,'screen-overlay')});
    $(V.confirm_and_quit_btn).click(function(){Helpers.transitionTo("answers")});
    $(V.hide_quit_modal_btn).click(function(){Helpers.hideModal(V.quit_modal,'screen-overlay')});
    $(V.hide_help_modal_btn).click(function(){Helpers.hideModal(V.help_modal,'screen-overlay')});
    $(V.show_tasks_btn_id).click(function(){Helpers.showModal(V.tasks_modal,'screen-overlay')});
    $(V.hide_tasks_modal_btn).click(function(){Helpers.hideModal(V.tasks_modal,'screen-overlay')});

    $('#modal-'+V.tasks_modal+' .task_1').click(function(){Helpers.transitionTo('task_1');});
    $('#modal-'+V.tasks_modal+' .task_2').click(function(){Helpers.transitionTo('task_2');});
    $('#modal-'+V.tasks_modal+' .task_3').click(function(){Helpers.transitionTo('task_3');});
    $('#modal-'+V.tasks_modal+' .task_4').click(function(){Helpers.transitionTo('task_4');});
    $('#modal-'+V.tasks_modal+' .task_5').click(function(){Helpers.transitionTo('task_5');});
    $('#modal-'+V.tasks_modal+' .task_6').click(function(){Helpers.transitionTo('task_6');});
    $('#modal-'+V.tasks_modal+' .task_7').click(function(){Helpers.transitionTo('task_7');});
    $('#modal-'+V.tasks_modal+' .task_8').click(function(){Helpers.transitionTo('task_8');});
    $('#modal-'+V.tasks_modal+' .task_9').click(function(){Helpers.transitionTo('task_9');});
    $('#modal-'+V.tasks_modal+' .task_10').click(function(){Helpers.transitionTo('task_10');});
    $('#modal-'+V.tasks_modal+' .task_11').click(function(){Helpers.transitionTo('task_11');});
    $('#modal-'+V.tasks_modal+' .task_12').click(function(){Helpers.transitionTo('task_12');});
    $('#modal-'+V.tasks_modal+' .task_13').click(function(){Helpers.transitionTo('task_13');});
    $('#modal-'+V.tasks_modal+' .task_14').click(function(){Helpers.transitionTo('task_14');});
    $('#modal-'+V.tasks_modal+' .task_15').click(function(){Helpers.transitionTo('task_15');});


    $("#m100").click(function(){
        rel=100;
    });
    $("#m1000").click(function(){
        rel=1000;
    });
    $("#m10000").click(function(){
        rel=10000;
    });
}

function handleTaskModal(){
    var tasks = game_state.tasks;
    for(var task_id = 0; task_id < tasks.length; task_id++){
        if(tasks[task_id]==1){
            $('#modal-'+V.tasks_modal+' .task_'+(task_id+1)).addClass('task--done');
        }
    }
}





function onDeviceReady(){

    //  var l1 = degreesToRadians(cp[0].latitude);
    //  var l2 = degreesToRadians(cp[2].latitude);
    //  var lo1 = degreesToRadians(cp[0].longitude);
    //  var lo2 = degreesToRadians(cp[2].longitude);
    //  var d = distance(cp[0].latitude,cp[0].longitude,cp[1].latitude,cp[1].longitude,"K");
 
    
    // alert(d*1000.0);
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

        pos[0]=longitude;
        pos[1]=latitude;

        if(heading===0.00){
            heading = last_heading;
        }else{
            last_heading = heading;
        }
        
        $(".coords").html("Lon: "+longitude+"; Lat: "+latitude+"; H: "+heading);


        $(".map__arrow").css({
            'transform': 'translate(-50%, -50%) rotateZ('+heading+'deg)'
        });

        renderTasks();
        // alert(distance(cp[0].latitude,cp[0].longitude,user.latitude,user.longitude,"K")*1000.0);
        // alert(distanceInKmBetweenEarthCoordinates(cp[0].latitude,cp[0].longitude,cp[2].latitude,cp[2].longitude)*1000.0);
    };
 
    function onError(error) {
    //    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
 }

 function renderTasks(){
     // calculate the horizontal and vertical distance between me and each task
     // if the distance is withing n meters, change the absolute position and fadeIn the task
     // else fade out

     for(var task_id=0;task_id<cp.length;task_id++){

        var task_hor = cp[task_id][0];
        var task_ver = cp[task_id][1];
        var me_hor = pos[0];
        var me_ver = pos[1];

        var dist_hor = Helpers.calcDistV1(task_hor,0,me_hor,0);
        var dist_ver = Helpers.calcDistV1(0,task_ver,0,me_ver);

        dist_hor*=1000;
        dist_ver*=1000;

        console.log("Task "+(task_id+1));
        console.log(dist_hor+"m "+dist_ver+"m");
        dist_hor=(300/rel)*dist_hor;
        dist_ver=(300/rel)*dist_ver;

        if(task_ver > me_ver){
            dist_ver*=-1;
        }

        if(task_hor > me_hor){
            dist_hor*=-1;
        }


        var ww = $(window).width();
        var wh = $(window).height();
;

        var t = document.getElementById('task_'+(task_id+1));
        t.style.top = (dist_ver+(ww/2))+'px';
        t.style.left = (dist_hor+(ww/2))+'px';
        // $('#task_'+task_id).css('top', '811px');
        // $('#task_'+task_id).css('left', (ww/2+dist_hor));
        $('#task_'+(task_id+1)).removeClass('task--hidden');
     }
 }