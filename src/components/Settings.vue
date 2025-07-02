<script setup>
    import { ref, onMounted, onUnmounted, reactive, computed, watch, watchEffect } from 'vue';
    let settings = reactive({
        // cat_time_hours: ref(12),
        // cat_time_minutes: ref(0)
        cat_time_hours: ref(19),
        cat_time_minutes: ref(20)
    });

    const cat_time_hours = computed(() => localStorage.cat_time_hours);
    const cat_time_minutes = computed(() => localStorage.cat_time_minutes);
    
    const duration = ref(5 * 1000);
    const elapsed = ref(0);

    let lastTime;
    let handle;

    const update_timer = () => {
        elapsed.value = performance.now() - lastTime;
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
        reset_timer();
        watchEffect(async () => {
            // console.log('>>> my watch has ended')
        });
    })

    onUnmounted(() => {
      cancelAnimationFrame(handle)
    });

    // handleCountdownEnd(() => {
    //     console.log('>>> my watch has ended')
    // });

    

    function setup_settings() {
        if(!(localStorage.cat_time_hours && localStorage.cat_time_minutes)) {
            // localStorage.cat_time_hours =  12;
            // localStorage.cat_time_minutes = 0;
            localStorage.cat_time_hours =  19;
            localStorage.cat_time_minutes = 20;
            settings.cat_time_hours = localStorage.cat_time_hours;
            settings.cat_time_minutes = localStorage.cat_time_minutes;
        } else {
            settings.cat_time_hours = 19;
            settings.cat_time_minutes = 20
            // settings.cat_time_hours = localStorage.cat_time_hours;
            // settings.cat_time_minutes = localStorage.cat_time_minutes;
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

    <!-- <vue-countdown :time="1 * cat_time_hours * cat_time_minutes * 60 * 1000" v-slot="{ days, hours, minutes, seconds }"> -->
    <!-- <vue-countdown :time="1 * 1 * cat_time_test * 1 * 1000" v-slot="{ days, hours, minutes, seconds }">
        Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
    </vue-countdown> -->
        <label>
            Elapsed Time: <progress :value="progress_rate"></progress>
        </label>
        <div>{{ (elapsed / 1000).toFixed(1) }}s</div>

        <div>
            Duration: <input type="range" v-model="duration" min="1" max="30000">
            {{ (duration / 1000).toFixed(1) }}s
        </div>  
    </div>
</template>

<style>
</style>