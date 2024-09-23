import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import dayjs from 'dayjs';

interface IBarChart {
  data: any[];
  title?: string;
}


const BarChart = (props: IBarChart) => {

  const { data, title } = props
  const xData = useMemo(() => {
    if (!data || data.length === 0) return []
    return data.map((item: any) => dayjs(item.time).format('MM-DD'))
  }, [data])

  const yData = useMemo(() => {
    if (!data || data.length === 0) return []
    return data.map((item: any) => Math.ceil(item.value * 10) / 10)
  }, [data])

  const options = useMemo(() => {
    return {
      title: {
        text: title,
        show: false
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#4D4D4D'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#d6d6d6'
          }
        }
      },
      yAxis: {
        type: 'value',
        splitNumber: 2,
        axisLabel: {
          formatter: '{value} %',
          color: '#4D4D4D'
        }
      },
      series: [
        {
          name: '2024年',
          type: 'bar',
          barWidth: '20px',
          itemStyle: {
            color: '#5E9EFF'
          },
          data: yData
        },
      ]
    }
  }, [])

  return <ReactECharts
    option={options}
    style={{ height: 180 }}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
  />
}

export default BarChart;