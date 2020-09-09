import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

const OrderManage = () => {
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'code',
    },
    {
      title: '租客',
      dataIndex: 'Lessor',
    },
    {
      title: '房东',
      dataIndex: 'Lessee',
    },
    {
      title: '代理服务',
      dataIndex: 'Lessor',
    },
    {
      title: '交易时间',
      dataIndex: 'Lessor',
    },
    {
      title: '租金',
      dataIndex: 'Lessor',
    },
    {
      title: '押金',
      dataIndex: 'Lessor',
    },
  ];
  return (
    <PageContainer>
      <Card>
     
      </Card>
    </PageContainer>
  );
};

export default OrderManage;
