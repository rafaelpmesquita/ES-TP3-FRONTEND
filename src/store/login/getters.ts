import { GetterTree } from 'vuex';
import { LoginState } from './state';
import { RootState } from '@/store';

export enum LoginGetterTypes {
  USUARIO = 'USUARIO',
  TOKEN = 'TOKEN',
}

const getters: GetterTree<LoginState, RootState> = {
  [LoginGetterTypes.USUARIO](state) {
    return state.usuario;
  },
  [LoginGetterTypes.TOKEN](state) {
    return state.token;
  },
};

export default getters;
