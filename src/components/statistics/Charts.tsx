import { defineComponent, PropType } from "vue";
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
  setup: (props, content) => {
   return () => (
      <div class={s.wrapper}>图表页面</div>
    );
  },
});