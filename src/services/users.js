import request from '../common/request';
import { PAGE_SIZE } from '../common/config';

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
