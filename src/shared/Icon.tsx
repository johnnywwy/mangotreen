import { defineComponent } from "vue";
import s from "./Icon.module.scss";

export const Icon = defineComponent({
  props: ["name"],
  setup: (props, content) => {
    return () => (
      <svg class={s.icon}>
        <use xlinkHref={"#" + props.name}></use>
      </svg>
    );
  },
});
