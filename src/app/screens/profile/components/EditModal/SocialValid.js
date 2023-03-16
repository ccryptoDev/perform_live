export const LinkedInURLValidation = (url) => {
   if(url.length) {
      if( /^http(s)?:\/\/(www\.)?linkedin\.com\/in\/.*$/.test(url) ) {
         return true;
      } else {
         return false;
      }
   }
   return true;
}

export const FacebookURLValidation = (url) => {
   if(url.length) {
      if( /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/.test(url) ) {
         return true;
      } else {
         return false;
      }
   }
   return true;
}

export const TwitterURLValidation = (url) => {
   if(url.length) {
      if( /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(url) ) {
         return true;
      } else {
         return false;
      }
   }
   return true;
}

export const InstagramURLValidation = (url) => {
   if(url.length) {
      if(/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/.test(url) ) {
         return true;
      } else {
         return false;
      }
   }
   return true;
}

export const ValidEmail = email => {
   if(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(email)) {
      return true;
   } else {
      return false;
   }   
}

export const checkValidURL = url => {
   if (url.includes('http')) {
     return true;
   } else {
     return false;
   }
};

export const checkString = str => {
   if (/^[a-zA-Z0-9-_.]*$/.test(str) == false) {
     return false;
   }
   return true;
};