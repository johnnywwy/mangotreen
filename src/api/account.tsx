import { http } from "../shared/Http"
import { Item, Items, Resource, Resources } from "../type/tags"

//创建账目
export const createItem = (params: Item, _autoLoading: boolean) => http.post<Resource<Item>>('/items', params, { _autoLoading })


// 删除账目
export const deleteItem = () => { }


// 获取账目
export const getItem = (params: Items, _autoLoading?: boolean) =>
  http.get<Resources<Item>>('/items', params, { _autoLoading })


// 获取收支信息
export const getBalance = (params: Items) => http.get<Resources<Item>>('/items/balance', params)
