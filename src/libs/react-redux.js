import { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/ReduxContext';

// Trả về store instance từ Context
function useStore() {
    const store = useContext(Context);
    return store;
}

// Trả về dispatch function từ store
function useDispatch() {
    const store = useStore();
    return store.dispatch;
}

// Nhận selector function làm parameter
// Subscribe vào store và re-render component khi selected value thay đổi
// Optimize để chỉ re-render khi selected value thực sự thay đổi
function useSelector(selector) {
    const store = useStore();
    const [state, setState] = useState(() => {
        return selector(store.getState());
    });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newSelectedState = selector(store.getState());

            setState((prev) => {
                if (state !== newSelectedState) return newSelectedState;
                return prev; // không đổi thì không re-render
            });
        });

        return unsubscribe;
    }, [selector, state, store]);

    return state;
}

export { Context, useStore, useDispatch, useSelector };
