import { MutationTree } from 'vuex';
import Usuario from '@/models/Usuario';
import axios from '@/axiosConfig';
import { ActionState } from './state';
import Acoes from '@/models/Acoes';

export enum ActionMutationsTypes {
  ACOES = 'ACOES',
}

const mutations: MutationTree<ActionState> = {
  [ActionMutationsTypes.ACOES](state: ActionState, acoes: Acoes[]) {
    state.acoes = acoes;
  },
};

export default mutations;
