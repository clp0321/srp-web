import { useState } from 'react';
import { Typography, Input, Table, Badge, Button, Divider } from 'antd';
import CountUp from 'react-countup';
import moment from 'moment';
import peerUrl from '@/assets/images/peer.png';
import blockHeightUrl from '@/assets/images/block_height.png';
import certificate from '@/assets/images/certificate.png';
import transaction from '@/assets/images/transactions.png';
import logoUrl from '@/assets/images/easy-rent.png';
import webank from '@/assets/images/webank.jpg';
import style from './style.less';

const { Title, Text, Paragraph } = Typography;

// mock区块节点信息
const mockData = [
  {
    title: '当前节点数',
    imgUrl: peerUrl,
    num: 4,
  },
  {
    title: '区块高度',
    imgUrl: blockHeightUrl,
    num: 220,
  },
  {
    title: '总交易数',
    imgUrl: transaction,
    num: 3314,
  },
  {
    title: '总存证数',
    imgUrl: certificate,
    num: 1547,
  },
];

// mock节点信息数
const dataSource = [
  {
    peer: '微众节点1',
    location: 'http://localhost:8888',
    status: true,
    new_hash: 'c51541f2a5a98f4d8dac5644925da1b7e32e35267226ab20101237eed67d4319',
    new_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
];

// mock 区块信息数
const blockData = [
  {
    blockHeight: 220,
    hash: 'c51541f2a5a98f4d8dac5644925da1b7e32e35267226ab20101237eed67d4319',
    ip: '183.****.114',
    timstamp: '1540281841',
    cerficate_status: '验证通过',
  },
  {
    blockHeight: 219,
    hash: 'c51541f2a5a98f4d8dac5644925da1b7e32e35267226ab20101237eed67d4319',
    ip: '183.****.14',
    timstamp: '1540281842',
    cerficate_status: '验证通过',
  },
];

// mock 详细信息内容
const detailCon = [
  {
    title: '溯源状态',
    con: '区块链数据验证成功',
  },
  {
    title: '时间戳',
    con: '1575425643740',
  },
  {
    title: '区块高度 ',
    con: '220',
  },
];

// 区块节点组件
const BlockItem = ({ data }) => {
  const { title, imgUrl, num } = data;
  return (
    <div className={style.block_item}>
      <img src={imgUrl} />
      <div className={style.text}>
        <Text>{title}</Text>
        <Text>
          <CountUp end={num} />
        </Text>
      </div>
    </div>
  );
};

// 区块详细信息组件
const BlockDetial = ({ data }) => {
  return (
    <Paragraph>
      <Text className={style.start_title}>{data.title}</Text>
      <Text className={style.desc}>{data.con}</Text>
    </Paragraph>
  );
};

const blockContents = mockData.map((item, index) => <BlockItem key={index} data={item} />);
const blockDetails = detailCon.map((item, index) => <BlockDetial key={index} data={item} />);

const BlockMessage = () => {
  const [showAll, handleShowAll] = useState(true);
  // 节点名称	节点位置	状态	区块高度	最新区块哈希值	最新区块时间
  const columns = [
    {
      title: '节点名称',
      dataIndex: 'peer',
    },
    {
      title: '节点位置',
      dataIndex: 'location',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => (
        <>
          <Badge status="success" /> 正在运行
        </>
      ),
    },
    {
      title: '最新区块哈希值',
      dataIndex: 'new_hash',
    },
    {
      title: '最新区块时间',
      dataIndex: 'new_time',
    },
  ];
  // 区块高度	哈希值 	信息IP	时间戳	验证状态
  const txColumns = [
    {
      title: '区块高度',
      dataIndex: 'blockHeight',
    },
    {
      title: '哈希值',
      dataIndex: 'hash',
    },
    {
      title: '信息IP',
      dataIndex: 'ip',
    },
    {
      title: '时间戳',
      dataIndex: 'timstamp',
    },
    {
      title: '验证状态',
      dataIndex: 'cerficate_status',
    },
    {
      dataIndex: 'opt',
      render: (_, record) => (
        <Button type="primary" onClick={() => showDetail(record.blockHeight)}>
          详情
        </Button>
      ),
    },
  ];

  const showDetail = (block) => {
    handleShowAll(true);
  };

  return (
    <>
      {/* 背景 */}
      <div className={style.banner}>
        <Title level={4}>
          <img src={logoUrl} />
          屹租链信息溯源平台
        </Title>
        <Input.Search
          size="large"
          placeholder="在此输入编码/交易哈希进行查询"
          className={style.search}
        />
        <div className={style.block}>{blockContents}</div>
      </div>

      {/* 查询信息 */}
      <div className={style.content}>
        {!showAll ? (
          <>
            <Text className={style.table_title}>节点</Text>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            <Text className={[style.table_title, style.trans].join(' ')}>最新交易</Text>
            <Table columns={txColumns} dataSource={blockData} pagination={false} />
          </>
        ) : (
          <>
            <Text className={style.table_title}>
              区块详情信息
              <Button type="primary" className={style.back_btn} onClick={() => handleShowAll(false)}>
                返回
              </Button>
            </Text>
            <Paragraph className={style.para}>
              交易哈希：c51541f2a5a98f4d8dac5644925da1b7e32e35267226ab20101237eed67d4319
            </Paragraph>
            <div className={style.mian_detail}>{blockDetails}</div>
          </>
        )}
      </div>

      {/* 技术支持 */}
      <div className={style.tech_base}>
        <Divider />
        <Text strong>生态技术支持</Text>
        <Divider />
        <img src={webank} />
      </div>
    </>
  );
};
export default BlockMessage;
