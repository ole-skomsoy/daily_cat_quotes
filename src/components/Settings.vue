<script setup>
    import { ref, onMounted, reactive, computed } from 'vue';
    
    let settings = reactive({
        cat_time_hours: ref(12),
        cat_time_minutes: ref(0)
    });

    onMounted(() => {;
        setup_settings();
    })

    function setup_settings() {
        if(localStorage.cat_time) {
            settings.cat_time_hours = localStorage.cat_time_hours;
        } else {
            settings.cat_time_hours = 12;
            settings.cat_time_minutes = 0;
            localStorage.cat_time_hours = settings.cat_time_hours;
            localStorage.cat_time_minutes = settings.cat_time_minutes;
        }
        console.log(settings);
    }
</script>

<template>
    <div>
      <select class="hour_dropdown" v-bind:value="settings.cat_time_hours">
        <option v-for="hour in 24" :key="index" :value="hour">{{hour}}</option>
      </select>
      <select class="minutes_dropdown" v-bind:value="settings.cat_time_minutes">
        <option  value="0">0</option>
        <option v-for="minutes in 60" :key="index" :value="minutes">{{minutes}}</option>
      </select>
    </div>
</template>

<style>
</style>