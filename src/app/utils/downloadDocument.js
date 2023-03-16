const downloadDocument = (
  fileUrl,
  fileName = `downloadFile_${new Date(Date.now()).toISOString()}`,
  cb = () => null,
) => {
  if (typeof fileUrl !== 'string') {
    throw new Error('Donwload URL is not a string');
  }

  fetch(fileUrl).then(response => {
    response.blob().then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      cb();
    });
    // window.location.href = response.url;
  });
};

export default downloadDocument;
