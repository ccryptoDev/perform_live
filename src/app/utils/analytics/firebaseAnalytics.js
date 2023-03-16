const generateNotification = (reg, notification) => {
  const title = notification.title || 'Simple Title';
  const options = {
    body:
      notification.body ||
      'Simple piece of body text.\nSecond line of body text :)',
  };
  if (notification.icon) {
    options.icon = notification.icon;
    options.badge = notification.icon;
  }
  reg.showNotification(title, options);
};

const sendNotification = (notification = {}) => {
  navigator.serviceWorker.ready.then(reg => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // Let's check whether notification permissions have alredy been granted
      // If it's okay let's create a notification
      generateNotification(reg, notification);
    } else if (
      Notification.permission !== 'denied' ||
      Notification.permission === 'default'
    ) {
      // Otherwise, we need to ask the user for permission
      Notification.requestPermission(permission => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          generateNotification(reg, notification);
        }
      });
    }
  });
};

export default {
  sendNotification,
};
