const {Howl} = require('howler');
import Speech from 'speak-tts'
const speech = new Speech() 
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
    // The "data" object contains the list of available voices and the voice synthesis params
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.log("An error occured while initializing : ", e)
})
export default {
  
    data () {
      return {
        numDir: 'sound/forvo/numbers/',
        queue:[5,4,'How are you today mr bonobo?',2, 'who goes there mr mr mr booooy',1,0, 'It is friday night and I feel good'],
        howling: 0,
        s: null
      }
    },
    methods: {
      playAll() {
        console.log(this.queue)
        if(this.queue.length) {
          let utterance = this.queue.pop()
          let i = this.playSound(this.numDir, utterance)
          if(i instanceof Promise) {
            i.then(()=>{
              this.playAll()
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
          let path = dir + this.s + '.mp3'
          require('../../public/'+path)
          return this.playHowl(path)
        } catch {
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
            }
          }
        })
        // }).then(() => {
        //   console.log('tts done')
        //   return 1
        // }).catch(e => {
        //   console.log("An error occurred :", e)
        //   return 0
        // })
      }
    },
    
  }