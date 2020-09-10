import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Badge, Card, Radio, DatePicker, Input, Button, Modal } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

// mock信息
const mockData = [
  {
    address: '深圳市南山区塘朗村一号',
    cert_num: '1155111',
    publisher: 'zou',
    device_id: 'device_id_mock1',
    agency: 'daqing',
    status: 0,
  },
  {
    address: '深圳市南山区塘朗村二号',
    cert_num: '1155112',
    publisher: 'zou',
    device_id: 'device_id_mock2',
    agency: 'daqing',
    status: 1,
  },
];

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {}

  columns = [
    {
      title: '位置信息',
      dataIndex: 'address',
    },
    {
      title: '产权证号',
      dataIndex: 'cert_num',
    },
    {
      title: '物联网设备ID',
      dataIndex: 'device_id',
    },
    {
      title: '房源发布人',
      dataIndex: 'publisher',
    },
    {
      title: '代理人',
      dataIndex: 'agency',
    },
    {
      title: '房屋状态',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <>
            <Badge status={record.status === 0 ? 'default' : 'success'} />{' '}
            {record.status === 0 ? '空闲' : '在租'}
          </>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <a onClick={this.handleWatch}>详情</a>
        </>
      ),
    },
  ];

  handleWatch = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    const expandedRowRender = () => {
      const columns = [
        {
          title: '链上房产哈希',
          dataIndex: 'house_hash',
        },

        {
          title: '产权人',
          dataIndex: 'owner',
        },
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
        {
          title: '上链时间',
          dataIndex: 'hash_time',
        },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          house_hash: 'fsagfra321f234342',
          owner: '丁生',
          hash_time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        });
      }
      return <Table rowKey="house_hash" columns={columns} dataSource={data} pagination={false} />;
    };
    return (
      <PageContainer>
        <Card style={{ marginBottom: 24 }}>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>已上链</Radio>
            <Radio value={2}>未上链</Radio>
          </Radio.Group>
          <RangePicker placeholder={['查询开始时间', '查询结束时间']} style={{ marginRight: 10 }} />
          <Input placeholder="产权人" style={{ width: 200, marginRight: 10 }} />
          <Button type="danger" icon={<ReloadOutlined />}>
            重置
          </Button>
        </Card>
        <Table
          dataSource={mockData}
          expandedRowRender={expandedRowRender}
          columns={this.columns}
          rowKey="cert_num"
        />
        <Modal
          visible={visible}
          title="房产详情"
          onCancel={() => this.setState({ visible: false })}
          footer={<Button onClick={() => this.setState({ visible: false })}>确认</Button>}
        ></Modal>
      </PageContainer>
    );
  }
}

export default Manage;
