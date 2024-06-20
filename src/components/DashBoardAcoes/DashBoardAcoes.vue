<template>
  <v-container fluid>
    <h1>DashBoard</h1>
    <DataTableBase :colunas="colunasLower" :variavel="variavel" />
    <!-- <base-snack-bar :iconSnackbar="icone" :snackbar="janelaAberta" :textoSnackbar="mensagemCadastro"></base-snack-bar> -->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store/namespaces';
import DataTableBase from '@/components/base/DataTableBase.vue';
import { ActionActionTypes } from '@/store/action/actions';
import { ActionGetterTypes } from '@/store/action/getters';
import Acoes from '@/models/Acoes';
const namespaces = namespace(StoreNamespaces.ACTION);


@Component({ components: { DataTableBase } })
export default class DashBoardAcoes extends Vue {
  @namespaces.Action(ActionActionTypes.ACOES)
  public buscarDados!: () => Promise<void>;

  @namespaces.Getter(ActionGetterTypes.ACOES)
  public acoes!: Acoes[];

  public variavel: any = [];
  public colunas: string[] = ['Nome da Acao', 'Nome do Usuario', 'Tipo de Acao', 'Temperatura', 'Data'];

  public get colunasLower(): string[] { return this.colunas.map((coluna) => this.tratarNomeColuna(coluna)) };

  public tratarNomeColuna(coluna: string) {
    coluna = coluna.toLowerCase();
    if (coluna.indexOf(' ') !== -1) {
      // Se houver espaço, converte para camel case e remove os espaços
      coluna = coluna.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
    return coluna;
  }


  public async beforeMount() {
    await this.buscarDados();

    this.variavel = this.acoes.map((action, index) => ({
      id: index + 1,
      nomeDaAcao: action.nomeDoUsuario,
      nomeDoUsuario: action.nomeDoUsuario,
      TipoDeAcao: action.tipoDeAcao,
      temperatura: action.temperatura,
      data: new Date(action.data).toLocaleDateString()
    }));
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