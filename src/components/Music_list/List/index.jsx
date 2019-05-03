 /* eslint-disable */
import React, {Component} from 'react'
import { Icon } from 'antd'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { addSong2Que, playSong2Que } from './store/actionCreators'
// import { specIndex, formatDuration } from '../utils'
import './style.styl'
import { SheetSongList } from '../../../static_files/sheet-song-list'
 // 插入音乐播放组件
 import AudioPlay from "../Audio_play/AudioPlay";
// import {Icon, Menu} from "semantic-ui-react";

// import {NavLink} from "react-router-dom";

// const renderArtist = (song) => {
//   const artists = song.artists || song.ar
//   return (
//     <div className="artist">
//       {artists.map(artist => (
//         <Link key={artist.name} to={{ pathname: `/artistinfo/${artist.id}` }}>
//           {' '}
//           {artist.name}
//         </Link>
//       ))}
//     </div>
//   )
// };
// class SongSheetPlayList extends Component{
// // function SongList(props) {
//   // const { tracks, isShowAr = true } = props;
//   render (){
//       // 怎样把素材库ID传进来
//     // const { playlist } = this.props;
//     // const {
//     //   coverImgUrl, name, description, tags,
//     // } = playlist;
//     // const { id } = playlist;
//       return (
//           <div className="songList">
//               <p className="play-all-btn">素材库</p>
//               <div className="cover-img">
//                 {/*<img src={coverImgUrl} alt="cover-img" />*/}
//               </div>
//               <p className="play-all-btn">播放全部({SheetSongList.length})</p>
//               <ul className="container">
//                 {SheetSongList.map((song, index) => (
//                   <li className="item" key={song.id}>
//                     <div className="section-one">
//                       <span className="index">index: {index}        </span>
//                       <span className="name">song name: {song.name}</span>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <AudioPlay
//                 musicList={musicList}
//                 onDeleteMusic={this.onDeleteMusic}
//                 onDeleteAllMusic={this.onDeleteAllMusic}
//               />
//           </div>
//       );
//   };
//
// }
// export default SongSheetPlayList;


class SongSheetPlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [
        {
          id: "1",
          title: "打上花火",
          info: "DAOKO,米津玄師",
          resource: require("../../../resource/DAOKO,米津玄師 - 打上花火.mp3"),
          time: "04:50",
          img:
            "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
        },
        {
          id: "2",
          title: "渡月橋 ~君 想ふ~",
          info: "倉木麻衣",
          resource: require("../../../resource/倉木麻衣 - 渡月橋 ~君 想ふ~.mp3"),
          time: "04:50",
          img:
            "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
        },
        {
          id: "3",
          title: "美丽的神话Ⅰ",
          info: "成龙,金喜善",
          resource: require("../../../resource/成龙,金喜善 - 美丽的神话Ⅰ.mp3"),
          time: "04:50",
          img:
            "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
        }
      ]
    };
  }
  // 删除指定音乐
  onDeleteMusic = id => {
    const { musicList } = this.state;
    const newMusicList = [];
    musicList.forEach(item => {
      if (item.id !== id) {
        newMusicList.push(item);
      }
    });
    this.setState({ musicList: newMusicList });
  };
  // 删除全部音乐
  onDeleteAllMusic = () => {
    this.setState({ musicList: [] });
  };

  render() {
    const { musicList } = this.state;
    return (
      <div>
        <div className="App-Content">
          <div>this is play</div>
          <AudioPlay
            musicList={musicList}
            onDeleteMusic={this.onDeleteMusic}
            onDeleteAllMusic={this.onDeleteAllMusic}
          />
        </div>
      </div>
    );
  }
}

export default SongSheetPlayList;
