<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">物品管理</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄管理</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄编辑</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章管理</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章编辑</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>运营管理</template>
          <el-menu-item-group>
            <template slot="title">广告管理</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告编辑</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
          <el-menu-item-group>
            <template slot="title">分类管理</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">账号管理</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-user-solid" style="margin-right: 15px; font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">查看详情</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 以路由的路径区分页面 -->
        <router-view :key="$route.path">
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleCommand (command) {
      if (command === '1') {
        this.$router.push('/admin_users/list')
      }
    }
  }
}
</script>

<style lang="scss">
  .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
  .el-aside {
    color: #333;
  }
</style>
