var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');
var TaskDb = require('./task_db.js');

var task_id = 0;
var task = null;
var game_state = null;

var current_subtask = 1;
var current_selected_item = -1;

var local_answers = new Array(10);

exports.init = function(){
    
    game_state = Data.loadGameState();
    var tmp_body = document.querySelector('#task');
    task_id = tmp_body.dataset.task;
    task = TaskDb.tasks[task_id];

    setEvents();

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
    
    $(".subtask .info-container").click(onInfoClicked);
    $('.item').click(onItemClicked);
    $('.img-item').click(function(){onImgItemClicked(this)});
    $('.submit-task').click(onSubmitTask);
}


function nextSubtask(){
    $('.subtask_'+current_subtask).fadeOut(function(){
        $(this).addClass('subtask--hidden');
    });
        current_subtask++;
        current_selected_item=-1;
        local_answers = new Array();
        $('.subtask_'+current_subtask).removeClass('subtask--hidden');
        $(V.task_hint).fadeIn();
}

function onSubmitTask(){
    var tmp_task_type = getTaskType();
    var subtask_count = TaskDb.tasks[task_id]['subtasks'];
    
    if(tmp_task_type === 2){
        local_answers = current_selected_item;
    }

    game_state.answers[task_id][current_subtask] = local_answers;
    Data.saveGameState(game_state);
    
    if(subtask_count-current_subtask > 0){
        nextSubtask();
    }else{
        game_state.tasks[task_id-1]=1;
        Data.saveGameState(game_state);
        Helpers.transitionTo('map');
    }
}

function onImgItemClicked(t){
    var task_type = getTaskType();
    
    if(task_type===3){
        var item_id = t.dataset.item_id;
        
        $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
        $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html('*');

        while(local_answers.length < item_id-1){
            local_answers.push(false);
        }
        local_answers[item_id-1] = !local_answers[item_id-1];
        console.log(local_answers);
    }else{
        var item_id = t.dataset.item_id;

        if(current_selected_item !== -1){
            alert("test works");
            console.log(current_subtask);
            console.log(current_selected_item);
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html(current_selected_item);
    
            // while(local_answers.length < item_id){
            //     local_answers.push();
            // }
            local_answers[item_id-1] = current_selected_item-1;
        }
    }

}

function onItemClicked(){
    if(current_selected_item == -1){
        var item_id = $(this).data('item_id');
        current_selected_item = item_id;
        $('.subtask_'+current_subtask+' .item_'+current_selected_item).addClass('item--selected');
    }else{
        var item_id = $(this).data('item_id');

        if(item_id == current_selected_item){
            $('.subtask_'+current_subtask+' .item_'+current_selected_item).removeClass('item--selected');
            current_selected_item = -1;
        }else{
            $('.subtask_'+current_subtask+' .item_'+current_selected_item).removeClass('item--selected');
            current_selected_item = item_id;
            $('.subtask_'+current_subtask+' .item_'+current_selected_item).addClass('item--selected');
        }
    }
}

function onInfoClicked(){
    $('.subtask_'+current_subtask+' > .info-container').addClass('info-container--hidden');
    $(V.task_hint).fadeOut();
    setTimeout(function(){
        // alert(current_subtask);
        $('.subtask_'+current_subtask+' > .info-container').hide();
        $('.subtask_'+current_subtask+' > .task-container').removeClass('task-container--hidden');
    },100);
}

function getTaskType(){
    return TaskDb.tasks[task_id]['types'][current_subtask-1];
}