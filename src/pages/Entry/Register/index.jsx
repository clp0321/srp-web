import React, { useState, useEffect } from 'react';
import { Alert, Checkbox, message, Form, Select } from 'antd';
import { Link, connect, history } from 'umi';
import FormWraper from '@/components/FormWraper';
import { findSomeOne } from '@/services/login';
import styles from './style.less';

const { UserName, Password, Mobile, Submit, Cert, RoleSelect } = FormWraper;

const FormItem = Form.Item;

// 错误提示信息
const RegisterMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Register = (props) => {
  const [form] = Form.useForm();
  const [userError, setError] = useState('');
  const [help, setHelp] = useState(null);
  const { userRegister = {}, submitting } = props;
  const { registerStatus, type: loginType } = userRegister;

  useEffect(() => {
    document.title = '区块链共享租赁平台-用户注册';
  });

  // 注册用户
  const handleSubmit = (values, form) => {
    const { dispatch } = props;
    values.enabled = true; // 添加unabled属性
    dispatch({
      type: 'login/register',
      payload: values,
    }).then((res) => {
      if (res) {
        message.success('注册成功');
        form.resetFields();
      } else {
        message.error('注册失败');
      }
    });
  };

  const handleOnblur = async (e) => {
    const resp = await findSomeOne(e.target.value);
    if (resp && resp.data) {
      setError('error');
      setHelp('用户名已存在');
    } else {
      setError('');
      setHelp(null);
    }
  };

  return (
    <div className={styles.main}>
      <FormWraper onSubmit={handleSubmit} form={form}>
        {registerStatus === 'error' && loginType === 'username' && !submitting && (
          <RegisterMessage content="注册失败" />
        )}
        <UserName name="addressName" placeholder="姓名" />
        <UserName
          name="userName"
          placeholder="用户名"
          onBlur={handleOnblur}
          status={userError}
          help={help}
        />
        <Password
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
          placeholder="密码"
        />
        <Password
          name="rePassword"
          placeholder="确认密码"
          rules={[
            {
              required: true,
              message: '请输入确认密码！',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不匹配!');
              },
            }),
          ]}
        />
        <Mobile name="phone" placeholder="手机号" />
        <Cert name="certId" placeholder="身份证号" />
        <RoleSelect name="role" />
        <Submit loading={submitting} type="primary">
          注册
        </Submit>
        <Submit onClick={() => history.push('/client/logining')}>前往登陆</Submit>
      </FormWraper>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userRegister: login,
  submitting: loading.effects['login/login'],
}))(Register);
