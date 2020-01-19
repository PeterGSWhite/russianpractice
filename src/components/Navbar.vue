<template>
  <v-card flat>
    <v-container fluid>
      <v-row class="child-flex">
        <div>
          <router-link to="/">
          <v-toolbar :dark="$route.name!=='NumberPractice'">
            <h1>Test Numbers</h1>
          </v-toolbar>
        </router-link>
        </div>

        <div style="flex-basis: 20%">
        <router-link to="/grammar">
          <v-toolbar :dark="$route.name!=='GrammarPractice'">
            <h1>Test Grammar</h1>
          </v-toolbar>
        </router-link>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>