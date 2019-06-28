/**
 * 去除图片、视频请求时的referer
 */
import React from 'react';
import {findDOMNode} from 'react-dom';

class NoReferer extends React.PureComponent{
  constructor (props){
    super(props)
  }
  componentDidMount () {
    var el = findDOMNode(this);
    var iframe = document.createElement('iframe');
    let url="http://v3-default.bytecdn.cn/2c567b7586e8ededa777f08caf363fbd/5d13bd07/video/m/220fd0f9017372b42d59d4558abba00012911629e5220000164f6522e4ac/?rc=M3A3OTllZzxtbjMzOzczM0ApQHRAbzk3NzQ8MzgzMzY3MzUzNDVvQGg2dilAZzN3KUBmM3UpZHNyZ3lrdXJneXJseHdmOzpAbWtrY3FzZy0wXy0tYy0wc3MtbyNvIzUxNC0xMi4uMDAuNDM2LTojbyM6YS1vIzpgLXAjOmB2aVxiZitgXmJmK15xbDojMy5e"
    var html = `<video width="250" autoplay controls src=${url}/>`;
    iframe.src = 'javascript:void(function(){document.open();document.write(\'' + html + '\');document.close();}())';
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

export default NoReferer
