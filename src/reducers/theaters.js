import {
    FETCH_THEATERS_REQUEST,
    FETCH_THEATERS_FAILURE,
    FETCH_THEATERS_SUCCESS
} from '../constants/action-types';

// 正在上映的电影
const theaters = (state = {
    isFetching: false,
    count: 20,
    start: 0,
    total: 0,
    movies: [],
}, action) => {
    let newState = {...state};
    switch (action.type) {
        case FETCH_THEATERS_REQUEST:
            newState.isFetching = true;
            if (!action.isLoadMore) {
                newState.movies = [];
            }
            return newState;

        case FETCH_THEATERS_SUCCESS:
            newState.isFetching = false;
            newState.count = action.movies.count;
            newState.start = action.movies.start;
            newState.total = action.movies.total;
            newState.movies = newState.movies.concat(action.movies.subjects);
            return newState;

        case FETCH_THEATERS_FAILURE:
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

export default theaters;