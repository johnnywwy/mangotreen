import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import s from "./Welcome.module.scss";
import logo from "../assets/icons/logo.svg";
export const welcome = defineComponent({
  setup() {
    return () => (
      <>
        <div class={s.wrapper}>
          <header>
            <img src={logo} class={s.logo} />
            <h1>蛋黄记账</h1>
          </header>
          <main class={s.main}><RouterView /></main>
          <footer class={s.footer}></footer>
        </div>
      </>
    );
  },
});
