<script setup>
import { onMounted, ref, computed } from 'vue'
import { allTasks } from '../http/task-api'
import Tasks from '../components/tasks/Tasks.vue'
const tasks = ref([])
onMounted(async () => {
  const { data } = await allTasks()
  tasks.value = data.data
})
const completedTasks = computed(() => tasks.value.filter((task) => task.is_completed))
const uncompletedTasks = computed(() => tasks.value.filter((task) => !task.is_completed))
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
          <div class="relative">
            <input
              type="text"
              class="form-control form-control-lg padding-right-lg"
              placeholder="+ Add new task. Press enter to save."
            />
          </div>
          <!-- List of uncompleted tasks -->
          <Tasks :tasks="uncompletedTasks" />
          <!-- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <button
              class="btn btn-sm btn-secondary"
              @click="showCompletedTasks = !showCompletedTasks"
            >
              <span v-if="!showCompletedTasks">Show Completed</span>
              <span v-else>Show Uncompleted</span>
            </button>
          </div>
          <!-- show a list of completed tasks -->
          <Tasks :tasks="completedTasks" v-show="showCompletedTasks" />
        </div>
      </div>
    </div>
  </main>
</template>
