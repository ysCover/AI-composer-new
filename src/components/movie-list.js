import React, { Component } from 'react';
import { Card, Button, Message, Loader } from 'semantic-ui-react';
import MovieListItem from './movie-list-item';

/**
 * 电影列表组件
 */
export default class MovieList extends Component {
    // 这个方法会在组件加载完毕之后立即执行。在这个时候之后组件已经生成了对应的DOM结构
    componentDidMount () {
        if (this.props.onRender && !this.props.movies.length) {
            this.props.onRender(this.props.keyword);
        }
    };

    // 组件更新.在组件接收到一个新的prop时被执行。这个方法在初始化render时不会被调用。
    componentWillReceiveProps (nextProps) {
        if (nextProps.keyword !== this.props.keyword && this.props.onRender) {
            this.props.onRender(nextProps.keyword);
        }
    }

    render () {
        let { movies, favorites, keyword, onFavoriteClick, onLoadMore, isFetching, count, start, total } = this.props;
        const isFavoritesList = movies === null;
        isFavoritesList && (movies = favorites);
        const isShowLoadMore = total > start + count;
        const nextStart = start + count;
        const cards = movies.map(movie => {
            // 检测该音乐素材库是否已被收藏
            let favorite = isFavoritesList ? true : favorites.some( f => f.id === movie.id);
            return <MovieListItem key={movie.id} movie={movie} favorite={favorite} onFavoriteClick={onFavoriteClick} />
       });


        if (isFetching && !movies.length > 0) {
            return (
                <Loader active size='large'>加载中...</Loader>
            );
        }

        return movies.length > 0 ? (
            <div className='composer-div' >
                <Card.Group stackable>
                    {cards}
                </Card.Group>
                {isShowLoadMore && (
                    <Button
                        basic
                        size='large'
                        disabled={isFetching}
                        loading={isFetching}
                        attached='bottom'
                        className='load-more'
                        onClick={() => onLoadMore(nextStart, keyword)}
                    >加载更多</Button>
                )}
            </div>
        ) : (
            <div>
                <Message
                    icon={isFavoritesList ? 'smile' : 'frown'}
                    color='teal'
                    header={isFavoritesList ? '你还没收藏任何编曲哦' : '抱歉，没有相关音乐内容'}
                    content={isFavoritesList ? '快去试试AI作曲家吧！' : '可能服务器出现了异常，请稍后再试吧！'}
                />
            </div>
        );
    }
}