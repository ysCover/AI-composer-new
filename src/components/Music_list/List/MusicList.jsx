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
        },
        //   {
        //   id: "4",
        //   title: "test",
        //   info: "me",
        //   resource: require("../../../resource/midi_test.mid"),
        //   time: "04:50",
        //   img:
        //     "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
        //  }
          {
          id: "4",
          title: "jazz_demo_04",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-03-31.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "5",
          title: "jazz_demo_05",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-20-21-41.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "6",
          title: "jazz_demo_06",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-17-48.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "7",
          title: "jazz_demo_07",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-15-55.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "8",
          title: "jazz_demo_08",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-12-23.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "9",
          title: "jazz_demo_09",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-10-46.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "10",
          title: "jazz_demo_10",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-14-21.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "11",
          title: "jazz_demo_11",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-21-05-11.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "12",
          title: "jazz_demo_12",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-20-59-45.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "13",
          title: "jazz_demo_13",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-20-57-58.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "14",
          title: "jazz_demo_14",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-20-54-35.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
        },
          {
          id: "13",
          title: "jazz_demo_13",
          info: "jazz, 60s,  piano",
          resource: require("../../../resource/midi_to_mp3-2019-04-16-20-56-24.mp3"),
          time: "01:00",
          img:
            "https://www.ranchosf.com/uploads/allimg/170908/176-1FZQKQCa.png"
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
