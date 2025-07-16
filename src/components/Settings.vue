<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    const next_cat_time = ref(null);
    const hours_left = ref(0);
    const minutes_left = ref(0);
    let interval_id = 0;
    const interval_counter = ref(5);

    onMounted(() => {;
        setup_settings();
        setup_interval();
    });

    onBeforeUnmount(() => {
        if (interval_id > 0) clearInterval(interval_id);
    });

    function setup_settings() {
        if (localStorage.next_cat_time) {
            next_cat_time.value = localStorage.next_cat_time;
            return;
        }
        let next_alarm = new Date();
        next_alarm.setHours(12, 0, 0, 0);

        if (next_alarm < new Date) {
            next_alarm.setDate(new Date().getDate()+1);
            next_alarm.setHours(12, 0, 0, 0);
            console.log('> Alarm has expired, new:', next_alarm);
        }

        next_cat_time.value = next_alarm;
    }

    function setup_interval() {
        interval_id = setInterval(() => {
            hours_left.value = ((next_cat_time.value - new Date()) / 1000 / 60 / 60).toFixed(0);
            
            let temp_date = new Date();
            temp_date.setDate(temp_date.getDate() + 1);

            let temp_minutes = next_cat_time.value.getMinutes();
            if (temp_minutes == 0) temp_minutes = 60;

            minutes_left.value = Math.abs(temp_minutes - temp_date.getMinutes());
            interval_counter.value += 1;
        }, 1000);
    }
</script>

<template>
    <slot></slot>
</template>

<style>
</style>