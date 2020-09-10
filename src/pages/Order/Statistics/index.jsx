import { useState, useEffect } from 'react';
import { Card, Select, DatePicker, Typography, Button, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import CountUp from 'react-countup';
import ChartStatistic from './component/ChartStatistic';
import style from './style.less';

const { Option } = Select;
const { Paragraph } = Typography;

let dataMock = [];
for (let i = 0; i < 12; i++) {
  dataMock.push({
    date: `2019年${i + 1}月`,
    income: 0,
    spend: 0,
    profit: 0,
  });
}

const Statistics = () => {
  // 表格数据
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: '收入',
      dataIndex: 'income',
      align: 'center',
    },
    {
      title: '支出',
      dataIndex: 'spend',
      align: 'center',
    },
    {
      title: '利润',
      dataIndex: 'profit',
      align: 'center',
    },
  ];

  const onChange = () => {};

  // 图表数据
  const statisticMock = [
    {
      name: '总收入',
      key: 'income',
      num: 2298,
    },
    {
      key: 'spend',
      name: '总支出',
      num: 485,
    },
    {
      key: 'profit',
      name: '总利润',
      num: 1814,
    },
    {
      key: 'renewal',
      name: '续租率',
      num: 12,
    },
    {
      key: 'checkin',
      name: '入住情况',
      num: 85,
    },
    {
      key: 'trans',
      name: '总订单数',
      num: 154,
    },
    {
      key: 'block',
      name: '链上存证数',
      num: 117,
    },
  ];

  const StatisticItem = ({ data }) => {
    let name;
    switch (data.key) {
      case 'renewal':
      case 'checkin':
        name = '%';
        break;
      case 'block':
      case 'trans':
        name = '笔';
        break;
      default:
        name = '元';
    }
    return (
      <div className={style.statistic_item} key={data.key}>
        <Paragraph strong>{data.name}：</Paragraph>
        <Paragraph className={[style.cash, style[data.key]].join(' ')}>
          <CountUp end={data.num} />
          {name}
        </Paragraph>
      </div>
    );
  };

  const list = statisticMock.map((item, index) => <StatisticItem key={index} data={item} />);

  return (
    <PageContainer>
      <Card style={{ marginBottom: 24 }}>
        <DatePicker
          onChange={onChange}
          picker="year"
          defaultValue={moment(new Date(), 'YYYY')}
          style={{ marginRight: 10 }}
        />
        <Select style={{ width: 150 }} defaultValue={1}>
          <Option value={1}>全部房产</Option>
          <Option value={2}>房产1</Option>
          <Option value={3}>房产2</Option>
        </Select>
        <Button type="ghost" style={{ float: 'right' }}>
          导出报表
        </Button>
      </Card>
      <Card style={{ marginBottom: 24 }}>
        <div className={style.statistic}>{list}</div>
      </Card>
      <Card bodyStyle={{ display: 'flex' }}>
        <Card title="收支统计表" style={{ width: '50%' }} className={style.table_card}>
          <Table rowKey="date" columns={columns} dataSource={dataMock} pagination={false} />
        </Card>
        <Card style={{ width: '50%', position: 'relative', marginLeft: 20 }} title="订单统计图">
          <ChartStatistic />
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Statistics;
