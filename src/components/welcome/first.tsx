import { defineComponent, ref } from "vue";
import s from "./first.module.scss";
import pig from "../../assets/icons/pig.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
export const first = defineComponent({
  setup(props, context) {
    const slots = {
      icon: () => <img src={pig} class={s.icon} />,
      title: () => (
        <h2 class={s.text}>
          会挣钱
          <br />
          还会省钱
        </h2>
      ),
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    };
    return () => <WelcomeLayout v-slots={slots}></WelcomeLayout>;
  },
});
