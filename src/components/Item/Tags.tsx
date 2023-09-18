import { defineComponent, PropType, ref } from "vue";
import { RouterLink } from "vue-router";
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

    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    }

    // 请求
    const { tags: expensesTags, hasMore, fetchTags } = useTags((page) => {
      return getTagsList({
        kind: props.kind,
        page: page + 1,
      })
    })

    // 长按计时器
    const timer = ref<number>()

    // 当前Tag
    const currentTag = ref<HTMLDivElement>()

    // 长按
    const onLongPress = () => {
      console.log('长按')
    }

    // 开始长按
    const onTouchStart = (e: TouchEvent) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        onLongPress()
      }, 500)
    }

    // 长按结束
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }

    // 长按移动
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (currentTag.value !== pointedElement &&
        currentTag.value?.contains(pointedElement) === false) {
        clearTimeout(timer.value)
      }
    }

    return () => <>
      <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
        <RouterLink class={s.tag} to={`/tag/create?kind=${props.kind}`}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name}>新增</div>
        </RouterLink>
        {
          expensesTags.value.map((tag) => (
            <div
              onClick={() => onSelect(tag)}
              onTouchstart={onTouchStart}
              onTouchend={onTouchEnd}
              class={[s.tag, props.selected === tag.id ? s.selected : '']}
            >
              <div class={s.sign} > {tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))
        }
      </div >
      <div class={s.more_wrapper}>
        {
          hasMore.value ?
            <Button class={s.loadMore} onClick={fetchTags}>
              加载更多
            </Button> :
            <div class={s.noMore}>没有更多</div>
        }
      </div>
    </>
  },
});