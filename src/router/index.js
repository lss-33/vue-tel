import Vue from 'vue'
import VueRouter from 'vue-router'
import contactList from '../views/ContactList.vue'

import {
  ContactList,
  ContactEdit,
  Popup,
  Toast
} from 'vant'


Vue.use(Toast)


Vue.use(ContactList)
Vue.use(ContactEdit)
Vue.use(Popup)
Vue.use(VueRouter)


const routes = [{
  path: '/',
  name: 'contactList',
  component: contactList
}]

const router = new VueRouter({
  routes
})

export default router
