'use client'
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const MiniLine = (props: any) => {
  const data = props.data
  const style = props.style


  const options = useMemo(() => {
    const yData = data.map((item: any) => Number(item.value));
    const xData = data.map((item: any) => dayjs(item.time).format('YYYY-MM-DD HH:mm'));
    const maxData = Math.ceil(Math.max(...yData) > 0 ? Math.max(...yData) * 1.2 : Math.max(...yData) * 0.9);
    const minData = Math.min(...yData) > 0 ? Math.ceil(Math.min(...yData) * 0.8) : Math.ceil(Math.min(...yData) * 1.2);
    return {
      title: {
        show: false,
        text: '收益趋势图'
      },
      grid: {
        top: 5,
        left: 30,
        right: 0,
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
        max: maxData,
        min: minData,
        minInterval: Math.round((maxData - minData) / 5),
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