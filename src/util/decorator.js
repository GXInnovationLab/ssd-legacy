/*
 * @File: 装饰器库
 * @wiki:
 * @Author: mingyan.yu
 * @Date: 2018-04-29 17:37:36
 *
 * @USAGE:
 * @lazyExcute(): 300ms周期的去抖执行
 * @lazyExcute(500): 500ms周期的去抖执行
 * @lazyExcute(300, false): 500ms周期的节流执行
 * @showTip('确定删除？'): 执行目标函数前弹窗提示「确定删除？」文案
 */

/**
 * 函数节流去抖 (节流(throttle)：限制频率，去抖(debounce)：最后执行)
 * @param {*} time
 * @param {*} mode 默认为去抖
 */
export function lazyExcute(time = 300, isDebounce) {
  return (target, name, descriptor) => {
    const func = descriptor.value;
    if (typeof isDebounce === 'boolean' && !isDebounce) {
      // eslint-disable-next-line
      descriptor.value = function (args) {
        if (this.executing) {
          return;
        }
        func.apply(this, args);
        this.executing = true;
        setTimeout(() => {
          this.executing = false;
        }, time);
      };
    } else {
      // eslint-disable-next-line
      descriptor.value = function (args) {
        if (this.throttleTimer) {
          clearTimeout(this.throttleTimer);
        }
        this.throttleTimer = setTimeout(() => func.apply(this, args), time);
      };
    }
  };
}

// 操作前的提示
export function showTip(tip) {
  return (target, name, descriptor) => {
    const func = descriptor.value;
    // eslint-disable-next-line
    descriptor.value = function(args) {
      this.$alert(tip, '操作提示', {
        type: 'warning',
        closeOnClickModal: true,
      }).then(() => {
        func.apply(this, args);
      }).catch(err => err);
    };
  };
}
