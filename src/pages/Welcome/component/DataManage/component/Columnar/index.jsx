import { Chart, Interval, Tooltip } from 'bizcharts';

const data = [
  { month: '4月', value: 38 },
  { month: '5月', value: 52 },
  { month: '6月', value: 61 },
  { month: '7月', value: 45 },
  { month: '8月', value: 48 },
];

const Columnar = ({ data }) => {
  return (
    <Chart
      height={200}
      autoFit
      data={data}
      padding={[30, 30, 30, 50]}
    >
      <Interval position="month*value" />
    </Chart>
  );
};

export default Columnar;
