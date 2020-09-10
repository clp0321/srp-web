import React from 'react';
import Dashbord from './component/Dashbord';
import Columnar from './component/Columnar';
import style from './style.less';

const mockData1 = [
  {
    main_title: '出租情况',
    data: [{ value: 2.4 }],
    bottom_desc: '出租率',
    num: '24%',
  },
  {
    main_title: '收租情况',
    data: [{ value: 3.3 }],
    bottom_desc: '收租率',
    num: '33%',
  },
];

const mockData2 = {
  title: '收支情况',
  data: [
    { month: '4月', value: 0.2 },
    { month: '5月', value: 0.3 },
    { month: '6月', value: 0.5 },
    { month: '7月', value: 0.3 },
    { month: '8月', value: 0.7 },
  ],
};

const mockData3 = {
  title: '入住情况',
  data: [
    { month: '4月', value: 0.2 },
    { month: '5月', value: 0.3 },
    { month: '6月', value: 0.5 },
    { month: '7月', value: 0.3 },
    { month: '8月', value: 0.7 },
  ],
};

const DashItem = ({ item }) => {
  const { main_title, data, desc, bottom_desc, num } = item;
  return (
    <div className={style.dash_con}>
      <div className={style.dash_desc}>{main_title}</div>
      <Dashbord data={data} desc={desc} />
      <div className={style.dash_desc}>
        {bottom_desc}: {num}
      </div>
    </div>
  );
};

const ColumarItem = ({ item, name }) => {
  const { title, data } = item;
  return (
    <div className={[style.dash_con, style.padding].join(' ')}>
      <div className={style.dash_desc}>{title}</div>
      <Columnar data={data} name={name} />
    </div>
  );
};

const DataManage = () => {
  return (
    <div className={style.contain}>
      <div>
        <DashItem item={mockData1[0]} />
      </div>
      <div>
        <DashItem item={mockData1[1]} />
      </div>
      <div>
        <ColumarItem item={mockData2} name="收支" />
      </div>
      <div>
        <ColumarItem item={mockData3} name="入住" />
      </div>
    </div>
  );
};
export default DataManage;
