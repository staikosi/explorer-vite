<template>
  <v-layout>
    <v-nav slot="left"></v-nav>
    <v-header slot="header"></v-header>
    <router-view slot="right"></router-view>
  </v-layout>
</template>

<script>
import VLayout from './components/Layout';
import VNav from './components/Nav';
import VHeader from './components/Header';

export default {
  name: 'App',

  components: {
    VLayout,
    VNav,
    VHeader
  },

  data: () => ({
    //
  })
};
</script>
