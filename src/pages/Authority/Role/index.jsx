import react from 'react';
import {
  Table,
  Card,
  Divider,
  Typography,
  Popconfirm,
  Modal,
  Pagination,
  Button,
  message,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getAllPermissions,
  assignPermission,
  getPermissionByRole,
} from '@/services/request_permission';
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

  per_columns = [
    {
      key: 'per_Code',
      title: '权限编码',
      dataIndex: 'permissionCode',
      align: 'center',
    },
    {
      key: 'per_Name',
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
      role_id: null,
      selectedRowKeys: [],
      permissionRole: {
        per_pageSize: 5,
        per_total: 0,
        per_current: 0,
      },
    };
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 角色权限分页
  handleOnPermisionPage = (page, pageSize) => {
    this.getRolePermission(page, pageSize);
  };

  // 权限列表分页
  handleOnPage = (page, pageSize) => {
    this.getAllPermissions(page, pageSize);
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

  // 查询角色权限
  getRolePermission = (pageNum, pageSize, role_id) => {
    const rid = typeof role_id === 'number' ? role_id : this.state.role_id;
    getPermissionByRole({ rid, pageNum, pageSize }).then((value) => {
      if (value && value.code === 200) {
        const { total, list, pageNum, pageSize } = value.data;
        const new_obj = { per_pageSize: pageSize, per_total: total, per_current: pageNum };
        this.setState({
          auth_datasource: list,
          permissionRole: new_obj,
          permission_loading: false,
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
      role_id: id,
    });
  };

  // 查询角色权限
  viewPermission = (role) => {
    let currentrole = getRole(role);
    this.findRolePermission(role);
    this.setState({
      currentrole,
      role_id: role,
      auth_visible: true,
    });
  };

  // 查询角色权限
  findRolePermission = (role) => {
    this.getRolePermission(1, 5, role);
  };

  // 角色添加权限
  assignPermission = () => {
    // @角色添加权限
    const { selectedRowKeys, role_id } = this.state;
    const userRolePermissionRelationList = [];
    selectedRowKeys.map((id) => {
      userRolePermissionRelationList.push({
        permissionId: id,
        roleId: role_id,
      });
    });
    assignPermission({ userRolePermissionRelationList }).then((value) => {
      if (value && value.code === 200) {
        message.success(value.msg);
        this.setState({
          visible: false,
        });
      } else {
        message.error('授权失败');
      }
    });
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
      permissionRole: { per_pageSize, per_total, per_current },
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
          <Table rowKey="id" dataSource={roleData} columns={this.columns} pagination={false} />
        </Card>
        {auth_visible ? (
          <Card className={style.table}>
            <Title level={4}>{currentrole} - 权限表</Title>
            <Table
              loading={permission_loading}
              rowKey="id"
              columns={this.permission_columns}
              dataSource={auth_datasource}
              pagination={false}
            />
            <Pagination
              className={style.pagination}
              current={per_current}
              pageSize={per_pageSize}
              total={per_total}
              showSizeChanger
              showTotal={(total) => `共 ${total} 项`}
              onChange={this.handleOnPermisionPage}
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
              loading={auth_loading}
              rowSelection={rowSelection}
              columns={this.per_columns}
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
