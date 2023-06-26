<script setup>
import EditIcon from '../icons/EditIcon.vue'
import DeleteIcon from '../icons/DeleteIcon.vue'
</script>
<template>
  <div class="task-actions">
    <button class="btn btn-sm btn-circle btn-outline-secondary me-1">
      <EditIcon />
    </button>
    <button class="btn btn-sm btn-circle btn-outline-danger">
      <DeleteIcon />
    </button>
  </div>
</template>
