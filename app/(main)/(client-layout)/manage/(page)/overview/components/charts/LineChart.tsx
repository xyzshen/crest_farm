import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const LineChart = (props: any) => {

  const { data } = props

  const xAxis = useMemo(() => {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }, [])

  const yAxis = useMemo(() => {
    return [771, 885, 1093, 321, 98, 3211, 2107]
  }, [])

  const yMax = useMemo(() => {
    return 4000
  }, [])

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
          color: '#4D4D4D'
        }
      },
      yAxis: {
        type: 'value',
        max: yMax,
        axisLabel: {
          color: '#4D4D4D'
        },
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