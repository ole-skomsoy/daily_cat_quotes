<script setup>
  import { ref } from 'vue'
  const greeting = ref('Hello World!')
  const IS_DOG = false;
</script>

<template>
    <div class="navbar-wrapper">
        <div class="navbar">    
            <p v-if="IS_DOG" class="title">
                Daily Dog Quote
            </p>
            <p v-if="!IS_DOG" class="title">
                Daily Cat Quote
            </p>
        </div>
    </div>
</template>

<style>
.title {
    text-decoration: underline;
    font-weight: bold;
    font-weight: 400;
    font-size: 24px;
    margin: auto;
}
.navbar-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;
}
.navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0;
}
</style>