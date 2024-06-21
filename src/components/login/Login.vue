<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="height: 100vh;">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card">
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="username" label="Nome" outlined dense required
                background-color="white"></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password" outlined dense required
                background-color="white"></v-text-field>
              <v-btn color="primary" @click="login" dark block type="submit">Entrar</v-btn>
            </v-form>
            <p>Não tem uma conta? <a @click="telaCadastro">Crie uma conta</a></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <base-snack-bar :iconSnackbar="icone" :snackbar="janelaAberta" :textoSnackbar="mensagemCadastro"></base-snack-bar>
  </v-container>
</template>



<script lang="ts">
import { StoreNamespaces } from '@/store/namespaces';
import { Component, Vue } from 'vue-property-decorator';
import { LoginActionTypes } from '@/store/login/actions'
import { namespace } from 'vuex-class';
import Usuario from '@/models/Usuario';
import BaseSnackBar from '../base/BaseSnackBar.vue';
const namespaces = namespace(StoreNamespaces.LOGIN);

@Component({ components: {BaseSnackBar} })
export default class Login extends Vue {
  @namespaces.Action(LoginActionTypes.LOGAR)
  public logar!: (Usuario: Usuario) => Promise<void>;

  public janelaAberta: boolean = false;
  public mensagemCadastro: string = '';
  public icone: string = '';
  public username?: string = '';
  public password?: string = '';

  public async login() {

    try {
      await this.logar(new Usuario(this.username!, this.password!));
      this.mensagemCadastro = 'Login Realizado com Sucesso'
      this.icone = 'mdi-check-circle-outline'
      this.janelaAberta = true;
      this.$router.push({ name: 'teste' });
    } catch (e) {
      this.icone = 'mdi-error-outline'
      this.mensagemCadastro = 'Usuário ou senha incorretos.'
      this.janelaAberta = true;
    }
  }
  public telaCadastro() {
    this.$router.push({ name: 'cadastro' });

  }


  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));

  }
}
</script>

<style scoped>
.login-card {
  border-radius: 8px;
  background-color: #00CED1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.login-card .v-card-title {
  display: none;
}

.login-card .v-card-text {
  padding: 0;
}

.login-card .v-text-field {
  width: 100%;
  margin-bottom: 20px;
}

.login-card p {
  text-align: center;
  margin-top: 10px;
  color: white;
}

.login-card a {
  color: white;
  text-decoration: underline;
}

.login-card a:hover {
  text-decoration: none;
}
</style>
