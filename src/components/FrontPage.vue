<script setup>
  import { ref, onMounted, reactive, computed, watchEffect } from 'vue';
  import { useTimer } from 'vue-timer-hook'
  import { Buffer } from 'buffer';
  import axios from 'axios';
  import fs from 'fs/promises';
  import Settings from './Settings.vue';

  const RANDOM_QUOTE_URL = 'https://zenquotes.io/api/random';
  const CAT_API_URL = 'https://api.thecatapi.com/v1';
  const CAT_API_KEY = 'live_9bCIgtoNdvfgBrvadQ93rQI6mrRjhL7vn7UrfKSqEa2XiTVD0WXU06jeZUwPeEYU';

  let random_quote = reactive({
    quote: 'loading',
    author: 'unknown'
  });
  const cat_image_url = ref(null);
  let cat_url = '';

  onMounted(() => {
    get_random_cat();
    get_random_quote();
  })

  async function get_random_cat() {
    try {
      var cat_image_url = localStorage.cat_image_url;
      if (cat_image_url == null) {
        var response = await fetch(`${CAT_API_URL}/images/search?api_key=${CAT_API_KEY}`);
        const response_json = await response.json()
        cat_image_url = response_json[0]['url'];
        localStorage.cat_image_url = response_json[0]['url']
      }
      var image_element = document.getElementById('cat_image');
      image_element.src = cat_image_url;
    } catch (error) {
      console.log('Error saving cat!', error);
    }
  }

  async function get_random_quote() {
    try {
      var quote = localStorage.quote;
      var author = localStorage.author;
      if (quote == null) {
        var response = await axios.get(RANDOM_QUOTE_URL);
        quote = response.data[0].q;
        author = response.data[0].a
        localStorage.quote = response.data[0].q;
        localStorage.author = response.data[0].a
      }
      random_quote.quote = quote;
      random_quote.author = author;
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
    <img id="cat_image" class="image" src="" alt="random cat">
    <!--img class="image" src="" alt="random cat"-->
    <!-- <p> {{ cat_image_url }} </p> -->
    <p> {{ random_quote.quote }} </p>
    <p> - {{ random_quote.author }} </p>
    <Settings @new_cat_quote="handle_new_cat_quote" />
  </div>
</template>

<style>
  .wrapper {
  }
</style>