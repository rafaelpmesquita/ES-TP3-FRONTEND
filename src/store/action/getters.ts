import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { ActionState } from './state';

export enum ActionGetterTypes {
  ACOES = 'ACOES',
}

const getters: GetterTree<ActionState, RootState> = {
  [ActionGetterTypes.ACOES](state) {
    return state.acoes;
  },
};

export default getters;
