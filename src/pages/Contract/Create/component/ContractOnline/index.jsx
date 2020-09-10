import { useState } from 'react';
import { Divider, Typography, Select, Form, Input, Row, Col } from 'antd';
import style from './style.less';

const { Option } = Select;
const { Text, Title } = Typography;
const { Item } = Form;

const ContractOnline = () => {
  const [opt, setOpt] = useState(1);
  const BaseInfo = ({ name }) => {
    return (
      <div className={style.divider}>
        <Divider type="vertical" />
        <Text strong>{name}</Text>
      </div>
    );
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div className={style.contain}>
      <Title level={4} style={{ textAlign: 'center' }}>
        {opt === 1 ? '房东与租客合同' : '房东与代理合同'}
        <Select defaultValue={opt} style={{ float: 'right' }} onChange={(val) => setOpt(val)}>
          <Option value={1}>房东与租客</Option>
          <Option value={2}>房东与代理</Option>
        </Select>
      </Title>
      <BaseInfo name="基本信息" />
      <Row gutter={24}>
        <Form>
          <Col span={24}>
            <Item
              label="出租方"
              name="Lessor"
              rules={[
                {
                  required: true,
                  message: '请填写出租房信息',
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="出租方"
              name="Lessor"
              rules={[
                {
                  required: true,
                  message: '请填写出租房信息',
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="出租方"
              name="Lessor"
              rules={[
                {
                  required: true,
                  message: '请填写出租房信息',
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
        </Form>
      </Row>
      <BaseInfo name="费用详情" />
    </div>
  );
};

export default ContractOnline;
