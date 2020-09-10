import { Chart, Interval, Tooltip } from 'bizcharts';

const mockData = [];
for (let i = 0; i < 12; i++) {
  mockData.push({
    months: `${i + 1}月`,
    value: Math.floor(Math.random() * 100),
  });
}

const ColumnChart = ({ name }) => {
  return (
    <Chart height={350} autoFit data={mockData}>
      <Interval position="months*value" />
      <Tooltip>
        {(months, values) => {
          const { data } = values[0];
          return (
            <div style={{ padding: 10, fontSize: 14 }}>
              {months}
              {name}：{data.value}%
            </div>
          );
        }}
      </Tooltip>
    </Chart>
  );
};

export default ColumnChart;
