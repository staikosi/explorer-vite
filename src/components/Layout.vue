<template>
  <div class="uk-flex v-layout">
    <slot name="left"></slot>
    <div class="uk-flex-1 uk-background-muted">
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
