<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTaskStore } from '../stores/task'
import { storeToRefs } from 'pinia'
import Tasks from '../components/tasks/Tasks.vue'
import NewTask from '../components/tasks/NewTask.vue'
const store = useTaskStore()
const { fetchAllTasks } = store
const { completedTasks, uncompletedTasks } = storeToRefs(store)
// store.$patch({
//   task: {
//     title: 'Task updated',
//     is_completed: true
//   }
// })
const tasks = ref([])

onMounted(async () => {
  await fetchAllTasks()
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
</script>

<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask />
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
