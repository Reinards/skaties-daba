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