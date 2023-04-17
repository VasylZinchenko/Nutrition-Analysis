const routes: {}[] = [
  {
    path: '/nutrition-analysis',
    name: 'nutrition-analysis.index',
    component: (): Promise<any> => {
      return new Promise((resolve, reject) => {
        resolve(import('./views/NutritionAnalysis.vue'))
        reject(new Error('Failed to load page'))
      })
    },
  },
]

export default routes
