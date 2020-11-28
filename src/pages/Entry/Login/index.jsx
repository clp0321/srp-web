import { useEffect } from 'react';
import { Alert, Checkbox, notification, message } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import FormWraper from '@/components/FormWraper';
import styles from './style.less';

const { UserName, Password, Mobile, Captcha, Submit } = FormWraper;

// 请求状态
const returnCode = {
  401: '未认证（签名错误）',
  402: '没有登录',
  403: '没有权限',
  404: '接口不存在',
  406: '用户状态异常、公司状态异常、产品状态异常',
  10001: '参数错误',
  20001: '账号错误',
  20002: '登录失败',
  30000: '存储异常',
  1001: '参数无效',
  1002: '参数为空',
  1003: '参数类型错误',
  1004: '参数缺失',
  2001: '用户未登录',
  2002: '账号已过期',
  2003: '密码错误',
  2004: '密码过期',
  2005: '账号不可用',
  2006: '账号被锁定',
  2007: '账号不存在',
  2008: '账号已存在',
  2009: '账号下线',
};

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
    document.title = '区块链共享租赁平台-用户登陆';
  });

  const handleSubmit = (values) => {
    const { dispatch } = props;
    const { username, password } = values;
    dispatch({
      type: 'login/login',
      payload: { username, password },
    }).then(({ code, msg }) => {
      if (!code) {
        message.success('系统登录成功');
      } else {
        notification.error({
          message: `请求错误 ${returnCode[code]}`,
          description: msg,
        });
      }
    });
  };

  return (
    <div className={styles.main}>
      <FormWraper onSubmit={handleSubmit}>
        {status === 'error' && !submitting && <LoginMessage content="登陆失败" />}
        <UserName name="username" placeholder="用户名" />
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
