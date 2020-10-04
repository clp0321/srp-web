import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Badge, Card, Radio, DatePicker, Input, Button, Modal, Descriptions } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { getProperty, getHouseDetail  } from '@/services/property';
import moment from 'moment';


const { RangePicker } = DatePicker;

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      houseData: [],
      houseRentData: [],
      houseDetail: {
        deviceId: '',
        houseOwner: '',
        agency: '',
        position: '',
        size: '',
        houseStatus: '',
        specify: '',
        authTime: '',
      },
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  async getAllData() {
    const resp = await getProperty();
    if (resp.msg === 'SUCCESS') {
      this.setState({
        houseData: resp.data,
      });
    }
  }

  // method
  // payway
  columns = [
    {
      title: '房屋Id',
      dataIndex: 'houseId',
    },
    {
      title: '链上哈希值',
      dataIndex: 'houseHash',
    },
    {
      title: '租赁形式',
      dataIndex: 'method',
      render: (_, record) => (record.method === 0 ? '整租' : '合租'),
    },
    {
      title: '支付方式',
      dataIndex: 'payway',
      render: (_, record) => {
        const { payway } = record;
        let text;
        switch (payway) {
          case 0:
            text = '押一付一';
            break;
          case 1:
            text = '押一付二';
            break;
          case 2:
            text = '半年付';
            break;
          case 3:
            text = '全年付';
            break;
          default:
            text = '';
        }
        return <span>{text}</span>;
      },
    },
    {
      title: '租金价格',
      dataIndex: 'price',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '房源描述',
      dataIndex: 'description',
    },
    {
      title: '发布人',
      dataIndex: 'publisher',
    },
    {
      title: '房屋状态',
      dataIndex: 'houseStatus',
      render: (_, record) => {
        const { houseStatus } = record;
        return (
          <>
            <Badge status={!houseStatus ? 'default' : 'success'} />
            {!houseStatus ? '空闲' : '在租'}
          </>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <a onClick={() => this.handleWatch(record.houseId)}>详情</a>
        </>
      ),
    },
  ];

  handleWatch = async (house_id) => {
    const resp = await getHouseDetail(house_id);
    if (resp.msg === 'SUCCESS') {
      this.setState({
        visible: true,
        houseDetail: { ...resp.data },
      });
    }
  };

  render() {
    const {
      visible,
      houseData,
      houseDetail: { deviceId, houseOwner, agency, position, size, houseStatus, specify, authTime },
    } = this.state;
    return (
      <PageContainer>
        <Card style={{ marginBottom: 24 }}>
          <Radio.Group defaultValue={0}>
            <Radio value={0}>全部</Radio>
            <Radio value={1}>已上链</Radio>
            <Radio value={2}>未上链</Radio>
          </Radio.Group>
          <Button type="danger" icon={<ReloadOutlined />}>
            重置
          </Button>
        </Card>
        <Table dataSource={houseData} columns={this.columns} rowKey="houseId" />
        <Modal
          visible={visible}
          title="房产详情"
          onCancel={() => this.setState({ visible: false })}
          footer={<Button onClick={() => this.setState({ visible: false })}>确认</Button>}
        >
          <Descriptions bordered column={2} size={this.state.size}>
            <Descriptions.Item label="物联网设备ID">{deviceId}</Descriptions.Item>
            <Descriptions.Item label="产权人">{houseOwner}</Descriptions.Item>
            <Descriptions.Item label="代理人">{agency}</Descriptions.Item>
            <Descriptions.Item label="房源位置">{position}</Descriptions.Item>
            <Descriptions.Item label="房屋面积">{size}</Descriptions.Item>
            <Descriptions.Item label="房屋状态">{houseStatus}</Descriptions.Item>
            <Descriptions.Item label="房屋类型">{specify}</Descriptions.Item>
            <Descriptions.Item label="存证时间">{authTime}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </PageContainer>
    );
  }
}

export default Manage;
