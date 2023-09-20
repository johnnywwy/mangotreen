import { defineComponent, onMounted, PropType, ref } from 'vue'
import { Button } from '../../shared/Button'
import { FloatButton } from '../../shared/FloatButton'
// import { http } from '../../shared/Http'
// getItem
import { getItem } from "../../api/api";

import s from './ItemSummary.module.scss'
import { Item } from '../../type/tags';

export const ItemSummary = defineComponent({
  props: {
    startData: {
      type: String as PropType<string>,
      required: true,
    },
    endData: {
      type: String as PropType<string>,
      required: true,
    }
  },
  setup: (props, content) => {
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)


    console.log('startData', props.startData, props.endData);


    const onGetItems = async () => {
      const response = await getItem({
        happen_after: props.startData,
        happen_before: props.endData,
        page: page.value + 1,
      })
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }

    onMounted(onGetItems)

    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li>
            <span>收入</span>
            <span>128</span>
          </li>
          <li>
            <span>支出</span>
            <span>99</span>
          </li>
          <li>
            <span>净收入</span>
            <span>39</span>
          </li>
        </ul>
        <ol class={s.list}>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
        </ol>
        <div class={s.more}>
          {hasMore.value ?
            <Button onClick={onGetItems}>加载更多</Button> :
            <span>没有更多</span>
          }
        </div>
        <FloatButton />
      </div>
    );
  },
});