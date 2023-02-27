import { defineComponent, ref } from "vue";
import s from "./first.module.scss";
import cloud from "../../assets/icons/cloud.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const forth = defineComponent({
  setup() {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img class={s.icon} src={cloud} alt="云端" />,
          title: () => (
            <h2 class={s.text}>
              云端同步
              <br />
              一端记账多端同步
            </h2>
          ),
          buttons: () => (
            <>
              <RouterLink class={s.fake} to="/start">
                跳过
              </RouterLink>
              <RouterLink to="/start">完成</RouterLink>
              <RouterLink class={s.fake} to="/start">
                跳过
              </RouterLink>
            </>
          ),
        }}
      </WelcomeLayout>
    );
  },
});
