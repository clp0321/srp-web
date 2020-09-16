import { useState, useEffect } from 'react';
import { Carousel, Tabs } from 'antd';
import style from './style.less';

const { TabPane } = Tabs;

const Detail = () => {
  useEffect(() => {
    document.title = '房屋详情';
  });

  const callback = () => {};

  return (
    <div className={style.contain}>
      <Carousel afterChange={() => {}} className={style.carousel}></Carousel>
      <div className={style.top}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="房源溯源" key="1">
          </TabPane>
          <TabPane tab="交易规则" key="2">
          </TabPane>
          <TabPane tab="入住须知" key="3">
          </TabPane>
          <TabPane tab="房屋点评" key="4">
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Detail;
