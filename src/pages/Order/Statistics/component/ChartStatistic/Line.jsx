import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip } from 'bizcharts';

// 虚拟数据源
const mockData = [];
for (let i = 0; i < 12; i++) {
  mockData.push({
    months: `${i + 1}月`,
    value: Math.floor(Math.random() * 2000),
  });
}

const LineChart = ({ name }) => {
  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      height={350}
      data={mockData}
      scale={{ value: { min: 0 } }}
    >
      <Line position="months*value" />
      <Point position="months*value" />
      <Tooltip>
        {(months, values) => {
          const { data } = values[0];
          return (
            <div style={{ padding: 10, fontSize: 14 }}>
              {months}
              {name}：{data.value}
            </div>
          );
        }}
      </Tooltip>
      <Tooltip showCrosshairs />
    </Chart>
  );
};

export default LineChart;
