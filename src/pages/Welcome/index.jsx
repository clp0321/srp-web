import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import { TodoList, Accout, Audit, InfoBar, ModuleEntry, DataManage } from './component/index';

 const Welcome = () => (
  <PageContainer>
    <Row gutter={24}>
      <Col span={16}>
        <Row gutter={24}>
          <Col span={9}>
            {/* 账户资产 */}
            <Card hoverable bodyStyle={{ height: 245 }}>
              <Accout />
            </Card>
          </Col>
          <Col span={15}>
            {/* 工作审批 */}
            <Card hoverable bodyStyle={{ height: 245 }}>
              <Audit />
            </Card>
          </Col>
        </Row>
        {/* 快速导航 */}
        <Card style={{ marginTop: 24 }} hoverable>
          <ModuleEntry />
        </Card>
      </Col>
      {/* 信息通知 */}
      <Col span={8}>
        <Card hoverable bodyStyle={{ height: 392 }}>
          <InfoBar />
        </Card>
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: 24 }}>
      {/* 代办事项 */}
      <Col span={16}>
        <Card title="代办事项" hoverable bodyStyle={{ height: 480 }}>
          <TodoList />
        </Card>
      </Col>
      {/* 经营数据 */}
      <Col span={8}>
        <Card title="经营数据" hoverable bodyStyle={{ height: 480 }}>
          <DataManage />
        </Card>
      </Col>
    </Row>
  </PageContainer>
);

export default Welcome;