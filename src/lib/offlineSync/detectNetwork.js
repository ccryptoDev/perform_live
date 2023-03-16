export const registerConnectivityListener = callback => {
  if (window) {
    window.addEventListener('offline', e => {
      callback(false, e);
    });
    window.addEventListener('online', e => {
      callback(true, e);
    });
  }
};

export const isNetworkOnline = () => window.navigator.onLine;
