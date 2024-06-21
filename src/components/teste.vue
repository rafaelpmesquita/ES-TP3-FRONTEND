<template>
    <v-container fluid>
      <v-row>
        <v-col>
          <h1>Bem vindo! Acesse o menu para navegar entre as páginas.</h1>
          <v-card class="mx-auto">
            <v-card-title>Objetivo de Desenvolvimento Sustentável (ODS) 13</v-card-title>
            <v-card-subtitle>Ação contra a mudança global do clima</v-card-subtitle>
            <v-card-text>
              <p>
                O Objetivo de Desenvolvimento Sustentável 13 (ODS 13) é uma iniciativa global que visa combater as mudanças climáticas e seus impactos. As alterações climáticas representam um dos maiores desafios do nosso tempo e afetam todos os países em todos os continentes. É necessário tomar medidas urgentes para enfrentar essa crise e mitigar seus efeitos adversos.
              </p>
              <p>
                O ODS 13 promove a adoção de ações para reduzir as emissões de gases de efeito estufa, fortalecer a resiliência e a capacidade de adaptação às mudanças climáticas e integrar medidas climáticas nas políticas, estratégias e planejamentos nacionais. Além disso, busca melhorar a educação, a conscientização e a capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce para as mudanças climáticas.
              </p>
              <p>
                Como parte dos esforços para alcançar este objetivo, os indivíduos e organizações são incentivados a adotar práticas sustentáveis em suas rotinas diárias, contribuindo para a redução da pegada de carbono. Exemplos dessas práticas incluem a economia de energia, o uso de transportes sustentáveis, a redução do consumo de plástico e a promoção de iniciativas de reciclagem.
              </p>
              <p>
                Este sistema de gestão de tarefas foi desenvolvido para ajudar você a registrar, monitorar e analisar suas ações sustentáveis, promovendo um estilo de vida mais consciente e responsável em relação ao meio ambiente.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <h2>Exemplos:</h2>
      
      <v-row>
        <v-col lg="4" md="6" sm="12" cols="12" v-for="acao in acoes" :key="acao.titulo">
          <v-card class="mx-auto" height="150px">
            <v-card-title>{{ acao.titulo }}</v-card-title>
            <v-card-text>
              <p>{{ acao.descricao }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component({})
  export default class InfoComponent extends Vue {
    public acoes = [
      {
        titulo: 'Economizar Energia',
        descricao: 'Desligue as luzes ao sair de um cômodo e utilize lâmpadas de LED para economizar energia.',
      },
      {
        titulo: 'Uso de Transportes Sustentáveis',
        descricao: 'Opte por caminhar, andar de bicicleta ou usar transporte público em vez de carros particulares.',
      },
      {
        titulo: 'Reduzir o Consumo de Plástico',
        descricao: 'Evite o uso de plásticos descartáveis e adote alternativas reutilizáveis.',
      },
      {
        titulo: 'Reciclagem',
        descricao: 'Separe seus resíduos e envie materiais recicláveis para centros de reciclagem.',
      },
      {
        titulo: 'Consumo Consciente de Água',
        descricao: 'Reduza o consumo de água fechando a torneira ao escovar os dentes e optando por banhos mais curtos.',
      },
      {
        titulo: 'Alimentação Sustentável',
        descricao: 'Prefira alimentos orgânicos e de produtores locais, e reduza o consumo de carne.',
      }
    ];
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
  