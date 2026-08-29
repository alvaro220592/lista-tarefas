<template>

  <div>
    <v-card v-if="ambiente != 'produção'" variant="outlined" color="yellow-darken-2" class="text-center">
      Ambiente de {{ ambiente }}
    </v-card>

    <div class="m-0 ma-sm-16 py-10">
      <h1 class="text-center">Lista de tarefas</h1>

      <v-card class="mx-2" rounded="lg" elevation="2">
        <div class="pa-4">

          <!-- Cabeçalho -->
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <div class="text-h6 font-weight-medium">
                Tarefas
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ tarefas.length }} tarefas cadastradas
              </div>
            </div>

            <v-btn color="primary" prepend-icon="mdi-plus" @click="abrirDialogFormTarefa()">
              Nova tarefa
            </v-btn>
          </div>

          <!-- Busca -->
          <v-text-field v-model="search" density="compact" label="Buscar tarefa" prepend-inner-icon="mdi-magnify"
            variant="outlined" hide-details clearable />

          <!-- Legenda de prioridades -->
          <v-card border variant="flat" class="mt-4 py-2 px-3">

            <span>Prioridades</span>
            
            <div class="d-flex flex-wrap ga-4 text-body-2">
              <div class="d-flex align-center ga-1">
                <v-icon icon="mdi-circle" color="red-darken-1" size="10" /> Alta
              </div>

              <div class="d-flex align-center ga-1">
                <v-icon icon="mdi-circle" color="warning" size="10" /> Média
              </div>

              <div class="d-flex align-center ga-1">
                <v-icon icon="mdi-circle" color="success" size="10" /> Baixa
              </div>
            </div>
          </v-card>
        </div>

        <!-- Lista de tarefas -->
        <v-list density="compact" class="ma-4 mt-0 py-0" border>

          <template v-for="(tarefa, index) in tarefas" :key="tarefa.id">

            <v-list-item :value="tarefa.id" class="py-3" :active="false">

              <template #prepend>
                <v-icon icon="mdi-circle" :color="corPrioridade(tarefa.prioridade)" size="10" class="me-3" style="opacity: 1" />
              </template>

              <v-list-item-title class="font-weight-medium">
                {{ tarefa.titulo }}
              </v-list-item-title>

              <v-list-item-subtitle class="text-medium-emphasis">
                {{ tarefa.descricao }}
              </v-list-item-subtitle>

              <template #append>
                <div class="d-flex ga-2 pl-4">
                  <v-icon size="x-large" color="warning" icon="mdi-pencil-circle" @click="abrirDialogFormTarefa(tarefa.id)"></v-icon>
                  <v-icon size="x-large" color="red" icon="mdi-delete-circle"></v-icon>
                </div>
              </template>

            </v-list-item>

            <v-divider v-if="index < tarefas.length - 1" />

          </template>

        </v-list>
      </v-card>
    </div>
  </div>

  <FormTarefa
    v-model="exibirFormTarefaDialog"
    v-model:titulo="tituloTarefa"
    v-model:descricao="descricaoTarefa"
    v-model:prioridade="prioridadeTarefa"
    :tituloDialog="formTarefaTituloDialog"
    @salvar="salvarTarefa"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FormTarefa from '../components/FormTarefa.vue';

const tarefas = ref([])
const ambiente = ref('')
const exibirFormTarefaDialog = ref(false)
const formTarefaTituloDialog = ref('')
const tituloTarefa = ref('')
const descricaoTarefa = ref('')
const prioridadeTarefa = ref('')

onMounted(() => {
  ambiente.value = import.meta.env.VITE_AMBIENTE_DETALHADO

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
    },
  ]

})

const abrirDialogFormTarefa = (idTarefa = null) => {
  formTarefaTituloDialog.value = 'Nova tarefa'
  tituloTarefa.value = ''
  descricaoTarefa.value = ''
  prioridadeTarefa.value = 'Baixa'

  if (idTarefa) {
    formTarefaTituloDialog.value = 'Editar tarefa'

    const tarefa = tarefas.value.find(tarefa => tarefa.id === idTarefa)

    if (tarefa) {
      tituloTarefa.value = tarefa.titulo
      descricaoTarefa.value = tarefa.descricao
      prioridadeTarefa.value = tarefa.prioridade
    }
  }

  exibirFormTarefaDialog.value = true
}

function corPrioridade(prioridade) {
  const cores = {
    'Alta': 'red-darken-1',
    'Média': 'warning',
    'Baixa': 'success'
  }

  return cores[prioridade] || 'grey'
}

const salvarTarefa = async () => {
  const maiorId = Math.max(...tarefas.value.map(tarefa => tarefa.id))

  tarefas.value.push({
    id: maiorId + 1,
    titulo: tituloTarefa.value,
    descricao: descricaoTarefa.value,
    prioridade: prioridadeTarefa.value,
    finalizada: false
  })
}
</script>
