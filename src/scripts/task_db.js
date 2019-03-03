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