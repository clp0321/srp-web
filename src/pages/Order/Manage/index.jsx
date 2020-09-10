import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, DatePicker, Input, Radio, Button, Badge, Modal } from 'antd';
import moment from 'moment';
import OrderDetail from './component/OrderDetail';
import style from './style.less';

const { RangePicker } = DatePicker;

const OrderManage = () => {
  const [status, setStatus] = useState('unfinished');
  const [visible, setVisible] = useState(false);

  const defaultData = [
    {
      code: '12323',
      status: 0,
      Lessor: 'zou',
      Lessee: 'xiang',
      start_time: moment(new Date()).format('YYYY-MM-DD'),
      end_time: moment(new Date()).format('YYYY-MM-DD'),
      rent: 1000,
    },
  ];

  // 订单基本信息
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'code',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
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
      title: '起租时间',
      dataIndex: 'start_time',
    },
    {
      title: '起租时间',
      dataIndex: 'end_time',
    },
    {
      title: '租金',
      dataIndex: 'rent',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => {
        return <a onClick={() => handleWatch(record.code)}>详情</a>;
      },
    },
  ];
  const options = [
    { label: '未完成', value: 'unfinished' },
    { label: '完成', value: 'finished' },
  ];
  // 订单扩展内容
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

  const handleWatch = (code) => {
    setVisible(true);
  };

  return (
    <PageContainer>
      <Card className={style.searchOption}>
        <Radio.Group
          options={options}
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          optionType="button"
          style={{ marginRight: 10 }}
          buttonStyle="solid"
        />
        <RangePicker placeholder={['查询开始时间', '查询结束时间']} />
        <Input placeholder="房东姓名" />
        <Input placeholder="代理服务商姓名" />
        <Input placeholder="租客姓名" />
        <Button type="danger">重置</Button>
      </Card>
      <Card>
        <Table
          rowKey="code"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={defaultData}
        />
      </Card>
      <Modal
        title="订单详情"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <Button type="primary" onClick={() => setVisible(false)}>
            确认
          </Button>
        }
      >
        {/* <OrderDetail /> */}
      </Modal>
    </PageContainer>
  );
};

export default OrderManage;
