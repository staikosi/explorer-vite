<template>
  <div class="uk-flex v-layout">
    <div id="offcanvas-overlay" uk-offcanvas="mode: push;">
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <slot name="left"></slot>
      </div>
    </div>
    <div class="uk-flex-1 uk-background-muted v-layout-main">
      <slot name="header"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="less">
.v-layout-main {
  overflow: overlay;
}
</style>
