import { http } from "../shared/Http"
import { groupsItem, SummaryDTO, SummaryRes } from "../type/tags"

// 统计信息接口
export const summary = (params: SummaryDTO, _autoLoading?: boolean) =>
  http.get<SummaryRes<groupsItem[]>>(`/items/summary`, params, { _autoLoading })
