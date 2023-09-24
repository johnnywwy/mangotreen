import { http } from "../shared/Http"
import { Item, Items, Resource, Resources } from "../type/tags"

//创建账目
export const createItem = (params: Item) => http.post<Resource<Item>>('/items', params)


// 删除账目
export const deleteItem = () => { }


// 获取账目
export const getItem = (params: Items) => http.get<Resources<Item>>('/items', params)


// 获取收支信息
export const getBalance = (params: Items) => http.get<Resources<Item>>('/items/balance', params)
