import { http } from "../shared/Http"
import { Item, Resource } from "../type/tags"

//创建账目
export const createItem = (params: Item) => http.post<Resource<Item>>('/items', params)


// 删除账目
export const deleteItem = () => { }


// 获取账目
export const getItem = () => { }


// 获取收支信息
export const getBalance = () => { }
