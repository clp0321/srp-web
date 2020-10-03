import { useState } from 'react';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Avatar, Upload, Button, Select, Input } from 'antd';
import style from './style.less';

const { Item } = Form;
const { Option } = Select;

const Setting = () => {
  return (
    <div className={style.baseInfo}>
      <Form className={style.left_form} layout="vertical">
        <Item label="用户名" name="address_name">
          <Input placeholder="请输入用户名" />
        </Item>
        <Item label="昵称" name="user_name">
          <Input placeholder="请输入用户名" />
        </Item>
        <Item label="用户角色" name="role">
          <Select>
            <Option></Option>
          </Select>
        </Item>
        <Item label="身份证号" name="cert_id">
          <Input />
        </Item>
        <Item label="电话号码" name="phone">
          <Input />
        </Item>
        <Item label="用户地址" name="address">
          <Input />
        </Item>
        <Item label="用户哈希" name="address">
          <Input />
        </Item>
        <Item label="信用分" name="credit_value">
          <Input />
        </Item>
        <Item>
          <Button type="primary">更新基本信息</Button>
        </Item>
      </Form>
      <div className={style.right_avatar}>
        <Avatar size={150} icon={<UserOutlined />} />
        <Upload>
          <Button style={{ marginTop: 10 }} icon={<UploadOutlined />}>
            更换头像
          </Button>
        </Upload>
      </div>
    </div>
  );
};
export default Setting;
