var V = require('./vars.js');

var data_template = {
    body_id: 'home',
    current_task: -1,
    current_subtask: -1,
    last_location: [0,0],
    tasks: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // 0-unseen, 1-seen, 2-submitted,correct, 3-submitted,wrong
    answers: {
        1:{
            1:null,
            2:null,
            3:null
        },
        2: {
            1: null
        },
        3: {
            1: null
        },
        4: {
            1: null
        },
        5: {
            1: null
        },
        6: {
            1: null
        },
        7: {
            1: null
        },
        8: {
            1: null
        },
        9: {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
            10: null,
            11: null,
            12: null
        },
        10: {
            1: null
        },
        11: {
            1: null
        },
        12: {
            1: null
        },
        13: {
            1: null
        },
        14: {
            1: null
        },
        15: {
            1: null
        },
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