<script setup>
  import { ref, onMounted, reactive, computed, watchEffect } from 'vue';
  import { useTimer } from 'vue-timer-hook'
  import { Buffer } from 'buffer';
  import axios from 'axios';
  import fs from 'fs/promises';

  const RANDOM_CAT_URL = 'https://cataas.com/cat?json=true';
  const RANDOM_QUOTE_URL = 'https://zenquotes.io/api/random';
  let random_quote = reactive({
    quote: 'loading',
    author: 'unknown'
  });

  onMounted(() => {
    get_random_cat();
    get_random_quote();
  })

  const timer = useTimer(get_cat_time());
  const restart_timer = () => {
      timer.restart(get_cat_time());
      get_random_cat();
  }

  async function get_random_cat() {
    try {
      await axios.get(RANDOM_CAT_URL, { responseType: 'arraybuffer' });
      const fileData = Buffer.from(response.data, 'binary');
      await fs.writeFile('./random_cat.png', fileData);
      console.log('PNG file saved!');
    } catch (error) {
      console.log('Error saving cat!', error);
    }
  }

  async function get_random_quote() {
    try {
      var res = await axios.get(RANDOM_QUOTE_URL);
      random_quote.quote = res.data[0].q;
      random_quote.author = res.data[0].a;
      console.log(random_quote);
    } catch (error) { 
      console.log('Error fetching quote!', error);
    }
  }

  function get_cat_time() {
    const next_cat_timer = new Date();
    next_cat_timer.setDate(next_cat_timer.getDate() + 1);
    next_cat_timer.setHours(localStorage.cat_time_hours);
    next_cat_timer.setMinutes(localStorage.cat_time_minutes);
    return next_cat_timer;
  }
</script>

<template>
  <div class="wrapper">
    <img class="image" src="https://cataas.com/cat" alt="random cat">
    <p> {{ random_quote.quote }} </p>
    <p> - {{ random_quote.author }} </p>
  </div>
</template>

<style>
  .wrapper {
  }
</style>