import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import theaters from './theaters';
import top250 from './top250';
import search from './search';
import favorites from './favorites';

// 合成reducer
const appReducer = combineReducers({
    theaters,
    top250,
    search,
    favorites,
    router: routerReducer
});

export default appReducer;