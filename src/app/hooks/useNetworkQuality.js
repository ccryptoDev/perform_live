import { useEffect, useState } from 'react';

const useNetworkQuality = () => {
  const [connection, setConnection] = useState(navigator.connection);
  const [isOnline, setNetwork] = useState(window.navigator.onLine);

  const handlerConnectionChange = e => {
    setConnection(e.target);
  };
  const handlerOffline = () => setNetwork(window.navigator.onLine);

  useEffect(() => {
    navigator.connection.addEventListener('change', handlerConnectionChange);
    window.addEventListener('offline', handlerOffline);
    window.addEventListener('online', handlerOffline);

    return () => {
      navigator.connection.removeEventListener(
        'change',
        handlerConnectionChange,
      );
      window.removeEventListener('offline', handlerOffline);
      window.removeEventListener('online', handlerOffline);
    };
  }, []);

  return {
    ...connection,
    isOnline,
    isConnectionStrong: connection.effectiveType === '4g' && isOnline,
  };
};

export default useNetworkQuality;
