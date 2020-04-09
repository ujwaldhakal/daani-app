export function getLocalStorageItem(key) {
  localStorage.getItem(getPrefix() + key);
}

export function setLocalStorageItem(key, data) {
  localStorage.setItem(getPrefix() + key, data);
}

export function removeLocalStorageItem(key) {
  localStorage.removeItem(getPrefix() + key);
}

function getPrefix() {
  return 'granted_'
}
