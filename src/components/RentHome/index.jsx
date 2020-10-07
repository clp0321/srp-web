import { connect, Link } from 'umi';
import { Avatar, Modal } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { getAuthority, setAuthority } from '@/utils/authority';
import style from './style.less';

const RentHome = ({ currentUser }) => {
  // 登入
  const handleLogin = () => {
    // 判断当前是否登入
    const user = getAuthority()[0];
    if (!user) {
      message.warning('请先登入本系统');
    }
    const w = window.open('about:blank');
    w.location.href = '/';
  };

  // 退出
  const handleLogout = () => {
    Modal.confirm({
      title: '确认退出本系统？',
      onOk: () => {
        setAuthority('');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        window.location.reload();
      },
      onCancel: () => {},
    });
  };
  return (
    <>
      <div className={style.header_l}>
        <div className={style.header_home}>
          <h3>
            <Link to="/srp/welcome">首页</Link>
          </h3>
        </div>
        <h3>
          <Link to="/srp/rent">深圳租房</Link>
        </h3>
        {/* <h3>
          <a href="#">[切换城市]</a>
        </h3> */}
      </div>
      <div className={style.header_r}>
        {currentUser && currentUser.userName ? (
          <div className={style.user}>
            <Avatar size="small" src={currentUser.avatar} alt="avatar" />
            <span>
              {currentUser.role === 1 ? '房东' : '租客'}：{currentUser.userName}
            </span>
            <span>
              <LoginOutlined />
              <a onClick={handleLogin} style={{ marginRight: 10 }}>
                进入子系统
              </a>
              <LogoutOutlined />
              <a onClick={handleLogout}>退出系统</a>
            </span>
          </div>
        ) : (
          <div className={style.h_r_link}>
            <Link to="/client/logining">登陆</Link>
            <span className={style.gap}>|</span>
            <Link to="/client/register">注册</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(RentHome);
