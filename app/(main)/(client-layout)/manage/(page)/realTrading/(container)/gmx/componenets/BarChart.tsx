'use client'
import { formatDecimal, formatTimeToTz } from '@/utils';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const BarChart = (props: any) => {
  const data = props.data
  const style = props.style
  const type = props.type

  const formatData = type === 'day' ? 'MM-DD' : 'HH:mm'

  const xData = data?.map((item: any) => formatTimeToTz(item.createTime, formatData)) || []
  const yData = data?.map((item: any) => Number(formatDecimal(item.value || item.periodProfit, 2))) || []
  const options = useMemo(() => {
    return {
      title: {
        text: '实时收益趋势'
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Real-time Profit']
      },
      xAxis: {
        name: '时间',
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
        name: '实时收益',
        type: 'value',
        splitLine: {
          show: false,
          interval: 3,
        }
      }],
      series: [{
        name: '实时收益',
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