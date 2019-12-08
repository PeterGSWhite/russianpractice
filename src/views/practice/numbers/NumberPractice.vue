<template>
  <div class="number_practice">
    <v-container id="main" fluid>
      <v-layout 
      align-center justify-center column>
        <v-flex 
        xs12 class="elevation-1 pa-2 ma-1"
        style="width: 500px">
          <h1>Number Practice</h1>
          <h2>Lowest number</h2><br>
          <input v-model="start" min="0" max="999999999"><br>
          <h2>Highest number</h2><br>
          <input v-model="end" max="1000000000" :min="start+1"><br>
          <v-slider v-model="speed" min="1" max="5" label="Speed"></v-slider>
          <v-btn  @click="test(numDir)">Play {{num}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>   
  </div>
</template>

<script>
import Sounds from '../../../mixins/Sounds.js'
export default {
  
  data () {
    return {
      speed: 1,
      start: 0,
      end: 10,
      num: 78
    }
  },
  methods: {
    
  },
  mixins: [Sounds],
}
</script>
