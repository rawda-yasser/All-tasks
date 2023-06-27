<template>
  <div class="container py-5">
    <h1>404</h1>
    <p>
      Sorry, this page <code>{{ $route.params.notFound }}</code> you're looking for doesn't exist.
    </p>
    <router-link :to="{ name: 'tasks' }">Back to your tasks</router-link>
  </div>
</template>
