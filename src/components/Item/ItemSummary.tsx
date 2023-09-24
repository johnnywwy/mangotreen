import { defineComponent, onMounted, PropType, ref } from 'vue'
import { Button } from '../../shared/Button'
import { FloatButton } from '../../shared/FloatButton'
import { getItem } from "../../api/api";

import s from './ItemSummary.module.scss'
import { Item } from '../../type/tags';

export const ItemSummary = defineComponent({
  props: {
    startData: {
      type: String as PropType<string>,
      required: false,
    },
    endData: {
      type: String as PropType<string>,
      required: false,
    }
  },
  setup: (props, content) => {
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)

    // 获取items
    const onGetItems = async () => {
      if (!props.startData || !props.endData) return
      const response = await getItem({
        happen_after: props.startData!,
        happen_before: props.endData!,
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
        {
          items.value ?
            (<>
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
                {items.value.map((item) => (
                  <li>
                    <div class={s.sign}>
                      <span>{item.tags[0].sign}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        <span class={s.tag}>{item.tags[0].name}</span>
                        <span class={s.amount}>
                          ￥<>{item.amount}</>
                        </span>
                      </div>
                      <div class={s.time}>
                        {item.happen_at}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div class={s.more}>
                {
                  hasMore.value ?
                    <Button onClick={onGetItems}>加载更多</Button> :
                    <div class={s.noMore}>没有更多</div>
                }
              </div>
            </>
            ) :
            (<div>记录为空</div>)
        }
        <FloatButton />
      </div>
    );
  },
});