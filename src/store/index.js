import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // data
    products: []
  },
  getters: {
    // computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  actions: {
    // same as method, call API
    fetchProducts({ commit }) {
      // make a call
      // run setProducts mutation
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
    // addToCart(context, product) {
    //   if(product.inventory > 0) {
    //     context.commit('pushProductToCart', product)
    //   } else {
    //     // show out of stock message
    //   }
    // }
  },
  mutations: {
    // setting or update state
    setProducts(state, products) {
      // update products
      state.products = products;
    }
  }
});
