
export const getFileImage = (id, docKey, file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result;
      resolve(image);
    };
    reader.readAsDataURL(file);
  })
};

