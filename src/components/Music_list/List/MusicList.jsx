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


class SongSheetPlayList extends Component {
  constructor(props) {
    super(props);
    // 获取传入的music列表信息
    this.state = {
        musicList: this.props.location.query.musicInf || []
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
