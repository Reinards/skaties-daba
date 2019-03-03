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

exports.answers = {
    1: {
        1: [0,1],
        2: 2,
        3: [0,1,2,3,4,5,6]
    },
    2: {
        1: [true,false,false,true]
    },
    3: {
        1: [0,1,2,3]
    },
    4: {
        1: 3
    },
    5: {
        1: 0
    },
    6: {
        1: 2
    },
    7: {
        1: 3
    },
    8: {
        1: 125000
    },
    9: {
        1: [0],
        2: [0],
        3: [0],
        4: [0],
        5: [0],
        6: [0],
        7: [0],
        8: [0],
        9: [0],
        10: [0],
        11: [0],
        12: [0]
    },
    10: {
        1: "ķīna"
    },
    11: {
        1: 5.4
    },
    12: {
        1: 3
    },
    13: {
        1: 2
    },
    14: {
        1: [false, false, false, true, false, false, true, false, false, false]
    },
    15: {
        1: [0,1]
    }
}