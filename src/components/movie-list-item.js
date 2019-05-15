/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Rating, Icon, Image, Label, Button} from 'semantic-ui-react';
// import imgSongsheet from '../static_files/images/SongSheet/p1.jpeg'
import { Song_Sheet_List } from '../static_files/song-sheet';
import { Song_Sheet_MUSIC_LIST } from '../static_files/songSheetMusic';

/**
 * 电影列表条目
 */

const MovieListItem = ({ movie, favorite, onFavoriteClick }) => {
    // const casts = movie.casts.map(e => e.name).join(' / ');
    // const directors = movie.directors.map(e => e.name).join(' / ');
    // 判断歌单id是否对应电影id
    let index = '0';
    for (let i = 0;i < Song_Sheet_List.length; i ++){
        if (Song_Sheet_List[i].id_to_movie === movie.id){
            index = Song_Sheet_List[i].id;
        }
    }

    // 歌单对应的编曲列表
    // const song_sheet_id = 2730333449;
    return (
        <Card style={{ width: 220, margin: 10}}>
            <Image label={favorite ? {color: 'blue', icon: 'star', content: '已收藏', ribbon: true} : false} />
            <Link to={{ pathname:"/playListInfo", query: { musicInf: Song_Sheet_MUSIC_LIST } }}>
                <img className='logo-image' src={Song_Sheet_List[parseInt(index)].img_path} alt="ComposerLogo" style={{ width:  210, height: 100, margin: 5}}/>
            </Link>
            <Card.Content>
                {/*<Card.Header as='a' className='mb' target='_blank' href={movie.alt}>{ Song_Sheet_List[parseInt(index)].title }</Card.Header>*/}
                <Card.Header as={Link} to={{ pathname:"/playListInfo", query: { musicInf: Song_Sheet_MUSIC_LIST } }} target='_blank'>{ Song_Sheet_List[parseInt(index)].title }</Card.Header>
                {/*<Card.Meta>*/}
                    {/*<span>原名：{movie.original_title}（{movie.year}）</span>*/}
                    {/*<span>创建时间：2019/01/01 </span>*/}
                {/*</Card.Meta>*/}
                <Card.Description>
                    <div className='mb'>
                        {/*<span className="vam">评分：</span><Rating className="vam" size='large' icon="star" defaultRating={Math.round(movie.rating.average/10*5)} maxRating={5} disabled />*/}
                        {/*<Label size='mini' color='green' pointing='left'>豆瓣评分 {movie.rating.average}</Label>*/}
                    </div>
                    {/*<p>id: {movie.id} </p>*/}
                    <p>类型：{ Song_Sheet_List[parseInt(index)].type }</p>
                    <p>时长：{ Song_Sheet_List[parseInt(index)].length } </p>
                    <p>乐器：{ Song_Sheet_List[parseInt(index)].instruments } </p>
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