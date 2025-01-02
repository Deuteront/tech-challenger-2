export const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    console.warn(
      `Attempted to save to localStorage outside of browser for key "${key}".`
    );
  }
};

export const getFromStorage = <T>(key: string): T | string | null => {
  if (typeof window === 'undefined') {
    console.warn(
      `Attempted to get from localStorage outside of browser for key "${key}".`
    );
    return null;
  }

  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      return JSON.parse(storedData) as T;
    } catch (error) {
      return storedData;
    }
  }
  return null;
};

export const removeFromStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  } else {
    console.warn(
      `Attempted to remove from localStorage outside of browser for key "${key}".`
    );
  }
};
