import { defineComponent, PropType } from "vue";
import s from "./TagPage.module.scss";
import { RouterView } from "vue-router";
export const TagPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    return () => <RouterView />;
  },
});
