import { TApi } from "./type";

export default <TApi>{
  common: {
    getpictureCheckCode: `/cs/account/pictureCheckCode?time=${new Date().getTime()}`,
    login: '/cs/account/login',
    logout: '/api/logout',
    sendEmail: '/cs/user/sendEmail',
    register: '/cs/user/register',
    forgetPassword: '/cs/user/forgetPassword',
  },
  account: {
    userInfo: '/cs/manager/list',
    addAccount: '/cs/manager/add',
  },
  user: {
    list: '/cs/user/list',
  },
  exchange: {
    list: '/cs/exchange/list',
    add: '/cs/exchange/addExchange',
    update: '/cs/exchange/modExchange',
    delete: '/cs/exchange/delExchange',
    queryUserExchange: '/cs/exchange/queryUserExchange'
  },
  assets: {
    list: '/cs/userMoney/list',
    add: '/cs/userMoney/add',
  },
  bonus: {
    list: '/cs/userBonus/list',
    add: '/cs/userBonus/add',
  },
  gmx: {
    list: '/cs/gmx/list',
    add: '/cs/gmx/add',
    update: '/cs/gmx/mod',
    stat: '/cs/gmx/getGmxStat',
    updateStatus: '/cs/gmx/updateGmxStatus',
    queryGmxProfitList: '/cs/gmx/queryGmxProfitList',  // 分时利润
    detail: '/cs/gmx/get',
    queryGmxReportList: '/cs/gmx/queryGmxReportList',   // 分天利润
    queryOperationByPage: '/cs/gmx/queryOperationByPage', // 操作记录
    getGmxProfit: '/cs/gmx/getGmxProfit',
  },
  overview: {
    getTotalSummary: '/cs/overview/getTotalSummary',
    getTotalList: '/cs/overview/getTotalList',
  }
}