import React, { useState } from 'react';
import { Form, Input, Radio, InputNumber, Select } from 'antd';
import style from './style.less';

const { Option } = Select;
const { Item } = Form;

const Configure = () => {
  const [method, setMethod] = useState(0);
  const [payway, setPayway] = useState(0);
  const form = Form.useForm();
  const handleMethod = e => {
    setMethod(e.target.value);
  };
  const handlePayWay = value => {
    setPayway(value)
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div className={style.base}>
      <Form {...formItemLayout}>
        <Item
          name="method"
          label="出租方式"
          rules={[
            {
              required: true,
              message: '请选择出租方式',
            },
          ]}
        >
          <Radio.Group onChange={handleMethod} value={method}>
            <Radio value={0}>整租</Radio>
            <Radio value={1}>合租</Radio>
          </Radio.Group>
        </Item>
        <Item
          name="payway"
          label="支付方式"
          rules={[
            {
              required: true,
              message: '请选择出租方式',
            },
          ]}
        >
          <Select onChange={handlePayWay} value={payway} placeholder="请选择支付方式">
            <Option value={0}>押一付一</Option>
            <Option value={1}>押一付二</Option>
            <Option value={2}>半年付</Option>
            <Option value={3}>年付</Option>
          </Select>
        </Item>
        <Item
          name="price"
          label="租金(¥)"
          rules={[
            {
              required: true,
              message: '请输入租金',
            },
          ]}
        >
          <InputNumber  placeholder="请输入租金" />
        </Item>
        <Item
          name="设备ID"
          label="设备"
          rules={[
            {
              required: true,
              message: '请输入设备ID',
            },
          ]}
        >
          <Input  placeholder="请输入设备ID" />
        </Item>
        <Item
          name="phone"
          label="联系方式"
          rules={[
            {
              required: true,
              message: '请输入联系方式',
            },
          ]}
        >
          <Input placeholder="请输入联系方式" />
        </Item>
        <Item
          name="description"
          label="其他信息"
        >
          <Input.TextArea  placeholder="其他备注信息" />
        </Item>
      </Form>
    </div>
  );
};

export default Configure;
