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
        <v-row
        class="mb-6"
        >
      <v-col>
        <v-btn @click="submitAnswer(choiceAs)">{{choiceAs[answerIndex]}}</v-btn>
      </v-col>
      <v-col>
        <v-btn @click="submitAnswer(choiceBs)">{{choiceBs[answerIndex]}}</v-btn>
      </v-col>
      <v-col>
        <v-btn @click="submitAnswer(choiceCs)">{{choiceCs[answerIndex]}}</v-btn>
      </v-col>
      <v-col>
        <v-btn @click="submitAnswer(choiceDs)">{{choiceDs[answerIndex]}}</v-btn>
      </v-col>
    </v-row>
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
      correctAnswers: [],
      choiceAs: [],
      choiceBs: [],
      choiceCs: [],
      choiceDs: [],
      givenAnswers: [],
      roundIndex: 1,
    }
  },
  computed: {
    sleepTime() {
      return 300*(~~(5/this.difficulty))
    },
    answerIndex() {
      return this.rounds - this.roundIndex
    }
  },
  methods: {
    submitAnswer(choiceList) {
      let answer = choiceList[this.answerIndex]
      this.givenAnswers.unshift(answer)
      this.roundIndex += 1
      console.log(this.givenAnswers)
      console.log(this.correctAnswers)
    },
    reset(){
      this.correctAnswers = []
      this.choiceAs = []
      this.choiceBs = []
      this.choiceCs = []
      this.choiceDs = []
      this.givenAnswers = []
      this.roundIndex = 1
    },
    enqueueAndPlay() {
      this.playGongSound()
      setTimeout(this.reset(), 5000)
      for(let i = 0; i<this.rounds; i++) {
        let num = this.randomRange(this.start,this.end+1)
        this.queue.push(num)
        this.addRound(num)
      }
      this.playAll(this.sleepTime)
    },
    addRound(num) {
      this.correctAnswers.push(num)
      let choice = this.randomRange(0,4)
      if(choice == 0) {
        this.choiceAs.push(num)
        this.makeOtherChoices(num, this.choiceBs, this.choiceCs, this.choiceDs)
      } else if(choice == 1) {
        this.choiceBs.push(num)
        this.makeOtherChoices(num, this.choiceCs, this.choiceDs, this.choiceAs)
      } else if(choice == 2) {
        this.choiceCs.push(num)
        this.makeOtherChoices(num, this.choiceDs, this.choiceAs, this.choiceBs)
      } else if(choice == 3) {
        this.choiceDs.push(num)
        this.makeOtherChoices(num, this.choiceAs, this.choiceBs, this.choiceCs)
      }
    },
    makeOtherChoices(num, x, y, z) {
      let numerals = String(num).split('')
      let answers = []
      // Get legit permutations
      let permutator = this.permute(numerals.slice())
      let perm = permutator.next()
      while(!perm.done) {
        answers.push(perm.value)
        perm = permutator.next()
      }
      // If not enough answers, start mutating permutations
      let alreadyMutated = new Set()
      answers.push(numerals)
      while(answers.length < 4) {
        let i = this.randomRange(0, answers.length)
        if(!alreadyMutated.has(i)){
          alreadyMutated.add(i)
          if(alreadyMutated.length > 2 || alreadyMutated.length >= answers.length) {
            alreadyMutated = new Set()
          }
          answers.push(this.mutatePerm(answers[i]))
        }
      }
      // Get rid of actual answer from answer list
      let answeri = answers.indexOf(numerals);
      answers.splice(answeri, 1);
      // Add answers to choices lists
      x.push(this.formatFakeAnswer(answers))
      y.push(this.formatFakeAnswer(answers))
      z.push(this.formatFakeAnswer(answers))
    },
    formatFakeAnswer(a) {
      let s = a.splice(this.randomRange[0,a.length],1)[0].join('')
      if(s.length==1) {
        return s
      }
      let z = s[0]
      while(z == '0') {
        s = s.slice(1)
        if(s.length==1) {
          return s
        }
        z = s[0]
      }
      return s
    },
    mutatePerm(perm) {
      let i = this.randomRange(0, perm.length)
      let n = perm[i]
      let m = null
      if(n < 2 || (n < 7 && Math.random()>0.5)) {
        m = this.randomRange(n,9)
      } else {
        m = this.randomRange(0,n)
      }
      let mutated = perm.slice()
      mutated[i] = m
      return mutated
    },
    randomRange(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num
    },
    *permute(permutation) {
      var length = permutation.length,
      c = Array(length).fill(0),
      i = 1, k, p;
      let prev = new Set()
      prev.add(permutation.join(''))

      while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        let n = permutation.slice();
        let s = n.join('')
        if(!prev.has(s)) {
          prev.add(s)
          yield n
        } 
        
      } else {
        c[i] = 0;
        ++i;
      }
  }
}
  },
  mixins: [Sounds],
}
</script>
