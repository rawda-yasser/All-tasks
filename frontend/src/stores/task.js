import { defineStore } from 'pinia'
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: 'First Task',
        is_completed: false
      },
      {
        id: 2,
        title: 'Second Task',
        is_completed: true
      }
    ],
    task: {
      id: 1,
      title: 'First Task',
      is_completed: false
    }
  }),
  getters: {
    completedTasks: (state) => state.tasks.filter((task) => task.is_completed),
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.is_completed)
    }
  }
})
