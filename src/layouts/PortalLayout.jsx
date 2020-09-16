import style from './PortalLayout.less';
import { Link } from 'umi';

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
    <>
      <div className={style.header_l}>
        <h3>深圳</h3>
        <span>
          [ <a href="#">切换城市</a> <a href="#">广州</a>
          <a href="#">东莞</a> <a href="#">珠海</a>
          <a href="#">汕头</a> ]
        </span>
      </div>
      <div className={style.weather}></div>
      <div className={style.wyzf}>
        <h3>
          <Link to="/srp/rent">我要租房</Link>
        </h3>
      </div>
    </>
  );
};

const PortalLayout = (props) => {
  const { children } = props;
  let header = location.pathname === '/srp/welcome' ? <WelcomeHeader /> : <RentHome />
  return (
    <div className={style.layout_contain}>
      <div className={style.header}>
        <div className={style.header_w}>
          {header}
        </div>
      </div>
      <div className={style.con}>{children}</div>
      <div className={style.footer}>
        <p>
          5G物联网区块链共享租赁平台为您提供全网安全有保障的房源信息，让您租房更安心，使用更放心！
        </p>
        <p>&copy;深圳计算机学会</p>
      </div>
    </div>
  );
};

export default PortalLayout;
