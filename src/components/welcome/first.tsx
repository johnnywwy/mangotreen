import { defineComponent, ref } from "vue";
import s from "./first.module.scss";
import pig from "../../assets/icons/first.svg";
import { RouterLink } from "vue-router";
export const first = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.pig} src={pig} alt="存钱罐" />
          <h2 class={s.text}>会挣钱<br />还会省钱</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
});
