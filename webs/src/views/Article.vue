<template>
  <div class="page-article" v-if="model">
    <div class="titleBar d-flex ai-center py-3 border-bottom">
      <router-link
        tag="i"
        to="/"
        class="px-2 text-blue-1 iconfont icon-arrow-left"
      ></router-link>
      <strong class="pr-4 flex-1 fs-md text-blue-1 text-ellipsis">{{
        model.title
      }}</strong>
      <span class="fs-sm text-grey pr-2">{{ model.createdAt | date }}</span>
    </div>
    <div class="ql-container px-1">
      <div class="ql-editor body" v-html="model.details"></div>
    </div>
    <div>
      <m-card plain icon="news" title="相关资讯">
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
          class="d-flex ai-center pb-2"
        >
          <div class="text-ellipsis fs-lg flex-1 pr-4">{{ item.title }}</div>
          <div class="fs-sm text-grey">{{ item.createdAt | date }}</div>
        </router-link>
      </m-card>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    id: { required: true }
  },
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      model: {
        title: ""
      }
    };
  },
  watch: {
    // 当文章id变化时，重新加载
    id() {
      this.fetchArticle();
    }
  },
  methods: {
    async fetchArticle() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetchArticle();
  }
};
</script>

<style lang="scss">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
.ql-container {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
    p {
      line-height: 1.75em;
    }
    span {
      line-height: 1.75em;
    }
  }
}
</style>
