import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { getHouseDetail } from '@/services/property';
import HouseDetail from './component/HoseDetail';
import HouseTrace from './component/HouseTrace';
import HouseComment from './component/HouseComment';
import Carousel from '@/components/Carousel';
import imgUrl1 from '@/assets/house/house1.jpg';
import style from './style.less';

const { TabPane } = Tabs;

const Detail = () => {
  const [key, setKey] = useState('1');
  const [maskVisible, showMask] = useState(true);
  const [curImg, changeImg] = useState(imgUrl1); // 当前图片
  const [imgSize] = useState(4); // 图片总数
  const [curIndex, changeIndex] = useState(1); // 当前图片位置
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

 
  const handleMask = val => {
    showMask(val)
  }

  const { picUrl } = detail; // 背景图片

  return (
    // 图片详情
    <div className={style.contain}>
      <Carousel maskVisible={maskVisible} handleMask={handleMask} />
      {/* 背景图  */}
      <div
        style={{ backgroundImage: `url(${picUrl})` }}
        className={style.carousel}
        onClick={() => handleMask(true)}
      />
      <div className={style.top}>
        <Tabs defaultActiveKey={key} onChange={(val) => setKey(val)}>
          <TabPane tab="房屋详情" key="1">
            <HouseDetail houseDetail={detail} />
          </TabPane>
          <TabPane tab="信息溯源" key="2">
            <HouseTrace picUrl={picUrl} />
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
