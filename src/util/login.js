/*
 * @File: 登录
 * @wiki:
 * @Author: mingyan.yu
 * @Date: 2018-05-07 16:53:18
*/

import {
  LOGIN_URL,
} from '@/config';

export default (url) => {
  let redirectUrl = url || window.location.href;
  redirectUrl = encodeURIComponent(redirectUrl);
  window.location.href = `${LOGIN_URL}?redirectUrl=${redirectUrl}`;
};
