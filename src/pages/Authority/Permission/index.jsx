import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Table,
  Divider,
  Button,
  Card,
  Modal,
  Popconfirm,
  Form,
  Input,
  Pagination,
  message,
} from 'antd';
import {
  getAllPermissions,
  addPermission,
  deletePermission,
  updatePermission,
} from '@/services/request_permission';
import style from '../style.less';

const { Item } = Form;
export default class Permission extends React.PureComponent {
  formRef = React.createRef();

  columns = [
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
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="确认删除该权限？"
              onConfirm={() => this.deleteAuthority(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="确认修改该权限？"
              onConfirm={() => this.updateAuthority(record)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">修改</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      total: 0,
      current: 1,
      dataSource: [],
      modalVisible: false,
      modalTitle: '',
      loading: false,
      cur_id: 0,
    };
  }

  componentDidMount() {
    this.getAllRequests();
  }

  getAllRequests = () => {
    this.getPermissionsByItems(1, 10);
  };

  getPermissionsByItems = (pageNum, pageSize) => {
    this.setState({
      loading: true,
    });
    getAllPermissions({ pageNum, pageSize }).then((value) => {
      const { data } = value || {};
      if (data) {
        this.setState({
          dataSource: data.list,
          total: data.total,
          current: data.pageNum,
          loading: false,
          pageSize,
        });
      }
    });
  };

  handleOk = () => {
    const { pageSize, current, modalTitle, cur_id } = this.state;
    this.formRef.current.validateFields().then((value) => {
      if (modalTitle === '新增权限') {
        this.handleAddPermission(value);
      } else {
        this.handelUpdatePermission(value, cur_id);
      }
      this.getPermissionsByItems(current, pageSize);
      this.setState({
        modalVisible: false,
      });
    });
  };

  // 添加权限
  handleAddPermission = (value) => {
    addPermission(value).then((data) => {
      if (data.code === 200) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };

  // 修改权限
  handelUpdatePermission = (value, cur_id) => {
    updatePermission({ id: cur_id, ...value }).then((data) => {
      if (data.code === 200) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      modalVisible: false,
    });
  };

  deleteAuthority = (rpid) => {
    const { pageSize, current } = this.state;
    deletePermission(rpid).then((data) => {
      if (data.code === 200) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
      this.getPermissionsByItems(current, pageSize);
    });
  };

  updateAuthority = (record) => {
    const { permissionCode, permissionName, id } = record;
    this.formRef.current.setFields([
      { name: ['permissionCode'], value: permissionCode },
      { name: ['permissionName'], value: permissionName },
    ]);
    this.setState({
      modalVisible: true,
      modalTitle: '修改权限',
      cur_id: id,
    });
  };

  handleOnPage = (page, pageSize) => {
    this.getPermissionsByItems(page, pageSize);
  };

  render() {
    const { dataSource, modalVisible, modalTitle, current, pageSize, total, loading } = this.state;

    return (
      <PageContainer>
        <Card className={style.authrity}>
          <Button
            type="primary"
            className={style.btn}
            onClick={() => {
              this.setState({ modalVisible: true, modalTitle: '新增权限' });
            }}
          >
            新增权限
          </Button>
        </Card>
        <Card>
          <Table
            rowKey="id"
            columns={this.columns}
            dataSource={dataSource}
            pagination={false}
            loading={loading}
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
        </Card>
        <Modal
          forceRender
          title={modalTitle}
          visible={modalVisible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          okText="确认"
          cancelText="取消"
        >
          <Form ref={this.formRef} name="form">
            <Item
              name="permissionCode"
              label="权限编码"
              rules={[{ required: true, message: '权限编码不能为空' }]}
            >
              <Input placeholder="输入新增权限编码，格式如：insert_user" />
            </Item>
            <Item
              name="permissionName"
              label="权限描述"
              rules={[{ required: true, message: '权限描述不能为空' }]}
            >
              <Input placeholder="请输入新增权限描述，格式如：插入用户信息" />
            </Item>
          </Form>
        </Modal>
      </PageContainer>
    );
  }
}
