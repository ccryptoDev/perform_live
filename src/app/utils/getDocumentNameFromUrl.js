const getDocumentNameFromUrl = fileUrl =>
  fileUrl.slice(fileUrl.lastIndexOf('/'));

export default getDocumentNameFromUrl;
