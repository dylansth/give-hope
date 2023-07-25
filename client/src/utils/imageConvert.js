const createImageUrlFromBase64 = (base64String) => {
    const binaryData = atob(base64String);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  export default createImageUrlFromBase64;

  /// Thanks to https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer and Cam Sloan 