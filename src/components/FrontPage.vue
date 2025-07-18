<script setup>
  import { ref, onMounted, reactive, computed, watchEffect } from 'vue';
  import { useTimer } from 'vue-timer-hook'
  import { Buffer } from 'buffer';
  import axios from 'axios';
  import fs from 'fs/promises';
  import Settings from './Settings.vue';

  const RANDOM_CAT_URL = 'https://cataas.com/cat?json=true';
  const RANDOM_QUOTE_URL = 'https://zenquotes.io/api/random';
  let random_quote = reactive({
    quote: 'loading',
    author: 'unknown'
  });
  const cat_image_url = ref(null);

  onMounted(() => {
    get_random_cat();
    get_random_quote();
  })

  // async function get_random_cat() {
  //   try {
  //     var res = await axios.get(RANDOM_CAT_URL, { responseType: 'Blob' });
  //     cat_image_url.value = URL.createObjectURL(blob.url);
  //     console.log('res', res);
  //     console.log('url', cat_image_url.value)
      
      
  //     const fileData = Buffer.from(response?.data, 'binary');
  //     await fs.writeFile('./random_cat.png', fileData);
  //   } catch (error) {
  //     console.log('Error saving cat!', error);
  //   }
  // }

  async function get_random_cat() {
    try {
      var res = await fetch(RANDOM_CAT_URL);
      console.log('res', res);

      const blob = await res.blob();
      console.log('blob', blob)

      cat_image_url.value = URL.createObjectURL(blob);
      console.log('url', cat_image_url.value)
    } catch (error) {
      console.log('Error saving cat!', error);
    }
  }

  async function get_random_quote() {
    try {
      var res = await axios.get(RANDOM_QUOTE_URL);
      random_quote.quote = res.data[0].q;
      random_quote.author = res.data[0].a;
      // random_quote.quote = 'Man should fear never beginning to live.';
      // random_quote.author = 'Marcus Aurelius';
      console.log(random_quote);
    } catch (error) { 
      console.log('Error fetching quote!', error);
    }
  }

  async function handle_new_cat_quote() {
    console.log('> refreshing idd');
    await get_random_cat();
    await get_random_quote();
  }
  
</script>

<template>
  <div class="wrapper">
    <!-- <img class="image" src="https://cataas.com/cat" alt="random cat"> -->
    <img class="image" src="http://localhost:5173/1bf2d98c-4e26-4af5-8bc3-96096703db1a" alt="random cat">
    <p> {{ cat_image_url }} </p>
    <p> {{ random_quote.quote }} </p>
    <p> - {{ random_quote.author }} </p>
    <Settings @new_cat_quote="handle_new_cat_quote" />
  </div>
</template>

<style>
  .wrapper {
  }
</style>