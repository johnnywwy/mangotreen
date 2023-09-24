import { computed, defineComponent, PropType } from "vue";
import { Time } from "./time";

export const Datetime = defineComponent({
  props: {
    value: {
      type: [String, Date] as PropType<string | Date>,
      required: true
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  setup: (props, content) => {
    const newDate = computed(() =>
      new Time(props.value).format(props.format)
    )
    return () => (<div>{newDate.value}</div>);
  },
});