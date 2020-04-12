export function getLocalStorageItem(key) {
  if (typeof localStorage !== "undefined") {
    console.log("getting upto here", localStorage)
    return localStorage.getItem(getPrefix() + key);
  }
}

export function setLocalStorageItem(key, data) {
  return localStorage.setItem(getPrefix() + key, data);
}

export function removeLocalStorageItem(key) {
  return localStorage.removeItem(getPrefix() + key);
}

function getPrefix() {
  return 'granted_'
}
