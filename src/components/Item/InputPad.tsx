import { defineComponent, PropType } from "vue";
import s from "./InputPad.module.scss";

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => <div class={s.wrapper}>数字版</div>;
  },
});
