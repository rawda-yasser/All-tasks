import { defineStore } from 'pinia'
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    task: {
      id: 1,
      title: 'First Task',
      is_completed: false
    }
  })
})
