<script setup>
  import { ref } from 'vue';
  import { Buffer } from 'buffer';
  import axios from 'axios';
  import fs from 'fs/promises';

  const RANDOM_CAT_URL = "https://cataas.com/cat?json=true"
  const cat = ref('null')
  
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

</script>

<template>
  <img src="https://cataas.com/cat" alt="random cat">
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>