<script setup>
    import { ref, onMounted, onUnmounted, reactive, computed, watch, watchEffect, onBeforeUnmount } from 'vue';

    let cat_time_hours = ref(null);
    let cat_time_minutes = ref(null);
    let cat_time = new Date();
    
    let interval_id = 0;
    let hours_left = 0;
    let minutes_left = 0;
    let seconds_left = 0;

    let next_cat_time = computed(() => {
        const time = new Date();
        time.setDate(time.getDate() + 1);
        time.setHours(localStorage.cat_time_hours | 12);
        time.setMinutes(localStorage.cat_time_minutes | 0);
        time.setSeconds(0)
        return time;
    });

    onMounted(() => {;
        setup_watchers();
        setup_settings();
        setup_interval();
    })

    onUnmounted(() => {
      cancelAnimationFrame(handle)
    });

    onBeforeUnmount(() => {
        clearInterval(interval_id);
    });

    function setup_watchers() {
        watch(cat_time_hours, (newSettings) =>  {
            try {
                localStorage.cat_time_hours = newSettings.cat_time_hours;
            } catch (error) {
                console.log('Error updating setting: cat_time_hours', error);
            }
        });
        watch(cat_time_minutes, (newSettings) =>  {
            try {
                localStorage.cat_time_minutes = newSettings.cat_time_minutes;
            } catch (error) {
                console.log('Error updating setting: cat_time_minutes', error);
            }
        });
    }

    function setup_settings() {
            if(!(localStorage.cat_time_hours && localStorage.cat_time_minutes)) {
                localStorage.cat_time_hours = 12;
                localStorage.cat_time_minutes = 0;
                cat_time_hours = 12;
                cat_time_minutes = 0;
            } else {
                cat_time_hours = localStorage.cat_time_hours;
                cat_time_minutes = localStorage.cat_time_minutes;
            }
        }

    function setup_interval() {
        interval_id = setInterval(() => {
            console.log('Next cat time', next_cat_time);

            // check if cat time has passed
            if (next_cat_time <= new Date()) {
                increment_cat_timer(cat_time);
                console.log('> Next cat timer(2): ', cat_time);
                // return;
            }
            
            console.log(next_cat_time.value, new Date())
            seconds_left = seconds_between_dates(next_cat_time.value, new Date())
            minutes_left = Math.floor(seconds_left / 60);
            hours_left = Math.floor(seconds_left / 3600);
            
            console.log('> seconds left: ', seconds_left);
        }, 1000);
    }

    function increment_cat_timer() {
        next_cat_time = new Date();
        next_cat_time.setDate(next_cat_time.getDate() + 1);
        next_cat_time.setHours(localStorage.cat_time_hours);
        cat_time.setMinutes(localStorage.cat_time_minutes);
        return cat_time;
    }

    // expecting first to be smaller than second
    function seconds_between_dates(date1, date2) {
        const time1InMs = date1.getTime();
        const time2InMs = date2.getTime();
        const diffInMs = Math.abs(time2InMs - time1InMs);
        const diffInSeconds = diffInMs / 1000;
        return diffInSeconds;
    }

    function emit_in_5_sec() {
        console.log('>>> Emitting in 5 seconds');
    }
</script>

<template>
    <div>
      <select class="hour_dropdown" v-bind:value="cat_time_hours" v-model="cat_time_hours">
        <option v-for="hour in 24" :key="index" :value="hour">
            {{hour}}
        </option>
      </select>
      <select class="minutes_dropdown" v-bind:value="cat_time_minutes" v-model="cat_time_minutes">
        <option  value="0">0</option>
        <option v-for="minutes in 60" :key="index" :value="minutes">
            {{minutes}}
        </option>
      </select>
    </div>
    <div>
        <!-- <vue-countdown :time="1 * 24 * 60 * 60 * 1000" v-slot="{ hours_left, minutes_left, seconds_left }">
            Time Remaining：{{ hours_left | 0 }} hours, {{ minutes_left | 0 }} minutes, {{ seconds_left | 0 }} seconds.
        </vue-countdown> -->
        <br>
        <br>
        <div>
            <span>Hours: {{hours_left }}</span> - <span>Minutes: {{hours_left }}</span> - <span>Seconds: {{seconds_left }}</span>
        </div>
        <div>
            <span>Next quote: {{ next_cat_time }}</span>
        </div>
        <button @click="emit_in_5_sec">
            T - 5 seconds
        </button>
        <div>{{ cat_time_hours }}</div>
        <div>{{ cat_time_minutes }}</div>
    </div>
</template>

<style>
</style>