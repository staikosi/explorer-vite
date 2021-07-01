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

    <nav class="uk-padding uk-light" uk-navbar>
      <ul class="uk-nav">
        <li></li>
      </ul>
    </nav>
    <!-- This is the modal -->
    <div id="modal-example" uk-modal>
      <div class="uk-padding uk-modal-dialog uk-modal-body m-node-settings">
        <ul class="uk-list uk-list-striped">
          <li v-for="item in nodes" :key="item.url">
            <span
              v-if="item.selected"
              class="uk-label uk-label-success"
              style="width: 60px"
              >{{ item.net }}</span
            >
            <span
              v-else
              style="display: flex; width: 80px; justify-content: center"
              >{{ item.net }}</span
            >
            <b>{{ item.url }}</b>
            <div>
              <button
                @click="switchNode(item)"
                style="padding-right: 10px"
                uk-icon="check"
              ></button>
              <button @click="removeNode(item)" uk-icon="trash"></button>
            </div>
          </li>
          <li>
            <select
              class="uk-select m-left uk-form-small"
              v-model="vnode.net"
              style="width: 100px"
            >
              <option>Mainnet</option>
              <option>Buidl</option>
              <option>Custom</option>
            </select>
            <input
              class="uk-input m-left uk-form-small"
              style="width: 300px"
              v-model="vnode.url"
              @focus="focus"
            />

            <button @click="addNode" uk-icon="check"></button>
          </li>
        </ul>
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
      <a
        href="#modal-example"
        class="icon-social"
        style="top: 10px"
        uk-toggle
        >{{ node.net }}</a
      >
    </div>
  </div>
</template>

<script>
import UIkit from 'uikit';
import { mapMutations, mapState } from 'vuex';
import { SWITCH_NODE, ADD_NODE, REMOVE_NODE } from '@/store/mutations';

export default {
  data() {
    return {
      vnode: { net: 'Mainnet', url: '', selected: false },
      error: false
    };
  },
  computed: {
    ...mapState(['node']),
    ...mapState(['nodes'])
  },
  created() {},
  methods: {
    ...mapMutations([REMOVE_NODE, ADD_NODE, SWITCH_NODE]),
    focus() {
      this.error = false;
    },
    switchNode(vn) {
      this[SWITCH_NODE](vn);
    },
    removeNode(vn) {
      this[REMOVE_NODE](vn);
    },
    addNode() {
      const url = this.vnode.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        this[ADD_NODE](Object.assign({}, this.vnode));
        this.vnode.url = '';
      } else {
        UIkit.notification({
          message: 'Error url ' + url,
          status: 'warning',
          timeout: 300
        });
      }
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
.m-node-settings {
  width: 800px;
}
.m-node-settings > ul > ::before {
  content: none;
}
.m-node-settings > ul > li {
  display: flex;
  justify-content: space-between;
  content: none;
}
</style>
