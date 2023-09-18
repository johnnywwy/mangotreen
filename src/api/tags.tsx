import { http } from "../shared/Http"
import { Resources, Tag } from "../type/tags"

type tagsDTO = {
  page: number,
  kind: "expenses" | "income"
}

export type createTagsDTO = {
  name: string
  sign: string
  kind: 'income' | "expenses"
}

// 获取标签
export const getTags = () => { }

// 创建标签
export const createTags = (params: createTagsDTO) => http.post('/tags', params)

// 修改标签
export const updateTags = () => { }

// 删除标签
export const deleteTags = () => { }

// 获取标签列表
export const getTagsList = (params: tagsDTO) => http.get<Resources<Tag>>('/tags', params)