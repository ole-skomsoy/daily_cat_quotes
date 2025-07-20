<script setup lang="ts">
  import FrontPage from './components/frontpage2.vue';
  import HeaderMenu from './components/HeaderMenu.vue';
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken, onMessage } from "firebase/messaging";
  

  const firebaseConfig = {
    apiKey: "AIzaSyB_y2DCUf0AT7fS7nomxUWXF-1Ob0mKOz4",
    authDomain: "daily-cat-quotes.firebaseapp.com",
    projectId: "daily-cat-quotes",
    storageBucket: "daily-cat-quotes.firebasestorage.app",
    messagingSenderId: "526553757415",
    appId: "1:526553757415:web:b67bebade8fa1c024f5442"
  };

  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  });
  
  getToken(messaging, { vapidKey: 'BMMCRbCSuVzUqLuu1NoAu7uah708rGx5W7tBFUI8FDjxLPjvUwT9Pf6NV4yceYGO--16vxRFdwxfqckDcM82t40' }).then((currentToken) => {
    if (currentToken) {
      console.log('push token', currentToken)
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
</script>

<template>
  <header>
    <div style="width:100%" class="wrapper">
      <HeaderMenu />
    </div>
  </header>

  <main style="width:100%" class="main">
    <FrontPage />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
}
</style>
