<script setup>
    import { ref, onMounted, onUnmounted, reactive, computed, watch, watchEffect, onBeforeUnmount } from 'vue';
    let settings = reactive({
        // cat_time_hours: ref(12),
        // cat_time_minutes: ref(0)
        cat_time_hours: ref(12),
        cat_time_minutes: ref(0)
    });

    var next_cat_timer = new Date();
    let cat_time_hours = computed(() => localStorage.cat_time_hours | hour);
    let cat_time_minutes = computed(() => localStorage.cat_time_minutes | minutes);
    
    let seconds_left = 0;

    
    let lastTime;
    let handle;
    
    let current_time = new Date();
    let interval_id = 0;
    
    let duration = ref(5 * 1000);
    let elapsed = ref(0);

    const update_timer = () => {
        elapsed.value = performance.now() - lastTime;
        console.log(elapsed.value, duration.value, elapsed.value >= duration.value)
        if (elapsed.value >= duration.value) {
            console.log('>>> ALL DONE');
            // emit to frontPage
            cancelAnimationFrame(handle);
        } else {
            console.log('>>> OMW');
            handle = requestAnimationFrame(update_timer);
        }
    }

    const reset_timer = () => {
        elapsed.value = 0;
        //duration = 10; //seconds_between_dates(new Date(), get_cat_time())
        lastTime = performance.now();
        update_timer();
    }

    const progress_rate = computed(() =>
        Math.min(elapsed.value / duration.value, 1)
    );

    onMounted(() => {;
        setup_settings();
        setup_watchers();
        setup_interval();
    })

    function setup_interval() {
        interval_id = setInterval(() => {
            var cat_time = get_cat_time();
            seconds_left = seconds_between_dates(cat_time, new Date())

            if (seconds_left <= 0) {
                console.log('$$$ EMMITTING, resetting timer')
                increment_cat_timer();
            }
            elapsed.value += 1000;
            console.log('>>> Checking ...', seconds_left, cat_time);
        }, 1000);
    }

    onUnmounted(() => {
      cancelAnimationFrame(handle)
    });

    onBeforeUnmount(() => {
        clearInterval(interval_id);
    });

    function setup_settings() {
        if(!(localStorage.cat_time_hours && localStorage.cat_time_minutes)) {
            // localStorage.cat_time_hours =  12;
            // localStorage.cat_time_minutes = 0;
            localStorage.cat_time_hours =  22;
            localStorage.cat_time_minutes = 45;
            settings.cat_time_hours = localStorage.cat_time_hours;
            settings.cat_time_minutes = localStorage.cat_time_minutes;
        } else {
            // settings.cat_time_hours = 19;
            // settings.cat_time_minutes = 20
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

    // works
    function get_cat_time() {
        next_cat_timer = new Date();
        next_cat_timer.setDate(next_cat_timer.getDate());
        next_cat_timer.setHours(7);
        next_cat_timer.setMinutes(45);
        next_cat_timer.setSeconds(0);
        return next_cat_timer;


        // next_cat_timer = new Date();
        // next_cat_timer.setDate(next_cat_timer.getDate() + 1);
        // next_cat_timer.setHours(23);
        // next_cat_timer.setMinutes(4);
        // next_cat_timer.setSeconds(0);
        // return next_cat_timer;
    }

    function increment_cat_timer() {
        next_cat_timer.setDate(next_cat_timer.getDate() + 1);
        elapsed.value = 0;
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

    <vue-countdown :time="1 * cat_time_hours * cat_time_minutes * 60 * 1000" v-slot="{ days, hours, minutes, seconds }"> -->
    <!-- <vue-countdown :time="1 * 1 * cat_time_test * 1 * 1000" v-slot="{ days, hours, minutes, seconds }">
        Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
    </vue-countdown>
        
        <div>
            Elapsed Time: <progress :value="progress_rate"></progress>
            {{ (elapsed / 1000).toFixed(1) }}s
        </div>

        <div>
            Duration: <input type="range" v-model="duration" min="1" max="30000">
            {{ (duration / 1000).toFixed(1) }}s
        </div>  
    </div>
</template>

<style>
</style>