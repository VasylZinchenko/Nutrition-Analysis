<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue'
const props = defineProps<Props>()
defineEmits(['update:modelValue'])
const { t } = useI18n()
const nutritionStore = useNutritionStore()

interface Props {
  type: string
  placeholder: string
  modelValue: string | number
}

const { type, placeholder, modelValue } = toRefs(props)

const validatedModelValue = computed(() => {
  if (type?.value === 'number') {
    const value = modelValue.value
    if (+value < 0)
      return -modelValue.value
    return value
  }
  return modelValue.value
})
</script>

<template>
  <div>
    <input
      v-if="type !== 'select'"
      :value="validatedModelValue"
      :type="type"
      :min="1"
      name="quantity"
      class="text-xs px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-200 block w-full sm:text-sm border-gray-300 rounded-md"
      :placeholder="type === 'text' ? placeholder : 'number'"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >

    <select
      v-else
      :value="modelValue"
      name="unit"
      class="text-xs px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
      :placeholder="placeholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >
      <option value="" disabled>
        {{ t("form.choose-a-unit") }}
      </option>
      <option
        v-for="option in nutritionStore.options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>
