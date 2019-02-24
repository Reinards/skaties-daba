var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');

var game_state = null;

exports.init = function (){

    game_state = Data.loadGameState();

    setEvents();
    handleTaskModal();

    Helpers.transitionFrom();

}

function setEvents(){
    $(V.quit_game_btn_id).click(function(){Helpers.showModal(V.quit_modal,'screen-overlay')});
    $(V.show_help_btn_id).click(function(){Helpers.showModal(V.help_modal,'screen-overlay')});
    $(V.confirm_and_quit_btn).click(function(){Helpers.transitionTo("index")});
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
}

function handleTaskModal(){
    var tasks = game_state.tasks;
    for(var task_id = 0; task_id < tasks.length; task_id++){
        if(tasks[task_id]==1){
            $('#modal-'+V.tasks_modal+' .task_'+(task_id+1)).addClass('task--done');
        }
    }
}