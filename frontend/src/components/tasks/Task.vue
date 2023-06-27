<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        :class="completedClass"
        type="checkbox"
        @change="markTaskCompleted"
        :checked="task.is_completed"
      />
      <div
        class="ms-2 flex-grow-1"
        @dblclick="isEdit = true"
        title="Double click the text to edit or remove"
        :class="completedClass"
      >
        <div class="relative" v-if="isEdit">
          <input
            class="editable-task"
            type="text"
            v-focus
            @keyup.esc="undo"
            @keyup.enter="updateTask"
            v-model="editingTask"
          />
        </div>
        <span v-else>{{ task.title }}</span>
      </div>
      <!-- <div class="task-date">24 Feb 12:00</div> -->
      <TaskActions @edit="isEdit = true" v-show="!isEdit" @removed="deleteTask" />
    </div>
  </li>
</template>
<script setup>
import { computed, ref } from 'vue'
import TaskActions from './TaskActions.vue'
import { useTaskStore } from '../../stores/task'
const { handleCompletedTask, handleRemoveTask, handleUpdatedTask } = useTaskStore()
const props = defineProps({
  task: Object
})
const editingTask = ref(props.task.title)
const completedClass = computed(() => (props.task.is_completed ? 'completed' : ''))
const isEdit = ref(false)
const vFocus = {
  mounted: (el) => el.focus()
}
const updateTask = async (event) => {
  const updatedTask = {
    ...props.task,
    title: event.target.value
  }
  isEdit.value = false
  await handleUpdatedTask(updatedTask)
}
const markTaskCompleted = async () => {
  const updatedTask = {
    ...props.task,
    is_completed: !props.task.is_completed
  }

  await handleCompletedTask(updatedTask)
}
const deleteTask = async () => {
  if (confirm('Are you sure?')) {
    await handleRemoveTask(props.task)
  }
}
const undo = () => {
  isEdit.value = false
  editingTask.value = props.task.title
}
</script>
