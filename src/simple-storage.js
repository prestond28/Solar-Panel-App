export const setStorage = (key, data) => {
  const dataAsString = JSON.stringify(data); // data = new Object()
  const encodedData = btoa(dataAsString); // {}
  localStorage.setItem(key, encodedData);
};

export const getStorage = (key) => {
  const encodedData = localStorage.getItem(key);
  const decodedData = atob(encodedData);
  return JSON.parse(decodedData); // {}
};

export const clearStorage = (key) => {
  localStorage.removeItem(key);
};

export const storageHasData = () => localStorage.length > 0;
