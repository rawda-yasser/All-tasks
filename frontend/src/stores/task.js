import { defineStore } from 'pinia'
import { allTasks, completeTask, createTask, removeTask, updateTask } from '../http/task-api'
import { ref, computed } from 'vue'

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

  const handleUpdatedTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, {
      title: task.title
    })

    const currentTask = tasks.value.find((item) => item.id === task.id)
    currentTask.title = updatedTask.data.title
  }
  const handleRemoveTask = async (task) => {
    await removeTask(task.id)
    const taskIndex = tasks.value.findIndex((item) => item.id === task.id)
    tasks.value.splice(taskIndex, 1)
  }
  const handleCompletedTask = async (task) => {
    const { data: updatedTask } = await completeTask(task.id, {
      is_completed: task.is_completed
    })
    const currentTask = tasks.value.find((item) => item.id === task.id)
    currentTask.is_completed = updatedTask.data.is_completed
  }
  return {
    tasks,
    completedTasks,
    uncompletedTasks,
    fetchAllTasks,
    handleAddedTask,
    handleCompletedTask,
    handleUpdatedTask,
    handleRemoveTask
  }
})
