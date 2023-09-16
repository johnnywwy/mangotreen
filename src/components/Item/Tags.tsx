import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import { getTagsList } from "../../api/tags";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { useTags } from "../../shared/useTags";
import { Tag } from "../../type/tags";
import s from './Tags.module.scss';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<'expenses' | 'income'>,
      required: true
    },
    selected: {
      type: Number
    }
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const router = useRouter()

    const onSelect = (tag: Tag) => {
      context.emit('update:selected', [tag.id])
    }

    // 请求
    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return getTagsList({
        kind: props.kind,
        page: page + 1,
      })
    })

    return () => <>
      <div class={s.tags_wrapper}>
        <div class={s.tag}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name} onClick={() => router.push('/tag/create?kind=' + props.kind)}>新增</div>
        </div>
        {expensesTags.value.map((tag) => (
          <div
            onClick={() => onSelect(tag)}
            class={[s.tag, props.selected === tag.id ? s.selected : '']}
          >
            <div class={s.sign} > {tag.sign}</div>
            <div class={s.name}>{tag.name}</div>
          </div>
        ))}
      </div >
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