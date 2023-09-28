import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss'
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";
import { http } from "../../shared/Http";
import { summary } from "../../api/statistics";
import { Time } from "../../shared/time";


const DAY = 24 * 3600 * 1000

type Data1Item = { happen_at: string, amount: number }
type Data1 = Data1Item[]

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
    const refCategory = ref<"expenses" | "income">('expenses')
    const data1 = ref<Data1>([])
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
      console.log('array', array);

      // return data1.value.map((item) =>
      //   [item.happen_at, item.amount] as [string, number]
      // )
      return array as [string, number][]
    }

    )

    const getSummary = async () => {
      const response = await summary({
        happened_after: props.startData as string,
        happened_before: props.endData as string,
        kind: refCategory.value,
        group_by: 'happen_at'
      })
      if (response.status !== 200) return

      data1.value = response.data.groups


    }

    onMounted(getSummary)

    return () => <>
      <div class={s.wrapper}>
        <FormItem label="类型" type="select" options={[
          { value: 'expenses', text: "支出" },
          { value: 'income', text: "收入" },
        ]} v-model={refCategory.value} />
        <BarChart data={betterData1.value} />
        <PieChart />
        <Bars />
      </div>

    </>
  },
});