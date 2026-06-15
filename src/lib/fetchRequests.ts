import axios from 'axios';
import { apiUrl } from './constants';

type ApiResult<T = unknown> = { status: 'success'; data: T } | { status: 'fail'; data: unknown };

function formatResults<T>(results: { data: T } | null, message?: unknown): ApiResult<T> {
  if (results && results.data) {
    return { status: 'success', data: results.data };
  }
  return { status: 'fail', data: message };
}

export const post = (endpoint: string, payload: unknown): Promise<ApiResult> => {
  const route = `${apiUrl}${endpoint}`;
  return axios(route, {
    method: 'POST',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(payload),
  })
    .then(response => {
      if (response && response.data) {
        return { status: 'success' as const, data: response.data };
      }
      return { status: 'fail' as const, data: { error: 'No response data from server' } };
    })
    .catch(error => ({ status: 'fail' as const, data: { error } }));
};

export const get = (endpoint: string, auth?: string | null): Promise<ApiResult> => {
  const route = `${apiUrl}${endpoint}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`;
  }
  return axios(route, { method: 'GET', responseType: 'json', headers })
    .then(response => formatResults(response))
    .catch(error => formatResults(null, error));
};

export const put = (endpoint: string, auth: string | null, payload: unknown): Promise<ApiResult> => {
  const route = `${apiUrl}${endpoint}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`;
  }
  return axios(route, { method: 'PUT', responseType: 'json', headers, data: JSON.stringify(payload) })
    .then(response => formatResults(response))
    .catch(error => formatResults(null, error));
};

export const _delete = (endpoint: string, auth: string | null, payload?: unknown): Promise<ApiResult> => {
  const route = `${apiUrl}${endpoint}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`;
  }
  return axios(route, { method: 'DELETE', responseType: 'json', headers, data: payload ?? null })
    .then(response => formatResults(response))
    .catch(error => formatResults(null, error));
};
