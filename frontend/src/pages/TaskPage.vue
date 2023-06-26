<script setup>
import { onMounted, ref } from 'vue'
import { allTasks } from '../http/task-api'
import Tasks from '../components/tasks/Tasks.vue'
const tasks = ref([])
onMounted(async () => {
  const { data } = await allTasks()
  tasks.value = data.data
})
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
          <Tasks :tasks="tasks" />
          <!-- show toggle button -->
          <!-- show a list of completed tasks -->
        </div>
      </div>
    </div>
  </main>
</template>
