import { connect, Link } from 'umi';
import { Avatar, Modal } from 'antd';
import { MacCommandOutlined, LogoutOutlined } from '@ant-design/icons';
import { getAuthority, setAuthority } from '@/utils/authority';
import home_new from '@/assets/introduce/home-new.png';
import search_home from '@/assets/introduce/search_home.png';
import trace from '@/assets/introduce/trace.png';
import style from './style.less';

const RentHome = ({ currentUser, pathname }) => {
  // 登入
  const handleLogin = () => {
    // 判断当前是否登入
    const user = getAuthority()[0];
    if (!user) {
      message.warning('请先登入本系统');
    }
    window.open('/');
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
            <img src={home_new} />
            <Link to="/srp/welcome">首页</Link>
          </h3>
        </div>
        <h3>
          {/* 信息溯源=>深圳租房 租房=>信息溯源 */}
          {pathname.includes('/blockmessage') ? (
            <>
              <img src={search_home} />
              <Link to="/srp/rent">深圳租房</Link>
            </>
          ) : pathname.includes('/rent') ? (
            <>
              <img src={trace} />
              <Link to="/srp/blockmessage">信息溯源</Link>
            </>
          ) : (
            <>
              <img src={search_home} />
              <Link to="/srp/rent" style={{ marginRight: 10 }}>
                深圳租房
              </Link>
              <img src={trace} />
              <Link to="/srp/blockmessage">信息溯源</Link>
            </>
          )}
        </h3>
      </div>
      <div className={style.header_r}>
        {currentUser && currentUser.userName ? (
          <div className={style.user}>
            <Avatar
              size="small"
              src={currentUser.avatar}
              alt="avatar"
              style={{ backgroundColor: currentUser.role === 1 ? '#f56a00' : '#7265e6' }}
            >
              {currentUser.role === 1 ? '售' : '租'}
            </Avatar>
            <span>
              {currentUser.role === 1 ? '房东' : '租客'}：{currentUser.userName}
            </span>
            <span>
              <MacCommandOutlined />
              <a onClick={handleLogin}>进入子系统</a>
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
