import React, { useState } from 'react';
import { Form, Cascader, Input, Select, Radio, InputNumber, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import style from './style.less';

const { Item } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const BaseInfo = () => {
  const [struct, setStruct] = useState(0);
  const form = Form.useForm();
  const onChange = () => {};
  const handleMethod = (e) => {
    setStruct(e.target.value);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className={style.base}>
      <Form {...formItemLayout} name="base">
        <Item
          name="method"
          label="所在区域"
          rules={[
            {
              required: true,
              message: '请选择所在区域',
            },
          ]}
        >
          {/* <Cascader options={mockData} onChange={onChange} placeholder="请选择所在区域" /> */}
          <Input placeholder="请输入所在区域" />
        </Item>
        <Item
          name="address"
          label="详细位置"
          rules={[
            {
              required: true,
              message: '请输入详细位置',
            },
          ]}
        >
          <Input placeholder="请输入详细位置信息" />
        </Item>
        <Item
          name="size"
          label="房屋面积(m²)"
          rules={[
            {
              required: true,
              message: '请输入房屋面积',
            },
          ]}
        >
          <InputNumber min={1} placeholder="请输入面积" step={0.01} />
        </Item>
        <Item
          name="specify"
          label="房屋类型"
          rules={[
            {
              required: true,
              message: '请选择房屋类型',
            },
          ]}
        >
          <Select placeholder="请选择房屋类型">
            <Option value={0}>一室</Option>
            <Option value={1}>两室</Option>
            <Option value={2}>三室</Option>
            <Option value={3}>四室</Option>
            <Option value={4}>四室以上</Option>
          </Select>
        </Item>
        <Item label="上传图片">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽图片至此处上传</p>
              <p className="ant-upload-hint">支持单文件或多文件上传</p>
            </Upload.Dragger>
          </Form.Item>
        </Item>
        <div style={{ textAlign: 'center'}}>
          <Button type="primary" htmlType="submit" >
            下一步
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BaseInfo;
