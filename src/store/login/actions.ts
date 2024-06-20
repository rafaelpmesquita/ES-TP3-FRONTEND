import { ActionTree } from 'vuex';
import { LoginState } from './state';
import { LoginMutationsTypes } from './mutations';
import { RootState } from '@/store';
import Usuario from '@/models/Usuario';
import { Container } from 'typescript-ioc';
import { LoginCadastroService } from '@/service/LoginCadastroService';

export enum LoginActionTypes {
  LOGAR = 'LOGAR',
  CADASTRAR = 'CADASTRAR',
  LOGOUT = 'LOGOUT',
}

const actions: ActionTree<LoginState, RootState> = {

  async [LoginActionTypes.LOGAR]({ commit }, usuario: Usuario) {
    const service = Container.get(
      LoginCadastroService,
    ) as LoginCadastroService;
    const data = await service.login(usuario);
    commit(LoginMutationsTypes.LOGAR, true);
    commit(LoginMutationsTypes.USUARIO, usuario);
    commit(LoginMutationsTypes.SET_TOKEN, data.token);
  },
  async [LoginActionTypes.CADASTRAR]({ commit }, usuario: Usuario) {
    const service = Container.get(
      LoginCadastroService,
    ) as LoginCadastroService;
    try {
      await service.cadastrar(usuario);
    } catch (error) {
      throw error;
    }
  },

  async [LoginActionTypes.LOGOUT]({ commit }) {
    commit(LoginMutationsTypes.LOGOUT);
  }
};

export default actions;
