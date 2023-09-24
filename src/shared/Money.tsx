import { defineComponent, PropType } from "vue";

export const Money = defineComponent({
  props: {
    value: {
      type: Number as PropType<number>,
      required: true
    },
  },
  setup: (props, content) => {
    const addZero = (n: number) => {
      const nStr = n.toString()
      const dotIndex = nStr.indexOf('.')
      if (dotIndex < 0) {
        return n + '.00'
      } else if (nStr.substring(dotIndex).length === 2) {
        return nStr + '0'
      } else {
        return nStr
      }
    }
    return () => (<span>{addZero(props.value / 100)}</span>);
  },
});