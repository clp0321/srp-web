import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import  TodoList  from './component/Todo' 

export default () => (
  <PageContainer>
    <Row gutter={24}>
      <Col span={16}>
        <Card
          title="代办事项"
        >
          <TodoList />
        </Card>
      </Col>
      <Col span={8}>
        <Card></Card>
      </Col>
    </Row>
  </PageContainer>
);
