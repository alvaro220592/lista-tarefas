<template>

  <div class="m-0 ma-sm-16 py-10">

    <h1 class="text-center">Lista de tarefas.</h1>
    
    <v-card class="mx-2">
      
      <v-card-text>
        <v-text-field
          density="compact"
          v-model="search"
          label="Buscar"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        />
      </v-card-text>

      <v-list density="compact">

        <v-list-item v-for="tarefa in tarefas" :key="tarefa.id" :value="tarefa.id" class="py-3" active-class="none">
          <template v-slot:prepend>
            <v-icon icon="mdi-circle" :color="corPrioridade(tarefa.prioridade)"></v-icon>
          </template>

          <v-list-item-title>{{ tarefa.titulo }}</v-list-item-title>

          <v-list-item-subtitle class="text-high-emphasis">{{ tarefa.descricao }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';

const tarefas = ref([])

onMounted(() => {
  tarefas.value = [
    {
      "id": 1000,
      "titulo": "Configurar servidor Nginx",
      "descricao": "Configurar o ambiente da VPS",
      "prioridade": "Alta",
      "finalizada": true
    },
    {
      "id": 1001,
      "titulo": "Criar pipeline CI/CD",
      "descricao": "Configurar GitHub Actions",
      "prioridade": "Baixa",
      "finalizada": false
    },
    {
      "id": 1002,
      "titulo": "Criar branches padrão do Git",
      "descricao": "Criar as branches 'desenvolvimento' e 'produção'",
      "prioridade": "Média",
      "finalizada": false
    }
  ]

})

function corPrioridade(prioridade) {
  const cores = {
    'Alta': 'error',
    'Média': 'warning',
    'Baixa': 'success'
  }

  return cores[prioridade] || 'grey'
}
</script>
