<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-center">
      <input
        class="form-check-input mt-0"
        :class="completedClass"
        type="checkbox"
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
            @keyup.esc="isEdit = false"
            @keyup.enter="updateTask"
          />
        </div>
        <span v-else>{{ task.title }}</span>
      </div>
      <!-- <div class="task-date">24 Feb 12:00</div> -->
      <TaskActions @edit="isEdit = true" v-show="!isEdit" />
    </div>
  </li>
</template>
<script setup>
import { computed, ref } from 'vue'
import TaskActions from './TaskActions.vue'
const emit = defineEmits(['updated'])
const props = defineProps({
  task: Object
})
const completedClass = computed(() => (props.task.is_completed ? 'completed' : ''))
const isEdit = ref(false)
const vFocus = {
  mounted: (el) => el.focus()
}
const updateTask = (event) => {
  const updatedTask = {
    ...props.task,
    title: event.target.value
  }
  isEdit.value = false
  emit('updated', updatedTask)
}
</script>
