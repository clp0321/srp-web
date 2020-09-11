import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ReloadOutlined } from '@ant-design/icons';
import { Table, Card, Radio, DatePicker, Input, Button, Badge, Drawer } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const mockData = [
  {
    index: 'csfdsaffa',
    landlord_id: '丁生',
    rent_id: '小刘',
    agency_id: '大清',
    start_time: moment(new Date()).format('YYYY-MM-DD'),
    end_time: moment(new Date()).format('YYYY-MM-DD'),
  },
];

const ContractManage = () => {
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: '合同索引',
      dataIndex: 'index',
    },
    {
      title: '房东',
      dataIndex: 'landlord_id',
    },
    {
      title: '租客',
      dataIndex: 'rent_id',
    },
    {
      title: '代理',
      dataIndex: 'agency_id',
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
    },
    {
      title: '开始时间',
      dataIndex: 'end_time',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => {
        return <a onClick={() => setVisible(true)}>详情</a>;
      },
    },
  ];

  // 合同链上扩展
  const expandedRowRender = () => {
    const columns = [
      { title: '合同哈希', dataIndex: 'contract_hash', key: 'date' },
      { title: '合约地址', dataIndex: 'contract_address', key: 'name' },
      {
        title: '链上状态',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        contract_hash: 'fsagfra321f234342',
        contract_address: '*******',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  return (
    <PageContainer>
      <Card style={{ marginBottom: 24 }}>
        <Radio.Group defaultValue={1}>
          <Radio value={1}>已上链</Radio>
          <Radio value={2}>未上链</Radio>
        </Radio.Group>
        <Radio.Group
          defaultValue="a"
          optionType="button"
          buttonStyle="solid"
          style={{ marginRight: 10 }}
        >
          <Radio.Button value="a">房东与租客</Radio.Button>
          <Radio.Button value="b">房东与代理</Radio.Button>
        </Radio.Group>
        <RangePicker placeholder={['查询开始时间', '查询结束时间']} style={{ marginRight: 10 }} />
        <Input.Search
          placeholder="查询合同编号"
          style={{ width: 300, marginRight: 10 }}
          enterButton="查询"
        />
        <Button type="danger" icon={<ReloadOutlined />}>
          重置
        </Button>
      </Card>
      <Table
        rowKey="index"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={mockData}
      />
      <Drawer
        title="合同详情"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
      </Drawer>
    </PageContainer>
  );
};

export default ContractManage;
