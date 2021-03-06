import AuthStore from './authstore';

export const Fetch = async (url, body, opts = {}) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
  ...opts,
}).then((response) => {
  if (response.ok) return response.json();
  return response.json().then((json) => {
    const error = new Error(json.errorMessage || 'An error has occurred');
    error.code = response.status || 500;
    throw error;
  });
});

export const AuthenticatedFetch = async (url, body, opts = {}) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AuthStore.getIdToken()}`,
  },
  body: JSON.stringify(body),
  ...opts,
}).then((response) => {
  if (response.ok) return response.json();
  return response.json().then((json) => {
    const error = new Error(json.errorMessage || 'An error has occurred');
    error.code = response.status || 500;
    throw error;
  });
});
