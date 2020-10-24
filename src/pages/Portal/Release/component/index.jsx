import { useState } from 'react';
import {
  Select,
  Radio,
  Button,
  Checkbox,
  Input,
  Typography,
  DatePicker,
  Space,
  Form,
  Row,
  Col,
  Cascader,
} from 'antd';
import UploadComponent from '@/components/Upload';
import position from '../doc/position';
import style from '../style.less';

const { Item } = Form;
const { Option } = Select;
const { Text, Title, Paragraph } = Typography;
const CheckboxGroup = Checkbox.Group;

const rentContain = ['水费', '电费', '燃气费', '贷款费', '物业费', '停车费'];

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

// 正则数字
const numberRegex = {
  pattern: /^\+?[1-9][0-9]*$/,
  message: '请输入不小于0的正整数',
};

// 房屋面积正则
const sizeRegex = {
  pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/,
  message: '请输入最多两位小数的数字',
};

// Title
const TitleCon = ({ title }) => {
  return (
    <Title level={4} className={style.title}>
      {title}
    </Title>
  );
};

// baseInfo 基础信息
const BaseInfo = () => {
  const baseLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
    },
  };
  const handlePositionChange = (value) => {};
  return (
    <>
      <TitleCon title="基础信息" />
      <Item
        name="location"
        label="所在位置"
        rules={[
          {
            required: true,
            message: '请选择所在位置',
          },
        ]}
      >
        <Cascader
          options={position}
          onChange={handlePositionChange}
          placeholder="选择所在位置"
          style={{ width: 400 }}
        />
      </Item>
      <Row>
        <Col>
          <Item
            name="position"
            label="详细区域"
            {...baseLayout}
            rules={[
              {
                required: true,
                message: '请输入所在区域',
              },
            ]}
          >
            <Input placeholder="输入所在区域" style={{ width: 200 }} />
          </Item>
        </Col>
        <Col>
          <Item
            label="设备编号"
            name="deviceId"
            {...baseLayout}
            rules={[
              {
                required: true,
                message: '请输入设备编号',
              },
            ]}
            style={{ marginLeft: 8 }}
          >
            <Input style={{ display: 'inline-block', width: 200 }} placeholder="输入设备编号" />
          </Item>
        </Col>
        <Col>
          <Item
            {...baseLayout}
            name="direction"
            label="房屋朝向"
            rules={[
              {
                required: true,
                message: '请选择房屋朝向',
              },
            ]}
            style={{ marginLeft: 8 }}
          >
            <Select placeholder="选择房屋朝向" style={{ display: 'inline-block', width: 200 }}>
              <Option value={0}>东</Option>
              <Option value={1}>南</Option>
              <Option value={2}>西</Option>
              <Option value={3}>北</Option>
            </Select>
          </Item>
        </Col>
      </Row>
      <Item label="房屋类型" style={{ display: 'flex' }} className={style.add_require}>
        <Item
          name="room"
          rules={[{ required: true, message: '请输入室', ...numberRegex }]}
          style={{ display: 'inline-block', width: 200, marginRight: 8 }}
          className={style.margin}
        >
          <Input addonAfter="室" placeholder="输入室" />
        </Item>
        <Item
          name="hall"
          rules={[{ required: true, message: '请输入厅', ...numberRegex }]}
          className={style.margin}
        >
          <Input addonAfter="厅" placeholder="输入厅" />
        </Item>
        <Item
          name="guard"
          rules={[{ required: true, message: '请输入卫', ...numberRegex }]}
          className={style.margin}
        >
          <Input addonAfter="卫" placeholder="输入卫" />
        </Item>
        <Item
          name="size"
          rules={[{ required: true, message: '请输入面积', ...sizeRegex }]}
          className={style.margin}
        >
          <Input addonAfter="㎡" addonBefore="共" placeholder="输入面积" />
        </Item>
      </Item>
    </>
  );
};
// rentInfo 租金信息
const RentInfo = () => {
  return (
    <>
      <TitleCon title="租金信息" className={style.sub_title} />
      <Item label="月租金" className={[style.flex_item, style.add_require].join(' ')}>
        <Item
          name="price"
          rules={[{ required: true, message: '请输入租金', ...sizeRegex }]}
          className={style.margin}
        >
          <Input addonAfter="￥" placeholder="输入租金" />
        </Item>
        <Item name="payway">
          <Select placeholder="请选择付款方式" className={style.margin}>
            <Option value={0}>押一付一</Option>
            <Option value={1}>押一付二</Option>
            <Option value={2}>半年付</Option>
            <Option value={3}>年付</Option>
          </Select>
        </Item>
        <Item name="method">
          <Select
            placeholder="请选择租赁形式"
            style={{ display: 'inline-block', width: 200, marginRight: 8 }}
          >
            <Option value={0}>整租</Option>
            <Option value={1}>合租</Option>
          </Select>
        </Item>
      </Item>
      <Item label="租金包含" name="contain">
        <Checkbox.Group className={style.rent_contain} options={rentContain} />
      </Item>
    </>
  );
};

