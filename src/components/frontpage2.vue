<script setup>
  import { onMounted, ref } from 'vue';
  import Settings from './Settings.vue';
  

  const RANDOM_QUOTE_URL_OLD_2 = '/api/quote';
  // const RANDOM_QUOTE_URL = import.meta.env.MODE === 'development' 
  //   ? '/api/quote' 
  //   : 'https://corsproxy.io/?https://zenquotes.io/api/random';
  const RANDOM_QUOTE_URL = 'http://192.168.56.1:8000/quotes/random';

  const RANDOM_DOG_URL = 'https://dog.ceo/api';
  const CAT_API_URL = 'https://api.thecatapi.com/v1';
  const CAT_API_KEY = 'live_9bCIgtoNdvfgBrvadQ93rQI6mrRjhL7vn7UrfKSqEa2XiTVD0WXU06jeZUwPeEYU';

  const IS_DOG = false;

  const random_quote = ref('l o a d i n g . . .');
  const random_author = ref('u n k n o w n');
  var loading = ref(false)

  onMounted(() => {
    console.log('>>> frontpage mounted')
    loading.value = true
    if (IS_DOG) {
      get_random_dog()
      get_random_quote();
    } else {
      get_random_cat()
      get_random_quote()
    }
  })

  async function get_random_cat() {
    try {
      var cat_image_url = localStorage.cat_image_url;
      var response = await fetch(`${CAT_API_URL}/images/search?api_key=${CAT_API_KEY}`);
      const response_json = await response.json()
      
      cat_image_url = response_json[0]['url'];
      localStorage.cat_image_url = response_json[0]['url']
      
      var image_element = document.getElementById('cat_image');
      image_element.src = cat_image_url;
    } catch (error) {
      console.log('Error saving cat!', error);
    }
  }

  async function get_random_dog() {
    try {
      var dog_image_url = localStorage.dog_image_url;
        var response = await fetch(`${RANDOM_DOG_URL}/breeds/image/random`)
        const response_json = await response.json()
        
        dog_image_url = response_json.message
        localStorage.dog_image_url = response_json.message

        var image_element = document.getElementById('cat_image');
        image_element.src = dog_image_url;
    } catch (error) {
      console.log('Error saving dog!', error);
    }
  }

  async function get_random_quote() {
    try {
      const res = await fetch(RANDOM_QUOTE_URL, {
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();
      random_quote.value = data["quote"];
      random_author.value = data["author"];
    } catch (error) {
      console.log('Error fetching quote!', error);
    } finally {
      loading.value = false
    }
  }

  async function handle_refresh() {
    loading.value = true
    if (IS_DOG)
      get_random_dog()
    else
      get_random_cat()
    await get_random_quote();
  }
  
</script>

<template>
  <div class="wrapper">
    <img id="cat_image" class="image" src="/logo.png" alt="random cat">
    <p id="quote"> {{ random_quote }} </p>
    <p id="author"> - {{ random_author }} </p>
    <Settings :loading=loading @refresh="handle_refresh" />
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