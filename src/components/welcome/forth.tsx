import s from "./Welcome.module.scss";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";

export const Forth: FunctionalComponent = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref="#cloud"></use>
    </svg>
    <h2 class={s.text}>
      云端同步 <br />
      一端记账多端同步
    </h2>
  </div>
);

Forth.displayName = "Forth";
