<template>
  <div>
    {{ count }}
    <button @click="onClick"></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref();
const onClick = () => {
  count.value += 1;
};
</script>

<!-- <style lang="" scoped></style> -->
