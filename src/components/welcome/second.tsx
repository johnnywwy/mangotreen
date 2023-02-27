import { defineComponent, ref } from "vue";
import s from "./first.module.scss";
import pig from "../../assets/icons/clock.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const second = defineComponent({
  setup() {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img class={s.icon} src={pig} alt="存钱罐" />,
          title: () => (
            <h2 class={s.text}>
              每日提醒
              <br />
              不遗漏每一笔账单
            </h2>
          ),
          buttons: () => (
            <>
              <RouterLink class={s.fake} to="/start">
                跳过
              </RouterLink>
              <RouterLink to="/welcome/3">下一页</RouterLink>
              <RouterLink to="/start">跳过</RouterLink>
            </>
          ),
        }}
      </WelcomeLayout>
    );
  },
});
