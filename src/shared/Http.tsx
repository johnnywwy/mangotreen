import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { showLoadingToast, closeToast } from "vant";
import { mockSession, mockTagIndex } from "../mock/mock";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  // read
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

export const http = new Http('/api/v1')

const mock = (response: AxiosResponse) => {
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    return false
  }

  switch (response.config?.params?._mock) {
    // console.log('response.config?.params?._mock', response.config?.params?._mock);

    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config)
      return true
    // case 'itemCreate':
    //   [response.status, response.data] = mockItemCreate(response.config)
    //   return true
    // case 'itemIndex':
    //   [response.status, response.data] = mockItemIndex(response.config)
    //   return true
    // case 'tagCreate':
    //   [response.status, response.data] = mockTagCreate(response.config)
    //   return true
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true

  }
  return false
}

// 请求拦截
http.instance.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt")?.replace(/["']/g, '')

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }

  if (config._autoLoading === true) {
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
  }
  return config
})


// mock 响应拦截器
// http.instance.interceptors.response.use(response => {
//   console.log('响应拦截1', response.data);
//   //尝试篡改内容
//   mock(response)
//   return response
// }, (error) => {
//   if (mock(error.response)) {
//     return error.response
//   } else {
//     throw error
//   }
// })


http.instance.interceptors.response.use(response => {
  if (response.config._autoLoading === true) {
    closeToast();
  }

  return response
}, (error: AxiosError) => {
  if (error.response?.config._autoLoading === true) {
    closeToast();
  }
  throw error
})


// 响应拦截
http.instance.interceptors.response.use((response) => {
  if (response.status === 200) return response
  // return response
}, (error) => {
  if (error.response) {
    console.log('响应拦截器', error.response.data);

    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) {
      alert('你太频繁了')
    }
    if (axiosError.response?.status === 500) {
      alert('服务器繁忙，请稍后再试！')
    }
  }
  throw error
})


