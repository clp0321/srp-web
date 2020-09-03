import { Component } from 'react';
import { Link } from 'umi';
import room1 from '@/assets/images/room1.jpg';
import room2 from '@/assets/images/room2.jpg';
import room3 from '@/assets/images/room3.jpg';
import room4 from '@/assets/images/room4.jpg';
import hotroom1 from '@/assets/images/hotroom1.jpg';
import hotroom2 from '@/assets/images/hotroom2.jpg';
import style from './style.less';

class Rent extends Component {
  render() {
    return (
      <>
        {/* 页面头部*/}
        <div className={style.header}>
          <div className={style.header_w}>
            <div className={style.header_l}>
              <h3>深圳</h3>
              <span>
                <a href="#">[切换城市]</a>
              </span>
            </div>
            <div className={style.header_home}>
              <h3>
                <Link to="/srp/welcome">首页</Link>
              </h3>
            </div>
            <div className={style.header_r}>
              <div className={style.h_r_link}>
                <Link to="/client/logining">登陆</Link>
                <span className={style.gap}>|</span>
                <Link to="/">注册</Link>
              </div>
            </div>
            <i className={style.h_r_icon}></i>
          </div>
        </div>
        {/* 内容索引 */}
        <div className={style.search}>
          <div className={style.search_h}>
            <a href="#" className={style.s_logo}>
              <h2>区块链共享租赁</h2>
            </a>
            <input className={style.search_input} placeholder="请输入区域、商圈或小区名开始找房" />
            <button className={style.search_btm}>搜索</button>
            <ul className={style.search_opt}>
              <li>热门搜索：</li>
              <li>
                <a href="#">民治</a>
              </li>
              <li>
                <a href="#">大剧院</a>
              </li>
              <li>
                <a href="#">坪山</a>
              </li>
              <li>
                <a href="#">会展中心</a>
              </li>
              <li>
                <a href="#">固戍</a>
              </li>
              <li>
                <a href="#">老街</a>
              </li>
              <li>
                <a href="#">田贝</a>
              </li>
            </ul>
            <button className={style.realase}>发布房源</button>
          </div>
        </div>
        {/* 条件搜搜 */}
        <div className={style.opt_filter}>
          <h5>共享租赁 深圳租房</h5>
          <div className={style.filter_con}>
            <div className={style.con_header}>
              <div className={style.position}>
                <b>位置：</b>
              </div>
              <div className={style.area}>
                <a href="#" className={style.select}>
                  区域找房
                </a>
              </div>
              <div className={style.subway}>
                <a href="#">地铁找房</a>
              </div>
            </div>
            <div className={style.con_option}>
              <div className={style.select_all}>
                <ul className={style.select_ul}>
                  <li>全部</li>
                  <li>宝安</li>
                  <li>南山</li>
                  <li>龙华</li>
                  <li>福田</li>
                  <li>龙岗</li>
                  <li>罗湖</li>
                  <li>盐田</li>
                  <li>龙华区</li>
                  <li>坪山区</li>
                  <li>光明新区</li>
                  <li>大鹏新区</li>
                  <li>惠州</li>
                  <li>东莞</li>
                  <li>深圳周边</li>
                </ul>
              </div>
              <div className={style.options}>
                <ul className={[style.otption_ul, style.top].join(' ')}>
                  <li>
                    <b>租金：</b>
                  </li>
                  <li>
                    <a href="#">全部</a>
                  </li>
                  <li>
                    <a href="#">1500元以下</a>
                  </li>
                  <li>
                    <a href="#">1500-2000</a>
                  </li>
                  <li>
                    <a href="#">2500-3500</a>
                  </li>
                  <li>
                    <a href="#">3500-4000</a>
                  </li>
                  <li>
                    <a href="#">4500-5000</a>
                  </li>
                  <li>
                    <a href="#">5500-5500</a>
                  </li>
                  <li>
                    <input className={style.rent_search} /> -{' '}
                    <input className={style.rent_search} /> 元
                  </li>
                </ul>
              </div>
              <div className={style.options}>
                <ul className={style.otption_ul}>
                  <li>
                    <b>户型：</b>
                  </li>
                  <li>
                    <a href="#">全部</a>
                  </li>
                  <li>
                    <a href="#">一居室</a>
                  </li>
                  <li>
                    <a href="#">二居室</a>
                  </li>
                  <li>
                    <a href="#">三居室</a>
                  </li>
                  <li>
                    <a href="#">四居室</a>
                  </li>
                  <li>
                    <a href="#">五居室</a>
                  </li>
                  <li>
                    <a href="#">五居室以上</a>
                  </li>
                </ul>
              </div>
              <div className={style.options}>
                <ul className={style.otption_ul}>
                  <li>
                    <b>面积：</b>
                  </li>
                  <li>
                    <a href="#">全部</a>
                  </li>
                  <li>
                    <a href="#">50m²以下</a>
                  </li>
                  <li>
                    <a href="#">50m²-70m²</a>
                  </li>
                  <li>
                    <a href="#">70m²-90m²</a>
                  </li>
                  <li>
                    <a href="#">90m²-110m²</a>
                  </li>
                  <li>
                    <a href="#">110m²-130m²</a>
                  </li>
                </ul>
              </div>
              <div className={style.options}>
                <ul className={style.otption_ul}>
                  <li>
                    <b>结构：</b>
                  </li>
                  <li>
                    <a href="#">混合</a>
                  </li>
                  <li>
                    <a href="#">混凝土钢筋</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* 搜索结果 */}
        <div className={style.show_result}>
          已为您找到 <span>4286</span> 套深圳房租
        </div>
        {/* 内容选择 */}
        <div className={style.list_check}>
          <ul>
            <li className={style.checked}>
              <a href="#">默认排序</a>
            </li>
            <li>
              <a href="#">房屋租金</a>
            </li>
            <li>
              <a href="#">房屋面积</a>
            </li>
            <li>
              <a href="#">上架时间</a>
            </li>
          </ul>
        </div>
        {/* 查询内容列表 */}
        <div className={[style.con, style.clearfix].join(' ')}>
          <div className={style.house_list}>
            <div className={style.house_list_item}>
              <img src={room1} width="270" height="180" />
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
              <img src={room2} width="270" height="180" />
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
              <img src={room3} width="270" height="180" />
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
              <img src={room4} width="270" height="180" />
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
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>...</li>
                <li>10</li>
              </ul>
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
        {/* 页面底部 */}
        <div className={style.footer}>
          <p>
            5G物联网区块链共享租赁平台为您提供全网安全有保障的房源信息，让您租房更安心，使用更放心！
          </p>
          <p>&copy;深圳计算机学会</p>
        </div>
      </>
    );
  }
}
export default Rent;
