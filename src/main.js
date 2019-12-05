import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import howler from 'howler';
import speaktts from 'speak-tts'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  howler,
  speaktts,
  render: h => h(App)
}).$mount('#app')
