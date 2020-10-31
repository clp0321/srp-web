import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  UserOutlined,
  IdcardTwoTone,
} from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: (
        <UserOutlined
          style={{
            color: '#1890ff',
          }}
          className={styles.prefixIcon}
        />
      ),
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <LockTwoTone className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: '888888',
    },
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <MobileTwoTone className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: '请输手机号码！',
      },
      {
        pattern: /^1\d{10}$/,
        message: '请输入正确的手机号！',
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <MailTwoTone className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: '请输入验证码！',
      },
    ],
  },
  Cert: {
    props: {
      size: 'large',
      prefix: <IdcardTwoTone className={styles.prefixIcon} />,
      placeholder: 'certId',
    },
    rules: [
      {
        pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
        message: '身份证信息不正确',
      },
    ],
  },
  RoleSelect: {
    props: {
      size: 'large',
      placeholder: '选择用户角色',
    },
    rules: [
      {
        required: true,
        message: '请选择用户角色',
      },
    ],
  },
};
