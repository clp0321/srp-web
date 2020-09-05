import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import LoginContext from './LoginContext';
import LoginItem from './LoginItem';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

const Login = (props) => {
  const { className, initialValue } = props;
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState({});
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });

  return (
    <LoginContext.Provider
      value={{
        tabUtil: {
          addTab: (id) => {
            setTabs([...tabs, id]);
          },
          removeTab: (id) => {
            setTabs(tabs.filter((currentId) => currentId !== id));
          },
        },
        updateActive: (activeItem) => {
          if (!active) return;

          if (active[type]) {
            active[type].push(activeItem);
          } else {
            active[type] = [activeItem];
          }

          setActive(active);
        },
      }}
    >
      <div className={classNames(className, styles.login)}>
        <Form
          initialValues={initialValue}
          form={props.form}
          onFinish={(values) => {
            if (props.onSubmit) {
              props.onSubmit(values, props.form);
            }
          }}
        >
          {props.children}
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

Login.Submit = LoginSubmit;
Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;
Login.Select = LoginItem.Select;
export default Login;
