<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Estatísticas das Ações Sustentáveis</h1>
            </v-col>
        </v-row>
        <v-row>
            <!-- Média de temperatura -->
            <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-auto" height="150px" color="blue lighten-4" dark>
                    <v-card-title class="text-center">Média de Temperatura</v-card-title>
                    <v-card-text class="text-center">
                        <h3 class="blue--text text--darken-2">{{ mediaTemperatura }}°C</h3>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Quantidade de cada tipo de ação -->
            <v-col lg="6" md="6" sm="12" cols="12">
                <v-card class="mx-auto" height="200px">
                    <v-card-title>Quantidade de Cada Tipo de Ação</v-card-title>
                    <v-card-text>
                        <ul>
                            <li v-for="(quantidade, tipo) in quantidadePorTipo" :key="tipo">
                                <h3> {{ tipo }}: {{ quantidade }} </h3>
                            </li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Ranking das 3 pessoas com mais ações -->
            <v-col lg="6" md="6" sm="12" cols="12">
                <v-card class="mx-auto" height="200px">
                    <v-card-title>Ranking das Pessoas com Mais Ações</v-card-title>
                    <v-card-text>
                        <ol>
                            <li v-for="(usuario, index) in topUsuarios" :key="index">
                                <h3>{{ usuario.nome }}: {{ usuario.quantidade }} ações {{ index == 0 ? '(Parabéns)' : '' }}
                                </h3>
                            </li>
                        </ol>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Quantidade de ações por mês do ano atual -->
            <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-auto">
                    <v-card-title>Quantidade de Ações por Mês ({{ anoAtual }})</v-card-title>
                    <v-row>
                        <!-- Coluna esquerda: lista de meses e quantidades -->
                        <v-col cols="6">
                            <v-card-text>
                                <ul>
                                    <li v-for="(quantidade, mes) in acoesPorMes" :key="mes">
                                        {{ mes }}: {{ quantidade }} ações
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-col>

                        <!-- Coluna direita: mês com mais ações -->
                        <v-col cols="6">
                            <v-card-text class="text-center">
                                <h3>Mês com mais ações:</h3>
                                <p>{{ mesComMaisAcoes }}</p>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { StoreNamespaces } from '@/store/namespaces';
import { ActionGetterTypes } from '@/store/action/getters';
import Acoes from '@/models/Acoes';
import { ActionActionTypes } from '@/store/action/actions';

const namespaces = namespace(StoreNamespaces.ACTION);

@Component({})
export default class EstatisticasAcoes extends Vue {
    @namespaces.Getter(ActionGetterTypes.ACOES)
    public acoes!: Acoes[];
    @namespaces.Action(ActionActionTypes.ACOES)
    public buscarDados!: () => Promise<void>;


    public get mesComMaisAcoes() {
        const acoesPorMes = this.acoes.reduce((acc, acao) => {
            const mes = new Date(acao.data).getMonth();
            if (!acc[mes]) acc[mes] = 0;
            acc[mes]++;
            return acc;
        }, {} as { [key: number]: number });

        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let mesComMaisAcoes = '';
        let maxAcoes = 0;

        for (const [mes, quantidade] of Object.entries(acoesPorMes)) {
            if (quantidade > maxAcoes) {
                maxAcoes = quantidade;
                mesComMaisAcoes = meses[parseInt(mes)];
            }
        }

        return mesComMaisAcoes;
    }
    public get mediaTemperatura() {
        const totalTemperatura: number = this.acoes.reduce((sum: number, acao: Acoes) => sum + parseFloat(acao.temperatura), 0 as number);
        return this.acoes.length ? (totalTemperatura / this.acoes.length).toFixed(2) : 0;
    }

    get quantidadePorTipo(): { [key: string]: number } {
        return this.acoes.reduce((acc, acao) => {
            if (!acc[acao.tipoDeAcao]) acc[acao.tipoDeAcao] = 0;
            acc[acao.tipoDeAcao]++;
            return acc;
        }, {} as { [key: string]: number });
    }

    get topUsuarios(): { nome: string, quantidade: number }[] {
        const usuarioCount: { [key: string]: number } = this.acoes.reduce((acc, acao) => {
            if (!acc[acao.nomeDoUsuario]) acc[acao.nomeDoUsuario] = 0;
            acc[acao.nomeDoUsuario]++;
            return acc;
        }, {} as { [key: string]: number });

        return Object.entries(usuarioCount)
            .map(([nome, quantidade]) => ({ nome, quantidade }))
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 3);
    }

    get anoAtual(): number {
        return new Date().getFullYear();
    }

    get acoesPorMes(): { [key: string]: number } {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const acoesPorMes = this.acoes.reduce((acc, acao) => {
            const mes = new Date(acao.data).getMonth();
            if (!acc[mes]) acc[mes] = 0;
            acc[mes]++;
            return acc;
        }, {} as { [key: number]: number });

        return meses.reduce((acc, mes, index) => {
            acc[mes] = acoesPorMes[index] || 0;
            return acc;
        }, {} as { [key: string]: number });
    }

    public beforeMount() {
        this.buscarDados();

    }
}
</script>
  
<style scoped>
.blue--text {
    font-size: 2.5rem;
    /* Tamanho do texto grande */
}

.textoSnackbar {
    color: black;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
}
</style>
  