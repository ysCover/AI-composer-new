/* eslint-disable */
import React, {Component} from 'react';
import {MUSIC_LIST} from './saveMusiclist';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Pubsub from 'pubsub-js';
import {Button} from "semantic-ui-react";
import Player from "./Player.jsx"

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [
        {
          id: "1",
          title: "打上花火",
          info: "DAOKO,米津玄師",
          resource: require("../../resource/DAOKO,米津玄師 - 打上花火.mp3"),
          time: "04:50",
          img:
            "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
        },
        {
          id: "2",
          title: "美丽的神话Ⅰ",
          info: "成龙,金喜善",
          resource: require("../../resource/成龙,金喜善 - 美丽的神话Ⅰ.mp3"),
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
