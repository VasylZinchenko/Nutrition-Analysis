<script lang="ts" setup>
const nutritionStore = useNutritionStore()
const { t } = useI18n()
</script>

<template>
  <div class="w-250px md:max-w-400px">
    <el-dialog
      v-model="nutritionStore.isDialogVisible"
      align-center
      width="70%"
      class="md:max-w-400px"
    >
      <span class="text-base">{{ t("text.confirm-message") }}</span>
      <template #footer>
        <span class="dialog-footer">
          <ElButton
            class="bg-#e6a23c"
            type="warning"
            @click="nutritionStore.isDialogVisible = false"
          >
            {{ t("button.cancel") }}
          </ElButton>
          <ElButton
            class="bg-#67c23a"
            type="success"
            @click="nutritionStore.deleteRow()"
          >
            {{ t("button.confirm") }}
          </ElButton>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
