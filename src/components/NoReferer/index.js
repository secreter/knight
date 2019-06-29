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

  render(){
    const {html,style}=this.props
    let src = 'javascript:void(function(){document.open();document.write(\'' + html + '\');document.close();}())';
    const props={
      frameBorder:0,
      border:0,
      src,
      style,
      ...this.props
    }
    return (
      <iframe {...props}/>
    )
  }
}
NoReferer.propTypes={
  html:propTypes.string,
  style:propTypes.object,
}
NoReferer.defaultProps={
  style:{
    width:400,
    height:200,
    border:'none'
  },
  html:`<video width="250" autoplay controls src="https://qiniu-video5.vmoviercdn.com/5d1436d18c64a.mp4">`,
}
export default NoReferer
