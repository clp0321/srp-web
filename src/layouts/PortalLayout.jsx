import { Link, connect } from 'umi';
import { Typography, Modal, message } from 'antd';
import { setAuthority } from '@/utils/authority';
import { HomeOutlined, LoginOutlined, LogoutOutlined, ForkOutlined } from '@ant-design/icons';
import { getAuthority } from '@/utils/authority'
import logUrl from '@/assets/images/easy-rent.png';
import Avatar from 'antd/lib/avatar/avatar';
import style from './PortalLayout.less';

const { Text } = Typography;

// Rent页表头
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
  }

  // 退出
  const handleLogout = () => {
    Modal.confirm({
      title: '确认退出本系统？',
      onOk: () => {
        setAuthority('');
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
            <HomeOutlined />
            <Link to="/srp/welcome">首页</Link>
          </h3>
        </div>
        <h3>深圳</h3>
        <h3>
          <a href="#">[切换城市]</a>
        </h3>
      </div>
      <div className={style.header_r}>
        {currentUser && currentUser.userName ? (
          <div className={style.user}>
            <Avatar size="small" src={currentUser.avatar} alt="avatar" />
            <span>当前登陆用户：{currentUser.userName}</span>
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

// Welcome表头
const WelcomeHeader = () => {
  return (
    <div className={style.logo}>
      <img src={logUrl} />
      <Text strong>屹租链</Text>
      <Text strong>
        <ForkOutlined />
        <Link to="/srp/blockmessage"> 信息溯源</Link>
      </Text>
    </div>
  );
};

const PortalLayout = (props) => {
  const { children, dispatch, currentUser = { avatar: '', userName: '' } } = props;
  let header =
    location.pathname === '/srp/welcome' ? (
      <WelcomeHeader />
    ) : (
      <RentHome currentUser={currentUser} />
    );

  return (
    <div className={style.layout_contain}>
      <div className={style.header}>
        <div className={style.header_w}>{header}</div>
      </div>
      <div className={style.con}>{children}</div>
      <div className={style.footer}>
        <Text strong>&copy;深圳市计算机学会</Text>
      </div>
    </div>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(PortalLayout);
