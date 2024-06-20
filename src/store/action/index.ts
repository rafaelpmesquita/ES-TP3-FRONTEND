import { Module } from 'vuex';
import { ActionState, state } from './state';
import { RootState } from '@/store';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const action: Module<ActionState, RootState> = {
    actions,
    state,
    mutations,
    getters,
    namespaced: true,
};

export default action;
