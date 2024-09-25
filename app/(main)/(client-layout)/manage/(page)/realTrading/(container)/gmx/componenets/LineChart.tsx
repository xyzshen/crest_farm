'use client'
import { getMaxValue, getMinValue } from '@/utils';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const LineChart = (props: any) => {
  const data = props.data
  const style = props.style

  const xData = data.map((item: any) => dayjs(item.time).format('YYYY-MM-DD HH:mm'))
  const yData = data.map((item: any) => item.currentProfit || item.value)
  let minYData = 0
  let maxYData = 100
  let minInterval = 20
  const options = useMemo(() => {
    if (data) {
      minYData = getMinValue(Math.min(...yData) * 1.1);
      maxYData = getMaxValue(Math.max(...yData) * 1.1);
      minInterval = Math.ceil((maxYData - minYData) / 5);
    }
    return {
      title: {
        text: 'Profit Trend'
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt: any) {
          return [pt[0], '10%'];
        }
      },
      legend: {
        data: ['Profit ']
      },
      xAxis: {
        name: 'tIME',
        type: 'category',
        data: xData
      },
      yAxis: [{
        name: 'Profit',
        type: 'value',
        minInterval: minInterval,
        max: maxYData,
        min: minYData,
        splitLine: {
          show: false,
          interval: 3,
        }
      }],
      series: [{
        name: 'Profit',
        type: 'line',
        data: yData,
      }],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          start: 0,
          end: 100
        }
      ],
    }
  }, [data])
  return <ReactECharts
    option={options}
    style={style}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
  />
}

export default LineChart