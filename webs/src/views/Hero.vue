<template>
  <div class="page-hero">
    <div class="topbar bg-black d-flex ai-center text-white px-3">
      <img src="../assets/logo.png" class="logo" />
      <div class="flex-1 fs-md">
        <strong class="px-3">王者荣耀</strong>
        <strong class="">攻略站</strong>
      </div>
      <div class="fs-sm">更多英雄 &gt;</div>
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white d-flex flex-column jc-end h-100 p-3">
        <div class="fs-sm">{{ model.title }}</div>
        <strong class="py-1">{{ model.name }}</strong>
        <div class="fs-sm">
          {{ model.categories.map(v => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between pt-1">
          <div class="scores" v-if="model.scores">
            <span class="fs-sm ">难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span class="fs-sm">技能</span>
            <span class="badge bg-blue-2">{{ model.scores.skills }}</span>
            <span class="fs-sm">攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span class="fs-sm">生存</span>
            <span class="badge bg-black">{{ model.scores.survive }}</span>
          </div>
          <router-link tag="span" to="/" class="fs-sm text-grey"
            >皮肤：2 &gt;</router-link
          >
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="bg-white px-3">
      <div class="nav border-bottom py-3 d-flex jc-around">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item ">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>
    <swiper>
      <swiper-slide>
        <div class="px-3 bg-white">
          <div class="d-flex py-3 ">
            <router-link tag="button" to="/" class="btn btn-lg flex-1 mr-2">
              <i class="iconfont icon-shipin"></i>
              <span class="fs-md">英雄介绍视频</span>
            </router-link>
            <router-link tag="button" to="/" class="btn btn-lg flex-1">
              <i class="iconfont icon-article"></i>
              <span class="fs-md">一图识别英雄</span>
            </router-link>
          </div>
          <div class="skills">
            <div class="d-flex jc-around">
              <img
                :src="skill.icon"
                v-for="(skill, i) in model.skills"
                :key="i"
                class="icon mx-2"
                :class="{ active: currentSkillIndex === i }"
                @click="currentSkillIndex = i"
              />
            </div>
          </div>
          <div v-if="currentSkill">
            <div class="d-flex ai-center pt-4">
              <strong class="fs-xl text-dark-1">{{ currentSkill.name }}</strong>
              <span class="fs-sm text-grey-2 px-1"
                >(冷却值： {{ currentSkill.delay }} 消耗：
                {{ currentSkill.cost }})</span
              >
            </div>
            <div class="text-dark-1 fs-md py-3 border-bottom LH">
              {{ currentSkill.description }}
            </div>
            <div class="text-dark-1 fs-md py-3">{{ currentSkill.tips }}</div>
          </div>
        </div>
        <div class="equipment bd-lg-top bg-white">
          <m-card icon="news" title="出装推荐" plain>
            <div>
              <span class="text-dark-1 fs-lg">顺风出装</span>
              <div class="d-flex jc-around text-center border-bottom">
                <div v-for="item1 in model.items1" :key="item1._id">
                  <img :src="item1.icon" class="icon" />
                  <span class="fs-sm text-ellipsis">{{ item1.name }}</span>
                </div>
              </div>
            </div>
            <div class="pt-3">
              <span class="text-dark-1 fs-lg">逆风出装</span>
              <div class="d-flex jc-around text-center border-bottom">
                <div v-for="item2 in model.items2" :key="item2._id">
                  <img :src="item2.icon" class="icon" />
                  <span class="fs-sm text-ellipsis">{{ item2.name }}</span>
                </div>
              </div>
            </div>
          </m-card>
        </div>
        <div class="bd-lg-top bg-white">
          <m-card icon="news" title="使用技巧" plain>
            <div class="fs-md text-dark-1 LH">{{ model.usageTips }}</div>
          </m-card>
        </div>
        <div class="bd-lg-top bg-white">
          <m-card icon="news" title="对抗技巧" plain>
            <div class="fs-md text-dark-1 LH">{{ model.battleTips }}</div>
          </m-card>
        </div>
        <div class="bd-lg-top bg-white">
          <m-card icon="news" title="团战思路" plain>
            <div class="fs-md text-dark-1 LH">{{ model.teamTips }}</div>
          </m-card>
        </div>
        <div class="bd-lg-top bg-white partner">
          <m-card icon="news" title="英雄关系" plain>
            <div class="text-dark-1">
              <div class="fs-lg pb-3">最佳搭档</div>
              <div
                class="d-flex flex-1 pb-3"
                v-for="item in model.partner"
                :key="item._id"
              >
                <img :src="item.hero.avatar" class="avatar" />
                <div class="fs-md text-dark-1 LH">{{ item.description }}</div>
              </div>
            </div>
          </m-card>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: {
        name: "",
        title: "",
        banner: "",
        scores: [
          {
            difficult: { type: Number },
            skills: { type: Number },
            attack: { type: Number },
            survive: { type: Number }
          }
        ],
        items1: [],
        items2: [],
        categories: [],
        skills: []
      },
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.page-hero {
  .top {
    color: map-get($colors, "white");
    height: 191px;
    background: #fff no-repeat top center;
    background-size: 100% 100%;
    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      .badge {
        margin: 0 4px;
        display: inline-block;
        width: 13px;
        height: 13px;
        color: map-get($colors, "grey");
        text-align: center;
        font-size: 6px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.skills {
  .icon {
    width: 65px;
    height: 65px;
    border: 3px solid map-get($colors, "white");
    border-radius: 45%;
    &.active {
      border: 3px solid map-get($colors, "primary");
    }
  }
}
.equipment {
  .icon {
    width: 46.5px;
    height: 46.5px;
    border-radius: 50%;
    margin-top: 16px;
  }
}
.partner {
  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }
}
</style>
