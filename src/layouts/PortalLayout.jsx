import style from './PortalLayout.less';
import { Link } from 'umi';

const HeaderHome = () => {
  return (
    <>
      <div className={style.header_l}>
        <h3>深圳</h3>
        <span>
          <a href="#">[切换城市]</a>
        </span>
      </div>
      <div className={style.header_home}>
        <h3>
          <Link to="/srp/welcome">首页</Link>
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

const PortalLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.layout_contain}>
      <div className={style.header}>
        <div className={style.header_w}>
          <HeaderHome />
        </div>
      </div>
      {/* <div className={style.con}>{children}</div> */}
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
