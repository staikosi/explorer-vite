<template>
  <v-layout>
    <v-nav slot="left"></v-nav>
    <router-view slot="right"></router-view>
  </v-layout>
</template>

<script>
import VLayout from './components/Layout';
import VNav from './components/Nav';

export default {
  name: 'App',

  components: {
    VLayout,
    VNav
  },

  data: () => ({
    //
  })
};
</script>
