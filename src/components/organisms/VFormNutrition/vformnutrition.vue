<script lang="ts" setup>
const nutritionStore = useNutritionStore()
const { t } = useI18n()

const isAnalyzeDisabled = computed(() => {
  return nutritionStore.inputs
    .map(item => item.some(el => !el.value))
    .every(el => el === false)
})
</script>

<template>
  <div class="flex flex-col">
    <div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex justify-end mt-5">
          <ElButton
            class="px-4 py-2 text-sm bg-sky-500 text-white rounded-none shadow-sm"
            type="primary"
            plain
            @click="nutritionStore.addRow()"
          >
            {{ t("form.new-ingredient") }}
          </ElButton>
        </div>

        <div
          class="mx-0.5 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="title in nutritionStore.inputsTitle"
                  :key="title"
                  scope="col"
                  class="px-2 py-2 text-left text-10px font-medium text-gray-500 uppercase tracking-wider sm:text-xs sm:px-6 py-3 text-left"
                >
                  <span>{{ title }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(row, rowIndex) in nutritionStore.inputs"
                :key="rowIndex"
                class="hover:bg-slate-50 transition-transform"
              >
                <td
                  v-for="(input, inputIndex) in row"
                  :key="inputIndex"
                  class="px-2 py-2 text-lef sm:px-4 py-3"
                >
                  <Vinput
                    v-model="input.value"
                    :type="input.type"
                    :placeholder="t('form.name')"
                  />
                </td>
                <td class="text-center">
                  <ElButton
                    class="my-3 mx-1"
                    size="small"
                    type="danger"
                    plain
                    :disabled="nutritionStore.inputs.length === 1"
                    @click="nutritionStore.openDeleteDialog(row)"
                  >
                    🗑️
                  </ElButton>
                </td>
              </tr>
            </tbody>
          </table>
          <Vdialogremove />
        </div>
      </div>
    </div>
    <div>
      <el-button
        v-if="isAnalyzeDisabled"
        class="bg-#909399 mt"
        type="info"
        @click="nutritionStore.getNutritionData()"
      >
        {{ t("button.analyze") }}
      </el-button>
      <el-button v-else disabled type="info" class="mt">
        {{ t("button.analyze") }}
      </el-button>
      <el-button class="mt" @click="nutritionStore.newRecipe()">
        {{ t("button.new-recipe") }}
      </el-button>
    </div>
  </div>
</template>
