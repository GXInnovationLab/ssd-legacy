/*
 * @File: 示例页
 * @Wiki:
 * @Author: mingyan.yu
 * @Date: 2018-09-13 22:51:01
 */

<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import config from './config';

export default {
  name: 'Article',
  components: {
  },
  data() {
    return {
      isCertainlyArticle: true,
      id: '',
      title: '',
      tag: [],
      content: '',
      isShowCard: false,
    };
  },
  methods: {
    fetchArticle() {
      this.id = 'data._id';
      this.title = 'data.title';
      this.tag = config.demoData;
      this.content = 'data.content';

      this.isShowCard = true;
    },
    pickOneArticle() {
      this.id = 'data._id';
      this.title = 'data.title';
      this.tag = config.demoData;
      this.content = 'data.content';

      this.isShowCard = true;
    },
    handleLike() {
      this.$smartMessage.success('成功');
    },
  },
  created() {
    const id = this.$route.query.id;
    this.isCertainlyArticle = !!id;
    if (id) {
      this.fetchArticle(id);
    } else {
      this.pickOneArticle();
    }
  },
};

</script>

