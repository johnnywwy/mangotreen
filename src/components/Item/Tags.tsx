import { defineComponent, PropType } from "vue";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { useTags } from "../../shared/useTags";
import s from './Tags.module.scss';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<'expenses' | 'income'>,
      required: true
    },
  },
  setup: (props, content) => {

    // 请求
    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
        _mock: "tagIndex"
      })
    })

    return () => <>
      <div class={s.tags_wrapper}>
        <div class={s.tag}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name}>新增</div>
        </div>
        {expensesTags.value.map((tag) => (
          <div class={[s.tag, s.selected]}>
            <div class={s.sign}>{tag.sign}</div>
            <div class={s.name}>{tag.name}</div>
          </div>
        ))}
      </div>
      <div class={s.more_wrapper}>
        {
          hasMore.value ?
            <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
            <div class={s.noMore}>没有更多</div>
        }
      </div>
    </>
  },
});