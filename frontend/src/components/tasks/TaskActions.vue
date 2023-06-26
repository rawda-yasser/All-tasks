<script setup>
import EditIcon from '../icons/EditIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
const emit = defineEmits(['edit', 'remove'])
</script>
<template>
  <div class="task-actions">
    <button
      class="btn btn-sm btn-circle btn-outline-secondary me-1"
      @click="($event) => emit('edit')"
    >
      <EditIcon />
    </button>
    <button class="btn btn-sm btn-circle btn-outline-danger" @click="($event) => emit('removed')">
      <DeleteIcon />
    </button>
  </div>
</template>
