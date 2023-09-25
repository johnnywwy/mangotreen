import { defineComponent, PropType } from "vue";

export const Email = defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true
    },
  },
  setup: (props, content) => {
    const index = props.value?.indexOf('@')
    const emailStr = props.value?.slice(0, index)
    return () => (
      <span>{emailStr}</span>
    );
  },
});