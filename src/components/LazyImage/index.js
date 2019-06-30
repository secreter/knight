/**
 * 图片懒加载
 */
require('intersection-observer');
import React from 'react';
import {findDOMNode} from 'react-dom';
import propTypes from 'prop-types';

class LazyImage extends React.PureComponent{
  constructor (props){
    super(props)
    this.state={
      hasShow:false
    }
    this.observer=null
  }
  componentDidMount () {
    let el = findDOMNode(this);
    this.observer = new IntersectionObserver(changes => {
      changes.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) { return; }
        this.setState({hasShow: true});
        target.onload = target.onerror = () => this.observer.unobserve(target);
      });
    }, this.props.option);
    this.observer.observe(el);
  }

  componentWillUnmount () {
    this.observer.disconnect();
  }

  render(){
    return (
      <img {...this.props} src={this.state.hasShow ? this.props.src : void 0}/>
    )
  }
}
LazyImage.propTypes={
  style:propTypes.object,
  option:propTypes.object,
  src:propTypes.string,
}
LazyImage.defaultProps={
  style:{
    width:400,
    height:200,
  },
  option:{
    rootMargin: '0px 0px 20px 0px'
  },
}
export default LazyImage
