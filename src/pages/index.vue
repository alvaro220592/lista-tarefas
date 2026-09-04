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

            <v-list-item class="py-3" :active="false">
              
              <div class="d-flex align-center">
                  <v-icon
                      icon="mdi-circle"
                      :color="corPrioridade(tarefa.prioridade)"
                      size="10"
                      class="me-2"
                      style="opacity: 1"
                  />

                <v-expansion-panels :rounded="[4, 8]" variant="accordion" static>
                    <v-expansion-panel class="border" color="grey-darken-3">
                      <v-expansion-panel-title>
                        <div class="d-flex items-center ga-2">

                          <v-icon
                              :icon="tarefa.finalizada ? 'mdi-check-circle' : 'mdi-clock-outline'"
                              :color="tarefa.finalizada ? 'success' : 'warning'"
                              size="small"
                          />
                          
                          <span>{{ tarefa.titulo }} - {{ tarefa.criado_em }}</span>
                        </div>
                      </v-expansion-panel-title>

                      <v-expansion-panel-text>
                          {{ tarefa.descricao }}
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
              </div>

              <template #append>
                <v-menu>
                  <template #activator="{ props }">
                    <v-btn class="ml-2" density="compact" v-bind="props" icon="mdi-dots-vertical" variant="text" />
                  </template>

                  <v-list>
                    <v-list-item title="Editar" @click="abrirDialogFormTarefa(tarefa.id)">
                      <template #prepend>
                        <v-icon icon="mdi-pencil" color="orange" />
                      </template>
                    </v-list-item>

                    <v-list-item title="Excluir">
                      <template #prepend>
                        <v-icon icon="mdi-delete" color="red" />
                      </template>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>

            </v-list-item>

            <v-divider v-if="index < tarefas.length - 1" />

          </template>

        </v-list>
      </v-card>
    </div>
  </div>

  <FormTarefa v-model="exibirFormTarefaDialog" v-model:titulo="tituloTarefa" v-model:descricao="descricaoTarefa"
    v-model:prioridade="prioridadeTarefa" :tituloDialog="formTarefaTituloDialog" @salvar="salvarTarefa" />
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
      "finalizada": true,
      "criado_em": "04/09/2026"
    },
    {
      "id": 1001,
      "titulo": "Criar pipeline CI/CD",
      "descricao": "Configurar GitHub Actions",
      "prioridade": "Baixa",
      "finalizada": false,
      "criado_em": "28/08/2026"
    },
    {
      "id": 1002,
      "titulo": "Criar branches padrão do Git",
      "descricao": "Criar as branches 'desenvolvimento' e 'produção'",
      "prioridade": "Média",
      "finalizada": false,
      "criado_em": "10/08/2006"
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


<style>
.v-expansion-panel-title, .v-expansion-panel-text__wrapper {
    padding-left: 8px;
    padding-right: 8px;
}
</style>