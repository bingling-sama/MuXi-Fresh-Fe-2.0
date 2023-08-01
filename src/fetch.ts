const preUrl = '/api/v2';

export async function post(url = '', data = {}, method: 'POST') {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const response = await fetch(preUrl + url, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function get(url = '') {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const response = await fetch(preUrl + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    redirect: 'follow',
  });

  return response.json();
}

export async function put(url = '', data = {}, method: 'PUT') {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const response = await fetch(preUrl + url, {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
