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
        text: '实时收益趋势图'
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['实时收益']
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