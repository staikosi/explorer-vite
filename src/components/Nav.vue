<template>
  <div class="uk-background-secondary uk-width-medium m-nav">
    <div class="m-logo"></div>

    <nav class="uk-padding uk-light" uk-navbar>
      <ul class="uk-nav">
        <li>
          <router-link to="/">
            <span uk-icon="database" class="uk-margin-small-right"></span>
            Blocks
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
            Delegated Nodes
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

    <div class="uk-padding uk-padding-remove-vertical">
      <label for="node_input" class="uk-form-label uk-light">Vite RPC</label>
      <input
        id="node_input"
        class="uk-input"
        :class="{ 'uk-form-danger': error }"
        v-model="cnode"
        @focus="focus"
      />
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

    <div class="uk-padding uk-light m-social">
      <a
        class="icon-social"
        href="https://github.com/staikosi/explorer-vite"
        title="GitHub"
      >
        <span uk-icon="github" />
      </a>
      <a
        class="icon-social"
        href="https://twitter.com/viteview"
        title="Twitter"
      >
        <span uk-icon="twitter" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { SET_NODE, RESET_NODE } from '@/store/mutations';

export default {
  data() {
    return {
      cnode: '',
      error: false
    };
  },
  computed: {
    ...mapState(['node'])
  },
  created() {
    if (!this.cnode) {
      this.cnode = this.node;
    }
  },
  methods: {
    ...mapMutations([SET_NODE, RESET_NODE]),
    focus() {
      this.error = false;
    },
    save() {
      if (!this.cnode) {
        this.error = true;
        return;
      }
      console.log(this.cnode);
      this[SET_NODE](this.cnode);
    },
    reset() {
      this[RESET_NODE]();
      this.cnode = this.node;
    }
  }
};
</script>

<style lang="less">
@import '~@/styles/vars.less';

.m-nav {
  flex-shrink: 0;
  flex-grow: 0;
}

.m-logo {
  height: 50px;
  padding: 50px 0 0px 0;
  margin-top: 50px;
  background-image: url(../assets/logo.svg);
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
}

.m-social {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.icon-social {
  display: inline-block;
  width: 30px;
  height: 30px;

  & + & {
    margin-left: 20px;
  }

  .uk-icon {
    transform: scale(1.5);
  }
}
</style>
