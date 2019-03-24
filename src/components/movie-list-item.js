import React from 'react';
/* eslint-disable */
import { Card, Rating, Icon, Image, Label } from 'semantic-ui-react';
/* eslint-disable */

/**
 * 电影列表条目
 */

const MovieListItem = ({ movie, favorite, onFavoriteClick }) => {
    // const casts = movie.casts.map(e => e.name).join(' / ');
    // const directors = movie.directors.map(e => e.name).join(' / ');
    return (
        <Card style={{ width: 250, margin: 8.5}}>
            {/*<Image fluid centered src={movie.images.large} label={favorite ? {color: 'blue', icon: 'star', content: '已收藏', ribbon: true} : false} />*/}
            <Image label={favorite ? {color: 'blue', icon: 'star', content: '已收藏', ribbon: true} : false} />
            <Card.Content>
                {/*<Card.Header as='a' className='mb' target='_blank' href={movie.alt}>{movie.title}</Card.Header>*/}
                <Card.Header as='a' className='mb' target='_blank' href={movie.alt}>Music Demo1</Card.Header>
                <Card.Meta>
                    {/*<span>原名：{movie.original_title}（{movie.year}）</span>*/}
                    <span>作曲时间：2019/01/01 </span>
                </Card.Meta>
                <Card.Description>
                    <div className='mb'>
                        {/*<span className="vam">评分：</span><Rating className="vam" size='large' icon="star" defaultRating={Math.round(movie.rating.average/10*5)} maxRating={5} disabled />*/}
                        {/*<Label size='mini' color='green' pointing='left'>豆瓣评分 {movie.rating.average}</Label>*/}
                    </div>
                    {/*<p>导演：{directors}</p>*/}
                    {/*<p>主演：{casts}</p>*/}
                    <p>类型：古典音乐</p>
                    <p>时长：10s </p>
                    <p>乐器：钢琴 </p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {/*<a className="left floated" target='_blank' href={movie.alt}><Icon name='external' size='large' />查看详情</a>*/}
                <Icon name='download' size='large' />下载
                <Icon name='delete' size='large' />删除
                <span className="right floated" onClick={() => onFavoriteClick(movie)}>
                    {favorite ? (
                        <Icon name='star' size='large' color='blue' />
                    ) : (
                        <Icon name='empty star' size='large' color='grey' />
                    )}
                </span>
            </Card.Content>
        </Card>
    );
};

export default MovieListItem;