import Cookies from 'js-cookie';

const token = Cookies.get('__user__isLoggedIn');
console.log('token', token);

export async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json();
}
