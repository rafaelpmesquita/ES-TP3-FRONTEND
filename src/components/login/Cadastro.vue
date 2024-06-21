<template>
    <v-container fluid>
      <v-row align="center" justify="center" style="height: 100vh;">
        <v-col cols="12" sm="8" md="4">
          <v-card class="login-card">
            <v-card-title class="headline">Cadastro</v-card-title>
            <v-card-text>
              <v-form  ref="formCadastro">
                <v-text-field :rules="[regra.campoObrigatorio, regra.apenasLetras]" v-model="nome" label="Nome" outlined
                  dense required background-color="white"></v-text-field>
                <v-text-field v-model="senha" label="Senha" :rules="[regra.campoObrigatorio]" type="password" outlined dense
                  required background-color="white"></v-text-field>
                <v-text-field v-model="confirmarSenha" label="Confirmar Senha"
                  :rules="[regra.campoObrigatorio, senhasDiferentes]" type="password" outlined dense required
                  background-color="white"></v-text-field>
                <v-btn @click="cadastrar" color="primary" dark block type="submit">Cadastrar</v-btn>
              </v-form>
              <p>Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <base-snack-bar :iconSnackbar="icone" :snackbar="janelaAberta" :textoSnackbar="mensagemCadastro"></base-snack-bar>
    </v-container>
  </template>
    
  <script lang="ts">
  import { StoreNamespaces } from '@/store/namespaces';
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import {
    campoObrigatorio,
    apenasNumeros,
    apenasLetras
  } from '@/commom/helpers/validadores';
  import { namespace } from 'vuex-class';
  import { LoginActionTypes } from '@/store/login/actions';
  import BaseSnackBar from '@/components/base/BaseSnackBar.vue'
  import Usuario from '@/models/Usuario';
  const namespaces = namespace(StoreNamespaces.LOGIN);
  
  
  @Component({ components: { BaseSnackBar } })
  export default class Cadastro extends Vue {
    @namespaces.Action(LoginActionTypes.CADASTRAR)
    public cadastrarUsuario!: (request: Usuario) => Promise<void>;
  
    public janelaAberta: boolean = false;
    public mensagemCadastro: string = '';
    public icone: string = '';
    public nome?: string = '';
    public senha: string = '';
    public confirmarSenha: string = '';
    public mensagemErroSenha: string = '';
    public senhasDiferentes(): string | boolean {
      if (this.senha && this.confirmarSenha && this.senha !== this.confirmarSenha) {
        return 'Senhas diferentes.';
      } else {
        return true; // Senhas iguais
      }
      // Se um dos campos não estiver preenchido, não fazemos nenhuma validação
      return true;
    }
    public regra = {
      campoObrigatorio,
      apenasNumeros,
      apenasLetras,
    };
    public async cadastrar() {
      const formulario: any = this.$refs.formCadastro;
      if (formulario.validate()) {
        try {
          await this.cadastrarUsuario(new Usuario(this.nome!, this.senha!))
          this.mensagemCadastro = 'Usuário cadastrado com sucesso.'
          this.icone = 'mdi-check-circle-outline'
          this.janelaAberta = true;
          await this.delay(2000);
          this.$router.push({ name: 'login' });
        } catch (e) {
          this.icone = 'mdi-error-outline'
          this.mensagemCadastro = 'Usuário não foi cadastrado, tente mais tarde.'
          this.janelaAberta = true;
        }
      }
    }
  
    public delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
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
    