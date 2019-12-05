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
        num: "42",
        numDir: 'sound/forvo/numbers/',
      }
    },
    methods: {
      playSound(dir, s) {
        console.log('playsound', dir, s)
        try {
          let path = dir + s + '.mp3'
          require('../../public/'+path)
          this.playHowl(path, s)
        } catch {
          this.playTTS(s)
        }    
      },
      playHowl(path, s) {
        console.log('playhowl', path, s)
        var sound = new Howl({
          src: path,
          onloaderror: function() {
            speech.speak({
              text: s,
            }).then(() => {
              console.log('tts done')
            }).catch(e => {
              console.log("An error occurred :", e)
            })
          },
        });
        sound.play(); 
      },
      playTTS(s) {
        console.log('playTTS')
        let rate = 1 + Math.random()/10 - Math.random()/10
        let pitch = 1 + Math.random()/15 - Math.random()/15
        console.log(rate, pitch)
        speech.setRate(rate)
        speech.setPitch(pitch)
        speech.speak({
          text: s,
        }).then(() => {
          console.log('tts done')
        }).catch(e => {
          console.log("An error occurred :", e)
        })
      }
    },
    
  }