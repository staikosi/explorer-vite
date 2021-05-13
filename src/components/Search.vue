<template>
  <div class="uk-flex v-search">
    <input
      type="text"
      class="uk-input"
      :placeholder="placeholder"
      v-model="input"
      v-on:keyup.enter="search"
    />
    <button
      type="button"
      class="uk-button-primary uk-margin-left"
      @click="search"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  },
  props: {
    placeholder: String
  },
  methods: {
    search() {
      this.$emit('search', this.input);
    }
  }
};
</script>

<style lang="less">
.v-search {
  max-width: 700px;

  button {
    width: 100px;
    cursor: pointer;
  }
}
</style>
