import { http } from "../shared/Http"
import { Resource, Resources, TagDTO } from "../type/tags"

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
export const getTags = (id: number) => http.patch<Resource<TagDTO>>(`/tags/${id}`)

// 创建标签
export const createTag = (params: createTagsDTO) => http.post('/tags', params)

// 修改标签
export const updateTag = (id: number, params: Partial<TagDTO>) => http.patch<Resource<TagDTO>>(`/tags/${id}`, params)

// 删除标签
export const deleteTag = (id: number, options?: { withItems: 'true' | 'false' }) => http.delete<Resource<TagDTO>>(`/tags/${id}`, options)

// 删除标签和记账
export const deleteTagAndItems = () => (id: number) => http.delete<Resource<TagDTO>>(`/tags/${id}`)

// 获取标签列表
export const getTagsList = (params: tagsDTO) => http.get<Resources<TagDTO>>('/tags', params)