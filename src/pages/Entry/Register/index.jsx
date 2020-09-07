import { Alert, Checkbox, message, Form } from 'antd';
import React, { useState } from 'react';
import { Link, connect, history } from 'umi';
import FormWraper from '@/components/FormWraper';
import { findSomeOne } from '@/services/login';
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
  const [form] = Form.useForm();
  const [userError, setError] = useState('');
  const [help, setHelp] = useState(null);
  const [initialValue] = useState({
    userName:'',
    password: '',
    rePassword: '',
    phone: '',
    role: '选择用户角色'
  })
  const { userRegister = {}, submitting } = props;
  const { registerStatus, type: loginType } = userRegister;
  

  // 注册用户
  const handleSubmit = (values, form) => {
    const { dispatch } = props;
    const { userName, password, phone, role } = values;
    dispatch({
      type: 'login/register',
      payload: { userName, password, phone, role },
    }).then((res) => {
      if (res) {
        message.success('注册成功');
        console.log(form)
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
      setHelp('用户名已存在')
    } else {
      setError('');
      setHelp(null)
    }
  };


  return (
    <div className={styles.main}>
      <FormWraper onSubmit={handleSubmit} initialValue={initialValue} form={form}>
        {registerStatus === 'error' && loginType === 'username' && !submitting && (
          <RegisterMessage content="注册失败" />
        )}
        <UserName
          name="userName"
          placeholder="用户名"
          onBlur={handleOnblur}
          status={userError}
          help={help}
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
                return Promise.reject('两次输入密码不一致！');
              },
            }),
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
        <Submit onClick={() => history.push('/client/logining')}>前往登陆</Submit>
      </FormWraper>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userRegister: login,
  submitting: loading.effects['login/login'],
}))(Register);
