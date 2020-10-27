import { useState, useEffect } from 'react';
import { Typography, Input, Table, Badge, Button, Divider } from 'antd';
import CountUp from 'react-countup';
import moment from 'moment';
import { queryInfo } from '@/services/block';
import peerUrl from '@/assets/images/peer.png';
import blockHeightUrl from '@/assets/images/block_height.png';
import certificate from '@/assets/images/certificate.png';
import transaction from '@/assets/images/transactions.png';
import logoUrl from '@/assets/images/easy-rent.png';
import webank from '@/assets/images/webank.jpg';
import style from './style.less';

const { Title, Text, Paragraph } = Typography;

// mock节点信息数
const dataSource = [
  {
    id: '微众节点1',
    ip: '127.0.1',
    prePort: 5002,
    node_id:
      '9537ec91773302f704f4994d283a5a4a3ca1d7670789666f0c6e1a2fd1c81b18b01990e8972c62001b9492cd8858377f73d8c4dafd6a27e776441d08ce267abf',
    cid: '12D3KooWQzdCMc5ZZevX7tSj8na872Cp9tXqSpQNxnTYdFjQsMPj',
    node_v: 2.0,
    argnization: 'org1',
    creatTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    updateTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
];

// mock 节点列表信息
const peerList = [
  {
    peer_id:
      '28b0ec7d933f0d0bdb81c2ceb6a42917100fd94bfb634dd14fb0dd010dd9c45b11d64caecdb18d0677e40a4732595700ba12e49958bcb87e101d26b05882eb49',
    peer_type: '共识',
    block_height: '468',
    pbftView: '12492',
  },
  {
    peer_id:
      ' 6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f',
    peer_type: '共识',
    block_height: '468',
    pbftView: '12493',
  },
  {
    peer_id:
      ' 9537ec91773302f704f4994d283a5a4a3ca1d7670789666f0c6e1a2fd1c81b18b01990e8972c62001b9492cd8858377f73d8c4dafd6a27e776441d08ce267abf',
    peer_type: '共识',
    block_height: '468',
    pbftView: '12494',
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

const BlockMessage = () => {
  const [showAll, handleShowAll] = useState(false);
  const [curBlock, setCurBlock] = useState([]);
  const [blockInfo, setBlock] = useState({
    nodeCnt: 0,
    blockHeight: 0,
    txCnt: 0,
    contractCnt: 0,
  });

  useEffect(() => {
    document.title = '区块链共享租赁平台-信息溯源';
    queryBlocksInfo();
  }, []);

  // 前置编号、ip、前置端口、节点id、节点版本、所述机构、创建时间、修改时间、状态、操作
  const columns = [
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
      width: 250,
      dataIndex: 'node_id',
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Text ellipsis copyable>
            {text}
          </Text>
        </div>
      ),
    },
    {
      title: 'IPFS节点Id',
      width: 250,
      dataIndex: 'cid',
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Text ellipsis copyable>
            {text}
          </Text>
        </div>
      ),
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
      render: () => <a>切换</a>,
    },
  ];
  // 节点ID、节点类型、块高、pbftView、状态、操作
  const txColumns = [
    {
      title: '节点ID',
      dataIndex: 'peer_id',
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Text ellipsis={true} copyable>
            {text}
          </Text>
        </div>
      ),
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
          <Badge status="success" />
          运行中
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'opt',
      render: (_, record) => (
        <Button type="primary" onClick={() => showDetail(record)}>
          详情
        </Button>
      ),
    },
  ];

  // 获取区块信息
  const queryBlocksInfo = () => {
    queryInfo().then((values) => {
      if (values.msg === 'SUCCESS' && values.data) {
        setBlock(values.data)
      }
    });
  };

  const showDetail = (block) => {
    setCurBlock(block);
    handleShowAll(true);
  };

  const mockData = [
    {
      title: '当前节点数',
      imgUrl: peerUrl,
      num: blockInfo.nodeCnt,
    },
    {
      title: '区块高度',
      imgUrl: blockHeightUrl,
      num: blockInfo.blockHeight,
    },
    {
      title: '总交易数',
      imgUrl: transaction,
      num: blockInfo.txCnt,
    },
    {
      title: '部署合约数',
      imgUrl: certificate,
      num: blockInfo.contractCnt,
    },
  ];

  const blockContents = mockData.map((item, index) => <BlockItem key={index} data={item} />);

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
            <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="node_id" />
            <Text className={[style.table_title, style.trans].join(' ')}>节点列表</Text>
            <Table columns={txColumns} dataSource={peerList} pagination={false} rowKey="peer_id" />
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
              交易哈希：<Text ellipsis={true}>{curBlock.peer_id}</Text>
            </Paragraph>
            <div className={style.mian_detail}>
              <Paragraph>
                <Text className={style.start_title}>溯源状态</Text>
                <Text className={[style.desc, style.success].join(' ')}>数据验证成功</Text>
              </Paragraph>
              <Paragraph>
                <Text className={style.start_title}>区块高度</Text>
                <Text className={style.desc}>{curBlock.block_height}</Text>
              </Paragraph>
              <Paragraph>
                <Text className={style.start_title}>时间戳</Text>
                <Text className={style.desc}>2020-10-07 17:27:49</Text>
              </Paragraph>
            </div>
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
