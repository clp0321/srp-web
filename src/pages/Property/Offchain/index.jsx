import React, { Component } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Protable from '@ant-design/pro-table';
import { getProperty } from '@/services/property';

class Manage extends Component {
  constructor(props) {
    super(props);
  }

  actionTable = React.createRef();

  componentDidMount() {
    console.log(this.actionTable);
  }

  columns = [
    {
      title: 'houese_id',
      dataIndex: 'house_id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '产权人',
      dataIndex: 'owner',
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
      title: '房屋状态',
      dataIndex: 'status',
    },
    {
      title: '房源发布时间',
      dataIndex: 'realase_time',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <a onClick={() => {}}>更新</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除该用户？"
            onConfirm={async () => {}}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  render() {
    return (
      <PageContainer>
        <Protable actionRef={this.actionTable} rowKey="house_id" columns={this.columns}></Protable>
      </PageContainer>
    );
  }
}

export default Manage;
