import { http } from "../shared/Http"
import { Resource, Resources, Tag } from "../type/tags"

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
export const createTag = (params: createTagsDTO) => http.post('/tags', params)

// 修改标签
export const updateTag = (params: number) => http.patch<Resource<Tag>>(`/tags/${params}`)

// 删除标签
export const deleteTag = () => { }

// 获取标签列表
export const getTagsList = (params: tagsDTO) => http.get<Resources<Tag>>('/tags', params)