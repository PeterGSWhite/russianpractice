<template>
  <div class="grammar_practice">
    <v-container id="main" fluid>
      <v-layout 
      align-center justify-center column>
        <v-flex 
        xs12 class="elevation-1 pa-2 ma-1"
        style="width: 500px">
          <h1>Grammar Practice</h1>
          <p>{{dict_word}}</p>
          <v-btn
          @click="getDictWord">
              get dict word
          </v-btn>
          <p>{{example_start}}{{word_variation}}{{example_end}}</p>
          <p>{{example_english}}</p>
          <v-btn
          @click="getWordVariation">
              get variation
          </v-btn>
          <v-btn
          @click="getExampleText">
              get example text
          </v-btn>
          <p></p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import wikt from '../../../test_wikt.js'
import rev from '../../../test_reverso.js'
export default {
    data() {
        return {
            dict_word: null,
            word_variation: null,
            example_start: null,
            example_end: null,
            example_english: null
        }
    },
    computed: {
        wiktKeys() {
            return Object.keys(wikt)
        },
        revSize() {
            return Object.keys(rev).length
        },
    },
    methods: {
        getDictWord() {
            this.dict_word = this.wiktKeys[Math.floor(Math.random() * this.wiktKeys.length)]
        },
        getWordVariationAndPath(o, k) {
            console.log('oioi', k, o)
            let val = o[k]
            if(typeof(val) == "string") {
                return [k, val]
            } else {
                let keys = Object.keys(val)
                let new_k = keys[Math.floor(Math.random() * keys.length)]
                if(!k=='td') {
                    return [k, this.getWordVariationAndPath(val, new_k)].flat()
                }
                else {
                    return [this.getWordVariationAndPath(val, new_k)].flat()
                }
                
            }
        },
        getWordVariation() {
            this.word_variation = this.getWordVariationAndPath(wikt[this.dict_word], 'td')
        },
        getExampleText() {
            let sentences = rev[this.word_variation[this.word_variation.length-1]]
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
