import { useEffect } from 'react';
import { Link, connect } from 'umi';
import { Typography, Modal, message } from 'antd';
import { ForkOutlined } from '@ant-design/icons';
import RentHome from '@/components/RentHome';
import logUrl from '@/assets/images/easy-rent.png';
import style from './PortalLayout.less';

const { Text } = Typography;

// Welcome表头
const WelcomeHeader = () => {
  return (
    <div className={style.logo}>
      <img src={logUrl} />
      <Text strong>易租链</Text>
      <Text strong>
        <ForkOutlined />
        <Link to="/srp/blockmessage"> 信息溯源</Link>
      </Text>
    </div>
  );
};

const PortalLayout = (props) => {
  const { children, dispatch } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  });

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

export default connect((global) => ({collapsed: global.collapsed}))(PortalLayout);