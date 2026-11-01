/**
 * Safe localStorage utility wrapper with error handling and fallback.
 */

export const storage = {
  /**
   * Retrieve item from localStorage
   * @param {string} key
   * @param {*} [defaultValue=null]
   * @returns {*}
   */
  get(key, defaultValue = null) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`[Campus Compass Storage] Failed to read key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Save item to localStorage
   * @param {string} key
   * @param {*} value
   * @returns {boolean}
   */
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[Campus Compass Storage] Failed to save key "${key}":`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key
   */
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`[Campus Compass Storage] Failed to remove key "${key}":`, error);
    }
  },

  /**
   * Clear all app-scoped keys
   */
  clear() {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('[Campus Compass Storage] Failed to clear storage:', error);
    }
  },
};

export default storage;

