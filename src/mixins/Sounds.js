const {Howl} = require('howler');
import Speech from 'speak-tts'
const speech = new Speech() 
import paths from '@/paths'
speech.init({
  'lang': 'ru-RU',
  'voice':'Google русский',
  'splitSentences': true,
  
  'listeners': {
      'onvoiceschanged': (voices) => {
          console.log("Event voiceschanged", voices)
      }
  }
}).then((data) => {
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.log("An error occured while initializing : ", e)
})
export default {
  
    data () {
      return {
        numDir: 'sound/numbers/',
        queue:[],
        howling: 0,
        s: null
      }
    },
    
    methods: {
      playAll(sleepTime) {
        console.log(this.queue, this.sleepTime)
        if(this.queue.length) {
          let utterance = this.queue.pop()
          let i = this.playSound(this.numDir, utterance)
          if(i instanceof Promise) {
            i.then(()=>{
              setTimeout(() => {
                this.playAll(sleepTime)
              }, this.sleepTime);
            })
          }
        }
      },
      ensureNotHowling() {
        let _this = this
        return new Promise(function (resolve) {
            (function waitForFoo(){
                if (!_this.howling) return resolve();
                setTimeout(waitForFoo, 30);
            })();
        });
      },
      playSound(dir,s) {
        this.s = s
        console.log('playsound', dir, this.s)
        try {
          // Get to directory with relevant sounds
          let subDir = dir + this.s +'/' + this.s + '_'
          let numOptions = paths['numbers'][this.s]
          // If there are no sound files just playTTS
          if(numOptions==0) {
            return this.playTTS()
          }
          // Pick a random file
          let ver = Math.floor(Math.random() * numOptions);
          let path = subDir + ver + '.mp3'
          require('../../public/'+path)
          return this.playHowl(path)
        } catch {
          // If there is an error loading an mp3, just playTTS
          return this.playTTS()
        }    
      },
      playHowl(path) {
        console.log('playhowl', path)
        this.howling = 1
        var sound = new Howl({
          src: path,
          onloaderror: () => {
            return this.playTTS()},
          onend: () => {
            console.log('howler onend')
            this.howling = 0
          }
        });
        sound.play();
        return this.ensureNotHowling(this.howling)
      },
      playTTS() {
        console.log('playTTS', this.s)
        let rate = 1 + Math.random()/10 - Math.random()/10
        let pitch = 1 + Math.random()/15 - Math.random()/15
        console.log(rate, pitch)
        speech.setRate(rate)
        speech.setPitch(pitch)
        return speech.speak({
          text: String(this.s),
          queue: true,
          listeners: {
            onend: () => {
              console.log("End utterance")
              this.howling = 0
            }
          }
        })
      }
    },
    
  }