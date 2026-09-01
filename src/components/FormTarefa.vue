<script setup>
import { ref } from 'vue'


const props = defineProps({
  tituloDialog: {
    type: String,
    required: true
  }
})

const formulario = ref(null)

const regraObrigatorio = valor => {
  return !!valor || 'Campo obrigatório'
}

const exibir = defineModel()

const titulo = defineModel('titulo')
const descricao = defineModel('descricao')
const prioridade = defineModel('prioridade')

const emit = defineEmits(['salvar'])

const salvar = async () => {
  const { valido } = await formulario.value.validate()

  if (!valido) {
    return
  }
  exibir.value = false
  emit('salvar')
}
</script>

<template>
    <v-dialog v-model="exibir" max-width="500" fullscreen>

        <v-toolbar>
            <v-btn icon="mdi-close" @click="exibir = false"></v-btn>

            <v-toolbar-title>{{ props.tituloDialog }}</v-toolbar-title>

            <v-toolbar-items>
                <v-btn text="Salvar" variant="tonal" @click="salvar"></v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card>
            <v-card-title>{{ props.tituloDialog }}</v-card-title>

            <v-card-text>
                <v-form ref="formulario" class="d-flex flex-column ga-4">
                    <v-text-field v-model="titulo" label="Título" variant="outlined" density="compact" :rules="[regraObrigatorio]" />

                    <v-textarea v-model="descricao" label="Descrição" variant="outlined" density="compact" :rules="[regraObrigatorio]" />

                    <v-select v-model="prioridade" label="Prioridade" variant="outlined" density="compact" :items="['Baixa', 'Média', 'Alta']" :rules="[regraObrigatorio]" />
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>