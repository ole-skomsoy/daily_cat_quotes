<script setup>
  import { ref } from 'vue'
  const greeting = ref('Hello World!')
</script>

<template>
    <div class="navbar-wrapper">
        <div class="navbar">    
            <p class="title">
                Daily Cat Quote
            </p>
        </div>
    </div>
</template>

<style>
.title { 
    font-weight: bold;
    font-weight: 400;
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