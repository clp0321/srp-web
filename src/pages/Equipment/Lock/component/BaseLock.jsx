import { useState, useEffect } from 'react';
import { Typography, Button, message, Modal, Form, Input, notification, Result } from 'antd';
import { toLogin, getLockList } from '@/services/lock';
import { SmileOutlined } from '@ant-design/icons';
import findLock from '@/assets/images/findEquip.png';
import style from './style.less';

const { Paragraph, Text } = Typography;
const { Item } = Form;

const BaseLock = ({ setAbled }) => {
  const [visible, setVisible] = useState(false);
  const [lockList, setLock] = useState([]);
  const [authority_param] = useState({
    appKey: '6b28429333fa8c29a79d8c0514703c1e',
    secret: '8ef1383d0f29f20403dbdaf86a821a3a',
  });
  const [form] = Form.useForm();

  useEffect(() => {
    watchEquip();
  }, [])

  // 查询设备信息
  const watchEquip = async () => {
    const resp = await getLockList();
    const {
      code,
      data,
      msg,
    } = resp;
    if (code === 0) {
      const array = [];
      const { list = [] } = data;
      list.map((item) => {
        const { deviceNum, battery, lockStatus, signalStrength } = item;
        array.push({ deviceNum, battery, lockStatus, signalStrength });
      });
      setLock(array);
      setAbled();
    } else {
      message.error(msg);
    }
  }

  // 登陆鉴权
  const handleAuthority = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const resp = await toLogin(values);
        const {
          code,
          msg,
          data: { timeout, token },
        } = resp;
        if (code === 0) {
          notification.success({
            message: '登陆鉴权成功',
            description: `本次鉴权失效时间：${timeout}`,
          });
          setVisible(false);
          localStorage.setItem('lock_token', token);
          return true;
        } else {
          message.error(msg);
          return false;
        }
      })
      .then(async (bool) => {
        if (bool) {
          watchEquip();
        }
      })
      .catch((err) => console.log(err));
  };

  const formlayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 18,
    },
  };

  // 设备列表详情
  const EquipComponent = ({ data }) => (
    <div className={style.equip_detail}>
      <Paragraph>
        <Text strong>设备号：</Text>
        {data.deviceNum}
      </Paragraph>
      <Paragraph>
        <Text strong>门锁状态：</Text>
        {data.lockStatus}
      </Paragraph>
      <Paragraph>
        <Text strong>信号强度：</Text>
        {data.signalStrength}
      </Paragraph>
      <Paragraph>
        <Text strong>电池容量：</Text>
        {data.battery}
      </Paragraph>
    </div>
  );

  const equipList = lockList.map((item, index) => <EquipComponent key={index} data={item} />);
  return (
    <div style={{ textAlign: 'center' }}>
      {lockList.length === 0 ? (
        <>
          <img src={findLock} height={200} />
          <Paragraph>该房间尚未授权门锁设备</Paragraph>
          <Paragraph>
            咨询电话：
            <Text type="danger" strong>
              400-861-3878
            </Text>
          </Paragraph>
          <Button type="primary" onClick={() => setVisible(true)}>
            设备授权
          </Button>
        </>
      ) : (
        <Result icon={<SmileOutlined />} title="设备绑定成功!" className={style.result}>
          <div className={style.result_con}>{equipList}</div>
        </Result>
      )}
      <Modal
        title="登陆授权"
        visible={visible}
        onOk={handleAuthority}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          {...formlayout}
          initialValues={{
            appKey: authority_param.appKey,
            secret: authority_param.secret,
          }}
        >
          <Item
            label="APP-KEY"
            name="appKey"
            rules={[{ required: true, message: '请输入APP-KEY' }]}
          >
            <Input />
          </Item>
          <Item label="SECRET" name="secret" rules={[{ required: true, message: '请输入SECRET' }]}>
            <Input />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};
export default BaseLock;
