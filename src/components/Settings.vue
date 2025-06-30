<script setup>
    import { ref, onMounted, reactive, computed } from 'vue';
    
    let settings = reactive({
        cat_time_hours: ref(12),
        cat_time_minutes: ref(0)
    });

    onMounted(() => {;
        setup_settings();
    })

    function setup_settings() {
        if(localStorage.cat_time) {
            settings.cat_time_hours = localStorage.cat_time_hours;
        } else {
            settings.cat_time_hours = 12;
            settings.cat_time_minutes = 0;
            localStorage.cat_time_hours = settings.cat_time_hours;
            localStorage.cat_time_minutes = settings.cat_time_minutes;
        }
        console.log(settings);
    }
</script>

<template>
    <div>
      <select class="dropdown" v-bind:value="settings.cat_time_hours">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="12">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
      </select>
    </div>
</template>

<style>
</style>