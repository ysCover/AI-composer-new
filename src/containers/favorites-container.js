import { connect } from 'react-redux';
import { toggleFavorite } from '../actions';
import MovieList from '../components/movie-list';

// 状态到组件属性的映射函数
const mapStateToProps = (state, ownProps) => {
    return {
        movies: null,
        favorites: state.favorites
    };
};

// 分派函数到组件属性的映射函数
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFavoriteClick (movie) {
            dispatch(toggleFavorite(movie));
        }
    };
};

const FavoritesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);

export default FavoritesContainer;