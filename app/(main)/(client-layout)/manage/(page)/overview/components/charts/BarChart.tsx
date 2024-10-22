import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { formatDecimal, formatDecimalNumber, formatTimeToTz } from '@/utils';

interface IBarChart {
  data: any[];
  title?: string;
}


const BarChart = (props: IBarChart) => {

  const { data, title } = props
  const xData = useMemo(() => {
    return data.map((item: any) => formatTimeToTz(item.date, 'MM-DD'))
  }, [data])

  const yData = useMemo(() => {
    return data.map((item: any) => formatDecimalNumber(item.value, 2))
  }, [data])

  const options = useMemo(() => {
    return {
      title: {
        text: title,
        show: false
      },
      grid: { // 让图表占满容器
        top: "40px",
        left: "50px",
        right: "10px",
        bottom: "40px"
      },
      color: '#4b5cdf',
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
        data: xData,
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
        splitNumber: 2,
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
          data: yData,
          type: 'line'
        }
      ]
    }
  }, [xData, yData])


  return <ReactECharts
    option={options}
    style={{ height: 180 }}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
  />
}

export default BarChart;