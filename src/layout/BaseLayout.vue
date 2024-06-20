<template id="app">
  <section>
    <header>

      <v-app-bar class="toolbar" :color="cor">
        <v-icon @click="drawer = !drawer" color="primary" large>mdi-menu</v-icon>
        <v-toolbar-title class="ml-5">
          <v-img :width="tamanhoImagem" :src="imagemCabecalho"></v-img>
        </v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list class="pa-1">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon medium color="primary" @click="drawer = !drawer">mdi-close</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="title font-weight-bold mt-1">Menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-item @click="teste">
            <v-list-item-content>
              <v-list-item-title class="ml-4">Teste</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content class="ml-4">
                <v-list-item-title>Graficos</v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- <v-list-item @click="estatisticas">
              <v-list-item-content>
                <v-list-item-title class="ml-4">Estatisticas</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list-group>

        </v-list>
      </v-navigation-drawer>
    </header>
    <main>
      <v-container fluid class="px-0">
        <router-view />
      </v-container>
    </main>

  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseLayout extends Vue {
  public imagemCabecalho: string = "https://upload.wikimedia.org/wikipedia/pt/b/bc/CBLOL_logo_2022.png";
  public tamanhoImagem = "80px";


  public drawer: boolean = false;
  public cor: string = '#00CED1';

  public teste() {
    if (this.$route.name !== 'teste') {
      this.$router.push({ name: 'teste' });
    }
  }



}
</script>

<style scoped>
.toolbar {
  height: 60px;
  background: #ffffff;
}

.titulo-cabecalho {
  font-size: 28px;
  color: #444444;
}
</style>