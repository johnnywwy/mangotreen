import { defineComponent, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss'
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { Bars } from "./Bars";

export const Charts = defineComponent({
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
  setup: (props, context) => {
    const refCategory = ref('expenses')

    return () => <>
      <div class={s.wrapper}>
        <FormItem label="类型" type="select" options={[
          { value: 'expenses', text: "支出" },
          { value: 'income', text: "收入" },
        ]} v-model={refCategory.value} />

        <LineChart />
        <PieChart />
        <Bars />

      </div>

    </>
  },
});