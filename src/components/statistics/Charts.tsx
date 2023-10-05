import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss'
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import { summary } from "../../api/statistics";
import { Time } from "../../shared/time";


const DAY = 24 * 3600 * 1000
type Tag = { name: string, value: number, sign: number }
type Data1Item = { happen_at: string, amount: number }
type Data2Item = { tag_id: number, tag: Tag, amount: number }

type Data1 = Data1Item[]
type Data2 = Data2Item[]

const option = [
  { value: 'expenses', text: "支出" },
  { value: 'income', text: "收入" },
]
export const Charts = defineComponent({
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
  setup: (props, context) => {
    const kind = ref<"expenses" | "income">('expenses')
    const data1 = ref<Data1>([])
    const data2 = ref<Data2>([])
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.endData || !props.startData) return []

      const array = []
      const subDay = new Date(props.endData).getTime() - new Date(props.startData).getTime()
      const n = subDay / DAY + 1
      let data1Index = 0
      for (let i = 0; i < n; i++) {
        const time = new Time(props.endData).add(-i, 'day').format("YYYY-MM-DD")
        if (data1.value[data1Index] && data1.value[data1Index].happen_at === time) {
          array.push([time, data1.value[data1Index].amount])
          data1Index += 1
        } else {
          array.push([time, 0])
        }
      }
      return array as [string, number][]
    }
    )

    const batterData2 = computed<{ name: string, value: number }[]>(() =>
      data2.value.map(item => ({
        name: item.tag.name,
        value: item.amount
      }))
    )

    const batterData3 = computed<{ tag: Tag, amount: number, percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round(item.amount / total * 100)
      }))
    }
    )

    const getSummary = async () => {
      const response = await summary({
        happened_after: props.startData as string,
        happened_before: props.endData as string,
        kind: kind.value,
        group_by: 'happen_at'
      }, true)
      if (response.status !== 200) return
      data1.value = response.data.groups

    }

    // data2
    const getSummary2 = async () => {
      const response = await summary({
        happened_after: props.startData as string,
        happened_before: props.endData as string,
        kind: kind.value,
        group_by: 'tag_id'
      })
      if (response.status !== 200) return
      data2.value = response.data.groups
    }

    watch(() => kind.value, getSummary)
    watch(() => kind.value, getSummary2)

    onMounted(getSummary)
    onMounted(getSummary2)

    return () => <>
      <div class={s.wrapper}>
        <FormItem label="类型" type="select" v-model={kind.value} options={option} />
        <BarChart data={betterData1.value} />
        <PieChart data={batterData2.value} />
        <Bars data={batterData3.value} />
      </div>

    </>
  },
});