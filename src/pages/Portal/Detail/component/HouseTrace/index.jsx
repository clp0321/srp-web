import { useState } from 'react';
import {
  Descriptions,
  Badge,
  Button,
  Timeline,
  Divider,
  Typography,
  Modal,
  Alert,
  message,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from 'umi';
import style from './style.less';

const { Title, Paragraph } = Typography;
const stateArr = new Array(4).fill(false);

const HouseTrace = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(stateArr);
  const handleSet = (key) => {
    const statusList = new Array(4).fill(false);
    statusList[key] = true;
    setStatus(statusList);
  };

  const handleCancel = () => {
    handleSet([]);
    setVisible(false);
  };

  const handleSubmit = () => {
    handleSet([]);
    message.success('房屋评级成功');
    setVisible(false);
  };
  return (
    <>
      <Button
        type="primary"
        className={style.findMore}
        icon={<SearchOutlined />}
        onClick={() => history.push('/srp/blockmessage')}
      >
        更多房源
      </Button>
      <Timeline reverse className={style.timeline}>
        <Timeline.Item>
          <Descriptions title="初始化房源" bordered>
            <Descriptions.Item label="链上哈希">123213213</Descriptions.Item>
            <Descriptions.Item label="产权人">Prepaid</Descriptions.Item>
            <Descriptions.Item label="产权证号"></Descriptions.Item>
            <Descriptions.Item label="房源设备ID">565799449</Descriptions.Item>
            <Descriptions.Item label="上链时间戳" span={3}>
              <Badge status="success" text="2019-04-24 18:00:00" />
            </Descriptions.Item>
            <Descriptions.Item label="详细地址" span={3}>
              深圳市南山区塘朗村
            </Descriptions.Item>
            <Descriptions.Item label="链上哈希" span={3}></Descriptions.Item>
            <Descriptions.Item label="图片cid" span={3}></Descriptions.Item>
          </Descriptions>
        </Timeline.Item>
        <Timeline.Item>
          <Descriptions title="房源1" bordered>
            <Descriptions.Item label="链上哈希">123213213</Descriptions.Item>
            <Descriptions.Item label="产权人">Prepaid</Descriptions.Item>
            <Descriptions.Item label="受代理人"></Descriptions.Item>
            <Descriptions.Item label="房屋受理时间" span={3}>
              <Badge status="processing" text="2019-04-24 18:00:00" />
            </Descriptions.Item>
            <Descriptions.Item label="上链时间戳" span={3}></Descriptions.Item>
            <Descriptions.Item label="图片cid" span={3}></Descriptions.Item>
          </Descriptions>
        </Timeline.Item>
      </Timeline>
      <Button type="primary" className={style.star_btn} onClick={() => setVisible(true)}>
        房屋评级
      </Button>
      <Divider />
      <Title level={4}>说明</Title>
      <Paragraph>
        用户可以对房屋信息进行投票评级，可选的投票包括“可信、一般、怀疑、不可信”四种
      </Paragraph>
      <Paragraph className={style.last_p}>
        您的选票与最终结果是否一致将会影响您的信用分，请谨慎投票
      </Paragraph>
      <Modal
        title="房屋评级"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        className={style.showModal}
      >
        <Alert
          className={status[0] ? style.selected : ''}
          message="确认无误"
          description="实际情况与系统描述完全匹配"
          type="success"
          onClick={() => handleSet(0)}
        />
        <Alert
          className={status[1] ? style.selected : ''}
          message="较为可靠"
          description="实际情况与系统描述基本符合"
          onClick={() => handleSet(1)}
          type="info"
        />
        <Alert
          className={status[2] ? style.selected : ''}
          message="整体一般"
          description="实际情况与系统描述近乎相似"
          type="warning"
          onClick={() => handleSet(2)}
        />
        <Alert
          className={status[3] ? style.selected : ''}
          message="内容虚假"
          description="实际情况与系统描述严重不符"
          type="error"
          onClick={() => handleSet(3)}
        />
      </Modal>
    </>
  );
};

export default HouseTrace;
