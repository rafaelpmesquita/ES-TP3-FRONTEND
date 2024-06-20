import Vue from 'vue';
import Vuex from 'vuex';
import login from './login';
import action from './action';



Vue.use(Vuex);

export class RootState {}

const store = new Vuex.Store<RootState>({
  modules: {
    login,
    action
  },
});

Object.assign(window, { $store: store });

export default store;
