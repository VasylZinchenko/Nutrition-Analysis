<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

function toggleLocales() {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const nextLang = computed(() => (locale.value === 'en' ? 'укр' : 'en'))
</script>

<template>
  <div
    class="flex justify-around items-center v-navbar h-14 space-x-10 bg-gradient-to-r from-cyan-500 to-blue-500"
  >
    <div class="flex gap-10">
      <RouterLink :to="{ name: 'home.index' }">
        {{ t("menu.home") }}
      </RouterLink>
      <RouterLink :to="{ name: 'nutrition-analysis.index' }">
        {{ t("menu.nutrition-analysis") }}
      </RouterLink>
    </div>
    <ElButton type="primary" @click="toggleLocales">
      {{ nextLang }}
    </ElButton>
  </div>
</template>

<style lang="scss">
.v-navbar {
  text-align: center;
}

.active-nav-link {
  color: white;
  border-bottom: 2px solid white;
}
</style>
