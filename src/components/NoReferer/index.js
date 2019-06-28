/**
 * 去除图片、视频请求时的referer
 */
import React from 'react';
import {findDOMNode} from 'react-dom';
import propTypes from 'prop-types';

class NoReferer extends React.PureComponent{
  constructor (props){
    super(props)
  }
  componentDidMount () {
    let el = findDOMNode(this);
    let iframe = document.createElement('iframe');
    iframe.src = 'javascript:void(function(){document.open();document.write(\'' + this.props.html + '\');document.close();}())';
    // iframe.style.position = 'fixed';
    iframe.style.width = '400px';
    iframe.style.height = '200px';
    iframe.style.border = 'none';
    iframe.style.zIndex = 10;
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.setAttribute('frameBorder','no')
    iframe.setAttribute('border','0')
    el.appendChild(iframe);
  }
  render(){
    return (
      <div/>
    )
  }
}
NoReferer.PropTypes={
  html:propTypes.string
}
NoReferer.defaultProps={
  html:`<video width="250" autoplay controls src="https://qiniu-video5.vmoviercdn.com/5d1436d18c64a.mp4">`,
}
export default NoReferer
