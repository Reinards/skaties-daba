var types_db = {
    'connect_image_to_text': 1,
    'choose_correct': 2,
    'choose_possible': 3,
    'correct_order': 4,
    'type_answer': 5,
}

exports.locations = {
    1: { // Abeles
        coords: {
            lo: 22.494415,
            la: 56.664812,
        },
        task_id: 5
    },
    2: { // Liepas
        coords: {
            lo: 22.493171,
            la: 56.666077,
        },
        task_id: 13
    },
    3: { // ziidkoks
        coords: {
            lo: 22.492104,
            la: 56.664284,
        },
        task_id: 15
    },
    4: { // valrieksts
        coords: {
            lo: 22.491468,
            la: 56.665162,
        },
        task_id: 10
    },
    5: { // mitrene
        coords: {
            lo: 22.491031,
            la: 56.665403,
        },
        task_id: 12
    },
    6: { // gliemis
        coords: {
            lo: 22.490824,
            la: 56.665435,
        },
        task_id: 11
    },

    7: { // piiles
        coords: {
            lo: 22.490398,
            la: 56.665559,
        },
        task_id: 1
    },
    8: { // baarbele
        coords: {
            lo: 22.489399,
            la: 56.665409,
        },
        task_id: 2
    },
    
    9: { // augi
        coords: {
            lo: 22.489028,
            la: 56.664912,
        },
        task_id: 9
    },
    10: {
        coords: { // lapegle
            lo: 22.491087,
            la: 56.665808,
        },
        task_id: 8
    },
    11: { // zivis
        coords: {
            lo: 22.490938,
            la: 56.666477,
        },
        task_id: 14
    },
    12: { // gulbis
        coords: {
            lo: 22.490248,
            la: 56.667411,
        },
        task_id: 6
    },
    13: { // grimonis
        coords: {
            lo: 22.490910,
            la: 56.667710,
        },
        task_id: 7
    },
    14: { // niedre
        coords: {
            lo: 22.491328,
            la: 56.667765,
        },
        task_id: 4
    },
    15: { // Etikkoks
        coords: {
            lo: 22.491531,
            la: 56.667772,
        },
        task_id: 3
    }
}
exports.tasks = {
    1: { 
        subtasks: 3,
        quick: false,
        types: [
            types_db['connect_image_to_text'],
            types_db['choose_correct'],
            types_db['connect_image_to_text']
        ]
    },
    2: {
        subtasks: 1,
        limit: -1,
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
    },
    6: {
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    7: {
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    8: {
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    9: {
        subtasks: 12,
        quick: true,
        limit: 1,
        types: [
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible'],
            types_db['choose_possible']
        ]
    },
    10: {
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    11: {
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    12: {
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    13: {
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    14: {
        subtasks: 1,
        limit: -1,
        types: [
            types_db['choose_possible']
        ]
    },
    15: {
        subtasks: 1,
        limit: 1,
        types: [
            types_db['choose_possible']
        ]
    },
}