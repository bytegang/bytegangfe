<template>
  <div>

    <el-row align="middle" class="toolbar" justify="start" type="flex">
      <el-col :span="4">
        <go-back-btn></go-back-btn>
        <el-button type="primary" @click="doCrawl">Spider</el-button>
        <el-button type="primary" @click="doTranslate">翻译</el-button>

      </el-col>
      <el-col :span="20" class="search-bar">
        <el-date-picker
            v-model="q.created_at"
            :default-time="['00:00:00', '23:59:29']"
            end-placeholder="结束日期"
            range-separator="至"
            size="small"
            start-placeholder="开始日期"
            @change="fetchPage"
            type="daterange">
        </el-date-picker>

        <el-input v-model.trim="q.name"
                  clearable
                  placeholder="模糊搜索用户名（中文）"
                  prefix-icon="el-icon-search"
                  size="small"
                  @change="fetchPage">
        </el-input>
        <el-input v-model.trim="q.email"

                  clearable
                  placeholder="模糊搜索邮箱"
                  prefix-icon="el-icon-search"
                  size="small"
                  @change="fetchPage">
        </el-input>


        <el-button icon="el-icon-search" size="small"
                   title="搜索/刷新按钮"
                   type="primary"
                   @click="fetchPage">
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border stripe>
      <el-table-column fixed label="ID" prop="id" width="120"></el-table-column>
      <el-table-column label="URL" prop="url"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="标题中文" prop="title_zh"></el-table-column>
      <el-table-column label="分类" prop="cate"></el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <span v-text="shortTime(scope.row.updated_at)"></span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Action" width="80">
        <template slot-scope="scope">
          <el-button-group>

            <el-button v-if="!scope.row.email" size="mini" title="删除" type="danger"
                       @click="doDelete(scope.row)">删除
            </el-button>

          </el-button-group>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
        :current-page="q.page"
        :page-size="q.size"
        :page-sizes="[10,15, 30, 45, 60]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"

        @size-change="sizeChange"
        @current-change="pageChange">
    </el-pagination>

  </div>

</template>

<script>
import GoBackBtn from "@/components/misc/GoBackBtn";

export default {
  name: 'ListHacknews',
  components: {GoBackBtn},
  data() {
    return {
      q: {order: 'id:desc', page: 1, size: 15, name: '', email: ''},
      tableData: [],
      dialogFormVisible: false,
      total: 0,
      form: {},
    };
  },
  mounted() {
    this.fetchPage();
  },
  created() {
  },
  methods: {
    doCrawl() {
      this.$http.get(`/api/hacknews-crawl`).then(res => {
        if (res) {
          this.fetchPage();
        }
      })
    },
    doTranslate() {
      this.$http.get(`/api/hacknews-translate`).then(res => {
        if (res) {
          this.fetchPage();
        }
      })
    },

    pageChange(val) {
      this.q.page = val;
      this.fetchPage()
    },
    sizeChange(val) {
      this.q.page = 1;
      this.q.size = val;
      this.fetchPage()
    },
    fetchPage() {
      this.$http
          .get("/api/hacknews", {params: this.q})
          .then(resp => {
            if (resp) {
              let {page, size, list, total} = resp
              this.q.page = page
              this.q.size = size
              this.tableData = list
              this.total = total
            }
          })
    },
    doUpdate(row) {
      this.form = row;
      this.dialogFormVisible = true
    },
    doDelete(row) {
      this.$http.delete(`/api/hacknews/${row.id}`).then(res => {
        if (res) {
          this.fetchPage();
        }
      })
    },
  }
};
</script>
<style scoped>


</style>
