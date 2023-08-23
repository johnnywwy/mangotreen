import { defineComponent, PropType } from "vue";
import s from "./Button.module.scss";

interface Props {
  onClick?: (e: MouseEvent) => void;
}

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"primary" | "danger" | 'success' | "warning">,
      default: "primary",
    }
  },
  setup: (props, content) => {
    return () => (
      <button class={[s.button, s[props.level]]}>
        {content.slots.default?.()}
      </button>
    )
  },
});
