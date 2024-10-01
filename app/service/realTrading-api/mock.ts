export default {
  GMXData: {
    code: 0,
    total: 10,
    data: generateMockData()
  }
}

// 随机数函数，生成-2%~2%的随机数
function randomNum() {
  return Math.random() * 0.04 - 0.02
}

function generateMockData() {
  const currentTime = new Date().getTime()
  const initTokenCount = 1252600000;
  const initShortTokenValue = 13581;
  const initUsdtCount = 10480;
  const initGmPrice = 0.000008352;
  const initCurrentProfit = 707;
  const initCurrentApy = 23.12;
  let result: any = []
  const initData = {
    time: currentTime, // 2024-08-27 23:23:25
    symbol: 'PEPE-USDC',  // 交易对
    opt: 'get',   // 操作
    principal: 33812,  // 本金
    tokenCount: initTokenCount,  // GM数量  即PEPE数量
    shortTokenValue: initShortTokenValue,  // 空单价值
    usdtCount: initUsdtCount,  // USDT数量
    gmPrice: initGmPrice,  // GM价格
    currentProfit: initCurrentProfit,
    currentApy: initCurrentApy,
    description: 'XXXXXXX',
    createTime: currentTime,
    updateTime: currentTime
  }
  result.push(initData)
  for (let i = 1; i < 1000; i++) {
    const obj = {
      // 向前15min
      time: result[i - 1].time - 60 * 60 * 1000,
      symbol: 'PEPE-USDC',  // 交易对
      // 最后一个是start,其他都是get
      opt: i === 999 ? 'start' : 'get',
      principal: 33812,  // 本金不变
      //PEPE数量
      tokenCount: Math.floor(result[i - 1].tokenCount * (1 + randomNum())),
      // 空单价值
      shortTokenValue: Math.floor(result[i - 1].shortTokenValue * (1 + randomNum())),
      // USDT数量
      usdtCount: Math.floor(result[i - 1].usdtCount * (1 + randomNum())),
      // GM价格
      gmPrice: result[i - 1].gmPrice * (1 + randomNum()),
      // 盈利
      currentProfit: Math.floor(result[i - 1].currentProfit * (1 + randomNum())),
      // APY
      currentApy: result[i - 1].currentApy * (1 + randomNum()),
      description: 'XXXXXXX',
      createTime: result[i - 1].time - 60 * 60 * 1000,
      updateTime: result[i - 1].time - 60 * 60 * 1000
    }
    result.push(obj)
  }
  // 按照时间顺序倒叙
  result = result.reverse()
  return result
}