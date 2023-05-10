import { PropType, defineComponent } from "vue";
import s from "./Icon.module.scss";

export const Icon = defineComponent({
  props: {
    name: {
      type: String,
    },
    onClick: {
      type: Function as PropType<(e:MouseEvent) => void>, 
    }
  },
  setup: (props, content) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={"#" + props.name}></use>
      </svg>
    );
  },
});
