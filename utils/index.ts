// 钱包地址展示
export function formatWalletAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// 每千分位加逗号
export function formatNumber(num: number): string {
  return num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

// 根据传入时间计算距离当前时间的时间差，单位天，向上取整
// 根据传入时间计算距离当前时间的时间差，单位天，向上取整
export function calcDaysFromNow(time: string | number): string {
  // 传入是number, 则是时间戳
  const now = new Date().getTime()
  const target = typeof (time) === 'number' ? time : new Date(time).getTime()
  const diff = now - target
  // 返回值小于3分钟，则返回秒
  if (diff < 1000 * 60 * 3) {
    return Math.floor(diff / 1000) + 1 + 's'
  }
  // 返回值小于2小时，则返回分钟
  if (diff < 1000 * 60 * 60 * 2) {
    return Math.floor(diff / (1000 * 60)) + 1 + 'm'
  }
  // 返回值小于48小时，则返回小时
  if (diff < 1000 * 60 * 60 * 48) {
    return Math.floor(diff / (1000 * 60 * 60)) + 1 + 'h'
  }
  // 其余返回天
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1 + 'days'
}

// url 参数拼接,需要将参数转义
export function urlParams(params: { [key: string]: any }): string {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

// url 拼接完整版，多个参数
export function urlParamsFull(url: string, params: { [key: string]: any }): string {
  const paramsStr = urlParams(params)
  return `${url}?${paramsStr}`
}

// 枚举enum 转数组对象
export function enumToArray(enumObj: { [key: string]: any }): { label: string, value: string }[] {
  return Object.keys(enumObj).map(key => ({ label: enumObj[key], value: key }))
}

// 枚举转对象
export function enumToObject(enumObj: { [key: string]: any }): { [key: string]: string } {
  return Object.keys(enumObj).reduce((acc, key) => {
    // 检查 enumObj[key] 是否为 string
    if (typeof enumObj[key] === 'string') {
      acc[key] = enumObj[key];
    } else {
      acc[key] = String(enumObj[key]); // 将其他类型转换为 string
    }
    return acc;
  }, {} as { [key: string]: string }); // 类型断言 reduce 返回的对象为 { [key: string]: string }
}

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}


// 保留小数点位，需要四舍五入
export function formatDecimal(num: number | string | undefined, limt: number): string {
  if (!num) {
    return '0'
  }
  let number = num
  if (typeof (num) === 'string') {
    number = Number(num)
  } else {
    number = num
  }
  return number.toFixed(limt)
}

// 对app secipt 加密，仅显示前后6位，中间用*代替
export function formatAppSecret(secret: string): string {
  return `${secret.slice(0, 6)}******${secret.slice(-6)}`
}

// 

// 获取最小值，如果是21，则返回20，-21则返回-30， 201， 则返回200
export function getMinValue(num: number): number {
  if (!num) return 0
  const newNumber = Math.ceil(Number(formatDecimal(num, 2)))
  const numStr = newNumber.toString()
  const len = numStr.length
  const first = numStr[0]
  let min = 0
  if (first === '-') {
    min = Math.floor(newNumber / Math.pow(10, len - 2)) * Math.pow(10, len - 2)
  } else {
    min = Math.ceil(newNumber / Math.pow(10, len - 1)) * Math.pow(10, len - 1)
  }
  return newNumber
}

// 获取最大值，如果是21，则返回30，-21则返回-20， 201， 则返回300
export function getMaxValue(num: number): number {
  if (!num) return 10
  const newNumber = Math.ceil(Number(formatDecimal(num, 2)))
  const numStr = newNumber.toString()
  const len = numStr.length
  const first = numStr[0]
  let max = 0
  if (first === '-') {
    max = Math.ceil(newNumber / Math.pow(10, len - 2)) * Math.pow(10, len - 2)
  } else {
    max = Math.floor(newNumber / Math.pow(10, len - 1)) * Math.pow(10, len - 1)
  }
  return max > 0 && max < 10 ? 10 : max
}

// 根据key查询树的节点
export function findNodeByKey<T extends Record<string, any>>(
  tree: T[],
  key: string,
  keyField: keyof T = 'key', // 默认情况下 keyField 为 'key'
): T | undefined {
  for (const node of tree) {
    if (node[keyField] === key) {
      return node;
    }
    if (node.children) {
      const childNode = findNodeByKey(node.children, key, keyField);
      if (childNode) {
        return childNode;
      }
    }
  }
  return undefined;
}