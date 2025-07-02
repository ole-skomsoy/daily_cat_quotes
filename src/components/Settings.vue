<script setup>
    import { ref, onMounted, onUnmounted, reactive, computed, watch, watchEffect } from 'vue';
    let settings = reactive({
        cat_time_hours: ref(12),
        cat_time_minutes: ref(0)
    });

    const cat_time_hours = computed(() => localStorage.cat_time_hours);
    const cat_time_minutes = computed(() => localStorage.cat_time_minutes);

    onMounted(() => {;
        setup_settings();
        setup_watchers();
        watchEffect(async () => {
        });
    })

    onUnmounted(() => {
      cancelAnimationFrame(handle)
    });

    function setup_settings() {
        if(!(localStorage.cat_time_hours && localStorage.cat_time_minutes)) {
            localStorage.cat_time_hours =  12;
            localStorage.cat_time_minutes = 0;
            settings.cat_time_hours = localStorage.cat_time_hours;
            settings.cat_time_minutes = localStorage.cat_time_minutes;
        } else {
            settings.cat_time_hours = localStorage.cat_time_hours;
            settings.cat_time_minutes = localStorage.cat_time_minutes;
        }
        console.log(localStorage);
    }

    function setup_watchers() {
        watch(settings, (newSettings, oldSettings) =>  {
            try {
                localStorage.cat_time_hours = newSettings.cat_time_hours;
                localStorage.cat_time_minutes = newSettings.cat_time_minutes;
            } catch (error) {
                console.log('Error updating settings', error);
            }
        });
    }

    function get_cat_time() {
        next_cat_timer = new Date();
        // next_cat_timer.setDate(next_cat_timer.getDate() + 1);
        next_cat_timer.setDate(next_cat_timer.getDate());
        next_cat_timer.setMinutes(15);
        return next_cat_timer;
    }

    function seconds_between_dates(date1, date2) {
        const time1InMs = date1.getTime();
        const time2InMs = date2.getTime();
        const diffInMs = Math.abs(time2InMs - time1InMs);
        const diffInSeconds = diffInMs / 1000;
        return diffInSeconds;
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
    <vue-countdown :time="1 * cat_time_hours * cat_time_minutes * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
        Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
    </vue-countdown>
    </div>
</template>

<style>
</style>