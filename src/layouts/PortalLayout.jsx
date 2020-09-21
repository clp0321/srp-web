import { Link } from 'umi';
import { Typography } from 'antd';
import style from './PortalLayout.less';
import logUrl from '@/assets/images/easy-rent.png';

const { Text, Title } = Typography;

// Rent页表头
const RentHome = () => {
  return (
    <>
      <div className={style.header_l}>
        <div className={style.header_home}>
          <h3>
            <Link to="/srp/welcome">首页</Link>
          </h3>
        </div>
        <h3>深圳</h3>
        <h3>
          <a href="#">[切换城市]</a>
        </h3>
      </div>
      <div className={style.header_r}>
        <div className={style.h_r_link}>
          <Link to="/client/logining">登陆</Link>
          <span className={style.gap}>|</span>
          <Link to="/client/register">注册</Link>
        </div>
      </div>
      <i className={style.h_r_icon}></i>
    </>
  );
};

// Welcome表头
const WelcomeHeader = () => {
  return (
    <div className={style.logo}>
      <img src={logUrl} />
      <Text strong>屹租链</Text>
      <Text strong>信息溯源</Text>
      
    </div>
  );
};

const PortalLayout = (props) => {
  const { children } = props;
  let header = location.pathname === '/srp/welcome' ? <WelcomeHeader /> : <RentHome />;
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

export default PortalLayout;
