<template>
  <v-card flat>
    <v-container fluid>
      <v-row class="child-flex">
        <div>
          <router-link to="/">
          <v-toolbar :dark="$route.name!=='NumberPractice'">
            <h3>Numbers</h3>
          </v-toolbar>
        </router-link>
        </div>

        <div style="flex-basis: 20%">
        <router-link to="/grammar">
        <!-- DONT FORGET TO UPDATE BOTH OR DO SOMETHING CLEVER -->
          <v-toolbar :dark="!(['GrammarPractice', 'GrammarType', 'VerbAspect'].includes($route.name))">
            <h3>Grammar</h3>
          </v-toolbar>
        </router-link>
        </div>
      </v-row>
      <!-- DONT FORGET TO UPDATE BOTH OR DO SOMETHING CLEVER -->
      <v-row class="child-flex mt-3" v-if="['GrammarPractice', 'GrammarType', 'VerbAspect'].includes($route.name)">
        <div>
          <router-link to="/grammar">
          <v-toolbar :dark="$route.name!=='GrammarPractice'">
            <h3>Gap Fill</h3>
          </v-toolbar>
        </router-link>
        </div>
        <div>
          <router-link to="/grammartype">
          <v-toolbar :dark="$route.name!=='GrammarType'">
            <h3>Recall</h3>
          </v-toolbar>
        </router-link>
        </div>
        <div>
          <router-link to="/verbaspect">
          <v-toolbar :dark="$route.name!=='VerbAspect'">
            <h3>Verb Aspect</h3>
          </v-toolbar>
        </router-link>
        </div>

      </v-row>
    </v-container>
  </v-card>
</template>