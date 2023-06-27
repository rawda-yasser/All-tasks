<template>
  <div class="relative">
    <input
      type="text"
      class="form-control form-control-lg padding-right-lg"
      placeholder="+ Add new task. Press enter to save."
      @keydown.enter="addNewTask"
    />
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useTaskStore } from '../../stores/task'
const { handleAddedTask } = useTaskStore()
const newTask = reactive({
  title: '',
  is_completed: false
})

const addNewTask = async (event) => {
  if (event.target.value.trim) {
    newTask.title = event.target.value
    event.target.value = ''
    await handleAddedTask(newTask)
  }
}
</script>
