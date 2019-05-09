/* eslint-disable */
import React, {Component} from 'react';
import './player.scss';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';
import imgPlayer from '../../static_files/images/CD.png'
// import imgLogo from "../../static_files/images/ComposerLogo.JPG";
import {Button} from "semantic-ui-react";

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // isPlay: true,
          // 是否暂停状态
          isPause: false,
          // 当前音乐列表
          musicList: props.musicList || [],
          // 当前音乐
          currentMusic: props.musicList ? props.musicList[0] : {},
          // 总时间
          totalTime: "00:00",
          // 当前播放时间
          currentTime: "00:00",
          // 进度条item是否可拖动
          processItemMove: false,
          // 进度条item是否可拖动
          volumeProcessItemMove: false,
          // 音量控制显示
          volumeControl: false,
          // 当前的播放模式 1列表循环 2随机 3单曲
          playMode: 1,
          // 歌单显示控制, 初始化是显示的
          isMusicListShow: true
        };
    }

    componentDidMount() {
        const audio = this.audio;
        // 这里需要设置audio的canplay事件监听
        audio.addEventListener("canplay", () => {
          //获取总时间
          const totalTime = parseInt(audio.duration);
          this.setState({
            totalTime: this.getTime(totalTime)
          });
        });
        // 播放中添加时间变化监听
        audio.addEventListener("timeupdate", () => {
          const { processItemMove } = this.state;
          //获取当前播放时间
          const currentTime = parseInt(audio.currentTime);
          // 缓存对象
          const buffered = audio.buffered;
          // 当前缓存时间
          let bufferTime = 0;
          if (buffered.length !== 0) {
            bufferTime = buffered.end(buffered.length - 1);
          }
          // 当前缓存缓存宽度计算 500是进度条宽度
          const bufferWidth = 300 * (bufferTime / audio.duration);
          // 当前播放宽度计算 300是进度条宽度
          const playWidth = 300 * (audio.currentTime / audio.duration);
          // 如果正在拖动进度条的时候，不监听播放进度
          if (!processItemMove) {
            this.processPlayed.style.width = `${playWidth}px`;
            this.processItem.style.left = `${playWidth - 4}px`;
            // 未拖动时根据时间变化设置当前时间
            this.setState({
              currentTime: this.getTime(currentTime)
            });
          }
          this.processBuffered.style.width = `${bufferWidth}px`;
        });

        // 当前音乐播放完毕监听
        audio.addEventListener("ended", () => {
          this.endedPlayMusic();
        });
        // 初始化音量
        this.initVolumeProcess();
      }

      // 秒转换-分:秒的格式
      getTime = time => {
        if (time) {
          const minute = parseInt((time / 60) % 60);
          const second = parseInt(time % 60);
          let minuteText = `${minute}`;
          let secondText = `${second}`;
          if (minute < 10) {
            minuteText = `0${minute}`;
          }
          if (second < 10) {
            secondText = `0${second}`;
          }
          return `${minuteText}:${secondText}`;
        } else {
          return "00:00";
        }
      };

    // 播放
      onPlay = () => {
        const audio = this.audio;
        this.setState({ isPause: true });
        audio.play();
      };

      // 暂停
      onPause = () => {
        const audio = this.audio;
        this.setState({ isPause: false });
        audio.pause();
      };

      // 点击进度条
      onProcessClick = e => {
        this.setProcess(e, "click");
      };

      // 设置进度条进度
      setProcess = (e, key) => {
        // 获取当前点击偏移宽度
        let offsetWidth = e.pageX - this.processPlayed.getBoundingClientRect().left;
        // 需要限制拖动范围，不能超出左右边界
        if (offsetWidth < 0) {
          offsetWidth = 0;
        }
        if (offsetWidth > this.process.offsetWidth) {
          offsetWidth = this.process.offsetWidth;
        }
        // 计算偏移比例
        const offsetPercentage = offsetWidth / this.process.offsetWidth;
        // 计算当前时间
        const currentTime = this.audio.duration * offsetPercentage;
        if (key === "click" || key === "dragMove") {
          // 设置当前进度条偏移位置
          this.processPlayed.style.width = `${offsetWidth}px`;
          this.processItem.style.left = `${offsetWidth - 4}px`;
          this.setState({ currentTime: this.getTime(currentTime) });
        }
        // 设置当前音乐进度 拖拽不需要及时计算播放进度，会导致音乐像快进一样的效果，体验很差，点击进度条是需要及时设置当前播放进度的
        if (key === "dragEnd" || key === "click") {
          this.audio.currentTime = currentTime;
        }
      };

      //  进度条item MouseDown
      onProcessItemMouseDown = e => {
        // 阻止事件冒泡
        e.stopPropagation();
        // 按下后置item为可拖动状态
        this.setState({ processItemMove: true });
      };
      //  进度条item MouseMove
      onProcessItemMouseMove = e => {
        // 阻止事件冒泡
        e.stopPropagation();
        const { processItemMove } = this.state;
        if (processItemMove) {
          this.setProcess(e, "dragMove");
        }
      };
      //  进度条item MouseUp
      onProcessItemMouseUp = e => {
        const { processItemMove } = this.state;
        // 阻止事件冒泡
        e.stopPropagation();
        // 这里的判断是关键，一定要判断是处于processItemMove=true的状态，表示当前正在拖动进度条，不然会导致mouseUp和onClick事件的传播问题
        if (processItemMove) {
          this.setState({ processItemMove: false });
          // 松开后置item为禁止拖动的状态
          this.setProcess(e, "dragEnd");
        }
      };

      // 当前音乐播放结束后下一首音乐处理 根据当前的播放模式决定下一首音乐是什么
      endedPlayMusic = () => {
        const { playMode, currentMusic } = this.state;
        const { musicList } = this.state;
        if (musicList.length > 0 && currentMusic) {
          const currentIndex = musicList.findIndex(item => {
            return item.id === currentMusic.id;
          });
          // 列表循环
          if (playMode === 1) {
            if (musicList[currentIndex + 1]) {
              this.setState({ currentMusic: musicList[currentIndex + 1] }, () => {
                this.onSwitchAction();
              });
            } else {
              this.setState({ currentMusic: musicList[0] }, () => {
                this.onSwitchAction();
              });
            }
          }
          // 列表随机
          else if (playMode === 2) {
            const randomIndex = Math.floor(Math.random() * 3 + 1);
            if (musicList[randomIndex + 1]) {
              this.setState({ currentMusic: musicList[randomIndex + 1] }, () => {
                this.onSwitchAction();
              });
            } else {
              this.setState({ currentMusic: musicList[0] }, () => {
                this.onSwitchAction();
              });
            }
          }
          // 单曲循环
          else if (playMode === 3) {
            this.onSwitchAction();
          }
        } else {
          // 当前播放列表已经空了，则不自动切歌，播放完毕后，直接重置当前的播放的音乐
          this.onSwitchAction();
        }
      };

      // 下一首歌
      nextMusic = () => {
        const { currentMusic } = this.state;
        const { musicList } = this.state;
        if (musicList.length > 1 && currentMusic) {
          const currentIndex = musicList.findIndex(item => {
            return item.id === currentMusic.id;
          });
          if (musicList[currentIndex + 1]) {
            this.setState({ currentMusic: musicList[currentIndex + 1] }, () => {
              this.onSwitchAction();
            });
          } else {
            this.setState({ currentMusic: musicList[0] }, () => {
              this.onSwitchAction();
            });
          }
        } else {
          this.audio.currentTime = 0;
          this.onSwitchAction();
        }
      };
      // 上一首歌
      previousMusic = () => {
        const { currentMusic } = this.state;
        const { musicList } = this.state;
        if (musicList.length > 1 && currentMusic) {
          const currentIndex = musicList.findIndex(item => {
            return item.id === currentMusic.id;
          });
          if (musicList[currentIndex - 1]) {
            this.setState({ currentMusic: musicList[currentIndex - 1] }, () => {
              this.onSwitchAction();
            });
          } else {
            this.setState({ currentMusic: musicList[musicList.length - 1] }, () => {
              this.onSwitchAction();
            });
          }
        } else {
          this.audio.currentTime = 0;
          this.onSwitchAction();
        }
      };

      // 切歌后相关操作，如果正在播放中，则切歌后还是会直接播放，如果处于暂停，则切歌后不会直接播放
      onSwitchAction = () => {
        const { isPause } = this.state;
        // 处于暂停标志，则表示正在播放中，则重置进度条后，直接调用播放，否则就只重置进度条，不调用播放
        this.resetProcess();
        if (isPause) {
          this.onPlay();
        }
      };

      // 重新设置当前缓存和播放进度状态，用于切歌后的进度条显示
      resetProcess = () => {
        this.processPlayed.style.width = "0px";
        this.processItem.style.left = "-4px";
      };

      // 音量控制条显示隐藏
      onVolumeControl = () => {
        const { volumeControl } = this.state;
        this.setState({ volumeControl: !volumeControl });
      };

      // 隐藏音量设置条
      onVolumeControlHide = () => {
        const { volumeControl } = this.state;
        if (volumeControl) {
          this.setState({ volumeControl: false });
        }
      };
      // 初始化音量
      initVolumeProcess = () => {
        // 获取当前音量条长度
        const processWidth = this.volumeProcess.offsetWidth;
        // 设置进度条
        this.volumeProcessCurrent.style.width = `${processWidth / 2}px`;
        // 设置音量
        this.audio.volume = 0.5;
      };

      // 音量控制条点击
      onVolumeProcessSet = e => {
        // 获取当前音量条长度
        const processLength = this.volumeProcess.offsetWidth;
        // 获取当前点击偏移量
        let volumeOffsetWidth =
          processLength -
          (e.pageX - this.volumeProcess.getBoundingClientRect().left);
        // 当前音量进度比例
        let volumepercentage = 0;
        if (volumeOffsetWidth < 0) {
          volumeOffsetWidth = 0;
        }
        if (volumeOffsetWidth > processLength) {
          volumeOffsetWidth = processLength;
        }
        volumepercentage = 1 - volumeOffsetWidth / processLength;
        // 设置进度条
        this.volumeProcessCurrent.style.width = `${processLength - volumeOffsetWidth}px`;
        // 设置音量
        this.audio.volume = volumepercentage;
      };

      // 音量item鼠标按下方法监听
      onVolumeProcessItemMouseDown = () => {
        // 设置当前进入可拖动状态
        this.setState({ volumeProcessItemMove: true });
      };

      // 音量item鼠标抬起方法监听
      onVolumeProcessItemMouseUp = e => {
        const { volumeProcessItemMove } = this.state;
        if (volumeProcessItemMove) {
          this.setState({ volumeProcessItemMove: false });
        }
      };

      // 音量item鼠标拖拽方法监听
      onVolumeProcessItemMove = e => {
        const { volumeProcessItemMove } = this.state;
        if (volumeProcessItemMove) {
          this.onVolumeProcessSet(e);
        }
      };

      // 设置音乐播放模式
      onPlayModeChange = () => {
        const { playMode } = this.state;
        if (playMode === 3) {
          this.setState({ playMode: 1 });
        } else {
          this.setState({ playMode: playMode + 1 });
        }
      };




    render() {
        const {
          currentMusic,
          isPause,
          totalTime,
          currentTime,
          volumeControl,
          playMode,
          isMusicListShow
        } = this.state;
        const { title, info, img, resource, id } = currentMusic || {};

        const { musicList } = this.state;
        let playModeIcon = "";
        switch (playMode) {
          case 1:
            playModeIcon = "icon-circulation-list";
            break;
          case 2:
            playModeIcon = "icon-circulation-random";
            break;
          case 3:
            playModeIcon = "icon-circulation-single";
            break;
          default:
            playModeIcon = "icon-circulation-list";
            break;
        }
        return (
            <div className="container-player">
                <h3 className="caption">试听新编曲</h3>
                <div className="container-player mt20 row">
                    <div className="control-wrapper">
                        {/*<h2 className="music-title">{this.props.cuerrentMusicItem.title}</h2>*/}
                        {/*<h3 className="music-artist mt10">{this.props.cuerrentMusicItem.artist}</h3>*/}

                        <h2 className="music-title">New Music Demo</h2>
                        <h3 className="music-artist mt10">作者：my_user_name</h3>

                       {/* 音量控件 */}
                        <div className="row mt20">
                            <div className="AI-controler">
                              {/*小喇叭图标*/}
                              <span
                                className="icon-volume volume"
                                onClick={this.onVolumeControl}
                              />
                              <div className="volume-container">
                                {/* 音量控制条，这里采用的是style控制，因为需要获取到音量条的ref，如果不存在这个节点，就获取不到ref*/}
                                <div
                                  onMouseMove={this.onVolumeProcessItemMove}
                                  onMouseUp={this.onVolumeProcessItemMouseUp}
                                >
                                  {/*音量控制条*/}
                                  <div
                                      className="process"
                                      style={{ background: "#fff"}}
                                    onClick={this.onVolumeProcessSet}
                                    ref={ref => (this.volumeProcess = ref)}
                                  >
                                    <div className="progress-played"
                                         style={{ background: "#000"}}
                                         ref={ref => (this.volumeProcessCurrent = ref)}
                                    >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>


                        {/*进度条*/}
                        <div style={{height: 10, lineHeight: '10px'}}>
                            {/*<Progress progress={this.state.progress}  onProgressChange={this.progressChangeHandle} barColor={this.state.barColor}/>*/}
                            <div className="process-time">
                              <div
                                style={{ width: 300 }}
                                className="process-wrapper"
                                onClick={this.onProcessClick}
                                ref={ref => (this.process = ref)}
                              >
                                <div className="process">
                                  <div
                                    className="progress-played"
                                    ref={ref => (this.processPlayed = ref)}
                                  >
                                    {/*进度条上的小按钮*/}
                                    <div
                                      className="process-item"
                                      ref={ref => (this.processItem = ref)}
                                      onMouseDown={this.onProcessItemMouseDown}
                                      // onMouseUp={this.onProcessItemMouseUp}
                                    >
                                      <div className="process-item-inside" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*播放时间*/}
                              <div className="time">
                                <span className="current-time">{currentTime}</span>/
                                <span className="total-time">{totalTime}</span>
                              </div>
                            </div>
                        </div>


                        {/*播放  上一首  下一首*/}
                        <div className="mt35 mb20 row">
                          {/*<h3 style={{ font: "16", color: "#545454", margin:"10"}}>试听</h3>*/}
                            {/* 控制器，播放，上一首，下一首 */}
                            <div className="left-controler">
                              <span
                                className="icon prev "
                                onClick={this.previousMusic}
                              />
                              {isPause ? (
                                <span className="icon ml20 pause " onClick={this.onPause} />
                              ) : (
                                <span className="icon ml20 play_test" onClick={this.onPlay} />
                              )}
                              <span
                                className="icon ml20 next"
                                onClick={this.nextMusic}
                              />
                            </div>

                            {/*循环模式，歌单查看*/}
                            <div className="AI-controler-Mode">
                              <span
                                className={`${playModeIcon} circulation`}
                                onClick={this.onPlayModeChange}
                              />
                              {/*显示音乐列表*/}
                              {/*<span className="icon-list list" onClick={this.onMusicList} />*/}
                            </div>

                            {/*<div className="-col-auto">*/}
                                {/*<i className="icon repeat-cycle"></i>*/}
                            {/*</div>*/}
                            <div style={{ margin_bottom:35 }}>
                                <h3><Link to="/list">我的历史编曲</Link></h3>
                            </div>
                        </div>


                    </div>
                    {/*播放图片*/}
                    <div className="-col-auto cover">
                        <img src={imgPlayer} alt="PlayerLogo"  className={`${this.state.isPause ? 'rotation' : ''}`}/>
                    </div>

                    {/*播放器*/}
                    <audio src={resource} ref={ref => (this.audio = ref)} />
                </div>
            </div>
          );
    }
}

export default Player;


