/**
 * 适合feed 流的播放器，只有一个在播放状态，滑出视口暂停播放
 */
import React from 'react';
import Player from 'xgplayer';
import {findDOMNode} from 'react-dom';
import propTypes from 'prop-types'
import {uid} from '../../utils/index'

class VideoPlayer extends React.PureComponent {
  static instances=[] // feed 流里使用，当一个实例播放时，另一个应该关闭
  static setCurrentPlayInstance=(player)=>
    VideoPlayer.instances.forEach(instance=>{
        if (instance !== player) {
          instance.pause();
        }
      }
    )
  constructor (props) {
    super(props);
    this.id = uid(props.key);
    this.state = {
      hasShow: false
    };
    this.config = {
      id: this.id,
      width: '100%',
      height: '100%',
      // fluid: true,
      videoInit: true,
      // autoplay: true,
      // autoplayMuted: true,
      // cssFullscreen: true,
      playsinline: true,
      // ignores: ['volume', 'time', 'fullscreen', 'loading', 'flex'],
      // pluginIgnores: ['fullscreen'],
      poster: 'http://duososo.com/bing_pic/20190619.jpg',
      url: [{src: 'http://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4', type: 'video/mp4'}]
    };
  }
  componentDidMount () {
    const config={
      ...this.config,
      ...this.props.config
    }
    this.player = new Player(config);
    VideoPlayer.instances.push(this.player);
    this.player.on('play', ()=>{
      VideoPlayer.setCurrentPlayInstance(this.player);
      console.log('play');
    });
    this.player.once('ready', ()=>{ console.log('ready'); });

    const option = {
      rootMargin: '0px 0px 20px 0px',
      threshold: [0.5], // 可视范围不足50% 暂停播放
    };
    let el = findDOMNode(this);
    let io = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          this.player.pause();
          return;
        }
        this.setState({hasShow: true});
        target.onload = target.onerror = () => io.unobserve(target);
      });
    }, option);
    io.observe(el);

  }
  componentWillMount () {
    let index = VideoPlayer.instances.indexOf(this.player);
    VideoPlayer.instances.splice(index, 1);
  }

  render () {
    return (
      <div style={{height: 200}} id={this.id}/>
    );
  }
}

VideoPlayer.propTypes={
  src:propTypes.string,
  style:propTypes.object,
  config:propTypes.object,
}
VideoPlayer.defaultProps={
  style:{
    width:400,
    height:200,
  }
}
export default VideoPlayer;


