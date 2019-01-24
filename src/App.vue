<template>
  <div id="app">
    <el-container class="h100p" style="overflow:hidden">
      <el-header class="p0" style="height: auto">
        <Header />
      </el-header>
      <el-container class="main">
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer class="p0 ta-c pt20" style="height: auto">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Header, Footer } from '@/component';

export default {
  name: 'App',
  components: { Header, Footer },
  data() {
    return {
      isHide: false,
      sideBarMenu: [],
    };
  },

  mounted() {

  },
};
</script>

<style>
#app {
  height: 100%;
}
.h100p {
  height: 100%;
}
.p0 {
  padding: 0;
}
.main {
  height: calc(100% - 50px);
}
.el-main {
  padding: 0;
}
</style>
