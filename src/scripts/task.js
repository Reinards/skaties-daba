var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');
var TaskDb = require('./task_db.js');

var task_id = 0;
var task = null;
var game_state = null;

var current_subtask = 1;
var current_selected_item = -1;

var local_answers = new Array(15);

var video_open = false;
var selected_images_count = 0;

exports.init = function(){
    
    game_state = Data.loadGameState();
    var tmp_body = document.querySelector('#task');
    task_id = tmp_body.dataset.task;
    task = TaskDb.tasks[task_id];
    for(var i=0;i<15;i++){
        local_answers[i]=false;
    }

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

    $('.watch-video-btn').click(function(){
        video_open=true;
        $('.video-wrapper').removeClass('video-wrapper--hidden');
    });

    $('.close-video').click(function(){
        video_open=false;
        $('.video-wrapper').addClass('video-wrapper--hidden');
    });

    $(".subtask .info-container").click(onInfoClicked);
    $('.item').click(onItemClicked);
    $('.img-item').click(function(){onImgItemClicked(this)});
    $('.submit-task').click(onSubmitTask);
}


function nextSubtask(){
    $('.subtask_'+current_subtask).fadeOut(function(){
        $(this).addClass('subtask--hidden');
    });

    var quick = TaskDb.tasks[task_id]['quick']; // Should there be another info shown
    current_subtask++;
    current_selected_item=-1;
    selected_images_count=0;
    local_answers = new Array(15);
    for(var i=0;i<15;i++){
        local_answers[i]=false;
    }
    $('.subtask_'+current_subtask).removeClass('subtask--hidden');

    if(!quick){
        $(V.task_hint).fadeIn();
    }
}

function onSubmitTask(){
    var subtask_count = TaskDb.tasks[task_id]['subtasks'];    
    var tmp_task_type = getTaskType();

    if(selected_images_count<=0 && tmp_task_type===1) return;
    if(selected_images_count<=0 && tmp_task_type===3) return;
    if(selected_images_count<=0 && tmp_task_type===4) return;
    

    if(tmp_task_type === 2){
        local_answers = current_selected_item;

        if(current_selected_item === -1) return;
    }

    // Input field
    if(tmp_task_type === 5){
        local_answers = $('.task-input').val();
        
        if(local_answers.length === 0) return;
    }


    if(tmp_task_type === 2 || tmp_task_type === 5){
        // No converting needed, use raw local_answers array

        game_state.answers[task_id][current_subtask] = local_answers;
        Data.saveGameState(game_state);
        
        if(subtask_count-current_subtask > 0){
            nextSubtask();
        }else{
            game_state.tasks[task_id-1]=1;
            Data.saveGameState(game_state);
            Helpers.transitionTo('map');
        }
        return;
    }

    
    if(tmp_task_type === 1){
        var answer_array = new Array();
        
        for(var i=0;i<local_answers.length;i++){
            var dataContent = $('.img_'+current_subtask+"_"+(i+1)).data("cont");
            var dataContent2 = $('.subtask_'+current_subtask+" .item_"+(local_answers[i]+1)+" .content").html();

            console.log(dataContent);
            console.log(dataContent2);
            if(typeof dataContent === "string"){
                answer_array.push(dataContent+": "+dataContent2);
            }else{
                break;
            }
        }
        
        game_state.answers[task_id][current_subtask] = answer_array;
        Data.saveGameState(game_state);
        
        if(subtask_count-current_subtask > 0){
            nextSubtask();
        }else{
            game_state.tasks[task_id-1]=1;
            Data.saveGameState(game_state);
            Helpers.transitionTo('map');
        }
        return;
    }


}

function onImgItemClicked(t){
    var task_type = getTaskType();
    
    if(task_type===3){
        var item_id = t.dataset.item_id;
        var limit = TaskDb.tasks[task_id]['limit'];
        
        if(limit>0){
            
            if(local_answers[item_id-1]===false && selected_images_count+1 <=limit){
                $('.subtask_'+current_subtask+' .img-item_'+item_id).toggleClass('img-item--selected');
                $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
                $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html('<i class="fas fa-check"></i>');
                local_answers[item_id-1] = !local_answers[item_id-1];
                if(local_answers[item_id-1]===true) selected_images_count+=1;
                else selected_images_count-=1;

            }else if(local_answers[item_id-1]===true){

                $('.subtask_'+current_subtask+' .img-item_'+item_id).toggleClass('img-item--selected');
                $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
                $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html('<i class="fas fa-check"></i>');
                local_answers[item_id-1] = !local_answers[item_id-1];
                if(local_answers[item_id-1]===true) selected_images_count+=1; 
                else selected_images_count-=1;

            }
        }else{
            $('.subtask_'+current_subtask+' .img-item_'+item_id).toggleClass('img-item--selected');
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html('<i class="fas fa-check"></i>');
        
            local_answers[item_id-1] = !local_answers[item_id-1];
            if(local_answers[item_id-1]===true) selected_images_count+=1;
            else selected_images_count-=1;
        }
        
    }else{
        var img = $()
        var item_id = t.dataset.item_id;
        
        if(current_selected_item !== -1){

            $('.subtask_'+current_subtask+' .img-item_'+item_id).toggleClass('img-item--selected');
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html(current_selected_item);
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
            if(local_answers[item_id-1]===true) selected_images_count-=1;
            else selected_images_count+=1;
            local_answers[item_id-1] = current_selected_item-1;
        }
    }

}

function onItemClicked(){
    if(current_selected_item === -1){
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
    if(video_open) return;

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