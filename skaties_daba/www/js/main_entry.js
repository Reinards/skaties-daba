(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var V = require('./vars.js');

var data_template = {
    body_id: 'home',
    current_task: -1,
    current_subtask: -1,
    last_location: [0,0],
    tasks: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 0-unseen, 1-seen, 2-submitted,correct, 3-submitted,wrong
    answers: {
        1:{
            1:[],
            2:null,
            3:[]
        },
        2: {
            1: []
        },
        3: {
            1: []
        },
        4: {
            1: null
        },
        5: {
            1: null
        }
    },
}

exports.saveGameState = function (game_state){
    localStorage.setItem(V.ls_name,JSON.stringify(game_state));
}

exports.loadGameState = function (){
    var game_state = localStorage.getItem(V.ls_name);
    if(game_state !== null){
        return JSON.parse(game_state);
    }else{
        exports.saveGameState(data_template);
    }
}
},{"./vars.js":8}],2:[function(require,module,exports){
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
},{"./data.js":1,"./vars.js":8}],3:[function(require,module,exports){
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
},{"./data.js":1,"./helpers.js":2,"./vars.js":8}],4:[function(require,module,exports){
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
},{"./data.js":1,"./home.js":3,"./map.js":5,"./task.js":6,"./vars.js":8}],5:[function(require,module,exports){
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
},{"./data.js":1,"./helpers.js":2,"./vars.js":8}],6:[function(require,module,exports){
var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');
var TaskDb = require('./task_db.js');

var task_id = 0;
var task = null;
var game_state = null;

var current_subtask = 1;
var current_selected_item = -1;

var local_answers = new Array();

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
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').toggleClass('img-overlay--hidden');
            $('.subtask_'+current_subtask+' .img-item_'+item_id+' .img-overlay').html(current_selected_item);
    
            while(local_answers.length < item_id-1){
                local_answers.push();
            }
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
},{"./data.js":1,"./helpers.js":2,"./task_db.js":7,"./vars.js":8}],7:[function(require,module,exports){
var types_db = {
    'connect_image_to_text': 1,
    'choose_correct': 2,
    'choose_possible': 3,
    'correct_order': 4,
    'type_answer': 5,
}

exports.tasks = {
    1: {
        subtasks: 3,
        types: [
            types_db['connect_image_to_text'],
            types_db['choose_correct'],
            types_db['connect_image_to_text']
        ]
    },
    2: {
        subtasks: 1,
        types: [
            types_db['choose_possible']
        ]
    },
    3: {
        subtasks: 1,
        types: [
            types_db['connect_image_to_text']
        ]
    },
    4: {
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    5: {
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    }
}

exports.answers = {
    1: {
        1: [0,1],
        2: 2,
        3: [0,1,2,3,4,5,6]
    },
    2: {
        1: [0,1,2]
    },
    3: {
        1: [0,1,2,3]
    }
}
},{}],8:[function(require,module,exports){
// ====================== PATHS ====================== //




// ====================== ELEMENTS ====================== //

exports.transition_element = "#transition-overlay";
exports.blur_element = "#blur-wrapper";
exports.screen_overlay = "#screen-overlay";

exports.quit_game_btn_id = "#quit-game";
exports.hide_quit_modal_btn = "#hide-quit-modal";
exports.quit_modal = "quit";

exports.show_help_btn_id = "#show-help";
exports.hide_help_modal_btn = "#hide-help-modal";
exports.help_modal = "help";

exports.show_tasks_btn_id = "#show-tasks";
exports.hide_tasks_modal_btn = "#hide-tasks-modal";
exports.tasks_modal = "tasks";

exports.confirm_and_quit_btn = "#confirm-and-quit"

exports.task_hint = ".task-hint";


// ====================== OTHER VARIABLES ====================== //

exports.ls_name = "game_state";
exports.transition_duration = 1000;







},{}]},{},[4]);
