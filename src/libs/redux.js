const __DO_NOT_USE__ActionTypes = {
    type: '@@K92-redux/INITj.b.t.i.f.t',
};

const createStore = (reducer, preloadedState) => {
    let state = reducer(preloadedState, __DO_NOT_USE__ActionTypes);
    const listeners = [];

    return {
        // Trả về state hiện tại
        getState() {
            return state;
        },

        // Cập nhật state thông qua reducer
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener());
        },

        // Đăng ký listener, trả về function unsubscribe
        subscribe(listener) {
            listeners.push(listener);

            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        },
    };
};

export { createStore };
