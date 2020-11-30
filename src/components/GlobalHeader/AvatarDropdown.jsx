import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;
    const username = localStorage.getItem('username');
    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
          payload: { username },
        }).then((data) => {
          if (data) {
            localStorage.removeItem('username');
          } else {
            message.error('退出失败');
          }
        });
      }
    } else {
      history.push(`/account`);
    }
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        userName: '',
      },
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="center">
          <UserOutlined />
          账户中心
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.userName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={currentUser.avatar}
            alt="avatar"
            style={{ backgroundColor: currentUser.role === 1 ? '#f56a00' : '#7265e6' }}
          >
            {currentUser.role === 1 ? '售' : '租'}
          </Avatar>
          <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
