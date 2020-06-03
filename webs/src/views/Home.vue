<template>
  <div class="Home">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in AdCats.items" :key="item._id">
        <a :href="item.url"><img :src="item.image" class="w-100"/></a>
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
    <div class="enter-container bg-white bd-lg-top" v-show="flag === false">
      <ul class="enter-list d-flex flex-wrap">
        <li class="enter-data">
          <i class="iconfont icon-cat_"></i>
          <div class="fs-sm">爆料站</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-dog_"></i>
          <div class="fs-sm">故事会</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-gift"></i>
          <div class="fs-sm">周边商场</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-dog_help"></i>
          <div class="fs-sm">体验服</div>
        </li>
      </ul>
      <div class="bg-light mt-0 py-2 text-center" @click="openHidden">
        <i class="iconfont icon-arrow-down"></i>
        <span class="fs-sm px-2">展开</span>
      </div>
    </div>
    <div class="enter-container bd-lg-top" v-show="flag === true">
      <ul class="enter-list d-flex flex-wrap">
        <li class="enter-data">
          <i class="iconfont icon-cat_"></i>
          <div class="fs-sm">爆料站</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-dog_"></i>
          <div class="fs-sm">故事站</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-gift"></i>
          <div class="fs-sm">周边商城</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-dog_help"></i>
          <div class="fs-sm">体验服</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-dog_food_bowl"></i>
          <div class="fs-sm">新人专区</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-dog_food_bag"></i>
          <div class="fs-sm">荣耀·传承</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-costume"></i>
          <div class="fs-sm">模拟战资料库</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-cat_walk"></i>
          <div class="fs-sm">王者营地</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-cat_food_bag"></i>
          <div class="fs-sm">公众号</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-cat_litter_box"></i>
          <div class="fs-sm">版本介绍</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-prize"></i>
          <div class="fs-sm">对局环境</div>
        </li>
        <li class="enter-data">
          <i class="iconfont icon-cat_litter_box"></i>
          <div class="fs-sm">无限王者团</div>
        </li>
      </ul>
      <div class="bg-light mt-0 py-2 text-center" @click="openHidden">
        <i class="iconfont icon-arrow-top"></i>
        <span class="fs-sm px-2">收起</span>
      </div>
    </div>
    <!-- <div class="news bd-lg-top">
      <div class="card px-3">
        <div class="py-3 d-flex border-bottom ai-center">
          <i class="iconfont icon-news" style="font-size: 20px"></i>
          <span class="flex-1 px-2">新闻资讯</span>
          <strong
            class="iconfont icon-ellipsis"
            style="font-size: 20px"
          ></strong>
        </div>
        <div class="nav py-3">
          <div class="nav-item active">热门</div>
          <div class="nav-item">新闻</div>
          <div class="nav-item">公告</div>
          <div class="nav-item">活动</div>
          <div class="nav-item">赛事</div>
        </div>
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="d-flex pb-2" v-for="n in 5" :key="n">
              <span class="fs-lg">[新闻]</span>
              <span class="fs-lg px-2">|</span>
              <span class="fs-lg flex-1">2月18日全服不停机更新公告</span>
              <span class="fs-sm">02/20</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div> -->
    <div class="news bd-lg-top bg-white">
      <m-list-card icon="news" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link
            tag="div"
            :to="`/articles/${news._id}`"
            class="fs-lg d-flex pt-3"
            v-for="(news, i) in category.newsList"
            :key="i"
          >
            <span class="text-blue">[{{ news.categoryName }}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 pr-2 text-ellipsis">{{ news.title }}</span>
            <span class="fs-xxs text-grey-2 ">{{ news.createdAt | date }}</span>
          </router-link>
        </template>
      </m-list-card>
    </div>
    <div class="hero bd-lg-top bg-white LH">
      <m-list-card icon="costume" title="英雄列表" :categories="heroCats">
        <template #items="{category}">
          <div class="d-flex flex-wrap">
            <router-link
              tag="div"
              :to="`/heroes/${hero._id}`"
              class="fs-sm p-2"
              v-for="(hero, i) in category.heroList"
              :key="i"
              style="width: 20%;"
            >
              <img :src="hero.avatar" class="w-100" />
              <div class="text-center">{{ hero.name }}</div>
            </router-link>
          </div>
        </template>
      </m-list-card>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          loop: true, // 是否循环轮播
          delay: 3000, // 自动播放延迟为3s
          disableOnInteraction: false // 用户操作swiper之后，不禁止autoplay，操作完成后自动开始自动播放
        },
        pagination: {
          el: ".pagination-home"
        },
        effect: "fade" // 图片过渡样式为渐变消失
      },
      AdCats: {
        name: "",
        items: []
      },
      newsCats: [],
      heroCats: [],
      flag: false
    };
  },
  methods: {
    async fetchAd() {
      const res = await this.$http.get("/ads/list");
      this.AdCats = res.data;
    },
    async fetchNews() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
    async fetchHero() {
      const res = await this.$http.get("/heroes/list");
      this.heroCats = res.data;
    },
    openHidden() {
      if (this.flag === false) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },
  created() {
    this.fetchAd();
    this.fetchNews();
    this.fetchHero();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.swiper-pagination {
  text-align: right !important;
  margin: 0 0 4px -16px;
  .swiper-pagination-bullet {
    background: map-get($colors, "white");
    border-radius: 2px;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.enter-container {
  .enter-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .enter-data {
      width: 25%;
      margin: 10px 0;
      text-align: center;
      color: map-get($colors, "icon");
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
      .iconfont {
        font-size: 30px;
      }
    }
  }
}
</style>
