import { useState, useEffect } from 'react';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Avatar, Upload, Button, Select, Input, message } from 'antd';
import { connect } from 'umi';
import { updateUser } from '@/services/login';
import style from './style.less';

const { Item } = Form;
const { Option } = Select;

const Setting = (props) => {
  const { dispatch, currentUser } = props;
  console.log(currentUser);
  const [form] = Form.useForm();
  const {
    addressName,
    userName,
    role,
    certId,
    phone,
    address,
    userHash,
    credit_value,
    avatar,
    password,
    id,
  } = currentUser || {};
  const handleFinish = () => {
    form.validateFields().then(async (values) => {
      const { userName } = values;
      const data = { id, ...values };
      const resp = await updateUser(data);
      if (resp.data > 0) {
        localStorage.setItem('name', userName);
        message.success('用户信息更新成功');
        updatCurUser();
      } else {
        message.error('用户信息更新失败');
      }
    });
  };

  const updatCurUser = () => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  };

  return (
    <div className={style.baseInfo}>
      <Form
        className={style.left_form}
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{
          addressName,
          userName,
          role,
          certId,
          phone,
          address,
          userHash: 'did:weid:1:0xf4e5f96de0627960c8b91c1cc126f7b5cdeacbd0',
          credit_value: 67,
          integral: 450,
          password,
        }}
      >
        <Item label="用户名" name="addressName" disabled={addressName ? true : false}>
          <Input placeholder="用户名" />
        </Item>
        <Item label="昵称" name="userName">
          <Input placeholder="昵称" />
        </Item>
        <Item label="用户角色" name="role">
          <Select placeholder="用户身份" disabled>
            <Option value={0}>租客</Option>
            <Option value={1}>房东</Option>
            <Option value={2}>监管用户</Option>
            <Option value={3}>代理服务商</Option>
          </Select>
        </Item>
        <Item label="密码" name="password">
          <Input placeholder="密码" />
        </Item>
        <Item
          label="身份证号"
          name="certId"
          rules={[
            {
              pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
              message: '身份证信息不正确',
            },
          ]}
        >
          <Input placeholder="身份证号" disabled={certId ? true : false} />
        </Item>
        <Item
          label="电话号码"
          name="phone"
          rules={[
            {
              pattern: /^1\d{10}$/,
              message: '手机号输入不正确',
            },
          ]}
        >
          <Input placeholder="电话号码" />
        </Item>
        <Item label="用户地址" name="address">
          <Input placeholder="用户地址" />
        </Item>
        <Item label="分布式ID" name="userHash">
          <Input placeholder="哈希" />
        </Item>
        <Item label="信用分" name="credit_value">
          <Input placeholder="信用分" />
        </Item>
        <Item label="用户积分" name="integral">
          <Input placeholder="用户积分" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            更新基本信息
          </Button>
        </Item>
      </Form>
      <div className={style.right_avatar}>
        <Avatar
          src={avatar}
          size={150}
          style={{ backgroundColor: currentUser.role === 1 ? '#f56a00' : '#7265e6' }}
        >
          {currentUser.role === 1 ? '售' : '租'}
        </Avatar>
        <Upload>
          <Button style={{ marginTop: 10 }} icon={<UploadOutlined />}>
            更换头像
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(Setting);
