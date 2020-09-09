import { useState, useEffect } from 'react';
import { Card, Select, DatePicker, Typography, Button, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import Chart from './component/StatisticChart';
import style from './style.less';
import './next.less';

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

  const statisticMock = [
    {
      name: '总收入',
      key: 'income',
      num: '0.00',
    },
    {
      key: 'spend',
      name: '总支出',
      num: '0.00',
    },
    {
      key: 'profit',
      name: '总利润',
      num: '0.00',
    },
    {
      key: 'trans',
      name: '总交易',
      num: '0.00',
    },
  ];

  const StatisticItem = ({ data }) => (
    <div className={style.statistic_item} key={data.key}>
      <Paragraph strong>{data.name}：</Paragraph>
      <Paragraph className={[style.cash, style[data.key]].join(' ')}>
        {data.num}
        {data.name === '总交易' ? '笔' : '元'}
      </Paragraph>
    </div>
  );

  const list = statisticMock.map((item, index) => <StatisticItem key={index} data={item} />);

  return (
    <PageContainer>
      <Card style={{ marginBottom: 24 }}>
        <Select style={{ width: 150, marginRight: 10 }} defaultValue={1}>
          <Option value={1}>全部房产</Option>
          <Option value={2}>房产1</Option>
          <Option value={3}>房产2</Option>
        </Select>
        <DatePicker onChange={onChange} picker="year" defaultValue={moment(new Date(), 'YYYY')} />
        <Button type="ghost" style={{ float: 'right' }}>
          导出报表
        </Button>
      </Card>
      <Card style={{ marginBottom: 24 }}>
        <div className={style.statistic}>{list}</div>
      </Card>
      <Card bodyStyle={{ display: 'flex' }}>
        <Card title="收支统计表" style={{ width: '50%' }} className={style.table_card}>
          <Table
            rowKey="date"
            columns={columns}
            dataSource={dataMock}
            pagination={false}
          />
        </Card>
        <Card style={{ width: '50%', position: 'relative', marginLeft: 20 }} title="收支统计图">
          <Chart className="bizcharts" />
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Statistics;
