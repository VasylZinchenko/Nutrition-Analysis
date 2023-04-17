<script lang="ts" setup>
import { useNutritionStore } from '@/stores/nutritionStore'
const { t } = useI18n()

const nutritionStore = useNutritionStore()
</script>

<template>
  <div v-loading="nutritionStore.isFetching">
    <div v-if="nutritionStore.nutritionData.length !== 0" class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg max-w-md py-5 px-10 mt-5 m-auto"
          >
            <h2 class="text-3xl font-bold border-b-5">
              {{ t("table.nutrition-facts") }}
            </h2>
            <p class="font-bold">
              {{ t("table.amount-per-serving") }}
            </p>
            <h3 class="text-4xl font-bold border-b-3">
              {{ t("table.calories") }}:
              {{ nutritionStore.calories }}
            </h3>
            <div
              v-for="(nutrient, index) in nutritionStore.nutrients"
              :key="nutrient.id"
              class="flex justify-between border-b border-indigo-100"
            >
              <div>
                {{ nutrient.label }}:
                {{ nutritionStore.getTotalNutrientsWeight[index] }}
                {{ nutrient.unit }}
              </div>
              <div>
                {{
                  Math.round((+nutritionStore.getTotalNutrientsWeight[index] * 100) / nutrient.daily)
                }}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Transition>
      <p
        v-if="nutritionStore.isError"
        class="mx-1 text-center text-red-500 font-semibold mt-10"
      >
        {{ nutritionStore.errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
