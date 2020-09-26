import { useEffect, useState } from 'react';
import { Table, Card, Input, Radio, Badge, Divider, Modal, Form, Select, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {
  agreeApply,
  refuseApply,
  getHander,
  getHouser,
  getApply,
  getUserAccept,
} from '@/services/property';
import moment from 'moment';

const mockData = [];
const { Item } = Form;
const { Option } = Select;

const Reservation = () => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataSource, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const username = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const formLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 15,
    },
  };
  const columns = [
    {
      key: id,
    },
    {
      title: '申请人姓名',
      dataIndex: 'userName',
    },
    {
      title: '房东姓名',
      dataIndex: 'houserName',
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      render: (_, record) => moment(record.applyTime).format('YYYY-MM-DD'),
    },
    {
      title: '智能门锁标识',
      dataIndex: 'deviceNum',
    },
    {
      title: '申请状态',
      dataIndex: 'applyStatus',
      render: (_, record) => {
        const { applyStatus } = record;
        let con, state;
        switch (applyStatus) {
          case 0:
            con = '已拒绝';
            state = 'default';
            break;
          case 1:
            con = '已同意';
            state = 'success';
            break;
          case 2:
            con = '未处理';
            state = 'processing';
            break;
        }
        return <Badge text={con} status={state} />;
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '密码有效期',
      dataIndex: 'passwordTime',
      render: (_, record) => {
        let time;
        const { passwordTime } = record;
        switch (passwordTime) {
          case "0":
            time = '2小时';
            break;
          case "1":
            time = '4小时';
            break;
          case "2":
            time = '6小时';
            break;
          case "3":
            time = '8小时';
            break;
        }
        return <span>{time}</span>;
      },
    },
    {
      title: '操作',
      render: (_, record) => {
        const { id } = record;
        return (
          <>
            <a
              onClick={() => {
                setId(id);
                setVisible(true);
              }}
            >
              同意
            </a>
            <Divider type="vertical" />
            <a style={{ color: 'red' }} onClick={() => handleRefuse(id)}>
              拒绝
            </a>
          </>
        );
      },
    },
  ];
  
  useEffect(() => {
    // 区分当前登陆用户身份
    if (role === '0') {
      getHasSent();
    } else if (role === '1') {
      getTodo();
    }
  }, []);

  // 获取房东待处理
  const getTodo = () => {
    getHander(username)
      .then((value) => {
        if (value.msg === 'SUCCESS') {
          setData(value.data);
        }
      })
      .finally(() => setLoading(false));
  };
  // 获取房东以处理
  const getDid = () => {
    getHouser(username)
      .then((value) => {
        if (value.msg === 'SUCCESS') {
          setData(value.data);
        }
      })
      .finally(() => setLoading(false));
  };
  // 租客获取已申请
  const getHasSent = () => {
    getApply(username)
      .then((value) => {
        if (value.msg === 'SUCCESS') {
          setData(value.data);
        }
      })
      .finally(() => setLoading(false));
  };

  // 租客获取已同意
  const getHasAgree = () => {
    getUserAccept(username)
      .then((value) => {
        if (value.msg === 'SUCCESS') {
          setData(value.data);
        }
      })
      .finally(() => setLoading(false));
  };
  // 处理同意
  const handleAgree = () => {
    form.validateFields().then((values) => {
      const data = Object.assign({ Id: id }, values);
      agreeApply(data).then((value) => {
        if (value.data === 1) {
          message.success('操作成功');
          setVisible(false);
          getRoom();
          form.resetFields();
        } else {
          message.error('操作失败');
        }
      });
      setId('');
    });
  };
  // 选项切换
  const handleChange = (e) => {
    setLoading(true);
    if (e.target.value === 0) {
      getRoom();
    } else {
      getRooms();
    }
  };

  // 房东切换
  const getRoom = () => {
    if (role === '0') {
      getHasSent();
    } else if (role === '1') {
      getTodo();
    }
  };

  // 租客切换
  const getRooms = () => {
    if (role === '0') {
      getHasAgree();
    } else {
      getDid();
    }
  };

  // 处理拒绝
  const handleRefuse = () => {};
  return (
    <PageContainer>
      <Card style={{ marginBottom: 24 }}>
        <Radio.Group
          defaultValue={0}
          optionType="button"
          buttonStyle="solid"
          onChange={handleChange}
        >
          {role === '1' ? (
            <>
              <Radio.Button value={0}>待处理</Radio.Button>
              <Radio.Button value={1}>已处理</Radio.Button>
            </>
          ) : (
            <>
              <Radio.Button value={0}>已申请</Radio.Button>
              <Radio.Button value={1}>已同意</Radio.Button>
            </>
          )}
        </Radio.Group>
        <Input.Search
          enterButton="查询"
          placeholder="请输入查询用户姓名"
          style={{ width: 300, marginLeft: 10 }}
        />
      </Card>
      <Table
        loading={loading}
        columns={role === '0' ? columns.splice(0, columns.length - 1) : columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
      />
      <Modal
        visible={visible}
        title="授权密码"
        onCancel={() => setVisible(false)}
        onOk={handleAgree}
      >
        <Form form={form} {...formLayout}>
          <Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder="请输入房间密码" />
          </Item>
          <Item
            label="有效时间"
            name="passwordTime"
            rules={[{ required: true, message: '请选择有效时间' }]}
          >
            <Select placeholder="请输入房间密码的有效时间">
              <Option value={0}>2小时</Option>
              <Option value={1}>4小时</Option>
              <Option value={2}>6小时</Option>
              <Option value={3}>8小时</Option>
            </Select>
          </Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Reservation;
