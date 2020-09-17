import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import back from '@/assets/images/back.jpg';
import HouseDetail from './component/HoseDetail';
import HouseTrace from './component/HouseTrace';
import HouseComment from './component/HouseComment';
import style from './style.less';

const { TabPane } = Tabs;

const Detail = () => {
  useEffect(() => {
    document.title = '房屋详情';
  });

  const callback = () => {};

  const showImgList = () => {};

  return (
    <div className={style.contain}>
      <div
        style={{ backgroundImage: `url(${back})` }}
        className={style.carousel}
        onClick={showImgList}
      />
      <div className={style.top}>
        <Tabs defaultActiveKey="3" onChange={callback}>
          <TabPane tab="房屋详情" key="1">
            <HouseDetail />
          </TabPane>
          <TabPane tab="信息溯源" key="2">
            <HouseTrace />
          </TabPane>
          <TabPane tab="房屋点评" key="3">
            <HouseComment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Detail;
