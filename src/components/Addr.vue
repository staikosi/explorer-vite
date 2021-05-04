<template>
  <router-link v-if="link" :to="link" class="m-address-tag m-text-truncate">{{
    text
  }}</router-link>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  props: {
    address: String,
    link: String
  },
  computed: {
    text() {
      return this.address;
    }
  }
};
</script>
