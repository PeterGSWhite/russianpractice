<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Made by Peter White - petergswhite@gmail.com</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
