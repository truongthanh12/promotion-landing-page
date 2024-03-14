function set(key: string, value: string) {
  if (typeof window === "undefined" || !window.localStorage) return "";
  try {
    return window.localStorage.setItem(key, value);
  } catch (e) {
    return { error: e };
  }
}

function get(key: string) {
  if (typeof window === "undefined" || !window.localStorage) return "";
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return { error: e };
  }
}

function remove(key: string) {
  if (typeof window === "undefined" || !window.localStorage) return "";
  try {
    return window.localStorage.removeItem(key);
  } catch (e) {
    return { error: e };
  }
}

function clear() {
  if (typeof window === "undefined" || !window.localStorage) return "";
  try {
    return window.localStorage.clear();
  } catch (e) {
    return { error: e };
  }
}

export default {
  set,
  get,
  remove,
  clear,
};
