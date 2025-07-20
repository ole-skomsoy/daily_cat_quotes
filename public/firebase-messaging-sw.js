importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyB_y2DCUf0AT7fS7nomxUWXF-1Ob0mKOz4",
    authDomain: "daily-cat-quotes.firebaseapp.com",
    projectId: "daily-cat-quotes",
    storageBucket: "daily-cat-quotes.firebasestorage.app",
    messagingSenderId: "526553757415",
    appId: "1:526553757415:web:b67bebade8fa1c024f5442"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

 const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});