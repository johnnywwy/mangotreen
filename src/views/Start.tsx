import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import s from "./start.module.scss";
export const Start = defineComponent({
  setup: (props, content) => {
    const onClick = () => {
      console.log("hi");
    };

    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            123456
          </Button>
        </div>
      </div>
    );
  },
});
