<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const next_cat_time = ref(null);
    const hours_left = ref(0);
    const minutes_left = ref(0);

    const selected_hour = ref(12);
    const selected_minute = ref(0);

    let interval_id = 0;
    

    const emit = defineEmits(['new_cat_quote'])

    onMounted(() => {;
        setup_settings();
        setup_interval();
    });

    onBeforeUnmount(() => {
        if (interval_id > 0) clearInterval(interval_id);
    });

    function setup_settings() {
        if (localStorage.next_cat_time) {
            next_cat_time.value = new Date(localStorage.next_cat_time);
            selected_hour.value = next_cat_time.value.getHours();
            selected_minute.value = next_cat_time.value.getMinutes();
            return;
        }

        let next_alarm = new Date();
        next_alarm.setHours(12, 0, 0, 0);

        if (next_alarm < new Date) {
            next_alarm.setDate(new Date().getDate()+1);
            next_alarm.setHours(12, 0, 0, 0);
        }

        next_cat_time.value = next_alarm;
        localStorage.setItem('next_cat_time', next_cat_time.value.toString());
        selected_hour.value = next_cat_time.value.getHours();
        selected_minute.value = next_cat_time.value.getMinutes();
    }

    function setup_interval() {
        interval_id = setInterval(() => {
            hours_left.value = ((next_cat_time.value - new Date()) / 1000 / 60 / 60).toFixed(0);
            
            const temp_date = new Date();
            temp_date.setDate(temp_date.getDate() + 1);

            let temp_minutes = new Date(next_cat_time.value).getMinutes();
            if (temp_minutes == 0) temp_minutes = 60;

            minutes_left.value = Math.abs(temp_minutes - temp_date.getMinutes());

            if (hours_left.value == 0 && minutes_left.value == 0) {
                next_cat_time.value.setDate(next_cat_time.value.getDate() + 1);
                localStorage.setItem('next_cat_time', next_cat_time.toString());
                emit('new_cat_quote');
            }    
        }, 1000);
    }

    function handle_alarm_time_changed() {        
        const new_date = new Date(localStorage.next_cat_time)
        new_date.setHours(selected_hour.value);
        new_date.setMinutes(selected_minute.value)
        localStorage.setItem('next_cat_time', new_date.toString());

        next_cat_time.value.setHours(selected_hour.value);
        next_cat_time.value.setMinutes(selected_minute.value);        
    }

    function refresh() {
        emit('new_cat_quote', "pls");
    }
</script>

<template>
    <div>
        <br>
        <span><b>Cat time o'clock</b></span>
        <br>
        <select v-model="selected_hour" @change="handle_alarm_time_changed">
            <option v-for="n in 24" :value="n-1">{{ n-1 }}</option>
        </select>
        <select v-model="selected_minute" @change="handle_alarm_time_changed">
            <option v-for="n in 60" :value="n-1">{{ n-1 }}</option>
        </select>
        <br>
        <br>
        <span><b>Next cat time</b></span>
        <br>
        <span>{{ next_cat_time }}</span> 
        <br>
        <span>[{{ hours_left }} hours, {{ minutes_left }} minutes]</span>
        <br>
        <br>
        <button @click="refresh()">Refresh</button>
    </div>
</template>

<style>
</style>