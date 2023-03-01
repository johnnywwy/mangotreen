import s from "./Welcome.module.scss";
import cloud from "../../assets/icons/cloud.svg";
import { RouterLink } from "vue-router";
import { FunctionalComponent } from "vue";

export const Forth: FunctionalComponent = () => (
  <div class={s.card}>
    <img class={s.icon} src={cloud} />
    <h2 class={s.text}>
      云端同步 <br />
      一端记账多端同步
    </h2>
  </div>
);

Forth.displayName = "Forth";
