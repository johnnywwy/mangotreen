import { http } from "../shared/Http"

type tagsDTO = {
  page: number,
  kind: "expenses" | "income"
}

type createTags = {
  name: string
  sign: string
  kind: 'income' | "expenses"
}

// 获取标签
export const getTags = () => { }

// 创建标签
export const createTags = (params: createTags) => http.post('/tags', params)

// 修改标签
export const updateTags = () => { }

// 删除标签
export const deleteTags = () => { }

// 获取标签列表
export const getTagsList = (params: tagsDTO) => http.get('/tags', params)