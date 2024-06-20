import Usuario from "@/models/Usuario";

export class LoginState {
  public isAuthenticate: boolean = false;
  public usuario?: Usuario | null;
  public token?: string;
}

export const state: LoginState = Object.assign(new LoginState(), {
  isAuthenticate: false,
  Usuario: null,
  token: localStorage.getItem('token') || '',
});

export default state;
