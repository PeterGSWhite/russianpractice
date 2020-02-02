// ToDo
// For first person past, don't know gender - needs some work
<template>
  <div class="grammar_type">
    <v-container id="main" fluid>
      <v-layout 
      align-center justify-center column>
        <v-flex 
        xs12 class="elevation-1 pa-2"
        style="width: 500px">
          <h1>Grammar Practice</h1>
          <v-btn
          @click="start"
          class="ma-1">
              Get New Word!
          </v-btn>
          <span v-if="dict_word"><h3>Nominative form is</h3>
          <h4><span class="mb-3 info">{{dict_word}}</span></h4>
          <h3>Type the case which corresponds to:</h3>
          <h4 :key="i" 
                v-for="(w,i) in word_variations[word_variation]">
                <span :key="p" v-for="p in w" class="ma-1">{{p}} </span>
            </h4>
        <div v-if="!answer">
            <!-- <v-btn 
          :key="i" 
          v-for="(w,i) in Object.keys(word_variations)"
          @click="submitAnswer(w)"
          class="elevation-1 pa-2 ma-1">
              {{w}}
          </v-btn> -->
          <v-text-field
          v-model="stagingAnswer"
          :label="dict_word"
        ></v-text-field>
        <v-btn @click="submitAnswer(stagingAnswer)">Submit</v-btn>
        </div>
        </span>
        <div v-if="answer">
            <span v-if="answer !== word_variation">
                <h3>You chose:</h3>
                <h4><span style="background-color: orangered">{{answer}}</span></h4>
            </span>
            <h3 v-if="answer == word_variation">Congrats - you got it!</h3>
            <h3>The answer was:</h3>
            <h4><span class="success">{{word_variation}}</span></h4>
        </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import wikt from '../../../testwords.js'
import pronouns from '../../../pronouns.js'
// import wordrev from '../../../testexamples.js'
// import Sounds from '../../../mixins/Sounds.js'
// var rev = Object.assign({}, wordrev, pronounrev, revpatch);
export default {
    data() {
        return {
            dict_word: null,
            word_variations: {},
            word_variation: null,
            stagingAnswer:null,
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
    },
    methods: {
        start() {
            this.dict_word = null
            this.dictchoice = null
            this.word_variations = {}
            this.word_variation = null
            this.answer = false
            this.stagingAnswer = null
            this.getDictWord()
            this.getWordVariation()
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
        },
    },
}
</script>
