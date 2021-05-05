<template>
  <div>
    <ul class="uk-pagination uk-flex-right" uk-margin>
      <li :class="current === 1 ? 'uk-disabled' : ''" @click="prev">
        <span uk-pagination-previous style="line-height: 20px"></span>
      </li>
      <li v-if="pages[0] > 1" @click="select(1)"><span>1</span></li>
      <li v-if="pages[0] > 1" class="uk-disabled" style="line-height: 14px">
        <span>...</span>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        :class="[page === current ? 'uk-active' : '']"
        @click="select(page)"
      >
        <span>{{ page }}</span>
      </li>
      <li
        v-if="pageNum > last + 1"
        class="uk-disabled"
        style="line-height: 14px"
      >
        <span>...</span>
      </li>
      <li v-if="pageNum > last + 1" @click="select(pageNum - 1)">
        <span>{{ pageNum - 1 }}</span>
      </li>
      <li v-if="pageNum > last" @click="select(pageNum)">
        <span>{{ pageNum }}</span>
      </li>
      <li :class="current === pageNum ? 'uk-disabled' : ''" @click="next">
        <span uk-pagination-next style="line-height: 20px"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { log } from '@/utils/log';

export default {
  data() {
    return {
      current: 1
    };
  },
  props: {
    pageNum: Number
  },
  computed: {
    pages() {
      const list = [];
      let i = 5;
      while (list.length < 10) {
        const page = this.current - i;
        // console.log(`page`, page, this.pageNum);
        if (page > this.pageNum) {
          return list;
        }

        if (page > 0) {
          list.push(page);
        }
        i--;
      }
      return list;
    },
    last() {
      return this.pages[this.pages.length - 1];
    }
  },
  methods: {
    prev() {
      log('prev');
      if (this.current === 1) {
        return;
      }
      this.current--;
      this.$emit('select', this.current);
    },
    next() {
      log('next');
      if (this.current === this.pageNum) {
        return;
      }
      this.current++;
      this.$emit('select', this.current);
    },
    select(page) {
      // log('page', page);
      this.current = page;
      this.$emit('select', this.current);
    }
  },
  mounted() {
    log(`pageNum ${this.pageNum}, last ${this.last}`);
  }
};
</script>

<style lang="less">
.uk-pagination > li {
  cursor: pointer;
}
</style>
