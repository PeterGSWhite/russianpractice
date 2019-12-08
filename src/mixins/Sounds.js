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
        nums:[22,3,32,12,1,1,0,65,87]
      }
    },
    methods: {
      test() {
        console.log(this.nums)
        if(this.nums.length) {
          let num = this.nums.pop()
          let i = this.playSound(this.numDir, num)//.then((token)=>{
          console.log('beep',i)
          
          if(i instanceof Promise) {
            console.log('baw')
            i.then((token)=>{
              console.log('daw', token)
              this.test()
            })
          }
          else if(typeof i !== "undefined"){
            this.test()
          }
          else{
            setTimeout(()=> {
              console.log('ska')
              this.test()
            }, 2000)
          }
          
        }
      },
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
        try {
          console.log('playhowl', path, s)
          var sound = new Howl({
            src: path,
            onloaderror: this.playTTS
          });
          sound.on('end', ()=> {
            return 1
          })
          sound.play();
        }
        catch {
          return 0
        }
      },
      playTTS(s) {
        console.log('playTTS', s)
        let rate = 1 + Math.random()/10 - Math.random()/10
        let pitch = 1 + Math.random()/15 - Math.random()/15
        console.log(rate, pitch)
        speech.setRate(rate)
        speech.setPitch(pitch)
        return speech.speak({
          text: String(s),
          queue: true,
        }).then(() => {
          console.log('tts done')
          return 1
        }).catch(e => {
          console.log("An error occurred :", e)
          return 0
        })
      }
    },
    
  }