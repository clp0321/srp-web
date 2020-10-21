import { useState } from 'react';
import { Card, Radio, Button, Typography, message } from 'antd';
import moment from 'moment';
import { cancelOrder, payForOrder } from '@/services/order';
import zhifubao from '@/assets/introduce/zhifubao.png';
import wechat from '@/assets/introduce/wechat.png';
import style from './style.less';

const { Text } = Typography;

const format_text = 'YYYY-MM-DD';

const PayWraaper = ({ minutes, seconds, orderCon }) => {
  const [curKey, setKey] = useState(0);
  const [payAbeld, setPayAbeld] = useState(true);

  // 取消订单
  const handleCancel = async () => {
    const resp = await cancelOrder(orderCon.id);
    if (resp.data > 0) {
      message.success('订单取消成功');
    }
  };
  
  // 支付订单
  const handlePay = async () => {
    const {id, orderCode } = orderCon;
    const resp = await payForOrder(id, orderCode);
    if (resp) {
      const newWindow = window.open("", "_self");
      newWindow.document.write(resp);
      newWindow.focus();
    }
  }

  return (
    <>
      {/* 支付订单 */}
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
            <Button
              type="primary"
              size="large"
              onClick={handlePay}
              disabled={payAbeld}
            >
              确认支付 ¥ {orderCon.payMoney} 元
            </Button>
            <Button type="danger" size="large" onClick={handleCancel}>
              取消订单
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PayWraaper;
