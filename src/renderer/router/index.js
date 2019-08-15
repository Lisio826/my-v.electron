import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('../components/Login').default
    },{
      path: '/operation',
      component: require('../components/Operation').default
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
