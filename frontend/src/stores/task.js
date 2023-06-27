import { defineStore } from 'pinia'
import { allTasks, createTask } from '../http/task-api'
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
  const handleAddedTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask)
    tasks.value.unshift(createdTask.data)
  }
  return { tasks, completedTasks, uncompletedTasks, fetchAllTasks, handleAddedTask }
})
