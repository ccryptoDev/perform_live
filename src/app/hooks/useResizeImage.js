import globalConfig from 'app/config/index.config';

export const useResizeImage = () => {
  return (path, width, height) => {
    if (!path) return path;
    const url = new URL(path);

    if (url.host !== globalConfig.CLOUDFRONT_PATH) return path;
    if (url.pathname.substr(url.pathname.length - 4, 4) === '.mp4') return path;

    const key = url.pathname.replace('/', '');
    const query = { key, width, height, redirect: true };
    return `${globalConfig.SERVER_URL}file/resize?${Object.keys(query).reduce(
      (a, c) => (query[c] ? `${a}${c}=${query[c]}&` : a),
      '',
    )}`;
  };
};
