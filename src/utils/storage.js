/**
 * Safe localStorage utility wrapper with error handling, fallback, and SSR safety.
 */

// In-memory fallback store for Node.js / SSR / testing environments
const memoryStore = new Map();

const isStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

export const storage = {
  /**
   * Retrieve item from localStorage (or memory store in SSR)
   * @param {string} key
   * @param {*} [defaultValue=null]
   * @returns {*}
   */
  get(key, defaultValue = null) {
    try {
      if (isStorageAvailable()) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      }
      return memoryStore.has(key) ? memoryStore.get(key) : defaultValue;
    } catch (error) {
      console.warn(`[Campus Compass Storage] Failed to read key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Save item to localStorage (or memory store in SSR)
   * @param {string} key
   * @param {*} value
   * @returns {boolean}
   */
  set(key, value) {
    try {
      if (isStorageAvailable()) {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        memoryStore.set(key, value);
      }
      return true;
    } catch (error) {
      console.error(`[Campus Compass Storage] Failed to save key "${key}":`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage (or memory store in SSR)
   * @param {string} key
   */
  remove(key) {
    try {
      if (isStorageAvailable()) {
        window.localStorage.removeItem(key);
      } else {
        memoryStore.delete(key);
      }
    } catch (error) {
      console.error(`[Campus Compass Storage] Failed to remove key "${key}":`, error);
    }
  },

  /**
   * Clear all app-scoped keys
   */
  clear() {
    try {
      if (isStorageAvailable()) {
        window.localStorage.clear();
      } else {
        memoryStore.clear();
      }
    } catch (error) {
      console.error('[Campus Compass Storage] Failed to clear storage:', error);
    }
  },
};

export default storage;
