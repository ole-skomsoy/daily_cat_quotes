<script setup>
    import { ref, onMounted, reactive, computed, watch } from 'vue';
    
    let settings = reactive({
        cat_time_hours: ref(12),
        cat_time_minutes: ref(0)
    });

    onMounted(() => {;
        setup_settings();
        setup_watcher();
    })

    function setup_settings() {
        if(!(localStorage.cat_time_hours && localStorage.cat_time_minutes)) {
            console.log('No settings in localstorage, setting default');
            localStorage.cat_time_hours =  12;
            localStorage.cat_time_minutes = 0;
            settings.cat_time_hours = localStorage.cat_time_hours;
            settings.cat_time_minutes = localStorage.cat_time_minutes;
        } else {
            console.log('AHDODASDd');
            settings.cat_time_hours = localStorage.cat_time_hours;
            settings.cat_time_minutes = localStorage.cat_time_minutes;
        }
        console.log(localStorage);
    }

    function setup_watcher() {
        watch(settings, (newSettings, oldSettings) =>  {
            console.log('Settings updated', newSettings, oldSettings);
            try {
                localStorage.cat_time_hours = newSettings.cat_time_hours;
                localStorage.cat_time_minutes = newSettings.cat_time_minutes;
                console.log('> Updating settings', newSettings, oldSettings);
            } catch (error) {
                console.log('Error updating settings', error);
            }
        });
    }
</script>

<template>
    <div>
      <select class="hour_dropdown" v-bind:value="settings.cat_time_hours" v-model="settings.cat_time_hours">
        <option v-for="hour in 24" :key="index" :value="hour">
            {{hour}}
        </option>
      </select>
      <select class="minutes_dropdown" v-bind:value="settings.cat_time_minutes" v-model="settings.cat_time_minutes">
        <option  value="0">0</option>
        <option v-for="minutes in 60" :key="index" :value="minutes">
            {{minutes}}
        </option>
      </select>
    </div>
</template>

<style>
</style>