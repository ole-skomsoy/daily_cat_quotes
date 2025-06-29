<script setup>
  import { ref } from 'vue'
  const greeting = ref('Hello World!')
</script>

<template>
    <div class="navbar-wrapper">
        <div class="navbar">    
            <p class="title">
                Daily Cat Quotes
            </p>
        </div>
    </div>
</template>

<style>
.title {
    color: white;
    font-weight: bold;
    font-family: Monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 42px;
    margin: auto;
}
.navbar-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;
}
.navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0;
}
</style>