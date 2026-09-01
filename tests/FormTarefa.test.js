import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { test, expect } from 'vitest'
import FormTarefa from '../src/components/FormTarefa.vue'

const vuetify = createVuetify()

const criarWrapper = () => {
  return mount(FormTarefa, {
    props: {
      tituloDialog: 'Nova tarefa',
      modelValue: true,
    },
    global: {
      plugins: [vuetify],
    },
    attachTo: document.body,
  })
}

test('renderiza o formulário', () => {
  const wrapper = criarWrapper()

  expect(wrapper.exists()).toBe(true)
})

test('exibe o título do formulário', () => {
  criarWrapper()

  expect(document.body.textContent).toContain('Nova tarefa')
})

test('emite o evento salvar', () => {
  const wrapper = criarWrapper()

  wrapper.vm.$emit('salvar')

  expect(wrapper.emitted('salvar')).toBeTruthy()
})