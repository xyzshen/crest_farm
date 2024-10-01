import BarChart from "./BarChart";
enum EStatic {
  ar = 'Annual Return',
  ap = 'Annual Volatility',
  sr = 'Sharpe Ratio',
  md = 'Max Drawdown'
}

const PTChart = (props: any) => {
  const data = props.data
  const staticData: any = [
    {
      label: 'Annual Return',
      value: 28.59
    }, {
      label: 'Annual Volatility',
      value: 9.16
    }, {
      label: 'Sharpe Ratio',
      value: 3.42
    }, {
      label: 'Max Drawdown',
      value: 0.7
    }
  ]
  return <div className="w-[50%] p-6">
    <div>
      <BarChart data={data} title="Pair Trading" />
    </div>
    <div className="flex justify-between flex-wrap pt-2">
      {
        staticData.map((item: any) => {
          return <div key={item.label} className="flex w-[50%] justify-around items-center p-2">
            <div className="text-[#999]">{item.label}</div>
            <div className="text-[#1a1a1a] font-bold">{item.value}%</div>
          </div>
        })
      }
    </div>
  </div>
}

export default PTChart;