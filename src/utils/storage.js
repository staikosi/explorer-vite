const PREFIX = 'VITE_VIEW::';

export function set(key, value) {
  localStorage.setItem(PREFIX + key, value);
}

export function get(key) {
  return localStorage.getItem(PREFIX + key);
}

export function remove(key) {
  localStorage.removeItem(PREFIX + key);
}
