export default {
  positionList: [
    {
      id: 1,
      status: 1,
      symbol: 'PEPE/USDC',
      amount: 33812,
      usdtAmount: 10480,
      tokenAmount: 1252600000,
      tokenValue: 10474,
      shortTokenAmount: 1227000000,
      shortTokenValue: 13581,
      tokenPrice: '0.000008362',
      currentProfit: 707,
      currentApy: 23.12,
    }
  ],
  recordList: [
    {
      id: 1,
      time: '2024-08-28 12:00:00',
      platform: 1,
      opt: 'increase', // 'open-开仓,close-平仓,increase-增加空单量,decrease-减少空单',
      count: 2000000, //'operate的数量',
      fundFee: 97, // 资金费率
      openFee: 65, // 开单消耗
      // 当前持仓数
      currentCount: 38000000,
      // 协议中token 数量
      tokenCount: 378000000,
    },
    {
      id: 2,
      time: '2024-08-28 16:00:00',
      platform: 1,
      opt: "open",
      count: 0, //'operate的数量',
      fundFee: 0, // 资金费率
      openFee: 0, // 开单消耗
      // 当前持仓数
      currentCount: 378000000,
      // 协议中token 数量
      tokenCount: 378000000,
    }
  ]
}

function randomNum(num: number, isZero: boolean = false) {
  return Math.random() * num * 2 - (isZero ? 0 : num)
}

function randomNumInt(num: number) {
  return Math.ceil(Math.random() * num * 2 - (num / 2))
}

const generateAprList = (num: number) => {
  let aprList: any[] = []
  for (let i = 0; i < num; i++) {
    let apr = i === 0 ? 0 : (aprList[i - 1]?.apr || 0) + randomNumInt(10)
    aprList.push({
      time: new Date().getTime() - 24 * 60 * 60 * 1000 * i,
      apr: apr
    })
  }
  return aprList
}

export function generateMockData() {
  let result = []
  const time = Math.ceil(randomNum(50, true))
  const initData = {
    id: 1,
    name: 'GMX-USER1',
    userName: 'user1',
    time: time,
    // 本金
    principal: Math.ceil(randomNum(100000, true)),
    // 收益
    profit: Math.ceil(randomNum(30000, true)),
    // APR
    apr: randomNum(40, true),
    status: 1,  // 1: 运行中 2: 停止
    createTime: new Date().getTime() - 24 * 60 * 60 * 1000 * time,
    aprList: generateAprList(time)
  }
  result.push(initData)
  for (let i = 1; i < 5; i++) {
    const timei = Math.ceil(randomNum(50, true))
    const obj = {
      id: i + 1,
      name: `GMX-USER${i}`,
      userName: `user${i}`,
      time: timei,
      // 本金
      principal: Math.ceil(randomNum(100000, true)),
      // 收益
      profit: Math.ceil(randomNum(30000, true)),
      // APR
      apr: randomNum(40, true),
      status: i === 3 ? 2 : 1,  // 1: 运行中 2: 停止
      createTime: new Date().getTime() - 24 * 60 * 60 * 1000 * timei,
      aprList: generateAprList(timei)
    }
    result.push(obj)
  }

  return result
}


export function generateHourBarData() {
  let result: any = [];
  // 获取当前的小时
  const initData = {
    time: new Date().getTime(),
    principal: 100000,
    // 协议总价值
    LPValue: 68000,
    token0Amount: 378000000,
    // 空单价值
    shortTokenAmount: 34000,
    // USDT数量
    usdtCount: 33500,
    // GM价格
    gmPrice: 0.00008627,
    // 资金费率
    fundingRate: 0.0002401,
    // 开单消耗
    openCost: 109.5,
    // 盈利
    currentProfit: 1.5,
    totalProfit: 35000,
    // APY
    currentApy: 22.6,
  }
  result.push(initData)
  for (let i = 1; i < 24; i++) {
    result.push({
      time: new Date().getTime() - 60 * 60 * 1000 * i,
      principal: 100000,
      // 协议总价值
      LPValue: Math.floor(result[i - 1].LPValue * (1 + randomNum(0.004))),
      // 空单价值
      shortTokenValue: Math.floor(result[i - 1].shortTokenValue * (1 + randomNum(0.0002))),
      shortTokenAmount: Math.floor(result[i - 1].shortTokenAmount * (1 + randomNum(0.0004))),
      // USDT数量
      usdtCount: Math.floor(result[i - 1].usdtCount * (1 + randomNum(0.0004))),
      // GM价格
      gmPrice: Math.floor(result[i - 1].gmPrice * (1 + randomNum(0.0004)) * 100000000) / 100000000,
      fundingRate: result[i - 1].fundingRate * (1 + randomNum(0.0004)),
      openCost: Math.floor(result[i - 1].openCost * (1 + randomNum(0.0004))),
      // 盈利
      currentProfit: Math.floor(result[i - 1].currentProfit * (1 + randomNum(0.0004))),
      totalProfit: Math.floor(result[i - 1].totalProfit * (1 + randomNum(0.00004))),
      // APY
      currentApy: Math.floor(result[i - 1].currentApy * (1 + randomNum(0.0004))),
    })
  }
  return result.reverse()
}

export function generateDayBarData() {
  let result: any = [];
  // 获取当前的小时
  // 获取当前的小时
  const initData = {
    time: new Date().getTime(),
    principal: 100000,
    // 协议总价值
    LPValue: 68000,
    shortTokenAmount: 378000000,
    // 空单价值
    shortTokenValue: 34000,
    // USDT数量
    usdtCount: 33500,
    // GM价格
    gmPrice: 0.00008627,
    // 资金费率
    fundingRate: 0.0002401,
    // 开单消耗
    openCost: 109.5,
    // 盈利
    currentProfit: 21,
    totalProfit: 3000,
    // APY
    currentApy: 29.6,
  }
  result.push(initData)
  for (let i = 1; i < 30; i++) {
    result.push({
      time: new Date().getTime() - 60 * 60 * 1000 * i,
      principal: 100000,
      // 协议总价值
      LPValue: Math.floor(result[i - 1].LPValue * (1 + randomNum(0.0004))),
      // 空单价值
      shortTokenValue: Math.floor(result[i - 1].shortTokenValue * (1 + randomNum(0.0004))),
      // USDT数量
      usdtCount: Math.floor(result[i - 1].usdtCount * (1 + randomNum(0.0004))),
      // GM价格
      gmPrice: Math.floor(result[i - 1].gmPrice * (1 + randomNum(0.0004)) * 100000000) / 100000000,
      fundingRate: result[i - 1].fundingRate * (1 + randomNum(0.0004)),
      openCost: Math.floor(result[i - 1].openCost * (1 + randomNum(0.0004))),
      // 盈利
      currentProfit: Math.floor(result[i - 1].currentProfit * (1 + randomNum(0.0004))),
      totalProfit: Math.floor(result[i - 1].totalProfit * (1 + randomNum(0.0004))),
      // APY
      currentApy: Math.floor(result[i - 1].currentApy * ((1 + randomNum(0.0004)) * 1000) / 1000),
    })
  }
  console.log('result', result)
  return result.reverse()
}

