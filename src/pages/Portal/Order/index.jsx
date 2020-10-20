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
  Tooltip,
} from 'antd';
import { connect } from 'umi';
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

const Order = ({ currentUser }) => {
  const [curKey, setKey] = useState(0);
  const [payAbeld, setPayAbeld] = useState(true);
  const [modalVisible, setVisible] = useState(false);
  const [way, setWay] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [payMoney, setPay] = useState(0);
  const [form] = Form.useForm();
  const [visible, setPayVisible] = useState(true);
  const [seconds, setSeconds] = useState(5);
  const [minutes, setMinutes] = useState(1);

  const { userName, phone, certId, id } = currentUser;

  const handlePay = (values) => {
    // todo 调用订单提交接口
    const { contactPersonList, numbers, time, type } = values;
    setPayVisible(false);
    let minute = 1;
    let interval = window.setInterval(() => {
      if (minute < 0) {
        clearInterval(interval);
        return;
      }
      setSeconds((seconds) => {
        if (seconds <= 1) {
          setSeconds(5);
          --minute;
          setMinutes((minutes) => {
            return minutes - 1;
          });
        }
        return seconds - 1;
      });
    }, 1000);
    // pushOrder({
    //   lesseeId: '', // 出租人
    //   lessorId: '',
    //   startTime: time[0],
    //   endTime: time[1],
    //   type, // 租赁方式：1 日租 2 月租
    //   numbers, // 入住人数
    //   rent, // 租金
    //   contactPersonList, // 入住人信息
    // });
  };

  useEffect(() => {
    const house_id = location.search.split('=')[1];
    getHouseDetail(house_id).then((values) => {
      if (values && values.data) {
        setPrice(values.data.price);
        const val = Math.floor(values.data.price / 30); // 默认 每天房租
        form.setFields([{ name: ['rent'], value: val }]);
      }
    });
  }, []);

  const showTrace = () => {
    setVisible(true);
  };

  // 切换方式
  const handleSelect = (value) => {
    form.setFields([{ name: ['time'], value: '' }]); // 清空时间
    setWay(value);
    setTotalTime(0);
    setPay(0);
    const val = value === 1 ? Math.floor(price / 30) : price; // 计算租金信息
    form.setFields([{ name: ['rent'], value: val }]);
  };

  // 时间切换
  const handleDateChange = (time) => {
    if (time && time.constructor === Array) {
      const [start, end] = time;
      const data = end.diff(start, way === 1 ? 'days' : 'months');
      const num = way === 1 ? data : data + 1;
      const moneyItem = form.getFieldValue('rent');
      setTotalTime(num);
      setPay(num * moneyItem);
    }
  };

  return (
    <div className={style.contain}>
      {visible ? (
        <Row gutter={24}>
          {/* 房源预定 */}
          <Col span={17}>
            <Form form={form} name="dynamic_form_nest_item" onFinish={handlePay}>
              {/* 预定信息  */}
              <TitleCon title="预订信息" />
              <Space>
                <Item
                  label="租赁方式"
                  name="type"
                  required={{ required: true, message: '选择租赁方式' }}
                >
                  <Select placeholder="选择租赁方式" style={{ width: 200 }} onChange={handleSelect}>
                    <Option value={1}>日租</Option>
                    <Option value={2}>月租</Option>
                  </Select>
                </Item>
                <Item
                  label="入住时间"
                  name="time"
                  rules={[{ required: true, message: '选择入住时间' }]}
                >
                  <RangePicker onChange={handleDateChange} />
                </Item>
                <Text className={style.total}>
                  共：<Text className={style.desc_num}>{totalTime}</Text> {way === 1 ? '晚' : '月'}
                </Text>
              </Space>
              <Item
                label={way === 1 ? '每日租金' : '每月租金'}
                name="rent"
                style={{ marginLeft: 10 }}
              >
                <Input disabled style={{ width: 200 }} />
              </Item>
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
              {/* 入住人信息 */}
              <TitleCon title="入住人信息" />
              <div className={style.lessor_detail}>
                <Paragraph>
                  <Text>填写需知</Text>
                  <Text>第一位填写租客将作为主要联系人，请仔细确认</Text>
                </Paragraph>
              </div>

              <Form.List name="contactPersonList">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="start">
                          <Item
                            {...field}
                            label="联系人"
                            name={[field.name, 'contactName']}
                            fieldKey={[field.fieldKey, 'contactName']}
                            rules={[{ required: true, message: '请输入联系人' }]}
                            initialValue={userName}
                          >
                            <Input placeholder="输入联系人" />
                          </Item>
                          <Item
                            {...field}
                            label="联系号码"
                            name={[field.name, 'cellPhoneNumber']}
                            fieldKey={[field.fieldKey, 'cellPhoneNumber']}
                            rules={[{ required: true, message: '请输入联系号码' }]}
                            initialValue={phone}
                          >
                            <Input placeholder="输入联系号码" />
                          </Item>
                          <Item
                            {...field}
                            label="身份证"
                            name={[field.name, 'identityId']}
                            fieldKey={[field.fieldKey, 'identityId']}
                            rules={[
                              { required: true, message: '请输入身份证' },
                              {
                                pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
                                message: '身份证信息不正确',
                              },
                            ]}
                            initialValue={certId}
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
              <Paragraph>未入住/提前离开，收取剩余房费的100%</Paragraph>
              <Divider />
              <Paragraph>全额预付：需预付全额房费</Paragraph>
              <Paragraph>无需确认：预定无需等待，订单闪电确认</Paragraph>
              <Title level={3}>
                待支付金额：<Text className={style.rent}>¥ {payMoney}</Text>
              </Title>
              <Divider />
              <Button type="primary" size="large" className={style.pay_btn} htmlType="submit">
                提交订单
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
      ) : (
        <>
          {/* 支付订单 */}
          <Card hoverable>
            <div className={style.paycon}>
              <p>钟鼓楼/回民街</p>
              <p>
                支付剩余时间 {minutes} 分 {seconds} 秒
              </p>
              <p>10月20日-10月21日</p>
            </div>
          </Card>
          <Card style={{ marginTop: 20 }} title={<Text strong>订单信息</Text>} hoverable>
            <p className={style.toPay}>
              待支付金额：<Text className={style.pay}>¥ {payMoney}</Text>
            </p>
            <div>
              <p>选择支付方式</p>
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
              <div className={style.btn_list}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handlePay}
                  htmlType="submit"
                  disabled={payAbeld}
                >
                  确认支付 ¥1750元
                </Button>
                <Button type="danger" size="large">
                  取消订单
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
      {/* 房源溯源信息 */}
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

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(Order);
