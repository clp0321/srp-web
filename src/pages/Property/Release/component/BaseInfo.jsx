import React, { useState } from 'react';
import { Form, Input, Select, Radio, InputNumber, Upload, Button } from 'antd';
import UploadComponent from '@/components/Upload';
import style from './style.less';

const { Item } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const BaseInfo = ({ fileList, handleFile, baseInfo }) => {
  const [form] = Form.useForm();

  // 处理图片
  const handleFileList = (info) => {
    if (handleFile) {
      handleFile(info);
    }
  };
  const { position, deviceId, size, specify } = baseInfo;
  return (
    <div className={style.base}>
      <Form
        {...formItemLayout}
        name="base"
        form={form}
        initialValues={{
          position,
          deviceId,
          size,
          specify,
        }}
      >
        <Item
          name="position"
          label="所在区域"
          rules={[
            {
              required: true,
              message: '选择所在区域',
            },
          ]}
        >
          <Input placeholder="请输入所在区域" />
        </Item>
        <Item
          name="deviceId"
          label="智能门锁编号"
          rules={[
            {
              required: true,
              message: '请输入智能门锁编号',
            },
          ]}
        >
          <Input placeholder="输入智能门锁编号" />
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
          <InputNumber min={1} placeholder="输入面积" step={0.01} />
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
          <Select placeholder="选择房屋类型">
            <Option value="一室">一室</Option>
            <Option value="两室">两室</Option>
            <Option value="三室">三室</Option>
            <Option value="四室">四室</Option>
            <Option value="四室以上">四室以上</Option>
          </Select>
        </Item>
        <Item label="上传图片">
          <Form.Item name="dragger">
            <UploadComponent
              form={form}
              fileList={fileList}
              handleFile={(info) => handleFileList(info)}
            />
          </Form.Item>
        </Item>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BaseInfo;