// detail 详细介绍
const Detail = ({
  indeterminate,
  checkAll,
  onCheckAllChange,
  changeCheckList,
  checkedList,
  form,
}) => {
  const handleCheck = (e) => {
    onCheckAllChange(e.target.checked);
    if (e.target.checked) {
      form.current.setFields([{ name: ['configurate'], value: configuration }]);
    } else {
      form.current.setFields([{ name: ['configurate'], value: [] }]);
    }
  };

  const handleChange = (checkedList) => {
    changeCheckList(checkedList);
  };

  return (
    <>
      <TitleCon title="详细介绍" className={style.sub_title} />
      <Item label="最早入住" className={style.flex_item}>
        <Item name="enterTime">
          <DatePicker className={style.margin} />
        </Item>
        <Item name="fitPeople" rules={[{ ...numberRegex }]}>
          <Input addonAfter="人" placeholder="宜住" className={style.margin} />
        </Item>
      </Item>
      <Item label="看房时间" name="watchTime">
        <Radio.Group>
          <Radio value={1}>仅周末</Radio>
          <Radio value={2}>仅工作日</Radio>
          <Radio value={3}>随时看房</Radio>
          <Radio value={4}>工作日晚和周末</Radio>
        </Radio.Group>
      </Item>
      <Item label="房屋配置" className={style.configuration}>
        <Checkbox indeterminate={indeterminate} onChange={handleCheck} checked={checkAll}>
          全选
        </Checkbox>
        <Item name="configurate">
          <CheckboxGroup options={configuration} value={checkedList} onChange={handleChange} />
        </Item>
      </Item>
      <Item label="房屋描述" name="description">
        <Input.TextArea
          rows={5}
          placeholder="可以介绍房源亮点,交通,周边环境,可以入住二点时间和对租客的要求等,详细的房源描述信息会大大增加快速出租的机会!"
        />
      </Item>
    </>
  );
};

// houstpic 房源图片
const HousePic = ({ form, fileList, handleFile }) => {
  return (
    
    <>
      <TitleCon title="房源图片" className={style.sub_title} />
      <Item
        label="上传图片"
        name="upload"
        rules={[{ require: true }]}
        className={[style.house_pic, style.add_require].join(' ')}
      >
        <Paragraph>
          请上传清晰、实拍的室内图片，请不要在图片上添加文字、数字、网址等内容，请勿上传名片、二维码、自拍照、风景照等与房源无关的图片，最多上传12张，每张最大1M
        </Paragraph>
        <Item noStyle>
          <UploadComponent form={form} fileList={fileList} handleFile={handleFile} />
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
      <Item label="发布人" name="publisher">
        <Input disabled />
      </Item>
      <Item label="身份选择" name="role">
        <Input disabled />
      </Item>

      <Item
        label="手机号"
        name="phone"
        rules={[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号！',
          },
        ]}
      >
        <Input placeholder="输入手机号" />
      </Item>
    </>
  );
};

// 按钮集合
const ButtonList = ({ handleSubmit, resetData }) => {
  return (
    <div className={style.btn_list}>
      <Space size="large">
        <Button type="primary" onClick={handleSubmit}>
          房源发布
        </Button>
        <Button type="danger" onClick={resetData}>
          信息重置
        </Button>
      </Space>
    </div>
  );
};

export { BaseInfo, RentInfo, Detail, HousePic, ContactInfo, ButtonList };
