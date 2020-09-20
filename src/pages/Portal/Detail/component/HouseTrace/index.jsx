import { Descriptions, Badge, Button, Timeline } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from './style.less';

const HouseTrace = () => {
  return (
    <>
      <Button type="primary" className={style.findMore} icon={<SearchOutlined />}>
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
    </>
  );
};

export default HouseTrace;
