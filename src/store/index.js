import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // data
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {
    // computed properties
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        )
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    },

    productIsInStock() {
      return product => {
        return product.inventory > 0
      }
    }
  },
  actions: {
    // same as method, call API
    fetchProducts({ commit }) {
      // make a call
      // run setProducts mutation
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },
    // addToCart(context, product) {
    //   if(product.inventory > 0) {
    //     context.commit('pushProductToCart', product)
    //   } else {
    //     // show out of stock message
    //   }
    // }
    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          //push product to cart
          commit('pushProductToCart', product.id)
        } else {
          // increment item quantity
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },

    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },
  mutations: {
    // setting or update state
    setProducts(state, products) {
      // update products
      state.products = products
    },

    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory(state, product) {
      product.inventory--
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },

    emptyCart(state) {
      state.cart = []
    }
  }
})
