import { message } from 'antd';

const preUrl = '/api/v2';

export async function post(url = '', data = {}, isToken = true) {
  const headers = new Headers({
    'Content-Type': 'application/json;charset=utf-8',
  });

  if (isToken) {
    const token = localStorage.getItem('token');
    if (token) headers.append('Authorization', token);
    else {
      void message.error('未登录！');
    }
  }

  const response = await fetch(`${preUrl}${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

export async function get(url = '', isToken = true) {
  const headers = new Headers({
    'Content-Type': 'application/json;charset=utf-8',
  });

  if (isToken) {
    const token = localStorage.getItem('token');
    if (token) headers.append('Authorization', token);
    else {
      void message.error('未登录！');
    }
  }

  const response = await fetch(`${preUrl}${url}`, {
    method: 'GET',
    headers,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

export async function put(url = '', data = {}, isToken = true) {
  const headers = new Headers({
    'Content-Type': 'application/json;charset=utf-8',
  });

  if (isToken) {
    const token = localStorage.getItem('token');
    if (token) headers.append('Authorization', token);
    else {
      void message.error('未登录！');
    }
  }

  const response = await fetch(`${preUrl}${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}
