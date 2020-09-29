import { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Typography,
  Divider,
  Badge,
  Table,
  message,
  Dropdown,
  Form,
  Select,
  DatePicker,
  Modal,
} from 'antd';
import { SearchOutlined, ToolOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getLockList } from '@/services/lock';
import style from './style.less';

const { Text, Paragraph } = Typography;
const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Authorize = () => {
  const [lockList, setLockList] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [modalType, setType] = useState('');
  const [updateVisible, setUpdateVisible] = useState(false);
  const [footerKey, setFooter] = useState('default');
  const [form] = Form.useForm();

  const columns = [
    {
      title: '设备名',
      dataIndex: 'deviceNum',
    },
    {
      title: '门锁状态',
      dataIndex: 'lockStatus',
      render: (_, record) => {
        const { lockStatus } = record;
        let text, status;
        switch (lockStatus) {
          case 0:
            text = '关闭';
            status = 'default';
            break;
          case 1:
            text = '打开';
            status = 'success';
            break;
          case -1:
            text = '异常';
            status = 'error';
            break;
        }
        return (
          <>
            <Badge status={status} /> {text}
          </>
        );
      },
    },
    {
      title: '信号强度',
      dataIndex: 'signalStrength',
      render: (_, record) => <Text>{record.signalStrength}%</Text>,
    },
    {
      title: '连接状态',
      dataIndex: 'connStatus',
      render: (_, record) => {
        let bool = record.connStatus === 0;
        return (
          <Text className={style.conn_able} disabled={bool ? true : false}>
            {bool ? '离线' : '在线'}
          </Text>
        );
      },
    },
    {
      title: '电池容量',
      dataIndex: 'battery',
      render: (_, record) => <Text>{record.battery}%</Text>,
    },
    {
      title: 'MAC地址',
      dataIndex: 'bluetoothMac',
    },
    {
      title: '软件版本号',
      dataIndex: 'fwVersion',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <>
            <Dropdown overlay={<OptionList device={record.deviceNum} />} placement="bottomCenter">
              <ToolOutlined className={style.ellipsis} />
            </Dropdown>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const resp = await getLockList();
    const {
      code,
      data: { list = [] },
      msg,
    } = resp;
    if (code === 0) {
      setLockList(list);
    } else {
      message.error(msg);
    }
  };

  const FirstStep = () => (
    <Button type="primary" onClick={handleNextStep}>
      下一步
    </Button>
  );
  const LastStep = () => (
    <>
      <Button onClick={handleBackStep}>返回上一步</Button>
      <Button type="primary" onClick={handleAuthority}>
        确认
      </Button>
    </>
  );

  // 永久密码组件内容
  const PermanetModal = () => (
    <>
      <Item
        label="身份标识"
        name="identification"
        rules={[{ required: true, message: '请输入身份标识' }]}
      >
        <Input placeholder="输入用户标识" />
      </Item>
      <Item
        label="永久密码"
        name="password"
        rules={[{ required: true, message: '请输入永久密码' }]}
      >
        <Input placeholder="输入永久密码" />
      </Item>
    </>
  );

  // 临时组件内容
  const TemporaryModal = () => (
    <>
      <Item
        label="身份标识"
        name="identification"
        rules={[{ required: true, message: '请输入身份标识' }]}
      >
        <Input placeholder="输入用户标识" />
      </Item>
      <Item
        label="临时密码"
        name="password"
        rules={[{ required: true, message: '请输入临时密码' }]}
      >
        <Input placeholder="输入临时密码" />
      </Item>
      <Item
        label="有效时间"
        name="time"
        rules={[{ required: true, message: '请选择有效时间' }]}
        className={style.rangeStyle}
      >
        <RangePicker placeholder={['临时密码开始时间', '临时密码结束时间']} />
      </Item>
    </>
  );

  // 跳转下一步
  const handleNextStep = () => {
    let type = form.getFieldValue('selectOpt');
    if (!!type) {
      switch (type) {
        case 1:
          setType('permanent');
          break;
        case 2:
          setType('temporary');
          break;
        //@todo
      }
      setFooter('finally');
      form.resetFields();
    } else {
      form.setFields([{ name: ['selectOpt'], value: '', errors: ['请选择授权形式'] }]);
    }
  };

  // 返回上一步
  const handleBackStep = () => {
    form.resetFields();
    setFooter('default');
  };

  // 确认授权
  const handleAuthority = () => {};

  // 动态修改Modal的footer
  const Footer = () => {
    switch (footerKey) {
      case 'default':
        return <FirstStep />;
      case 'finally':
        return <LastStep />;
    }
  };

  // Modal内容
  const ShowModal = () => {
    switch (modalType) {
      case 'permanent':
        return <PermanetModal />;
      case 'temporary':
        return <TemporaryModal />;
    }
  };

  // 操作选项组件
  const OptionList = ({ device }) => {
    return (
      <div className={style.dropContent}>
        <Paragraph
          onClick={() => {
            setUpdateVisible(true);
            setType('permanent');
          }}
        >
          <Text className={style.updateStyle}>
            <EditOutlined />
            修改永久密码
          </Text>
        </Paragraph>
        <Paragraph onClick={() => showDeleteModal(1)}>
          <Text className={style.deleteStyle}>
            <DeleteOutlined />
            删除永久密码
          </Text>
        </Paragraph>
        <Paragraph
          onClick={() => {
            setUpdateVisible(true);
            setType('temporary');
          }}
        >
          <Text className={style.updateStyle}>
            <EditOutlined />
            修改临时密码
          </Text>
        </Paragraph>
        <Paragraph onClick={() => handleDeleteTemporary(2)}>
          <Text className={style.deleteStyle}>
            <DeleteOutlined />
            删除临时密码
          </Text>
        </Paragraph>
      </div>
    );
  };

  const showDeleteModal = (type) => {
    Modal.confirm({
      title: '确认删除？',
      onOk: () => {
        if (type === 1) {
          handleDeletePermanent();
        } else {
          handleDeleteTemporary();
        }
      },
      onCancel: () => {},
    });
  };
  // 修改永久
  const handleUpdatePermanent = () => {};
  // 删除永久
  const handleDeletePermanent = () => {};

  // 修改临时
  const handleUpdateTemporary = () => {};

  // 删除临时
  const handleDeleteTemporary = () => {};

  return (
    <>
      <div className={[style.search_opt, 'clearfix'].join(' ')}>
        <div className={style.search_opt_l}>
          <Input.Search
            enterButton="搜索"
            style={{ width: 350, marginRight: 10 }}
            placeholder="搜索房间名、锁用户"
            prefix={<SearchOutlined />}
          />
          <Button type="primary" style={{ marginRight: 10 }} onClick={() => setAddVisible(true)}>
            新增授权
          </Button>
        </div>
      </div>
      <Divider className={style.divider} />
      <Table columns={columns} dataSource={lockList} />
      <Modal
        title="新增授权"
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        footer={<Footer />}
      >
        <Form form={form}>
          {footerKey === 'default' ? (
            <Item
              name="selectOpt"
              label="授权形式"
              rules={[{ required: true, message: '请选择授权形式' }]}
            >
              <Select placeholder="选择门锁的授权形式">
                <Option value={1}>永久密码</Option>
                <Option value={2}>临时密码</Option>
              </Select>
            </Item>
          ) : (
            <ShowModal />
          )}
        </Form>
      </Modal>
      <Modal
        title={modalType === 'temporary' ? '修改临时密码' : '修改永久密码'}
        visible={updateVisible}
        onCancel={() => setUpdateVisible(false)}
        onOk={() => {}}
      >
        {modalType === 'temporary' ? (
          <TemporaryModal />
        ) : modalType === 'permanent' ? (
          <PermanetModal />
        ) : null}
      </Modal>
    </>
  );
};
export default Authorize;
