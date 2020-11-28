import { useEffect } from 'react';
import { Link, connect } from 'umi';
import { Typography } from 'antd';
import RentHome from '@/components/RentHome';
import logUrl from '@/assets/images/yzl_logo.png';
import trace from '@/assets/introduce/trace.png';
import search_home from '@/assets/introduce/search_home.png';

import style from './PortalLayout.less';

const { Text } = Typography;

// Welcome表头
const WelcomeHeader = () => {
  return (
    <div className={style.logo}>
      <img src={logUrl} className={style.home_logo} />
      <Text strong className={style.log_list}>
        <img src={search_home} />
        <Link to="/srp/rent" className={style.search_home}>
          深圳租房
        </Link>
        <img src={trace} />
        <Link to="/srp/blockmessage">信息溯源</Link>
      </Text>
    </div>
  );
};

const PortalLayout = (props) => {
  const { children, dispatch, currentUser } = props;

  // 保存当前身份用户
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  });

  const path = location.pathname;

  let header = path === '/srp/welcome' ? <WelcomeHeader /> : <RentHome pathname={path} />;

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

export default connect(({ global, login }) => ({
  collapsed: global.collapsed,
  currentUser: login.currentUser,
}))(PortalLayout);
