import { connect } from 'react-redux';
import { toggleFavorite, fetchSearch, changeKeyword } from '../actions';
import AI_composer_page from '../components/AI_composer_page';

// 状态到组件属性的映射函数
const mapStateToProps = (state, ownProps) => {
    return {
        keyword: ownProps.match.params.keyword,
        isFetching: state.search.isFetching,
        count: state.search.count,
        start: state.search.start,
        total: state.search.total,
        movies: state.search.movies,
        favorites: state.favorites
    };
};

// 分派函数到组件属性的映射函数
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFavoriteClick (movie) {
            dispatch(toggleFavorite(movie));
        },
        onKeywordChange (keyword) {
            dispatch(changeKeyword(keyword));
        },
        onRender (keyword) {
            if (keyword) {
                dispatch(fetchSearch(keyword));
            }
        },
        onLoadMore (nextStart, keyword) {
            dispatch(fetchSearch(keyword, true, nextStart));
        }
    };
};

const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AI_composer_page);

export default SearchContainer;