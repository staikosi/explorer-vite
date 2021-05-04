<template>
  <router-link v-if="link" :to="link" class="m-token-tag m-text-truncate">{{
    text
  }}</router-link>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  props: {
    token: String,
    link: String,
  },
  computed: {
    text() {
      return this.token;
    },
  },
};
</script>
