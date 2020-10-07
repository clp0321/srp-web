import { useState, useEffect } from 'react';
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
    id: '微众节点1',
    ip: '127.0.1',
    prePort: 5002,
    nide_id: 'e132121e21e212323',
    node_v: 2.0,
    argnization: 'org1',
    creatTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    updateTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
];

// mock 节点列表信息
const peerList = [
  {
    peer_id: 'c51541f2a5a98f4d8dac5644925da1b7e32e35267226ab20101237eed67d4319',
    peer_type: '共识',
    block_height: '50369',
    pbftView: '1540281841',
  },
  {
    peer_id: 'c51541f2a5a98f4d8dac5644925da1b7e32e35267226ab20101237eed67d4319',
    peer_type: '共识',
    block_height: '50374',
    pbftView: '1540281841',
  },
];

// mock 详细信息内容
const detailCon = [
  {
    title: '溯源状态',
    con: '区块链数据验证成功',
    status: true,
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
      <Text className={[style.desc, data.status ? style.success : ''].join(' ')}>{data.con}</Text>
    </Paragraph>
  );
};

const blockContents = mockData.map((item, index) => <BlockItem key={index} data={item} />);
const blockDetails = detailCon.map((item, index) => <BlockDetial key={index} data={item} />);

const BlockMessage = () => {
  const [showAll, handleShowAll] = useState(false);
  useEffect(() => {
    document.title = '区块链共享租赁平台-信息溯源';
  });

  // 前置编号、ip、前置端口、节点id、节点版本、所述机构、创建时间、修改时间、状态、操作
  const columns = [
    {
      title: '前置编号',
      dataIndex: 'id',
    },
    {
      title: 'ip',
      dataIndex: 'ip',
    },
    {
      title: '前置端口',
      dataIndex: 'prePort',
    },
    {
      title: '节点id',
      dataIndex: 'nide_id',
    },
    {
      title: '节点版本',
      dataIndex: 'node_v',
    },
    {
      title: '所属机构',
      dataIndex: 'argnization',
    },
    {
      title: '创建时间',
      dataIndex: 'creatTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
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
      title: '操作',
      render: () => <a>修改</a>,
    },
  ];
  // 节点ID、节点类型、块高、pbftView、状态、操作
  const txColumns = [
    {
      title: '节点ID',
      dataIndex: 'peer_id',
    },
    {
      title: '节点类型',
      dataIndex: 'peer_type',
    },
    {
      title: '块高',
      dataIndex: 'block_height',
    },
    {
      title: 'pbftView',
      dataIndex: 'pbftView',
    },
    {
      title: '状态',
      dataIndex: 'cerficate_status',
      render: () => (
        <>
          <Badge />
          运行中
        </>
      ),
    },
    {
      title: '操作',
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
        <div className={style.banner_center}>
          <Title level={2}>
            <img src={logoUrl} />
            易租链-房源信息溯源平台
          </Title>
          <Input.Search
            size="large"
            placeholder="在此输入编码/交易哈希进行查询"
            className={style.search}
          />
          <div className={style.block}>{blockContents}</div>
        </div>
      </div>

      {/* 查询信息 */}
      <div className={style.content}>
        {!showAll ? (
          <>
            <Text className={style.table_title}>节点前置</Text>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            <Text className={[style.table_title, style.trans].join(' ')}>节点列表</Text>
            <Table columns={txColumns} dataSource={peerList} pagination={false} />
          </>
        ) : (
          <>
            <Text className={style.table_title}>
              区块详情信息
              <Button
                type="primary"
                className={style.back_btn}
                onClick={() => handleShowAll(false)}
              >
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
