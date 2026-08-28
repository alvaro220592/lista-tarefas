<script setup>
const props = defineProps({
  tituloDialog: {
    type: String,
    required: true
  }
})

const exibir = defineModel()

const titulo = defineModel('titulo')
const descricao = defineModel('descricao')
const prioridade = defineModel('prioridade')

const emit = defineEmits(['salvar'])

const salvar = () => {
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
                <v-btn text="Salvar" variant="text" @click="salvar"></v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card>
            <v-card-title>{{ props.tituloDialog }}</v-card-title>

            <v-card-text>
                <v-text-field v-model="titulo" label="Título" variant="outlined" />

                <v-textarea v-model="descricao" label="Descrição" variant="outlined" />

                <v-select v-model="prioridade" label="Prioridade" variant="outlined"
                    :items="['Baixa', 'Média', 'Alta']" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>