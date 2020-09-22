import React, { Component } from 'react';
import Banner from './banner/index';
import style from './style.less';

export default class Contain extends Component {
  render() {
    const { children } = this.props;
    const pathname = window.location.pathname;
    return (
      <div className={style.root}>
        <div className={style.left}>
          <Banner />
        </div>
        <div className={style.right}>
          <div className={style.box}>
            <div className={style.header}>
              {pathname === '/client/logining' ? '欢迎登陆' : '欢迎注册'}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
