import { formatDecimal } from '@/utils';
import dayjs from 'dayjs';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const LineChart = (props: any) => {

  const { data } = props

  const xAxis = useMemo(() => {
    return data.map((item: any) => dayjs(item.date).format('MM-DD'))
  }, [data])

  const yAxis = useMemo(() => {
    return data.map((item: any) => formatDecimal(item.value, 2))
  }, [data])

  const yMax = useMemo(() => {
    return Math.ceil(Math.max(...yAxis) * 1.2)
  }, [yAxis])

  const options = useMemo(() => {
    return {
      grid: { // 让图表占满容器
        top: "40px",
        left: "40px",
        right: "10px",
        bottom: "40px"
      },
      color: '#F86868',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1A1A1A',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: function (value: any) {
          const params = value[0]
          return `<div><span>${params.data}</span>&nbsp&nbsp<span style='color: #B3B3B3'>${params.name}</span></div>`
        }
      },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ebebeb',
            shadowBlur: 1,
            shadowColor: '#fff',
            shadowOffsetX: 4,
            shadowOffsetY: 1
          }
        },
        axisLabel: {
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        max: yMax,
        splitNumber: 1.5,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ebebeb',
            shadowBlur: 1,
            shadowColor: '#fff',
            shadowOffsetX: 4,
            shadowOffsetY: 1
          }
        }
      },
      series: [
        {
          showSymbol: false,
          symbolSize: 6,
          data: yAxis,
          type: 'line'
        }
      ]
    }
  }, [xAxis, yAxis, yMax])

  return <ReactECharts
    option={options}
    style={{ height: 230 }}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
  />
}

export default LineChart;