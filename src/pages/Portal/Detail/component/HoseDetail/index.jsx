import { useState } from 'react';
import {
  Typography,
  Tag,
  Tooltip,
  Descriptions,
  Button,
  Modal,
  Form,
  DatePicker,
  Input,
  message,
  Space,
} from 'antd';
import { history } from 'umi';
import { KeyOutlined, DollarOutlined } from '@ant-design/icons';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';
import certification from '@/assets/images/certification.png';
import { applyHouse } from '@/services/property';
import moment from 'moment';
import style from './style.less';

const { Item } = Form;

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

// 设备状态
const facilityList = [
  {
    intelLock: false,
    bed: false,
    airCond: false,
    wardrobe: false,
    tv: false,
    heating: false,
    balcony: false,
    toilet: false,
  },
  {
    fridge: false,
    washM: false,
    sofa: false,
    lampblackMachine: false,
    cooking: false,
    broadband: false,
    heater: false,
    gasStove: false,
  },
];

// 基础设备
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

// 设备组件
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

const toolList = mockTool.map((item, index) => <TooltipList key={index} data={item} />);

const { Paragraph, Text, Title } = Typography;

const HouseDetail = ({ houseDetail }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  // 申请看房
  const handleApply = () => {
    form.validateFields().then(async (values) => {
      const { houseId } = houseDetail;
      const { apply_time } = values;
      const resp = await applyHouse({
        houseId,
        houserName: houseDetail.houseOwner,
        userName: localStorage.getItem('name'),
        applyTime: moment(apply_time).format('YYYY/MM/DD'),
        deviceNum: '23',
      });
      if (resp.msg === 'SUCCESS') {
        message.success('看房请求发送成功');
      } else {
        message.error('看房请求发送失败');
      }
    });
    form.resetFields();
    setVisible(false);
  };
  const formLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 15,
    },
  };

  const {
    method,
    position,
    specify,
    houseId,
    updateTime,
    publisher,
    phone,
    size,
    price,
    payway,
    province,
    city,
    country,
    houseLat,
    houseLng,
    earlyTime,
    numbers,
    houseConfiglist,
  } = houseDetail;
  let pays;

  // 地图经纬度
  const lanLat = {
    lng: houseLng,
    lat: houseLat,
  };
  // 地图title与text
  const title = position;
  const text = `${province}${city}${country}`;
  let map_component;
  if (houseLat && houseLng) {
    map_component = (
      <Map center={lanLat} zoom="11">
        <Marker position={lanLat} />
        <NavigationControl />
        <InfoWindow position={lanLat} title={title}>
          <Text>{text}</Text>
        </InfoWindow>
      </Map>
    );
  }

  // 房屋配置信息渲染
  const bed_facility = facilityList[0];
  const pulic_facility = facilityList[1];

  let configArr = [];

  if (houseConfiglist.length) {
    configArr = houseConfiglist[0];
    for (let i in bed_facility) {
      if (configArr[i]) {
        bed_facility[i] = true;
      }
    }

    for (let j in pulic_facility) {
      if (configArr[j]) {
        pulic_facility[j] = true;
      }
    }
  }

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

  switch (payway) {
    case 0:
      pays = '押一付一';
      break;
    case 0:
      pays = '押一付二';
      break;
    case 0:
      pays = '半年付';
      break;
    case 0:
      pays = '年付';
      break;
    default:
      pays = '';
  }

  // 设备加密
  let equipId = '';
  if (houseId && houseId.length > 0) {
    equipId = houseId.replace(houseId.substring(1, houseId.length - 1), '***');
  }

  // 处理修改
  const handleBook = () => {
    const queryOpt = location.search.split('=')[1];
    Modal.confirm({
      title: '确认预定此房源？',
      okText: '确认',
      onOk: () => {
        history.push(`/srp/order?queryId=${queryOpt}`);
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      {/* 基本信息 */}
      <div className={style.house_detail}>
        <Title level={4}>
          {method === 0 ? '整租' : '合租'} | {position} {specify}{' '}
        </Title>
        <Paragraph>
          <img src={certification} height={30} />
          智能门锁编号: {houseId}
          <Text className={style.watch_room}>
            <Button type="primary" icon={<KeyOutlined />} onClick={() => setVisible(true)}>
              申请看房
            </Button>
            <Button type="danger" icon={<DollarOutlined />} onClick={handleBook}>
              立即预定
            </Button>
          </Text>
        </Paragraph>
      </div>
      {toolList}
      {/* 房屋信息 */}
      <div className={style.desc}>
        <Descriptions
          column={3}
          title={<Title level={4}>房屋信息</Title>}
          extra={`发布时间：${moment(updateTime).format('YYYY-MM-DD hh:mm:ss')}`}
        >
          <Descriptions.Item label="房主">{publisher}</Descriptions.Item>
          <Descriptions.Item label="联系方式">{phone}</Descriptions.Item>
          <Descriptions.Item label="面积">{size} m²</Descriptions.Item>
          <Descriptions.Item label="价格">{price}</Descriptions.Item>
          <Descriptions.Item label="支付方式">{pays}</Descriptions.Item>
          <Descriptions.Item label="宜住">{numbers} 人</Descriptions.Item>
          <Descriptions.Item label="最早入住时间">
            {moment(new Date(earlyTime)).format('YYYY-MM-DD')}
          </Descriptions.Item>
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
        {map_component}
      </div>
      {/* 房屋描述 */}
      <div className={style.describe}>
        <Title level={4}>房屋描述</Title>
        <Paragraph>超便宜！业主急租，装修精美，主卧独卫，拎包入住!</Paragraph>
        <Paragraph>
          房源亮点:南北通透,临近地铁，小区附近有大型超市，菜场，出行购物非常方便！
        </Paragraph>
        <Paragraph>现在租房，还可房租减免活动，欢迎来电咨询！</Paragraph>
        <Paragraph> 1、附近地铁：与地铁5号线塘朗地铁口接驳，临近留仙大道公交站台</Paragraph>
        <Paragraph>
          2、教育配套：南方科技大学实验，南方科技大学实验中学正在筹建，南科大幼儿园；
        </Paragraph>
        <Paragraph>3、医疗配套：深圳大学总医院； </Paragraph>
        <Paragraph>4、安保措施：24小时保安巡逻，进入小区仅凭住户卡刷卡入内；</Paragraph>
        <Paragraph>
          6、室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带等。
        </Paragraph>
      </div>
      <Modal
        title="预约看房"
        visible={visible}
        onOk={handleApply}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          {...formLayout}
          initialValues={{
            houser_name: publisher,
            user_name: localStorage.getItem('name'),
          }}
        >
          <Item label="人员信息" className={style.people_detail}>
            <Space size="large">
              <Text strong>房主: {publisher}</Text>
              <Text strong>申请人: {localStorage.getItem('name')}</Text>
            </Space>
          </Item>
          <Item
            label="联系方式"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入联系方式！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '请输入正确的联系方式！',
              },
            ]}
          >
            <Input placeholder="请输入联系方式" />
          </Item>
          <Item
            label="看房时间"
            name="apply_time"
            className={style.picker}
            rules={[
              {
                required: true,
                message: '请输入预约看房时间',
              },
            ]}
          >
            <DatePicker placeholder="选择预约看房时间" />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default HouseDetail;
