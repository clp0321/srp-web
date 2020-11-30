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
  Typography,
} from 'antd';
import {
  addRequest,
  getAllrequest,
  deleteRequest,
  updateRequest,
} from '@/services/request_permission';
import style from '../style.less';

const { Item } = Form;
const { Title } = Typography;

export default class Request extends React.PureComponent {
  formRef = React.createRef();

  columns = [
    {
      title: '路由url',
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: '路由描述',
      dataIndex: 'description',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="确认删除该路由？"
              onConfirm={() => this.deleteRequestByItem(record.id)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="确认修改该路由？"
              onConfirm={() => this.updateRequestByItem(record)}
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
    this.getReqeuestByItems(1, 10);
  };

  getReqeuestByItems = (pageNum, pageSize) => {
    this.setState({
      loading: true,
    });
    getAllrequest({ pageNum, pageSize }).then((value) => {
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
      if (modalTitle === '新增路由') {
        this.handleAddRequest(value);
      } else {
        this.handelUpdateRequest(value, cur_id);
      }
      this.getReqeuestByItems(current, pageSize);
      this.setState({
        modalVisible: false,
      });
    });
  };

  // 添加路由
  handleAddRequest = (value) => {
    addRequest(value).then((data) => {
      if (data.code === 200) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    });
  };

  // 修改路由
  handelUpdateRequest = (value, cur_id) => {
    updateRequest({ id: cur_id, ...value }).then((data) => {
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

  deleteRequestByItem = (rpid) => {
    const { pageSize, current } = this.state;
    deleteRequest(rpid).then((data) => {
      if (data.code === 200) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
      this.getReqeuestByItems(current, pageSize);
    });
  };

  updateRequestByItem = (record) => {
    const { url, description, id } = record;
    this.formRef.current.setFields([
      { name: ['url'], value: url },
      { name: ['description'], value: description },
    ]);
    this.setState({
      modalVisible: true,
      modalTitle: '修改路由',
      cur_id: id,
    });
  };

  handleOnPage = (page, pageSize) => {
    this.getReqeuestByItems(page, pageSize);
  };

  render() {
    const { dataSource, modalVisible, modalTitle, current, pageSize, total, loading } = this.state;
    return (
      <PageContainer>
        <Card>
          <div className={style.contain}>
            <Title level={4}>路由表</Title>
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
              name="url"
              label="路由url"
              rules={[{ required: true, message: '路由url不能为空' }]}
            >
              <Input placeholder="输入路由格式，格式如：/user/users" />
            </Item>
            <Item
              name="description"
              label="路由描述"
              rules={[{ required: true, message: '路由描述不能为空' }]}
            >
              <Input placeholder="输入路由描述描述，格式如：查询用户信息" />
            </Item>
          </Form>
        </Modal>
      </PageContainer>
    );
  }
}
