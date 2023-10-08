import { defineStore } from 'pinia'
import { http } from '../shared/Http'
import { AxiosResponse } from 'axios'
import { Resource, User } from '../type/tags'

type MeState = {
  me?: User
  mePromise?: Promise<AxiosResponse<Resource<User>>>
}
type MeActions = {
  refreshMe: () => void
  fetchMe: () => void
}

export const useMeStore = defineStore<string, MeState, {}, MeActions>('me', {
  // 其他配置...
  state: () => ({
    me: undefined,
    mePromise: undefined,
  }),
  actions: {
    refreshMe() {
      this.mePromise = http.get<Resource<User>>('/me')
    },
    fetchMe() {
      this.refreshMe()
    }

  }
})