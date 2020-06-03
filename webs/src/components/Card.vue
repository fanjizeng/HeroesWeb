<template>
  <div class="card px-3">
    <div
      class="card-head py-3 d-flex ai-center"
      :class="{ 'border-bottom': !plain }"
    >
      <i class="iconfont" :class="`icon-${icon}`" style="font-size: 20px"></i>
      <span class="flex-1 px-2">{{ title }}</span>
      <strong
        class="iconfont icon-ellipsis"
        v-if="!plain"
        style="font-size: 20px"
      ></strong>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean }
  }
};
</script>

<style lang="scss"></style>
