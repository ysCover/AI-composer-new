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
        // 从网络接口中获取
        // movies: state.theaters.movies,
        // 从静态文件中获取
        movies: [{'id':'00'},{'id':'01'},{'id':'02'},{'id':'03'},{'id':'04'},{'id':'05'},{'id':'06'},{'id':'07'},
            {'id':'08'},{'id':'09'},{'id':'10'},{'id':'11'},{'id':'12'},{'id':'13'},{'id':'14'},{'id':'15'},{'id':'16'},
            {'id':'17'}],
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