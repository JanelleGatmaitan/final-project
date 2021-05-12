export default function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}
