import { Button, Col, Input, Row, Form, message, Select } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { getFakeCaptcha } from '@/services/login';
import ItemMap from './map';
import LoginContext from './LoginContext';
import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
  status = '',
  help = null,
}) => {
  const options = {
    rules: rules || customProps.rules,
  };

  if (onChange) {
    options.onChange = onChange;
  }

  if (defaultValue) {
    options.initialValue = defaultValue;
  }

  if (status) {
    options.validateStatus = status;
  }

  if (help) {
    options.help = help;
  }

  return options;
};

const LoginItem = (props) => {
  const [count, setCount] = useState(props.countDown || 0);
  const [timing, setTiming] = useState(false); // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil

  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;
  const onGetCaptcha = useCallback(async (mobile) => {
    const result = await getFakeCaptcha(mobile);

    if (result === false) {
      return;
    }

    message.info('验证码为：1234');
    setTiming(true);
  }, []);

  useEffect(() => {
    let interval = 0;
    const { countDown } = props;

    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval); // 重置秒数

            return countDown || 60;
          }

          return preSecond - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timing]);

  if (!name) {
    return null;
  } // get getFieldDecorator props

  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  if (type === 'Captcha') {
    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
    return (
      <FormItem shouldUpdate noStyle>
        {({ getFieldValue }) => (
          <Row gutter={8}>
            <Col span={14}>
              <FormItem name={name} {...options}>
                <Input {...customProps} {...inputProps} />
              </FormItem>
            </Col>
            <Col span={10}>
              <Button
                disabled={timing}
                className={styles.getCaptcha}
                size="large"
                onClick={() => {
                  const value = getFieldValue('mobile');
                  onGetCaptcha(value);
                }}
              >
                <span>{timing ? `${count} 秒` : '获取验证码'}</span>
              </Button>
            </Col>
          </Row>
        )}
      </FormItem>
    );
  }

  if (type === 'RoleSelect') {
    return (
      <FormItem name={name} {...options}>
        <Select {...customProps} {...otherProps}>
          <Option value={0}>租客</Option>
          <Option value={1}>房东</Option>
          <Option value={2}>监管用户</Option>
          <Option value={3}>代理服务商</Option>
        </Select>
      </FormItem>
    );
  }

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems = {};
Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];
  LoginItems[key] = (props) => (
    <LoginContext.Consumer>
      {(context) => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});
export default LoginItems;
