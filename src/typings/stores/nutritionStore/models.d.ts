export interface Input {
  title: string
  type: 'number' | 'text' | 'select'
  value: number | string
  placeholder?: string
}

export type Inputs = Input[]

export interface Nutrient {
  id: number
  atr: string
  label: string
  unit: string
  daily: number
}

export interface Food {
  [key: string]: Nutrient
}

export type FoodArray = Food[]
 