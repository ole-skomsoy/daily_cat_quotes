<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

    const publicVapidKey = 'BL4R_IjmzWK4xN_6I7WY7NgprV9hJ0ALlj3lTon1bW7v_5Y5SEEr6zoeI8tY9yMZRbNCii7_Okbj71DP_iAfVPw';
    const next_cat_time = ref(null);
    const hours_left = ref(0);
    const minutes_left = ref(0);

    const selected_hour = ref(12);
    const selected_minute = ref(0);

    let interval_id = 0;
    
    const props = defineProps({
        loading: { type: Boolean, default: false },
    });

    const emit = defineEmits(['refresh'])

    onMounted(() => {;
        subscribeUser();
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

            if (hours_left.value <= 0 && minutes_left.value <= 0) {
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
        subscribeUser()
        emit('refresh', true);
    }

    async function subscribeUser() {
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        // Send to your Node.js backend
        await fetch('http://localhost:4000/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

</script>

<template>
    <div>
        <div style="display: flex; flex-direction: row; align-items: end; justify-content: center; margin-top: 20px;">
            <button v-if="!loading" @click="refresh()" class="fancy-button">Another One</button>
            <div
                v-else
                class="fancy-button fancy-loader"
                role="status"
                aria-live="polite"
                aria-label="Loading"
            >
                <span class="spinner" aria-hidden="true"></span>
            </div>
        </div>
    </div>
</template>

<style>
.fancy-button {
  background: linear-gradient(to right, #ff8a00, #e52e71);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Optional hover/active states for the button */
.fancy-button:not(.fancy-loader):hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.24);
}
.fancy-button:not(.fancy-loader):active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

/* Loader variant uses same base styling, but laid out like a pill with spinner */
.fancy-loader {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: default; /* no click while loading */
  user-select: none;
}

/* Minimal spinner that matches the button */
.spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.45);
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

.loader-text {
  font-weight: 600;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

</style>