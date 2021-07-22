<template>
  <div style="display: flex">
    <router-link
      :to="prefix + value"
      :class="cls"
      ref="text"
      :title="value"
      :uk-tooltip="value"
    >
      {{ text }}
    </router-link>
    <button
      class="js-clipboard"
      v-if="value && showCopy"
      uk-icon="copy"
      uk-tooltip="copy"
      :data-clipboard-text="value"
      style="width: 14px; height: 14px; padding-top: 7px; padding-left: 3px"
    ></button>
  </div>
</template>

<script>
import { isHash, isAddress, isTti } from '@/utils/vite';
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
    },
    showCopy() {
      return isHash(this.value) || isTti(this.value) || isAddress(this.value);
    }
  }
};
</script>
