import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(ElementUI)

Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});



new Vue({
  VueParticles,
  router,
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
  },
  el: '#app',
  components: { App },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app')
