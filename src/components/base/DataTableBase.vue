<template>
    <v-container fluid>
        <v-data-table :headers="headers" :items="acoes" class="elevation-1" show-select item-value="id"
            :loading="loading">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Table</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>

            <template v-slot:item.nomeDaAcao="{ item }">
                <span>{{ item.nomeDaAcao }}</span>
            </template>

            <template v-slot:item.nomeDoUsuario="{ item }">
                <span>{{ item.nomeDoUsuario }}</span>
            </template>

            <template v-slot:item.tipoDeAcao="{ item }">
                <span>{{ item.tipoDeAcao }}</span>
            </template>

            <template v-slot:item.temperatura="{ item }">
                <span>{{ item.temperatura }}</span>
            </template>

            <template v-slot:item.data="{ item }">
                <span>{{ item.data }}</span>
            </template>

            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="mdi-alert">
                    Nada encontrado.
                </v-alert>
            </template>

            <template v-slot:loading>
                <v-progress-circular indeterminate color="primary" size="70"></v-progress-circular>
                <span>Carregando dados. Por favor, aguarde.</span>
            </template>
        </v-data-table>
    </v-container>
</template>
  
<script lang="ts">
import Acoes from '@/models/Acoes';
import { ActionGetterTypes } from '@/store/action/getters';
import { StoreNamespaces } from '@/store/namespaces';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const namespaces = namespace(StoreNamespaces.ACTION);

@Component
export default class DataTableBase extends Vue {
    public loading: boolean = false;
    public filters: any = { global: '' };

    @Prop({ required: true })
    public colunas!: string[];

    @namespaces.Getter(ActionGetterTypes.ACOES)
    public acoes!: Acoes[];

    public get headers() {
        var a=  this.colunas.map((coluna) => ({
            text: coluna,
            value: coluna,
        }));
        console.log(a)
        return a;
    }

    public clearFilter() {
        this.filters.global = '';
    }

}
</script>
  
<style scoped>
.textoSnackbar {
    color: black;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
}
</style>
  