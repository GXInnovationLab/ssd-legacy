/*
 * @File: axios请求封装
 * @Author: mingyan.yu
 * @Date: 2018-05-07 16:54:25
 * USAGE: get、post函数参数依次为请求地址、请求参数、配置
 * Request.get(uri, data, {
 *   // 是否使用loading效果，默认false
 *   useLoading: false,
 *   // 请求响应中的status字段非0时是否走通用处理而不对使用者抛出异常，默认true（不抛出）
 *   eatError: true,
 *   // then与catch的接收数据是否需要完整数据，默认false
 *   fullInfo: false,
 * });
 */

/* eslint-disable no-unused-expressions */
import axios from 'axios';
import { Message, Loading } from 'element-ui';
import moment from 'moment';
import Login from '@/util/login';
import Forbid from '@/util/forbid';
import FETipWrapper from '@/util/feTipWrapper';

import {
  SERVER_HOST,
} from '@/config';

const Ax = axios.create({
  baseURL: SERVER_HOST,
  withCredentials: true,
  responseType: 'json',
});

Ax.interceptors.response.use(response => response, (error) => {
  const response = error.response || {};
  if (response.status === 401) {
    Login();
  }
  if (response.status === 403) {
    Forbid();
  }
  return Promise.reject(error);
});

/**
 * 接口错误处理
 * @param {*} config
 */
const apiErrorHandler = (uri, data, rejectData, config, cb = () => {}) => {
  // 默认开启 eatError
  if (config.eatError === undefined || config.eatError) {
    Message({
      type: 'error',
      showClose: true,
      message: rejectData.msg || rejectData,
    });
  } else {
    cb(rejectData);
  }
};

const Request = {
  get(uri = '', data = {}, config = {}) {
    // eatError 内部统一处理错误
    const { useLoading, fullInfo } = config;
    let loading = {};
    if (useLoading === true) {
      loading = Loading.service({ lock: true });
    }
    return new Promise((resolve, reject) => {
      Ax.get(uri, { params: data }).then((res = {}) => {
        const resData = res.data || {};
        if (resData.status === 0) {
          // 默认直接将data返回给调用者
          const resolveData = fullInfo === true ? resData : resData.data;
          resolve(resolveData);
        } else {
          // 只抛出非网络问题的异常(默认直接给出msg数据)，网络异常由下面的catch统一处理
          const rejectData = fullInfo === true ? resData : (resData.msg || FETipWrapper('接口处理失败'));

          apiErrorHandler(uri, data, rejectData, config, () => reject(rejectData));
        }
      }).catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          return;
        }
        const msg = err.message || FETipWrapper('网络错误');
        apiErrorHandler(uri, data, msg, config);
      }).finally(() => {
        useLoading && loading.close();
      });
    });
  },
  getFile(uri, data) {
    Ax.get(uri, { params: data, responseType: 'blob' }).then((res = {}) => {
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${moment().format('YYYYMMDDhhmm')}.xls`);
      document.body.appendChild(link);
      link.click();
    }).catch((err) => {
      if (err.response && [401, 403].includes(err.response.status)) {
        return;
      }
      const msg = err.message || FETipWrapper('网络错误');
      apiErrorHandler(uri, data, msg, {});
    });
  },
  postFile(uri, data, config = {}) {
    const defaultFileName = `${moment().format('YYYYMMDDhhmm')}.xls`;
    const { fileName = defaultFileName, fileType = 'application/vnd.ms-excel' } = config;
    return new Promise((resolve, reject) => {
      Ax.post(uri, data, { responseType: 'blob' }).then((res = {}) => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: fileType }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        resolve();
      }).catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          return;
        }
        const msg = err.message || FETipWrapper('网络错误');
        apiErrorHandler(uri, data, msg, {});
        reject();
      });
    });
  },
  post(uri = '', data = {}, config = {}) {
    const { useLoading, fullInfo } = config;
    let loading = {};
    if (useLoading === true) {
      loading = Loading.service({ lock: true });
    }
    return new Promise((resolve, reject) => {
      Ax.post(uri, data).then((res = {}) => {
        const resData = res.data || {};
        if (resData.status === 0) {
          // 默认直接将data返回给调用者
          const resolveData = fullInfo === true ? resData : resData.data;
          resolve(resolveData);
        } else {
          // 只抛出非网络问题的异常(默认直接给出msg数据)，网络异常由下面的catch统一处理
          const rejectData = fullInfo === true ? resData : (resData.msg || FETipWrapper('接口处理失败'));

          apiErrorHandler(uri, data, rejectData, config, () => reject(rejectData));
        }
      }).catch((err) => {
        if (err.response && [401, 403].includes(err.response.status)) {
          return;
        }
        const msg = err.message || FETipWrapper('网络错误');
        apiErrorHandler(uri, data, msg, config);
      }).finally(() => {
        useLoading && loading.close();
      });
    });
  },
};

export default Request;
