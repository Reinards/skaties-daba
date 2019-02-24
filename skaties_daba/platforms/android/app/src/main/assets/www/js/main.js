var transition_duration = 1000; // ms
var body_id;
var transition_element = "#transition-overlay";
var task_id;

var game_state = {
    transition_to: '',
    transition_from: ''
}


$(document).ready(function(){

    body_id = $("body").attr('id');

    loadGameState();

    if(body_id == "home") initHome();
    if(body_id == "map") initMap();
    if(body_id == "task") initTask();
    
});



// HELPERS

function transitionTo(where){
    saveGameState(where);
    $(transition_element).animate({
        opacity: 1
    },transition_duration,function(){
        window.location = where+".html";
    });
}
function transitionFrom(){
    $(transition_element).animate({
        opacity: 0
    },transition_duration, transitionEnded);
}
function transitionEnded(){
    // do some stuff
}
function showModal(modal_id){
    $("#blur-wrapper").removeClass('blur--hidden');
    $("#modal-overlay").removeClass('modal-overlay--hidden');
    $("#modal-"+modal_id).removeClass('modal--hidden');
}
function hideModal(modal_id){
    $("#blur-wrapper").addClass('blur--hidden');
    $("#modal-overlay").addClass('modal-overlay--hidden');
    $("#modal-"+modal_id).addClass('modal--hidden');
}
function saveGameState(new_body_id){
    game_state.transition_to = new_body_id;
    game_state.transition_from = body_id;
    localStorage.setItem('game_state',JSON.stringify(game_state));
}
function loadGameState(){
    var tmp_game_state = localStorage.getItem('game_state');
    if(tmp_game_state !== null){
        game_state = JSON.parse(tmp_game_state);
    }
}

// HOME

function initHome(){

    if(game_state.transition_from=='splash'){
        $(transition_element).hide();
        $(transition_element).removeClass('transition-overlay--visible');
        setTimeout(function(){
            $(transition_element).show();
        },1000);
    }else{
        transitionFrom();
    }

    $("#home").click(function(){transitionTo('map');});

    // if(game_state.transition_from === 'map'){
    // }

    handleSplashScreen();

}
function handleSplashScreen(){
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


// MAP
function initMap(){
    transitionFrom();

    $("#quit-game").click(function(){showModal("quit")});
    $("#show-help").click(function(){showModal("help")});
    $("#confirm-and-quit").click(function(){transitionTo("index")});

    $("#hide-quit-modal").click(function(){hideModal("quit")});
    $("#hide-help-modal").click(function(){hideModal("help")});

}


// TASK
function initTask(){
    transitionFrom();
    var tmp_body = document.querySelector('#task');
    task_id = tmp_body.dataset.task;

    $("#hide-task-modal").click(function(){hideModal("task")});
}