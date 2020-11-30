import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Divider, Typography, Popconfirm, Modal, Pagination, Button } from 'antd';
import { getAllUser } from '@/services/login';
import { getAllPermissions } from '@/services/request_permission';
import style from '../style.less';

const { Text, Title } = Typography;

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

export default class Manage extends React.PureComponent {
  columns = [
    {
      title: '用户姓名',
      dataIndex: 'addressName',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '链上地址',
      dataIndex: 'address',
      width: 150,
      render: (address) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <Text ellipsis copyable>
            {address}
          </Text>
        </div>
      ),
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      render: (role) => {
        const text = getRole(role)
        return <Text>{text}</Text>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        let text;
        switch (status) {
          case '0':
            text = '正常';
            break;
          case '1':
            text = '封号';
            break;
          case '2':
            text = '注销';
            break;
        }
        return <Text>{text}</Text>;
      },
    },
    {
      title: '账号是否可用',
      dataIndex: 'enabled',
      render: (enabled) => (enabled ? '可用' : '不可用'),
    },
    {
      title: '账号是否锁定',
      dataIndex: 'accountNotLocked',
      render: (enabled) => (enabled ? '未锁定' : '锁定'),
    },
    {
      title: '账号是否过期',
      dataIndex: 'accountNotExpired',
      render: (enabled) => (enabled ? '未过期' : '过期'),
    },
    {
      title: '证书密码是否过期',
      dataIndex: 'credentialsNotExpired',
      render: (enabled) => (enabled ? '未过期' : '过期'),
    },
    {
      title: '上次登录时间',
      dataIndex: 'lastLoginTime',
    },
    {
      title: '操作',
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
              onConfirm={() => this.viewPermission(record.role)}
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

  // 权限表格
  auth_columns = [
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
    {
      title: '操作',
      render: (_, record) => {
        return (
          <Popconfirm
            title="确认删除改权限？"
            onConfirm={() => this.queryPermissionByUser(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除权限</a>
          </Popconfirm>
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
      currentuser: '',
      visible: false,
      user_loading: true,
      permission_loading: true,
      auth_loading: true,
      auth_visible: false,
      pageSize: 5,
      total: 0,
      current: 1,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    getAllUser().then((value) => {
      if (value && value.code === 200) {
        this.setState({
          dataSource: value.data,
          user_loading: false,
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
    let currentuser = getRole(role);
    this.setState({
      currentuser,
      auth_visible: true,
    });
  };

  // 删除角色权限
  deleteAuthority = (id) => {};

  // 角色添加权限
  assignPermission = () => {
    // @角色添加权限
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 页面更改触发事件
  handleOnPage = (page, pageSize) => {
    this.getPermissionsByItems(page, pageSize);
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

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  render() {
    const {
      dataSource,
      auth_datasource,
      permission_data,
      currentuser,
      visible,
      current,
      pageSize,
      total,
      selectedRowKeys,
      user_loading,
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
          <Title level={4}>用户表</Title>
          <Table
            loading={user_loading}
            rowKey="id"
            columns={this.columns}
            dataSource={dataSource}
          />
        </Card>
        {auth_visible ? (
          <Card className={style.table}>
            <Title level={4}>{currentuser} - 权限</Title>
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
