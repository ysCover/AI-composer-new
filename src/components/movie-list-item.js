import React, { Component } from 'react';
import { Card, Rating, Icon, Image, Label } from 'semantic-ui-react';

/**
 * 电影列表条目
 */

export default class MovieListItem extends Component {
    render () {
        const movie = this.props.movie;
        const isFavorite = this.props.favorite;
        const onFavoriteClick = this.props.onFavoriteClick;
        const casts = movie.casts.map(e => e.name).join(' / ');
        const directors = movie.directors.map(e => e.name).join(' / ');

        return (
            <Card>
                <Image fluid centered src={movie.images.large} label={isFavorite ? {color: 'blue', icon: 'star', content: '已收藏', ribbon: true} : false} />
                <Card.Content>
                    <Card.Header as='a' className='mb' target='_blank' href={movie.alt}>{movie.title}</Card.Header>
                    <Card.Meta>
                        <span>原名：{movie.original_title}（{movie.year}）</span>
                    </Card.Meta>
                    <Card.Description>
                        <div className='mb'>
                            <span className="vam">评分：</span><Rating className="vam" size='large' icon="star" defaultRating={Math.round(movie.rating.average/10*5)} maxRating={5} disabled />
                            <Label size='mini' color='green' pointing='left'>豆瓣评分 {movie.rating.average}</Label>
                        </div>
                        <p>导演：{directors}</p>
                        <p>主演：{casts}</p>
                        <p>类型：{movie.genres.join(' / ')}</p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a className="left floated" target='_blank' href={movie.alt}><Icon name='external' size='large' />查看详情</a>
                    <span className="right floated" onClick={() => onFavoriteClick(movie)}>
                        {isFavorite ? (
                            <Icon name='star' size='large' color='blue' />
                        ) : (
                            <Icon name='empty star' size='large' color='grey' />
                        )}
                    </span>
                </Card.Content>
            </Card>
        );
    };
}