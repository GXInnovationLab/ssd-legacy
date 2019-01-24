/*
 * @File: 公共头部
 * @wiki:
 * @Author: mingyan.yu
 * @Date: 2018-04-29 12:49:02
*/
<template>
  <div class="container">
    <span class="dis-ib">
      <span class="name pl20" @click="handleLogoClick">金主爸爸</span>
    </span>
    <span class="avator pr25 pl20">
      {{userName}}
    </span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userName: this.$cookie.get('user_name') || '未登录',
    };
  },
  methods: {
    handleLogoClick() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped lang='less'>
  @height: 60px;
  .container {
    height: @height;
    color: #FFF;
    background-color: rgb(15, 27, 42);
    position: relative;

    .dis-ib {
      line-height: @height;
    }

    .logo {
      margin-top: -8px;
      width: 36px;
      vertical-align: middle;
    }

    .name {
      font-size: 22px;
      color: #fff;
      cursor: pointer;
    }
    .avator {
      position: absolute;
      right: 0;
      height: 100%;
      line-height: @height;
    }
    .logout {
      cursor: pointer;
    }
    .select-icon {
      position: relative;
      height: @height;
      line-height: @height;
      display: inline-block;
      margin-left: 16px;
      width: 20px;
      cursor: pointer;
    }
    .more-icon {
      font-size: 12px;
      position: relative;
      top: -2px;
    }
    @keyframes toggle{
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .system-list-con {
      position: absolute;
      top: @height;
      margin-top: -10px;
      z-index: 99;
      width: 207px;
      max-height: 253px;
      overflow-y: auto;
      background: #fff;
      box-shadow: 0 0 4px #ccc;
      animation: toggle 0.5s;
      -moz-animation: toggle 0.5s;
      -webkit-animation: toggle 0.5s;
      -o-animation: toggle 0.5s;
      border-radius: 5px;
    }
    .list-item {
      position: relative;
      height: 36px;
      line-height: 36px;
      color: #243141;
      font-size: 14px;
      border-bottom: 1px solid #EEEFF0;
      padding: 0 12px;
      cursor: pointer;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        background: #F9FCFF;
        color: #398CF8;
      }
      &:active {
        background: #F9FCFF;
        color: #398CF8;
      }
      &.actived {
        background: #398CF8;
        color: #fff;
        &:hover {
          background: #398CF8;
          color: #fff;
        }
        .other-system::after {
          content: '\E611';
          position: absolute;
          right: 12px;
          font-family: 'element-icons';
          font-size: 12px;
          font-weight: 700;
        }
      }
    }
    .actived-icon {
      position: absolute;
      right: 12px;
      font-size: 12px;
      color: #fff;
    }
  }
</style>
