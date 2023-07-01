import { defineComponent, PropType } from "vue";
import s from "./TagEdit.module.scss";

export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => <div class={s.wrapper}>edit</div>;
  },
});
