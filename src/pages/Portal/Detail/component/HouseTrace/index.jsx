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
  Tooltip,
} from 'antd';
import { DollarOutlined, KeyOutlined } from '@ant-design/icons';
import style from './style.less';

const { Title, Paragraph, Text } = Typography;
const { Item } = Descriptions;
const stateArr = new Array(4).fill(false);

/**
 * house_id
 * visitor
 * time
 */

// mock看房记录
const mockWathRoom = [
  {
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    visitor: '罗*寸',
    time: '2020-10-03 09:30:00',
  },
  {
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    visitor: '刘*刚',
    time: '2020-10-04 14:00:00',
  },
  {
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    visitor: '相*奎',
    time: '2020-10-06 10:00:00',
  },
  {
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    visitor: '刘*瑶',
    time: '2020-8-24 15:33:00',
  },
  {
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    visitor: '李*杰',
    time: '2020-7-15 15:33:00',
  },
  {
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    visitor: '唐*钧',
    time: '2020-7-06 15:33:00',
  },
];
/**
 * order_id、house_id、lessor房东、lessee租客、start_time、end_time、
 * rent租金、type：日租、月租、status 0 等待确定、1 已确定、2 正在进行、3 已完成
 */

// mock订单记录
const mockOrderList = [
  {
    order_id: '1180003',
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    lessor: 'did:weid:1:0xf4e5f96de0627960c8b91c1cc126f7b5cdeacbd0',
    lessee: 'did:weid:1:0xf484b94a7db6fc787e8772f370e8cbaa7d2a8d2d',
    start_time: '2020-10-03 00:00:00',
    end_time: '2020-12-03 00:00:00',
    rent: '2000',
    type: 1,
    status: 0, // 正在进行
  },
  {
    order_id: '1180002',
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    lessor: 'did:weid:1:0xf4e5f96de0627960c8b91c1cc126f7b5cdeacbd0',
    lessee: 'did:weid:1:0xa938133ab8f0d9c6e1662c58787a548aaff9e444',
    start_time: '2020-9-01 00:00:00',
    end_time: '2020-10-01 00:00:00',
    rent: '2000',
    type: 1, // 月租
    status: 1, // 已确定
  },
  {
    order_id: '1180001',
    house_id:
      '6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    lessor: 'did:weid:1:0xf4e5f96de0627960c8b91c1cc126f7b5cdeacbd0',
    lessee: 'did:weid:1:0x05fe20363ccb6ca882e8e1c337329fe0993df39b',
    start_time: '2020-8-28 15:33:00',
    end_time: '2020-7-28 15:33:00',
    rent: '2000',
    type: 1,
    status: 1, // 已确定
  },
];

