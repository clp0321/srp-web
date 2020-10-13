import { useState, useEffect } from 'react';
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
  Modal,
  Descriptions,
  Badge,
  Tooltip
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { getHouseDetail } from '@/services/property';
import zhifubao from '@/assets/introduce/zhifubao.png';
import wechat from '@/assets/introduce/wechat.png';
import trace_house from '@/assets/introduce/trace-house.png';

import style from './style.less';

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
  const [payAbeld, setPayAbeld] = useState(true);
  const [modalVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handlePay = (values) => {
    // todo 调用订单提交接口
    const { list, numbers, time, type } = values;
    // pushOrder({
    //   lessee: '', // 出租人
    //   start_time: time[0],
    //   end_time: time[1],
    //   type, // 租赁方式：1 日租 2 月租
    //   numbers, // 入住人数
    //   rent, // 租金
    //   list,
    // });
  };

  useEffect(() => {
    const house_id = location.search.split('=')[1];
    getHouseDetail(house_id).then((values) => {});
  }, []);

  const showTrace = () => {
    setVisible(true);
  };

  return (
    <div className={style.contain}>
      <Row gutter={24}>
        {/* 房源预定 */}
        <Col span={17}>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={handlePay}
          >
            {/* 预定信息  */}
            <TitleCon title="预订信息" />
            <Item
              label="入住时间"
              name="time"
              rules={[{ required: true, message: '选择入住时间' }]}
            >
              <RangePicker />
            </Item>
            <Space>
              <Item
                label="入住人数"
                name="numbers"
                required={{ required: true, message: '选择入住人数' }}
              >
                <Select style={{ width: 200 }} placeholder="选择入住人数">
                  <Option value={1}>1人</Option>
                  <Option value={2}>2人</Option>
                  <Option value={3}>3人</Option>
                  <Option value={4}>更多</Option>
                </Select>
              </Item>
              <Item
                label="租赁方式"
                name="type"
                required={{ required: true, message: '选择租赁方式' }}
              >
                <Select placeholder="选择租赁方式" style={{ width: 200 }}>
                  <Option value={1}>日租</Option>
                  <Option value={2}>月租</Option>
                </Select>
              </Item>
            </Space>
            {/* 入住人信息 */}
            <TitleCon title="入住人信息" />
            <div className={style.lessor_detail}>
              <Paragraph>
                <Text>填写需知</Text>
                <Text>第一位填写租客将作为主要联系人，请仔细确认</Text>
              </Paragraph>
            </div>

            <Form.List name="list">
              {(fields, { add, remove }) => {
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
                          <Input
                            style={{ width: '60%' }}
                            placeholder="输入身份证号"
                            style={{ width: 200 }}
                          />
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
              onClick={() => {
                setKey(1);
                setPayAbeld(false);
              }}
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
              onClick={() => {
                setKey(2);
                setPayAbeld(false);
              }}
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
            <Button
              type="primary"
              size="large"
              className={style.pay_btn}
              onClick={handlePay}
              htmlType="submit"
              disabled={payAbeld}
            >
              确认支付 ¥1750元
            </Button>
          </Form>
        </Col>
        {/* 房源信息 */}
        <Col span={7}>
          <Affix offsetTop={0}>
            <Card
              hoverable
              className={style.card}
              cover={
                <img src="https://pic.tujia.com/upload/qualifiedpics/day_200710/thumb/202007101849199578_700_467.jpg" />
              }
            >
              <Paragraph className={style.house_title}>整租</Paragraph>
              <Paragraph>塘朗</Paragraph>
              <img src={trace_house} className={style.trace_log} />
              <Text strong className={style.traced_con}>
                房源已溯源
              </Text>
              <Paragraph>
                1室1厅1卫
                <Text className={style.money}>¥ 2000 / 月</Text>
              </Paragraph>
              <Paragraph>
                <a className={style.ellipsis} onClick={showTrace}>
                  6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
                </a>
              </Paragraph>
            </Card>
          </Affix>
        </Col>
      </Row>
      <Modal
        title="房源溯源信息"
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={710}
      >
        <Descriptions bordered>
          <Descriptions.Item label="产权人">daqing</Descriptions.Item>
          <Descriptions.Item label="房屋状态">
            <Badge status="default" />
            未出租
          </Descriptions.Item>
          <Descriptions.Item label="代理人">liming</Descriptions.Item>
          <Descriptions.Item label="设备Id" span={3}>
            <Tooltip title="6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12">
              <Text ellipsis style={{ display: 'inline-block', width: 500 }}>
                6b4840f6fb1ae572669e68f04fe83c509f752925c88d75f5e19894f8158a4d12
              </Text>
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label="房源Id" span={3}>
            <Tooltip title="6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f">
              <Text ellipsis style={{ display: 'inline-block', width: 500 }}>
                6241e7d6fead6d95b9f84c4c7921966fc354730858630fa55a08eeba38c9fd547e3060d37c6e79d7c8a830ccfa79b05501ff734cf8d0cabf146da6c3e4ea414f
              </Text>
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label="认证等级">4</Descriptions.Item>
          <Descriptions.Item label="信息摘要">2020-10-07 08:11:14</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default Order;
