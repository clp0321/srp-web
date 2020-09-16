import { useState } from 'react';
import { Tabs, Pagination, Button } from 'antd';
import room1 from '@/assets/images/room1.jpg';
import room2 from '@/assets/images/room2.jpg';
import room3 from '@/assets/images/room3.jpg';
import room4 from '@/assets/images/room4.jpg';
import hotroom1 from '@/assets/images/hotroom1.jpg';
import hotroom2 from '@/assets/images/hotroom2.jpg';
import style from './style.less';

const { TabPane } = Tabs;

// mockData
const houseList = [
  {
    imgUrl: room1,
    con1: '合租 | 远洋新干线2期 5室1厅 西南',
    con2: '[ 保利悦都 龙华区 - 龙华中心 ] 保利悦都',
    con3: '72 m² / 3室 2厅 / 高楼层 / 朝向南北',
    time: '更新于2020年8月28日',
    btnList: ['近地铁', '拎包入住'],
    price: 4200,
  },
  {
    imgUrl: room2,
    con1: '整租 | 保利悦 精装修灵宝入住',
    con2: '[ 骏泰金汐府 龙岗 - 龙岗中心城 ]',
    con3: '61 m² / 2室 2厅 / 高楼层 / 朝向东南',
    time: '更新于2020年8月28日',
    btnList: ['拎包入住'],
    price: 2800,
  },
  {
    imgUrl: room3,
    con1: '合租 | 怡海花园 4室1厅 北',
    con2: '[ 怡海花园 南山 - 后海 ]',
    con3: '9 m² / 4室 1厅 / 中楼层 / 朝向北',
    time: '更新于2020年8月28日',
    btnList: ['拎包入住'],
    price: 1780,
  },
  {
    imgUrl: room4,
    con1: '合租 | 现代城华庭 5室1厅 东南',
    con2: '[ 现代城华庭 南山 - 南油 ]',
    con3: '72 m² / 3室 2厅 / 高楼层 / 朝向南北',
    time: '更新于2020年8月28日',
    btnList: ['近地铁'],
    price: 4200,
  },
];

const ConList = () => {
  const [visible, setVisible] = useState(true);
  const [key, setKey] = useState('1');
  const handleClick = () => {
    // setVisible(false);
    const w=window.open('about:blank');
    w.location.href="/srp/detail"
  };
  const HouseList = ({ data }) => {
    const { imgUrl, con1, con2, con3, time, btnList, price } = data;
    return (
      <div className={style.house_list_item}>
        <img src={imgUrl} width="270" onClick={handleClick} />
        <div className={style.mid_dec}>
          <h2>{con1}</h2>
          <p>{con2}</p>
          <p>{con3}</p>
          <p>{time}</p>
          <p>
            {btnList.map((item) => {
              <Button>{item}</Button>;
            })}
          </p>
        </div>
        <div className={style.price}>
          <span>{price}</span>元/月
        </div>
      </div>
    );
  };
  const house_list = houseList.map((item, index) => <HouseList key={index} data={item} />);
  return (
    <div className={style.list_contain}>
      <div className={style.list_check}>
        <Tabs defaultActiveKey={key} onChange={(val) => setKey(val)}>
          <TabPane tab="默认排序" key="1"></TabPane>
          <TabPane tab="房屋租金" key="2"></TabPane>
          <TabPane tab="房屋面积" key="3"></TabPane>
          <TabPane tab="上架时间" key="4"></TabPane>
        </Tabs>
      </div>
      <div className={[style.con, style.clearfix].join(' ')}>
        {/* 左侧房源 */}
        <div className={style.house_list}>
          {house_list}
          <div className={style.pagination}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
        {/* 右侧内容 */}
        <div className={style.house_recommend}>
          <div className={style.wycz}>
            <div className={style.cz_banner}></div>
            <div className={style.wycz_btn}>我要出租</div>
          </div>
          {/* 热门房源 */}
          <div className={style.rmfy}>
            <h2>热门房源</h2>
            <div className={style.hot_house}>
              <div className={style.hot_house_item}>
                <img src={hotroom1} width="320" height="160" />
                <div className={style.item_out}>
                  <h3>合租 | 整租·都市名园·9居室</h3>
                  <p>76 m² / 3室 2厅 / 高楼层 / 朝向南</p>
                  <p>4200元/月</p>
                </div>
              </div>
            </div>
            <div className={style.hot_house}>
              <div className={style.hot_house_item}>
                <img src={hotroom2} width="320" height="160" />
                <div className={style.item_out}>
                  <h3>整租 | 整租·雕塑家园 3室2厅 复式 南/北</h3>
                  <p>72 m² / 3室 2厅 / 高楼层 / 朝向南北</p>
                  <p>7200元/月</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConList;
