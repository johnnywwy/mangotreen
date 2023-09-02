import { defineComponent, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss'

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
   return () => (
      <div class={s.wrapper}>
        |{refCategory.value}|
        <FormItem label="类型" type="select" options={[
          { value: 'expenses', text: "支出"},
          { value: 'income', text: "收入"},
        ]} v-model={refCategory.value}></FormItem>
      </div>
    );
  },
});