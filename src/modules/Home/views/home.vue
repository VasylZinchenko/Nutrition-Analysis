<script lang="ts" setup>
const commonStore = useCommonStore()
const { t } = useI18n()

onMounted(() => {
  commonStore.setTitle('Home')
})
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <div>
      <p class="mt-10">
        {{ t("text.home-first-p") }}
      </p>
      <p>
        {{ t("text.home-second-p")
        }}<RouterLink
          :to="{ name: 'nutrition-analysis.index' }"
          class="text-cyan-500"
        >
          {{ t("menu.nutrition-analysis") }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>
