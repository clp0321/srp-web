import react from 'react';
import { Table, Card, Divider, Typography, Popconfirm, Modal, Pagination, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { getAllPermissions } from '@/services/request_permission';

import style from '../style.less';

const { Title } = Typography;

// 获取用户角色
function getRole(role) {
  let text;
  switch (role) {
    case 0:
      text = '租客';
      break;
    case 1:
      text = '房东';
      break;
    case 2:
      text = '代理商';
      break;
    case 3:
      text = '监管方';
      break;
    case 4:
      text = '平台方';
      break;
    case 5:
      text = '超管';
      break;
  }
  return text;
}

// 平台角色
const roleData = [
  {
    id: 0,
    role_name: '租客',
    role_description: '租客',
  },
  {
    id: 1,
    role_name: '房东',
    role_description: '房东，拥有部分权限',
  },
  {
    id: 2,
    role_name: '代理商',
    role_description: '代理商',
  },
  {
    id: 3,
    role_name: '监管方',
    role_description: '监管方',
  },
  {
    id: 4,
    role_name: '平台方',
    role_description: '平台方',
  },
  {
    id: 5,
    role_name: '超级管理员',
    role_description: '超级管理员，拥有所有权限',
  },
];

export default class Role extends React.Component {
  columns = [
    {
      title: '用户角色',
      dataIndex: 'role_name',
      align: 'center',
    },
    {
      title: '角色描述',
      dataIndex: 'role_description',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="确认分配权限？"
              onConfirm={() => this.queryPermissionByUser(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">分配权限</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="确认查看权限？"
              onConfirm={() => this.viewPermission(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">查询权限</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // 权限弹窗
  permission_columns = [
    {
      title: '权限编码',
      dataIndex: 'permissionCode',
      align: 'center',
    },
    {
      title: '权限描述',
      dataIndex: 'permissionName',
      align: 'center',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      auth_datasource: [],
      permission_data: [],
      currentrole: '',
      visible: false,
      permission_loading: true,
      auth_loading: true,
      auth_visible: false,
      pageSize: 5,
      total: 0,
      current: 1,
      selectedRowKeys: [],
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 查询权限信息
  getPermissionsByItems = (pageNum, pageSize) => {
    getAllPermissions({ pageNum, pageSize }).then((value) => {
      const { data } = value || {};
      if (data) {
        this.setState({
          permission_data: data.list,
          total: data.total,
          current: data.pageNum,
          pageSize,
          auth_loading: false,
        });
      }
    });
  };

  // 查询改用户权限信息
  queryPermissionByUser = (id) => {
    const { current, pageSize } = this.state;
    this.getPermissionsByItems(current, pageSize);
    this.setState({
      visible: true,
    });
  };

  // 查询角色权限
  viewPermission = (role) => {
    let currentrole = getRole(role);
    this.setState({
      currentrole,
      auth_visible: true,
    });
  };

  // 角色添加权限
  assignPermission = () => {
    // @角色添加权限
  };

  render() {
    const {
      auth_datasource,
      permission_data,
      currentrole,
      visible,
      current,
      pageSize,
      total,
      selectedRowKeys,
      permission_loading,
      auth_loading,
      auth_visible,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const len = selectedRowKeys.length;
    const SelectOpt = () => (
      <Button className={style.selectOpt} type={len > 0 ? 'primary' : 'default'}>
        已选择 {len} 项
      </Button>
    );
    return (
      <PageContainer>
        <Card>
          <Title level={4}>角色表</Title>
          <Table dataSource={roleData} columns={this.columns} pagination={false} />
        </Card>
        {auth_visible ? (
          <Card className={style.table}>
            <Title level={4}>{currentrole} - 权限</Title>
            <Table
              loading={permission_loading}
              rowKey="id"
              columns={this.auth_columns}
              dataSource={auth_datasource}
            />
          </Card>
        ) : null}
        <Modal
          title="权限列表"
          visible={visible}
          okText="授权"
          cancelText="取消"
          onOk={this.assignPermission}
          onCancel={this.handleCancel}
        >
          <div className="clearfix">
            <SelectOpt />
            <Table
              rowKey="id"
              loading={auth_loading}
              rowSelection={rowSelection}
              columns={this.permission_columns}
              dataSource={permission_data}
              pagination={false}
            />
            <Pagination
              className={style.pagination}
              current={current}
              pageSize={pageSize}
              total={total}
              showSizeChanger
              showTotal={(total) => `共 ${total} 项`}
              onChange={this.handleOnPage}
            />
          </div>
        </Modal>
      </PageContainer>
    );
  }
}
