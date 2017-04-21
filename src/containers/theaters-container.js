import { connect } from 'react-redux';
import { toggleFavorite, fetchTheaters } from '../actions';
import MovieList from '../components/movie-list';

// 状态到组件属性的映射函数
const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.theaters.isFetching,
        count: state.theaters.count,
        start: state.theaters.start,
        total: state.theaters.total,
        movies: state.theaters.movies,
        favorites: state.favorites
    };
};

// 分派函数到组件属性的映射函数
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFavoriteClick (movie) {
            dispatch(toggleFavorite(movie));
        },
        onRender () {
            dispatch(fetchTheaters());
        },
        onLoadMore (nextStart) {
            dispatch(fetchTheaters(true, nextStart));
        }
    };
};

const TheatersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);

export default TheatersContainer;