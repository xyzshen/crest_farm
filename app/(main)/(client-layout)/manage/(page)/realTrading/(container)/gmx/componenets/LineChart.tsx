'use client'
import { formatDecimal, formatTimeToTz, getMaxValue, getMinValue } from '@/utils';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const LineChart = (props: any) => {
  const data = props.data
  const style = props.style

  const xData = data.map((item: any) => formatTimeToTz(item.createTime, 'YYYY-MM-DD HH:mm'))
  const yData = data.map((item: any) => Number(formatDecimal(item.currentProfit || item.value, 2)))
  let minYData = 0
  let maxYData = 100
  let minInterval = 20
  const options = useMemo(() => {
    if (data) {
      console.log('Math.max(...yData) * 1.2', Math.max(...yData) * 1.2)
      minYData = getMinValue(Math.min(...yData) * 1.1);
      maxYData = getMaxValue(Math.max(...yData) * 1.2);
      if (maxYData > 0 && minYData > 0) {
        minYData = 0
      }
      minInterval = Math.ceil((maxYData - minYData) / 5);
    }
    return {
      title: {
        text: '收益趋势'
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
        name: '时间',
        type: 'category',
        data: xData
      },
      yAxis: [{
        name: '收益',
        type: 'value',
        // minInterval: minInterval,
        // max: maxYData,
        // min: minYData,
        splitNumber: 3,
        splitLine: {
          show: false,
          interval: 3,
        }
      }],
      series: [{
        showSymbol: false,
        name: '收益',
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