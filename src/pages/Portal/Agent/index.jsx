import {
  Form,
  Typography,
  Input,
  Button,
  Radio,
  Select,
  Divider,
  List,
  Card,
  InputNumber,
  Table,
  message,
  Modal,
  Popconfirm,
} from 'antd';
import { useState, useEffect } from 'react';
import { addDemands, deleteDemand, getDemands, updateDemands } from '@/services/demand';
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import house1 from '@/assets/house/house1.jpg';
import house2 from '@/assets/house/house2.jpg';
import house3 from '@/assets/house/house3.jpg';
import house4 from '@/assets/house/house4.jpg';

import style from './style.less';

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;

const TitleCon = ({ title }) => {
  return (
    <Title level={4} className={style.title}>
      {title}
    </Title>
  );
};

const formLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const data = [
  {
    pic: house1,
    con: '房源1',
  },
  {
    pic: house2,
    con: '房源2',
  },
  {
    pic: house3,
    con: '房源3',
  },
  {
    pic: house4,
    con: '房源4',
  },
];

const userId = localStorage.getItem('id');

const methodType = ['一室', '两室', '三室', '四室', '四室及以上'];

const Agent = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState(true);
  const [list, setList] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    getAllDemands();
  }, []);

  const handleUpdate = (record) => {
    setStatus(false);
    setId(record.id);
    form.setFieldsValue(record);
  };

  // 提交房源需求
  const handleOnFinish = () => {
    form.validateFields().then((values) => {
      addOneDemand({
        userId,
        ...values,
      });
    });
  };

  // 新增
  const addOneDemand = async (data) => {
    let demands;
    if (status) {
      demands = await addDemands(data);
    } else {
      demands = await updateDemands({ id, ...data });
    }
    if (demands && demands.data > 0) {
      message.success(status ? '发布需求成功' : '更改需求成功');
      getAllDemands();
      form.resetFields();
      setStatus(true);
    } else {
      message.error(status ? '发布需求失败' : '更改需求失败');
    }
  };

  // 删除
  const deleteById = async (id) => {
    const resp = await deleteDemand(id);
    if (resp.data > 0) {
      message.success('删除成功');
      getAllDemands();
    } else {
      message.error('删除失败');
    }
  };

  // 获取
  const getAllDemands = async () => {
    const demands = await getDemands(userId);
    if (demands && demands.data) {
      setList(demands.data);
    }
  };

  const columns = [
    {
      title: '位置',
      dataIndex: 'position',
    },
    {
      title: '租赁方式',
      dataIndex: 'method',
      render: (text) => {
        return <Text>{text === 0 ? '整租' : '出租'}</Text>;
      },
    },
    {
      title: '租金',
      dataIndex: 'price',
      render: (_, record) => {
        return (
          <Text>
            {record.lowPrice}-{record.highPrice}
          </Text>
        );
      },
    },
    {
      title: '房屋类型',
      dataIndex: 'specify',
      render: (text) => <Text>{methodType[text]}</Text>,
    },
    {
      title: '信用积分',
      dataIndex: 'creidt',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <a onClick={() => handleUpdate(record)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除？"
            onConfirm={() => deleteById(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className={style.contain}>
      <Title level={4} className={style.related_house}>
        发布新需求
        <Button size="small" icon={<DeleteOutlined />} className={style.reload}>
          清空
        </Button>
      </Title>
      <Form {...formLayout} onFinish={handleOnFinish} form={form}>
        <Item
          name="method"
          label="租赁方式"
          rules={[{ required: true, message: '请输入租赁方式' }]}
        >
          <Radio.Group buttonStyle>
            <Radio.Button value={0}>整租</Radio.Button>
            <Radio.Button value={1}>合租</Radio.Button>
          </Radio.Group>
        </Item>
        <Item label="租金区间" style={{ marginBottom: 0 }} className={style.rent_range}>
          <Item
            name="lowPrice"
            rules={[{ required: true, message: '请输入起始租金' }]}
            style={{ display: 'inline-block' }}
          >
            <InputNumber
              placeholder="输入起始租金（¥）"
              style={{ width: 200 }}
              min={0}
              precision={2}
            />
          </Item>
          <Item style={{ display: 'inline-block' }}>
            <div className={style.divider} />
          </Item>
          <Item
            name="highPrice"
            rules={[{ required: true, message: '请输入结束租金' }]}
            style={{ display: 'inline-block' }}
          >
            <InputNumber
              placeholder="输入结束租金（¥）"
              style={{ width: 200 }}
              min={0}
              precision={2}
            />
          </Item>
        </Item>
        <Item name="creidt" label="用户信用">
          <InputNumber
            placeholder="输入目标用户的最低信用分，最高分为100"
            style={{ width: 430 }}
            min={0}
            max={100}
          />
        </Item>
        <Item
          name="specify"
          label="房屋类型"
          rules={[{ required: true, message: '请选择房屋类型' }]}
        >
          <Select placeholder="选择房屋租赁的类型">
            {methodType.map((item, index) => {
              return <Option value={index}>{item}</Option>;
            })}
          </Select>
        </Item>
        <Item
          name="position"
          label="房屋位置"
          rules={[{ required: true, message: '请输入位置信息' }]}
        >
          <Input placeholder="输入求租房源的目标位置" />
        </Item>
        <Button type={status ? 'primary' : 'danger'} htmlType="submit" className={style.submit}>
          {status ? '发布' : '更新'}
        </Button>
      </Form>
      <Title level={4} className={style.needList}>
        需求列表
      </Title>
      <Divider />
      <Table rowKey="id" dataSource={list} columns={columns} pagination={false} />
      <Title level={4} className={style.related_house}>
        相关房源
        <Button icon={<ReloadOutlined />} className={style.reload} size="small">
          换一批
        </Button>
      </Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card hoverable cover={<img src={item.pic} alt="房源图片" />}>
              {item.con}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Agent;
