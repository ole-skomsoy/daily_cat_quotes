<script setup>
  import { onMounted, reactive } from 'vue';
  import axios from 'axios';
  import Settings from './Settings.vue';

  const RANDOM_QUOTE_URL = 'https://zenquotes.io/api/random';
  const RANDOM_DOG_URL = 'https://dog.ceo/api';
  const CAT_API_URL = 'https://api.thecatapi.com/v1';
  const CAT_API_KEY = 'live_9bCIgtoNdvfgBrvadQ93rQI6mrRjhL7vn7UrfKSqEa2XiTVD0WXU06jeZUwPeEYU';

  const IS_DOG = false;

  let random_quote = reactive({
    quote: 'loading',
    author: 'unknown'
  });

  onMounted(() => {
    if (IS_DOG)
      get_random_dog(false)
    else
      get_random_cat(false)
    get_random_quote(false);
  })

  async function get_random_cat(force) {
    try {
      var cat_image_url = localStorage.cat_image_url;
    if (cat_image_url == null || force) {
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

  async function get_random_dog(force) {
    console.log(force)
    try {
      var dog_image_url = localStorage.dog_image_url;
      console.log(dog_image_url)
      if (dog_image_url == null || force) {
        var response = await fetch(`${RANDOM_DOG_URL}/breeds/image/random`)
        const response_json = await response.json()
        console.log(response_json)
        dog_image_url = response_json.message
        localStorage.dog_image_url = response_json.message
        console.log(response)
      }
        var image_element = document.getElementById('cat_image');
        image_element.src = dog_image_url;
    } catch (error) {
      console.log('Error saving dog!', error);
    }
  }

  async function get_random_quote(force) {
    try {
      var quote = localStorage.quote;
      var author = localStorage.author;
      if (quote == null || force) {
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
    if (IS_DOG)
      get_random_dog(true)
    else
      get_random_cat(true)
    await get_random_quote(true);
  }
  
</script>

<template>
  <div class="wrapper">
    <img id="cat_image" class="image" src="" alt="random cat">
    <p> {{ random_quote.quote }} </p>
    <p> - {{ random_quote.author }} </p>
    <Settings @new_cat_quote="handle_new_cat_quote" />
  </div>
</template>

<style>
  .wrapper {
    padding: 10px;
  }
  .image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>