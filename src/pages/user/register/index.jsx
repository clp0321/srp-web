import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, history } from 'umi';
import FormWraper from '@/components/FormWraper';
import styles from './style.less';

const { UserName, Password, Mobile, Select, Submit } = FormWraper;

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
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  // 注册用户
  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <FormWraper activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        {status === 'error' && loginType === 'username' && !submitting && (
          <RegisterMessage content="验证码错误" />
        )}
        <UserName
          name="username"
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Mobile
          name="phone"
          placeholder="手机号"
          rules={[
            {
              required: true,
              message: '请输手机号码！',
            },
            {
              pattern: /^1\d{10}$/,
              message: '请输入正确的手机号！',
            },
          ]}
        />
        <Select
          name="role"
          placeholder="用户角色"
          rules={[
            {
              required: true,
              message: '请选择用户角色',
            },
          ]}
        />
        <Submit loading={submitting} type="primary">
          注册
        </Submit>
        <Submit onClick={() => history.push('/user/login')}>前往登陆</Submit>
      </FormWraper>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Register);
