import { host } from '@/config'

export const httpBaseConfig: UniApp.RequestOptions = {
  url: host,
  method: 'GET',
  timeout: 1000 * 60,
  header: {
    'content-type': 'application/json'
  }
}
