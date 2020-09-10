import React from 'react';
import { Typography } from 'antd';
import ColumnChart from './Column';
import LineChart from './Line';
import style from './style.less';

const { Text } = Typography;

const mockData = [
  {
    title: '续租率',
    component: <ColumnChart name="续租率" />,
  },
  {
    title: '入住情况',
    component: <ColumnChart name="入住率" />,
  },
  {
    title: '订单交易数',
    component: <LineChart name="交易数"/>,
  },
  {
    title: '信息上链数',
    component: <LineChart name="上链数" />,
  },
];

const Contain = ({ data }) => (
  <div className={style.conItem}>
    {data.component}
    <Text strong>{data.title}</Text>
  </div>
);

const chartList = mockData.map(item => <Contain data={item} />)

const ChartStatistic = () => {
  return (
    <div className={style.contain}>
      {chartList}
    </div>
  );
};

export default ChartStatistic;
