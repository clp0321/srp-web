import { useEffect } from 'react';
import { Alert, Checkbox, Button } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import FormWraper from '@/components/FormWraper';
import styles from './style.less';

const { UserName, Password, Mobile, Captcha, Submit } = FormWraper;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);

  useEffect(() => {
    document.title = "区块链共享租赁平台-用户登陆"
  })

  const handleSubmit = (values) => {
    const { dispatch } = props;
    const { userName, password } = values;
    dispatch({
      type: 'login/login',
      payload: { userName, password },
    });
  };

  return (
    <div className={styles.main}>
      <FormWraper onSubmit={handleSubmit}>
        {status === 'error' && !submitting && <LoginMessage content="登陆失败" />}
        <UserName
          name="userName"
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
        <Captcha
          name="captcha"
          placeholder="验证码"
          countDown={120}
          getCaptchaButtonText=""
          getCaptchaSecondText="秒"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        />
        <Submit type="primary" htmlType="submit" loading={submitting}>
          登录
        </Submit>
        <div className={styles.other}>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <Link className={styles.register} to="/client/register">
            注册账户
          </Link>
        </div>
      </FormWraper>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
