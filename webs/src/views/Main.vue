<template>
  <div>
    <div class="topbar bg-black d-flex px-4 ai-center">
      <img src="../assets/logo.png" class="logo" />
      <div class="px-3 flex-1">
        <h1 class="text-white fs-md my-0">王者荣耀</h1>
        <p class="text-grey-1 fs-sm my-0 pt-1">团队成就更多</p>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="nav nav-inverse bg-primary fs-md">
      <div class="nav-item active">
        <router-link class="nav-link" tag="div" to="/">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  height: 45px;
  z-index: 999;
  .logo {
    height: 30px;
  }
}
</style>
