export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = () => resolve('');

    reader.readAsDataURL(file);
  });
};
