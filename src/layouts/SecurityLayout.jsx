import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';
import { getAuthority } from '@/utils/authority';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    let isLogin = localStorage.getItem('username');

    const queryString = stringify({
      redirect: window.location.href,
    });

    // 判断访问路径时否是以srp开头
    const path = window.location.pathname;
    // 当前路由是登录页或门户首页则跳过判断
    if (path.includes('/srp') || path.includes('/client')) {
      return children;
    } else {
      if ((!isLogin && loading) || !isReady) {
        return <PageLoading />;
      }
      if (!isLogin && window.location.pathname !== '/client/logining') {
        return <Redirect to={`/client/logining?${queryString}`} />;
      }
      return children;
    }
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
