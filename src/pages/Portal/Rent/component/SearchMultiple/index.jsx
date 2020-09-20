import { Input, Typography } from 'antd';
import style from './style.less';

const { Text } = Typography;

const SearchMultiple = () => {
  return (
    <div className={style.opt_filter}>
      <Text strong>共享租赁 / 深圳租房</Text>
      <div className={style.filter_con}>
        <div className={style.con_header}>
          <div className={style.position}>
            <Text strong>位置：</Text>
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
                <Text strong>租金：</Text>
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
                <Input className={style.rent_search} /> - <Input className={style.rent_search} /> 元
              </li>
            </ul>
          </div>
          <div className={style.options}>
            <ul className={style.otption_ul}>
              <li>
                <Text strong>户型：</Text>
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
                <Text strong>面积：</Text>
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
                <Text strong>结构：</Text>
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
  );
};

export default SearchMultiple;
