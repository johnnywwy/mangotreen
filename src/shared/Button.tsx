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
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, content) => {
    return () => (
      <button disabled={props.disabled} type={props.type} class={[s.button, s[props.level]]} onClick={props.onClick}>
        {content.slots.default?.()}
      </button>
    )
  },
});
