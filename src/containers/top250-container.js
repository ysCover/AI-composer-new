import { connect } from 'react-redux';
import { toggleFavorite, fetchTop250 } from '../actions';
import MovieList from '../components/movie-list';

// 状态到组件属性的映射函数
const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.top250.isFetching,
        count: state.top250.count,
        start: state.top250.start,
        total: state.top250.total,
        movies: state.top250.movies,
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
            dispatch(fetchTop250());
        },
        onLoadMore (nextStart) {
            dispatch(fetchTop250(true, nextStart));
        }
    };
};

const Top250Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);

export default Top250Container;