import React from 'react';
import ReactDOM from 'react-dom';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import { saveLocalState, loadLocalState } from './actions';
import appReducer from './reducers';
import App from './App';
import '../semantic/dist/semantic.min.css';

const history = createHistory();
const middleware = [thunk];
middleware.push(routerMiddleware(history));

// 将客户端本地存储的状态作为初始化状态
const localState = loadLocalState();
const store = createStore(appReducer, localState, applyMiddleware(...middleware));

// 将状态存储到客户端本地
store.subscribe(_.throttle(() => {
    const state = store.getState();

    // 只保存收藏状态
    const onlyFavoritesState = {favorites: state.favorites};
    saveLocalState(onlyFavoritesState);
}, 3000));

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);