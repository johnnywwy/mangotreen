

export type tagsDTO = {
  page: number,
  kind: "expenses" | "income"
}


// 收入支出 标签类型
export type Tag = {
  id: number;
  user_id: number;
  name: string;
  sign: string;
  kind: "expenses" | "income"
}

// 后端返回
export type Resources<T = any> = {
  resources: T[],
  pager: {
    page: number;
    per_page: number;
    count: number;
  }
}

export type Resource<T> = {
  resource: T
}

export type Item = {
  id?: number
  user_id?: number
  amount: number
  tag_ids: number
  happen_at: string
  kind: 'expenses' | 'income'
}

// 报错信息
export type ResourceError = {
  errors: Record<string, string[]>
}

// 单笔记账数据结构
export type Items = {
  happen_after: string
  happen_before: string
  page: number
}