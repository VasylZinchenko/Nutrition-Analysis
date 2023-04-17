<script lang="ts" setup>
import { onMounted } from 'vue'
const commonStore = useCommonStore()
const { t } = useI18n()

onMounted(() => {
  commonStore.setTitle('Nutrition Analysis')
})
</script>

<template>
  <div class="container mx-auto px-5 mt-10 max-w-4xl sm:px-16">
    <p class="text-center">
      {{ t('text.first-paragraph') }}
      <span class="text-emerald-600"> {{ t('text.example') }}</span>, {{ t('text.etc') }}.
      <br>
      {{ t('text.last-paragraph') }}
    </p>
    <Vformnutrition />
    <Vcaloriestable />
  </div>
</template>

<style scoped></style>
