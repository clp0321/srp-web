import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import moment from 'moment';

const { Line } = Guide;

const keywordTrends = [];
for (let i = 0; i < 12; i++) {
  const date = new Date();
  const newDate = date.setDate(date.getDay() + i);
  const json1 = {
    keyword: '收入',
    dates: moment(newDate).format('YYYY-MM-DD hh:mm:ss'),
    value: Math.floor((Math.random() + 1) * 2000),
  };
  const json2 = {
    keyword: '支出',
    dates: moment(newDate).format('YYYY-MM-DD hh:mm:ss'),
    value: Math.floor((Math.random() + 1) * 2000),
  };
  keywordTrends.push(json1, json2);
};

const data = {
  keywordTrend: keywordTrends,
  avgSpreadScore: [
    {
      key: '收入',
      value: 2500,
      checked: true,
      startDate: keywordTrends[0].dates,
      endDate:  keywordTrends[keywordTrends.length-1].dates,
    },
    {
      key: '支出',
      value: 2600,
      checked: true,
      startDate: keywordTrends[0].dates,
      endDate: keywordTrends[keywordTrends.length-1].dates,
    },
  ],
};

const { keywordTrend, avgSpreadScore } = data;

/**
1. 这里使用的是原始数据, 所以是 dates * value, 而格式化后的应该是 dates * value 把所有的 value 换成 value
2. colors: 自己可定义, 看是否可以使用对象(以方便日后指定关键词的颜色对应)
3. 上边数据中注释掉的是超出了 keywordTrend最小值和最大值范围之外的数据, 导致线太长出去了
*/

const colors = ['#1890ff', '#2fc25b'];
class Series extends React.Component {
  state = {
    avgSpreadScore,
  };
  render() {
    const cols = {
      dates: {
        range: [0.05, 0.95],
        type: 'timeCat',
      },
      value: {
        // min: 0,// 这里要设置一个最小值, 否则可能图表中按照了 keywordTrend 中的最小值设置Y轴最小值
      },
    };

    return (
      <Chart
        height={400}
        data={keywordTrend}
        filter={[
          [
            'keyword',
            (keyword) => {
              return avgSpreadScore.find((d) => d.key === keyword).checked;
            },
          ],
        ]}
        scale={cols}
        autoFit
      >
        <Legend
          onClick={(ev) => {
            const key = ev.item.value;
            avgSpreadScore.find((d) => d.key === key).checked = ev.checked;
            setTimeout(() => {
              this.setState({ avgSpreadScore });
            }, 0);
          }}
        />
        <Tooltip shared={true} showCrosshairs />
        <Axis name="dates" />
        <Axis name="value" />

        {/*shape="smooth" 可配置为曲线，不设置为折线*/}
        <Geom
          type="line"
          shape="smooth"
          position="dates*value"
          size={1}
          color={['keyword', colors]}
        />
        <Geom type="point" position="dates*value" size={2} color={['keyword', colors]} />
        {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
        <Guide>
          {avgSpreadScore.map((item, index) => {
            if (!item.checked) {
              return;
            }
            return (
              <Line
                key={index}
                top
                start={{ dates: item.startDate, value: item.value }}
                end={{ dates: item.endDate, value: item.value }}
                lineStyle={{
                  lineWidth: 2,
                  // 手动维护颜色
                  stroke: colors[index],
                }}
                /** 调整位置 */
                text={{
                  position: 'end',
                  style: {
                    fill: colors[index],
                  },
                  offsetX: -320,
                  content: `均值${item.value}`,
                }}
              />
            );
          })}
        </Guide>
      </Chart>
    );
  }
}

export default Series;
