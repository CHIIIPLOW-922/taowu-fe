import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(ElementUI)
new Vue({
  VueParticles,
  router,
  render: h => h(App),
}).$mount('#app')
