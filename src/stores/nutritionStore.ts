import { acceptHMRUpdate, defineStore } from 'pinia'
import { API_NUTRITION } from '@/constants/nutritionConstant'
import type {
  FoodArray,
  Input,
  Inputs,
  Nutrient,
} from '@/typings/stores/nutritionStore/models'
import { InputType, enumNtrCode } from '@/enums/nutritionsEnum'

export const useNutritionStore = defineStore('nutritionStore', () => {
  const { t } = useI18n()
  const nutritionData = ref<FoodArray>([])
  const isFetching = ref<boolean>(false)
  const isError = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const appId = ref<string>('c3f1b30d')
  const appKey = ref<string>('25a039022fdcd48ab44207c06c60e33c')
  const calories = ref<number | null>(null)
  const isDialogVisible = ref(false)
  const currentIngredient = ref(null)

  const inputsTitle = computed<string[]>(() => {
    return [
      t('form.count'),
      t('form.measuring-unit'),
      t('form.food'),
      t('form.action'),
    ]
  })

  const initialInputs = (): Input[] => {
    return [
      {
        title: `${t('form.count')}`,
        type: InputType.NUMBER,
        placeholder: '',
        value: 1,
      },
      {
        title: `${t('form.measuring-unit')}`,
        value: '',
        type: InputType.SELECT,
      },
      {
        title: `${t('form.food')}`,
        type: InputType.TEXT,
        value: '',
      },
    ]
  }

  const inputs = ref<Inputs[]>([initialInputs()])

  function openDeleteDialog(ing) {
    isDialogVisible.value = true
    currentIngredient.value = ing
  }

  const deleteRow = () => {
    isDialogVisible.value = false
    inputs.value = inputs.value.filter(
      input => input !== currentIngredient.value,
    )
  }

  function addRow() {
    inputs.value.push(initialInputs())
  }

  function newRecipe() {
    inputs.value = [initialInputs()]
    nutritionData.value = []
  }

  const requests = computed(() =>
    inputs.value
      .map(subArr => subArr.map(obj => obj.value).join(' '))
      .map(
        ingr =>
          `https://api.edamam.com/${API_NUTRITION}?app_id=${appId.value}&app_key=${appKey.value}&nutrition-type=cooking&ingr=${ingr}`,
      ),
  )

  async function getNutritionData() {
    isFetching.value = true

    try {
      const responses = await Promise.all(
        requests.value.map(url => fetch(url)),
      )

      const data = await Promise.all(
        responses.map(response => response.json()),
      )

      nutritionData.value = data.map(el => el.totalNutrients)
      calories.value = data.map(el => el.calories).reduce((a, b) => a + b)
      isFetching.value = false
      isError.value = false
    }
    catch (error: any) {
      isError.value = true
      errorMessage.value
        = `${t('error.error')}: ${error.message}` || t('error.uknown-error')
      setTimeout(() => {
        isError.value = false
      }, 5000)
    }
  }

  const nutrients = computed<Nutrient[]>(() => {
    return [
      {
        id: 1,
        atr: enumNtrCode.FAT,
        label: t('table.total-fat'),
        unit: 'g',
        daily: 78,
      },
      {
        id: 2,
        atr: enumNtrCode.FASAT,
        label: t('table.saturated-fat'),
        unit: 'g',
        daily: 20,
      },
      {
        id: 3,
        atr: enumNtrCode.FATRN,
        label: t('table.trans-fat'),
        unit: 'g',
        daily: 2.5,
      },
      {
        id: 4,
        atr: enumNtrCode.CHOLE,
        label: t('table.cholesterol'),
        unit: 'mg',
        daily: 300,
      },
      {
        id: 5,
        atr: enumNtrCode.NA,
        label: t('table.sodium'),
        unit: 'mg',
        daily: 2300,
      },
      {
        id: 6,
        atr: enumNtrCode.CHOCDF,
        label: t('table.total-carbohydrate'),
        unit: 'g',
        daily: 300,
      },
      {
        id: 7,
        atr: enumNtrCode.FIBTG,
        label: t('table.dietary-fiber'),
        unit: 'g',
        daily: 28,
      },
      {
        id: 8,
        atr: enumNtrCode.SUGAR,
        label: t('table.total-sugars'),
        unit: 'g',
        daily: 50,
      },
      {
        id: 9,
        atr: enumNtrCode.PROCNT,
        label: t('table.protein'),
        unit: 'g',
        daily: 50,
      },
      {
        id: 10,
        atr: enumNtrCode.VITD,
        label: t('table.vitamin-d'),
        unit: 'µg',
        daily: 20,
      },
      {
        id: 11,
        atr: enumNtrCode.CA,
        label: t('table.calcium'),
        unit: 'mg',
        daily: 1300,
      },
      {
        id: 12,
        atr: enumNtrCode.FE,
        label: t('table.iron'),
        unit: 'mg',
        daily: 18,
      },
      {
        id: 13,
        atr: enumNtrCode.K,
        label: 'table.potassium',
        unit: 'mg',
        daily: 4700,
      },
    ]
  })

  const getTotalNutrientsWeight = computed(() => {
    if (nutritionData.value) {
      return nutrients.value.map((nutrient) => {
        return nutritionData.value
          .map((el: { quantity?: number }): number => {
            return el[nutrient.atr] ? el[nutrient.atr].quantity : 0
          })
          .reduce((a: number, b: number) => a + b, 0)
          .toFixed(1)
      })
    }
    else {
      return '0'
    }
  })

  const options = ref<string[]>([
    'gram',
    'ounce',
    'kilogram',
    'pound',
    'milligram',
    'microgram',
    'metric ton',
    'short ton',
    'long ton',
    'liter',
    'milliliter',
    'fluid ounce',
    'teaspoon',
    'tablespoon',
    'cup',
    'pint',
    'quart',
    'gallon',
    'unit',
    'clove',
    'pinch',
    'slice',
    'small',
    'medium',
    'large',
    'whole',
    'can',
    'bottle',
    'package',
    'serving',
    'piece',
    'filet',
    'breast',
    'leg',
    'thigh',
    'wing',
    'drumstick',
    'rack',
    'rib',
    'steak',
    'fillet',
    'g',
    'mg',
    'mcg',
    'mt',
    'st',
    'lt',
    'oz',
    'l',
    'ml',
    'fl',
    'tsp',
    'tbsp',
  ])

  return {
    getNutritionData,
    initialInputs,
    openDeleteDialog,
    deleteRow,
    addRow,
    newRecipe,
    getTotalNutrientsWeight,
    isDialogVisible,
    currentIngredient,
    nutritionData,
    inputs,
    nutrients,
    calories,
    errorMessage,
    isError,
    isFetching,
    requests,
    options,
    inputsTitle,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNutritionStore, import.meta.hot))