const HouseTrace = ({ picUrl }) => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(stateArr);
  const [picVisible, setPicVisible] = useState(false);
  const [watchRoomVisible, setWatchVisible] = useState(false);
  const [recordVisible, setRecordVisible] = useState(false);
  const [imgSrc, setImgUrl] = useState(null);

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

  // cid查询图片详情
  const showPic = async () => {
    setImgUrl(picUrl);
    setPicVisible(true);
  };

  // 看房组件
  const WatchRoom = ({ data, index }) => {
    return (
      <Timeline.Item>
        <Descriptions title={`看房记录-${index + 1}`}>
          <Item label="游客">{data.visitor}</Item>
          <Item label="看房时间">{data.time}</Item>
        </Descriptions>
      </Timeline.Item>
    );
  };

  // 订单组件
  const OrderComponent = ({ data, index }) => {
    const { order_id, lessor, lessee, start_time, end_time, rent, type, status } = data;
    return (
      <Timeline>
        <Descriptions title={`订单号-${order_id}`} column={2}>
          <Item label="房东">
            <Tooltip title={lessor}>
              <Text style={{ width: 180 }} ellipsis>
                {lessor}
              </Text>
            </Tooltip>
          </Item>
          <Item label="租客">
            <Tooltip title={lessee}>
              <Text ellipsis style={{ width: 180 }}>
                {lessee}
              </Text>
            </Tooltip>
          </Item>
          <Item label="订单开始时间">{start_time}</Item>
          <Item label="订单截至时间">{end_time}</Item>
          <Item label="租金">{rent}</Item>
          <Item label="租赁类型">{type === 1 ? '月租' : '日租'}</Item>
          <Item label="订单状态">
            <Badge status={status === 1 ? 'success' : 'processing'} />
            {status === 1 ? '已确定' : '正在处理'}
          </Item>
        </Descriptions>
      </Timeline>
    );
  };

  // 时间溯源界面
  const TimeTraceLine = ({ data }) => {
    return (
      <Descriptions title="房源记录" bordered>
        <Item label="产权人">daqing</Item>
        <Item label="房屋状态">
          <Badge status="processing" />
          出租中
        </Item>
        <Item label="代理人">李明</Item>
        <Item label="设备Id">
          <Tooltip title="6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12">
            <Text ellipsis={true} style={{ width: 200 }}>
              6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12
            </Text>
          </Tooltip>
        </Item>
        <Item label="认证等级">4</Item>
        <Item label="信息摘要">
          <Text ellipsis={true} copyable>
            34ec33c44d2344f426ab653d7863a0ff928b605f87b60541fb6195fcabe913a2
          </Text>
        </Item>
        <Item label="房源Id" span={3}>
          <Text ellipsis={true} copyable>
            6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
          </Text>
        </Item>
        <Item label="图片Cid" span={3}>
          <a onClick={showPic}>QmdAj1dEFJv1ABAgJYxpU6xZcwcGy563nXF1cfiP64Xpwz</a>
        </Item>
        <Item label="时间戳" span={3}>
          2020-10-07 08:11:14
        </Item>
      </Descriptions>
    );
  };

  // 看房记录
  const watch_all = mockWathRoom
    .reverse()
    .map((item, index) => <WatchRoom data={item} index={index} key={item.visitor} />);

  // 订单记录
  const record_all = mockOrderList.map((item, index) => (
    <OrderComponent index={index} data={item} />
  ));

  return (
    <>
      {/* 头部按钮集 */}
      <div className={style.watch_list}>
        <Button
          type="primary"
          className={style.watch_record}
          icon={<KeyOutlined />}
          onClick={() => setWatchVisible(true)}
        >
          看房记录
        </Button>
        <Button type="danger" icon={<DollarOutlined />} onClick={() => setRecordVisible(true)}>
          订单记录
        </Button>
      </div>
      {/* 房源溯源记录 */}
      <Timeline reverse className={style.timeline}>
        <Timeline.Item>
          <Descriptions title="房源记录-1" bordered>
            <Item label="产权人">daqing</Item>
            <Item label="房屋状态" style={{ width: 110 }}>
              <Badge status="default" />
              未出租
            </Item>
            <Item label="代理人">无</Item>
            <Item label="设备Id">
              <Tooltip title="6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12">
                <Text ellipsis={true} style={{ width: 200 }}>
                  6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12
                </Text>
              </Tooltip>
            </Item>
            <Item label="认证等级" style={{ width: 110 }}>
              2
            </Item>
            <Item label="信息摘要">
              <Text ellipsis={true} copyable>
                2fb48ee814269fb67e2987659e0792ae2f378eba54cd141bbdc021da5a811c2
              </Text>
            </Item>
            <Item label="房源Id" span={3}>
              <Text ellipsis={true} copyable>
                6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
              </Text>
            </Item>
            <Item label="图片Cid" span={3}>
              <a onClick={showPic}>QmTq99WTkcgvDQ8F4sQGf6kBhmaQoo9mpod9kp4Rf51N5T</a>
            </Item>
            <Item label="时间戳" span={3}>
              2020-10-01 08:11:14
            </Item>
          </Descriptions>
        </Timeline.Item>
        <Timeline.Item>
          <Descriptions title="房源记录-2" bordered>
            <Item label="产权人">daqing</Item>
            <Item label="房屋状态">
              <Badge status="processing" />
              出租中
            </Item>
            <Item label="代理人">李明</Item>
            <Item label="设备Id">
              <Tooltip title="6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12">
                <Text ellipsis={true} style={{ width: 200 }}>
                  6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12
                </Text>
              </Tooltip>
            </Item>
            <Item label="认证等级">4</Item>
            <Item label="信息摘要">
              <Text ellipsis={true} copyable>
                34ec33c44d2344f426ab653d7863a0ff928b605f87b60541fb6195fcabe913a2
              </Text>
            </Item>
            <Item label="房源Id" span={3}>
              <Text ellipsis={true} copyable>
                6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
              </Text>
            </Item>
            <Item label="图片Cid" span={3}>
              <a onClick={showPic}>QmdAj1dEFJv1ABAgJYxpU6xZcwcGy563nXF1cfiP64Xpwz</a>
            </Item>
            <Item label="时间戳" span={3}>
              2020-10-07 08:11:14
            </Item>
          </Descriptions>
        </Timeline.Item>
      </Timeline>
      {/* 用户参与投票 */}
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
      {/* 房屋评级 */}
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
      {/* 显示ipfs图片 */}
      <Modal
        title="房源图片"
        visible={picVisible}
        onCancel={() => setPicVisible(false)}
        footer={null}
      >
        <img src={imgSrc} alt="房源图片" style={{ width: '100%' }} />
        <Paragraph className={style.ipfs_con} ellipsis>
          <Tooltip title="12D3KooWQzdCMc5ZZevX7tSj8na872Cp9tXqSpQNxnTYdFjQsMPj">
            <Text strong>所在IPFS节点：12D3KooWQzdCMc5ZZevX7tSj8na872Cp9tXqSpQNxnTYdFjQsMPj</Text>
          </Tooltip>
        </Paragraph>
        <Paragraph>
          <Text strong>图片Cid：</Text>QmTq99WTkcgvDQ8F4sQGf6kBhmaQoo9mpod9kp4Rf51N5T
        </Paragraph>
        <Paragraph>
          <Text strong>图片时间戳：</Text>1601597474000
        </Paragraph>
      </Modal>
      {/* 显示看房记录 */}
      <Modal
        title="看房记录"
        visible={watchRoomVisible}
        onCancel={() => setWatchVisible(false)}
        footer={null}
      >
        <Timeline reverse>{watch_all}</Timeline>
      </Modal>
      {/* 显示订单记录 */}
      <Modal
        title="订单记录"
        visible={recordVisible}
        onCancel={() => setRecordVisible(false)}
        footer={null}
      >
        <Timeline>{record_all}</Timeline>
      </Modal>
    </>
  );
};

export default HouseTrace;
