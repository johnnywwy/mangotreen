import { defineComponent, ref } from "vue";
import s from "./first.module.scss";
import pig from "../../assets/icons/clock.svg";
import { RouterLink } from "vue-router";
export const second = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={pig} alt="存钱罐" />
          <h2 class={s.text}>会挣钱111111<br />还会省钱</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/3">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
});