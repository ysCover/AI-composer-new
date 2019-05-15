/* eslint-disable */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Pubsub from 'pubsub-js';
import {Button} from "semantic-ui-react";
import Player from "./Player.jsx";
import { HISTORY_MUSIC_LIST } from "../../static_files/historyMusic";

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: HISTORY_MUSIC_LIST || []
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
          <Player
            musicList={musicList}
            onDeleteMusic={this.onDeleteMusic}
            onDeleteAllMusic={this.onDeleteAllMusic}
          />
          <div>
              <Button  className='composer-button2'>下载</Button>
              <Button id='arranging-download' className='composer-button2'>收藏</Button>
              <Button id='arranging-start' className='composer-button2'>重新编曲</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
