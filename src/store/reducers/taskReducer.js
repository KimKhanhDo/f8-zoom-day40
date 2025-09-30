const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

export const SET_TASKS = 'tasks/SET_TASKS';
export const ADD_TASK = 'tasks/ADD_TASK';
export const UPDATE_TASK = 'tasks/UPDATE_TASK';
export const DELETE_TASK = 'tasks/DELETE_TASK';

export const SET_LOADING = 'tasks/SET_LOADING';
export const SET_ERROR = 'tasks/SET_ERROR';

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TASKS: {
            return {
                ...state,
                tasks: action.payload,
            };
        }

        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        }

        case UPDATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        }

        case DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        }

        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload,
            };
        }

        case SET_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}

export default reducer;
