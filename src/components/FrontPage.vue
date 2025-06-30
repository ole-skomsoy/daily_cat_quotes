<script setup>
  import { ref, onMounted, reactive, computed } from 'vue';
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

  async function get_random_cat() {
    try {
      await axios.get(RANDOM_CAT_URL, { responseType: 'arraybuffer' });
      const fileData = Buffer.from(response.data, 'binary');
      await fs.writeFile('./random_cat.png', fileData);
      console.log('PDF file saved!');
    } catch (error) {
      console.log('Error downloading cat!', error);
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