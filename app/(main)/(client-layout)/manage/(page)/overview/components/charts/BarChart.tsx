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
        axisLine: {
          show: true,
          lineStyle: {
            color: '#d6d6d6'
          }
        }
      },
      yAxis: {
        type: 'value',
        splitNumber: 1.5,
        axisLabel: {
          formatter: '{value}'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yData, xData])

  return <ReactECharts
    option={options}
    style={{ height: 180 }}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
  />
}

export default BarChart;