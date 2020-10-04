import { Descriptions, Badge, Button, Timeline, Divider, Typography, Modal } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';
import style from './style.less';

const { Title, Paragraph } = Typography;

const HouseTrace = () => {
  const confirm = () => {
    Modal.confirm({
      title: '参与房屋评级',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  };
  return (
    <>
      <Button
        type="primary"
        className={style.findMore}
        icon={<SearchOutlined />}
        onClick={() => history.push('/srp/blockmessage')}
      >
        更多房源
      </Button>
      <Timeline reverse className={style.timeline}>
        <Timeline.Item>
          <Descriptions title="初始化房源" bordered>
            <Descriptions.Item label="链上哈希">123213213</Descriptions.Item>
            <Descriptions.Item label="产权人">Prepaid</Descriptions.Item>
            <Descriptions.Item label="产权证号"></Descriptions.Item>
            <Descriptions.Item label="房源设备ID">565799449</Descriptions.Item>
            <Descriptions.Item label="上链时间戳" span={3}>
              <Badge status="success" text="2019-04-24 18:00:00" />
            </Descriptions.Item>
            <Descriptions.Item label="详细地址" span={3}>
              深圳市南山区塘朗村
            </Descriptions.Item>
            <Descriptions.Item label="链上哈希" span={3}></Descriptions.Item>
            <Descriptions.Item label="图片cid" span={3}></Descriptions.Item>
          </Descriptions>
        </Timeline.Item>
        <Timeline.Item>
          <Descriptions title="房源1" bordered>
            <Descriptions.Item label="链上哈希">123213213</Descriptions.Item>
            <Descriptions.Item label="产权人">Prepaid</Descriptions.Item>
            <Descriptions.Item label="受代理人"></Descriptions.Item>
            <Descriptions.Item label="房屋受理时间" span={3}>
              <Badge status="processing" text="2019-04-24 18:00:00" />
            </Descriptions.Item>
            <Descriptions.Item label="上链时间戳" span={3}></Descriptions.Item>
            <Descriptions.Item label="图片cid" span={3}></Descriptions.Item>
          </Descriptions>
        </Timeline.Item>
      </Timeline>
      <Button type="primary" className={style.star_btn} onClick={confirm}>
        房屋评级
      </Button>
      <Divider />
      <Title level={4}>说明</Title>
      <Paragraph>
        用户可以对房屋信息进行投票评级，可选的投票包括“可信、一般、怀疑、不可信”四种
      </Paragraph>
      <Paragraph className={style.last_p}>
        您的选票与最终结果是否一致将会影响您的信用分，请谨慎投票
      </Paragraph>
    </>
  );
};

export default HouseTrace;
