export default {
  stableList: generateMockData(),
  LMHList: generateMockData(),
  GMXDNList: generateMockData(),
  PTList: generateMockData(),
  CTAList: generateMockData()
}

// 随机数函数，生成-20~20的随机数
function randomNum() {
  return Math.random() * 20 - 10
}

function generateMockData(): any {
  let result: any = []
  const initData = {
    time: new Date().getTime(),
    value: 25,
    amount: 700
  }
  result.push(initData)
  for (let i = 1; i < 10; i++) {
    const value = result[i - 1].value + randomNum()
    const amount = result[i - 1].amount * (1 + value)
    const obj: any = {
      time: result[i - 1].time - 24 * 60 * 60 * 1000 * i,
      value: value,
      amount: amount
    }
    result.push(obj)
  }
  result = result.reverse()
  return result
}