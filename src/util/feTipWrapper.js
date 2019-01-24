/*
 * @File: 网络请求异常的提示语封装
 * @wiki:
 * @Author: mingyan.yu
 * @Date: 2018-05-16 15:36:35
 * Usage: feTipWrapper('后端接口gg啦') -> '后端接口gg啦 .'
 */

export default (text) => {
  const suffix = ' .';
  if (typeof text !== 'string') {
    return '';
  }
  if (text === '') {
    return '';
  }
  return `${text}${suffix}`;
};
