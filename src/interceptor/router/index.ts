
import { whiteList } from './constant'
import type { IInvokeRes } from './type'
import { useUserStore } from '@/store/model/user'

const routerInterceptor = () => {
  const userStore = useUserStore()
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  list.forEach((item) => {
    uni.addInterceptor(item, {
      invoke: (e: IInvokeRes) => {
        const url = e.url.split('?')[0]
        const permission = whiteList.includes(url)
        const token = userStore.getToken

        if (!permission && !token) {
          userStore.logout()
          return false
        }
      }
    })
  })
}

export default routerInterceptor
