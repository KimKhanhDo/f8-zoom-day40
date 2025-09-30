import { createContext } from 'react';

const Context = createContext();

// Nhận prop store và children
// Sử dụng React Context để provide store xuống component tree
function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>;
}

export { Context, Provider };
