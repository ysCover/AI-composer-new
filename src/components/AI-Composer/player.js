/* eslint-disable */
import React from 'react';
import Progress from './progress';
import './player.scss';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';
import imgPlayer from '../../static_files/images/CD.png'
import imgLogo from "../../static_files/images/ComposerLogo.JPG";
import {Button} from "semantic-ui-react";

let musictDuration = null;
let Player = React.createClass({
    getInitialState() {
        return {
            progress: '0', // 默认进度为0
            barColor: '#2f9842', // 音量控制条背景颜色
            isPlay: true, // 是否播放或暂停音乐
            seconds: 0 // 当前音乐播放的秒数
        }
    },
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, e=> {
            musictDuration = e.jPlayer.status.duration;
            this.setState({
                seconds: $.jPlayer.convertTime(parseInt(e.jPlayer.status.currentTime)),
                volume: e.jPlayer.options.volume*100,
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    },
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
        musictDuration = null;
    },
    progressChangeHandle(progress) { // 改变音乐播放进度
        $('#player').jPlayer('play', musictDuration * progress);
        this.setState({ isPlay: true});  // 点击暂停后再移动进度条，设置当前音乐状态为播放
    },
    changeVolumeHandler(progress) { // 改变音量大小
        $('#player').jPlayer('volume', progress);
    },
    playMusic() { // 设置播放或暂停音乐
        if(this.state.isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    },
    playPreMusic() { // 上一首歌曲
      Pubsub.publish('PLAY_PRE');
    },
    palyNextMusic() { // 下一首歌曲
      Pubsub.publish('PLAY_NEXT');
    },
    render() {
        return (
            <div className="container-player">
                <h3 className="caption">试听新编曲</h3>
                {/*<h1 className="caption">我的私人历史编曲</h1>*/}
                <div className="container-player mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.cuerrentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.cuerrentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">{this.state.seconds}</div>
                            {/*音量控件*/}
                            <div className="volume-container">
                                <i className="AI-icon-volume rt"></i>
                                    <div className="volume-wrapper">
                                        <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler}
                                            barColor="#aaa" />
                                    </div>
                            </div>
                        </div>
                        {/*进度条*/}
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress progress={this.state.progress}  onProgressChange={this.progressChangeHandle} barColor={this.state.barColor}/>
                        </div>
                        <div className="mt35 mb20 row">
                            {/*播放按钮*/}
                            {/*<h1 className="caption">试听</h1>*/}
                            <div>
                                <i className="icon prev" onClick={this.playPreMusic}></i>
                                <i className="icon ml20 play_test" onClick={this.playMusic}></i>
                                {/*<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.playMusic}></i>*/}
                                <i className="icon ml20 next" onClick={this.palyNextMusic}></i>
                            </div>
                            {/*播放模式*/}
                            <div className="-col-auto">
                                <i className="icon repeat-cycle"></i>
                            </div>
                            <div style={{ margin_bottom:35 }}>
                                <h3><Link to="/list">我的历史编曲</Link></h3>
                            </div>
                        </div>
                    </div>
                    {/*播放图片*/}
                    <div className="-col-auto cover">
                        <img src={imgPlayer} alt="PlayerLogo"  className={`${this.state.isPlay ? 'rotation' : ''}`}/>
                    </div>
                </div>
            </div>
          );
    }
});

export default Player;


