<template>
  <router-link v-if="link" :to="link">{{ short }}</router-link>
  <span v-else>{{ short }}</span>
</template>

<script>
export default {
  props: {
    hash: String,
    link: String
  },
  computed: {
    short() {
      return this.hash.slice(0, 6) + '...' + this.hash.slice(-6);
    }
  }
};
</script>

<style lang="scss"></style>
