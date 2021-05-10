import axios from 'axios';

const request = axios.create({
  baseURL: 'http://new.jacklearn.club:8096/znkf-api/',
  timeout: 10000,
});
request.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err),
);
export default function postUrl(url, data) {
  return request({ url, method: 'post', data });
}
