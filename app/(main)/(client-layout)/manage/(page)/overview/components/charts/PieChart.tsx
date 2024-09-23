import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const PieChart = (props: any) => {

  const { data } = props

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '$ {c} ({d}%)'
      },
      color: ['#235a7d', '#EE4A4A', '#FF7F24', '#66ff33', '#00ffff'],
      // legend: {
      //   top: '20%',
      //   left: 'center'
      // },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['65%', '90%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '24',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    }
  }, [])

  return <ReactECharts
    option={options}
    style={{ height: 150 }}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
  />
}

export default PieChart;