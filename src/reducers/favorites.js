import { TOGGLE_FAVORITE } from '../constants/action-types';

// 收藏的电影
const favorites = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            let index = state.findIndex(movie => movie.id === action.movie.id);
            let newState = [...state];
            index !== -1 ? newState.splice(index, 1) : newState.push(action.movie);
            return newState;

        default:
            return state;
    }
};

export default favorites;
