import { useState } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Affix,
  Typography,
  DatePicker,
  Select,
  Button,
  Input,
  Space,
  Radio,
  Divider,
  Tooltip,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import zhifubao from '@/assets/introduce/zhifubao.png';
import wechat from '@/assets/introduce/wechat.png';

import style from './style.less';

// "agencyId": "string",  代理人
// "contractAddress": "string",
// "contractHash": "string",
// "deposit": 0, 押金
// "grace": 0,  宽限期
// "id": 0,
// "lateFee": "string",  滞纳金
// "lesseeId": "string",   承租方
// "lessorId": "string",  出租方
// "orderCode": "string",  订单编号
// "orderStatus": 0,  订单状态
// "rent": 0, 租金
// "startTime": "2020-10-12T11:12:44.100Z"
// "endTime": "2020-10-12T11:12:44.100Z", 终止时间

const { Title, Paragraph, Text } = Typography;
const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 标题组件
const TitleCon = ({ title }) => {
  return (
    <Title level={4} className={style.title}>
      {title}
    </Title>
  );
};

const Order = () => {
  const [curKey, setKey] = useState(0);
  const [form] = Form.useForm();
  return (
    <div className={style.contain}>
      <Row gutter={24}>
        {/* 房源预定 */}
        <Col span={17}>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            initialValues={{
              numbers: 1,
            }}
          >
            {/* 预定信息  */}
            <TitleCon title="预订信息" />
            <Item label="入住时间" name="time">
              <RangePicker />
            </Item>
            <Item label="入住人数" name="numbers">
              <Select style={{ width: 200 }}>
                <Option value={1}>1人</Option>
                <Option value={2}>2人</Option>
                <Option value={3}>3人</Option>
                <Option value={4}>更多</Option>
              </Select>
            </Item>

            {/* 入住人信息 */}
            <TitleCon title="入住人信息" />
            <div className={style.lessor_detail}>
              <Paragraph>
                <Text>入住需知</Text>
                <Text>暂不接待外籍客人</Text>
              </Paragraph>
            </div>

            <Form.List name="list">
              {(fields, { add, remove }) => {
                console.log(fields);
                return (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="start">
                        <Item
                          {...field}
                          label="联系人"
                          name={[field.name, 'lessor']}
                          fieldKey={[field.fieldKey, 'lessor']}
                          rules={[{ required: true, message: '请输入联系人' }]}
                        >
                          <Input placeholder="输入联系人" />
                        </Item>
                        <Item
                          {...field}
                          label="联系号码"
                          name={[field.name, 'phone']}
                          fieldKey={[field.fieldKey, 'phone']}
                          rules={[{ required: true, message: '请输入联系号码' }]}
                        >
                          <Input placeholder="输入联系号码" />
                        </Item>
                        <Item
                          {...field}
                          label="身份证"
                          name={[field.name, 'cert_id']}
                          fieldKey={[field.fieldKey, 'cert_id']}
                          rules={[{ required: true, message: 'Street is required' }]}
                        >
                          <Input style={{ width: '60%' }} placeholder="输入身份证号" style={{ width: 200 }} />
                        </Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Space>
                    ))}
                    <Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> 添加联系人
                      </Button>
                    </Item>
                  </>
                );
              }}
            </Form.List>

            {/* 发票 */}
            <TitleCon title="发票" />
            <Paragraph>房票发票请联系房东或代理服务商</Paragraph>
            {/* 退订规则 */}
            <TitleCon title="退订规则" />
            <Paragraph>未入住/提前离店，收取剩余房费的100%</Paragraph>
            <Title level={3}>
              待支付金额：<Text className={style.rent}>¥1750</Text>
            </Title>
            <Divider />
            {/* 支付方式 */}
            <TitleCon title="支付方式" />
            <div
              className={[curKey === 1 ? style.payway : '', style.pay].join(' ')}
              onClick={() => setKey(1)}
            >
              <Radio.Group value={curKey}>
                <Radio value={1}>
                  <Text className={style.pay_name}>
                    <img src={zhifubao} />
                    支付宝
                  </Text>
                  <Text disabled className={style.pay_desc}>
                    安全支付，推荐使用
                  </Text>
                </Radio>
              </Radio.Group>
            </div>
            <div
              className={[curKey === 2 ? style.payway : '', style.pay].join(' ')}
              onClick={() => setKey(2)}
            >
              <Radio.Group value={curKey}>
                <Radio value={2}>
                  <Text className={style.pay_name}>
                    <img src={wechat} />
                    微信
                  </Text>
                  <Text disabled className={style.pay_desc}>
                    微信安全支付
                  </Text>
                </Radio>
              </Radio.Group>
            </div>
            <Button type="primary" size="large" className={style.pay_btn}>
              确认支付 ¥1750元
            </Button>
          </Form>
        </Col>
        {/* 房源信息 */}
        <Col span={7}>
          <Affix offsetTop={0}>
            <Card
              cover={
                <img src="https://pic.tujia.com/upload/qualifiedpics/day_200710/thumb/202007101849199578_700_467.jpg" />
              }
            >
              <Paragraph className={style.house_title}>整租 | 塘朗 </Paragraph>
              <Paragraph>1室1厅1卫</Paragraph>
              <Paragraph>
                <a className={style.ellipsis}>
                  6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
                </a>
              </Paragraph>
            </Card>
          </Affix>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
