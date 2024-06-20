import { MutationTree } from 'vuex';
import { LoginState } from './state';
import Usuario from '@/models/Usuario';
import axios from '@/axiosConfig';

export enum LoginMutationsTypes {
  LOGAR = 'LOGAR',
  USUARIO ='USUARIO',
  SET_TOKEN = 'SET_TOKEN',
  LOGOUT = 'LOGOUT',
}

const mutations: MutationTree<LoginState> = {
  [LoginMutationsTypes.LOGAR](state: LoginState, logado: boolean) {
    state.isAuthenticate = logado;
  },
  [LoginMutationsTypes.USUARIO](state: LoginState, usuario: Usuario) {
    state.usuario = usuario;
  },

  [LoginMutationsTypes.SET_TOKEN](state: LoginState, token: string) {
    state.token = token;
  },
  [LoginMutationsTypes.LOGOUT](state: LoginState) {
    state.token = '';
      state.usuario = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
  },

};

export default mutations;
