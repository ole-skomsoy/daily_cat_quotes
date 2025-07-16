<script setup>
    import { ref, onMounted } from 'vue';
    const next_cat_time = ref(null);
    const hours_left = ref(0);
    const minutes_left = ref(0);

    onMounted(() => {;
        setup_settings(); 
    })

    function setup_settings() {
        if (localStorage.next_cat_time) {
            next_cat_time.value = localStorage.next_cat_time;
            return;
        }
        let next_alarm = new Date();
        next_alarm.setHours(12, 0, 0, 0);

        console.log('> Suggested alarm:', next_alarm);

        if (next_alarm < new Date) {
            next_alarm.setDate(new Date().getDate()+1);
            next_alarm.setHours(12, 0, 0, 0);
            console.log('> Alarm has expired, new:', next_alarm);
        }

        next_cat_time.value = next_alarm;
        hours_left.value = ((next_cat_time.value - new Date()) / 1000 / 60 / 60).toFixed(0);
        
        let temp_date = new Date();
        temp_date.setDate(temp_date.getDate() + 1);

        minutes_left.value = Math.abs(next_cat_time.value.getMinutes() - temp_date.getMinutes());
    }
</script>

<template>
    <div>
        <span>Next cat time</span>
        <br>
        <span>{{ next_cat_time }}</span> 
        <br>
        <span>({{ hours_left }} hours, {{ minutes_left }} minutes)</span>
    </div>
</template>

<style>
</style>