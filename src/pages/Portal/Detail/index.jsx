import { useState, useEffect } from 'react';
import { Carousel, Tabs, Typography, Tag, Tooltip, Descriptions } from 'antd';
import detail1Url from '@/assets/images/detail1.jpg';
import detail2Url from '@/assets/images/detail2.jpg';
import detail3Url from '@/assets/images/detail3.jpg';
import detail4Url from '@/assets/images/detail4.jpg';
import back from '@/assets/images/back.jpg';

import style from './style.less';

const mockTool = [
  {
    title: '无接触入住',
    con: '该房屋为整套出租,配置智能门锁,可无接触入住',
    index: 0,
  },
  {
    title: '免费清洁',
    con: '您可免费享受房东的一客一扫服务',
    index: 1,
  },
  {
    title: '观景露台',
    con: '房间有观景露台',
    index: 2,
  },
];

const colorList = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const TooltipList = ({ data }) => {
  return (
    <Tooltip placement="bottom" title={data.con}>
      <Tag color={colorList[data.index]}>{data.title}</Tag>
    </Tooltip>
  );
};

const toolList = mockTool.map((item, index) => <TooltipList key={index} data={item} />);

const { Paragraph, Text, Title } = Typography;
const { TabPane } = Tabs;

// imgUrl: room1,
// con1: '合租 | 远洋新干线2期 5室1厅 西南',
// con2: '[ 保利悦都 龙华区 - 龙华中心 ] 保利悦都',
// con3: '72 m² / 3室 2厅 / 高楼层 / 朝向南北',
// time: '更新于2020年8月28日',
// btnList: ['近地铁', '拎包入住'],
// price: 4200,

const Detail = () => {
  useEffect(() => {
    document.title = '房屋详情';
  });

  const callback = () => {};

  const showImgList = () => {};

  return (
    <div className={style.contain}>
      <div
        style={{ backgroundImage: `url(${back})` }}
        className={style.carousel}
        onClick={showImgList}
      />
      <div className={style.top}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="房屋详情" key="1">
            <div className={style.house_detail}>
              <Title level={4}>合租 | 远洋新干线2期 5室1厅 西南</Title>
              <Text>智能设备编码: 873243241</Text>
            </div>
            {toolList}
            <Descriptions title="详情信息" layout="vertical" className={style.desc}>
              <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
              <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
              <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab="信息溯源" key="2"></TabPane>
          <TabPane tab="入住须知" key="3"></TabPane>
          <TabPane tab="房屋点评" key="4"></TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Detail;
