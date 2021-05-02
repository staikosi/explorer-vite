<template>
  <div class="uk-flex v-layout">
    <slot name="left"></slot>
    <div class="uk-flex-1">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
.v-layout {
  height: 100%;
}
</style>
