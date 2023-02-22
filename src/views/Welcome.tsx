import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import s from "./Welcome.module.scss";
export const welcome = defineComponent({
  setup() {
    return () => (
      <>
        <div class={s.wrapper}>
          <header>logo</header>
          <RouterView />
          <footer>按钮</footer>
        </div>
      </>
    );
  },
});
