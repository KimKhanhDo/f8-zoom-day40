const initialState = {
    tasks: [],
    loading: false,
    error: null,
    searchQuery: '',
};

export const SET_TASKS = 'tasks/setTasks';
export const ADD_TASK = 'tasks/addTask';
export const UPDATE_TASK = 'tasks/updateTask';
export const DELETE_TASK = 'tasks/deleteTask';
export const SEARCH_TASK = 'filter/searchFilterChange';

export const SET_LOADING = 'tasks/setLoading';
export const SET_ERROR = 'tasks/setError';

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

        case SEARCH_TASK: {
            return {
                ...state,
                searchQuery: action.payload,
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
