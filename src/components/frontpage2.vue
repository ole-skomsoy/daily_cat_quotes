<script setup>
  import { onMounted, reactive, ref } from 'vue';
  import axios from 'axios';
  import Settings from './Settings.vue';
  
  const RANDOM_QUOTE_URL_OLD = 'https://zenquotes.io/api/random';
  const RANDOM_QUOTE_URL = 'https://favqs.com/api/qotd';
  const RANDOM_DOG_URL = 'https://dog.ceo/api';
  const CAT_API_URL = 'https://api.thecatapi.com/v1';
  const CAT_API_KEY = 'live_9bCIgtoNdvfgBrvadQ93rQI6mrRjhL7vn7UrfKSqEa2XiTVD0WXU06jeZUwPeEYU';

  const IS_DOG = false;

  let random_quote = ref(null);
  let random_author = ref(null);
  // let random_quote = reactive({
  //   quote: 'loading...',
  //   author: null
  // });

  onMounted(() => {
    if (IS_DOG) {
      get_random_dog(true)
      get_random_quote(true);
    } else {
      get_random_cat(true)
      get_random_quote(true)
    }
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
    try {
      var dog_image_url = localStorage.dog_image_url;
      // if (dog_image_url == null || force) {
        var response = await fetch(`${RANDOM_DOG_URL}/breeds/image/random`)
        const response_json = await response.json()
        dog_image_url = response_json.message
        localStorage.dog_image_url = response_json.message
      // }
        var image_element = document.getElementById('cat_image');
        image_element.src = dog_image_url;
    } catch (error) {
      console.log('Error saving dog!', error);
    }
  }

  async function get_random_quote(force) {
    try {
      var quote = await axios.get(RANDOM_QUOTE_URL);
      // var quote = await Http.get({ url: RANDOM_QUOTE_URL });

      random_quote.value = quote['data']['quote']['body'];
      random_author.value = quote['data']['quote']['author'];
    } catch (error) {
      console.log('Error fetching quote!', error);
    }
  }

  async function handle_new_cat_quote() {
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
    <p> {{ random_quote }} </p>
    <p> - {{ random_author }} </p>
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