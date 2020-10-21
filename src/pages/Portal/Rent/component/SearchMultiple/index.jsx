import { useState, useEffect } from 'react';
import { Input, Typography } from 'antd';
import { findPropertyByItems } from '@/services/property';
import style from './style.less';
import component from '@/locales/zh-TW/component';

const { Text } = Typography;

// 地区
const mockLi = ['宝安', '南山', '龙华', '福田', '龙岗'];

// 价格
const priceList = [
  {
    value: '不限',
    min: '',
    high: '',
  },
  {
    value: '1500元以下',
    min: 0,
    high: 1500,
  },
  {
    value: '1500-2000',
    min: 1500,
    high: 2000,
  },
  {
    value: '2000-2500',
    min: 2000,
    high: 2500,
  },
  {
    value: '2500-3000',
    min: 2500,
    high: 3000,
  },
  {
    value: '3000-3500',
    min: 3000,
    high: 3500,
  },
  {
    value: '3500-4000',
    min: 3500,
    high: 4000,
  },
];

// 户型
const typeList = [
  {
    value: '不限',
    search: '',
  },
  {
    value: '一居室',
    search: '一',
  },
  {
    value: '二居室',
    search: '二',
  },
  {
    value: '三居室',
    search: '三',
  },
  {
    value: '四居室',
    search: '四',
  },
  {
    value: '五居及以上',
    search: '五',
  },
];

// 面积
const sizeList = [
  {
    value: '不限',
    min: '',
    high: '',
  },
  {
    value: '50m²以下',
    min: 0,
    max: 50,
  },
  {
    value: '50m²-70m²',
    min: 50,
    max: 70,
  },
  {
    value: '70m²-90m²',
    min: 70,
    max: 90,
  },
  {
    value: '90m²-110m²',
    min: 90,
    max: 110,
  },
  {
    value: '110m²-130m²',
    min: 110,
    max: 130,
  },
];

const SearchMultiple = ({ handle, setConList, selectOpt, setSelectedOpt }) => {
  // 多条件查询
  const handleQuery = async (item, opt, index) => {
    let options;
    // let posIndex, priceIndex, specifyIndex, sizeIndex;
    switch (opt) {
      case 1:
        options = { position: item };
        selectOpt.posIndex = index;
        break;
      case 2:
        options = { lowPrice: item.min, highPrice: item.high };
        selectOpt.priceIndex = index;
        break;
      case 3:
        options = { specify: item.search };
        selectOpt.specifyIndex = index;
        break;
      case 4:
        options = { lowSize: item.min, highSize: item.max };
        selectOpt.sizeIndex = index;
        break;
      default:
        options = {};
    }
    const newData = { ...selectOpt, ...options };
    handle(true);
    const resp = await findPropertyByItems({ ...newData });
    setTimeout(() => {
      if (resp && resp.data) {
        setConList(resp.data);
        handle(false);
      }
    }, 500);
    setSelectedOpt(newData);
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
              {mockLi.map((item, index) => {
                item = index === 0 ? '' : item;
                return (
                  <li key={item}>
                    <a
                      onClick={() => handleQuery(item, 1, index)}
                      className={index === selectOpt.posIndex ? style.selected : null}
                    >
                      {index === 0 ? '全部' : item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={style.options}>
            {/* 租金信息 */}
            <ul className={[style.otption_ul, style.top].join(' ')}>
              <li>
                <Text strong>租金：</Text>
              </li>
              {priceList.map((item, index) => {
                return (
                  <li key={item.value}>
                    <a
                      onClick={() => handleQuery(item, 2, index)}
                      className={index === selectOpt.priceIndex ? style.selected : null}
                    >
                      {item.value}
                    </a>
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
              {typeList.map((item, index) => (
                <li key={item.value}>
                  <a
                    onClick={() => handleQuery(item, 3, index)}
                    className={index === selectOpt.specifyIndex ? style.selected : null}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.options}>
            <ul className={style.otption_ul}>
              <li>
                <Text strong>面积：</Text>
              </li>
              {sizeList.map((item, index) => (
                <li key={item.value}>
                  <a
                    onClick={() => handleQuery(item, 4, index)}
                    className={index === selectOpt.sizeIndex ? style.selected : null}
                  >
                    {item.value}
                  </a>
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
