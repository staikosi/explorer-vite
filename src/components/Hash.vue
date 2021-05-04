<template>
  <router-link v-if="link" :to="link" class="m-hash-tag m-text-truncate">{{
    text
  }}</router-link>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  props: {
    hash: String,
    link: String,
    short: Boolean
  },
  computed: {
    text() {
      if (this.short) {
        return this.hash.slice(0, 6) + '...' + this.hash.slice(-6);
      }
      return this.hash;
    }
  }
};
</script>
