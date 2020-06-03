<template>
  <div>
  <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240">
      </el-table-column>
      <el-table-column prop="parent.name" label="父级分类">
      </el-table-column>
      <el-table-column prop="name" label="列表名称" width="120">
      </el-table-column>
       <el-table-column
        fixed="right"
        label="操作"
        width="120">
      <template slot-scope="scope">
          <!-- scope.row表示当前这一行数据，push内为``模板字符串 -->
        <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetch () { // 用于访问和操纵HTTP管道的部分，例如请求和响应
      const res = await this.$http.get('/rest/categories')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`是否确认要删除分类"${row.name}"`, '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // eslint-disable-next-line
        const res = await this.$http.delete(`/rest/categories/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss">
</style>
