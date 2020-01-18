// ToDo
// Prune out empty examples
// For first person past, don't know gender - needs some work
<template>
  <div class="grammar_practice">
    <v-container id="main" fluid>
      <v-layout 
      align-center justify-center column>
        <v-flex 
        xs12 class="elevation-1 pa-2"
        style="width: 500px">
          <h1>Grammar Practice</h1>
          <h4>Note: translations aren't perfect (they come from shows/movies and are often context bound)</h4>
          <v-btn
          @click="start"
          class="ma-1">
              Get New Word!
          </v-btn>
          <span v-if="example_start">
            <h2>Example Text</h2>
            <p>{{example_start}} <span :class="answerSpaceColor">{{answerPart}}</span> {{example_end}}</p>
            <p>{{example_english}}</p>
          </span>
          <span v-if="!answer && word_variation">
          <h2>Choices</h2>
          <v-btn 
          :key="i" 
          v-for="(w,i) in Object.keys(word_variations)"
          @click="submitAnswer(w)"
          class="elevation-1 pa-2 ma-1">
              {{w}}
          </v-btn>
          </span>
          <div v-if="answer">
              <h1>You were tested on: <span class="info">{{dict_word}}</span></h1>
              <h2 
              v-if="answer==word_variation">
              You got it right, well done!
              </h2>
              <h2 class="mt-2">Correct word form was:</h2>
              <h2><span class="success">{{word_variation}}</span></h2>
              <h3 :key="i" 
                v-for="(w,i) in word_variations[word_variation]">
                <span :key="p" v-for="p in w" class="ma-1">{{p}} </span>
                </h3>
              <span v-if="!(answer==word_variation)">
                <h2 class="mt-2">You chose</h2>
                <h2><span style="background-color: orangered">{{answer}}</span></h2>
                <h3 :key="i" 
                v-for="(w,i) in word_variations[answer]">
                <span :key="p" v-for="p in w" class="ma-1">{{p}} </span>
                </h3>
              </span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import wikt from '../../../testwords.js'
import pronouns from '../../../pronouns.js'
import wordrev from '../../../testexamples.js'
import pronounrev from '../../../testpronounsexamples.js'
var rev = Object.assign({}, wordrev, pronounrev);
export default {
    data() {
        return {
            dict_word: null,
            word_variations: {},
            word_variation: null,
            example_start: null,
            example_end: null,
            example_english: null,
            answer: false,
        }
    },
    computed: {
        wiktKeys() {
            return Object.keys(wikt)
        },
        pronounKeys() {
            return Object.keys(pronouns)
        },
        revSize() {
            return Object.keys(rev).length
        },
        answerPart() {
            if(this.answer) {
                return this.word_variation
            } else {
                return '_____'
            }
        },
        answerSpaceColor() {
            if(this.answer) {
                return 'success'
            } else {
                return ''
            }
        }
    },
    methods: {
        start() {
            this.dict_word = null
            this.word_variations = {}
            this.word_variation = null
            this.answer = false
            this.example_start = null
            this.example_end = null
            this.example_english = null
            this.getDictWord()
            this.getWordVariation()
            this.getExampleText()
        },
        submitAnswer(ans) {
            this.answer = ans
        },
        getDictWord() {
            if(Math.random() < 0.1) {
                this.dict_word = this.pronounKeys[Math.floor(Math.random() * this.pronounKeys.length)]
            } else {
                this.dict_word = this.wiktKeys[Math.floor(Math.random() * this.wiktKeys.length)]
            }
        },
        getWordVariations(tags) {
            console.log(tags)
            let o = wikt
            tags.forEach(t => {
                console.log(t)
                o = o[t]
            });
            if(typeof(o) == "string") {
                if(!(o in this.word_variations)) {
                    this.word_variations[o] = []
                }
                this.word_variations[o].push(tags.slice(2))
                console.log(this.word_variations)
            }
            else {
                Object.keys(o).forEach(t => {
                    tags.push(t)
                    this.getWordVariations(tags)
                    tags.pop()
                })
            }
        },
        getWordVariation() {
            // this.word_variation = this.getWordVariationAndPath(wikt[this.dict_word], 'td')
            this.getWordVariations([this.dict_word, 'td'])
            let keys = Object.keys(this.word_variations)
            this.word_variation = keys[Math.floor(Math.random() * keys.length)]
        },
        getExampleText() {
            console.log('kf', this.word_variation)
            let sentences = rev[this.word_variation]
            console.log(sentences)
            let sentence = sentences[Math.floor(Math.random()*sentences.length)]
            console.log(sentence)
            this.example_start = sentence[0]
            this.example_end = sentence[1]
            this.example_english = sentence[2]
        }
    }
}
</script>
