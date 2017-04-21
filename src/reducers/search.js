import {
    KEYWORD_CHANGE,
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE
} from '../constants/action-types';

// 电影搜索
const search = (state = {
    isFetching: false,
    count: 20,
    start: 0,
    total: 0,
    movies: [],
}, action) => {
    let newState = {...state};
    switch (action.type) {
        case KEYWORD_CHANGE:
            // 当搜索关键字发生改变时清空当前电影列表
            newState.movies = [];
            return newState;

        case FETCH_SEARCH_REQUEST:
            newState.isFetching = true;
            if (!action.isLoadMore) {
                newState.movies = [];
            }
            return newState;

        case FETCH_SEARCH_SUCCESS:
            newState.isFetching = false;
            newState.count = action.movies.count;
            newState.start = action.movies.start;
            newState.total = action.movies.total;
            newState.movies = newState.movies.concat(action.movies.subjects);
            return newState;

        case FETCH_SEARCH_FAILURE:
            newState.isFetching = false;
            if (action.isLoadMore) {
                newState.error = action.error;
            } else {
                newState.movies = [];
            }
            return newState;

        default:
            return state;
    }
};

export default search;