<template>
  <div class="toast-wrapper">
    <div class="toast">
      You must enter a value for the todo
    </div>
  </div>
</template>

<style>
.toast-wrapper {
  position: fixed;
  z-index: 999;
  width: 100%;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
}
.toast {
  padding: 20px;
  color: white;
  background: #ff0062;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 0 auto;
}
</style>
