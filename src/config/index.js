export const ENV = process.env.NODE_ENV;

// beta环境下使用的beta服务版本
export const BETA_VERSION = window.location.host.split('.')[0];

// 路由前缀配置信息
export const ROUTER_PREFIX = '';

// 站点分页信息配置
export const page = {
  pageNo: 1,
  pageSize: 20,
};

// 日期选择中，默认的时间范围
export const DEFAULT_TIME_RANGE = ['00:00:00', '23:59:59'];

export const SERVER_HOST = '';
