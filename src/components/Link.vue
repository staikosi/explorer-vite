<template>
  <router-link
    :to="prefix + value"
    :class="cls"
    :title="value"
    :uk-tooltip="value"
  >
    {{ text }}
  </router-link>
</template>

<script>
export default {
  props: {
    value: String,
    full: Boolean,
    prefix: String
  },
  computed: {
    text() {
      // if (this.value && this.value.length > 16) {
      //   return this.value.slice(0, 8) + '...' + this.value.slice(-8);
      // } else {

      // }
      return this.value;
    },
    cls() {
      if (!this.full) {
        return 'm-hash-tag m-text-truncate';
      }
      return '';
    }
  }
};
</script>
