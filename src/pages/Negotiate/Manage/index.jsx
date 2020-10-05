import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, WhatsAppOutlined } from '@ant-design/icons';
import {
  Card,
  List,
  Radio,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Select,
  Avatar,
  Pagination,
} from 'antd';
import style from './style.less';

const { Text, Paragraph, Title } = Typography;
const { Item } = Form;
const { Option } = Select;

// mock协商事件
const mockData = [
  {
    sponsor: 'daqing',
    target: 'xiaohong',
    orderId: '11008',
    theme: '房屋的租赁合同存在问题',
    eventType: 1,
    detail:
      '当该房屋是“共同所有”时，查明该房屋是否存在按揭贷款尚未还清或者抵押给第三人的情形，是否存在被司法机关查封等限制过户的情形查明该房屋是否存在按揭贷款尚未还清或者抵押给第三人的情形，是否存在被司法机关查封等限制过户的情形',
  },
  {
    sponsor: 'daqing',
    target: 'xiaohong',
    orderId: '11008',
    theme: '合同问题',
    eventType: 1,
    detail:
      '当该房屋是“共同所有”时，查明该房屋是否存在按揭贷款尚未还清或者抵押给第三人的情形，是否存在被司法机关查封等限制过户的情形查明该房屋是否存在按揭贷款尚未还清或者抵押给第三人的情形，是否存在被司法机关查封等限制过户的情形',
  },
  {
    sponsor: 'daqing',
    target: 'xiaohong',
    orderId: '11008',
    theme: '租金问题',
    eventType: 1,
    detail: '租金不退',
  },
];

const Negotiage = () => {
  const [opt, setOpt] = useState(0);
  const [eventVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const options = [
    { label: '全部', value: 0 },
    { label: '进行中', value: 1 },
    { label: '等待中', value: 2 },
  ];
  const onChange = (e) => {
    setOpt(e.target.value);
  };
  const handleAddEvent = () => {
    setVisible(false);
  };
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };
  const userName = localStorage.getItem('name');
  return (
    <PageContainer>
      <Card className={style.contain}>
        <div className="clearfix">
          <Button type="primary" className={style.center} icon={<WhatsAppOutlined />}>
            协商中心
          </Button>
          <Input.Search placeholder="请输入事件主题" className={style.search} enterButton="查询" />
          <Radio.Group
            className={style.radio}
            options={options}
            onChange={onChange}
            value={opt}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <Button
          type="dashed"
          onClick={() => setVisible(true)}
          className={style.add_btn}
          icon={<PlusOutlined />}
        >
          新增协商事件
        </Button>
        <List
          className={style.list}
          loading={loading}
          dataSource={mockData}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item actions={[<a key="list-edit">编辑</a>, <a key="list-del">删除</a>]}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Text>{item.theme}</Text>}
                description={
                  <Paragraph
                    ellipsis={{
                      rows: 1,
                      expandable: true,
                      symbol: '详情',
                    }}
                  >
                    {item.detail}
                  </Paragraph>
                }
              />
              <div className={style.list_con}>
                <div>
                  <Text level={4}>订单号</Text>
                  <Text level={4}>{item.orderId}</Text>
                </div>
                <div>
                  <Text level={4}>协商发起</Text>
                  <Text level={4}>{item.sponsor}</Text>
                </div>
                <div>
                  <Text level={4}>协商对象</Text>
                  <Text level={4}>{item.target}</Text>
                </div>
              </div>
            </List.Item>
          )}
        />
        <Pagination total={25} pageSize={10} className={style.paginaion} />
      </Card>
      <Modal
        visible={eventVisible}
        title="协商事件"
        onCancel={() => setVisible(false)}
        onOk={handleAddEvent}
      >
        <Form form={form} {...formLayout} initialValues={{ sponsor: userName }}>
          <Item label="协商发起" name="sponsor">
            <Text strong>{userName}</Text>
          </Item>
          <Item
            label="协商对象"
            name="target"
            rules={[{ required: true, message: '请输入协商对象' }]}
          >
            <Input placeholder="输入协商对象" />
          </Item>
          <Item label="订单号" name="orderId" rules={[{ required: true, message: '请输入订单号' }]}>
            <Input placeholder="输入订单号" />
          </Item>
          <Item
            label="协商主题"
            name="theme"
            rules={[{ required: true, message: '请输入协商主题' }]}
          >
            <Input placeholder="输入协商主题" />
          </Item>
          <Item
            label="协商类型"
            name="eventType"
            rules={[{ required: true, message: '请输入协商对象' }]}
          >
            <Select placeholder="选择协商类型">
              <Option value={0}>租期及押金纠纷</Option>
              <Option value={1}>房屋水、电、煤等费用纠纷</Option>
              <Option value={2}>房屋设备使用及赔偿纠纷</Option>
              <Option value={3}>租赁备案纠纷</Option>
              <Option value={4}>其他类型</Option>
            </Select>
          </Item>
          <Item
            label="详细说明"
            name="detail"
            rules={[{ required: true, message: '请输入详细说明' }]}
          >
            <Input.TextArea rows={6} placeholder="输入协商事件的详细内容,不多于500字" />
          </Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Negotiage;
