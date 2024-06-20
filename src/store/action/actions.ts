import { Action, ActionTree } from 'vuex';
import { LoginState } from './state';
import { ActionMutationsTypes, LoginMutationsTypes } from './mutations';
import { RootState } from '@/store';
import Usuario from '@/models/Usuario';
import { Container } from 'typescript-ioc';
import { LoginCadastroService } from '@/service/LoginCadastroService';
import { AcoesService } from '@/service/AcoesService';
import Acoes from '@/models/Acoes';

export enum ActionActionTypes {
  ACOES = 'ACOES',
  CADASTRAR = 'CADASTRAR',
}

const actions: ActionTree<LoginState, RootState> = {

  async [ActionActionTypes.ACOES]({ commit }) {
    const service = Container.get(
      AcoesService,
    ) as AcoesService;
    const data = await service.buscarAcoes();
    commit(ActionMutationsTypes.ACOES, data);
  },
  async [ActionActionTypes.CADASTRAR]({ commit }, request: Acoes) {
    const service = Container.get(
      AcoesService,
    ) as AcoesService;
    const data = await service.adicionarAcao(request);
    commit(ActionMutationsTypes.ACOES, data);
  },

};

export default actions;
