import React from 'react';
import { Carousel, List, Typography } from 'antd';
import style from './style.less';

const { Text } = Typography;
const mockData = [
  {
    con: '共享租赁平台是怎么研发出来的',
    date: '2020-08-14',
  },
  {
    con: '房源展示必须要遵循规则',
    date: '2020-07-13',
  },
  {
    con: '"真房源"一般违规处罚金额调整',
    date: '2020-08-03',
  },
];

const InfoBar = () => {
  return (
    <div className={style.infobar}>
      <Carousel className={style.carousel} autoplay>
        <div className={style.lunbo1} />
        <div className={style.lunbo2} />
        <div className={style.lunbo3} />
        <div className={style.lunbo4} />
      </Carousel>
      <List
        dataSource={mockData}
        renderItem={(item) => (
          <List.Item>
            <Text>[平台公告]</Text> {item.con} <span style={{ float: 'right' }}>{item.date}</span>
          </List.Item>
        )}
      />
    </div>
  );
};
export default InfoBar;
