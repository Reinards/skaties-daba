var V = require('./vars.js');
var Data = require('./data.js');
var Helpers = require('./helpers.js');
var TaskDb = require('./task_db.js');

var game_state = null;

exports.init = function (){

    game_state = Data.loadGameState();

    setEvents();
    loadAnswers();

    Helpers.transitionFrom();
}

function setEvents(){
    // alert("a");
    $(".answers-btn").click(function(){
        // alert("t");
        Helpers.transitionTo("index");
    });

}

function loadAnswers(){
    var answers = game_state.answers;
    

    for(var answer_key=1; answer_key<=15; answer_key++){

        var subtasks = TaskDb.tasks[answer_key]['subtasks'];
        var types = TaskDb.tasks[answer_key]['types'];

        $(".answers_wrapper").append("<div class='task task"+answer_key+"'><h2>"+answer_key+"</h2></div>");
        
        $(".task"+answer_key).append("<div class='subtasks'></div>");

        for(var subtask_key = 1; subtask_key<=types.length; subtask_key++){
            $(".task"+answer_key+" .subtasks").append("<div class='subtask subtask"+subtask_key+"'><span class='subtask_nr'>"+subtask_key+"</span></div>");

            $(".task"+answer_key+" .subtasks .subtask"+subtask_key).append("<div class='subtask_answers'>"+getAnswersString(answers,answer_key,subtasks,subtask_key)+"</div>");
        }


    }
}

function getAnswersString(answers, answer_key, subtasks, subtask_key){
    var task_type = TaskDb.tasks[answer_key]['types'][subtask_key-1];
    var answers_item = answers[answer_key][subtask_key];
    var return_string = "";

    if(task_type === 2){
        return_string+="Atbildes numurs: "+(answers_item===null?"-":answers_item);
    }else if(task_type === 5){
        return_string+="Tu ierakstīji: "+(answers_item===null?"-":answers_item);
    }else if(task_type === 1){
        for(i in answers_item){
            return_string += answers_item[i]+" <br>";
        }
        // console.log(answers_item);
    }else if(task_type === 3){
        // console.log(typeof answers_item);
        for(i in answers_item){
            return_string += answers_item[i]+(i==="null"?"":"<br>");
        }
    }else{
        return "-";
    }

    return return_string;
}