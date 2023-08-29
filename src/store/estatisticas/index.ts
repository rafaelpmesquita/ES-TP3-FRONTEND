import { Module } from 'vuex';
import { EstatisticaState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const estatisticas: Module<EstatisticaState, RootState> = {
  actions,
  state,
  mutations,
  getters,
  namespaced: true,
};

export default estatisticas;
