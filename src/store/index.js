import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // data
    products: []
  },
  getters: { // computed properties
    productsCount() {
      // ...
    }
  },
  actions: { // same as method, call API
    fetchProducts() {
      // make a call
      // run setProducts mutation
    }
  },
  mutations: { // setting or update state
    setProducts(state, products) {
      // update products
      state.products = products
    }
  }
})
