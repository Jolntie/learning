<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.26);
  background-color: white;
  padding: 1rem;
  margin: 2rem auto;
  width: 40rem;
}
</style>
