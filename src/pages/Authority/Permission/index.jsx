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
  Select,
  Typography,
  Spin,
} from 'antd';
import {
  getAllPermissions,
  addPermission,
  deletePermission,
  updatePermission,
  getRequestByUrl,
  assignRequest,
} from '@/services/request_permission';
import debouncs from 'lodash/debounce';
import style from '../style.less';

const { Item } = Form;
const { Text, Title } = Typography;
const { Option } = Select;

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
            <Divider type="vertical" />
            <Popconfirm
              title="确认分配URL？"
              onConfirm={() => this.addRoute(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">分配URL</a>
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
      fetching: false,
      visible: false,
      modalTitle: '',
      loading: false,
      cur_id: 0,
      selectOpt: [],
      selectId: null,
      urlData: [],
    };
    this.getUser = debouncs(this.queryUrl, 800);
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

  addRoute = (rid) => {
    this.setState({
      cur_id: rid,
      visible: true,
    });
  };

  handleOnPage = (page, pageSize) => {
    this.getPermissionsByItems(page, pageSize);
  };

  handleAssignCancel = () => {
    this.setState({
      visible: false,
      selectOpt: '',
    });
  };

  handleAssinOk = () => {
    // @todo 权限分配路由
    const { cur_id, selectOpt } = this.state;
    const userRequestPermissionList = [{ permissionId: cur_id, urlId: selectOpt.value }];
    assignRequest({ userRequestPermissionList }).then((data) => {
      if (data && data.code === 200) {
        message.success(data.msg);
        this.setState({
          visible: false,
        });
      } else {
        message.error(data.msg);
      }
    });
  };

  // 搜索框查询
  handleSearch = (value) => {
    if (value) {
      this.queryUrl(value);
    } else {
      this.setState({ urlData: [] });
    }
  };

  //模糊查询
  queryUrl = (value) => {
    getRequestByUrl({ url: value }).then((data) => {
      if (data.code === 200) {
        const urlData = [];
        data['data'].map((item) => {
          urlData.push({
            text: item.url,
            value: item.id,
          });
        });
        this.setState({
          urlData,
        });
      }
    });
  };

  handleChange = (value) => {
    this.setState({
      selectOpt: value,
      fetching: false,
      urlData: [],
    });
  };

  render() {
    const {
      dataSource,
      modalVisible,
      visible,
      modalTitle,
      current,
      pageSize,
      total,
      loading,
      fetching,
      urlData,
      selectOpt,
    } = this.state;

    return (
      <PageContainer>
        <Card>
          <div className={style.contain}>
            <Title level={4}>权限表</Title>
            <Button
              type="primary"
              className={style.btn}
              onClick={() => {
                this.setState({ modalVisible: true, modalTitle: '新增路由' });
              }}
            >
              新增路由
            </Button>
          </div>
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
        <Modal
          title="分配URL"
          visible={visible}
          onCancel={this.handleAssignCancel}
          onOk={this.handleAssinOk}
          okText="确认"
          cancelText="取消"
        >
          <div className={style.select_flex}>
            <Text className={style.text}>URL:</Text>
            <Select
              labelInValue
              className={style.select}
              showSearch
              value={selectOpt}
              placeholder="选择需要分配的URL"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearch}
              onChange={this.handleChange}
            >
              {urlData.map((d) => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>
          </div>
        </Modal>
      </PageContainer>
    );
  }
}
