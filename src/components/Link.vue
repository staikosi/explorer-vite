<template>
  <router-link
    :to="prefix + value"
    class="m-hash-tag m-text-truncate"
    :alt="value"
    :uk-tooltip="value"
  >
    {{ value }}
  </router-link>
</template>

<script>
export default {
  props: {
    value: String,
    prefix: String
  }
};
</script>
