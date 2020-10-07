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
import { DollarOutlined, KeyOutlined } from '@ant-design/icons';
import style from './style.less';

const { Title, Paragraph, Text } = Typography;
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

  // owner: 房东、agency、house_id、device、digest:信息摘要、grade：认证等级、status、房屋状态
  return (
    <>
      <div className={style.watch_list}>
        <Button
          type="primary"
          className={style.watch_record}
          icon={<KeyOutlined />}
          onClick={() => {}}
        >
          看房记录
        </Button>
        <Button type="danger" icon={<DollarOutlined />} onClick={() => {}}>
          订单记录
        </Button>
      </div>
      <Timeline reverse className={style.timeline}>
        <Timeline.Item>
          <Descriptions title="房源记录-1" bordered>
            <Descriptions.Item label="产权人">daqing</Descriptions.Item>
            <Descriptions.Item label="房屋状态">
              <Badge status="default" />
              未出租
            </Descriptions.Item>
            <Descriptions.Item label="代理人">无</Descriptions.Item>
            <Descriptions.Item label="设备Id">
              <Text ellipsis={true} style={{ width: 200 }}>
                6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="认证等级">4</Descriptions.Item>
            <Descriptions.Item label="信息摘要">
              <Text ellipsis={true} copyable>
                2fb48ee814269fb67e2987659e0792ae2f378eba54cd141bbdc021da5a811c2
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="房源Id" span={3}>
              <Text ellipsis={true} copyable>
                6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="图片Cid" span={3}>
              <a>QmTq99WTkcgvDQ8F4sQGf6kBhmaQoo9mpod9kp4Rf51N5T</a>
            </Descriptions.Item>
            <Descriptions.Item label="时间戳" span={3}>
              2020-10-02 08:11:14
            </Descriptions.Item>
          </Descriptions>
        </Timeline.Item>
        <Timeline.Item>
          <Descriptions title="房源记录-2" bordered>
            <Descriptions.Item label="产权人">daqing</Descriptions.Item>
            <Descriptions.Item label="房屋状态">
              <Badge status="processing" />
              出租中
            </Descriptions.Item>
            <Descriptions.Item label="代理人">李明</Descriptions.Item>
            <Descriptions.Item label="设备Id">
              <Text ellipsis={true} style={{ width: 200 }}>
                6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="认证等级">4</Descriptions.Item>
            <Descriptions.Item label="信息摘要">
              <Text ellipsis={true} copyable>
                34ec33c44d2344f426ab653d7863a0ff928b605f87b60541fb6195fcabe913a2
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="房源Id" span={3}>
              <Text ellipsis={true} copyable>
                6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="图片Cid" span={3}>
              <a>QmdAj1dEFJv1ABAgJYxpU6xZcwcGy563nXF1cfiP64Xpwz</a>
            </Descriptions.Item>
            <Descriptions.Item label="时间戳" span={3}>
              2020-10-02 08:11:14
            </Descriptions.Item>
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
