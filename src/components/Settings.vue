<script setup>
    import { ref, onMounted } from 'vue';
    const next_cat_time = ref(null);

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
    }
</script>

<template>
    <div>
      <span>Next cat time: {{ next_cat_time }}</span>
    </div>
</template>

<style>
</style>