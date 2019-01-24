/*
 * @File: 频道级接口
 * @Wiki:
 * @Author: mingyan.yu
 * @Date: 2018-04-29 18:13:42
*/

import Request from '@/util/request';

export default {
  getCitySuggest(params) {
    const uri = '/path/to/api';
    return Request.get(uri, params);
  },
};
