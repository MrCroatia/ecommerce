import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () =>
      import(/* webpackChunkName: "products" */ '../views/ProductsView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () =>
      import(
        /* webpackChunkName: "product-detail" */ '../views/ProductDetailView.vue'
      ),
    props: true,
  },
  {
    path: '/category/:category',
    name: 'category',
    component: () =>
      import(/* webpackChunkName: "category" */ '../views/CategoryView.vue'),
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: () =>
      import(/* webpackChunkName: "cart" */ '../views/CartView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () =>
      import(/* webpackChunkName: "checkout" */ '../views/CheckoutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () =>
      import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () =>
      import(/* webpackChunkName: "account" */ '../views/AccountView.vue'),
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () =>
      import(/* webpackChunkName: "wishlist" */ '../views/WishlistView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
