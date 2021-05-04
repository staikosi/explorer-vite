<template>
  <div class="uk-background-secondary uk-width-medium">
    <div style="height: 100px">logo</div>
    <div class="uk-padding uk-padding-remove-vertical">
      <label for="node_input" class="uk-form-label uk-light">Vite Node</label>
      <input id="node_input" class="uk-input" v-model="cnode" />
      <div class="uk-flex uk-flex-between uk-margin-small-top">
        <button
          type="button"
          class="uk-button uk-button-primary uk-button-small"
          @click="save"
        >
          Save
        </button>
        <button type="button" class="uk-button uk-button-small" @click="reset">
          Reset
        </button>
      </div>
    </div>
    <nav class="uk-padding uk-light" uk-navbar>
      <!-- <div>
      <img alt="logo" />
    </div> -->
      <ul class="uk-nav">
        <li>
          <router-link to="/">
            <span uk-icon="database" class="uk-margin-small-right"></span>
            Data
          </router-link>
        </li>
        <li>
          <router-link to="/accounts">
            <span uk-icon="users" class="uk-margin-small-right"></span>
            Account Info
          </router-link>
        </li>
        <li>
          <router-link to="/sbps">
            <span uk-icon="social" class="uk-margin-small-right"></span>
            Super Nodes
          </router-link>
        </li>
        <li>
          <router-link to="/tokens">
            <span uk-icon="thumbnails" class="uk-margin-small-right"></span>
            Tokens
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { SET_NODE, RESET_NODE } from "@/store/mutations";

export default {
  data() {
    return {
      cnode: "",
    };
  },
  computed: {
    ...mapState(["node"]),
  },
  created() {
    if (!this.cnode) {
      this.cnode = this.node;
    }
  },
  methods: {
    ...mapMutations([SET_NODE]),
    save() {
      if (!this.cnode) {
        return;
      }
      this[SET_NODE](this.cnode);
    },
    reset() {
      this[RESET_NODE]();
    },
  },
};
</script>

<style lang="less">
@import "~@/styles/vars.less";
</style>
