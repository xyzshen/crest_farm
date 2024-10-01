'use client'
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const BarChart = (props: any) => {
  const data = props.data
  const style = props.style
  const type = props.type

  const formatData = type === 'day' ? 'MM-DD' : 'HH:mm'

  const xData = data?.map((item: any) => dayjs(item.createTime).format(formatData)) || []
  const yData = data?.map((item: any) => item.value || item.currentProfit) || []
  const options = useMemo(() => {
    return {
      title: {
        text: 'Real-time Profit Trend'
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Real-time Profit']
      },
      xAxis: {
        name: 'Time',
        type: 'category',
        data: xData,
        // 刻度线
        axisTick: {
          show: false
        },
        // 间距
        axisLabel: {
          interval: 1
        },
      },
      barMaxWidth: 40,
      yAxis: [{
        name: 'Real-time Profit',
        type: 'value',
        splitLine: {
          show: false,
          interval: 3,
        }
      }],
      series: [{
        name: 'Real-time Profit',
        type: 'bar',
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

export default BarChart