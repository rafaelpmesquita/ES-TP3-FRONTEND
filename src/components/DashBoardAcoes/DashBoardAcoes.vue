<template>
  <v-container fluid>
    <v-row class="my-8">
      <v-col cols="6">
        <h1>DashBoard</h1>
      </v-col>
      <v-col cols="6 d-flex justify-end">
        <v-btn @click="abrirModal">Adicionar Ação</v-btn>
      </v-col>
    </v-row>
    <DataTableBase :colunas="colunasLower" />

    <!-- Modal de Inserção -->
    <v-dialog v-model="modalAberto" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Nova Ação</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field :rules="[regra.campoObrigatorio]" v-model="novaAcao.nomeDaAcao" label="Nome da Ação"
              required></v-text-field>
            <v-text-field :rules="[regra.campoObrigatorio]" v-model="novaAcao.nomeDoUsuario" label="Nome do Usuário"
              required></v-text-field>
            <v-select :items="tiposDeAcao" item-text="descricao" item-value="descricao" v-model="novaAcao.tipoDeAcao"
              label="Tipo de Ação" :rules="[regra.campoObrigatorio]" required></v-select>
            <v-text-field :rules="[regra.apenasNumeros, regra.campoObrigatorio]" v-model="novaAcao.temperatura"
              label="Temperatura" required></v-text-field>
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field disabled v-model="novaAcao.data" label="Data" prepend-icon="mdi-calendar" readonly
                  v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="novaAcao.data" no-title scrollable>
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="fecharModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="adicionarAcao">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-snack-bar :iconSnackbar="icone" :snackbar="janelaAberta" :textoSnackbar="mensagemCadastro"></base-snack-bar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store/namespaces';
import DataTableBase from '@/components/base/DataTableBase.vue';
import { ActionActionTypes } from '@/store/action/actions';
import { ActionGetterTypes } from '@/store/action/getters';
import Acoes from '@/models/Acoes';
import {
  campoObrigatorio,
  apenasNumeros,
  apenasLetras
} from '@/commom/helpers/validadores';
import BaseSnackBar from '../base/BaseSnackBar.vue';
import { ConstantesGeral } from '@/commom/constantes/ConstantesGeral';
const namespaces = namespace(StoreNamespaces.ACTION);

@Component({ components: { DataTableBase, BaseSnackBar } })
export default class DashBoardAcoes extends Vue {
  @namespaces.Action(ActionActionTypes.ACOES)
  public buscarDados!: () => Promise<void>;

  @namespaces.Action(ActionActionTypes.CADASTRAR)
  public cadastrarAcao!: (request: Acoes) => Promise<void>;

  @namespaces.Getter(ActionGetterTypes.ACOES)
  public acoes!: Acoes[];

  public janelaAberta: boolean = false;
  public mensagemCadastro: string = '';
  public icone: string = '';
  public variavel: any = [];
  public colunas: string[] = ['Nome da Acao', 'Nome do Usuario', 'Tipo de Acao', 'Temperatura', 'Data'];
  public modalAberto: boolean = false;
  public novaAcao: Acoes = new Acoes('', '', '', '', new Date());
  public menu: boolean = false;
  public regra = {
    campoObrigatorio,
    apenasNumeros,
    apenasLetras,
  };
  
  get tiposDeAcao() {
    return ConstantesGeral.TIPOS_ACAO;
  }

  public get colunasLower(): string[] { return this.colunas.map((coluna) => this.tratarNomeColuna(coluna)) };

  public tratarNomeColuna(coluna: string) {
    coluna = coluna.toLowerCase();
    if (coluna.indexOf(' ') !== -1) {
      coluna = coluna.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
    return coluna;
  }

  public async beforeMount() {
    await this.buscarDados();
  }

  public abrirModal() {
    this.modalAberto = true;
  }

  public fecharModal() {
    this.modalAberto = false;
  }

  public async adicionarAcao() {
    const formulario: any = this.$refs.form;
    if (formulario.validate()) {
      const request: Acoes = new Acoes(
        this.novaAcao.nomeDaAcao,
        this.novaAcao.nomeDoUsuario,
        this.novaAcao.tipoDeAcao,
        this.novaAcao.temperatura,
        new Date(this.novaAcao.data)
      )
      try {

        await this.cadastrarAcao(request);
        this.mensagemCadastro = 'Ação cadastrada com sucesso.'
        this.icone = 'mdi-check-circle-outline'
        this.janelaAberta = true;
      } catch (e) {
        this.mensagemCadastro = 'Ação não foi cadastrada, tente novamente.'
        this.icone = 'mdi-check-circle-outline'
        this.janelaAberta = true;
      }
      this.novaAcao = new Acoes('', '', '', '', new Date());
      this.fecharModal();
      await this.buscarDados();
    }
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
