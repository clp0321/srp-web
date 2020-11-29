import React, { useState } from 'react';
import { Result, Button, Typography, Modal } from 'antd';
import moment from 'moment';
import Detail from './Detail';
import style from './style.less';

const { Paragraph, Text } = Typography;

// mock返回数据
const mockData = [
  {
    id: 1,
    title: '房源发布人',
    val: 'daqing',
  },
  {
    id: 2,
    title: '房源设备ID',
    val: '****',
  },
  {
    id: 3,
    title: '联系方式',
    val: '13977327178',
  },
  {
    id: 4,
    title: '房源发布时间',
    val: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  },
];

const Content = ({ data }) => (
  <Paragraph>
    <Text
      strong
      style={{
        fontSize: 14,
      }}
    >
      {data.title}：
    </Text>
    <Text>{data.val}</Text>
  </Paragraph>
);

const result = mockData.map((item, index) => {
  return <Content data={item} key={index} />;
});

const Template = () => {
  const [modalVisible, setVisible] = useState(false);
  return (
    <div className={style.template}>
      <Result
        status="success"
        title="房源上传成功"
        subTitle="该房源信息将在24小时内被平台处理"
        extra={[
          <Button
            type="primary"
            key="btn1"
            onClick={() => {
            }}
          >
            再发一次
          </Button>,
          <Button onClick={() => setVisible(true)} key="btn2">
            查看详情
          </Button>,
        ]}
      />
      <div className={style.result_con}>{result}</div>
      <Modal
        title="房源信息详情"
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        footer={
          <Button type="primary" onClick={() => setVisible(false)}>
            确认
          </Button>
        }
      >
        <Detail />
      </Modal>
    </div>
  );
};

export default Template;
