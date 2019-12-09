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
          <input v-model.number="start" type="number" min=0 max=999999999><br>
          <h2>Highest number</h2><br>
          <input v-model.number="end" type="number" max=1000000000 :min=Number(start)+1 ><br>
          <v-slider v-model="difficulty" thumb-label min="1" max="5" label="Difficulty"></v-slider>
          <v-slider v-model="rounds" thumb-label min="5" max="10" label="Rounds"></v-slider>
          <v-btn v-if="!queue.length"  @click="enqueueAndPlay()">Play</v-btn>
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
      difficulty: 1,
      start: 0,
      end: 10,
      rounds: 5,
      answers: []
    }
  },
  computed: {
    sleepTime() {
      return 500*(~~(4/this.difficulty))
    }
  },
  methods: {
    enqueueAndPlay() {
      console.log(this.sleepTime)

      console.log(this.start, this.end, typeof(this.end))
      for(let i = 0; i<this.rounds; i++) {
        let num = this.randomRange(this.start,this.end+1)
        this.queue.push(num)
        this.answers.push(num)
      }
      this.playAll(this.sleepTime)
    },
    randomRange(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    console.log(min, max, num)
    return num
    },
    
  },
  mixins: [Sounds],
}
</script>
