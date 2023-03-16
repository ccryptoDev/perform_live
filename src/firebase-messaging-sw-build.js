/* eslint-disable */
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

/* importScripts('/__/firebase/5.0.0/firebase-app.js');
importScripts('/__/firebase/5.0.0/firebase-messaging.js');
importScripts('/__/firebase/init.js'); */

importScripts('https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.10.1/firebase-messaging.js');

const APP_ICON = "data:image/png;base64,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";

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 */
// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const swUrl = new URL(location);
const messagingSenderId = swUrl.searchParams.get('messagingSenderId');

firebase.initializeApp({
  messagingSenderId: messagingSenderId || MESSAGING_SENDER_ID_FROM_SCRIPT,
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  let visibleNotification;
  if (payload.notification) {
    visibleNotification = payload.notification;
  } else if (payload.data.notification) {
    visibleNotification = JSON.parse(payload.data.notification);
  }
  return self.registration.showNotification(visibleNotification.title,
    {
      body: visibleNotification.body,
      icon: APP_ICON,
    });
});

self.addEventListener('notificationclick', function(event) {
  let url = `${swUrl.origin}/#/workbench`;
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
      clients.matchAll({ includeUncontrolled: true, type: 'window' }).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});
// [END background_handler]
