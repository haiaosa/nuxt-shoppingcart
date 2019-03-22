import Vue from "vue"
import App from "./App"
import store from "@/store/index"
import { currency } from "@/currency"

// Buefy
import Buefy from "buefy"
import "buefy/dist/buefy.css"

// Vuetify
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

// material-design-icons-iconfont
import iconfont from "material-design-icons-iconfont"

Vue.config.productionTip = false
Vue.filter("currency", currency)
Vue.use(Buefy)
Vue.use(Vuetify)
// Vue.use(iconfont) // ko hieu tai sao ko can lenh nay van dung dc iconfont = =!

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: h => h(App)
})
