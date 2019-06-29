/**
 * 监听组件是否可视
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
 */
import React from 'react';
import {findDOMNode} from 'react-dom';

const VisibleHOC=(Component,options)=>
  class VisibleEvent extends React.PureComponent{
    static defaultProps={
      onShow:()=>void 0,
      onHide:()=>void 0,
      onFirstShow:()=>void 0,
    }
    constructor (props){
      super(props)
      this.config = { };
      this.observer=null;
      this.hasShowed=false
    }
    componentDidMount () {
      let el = findDOMNode(this); //limit only one root node
      // Create an observer instance linked to the callback function
      this.observer = new IntersectionObserver(this.intersectionCallback,options);

      // Start observing the target node for configured mutations
      this.observer.observe(el, this.config);
    }
    componentWillUnmount () {
      // Later, you can stop observing
      this.observer.disconnect();
    }

    intersectionCallback = (entries) => {
      const {onShow,onHide,onFirstShow}=this.props
      entries.forEach((item) => { // 遍历entries数组
        if(item.isIntersecting){ // 当前元素可见
          onShow()
          !this.hasShowed&&onFirstShow()
          // io.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数
        }else{
          this.hasShowed&&onHide()
        }
      })
    };

    render(){
      const props={...this.props}
      delete props.onShow
      delete props.onHide
      delete props.onFirstShow
      return (
        <Component {...props}/>
      )
    }
  }
export default VisibleHOC
