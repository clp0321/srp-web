import { useState, useEffect } from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  Typography,
  Card,
  Alert,
  Timeline,
  Affix,
  Cascader,
  DatePicker,
  Space,
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  SoundOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import style from './style.less';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;
const CheckboxGroup = Checkbox.Group;

const warningMessage =
  '为共建真实可信的生活服务平台，所有新发布的信息需要进行认证才能展现，认证方式包括：支付认证或芝麻信用认证请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};

// 级联数据
const mockData = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

// Mock租金信息
const RentInfoList = [
  {
    title: '水费',
    value: 1,
  },
  {
    title: '电费',
    value: 2,
  },
  {
    title: '燃气费',
    value: 3,
  },
  {
    title: '贷款费',
    value: 4,
  },
  {
    title: '物业费',
    value: 5,
  },
  {
    title: '停车费',
    value: 6,
  },
];

// Mock房屋配置信息
const configuration = [
  '冰箱',
  '电视',
  '洗衣机',
  '热水器',
  '空调',
  '宽带',
  '沙发',
  '床',
  '暖气',
  '衣柜',
  '可做饭',
  '卫生间',
  '阳台',
  '智能门锁',
  '油烟机',
  '燃气社',
];

const { Item } = Form;

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

// Title
const TitleCon = ({ title }) => {
  return (
    <Title level={4} className={style.title}>
      {title}
    </Title>
  );
};

// RentContain 租金包含
const RentContain = ({ data }) => {
  return (
    <Col span={4}>
      <Checkbox value={data.value} className={style.check_box}>
        {data.title}
      </Checkbox>
    </Col>
  );
};
const rentList = RentInfoList.map((item, index) => {
  return <RentContain data={item} key={index} />;
});

// baseInfo 基础信息
const BaseInfo = () => {
  return (
    <>
      <TitleCon title="基础信息" />
      <Item
        name="area"
        label="所在区域"
        rules={[
          {
            required: true,
            message: '请选择所在区域',
          },
        ]}
      >
        <Cascader options={mockData} onChange={() => {}} placeholder="请选择所在区域" />
      </Item>
      <Item
        label="房屋类型"
        rules={[
          {
            required: true,
            message: '请填写房屋类型',
          },
        ]}
        style={{ display: 'flex' }}
      >
        <Item
          name="room"
          rules={[{ required: true, message: '' }]}
          style={{ display: 'inline-block', width: 200, margin: 0 }}
        >
          <Input addonAfter="室" />
        </Item>
        <Item
          name="hall"
          rules={[{ required: true, message: '' }]}
          style={{ display: 'inline-block', width: 200, margin: '0 8px' }}
        >
          <Input addonAfter="厅" />
        </Item>
        <Item
          name="guard"
          rules={[{ required: true, message: '' }]}
          style={{ display: 'inline-block', width: 200, margin: '0 8px' }}
        >
          <Input addonAfter="卫" />
        </Item>
        <Item
          name="size"
          rules={[{ required: true, message: '' }]}
          style={{ display: 'inline-block', width: 200, margin: '0 8px' }}
        >
          <Input addonAfter="㎡" addonBefore="共" />
        </Item>
      </Item>
      <Item
        name="direction"
        label="房屋朝向"
        rules={[
          {
            required: true,
            message: '请选择房屋朝向',
          },
        ]}
      >
        <Select placeholder="请选择朝向">
          <Option value={0}>东</Option>
          <Option value={1}>南</Option>
          <Option value={2}>西</Option>
          <Option value={3}>北</Option>
        </Select>
      </Item>
    </>
  );
};
// rentInfo 租金信息
const RentInfo = () => {
  return (
    <>
      <TitleCon title="租金信息" className={style.sub_title} />
      <Item
        label="月租金"
        rules={[
          {
            required: true,
            message: '请填写租金信息',
          },
        ]}
        className={style.flex_item}
      >
        <Item name="price">
          <InputNumber
            style={{ display: 'inline-block', width: 200, margin: 0 }}
            placeholder="请输入租金"
          />
        </Item>
        <Item name="payway">
          <Select
            placeholder="请选择付款方式"
            style={{ display: 'inline-block', width: 200, margin: '0 8px' }}
          >
            <Option value={0}>押一付一</Option>
            <Option value={1}>押一付二</Option>
            <Option value={2}>半年付</Option>
            <Option value={3}>年付</Option>
          </Select>
        </Item>
        <Item name="method">
          <Select
            placeholder="请选择租赁形式"
            style={{ display: 'inline-block', width: 200, margin: '0 8px' }}
          >
            <Option value={0}>整租</Option>
            <Option value={1}>合租</Option>
          </Select>
        </Item>
      </Item>
      <Item label="租金包含" name="conctain">
        <Checkbox.Group className={style.rent_contain}>
          <Row>{rentList}</Row>
        </Checkbox.Group>
      </Item>
    </>
  );
};

