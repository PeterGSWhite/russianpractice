// ToDo
// уметь иметь болеть - Don't have examples for some reason...
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
          <h4>Note: Right now, translations aren't always perfect and sometimes multiple answers are correct but only 1 is accepted</h4>
          <v-btn
          @click="start"
          class="ma-1">
              Get New Word!
          </v-btn>
          <span v-if="example_english">
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
              <h1>You were tested on: <span @click="playVariation(dict_word)" class="info" style="white-space: nowrap">{{dict_word}}🔊</span></h1>
              <h2 
              v-if="answer==word_variation">
              You got it right, well done!
              </h2>
              <h2 class="mt-2">Correct word form was:</h2>
              <h2><span @click="playVariation(word_variation)" class="success">{{word_variation}} 🔊</span></h2>
              <h3 :key="i" 
                v-for="(w,i) in word_variations[word_variation]">
                <span :key="p" v-for="p in w" class="ma-1">{{p}} </span>
                </h3>
             <span v-if="!(answer==word_variation)">
                <h2 class="mt-2">You chose</h2>
                <h2><span @click="playVariation(answer)" style="background-color: orangered">{{answer}} 🔊</span></h2>
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
import Sounds from '../../../mixins/Sounds.js'
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
            dictchoice: false,
        }
    },
    computed: {
        wiktKeys() {
            return Object.keys(wikt)
        },
        pronounKeys() {
            return Object.keys(pronouns)
        },
        revKeys() {
            return Object.keys(rev)
        },
        revSize() {
            return this.revKeys.length
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
            this.dictchoice = null
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
                this.dictchoice = 'pronouns'
                this.dict_word = this.pronounKeys[Math.floor(Math.random() * this.pronounKeys.length)]
            } else {
                this.dictchoice = 'wikt'
                this.dict_word = this.wiktKeys[Math.floor(Math.random() * this.wiktKeys.length)]
            }
        },
        getWordVariations(tags) {
            console.log(tags)
            let o = null
            if(this.dictchoice == 'wikt') {
                o = wikt
            }
            else {
                o = pronouns
            }
            tags.forEach(t => {
                o = o[t]
            });
            if(typeof(o) == "string") {
                if(!(o in this.word_variations)) {
                    this.word_variations[o] = []
                }
                this.word_variations[o].push(tags.slice(2))
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
            let i = 0
            while( i < 5 && (!rev[this.word_variation] || !(rev[this.word_variation].length))) {
                i+=1
                console.log(i, rev[this.word_variation])
                this.word_variation = null
                this.word_variations = {}
                this.getWordVariations([this.dict_word, 'td'])
                let keys = Object.keys(this.word_variations)
                this.word_variation = keys[Math.floor(Math.random() * keys.length)]
                console.log(this.word_variation)
            }
            if(i==5){
                console.log('bo')
                this.start()
            }
        },
        getExampleText() {
            let sentences = rev[this.word_variation]
            console.log(sentences)
            let sentence = sentences[Math.floor(Math.random()*sentences.length)]
            this.example_start = sentence[0]
            this.example_end = sentence[1]
            this.example_english = sentence[2]
        },
        playVariation(word) {
            this.s = word
            this.playTTS()
        }
    },
    mixins: [Sounds],
}
</script>
