import { createStore } from 'vuex';
import productsData from '@/data/products';
import categoriesData from '@/data/categories';

export default createStore({
  state: {
    products: [],
    categories: [],
    cart: [],
    loading: false,
    error: null,
    wishlist: [],
    filters: {
      category: null,
      priceRange: [0, 1000],
      sortBy: 'featured',
    },
  },
  getters: {
    allProducts: state => state.products,

    productById: state => id => {
      return state.products.find(product => product.id === parseInt(id));
    },

    featuredProducts: state => {
      return state.products.filter(product => product.featured);
    },

    newArrivals: state => {
      return state.products.filter(product => product.isNew);
    },

    saleProducts: state => {
      return state.products.filter(product => product.onSale);
    },

    productsByCategory: state => categorySlug => {
      const category = state.categories.find(cat => cat.slug === categorySlug);
      let products = category
        ? state.products.filter(product => product.categoryId === category.id)
        : [];
    
      if (categorySlug === 'sale') {
        products = products.filter(product => product.onSale);
      }
    
      return products;
    },

    allCategories: state => state.categories,

    cartItems: state => state.cart,

    cartWithProducts: state => {
      return state.cart.map(item => {
        const product = state.products.find(p => p.id === item.productId);
        return {
          id: item.productId,
          product: product || {},
          quantity: item.quantity,
          variant: item.variantId
            ? product?.variants?.find(v => v.id === item.variantId) || null
            : null,
        };
      });
    },

    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        const price = product ? product.salePrice || product.price : 0;
        return total + price * item.quantity;
      }, 0);
    },

    isInWishlist: state => productId => {
      return state.wishlist.some(id => id === productId);
    },

    filteredProducts: state => {
      let result = [...state.products];

      // Apply category filter
      if (state.filters.category) {
        result = result.filter(
          product => product.categoryId === state.filters.category
        );
      }

      // Apply price range filter
      result = result.filter(
        product =>
          product.price >= state.filters.priceRange[0] &&
          product.price <= state.filters.priceRange[1]
      );

      // Apply sorting
      switch (state.filters.sortBy) {
        case 'price-low-high':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'featured':
        default:
          // Featured products first, then sort by id
          result.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.id - b.id;
          });
      }

      return result;
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },

    SET_LOADING(state, status) {
      state.loading = status;
    },

    SET_ERROR(state, error) {
      state.error = error;
    },

    ADD_TO_CART(state, { productId, quantity }) {
      const existingItem = state.cart.find(
        item => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ productId, quantity });
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.productId !== productId);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    UPDATE_CART_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.productId === productId);

      if (item) {
        item.quantity = quantity;
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    CLEAR_CART(state) {
      state.cart = [];

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    TOGGLE_WISHLIST(state, productId) {
      const index = state.wishlist.indexOf(productId);

      if (index === -1) {
        state.wishlist.push(productId);
      } else {
        state.wishlist.splice(index, 1);
      }

      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },

    SET_FILTERS(state, filters) {
      state.filters = { ...state.filters, ...filters };
    },

    INIT_STORE(state) {
      // Load cart from localStorage
      const cart = localStorage.getItem('cart');
      if (cart) {
        state.cart = JSON.parse(cart);
      }

      // Load wishlist from localStorage
      const wishlist = localStorage.getItem('wishlist');
      if (wishlist) {
        state.wishlist = JSON.parse(wishlist);
      }
    },
  },
  actions: {
    initializeStore({ commit }) {
      commit('INIT_STORE');

      // Load products and categories (in a real app, this would be an API call)
      commit('SET_PRODUCTS', productsData);
      commit('SET_CATEGORIES', categoriesData);
    },

    fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        // Simulate API call
        setTimeout(() => {
          commit('SET_PRODUCTS', productsData);
          commit('SET_LOADING', false);
        }, 500);
      } catch (error) {
        commit('SET_ERROR', 'Failed to load products. Please try again.');
        commit('SET_LOADING', false);
      }
    },

    fetchCategories({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        // Simulate API call
        setTimeout(() => {
          commit('SET_CATEGORIES', categoriesData);
          commit('SET_LOADING', false);
        }, 500);
      } catch (error) {
        commit('SET_ERROR', 'Failed to load categories. Please try again.');
        commit('SET_LOADING', false);
      }
    },

    addToCart({ commit }, { productId, quantity = 1 }) {
      commit('ADD_TO_CART', { productId, quantity });
    },

    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },

    updateCartItemQuantity({ commit }, { productId, quantity }) {
      commit('UPDATE_CART_ITEM_QUANTITY', { productId, quantity });
    },

    clearCart({ commit }) {
      commit('CLEAR_CART');
    },

    toggleWishlist({ commit }, productId) {
      commit('TOGGLE_WISHLIST', productId);
    },

    applyFilters({ commit }, filters) {
      commit('SET_FILTERS', filters);
    },
  },
  modules: {},
});
