import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import { TodoList, Accout, Audit, InfoBar } from './component/index';

export default () => (
  <PageContainer>
    <Row gutter={24}>
      <Col span={6}>
        {/* 账户资产 */}
        <Card hoverable>
          <Accout />
        </Card>
      </Col>
      <Col span={10}>
        {/* 工作审批 */}
        <Card hoverable>
          <Audit />
        </Card>
      </Col>
      {/* 信息通知 */}
      <Col span={8}>
        <Card hoverable>
          <InfoBar />
        </Card>
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: 24 }}>
      {/* 代办事项 */}
      <Col span={16}>
        <Card title="代办事项" hoverable>
          <TodoList />
        </Card>
      </Col>
      {/* 经营数据 */}
      <Col span={8}>
        <Card title="经营数据" hoverable></Card>
      </Col>
    </Row>
  </PageContainer>
);
