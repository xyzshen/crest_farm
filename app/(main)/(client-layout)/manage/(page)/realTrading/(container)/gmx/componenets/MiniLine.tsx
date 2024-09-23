'use client'
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const MiniLine = (props: any) => {
  const data = props.data
  const style = props.style

  const xData = data.map((item: any) => dayjs(item.time).format('YYYY-MM-DD HH:mm'))
  const yData = data.map((item: any) => item.currentProfit || item.value)
  const maxData = Math.max(...yData)

  const options = useMemo(() => {
    return {
      title: {
        show: false,
        text: '收益趋势图'
      },
      grid: {
        top: 10,
        left: 40,
        right: 10,
        bottom: 5,
      },
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
        data: ['累计收益']
      },
      xAxis: {
        name: '时间',
        type: 'category',
        data: xData,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
      },
      yAxis: [{
        name: '累计收益',
        type: 'value',
        splitLine: {
          show: false,
          interval: 1,
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitNumber: 1,
      }],
      series: [{
        name: '累计收益',
        type: 'line',
        symbol: 'none',
        data: yData,
      }],
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

export default MiniLine