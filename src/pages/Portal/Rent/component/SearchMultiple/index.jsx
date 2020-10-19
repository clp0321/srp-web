import { Input, Typography } from 'antd';
import style from './style.less';

const { Text } = Typography;

// 地区
const mockLi = ['宝安', '南山', '龙华', '福田', '龙岗'];

// 价格
const priceList = ['1500元以下', '1500-2000', '2500-3500', '3500-4000', '4500-5000', '5000-5500'];

// 户型
const typeList = ['一居室', '二居室', '三居室', '四居室', '五居室', '五居室以上'];

// 面积
const sizeList = ['50m²以下', '50m²-70m²', '70m²-90m²', '90m²-110m²', '110m²-130m²'];

const SearchMultiple = ({ handle }) => {
  // 多条件查询
  const handleQuery = (position) => {
    // todo 查询位置信息
    handle(true)
  };
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
            {/* 区信息 */}
            <ul className={style.select_ul}>
              <li>
                <a>全部</a>
              </li>
              {mockLi.map((item) => (
                <li key={item}>
                  <a onClick={() => handleQuery(item, 1)}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.options}>
            {/* 租金信息 */}
            <ul className={[style.otption_ul, style.top].join(' ')}>
              <li>
                <Text strong>租金：</Text>
              </li>
              {priceList.map((item) => {
                return (
                  <li key={item}>
                    <a onClick={() => handleQuery(item, 2)}>{item}</a>
                  </li>
                );
              })}
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
              {typeList.map((item) => (
                <li key={item}>
                  <a onClick={() => handleQuery(item, 3)}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.options}>
            <ul className={style.otption_ul}>
              <li>
                <Text strong>面积：</Text>
              </li>
              {sizeList.map((item) => (
                <li key={item}>
                  <a onClick={() => handleQuery(item, 3)}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMultiple;
