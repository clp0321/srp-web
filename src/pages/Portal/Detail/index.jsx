import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { getHouseDetail } from '@/services/property';
import HouseDetail from './component/HoseDetail';
import HouseTrace from './component/HouseTrace';
import HouseComment from './component/HouseComment';

import style from './style.less';

const { TabPane } = Tabs;

const Detail = () => {
  const [key, setKey] = useState('1');
  const [detail, setHouseDetail] = useState({
    houseId: '',
    deviceId: '',
    updateTime: '',
    method: '',
    position: '',
    specify: '',
    //  房屋信息
    houseOwner: '',
    phone: '',
    size: 0,
    price: '',
    payway: '',
    type: '普通住宅',
    description: '',
    picUrl: '',
  });
  useEffect(() => {
    document.title = '区块链共享租赁平台-房源详情';
    const house_id = location.search.split('=')[1];
    getHouseDetail(house_id)
      .then((value) => {
        if (value.msg === 'SUCCESS') {
          setHouseDetail(value.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const callback = () => {};

  const showImgList = () => {};
  const { picUrl } = detail;
  return (
    <div className={style.contain}>
      <div
        style={{ backgroundImage: `url(${picUrl})` }}
        className={style.carousel}
        onClick={showImgList}
      />
      <div className={style.top}>
        <Tabs defaultActiveKey={key} onChange={(val) => setKey(val)}>
          <TabPane tab="房屋详情" key="1">
            <HouseDetail houseDetail={detail} />
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
