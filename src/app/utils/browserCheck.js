export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isMobileSize = () => {
  if (window.innerWidth <= 800 && window.innerHeight <= 830) {
    return true;
  }
  return false;
};

export const isChrome = () =>
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export const isFirefox = () =>
  // eslint-disable-next-line
   typeof InstallTrigger !== 'undefined'
;
