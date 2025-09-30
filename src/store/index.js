import { createStore } from '@/libs/redux';
import reducer from './reducers/taskReducer';

// store nhận reducer
const store = createStore(reducer);

export default store;
