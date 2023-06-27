import { defineStore } from 'pinia'
import { allTasks } from '../http/task-api'
import { reactive, ref, computed } from 'vue'
const tmp = {
  state: () => ({
    tasks: [],
    task: {
      id: 1,
      title: 'First Task',
      is_completed: false
    }
  }),
  getters: {},
  actions: {}
}
export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed))
  const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed))
  const fetchAllTasks = async () => {
    const { data } = await allTasks()
    tasks.value = data.data
  }
  return { tasks, completedTasks, uncompletedTasks, fetchAllTasks }
})
