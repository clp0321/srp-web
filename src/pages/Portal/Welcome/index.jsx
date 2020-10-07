import React, { useEffect } from 'react';
import { Link, history } from 'umi';
import { Typography, Button, Card, Col, Row } from 'antd';
import intelligent from '@/assets/introduce/intelligent.png';
import less_confilct from '@/assets/introduce/less_confilct.png';
import low_expense from '@/assets/introduce/low_expense.png';
import true_house from '@/assets/introduce/true_house.png';
import architecture from '@/assets/introduce/architecture.png';
import style from './style.less';

const { Title, Paragraph, Text } = Typography;

const featureList = [
  {
    imgUrl: low_expense,
    title: '降低租赁成本',
    con:
      '使用微信支付分免押金租房、平台对接无需额外中介费、远程智能设备控制自主看房、水电费用量化精细化',
  },
  {
    imgUrl: true_house,
    title: '房源信息真实',
    con:
      '智能设备与身份信息双向绑定、利用“一房一码”溯源真实信息、依赖智能合约激励与房源真伪判定算法进一步提高房源真实性',
  },
  {
    imgUrl: less_confilct,
    title: '减少违约纠纷',
    con: '租赁双方可在平台社区中发起纠纷仲裁，同时支持用户参与公平投票、链上取证',
  },
  {
    imgUrl: intelligent,
    title: '房屋智能化管理',
    con: '物联设备自动计费、抄表，智能合约履行租约合同，自动控制智能门锁权限',
  },
];

const FeatureIntroduce = ({ data }) => {
  return (
    <div className={style.feature_item}>
      <Text strong>{data.title}</Text>
      <Paragraph>{data.con}</Paragraph>
    </div>
  );
};

const feature_list = featureList.map((item) => <FeatureIntroduce key={item.title} data={item} />);

const Welcome = () => {
  useEffect(() => {
    document.title = '区块链共享租赁平台';
  });
  return (
    <>
      {/* banner图 */}
      <div className={style.banner}>
        <div className={style.banner_con}>
          <Title level={1}>5G物联区块链共享租赁平台</Title>
          <Title level={4}>5G互联、可信运营、智能共享、无人值守</Title>
          <Button
            size="large"
            type="primary"
            onClick={() => history.push('/srp/rent')}
            style={{ width: 200 }}
          >
            立即体验
          </Button>
        </div>
        <div className={[style.star, style.star1].join(' ')}></div>
        <div className={[style.star, style.star2].join(' ')}></div>
        <div className={[style.star, style.star3].join(' ')}></div>
        <div className={[style.star, style.star4].join(' ')}></div>
        <div className={[style.star, style.star5].join(' ')}></div>
        <div className={[style.star, style.star6].join(' ')}></div>
        <div className={[style.star, style.star7].join(' ')}></div>
        <div className={[style.star, style.star8].join(' ')}></div>
      </div>
      {/* 产品介绍 */}
      <div className={style.introduce}>
        <Title level={3} className={style.jusitfy_title}>
          产品简介
        </Title>
        <div className={style.in_con}>
          <Paragraph strong style={{ fontSize: 16, textAlign: 'left' }}>
            本产品以5G物联网以及区块链为基层技术，致力于打造一个交易费用低廉、房源信息真实、违约纠纷减少、租务管理智能的可信共享租赁平台
          </Paragraph>
        </div>
        <div className={style.break}></div>
      </div>
      {/* 产品特性 */}
      <div className={[style.feature, style.clearfix].join(' ')}>
        <Title level={3} className={style.jusitfy_title}>
          产品特性
        </Title>
        <div className={style.pic_list}>
          <img src={low_expense} />
          <img src={true_house} />
          <img src={less_confilct} />
          <img src={intelligent} />
        </div>
        <div className={style.feature_introduce}>{feature_list}</div>
        <div className={style.break}></div>
      </div>
      {/* 产品结构  */}
      <div className={style.architecture}>
        <Title level={3}>产品架构</Title>
        <img src={architecture} />
      </div>
    </>
  );
};
export default Welcome;