// detail 详细介绍
const Detail = ({ indeterminate, checkAll, onCheckAllChange, changeCheckList, checkedList }) => {
  const handleCheck = (e) => {
    onCheckAllChange(e.target.checked);
  };

  const handleChange = (checkedList) => {
    changeCheckList(checkedList);
  };

  return (
    <>
      <TitleCon title="详细介绍" className={style.sub_title} />
      <Item label="最早入住" className={style.flex_item}>
        <Item name="enterTime">
          <DatePicker style={{ display: 'inline-block', width: 200, margin: 0 }} />
        </Item>
        <Item name="fitPeople">
          <Input
            addonAfter="人"
            placeholder="宜住"
            style={{ display: 'inline-block', width: 200, margin: '0 8px' }}
          />
        </Item>
      </Item>
      <Item label="房屋结构" name="struct">
        <Radio.Group>
          <Radio value={1}>混合</Radio>
          <Radio value={2}>钢筋混凝土</Radio>
        </Radio.Group>
      </Item>
      <Item label="看房时间" name="watchTime">
        <Radio.Group>
          <Radio value={1}>仅周末</Radio>
          <Radio value={2}>仅工作日</Radio>
          <Radio value={2}>随时看房</Radio>
          <Radio value={2}>工作日晚和周末</Radio>
        </Radio.Group>
      </Item>
      <Item label="房屋配置" className={style.configuration}>
        <Checkbox indeterminate={indeterminate} onChange={handleCheck} checked={checkAll}>
          全选
        </Checkbox>
        <CheckboxGroup options={configuration} value={checkedList} onChange={handleChange} />
      </Item>
      <Item label="房屋描述" name="descrition">
        <Input.TextArea
          rows={5}
          placeholder="可以介绍房源亮点,交通,周边环境,可以入住二点时间和对租客的要求等,详细的房源描述信息会大大增加快速出租的机会!"
        />
      </Item>
    </>
  );
};

// houstpic 房源图片
const HousePic = () => {
  return (
    <>
      <TitleCon title="房源图片" className={style.sub_title} />
      <Item label="上传图片" name="upload" rules={[{ require: true }]} className={style.house_pic}>
        <Paragraph>
          请上传清晰、实拍的室内图片，请不要在图片上添加文字、数字、网址等内容，请勿上传名片、二维码、自拍照、风景照等与房源无关的图片，最多上传12张，每张最大10M
        </Paragraph>
        <Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片至此处上传</p>
            <p className="ant-upload-hint">支持单文件或多文件上传</p>
          </Upload.Dragger>
        </Item>
      </Item>
    </>
  );
};

// contactInfo 联系信息
const ContactInfo = () => {
  return (
    <>
      <TitleCon title="联系信息" className={style.sub_title} />
      <Item label="发布人" name="publisher" rules={[{ required: true }]}>
        <Input disabled defaultValue="大清" />
      </Item>
      <Item label="身份选择" name="role" rules={[{ required: true, message: '请选择用户身份' }]}>
        <Select placeholder="请选择用户个人身份">
          <Option value={1}>房东</Option>
          <Option value={2}>代理服务商</Option>
        </Select>
      </Item>
      <Item label="联系方式" name="phone" rules={[{ required: true, message: '请输入联系方式' }]}>
        <Input placeholder="请输入联系方式" />
      </Item>
    </>
  );
};

// 按钮集合
const ButtonList = () => {
  return (
    <div className={style.btn_list}>
      <Space size="large">
        <Button type="primary">房源发布</Button>
        <Button type="danger">信息重置</Button>
      </Space>
    </div>
  );
};

const Release = () => {
  const form = Form.useForm();
  const [checkedList, changeCheckList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, handleCheckAll] = useState(false);
  const [method, setMethod] = useState(0);
  const [payway, setPayway] = useState(0);
  const [struct, setStruct] = useState(0);

  useEffect(() => {
    document.title = "区块链共享租赁平台-房源发布"
  })

  const checkAllChange = (checked) => {
    setIndeterminate(false);
    const checkList = checked ? configuration : [];
    changeCheckList(checkList);
    handleCheckAll(checked);
  };

  const handleCheckList = (list) => {
    changeCheckList(list);
    const indeterBool = !!list.length && list.length < configuration.length;
    setIndeterminate(indeterBool);
    handleCheckAll(list.length === configuration.length);
  };

  const onFinish = () => {};
  return (
    <div className={style.contain}>
      <Alert
        className={style.alert}
        message={warningMessage}
        type="warning"
        closable
        showIcon
        icon={<SoundOutlined />}
      />
      <Row gutter={24}>
        <Col span={20}>
          <Form
            onFinish={onFinish}
            {...formItemLayout}
            initialValues={{
              form,
            }}
          >
            {/* 基础信息 */}
            <BaseInfo />
            {/* 租金信息 */}
            <RentInfo />
            {/* 详细介绍 */}
            <Detail
              indeterminate={indeterminate}
              checkAll={checkAll}
              onCheckAllChange={checkAllChange}
              checkedList={checkedList}
              changeCheckList={handleCheckList}
            />
            {/* 房源图片 */}
            <HousePic />
            {/* 联系信息 */}
            <ContactInfo />
            {/* 按钮集 */}
            <ButtonList />
          </Form>
        </Col>
        <Col span={4}>
          <Affix offsetTop={0}>
            <Card>
              <Timeline>
                <Timeline.Item>基础信息</Timeline.Item>
                <Timeline.Item>租金信息</Timeline.Item>
                <Timeline.Item
                  dot={<ClockCircleOutlined className="timeline-clock-icon" />}
                  color="red"
                >
                  详细介绍
                </Timeline.Item>
                <Timeline.Item>房源图片</Timeline.Item>
                <Timeline.Item>联系信息</Timeline.Item>
              </Timeline>
            </Card>
          </Affix>
        </Col>
      </Row>
    </div>
  );
};
export default Release;
