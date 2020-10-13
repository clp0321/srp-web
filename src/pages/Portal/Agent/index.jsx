import { Form, Typography, Input, Button, Radio, Select, Divider, List, Card } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import house1 from '@/assets/house/house1.jpg';
import house2 from '@/assets/house/house2.jpg';
import house3 from '@/assets/house/house3.jpg';
import house4 from '@/assets/house/house4.jpg';

import style from './style.less';

const { Title } = Typography;
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

const Agent = () => {
  return (
    <div className={style.contain}>
      <TitleCon title="房源需求" />
      <Form {...formLayout}>
        <Item
          name="method"
          label="租赁方式"
          rules={[{ required: true, message: '请输入租赁方式' }]}
        >
          <Radio.Group>
            <Radio value={0}>整租</Radio>
            <Radio value={1}>合租</Radio>
          </Radio.Group>
        </Item>
        <Item label="租金区间" style={{ marginBottom: 0 }} className={style.rent_range}>
          <Item
            name="year"
            rules={[{ required: true, message: '请输入起始租金' }]}
            style={{ display: 'inline-block' }}
          >
            <Input placeholder="输入起始租金" />
          </Item>
          <Item style={{ display: 'inline-block' }}>
            <div className={style.divider} />
          </Item>
          <Item
            name="month"
            rules={[{ required: true, message: '请输入结束租金' }]}
            style={{ display: 'inline-block' }}
          >
            <Input placeholder="输入结束租金" />
          </Item>
        </Item>
        <Item name="position" label="位置" rules={[{ required: true, message: '请输入位置信息' }]}>
          <Input placeholder="输入求租房源的目标位置" />
        </Item>
        <Item name="creidt" label="信用分">
          <Input prefix="最低信用分" />
        </Item>
        <Item
          name="specify"
          label="房屋类型"
          rules={[{ required: true, message: '请选择房屋类型' }]}
        >
          <Select placeholder="选择房屋租赁的类型">
            <Option value={0}>一室</Option>
            <Option value={1}>两室</Option>
            <Option value={2}>三室</Option>
            <Option value={3}>四室</Option>
            <Option value={3}>四室及以上</Option>
          </Select>
        </Item>
        <Button type="primary" htmlType="submit" className={style.submit}>
          保存
        </Button>
      </Form>
      <Divider />
      <Title level={4} className={style.related_house}>
        相关房源
        <Button icon={<ReloadOutlined />} className={style.reload}>
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
