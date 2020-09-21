import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉！访问页面不存在~"
    extra={
      <>
        <Button type="primary" onClick={() => history.push('/srp')}>
          返回门户网页
        </Button>
        <Button type="danger" onClick={() => history.push('/')}>
          返回系统主页
        </Button>
      </>
    }
  />
);

export default NoFoundPage;
