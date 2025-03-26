<template>
  <div class="absolute inset-0 -z-10 h-full min-h-screen overflow-hidden">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
    <div class="blob blob-5"></div>
  </div>
</template>

<style scoped>
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(500px);
  opacity: 0.4;
}

.blob-1 {
  width: 800px;
  height: 300px;
  background: radial-gradient(circle, #a8e6cf, #dcedc1);
  top: 0;
  left: 0;
}

.blob-2 {
  width: 1000px;
  height: 250px;
  background: radial-gradient(circle, #004d00, #001a00);
  top: 0;
  right: 0;
}

.blob-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #ff9a8b, #ff6a88);
  bottom: 0;
  left: 0;
}

.blob-4 {
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, #fdbb2d, #22c1c3);
  bottom: 0;
  right: 0;
}

.blob-5 {
  width: 2000px;
  height: 350px;
  background: radial-gradient(circle, #00c6ff, #0072ff);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
