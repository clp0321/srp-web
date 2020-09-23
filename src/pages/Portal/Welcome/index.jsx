import React, { useEffect } from 'react';
import { Link, history } from 'umi';
import { Typography, Button, Card, Col, Row } from 'antd';
import img5G from '@/assets/images/5G.jpg';
import imgIot from '@/assets/images/nbiot.jpg';
import imgBlockchain from '@/assets/images/blockchain.jpg';
import imgArchitecture from '@/assets/images/architecture.png';
import style from './style.less';

const { Title, Paragraph } = Typography;
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
      </div>
      {/* 产品介绍 */}
      <div className={style.introduce}>
        <Title level={2}>产品简介</Title>
        <div className={style.in_con}>
          <Paragraph strong style={{ fontSize: 16 }}>
            本产品是由多方参与共同维护的共享租赁平台。以区块链为基础，打通供求双方的信息壁垒，实现房源信息准确可追溯；以5G通信技术为依托、可信智能合约为手段、智能设备为载体、实现可信可靠、自动化无人值守的租赁体系
          </Paragraph>
        </div>
        <div className={style.break}></div>
      </div>
      {/* 产品特性 */}
      <div className={[style.feature, style.clearfix].join(' ')}>
        <Title level={2}>产品特性</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card hoverable cover={<img src={img5G} height={254} />}>
              {/* 5G是最新一代蜂窝移动通信技术，也是继4G（LTE-A、WiMax）、3G（UMTS、LTE）和2G（GSM）系统之后的延伸。5G的性能目标是高数据速率、减少延迟、节省能源、降低成本、提高系统容量和大规模设备连接。Release-15中的5G规范的第一阶段是为了适应早期的商业部署 */}
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable cover={<img src={imgIot} height={254} />}>
              {/* IOT通过各种信息传感器、射频识别技术、全球定位系统、红外感应器、激光扫描器等各种装置与技术，实时采集任何需要监控、
              连接、互动的物体或过程，采集其声、光、热、电、力学、化学、生物、位置等各种需要的信息，通过各类可能的网络接入，实现物与物、物与人的泛在连接，实现对物品和过程的智能化感知、识别和管理 */}
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable cover={<img src={imgBlockchain} height={254} />}>
              {/* 区块链是一个信息技术领域的术语。从本质上讲，它是一个共享数据库，存储于其中的数据或信息，具有“不可伪造”“全程留痕”“可以追溯”“公开透明”“集体维护”等特征。基于这些特征，区块链技术奠定了坚实的“信任”基础，创造了可靠的“合作”机制，具有广阔的运用前景 */}
            </Card>
          </Col>
        </Row>
        <div className={style.break}></div>
      </div>
      {/* 产品结构  */}
      <div className={style.architecture}>
        <Title level={2}>产品架构</Title>
      </div>
    </>
  );
};
export default Welcome;
