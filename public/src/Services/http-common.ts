/* eslint-disable */
import axios from 'axios';

let defaultAPIKey =
  'BaseSecurityAPIkey 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa6525e83042262948b9824';
// let userAPIKey = getTokenDetail() as any ? "Bearer " + getTokenDetail() : defaultAPIKey;

// Dev
// let API = 'http://starzeropublicapi.inventsoftlabs.in/v1/';

// Prod
let API = 'https://publicapi.fuelsense.org/v1/';

export const apiCall = (baseUrl: any) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Authorization: defaultAPIKey,
    },
  });
};

export default axios.create({
  baseURL: API,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    Authorization: defaultAPIKey,
  },
})


