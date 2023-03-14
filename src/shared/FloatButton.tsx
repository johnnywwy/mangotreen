import { defineComponent } from "vue";
import { Icon } from "./Icon";
import s from "./FloatButton.module.scss";
export const FloatButton = defineComponent({
  setup: (props, content) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name="add" class={s.fuck}></Icon>
      </div>
    );
  },
});
