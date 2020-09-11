import { Divider, Typography } from 'antd';
import style from './style.less';

const { Text } = Typography;

const BaseInfo = ({ name }) => {
  return (
    <div className={style.divider}>
      <Divider type="vertical" />
      <Text strong>{name}</Text>
    </div>
  );
};
export default BaseInfo;
