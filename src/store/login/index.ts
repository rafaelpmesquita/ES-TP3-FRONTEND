import { Module } from 'vuex';
import { LoginState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const global: Module<LoginState, RootState> = {
    actions,
    state,
    mutations,
    getters,
    namespaced: true,
};

export default global;
