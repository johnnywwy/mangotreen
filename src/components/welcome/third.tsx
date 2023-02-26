import { defineComponent, ref } from "vue";
import s from "./first.module.scss";
import chart from "../../assets/icons/chart.svg";
import { RouterLink } from "vue-router";
export const third = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.icon} src={chart} alt="存钱罐" />
          <h2 class={s.text}>数据可视化<br />每笔消费更清晰</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/welcome/4">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  },
});
