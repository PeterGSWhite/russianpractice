<template>
  <div class="one_to_ten">
     
    <h1>One to Ten Practice</h1>
    <input v-model="num">
    <v-btn @click="playSound(numDir,num)">Play {{num}}</v-btn>
    
  </div>
</template>

<script>
import Sounds from '../../../mixins/Sounds.js'
export default {
  
  data () {
    return {
    }
  },
  methods: {
    
  },
  mixins: [Sounds],
}
</script>