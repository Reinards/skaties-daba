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
        subtasks: 1,
        types: [
            types_db['type_answer']
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
    },
    4: {
        1: 0
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
        1: 125000
    },
    10: {
        1: 125000
    },
    11: {
        1: 125000
    },
}