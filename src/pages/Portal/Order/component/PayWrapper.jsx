import { useState, useEffect } from 'react';
import { Card, Radio, Button, Typography, message, Result, Divider } from 'antd';
import moment from 'moment';
import { cancelOrder, payForOrder } from '@/services/order';
import zhifubao from '@/assets/introduce/zhifubao.png';
import wechat from '@/assets/introduce/wechat.png';
import style from './style.less';

const { Text, Paragraph } = Typography;

const format_text = 'YYYY-MM-DD';

const PayWraaper = ({ minutes, seconds, orderCon, cancel }) => {
  const [curKey, setKey] = useState(0);
  const [payAbeld, setPayAbeld] = useState(true);
  const [status, setStatus] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // 订单支付成功
    if (location.search.includes('status')) {
      setStatus(true);
      if ('success' === location.search.split('=')[1]) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    }
  }, []);

  // 取消订单
  const handleCancel = async () => {
    const resp = await cancelOrder(orderCon.id);
    if (resp.data > 0) {
      message.success('取消订单成功');
      cancel(true);
    } else {
      message.error('取消订单失败');
    }
  };

  // 支付订单
  const handlePay = async () => {
    const { id, orderCode } = orderCon;
    const resp = await payForOrder(id, orderCode);
    if (resp) {
      const newWindow = window.open('', '_self');
      newWindow.document.write(resp);
      newWindow.focus();
    }
  };

  if (minutes === 0 && seconds === 0) {
    // 订单超时
    handlePay();
  }

  return (
    <>
      {!status ? (
        <>
          <Card hoverable>
            <div className={style.paycon}>
              <p>{orderCon.position}</p>
              <p>
                支付剩余时间 <span>{minutes}</span> 分<span>{seconds}</span> 秒
              </p>
              <p>
                入住时间: {moment(orderCon.startTime).format(format_text)} 至{' '}
                {moment(orderCon.endTime).format(format_text)}
              </p>
            </div>
          </Card>
          <Card
            style={{ marginTop: 20 }}
            title={<Text strong>订单信息: {orderCon.orderCode}</Text>}
            hoverable
          >
            <p className={style.toPay}>
              待支付金额：<Text className={style.pay}>¥ {orderCon.payMoney}</Text>
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
                <Radio.Group value={curKey} className={style.radio_group}>
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
                <Button type="primary" size="large" onClick={handlePay} disabled={payAbeld}>
                  确认支付 ¥ {orderCon.payMoney} 元
                </Button>
                <Button type="danger" size="large" onClick={handleCancel}>
                  取消订单
                </Button>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <div className={style.order_result}>
          <Result
            status={success ? 'success' : 'error'}
            title={`订单提交${success ? '成功' : '失败'}`}
            subTitle={`订单号: ${orderCon.orderCode}`}
            extra={[
              <Button type="primary" key="console">
                {success ? '返回房源页' : '再次预定'}
              </Button>,
            ]}
          />
          <div className={style.desc}>
            <Paragraph>
              <Text className={style.main_text}>
                预订房屋名称：近春熙路/宽窄熊猫基地网红高空城景房
              </Text>
            </Paragraph>
            <Paragraph>入离时间 :</Paragraph>
            <Paragraph>入住人 :</Paragraph>
            <Paragraph>联系电话 :</Paragraph>
            <Paragraph>订单号 :</Paragraph>
          </div>
          <div className={[style.desc, style.two].join(' ')}>
            <Paragraph>
              <Text className={style.main_text}>金额</Text>
              <Text className={style.money}>¥176.00</Text>
            </Paragraph>
            <Divider />
            <Paragraph>
              <Text className={style.main_text}>全部房费</Text>
              <Text className={style.item_con}>¥176.00</Text>
            </Paragraph>
            <Paragraph>
              <Text strong>2020-10-21</Text>
              <Text className={style.item_con}>¥176.00x1套</Text>
            </Paragraph>
            <Paragraph>
              <Text className={style.main_text}>订单总额</Text>
              <Text className={style.item_con}>¥176.00</Text>
            </Paragraph>
          </div>
        </div>
      )}
    </>
  );
};

export default PayWraaper;
