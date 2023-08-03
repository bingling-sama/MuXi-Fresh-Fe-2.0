const preUrl = '/api/v2';

export async function post(url = '', data = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('未登录');
  }
  const response = await fetch(`${preUrl}${url}`, {
    method: 'POST',
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
    throw new Error('未登录');
  }
  const response = await fetch(`${preUrl}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    redirect: 'follow',
  });

  return response.json();
}

export async function put(url = '', data = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('未登录');
  }
  const response = await fetch(`${preUrl}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
