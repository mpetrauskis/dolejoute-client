export const getLocalStorageItem = <Type>(key: string): Type | null => {
  const stringItem = localStorage.getItem(key);
  if (stringItem === null) return null;
  return JSON.parse(stringItem) as Type;
};

export const setLocalStoreageItem = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};
