var types_db = {
    'connect_image_to_text': 1,
    'choose_correct': 2,
    'choose_possible': 3,
    'correct_order': 4,
    'type_answer': 5,
}

exports.tasks = {
    1: { // Abeles
        coords: {
            lo: 22.493614,
            la: 56.665404
        },
        subtasks: 3,
        quick: false,
        types: [
            types_db['connect_image_to_text'],
            types_db['choose_correct'],
            types_db['connect_image_to_text']
        ]
    },
    2: { // liepas
        coords: {
            lo: 22.493108,
            la: 56.666049 
        },
        subtasks: 1,
        limit: -1,
        types: [
            types_db['choose_possible']
        ]
    },
    3: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['connect_image_to_text']
        ]
    },
    4: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    5: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    6: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    7: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    8: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    9: {
        coords: {
            lo: 0,
            la: 0
        },
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
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    11: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['type_answer']
        ]
    },
    12: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    13: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        types: [
            types_db['choose_correct']
        ]
    },
    14: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        limit: -1,
        types: [
            types_db['choose_possible']
        ]
    },
    15: {
        coords: {
            lo: 0,
            la: 0
        },
        subtasks: 1,
        limit: 1,
        types: [
            types_db['choose_possible']
        ]
    },
}