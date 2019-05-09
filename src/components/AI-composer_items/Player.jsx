// /* eslint-disable */
// import React from 'react';
// import Progress from './progress';
// import './player.scss';
// import { Link } from 'react-router-dom';
// import Pubsub from 'pubsub-js';
// import imgPlayer from '../../static_files/images/CD.png'
// import imgLogo from "../../static_files/images/ComposerLogo.JPG";
// import {Button} from "semantic-ui-react";
//
// let musictDuration = null;
// let Player = React.createClass({
//     getInitialState() {
//         return {
//             progress: '0', // 默认进度为0
//             barColor: '#2f9842', // 音量控制条背景颜色
//             isPlay: true, // 是否播放或暂停音乐
//             seconds: 0, // 当前音乐播放的秒数
//         }
//     },
//
//   //   constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     // 是否暂停状态
//   //     isPause: false,
//   //     // 当前音乐列表
//   //     musicList: [
//   //       {
//   //         id: "1",
//   //         title: "打上花火",
//   //         info: "DAOKO,米津玄師",
//   //         resource: require("../../resource/DAOKO,米津玄師 - 打上花火.mp3"),
//   //         time: "04:50",
//   //         img:
//   //           "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
//   //       },
//   //       {
//   //         id: "2",
//   //         title: "渡月橋 ~君 想ふ~",
//   //         info: "倉木麻衣",
//   //         resource: require("../../resource/倉木麻衣 - 渡月橋 ~君 想ふ~.mp3"),
//   //         time: "04:50",
//   //         img:
//   //           "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
//   //       }] || [],
//   //     // 当前音乐
//   //     currentMusic: props.musicList ? props.musicList[0] : {},
//   //     // 总时间
//   //     totalTime: "00:00",
//   //     // 当前播放时间
//   //     currentTime: "00:00",
//   //     // 进度条item是否可拖动
//   //     processItemMove: false,
//   //     // 进度条item是否可拖动
//   //     volumeProcessItemMove: false,
//   //     // 音量控制显示
//   //     volumeControl: false,
//   //     // 当前的播放模式 1列表循环 2随机 3单曲
//   //     playMode: 1,
//   //     // 歌单显示控制, 初始化是显示的
//   //     isMusicListShow: true
//   //   };
//   // },
//
//
//     componentDidMount() {
//         // $('#player').bind($.jPlayer.event.timeupdate, e=> {
//         //     musictDuration = e.jPlayer.status.duration;
//         //     this.setState({
//         //         seconds: $.jPlayer.convertTime(parseInt(e.jPlayer.status.currentTime)),
//         //         volume: e.jPlayer.options.volume*100,
//         //         progress: e.jPlayer.status.currentPercentAbsolute
//         //     });
//         // });
//
//         const audio = this.audio;
//         // 这里需要设置audio的canplay事件监听
//         audio.addEventListener("canplay", () => {
//           //获取总时间
//           const totalTime = parseInt(audio.duration);
//           this.setState({
//             totalTime: this.getTime(totalTime)
//           });
//         });
//         // 播放中添加时间变化监听
//         audio.addEventListener("timeupdate", () => {
//           const { processItemMove } = this.state;
//           //获取当前播放时间
//           const currentTime = parseInt(audio.currentTime);
//           // 缓存对象
//           const buffered = audio.buffered;
//           // 当前缓存时间
//           let bufferTime = 0;
//           if (buffered.length !== 0) {
//             bufferTime = buffered.end(buffered.length - 1);
//           }
//           // 当前缓存缓存宽度计算 500是进度条宽度
//           const bufferWidth = 300 * (bufferTime / audio.duration);
//           // 当前播放宽度计算 500是进度条宽度
//           const playWidth = 300 * (audio.currentTime / audio.duration);
//           // 如果正在拖动进度条的时候，不监听播放进度
//           if (!processItemMove) {
//             this.processPlayed.style.width = `${playWidth}px`;
//             this.processItem.style.left = `${playWidth - 4}px`;
//             // 未拖动时根据时间变化设置当前时间
//             this.setState({
//               currentTime: this.getTime(currentTime)
//             });
//           }
//           this.processBuffered.style.width = `${bufferWidth}px`;
//         });
//         // 当前音乐播放完毕监听
//         audio.addEventListener("ended", () => {
//           this.endedPlayMusic();
//         });
//         // 初始化音量
//         this.initVolumeProcess();
//     },
//     componentWillUnMount() {
//         $('#player').unbind($.jPlayer.event.timeupdate);
//         musictDuration = null;
//     },
//     progressChangeHandle(progress) { // 改变音乐播放进度
//         $('#player').jPlayer('play', musictDuration * progress);
//         this.setState({ isPlay: true});  // 点击暂停后再移动进度条，设置当前音乐状态为播放
//     },
//     changeVolumeHandler(progress) { // 改变音量大小
//         $('#player').jPlayer('volume', progress);
//     },
//     playMusic() { // 设置播放或暂停音乐
//         if(this.state.isPlay) {
//             $('#player').jPlayer('pause');
//         } else {
//             $('#player').jPlayer('play');
//         }
//         this.setState({
//             isPlay: !this.state.isPlay
//         });
//     },
//     playPreMusic() { // 上一首歌曲
//       Pubsub.publish('PLAY_PRE');
//     },
//     palyNextMusic() { // 下一首歌曲
//       Pubsub.publish('PLAY_NEXT');
//     },
//
//     render() {
//         const {
//           currentMusic,
//           isPause,
//           totalTime,
//           currentTime,
//           volumeControl,
//           playMode,
//           isMusicListShow
//         } = this.state;
//         const { title, info, img, resource, id } = currentMusic || {};
//
//         return (
//             <div className="container-player">
//                 <h3 className="caption">试听新编曲</h3>
//                 {/*<h1 className="caption">我的私人历史编曲</h1>*/}
//                 <div className="container-player mt20 row">
//                     <div className="controll-wrapper">
//                         <h2 className="music-title">{this.props.cuerrentMusicItem.title}</h2>
//                         <h3 className="music-artist mt10">{this.props.cuerrentMusicItem.artist}</h3>
//                         <div className="row mt20">
//                             <div className="left-time -col-auto">{this.state.seconds}</div>
//                             {/*音量控件*/}
//                             <div className="volume-container">
//                                 <i className="AI-icon-volume rt"></i>
//                                     <div className="volume-wrapper">
//                                         <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler}
//                                             barColor="#aaa" />
//                                     </div>
//                             </div>
//                         </div>
//
//
//                         {/*进度条*/}
//                         <div style={{height: 10, lineHeight: '10px'}}>
//                             {/*<Progress progress={this.state.progress}  onProgressChange={this.progressChangeHandle} barColor={this.state.barColor}/>*/}
//                             <div className="process-time">
//                               <div
//                                 style={{ width: 300 }}
//                                 className="process-wrapper"
//                                 onClick={this.onProcessClick}
//                                 ref={ref => (this.process = ref)}
//                               >
//                                 <div className="process">
//                                   <div
//                                     className="progress-buffered"
//                                     ref={ref => (this.processBuffered = ref)}
//                                   />
//                                   <div
//                                     className="progress-played"
//                                     ref={ref => (this.processPlayed = ref)}
//                                   >
//                                     {/*进度条上的小按钮*/}
//                                     <div
//                                       className="process-item"
//                                       ref={ref => (this.processItem = ref)}
//                                       onMouseDown={this.onProcessItemMouseDown}
//                                       // onMouseUp={this.onProcessItemMouseUp}
//                                     >
//                                       <div className="process-item-inside" />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                               {/*播放时间*/}
//                               <div className="time">
//                                 <span className="current-time">{currentTime}</span>/
//                                 <span className="total-time">{totalTime}</span>
//                               </div>
//                             </div>
//                         </div>
//
//
//                         {/*<div className="process-time">*/}
//                           {/*<div*/}
//                             {/*className="process-wrapper"*/}
//                             {/*onClick={this.onProcessClick}*/}
//                             {/*ref={ref => (this.process = ref)}*/}
//                           {/*>*/}
//                             {/*<div className="process">*/}
//                               {/*<div*/}
//                                 {/*className="progress-buffered"*/}
//                                 {/*ref={ref => (this.processBuffered = ref)}*/}
//                               {/*/>*/}
//                               {/*<div*/}
//                                 {/*className="progress-played"*/}
//                                 {/*ref={ref => (this.processPlayed = ref)}*/}
//                               {/*>*/}
//                                 {/*/!*进度条上的小按钮*!/*/}
//                                 {/*<div*/}
//                                   {/*className="process-item"*/}
//                                   {/*ref={ref => (this.processItem = ref)}*/}
//                                   {/*onMouseDown={this.onProcessItemMouseDown}*/}
//                                   {/*// onMouseUp={this.onProcessItemMouseUp}*/}
//                                 {/*>*/}
//                                   {/*<div className="process-item-inside" />*/}
//                                 {/*</div>*/}
//                               {/*</div>*/}
//                             {/*</div>*/}
//                           {/*</div>*/}
//                           {/*/!*播放时间*!/*/}
//                           {/*<div className="time">*/}
//                             {/*<span className="current-time">{currentTime}</span>/*/}
//                             {/*<span className="total-time">{totalTime}</span>*/}
//                           {/*</div>*/}
//                         {/*</div>*/}
//
//
//                         <div className="mt35 mb20 row">
//                             {/*播放按钮*/}
//                             {/*<h1 className="caption">试听</h1>*/}
//
//                             {/*播放  上一首  下一首*/}
//                             <audio src={resource} ref={ref => (this.audio = ref)} />
//                             <div>
//                                 {/*autostart="true"*/}
//                                 {/*<a href="../../resource/midi_test.mid"> midi</a>*/}
//                                 {/*<embed src="../../resource/midi_test.mid"  width="100px" hight="50px" autostart="true"/>*/}
//                                 <i className="icon prev" onClick={this.playPreMusic}>
//                                     {/*<embed src="../../resource/midi_test.mid"  autostart="true" />*/}
//                                 </i>
//                                 <i className="icon ml20 play_test" onClick={this.playMusic}></i>
//                                 {/*<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.playMusic}></i>*/}
//                                 <i className="icon ml20 next" onClick={this.palyNextMusic}></i>
//                             </div>
//                             {/*播放模式*/}
//                             <div className="-col-auto">
//                                 <i className="icon repeat-cycle"></i>
//                             </div>
//                             <div style={{ margin_bottom:35 }}>
//                                 <h3><Link to="/list">我的历史编曲</Link></h3>
//                             </div>
//                         </div>
//
//
//                         {/*<div className="process-time">*/}
//                           {/*<div*/}
//                             {/*className="process-wrapper"*/}
//                             {/*onClick={this.onProcessClick}*/}
//                             {/*ref={ref => (this.process = ref)}*/}
//                           {/*>*/}
//                             {/*<div className="process">*/}
//                               {/*<div*/}
//                                 {/*className="progress-buffered"*/}
//                                 {/*ref={ref => (this.processBuffered = ref)}*/}
//                               {/*/>*/}
//                               {/*<div*/}
//                                 {/*className="progress-played"*/}
//                                 {/*ref={ref => (this.processPlayed = ref)}*/}
//                               {/*>*/}
//                                 {/*/!*进度条上的小按钮*!/*/}
//                                 {/*<div*/}
//                                   {/*className="process-item"*/}
//                                   {/*ref={ref => (this.processItem = ref)}*/}
//                                   {/*onMouseDown={this.onProcessItemMouseDown}*/}
//                                   {/*// onMouseUp={this.onProcessItemMouseUp}*/}
//                                 {/*>*/}
//                                   {/*<div className="process-item-inside" />*/}
//                                 {/*</div>*/}
//                               {/*</div>*/}
//                             {/*</div>*/}
//                           {/*</div>*/}
//                           {/*/!*播放时间*!/*/}
//                           {/*<div className="time">*/}
//                             {/*<span className="current-time">{currentTime}</span>/*/}
//                             {/*<span className="total-time">{totalTime}</span>*/}
//                           {/*</div>*/}
//                         {/*</div>*/}
//
//
//
//                     </div>
//                     {/*播放图片*/}
//                     <div className="-col-auto cover">
//                         <img src={imgPlayer} alt="PlayerLogo"  className={`${this.state.isPlay ? 'rotation' : ''}`}/>
//                     </div>
//                 </div>
//             </div>
//           );
//     }
// });
//
// export default Player;
//
//
