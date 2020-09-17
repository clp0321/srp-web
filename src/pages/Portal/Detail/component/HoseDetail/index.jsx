import { useState, useEffect } from 'react';
import { Typography, Tag, Tooltip, Descriptions } from 'antd';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';

import style from './style.less';

// mock经纬度
const lanLat = {
  lng: 114.039232,
  lat: 22.674789,
  title: '保利悦都',
  text: '深圳市龙华区清龙路与龙观大道交叉路口往南约100米',
};

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

const facilityMock = [
  {
    lock: true,
    bed: true,
    air: true,
    ward: true,
    tv: true,
    hot_air: true,
    balcony: true,
    bathroom: true,
  },
  {
    refrigerator: true,
    wash_clothes: true,
    sofa: true,
    range_hood: true,
    cook: true,
    network: true,
    hotwater: true,
    gas: true,
  },
];

const facilityNameMock = [
  '智能门锁',
  '床',
  '空调',
  '衣柜',
  '电视',
  '暖气',
  '阳台',
  '卫生间',
  '冰箱',
  '洗衣机',
  '沙发',
  '油烟机',
  '可做饭',
  '宽带',
  '热水器',
  '煤气罩',
];

const Facility = ({ name, status, index }) => {
  return (
    <>
      <li className={status ? style[name] : style['none']}>
        <i className={style.icon}></i>
        {facilityNameMock[index]}
      </li>
    </>
  );
};

const bed_facility = facilityMock[0];
const pulic_facility = facilityMock[1];
const bedFacilityList = [];
const publicFacilityList = [];
let index = 0;
for (let i in bed_facility) {
  bedFacilityList.push(<Facility key={i} name={i} status={bed_facility[i]} index={index++} />);
}
let startIndex = 8;
for (let i in pulic_facility) {
  publicFacilityList.push(
    <Facility key={i} name={i} status={pulic_facility[i]} index={startIndex++} />,
  );
}

const toolList = mockTool.map((item, index) => <TooltipList key={index} data={item} />);

const { Paragraph, Text, Title } = Typography;

const HouseDetail = () => {
  const { lng, lat, title, text } = lanLat;
  return (
    <>
      <div className={style.house_detail}>
        <Title level={4}>合租 | 远洋新干线2期 5室1厅 西南</Title>
        <Text>智能设备编码: 873243241</Text>
      </div>
      {toolList}
      {/* 房屋信息 */}
      <div className={style.desc}>
        <Descriptions
          column={3}
          title={<Title level={4}>房屋信息</Title>}
          extra="发布时间：2020年9月18日"
        >
          <Descriptions.Item label="户型">5室1厅</Descriptions.Item>
          <Descriptions.Item label="面积">72 m²</Descriptions.Item>
          <Descriptions.Item label="朝向">朝南</Descriptions.Item>
          <Descriptions.Item label="楼层">底层(共18)</Descriptions.Item>
          <Descriptions.Item label="装修">精装修</Descriptions.Item>
          <Descriptions.Item label="类型">普通住宅</Descriptions.Item>
          <Descriptions.Item label="小区">龙华区 保利悦都</Descriptions.Item>
        </Descriptions>
      </div>
      {/* 设施信息 */}
      <div className={style.facility}>
        <Text strong>卧室设施</Text>
        <dl>
          <dd>
            <ul className={style.faci_list}>{bedFacilityList}</ul>
          </dd>
        </dl>
        <Text strong>公共设施</Text>
        <dl>
          <dd>
            <ul className={style.faci_list}>{publicFacilityList}</ul>
          </dd>
        </dl>
      </div>
      {/* 地理位置 */}
      <div className={style.lbs}>
        <Title level={4}>地理位置</Title>
        <div>
          <Map center={{ lng, lat }} zoom="11">
            <Marker position={{ lng, lat }} />
            <NavigationControl />
            <InfoWindow position={{ lng, lat }} title={title}>
              <Text>{text}</Text>
            </InfoWindow>
          </Map>
        </div>
      </div>
      {/* 房屋描述 */}
      <div className={style.describe}>
        <Title level={4}>房屋描述</Title>
        <Paragraph>超便宜！业主急租，装修精美，主卧独卫，拎包入住!</Paragraph>
        <Paragraph>
          房源亮点:南北通透,临近地铁，小区附近有大型超市，菜场，出行购物非常方便！
        </Paragraph>
        <Paragraph>现在租房，还可房租减免活动，欢迎来电咨询！</Paragraph>
        <Paragraph> 1、附近地铁：3号线南联:1205m</Paragraph>
        <Paragraph>
          2、周边公交：盛龙路口:165m;东港酒店:201m;龙园印象:302m;华升学校:339m;盛平天桥:455m
        </Paragraph>
        <Paragraph>3、周围商店：万福来百货:345m;云双百货:625m </Paragraph>
        <Paragraph>
          4、餐饮：幸福小家:52m;蝶爱甜品蜜饮:54m;湘味小厨:72m;沙县小吃店:85m;姚记北方饺子馆:100m
        </Paragraph>
        <Paragraph>
          6、室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。
        </Paragraph>
      </div>
    </>
  );
};

export default HouseDetail;
