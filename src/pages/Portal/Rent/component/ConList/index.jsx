import style from './style.less';
import { Tabs, Pagination } from 'antd';
import room1 from '@/assets/images/room1.jpg';
import room2 from '@/assets/images/room2.jpg';
import room3 from '@/assets/images/room3.jpg';
import room4 from '@/assets/images/room4.jpg';
import hotroom1 from '@/assets/images/hotroom1.jpg';
import hotroom2 from '@/assets/images/hotroom2.jpg';

const { TabPane } = Tabs;

const ConList = () => {
  return (
    <div className={style.list_contain}>
      <div className={style.list_check}>
        <Tabs defaultActiveKey="1" onChange={() => {}}>
          <TabPane tab="默认排序" key="1"></TabPane>
          <TabPane tab="房屋租金" key="2"></TabPane>
          <TabPane tab="房屋面积" key="3"></TabPane>
          <TabPane tab="上架时间" key="3"></TabPane>
        </Tabs>
      </div>
      <div className={[style.con, style.clearfix].join(' ')}>
        {/* 左侧房源 */}
        <div className={style.house_list}>
          <div className={style.house_list_item}>
            <img src={room1} width="270" />
            <div className={style.mid_dec}>
              <h2>合租 | 远洋新干线2期 5室1厅 西南</h2>
              <p>[ 保利悦都 龙华区 - 龙华中心 ] 保利悦都</p>
              <p>72 m² / 3室 2厅 / 高楼层 / 朝向南北</p>
              <p>更新于2020年8月28日</p>
              <p>
                <button type="button">近地铁</button>
                <button type="button">拎包入住</button>
              </p>
            </div>
            <div className={style.price}>
              <span>4200</span>元/月
            </div>
          </div>
          <div className={style.house_list_item}>
            <img src={room2} width="270" />
            <div className={style.mid_dec}>
              <h2>整租 | 保利悦 精装修灵宝入住</h2>
              <p>[ 骏泰金汐府 龙岗 - 龙岗中心城 ]</p>
              <p>61 m² / 2室 2厅 / 高楼层 / 朝向东南</p>
              <p>更新于2020年8月28日</p>
              <p>
                <button type="button">拎包入住</button>
              </p>
            </div>
            <div className={style.price}>
              <span>2800</span>元/月
            </div>
          </div>
          <div className={style.house_list_item}>
            <img src={room3} width="270" />
            <div className={style.mid_dec}>
              <h2>合租 | 怡海花园 4室1厅 北</h2>
              <p>[ 怡海花园 南山 - 后海 ]</p>
              <p>9 m² / 4室 1厅 / 中楼层 / 朝向北</p>
              <p>更新于2020年8月28日</p>
              <p>
                <button type="button">拎包入住</button>
              </p>
            </div>
            <div className={style.price}>
              <span>1780</span>元/月
            </div>
          </div>
          <div className={style.house_list_item}>
            <img src={room4} width="270" />
            <div className={style.mid_dec}>
              <h2>合租 | 现代城华庭 5室1厅 东南</h2>
              <p>[ 现代城华庭 南山 - 南油 ]</p>
              <p>72 m² / 3室 2厅 / 高楼层 / 朝向南北</p>
              <p>更新于2020年8月28日</p>
              <p>
                <button type="button">近地铁</button>
              </p>
            </div>
            <div className={style.price}>
              <span>3350</span>元/月
            </div>
          </div>
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
