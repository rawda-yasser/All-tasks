<script setup>
import { onMounted, ref, computed } from 'vue'
import { allTasks, createTask, updateTask, completeTask, removeTask } from '../http/task-api'
import { useTaskStore } from '../stores/task'
import { storeToRefs } from 'pinia'
import Tasks from '../components/tasks/Tasks.vue'
import NewTask from '../components/tasks/NewTask.vue'
const store = useTaskStore()
const { completedTasks, uncompletedTasks } = storeToRefs(store)
// store.$patch({
//   task: {
//     title: 'Task updated',
//     is_completed: true
//   }
// })
const tasks = ref([])

onMounted(async () => {
  await store.fetchAllTasks()
})
// const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed))
// const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed))
const showToggleCompletedBtn = computed(
  () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
)
const completedTasksIsEmpty = computed(
  () => uncompletedTasks.value.length === 0 && completedTasks.value.length === 0
)
const showCompletedTasks = ref(false)
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
const handleCompletedTask = async (task) => {
  const { data: updatedTask } = await completeTask(task.id, {
    is_completed: task.is_completed
  })
  const currentTask = tasks.value.find((item) => item.id === task.id)
  currentTask.is_completed = updatedTask.data.is_completed
}
const handleRemoveTask = async (task) => {
  await removeTask(task.id)
  const taskIndex = tasks.value.findIndex((item) => item.id === task.id)
  tasks.value.splice(taskIndex, 1)
}
</script>

<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAddedTask" />
          <!-- List of uncompleted tasks -->
          <Tasks
            :tasks="uncompletedTasks"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemoveTask"
          />
          <!-- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <button
              class="btn btn-sm btn-secondary"
              @click="showCompletedTasks = !showCompletedTasks"
            >
              <span v-if="!showCompletedTasks">Show Completed</span>
              <span v-else>Hide Completed</span>
            </button>
          </div>
          <!-- show a list of completed tasks -->
          <Tasks
            :tasks="completedTasks"
            v-show="showCompletedTasks"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemoveTask"
          />
        </div>
      </div>
    </div>
  </main>
</template>
