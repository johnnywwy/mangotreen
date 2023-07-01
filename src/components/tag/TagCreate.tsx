import { defineComponent, PropType } from "vue";
import s from "./TagCreate.module.scss";

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => <div class={s.wrapper}>create</div>;
  },
});
