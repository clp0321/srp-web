import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { getHouseDetail } from '@/services/property';
import HouseDetail from './component/HoseDetail';
import HouseTrace from './component/HouseTrace';
import HouseComment from './component/HouseComment';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import imgUrl1 from '@/assets/house/house1.jpg';
import imgUrl2 from '@/assets/house/house2.jpg';
import imgUrl3 from '@/assets/house/house3.jpg';
import imgUrl4 from '@/assets/house/house4.jpg';

import style from './style.less';

const { TabPane } = Tabs;

const Detail = () => {
  const [key, setKey] = useState('1');
  const [maskVisible, showMask] = useState(false);
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

  const showImgList = () => {
    showMask(true);
  };
  const { picUrl } = detail;
  return (
    <div className={style.contain}>
      {/* 背景图  */}
      <div className={style.mask}>
        <div className={style.showImg}>
          <img src={imgUrl1} />
        </div>
        <div className={style.img_contain}>
          <p>1/4 卧室</p>
          <div className={style.img_list}>
            <ul>
              <li>
                <img src={imgUrl1} />
              </li>
              <li>
                <img src={imgUrl2} />
              </li>
              <li>
                <img src={imgUrl3} />
              </li>
              <li>
                <img src={imgUrl4} />
              </li>
            </ul>
          </div>
        </div>
        <LeftOutlined className={[style.row, style.left].join(' ')} />
        <RightOutlined className={[style.row, style.right].join(' ')} />
        <CloseOutlined className={style.close_label} />
      </div>
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
