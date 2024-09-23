import { AsyncUpdateUserInfo } from '@/api/user'
import type { IPwdLoginResUserinfo } from '@/api/user/type'
import { LOGIN_PAGE_URL } from '@/config'
import { defineStore } from 'pinia'

interface IState {
  userInfo: IPwdLoginResUserinfo | undefined
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): IState => ({
    userInfo: undefined,
    token: ''
  }),

  actions: {
    // 更新用户信息
    updateUserInfo(userInfo: any) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },

    async asyncUpdateUserInfo() {
      const { data } = await AsyncUpdateUserInfo()
      this.updateUserInfo(data)
    },

    // 保存token
    saveToken(token: string) {
      this.token = token
    },

    // 退出登录
    logout() {
      this.userInfo = undefined
      this.token = ''
      uni.reLaunch({ url: LOGIN_PAGE_URL })
    }
  },

  getters: {
    isLogin(state) {
      if (!state.userInfo!) return false
      else return true
    },

    // 用户Token
    getToken(state) {
      if (state.userInfo && state.userInfo.user_token) {
        return state.userInfo.user_token
      } else {
        return null
      }
    },

    // 用户信息
    getUserInfo(state) {
      if (state.userInfo) {
        return state.userInfo
      } else {
        return null
      }
    }
  },

  persist: true
})
